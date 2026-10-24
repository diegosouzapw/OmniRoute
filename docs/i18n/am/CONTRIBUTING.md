# Contributing to OmniRoute (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

ለማበርከት ፍላጎት ስላሳዩ እናመሰግናለን! ይህ መመሪያ ለመጀመር የሚያስፈልግዎትን ሁሉ ይሸፍናል።

ለእያንዳንዱ ለውጥ ይፋዊ የሥራ ፍሰት፣ በ
[የአስተዋጽኦ ወርቃማ መንገድ](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) ይጀምሩ። ይህም provider፣ routing፣
UI/UX፣ i18n፣ CLI፣ database እና build/deploy ለውጦችን ከውሎቻቸው፣ ከተኮሩ ሙከራዎች፣ ከCI
ሽፋን እና ከማስታረቅ ደረጃዎች ጋር ያዛምዳል።

---

## የልማት ዝግጅት

### ቅድመ ሁኔታዎች

- **Node.js** `>=22.22.2 <23`፣ ወይም `>=24.0.0 <27` (የሚመከር፦ 24 LTS)
- **npm** 10+

> **የnpm v11+ ተጠቃሚዎች (Node 24+)፦** `npm install`ን ካስኬዱ በኋላ ኔቲቭ ሞጁሎች መጫናቸውን ያረጋግጡ፦
> `node -e "require('better-sqlite3')"`. በ`MODULE_NOT_FOUND` ካልተሳካ፣
> `npm approve-scripts better-sqlite3 && npm install`ን ያስኪዱ።
> [ችግር መፍቻ](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)ን ይመልከቱ።

- **Git**

### ክሎን ማድረግ እና መጫን

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### የአካባቢ ተለዋዋጮች

```bash
# .envዎን ከአብነቱ ይፍጠሩ
cp .env.example .env

# አስፈላጊ ምስጢሮችን ይፍጠሩ
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

ለልማት ቁልፍ ተለዋዋጮች፦

| ተለዋዋጭ                  | ነባሪ የልማት እሴት             | መግለጫ                |
| ---------------------- | ------------------------ | ------------------- |
| `PORT`                 | `20128`                  | የሰርቨር ወደብ           |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | የፍሮንትኤንድ መሠረታዊ URL  |
| `JWT_SECRET`           | (ከላይ ይፍጠሩ)               | የJWT ፊርማ ምስጢር       |
| `INITIAL_PASSWORD`     | `CHANGEME`               | የመጀመሪያ መግቢያ የይለፍ ቃል |
| `APP_LOG_LEVEL`        | `info`                   | የሎግ ዝርዝርነት ደረጃ      |

### የዳሽቦርድ ቅንብሮች

ዳሽቦርዱ በአካባቢ ተለዋዋጮችም ሊዋቀሩ ለሚችሉ ባህሪያት የUI ማብሪያና ማጥፊያዎችን ያቀርባል፦

| የቅንብር ቦታ      | ማብሪያና ማጥፊያ   | መግለጫ                    |
| ------------- | ------------ | ----------------------- |
| ቅንብሮች → የላቀ   | የማረሚያ ሁነታ    | የማረሚያ ጥያቄ ሎጎችን አንቃ (UI) |
| ቅንብሮች → አጠቃላይ | የጎን አሞሌ ታይነት | የጎን አሞሌ ክፍሎችን አሳይ/ደብቅ   |

እነዚህ ቅንብሮች በውሂብ ጎታው ውስጥ ይቀመጣሉ፣ እንደገና ከተጀመረም በኋላ ይቆያሉ፤ ሲዋቀሩም የአካባቢ ተለዋዋጭ ነባሪ እሴቶችን ይተካሉ።

### በአካባቢያዊ ሁኔታ ማስኬድ

```bash
# የልማት ሁነታ (በቀጥታ እንደገና መጫን)
npm run dev

# የምርት ግንባታ
npm run build    # next build → .build/next/ ከዚያ assembleStandalone → dist/
npm run start

# ለአስተዋጽኦ አቅራቢ ለውጦች ፈጣን የባክኤንድ/API-ብቻ ማጠናቀር
npm run build:contributor

# የልቀት ግንባታ (ንጹሕ ዳግም ግንባታ + HEAD ጠቋሚ — ለማሰማራት አስፈላጊ)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHAን ይጽፋል

# የተለመደ የወደብ ውቅር
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

የአስተዋጽኦ አቅራቢው ግንባታ የማጠናቀር-ብቻ ማረጋገጥን ያከናውናል፦ ራሱን የቻለውን
ስርጭት አያዘጋጅም፣ እንዲሁም አማራጭ የኔቲቭ ማሸጊያ ንብረቶችን አይገነባም። ለመላክ ዝግጁ የሆነውን ጥቅል
ማረጋገጥ ሲያስፈልግዎ መደበኛውን የምርት ግንባታ ይጠቀሙ።

### የግንባታ ውጤት አቀማመጥ

| ማውጫ       | ይዘቶች                                                                   | በGit የሚከታተል |
| --------- | ---------------------------------------------------------------------- | ----------- |
| `src/`    | የመተግበሪያ ምንጭ (TypeScript / TSX)                                         | አዎ          |
| `.build/` | መካከለኛ ውጤቶች — የ`next build` ውጤት (በgit ችላ የተባለ፣ `distDir = .build/next`) | አይ          |
| `dist/`   | ለመላክ ዝግጁ የሆነ ጥቅል — በ`assembleStandalone` የተዘጋጀ (በgit ችላ የተባለ)          | አይ          |

የግንባታ የሥራ ሂደቱ ነጠላ ዙር ነው፦

```
npm run build
  └─ next build → .build/next/standalone  (የNext.js ውጤት)
  └─ assembleStandalone()                 (ራሱን የቻለውን + ስታቲክ + ይፋዊ + ኔቲቭ ንብረቶችን ይቀዳል)
       └─ ውጤት፦ dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` በተጨማሪም መጀመሪያ ሁለቱንም ማውጫዎች ያጸዳል፣ እና
`dist/BUILD_SHA`ን (= `git rev-parse --short HEAD`) እንደ የማሰማራት ትክክለኛነት ጠቋሚ ይጽፋል።

`npm run build:contributor` የባክኤንድ-ብቻ ግንባታ መገለጫውን ይጠቀማል። በግንባታ ጊዜ
የዳሽቦርድ UI ፋይሎችን በጊዜያዊነት በተተኪ ይቀይራል፣ የAPI መስመር አስተናጋጆችን ያቆያል፣ እና ከግንባታው በኋላ
ዋናዎቹን ፋይሎች ይመልሳል። የዳሽቦርድ UIን ለሚነኩ ለውጦች ወይም ለሙሉ
የልቀት ማረጋገጫ `npm run build`ን ይጠቀሙ፤ የአስተዋጽኦ አቅራቢው መገለጫ የልቀት ግንባታውን አይተካም።

> **የVPS ማሰማራት ማስታወሻ፦** የርቀት ምስል ማውጫ `/usr/lib/node_modules/omniroute/app/`
> አልተቀየረም። የማሰማራት ክህሎቶቹ የ`dist/`ን ይዘቶች ወደዚያ rsync ያደርጋሉ።
> የተቀየረው በማከማቻው ውስጥ ያለው የግንባታ ውጤት ዱካ ብቻ ነው (`app/` → `dist/`)።

ነባሪ URLs፦

- **ዳሽቦርድ**፦ `http://localhost:20128/dashboard`
- **API**፦ `http://localhost:20128/v1`

---

## የGit የሥራ ፍሰት

> ⚠️ **በፍጹም በቀጥታ ወደ `main` commit አታድርጉ።** ሁልጊዜ feature branch-ዎችን ይጠቀሙ።
>
> **የPR base:** ንቁውን `release/vX.Y.Z` branch (`main`ን ሳይሆን) ዒላማ ያድርጉ። ስለ
> release-per-branch + tag-at-ship ሞዴል
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md)ን ይመልከቱ።

```bash
# ከንቁው release ጫፍ branch ይፍጠሩ (ምሳሌ፦ release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... ለውጦችን ያድርጉ ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 የሆነ Pull Request ይክፈቱ
```

### የBranch አሰያየም

| Prefix      | ዓላማ                  |
| ----------- | -------------------- |
| `feat/`     | አዳዲስ ባህሪያት           |
| `fix/`      | የስህተት ማስተካከያዎች       |
| `refactor/` | የኮድ መዋቅር ማሻሻያ        |
| `docs/`     | የሰነድ ለውጦች            |
| `test/`     | የሙከራ ጭማሪዎች/ማስተካከያዎች  |
| `chore/`    | መሣሪያዎች፣ CI፣ ጥገኛ ጥቅሎች |

### የCommit መልዕክቶች

[Conventional Commits](https://www.conventionalcommits.org/)ን ይከተሉ፦

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scopes (v3.8)፦ `db`፣ `sse`፣ `oauth`፣ `dashboard`፣ `api`፣ `cli`፣ `docker`፣ `ci`፣ `mcp`፣ `a2a`፣ `memory`፣ `skills`፣ `cloud-agent`፣ `guardrails`፣ `compression`፣ `auto-combo`፣ `resilience`፣ `providers`፣ `executors`፣ `translator`፣ `domain`፣ `authz`።

---

## ሙከራዎችን ማስኬድ

```bash
# ሁሉም ሙከራዎች (unit + vitest + ecosystem + e2e)
npm run test:all

# አንድ የሙከራ ፋይል (የNode.js ቤተኛ test runner — አብዛኞቹ ሙከራዎች ይህን ይጠቀማሉ)
node --import tsx/esm --test tests/unit/your-file.test.ts

# በለውጥዎ የተነኩት unit tests ብቻ (ከCI gate ጋር ተመሳሳይ TIA selector፣ #8084)
npm run test:scoped            # በመጨረሻው commit (ወይም በworking tree) ውስጥ ያሉ ለውጦች
npm run test:scoped:staged     # staged ለውጦች ብቻ — ከpre-commit ማስኬድ ጋር በሚገባ ይጣመራል
npm run test:scoped:full       # በመጀመሪያ import-graph mapን እንደገና ይገነባል (ፋይሎችን ካከሉ/ካንቀሳቀሱ በኋላ)
# Exit 1 + "run the full suite" ማለት hub file (tsconfig፣ package.json፣ …) ወይም
# unmapped source ተለውጧል ማለት ነው — selector በደህንነት ሁኔታ ይወድቃል፤ በጭራሽ ያለማሳወቅ አይዘልም።

# Vitest (MCP server፣ autoCombo፣ cache)
npm run test:vitest

# E2E ሙከራዎች (Playwrightን ይፈልጋል)
npm run test:e2e

# የProtocol clients E2E (MCP transports፣ A2A)
npm run test:protocols:e2e

# የEcosystem ተኳኋኝነት ሙከራዎች
npm run test:ecosystem

# የCoverage gate፦ 60% statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Lint + የቅርጸት ማረጋገጫ
npm run lint
npm run check

# Gated real-upstream combo smoke (የVPS መዳረሻ + የእውነተኛ provider credits ይፈልጋል)
# እውነተኛ providersን ይጠቀማል — ትንሽ ወጪ አለው። በCI ውስጥ በፍጹም አይሰራም። gate ከሌለ በአግባቡ ይዘላል።
# የሚያስፈልገው፦ ssh root@192.168.0.15 መዳረሻ (ከVPS የread-only DB snapshot ይጭናል)።
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — ተራ Node ESM scripts፤ live .15 serverን በቀጥታ ይጠቀማሉ።
# የሚያስፈልገው፦ ssh root@192.168.0.15 መዳረሻ (combos በSSH sqlite በኩል ይፈጠራሉ/ይወገዳሉ)።
# እውነተኛ providersን ይጠቀማል (አነስተኛ ወጪ)። __live_test__* combosን ብቻ ይፈጥራል/ይሰርዛል። በCI ውስጥ በፍጹም አይሰራም።
# REQUIRE_API_KEY=false በ.15 ላይ ስለሆነ API key አያስፈልግም፤ ነገር ግን COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY ከተዋቀሩ ያከብራቸዋል።
npm run test:combo:live:vps              # 7 HTTP scenarios (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # እውነተኛ cross-provider failover scenario ይጨምራል (በድምሩ 8)
```

የCoverage ማስታወሻዎች፦

- `npm run test:coverage` ለዋናው unit test suite የsource coverageን ይለካል፣ `tests/**`ን ያስወግዳል፣ እና `open-sse/**`ን ያካትታል
- Pull requests የcoverage gateን በ**60%+** statements/lines/functions/branches ማቆየት አለባቸው
- PR በ`src/`፣ `open-sse/`፣ `electron/`፣ ወይም `bin/` ውስጥ ያለ production codeን ከለወጠ፣ በዚያው PR ውስጥ automated testsን ማከል ወይም ማዘመን አለበት
- `npm run coverage:report` ከቅርብ ጊዜው coverage run የተገኘውን ዝርዝር የፋይል-በ-ፋይል ሪፖርት ያትማል
- `npm run test:coverage:legacy` ለታሪካዊ ንጽጽር የቀድሞውን metric ይጠብቃል
- ደረጃ በደረጃ የcoverage ማሻሻያ roadmapን ለማየት `docs/ops/COVERAGE_PLAN.md`ን ይመልከቱ

### የPull Request መስፈርቶች

PR ከመክፈትዎ በፊት፣ ለለወጡት ነገር ያተኮረውን loop ለማስኬድ
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md)ን ይጠቀሙ። ሙሉው unit suite (4 CI shards)፣ Vitest፣ **60%+** coverage gate፣ እና
production build የCI ኃላፊነት ናቸው — እነዚህን በአካባቢዎ ማስኬድ PR checks አስቀድመው ከሚሰጡት ውጭ ተጨማሪ መረጃ አይሰጥም፣ እና አነስተኛ ማሽኖች ላይ hostን ሊያጨናንቅ ይችላል (#8084)፦

- ለውጥዎን የሚሸፍኑ የሙከራ ፋይሎችን ያስኪዱ፦ `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint`ን ያስኪዱ
- production code በተለወጠ ቁጥር automated testsን በዚያው PR ውስጥ ያካትቱ ወይም ያዘምኑ
- production code ሲለወጥ የተለወጡትን ወይም የታከሉትን የሙከራ ፋይሎች በPR መግለጫ ውስጥ ያካትቱ
- የproject secrets በCI ውስጥ ሲዋቀሩ በPR ላይ ያለውን የSonarQube ውጤት ያረጋግጡ

የአሁኑ የሙከራ ሁኔታ፦ **122 unit test files** የሚከተሉትን ይሸፍናሉ፦

- የProvider translators እና የቅርጸት ልወጣ
- Rate limiting፣ circuit breaker፣ እና resilience
- Semantic cache፣ idempotency፣ እና progress tracking
- የDatabase operations እና schema (21 DB modules)
- OAuth flows እና authentication
- የAPI endpoint validation (Zod v4)
- የMCP server tools እና scope enforcement
- የMemory እና Skills systems

---

## የኮድ ዘይቤ

- **ESLint** — commit ከማድረግዎ በፊት `npm run lint` ያሂዱ
- **Prettier** — commit ሲደረግ በ`lint-staged` በኩል በራስ-ሰር ቅርጸት ይሰጠዋል (2 ክፍተቶች፣ ሴሚኮሎኖች፣ ድርብ ጥቅሶች፣ የ100 ቁምፊ ስፋት፣ es5 ተከታይ ኮማዎች)
- **TypeScript** — ሁሉም የ`src/` ኮድ `.ts`/`.tsx` ይጠቀማል፤ `open-sse/` `.ts`/`.js` ይጠቀማል፤ በTSDoc (`@param`፣ `@returns`፣ `@throws`) ይመዝግቡ
- **`eval()` አይጠቀሙ** — ESLint `no-eval`፣ `no-implied-eval`፣ `no-new-func`ን ያስገድዳል
- **የZod ማረጋገጫ** — ለሁሉም የAPI ግብዓት ማረጋገጫዎች የZod v4 ንድፎችን ይጠቀሙ
- **ስያሜ**፦ ፋይሎች = camelCase/kebab-case፣ ኮምፖነንቶች = PascalCase፣ ቋሚዎች = UPPER_SNAKE

### የስህተት አያያዝ / ባዶ catch ብሎኮች

አንድን `catch` ያለማብራሪያ ፈጽሞ አይተዉ። ከሁለት ምድቦች በአንዱ ይመድቡት (ይህም
“SSE ዥረቶች ውስጥ ስህተቶችን በዝምታ ፈጽሞ አትውጡ” የሚለውን ጥብቅ ደንብ ተግባራዊ ያደርጋል)፦

- **ሆን ተብሎ የተደረገ (የራሳችን ምርጥ-ጥረት ማጽዳት/ቴሌሜትሪ)** — እዚህ ያለ ውድቀት የሚጠበቅ እና
  ጉዳት የሌለው ነው፤ የአንድ መስመር የምክንያት አስተያየት ያክሉ፣ ሎግ አያድርጉ (በእያንዳንዱ ጥያቄ ላይ ሎግ ማድረግ
  ይህ ልማድ ሊያስወግደው የሚፈልገው ጫጫታ ነው)።

  ```ts
  } catch {} // ደንበኛው ግንኙነቱን ካቋረጠ በኋላ አስቀድሞ የተዘጋ controllerን መዝጋት የሚጠበቅ ነው
  ```

- **ሎግ መደረግ ያለበት (ውጫዊ/በጠሪው የቀረበ ኮድ፣ ወይም ስህተቱን ማውጣት የቁጥጥር ፍሰቱን ሲቀይር)** — `catch`ን
  ያቆዩት (ዥረቱን እንዲያቋርጥ ፈጽሞ አይፍቀዱለት)፣ ነገር ግን ውድቀቱ ሊገኝ እንዲችል አውዳዊ `console.debug`/`warn` ያውጡ።

  ```ts
  } catch (e) {
    console.debug("[STREAM] የonFailure callback ስህተት፦", e);
  }
  ```

ለተተገበሩ ምሳሌዎች `open-sse/utils/stream.ts`ን እና `open-sse/utils/streamHandler.ts`ን ይመልከቱ።

---

## የፕሮጀክቱ መዋቅር

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # የዳሽቦርድ ገጾች (23 ክፍሎች)
│   ├── api/                # API መስመሮች (51 ማውጫዎች)
│   └── login/              # የማረጋገጫ ገጾች (.tsx)
├── domain/                 # የፖሊሲ ሞተር (policyEngine, comboResolver, costRules, ወዘተ.)
├── lib/                    # ዋና የንግድ ሎጂክ (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 ፕሮቶኮል አገልጋይ
│   ├── acp/                # Agent Communication Protocol መዝገብ
│   ├── compliance/         # የተገዢነት ፖሊሲ ሞተር
│   ├── db/                 # SQLite የጎራ ሞጁሎች + 130 ሽግግሮች
│   ├── memory/             # ቋሚ የውይይት ማህደረ ትውስታ
│   ├── oauth/              # OAuth አቅራቢዎች፣ አገልግሎቶች እና መገልገያዎች
│   ├── skills/             # ሊሰፋ የሚችል የክህሎት ማዕቀፍ
│   ├── usage/              # የአጠቃቀም ክትትል እና የወጪ ስሌት
│   └── localDb.ts          # እንደገና ወደ ውጭ የመላኪያ ንብርብር ብቻ — እዚህ ሎጂክ ፈጽሞ አይጨምሩ
├── middleware/              # የጥያቄ middleware (promptInjectionGuard)
├── mitm/                   # MITM ፕሮክሲ (የምስክር ወረቀት፣ DNS፣ የመዳረሻ ማዘዋወር)
├── shared/
│   ├── components/         # React ኮምፖነንቶች (.tsx)
│   ├── constants/          # የአቅራቢ ትርጓሜዎች (329)፣ MCP ወሰኖች፣ 21 የማዘዋወር ስልቶች
│   ├── utils/              # የወረዳ መቋረጫ፣ ማጽጃ፣ የማረጋገጫ ረዳቶች
│   └── validation/         # Zod v4 ንድፎች
└── sse/                    # SSE የፕሮክሲ ቧንቧ መስመር

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 150 የአስፈጻሚ ሞጁሎች (የአስፈጻሚ ክፍሎች + የእያንዳንዱ አቅራቢ ረዳቶች)
├── handlers/               # 11 የጥያቄ ተቆጣጣሪዎች (ውይይት፣ ምላሾች፣ መክተቻዎች፣ ምስሎች፣ ወዘተ.)
├── mcp-server/             # MCP አገልጋይ (110 ልዩ መሣሪያዎች፣ 3 ማጓጓዣዎች፣ 33 ወሰኖች)
├── services/               # 178 ከፍተኛ-ደረጃ አገልግሎቶች (combo, autoCombo, rateLimitManager, ወዘተ.)
├── translator/             # የቅርጸት ተርጓሚዎች (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API ቀያሪ
└── utils/                  # 22 የመገልገያ ሞጁሎች (ዥረት፣ TLS፣ ፕሮክሲ፣ ምዝግብ ማስቀመጥ)

electron/                   # Electron የዴስክቶፕ መተግበሪያ (መድረክ-ተሻጋሪ)

tests/
├── unit/                   # Node.js የሙከራ አስኪያጅ (1,574 የሙከራ ፋይሎች)
├── integration/            # የውህደት ሙከራዎች
├── e2e/                    # Playwright ሙከራዎች
├── security/               # የደህንነት ሙከራዎች
├── translator/             # ተርጓሚ-ተኮር ሙከራዎች
└── load/                   # የጭነት ሙከራዎች

docs/
├── adr/                     # የሥነ-ሕንፃ ውሳኔ መዝገቦች
├── architecture/            # የስርዓት ሥነ-ሕንፃ እና የመቋቋም ችሎታ
├── comparison/              # OmniRoute ከአማራጮች ጋር ንጽጽር
├── compression/             # የመጭመቂያ መመሪያዎች እና ደንቦች
├── dev/                     # የልማት መመሪያዎች
├── diagrams/                # የሥነ-ሕንፃ ሥዕላዊ መግለጫዎች
├── frameworks/              # MCP፣ A2A፣ OpenCode፣ Memory፣ Skills
├── guides/                  # የተጠቃሚ መመሪያ፣ Docker፣ ማዋቀር፣ መላ መፈለግ
├── i18n/                    # ዓለም አቀፋዊ የተደረጉ README ትርጉሞች
├── marketing/               # የግብይት ቁሳቁሶች
├── ops/                     # ማሰማራት፣ ፕሮክሲ፣ ሽፋን፣ ልቀቶች
├── providers/               # አቅራቢ-ተኮር ሰነዶች
├── reference/               # API ማጣቀሻ፣ የአካባቢ ተለዋዋጮች፣ CLI መሣሪያዎች፣ ነጻ ደረጃዎች
├── releases/                # የልቀት ማስታወሻዎች
├── routing/                 # ራስ-ሰር የጥምረት ሞተር፣ የምክንያታዊነት ድጋሚ ማጫወት
├── screenshots/             # የዳሽቦርድ ቅጽበታዊ ገጽ ዕይታዎች
├── security/                # የመከላከያ ገደቦች፣ ተገዢነት፣ ስውርነት፣ ቶከኖች
└── specs/                   # የንድፍ ዝርዝር መስፈርቶች
```

---

## አዲስ አቅራቢ ማከል

### ደረጃ 1፦ የአቅራቢ ቋሚዎችን ይመዝግቡ

ወደ `src/shared/constants/providers.ts` ያክሉ — ሞጁሉ ሲጫን በZod የሚረጋገጥ።

### ደረጃ 2፦ Executor ያክሉ (ብጁ ሎጂክ ካስፈለገ)

መሠረታዊውን executor የሚያራዝም executor በ`open-sse/executors/your-provider.ts` ውስጥ ይፍጠሩ።

### ደረጃ 3፦ Translator ያክሉ (OpenAI ያልሆነ ቅርጸት ከሆነ)

የጥያቄ/ምላሽ translators በ`open-sse/translator/` ውስጥ ይፍጠሩ።

### ደረጃ 4፦ OAuth ውቅር ያክሉ (በOAuth ላይ የተመሠረተ ከሆነ)

የOAuth ማረጋገጫ መረጃዎችን በ`src/lib/oauth/constants/oauth.ts` እና serviceን በ`src/lib/oauth/services/` ውስጥ ያክሉ።

የላይኛው አቅራቢ ይፋዊ OAuth client_id/secret ወይም Firebase Web API keyን በይፋዊ CLI / browser bundle ውስጥ የሚያሰራጭ ከሆነ፣ **እንደ string literal አያካትቱት**። `resolvePublicCred()`ን ከ`open-sse/utils/publicCreds.ts` ይጠቀሙ እና የተሸፈነ byte entry ወደ `EMBEDDED_DEFAULTS` ያክሉ። ሙሉው አስገዳጅ የሥራ ፍሰት በ[`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ውስጥ ተመዝግቧል።

በhandlers/executors ውስጥ፣ client የሚደርሱ የስህተት መልዕክቶች በ`buildErrorBody()` / `sanitizeErrorMessage()` ከ`open-sse/utils/error.ts` ማለፍ አለባቸው — ጥሬ `err.stack` ወይም `err.message`ን በResponse body ውስጥ ፈጽሞ አያስቀምጡ። [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)ን ይመልከቱ።

### ደረጃ 5፦ Modelsን ይመዝግቡ

የmodel ትርጓሜዎችን በ`open-sse/config/providerRegistry.ts` ውስጥ ያክሉ።

### ደረጃ 6፦ Tests ያክሉ

ቢያንስ የሚከተሉትን የሚሸፍኑ unit tests በ`tests/unit/` ውስጥ ይጻፉ፦

- የአቅራቢ ምዝገባ
- የጥያቄ/ምላሽ ትርጉም
- የስህተት አያያዝ

---

## የPull Request ማረጋገጫ ዝርዝር

- [ ] ሙከራዎች ያልፋሉ (`npm test`)
- [ ] Linting ያልፋል (`npm run lint`)
- [ ] Build ይሳካል (`npm run build`)
- [ ] ለአዲስ ይፋዊ functions እና interfaces የTypeScript types ታክለዋል
- [ ] Hardcoded secrets ወይም fallback values የሉም
- [ ] ይፋዊ upstream credentials በ`resolvePublicCred()` በኩል ተካትተዋል ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ይመልከቱ)፤ በፍጹም እንደ literals አልተጻፉም
- [ ] የስህተት ምላሾች በ`buildErrorBody()` / `sanitizeErrorMessage()` በኩል ያልፋሉ — በምላሽ bodies ውስጥ raw stack traces የሉም ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) ይመልከቱ)
- [ ] Shell commands (`exec` / `spawn`) የruntime valuesን በstring interpolation ሳይሆን በ`env` በኩል ያስተላልፋሉ
- [ ] ሁሉም inputs በZod schemas ተረጋግጠዋል
- [ ] በተጠቃሚ ላይ ለሚታዩ ለውጦች የChangelog **fragment** በ`changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` ስር ታክሏል ([`changelog.d/README.md`](./changelog.d/README.md) ይመልከቱ) — `CHANGELOG.md`ን በቀጥታ **አርትዕ አያድርጉ**፤ fragments በrelease ጊዜ ይሰባሰባሉ እና በPRs መካከል በፍጹም አይጋጩም
- [ ] Documentation ዘምኗል (አስፈላጊ ከሆነ)
- [ ] አዲስ CodeQL / Secret-Scanning alerts አልተከፈቱም፣ ወይም እያንዳንዳቸው ተዛማጅ `docs/security/` docን በሚጠቅስ ቴክኒካዊ ምክንያት ውድቅ ተደርገዋል
- [ ] Child processes የሚጀምሩ routes (`/api/mcp/`, `/api/cli-tools/runtime/`) በ`src/server/authz/routeGuard.ts` ውስጥ እንደ `isLocalOnlyPath()` ተመድበዋል — [ጥብቅ ደንብ #15](docs/security/ROUTE_GUARD_TIERS.md)ን ይመልከቱ
- [ ] በcommit messages ውስጥ የAI/bot `Co-authored-by` trailers የሉም (ጥብቅ ደንብ #16) — ሥራቸው እንደገና ጥቅም ላይ የዋለ ሰብዓዊ collaborators በመደበኛ `Co-authored-by: Name <email>` trailers እውቅና ያገኛሉ

---

## ልቀት ማውጣት

ልቀቶች በ`/generate-release` የሥራ ሂደት ይተዳደራሉ። አዲስ GitHub Release ሲፈጠር፣ ፓኬጁ በGitHub Actions አማካኝነት **በራስ-ሰር ወደ npm ይታተማል**።

ለVPS ማሰማራቶች፣ `npm run build:release`ን (`npm run build`ን ሳይሆን) ይጠቀሙ — ሙሉ ንጹሕ
ዳግም ግንባታ ያከናውናል፣ ጥቅሉን በ`dist/` ውስጥ ያዘጋጃል፣ እንዲሁም የ`dist/BUILD_SHA` ምልክት ፋይልን ይጽፋል።
ከዚያ `dist/`ን ወደ ርቀት የ`app/` ማውጫ rsync የሚያደርጉትን የ`/deploy-vps-*-cc` ክህሎቶች ይጠቀሙ።

---

## እገዛ ማግኘት

- **አርክቴክቸር**፦ [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)ን ይመልከቱ
- **የAPI ማጣቀሻ**፦ [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)ን ይመልከቱ
- **የደህንነት ሰነዶች**፦ [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md)፣ [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md)፣ [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md)፣ [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **የክወና ሰነዶች**፦ [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **ችግሮች**፦ [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
