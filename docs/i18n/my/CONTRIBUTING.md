# Contributing to OmniRoute (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

ပါဝင်ကူညီရန် စိတ်ဝင်စားသည့်အတွက် ကျေးဇူးတင်ပါသည်။ ဤလမ်းညွှန်တွင် စတင်ရန် လိုအပ်သမျှအားလုံး ပါဝင်ပါသည်။

ပြောင်းလဲမှုတစ်ခုချင်းစီအတွက် တရားဝင်လုပ်ငန်းစဉ်ကို
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) မှ စတင်ပါ။ ၎င်းတွင် provider၊ routing၊
UI/UX၊ i18n၊ CLI၊ database နှင့် build/deploy ပြောင်းလဲမှုများကို ၎င်းတို့၏ contract များ၊ သီးသန့်အာရုံစိုက်ထားသော test များ၊ CI
လွှမ်းခြုံမှုနှင့် ပြန်လည်ညှိနှိုင်းခြင်းအဆင့်များနှင့် ချိတ်ဆက်ဖော်ပြထားသည်။

---

## ဖွံ့ဖြိုးတိုးတက်ရေး ပတ်ဝန်းကျင်ပြင်ဆင်ခြင်း

### ကြိုတင်လိုအပ်ချက်များ

- **Node.js** `>=22.22.3 <23` သို့မဟုတ် `>=24.0.0 <27` (အကြံပြုချက်- 24 LTS)
- **npm** 10+

> **npm v11+ အသုံးပြုသူများ (Node 24+):** `npm install` ပြုလုပ်ပြီးနောက် native module များ ထည့်သွင်းပြီးဖြစ်ကြောင်း စစ်ဆေးပါ-
> `node -e "require('better-sqlite3')"`။ `MODULE_NOT_FOUND` ဖြင့် မအောင်မြင်ပါက
> `npm approve-scripts better-sqlite3 && npm install` ကို လုပ်ဆောင်ပါ။ အသေးစိတ်ကို
> [ပြဿနာဖြေရှင်းခြင်း](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module) တွင် ကြည့်ပါ။

- **Git**

### Clone ပြုလုပ်ခြင်းနှင့် ထည့်သွင်းခြင်း

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### ပတ်ဝန်းကျင် Variable များ

```bash
# template မှ သင်၏ .env ကို ဖန်တီးပါ
cp .env.example .env

# လိုအပ်သော secret များကို ထုတ်လုပ်ပါ
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

ဖွံ့ဖြိုးတိုးတက်ရေးအတွက် အဓိက variable များ-

| Variable               | ဖွံ့ဖြိုးတိုးတက်ရေး မူလတန်ဖိုး | ဖော်ပြချက်                |
| ---------------------- | ------------------------------ | ------------------------- |
| `PORT`                 | `20128`                        | Server port               |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`       | Frontend အတွက် အခြေခံ URL |
| `JWT_SECRET`           | (အထက်တွင် ထုတ်လုပ်ပါ)          | JWT လက်မှတ်ထိုး secret    |
| `INITIAL_PASSWORD`     | `CHANGEME`                     | ပထမဆုံး login password    |
| `APP_LOG_LEVEL`        | `info`                         | Log အသေးစိတ်အဆင့်         |

### Dashboard ဆက်တင်များ

Dashboard တွင် ပတ်ဝန်းကျင် variable များမှတစ်ဆင့်လည်း သတ်မှတ်နိုင်သော feature များအတွက် UI toggle များ ပါဝင်သည်-

| ဆက်တင်တည်နေရာ       | Toggle             | ဖော်ပြချက်                              |
| ------------------- | ------------------ | --------------------------------------- |
| Settings → Advanced | Debug Mode         | Debug request log များကို ဖွင့်ရန် (UI) |
| Settings → General  | Sidebar Visibility | Sidebar အပိုင်းများကို ပြရန်/ဖျောက်ရန်  |

ဤဆက်တင်များကို database တွင် သိမ်းဆည်းထားပြီး restart ပြုလုပ်ပြီးနောက်တွင်လည်း ဆက်လက်တည်ရှိကာ သတ်မှတ်ထားပါက env var မူလတန်ဖိုးများကို အစားထိုးအသုံးပြုသည်။

### Local တွင် လုပ်ဆောင်ခြင်း

```bash
# ဖွံ့ဖြိုးတိုးတက်ရေး mode (အလိုအလျောက် ပြန်လည်တင်ခြင်း)
npm run dev

# Production build
npm run build    # next build → .build/next/ ထို့နောက် assembleStandalone → dist/
npm run start

# ပါဝင်ကူညီသူ၏ ပြောင်းလဲမှုများအတွက် လျင်မြန်သော backend/API-only compile
npm run build:contributor

# Release build (ရှင်းလင်း၍ ပြန်လည် build လုပ်ခြင်း + HEAD sentinel — deploy အတွက် လိုအပ်သည်)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA ကို ရေးသားသည်

# အသုံးများသော port သတ်မှတ်ချက်
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Contributor build သည် compile-only စစ်ဆေးမှုကို လုပ်ဆောင်သည်- standalone
ဖြန့်ချိမှုကို စုစည်းခြင်း သို့မဟုတ် ရွေးချယ်နိုင်သော native packaging asset များကို build လုပ်ခြင်း မပြုပါ။ ဖြန့်ချိနိုင်သော bundle ကို
စစ်ဆေးရန် လိုအပ်သည့်အခါ ပုံမှန် production build ကို အသုံးပြုပါ။

### Build Output ဖွဲ့စည်းပုံ

| Directory | ပါဝင်သောအရာများ                                                                | ခြေရာခံထားမှု |
| --------- | ------------------------------------------------------------------------------ | ------------- |
| `src/`    | Application source (TypeScript / TSX)                                          | ဟုတ်သည်       |
| `.build/` | ကြားခံဖိုင်များ — `next build` output (gitignored၊ `distDir = .build/next`)    | မဟုတ်ပါ       |
| `dist/`   | ဖြန့်ချိနိုင်သော bundle — `assembleStandalone` ဖြင့် စုစည်းထားသည် (gitignored) | မဟုတ်ပါ       |

Build pipeline သည် တစ်ကြိမ်တည်းဖြင့် လုပ်ဆောင်သည်-

```
npm run build
  └─ next build → .build/next/standalone  (Next.js output)
  └─ assembleStandalone()                 (standalone + static + public + native asset များကို ကူးယူသည်)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` သည် ထို့အပြင် directory နှစ်ခုလုံးကို ဦးစွာရှင်းလင်းပြီး
deploy အပြည့်အစုံမှန်ကန်ကြောင်း စစ်ဆေးသည့် sentinel အဖြစ် `dist/BUILD_SHA` (= `git rev-parse --short HEAD`) ကို ရေးသားသည်။

`npm run build:contributor` သည် backend-only build profile ကို အသုံးပြုသည်။ Build လုပ်နေစဉ်
dashboard UI ဖိုင်များကို ယာယီ stub လုပ်ပြီး API route handler များကို ဆက်လက်ထားရှိကာ build ပြီးနောက် မူရင်းဖိုင်များကို
ပြန်လည်ထားရှိသည်။ Dashboard UI ကို သက်ရောက်သော ပြောင်းလဲမှုများ သို့မဟုတ် release အပြည့်အစုံ
စစ်ဆေးမှုအတွက် `npm run build` ကို အသုံးပြုပါ။ Contributor profile သည် release build ကို အစားထိုးခြင်းမဟုတ်ပါ။

> **VPS deploy မှတ်ချက်:** remote image directory `/usr/lib/node_modules/omniroute/app/`
> သည် မပြောင်းလဲပါ။ Deploy skill များသည် `dist/` ၏ အကြောင်းအရာများကို ၎င်းထဲသို့ rsync လုပ်သည်။
> Repository အတွင်းရှိ build output path သာ ပြောင်းသွားသည် (`app/` → `dist/`)။

မူလ URL များ-

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git အလုပ်စီးဆင်းမှု

> ⚠️ **`main` သို့ တိုက်ရိုက် commit လုံးဝ မလုပ်ပါနှင့်။** Feature branch များကို အမြဲအသုံးပြုပါ။
>
> **PR base:** လက်ရှိအသုံးပြုနေသော `release/vX.Y.Z` branch ကို ဦးတည်ပါ (`main` မဟုတ်ပါ)။
> release တစ်ခုလျှင် branch တစ်ခု + ဖြန့်ချိချိန်တွင် tag သတ်မှတ်သည့် ပုံစံအကြောင်း
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) တွင် ကြည့်ပါ။

```bash
# လက်ရှိအသုံးပြုနေသော release ၏ နောက်ဆုံး commit မှ branch ခွဲပါ (ဥပမာ: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... ပြောင်းလဲမှုများ ပြုလုပ်ပါ ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 ဖြင့် Pull Request တစ်ခု ဖွင့်ပါ
```

### Branch အမည်ပေးခြင်း

| Prefix      | ရည်ရွယ်ချက်                          |
| ----------- | ------------------------------------ |
| `feat/`     | Feature အသစ်များ                     |
| `fix/`      | Bug ပြင်ဆင်မှုများ                   |
| `refactor/` | Code ဖွဲ့စည်းပုံ ပြန်လည်ပြင်ဆင်ခြင်း |
| `docs/`     | Documentation ပြောင်းလဲမှုများ       |
| `test/`     | Test ထည့်သွင်းမှုများ/ပြင်ဆင်မှုများ |
| `chore/`    | Tooling၊ CI၊ dependency များ         |

### Commit Message များ

[Conventional Commits](https://www.conventionalcommits.org/) ကို လိုက်နာပါ။

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scope များ (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`။

---

## Test များ လုပ်ဆောင်ခြင်း

```bash
# Test အားလုံး (unit + vitest + ecosystem + e2e)
npm run test:all

# Test file တစ်ခုတည်း (Node.js ၏ မူရင်း test runner — test အများစုက ၎င်းကို အသုံးပြုသည်)
node --import tsx/esm --test tests/unit/your-file.test.ts

# သင်၏ပြောင်းလဲမှုကြောင့် သက်ရောက်မှုရှိသော unit test များသာ (CI gate၊ #8084 နှင့် တူညီသော TIA selector)
npm run test:scoped            # နောက်ဆုံး commit (သို့မဟုတ် working tree) ရှိ ပြောင်းလဲမှုများ
npm run test:scoped:staged     # staged လုပ်ထားသော ပြောင်းလဲမှုများသာ — pre-commit run နှင့် ကောင်းမွန်စွာ တွဲဖက်အသုံးပြုနိုင်သည်
npm run test:scoped:full       # import-graph map ကို ဦးစွာ ပြန်လည်တည်ဆောက်ပါ (file များ ထည့်သွင်း/ရွှေ့ပြောင်းပြီးနောက်)
# Exit 1 + "run the full suite" ဆိုသည်မှာ hub file (tsconfig, package.json, …) သို့မဟုတ်
# mapping မရှိသော source ပြောင်းလဲသွားခြင်းကို ဆိုလိုသည် — selector သည် ဘေးကင်းစွာ fail ဖြစ်ပြီး မည်သည့်အရာကိုမျှ တိတ်တဆိတ် မကျော်သွားပါ။

# Vitest (MCP server၊ autoCombo၊ cache)
npm run test:vitest

# E2E test များ (Playwright လိုအပ်သည်)
npm run test:e2e

# Protocol client E2E (MCP transport များ၊ A2A)
npm run test:protocols:e2e

# Ecosystem လိုက်ဖက်ညီမှု test များ
npm run test:ecosystem

# Coverage gate: statement/line/function/branch များ၏ 60%
npm run test:coverage
npm run coverage:report

# Lint + format စစ်ဆေးခြင်း
npm run lint
npm run check

# Gate ဖြင့် ကန့်သတ်ထားသော အမှန်တကယ် upstream combo smoke test (VPS အသုံးပြုခွင့် + provider credit အစစ်များ လိုအပ်သည်)
# အမှန်တကယ် provider များကို ခေါ်ယူသည် — အနည်းငယ် ကုန်ကျမည်။ CI တွင် လုံးဝ မလုပ်ဆောင်ပါ။ Gate မရှိပါက ပြဿနာမဖြစ်စေဘဲ ကျော်သွားမည်။
# လိုအပ်ချက်: ssh root@192.168.0.15 အသုံးပြုခွင့် (VPS မှ read-only DB snapshot ကို source လုပ်သည်)။
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — ရိုးရိုး Node ESM script များဖြစ်ပြီး live .15 server ကို တိုက်ရိုက်ခေါ်ယူသည်။
# လိုအပ်ချက်: ssh root@192.168.0.15 အသုံးပြုခွင့် (combo များကို SSH sqlite မှတစ်ဆင့် ဖန်တီး/ဖျက်သိမ်းသည်)။
# အမှန်တကယ် provider များကို ခေါ်ယူသည် (ကုန်ကျစရိတ် အနည်းငယ်ရှိသည်)။ __live_test__* combo များကိုသာ ဖန်တီး/ဖျက်ပစ်သည်။ CI တွင် လုံးဝ မလုပ်ဆောင်ပါ။
# .15 တွင် REQUIRE_API_KEY=false ဖြစ်သဖြင့် API key မလိုအပ်သော်လည်း သတ်မှတ်ထားပါက COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY ကို လိုက်နာအသုံးပြုသည်။
npm run test:combo:live:vps              # HTTP scenario 7 ခု (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # အမှန်တကယ် cross-provider failover scenario တစ်ခု ထပ်ထည့်သည် (စုစုပေါင်း 8 ခု)
```

Coverage မှတ်ချက်များ-

- `npm run test:coverage` သည် အဓိက unit test suite အတွက် source coverage ကို တိုင်းတာပြီး `tests/**` ကို ချန်လှပ်ကာ `open-sse/**` ကို ထည့်သွင်းသည်
- Pull request များသည် statement/line/function/branch များအတွက် coverage gate ကို **60%+** တွင် ထိန်းထားရမည်
- PR တစ်ခုက `src/`, `open-sse/`, `electron/` သို့မဟုတ် `bin/` ရှိ production code ကို ပြောင်းလဲပါက တူညီသော PR ထဲတွင် automated test များကို ထည့်သွင်းရန် သို့မဟုတ် အပ်ဒိတ်လုပ်ရန် လိုအပ်သည်
- `npm run coverage:report` သည် နောက်ဆုံး coverage run မှ file တစ်ခုချင်းစီအလိုက် အသေးစိတ် report ကို ဖော်ပြသည်
- `npm run test:coverage:legacy` သည် ယခင်အခြေအနေနှင့် နှိုင်းယှဉ်နိုင်ရန် အဟောင်း metric ကို ထိန်းသိမ်းထားသည်
- အဆင့်လိုက် coverage မြှင့်တင်ရေး လမ်းပြအစီအစဉ်အတွက် `docs/ops/COVERAGE_PLAN.md` ကို ကြည့်ပါ

### Pull Request လိုအပ်ချက်များ

PR တစ်ခု မဖွင့်မီ သင်ပြောင်းလဲထားသည့်အရာအတွက် သီးသန့်အာရုံစိုက်ထားသော လုပ်ငန်းစဉ်ကို လုပ်ဆောင်ရန်
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) ကို အသုံးပြုပါ။
Unit suite အပြည့်အစုံ (CI shard 4 ခု)၊ Vitest၊ **60%+** coverage gate နှင့်
production build တို့သည် CI ၏ တာဝန်ဖြစ်သည် — ၎င်းတို့ကို local တွင် လုပ်ဆောင်ခြင်းသည် PR
စစ်ဆေးမှုများက မပေးနိုင်သေးသော နောက်ထပ်အချက်အလက် မပေးနိုင်သည့်အပြင် စွမ်းဆောင်ရည်နိမ့်သော စက်များတွင် host ကို အပြည့်အဝ အသုံးပြုမိစေနိုင်သည် (#8084)-

- သင်၏ပြောင်းလဲမှုကို လွှမ်းခြုံသော test file များကို လုပ်ဆောင်ပါ- `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` ကို လုပ်ဆောင်ပါ
- Production code ပြောင်းလဲသည့်အခါတိုင်း တူညီသော PR ထဲတွင် automated test များကို ထည့်သွင်းပါ သို့မဟုတ် အပ်ဒိတ်လုပ်ပါ
- Production code ပြောင်းလဲသည့်အခါ ပြောင်းလဲထားသော သို့မဟုတ် အသစ်ထည့်ထားသော test file များကို PR ဖော်ပြချက်ထဲတွင် ထည့်သွင်းပါ
- Project secret များကို CI တွင် configure လုပ်ထားပါက PR ပေါ်ရှိ SonarQube ရလဒ်ကို စစ်ဆေးပါ

လက်ရှိ test အခြေအနေ- အောက်ပါတို့ကို လွှမ်းခြုံထားသည့် **unit test file 122 ခု**-

- Provider translator များနှင့် format ပြောင်းလဲခြင်း
- Rate limiting၊ circuit breaker နှင့် resilience
- Semantic cache၊ idempotency နှင့် progress tracking
- Database operation များနှင့် schema (DB module 21 ခု)
- OAuth flow များနှင့် authentication
- API endpoint validation (Zod v4)
- MCP server tool များနှင့် scope enforcement
- Memory နှင့် Skills system များ

---

## ကုဒ်စတိုင်

- **ESLint** — commit မပြုလုပ်မီ `npm run lint` ကို run ပါ
- **Prettier** — commit ပြုလုပ်ချိန်တွင် `lint-staged` မှတစ်ဆင့် အလိုအလျောက် format လုပ်သည် (space 2 ခု၊ semicolon များ၊ double quote များ၊ စာလုံးအကျယ် 100၊ es5 trailing comma များ)
- **TypeScript** — `src/` ရှိ ကုဒ်အားလုံးသည် `.ts`/`.tsx` ကို အသုံးပြုသည်၊ `open-sse/` သည် `.ts`/`.js` ကို အသုံးပြုသည်၊ TSDoc (`@param`, `@returns`, `@throws`) ဖြင့် documentation ရေးသားပါ
- **`eval()` မသုံးရ** — ESLint က `no-eval`, `no-implied-eval`, `no-new-func` ကို မဖြစ်မနေ လိုက်နာစေသည်
- **Zod validation** — API input validation အားလုံးအတွက် Zod v4 schema များကို အသုံးပြုပါ
- **အမည်ပေးခြင်း**: ဖိုင်များ = camelCase/kebab-case၊ component များ = PascalCase၊ constant များ = UPPER_SNAKE

### Error ကိုင်တွယ်ခြင်း / အလွတ် catch block များ

မည်သည့် `catch` ကိုမျှ ရှင်းလင်းချက်မပါဘဲ မထားပါနှင့်။ ၎င်းကို အောက်ပါ အမျိုးအစားနှစ်မျိုးအနက်
တစ်မျိုးအဖြစ် ခွဲခြားပါ ("SSE stream များတွင် error များကို မည်သည့်အခါမျှ တိတ်တဆိတ် မျိုချမထားရ"
ဟူသော တင်းကျပ်သည့် စည်းမျဉ်းကို လက်တွေ့အသုံးချခြင်းဖြစ်သည်):

- **ရည်ရွယ်ချက်ရှိသော (ကျွန်ုပ်တို့ကိုယ်တိုင်၏ အကောင်းဆုံးကြိုးပမ်းမှု cleanup/telemetry)** — ဤနေရာတွင် failure ဖြစ်ခြင်းကို
  မျှော်လင့်ထားပြီး အန္တရာယ်မရှိပါ၊ အကြောင်းရင်းရှင်းလင်းချက် comment တစ်ကြောင်း ထည့်ပါ၊ logging မပြုလုပ်ပါနှင့်
  (request တိုင်းတွင် logging ပြုလုပ်ခြင်းကြောင့် ဖြစ်ပေါ်လာမည့် မလိုအပ်သော noise ကို ဤသတ်မှတ်ချက်က ရှောင်ရှားပေးသည်)။

  ```ts
  } catch {} // client ချိတ်ဆက်မှုပြတ်တောက်ပြီးနောက် ပိတ်ထားပြီးသား controller ကို ထပ်မံပိတ်ခြင်းမှာ မျှော်လင့်ထားသောအရာဖြစ်သည်
  ```

- **Log ပြုလုပ်သင့်သော (ပြင်ပ/ခေါ်ယူသူက ပေးထားသည့် ကုဒ်၊ သို့မဟုတ် error ကို မျိုချထားခြင်းက control flow ကို ပြောင်းလဲစေသည့်အခါ)** — catch ကို
  ဆက်လက်ထားရှိပါ (stream ကို မည်သည့်အခါမျှ မပျက်စေပါနှင့်)၊ သို့သော် failure ကို ရှာဖွေတွေ့ရှိနိုင်စေရန် ဆက်စပ်အကြောင်းအရာပါသည့်
  `console.debug`/`warn` ကို ထုတ်ပေးပါ။

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

လက်တွေ့အသုံးပြုထားသည့် နမူနာများအတွက် `open-sse/utils/stream.ts` နှင့် `open-sse/utils/streamHandler.ts` ကို ကြည့်ပါ။

---

## ပရောဂျက်ဖွဲ့စည်းပုံ

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard စာမျက်နှာများ (ကဏ္ဍ 23 ခု)
│   ├── api/                # API route များ (directory 51 ခု)
│   └── login/              # အထောက်အထားစိစစ်ခြင်း စာမျက်နှာများ (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules စသည်)
├── lib/                    # အဓိက business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite domain module များ + migration 130 ခု
│   ├── memory/             # ရေရှည်သိမ်းဆည်းထားသော စကားဝိုင်းမှတ်ဉာဏ်
│   ├── oauth/              # OAuth provider များ၊ service များနှင့် utility များ
│   ├── skills/             # တိုးချဲ့နိုင်သော skill framework
│   ├── usage/              # အသုံးပြုမှု ခြေရာခံခြင်းနှင့် ကုန်ကျစရိတ်တွက်ချက်ခြင်း
│   └── localDb.ts          # ပြန်လည် export လုပ်သည့် layer သီးသန့် — ဤနေရာတွင် logic ကို မည်သည့်အခါမျှ မထည့်ပါနှင့်
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (certificate၊ DNS၊ ပစ်မှတ် routing)
├── shared/
│   ├── components/         # React component များ (.tsx)
│   ├── constants/          # Provider သတ်မှတ်ချက်များ (329)၊ MCP scope များ၊ routing strategy 19 ခု
│   ├── utils/              # Circuit breaker၊ sanitizer၊ auth helper များ
│   └── validation/         # Zod v4 schema များ
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # Executor implementation module 89 ခု
├── handlers/               # Request handler 11 ခု (chat၊ responses၊ embeddings၊ images စသည်)
├── mcp-server/             # MCP server (သီးခြား tool 110 ခု၊ transport 3 ခု၊ scope 33 ခု)
├── services/               # ထိပ်တန်းအဆင့် service 178 ခု (combo၊ autoCombo၊ rateLimitManager စသည်)
├── translator/             # Format translator များ (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # Utility module 22 ခု (stream၊ TLS၊ proxy၊ logging)

electron/                   # Electron desktop app (platform အမျိုးမျိုးတွင် အသုံးပြုနိုင်သော)

tests/
├── unit/                   # Node.js test runner (test ဖိုင် 1,574 ခု)
├── integration/            # Integration test များ
├── e2e/                    # Playwright test များ
├── security/               # လုံခြုံရေး test များ
├── translator/             # Translator သီးသန့် test များ
└── load/                   # Load test များ

docs/
├── adr/                     # Architecture Decision Record များ
├── architecture/            # စနစ် architecture နှင့် resilience
├── comparison/              # OmniRoute နှင့် အခြားရွေးချယ်စရာများကို နှိုင်းယှဉ်ခြင်း
├── compression/             # Compression လမ်းညွှန်များနှင့် စည်းမျဉ်းများ
├── dev/                     # ဖွံ့ဖြိုးတိုးတက်ရေး လမ်းညွှန်များ
├── diagrams/                # Architecture diagram များ
├── frameworks/              # MCP၊ A2A၊ OpenCode၊ Memory၊ Skills
├── guides/                  # အသုံးပြုသူလမ်းညွှန်၊ Docker၊ စနစ်တပ်ဆင်ခြင်း၊ ပြဿနာဖြေရှင်းခြင်း
├── i18n/                    # ဘာသာစကားမျိုးစုံဖြင့် ပြန်ဆိုထားသော README များ
├── marketing/               # စျေးကွက်မြှင့်တင်ရေး ပစ္စည်းများ
├── ops/                     # Deployment၊ proxy၊ coverage၊ release များ
├── providers/               # Provider သီးသန့် documentation
├── reference/               # API reference၊ env var များ၊ CLI tool များ၊ အခမဲ့အဆင့်များ
├── releases/                # Release note များ
├── routing/                 # Auto-combo engine၊ reasoning replay
├── screenshots/             # Dashboard screenshot များ
├── security/                # Guardrail များ၊ compliance၊ stealth၊ token များ
└── specs/                   # ဒီဇိုင်းသတ်မှတ်ချက်များ
```

---

## Provider အသစ်တစ်ခု ထည့်သွင်းခြင်း

### အဆင့် 1: Provider Constants များကို စာရင်းသွင်းခြင်း

`src/shared/constants/providers.ts` တွင် ထည့်သွင်းပါ — module ကို load လုပ်ချိန်တွင် Zod ဖြင့် အတည်ပြုစစ်ဆေးပါသည်။

### အဆင့် 2: Executor ထည့်သွင်းခြင်း (စိတ်ကြိုက် logic လိုအပ်ပါက)

အခြေခံ executor ကို တိုးချဲ့ထားသည့် executor ကို `open-sse/executors/your-provider.ts` တွင် ဖန်တီးပါ။

### အဆင့် 3: Translator ထည့်သွင်းခြင်း (OpenAI format မဟုတ်ပါက)

Request/response translator များကို `open-sse/translator/` တွင် ဖန်တီးပါ။

### အဆင့် 4: OAuth Config ထည့်သွင်းခြင်း (OAuth အခြေခံဖြစ်ပါက)

OAuth credentials များကို `src/lib/oauth/constants/oauth.ts` တွင် ထည့်သွင်းပြီး service ကို `src/lib/oauth/services/` တွင် ထည့်သွင်းပါ။

Upstream provider သည် အများသုံး OAuth client_id/secret သို့မဟုတ် Firebase Web API key ကို ၎င်း၏ အများသုံး CLI / browser bundle အတွင်း ဖြန့်ဝေထားပါက၊ ၎င်းကို string literal အဖြစ် **မထည့်သွင်းပါနှင့်**။ `open-sse/utils/publicCreds.ts` မှ `resolvePublicCred()` ကို အသုံးပြုပြီး masked byte entry တစ်ခုကို `EMBEDDED_DEFAULTS` တွင် ထည့်သွင်းပါ။ မဖြစ်မနေလိုက်နာရမည့် workflow အပြည့်အစုံကို [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) တွင် မှတ်တမ်းတင်ထားပါသည်။

Handlers/executors များအတွင်း client ထံရောက်ရှိမည့် error message များသည် `open-sse/utils/error.ts` မှ `buildErrorBody()` / `sanitizeErrorMessage()` ကို ဖြတ်သန်းရမည် — raw `err.stack` သို့မဟုတ် `err.message` ကို Response body ထဲတွင် လုံးဝမထည့်ပါနှင့်။ [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) ကို ကြည့်ပါ။

### အဆင့် 5: Models များကို စာရင်းသွင်းခြင်း

Model definition များကို `open-sse/config/providerRegistry.ts` တွင် ထည့်သွင်းပါ။

### အဆင့် 6: Tests များ ထည့်သွင်းခြင်း

အနည်းဆုံး အောက်ပါအကြောင်းအရာများကို စမ်းသပ်ထားသည့် unit tests များကို `tests/unit/` တွင် ရေးသားပါ-

- Provider စာရင်းသွင်းခြင်း
- Request/response ဘာသာပြန်ပြောင်းလဲခြင်း
- Error ကိုင်တွယ်ခြင်း

---

## Pull Request စစ်ဆေးရန်စာရင်း

- [ ] Tests များ အောင်မြင်သည် (`npm test`)
- [ ] Linting အောင်မြင်သည် (`npm run lint`)
- [ ] Build အောင်မြင်သည် (`npm run build`)
- [ ] Public function နှင့် interface အသစ်များအတွက် TypeScript types များ ထည့်သွင်းထားသည်
- [ ] Hardcoded secrets သို့မဟုတ် fallback values များ မရှိပါ
- [ ] အများသုံး upstream credentials များကို literal များအဖြစ် လုံးဝမထည့်ဘဲ `resolvePublicCred()` မှတစ်ဆင့် ထည့်သွင်းထားသည် ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ကို ကြည့်ပါ)
- [ ] Error response များသည် `buildErrorBody()` / `sanitizeErrorMessage()` ကို ဖြတ်သန်းသည် — response body များထဲတွင် raw stack trace များ မပါဝင်ပါ ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) ကို ကြည့်ပါ)
- [ ] Shell commands (`exec` / `spawn`) များသည် runtime values များကို string interpolation ဖြင့် မဟုတ်ဘဲ `env` မှတစ်ဆင့် ပေးပို့သည်
- [ ] Input အားလုံးကို Zod schemas များဖြင့် အတည်ပြုစစ်ဆေးထားသည်
- [ ] အသုံးပြုသူနှင့် သက်ဆိုင်သော ပြောင်းလဲမှုများအတွက် Changelog **fragment** ကို `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` အောက်တွင် ထည့်သွင်းထားသည် ([`changelog.d/README.md`](./changelog.d/README.md) ကို ကြည့်ပါ) — `CHANGELOG.md` ကို တိုက်ရိုက် **မပြင်ဆင်ပါနှင့်**။ Fragment များကို release လုပ်ချိန်တွင် စုစည်းပြီး PR များအကြား မည်သည့်အခါမျှ conflict မဖြစ်ပါ
- [ ] Documentation ကို အပ်ဒိတ်လုပ်ထားသည် (သက်ဆိုင်ပါက)
- [ ] CodeQL / Secret-Scanning alert အသစ်များ မဖွင့်ထားပါ၊ သို့မဟုတ် alert တစ်ခုချင်းစီကို သက်ဆိုင်ရာ `docs/security/` doc ကို ကိုးကားသည့် နည်းပညာဆိုင်ရာ အကြောင်းပြချက်ဖြင့် ပယ်ဖျက်ထားသည်
- [ ] Child process များကို စတင်သည့် routes (`/api/mcp/`, `/api/cli-tools/runtime/`) ကို `src/server/authz/routeGuard.ts` ရှိ `isLocalOnlyPath()` အဖြစ် အမျိုးအစားသတ်မှတ်ထားသည် — [တင်းကျပ်သော စည်းမျဉ်း #15](docs/security/ROUTE_GUARD_TIERS.md) ကို ကြည့်ပါ
- [ ] Commit message များတွင် `Co-Authored-By` trailers မပါဝင်ပါ — commit များသည် repository ပိုင်ရှင်၏ Git identity တစ်ခုတည်းအောက်တွင်သာ ပေါ်ရမည် (တင်းကျပ်သော စည်းမျဉ်း #16)

---

## ဖြန့်ချိခြင်း

ဖြန့်ချိမှုများကို `/generate-release` workflow မှတစ်ဆင့် စီမံခန့်ခွဲပါသည်။ GitHub Release အသစ်တစ်ခု ဖန်တီးသည့်အခါ package ကို GitHub Actions မှတစ်ဆင့် **npm သို့ အလိုအလျောက် လွှင့်တင်ပါသည်**။

VPS deploy များအတွက် `npm run build` အစား `npm run build:release` ကို အသုံးပြုပါ — ၎င်းသည် အစမှ ပြန်လည် build လုပ်ခြင်း၊ bundle ကို `dist/` အတွင်း စုစည်းခြင်းနှင့် `dist/BUILD_SHA` sentinel ကို ရေးသားခြင်းတို့ကို လုပ်ဆောင်ပါသည်။
ထို့နောက် `dist/` ကို အဝေးရှိ `app/` directory သို့ rsync လုပ်ပေးသည့် `/deploy-vps-*-cc` skills များကို အသုံးပြုပါ။

---

## အကူအညီရယူခြင်း

- **Architecture**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) ကို ကြည့်ပါ
- **API ကိုးကားချက်**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) ကို ကြည့်ပါ
- **လုံခြုံရေးဆိုင်ရာ စာရွက်စာတမ်းများ**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **လုပ်ငန်းလည်ပတ်မှုဆိုင်ရာ စာရွက်စာတမ်းများ**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **ပြဿနာများ**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: ဗိသုကာဆိုင်ရာ ဆုံးဖြတ်ချက်မှတ်တမ်းများအတွက် `docs/adr/` ကို ကြည့်ပါ
