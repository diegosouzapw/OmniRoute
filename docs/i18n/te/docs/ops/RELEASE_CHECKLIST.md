# Release Checklist (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **చివరిగా నవీకరించబడింది:** 2026-08-28 — v3.8.51
> ఆటోమేషన్ కోసం Claude Code నైపుణ్యాలను ఉపయోగించే క్రమబద్ధీకరించిన విడుదల ప్రక్రియ.
>
> **విడుదలల మధ్య queue/branchను greenగా ఉంచండి:** [RELEASE_GREEN.md](./RELEASE_GREEN.md) చూడండి
> (`/green-prs` కుటుంబం + `npm run check:release-green` + `/babysit` + nightly). దీన్ని
> క్రమానుగతంగా — ముఖ్యంగా ఈ checklistకు **ముందు** — అమలు చేయడం వల్ల release PR greenగా ప్రారంభమవుతుంది.

## సంక్షిప్తంగా

```bash
# 1. వెర్షన్ను పెంచి + CHANGELOGను రూపొందించండి (నైపుణ్యం)
/version-bump-cc patch    # లేదా minor/major

# 2. నాణ్యతా గేట్ను స్థానికంగా అమలు చేయండి
npm run check              # lint + పరీక్షలు
npm run test:coverage      # పూర్తి coverage గేట్ (60/60/60/60)

# 3. Build చేసి & smoke పరీక్షించండి
npm run build
npm run test:e2e           # ఐచ్ఛికం, కానీ సిఫార్సు చేయబడింది

# 4. విడుదలను రూపొందించండి (నైపుణ్యం)
/generate-release-cc

# 5. Deploy చేయండి (నైపుణ్యం)
/deploy-vps-both-cc        # లేదా akamai-cc / local-cc

# 6. విడుదల ఆధారాలను సేకరించండి (నైపుణ్యం)
/capture-release-evidences-cc
```

## npm Trusted Publishing (v3.8.51 నుండి డిఫాల్ట్) — అభ్యర్థనపై staged, fallbackగా direct

`npm-publish.yml` డిఫాల్ట్గా **npm Trusted Publishing (OIDC)** ద్వారా publish చేస్తుంది:
`stage-npm` job (github-hosted) ఆ run కోసం GitHub యొక్క id-tokenను స్వల్పకాలిక npm
credentialగా మార్పిడి చేస్తుంది — repository secretsలో దీర్ఘకాలిక npm token ఉండదు, 2FA prompt ఉండదు, provenance జోడించబడుతుంది.
2FAను దాటవేసే tokenలు విరమించబడుతున్నందున, npm ఇప్పుడు అనుమతించే bypass ఇదే;
WS1.3 హామీని కొనసాగిస్తూనే (లీకైన token ఒక్కటే publish చేయలేదు — అసలు token ఏదీ లేదు)
ఇది v3.8.48 వరకు projectలో ఉన్న పూర్తిగా automatic flowను పునరుద్ధరిస్తుంది.

**ఒక్కసారి చేయాల్సిన setup (owner):** npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: ఏదీ లేదు). అది ఏర్పాటయ్యే వరకు automatic step `ENEEDAUTH`తో విఫలమవుతుంది:
`publish_mode=staged`తో (క్రింద) లేదా `direct`తో మళ్లీ dispatch చేయండి.

### Staged publishing (అభ్యర్థనపై — `publish_mode=staged`)

npm-publish workflow ఇకపై నేరుగా publish చేయదు: అది packed tarballను boot
చేసి (`check:pack-boot`), ఆపై `npm stage publish`ను అమలు చేస్తుంది — అవే ఖచ్చితమైన bytes registryలో
నిల్వ చేయబడతాయి, owner ఆమోదించే వరకు **install చేయడం సాధ్యం కాదు**. Human 2FA gate
proofకు ముందు కాకుండా, దాని తర్వాతికి మార్చబడింది.

**Workflow green అయిన తర్వాత owner flow:**

1. `npm stage list omniroute` — stage idను కనుగొనండి (అది workflow summaryలో కూడా ముద్రించబడుతుంది).
2. Staged bytesను ధృవీకరించండి (సిఫార్సు చేయబడింది): `npm stage download <id>`, ఆపై download చేసిన
   tarballను temp prefixలో install చేసి boot చేయండి (`npm run check:pack-boot` అదే
   pack→install→boot verdictను CIలో automate చేస్తుంది).
3. `npm stage approve <id>` — 2FA prompt రావడమే publish. `npm stage reject <id>` దాన్ని తొలగిస్తుంది.
4. Post-publish భద్రతా వలయం: post-publish verifier (v3.8.49 planలోని WS1.4)
   public registry నుండి published versionను clean containerలో install చేసి boot చేస్తుంది.

**అత్యవసర fallback:** `publish_mode=direct`తో `workflow_dispatch` legacy immediate
`npm publish`ను పునరుద్ధరిస్తుంది (staging స్వయంగా తప్పుగా ప్రవర్తించినప్పుడు మాత్రమే ఉపయోగించండి; కారణాన్ని నమోదు చేయండి).

**ఒక్కసారి చేయాల్సిన hardening (owner, npmjs.com):** `omniroute` కోసం Trusted Publisherను
stage-only modeలో configure చేయండి, తద్వారా లీకైన long-lived token ఎక్కడి నుంచైనా నేరుగా `npm publish`
చేయలేదు — CI stage మాత్రమే చేయగలదు; owner యొక్క 2FA మాత్రమే విడుదల చేస్తుంది.

**Broken-artifact playbook (మార్పు లేదు):** డిఫాల్ట్ ప్రతిచర్యగా `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
ఉపయోగించండి (నిమిషాల్లో పూర్తవుతుంది, తిరిగి మార్చవచ్చు); 72h/no-dependents windowలో మాత్రమే `npm unpublish`
చేయండి, దాన్ని ఎప్పుడూ మొదటి చర్యగా చేయవద్దు. Docker: version tagను ఎప్పుడూ తిరిగి వ్రాయవద్దు — rollback అంటే
`latest`ను చివరి మంచి digestకు మళ్లీ సూచించేలా చేయడం.

**Docker Hub `latest` (ప్రతి stable SemVer publishకు తప్పనిసరి):**
`docker-publish` workflow తప్పనిసరిగా `X.Y.Z` రెండింటినీ మరియు,
`should-promote-latest.sh` ఇది అత్యధిక stable SemVer అని నిర్ధారించినప్పుడు, `:latest`ను
**అదే digest**తో tag చేయాలి. Job తర్వాత: Hub `latest` digest కొత్త
SemVer digestకు సమానంగా ఉండాలి మరియు `last_updated` మారి ఉండాలి. Release notesలో gitలో మాత్రమే ఉన్న
పరిష్కారాల గురించి పేర్కొంటున్నప్పుడు, `:latest`ను పాత buildపై ఉంచవద్దు.
Compose quickstartలు `:latest`ను ఉపయోగిస్తాయి; GitOps మాత్రం `X.Y.Z`కు pin చేస్తూనే ఉండాలి.
[Docker release channels](../guides/DOCKER_GUIDE.md#release-channels) మరియు #10317 చూడండి.

## హాట్ఫిక్స్ ఫాస్ట్-లేన్ (లేబుల్ `hotfix`)

`hotfix` లేబుల్ ఉన్న PR భారీ CI మ్యాట్రిక్స్ను (9-షార్డ్ E2E, కవరేజ్ రాచెట్,
క్వాలిటీ-గేట్, క్వాలిటీ-ఎక్స్టెండెడ్) దాటవేసి, వేగవంతమైన, అధిక-సిగ్నల్ గేట్లను కొనసాగిస్తుంది: బిల్డ్,
యూనిట్ షార్డ్లు, ఇంటిగ్రేషన్, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
మరియు టార్బాల్ బూట్-స్మోక్ (`check:pack-boot`). లక్ష్యం: ~33నిమిషాలకు బదులుగా ≤15నిమిషాల్లో గ్రీన్.

**ప్రవేశ విధానం — నాలుగూ తప్పనిసరి (Chromium/VS Code/Node అత్యవసర లేన్ల ఆధారంగా రూపొందించబడింది):**

1. **తీవ్రత**: ప్రొడక్షన్ పనిచేయడం లేదు — ప్రచురించిన ఆర్టిఫాక్ట్ బూట్ సమయంలో క్రాష్ అవుతుంది / ఒక
   భద్రతా పరిష్కారం / విడుదలలోని ప్రతి వినియోగదారు ప్రభావితమవుతున్నారు. "ముఖ్యమైనది" అంటే "పనిచేయడం లేదు" అని కాదు.
2. **అధికారం**: రిపోజిటరీ యజమాని మాత్రమే `hotfix` లేబుల్ను వర్తింపజేస్తారు. ఆ లేబులే
   ఆమోదం — క్యాంపెయిన్ PRలో ఎప్పుడూ స్వయంగా ఉపయోగించవద్దు.
3. **సాక్ష్యం**: PR బాడీ గతంలో పూర్తిగా గ్రీన్ అయిన భారీ రన్కు (దాటవేసిన జాబ్లు
   మళ్లీ ధ్రువీకరించే సూట్) అలాగే పరిష్కారానికి సంబంధించిన మొదట విఫలమై-తర్వాత పాస్ అయిన టెస్ట్కు లింక్ చేస్తుంది.
4. **పరిధి**: cherry-pick మాత్రమే — కనిష్ఠ పరిష్కారం, రీఫ్యాక్టర్లు లేవు, సంబంధంలేని మార్పులు లేవు.

దాటవేసిన కవరేజ్/రాచెట్ ఉపరితలం release బ్రాంచ్లోని తదుపరి పూర్తి రన్ ద్వారా
మళ్లీ ధ్రువీకరించబడుతుంది (నిరంతర release-green) — ఈ లేన్ నిరీక్షణను మాత్రమే దాటవేస్తుంది, ధ్రువీకరణను ఎప్పుడూ కాదు.
టెస్ట్లు-మాత్రమే ఉన్న diffలు (అన్ని ఫైళ్లు `tests/` కింద, ఏవీ `tests/e2e/` కింద ఉండవు) ఎలాంటి లేబుల్ లేకుండానే E2E
మ్యాట్రిక్స్ను స్వయంచాలకంగా దాటవేస్తాయి.

## వివరణాత్మక చెక్లిస్ట్

### విడుదలకు ముందు

- [ ] ఈ విడుదలకు లక్ష్యంగా ఉన్న అన్ని PRలు `release/vX.Y.0`లో విలీనం చేయబడ్డాయి
- [ ] ఈ వెర్షన్కు సంబంధించిన అన్ని తెరిచి ఉన్న Linear/issue అంశాలు మూసివేయబడ్డాయి లేదా తదుపరి మైలురాయికి తరలించబడ్డాయి
- [ ] `release/vX.Y.0` బ్రాంచ్లో CI గ్రీన్గా ఉంది
- [ ] కోడ్లో `TODO(release)` మార్కర్లు లేవు: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker బేస్ ఇమేజ్ తాజాగా ఉంది (ప్రస్తుతం `node:24.15.0-trixie-slim`)

### వెర్షన్ & చేంజ్లాగ్

- [ ] `/version-bump-cc <patch|minor|major>`ను అమలు చేయండి (Claude Code స్కిల్)
  - `package.json`, `electron/package.json` వెర్షన్లను పెంచుతుంది
  - చివరి ట్యాగ్ తర్వాతి git కమిట్ల నుంచి `CHANGELOG.md`ను మళ్లీ రూపొందిస్తుంది
  - README.md బ్యాడ్జ్లను నవీకరిస్తుంది
- [ ] CHANGELOG.mdను మాన్యువల్గా సమీక్షించి, అవసరమైతే కమిట్ సందేశాలను శుభ్రపరచండి
- [ ] `CHANGELOG.md`లోని తాజా semver విభాగం `package.json` వెర్షన్కు సమానంగా ఉందని నిర్ధారించండి
- [ ] రాబోయే పని కోసం `## [Unreleased]`ను మొదటి చేంజ్లాగ్ విభాగంగా ఉంచండి
- [ ] `docs/openapi.yaml`ను నవీకరించండి → `info.version` తప్పనిసరిగా `package.json` వెర్షన్కు సమానంగా ఉండాలి

### కోడ్ నాణ్యత

- [ ] `npm run lint` — 0 లోపాలు (హెచ్చరికలు ముందే ఉన్నవి)
- [ ] `npm run typecheck:core` — లోపాలు లేవు
- [ ] `npm run typecheck:noimplicit:core` — లోపాలు లేవు (కఠినమైనది)
- [ ] `npm run check:cycles` — వృత్తాకార డిపెండెన్సీలు లేవు
- [ ] `npm run check:any-budget:t11` — బడ్జెట్ పరిధిలో ఉంది
- [ ] `npm run check:route-validation:t06` — లోపాలు లేవు
- [ ] `npm run check:node-runtime` — మద్దతు ఉన్న రన్టైమ్ కనిష్ఠ పరిమితి చేరుకుంది (`>=22.22.2 <23`, `>=24.0.0 <27`, `src/shared/utils/nodeRuntimeSupport.ts`లోని `SUPPORTED_NODE_RANGE` ప్రకారం; `package.json`లోని `engines`తో సమలేఖనం చేయబడింది)

### టెస్టింగ్

- [ ] `npm run test:unit` — పాస్
- [ ] `npm run test:vitest` — పాస్ (MCP సర్వర్, autoCombo, క్యాష్)
- [ ] `npm run test:coverage` — 60/60/60/60 గేట్ సంతృప్తి చెందింది (స్టేట్మెంట్లు/లైన్లు/ఫంక్షన్లు/బ్రాంచ్లు)
- [ ] `npm run test:integration` — పాస్ (మార్పులు DB / హ్యాండ్లర్లను ప్రభావితం చేస్తే)
- [ ] `npm run test:combo:matrix` — పాస్ (కాంబో వ్యూహ మ్యాట్రిక్స్: మొత్తం 19 పబ్లిక్ రూటింగ్ వ్యూహాల ఎంపిక నిర్ణయాలను నిర్ధారితంగా రుజువు చేస్తుంది; కాంబో రూటింగ్, వ్యూహ పరిష్కారం లేదా ఫాల్బ్యాక్ లాజిక్ను మార్చేటప్పుడు అమలు చేయండి)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **ఐచ్ఛికం/మాన్యువల్** (గేట్ చేయబడిన వాస్తవ-upstream స్మోక్; VPS `root@192.168.0.15` నుంచి చదవడానికి-మాత్రమే అనుమతి ఉన్న DB స్నాప్షాట్ను సోర్స్ చేస్తుంది; వాస్తవ ప్రొవైడర్లను హిట్ చేస్తుంది, క్రెడిట్లు ఖర్చవుతాయి; CIలో ఎప్పుడూ అమలు కాదు; గేట్ లేకుంటే సమస్య లేకుండా దాటవేయబడుతుంది)
- [ ] `npm run test:combo:live:vps` — **ఐచ్ఛికం/మాన్యువల్** (Phase-3 VPS లైవ్ స్మోక్: సాధారణ Node ESM ద్వారా లైవ్ `.15` సర్వర్కు వ్యతిరేకంగా 7 HTTP సందర్భాలు; `ssh root@192.168.0.15` అవసరం; `__live_test__*` కాంబోలను మాత్రమే సృష్టిస్తుంది/తొలగిస్తుంది; వాస్తవ ప్రొవైడర్లను హిట్ చేస్తుంది; CIలో ఎప్పుడూ అమలు కాదు)
- [ ] `npm run test:e2e` — పాస్ (UI మార్పులు)
- [ ] `npm run test:protocols:e2e` — పాస్ (MCP/A2A మార్పులు)
- [ ] `npm run test:ecosystem` — పాస్

### హుక్లు (Husky ద్వారా ధ్రువీకరించబడినవి)

Husky హుక్లు `.husky/`లో ఉంటాయి మరియు git ఆపరేషన్ల సమయంలో స్వయంచాలకంగా అమలవుతాయి.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** వేగవంతమైన నిర్ధారిత గేట్లు — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (2026-06-13న సక్రియం చేయబడింది). ఉద్దేశపూర్వకంగా `test:unit`ను మినహాయిస్తుంది (నెమ్మదిగా ఉంటుంది; CI `test-unit` జాబ్ ద్వారా కవర్ చేయబడుతుంది).
  - విడుదల బ్రాంచ్లను పుష్ చేయడానికి ముందు `npm run test:unit`ను మాన్యువల్గా అమలు చేయండి.

హుక్ విఫలమైతే: అంతర్లీన సమస్యను పరిష్కరించండి, `--no-verify`తో దాటవేయవద్దు.

### సంప్రదాయ కమిట్లు

విడుదలకు సంబంధించిన అన్ని కమిట్లు తప్పనిసరిగా `type(scope): subject` ఆకృతిని అనుసరించాలి.

**చెల్లుబాటు అయ్యే రకాలు:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**చెల్లుబాటు అయ్యే స్కోప్లు:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

బ్రేకింగ్ మార్పులు: `BREAKING CHANGE:` ఫుటర్ను లేదా స్కోప్ తర్వాత `!`ను జోడించండి (ఉదా. `feat(api)!: drop /v0`).

### డాక్యుమెంటేషన్

- [ ] `npm run check:docs-sync` విజయవంతమవుతుంది (pre-commit ద్వారా స్వయంచాలకంగా అమలవుతుంది)
- [ ] `npm run check:docs-all` విజయవంతమవుతుంది (సమగ్ర తనిఖీ: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` 0తో నిష్క్రమిస్తుంది — కోడ్ ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env ఒప్పందం చెక్కుచెదరకుండా ఉంది
- [ ] `npm run check:doc-links` 0తో నిష్క్రమిస్తుంది — పునర్వ్యవస్థీకరణ తర్వాత విరిగిన అంతర్గత markdown సూచనలు లేవు
- [ ] నిల్వ/రన్టైమ్ వ్యత్యాసాల కోసం `docs/architecture/ARCHITECTURE.md` సమీక్షించబడింది
- [ ] env var మరియు కార్యాచరణ వ్యత్యాసాల కోసం `docs/guides/TROUBLESHOOTING.md` సమీక్షించబడింది
- [ ] `.env.example` మారితే: `docs/reference/ENVIRONMENT.md` నవీకరించబడింది
- [ ] కొత్త ఫీచర్కు UI ఉంటే: దాని గురించి `docs/guides/USER_GUIDE.md`లో ప్రస్తావించబడింది
- [ ] కొత్త ఫీచర్కు API ఉంటే: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` నవీకరించబడ్డాయి
- [ ] కొత్త ఫీచర్ ఒక మాడ్యూల్ అయితే: ప్రత్యేక `docs/<MODULE>.md` ఉంది
- [ ] ఇది అనుకూలతను భంగపరిచే మార్పు అయితే: `docs/guides/TROUBLESHOOTING.md`లో మైగ్రేషన్ గమనిక ఉంది

### i18n

- [ ] `npm run i18n:check` 0తో నిష్క్రమిస్తుంది — అనువాద స్థితి (`.i18n-state.json`) మూల డాక్యుమెంట్లతో సమకాలీకరణలో ఉంది (strict modeలో వ్యత్యాసం ఉన్న మూలాలు లేవు; చివరి నిమిషంలో డాక్యుమెంట్ సవరణల కోసం warn-mode సూచన ఆమోదయోగ్యమే, కానీ ట్యాగ్ చేసే ముందు ఇది 0గా ఉండాలి)
- [ ] `npm run i18n:check-ui-coverage` 0తో నిష్క్రమిస్తుంది — ప్రతి UI locale కవరేజ్ కనీస పరిమితి 80% వద్ద లేదా అంతకంటే ఎక్కువగా ఉంది
- [ ] `npm run i18n:sync-ui:dry` మొత్తం 42 localeలలో లేని కీలు 0 అని నివేదిస్తుంది
- [ ] మూల ఆంగ్ల డాక్యుమెంట్లు మారితే, ట్యాగ్ చేసే ముందు `npm run i18n:run` అమలు చేయండి (`.env`లో `OMNIROUTE_TRANSLATION_API_KEY` అవసరం)
- [ ] అనువాద సహకారాలు స్వల్పమైనవైతే వాటిని తదుపరి విడుదలకు వాయిదా వేయవచ్చు (CHANGELOGలో ట్రాక్ చేయండి)

### డేటాబేస్ మైగ్రేషన్లు

- [ ] `src/lib/db/migrations/`లో కొత్త ఫైల్లు ఉంటే:
  - [ ] ప్రతి మైగ్రేషన్ idempotentగా ఉంది (`CREATE TABLE IF NOT EXISTS`, మొదలైనవి)
  - [ ] మైగ్రేషన్లు transactionలలో చుట్టబడ్డాయి
  - [ ] సరిగ్గా సంఖ్యలు కేటాయించబడ్డాయి (క్రమంలో ఖాళీలు లేవు)
- [ ] తాజా ఇన్స్టాలేషన్పై పరీక్షించండి: `~/.omniroute/omniroute.db`ను తొలగించి `npm run dev` అమలు చేయండి
- [ ] ఇప్పటికే ఉన్న ఇన్స్టాలేషన్పై పరీక్షించండి: DBని బ్యాకప్ చేసి, మైగ్రేషన్ను అమలు చేసి, schemaను ధృవీకరించండి
- [ ] మైగ్రేషన్ పట్టికలను తిరిగి వ్రాస్తే WAL ఫైల్లు (`-wal`, `-shm`) సరిగ్గా నిర్వహించబడతాయి

### ప్రొవైడర్ కాటలాగ్ (Zod ద్వారా ధృవీకరించబడింది)

- [ ] లోడ్ సమయంలో `src/shared/constants/providers.ts` Zod schema చెల్లుబాటవుతుంది
  - [ ] అన్ని ప్రొవైడర్లకు అవసరమైన ఫీల్డ్లు (`id`, `label`, `kind`, మొదలైనవి) ఉన్నాయి
  - [ ] కొత్త ఉచిత ప్రొవైడర్ల కోసం `freeNote` అందించబడింది
  - [ ] OAuth ప్రొవైడర్లకు `src/lib/oauth/constants/oauth.ts`లో `oauthConfig` నమోదు చేయబడింది
- [ ] కొత్త ప్రొవైడర్ జోడించబడితే: దానికి సంబంధించిన executor `open-sse/executors/`లో ఉంది
- [ ] OpenAI కాని ఫార్మాట్ అయితే: translator `open-sse/translator/`లో ఉంది
- [ ] మోడల్లు `open-sse/config/providerRegistry.ts`లో నమోదు చేయబడ్డాయి
- [ ] `tests/unit/`లోని unit testలు ప్రొవైడర్ వర్గీకరణ మరియు routingను కవర్ చేస్తాయి

### డెస్క్టాప్ (Electron)

`electron/` మారితే:

- [ ] `npm run electron:smoke:packaged` విజయవంతమవుతుంది
- [ ] `:win`, `:mac`, `:linux`లో కనీసం ఒకదాని కోసం buildలు పరీక్షించబడ్డాయి
- [ ] Code signing సర్టిఫికెట్ల గడువు ముగియలేదు (signing చేస్తే)
- [ ] `electron/package.json` version, root `package.json`తో సరిపోలుతుంది
- [ ] `stable`కు విడుదల చేస్తుంటే auto-update channel pointer నవీకరించబడింది

### Build లేఅవుట్

రిపోజిటరీ మూడు విభిన్న output directoryలను ఉపయోగిస్తుంది — వాటిని ఎప్పుడూ కలపవద్దు:

| Directory | ఉద్దేశ్యం                                                              | ట్రాక్ చేయబడుతుందా? |
| --------- | ---------------------------------------------------------------------- | ------------------- |
| `src/`    | అప్లికేషన్ మూలం (TypeScript / TSX)                                     | అవును               |
| `.build/` | Build మధ్యంతర ఫైల్లు — `next build` output (`distDir`)                 | కాదు (gitignored)   |
| `dist/`   | పంపిణీ చేయగల npm bundle — `assembleStandalone` ద్వారా సమీకరించబడుతుంది | కాదు (gitignored)   |

> **ఆపరేటర్ గమనిక:** రిమోట్ VPS image directory `/usr/lib/node_modules/omniroute/app/`గానే ఉంటుంది.
> **రిపోజిటరీలోని** build output మాత్రమే మారింది (`app/` → `dist/`). Deploy skillలు
> `dist/`లోని కంటెంట్ను రిమోట్ `app/` dirలోకి rsync చేస్తాయి — VPS path మార్పులు అవసరం లేదు.

**ఒకే-build ప్రవాహం:**

```
npm run build:release
  └─ rm -rf .build dist          (శుభ్రపరచడం)
  └─ next build → .build/next/   (మధ్యంతర ఫైల్లు)
  └─ assembleStandalone          (standalone + static + public + nativesను dist/లోకి కాపీ చేస్తుంది)
  └─ dist/BUILD_SHAను వ్రాస్తుంది       (HEAD sentinel)
```

Deploy కోసం `npm run build`ను అమలు చేసి, తర్వాత విడిగా `npm run build:cli`ను అమలు చేయవద్దు — ఒకే commandలో శుభ్రమైన rebuild + sentinelను నిర్వహించే
`npm run build:release`ను ఉపయోగించండి.

### Artifact ధృవీకరణ

- [ ] `npm run build:release` విజయవంతమవుతుంది మరియు `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` శుభ్రంగా ఉంది — `app.__qa_backup`, `scripts/scratch`, `package-lock.json` లేదా ఇతర స్థానిక అవశేషాలు లేవు
- [ ] Build తర్వాత `dist/server.js` ఉంది

### ట్యాగింగ్ & విడుదల

- [ ] `/generate-release-cc` (Claude Code skill)ను అమలు చేయండి:
  - `vX.Y.Z` ట్యాగ్ను సృష్టిస్తుంది
  - ట్యాగ్ మరియు branchను push చేస్తుంది
  - changelog bodyతో GitHub Releaseను తెరుస్తుంది
  - Electron installerలను జతచేస్తుంది (build చేసి ఉంటే)
- [ ] లేదా మాన్యువల్గా:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deploy

Deploy skillలు తేలికపాటి rsync ప్రవాహాన్ని ఉపయోగిస్తాయి — `npm pack` లేదు, `npm i -g` లేదు:

- [ ] లక్ష్యానికి సరిపోయే deploy skillను ఉపయోగించండి:
  - `/deploy-vps-local-cc` — స్థానిక VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — రెండూ
- [ ] Deploy చేయడానికి ముందు, `dist/BUILD_SHA` == `git rev-parse --short HEAD` అని నిర్ధారించండి
- [ ] `node_modules` వాస్తవంగా ఉన్న చోటే build అమలు కావాలి (ప్రధాన checkout లేదా `npm ci` అమలు చేసిన worktree — symlink చేసిన worktreeలో కాదు)
- [ ] Deploy చేసిన instanceపై smoke test చేయండి:
  - `/dashboard/health`ను తెరవండి → version string విడుదలతో సరిపోలుతుందో తనిఖీ చేయండి
  - తెలిసిన ప్రొవైడర్కు `/v1/chat/completions` requestను అమలు చేయండి
  - `/api/monitoring/health`, `CLOSED` circuit breakerలను తిరిగి ఇస్తుందని ధృవీకరించండి
  - MCP transportలు స్పందిస్తున్నాయని నిర్ధారించండి (`/mcp` HTTP, `/mcp-sse` SSE)

### విడుదల అనంతరం

- [ ] `/capture-release-evidences-cc` ను అమలు చేయండి (Claude Code నైపుణ్యం)
  - కొత్త ఫీచర్ల WebP స్క్రీన్షాట్లు/రికార్డింగ్లను సేకరిస్తుంది
  - వాటిని విడుదల గమనికలు / బ్లాగ్ పోస్ట్కు జోడిస్తుంది
- [ ] విడుదల ప్రకటనతో GitHub Discussions / Discordను నవీకరించండి
- [ ] తదుపరి వెర్షన్ కోసం మైలురాయిని తెరవండి
- [ ] అత్యవసరమైతే: యాప్లోని బ్యానర్ కోసం చర్చను పిన్ చేయండి లేదా `news.json`లో పోస్ట్ చేయండి

### Radar పబ్లిక్-లాంచ్ గేట్

Radar ప్రకటన ఉద్దేశపూర్వకంగా `active: false`తో కమిట్ చేయబడింది. దిగువన ఉన్న ప్రతి అంశానికి ఆధారం సమకూరిన తర్వాత
యాక్టివేషన్ను ప్రత్యేక మార్పుగా చేయాలి:

- [ ] స్టాక్ చేసిన అన్ని Radar PRలు విలీనం చేయబడ్డాయని, release-tip CI విజయవంతంగా ఉందని నిర్ధారించండి
- [ ] డిఫాల్ట్గా `RADAR_ENABLED` ఇంకా ఆఫ్లోనే ఉంచి OSS Radar రూట్లను డిప్లాయ్ చేసి స్మోక్ టెస్ట్ చేయండి
- [ ] నిర్దేశిత Radar హోస్ట్లో `GET /planos`, `/termos`, `/privacidade`, మరియు `/reembolso`లను స్మోక్ టెస్ట్ చేయండి
- [ ] ప్రైవేట్ సర్వీస్లో ఆపరేటర్ గుర్తింపు/సంప్రదింపు వివరాలు/చిరునామా మరియు యజమాని ఆమోదించిన చట్టపరమైన సమీక్షను నమోదు చేయండి
- [ ] Stripe Checkoutను మరియు సంతకం చేసిన webhookను టెస్ట్ మోడ్లో మాత్రమే పరీక్షించండి
- [ ] ఆమోదించబడిన పంపినవారు/డొమైన్తో ఒక ఎన్క్రిప్ట్ చేసిన లావాదేవీ ఇమెయిల్ డెలివరీని పరీక్షించండి
- [ ] బ్యాకప్ పునరుద్ధరణను మరియు పర్యవేక్షణలో, బడ్జెట్ పరిమితితో నిర్వహించిన ఒక పరిశోధన రన్ను నిరూపించండి
- [ ] విరాళానికి సంబంధించిన ఆధారాలను అంగీకరించే ముందు BRL/PIX సమీక్ష విధానాన్ని ఆమోదించండి
- [ ] పైన పేర్కొన్న గేట్లు పూర్తయిన తర్వాత మాత్రమే పబ్లిక్ Checkoutను ప్రారంభించి, ఆపై కొత్త `news.json` IDని యాక్టివేట్ చేయండి
- [ ] Home బ్యానర్ స్థానికీకరించిన కాపీని ఉపయోగిస్తోందని, పాత IDని తీసివేసిన తర్వాత కొత్త ID మళ్లీ కనిపిస్తోందని ధృవీకరించండి

## ఎంబెడెడ్ సర్వీసుల స్మోక్ పరీక్ష (v3.8.4+)

ఎంబెడెడ్ సర్వీసుల మార్పులను కలిగి ఉన్న ఏదైనా విడుదలను పంపించే ముందు, వీటిని ధృవీకరించండి:

### తాజా-DB బూట్ (మైగ్రేషన్ ఘర్షణలను గుర్తిస్తుంది — v3.8.4 హాట్ఫిక్స్ తర్వాత జోడించబడింది)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — బూట్ కోసం 10 సెకన్లు వేచి ఉండండి
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` అనేది `"9router"`ను అందిస్తుంది (404 కాదు, 500 కాదు). మైగ్రేషన్ `071_services.sql` వర్తింపజేయబడిందని + వరుస సీడ్ చేయబడిందని నిర్ధారిస్తుంది.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` అనేది 3 వరుసలను అందిస్తుంది.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` అనేది 2 వరుసలను అందిస్తుంది (`070_webhooks_kind_metadata.sql` వర్తింపజేయబడిందని ధృవీకరిస్తుంది).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` విజయవంతమవుతుంది — భవిష్యత్తులో సంభవించే ఘర్షణల నుంచి రక్షిస్తుంది.

### 9Router

- [ ] `POST /api/services/9router/install` అనేది 2 నిమిషాల్లోపు `installedVersion`తో 200ను అందిస్తుంది
- [ ] `POST /api/services/9router/start` అనేది 30 సెకన్లలోపు 200 మరియు `state: "running"`ను అందిస్తుంది
- [ ] `GET /api/services/9router/status` అనేది `health: "healthy"`గా నివేదిస్తుంది
- [ ] `"model": "9router/auto/..."`తో `POST /v1/chat/completions` అనేది 200ను అందిస్తుంది (9Router ద్వారా ఎండ్-టు-ఎండ్ రూటింగ్)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` అనేది ప్రాక్సీ లోపల 9Router స్థానిక UIను రెండర్ చేస్తుంది (ప్రత్యక్ష `127.0.0.1:port` iframe లేకుండా)
- [ ] `POST /api/services/9router/rotate-key` అనేది `{ keyRotated: true }`ను అందిస్తుంది మరియు సర్వీస్ ఎటువంటి సమస్య లేకుండా పునఃప్రారంభమవుతుంది
- [ ] `POST /api/services/9router/stop` అనేది 200 మరియు `state: "stopped"`ను అందిస్తుంది
- [ ] `GET /api/services/9router/logs?tail=50` అనేది ఇటీవలి లైన్లను కలిగి ఉన్న `snapshot` ఈవెంట్తో SSE స్ట్రీమ్ను అందిస్తుంది
- [ ] PATHలో `npm` లేని ఎన్విరాన్మెంట్లో ఇన్స్టాల్ చేస్తే, సులభంగా అర్థమయ్యే (స్టాక్-ట్రేస్ కాని) దోష సందేశంతో 500ను అందిస్తుంది

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` అనేది 2 నిమిషాల్లోపు 200ను అందిస్తుంది
- [ ] `POST /api/services/cliproxy/start` అనేది 30 సెకన్లలోపు 200 మరియు `state: "running"`ను అందిస్తుంది
- [ ] `GET /api/services/cliproxy/status` అనేది `health: "healthy"`గా నివేదిస్తుంది
- [ ] `POST /api/services/cliproxy/stop` అనేది 200 మరియు `state: "stopped"`ను అందిస్తుంది
- [ ] `GET /api/services/cliproxy/logs?tail=50` అనేది SSE స్ట్రీమ్ను అందిస్తుంది

### భద్రతా రిగ్రెషన్

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` అనేది `403 LOCAL_ONLY`ను అందిస్తుంది
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` అనేది `403 LOCAL_ONLY`ను అందిస్తుంది
- [ ] `/api/services/*` నుంచి వచ్చే దోష ప్రతిస్పందనలు `err.stack` లేదా సంపూర్ణ ఫైల్ పాత్లను కలిగి ఉండవు

## v3.8.0+ తనిఖీలు

ఏదైనా v3.8.x విడుదలను పంపించే ముందు, ఈ అదనపు అంశాలను ధృవీకరించండి:

- [ ] `omniroute --tray` అనేది macOSలో బూట్ అవుతుంది (`~/.omniroute/runtime/`లోకి systray2 ఇన్స్టాల్ చేయబడుతుంది)
- [ ] `omniroute --tray` అనేది Linuxలో బూట్ అవుతుంది (DISPLAY అవసరం; సెట్ చేయకపోతే సునాయాసమైన దోషం)
- [ ] `omniroute --tray` అనేది Windowsలో బూట్ అవుతుంది (PowerShell NotifyIcon, అదనపు బైనరీలు లేవు)
- [ ] `omniroute config tray enable` అనేది ఆటోస్టార్ట్ ఎంట్రీని సృష్టిస్తుంది; డిసేబుల్ చేయడం దానిని తొలగిస్తుంది
- [ ] `npm install -g omniroute@<this-version>` అనేది ప్రాణాంతక ఎగ్జిట్ లేకుండా postinstallను అమలు చేస్తుంది
- [ ] అప్డేట్ పాత్ ఐచ్ఛిక డిపెండెన్సీలను నిలుపుకుంటుంది: `omniroute update --apply` మరియు ఆటో-అప్డేటర్
      `npm install -g … --include=optional`ను అమలు చేస్తాయి, తద్వారా `optionalDependencies` (better-sqlite3,
      keytar, tls-client, మరియు llmlingua SLM స్టాక్: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) అప్డేట్ తర్వాత కూడా నిలిచి ఉంటాయి. అల్ట్రా `modelPath` SLM టైర్కు కూడా
      tinybert మోడల్ అవసరం; మొదటిసారి ఉపయోగించినప్పుడు అది `${DATA_DIR}/models/llmlingua`కు స్వయంచాలకంగా డౌన్లోడ్ అవుతుంది. ఆ తర్వాత Postinstall
      (`scripts/build/colocateOptionals.mjs`) SLM ఐచ్ఛిక క్లోజర్ను `dist/node_modules`లో సహ-స్థాపిస్తుంది,
      తద్వారా వర్కర్ ఒకే `@huggingface/transformers` ^4.2.0 ఇన్స్టాన్స్ను పరిష్కరిస్తుంది —
      స్వతంత్ర ట్రేస్ కేవలం transformersను మాత్రమే బండిల్ చేస్తుంది, డైనమిక్గా ఇంపోర్ట్ చేసిన
      ఐచ్ఛికాలను కాదు; కాబట్టి ఇది లేకపోతే వర్కర్ రూట్ transformersతో llmlingua-2ను లోడ్ చేస్తుంది
      మరియు SLM టైర్ ఎటువంటి హెచ్చరిక లేకుండా fail-open అవుతుంది.
- [ ] `.env` లేకుండా `omniroute status` పనిచేస్తుంది (CLI టోకెన్ పాత్, లూప్బ్యాక్ మాత్రమే)
- [ ] `curl http://localhost:20128/api/shutdown` అనేది 401ను అందిస్తుంది (ఎల్లప్పుడూ-రక్షిత రూట్)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` అనేది 401ను అందిస్తుంది (లూప్బ్యాక్ గార్డ్)
- [ ] మొదటి రన్లో SQLite రన్టైమ్ `bundled`గా పరిష్కరించబడుతుంది (బండిల్ చేసిన బైనరీ ప్లాట్ఫామ్కు చెల్లుబాటు అవుతుంది)
- [ ] `node_modules/better-sqlite3` తొలగించినప్పుడు SQLite రన్టైమ్ `runtime`కు ఫాల్బ్యాక్ అవుతుంది
- [ ] Smart MCP ఫిల్టర్ వాస్తవ `playwright-mcp browser_snapshot` అవుట్పుట్ను కంప్రెస్ చేస్తుంది (≥50% తగ్గింపు)
- [ ] మొత్తం 10 `skills/omniroute*/SKILL.md` ఫైళ్లు raw GitHub URL ద్వారా పబ్లిక్గా పొందగలిగేలా ఉంటాయి
- [ ] తాజా సెటప్లో ఆన్బోర్డింగ్ విజార్డ్ "ఇది ఎలా పనిచేస్తుంది" టైర్ టూర్ దశను చూపిస్తుంది
- [ ] హోమ్ డ్యాష్బోర్డ్ టైర్ కవరేజ్ విడ్జెట్ కాన్ఫిగర్ చేసిన/యాక్టివ్ కౌంట్లను చూపిస్తుంది

---

## రోల్బ్యాక్

రిలీజ్లో తీవ్రమైన సమస్య ఉంటే:

1. `gh release edit vX.Y.Z --prerelease` (తాజా రిలీజ్ కాదని గుర్తిస్తుంది)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (వినియోగదారులు ఇంకా స్వీకరించకపోతే మాత్రమే)
3. లేదా: `release/vX.Y.0`పై హాట్ఫిక్స్ → ప్యాచ్ రిలీజ్ `vX.Y.(Z+1)`
4. GitHub Discussions మరియు Discordలో వెంటనే తెలియజేయండి

## కఠినమైన నియమాలు

- `main`కు ఎప్పుడూ నేరుగా కమిట్ చేయవద్దు
- `main` లేదా `release/*` బ్రాంచ్లకు ఎప్పుడూ `git push --force` ఉపయోగించవద్దు
- Husky హుక్లను (`--no-verify`) ఎప్పుడూ దాటవేయవద్దు
- సీక్రెట్లు, క్రెడెన్షియల్లు లేదా `.env` ఫైల్లను ఎప్పుడూ కమిట్ చేయవద్దు
- కవరేజ్ ≥60/60/60/60గానే ఉండాలి (స్టేట్మెంట్లు/లైన్లు/ఫంక్షన్లు/బ్రాంచ్లు)
- `src/`, `open-sse/`, `electron/` లేదా `bin/`లోని ప్రొడక్షన్ కోడ్ను మార్చేటప్పుడు ఎల్లప్పుడూ టెస్ట్లను జోడించండి లేదా నవీకరించండి

## ఆటోమేటెడ్ సింక్ తనిఖీ

PRను తెరవడానికి ముందు docs sync guardను స్థానికంగా అమలు చేయండి:

```bash
npm run check:docs-sync
```

CI కూడా `.github/workflows/ci.yml`లో (lint job) ఈ తనిఖీని అమలు చేస్తుంది.
