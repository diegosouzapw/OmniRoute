# Contributing to OmniRoute (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Daalụ maka mmasị gị n'ịtụnye aka! Ntuziaka a na-ekpuchi ihe niile ịchọrọ iji malite.

Maka usoro ọrụ gọọmentị maka mgbanwe ọ bụla, malite na
[Ụzọ Ọlaedo nke Ịtụnye Aka](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Ọ na-ejikọta mgbanwe ndị metụtara provider, routing,
UI/UX, i18n, CLI, database, na build/deploy na nkwekọrịta ha, ule ndị e lekwasịrị anya na ha, mkpuchi CI,
na usoro ime ka ihe kwekọọ.

---

## Nhazi Maka Mmepe

### Ihe Ndị A Chọrọ Tupu Amalite

- **Node.js** `>=22.22.3 <23`, ma ọ bụ `>=24.0.0 <27` (nke akwadoro: 24 LTS)
- **npm** 10+

> **Ndị ọrụ npm v11+ (Node 24+):** Mgbe `npm install` gasịrị, nyochaa na arụnyere native modules:
> `node -e "require('better-sqlite3')"`. Ọ bụrụ na ọ daa site na `MODULE_NOT_FOUND`,
> mee `npm approve-scripts better-sqlite3 && npm install`. Lee
> [Nchọpụta na Ndozi Nsogbu](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Detuo Repository ma Wụnye

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Environment Variables

```bash
# Mepụta .env gị site na template
cp .env.example .env

# Mepụta secrets ndị achọrọ
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Variables ndị bụ isi maka mmepe:

| Variable               | Uru Ndabara Maka Mmepe   | Nkọwa                       |
| ---------------------- | ------------------------ | --------------------------- |
| `PORT`                 | `20128`                  | Port nke server             |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Base URL maka frontend      |
| `JWT_SECRET`           | (mepụta ya n'elu)        | Secret maka ịbịanye aka JWT |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Password mbata mbụ          |
| `APP_LOG_LEVEL`        | `info`                   | Ọkwa nkọwa nke log          |

### Ntọala Dashboard

Dashboard na-enye toggles UI maka atụmatụ ndị nwekwara ike ịhazi site na environment variables:

| Ebe Ntọala Dị       | Toggle             | Nkọwa                        |
| ------------------- | ------------------ | ---------------------------- |
| Settings → Advanced | Debug Mode         | Kwado logs arịrịọ debug (UI) |
| Settings → General  | Sidebar Visibility | Gosi/zoo ngalaba sidebar     |

A na-echekwa ntọala ndị a na database, ha na-adịgidekwa mgbe e bidoghachiri sistemụ, ma na-anọchi uru ndabara nke env var mgbe edobere ha.

### Ịgba Ya na Kọmputa Gị

```bash
# Ọnọdụ mmepe (hot reload)
npm run dev

# Build maka production
npm run build    # next build → .build/next/ wee assembleStandalone → dist/
npm run start

# Compile ngwa ngwa nke backend/API naanị maka mgbanwe ndị ndị ntinye aka mere
npm run build:contributor

# Build maka release (clean rebuild + HEAD sentinel — achọrọ maka deploy)
npm run build:release   # rm -rf .build dist && build + na-ede dist/BUILD_SHA

# Nhazi port a na-ejikarị
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Build nke onye ntinye aka na-eme naanị nkwado compile: ọ naghị achịkọta standalone
distribution ma ọ bụ wuo optional native packaging assets. Jiri build production nkịtị mgbe
ịchọrọ ịnwale bundle a pụrụ ibuga.

### Nhazi Ebe Build Output Dị

| Directory | Ihe Dị N'ime Ya                                                       | Git Na-eso Ya |
| --------- | --------------------------------------------------------------------- | ------------- |
| `src/`    | Source nke ngwa (TypeScript / TSX)                                    | Ee            |
| `.build/` | Ihe etiti — output `next build` (gitignored, `distDir = .build/next`) | Mba           |
| `dist/`   | Bundle a pụrụ ibuga — nke `assembleStandalone` chịkọtara (gitignored) | Mba           |

Build pipeline na-agafe naanị otu ugboro:

```
npm run build
  └─ next build → .build/next/standalone  (output Next.js)
  └─ assembleStandalone()                 (na-edetuo standalone + static + public + native assets)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` na-ehichapụkwa directories abụọ ahụ tupu oge eruo ma dee
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) dịka deploy integrity sentinel.

`npm run build:contributor` na-eji build profile nke backend naanị. Ọ na-etinye stubs nwa oge
n'ọnọdụ faịlụ UI dashboard mgbe ọ na-ewu, na-edobe API route handlers, ma weghachite faịlụ mbụ
mgbe build gwụsịrị. Jiri `npm run build` maka mgbanwe ndị na-emetụta UI dashboard ma ọ bụ maka
nkwado release zuru ezu; contributor profile abụghị ihe ga-anọchi release build.

> **Ndetu deploy VPS:** remote image directory `/usr/lib/node_modules/omniroute/app/`
> agbanwebeghị. Deploy skills na-eji rsync ebufe ihe dị n'ime `dist/` banye na ya.
> Naanị build output path dị n'ime repository ka e bugharịrị (`app/` → `dist/`).

URL ndabara:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Usoro Ọrụ Git

> ⚠️ **EMELA commit ozugbo na `main`.** Jiri feature branches mgbe niile.
>
> **PR base:** tụnye aka na branch `release/vX.Y.Z` nke na-arụ ọrụ ugbu a (ọ bụghị `main`). Lee
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) maka usoro
> release-kwa-branch + tag-mgbe-a-na-ebupu.

```bash
# Mepụta branch site na nsọtụ release na-arụ ọrụ ugbu a (ọmụmaatụ: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... mee mgbanwe ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Mepee Pull Request nke base = release/v3.8.49
```

### Ịkpọ Branch Aha

| Prefix      | Ebumnuche                 |
| ----------- | ------------------------- |
| `feat/`     | Njirimara ọhụrụ           |
| `fix/`      | Ndozi bug                 |
| `refactor/` | Ịhazigharị koodu          |
| `docs/`     | Mgbanwe akwụkwọ nkọwa     |
| `test/`     | Mgbakwunye/ndozi ule      |
| `chore/`    | Ngwaọrụ, CI, dependencies |

### Ozi Commit

Soro [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Ịgba Ule

```bash
# Ule niile (unit + vitest + ecosystem + e2e)
npm run test:all

# Otu faịlụ ule (Node.js native test runner — ọtụtụ ule na-eji nke a)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Naanị ule unit mgbanwe gị metụtara (otu TIA selector ahụ dị ka CI gate, #8084)
npm run test:scoped            # mgbanwe dị na commit ikpeazụ (ma ọ bụ working tree)
npm run test:scoped:staged     # naanị mgbanwe e tinyere na stage — na-arụkọ ọrụ nke ọma na pre-commit run
npm run test:scoped:full       # buru ụzọ wughachi import-graph map (mgbe ị gbakwụnyere/bugharịrị faịlụ)
# Exit 1 + "run the full suite" pụtara na hub file (tsconfig, package.json, …) ma ọ bụ
# source na-enweghị mapping gbanwere — selector na-adaba n'ụzọ nchekwa, ọ naghị ahapụ ihe n’ime nzuzo.

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# Ule E2E (Playwright dị mkpa)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ule ndakọrịta ecosystem
npm run test:ecosystem

# Coverage gate: 60% statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Nlele lint + format
npm run lint
npm run check

# Gated real-upstream combo smoke (VPS access + ezigbo provider credits dị mkpa)
# Ọ na-akpọ EZIGBO providers — ọ na-eri obere ego. Ọ DỊGHỊ mgbe ọ na-agba na CI. Ọ na-awụfe nke ọma ma gate adịghị.
# Ihe dị mkpa: ohere ssh root@192.168.0.15 (ọ na-eweta read-only DB snapshot site na VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — script Node ESM nkịtị, na-akpọ live .15 server ozugbo.
# Ihe dị mkpa: ohere ssh root@192.168.0.15 (a na-emepụta/akwatu combos site na SSH sqlite).
# Ọ na-akpọ EZIGBO providers (obere ego). Ọ na-emepụta/ehichapụ naanị __live_test__* combos. Ọ DỊGHỊ mgbe ọ na-agba na CI.
# REQUIRE_API_KEY=false na .15 ya mere API key adịghị mkpa, mana ọ na-asọpụrụ COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY ma ọ bụrụ na edobere ha.
npm run test:combo:live:vps              # ọnọdụ HTTP 7 (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # na-agbakwụnye ezigbo ọnọdụ cross-provider failover (8 n’ozuzu)
```

Nkọwa coverage:

- `npm run test:coverage` na-atụ coverage nke source maka unit test suite bụ isi, na-ewepụ `tests/**`, ma tinye `open-sse/**`
- Pull requests ga-edobe coverage gate na **60%+** statements/lines/functions/branches
- Ọ bụrụ na PR agbanwee production code dị na `src/`, `open-sse/`, `electron/`, ma ọ bụ `bin/`, ọ ga-agbakwunye ma ọ bụ melite automated tests n’otu PR ahụ
- `npm run coverage:report` na-ebipụta akụkọ zuru ezu faịlụ-kwa-faịlụ sitere na coverage run kachasị ọhụrụ
- `npm run test:coverage:legacy` na-echekwa metric ochie maka ntụnyere akụkọ ihe mere eme
- Lee `docs/ops/COVERAGE_PLAN.md` maka roadmap e kewara n’usoro iji meziwanye coverage

### Ihe Pull Request Ga-Enwerịrị

Tupu imepee PR, jiri
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) gbaa focused loop maka
ihe ị gbanwere. Unit suite zuru ezu (CI shards 4), Vitest, coverage gate **60%+**, na
production build bụ ọrụ CI — ịgba ha na kọmputa nke gị anaghị enye ozi ọzọ PR
checks agaghị enye gị, ma na igwe ndị pere mpe ọ nwere ike imeju host (#8084):

- Gbaa faịlụ ule ndị na-ekpuchi mgbanwe gị: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Gbaa `npm run lint`
- Tinye ma ọ bụ melite automated tests n’otu PR ahụ mgbe ọ bụla production code gbanwere
- Tinye faịlụ ule ndị gbanwere ma ọ bụ ndị agbakwunyere na nkọwa PR mgbe production code gbanwere
- Lelee nsonaazụ SonarQube na PR mgbe ahaziri project secrets na CI

Ọnọdụ ule ugbu a: **faịlụ unit test 122** na-ekpuchi:

- Provider translators na ntụgharị format
- Rate limiting, circuit breaker, na resilience
- Semantic cache, idempotency, na progress tracking
- Database operations na schema (DB modules 21)
- OAuth flows na authentication
- Nkwado API endpoint (Zod v4)
- Ngwaọrụ MCP server na mmanye scope
- Sistemụ Memory na Skills

---

## Ụdị Koodu

- **ESLint** — Gbaa `npm run lint` tupu ime commit
- **Prettier** — A na-ahazi ya na-akpaghị aka site na `lint-staged` mgbe a na-eme commit (oghere 2, semicolon, akara nhota abụọ, obosara mkpụrụedemede 100, es5 trailing commas)
- **TypeScript** — Koodu niile dị na `src/` na-eji `.ts`/`.tsx`; `open-sse/` na-eji `.ts`/`.js`; jiri TSDoc (`@param`, `@returns`, `@throws`) dee dokumenteshọn
- **Enweghị `eval()`** — ESLint na-amanye `no-eval`, `no-implied-eval`, `no-new-func`
- **Nnyocha Zod** — Jiri schema Zod v4 maka nnyocha input API niile
- **Ịkpọ aha**: Faịlụ = camelCase/kebab-case, components = PascalCase, constants = UPPER_SNAKE

### Ijikwa njehie / blọk catch efu

Ahapụla `catch` na-enweghị nkọwa. Kewaa ya n’otu n’ime ngalaba abụọ ndị a (nke a na-eme ka
iwu siri ike ahụ “ekwela ka e loo njehie na nzuzo n’ime iyi SSE” bụrụ usoro a na-eme):

- **Nke e bu n’obi (nhichapụ/telemetry anyị nke best-effort)** — a na-atụ anya ọdịda ebe a,
  ọ dịghịkwa nsogbu ọ na-akpata; tinye nkọwa otu ahịrị maka ihe kpatara ya, etinyela logging
  (logging na request ọ bụla bụ mkpọtụ usoro a na-ezere).

  ```ts
  } catch {} // a na-atụ anya imechi controller emechirila mgbe client kwụsịrị njikọ
  ```

- **Kwesịrị idekọ na log (koodu mpụga/nke onye kpọrọ nyere, ma ọ bụ mgbe ilo njehie ahụ gbanwere usoro njikwa)** — hapụ
  catch ahụ (ekwela ka ọ mebie iyi ahụ), mana wepụta `console.debug`/`warn` nwere nkọwa ka e nwee
  ike ịchọpụta ọdịda ahụ.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Lee `open-sse/utils/stream.ts` na `open-sse/utils/streamHandler.ts` maka ihe atụ etinyegoro n’ọrụ.

---

## Nhazi Ọrụ Ngo

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Ibe dashboard (ngalaba 23)
│   ├── api/                # Ụzọ API (directory 51)
│   └── login/              # Ibe authentication (.tsx)
├── domain/                 # Injin policy (policyEngine, comboResolver, costRules, wdg.)
├── lib/                    # Isi logic azụmahịa (.ts)
│   ├── a2a/                # Server protokol Agent-to-Agent v0.3
│   ├── acp/                # Registry Agent Communication Protocol
│   ├── compliance/         # Injin policy compliance
│   ├── db/                 # Modul domain SQLite + migration 130
│   ├── memory/             # Ebe nchekwa mkparịta ụka na-adịgide adịgide
│   ├── oauth/              # Provider, service, na utility OAuth
│   ├── skills/             # Framework skill a pụrụ ịgbasawanye
│   ├── usage/              # Nsochi ojiji na ngụkọta ọnụahịa
│   └── localDb.ts          # Naanị layer re-export — etinyela logic ebe a
├── middleware/              # Middleware request (promptInjectionGuard)
├── mitm/                   # Proxy MITM (cert, DNS, routing target)
├── shared/
│   ├── components/         # Component React (.tsx)
│   ├── constants/          # Nkọwa provider (329), scope MCP, atụmatụ routing 19
│   ├── utils/              # Circuit breaker, sanitizer, ihe enyemaka authentication
│   └── validation/         # Schema Zod v4
└── sse/                    # Pipeline proxy SSE

open-sse/                   # Workspace @omniroute/open-sse
├── executors/              # Modul implementation executor 89
├── handlers/               # Handler request 11 (chat, responses, embeddings, images, wdg.)
├── mcp-server/             # Server MCP (ngwaọrụ pụrụ iche 110, transport 3, scope 33)
├── services/               # Service ọkwa elu 178 (combo, autoCombo, rateLimitManager, wdg.)
├── translator/             # Ndị ntụgharị format (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Transformer Responses API
└── utils/                  # Modul utility 22 (stream, TLS, proxy, logging)

electron/                   # Ngwa desktop Electron (cross-platform)

tests/
├── unit/                   # Test runner Node.js (faịlụ test 1,574)
├── integration/            # Test integration
├── e2e/                    # Test Playwright
├── security/               # Test nchekwa
├── translator/             # Test ndị metụtara translator kpọmkwem
└── load/                   # Test ibu ọrụ

docs/
├── adr/                     # Ndekọ Mkpebi Architecture
├── architecture/            # Architecture sistemụ na ikike ịnagide ọdịda
├── comparison/              # OmniRoute megide nhọrọ ndị ọzọ
├── compression/             # Ntuziaka na iwu compression
├── dev/                     # Ntuziaka mmepe
├── diagrams/                # Eserese architecture
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Ntuziaka onye ọrụ, Docker, setup, idozi nsogbu
├── i18n/                    # Ntụgharị README n’asụsụ mba dị iche iche
├── marketing/               # Ihe ndị e ji eme marketing
├── ops/                     # Deployment, proxy, coverage, release
├── providers/               # Dokumenteshọn kpọmkwem maka provider
├── reference/               # Ntụaka API, env vars, ngwa CLI, free tiers
├── releases/                # Ihe edeturu gbasara release
├── routing/                 # Injin auto-combo, reasoning replay
├── screenshots/             # Screenshot dashboard
├── security/                # Guardrails, compliance, stealth, token
└── specs/                   # Nkọwapụta imewe
```

---

## Ịtinye Provider Ọhụrụ

### Nzọụkwụ 1: Debanye Constants nke Provider Aha

Tinye na `src/shared/constants/providers.ts` — Zod na-enyocha ya mgbe module na-ebido.

### Nzọụkwụ 2: Tinye Executor (ọ bụrụ na achọrọ mgbagha pụrụ iche)

Mepụta executor na `open-sse/executors/your-provider.ts` nke na-agbatị base executor.

### Nzọụkwụ 3: Tinye Translator (ọ bụrụ na usoro ahụ abụghị nke OpenAI)

Mepụta request/response translators na `open-sse/translator/`.

### Nzọụkwụ 4: Tinye Nhazi OAuth (ọ bụrụ na ọ dabere na OAuth)

Tinye credentials OAuth na `src/lib/oauth/constants/oauth.ts` na service na `src/lib/oauth/services/`.

Ọ bụrụ na upstream provider na-ekesa OAuth client_id/secret ọhaneze ma ọ bụ Firebase Web API key n'ime CLI / browser bundle ọhaneze ya, **etinyela** ya dịka string literal. Jiri `resolvePublicCred()` sitere na `open-sse/utils/publicCreds.ts` ma tinye masked byte entry na `EMBEDDED_DEFAULTS`. Edekọrọ usoro zuru ezu a ga-agbasorịrị na [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

N'ime handlers/executors, ozi njehie ndị na-erute client ga-esirịrị na `buildErrorBody()` / `sanitizeErrorMessage()` sitere na `open-sse/utils/error.ts` gafee — etinyela raw `err.stack` ma ọ bụ `err.message` n'ime body nke Response. Lee [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Nzọụkwụ 5: Debanye Models

Tinye nkọwa model na `open-sse/config/providerRegistry.ts`.

### Nzọụkwụ 6: Tinye Tests

Dee unit tests na `tests/unit/` nke ga-ekpuchi ma ọ dịkarịa ala:

- Ndebanye provider
- Ntugharị request/response
- Nlekọta njehie

---

## Ndepụta Nnyocha Pull Request

- [ ] Tests gafere (`npm test`)
- [ ] Linting gafere (`npm run lint`)
- [ ] Build gara nke ọma (`npm run build`)
- [ ] Agbakwunyere ụdị TypeScript maka functions na interfaces ọhaneze ọhụrụ
- [ ] Enweghị secrets ma ọ bụ fallback values e dere ozugbo na koodu
- [ ] E tinyere public upstream credentials site na `resolvePublicCred()` (lee [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), ọ bụghị dịka literals
- [ ] Error responses na-agafe na `buildErrorBody()` / `sanitizeErrorMessage()` — enweghị raw stack traces n'ime response bodies (lee [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell commands (`exec` / `spawn`) na-ebufe runtime values site na `env`, ọ bụghị site na string interpolation
- [ ] E ji Zod schemas nyochaa inputs niile
- [ ] Agbakwunyere **fragment** changelog n'okpuru `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` maka mgbanwe ndị users ga-ahụ (lee [`changelog.d/README.md`](./changelog.d/README.md)) — **edezigharịla** `CHANGELOG.md` ozugbo; a na-achịkọta fragments n'oge release, ha anaghịkwa enwe conflict n'etiti PRs
- [ ] Emelitere documentation (ọ bụrụ na ọ dị mkpa)
- [ ] Enweghị alerts ọhụrụ nke CodeQL / Secret-Scanning e mepere, ma ọ bụ a kagburu nke ọ bụla site na technical justification nke na-ezo aka na doc kwesịrị ekwesị dị na `docs/security/`
- [ ] Routes ndị na-emepụta child processes (`/api/mcp/`, `/api/cli-tools/runtime/`) ka e kewara dịka `isLocalOnlyPath()` na `src/server/authz/routeGuard.ts` — lee [Iwu Siri Ike #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Enweghị trailers `Co-Authored-By` n'ime commit messages — commits ga-apụta naanị n'okpuru Git identity nke onye nwe repository (Iwu Siri Ike #16)

---

## Ịwepụta Mwepụta

A na-ejikwa mwepụta site na workflow `/generate-release`. Mgbe e mepụtara GitHub Release ọhụrụ, a na-ebipụta ngwugwu ahụ **na-akpaghị aka na npm** site na GitHub Actions.

Maka deployment VPS, jiri `npm run build:release` (ọ bụghị `npm run build`) — ọ na-eme nrụgharị dị ọcha,
na-achịkọta bundle ahụ n'ime `dist/`, ma na-ede sentinel `dist/BUILD_SHA`.
Mgbe ahụ, jiri skills `/deploy-vps-*-cc` ndị na-eji rsync ebuga `dist/` na directory `app/` dị na remote.

---

## Inweta Enyemaka

- **Ọdịdị sistemụ**: Lee [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Ntụaka API**: Lee [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Akwụkwọ nchekwa**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Akwụkwọ arụmọrụ**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Nsogbu**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: Lee `docs/adr/` maka ndekọ mkpebi gbasara ọdịdị sistemụ
