# Contributing to OmniRoute (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Pag-set Up para sa Development

### Mga Kinakailangan

- **Node.js** `>=22.22.3 <23`, o `>=24.0.0 <27` (inirerekomenda: 24 LTS)
- **npm** 10+

> **Mga gumagamit ng npm v11+ (Node 24+):** Pagkatapos ng `npm install`, tiyaking na-install ang mga native module:
> `node -e "require('better-sqlite3')"`. Kung mabigo ito dahil sa `MODULE_NOT_FOUND`,
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

Mga pangunahing variable para sa development:

| Variable               | Default sa Development   | Paglalarawan                   |
| ---------------------- | ------------------------ | ------------------------------ |
| `PORT`                 | `20128`                  | Port ng server                 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Base URL para sa frontend      |
| `JWT_SECRET`           | (buuin sa itaas)         | Secret para sa pag-sign ng JWT |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Password sa unang pag-login    |
| `APP_LOG_LEVEL`        | `info`                   | Antas ng detalye ng log        |

### Mga Setting ng Dashboard

Nagbibigay ang dashboard ng mga UI toggle para sa mga feature na maaari ding i-configure sa pamamagitan ng mga environment variable:

| Lokasyon ng Setting | Toggle             | Paglalarawan                             |
| ------------------- | ------------------ | ---------------------------------------- |
| Settings → Advanced | Debug Mode         | I-enable ang mga debug request log (UI)  |
| Settings → General  | Sidebar Visibility | Ipakita/itago ang mga seksyon ng sidebar |

Nakaimbak sa database ang mga setting na ito at nananatili ang mga ito sa bawat pag-restart, na nag-o-override sa mga default ng env var kapag naitakda.

### Lokal na Pagpapatakbo

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build    # next build → .build/next/ pagkatapos ay assembleStandalone → dist/
npm run start

# Mabilis na backend/API-only compile para sa mga pagbabago ng contributor
npm run build:contributor

# Release build (malinis na rebuild + HEAD sentinel — kinakailangan para sa deploy)
npm run build:release   # rm -rf .build dist && build + isinusulat ang dist/BUILD_SHA

# Karaniwang configuration ng port
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Nagsasagawa ang contributor build ng compile-only na validation: hindi nito binubuo ang standalone
distribution o ang mga opsyonal na native packaging asset. Gamitin ang regular na production build kapag
kailangan mong i-validate ang bundle na maaaring i-deploy.

### Layout ng Build Output

| Directory | Mga Nilalaman                                                                   | Sinusubaybayan |
| --------- | ------------------------------------------------------------------------------- | -------------- |
| `src/`    | Source ng application (TypeScript / TSX)                                        | Oo             |
| `.build/` | Mga intermediate — output ng `next build` (gitignored, `distDir = .build/next`) | Hindi          |
| `dist/`   | Bundle na maaaring i-deploy — binuo ng `assembleStandalone` (gitignored)        | Hindi          |

Iisang pass ang build pipeline:

```
npm run build
  └─ next build → .build/next/standalone  (output ng Next.js)
  └─ assembleStandalone()                 (kinokopya ang standalone + static + public + native asset)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

Bukod dito, nililinis muna ng `npm run build:release` ang parehong directory at isinusulat ang
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) bilang sentinel ng integridad ng deploy.

Ginagamit ng `npm run build:contributor` ang backend-only na build profile. Pansamantala nitong pinapalitan ng mga stub ang
mga dashboard UI file habang nagbi-build, pinapanatili ang mga API route handler, at ibinabalik ang mga orihinal na file
pagkatapos ng build. Gamitin ang `npm run build` para sa mga pagbabagong nakaaapekto sa dashboard UI o para sa buong
release validation; hindi kapalit ng release build ang contributor profile.

> **Tala para sa pag-deploy sa VPS:** hindi nagbago ang remote image directory na `/usr/lib/node_modules/omniroute/app/`.
> Gumagamit ang mga deploy skill ng rsync upang ilagay rito ang mga nilalaman ng `dist/`.
> Ang in-repo build output path lamang ang nagbago (`app/` → `dist/`).

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
- [ ] Naidagdag ang mga TypeScript type para sa mga bagong pampublikong function at interface
- [ ] Walang mga naka-hardcode na secret o fallback value
- [ ] Naka-embed ang mga pampublikong upstream credential sa pamamagitan ng `resolvePublicCred()` (tingnan ang [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), at hindi kailanman bilang mga literal
- [ ] Dumadaan ang mga tugon sa error sa `buildErrorBody()` / `sanitizeErrorMessage()` — walang mga raw stack trace sa mga response body (tingnan ang [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Ipinapasa ng mga shell command (`exec` / `spawn`) ang mga runtime value sa pamamagitan ng `env`, hindi sa pamamagitan ng string interpolation
- [ ] Na-validate ang lahat ng input gamit ang mga Zod schema
- [ ] Nagdagdag ng **fragment** ng changelog sa ilalim ng `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` para sa mga pagbabagong nakikita ng user (tingnan ang [`changelog.d/README.md`](./changelog.d/README.md)) — **huwag** direktang i-edit ang `CHANGELOG.md`; pinagsasama-sama ang mga fragment sa oras ng release at hindi kailanman nagkakaroon ng conflict sa pagitan ng mga PR
- [ ] Na-update ang dokumentasyon (kung naaangkop)
- [ ] Walang bagong nabuksang alerto mula sa CodeQL / Secret-Scanning, o na-dismiss ang bawat isa nang may teknikal na katwirang tumutukoy sa nauugnay na dokumento sa `docs/security/`
- [ ] Ang mga route na naglulunsad ng mga child process (`/api/mcp/`, `/api/cli-tools/runtime/`) ay inuri bilang `isLocalOnlyPath()` sa `src/server/authz/routeGuard.ts` — tingnan ang [Mahigpit na Panuntunan #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Walang mga trailer na `Co-Authored-By` sa mga commit message — dapat lumabas ang mga commit sa ilalim lamang ng Git identity ng may-ari ng repository (Mahigpit na Panuntunan #16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Pagkuha ng Tulong

- **Arkitektura**: Tingnan ang [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Sanggunian ng API**: Tingnan ang [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Mga dokumento sa seguridad**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Mga dokumento sa operasyon**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Mga isyu**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Mga ADR**: Tingnan ang `docs/adr/` para sa mga talaan ng desisyong pang-arkitektura
