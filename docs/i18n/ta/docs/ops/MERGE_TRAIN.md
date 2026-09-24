# Merge Queue & Manual Merge-Train Runbook (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 முதல் (தரம்/வேகத் திட்டத்தின் WS3.2/WS3.4), மதிப்பாய்வு செய்யப்பட்ட PR-களை
`release/vX.Y.Z`-இல் இணைப்பதற்கான இயல்புநிலைப் பாதை **Mergify இணைப்பு வரிசை**
(`.mergify.yml`) ஆகும்; கீழே ஆவணப்படுத்தப்பட்டுள்ள **கைமுறை merge-train** என்பது
மாற்று ஏற்பாடாகும் — இது சம்பவங்கள், வெளியீட்டு முடக்கங்கள் அல்லது Mergify Open Source
திட்டம் எப்போதாவது மாறினால் பயன்படுத்தப்படும்.

## இயல்புநிலைப் பாதை: Mergify வரிசை

1. PR, campaigns மூலம் மதிப்பாய்வு செய்யப்பட்டு/பச்சை நிலையைப் பெற்று, உரிமையாளரின்
   இணைப்புக்கு முந்தைய ⭐ gate மூலம் அங்கீகரிக்கப்படுகிறது (அறிக்கை + ஒவ்வொரு உருப்படிக்குமான
   முடிவு — `/merge-prs` படி 0.75-ஐப் பார்க்கவும்).
2. உரிமையாளர் (அல்லது உரிமையாளரின் முடிவின்படி செயல்படும் session) **`queue`**
   label-ஐப் பயன்படுத்துகிறார். அந்த label-தான் இணைப்பு அங்கீகாரம்; Mergify அதை
   செயல்படுத்துவது மட்டுமே.
3. Mergify வரிசையில் உள்ள அதிகபட்சம் 10 PR-களைத் தொகுப்பாக்கி, அந்தத் தொகுப்பை
   fast-gates-க்கு எதிராகச் சரிபார்த்து, இணைக்கிறது (squash). சிவப்பு நிலைத் தொகுப்பு
   **தானாகவே இரண்டாகப் பிரிக்கப்படுகிறது** — சிக்கலுக்குரிய PR சுமார் log2(N)
   மறுசரிபார்ப்புகளில் தனிமைப்படுத்தப்பட்டு வரிசையிலிருந்து நீக்கப்படும்; மீதமுள்ளவை தொடரும்.
4. இணைப்புக்குப் பிறகு, தொடர்ச்சியான release-green workflow, push செய்யப்படும்போது
   புதிய tip-ஐச் சரிபார்த்து, அந்தச் சேர்க்கை regression-ஐ ஏற்படுத்தியிருந்தால் attribution
   issue ஒன்றைத் திறக்கும் (ஒருபோதும் தானாக revert செய்யாது).

பாதுகாப்பு வரம்புகள் (`CLAUDE.md` கடுமையான விதிகள் #21/#22-ஐப் பிரதிபலிக்கின்றன):

- **வெளியீட்டு முடக்கம் நடைமுறையில் உள்ளது** → முடக்கப்பட்ட branch-ஐ இலக்காகக் கொண்ட
  PR-களுக்கு label இட வேண்டாம்; முதலில் செயலில் உள்ள `release/vX+1`-க்கு retarget
  செய்யவும்.
- **வேறொரு session-இன் செயல்பாட்டிலுள்ள PR** → அதற்கு ஒருபோதும் label இட வேண்டாம்;
  உரிமையுள்ள session மட்டுமே தனது பணியை வரிசைப்படுத்த வேண்டும்.
- Tests-only diff-களும் `hotfix` label கொண்ட PR-களும் ஏற்கெனவே குறைக்கப்பட்ட CI-ஐ
  இயக்குகின்றன (`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane-ஐப் பார்க்கவும்); உண்மையில்
  இயக்கப்பட்ட எந்த check தொகுப்பையும் வரிசை நிபந்தனைகள் ஏற்கும்
  (`#check-failure=0` + `#check-pending=0`).

## மாற்று ஏற்பாடு: கைமுறை merge-train

வரிசை கிடைக்காதபோது இது பயன்படுத்தப்படும். v3.8.47 சுழற்சியின்போது ஒரே நாளில் 33
PR-களைத் தீர்த்த நடைமுறையை இது முறைப்படுத்துகிறது:

1. **தொகுப்பை அமைக்கவும்** (மதிப்பாய்வு செய்யப்பட்டு+அங்கீகரிக்கப்பட்ட சுமார் 10–30
   PR-கள்). `linked:` மோதல்களைச் சரிபார்த்து (ஒரே `tap.testFiles`, ஒரே CHANGELOG
   பகுதிகள்), அவற்றை வரிசையாகச் செயல்படுத்தவும்.
2. **ஒரே முறை சரிபார்க்கவும்**: release tip-இலிருந்து உருவாக்கப்பட்ட தனிமைப்படுத்தப்பட்ட
   worktree-இல், தொகுப்பின் எல்லா head-களையும் உள்ளூரில் இணைத்து, பின்னர் வெளியீட்டுக்குச்
   சமமான suite-ஐ இயக்கவும் (`npm run check:release-green`; வெளியீட்டுக்கு முன்
   `--with-build`-ஐச் சேர்க்கவும்).
   `scripts/release/merge-train.sh <base> <PR#>…` படிகள் 1–2-ஐத் தானியக்கமாக்குகிறது
   (மோதலுள்ள PR-கள் வெளியேற்றப்படும்; train தொடர்ந்து இயங்கும்). Full mode,
   `npm run test:unit`-ஐ இயக்குகிறது — இது box-க்கு ஏற்பச் சீரமைக்கப்பட்ட runner
   (`--test-concurrency=20`); தொடர்ச்சியாக இயங்கும் இரண்டு 4-core CI shard-கள்
   **அல்ல**, அவை 16-core box ஒன்றில் முதன்மைக் கட்டத்தை சுமார் 25% பயன்பாட்டிலேயே
   இயக்கின (2026-07-18 அன்று சரிசெய்யப்பட்டது). `--fast` (ஒரே நாளுக்குள்
   mega-train-களைத் தீர்த்தல், உரிமையாளரால் 2026-07-18 அன்று அங்கீகரிக்கப்பட்டது)
   ஒவ்வொரு static gate + vitest-ஐயும் வைத்துக்கொண்டு, train-இல் ஏற்றப்பட்ட PR-களால்
   மாற்றப்பட்ட node:test கோப்புகளை மட்டும் இயக்குகிறது; இருப்பினும் குவிக்கப்பட்ட tip-இல்
   FULL suite நாளொன்றுக்கு குறைந்தது ஒருமுறையாவது இயக்கப்பட வேண்டும் (`--fast`
   இல்லாத ஒரு train).
3. **பச்சை நிலை** → PR-களை வரிசையாக இணைக்கவும் (ஒவ்வொன்றுக்கும் முன்
   `state,headRefOid`-ஐ மீண்டும் சரிபார்க்கவும் — head மாறிய PR மீண்டும் மதிப்பாய்வுக்குச்
   செல்லும்). ஒவ்வொரு இணைப்பின் நிகர diff-உம் அந்த PR-க்கே உரிய மாற்றம் என்பதை
   நிரூபிக்கவும் (தானியக்கமாகத் தீர்க்கப்பட்ட revert-கள் கூடாது: வரம்புக்கு வெளியான
   நீக்கங்களுக்காக `git diff --stat`-ஐத் தணிக்கை செய்யவும்).
4. **சிவப்பு நிலை** → ஒவ்வொன்றாக மறுசரிபார்ப்பதற்குப் பதிலாகத் தொகுப்பை இரு பாதிகளாகப்
   பிரிக்கவும் (ஒவ்வொரு பாதியையும் சரிபார்க்கவும்); சிக்கலுக்குரிய PR-ஐ ஆதாரத்துடன்
   மீண்டும் மதிப்பாய்வு வரிசைக்குத் திருப்பவும்.
5. **ஒருபோதும் செய்யக்கூடாதவை**: முடக்கத்தின் போது முடக்கப்பட்ட branch-இல் இணைத்தல்;
   எங்கும் `git stash` பயன்படுத்துதல்; சிவப்பு நிலை மறைந்துவிடும் என நம்பி CI-ஐ
   முழுமையாக மீண்டும் இயக்குதல் (விதி: சிவப்பு நிலை என்பது தகவல்).

## அடுக்குகள் (fast-gates மட்டும் இருந்தாலும் வரிசை ஏன் பாதுகாப்பானது)

- **ஒவ்வொரு PR-க்கும்** (quality.yml fast-gates): TIA-வால் பாதிக்கப்பட்ட tests +
  முழுமையான unit 4-shard + vitest + lint bag + typecheck + docs/changelog ஒருமைப்பாடு.
- **ஒவ்வொரு தொகுப்பு/tip-க்கும்** (தொடர்ச்சியான release-green): release branch-க்கு
  செய்யப்படும் ஒவ்வொரு push-லும் `--quick` HARD gates; நாளொன்றுக்கு 3 முறை முழுமையான
  `--with-build --full-ci` sweep-கள்.
- **ஒவ்வொரு வெளியீட்டுக்கும்** (release PR-இல் ci.yml): E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets உள்ளிட்ட முழுமையான matrix.

முன்பைவிட எதுவும் குறைவாகச் சரிபார்க்கப்படவில்லை — கனமான சோதனைப் பரப்பு ஒவ்வொரு
PR-க்கும் பதிலாக ஒவ்வொரு தொகுப்பு/tip-க்கும் இயக்கப்படுகிறது; இதுவே O(N)
சுற்றுப்பயணங்களை நீக்குகிறது.
