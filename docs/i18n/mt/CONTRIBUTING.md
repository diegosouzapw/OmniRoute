# Contributing to OmniRoute (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Grazzi tal-interess tiegħek li tikkontribwixxi! Din il-gwida tkopri dak kollu li għandek bżonn biex tibda.

Għall-fluss tax-xogħol uffiċjali għal kull bidla, ibda bil-
[Proċess Ideali għall-Kontribuzzjonijiet](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Dan jorbot il-bidliet fil-fornituri, fir-routing,
fl-UI/UX, fl-i18n, fis-CLI, fid-database, u fil-bini/implimentazzjoni mal-kuntratti tagħhom, mat-testijiet immirati, mal-kopertura tas-CI,
u mal-passi ta' rikonċiljazzjoni.

---

## Konfigurazzjoni tal-Iżvilupp

### Prerekwiżiti

- **Node.js** `>=22.22.2 <23`, jew `>=24.0.0 <27` (rakkomandat: 24 LTS)
- **npm** 10+

> **Utenti ta' npm v11+ (Node 24+):** Wara `npm install`, ivverifika li l-moduli nattivi ġew installati:
> `node -e "require('better-sqlite3')"`. Jekk ifalli b'`MODULE_NOT_FOUND`,
> ħaddem `npm approve-scripts better-sqlite3 && npm install`. Ara
> [Soluzzjoni tal-Problemi](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Ikklona u Installa

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Varjabbli tal-Ambjent

```bash
# Oħloq il-fajl .env tiegħek mill-mudell
cp .env.example .env

# Iġġenera s-sigrieti meħtieġa
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Varjabbli ewlenin għall-iżvilupp:

| Varjabbli              | Valur Predefinit tal-Iżvilupp | Deskrizzjoni                    |
| ---------------------- | ----------------------------- | ------------------------------- |
| `PORT`                 | `20128`                       | Port tas-server                 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`      | URL bażi għall-frontend         |
| `JWT_SECRET`           | (iġġenera hawn fuq)           | Sigriet għall-iffirmar tal-JWT  |
| `INITIAL_PASSWORD`     | `CHANGEME`                    | Password tal-ewwel login        |
| `APP_LOG_LEVEL`        | `info`                        | Livell ta' dettall tar-reġistru |

### Settings tad-Dashboard

Id-dashboard jipprovdi kontrolli fl-UI għal funzjonalitajiet li jistgħu jiġu kkonfigurati wkoll permezz tal-varjabbli tal-ambjent:

| Post tas-Setting     | Kontroll                         | Deskrizzjoni                                 |
| -------------------- | -------------------------------- | -------------------------------------------- |
| Settings → Avvanzati | Modalità ta' Debug               | Attiva r-reġistri tat-talbiet tad-debug (UI) |
| Settings → Ġenerali  | Viżibbiltà tal-Istrixxa tal-Ġenb | Uri/aħbi t-taqsimiet tal-istrixxa tal-ġenb   |

Dawn is-settings jinħażnu fid-database u jibqgħu fis-seħħ bejn startjar mill-ġdid, filwaqt li jieħdu preċedenza fuq il-valuri predefiniti tal-varjabbli tal-ambjent meta jkunu ssettjati.

### Tħaddim Lokalment

```bash
# Modalità tal-iżvilupp (rikarigu awtomatiku)
npm run dev

# Build tal-produzzjoni
npm run build    # next build → .build/next/ imbagħad assembleStandalone → dist/
npm run start

# Kompilazzjoni rapida tal-backend/API biss għal bidliet mill-kontributuri
npm run build:contributor

# Build tar-rilaxx (build mill-ġdid nadif + sentinella HEAD — meħtieġ għad-deployment)
npm run build:release   # rm -rf .build dist && build + jikteb dist/BUILD_SHA

# Konfigurazzjoni komuni tal-port
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Il-build tal-kontributur iwettaq validazzjoni permezz tal-kompilazzjoni biss: ma jiġborx id-distribuzzjoni
standalone u lanqas jibni l-assi fakultattivi tal-ippakkjar nattiv. Uża l-build regolari tal-produzzjoni meta
jkollok bżonn tivvalida l-pakkett lest għad-distribuzzjoni.

### Struttura tal-Output tal-Build

| Direttorju | Kontenut                                                                         | Traċċat |
| ---------- | -------------------------------------------------------------------------------- | ------- |
| `src/`     | Kodiċi sors tal-applikazzjoni (TypeScript / TSX)                                 | Iva     |
| `.build/`  | Fajls intermedji — output ta' `next build` (gitignored, `distDir = .build/next`) | Le      |
| `dist/`    | Pakkett lest għad-distribuzzjoni — miġbur minn `assembleStandalone` (gitignored) | Le      |

Il-pipeline tal-build jitwettaq f'pass wieħed:

```
npm run build
  └─ next build → .build/next/standalone  (output ta' Next.js)
  └─ assembleStandalone()                 (jikkopja standalone + static + public + assi nattivi)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` barra minn hekk inaddaf iż-żewġ direttorji l-ewwel u jikteb
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) bħala sentinella tal-integrità tad-deployment.

`npm run build:contributor` juża l-profil tal-build tal-backend biss. Huwa jissostitwixxi temporanjament
il-fajls tal-UI tad-dashboard b'verżjonijiet stub waqt il-build, iżomm il-handlers tar-rotot tal-API, u jirrestawra l-fajls oriġinali
wara l-build. Uża `npm run build` għal bidliet li jaffettwaw l-UI tad-dashboard jew għal
validazzjoni sħiħa tar-rilaxx; il-profil tal-kontributur mhuwiex sostitut għall-build tar-rilaxx.

> **Nota dwar deployment fuq VPS:** id-direttorju remot tal-image `/usr/lib/node_modules/omniroute/app/`
> ma nbidilx. Il-mekkaniżmi tad-deployment jużaw rsync biex jikkopjaw fih il-kontenut ta' `dist/`.
> Inbidlet biss il-mogħdija tal-output tal-build fir-repożitorju (`app/` → `dist/`).

URLs predefiniti:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Flux ta' Git

> ⚠️ **QATT ma tcommetti direttament għal `main`.** Uża daqsbranches ta' features.
>
> **Base tal-PR:** targetta l-`release/vX.Y.Z` attiva (mhux `main`). Ara
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) għall-
> modell release-per-branch + tag-at-ship.

```bash
# Branch mill-punt release attiv (eżempju: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... agħmel bidla ...
git commit -m "feat: deskrivi l-bidla tiegħek"
git push -u origin feat/your-feature-name
# Iftah Pull Request b'base = release/v3.8.49
```

### Konvenzjoni ta' Isem tal-Branch

| Prefix      | Skop                             |
| ----------- | -------------------------------- |
| `feat/`     | Features ġodda                   |
| `fix/`      | Fixes ta' bugs                   |
| `refactor/` | Restrutturazzjoni tal-kod        |
| `docs/`     | Bidliet fid-dokumentazzjoni      |
| `test/`     | Aġġornamenti/fixes tat-testijiet |
| `chore/`    | Tooling, CI, dipendenzi          |

### Messaggi ta' Commit

Sewi [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Qed Tista' Tqies Testijiet

```bash
# Kollha t-testijiet (unit + vitest + ecosystem + e2e)
npm run test:all

# Singlu file ta' test (Node.js native test runner — l-aqwa testijiet jutu l-waħda)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Biex testijiet unit impattati biss mill-bidla tiegħek (istess TIA selector bħala l-CI gate, #8084)
npm run test:scoped            # bidliet fil-commit l-aħħar (jew working tree)
npm run test:scoped:staged     # bidliet staged biss — jaqbad sew b'pre-commit run
npm run test:scoped:full       # rebildja l-import-graph map l-ewwel (wara li tżid/temmuv file)
# Exit 1 + "run the full suite" jibni file hub (tsconfig, package.json, …) jew
# sorgenti unmapped bedlet — is-selektor jiffaġġa safe, ma jmissx silently.

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# Testijiet E2E (meħtieġ Playwright)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Testijiet ta' kompatibilità tal-ecosystem
npm run test:ecosystem

# Coverage gate: 60% statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Lint + format check
npm run lint
npm run check

# Gated real-upstream combo smoke (meħtieġ VPS access + real provider credits)
# Jipprovokaw PROVIDERS REALE — jiswa ftit. QATT ma jirri fil-CI. Jiskipa clean mingħajr il-gate.
# Meħtieġ: ssh root@192.168.0.15 access (sources a read-only DB snapshot mill-VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — plain Node ESM scripts, jipprovokaw live .15 server direttament.
# Meħtieġ: ssh root@192.168.0.15 access (combos created/torn down via SSH sqlite).
# Jipprovokaw PROVIDERS REALE (kost żgħira). Jikkreaw/jiddilettu biss __live_test__* combos. QATT ma jirri fil-CI.
# REQUIRE_API_KEY=false fuq .15 għax ebda API key meħtieġa, imma jirispetta COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY jekk msetjup.
npm run test:combo:live:vps              # 7 HTTP scenarios (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # żieda real cross-provider failover scenario (8 total)
```

Noti dwar Coverage:

- `npm run test:coverage` jikkalcola source coverage għall-main unit test suite, jieħu barra `tests/**`, u jinkludi `open-sse/**`
- Pull requests għandhom jibqgħu l-coverage gate b'**60%+**' statements/lines/functions/branches
- Jekk PR tibdel production code f'`src/`', `open-sse/`', `electron/`', jew `bin/`', għandha tżid jew tagħmel update għat-testijiet awtomatiċi fil-istess PR
- `npm run coverage:report` tipprinta d-dettaljat file-by-file report mill-aħħar coverage run
- `npm run test:coverage:legacy` tħalli l-metric l-qadima għal komparazzjoni storika
- Ara `docs/ops/COVERAGE_PLAN.md` għall-roadmap ta' phased coverage improvement

### Rekwiziti tal-Pull Request

Qabel ma tiftaħ PR, uża l-
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) biex tirri l-focused loop għal
x'bedlet. L-unit suite sħiħa (4 CI shards), Vitest, il-**60%+** coverage gate, u
il-production build huma responsabbiltà tal-CI — jirruhom lokalment ma jżidu xejn signal li
l-PR checks ma jkollokx, u fuq makkini żgħar jistgħu jissaturaw l-host (#8084):

- Irri l-test files li jkopru l-bidla tiegħek: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Irri `npm run lint`
- Inkludi jew agġorna testijiet awtomatiċi fil-istess PR meta production code jibbedel
- Inkludi l-test files bedlet jew mżidda fid-deskrizzjoni tal-PR meta production code bedlet
- Chekka r-riżultat ta' SonarQube fuq il-PR meta l-proġett secrets huma konfigurati fil-CI

Status attwali tat-testijiet: **122 unit test files** li jkopru:

- Provider translators u format conversion
- Rate limiting, circuit breaker, u resilience
- Semantic cache, idempotency, progress tracking
- Database operations u schema (21 DB modules)
- OAuth flows u authentication
- API endpoint validation (Zod v4)
- MCP server tools u scope enforcement
- Memory u Skills systems

## Stil tal-Kodiċi

- **ESLint** — Ħaddem `npm run lint` qabel ma tagħmel kummitment
- **Prettier** — Formatjar awtomatiku permezz ta' `lint-staged` fil-kummitment (spazji doppji, punti virgoli, virgoletti doppji, wisa' ta' 100 karattru, virgoli wara l-kkejk ta' l-es5)
- **TypeScript** — Kull kodiċi ta' `src/` juża `.ts`/`.tsx`; `open-sse/` juża `.ts`/`.js`; iddokumenta permezz ta' TSDoc (`@param`, `@returns`, `@throws`)
- **Ebda `eval()`** — L-ESLint jinfurza `no-eval`, `no-implied-eval`, `no-new-func`
- **Validazzjoni Zod** — Uża schemas ta' Zod v4 għal validazzjoni ta' dħul API kollha
- **Isem**: Fajls = camelCase/kebab-case, komponenti = PascalCase, kostanti = UPPER_SNAKE

### Tħaddim ta' żbalji / blokki catch vojta

Qatt tħalli `catch` mingħajr spjegazzjoni. Klassifikah f'wieħed miż-żewġ kategoriji (joperazzjonalizza l-istrett regola "qatt xwwak b'ssokkżiżzjoni silenzjuża f'xorriet SSE"):

- **Intenzjonali (it-tindif/telemetria ta' l-aħjar effort tagħna stess)** — falliment hawnhekk huwa mistenni u ħażin; żid kumment ta' spjegazzjoni ta' linja waħda, bla logging (logging fuq kull talba huwa l-istorbju li dan il-konvenzjonal jippoġġa):

  ```ts
  } catch {} // il-qbid ta' kontrollur diġà magħluq wara l-klijent jingħaqad huwa mistenni
  ```

- **Għandu jiġi logjat (kodiċi estern/mgħoti mill-issejħa, jew il-xwwak ibiddel il-kontroll)** — iżżomm il-catch (qatt tħallih jikser is-stream) iżda leġġi `console.debug`/`warn` kontestwali sabiex il-falliment jista' jiġi skopert.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Ara `open-sse/utils/stream.ts` u `open-sse/utils/streamHandler.ts` għal eżempji applikati.

---

## Struttura tal-Proġett

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # App Router ta’ Next.js 16
│   ├── (dashboard)/        # Paġni tad-dashboard (23 taqsima)
│   ├── api/                # Rotot tal-API (51 direttorju)
│   └── login/              # Paġni tal-awtentikazzjoni (.tsx)
├── domain/                 # Magna tal-politiki (policyEngine, comboResolver, costRules, eċċ.)
├── lib/                    # Loġika ewlenija tan-negozju (.ts)
│   ├── a2a/                # Server tal-protokoll Agent-to-Agent v0.3
│   ├── acp/                # Reġistru tal-Agent Communication Protocol
│   ├── compliance/         # Magna tal-politiki tal-konformità
│   ├── db/                 # Moduli tad-dominju SQLite + 130 migrazzjoni
│   ├── memory/             # Memorja persistenti tal-konversazzjonijiet
│   ├── oauth/              # Fornituri, servizzi u utilitajiet OAuth
│   ├── skills/             # Qafas estensibbli tal-ħiliet
│   ├── usage/              # Traċċar tal-użu u kalkolu tal-ispejjeż
│   └── localDb.ts          # Saff ta’ esportazzjoni mill-ġdid biss — qatt iżżid loġika hawn
├── middleware/              # Middleware tat-talbiet (promptInjectionGuard)
├── mitm/                   # Proxy MITM (ċertifikat, DNS, direzzjonar tad-destinazzjoni)
├── shared/
│   ├── components/         # Komponenti React (.tsx)
│   ├── constants/          # Definizzjonijiet tal-fornituri (329), ambiti MCP, 21 strateġija ta’ direzzjonar
│   ├── utils/              # Circuit breaker, sanitizer, għodod awżiljarji tal-awtentikazzjoni
│   └── validation/         # Skemi Zod v4
└── sse/                    # Pipeline tal-proxy SSE

open-sse/                   # Spazju tax-xogħol @omniroute/open-sse
├── executors/              # 150 modulu ta’ eżekuzzjoni (klassijiet tal-eżekuturi + għodod awżiljarji għal kull fornitur)
├── handlers/               # 11-il handler tat-talbiet (chat, responses, embeddings, images, eċċ.)
├── mcp-server/             # Server MCP (110 għodda unika, 3 trasporti, 33 ambitu)
├── services/               # 178 servizz tal-ogħla livell (combo, autoCombo, rateLimitManager, eċċ.)
├── translator/             # Tradutturi tal-formati (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Transformer tal-API Responses
└── utils/                  # 22 modulu ta’ utilità (stream, TLS, proxy, logging)

electron/                   # Applikazzjoni desktop Electron (għal diversi pjattaformi)

tests/
├── unit/                   # Runner tat-testijiet Node.js (1,574 fajl tat-testijiet)
├── integration/            # Testijiet tal-integrazzjoni
├── e2e/                    # Testijiet Playwright
├── security/               # Testijiet tas-sigurtà
├── translator/             # Testijiet speċifiċi għat-traduttur
└── load/                   # Testijiet tat-tagħbija

docs/
├── adr/                     # Rekords tad-Deċiżjonijiet Arkitettoniċi
├── architecture/            # Arkitettura u reżiljenza tas-sistema
├── comparison/              # OmniRoute kontra alternattivi
├── compression/             # Gwidi u regoli tal-kompressjoni
├── dev/                     # Gwidi tal-iżvilupp
├── diagrams/                # Dijagrammi tal-arkitettura
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Gwida għall-utent, Docker, konfigurazzjoni, soluzzjoni tal-problemi
├── i18n/                    # Traduzzjonijiet internazzjonalizzati tar-README
├── marketing/               # Materjal tal-marketing
├── ops/                     # Distribuzzjoni, proxy, kopertura, rilaxxi
├── providers/               # Dokumentazzjoni speċifika għall-fornituri
├── reference/               # Referenza tal-API, varjabbli tal-ambjent, għodod CLI, livelli bla ħlas
├── releases/                # Noti tar-rilaxx
├── routing/                 # Magna auto-combo, riproduzzjoni tar-raġunament
├── screenshots/             # Screenshots tad-dashboard
├── security/                # Salvagwardji, konformità, stealth, tokens
└── specs/                   # Speċifikazzjonijiet tad-disinn
```

---

## Ġdid tal-Foritur

### Pass 1: Irreġistra costanti tal-Foritur

Żid f'`src/shared/constants/providers.ts` — validazzjoni Zod waqt it-tniġħis tal-modulu.

### Pass 2: Żid eżekutur (jekk hemm bżonn loġika custom)

Oħloq eżekutur f'`open-sse/executors/your-provider.ts` li jestendi l-eżekutur bażi.

### Pass 3: Żid traduttur (jekk mhux il-format ta' OpenAI)

Oħloq tradutturi għat-talb/tweġiba f'`open-sse/translator/`.

### Pass 4: Żid kfigurazzjoni OAuth (jekk bbażat fuq OAuth)

Żid kredenzjali OAuth f'`src/lib/oauth/constants/oauth.ts` u s-servizz f'`src/lib/oauth/services/`.

Jekk il-foritur upstream jidistribwixxi OAuth pubbliku client_id/secret jew Firebase Web API key fil-bundle pubbliku tiegħu / CLI tal-brawżer, **tagħmilx** backup bħala literal string. Uża `resolvePublicCred()` minn `open-sse/utils/publicCreds.ts` u żid entry masquerata f'`EMBEDDED_DEFAULTS`. Il-workflow obbligatorju kollu huwa dokumentat f'[`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Fis-servizzi l-oħra, il-messaġġi ta' żball li jilħqu l-klijent iridu jgħaddu minn `buildErrorBody()` / `sanitizeErrorMessage()` minn `open-sse/utils/error.ts` — qatt tpoġġi `err.stack` jew `err.message` rwiexi f'korp tal-Response. Ara [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Pass 5: Irreġistra mudelli

Żid definizzjonijiet tal-mudell f'`open-sse/config/providerRegistry.ts`.

### Pass 6: Żid testijiet

Ikteb testijiet unitarji f'`tests/unit/` li jkopru mill-inqas:

- Reġistrazzjoni tal-foritur
- Traduzzjoni tal-biex/tweġiba
- Trattament ta' żbalji

---

## Lista ta' Kontroll tal-Pull Request

- [ ] It-testijiet jgħaddu (`npm test`)
- [ ] Il-linting jgħaddi (`npm run lint`)
- [ ] Il-build jirnexxi (`npm run build`)
- [ ] Żdiedu t-tipi TypeScript għal funzjonijiet u interfaces pubbliċi ġodda
- [ ] L-ebda sigriet jew valur ta' riżerva kkodifikat direttament
- [ ] Il-kredenzjali upstream pubbliċi huma inkorporati permezz ta' `resolvePublicCred()` (ara [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), u qatt bħala litterali
- [ ] Ir-risposti ta' żball jgħaddu minn `buildErrorBody()` / `sanitizeErrorMessage()` — l-ebda stack trace mhux ipproċessat fil-korpi tar-risposti (ara [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Il-kmandi tax-shell (`exec` / `spawn`) jgħaddu l-valuri waqt l-eżekuzzjoni permezz ta' `env`, mhux permezz ta' interpolazzjoni ta' strings
- [ ] L-inputs kollha huma vvalidati bi skemi Zod
- [ ] Żdied **framment** tal-changelog taħt `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` għal bidliet viżibbli għall-utent (ara [`changelog.d/README.md`](./changelog.d/README.md)) — teditjax `CHANGELOG.md` direttament; il-frammenti jiġu aggregati waqt ir-rilaxx u qatt ma joħolqu kunflitti bejn il-PRs
- [ ] Id-dokumentazzjoni ġiet aġġornata (jekk applikabbli)
- [ ] Ma nfetħux twissijiet ġodda ta' CodeQL / Secret-Scanning, jew kull waħda ġiet miċħuda b'ġustifikazzjoni teknika li tirreferi għad-dokument rilevanti f'`docs/security/`
- [ ] Ir-rotot li jniedu proċessi sekondarji (`/api/mcp/`, `/api/cli-tools/runtime/`) huma kklassifikati bħala `isLocalOnlyPath()` f'`src/server/authz/routeGuard.ts` — ara [Regola Stretta #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] L-ebda trailer `Co-authored-by` ta' AI/bot fil-messaġġi tal-commit (Regola Stretta #16) — il-kollaboraturi umani li x-xogħol tagħhom jerġa' jintuża jingħataw kreditu bi trailers standard `Co-authored-by: Name <email>`

---

## Rilaxjar

Ir-rilaxxijiet huma mġedda permezz tal-workflow `/generate-release`. Meta tintefa' Release ġdida fuq GitHub, il-pakkett jitwaħħal **awtomatikament fil-ħanut npm** permezz ta' GitHub Actions.

Għad-displokki VPS, uża `npm run build:release` (mhux `npm run build`) — dan jagħmel tiswif ġdid nadif, jiġbor il-bundle fid-direttorju `dist/`, u jikteb is-sentinel `dist/BUILD_SHA`. Imbagħad uża l-ħiliet `/deploy-vps-*-cc` li jużaw rsync biex iġibu `dist/` fil-direttorju `app/` ir-rimot.

---

## Kif Tikseb l-Għajnuna

- **Arkitettura**: Ara [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Referenza tal-API**: Ara [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Dokumentazzjoni tas-sigurtà**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Dokumentazzjoni tal-operazzjonijiet**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemi**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
