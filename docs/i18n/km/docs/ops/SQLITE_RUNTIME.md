# SQLite Runtime Resolution (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute កំណត់កម្មវិធីបញ្ជា SQLite របស់វានៅពេលចាប់ផ្ដើម តាមរយៈខ្សែសង្វាក់បម្រុង 5 ជំហាន៖

1. **`better-sqlite3` ដែលបានរួមបញ្ចូល** (តាមរយៈ `dependencies` ក្នុង `package.json`)
   — លឿនបំផុត ប្រើឯកសារគោលពីរដើម ហើយត្រូវបានដំឡើងដោយ `npm install` នៅពេលមានឧបករណ៍ build។

2. **`better-sqlite3` ដែលបានដំឡើងនៅពេលដំណើរការ** (ក្នុង `~/.omniroute/runtime/`)
   — ត្រូវបានដំឡើងនៅពេលត្រូវប្រើជាលើកដំបូង **ឬ** ដោយ `scripts/build/postinstall.mjs → scripts/postinstall.mjs`។
   វាផ្ទៀងផ្ទាត់ magic bytes របស់ឯកសារ `.node` គោលពីរដើម (ELF / Mach-O / PE) មុនពេលផ្ទុក
   ដើម្បីការពារពីឯកសារគោលពីរដែលខូច ឬមិនត្រូវនឹងវេទិកា។

3. **`node:sqlite`** (បណ្ណាល័យស្តង់ដារ Node ≥22.5) — មិនត្រូវការ build គោលពីរដើមទេ ហើយត្រូវបានប្រើនៅពេល
   ផ្លូវ better-sqlite3 ទាំងពីរបរាជ័យ។ មានសំណុំមុខងារមានកម្រិត។

4. **`sql.js`** (WASM) — ជម្រើសបម្រុងចុងក្រោយ។ ដំណើរការបានគ្រប់ទីកន្លែង ប៉ុន្តែយឺតជាង
   ហើយសរសេរទិន្នន័យតាមចន្លោះពេល ជំនួសឱ្យការសរសេរធ្វើសមកាលកម្ម។

## ហេតុអ្វីបានជាត្រូវការភាពស្មុគស្មាញនេះ?

- **Windows EBUSY**៖ `npm install -g omniroute@latest` អាចបរាជ័យ ប្រសិនបើ
  `better_sqlite3.node` របស់កំណែមុនត្រូវបានចាក់សោដោយដំណើរការដែលកំពុងដំណើរការ។ ការដំឡើងពេលដំណើរការ
  ក្នុង `~/.omniroute/runtime/` ជៀសវាង cache npm សកល។
- **គ្មានឧបករណ៍ build**៖ បរិស្ថានមួយចំនួន (Windows របស់សាជីវកម្មដែលគ្មាន VS Build
  Tools និង image Docker ទំហំតូចបំផុត) មិនអាច compile `better-sqlite3` បានទេ។ កម្មវិធីដំឡើងពេលដំណើរការ
  ស្វែងរកឯកសារគោលពីរដែលបាន build រួចពីបញ្ជីឈ្មោះ npm ហើយកម្មវិធីបញ្ជាបម្រុង
  ធានាថា OmniRoute នៅតែអាចចាប់ផ្ដើមបាន ទោះបីវាបរាជ័យក៏ដោយ។
- **ប្រព័ន្ធផ្ដាច់ចេញពីបណ្ដាញ**៖ ប្រសិនបើមិនអាចចូលប្រើបញ្ជីឈ្មោះ npm បាន `node:sqlite`
  ឬ `sql.js` ធានានូវមុខងារមូលដ្ឋាន។

## ការផ្ទៀងផ្ទាត់ magic-byte

មុនពេលផ្ទុកឯកសារ `.node` ដែលបានដំឡើងនៅពេលដំណើរការ OmniRoute អាន 8 byte
ដំបូង ហើយផ្គូផ្គងវាជាមួយ magic ដែលស្គាល់សម្រាប់វេទិកានីមួយៗ៖

| វេទិកា                | Byte (hex)    | ស្លាក       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

magic ដែលមិនផ្គូផ្គង → ឯកសារត្រូវបានមិនអើពើ ហើយដំណើរការបម្រុងបន្តទៅជំហានបន្ទាប់។

## ការពិនិត្យមើលកម្មវិធីបញ្ជាដែលសកម្ម

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { ប្រភព: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   ប្រភេទ: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## ការគ្រប់គ្រងដោយដៃ

```bash
# រំលងការកម្ដៅ postinstall ជាមុន (សម្រាប់ការដំឡើង CI រហ័ស)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# បង្ខំឱ្យដំឡើង better-sqlite3 ពេលដំណើរការឡើងវិញ
rm -rf ~/.omniroute/runtime
omniroute  # នឹងដំឡើងឡើងវិញនៅពេលចាប់ផ្ដើមលើកបន្ទាប់

# ពិនិត្យមើលថាកម្មវិធីបញ្ជាណាមួយកំពុងសកម្ម
omniroute config db-info  # (ប្រសិនបើមានពាក្យបញ្ជា CLI)
```

## ឯកសារយោង

ការអនុវត្ត៖

- `bin/cli/runtime/magicBytes.mjs` — មុខងារជំនួយសម្រាប់ផ្ទៀងផ្ទាត់ magic-byte របស់ឯកសារគោលពីរ
- `bin/cli/runtime/sqliteRuntime.mjs` — កម្មវិធីដោះស្រាយពេលដំណើរការ 5 ជំហាន + កម្មវិធីដំឡើងនៅពេលត្រូវប្រើ
- `bin/cli/runtime/index.mjs` — កម្មវិធីសម្របសម្រួលការចាប់ផ្ដើម (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hook ក្រោយការដំឡើង npm (ការកម្ដៅជាមុនដែលមិនបង្កឱ្យបរាជ័យ)
- `src/lib/db/core.ts` — ការនាំចេញ `ensureDbInitialized()` / `getDriverInfo()`

## ទម្រង់ single-writer (មិនគាំទ្រ HA)

ខ្សែសង្វាក់កម្មវិធីបញ្ជាបម្រុងខាងលើនៅតែដំណើរការក្នុង **ដំណើរការតែមួយ**។ តាមលំនាំដើម SQLite
របស់ OmniRoute គឺជា **អ្នកសរសេរតែមួយ**៖

- កុំភ្ជាប់ replica OmniRoute ពីរទៅឯកសារ `storage.sqlite` ដូចគ្នា។
- ការចាប់ផ្ដើម container ឡើងវិញ ការ deploy បែប Recreate ការ kill ដោយ OOM ឬការចាប់ផ្ដើមឡើងវិញដោយ HEALTHCHECK
  នឹងផ្ដាច់ session SSE ទាំងអស់ដែលកំពុងដំណើរការ។ មិនមានការបង្ហូរ session នៅលើផ្លូវស្តង់ដារទេ។
- ការពិនិត្យ liveness របស់ orchestrator ដែលចាត់ទុក `/healthz` យឺតថាបានស្លាប់ នឹងបញ្ឈប់
  replica តែមួយគត់។ គួរប្រើ TCP liveness + HTTP `/healthz` readiness។ សូមមើល
  [មគ្គុទ្ទេសក៍ Docker — ភាពអាចប្រើបាន](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  និង [អនុសាសន៍សម្រាប់ probe របស់ Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)។
