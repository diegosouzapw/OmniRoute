# Merge Queue & Manual Merge-Train Runbook (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 पासून (quality/velocity योजनेतील WS3.2/WS3.4), पुनरावलोकन केलेले PRs
`release/vX.Y.Z` मध्ये विलीन करण्यासाठी डीफॉल्ट मार्ग **Mergify merge queue** (`.mergify.yml`)
आहे; खाली दस्तऐवजीकरण केलेला **manual merge-train** हा पर्यायी मार्ग आहे — तो घटनांदरम्यान,
रिलीज फ्रीझच्या वेळी किंवा Mergify Open Source योजना कधी बदलल्यास वापरला जातो.

## डीफॉल्ट मार्ग: Mergify queue

1. मोहिमांद्वारे PR चे पुनरावलोकन झालेले/तो हिरवा झालेला असतो आणि मालकाच्या pre-merge ⭐
   gate द्वारे त्याला मंजुरी मिळालेली असते (अहवाल + प्रत्येक घटकावरील निर्णय — `/merge-prs` Step 0.75 पहा).
2. मालक (किंवा मालकाच्या निर्णयानुसार काम करणारे सत्र) **`queue`**
   लेबल लावतो. हे लेबल म्हणजेच विलिनीकरणाची मंजुरी आहे; Mergify फक्त ती अंमलात आणते.
3. Mergify रांगेतील जास्तीत जास्त 10 PRs ची बॅच बनवते, fast-gates विरुद्ध बॅचचे प्रमाणीकरण
   करते आणि विलीन करते (squash). लाल बॅचचे **आपोआप द्विभाजन केले जाते** — दोषी PR
   सुमारे log2(N) पुनर्प्रमाणीकरणांमध्ये वेगळा केला जातो आणि रांगेतून काढला जातो; उर्वरित पुढे जातात.
4. विलिनीकरणानंतर, continuous release-green workflow push झाल्यावर नवीन tip चे प्रमाणीकरण
   करते आणि या संयोजनामुळे regression झाल्यास attribution issue उघडते (कधीही auto-revert करत नाही).

सुरक्षा-नियम (`CLAUDE.md` Hard Rules #21/#22 शी समरूप):

- **रिलीज फ्रीझ सुरू आहे** → फ्रीझ केलेल्या branch ला लक्ष्य करणाऱ्या PRs ना लेबल लावू नका; आधी
  सक्रिय `release/vX+1` कडे पुन्हा लक्ष्यित करा.
- **दुसऱ्या सत्राचा in-flight PR** → त्याला कधीही लेबल लावू नका; फक्त मालकी असलेले सत्र
  स्वतःचे काम रांगेत लावते.
- केवळ tests असलेले diffs आणि `hotfix` लेबल असलेले PRs आधीच कमी केलेले CI चालवतात
  (`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane पहा); प्रत्यक्षात चालवला गेलेला कोणताही
  check संच queue conditions स्वीकारतात (`#check-failure=0` + `#check-pending=0`).

## पर्यायी मार्ग: manual merge-train

Queue उपलब्ध नसताना हा वापरला जातो. यात v3.8.47 चक्रादरम्यान एका दिवसात 33 PRs
पूर्ण करण्यासाठी वापरलेल्या पद्धतीचे संहितीकरण केले आहे:

1. **बॅच तयार करा** (पुनरावलोकन+मंजुरी झालेले सुमारे 10–30 PRs). `linked:` collisions
   तपासा (समान `tap.testFiles`, समान CHANGELOG hunks) आणि त्यांना क्रमाने हाताळा.
2. **फक्त एकदाच प्रमाणीकरण करा**: release tip पासून वेगळ्या isolated worktree मध्ये सर्व batch
   heads स्थानिकरीत्या विलीन करा, नंतर release-equivalent suite चालवा
   (`npm run check:release-green`; रिलीजपूर्वी `--with-build` जोडा).
   `scripts/release/merge-train.sh <base> <PR#>…` steps 1–2 स्वयंचलित करते (संघर्ष करणारे
   PRs बाहेर काढले जातात आणि train पुढे सुरू राहते). Full mode मध्ये `npm run test:unit` चालते —
   box-tuned runner (`--test-concurrency=20`), **दोन अनुक्रमिक 4-core CI
   shards नव्हेत**, ज्यांच्यामुळे 16-core box वरील प्रमुख phase सुमारे 25% क्षमतेवर चालत होता
   (2026-07-18 रोजी दुरुस्त केले). `--fast` (दिवसभरातील mega-train drains, मालकाने 2026-07-18 रोजी मंजूर केलेले)
   प्रत्येक static gate + vitest कायम ठेवते, परंतु केवळ onboard केलेल्या PRs मुळे बदललेल्या
   node:test files चालवते; तरीही एकत्रित tip वर दिवसातून किमान एकदा FULL suite चालवणे
   आवश्यक आहे (`--fast` शिवाय एक train).
3. **हिरवा** → PRs क्रमाने विलीन करा (प्रत्येकापूर्वी `state,headRefOid` पुन्हा तपासा —
   ज्या PR चा head बदलला आहे तो पुन्हा review मध्ये जातो). प्रत्येक merge चा net diff हा
   त्या PR चा स्वतःचा बदल असल्याचे सिद्ध करा (auto-resolve reverts नकोत: व्याप्तीबाहेरील
   deletions साठी `git diff --stat` चे audit करा).
4. **लाल** → एकेक करून पुनर्प्रमाणीकरण करण्याऐवजी बॅचचे अर्ध्या भागांत द्विभाजन करा
   (प्रत्येक अर्ध्याचे प्रमाणीकरण करा); दोषी PR पुराव्यासह पुन्हा review queue मध्ये पाठवा.
5. **कधीही करू नका**: freeze दरम्यान frozen branch मध्ये विलीन करणे; कुठेही `git stash`
   वापरणे; लाल स्थिती आपोआप निघून जाईल या आशेने CI सरसकट पुन्हा चालवणे (नियम: लाल स्थिती ही माहिती असते).

## स्तररचना (फक्त fast-gates सह queue सुरक्षित का आहे)

- **प्रत्येक PR साठी** (quality.yml fast-gates): TIA-प्रभावित tests + संपूर्ण unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog integrity.
- **प्रत्येक batch/tip साठी** (continuous release-green): release branch वरील प्रत्येक push साठी
  `--quick` HARD gates; दिवसातून 3 वेळा संपूर्ण `--with-build --full-ci` sweeps.
- **प्रत्येक release साठी** (release PR वरील ci.yml): E2E ×9 सह संपूर्ण matrix,
  package-artifact + tarball boot-smoke, coverage/ratchets.

पूर्वीपेक्षा कोणत्याही गोष्टीचे कमी प्रमाणीकरण होत नाही — जड surface फक्त प्रत्येक PR ऐवजी
प्रत्येक batch/tip साठी चालते, आणि यामुळेच O(N) round-trips दूर होतात.
