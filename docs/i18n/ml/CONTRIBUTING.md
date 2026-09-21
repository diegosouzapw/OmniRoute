# Contributing to OmniRoute (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

സംഭാവന ചെയ്യാനുള്ള നിങ്ങളുടെ താൽപ്പര്യത്തിന് നന്ദി! ആരംഭിക്കാൻ ആവശ്യമായ എല്ലാ കാര്യങ്ങളും ഈ ഗൈഡിൽ ഉൾപ്പെടുത്തിയിട്ടുണ്ട്.

ഓരോ മാറ്റത്തിനുമുള്ള ഔദ്യോഗിക പ്രവർത്തനക്രമത്തിനായി,
[സംഭാവനയ്ക്കുള്ള ഗോൾഡൻ പാത](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) ഉപയോഗിച്ച് ആരംഭിക്കുക. പ്രൊവൈഡർ, റൂട്ടിംഗ്,
UI/UX, i18n, CLI, ഡാറ്റാബേസ്, ബിൽഡ്/ഡിപ്ലോയ് മാറ്റങ്ങൾ എന്നിവയെ അവയുടെ കരാറുകൾ, കേന്ദ്രീകൃത ടെസ്റ്റുകൾ, CI
കവറേജ്, അനുരഞ്ജന ഘട്ടങ്ങൾ എന്നിവയുമായി ഇത് ബന്ധിപ്പിക്കുന്നു.

---

## ഡെവലപ്മെന്റ് സജ്ജീകരണം

### മുൻകൂർ ആവശ്യകതകൾ

- **Node.js** `>=22.22.3 <23`, അല്ലെങ്കിൽ `>=24.0.0 <27` (ശുപാർശ ചെയ്യുന്നത്: 24 LTS)
- **npm** 10+

> **npm v11+ ഉപയോക്താക്കൾ (Node 24+):** `npm install` പ്രവർത്തിപ്പിച്ച ശേഷം നേറ്റീവ് മൊഡ്യൂളുകൾ ഇൻസ്റ്റാൾ ചെയ്തിട്ടുണ്ടെന്ന് പരിശോധിക്കുക:
> `node -e "require('better-sqlite3')"`. ഇത് `MODULE_NOT_FOUND` എന്ന പിശകോടെ പരാജയപ്പെടുകയാണെങ്കിൽ,
> `npm approve-scripts better-sqlite3 && npm install` പ്രവർത്തിപ്പിക്കുക. കാണുക:
> [പ്രശ്നപരിഹാരം](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### ക്ലോൺ ചെയ്ത് ഇൻസ്റ്റാൾ ചെയ്യുക

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### എൻവയോൺമെന്റ് വേരിയബിളുകൾ

```bash
# ടെംപ്ലേറ്റിൽ നിന്ന് നിങ്ങളുടെ .env സൃഷ്ടിക്കുക
cp .env.example .env

# ആവശ്യമായ രഹസ്യങ്ങൾ സൃഷ്ടിക്കുക
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

ഡെവലപ്മെന്റിനുള്ള പ്രധാന വേരിയബിളുകൾ:

| വേരിയബിൾ               | ഡെവലപ്മെന്റ് ഡിഫോൾട്ട്   | വിവരണം                       |
| ---------------------- | ------------------------ | ---------------------------- |
| `PORT`                 | `20128`                  | സെർവർ പോർട്ട്                |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | ഫ്രണ്ട്എൻഡിന്റെ അടിസ്ഥാന URL |
| `JWT_SECRET`           | (മുകളിൽ സൃഷ്ടിക്കുക)     | JWT സൈനിംഗ് രഹസ്യം           |
| `INITIAL_PASSWORD`     | `CHANGEME`               | ആദ്യ ലോഗിൻ പാസ്വേഡ്          |
| `APP_LOG_LEVEL`        | `info`                   | ലോഗിന്റെ വിശദാംശനില          |

### ഡാഷ്ബോർഡ് ക്രമീകരണങ്ങൾ

എൻവയോൺമെന്റ് വേരിയബിളുകൾ വഴിയും കോൺഫിഗർ ചെയ്യാവുന്ന സവിശേഷതകൾക്കായി ഡാഷ്ബോർഡ് UI ടോഗിളുകൾ നൽകുന്നു:

| ക്രമീകരണത്തിന്റെ സ്ഥാനം  | ടോഗിൾ          | വിവരണം                                            |
| ------------------------ | -------------- | ------------------------------------------------- |
| ക്രമീകരണങ്ങൾ → വിപുലമായവ | ഡീബഗ് മോഡ്     | ഡീബഗ് അഭ്യർത്ഥനാ ലോഗുകൾ പ്രവർത്തനക്ഷമമാക്കുക (UI) |
| ക്രമീകരണങ്ങൾ → പൊതുവായത് | സൈഡ്ബാർ ദൃശ്യത | സൈഡ്ബാർ വിഭാഗങ്ങൾ കാണിക്കുക/മറയ്ക്കുക             |

ഈ ക്രമീകരണങ്ങൾ ഡാറ്റാബേസിൽ സംഭരിക്കപ്പെടുകയും റീസ്റ്റാർട്ടുകൾക്കുശേഷവും നിലനിൽക്കുകയും ചെയ്യും. അവ സജ്ജീകരിച്ചിരിക്കുമ്പോൾ env var ഡിഫോൾട്ടുകളെ അസാധുവാക്കും.

### ലോക്കലായി പ്രവർത്തിപ്പിക്കൽ

```bash
# ഡെവലപ്മെന്റ് മോഡ് (ഹോട്ട് റീലോഡ്)
npm run dev

# പ്രൊഡക്ഷൻ ബിൽഡ്
npm run build    # next build → .build/next/ തുടർന്ന് assembleStandalone → dist/
npm run start

# സംഭാവകരുടെ മാറ്റങ്ങൾക്കായുള്ള വേഗത്തിലുള്ള ബാക്ക്എൻഡ്/API-മാത്രം കമ്പൈൽ
npm run build:contributor

# റിലീസ് ബിൽഡ് (ക്ലീൻ റീബിൽഡ് + HEAD സെന്റിനൽ — ഡിപ്ലോയ്മെന്റിന് ആവശ്യമാണ്)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA എഴുതുന്നു

# സാധാരണ പോർട്ട് കോൺഫിഗറേഷൻ
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

സംഭാവക ബിൽഡ് കമ്പൈൽ-മാത്രം മൂല്യനിർണ്ണയം നടത്തുന്നു: ഇത് സ്റ്റാൻഡ്അലോൺ
ഡിസ്ട്രിബ്യൂഷൻ അസംബിൾ ചെയ്യുകയോ ഐച്ഛിക നേറ്റീവ് പാക്കേജിംഗ് അസറ്റുകൾ ബിൽഡ് ചെയ്യുകയോ ചെയ്യുന്നില്ല. വിതരണം ചെയ്യാവുന്ന ബണ്ടിൽ
മൂല്യനിർണ്ണയം ചെയ്യേണ്ടിവരുമ്പോൾ സാധാരണ പ്രൊഡക്ഷൻ ബിൽഡ് ഉപയോഗിക്കുക.

### ബിൽഡ് ഔട്ട്പുട്ട് ലേഔട്ട്

| ഡയറക്ടറി  | ഉള്ളടക്കം                                                                        | ട്രാക്ക് ചെയ്യുന്നത് |
| --------- | -------------------------------------------------------------------------------- | -------------------- |
| `src/`    | ആപ്ലിക്കേഷൻ സോഴ്സ് (TypeScript / TSX)                                            | അതെ                  |
| `.build/` | ഇടനില ഫയലുകൾ — `next build` ഔട്ട്പുട്ട് (gitignored, `distDir = .build/next`)    | ഇല്ല                 |
| `dist/`   | വിതരണം ചെയ്യാവുന്ന ബണ്ടിൽ — `assembleStandalone` അസംബിൾ ചെയ്യുന്നത് (gitignored) | ഇല്ല                 |

ബിൽഡ് പൈപ്പ്ലൈൻ ഒരൊറ്റ പാസിലാണ് പ്രവർത്തിക്കുന്നത്:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js ഔട്ട്പുട്ട്)
  └─ assembleStandalone()                 (standalone + static + public + നേറ്റീവ് അസറ്റുകൾ പകർത്തുന്നു)
       └─ ഔട്ട്പുട്ട്: dist/              (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` കൂടാതെ ആദ്യം രണ്ട് ഡയറക്ടറികളും വൃത്തിയാക്കുകയും
ഡിപ്ലോയ്മെന്റ് സമഗ്രതാ സെന്റിനലായി `dist/BUILD_SHA` (= `git rev-parse --short HEAD`) എഴുതുകയും ചെയ്യുന്നു.

`npm run build:contributor` ബാക്ക്എൻഡ്-മാത്രം ബിൽഡ് പ്രൊഫൈൽ ഉപയോഗിക്കുന്നു. ബിൽഡ് ചെയ്യുമ്പോൾ ഇത് താൽക്കാലികമായി
ഡാഷ്ബോർഡ് UI ഫയലുകൾക്ക് സ്റ്റബുകൾ പകരം വയ്ക്കുകയും API റൂട്ട് ഹാൻഡ്ലറുകൾ നിലനിർത്തുകയും ബിൽഡിനുശേഷം യഥാർത്ഥ ഫയലുകൾ
പുനഃസ്ഥാപിക്കുകയും ചെയ്യുന്നു. ഡാഷ്ബോർഡ് UI-യെ ബാധിക്കുന്ന മാറ്റങ്ങൾക്കോ പൂർണ്ണ
റിലീസ് മൂല്യനിർണ്ണയത്തിനോ `npm run build` ഉപയോഗിക്കുക; സംഭാവക പ്രൊഫൈൽ റിലീസ് ബിൽഡിന് പകരമല്ല.

> **VPS ഡിപ്ലോയ്മെന്റ് കുറിപ്പ്:** റിമോട്ട് ഇമേജ് ഡയറക്ടറി `/usr/lib/node_modules/omniroute/app/`
> മാറ്റമില്ലാതെ തുടരുന്നു. ഡിപ്ലോയ് സ്കില്ലുകൾ `dist/`-ന്റെ ഉള്ളടക്കം അതിലേക്ക് rsync ചെയ്യുന്നു.
> റിപ്പോസിറ്ററിക്കുള്ളിലെ ബിൽഡ് ഔട്ട്പുട്ട് പാത്ത് മാത്രമാണ് മാറിയത് (`app/` → `dist/`).

ഡിഫോൾട്ട് URL-കൾ:

- **ഡാഷ്ബോർഡ്**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git പ്രവർത്തനക്രമം

> ⚠️ **`main`-ലേക്ക് ഒരിക്കലും നേരിട്ട് commit ചെയ്യരുത്.** എല്ലായ്പ്പോഴും feature branch-കൾ ഉപയോഗിക്കുക.
>
> **PR base:** സജീവമായ `release/vX.Y.Z` branch ലക്ഷ്യമാക്കുക (`main` അല്ല). ഓരോ release-നും ഓരോ branch + ship ചെയ്യുമ്പോൾ tag എന്ന മാതൃകയെക്കുറിച്ച് അറിയാൻ
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) കാണുക.

```bash
# സജീവ release tip-ൽനിന്ന് branch സൃഷ്ടിക്കുക (ഉദാഹരണം: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... മാറ്റങ്ങൾ വരുത്തുക ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 ആയി ഒരു Pull Request തുറക്കുക
```

### Branch നാമകരണം

| Prefix      | ഉദ്ദേശ്യം                                   |
| ----------- | ------------------------------------------- |
| `feat/`     | പുതിയ സവിശേഷതകൾ                             |
| `fix/`      | ബഗ് പരിഹാരങ്ങൾ                              |
| `refactor/` | കോഡ് പുനഃസംഘടന                              |
| `docs/`     | ഡോക്യുമെന്റേഷൻ മാറ്റങ്ങൾ                    |
| `test/`     | ടെസ്റ്റുകളുടെ കൂട്ടിച്ചേർക്കലുകൾ/പരിഹാരങ്ങൾ |
| `chore/`    | ടൂളിംഗ്, CI, dependencies                   |

### Commit സന്ദേശങ്ങൾ

[Conventional Commits](https://www.conventionalcommits.org/) പിന്തുടരുക:

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## ടെസ്റ്റുകൾ പ്രവർത്തിപ്പിക്കൽ

```bash
# എല്ലാ ടെസ്റ്റുകളും (unit + vitest + ecosystem + e2e)
npm run test:all

# ഒരൊറ്റ test file (Node.js native test runner — മിക്ക ടെസ്റ്റുകളും ഇതാണ് ഉപയോഗിക്കുന്നത്)
node --import tsx/esm --test tests/unit/your-file.test.ts

# നിങ്ങളുടെ മാറ്റം ബാധിച്ച unit test-കൾ മാത്രം (CI gate-ലെ അതേ TIA selector, #8084)
npm run test:scoped            # അവസാന commit-ലെ മാറ്റങ്ങൾ (അല്ലെങ്കിൽ working tree-യിലെവ)
npm run test:scoped:staged     # staged മാറ്റങ്ങൾ മാത്രം — pre-commit run-നൊപ്പം നന്നായി യോജിക്കുന്നു
npm run test:scoped:full       # ആദ്യം import-graph map വീണ്ടും നിർമ്മിക്കുക (file-കൾ ചേർത്ത/നീക്കിയ ശേഷം)
# Exit 1 + "run the full suite" എന്നത് ഒരു hub file (tsconfig, package.json, …) അല്ലെങ്കിൽ
# map ചെയ്തിട്ടില്ലാത്ത source മാറിയെന്നാണ് അർത്ഥം — selector സുരക്ഷിതമായി പരാജയപ്പെടും; അത് ഒരിക്കലും നിശ്ശബ്ദമായി ഒഴിവാക്കില്ല.

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E test-കൾ (Playwright ആവശ്യമാണ്)
npm run test:e2e

# Protocol client-കളുടെ E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility test-കൾ
npm run test:ecosystem

# Coverage gate: statements/lines/functions/branches-ന് 60%
npm run test:coverage
npm run coverage:report

# Lint + format പരിശോധന
npm run lint
npm run check

# Gate ചെയ്ത real-upstream combo smoke (VPS access + യഥാർത്ഥ provider credits ആവശ്യമാണ്)
# യഥാർത്ഥ provider-കളെ ഉപയോഗിക്കുന്നു — ചെറിയ ചെലവുണ്ടാകും. CI-യിൽ ഒരിക്കലും പ്രവർത്തിക്കില്ല. Gate ഇല്ലെങ്കിൽ പ്രശ്നമില്ലാതെ ഒഴിവാക്കും.
# ആവശ്യമാണ്: ssh root@192.168.0.15 access (VPS-ൽനിന്ന് read-only DB snapshot source ചെയ്യുന്നു).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — സാധാരണ Node ESM script-കൾ, live .15 server-നെ നേരിട്ട് ഉപയോഗിക്കുന്നു.
# ആവശ്യമാണ്: ssh root@192.168.0.15 access (combo-കൾ SSH sqlite വഴി സൃഷ്ടിക്കുകയും നീക്കം ചെയ്യുകയും ചെയ്യുന്നു).
# യഥാർത്ഥ provider-കളെ ഉപയോഗിക്കുന്നു (ചെറിയ ചെലവ്). __live_test__* combo-കൾ മാത്രം സൃഷ്ടിക്കുന്നു/നീക്കംചെയ്യുന്നു. CI-യിൽ ഒരിക്കലും പ്രവർത്തിക്കില്ല.
# .15-ൽ REQUIRE_API_KEY=false ആയതിനാൽ API key ആവശ്യമില്ല, എന്നാൽ സജ്ജീകരിച്ചിട്ടുണ്ടെങ്കിൽ COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY മാനിക്കും.
npm run test:combo:live:vps              # 7 HTTP സാഹചര്യങ്ങൾ (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # യഥാർത്ഥ cross-provider failover സാഹചര്യം ചേർക്കുന്നു (ആകെ 8)
```

Coverage കുറിപ്പുകൾ:

- `npm run test:coverage` പ്രധാന unit test suite-ന്റെ source coverage അളക്കുന്നു, `tests/**` ഒഴിവാക്കുന്നു, കൂടാതെ `open-sse/**` ഉൾപ്പെടുത്തുന്നു
- Pull request-കൾ statements/lines/functions/branches-നുള്ള coverage gate **60%+** ആയി നിലനിർത്തണം
- ഒരു PR `src/`, `open-sse/`, `electron/`, അല്ലെങ്കിൽ `bin/` എന്നതിലെ production code മാറ്റുന്നുവെങ്കിൽ, അതേ PR-ൽ automated test-ുകൾ ചേർക്കുകയോ പുതുക്കുകയോ വേണം
- `npm run coverage:report` ഏറ്റവും പുതിയ coverage run-ൽനിന്നുള്ള വിശദമായ file-by-file report പ്രിന്റ് ചെയ്യുന്നു
- `npm run test:coverage:legacy` ചരിത്രപരമായ താരതമ്യത്തിനായി പഴയ metric നിലനിർത്തുന്നു
- ഘട്ടംഘട്ടമായ coverage മെച്ചപ്പെടുത്തൽ roadmap-നായി `docs/ops/COVERAGE_PLAN.md` കാണുക

### Pull Request ആവശ്യകതകൾ

ഒരു PR തുറക്കുന്നതിന് മുമ്പ്, നിങ്ങൾ മാറ്റിയവയ്ക്കായുള്ള focused loop പ്രവർത്തിപ്പിക്കാൻ
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) ഉപയോഗിക്കുക. പൂർണ്ണ unit suite (4 CI shards), Vitest, **60%+** coverage gate, കൂടാതെ
production build എന്നിവ CI-യുടെ ഉത്തരവാദിത്തമാണ് — അവ പ്രാദേശികമായി പ്രവർത്തിപ്പിക്കുന്നത് PR പരിശോധനകൾ ഇതിനകം നൽകാത്ത ഒരു സൂചനയും അധികമായി നൽകുന്നില്ല; ചെറിയ machine-കളിൽ അത് host-ന്റെ ശേഷി പൂർണ്ണമായി ഉപയോഗിച്ചേക്കാം (#8084):

- നിങ്ങളുടെ മാറ്റം ഉൾക്കൊള്ളുന്ന test file-കൾ പ്രവർത്തിപ്പിക്കുക: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` പ്രവർത്തിപ്പിക്കുക
- production code മാറുമ്പോഴെല്ലാം അതേ PR-ൽ automated test-ുകൾ ഉൾപ്പെടുത്തുകയോ പുതുക്കുകയോ ചെയ്യുക
- production code മാറിയിട്ടുണ്ടെങ്കിൽ, മാറ്റിയതോ ചേർത്തതോ ആയ test file-കൾ PR വിവരണത്തിൽ ഉൾപ്പെടുത്തുക
- CI-യിൽ project secret-ുകൾ ക്രമീകരിച്ചിട്ടുണ്ടെങ്കിൽ PR-ലെ SonarQube ഫലം പരിശോധിക്കുക

നിലവിലെ test സ്ഥിതി: താഴെപ്പറയുന്നവ ഉൾക്കൊള്ളുന്ന **122 unit test file-കൾ**:

- Provider translator-ുകളും format conversion-ഉം
- Rate limiting, circuit breaker, resilience
- Semantic cache, idempotency, progress tracking
- Database പ്രവർത്തനങ്ങളും schema-യും (21 DB module-കൾ)
- OAuth flow-കളും authentication-ഉം
- API endpoint validation (Zod v4)
- MCP server tool-ുകളും scope enforcement-ഉം
- Memory, Skills system-ുകൾ

---

## കോഡ് ശൈലി

- **ESLint** — commit ചെയ്യുന്നതിന് മുമ്പ് `npm run lint` പ്രവർത്തിപ്പിക്കുക
- **Prettier** — commit ചെയ്യുമ്പോൾ `lint-staged` വഴി സ്വയമേവ ഫോർമാറ്റ് ചെയ്യപ്പെടുന്നു (2 spaces, semicolons, double quotes, 100 char width, es5 trailing commas)
- **TypeScript** — എല്ലാ `src/` കോഡും `.ts`/`.tsx` ഉപയോഗിക്കുന്നു; `open-sse/` `.ts`/`.js` ഉപയോഗിക്കുന്നു; TSDoc (`@param`, `@returns`, `@throws`) ഉപയോഗിച്ച് രേഖപ്പെടുത്തുക
- **`eval()` പാടില്ല** — ESLint, `no-eval`, `no-implied-eval`, `no-new-func` എന്നിവ നിർബന്ധമാക്കുന്നു
- **Zod സാധൂകരണം** — എല്ലാ API ഇൻപുട്ട് സാധൂകരണത്തിനും Zod v4 schemas ഉപയോഗിക്കുക
- **നാമകരണം**: Files = camelCase/kebab-case, components = PascalCase, constants = UPPER_SNAKE

### പിശക് കൈകാര്യം ചെയ്യൽ / ശൂന്യമായ catch ബ്ലോക്കുകൾ

ഒരു `catch`-ഉം വിശദീകരണമില്ലാതെ വിടരുത്. അതിനെ താഴെപ്പറയുന്ന രണ്ട് വിഭാഗങ്ങളിൽ ഒന്നായി തരംതിരിക്കുക ("SSE streams-ൽ പിശകുകൾ ഒരിക്കലും നിശ്ശബ്ദമായി അവഗണിക്കരുത്" എന്ന കർശന നിയമം പ്രാവർത്തികമാക്കുന്നു):

- **മനഃപൂർവം (നമ്മുടെ സ്വന്തം best-effort cleanup/telemetry)** — ഇവിടെ ഒരു പരാജയം പ്രതീക്ഷിക്കാവുന്നതും
  ദോഷരഹിതവുമാണ്; ഒരു വരിയിലുള്ള കാരണവിവരണ comment ചേർക്കുക, logging വേണ്ട (ഓരോ request-ലും logging നടത്തുന്നതിലൂടെ ഉണ്ടാകുന്ന
  അനാവശ്യ ബഹളമാണ് ഈ convention ഒഴിവാക്കുന്നത്).

  ```ts
  } catch {} // client വിച്ഛേദിച്ചതിന് ശേഷം ഇതിനകം അടച്ച controller വീണ്ടും അടയ്ക്കാൻ ശ്രമിക്കുന്നത് പ്രതീക്ഷിക്കാവുന്നതാണ്
  ```

- **Log ചെയ്യേണ്ടത് (external/caller-supplied code, അല്ലെങ്കിൽ അവഗണിക്കൽ control flow മാറ്റുന്നുവെങ്കിൽ)** — catch നിലനിർത്തുക
  (അത് stream തകർക്കാൻ ഒരിക്കലും അനുവദിക്കരുത്), എന്നാൽ പരാജയം കണ്ടെത്താനാകുന്നതിനായി സന്ദർഭോചിതമായ `console.debug`/`warn` പുറപ്പെടുവിക്കുക.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback പിശക്:", e);
  }
  ```

പ്രയോഗിച്ച ഉദാഹരണങ്ങൾക്കായി `open-sse/utils/stream.ts`, `open-sse/utils/streamHandler.ts` എന്നിവ കാണുക.

---

## പ്രോജക്റ്റ് ഘടന

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard പേജുകൾ (23 വിഭാഗങ്ങൾ)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth പേജുകൾ (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, തുടങ്ങിയവ)
├── lib/                    # പ്രധാന business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite domain modules + 130 migrations
│   ├── memory/             # സ്ഥിരമായ conversational memory
│   ├── oauth/              # OAuth providers, services, utilities
│   ├── skills/             # വിപുലീകരിക്കാവുന്ന skill framework
│   ├── usage/              # Usage tracking-ഉം cost calculation-ഉം
│   └── localDb.ts          # Re-export layer മാത്രം — ഇവിടെ ഒരിക്കലും logic ചേർക്കരുത്
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, 19 routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, തുടങ്ങിയവ)
├── mcp-server/             # MCP server (110 വ്യത്യസ്ത tools, 3 transports, 33 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, തുടങ്ങിയവ)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (പല പ്ലാറ്റ്ഫോമുകളിലും പ്രവർത്തിക്കുന്നത്)

tests/
├── unit/                   # Node.js test runner (1,574 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-നുള്ള പ്രത്യേക tests
└── load/                   # Load tests

docs/
├── adr/                     # Architecture Decision Records
├── architecture/            # System architecture-ഉം resilience-ഉം
├── comparison/              # OmniRoute-ഉം മറ്റ് ബദലുകളും തമ്മിലുള്ള താരതമ്യം
├── compression/             # Compression guides-ഉം rules-ഉം
├── dev/                     # Development guides
├── diagrams/                # Architecture diagrams
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # User guide, Docker, setup, troubleshooting
├── i18n/                    # അന്താരാഷ്ട്രവൽക്കരിച്ച README പരിഭാഷകൾ
├── marketing/               # Marketing സാമഗ്രികൾ
├── ops/                     # Deployment, proxy, coverage, releases
├── providers/               # Provider-നുള്ള പ്രത്യേക docs
├── reference/               # API reference, env vars, CLI tools, free tiers
├── releases/                # Release notes
├── routing/                 # Auto-combo engine, reasoning replay
├── screenshots/             # Dashboard screenshots
├── security/                # Guardrails, compliance, stealth, tokens
└── specs/                   # Design specs
```

---

## പുതിയ Provider ചേർക്കൽ

### ഘട്ടം 1: Provider കോൺസ്റ്റന്റുകൾ രജിസ്റ്റർ ചെയ്യുക

മൊഡ്യൂൾ ലോഡ് ചെയ്യുമ്പോൾ Zod ഉപയോഗിച്ച് സാധൂകരിക്കപ്പെടുന്ന `src/shared/constants/providers.ts`-ലേക്ക് ചേർക്കുക.

### ഘട്ടം 2: Executor ചേർക്കുക (ഇഷ്ടാനുസൃത ലോജിക് ആവശ്യമെങ്കിൽ)

അടിസ്ഥാന executor വിപുലീകരിച്ചുകൊണ്ട് `open-sse/executors/your-provider.ts`-ൽ executor സൃഷ്ടിക്കുക.

### ഘട്ടം 3: Translator ചേർക്കുക (OpenAI ഇതര ഫോർമാറ്റാണെങ്കിൽ)

`open-sse/translator/`-ൽ request/response translator-കൾ സൃഷ്ടിക്കുക.

### ഘട്ടം 4: OAuth കോൺഫിഗറേഷൻ ചേർക്കുക (OAuth അടിസ്ഥാനമാക്കിയുള്ളതാണെങ്കിൽ)

OAuth ക്രെഡൻഷ്യലുകൾ `src/lib/oauth/constants/oauth.ts`-ലും സേവനം `src/lib/oauth/services/`-ലും ചേർക്കുക.

അപ്സ്ട്രീം provider അതിന്റെ പൊതു CLI / ബ്രൗസർ ബണ്ടിലിനുള്ളിൽ ഒരു പൊതു OAuth client_id/secret അല്ലെങ്കിൽ Firebase Web API കീ വിതരണം ചെയ്യുന്നുവെങ്കിൽ, അത് ഒരു string literal ആയി ഉൾച്ചേർക്കരുത്. `open-sse/utils/publicCreds.ts`-ൽ നിന്നുള്ള `resolvePublicCred()` ഉപയോഗിക്കുകയും `EMBEDDED_DEFAULTS`-ലേക്ക് masked byte എൻട്രി ചേർക്കുകയും ചെയ്യുക. നിർബന്ധമായ പൂർണ്ണ workflow [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)-ൽ രേഖപ്പെടുത്തിയിട്ടുണ്ട്.

Handler/executor-കൾക്കുള്ളിൽ, ക്ലയന്റിലെത്തുന്ന പിശക് സന്ദേശങ്ങൾ `open-sse/utils/error.ts`-ൽ നിന്നുള്ള `buildErrorBody()` / `sanitizeErrorMessage()` വഴി കടന്നുപോകണം — അസംസ്കൃത `err.stack` അല്ലെങ്കിൽ `err.message` ഒരിക്കലും Response body-യിൽ ഉൾപ്പെടുത്തരുത്. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) കാണുക.

### ഘട്ടം 5: മോഡലുകൾ രജിസ്റ്റർ ചെയ്യുക

`open-sse/config/providerRegistry.ts`-ൽ മോഡൽ നിർവചനങ്ങൾ ചേർക്കുക.

### ഘട്ടം 6: ടെസ്റ്റുകൾ ചേർക്കുക

കുറഞ്ഞത് ഇനിപ്പറയുന്നവ ഉൾക്കൊള്ളുന്ന unit test-കൾ `tests/unit/`-ൽ എഴുതുക:

- Provider രജിസ്ട്രേഷൻ
- Request/response പരിവർത്തനം
- പിശക് കൈകാര്യം ചെയ്യൽ

---

## Pull Request ചെക്ക്ലിസ്റ്റ്

- [ ] ടെസ്റ്റുകൾ വിജയിക്കുന്നു (`npm test`)
- [ ] Linting വിജയിക്കുന്നു (`npm run lint`)
- [ ] Build വിജയിക്കുന്നു (`npm run build`)
- [ ] പുതിയ പൊതു function-ുകൾക്കും interface-ുകൾക്കും TypeScript type-ുകൾ ചേർത്തിട്ടുണ്ട്
- [ ] Hardcode ചെയ്ത secret-ുകളോ fallback മൂല്യങ്ങളോ ഇല്ല
- [ ] പൊതു അപ്സ്ട്രീം ക്രെഡൻഷ്യലുകൾ `resolvePublicCred()` വഴി ഉൾച്ചേർത്തിട്ടുണ്ട് ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) കാണുക), ഒരിക്കലും literal-ുകളായി ഉൾപ്പെടുത്തിയിട്ടില്ല
- [ ] പിശക് response-ുകൾ `buildErrorBody()` / `sanitizeErrorMessage()` വഴി കടന്നുപോകുന്നു — response body-കളിൽ അസംസ്കൃത stack trace-ുകൾ ഇല്ല ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) കാണുക)
- [ ] Shell command-ുകൾ (`exec` / `spawn`) runtime മൂല്യങ്ങൾ string interpolation വഴിയല്ല, `env` വഴിയാണ് കൈമാറുന്നത്
- [ ] എല്ലാ input-ുകളും Zod schema-കൾ ഉപയോഗിച്ച് സാധൂകരിച്ചിട്ടുണ്ട്
- [ ] ഉപയോക്താവിനെ ബാധിക്കുന്ന മാറ്റങ്ങൾക്ക് `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md`-ന് കീഴിൽ changelog **fragment** ചേർത്തിട്ടുണ്ട് ([`changelog.d/README.md`](./changelog.d/README.md) കാണുക) — `CHANGELOG.md` നേരിട്ട് തിരുത്തരുത്; release സമയത്ത് fragment-ുകൾ സമാഹരിക്കപ്പെടുന്നതിനാൽ PR-ുകൾക്കിടയിൽ ഒരിക്കലും conflict ഉണ്ടാകില്ല
- [ ] ഡോക്യുമെന്റേഷൻ പുതുക്കിയിട്ടുണ്ട് (ബാധകമെങ്കിൽ)
- [ ] പുതിയ CodeQL / Secret-Scanning alert-ുകൾ തുറന്നിട്ടില്ല, അല്ലെങ്കിൽ പ്രസക്തമായ `docs/security/` ഡോക്യുമെന്റ് പരാമർശിക്കുന്ന സാങ്കേതിക ന്യായീകരണത്തോടെ ഓരോന്നും നിരസിച്ചിട്ടുണ്ട്
- [ ] Child process-ുകൾ spawn ചെയ്യുന്ന route-ുകൾ (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts`-ൽ `isLocalOnlyPath()` ആയി വർഗ്ഗീകരിച്ചിട്ടുണ്ട് — [Hard Rule #15](docs/security/ROUTE_GUARD_TIERS.md) കാണുക
- [ ] Commit സന്ദേശങ്ങളിൽ `Co-Authored-By` trailer-ുകൾ ഇല്ല — commit-ുകൾ repository ഉടമയുടെ Git identity-യിൽ മാത്രം ദൃശ്യമാകണം (Hard Rule #16)

---

## റിലീസ് ചെയ്യൽ

റിലീസുകൾ `/generate-release` വർക്ക്ഫ്ലോയിലൂടെ നിയന്ത്രിക്കുന്നു. ഒരു പുതിയ GitHub Release സൃഷ്ടിക്കുമ്പോൾ, GitHub Actions വഴി പാക്കേജ് **യാന്ത്രികമായി npm-ലേക്ക് പ്രസിദ്ധീകരിക്കപ്പെടുന്നു**.

VPS വിന്യാസങ്ങൾക്കായി, `npm run build` എന്നതിനുപകരം `npm run build:release` ഉപയോഗിക്കുക — ഇത് പൂർണ്ണമായി വൃത്തിയാക്കിയുള്ള
ഒരു പുനർനിർമ്മാണം നടത്തുകയും, ബണ്ടിൽ `dist/`-ൽ ക്രമീകരിക്കുകയും, `dist/BUILD_SHA` സെന്റിനൽ എഴുതുകയും ചെയ്യുന്നു.
തുടർന്ന് `dist/` വിദൂര `app/` ഡയറക്ടറിയിലേക്ക് rsync ചെയ്യുന്ന `/deploy-vps-*-cc` സ്കില്ലുകൾ ഉപയോഗിക്കുക.

---

## സഹായം ലഭിക്കാൻ

- **ആർക്കിടെക്ചർ**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) കാണുക
- **API റഫറൻസ്**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) കാണുക
- **സുരക്ഷാ ഡോക്യുമെന്റേഷൻ**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **ഓപ്പറേഷൻസ് ഡോക്യുമെന്റേഷൻ**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **പ്രശ്നങ്ങൾ**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: ആർക്കിടെക്ചറൽ തീരുമാന രേഖകൾക്കായി `docs/adr/` കാണുക
