# 🗜️ Prompt Compression Guide — OmniRoute (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> សន្សំបាន 15-95% លើ context ដែលមានលក្ខណៈសម្បត្តិគ្រប់គ្រាន់ដោយស្វ័យប្រវត្តិ។ សម្រាប់ទិដ្ឋភាពទូទៅរហ័ស សូមមើល [ផ្នែក Compression ក្នុង README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)។

## ទិដ្ឋភាពទូទៅ

OmniRoute អនុវត្ត pipeline បង្រួម prompt បែបម៉ូឌុល ដែលដំណើរការ **ជាមុន** មុនពេលសំណើទៅដល់ provider ខាងលើ។ នេះមានន័យថា ការសន្សំ token របស់អ្នកកើតឡើងដោយតម្លាភាព — មិនចាំបាច់ផ្លាស់ប្តូរ workflow របស់អ្នកទេ។

```
សំណើរបស់ Client
  → កម្មវិធីជ្រើសរើសយុទ្ធសាស្ត្របង្រួម
    → មានការកំណត់ combo ជាន់ពីលើឬ? → ប្រើការកំណត់ combo
    → ដល់កម្រិត auto-trigger ឬ? → ប្រើ mode ស្វ័យប្រវត្តិ
    → មាន mode លំនាំដើមឬ? → ប្រើការកំណត់សកល
    → បិទឬ? → រំលងការបង្រួម
  → Mode បង្រួមដែលបានជ្រើសរើស
    → បិទ: គ្មានការបង្រួម
    → Lite: សម្អាត whitespace/ទ្រង់ទ្រាយដោយសុវត្ថិភាព (~15%)
    → Standard: ដកពាក្យបំពេញបែបនិយាយខ្លីៗ (~30%)
    → Aggressive: កាត់បន្ថយប្រវត្តិចាស់ៗ + សង្ខេប (~50%)
    → Ultra: កាត់ចេញតាម heuristic + បង្រួម code block (~75%)
    → RTK: ត្រងលទ្ធផល terminal/tool ដោយយល់ដឹងពី command (កម្រិត 60-90% ខាង upstream)
    → Stacked: Pipeline ពហុ-engine តាមលំដាប់ ជាទូទៅ RTK បន្ទាប់មក Caveman (កម្រិត 78-95% នៃទិន្នន័យដែលមានលក្ខណៈសម្បត្តិគ្រប់គ្រាន់)
  → សំណើដែលបានបង្រួម → Provider
```

---

## Mode បង្រួម

### បិទ

មិនអនុវត្តការបង្រួមទេ។ សារទាំងអស់ត្រូវបានបញ្ជូនឆ្លងកាត់ដោយគ្មានការផ្លាស់ប្តូរ។

### Mode Lite (សន្សំបាន ~15%, latency <1ms)

ជា mode ដែលមានសុវត្ថិភាពបំផុត — គ្មានការផ្លាស់ប្តូរអត្ថន័យឡើយ មានតែការសម្អាតទ្រង់ទ្រាយប៉ុណ្ណោះ៖

| បច្ចេកទេស                | ការពិពណ៌នា                                       |
| ------------------------ | ------------------------------------------------ |
| `collapseWhitespace`     | បញ្ចូលបន្ទាត់ទទេជាប់គ្នា និងដកចន្លោះនៅចុងបន្ទាត់ |
| `dedupSystemPrompt`      | ដកសារ system ដែលស្ទួន                            |
| `compressToolResults`    | បង្រួមលទ្ធផល tool/function ដែលវែងអន្លាយ          |
| `removeRedundantContent` | ដកសេចក្តីណែនាំដែលបានធ្វើម្តងទៀត                  |
| `replaceImageUrls`       | ធ្វើឱ្យ URI ទិន្នន័យរូបភាព base64 ខ្លីជាងមុន     |

**ស័ក្តិសមបំផុតសម្រាប់៖** ការប្រើប្រាស់ជាប្រចាំ និង workflow ដែលផ្តោតសំខាន់លើសុវត្ថិភាព។

### Mode Standard (សន្សំបាន ~30%)

ទទួលបានគំនិតពី [Caveman](https://github.com/JuliusBrussee/caveman) — ដកពាក្យបំពេញ និងឃ្លាវែងអន្លាយ ខណៈពេលរក្សាអត្ថន័យ៖

- ដកពាក្យបំពេញ ("សូម", "ខ្ញុំគិតថា", "ជាមូលដ្ឋាន", "តាមពិត")
- បង្រួមឃ្លាវែងអន្លាយ ("ដើម្បីធ្វើការ" → "ដើម្បី", "ជាលទ្ធផលនៃ" → "ដោយសារ")
- ដកឃ្លាបន្ទន់បែបគួរសម ("តើអ្នកអាច...", "ប្រសិនបើអ្នកអាច...")
- មានច្បាប់ regex ជាង 30 ដែលបានសម្រួលសម្រាប់ coding prompt

**ស័ក្តិសមបំផុតសម្រាប់៖** workflow សរសេរកូដប្រចាំថ្ងៃ និងក្រុមដែលយកចិត្តទុកដាក់លើថ្លៃចំណាយ។

### Mode Aggressive (សន្សំបាន ~50%)

ការគ្រប់គ្រងប្រវត្តិឆ្លាតវៃសម្រាប់ session វែងៗ៖

- **ការកាត់បន្ថយសារចាស់ៗ** — សារចាស់ៗត្រូវបានបង្រួមកាន់តែច្រើនតាមលំដាប់
- **ការសង្ខេបលទ្ធផល Tool** — លទ្ធផល tool វែងៗត្រូវបានជំនួសដោយសេចក្តីសង្ខេប
- **របាំងការពារសុចរិតភាពរចនាសម្ព័ន្ធ** — ធានាថាគូ `tool_use` + `tool_result` នៅតែស៊ីសង្វាក់គ្នា
- **ការយល់ដឹងអំពី Context Window** — គោរពដែនកំណត់ token របស់ model នីមួយៗ

**ស័ក្តិសមបំផុតសម្រាប់៖** session បំបាត់កំហុសរយៈពេលវែង និង codebase ធំៗ។

### Mode Ultra (សន្សំបាន ~75%)

ការបង្រួមអតិបរមាសម្រាប់សេណារីយ៉ូដែល token មានសារៈសំខាន់ខ្លាំង៖

- **ការកាត់ចេញតាម Heuristic** — ដកសារដែលមានពិន្ទុក្រោមកម្រិតភាពពាក់ព័ន្ធ
- **ការបង្រួម Code Block** — បង្រួមឧទាហរណ៍កូដដដែលៗ
- **ការកាត់តាម Binary Search** — ស្វែងរកចំណុចកាត់ដ៏ល្អបំផុតសម្រាប់ context window
- រួមបញ្ចូលលក្ខណៈពិសេសទាំងអស់របស់ mode Aggressive

**ស័ក្តិសមបំផុតសម្រាប់៖** នៅពេលអ្នកឈានដល់ដែនកំណត់ context ម្តងហើយម្តងទៀត។

### Mode RTK (កម្រិត 60-90% ខាង upstream)

Mode RTK ត្រូវបានបង្កើនប្រសិទ្ធភាពសម្រាប់លទ្ធផល tool វែងអន្លាយដែលបង្ហាញក្នុង session របស់ coding agent៖

- រកឃើញប្រភេទ command/output ដូចជា `git status`, `git diff`, `git log`, test runner,
  build របស់ TypeScript/Vite/Webpack, ESLint/Biome/Prettier, npm audit/ការដំឡើង, Docker log, លទ្ធផល
  infrastructure និងលទ្ធផល shell ទូទៅ
- អនុវត្តកញ្ចប់តម្រង JSON ពី `open-sse/services/compression/engines/rtk/filters/`
- នាំចូលតម្រង RTK TOML schema v1 ពីឯកសារ `filters.toml` របស់ project ឬសកល ដោយមានការផ្ទៀងផ្ទាត់ inline-test
  និងការគ្រប់គ្រងដោយផ្អែកលើភាពជឿទុកចិត្តសម្រាប់ឯកសារ project
- ភ្ជាប់មកជាមួយតម្រង built-in ចំនួន 49 ដែលមានគំរូផ្ទៀងផ្ទាត់ inline
- ដកលំដាប់បញ្ជា ANSI, progress bar, បន្ទាត់ដដែលៗ និងទិន្នន័យរំខានដែលមិនអាចយកទៅអនុវត្តបាន
- រក្សាទុកភាពបរាជ័យ កំហុស ការព្រមាន ឯកសារដែលបានផ្លាស់ប្តូរ សេចក្តីសង្ខេប និងផ្នែកចុងនៃលទ្ធផលវែងៗ
- គាំទ្រតម្រង project ដែលគ្រប់គ្រងដោយផ្អែកលើភាពជឿទុកចិត្ត តម្រងសកល និងជម្រើសស្ដារលទ្ធផលដើមដែលបានលាក់ព័ត៌មានរសើប

**ស័ក្តិសមបំផុតសម្រាប់៖** session របស់ agent ដែលមាន transcript ពី shell, build, test, git, grep និងលទ្ធផលឯកសារ។

### Mode Stacked (កម្រិត 78-95% នៃទិន្នន័យដែលមានលក្ខណៈសម្បត្តិគ្រប់គ្រាន់)

Mode Stacked ដំណើរការ engine បង្រួមច្រើនតាមលំដាប់កំណត់ជាក់លាក់។ Pipeline លំនាំដើមគឺ៖

```txt
RTK -> Caveman
```

លំដាប់នោះធ្វើឱ្យលទ្ធផល terminal/tool មានទំហំតូចជាមុនសិន បន្ទាប់មកអនុវត្តការបង្រួមអត្ថន័យរបស់ Caveman ទៅលើ
prompt ជាភាសាធម្មជាតិដែលនៅសល់។ Pipeline បែប Stacked អាចត្រូវបានកំណត់ជាសកល ឬតាមរយៈ
compression combo ដែលបានកំណត់ឱ្យ routing combo។

**ស័ក្តិសមបំផុតសម្រាប់៖** context ចម្រុះដែលមាន tool log ទំហំធំ រួមជាមួយសេចក្តីណែនាំរបស់មនុស្ស ឬសេចក្តីសង្ខេបរបស់ assistant។

---

## គណនាសន្សំសំចៃពីប្រភពខាងលើ

OmniRoute កត់ត្រាការសន្សំសំចៃពីការបង្ហាប់ដោយផ្អែកលើប្រភពពីរ៖ លទ្ធផលតេស្តសមត្ថភាពរបស់គម្រោងប្រភពខាងលើ និង
ការរួមបញ្ចូលម៉ាស៊ីនផ្ទាល់ខ្លួនរបស់ OmniRoute។

| ប្រភព   | តួលេខពី README នៃប្រភពខាងលើដែលបានប្រើនៅទីនេះ                                                                                     |
| ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | token លទ្ធផលតិចជាង `~75%`, ការសន្សំលទ្ធផលជាមធ្យម `65%` ក្នុងតេស្តសមត្ថភាព, ចន្លោះ `22-87%` និងឧបករណ៍បង្ហាប់ទិន្នន័យបញ្ចូល `~46%` |
| RTK     | ការសន្សំលទ្ធផលពាក្យបញ្ជា `60-90%`; សម័យគំរូប្រើ token `~118,000 -> ~23,900` ឬសន្សំបាន `79.7%` (`~80%`)                           |

សម្រាប់ទិន្នន័យផ្ទុករបស់ឧបករណ៍/បរិបទដែលត្រួតគ្នា បន្សំលំនាំដើមរបស់ OmniRoute ដាក់ម៉ាស៊ីនជាបន្តបន្ទាប់៖

```txt
RTK -> Caveman
```

ការសន្សំសរុបគឺគុណបញ្ចូលគ្នា មិនមែនបូកបញ្ចូលគ្នាទេ៖

```txt
combined = 1 - (1 - ការសន្សំរបស់ RTK) * (1 - ការសន្សំទិន្នន័យបញ្ចូលរបស់ Caveman)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

តួលេខ `78-95%` នោះអនុវត្តនៅពេលដែលទាំង RTK និង Caveman អាចកាត់បន្ថយទិន្នន័យបញ្ចូល/បរិបទដូចគ្នា។
របៀបលទ្ធផលឆ្លើយតបរបស់ Caveman គឺដាច់ដោយឡែក៖ នៅពេលបើកវា សូមប្រើការសន្សំលទ្ធផលផ្ទាល់របស់ Caveman (`65%`
ជាមធ្យម, `~75%` ជាតួលេខចម្បង, ចន្លោះ `22-87%`)។ ការសន្សំលើវិក្កយបត្រសរុបអាស្រ័យលើសមាមាត្រ prompt/លទ្ធផលរបស់អ្នក។

### តើ "មានសិទ្ធិ" មានន័យយ៉ាងដូចម្តេចពិតប្រាកដ

ចន្លោះតួលេខចម្បង 15-95% គឺពិតប្រាកដ ប៉ុន្តែវាអនុវត្តតែចំពោះមាតិកា **ស្ទួន ឬវែងអន្លាយ** ប៉ុណ្ណោះ — ដូចជា
បន្ទាត់កំហុសដដែលៗ កំណត់ហេតុ build ដែលបញ្ចេញការព្រមានដដែលៗច្រើនពេក ឬលទ្ធផល `grep`/ការអានឯកសារដែលធំហួសកម្រិត។ វា
**មិនមែន** មានន័យថារាល់សំណើទាំងអស់សន្សំបានច្រើនបែបនោះទេ។

បានផ្ទៀងផ្ទាត់តាមការពិសោធន៍ (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`)៖ ការដំណើរការ
`stacked` (RTK + Caveman) លើប្លុក `tool_result` ទម្រង់ Anthropic ដែលមានបន្ទាត់កំហុសដូចគ្នា 300 បន្ទាត់
ផ្តល់លទ្ធផលជា **ការសន្សំ token 95.93% / ការសន្សំតួអក្សរ 96.26%** — ស្ថិតចំក្នុងចន្លោះដែលបានផ្សព្វផ្សាយ។
ប៉ុន្តែ pipeline ដដែលដែលដំណើរការលើលទ្ធផលឧបករណ៍ធម្មតា ដែលមិនស្ទួន (បញ្ជីលទ្ធផលត្រូវគ្នាពី `grep` ដែលស្អាត
ការអានឯកសារខ្លី និងអត្ថបទសន្ទនាធម្មតា) ផ្តល់ **ការសន្សំជិតសូន្យ** យ៉ាងត្រឹមត្រូវ ព្រោះ
គ្មានអ្វីស្ទួនដែលត្រូវដកចេញទេ ហើយ `validateCompression()` (`validation.ts`) បដិសេធមិនបញ្ជូន
ការសរសេរឡើងវិញដែលអាចលុប ឬកែប្រែប្លុកកូដ URLs ចំណងជើង កំណែ ឬ identifiers ថេរដែលសរសេរជាអក្សរធំទាំងអស់។

នេះជាឥរិយាបថសុវត្ថិភាពដែលបានរំពឹងទុក មិនមែនជា bug ទេ៖ សម័យសរសេរកូដដែលភាគច្រើនអាន/ប្រើ `grep` លើឯកសារស្អាតៗ នឹង
ឃើញការសន្សំសរុបក្នុងកម្រិតមធ្យម ទោះបីបានបើកការបង្ហាប់ពេញលេញក៏ដោយ ខណៈដែលសម័យដែលជួប
រង្វិលជុំបរាជ័យ ឬ linter ដែលបញ្ចេញលទ្ធផលច្រើន នឹងឃើញចន្លោះពេញលេញ 78-95% លើចរាចរណ៍នោះ។ កុំយកភាគរយ
សន្សំសរុបទាបពីសម័យតែមួយធ្វើជាភស្តុតាងថាការបង្ហាប់ត្រូវបានកំណត់រចនាសម្ព័ន្ធខុស — ជាដំបូង សូមពិនិត្យមើលថាតើ
លទ្ធផលមូលដ្ឋានរបស់ឧបករណ៍ពិតជាស្ទួនឬអត់។

---

## រូបភាពបង្ហាញការសន្សំ Token

```
ដោយគ្មានការបង្ហាប់៖ token 47K ត្រូវបានផ្ញើទៅ LLM
ជាមួយ Lite៖           token 40K ត្រូវបានផ្ញើ          (សន្សំបាន 15% — មានសុវត្ថិភាព និងបើកជានិច្ច)
ជាមួយ Standard៖       token 33K ត្រូវបានផ្ញើ          (សន្សំបាន 30% — ច្បាប់ caveman-speak)
ជាមួយ Aggressive៖     token 24K ត្រូវបានផ្ញើ          (សន្សំបាន 50% — ការធ្វើឱ្យចាស់ + ការសង្ខេប)
ជាមួយ Ultra៖          token 12K ត្រូវបានផ្ញើ          (សន្សំបាន 75% — ការកាត់ចេញតាម heuristic)
ជាមួយ RTK៖            token 19K-5K ត្រូវបានផ្ញើ       (សន្សំបាន 60-90% លើលទ្ធផលពាក្យបញ្ជា/ឧបករណ៍)
ជាមួយ Stacked៖        token 10K-2.5K ត្រូវបានផ្ញើ     (ចន្លោះ RTK+Caveman ដែលមានសិទ្ធិ 78-95%)
```

---

## ការកំណត់រចនាសម្ព័ន្ធ

### ផ្ទាំងគ្រប់គ្រង

ចូលទៅកាន់ `Dashboard → Context & Cache`៖

- **Caveman** — ការជ្រើសរើសរបៀប កញ្ចប់ភាសា ការមើលជាមុន និងលំនាំដើមសកល
- **RTK** — ការមើលជាមុននៃតម្រងពាក្យបញ្ជា ការកំណត់សុវត្ថិភាព RTK និងបញ្ជីតម្រង
- **Compression Combos** — ខ្សែដំណើរការ engine ដែលមានឈ្មោះ និងត្រូវបានកំណត់ទៅឱ្យ routing combo
- **Auto-Trigger Threshold** — ដំណើរការការបង្ហាប់ដោយស្វ័យប្រវត្តិ នៅពេលចំនួន token លើសកម្រិតកំណត់

### ការកំណត់ជំនួសតាម Combo

នៅក្នុង `Dashboard → Context & Cache → Compression Combos` កំណត់ compression combo មួយទៅឱ្យ routing
combo មួយ៖

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

វាអនុញ្ញាតឱ្យអ្នកប្រើការបង្ហាប់ជាជង់លើអ្នកផ្តល់សេវាឥតគិតថ្លៃ/សម្រាប់សរសេរកូដ ខណៈពេលរក្សា lite mode សម្រាប់ការជាវ
ដែលបង់ប្រាក់។

ការកំណត់ "Per-Combo Override" នេះគឺជាការគ្រប់គ្រងខុសពីការកំណត់ជំនួស **routing-combo compression
mode** (Default/Off/Lite/Standard/Aggressive/Ultra) — ការកំណត់ជំនួសនោះមិនជ្រើសរើសខ្សែដំណើរការ
compression-combo ដែលមានឈ្មោះទេ។ វាគ្រាន់តែកំណត់វាល `compressionMode` ដែលត្រូវបានប្រើដោយ
`resolveCompressionPlan` ប៉ុណ្ណោះ។ អ្នកអាចកំណត់វានៅលើកាត combo (`Dashboard → Combos`) ឬចាប់តាំងពី
#6760 មក កំណត់តាម routing combo នៅក្នុងបញ្ជី "Assign to routing" លើ
`Dashboard → Context & Cache → Compression Combos` ដែលស្ថិតនៅជាប់ប្រអប់ធីកសម្រាប់កំណត់ខ្សែដំណើរការ
ដែលបានរៀបរាប់ខាងលើ។ ផ្ទៃប្រើប្រាស់ទាំងពីររក្សាទុកតាមរយៈ endpoint `PUT /api/combos/{id}` ដូចគ្នា។

### ការកំណត់ជំនួសតាមសំណើ

ផ្ញើ request header `x-omniroute-compression` ដើម្បីកំណត់ជំនួសគម្រោងបង្ហាប់សម្រាប់សំណើតែមួយ។
វាមានអាទិភាពខ្ពស់បំផុត — វាឈ្នះការកំណត់ជំនួសរបស់ routing-combo, active profile,
auto-trigger និង Default របស់ផ្ទាំង។ តម្លៃដែលមិនស្គាល់នឹងត្រូវបានមិនអើពើ (សំណើមិនត្រូវបានបដិសេធឡើយ) ហើយ
កុងតាក់មេសកលនៅតែគ្រប់គ្រងអ្វីៗទាំងអស់៖ នៅពេលការបង្ហាប់ត្រូវបានបិទជាសកល header មិនអាច
បើកវាបានទេ។ តម្លៃ៖

| តម្លៃ         | ប្រសិទ្ធភាព                                                                           |
| ------------- | ------------------------------------------------------------------------------------- |
| `off`         | មិនបង្ហាប់សម្រាប់សំណើនេះ។                                                             |
| `default`     | Default profile ដែលបានមកពីផ្ទាំង (មិនអើពើ active profile)។                            |
| `engine:<id>` | engine តែមួយនៅពេលបានបើក ឧទាហរណ៍ `engine:rtk`។                                         |
| `<combo>`     | combo ដែលមានឈ្មោះ ដោយផ្គូផ្គងតាមឈ្មោះជាមុនសិន (មិនប្រកាន់អក្សរធំតូច) បន្ទាប់មកតាម id។ |

គម្រោងដែលបានអនុវត្តនឹងត្រូវបញ្ជូនត្រឡប់មកវិញក្នុង response header `X-OmniRoute-Compression: <mode>; source=<source>`
ដែល `<source>` ជាតម្លៃមួយក្នុងចំណោម `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` ឬ `off`។

### API

```bash
# ទាញយកការកំណត់ការបង្ហាប់
curl http://localhost:20128/api/settings/compression

# ធ្វើបច្ចុប្បន្នភាពការកំណត់ការបង្ហាប់
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# មើល payload RTK/stacked ជាក់លាក់ជាមុន
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# បង្ហាញបញ្ជីកញ្ចប់តម្រង RTK
curl http://localhost:20128/api/context/rtk/filters

# សាកល្បង RTK ដោយផ្ទាល់ជាមួយ metadata ពាក្យបញ្ជាជាជម្រើស
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## អ្វីខ្លះដែលត្រូវបានការពារ

ម៉ាស៊ីនបង្ហាប់ **តែងតែរក្សាទុក៖**

- ✅ ប្លុកកូដ (ទាំង fenced និង inline)
- ✅ URLs និងផ្លូវឯកសារ
- ✅ រចនាសម្ព័ន្ធ JSON និងទិន្នន័យដែលមានរចនាសម្ព័ន្ធ
- ✅ អត្តសញ្ញាណសម្គាល់ និងថូខិនបច្ចេកទេសដែលត្រូវបានការពារ
- ✅ កន្សោមគណិតវិទ្យា
- ✅ និយមន័យការហៅឧបករណ៍/មុខងារ
- ✅ ព្រមផ្តល់ប្រព័ន្ធ (ក្នុងរបៀប lite)

ការសង្គ្រោះលទ្ធផលដើមរបស់ RTK លាក់បាំង API keys ទូទៅ, bearer tokens, Slack tokens, AWS access keys,
ពាក្យសម្ងាត់, ថូខិន និងព័ត៌មានសម្ងាត់ មុនពេលអ្វីមួយត្រូវបានរក្សាទុកជាអចិន្ត្រៃយ៍។

---

## ស្ថិតិនៃការបង្ហាប់

រាល់សំណើដែលបានបង្ហាប់ រួមបញ្ចូលស្ថិតិនៅក្នុងកំណត់ហេតុម៉ាស៊ីនមេ៖

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## ផែនទីផ្លូវតាមដំណាក់កាល

| ដំណាក់កាល    | របៀប                                                                                                                                                  | ស្ថានភាព       |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| ដំណាក់កាល 1  | បិទ, Lite                                                                                                                                             | ✅ បានចេញផ្សាយ |
| ដំណាក់កាល 2  | Standard, Aggressive, Ultra                                                                                                                           | ✅ បានចេញផ្សាយ |
| ដំណាក់កាល 3  | RTK, Stacked, Compression Combos                                                                                                                      | ✅ បានចេញផ្សាយ |
| ដំណាក់កាល 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                           | ✅ បានចេញផ្សាយ |
| ដំណាក់កាល 4C | ថវិកាបរិបទដែលសម្របខ្លួនបាន ("dial") — ម៉ាស៊ីនគណនា + API (`contextBudget` លើ `PUT /api/settings/compression`) + ការគ្រប់គ្រងរបៀប/គោលការណ៍តាម dashboard | ✅ បានចេញផ្សាយ |

---

## ការថ្លែងអំណរគុណ

ច្បាប់បង្ហាប់នៃរបៀប Standard ត្រូវបានបំផុសគំនិតដោយ **[Caveman](https://github.com/JuliusBrussee/caveman)** របស់ **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — គម្រោងដ៏ពេញនិយម "ហេតុអ្វីប្រើថូខិនច្រើន នៅពេលថូខិនតិចក៏អាចធ្វើការបាន"។ Caveman រាយការណ៍ថា ថូខិនលទ្ធផលថយចុះ `~75%`, ការសន្សំលទ្ធផលជាមធ្យមតាម benchmark ចំនួន `65%`, ជួរលទ្ធផល `22-87%` និងឧបករណ៍បង្ហាប់ទិន្នន័យបញ្ចូល `~46%`។

របៀប RTK ត្រូវបានបំផុសគំនិតដោយ **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** របស់ **[RTK AI](https://github.com/rtk-ai)** — គម្រោងបង្ហាប់លទ្ធផលពាក្យបញ្ជាដែលមានប្រសិទ្ធភាពខ្ពស់ សម្រាប់ការច្រោះលទ្ធផល terminal, build, test, git និងឧបករណ៍។ RTK រាយការណ៍ពីការសន្សំ `60-90%` ដោយសម័យគំរូក្នុង README របស់វាបង្ហាញថាបានសន្សំ `~80%`។

---

## ប្រព័ន្ធបង្ហាប់កម្រិតខ្ពស់

ក្រៅពីរបៀបស្តង់ដារទាំង 7 OmniRoute រួមបញ្ចូលប្រព័ន្ធបង្ហាប់កម្រិតខ្ពស់ជាច្រើន
ដែលដំណើរការដោយស្វ័យប្រវត្តិផ្អែកលើបរិបទ។

### ការបង្ហាប់ដែលយល់ដឹងអំពីឃ្លាំងសម្ងាត់

អ្នកផ្តល់សេវាមួយចំនួន (ដូចជា Anthropic ដែលមាន prompt caching) គាំទ្រ **prompt caching**
ដែលអនុញ្ញាតឱ្យពួកគេរក្សាទុកផ្នែកខ្លះនៃ prompt ក្នុងឃ្លាំងសម្ងាត់ ដើម្បីកាត់បន្ថយថ្លៃដើម និងភាពយឺតយ៉ាវ។ នៅពេល
បើកការរក្សាទុកក្នុងឃ្លាំងសម្ងាត់ ការបង្ហាប់កម្រិត aggressive អាចពិតជា **ប៉ះពាល់** ដល់ប្រសិទ្ធភាព
ព្រោះវាផ្លាស់ប្តូរថូខិនដែលបានរក្សាទុកក្នុងឃ្លាំងសម្ងាត់ ដែលធ្វើឱ្យឃ្លាំងសម្ងាត់នោះលែងមានសុពលភាព។

ម៉ូឌុល `cachingAware.ts` ដោះស្រាយបញ្ហានេះដោយ **រកឃើញបរិបទនៃការរក្សាទុកក្នុងឃ្លាំងសម្ងាត់** និង
**កែសម្រួលយុទ្ធសាស្ត្របង្ហាប់** ឱ្យសមស្រប។

#### របៀបដែលវាដំណើរការ

1. **រកឃើញបរិបទនៃការរក្សាទុកក្នុងឃ្លាំងសម្ងាត់** — ស្កេនតួសំណើ ដើម្បីរកសញ្ញាសម្គាល់ `cache_control`
2. **កំណត់អត្តសញ្ញាណអ្នកផ្តល់សេវាដែលគាំទ្រឃ្លាំងសម្ងាត់** — ពិនិត្យថាតើអ្នកផ្តល់សេវាគោលដៅគាំទ្រការរក្សាទុកក្នុងឃ្លាំងសម្ងាត់ឬអត់
3. **កែសម្រួលយុទ្ធសាស្ត្រ** — បន្ទាប `aggressive`/`ultra` ទៅជា `standard` សម្រាប់អ្នកផ្តល់សេវាដែលគាំទ្រឃ្លាំងសម្ងាត់
4. **រំលងព្រមផ្តល់ប្រព័ន្ធ** — ជាធម្មតា ព្រមផ្តល់ប្រព័ន្ធត្រូវបានរក្សាទុកក្នុងឃ្លាំងសម្ងាត់ ដូច្នេះកុំបង្ហាប់វា
5. **ប្រើការបម្លែងដែលកំណត់បានជាក់លាក់** — ប្រើតែការបម្លែងដែលបង្កើតលទ្ធផលស្របគ្នាប៉ុណ្ណោះ

#### ឧទាហរណ៍កូដ

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← សញ្ញាសម្គាល់ឃ្លាំងសម្ងាត់
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### ពេលណាត្រូវប្រើ

ការបង្ហាប់ដែលយល់ដឹងអំពីឃ្លាំងសម្ងាត់គឺ **បើកជានិច្ច** — មិនត្រូវការការកំណត់រចនាសម្ព័ន្ធទេ។ វាដំណើរការតែនៅពេល៖

- សំណើមានសញ្ញាសម្គាល់ `cache_control`
- អ្នកផ្តល់សេវាគោលដៅគាំទ្រ prompt caching (Anthropic, OpenAI ជាដើម)

### ការធ្វើឱ្យចាស់ទៅតាមលំដាប់

ការសន្ទនាវែងៗប្រមូលផ្តុំវេនសារជាច្រើន ប៉ុន្តែវេនចាស់ៗកាន់តែមិនសូវ
ពាក់ព័ន្ធ។ ម៉ូឌុល `progressiveAging.ts` **បន្ថយកម្រិតលម្អិតរបស់សារតាមចម្ងាយវេន**៖

- **វេនថ្មីៗ (0-3)**: រក្សាទុកដូចដើម (ព័ត៌មានលម្អិតពេញលេញ)
- **វេនមធ្យម (4-8)**: ការបង្ហាប់ Lite (សម្អាតចន្លោះ និងទម្រង់)
- **វេនចាស់ (9+)**: ការបង្ហាប់ Caveman (លុបខ្លឹមសារបំពេញបន្ថែម និងសង្ខេប)
- **វេនចាស់ខ្លាំង (20+)**: សង្ខេបយ៉ាងខ្លាំង ឬលុបចោល

#### ឧទាហរណ៍កូដ

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 វេនបន្ថែមទៀត ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 3 វេនដំបូង៖ រក្សាទុកដូចដើម
  light: 8, // វេន 4-8៖ ការបង្ហាប់ lite
  moderate: 20, // វេន 9-20៖ ការបង្ហាប់ caveman
  // វេន 21+៖ ការសង្ខេបកម្រិតខ្លាំង
});

// saved = ចំនួនថូខិនដែលបានសន្សំ
```

#### ពេលណាត្រូវប្រើ

ការធ្វើឱ្យចាស់ជាបន្តបន្ទាប់ត្រូវបាន **បើកជានិច្ច** សម្រាប់ម៉ូដ `aggressive` និង `ultra`។ វាមានប្រសិទ្ធភាពជាពិសេសសម្រាប់៖

- សម័យសរសេរកូដដែលដំណើរការរយៈពេលយូរ
- ការសន្ទនាដែលបន្តច្រើនថ្ងៃ
- លំហូរការងារបែបភ្នាក់ងារដែលមានការហៅឧបករណ៍ជាច្រើន

### ម៉ូដលទ្ធផល Caveman

ម៉ូឌុល `outputMode.ts` បញ្ចូល **សេចក្តីណែនាំក្នុង system prompt** ដើម្បីឱ្យ
ម៉ូដែលផ្ទាល់បង្កើតលទ្ធផលដែលបានបង្រួម និងខ្លីរហ័ស (រចនាប័ទ្ម "caveman")។

#### របៀបដំណើរការ

ជំនួសឱ្យការបង្រួមធាតុបញ្ចូល ម៉ូដនេះបន្ថែម system prompt ដូចជា៖

> "ឆ្លើយដោយប្រើពាក្យតិចបំផុត។ រំលងពាក្យគួរសម។ ប្រើប្រយោគខ្លីៗ។"

វាដំណើរការបានល្អជាពិសេសសម្រាប់៖

- ការបង្កើតកូដ (លទ្ធផលកាន់តែខ្លី = token កាន់តែតិច)
- សំណួរ និងចម្លើយរហ័ស (មិនចាំបាច់មានការពន្យល់លម្អិត)
- ដំណើរការជាបាច់ (បង្កើនបរិមាណដំណើរការឱ្យអតិបរមា)

#### ពេលដែលគួរប្រើ

ម៉ូដលទ្ធផល Caveman គឺ **ត្រូវបើកដោយស្ម័គ្រចិត្ត** — កំណត់វាតាមរយៈការកំណត់ combo៖

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### រចនាប័ទ្មលទ្ធផល (កាតាឡុក)

ម៉ូដលទ្ធផល Caveman ខាងលើគឺជា **ផ្លូវរចនាប័ទ្មតែមួយបែបចាស់**។ ដំណាក់កាលទី 4 បានពង្រីកវា
ទៅជាកាតាឡុកនៃរចនាប័ទ្មលទ្ធផលដែលអាចផ្សំគ្នាបាន៖ `OUTPUT_STYLE_CATALOG` នៅក្នុង
`open-sse/services/compression/outputStyles/catalog.ts`។ រចនាប័ទ្មនីមួយៗគឺជាសេចក្តីណែនាំ system-prompt
ដែលធ្វើឱ្យម៉ូដែលផ្ទាល់បង្កើតលទ្ធផលដែលចំណាយតិចជាងមុន។ រចនាប័ទ្មជាច្រើនអាចត្រូវបានបើក
រួមគ្នា ហើយត្រូវបានបញ្ចូលតាមលំដាប់ក្នុងកាតាឡុក។

| រចនាប័ទ្ម                                 | `id`          | អ្វីដែលវាធ្វើ                                                                                                                                                                                                                             | ភាសានៃសេចក្តីណែនាំ                                                  |
| ----------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| អត្ថបទខ្លីរហ័ស                            | `terse-prose` | លុបពាក្យបំពេញ/article/ពាក្យបង្ហាញការស្ទាក់ស្ទើរ ហើយរក្សាខ្លឹមសារបច្ចេកទេសឱ្យបានត្រឹមត្រូវ។ អត្ថបទដូចគ្នានឹងម៉ូដលទ្ធផល Caveman បែបចាស់ (យោងប្រើ មិនមែនវាយបញ្ចូលឡើងវិញ)។                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                       |
| កូដតិចជាងមុន                              | `less-code`   | ជណ្តើរ YAGNI៖ ការផ្លាស់ប្តូរដែលតូចបំផុត និងដំណើរការបាន ដោយគ្មាន abstraction ដែលមិនបានស្នើ។                                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                       |
| Ponytail (អ្នកអភិវឌ្ឍន៍ជាន់ខ្ពស់ដែលខ្ជិល) | `ponytail`    | "កូដល្អបំផុត គឺកូដដែលមិនធ្លាប់ត្រូវបានសរសេរ"៖ ប្រើឡើងវិញ > សរសេរឡើងវិញ, មូលហេតុដើម > រោគសញ្ញា, diff ដែលខ្លីបំផុត និងដំណើរការបាន។                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                       |
| ខ្ញុំមាន ADHD (សកម្មភាពមុន)               | `i-have-adhd` | សកម្មភាពមុន (command/path/snippet មុនអត្ថបទ), ជំហានដែលមានលេខរៀង និងចំនួនកំណត់, ជំហានបន្ទាប់ជាក់លាក់តែមួយ, គ្មានបុព្វកថា/សេចក្តីសង្ខេបឡើងវិញ/ពាក្យបិទបញ្ចប់។ កែសម្រួលពី [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT)។ | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                       |
| CJK ខ្លីរហ័ស (文言)                       | `terse-cjk`   | រចនាប័ទ្មចិនបុរាណដែលខ្លីបំផុត។                                                                                                                                                                                                            | zh (ត្រូវបានកំណត់តាម locale៖ ផ្តល់ជូនតែនៅពេលភាសាដែលបានកំណត់គឺ `zh`) |

រចនាប័ទ្មនីមួយៗមានកម្រិតអាំងតង់ស៊ីតេបី — `lite`, `full`, `ultra` — ហើយកម្រិតនីមួយៗ
បញ្ចប់ដោយប្រការព្រំដែនរួម ដែលរក្សាប្លុកកូដ, file paths, commands,
error strings, URLs និង identifiers ឱ្យនៅដដែល។

#### របៀបដែលការបញ្ចូលដំណើរការ

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) ផ្ទៀងផ្ទាត់
ជម្រើសជាមួយកាតាឡុក (id ដែលមិនស្គាល់ និងរចនាប័ទ្មដែល locale មិនត្រូវគ្នា
ត្រូវបានទម្លាក់ចោល ហើយមិនដែលចាត់ទុកជាកំហុសទេ), តភ្ជាប់សេចក្តីណែនាំដែលបានជ្រើសតាមលំដាប់កាតាឡុក,
បន្ថែមប្រការព្រំដែន **តែម្តង** ហើយដាក់លទ្ធផលនៅខាងមុខ system
prompt បន្ទាប់ពីសញ្ញាសម្គាល់ idempotency តែមួយ (`[OmniRoute Output Styles]`) — ការអនុវត្ត
ម្តងទៀតមិនធ្វើអ្វីទេ។ នៅពេលភាសានៃសំណើដែលបានរកឃើញមានការបកប្រែ សេចក្តីណែនាំ
ដែលបានបកប្រែតាមមូលដ្ឋានត្រូវបានបញ្ចូលជំនួសភាសាអង់គ្លេស។

#### របៀបបើកប្រើ

ក្នុង dashboard៖ **Context → Settings → Compression** — មួយជួរសម្រាប់រចនាប័ទ្មនីមួយៗ ដែលមាន
ប៊ូតុងបិទ/បើក និងឧបករណ៍ជ្រើសកម្រិត។ តាមកម្មវិធី ការកំណត់ compression រក្សាទុក
ជម្រើសជា៖

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

ភាពត្រូវគ្នាជាមួយកំណែចាស់៖ ការកំណត់ combo បែបចាស់ `outputMode: "caveman"` នៅតែដំណើរការ ហើយផ្គូផ្គងទៅ
`terse-prose` ដោយដូចគ្នាកម្រិត byte នឹងការបញ្ចូលចាស់នៅគ្រប់ភាសាចាស់ទាំងអស់។

ការជ្រើសរើសភាសា៖ នៅពេលបើក `languageConfig.enabled`, `autoDetect` ជ្រើសរើស
ភាសានៃសារចុងក្រោយរបស់អ្នកប្រើ (ប្រើ detector ដូចគ្នានឹង input engines)។
ការបិទ `autoDetect` នឹងចាក់សោទៅ `defaultLanguage`។ បិទ → ភាសាអង់គ្លេស។

ម៉ាទ្រីសរចនាប័ទ្ម × ភាសា ត្រូវបានកំណត់ដោយ
`tests/unit/compression/output-styles-i18n-matrix.test.ts`៖ រចនាប័ទ្មថ្មីមិនអាចចេញផ្សាយបានទេ
បើគ្មានយ៉ាងហោចណាស់ការបកប្រែ pt-BR (ឬការលើកលែងដែលត្រូវបានតាមដានយ៉ាងច្បាស់) ហើយ
រចនាប័ទ្មដែលមានស្រាប់មិនអាចបាត់បង់ locale ដោយស្ងៀមស្ងាត់បានទេ។ ដើម្បីបន្ថែមរចនាប័ទ្ម សូមមើល
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style)។

### ការបង្រួមលទ្ធផលឧបករណ៍

ម៉ូឌុល `toolResultCompressor.ts` ផ្តល់ **យុទ្ធសាស្ត្របង្រួមឯកទេសចំនួន 5**
សម្រាប់លទ្ធផលឧបករណ៍ (ការហៅ function, លទ្ធផលរបស់ភ្នាក់ងារ, លទ្ធផលស្វែងរក ជាដើម)៖

1. **ការបង្រួមលទ្ធផលស្វែងរក** — លុបលទ្ធផលដែលស្ទួន ហើយរក្សាទុកលទ្ធផល top-N
2. **ការបង្រួមការអានឯកសារ** — កាត់ឯកសារធំៗឱ្យខ្លី និងរក្សាទុក headers/imports
3. **ការបង្រួមការប្រតិបត្តិកូដ** — រក្សាទុកតែ stdout/stderr សំខាន់ៗ
4. **ការបង្រួម query មូលដ្ឋានទិន្នន័យ** — កំណត់ចំនួនជួរដេក និងលុប metadata ដែលវែងអន្លាយ
5. **ការបង្រួមការឆ្លើយតប API** — លុប fields ដែលជា null និងបង្រួម arrays

#### ពេលដែលគួរប្រើ

ការបង្រួមលទ្ធផលឧបករណ៍ត្រូវបាន **បើកជានិច្ច** នៅពេលមានការហៅឧបករណ៍។
មិនត្រូវការការកំណត់ទេ។

### Pipeline ជាជាន់

ម៉ូដជាជាន់ដំណើរការ **engines ជាច្រើនតាមលំដាប់** — ជាធម្មតា RTK មុន
(សន្សំ 60-90% លើលទ្ធផលឧបករណ៍) បន្ទាប់មក Caveman (សន្សំបន្ថែម 30% លើ
អត្ថបទដែលនៅសល់)។ វាសម្រេចបាននូវ **ការសន្សំសរុប 78-95%**។

#### របៀបដំណើរការ

```
ធាតុបញ្ចូល (1000 tokens)
  → RTK (តម្រងដែលយល់ដឹងអំពី command) → 200 tokens
    → Caveman (ការលុបពាក្យបំពេញ) → 140 tokens
  → លទ្ធផល (140 tokens, សន្សំ 86%)
```

#### ពេលដែលគួរប្រើ

ប្រើម៉ូដជាជាន់សម្រាប់៖

- លំហូរការងារដែលប្រើឧបករណ៍ច្រើន (ការសរសេរកូដបែបភ្នាក់ងារ, ការស្រាវជ្រាវ)
- ដំណើរការជាបាច់ដែលផ្តោតលើការសន្សំថ្លៃ
- នៅពេលអ្នកត្រូវការសន្សំ token ជាអតិបរមា

កំណត់តាមរយៈ combo៖

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## ការកំណត់ជាន់លើកម្រិត Combo សម្រាប់ការបង្ហាប់

អ្នកអាចកំណត់ជាន់លើរបៀបបង្ហាប់សកល **តាម combo នីមួយៗ** ដើម្បីកែសម្រួលឥរិយាបថឱ្យបានល្អិតល្អន់
សម្រាប់ករណីប្រើប្រាស់ផ្សេងៗគ្នា៖

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

វាមានប្រយោជន៍សម្រាប់៖

- **Combo សម្រាប់ការសរសេរកូដ**៖ ប្រើរបៀប `aggressive` សម្រាប់សម័យការងារយូរ
- **Combo សម្រាប់សំណួរ និងចម្លើយរហ័ស**៖ ប្រើរបៀប `lite` សម្រាប់ការឆ្លើយតបរហ័ស
- **Combo ដែលប្រើឧបករណ៍ច្រើន**៖ ប្រើរបៀប `stacked` ដើម្បីសន្សំបានអតិបរមា
- **Combo សម្រាប់បរិស្ថានផលិតកម្ម**៖ ប្រើរបៀប `cache-aware` សម្រាប់អ្នកផ្តល់សេវាដែលគាំទ្រការរក្សាទុកក្នុងឃ្លាំងសម្ងាត់

---

## សូមមើលផងដែរ

- [ការកំណត់រចនាសម្ព័ន្ធបរិស្ថាន](../reference/ENVIRONMENT.md) — អថេរបរិស្ថានសម្រាប់ការបង្ហាប់
- [មគ្គុទ្ទេសក៍ស្ថាបត្យកម្ម](../architecture/ARCHITECTURE.md) — ដំណើរការខាងក្នុងនៃបំពង់ដំណើរការបង្ហាប់
- [មគ្គុទ្ទេសក៍អ្នកប្រើប្រាស់](../guides/USER_GUIDE.md) — ការចាប់ផ្តើមប្រើការបង្ហាប់
- [ការបង្ហាប់ RTK](./RTK_COMPRESSION.md) — តម្រង RTK, ម៉ូដែលទំនុកចិត្ត, ច្រកផ្ទៀងផ្ទាត់ និងការសង្គ្រោះលទ្ធផលដើម
- [ម៉ាស៊ីនបង្ហាប់](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP និងផ្ទាំងគ្រប់គ្រង
- [ទម្រង់ច្បាប់បង្ហាប់](./COMPRESSION_RULES_FORMAT.md) — ទម្រង់កញ្ចប់ច្បាប់ JSON
- [កញ្ចប់ភាសាសម្រាប់ការបង្ហាប់](./COMPRESSION_LANGUAGE_PACKS.md) — ច្បាប់ Caveman ជាក់លាក់តាមភាសា
