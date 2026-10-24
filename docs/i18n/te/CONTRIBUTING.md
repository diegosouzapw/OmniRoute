# Contributing to OmniRoute (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## డెవలప్మెంట్ సెటప్

### ముందస్తు అవసరాలు

- **Node.js** `>=22.22.2 <23`, లేదా `>=24.0.0 <27` (సిఫార్సు: 24 LTS)
- **npm** 10+

> **npm v11+ వినియోగదారులు (Node 24+):** `npm install` తర్వాత, స్థానిక మాడ్యూల్లు ఇన్స్టాల్ అయ్యాయో లేదో ధృవీకరించండి:
> `node -e "require('better-sqlite3')"`. ఇది `MODULE_NOT_FOUND`తో విఫలమైతే,
> `npm approve-scripts better-sqlite3 && npm install` అమలు చేయండి. చూడండి:
> [సమస్య పరిష్కారం](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### క్లోన్ చేయడం & ఇన్స్టాల్ చేయడం

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### ఎన్విరాన్మెంట్ వేరియబుల్స్

```bash
# టెంప్లేట్ నుండి మీ .envను సృష్టించండి
cp .env.example .env

# అవసరమైన సీక్రెట్లను రూపొందించండి
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

డెవలప్మెంట్కు ముఖ్యమైన వేరియబుల్స్:

| వేరియబుల్              | డెవలప్మెంట్ డిఫాల్ట్     | వివరణ                  |
| ---------------------- | ------------------------ | ---------------------- |
| `PORT`                 | `20128`                  | సర్వర్ పోర్ట్          |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | ఫ్రంట్ఎండ్ బేస్ URL    |
| `JWT_SECRET`           | (పైన రూపొందించండి)       | JWT సంతకం సీక్రెట్     |
| `INITIAL_PASSWORD`     | `CHANGEME`               | మొదటి లాగిన్ పాస్వర్డ్ |
| `APP_LOG_LEVEL`        | `info`                   | లాగ్ వివరాల స్థాయి     |

### డ్యాష్బోర్డ్ సెట్టింగ్లు

ఎన్విరాన్మెంట్ వేరియబుల్స్ ద్వారా కూడా కాన్ఫిగర్ చేయగల ఫీచర్ల కోసం డ్యాష్బోర్డ్ UI టాగుల్లను అందిస్తుంది:

| సెట్టింగ్ స్థానం      | టాగుల్             | వివరణ                                       |
| --------------------- | ------------------ | ------------------------------------------- |
| సెట్టింగ్లు → అధునాతన | డీబగ్ మోడ్         | డీబగ్ రిక్వెస్ట్ లాగ్లను ప్రారంభించండి (UI) |
| సెట్టింగ్లు → సాధారణ  | సైడ్బార్ దృశ్యమానత | సైడ్బార్ విభాగాలను చూపండి/దాచండి            |

ఈ సెట్టింగ్లు డేటాబేస్లో నిల్వ చేయబడతాయి, పునఃప్రారంభాల తర్వాత కూడా కొనసాగుతాయి, అలాగే సెట్ చేసినప్పుడు env var డిఫాల్ట్లను ఓవర్రైడ్ చేస్తాయి.

### స్థానికంగా అమలు చేయడం

```bash
# డెవలప్మెంట్ మోడ్ (హాట్ రీలోడ్)
npm run dev

# ప్రొడక్షన్ బిల్డ్
npm run build    # next build → .build/next/ ఆపై assembleStandalone → dist/
npm run start

# కాంట్రిబ్యూటర్ మార్పుల కోసం వేగవంతమైన బ్యాకెండ్/API-మాత్రమే కంపైల్
npm run build:contributor

# రిలీజ్ బిల్డ్ (క్లీన్ రీబిల్డ్ + HEAD సెంటినల్ — డిప్లాయ్కు అవసరం)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHAను వ్రాస్తుంది

# సాధారణ పోర్ట్ కాన్ఫిగరేషన్
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

కాంట్రిబ్యూటర్ బిల్డ్ కంపైల్-మాత్రమే ధ్రువీకరణను నిర్వహిస్తుంది: ఇది స్టాండ్అలోన్
డిస్ట్రిబ్యూషన్ను అసెంబుల్ చేయదు లేదా ఐచ్ఛిక స్థానిక ప్యాకేజింగ్ అసెట్లను బిల్డ్ చేయదు. పంపిణీ చేయగల బండిల్ను
ధ్రువీకరించాల్సినప్పుడు సాధారణ ప్రొడక్షన్ బిల్డ్ను ఉపయోగించండి.

### బిల్డ్ అవుట్పుట్ లేఅవుట్

| డైరెక్టరీ | కంటెంట్లు                                                                         | ట్రాక్ చేయబడుతుందా |
| --------- | --------------------------------------------------------------------------------- | ------------------ |
| `src/`    | అప్లికేషన్ సోర్స్ (TypeScript / TSX)                                              | అవును              |
| `.build/` | మధ్యంతర ఫైల్లు — `next build` అవుట్పుట్ (gitignored, `distDir = .build/next`)     | కాదు               |
| `dist/`   | పంపిణీ చేయగల బండిల్ — `assembleStandalone` ద్వారా అసెంబుల్ చేయబడింది (gitignored) | కాదు               |

బిల్డ్ పైప్లైన్ ఒకే పాస్లో ఉంటుంది:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js అవుట్పుట్)
  └─ assembleStandalone()                 (స్టాండ్అలోన్ + స్టాటిక్ + పబ్లిక్ + స్థానిక అసెట్లను కాపీ చేస్తుంది)
       └─ అవుట్పుట్: dist/               (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` అదనంగా ముందుగా రెండు డైరెక్టరీలను క్లీన్ చేసి, డిప్లాయ్ సమగ్రత సెంటినల్గా
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`)ను వ్రాస్తుంది.

`npm run build:contributor` బ్యాకెండ్-మాత్రమే బిల్డ్ ప్రొఫైల్ను ఉపయోగిస్తుంది. ఇది బిల్డ్ చేస్తున్నప్పుడు
డ్యాష్బోర్డ్ UI ఫైల్లను తాత్కాలికంగా స్టబ్ చేస్తుంది, API రూట్ హ్యాండ్లర్లను ఉంచుతుంది, బిల్డ్ తర్వాత అసలు ఫైల్లను
పునరుద్ధరిస్తుంది. డ్యాష్బోర్డ్ UIపై ప్రభావం చూపే మార్పుల కోసం లేదా పూర్తి
రిలీజ్ ధ్రువీకరణ కోసం `npm run build`ను ఉపయోగించండి; కాంట్రిబ్యూటర్ ప్రొఫైల్ రిలీజ్ బిల్డ్కు ప్రత్యామ్నాయం కాదు.

> **VPS డిప్లాయ్ గమనిక:** రిమోట్ ఇమేజ్ డైరెక్టరీ `/usr/lib/node_modules/omniroute/app/`
> మారలేదు. డిప్లాయ్ స్కిల్స్ `dist/`లోని కంటెంట్లను దానిలోకి rsync చేస్తాయి.
> రిపోజిటరీలోని బిల్డ్ అవుట్పుట్ పాత్ మాత్రమే మారింది (`app/` → `dist/`).

డిఫాల్ట్ URLలు:

- **డ్యాష్బోర్డ్**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git వర్క్ఫ్లో

> ⚠️ **`main`కు నేరుగా ఎప్పటికీ కమిట్ చేయవద్దు.** ఎల్లప్పుడూ ఫీచర్ బ్రాంచ్లను ఉపయోగించండి.
>
> **PR బేస్:** సక్రియంగా ఉన్న `release/vX.Y.Z` బ్రాంచ్ను లక్ష్యంగా చేసుకోండి (`main`ను కాదు). ప్రతి విడుదలకు ఒక బ్రాంచ్ + విడుదల సమయంలో ట్యాగ్ మోడల్ గురించి తెలుసుకోవడానికి
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) చూడండి.

```bash
# సక్రియంగా ఉన్న విడుదల తాజా స్థితి నుండి బ్రాంచ్ను సృష్టించండి (ఉదాహరణ: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... మార్పులు చేయండి ...
git commit -m "feat: మీ మార్పును వివరించండి"
git push -u origin feat/your-feature-name
# base = release/v3.8.49తో ఒక Pull Requestను తెరవండి
```

### బ్రాంచ్ నామకరణం

| ప్రిఫిక్స్  | ఉద్దేశ్యం                    |
| ----------- | ---------------------------- |
| `feat/`     | కొత్త ఫీచర్లు                |
| `fix/`      | బగ్ పరిష్కారాలు              |
| `refactor/` | కోడ్ పునర్వ్యవస్థీకరణ        |
| `docs/`     | డాక్యుమెంటేషన్ మార్పులు      |
| `test/`     | టెస్ట్ల చేర్పులు/పరిష్కారాలు |
| `chore/`    | టూలింగ్, CI, డిపెండెన్సీలు   |

### కమిట్ సందేశాలు

[Conventional Commits](https://www.conventionalcommits.org/)ను అనుసరించండి:

```
feat: ప్రొవైడర్ కాల్ల కోసం సర్క్యూట్ బ్రేకర్ను జోడించండి
fix: JWT సీక్రెట్ ధ్రువీకరణ ఎడ్జ్ కేసును పరిష్కరించండి
docs: PII రక్షణతో SECURITY.mdను నవీకరించండి
test: పరిశీలనీయత యూనిట్ టెస్ట్లను జోడించండి
refactor(db): రేట్ లిమిట్ టేబుల్లను ఏకీకృతం చేయండి
```

స్కోప్లు (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## పరీక్షలను అమలు చేయడం

```bash
# అన్ని పరీక్షలు (unit + vitest + ecosystem + e2e)
npm run test:all

# ఒకే పరీక్ష ఫైల్ (Node.js స్థానిక టెస్ట్ రన్నర్ — చాలా పరీక్షలు దీనినే ఉపయోగిస్తాయి)
node --import tsx/esm --test tests/unit/your-file.test.ts

# మీ మార్పు ప్రభావితం చేసిన unit పరీక్షలు మాత్రమే (CI గేట్లోని అదే TIA సెలెక్టర్, #8084)
npm run test:scoped            # చివరి commitలోని మార్పులు (లేదా working tree)
npm run test:scoped:staged     # staged మార్పులు మాత్రమే — pre-commit అమలుతో బాగా సరిపోతుంది
npm run test:scoped:full       # ముందుగా import-graph మ్యాప్ను మళ్లీ నిర్మిస్తుంది (ఫైళ్లను జోడించిన/తరలించిన తర్వాత)
# Exit 1 + "run the full suite" అంటే hub ఫైల్ (tsconfig, package.json, …) లేదా మ్యాప్ చేయని
# source మారిందని అర్థం — selector సురక్షితంగా విఫలమవుతుంది, అది ఎప్పుడూ నిశ్శబ్దంగా దాటవేయదు.

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E పరీక్షలు (Playwright అవసరం)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem అనుకూలత పరీక్షలు
npm run test:ecosystem

# Coverage గేట్: statements/lines/functions/branchesకు 60%
npm run test:coverage
npm run coverage:report

# Lint + format తనిఖీ
npm run lint
npm run check

# గేట్ చేయబడిన నిజమైన upstream combo smoke (VPS యాక్సెస్ + నిజమైన provider credits అవసరం)
# ఇది నిజమైన providersను ఉపయోగిస్తుంది — కొద్దిగా ఖర్చవుతుంది. CIలో ఎప్పుడూ అమలు కాదు. గేట్ లేకపోతే సక్రమంగా దాటవేయబడుతుంది.
# అవసరం: ssh root@192.168.0.15 యాక్సెస్ (VPS నుండి read-only DB snapshotను source చేస్తుంది).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS ప్రత్యక్ష smoke — సాధారణ Node ESM scripts, ప్రత్యక్ష .15 serverను నేరుగా ఉపయోగిస్తాయి.
# అవసరం: ssh root@192.168.0.15 యాక్సెస్ (SSH sqlite ద్వారా combos సృష్టించబడతాయి/తొలగించబడతాయి).
# నిజమైన providersను ఉపయోగిస్తుంది (చిన్న ఖర్చు). __live_test__* combosను మాత్రమే సృష్టిస్తుంది/తొలగిస్తుంది. CIలో ఎప్పుడూ అమలు కాదు.
# .15లో REQUIRE_API_KEY=false కాబట్టి API key అవసరం లేదు, కానీ సెట్ చేసి ఉంటే COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEYను గౌరవిస్తుంది.
npm run test:combo:live:vps              # 7 HTTP సందర్భాలు (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # నిజమైన cross-provider failover సందర్భాన్ని జోడిస్తుంది (మొత్తం 8)
```

Coverage గమనికలు:

- `npm run test:coverage` ప్రధాన unit test suiteకు source coverageను కొలుస్తుంది, `tests/**`ను మినహాయిస్తుంది, అలాగే `open-sse/**`ను చేర్చుతుంది
- Pull requests తప్పనిసరిగా statements/lines/functions/branches coverage గేట్ను **60%+** వద్ద ఉంచాలి
- ఒక PR `src/`, `open-sse/`, `electron/`, లేదా `bin/`లోని production codeను మార్చితే, అదే PRలో automated testsను జోడించాలి లేదా నవీకరించాలి
- `npm run coverage:report` తాజా coverage run నుండి వివరణాత్మక file-by-file reportను ముద్రిస్తుంది
- `npm run test:coverage:legacy` చారిత్రక పోలిక కోసం పాత metricను అలాగే ఉంచుతుంది
- దశలవారీ coverage మెరుగుదల roadmap కోసం `docs/ops/COVERAGE_PLAN.md` చూడండి

### Pull Request అవసరాలు

PRను తెరవడానికి ముందు, మీరు మార్చిన వాటికి సంబంధించిన focused loopను అమలు చేయడానికి
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md)ను ఉపయోగించండి. పూర్తి unit suite (4 CI shards), Vitest, **60%+** coverage గేట్, మరియు
production build CI బాధ్యత — వాటిని స్థానికంగా అమలు చేయడం వల్ల PR
తనిఖీలు ఇప్పటికే అందించని అదనపు సంకేతమేదీ రాదు, అలాగే చిన్న machinesలో అది hostను పూర్తిగా వినియోగించవచ్చు (#8084):

- మీ మార్పును cover చేసే test filesను అమలు చేయండి: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint`ను అమలు చేయండి
- production code మారినప్పుడల్లా అదే PRలో automated testsను చేర్చండి లేదా నవీకరించండి
- production code మారినప్పుడు, మార్చిన లేదా జోడించిన test filesను PR వివరణలో చేర్చండి
- CIలో project secrets configure చేసి ఉన్నప్పుడు PRపై SonarQube ఫలితాన్ని తనిఖీ చేయండి

ప్రస్తుత పరీక్ష స్థితి: కింది వాటిని cover చేసే **122 unit test files**:

- Provider translators మరియు format conversion
- Rate limiting, circuit breaker, మరియు resilience
- Semantic cache, idempotency, progress tracking
- Database operations మరియు schema (21 DB modules)
- OAuth flows మరియు authentication
- API endpoint validation (Zod v4)
- MCP server tools మరియు scope enforcement
- Memory మరియు Skills systems

---

## కోడ్ శైలి

- **ESLint** — కమిట్ చేసే ముందు `npm run lint` అమలు చేయండి
- **Prettier** — కమిట్ సమయంలో `lint-staged` ద్వారా స్వయంచాలకంగా ఫార్మాట్ చేయబడుతుంది (2 స్పేస్లు, సెమీకోలన్లు, డబుల్ కోట్లు, 100 అక్షరాల వెడల్పు, es5 ట్రైలింగ్ కామాలు)
- **TypeScript** — మొత్తం `src/` కోడ్ `.ts`/`.tsx` ఉపయోగిస్తుంది; `open-sse/` `.ts`/`.js` ఉపయోగిస్తుంది; TSDocతో (`@param`, `@returns`, `@throws`) డాక్యుమెంట్ చేయండి
- **`eval()` వద్దు** — ESLint `no-eval`, `no-implied-eval`, `no-new-func`లను అమలు చేస్తుంది
- **Zod ధ్రువీకరణ** — అన్ని API ఇన్పుట్ ధ్రువీకరణల కోసం Zod v4 స్కీమాలను ఉపయోగించండి
- **నామకరణం**: ఫైళ్లు = camelCase/kebab-case, కాంపోనెంట్లు = PascalCase, స్థిరాంకాలు = UPPER_SNAKE

### లోపాల నిర్వహణ / ఖాళీ catch బ్లాక్లు

ఎప్పుడూ `catch`ను వివరణ లేకుండా వదిలివేయవద్దు. దాన్ని రెండు వర్గాల్లో ఒకదానిగా వర్గీకరించండి ("SSE స్ట్రీమ్లలో లోపాలను ఎప్పుడూ నిశ్శబ్దంగా విస్మరించవద్దు" అనే కఠిన నియమాన్ని ఆచరణలో పెడుతుంది):

- **ఉద్దేశపూర్వకం (మన స్వంత సాధ్యమైనంత-ఉత్తమమైన క్లీనప్/టెలిమెట్రీ)** — ఇక్కడ వైఫల్యం సంభవించడం ఊహించదగినది మరియు హానిరహితమైనది; ఒక-లైన్ కారణ వివరణ కామెంట్ను జోడించండి, లాగింగ్ చేయవద్దు (ప్రతి అభ్యర్థనపై లాగింగ్ చేయడం వల్ల ఏర్పడే అనవసర సందడిని ఈ నియమం నివారిస్తుంది).

  ```ts
  } catch {} // క్లయింట్ డిస్కనెక్ట్ అయిన తర్వాత ఇప్పటికే మూసివేయబడిన కంట్రోలర్ను మూసివేయడం ఊహించదగినదే
  ```

- **లాగ్ చేయాలి (బాహ్య/కాలర్ అందించిన కోడ్, లేదా విస్మరించడం వల్ల కంట్రోల్ ఫ్లో మారినప్పుడు)** — `catch`ను ఉంచండి (అది స్ట్రీమ్ను విచ్ఛిన్నం చేయనివ్వవద్దు), కానీ వైఫల్యాన్ని గుర్తించగలిగేలా సందర్భోచితమైన `console.debug`/`warn`ను విడుదల చేయండి.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

అమలు చేసిన ఉదాహరణల కోసం `open-sse/utils/stream.ts` మరియు `open-sse/utils/streamHandler.ts` చూడండి.

---

## ప్రాజెక్ట్ నిర్మాణం

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # డ్యాష్బోర్డ్ పేజీలు (23 విభాగాలు)
│   ├── api/                # API రూట్లు (51 డైరెక్టరీలు)
│   └── login/              # ప్రామాణీకరణ పేజీలు (.tsx)
├── domain/                 # పాలసీ ఇంజిన్ (policyEngine, comboResolver, costRules, మొదలైనవి)
├── lib/                    # ప్రధాన వ్యాపార లాజిక్ (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 ప్రోటోకాల్ సర్వర్
│   ├── acp/                # Agent Communication Protocol రిజిస్ట్రీ
│   ├── compliance/         # అనుగుణ్యత పాలసీ ఇంజిన్
│   ├── db/                 # SQLite డొమైన్ మాడ్యూల్స్ + 130 మైగ్రేషన్లు
│   ├── memory/             # నిరంతర సంభాషణాత్మక మెమరీ
│   ├── oauth/              # OAuth ప్రొవైడర్లు, సేవలు మరియు యుటిలిటీలు
│   ├── skills/             # విస్తరించగల స్కిల్ ఫ్రేమ్వర్క్
│   ├── usage/              # వినియోగ ట్రాకింగ్ మరియు ఖర్చు గణన
│   └── localDb.ts          # రీ-ఎక్స్పోర్ట్ లేయర్ మాత్రమే — ఇక్కడ లాజిక్ను ఎప్పుడూ జోడించవద్దు
├── middleware/              # అభ్యర్థన మిడిల్వేర్ (promptInjectionGuard)
├── mitm/                   # MITM ప్రాక్సీ (సర్టిఫికేట్, DNS, లక్ష్య రూటింగ్)
├── shared/
│   ├── components/         # React కాంపోనెంట్లు (.tsx)
│   ├── constants/          # ప్రొవైడర్ నిర్వచనాలు (329), MCP స్కోప్లు, 21 రూటింగ్ వ్యూహాలు
│   ├── utils/              # సర్క్యూట్ బ్రేకర్, శానిటైజర్, ప్రామాణీకరణ సహాయకాలు
│   └── validation/         # Zod v4 స్కీమాలు
└── sse/                    # SSE ప్రాక్సీ పైప్లైన్

open-sse/                   # @omniroute/open-sse వర్క్స్పేస్
├── executors/              # 150 ఎగ్జిక్యూటర్ మాడ్యూల్స్ (ఎగ్జిక్యూటర్ క్లాసులు + ప్రతి ప్రొవైడర్కు సహాయకాలు)
├── handlers/               # 11 అభ్యర్థన హ్యాండ్లర్లు (చాట్, ప్రతిస్పందనలు, ఎంబెడ్డింగ్లు, చిత్రాలు, మొదలైనవి)
├── mcp-server/             # MCP సర్వర్ (110 ప్రత్యేక టూల్స్, 3 ట్రాన్స్పోర్ట్లు, 33 స్కోప్లు)
├── services/               # 178 అగ్ర-స్థాయి సేవలు (combo, autoCombo, rateLimitManager, మొదలైనవి)
├── translator/             # ఫార్మాట్ ట్రాన్స్లేటర్లు (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API ట్రాన్స్ఫార్మర్
└── utils/                  # 22 యుటిలిటీ మాడ్యూల్స్ (స్ట్రీమ్, TLS, ప్రాక్సీ, లాగింగ్)

electron/                   # Electron డెస్క్టాప్ యాప్ (బహుళ-ప్లాట్ఫారమ్)

tests/
├── unit/                   # Node.js టెస్ట్ రన్నర్ (1,574 టెస్ట్ ఫైళ్లు)
├── integration/            # ఇంటిగ్రేషన్ పరీక్షలు
├── e2e/                    # Playwright పరీక్షలు
├── security/               # భద్రతా పరీక్షలు
├── translator/             # ట్రాన్స్లేటర్-నిర్దిష్ట పరీక్షలు
└── load/                   # లోడ్ పరీక్షలు

docs/
├── adr/                     # ఆర్కిటెక్చర్ నిర్ణయ రికార్డులు
├── architecture/            # సిస్టమ్ ఆర్కిటెక్చర్ & స్థితిస్థాపకత
├── comparison/              # OmniRoute మరియు ప్రత్యామ్నాయాల మధ్య పోలిక
├── compression/             # కంప్రెషన్ మార్గదర్శకాలు & నియమాలు
├── dev/                     # అభివృద్ధి మార్గదర్శకాలు
├── diagrams/                # ఆర్కిటెక్చర్ రేఖాచిత్రాలు
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # వినియోగదారు మార్గదర్శకం, Docker, సెటప్, సమస్య పరిష్కారం
├── i18n/                    # అంతర్జాతీయీకరించిన README అనువాదాలు
├── marketing/               # మార్కెటింగ్ సామగ్రి
├── ops/                     # డిప్లాయ్మెంట్, ప్రాక్సీ, కవరేజ్, విడుదలలు
├── providers/               # ప్రొవైడర్-నిర్దిష్ట డాక్యుమెంటేషన్
├── reference/               # API సూచన, పర్యావరణ వేరియబుల్స్, CLI టూల్స్, ఉచిత టియర్లు
├── releases/                # విడుదల గమనికలు
├── routing/                 # ఆటో-కాంబో ఇంజిన్, రీజనింగ్ రీప్లే
├── screenshots/             # డ్యాష్బోర్డ్ స్క్రీన్షాట్లు
├── security/                # గార్డ్రైల్స్, అనుగుణ్యత, స్టెల్త్, టోకెన్లు
└── specs/                   # డిజైన్ స్పెసిఫికేషన్లు
```

---

## కొత్త ప్రొవైడర్ను జోడించడం

### దశ 1: ప్రొవైడర్ స్థిరాంకాలను నమోదు చేయండి

`src/shared/constants/providers.ts`కు జోడించండి — మాడ్యూల్ లోడ్ సమయంలో Zod ద్వారా ధృవీకరించబడుతుంది.

### దశ 2: ఎగ్జిక్యూటర్ను జోడించండి (కస్టమ్ లాజిక్ అవసరమైతే)

బేస్ ఎగ్జిక్యూటర్ను విస్తరిస్తూ `open-sse/executors/your-provider.ts`లో ఎగ్జిక్యూటర్ను సృష్టించండి.

### దశ 3: ట్రాన్స్లేటర్ను జోడించండి (OpenAI కాని ఫార్మాట్ అయితే)

`open-sse/translator/`లో రిక్వెస్ట్/రెస్పాన్స్ ట్రాన్స్లేటర్లను సృష్టించండి.

### దశ 4: OAuth కాన్ఫిగరేషన్ను జోడించండి (OAuth ఆధారితమైతే)

`src/lib/oauth/constants/oauth.ts`లో OAuth క్రెడెన్షియల్స్ను, `src/lib/oauth/services/`లో సర్వీస్ను జోడించండి.

అప్స్ట్రీమ్ ప్రొవైడర్ తన పబ్లిక్ CLI / బ్రౌజర్ బండిల్లో పబ్లిక్ OAuth client_id/secret లేదా Firebase Web API కీని పంపిణీ చేస్తే, దానిని స్ట్రింగ్ లిటరల్గా **ఎంబెడ్ చేయవద్దు**. `open-sse/utils/publicCreds.ts`లోని `resolvePublicCred()`ను ఉపయోగించి, `EMBEDDED_DEFAULTS`కు మాస్క్ చేసిన బైట్ ఎంట్రీని జోడించండి. పూర్తి తప్పనిసరి వర్క్ఫ్లో [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)లో డాక్యుమెంట్ చేయబడింది.

హ్యాండ్లర్లు/ఎగ్జిక్యూటర్లలో, క్లయింట్కు చేరే ఎర్రర్ సందేశాలు తప్పనిసరిగా `open-sse/utils/error.ts`లోని `buildErrorBody()` / `sanitizeErrorMessage()` ద్వారా వెళ్లాలి — ముడి `err.stack` లేదా `err.message`ను Response బాడీలో ఎప్పుడూ ఉంచవద్దు. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)ను చూడండి.

### దశ 5: మోడళ్లను నమోదు చేయండి

`open-sse/config/providerRegistry.ts`లో మోడల్ నిర్వచనాలను జోడించండి.

### దశ 6: టెస్ట్లను జోడించండి

కనీసం కింది అంశాలను కవర్ చేసే యూనిట్ టెస్ట్లను `tests/unit/`లో రాయండి:

- ప్రొవైడర్ నమోదు
- రిక్వెస్ట్/రెస్పాన్స్ అనువాదం
- ఎర్రర్ నిర్వహణ

---

## పుల్ రిక్వెస్ట్ చెక్లిస్ట్

- [ ] పరీక్షలు విజయవంతమయ్యాయి (`npm test`)
- [ ] లింటింగ్ విజయవంతమైంది (`npm run lint`)
- [ ] బిల్డ్ విజయవంతమైంది (`npm run build`)
- [ ] కొత్త పబ్లిక్ ఫంక్షన్లు మరియు ఇంటర్ఫేస్ల కోసం TypeScript టైప్లు జోడించబడ్డాయి
- [ ] హార్డ్కోడ్ చేసిన సీక్రెట్లు లేదా ఫాల్బ్యాక్ విలువలు లేవు
- [ ] పబ్లిక్ అప్స్ట్రీమ్ క్రెడెన్షియల్స్ను లిటరల్స్గా కాకుండా `resolvePublicCred()` ద్వారా పొందుపరిచారు ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) చూడండి)
- [ ] ఎర్రర్ రెస్పాన్స్లు `buildErrorBody()` / `sanitizeErrorMessage()` ద్వారా పంపబడతాయి — రెస్పాన్స్ బాడీలలో ముడి స్టాక్ ట్రేస్లు ఉండవు ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) చూడండి)
- [ ] షెల్ కమాండ్లు (`exec` / `spawn`) రన్టైమ్ విలువలను స్ట్రింగ్ ఇంటర్పోలేషన్ ద్వారా కాకుండా `env` ద్వారా పంపుతాయి
- [ ] అన్ని ఇన్పుట్లు Zod స్కీమాలతో ధ్రువీకరించబడ్డాయి
- [ ] వినియోగదారులకు కనిపించే మార్పుల కోసం `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` కింద చేంజ్లాగ్ **ఫ్రాగ్మెంట్** జోడించబడింది ([`changelog.d/README.md`](./changelog.d/README.md) చూడండి) — `CHANGELOG.md`ను నేరుగా సవరించవద్దు; ఫ్రాగ్మెంట్లు విడుదల సమయంలో సమీకరించబడతాయి మరియు PRల మధ్య ఎప్పటికీ విభేదించవు
- [ ] డాక్యుమెంటేషన్ నవీకరించబడింది (వర్తిస్తే)
- [ ] కొత్త CodeQL / Secret-Scanning అలర్ట్లు ఏవీ తెరవబడలేదు లేదా ప్రతి అలర్ట్ను సంబంధిత `docs/security/` డాక్యుమెంట్ను సూచించే సాంకేతిక సమర్థనతో డిస్మిస్ చేశారు
- [ ] చైల్డ్ ప్రాసెస్లను ప్రారంభించే రూట్లు (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts`లో `isLocalOnlyPath()`గా వర్గీకరించబడ్డాయి — [కఠిన నియమం #15](docs/security/ROUTE_GUARD_TIERS.md) చూడండి
- [ ] కమిట్ సందేశాలలో AI/బాట్ `Co-authored-by` ట్రైలర్లు లేవు (కఠిన నియమం #16) — తిరిగి ఉపయోగించిన పనికి చెందిన మానవ సహకారులకు ప్రామాణిక `Co-authored-by: Name <email>` ట్రైలర్లతో క్రెడిట్ ఇవ్వబడింది

---

## విడుదల చేయడం

విడుదలలు `/generate-release` వర్క్ఫ్లో ద్వారా నిర్వహించబడతాయి. కొత్త GitHub Release సృష్టించబడినప్పుడు, ప్యాకేజీ GitHub Actions ద్వారా **స్వయంచాలకంగా npmకు ప్రచురించబడుతుంది**.

VPS డిప్లాయ్మెంట్ల కోసం, `npm run build` కాకుండా `npm run build:release` ఉపయోగించండి — ఇది పూర్తిగా
మళ్లీ బిల్డ్ చేసి, బండిల్ను `dist/`లో సమీకరించి, `dist/BUILD_SHA` సెంటినెల్ను వ్రాస్తుంది.
ఆ తర్వాత `dist/`ను రిమోట్ `app/` డైరెక్టరీకి rsync చేసే `/deploy-vps-*-cc` స్కిల్లను ఉపయోగించండి.

---

## సహాయం పొందడం

- **ఆర్కిటెక్చర్**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) చూడండి
- **API రిఫరెన్స్**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) చూడండి
- **భద్రతా డాక్యుమెంటేషన్**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **ఆపరేషన్స్ డాక్యుమెంటేషన్**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **సమస్యలు**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
