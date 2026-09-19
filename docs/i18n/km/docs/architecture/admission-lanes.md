# Admission lanes (#9654) — two lane systems, what gates each, where each reports (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute មានប្រព័ន្ធ lane មូលដ្ឋានតាមដំណើរការ (process-local) ចំនួន **ពីរ** ដែលមានវិសាលភាពខុសគ្នា។ ប្រព័ន្ធទាំងនេះ
បំពេញគ្នាទៅវិញទៅមក ហើយអ្នកប្រតិបត្តិការគួរដឹងថាពួកគេកំពុងពិនិត្យមើលប្រព័ន្ធមួយណា។

## 1. ការអនុញ្ញាតកម្រិត byte ទូទាំងដំណើរការ (`chatBodyAdmission.ts`)

- **វិសាលភាព៖** ផ្លូវ buffered-body/heap សម្រាប់ `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` និង route ផ្សេងទៀតដែលមានទម្រង់ដូច chat។ វាការពារ
  ប្រឆាំងនឹងការកើនឡើងខ្លាំងនៃការប្រើ heap ដែលបណ្តាលមកពី body ទំហំធំរបស់ coding-agent (#4380)។
- **controller សកលមួយសម្រាប់ដំណើរការ មិនមែន lane ដាច់ដោយឡែកសម្រាប់ key នីមួយៗទេ (#10110)។** API key
  នីមួយៗ (ដែលបាន hash) ឬ session `anonymous` នីមួយៗ ស្នើសុំការអនុញ្ញាតដោយប្រើ budget រួម
  **តែមួយ** ដូចគ្នា — session id ដែលបាន hash ត្រូវបានប្រើសម្រាប់តែជា key កំណត់កាលវិភាគដោយស្មើភាពប៉ុណ្ណោះ (ការបញ្ជូនបែប round-robin
  រវាងអ្នករង់ចាំ) ហើយមិនដែលត្រូវបានប្រើជា shard សមត្ថភាពឡើយ។ កំណែមុននៃឯកសារនេះ
  បានពិពណ៌នាអំពី lane ដាច់ដោយឡែកសម្រាប់ key នីមួយៗដែលមានសមត្ថភាពឯករាជ្យ ប៉ុន្តែ model នោះត្រូវបាន
  លុបចេញនៅក្នុង #10110 ព្រោះវាអនុញ្ញាតឱ្យ credential ក្លែងក្លាយដែលមិនបានផ្ទៀងផ្ទាត់
  បង្កើនដែនកំណត់ទូទាំងដំណើរការជាច្រើនដង។
- **Gate (#503-fanout)៖ budget BYTE សម្រាប់ ingest ដែលគណនាដោយស្វ័យប្រវត្តិ មិនមែនជាចំនួន request
  ថេរទេ។** ដែនកំណត់ចំនួន request ចាស់ `CHAT_MAX_HEAVY_IN_FLIGHT` (លំនាំដើម `1`
  មុនពេលការកែតម្រូវនេះ) បានបង្រួម fan-out របស់ coding-agent (subagent/CLI ច្រើន,
  body ដែលជាទូទៅមានទំហំ > 256 KB) ឱ្យនៅសល់ concurrency មានប្រសិទ្ធភាពប្រហែល ~1 ដែលបណ្តាលឱ្យទទួល
  503 ក្រោមបន្ទុកធម្មតាទាំងស្រុង។ ឥឡូវនេះ វាមានប្រសិទ្ធភាពកំណត់តែនៅពេលដែលអ្នកប្រតិបត្តិការកំណត់
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ដោយជាក់លាក់ប៉ុណ្ណោះ។ ប្រសិនបើមិនកំណត់ ការអនុញ្ញាតនឹងត្រូវបាន
  គ្រប់គ្រងជំនួសដោយ `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ជា budget ដែលគណនាដោយស្វ័យប្រវត្តិពី
  ដែនកំណត់ memory ពិតប្រាកដរបស់ដំណើរការ (`src/shared/middleware/admissionBudget.ts`)៖
  25% នៃតម្លៃដែលតឹងរ៉ឹងជាងរវាងដែនកំណត់ V8 heap និងដែនកំណត់ cgroup/container ណាមួយ
  ចែកនឹងកត្តាពង្រីកបណ្តោះអាសន្ន 8x ហើយត្រូវបានកម្រិតឱ្យនៅចន្លោះ 8 MiB និង
  2 GiB។ override ដែលកំណត់ជាក់លាក់ក៏ប្រើដែនកំណត់ដូចគ្នា។ វាធ្វើមាត្រដ្ឋានដោយខ្លួនឯងចាប់ពី
  container ទំហំ 512 MB ដល់ desktop ទំហំ 32 GB ដោយមិនចាំបាច់កែសម្រួល env។ Body ដែលមិនអាច
  ដាក់ក្នុង budget មានប្រសិទ្ធភាពបាន នឹងបរាជ័យភ្លាមៗជាមួយ `413 body_exceeds_budget`;
  មានតែការប្រជែងគ្នារវាង body ដែលអាចផ្តល់សេវាបានរៀងៗខ្លួនប៉ុណ្ណោះ ដែលចូលទៅក្នុង queue ស្មើភាព
  មានដែនកំណត់។ កម្មវិធីតាមដានសម្ពាធធនធានដោយសញ្ញាច្រើនបែប real-time (សមាមាត្រ V8 heap,
  cgroup, PSI, OOM events — `open-sse/utils/resourcePressurePolicy.ts`) កាត់បន្ថយ
  ពេលរង់ចាំមានដែនកំណត់នៅពេលសម្ពាធ `high` និងបោះបង់ការទទួលភ្លាមៗជាមួយ
  `503 resource_pressure` នៅពេលសម្ពាធ `critical` មុនពេល byte ណាមួយត្រូវបាន
  ingest។
- **ការកែសម្រួល៖**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — override សម្រាប់ byte budget ដែលគណនាដោយស្វ័យប្រវត្តិ
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — ដែនកំណត់ចំនួន request ចាស់ ដែលប្រើបានតាមការជ្រើសរើសប៉ុណ្ណោះ
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — រយៈពេលរង់ចាំក្នុង queue មុនពេលទទួល 503 (លំនាំដើម 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — សន្ទះ heap សម្រាប់ byte ក្នុង queue (លំនាំដើម 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — ត្រូវបានបញ្ឈប់ការណែនាំឱ្យប្រើ
    ហើយគ្មានប្រតិបត្តិការចាប់តាំងពី #10110 (នៅតែទទួលយកសម្រាប់ភាពត្រូវគ្នានៃ config ប៉ុន្តែមិនអើពើ)
- **របាយការណ៍៖** `GET /api/monitoring/health` → `chatAdmission` (#11244) — រួមទាំង
  ធាតុបន្ថែមពី #503-fanout គឺ `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` និង `countCapEnabled`
  (false នៅលើ deployment លំនាំដើម — បញ្ជាក់ថា byte budget មិនមែនដែនកំណត់ចំនួនចាស់ទេ
  គឺជាអ្វីដែលកំពុងកំណត់ជាក់ស្តែង)។

## 2. ឡេននិម្មិតពេលដំណើរការដែលសម្របខ្លួនបាន (`open-sse/services/admission`)

- **វិសាលភាព:** ការអនុញ្ញាតតាម tenant-key សម្រាប់ការបញ្ជូនទៅ provider — ថ្លៃចំណាយនៃជួររង់ចាំ ការសម្របដែនកំណត់ដោយផ្អែកលើ latency ការដាក់ជាជួរតាមឡេន និងម៉ែត្ររបស់ឡេន។
- **លក្ខខណ្ឌបើក:** **ត្រូវបើកប្រើជាមុន។** វាត្រូវបានបិទ លុះត្រាតែ `OMNIROUTE_CHAT_VIRTUAL_LANES=true`។ បើគ្មានវា ឧបករណ៍បញ្ជាដែលសម្របខ្លួនបាននឹងរក្សាឥរិយាបថជួររង់ចាំរួម (លក្ខណៈវិនិច្ឆ័យទី 1 នៃ #9654 អនុវត្តបាន លុះត្រាតែប្រតិបត្តិករបើកប្រើឡេន)។
- **ការកែតម្រូវ:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + ការកំណត់រចនាសម្ព័ន្ធសម្របខ្លួន (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …)។
- **របាយការណ៍:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (លេខសម្គាល់ឡេនដែលមិនបង្ហាញព័ត៌មាន មិនមែន key ដើមឡើយ) និង `virtualLanes` — ទង់ផ្លូវការនៅក្នុង snapshot ដែលបញ្ជាក់ថា "ឡេនត្រូវបានបើក"។

## 3. Probe បែប fan-out — ការអនុញ្ញាតតាម target សម្រាប់ combo/fusion (#9654 Wave 2)

Combo (អាទិភាព / round-robin) និង fusion ធ្វើ fan out ទៅកាន់ model target ចំនួន N ក្រោម request មេតែមួយ។ ចាប់តាំងពី #9654 Wave 2 មក **fan-out target នីមួយៗត្រូវបានត្រួតពិនិត្យមុនពេល dispatch** ដោយ probe តាម target (`PerTargetAdmissionHook`, បង្កើតដោយ `createPerTargetAdmissionHook`) ធៀបនឹង tenant lane **របស់ request មេ**។

- **វិសាលភាព:** រាល់ fan-out target ដែលត្រូវបាន dispatch ដោយ combo, fusion និង chaos engine។ ប្រព័ន្ធទី 1 (កម្រិត byte) មិនរងផលប៉ះពាល់ទេ — វាមិនដែល probe fan-out target ឡើយ។
- **លក្ខខណ្ឌបើក:** **ត្រូវបើកប្រើជាមួយប្រព័ន្ធទី 2។** វាមិនធ្វើអ្វីឡើយ នៅពេល `OMNIROUTE_CHAT_VIRTUAL_LANES` មិនត្រូវបានកំណត់ — ក្នុងទម្រង់នោះ request មេកំពុងកាន់ lease របស់ជួររង់ចាំរួមរួចហើយ ដូច្នេះការធ្វើ probe នឹងរាប់ស្ទួន និងបដិសេធ combo target។
- **អត្ថន័យនៃឥរិយាបថ:**
  - **មិនទប់ស្កាត់ដាច់ខាត — រំលង មិនដាក់ជាជួរឡើយ។** `maxWaitMs 0`: ឡេនដែលពេញនឹងរំលង target ហើយយន្តការ fallback របស់ combo (ឬ panel នៃ target ដែលនៅសល់របស់ fusion) នឹងបម្រើជំនួស។ នេះជាចេតនា៖ fan-out target គឺជាការងារដែលអាចជំនួសបាន ហើយការដាក់វាជាជួរនឹងបន្ថែមបន្ទុកទៅលើចំណុចកកស្ទះដែលឡេនត្រូវបានបង្កើតឡើងដើម្បីទប់ស្កាត់។ ដូច្នេះ `defaultMaxWaitMs` អនុវត្តចំពោះតែ **request មេប៉ុណ្ណោះ**; fan-out probe មិនដែលរង់ចាំឡើយ ហើយដោយចេតនា **គ្មានជម្រើសកំណត់** ដើម្បីឱ្យពួកវារង់ចាំទេ (ប្រវត្តិ issue បង្ហាញថា ជម្រើសកំណត់ការរង់ចាំបានបង្កើតបញ្ហា 502/504 ជាទ្រង់ទ្រាយធំ ដែល #9654 ត្រូវបានបង្កើតឡើងដើម្បីទប់ស្កាត់ — ពិចារណាឡើងវិញតែក្នុងករណីដែលប្រតិបត្តិកររាយការណ៍ថា fan-out target ដែលត្រូវបានរំលងធ្វើឱ្យប៉ះពាល់ដល់គុណភាព response)។
  - **បញ្ចេញ lease នៅពេលអនុញ្ញាត។** Probe ដែលត្រូវបានអនុញ្ញាតនឹងបញ្ចេញ lease របស់វាភ្លាមៗ៖ វាជាច្រកត្រួតពិនិត្យសមត្ថភាព មិនមែនជាការកាន់កាប់ទេ។ Lease របស់ request មេគ្របដណ្តប់លើ fan-out រួចហើយ; ការកាន់បន្ថែមចំនួន N នឹងបង្កើន active cost រួមដោយសិប្បនិម្មិត និងបដិសេធ tenant ផ្សេងទៀត។ វាដំណើរការតាមសមត្ថភាពដែលអាចធ្វើបាន មិនមែនជាការកក់ទុកទេ៖ ឡេនអាចពេញឡើងវិញនៅចន្លោះពេល probe និង dispatch ដូច្នេះនៅពេលមានការប្រជែងខ្លាំង ច្រកត្រួតពិនិត្យអាចអនុញ្ញាត target ចូលក្នុងឡេនដែលពេញឡើងវិញ នៅពេល target នោះត្រូវបាន dispatch។
  - **គណនាថ្លៃពី body ពិតប្រាកដរបស់ fan-out។** Probe ប៉ាន់ស្មានថ្លៃចំណាយពី body ពិតប្រាកដរបស់ target — រួមទាំង request class ដែលបានទាញយកពី flag `stream` របស់វា ដូចគ្នាទាំងស្រុងនឹងផ្លូវរបស់ request មេ — ដូច្នេះសមាជិកក្នុង fusion panel (`stream: false`) ត្រូវបានគណនាតាម class មិន streaming ដែលពួកវានឹងប្រើប្រាស់ពិតប្រាកដ ហើយ priority/RR target ត្រូវបានគណនាតាមអ្វីដែលអ្នកប្រើបានស្នើ។
- **របាយការណ៍:** ការរំលងដោយ probe បន្ទាប់ពី target ដំបូង នឹងបង្កើន `fallbackCount` តាម request របស់ combo (ឆ្លុះបញ្ចាំងតាមអត្ថន័យ fallback ដែលមានស្រាប់; អាចមើលឃើញក្នុង log របស់ combo); fusion ត្រឡប់ 503 នៅពេលសមាជិកទាំងអស់ក្នុង panel ត្រូវបានរំលង។ បច្ចុប្បន្ន **គ្មាន counter សរុប** (ឧ. `virtualFanoutSkipped`) នៅលើ snapshot ទេ — ប្រសិនបើប្រតិបត្តិកររាយការណ៍ថា ពួកគេមិនអាចដឹងថាច្រកត្រួតពិនិត្យឡេនរំលង fan-out target ញឹកញាប់ប៉ុណ្ណាទេ នោះជាកត្តាជំរុញឱ្យបន្ថែមវា។

## តើមួយណាដែលកំពុងបង្ហាញក្នុង dashboard

- `adaptiveAdmission.laneCount` / `laneTenants` → **lane និម្មិតបែបសម្របខ្លួន** (ប្រព័ន្ធ 2)។
- `adaptiveAdmission.virtualLanes === true` → probe បែប fan-out នៃផ្នែកទី 3 ក៏កំពុងសកម្មផងដែរ។ payload ដែលបាត់ `virtualLanes` ឬមានតម្លៃ `false` មានន័យថា `OMNIROUTE_CHAT_VIRTUAL_LANES` មិនត្រូវបានកំណត់ — lane កម្រិត byte (ប្រព័ន្ធ 1) នៅតែសកម្ម ប៉ុន្តែអ្វីៗនៅក្រោម `adaptiveAdmission` (និង gating បែប fan-out) មិនមានប្រសិទ្ធភាពទេ រហូតដល់វាត្រូវបានបើក។

## ហេតុអ្វីបានជាមានទាំងពីរ

lane កម្រិត byte កំណត់ព្រំដែនសម្រាប់ដំណើរការ parse/compress ដែលប្រើអង្គចងចាំច្រើន; lane បែបសម្របខ្លួនកំណត់ព្រំដែនលើចំណាយ dispatch ក្នុងមួយ tenant។ លក្ខខណ្ឌទី 1 របស់ #9654 ("ការផ្ទុះសំណើរបស់ session មួយមិនបណ្តាលឱ្យ session មួយទៀតទទួល 503") ត្រូវបានអនុវត្តដោយប្រព័ន្ធ 1 ដោយគ្មានលក្ខខណ្ឌ និងដោយប្រព័ន្ធ 2 នៅពេលបានបើកការចូលរួម។

## 4. `/v1/responses` រយៈពេលវែងក្នុង process តែមួយ (healthy-headroom)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) បានបន្ថែម `tryAcquireHealthyHeadroom` ដើម្បីអនុញ្ញាតសំណើទីពីរដែលមានរចនាសម្ព័ន្ធធ្ងន់ នៅពេល heap ស្ថិតនៅក្រោម `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`។ ផ្លូវ BYTE ដែលប្រើដោយ `admitChatRequest` (body ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`, លំនាំដើម 256 KiB រួមទាំង `POST /v1/responses`) ប្រើច្រកលើកលែង **ដូចគ្នា**។

នេះជារូបមន្ត **process តែមួយ** ដែលបានគាំទ្រ សម្រាប់ SSE `/v1/responses` រយៈពេលវែងដែលដំណើរការស្របគ្នាច្រើនជាងពីរ៖ ដំឡើង primary + healthy-headroom ត្រឹមកម្រិតដែល heap និងថវិកា byte ដែលកំពុងដំណើរការទូទាំង process (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) អនុញ្ញាតប៉ុណ្ណោះ។ អតិថិជន SSE រយៈពេលវែងរាប់សិប (40–50) គឺជាបញ្ហាថវិកាអង្គចងចាំ មិនមែនជាដែនកំណត់រឹង “អតិបរមា 2” របស់ផលិតផលទេ។ heap ដែលស្ថិតក្រោមសម្ពាធនៅតែបដិសេធដោយប្រើ `503` ដែលអាចសាកល្បងឡើងវិញបាន ដើម្បីកុំឱ្យ #7849 កើតឡើងវិញ។

ដើម្បី **បង្កើនចំនួន heap ជាពហុគុណ** សូមដំណើរការ `DATA_DIR` ឯករាជ្យចំនួន N (#11024)។ កុំប្រើ `replicas > 1` លើឯកសារ SQLite តែមួយ (#10350)។ ផ្នែកនេះមិនមែនជាការបើកឡើងវិញនូវរូបមន្ត scale-out របស់ DATA_DIR ទេ។
