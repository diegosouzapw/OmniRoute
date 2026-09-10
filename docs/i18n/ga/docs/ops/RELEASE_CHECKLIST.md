# RELEASE_CHECKLIST (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

---

title: "Seiceliosta Scaoileadh"
version: 3.8.51
lastUpdated: 2026-08-28
---

# Seiceliosta Scaoileadh

> **Nuashonruth deireanach:** 2026-08-28 — v3.8.51
> Sreabhm scaoileadh simplithe a úsáideann scileanna Claude Code le haghaidh uathoibriú.
>
> **Coinnigh an liúntas/brainse glas idir scaoileadh:** féach [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs` teaghlach + `npm run check:release-green` + `/babysit` + oíche). Ag rith
> seo tráthrialta — agus go háirithe **roimh** an seiceliosta seo — tugann sé tús glas
> do PR scaoileadh.

## TL;DR

```bash
# 1. Bump version + generate CHANGELOG (skill)
/version-bump-cc patch    # nó minor/major

# 2. Run quality gate locally
npm run check              # lint + tástálacha
npm run test:coverage      # geata clúdach iomlán (60/60/60/60)

# 3. Build & smoke
npm run build
npm run test:e2e           # roghnach ach molta

# 4. Generate release (skill)
/generate-release-cc

# 5. Deploy (skill)
/deploy-vps-both-cc        # nó akamai-cc / local-ce

# 6. Capture release evidences (skill)
/capture-release-evidences-cc
```

## Foilsíocht Thaofach npm (réamhshocrú ó v3.8.51) — stáisiúnú ar an iarratas, díreach mar aisghníomhú

Foilsíonn `npm-publish.yml` trí **Foilsíocht Thaofach npm (OIDC)** de réir réamhshocraithe: an
jab `stage-npm` (á óstáil ag github) malartaíonn an comhartha aitheantas GitHub le creidmheach
npm gearrthéarmach don rith sin — gan comhartha npm fada-téarma i rúin an repository,
gan aithint 2FA, le cruthúnas ceangailte.
Sin é an bealach le seachaint srianta npm anois go bhfuil comharthaí a sheachain 2FA á mbaint
amach; aisghníomhann sé an sreabhm hiomlán uathoibríoch a bhí ag an tionscadal suas go dtí
v3.8.48 agus ag coimeád na ráthaíochta WS1.3 (ní féidir le comhartha sceite foilsiú ina n-aonar — níl
comhartha ann).

**Socrú uair amháin (úinéir):** npmjs.com → páitiúl `omniroute` → Settings → _Foilsitheoir
Taofach_ → GitHub: úinéir `diegosouzapw`, repository `OmniRoute`, obair-shruth `npm-publish.yml`
(timpeallacht: gan). Go dtí go bhfuil sé sin ann, theipeann an chéim uathoibríoch le `ENEEDAUTH`:
ath-déan deilbhín le `publish_mode=staged` (thíos) nó `direct`.

### Foilsíocht stáisiúnaithe (ar an iarratas — `publish_mode=staged`)

Ní fhoilsíonn obair-shruth npm-publish go díreach a thuilleadh: tosaíonn sé an tarball
pacáilte (`check:pack-boot`) agus ansin rith `npm stage publish` — cuirtear na biteanna
díreacha ar feitheamh ar an registry, **níl siad suiteáilte** go dtí go gceadann an úinéir é.
Bogadh geata 2FA an duine go TAR éis an fianaise, ní roimhe.

**Sreabhm úinéir tar éis go n-éiríonn an obair-shruth glas:**

1. `npm stage list omniroute` — aimsigh an aitheantas stáisiúin (priontáilte freisin sa
   achoimre obair-shruth).
2. Seiceáil na biteanna stáisiúnaithe (molta): `npm stage download <id>`, ansin suiteáil an
   tarball íoslódáilte i réamhshocrú Sealadach agus tosaigh é (`npm run check:pack-boot`
   uathoibríonn an t-ordú céanna pacáil→suiteáil→tús i CI).
3. `npm stage approve <id>` — is é an t-aitint 2FA an foilsiú. `npm stage reject <id>` scriosann é.
4. Tar éis an fhoilsiú glan: cuireann an t-uirathóir tar éis an fhoilsiú (WS1.4 den
   plean v3.8.49) an leagan poiblí suiteáilte ón registry poiblí i gcoimeádán glan agus
   tosaíonn é.

**Aisghníomhú éigeandála:** `workflow_dispatch` le `publish_mode=direct` aisghníomhaíonn an
`npm publish` díreach sinsearach (úsáid ach amháin má théann stáisiúnú féin as bealach;
taifead cén fáth).

**Dúnadh crua uair amháin (úinéir, npmjs.com):** cumraigh an Foilsitheoir Taofach le
haghaidh `omniroute i mód stáisiúnaithe amháin ionas nach féidir le comhartha fada-téarma
sceite `npm publish` go díreach ó áit ar bith — CI is féidir leis stáisiúnú amháin; ní
folmhaíonn ach 2FA an úinéir.

**Clárlann míreanna briste (gan athrú):** `npm deprecate omnir القومية@<bad> "<reason> — use <fixed>"`
mar an réimhíomhán réamhshocraithe (nóiméad, inmhalartaithe); `npm publish` ach amháin laistigh de
72h/gan spleáchaint agus riamh mar an chéim ar dtús. Docker: ná athscríobh comhartha leagain — is
athbhreithniú é `latest` a dhíriú ar an méid digite deireanach maith.

**Docker Hub `latest` (riachtanach gach foilsiú SemVer cobhsaí):** ní mór do
obair-shruth `docker-publish` comhartha **lámhaigh X.Y.Z** agus, nuair a
aontann `should-promote-latest.sh` gurb é seo an SemVer cobhsaí is airde, `:latest`
leis an **digiteanna céanna**. Tar éis an jab: Comhionann digiteanna Hub `latest` le digiteanna
SemVer nua agus `last_updated` bogtha. Ná fág `:latest` ar thógáil níos sine
agus nótaí scaoileadh ag caint faoi shocrú nach bhfuil ann ach ar git. Úsáideann
túsanna Compose `:latest`; ba cheart go leanfadh GitSí ar `X.Y.Z`. Féach
[ULA scaoileadh Docker](../guides/DOCKER_GUIDE.md#release-channels) agus #10317.

## Hotfix Fast-Lane (lipéad `hotfix`)

PR a bhfuil lipéad `hotfix` air, scipeann sé an maitrís CI throm (E2E 9-shard, ratchet clúdaigh,
geata cáilíochta, cáilíocht-fhairsing) agus coinníonn sé na geataí tapa, ard-chomhartha: tógáil,
shards aonad, comhtháthú, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
agus an tarball boot-smoke (`check:pack-boot`). Sprioc: glas i ≤15 nóiméad in ionad ~33 nóiméad.

**Polasaí iontrála — na ceithre cinn go léir riachtanach (ar aon dul le lánaí éigeandála Chromium/VS Code/Node):**

1. **Déine**: tá an táirgeadh briste — tuairteálann saothar foilsithe ar thús / a
   shocrú slándála / bíonn tionchar ar gach úsáideoir den scaoileadh. Ní "briste" é "tábhachtach".
2. **Údarás**: ní chuirfidh ach úinéir an stórais an lipéad `hotfix` i bhfeidhm. Is é an lipéad
   an ceadú — ná freastail riamh ort féin ar PR feachtais.
3. **Fianaise**: nascann comhlacht an PR an rith throm iomlán glas roimhe seo (an tsraith a
   ndéanfadh na poist scipeáilte athbhailíochtú) chomh maith le tástáil teipe-ansin-rith an fhix féin.
4. **Raon feidhme**: silíní-piocáil amháin — an socrú íosta, gan aon athchóiriú, gan aon turas taobh.

Déanann an chéad rith iomlán eile ar an mbrainse scaoilte (scaoileadh-leanúnach-glas) athbhailíochtú
ar an dromchla clúdaigh/ratchet scipeáilte — scipeann an lána WAITING, riamh bailíochtú. Diffs
tástálacha-amháin (gach comhad faoi `tests/`, aon cheann faoi `tests/e2e/`) scipeann an maitrís
E2E go huathoibríoch, gan aon lipéad.

## Seicliosta Mionsonraithe

### Réamh-scaoileadh

- [ ] Tá gach PR dírithe ar an scaoileadh seo cumhdaithe le `release/vX.Y.0`
- [ ] Tá gach mír Linear/eisiúint oscailte don leagan seo dúnta nó brúite go dtí an chéad mhíleáiste eile
- [ ] CI glas ar bhrainse `release/vX.Y.0`
- [ ] Gan aon mharcóirí `TODO(release)` sa chód: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Íomhá bhun Docker suas chun dáta (faoi láthair `node:24.15.0-trixie-slim`)

### Leagan & Changelog

- [ ] Rith `/version-bump-cc <patch|minor|major>` (scil Claude Code)
  - Ardaíonn `package.json`, `electron/package.json`
  - Athghiníonn `CHANGELOG.md` ó thiomantais git ón tag deireanach
  - Nuashonraíonn suaitheantais README.md
- [ ] Athbhreithnigh CHANGELOG.md de láimh agus glan suas teachtaireachtaí tiomantais más gá
- [ ] Cinntigh go bhfuil an chuid is déanaí semver in `CHANGELOG.md` cothrom le leagan `package.json`
- [ ] Coinnigh `## [Unreleased]` mar chéad chuid an changelog don obair atá le teacht
- [ ] Nuashonraigh `docs/openapi.yaml` → ní mór `info.version` a bheith cothrom le leagan `package.json`

### Cáilíocht Cóid

- [ ] `npm run lint` — 0 earráidí (tá rabhaidh ann cheana)
- [ ] `npm run typecheck:core` — glan
- [ ] `npm run typecheck:noimplicit:core` — glan (dian)
- [ ] `npm run check:cycles` — gan aon spleáchais chiorclacha
- [ ] `npm run check:any-budget:t11` — laistigh den bhuiséad
- [ ] `npm run check:route-validation:t06` — glan
- [ ] `npm run check:node-runtime` — comhlíontar urlár runtime tacaithe (`>=22.22.2 <23`, `>=24.0.0 <27`, de réir `SUPPORTED_NODE_RANGE` in `src/shared/utils/nodeRuntimeSupport.ts`; ar aon dul le `engines` in `package.json`)

### Tástáil

- [ ] `npm run test:unit` — pas
- [ ] `npm run test:vitest` — pas (freastalaí MCP, autoCombo, taisce)
- [ ] `npm run test:coverage` — geata 60/60/60/60 sáraithe (ráitis/línte/feidhmeanna/brainsí)
- [ ] `npm run test:integration` — pas (má théann athruithe i bhfeidhm ar DB / láimhseálaithe)
- [ ] `npm run test:combo:matrix` — pas (maitrís straitéise combo: cruthaíonn sé cinntí roghnúcháin na 19 straitéis ródaithe poiblí go cinntitheach; rith nuair a bhíonn tú ag déileáil le ródú combo, réiteach straitéise, nó loighic fhálróid)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **roghnach/lámhleabhar** (smoke upstream fíor-gheataithe; foinsíonn sé snapshot DB léite-amháin ó VPS `root@192.168.0.15`; buaileann sé soláthróirí fíor, cosnaíonn sé creidmheasanna; ní ritheann sé riamh i CI; scipeann sé go glan gan an geata)
- [ ] `npm run test:combo:live:vps` — **roghnach/lámhleabhar** (smoke beo VPS Céim-3: 7 gcás HTTP i gcoinne an fhreastalaí beo `.15` trí Node ESM plain; éilíonn `ssh root@192.168.0.15`; cruthaíonn/scriosann sé combos `__live_test__*` amháin; buaileann sé soláthróirí fíor; ní ritheann sé riamh i CI)
- [ ] `npm run test:e2e` — pas (athruithe UI)
- [ ] `npm run test:protocols:e2e` — pas (athruithe MCP/A2A)
- [ ] `npm run test:ecosystem` — pas

### Hooks (Husky bailíochtaithe)

Tá hooks Husky in `.husky/` agus ritheann siad go huathoibríoch ar oibríochtaí git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** geataí cinntitheacha tapa — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (gníomhachtaithe 2026-06-13). Eisiata d'aon ghnó `test:unit` (mall; clúdaithe ag post CI `test-unit`).
  - Rith `npm run test:unit` de láimh sula mbrúitear brainsí scaoilte.

Má theipeann ar hook: deisigh an bhuncheist, ná seachain le `--no-verify`.

### Tiomantais Choinbhinsiúnacha

Ní mór do gach tiomantas ceangailte le scaoileadh formáid `type(scope): subject` a leanúint.

**Cineálacha bailí:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Scóip bhailí:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Athruithe briste: cuir `BREAKING CHANGE:` i gcóirín nó `!` tar éis an scóip (m.sh. `feat(api)!: drop /v0`).

### Doiciméadú

- [ ] Ritheann `npm run check:docs-sync` (ritheann go huathoibríoch le pre-commit)
- [ ] Ritheann `npm run check:docs-all` (scáth: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] Scoireann `npm run check:env-doc-sync` le 0 — tá conradh env idir cód ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` slán
- [ ] Scoireann `npm run check:doc-links` le 0 — gan aon tagairtí inmheánacha markdown briste tar éis athstruchtúrú
- [ ] Athbhreithnithe `docs/architecture/ARCHITECTURE.md` le haghaidh sruth stórála/runtime
- [ ] Athbhreithnithe `docs/guides/TROUBLESHOOTING.md` le haghaidh sruth athróg env agus oibriúcháin
- [ ] Má athraíodh `.env.example`: nuashonraithe `docs/reference/ENVIRONMENT.md`
- [ ] Má tá UI ag gné nua: luann `docs/guides/USER_GUIDE.md` é
- [ ] Má tá API ag gné nua: nuashonraithe `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Más modúl é gné nua: tá `docs/<MODULE>.md` tiomnaithe ann
- [ ] Más athrú briste é: tá nóta imirce in `docs/guides/TROUBLESHOOTING.md`

### i18n

- [ ] Scoireann `npm run i18n:check` le 0 — staid aistriúcháin (`.i18n-state.json`) i sync le doiciméid fhoinse (gan aon fhoinsí sruthaithe i mód dian; tá comhairle mód rabhaidh inghlactha do thadhlanna deireanacha doiciméad, ach ba chóir go mbeadh 0 ann roimh thagáil)
- [ ] Scoireann `npm run i18n:check-ui-coverage` le 0 — gach locale UI ag nó os cionn urlár clúdaigh 80%
- [ ] Tuairiscíonn `npm run i18n:sync-ui:dry` 0 eochracha ar iarraidh ar fud na 42 locale go léir
- [ ] Má athraíodh doiciméid fhoinse Béarla, rith `npm run i18n:run` (éilíonn `OMNIROUTE_TRANSLATION_API_KEY` in `.env`) roimh thagáil
- [ ] Is féidir ranníocaíochtaí aistriúcháin a chur siar go dtí an chéad scaoileadh eile más beag iad (rianú in CHANGELOG)

### Imirceacha Bunachar Sonraí

- [ ] Má tá comhaid nua in `src/lib/db/migrations/`:
  - [ ] Tá gach imirce idirphearsanta (`CREATE TABLE IF NOT EXISTS`, etc.)
  - [ ] Imirceacha fillte in idirbhearta
  - [ ] Uimhrithe i gceart (gan aon bhearnaí sa seicheamh)
- [ ] Tástáil ar shuiteáil úr: scrios `~/.omniroute/omniroute.db` agus rith `npm run dev`
- [ ] Tástáil ar shuiteáil atá ann cheana: cúltaca DB, rith imirce, fíoraigh scéim
- [ ] Láimhseáiltear comhaid WAL (`-wal`, `-shm`) i gceart má athscríobhann imirce táblaí

### Catalóg Soláthróirí (Zod-bhailíochtaithe)

- [ ] Scéim Zod `src/shared/constants/providers.ts` bailí ag am lódála
  - [ ] Tá réimsí riachtanacha ag gach soláthróir (`id`, `label`, `kind`, etc.)
  - [ ] `freeNote` ar fáil do sholáthróirí saor in aisce nua
  - [ ] Tá `oauthConfig` ag soláthróirí OAuth cláraithe in `src/lib/oauth/constants/oauth.ts`
- [ ] Má cuireadh soláthróir nua leis: forghníomhaitheoir comhfhreagrach in `open-sse/executors/`
- [ ] Mura formáid OpenAI é: aistritheoir in `open-sse/translator/`
- [ ] Múnlaí cláraithe in `open-sse/config/providerRegistry.ts`
- [ ] Clúdaíonn tástálacha aonad in `tests/unit/` aicmiú soláthróirí agus ródú

### Deisce (Electron)

Má athraíodh `electron/`:

- [ ] Ritheann `npm run electron:smoke:packaged`
- [ ] Tástáladh tógálacha do cheann amháin ar a laghad de `:win`, `:mac`, `:linux`
- [ ] Deimhnithe síniúcháin chóid gan dul in éag (má tá síniú)
- [ ] Meaitseálann leagan `electron/package.json` fréamh `package.json`
- [ ] Pointeoir cainéil nuashonraithe uathoibríoch má scaoiltear go `stable`

### Leagan Amach Tógála

Úsáideann an stór trí eolaire aschuir ar leith — ná measc riamh iad:

| Eolaire   | Cuspóir                                                  | Rianaithe?       |
| --------- | -------------------------------------------------------- | ---------------- |
| `src/`    | Foinse feidhmchláir (TypeScript / TSX)                   | Tá               |
| `.build/` | Idirmheánacha tógála — aschur `next build` (`distDir`)   | Níl (gitignored) |
| `dist/`   | Bundle npm inseolta — cóimeáilte ag `assembleStandalone` | Níl (gitignored) |

> **Nóta oibreora:** fanann eolaire íomhá cianda VPS mar `/usr/lib/node_modules/omniroute/app/`.
> Níor bhog ach aschur tógála **in-stórais** (`app/` → `dist/`). Déanann na scileanna imlonnaithe rsync
> ábhar `dist/` isteach san eolaire cianda `app/` — gan aon athruithe cosáin VPS ag teastáil.

**Sreabhadh aon-tógála:**

```
npm run build:release
  └─ rm -rf .build dist          (glan)
  └─ next build → .build/next/   (idirmheánacha)
  └─ assembleStandalone          (cóipeálann standalone + static + public + natives → dist/)
  └─ scríobhann dist/BUILD_SHA       (sentinel HEAD)
```

NÁ rith `npm run build` agus ansin `npm run build:cli` ar leithligh le haghaidh imlonnaithe — úsáid
`npm run build:release` a dhéanann atógáil ghlan + sentinel in aon ordú amháin.

### Bailíochtú Saothar

- [ ] Éiríonn le `npm run build:release` agus `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` glan — gan aon `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, nó iarmhar áitiúil eile
- [ ] Tá `dist/server.js` ann tar éis tógála

### Tagáil & Scaoileadh

- [ ] Rith `/generate-release-cc` (scil Claude Code):
  - Cruthaíonn tag `vX.Y.Z`
  - Brúigh tag agus brainse
  - Osclaíonn Scaoileadh GitHub le comhlacht changelog
  - Ceanglaíonn suiteálaithe Electron (má tógadh iad)
- [ ] Nó de láimh:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Imlonnaithe

Úsáideann scileanna imlonnaithe an sreabhadh éadrom rsync — gan `npm pack`, gan `npm i -g`:

- [ ] Úsáid scil imlonnaithe a mheaitseálann an sprioc:
  - `/deploy-vps-local-cc` — VPS áitiúil (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — an dá cheann
- [ ] Roimh imlonnaithe, deimhnigh `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Ní mór tógáil a rith áit a bhfuil `node_modules` fíor (príomhsheiceáil nó worktree `npm ci`'d — NÍ worktree symlinked)
- [ ] Tástáil smoke ar an gcás imlonnaithe:
  - Oscail `/dashboard/health` → seiceáil go meaitseálann teaghrán leagan an scaoileadh
  - Rith iarratas `/v1/chat/completions` i gcoinne soláthróir aitheanta
  - Fíoraigh go bhfillfidh `/api/monitoring/health` scoradáin chiorcaid `CLOSED`
  - Deimhnigh go bhfreagraíonn iompar MCP (`/mcp` HTTP, `/mcp-sse` SSE)

### Iar-scaoileadh

- [ ] Rith `/capture-release-evidences-cc` (scil Claude Code)
  - Gabhann scáileáin/thaifeadtaí WebP de ghnéithe nua
  - Ceanglaíonn le nótaí scaoilte / phost bhlag
- [ ] Nuashonraigh Plé GitHub / Discord le fógra scaoilte
- [ ] Oscail míleáiste don chéad leagan eile
- [ ] Má tá sé criticiúil: pionnaigh plé nó postáil in `news.json` le haghaidh meirge in-app

### Geata seolta poiblí Radar

Tá an fógra Radar tiomnaithe d'aon ghnó le `active: false`. Is athrú ar leithligh é gníomhachtú
tar éis gach mír thíos a bheith fianaise:

- [ ] Tá gach PR Radar cruachta cumhdaithe agus tá CI barr-scaoilte glas
- [ ] Imlonnaigh agus déan smoke ar bhealaí OSS Radar le `RADAR_ENABLED` fós as de réir réamhshocraithe
- [ ] Déan smoke ar `GET /planos`, `/termos`, `/privacidade`, agus `/reembolso` ar an óstach Radar ainmnithe
- [ ] Taifead aitheantas/teagmháil/seoladh oibreora agus athbhreithniú dlíthiúil ceadaithe úinéara sa tseirbhís phríobháideach
- [ ] Cleachtaigh Stripe Checkout agus an webhook sínithe i mód tástála amháin
- [ ] Cleachtaigh seachadadh ríomhphoist criptithe idirbheartaithe amháin leis an seoltóir/ainm fearainn ceadaithe
- [ ] Cruthaigh athchóiriú cúltaca agus rith taighde maoirsithe amháin, buiséad-chaipínithe
- [ ] Ceadaigh polasaí athbhreithnithe BRL/PIX sula nglactar le fianaise síntiúis
- [ ] Cumasaigh Checkout poiblí ach amháin tar éis na geataí roimhe seo, ansin gníomhachtaigh an t-aitheantas nua `news.json`
- [ ] Fíoraigh go n-úsáideann an mheirge Baile cóip logánta agus go bhfeictear aitheantas nua arís tar éis aitheantas níos sine a dhíbhe

## Seirbhísí ionsáite (smoke) (v3.8.4+)

Sula seoladh aon eisiúin ina bhfuil athruithe ar sheirbhísí ionsáite, déan é seo a bhailíochtú:

### Túsreachtaireacht le Bunachar Nua-ghlanadh (aimsíonn sé coinbhleachtaí aimsithe — curtha leis i ndiaidh socraithe te iarmhartach v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — fan 10 s le haghaidh tosach
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` cuireann ar ais `"9router"` (NÍL 404, NÍL 500). Dearbhaíonn sé go bhfuil an chistin aimsithe `071_services.sql` curtha i bhfeidhm + sliocht seachadta.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` cuireann ar ais 3 shliocht.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` cuireann ar ais 2 shliocht (bailíochtaíonn sé go bhfuil an chistin aimsithe `070_webhooks_kind_metadata.sql` curtha i bhfeidhm).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` ritheann — cosnaíonn sé in aghaidh coinbhleachtaí sa todhchaí.

### 9Router

- [ ] `POST /api/services/9router/install` cuireann ar ais 200 le `installedVersion` i bhfíor-am níos lú ná 2 nóiméad
- [ ] `POST /api/services/9router/start` cuireann ar ais 200 agus `state: "running"` i bhfíor-am níos lú ná 30 soicind
- [ ] `GET /api/services/9router/status` tuairiscíonn `health: "healthy"`
- [ ] `POST /v1/chat/completions` le `"model": "9router/auto/..."` cuireann ar ais 200 (fíor-iompar trí 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` laysíonn comhéadan nádúrtha 9Router isteach sa tseachfhreagróir (gan iframe `127.0.0.1:port` díreach)
- [ ] `POST /api/services/9router/rotate-key` cuireann ar ais `{ keyRotated: true }` agus tosaíonn an tseirbhís arís gan mórán saincheisteanna
- [ ] `POST /api/services/9router/stop` cuireann ar ais 200 agus `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` cuireann ar ais sruth SSE le heintitas `snapshot` ina bhfuil na línte is déanaí
- [ ] Taisceadh i dtimpeallacht gan `npm` i PATH cuireann ar ais 500 le teachtaireacht earráide cairdiúil (gan rian staca)

### API Próiseálaí CLI

- [ ] `POST /api/services/cliproxy/install` cuireann ar ais 200 i bhfíor-am níos lú ná 2 nóiméad
- [ ] `POST /api/services/cliproxy/start` cuireann ar ais 200 agus `state: "running"` i bhfíor-am níos lú ná 30 soicind
- [ ] `GET /api/services/cliproxy/status` tuairiscíonn `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` cuireann ar ais 200 agus `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` cuireann ar ais sruth SSE

### Athghníomhú Slándála

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` cuireann ar ais `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` cuireann ar ais `403 LOCAL_ONLY`
- [ ] Níl freagraí earráide ó `/api/services/*` ina bhfuil `err.stack` nó conairí comhaid iomlán

## Seiceálacha v3.8.0+

Sula seoladh aon eisiúin v3.8.x, déan na hiontrálacha breise seo a bhailíochtú:

- [ ] `omniroute --tray` tosaíonn ar macOS (systrá seachadta isteach i `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` tosaíonn ar Linux (teastaíonn DISPLAY; earráid shiúil má dhéantar neamhord air)
- [ ] `omniroute --tray` tosaíonn ar Windows (NotifyIcon PowerShell, gan comhaid déanta breise)
- [ ] `omniroute config tray enable` cruthaíonn iontráil tosach uathoibríoch; baineann `disable` é
- [ ] `npm install -g omniroute@<this-version>` rithíonn postinstall gan scor marfach
- [ ] Coinníonn an nuashonrú conair suiteálacha roghnacha: `omniroute update --apply` agus an nuashonróir uathoibríoch
      rithíonn `npm install -g … --include=optional` ionas go maireann `optionalDependencies` (better-sqlite3,
      keytar, tls-client, agus an t-ualach SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) nuashonrú. Teastaíonn an tsraith `modelPath` SLM ultra freisin le haghaidh an
      tsamhail tinybert, a íoslódálfar go huathoibríoch go `${DATA_DIR}/models/llmlingua` an chéad uair a úsáidtear é. An postinstall
      (`scripts/build/colocateOptionals.mjs`) ansin co-locates an glas SLM roghnach isteach i
      `dist/node_modules` ionas go réitíonn an t-oibreoir amháin `@huggingface/transformers` ^4.2.0
      — ní chuireann an lorgaíocht aonair ach transformers leis, gan na roghnacha a allmhairítear go dinimiciúil, agus gan é seo, dhéanfadh an t-oibreoir llmlingua-2 a luchtú i gcoinne transformers an bhun agus d'fhéadfadh an tsraith SLM gan dul i bhfeidhm go ciúin.
- [ ] `omniroute status` oibríonn gan `.env` (conair comhartha CLI, aisghníomhach amháin)
- [ ] `curl http://localhost:20128/api/shutdown` cuireann ar ais 401 (cosnóidh an conair i gcónaí)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` cuireann ar ais 401 (cosnóidh aisghníomhach)
- [ ] Réitíonn SQLite runtimne go `bundled` an chéad uair (binse bactha bailí don ardán)
- [ ] Titeann SQLite runtimne ar ais go `runtime` nuair a scriostar `node_modules/better-sqlite3`
- [ ] Comhbrúnn an scagaire MCP cliste torthaí `playwright-mcp browser_snapshot` fíor (laghú ≥50%)
- [ ] Tá na 10 comhad `skills/omniroute*/SKILL.md` go léir in-ionsáil go poiblí trí URL raw GitHub
- [ ] Taispeánann an draoi chéimeanna turas "Conas a Oibríonn sé" ar shocrú nua
- [ ] Taispeánann giuirléid clúdach ranga an deais baile líon na socrúchán/gníomhach

## Cealú

Má tá fadhb thromchúiseach le scaoileadh:

1. `gh release edit vX.Y.Z --prerelease` (marcáil nach é an leagan is déanaí)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (ach amháin mura bhfuiltear tar éis glacadh ag úsáideoirí fós)
3. Nó: ceartúchán teicniúil ar `release/vX.Y.0` → scaoileadh paiteach `vX.Y.(Z+1)`
4. Cumarsáid a dhéanamh láithreach bonn i dTíomanna GitHub agus i Discord

## Rialtacha Crua

- Ná coinnigh riamh go díreach ar `main`
- Ná húsáid `git push --force` riamh go príomh nó go brainse `release/*`
- Ná déan dearmad riamh ar crua-earraí Husky (`--no-verify`)
- Ná coinnigh riamh rúin, creidmheachtaí, nó comhaid `.env`
- Caithfidh clúdach fanacht ≥60/60/60/60 (rátaí/línte/fuinneoga/brainseanna)
- Bíonn tástálacha san áireamh nó á nuashonrú i gcónaí nuair a athraítear cód táirgíochta i `src/`, `open-sse/`, `electron/`, nó `bin/`

## Seiceáil Sioncronú Uathoibrithe

Rith garda sioncronú na ndoiciméad go háitiúil roimh oscailt PR:

```bash
npm run check:docs-sync # Seiceáil an bhfuil na doiciméid sioncronaithe
```

Cuireann CI seiceáil seo ar bun freisin in `.github/workflows/ci.yml` (obair lint).
