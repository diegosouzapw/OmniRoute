# Merge Queue & Manual Merge-Train Runbook (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

ከv3.8.49 (የጥራት/ፍጥነት ዕቅዱ WS3.2/WS3.4) ጀምሮ፣ የተገመገሙ PRዎችን ወደ
`release/vX.Y.Z` ለማዋሃድ ነባሪው መንገድ **Mergify merge queue** (`.mergify.yml`) ነው፤
ከዚህ በታች የተመዘገበው **በእጅ የሚከናወን merge-train** ተተኪ አማራጭ ነው — በክስተቶች፣
በልቀት እገዳዎች ወቅት፣ ወይም የMergify Open Source ዕቅድ ቢቀየር የሚያገለግል።

## ነባሪ መንገድ፦ የMergify ወረፋ

1. PRው በዘመቻዎቹ ተገምግሞ/አረንጓዴ ሆኖ፣ በባለቤቱ የቅድመ-ውህደት ⭐
   በር ይፀድቃል (ሪፖርቱ + የእያንዳንዱ ንጥል ውሳኔ — `/merge-prs` ደረጃ 0.75ን ይመልከቱ)።
2. ባለቤቱ (ወይም በባለቤቱ ውሳኔ መሠረት የሚሠራው ክፍለ-ጊዜ) **`queue`**
   መለያውን ያክላል። መለያው ራሱ የውህደት ፈቃድ ነው፤ Mergify የሚያደርገው እሱን ማስፈጸም ብቻ ነው።
3. Mergify በወረፋ ላይ ካሉ PRዎች እስከ 10 ድረስ በቡድን ያደራጃል፣ ቡድኑን በፈጣን በሮች ይፈትሻል፣
   ከዚያም ያዋህዳል (squash)። ቀይ የሆነ ቡድን **በራስ-ሰር በሁለት ይከፈላል** — ችግር ያለበት PR
   በ~log2(N) ዳግም ማረጋገጫዎች ተለይቶ ከወረፋው ይወጣል፤ የተቀሩት ይቀጥላሉ።
4. ከውህደት በኋላ፣ ቀጣይነት ያለው release-green workflow በpush ጊዜ አዲሱን tip ያረጋግጣል
   እና ጥምረቱ የኋሊት መቀነስ ካስከተለ የአመጣጥ ጉዳይ ይከፍታል (በራስ-ሰር ፈጽሞ አይመልስም)።

የደህንነት ገደቦች (`CLAUDE.md` ጥብቅ ደንቦች #21/#22ን ያንጸባርቃሉ)፦

- **የልቀት እገዳ ክፍት ነው** → የታገደውን branch ዒላማ ላደረጉ PRዎች መለያ አትጨምሩ፤ መጀመሪያ ወደ
  ንቁው `release/vX+1` ዳግም ዒላማ አድርጉ።
- **የሌላ ክፍለ-ጊዜ በሂደት ላይ ያለ PR** → ፈጽሞ መለያ አትጨምሩበት፤ የራሱን ሥራ ወረፋ የሚያስገባው
  ባለቤት ክፍለ-ጊዜው ብቻ ነው።
- የሙከራ-ብቻ ልዩነቶች እና `hotfix` መለያ ያላቸው PRዎች አስቀድመው የተቀነሰ CI ያስኬዳሉ
  (`RELEASE_CHECKLIST.md` → Hotfix Fast-Laneን ይመልከቱ)፤ የወረፋው ሁኔታዎች በትክክል የተከናወነውን
  ማንኛውንም የፍተሻ ስብስብ ይቀበላሉ (`#check-failure=0` + `#check-pending=0`)።

## ተተኪ አማራጭ፦ በእጅ የሚከናወነው merge-train

ወረፋው በማይገኝበት ጊዜ ይጠቀሙበታል። ይህ በv3.8.47 ዑደት ወቅት በአንድ ቀን 33 PRዎችን
ያጠናቀቀውን አሠራር ደንብ ያደርገዋል፦

1. **ቡድኑን አሰባስቡ** (~10–30 የተገመገሙ+የፀደቁ PRዎች)። የ`linked:` ግጭቶችን
   (ተመሳሳይ `tap.testFiles`፣ ተመሳሳይ የCHANGELOG ክፍሎች) ይፈትሹ እና እነዚያን በቅደም ተከተል ያስኬዱ።
2. **አንድ ጊዜ ብቻ ያረጋግጡ**፦ ከrelease tip በተነሳ በተነጠለ worktree ውስጥ ሁሉንም የቡድኑን
   heads በአካባቢው ያዋህዱ፣ ከዚያም ከልቀቱ ጋር እኩል የሆነውን ስብስብ ያስኪዱ
   (`npm run check:release-green`፣ ከልቀት በፊት `--with-build`ን ይጨምሩ)።
   `scripts/release/merge-train.sh <base> <PR#>…` ደረጃዎች 1–2ን በራስ-ሰር ያከናውናል (የሚጋጩ
   PRዎች ይወጣሉ፣ trainው ይቀጥላል)። ሙሉ ሁነታው `npm run test:unit`ን ያስኬዳል — ለ
   box የተስተካከለው runner (`--test-concurrency=20`) እንጂ፣ ዋናውን ደረጃ በ16-core box
   ላይ በ~25% እንዲሠራ ያደረጉትን ሁለት ተከታታይ 4-core CI shards አይደለም (በ
   2026-07-18 ተስተካክሏል)። `--fast` (በቀን ውስጥ የmega-train ማጠናቀቂያዎች፣ በባለቤቱ የፀደቀ
   2026-07-18) እያንዳንዱን static gate + vitest ይጠብቃል፣ ነገር ግን በተሳፈሩት PRዎች
   የተቀየሩትን node:test ፋይሎች ብቻ ያስኬዳል፤ ሙሉው ስብስብ በተከማቸው tip ላይ
   ቢያንስ በቀን አንድ ጊዜ መካሄድ አለበት (`--fast` የሌለው አንድ train)።
3. **አረንጓዴ** → PRዎቹን በቅደም ተከተል ያዋህዱ (ከእያንዳንዱ በፊት `state,headRefOid`ን ዳግም በመፈተሽ —
   headው የተንቀሳቀሰ PR ወደ ግምገማ ይመለሳል)። የእያንዳንዱ ውህደት የተጣራ ልዩነት
   የPRው የራሱ ለውጥ መሆኑን ያረጋግጡ (በራስ-ሰር የተፈቱ መመለሻዎች አይኑሩ፦ ከወሰን ውጭ የሆኑ
   ስረዛዎችን ለማግኘት `git diff --stat`ን ይመርምሩ)።
4. **ቀይ** → አንድ በአንድ ዳግም ከማረጋገጥ ይልቅ ቡድኑን በግማሽ ይክፈሉ (እያንዳንዱን ግማሽ ያረጋግጡ)፤
   ችግር ያለበትን PR ከማስረጃው ጋር ወደ ግምገማ ወረፋው ይመልሱ።
5. **ፈጽሞ አታድርጉ**፦ በእገዳ ወቅት ወደ ታገደው branch ማዋሃድ፤ `git stash`ን የትኛውም ቦታ መጠቀም፤
   ቀይ ሁኔታ ይጠፋል በሚል ተስፋ CIን በጅምላ ዳግም ማስኬድ (ደንቡ፦ ቀይ ሁኔታ መረጃ ነው)።

## ደረጃ አከፋፈል (ወረፋው በፈጣን በሮች ብቻ ለምን ደህንነቱ እንደተጠበቀ)

- **በእያንዳንዱ PR** (quality.yml ፈጣን በሮች)፦ በTIA ተጽዕኖ ያገኙ ሙከራዎች + ሙሉ unit 4-shard +
  vitest + lint bag + typecheck + የdocs/changelog ታማኝነት።
- **በእያንዳንዱ ቡድን/tip** (ቀጣይነት ያለው release-green)፦ ወደrelease branch በሚደረግ እያንዳንዱ push ላይ
  `--quick` HARD gates፤ ሙሉ `--with-build --full-ci` ፍተሻዎች በቀን 3×።
- **በእያንዳንዱ ልቀት** (በrelease PR ላይ ci.yml)፦ E2E ×9ን፣
  package-artifact + tarball boot-smokeን፣ coverage/ratchetsን ጨምሮ ሙሉው matrix።

ምንም ነገር ከቀድሞው ባነሰ ደረጃ አይረጋገጥም — ከባዱ የፍተሻ ወሰን ከበፊቱ በእያንዳንዱ PR ፋንታ
በእያንዳንዱ ቡድን/tip ይሠራል፤ O(N) የዙር-ጉዞዎችን የሚያስወግደውም ይህ ነው።
