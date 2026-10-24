# Contributing to OmniRoute (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## உருவாக்கச் சூழல் அமைப்பு

### முன்தேவைகள்

- **Node.js** `>=22.22.2 <23`, அல்லது `>=24.0.0 <27` (பரிந்துரைக்கப்படுவது: 24 LTS)
- **npm** 10+

> **npm v11+ பயனர்கள் (Node 24+):** `npm install`-க்குப் பிறகு, நேட்டிவ் தொகுதிகள் நிறுவப்பட்டுள்ளனவா என்பதைச் சரிபார்க்கவும்:
> `node -e "require('better-sqlite3')"`. இது `MODULE_NOT_FOUND` பிழையுடன் தோல்வியடைந்தால்,
> `npm approve-scripts better-sqlite3 && npm install` என்பதை இயக்கவும். மேலும் அறிய
> [சிக்கல் தீர்த்தல்](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module) என்பதைப் பார்க்கவும்.

- **Git**

### குளோன் செய்து நிறுவுதல்

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### சூழல் மாறிகள்

```bash
# வார்ப்புருவிலிருந்து உங்கள் .env கோப்பை உருவாக்கவும்
cp .env.example .env

# தேவையான இரகசியங்களை உருவாக்கவும்
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

உருவாக்கத்திற்கான முக்கிய மாறிகள்:

| மாறி                   | இயல்புநிலை உருவாக்க மதிப்பு | விளக்கம்                       |
| ---------------------- | --------------------------- | ------------------------------ |
| `PORT`                 | `20128`                     | சேவையகப் போர்ட்                |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`    | முன்பக்கத்திற்கான அடிப்படை URL |
| `JWT_SECRET`           | (மேலே உருவாக்கவும்)         | JWT கையொப்ப இரகசியம்           |
| `INITIAL_PASSWORD`     | `CHANGEME`                  | முதல் உள்நுழைவுக் கடவுச்சொல்   |
| `APP_LOG_LEVEL`        | `info`                      | பதிவேட்டின் விரிவுநிலை         |

### கட்டுப்பாட்டுப் பலகை அமைப்புகள்

சூழல் மாறிகள் வழியாகவும் உள்ளமைக்கக்கூடிய அம்சங்களுக்கான UI நிலைமாற்றிகளை கட்டுப்பாட்டுப் பலகை வழங்குகிறது:

| அமைவு இருப்பிடம்        | நிலைமாற்றி               | விளக்கம்                                           |
| ----------------------- | ------------------------ | -------------------------------------------------- |
| அமைப்புகள் → மேம்பட்டவை | பிழைத்திருத்தப் பயன்முறை | பிழைத்திருத்தக் கோரிக்கைப் பதிவுகளை இயக்குதல் (UI) |
| அமைப்புகள் → பொது       | பக்கப்பட்டைத் தெரிவுநிலை | பக்கப்பட்டைப் பிரிவுகளைக் காட்டுதல்/மறைத்தல்       |

இந்த அமைப்புகள் தரவுத்தளத்தில் சேமிக்கப்பட்டு, மறுதொடக்கங்களுக்குப் பிறகும் நீடிக்கும்; அமைக்கப்பட்டிருந்தால் சூழல் மாறிகளின் இயல்புநிலைகளை மீறும்.

### உள்ளூரில் இயக்குதல்

```bash
# உருவாக்கப் பயன்முறை (உடனடி மறுஏற்றம்)
npm run dev

# தயாரிப்புக் கட்டமைப்பு
npm run build    # next build → .build/next/ பின்னர் assembleStandalone → dist/
npm run start

# பங்களிப்பாளர் மாற்றங்களுக்கான வேகமான பின்தளம்/API-மட்டும் தொகுத்தல்
npm run build:contributor

# வெளியீட்டுக் கட்டமைப்பு (தூய மறுகட்டமைப்பு + HEAD காவல் குறி — பயன்படுத்தலுக்குத் தேவை)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA-ஐ எழுதுகிறது

# பொதுவான போர்ட் உள்ளமைவு
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

பங்களிப்பாளர் கட்டமைப்பு தொகுத்தல்-மட்டும் சரிபார்ப்பைச் செய்கிறது: இது தனித்தியங்கும்
விநியோகத்தை ஒன்றுசேர்க்காது அல்லது விருப்பமான நேட்டிவ் தொகுப்பாக்கச் சொத்துகளை உருவாக்காது. அனுப்பக்கூடிய தொகுப்பைச்
சரிபார்க்க வேண்டியபோது வழக்கமான தயாரிப்புக் கட்டமைப்பைப் பயன்படுத்தவும்.

### கட்டமைப்பு வெளியீட்டு அமைப்பு

| கோப்பகம்  | உள்ளடக்கங்கள்                                                                         | கண்காணிக்கப்படுவது |
| --------- | ------------------------------------------------------------------------------------- | ------------------ |
| `src/`    | பயன்பாட்டு மூலக்குறியீடு (TypeScript / TSX)                                           | ஆம்                |
| `.build/` | இடைநிலை வெளியீடுகள் — `next build` வெளியீடு (gitignored, `distDir = .build/next`)     | இல்லை              |
| `dist/`   | அனுப்பக்கூடிய தொகுப்பு — `assembleStandalone` மூலம் ஒன்றுசேர்க்கப்பட்டது (gitignored) | இல்லை              |

கட்டமைப்புச் செயல்முறை ஒரே சுற்றில் நடைபெறுகிறது:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js வெளியீடு)
  └─ assembleStandalone()                 (தனித்தியங்கும் வெளியீடு + static + public + நேட்டிவ் சொத்துகளை நகலெடுக்கிறது)
       └─ வெளியீடு: dist/                 (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` கூடுதலாக முதலில் இரண்டு கோப்பகங்களையும் சுத்தம் செய்து,
பயன்படுத்தல் ஒருமைப்பாட்டுக் காவல் குறியாக `dist/BUILD_SHA` (= `git rev-parse --short HEAD`) என்பதை எழுதுகிறது.

`npm run build:contributor` பின்தளம்-மட்டும் கட்டமைப்புச் சுயவிவரத்தைப் பயன்படுத்துகிறது. கட்டமைக்கும்போது இது
கட்டுப்பாட்டுப் பலகை UI கோப்புகளைத் தற்காலிகமாக போலியாக்கி, API வழித்தடக் கையாளிகளைத் தக்கவைத்து, கட்டமைப்புக்குப்
பிறகு அசல் கோப்புகளை மீட்டமைக்கிறது. கட்டுப்பாட்டுப் பலகை UI-ஐப் பாதிக்கும் மாற்றங்களுக்கோ அல்லது முழுமையான
வெளியீட்டுச் சரிபார்ப்புக்கோ `npm run build` என்பதைப் பயன்படுத்தவும்; பங்களிப்பாளர் சுயவிவரம் வெளியீட்டுக் கட்டமைப்புக்கு மாற்றாகாது.

> **VPS பயன்படுத்தல் குறிப்பு:** தொலைநிலைப் படக் கோப்பகம் `/usr/lib/node_modules/omniroute/app/`
> மாறாமல் உள்ளது. பயன்படுத்தல் திறன்கள் `dist/`-இன் உள்ளடக்கங்களை அதில் rsync செய்கின்றன.
> களஞ்சியத்திற்குள் உள்ள கட்டமைப்பு வெளியீட்டுப் பாதை மட்டுமே மாற்றப்பட்டுள்ளது (`app/` → `dist/`).

இயல்புநிலை URL-கள்:

- **கட்டுப்பாட்டுப் பலகை**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git பணிப்பாய்வு

> ⚠️ **`main`-க்கு ஒருபோதும் நேரடியாக commit செய்யாதீர்கள்.** எப்போதும் feature branch-களைப் பயன்படுத்துங்கள்.
>
> **PR அடிப்படை:** செயலில் உள்ள `release/vX.Y.Z` branch-ஐ இலக்காகக் கொள்ளுங்கள் (`main` அல்ல). ஒவ்வொரு release-க்கும் தனி branch + வெளியிடும்போது tag என்ற மாதிரியைப் பற்றி அறிய
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md)-ஐப் பார்க்கவும்.

```bash
# செயலில் உள்ள release முனையிலிருந்து branch உருவாக்கவும் (எடுத்துக்காட்டு: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... மாற்றங்களைச் செய்யவும் ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 என அமைத்து Pull Request ஒன்றைத் திறக்கவும்
```

### Branch பெயரிடல்

| முன்னொட்டு  | நோக்கம்                           |
| ----------- | --------------------------------- |
| `feat/`     | புதிய அம்சங்கள்                   |
| `fix/`      | பிழைத் திருத்தங்கள்               |
| `refactor/` | குறியீட்டு மறுகட்டமைப்பு          |
| `docs/`     | ஆவணப்படுத்தல் மாற்றங்கள்          |
| `test/`     | சோதனைச் சேர்த்தல்கள்/திருத்தங்கள் |
| `chore/`    | கருவிகள், CI, சார்புகள்           |

### Commit செய்திகள்

[Conventional Commits](https://www.conventionalcommits.org/)-ஐப் பின்பற்றுங்கள்:

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scope-கள் (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## சோதனைகளை இயக்குதல்

```bash
# அனைத்து சோதனைகளும் (unit + vitest + ecosystem + e2e)
npm run test:all

# ஒற்றைச் சோதனைக் கோப்பு (Node.js நேட்டிவ் சோதனை இயக்கி — பெரும்பாலான சோதனைகள் இதைப் பயன்படுத்துகின்றன)
node --import tsx/esm --test tests/unit/your-file.test.ts

# உங்கள் மாற்றத்தால் பாதிக்கப்பட்ட unit சோதனைகள் மட்டும் (CI gate, #8084 பயன்படுத்தும் அதே TIA selector)
npm run test:scoped            # கடைசி commit-இல் உள்ள மாற்றங்கள் (அல்லது working tree)
npm run test:scoped:staged     # staged மாற்றங்கள் மட்டும் — pre-commit இயக்கத்துடன் நன்றாகப் பொருந்தும்
npm run test:scoped:full       # முதலில் import-graph map-ஐ மீண்டும் உருவாக்கும் (கோப்புகளைச் சேர்த்த/நகர்த்திய பிறகு)
# Exit 1 + "run the full suite" என்பது ஒரு hub கோப்பு (tsconfig, package.json, …) அல்லது
# map செய்யப்படாத source மாறியுள்ளது என்பதைக் குறிக்கும் — selector பாதுகாப்பாகத் தோல்வியடையும்; எதையும் அமைதியாகத் தவிர்க்காது.

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E சோதனைகள் (Playwright தேவை)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem இணக்கத்தன்மைச் சோதனைகள்
npm run test:ecosystem

# Coverage gate: statements/lines/functions/branches ஆகியவற்றுக்கு 60%
npm run test:coverage
npm run coverage:report

# Lint + format சரிபார்ப்பு
npm run lint
npm run check

# Gate செய்யப்பட்ட உண்மையான-upstream combo smoke சோதனை (VPS அணுகல் + உண்மையான provider credits தேவை)
# இது உண்மையான providers-ஐ அணுகும் — சிறிதளவு செலவாகும். CI-இல் ஒருபோதும் இயங்காது. Gate இல்லையெனில் முறையாகத் தவிர்க்கப்படும்.
# தேவை: ssh root@192.168.0.15 அணுகல் (VPS-இலிருந்து read-only DB snapshot-ஐப் பெறும்).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS நேரடி smoke சோதனை — எளிய Node ESM scripts, நேரடி .15 server-ஐ அணுகும்.
# தேவை: ssh root@192.168.0.15 அணுகல் (combos, SSH sqlite வழியாக உருவாக்கப்பட்டு/அகற்றப்படும்).
# உண்மையான providers-ஐ அணுகும் (சிறிய செலவு). __live_test__* combos-ஐ மட்டும் உருவாக்கும்/நீக்கும். CI-இல் ஒருபோதும் இயங்காது.
# .15-இல் REQUIRE_API_KEY=false என்பதால் API key தேவையில்லை; ஆனால் அமைக்கப்பட்டிருந்தால் COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY மதிக்கப்படும்.
npm run test:combo:live:vps              # 7 HTTP சூழல்கள் (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # உண்மையான cross-provider failover சூழலைச் சேர்க்கும் (மொத்தம் 8)
```

Coverage குறிப்புகள்:

- `npm run test:coverage`, முதன்மையான unit சோதனைத் தொகுப்புக்கான source coverage-ஐ அளவிடுகிறது, `tests/**`-ஐ விலக்குகிறது, மேலும் `open-sse/**`-ஐ உள்ளடக்குகிறது
- Pull request-கள் statements/lines/functions/branches ஆகியவற்றுக்கான coverage gate-ஐ **60%+** அளவில் பராமரிக்க வேண்டும்
- ஒரு PR, `src/`, `open-sse/`, `electron/`, அல்லது `bin/` ஆகியவற்றில் production code-ஐ மாற்றினால், அதே PR-இல் automated tests-ஐச் சேர்க்கவோ புதுப்பிக்கவோ வேண்டும்
- `npm run coverage:report`, சமீபத்திய coverage இயக்கத்திலிருந்து விரிவான கோப்பு-வாரியான அறிக்கையை அச்சிடுகிறது
- `npm run test:coverage:legacy`, வரலாற்று ஒப்பீட்டிற்காகப் பழைய metric-ஐப் பாதுகாக்கிறது
- கட்டப்படியான coverage மேம்பாட்டு roadmap-க்கு `docs/ops/COVERAGE_PLAN.md`-ஐப் பார்க்கவும்

### Pull Request தேவைகள்

ஒரு PR-ஐத் திறப்பதற்கு முன், நீங்கள் மாற்றியவற்றிற்கான கவனம் செலுத்தப்பட்ட சுழற்சியை இயக்க
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md)-ஐப் பயன்படுத்தவும். முழுமையான unit தொகுப்பு (4 CI shards), Vitest, **60%+** coverage gate மற்றும்
production build ஆகியவை CI-இன் பொறுப்பு — அவற்றை உள்ளூரில் இயக்குவது, PR
சரிபார்ப்புகள் ஏற்கெனவே வழங்காத எந்தக் கூடுதல் தகவலையும் வழங்காது; மேலும் சிறிய கணினிகளில் அது host-ஐ முழுமையாகச் சுமைப்படுத்தக்கூடும் (#8084):

- உங்கள் மாற்றத்தை உள்ளடக்கும் சோதனைக் கோப்புகளை இயக்கவும்: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint`-ஐ இயக்கவும்
- production code மாறும் ஒவ்வொரு முறையும், அதே PR-இல் automated tests-ஐச் சேர்க்கவும் அல்லது புதுப்பிக்கவும்
- production code மாறியிருந்தால், மாற்றப்பட்ட அல்லது சேர்க்கப்பட்ட சோதனைக் கோப்புகளை PR விளக்கத்தில் சேர்க்கவும்
- project secrets, CI-இல் configure செய்யப்பட்டிருந்தால், PR-இல் SonarQube முடிவைச் சரிபார்க்கவும்

தற்போதைய சோதனை நிலை: பின்வருவனவற்றை உள்ளடக்கும் **122 unit சோதனைக் கோப்புகள்**:

- Provider translators மற்றும் format conversion
- Rate limiting, circuit breaker மற்றும் resilience
- Semantic cache, idempotency, progress tracking
- Database operations மற்றும் schema (21 DB modules)
- OAuth flows மற்றும் authentication
- API endpoint validation (Zod v4)
- MCP server tools மற்றும் scope enforcement
- Memory மற்றும் Skills systems

---

## குறியீட்டு பாணி

- **ESLint** — commit செய்வதற்கு முன் `npm run lint`-ஐ இயக்கவும்
- **Prettier** — commit செய்யும்போது `lint-staged` வழியாகத் தானாக வடிவமைக்கப்படும் (2 இடைவெளிகள், அரைப்புள்ளிகள், இரட்டை மேற்கோள்கள், 100 எழுத்து அகலம், es5 இறுதிக் காற்புள்ளிகள்)
- **TypeScript** — அனைத்து `src/` குறியீடும் `.ts`/`.tsx`-ஐப் பயன்படுத்துகிறது; `open-sse/` `.ts`/`.js`-ஐப் பயன்படுத்துகிறது; TSDoc (`@param`, `@returns`, `@throws`) மூலம் ஆவணப்படுத்தவும்
- **`eval()` கூடாது** — ESLint `no-eval`, `no-implied-eval`, `no-new-func` ஆகியவற்றைச் செயல்படுத்துகிறது
- **Zod சரிபார்ப்பு** — அனைத்து API உள்ளீட்டுச் சரிபார்ப்புகளுக்கும் Zod v4 schemas-ஐப் பயன்படுத்தவும்
- **பெயரிடல்**: கோப்புகள் = camelCase/kebab-case, components = PascalCase, constants = UPPER_SNAKE

### பிழைக் கையாளுதல் / காலியான catch தொகுதிகள்

விளக்கமின்றி ஒரு `catch`-ஐ ஒருபோதும் விடாதீர்கள். அதை இரண்டு வகைகளில் ஒன்றாக
வகைப்படுத்தவும் (இது "SSE streams-இல் பிழைகளை ஒருபோதும் அமைதியாக விழுங்காதீர்கள்" என்ற கடுமையான
விதியை நடைமுறைப்படுத்துகிறது):

- **வேண்டுமென்றே புறக்கணிக்கப்படுவது (நமது சொந்த best-effort தூய்மைப்படுத்தல்/telemetry)** — இங்குள்ள தோல்வி
  எதிர்பார்க்கப்படுவது மற்றும் தீங்கற்றது; ஒரு வரி காரண விளக்கக் கருத்தைச் சேர்க்கவும், logging வேண்டாம்
  (ஒவ்வொரு request-இலும் logging செய்வதால் ஏற்படும் இரைச்சலையே இந்த நடைமுறை தவிர்க்கிறது).

  ```ts
  } catch {} // client துண்டிக்கப்பட்ட பிறகு ஏற்கெனவே மூடப்பட்ட controller-ஐ மூட முயல்வது எதிர்பார்க்கப்பட்டதே
  ```

- **பதிவு செய்யப்பட வேண்டியது (வெளிப்புற/அழைப்பவர் வழங்கிய குறியீடு, அல்லது பிழையை விழுங்குவது control flow-ஐ மாற்றும்போது)** —
  `catch`-ஐ வைத்திருக்கவும் (அது stream-ஐ ஒருபோதும் சீர்குலைக்க அனுமதிக்காதீர்கள்), ஆனால் தோல்வியைக் கண்டறிய
  சூழல் சார்ந்த `console.debug`/`warn` ஒன்றை வெளியிடவும்.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback பிழை:", e);
  }
  ```

பயன்படுத்தப்பட்டுள்ள எடுத்துக்காட்டுகளுக்கு `open-sse/utils/stream.ts` மற்றும் `open-sse/utils/streamHandler.ts`-ஐப் பார்க்கவும்.

---

## திட்ட அமைப்பு

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # டாஷ்போர்டு பக்கங்கள் (23 பிரிவுகள்)
│   ├── api/                # API வழித்தடங்கள் (51 கோப்பகங்கள்)
│   └── login/              # அங்கீகாரப் பக்கங்கள் (.tsx)
├── domain/                 # கொள்கை இயந்திரம் (policyEngine, comboResolver, costRules போன்றவை)
├── lib/                    # முதன்மை வணிகத் தர்க்கம் (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 நெறிமுறைச் சேவையகம்
│   ├── acp/                # Agent Communication Protocol பதிவகம்
│   ├── compliance/         # இணக்கக் கொள்கை இயந்திரம்
│   ├── db/                 # SQLite களத் தொகுதிகள் + 130 இடமாற்றங்கள்
│   ├── memory/             # நிலையான உரையாடல் நினைவகம்
│   ├── oauth/              # OAuth வழங்குநர்கள், சேவைகள் மற்றும் பயன்பாட்டுக் கருவிகள்
│   ├── skills/             # விரிவாக்கக்கூடிய திறன் கட்டமைப்பு
│   ├── usage/              # பயன்பாட்டுக் கண்காணிப்பு மற்றும் செலவுக் கணக்கீடு
│   └── localDb.ts          # மறு-ஏற்றுமதி அடுக்கு மட்டுமே — இங்கே ஒருபோதும் தர்க்கத்தைச் சேர்க்க வேண்டாம்
├── middleware/              # கோரிக்கை இடைநிரல் (promptInjectionGuard)
├── mitm/                   # MITM பதிலாள் (சான்றிதழ், DNS, இலக்கு வழிப்படுத்தல்)
├── shared/
│   ├── components/         # React கூறுகள் (.tsx)
│   ├── constants/          # வழங்குநர் வரையறைகள் (329), MCP நோக்கங்கள், 21 வழிப்படுத்தல் உத்திகள்
│   ├── utils/              # சுற்று முறிப்பான், தூய்மையாக்கி, அங்கீகார உதவிகள்
│   └── validation/         # Zod v4 திட்டவடிவங்கள்
└── sse/                    # SSE பதிலாள் செயலாக்கத் தொடர்

open-sse/                   # @omniroute/open-sse பணியிடம்
├── executors/              # 150 செயலாக்கி தொகுதிகள் (செயலாக்கி வகுப்புகள் + ஒவ்வொரு வழங்குநருக்குமான உதவிகள்)
├── handlers/               # 11 கோரிக்கைக் கையாளிகள் (அரட்டை, பதில்கள், உட்பொதிவுகள், படங்கள் போன்றவை)
├── mcp-server/             # MCP சேவையகம் (110 தனித்துவமான கருவிகள், 3 பரிமாற்ற முறைகள், 33 நோக்கங்கள்)
├── services/               # 178 உயர்நிலைச் சேவைகள் (combo, autoCombo, rateLimitManager போன்றவை)
├── translator/             # வடிவமைப்பு மொழிபெயர்ப்பிகள் (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API உருமாற்றி
└── utils/                  # 22 பயன்பாட்டுக் கருவித் தொகுதிகள் (தரவு ஓட்டம், TLS, பதிலாள், பதிவாக்கம்)

electron/                   # Electron மேசைக்கணினிச் செயலி (பல தளங்களுக்கு ஏற்றது)

tests/
├── unit/                   # Node.js சோதனை இயக்கி (1,574 சோதனைக் கோப்புகள்)
├── integration/            # ஒருங்கிணைப்புச் சோதனைகள்
├── e2e/                    # Playwright சோதனைகள்
├── security/               # பாதுகாப்புச் சோதனைகள்
├── translator/             # மொழிபெயர்ப்பிக்கான குறிப்பிட்ட சோதனைகள்
└── load/                   # சுமைச் சோதனைகள்

docs/
├── adr/                     # கட்டமைப்புத் தீர்மானப் பதிவுகள்
├── architecture/            # அமைப்புக் கட்டமைப்பு மற்றும் மீட்சித்திறன்
├── comparison/              # OmniRoute மற்றும் மாற்றுகளின் ஒப்பீடு
├── compression/             # சுருக்க வழிகாட்டிகள் மற்றும் விதிகள்
├── dev/                     # உருவாக்க வழிகாட்டிகள்
├── diagrams/                # கட்டமைப்பு வரைபடங்கள்
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # பயனர் வழிகாட்டி, Docker, அமைப்பு, சிக்கல் தீர்த்தல்
├── i18n/                    # பன்னாட்டுமயமாக்கப்பட்ட README மொழிபெயர்ப்புகள்
├── marketing/               # சந்தைப்படுத்தல் உள்ளடக்கங்கள்
├── ops/                     # நிறுவல், பதிலாள், சோதனை உள்ளடக்கம், வெளியீடுகள்
├── providers/               # வழங்குநர் சார்ந்த ஆவணங்கள்
├── reference/               # API குறிப்பு, சூழல் மாறிகள், CLI கருவிகள், இலவச அடுக்குகள்
├── releases/                # வெளியீட்டுக் குறிப்புகள்
├── routing/                 # தானியங்கு-சேர்க்கை இயந்திரம், காரணவியல் மறுஇயக்கம்
├── screenshots/             # டாஷ்போர்டு திரைப்பிடிப்புகள்
├── security/                # பாதுகாப்புத் தடுப்புகள், இணக்கம், மறைநிலை, டோக்கன்கள்
└── specs/                   # வடிவமைப்பு விவரக்குறிப்புகள்
```

---

## புதிய வழங்குநரைச் சேர்த்தல்

### படி 1: வழங்குநர் மாறிலிகளைப் பதிவுசெய்தல்

`src/shared/constants/providers.ts`-இல் சேர்க்கவும் — தொகுதி ஏற்றப்படும்போது Zod மூலம் சரிபார்க்கப்படும்.

### படி 2: செயலாக்கியைச் சேர்த்தல் (தனிப்பயன் தர்க்கம் தேவைப்பட்டால்)

அடிப்படை செயலாக்கியை நீட்டித்து, `open-sse/executors/your-provider.ts`-இல் செயலாக்கியை உருவாக்கவும்.

### படி 3: மொழிமாற்றியைச் சேர்த்தல் (OpenAI அல்லாத வடிவமைப்பாக இருந்தால்)

`open-sse/translator/`-இல் கோரிக்கை/பதில் மொழிமாற்றிகளை உருவாக்கவும்.

### படி 4: OAuth கட்டமைப்பைச் சேர்த்தல் (OAuth அடிப்படையிலானதாக இருந்தால்)

OAuth நற்சான்றுகளை `src/lib/oauth/constants/oauth.ts`-இலும் சேவையை `src/lib/oauth/services/`-இலும் சேர்க்கவும்.

மேல்நிலை வழங்குநர், பொது OAuth client_id/secret அல்லது Firebase Web API விசையை அதன் பொது CLI / உலாவித் தொகுப்பிற்குள் விநியோகித்தால், அதைச் சர மதிப்புருவாக உட்பொதிக்க **வேண்டாம்**. `open-sse/utils/publicCreds.ts`-இலிருந்து `resolvePublicCred()`-ஐப் பயன்படுத்தி, `EMBEDDED_DEFAULTS`-இல் மறைக்கப்பட்ட பைட் பதிவைச் சேர்க்கவும். முழுமையான கட்டாயப் பணிப்பாய்வு [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)-இல் ஆவணப்படுத்தப்பட்டுள்ளது.

கையாளிகள்/செயலாக்கிகளுக்குள், கிளையண்டைச் சென்றடையும் பிழைச் செய்திகள் `open-sse/utils/error.ts`-இலுள்ள `buildErrorBody()` / `sanitizeErrorMessage()` வழியாகவே செல்ல வேண்டும் — மூல `err.stack` அல்லது `err.message`-ஐ Response உடலில் ஒருபோதும் இட வேண்டாம். [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)-ஐப் பார்க்கவும்.

### படி 5: மாதிரிகளைப் பதிவுசெய்தல்

`open-sse/config/providerRegistry.ts`-இல் மாதிரி வரையறைகளைச் சேர்க்கவும்.

### படி 6: சோதனைகளைச் சேர்த்தல்

குறைந்தபட்சம் பின்வருவனவற்றை உள்ளடக்கும் அலகுச் சோதனைகளை `tests/unit/`-இல் எழுதவும்:

- வழங்குநர் பதிவு
- கோரிக்கை/பதில் மொழிமாற்றம்
- பிழை கையாளுதல்

---

## Pull Request சரிபார்ப்புப் பட்டியல்

- [ ] சோதனைகள் வெற்றிபெறுகின்றன (`npm test`)
- [ ] Linting வெற்றிபெறுகிறது (`npm run lint`)
- [ ] Build வெற்றிபெறுகிறது (`npm run build`)
- [ ] புதிய public functions மற்றும் interfaces-க்கு TypeScript types சேர்க்கப்பட்டுள்ளன
- [ ] Hardcoded secrets அல்லது fallback values இல்லை
- [ ] Public upstream credentials, literals-ஆக ஒருபோதும் இல்லாமல், `resolvePublicCred()` வழியாகப் பதிக்கப்பட்டுள்ளன ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)-ஐப் பார்க்கவும்)
- [ ] Error responses, `buildErrorBody()` / `sanitizeErrorMessage()` வழியாக அனுப்பப்படுகின்றன — response bodies-இல் raw stack traces இல்லை ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)-ஐப் பார்க்கவும்)
- [ ] Shell commands (`exec` / `spawn`), runtime values-ஐ string interpolation வழியாக அல்லாமல் `env` வழியாக அனுப்புகின்றன
- [ ] அனைத்து inputs-உம் Zod schemas மூலம் சரிபார்க்கப்பட்டுள்ளன
- [ ] பயனர்கள் காணக்கூடிய மாற்றங்களுக்கு `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md`-இன் கீழ் Changelog **fragment** சேர்க்கப்பட்டுள்ளது ([`changelog.d/README.md`](./changelog.d/README.md)-ஐப் பார்க்கவும்) — `CHANGELOG.md`-ஐ நேரடியாகத் திருத்த **வேண்டாம்**; fragments வெளியீட்டு நேரத்தில் ஒருங்கிணைக்கப்படுவதால், PR-களுக்கு இடையே ஒருபோதும் முரண்படாது
- [ ] ஆவணங்கள் புதுப்பிக்கப்பட்டுள்ளன (பொருந்தினால்)
- [ ] புதிய CodeQL / Secret-Scanning alerts எதுவும் உருவாக்கப்படவில்லை; அல்லது ஒவ்வொன்றும் தொடர்புடைய `docs/security/` ஆவணத்தைக் குறிப்பிடும் தொழில்நுட்ப நியாயத்துடன் நிராகரிக்கப்பட்டுள்ளது
- [ ] Child processes-ஐத் தொடங்கும் routes (`/api/mcp/`, `/api/cli-tools/runtime/`), `src/server/authz/routeGuard.ts`-இல் `isLocalOnlyPath()` என வகைப்படுத்தப்பட்டுள்ளன — [Hard Rule #15](docs/security/ROUTE_GUARD_TIERS.md)-ஐப் பார்க்கவும்
- [ ] Commit messages-இல் AI/bot `Co-authored-by` trailers இல்லை (Hard Rule #16) — மீண்டும் பயன்படுத்தப்பட்ட பணிக்குரிய மனித collaborators, நிலையான `Co-authored-by: Name <email>` trailers மூலம் குறிப்பிடப்பட்டுள்ளனர்

---

## வெளியீடு

வெளியீடுகள் `/generate-release` பணிப்பாய்வு மூலம் நிர்வகிக்கப்படுகின்றன. புதிய GitHub Release உருவாக்கப்படும்போது, GitHub Actions மூலம் package **தானாகவே npm-இல் வெளியிடப்படுகிறது**.

VPS deployment-களுக்கு, `npm run build` அல்லாமல் `npm run build:release`-ஐப் பயன்படுத்தவும் — இது சுத்தமான
மறுகட்டமைப்பைச் செய்து, bundle-ஐ `dist/`-இல் தொகுத்து, `dist/BUILD_SHA` sentinel-ஐ எழுதுகிறது.
பின்னர் `dist/`-ஐ தொலைநிலை `app/` அடைவுடன் rsync செய்யும் `/deploy-vps-*-cc` திறன்களைப் பயன்படுத்தவும்.

---

## உதவி பெறுதல்

- **கட்டமைப்பு**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)-ஐப் பார்க்கவும்
- **API குறிப்பு**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)-ஐப் பார்க்கவும்
- **பாதுகாப்பு ஆவணங்கள்**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **செயல்பாட்டு ஆவணங்கள்**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **சிக்கல்கள்**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
