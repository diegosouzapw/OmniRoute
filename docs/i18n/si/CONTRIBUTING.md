# Contributing to OmniRoute (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

දායක වීමට ඔබ දක්වන උනන්දුවට ස්තුතියි! ආරම්භ කිරීමට ඔබට අවශ්ය සියල්ල මෙම මාර්ගෝපදේශය ආවරණය කරයි.

එක් එක් වෙනස්කම සඳහා වන නිල කාර්ය ප්රවාහය සඳහා,
[දායකත්ව ප්රධාන මාර්ගය](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) වෙතින් ආරම්භ කරන්න. එය provider, routing,
UI/UX, i18n, CLI, database, සහ build/deploy වෙනස්කම් ඒවායේ ගිවිසුම්, ඉලක්කගත පරීක්ෂණ, CI
ආවරණය, සහ ප්රතිසන්ධාන පියවර සමඟ සිතියම්ගත කරයි.

---

## සංවර්ධන සැකසුම

### පූර්ව අවශ්යතා

- **Node.js** `>=22.22.3 <23`, හෝ `>=24.0.0 <27` (නිර්දේශිත: 24 LTS)
- **npm** 10+

> **npm v11+ පරිශීලකයන් (Node 24+):** `npm install` ධාවනය කිරීමෙන් පසු, native modules ස්ථාපනය වී ඇති බව තහවුරු කරන්න:
> `node -e "require('better-sqlite3')"`. එය `MODULE_NOT_FOUND` සමඟ අසාර්ථක වුවහොත්,
> `npm approve-scripts better-sqlite3 && npm install` ධාවනය කරන්න. බලන්න
> [දෝෂ නිරාකරණය](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Clone කිරීම සහ ස්ථාපනය

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### පරිසර විචල්ය

```bash
# අච්චුවෙන් ඔබගේ .env ගොනුව සාදන්න
cp .env.example .env

# අවශ්ය රහස් ජනනය කරන්න
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

සංවර්ධනය සඳහා ප්රධාන විචල්ය:

| විචල්යය                | සංවර්ධන පෙරනිමිය         | විස්තරය                    |
| ---------------------- | ------------------------ | -------------------------- |
| `PORT`                 | `20128`                  | සේවාදායක port එක           |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | frontend සඳහා මූලික URL එක |
| `JWT_SECRET`           | (ඉහත ජනනය කරන්න)         | JWT අත්සන් කිරීමේ රහස      |
| `INITIAL_PASSWORD`     | `CHANGEME`               | පළමු පිවිසුම් මුරපදය       |
| `APP_LOG_LEVEL`        | `info`                   | log විස්තරාත්මක මට්ටම      |

### Dashboard සැකසුම්

පරිසර විචල්ය හරහා ද වින්යාස කළ හැකි විශේෂාංග සඳහා dashboard එක UI toggles සපයයි:

| සැකසුම පිහිටි ස්ථානය | Toggle එක          | විස්තරය                              |
| -------------------- | ------------------ | ------------------------------------ |
| Settings → Advanced  | Debug Mode         | debug ඉල්ලීම් logs සක්රිය කරන්න (UI) |
| Settings → General   | Sidebar Visibility | sidebar කොටස් පෙන්වන්න/සඟවන්න        |

මෙම සැකසුම් database එකේ ගබඩා වන අතර නැවත ආරම්භ කිරීම් අතරතුර ද පවතිමින්, සකසා ඇති විට env var පෙරනිමි අගයන් අභිබවා යයි.

### දේශීයව ධාවනය කිරීම

```bash
# සංවර්ධන ප්රකාරය (hot reload)
npm run dev

# නිෂ්පාදන build එක
npm run build    # next build → .build/next/ ඉන්පසු assembleStandalone → dist/
npm run start

# දායක වෙනස්කම් සඳහා වේගවත් backend/API-පමණක් compile කිරීම
npm run build:contributor

# නිකුතු build එක (පිරිසිදු නැවත build කිරීම + HEAD sentinel — deploy සඳහා අවශ්යයි)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA ලියයි

# පොදු port වින්යාසය
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

දායක build එක compile-පමණක් වලංගුකරණය සිදු කරයි: එය standalone
බෙදාහැරීම එකලස් කිරීම හෝ විකල්ප native packaging assets build කිරීම සිදු නොකරයි. බෙදාහැරිය හැකි bundle එක
වලංගු කිරීමට අවශ්ය විට සාමාන්ය නිෂ්පාදන build එක භාවිත කරන්න.

### Build ප්රතිදාන සැලැස්ම

| නාමාවලිය  | අන්තර්ගතය                                                                     | නිරීක්ෂණය කෙරේද |
| --------- | ----------------------------------------------------------------------------- | --------------- |
| `src/`    | යෙදුම් source එක (TypeScript / TSX)                                           | ඔව්             |
| `.build/` | අතරමැදි ගොනු — `next build` ප්රතිදානය (gitignored, `distDir = .build/next`)   | නැත             |
| `dist/`   | බෙදාහැරිය හැකි bundle එක — `assembleStandalone` මඟින් එකලස් කෙරේ (gitignored) | නැත             |

Build pipeline එක එක් වටයකි:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js ප්රතිදානය)
  └─ assembleStandalone()                 (standalone + static + public + native assets පිටපත් කරයි)
       └─ ප්රතිදානය: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` අමතරව පළමුව නාමාවලි දෙකම පිරිසිදු කර,
deploy අඛණ්ඩතා sentinel එකක් ලෙස `dist/BUILD_SHA` (= `git rev-parse --short HEAD`) ලියයි.

`npm run build:contributor` backend-පමණක් build profile එක භාවිත කරයි. එය build කරන අතරතුර
dashboard UI ගොනු තාවකාලිකව stub කර, API route handlers තබාගෙන, build එකෙන් පසු මුල් ගොනු
ප්රතිසාධනය කරයි. dashboard UI එකට බලපාන වෙනස්කම් සඳහා හෝ සම්පූර්ණ
නිකුතු වලංගුකරණය සඳහා `npm run build` භාවිත කරන්න; දායක profile එක නිකුතු build එක වෙනුවට භාවිත කළ නොහැක.

> **VPS deploy සටහන:** දුරස්ථ image නාමාවලිය `/usr/lib/node_modules/omniroute/app/`
> වෙනස් වී නොමැත. deploy skills මඟින් `dist/` හි අන්තර්ගතය එයට rsync කරයි.
> repository එක තුළ ඇති build ප්රතිදාන path එක පමණක් වෙනස් විය (`app/` → `dist/`).

පෙරනිමි URLs:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git කාර්ය ප්රවාහය

> ⚠️ **කිසිවිටෙකත් සෘජුව `main` වෙත commit නොකරන්න.** සෑමවිටම feature branches භාවිත කරන්න.
>
> **PR පදනම:** සක්රිය `release/vX.Y.Z` branch එක ඉලක්ක කරන්න (`main` නොවේ).
> එක්-branch-එකකට-release + නිකුත් කිරීමේදී-tag යෙදීමේ ආකෘතිය සඳහා
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) බලන්න.

```bash
# සක්රිය release අග්රයෙන් branch එක සාදන්න (උදාහරණය: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... වෙනස්කම් සිදු කරන්න ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 ලෙස Pull Request එකක් විවෘත කරන්න
```

### Branch නම් කිරීම

| Prefix      | අරමුණ                             |
| ----------- | --------------------------------- |
| `feat/`     | නව විශේෂාංග                       |
| `fix/`      | දෝෂ නිවැරදි කිරීම්                |
| `refactor/` | කේතය ප්රතිව්යුහගත කිරීම           |
| `docs/`     | ලේඛන වෙනස්කම්                     |
| `test/`     | පරීක්ෂණ එක් කිරීම්/නිවැරදි කිරීම් |
| `chore/`    | මෙවලම්, CI, dependencies          |

### Commit පණිවිඩ

[Conventional Commits](https://www.conventionalcommits.org/) අනුගමනය කරන්න:

```
feat: provider ඇමතුම් සඳහා circuit breaker එකක් එක් කරන්න
fix: JWT secret සත්යාපනයේ අන්ත අවස්ථාව විසඳන්න
docs: PII ආරක්ෂාව සමඟ SECURITY.md යාවත්කාලීන කරන්න
test: observability unit tests එක් කරන්න
refactor(db): rate limit වගු ඒකාබද්ධ කරන්න
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## පරීක්ෂණ ධාවනය කිරීම

```bash
# සියලුම පරීක්ෂණ (unit + vitest + ecosystem + e2e)
npm run test:all

# තනි පරීක්ෂණ ගොනුවක් (Node.js ස්වදේශීය test runner — බොහෝ පරීක්ෂණ මෙය භාවිත කරයි)
node --import tsx/esm --test tests/unit/your-file.test.ts

# ඔබේ වෙනසෙන් බලපෑමට ලක්වූ unit tests පමණක් (CI gate එකේ ඇති TIA selector එකමයි, #8084)
npm run test:scoped            # අවසන් commit එකේ (හෝ working tree එකේ) වෙනස්කම්
npm run test:scoped:staged     # staged වෙනස්කම් පමණයි — pre-commit ධාවනයක් සමඟ හොඳින් ගැළපේ
npm run test:scoped:full       # පළමුව import-graph සිතියම නැවත ගොඩනඟන්න (ගොනු එක් කිරීමෙන්/ගෙනයාමෙන් පසු)
# Exit 1 + "run the full suite" යන්නෙන් අදහස් වන්නේ hub ගොනුවක් (tsconfig, package.json, …) හෝ
# සිතියම්ගත නොකළ source එකක් වෙනස් වී ඇති බවයි — selector එක ආරක්ෂිතව අසාර්ථක වන අතර කිසිවිටෙක නිහඬව මඟ නොහරියි.

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E පරීක්ෂණ (Playwright අවශ්යයි)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem අනුකූලතා පරීක්ෂණ
npm run test:ecosystem

# Coverage gate: statements/lines/functions/branches 60%
npm run test:coverage
npm run coverage:report

# Lint + format පරීක්ෂාව
npm run lint
npm run check

# Gate කළ සැබෑ-upstream combo smoke පරීක්ෂණය (VPS ප්රවේශය + සැබෑ provider credits අවශ්යයි)
# සැබෑ providers වෙත පිවිසේ — සුළු පිරිවැයක් ඇත. කිසිවිටෙක CI තුළ ධාවනය නොවේ. Gate එක නොමැති විට නිසි ලෙස මඟ හරියි.
# අවශ්ය දේ: ssh root@192.168.0.15 ප්රවේශය (VPS වෙතින් read-only DB snapshot එකක් source කරයි).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS සජීවී smoke පරීක්ෂණය — සරල Node ESM scripts, සජීවී .15 server එකට සෘජුව පිවිසේ.
# අවශ්ය දේ: ssh root@192.168.0.15 ප්රවේශය (SSH sqlite හරහා combos සාදා/ඉවත් කරයි).
# සැබෑ providers වෙත පිවිසේ (සුළු පිරිවැයක්). __live_test__* combos පමණක් සාදයි/මකයි. කිසිවිටෙක CI තුළ ධාවනය නොවේ.
# .15 මත REQUIRE_API_KEY=false නිසා API key එකක් අවශ්ය නැත, නමුත් සකසා ඇත්නම් COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY අනුගමනය කරයි.
npm run test:combo:live:vps              # HTTP අවස්ථා 7ක් (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # සැබෑ cross-provider failover අවස්ථාවක් එක් කරයි (මුළු ගණන 8යි)
```

Coverage සටහන්:

- `npm run test:coverage` ප්රධාන unit test suite එක සඳහා source coverage මනින අතර, `tests/**` බැහැර කර `open-sse/**` ඇතුළත් කරයි
- Pull requests විසින් statements/lines/functions/branches සඳහා coverage gate එක **60%+** ලෙස පවත්වා ගත යුතුය
- PR එකක් `src/`, `open-sse/`, `electron/`, හෝ `bin/` තුළ production code වෙනස් කරන්නේ නම්, එම PR එක තුළම automated tests එක් කිරීම හෝ යාවත්කාලීන කිරීම අවශ්යයි
- `npm run coverage:report` මඟින් නවතම coverage ධාවනයේ සවිස්තරාත්මක ගොනුවෙන්-ගොනුවට වාර්තාව මුද්රණය කරයි
- `npm run test:coverage:legacy` ඓතිහාසික සැසඳීම සඳහා පැරණි metric එක සුරකියි
- අදියරගත coverage වැඩිදියුණු කිරීමේ මාර්ග සිතියම සඳහා `docs/ops/COVERAGE_PLAN.md` බලන්න

### Pull Request අවශ්යතා

PR එකක් විවෘත කිරීමට පෙර, ඔබ වෙනස් කළ දේ සඳහා අවධානය යොමු කළ චක්රය ධාවනය කිරීමට
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) භාවිත කරන්න.
සම්පූර්ණ unit suite එක (CI shards 4ක්), Vitest, **60%+** coverage gate එක සහ production build එක
CI හි වගකීමයි — ඒවා දේශීයව ධාවනය කිරීමෙන් PR පරීක්ෂණ දැනටමත් ලබා නොදෙන අමතර සංඥාවක් නොලැබෙන අතර,
කුඩා යන්ත්රවලදී එය host එකේ සම්පත් උපරිමයෙන් භාවිත කළ හැක (#8084):

- ඔබේ වෙනස ආවරණය කරන test files ධාවනය කරන්න: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` ධාවනය කරන්න
- production code වෙනස් වන සෑමවිටම එම PR එක තුළම automated tests ඇතුළත් කරන්න හෝ යාවත්කාලීන කරන්න
- production code වෙනස් වූ විට වෙනස් කළ හෝ එක් කළ test files PR විස්තරයට ඇතුළත් කරන්න
- project secrets CI තුළ සකසා ඇති විට PR එකේ SonarQube ප්රතිඵලය පරීක්ෂා කරන්න

වත්මන් පරීක්ෂණ තත්ත්වය: පහත දේ ආවරණය කරන **unit test files 122ක්**:

- Provider translators සහ format conversion
- Rate limiting, circuit breaker සහ resilience
- Semantic cache, idempotency සහ progress tracking
- Database මෙහෙයුම් සහ schema (DB modules 21ක්)
- OAuth flows සහ authentication
- API endpoint සත්යාපනය (Zod v4)
- MCP server tools සහ scope enforcement
- Memory සහ Skills systems

---

## කේත ශෛලිය

- **ESLint** — commit කිරීමට පෙර `npm run lint` ධාවනය කරන්න
- **Prettier** — commit කිරීමේදී `lint-staged` හරහා ස්වයංක්රීයව ආකෘතිගත කෙරේ (හිස්තැන් 2ක්, අර්ධවිරාම, ද්විත්ව උද්ධෘත ලකුණු, අක්ෂර 100ක පළල, es5 trailing commas)
- **TypeScript** — සියලුම `src/` කේත `.ts`/`.tsx` භාවිත කරයි; `open-sse/` විසින් `.ts`/`.js` භාවිත කරයි; TSDoc (`@param`, `@returns`, `@throws`) මඟින් ලේඛනගත කරන්න
- **`eval()` භාවිත නොකරන්න** — ESLint මඟින් `no-eval`, `no-implied-eval`, `no-new-func` බලාත්මක කරයි
- **Zod වලංගුකරණය** — සියලුම API ආදාන වලංගුකරණය සඳහා Zod v4 schemas භාවිත කරන්න
- **නාමකරණය**: ගොනු = camelCase/kebab-case, සංරචක = PascalCase, නියතයන් = UPPER_SNAKE

### දෝෂ හැසිරවීම / හිස් catch blocks

කිසිවිටෙකත් පැහැදිලි කිරීමකින් තොරව `catch` එකක් තබන්න එපා. එය කාණ්ඩ දෙකෙන් එකකට වර්ගීකරණය කරන්න (මෙය
"SSE streams තුළ දෝෂ කිසිවිටෙකත් නිහඬව නොසලකා හරින්න" යන දැඩි රීතිය ක්රියාත්මක කරයි):

- **චේතනාන්විත (අපගේම best-effort පිරිසිදු කිරීම/ටෙලිමෙට්රි)** — මෙහි අසාර්ථක වීමක් අපේක්ෂිත සහ
  හානිකර නොවන දෙයකි; තනි පේළියක හේතු දැක්වීමේ comment එකක් එක් කරන්න, logging නොකරන්න (සෑම request එකකදීම logging කිරීමෙන්
  ඇතිවන අනවශ්ය ඝෝෂාව මෙම සම්මුතිය මඟින් වළක්වයි).

  ```ts
  } catch {} // client විසන්ධි වූ පසු දැනටමත් වැසූ controller එකක් වසා දැමීමට උත්සාහ කිරීම අපේක්ෂිතය
  ```

- **Log කළ යුතුය (බාහිර/caller විසින් සපයන ලද කේතය, හෝ නොසලකා හැරීමෙන් control flow වෙනස් වේ)** — stream එක
  බිඳ දැමීමට කිසිවිටෙකත් ඉඩ නොදෙමින් catch එක තබා ගන්න, නමුත් අසාර්ථකත්වය සොයාගත හැකි වන පරිදි සන්දර්භානුකූල `console.debug`/`warn` එකක්
  නිකුත් කරන්න.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback දෝෂය:", e);
  }
  ```

යොදා ඇති උදාහරණ සඳහා `open-sse/utils/stream.ts` සහ `open-sse/utils/streamHandler.ts` බලන්න.

---

## ව්යාපෘති ව්යුහය

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard පිටු (කොටස් 23ක්)
│   ├── api/                # API routes (නාමාවලි 51ක්)
│   └── login/              # සත්යාපන පිටු (.tsx)
├── domain/                 # ප්රතිපත්ති යන්ත්රය (policyEngine, comboResolver, costRules, ආදිය)
├── lib/                    # මූලික ව්යාපාරික තර්කනය (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol ලේඛනාගාරය
│   ├── compliance/         # අනුකූලතා ප්රතිපත්ති යන්ත්රය
│   ├── db/                 # SQLite domain modules + migrations 130ක්
│   ├── memory/             # ස්ථිර සංවාද මතකය
│   ├── oauth/              # OAuth providers, services සහ utilities
│   ├── skills/             # පුළුල් කළ හැකි skill framework එක
│   ├── usage/              # භාවිතය නිරීක්ෂණය සහ පිරිවැය ගණනය කිරීම
│   └── localDb.ts          # නැවත export කරන ස්තරයක් පමණි — මෙහි කිසිවිටෙකත් තර්කනය එක් නොකරන්න
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (සහතික, DNS, ඉලක්ක routing)
├── shared/
│   ├── components/         # React සංරචක (.tsx)
│   ├── constants/          # Provider නිර්වචන (329), MCP scopes, routing උපායමාර්ග 19ක්
│   ├── utils/              # Circuit breaker, sanitizer, සත්යාපන helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # executor ක්රියාත්මක කිරීමේ modules 89ක්
├── handlers/               # request handlers 11ක් (chat, responses, embeddings, images, ආදිය)
├── mcp-server/             # MCP server (අනන්ය tools 110ක්, transports 3ක්, scopes 33ක්)
├── services/               # ඉහළ මට්ටමේ services 178ක් (combo, autoCombo, rateLimitManager, ආදිය)
├── translator/             # ආකෘති පරිවර්තක (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # utility modules 22ක් (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (බහු-වේදිකා)

tests/
├── unit/                   # Node.js test runner (test ගොනු 1,574ක්)
├── integration/            # ඒකාබද්ධතා tests
├── e2e/                    # Playwright tests
├── security/               # ආරක්ෂක tests
├── translator/             # පරිවර්තකයට විශේෂිත tests
└── load/                   # බර tests

docs/
├── adr/                     # වාස්තු විද්යාත්මක තීරණ වාර්තා
├── architecture/            # පද්ධති වාස්තු විද්යාව සහ ප්රත්යස්ථතාව
├── comparison/              # OmniRoute සහ විකල්ප අතර සැසඳීම
├── compression/             # සම්පීඩන මාර්ගෝපදේශ සහ රීති
├── dev/                     # සංවර්ධන මාර්ගෝපදේශ
├── diagrams/                # වාස්තු විද්යා රූප සටහන්
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # පරිශීලක මාර්ගෝපදේශය, Docker, පිහිටුවීම, දෝෂ නිරාකරණය
├── i18n/                    # ජාත්යන්තරකරණය කළ README පරිවර්තන
├── marketing/               # අලෙවිකරණ ද්රව්ය
├── ops/                     # යෙදවීම, proxy, coverage, releases
├── providers/               # Provider-විශේෂිත ලේඛන
├── reference/               # API යොමුව, env vars, CLI tools, නොමිලේ භාවිත මට්ටම්
├── releases/                # නිකුතු සටහන්
├── routing/                 # Auto-combo engine, reasoning replay
├── screenshots/             # Dashboard තිර රූ
├── security/                # Guardrails, අනුකූලතාව, stealth, tokens
└── specs/                   # සැලසුම් පිරිවිතර
```

---

## නව සපයන්නෙකු එක් කිරීම

### පියවර 1: සපයන්නාගේ නියත ලියාපදිංචි කරන්න

`src/shared/constants/providers.ts` වෙත එක් කරන්න — මොඩියුලය පූරණය වන විට Zod මඟින් වලංගු කෙරේ.

### පියවර 2: ක්රියාත්මක කරන්නෙකු එක් කරන්න (අභිරුචි තර්කනය අවශ්ය නම්)

මූලික ක්රියාත්මක කරන්නා විස්තාරණය කරමින් `open-sse/executors/your-provider.ts` තුළ ක්රියාත්මක කරන්නෙකු සාදන්න.

### පියවර 3: පරිවර්තකයෙකු එක් කරන්න (OpenAI නොවන ආකෘතියක් නම්)

`open-sse/translator/` තුළ ඉල්ලීම්/ප්රතිචාර පරිවර්තක සාදන්න.

### පියවර 4: OAuth වින්යාසය එක් කරන්න (OAuth-පාදක නම්)

`src/lib/oauth/constants/oauth.ts` තුළ OAuth අක්තපත්ර සහ `src/lib/oauth/services/` තුළ සේවාව එක් කරන්න.

ඉහළ මට්ටමේ සපයන්නා එහි පොදු CLI / බ්රවුසර බණ්ඩලය තුළ පොදු OAuth client_id/secret එකක් හෝ Firebase Web API යතුරක් බෙදා හරින්නේ නම්, එය තන්තු ලිටරලයක් ලෙස කේතයට **ඇතුළත් නොකරන්න**. `open-sse/utils/publicCreds.ts` වෙතින් `resolvePublicCred()` භාවිත කර `EMBEDDED_DEFAULTS` වෙත ආවරණය කළ බයිට් ප්රවේශයක් එක් කරන්න. සම්පූර්ණ අනිවාර්ය කාර්ය ප්රවාහය [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) තුළ ලේඛනගත කර ඇත.

හසුරුවන්නන්/ක්රියාත්මක කරන්නන් තුළ, සේවාලාභියා වෙත ළඟා වන දෝෂ පණිවිඩ `open-sse/utils/error.ts` වෙතින් වන `buildErrorBody()` / `sanitizeErrorMessage()` හරහා යැවිය යුතුය — අමු `err.stack` හෝ `err.message` කිසිවිටෙක Response බොඩියක නොතබන්න. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) බලන්න.

### පියවර 5: ආකෘති ලියාපදිංචි කරන්න

`open-sse/config/providerRegistry.ts` තුළ ආකෘති නිර්වචන එක් කරන්න.

### පියවර 6: පරීක්ෂණ එක් කරන්න

අවම වශයෙන් පහත දෑ ආවරණය වන පරිදි `tests/unit/` තුළ ඒකක පරීක්ෂණ ලියන්න:

- සපයන්නා ලියාපදිංචි කිරීම
- ඉල්ලීම්/ප්රතිචාර පරිවර්තනය
- දෝෂ හැසිරවීම

---

## Pull Request පිරික්සුම් ලැයිස්තුව

- [ ] පරීක්ෂණ සමත් වේ (`npm test`)
- [ ] ලින්ට් කිරීම සමත් වේ (`npm run lint`)
- [ ] ගොඩනැගීම සාර්ථක වේ (`npm run build`)
- [ ] නව පොදු ශ්රිත සහ අතුරුමුහුණත් සඳහා TypeScript වර්ග එක් කර ඇත
- [ ] දෘඪ-කේතනය කළ රහස් හෝ පෙරනිමි විකල්ප අගයන් නොමැත
- [ ] පොදු ඉහළ මට්ටමේ අක්තපත්ර `resolvePublicCred()` හරහා කේතයට ඇතුළත් කර ඇත ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) බලන්න), කිසිවිටෙක ලිටරල ලෙස නොවේ
- [ ] දෝෂ ප්රතිචාර `buildErrorBody()` / `sanitizeErrorMessage()` හරහා යොමු වේ — ප්රතිචාර බොඩි තුළ අමු ස්ටැක් ට්රේස් නොමැත ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) බලන්න)
- [ ] Shell විධාන (`exec` / `spawn`) ධාවනකාල අගයන් තන්තු අන්තර්නිවේෂණය හරහා නොව `env` හරහා ලබා දෙයි
- [ ] සියලු ආදාන Zod ස්කීමා මඟින් වලංගු කර ඇත
- [ ] පරිශීලකයාට පෙනෙන වෙනස්කම් සඳහා `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` යටතේ වෙනස්කම් ලොග් **ඛණ්ඩයක්** එක් කර ඇත ([`changelog.d/README.md`](./changelog.d/README.md) බලන්න) — `CHANGELOG.md` සෘජුවම සංස්කරණය **නොකරන්න**; නිකුත් කිරීමේදී ඛණ්ඩ එක්රැස් කෙරෙන අතර ඒවා PR අතර කිසිවිටෙක ගැටුම් ඇති නොකරයි
- [ ] ලේඛන යාවත්කාලීන කර ඇත (අදාළ නම්)
- [ ] නව CodeQL / Secret-Scanning අනතුරු ඇඟවීම් විවෘත කර නැත, නැතහොත් සෑම එකක්ම අදාළ `docs/security/` ලේඛනය සඳහන් කරන තාක්ෂණික සාධාරණීකරණයක් සමඟ ප්රතික්ෂේප කර ඇත
- [ ] උප ක්රියාවලි ආරම්භ කරන මාර්ග (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts` තුළ `isLocalOnlyPath()` ලෙස වර්ගීකරණය කර ඇත — [දැඩි රීතිය #15](docs/security/ROUTE_GUARD_TIERS.md) බලන්න
- [ ] commit පණිවිඩ තුළ `Co-Authored-By` ට්රේලර් නොමැත — commits ගබඩා හිමිකරුගේ Git අනන්යතාව යටතේ පමණක් දිස් විය යුතුය (දැඩි රීතිය #16)

---

## නිකුත් කිරීම්

නිකුත් කිරීම් `/generate-release` කාර්ය ප්රවාහය හරහා කළමනාකරණය කෙරේ. නව GitHub Release එකක් නිර්මාණය කළ විට, පැකේජය GitHub Actions හරහා **ස්වයංක්රීයව npm වෙත ප්රකාශයට පත් කෙරේ**.

VPS යෙදවීම් සඳහා, `npm run build` වෙනුවට `npm run build:release` භාවිත කරන්න — එය පිරිසිදු
නැවත ගොඩනැගීමක් සිදු කර, බණ්ඩලය `dist/` තුළ සකස් කර, `dist/BUILD_SHA` සෙන්ටිනලය ලියයි.
ඉන්පසු `dist/` දුරස්ථ `app/` නාමාවලියට rsync කරන `/deploy-vps-*-cc` කුසලතා භාවිත කරන්න.

---

## උදව් ලබා ගැනීම

- **ගෘහනිර්මාණය**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) බලන්න
- **API යොමුව**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) බලන්න
- **ආරක්ෂක ලේඛන**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **මෙහෙයුම් ලේඛන**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **ගැටලු**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: ගෘහනිර්මාණ තීරණ වාර්තා සඳහා `docs/adr/` බලන්න
