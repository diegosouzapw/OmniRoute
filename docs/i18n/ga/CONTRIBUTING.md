# Contributing to OmniRoute (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Go raibh maith agat as do spéis i rannchuidiú! Clúdaíonn an treoir seo gach rud a theastaíonn uait chun tosú.

Maidir leis an sreabhadh oibre oifigiúil do gach athrú, tosaigh leis an
[Bealach Órga Rannchuidithe](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Mapálann sé athruithe ar sholáthraithe, ródú,
UI/UX, i18n, CLI, bunachair sonraí, agus tógáil/imscaradh chuig a gconarthaí, tástálacha spriocdhírithe, clúdach CI,
agus céimeanna réitigh.

---

## Socrú Forbartha

### Réamhriachtanais

- **Node.js** `>=22.22.3 <23`, nó `>=24.0.0 <27` (molta: 24 LTS)
- **npm** 10+

> **Úsáideoirí npm v11+ (Node 24+):** Tar éis `npm install`, deimhnigh gur suiteáladh na modúil dhúchasacha:
> `node -e "require('better-sqlite3')"`. Má theipeann air le `MODULE_NOT_FOUND`,
> rith `npm approve-scripts better-sqlite3 && npm install`. Féach
> [Fabhtcheartú](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Clónáil & Suiteáil

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Athróga Timpeallachta

```bash
# Cruthaigh do .env ón teimpléad
cp .env.example .env

# Gin na rúin riachtanacha
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Príomhathróga don fhorbairt:

| Athróg                 | Réamhshocrú Forbartha    | Cur Síos                             |
| ---------------------- | ------------------------ | ------------------------------------ |
| `PORT`                 | `20128`                  | Port an fhreastalaí                  |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Bun-URL don cheann tosaigh           |
| `JWT_SECRET`           | (gin thuas é)            | Rún sínithe JWT                      |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Focal faire don chéad logáil isteach |
| `APP_LOG_LEVEL`        | `info`                   | Leibhéal mionsonraithe na logaí      |

### Socruithe an Deais

Soláthraíonn an deais lascanna UI do ghnéithe ar féidir iad a chumrú trí athróga timpeallachta freisin:

| Suíomh na Socruithe    | Lasc                          | Cur Síos                                     |
| ---------------------- | ----------------------------- | -------------------------------------------- |
| Socruithe → Casta      | Mód Dífhabhtaithe             | Cumasaigh logaí iarratais dífhabhtaithe (UI) |
| Socruithe → Ginearálta | Infheictheacht an Taobhbharra | Taispeáin/folaigh rannóga an taobhbharra     |

Stóráiltear na socruithe seo sa bhunachar sonraí agus maireann siad thar atosuithe, agus sáraíonn siad réamhshocruithe na n-athróg timpeallachta nuair a shocraítear iad.

### Rith go Logánta

```bash
# Mód forbartha (athlódáil the)
npm run dev

# Tógáil táirgthe
npm run build    # next build → .build/next/ ansin assembleStandalone → dist/
npm run start

# Tiomsú tapa don inneall cúil/API amháin le haghaidh athruithe rannchuiditheora
npm run build:contributor

# Tógáil eisiúna (atógáil ghlan + faireoir HEAD — riachtanach don imscaradh)
npm run build:release   # rm -rf .build dist && build + scríobhann sé dist/BUILD_SHA

# Cumraíocht choitianta poirt
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Déanann tógáil an rannchuiditheora bailíochtú tiomsaithe amháin: ní chóimeálann sí an dáileadh
neamhspleách ná ní thógann sí sócmhainní pacáistithe dúchasacha roghnacha. Úsáid an ghnáth-thógáil táirgthe nuair
is gá duit an beart inseachadta a bhailíochtú.

### Leagan Amach Aschur na Tógála

| Comhadlann | Ábhar                                                                                   | Rianaithe |
| ---------- | --------------------------------------------------------------------------------------- | --------- |
| `src/`     | Foinse an fheidhmchláir (TypeScript / TSX)                                              | Tá        |
| `.build/`  | Comhaid idirmheánacha — aschur `next build` (neamhaird ag git, `distDir = .build/next`) | Níl       |
| `dist/`    | Beart inseachadta — cóimeáilte ag `assembleStandalone` (neamhaird ag git)               | Níl       |

Is pas aonair é an phíblíne tógála:

```
npm run build
  └─ next build → .build/next/standalone  (aschur Next.js)
  └─ assembleStandalone()                 (cóipeálann standalone + static + public + sócmhainní dúchasacha)
       └─ aschur: dist/                   (server.js, .next/static/, public/, node_modules/)
```

Glanann `npm run build:release` an dá chomhadlann ar dtús freisin agus scríobhann sé
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) mar fhaireoir sláine imscartha.

Úsáideann `npm run build:contributor` próifíl tógála don inneall cúil amháin. Cuireann sé ionadaithe sealadacha
in ionad chomhaid UI na deais le linn na tógála, coinníonn sé láimhseálaithe bealaí API, agus athchóiríonn sé na bunchomhaid
tar éis na tógála. Úsáid `npm run build` le haghaidh athruithe a théann i bhfeidhm ar UI na deais nó le haghaidh
bailíochtú iomlán eisiúna; ní hionann próifíl an rannchuiditheora agus an tógáil eisiúna.

> **Nóta imscartha VPS:** níl aon athrú ar chomhadlann na híomhá cianda `/usr/lib/node_modules/omniroute/app/`.
> Déanann na scileanna imscartha inneachar `dist/` a shioncronú isteach inti le rsync.
> Níor athraíodh ach cosán aschur na tógála laistigh den stór (`app/` → `dist/`).

URLanna réamhshocraithe:

- **Deais**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Sreabhadh Oibre Git

> ⚠️ **NÁ déan tiomnú go díreach chuig `main` RIAMH.** Úsáid brainsí gné i gcónaí.
>
> **Bonn PR:** dírigh ar an mbrainse gníomhach `release/vX.Y.Z` (ní `main`). Féach
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) don tsamhail
> eisiúint-in-aghaidh-an-bhrainse + clib-ar-eisiúint.

```bash
# Cruthaigh brainse ó bharr na heisiúna gníomhaí (sampla: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... déan athruithe ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Oscail Pull Request le base = release/v3.8.49
```

### Ainmniú Brainse

| Réimír      | Cuspóir                          |
| ----------- | -------------------------------- |
| `feat/`     | Gnéithe nua                      |
| `fix/`      | Ceartúcháin fabhtanna            |
| `refactor/` | Athstruchtúrú cóid               |
| `docs/`     | Athruithe doiciméadachta         |
| `test/`     | Tástálacha a chur leis/a dheisiú |
| `chore/`    | Uirlisí, CI, spleáchais          |

### Teachtaireachtaí Tiomnúcháin

Lean [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scóip (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Tástálacha a Rith

```bash
# Gach tástáil (aonad + vitest + éiceachóras + e2e)
npm run test:all

# Comhad tástála amháin (riteoir tástálacha dúchasach Node.js — úsáideann formhór na dtástálacha é seo)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Na tástálacha aonaid amháin a ndeachaigh d'athrú i bhfeidhm orthu (an roghnóir TIA céanna le geata CI, #8084)
npm run test:scoped            # athruithe sa tiomnúchán deireanach (nó sa chrann oibre)
npm run test:scoped:staged     # athruithe céimnithe amháin — oibríonn sé go maith le rith réamh-thiomnúcháin
npm run test:scoped:full       # atóg léarscáil na graife iompórtála ar dtús (tar éis comhaid a chur leis/a bhogadh)
# Ciallaíonn imeacht 1 + "run the full suite" gur athraíodh comhad lárnach (tsconfig, package.json, …) nó
# foinse neamh-mhapáilte — teipeann an roghnóir go sábháilte, ní scipeálann sé rud ar bith go ciúin riamh.

# Vitest (freastalaí MCP, autoCombo, taisce)
npm run test:vitest

# Tástálacha E2E (Playwright de dhíth)
npm run test:e2e

# E2E do chliaint prótacail (iompar MCP, A2A)
npm run test:protocols:e2e

# Tástálacha comhoiriúnachta éiceachórais
npm run test:ecosystem

# Geata cumhdaigh: 60% ráiteas/línte/feidhmeanna/brainsí
npm run test:coverage
npm run coverage:report

# Seiceáil lint + formáidithe
npm run lint
npm run check

# Tástáil deataigh teaglaim gheataithe le fíorchóras réamhtheachtach (rochtain VPS + creidmheasanna fíorsholáthraí de dhíth)
# Buaileann sí FÍORSHOLÁTHRAITHE — cosnaíonn sí beagán. NÍ ritheann sí i CI RIAMH. Scipeálann sí go glan gan an geata.
# De dhíth: rochtain ssh root@192.168.0.15 (faigheann sí gabháil DB inléite amháin ón VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Tástáil deataigh bheo VPS chéim 3 — gnáthscripteanna Node ESM, a bhuaileann freastalaí beo .15 go díreach.
# De dhíth: rochtain ssh root@192.168.0.15 (cruthaítear/díchóimeáiltear teaglamaí trí SSH sqlite).
# Buaileann sí FÍORSHOLÁTHRAITHE (costas beag). Ní chruthaíonn/scriosann sí ach teaglamaí __live_test__*. NÍ ritheann sí i CI RIAMH.
# Tá REQUIRE_API_KEY=false ar .15, mar sin níl eochair API de dhíth, ach urramaíonn sí COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY má tá siad socraithe.
npm run test:combo:live:vps              # 7 gcás HTTP (tosaíocht/babhta-roibeaird/ualaithe/costas/comhleá/uathoibríoch + sláinte)
npm run test:combo:live:vps:failover     # cuireann sé cás fíor-teipaistrithe tras-soláthraí leis (8 san iomlán)
```

Nótaí cumhdaigh:

- Tomhaiseann `npm run test:coverage` cumhdach foinse don phríomhshraith tástálacha aonaid, fágann sé `tests/**` as an áireamh, agus cuireann sé `open-sse/**` san áireamh
- Ní mór d'iarratais tarraingthe an geata cumhdaigh a choinneáil ag **60%+** do ráitis/línte/feidhmeanna/brainsí
- Má athraíonn PR cód táirgthe in `src/`, `open-sse/`, nó `bin/`, ní mór dó tástálacha uathoibrithe a chur leis nó a nuashonrú sa PR céanna
- Priontálann `npm run coverage:report` an tuairisc mhionsonraithe comhad ar chomhad ón rith cumhdaigh is déanaí
- Caomhnaíonn `npm run test:coverage:legacy` an mhéadracht níos sine le haghaidh comparáid stairiúil
- Féach `docs/ops/COVERAGE_PLAN.md` don treochlár céimnithe chun cumhdach a fheabhsú

### Riachtanais Iarratais Tarraingthe

Sula n-osclaíonn tú PR, úsáid an
[Bealach Órga Rannchuidithe](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) chun an lúb spriocdhírithe a rith don
mhéid a d'athraigh tú. Tá an tsraith iomlán tástálacha aonaid (4 shlat CI), Vitest, an geata
cumhdaigh **60%+**, agus an tógáil táirgthe faoi chúram CI — ní chuireann a rith go háitiúil aon
chomhartha leis nach dtabharfaidh seiceálacha an PR duit cheana féin, agus ar mheaisíní níos lú
d'fhéadfadh sé an t-óstach a sháithiú (#8084):

- Rith na comhaid tástála a chlúdaíonn d'athrú: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Rith `npm run lint`
- Cuir tástálacha uathoibrithe leis nó nuashonraigh iad sa PR céanna aon uair a athraíonn cód táirgthe
- Cuir na comhaid tástála a athraíodh nó a cuireadh leis i dtuairisc an PR nuair a athraíodh cód táirgthe
- Seiceáil toradh SonarQube ar an PR nuair atá rúin an tionscadail cumraithe in CI

Stádas reatha na dtástálacha: **122 comhad tástála aonaid** a chlúdaíonn:

- Aistritheoirí soláthraithe agus tiontú formáide
- Teorannú ráta, scoradán ciorcaid, agus athléimneacht
- Taisce shéimeantach, idéimpitéinseacht, rianú dul chun cinn
- Oibríochtaí bunachair sonraí agus scéimre (21 modúl DB)
- Sreafaí OAuth agus fíordheimhniú
- Bailíochtú críochphointí API (Zod v4)
- Uirlisí freastalaí MCP agus forfheidhmiú scóipe
- Córais Cuimhne agus Scileanna

---

## Stíl an Chóid

- **ESLint** — Rith `npm run lint` sula ndéanann tú commit
- **Prettier** — Formáidítear go huathoibríoch trí `lint-staged` tráth commit (2 spás, leathstadanna, comharthaí athfhriotail dúbailte, leithead 100 carachtar, camóga deiridh es5)
- **TypeScript** — Úsáideann gach cód in `src/` `.ts`/`.tsx`; úsáideann `open-sse/` `.ts`/`.js`; déan doiciméadú le TSDoc (`@param`, `@returns`, `@throws`)
- **Gan `eval()`** — Cuireann ESLint `no-eval`, `no-implied-eval`, `no-new-func` i bhfeidhm
- **Bailíochtú Zod** — Úsáid scéimeanna Zod v4 chun gach ionchur API a bhailíochtú
- **Ainmniú**: Comhaid = camelCase/kebab-case, comhpháirteanna = PascalCase, tairisigh = UPPER_SNAKE

### Láimhseáil earráidí / blocanna catch folmha

Ná fág `catch` gan mhíniú riamh. Rangaigh i gceann amháin de dhá chatagóir é (cuireann sé seo
an riail dhocht "ná slog earráidí go ciúin riamh i sruthanna SSE" i bhfeidhm go praiticiúil):

- **D'aon ghnó (ár nglanadh/teiliméadracht féin ar bhonn na hiarrachta is fearr)** — táthar ag súil le teip anseo agus
  tá sí neamhdhíobhálach; cuir nóta tráchta aonlíne leis a mhíníonn an chúis, gan logáil (is í an logáil ar gach iarratas
  an torann a sheachnaíonn an coinbhinsiún seo).

  ```ts
  } catch {} // táthar ag súil le rialaitheoir atá dúnta cheana a dhúnadh tar éis don chliant dícheangal
  ```

- **Ba cheart logáil (cód seachtrach/cód arna sholáthar ag an nglaoiteoir, nó má athraíonn an slogadh sreabhadh an rialaithe)** — coinnigh
  an catch (ná lig dó an sruth a bhriseadh riamh) ach astaigh `console.debug`/`warn` comhthéacsúil ionas gur féidir
  an teip a aimsiú.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Féach `open-sse/utils/stream.ts` agus `open-sse/utils/streamHandler.ts` le haghaidh samplaí curtha i bhfeidhm.

---

## Struchtúr an Tionscadail

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Leathanaigh an deais (23 rannán)
│   ├── api/                # Bealaí API (51 eolaire)
│   └── login/              # Leathanaigh fíordheimhnithe (.tsx)
├── domain/                 # Inneall beartais (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Croíloighic ghnó (.ts)
│   ├── a2a/                # Freastalaí prótacail Agent-to-Agent v0.3
│   ├── acp/                # Clárlann Agent Communication Protocol
│   ├── compliance/         # Inneall beartais comhlíonta
│   ├── db/                 # Modúil fearainn SQLite + 130 aistriú
│   ├── memory/             # Cuimhne chomhrá mharthanach
│   ├── oauth/              # Soláthraithe, seirbhísí agus fóntais OAuth
│   ├── skills/             # Creat scileanna insínte
│   ├── usage/              # Rianú úsáide agus ríomh costas
│   └── localDb.ts          # Ciseal athonnmhairithe amháin — ná cuir loighic anseo riamh
├── middleware/              # Meánearraí iarratais (promptInjectionGuard)
├── mitm/                   # Seachfhreastalaí MITM (teastas, DNS, ródú sprice)
├── shared/
│   ├── components/         # Comhpháirteanna React (.tsx)
│   ├── constants/          # Sainmhínithe soláthraithe (329), scóip MCP, 19 straitéis ródaithe
│   ├── utils/              # Scoradán ciorcaid, sláintitheoir, cúntóirí fíordheimhnithe
│   └── validation/         # Scéimeanna Zod v4
└── sse/                    # Píblíne seachfhreastalaí SSE

open-sse/                   # Spás oibre @omniroute/open-sse
├── executors/              # 89 modúl cur chun feidhme riteora
├── handlers/               # 11 láimhseálaí iarratais (comhrá, freagraí, leabuithe, íomhánna, etc.)
├── mcp-server/             # Freastalaí MCP (110 uirlis uathúil, 3 iompar, 33 scóip)
├── services/               # 178 seirbhís ardleibhéil (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Aistritheoirí formáide (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Claochladán Responses API
└── utils/                  # 22 modúl fóntais (sruth, TLS, seachfhreastalaí, logáil)


tests/
├── unit/                   # Riteoir tástálacha Node.js (1,574 comhad tástála)
├── integration/            # Tástálacha comhtháthaithe
├── e2e/                    # Tástálacha Playwright
├── security/               # Tástálacha slándála
├── translator/             # Tástálacha a bhaineann go sonrach leis an aistritheoir
└── load/                   # Tástálacha ualaigh

docs/
├── adr/                     # Taifid ar Chinntí Ailtireachta
├── architecture/            # Ailtireacht agus athléimneacht an chórais
├── comparison/              # OmniRoute i gcomparáid le roghanna eile
├── compression/             # Treoracha agus rialacha comhbhrúite
├── dev/                     # Treoracha forbartha
├── diagrams/                # Léaráidí ailtireachta
├── frameworks/              # MCP, A2A, OpenCode, Cuimhne, Scileanna
├── guides/                  # Treoir úsáideora, Docker, cumrú, fabhtcheartú
├── i18n/                    # Aistriúcháin idirnáisiúnaithe README
├── marketing/               # Ábhair mhargaíochta
├── ops/                     # Imscaradh, seachfhreastalaí, cumhdach, eisiúintí
├── providers/               # Doiciméid a bhaineann go sonrach le soláthraithe
├── reference/               # Tagairt API, athróga timpeallachta, uirlisí CLI, sraitheanna saor in aisce
├── releases/                # Nótaí eisiúna
├── routing/                 # Inneall auto-combo, athsheinm réasúnaíochta
├── screenshots/             # Gabhálacha scáileáin den deais
├── security/                # Ráillí cosanta, comhlíonadh, ceilteacht, comharthaí
└── specs/                   # Sonraíochtaí dearaidh
```

---

## Soláthraí Nua a Chur Leis

### Céim 1: Tairisigh an tSoláthraí a Chlárú

Cuir le `src/shared/constants/providers.ts` — bailíochtaithe ag Zod nuair a lódáiltear an modúl.

### Céim 2: Seiceadóir a Chur Leis (má tá loighic shaincheaptha de dhíth)

Cruthaigh seiceadóir in `open-sse/executors/your-provider.ts` a leathnaíonn an bunseiceadóir.

### Céim 3: Aistritheoir a Chur Leis (má úsáidtear formáid nach formáid OpenAI í)

Cruthaigh aistritheoirí iarratais/freagartha in `open-sse/translator/`.

### Céim 4: Cumraíocht OAuth a Chur Leis (má tá sé bunaithe ar OAuth)

Cuir dintiúir OAuth in `src/lib/oauth/constants/oauth.ts` agus seirbhís in `src/lib/oauth/services/`.

Má dháileann an soláthraí réamhtheachtach `client_id`/rún poiblí OAuth nó eochair Firebase Web API laistigh dá CLI poiblí / bheart brabhsálaí, **ná** leabaigh mar theaghrán litriúil é. Úsáid `resolvePublicCred()` ó `open-sse/utils/publicCreds.ts` agus cuir iontráil bheart chumhdaithe le `EMBEDDED_DEFAULTS`. Tá an sreabhadh oibre éigeantach iomlán doiciméadaithe in [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Laistigh de láimhseálaithe/seiceadóirí, ní mór do theachtaireachtaí earráide a shroicheann an cliant dul trí `buildErrorBody()` / `sanitizeErrorMessage()` ó `open-sse/utils/error.ts` — ná cuir `err.stack` ná `err.message` amh i gcorp Response choíche. Féach [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Céim 5: Samhlacha a Chlárú

Cuir sainmhínithe samhlacha in `open-sse/config/providerRegistry.ts`.

### Céim 6: Tástálacha a Chur Leis

Scríobh tástálacha aonaid in `tests/unit/` a chlúdaíonn, ar a laghad:

- Clárú an tsoláthraí
- Aistriú iarratais/freagartha
- Láimhseáil earráidí

---

## Seicliosta Iarratais Tarraingthe

- [ ] Éiríonn leis na tástálacha (`npm test`)
- [ ] Éiríonn leis an lintáil (`npm run lint`)
- [ ] Éiríonn leis an tiomsú (`npm run build`)
- [ ] Cineálacha TypeScript curtha leis le haghaidh feidhmeanna agus comhéadain phoiblí nua
- [ ] Gan aon rúin ná luachanna cúltaca crua-chódaithe
- [ ] Dintiúir phoiblí réamhtheachtacha leabaithe trí `resolvePublicCred()` (féach [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), agus ní mar litearáil riamh
- [ ] Freagraí earráide seolta trí `buildErrorBody()` / `sanitizeErrorMessage()` — gan aon rianta amhchruaiche i gcorp na bhfreagraí (féach [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Orduithe blaoisce (`exec` / `spawn`) a chuireann luachanna ama rite ar aghaidh trí `env`, ní trí idirshuíomh teaghrán
- [ ] Gach ionchur bailíochtaithe le scéimeanna Zod
- [ ] **Blúire** den loga athruithe curtha leis faoi `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` le haghaidh athruithe atá infheicthe ag úsáideoirí (féach [`changelog.d/README.md`](./changelog.d/README.md)) — ná cuir `CHANGELOG.md` in eagar go díreach; déantar na blúirí a chomhiomlánú tráth an eisiúna agus ní bhíonn coinbhleacht eatarthu riamh i measc PRanna
- [ ] Doiciméadacht nuashonraithe (más infheidhme)
- [ ] Gan aon fholáirimh nua CodeQL / Secret-Scanning oscailte, nó gach ceann acu diúltaithe le bonn cirt teicniúil a thagraíonn don doiciméad ábhartha in `docs/security/`
- [ ] Bealaí a sceitheann próisis mhac (`/api/mcp/`, `/api/cli-tools/runtime/`) aicmithe mar `isLocalOnlyPath()` in `src/server/authz/routeGuard.ts` — féach [Riail Dhocht #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Gan aon leantóirí `Co-authored-by` ó IS/róbónna i dteachtaireachtaí tiomantais (Riail Dhocht #16) — tugtar aitheantas do chomhoibrithe daonna a n-athúsáidtear a gcuid oibre le leantóirí caighdeánacha `Co-authored-by: Name <email>`

---

## Eisiúintí

Déantar eisiúintí a bhainistiú tríd an sreabhadh oibre `/generate-release`. Nuair a chruthaítear Eisiúint nua GitHub, foilsítear an pacáiste **go huathoibríoch ar npm** trí GitHub Actions.

Le haghaidh imlonnuithe VPS, úsáid `npm run build:release` (seachas `npm run build`) — déanann sé atógáil ghlan,
cuireann sé an beart le chéile in `dist/`, agus scríobhann sé an marcóir `dist/BUILD_SHA`.
Ansin úsáid na scileanna `/deploy-vps-*-cc`, a dhéanann `dist/` a rsyncáil chuig an gcomhadlann chianda `app/`.

---

## Cabhair a Fháil

- **Ailtireacht**: Féach [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Tagairt API**: Féach [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Doiciméid slándála**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Doiciméid oibríochtaí**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Fadhbanna**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
