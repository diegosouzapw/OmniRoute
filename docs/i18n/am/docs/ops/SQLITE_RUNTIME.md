# SQLite Runtime Resolution (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ሲጀምር የSQLite ነጂውን ባለ 5-ደረጃ የአማራጭ ሰንሰለት በመጠቀም ይፈልጋል፦

1. **አብሮ የታሸገ `better-sqlite3`** (በ`package.json` ውስጥ ባለው `dependencies` በኩል)
   — ፈጣኑ አማራጭ፣ ቤተኛ ባይነሪ ሲሆን፣ የግንባታ መሣሪያዎች ሲኖሩ `npm install` ይጭነዋል።

2. **በአሂድ ጊዜ የሚጫን `better-sqlite3`** (በ`~/.omniroute/runtime/` ውስጥ)
   — ለመጀመሪያ ጊዜ ሲሠራ እንደ አስፈላጊነቱ **ወይም** በ`scripts/build/postinstall.mjs → scripts/postinstall.mjs` በኩል ይጫናል።
   ከመጫኑ በፊት፣ የተበላሹ ወይም ለተሳሳተ መድረክ የተዘጋጁ ባይነሪዎችን
   ለመከላከል የቤተኛ `.node` ማጂክ ባይቶችን (ELF / Mach-O / PE) ያረጋግጣል።

3. **`node:sqlite`** (Node ≥22.5 መደበኛ ቤተ-መጻሕፍት) — ቤተኛ ግንባታ አያስፈልገውም፤
   ሁለቱም የbetter-sqlite3 መንገዶች ሲሳኩ ጥቅም ላይ ይውላል። የተወሰነ የባህሪያት ስብስብ አለው።

4. **`sql.js`** (WASM) — የመጨረሻው አማራጭ። በሁሉም ቦታ ይሠራል፣ ነገር ግን ቀርፋፋ ነው
   እና ውሂብን በተመሳሳይ ጊዜ ከመጻፍ ይልቅ በጊዜ ክፍተት ይጽፋል።

## ይህ ውስብስብነት ለምን ያስፈልጋል?

- **Windows EBUSY**፦ የቀዳሚው ስሪት `better_sqlite3.node` በሚሠራ ሂደት ተቆልፎ ከሆነ፣
  `npm install -g omniroute@latest` ሊሳካ ይችላል። በ`~/.omniroute/runtime/`
  ውስጥ የሚደረገው የአሂድ ጊዜ ጭነት ዓለም አቀፉን የnpm መሸጎጫ ያልፋል።
- **የግንባታ መሣሪያዎች አለመኖር**፦ አንዳንድ አካባቢዎች (VS Build
  Tools የሌለባቸው የድርጅት Windows ስርዓቶች፣ አነስተኛ Docker ምስሎች) `better-sqlite3`ን
  ማጠናቀር አይችሉም። የአሂድ ጊዜ ጫኚው ቀድሞ የተገነባ ባይነሪን ከnpm መዝገብ ያገኛል፤
  ይህ ቢሳካም የአማራጭ ነጂዎቹ OmniRoute መነሳቱን እንዲቀጥል ያረጋግጣሉ።
- **ከውጭ አውታረ መረብ የተለዩ ስርዓቶች**፦ የnpm መዝገብ የማይደረስ ከሆነ፣ `node:sqlite`
  ወይም `sql.js` መሠረታዊ ተግባራዊነትን ያረጋግጣሉ።

## የማጂክ ባይት ማረጋገጫ

በአሂድ ጊዜ የተጫነ `.node` ፋይል ከመጫኑ በፊት፣ OmniRoute የመጀመሪያዎቹን 8
ባይቶች ያነባል እና ከሚታወቁ የመድረክ ማጂክ እሴቶች ጋር ያዛምዳቸዋል፦

| መድረክ                  | ባይቶች (ሄክስ)    | መለያ         |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-ቢት BE        | `FE ED FA CF` | `macho`     |
| macOS 64-ቢት LE        | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

የማይዛመድ ማጂክ → ፋይሉ ችላ ይባላል፣ የአማራጭ ሂደቱም ወደሚቀጥለው ደረጃ ይሄዳል።

## ንቁውን ነጂ ማረጋገጥ

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## በእጅ መቆጣጠር

```bash
# ለፈጣን CI ጭነቶች የpostinstall ቅድመ-ማሞቂያን ዝለል
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# የአሂድ ጊዜ better-sqlite3ን በግድ እንደገና ጫን
rm -rf ~/.omniroute/runtime
omniroute  # በሚቀጥለው መነሻ ላይ እንደገና ይጫናል

# የትኛው ነጂ ንቁ እንደሆነ አረጋግጥ
omniroute config db-info  # (የCLI ትእዛዙ ካለ)
```

## ማጣቀሻ

አተገባበር፦

- `bin/cli/runtime/magicBytes.mjs` — የባይነሪ ማጂክ ባይት ማረጋገጫ አጋዥ ተግባራት
- `bin/cli/runtime/sqliteRuntime.mjs` — ባለ 5-ደረጃ የአሂድ ጊዜ ፈላጊ + እንደ አስፈላጊነቱ የሚሠራ ጫኚ
- `bin/cli/runtime/index.mjs` — የመነሻ አቀናባሪ (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — ከnpm ጭነት በኋላ የሚሠራ መንጠቆ (ውድቀት የማያስከትል ቅድመ-ማሞቂያ)
- `src/lib/db/core.ts` — የ`ensureDbInitialized()` / `getDriverInfo()` ወደ ውጭ ማቅረቦች

## ባለአንድ-ጸሐፊ ቶፖሎጂ (HA አይደገፍም)

ከላይ ያለው የነጂ አማራጭ ሰንሰለት አሁንም በ**አንድ ሂደት** ውስጥ ይሠራል። በነባሪው SQLite
OmniRoute **አንድ ጸሐፊ** ብቻ አለው፦

- ሁለት የOmniRoute ቅጂዎችን ከአንድ `storage.sqlite` ፋይል ጋር አታገናኙ።
- የኮንቴይነር ዳግም መነሳት፣ Recreate ማሰማራት፣ OOM kill ወይም HEALTHCHECK ዳግም ማስጀመር
  በሂደት ላይ ያሉ ሁሉንም የSSE ክፍለ-ጊዜዎች ያቋርጣል። በመደበኛው መንገድ የክፍለ-ጊዜ ቀስ በቀስ ማቋረጥ የለም።
- ቀርፋፋ `/healthz`ን እንደ ሞተ የሚቆጥር የአቀናባሪ ሕያውነት ፍተሻ ብቸኛውን
  ቅጂ ያቋርጣል። TCP ሕያውነት + HTTP `/healthz` ዝግጁነትን ይምረጡ።
  [Docker መመሪያ — ተገኝነት](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  እና [የKubernetes ፕሮብ ምክረ ሐሳቦች](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)ን ይመልከቱ።
