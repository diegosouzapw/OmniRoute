# Release-Green: keeping the queue and release branch green (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## இது தீர்க்கும் பிரச்சினை

**முழுமையான கேட்** (`.github/workflows/ci.yml` — unit shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) **release PR-இல் மட்டுமே** (PR → `main`) இயங்குகிறது. `release/**`-ஐ இலக்காகக் கொண்ட PR-கள்
**fast-gates**-ஐ (`quality.yml`: TIA-வால் பாதிக்கப்பட்ட சோதனைகள் + typecheck + lint)
பெறுகின்றன; மேலும், குறியீட்டு மாற்றங்களுக்கு, **ஆலோசனைத் தன்மையிலான** production build ஒன்றையும் பெறுகின்றன. இதன் விளைவாக: release-இல் மட்டுமே தோன்றும் red-கள் release branch-இல் கவனிக்கப்படாமல் குவிந்து, release நேரத்தில்
**ஒவ்வொன்றாக, ~40 நிமிட அடுக்குகளாக வெடிக்கக்கூடும்**.

"release-green குடும்பம்", அந்த red-களை **முன்கூட்டியே அறிய** உருவாக்கப்பட்டுள்ளது — முழுமையான
கேட்டிற்கு இணையானதை எந்த நேரத்திலும் **உள்ளூரில் / release-க்கு வெளியே** சரிபார்ப்பதன் மூலம், release PR அதன் முதல் CI இயக்கத்திலேயே
green ஆக இருப்பதை உறுதிசெய்கிறது.

> **பேச்சுவார்த்தைக்கே இடமில்லாத கொள்கை:** இதில் எதுவும் பங்களிப்பாளரைத் தடுக்காது. அவர்களின் PR தோல்வியடையச் செய்யும் கட்டாய
> check ஒன்றை நாங்கள் சேர்ப்பதில்லை. **drift** (ratchets) என்பது release நேரத்தில் maintainer மறுபடி baseline அமைப்பதற்கானது —
> அது ஒருபோதும் பங்களிப்பாளரின் பொறுப்பு அல்ல. எந்தப் பகுதியும் PR-ஐ **மூடுவதில்லை** (credit theft), மேலும்
> தேர்ச்சி பெறுவதற்காக எந்தச் சோதனையையும் **பலவீனப்படுத்துவதில்லை**.

## இந்தக் குடும்பம் (4 பகுதிகள்) — ஒவ்வொன்றும் எவ்வாறு தனித்தனியாக இயங்குகிறது

| பகுதி                                                                    | அது என்ன                                                                                                      | எப்போது இயக்க வேண்டும்                                                        | வரம்பு                                 |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------- |
| **`/green-prs`** (தீர்வு A)                                              | **திறந்த PR-களின் வரிசையை** maintainer தேவைக்கேற்ப scan செய்வது                                               | **தனித்தனியாக, அவ்வப்போது** — குறிப்பாக ஒரு `/generate-release`-க்கு **முன்** | முழு PR வரிசை → `release/**`           |
| **`/validate-release-green`** (தீர்வு C — `npm run check:release-green`) | சரிபார்ப்பு engine: ஒரு branch அல்லது merge candidate-க்கு எதிராக முழுமையான கேட்டை மீண்டும் செயல்படுத்துகிறது | தனித்தனியாக, எந்த நேரத்திலும்                                                 | ஒரு குறிப்பிட்ட branch அல்லது merge-PR |
| **`/babysit <PR#>`**                                                     | **ஒரு** PR-இன் **நேரடி CI**-ஐ green நிலைக்கு வழிநடத்துகிறது                                                   | தனித்தனியாக, ஒவ்வொரு PR-க்கும்                                                | ஒரு தனிப்பட்ட PR                       |
| **`nightly-release-green.yml`** (தீர்வு D)                               | தானியக்க nightly workflow; HARD red ஏற்பட்டால் issue-ஐத் திறக்கிறது                                           | தானாக (cron)                                                                  | செயலில் உள்ள release branch            |

**"இது release-களுக்காக மட்டும்தானா?" என்பதற்கான சுருக்கமான பதில்:** **இல்லை.** `/green-prs`,
**release-களுக்கு இடையில், அவ்வப்போது** இயங்குவதற்காக வடிவமைக்கப்பட்டது. தனித்தனியாக இயக்குவதே இயல்பான பயன்பாடு — release என்பது
அதை இயக்குவதால் அதிகபட்ச மதிப்பு கிடைக்கும் தருணம் மட்டுமே.

## PR-இலிருந்து-release வரையிலான ஆலோசனை build

`quality.yml` இப்போது draft அல்லாத code PR-களுக்கும் Mergify queue branch-களுக்கும் `Build (advisory)`-ஐ உள்ளடக்கியுள்ளது.
இது `ci.yml`-இல் உள்ள production build செய்முறையைப் பிரதிபலிக்கிறது: Node 24, `npm-ci-retry`,
`check:node-runtime`, மற்றும் `OMNIROUTE_USE_TURBOPACK=1` உடன் `npm run build`. இந்த workflow-இல் எந்த downstream quality job-உம் build artifact-ஐப் பயன்படுத்தாததால், இது வேண்டுமென்றே ஒன்றைப் பதிவேற்றுவதில்லை.
ஒரு வாரம் நிலையான release-PR இயக்கங்களுக்குப் பிறகு `continue-on-error`-ஐ அகற்றுங்கள்; இதனால் இந்தச் சமிக்ஞை தடுக்கும் தன்மையுள்ள
PR-to-release gate ஆக மாறும்.

## தீர்வு C — `npm run check:release-green` (engine)

தற்போதைய working tree-க்கு எதிராக release-க்கு நிகரான validation-ஐ மறுஉருவாக்கி, ஒவ்வொரு red-ஐயும் வகைப்படுத்துகிறது:

- **HARD** (typecheck, lint பிழைகள், unit, vitest, db-rules, public-creds, விருப்பத்திற்குரிய
  `package-artifact`) → **உண்மையான குறைபாடு**; `exit 1`. Source branch-இல் சரிசெய்யப்படும் (TDD, Rule #18).
- **DRIFT** (eslint **எச்சரிக்கைகள்**, cognitive-complexity, file-size) → cycle-இல் திரண்ட ratchet drift,
  **contributor-இன் தவறு அல்ல**; இது அறிக்கையிடப்படுவது மட்டுமே, மேலும் **release நேரத்தில் maintainer-ஆல் rebaseline செய்யப்படும்**.
  Drift வெளியேறும் code-ஐ **ஒருபோதும்** மாற்றாது — எனவே அது எவரையும் ஒருபோதும் தடுக்காது.

```bash
npm run check:release-green                 # தற்போதைய branch (working tree)
node scripts/quality/validate-release-green.mjs --json   # கட்டமைக்கப்பட்ட output
node scripts/quality/validate-release-green.mjs --quick  # unit+vitest-ஐத் தவிர்க்கிறது (drift+typecheck+lint மட்டும்)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact-ஐ உள்ளடக்குகிறது (மெதுவானது)
```

கண்டறிந்து **அறிக்கையிடுவது** மட்டுமே (தானியங்கு சரிசெய்தல் இல்லை). Green நிலைக்குச் சரிசெய்வதற்கான orchestration
`/green-prs` மற்றும் `/review-prs`-இல் உள்ளது.

## தீர்வு A — `/green-prs` (queue scan)

செயல்முறை (சுருக்கம் — விவரங்களுக்கு `green-prs` skill-ஐப் பார்க்கவும்):

1. செயலில் உள்ள release branch-க்கு எதிரான திறந்த PR-களின் queue-ஐ **பட்டியலிடவும்**.
2. ஒவ்வொரு PR-ஐயும் **வகைப்படுத்தவும்** (viable / reject-worthy / needs-author) — reject/needs-author ஆகியவை
   **அறிக்கையிடப்படும், மூடப்படாது** (author முடிவு செய்வார்).
3. ஒவ்வொரு viable PR-க்கும், ஒரு **தனிமைப்படுத்தப்பட்ட worktree**-இல் (Rule #19), PR-ஐ release tip-க்குக் கொண்டு வந்து
   `npm run check:release-green`-ஐ இயக்கவும்:
   - **HARD** → co-authorship வழியாக **contributor-இன் branch-இலேயே** சரிசெய்யவும் (author-இன் "Merged" நிலையைப் பாதுகாக்கிறது);
     அனைத்து HARD-களும் நீங்கும் வரை மீண்டும் இயக்கவும்.
   - **DRIFT** → அப்படியே விடவும்; release நேரத்தில் அது rebaseline செய்யப்படும்.
4. PR × (தீர்ப்பு, HARD red-கள், சரிசெய்யப்பட்டதா?, DRIFT, இப்போது release-green-ஆ?) அட்டவணையை **அறிக்கையிடவும்**.

Merge செய்யாமலேயே queue-ஐ **தயாரிக்க** முடியும்; வெளிப்படையாகக் கோரப்பட்டால் மட்டுமே merge செய்யும் — மேலும் ஒரு PR-ஐ ஒருபோதும் மூடாது.

## பரிந்துரைக்கப்படும் காலமுறை

- **`/green-prs`-ஐ அவ்வப்போது இயக்கவும்** (எ.கா., வாரந்தோறும்), மேலும்
  `/generate-release`-க்கு முன் **எப்போதும்** இயக்கவும்.
- **`nightly-release-green.yml`**-ஐ (தீர்வு D) தொடர்ச்சியான சமிக்ஞையாக வைத்திருக்கவும்: அது ஒரு
  HARD red issue-ஐத் திறக்கும்போது, scan செய்வதற்கான நேரம் வந்துவிட்டது.
- ஒரு branch அல்லது குறிப்பிட்ட merge candidate-ஐச் சரிபார்க்க, தேவைக்கேற்ப **`/validate-release-green`**-ஐப் பயன்படுத்தவும்.
- குறிப்பிட்ட PR ஒன்றை live CI-இல் green நிலைக்குக் கொண்டு செல்ல வேண்டியிருக்கும்போது **`/babysit <PR#>`**-ஐப் பயன்படுத்தவும்.

## Release-உடனான தொடர்பு

- `/generate-release`, **Phase 0 (pre-flight)**-இல் validation-ஐ அழைக்கிறது: release PR-ஐத் திறப்பதற்கு முன் DRIFT-ஐ rebaseline செய்து,
  HARD-ஐச் சரிசெய்கிறது.
- `/review-prs`, merge முடிவு படியில் release-green gate-ஐப் பயன்படுத்துகிறது (merge செய்வதற்கு முன் green).

அனைத்துப் பகுதிகளின் இலக்கும் ஒன்றே: release நாளில் 40 நிமிட அடுக்குகளாக வரும்
red-களைத் தொடர்ந்து சமாளிப்பதற்குப் பதிலாக, **முதல் CI இயக்கத்திலேயே ஒரு green release PR**.
