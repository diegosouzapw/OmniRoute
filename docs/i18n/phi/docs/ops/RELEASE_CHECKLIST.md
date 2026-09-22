# Release Checklist (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Huling na-update:** 2026-08-28 — v3.8.51
> Pinasimpleng daloy ng release na gumagamit ng mga skill ng Claude Code para sa automation.
>
> **Panatilihing green ang queue/branch sa pagitan ng mga release:** tingnan ang [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs` family + `npm run check:release-green` + `/babysit` + nightly). Ang pana-panahong
> pagpapatakbo nito — at lalo na **bago** ang checklist na ito — ay tumitiyak na magsisimulang green ang release PR.

## TL;DR

```bash
# 1. I-update ang bersyon + bumuo ng CHANGELOG (skill)
/version-bump-cc patch    # o minor/major

# 2. Patakbuhin ang quality gate nang lokal
npm run check              # lint + mga test
npm run test:coverage      # buong coverage gate (60/60/60/60)

# 3. Mag-build at magsagawa ng smoke test
npm run build
npm run test:e2e           # opsyonal ngunit inirerekomenda

# 4. Bumuo ng release (skill)
/generate-release-cc

# 5. Mag-deploy (skill)
/deploy-vps-both-cc        # o akamai-cc / local-cc

# 6. Kunan ang mga ebidensya ng release (skill)
/capture-release-evidences-cc
```

## npm Trusted Publishing (default mula v3.8.51) — staged kapag hiniling, direct bilang fallback

Nagpa-publish ang `npm-publish.yml` sa pamamagitan ng **npm Trusted Publishing (OIDC)** bilang default: ipinagpapalit ng
`stage-npm` job (github-hosted) ang id-token ng GitHub para sa isang panandaliang npm
credential para sa run na iyon — walang pangmatagalang npm token sa mga repository secret, walang 2FA prompt, at may kalakip na provenance.
Iyan ang bypass na pinahihintulutan ngayon ng npm habang inaalis na ang mga token na lumalaktaw sa 2FA;
ibinabalik nito ang ganap na awtomatikong daloy na mayroon ang proyekto hanggang v3.8.48 habang pinananatili ang
garantiya ng WS1.3 (hindi makakapag-publish nang mag-isa ang isang na-leak na token — walang token).

**Isahang setup (may-ari):** npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none). Hangga't wala pa iyon, mabibigo ang awtomatikong hakbang na may `ENEEDAUTH`:
muling i-dispatch gamit ang `publish_mode=staged` (sa ibaba) o `direct`.

### Staged publishing (kapag hiniling — `publish_mode=staged`)

Hindi na direktang nagpa-publish ang npm-publish workflow: ibinu-boot nito ang naka-pack na tarball
(`check:pack-boot`) at pagkatapos ay pinapatakbo ang `npm stage publish` — pansamantalang inilalagay sa
registry ang eksaktong bytes, at **hindi mai-install** hangga't hindi inaaprubahan ng may-ari. Inilipat
ang human 2FA gate sa PAGKATAPOS ng patunay, hindi bago nito.

**Daloy para sa may-ari kapag naging green na ang workflow:**

1. `npm stage list omniroute` — hanapin ang stage id (naka-print din sa buod ng workflow).
2. I-verify ang mga naka-stage na byte (inirerekomenda): `npm stage download <id>`, pagkatapos ay i-install ang
   na-download na tarball sa isang pansamantalang prefix at i-boot ito (ina-automate ng `npm run check:pack-boot`
   ang parehong pack→install→boot na hatol sa CI).
3. `npm stage approve <id>` — ang 2FA prompt MISMO ang publish. Itinatapon ito ng `npm stage reject <id>`.
4. Post-publish na safety net: ini-install ng post-publish verifier (WS1.4 ng plano para sa v3.8.49) ang
   na-publish na bersyon mula sa pampublikong registry sa isang malinis na container at ibinu-boot ito.

**Pang-emergency na fallback:** ibinabalik ng `workflow_dispatch` na may `publish_mode=direct` ang
dating agarang `npm publish` (gamitin lamang kung may problema ang staging mismo; itala kung bakit).

**Isahang pagpapatibay ng seguridad (may-ari, npmjs.com):** i-configure ang Trusted Publisher para sa
`omniroute` sa stage-only mode upang hindi makapag-`npm publish` nang direkta mula saanman ang isang
na-leak na pangmatagalang token — staging lamang ang magagawa ng CI; ang 2FA lamang ng may-ari ang makakapag-release.

**Playbook para sa sirang artifact (hindi nagbago):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
bilang default na tugon (ilang minuto, maaaring ibalik); `npm unpublish` lamang sa loob ng 72h/no-dependents
na palugit at huwag kailanman bilang unang hakbang. Docker: huwag kailanman muling magsulat ng version tag — ang rollback ay
ang muling pagturo ng `latest` sa huling maayos na digest.

**Docker Hub `latest` (kinakailangan sa bawat stable na SemVer publish):** kailangang i-tag ng
`docker-publish` workflow ang **parehong** `X.Y.Z` at, kapag
sumasang-ayon ang `should-promote-latest.sh` na ito ang pinakamataas na stable na SemVer, ang `:latest`
gamit ang **parehong digest**. Pagkatapos ng job: ang Hub `latest` digest ay katumbas ng bagong
SemVer digest at nabago ang `last_updated`. Huwag hayaang manatili ang `:latest` sa isang mas lumang
build habang tinatalakay ng release notes ang mga pag-aayos na nasa git lamang. Gumagamit ang mga
Compose quickstart ng `:latest`; dapat patuloy na i-pin ng GitOps ang `X.Y.Z`. Tingnan ang
[Mga channel ng release ng Docker](../guides/DOCKER_GUIDE.md#release-channels) at #10317.

## Mabilisang Daan para sa Hotfix (label na `hotfix`)

Nilalaktawan ng PR na may label na `hotfix` ang mabigat na CI matrix (9-shard E2E, coverage ratchet,
quality-gate, quality-extended) at pinananatili ang mabilis at matataas ang signal na mga gate: build,
mga unit shard, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
at ang tarball boot-smoke (`check:pack-boot`). Target: maging green sa loob ng ≤15min sa halip na ~33min.

**Patakaran sa pagpasok — kinakailangan ang lahat ng apat (hinango sa mga emergency lane ng Chromium/VS Code/Node):**

1. **Kalubhaan**: sira ang production — nagka-crash sa pag-boot ang isang na-publish na artifact / isang
   pag-aayos sa seguridad / apektado ang bawat user ng release. Ang "Mahalaga" ay hindi katumbas ng "sira".
2. **Awtoridad**: ang may-ari lamang ng repository ang naglalagay ng label na `hotfix`. Ang label MISMO
   ang pag-apruba — hindi ito maaaring ilagay sa sariling PR ng campaign.
3. **Ebidensya**: nagli-link ang katawan ng PR sa nakaraang ganap na green na mabigat na run (ang suite na
   muling iva-validate sana ng mga nilaktawang job) kasama ang sariling failing-then-passing test ng pag-aayos.
4. **Saklaw**: cherry-pick-only — ang pinakamaliit na pag-aayos, walang mga refactor, walang kasabay na ibang pagbabago.

Ang nilaktawang coverage/ratchet surface ay muling vina-validate ng susunod na buong run sa
release branch (tuloy-tuloy na release-green) — PAGHIHINTAY lamang ang nilalaktawan ng lane, hindi ang validation.
Awtomatikong nilalaktawan ng mga tests-only diff (lahat ng file ay nasa ilalim ng `tests/`, wala sa ilalim ng `tests/e2e/`) ang E2E
matrix, nang walang anumang label.

## Detalyadong Checklist

### Bago ang Release

- [ ] Na-merge na sa `release/vX.Y.0` ang lahat ng PR na nakalaan para sa release na ito
- [ ] Naisara na o nailipat sa susunod na milestone ang lahat ng bukas na Linear/issue item para sa bersyong ito
- [ ] Green ang CI sa branch na `release/vX.Y.0`
- [ ] Walang mga marker na `TODO(release)` sa code: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Napapanahon ang Docker base image (kasalukuyang `node:24.15.0-trixie-slim`)

### Bersyon at Changelog

- [ ] Patakbuhin ang `/version-bump-cc <patch|minor|major>` (Claude Code skill)
  - Ina-update ang bersyon sa `package.json`, `electron/package.json`
  - Muling binubuo ang `CHANGELOG.md` mula sa mga git commit simula sa huling tag
  - Ina-update ang mga badge sa README.md
- [ ] Manu-manong suriin ang CHANGELOG.md at ayusin ang mga commit message kung kinakailangan
- [ ] Tiyaking ang pinakabagong seksyon ng semver sa `CHANGELOG.md` ay katumbas ng bersyon sa `package.json`
- [ ] Panatilihin ang `## [Unreleased]` bilang unang seksyon ng changelog para sa mga paparating na gawain
- [ ] I-update ang `docs/openapi.yaml` → dapat katumbas ng bersyon sa `package.json` ang `info.version`

### Kalidad ng Code

- [ ] `npm run lint` — 0 error (umiiral na dati ang mga warning)
- [ ] `npm run typecheck:core` — malinis
- [ ] `npm run typecheck:noimplicit:core` — malinis (mahigpit)
- [ ] `npm run check:cycles` — walang circular dependency
- [ ] `npm run check:any-budget:t11` — pasok sa budget
- [ ] `npm run check:route-validation:t06` — malinis
- [ ] `npm run check:node-runtime` — natutugunan ang minimum na sinusuportahang runtime (`>=22.22.2 <23`, `>=24.0.0 <27`, ayon sa `SUPPORTED_NODE_RANGE` sa `src/shared/utils/nodeRuntimeSupport.ts`; nakaayon sa `engines` ng `package.json`)

### Pagsubok

- [ ] `npm run test:unit` — pumasa
- [ ] `npm run test:vitest` — pumasa (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — natugunan ang gate na 60/60/60/60 (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pumasa (kung naaapektuhan ng mga pagbabago ang DB / mga handler)
- [ ] `npm run test:combo:matrix` — pumasa (matrix ng combo strategy: deterministikong pinatutunayan ang mga desisyon sa pagpili ng lahat ng 19 na pampublikong routing strategy; patakbuhin kapag binabago ang combo routing, strategy resolution, o fallback logic)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **opsyonal/manwal** (real-upstream smoke na protektado ng gate; kumukuha ng read-only na DB snapshot mula sa VPS na `root@192.168.0.15`; gumagamit ng mga tunay na provider, gumagastos ng mga credit; hindi kailanman tumatakbo sa CI; maayos na nilalaktawan kapag wala ang gate)
- [ ] `npm run test:combo:live:vps` — **opsyonal/manwal** (Phase-3 VPS live smoke: 7 HTTP scenario laban sa live na `.15` server sa pamamagitan ng plain Node ESM; nangangailangan ng `ssh root@192.168.0.15`; gumagawa/nagbubura lamang ng mga combo na `__live_test__*`; gumagamit ng mga tunay na provider; hindi kailanman tumatakbo sa CI)
- [ ] `npm run test:e2e` — pumasa (mga pagbabago sa UI)
- [ ] `npm run test:protocols:e2e` — pumasa (mga pagbabago sa MCP/A2A)
- [ ] `npm run test:ecosystem` — pumasa

### Mga Hook (Na-validate ng Husky)

Matatagpuan ang mga Husky hook sa `.husky/` at awtomatikong tumatakbo sa mga git operation.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** mabilis at deterministikong mga gate — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (na-activate noong 2026-06-13). Sadyang hindi kasama ang `test:unit` (mabagal; sinasaklaw ng CI job na `test-unit`).
  - Manu-manong patakbuhin ang `npm run test:unit` bago mag-push ng mga release branch.

Kung mabigo ang isang hook: ayusin ang pinakaugat na problema, huwag itong lampasan gamit ang `--no-verify`.

### Mga Conventional Commit

Dapat sundin ng lahat ng commit na kasama sa release ang format na `type(scope): subject`.

**Mga valid na type:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Mga valid na scope:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Mga breaking change: magdagdag ng footer na `BREAKING CHANGE:` o `!` pagkatapos ng scope (hal. `feat(api)!: drop /v0`).

### Dokumentasyon

- [ ] Pumapasa ang `npm run check:docs-sync` (awtomatikong pinapatakbo ng pre-commit)
- [ ] Pumapasa ang `npm run check:docs-all` (pinagsama-sama: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] Lumalabas ang `npm run check:env-doc-sync` nang may code na 0 — buo ang kontrata ng env sa pagitan ng code ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md`
- [ ] Lumalabas ang `npm run check:doc-links` nang may code na 0 — walang sirang panloob na markdown reference pagkatapos ng muling pagsasaayos
- [ ] Nasuri ang `docs/architecture/ARCHITECTURE.md` para sa paglihis sa storage/runtime
- [ ] Nasuri ang `docs/guides/TROUBLESHOOTING.md` para sa paglihis sa env var at operasyon
- [ ] Kung nagbago ang `.env.example`: na-update ang `docs/reference/ENVIRONMENT.md`
- [ ] Kung may UI ang bagong feature: binabanggit ito ng `docs/guides/USER_GUIDE.md`
- [ ] Kung may API ang bagong feature: na-update ang `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Kung isang module ang bagong feature: may nakalaang `docs/<MODULE>.md`
- [ ] Kung may breaking change: may tala sa migration ang `docs/guides/TROUBLESHOOTING.md`

### i18n

- [ ] Lumalabas ang `npm run i18n:check` nang may code na 0 — naka-sync ang estado ng pagsasalin (`.i18n-state.json`) sa mga source doc (walang lumihis na source sa strict mode; katanggap-tanggap ang babala sa warn mode para sa mga huling-minutong pag-aayos ng doc, ngunit dapat itong maging 0 bago mag-tag)
- [ ] Lumalabas ang `npm run i18n:check-ui-coverage` nang may code na 0 — ang bawat UI locale ay nasa o lampas sa minimum na 80% coverage
- [ ] Nag-uulat ang `npm run i18n:sync-ui:dry` ng 0 nawawalang key sa lahat ng 42 locale
- [ ] Kung nagbago ang source na English na mga doc, patakbuhin ang `npm run i18n:run` (nangangailangan ng `OMNIROUTE_TRANSLATION_API_KEY` sa `.env`) bago mag-tag
- [ ] Maaaring ipagpaliban sa susunod na release ang maliliit na kontribusyon sa pagsasalin (subaybayan sa CHANGELOG)

### Mga Migration ng Database

- [ ] Kung may mga bagong file ang `src/lib/db/migrations/`:
  - [ ] Idempotent ang bawat migration (`CREATE TABLE IF NOT EXISTS`, atbp.)
  - [ ] Nakapaloob sa mga transaction ang mga migration
  - [ ] Tama ang pagkakanumero (walang puwang sa pagkakasunod-sunod)
- [ ] Subukan sa bagong install: burahin ang `~/.omniroute/omniroute.db` at patakbuhin ang `npm run dev`
- [ ] Subukan sa kasalukuyang install: i-backup ang DB, patakbuhin ang migration, at beripikahin ang schema
- [ ] Wastong napapangasiwaan ang mga WAL file (`-wal`, `-shm`) kung muling isinusulat ng migration ang mga table

### Catalog ng Provider (Bineripika ng Zod)

- [ ] Valid ang Zod schema ng `src/shared/constants/providers.ts` sa oras ng pag-load
  - [ ] May lahat ng kinakailangang field ang lahat ng provider (`id`, `label`, `kind`, atbp.)
  - [ ] May `freeNote` para sa mga bagong libreng provider
  - [ ] Nakarehistro ang `oauthConfig` ng mga OAuth provider sa `src/lib/oauth/constants/oauth.ts`
- [ ] Kung may idinagdag na bagong provider: may kaukulang executor sa `open-sse/executors/`
- [ ] Kung hindi OpenAI ang format: may translator sa `open-sse/translator/`
- [ ] Nakarehistro ang mga model sa `open-sse/config/providerRegistry.ts`
- [ ] Sinasaklaw ng mga unit test sa `tests/unit/` ang pag-uuri at routing ng provider

### Desktop (Electron)

Kung nagbago ang `electron/`:

- [ ] Pumapasa ang `npm run electron:smoke:packaged`
- [ ] Nasubukan ang mga build para sa kahit isa sa `:win`, `:mac`, `:linux`
- [ ] Hindi pa paso ang mga certificate sa pag-sign ng code (kung gumagamit ng signing)
- [ ] Tugma ang bersyon ng `electron/package.json` sa root na `package.json`
- [ ] Na-update ang pointer ng auto-update channel kung magre-release sa `stable`

### Layout ng Build

Gumagamit ang repository ng tatlong magkakaibang output directory — huwag kailanman paghalu-haluin ang mga ito:

| Directory | Layunin                                                        | Sinusubaybayan?    |
| --------- | -------------------------------------------------------------- | ------------------ |
| `src/`    | Source ng application (TypeScript / TSX)                       | Oo                 |
| `.build/` | Mga intermediate ng build — output ng `next build` (`distDir`) | Hindi (gitignored) |
| `dist/`   | Naipapamahaging npm bundle — binuo ng `assembleStandalone`     | Hindi (gitignored) |

> **Tala para sa operator:** nananatiling `/usr/lib/node_modules/omniroute/app/` ang directory ng image sa remote VPS.
> Tanging ang output ng build **sa loob ng repo** ang inilipat (`app/` → `dist/`). Ini-rsync ng mga deploy skill
> ang mga nilalaman ng `dist/` papunta sa remote na `app/` dir — walang kailangang baguhin sa path ng VPS.

**Daloy ng iisang build:**

```
npm run build:release
  └─ rm -rf .build dist          (paglilinis)
  └─ next build → .build/next/   (mga intermediate)
  └─ assembleStandalone          (kinokopya ang standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

HUWAG patakbuhin ang `npm run build` na susundan ng hiwalay na `npm run build:cli` para sa deploy — gamitin ang
`npm run build:release`, na nagsasagawa ng malinis na rebuild + sentinel sa iisang command.

### Pagpapatunay ng Artifact

- [ ] Matagumpay ang `npm run build:release` at `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Malinis ang `npm run check:pack-artifact` — walang `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, o iba pang lokal na residue
- [ ] Umiiral ang `dist/server.js` pagkatapos ng build

### Pag-tag at Release

- [ ] Patakbuhin ang `/generate-release-cc` (Claude Code skill):
  - Gumagawa ng tag na `vX.Y.Z`
  - Itinutulak ang tag at branch
  - Gumagawa ng GitHub Release na may changelog body
  - Inilalakip ang mga Electron installer (kung binuo)
- [ ] O gawin nang manu-mano:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deploy

Ginagamit ng mga deploy skill ang magaan na daloy ng rsync — walang `npm pack`, walang `npm i -g`:

- [ ] Gamitin ang deploy skill na tumutugma sa target:
  - `/deploy-vps-local-cc` — lokal na VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — pareho
- [ ] Bago mag-deploy, kumpirmahing `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Dapat tumakbo ang build kung saan tunay ang `node_modules` (pangunahing checkout o worktree na pinatakbuhan ng `npm ci` — HINDI naka-symlink na worktree)
- [ ] I-smoke test ang naka-deploy na instance:
  - Buksan ang `/dashboard/health` → tiyaking tugma sa release ang string ng bersyon
  - Magpatakbo ng `/v1/chat/completions` request laban sa isang kilalang provider
  - Beripikahing nagbabalik ang `/api/monitoring/health` ng mga circuit breaker na `CLOSED`
  - Kumpirmahing tumutugon ang mga MCP transport (`/mcp` HTTP, `/mcp-sse` SSE)

### Pagkatapos ng Release

- [ ] Patakbuhin ang `/capture-release-evidences-cc` (Claude Code skill)
  - Kumukuha ng mga WebP screenshot/recording ng mga bagong feature
  - Inilalakip ang mga ito sa mga tala sa release / post sa blog
- [ ] I-update ang GitHub Discussions / Discord gamit ang anunsyo ng release
- [ ] Magbukas ng milestone para sa susunod na bersyon
- [ ] Kung kritikal: i-pin ang talakayan o mag-post sa `news.json` para sa in-app na banner

### Gate para sa pampublikong paglulunsad ng Radar

Ang anunsyo ng Radar ay sadyang na-commit nang may `active: false`. Ang pag-activate ay isang hiwalay na
pagbabago pagkatapos mapatunayan ang bawat item sa ibaba:

- [ ] Naka-merge na ang lahat ng magkakapatong na Radar PR at berde ang release-tip CI
- [ ] I-deploy at i-smoke test ang mga OSS Radar route habang naka-off pa rin bilang default ang `RADAR_ENABLED`
- [ ] I-smoke test ang `GET /planos`, `/termos`, `/privacidade`, at `/reembolso` sa itinakdang Radar host
- [ ] Itala ang pagkakakilanlan/contact/address ng operator at ang legal na pagsusuring inaprubahan ng may-ari sa pribadong serbisyo
- [ ] Subukan ang Stripe Checkout at ang nilagdaang webhook sa test mode lamang
- [ ] Subukan ang isang naka-encrypt na pagpapadala ng transactional email gamit ang inaprubahang sender/domain
- [ ] Patunayan ang pag-restore ng backup at ang isang pinangangasiwaan at may limitasyon sa badyet na research run
- [ ] Aprubahan ang patakaran sa pagsusuri ng BRL/PIX bago tumanggap ng ebidensya ng donasyon
- [ ] I-enable ang pampublikong Checkout pagkatapos lamang ng mga naunang gate, pagkatapos ay i-activate ang bagong `news.json` ID
- [ ] Tiyaking gumagamit ang Home banner ng naka-localize na kopya at muling lumilitaw ang bagong ID pagkatapos i-dismiss ang mas lumang ID

## Smoke test ng Embedded Services (v3.8.4+)

Bago maglabas ng anumang release na may kasamang mga pagbabago sa embedded services, tiyaking:

### Pag-boot gamit ang bagong DB (nakakatukoy ng mga banggaan sa migration — idinagdag pagkatapos ng hotfix ng v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — maghintay nang 10 s para sa pag-boot
- [ ] Ang `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` ay nagbabalik ng `"9router"` (HINDI 404, HINDI 500). Kinukumpirma nitong nailapat ang migration na `071_services.sql` at na-seed ang row.
- [ ] Ang `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` ay nagbabalik ng 3 row.
- [ ] Ang `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` ay nagbabalik ng 2 row (pinatutunayang nailapat ang `070_webhooks_kind_metadata.sql`).
- [ ] Pumapasa ang `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` — nagpoprotekta laban sa mga banggaan sa hinaharap.

### 9Router

- [ ] Ang `POST /api/services/9router/install` ay nagbabalik ng 200 na may `installedVersion` sa loob ng wala pang 2 min
- [ ] Ang `POST /api/services/9router/start` ay nagbabalik ng 200 at `state: "running"` sa loob ng wala pang 30 s
- [ ] Iniuulat ng `GET /api/services/9router/status` ang `health: "healthy"`
- [ ] Ang `POST /v1/chat/completions` na may `"model": "9router/auto/..."` ay nagbabalik ng 200 (end-to-end na pag-route sa pamamagitan ng 9Router)
- [ ] Nire-render ng `GET /dashboard/providers/services/9router/embed/dashboard` ang native UI ng 9Router sa loob ng proxy (walang direktang `127.0.0.1:port` iframe)
- [ ] Ang `POST /api/services/9router/rotate-key` ay nagbabalik ng `{ keyRotated: true }` at maayos na nagre-restart ang serbisyo
- [ ] Ang `POST /api/services/9router/stop` ay nagbabalik ng 200 at `state: "stopped"`
- [ ] Ang `GET /api/services/9router/logs?tail=50` ay nagbabalik ng SSE stream na may event na `snapshot` na naglalaman ng mga kamakailang linya
- [ ] Ang pag-install sa environment na walang `npm` sa PATH ay nagbabalik ng 500 na may madaling maunawaang mensahe ng error (hindi stack trace)

### CLIProxyAPI

- [ ] Ang `POST /api/services/cliproxy/install` ay nagbabalik ng 200 sa loob ng wala pang 2 min
- [ ] Ang `POST /api/services/cliproxy/start` ay nagbabalik ng 200 at `state: "running"` sa loob ng wala pang 30 s
- [ ] Iniuulat ng `GET /api/services/cliproxy/status` ang `health: "healthy"`
- [ ] Ang `POST /api/services/cliproxy/stop` ay nagbabalik ng 200 at `state: "stopped"`
- [ ] Ang `GET /api/services/cliproxy/logs?tail=50` ay nagbabalik ng SSE stream

### Pag-urong ng seguridad

- [ ] Ang `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` ay nagbabalik ng `403 LOCAL_ONLY`
- [ ] Ang `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` ay nagbabalik ng `403 LOCAL_ONLY`
- [ ] Ang mga tugon ng error mula sa `/api/services/*` ay hindi naglalaman ng `err.stack` o mga absolute na file path

## Mga pagsusuri para sa v3.8.0+

Bago maglabas ng anumang v3.8.x release, tiyakin din ang mga sumusunod:

- [ ] Nagbo-boot ang `omniroute --tray` sa macOS (naka-install ang systray2 sa `~/.omniroute/runtime/`)
- [ ] Nagbo-boot ang `omniroute --tray` sa Linux (nangangailangan ng DISPLAY; maayos na error kung hindi ito nakatakda)
- [ ] Nagbo-boot ang `omniroute --tray` sa Windows (PowerShell NotifyIcon, walang karagdagang binary)
- [ ] Gumagawa ang `omniroute config tray enable` ng autostart entry; inaalis ito ng disable
- [ ] Pinapatakbo ng `npm install -g omniroute@<this-version>` ang postinstall nang walang fatal na pag-exit
- [ ] Pinananatili ng proseso ng pag-update ang mga opsyonal na dependency: pinapatakbo ng `omniroute update --apply` at ng auto-updater ang
      `npm install -g … --include=optional` upang manatili ang `optionalDependencies` (better-sqlite3,
      keytar, tls-client, at ang llmlingua SLM stack: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) pagkatapos ng update. Kailangan din ng ultra `modelPath` SLM tier ang
      tinybert model, na awtomatikong dina-download sa `${DATA_DIR}/models/llmlingua` sa unang paggamit. Pagkatapos, ang postinstall
      (`scripts/build/colocateOptionals.mjs`) ay magkasamang naglalagay ng opsyonal na closure ng SLM sa
      `dist/node_modules` upang mag-resolve ang worker ng IISANG instance ng `@huggingface/transformers` ^4.2.0
      — transformers lamang ang bina-bundle ng standalone trace, hindi ang mga opsyonal na dynamic na ini-import,
      kaya kung wala ito, ilo-load ng worker ang llmlingua-2 laban sa transformers ng root
      at tahimik na magfa-fail-open ang SLM tier.
- [ ] Gumagana ang `omniroute status` nang walang `.env` (CLI token path, loopback lamang)
- [ ] Ang `curl http://localhost:20128/api/shutdown` ay nagbabalik ng 401 (route na palaging protektado)
- [ ] Ang `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` ay nagbabalik ng 401 (loopback guard)
- [ ] Nagre-resolve ang SQLite runtime sa `bundled` sa unang pagpapatakbo (wasto ang bundled binary para sa platform)
- [ ] Bumabagsak pabalik ang SQLite runtime sa `runtime` kapag binura ang `node_modules/better-sqlite3`
- [ ] Kino-compress ng Smart MCP filter ang aktuwal na output ng `playwright-mcp browser_snapshot` (≥50% na pagbawas)
- [ ] Pampublikong naa-access sa pamamagitan ng raw GitHub URL ang lahat ng 10 `skills/omniroute*/SKILL.md` file
- [ ] Ipinapakita ng onboarding wizard ang hakbang sa tier tour na "Paano Ito Gumagana" sa bagong setup
- [ ] Ipinapakita ng tier coverage widget sa home dashboard ang bilang ng mga na-configure/aktibo

---

## Pag-rollback

Kung may kritikal na problema ang release:

1. `gh release edit vX.Y.Z --prerelease` (minamarkahan bilang hindi pinakabago)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (kung hindi pa ito ginagamit ng mga user)
3. O: gumawa ng hotfix sa `release/vX.Y.0` → patch release na `vX.Y.(Z+1)`
4. Magbigay agad ng abiso sa GitHub Discussions at Discord

## Mahihigpit na Panuntunan

- Huwag kailanman direktang mag-commit sa `main`
- Huwag kailanman gumamit ng `git push --force` sa `main` o sa mga branch na `release/*`
- Huwag kailanman laktawan ang mga Husky hook (`--no-verify`)
- Huwag kailanman mag-commit ng mga secret, credential, o `.env` file
- Dapat manatiling ≥60/60/60/60 ang coverage (mga statement/linya/function/branch)
- Palaging magsama o mag-update ng mga test kapag binabago ang production code sa `src/`, `open-sse/`, `electron/`, o `bin/`

## Awtomatikong Pagsusuri sa Pag-sync

Patakbuhin nang lokal ang docs sync guard bago magbukas ng PR:

```bash
npm run check:docs-sync
```

Pinapatakbo rin ng CI ang pagsusuring ito sa `.github/workflows/ci.yml` (lint job).
