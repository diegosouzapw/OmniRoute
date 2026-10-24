# Contributing to OmniRoute (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Pag-setup ng Development

### Mga Kinakailangan

- **Node.js** `>=22.22.2 <23`, o `>=24.0.0 <27` (inirerekomenda: 24 LTS)
- **npm** 10+

> **Mga gumagamit ng npm v11+ (Node 24+):** Pagkatapos ng `npm install`, tiyaking na-install ang mga native module:
> `node -e "require('better-sqlite3')"`. Kung mabigo ito nang may `MODULE_NOT_FOUND`,
> patakbuhin ang `npm approve-scripts better-sqlite3 && npm install`. Tingnan ang
> [Pag-troubleshoot](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Pag-clone at Pag-install

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Mga Environment Variable

```bash
# Gumawa ng iyong .env mula sa template
cp .env.example .env

# Bumuo ng mga kinakailangang secret
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Mahahalagang variable para sa development:

| Variable               | Default sa Development   | Paglalarawan                |
| ---------------------- | ------------------------ | --------------------------- |
| `PORT`                 | `20128`                  | Port ng server              |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Base URL para sa frontend   |
| `JWT_SECRET`           | (buuin sa itaas)         | Secret sa pag-sign ng JWT   |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Password sa unang pag-login |
| `APP_LOG_LEVEL`        | `info`                   | Antas ng detalye ng mga log |

### Mga Setting ng Dashboard

Nagbibigay ang dashboard ng mga UI toggle para sa mga feature na maaari ring i-configure sa pamamagitan ng mga environment variable:

| Lokasyon ng Setting | Toggle             | Paglalarawan                             |
| ------------------- | ------------------ | ---------------------------------------- |
| Settings → Advanced | Debug Mode         | Paganahin ang mga debug request log (UI) |
| Settings → General  | Sidebar Visibility | Ipakita/itago ang mga seksyon ng sidebar |

Iniimbak ang mga setting na ito sa database at nananatili ang mga ito sa bawat pag-restart, na pumapalit sa mga default ng env var kapag itinakda.

### Lokal na Pagpapatakbo

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build    # next build → .build/next/ pagkatapos ay assembleStandalone → dist/
npm run start

# Mabilis na backend/API-only compile para sa mga pagbabago ng contributor
npm run build:contributor

# Release build (malinis na rebuild + HEAD sentinel — kinakailangan para sa pag-deploy)
npm run build:release   # rm -rf .build dist && build + nagsusulat sa dist/BUILD_SHA

# Karaniwang configuration ng port
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Nagsasagawa ang contributor build ng compile-only na validation: hindi nito binubuo ang standalone
distribution o ang mga opsyonal na native packaging asset. Gamitin ang karaniwang production build kapag
kailangan mong i-validate ang bundle na maaaring i-release.

### Ayos ng Build Output

| Directory | Mga Nilalaman                                                                   | Sinusubaybayan |
| --------- | ------------------------------------------------------------------------------- | -------------- |
| `src/`    | Source ng application (TypeScript / TSX)                                        | Oo             |
| `.build/` | Mga intermediate — output ng `next build` (gitignored, `distDir = .build/next`) | Hindi          |
| `dist/`   | Bundle na maaaring i-release — binuo ng `assembleStandalone` (gitignored)       | Hindi          |

Iisang pass ang build pipeline:

```
npm run build
  └─ next build → .build/next/standalone  (output ng Next.js)
  └─ assembleStandalone()                 (kinokopya ang standalone + static + public + mga native asset)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

Nililinis din muna ng `npm run build:release` ang parehong directory at isinusulat ang
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) bilang sentinel ng integridad ng pag-deploy.

Ginagamit ng `npm run build:contributor` ang backend-only na build profile. Pansamantala nitong pinapalitan
ng mga stub ang mga dashboard UI file habang nagbu-build, pinananatili ang mga API route handler, at ibinabalik ang mga orihinal na file
pagkatapos ng build. Gamitin ang `npm run build` para sa mga pagbabagong nakaaapekto sa dashboard UI o para sa ganap na
validation ng release; hindi pamalit sa release build ang contributor profile.

> **Paalala sa pag-deploy sa VPS:** hindi nagbago ang remote image directory na `/usr/lib/node_modules/omniroute/app/`.
> Ini-rsync ng mga deploy skill ang mga nilalaman ng `dist/` papunta rito.
> Tanging ang path ng build output sa repository ang nagbago (`app/` → `dist/`).

Mga default na URL:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Daloy ng Trabaho sa Git

> ⚠️ **HUWAG KAILANMAN direktang mag-commit sa `main`.** Palaging gumamit ng mga feature branch.
>
> **Base ng PR:** i-target ang aktibong branch na `release/vX.Y.Z` (hindi ang `main`). Tingnan ang
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) para sa
> modelong isang release kada branch + pag-tag sa pag-release.

```bash
# Gumawa ng branch mula sa pinakabagong tip ng aktibong release (halimbawa: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... gawin ang mga pagbabago ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Magbukas ng Pull Request na may base = release/v3.8.49
```

### Pagpapangalan ng Branch

| Prefix      | Layunin                        |
| ----------- | ------------------------------ |
| `feat/`     | Mga bagong feature             |
| `fix/`      | Mga pag-aayos ng bug           |
| `refactor/` | Muling pagsasaayos ng code     |
| `docs/`     | Mga pagbabago sa dokumentasyon |
| `test/`     | Mga idinagdag/inayos na test   |
| `chore/`    | Tooling, CI, mga dependency    |

### Mga Mensahe ng Commit

Sundin ang [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Mga scope (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Pagpapatakbo ng mga Test

```bash
# Lahat ng test (unit + vitest + ecosystem + e2e)
npm run test:all

# Isang test file (katutubong test runner ng Node.js — ito ang ginagamit ng karamihan sa mga test)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Tanging mga unit test na apektado ng iyong pagbabago (kaparehong TIA selector ng CI gate, #8084)
npm run test:scoped            # mga pagbabago sa huling commit (o sa working tree)
npm run test:scoped:staged     # mga staged na pagbabago lamang — mahusay na ipares sa pre-commit na pagpapatakbo
npm run test:scoped:full       # buuin munang muli ang import-graph map (pagkatapos magdagdag/maglipat ng mga file)
# Ang Exit 1 + "patakbuhin ang buong suite" ay nangangahulugang may hub file (tsconfig, package.json, …) o
# hindi naka-map na source na nagbago — ligtas na nabibigo ang selector at hindi ito tahimik na lumalaktaw kailanman.

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# Mga E2E test (nangangailangan ng Playwright)
npm run test:e2e

# E2E ng mga protocol client (MCP transports, A2A)
npm run test:protocols:e2e

# Mga test sa compatibility ng ecosystem
npm run test:ecosystem

# Coverage gate: 60% ng statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Pagsusuri ng lint + format
npm run lint
npm run check

# Gated na real-upstream combo smoke test (nangangailangan ng access sa VPS + totoong provider credits)
# Kumokonekta sa mga TOTOONG provider — may kaunting gastos. HINDI KAILANMAN tumatakbo sa CI. Maayos na nilalaktawan kapag wala ang gate.
# Kailangan: access sa ssh root@192.168.0.15 (kumukuha ng read-only na DB snapshot mula sa VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke test — mga payak na Node ESM script na direktang kumokonekta sa live na .15 server.
# Nangangailangan ng: access sa ssh root@192.168.0.15 (ginagawa/binubura ang mga combo sa pamamagitan ng SSH sqlite).
# Kumokonekta sa mga TOTOONG provider (maliit na gastos). Gumagawa/nagbubura lamang ng mga __live_test__* combo. HINDI KAILANMAN tumatakbo sa CI.
# REQUIRE_API_KEY=false sa .15 kaya hindi kailangan ng API key, ngunit sinusunod ang COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY kung itinakda.
npm run test:combo:live:vps              # 7 HTTP scenario (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # nagdaragdag ng totoong cross-provider failover scenario (8 sa kabuuan)
```

Mga tala tungkol sa coverage:

- Sinusukat ng `npm run test:coverage` ang source coverage para sa pangunahing unit test suite, hindi isinasama ang `tests/**`, at isinasama ang `open-sse/**`
- Dapat mapanatili ng mga pull request ang coverage gate na **60%+** para sa statements/lines/functions/branches
- Kung binabago ng isang PR ang production code sa `src/`, `open-sse/`, `electron/`, o `bin/`, dapat itong magdagdag o mag-update ng mga automated test sa parehong PR
- Ipinapakita ng `npm run coverage:report` ang detalyadong ulat para sa bawat file mula sa pinakabagong coverage run
- Pinapanatili ng `npm run test:coverage:legacy` ang mas lumang sukatan para sa makasaysayang paghahambing
- Tingnan ang `docs/ops/COVERAGE_PLAN.md` para sa roadmap ng unti-unting pagpapahusay ng coverage

### Mga Kinakailangan sa Pull Request

Bago magbukas ng PR, gamitin ang
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) upang patakbuhin ang nakatuong loop para sa
iyong binago. Ang buong unit suite (4 na CI shard), Vitest, ang **60%+** coverage gate, at
ang production build ay responsibilidad ng CI — walang naidaragdag na impormasyon ang lokal na pagpapatakbo sa mga ito na
hindi pa ibibigay sa iyo ng mga pagsusuri sa PR, at sa mas maliliit na machine ay maaari nitong sagarin ang host (#8084):

- Patakbuhin ang mga test file na sumasaklaw sa iyong pagbabago: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Patakbuhin ang `npm run lint`
- Isama o i-update ang mga automated test sa parehong PR tuwing nagbabago ang production code
- Isama sa paglalarawan ng PR ang mga binago o idinagdag na test file kapag nagbago ang production code
- Suriin ang resulta ng SonarQube sa PR kapag naka-configure sa CI ang mga secret ng proyekto

Kasalukuyang katayuan ng mga test: **122 unit test file** na sumasaklaw sa:

- Mga provider translator at conversion ng format
- Rate limiting, circuit breaker, at resilience
- Semantic cache, idempotency, at pagsubaybay sa progreso
- Mga operasyon at schema ng database (21 DB module)
- Mga OAuth flow at authentication
- Pag-validate ng API endpoint (Zod v4)
- Mga tool ng MCP server at pagpapatupad ng scope
- Mga system ng Memory at Skills

---

## Estilo ng Code

- **ESLint** — Patakbuhin ang `npm run lint` bago mag-commit
- **Prettier** — Awtomatikong fina-format sa pamamagitan ng `lint-staged` kapag nagko-commit (2 espasyo, mga semicolon, mga dobleng panipi, 100-character na lapad, es5 trailing comma)
- **TypeScript** — Gumagamit ang lahat ng code sa `src/` ng `.ts`/`.tsx`; gumagamit ang `open-sse/` ng `.ts`/`.js`; idokumento gamit ang TSDoc (`@param`, `@returns`, `@throws`)
- **Walang `eval()`** — Ipinapatupad ng ESLint ang `no-eval`, `no-implied-eval`, `no-new-func`
- **Pagpapatunay gamit ang Zod** — Gumamit ng mga Zod v4 schema para sa pagpapatunay ng lahat ng input ng API
- **Pagpapangalan**: Mga file = camelCase/kebab-case, mga component = PascalCase, mga constant = UPPER_SNAKE

### Pangangasiwa ng error / mga walang-lamang catch block

Huwag kailanman mag-iwan ng `catch` nang walang paliwanag. Uriin ito sa isa sa dalawang kategorya (isinasagawa nito
ang mahigpit na panuntunang "huwag kailanman tahimik na balewalain ang mga error sa mga SSE stream"):

- **Sinadya (sarili nating best-effort na cleanup/telemetry)** — inaasahan at
  hindi nakapipinsala ang pagkabigo rito; magdagdag ng isang linyang komento na nagpapaliwanag, nang walang logging (ang pag-log sa bawat request ang
  ingay na iniiwasan ng kumbensiyong ito).

  ```ts
  } catch {} // inaasahan ang pagsasara ng nakasara nang controller pagkatapos madiskonekta ang client
  ```

- **Dapat i-log (external/caller-supplied na code, o binabago ng pagbalewala ang control flow)** — panatilihin
  ang catch (huwag kailanman hayaang sirain nito ang stream) ngunit maglabas ng may-kontekstong `console.debug`/`warn` upang
  matukoy ang pagkabigo.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Tingnan ang `open-sse/utils/stream.ts` at `open-sse/utils/streamHandler.ts` para sa mga inilapat na halimbawa.

---

## Estruktura ng Proyekto

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Mga pahina ng dashboard (23 seksyon)
│   ├── api/                # Mga ruta ng API (51 direktoryo)
│   └── login/              # Mga pahina ng pagpapatotoo (.tsx)
├── domain/                 # Engine ng patakaran (policyEngine, comboResolver, costRules, atbp.)
├── lib/                    # Pangunahing lohika ng negosyo (.ts)
│   ├── a2a/                # Server ng Agent-to-Agent v0.3 protocol
│   ├── acp/                # Registry ng Agent Communication Protocol
│   ├── compliance/         # Engine ng patakaran sa pagsunod
│   ├── db/                 # Mga domain module ng SQLite + 130 migrasyon
│   ├── memory/             # Persistent na memorya ng pag-uusap
│   ├── oauth/              # Mga provider, serbisyo, at utility ng OAuth
│   ├── skills/             # Napapalawak na framework ng kasanayan
│   ├── usage/              # Pagsubaybay sa paggamit at pagkalkula ng gastos
│   └── localDb.ts          # Re-export layer lamang — huwag kailanman magdagdag ng lohika rito
├── middleware/              # Middleware ng request (promptInjectionGuard)
├── mitm/                   # MITM proxy (sertipiko, DNS, pagruruta ng target)
├── shared/
│   ├── components/         # Mga React component (.tsx)
│   ├── constants/          # Mga depinisyon ng provider (329), MCP scope, 21 estratehiya sa pagruruta
│   ├── utils/              # Circuit breaker, sanitizer, mga helper sa pagpapatotoo
│   └── validation/         # Mga Zod v4 schema
└── sse/                    # Pipeline ng SSE proxy

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 150 executor module (mga executor class + helper para sa bawat provider)
├── handlers/               # 11 request handler (chat, responses, embeddings, images, atbp.)
├── mcp-server/             # MCP server (110 natatanging tool, 3 transport, 33 scope)
├── services/               # 178 nangungunang antas na serbisyo (combo, autoCombo, rateLimitManager, atbp.)
├── translator/             # Mga tagasalin ng format (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Transformer ng Responses API
└── utils/                  # 22 utility module (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (1,574 test file)
├── integration/            # Mga integration test
├── e2e/                    # Mga Playwright test
├── security/               # Mga security test
├── translator/             # Mga test na partikular sa translator
└── load/                   # Mga load test

docs/
├── adr/                     # Mga Talaan ng Desisyon sa Arkitektura
├── architecture/            # Arkitektura at katatagan ng system
├── comparison/              # OmniRoute kumpara sa mga alternatibo
├── compression/             # Mga gabay at panuntunan sa compression
├── dev/                     # Mga gabay sa development
├── diagrams/                # Mga diagram ng arkitektura
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Gabay ng user, Docker, setup, troubleshooting
├── i18n/                    # Mga internasyonal na salin ng README
├── marketing/               # Mga materyal sa marketing
├── ops/                     # Deployment, proxy, coverage, mga release
├── providers/               # Dokumentasyong partikular sa provider
├── reference/               # Sanggunian ng API, mga env var, CLI tool, mga libreng tier
├── releases/                # Mga tala sa release
├── routing/                 # Auto-combo engine, reasoning replay
├── screenshots/             # Mga screenshot ng dashboard
├── security/                # Mga guardrail, pagsunod, stealth, mga token
└── specs/                   # Mga espesipikasyon ng disenyo
```

---

## Pagdaragdag ng Bagong Provider

### Hakbang 1: Irehistro ang mga Constant ng Provider

Idagdag sa `src/shared/constants/providers.ts` — bina-validate ng Zod sa pag-load ng module.

### Hakbang 2: Magdagdag ng Executor (kung kailangan ng custom na lohika)

Gumawa ng executor sa `open-sse/executors/your-provider.ts` na nag-e-extend sa base executor.

### Hakbang 3: Magdagdag ng Translator (kung hindi OpenAI ang format)

Gumawa ng mga translator ng request/response sa `open-sse/translator/`.

### Hakbang 4: Magdagdag ng Config ng OAuth (kung nakabatay sa OAuth)

Idagdag ang mga credential ng OAuth sa `src/lib/oauth/constants/oauth.ts` at ang service sa `src/lib/oauth/services/`.

Kung namamahagi ang upstream provider ng pampublikong OAuth client_id/secret o Firebase Web API key sa loob ng pampublikong CLI / browser bundle nito, **huwag** itong i-embed bilang string literal. Gamitin ang `resolvePublicCred()` mula sa `open-sse/utils/publicCreds.ts` at magdagdag ng naka-mask na byte entry sa `EMBEDDED_DEFAULTS`. Nakadokumento ang buong kinakailangang workflow sa [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Sa loob ng mga handler/executor, ang mga mensahe ng error na nakararating sa client ay dapat dumaan sa `buildErrorBody()` / `sanitizeErrorMessage()` mula sa `open-sse/utils/error.ts` — huwag kailanman ilagay ang raw na `err.stack` o `err.message` sa body ng Response. Tingnan ang [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Hakbang 5: Irehistro ang mga Model

Idagdag ang mga depinisyon ng model sa `open-sse/config/providerRegistry.ts`.

### Hakbang 6: Magdagdag ng mga Test

Sumulat ng mga unit test sa `tests/unit/` na sumasaklaw, bilang minimum, sa:

- Pagpaparehistro ng provider
- Pagsasalin ng request/response
- Pangangasiwa ng error

---

## Checklist ng Pull Request

- [ ] Pumapasa ang mga test (`npm test`)
- [ ] Pumapasa ang linting (`npm run lint`)
- [ ] Matagumpay ang build (`npm run build`)
- [ ] Nagdagdag ng mga TypeScript type para sa mga bagong pampublikong function at interface
- [ ] Walang naka-hardcode na mga secret o fallback value
- [ ] Ang mga pampublikong upstream credential ay naka-embed sa pamamagitan ng `resolvePublicCred()` (tingnan ang [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), at hindi kailanman bilang mga literal
- [ ] Ang mga error response ay dumaraan sa `buildErrorBody()` / `sanitizeErrorMessage()` — walang mga raw stack trace sa mga response body (tingnan ang [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Ang mga shell command (`exec` / `spawn`) ay nagpapasa ng mga runtime value sa pamamagitan ng `env`, hindi sa pamamagitan ng string interpolation
- [ ] Napatunayan ang bisa ng lahat ng input gamit ang mga Zod schema
- [ ] Nagdagdag ng **fragment** ng changelog sa ilalim ng `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` para sa mga pagbabagong nakikita ng user (tingnan ang [`changelog.d/README.md`](./changelog.d/README.md)) — **huwag** direktang i-edit ang `CHANGELOG.md`; pinagsasama-sama ang mga fragment sa oras ng release at hindi kailanman nagkakasalungatan sa pagitan ng mga PR
- [ ] Na-update ang dokumentasyon (kung naaangkop)
- [ ] Walang bagong nabuksang alerto mula sa CodeQL / Secret-Scanning, o ang bawat isa ay na-dismiss nang may teknikal na katwiran na tumutukoy sa nauugnay na dokumento sa `docs/security/`
- [ ] Ang mga route na naglulunsad ng mga child process (`/api/mcp/`, `/api/cli-tools/runtime/`) ay inuri bilang `isLocalOnlyPath()` sa `src/server/authz/routeGuard.ts` — tingnan ang [Mahigpit na Panuntunan #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Walang mga AI/bot na `Co-authored-by` trailer sa mga commit message (Mahigpit na Panuntunan #16) — ang mga taong collaborator na muling ginamit ang gawa ay kinikilala gamit ang karaniwang `Co-authored-by: Name <email>` na mga trailer

---

## Paglalabas ng Release

Pinamamahalaan ang mga release sa pamamagitan ng workflow na `/generate-release`. Kapag gumawa ng bagong GitHub Release, **awtomatikong inilalathala sa npm** ang package sa pamamagitan ng GitHub Actions.

Para sa mga pag-deploy sa VPS, gamitin ang `npm run build:release` (hindi ang `npm run build`) — nagsasagawa ito ng malinis na
muling pag-build, binubuo ang bundle sa `dist/`, at isinusulat ang sentinel na `dist/BUILD_SHA`.
Pagkatapos, gamitin ang mga skill na `/deploy-vps-*-cc`, na gumagamit ng rsync upang ilipat ang `dist/` sa remote na direktoryong `app/`.

---

## Paghingi ng Tulong

- **Arkitektura**: Tingnan ang [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Sanggunian ng API**: Tingnan ang [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Mga dokumento sa seguridad**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Mga dokumento sa operasyon**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Mga isyu**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
