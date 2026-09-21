# Contributing to OmniRoute (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

ଅବଦାନ ଦେବା ପ୍ରତି ଆପଣଙ୍କ ଆଗ୍ରହ ପାଇଁ ଧନ୍ୟବାଦ! ଆରମ୍ଭ କରିବା ପାଇଁ ଆପଣଙ୍କୁ ଯାହା ଆବଶ୍ୟକ, ଏହି ମାର୍ଗଦର୍ଶିକାରେ ସେସବୁ ଅନ୍ତର୍ଭୁକ୍ତ ଅଛି।

ପ୍ରତ୍ୟେକ ପରିବର୍ତ୍ତନ ପାଇଁ ଆଧିକାରିକ କାର୍ଯ୍ୟପ୍ରବାହ ନିମନ୍ତେ,
[ଅବଦାନର ସୁବର୍ଣ୍ଣ ପଥ](docs/ops/CONTRIBUTION_GOLDEN_PATH.md)ରୁ ଆରମ୍ଭ କରନ୍ତୁ। ଏହା provider, routing,
UI/UX, i18n, CLI, database, ଏବଂ build/deploy ପରିବର୍ତ୍ତନଗୁଡ଼ିକୁ ସେଗୁଡ଼ିକର କଣ୍ଟ୍ରାକ୍ଟ, କେନ୍ଦ୍ରିତ ପରୀକ୍ଷା, CI
କଭରେଜ୍, ଏବଂ ସମନ୍ୱୟ ପଦକ୍ଷେପ ସହିତ ମ୍ୟାପ୍ କରେ।

---

## ବିକାଶ ସେଟଅପ୍

### ପୂର୍ବାବଶ୍ୟକତା

- **Node.js** `>=22.22.3 <23`, କିମ୍ବା `>=24.0.0 <27` (ସୁପାରିସ୍: 24 LTS)
- **npm** 10+

> **npm v11+ ବ୍ୟବହାରକାରୀ (Node 24+):** `npm install` ପରେ, native modules ଇନଷ୍ଟଲ୍ ହୋଇଛି କି ନାହିଁ ଯାଞ୍ଚ କରନ୍ତୁ:
> `node -e "require('better-sqlite3')"`. ଯଦି ଏହା `MODULE_NOT_FOUND` ସହିତ ବିଫଳ ହୁଏ,
> `npm approve-scripts better-sqlite3 && npm install` ଚଲାନ୍ତୁ। ଦେଖନ୍ତୁ
> [ସମସ୍ୟା ସମାଧାନ](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)।

- **Git**

### କ୍ଲୋନ୍ ଏବଂ ଇନଷ୍ଟଲ୍

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### ପରିବେଶ ଭେରିଏବଲ୍

```bash
# ଟେମ୍ପଲେଟ୍ରୁ ଆପଣଙ୍କର .env ସୃଷ୍ଟି କରନ୍ତୁ
cp .env.example .env

# ଆବଶ୍ୟକୀୟ ଗୁପ୍ତ ମୂଲ୍ୟଗୁଡ଼ିକ ସୃଷ୍ଟି କରନ୍ତୁ
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

ବିକାଶ ପାଇଁ ପ୍ରମୁଖ ଭେରିଏବଲ୍ଗୁଡ଼ିକ:

| ଭେରିଏବଲ୍               | ବିକାଶ ଡିଫଲ୍ଟ             | ବର୍ଣ୍ଣନା               |
| ---------------------- | ------------------------ | ---------------------- |
| `PORT`                 | `20128`                  | ସର୍ଭର୍ ପୋର୍ଟ           |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | frontend ପାଇଁ ମୂଳ URL  |
| `JWT_SECRET`           | (ଉପରେ ସୃଷ୍ଟି କରନ୍ତୁ)     | JWT ସାଇନିଂ ଗୁପ୍ତ ମୂଲ୍ୟ |
| `INITIAL_PASSWORD`     | `CHANGEME`               | ପ୍ରଥମ login ପାସ୍ୱାର୍ଡ  |
| `APP_LOG_LEVEL`        | `info`                   | logର ବିସ୍ତୃତତା ସ୍ତର    |

### ଡ୍ୟାସବୋର୍ଡ ସେଟିଂସ୍

ପରିବେଶ ଭେରିଏବଲ୍ଗୁଡ଼ିକ ମାଧ୍ୟମରେ ମଧ୍ୟ ବିନ୍ୟାସ କରାଯାଇପାରୁଥିବା ବୈଶିଷ୍ଟ୍ୟଗୁଡ଼ିକ ପାଇଁ ଡ୍ୟାସବୋର୍ଡ UI ଟଗଲ୍ ପ୍ରଦାନ କରେ:

| ସେଟିଂର ଅବସ୍ଥାନ   | ଟଗଲ୍                | ବର୍ଣ୍ଣନା                               |
| ---------------- | ------------------- | -------------------------------------- |
| ସେଟିଂସ୍ → ଉନ୍ନତ  | ଡିବଗ୍ ମୋଡ୍          | ଡିବଗ୍ request logs (UI) ସକ୍ରିୟ କରନ୍ତୁ  |
| ସେଟିଂସ୍ → ସାଧାରଣ | ସାଇଡବାର୍ ଦୃଶ୍ୟମାନତା | ସାଇଡବାର୍ ବିଭାଗଗୁଡ଼ିକ ଦେଖାନ୍ତୁ/ଲୁଚାନ୍ତୁ |

ଏହି ସେଟିଂସ୍ଗୁଡ଼ିକ databaseରେ ସଂରକ୍ଷିତ ହୁଏ ଏବଂ restart ପରେ ମଧ୍ୟ ରହିଥାଏ; ସେଗୁଡ଼ିକ ସେଟ୍ କରାଯାଇଥିଲେ env varର ଡିଫଲ୍ଟ ମୂଲ୍ୟକୁ ଓଭର୍ରାଇଡ୍ କରେ।

### ସ୍ଥାନୀୟ ଭାବେ ଚଲାଇବା

```bash
# ବିକାଶ ମୋଡ୍ (ହଟ୍ ରିଲୋଡ୍)
npm run dev

# ପ୍ରଡକ୍ସନ୍ ବିଲ୍ଡ
npm run build    # next build → .build/next/ ତାପରେ assembleStandalone → dist/
npm run start

# ଅବଦାନକାରୀଙ୍କ ପରିବର୍ତ୍ତନ ପାଇଁ ଦ୍ରୁତ backend/API-ମାତ୍ର compile
npm run build:contributor

# ରିଲିଜ୍ ବିଲ୍ଡ (ପରିଷ୍କାର ପୁନଃବିଲ୍ଡ + HEAD sentinel — deploy ପାଇଁ ଆବଶ୍ୟକ)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA ଲେଖେ

# ସାଧାରଣ ପୋର୍ଟ ବିନ୍ୟାସ
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

ଅବଦାନକାରୀ build କେବଳ compile validation କରେ: ଏହା standalone
distribution assemble କରେ ନାହିଁ କିମ୍ବା ଇଚ୍ଛାଧୀନ native packaging assets build କରେ ନାହିଁ। ପଠାଯୋଗ୍ୟ bundleକୁ
validate କରିବା ଆବଶ୍ୟକ ହେଲେ ନିୟମିତ production build ବ୍ୟବହାର କରନ୍ତୁ।

### ବିଲ୍ଡ ଆଉଟପୁଟ୍ର ବିନ୍ୟାସ

| ଡିରେକ୍ଟୋରୀ | ବିଷୟବସ୍ତୁ                                                                            | ଟ୍ରାକ୍ କରାଯାଏ |
| ---------- | ------------------------------------------------------------------------------------ | ------------- |
| `src/`     | ଆପ୍ଲିକେସନ୍ ସୋର୍ସ (TypeScript / TSX)                                                  | ହଁ            |
| `.build/`  | ମଧ୍ୟବର୍ତ୍ତୀ ଫାଇଲ୍ଗୁଡ଼ିକ — `next build` ଆଉଟପୁଟ୍ (gitignored, `distDir = .build/next`) | ନା            |
| `dist/`    | ପଠାଯୋଗ୍ୟ bundle — `assembleStandalone` ଦ୍ୱାରା assemble କରାଯାଇଛି (gitignored)         | ନା            |

build pipeline ଏକକ passରେ ସମ୍ପନ୍ନ ହୁଏ:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js ଆଉଟପୁଟ୍)
  └─ assembleStandalone()                 (standalone + static + public + native assets କପି କରେ)
       └─ ଆଉଟପୁଟ୍: dist/                  (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` ଅତିରିକ୍ତ ଭାବେ ପ୍ରଥମେ ଉଭୟ ଡିରେକ୍ଟୋରୀକୁ ପରିଷ୍କାର କରେ ଏବଂ deploy integrity sentinel ଭାବରେ
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) ଲେଖେ।

`npm run build:contributor` backend-ମାତ୍ର build profile ବ୍ୟବହାର କରେ। ଏହା build କରିବା ସମୟରେ ଅସ୍ଥାୟୀ ଭାବେ
dashboard UI filesକୁ stub କରେ, API route handlersକୁ ରଖେ, ଏବଂ build ପରେ ମୂଳ filesକୁ
ପୁନଃସ୍ଥାପନ କରେ। dashboard UIକୁ ପ୍ରଭାବିତ କରୁଥିବା ପରିବର୍ତ୍ତନ କିମ୍ବା ସମ୍ପୂର୍ଣ୍ଣ
release validation ପାଇଁ `npm run build` ବ୍ୟବହାର କରନ୍ତୁ; contributor profile release buildର ବିକଳ୍ପ ନୁହେଁ।

> **VPS deploy ଟିପ୍ପଣୀ:** remote image directory `/usr/lib/node_modules/omniroute/app/`
> ଅପରିବର୍ତ୍ତିତ ରହିଛି। deploy skills `dist/`ର ବିଷୟବସ୍ତୁକୁ ଏହା ଭିତରକୁ rsync କରେ।
> କେବଳ repository ଭିତରେ ଥିବା build output path ପରିବର୍ତ୍ତିତ ହୋଇଛି (`app/` → `dist/`)।

ଡିଫଲ୍ଟ URLଗୁଡ଼ିକ:

- **ଡ୍ୟାସବୋର୍ଡ**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git କାର୍ଯ୍ୟପ୍ରବାହ

> ⚠️ **କେବେବି ସିଧାସଳଖ `main`କୁ commit କରନ୍ତୁ ନାହିଁ।** ସର୍ବଦା feature branch ବ୍ୟବହାର କରନ୍ତୁ।
>
> **PR ଆଧାର:** ସକ୍ରିୟ `release/vX.Y.Z` branchକୁ target କରନ୍ତୁ (`main`କୁ ନୁହେଁ)। ପ୍ରତ୍ୟେକ branch ପାଇଁ release + ship ସମୟରେ tag ମଡେଲ୍ ବିଷୟରେ
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) ଦେଖନ୍ତୁ।

```bash
# ସକ୍ରିୟ releaseର ଶେଷ tipରୁ branch ତିଆରି କରନ୍ତୁ (ଉଦାହରଣ: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... ପରିବର୍ତ୍ତନ କରନ୍ତୁ ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 ସହିତ ଏକ Pull Request ଖୋଲନ୍ତୁ
```

### Branch ନାମକରଣ

| Prefix      | ଉଦ୍ଦେଶ୍ୟ                 |
| ----------- | ------------------------ |
| `feat/`     | ନୂତନ feature             |
| `fix/`      | Bug ସମାଧାନ               |
| `refactor/` | Code ପୁନର୍ଗଠନ            |
| `docs/`     | Documentation ପରିବର୍ତ୍ତନ |
| `test/`     | Test ଯୋଗ/ସମାଧାନ          |
| `chore/`    | Tooling, CI, dependency  |

### Commit ବାର୍ତ୍ତା

[Conventional Commits](https://www.conventionalcommits.org/) ଅନୁସରଣ କରନ୍ତୁ:

```
feat: provider call ପାଇଁ circuit breaker ଯୋଗ କରନ୍ତୁ
fix: JWT secret validationର edge case ସମାଧାନ କରନ୍ତୁ
docs: PII ସୁରକ୍ଷା ସହିତ SECURITY.md ଅଦ୍ୟତନ କରନ୍ତୁ
test: observability unit test ଯୋଗ କରନ୍ତୁ
refactor(db): rate limit tableଗୁଡ଼ିକୁ ଏକତ୍ର କରନ୍ତୁ
```

Scopeଗୁଡ଼ିକ (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`।

---

## Test ଚଲାଇବା

```bash
# ସମସ୍ତ test (unit + vitest + ecosystem + e2e)
npm run test:all

# ଗୋଟିଏ test file (Node.js native test runner — ଅଧିକାଂଶ test ଏହାକୁ ବ୍ୟବହାର କରେ)
node --import tsx/esm --test tests/unit/your-file.test.ts

# କେବଳ ଆପଣଙ୍କ ପରିବର୍ତ୍ତନରେ ପ୍ରଭାବିତ unit testଗୁଡ଼ିକ (CI gate ପରି ସମାନ TIA selector, #8084)
npm run test:scoped            # ଶେଷ commitରେ (କିମ୍ବା working treeରେ) ହୋଇଥିବା ପରିବର୍ତ୍ତନ
npm run test:scoped:staged     # କେବଳ staged ପରିବର୍ତ୍ତନ — pre-commit run ସହିତ ଭଲ ଭାବରେ କାମ କରେ
npm run test:scoped:full       # ପ୍ରଥମେ import-graph map ପୁନଃନିର୍ମାଣ କରନ୍ତୁ (file ଯୋଗ/ସ୍ଥାନାନ୍ତର କରିବା ପରେ)
# Exit 1 + "ସମ୍ପୂର୍ଣ୍ଣ suite ଚଲାନ୍ତୁ"ର ଅର୍ଥ ହେଉଛି ଏକ hub file (tsconfig, package.json, …) କିମ୍ବା ଏକ
# map ହୋଇନଥିବା source ପରିବର୍ତ୍ତିତ ହୋଇଛି — selector ସୁରକ୍ଷିତ ଭାବେ ବିଫଳ ହୁଏ, ଏହା କେବେବି ନିରବରେ ଛାଡ଼ିଯାଏ ନାହିଁ।

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E test (Playwright ଆବଶ୍ୟକ)
npm run test:e2e

# Protocol client E2E (MCP transport, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility test
npm run test:ecosystem

# Coverage gate: statement/line/function/branch ପାଇଁ 60%
npm run test:coverage
npm run coverage:report

# Lint + format ଯାଞ୍ଚ
npm run lint
npm run check

# Gate ଦ୍ୱାରା ନିୟନ୍ତ୍ରିତ real-upstream combo smoke (VPS access + ପ୍ରକୃତ provider credit ଆବଶ୍ୟକ)
# ପ୍ରକୃତ providerଗୁଡ଼ିକୁ hit କରେ — ଅଳ୍ପ ଖର୍ଚ୍ଚ ହୁଏ। CIରେ କେବେବି ଚାଲେ ନାହିଁ। Gate ନଥିଲେ ସ୍ୱଚ୍ଛ ଭାବରେ skip କରେ।
# ଆବଶ୍ୟକ: ssh root@192.168.0.15 access (VPSରୁ ଏକ read-only DB snapshot source କରେ)।
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — ସରଳ Node ESM script, live .15 serverକୁ ସିଧାସଳଖ hit କରେ।
# ଆବଶ୍ୟକ: ssh root@192.168.0.15 access (SSH sqlite ମାଧ୍ୟମରେ combo ତିଆରି/ଅପସାରଣ କରାଯାଏ)।
# ପ୍ରକୃତ providerଗୁଡ଼ିକୁ hit କରେ (ଅଳ୍ପ ଖର୍ଚ୍ଚ)। କେବଳ __live_test__* combo ତିଆରି/ବିଲୋପ କରେ। CIରେ କେବେବି ଚାଲେ ନାହିଁ।
# .15ରେ REQUIRE_API_KEY=false ଥିବାରୁ API key ଆବଶ୍ୟକ ନୁହେଁ, କିନ୍ତୁ ସେଟ୍ ହୋଇଥିଲେ COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEYକୁ ସମ୍ମାନ କରେ।
npm run test:combo:live:vps              # 7ଟି HTTP scenario (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # ଏକ ପ୍ରକୃତ cross-provider failover scenario ଯୋଗ କରେ (ମୋଟ 8ଟି)
```

Coverage ଟିପ୍ପଣୀ:

- `npm run test:coverage` ମୁଖ୍ୟ unit test suite ପାଇଁ source coverage ମାପେ, `tests/**`କୁ ବାଦ ଦିଏ ଏବଂ `open-sse/**`କୁ ସାମିଲ କରେ
- Pull requestଗୁଡ଼ିକରେ statement/line/function/branch ପାଇଁ coverage gate **60%+** ରହିବା ଆବଶ୍ୟକ
- ଯଦି ଏକ PR `src/`, `open-sse/`, `electron/`, କିମ୍ବା `bin/`ର production code ପରିବର୍ତ୍ତନ କରେ, ତେବେ ସେହି PRରେ automated test ଯୋଗ କିମ୍ବା ଅଦ୍ୟତନ କରିବା ଆବଶ୍ୟକ
- `npm run coverage:report` ସର୍ବଶେଷ coverage runରୁ ବିସ୍ତୃତ file-by-file report print କରେ
- `npm run test:coverage:legacy` ଐତିହାସିକ ତୁଳନା ପାଇଁ ପୁରୁଣା metricକୁ ସଂରକ୍ଷିତ ରଖେ
- ପର୍ଯ୍ୟାୟଭିତ୍ତିକ coverage ଉନ୍ନତି roadmap ପାଇଁ `docs/ops/COVERAGE_PLAN.md` ଦେଖନ୍ତୁ

### Pull Request ଆବଶ୍ୟକତା

ଏକ PR ଖୋଲିବା ପୂର୍ବରୁ, ଆପଣ ଯାହା ପରିବର୍ତ୍ତନ କରିଛନ୍ତି ତାହା ପାଇଁ focused loop ଚଲାଇବାକୁ
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) ବ୍ୟବହାର କରନ୍ତୁ। ସମ୍ପୂର୍ଣ୍ଣ unit suite (4ଟି CI shard), Vitest, **60%+** coverage gate ଏବଂ
production build ହେଉଛି CIର ଦାୟିତ୍ୱ — ସେଗୁଡ଼ିକୁ ସ୍ଥାନୀୟ ଭାବେ ଚଲାଇଲେ PR
ଯାଞ୍ଚରୁ ପୂର୍ବରୁ ନ ମିଳିବା ଭଳି କୌଣସି ଅତିରିକ୍ତ ସଙ୍କେତ ମିଳେ ନାହିଁ, ଏବଂ ଛୋଟ machineରେ ଏହା hostକୁ ଅତ୍ୟଧିକ ବ୍ୟସ୍ତ କରିପାରେ (#8084):

- ଆପଣଙ୍କ ପରିବର୍ତ୍ତନକୁ cover କରୁଥିବା test fileଗୁଡ଼ିକ ଚଲାନ୍ତୁ: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` ଚଲାନ୍ତୁ
- Production code ପରିବର୍ତ୍ତିତ ହେଲେ ସେହି PRରେ automated test ଯୋଗ କିମ୍ବା ଅଦ୍ୟତନ କରନ୍ତୁ
- Production code ପରିବର୍ତ୍ତିତ ହେଲେ PR descriptionରେ ପରିବର୍ତ୍ତିତ କିମ୍ବା ଯୋଗ କରାଯାଇଥିବା test fileଗୁଡ଼ିକ ସାମିଲ କରନ୍ତୁ
- CIରେ project secretଗୁଡ଼ିକ configure ହୋଇଥିଲେ PRରେ SonarQube result ଯାଞ୍ଚ କରନ୍ତୁ

ବର୍ତ୍ତମାନର test ସ୍ଥିତି: **122ଟି unit test file**, ଯେଉଁଗୁଡ଼ିକ ଏସବୁକୁ cover କରେ:

- Provider translator ଏବଂ format conversion
- Rate limiting, circuit breaker ଏବଂ resilience
- Semantic cache, idempotency ଏବଂ progress tracking
- Database operation ଏବଂ schema (21ଟି DB module)
- OAuth flow ଏବଂ authentication
- API endpoint validation (Zod v4)
- MCP server tool ଏବଂ scope enforcement
- Memory ଏବଂ Skills system

---

## କୋଡ୍ ଶୈଳୀ

- **ESLint** — କମିଟ୍ କରିବା ପୂର୍ବରୁ `npm run lint` ଚଲାନ୍ତୁ
- **Prettier** — କମିଟ୍ ସମୟରେ `lint-staged` ମାଧ୍ୟମରେ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଫର୍ମାଟ୍ ହୁଏ (2ଟି ସ୍ପେସ୍, ସେମିକୋଲନ୍, ଡବଲ୍ କୋଟ୍, 100 ଅକ୍ଷର ପ୍ରସ୍ଥ, es5 ଟ୍ରେଲିଂ କମା)
- **TypeScript** — ସମସ୍ତ `src/` କୋଡ୍ `.ts`/`.tsx` ବ୍ୟବହାର କରେ; `open-sse/` `.ts`/`.js` ବ୍ୟବହାର କରେ; TSDoc (`@param`, `@returns`, `@throws`) ସହିତ ଡକ୍ୟୁମେଣ୍ଟ୍ କରନ୍ତୁ
- **`eval()` ନାହିଁ** — ESLint `no-eval`, `no-implied-eval`, `no-new-func`କୁ ବାଧ୍ୟତାମୂଳକ କରେ
- **Zod ବୈଧତା ଯାଞ୍ଚ** — ସମସ୍ତ API ଇନପୁଟ୍ ବୈଧତା ଯାଞ୍ଚ ପାଇଁ Zod v4 ସ୍କିମା ବ୍ୟବହାର କରନ୍ତୁ
- **ନାମକରଣ**: ଫାଇଲ୍ = camelCase/kebab-case, କମ୍ପୋନେଣ୍ଟ୍ = PascalCase, କନଷ୍ଟାଣ୍ଟ୍ = UPPER_SNAKE

### ତ୍ରୁଟି ପରିଚାଳନା / ଖାଲି catch ବ୍ଲକ୍

କୌଣସି `catch`କୁ ବ୍ୟାଖ୍ୟା ବିନା କେବେ ମଧ୍ୟ ଛାଡ଼ନ୍ତୁ ନାହିଁ। ଏହାକୁ ଦୁଇଟି ଶ୍ରେଣୀ ମଧ୍ୟରୁ ଗୋଟିଏରେ ବର୍ଗୀକୃତ କରନ୍ତୁ (ଏହା
"SSE ଷ୍ଟ୍ରିମ୍ରେ କେବେ ମଧ୍ୟ ନିରବରେ ତ୍ରୁଟିଗୁଡ଼ିକୁ ଅଣଦେଖା କରନ୍ତୁ ନାହିଁ" କଠୋର ନିୟମକୁ କାର୍ଯ୍ୟକାରୀ କରେ):

- **ଉଦ୍ଦେଶ୍ୟମୂଳକ (ଆମର ନିଜସ୍ୱ ସର୍ବୋତ୍ତମ-ପ୍ରୟାସ କ୍ଲିନଅପ୍/ଟେଲିମେଟ୍ରି)** — ଏଠାରେ ବିଫଳତା ଆଶାକରାଯାଏ ଏବଂ
  କ୍ଷତିହୀନ; ଗୋଟିଏ ଧାଡ଼ିରେ କାରଣ ସୂଚକ କମେଣ୍ଟ୍ ଯୋଡ଼ନ୍ତୁ, କୌଣସି ଲଗିଂ କରନ୍ତୁ ନାହିଁ (ପ୍ରତ୍ୟେକ ଅନୁରୋଧରେ ଲଗିଂ କରିବାରୁ ସୃଷ୍ଟି ହେଉଥିବା
  ଅନାବଶ୍ୟକ କୋଳାହଳକୁ ଏହି ପ୍ରଥା ଏଡ଼ାଇଥାଏ)।

  ```ts
  } catch {} // କ୍ଲାଏଣ୍ଟ୍ ସଂଯୋଗ ବିଚ୍ଛିନ୍ନ ହେବା ପରେ ପୂର୍ବରୁ ବନ୍ଦ ଥିବା କଣ୍ଟ୍ରୋଲର୍କୁ ବନ୍ଦ କରିବା ଆଶାକରାଯାଏ
  ```

- **ଲଗ୍ କରିବା ଉଚିତ (ବାହ୍ୟ/କଲର୍-ଯୋଗାଇଥିବା କୋଡ୍, କିମ୍ବା ଅଣଦେଖା କରିବା ଦ୍ୱାରା ନିୟନ୍ତ୍ରଣ ପ୍ରବାହ ପରିବର୍ତ୍ତିତ ହେଲେ)** — `catch`କୁ ରଖନ୍ତୁ
  (ଏହାକୁ କେବେ ମଧ୍ୟ ଷ୍ଟ୍ରିମ୍କୁ ଭଙ୍ଗ କରିବାକୁ ଦିଅନ୍ତୁ ନାହିଁ), କିନ୍ତୁ ଏକ ପ୍ରସଙ୍ଗଯୁକ୍ତ `console.debug`/`warn` ନିର୍ଗତ କରନ୍ତୁ, ଯାହାଦ୍ୱାରା
  ବିଫଳତା ଚିହ୍ନଟ କରାଯାଇପାରିବ।

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure କଲ୍ବ୍ୟାକ୍ ତ୍ରୁଟି:", e);
  }
  ```

ପ୍ରୟୋଗ ହୋଇଥିବା ଉଦାହରଣଗୁଡ଼ିକ ପାଇଁ `open-sse/utils/stream.ts` ଏବଂ `open-sse/utils/streamHandler.ts` ଦେଖନ୍ତୁ।

---

## ପ୍ରକଳ୍ପ ସଂରଚନା

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # ଡ୍ୟାସବୋର୍ଡ ପୃଷ୍ଠାଗୁଡ଼ିକ (23ଟି ବିଭାଗ)
│   ├── api/                # API ରୁଟ୍ଗୁଡ଼ିକ (51ଟି ଡିରେକ୍ଟୋରି)
│   └── login/              # ପ୍ରମାଣୀକରଣ ପୃଷ୍ଠାଗୁଡ଼ିକ (.tsx)
├── domain/                 # ପଲିସି ଇଞ୍ଜିନ୍ (policyEngine, comboResolver, costRules, ଇତ୍ୟାଦି)
├── lib/                    # ମୂଳ ବ୍ୟବସାୟିକ ତର୍କ (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 ପ୍ରୋଟୋକଲ୍ ସର୍ଭର୍
│   ├── acp/                # Agent Communication Protocol ରେଜିଷ୍ଟ୍ରି
│   ├── compliance/         # ଅନୁପାଳନ ପଲିସି ଇଞ୍ଜିନ୍
│   ├── db/                 # SQLite ଡୋମେନ୍ ମଡ୍ୟୁଲ୍ + 130ଟି ମାଇଗ୍ରେସନ୍
│   ├── memory/             # ସ୍ଥାୟୀ ବାର୍ତ୍ତାଳାପ ସ୍ମୃତି
│   ├── oauth/              # OAuth ପ୍ରଦାନକାରୀ, ସେବା ଏବଂ ଉପଯୋଗିତା
│   ├── skills/             # ବିସ୍ତାରଯୋଗ୍ୟ ଦକ୍ଷତା ଫ୍ରେମୱାର୍କ
│   ├── usage/              # ବ୍ୟବହାର ଟ୍ରାକିଂ ଏବଂ ଖର୍ଚ୍ଚ ଗଣନା
│   └── localDb.ts          # କେବଳ ପୁନଃ-ରପ୍ତାନି ସ୍ତର — ଏଠାରେ କେବେ ମଧ୍ୟ ତର୍କ ଯୋଡ଼ନ୍ତୁ ନାହିଁ
├── middleware/              # ଅନୁରୋଧ ମିଡଲୱେୟାର୍ (promptInjectionGuard)
├── mitm/                   # MITM ପ୍ରକ୍ସି (ସାର୍ଟିଫିକେଟ୍, DNS, ଲକ୍ଷ୍ୟ ରାଉଟିଂ)
├── shared/
│   ├── components/         # React କମ୍ପୋନେଣ୍ଟ୍ଗୁଡ଼ିକ (.tsx)
│   ├── constants/          # ପ୍ରଦାନକାରୀ ସଂଜ୍ଞାଗୁଡ଼ିକ (329), MCP ସ୍କୋପ୍, 19ଟି ରାଉଟିଂ କୌଶଳ
│   ├── utils/              # ସର୍କିଟ୍ ବ୍ରେକର୍, ସାନିଟାଇଜର୍, ପ୍ରମାଣୀକରଣ ସହାୟକ
│   └── validation/         # Zod v4 ସ୍କିମା
└── sse/                    # SSE ପ୍ରକ୍ସି ପାଇପଲାଇନ୍

open-sse/                   # @omniroute/open-sse ୱର୍କସ୍ପେସ୍
├── executors/              # 89ଟି ଏକ୍ଜିକ୍ୟୁଟର୍ କାର୍ଯ୍ୟାନ୍ୱୟନ ମଡ୍ୟୁଲ୍
├── handlers/               # 11ଟି ଅନୁରୋଧ ହ୍ୟାଣ୍ଡଲର୍ (ଚାଟ୍, ରେସ୍ପନ୍ସ, ଏମ୍ବେଡିଂ, ଛବି, ଇତ୍ୟାଦି)
├── mcp-server/             # MCP ସର୍ଭର୍ (110ଟି ଅନନ୍ୟ ଟୁଲ୍, 3ଟି ଟ୍ରାନ୍ସପୋର୍ଟ୍, 33ଟି ସ୍କୋପ୍)
├── services/               # 178ଟି ଶୀର୍ଷ-ସ୍ତରୀୟ ସେବା (combo, autoCombo, rateLimitManager, ଇତ୍ୟାଦି)
├── translator/             # ଫର୍ମାଟ୍ ଅନୁବାଦକ (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API ଟ୍ରାନ୍ସଫର୍ମର୍
└── utils/                  # 22ଟି ଉପଯୋଗିତା ମଡ୍ୟୁଲ୍ (ଷ୍ଟ୍ରିମ୍, TLS, ପ୍ରକ୍ସି, ଲଗିଂ)

electron/                   # Electron ଡେସ୍କଟପ୍ ଆପ୍ (କ୍ରସ୍-ପ୍ଲାଟଫର୍ମ)

tests/
├── unit/                   # Node.js ପରୀକ୍ଷଣ ରନର୍ (1,574ଟି ପରୀକ୍ଷଣ ଫାଇଲ୍)
├── integration/            # ଇଣ୍ଟିଗ୍ରେସନ୍ ପରୀକ୍ଷଣ
├── e2e/                    # Playwright ପରୀକ୍ଷଣ
├── security/               # ସୁରକ୍ଷା ପରୀକ୍ଷଣ
├── translator/             # ଅନୁବାଦକ-ନିର୍ଦ୍ଦିଷ୍ଟ ପରୀକ୍ଷଣ
└── load/                   # ଲୋଡ୍ ପରୀକ୍ଷଣ

docs/
├── adr/                     # ସ୍ଥାପତ୍ୟ ନିଷ୍ପତ୍ତି ରେକର୍ଡ
├── architecture/            # ସିଷ୍ଟମ୍ ସ୍ଥାପତ୍ୟ ଏବଂ ସ୍ଥିତିସ୍ଥାପକତା
├── comparison/              # OmniRoute ବନାମ ବିକଳ୍ପଗୁଡ଼ିକ
├── compression/             # କମ୍ପ୍ରେସନ୍ ମାର୍ଗଦର୍ଶିକା ଏବଂ ନିୟମ
├── dev/                     # ବିକାଶ ମାର୍ଗଦର୍ଶିକା
├── diagrams/                # ସ୍ଥାପତ୍ୟ ଚିତ୍ର
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # ବ୍ୟବହାରକାରୀ ମାର୍ଗଦର୍ଶିକା, Docker, ସେଟଅପ୍, ସମସ୍ୟା ନିବାରଣ
├── i18n/                    # ଆନ୍ତର୍ଜାତୀୟକୃତ README ଅନୁବାଦ
├── marketing/               # ବିପଣନ ସାମଗ୍ରୀ
├── ops/                     # ଡିପ୍ଲୟମେଣ୍ଟ୍, ପ୍ରକ୍ସି, କଭରେଜ୍, ରିଲିଜ୍
├── providers/               # ପ୍ରଦାନକାରୀ-ନିର୍ଦ୍ଦିଷ୍ଟ ଡକ୍ୟୁମେଣ୍ଟ୍
├── reference/               # API ସନ୍ଦର୍ଭ, env vars, CLI ଟୁଲ୍, ମାଗଣା ସ୍ତର
├── releases/                # ରିଲିଜ୍ ଟିପ୍ପଣୀ
├── routing/                 # ଅଟୋ-କମ୍ବୋ ଇଞ୍ଜିନ୍, ଯୁକ୍ତି ପୁନଃଚାଳନ
├── screenshots/             # ଡ୍ୟାସବୋର୍ଡ ସ୍କ୍ରିନ୍ଶଟ୍
├── security/                # ଗାର୍ଡରେଲ୍, ଅନୁପାଳନ, ଗୋପନୀୟତା, ଟୋକେନ୍
└── specs/                   # ଡିଜାଇନ୍ ନିର୍ଦ୍ଦିଷ୍ଟକରଣ
```

---

## ଏକ ନୂତନ ପ୍ରଦାତା ଯୋଡ଼ିବା

### ପଦକ୍ଷେପ 1: ପ୍ରଦାତା ସ୍ଥିରାଙ୍କଗୁଡ଼ିକ ପଞ୍ଜୀକରଣ କରନ୍ତୁ

`src/shared/constants/providers.ts`ରେ ଯୋଡ଼ନ୍ତୁ — ମଡ୍ୟୁଲ୍ ଲୋଡ୍ ସମୟରେ Zod ଦ୍ୱାରା ବୈଧତା ଯାଞ୍ଚ କରାଯାଏ।

### ପଦକ୍ଷେପ 2: ଏକ୍ସିକ୍ୟୁଟର୍ ଯୋଡ଼ନ୍ତୁ (ଯଦି କଷ୍ଟମ୍ ଲଜିକ୍ ଆବଶ୍ୟକ)

ମୂଳ ଏକ୍ସିକ୍ୟୁଟର୍କୁ ବିସ୍ତାର କରି `open-sse/executors/your-provider.ts`ରେ ଏକ୍ସିକ୍ୟୁଟର୍ ତିଆରି କରନ୍ତୁ।

### ପଦକ୍ଷେପ 3: ଅନୁବାଦକ ଯୋଡ଼ନ୍ତୁ (ଯଦି ଫର୍ମାଟ୍ OpenAI ନୁହେଁ)

`open-sse/translator/`ରେ ଅନୁରୋଧ/ପ୍ରତିକ୍ରିୟା ଅନୁବାଦକ ତିଆରି କରନ୍ତୁ।

### ପଦକ୍ଷେପ 4: OAuth କନ୍ଫିଗ୍ ଯୋଡ଼ନ୍ତୁ (ଯଦି OAuth-ଆଧାରିତ)

`src/lib/oauth/constants/oauth.ts`ରେ OAuth ପରିଚୟପତ୍ର ଏବଂ `src/lib/oauth/services/`ରେ ସେବା ଯୋଡ଼ନ୍ତୁ।

ଯଦି ଅପ୍ଷ୍ଟ୍ରିମ୍ ପ୍ରଦାତା ନିଜର ସାର୍ବଜନୀନ CLI / ବ୍ରାଉଜର୍ ବଣ୍ଡଲ୍ ଭିତରେ ଏକ ସାର୍ବଜନୀନ OAuth client_id/ଗୁପ୍ତ ତଥ୍ୟ କିମ୍ବା Firebase Web API କୀ ବିତରଣ କରେ, ତେବେ ଏହାକୁ ଏକ ଷ୍ଟ୍ରିଙ୍ଗ୍ ଲିଟେରାଲ୍ ଭାବେ ଏମ୍ବେଡ୍ **କରନ୍ତୁ ନାହିଁ**। `open-sse/utils/publicCreds.ts`ରୁ `resolvePublicCred()` ବ୍ୟବହାର କରନ୍ତୁ ଏବଂ `EMBEDDED_DEFAULTS`ରେ ଏକ ମାସ୍କ୍ କରାଯାଇଥିବା ବାଇଟ୍ ଏଣ୍ଟ୍ରି ଯୋଡ଼ନ୍ତୁ। ସମ୍ପୂର୍ଣ୍ଣ ବାଧ୍ୟତାମୂଳକ କାର୍ଯ୍ୟପ୍ରବାହ [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)ରେ ଲିପିବଦ୍ଧ ହୋଇଛି।

ହ୍ୟାଣ୍ଡଲର୍/ଏକ୍ସିକ୍ୟୁଟର୍ଗୁଡ଼ିକ ଭିତରେ, କ୍ଲାଏଣ୍ଟ୍କୁ ପହଞ୍ଚୁଥିବା ତ୍ରୁଟି ସନ୍ଦେଶଗୁଡ଼ିକ `open-sse/utils/error.ts`ର `buildErrorBody()` / `sanitizeErrorMessage()` ମାଧ୍ୟମରେ ଯିବା ଆବଶ୍ୟକ — କୌଣସି Response ବଡିରେ କଞ୍ଚା `err.stack` କିମ୍ବା `err.message` କେବେବି ରଖନ୍ତୁ ନାହିଁ। [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) ଦେଖନ୍ତୁ।

### ପଦକ୍ଷେପ 5: ମଡେଲ୍ଗୁଡ଼ିକ ପଞ୍ଜୀକରଣ କରନ୍ତୁ

`open-sse/config/providerRegistry.ts`ରେ ମଡେଲ୍ ସଂଜ୍ଞାଗୁଡ଼ିକ ଯୋଡ଼ନ୍ତୁ।

### ପଦକ୍ଷେପ 6: ପରୀକ୍ଷାଗୁଡ଼ିକ ଯୋଡ଼ନ୍ତୁ

ଅତି କମ୍ରେ ନିମ୍ନଲିଖିତ ବିଷୟଗୁଡ଼ିକୁ ଅନ୍ତର୍ଭୁକ୍ତ କରି `tests/unit/`ରେ ୟୁନିଟ୍ ପରୀକ୍ଷା ଲେଖନ୍ତୁ:

- ପ୍ରଦାତା ପଞ୍ଜୀକରଣ
- ଅନୁରୋଧ/ପ୍ରତିକ୍ରିୟା ଅନୁବାଦ
- ତ୍ରୁଟି ପରିଚାଳନା

---

## ପୁଲ୍ ରିକ୍ୱେଷ୍ଟ୍ ଯାଞ୍ଚତାଲିକା

- [ ] ପରୀକ୍ଷାଗୁଡ଼ିକ ସଫଳ ହୁଏ (`npm test`)
- [ ] ଲିଣ୍ଟିଂ ସଫଳ ହୁଏ (`npm run lint`)
- [ ] ବିଲ୍ଡ୍ ସଫଳ ହୁଏ (`npm run build`)
- [ ] ନୂତନ ସାର୍ବଜନୀନ ଫଙ୍କସନ୍ ଏବଂ ଇଣ୍ଟରଫେସ୍ଗୁଡ଼ିକ ପାଇଁ TypeScript ପ୍ରକାର ଯୋଡ଼ାଯାଇଛି
- [ ] କୌଣସି ହାର୍ଡକୋଡ୍ କରାଯାଇଥିବା ଗୁପ୍ତ ତଥ୍ୟ କିମ୍ବା ଫଲ୍ବ୍ୟାକ୍ ମୂଲ୍ୟ ନାହିଁ
- [ ] ସାର୍ବଜନୀନ ଅପ୍ଷ୍ଟ୍ରିମ୍ ପରିଚୟପତ୍ରଗୁଡ଼ିକ `resolvePublicCred()` ମାଧ୍ୟମରେ ଏମ୍ବେଡ୍ କରାଯାଇଛି ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ଦେଖନ୍ତୁ), କେବେବି ଲିଟେରାଲ୍ ଭାବେ ନୁହେଁ
- [ ] ତ୍ରୁଟି ପ୍ରତିକ୍ରିୟାଗୁଡ଼ିକ `buildErrorBody()` / `sanitizeErrorMessage()` ମାଧ୍ୟମରେ ଯାଏ — ପ୍ରତିକ୍ରିୟା ବଡିଗୁଡ଼ିକରେ କୌଣସି କଞ୍ଚା ଷ୍ଟାକ୍ ଟ୍ରେସ୍ ନାହିଁ ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) ଦେଖନ୍ତୁ)
- [ ] ଶେଲ୍ କମାଣ୍ଡ୍ଗୁଡ଼ିକ (`exec` / `spawn`) ଷ୍ଟ୍ରିଙ୍ଗ୍ ଇଣ୍ଟରପୋଲେସନ୍ ମାଧ୍ୟମରେ ନୁହେଁ, `env` ମାଧ୍ୟମରେ ରନ୍ଟାଇମ୍ ମୂଲ୍ୟଗୁଡ଼ିକ ପାସ୍ କରେ
- [ ] ସମସ୍ତ ଇନ୍ପୁଟ୍ Zod ସ୍କିମାଗୁଡ଼ିକ ସହିତ ବୈଧତା ଯାଞ୍ଚ କରାଯାଇଛି
- [ ] ବ୍ୟବହାରକାରୀଙ୍କୁ ପ୍ରଭାବିତ କରୁଥିବା ପରିବର୍ତ୍ତନ ପାଇଁ `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` ଅଧୀନରେ Changelog **ଖଣ୍ଡ** ଯୋଡ଼ାଯାଇଛି ([`changelog.d/README.md`](./changelog.d/README.md) ଦେଖନ୍ତୁ) — `CHANGELOG.md`କୁ ସିଧାସଳଖ ସମ୍ପାଦନା **କରନ୍ତୁ ନାହିଁ**; ଖଣ୍ଡଗୁଡ଼ିକ ରିଲିଜ୍ ସମୟରେ ଏକତ୍ରିତ କରାଯାଏ ଏବଂ PRଗୁଡ଼ିକ ମଧ୍ୟରେ କେବେବି ବିବାଦ ସୃଷ୍ଟି କରେ ନାହିଁ
- [ ] ଡକ୍ୟୁମେଣ୍ଟେସନ୍ ଅଦ୍ୟତନ କରାଯାଇଛି (ଯଦି ପ୍ରଯୁଜ୍ୟ)
- [ ] କୌଣସି ନୂତନ CodeQL / Secret-Scanning ସତର୍କତା ଖୋଲାଯାଇନାହିଁ, କିମ୍ବା ପ୍ରତ୍ୟେକଟିକୁ ସମ୍ପର୍କିତ `docs/security/` ଡକ୍ୟୁମେଣ୍ଟ୍ ଉଲ୍ଲେଖ କରୁଥିବା ବୈଷୟିକ ଯଥାର୍ଥତା ସହିତ ଖାରଜ କରାଯାଇଛି
- [ ] ଚାଇଲ୍ଡ୍ ପ୍ରୋସେସ୍ ଆରମ୍ଭ କରୁଥିବା ରୁଟ୍ଗୁଡ଼ିକ (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts`ରେ `isLocalOnlyPath()` ଭାବେ ଶ୍ରେଣୀଭୁକ୍ତ କରାଯାଇଛି — [କଠୋର ନିୟମ #15](docs/security/ROUTE_GUARD_TIERS.md) ଦେଖନ୍ତୁ
- [ ] କମିଟ୍ ସନ୍ଦେଶଗୁଡ଼ିକରେ କୌଣସି `Co-Authored-By` ଟ୍ରେଲର୍ ନାହିଁ — କମିଟ୍ଗୁଡ଼ିକ କେବଳ ରିପୋଜିଟୋରି ମାଲିକଙ୍କ Git ପରିଚୟ ଅଧୀନରେ ଦେଖାଯିବା ଆବଶ୍ୟକ (କଠୋର ନିୟମ #16)

---

## ରିଲିଜ୍ କରିବା

ରିଲିଜ୍ଗୁଡ଼ିକ `/generate-release` ୱର୍କଫ୍ଲୋ ମାଧ୍ୟମରେ ପରିଚାଳିତ ହୁଏ। ଏକ ନୂତନ GitHub Release ସୃଷ୍ଟି ହେଲେ, ପ୍ୟାକେଜ୍ଟି GitHub Actions ମାଧ୍ୟମରେ **ସ୍ୱୟଂଚାଳିତ ଭାବେ npm ରେ ପ୍ରକାଶିତ ହୁଏ**।

VPS ଡିପ୍ଲୟମେଣ୍ଟ ପାଇଁ, `npm run build` ପରିବର୍ତ୍ତେ `npm run build:release` ବ୍ୟବହାର କରନ୍ତୁ — ଏହା ଏକ ସ୍ୱଚ୍ଛ
ପୁନଃବିଲ୍ଡ କରେ, ବଣ୍ଡଲ୍କୁ `dist/` ମଧ୍ୟରେ ଏକତ୍ର କରେ ଏବଂ `dist/BUILD_SHA` ସେଣ୍ଟିନେଲ୍ ଲେଖେ।
ତା’ପରେ `/deploy-vps-*-cc` ସ୍କିଲ୍ଗୁଡ଼ିକ ବ୍ୟବହାର କରନ୍ତୁ, ଯେଉଁଗୁଡ଼ିକ `dist/`କୁ ରିମୋଟ୍ `app/` ଡିରେକ୍ଟୋରୀ ସହିତ rsync କରେ।

---

## ସହାୟତା ପାଇବା

- **ଆର୍କିଟେକ୍ଚର୍**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) ଦେଖନ୍ତୁ
- **API ସନ୍ଦର୍ଭ**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) ଦେଖନ୍ତୁ
- **ସୁରକ୍ଷା ଡକ୍ୟୁମେଣ୍ଟଗୁଡ଼ିକ**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **ଅପରେସନ୍ସ ଡକ୍ୟୁମେଣ୍ଟଗୁଡ଼ିକ**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **ସମସ୍ୟାଗୁଡ଼ିକ**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: ଆର୍କିଟେକ୍ଚରାଲ୍ ନିଷ୍ପତ୍ତି ରେକର୍ଡଗୁଡ଼ିକ ପାଇଁ `docs/adr/` ଦେଖନ୍ତୁ
