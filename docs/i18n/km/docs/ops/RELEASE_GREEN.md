# Release-Green: keeping the queue and release branch green (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## បញ្ហាដែលវាដោះស្រាយ

**ច្រកត្រួតពិនិត្យពេញលេញ** (`.github/workflows/ci.yml` — unit shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) ដំណើរការ **តែលើ PR សម្រាប់ការចេញផ្សាយប៉ុណ្ណោះ** (PR → `main`)។ PR ដែលកំណត់គោលដៅទៅ
`release/**` ទទួលបាន **ច្រកត្រួតពិនិត្យរហ័ស** (`quality.yml`: ការធ្វើតេស្តដែលរងផលប៉ះពាល់ដោយ TIA + typecheck + lint)
ហើយសម្រាប់ការផ្លាស់ប្តូរកូដ វាក៏ទទួលបាន production build ក្នុងលក្ខណៈ **ផ្តល់ព័ត៌មានណែនាំ** ផងដែរ។ ផលវិបាកគឺ៖ កំហុសក្រហមដែលកើតឡើងតែនៅពេលចេញផ្សាយអាចបន្ត
កកកុញដោយស្ងៀមស្ងាត់លើ release branch ហើយ **ផ្ទុះឡើងជាបន្តបន្ទាប់ក្នុងស្រទាប់នីមួយៗប្រហែល 40 នាទី** នៅពេលចេញផ្សាយ
ម្តងមួយៗ។

ក្រុម "release-green" មានឡើងដើម្បី **ព្យាករទុកជាមុន** នូវកំហុសក្រហមទាំងនោះ — ផ្ទៀងផ្ទាត់អ្វីដែលស្មើនឹងច្រកត្រួតពិនិត្យពេញលេញ
**នៅក្នុងមូលដ្ឋាន / ក្រៅដំណើរការចេញផ្សាយ** នៅពេលណាក៏បាន ដើម្បីឱ្យ PR សម្រាប់ការចេញផ្សាយមានស្ថានភាព
បៃតងរួចជាស្រេចនៅពេល CI ដំណើរការលើកដំបូង។

> **គោលការណ៍ដែលមិនអាចចរចាបាន៖** គ្មានអ្វីក្នុងនេះរារាំងអ្នករួមចំណែកឡើយ។ យើងមិនបន្ថែម
> ការត្រួតពិនិត្យចាំបាច់ដែលធ្វើឱ្យ PR របស់ពួកគេបរាជ័យទេ។ **គម្លាត** (ratchets) គឺសម្រាប់អ្នកថែទាំធ្វើ rebaseline នៅពេលចេញផ្សាយ —
> មិនមែនជាកង្វល់របស់អ្នករួមចំណែកឡើយ។ គ្មានផ្នែកណាមួយ **បិទ** PR (ការលួចយកកិត្តិយស) ឬ
> **បន្ធូរ** ការធ្វើតេស្តដើម្បីឱ្យវាឆ្លងឡើយ។

## ក្រុមនេះ (4 ផ្នែក) — និងរបៀបដែលផ្នែកនីមួយៗដំណើរការដោយឯករាជ្យ

| ផ្នែក                                                                        | វាជាអ្វី                                                                               | ពេលណាត្រូវដំណើរការ                                                     | វិសាលភាព                      |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------- |
| **`/green-prs`** (ដំណោះស្រាយ A)                                              | ការស្កេនតាមតម្រូវការដោយអ្នកថែទាំលើ **ជួរ PR ដែលកំពុងបើក**                              | **ដោយឯករាជ្យ និងតាមកាលកំណត់** — ជាពិសេស **មុនពេល** `/generate-release` | ជួរ PR ទាំងមូល → `release/**` |
| **`/validate-release-green`** (ដំណោះស្រាយ C — `npm run check:release-green`) | ម៉ាស៊ីនផ្ទៀងផ្ទាត់៖ បង្កើតឡើងវិញនូវច្រកត្រួតពិនិត្យពេញលេញធៀបនឹង branch ឬបេក្ខភាព merge | ដោយឯករាជ្យ នៅពេលណាក៏បាន                                                | branch ជាក់លាក់មួយ ឬ merge-PR |
| **`/babysit <PR#>`**                                                         | ជំរុញ **CI ផ្ទាល់** របស់ PR **មួយ** ឱ្យទៅជាបៃតង                                        | ដោយឯករាជ្យ សម្រាប់ PR នីមួយៗ                                           | PR តែមួយ                      |
| **`nightly-release-green.yml`** (ដំណោះស្រាយ D)                               | workflow ប្រចាំយប់ស្វ័យប្រវត្តិ; បើក issue នៅពេលមានកំហុសក្រហម HARD                     | ស្វ័យប្រវត្តិ (cron)                                                   | release branch ដែលសកម្ម       |

**ចម្លើយខ្លីចំពោះសំណួរ "តើនេះសម្រាប់តែការចេញផ្សាយមែនទេ?":** **ទេ។** `/green-prs` ត្រូវបានរចនាឡើងដើម្បី
ដំណើរការ **តាមកាលកំណត់ នៅចន្លោះការចេញផ្សាយនីមួយៗ**។ ការដំណើរការដោយឯករាជ្យគឺជាការប្រើប្រាស់ធម្មតា — ការចេញផ្សាយគ្រាន់តែជា
ពេលវេលាដែលការដំណើរការវាផ្តល់តម្លៃច្រើនបំផុតប៉ុណ្ណោះ។

## ការ build ប្រឹក្សាពី PR ទៅកាន់ release

ឥឡូវនេះ `quality.yml` រួមបញ្ចូល `Build (advisory)` សម្រាប់ code PR ដែលមិនមែនជា draft និង branch ជួររង់ចាំរបស់ Mergify។
វាធ្វើតាមរូបមន្ត production build ពី `ci.yml` ដូចគ្នា៖ Node 24, `npm-ci-retry`,
`check:node-runtime` និង `npm run build` ជាមួយ `OMNIROUTE_USE_TURBOPACK=1`។ ដោយចេតនា វា
មិន upload build artifact ទេ ពីព្រោះគ្មាន quality job នៅខាងក្រោយណាមួយប្រើវាក្នុង workflow នេះ។
សូមដក `continue-on-error` ចេញ បន្ទាប់ពីការដំណើរការ release-PR មានស្ថិរភាពរយៈពេលមួយសប្ដាហ៍ ដើម្បីឱ្យសញ្ញានេះក្លាយជា
ច្រកត្រួតពិនិត្យ PR-to-release ដែលអាចរារាំងបាន។

## ដំណោះស្រាយ C — `npm run check:release-green` (ម៉ាស៊ីន)

បង្កើតឡើងវិញនូវការផ្ទៀងផ្ទាត់ដែលស្មើនឹង release លើ working tree បច្ចុប្បន្ន ហើយចាត់ថ្នាក់ស្ថានភាពក្រហមនីមួយៗ៖

- **HARD** (កំហុស typecheck, lint, unit, vitest, db-rules, public-creds និង `package-artifact`
  ជាជម្រើស) → **កំហុសពិតប្រាកដ**; `exit 1`។ ត្រូវបានជួសជុលលើ source branch (TDD, វិធាន #18)។
- **DRIFT** (**ការព្រមាន** eslint, cognitive-complexity, file-size) → ភាពរំកិលរបស់ ratchet ដែលបានកើនសន្សំក្នុង
  cycle, **មិនមែនជាកំហុសរបស់អ្នករួមចំណែកទេ**; វាគ្រាន់តែត្រូវបានរាយការណ៍ ហើយ **កំណត់ baseline ឡើងវិញដោយ maintainer នៅពេល
  release**។ Drift **មិនដែល**ផ្លាស់ប្ដូរ exit code ទេ — ដូច្នេះវាមិនដែលរារាំងនរណាម្នាក់ឡើយ។

```bash
npm run check:release-green                 # branch បច្ចុប្បន្ន (working tree)
node scripts/quality/validate-release-green.mjs --json   # output ដែលមានរចនាសម្ព័ន្ធ
node scripts/quality/validate-release-green.mjs --quick  # រំលង unit+vitest (មានតែ drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # រួមបញ្ចូល package-artifact (យឺត)
```

ធ្វើរោគវិនិច្ឆ័យ និង**រាយការណ៍**ប៉ុណ្ណោះ (គ្មានការជួសជុលស្វ័យប្រវត្តិ)។ ដំណើរការសម្របសម្រួល fix-to-green ស្ថិតនៅក្នុង
`/green-prs` និង `/review-prs`។

## ដំណោះស្រាយ A — `/green-prs` (ការស្កេនជួររង់ចាំ)

នីតិវិធី (សេចក្ដីសង្ខេប — សូមមើល skill `green-prs` សម្រាប់ព័ត៌មានលម្អិត)៖

1. **ធ្វើបញ្ជីសារពើភណ្ឌ**នៃជួររង់ចាំរបស់ PR ដែលបើកទាំងអស់ ធៀបនឹង release branch សកម្ម។
2. **ចាត់ថ្នាក់បឋម** PR នីមួយៗ (អាចប្រើបាន / គួរបដិសេធ / ត្រូវការអ្នកនិពន្ធ) — ប្រភេទគួរបដិសេធ/ត្រូវការអ្នកនិពន្ធ
   ត្រូវបាន**រាយការណ៍ មិនមែនបិទទេ** (អ្នកនិពន្ធជាអ្នកសម្រេចចិត្ត)។
3. សម្រាប់ PR ដែលអាចប្រើបាននីមួយៗ ក្នុង **worktree ដាច់ដោយឡែក** (វិធាន #19) ត្រូវធ្វើឱ្យ PR ទាន់ release tip ហើយដំណើរការ
   `npm run check:release-green`៖
   - **HARD** → ជួសជុល **លើ branch របស់អ្នករួមចំណែក** តាមរយៈ co-authorship (រក្សាស្ថានភាព "Merged" របស់អ្នកនិពន្ធ)
     ហើយដំណើរការឡើងវិញរហូតដល់ HARD ទាំងអស់ត្រូវបានដោះស្រាយ។
   - **DRIFT** → ទុកវាចោល; វានឹងត្រូវបានកំណត់ baseline ឡើងវិញនៅពេល release។
4. **រាយការណ៍**ជាតារាង PR × (សេចក្ដីសម្រេច, HARD reds, បានជួសជុល?, DRIFT, release-green ឥឡូវនេះ?)។

អាច**រៀបចំ**ជួររង់ចាំដោយមិន merge; merge តែនៅពេលមានការស្នើសុំយ៉ាងច្បាស់ប៉ុណ្ណោះ — ហើយមិនដែលបិទ PR ទេ។

## ចន្លោះពេលដែលបានណែនាំ

- ដំណើរការ **`/green-prs` ជាប្រចាំ** (ឧ. រៀងរាល់សប្ដាហ៍) និង**ជានិច្ច មុនពេល
  `/generate-release`**។
- រក្សា **`nightly-release-green.yml`** (ដំណោះស្រាយ D) ជាសញ្ញាបន្តបន្ទាប់៖ នៅពេលវាបើក issue
  HARD red នោះគឺជាពេលត្រូវធ្វើការស្កេន។
- ប្រើ **`/validate-release-green`** តាមតម្រូវការ ដើម្បីពិនិត្យ branch ឬ merge candidate ជាក់លាក់មួយ។
- ប្រើ **`/babysit <PR#>`** នៅពេល PR ជាក់លាក់មួយត្រូវការការតាមដានរហូតដល់មានស្ថានភាព green លើ CI ជាក់ស្ដែង។

## ទំនាក់ទំនងជាមួយ release

- `/generate-release` ហៅការផ្ទៀងផ្ទាត់ក្នុង **ដំណាក់កាល 0 (ការត្រួតពិនិត្យមុនចាប់ផ្ដើម)**៖ កំណត់ baseline របស់ DRIFT ឡើងវិញ និងជួសជុល
  HARD មុនពេលបើក release PR។
- `/review-prs` ប្រើច្រកត្រួតពិនិត្យ release-green នៅជំហានសម្រេចចិត្ត merge (green-before-merge)។

គោលដៅរបស់ផ្នែកទាំងអស់គឺដូចគ្នា៖ **release PR ដែលមានស្ថានភាព green នៅការដំណើរការ CI លើកដំបូង** ជំនួសឱ្យការដោះស្រាយ
ស្ថានភាពក្រហមជាស្រទាប់ៗ ដែលមួយស្រទាប់ចំណាយពេល 40 នាទី នៅថ្ងៃ release។
