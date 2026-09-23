# Contributing to OmniRoute (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

សូមអរគុណចំពោះចំណាប់អារម្មណ៍របស់អ្នកក្នុងការចូលរួមចំណែក! មគ្គុទ្ទេសក៍នេះគ្របដណ្តប់លើអ្វីៗទាំងអស់ដែលអ្នកត្រូវការ ដើម្បីចាប់ផ្តើម។

សម្រាប់លំហូរការងារផ្លូវការតាមការផ្លាស់ប្តូរនីមួយៗ សូមចាប់ផ្តើមជាមួយ
[គន្លងស្តង់ដារសម្រាប់ការចូលរួមចំណែក](docs/ops/CONTRIBUTION_GOLDEN_PATH.md)។ វាផ្គូផ្គងការផ្លាស់ប្តូរលើ provider, routing,
UI/UX, i18n, CLI, មូលដ្ឋានទិន្នន័យ និង build/deploy ទៅនឹងកិច្ចសន្យា ការធ្វើតេស្តជាក់លាក់ វិសាលភាព CI
និងជំហានផ្ទៀងផ្ទាត់របស់វា។

---

## ការរៀបចំបរិស្ថានអភិវឌ្ឍន៍

### តម្រូវការជាមុន

- **Node.js** `>=22.22.3 <23` ឬ `>=24.0.0 <27` (បានណែនាំ៖ 24 LTS)
- **npm** 10+

> **អ្នកប្រើ npm v11+ (Node 24+):** បន្ទាប់ពី `npm install` សូមផ្ទៀងផ្ទាត់ថាម៉ូឌុល native ត្រូវបានដំឡើង៖
> `node -e "require('better-sqlite3')"`។ ប្រសិនបើវាបរាជ័យដោយមាន `MODULE_NOT_FOUND`
> សូមដំណើរការ `npm approve-scripts better-sqlite3 && npm install`។ សូមមើល
> [ការដោះស្រាយបញ្ហា](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)។

- **Git**

### Clone និងដំឡើង

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### អថេរបរិស្ថាន

```bash
# បង្កើត .env របស់អ្នកពីគំរូ
cp .env.example .env

# បង្កើតតម្លៃសម្ងាត់ដែលត្រូវការ
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

អថេរសំខាន់ៗសម្រាប់ការអភិវឌ្ឍ៖

| អថេរ                   | តម្លៃលំនាំដើមសម្រាប់ការអភិវឌ្ឍ | ការពិពណ៌នា                         |
| ---------------------- | ------------------------------ | ---------------------------------- |
| `PORT`                 | `20128`                        | ច្រកម៉ាស៊ីនមេ                      |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`       | URL មូលដ្ឋានសម្រាប់ frontend       |
| `JWT_SECRET`           | (បង្កើតខាងលើ)                  | តម្លៃសម្ងាត់សម្រាប់ចុះហត្ថលេខា JWT |
| `INITIAL_PASSWORD`     | `CHANGEME`                     | ពាក្យសម្ងាត់សម្រាប់ការចូលលើកដំបូង  |
| `APP_LOG_LEVEL`        | `info`                         | កម្រិតលម្អិតនៃកំណត់ហេតុ            |

### ការកំណត់ Dashboard

Dashboard ផ្តល់កុងតាក់ UI សម្រាប់មុខងារដែលអាចកំណត់រចនាសម្ព័ន្ធតាមរយៈអថេរបរិស្ថានផងដែរ៖

| ទីតាំងការកំណត់      | កុងតាក់              | ការពិពណ៌នា                              |
| ------------------- | -------------------- | --------------------------------------- |
| Settings → Advanced | របៀបបំបាត់កំហុស      | បើកកំណត់ហេតុសំណើសម្រាប់បំបាត់កំហុស (UI) |
| Settings → General  | ភាពមើលឃើញនៃរបារចំហៀង | បង្ហាញ/លាក់ផ្នែកនៃរបារចំហៀង             |

ការកំណត់ទាំងនេះត្រូវបានរក្សាទុកក្នុងមូលដ្ឋានទិន្នន័យ ហើយនៅតែមានបន្ទាប់ពីការចាប់ផ្តើមឡើងវិញ ដោយជំនួសតម្លៃលំនាំដើមរបស់អថេរបរិស្ថាន នៅពេលត្រូវបានកំណត់។

### ដំណើរការក្នុងម៉ាស៊ីនផ្ទាល់

```bash
# របៀបអភិវឌ្ឍន៍ (ផ្ទុកឡើងវិញភ្លាមៗ)
npm run dev

# ការបង្កើតសម្រាប់ production
npm run build    # next build → .build/next/ បន្ទាប់មក assembleStandalone → dist/
npm run start

# ចងក្រងតែ backend/API យ៉ាងរហ័ស សម្រាប់ការផ្លាស់ប្តូររបស់អ្នកចូលរួមចំណែក
npm run build:contributor

# ការបង្កើតសម្រាប់ release (បង្កើតឡើងវិញពីស្អាត + សញ្ញាផ្ទៀងផ្ទាត់ HEAD — តម្រូវសម្រាប់ deploy)
npm run build:release   # rm -rf .build dist && build + សរសេរ dist/BUILD_SHA

# ការកំណត់រចនាសម្ព័ន្ធច្រកដែលប្រើជាទូទៅ
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

ការបង្កើតសម្រាប់អ្នកចូលរួមចំណែកអនុវត្តការផ្ទៀងផ្ទាត់តែការចងក្រងប៉ុណ្ណោះ៖ វាមិនរៀបចំ
កញ្ចប់ចែកចាយ standalone ឬបង្កើតធនធានសម្រាប់ការវេចខ្ចប់ native ដែលជាជម្រើសទេ។ សូមប្រើការបង្កើតសម្រាប់ production ធម្មតា នៅពេល
អ្នកត្រូវការផ្ទៀងផ្ទាត់កញ្ចប់ដែលអាចចែកចាយបាន។

### ប្លង់លទ្ធផលនៃការបង្កើត

| ថតឯកសារ   | មាតិកា                                                                                | ត្រូវបានតាមដាន |
| --------- | ------------------------------------------------------------------------------------- | -------------- |
| `src/`    | កូដប្រភពកម្មវិធី (TypeScript / TSX)                                                   | បាទ/ចាស        |
| `.build/` | ឯកសារអន្តរកាល — លទ្ធផល `next build` (ត្រូវបានមិនអើពើដោយ git, `distDir = .build/next`) | ទេ             |
| `dist/`   | កញ្ចប់ដែលអាចចែកចាយបាន — រៀបចំដោយ `assembleStandalone` (ត្រូវបានមិនអើពើដោយ git)        | ទេ             |

ដំណើរការបង្កើតជាដំណើរការតែមួយជុំ៖

```
npm run build
  └─ next build → .build/next/standalone  (លទ្ធផលរបស់ Next.js)
  └─ assembleStandalone()                 (ចម្លង standalone + static + public + ធនធាន native)
       └─ លទ្ធផល៖ dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` ក៏សម្អាតថតទាំងពីរជាមុន ហើយសរសេរ
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) ជាសញ្ញាផ្ទៀងផ្ទាត់សុចរិតភាពសម្រាប់ deploy។

`npm run build:contributor` ប្រើប្រូហ្វាល់បង្កើតសម្រាប់តែ backend។ វាជំនួសឯកសារ
UI របស់ dashboard ជាបណ្តោះអាសន្ន ខណៈពេលកំពុងបង្កើត រក្សាទុក API route handlers និងស្តារឯកសារដើម
បន្ទាប់ពីការបង្កើត។ សូមប្រើ `npm run build` សម្រាប់ការផ្លាស់ប្តូរដែលប៉ះពាល់ដល់ UI របស់ dashboard ឬសម្រាប់
ការផ្ទៀងផ្ទាត់ release ពេញលេញ។ ប្រូហ្វាល់សម្រាប់អ្នកចូលរួមចំណែកមិនមែនជាការជំនួសការបង្កើតសម្រាប់ release ទេ។

> **កំណត់សម្គាល់អំពីការដាក់ពង្រាយលើ VPS:** ថត image នៅម៉ាស៊ីនពីចម្ងាយ `/usr/lib/node_modules/omniroute/app/`
> មិនមានការផ្លាស់ប្តូរទេ។ ជំនាញ deploy ប្រើ rsync ដើម្បីធ្វើសមកាលកម្មមាតិកានៃ `dist/` ទៅក្នុងថតនោះ។
> មានតែផ្លូវលទ្ធផលនៃការបង្កើតនៅក្នុង repository ប៉ុណ្ណោះដែលបានផ្លាស់ប្តូរ (`app/` → `dist/`)។

URL លំនាំដើម៖

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## លំហូរការងារ Git

> ⚠️ **កុំ commit ដោយផ្ទាល់ទៅ `main` ឱ្យសោះ។** ត្រូវប្រើ feature branches ជានិច្ច។
>
> **មូលដ្ឋាន PR៖** កំណត់គោលដៅទៅកាន់ branch `release/vX.Y.Z` ដែលកំពុងសកម្ម (មិនមែន `main`)។ សូមមើល
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) សម្រាប់ម៉ូដែល
> release-per-branch + tag-at-ship។

```bash
# បង្កើត branch ពីចំណុចចុងក្រោយនៃ release ដែលកំពុងសកម្ម (ឧទាហរណ៍៖ release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... ធ្វើការផ្លាស់ប្ដូរ ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# បើក Pull Request ដោយកំណត់ base = release/v3.8.49
```

### ការដាក់ឈ្មោះ Branch

| បុព្វបទ     | គោលបំណង                       |
| ----------- | ----------------------------- |
| `feat/`     | មុខងារថ្មី                    |
| `fix/`      | ការកែកំហុស                    |
| `refactor/` | ការរៀបចំរចនាសម្ព័ន្ធកូដឡើងវិញ |
| `docs/`     | ការផ្លាស់ប្ដូរឯកសារ           |
| `test/`     | ការបន្ថែម/កែតម្រូវតេស្ត       |
| `chore/`    | ឧបករណ៍, CI, dependencies      |

### សារ Commit

អនុវត្តតាម [Conventional Commits](https://www.conventionalcommits.org/)៖

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scopes (v3.8)៖ `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`។

---

## ការដំណើរការតេស្ត

```bash
# តេស្តទាំងអស់ (unit + vitest + ecosystem + e2e)
npm run test:all

# ឯកសារតេស្តតែមួយ (កម្មវិធីដំណើរការតេស្តដើមរបស់ Node.js — តេស្តភាគច្រើនប្រើវា)
node --import tsx/esm --test tests/unit/your-file.test.ts

# តែ unit tests ដែលរងផលប៉ះពាល់ដោយការផ្លាស់ប្ដូររបស់អ្នកប៉ុណ្ណោះ (ប្រើ TIA selector ដូចគ្នានឹង CI gate, #8084)
npm run test:scoped            # ការផ្លាស់ប្ដូរនៅក្នុង commit ចុងក្រោយ (ឬ working tree)
npm run test:scoped:staged     # តែការផ្លាស់ប្ដូរដែលបាន staged — ដំណើរការល្អជាមួយ pre-commit
npm run test:scoped:full       # បង្កើតផែនទី import-graph ឡើងវិញជាមុន (បន្ទាប់ពីបន្ថែម/ផ្លាស់ទីឯកសារ)
# Exit 1 + "run the full suite" មានន័យថា hub file មួយ (tsconfig, package.json, …) ឬ
# source ដែលមិនបានផ្គូផ្គងត្រូវបានផ្លាស់ប្ដូរ — selector បរាជ័យដោយសុវត្ថិភាព ហើយវាមិនដែលរំលងដោយស្ងៀមស្ងាត់ឡើយ។

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# តេស្ត E2E (តម្រូវឱ្យមាន Playwright)
npm run test:e2e

# E2E របស់ protocol clients (MCP transports, A2A)
npm run test:protocols:e2e

# តេស្តភាពត្រូវគ្នានៃ ecosystem
npm run test:ecosystem

# Coverage gate៖ 60% សម្រាប់ statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# ពិនិត្យ lint + format
npm run lint
npm run check

# ការធ្វើ combo smoke ជាមួយ upstream ពិតដែលមាន gate (តម្រូវឱ្យចូលប្រើ VPS + មាន credits ពិតរបស់ provider)
# វាហៅទៅកាន់ providers ពិត — ចំណាយបន្តិចបន្តួច។ មិនដែលដំណើរការនៅក្នុង CI ឡើយ។ រំលងដោយត្រឹមត្រូវបើគ្មាន gate។
# តម្រូវការ៖ សិទ្ធិចូលប្រើ ssh root@192.168.0.15 (ទាញប្រភព DB snapshot ដែលបានតែអានពី VPS)។
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — scripts ជា Node ESM ធម្មតា ដែលហៅទៅកាន់ live .15 server ដោយផ្ទាល់។
# តម្រូវការ៖ សិទ្ធិចូលប្រើ ssh root@192.168.0.15 (combos ត្រូវបានបង្កើត/លុបតាមរយៈ SSH sqlite)។
# វាហៅទៅកាន់ providers ពិត (ចំណាយតិចតួច)។ បង្កើត/លុបតែ combos ដែលមានឈ្មោះ __live_test__* ប៉ុណ្ណោះ។ មិនដែលដំណើរការនៅក្នុង CI ឡើយ។
# REQUIRE_API_KEY=false នៅលើ .15 ដូច្នេះមិនត្រូវការ API key ទេ ប៉ុន្តែគោរព COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY ប្រសិនបើបានកំណត់។
npm run test:combo:live:vps              # 7 HTTP scenarios (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # បន្ថែម cross-provider failover scenario ពិតមួយ (សរុប 8)
```

កំណត់ចំណាំអំពី coverage៖

- `npm run test:coverage` វាស់ source coverage សម្រាប់ unit test suite ចម្បង មិនរាប់បញ្ចូល `tests/**` និងរាប់បញ្ចូល `open-sse/**`
- Pull requests ត្រូវរក្សា coverage gate ឱ្យនៅ **60%+** សម្រាប់ statements/lines/functions/branches
- ប្រសិនបើ PR ផ្លាស់ប្ដូរ production code នៅក្នុង `src/`, `open-sse/`, `electron/`, ឬ `bin/` វាត្រូវបន្ថែម ឬធ្វើបច្ចុប្បន្នភាព automated tests នៅក្នុង PR ដូចគ្នា
- `npm run coverage:report` បង្ហាញរបាយការណ៍លម្អិតតាមឯកសារនីមួយៗពីការដំណើរការ coverage ចុងក្រោយ
- `npm run test:coverage:legacy` រក្សាទុករង្វាស់ចាស់សម្រាប់ការប្រៀបធៀបប្រវត្តិសាស្ត្រ
- សូមមើល `docs/ops/COVERAGE_PLAN.md` សម្រាប់ផែនការកែលម្អ coverage ជាដំណាក់កាល

### តម្រូវការរបស់ Pull Request

មុនពេលបើក PR សូមប្រើ
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) ដើម្បីដំណើរការ focused loop សម្រាប់
អ្វីដែលអ្នកបានផ្លាស់ប្ដូរ។ unit suite ពេញលេញ (4 CI shards), Vitest, coverage gate **60%+** និង
production build គឺជាការទទួលខុសត្រូវរបស់ CI — ការដំណើរការពួកវានៅ local មិនផ្ដល់ព័ត៌មានបន្ថែមដែលការត្រួតពិនិត្យ
PR មិនបានផ្ដល់ឱ្យអ្នករួចហើយទេ ហើយនៅលើម៉ាស៊ីនតូចៗ វាអាចប្រើធនធាន host រហូតដល់អតិបរមា (#8084)៖

- ដំណើរការឯកសារតេស្តដែលគ្របដណ្ដប់ការផ្លាស់ប្ដូររបស់អ្នក៖ `node --import tsx/esm --test tests/unit/<file>.test.ts`
- ដំណើរការ `npm run lint`
- បន្ថែម ឬធ្វើបច្ចុប្បន្នភាព automated tests នៅក្នុង PR ដូចគ្នា រាល់ពេល production code ផ្លាស់ប្ដូរ
- រាយបញ្ចូលឯកសារតេស្តដែលបានផ្លាស់ប្ដូរ ឬបន្ថែមនៅក្នុងការពិពណ៌នា PR នៅពេល production code បានផ្លាស់ប្ដូរ
- ពិនិត្យលទ្ធផល SonarQube នៅលើ PR នៅពេល project secrets ត្រូវបានកំណត់នៅក្នុង CI

ស្ថានភាពតេស្តបច្ចុប្បន្ន៖ **122 ឯកសារ unit test** ដែលគ្របដណ្ដប់លើ៖

- Provider translators និងការបម្លែង format
- Rate limiting, circuit breaker និង resilience
- Semantic cache, idempotency និង progress tracking
- ប្រតិបត្តិការ database និង schema (21 DB modules)
- OAuth flows និង authentication
- ការផ្ទៀងផ្ទាត់ API endpoint (Zod v4)
- ឧបករណ៍ MCP server និងការអនុវត្ត scope
- ប្រព័ន្ធ Memory និង Skills

---

## រចនាប័ទ្មកូដ

- **ESLint** — ដំណើរការ `npm run lint` មុនពេល commit
- **Prettier** — ត្រូវបានធ្វើទ្រង់ទ្រាយដោយស្វ័យប្រវត្តិតាមរយៈ `lint-staged` នៅពេល commit (ចន្លោះ 2, សញ្ញា semicolon, សញ្ញាសម្រង់ទ្វេ, ទទឹង 100 តួអក្សរ, សញ្ញាក្បៀសនៅខាងចុងតាម es5)
- **TypeScript** — កូដទាំងអស់ក្នុង `src/` ប្រើ `.ts`/`.tsx`; `open-sse/` ប្រើ `.ts`/`.js`; សរសេរឯកសារពន្យល់ដោយប្រើ TSDoc (`@param`, `@returns`, `@throws`)
- **ហាមប្រើ `eval()`** — ESLint អនុវត្តច្បាប់ `no-eval`, `no-implied-eval`, `no-new-func`
- **ការផ្ទៀងផ្ទាត់ដោយ Zod** — ប្រើ schema របស់ Zod v4 សម្រាប់ការផ្ទៀងផ្ទាត់ input របស់ API ទាំងអស់
- **ការដាក់ឈ្មោះ**: ឯកសារ = camelCase/kebab-case, component = PascalCase, constant = UPPER_SNAKE

### ការដោះស្រាយកំហុស / ប្លុក catch ទទេ

កុំទុក `catch` ដោយគ្មានការពន្យល់។ ចាត់ថ្នាក់វាទៅក្នុងក្រុមមួយក្នុងចំណោមពីរ (ដើម្បីអនុវត្ត
ច្បាប់តឹងរ៉ឹង «មិនត្រូវលេបកំហុសដោយស្ងៀមស្ងាត់នៅក្នុង SSE stream ឡើយ»)៖

- **ដោយចេតនា (ការសម្អាត/telemetry បែបប្រឹងប្រែងឱ្យអស់ពីលទ្ធភាពរបស់យើងផ្ទាល់)** — ការបរាជ័យនៅទីនេះត្រូវបានរំពឹងទុក និង
  មិនបង្កគ្រោះថ្នាក់ឡើយ; បន្ថែម comment មួយបន្ទាត់ដែលពន្យល់ពីហេតុផល ដោយមិនចាំបាច់ logging (ការធ្វើ logging រាល់ request គឺជា
  ទិន្នន័យរំខានដែលអនុសញ្ញានេះចង់ជៀសវាង)។

  ```ts
  } catch {} // ការបិទ controller ដែលបានបិទរួចហើយ បន្ទាប់ពី client ផ្ដាច់ការតភ្ជាប់ គឺជាអ្វីដែលបានរំពឹងទុក
  ```

- **គួរធ្វើ log (កូដខាងក្រៅ/កូដដែល caller ផ្ដល់ឱ្យ ឬការលេបកំហុសធ្វើឱ្យលំហូរនៃការគ្រប់គ្រងផ្លាស់ប្ដូរ)** — រក្សា
  catch ទុក (កុំឱ្យវាបង្អាក់ stream) ប៉ុន្តែបញ្ចេញ `console.debug`/`warn` ដែលមានបរិបទ ដើម្បីឱ្យ
  អាចស្វែងរកការបរាជ័យបាន។

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

សូមមើល `open-sse/utils/stream.ts` និង `open-sse/utils/streamHandler.ts` សម្រាប់ឧទាហរណ៍ដែលបានអនុវត្ត។

---

## រចនាសម្ព័ន្ធគម្រោង

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # ទំព័រ dashboard (23 ផ្នែក)
│   ├── api/                # route របស់ API (51 ថត)
│   └── login/              # ទំព័រផ្ទៀងផ្ទាត់អត្តសញ្ញាណ (.tsx)
├── domain/                 # ម៉ាស៊ីនគោលការណ៍ (policyEngine, comboResolver, costRules ជាដើម)
├── lib/                    # តក្កវិជ្ជាអាជីវកម្មស្នូល (.ts)
│   ├── a2a/                # server សម្រាប់ protocol Agent-to-Agent v0.3
│   ├── acp/                # បញ្ជីឈ្មោះ Agent Communication Protocol
│   ├── compliance/         # ម៉ាស៊ីនគោលការណ៍អនុលោមភាព
│   ├── db/                 # module ដែន SQLite + migration ចំនួន 130
│   ├── memory/             # អង្គចងចាំការសន្ទនាអចិន្ត្រៃយ៍
│   ├── oauth/              # provider, service និង utility របស់ OAuth
│   ├── skills/             # framework ជំនាញដែលអាចពង្រីកបាន
│   ├── usage/              # ការតាមដានការប្រើប្រាស់ និងការគណនាចំណាយ
│   └── localDb.ts          # ស្រទាប់ re-export ប៉ុណ្ណោះ — កុំបន្ថែមតក្កវិជ្ជានៅទីនេះ
├── middleware/              # middleware សម្រាប់ request (promptInjectionGuard)
├── mitm/                   # proxy MITM (វិញ្ញាបនបត្រ, DNS, ការកំណត់ route ទៅគោលដៅ)
├── shared/
│   ├── components/         # component របស់ React (.tsx)
│   ├── constants/          # និយមន័យ provider (329), scope របស់ MCP, យុទ្ធសាស្ត្រកំណត់ route ចំនួន 19
│   ├── utils/              # circuit breaker, sanitizer, helper សម្រាប់ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ
│   └── validation/         # schema របស់ Zod v4
└── sse/                    # pipeline proxy របស់ SSE

open-sse/                   # workspace របស់ @omniroute/open-sse
├── executors/              # module អនុវត្ត executor ចំនួន 89
├── handlers/               # request handler ចំនួន 11 (chat, responses, embeddings, images ជាដើម)
├── mcp-server/             # server MCP (tool ដាច់ដោយឡែកចំនួន 110, transport ចំនួន 3, scope ចំនួន 33)
├── services/               # service កម្រិតកំពូលចំនួន 178 (combo, autoCombo, rateLimitManager ជាដើម)
├── translator/             # ឧបករណ៍បកប្រែទ្រង់ទ្រាយ (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # transformer សម្រាប់ Responses API
└── utils/                  # module utility ចំនួន 22 (stream, TLS, proxy, logging)

electron/                   # កម្មវិធី desktop Electron (ឆ្លងវេទិកា)

tests/
├── unit/                   # ឧបករណ៍ដំណើរការ test របស់ Node.js (ឯកសារ test ចំនួន 1,574)
├── integration/            # test សមាហរណកម្ម
├── e2e/                    # test របស់ Playwright
├── security/               # test សុវត្ថិភាព
├── translator/             # test ជាក់លាក់សម្រាប់ translator
└── load/                   # test បន្ទុក

docs/
├── adr/                     # កំណត់ត្រាសេចក្ដីសម្រេចផ្នែកស្ថាបត្យកម្ម
├── architecture/            # ស្ថាបត្យកម្មប្រព័ន្ធ និងភាពធន់
├── comparison/              # OmniRoute ប្រៀបធៀបនឹងជម្រើសផ្សេងៗ
├── compression/             # មគ្គុទ្ទេសក៍ និងច្បាប់នៃការបង្ហាប់
├── dev/                     # មគ្គុទ្ទេសក៍អភិវឌ្ឍន៍
├── diagrams/                # ដ្យាក្រាមស្ថាបត្យកម្ម
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # មគ្គុទ្ទេសក៍អ្នកប្រើប្រាស់, Docker, ការដំឡើង, ការដោះស្រាយបញ្ហា
├── i18n/                    # ការបកប្រែ README ជាភាសាអន្តរជាតិ
├── marketing/               # សម្ភារៈទីផ្សារ
├── ops/                     # ការដាក់ឱ្យប្រើប្រាស់, proxy, coverage, ការចេញផ្សាយ
├── providers/               # ឯកសារជាក់លាក់សម្រាប់ provider
├── reference/               # ឯកសារយោង API, env vars, ឧបករណ៍ CLI, កម្រិតប្រើប្រាស់ឥតគិតថ្លៃ
├── releases/                # កំណត់សម្គាល់ការចេញផ្សាយ
├── routing/                 # ម៉ាស៊ីន auto-combo, ការចាក់ឡើងវិញនូវការវែកញែក
├── screenshots/             # screenshot របស់ dashboard
├── security/                # របាំងការពារ, អនុលោមភាព, ការលាក់បាំង, token
└── specs/                   # លក្ខណៈបច្ចេកទេសនៃការរចនា
```

---

## ការបន្ថែមអ្នកផ្តល់សេវាថ្មី

### ជំហានទី 1៖ ចុះឈ្មោះថេររបស់អ្នកផ្តល់សេវា

បន្ថែមទៅក្នុង `src/shared/constants/providers.ts` — ត្រូវបានផ្ទៀងផ្ទាត់ដោយ Zod នៅពេលផ្ទុកម៉ូឌុល។

### ជំហានទី 2៖ បន្ថែម Executor (ប្រសិនបើត្រូវការឡូជីខលផ្ទាល់ខ្លួន)

បង្កើត executor នៅក្នុង `open-sse/executors/your-provider.ts` ដោយពង្រីកពី executor មូលដ្ឋាន។

### ជំហានទី 3៖ បន្ថែម Translator (ប្រសិនបើមិនមែនជាទម្រង់ OpenAI)

បង្កើត translator សម្រាប់ request/response នៅក្នុង `open-sse/translator/`។

### ជំហានទី 4៖ បន្ថែមការកំណត់រចនាសម្ព័ន្ធ OAuth (ប្រសិនបើផ្អែកលើ OAuth)

បន្ថែមព័ត៌មានសម្ងាត់ OAuth នៅក្នុង `src/lib/oauth/constants/oauth.ts` និងសេវាកម្មនៅក្នុង `src/lib/oauth/services/`។

ប្រសិនបើអ្នកផ្តល់សេវាខាងដើមចែកចាយ OAuth client_id/secret សាធារណៈ ឬ Firebase Web API key នៅក្នុង CLI / browser bundle សាធារណៈរបស់ខ្លួន **កុំ** បង្កប់វាជា string literal។ ប្រើ `resolvePublicCred()` ពី `open-sse/utils/publicCreds.ts` ហើយបន្ថែមធាតុ byte ដែលបានបិទបាំងទៅក្នុង `EMBEDDED_DEFAULTS`។ លំហូរការងារចាំបាច់ពេញលេញត្រូវបានចងក្រងជាឯកសារនៅក្នុង [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)។

នៅខាងក្នុង handlers/executors សារកំហុសដែលទៅដល់ម៉ាស៊ីនភ្ញៀវត្រូវតែឆ្លងកាត់ `buildErrorBody()` / `sanitizeErrorMessage()` ពី `open-sse/utils/error.ts` — កុំដាក់ `err.stack` ឬ `err.message` ដើមនៅក្នុង Response body។ សូមមើល [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)។

### ជំហានទី 5៖ ចុះឈ្មោះម៉ូដែល

បន្ថែមនិយមន័យម៉ូដែលនៅក្នុង `open-sse/config/providerRegistry.ts`។

### ជំហានទី 6៖ បន្ថែមតេស្ត

សរសេរ unit tests នៅក្នុង `tests/unit/` ដែលយ៉ាងហោចណាស់គ្របដណ្តប់លើ៖

- ការចុះឈ្មោះអ្នកផ្តល់សេវា
- ការបម្លែង request/response
- ការដោះស្រាយកំហុស

---

## បញ្ជីត្រួតពិនិត្យ Pull Request

- [ ] តេស្តឆ្លងកាត់ (`npm test`)
- [ ] ការត្រួតពិនិត្យ Lint ឆ្លងកាត់ (`npm run lint`)
- [ ] ការ build ជោគជ័យ (`npm run build`)
- [ ] បានបន្ថែម TypeScript types សម្រាប់ functions និង interfaces សាធារណៈថ្មី
- [ ] គ្មានព័ត៌មានសម្ងាត់ ឬតម្លៃ fallback ដែលបាន hardcode
- [ ] ព័ត៌មានសម្ងាត់សាធារណៈពីប្រភពខាងដើមត្រូវបានបង្កប់តាមរយៈ `resolvePublicCred()` (សូមមើល [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)) មិនត្រូវបង្កប់ជា literals ឡើយ
- [ ] Error responses ឆ្លងកាត់ `buildErrorBody()` / `sanitizeErrorMessage()` — គ្មាន stack traces ដើមនៅក្នុង response bodies (សូមមើល [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell commands (`exec` / `spawn`) បញ្ជូនតម្លៃ runtime តាមរយៈ `env` មិនមែនតាមរយៈ string interpolation
- [ ] Inputs ទាំងអស់ត្រូវបានផ្ទៀងផ្ទាត់ដោយប្រើ Zod schemas
- [ ] បានបន្ថែម **fragment** នៃ changelog នៅក្រោម `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` សម្រាប់ការផ្លាស់ប្តូរដែលអ្នកប្រើប្រាស់អាចមើលឃើញ (សូមមើល [`changelog.d/README.md`](./changelog.d/README.md)) — **កុំ** កែសម្រួល `CHANGELOG.md` ដោយផ្ទាល់; fragments ត្រូវបានប្រមូលបញ្ចូលគ្នានៅពេលចេញ release ហើយមិនដែលប៉ះទង្គិចគ្នារវាង PRs ឡើយ
- [ ] ឯកសារត្រូវបានធ្វើបច្ចុប្បន្នភាព (ប្រសិនបើអាចអនុវត្តបាន)
- [ ] មិនមាន CodeQL / Secret-Scanning alerts ថ្មីត្រូវបានបើក ឬ alerts នីមួយៗត្រូវបានបដិសេធដោយមានយុត្តិកម្មបច្ចេកទេសយោងទៅឯកសារ `docs/security/` ដែលពាក់ព័ន្ធ
- [ ] Routes ដែលបង្កើត child processes (`/api/mcp/`, `/api/cli-tools/runtime/`) ត្រូវបានចាត់ថ្នាក់ជា `isLocalOnlyPath()` នៅក្នុង `src/server/authz/routeGuard.ts` — សូមមើល [ច្បាប់តឹងរ៉ឹង #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] គ្មាន trailers `Co-Authored-By` នៅក្នុង commit messages — commits ត្រូវតែបង្ហាញតែក្រោម Git identity របស់ម្ចាស់ repository ប៉ុណ្ណោះ (ច្បាប់តឹងរ៉ឹង #16)

---

## ការចេញផ្សាយ

ការចេញផ្សាយត្រូវបានគ្រប់គ្រងតាមរយៈ workflow `/generate-release`។ នៅពេល GitHub Release ថ្មីត្រូវបានបង្កើត package នឹងត្រូវបាន **បោះពុម្ពផ្សាយទៅ npm ដោយស្វ័យប្រវត្តិ** តាមរយៈ GitHub Actions។

សម្រាប់ការដាក់ឱ្យដំណើរការលើ VPS សូមប្រើ `npm run build:release` (មិនមែន `npm run build` ទេ) — វាធ្វើការស្ថាបនាឡើងវិញពីសូន្យ រៀបចំ bundle ទៅក្នុង `dist/` និងសរសេរ sentinel `dist/BUILD_SHA`។
បន្ទាប់មក ប្រើ skills `/deploy-vps-*-cc` ដែលប្រើ rsync ដើម្បីធ្វើសមកាលកម្ម `dist/` ទៅកាន់ថត `app/` នៅលើម៉ាស៊ីនពីចម្ងាយ។

---

## ការទទួលជំនួយ

- **ស្ថាបត្យកម្ម**៖ សូមមើល [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **ឯកសារយោង API**៖ សូមមើល [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **ឯកសារសុវត្ថិភាព**៖ [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **ឯកសារប្រតិបត្តិការ**៖ [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **បញ្ហា**៖ [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**៖ សូមមើល `docs/adr/` សម្រាប់កំណត់ត្រាសេចក្ដីសម្រេចផ្នែកស្ថាបត្យកម្ម
