# SQLite Runtime Resolution (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute آغاز کے وقت 5 مراحل پر مشتمل فال بیک چین کے ذریعے اپنے SQLite ڈرائیور کا تعین کرتا ہے:

1. **بنڈل شدہ `better-sqlite3`** (`package.json` میں `dependencies` کے ذریعے)
   — سب سے تیز، مقامی بائنری، اور بلڈ ٹولز موجود ہونے پر `npm install` کے ذریعے انسٹال ہوتا ہے۔

2. **رن ٹائم پر انسٹال شدہ `better-sqlite3`** (`~/.omniroute/runtime/` میں)
   — پہلی بار چلانے پر ضرورت کے مطابق **یا** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` کے ذریعے انسٹال ہوتا ہے۔
   لوڈ کرنے سے پہلے مقامی `.node` میجک بائٹس (ELF / Mach-O / PE) کی توثیق کرتا ہے
   تاکہ خراب یا غلط پلیٹ فارم کی بائنریز سے تحفظ حاصل ہو۔

3. **`node:sqlite`** (Node ≥22.5 معیاری لائبریری) — مقامی بلڈ درکار نہیں؛ اس وقت استعمال ہوتا ہے جب
   better-sqlite3 کے دونوں راستے ناکام ہو جائیں۔ فیچرز کا مجموعہ محدود ہے۔

4. **`sql.js`** (WASM) — آخری فال بیک۔ ہر جگہ کام کرتا ہے، لیکن سست ہے
   اور ڈیٹا کو ہم وقتی طور پر لکھنے کے بجائے وقفے وقفے سے لکھتا ہے۔

## یہ پیچیدگی کیوں ہے؟

- **Windows EBUSY**: اگر پچھلے ورژن کی `better_sqlite3.node` فائل کسی چلتے ہوئے پراسیس کے ذریعے لاک ہو تو `npm install -g omniroute@latest` ناکام ہو سکتا ہے۔
  `~/.omniroute/runtime/` میں رن ٹائم انسٹالیشن عالمی npm کیش کو نظرانداز کر دیتی ہے۔
- **بلڈ ٹولز کی عدم موجودگی**: کچھ ماحول (VS Build Tools کے بغیر کارپوریٹ Windows،
  کم سے کم Docker امیجز) `better-sqlite3` کو کمپائل نہیں کر سکتے۔ رن ٹائم
  انسٹالر npm رجسٹری سے پہلے سے بلڈ شدہ بائنری حاصل کرتا ہے؛ فال بیک
  ڈرائیور اس بات کو یقینی بناتے ہیں کہ اس عمل کے ناکام ہونے پر بھی OmniRoute شروع ہو جائے۔
- **ایئر گیپڈ سسٹمز**: اگر npm رجسٹری ناقابل رسائی ہو تو `node:sqlite`
  یا `sql.js` بنیادی فعالیت کی ضمانت دیتے ہیں۔

## میجک بائٹ کی توثیق

رن ٹائم پر انسٹال شدہ `.node` فائل لوڈ کرنے سے پہلے، OmniRoute ابتدائی 8
بائٹس پڑھتا ہے اور انہیں معروف پلیٹ فارم میجکس سے ملاتا ہے:

| پلیٹ فارم             | بائٹس (hex)   | لیبل        |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

غیر مماثل میجک → فائل کو نظرانداز کر دیا جاتا ہے اور فال بیک اگلے مرحلے پر جاری رہتا ہے۔

## فعال ڈرائیور کی جانچ

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { ماخذ: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   قسم: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## دستی کنٹرول

```bash
# تیز CI انسٹالیشنز کے لیے postinstall وارم اپ چھوڑ دیں
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# رن ٹائم better-sqlite3 کو زبردستی دوبارہ انسٹال کریں
rm -rf ~/.omniroute/runtime
omniroute  # اگلی بار شروع ہونے پر دوبارہ انسٹال ہوگا

# جانچیں کہ کون سا ڈرائیور فعال ہے
omniroute config db-info  # اگر CLI کمانڈ موجود ہو
```

## حوالہ

عمل درآمد:

- `bin/cli/runtime/magicBytes.mjs` — بائنری میجک بائٹ توثیق کے معاون فنکشنز
- `bin/cli/runtime/sqliteRuntime.mjs` — 5 مراحل پر مشتمل رن ٹائم ریزالور + ضرورت کے مطابق انسٹالر
- `bin/cli/runtime/index.mjs` — اسٹارٹ اپ آرکیسٹریٹر (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm پوسٹ انسٹال ہُک (غیر مہلک وارم اپ)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` ایکسپورٹس

## واحد رائٹر ٹوپولوجی (HA غیر معاون ہے)

مذکورہ بالا ڈرائیور فال بیک چین اب بھی **ایک پراسیس** میں چلتی ہے۔ پہلے سے طے شدہ SQLite
OmniRoute ایک **واحد رائٹر** ہے:

- دو OmniRoute ریپلیکاز کو ایک ہی `storage.sqlite` فائل سے منسلک نہ کریں۔
- کنٹینر ری اسٹارٹ، Recreate ڈیپلائے، OOM kill، یا HEALTHCHECK ری اسٹارٹ
  ہر زیرِ عمل SSE سیشن منقطع کر دیتا ہے۔ معیاری راستے میں سیشن ڈرین موجود نہیں۔
- ایسا آرکیسٹریٹر لائیونیس چیک جو سست `/healthz` کو مردہ تصور کرے، واحد
  ریپلیکا کو ختم کر دے گا۔ TCP لائیونیس + HTTP `/healthz` ریڈینیس کو ترجیح دیں۔ دیکھیے
  [Docker رہنما — دستیابی](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  اور [Kubernetes پروب کی سفارشات](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)۔
