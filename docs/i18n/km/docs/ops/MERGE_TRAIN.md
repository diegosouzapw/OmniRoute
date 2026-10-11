# Merge Queue & Manual Merge-Train Runbook (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

ចាប់តាំងពី v3.8.49 (WS3.2/WS3.4 នៃផែនការ quality/velocity) ផ្លូវបញ្ចូលចូលគ្នាលំនាំដើមសម្រាប់
PR ដែលបានពិនិត្យរួចទៅក្នុង `release/vX.Y.Z` គឺជា **ជួររង់ចាំបញ្ចូលចូលគ្នារបស់ Mergify** (`.mergify.yml`);
**រថភ្លើងបញ្ចូលចូលគ្នាដោយដៃ** ដែលបានចងក្រងជាឯកសារខាងក្រោមគឺជាជម្រើសបម្រុង — ប្រើអំឡុងពេលមានឧបទ្ទវហេតុ,
ការផ្អាក release ឬប្រសិនបើគម្រោង Open Source របស់ Mergify ផ្លាស់ប្តូរនៅពេលណាមួយ។

## ផ្លូវលំនាំដើម៖ ជួររង់ចាំរបស់ Mergify

1. PR ត្រូវបានពិនិត្យ/ផ្តល់សញ្ញាបៃតងដោយ campaigns និងអនុម័តដោយច្រកត្រួតពិនិត្យ ⭐ មុន merge របស់ម្ចាស់
   (របាយការណ៍ + ការសម្រេចចិត្តតាមធាតុនីមួយៗ — សូមមើល `/merge-prs` ជំហាន 0.75)។
2. ម្ចាស់ (ឬ session ដែលកំពុងអនុវត្តតាមការសម្រេចចិត្តរបស់ម្ចាស់) ដាក់ស្លាក **`queue`**។
   ស្លាកនេះគឺជាការអនុម័តឱ្យ merge; Mergify គ្រាន់តែប្រតិបត្តិវាប៉ុណ្ណោះ។
3. Mergify ផ្ទៀងផ្ទាត់ PR ដែលស្ថិតក្នុងជួររង់ចាំ **ជាលំដាប់ម្តងមួយៗ** (មួយក្នុងមួយពេល) ដោយផ្អែកលើ fast-gates
   ហើយធ្វើការ merge (squash)។ ការដាក់ជាបាច់ + ការបំបែកស្វ័យប្រវត្តិដើម្បីរកកំហុស គឺជាកម្រិតសេវា Mergify ដែលត្រូវបង់ប្រាក់
   ("Cannot use Merge Queue batch" នៅលើគម្រោងឥតគិតថ្លៃ, #7220) ដូច្នេះ `.mergify.yml` មិនកំណត់
   `batch_size` ទេ; ការដាក់ជាបាច់នៅតែជាភារកិច្ចរបស់ merge-train ដោយដៃខាងក្រោម។ PR ណាមួយដែល
   ការត្រួតពិនិត្យនៅតែរង់ចាំបន្ទាប់ពី `checks_timeout` (240 នាទី = 2× នៃ p95 ដែលបានវាស់របស់
   `quality.yml`) នឹងត្រូវដកចេញពីជួរ ជំនួសឱ្យការធ្វើឱ្យជួររង់ចាំជាប់គាំង។
4. បន្ទាប់ពី merge រួច workflow សម្រាប់រក្សាស្ថានភាព release-green ជាបន្តបន្ទាប់ នឹងផ្ទៀងផ្ទាត់ tip ថ្មីនៅពេល push
   ហើយបើក issue សម្រាប់កំណត់ប្រភពទំនួលខុសត្រូវ ប្រសិនបើការរួមបញ្ចូលគ្នានោះបានធ្លាក់ចុះគុណភាព (មិនធ្វើ auto-revert ឡើយ)។

របាំងការពារ (ដូចគ្នានឹង `CLAUDE.md` Hard Rules #21/#22)៖

- **Release freeze កំពុងបើក** → កុំដាក់ស្លាកលើ PR ដែលកំណត់គោលដៅទៅ branch ដែលកំពុងបង្កក; ត្រូវប្តូរគោលដៅទៅ
  `release/vX+1` ដែលកំពុងសកម្មជាមុនសិន។
- **PR ដែលកំពុងដំណើរការរបស់ session ផ្សេង** → កុំដាក់ស្លាកលើវា; មានតែ session ដែលជាម្ចាស់ប៉ុណ្ណោះដែលអាចដាក់
  ការងាររបស់ខ្លួនចូលជួររង់ចាំ។
- diff ដែលមានតែ tests និង PR ដែលមានស្លាក `hotfix` ដំណើរការ CI ដែលបានកាត់បន្ថយរួចហើយ (សូមមើល
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); លក្ខខណ្ឌរបស់ជួររង់ចាំទទួលយកសំណុំការត្រួតពិនិត្យណាក៏ដោយដែល
  បានដំណើរការជាក់ស្តែង (`#check-failure=0` + `#check-pending=0`)។

## ជម្រើសបម្រុង៖ រថភ្លើងបញ្ចូលចូលគ្នាដោយដៃ

ប្រើនៅពេលជួររង់ចាំមិនអាចប្រើបាន។ វាកំណត់ជាផ្លូវការនូវការអនុវត្តដែលបានបញ្ចប់ PR ចំនួន 33 ក្នុង
មួយថ្ងៃ អំឡុងវដ្ត v3.8.47៖

1. **ប្រមូលផ្តុំក្រុម** (PR ដែលបានពិនិត្យ+អនុម័តប្រហែល 10–30)។ ពិនិត្យការប៉ះទង្គិច `linked:`
   (`tap.testFiles` ដូចគ្នា ផ្នែក CHANGELOG ដូចគ្នា) ហើយដំណើរការពួកវាតាមលំដាប់។
2. **ផ្ទៀងផ្ទាត់តែម្តង**៖ ក្នុង worktree ដាច់ដោយឡែកមួយដែលចេញពី release tip បញ្ចូល heads ទាំងអស់របស់ក្រុម
   នៅ local បន្ទាប់មកដំណើរការ suite ដែលស្មើនឹង release
   (`npm run check:release-green`, បន្ថែម `--with-build` មុន release)។
   `scripts/release/merge-train.sh <base> <PR#>…` ធ្វើឱ្យជំហាន 1–2 ដំណើរការដោយស្វ័យប្រវត្តិ (PR ដែលមាន conflict
   ត្រូវបានដកចេញ ហើយរថភ្លើងបន្តដំណើរ)។ Full mode ដំណើរការ `npm run test:unit` — runner
   ដែលបានកែសម្រួលសម្រាប់ម៉ាស៊ីន (`--test-concurrency=20`) **មិនមែន** CI shards 4-core ចំនួនពីរដែលដំណើរការតាមលំដាប់
   ដែលបានធ្វើឱ្យដំណាក់កាលសំខាន់ប្រើត្រឹមប្រហែល ~25% នៃម៉ាស៊ីន 16-core (បានកែ
   2026-07-18)។ `--fast` (ការបញ្ចប់ mega-train ក្នុងថ្ងៃតែមួយ ដែលម្ចាស់បានអនុម័ត 2026-07-18)
   រក្សា static gate ទាំងអស់ + vitest ប៉ុន្តែដំណើរការតែឯកសារ node:test ដែលបានផ្លាស់ប្តូរដោយ
   PR ដែលបានឡើងរថភ្លើង; suite FULL នៅតែត្រូវដំណើរការយ៉ាងហោចណាស់ម្តងក្នុងមួយថ្ងៃលើ
   tip ដែលបានប្រមូលផ្តុំ (រថភ្លើងមួយដោយគ្មាន `--fast`)។
3. **បៃតង** → បញ្ចូល PR តាមលំដាប់ (ពិនិត្យ `state,headRefOid` ម្តងទៀតមុន PR នីមួយៗ —
   PR ដែល head របស់វាបានផ្លាស់ប្តូរ ត្រូវចូលការពិនិត្យឡើងវិញ)។ បញ្ជាក់ថា diff សរុបរបស់ការបញ្ចូលនីមួយៗគឺជា
   ការផ្លាស់ប្តូរផ្ទាល់របស់ PR នោះ (មិនអនុញ្ញាតឱ្យ auto-resolve ធ្វើការ revert៖ ត្រួតពិនិត្យ `git diff --stat` រក
   ការលុបដែលនៅក្រៅវិសាលភាព)។
4. **ក្រហម** → បែងចែកក្រុមជាពាក់កណ្តាល (ផ្ទៀងផ្ទាត់ពាក់កណ្តាលនីមួយៗ) ជំនួសឱ្យការផ្ទៀងផ្ទាត់ឡើងវិញ
   ម្តងមួយៗ; បញ្ជូន PR ដែលបង្កបញ្ហាត្រឡប់ទៅជួររង់ចាំពិនិត្យជាមួយភស្តុតាង។
5. **មិនត្រូវធ្វើដាច់ខាត**៖ បញ្ចូលទៅក្នុង branch ដែលបានផ្អាកអំឡុងពេល freeze; ប្រើ `git stash` នៅកន្លែងណាមួយ;
   ដំណើរការ CI ឡើងវិញទាំងស្រុងដោយសង្ឃឹមថាសញ្ញាក្រហមនឹងបាត់ (ច្បាប់៖ សញ្ញាក្រហមគឺជាព័ត៌មាន)។

## ការបែងចែកជាថ្នាក់ (ហេតុអ្វីបានជាជួររង់ចាំមានសុវត្ថិភាពដោយប្រើតែ fast-gates)

- **ក្នុងមួយ PR** (quality.yml fast-gates)៖ ការធ្វើតេស្តដែលរងផលប៉ះពាល់ដោយ TIA + unit 4-shard ពេញលេញ +
  vitest + lint bag + typecheck + ភាពត្រឹមត្រូវនៃ docs/changelog។
- **ក្នុងមួយក្រុម/tip** (continuous release-green)៖ HARD gates `--quick` នៅរាល់ push ទៅ
  release branch; ការត្រួតពិនិត្យពេញលេញ `--with-build --full-ci` ចំនួន 3×/ថ្ងៃ។
- **ក្នុងមួយ release** (ci.yml លើ release PR)៖ matrix ពេញលេញ រួមទាំង E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets។

គ្មានអ្វីត្រូវបានផ្ទៀងផ្ទាត់តិចជាងមុនទេ — ផ្ទៃធ្ងន់គ្រាន់តែដំណើរការក្នុងមួយក្រុម/tip
ជំនួសឱ្យក្នុងមួយ PR ដែលនេះហើយជាអ្វីដែលលុបចោលការធ្វើដំណើរទៅមក O(N)។

## តម្រូវការជាមុនសម្រាប់ fresh-checkout របស់ `merge-train.sh`

ស្គ្រីបដំណើរការ **preflight** ដែលបរាជ័យភ្លាមៗលើ root checkout (មុនការងារ worktree
ណាមួយ) ដូច្នេះ install ដែលខូចមិនអាចក្លែងខ្លួនជារថភ្លើងក្រហមបានឡើយ៖

1. `npm ci` បន្ទាប់មកដំណើរការ postinstall របស់ `bun` ដែល npm រារាំង៖
   `(cd node_modules/bun && node install.js)` — បើមិនដូច្នោះទេ `check:provider-consistency`
   និង `check:known-symbols` (ទាំងពីរ `bun scripts/…`) នឹងបរាជ័យទាំងលើរថភ្លើង និង base ដោយ
   គ្មានបន្ទាត់បង្ហាញ violation។
2. មិនត្រូវមាន `node_modules/node_modules` ដែលលើសមកទេ (dependency tree ស្ទួន; React ត្រូវបានផ្ទុកពីរដង
   ហើយ UI vitest suites បរាជ័យភ្លាមៗ)។
3. `node_modules/.bin/tsc` ត្រូវមានវត្តមាន និងអាចប្រតិបត្តិបាន (install មិនពេញលេញមិនមានវា)។

រថភ្លើងដំណើរការ `npm run check:cycles:ratchet` ដែលជា blocking; `npm run check:cycles`
ធម្មតាគឺសម្រាប់ផ្តល់ព័ត៌មានណែនាំ (វារាយ SCCs ហើយចេញដោយ non-zero ទោះបីជា base មានសុខភាពល្អក៏ដោយ)។
