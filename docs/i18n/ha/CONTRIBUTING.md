# Contributing to OmniRoute (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Na gode da sha’awarku ta ba da gudummawa! Wannan jagorar ta ƙunshi duk abin da kuke buƙata domin farawa.

Don tsarin aiki na hukuma na kowane canji, ku fara da
[Hanyar Zinariya ta Ba da Gudummawa](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Tana danganta sauye-sauyen mai samarwa, tsarin turawa,
UI/UX, i18n, CLI, ma’ajiyar bayanai, da ginawa/turawa zuwa kwangilolinsu, gwaje-gwajen da aka mayar da hankali a kansu, ɗaukar nauyin CI,
da matakan daidaitawa.

---

## Saitin Ci Gaba

### Abubuwan da Ake Bukata

- **Node.js** `>=22.22.2 <23`, ko `>=24.0.0 <27` (shawarar da aka bayar: 24 LTS)
- **npm** 10+

> **Masu amfani da npm v11+ (Node 24+):** Bayan `npm install`, tabbatar cewa an shigar da native modules:
> `node -e "require('better-sqlite3')"`. Idan ya gaza da `MODULE_NOT_FOUND`,
> gudanar da `npm approve-scripts better-sqlite3 && npm install`. Duba
> [Magance Matsaloli](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Clone da Shigarwa

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Masu Sauyin Muhalli

```bash
# Ƙirƙiri .env naka daga samfurin
cp .env.example .env

# Samar da sirrukan da ake buƙata
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Muhimman masu sauyi don ci gaba:

| Mai Sauyi              | Tsohuwar Ƙimar Ci Gaba   | Bayani                       |
| ---------------------- | ------------------------ | ---------------------------- |
| `PORT`                 | `20128`                  | Port na sabar                |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Tushen URL na frontend       |
| `JWT_SECRET`           | (samar da shi a sama)    | Sirrin sanya hannu na JWT    |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Kalmar sirrin shiga ta farko |
| `APP_LOG_LEVEL`        | `info`                   | Matakin yawan bayanan log    |

### Saitunan Dashboard

Dashboard yana samar da maɓallan UI na kunnawa da kashewa don fasalolin da kuma za a iya saita su ta hanyar masu sauyin muhalli:

| Wurin Saiti          | Maɓallin Kunnawa/Kashewa | Bayani                          |
| -------------------- | ------------------------ | ------------------------------- |
| Saituna → Na Ci Gaba | Yanayin Debug            | Kunna log na buƙatun debug (UI) |
| Saituna → Gabaɗaya   | Bayyanar Sidebar         | Nuna/ɓoye sassan sidebar        |

Ana adana waɗannan saituna a cikin database kuma suna ci gaba da kasancewa bayan sake farawa, suna maye gurbin tsoffin ƙimomin env var idan an saita su.

### Gudanarwa a Na'ura

```bash
# Yanayin ci gaba (sake lodawa kai tsaye)
npm run dev

# Gina na production
npm run build    # next build → .build/next/ sannan assembleStandalone → dist/
npm run start

# Gina backend/API kawai cikin sauri don sauye-sauyen masu ba da gudummawa
npm run build:contributor

# Gina na fitarwa (sake ginawa daga tsabta + alamar HEAD — wajibi don deploy)
npm run build:release   # rm -rf .build dist && gini + rubuta dist/BUILD_SHA

# Saitin port da aka saba amfani da shi
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Ginin mai ba da gudummawa yana yin tabbatarwar compile kawai: ba ya haɗa standalone
distribution ko gina kadarorin native packaging na zaɓi. Yi amfani da ginin production na yau da kullum idan
kana buƙatar tabbatar da kunshin da za a iya turawa.

### Tsarin Abubuwan da Gina Ya Fitar

| Kundin Adireshi | Abubuwan da ke Ciki                                                                 | Ana Bibiyarsa |
| --------------- | ----------------------------------------------------------------------------------- | ------------- |
| `src/`          | Lambar tushe ta manhaja (TypeScript / TSX)                                          | Eh            |
| `.build/`       | Abubuwan tsaka-tsaki — sakamakon `next build` (gitignored, `distDir = .build/next`) | A'a           |
| `dist/`         | Kunshin da za a iya turawa — wanda `assembleStandalone` ya haɗa (gitignored)        | A'a           |

Tsarin ginin yana gudana sau ɗaya ne:

```
npm run build
  └─ next build → .build/next/standalone  (sakamakon Next.js)
  └─ assembleStandalone()                 (yana kwafar standalone + static + public + native assets)
       └─ sakamako: dist/                 (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` yana kuma tsabtace kundin adireshin biyu da farko sannan ya rubuta
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) a matsayin alamar tabbatar da sahihancin deploy.

`npm run build:contributor` yana amfani da tsarin gina backend kawai. Yana maye gurbin
fayilolin UI na dashboard na ɗan lokaci da stubs yayin gini, yana riƙe da masu sarrafa hanyoyin API, sannan ya dawo da ainihin fayilolin
bayan ginin. Yi amfani da `npm run build` don sauye-sauyen da suka shafi UI na dashboard ko don cikakkiyar
tabbatarwar fitarwa; tsarin mai ba da gudummawa ba madadin ginin fitarwa ba ne.

> **Lura kan deploy zuwa VPS:** kundin adireshin image na nesa `/usr/lib/node_modules/omniroute/app/`
> bai canza ba. Kayan aikin deploy suna yin rsync na abubuwan da ke cikin `dist/` zuwa cikinsa.
> Hanyar sakamakon gini da ke cikin repo ce kawai ta sauya (`app/` → `dist/`).

Tsoffin URLs:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Tsarin Aikin Git

> ⚠️ **KADA KA TAƁA yin commit kai tsaye zuwa `main`.** Koyaushe yi amfani da rassan fasali.
>
> **Tushen PR:** saita reshen `release/vX.Y.Z` da ke aiki a matsayin manufa (ba `main` ba). Duba
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) don tsarin
> sakin-kowane-reshe + sanya-tag-lokacin-fitarwa.

```bash
# Ƙirƙiri reshe daga ƙarshen reshen sakin da ke aiki (misali: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... yi canje-canje ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Buɗe Pull Request tare da base = release/v3.8.49
```

### Sanya Sunan Reshe

| Prefix      | Manufa                   |
| ----------- | ------------------------ |
| `feat/`     | Sabbin fasaloli          |
| `fix/`      | Gyaran kurakurai         |
| `refactor/` | Sake tsara lamba         |
| `docs/`     | Canje-canjen takardu     |
| `test/`     | Ƙarin/gyaran gwaje-gwaje |
| `chore/`    | Kayan aiki, CI, dogarori |

### Saƙonnin Commit

Bi [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: ƙara circuit breaker don kiran masu samarwa
fix: warware matsalar gefen tabbatar da sirrin JWT
docs: sabunta SECURITY.md da kariyar PII
test: ƙara gwaje-gwajen raka'a na observability
refactor(db): haɗa jadawalan iyakance ƙima
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Gudanar da Gwaje-gwaje

```bash
# Duk gwaje-gwaje (unit + vitest + ecosystem + e2e)
npm run test:all

# Fayil ɗin gwaji guda ɗaya (ginannen mai gudanar da gwajin Node.js — yawancin gwaje-gwaje suna amfani da wannan)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Gwaje-gwajen unit kawai da canjin da ka yi ya shafa (mai zaɓen TIA iri ɗaya da shingen CI, #8084)
npm run test:scoped            # canje-canje a commit na ƙarshe (ko working tree)
npm run test:scoped:staged     # canje-canjen staged kawai — ya dace sosai da gudanarwar pre-commit
npm run test:scoped:full       # fara da sake gina taswirar import-graph (bayan ƙara/matsar da fayiloli)
# Exit 1 + "run the full suite" na nufin wani fayil na hub (tsconfig, package.json, …) ko source
# marar taswira ya canza — mai zaɓen yana gaza cikin aminci, ba ya taɓa tsallakewa a ɓoye.

# Vitest (uwar garken MCP, autoCombo, cache)
npm run test:vitest

# Gwaje-gwajen E2E (yana buƙatar Playwright)
npm run test:e2e

# E2E na abokan cinikin protocol (MCP transports, A2A)
npm run test:protocols:e2e

# Gwaje-gwajen dacewar ecosystem
npm run test:ecosystem

# Shingen coverage: 60% statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Binciken lint + format
npm run lint
npm run check

# Gwajin smoke na combo mai amfani da ainihin upstream kuma mai shinge (yana buƙatar damar VPS + kuɗin ainihin masu samarwa)
# Yana tuntuɓar masu samarwa na GASKIYA — yana kashe kuɗi kaɗan. BA YA TAƁA gudana a CI. Yana tsallakewa cikin tsabta ba tare da shingen ba.
# Yana buƙatar: damar ssh root@192.168.0.15 (yana samo snapshot na DB mai karantawa-kawai daga VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Gwajin smoke kai tsaye na VPS na Phase-3 — tsantsar rubutun Node ESM, suna tuntuɓar uwar garken .15 kai tsaye.
# Yana buƙatar: damar ssh root@192.168.0.15 (ana ƙirƙira/rusa combos ta hanyar SSH sqlite).
# Yana tuntuɓar masu samarwa na GASKIYA (ƙaramin kuɗi). Yana ƙirƙira/share combos na __live_test__* kawai. BA YA TAƁA gudana a CI.
# REQUIRE_API_KEY=false a .15 saboda haka ba a buƙatar API key, amma yana mutunta COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY idan an saita su.
npm run test:combo:live:vps              # Yanayin HTTP guda 7 (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # yana ƙara yanayin failover na ainihi tsakanin masu samarwa (gaba ɗaya 8)
```

Bayanan coverage:

- `npm run test:coverage` yana auna coverage na source don babban rukunin gwaje-gwajen unit, yana ware `tests/**`, kuma yana haɗa `open-sse/**`
- Dole Pull Request su riƙe shingen coverage na **60%+** na statements/lines/functions/branches
- Idan PR ya canza lambar production a `src/`, `open-sse/`, `electron/`, ko `bin/`, dole ne ya ƙara ko sabunta gwaje-gwaje masu sarrafa kansu a cikin PR ɗin
- `npm run coverage:report` yana buga cikakken rahoto fayil-bayan-fayil daga gudanarwar coverage ta baya-bayan nan
- `npm run test:coverage:legacy` yana adana tsohon ma'auni don kwatanta bayanan tarihi
- Duba `docs/ops/COVERAGE_PLAN.md` don taswirar inganta coverage mataki-mataki

### Abubuwan da ake Buƙata na Pull Request

Kafin buɗe PR, yi amfani da
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) don gudanar da zagayen da aka mayar da hankali kan
abin da ka canza. Cikakken rukunin unit (sassan CI guda 4), Vitest, shingen coverage na **60%+**, da
gina production alhakin CI ne — gudanar da su a na'urarka ba ya ƙara wata alama da gwaje-gwajen PR
ba za su riga sun ba ka ba, kuma a kan ƙananan na'urori hakan na iya cika ƙarfin host (#8084):

- Gudanar da fayilolin gwajin da suka shafi canjin da ka yi: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Gudanar da `npm run lint`
- Haɗa ko sabunta gwaje-gwaje masu sarrafa kansu a cikin PR ɗin duk lokacin da aka canza lambar production
- Haɗa fayilolin gwajin da aka canza ko aka ƙara a bayanin PR lokacin da aka canza lambar production
- Duba sakamakon SonarQube a PR lokacin da aka saita sirrin aikin a CI

Matsayin gwaji na yanzu: **fayilolin gwajin unit guda 122** waɗanda suka shafi:

- Masu fassarar provider da sauya format
- Iyakance ƙima, circuit breaker, da resilience
- Semantic cache, idempotency, da bin diddigin ci gaba
- Ayyukan database da schema (modules na DB guda 21)
- Tsarukan OAuth da authentication
- Tabbatar da API endpoint (Zod v4)
- Kayan aikin uwar garken MCP da tilasta scope
- Tsarukan Memory da Skills

---

## Salon Rubuta Lamba

- **ESLint** — Gudanar da `npm run lint` kafin yin commit
- **Prettier** — Ana tsara shi ta atomatik ta hanyar `lint-staged` yayin commit (sarari 2, semicolons, double quotes, faɗin haruffa 100, es5 trailing commas)
- **TypeScript** — Duk lambar `src/` tana amfani da `.ts`/`.tsx`; `open-sse/` yana amfani da `.ts`/`.js`; yi rubutun bayani da TSDoc (`@param`, `@returns`, `@throws`)
- **Ba a yarda da `eval()` ba** — ESLint yana tilasta `no-eval`, `no-implied-eval`, `no-new-func`
- **Tabbatarwa ta Zod** — Yi amfani da Zod v4 schemas don tabbatar da duk bayanan shigar API
- **Sanya suna**: Fayiloli = camelCase/kebab-case, components = PascalCase, constants = UPPER_SNAKE

### Sarrafa kurakurai / tubalan catch marasa komai

Kada a taɓa barin `catch` ba tare da bayani ba. Rarraba shi cikin ɗaya daga cikin rukuni biyu (wannan yana aiwatar da
ƙaƙƙarfan ƙa'idar "kada a taɓa haɗiye kurakurai a ɓoye cikin rafukan SSE"):

- **Da gangan (namu aikin tsaftacewa/telemetry na iya ƙoƙari)** — ana tsammanin gazawa a nan kuma
  ba ta da illa; ƙara sharhin dalili na layi ɗaya, ba tare da logging ba (logging a kan kowace buƙata shi ne
  hayaniyar da wannan ƙa'ida take kauce wa).

  ```ts
  } catch {} // ana tsammanin rufe controller da aka riga aka rufe bayan client ya yanke haɗi
  ```

- **Ya kamata a yi logging (lambar waje/wadda mai kira ya bayar, ko kuma haɗiye kuskuren yana sauya control flow)** — bar
  catch ɗin (kada a taɓa barinsa ya katse rafin) amma fitar da `console.debug`/`warn` mai bayanin mahallin domin
  a iya gano gazawar.

  ```ts
  } catch (e) {
    console.debug("[STREAM] kuskuren onFailure callback:", e);
  }
  ```

Duba `open-sse/utils/stream.ts` da `open-sse/utils/streamHandler.ts` don misalan da aka aiwatar.

---

## Tsarin Aikin

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Shafukan dashboard (ɓangarori 23)
│   ├── api/                # Hanyoyin API (kundin adireshi 51)
│   └── login/              # Shafukan tantancewa (.tsx)
├── domain/                 # Injin manufofi (policyEngine, comboResolver, costRules, da sauransu)
├── lib/                    # Babban dabarun kasuwanci (.ts)
│   ├── a2a/                # Uwar garken yarjejeniyar Agent-to-Agent v0.3
│   ├── acp/                # Rajistar Agent Communication Protocol
│   ├── compliance/         # Injin manufofin bin ƙa'idoji
│   ├── db/                 # Kayayyakin domain na SQLite + ƙaura 130
│   ├── memory/             # Ƙwaƙwalwar tattaunawa mai ɗorewa
│   ├── oauth/              # Masu samar da OAuth, ayyuka, da kayan aiki
│   ├── skills/             # Tsarin ƙwarewa mai faɗaɗawa
│   ├── usage/              # Bibiyar amfani da lissafin kuɗi
│   └── localDb.ts          # Matakin sake fitarwa kawai — kada a taɓa ƙara dabara a nan
├── middleware/              # Middleware na buƙata (promptInjectionGuard)
├── mitm/                   # Wakilin MITM (takardar shaida, DNS, tsara hanyar manufa)
├── shared/
│   ├── components/         # Abubuwan React (.tsx)
│   ├── constants/          # Ma'anar masu samarwa (329), iyakokin MCP, dabarun tsara hanya 21
│   ├── utils/              # Mai katse da'ira, mai tsabtace bayanai, mataimakan tantancewa
│   └── validation/         # Tsarukan Zod v4
└── sse/                    # Bututun wakilin SSE

open-sse/                   # Filin aikin @omniroute/open-sse
├── executors/              # Kayayyakin aiwatarwa 150 (azuzuwan executor + mataimaka na kowane mai samarwa)
├── handlers/               # Masu sarrafa buƙata 11 (taɗi, martani, embeddings, hotuna, da sauransu)
├── mcp-server/             # Uwar garken MCP (kayan aiki na musamman 110, hanyoyin sufuri 3, iyakoki 33)
├── services/               # Ayyuka 178 na matakin sama (combo, autoCombo, rateLimitManager, da sauransu)
├── translator/             # Masu fassara tsari (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Mai sauya Responses API
└── utils/                  # Kayayyakin amfani 22 (stream, TLS, proxy, logging)

electron/                   # Manhajar tebur ta Electron (mai aiki a dandamali daban-daban)

tests/
├── unit/                   # Mai gudanar da gwajin Node.js (fayilolin gwaji 1,574)
├── integration/            # Gwaje-gwajen haɗa sassa
├── e2e/                    # Gwaje-gwajen Playwright
├── security/               # Gwaje-gwajen tsaro
├── translator/             # Gwaje-gwaje na musamman ga mai fassara
└── load/                   # Gwaje-gwajen nauyi

docs/
├── adr/                     # Bayanan Shawarar Gine-gine
├── architecture/            # Gine-ginen tsarin da juriyarsa
├── comparison/              # Kwatanta OmniRoute da wasu hanyoyi
├── compression/             # Jagorori da ƙa'idojin matsawa
├── dev/                     # Jagororin haɓakawa
├── diagrams/                # Zane-zanen gine-gine
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Jagorar mai amfani, Docker, saitawa, warware matsaloli
├── i18n/                    # Fassarar README zuwa harsuna daban-daban
├── marketing/               # Kayan talla
├── ops/                     # Turawa, proxy, ɗaukar gwaji, fitar da sigogi
├── providers/               # Takardu na musamman ga masu samarwa
├── reference/               # Manazartar API, env vars, kayan aikin CLI, matakan kyauta
├── releases/                # Bayanan sigogin da aka fitar
├── routing/                 # Injin auto-combo, sake kunna tsarin tunani
├── screenshots/             # Hotunan allo na dashboard
├── security/                # Matakan kariya, bin ƙa'idoji, ɓoyewa, tokens
└── specs/                   # Ƙayyadaddun ƙira
```

---

## Ƙara Sabon Mai Samarwa

### Mataki na 1: Yi Rijistar Constants na Mai Samarwa

Ƙara zuwa `src/shared/constants/providers.ts` — ana tabbatar da ingancinsa da Zod yayin loda module.

### Mataki na 2: Ƙara Executor (idan ana buƙatar logic na musamman)

Ƙirƙiri executor a `open-sse/executors/your-provider.ts` wanda ya gaji base executor.

### Mataki na 3: Ƙara Translator (idan tsarin ba na OpenAI ba ne)

Ƙirƙiri translators na request/response a `open-sse/translator/`.

### Mataki na 4: Ƙara Tsarin OAuth (idan yana amfani da OAuth)

Ƙara bayanan shaidar OAuth a `src/lib/oauth/constants/oauth.ts` da service a `src/lib/oauth/services/`.

Idan upstream provider yana rarraba client_id/secret na OAuth na jama'a ko Firebase Web API key a cikin CLI / browser bundle ɗinsa na jama'a, **kar a** saka shi a matsayin string literal. Yi amfani da `resolvePublicCred()` daga `open-sse/utils/publicCreds.ts` sannan ka ƙara masked byte entry zuwa `EMBEDDED_DEFAULTS`. An rubuta cikakken tsarin aikin da dole a bi a [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

A cikin handlers/executors, saƙonnin kuskure da za su isa ga client dole ne su bi ta `buildErrorBody()` / `sanitizeErrorMessage()` daga `open-sse/utils/error.ts` — kada a taɓa saka ainihin `err.stack` ko `err.message` a jikin Response. Duba [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Mataki na 5: Yi Rijistar Models

Ƙara ma'anar models a `open-sse/config/providerRegistry.ts`.

### Mataki na 6: Ƙara Tests

Rubuta unit tests a `tests/unit/` waɗanda aƙalla za su rufe:

- Rijistar mai samarwa
- Fassarar request/response
- Sarrafa kuskure

---

## Jerin Dubawa na Pull Request

- [ ] Gwaje-gwaje sun yi nasara (`npm test`)
- [ ] Binciken lint ya yi nasara (`npm run lint`)
- [ ] Gina ya yi nasara (`npm run build`)
- [ ] An ƙara nau'ikan TypeScript don sabbin public functions da interfaces
- [ ] Babu secrets ko fallback values da aka rubuta kai tsaye
- [ ] An saka public upstream credentials ta hanyar `resolvePublicCred()` (duba [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), ba a taɓa saka su kai tsaye a matsayin literals ba
- [ ] Error responses suna bi ta `buildErrorBody()` / `sanitizeErrorMessage()` — babu raw stack traces a cikin response bodies (duba [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell commands (`exec` / `spawn`) suna aika runtime values ta `env`, ba ta hanyar string interpolation ba
- [ ] An tantance dukkan inputs da Zod schemas
- [ ] An ƙara **fragment** na changelog a ƙarƙashin `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` don canje-canjen da masu amfani za su gani (duba [`changelog.d/README.md`](./changelog.d/README.md)) — **kada** a gyara `CHANGELOG.md` kai tsaye; ana haɗa fragments lokacin release kuma ba sa taɓa cin karo tsakanin PRs
- [ ] An sabunta takardu (idan ya dace)
- [ ] Ba a buɗe sabbin faɗakarwar CodeQL / Secret-Scanning ba, ko kuma an yi watsi da kowannensu tare da hujjar fasaha mai nuni zuwa takardar `docs/security/` da ta dace
- [ ] An rarraba routes da ke ƙaddamar da child processes (`/api/mcp/`, `/api/cli-tools/runtime/`) a matsayin `isLocalOnlyPath()` a cikin `src/server/authz/routeGuard.ts` — duba [Ƙa'ida Mai Tsauri #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Babu trailers na AI/bot na `Co-authored-by` a cikin commit messages (Ƙa'ida Mai Tsauri #16) — ana yaba wa human collaborators waɗanda aka sake amfani da aikinsu da daidaitattun trailers na `Co-authored-by: Name <email>`

---

## Fitar da Sabbin Sigogi

Ana sarrafa fitar da sabbin sigogi ta hanyar workflow ɗin `/generate-release`. Lokacin da aka ƙirƙiri sabon GitHub Release, ana **buga package ɗin zuwa npm ta atomatik** ta hanyar GitHub Actions.

Don deploy zuwa VPS, yi amfani da `npm run build:release` (ba `npm run build` ba) — yana yin sabon
build mai tsabta, ya haɗa bundle ɗin cikin `dist/`, sannan ya rubuta sentinel ɗin `dist/BUILD_SHA`.
Daga nan sai a yi amfani da skills na `/deploy-vps-*-cc`, waɗanda ke amfani da rsync don tura `dist/` zuwa directory ɗin `app/` na remote.

---

## Samun Taimako

- **Tsarin Gine-gine**: Duba [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Manazartar API**: Duba [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Takardun tsaro**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Takardun gudanarwa**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Matsaloli**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
