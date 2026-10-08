# Merge Queue & Manual Merge-Train Runbook (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 (गुणवत्ता/वेग योजना के WS3.2/WS3.4) से समीक्षा किए गए PRs को
`release/vX.Y.Z` में मर्ज करने का डिफ़ॉल्ट मार्ग **Mergify merge queue** (`.mergify.yml`)
है; नीचे दर्ज **मैन्युअल merge-train** फ़ॉलबैक है — इसका उपयोग घटनाओं के दौरान,
रिलीज़ फ़्रीज़ में, या यदि Mergify Open Source योजना कभी बदलती है, तब किया जाता है।

## डिफ़ॉल्ट मार्ग: Mergify queue

1. अभियानों द्वारा PR की समीक्षा हो चुकी हो/वह ग्रीन हो और स्वामी के प्री-मर्ज ⭐
   गेट द्वारा स्वीकृत हो (रिपोर्ट + प्रत्येक आइटम पर निर्णय — `/merge-prs` चरण 0.75 देखें)।
2. स्वामी (या स्वामी के निर्णय पर कार्य करने वाला सत्र) **`queue`**
   लेबल लगाता है। यह लेबल ही मर्ज की स्वीकृति है; Mergify केवल इसे निष्पादित करता है।
3. Mergify अधिकतम 10 कतारबद्ध PRs का बैच बनाता है, fast-gates के विरुद्ध बैच को सत्यापित
   करता है और मर्ज (squash) करता है। रेड बैच को **स्वचालित रूप से bisect किया जाता है** —
   दोषी PR को लगभग log2(N) पुनः-सत्यापनों में अलग करके कतार से हटा दिया जाता है; बाकी आगे बढ़ते हैं।
4. मर्ज के बाद, निरंतर release-green वर्कफ़्लो push पर नए tip को सत्यापित
   करता है और यदि संयोजन में regression हुआ हो, तो attribution issue खोलता है (कभी auto-revert नहीं करता)।

सुरक्षा-नियम (`CLAUDE.md` के कठोर नियम #21/#22 के अनुरूप):

- **रिलीज़ फ़्रीज़ खुला है** → फ़्रीज़ की गई branch को लक्षित करने वाले PRs पर लेबल न लगाएँ;
  पहले उन्हें सक्रिय `release/vX+1` पर retarget करें।
- **किसी अन्य सत्र का in-flight PR** → उस पर कभी लेबल न लगाएँ; केवल स्वामी सत्र ही
  अपने काम को queue में डालता है।
- केवल परीक्षण वाले diffs और `hotfix` लेबल वाले PRs पहले से ही घटा हुआ CI चलाते हैं
  (`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane देखें); queue की शर्तें वास्तव में चले
  किसी भी check set को स्वीकार करती हैं (`#check-failure=0` + `#check-pending=0`)।

## फ़ॉलबैक: मैन्युअल merge-train

queue अनुपलब्ध होने पर इसका उपयोग किया जाता है। यह उस प्रक्रिया को औपचारिक बनाता है जिसने
v3.8.47 चक्र के दौरान एक दिन में 33 PRs निपटाए थे:

1. **बैच तैयार करें** (लगभग 10–30 समीक्षा किए गए+स्वीकृत PRs)। `linked:` टकरावों की जाँच करें
   (समान `tap.testFiles`, समान CHANGELOG hunks) और उन्हें क्रमवार करें।
2. **केवल एक बार सत्यापित करें**: release tip से बने एक अलग worktree में सभी बैच
   heads को स्थानीय रूप से मर्ज करें, फिर release के समकक्ष suite को चलाएँ
   (`npm run check:release-green`; रिलीज़ से पहले `--with-build` जोड़ें)।
   `scripts/release/merge-train.sh <base> <PR#>…` चरण 1–2 को स्वचालित करता है (टकराव वाले
   PRs बाहर हो जाते हैं, train जारी रहती है)। पूर्ण मोड `npm run test:unit` चलाता है —
   यानी box के लिए अनुकूलित runner (`--test-concurrency=20`), **न कि** क्रमिक रूप से चलने वाले दो 4-core CI
   shards, जिनके कारण 16-core box पर प्रमुख चरण लगभग 25% क्षमता पर चलता था (इसे
   2026-07-18 को ठीक किया गया)। `--fast` (एक ही दिन में mega-train निकासी, स्वामी द्वारा 2026-07-18 को स्वीकृत)
   प्रत्येक static gate + vitest बनाए रखता है, लेकिन केवल boarded PRs द्वारा बदली गई
   node:test फ़ाइलें चलाता है; संचित tip पर FULL suite अब भी दिन में कम-से-कम एक बार चलना
   चाहिए (`--fast` के बिना एक train)।
3. **ग्रीन** → PRs को क्रम से मर्ज करें (प्रत्येक से पहले `state,headRefOid` की दोबारा जाँच करें —
   जिस PR का head बदल गया हो, वह दोबारा समीक्षा में जाता है)। प्रमाणित करें कि प्रत्येक मर्ज का
   net diff केवल उसी PR का परिवर्तन है (कोई auto-resolve revert नहीं: दायरे से बाहर के
   deletions के लिए `git diff --stat` का audit करें)।
4. **रेड** → एक-एक करके दोबारा सत्यापित करने के बजाय बैच को आधे-आधे में bisect करें
   (प्रत्येक आधे को सत्यापित करें); साक्ष्य सहित दोषी PR को वापस review queue में डालें।
5. **कभी नहीं**: फ़्रीज़ के दौरान फ़्रीज़ की गई branch में मर्ज न करें; कहीं भी `git stash`
   न करें; इस आशा में CI को समग्र रूप से दोबारा न चलाएँ कि रेड गायब हो जाएगा
   (नियम: रेड एक जानकारी है)।

## स्तर निर्धारण (केवल fast-gates के साथ queue सुरक्षित क्यों है)

- **प्रति PR** (quality.yml fast-gates): TIA-प्रभावित परीक्षण + पूर्ण unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog अखंडता।
- **प्रति बैच/tip** (निरंतर release-green): release branch पर प्रत्येक push के लिए
  `--quick` HARD gates; पूर्ण `--with-build --full-ci` sweeps दिन में 3 बार।
- **प्रति रिलीज़** (release PR पर ci.yml): E2E ×9 सहित पूर्ण matrix,
  package-artifact + tarball boot-smoke, coverage/ratchets।

पहले की तुलना में किसी भी चीज़ का सत्यापन कम नहीं किया गया है — भारी सतह बस प्रति PR के बजाय
प्रति बैच/tip चलती है, और यही O(N) round-trips को हटाता है।
