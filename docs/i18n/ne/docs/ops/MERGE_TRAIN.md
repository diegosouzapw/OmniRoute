# Merge Queue & Manual Merge-Train Runbook (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 (गुणस्तर/वेग योजनाको WS3.2/WS3.4) देखि समीक्षा गरिएका PR हरूलाई
`release/vX.Y.Z` मा मर्ज गर्ने पूर्वनिर्धारित मार्ग **Mergify merge queue** (`.mergify.yml`) हो;
तल अभिलेखित **manual merge-train** FALLBACK हो — यो घटनाहरू, रिलीज फ्रिज, वा Mergify Open Source योजनामा कहिल्यै परिवर्तन भएमा प्रयोग गरिन्छ।

## पूर्वनिर्धारित मार्ग: Mergify queue

1. PR लाई अभियानहरूद्वारा समीक्षा/हरियो बनाइन्छ र मालिकको merge-पूर्व ⭐
   गेटद्वारा स्वीकृत गरिन्छ (प्रतिवेदन + प्रत्येक-वस्तुको निर्णय — `/merge-prs` को चरण 0.75 हेर्नुहोस्)।
2. मालिकले (वा मालिकको निर्णयअनुसार काम गरिरहेको सत्रले) **`queue`**
   लेबल लगाउँछ। यो लेबल नै merge स्वीकृति हो; Mergify ले त्यसलाई कार्यान्वयन मात्र गर्छ।
3. Mergify ले queue मा राखिएका PR हरूलाई द्रुत-गेटहरूविरुद्ध **क्रमिक रूपमा**
   (एक पटकमा एउटा) प्रमाणीकरण गर्छ र merge (squash) गर्छ। Batching + स्वचालित bisection सशुल्क Mergify tier हो
   (निःशुल्क योजनामा "Cannot use Merge Queue batch", #7220), त्यसैले `.mergify.yml` ले कुनै
   `batch_size` सेट गर्दैन; batching तलको म्यानुअल merge-train को जिम्मेवारी रहन्छ। `checks_timeout`
   (240 मिनेट = `quality.yml` को मापन गरिएको p95 को 2×) पछि पनि checks विचाराधीन रहेको PR लाई
   queue अवरुद्ध गर्न दिनुको सट्टा queue बाट हटाइन्छ।
4. merge पछि, निरन्तर release-green workflow ले push हुँदा नयाँ tip प्रमाणीकरण गर्छ
   र संयोजनमा regression आएमा attribution issue खोल्छ (कहिल्यै auto-revert गर्दैन)।

सुरक्षा-सीमाहरू (`CLAUDE.md` का कडा नियमहरू #21/#22 सँग समान):

- **Release freeze खुला छ** → frozen branch लाई लक्षित गर्ने PR हरूमा लेबल नलगाउनुहोस्; पहिले
  सक्रिय `release/vX+1` तर्फ पुनः लक्षित गर्नुहोस्।
- **अर्को सत्रको प्रक्रियामा रहेको PR** → त्यसमा कहिल्यै लेबल नलगाउनुहोस्; स्वामित्व भएको सत्रले मात्र
  आफ्नो काम queue मा राख्छ।
- Tests-only diffs र `hotfix` लेबल भएका PR हरूमा पहिले नै घटाइएको CI चल्छ (`RELEASE_CHECKLIST.md`
  → Hotfix Fast-Lane हेर्नुहोस्); queue का सर्तहरूले वास्तवमा चलेको जुनसुकै
  check set स्वीकार गर्छन् (`#check-failure=0` + `#check-pending=0`)।

## Fallback: manual merge-train

queue उपलब्ध नभएको बेला प्रयोग गरिन्छ। यसले v3.8.47 चक्रमा
एकै दिन 33 वटा PR टुङ्ग्याउन प्रयोग भएको अभ्यासलाई औपचारिक बनाउँछ:

1. **ब्याच तयार गर्नुहोस्** (~10–30 समीक्षा+अनुमोदन भएका PR)। `linked:` टकरावहरू
   (उही `tap.testFiles`, उही CHANGELOG hunk हरू) जाँच्नुहोस् र तिनलाई क्रमिक रूपमा राख्नुहोस्।
2. **एक पटक मात्र प्रमाणीकरण गर्नुहोस्**: रिलीज tip बाट छुट्टिएको worktree मा ब्याचका सबै
   head हरू स्थानीय रूपमा मर्ज गर्नुहोस्, त्यसपछि रिलीज-समान suite चलाउनुहोस्
   (`npm run check:release-green`, रिलीजअघि `--with-build` थप्नुहोस्)।
   `scripts/release/merge-train.sh <base> <PR#>…` ले चरण 1–2 स्वचालित गर्छ (टकराव भएका
   PR हरू बाहिरिन्छन्, train जारी रहन्छ)। Full mode ले `npm run test:unit` चलाउँछ —
   box-अनुकूलित runner (`--test-concurrency=20`), दुईवटा क्रमिक 4-core CI
   shard होइन, जसले 16-core box को प्रमुख चरणलाई ~25% मा चलाएको थियो (सुधार मिति
   2026-07-18)। `--fast` (एकै दिनका mega-train drain हरू, मालिकद्वारा अनुमोदित 2026-07-18)
   ले प्रत्येक static gate + vitest कायम राख्छ तर चढाइएका PR हरूले परिवर्तन गरेका
   node:test file हरू मात्र चलाउँछ; संचित tip मा FULL suite अझै पनि कम्तीमा दैनिक एक पटक
   चल्नैपर्छ (`--fast` बिनाको एउटा train)।
3. **हरियो** → PR हरूलाई क्रमशः मर्ज गर्नुहोस् (प्रत्येकअघि `state,headRefOid` पुनःजाँच गर्दै —
   head सरेको PR फेरि समीक्षामा जान्छ)। प्रत्येक मर्जको खुद diff सम्बन्धित PR कै
   परिवर्तन हो भन्ने प्रमाणित गर्नुहोस् (auto-resolve revert नगर्नुहोस्: कार्यक्षेत्रबाहिरका
   deletion का लागि `git diff --stat` audit गर्नुहोस्)।
4. **रातो** → एक-एक गरी पुनःप्रमाणीकरण गर्नुको सट्टा ब्याचलाई आधा-आधा गरी विभाजन गर्नुहोस्
   (प्रत्येक आधा प्रमाणीकरण गर्नुहोस्); समस्या उत्पन्न गर्ने PR लाई प्रमाणसहित समीक्षा queue मा फर्काउनुहोस्।
5. **कहिल्यै नगर्नुहोस्**: फ्रिजको समयमा फ्रिज गरिएको branch मा मर्ज; कतै पनि `git stash`;
   रातो आफैँ हट्ला भन्ने आशामा CI को blanket-rerun (नियम: रातो हुनु जानकारी हो)।

## तहगत व्यवस्था (fast-gates मात्र हुँदा पनि queue किन सुरक्षित छ)

- **प्रत्येक PR मा** (quality.yml fast-gates): TIA-प्रभावित tests + पूर्ण unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog अखण्डता।
- **प्रत्येक batch/tip मा** (निरन्तर release-green): रिलीज branch मा प्रत्येक push हुँदा
  `--quick` HARD gates; पूर्ण `--with-build --full-ci` sweep दिनमा 3×।
- **प्रत्येक रिलीजमा** (रिलीज PR मा ci.yml): E2E ×9 सहित पूर्ण matrix,
  package-artifact + tarball boot-smoke, coverage/ratchets।

पहिलेभन्दा कम कुनै कुरा पनि प्रमाणीकरण हुँदैन — भारी सतह प्रत्येक PR को सट्टा प्रत्येक batch/tip मा मात्र चल्छ,
र यसैले O(N) round-trip हरू हटाउँछ।

## `merge-train.sh` का लागि fresh-checkout पूर्वसर्तहरू

script ले मूल checkout मा (कुनै worktree कार्यअघि) fail-fast **preflight** चलाउँछ,
जसले बिग्रिएको install लाई रातो train जस्तो देखिन कहिल्यै दिँदैन:

1. `npm ci`, त्यसपछि npm ले रोक्ने `bun` postinstall चलाउनुहोस्:
   `(cd node_modules/bun && node install.js)` — अन्यथा `check:provider-consistency`
   र `check:known-symbols` (दुवै `bun scripts/…`) train र base दुवैमा
   कुनै violation line बिना असफल हुन्छन्।
2. अनावश्यक `node_modules/node_modules` हुनु हुँदैन (duplicate dependency tree; React दुई पटक load हुन्छ
   र UI vitest suite हरू तुरुन्त असफल हुन्छन्)।
3. `node_modules/.bin/tsc` उपस्थित र executable हुनुपर्छ (आंशिक install मा यो हुँदैन)।

train ले blocking `npm run check:cycles:ratchet` चलाउँछ; सामान्य `npm run check:cycles`
सल्लाहात्मक हो (यसले SCC हरू सूचीबद्ध गर्छ र स्वस्थ base मा पनि non-zero सहित निस्कन्छ)।
