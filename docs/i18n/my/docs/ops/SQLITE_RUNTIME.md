# SQLite Runtime Resolution (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute သည် စတင်ချိန်တွင် အဆင့် ၅ ဆင့်ပါ fallback chain မှတစ်ဆင့် ၎င်း၏ SQLite driver ကို ရွေးချယ်သတ်မှတ်သည်-

1. **တွဲဖက်ပါဝင်သော `better-sqlite3`** (`package.json` ရှိ `dependencies` မှတစ်ဆင့်)
   — အမြန်ဆုံးဖြစ်ပြီး native binary ကို အသုံးပြုကာ build tools များရှိသည့်အခါ `npm install` ဖြင့် ထည့်သွင်းပေးသည်။

2. **Runtime တွင် ထည့်သွင်းထားသော `better-sqlite3`** (`~/.omniroute/runtime/` အတွင်း)
   — ပထမဆုံး run လုပ်ချိန်တွင် လိုအပ်မှသာ ထည့်သွင်းသည် **သို့မဟုတ်** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` ဖြင့် ထည့်သွင်းသည်။
   ပျက်စီးနေသော သို့မဟုတ် platform မကိုက်ညီသော binary များကို မတင်မိစေရန်
   မတင်မီ native `.node` magic bytes (ELF / Mach-O / PE) ကို စစ်ဆေးအတည်ပြုသည်။

3. **`node:sqlite`** (Node ≥22.5 stdlib) — native build မလိုအပ်ပါ။ better-sqlite3 လမ်းကြောင်းနှစ်ခုစလုံး မအောင်မြင်သည့်အခါ အသုံးပြုသည်။ လုပ်ဆောင်ချက်များ ကန့်သတ်ထားသည်။

4. **`sql.js`** (WASM) — နောက်ဆုံး fallback ဖြစ်သည်။ နေရာတိုင်းတွင် အလုပ်လုပ်သော်လည်း ပိုနှေးပြီး
   data များကို synchronously ရေးသားမည့်အစား သတ်မှတ်ထားသော အချိန်ကြားကာလအလိုက် ရေးသားသည်။

## ဤမျှရှုပ်ထွေးရသည့် အကြောင်းရင်းမှာ အဘယ်နည်း?

- **Windows EBUSY**: ယခင် version ၏ `better_sqlite3.node` ကို လက်ရှိ run နေသော process တစ်ခုက lock လုပ်ထားပါက `npm install -g omniroute@latest` မအောင်မြင်နိုင်ပါ။ `~/.omniroute/runtime/` အတွင်း runtime install ပြုလုပ်ခြင်းဖြင့် global npm cache ကို ရှောင်ကွင်းနိုင်သည်။
- **Build tools မရှိခြင်း**: အချို့ environment များ (VS Build Tools မပါသော corporate Windows၊ အနည်းဆုံးအစိတ်အပိုင်းများသာပါသော Docker images) တွင် `better-sqlite3` ကို compile မလုပ်နိုင်ပါ။ Runtime installer သည် npm registry မှ ကြိုတင် build လုပ်ထားသော binary တစ်ခုကို ရယူပေးသည်။ ထိုလုပ်ငန်းစဉ်ပင် မအောင်မြင်လျှင်လည်း fallback drivers များက OmniRoute ကို ဆက်လက်စတင်နိုင်စေသည်။
- **Air-gapped systems**: npm registry ကို ချိတ်ဆက်မရပါက `node:sqlite`
  သို့မဟုတ် `sql.js` က အခြေခံလုပ်ဆောင်နိုင်စွမ်းကို အာမခံပေးသည်။

## Magic-byte စစ်ဆေးအတည်ပြုခြင်း

Runtime တွင် ထည့်သွင်းထားသော `.node` file တစ်ခုကို မတင်မီ OmniRoute သည် ပထမဆုံး 8
bytes ကို ဖတ်ပြီး သိရှိထားသော platform magics များနှင့် တိုက်ဆိုင်စစ်ဆေးသည်-

| Platform              | Bytes (hex)   | Label       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Magic မကိုက်ညီပါက → file ကို လျစ်လျူရှုပြီး fallback သည် နောက်အဆင့်သို့ ဆက်သွားသည်။

## လက်ရှိအသုံးပြုနေသော driver ကို စစ်ဆေးခြင်း

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## ကိုယ်တိုင်ထိန်းချုပ်ခြင်း

```bash
# မြန်ဆန်သော CI install များအတွက် postinstall warm-up ကို ကျော်ပါ
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Runtime better-sqlite3 ကို အတင်းအကျပ် ပြန်လည်ထည့်သွင်းပါ
rm -rf ~/.omniroute/runtime
omniroute  # နောက်တစ်ကြိမ် စတင်ချိန်တွင် ပြန်လည်ထည့်သွင်းမည်

# မည်သည့် driver ကို လက်ရှိအသုံးပြုနေသည်ကို စစ်ဆေးပါ
omniroute config db-info  # CLI command ရှိပါက
```

## ကိုးကားချက်

အကောင်အထည်ဖော်ထားသည့်နေရာများ-

- `bin/cli/runtime/magicBytes.mjs` — binary magic-byte စစ်ဆေးအတည်ပြုရေး helpers
- `bin/cli/runtime/sqliteRuntime.mjs` — အဆင့် ၅ ဆင့်ပါ runtime resolver + လိုအပ်မှသာ လုပ်ဆောင်သော installer
- `bin/cli/runtime/index.mjs` — startup orchestrator (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm post-install hook (မအောင်မြင်လျှင်လည်း အလုပ်ရပ်တန့်စေမည်မဟုတ်သော warm-up)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` exports

## Single-writer topology (HA ကို မပံ့ပိုးပါ)

အထက်ပါ driver fallback chain သည် **process တစ်ခုတည်း** အတွင်းတွင်သာ ဆက်လက် run သည်။ ပုံသေ SQLite
OmniRoute သည် **single writer** ဖြစ်သည်-

- OmniRoute replica နှစ်ခုကို တူညီသော `storage.sqlite` file နှင့် မချိတ်ဆက်ပါနှင့်။
- Container restart၊ Recreate deploy၊ OOM kill သို့မဟုတ် HEALTHCHECK restart ဖြစ်တိုင်း
  လုပ်ဆောင်နေဆဲ SSE session အားလုံး ပြတ်တောက်သွားမည်။ ပုံမှန်လမ်းကြောင်းတွင် session drain မရှိပါ။
- နှေးကွေးသော `/healthz` ကို သေဆုံးနေသည်ဟု သတ်မှတ်သော orchestrator liveness သည် တစ်ခုတည်းသော
  replica ကို ရပ်တန့်ပစ်မည်။ TCP liveness + HTTP `/healthz` readiness ကို ဦးစားပေးပါ။ [Docker လမ်းညွှန် — ရရှိနိုင်မှု](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  နှင့် [Kubernetes probe အကြံပြုချက်များ](./MONITORING_GUIDE.md#kubernetes-probe-recommendations) ကို ကြည့်ပါ။
