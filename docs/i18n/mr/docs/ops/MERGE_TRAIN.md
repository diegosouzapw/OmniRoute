# Merge Queue & Manual Merge-Train Runbook (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 पासून (quality/velocity योजनेतील WS3.2/WS3.4), पुनरावलोकन केलेले PRs
`release/vX.Y.Z` मध्ये विलीन करण्याचा डीफॉल्ट मार्ग **Mergify merge queue** (`.mergify.yml`)
आहे; खाली दस्तऐवजीकरण केलेली **manual merge-train** ही FALLBACK आहे — ती incidents,
release freezes दरम्यान किंवा Mergify Open Source योजना कधी बदलल्यास वापरली जाते.

## डीफॉल्ट मार्ग: Mergify रांग

1. PR चे campaigns द्वारे पुनरावलोकन केले जाते/त्याला हिरवा कंदील दिला जातो आणि मालकाच्या प्री-मर्ज ⭐
   गेटद्वारे मंजुरी दिली जाते (अहवाल + प्रत्येक घटकासाठी निर्णय — `/merge-prs` मधील पायरी 0.75 पहा).
2. मालक (किंवा मालकाच्या निर्णयानुसार कार्य करणारे सत्र) **`queue`**
   लेबल लावतो. हे लेबल म्हणजेच मर्जची मंजुरी; Mergify केवळ तिची अंमलबजावणी करते.
3. Mergify रांगेतील PRs ची fast-gates विरुद्ध **क्रमशः** (एका वेळी एक) पडताळणी
   करते आणि मर्ज (squash) करते. बॅचिंग + स्वयंचलित द्विभाजन हे सशुल्क Mergify स्तराचे
   वैशिष्ट्य आहे (मोफत योजनेवर "Cannot use Merge Queue batch", #7220), त्यामुळे `.mergify.yml` मध्ये
   `batch_size` सेट केलेले नाही; बॅचिंगचे काम खालील मॅन्युअल merge-train कडेच राहते. ज्या PR च्या
   तपासण्या `checks_timeout` नंतरही प्रलंबित असतात (240 मिनिटे = `quality.yml` च्या
   मोजलेल्या p95 च्या 2×), तो रांग अडवण्याऐवजी रांगेतून काढला जातो.
4. मर्जनंतर, सतत चालणारा release-green workflow push झाल्यावर नवीन tip ची पडताळणी
   करतो आणि या संयोजनामुळे regression झाल्यास attribution issue उघडतो (कधीही आपोआप revert करत नाही).

सुरक्षानियम (`CLAUDE.md` मधील कठोर नियम #21/#22 चे प्रतिबिंब):

- **Release freeze सुरू आहे** → गोठवलेल्या branch ला लक्ष्य करणाऱ्या PRs ना लेबल लावू नका; प्रथम
  सक्रिय `release/vX+1` कडे पुन्हा लक्ष्यित करा.
- **दुसऱ्या सत्राचा प्रगतीपथावरील PR** → त्याला कधीही लेबल लावू नका; केवळ मालकी असलेले सत्र
  स्वतःचे काम रांगेत लावते.
- केवळ tests असलेले diffs आणि `hotfix` लेबल असलेले PRs आधीच कमी केलेले CI चालवतात (पहा
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); प्रत्यक्षात चाललेल्या कोणत्याही
  check संचाला रांगेच्या अटी स्वीकारतात (`#check-failure=0` + `#check-pending=0`).

## पर्यायी मार्ग: manual merge-train

Queue अनुपलब्ध असताना हा वापरला जातो. यामध्ये v3.8.47 cycle दरम्यान
एका दिवसात 33 PRs पूर्ण करण्यासाठी वापरलेली पद्धत संहिताबद्ध केली आहे:

1. **Batch तयार करा** (पुनरावलोकन+मंजुरी झालेले सुमारे 10–30 PRs). `linked:` collisions
   (समान `tap.testFiles`, समान CHANGELOG hunks) तपासा आणि त्यांना क्रमाने हाताळा.
2. **एकदाच प्रमाणीकरण करा**: release tip वर आधारित स्वतंत्र worktree मध्ये batch मधील सर्व
   heads स्थानिकरीत्या merge करा आणि नंतर release-equivalent suite चालवा
   (`npm run check:release-green`; release पूर्वी `--with-build` जोडा).
   `scripts/release/merge-train.sh <base> <PR#>…` द्वारे steps 1–2 स्वयंचलित होतात (संघर्ष करणारे
   PRs बाहेर काढले जातात आणि train पुढे सुरू राहते). Full mode मध्ये `npm run test:unit` चालते —
   box साठी अनुकूल केलेला runner (`--test-concurrency=20`), **दोन क्रमिक 4-core CI
   shards नव्हे**, ज्यांमुळे प्रमुख phase मध्ये 16-core box च्या केवळ सुमारे 25% क्षमतेचा वापर होत होता
   (2026-07-18 रोजी दुरुस्त केले). `--fast` (दिवसभरातील mega-train drains साठी,
   मालकाने 2026-07-18 रोजी मंजूर केलेले) प्रत्येक static gate + vitest कायम ठेवते, मात्र
   onboard केलेल्या PRs मुळे बदललेल्या node:test files एवढ्याच चालवते; जमा झालेल्या tip वर
   FULL suite तरीही दिवसातून किमान एकदा चालवली पाहिजे (`--fast` शिवाय एक train).
3. **Green** → PRs क्रमाने merge करा (प्रत्येकापूर्वी `state,headRefOid` पुन्हा तपासा —
   ज्या PR चा head बदलला आहे तो पुन्हा review मध्ये जातो). प्रत्येक merge चा net diff
   हा त्या PR चाच बदल आहे हे सिद्ध करा (auto-resolve reverts करू नका: कार्यक्षेत्राबाहेरील
   deletions साठी `git diff --stat` चे audit करा).
4. **Red** → एकेक करून पुन्हा प्रमाणीकरण करण्याऐवजी batch चे अर्ध्या भागांत द्विभाजन करा
   (प्रत्येक अर्ध्या भागाचे प्रमाणीकरण करा); अडथळा आणणारा PR पुराव्यासह review queue मध्ये परत पाठवा.
5. **कधीही करू नका**: freeze दरम्यान frozen branch मध्ये merge करणे; कुठेही `git stash`
   वापरणे; red अदृश्य होईल या आशेने CI सरसकट पुन्हा चालवणे (नियम: red म्हणजे माहिती).

## स्तररचना (केवळ fast-gates सह queue सुरक्षित का आहे)

- **प्रत्येक PR साठी** (quality.yml fast-gates): TIA-प्रभावित tests + पूर्ण unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog integrity.
- **प्रत्येक batch/tip साठी** (continuous release-green): release branch कडे होणाऱ्या प्रत्येक
  push वर `--quick` HARD gates; दिवसातून 3 वेळा पूर्ण `--with-build --full-ci` sweeps.
- **प्रत्येक release साठी** (release PR वरील ci.yml): E2E ×9 सह संपूर्ण matrix,
  package-artifact + tarball boot-smoke, coverage/ratchets.

पूर्वीपेक्षा कमी प्रमाणीकरण कशाचेही होत नाही — मोठ्या संसाधनांची आवश्यकता असलेला भाग आता
प्रत्येक PR ऐवजी प्रत्येक batch/tip साठी चालतो आणि त्यामुळेच O(N) round-trips दूर होतात.

## `merge-train.sh` साठी fresh-checkout पूर्वावश्यकता

Script root checkout वर (कोणतेही worktree काम सुरू होण्यापूर्वी) fail-fast **preflight**
चालवते, जेणेकरून बिघडलेली installation कधीही red train असल्याचा भास निर्माण करू शकणार नाही:

1. `npm ci`, त्यानंतर npm ने block केलेले `bun` postinstall चालवा:
   `(cd node_modules/bun && node install.js)` — अन्यथा `check:provider-consistency`
   आणि `check:known-symbols` (दोन्ही `bun scripts/…`) train आणि base दोन्हींवर
   कोणत्याही violation line शिवाय fail होतात.
2. अनावश्यक `node_modules/node_modules` नसावे (duplicate dependency tree; React दोनदा load होते
   आणि UI vitest suites तत्काळ fail होतात).
3. `node_modules/.bin/tsc` अस्तित्वात आणि executable असावे (अपूर्ण installation मध्ये ते नसते).

Train blocking `npm run check:cycles:ratchet` चालवते; केवळ `npm run check:cycles`
हे advisory आहे (ते SCCs ची यादी देते आणि निरोगी base वरही non-zero exit करते).
