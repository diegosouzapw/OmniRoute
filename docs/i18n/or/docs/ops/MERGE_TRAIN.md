# Merge Queue & Manual Merge-Train Runbook (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 (ଗୁଣବତ୍ତା/ବେଗ ଯୋଜନାର WS3.2/WS3.4) ପରଠାରୁ, ସମୀକ୍ଷା ହୋଇଥିବା PRଗୁଡ଼ିକୁ
`release/vX.Y.Z`ରେ ମିଶ୍ରଣ କରିବା ପାଇଁ ଡିଫଲ୍ଟ ପଥ ହେଉଛି **Mergify ମର୍ଜ କ୍ୟୁ** (`.mergify.yml`);
ନିମ୍ନରେ ଲିପିବଦ୍ଧ **ମାନୁଆଲ୍ ମର୍ଜ-ଟ୍ରେନ୍** ହେଉଛି ବିକଳ୍ପ ବ୍ୟବସ୍ଥା — ଘଟଣା ସମୟରେ,
ରିଲିଜ୍ ଫ୍ରିଜ୍ ସମୟରେ, କିମ୍ବା Mergify Open Source ଯୋଜନା କେବେ ପରିବର୍ତ୍ତିତ ହେଲେ ଏହା ବ୍ୟବହୃତ ହୁଏ।

## ଡିଫଲ୍ଟ ପଥ: Mergify କ୍ୟୁ

1. PRଟି କ୍ୟାମ୍ପେନ୍ଗୁଡ଼ିକ ଦ୍ୱାରା ସମୀକ୍ଷିତ/ଗ୍ରୀନ୍ ହୋଇଛି ଏବଂ ମାଲିକଙ୍କ ପ୍ରି-ମର୍ଜ ⭐
   ଗେଟ୍ ଦ୍ୱାରା ଅନୁମୋଦିତ ହୋଇଛି (ରିପୋର୍ଟ + ପ୍ରତ୍ୟେକ ଆଇଟମ୍ର ନିଷ୍ପତ୍ତି — `/merge-prs`ର ପଦକ୍ଷେପ 0.75 ଦେଖନ୍ତୁ)।
2. ମାଲିକ (କିମ୍ବା ମାଲିକଙ୍କ ନିଷ୍ପତ୍ତି ଅନୁସାରେ କାର୍ଯ୍ୟ କରୁଥିବା ସେସନ୍) **`queue`**
   ଲେବଲ୍ ପ୍ରୟୋଗ କରନ୍ତି। ଏହି ଲେବଲ୍ ହିଁ ମର୍ଜ ଅନୁମୋଦନ; Mergify କେବଳ ଏହାକୁ କାର୍ଯ୍ୟକାରୀ କରେ।
3. Mergify କ୍ୟୁରେ ଥିବା ସର୍ବାଧିକ 10ଟି PRକୁ ବ୍ୟାଚ୍ କରେ, ଫାଷ୍ଟ-ଗେଟ୍ଗୁଡ଼ିକ ବିପକ୍ଷରେ ବ୍ୟାଚ୍କୁ
   ବୈଧ କରେ ଏବଂ ମର୍ଜ (squash) କରେ। ଏକ ରେଡ୍ ବ୍ୟାଚ୍କୁ **ସ୍ୱୟଂଚାଳିତ ଭାବେ ଦୁଇ ଭାଗରେ ବିଭାଜନ କରାଯାଏ** — ତ୍ରୁଟିକାରୀ PRଟି
   ~log2(N) ପୁନଃବୈଧିକରଣ ମଧ୍ୟରେ ପୃଥକ କରାଯାଇ କ୍ୟୁରୁ ବାହାର କରାଯାଏ; ଅନ୍ୟଗୁଡ଼ିକ ଆଗକୁ ବଢ଼ନ୍ତି।
4. ମର୍ଜ ପରେ, ନିରନ୍ତର release-green ୱର୍କଫ୍ଲୋ push ସମୟରେ ନୂତନ tipକୁ ବୈଧ କରେ
   ଏବଂ ସମ୍ମିଶ୍ରଣଟି ରିଗ୍ରେସ୍ କରିଥିଲେ ଏକ attribution issue ଖୋଲେ (କଦାପି ସ୍ୱୟଂଚାଳିତ ଭାବେ revert କରେନାହିଁ)।

ସୁରକ୍ଷା ବ୍ୟବସ୍ଥା (`CLAUDE.md`ର Hard Rules #21/#22ର ପ୍ରତିରୂପ):

- **ରିଲିଜ୍ ଫ୍ରିଜ୍ ଖୋଲା ଅଛି** → ଫ୍ରିଜ୍ ହୋଇଥିବା branchକୁ ଲକ୍ଷ୍ୟ କରୁଥିବା PRଗୁଡ଼ିକୁ ଲେବଲ୍ କରନ୍ତୁ ନାହିଁ; ପ୍ରଥମେ
  ସକ୍ରିୟ `release/vX+1`କୁ ପୁନଃଲକ୍ଷ୍ୟ କରନ୍ତୁ।
- **ଅନ୍ୟ ସେସନ୍ର ଚାଲୁଥିବା PR** → ଏହାକୁ କଦାପି ଲେବଲ୍ କରନ୍ତୁ ନାହିଁ; କେବଳ ମାଲିକାନାଧୀନ ସେସନ୍ ନିଜ କାର୍ଯ୍ୟକୁ କ୍ୟୁରେ ରଖେ।
- କେବଳ ଟେଷ୍ଟ୍ ଥିବା diff ଏବଂ `hotfix`-ଲେବଲ୍ ହୋଇଥିବା PRଗୁଡ଼ିକ ପୂର୍ବରୁ ହ୍ରାସପ୍ରାପ୍ତ CI ଚଳାନ୍ତି
  (`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane ଦେଖନ୍ତୁ); ପ୍ରକୃତରେ ଚାଲିଥିବା ଯେକୌଣସି
  check ସେଟ୍କୁ କ୍ୟୁ ସର୍ତ୍ତଗୁଡ଼ିକ ଗ୍ରହଣ କରନ୍ତି (`#check-failure=0` + `#check-pending=0`)।

## ବିକଳ୍ପ ବ୍ୟବସ୍ଥା: ମାନୁଆଲ୍ ମର୍ଜ-ଟ୍ରେନ୍

କ୍ୟୁ ଉପଲବ୍ଧ ନଥିବାବେଳେ ବ୍ୟବହୃତ ହୁଏ। ଏହା v3.8.47 ଚକ୍ର ସମୟରେ ଗୋଟିଏ ଦିନରେ
33ଟି PR ନିଷ୍କାସନ କରିଥିବା ପ୍ରଚଳନକୁ ଔପଚାରିକ କରେ:

1. **ବ୍ୟାଚ୍ ଏକତ୍ର କରନ୍ତୁ** (~10–30ଟି ସମୀକ୍ଷିତ+ଅନୁମୋଦିତ PR)। `linked:` ସଂଘର୍ଷ
   (ସମାନ `tap.testFiles`, ସମାନ CHANGELOG hunk) ଯାଞ୍ଚ କରନ୍ତୁ ଏବଂ ସେଗୁଡ଼ିକୁ କ୍ରମିକ ଭାବେ ପ୍ରକ୍ରିୟାକରଣ କରନ୍ତୁ।
2. **ଥରେ ମାତ୍ର ବୈଧ କରନ୍ତୁ**: ରିଲିଜ୍ tipରୁ ତିଆରି ଏକ ପୃଥକ worktreeରେ ସମସ୍ତ ବ୍ୟାଚ୍
   headକୁ ସ୍ଥାନୀୟ ଭାବେ ମର୍ଜ କରନ୍ତୁ, ତା’ପରେ ରିଲିଜ୍-ସମତୁଲ suite
   (`npm run check:release-green`, ରିଲିଜ୍ ପୂର୍ବରୁ `--with-build` ଯୋଡ଼ନ୍ତୁ) ଚଳାନ୍ତୁ।
   `scripts/release/merge-train.sh <base> <PR#>…` ପଦକ୍ଷେପ 1–2କୁ ସ୍ୱୟଂଚାଳିତ କରେ (ସଂଘର୍ଷକାରୀ
   PRଗୁଡ଼ିକ ବାହାରିଯାନ୍ତି, ଟ୍ରେନ୍ ଆଗକୁ ଚାଲେ)। Full modeରେ `npm run test:unit` ଚାଲେ —
   box ପାଇଁ ଟ୍ୟୁନ୍ ହୋଇଥିବା runner (`--test-concurrency=20`), **କ୍ରମିକ ଭାବେ ଚାଲୁଥିବା ଦୁଇଟି 4-core CI
   shard ନୁହେଁ**, ଯାହା ଏକ 16-core boxର ପ୍ରାୟ ~25%ରେ ପ୍ରମୁଖ phaseକୁ ଚଳାଇଥିଲା (ସମାଧାନ
   2026-07-18)। `--fast` (ଦିନ ମଧ୍ୟରେ mega-train ନିଷ୍କାସନ, 2026-07-18ରେ ମାଲିକଙ୍କ ଦ୍ୱାରା ଅନୁମୋଦିତ)
   ପ୍ରତ୍ୟେକ static gate + vitest ରଖେ, କିନ୍ତୁ କେବଳ ଚଢ଼ାଯାଇଥିବା PRଗୁଡ଼ିକ ଦ୍ୱାରା ପରିବର୍ତ୍ତିତ node:test ଫାଇଲ୍ଗୁଡ଼ିକୁ
   ଚଳାଏ; ସଞ୍ଚିତ tipରେ FULL suite ତଥାପି ଦିନକୁ ଅତି କମରେ ଥରେ
   ଚାଲିବା ଆବଶ୍ୟକ (`--fast` ବିନା ଗୋଟିଏ ଟ୍ରେନ୍)।
3. **ଗ୍ରୀନ୍** → PRଗୁଡ଼ିକୁ କ୍ରମାନୁସାରେ ମର୍ଜ କରନ୍ତୁ (ପ୍ରତ୍ୟେକଟି ପୂର୍ବରୁ `state,headRefOid` ପୁନଃଯାଞ୍ଚ କରି —
   ଯେଉଁ PRର head ବଦଳିଛି, ତାହା ପୁଣି ସମୀକ୍ଷା କ୍ୟୁକୁ ପ୍ରବେଶ କରେ)। ପ୍ରତ୍ୟେକ ମର୍ଜର net diff
   PRଟିର ନିଜସ୍ୱ ପରିବର୍ତ୍ତନ ବୋଲି ପ୍ରମାଣ କରନ୍ତୁ (କୌଣସି auto-resolve revert ନୁହେଁ: ପରିସର ବାହାରର
   deletion ପାଇଁ `git diff --stat` ଅଡିଟ୍ କରନ୍ତୁ)।
4. **ରେଡ୍** → ଗୋଟିଏ ଗୋଟିଏ କରି ପୁନଃବୈଧିକରଣ କରିବା ପରିବର୍ତ୍ତେ ବ୍ୟାଚ୍କୁ ଦୁଇ ଅର୍ଦ୍ଧରେ ବିଭାଜନ କରନ୍ତୁ (ପ୍ରତ୍ୟେକ ଅର୍ଦ୍ଧକୁ ବୈଧ କରନ୍ତୁ);
   ପ୍ରମାଣ ସହିତ ତ୍ରୁଟିକାରୀ PRକୁ ପୁଣି ସମୀକ୍ଷା କ୍ୟୁକୁ ପଠାନ୍ତୁ।
5. **କେବେ ନୁହେଁ**: ଫ୍ରିଜ୍ ସମୟରେ ଫ୍ରିଜ୍ ହୋଇଥିବା branchରେ ମର୍ଜ କରିବା; କୌଣସି ସ୍ଥାନରେ `git stash`;
   ରେଡ୍ ଅବସ୍ଥା ଚାଲିଯିବ ବୋଲି ଆଶା କରି ସମଗ୍ର CIକୁ ପୁନଃଚଳାଇବା (ନିୟମ: ଏକ ରେଡ୍ ହେଉଛି ସୂଚନା)।

## ସ୍ତରୀକରଣ (କେବଳ ଫାଷ୍ଟ-ଗେଟ୍ ସହିତ କ୍ୟୁ କାହିଁକି ସୁରକ୍ଷିତ)

- **ପ୍ରତ୍ୟେକ PR ପାଇଁ** (quality.yml ଫାଷ୍ଟ-ଗେଟ୍): TIA-ପ୍ରଭାବିତ ଟେଷ୍ଟ୍ + ସମ୍ପୂର୍ଣ୍ଣ unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog ଅଖଣ୍ଡତା।
- **ପ୍ରତ୍ୟେକ batch/tip ପାଇଁ** (ନିରନ୍ତର release-green): release branchକୁ ପ୍ରତ୍ୟେକ pushରେ `--quick` HARD gate;
  ପୂର୍ଣ୍ଣ `--with-build --full-ci` sweep ଦିନକୁ 3×।
- **ପ୍ରତ୍ୟେକ ରିଲିଜ୍ ପାଇଁ** (ରିଲିଜ୍ PRରେ ci.yml): E2E ×9 ସହିତ ସମ୍ପୂର୍ଣ୍ଣ matrix,
  package-artifact + tarball boot-smoke, coverage/ratchet।

ପୂର୍ବ ତୁଳନାରେ କିଛି ମଧ୍ୟ କମ୍ ବୈଧ କରାଯାଉନାହିଁ — ଭାରୀ surface କେବଳ ପ୍ରତ୍ୟେକ PR ପରିବର୍ତ୍ତେ
ପ୍ରତ୍ୟେକ batch/tip ପାଇଁ ଚାଲେ, ଏବଂ ଏହାହିଁ O(N) round-tripଗୁଡ଼ିକୁ ଦୂର କରେ।
