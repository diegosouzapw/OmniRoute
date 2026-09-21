# SQLite Runtime Resolution (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

يحدّد OmniRoute برنامج تشغيل SQLite عند بدء التشغيل من خلال سلسلة احتياطية من 5 خطوات:

1. **`better-sqlite3` المضمّن** (عبر `dependencies` في `package.json`)
   — الأسرع، وهو ملف ثنائي أصلي يُثبَّت بواسطة `npm install` عند توفّر أدوات البناء.

2. **`better-sqlite3` المثبَّت في وقت التشغيل** (داخل `~/.omniroute/runtime/`)
   — يُثبَّت عند الحاجة في أول تشغيل **أو** بواسطة `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   يتحقق من البايتات السحرية لملف `.node` الأصلي (ELF / Mach-O / PE) قبل تحميله
   للحماية من الملفات الثنائية التالفة أو المخصّصة لمنصة أخرى.

3. **`node:sqlite`** (المكتبة القياسية في Node ≥22.5) — لا يحتاج إلى بناء أصلي؛ ويُستخدم عندما
   يفشل مسارا better-sqlite3. مجموعة ميزاته محدودة.

4. **`sql.js`** (WASM) — الخيار الاحتياطي الأخير. يعمل في كل مكان، لكنه أبطأ
   ويكتب البيانات على فترات زمنية بدلًا من كتابتها بشكل متزامن.

## لماذا كل هذا التعقيد؟

- **Windows EBUSY**: قد يفشل `npm install -g omniroute@latest` إذا كان
  `better_sqlite3.node` الخاص بالإصدار السابق مقفلًا بواسطة عملية قيد التشغيل. يتجاوز التثبيت
  في وقت التشغيل داخل `~/.omniroute/runtime/` ذاكرة npm المؤقتة العامة.
- **عدم توفّر أدوات البناء**: لا تستطيع بعض البيئات (Windows المؤسسي من دون VS Build
  Tools، وصور Docker المصغّرة) ترجمة `better-sqlite3`. يحصل مُثبّت وقت التشغيل
  على ملف ثنائي مُنشأ مسبقًا من سجل npm؛ وتضمن برامج التشغيل الاحتياطية استمرار تشغيل
  OmniRoute حتى في حال فشل ذلك.
- **الأنظمة المعزولة عن الشبكة**: إذا تعذّر الوصول إلى سجل npm، يضمن `node:sqlite`
  أو `sql.js` توفير الوظائف الأساسية.

## التحقق من البايتات السحرية

قبل تحميل ملف `.node` مثبَّت في وقت التشغيل، يقرأ OmniRoute أول 8
بايتات ويطابقها مع القيم السحرية المعروفة للمنصات:

| المنصة                 | البايتات (سداسي عشري) | التسمية     |
| ---------------------- | --------------------- | ----------- |
| Linux                  | `7F 45 4C 46`         | `elf`       |
| macOS ‏64 بت BE        | `FE ED FA CF`         | `macho`     |
| macOS ‏64 بت LE        | `CF FA ED FE`         | `macho-le`  |
| macOS شامل (universal) | `CA FE BA BE`         | `macho-fat` |
| Windows                | `4D 5A` (MZ)          | `pe`        |

إذا لم تتطابق القيمة السحرية ← يُتجاهل الملف، وتنتقل السلسلة الاحتياطية إلى الخطوة التالية.

## التحقق من برنامج التشغيل النشط

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## التحكم اليدوي

```bash
# تخطي التهيئة المسبقة بعد التثبيت (لتثبيتات CI السريعة)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# فرض إعادة تثبيت better-sqlite3 في وقت التشغيل
rm -rf ~/.omniroute/runtime
omniroute  # سيُعاد تثبيته عند بدء التشغيل التالي

# التحقق من برنامج التشغيل النشط
omniroute config db-info  # (إذا كان أمر CLI موجودًا)
```

## المرجع

التنفيذ:

- `bin/cli/runtime/magicBytes.mjs` — أدوات مساعدة للتحقق من البايتات السحرية للملفات الثنائية
- `bin/cli/runtime/sqliteRuntime.mjs` — محلّل وقت التشغيل ذو الخطوات الخمس + المُثبّت عند الحاجة
- `bin/cli/runtime/index.mjs` — منسّق بدء التشغيل (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — خطاف npm لما بعد التثبيت (تهيئة مسبقة غير فادحة)
- `src/lib/db/core.ts` — تصديرات `ensureDbInitialized()` / `getDriverInfo()`

## بنية الكاتب الواحد (التوافر العالي غير مدعوم)

لا تزال سلسلة برامج التشغيل الاحتياطية أعلاه تعمل ضمن **عملية واحدة**. يعمل OmniRoute
الافتراضي المستند إلى SQLite بنمط **الكاتب الواحد**:

- لا تربط نسختين متماثلتين من OmniRoute بملف `storage.sqlite` نفسه.
- تؤدي إعادة تشغيل الحاوية، أو نشر Recreate، أو إنهاء العملية بسبب OOM، أو إعادة التشغيل بواسطة HEALTHCHECK
  إلى إسقاط كل جلسة SSE قيد التنفيذ. لا يوجد تفريغ للجلسات في المسار القياسي.
- إذا اعتبر فحص حيوية المنسّق استجابة `/healthz` البطيئة علامةً على توقف الخدمة، فسيُنهي
  النسخة المتماثلة الوحيدة. يُفضّل استخدام فحص حيوية TCP + فحص جاهزية HTTP عبر `/healthz`. راجع
  [دليل Docker — التوافر](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  و[توصيات مجسّات Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
