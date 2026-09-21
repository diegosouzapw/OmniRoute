# Contributing to OmniRoute (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

योगदान गर्नुभएको रुचिका लागि धन्यवाद! यो मार्गदर्शिकाले तपाईंलाई सुरु गर्न आवश्यक सबै कुरा समेट्छ।

प्रत्येक परिवर्तनका लागि आधिकारिक कार्यप्रवाह बुझ्न
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) बाट सुरु गर्नुहोस्। यसले provider, routing,
UI/UX, i18n, CLI, database, र build/deploy परिवर्तनहरूलाई तिनका contracts, लक्षित tests, CI
coverage, र reconciliation चरणहरूसँग नक्साङ्कन गर्छ।

---

## विकास सेटअप

### पूर्वावश्यकताहरू

- **Node.js** `>=22.22.3 <23`, वा `>=24.0.0 <27` (सिफारिस गरिएको: 24 LTS)
- **npm** 10+

> **npm v11+ प्रयोगकर्ताहरू (Node 24+):** `npm install` पछि, native modules स्थापना भएका छन् कि छैनन् भनी पुष्टि गर्नुहोस्:
> `node -e "require('better-sqlite3')"`. यदि यो `MODULE_NOT_FOUND` सहित असफल भयो भने,
> `npm approve-scripts better-sqlite3 && npm install` चलाउनुहोस्। हेर्नुहोस्
> [समस्या निवारण](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)।

- **Git**

### Clone र स्थापना

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Environment Variables

```bash
# टेम्प्लेटबाट आफ्नो .env सिर्जना गर्नुहोस्
cp .env.example .env

# आवश्यक secrets उत्पन्न गर्नुहोस्
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

विकासका लागि मुख्य variables:

| Variable               | विकासको पूर्वनिर्धारित मान | विवरण                     |
| ---------------------- | -------------------------- | ------------------------- |
| `PORT`                 | `20128`                    | Server port               |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`   | Frontend का लागि base URL |
| `JWT_SECRET`           | (माथि उत्पन्न गर्नुहोस्)   | JWT signing secret        |
| `INITIAL_PASSWORD`     | `CHANGEME`                 | पहिलो login password      |
| `APP_LOG_LEVEL`        | `info`                     | Log verbosity level       |

### Dashboard Settings

Dashboard ले environment variables मार्फत पनि configure गर्न सकिने features का लागि UI toggles उपलब्ध गराउँछ:

| Setting को स्थान    | Toggle             | विवरण                                    |
| ------------------- | ------------------ | ---------------------------------------- |
| Settings → Advanced | Debug Mode         | Debug request logs सक्षम गर्नुहोस् (UI)  |
| Settings → General  | Sidebar Visibility | Sidebar sections देखाउनुहोस्/लुकाउनुहोस् |

यी settings database मा भण्डारण हुन्छन् र restart पछि पनि कायम रहन्छन्, साथै set गरिएका बेला env var का पूर्वनिर्धारित मानहरूलाई override गर्छन्।

### स्थानीय रूपमा चलाउने

```bash
# विकास mode (hot reload)
npm run dev

# Production build
npm run build    # next build → .build/next/ त्यसपछि assembleStandalone → dist/
npm run start

# योगदानकर्ताका परिवर्तनहरूका लागि छिटो backend/API-मात्र compile
npm run build:contributor

# Release build (सफा rebuild + HEAD sentinel — deploy का लागि आवश्यक)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA लेख्छ

# सामान्य port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Contributor build ले compile-मात्र validation गर्छ: यसले standalone
distribution assemble गर्दैन वा वैकल्पिक native packaging assets build गर्दैन। पठाउन मिल्ने bundle validate गर्नुपर्ने बेला
नियमित production build प्रयोग गर्नुहोस्।

### Build Output को संरचना

| Directory | सामग्री                                                                        | Track गरिएको |
| --------- | ------------------------------------------------------------------------------ | ------------ |
| `src/`    | Application source (TypeScript / TSX)                                          | हो           |
| `.build/` | मध्यवर्ती फाइलहरू — `next build` output (gitignored, `distDir = .build/next`)  | होइन         |
| `dist/`   | पठाउन मिल्ने bundle — `assembleStandalone` द्वारा assemble गरिएको (gitignored) | होइन         |

Build pipeline एकल pass हो:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js output)
  └─ assembleStandalone()                 (standalone + static + public + native assets प्रतिलिपि गर्छ)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` ले थप रूपमा पहिले दुवै directories सफा गर्छ र deploy integrity sentinel का रूपमा
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) लेख्छ।

`npm run build:contributor` ले backend-मात्र build profile प्रयोग गर्छ। यसले build गर्दा अस्थायी रूपमा
dashboard UI files लाई stubs ले प्रतिस्थापन गर्छ, API route handlers कायम राख्छ, र build पछि मूल files
पुनर्स्थापित गर्छ। Dashboard UI लाई असर गर्ने परिवर्तनहरू वा पूर्ण
release validation का लागि `npm run build` प्रयोग गर्नुहोस्; contributor profile release build को विकल्प होइन।

> **VPS deploy सम्बन्धी टिप्पणी:** remote image directory `/usr/lib/node_modules/omniroute/app/`
> अपरिवर्तित छ। Deploy skills ले `dist/` का सामग्रीहरू यसमा rsync गर्छन्।
> Repository भित्रको build output path मात्र परिवर्तन भएको हो (`app/` → `dist/`)।

पूर्वनिर्धारित URLs:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git कार्यप्रवाह

> ⚠️ **`main` मा कहिल्यै सिधै commit नगर्नुहोस्।** सधैँ feature branch हरू प्रयोग गर्नुहोस्।
>
> **PR base:** सक्रिय `release/vX.Y.Z` branch लाई लक्षित गर्नुहोस् (`main` लाई होइन)। प्रत्येक branch मा release + पठाउँदा tag लगाउने मोडेलबारे
> जानकारीका लागि [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md)
> हेर्नुहोस्।

```bash
# सक्रिय release को सबैभन्दा नयाँ अवस्थाबाट branch बनाउनुहोस् (उदाहरण: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... परिवर्तनहरू गर्नुहोस् ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 राखेर Pull Request खोल्नुहोस्
```

### Branch नामकरण

| Prefix      | उद्देश्य                  |
| ----------- | ------------------------- |
| `feat/`     | नयाँ सुविधाहरू            |
| `fix/`      | Bug समाधानहरू             |
| `refactor/` | Code को पुनर्संरचना       |
| `docs/`     | Documentation परिवर्तनहरू |
| `test/`     | Test थप/समाधानहरू         |
| `chore/`    | Tooling, CI, dependencies |

### Commit सन्देशहरू

[Conventional Commits](https://www.conventionalcommits.org/) पालना गर्नुहोस्:

```
feat: provider call हरूका लागि circuit breaker थप्नुहोस्
fix: JWT secret validation को edge case समाधान गर्नुहोस्
docs: PII सुरक्षासहित SECURITY.md अद्यावधिक गर्नुहोस्
test: observability unit test हरू थप्नुहोस्
refactor(db): rate limit table हरू एकीकृत गर्नुहोस्
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`।

---

## Test हरू चलाउने

```bash
# सबै test हरू (unit + vitest + ecosystem + e2e)
npm run test:all

# एउटा test file (Node.js को native test runner — अधिकांश test ले यही प्रयोग गर्छन्)
node --import tsx/esm --test tests/unit/your-file.test.ts

# तपाईंको परिवर्तनबाट प्रभावित unit test हरू मात्र (CI gate कै TIA selector, #8084)
npm run test:scoped            # पछिल्लो commit मा भएका परिवर्तनहरू (वा working tree)
npm run test:scoped:staged     # staged परिवर्तनहरू मात्र — pre-commit run सँग राम्रोसँग मिल्छ
npm run test:scoped:full       # पहिले import-graph map पुनः निर्माण गर्नुहोस् (file थपेपछि/सारेपछि)
# Exit 1 + "run the full suite" को अर्थ hub file (tsconfig, package.json, …) वा
# map नगरिएको source परिवर्तन भएको हो — selector सुरक्षित रूपमा असफल हुन्छ, यसले कहिल्यै चुपचाप छोड्दैन।

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E test हरू (Playwright आवश्यक पर्छ)
npm run test:e2e

# Protocol client E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility test हरू
npm run test:ecosystem

# Coverage gate: statements/lines/functions/branches का लागि 60%
npm run test:coverage
npm run coverage:report

# Lint + format जाँच
npm run lint
npm run check

# Gate गरिएको वास्तविक-upstream combo smoke (VPS पहुँच + वास्तविक provider credits आवश्यक पर्छ)
# वास्तविक provider हरूमा request पठाउँछ — थोरै लागत लाग्छ। CI मा कहिल्यै चल्दैन। gate नभएमा सफासँग skip हुन्छ।
# आवश्यक: ssh root@192.168.0.15 पहुँच (VPS बाट read-only DB snapshot source गर्छ)।
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — साधारण Node ESM script हरू, live .15 server मा सिधै request पठाउँछन्।
# आवश्यक: ssh root@192.168.0.15 पहुँच (combo हरू SSH sqlite मार्फत सिर्जना/हटाइन्छन्)।
# वास्तविक provider हरूमा request पठाउँछ (सानो लागत)। __live_test__* combo हरू मात्र सिर्जना/मेटाउँछ। CI मा कहिल्यै चल्दैन।
# .15 मा REQUIRE_API_KEY=false भएकाले API key आवश्यक पर्दैन, तर सेट गरिएको भए COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY लाई मान्छ।
npm run test:combo:live:vps              # 7 HTTP scenario हरू (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # वास्तविक cross-provider failover scenario थप्छ (जम्मा 8)
```

Coverage सम्बन्धी टिप्पणीहरू:

- `npm run test:coverage` ले मुख्य unit test suite को source coverage मापन गर्छ, `tests/**` लाई समावेश गर्दैन, र `open-sse/**` लाई समावेश गर्छ
- Pull request हरूले statements/lines/functions/branches का लागि coverage gate **60%+** मा कायम राख्नुपर्छ
- कुनै PR ले `src/`, `open-sse/`, `electron/`, वा `bin/` भित्रको production code परिवर्तन गर्छ भने, त्यसै PR मा automated test थप्न वा अद्यावधिक गर्नुपर्छ
- `npm run coverage:report` ले पछिल्लो coverage run बाट विस्तृत file-by-file report प्रिन्ट गर्छ
- `npm run test:coverage:legacy` ले ऐतिहासिक तुलनाका लागि पुरानो metric सुरक्षित राख्छ
- चरणबद्ध coverage सुधार roadmap का लागि `docs/ops/COVERAGE_PLAN.md` हेर्नुहोस्

### Pull Request का आवश्यकताहरू

PR खोल्नुअघि, तपाईंले परिवर्तन गरेको भागका लागि केन्द्रित loop चलाउन
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) प्रयोग गर्नुहोस्।
पूर्ण unit suite (4 CI shards), Vitest, **60%+** coverage gate, र production build को
जिम्मेवारी CI को हो — तिनलाई स्थानीय रूपमा चलाउँदा PR का जाँचहरूले पहिल्यै नदिने कुनै थप
संकेत प्राप्त हुँदैन, र साना machine हरूमा यसले host लाई अत्यधिक व्यस्त बनाउन सक्छ (#8084):

- तपाईंको परिवर्तन समेट्ने test file हरू चलाउनुहोस्: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` चलाउनुहोस्
- production code परिवर्तन हुँदा त्यसै PR मा automated test हरू समावेश वा अद्यावधिक गर्नुहोस्
- production code परिवर्तन भएको अवस्थामा PR description मा परिवर्तन वा थप गरिएका test file हरू समावेश गर्नुहोस्
- CI मा project secrets configure गरिएका छन् भने PR मा SonarQube को नतिजा जाँच गर्नुहोस्

हालको test स्थिति: निम्नलाई समेट्ने **122 unit test file हरू**:

- Provider translator र format conversion
- Rate limiting, circuit breaker, र resilience
- Semantic cache, idempotency, progress tracking
- Database operation र schema (21 DB modules)
- OAuth flow र authentication
- API endpoint validation (Zod v4)
- MCP server tool र scope enforcement
- Memory र Skills system हरू

---

## कोड शैली

- **ESLint** — कमिट गर्नुअघि `npm run lint` चलाउनुहोस्
- **Prettier** — कमिट गर्दा `lint-staged` मार्फत स्वतः ढाँचाबद्ध हुन्छ (2 स्पेस, सेमिकोलन, दोहोरो उद्धरण चिह्न, 100 क्यारेक्टर चौडाइ, es5 ट्रेलिङ कमाहरू)
- **TypeScript** — सबै `src/` कोडले `.ts`/`.tsx` प्रयोग गर्छ; `open-sse/` ले `.ts`/`.js` प्रयोग गर्छ; TSDoc (`@param`, `@returns`, `@throws`) मार्फत दस्तावेजीकरण गर्नुहोस्
- **`eval()` निषेध** — ESLint ले `no-eval`, `no-implied-eval`, `no-new-func` लागू गर्छ
- **Zod प्रमाणीकरण** — सबै API इनपुट प्रमाणीकरणका लागि Zod v4 स्किमाहरू प्रयोग गर्नुहोस्
- **नामकरण**: फाइलहरू = camelCase/kebab-case, कम्पोनेन्टहरू = PascalCase, कन्स्ट्यान्टहरू = UPPER_SNAKE

### त्रुटि व्यवस्थापन / खाली catch ब्लकहरू

कुनै पनि `catch` लाई व्याख्याविहीन नछोड्नुहोस्। यसलाई दुईमध्ये एउटा वर्गमा वर्गीकरण गर्नुहोस् (यसले
"SSE स्ट्रिमहरूमा त्रुटिहरूलाई कहिल्यै मौन रूपमा बेवास्ता नगर्नुहोस्" भन्ने कडा नियमलाई कार्यान्वयनयोग्य
बनाउँछ):

- **जानाजानी (हाम्रो आफ्नै सक्दो क्लिनअप/टेलिमेट्री)** — यहाँ विफलता अपेक्षित र
  हानिरहित हुन्छ; एक-हरफे औचित्य टिप्पणी थप्नुहोस्, लगिङ नगर्नुहोस् (हरेक अनुरोधमा गरिने लगिङबाट
  उत्पन्न हुने अनावश्यक सूचना यस परम्पराले रोक्छ)।

  ```ts
  } catch {} // क्लाइन्ट विच्छेद भएपछि पहिले नै बन्द भएको कन्ट्रोलर बन्द गर्न खोज्नु अपेक्षित हो
  ```

- **लग गर्नुपर्ने (बाह्य/कलरले उपलब्ध गराएको कोड, वा बेवास्ता गर्दा नियन्त्रण प्रवाह परिवर्तन हुने)** — catch
  कायम राख्नुहोस् (यसलाई कहिल्यै स्ट्रिम बिगार्न नदिनुहोस्), तर विफलता पत्ता लगाउन सकिने बनाउन सन्दर्भसहितको
  `console.debug`/`warn` उत्सर्जन गर्नुहोस्।

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure कलब्याक त्रुटि:", e);
  }
  ```

लागू गरिएका उदाहरणहरूका लागि `open-sse/utils/stream.ts` र `open-sse/utils/streamHandler.ts` हेर्नुहोस्।

---

## परियोजना संरचना

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # ड्यासबोर्ड पृष्ठहरू (23 खण्ड)
│   ├── api/                # API रुटहरू (51 डाइरेक्टरी)
│   └── login/              # प्रमाणीकरण पृष्ठहरू (.tsx)
├── domain/                 # नीति इन्जिन (policyEngine, comboResolver, costRules, आदि)
├── lib/                    # मुख्य व्यावसायिक तर्क (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 प्रोटोकल सर्भर
│   ├── acp/                # Agent Communication Protocol रजिस्ट्री
│   ├── compliance/         # अनुपालन नीति इन्जिन
│   ├── db/                 # SQLite डोमेन मोड्युलहरू + 130 माइग्रेसन
│   ├── memory/             # दीर्घकालीन संवादात्मक मेमोरी
│   ├── oauth/              # OAuth प्रदायकहरू, सेवाहरू र उपयोगिताहरू
│   ├── skills/             # विस्तारयोग्य सीप फ्रेमवर्क
│   ├── usage/              # प्रयोग ट्र्याकिङ र लागत गणना
│   └── localDb.ts          # पुनः-निर्यात तह मात्र — यहाँ कहिल्यै तर्क नथप्नुहोस्
├── middleware/              # अनुरोध मिडलवेयर (promptInjectionGuard)
├── mitm/                   # MITM प्रोक्सी (प्रमाणपत्र, DNS, लक्ष्य रुटिङ)
├── shared/
│   ├── components/         # React कम्पोनेन्टहरू (.tsx)
│   ├── constants/          # प्रदायक परिभाषाहरू (329), MCP स्कोपहरू, 19 रुटिङ रणनीतिहरू
│   ├── utils/              # सर्किट ब्रेकर, स्यानिटाइजर, प्रमाणीकरण सहायकहरू
│   └── validation/         # Zod v4 स्किमाहरू
└── sse/                    # SSE प्रोक्सी पाइपलाइन

open-sse/                   # @omniroute/open-sse वर्कस्पेस
├── executors/              # 89 एक्जिक्युटर कार्यान्वयन मोड्युल
├── handlers/               # 11 अनुरोध ह्यान्डलर (च्याट, प्रतिक्रियाहरू, एम्बेडिङहरू, छविहरू, आदि)
├── mcp-server/             # MCP सर्भर (110 विशिष्ट उपकरण, 3 ट्रान्सपोर्ट, 33 स्कोप)
├── services/               # 178 शीर्ष-स्तरीय सेवा (combo, autoCombo, rateLimitManager, आदि)
├── translator/             # ढाँचा अनुवादकहरू (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API ट्रान्सफर्मर
└── utils/                  # 22 उपयोगिता मोड्युल (स्ट्रिम, TLS, प्रोक्सी, लगिङ)

electron/                   # Electron डेस्कटप एप (बहु-प्लेटफर्म)

tests/
├── unit/                   # Node.js परीक्षण रनर (1,574 परीक्षण फाइल)
├── integration/            # एकीकरण परीक्षणहरू
├── e2e/                    # Playwright परीक्षणहरू
├── security/               # सुरक्षा परीक्षणहरू
├── translator/             # अनुवादक-विशिष्ट परीक्षणहरू
└── load/                   # लोड परीक्षणहरू

docs/
├── adr/                     # वास्तुकला निर्णय अभिलेखहरू
├── architecture/            # प्रणाली वास्तुकला र उत्थानशीलता
├── comparison/              # OmniRoute बनाम विकल्पहरू
├── compression/             # कम्प्रेसन मार्गदर्शिका र नियमहरू
├── dev/                     # विकास मार्गदर्शिकाहरू
├── diagrams/                # वास्तुकला रेखाचित्रहरू
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # प्रयोगकर्ता मार्गदर्शिका, Docker, सेटअप, समस्या निवारण
├── i18n/                    # अन्तर्राष्ट्रियकृत README अनुवादहरू
├── marketing/               # मार्केटिङ सामग्रीहरू
├── ops/                     # डिप्लोयमेन्ट, प्रोक्सी, कभरेज, रिलिजहरू
├── providers/               # प्रदायक-विशिष्ट दस्तावेजहरू
├── reference/               # API सन्दर्भ, वातावरण चरहरू, CLI उपकरणहरू, निःशुल्क टियरहरू
├── releases/                # रिलिज टिप्पणीहरू
├── routing/                 # स्वतः-कम्बो इन्जिन, तर्क पुनःप्रदर्शन
├── screenshots/             # ड्यासबोर्ड स्क्रिनसटहरू
├── security/                # सुरक्षा सीमाहरू, अनुपालन, गोपनीयता, टोकनहरू
└── specs/                   # डिजाइन विशिष्टताहरू
```

---

## नयाँ Provider थप्ने

### चरण 1: Provider Constants दर्ता गर्नुहोस्

`src/shared/constants/providers.ts` मा थप्नुहोस् — module load हुँदा Zod मार्फत प्रमाणीकरण हुन्छ।

### चरण 2: Executor थप्नुहोस् (custom logic आवश्यक भएमा)

base executor लाई extend गर्ने executor `open-sse/executors/your-provider.ts` मा सिर्जना गर्नुहोस्।

### चरण 3: Translator थप्नुहोस् (non-OpenAI format भएमा)

`open-sse/translator/` मा request/response translators सिर्जना गर्नुहोस्।

### चरण 4: OAuth Config थप्नुहोस् (OAuth-based भएमा)

OAuth credentials लाई `src/lib/oauth/constants/oauth.ts` मा र service लाई `src/lib/oauth/services/` मा थप्नुहोस्।

यदि upstream provider ले आफ्नो सार्वजनिक CLI / browser bundle भित्र सार्वजनिक OAuth client_id/secret वा Firebase Web API key वितरण गर्छ भने, त्यसलाई string literal का रूपमा **embed नगर्नुहोस्**। `open-sse/utils/publicCreds.ts` बाट `resolvePublicCred()` प्रयोग गर्नुहोस् र `EMBEDDED_DEFAULTS` मा masked byte entry थप्नुहोस्। पूर्ण अनिवार्य workflow [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) मा दस्तावेजीकरण गरिएको छ।

handlers/executors भित्र, client सम्म पुग्ने error messages लाई `open-sse/utils/error.ts` को `buildErrorBody()` / `sanitizeErrorMessage()` मार्फत पठाउनैपर्छ — Response body मा raw `err.stack` वा `err.message` कहिल्यै नराख्नुहोस्। [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) हेर्नुहोस्।

### चरण 5: Models दर्ता गर्नुहोस्

`open-sse/config/providerRegistry.ts` मा model definitions थप्नुहोस्।

### चरण 6: Tests थप्नुहोस्

कम्तीमा निम्न कुराहरू समेट्ने unit tests `tests/unit/` मा लेख्नुहोस्:

- Provider दर्ता
- Request/response translation
- Error handling

---

## Pull Request Checklist

- [ ] Tests सफल हुन्छन् (`npm test`)
- [ ] Linting सफल हुन्छ (`npm run lint`)
- [ ] Build सफल हुन्छ (`npm run build`)
- [ ] नयाँ public functions र interfaces का लागि TypeScript types थपिएका छन्
- [ ] कुनै hardcoded secrets वा fallback values छैनन्
- [ ] सार्वजनिक upstream credentials लाई `resolvePublicCred()` मार्फत embed गरिएको छ ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) हेर्नुहोस्), literals का रूपमा कहिल्यै होइन
- [ ] Error responses लाई `buildErrorBody()` / `sanitizeErrorMessage()` मार्फत route गरिएको छ — response bodies मा raw stack traces छैनन् ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) हेर्नुहोस्)
- [ ] Shell commands (`exec` / `spawn`) ले runtime values लाई string interpolation मार्फत होइन, `env` मार्फत पठाउँछन्
- [ ] सबै inputs लाई Zod schemas प्रयोग गरेर validate गरिएको छ
- [ ] User-facing changes का लागि `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` अन्तर्गत changelog **fragment** थपिएको छ ([`changelog.d/README.md`](./changelog.d/README.md) हेर्नुहोस्) — `CHANGELOG.md` लाई सीधै edit **नगर्नुहोस्**; fragments लाई release को समयमा aggregate गरिन्छ र PRs बीच कहिल्यै conflict हुँदैन
- [ ] Documentation अद्यावधिक गरिएको छ (लागू भएमा)
- [ ] कुनै नयाँ CodeQL / Secret-Scanning alerts खोलिएका छैनन्, वा प्रत्येकलाई सम्बन्धित `docs/security/` doc उल्लेख गर्ने technical justification सहित dismiss गरिएको छ
- [ ] Child processes spawn गर्ने routes (`/api/mcp/`, `/api/cli-tools/runtime/`) लाई `src/server/authz/routeGuard.ts` मा `isLocalOnlyPath()` का रूपमा classify गरिएको छ — [Hard Rule #15](docs/security/ROUTE_GUARD_TIERS.md) हेर्नुहोस्
- [ ] Commit messages मा `Co-Authored-By` trailers छैनन् — commits केवल repository owner को Git identity अन्तर्गत देखिनुपर्छ (Hard Rule #16)

---

## रिलीज गर्ने प्रक्रिया

रिलिजहरू `/generate-release` कार्यप्रवाहमार्फत व्यवस्थापन गरिन्छन्। नयाँ GitHub Release सिर्जना भएपछि, प्याकेज GitHub Actions मार्फत **स्वचालित रूपमा npm मा प्रकाशित हुन्छ**।

VPS डिप्लोयका लागि, `npm run build` होइन, `npm run build:release` प्रयोग गर्नुहोस् — यसले सफा
पुनर्निर्माण गर्छ, बन्डललाई `dist/` मा संयोजन गर्छ, र `dist/BUILD_SHA` सेन्टिनेल लेख्छ।
त्यसपछि रिमोट `app/` डाइरेक्टरीमा `dist/` लाई rsync गर्ने `/deploy-vps-*-cc` स्किलहरू प्रयोग गर्नुहोस्।

---

## मद्दत प्राप्त गर्ने

- **आर्किटेक्चर**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) हेर्नुहोस्
- **API सन्दर्भ**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) हेर्नुहोस्
- **सुरक्षा कागजातहरू**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **सञ्चालनसम्बन्धी कागजातहरू**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **समस्याहरू**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: आर्किटेक्चरल निर्णय अभिलेखहरूका लागि `docs/adr/` हेर्नुहोस्
