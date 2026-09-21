# Merge Queue & Manual Merge-Train Runbook (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 (गुणस्तर/वेग योजनाको WS3.2/WS3.4) देखि समीक्षा गरिएका PR हरूलाई
`release/vX.Y.Z` मा मर्ज गर्ने पूर्वनिर्धारित मार्ग **Mergify मर्ज क्यु** (`.mergify.yml`) हो;
तल दस्तावेजीकरण गरिएको **म्यानुअल मर्ज-ट्रेन** चाहिँ वैकल्पिक उपाय हो — घटना हुँदा,
रिलिज फ्रिज हुँदा, वा Mergify Open Source योजना कहिल्यै परिवर्तन भएमा प्रयोग गरिन्छ।

## पूर्वनिर्धारित मार्ग: Mergify क्यु

1. PR लाई अभियानहरूद्वारा समीक्षा गरी हरियो बनाइन्छ र मालिकको प्रि-मर्ज ⭐
   गेटद्वारा अनुमोदन गरिन्छ (रिपोर्ट + प्रत्येक आइटमको निर्णय — `/merge-prs` चरण 0.75 हेर्नुहोस्)।
2. मालिकले (वा मालिकको निर्णयअनुसार काम गरिरहेको सत्रले) **`queue`**
   लेबल लगाउँछ। लेबल नै मर्ज अनुमोदन हो; Mergify ले यसलाई केवल कार्यान्वयन गर्छ।
3. Mergify ले क्युमा रहेका बढीमा 10 वटा PR लाई ब्याच गर्छ, फास्ट-गेटहरूविरुद्ध ब्याचको प्रमाणीकरण
   गर्छ, र मर्ज (स्क्वास) गर्छ। रातो ब्याच **स्वचालित रूपमा द्विभाजन गरिन्छ** — समस्या उत्पन्न गर्ने PR
   लाई ~log2(N) पुनःप्रमाणीकरणमा अलग गरी क्युबाट हटाइन्छ; बाँकी अगाडि बढ्छन्।
4. मर्जपछि, निरन्तर release-green कार्यप्रवाहले push हुँदा नयाँ टिपको प्रमाणीकरण
   गर्छ र संयोजनमा रिग्रेसन भएमा एट्रिब्युसन इस्यु खोल्छ (कहिल्यै स्वतः रिभर्ट गर्दैन)।

सुरक्षा सीमाहरू (`CLAUDE.md` का कडा नियम #21/#22 अनुरूप):

- **रिलिज फ्रिज खुला छ** → फ्रिज गरिएको ब्रान्चलाई लक्षित गर्ने PR हरूमा लेबल नलगाउनुहोस्; पहिले
  सक्रिय `release/vX+1` मा पुनःलक्षित गर्नुहोस्।
- **अर्को सत्रको प्रक्रियामा रहेको PR** → त्यसमा कहिल्यै लेबल नलगाउनुहोस्; स्वामित्व भएको सत्रले मात्र
  आफ्नो काम क्यु गर्छ।
- परीक्षण-मात्रका diff र `hotfix`-लेबल भएका PR हरूले पहिल्यै घटाइएको CI चलाउँछन् (
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane हेर्नुहोस्); क्युका सर्तहरूले वास्तवमै चलेको जुनसुकै
  जाँच सेट स्वीकार गर्छन् (`#check-failure=0` + `#check-pending=0`)।

## वैकल्पिक उपाय: म्यानुअल मर्ज-ट्रेन

क्यु उपलब्ध नभएको बेला प्रयोग गरिन्छ। यसले v3.8.47 चक्रमा एकै दिन
33 वटा PR प्रशोधन गर्न प्रयोग गरिएको अभ्यासलाई औपचारिक बनाउँछ:

1. **ब्याच तयार गर्नुहोस्** (~10–30 समीक्षा+अनुमोदन भएका PR हरू)। `linked:` टकरावहरू
   (एउटै `tap.testFiles`, एउटै CHANGELOG खण्डहरू) जाँच्नुहोस् र तिनलाई क्रमिक रूपमा चलाउनुहोस्।
2. **एकपटक मात्र प्रमाणीकरण गर्नुहोस्**: रिलिज टिपबाट बनाइएको पृथक worktree मा ब्याचका सबै
   हेडहरू स्थानीय रूपमा मर्ज गर्नुहोस्, त्यसपछि रिलिज-समान सुइट चलाउनुहोस्
   (`npm run check:release-green`, रिलिजअघि `--with-build` थप्नुहोस्)।
   `scripts/release/merge-train.sh <base> <PR#>…` ले चरण 1–2 स्वचालित गर्छ (टकराव भएका
   PR हरू बाहिरिन्छन्, ट्रेन जारी रहन्छ)। पूर्ण मोडले `npm run test:unit` चलाउँछ —
   बक्स-अनुकूलित रनर (`--test-concurrency=20`), दुई क्रमिक 4-core CI
   शार्ड होइन, जसले 16-core बक्सको ~25% मा प्रमुख चरण चलाएको थियो (सुधार गरिएको
   2026-07-18)। `--fast` (एकै दिनभित्रका मेगा-ट्रेन प्रशोधनहरू, मालिकद्वारा अनुमोदित 2026-07-18)
   ले हरेक स्थिर गेट + vitest कायम राख्छ तर ट्रेनमा चढाइएका PR हरूले परिवर्तन गरेका
   node:test फाइलहरू मात्र चलाउँछ; सङ्कलित टिपमा पूर्ण सुइट अझै पनि दैनिक कम्तीमा
   एकपटक चल्नैपर्छ (`--fast` बिनाको एउटा ट्रेन)।
3. **हरियो** → PR हरूलाई क्रमशः मर्ज गर्नुहोस् (हरेक पटकअघि `state,headRefOid` पुनःजाँच गर्दै —
   हेड सरेको PR पुनः समीक्षामा जान्छ)। प्रत्येक मर्जको शुद्ध diff त्यही
   PR को आफ्नै परिवर्तन हो भनेर प्रमाणित गर्नुहोस् (स्वतः-समाधान गरिएका रिभर्टहरू होइनन्: कार्यक्षेत्रभन्दा
   बाहिरका मेटाइहरूका लागि `git diff --stat` अडिट गर्नुहोस्)।
4. **रातो** → एक-एक गरेर पुनःप्रमाणीकरण गर्नुको सट्टा ब्याचलाई आधा-आधा गरी द्विभाजन गर्नुहोस्
   (प्रत्येक आधाको प्रमाणीकरण गर्नुहोस्); समस्या उत्पन्न गर्ने PR लाई प्रमाणसहित समीक्षा क्युमा फिर्ता पठाउनुहोस्।
5. **कहिल्यै नगर्नुहोस्**: फ्रिजको समयमा फ्रिज गरिएको ब्रान्चमा मर्ज गर्ने; जहाँसुकै
   `git stash` गर्ने; रातो अवस्था हट्ने आशामा CI अन्धाधुन्ध पुनःचलाउने (नियम: रातो अवस्था सूचना हो)।

## तहगत व्यवस्था (फास्ट-गेटहरू मात्र हुँदा पनि क्यु किन सुरक्षित छ)

- **प्रत्येक PR मा** (quality.yml फास्ट-गेटहरू): TIA-प्रभावित परीक्षणहरू + पूर्ण unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog अखण्डता।
- **प्रत्येक ब्याच/टिपमा** (निरन्तर release-green): रिलिज ब्रान्चमा हुने हरेक push मा
  `--quick` कडा गेटहरू; पूर्ण `--with-build --full-ci` स्वीपहरू दिनमा 3 पटक।
- **प्रत्येक रिलिजमा** (रिलिज PR मा ci.yml): E2E ×9 सहितको पूर्ण म्याट्रिक्स,
  package-artifact + tarball boot-smoke, coverage/ratchets।

पहिलेभन्दा कुनै पनि कुरा कम प्रमाणीकरण गरिएको छैन — गहन सतह मात्र प्रत्येक PR को सट्टा
प्रत्येक ब्याच/टिपमा चल्छ, जसले O(N) राउन्ड-ट्रिपहरू हटाउँछ।
