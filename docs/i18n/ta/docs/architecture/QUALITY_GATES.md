# Quality Gates Reference (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

இந்த ஆவணம் OmniRoute-இல் உள்ள அனைத்து CI தர வாயில்களுக்குமான அதிகாரப்பூர்வ மேற்கோளாகும்.
ஒவ்வொரு வாயிலையும், அது எதைச் சரிபார்க்கிறது, எந்த CI job-இல் இயங்குகிறது, அது
ratchet baseline அல்லது pass/fail கொள்கையைப் பயன்படுத்துகிறதா, மேலும் அது build-ஐத் தடுக்கிறதா அல்லது ஆலோசனை சார்ந்ததா என்பதை விவரிக்கிறது.

சுருக்கமான தொகுப்புக்கும் allowlist கொள்கைக்கும், `AGENTS.md`-இல் உள்ள
"தர வாயில்கள் & Ratchet-கள்" பகுதியைப் பார்க்கவும். அதே அமைப்பின் முக்கியமான மதிப்பீடு,
முதிர்ச்சி வகைப்பாடு மற்றும் கருவி-சார்பற்ற மறுஉருவாக்கத் திட்டத்திற்கு,
[தர வாயில் செயல்திட்டம்](../ops/QUALITY_GATE_PLAYBOOK.md)-ஐப் பார்க்கவும்.

---

## கேட் பட்டியல் (~90 ஸ்கிரிப்ட்கள்)

ஸ்கிரிப்ட்கள் `scripts/check/` (கொள்கை கேட்டுகள்) மற்றும் `scripts/quality/` (ராட்செட் இயந்திரம்) ஆகியவற்றின் கீழ் உள்ளன.
CI-க்கான அதிகாரப்பூர்வ ஆதாரம் `.github/workflows/ci.yml` ஆகும்.

### வெளியீட்டு PR விரைவுப் பாதை (`quality.yml`)

`.github/workflows/quality.yml`, `release/**`-ஐ இலக்காகக் கொண்ட PR-களில் இயங்குகிறது. பாதை-வடிகட்டப்பட்ட விரைவு கேட்டுகள் மற்றும் குறியீட்டு மாற்றங்களுக்கான ஆலோசனைத் தன்மையிலான ஒரு production-build சிக்னல் மூலம், பங்களிப்பாளர் கிளைகள் தொடர்ந்து முன்னேறுவதை இது உறுதிசெய்கிறது:

| பணி                                              | வரம்பு                                                                                                                                                                                                                                                                 | தடுக்கும் தன்மை                                                                                            |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | வரைவு அல்லாத குறியீட்டு PR-கள் மற்றும் Mergify வரிசைக் கிளைகள்; Node 24, `npm-ci-retry`, `check:node-runtime`, `OMNIROUTE_USE_TURBOPACK=1` உடன் `npm run build`; இதைப் பயன்படுத்தும் அடுத்தடுத்த தரப் பணி எதுவும் இல்லாததால் artifact பதிவேற்றம் இல்லை                 | **ஆலோசனை** (`continue-on-error: true`; நிலையான வெளியீட்டு-PR இயக்கங்கள் ஒரு வாரம் முடிந்த பிறகு அகற்றவும்) |
| `Docs Gates (fast-path)`                         | ஆவண/குறியீட்டு PR-கள்; API ஆவணக் குறிப்புகள் மற்றும் அனைத்து ஆவணங்களும்                                                                                                                                                                                                | ஆம்                                                                                                        |
| `Fast Quality Gates`                             | குறியீட்டு PR-கள்; நிலையான சரிபார்ப்புகள், வகைச் சரிபார்ப்பு, dashboard வகைச் சரிபார்ப்பு, பாதிக்கப்பட்ட unit சோதனைகள்                                                                                                                                                 | ஆம்                                                                                                        |
| `Forgotten sibling tests`                        | குறியீட்டு PR-கள்; மாற்றப்பட்ட தொகுதிகளிலிருந்து நிலையான பயன்பாட்டாளர்கள் மற்றும் சாத்தியமான sibling சோதனைகள் வரை தடமறிதல்; barrel மற்றும் dynamic-import பாதைகள் ஆலோசனைத் தன்மையிலான கண்டறிதல்களாக அறிக்கையிடப்படுகின்றன, குறிப்பிடப்பட்ட allowlist விதிவிலக்குகளுடன் | **ஆலோசனை**                                                                                                 |
| `Vitest (fast-path)`                             | குறியீட்டு PR-கள்; விரைவான vitest தொகுப்பு                                                                                                                                                                                                                             | ஆம்                                                                                                        |
| `Unit Tests fast-path`                           | குறியீட்டு PR-கள்; 4-shard unit தொகுப்பு                                                                                                                                                                                                                               | ஆம்                                                                                                        |
| `No new ESLint warnings`                         | குறியீட்டு PR-கள்; suppression-களை அறிந்த lint பாதுகாப்பு                                                                                                                                                                                                              | சொந்த மூலத்துக்கு ஆம், fork-களுக்கு ஆலோசனை                                                                 |
| `Merge integrity (changelog + generated skills)` | வரைவு அல்லாத PR-கள்; changelog மற்றும் உருவாக்கப்பட்ட skill-களின் ஒத்திசைவு                                                                                                                                                                                            | சொந்த மூலத்துக்கு ஆம், fork-களுக்கு ஆலோசனை                                                                 |

#### மறக்கப்பட்ட sibling சோதனைகள் அறிக்கை

`npm run check:forgotten-sibling-tests`, test-impact வரைபடத்திற்குப் பின்னால் உள்ள import resolver-ஐ மீண்டும் பயன்படுத்துகிறது.
மாற்றப்பட்ட ஒவ்வொரு production தொகுதிக்கும், சாத்தியமான சோதனை pull-request diff-இல் இல்லாதபோது, தீர்மானகரமான
`changed module/symbol -> static consumer -> candidate sibling test` சங்கிலிகளை இது அறிக்கையிடுகிறது. Markdown சுருக்கமும் JSON முடிவும், தடுக்கும் அமலாக்கம் ஏதேனும் அறிமுகப்படுத்தப்படுவதற்கு முன் அளவுத்திருத்தத்திற்காக
`forgotten-sibling-tests` workflow artifact ஆகத் தக்கவைக்கப்படுகின்றன.

Barrel மறு-ஏற்றுமதிகளும் dynamic import-களும் resolution கண்டறிதல்கள் மட்டுமே; அவை ஒருபோதும்
தடுக்கும் கண்டுபிடிப்பை உருவாக்காது. மதிப்பாய்வு செய்யப்பட்ட விதிவிலக்குகள்
`config/quality/forgotten-sibling-allowlist.json`-இல் உள்ளன. ஒவ்வொரு பதிவும் consumer மற்றும் candidate
test-ஐக் குறிப்பிட வேண்டும், ஒரு குறிப்பிட்ட காரணத்தை வழங்க வேண்டும், மேலும் GitHub issue அல்லது pull request-க்கான இணைப்பைச் சேர்க்க வேண்டும். தவறாக வடிவமைக்கப்பட்ட பதிவுகள் fail-closed முறையில் தோல்வியடையும்.
நீக்கப்பட்ட candidate test-ஐயோ `.skip`/`.todo`-ஐச் சேர்க்கும் diff-ஐயோ விதிவிலக்குகள் மறைக்க முடியாது;
assertion-ஐ பலவீனப்படுத்துதல் மற்றும் பிற மறைத்தல் செயல்கள், தனியாகத் தடுக்கும்
`check:test-masking` கேட்டின் கட்டுப்பாட்டிலேயே தொடர்ந்து இருக்கும்.

### பணி: `lint`

`main`-க்கான ஒவ்வொரு PR-இலும் இயங்கும். தோல்வியடைந்தால் merge செய்வதைத் தடுக்கும்.

| ஸ்கிரிப்ட் (`npm run ...`)        | சரிபார்ப்பது                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | தடுப்பதா                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| `check:node-runtime`              | Node.js பதிப்பு ஆதரிக்கப்படும் வரம்பிற்குள் உள்ளது                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ஆம்                                    |
| `check:cycles`                    | சுழற்சி இறக்குமதிகள் — அனைத்து `src/` + `open-sse/` தொகுதிகள்                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ஆம்                                    |
| `check:route-validation:t06`      | அனைத்து வழித்தடங்களிலும் Zod திட்டவடிவங்கள் உள்ளன (அடுக்கு 6 கொள்கை)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ஆம்                                    |
| `check:any-budget:t11`            | `@ts-expect-error // any` எண்ணிக்கை வரம்பை மீறவில்லை (அடுக்கு 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ஆம்                                    |
| `check:provider-consistency`      | `providers.ts` இல் உள்ள ஒவ்வொரு வழங்குநருக்கும் `providerRegistry.ts` இல் பொருந்தும் பதிவு உள்ளது (மேலும் அனுமதிப்பட்டியலுக்குள் இதன் மறுதிசையிலும் பொருந்தும்)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ஆம்                                    |
| `check:model-lifecycle`           | கையால் பராமரிக்கப்படும் மூன்று வழிச்செலுத்தல் அட்டவணைகளும் பதிப்பகத்தில் சேர்க்கப்பட்ட வாழ்க்கைச்சுழற்சி நிலைப்படத்துடன் (#11503) ஒத்திசைவாக உள்ளன: `FITNESS_TABLE` (`taskFitness.ts`), `REGISTRY` வழிச்செலுத்தக்கூடிய ஓய்வுபெற்ற எந்த id-க்கும் மதிப்பெண் வழங்குவதில்லை; ஒவ்வொரு `BUILT_IN_ALIASES` இலக்கும் `REGISTRY` இல் உள்ளது மற்றும் ஓய்வுபெற்ற-id நிலைப்படத்தில் இல்லை; `REGISTRY` இல் இன்னும் உள்ள ஒவ்வொரு ஓய்வுபெற்ற id-யும் முன்னனுப்பப்படுகிறது அல்லது `allowedRetiredInCatalog` இல் பட்டியலிடப்பட்டுள்ளது; மேலும் எந்த `DEFAULT_DEGRADATION_MAP` மூலமோ இலக்கோ அந்த நிலைப்படத்தில் ஓய்வுபெற்றதாகத் தோன்றுவதில்லை. ஒரு மாதிரி தற்போது நேரடி upstream மூலம் வழங்கப்படுகிறது என்பதை இது நிரூபிக்காது. இணையமில்லா செயல்பாடு — `config/quality/model-lifecycle.json` உடன் ஒப்பிடுகிறது; இது `npm run quality:refresh-model-lifecycle` மூலம் கையால் புதுப்பிக்கப்படுகிறது (பிணையம் தேவை; CI-உடன் இணைக்கப்படவில்லை). `allowedRetiredInCatalog` என்பது படிப்படியாகக் குறைக்கும் ratchet: ஒரு கண்காணிப்புச் சிக்கலுடன் மட்டுமே பதிவைச் சேர்க்கவும். | ஆம்                                    |
| `check:fetch-targets`             | கிளையன்ட் பக்க `src/` இல் உள்ள ஒவ்வொரு `fetch("/api/...")` அழைப்பும் உண்மையான `route.ts`-க்குத் தீர்மானிக்கப்படுகிறது                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ஆம்                                    |
| `check:deps`                      | பதிப்பகத்தில் உள்ள ஒவ்வொரு `package.json` கோப்பிலும் காணப்படும், `npm install` மூலம் நிறுவக்கூடிய அனைத்து சார்புகளும் `dependency-allowlist.json` இல் உள்ளன; புதிதாகப் பதிப்பு நிலைநிறுத்தப்படாத அல்லது slopsquatting செய்யப்பட்ட தொகுப்புகள் குறியிடப்படுகின்றன                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ஆம்                                    |
| `audit:deps`                      | `npm audit` (மூலம் + electron) — உயர்/மிகமுக்கிய ஆலோசனைகள் எதுவுமில்லை (osv `check:vuln-ratchet` உடன் ஒன்றுடன் ஒன்று பொருந்துகிறது; Rationalization Backlog-ஐப் பார்க்கவும்)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ஆம்                                    |
| `check:lockfile`                  | `package-lock.json` முழுமைத்தன்மை — https பதிவகம், முழுமைத்தன்மை hash-கள், host override-கள் இல்லை                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ஆம்                                    |
| `check:licenses`                  | உற்பத்தி சார்புகளுக்கான SPDX உரிம அனுமதிப்பட்டியல்                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ஆம்                                    |
| `check:tracked-artifacts`         | build artifacts / commit செய்யப்பட்ட `node_modules` symlinks எதுவும் இல்லை (husky pre-commit-இலும் இயங்கும்; pre-push வேண்டுமென்றே எளிதாக வைக்கப்பட்டுள்ளது — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ஆம்                                    |
| `check:ai-attribution`            | PR commits, தலைப்பு அல்லது உள்ளடக்கத்தில் AI/bot `Co-Authored-By` trailer அல்லது AI உருவாக்க footer எதுவும் இல்லை — கடுமையான விதி #16 (`quality.yml`-இன் PR→`release/**` fast-gates loop-இல் — event payload-ஐப் படிக்கும், PR அல்லாதவற்றில் எந்தச் செயலும் செய்யாது — மற்றும் PR→`main`-க்கான `ci.yml` lint-இல் PR-க்கு மட்டும் உரிய படிநிலை; husky `commit-msg` hook-இலும்; மனித இணை ஆசிரியர்கள் அனுமதிக்கப்படுகிறார்கள்; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | ஒவ்வொரு Vitest விலக்கலும் ஒரு கண்காணிப்புச் சிக்கலைக் குறிப்பிடுகிறது மற்றும் `config/quality/vitest-exclusions.json`-இல் இடம்பெறுகிறது (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ஆம்                                    |
| `check:file-size`                 | எந்த source file-உம் extension-வாரியான உச்சவரம்பை மீறவில்லை (ratchet: `frozen` பட்டியலில் உறையவைக்கப்பட்ட பெரிய files)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ஆம்                                    |
| `check:error-helper`              | executors/handlers-இல் உள்ள பிழை responses `buildErrorBody()` / `sanitizeErrorMessage()`-ஐப் பயன்படுத்துகின்றன (கடுமையான விதி #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ஆம்                                    |
| `check:migration-numbering`       | Migration SQL கோப்புகள் இடைவெளிகளோ நகல்களோ இல்லாமல் தொடர்ச்சியாக எண்ணிடப்பட்டுள்ளன                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ஆம்                                    |
| `check:public-creds`              | `publicCreds.ts`-க்கு வெளியே நேரடி OAuth `client_id`/`client_secret` அல்லது Firebase Web விசைகள் இல்லை (கடுமையான விதி #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ஆம்                                    |
| `check:db-rules`                  | `src/lib/db/` தொகுதிகளுக்கு வெளியே மூல SQL இல்லை; `localDb.ts`-இலிருந்து barrel-import-கள் இல்லை (கடுமையான விதிகள் #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ஆம்                                    |
| `check:known-symbols`             | அவற்றின் dispatch அட்டவணைகளில் பதிவுசெய்யப்பட்ட provider executor-கள், routing strategy-கள் மற்றும் translator-கள் வட்டில் உள்ள கோப்புகளுடன் பொருந்துகின்றன — தொடர்பற்ற அல்லது அறிவிக்கப்படாத symbol-கள் இல்லை                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ஆம்                                    |
| `check:route-guard-membership`    | child process-ஐத் தொடங்கும் ஒவ்வொரு route-உம் `isLocalOnlyPath()` மூலம் வகைப்படுத்தப்படுகிறது (கடுமையான விதிகள் #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ஆம்                                    |
| `check:test-discovery`            | repo-இல் உள்ள ஒவ்வொரு `*.test.ts` / `*.spec.ts` கோப்பும் குறைந்தது ஒரு test runner-ஆல் சேகரிக்கப்படுகிறது (ratchet: `test-discovery-baseline.json`-இல் உள்ள orphan பட்டியல் சுருங்க மட்டுமே முடியும்)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ஆம்                                    |
| `check:agent-skills-sync`         | உருவாக்கப்பட்ட agent-skills கலைப்பொருட்கள் அவற்றின் மூலப் பட்டியலுடன் பொருந்துகின்றன (வேறுபாடு இல்லை)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | வழங்குநர் லோகோக்கள்/சொத்துகளுக்குப் பதிவுசெய்யப்பட்ட மூலம் சார்ந்த பதிவு உள்ளது                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | JSON கட்டமைப்புக் கோப்புகள் சரியாகப் பகுக்கப்பட்டு, repo lint விதிகளைப் பூர்த்திசெய்கின்றன                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | பிழைகள் இல்லாத TypeScript தொகுத்தல் (ஆலோசனை எச்சரிக்கைகள் மட்டும்)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ஆம்                                    |
| `typecheck:noimplicit:core`       | கடுமையான `noImplicitAny` — எதிர்கால நோக்குடையது; ஏற்கனவே உள்ள பல அழைப்பிடங்களுக்கு இன்னும் வகைக் குறிப்புகள் தேவை                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **ஆலோசனை** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**`-க்கு வரம்பிடப்பட்ட `tsc` (#7033) — `typecheck:core`-இன் தேர்ந்தெடுக்கப்பட்ட 27-கோப்பு அனுமதிப்பட்டியலில் எந்த dashboard TSX-உம் சேர்க்கப்படவில்லை; மேலும் `next build` அதனை ஒருபோதும் வகைச் சரிபார்ப்பதில்லை (`next.config.mjs`-இல் `ignoreBuildErrors: true` அமைக்கப்பட்டுள்ளது), எனவே அங்குள்ள தனிமைப்படுத்தப்பட்ட அடையாளங்காட்டி பின்னடைவுகள் (#6625/#6909) CI-க்குத் தெரியாமல் இருந்தன. முடக்கப்பட்ட கோப்புவாரியான/TS-code எண்ணிக்கை அடிப்படையுடன் (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` போன்ற அதே காலாவதியானதைக் கட்டாயப்படுத்தும் முறை) வேறுபாடுகள் ஒப்பிடப்படுகின்றன — அடிப்படையில் உள்ள எண்ணிக்கையைத் தாண்டிய புதிய பிழைகள் மட்டுமே gate-ஐத் தோல்வியடையச் செய்யும்; ஏற்கனவே இருந்த பிழை சரிசெய்யப்படும்போது `--update` மூலம் அடிப்படையைக் குறைக்கவும்.                                                                                                                                                                                                                           | ஆம்                                    |

### பணி: `quality-gate`

`test-coverage`-க்குப் பிறகு இயங்கும். தோல்வியுற்றால் merge-ஐத் தடுக்கும்.

| ஸ்கிரிப்ட்                   | சரிபார்ப்பது                                                                                                                                                                                                                            | தடுக்கும் தன்மை             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | `quality-metrics.json`-ஐ வெளியிடுகிறது (ESLint எச்சரிக்கைகளின் எண்ணிக்கை, ஒன்றிணைக்கப்பட்ட shard அறிக்கையிலிருந்து coverage)                                                                                                            | ஆம் (ratchet-க்கு upstream) |
| `quality:ratchet`            | `quality-baseline.json`-இல் உள்ள ஒவ்வொரு metric-உம் பின்னடைவு அடையவில்லை (ESLint எச்சரிக்கைகள் ≤ baseline; coverage ≥ baseline)                                                                                                         | ஆம்                         |
| `check:duplication`          | குறியீட்டு நகலெடுப்பு (jscpd@4), `quality-baseline.json`-இல் உள்ள baseline-ஐ மீறவில்லை                                                                                                                                                  | ஆம்                         |
| `check:complexity`           | கோப்பு-நிலை cyclomatic complexity, வரம்பை மீறவில்லை (முதன்மை ESLint `complexity` + `max-lines-per-function`)                                                                                                                            | ஆம்                         |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — தனியான ESLint இயக்கம்; CI, இரண்டையும் ஒன்றிணைத்து ஒற்றை `check:complexity-ratchets` படியாக இயக்குகிறது                                                                         | ஆம்                         |
| `check:dead-code`            | பயன்படுத்தப்படாத exports / கோப்புகளுக்கான ratchet (knip), baseline-உடன் ஒப்பிடும்போது பின்னடைவு அடையவில்லை                                                                                                                              | ஆம்                         |
| `check:compression-budget`   | சுருக்க benchmark வரம்பு — engine-வாரியான token-savings குறைந்தபட்ச அளவுகள் பின்னடைவு அடையக்கூடாது                                                                                                                                      | ஆம்                         |
| `check:type-coverage`        | தட்டச்சிடப்பட்ட சதவீதத்திற்கான ratchet (`type-coverage`) பின்னடைவு அடையவில்லை; பெருமளவில் `typecheck:noimplicit:core`-ஐ உள்ளடக்குகிறது                                                                                                  | ஆம்                         |
| `check:codeql-ratchet`       | திறந்துள்ள CodeQL எச்சரிக்கைகளின் எண்ணிக்கை பின்னடைவு அடையவில்லை (`gh api` வழியாகப் படிக்கிறது; token இல்லாவிட்டால் சீராகத் தவிர்க்கிறது) — புதுப்பிப்பு இடைவெளி மற்றும் கைமுறைத் தூண்டுதல்: கீழே உள்ள "CodeQL ratchet"-ஐப் பார்க்கவும் | ஆம்                         |

### பணி: `quality-extended`

முழுப் பணியும் ஆலோசனை சார்ந்தது (`continue-on-error: true`). npm-அடிப்படையிலான ratchet-கள்
உண்மையாகவே இயங்குகின்றன; வெளிப்புற scanner-கள் `gh release download` வழியாக நிறுவப்பட்டு, binary
இன்னும் இல்லாதபோது தாமாகவே தவிர்க்கின்றன (exit 0).

| ஸ்கிரிப்ட்               | சரிபார்ப்பது                                                                                                                                                                                                                                      | தடுக்கும் தன்மை |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check:circular-deps`    | சுழற்சி சார்புகள் இல்லை (dpdm)                                                                                                                                                                                                                    | **ஆலோசனை**      |
| `check:bundle-size`      | Bundle அளவு வரம்பை மீறவில்லை                                                                                                                                                                                                                      | **ஆலோசனை**      |
| `check:secrets`          | ரகசியத் தகவல் scanning (gitleaks) — binary இல்லாவிட்டால் தவிர்க்கிறது                                                                                                                                                                             | **ஆலோசனை**      |
| `check:vuln-ratchet`     | சார்பு பாதிப்புகள் (osv-scanner) பின்னடைவு அடையவில்லை — binary இல்லாவிட்டால் தவிர்க்கிறது                                                                                                                                                         | **ஆலோசனை**      |
| `check:workflows`        | Workflow lint (actionlint + zizmor) — binary-கள் இல்லாவிட்டால் தவிர்க்கிறது                                                                                                                                                                       | **ஆலோசனை**      |
| `check:openapi-breaking` | அடிப்படை branch-உடன் ஒப்பிடும்போது பொது API ஒப்பந்தத்தில் (`openapi.yaml`) முறிவை ஏற்படுத்தும் மாற்றங்கள் (oasdiff) — `openapiBreaking=N`-ஐ வெளியிடுகிறது; oasdiff இல்லாவிட்டால் அல்லது அடிப்படை spec-ஐத் தீர்மானிக்க முடியாவிட்டால் தவிர்க்கிறது | **ஆலோசனை**      |

### பணி: `docs-sync-strict`

`main`-க்கான ஒவ்வொரு PR-இலும் இயங்குகிறது. தோல்வியடைந்தால் merge செய்வதைத் தடுக்கிறது.

| ஸ்கிரிப்ட்                     | சரிபார்ப்பது                                                                                                                                                                                            | தடுக்கும் தன்மை               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | கீழேயுள்ள 6 துணை-வாயில்களை வரிசையாக இயக்கும் மெட்டா-வாயில்                                                                                                                                              | ஆம்                           |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt பதிப்பு ஒத்திசைவு                                                                                                                                                         | ஆம்                           |
| ↳ `check:docs-counts`          | உரைநடையில் உள்ள எண்ணிக்கைகள் (வழங்குநர் எண்ணிக்கை, இடம்பெயர்வு எண்ணிக்கை போன்றவை) உண்மையான எண்ணிக்கைகளின் ராட்செட் வரம்பிற்குள் உள்ளனவா என்பதைச் சரிபார்க்கிறது                                         | ஆம்                           |
| ↳ `check:env-doc-sync`         | `.env.example`-இல் உள்ள ஒவ்வொரு சூழல் மாறியும் ஆவண அட்டவணையில் ஆவணப்படுத்தப்பட்டுள்ளதா என்பதையும், மறுதிசையிலும் அதையே சரிபார்க்கிறது                                                                   | ஆம்                           |
| ↳ `check:deprecated-versions`  | ஆவணங்களில் வழக்கொழிந்த பதிப்பு சரங்கள் இல்லை                                                                                                                                                            | ஆம்                           |
| ↳ `check:doc-links`            | ஆவணங்களில் உள்ள அக markdown இணைப்புகள் உண்மையான கோப்புகளுக்குத் தீர்மானிக்கப்படுகின்றன (`[text]`/`(path)` வடிவம்)                                                                                       | ஆம்                           |
| ↳ `check:fabricated-docs`      | ஆவணங்களில் குறிப்பிடப்பட்டுள்ள வழித்தடங்கள், சூழல் மாறிகள், CLI கட்டளைகள், hook பெயர்கள் மற்றும் கோப்புப் பாதைகள் codebase-இல் உள்ளன. `--strict` மூலம் கடுமையான வாயில்; கொடி இல்லாமல் மென்மையான தோல்வி. | ஆம் (CI-இல் `--strict` மூலம்) |
| `check:cli-i18n`               | CLI கட்டளைச் சரங்கள் அனைத்து i18n locale கோப்புகளிலும் உள்ளன                                                                                                                                            | ஆம்                           |
| `check:openapi-coverage`       | OpenAPI விவரக்குறிப்பு, உண்மையான வழித்தடங்களில் குறைந்தபட்சம் ராட்செட் செய்யப்பட்ட அடிப்படை அளவையாவது உள்ளடக்குகிறது                                                                                    | ஆம்                           |
| `check:openapi-security-tiers` | `openapi.yaml`-இல் உள்ள பாதுகாப்பு அடுக்கு சிறுகுறிப்புகள் `routeGuard.ts` வகைப்பாடுகளுடன் ஒத்திசைவாக உள்ளன                                                                                             | **ஆலோசனை மட்டும்**            |
| `check:openapi-routes`         | `openapi.yaml`-இல் உள்ள ஒவ்வொரு பாதையும் உண்மையான `route.ts`-க்குத் தீர்மானிக்கப்படுகிறது (புனைவுத் தடுப்பு)                                                                                            | ஆம்                           |
| `check:docs-symbols`           | `docs/**/*.md`-இல் உள்ள ஒவ்வொரு `/api/...` குறிப்பும் உண்மையான `route.ts`-க்குத் தீர்மானிக்கப்படுகிறது (புனைவுத் தடுப்பு)                                                                               | ஆம்                           |
| `i18n மொழிபெயர்ப்பு விலகல்`    | i18n locale கோப்புகளில் மொழிபெயர்க்கப்படாத விசைகள் — எச்சரிக்கை மட்டும்                                                                                                                                 | **ஆலோசனை மட்டும்**            |

### பணி: `i18n-ui-coverage`

| ஸ்கிரிப்ட்                        | சரிபார்ப்பது                                                                                                                                                                                                       | தடுக்கும் தன்மை    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `check-ui-keys-coverage` (inline) | UI i18n விசை உள்ளடக்கம் ≥ 65%                                                                                                                                                                                      | ஆம்                |
| `check-ui-value-drift` (inline)   | மீண்டும் எழுதப்பட்ட ஆங்கில **மதிப்பு**, பழைய மொழிபெயர்ப்பு எதையும் எஞ்சவிடாது                                                                                                                                      | ஆம்                |
| `check-new-key-coverage` (inline) | ஒரு **புதிய** ஆங்கில விசை ஒவ்வொரு locale-இலும் மொழிபெயர்க்கப்பட்டுள்ளது — `__MISSING__:` குறியீடு நிராகரிக்கப்படும்                                                                                                | ஆம்                |
| `check-translation-ratio`         | ஒவ்வொரு locale-க்குமான உண்மையான மொழிபெயர்ப்பு விகிதம் (அனுமதிப்புப் பட்டியலுக்கு வெளியே ஆங்கிலத்துடன் ஒத்தவை / placeholder / விடுபட்ட இலைகள்) `config/quality/i18n-translation-baseline.json` + தளர்வை மீறக்கூடாது | **ஆலோசனை மட்டும்** |

`fetch-depth: 0` தேவை — மதிப்பு-விலகல் வாயில், merge base-க்கு எதிராக `en.json`-ஐ வேறுபடுத்திப் பார்க்கிறது.

#### `check-ui-value-drift` — பழைய-மொழிபெயர்ப்பு வாயில்

மற்ற வாயில்களால் கட்டமைப்பு ரீதியாகக் கண்டறிய முடியாத ஒரே i18n பின்னடைவை இது கண்டறிகிறது: ஓர் ஆங்கில மதிப்பு
மீண்டும் எழுதப்பட்ட பின்னரும், _முந்தைய_ ஆங்கிலத்திலிருந்து பெறப்பட்ட மொழிபெயர்ப்புகள் அப்படியே எஞ்சுகின்றன; இதனால்
ஆங்கிலமல்லாத மொழிகளைப் பயன்படுத்தும் பயனர்கள் நம்பிக்கையுடன் எழுதப்பட்ட, ஆனால் இப்போது தவறான உரையைத் தொடர்ந்து படிக்கின்றனர்.

இது உண்மையிலேயே வெளியீட்டுக்குச் சென்றது. Antigravity உள்நுழைவு உதவி சேர்க்கப்பட்டபோது (#5203)
`oauthModal.googleOAuthWarning` மீண்டும் எழுதப்பட்டது; **43 locale-களில் 39**-இல், இயக்குநர்களிடம் "முழு
URL-ஐ நகலெடுத்து கீழே ஒட்டவும்" என்று கூறும் உரை அப்படியே இருந்தது — அந்த வழங்குநருக்காக நிறைவு செய்ய முடியாத ஒரு செயல்முறை. பின்வரும் காரணங்களால்
#8463 வரை இது கவனிக்கப்படவில்லை:

- `sync-ui-keys`, **இல்லாத** விசைகளை மட்டுமே பின்னிரப்புகிறது; **பழைய** விசைகளை ஒருபோதும் பின்னிரப்புவதில்லை;
- `check-ui-keys-coverage`, விசை _இருப்பை_ எண்ணுகிறது; எனவே பழைய மொழிபெயர்ப்பும் உள்ளடக்கப்பட்டதாக மதிப்பெண் பெறுகிறது;
- `check-translation-drift`, `docs/i18n/<locale>/**.md` ஆவண நகல்களைத் தடமறிகிறது —
  அது `src/i18n/messages/*.json`-ஐ ஒருபோதும் படிப்பதில்லை. 2026-09 மறு-ஒத்திசைவிலிருந்து `docs-sync-strict` பணியில் தடுக்கும் வாயிலாக உள்ளது:
  ஒரு மைய ஆவணத்தைத் திருத்தவும் → `npm run i18n:run -- --files=<doc>` (பிரிவு-நிலை, செலவு குறைவு).

**வேறுபாடு சார்ந்தது, அடிப்படை ஆதரவு கொண்டதல்ல.** இது இணைப்பு அடிப்படையிலுள்ள `en.json` கோப்பை
பணிக் கிளையுடன் ஒப்பிடுகிறது; ஆங்கில மதிப்பு மாறிய ஒவ்வொரு விசைக்கும், இன்னும்
மாற்றப்படாத மொழிபெயர்ப்பைக் கொண்டுள்ள எந்த locale-உம் காலாவதியானதாகும். இது வேண்டுமென்றே
**முன்பே உள்ள தொழில்நுட்பக் கடனை உறைய வைக்கிறது** — நீண்டகாலமாக உள்ள ஒரு மொழிபெயர்ப்பு எந்தப் பழைய
ஆங்கிலத்திலிருந்து வந்தது என்பதை ஒரு வேறுபாட்டால் வெளிப்படுத்த முடியாது; எனவே தற்போதைய மாற்றம்
தொடுவதைக் கொண்டு மட்டுமே இந்தச் சரிபார்ப்பு தீர்மானிக்கிறது. மாற்று அணுகுமுறைக்கு (ஒவ்வொரு விசைக்கும் hash அடிப்படை)
~600 KB உருவாக்கப்பட்ட கோப்பு தேவைப்படும்; அது தற்போதுள்ள மிகப்பெரிய அடிப்படையைவிட 3× பெரியது,
மேலும் ஒவ்வொரு i18n PR-லும் தொடர்ந்து மாறிக்கொண்டிருக்கும்.

இதைப் பூர்த்திசெய்ய இரண்டு வழிகள் உள்ளன:

1. பாதிக்கப்பட்ட மொழிபெயர்ப்புகளைப் புதுப்பிக்கவும், அல்லது
2. அவற்றை `__MISSING__:<new english>` என அமைக்கவும் — பின்னர் runtime திருத்தப்பட்ட ஆங்கிலத்தை
   வழங்கும் (`src/i18n/request.ts::deepMergeFallback`, #7258), மேலும் அந்த விசை மொழிபெயர்ப்பிற்காக வரிசைப்படுத்தப்படும்.

சரத்தின் **பொருள்** மாறியிருந்தால், **விசையின் பெயரை மாற்றுவதை** விரும்பவும்: ஒரு புதிய விசையால்
காலாவதியான மொழிபெயர்ப்பை மரபாகப் பெற முடியாது. #8463 பயன்படுத்திய முறை இதுதான்.

```bash
npm run i18n:check-value-drift          # கடுமையானது (CI இயக்குவது)
npm run i18n:check-value-drift:warn     # அறிக்கை மட்டும்
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

அடிப்படை catalog-ஐ வாசிக்க முடியாதபோது (அடிப்படை ref இல்லாத shallow
clone), `check-openapi-breaking`-ஐப் பிரதிபலிக்கும் வகையில் `SKIP reason=base-unresolved` உடன் 0-ஆக வெளியேறும்.

### பணி: `i18n`

முழுமையான i18n சரிபார்ப்பு அணி (ஒவ்வொரு locale-க்கும் ஒரு பணி). முழுப் பணியும் ஆலோசனை சார்ந்தது.

| Script                          | சரிபார்ப்பது                                | தடுக்கும் தன்மை                                                   |
| ------------------------------- | ------------------------------------------- | ----------------------------------------------------------------- |
| `validate_translation.py quick` | ஒவ்வொரு locale-க்குமான மொழிபெயர்ப்பு முழுமை | **ஆலோசனை சார்ந்தது** (முழுப் பணியிலும் `continue-on-error: true`) |

### பணி: `pr-test-policy`

Pull request-களில் மட்டும் இயங்கும்.

| Script                 | சரிபார்ப்பது                                                                                                                                                                              | தடுக்கும் தன்மை |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, அல்லது `bin/`-இல் production code-ஐ மாற்றும் PR-கள் சோதனைகளைச் சேர்க்க அல்லது புதுப்பிக்க வேண்டும் (கடுமையான விதி #8)                                   | ஆம்             |
| `check:test-masking`   | மாற்றப்பட்ட சோதனைக் கோப்புகள் மொத்த assert எண்ணிக்கையைக் குறைக்கவோ `assert.ok(true)` போன்ற மறுப்புக்கிடமற்ற கூற்றுகளைச் சேர்க்கவோ கூடாது                                                  | ஆம்             |
| `check:pr-evidence`    | மாற்றத்திற்கான சோதனை/VPS ஆதாரத்தை PR விளக்கம் குறிப்பிடுகிறது (PR உரையை grep செய்வதன் மூலம் கடுமையான விதி #18-ஐ இயந்திரமயமாக்குகிறது — எளிதில் பாதிக்கக்கூடியது, Backlog-ஐப் பார்க்கவும்) | ஆம்             |

### பணி: `test-vitest`

`build`-க்குப் பிறகு இயங்கும். தோல்வியடைந்தால் இணைப்பைத் தடுக்கும்.

| Suite            | சரிபார்ப்பது                                                | தடுக்கும் தன்மை                                                                                                                            |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP server (110 கருவிகள்), autoCombo, cache — vitest runner | ஆம்                                                                                                                                        |
| `test:vitest:ui` | UI component சோதனைகள் — vitest runner                       | **தடுக்கும்** — முன்பே உள்ள தோல்விகள் `vitest.config.ts`-இல் வெளிப்படையாக விலக்கப்பட்டுள்ளன; புதிய தோல்விகள் பணியைத் தோல்வியடையச் செய்யும் |

### இரவுநேர workflow-கள் (திட்டமிடப்பட்டவை, ஆலோசனை சார்ந்தவை)

இவை cron அட்டவணையில் (மற்றும் `workflow_dispatch` வழியாக) இயங்குகின்றன; PR-களில் ஒருபோதும் இயங்காது. அனைத்தும் ஆலோசனை சார்ந்தவை.

| Workflow               | சரிபார்ப்பது                                                                                                                                                                                               | தடுக்கும் தன்மை      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `nightly-property`     | சீரற்ற seed + அதிக run எண்ணிக்கையுடனான fast-check property சோதனைகள்                                                                                                                                        | **ஆலோசனை சார்ந்தது** |
| `nightly-resilience`   | heap வளர்ச்சி gate, chaos fault-injection, k6 load/soak                                                                                                                                                    | **ஆலோசனை சார்ந்தது** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (provider secret இல்லாமல் தவிர்க்கப்படும்)                                                                                                           | **ஆலோசனை சார்ந்தது** |
| `nightly-schemathesis` | `docs/openapi.yaml`-ஐப் பயன்படுத்தி இயங்கிக்கொண்டிருக்கும் OmniRoute-க்கு எதிரான OpenAPI contract fuzzing (schemathesis) — specification மீறல்கள் / கையாளப்படாத 500 பிழைகளை வெளிப்படுத்தும் (கட்டம் 8 B.4) | **ஆலோசனை சார்ந்தது** |
| `nightly-mutation`     | வேகமான unit lane மீதான Stryker mutation-testing மதிப்பெண் — உயிர்பிழைக்கும் mutants பலவீனமான assert-களை வெளிப்படுத்தும்                                                                                    | **ஆலோசனை சார்ந்தது** |
| `nightly-compat`       | ஆதரிக்கப்படும் `engines.node` வரம்புகள் முழுவதுமான Node engine இணக்கத்தன்மை அணி                                                                                                                            | **ஆலோசனை சார்ந்தது** |

---

## வேகக் கட்டம் (2026-08-30 → v4.0 LTS): ஒவ்வொரு அடிப்படை வரம்பும் 20% தளர்த்தப்பட்டது

உரிமையாளர் முடிவு (2026-08-30): v4.0 கூறுமயமாக்கல் வரை, தொழில்நுட்பக் கடன் வரம்பைப் பராமரிப்பதைவிட
வெளியீட்டு வேகம் முக்கியமானது. ஒவ்வொரு **எண்ணியல்** ratchet அடிப்படை வரம்பும் தணிக்கை செய்யக்கூடிய ஒரே
செயல்பாட்டில் 20% தளர்த்தப்பட்டது; மேலும் அந்தக் கட்டம் `config/quality/quality-baseline.json`-இல் அறிவிக்கப்பட்டுள்ளது:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| என்ன மாற்றப்பட்டது                                                                                                                                                                                                                                      | எங்கு                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — குறைவாக இருந்தால் சிறந்த எண்ணிக்கைகள் ×1.2, அதிகமாக இருந்தால் சிறந்த சதவீதங்கள் ÷1.2 (கவரேஜின் குறைந்தபட்ச வரம்பு 60 ஆகவே வைக்கப்பட்டது, `eslintErrors` 0 ஆகவே உள்ளது, `eslintWarnings` 0 → முடக்கப்பட்ட நிலையான எண்ணிக்கையின் 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` குறிப்பு ஒவ்வொரு முன் → பின் மதிப்பையும் பட்டியலிடுகிறது) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                        | `complexity-baseline.json`, `duplication-baseline.json`                                                         |
| `cap`, `testCap`, ஒவ்வொரு `frozen[*]` / `testFrozen[*]` வரி வரம்பும் ×1.2                                                                                                                                                                               | `file-size-baseline.json`                                                                                       |
| கோப்புக்கு / TS குறியீட்டுக்கு உரிய எண்ணிக்கைகள் ×1.2                                                                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`          |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                     | `scripts/check/check-openapi-coverage.mjs`                                                                      |
| `_policy.requireTighten === false` ஆக இருக்கும்போது `--require-tighten` ஆலோசனையாக மாறுகிறது                                                                                                                                                             | `scripts/quality/check-quality-ratchet.mjs`                                                                     |
| இரவுநேர `bank-ratchet-shrinks` இடைநிறுத்தப்படுகிறது (அது அளவிடப்பட்ட சுருக்கத்தைச் சேமித்து, கூடுதல் இடவசதியை நீக்கிவிடும்)                                                                                                                             | `.github/workflows/nightly-release-green.yml`                                                                   |

அனுமதிப்பட்டியல்கள் (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) வரவுசெலவுத் திட்டங்கள் **அல்ல**, மேலும் அவை மாற்றப்படவில்லை. தேர்ச்சி/தோல்விக் கொள்கை நுழைவாயில்கள் (ரகசியங்கள், SQL விதிகள்,
ஆவணங்கள்/சூழல் ஒப்பந்தம், i18n சமநிலை, அலகுச் சோதனைகள்) மாறவில்லை — தோல்வியடைந்த சோதனை இன்னும் தோல்வியடைந்த சோதனையே.

**கருவிகள்**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ஒருமுறை மட்டுமே செய்யப்படும்
  தளர்த்தல் (`scripts/quality/relax-baselines.mjs`); அதே குறிப்புடன் இரண்டாவது முறை இயங்க மறுக்கும்.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI அளவிடும் அதே முறையில் ஒவ்வொரு எண்ணியல் நுழைவாயிலையும் அளவிட்டு, ஒவ்வொரு நுழைவாயிலிலும் மீதமுள்ள இடவசதியை
  அச்சிடுகிறது (`scripts/quality/baseline-headroom.mjs`). இரவுநேர `baseline-headroom` பணி, செயலில் உள்ள
  **📈 அடிப்படை இடவசதி (வேகக் கட்டம்)** சிக்கலில் அட்டவணையைப் பதிவிட்டு, ஏதேனும் நுழைவாயில் அதன் உச்ச வரம்பிலிருந்து
  10%-க்குள் இருந்தாலோ அல்லது ஏற்கெனவே அதைத் தாண்டியிருந்தாலோ `headroom-alert` லேபிளைச் சேர்க்கிறது. அந்தச் சிக்கலே
  முன்கூட்டிய எச்சரிக்கையாகும்: ஒரு வரவுசெலவுத் திட்டம் சில நாட்களிலேயே நிரம்பினால், அந்தத் தளர்வு முழுக் குழுவாலும்
  அல்லாமல் சில PR-களால் பயன்படுத்தப்படுகிறது என்பதே பொருள் — சிக்கலுக்குரிய நுழைவாயிலின் `_rebaseline_*` குறிப்புகளைப் பார்க்கவும்.

**புதிய-குறியீட்டு முறை (Clean-as-You-Code) — 2026-08-30 முதல், PR விரைவுப் பாதைக்கு மட்டும்**

`pull_request` நிகழ்வுகளில், `quality.yml` ஆனது `--base-ref <PR base SHA>` என்பதை `check:file-size`,
`check:complexity-ratchets` மற்றும் `check:dead-code` ஆகியவற்றுக்கு அனுப்புகிறது. அந்த முறையில், நுழைவாயில் HEAD-ஐ
merge-base உடன், **PR தொட்ட கோப்புகளுக்கு மட்டும் வரையறுத்து**, ஒப்பிடுகிறது (`scripts/check/newCodeMode.mjs`:
merge-base ஒரு தற்காலிக `git worktree`-இல் உருவாக்கப்படுகிறது; ESLint/knip அங்கும் HEAD-இலும் இயக்கப்பட்டு,
ஒவ்வொரு கோப்புக்குமான எண்ணிக்கை வேறுபாடுகள் கணக்கிடப்படுகின்றன):

- **தடுக்கும்** — PR மாற்றிய கோப்புகளில் cyclomatic/cognitive மீறல்கள் அல்லது dead exports-ஐச் சேர்த்தது
  (பதிவில் `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **ஆலோசனை** — நிலையான அடிப்படை வரம்புடன் ஒப்பிடப்பட்ட உலகளாவிய மொத்தம். மரபாகப் பெறப்பட்ட விலகல், குற்றமற்ற
  PR ஒன்றை ஒருபோதும் தோல்வியடையச் செய்யாது; வெளியீட்டு ஒத்திசைவின்போது அந்த விலகல் மீண்டும் நிலைப்படுத்தப்பட்டு, இடவசதிப் பணியால் கண்காணிக்கப்படும்.

`workflow_dispatch` இயக்கங்கள், release-green முழுச் சோதனை மற்றும் இரவுநேர இடவசதிப் பணி ஆகியவற்றுக்கு PR அடிப்படை
இல்லாததால், அவை முழுமையான (உலகளாவிய) ஒப்பீட்டையே தொடர்கின்றன. கவரேஜ், நகலாக்கம் மற்றும் வகை-கவரேஜ் ஆகியவை
தற்போதைக்கு உலகளாவியதாகவே உள்ளன (அவற்றின் கருவிகள் ஒவ்வொரு கோப்புக்குமான வேறுபாட்டைக் குறைந்த செலவில் உருவாக்குவதில்லை) —
அதே அணுகுமுறைக்கான எதிர்காலத் தேர்வுகள்.

**v4.0-இல் கட்டத்தை முடித்தல் (LTS = முன்பைவிடக் கடுமையானது, "இயல்பு நிலைக்குத் திரும்புவது" அல்ல)**

1. தூய `release/v4.0.0` முனையில்: பதிவுக்காக `npm run quality:headroom --json`-ஐ இயக்கி, பின்னர்
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` மற்றும் ஒவ்வொரு typecheck வாயிலின்
   `--update`-ஐ இயக்கவும் — ஒவ்வொரு அடிப்படையும் அளவிடப்பட்ட மதிப்புக்குக் குறையும்.
2. `quality-baseline.json`-இலிருந்து `_policy`-ஐ நீக்கவும் (`--require-tighten` மற்றும் இரவுநேரச்
   சேமிப்பை மீண்டும் செயல்படுத்துகிறது); `check-openapi-coverage.mjs`-இல் `THRESHOLD = 36`-ஐ (அல்லது அதற்கு மேல்) மீட்டமைக்கவும்.
3. தொகுதியாக்கம் பலனளித்த இடங்களில், அளவிடப்பட்ட மதிப்பைக் கடந்தும் இறுக்கமாக்கவும்: file-size `cap`-ஐ மீண்டும் 1000
   (அல்லது 800) ஆகவும், coverage குறைந்தபட்சங்களை +5 ஆகவும், தொகுதியாக்கப்பட்ட package-களுக்கான dead exports-ஐ 0 ஆகவும் அமைக்கவும்.

## ராட்செட் அடிப்படை (`quality-baseline.json`)

ராட்செட் இயந்திரம் (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json`-ஐப் படித்து,
புதிதாகச் சேகரிக்கப்பட்ட `quality-metrics.json` உடன் ஒப்பிடுகிறது. அதன் எப்சிலான் வரம்பைத் தாண்டிப்
பின்னடையும் எந்த அளவீடும் பில்டைத் தோல்வியடையச் செய்யும்.

தற்போது கண்காணிக்கப்படும் அளவீடுகள்:

| அளவீடு                | திசை   | பொருள்                                              |
| --------------------- | ------ | --------------------------------------------------- |
| `eslintWarnings`      | `down` | ESLint எச்சரிக்கைகளின் எண்ணிக்கை அதிகரிக்கக் கூடாது |
| `coverage.statements` | `up`   | ஸ்டேட்மென்ட் கவரேஜ் குறையக் கூடாது                  |
| `coverage.lines`      | `up`   | வரி கவரேஜ் குறையக் கூடாது                           |
| `coverage.functions`  | `up`   | செயல்பாடு கவரேஜ் குறையக் கூடாது                     |
| `coverage.branches`   | `up`   | கிளை கவரேஜ் குறையக் கூடாது                          |

உண்மையான மேம்பாட்டிற்குப் பிறகு அடிப்படையைப் புதுப்பிக்க:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` கொடி தற்போது அளவிடப்பட்ட மதிப்புகளை `quality-baseline.json`-இல் எழுதுகிறது.
அளவீட்டை மேம்படுத்திய மாற்றத்துடன் இந்தக் கோப்பையும் கமிட் செய்யவும். அடிப்படையைப் புதுப்பிக்காமல்
ஒரு அளவீட்டை மேம்படுத்தும் PR, `--require-tighten` மூலம் கண்டறியப்படும் (கட்டம் 6A.5,
செயல்படுத்தல் நிலுவையில் உள்ளது).

### CodeQL ராட்செட்: புதுப்பிப்பு இடைவெளி மற்றும் கைமுறைத் தூண்டல்

`check:codeql-ratchet`, **ஒவ்வொரு PR-க்கும் அல்லாமல், அட்டவணைப்படி புதுப்பிக்கப்படும் ரெப்போ நிலையையே**
படிக்கிறது. `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup`,
`state: configured`, `schedule: weekly` எனத் தெரிவிக்கிறது: இது GitHub-இன் இயல்புநிலை அமைப்பு ஸ்கேன்,
ஒவ்வொரு push-க்கும் செய்யப்படும் பகுப்பாய்வு அல்ல. விளைவு: விழிப்பூட்டல்களைச் சரிசெய்யும் PR மெர்ஜ் செய்யப்பட்ட பிறகு,
அடுத்த திட்டமிடப்பட்ட ஸ்கேன் இயங்கும் வரை ராட்செட் பழைய, அதிகமான எண்ணிக்கையையே தொடர்ந்து படிக்கும் — எனவே ஸ்கேன்
புதுப்பிக்கப்படும் வரை, சரிசெய்த PR-இன் சொந்த தொடர்ச்சிப் PR-கள் உட்பட, திறந்திருக்கும் ஒவ்வொரு PR-இலும் இது பின்னடைவைத் தெரிவிக்கும்.

**கைமுறைப் புதுப்பிப்பு**: `gh workflow run codeql.yml --ref release/vX.Y.Z` பகுப்பாய்வை மீண்டும்
இயக்கி, சில நிமிடங்களுக்குள் விழிப்பூட்டல்களை மீண்டும் வெளியிடுகிறது. முதலில் `.github/workflows/codeql.yml`-ஐப்
படிக்கவும் — GitHub-இன் "இயல்புநிலை அமைப்புடன்" முரண்படுவதன் காரணமாகவே அது `workflow_dispatch`-க்கு மட்டுமே
உரியது என்பதை அதன் தலைப்பு விளக்குகிறது (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). `push`/`pull_request`/
`schedule` தூண்டல்களை மீட்டமைப்பதற்கு முதலில் **உரிமையாளரின் நடவடிக்கை** தேவை: Settings → Code security →
CodeQL: Default → Advanced. அந்த மாற்றத்தைச் செய்யாமல் `schedule:` தூண்டலைச் சேர்க்க வேண்டாம் — அது
தோல்வியடையும் ரன்களை மட்டுமே உருவாக்கும்.

**எண்ணிக்கை குறைந்த பிறகு அடிப்படையை இறுக்கவும்** — `node scripts/check/check-codeql-ratchet.mjs
--update`, புதிதாக அளவிடப்பட்ட எண்ணிக்கையை `quality-baseline.json` →
`metrics.codeqlAlerts.value`-இல் எழுதுகிறது; எனவே பழைய உச்சவரம்பு வரை மீண்டும் ஏற்படும் பின்னடைவை ராட்செட்
மறைமுகமாக அனுமதிக்காது. செயல்முறை எடுத்துக்காட்டு (2026-09-02/03): PR #12502, 7 உண்மையான விழிப்பூட்டல்களைச்
சரிசெய்தது (அளவிடப்பட்ட திறந்த விழிப்பூட்டல்கள் 13 → 6); PR #12530, பொருந்தும் வகையில் உறையவைக்கப்பட்ட அடிப்படையை
11 → 6 என இறுக்கியது; பின்னர் மீதமிருந்த 6 விழிப்பூட்டல்களும் ஒவ்வொன்றிற்குமான நியாயவிளக்கத்துடன் நிராகரிக்கப்பட்டு,
திறந்த விழிப்பூட்டல்களின் எண்ணிக்கை 0 ஆகக் குறைக்கப்பட்டது.

**நிராகரிப்புகள் ஆபரேட்டரின் முடிவு (கடுமையான விதி #14)** — நிராகரிப்புக் கருத்தில் தொழில்நுட்ப
நியாயவிளக்கத்தைப் பதிவு செய்யாமல் ஒருபோதும் CodeQL விழிப்பூட்டலை நிராகரிக்க வேண்டாம்: அப்ஸ்ட்ரீம் நெறிமுறைத்
தேவைக்கு `won't fix`, சோதனை ஃபிக்சருக்கு `used in tests`, CodeQL-ஆல் கண்டறிய முடியாத சுத்திகரிப்பானுக்கு
`false positive` (முன்னுதாரணம்: `docs/security/ERROR_SANITIZATION.md`).

---

## சோதனை மறுமுயற்சிக் கொள்கை (WS5.4, v3.8.49)

மறுமுயற்சி ஒவ்வொரு runner-க்கும் தனிப்பட்டது; ஒருபோதும் ஒட்டுமொத்தமாகப் பயன்படுத்தப்படாது — ஒட்டுமொத்த மறுமுயற்சி உண்மையான பின்னடைவுகளைப் புலப்படாத நிலையற்ற தோல்விகளாக மாற்றிவிடும்:

| Runner           | கொள்கை                                                                                                                                                                               | காரணம்                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | CI-இல் மட்டும் `retries: 1`, மேலும் `trace: on-first-retry`                                                                                                                          | உலாவி/பிணைய நேர அமைவு உண்மையிலேயே நிர்ணயமற்றது; trace உடன் கூடிய ஒரு மறுமுயற்சி, நிலையற்ற தோல்வியை ஆராய்ந்து கண்டறியக்கூடிய artifact-ஆக மாற்றுகிறது |
| Vitest           | ஒட்டுமொத்த மறுமுயற்சி இல்லை. நிலையற்றது என நிரூபிக்கப்பட்ட சோதனைக்கு வெளிப்படையான, ஒவ்வொரு சோதனைக்குமான மறுமுயற்சி வழங்கப்படும் (diff-இல் தெரியும், PR-இல் மதிப்பாய்வு செய்யப்படும்) | தனிமைப்படுத்தப்பட்ட சோதனைகளின் பட்டியலை repo-இல் வெளிப்படையாக வைத்திருக்கிறது                                                                       |
| node:test (unit) | ஒருபோதும் மறுமுயற்சி இல்லை                                                                                                                                                           | நிலையற்ற unit test என்பது சோதனையிலுள்ள பிழை — அதைச் சரிசெய்யுங்கள்; மீண்டும் இயக்கி வெற்றியை எதிர்பார்க்காதீர்கள்                                   |

நிலையற்ற தோல்விகளுக்கான telemetry கிடைத்ததும் இலக்கு SLO-கள் (WS5.2/5.3): ஒவ்வொரு சோதனைக்கும் <1% நிலையற்ற தோல்வி விகிதம்
("உடனே சரிசெய்" வரம்பு), ஒவ்வொரு pipeline-க்கும் ≥95% வெற்றி விகிதம். இவை தொழில்துறை மேற்கோள் மதிப்புகள் —
நமது சொந்த அளவீடுகளுக்கு ஏற்ப மறுஅளவீடு செய்ய வேண்டும்.

## Release-நிலை Ratchet விலகல் (WS5.5, v3.8.49)

ஒரு ratchet (கோப்பு அளவு, சிக்கல்தன்மை, eslint எச்சரிக்கைகள்) தூய release
tip-இல் பின்னடைந்தால் — அதாவது merge-களின் சேர்க்கை அதைப் பின்னடையச் செய்திருந்தாலும், எந்த ஒரு PR-உம் அதன்
சொந்த branch-இல் தனியாக அந்தப் பின்னடைவை மறுஉருவாக்கவில்லை என்றால் — சரிசெய்வது **release captain-இன் பொறுப்பு; ஒருமுறை, release
branch-இல்**: extraction/refactor-ஐ விரும்புங்கள்; ஆவணப்படுத்தப்பட்ட நியாயப்படுத்தல் பதிவு இருந்தால் மட்டுமே baseline-ஐப் புதுப்பியுங்கள்.
சேர்க்கையால் ஏற்பட்ட விலகலை ஒருபோதும் contributor PR மீது திணிக்காதீர்கள்; ஒவ்வொரு PR-க்கும் தனித்தனியாக
baseline-ஐப் புதுப்பிக்காதீர்கள் (அது உண்மையான பின்னடைவுகளை மறைக்கும்). முதலில் வேறுபடுத்திக் கண்டறியுங்கள்: உங்கள் PR அதற்குக் காரணம் எனக் கருதுவதற்கு முன்,
probe worktree ஒன்றில் தூய tip-க்கு எதிராகத் தோல்வியை மறுஉருவாக்குங்கள்.

## Ratchet குறைப்புகளை வங்கிப்படுத்துதல் — கீழ்நோக்கிய திசை (#8584)

Ratchet பாதி மட்டுமே தானியங்கியாக உள்ளது; அதுவும் தவறான பாதி. ஒரு cap-ஐ **உயர்த்துவது** பத்து விநாடிகள் எடுக்கும்
கைமுறை JSON திருத்தம்; தோல்வியடைந்த PR ஒன்றைத் தடையிலிருந்து விடுவிப்பதற்கான மிக விரைவான வழியும் அதுதான்.
ஒரு cap-ஐ **குறைப்பதற்கு**, யாராவது `--update`-ஐ இயக்கி முடிவை commit செய்ய வேண்டும் — மேலும்
`bank-ratchet-shrinks` job அறிமுகமாகும் வரை, எந்த workflow-வும் அதை இயக்கவில்லை. அளவிடப்பட்ட விளைவு
(2026-07-25): 800 வரிகள் என்ற புதிய-கோப்பு cap-க்கு உட்பட்டோ அல்லது அதற்குச் சமமாகவோ ஏற்கனவே உள்ள 18 frozen கோப்புகள்; மிக மோசமானது
132× (`src/shared/validation/schemas.ts`, 2,523 cap-ஐத் தாங்கும் 19 வரிகள்); சிக்கல்தன்மை உச்சவரம்பு ஏறத்தாழ 37 rebaseline குறிப்புகளின் வழியாக
`1794 → 2169` என உயர்ந்தது, அதில் சரியாக ஒரே ஒரு குறைவு மட்டுமே இருந்தது (−1); மேலும் "அடுத்த சுழற்சியில் `--update` வழியாக இறுக்கு" என்று
31 முறை எழுதப்பட்டு, ஒரே ஒரு முறை மட்டுமே நிறைவேற்றப்பட்டது. அதைப் பெற்றுத்தந்த code-ஐ விட நீண்ட காலம் நீடிக்கும் ஒரு cap,
நிறைவடைந்த ஒவ்வொரு decomposition-ஐயும் அடுத்ததாக அந்தக் கோப்பைத் திருத்துபவருக்கான வளர்ச்சி அனுமதியாக அமைதியாக மாற்றுகிறது.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** அந்தச் சுழற்சியை நிறைவு செய்கிறது:

|              |                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| இயங்குவது    | `schedule` (ஒரு நாளுக்கு 3×) + `workflow_dispatch` — திட்டமிட்டே `push` அல்ல                                                         |
| அளவிடுவது    | மிக உயர்ந்த `release/vX.Y.Z`; `release-green` பயன்படுத்தும் அதே resolution + injection guard                                         |
| எழுதுவது     | `check:file-size --update` மற்றும் `check:complexity-ratchets --update` (இரண்டும் வடிவமைப்பிலேயே குறைக்க மட்டும் அனுமதிப்பவை)        |
| சரிபார்ப்பது | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                             |
| வழங்குவது    | release branch-க்கு எதிராக எப்போதும் தற்போதைய நிலையில் இருக்கும் ஒரே ஒரு PR — force-update செய்யப்படும்; ஒருபோதும் spam செய்யப்படாது |

ஒவ்வொரு push-க்கும் பதிலாக banking தொகுதியாகச் செய்யப்படுகிறது; ஏனெனில் அதற்கு latency தேவை இல்லை (8 மணிநேரத்திற்குள்
bank செய்யப்படும் குறைப்பு போதுமானது), ஆனால் ஒவ்வொரு merge-க்கும் இயக்குவது merge campaign-களின்போது PR branch-ஐ மீண்டும் மீண்டும்
உருவாக்குவதோடு, ஒவ்வொரு முறையும் முழுமையான ESLint ஆய்வுக்கான செலவையும் ஏற்படுத்தும். கண்டறிதல் தொடர்ந்து
push-இல் (`release-green`) நடைபெறும்; banking மட்டும் தொகுதியாகச் செய்யப்படுகிறது.

### பாதுகாப்புச் சரிபார்ப்பான்

இந்த job மனிதக் கண்காணிப்பின்றி baseline-களில் எழுதுகிறது; எனவே அதை ஏற்றுக்கொள்ளத்தக்கதாக ஆக்குவது `verify-ratchet-bank.mjs` ஆகும்.
இது `--update`-க்குப் பிந்தைய tree-ஐ `HEAD` உடன் diff செய்து, ஒவ்வொரு மாற்றமும் கீழ்க்கண்டவற்றில் ஒன்றாக இல்லாவிட்டால்,
**எந்த commit-உம் உருவாகும் முன்பே job-ஐ நிறுத்திவிடும்** — எந்த PR-உம் திறக்கப்படாது:

- ஒரு `frozen` / `testFrozen` எண் பதிவு **குறைக்கப்பட்டது** அல்லது **அகற்றப்பட்டது**
- `complexity-baseline.json` → `count` **குறைக்கப்பட்டது**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **குறைக்கப்பட்டது**

வேறு எதுவும் தோல்வியடையும்: எண்ணை உயர்த்துவது, பதிவைச் சேர்ப்பது, `cap`/`testCap`-ஐ மாற்றுவது, அல்லது
`_rebaseline_*` குறிப்பை நீக்குவது/மீண்டும் எழுதுவது (ஒவ்வொரு உச்சவரம்பும் ஏன் உள்ளது என்பதற்கான audit trail அந்தக் குறிப்புகளாகும்;
அவை கோப்புப் பதிவுகள் இருக்கும் அதே `frozen` object-இன் உள்ளே சேமிக்கப்படுகின்றன).
ஒரு cap-ஐ உயர்த்தக்கூடிய bot தற்போதைய நிலையைவிட முற்றிலும் மோசமானதாக இருக்கும். பின்னடைவு
guard: `tests/unit/verify-ratchet-bank.test.ts`.

இந்த job ஒருபோதும் `release/*`-க்கு push செய்யாது — ஒரு மனிதர் PR-ஐ merge செய்வார்; எனவே தவறான அளவீடு
மதிப்பாய்வு இல்லாமல் சேர்க்கப்பட முடியாது.

## அனுமதிப்பட்டியல் கொள்கை

ஏற்கனவே உள்ள மீறல்களால் தோல்வியடையக் கூடாத ஒவ்வொரு வாயிலும் உறையவைக்கப்பட்ட அனுமதிப்பட்டியலைப் பயன்படுத்துகிறது
(எ.கா., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). கொள்கை:

**மூலக் காரணத்தைச் சரிசெய்யுங்கள்; மீறல் ஏற்கனவே இருந்து, அதே PR-இல் அதைச்
சரிசெய்ய முடியாதபோது மட்டுமே அனுமதிப்பட்டியலைப் பயன்படுத்துங்கள்.**

அனுமதிப்பட்டியலில் ஓர் உள்ளீட்டைச் சேர்க்கும்போது:

1. காரணத்தை விளக்கும் ஒரு குறிப்பைச் சேர்க்கவும்.
2. கண்காணிப்புச் சிக்கலைக் குறிப்பிடவும் (எ.கா., `// #3498 — கட்டம் 2 அம்சம், இன்னும் செயல்படுத்தப்படவில்லை`).
3. மீறலைச் சரிசெய்யும் அதே PR-இல் அந்த உள்ளீட்டை அகற்றவும் — செயலிலுள்ள ஒரு மீறலை இனி
   மறைக்காத காலாவதியான உள்ளீடு தானே ஒரு குறைபாடாகும் (6A.3 காலாவதி-அமலாக்கம்
   செயல்படுத்தப்பட்டவுடன், தொடர்பற்ற அனுமதிப்பட்டியல் உள்ளீட்டின் காரணமாக வாயில் தோல்வியடையும்).

சோதனைகளை விரைவாகத் தேர்ச்சி பெறச் செய்வதற்காக அனுமதிப்பட்டியல் உள்ளீடுகளைச் சேர்க்க **வேண்டாம்**. தொடர்ந்து வளர்கின்ற
அனுமதிப்பட்டியலுடன் கூடிய பச்சை வாயில், தரத்தைப் பற்றிய தவறான நம்பிக்கையைத் தருகிறது.

### உங்கள் PR-இல் ஒரு வாயில் தோல்வியடையும்போது

1. **வாயில் வெளியீட்டை கவனமாகப் படிக்கவும்** — எந்தக் கோப்பு அல்லது குறியீடு
   விதியை மீறியது என்பதை அது துல்லியமாகக் கூறும்.
2. **மீறலைச் சரிசெய்யவும்** — பெரும்பாலான வாயில்கள், குறியீடு சரியானவுடன் தேர்ச்சி பெறும்
   நிர்ணயிக்கப்பட்ட கோப்பு முறைமைச் சோதனைகளாகும்.
3. **மீறல் ஏற்கனவே இருந்தால்** (அதாவது, அதை நீங்கள் அறிமுகப்படுத்தவில்லை, ஆனால் வாயில் இப்போது
   அதை உள்ளடக்குகிறது): காரண விளக்கக் குறிப்பு மற்றும் கண்காணிப்புச் சிக்கலுடன் ஓர் அனுமதிப்பட்டியல் உள்ளீட்டைச் சேர்க்கவும்.
4. **வாயில் ஒரு ratchet ஆக இருந்தால்** (coverage, ESLint எச்சரிக்கைகள், நகலாக்கம், சிக்கல்தன்மை):
   உங்கள் மாற்றம் அளவீட்டை மோசமாக்கியுள்ளது. அடிப்படைச் சிக்கலைச் சரிசெய்யவும் அல்லது (அரிதாக) மாற்றம்
   நோக்கமுடையதாகவும் அளவீட்டின் சரிவு ஏற்கத்தக்கதாகவும் இருந்தால்
   `npm run quality:ratchet -- --update`-ஐ இயக்கவும் — ஆனால் PR விளக்கத்தில் அதற்கான காரணத்தை ஆவணப்படுத்தவும்.
5. **ஆலோசனை வாயில்கள்** (`continue-on-error: true`) தகவலுக்காக மட்டுமே — அவை இணைப்பைத்
   தடுக்காது, ஆனால் CI சுருக்கத்தில் தோன்றும். இருந்தாலும் அவற்றைச் சரிசெய்யவும்.

---

## புதிய வாயிலைச் சேர்த்தல்

1. `scripts/check/check-<name>.mjs` (அல்லது `.ts`) உருவாக்கவும். கொள்கை வாயில்கள் 0/1 வெளியேறும் குறியீட்டுடன் முடிவடையும்.
   Ratchet-பாணி வாயில்கள் `collect-metrics.mjs` வழியாக `quality-metrics.json`-க்கு ஓர் அளவீட்டை வெளியிடும்.
2. `package.json`-இல் `"check:<name>": "node scripts/check/check-<name>.mjs"`-ஐச் சேர்க்கவும்.
3. பொருத்தமான பணியின் கீழ் `.github/workflows/ci.yml`-இல் அதை இணைக்கவும்
   (கொள்கை → `lint` அல்லது `docs-sync-strict`; ratchet → `quality-gate`).
4. அதற்கு அனுமதிப்பட்டியல் இருந்தால், காலாவதியான உள்ளீடுகள் தானாகக் கண்டறியப்படுவதற்காக
   `scripts/check/lib/allowlist.mjs`-இலிருந்து `reportStaleEntries()`-ஐப் பயன்படுத்தவும்.
5. வாயிலின் கண்டறிதல் தர்க்கத்தை உள்ளடக்கும் சோதனையை `tests/unit/build/`-இல் எழுதவும்.
6. இந்த ஆவணத்தைப் புதுப்பிக்கவும் (தொடர்புடைய பணியின் அட்டவணையில் ஒரு வரியைச் சேர்க்கவும்).

---

## முகவர் கருவியமைப்பு: சுழற்சிக்குள் LSP (விருப்பத் தேர்வு)

CI வாயில்களுக்கு அப்பால், OmniRoute ஒரு **விருப்பத் தேர்வான** `agent-lsp` அடித்தளத்தை
(திட்ட-நிலை `.mcp.json`, Fase 7 Task 15) வழங்குகிறது. குறியீட்டு முகவர்களுக்கு ஒரு TypeScript மொழிச் சேவையகத்தை வெளிப்படுத்த
`.mcp.json`-ஐ உருவாக்கவும்; இதனால் அவர்கள் குறியீட்டை எழுதுவதற்கு **முன்பே** குறியீடுகள் /
கண்டறிதல்களைத் தீர்மானிப்பார்கள் — மூலத்திலேயே "கற்பனையான குறியீடு" பிழைகளைக் குறைக்கும்
`typecheck:core`-க்கான compile-before-claim துணை இது. இது வேண்டுமென்றே
தானாக ஏற்றப்படுவதில்லை (MCP↔LSP பாலத்தை நீங்கள் தேர்ந்தெடுத்துச் சரிபார்க்க வேண்டும்); பழுதான உள்ளீடு ஓர்
இணைப்புப் பிழையை மட்டுமே பதிவு செய்யும், அமர்வுகளை ஒருபோதும் பாதிக்காது.

---

## சீராக்கல் நிலுவைப் பட்டியல் (ROI மதிப்பாய்வு — கட்டம் 9 அலை 3)

இந்தப் பட்டியல் 2026-06-17 அன்று `ci.yml` உடன் ஒப்பிட்டு சரிசெய்யப்பட்டது (முந்தைய பதிப்பில்
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` ஆகியவை விடுபட்டிருந்தன). சரிசெய்யப்பட்ட தொகுப்பின் ROI மதிப்பாய்வு
பின்வரும் சீராக்கல் வேட்பாளர்களை அடையாளம் கண்டது. **இணைப்புகள் இயந்திரரீதியான CI
மாற்றங்கள்; நிலைமாற்றங்கள்/நீக்கங்கள் இயக்குநருக்காக ஒதுக்கப்பட்ட கொள்கை முடிவுகள்.** கீழே உள்ள எதுவும்
இன்னும் செயல்படுத்தப்படவில்லை.

**மேலே ஆவணப்படுத்தப்படாதவை** (ஆலோசனை மட்டும், குறைந்த சமிக்ஞை): `docs-lint` பணி
(markdownlint + Vale, முழுப் பணிக்கும் `continue-on-error`) மற்றும் தனித்தியங்கும் ஸ்கேனர் பணிப்பாய்வுகளான
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `quality-baseline.json`-இல்
`semgrepFindings: 0` உள்ளது, ஆனால் `ci.yml`-இல் தடுக்கும் ratchet ஒன்றுடன் இணைக்கப்படவில்லை — இந்த அளவீடு
தற்போது தொடர்பற்ற நிலையில் உள்ளது.

### இணைத்தல் / நகல் நீக்கம் (இயந்திரரீதியானது, குறைந்த அபாயம்)

ஒவ்வொரு வேட்பாளரும் 2026-06-17 அன்று நேரடி gate நிலைக்கு எதிராகச் சரிபார்க்கப்பட்டது (நம்பினாலும் சரிபார்);
பல "வெளிப்படையான" இணைப்புகள் கடனை மறைத்திருப்பது தெரியவந்ததால் அவை **தடையின்றி மாற்றக்கூடியவை அல்ல**.

- **`check:docs-sync` இருமுறை இயங்குகிறது** — `lint` பணியில் தனியாகவும், `check:docs-all` (`docs-sync-strict`) மற்றும் husky pre-commit hook ஆகியவற்றுக்குள்ளும் மீண்டும் இயங்குகிறது. ✅ **முடிந்தது** — தனித்த `lint` இயக்கம் நீக்கப்பட்டது.
- **CVE ஸ்கேனிங்** — ❌ **தடையற்ற இணைப்பு அல்ல.** எந்தவொரு high/critical CVE இருந்தாலும் `audit:deps` கடுமையாகத் தோல்வியடைகிறது; `check:vuln-ratchet` (osv), baseline உடன் ஒப்பிடும்போது ஒரு _பின்னடைவு_ ஏற்பட்டால் மட்டுமே தோல்வியடைகிறது (தற்போது 1 MODERATE). பொருளியல் வேறுபட்டது — `audit:deps`-ஐ நீக்குவது முழுமையான high/critical gate-ஐ இழக்கச் செய்யும். இரண்டையும் வைத்திருக்கவும்.
- **சுழற்சி கண்டறிதல்** — ❌ **தடையற்ற இணைப்பு அல்ல.** `check:circular-deps` (dpdm) **91 சுழற்சிகளை** அறிக்கையிடுகிறது (அதனால்தான் அது ஆலோசனை நிலையிலுள்ளது); அவற்றை முதலில் தீர்க்காமல் அதைத் தடுக்கும் நிலைக்கு உயர்த்த முடியாது, மேலும் green நிலையில் உள்ள, தேர்ந்தெடுக்கப்பட்ட `check:cycles`-ஐ விட இதன் நோக்கெல்லை பரந்தது. `check:cycles`-ஐ தடுக்கும் நிலையில் வைத்திருக்கவும்; 91 dpdm சுழற்சிகளைத் தீர்ப்பது தனி நிலுவைப் பணியாகும்.
- **சிக்கல்தன்மை** — ✅ **முடிந்தது** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ஒரே ESLint நடை, ruleId வாரியாக எண்ணுவதால் cyclomatic+max-lines மற்றும் cognitive baseline-கள் தனித்தனியாகவே இருக்கின்றன; தனிப்பட்ட `check:complexity` / `check:cognitive-complexity` உள்ளூர் `--update` பயன்பாட்டிற்காகத் தொடர்ந்து உள்ளன.
- **`/api` தவறான உருவாக்கத் தடுப்பு** — ✅ **முடிந்தது** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`-க்கான ஒரே FS பட்டியல்; openapi-routes + docs-symbols இன்னும் தனித்தனியாக அறிக்கையிடுகின்றன; தனிப்பட்டவை உள்ளூர் இயக்கங்களுக்காகத் தொடர்ந்து உள்ளன.
- **`check:node-runtime` 11 பணிகளில் இயங்குகிறது** — ⚠️ **குறைந்த ROI.** ஒவ்வொன்றும் தனித்தனி runner ஆகும், மேலும் இந்தச் சோதனை <1s மட்டுமே எடுக்கும்; மலிவான ஒவ்வொரு பணிக்குமான பாதுகாப்பை இழப்பதற்கு எதிராக, மொத்தச் சேமிப்பு ~10s மட்டுமே. இந்த மாற்றக் குழப்பத்திற்குத் தகுதியானதல்ல.
- **CI lint-இல் `typecheck:noimplicit:core`** — ✅ **lint பணியிலிருந்து நீக்கப்பட்டது** (ஆலோசனை `continue-on-error` ஆக இருந்தது); தடுக்கும் type surface என்பது `typecheck:core` + `check:type-coverage`. உள்ளூர் script தக்கவைக்கப்பட்டது.

### நிலைமாற்றம் / முடிவு (இயக்குநர் கொள்கை)

- `check:openapi-security-tiers` (ஆலோசனை) — ❌ **தடையின்றி நிலைமாற்ற முடியாது.** இது 0-உடன் வெளியேறுகிறது, ஆனால் `LOCAL_ONLY_API_PREFIXES`-இன் கீழ் உள்ள பல `traffic-inspector` route-களில் `x-loopback-only: true` annotation இல்லை என எச்சரிக்கிறது. இதை அமல்படுத்துவதற்கு முதலில் அந்த annotation-களை `openapi.yaml`-இல் சேர்க்க வேண்டும்.
- `typecheck:noimplicit:core` (ஆலோசனை) — தடுக்கும் `check:type-coverage` ratchet பெரும்பாலும் இதை உள்ளடக்குகிறது. இதை ratchet ஆக மாற்றவும் அல்லது தேவையற்ற இரண்டாவது `tsc` pass-ஐ நீக்கவும்.
- `test:vitest:ui` (இப்போது **தடுக்கும் நிலையில்**) — ஏற்கெனவே இருந்த தோல்விகள் `vitest.config.ts`-இல் `// #8618` கண்காணிப்புக் குறிப்புகளுடன் வெளிப்படையாக விலக்கப்பட்டுள்ளன; புதிய தோல்விகள் பணியைத் தோல்வியடையச் செய்யும்.
- `check:secrets` (gitleaks, ஆவணப்படுத்தப்பட்ட 3 false-positive-களில் உறையவைக்கப்பட்ட தடுக்கும் ratchet) — 0-ஐ அடைய அந்த 3-ஐ allowlist செய்யவும் அல்லது ஆலோசனை நிலைக்குத் தாழ்த்தவும். GitHub-இன் சொந்த secret-scanning + `check:public-creds` உடன் ஒன்றிணைகிறது.
- `check:pr-evidence` (தடுக்கும் நிலையில், PR-body உரையை grep செய்கிறது) — அதிக false-positive அபாயம்; நீக்கப்பட்டால் Hard Rule #18 அமலாக்கம் பலவீனமடையும், எனவே இது உண்மையான கொள்கை முடிவாகும்.
- `semgrep` (தனித்தியங்கும் ஆலோசனை) — OWASP குடும்பங்களுக்கு CodeQL உடன் ஒன்றிணைகிறது; அதன் baseline-ஐ ஒரு ratchet உடன் இணைக்கவும் அல்லது நீக்கவும்.

---

## தொடர்புடைய ஆவணங்கள்

- மென்பொருள் வழங்கல் சங்கிலி (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — விசைத் தொகுப்பு சமநிலைத் தடுப்பு

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, பணி `i18n-ui-coverage`).
ஒவ்வொரு `src/i18n/messages/<locale>.json` கோப்பின் இலை விசைத் தொகுப்பையும் `en.json` உடன் ஒப்பிட்டு,
விசை எப்போது சேர்க்கப்பட்டது என்பதைப் பொருட்படுத்தாமல், இல்லாத அல்லது கூடுதலான எந்த இலை விசைக்காகவும்
தோல்வியடைகிறது. `__MISSING__:` இடநிரப்பிகள் இருப்பதாகக் கணக்கிடப்படுகின்றன (அவற்றின் உள்ளடக்கம்
விகிதத் தடுப்பின் பொறுப்பு). இது diff-அடிப்படையிலான/சதவீத அடிப்படையிலான மற்ற இரண்டு தடுப்புகளின்
முழுமையான நிரப்பியாகும்: `check-ui-keys-coverage` ஒவ்வொரு locale-க்கும் 80 % குறைந்தபட்ச வரம்பைச்
செயல்படுத்துகிறது (~13,000 விசைகளில் 43 இல்லாவிட்டாலும் அது இன்னும் 99.7 % எனக் காட்டும்), மேலும்
`check-new-key-coverage` ஒரு PR `en.json`-இல் சேர்க்கும் விசைகளை மட்டுமே மதிப்பிடுகிறது. ஒரு locale
தொகுதியின் branch பிரிக்கப்படும் நாளில் உள்ள `en.json`-இலிருந்து அது உருவாக்கப்பட்டு, base தொடர்ந்து
விசைகளைச் சேர்த்துக்கொண்டிருக்கும்போது பல நாட்களுக்கு மொழிபெயர்ப்பு நடைபெறுகிறது; அந்தத் தொகுதி PR
தானாக எந்த விசையையும் சேர்ப்பதில்லை. எனவே தொகுதி 1 (#13044) ஒன்பது locale-களில் 43 விசைகள்
குறைவாகவும், தொகுதி 2 (#13660) எட்டு locale-களில் 10 விசைகள் குறைவாகவும் இணைக்கப்பட்டபோது
(2026-09-15), மற்ற இரண்டு தடுப்புகளும் எச்சரிக்கவில்லை. தோல்வியைச் சரிசெய்ய
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` பயன்படுத்தவும்; `extra`
இலை என்பது மூலத்திலிருந்து அது நீக்கப்பட்டதைக் குறிக்கிறது — locale-இலிருந்தும் அதை நீக்கவும்.
`--warn` தோல்வியடையாமல் அறிக்கையிடுகிறது. `--catalog=cli` அதே ஒப்பீட்டை `bin/cli/locales` மீது
இயக்குகிறது (`npm run i18n:check-keys:cli`); இரண்டு படிகளும் `i18n-ui-coverage` பணியில் உள்ளன.

#### `check-new-key-coverage` — புதிய விசைக்கான i18n தடுப்பு

`check-ui-value-drift`-இன் இணைத் தடுப்பு. ஆங்கில மதிப்பு ஒன்று **மீண்டும் எழுதப்பட்டும்** அதன்
மொழிபெயர்ப்புகள் புதுப்பிக்கப்படாமல் விடப்பட்டதை அது கண்டறிகிறது; இது ஆங்கில விசை ஒன்று
**சேர்க்கப்பட்டும்** சில locale-கள் அதைப் பெறாமல் விடப்பட்டதை கண்டறிகிறது.

`check-ui-keys-coverage` இந்த வகையைப் பார்க்க முடியாது: அது ஒவ்வொரு locale-க்கும் ஒரு சதவீத
குறைந்தபட்ச வரம்பைச் செயல்படுத்துகிறது; ~13,000 இலைகளில் பதினொன்று இல்லாவிட்டாலும் coverage
99.9% ஆகவே இருக்கும். ஒரு மொழிக்கான சதவீதத்தால் "இந்த அம்சம் மொழிபெயர்க்கப்படாமல் வெளியிடப்பட்டது"
என்பதை வெளிப்படுத்த முடியாது — ஒரு முழு அம்சமும் எந்த உரையும் இல்லாமல் புதிய locale ஒன்றில்
சேர்க்கப்பட்டாலும் அந்த எண் மாறாமலேயே இருக்கலாம்.

இது பதிவு செய்யும் சம்பவம்: Orchestration Canvas-இன் Phase 3, அப்போது இருந்த 42 locale-களிலும்
அதன் பதினொன்று விசைகளை மொழிபெயர்த்தது. சில மணி நேரங்களுக்குப் பிறகு EU மொழித் தொகுதி (#13044)
repo-வை 51 locale-களாக உயர்த்தியது; புதிதாக வந்த ஒன்பது locale-களும் (`el`, `et`, `ga`, `hr`,
`lt`, `lv`, `mt`, `sl`, `sr`) அந்த விசைகளைப் பெறவில்லை. இல்லாத விசைக்குப் பதிலாக
`deepMergeFallback` ஆங்கிலத்தை வழங்குவதால், வெற்றிட UI-க்குப் பதிலாக மொழிபெயர்க்கப்படாத UI
தோன்றியது — இது உண்மையான தோல்வி; மேலும் வடிவமைப்பின்படியே அமைதியாக இருந்தது.

அதன் இணைத் தடுப்பைப் போலவே இதுவும் **diff-aware** ஆகும்; merge base-இல் உள்ள ஆங்கிலத்தையும்
working tree-ஐயும் ஒப்பிடுவதால், முன்பே இருந்த இடைவெளிகள் உறைந்த நிலையிலேயே இருக்கும்; எனவே
இந்தத் தடுப்பைச் செயல்படுத்த எந்த migration-உம் தேவையில்லை.

**`__MISSING__:<english>` குறியீடு இதை நிறைவேற்றாது (2026-09-17 முதல்).** முன்னர் இது
ஆவணப்படுத்தப்பட்ட ஒத்திவைப்பாக இருந்தது — runtime சரியான ஆங்கிலத்திற்கு fallback ஆகும் — ஆனால்
2026-09-16 அன்று எட்டு அம்ச PR-கள் 61 விசைகளைச் சேர்த்து, அவற்றை மொழிபெயர்ப்பதற்குப் பதிலாக அனைத்து
65 locale-களிலும் அந்தக் குறியீட்டைச் சேர்த்தன: இந்தத் தடுப்பு ஒவ்வொன்றையும் ஏற்றுக்கொண்டது, PR-களை
எதுவும் தடுக்கவில்லை; பின்னர் தடுக்கும் இயல்புடைய உண்மையான மொழிபெயர்ப்பு விகிதத் தடுப்பு release
tip-இல் அனைவருக்கும் தோல்வியடைந்தது (pt-BR 3.2 % > 2.5 % + 0.5). இப்போது ஒரு குறியீடு இல்லாத
மொழிபெயர்ப்பாகவே மதிப்பிடப்படுகிறது. தோல்வியைச் சரிசெய்ய
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`
பயன்படுத்தவும்; அல்லது `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, detached-safe, `OMNIROUTE_TRANSLATION_*` env இல்லாமல்
தொடங்க மறுக்கும்) மூலம் அனைத்து locale-களையும் இணையாகச் செயலாக்கவும். ஆங்கிலத்திலேயே இருக்க
வேண்டிய விசை (நிலையாக நிர்ணயிக்கப்பட்ட product/engine/flag பெயர்)
`scripts/i18n/untranslatable-keys.json`-இல் இருக்க வேண்டும்; ஒருபோதும் ஒரு குறியீட்டின் பின்னால்
இருக்கக் கூடாது. `vi` குறியீடுகளை முற்றிலும் தடை செய்கிறது
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — ஒத்திவைக்கப்பட்ட சோதனைத் தடுப்பு

`vitest.config.ts`-இன் `exclude` பட்டியலில் உள்ள ஒரு கோப்பு இயங்காத சோதனையாகும்; ஆனால் tree-ஐப்
பார்ப்பவருக்கு அது coverage போலத் தோன்றும். அறுபத்திரண்டு கோப்புகள்
`// #8618 — pre-existing failure; remove this exclusion when fixed` என்ற comment-க்குப் பின்னால்
சேர்ந்திருந்தன. Issue #8618, 2026-08-11 அன்று மூடப்பட்டது; ஆனால் அது கண்காணித்த பட்டியல் 45
உள்ளீடுகளிலிருந்து 62 ஆக வளர்ந்தது, ஒவ்வொரு புதிய உள்ளீடும் செயலற்ற issue-ஐச் சுட்டும் comment-ஐப்
பெற்றிருந்தது. இறுதியாக அந்தப் பட்டியல் கோப்பு வாரியாக அளவிடப்பட்டபோது (#13204), **62 கோப்புகளில்
51 தற்போதைய tree-க்கு எதிராக எந்த மூல மாற்றமும் இல்லாமல் தேர்ச்சி பெற்றன**.

உண்மையான கோப்பாக resolve ஆகும் ஒவ்வொரு exclusion-உம் (a) ஒரு tracking issue-ஐக் குறிப்பிடவும்,
(b) அதன் அளவிடப்பட்ட நிலையுடன் `config/quality/vitest-exclusions.json`-இல் இடம்பெறவும் இந்தத்
தடுப்பு கட்டாயப்படுத்துகிறது. இதனால் ஒன்றைச் சேர்ப்பது, 60 உள்ளீடுகளைக் கொண்ட array-இல் மேலும்
ஒரு வரியாக இல்லாமல், அதற்கென ஒதுக்கப்பட்ட கோப்பில் மதிப்பாய்வு செய்யக்கூடிய diff ஆகிறது. இது
வேண்டுமென்றே விலக்கப்பட்ட சோதனைகளை மீண்டும் இயக்குவதில்லை — அதற்கு ~10 நிமிடங்கள் செலவாகும்;
அது ஒரு காலமுறைப் பணிக்குரியது. ஒவ்வொன்றும் கடைசியாக எப்போது அளவிடப்பட்டது என்பதை inventory
பதிவு செய்கிறது.
