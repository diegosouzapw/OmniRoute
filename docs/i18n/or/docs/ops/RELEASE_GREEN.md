# Release-Green: keeping the queue and release branch green (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## ଏହା ସମାଧାନ କରୁଥିବା ସମସ୍ୟା

**ସମ୍ପୂର୍ଣ୍ଣ ଗେଟ୍** (`.github/workflows/ci.yml` — unit shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) **କେବଳ release PR** (PR → `main`) ରେ ଚାଲେ। `release/**`କୁ
ଟାର୍ଗେଟ୍ କରୁଥିବା PRଗୁଡ଼ିକ **fast-gates** (`quality.yml`: TIA-ପ୍ରଭାବିତ ପରୀକ୍ଷା + typecheck + lint)
ପାଆନ୍ତି ଏବଂ କୋଡ୍ ପରିବର୍ତ୍ତନ ପାଇଁ ଏକ **ପରାମର୍ଶମୂଳକ** production build ମଧ୍ୟ ପାଆନ୍ତି। ଏହାର ପରିଣାମ:
କେବଳ release ସମୟରେ ଦେଖାଯାଉଥିବା ବିଫଳତାଗୁଡ଼ିକ release branchରେ ନିରବରେ ଜମା ହୋଇପାରେ ଏବଂ
release ସମୟରେ ଗୋଟିଏ ପରେ ଗୋଟିଏ କରି **~40 ମିନିଟ୍ର ସ୍ତରରେ ବିସ୍ଫୋରିତ ହୋଇପାରେ**।

"release-green family" ସେହି ବିଫଳତାଗୁଡ଼ିକୁ **ଆଗରୁ ଅନୁମାନ କରିବା** ପାଇଁ ରହିଛି — ଯେକୌଣସି
ସମୟରେ full gateର ସମତୁଲ୍ୟକୁ **ସ୍ଥାନୀୟ ଭାବେ / release ବାହାରେ** ବୈଧ କରିବା, ଯାହାଦ୍ୱାରା
release PR ତାହାର ପ୍ରଥମ CI runରେ ହିଁ green ରହେ।

> **ଅପରିବର୍ତ୍ତନୀୟ ନୀତି:** ଏଥିରୁ କୌଣସିଟି contributorଙ୍କୁ ଅବରୋଧ କରେ ନାହିଁ। ଆମେ
> ସେମାନଙ୍କ PRକୁ ବିଫଳ କରୁଥିବା କୌଣସି required check ଯୋଡ଼ୁ ନାହିଁ। **drift** (ratchets) release
> ସମୟରେ maintainerଙ୍କ ଦ୍ୱାରା rebaseline କରିବା ପାଇଁ — ଏହା କେବେବି contributorଙ୍କ ଚିନ୍ତାର
> ବିଷୟ ନୁହେଁ। କୌଣସି ଅଂଶ PRକୁ **ବନ୍ଦ କରେ ନାହିଁ** (credit theft) କିମ୍ବା pass କରାଇବା
> ପାଇଁ କୌଣସି testକୁ **ଦୁର୍ବଳ କରେ ନାହିଁ**।

## ଏହି ପରିବାର (4ଟି ଅଂଶ) — ଏବଂ ପ୍ରତ୍ୟେକଟି କିପରି ସ୍ୱାଧୀନ ଭାବେ ଚାଲେ

| ଅଂଶ                                                                      | ଏହା କ’ଣ                                                                               | କେବେ ଚଲାଇବେ                                                                  | ପରିସର                                 |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------- |
| **`/green-prs`** (ସମାଧାନ A)                                              | **ଖୋଲା PRଗୁଡ଼ିକର ଧାଡ଼ି** ଉପରେ maintainerଙ୍କ ଚାହିଦାନୁସାରେ scan                         | **ସ୍ୱାଧୀନ ଭାବେ, ସମୟାନ୍ତରରେ** — ଏବଂ ବିଶେଷକରି `/generate-release`ର **ପୂର୍ବରୁ** | ସମଗ୍ର PR ଧାଡ଼ି → `release/**`         |
| **`/validate-release-green`** (ସମାଧାନ C — `npm run check:release-green`) | ବୈଧତାକରଣ engine: ଏକ branch କିମ୍ବା merge candidate ବିପକ୍ଷରେ full gateକୁ ପୁନଃସୃଷ୍ଟି କରେ | ସ୍ୱାଧୀନ ଭାବେ, ଯେକୌଣସି ସମୟରେ                                                  | ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ branch କିମ୍ବା merge-PR |
| **`/babysit <PR#>`**                                                     | **ଗୋଟିଏ** PRର **live CI**କୁ green ସ୍ଥିତିକୁ ନେଇଯାଏ                                     | ସ୍ୱାଧୀନ ଭାବେ, ପ୍ରତ୍ୟେକ PR ପାଇଁ                                               | ଗୋଟିଏ PR                              |
| **`nightly-release-green.yml`** (ସମାଧାନ D)                               | ସ୍ୱୟଂଚାଳିତ nightly workflow; HARD red ହେଲେ issue ଖୋଲେ                                 | ସ୍ୱୟଂଚାଳିତ (cron)                                                            | ସକ୍ରିୟ release branch                 |

**"ଏହା କେବଳ release ପାଇଁ କି?"ର ସଂକ୍ଷିପ୍ତ ଉତ୍ତର:** **ନା।** `/green-prs`କୁ
**releaseଗୁଡ଼ିକ ମଧ୍ୟରେ, ସମୟାନ୍ତରରେ** ଚଲାଇବା ପାଇଁ ଡିଜାଇନ୍ କରାଯାଇଥିଲା। ସ୍ୱାଧୀନ ଭାବେ ଚଲାଇବା
ହେଉଛି ସାଧାରଣ ବ୍ୟବହାର — release କେବଳ ସେହି ମୁହୂର୍ତ୍ତ, ଯେତେବେଳେ ଏହାକୁ ଚଲାଇବାରୁ ସର୍ବାଧିକ
ମୂଲ୍ୟ ମିଳେ।

## PR-ରୁ-release ପରାମର୍ଶମୂଳକ build

`quality.yml` ବର୍ତ୍ତମାନ non-draft code PR ଏବଂ Mergify queue branchଗୁଡ଼ିକ ପାଇଁ `Build (advisory)` ଅନ୍ତର୍ଭୁକ୍ତ କରେ।
ଏହା `ci.yml`ର production build recipeକୁ ଅନୁସରଣ କରେ: Node 24, `npm-ci-retry`,
`check:node-runtime`, ଏବଂ `OMNIROUTE_USE_TURBOPACK=1` ସହିତ `npm run build`। ଏହି workflowରେ କୌଣସି downstream quality job build artifact ବ୍ୟବହାର କରୁ ନଥିବାରୁ ଏହା ଉଦ୍ଦେଶ୍ୟମୂଳକ ଭାବେ
କୌଣସି build artifact upload କରେ ନାହିଁ।
ଗୋଟିଏ ସପ୍ତାହର ସ୍ଥିର release-PR run ପରେ `continue-on-error`କୁ ହଟାନ୍ତୁ, ଯାହାଦ୍ୱାରା signalଟି ଏକ
blocking PR-to-release gate ହୋଇଯିବ।

## ସମାଧାନ C — `npm run check:release-green` (ଇଞ୍ଜିନ୍)

ବର୍ତ୍ତମାନର working tree ବିପକ୍ଷରେ release-ସମତୁଲ validation ପୁନଃଉତ୍ପାଦନ କରେ ଏବଂ ପ୍ରତ୍ୟେକ redକୁ ଶ୍ରେଣୀବଦ୍ଧ କରେ:

- **HARD** (typecheck, lint error, unit, vitest, db-rules, public-creds, ଇଚ୍ଛାଧୀନ
  `package-artifact`) → **ପ୍ରକୃତ ତ୍ରୁଟି**; `exit 1`। source branchରେ ସମାଧାନ କରାଯାଏ (TDD, ନିୟମ #18)।
- **DRIFT** (eslint **warning**, cognitive-complexity, file-size) → cycleରେ ସଞ୍ଚିତ ratchet drift,
  **contributorଙ୍କ ଦୋଷ ନୁହେଁ**; ଏହା କେବଳ report କରାଯାଏ ଏବଂ **release ସମୟରେ maintainerଙ୍କ ଦ୍ୱାରା
  rebaseline କରାଯାଏ**। Drift **କେବେବି** exit code ପରିବର୍ତ୍ତନ କରେ ନାହିଁ — ତେଣୁ ଏହା କାହାକୁ ବି block କରେ ନାହିଁ।

```bash
npm run check:release-green                 # ବର୍ତ୍ତମାନର branch (working tree)
node scripts/quality/validate-release-green.mjs --json   # ସଂରଚିତ output
node scripts/quality/validate-release-green.mjs --quick  # unit+vitest ଛାଡ଼ିଦିଏ (କେବଳ drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact ଅନ୍ତର୍ଭୁକ୍ତ କରେ (ଧୀର)
```

କେବଳ ନିଦାନ ଏବଂ **report** କରେ (କୌଣସି auto-fix ନାହିଁ)। fix-to-green orchestration
`/green-prs` ଏବଂ `/review-prs`ରେ ରହିଛି।

## ସମାଧାନ A — `/green-prs` (queue scan)

ପ୍ରକ୍ରିୟା (ସାରାଂଶ — ବିବରଣୀ ପାଇଁ `green-prs` skill ଦେଖନ୍ତୁ):

1. ସକ୍ରିୟ release branch ବିପକ୍ଷରେ open PRଗୁଡ଼ିକର queueକୁ **Inventory** କରନ୍ତୁ।
2. ପ୍ରତ୍ୟେକ PRକୁ **Triage** କରନ୍ତୁ (viable / reject-worthy / needs-author) — reject/needs-authorକୁ
   **report କରାଯାଏ, close କରାଯାଏ ନାହିଁ** (ଲେଖକ ନିଷ୍ପତ୍ତି ନିଅନ୍ତି)।
3. ପ୍ରତ୍ୟେକ viable PR ପାଇଁ, ଏକ **ପୃଥକ worktree**ରେ (ନିୟମ #19), PRଟିକୁ release tip ପର୍ଯ୍ୟନ୍ତ ଆଣନ୍ତୁ ଏବଂ
   `npm run check:release-green` ଚଲାନ୍ତୁ:
   - **HARD** → co-authorship ମାଧ୍ୟମରେ **contributorଙ୍କ branchରେ** ସମାଧାନ କରନ୍ତୁ (ଲେଖକଙ୍କ "Merged" status ସଂରକ୍ଷିତ ରହେ),
     ସମସ୍ତ HARD ସଫା ନହେବା ପର୍ଯ୍ୟନ୍ତ ପୁନଃଚଲାନ୍ତୁ।
   - **DRIFT** → ଏହାକୁ ଛାଡ଼ିଦିଅନ୍ତୁ; release ସମୟରେ ଏହା rebaseline କରାଯିବ।
4. ଏକ PR × (verdict, HARD red, fixed?, DRIFT, release-green now?) table **Report** କରନ୍ତୁ।

merge ନକରି queueକୁ **ପ୍ରସ୍ତୁତ** କରିପାରେ; କେବଳ ସ୍ପଷ୍ଟ ଭାବେ ଅନୁରୋଧ କରାଗଲେ merge କରେ — ଏବଂ କେବେବି PR close କରେ ନାହିଁ।

## ସୁପାରିଶ କରାଯାଇଥିବା cadence

- **`/green-prs`କୁ ନିୟମିତ ଭାବେ ଚଲାନ୍ତୁ** (ଯଥା, ସାପ୍ତାହିକ) ଏବଂ ଏକ
  `/generate-release` ପୂର୍ବରୁ **ସର୍ବଦା** ଚଲାନ୍ତୁ।
- ଏକ ନିରନ୍ତର signal ଭାବେ **`nightly-release-green.yml`** (ସମାଧାନ D)କୁ ରଖନ୍ତୁ: ଏହା ଏକ
  HARD red issue ଖୋଲିଲେ, scan କରିବାର ସମୟ ଆସିଛି।
- ଏକ branch କିମ୍ବା ନିର୍ଦ୍ଦିଷ୍ଟ merge candidateକୁ ଯାଞ୍ଚ କରିବା ପାଇଁ ଆବଶ୍ୟକତାନୁସାରେ **`/validate-release-green`** ବ୍ୟବହାର କରନ୍ତୁ।
- ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ PRକୁ live CIରେ green କରିବା ପର୍ଯ୍ୟନ୍ତ ଆଗେଇନେବା ଆବଶ୍ୟକ ହେଲେ **`/babysit <PR#>`** ବ୍ୟବହାର କରନ୍ତୁ।

## release ସହିତ ସମ୍ପର୍କ

- `/generate-release`, **Phase 0 (pre-flight)**ରେ validationକୁ call କରେ: release PR ଖୋଲିବା ପୂର୍ବରୁ DRIFTକୁ rebaseline କରେ ଏବଂ
  HARDକୁ ସମାଧାନ କରେ।
- `/review-prs`, merge ନିଷ୍ପତ୍ତି ପର୍ଯ୍ୟାୟରେ release-green gate ବ୍ୟବହାର କରେ (merge ପୂର୍ବରୁ green)।

ସମସ୍ତ ଅଂଶର ଲକ୍ଷ୍ୟ ସମାନ: release ଦିନରେ 40-minute layerରେ
redଗୁଡ଼ିକୁ ଗୋଟିଏ ପରେ ଗୋଟିଏ ସମ୍ଭାଳିବା ପରିବର୍ତ୍ତେ, **ପ୍ରଥମ CI runରେ ଏକ green release PR**।
