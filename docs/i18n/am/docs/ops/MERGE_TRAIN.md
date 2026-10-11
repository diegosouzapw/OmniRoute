# Merge Queue & Manual Merge-Train Runbook (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 (የquality/velocity ዕቅድ WS3.2/WS3.4) ጀምሮ፣ የተገመገሙ PRs ወደ
`release/vX.Y.Z` የሚዋሃዱበት ነባሪ መንገድ **Mergify merge queue** (`.mergify.yml`) ነው፤
ከታች የተመዘገበው **manual merge-train** የመጠባበቂያ አማራጭ ነው — በክስተቶች፣
በrelease freezes ወቅት፣ ወይም የMergify Open Source ዕቅድ ከተቀየረ ጥቅም ላይ ይውላል።

## ነባሪ መንገድ፦ የMergify ወረፋ

1. PRው በዘመቻዎቹ ይገመገማል/አረንጓዴ ሁኔታ ያገኛል፣ እንዲሁም በባለቤቱ ቅድመ-ውህደት ⭐
   መግቢያ መቆጣጠሪያ ይፀድቃል (ሪፖርቱ + የእያንዳንዱ ንጥል ውሳኔ — `/merge-prs` ደረጃ 0.75ን ይመልከቱ)።
2. ባለቤቱ (ወይም በባለቤቱ ውሳኔ መሠረት የሚሠራው ክፍለ ጊዜ) የ**`queue`**
   መለያን ይተገብራል። መለያው ራሱ የውህደት ፈቃድ ነው፤ Mergify የሚያደርገው መፈጸም ብቻ ነው።
3. Mergify ወረፋ የገቡ PRዎችን በፈጣን መግቢያ መቆጣጠሪያዎቹ መሠረት **በተከታታይ** (አንድ በአንድ)
   ያረጋግጣል እና ያዋህዳል (squash)። በቡድን ማስኬድ + ራስ-ሰር ሁለትዮሽ ክፍፍል የሚከፈልበት የMergify ደረጃ ነው
   (በነፃው ዕቅድ ላይ "Cannot use Merge Queue batch"፣ #7220)፣ ስለዚህ `.mergify.yml` ምንም
   `batch_size` አያስቀምጥም፤ በቡድን ማስኬድ ከታች ያለው በእጅ የሚከናወን merge-train ኃላፊነት ሆኖ ይቆያል። ከ`checks_timeout` (240 ደቂቃ = የተለካው
   `quality.yml` p95 2×) በኋላም ምርመራዎቹ በመጠባበቅ ላይ ያሉበት PR ወረፋውን እንዳያቆም ከወረፋው ይወገዳል።
4. ከውህደት በኋላ፣ ቀጣይነት ያለው release-green የሥራ ፍሰት በpush ጊዜ አዲሱን tip
   ያረጋግጣል፣ እና ጥምረቱ ወደ ኋላ ከተመለሰ የአስተዋጽኦ ጉዳይ ይከፍታል (በራስ-ሰር ፈጽሞ አይመልስም)።

የደኅንነት ገደቦች (`CLAUDE.md` ጥብቅ ደንቦች #21/#22ን የሚያንጸባርቁ)፦

- **የልቀት እገዳ ክፍት ነው** → የታገደውን branch ዒላማ ላደረጉ PRዎች መለያ አትስጡ፤ መጀመሪያ ወደ
  ንቁው `release/vX+1` እንደገና ዒላማ አድርጉ።
- **በሌላ ክፍለ ጊዜ ሂደት ላይ ያለ PR** → ፈጽሞ መለያ አትስጡት፤ የራሱን ሥራ ወረፋ የሚያስገባው
  ባለቤት ክፍለ ጊዜው ብቻ ነው።
- የሙከራ-ብቻ ልዩነቶች እና `hotfix` መለያ ያላቸው PRዎች አስቀድመው የተቀነሰ CI ያስኬዳሉ (
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Laneን ይመልከቱ)፤ የወረፋው ሁኔታዎች በተጨባጭ የተካሄደውን
  የምርመራ ስብስብ ይቀበላሉ (`#check-failure=0` + `#check-pending=0`)።

## የመጠባበቂያ አማራጭ፦ manual merge-train

queueው በማይገኝበት ጊዜ ይጠቀሙበታል። ይህ በv3.8.47 ዙር ወቅት 33 PRsን
በአንድ ቀን ያጠናቀቀውን አሠራር በመደበኛ ደንብ ይደነግጋል፦

1. **batchውን ያዘጋጁ** (~10–30 የተገመገሙ+የፀደቁ PRs)። የ`linked:` ግጭቶችን
   (ተመሳሳይ `tap.testFiles`፣ ተመሳሳይ CHANGELOG hunks) ይፈትሹ እና እነዚያን በተከታታይ ያስኬዱ።
2. **አንድ ጊዜ ብቻ ያረጋግጡ**፦ ከrelease tip የተነሳ በተለየ worktree ውስጥ ሁሉንም የbatch
   heads በአካባቢው ያዋህዱ፣ ከዚያም ከrelease ጋር አቻ የሆነውን suite ያስኪዱ
   (`npm run check:release-green`፣ ከrelease በፊት `--with-build`ን ያክሉ)።
   `scripts/release/merge-train.sh <base> <PR#>…` steps 1–2ን በራስ-ሰር ያከናውናል (የሚጋጩ
   PRs ይወጣሉ፣ trainው ይቀጥላል)። Full mode `npm run test:unit`ን ያስኬዳል —
   box-tuned runner (`--test-concurrency=20`)ን፣ **በቅደም ተከተል የሚሄዱትን ሁለት የ4-core CI
   shards ሳይሆን**፤ እነዚህ shards በ16-core box ላይ ዋናውን phase ወደ ~25% ብቻ እንዲጠቀም አድርገው ነበር
   (2026-07-18 ተስተካክሏል)። `--fast` (በቀኑ ውስጥ የmega-train ማጠናቀቂያዎች፣ በባለቤቱ የፀደቀ
   2026-07-18) ሁሉንም static gate + vitest ያቆያል፣ ነገር ግን በተሳፈሩት PRs
   የተቀየሩትን node:test ፋይሎች ብቻ ያስኬዳል፤ FULL suite አሁንም ቢያንስ በቀን አንድ ጊዜ
   በተከማቸው tip ላይ መሄድ አለበት (`--fast` የሌለው አንድ train)።
3. **አረንጓዴ** → PRsን በቅደም ተከተል ያዋህዱ (ከእያንዳንዱ በፊት `state,headRefOid`ን እንደገና በመፈተሽ —
   headው የተንቀሳቀሰ PR እንደገና ወደ review ይገባል)። የእያንዳንዱ merge net diff
   የPRው የራሱ ለውጥ መሆኑን ያረጋግጡ (auto-resolve reverts አይፈቀዱም፦ ከወሰን ውጭ የሆኑ
   deletions እንዳሉ `git diff --stat`ን audit ያድርጉ)።
4. **ቀይ** → አንድ በአንድ እንደገና ከማረጋገጥ ይልቅ batchውን በግማሽ እየከፈሉ ይመርምሩ
   (እያንዳንዱን ግማሽ ያረጋግጡ)፤ ችግሩን የፈጠረውን PR ከማስረጃው ጋር ወደ review queue ይመልሱ።
5. **ፈጽሞ አታድርጉ**፦ freeze በሚኖርበት ጊዜ ወደ frozen branch merge ማድረግ፤ በማንኛውም ቦታ
   `git stash` ማድረግ፤ ቀዩ ይጠፋል በሚል ተስፋ CIን በጅምላ እንደገና ማስኬድ (ደንቡ፦ ቀይ መረጃ ነው)።

## ደረጃ ክፍፍል (queueው በfast-gates ብቻ ለምን ደህንነቱ እንደተጠበቀ)

- **በእያንዳንዱ PR** (quality.yml fast-gates)፦ TIA-impacted tests + full unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog integrity።
- **በእያንዳንዱ batch/tip** (continuous release-green)፦ `--quick` HARD gates ወደ
  release branch በሚደረግ እያንዳንዱ push ላይ፤ full `--with-build --full-ci` sweeps 3×/ቀን።
- **በእያንዳንዱ release** (ci.yml በrelease PR ላይ)፦ E2E ×9ን ጨምሮ ሙሉው matrix፣
  package-artifact + tarball boot-smoke፣ coverage/ratchets።

ምንም ነገር ከቀድሞው ያነሰ አይረጋገጥም — ከባዱ surface ከእንግዲህ በእያንዳንዱ PR
ፋንታ በእያንዳንዱ batch/tip ይሄዳል፤ ይህም O(N) round-tripsን ያስወግዳል።

## ለ`merge-train.sh` የfresh-checkout ቅድመ ሁኔታዎች

የተበላሸ install በፍጹም እንደ ቀይ train እንዳይመስል፣ scriptው በroot checkout ላይ
(ማንኛውም የworktree ሥራ ከመጀመሩ በፊት) ችግር ሲገኝ ወዲያውኑ የሚቆም **preflight** ያስኬዳል፦

1. `npm ci`፣ ከዚያ npm የሚያግደውን `bun` postinstall ያስኪዱ፦
   `(cd node_modules/bun && node install.js)` — ካልሆነ `check:provider-consistency`
   እና `check:known-symbols` (ሁለቱም `bun scripts/…`) በtrainውም ሆነ በbaseው ላይ
   የviolation መስመር ሳይኖር fail ያደርጋሉ።
2. የተረፈ `node_modules/node_modules` መኖር የለበትም (የተደገመ dependency tree፤ React ሁለት ጊዜ
   ይጫናል እና UI vitest suites ወዲያውኑ fail ያደርጋሉ)።
3. `node_modules/.bin/tsc` መኖር እና executable መሆን አለበት (ከፊል install ይህን አያካትትም)።

trainው blocking የሆነውን `npm run check:cycles:ratchet` ያስኬዳል፤ ብቻውን `npm run check:cycles`
አማካሪ ነው (SCCsን ይዘረዝራል፣ እና ጤናማ base ላይ እንኳን non-zero በሆነ ኮድ ይወጣል)።
