# Merge Queue & Manual Merge-Train Runbook (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

ចាប់តាំងពី v3.8.49 (WS3.2/WS3.4 នៃផែនការ quality/velocity) ផ្លូវ merge លំនាំដើមសម្រាប់
PRs ដែលបាន review ចូលទៅក្នុង `release/vX.Y.Z` គឺ **Mergify merge queue** (`.mergify.yml`);
ចំណែកឯ **manual merge-train** ដែលបានចងក្រងជាឯកសារខាងក្រោមគឺជា FALLBACK — ប្រើក្នុងអំឡុងពេលមានឧប្បត្តិហេតុ,
ការផ្អាក release ឬប្រសិនបើគម្រោង Mergify Open Source មានការផ្លាស់ប្ដូរ។

## ផ្លូវលំនាំដើម៖ ជួរ Mergify

1. PR ត្រូវបាន review/ធ្វើឱ្យ green ដោយ campaigns និងអនុម័តដោយច្រក ⭐ មុនពេល merge
   របស់ម្ចាស់ (របាយការណ៍ + ការសម្រេចចិត្តតាមធាតុនីមួយៗ — សូមមើល `/merge-prs` ជំហាន 0.75)។
2. ម្ចាស់ (ឬ session ដែលអនុវត្តតាមការសម្រេចចិត្តរបស់ម្ចាស់) ដាក់ស្លាក **`queue`**។
   ស្លាកនេះគឺជាការអនុម័តឱ្យ merge; Mergify គ្រាន់តែអនុវត្តវាប៉ុណ្ណោះ។
3. Mergify ដាក់ PRs ដែលនៅក្នុងជួររហូតដល់ 10 ជាបាច់ ផ្ទៀងផ្ទាត់បាច់នោះនឹង fast-gates
   ហើយ merge (squash)។ បាច់ដែល red ត្រូវបាន **បែងចែកជាពីរដោយស្វ័យប្រវត្តិ** — PR ដែលបង្កបញ្ហា
   ត្រូវបានញែកចេញក្នុងការផ្ទៀងផ្ទាត់ឡើងវិញប្រហែល ~log2(N) ដង និងដកចេញពីជួរ; PRs ដែលនៅសល់បន្តដំណើរការ។
4. បន្ទាប់ពី merge រួច workflow continuous release-green ផ្ទៀងផ្ទាត់ tip ថ្មីនៅពេល push
   និងបើក attribution issue ប្រសិនបើការរួមបញ្ចូលនោះបង្ក regression (មិនធ្វើ auto-revert ឡើយ)។

វិធានការការពារ (ឆ្លុះបញ្ចាំងតាម `CLAUDE.md` Hard Rules #21/#22)៖

- **Release freeze បើកដំណើរការ** → កុំដាក់ស្លាកលើ PRs ដែលកំណត់គោលដៅទៅ branch ដែលត្រូវបានផ្អាក; ដំបូងត្រូវប្ដូរគោលដៅទៅ
  `release/vX+1` ដែលកំពុងសកម្ម។
- **PR ដែលកំពុងដំណើរការរបស់ session ផ្សេង** → កុំដាក់ស្លាកលើវា; មានតែ session ដែលជាម្ចាស់ប៉ុណ្ណោះអាចដាក់ការងាររបស់ខ្លួនចូលជួរ។
- Diffs ដែលមានតែ tests និង PRs ដែលមានស្លាក `hotfix` ដំណើរការ CI កម្រិតកាត់បន្ថយរួចហើយ (សូមមើល
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); លក្ខខណ្ឌរបស់ជួរទទួលយកសំណុំ check ណាមួយ
  ដែលបានដំណើរការជាក់ស្ដែង (`#check-failure=0` + `#check-pending=0`)។

## ជម្រើសបម្រុង៖ manual merge-train

ប្រើនៅពេល queue មិនអាចប្រើបាន។ វាកំណត់ជាផ្លូវការនូវការអនុវត្តដែលបានបញ្ចប់ PRs ចំនួន 33
ក្នុងមួយថ្ងៃ អំឡុង cycle v3.8.47៖

1. **រៀបចំបាច់** (ប្រហែល ~10–30 PRs ដែលបាន review+approved)។ ពិនិត្យការប៉ះទង្គិច `linked:`
   (`tap.testFiles` ដូចគ្នា, CHANGELOG hunks ដូចគ្នា) ហើយដំណើរការពួកវាតាមលំដាប់។
2. **ផ្ទៀងផ្ទាត់តែម្ដង**៖ នៅក្នុង worktree ដាច់ដោយឡែកដែលចេញពី release tip សូម merge batch
   heads ទាំងអស់នៅ local បន្ទាប់មកដំណើរការ suite ដែលសមមូលនឹង release
   (`npm run check:release-green`, បន្ថែម `--with-build` មុនពេល release)។
   `scripts/release/merge-train.sh <base> <PR#>…` ធ្វើឱ្យជំហាន 1–2 ដំណើរការដោយស្វ័យប្រវត្តិ (PRs ដែលប៉ះទង្គិច
   ត្រូវបានដកចេញ ហើយ train បន្តដំណើរការ)។ Full mode ដំណើរការ `npm run test:unit` — ដែលជា
   runner កែសម្រួលសម្រាប់ម៉ាស៊ីន (`--test-concurrency=20`) **មិនមែន** CI shards ពីរដែលដំណើរការតាមលំដាប់
   និងមាន 4-core ទេ ព្រោះវាបានធ្វើឱ្យដំណាក់កាលសំខាន់ប្រើត្រឹមប្រហែល ~25% នៃម៉ាស៊ីន 16-core (បានកែតម្រូវ
   2026-07-18)។ `--fast` (ការបង្ហូរ mega-train ក្នុងថ្ងៃតែមួយ ដែលម្ចាស់បានអនុម័ត 2026-07-18)
   រក្សាទុករាល់ static gate + vitest ប៉ុន្តែដំណើរការតែឯកសារ node:test ដែលបានផ្លាស់ប្ដូរដោយ
   PRs ដែលបានចូលរួមប៉ុណ្ណោះ; FULL suite នៅតែត្រូវដំណើរការយ៉ាងហោចណាស់មួយដងក្នុងមួយថ្ងៃលើ
   tip ដែលបានប្រមូលផ្ដុំ (train មួយដោយគ្មាន `--fast`)។
3. **Green** → merge PRs តាមលំដាប់ (ដោយពិនិត្យ `state,headRefOid` ឡើងវិញមុនពេលនីមួយៗ —
   PR ដែល head បានផ្លាស់ទីត្រូវចូលដំណើរការ review ឡើងវិញ)។ បញ្ជាក់ថា net diff នៃ merge នីមួយៗគឺជា
   ការផ្លាស់ប្ដូររបស់ PR នោះផ្ទាល់ (មិនធ្វើ auto-resolve reverts៖ សវនកម្ម `git diff --stat` ដើម្បីរក
   ការលុបដែលនៅក្រៅវិសាលភាព)។
4. **Red** → បែងចែកបាច់ជាពីរផ្នែក (ផ្ទៀងផ្ទាត់ផ្នែកនីមួយៗ) ជំនួសឱ្យការផ្ទៀងផ្ទាត់ឡើងវិញ
   ម្ដងមួយៗ; បញ្ជូន PR ដែលបង្កបញ្ហាត្រឡប់ទៅ review queue ជាមួយភស្តុតាង។
5. **មិនត្រូវធ្វើដាច់ខាត**៖ merge ចូល branch ដែលត្រូវបានផ្អាកក្នុងអំឡុងពេល freeze; ប្រើ `git stash` នៅកន្លែងណាក៏ដោយ;
   ដំណើរការ CI ឡើងវិញទាំងស្រុងដោយសង្ឃឹមថា red នឹងបាត់ទៅ (ច្បាប់៖ red គឺជាព័ត៌មាន)។

## ការបែងចែកតាមថ្នាក់ (មូលហេតុដែល queue មានសុវត្ថិភាពដោយប្រើតែ fast-gates)

- **ក្នុងមួយ PR** (quality.yml fast-gates)៖ tests ដែលរងផលប៉ះពាល់ដោយ TIA + full unit 4-shard +
  vitest + lint bag + typecheck + ការធានាសុចរិតភាពរបស់ docs/changelog។
- **ក្នុងមួយ batch/tip** (continuous release-green)៖ `--quick` HARD gates នៅរាល់ការ push ទៅ
  release branch; full `--with-build --full-ci` sweeps 3×/day។
- **ក្នុងមួយ release** (ci.yml នៅលើ release PR)៖ matrix ពេញលេញ រួមមាន E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets។

គ្មានអ្វីត្រូវបានផ្ទៀងផ្ទាត់តិចជាងមុនទេ — ផ្ទៃការងារធ្ងន់គ្រាន់តែដំណើរការក្នុងមួយ batch/tip
ជំនួសឱ្យក្នុងមួយ PR ដែលនេះជាអ្វីដែលលុបបំបាត់ O(N) round-trips។
