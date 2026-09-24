# Contributing to OmniRoute (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## ডেভেলপমেন্ট সেটআপ

### পূর্বশর্তসমূহ

- **Node.js** `>=22.22.3 <23`, অথবা `>=24.0.0 <27` (প্রস্তাবিত: 24 LTS)
- **npm** 10+

> **npm v11+ ব্যবহারকারীরা (Node 24+):** `npm install`-এর পরে নেটিভ মডিউলগুলো ইনস্টল হয়েছে কি না যাচাই করুন:
> `node -e "require('better-sqlite3')"`. এটি `MODULE_NOT_FOUND` ত্রুটিসহ ব্যর্থ হলে,
> `npm approve-scripts better-sqlite3 && npm install` চালান। দেখুন
> [সমস্যা সমাধান](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)।

- **Git**

### ক্লোন ও ইনস্টল

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### এনভায়রনমেন্ট ভেরিয়েবলসমূহ

```bash
# টেমপ্লেট থেকে আপনার .env তৈরি করুন
cp .env.example .env

# প্রয়োজনীয় সিক্রেট তৈরি করুন
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

ডেভেলপমেন্টের জন্য গুরুত্বপূর্ণ ভেরিয়েবলসমূহ:

| ভেরিয়েবল              | ডেভেলপমেন্টের ডিফল্ট     | বিবরণ                    |
| ---------------------- | ------------------------ | ------------------------ |
| `PORT`                 | `20128`                  | সার্ভার পোর্ট            |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | ফ্রন্টএন্ডের বেস URL     |
| `JWT_SECRET`           | (উপরে তৈরি করুন)         | JWT স্বাক্ষরের সিক্রেট   |
| `INITIAL_PASSWORD`     | `CHANGEME`               | প্রথম লগইনের পাসওয়ার্ড  |
| `APP_LOG_LEVEL`        | `info`                   | লগের বিস্তারিততার মাত্রা |

### ড্যাশবোর্ড সেটিংস

ড্যাশবোর্ডে এমন ফিচারগুলোর জন্য UI টগল রয়েছে, যেগুলো এনভায়রনমেন্ট ভেরিয়েবলের মাধ্যমেও কনফিগার করা যায়:

| সেটিংসের অবস্থান    | টগল                | বিবরণ                                 |
| ------------------- | ------------------ | ------------------------------------- |
| Settings → Advanced | Debug Mode         | ডিবাগ রিকোয়েস্ট লগ সক্রিয় করুন (UI) |
| Settings → General  | Sidebar Visibility | সাইডবারের বিভাগগুলো দেখান/লুকান       |

এই সেটিংসগুলো ডেটাবেজে সংরক্ষিত থাকে এবং পুনরায় চালু করার পরও বজায় থাকে; সেট করা হলে এগুলো env var-এর ডিফল্ট মানকে ওভাররাইড করে।

### লোকালি চালানো

```bash
# ডেভেলপমেন্ট মোড (হট রিলোড)
npm run dev

# প্রোডাকশন বিল্ড
npm run build    # next build → .build/next/ তারপর assembleStandalone → dist/
npm run start

# কন্ট্রিবিউটরের পরিবর্তনের জন্য দ্রুত ব্যাকএন্ড/API-মাত্র কম্পাইল
npm run build:contributor

# রিলিজ বিল্ড (পরিষ্কার করে পুনরায় বিল্ড + HEAD সেন্টিনেল — ডেপ্লয়ের জন্য আবশ্যক)
npm run build:release   # rm -rf .build dist && বিল্ড + dist/BUILD_SHA লেখে

# সাধারণ পোর্ট কনফিগারেশন
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

কন্ট্রিবিউটর বিল্ডটি শুধু কম্পাইল-ভিত্তিক যাচাই করে: এটি স্ট্যান্ডঅ্যালোন
ডিস্ট্রিবিউশন অ্যাসেম্বল করে না বা ঐচ্ছিক নেটিভ প্যাকেজিং অ্যাসেট বিল্ড করে না। বিতরণযোগ্য বান্ডেল
যাচাই করার প্রয়োজন হলে নিয়মিত প্রোডাকশন বিল্ড ব্যবহার করুন।

### বিল্ড আউটপুটের বিন্যাস

| ডিরেক্টরি | বিষয়বস্তু                                                                     | ট্র্যাক করা হয় |
| --------- | ------------------------------------------------------------------------------ | --------------- |
| `src/`    | অ্যাপ্লিকেশনের সোর্স (TypeScript / TSX)                                        | হ্যাঁ           |
| `.build/` | মধ্যবর্তী ফাইলসমূহ — `next build` আউটপুট (gitignored, `distDir = .build/next`) | না              |
| `dist/`   | বিতরণযোগ্য বান্ডেল — `assembleStandalone` দ্বারা অ্যাসেম্বল করা (gitignored)   | না              |

বিল্ড পাইপলাইনটি একবারেই সম্পন্ন হয়:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js আউটপুট)
  └─ assembleStandalone()                 (স্ট্যান্ডঅ্যালোন + স্ট্যাটিক + পাবলিক + নেটিভ অ্যাসেট কপি করে)
       └─ আউটপুট: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` অতিরিক্তভাবে প্রথমে উভয় ডিরেক্টরি পরিষ্কার করে এবং ডেপ্লয়ের অখণ্ডতা যাচাইয়ের সেন্টিনেল হিসেবে
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) লেখে।

`npm run build:contributor` শুধু-ব্যাকএন্ড বিল্ড প্রোফাইল ব্যবহার করে। বিল্ডের সময় এটি সাময়িকভাবে
ড্যাশবোর্ড UI ফাইলগুলোকে স্টাব করে, API রুট হ্যান্ডলারগুলো বজায় রাখে এবং বিল্ডের পরে মূল ফাইলগুলো
পুনরুদ্ধার করে। ড্যাশবোর্ড UI-কে প্রভাবিত করে এমন পরিবর্তন বা পূর্ণাঙ্গ
রিলিজ যাচাইয়ের জন্য `npm run build` ব্যবহার করুন; কন্ট্রিবিউটর প্রোফাইলটি রিলিজ বিল্ডের বিকল্প নয়।

> **VPS ডেপ্লয় নোট:** রিমোট ইমেজ ডিরেক্টরি `/usr/lib/node_modules/omniroute/app/`
> অপরিবর্তিত রয়েছে। ডেপ্লয় স্কিলগুলো `dist/`-এর বিষয়বস্তু এতে rsync করে।
> শুধুমাত্র রিপোজিটরির অভ্যন্তরীণ বিল্ড আউটপুট পাথ পরিবর্তিত হয়েছে (`app/` → `dist/`)।

ডিফল্ট URL-সমূহ:

- **ড্যাশবোর্ড**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git কর্মপ্রবাহ

> ⚠️ **কখনোই সরাসরি `main`-এ commit করবেন না।** সবসময় feature branch ব্যবহার করুন।
>
> **PR base:** সক্রিয় `release/vX.Y.Z` branch-কে target করুন (`main`-কে নয়)। প্রতি-branch-এ-release + ship-এর-সময়-tag মডেল সম্পর্কে জানতে
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) দেখুন।

```bash
# সক্রিয় release tip থেকে branch তৈরি করুন (উদাহরণ: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... পরিবর্তন করুন ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 দিয়ে একটি Pull Request খুলুন
```

### Branch-এর নামকরণ

| Prefix      | উদ্দেশ্য                |
| ----------- | ----------------------- |
| `feat/`     | নতুন feature            |
| `fix/`      | bug fix                 |
| `refactor/` | code পুনর্গঠন           |
| `docs/`     | documentation পরিবর্তন  |
| `test/`     | test সংযোজন/fix         |
| `chore/`    | tooling, CI, dependency |

### Commit message

[Conventional Commits](https://www.conventionalcommits.org/) অনুসরণ করুন:

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scope (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## টেস্ট চালানো

```bash
# সব টেস্ট (unit + vitest + ecosystem + e2e)
npm run test:all

# একটি টেস্ট ফাইল (Node.js নেটিভ টেস্ট রানার — অধিকাংশ টেস্ট এটি ব্যবহার করে)
node --import tsx/esm --test tests/unit/your-file.test.ts

# শুধুমাত্র আপনার পরিবর্তনে প্রভাবিত unit টেস্টগুলো (CI গেটের মতো একই TIA selector, #8084)
npm run test:scoped            # সর্বশেষ commit-এর পরিবর্তনগুলো (অথবা working tree)
npm run test:scoped:staged     # শুধু staged পরিবর্তন — pre-commit চালানোর সঙ্গে ভালোভাবে কাজ করে
npm run test:scoped:full       # প্রথমে import-graph map পুনর্নির্মাণ করে (ফাইল যোগ/সরানোর পরে)
# Exit 1 + "run the full suite"-এর অর্থ হলো কোনো hub ফাইল (tsconfig, package.json, …) অথবা
# unmapped source পরিবর্তিত হয়েছে — selector নিরাপদভাবে ব্যর্থ হয়, এটি কখনো নীরবে এড়িয়ে যায় না।

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E টেস্ট (Playwright প্রয়োজন)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility টেস্ট
npm run test:ecosystem

# Coverage gate: statements/lines/functions/branches-এর 60%
npm run test:coverage
npm run coverage:report

# Lint + format পরীক্ষা
npm run lint
npm run check

# গেটযুক্ত real-upstream combo smoke (VPS access + প্রকৃত provider credits প্রয়োজন)
# এটি REAL providers-এ অনুরোধ পাঠায় — সামান্য খরচ হয়। CI-তে কখনো চলে না। গেট না থাকলে নির্বিঘ্নে এড়িয়ে যায়।
# প্রয়োজন: ssh root@192.168.0.15 access (VPS থেকে একটি read-only DB snapshot source করে)।
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — সাধারণ Node ESM scripts, সরাসরি live .15 server-এ অনুরোধ পাঠায়।
# প্রয়োজন: ssh root@192.168.0.15 access (SSH sqlite-এর মাধ্যমে combos তৈরি/অপসারণ করা হয়)।
# এটি REAL providers-এ অনুরোধ পাঠায় (সামান্য খরচ)। শুধু __live_test__* combos তৈরি/মুছে দেয়। CI-তে কখনো চলে না।
# .15-এ REQUIRE_API_KEY=false, তাই API key প্রয়োজন নেই; তবে সেট করা থাকলে COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY মানে।
npm run test:combo:live:vps              # 7টি HTTP scenario (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # একটি প্রকৃত cross-provider failover scenario যোগ করে (মোট 8টি)
```

Coverage সংক্রান্ত নোট:

- `npm run test:coverage` মূল unit test suite-এর source coverage পরিমাপ করে, `tests/**` বাদ দেয় এবং `open-sse/**` অন্তর্ভুক্ত করে
- Pull request-গুলোতে statements/lines/functions/branches-এর coverage gate **60%+** রাখতে হবে
- কোনো PR যদি `src/`, `open-sse/`, `electron/`, অথবা `bin/`-এর production code পরিবর্তন করে, তাহলে একই PR-এ automated test যোগ বা হালনাগাদ করতে হবে
- `npm run coverage:report` সর্বশেষ coverage run থেকে বিস্তারিত file-by-file report দেখায়
- `npm run test:coverage:legacy` ঐতিহাসিক তুলনার জন্য পুরোনো metric সংরক্ষণ করে
- পর্যায়ক্রমিক coverage উন্নয়নের roadmap-এর জন্য `docs/ops/COVERAGE_PLAN.md` দেখুন

### Pull Request-এর প্রয়োজনীয়তা

PR খোলার আগে, আপনার পরিবর্তনের জন্য focused loop চালাতে
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) ব্যবহার করুন। সম্পূর্ণ unit suite (4টি CI shard), Vitest, **60%+** coverage gate এবং
production build চালানো CI-এর দায়িত্ব — এগুলো স্থানীয়ভাবে চালালে এমন কোনো অতিরিক্ত সংকেত পাওয়া যায় না যা PR
check-গুলো ইতোমধ্যে দেবে না, এবং ছোট machine-এ এটি host-কে অতিরিক্ত চাপে ফেলতে পারে (#8084):

- আপনার পরিবর্তন cover করে এমন test file-গুলো চালান: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` চালান
- production code পরিবর্তিত হলে একই PR-এ automated test অন্তর্ভুক্ত বা হালনাগাদ করুন
- production code পরিবর্তিত হলে PR description-এ পরিবর্তিত বা যোগ করা test file-গুলো উল্লেখ করুন
- CI-তে project secrets configure করা থাকলে PR-এর SonarQube result পরীক্ষা করুন

বর্তমান test status: **122টি unit test file**, যা নিম্নলিখিত বিষয় cover করে:

- Provider translator এবং format conversion
- Rate limiting, circuit breaker এবং resilience
- Semantic cache, idempotency এবং progress tracking
- Database operation এবং schema (21টি DB module)
- OAuth flow এবং authentication
- API endpoint validation (Zod v4)
- MCP server tool এবং scope enforcement
- Memory এবং Skills system

---

## কোডের স্টাইল

- **ESLint** — কমিট করার আগে `npm run lint` চালান
- **Prettier** — কমিটের সময় `lint-staged`-এর মাধ্যমে স্বয়ংক্রিয়ভাবে ফরম্যাট করা হয় (2টি স্পেস, সেমিকোলন, ডাবল কোট, 100 অক্ষরের প্রস্থ, es5 ট্রেইলিং কমা)
- **TypeScript** — `src/`-এর সব কোডে `.ts`/`.tsx` ব্যবহৃত হয়; `open-sse/`-তে `.ts`/`.js` ব্যবহৃত হয়; TSDoc (`@param`, `@returns`, `@throws`) দিয়ে ডকুমেন্ট করুন
- **কোনো `eval()` নয়** — ESLint `no-eval`, `no-implied-eval`, `no-new-func` প্রয়োগ করে
- **Zod ভ্যালিডেশন** — সব API ইনপুট ভ্যালিডেশনের জন্য Zod v4 স্কিমা ব্যবহার করুন
- **নামকরণ**: ফাইল = camelCase/kebab-case, কম্পোনেন্ট = PascalCase, কনস্ট্যান্ট = UPPER_SNAKE

### ত্রুটি পরিচালনা / খালি catch ব্লক

কোনো `catch` কখনো ব্যাখ্যাহীন রাখবেন না। এটিকে নিচের দুটি বিভাগের একটিতে শ্রেণিবদ্ধ করুন (এটি
"SSE স্ট্রিমে কখনোই নীরবে ত্রুটি উপেক্ষা করবেন না"—এই কঠোর নিয়মটিকে কার্যকর করে):

- **ইচ্ছাকৃত (আমাদের নিজস্ব সর্বোচ্চ-চেষ্টার ক্লিনআপ/টেলিমেট্রি)** — এখানে ব্যর্থতা প্রত্যাশিত এবং
  ক্ষতিহীন; এক লাইনের যৌক্তিকতার মন্তব্য যোগ করুন, কোনো লগিং নয় (প্রতিটি রিকোয়েস্টে লগিংয়ের
  ফলে যে অপ্রয়োজনীয় কোলাহল হয়, এই রীতি তা এড়ায়)।

  ```ts
  } catch {} // ক্লায়েন্ট সংযোগ বিচ্ছিন্ন করার পর ইতোমধ্যে বন্ধ হয়ে যাওয়া কন্ট্রোলার বন্ধ করার চেষ্টা প্রত্যাশিত
  ```

- **লগ করা উচিত (বাহ্যিক/কলার-সরবরাহকৃত কোড, অথবা উপেক্ষা করলে কন্ট্রোল ফ্লো পরিবর্তিত হয়)** — `catch`
  রাখুন (এটিকে কখনোই স্ট্রিম ভাঙতে দেবেন না), তবে প্রাসঙ্গিক `console.debug`/`warn` নির্গত করুন, যাতে
  ব্যর্থতাটি শনাক্ত করা যায়।

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure কলব্যাকে ত্রুটি:", e);
  }
  ```

প্রয়োগ করা উদাহরণের জন্য `open-sse/utils/stream.ts` এবং `open-sse/utils/streamHandler.ts` দেখুন।

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

## নতুন প্রোভাইডার যোগ করা

### ধাপ 1: প্রোভাইডার কনস্ট্যান্ট নিবন্ধন করুন

`src/shared/constants/providers.ts`-এ যোগ করুন — মডিউল লোডের সময় Zod দ্বারা যাচাই করা হয়।

### ধাপ 2: এক্সিকিউটর যোগ করুন (কাস্টম লজিক প্রয়োজন হলে)

বেস এক্সিকিউটরকে এক্সটেন্ড করে `open-sse/executors/your-provider.ts`-এ এক্সিকিউটর তৈরি করুন।

### ধাপ 3: ট্রান্সলেটর যোগ করুন (ফরম্যাট OpenAI-এর না হলে)

`open-sse/translator/`-এ রিকোয়েস্ট/রেসপন্স ট্রান্সলেটর তৈরি করুন।

### ধাপ 4: OAuth কনফিগ যোগ করুন (OAuth-ভিত্তিক হলে)

`src/lib/oauth/constants/oauth.ts`-এ OAuth ক্রেডেনশিয়াল এবং `src/lib/oauth/services/`-এ সার্ভিস যোগ করুন।

যদি আপস্ট্রিম প্রোভাইডার তার পাবলিক CLI / ব্রাউজার বান্ডলের মধ্যে কোনো পাবলিক OAuth client_id/secret বা Firebase Web API কী বিতরণ করে, তাহলে সেটি স্ট্রিং লিটারেল হিসেবে **এম্বেড করবেন না**। `open-sse/utils/publicCreds.ts` থেকে `resolvePublicCred()` ব্যবহার করুন এবং `EMBEDDED_DEFAULTS`-এ একটি মাস্ক করা বাইট এন্ট্রি যোগ করুন। সম্পূর্ণ বাধ্যতামূলক কার্যপ্রবাহটি [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)-এ নথিভুক্ত রয়েছে।

হ্যান্ডলার/এক্সিকিউটরের মধ্যে ক্লায়েন্টের কাছে পৌঁছানো ত্রুটির বার্তাগুলো অবশ্যই `open-sse/utils/error.ts` থেকে `buildErrorBody()` / `sanitizeErrorMessage()`-এর মাধ্যমে পাঠাতে হবে — কোনো Response বডিতে কখনোই কাঁচা `err.stack` বা `err.message` রাখবেন না। [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) দেখুন।

### ধাপ 5: মডেল নিবন্ধন করুন

`open-sse/config/providerRegistry.ts`-এ মডেলের সংজ্ঞা যোগ করুন।

### ধাপ 6: টেস্ট যোগ করুন

`tests/unit/`-এ অন্তত নিম্নলিখিত বিষয়গুলো কভার করে ইউনিট টেস্ট লিখুন:

- প্রোভাইডার নিবন্ধন
- রিকোয়েস্ট/রেসপন্স অনুবাদ
- ত্রুটি পরিচালনা

---

## পুল রিকোয়েস্ট চেকলিস্ট

- [ ] টেস্টসমূহ পাস করে (`npm test`)
- [ ] লিন্টিং পাস করে (`npm run lint`)
- [ ] বিল্ড সফল হয় (`npm run build`)
- [ ] নতুন পাবলিক ফাংশন ও ইন্টারফেসের জন্য TypeScript টাইপ যোগ করা হয়েছে
- [ ] কোনো হার্ডকোড করা সিক্রেট বা ফলব্যাক মান নেই
- [ ] পাবলিক আপস্ট্রিম ক্রেডেনশিয়ালগুলো `resolvePublicCred()`-এর মাধ্যমে এম্বেড করা হয়েছে ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) দেখুন), কখনোই লিটারেল হিসেবে নয়
- [ ] ত্রুটির রেসপন্সগুলো `buildErrorBody()` / `sanitizeErrorMessage()`-এর মাধ্যমে রাউট করা হয় — রেসপন্স বডিতে কোনো অপরিশোধিত স্ট্যাক ট্রেস নেই ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) দেখুন)
- [ ] শেল কমান্ডগুলো (`exec` / `spawn`) রানটাইম মান স্ট্রিং ইন্টারপোলেশনের মাধ্যমে নয়, `env`-এর মাধ্যমে পাস করে
- [ ] সব ইনপুট Zod স্কিমা দিয়ে যাচাই করা হয়েছে
- [ ] ব্যবহারকারীর দৃশ্যমান পরিবর্তনের জন্য `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md`-এর অধীনে চেঞ্জলগ **ফ্র্যাগমেন্ট** যোগ করা হয়েছে ([`changelog.d/README.md`](./changelog.d/README.md) দেখুন) — সরাসরি `CHANGELOG.md` সম্পাদনা করবেন **না**; রিলিজের সময় ফ্র্যাগমেন্টগুলো একত্রিত করা হয় এবং PR-গুলোর মধ্যে কখনোই দ্বন্দ্ব হয় না
- [ ] ডকুমেন্টেশন হালনাগাদ করা হয়েছে (প্রযোজ্য হলে)
- [ ] নতুন কোনো CodeQL / Secret-Scanning সতর্কতা খোলা হয়নি, অথবা প্রতিটি সতর্কতা প্রাসঙ্গিক `docs/security/` ডকুমেন্ট উল্লেখ করে কারিগরি যৌক্তিকতাসহ খারিজ করা হয়েছে
- [ ] যেসব রাউট চাইল্ড প্রসেস চালু করে (`/api/mcp/`, `/api/cli-tools/runtime/`), সেগুলো `src/server/authz/routeGuard.ts`-এ `isLocalOnlyPath()` হিসেবে শ্রেণিবদ্ধ করা হয়েছে — [কঠোর নিয়ম #15](docs/security/ROUTE_GUARD_TIERS.md) দেখুন
- [ ] কমিট মেসেজে কোনো `Co-Authored-By` ট্রেলার নেই — কমিটগুলো অবশ্যই কেবল রিপোজিটরি মালিকের Git পরিচয়ের অধীনে প্রদর্শিত হতে হবে (কঠোর নিয়ম #16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## সহায়তা পাওয়া

- **আর্কিটেকচার**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) দেখুন
- **API রেফারেন্স**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) দেখুন
- **নিরাপত্তা ডকুমেন্টেশন**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **অপারেশনস ডকুমেন্টেশন**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **সমস্যাসমূহ**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: আর্কিটেকচার-সংক্রান্ত সিদ্ধান্তের রেকর্ডের জন্য `docs/adr/` দেখুন
