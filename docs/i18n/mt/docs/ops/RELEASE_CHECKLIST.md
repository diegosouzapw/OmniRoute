# RELEASE_CHECKLIST (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

---

title: "Lista tal-Kontroll għat-Tnedija"
version: 3.8.51
lastUpdated: 2026-08-28
---

# Lista tal-Kontroll għat-Tnedija

> **L-aħħar aġġornament:** 2026-08-28 — v3.8.51
> Flow tat-Tnedija simplifikat li jagħmel ħbla tal-ħiliet tal-Kodiċi ta' Claude għall-awtomatizzazzjoni.
>
> **Żomm il-kju/linja abjad bejn it-tnedijiet:** ara [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs` familja + `npm run check:release-green` + `/babysit` + bil-lejl). Ġiri
> dan perjodikament — u speċjalment **qabel** din il-lista tal-kontroll — jagħmel il-PR tat-Tnedija jibda abjad.

## TL;DR

```bash
# 1. Zid il-verżjoni + ġenera CHANGELOG (ħila)
/version-bump-cc patch    # jew minor/major

# 2 Ġeri il-bieb tal-kwalità lokally
npm run check              # lint + tests
npm run test:coverage      # bieb tal-kopertura kollha (60/60/60/60)

# 3. Bini u t-test tal-ħruq
npm run build
npm run test:e2e           # mhux obbligatorju imma rakkomandat

# 4. Ġenera r-rilaxx (ħila)
/generate-release-cc

# 5. Tnaddaf (ħila)
/deploy-vps-both-cc        # jew akamai-cc / local-cc

# 6. Ilqa' l-evidenzi tar-rilaxx (ħila)
/capture-release-evidences-cc
```

## NPM Trusted Publishing (preżunt minn v3.8.51) — skedat fuq talba, dirett bħala fallback

`npm-publish.yml` jippubblika permezz ta' **NPM Trusted Publishing (OIDC)** b'mod preżunt: ix-xogħol
`stage-npm` (immuntat fuq github) jiskambja l-id-token ta' GitHub għal kredenzjali npm li ħajjitha
qasir għal dik iċ-ċirkostanza — ebda token npm li ħajjitha twila fis-sigrieta tal-ħażniet, ebda
prompt ta' 2FA, il-provenjenza marbuta. Dan huwa l-bypass li s-sanzjonijiet npm issa li l-token li
jgħaddu 2FA qed jitwarrbu; jerġa' jinstalla l-flow awtomatiku kollu li l-proġett kien qed joħroġ
sa v3.8.48 filwaqt li jżomm il-garanzija WS1.3 (token mxerred ma jistax jippubblika waħdu — m'hawnx token).

**Twaqqif wieħed (proprietarju):** npmjs.com → il-pakkett `omniroute` → Settings → _Trusted
Publisher_ → GitHub: proprietor `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(madwar: xejn). Sakemm dan ma jkunx hemm, l-pass awtomatiku falli b'`ENEEDAUTH`: terġa' tibgħat
b'`publish_mode=staged` (hawn taħt) jew `direct`.

### N pubblikazzjoni skedata (fuq talba — `publish_mode=staged`)

Il-workflow npm-publish m'għadux jippubblika direttament: jistartja t-tarball impakkjat
(`check:pack-boot`) u mbagħad jgħaddi `npm stage publish` — l-istess bajt jitħalla fuq
ir-reġistru, **mhux installabbli** sakemm il-proprietarju ma japprovahx. Il-bieb 2FA tal-bniedem
mexa wara l-prova, mhux qabilha.

**Flow tal-Proprietarju wara li l-workflow jisfar:**

1. `npm stage list omniroute` — sib l-identifikatur tal-iskedament (jintprinta wkoll fil-wiri tal-workflow).
2. Verifika l-bajt skedat (irakkomandat): `npm stage download <id>`, imbagħad installa t-tarball
   ttellgħa f'prefiss temporanju u startjaha (`npm run check:pack-boot` jautomatizza l-istess
   verdict impakkjat→installat→startjat fl-CI).
3. `npm stage approve <id>` — il-prompt 2FA huwa l-pubblikazzjoni. `npm stage reject <id>` jelimina.
4. Wara l-pubblikazzjoni netta: il-verifikatur wara l-pubblikazzjoni (WS1.4 tal-pjan v3.8.49) jinstalla
   l-verżjoni ppubblikata mir-reġistru pubbliku f'kontenitur nadif u jistartjaha.

**Fallback ta' emerġenza:** `workflow_dispatch` b'`publish_mode=direct` jerġa' jinstalla l-
`npm publish` immedjat leġiżlu (użu biss jekk l-iskedament innusu m'għadux jiġri; irrekordja għaliex).

**Waħda ta' tweġiba (proprietarju, npmjs.com):** IConfiguration il-Trusted Publisher għal
`omniroute` b'modu skedat biss biex token mxerred li ħajjitha twila ma jistax `npm publish`
direttament minn mkien — CI tista' tiskeda biss; biss il-2FA tal-proprietarju tista' tnaddaf.

**Playbook ta' l-affarijiet miksura (bla tibdil):** `npm deprecate omniroute@<ħażin> "<raġun> — uża <saħħa>`
bħala riflessu preżunt (minuti, reversibbli); `npm unpublish` biss fi ħdan it-tieqa ta' 72s/ebda-dipendenti
u qatt bħala l-ewwel mossa. Docker: qatt terġa' tagħmel tag tag tag verżjoni — il-rollback huwa
terġa' tpoġġi `latest` fuq l-aħħar diġest tajjeb.

**`latest` ta' Docker Hub (meħtieġa f'kull pubblikazzjoni SemVer stabbli):** ix-xogħol
`docker-publish` irid jittagħ **it-tnejn** `X.Y.Z` u, meta
`should-promote-latest.sh` jaqbel li dan huwa l-aħħar SemVer stabbli, `:latest`
b'**l-istess diġest**. Wara x-xogħol: diġest `latest` tal-Hub jista' jkun ugwali għad-diġest
l-ġdid tal-SemVer u `last_updated` mexa. Tħalliex `:latest` fuq bini aktar qadim
waqt li l-noti tar-rilaxx jirreferu għal tiswija li tinsab biss fuq git. Il-quickstart tal-Compose
jistiednu `:latest`; il-GitOps għandu jżomm il-pinning `X.Y.Z`. Ara
[iż-Channel tad-Docker](../guides/DOCKER_GUIDE.md#release-channels) u #10317.

## Hotfix Fast-Lane (tikketta `hotfix`)

PR b'tikketta `hotfix` jaqbeż il-matriċi tqila tal-CI (E2E ta' 9-shard, coverage ratchet,
quality-gate, quality-extended) u jżomm il-gradi veloċi u ta' sinjal għoli: build,
unit shards, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
u t-tarball boot-smoke (`check:pack-boot`). Mira: aħdar fi ≤15min minflok ~33min.

**Politika ta' dħul — l-erbgħa kollha meħtieġa (ibbażata fuq il-korsiji ta' emerġenza ta' Chromium/VS Code/Node):**

1. **Severità**: il-produzzjoni hija miksura — artifact ippubblikat jaħbat mal-boot / tiswija ta' sigurtà /
   kull utent tar-rilaxx huwa affettwat. "Importanti" mhux "miksur".
2. **Awtorità**: biss is-sid tar-repo japplika t-tikketta `hotfix`. It-tikketta HIJA
   l-approvazzjoni — qatt ma sservi lilek innifsek fuq PR ta' kampanja.
3. **Evidenza**: il-ġisem tal-PR jorbot il-run aħdar tqil preċedenti (is-suite li l-impjiegi
   maqbuża kienu jivvalidaw mill-ġdid) flimkien mat-test tal-falliment-then-passing tat-tiswija stess.
4. **Skop**: cherry-pick-only — it-tiswija minima, l-ebda refactors, l-ebda ride-alongs.

Il-wiċċ ta' coverage/ratchet maqbuż jiġi vvalidat mill-ġdid mir-run sħiħ li jmiss fuq il-fergħa
tar-rilaxx (continuous release-green) — il-korsija taqbeż il-WAITING, qatt il-validazzjoni.
Diffs ta' testijiet biss (il-fajls kollha taħt `tests/`, l-ebda wieħed taħt `tests/e2e/`) jaqbżu l-matriċi
E2E awtomatikament, mingħajr l-ebda tikketta.

## Checklist Dettaljata

### Qabel ir-Rilaxx

- [ ] Il-PRs kollha mmirati lejn dan ir-rilaxx huma mmerġjati f'`release/vX.Y.0`
- [ ] L-oġġetti kollha miftuħa ta' Linear/issue għal din il-verżjoni huma magħluqa jew imbuttati għall-milestone li jmiss
- [ ] CI aħdar fuq il-fergħa `release/vX.Y.0`
- [ ] L-ebda markaturi `TODO(release)` fil-kodiċi: `grep -r "TODO(release)" src/ open-sse/`
- [ ] L-immaġni bażi ta' Docker aġġornata (bħalissa `node:24.15.0-trixie-slim`)

### Verżjoni u Changelog

- [ ] Mexxi `/version-bump-cc <patch|minor|major>` (ħila ta' Claude Code)
  - Jgħolli `package.json`, `electron/package.json`
  - Jiġġenera mill-ġdid `CHANGELOG.md` mill-commits ta' git mill-aħħar tag
  - Jaġġorna l-badges ta' README.md
- [ ] Irrevedi manwalment CHANGELOG.md u naddaf il-messaġġi tal-commits jekk meħtieġ
- [ ] Żgura li l-aħħar sezzjoni semver f'`CHANGELOG.md` hija ugwali għall-verżjoni ta' `package.json`
- [ ] Żomm `## [Unreleased]` bħala l-ewwel sezzjoni tal-changelog għax-xogħol li jmiss
- [ ] Aġġorna `docs/openapi.yaml` → `info.version` irid ikun ugwali għall-verżjoni ta' `package.json`

### Kwalità tal-Kodiċi

- [ ] `npm run lint` — 0 żbalji (twissijiet huma pre-eżistenti)
- [ ] `npm run typecheck:core` — nadif
- [ ] `npm run typecheck:noimplicit:core` — nadif (strett)
- [ ] `npm run check:cycles` — l-ebda dipendenzi ċirkolari
- [ ] `npm run check:any-budget:t11` — fil-baġit
- [ ] `npm run check:route-validation:t06` — nadif
- [ ] `npm run check:node-runtime` — l-art tar-runtime appoġġjat milħuq (`>=22.22.2 <23`, `>=24.0.0 <27`, skont `SUPPORTED_NODE_RANGE` f'`src/shared/utils/nodeRuntimeSupport.ts`; allinjat ma' `engines` ta' `package.json`)

### Ittestjar

- [ ] `npm run test:unit` — jgħaddi
- [ ] `npm run test:vitest` — jgħaddi (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — gate 60/60/60/60 sodisfatt (statements/lines/functions/branches)
- [ ] `npm run test:integration` — jgħaddi (jekk il-bidliet imissu DB / handlers)
- [ ] `npm run test:combo:matrix` — jgħaddi (matriċi tal-istrateġija combo: tipprova d-deċiżjonijiet tal-għażla tal-19-il strateġija ta' routing pubblika kollha b'mod deterministiku; mexxi meta tmiss combo routing, riżoluzzjoni tal-istrateġija, jew loġika ta' fallback)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **opzjonali/manwali** (smoke reali gated upstream; jieħu snapshot read-only tad-DB mill-VPS `root@192.168.0.15`; jolqot providers reali, jiswa credits; qatt ma jmur fil-CI; jaqbeż b'mod nadif mingħajr il-gate)
- [ ] `npm run test:combo:live:vps` — **opzjonali/manwali** (smoke live tal-Fażi-3 VPS: 7 xenarji HTTP kontra s-server live `.15` permezz ta' Node ESM sempliċi; jeħtieġ `ssh root@192.168.0.15`; joħloq/iqassam biss combos `__live_test__*`; jolqot providers reali; qatt ma jmur fil-CI)
- [ ] `npm run test:e2e` — jgħaddi (bidliet fl-UI)
- [ ] `npm run test:protocols:e2e` — jgħaddi (bidliet MCP/A2A)
- [ ] `npm run test:ecosystem` — jgħaddi

### Hooks (validati minn Husky)

Il-hooks ta' Husky jinsabu f'`.husky/` u jitħaddmu awtomatikament fuq operazzjonijiet ta' git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** gradi deterministiċi veloċi — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (attivat 2026-06-13). Intenzjonalment jeskludi `test:unit` (bil-mod; kopert mill-impjieg `test-unit` tal-CI).
  - Mexxi `npm run test:unit` manwalment qabel ma timbotta l-fergħat tar-rilaxx.

Jekk hook ifalli: sewwi l-kwistjoni sottostanti, taqbiżhiex b'`--no-verify`.

### Conventional Commits

Il-commits kollha marbuta mar-rilaxx iridu jsegwu l-format `type(scope): subject`.

**Tipi validi:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Scopes validi:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Bidliet li jkissru: żid footer `BREAKING CHANGE:` jew `!` wara l-iskop (eż. `feat(api)!: drop /v0`).

### Dokumentazzjoni

- [ ] `npm run check:docs-sync` jgħaddi (jitħaddem awtomatikament mill-pre-commit)
- [ ] `npm run check:docs-all` jgħaddi (umbrella: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` joħroġ 0 — il-kuntratt tal-env bejn il-kodiċi ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` huwa intatt
- [ ] `npm run check:doc-links` joħroġ 0 — l-ebda referenzi interni markdown miksura wara r-ristrutturar
- [ ] `docs/architecture/ARCHITECTURE.md` rivedut għal drift ta' storage/runtime
- [ ] `docs/guides/TROUBLESHOOTING.md` rivedut għal drift ta' varjabbli tal-env u operattiv
- [ ] Jekk `.env.example` inbidel: `docs/reference/ENVIRONMENT.md` aġġornat
- [ ] Jekk il-karatteristika l-ġdida għandha UI: `docs/guides/USER_GUIDE.md` isemmiħa
- [ ] Jekk il-karatteristika l-ġdida għandha API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` aġġornati
- [ ] Jekk il-karatteristika l-ġdida hija modulu: `docs/<MODULE>.md` dedikat jeżisti
- [ ] Jekk bidla li tkisser: `docs/guides/TROUBLESHOOTING.md` għandha nota ta' migrazzjoni

### i18n

- [ ] `npm run i18n:check` joħroġ 0 — l-istat tat-traduzzjoni (`.i18n-state.json`) sinkronizzat mad-dokumenti sorsi (l-ebda sorsi driftati fil-modalità stretta; il-mod ta' twissija huwa aċċettabbli għal touch-ups tal-aħħar minuta, iżda għandu jkun 0 qabel it-tagging)
- [ ] `npm run i18n:check-ui-coverage` joħroġ 0 — kull locale tal-UI għall-inqas fil-livell ta' kopertura ta' 80%
- [ ] `npm run i18n:sync-ui:dry` jirrapporta 0 ċwievet nieqsa fil-42 locale kollha
- [ ] Jekk id-dokumenti sorsi bl-Ingliż inbidlu, mexxi `npm run i18n:run` (jeħtieġ `OMNIROUTE_TRANSLATION_API_KEY` f'`.env`) qabel it-tagging
- [ ] Kontribuzzjonijiet ta' traduzzjoni jistgħu jiġu differiti għar-rilaxx li jmiss jekk minuri (ittraċċa fil-CHANGELOG)

### Migrazzjonijiet tad-Database

- [ ] Jekk `src/lib/db/migrations/` għandu fajls ġodda:
  - [ ] Kull migrazzjoni hija idempotenti (`CREATE TABLE IF NOT EXISTS`, eċċ.)
  - [ ] Il-migrazzjonijiet imgeżwra fi transazzjonijiet
  - [ ] In-numri korretti (l-ebda vojt fis-sekwenza)
- [ ] Ittestja fuq installazzjoni friska: ħassar `~/.omniroute/omniroute.db` u mexxi `npm run dev`
- [ ] Ittestja fuq installazzjoni eżistenti: backup tad-DB, mexxi l-migrazzjoni, ivverifika l-iskema
- [ ] Il-fajls WAL (`-wal`, `-shm`) immaniġġjati b'mod korrett jekk il-migrazzjoni tikteb mill-ġdid it-tabelli

### Katalgu tal-Providers (validat minn Zod)

- [ ] L-iskema Zod ta' `src/shared/constants/providers.ts` valida fil-ħin tat-tagħbija
  - [ ] Il-providers kollha għandhom il-kampi meħtieġa (`id`, `label`, `kind`, eċċ.)
  - [ ] `freeNote` provdut għal providers ġodda b'xejn
  - [ ] Il-providers OAuth għandhom `oauthConfig` reġistrat f'`src/lib/oauth/constants/oauth.ts`
- [ ] Jekk provider ġdid miżjud: eżekutur korrispondenti f'`open-sse/executors/`
- [ ] Jekk format mhux OpenAI: traduttur f'`open-sse/translator/`
- [ ] Mudelli reġistrati f'`open-sse/config/providerRegistry.ts`
- [ ] Testijiet unitarji f'`tests/unit/` jkopru l-klassifikazzjoni tal-providers u r-routing

### Desktop (Electron)

Jekk `electron/` inbidel:

- [ ] `npm run electron:smoke:packaged` jgħaddi
- [ ] Builds ittestjati għal mill-inqas wieħed minn `:win`, `:mac`, `:linux`
- [ ] Ċertifikati ta' firma tal-kodiċi mhux skaduti (jekk qed tiffirma)
- [ ] Il-verżjoni ta' `electron/package.json` taqbel mal-verżjoni ta' `package.json` prinċipali
- [ ] Il-pointer tal-kanal tal-aġġornament awtomatiku aġġornat jekk qed tirrilaxxa għal `stable`

### Struttura tal-Build

Ir-repo juża tliet direttorji ta' output distinti — qatt tħallathom:

| Direttorju | Skop                                                                 | Traċċat?        |
| ---------- | -------------------------------------------------------------------- | --------------- |
| `src/`     | Sors tal-applikazzjoni (TypeScript / TSX)                            | Iva             |
| `.build/`  | Intermedji tal-build — output ta' `next build` (`distDir`)           | Le (gitignored) |
| `dist/`    | Bundle npm li jista' jintbagħat — immuntat minn `assembleStandalone` | Le (gitignored) |

> **Nota tal-operatur:** id-direttorju tal-immaġni tal-VPS remota jibqa' `/usr/lib/node_modules/omniroute/app/`.
> Biss l-output tal-build **fir-repo** ċċaqlaq (`app/` → `dist/`). Il-ħiliet ta' deploy rsync
> il-kontenut ta' `dist/` fid-direttorju `app/` remot — l-ebda bidla fil-paths tal-VPS meħtieġa.

**Fluss ta' build wieħed:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

TMEXXIX `npm run build` segwit minn `npm run build:cli` separat għad-deploy — uża
`npm run build:release` li jagħmel rebuild nadif + sentinel f'kmand wieħed.

### Validazzjoni tal-Artifact

- [ ] `npm run build:release` jirnexxi u `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` nadif — l-ebda `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, jew residwu lokali ieħor
- [ ] `dist/server.js` jeżisti wara l-build

### Tagging u Rilaxx

- [ ] Mexxi `/generate-release-cc` (ħila ta' Claude Code):
  - Joħloq it-tag `vX.Y.Z`
  - Jimbotta t-tag u l-fergħa
  - Iftaħ GitHub Release bil-ġisem tal-changelog
  - Iwaħħal l-installers ta' Electron (jekk mibnija)
- [ ] Jew manwalment:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deploy

Il-ħiliet ta' deploy jużaw il-fluss ħafif ta' rsync — l-ebda `npm pack`, l-ebda `npm i -g`:

- [ ] Uża l-ħila ta' deploy li taqbel mal-mira:
  - `/deploy-vps-local-cc` — VPS lokali (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS ta' Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — it-tnejn
- [ ] Qabel id-deploy, ikkonferma `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Il-build irid isir fejn `node_modules` huwa reali (main checkout jew worktree b'`npm ci` — MHUX worktree b'symlink)
- [ ] Smoke test tal-istanza deployata:
  - Iftaħ `/dashboard/health` → iċċekkja li l-verżjoni taqbel mar-rilaxx
  - Mexxi talba `/v1/chat/completions` kontra provider magħruf
  - Ivverifika li `/api/monitoring/health` jirritorna circuit breakers `CLOSED`
  - Ikkonferma li t-trasporti MCP jirrispondu (`/mcp` HTTP, `/mcp-sse` SSE)

### Wara r-Rilaxx

- [ ] Mexxi `/capture-release-evidences-cc` (ħila ta' Claude Code)
  - Jaqbad screenshots/recordings WebP tal-karatteristiċi ġodda
  - Iwaħħalhom man-noti tar-rilaxx / post tal-blog
- [ ] Aġġorna GitHub Discussions / Discord bl-avviż tar-rilaxx
- [ ] Iftaħ il-milestone għall-verżjoni li jmiss
- [ ] Jekk kritiku: pinnja d-diskussjoni jew poġġi f'`news.json` għal banner fl-app

### Gate tat-tnedija pubblika tar-Radar

L-avviż tar-Radar huwa intenzjonalment impenjat b'`active: false`. L-attivazzjoni hija bidla
separata wara li kull oġġett hawn taħt ikun evidenzjat:

- [ ] Il-PRs kollha tar-Radar f'munzell huma mmerġjati u l-CI tal-ponta tar-rilaxx hija ħadra
- [ ] Deploy u smoke tar-rotot OSS tar-Radar b'`RADAR_ENABLED` għadu mitfi b'mod awtomatiku
- [ ] Smoke `GET /planos`, `/termos`, `/privacidade`, u `/reembolso` fuq il-host tar-Radar imsemmi
- [ ] Irreġistra l-identità/kuntatt/indirizz tal-operatur u reviżjoni legali approvata mis-sid fis-servizz privat
- [ ] Eżerċita Stripe Checkout u l-webhook iffirmat biss fil-modalità ta' test
- [ ] Eżerċita kunsinna waħda kriptata ta' email transazzjonali mal-mittent/dominju approvat
- [ ] Ipprova r-restawr tal-backup u ġirja waħda ta' riċerka ssorveljata u b'baġit limitat
- [ ] Approva l-politika ta' reviżjoni BRL/PIX qabel ma taċċetta evidenza ta' donazzjoni
- [ ] Ippermetti Checkout pubbliku biss wara l-gradi preċedenti, imbagħad attiva l-ID ġdida ta' `news.json`
- [ ] Ivverifika li l-banner tal-Home juża kopja lokalizzata u ID ġdid jerġa' jidher wara li ID anzjan jiġi skartat

## Servizzi Integrati smook (v3.8.4+)

Qabel tibgħat xi rilaxx li jinkludi bidliet fis-servizzi integrati, ivverifika:

### Boot ta' DB Ġdid (jissakkar it-tkaxkir tal-migrazzjoni — miżjud wara l-hotfix v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — stenna 10 sek għall-boot
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` jirritorna `"9router"` (MHUX 404, MHUX 500). Jikkonferma li l-migrazzjoni `071_services.sql` ġiet applikata + linja nnotifikata.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` jirritorna 3 linji.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` jirritorna 2 linji (jivvalida li `070_webhooks_kind_metadata.sql` ġiet applikata).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` jgħaddi — jagħmel ġlieda kontra t-tkaxkir futur.

### 9Router

- [ ] `POST /api/services/9router/install` jirritorna 200 b'`installedVersion` taħt 2 min
- [ ] `POST /api/services/9router/start` jirritorna 200 u `state: "running"` taħt 30 sek
- [ ] `GET /api/services/9router/status` jirrapporta `health: "healthy"`
- [ ] `POST /v1/chat/completions` b'`"model": "9router/auto/..."` jirritorna 200 (ruting minn tarf għal tarf permezz ta' 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` juri l-interfaċċ nattiv ta' 9Router ġewwa l-prokxi (bla iframe dirett `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` jirritorna `{ keyRotated: true }` u s-servizz jitfi u jerġa jibda b'mod ħafif
- [ ] `POST /api/services/9router/stop` jirritorna 200 u `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` jirritorna stream SSE b'evento `snapshot` li fih linji reċenti
- [ ] Installazzjoni f'ambjent mingħajr `npm` fit-Triq tirritorna 500 b'messaġġ ħelu (mhux ta' traċċa stack)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` jirritorna 200 taħt 2 min
- [ ] `POST /api/services/cliproxy/start` jirritorna 200 u `state: "running"` taħt 30 sek
- [ ] `GET /api/services/cliproxy/status` jirrapporta `health: "healthy"`
- [ ] `POST /api%/services/cliproxy/stop` jirritorna 200 u `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` jirritorna stream SSE

### Rigressjoni tas-Sigurtà

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` jirritorna `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` jirritorna `403 LOCAL_ONLY`
- [ ] Risposti ta' żbalijiet minn `/api/services/*` m'għandhomx fihom `err.stack` jew ittriq ta' fajls assoluti

## Verifiki v3.8.0+

Qabel tibgħat xi rilaxx v3.8.x, ivverifika l-oġġetti addizzjonali li ġejjin:

- [ ] `omniroute --tray` jitfi fuq macOS (systray2 installat f'`~/.omniroute/runtime/`)
- [ ] `omniroute --tray` jitfi fuq Linux (jeħtieġ DISPLAY; żball ħafif jekk mhuwiex impost)
- [ ] `omniroute --tray` jitfi fuq Windows (PowerShell NotifyIcon, ebda binarji żejda)
- [ ] `omniroute config tray enable` joħloq dħul għat-tifi awtomatiku; disable neħħih
- [ ] `npm install -g omniroute@<din-il-verżjoni>` jgħaddi postinstall bla mtela fataali
- [ ] It-triq ta' aġġornament iżżomm id-deps fakultattivi: `omniroute update --apply` u l-aġġornatur awtomatiku
      jwettaq `npm install -g … --include=optional` sabiex `optionalDependencies` (better-sqlite3,
      keytar, tls-client, u l-API tal-llmlingua SLM: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) jżommuhomhom waqt aġġornament. It-tier SLM "ultra `modelPath`" jeħtieġ ukoll il-mudell
      tinybert, li jitniżżel awtomatikament f'`${DATA_DIR}/models/llmlingua` fl-użu l-ewwel. Postinstall
      (`scripts/build/colocateOptionals.mjs`) mbagħad joqroq l-klawżola fakultattiva SLM f'
      `dist/node_modules` sabiex il-ħaddiem jirżolvi ISTESS instanza `@huggingface/transformers` ^4.2.0
      — it-traccji stand-alone jinkludu biss transformers, mhux l-għażliet b'mod dinamiku importat,
      għalhekk mingħajr dan il-ħaddiem jkun qed jitfa' llmlingua-2 mal-transformers tal-għerq
      u t-tier SLM ikun qed ifalli b'sikrit lejn il-fażi ta' fejqan.
- [ ] `omniroute status` jaħdem bla `.env` (token CLI, biss loopback)
- [ ] `curl http://localhost:20128/api/shutdown` jirritorna 401 (rotta protetta dejjem)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` jirritorna 401 (gwardja loopback)
- [ ] Il-lok ħarir ta' SQLite jirżolvi għal `running` fl-ewwel darba (binarju mżomm valida għall-pjan)
- [ ] Il-lok ħarir ta' SQLite jirrikorri għal `runtime` meta `node_modules/better-sqlite3` jitneħħa
- [ ] Filtru intelliġenti MCP jimmarka l-output veru ta' `playwright-mcp browser_snapshot` (tnaqqis ≥50%)
- [ ] L-10 fajls `skills/omniroute*/SKILL.md` kollha jistgħu jitnġabru b'mod pubbliku permezz tal-URL bruta ta' GitHub
- [ ] Wizard ta' l-onboarding juri t-turija "Kif Taħdem" ta' l-iskala waqt twaqqif ġdid
- [ ] Widget ta' l-għotjien tal-iskala fuq il-pagna d-dar juri l-kontijiet ffukati/mibdula

## Rollback

Jekk ir-rilaxx għandu problema kritika:

1. `gh release edit vX.Y.Z --prerelease` (jimmarkah bħala mhux l-aħħar)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (biss jekk għadu mhux adottat mill-utenti)
3. Jew: hotfix fuq `release/vX.Y.0` → rilaxx ta' garża `vX.Y.(Z+1)`
4. Ikkomunika f'GitHub Discussions u Discord minnufih

## Regoli Stretti

- Qatt tikkommetti direttament fuq `main`
- Qatt tuża `git push --force` fuq `main` jew fergħat `release/*`
- Qatt taqbeż il-hooks ta' Husky (`--no-verify`)
- Qatt tikkommetti sigrieti, kredenzjali, jew fajls `.env`
- Il-kopertura trid tibqa' ≥60/60/60/60 (dikjarazzjonijiet/linji/funzjonijiet/fergħat)
- Dejjem inkludi jew aġġorna t-testijiet meta tbiddel il-kodiċi tal-produzzjoni f'`src/`, `open-sse/`, `electron/`, jew `bin/`

## Kontroll ta' Sinkronizzazzjoni Awtomatiku

Mexxi l-guard tas-sinkronizzazzjoni tad-dokumentazzjoni lokalment qabel tiftaħ PR:

```bash
npm run check:docs-sync
```

CI wkoll imexxi dan il-kontroll f'`.github/workflows/ci.yml` (xogħol tal-lint).
