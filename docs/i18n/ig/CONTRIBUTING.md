# Contributing to OmniRoute (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Daalụ maka mmasị gị n'ịtụnye aka! Ntuziaka a na-ekpuchi ihe niile ịchọrọ iji malite.

Maka usoro ọrụ gọọmentị maka mgbanwe ọ bụla, malite na
[Ụzọ Ọlaedo nke Ịtụnye Aka](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Ọ na-ejikọta mgbanwe ndị metụtara provider, routing,
UI/UX, i18n, CLI, database, na build/deploy na nkwekọrịta ha, ule ndị e lekwasịrị anya na ha, mkpuchi CI,
na usoro ime ka ihe kwekọọ.

---

## Nhazi Mmepe

### Ihe Ndị A Chọrọ Tupu Amalite

- **Node.js** `>=22.22.2 <23`, ma ọ bụ `>=24.0.0 <27` (a tụrụ aro: 24 LTS)
- **npm** 10+

> **Ndị ọrụ npm v11+ (Node 24+):** Mgbe `npm install` gachara, chọpụta na etinyere modul native:
> `node -e "require('better-sqlite3')"`. Ọ bụrụ na ọ daa na `MODULE_NOT_FOUND`,
> mee `npm approve-scripts better-sqlite3 && npm install`. Lee
> [Nchọpụta na ndozi nsogbu](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klọnụ ma Wụnye

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Mgbanwe Gburugburụ

```bash
# Mepụta .env gị site na ndebiri ahụ
cp .env.example .env

# Mepụta ihe nzuzo ndị achọrọ
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Mgbanwe ndị bụ isi maka mmepe:

| Mgbanwe                | Ndabara Mmepe            | Nkọwa                    |
| ---------------------- | ------------------------ | ------------------------ |
| `PORT`                 | `20128`                  | Ọdụ sava                 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | URL ntọala maka ihu ngwa |
| `JWT_SECRET`           | (mepụta ya n’elu)        | Ihe nzuzo mbinye aka JWT |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Okwuntughe nbanye mbụ    |
| `APP_LOG_LEVEL`        | `info`                   | Ọkwa nkọwa nke ndekọ     |

### Ntọala Bọọdụ Njikwa

Bọọdụ njikwa ahụ na-enye mgba ọkụ UI maka atụmatụ ndị nwekwara ike ịhazi site na mgbanwe gburugburụ:

| Ebe Ntọala Dị       | Mgba Ọkụ              | Nkọwa                                   |
| ------------------- | --------------------- | --------------------------------------- |
| Ntọala → Nke Dị Elu | Ọnọdụ Nchọpụta Njehie | Kwado ndekọ arịrịọ nchọpụta njehie (UI) |
| Ntọala → Izugbe     | Ọdịdị Ogwe Akụkụ      | Gosi/zoo ngalaba ogwe akụkụ             |

A na-echekwa ntọala ndị a na ọdụ data, ha na-adịgidekwa mgbe ebidoghachiri ngwa, ma na-akagbu ndabara mgbanwe gburugburụ mgbe edobere ha.

### Ịgba Ya na Kọmputa Mpaghara

```bash
# Ọnọdụ mmepe (ntinyegharị ozugbo)
npm run dev

# Mwulite mmepụta
npm run build    # next build → .build/next/ wee assembleStandalone → dist/
npm run start

# Nchịkọta backend/API-naanị dị ọsọ maka mgbanwe ndị ntinye-aka
npm run build:contributor

# Mwulite mwepụta (mwuliteghachi dị ọcha + ihe nche HEAD — achọrọ maka mbuga)
npm run build:release   # rm -rf .build dist && build + na-ede dist/BUILD_SHA

# Nhazi ọdụ a na-ejikarị
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Mwulite onye ntinye-aka na-eme nkwado nchịkọta-naanị: ọ naghị achịkọta nkesa standalone
ma ọ bụ wulite akụrụngwa nkwakọ native ndị na-abụghị iwu. Jiri mwulite mmepụta nkịtị mgbe
ịchọrọ ịkwado ngwugwu a pụrụ ibuga.

### Nhazi Nsonaazụ Mwulite

| Ndekọ     | Ihe Ndị Dị N’ime                                                            | Git Na-eso Ya |
| --------- | --------------------------------------------------------------------------- | ------------- |
| `src/`    | Koodu mmalite ngwa (TypeScript / TSX)                                       | Ee            |
| `.build/` | Ihe etiti — nsonaazụ `next build` (git anaghị eso, `distDir = .build/next`) | Mba           |
| `dist/`   | Ngwugwu a pụrụ ibuga — nke `assembleStandalone` chịkọtara (git anaghị eso)  | Mba           |

Usoro mwulite ahụ bụ otu ngafe:

```
npm run build
  └─ next build → .build/next/standalone  (nsonaazụ Next.js)
  └─ assembleStandalone()                 (na-edepụta standalone + static + public + akụrụngwa native)
       └─ nsonaazụ: dist/                 (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` na-ebu ụzọ hichapụ ndekọ abụọ ahụ ma dee
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) dịka ihe nche iguzosi ike n’ezi ihe nke mbuga.

`npm run build:contributor` na-eji profaịlụ mwulite backend-naanị. Ọ na-eji stub dochie
faịlụ UI bọọdụ njikwa nwa oge mgbe a na-ewulite, na-edobe ndị njikwa ụzọ API, ma weghachite faịlụ mbụ
mgbe mwulite ahụ gachara. Jiri `npm run build` maka mgbanwe ndị na-emetụta UI bọọdụ njikwa ma ọ bụ maka
nkwado mwepụta zuru ezu; profaịlụ onye ntinye-aka abụghị nnọchi maka mwulite mwepụta.

> **Ndetu mbuga VPS:** ndekọ image dị n’ebe dị anya `/usr/lib/node_modules/omniroute/app/`
> agbanwebeghị. Ngwa ọrụ mbuga na-eji rsync ebuga ihe ndị dị na `dist/` n’ime ya.
> Naanị ụzọ nsonaazụ mwulite dị n’ime repo ka agbanweela (`app/` → `dist/`).

URL ndabara:

- **Bọọdụ Njikwa**: `http://localhost:20128/dashboard`
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

## Ọdịdị Projek

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Peeji dashboard (ngalaba 23)
│   ├── api/                # Ụzọ API (ndekọ 51)
│   └── login/              # Peeji njirimara (.tsx)
├── domain/                 # Injin amụma (policyEngine, comboResolver, costRules, wdg.)
├── lib/                    # Ọrụ azụmahịa ndị bụ isi (.ts)
│   ├── a2a/                # Sava protokol Agent-to-Agent v0.3
│   ├── acp/                # Ndebanye aha Agent Communication Protocol
│   ├── compliance/         # Injin amụma nrubeisi
│   ├── db/                 # Modul ngalaba SQLite + mbugharị 130
│   ├── memory/             # Ebe nchekwa mkparịta ụka na-adịgide adịgide
│   ├── oauth/              # Ndị na-eweta OAuth, ọrụ, na ngwa enyemaka
│   ├── skills/             # Usoro nka enwere ike ịgbatị
│   ├── usage/              # Nsochi ojiji na mgbakọ ọnụahịa
│   └── localDb.ts          # Naanị oyi akwa mbupụgharị — etinyela mgbagha ebe a
├── middleware/              # Middleware arịrịọ (promptInjectionGuard)
├── mitm/                   # Proxy MITM (asambodo, DNS, ntụgharị ebe a na-aga)
├── shared/
│   ├── components/         # Komponentị React (.tsx)
│   ├── constants/          # Nkọwa ndị na-eweta (329), oke MCP, atụmatụ ntụgharị 21
│   ├── utils/              # Circuit breaker, sanitizer, ndị enyemaka njirimara
│   └── validation/         # Schema Zod v4
└── sse/                    # Usoro proxy SSE

open-sse/                   # Ebe ọrụ @omniroute/open-sse
├── executors/              # Modul executor 150 (klaasị executor + ndị enyemaka maka onye na-eweta ọ bụla)
├── handlers/               # Ndị njikwa arịrịọ 11 (nkata, nzaghachi, embeddings, onyonyo, wdg.)
├── mcp-server/             # Sava MCP (ngwaọrụ pụrụ iche 110, ụzọ mbufe 3, oke 33)
├── services/               # Ọrụ ọkwa kachasị elu 178 (combo, autoCombo, rateLimitManager, wdg.)
├── translator/             # Ndị ntụgharị usoro (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Ihe mgbanwe Responses API
└── utils/                  # Modul enyemaka 22 (stream, TLS, proxy, ndekọ)

electron/                   # Ngwa desktọpụ Electron (na-arụ ọrụ n'elu nyiwe dị iche iche)

tests/
├── unit/                   # Onye na-agba ule Node.js (faịlụ ule 1,574)
├── integration/            # Ule njikọta
├── e2e/                    # Ule Playwright
├── security/               # Ule nchekwa
├── translator/             # Ule ndị metụtara onye ntụgharị kpọmkwem
└── load/                   # Ule ibu

docs/
├── adr/                     # Ndekọ Mkpebi Nhazi
├── architecture/            # Nhazi sistemụ na ike iguzogide nsogbu
├── comparison/              # OmniRoute tụnyere nhọrọ ndị ọzọ
├── compression/             # Ntuziaka na iwu mkpakọ
├── dev/                     # Ntuziaka mmepe
├── diagrams/                # Eserese nhazi
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Ntuziaka onye ọrụ, Docker, nhazi, idozi nsogbu
├── i18n/                    # Ntụgharị README e mere maka asụsụ mba ụwa
├── marketing/               # Ihe mgbasa ozi ahịa
├── ops/                     # Mbugharị, proxy, mkpuchi, mwepụta
├── providers/               # Akwụkwọ metụtara ndị na-eweta kpọmkwem
├── reference/               # Nrụtụaka API, mgbanwe gburugburu, ngwa CLI, ọkwa efu
├── releases/                # Ihe edeturu gbasara mwepụta
├── routing/                 # Injin auto-combo, mmegharị ntụgharị uche
├── screenshots/             # Nseta ihuenyo dashboard
├── security/                # Ihe mgbochi, nrubeisi, izochi onwe, token
└── specs/                   # Nkọwapụta nhazi
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

## Ndepụta Nlele Pull Request

- [ ] Nnwale gafere (`npm test`)
- [ ] Linting gafere (`npm run lint`)
- [ ] Nrụpụta gara nke ọma (`npm run build`)
- [ ] Agbakwunyere ụdị TypeScript maka ọrụ na interface ọhụụ ndị ọha na-eji
- [ ] Enweghị ihe nzuzo ma ọ bụ fallback values e dere kpọmkwem n'ime koodu
- [ ] E tinyere credentials ọha nke upstream site na `resolvePublicCred()` (lee [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), ọ bụghị dị ka literals
- [ ] Nzaghachi njehie na-agafe na `buildErrorBody()` / `sanitizeErrorMessage()` — enweghị raw stack traces n'ime response bodies (lee [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Iwu shell (`exec` / `spawn`) na-ebufe runtime values site na `env`, ọ bụghị site na string interpolation
- [ ] E jiri Zod schemas nyochaa inputs niile
- [ ] Agbakwunyere **fragment** nke changelog n'okpuru `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` maka mgbanwe ndị ọrụ ga-ahụ (lee [`changelog.d/README.md`](./changelog.d/README.md)) — **edezila** `CHANGELOG.md` ozugbo; a na-achịkọta fragments n'oge release, ha anaghịkwa enwe esemokwu n'etiti PR dị iche iche
- [ ] Emelitere documentation (ma ọ bụrụ na ọ dị mkpa)
- [ ] Enweghị alerts ọhụrụ nke CodeQL / Secret-Scanning e mepere, ma ọ bụ a kagburu nke ọ bụla site na technical justification nke na-arụtụ aka na doc kwesịrị ekwesị dị na `docs/security/`
- [ ] E kọwara routes ndị na-amalite child processes (`/api/mcp/`, `/api/cli-tools/runtime/`) dị ka `isLocalOnlyPath()` n'ime `src/server/authz/routeGuard.ts` — lee [Iwu Siri Ike #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Enweghị trailers AI/bot `Co-authored-by` n'ime commit messages (Iwu Siri Ike #16) — a na-enye ndị mmadụ rụkọrọ ọrụ, ndị e ji ọrụ ha mee ihe ọzọ, otuto site na trailers ọkọlọtọ `Co-authored-by: Name <email>`

---

## Ịwepụta Mwepụta

A na-ejikwa mwepụta site na workflow `/generate-release`. Mgbe e mepụtara GitHub Release ọhụrụ, a na-ebipụta ngwugwu ahụ **na-akpaghị aka na npm** site na GitHub Actions.

Maka deployment VPS, jiri `npm run build:release` (ọ bụghị `npm run build`) — ọ na-eme nrụgharị dị ọcha,
na-achịkọta bundle ahụ n'ime `dist/`, ma na-ede sentinel `dist/BUILD_SHA`.
Mgbe ahụ, jiri skills `/deploy-vps-*-cc` ndị na-eji rsync ebuga `dist/` na directory `app/` dị na remote.

---

## Inweta Enyemaka

- **Nhazi sistemụ**: Hụ [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Ntụaka API**: Hụ [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Akwụkwọ nchekwa**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Akwụkwọ ọrụ sistemụ**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Nsogbu**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
