# Release Checklist (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **शेवटचे अद्यतन:** 2026-08-28 — v3.8.51
> स्वयंचलनासाठी Claude Code कौशल्यांचा वापर करणारी सुव्यवस्थित प्रकाशन प्रक्रिया.
>
> **प्रकाशनांदरम्यान रांग/शाखा हिरवी ठेवा:** [RELEASE_GREEN.md](./RELEASE_GREEN.md) पहा
> (`/green-prs` समूह + `npm run check:release-green` + `/babysit` + रात्रकालीन प्रक्रिया). हे वेळोवेळी —
> आणि विशेषतः या तपासणीसूचीच्या **आधी** — चालवल्याने प्रकाशन PR सुरुवातीपासून हिरवा राहतो.

## थोडक्यात

```bash
# 1. आवृत्ती वाढवा + CHANGELOG तयार करा (कौशल्य)
/version-bump-cc patch    # किंवा minor/major

# 2. स्थानिक पातळीवर गुणवत्ता तपासणी चालवा
npm run check              # lint + चाचण्या
npm run test:coverage      # संपूर्ण कव्हरेज तपासणी (60/60/60/60)

# 3. बिल्ड आणि प्राथमिक चाचणी
npm run build
npm run test:e2e           # ऐच्छिक, परंतु शिफारस केलेले

# 4. प्रकाशन तयार करा (कौशल्य)
/generate-release-cc

# 5. उपयोजन करा (कौशल्य)
/deploy-vps-both-cc        # किंवा akamai-cc / local-cc

# 6. प्रकाशनाचे पुरावे नोंदवा (कौशल्य)
/capture-release-evidences-cc
```

## npm विश्वसनीय प्रकाशन (v3.8.51 पासून डीफॉल्ट) — विनंतीनुसार टप्प्याटप्प्याने, पर्याय म्हणून थेट

`npm-publish.yml` डीफॉल्टनुसार **npm Trusted Publishing (OIDC)** द्वारे प्रकाशित करते:
`stage-npm` जॉब (github-hosted) त्या रनसाठी GitHub चा id-token अल्पकालीन npm
क्रेडेन्शियलशी अदलाबदल करतो — रिपॉझिटरी सीक्रेट्समध्ये दीर्घकालीन npm टोकन नाही, 2FA प्रॉम्प्ट नाही आणि provenance जोडलेले असते.
2FA वगळणारी टोकन्स निवृत्त केली जात असल्यामुळे npm आता मान्यता देत असलेला हा बायपास आहे;
तो WS1.3 ची हमी कायम ठेवून प्रकल्पात v3.8.48 पर्यंत असलेली पूर्णपणे स्वयंचलित प्रक्रिया
पुन्हा उपलब्ध करतो (लीक झालेले टोकन एकट्याने प्रकाशित करू शकत नाही — कारण कोणतेही टोकनच नाही).

**एकदाच करायची संरचना (मालक):** npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none). हे अस्तित्वात येईपर्यंत स्वयंचलित पायरी `ENEEDAUTH` सह अयशस्वी होते:
`publish_mode=staged` (खाली) किंवा `direct` वापरून पुन्हा डिस्पॅच करा.

### टप्प्याटप्प्याने प्रकाशन (विनंतीनुसार — `publish_mode=staged`)

npm-publish वर्कफ्लो आता थेट प्रकाशित करत नाही: तो पॅक केलेला tarball
(`check:pack-boot`) बूट करतो आणि नंतर `npm stage publish` चालवतो — नेमके तेच बाइट्स
रजिस्ट्रीवर ठेवले जातात, परंतु मालक मंजुरी देईपर्यंत ते **इन्स्टॉल करता येत नाहीत**. मानवी 2FA तपासणी
पुराव्याच्या आधी नव्हे, तर त्यानंतर हलवली आहे.

**वर्कफ्लो हिरवा झाल्यानंतर मालकाची प्रक्रिया:**

1. `npm stage list omniroute` — stage id शोधा (तो वर्कफ्लो सारांशातही दाखवला जातो).
2. टप्प्यात ठेवलेल्या बाइट्सची पडताळणी करा (शिफारस केलेले): `npm stage download <id>`, त्यानंतर डाउनलोड केलेला
   tarball तात्पुरत्या prefix मध्ये इन्स्टॉल करून बूट करा (`npm run check:pack-boot` CI मध्ये
   त्याच pack→install→boot निकालाचे स्वयंचलन करते).
3. `npm stage approve <id>` — 2FA प्रॉम्प्ट म्हणजेच प्रकाशन. `npm stage reject <id>` ते काढून टाकते.
4. प्रकाशनानंतरचे सुरक्षा-जाळे: प्रकाशनानंतरचा पडताळक (v3.8.49 योजनेतील WS1.4)
   सार्वजनिक रजिस्ट्रीमधून प्रकाशित आवृत्ती स्वच्छ कंटेनरमध्ये इन्स्टॉल करून बूट करतो.

**आपत्कालीन पर्याय:** `publish_mode=direct` सह `workflow_dispatch` वापरल्यास जुनी
तात्काळ `npm publish` प्रक्रिया पुनर्स्थापित होते (staging मध्येच बिघाड झाल्यासच वापरा; कारण नोंदवा).

**एकदाच करायचे मजबुतीकरण (मालक, npmjs.com):** `omniroute` साठी Trusted Publisher
फक्त-stage मोडमध्ये संरचित करा, जेणेकरून लीक झालेले दीर्घकालीन टोकन कुठूनही थेट `npm publish`
करू शकणार नाही — CI केवळ stage करू शकते; फक्त मालकाचे 2FA प्रकाशन करू शकते.

**दोषपूर्ण आर्टिफॅक्टसाठी कार्यपद्धती (अपरिवर्तित):** डीफॉल्ट तात्काळ कृती म्हणून `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
वापरा (काही मिनिटांत, पूर्ववत करता येण्यासारखे); `npm unpublish` फक्त 72h/no-dependents
मर्यादेत वापरा आणि पहिली कृती म्हणून कधीही वापरू नका. Docker: आवृत्ती टॅग कधीही पुन्हा लिहू नका — rollback म्हणजे
`latest` ला शेवटच्या चांगल्या digest कडे पुन्हा निर्देशित करणे.

**Docker Hub `latest` (प्रत्येक स्थिर SemVer प्रकाशनासाठी आवश्यक):**
`docker-publish` वर्कफ्लोने **दोन्ही** `X.Y.Z` आणि,
`should-promote-latest.sh` हीच सर्वात उच्च स्थिर SemVer असल्याचे मान्य करत असल्यास, `:latest`
यांना **समान digest** सह टॅग करणे आवश्यक आहे. जॉबनंतर: Hub वरील `latest` digest नवीन
SemVer digest इतकाच असावा आणि `last_updated` पुढे सरकलेले असावे. प्रकाशन नोंदींमध्ये फक्त git वर
अस्तित्वात असलेल्या दुरुस्त्यांचा उल्लेख असताना `:latest` ला जुन्या बिल्डवर ठेवू नका. Compose
quickstarts `:latest` वापरतात; GitOps ने `X.Y.Z` ला पिन करणे सुरू ठेवावे.
[Docker प्रकाशन चॅनेल्स](../guides/DOCKER_GUIDE.md#release-channels) आणि #10317 पहा.

## हॉटफिक्स फास्ट-लेन (`hotfix` लेबल)

`hotfix` लेबल असलेला PR जड CI मॅट्रिक्स (9-shard E2E, coverage ratchet,
quality-gate, quality-extended) वगळतो आणि जलद, उच्च-संकेत देणारे गेट्स कायम ठेवतो: build,
unit shards, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
आणि tarball boot-smoke (`check:pack-boot`). लक्ष्य: ~33min ऐवजी ≤15min मध्ये हिरवा निकाल.

**प्रवेश धोरण — चारही अटी आवश्यक (Chromium/VS Code/Node आपत्कालीन लेन्सवर आधारित):**

1. **तीव्रता**: उत्पादन प्रणाली बंद पडली आहे — प्रकाशित artifact सुरू होताना क्रॅश होते / एखादी
   सुरक्षा दुरुस्ती / रिलीजचा प्रत्येक वापरकर्ता प्रभावित झाला आहे. "महत्त्वाचे" म्हणजे "बंद पडलेले" नव्हे.
2. **अधिकार**: फक्त repository मालकच `hotfix` लेबल लावतो. ते लेबल म्हणजेच
   मंजुरी — campaign PR वर ते स्वतःहून कधीही वापरू नका.
3. **पुरावा**: PR body मध्ये मागील पूर्णपणे हिरव्या heavy run ची लिंक (वगळलेले jobs ज्या suite चे
   पुन्हा प्रमाणीकरण केले असते) आणि दुरुस्तीची स्वतःची आधी अपयशी व नंतर यशस्वी झालेली test दिली आहे.
4. **व्याप्ती**: फक्त cherry-pick — किमान आवश्यक दुरुस्ती, कोणतेही refactors नाहीत, असंबंधित बदल नाहीत.

वगळलेल्या coverage/ratchet पृष्ठभागाचे पुढील पूर्ण run द्वारे
release branch वर पुन्हा प्रमाणीकरण केले जाते (सतत release-green) — ही lane फक्त प्रतीक्षा वगळते, प्रमाणीकरण कधीही नाही.
केवळ tests मधील diffs (`tests/` अंतर्गत सर्व files, `tests/e2e/` अंतर्गत एकही नाही) कोणत्याही
लेबलशिवाय E2E मॅट्रिक्स आपोआप वगळतात.

## तपशीलवार तपासणीसूची

### रिलीजपूर्व

- [ ] या रिलीजसाठी लक्ष्यित सर्व PRs `release/vX.Y.0` मध्ये merge झाले आहेत
- [ ] या आवृत्तीसाठी सर्व खुले Linear/issue items बंद केले आहेत किंवा पुढील milestone वर हलवले आहेत
- [ ] `release/vX.Y.0` branch वरील CI हिरवा आहे
- [ ] कोडमध्ये `TODO(release)` markers नाहीत: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker base image अद्ययावत आहे (सध्या `node:24.15.0-trixie-slim`)

### आवृत्ती आणि बदलनोंद

- [ ] `/version-bump-cc <patch|minor|major>` चालवा (Claude Code skill)
  - `package.json`, `electron/package.json` ची आवृत्ती वाढवते
  - मागील tag पासूनच्या git commits वरून `CHANGELOG.md` पुन्हा तयार करते
  - README.md badges अद्ययावत करते
- [ ] CHANGELOG.md चे स्वतः पुनरावलोकन करा आणि आवश्यक असल्यास commit messages स्वच्छ करा
- [ ] `CHANGELOG.md` मधील नवीनतम semver विभाग `package.json` आवृत्तीशी जुळतो याची खात्री करा
- [ ] आगामी कामासाठी `## [Unreleased]` हा बदलनोंदीतील पहिला विभाग म्हणून ठेवा
- [ ] `docs/openapi.yaml` अद्ययावत करा → `info.version` हे `package.json` आवृत्तीशी जुळले पाहिजे

### कोड गुणवत्ता

- [ ] `npm run lint` — 0 errors (warnings आधीपासून अस्तित्वात आहेत)
- [ ] `npm run typecheck:core` — स्वच्छ
- [ ] `npm run typecheck:noimplicit:core` — स्वच्छ (strict)
- [ ] `npm run check:cycles` — कोणतीही circular deps नाहीत
- [ ] `npm run check:any-budget:t11` — budget च्या मर्यादेत
- [ ] `npm run check:route-validation:t06` — स्वच्छ
- [ ] `npm run check:node-runtime` — समर्थित runtime ची किमान मर्यादा पूर्ण (`>=22.22.2 <23`, `>=24.0.0 <27`, `src/shared/utils/nodeRuntimeSupport.ts` मधील `SUPPORTED_NODE_RANGE` नुसार; `package.json` मधील `engines` शी संरेखित)

### चाचणी

- [ ] `npm run test:unit` — यशस्वी
- [ ] `npm run test:vitest` — यशस्वी (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — 60/60/60/60 gate पूर्ण (statements/lines/functions/branches)
- [ ] `npm run test:integration` — यशस्वी (बदल DB / handlers शी संबंधित असल्यास)
- [ ] `npm run test:combo:matrix` — यशस्वी (combo strategy matrix: सर्व 19 public routing strategies चे selection decisions निर्धारक पद्धतीने सिद्ध करते; combo routing, strategy resolution किंवा fallback logic मध्ये बदल करताना चालवा)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **ऐच्छिक/मॅन्युअल** (gate केलेली real-upstream smoke test; VPS `root@192.168.0.15` वरून read-only DB snapshot घेते; वास्तविक providers वापरते, credits खर्च करते; CI मध्ये कधीही चालत नाही; gate नसल्यास व्यवस्थितपणे वगळली जाते)
- [ ] `npm run test:combo:live:vps` — **ऐच्छिक/मॅन्युअल** (Phase-3 VPS live smoke: साध्या Node ESM द्वारे live `.15` server विरुद्ध 7 HTTP scenarios; `ssh root@192.168.0.15` आवश्यक; फक्त `__live_test__*` combos तयार करते/हटवते; वास्तविक providers वापरते; CI मध्ये कधीही चालत नाही)
- [ ] `npm run test:e2e` — यशस्वी (UI बदल)
- [ ] `npm run test:protocols:e2e` — यशस्वी (MCP/A2A बदल)
- [ ] `npm run test:ecosystem` — यशस्वी

### Hooks (Husky द्वारे प्रमाणित)

Husky hooks `.husky/` मध्ये आहेत आणि git operations दरम्यान आपोआप चालतात.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** जलद निर्धारक gates — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (2026-06-13 रोजी सक्रिय केले). `test:unit` हेतुपुरस्सर वगळले आहे (मंद; CI मधील `test-unit` job द्वारे समाविष्ट).
  - release branches push करण्यापूर्वी `npm run test:unit` स्वतः चालवा.

एखादा hook अपयशी झाल्यास: मूळ समस्या दुरुस्त करा, `--no-verify` वापरून त्याला वगळू नका.

### पारंपरिक Commits

रिलीजमध्ये जाणारे सर्व commits `type(scope): subject` स्वरूपाचे असले पाहिजेत.

**वैध types:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**वैध scopes:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Breaking changes: `BREAKING CHANGE:` footer किंवा scope नंतर `!` जोडा (उदा. `feat(api)!: drop /v0`).

### दस्तऐवजीकरण

- [ ] `npm run check:docs-sync` यशस्वी होते (pre-commit द्वारे आपोआप चालवले जाते)
- [ ] `npm run check:docs-all` यशस्वी होते (सर्वसमावेशक: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` 0 सह समाप्त होते — कोड ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` पर्यावरण करार अबाधित आहे
- [ ] `npm run check:doc-links` 0 सह समाप्त होते — पुनर्रचनेनंतर कोणतेही अंतर्गत markdown संदर्भ तुटलेले नाहीत
- [ ] स्टोरेज/रनटाइममधील तफावतींसाठी `docs/architecture/ARCHITECTURE.md` चे पुनरावलोकन केले
- [ ] पर्यावरण चल आणि कार्यान्वयनातील तफावतींसाठी `docs/guides/TROUBLESHOOTING.md` चे पुनरावलोकन केले
- [ ] `.env.example` बदलले असल्यास: `docs/reference/ENVIRONMENT.md` अद्ययावत केले
- [ ] नवीन वैशिष्ट्याला UI असल्यास: `docs/guides/USER_GUIDE.md` मध्ये त्याचा उल्लेख आहे
- [ ] नवीन वैशिष्ट्याला API असल्यास: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` अद्ययावत केले
- [ ] नवीन वैशिष्ट्य मॉड्यूल असल्यास: स्वतंत्र `docs/<MODULE>.md` अस्तित्वात आहे
- [ ] बदल सुसंगतता भंग करणारा असल्यास: `docs/guides/TROUBLESHOOTING.md` मध्ये स्थलांतराची नोंद आहे

### i18n

- [ ] `npm run i18n:check` 0 सह समाप्त होते — भाषांतर स्थिती (`.i18n-state.json`) स्रोत दस्तऐवजांशी समक्रमित आहे (कठोर मोडमध्ये तफावत असलेले स्रोत नाहीत; शेवटच्या क्षणी दस्तऐवजांमध्ये केलेल्या किरकोळ सुधारणांसाठी इशारा मोडमधील सूचना स्वीकार्य आहे, परंतु टॅग करण्यापूर्वी मूल्य 0 असावे)
- [ ] `npm run i18n:check-ui-coverage` 0 सह समाप्त होते — प्रत्येक UI लोकेलची व्याप्ती किमान 80% मर्यादेइतकी किंवा त्यापेक्षा अधिक आहे
- [ ] `npm run i18n:sync-ui:dry` सर्व 42 लोकेलमध्ये 0 गहाळ की नोंदवते
- [ ] स्रोत इंग्रजी दस्तऐवज बदलले असल्यास, टॅग करण्यापूर्वी `npm run i18n:run` चालवा (`.env` मध्ये `OMNIROUTE_TRANSLATION_API_KEY` आवश्यक आहे)
- [ ] भाषांतरातील योगदान किरकोळ असल्यास पुढील प्रकाशनापर्यंत पुढे ढकलता येते (CHANGELOG मध्ये नोंद ठेवा)

### डेटाबेस स्थलांतरे

- [ ] `src/lib/db/migrations/` मध्ये नवीन फाइल्स असल्यास:
  - [ ] प्रत्येक स्थलांतर आयडेम्पोटंट आहे (`CREATE TABLE IF NOT EXISTS`, इत्यादी)
  - [ ] स्थलांतरे व्यवहारांमध्ये गुंडाळलेली आहेत
  - [ ] योग्य क्रमांक दिलेले आहेत (क्रमात कोणतीही पोकळी नाही)
- [ ] नवीन स्थापनेवर चाचणी करा: `~/.omniroute/omniroute.db` हटवा आणि `npm run dev` चालवा
- [ ] विद्यमान स्थापनेवर चाचणी करा: DB चा बॅकअप घ्या, स्थलांतर चालवा आणि स्कीमा सत्यापित करा
- [ ] स्थलांतराने तक्ते पुन्हा लिहिल्यास WAL फाइल्स (`-wal`, `-shm`) योग्यरीत्या हाताळल्या आहेत

### प्रदाता कॅटलॉग (Zod-द्वारे सत्यापित)

- [ ] लोड होताना `src/shared/constants/providers.ts` मधील Zod स्कीमा वैध आहे
  - [ ] सर्व प्रदात्यांकडे आवश्यक फील्ड आहेत (`id`, `label`, `kind`, इत्यादी)
  - [ ] नवीन मोफत प्रदात्यांसाठी `freeNote` दिले आहे
  - [ ] OAuth प्रदात्यांचे `oauthConfig`, `src/lib/oauth/constants/oauth.ts` मध्ये नोंदणीकृत आहे
- [ ] नवीन प्रदाता जोडल्यास: `open-sse/executors/` मध्ये संबंधित एक्झिक्युटर आहे
- [ ] स्वरूप OpenAI नसल्यास: `open-sse/translator/` मध्ये भाषांतरक आहे
- [ ] मॉडेल्स `open-sse/config/providerRegistry.ts` मध्ये नोंदणीकृत आहेत
- [ ] `tests/unit/` मधील युनिट चाचण्या प्रदाता वर्गीकरण आणि राउटिंग व्यापतात

### डेस्कटॉप (Electron)

`electron/` बदलले असल्यास:

- [ ] `npm run electron:smoke:packaged` यशस्वी होते
- [ ] `:win`, `:mac`, `:linux` यांपैकी किमान एकासाठी बिल्डची चाचणी केली
- [ ] कोड साइनिंग प्रमाणपत्रांची मुदत संपलेली नाही (साइनिंग करत असल्यास)
- [ ] `electron/package.json` मधील आवृत्ती रूट `package.json` शी जुळते
- [ ] `stable` वर प्रकाशित करत असल्यास स्वयं-अद्यतन चॅनेल पॉइंटर अद्ययावत केला

### बिल्ड मांडणी

रेपॉझिटरी तीन स्वतंत्र आउटपुट डिरेक्टरी वापरते — त्यांची कधीही गल्लत करू नका:

| डिरेक्टरी | उद्देश                                                            | ट्रॅक केली आहे?   |
| --------- | ----------------------------------------------------------------- | ----------------- |
| `src/`    | अनुप्रयोग स्रोत (TypeScript / TSX)                                | होय               |
| `.build/` | बिल्ड मध्यवर्ती फाइल्स — `next build` आउटपुट (`distDir`)          | नाही (gitignored) |
| `dist/`   | वितरित करण्यायोग्य npm बंडल — `assembleStandalone` द्वारे एकत्रित | नाही (gitignored) |

> **ऑपरेटर नोंद:** रिमोट VPS इमेज डिरेक्टरी `/usr/lib/node_modules/omniroute/app/` हीच राहते.
> फक्त **रेपॉझिटरीमधील** बिल्ड आउटपुट बदलले (`app/` → `dist/`). उपयोजन कौशल्ये
> `dist/` मधील सामग्री रिमोट `app/` डिरेक्टरीमध्ये rsync करतात — VPS पाथमध्ये कोणतेही बदल आवश्यक नाहीत.

**एकल-बिल्ड प्रवाह:**

```
npm run build:release
  └─ rm -rf .build dist          (स्वच्छता)
  └─ next build → .build/next/   (मध्यवर्ती फाइल्स)
  └─ assembleStandalone          (standalone + static + public + natives यांची प्रत dist/ मध्ये बनवते)
  └─ writes dist/BUILD_SHA       (HEAD प्रहरी)
```

उपयोजनासाठी `npm run build` चालवल्यानंतर स्वतंत्रपणे `npm run build:cli` चालवू नका — त्याऐवजी
`npm run build:release` वापरा, जे एका कमांडमध्ये स्वच्छ पुनर्बिल्ड + प्रहरी तयार करते.

### आर्टिफॅक्ट सत्यापन

- [ ] `npm run build:release` यशस्वी होते आणि `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` स्वच्छ — `app.__qa_backup`, `scripts/scratch`, `package-lock.json` किंवा इतर स्थानिक अवशेष नाहीत
- [ ] बिल्डनंतर `dist/server.js` अस्तित्वात आहे

### टॅगिंग आणि प्रकाशन

- [ ] `/generate-release-cc` (Claude Code कौशल्य) चालवा:
  - `vX.Y.Z` टॅग तयार करते
  - टॅग आणि शाखा पुश करते
  - बदलनोंद मजकुरासह GitHub Release उघडते
  - Electron इंस्टॉलर जोडते (बिल्ड केले असल्यास)
- [ ] किंवा व्यक्तिचलितपणे:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### उपयोजन

उपयोजन कौशल्ये हलका rsync प्रवाह वापरतात — `npm pack` नाही, `npm i -g` नाही:

- [ ] लक्ष्याशी जुळणारे उपयोजन कौशल्य वापरा:
  - `/deploy-vps-local-cc` — स्थानिक VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — दोन्ही
- [ ] उपयोजनापूर्वी `dist/BUILD_SHA` == `git rev-parse --short HEAD` याची खात्री करा
- [ ] बिल्ड अशा ठिकाणी चालणे आवश्यक आहे जिथे `node_modules` प्रत्यक्ष आहे (मुख्य चेकआउट किंवा `npm ci` चालवलेले worktree — सिमलिंक केलेले worktree नाही)
- [ ] उपयोजित इन्स्टन्सची स्मोक चाचणी करा:
  - `/dashboard/health` उघडा → आवृत्ती स्ट्रिंग प्रकाशनाशी जुळते हे तपासा
  - ज्ञात प्रदात्याविरुद्ध `/v1/chat/completions` विनंती चालवा
  - `/api/monitoring/health` हे `CLOSED` सर्किट ब्रेकर्स परत करते याची खात्री करा
  - MCP ट्रान्सपोर्ट्स प्रतिसाद देतात याची खात्री करा (`/mcp` HTTP, `/mcp-sse` SSE)

### प्रकाशनानंतर

- [ ] `/capture-release-evidences-cc` चालवा (Claude Code कौशल्य)
  - नवीन वैशिष्ट्यांचे WebP स्क्रीनशॉट/रेकॉर्डिंग्ज कॅप्चर करते
  - रिलीझ नोट्स / ब्लॉग पोस्टला संलग्न करते
- [ ] रिलीझ घोषणेसह GitHub Discussions / Discord अद्ययावत करा
- [ ] पुढील आवृत्तीसाठी माइलस्टोन उघडा
- [ ] गंभीर असल्यास: चर्चेला पिन करा किंवा अॅपमधील बॅनरसाठी `news.json` मध्ये पोस्ट करा

### Radar सार्वजनिक-लाँच गेट

Radar घोषणा हेतुपुरस्सर `active: false` सह कमिट केली आहे. खालील प्रत्येक बाबीचा पुरावा मिळाल्यानंतरच अॅक्टिव्हेशन हा स्वतंत्र
बदल असेल:

- [ ] सर्व स्टॅक केलेले Radar PRs मर्ज झाले आहेत आणि रिलीझ-टिप CI यशस्वी आहे
- [ ] `RADAR_ENABLED` डीफॉल्टनुसार अजूनही बंद ठेवून OSS Radar रूट्स डिप्लॉय करा आणि त्यांची स्मोक चाचणी करा
- [ ] नामनिर्दिष्ट Radar होस्टवर `GET /planos`, `/termos`, `/privacidade`, आणि `/reembolso` यांची स्मोक चाचणी करा
- [ ] खाजगी सेवेमध्ये ऑपरेटरची ओळख/संपर्क/पत्ता आणि मालकाने मंजूर केलेल्या कायदेशीर पुनरावलोकनाची नोंद करा
- [ ] केवळ चाचणी मोडमध्ये Stripe Checkout आणि स्वाक्षरी केलेला webhook तपासा
- [ ] मंजूर प्रेषक/डोमेन वापरून एक एन्क्रिप्टेड व्यवहारविषयक ईमेल वितरण तपासा
- [ ] बॅकअप पुनर्संचयित करणे आणि देखरेखीखाली, बजेट-मर्यादित एक संशोधन रन सिद्ध करा
- [ ] देणगीचा पुरावा स्वीकारण्यापूर्वी BRL/PIX पुनरावलोकन धोरण मंजूर करा
- [ ] आधीचे गेट्स पूर्ण झाल्यानंतरच सार्वजनिक Checkout सक्षम करा, त्यानंतर नवीन `news.json` ID सक्रिय करा
- [ ] Home बॅनर स्थानिकीकरण केलेला मजकूर वापरतो आणि जुना ID डिसमिस केल्यानंतर नवीन ID पुन्हा दिसतो हे सत्यापित करा

## एम्बेडेड सर्व्हिसेस स्मोक चाचणी (v3.8.4+)

एम्बेडेड सर्व्हिसेसमधील बदल समाविष्ट असलेले कोणतेही रिलीज वितरित करण्यापूर्वी, हे सत्यापित करा:

### नवीन-DB बूट (मायग्रेशन टक्कर शोधते — v3.8.4 हॉटफिक्सनंतर जोडले)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — बूट होण्यासाठी 10 s प्रतीक्षा करा
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` ने `"9router"` परत केले पाहिजे (404 नाही, 500 नाही). मायग्रेशन `071_services.sql` लागू झाले आणि रो सीड झाली याची पुष्टी करते.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` ने 3 रो परत केल्या पाहिजेत.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` ने 2 रो परत केल्या पाहिजेत (`070_webhooks_kind_metadata.sql` लागू झाले असल्याचे सत्यापित करते).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` यशस्वी होते — भविष्यातील टक्करांपासून संरक्षण करते.

### 9Router

- [ ] `POST /api/services/9router/install` ने 2 min पेक्षा कमी वेळेत `installedVersion` सह 200 परत केले पाहिजे
- [ ] `POST /api/services/9router/start` ने 30 s पेक्षा कमी वेळेत 200 आणि `state: "running"` परत केले पाहिजे
- [ ] `GET /api/services/9router/status` ने `health: "healthy"` नोंदवले पाहिजे
- [ ] `"model": "9router/auto/..."` सह `POST /v1/chat/completions` ने 200 परत केले पाहिजे (9Router द्वारे एंड-टू-एंड रूटिंग)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` प्रॉक्सीच्या आत 9Router चा नेटिव्ह UI रेंडर करते (थेट `127.0.0.1:port` iframe नाही)
- [ ] `POST /api/services/9router/rotate-key` ने `{ keyRotated: true }` परत केले पाहिजे आणि सर्व्हिस स्वच्छपणे रीस्टार्ट झाली पाहिजे
- [ ] `POST /api/services/9router/stop` ने 200 आणि `state: "stopped"` परत केले पाहिजे
- [ ] `GET /api/services/9router/logs?tail=50` ने अलीकडील ओळी असलेल्या `snapshot` इव्हेंटसह SSE स्ट्रीम परत केला पाहिजे
- [ ] PATH मध्ये `npm` नसलेल्या वातावरणातील इंस्टॉलेशनने वापरकर्ता-स्नेही (स्टॅक ट्रेस नसलेला) त्रुटी संदेशासह 500 परत केले पाहिजे

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` ने 2 min पेक्षा कमी वेळेत 200 परत केले पाहिजे
- [ ] `POST /api/services/cliproxy/start` ने 30 s पेक्षा कमी वेळेत 200 आणि `state: "running"` परत केले पाहिजे
- [ ] `GET /api/services/cliproxy/status` ने `health: "healthy"` नोंदवले पाहिजे
- [ ] `POST /api/services/cliproxy/stop` ने 200 आणि `state: "stopped"` परत केले पाहिजे
- [ ] `GET /api/services/cliproxy/logs?tail=50` ने SSE स्ट्रीम परत केला पाहिजे

### सुरक्षा रिग्रेशन

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` ने `403 LOCAL_ONLY` परत केले पाहिजे
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` ने `403 LOCAL_ONLY` परत केले पाहिजे
- [ ] `/api/services/*` कडील त्रुटी प्रतिसादांमध्ये `err.stack` किंवा निरपेक्ष फाइल पाथ नसावेत

## v3.8.0+ तपासण्या

कोणतेही v3.8.x रिलीज वितरित करण्यापूर्वी, या अतिरिक्त बाबी सत्यापित करा:

- [ ] `omniroute --tray` macOS वर बूट होते (`~/.omniroute/runtime/` मध्ये systray2 इंस्टॉल केलेले)
- [ ] `omniroute --tray` Linux वर बूट होते (DISPLAY आवश्यक; ते सेट नसल्यास सुयोग्य त्रुटी)
- [ ] `omniroute --tray` Windows वर बूट होते (PowerShell NotifyIcon, कोणतीही अतिरिक्त बायनरी नाही)
- [ ] `omniroute config tray enable` ऑटोस्टार्ट एंट्री तयार करते; disable ती काढून टाकते
- [ ] `npm install -g omniroute@<this-version>` घातक एक्झिटशिवाय postinstall चालवते
- [ ] अपडेट पाथ पर्यायी डिपेंडन्सीज कायम ठेवतो: `omniroute update --apply` आणि ऑटो-अपडेटर
      `npm install -g … --include=optional` चालवतात, जेणेकरून `optionalDependencies` (better-sqlite3,
      keytar, tls-client आणि llmlingua SLM स्टॅक: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) अपडेटनंतरही टिकून राहतात. ultra `modelPath` SLM टियरला
      tinybert मॉडेलचीही आवश्यकता असते, जे प्रथम वापराच्या वेळी `${DATA_DIR}/models/llmlingua` येथे स्वयंचलितपणे डाउनलोड होते. त्यानंतर Postinstall
      (`scripts/build/colocateOptionals.mjs`) SLM ची पर्यायी क्लोजर `dist/node_modules` मध्ये एकत्र ठेवते,
      ज्यामुळे वर्कर `@huggingface/transformers` ^4.2.0 चे एकच इंस्टन्स रिझॉल्व्ह करतो
      — स्टँडअलोन ट्रेस केवळ transformers बंडल करतो, डायनॅमिकली इम्पोर्ट केलेले
      पर्यायी घटक नाही; त्यामुळे याशिवाय वर्कर रूटच्या transformers विरुद्ध llmlingua-2 लोड करेल
      आणि SLM टियर कोणतीही सूचना न देता fail-open होईल.
- [ ] `omniroute status` कोणत्याही `.env` शिवाय कार्य करते (CLI टोकन पाथ, केवळ लूपबॅक)
- [ ] `curl http://localhost:20128/api/shutdown` ने 401 परत केले पाहिजे (नेहमी-संरक्षित रूट)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` ने 401 परत केले पाहिजे (लूपबॅक गार्ड)
- [ ] प्रथम रनवेळी SQLite रनटाइम `bundled` म्हणून रिझॉल्व्ह होते (बंडल केलेली बायनरी प्लॅटफॉर्मसाठी वैध)
- [ ] `node_modules/better-sqlite3` हटवल्यावर SQLite रनटाइम `runtime` वर फॉलबॅक होते
- [ ] Smart MCP फिल्टर वास्तविक `playwright-mcp browser_snapshot` आउटपुट कॉम्प्रेस करते (≥50% घट)
- [ ] सर्व 10 `skills/omniroute*/SKILL.md` फाइल्स raw GitHub URL द्वारे सार्वजनिकरीत्या मिळवता येतात
- [ ] नवीन सेटअपवर ऑनबोर्डिंग विझार्ड "How It Works" टियर टूर स्टेप दाखवतो
- [ ] होम डॅशबोर्ड टियर कव्हरेज विजेट कॉन्फिगर केलेल्या/सक्रिय संख्या दाखवते

---

## रोलबॅक

रिलीजमध्ये गंभीर समस्या असल्यास:

1. `gh release edit vX.Y.Z --prerelease` (नवीनतम नसल्याचे चिन्हांकित करते)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (वापरकर्त्यांनी अद्याप स्वीकारले नसेल तरच)
3. किंवा: `release/vX.Y.0` वर हॉटफिक्स → पॅच रिलीज `vX.Y.(Z+1)`
4. GitHub Discussions आणि Discord मध्ये त्वरित कळवा

## कठोर नियम

- `main` वर कधीही थेट कमिट करू नका
- `main` किंवा `release/*` शाखांवर `git push --force` कधीही वापरू नका
- Husky हुक्स (`--no-verify`) कधीही वगळू नका
- सीक्रेट्स, क्रेडेन्शियल्स किंवा `.env` फाइल्स कधीही कमिट करू नका
- कव्हरेज ≥60/60/60/60 (स्टेटमेंट्स/लाइन्स/फंक्शन्स/ब्रँचेस) राहिले पाहिजे
- `src/`, `open-sse/`, `electron/` किंवा `bin/` मधील प्रॉडक्शन कोड बदलताना नेहमी चाचण्या समाविष्ट करा किंवा अद्ययावत करा

## स्वयंचलित सिंक तपासणी

PR उघडण्यापूर्वी docs sync guard स्थानिकरित्या चालवा:

```bash
npm run check:docs-sync
```

CI देखील ही तपासणी `.github/workflows/ci.yml` (lint जॉब) मध्ये चालवते.
