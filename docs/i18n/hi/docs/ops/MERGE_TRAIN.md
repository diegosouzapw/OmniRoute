# Merge Queue & Manual Merge-Train Runbook (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 (गुणवत्ता/वेग योजना के WS3.2/WS3.4) से, समीक्षा किए गए PRs को
`release/vX.Y.Z` में मर्ज करने का डिफ़ॉल्ट मार्ग **Mergify merge queue** (`.mergify.yml`) है;
नीचे दस्तावेज़ित **manual merge-train** FALLBACK है — इसका उपयोग घटनाओं, रिलीज़ फ़्रीज़,
या Mergify Open Source योजना में कभी बदलाव होने पर किया जाता है।

## डिफ़ॉल्ट पथ: Mergify कतार

1. PR की अभियानों द्वारा समीक्षा की जाती है/उसे हरी झंडी दी जाती है और स्वामी के प्री-मर्ज ⭐
   गेट द्वारा अनुमोदित किया जाता है (रिपोर्ट + प्रत्येक आइटम पर निर्णय — `/merge-prs` चरण 0.75 देखें)।
2. स्वामी (या स्वामी के निर्णय पर कार्य करने वाला सत्र) **`queue`**
   लेबल लागू करता है। यह लेबल ही मर्ज की स्वीकृति है; Mergify केवल इसे निष्पादित करता है।
3. Mergify कतारबद्ध PRs को फ़ास्ट-गेट्स के विरुद्ध **क्रमिक रूप से** (एक बार में एक) सत्यापित
   करता है और मर्ज (squash) करता है। बैचिंग + स्वचालित द्विभाजन Mergify के सशुल्क टियर
   का हिस्सा है (मुफ़्त प्लान पर "Merge Queue बैच का उपयोग नहीं किया जा सकता", #7220), इसलिए `.mergify.yml` में कोई
   `batch_size` सेट नहीं किया गया है; बैचिंग नीचे दी गई मैन्युअल मर्ज-ट्रेन का कार्य बनी रहती है। ऐसा PR जिसके
   चेक `checks_timeout` (240 मिनट = `quality.yml` के मापे गए p95 का 2×) के बाद भी लंबित
   हैं, कतार को रोकने के बजाय कतार से हटा दिया जाता है।
4. मर्ज के बाद, सतत रिलीज़-ग्रीन वर्कफ़्लो पुश होने पर नए टिप को सत्यापित करता है
   और यदि संयोजन में रिग्रेशन हुआ हो, तो एक एट्रिब्यूशन इश्यू खोलता है (कभी भी अपने-आप रिवर्ट नहीं करता)।

सुरक्षात्मक नियम (`CLAUDE.md` के कठोर नियम #21/#22 के अनुरूप):

- **रिलीज़ फ़्रीज़ सक्रिय है** → फ़्रीज़ की गई ब्रांच को लक्षित करने वाले PRs पर लेबल न लगाएँ; पहले उन्हें
  सक्रिय `release/vX+1` पर पुनः लक्षित करें।
- **किसी अन्य सत्र का प्रगति पर मौजूद PR** → उस पर कभी लेबल न लगाएँ; केवल स्वामी सत्र ही
  अपने कार्य को कतारबद्ध करता है।
- केवल-टेस्ट वाले डिफ़ और `hotfix` लेबल वाले PRs पहले से ही सीमित CI चलाते हैं (`RELEASE_CHECKLIST.md`
  → Hotfix Fast-Lane देखें); कतार की शर्तें वास्तव में चले किसी भी चेक-समूह को स्वीकार करती हैं
  (`#check-failure=0` + `#check-pending=0`)।

## फ़ॉलबैक: manual merge-train

queue उपलब्ध न होने पर इसका उपयोग किया जाता है। यह उस पद्धति को संहिताबद्ध करता है जिसने
v3.8.47 चक्र के दौरान एक दिन में 33 PRs निपटाए थे:

1. **बैच बनाएँ** (~10–30 समीक्षा किए गए+अनुमोदित PRs)। `linked:` टकरावों की जाँच करें
   (समान `tap.testFiles`, समान CHANGELOG hunks) और उनका क्रमबद्ध निष्पादन करें।
2. **केवल एक बार सत्यापित करें**: रिलीज़ tip से अलग किए गए एक पृथक worktree में सभी बैच
   heads को स्थानीय रूप से मर्ज करें, फिर रिलीज़-समकक्ष suite चलाएँ
   (`npm run check:release-green`, किसी रिलीज़ से पहले `--with-build` जोड़ें)।
   `scripts/release/merge-train.sh <base> <PR#>…` चरण 1–2 को स्वचालित करता है (टकराने वाले
   PRs बाहर हो जाते हैं, train जारी रहती है)। Full mode `npm run test:unit` चलाता है — यानी
   बॉक्स के लिए अनुकूलित runner (`--test-concurrency=20`), **न कि** दो क्रमिक 4-core CI
   shards, जिनके कारण प्रमुख चरण 16-core बॉक्स की क्षमता के केवल ~25% पर चलता था (इसे
   2026-07-18 को ठीक किया गया)। `--fast` (दिन के भीतर mega-train निकासी, स्वामी द्वारा 2026-07-18 को अनुमोदित)
   प्रत्येक static gate + vitest को बनाए रखता है, लेकिन केवल boarded PRs द्वारा बदली गई
   node:test फ़ाइलें चलाता है; संचित tip पर FULL suite को फिर भी कम-से-कम दिन में एक बार
   चलना चाहिए (`--fast` के बिना एक train)।
3. **ग्रीन** → PRs को क्रम से मर्ज करें (हर एक से पहले `state,headRefOid` की पुनः-जाँच करें —
   जिस PR का head बदल गया हो, वह दोबारा समीक्षा में जाता है)। सिद्ध करें कि प्रत्येक मर्ज का net diff
   केवल उस PR का अपना बदलाव है (कोई auto-resolve revert नहीं: दायरे से बाहर के deletions के लिए
   `git diff --stat` का ऑडिट करें)।
4. **रेड** → एक-एक करके पुनः सत्यापित करने के बजाय बैच को आधे-आधे भागों में द्विभाजित करें
   (प्रत्येक आधे को सत्यापित करें); दोषपूर्ण PR को साक्ष्य सहित review queue में वापस भेजें।
5. **कभी नहीं**: फ़्रीज़ के दौरान फ़्रीज़ की गई शाखा में मर्ज न करें; कहीं भी `git stash` न चलाएँ;
   किसी रेड के दूर हो जाने की आशा में CI को अंधाधुंध दोबारा न चलाएँ (नियम: रेड उपयोगी जानकारी है)।

## स्तर-विभाजन (केवल fast-gates के साथ queue सुरक्षित क्यों है)

- **प्रति PR** (quality.yml fast-gates): TIA-प्रभावित tests + पूर्ण unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog अखंडता।
- **प्रति batch/tip** (निरंतर release-green): रिलीज़ शाखा पर प्रत्येक push के लिए `--quick`
  HARD gates; पूर्ण `--with-build --full-ci` sweeps दिन में 3 बार।
- **प्रति रिलीज़** (रिलीज़ PR पर ci.yml): E2E ×9 सहित पूर्ण matrix,
  package-artifact + tarball boot-smoke, coverage/ratchets।

पहले की तुलना में किसी भी चीज़ का सत्यापन कम नहीं किया जाता — भारी surface केवल प्रति batch/tip
चलती है, प्रति PR नहीं; इसी से O(N) round-trips समाप्त होते हैं।

## `merge-train.sh` के लिए fresh-checkout पूर्वापेक्षाएँ

स्क्रिप्ट root checkout पर (किसी भी worktree कार्य से पहले) fail-fast **preflight** चलाती है,
ताकि कोई टूटा हुआ install कभी भी रेड train का भ्रम पैदा न कर सके:

1. `npm ci`, फिर वह `bun` postinstall चलाएँ जिसे npm रोकता है:
   `(cd node_modules/bun && node install.js)` — अन्यथा `check:provider-consistency`
   और `check:known-symbols` (दोनों `bun scripts/…`) train और base, दोनों पर
   बिना किसी violation line के विफल हो जाते हैं।
2. कोई अनावश्यक `node_modules/node_modules` मौजूद न हो (duplicate dependency tree; React दो बार
   लोड होता है और UI vitest suites तुरंत विफल हो जाते हैं)।
3. `node_modules/.bin/tsc` मौजूद और निष्पादन-योग्य हो (अधूरे install में यह उपलब्ध नहीं होता)।

train अवरोधक `npm run check:cycles:ratchet` चलाती है; केवल `npm run check:cycles`
सलाहकारी है (यह SCCs सूचीबद्ध करता है और स्वस्थ base पर भी non-zero के साथ बाहर निकलता है)।
