# ADR: Pluggable persistence boundary (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **حیثیت:** مجوزہ — رن ٹائم پر کام شروع ہونے سے پہلے مینٹینر کی منظوری درکار ہے
- **ٹریکنگ مسئلہ:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **دائرۂ کار:** صرف پرسسٹنس آرکیٹیکچر؛ یہ فیصلہ کسی بیرونی ڈیٹابیس کا اضافہ یا انتخاب نہیں کرتا

## سیاق و سباق

OmniRoute فی الحال `src/lib/db/` سے ڈومین پر مبنی پرسسٹنس فنکشنز پیش کرتا ہے، جبکہ
`src/lib/db/core.ts` کی جانب سے واپس کیا جانے والا مشترکہ کنکشن `src/lib/db/adapters/types.ts` میں موجود ہم وقت ساز `SqliteAdapter`
کنٹریکٹ نافذ کرتا ہے۔ یہ اڈاپٹر کئی SQLite رن ٹائمز کی معاونت کرتا ہے، لیکن اس کا
انٹرفیس بدستور SQLite کی ساخت کے مطابق ہے: ہم وقت ساز تیار شدہ اسٹیٹمنٹس، `pragma`، مؤخر اور فوری
ٹرانزیکشنز، مقامی/فائل-کاپی بیک اپ، چیک پوائنٹ، اور ایک مقامی ڈیٹابیس ہینڈل۔

موجودہ آغاز اور بحالی کا راستہ SQLite فائل کے لائف سائیکل کا بھی ذمہ دار ہے۔ `src/lib/db/core.ts`
`storage.sqlite` کو ریزولو کرتا ہے، پورے پراسیس کے لیے ایک واحد اڈاپٹر برقرار رکھتا ہے، WAL کو چیک پوائنٹ کرتا ہے، بحالی کے دوران منتخب
ٹیبلز محفوظ رکھتا ہے، اور ڈیٹابیس کی دوبارہ تعمیر کے وقت SQLite کی ساتھی فائلیں حذف کرتا ہے۔
`src/lib/db/adapters/driverFactory.ts` میں ڈرائیور کا انتخاب معاونت یافتہ SQLite رن ٹائمز میں سے کرتا ہے؛ یہ
کسی بیرونی بیک اینڈ کی ابسٹریکشن نہیں ہے۔

اسکیما کا ارتقا بھی اسی طرح مضبوطی سے وابستہ ہے۔ `src/lib/db/migrationRunner.ts` نمبر شدہ SQL فائلیں لاگو کرتا ہے،
`sqlite_master` اور `PRAGMA table_info` کی جانچ کرتا ہے، اختیاری FTS5 معاونت کا پتا لگاتا ہے، اور مائیگریشن
کا کام SQLite ٹرانزیکشنز میں چلاتا ہے۔ `src/lib/db/backup.ts` اور
`src/lib/db/optimizationSettings.ts` جیسے آپریشنل ماڈیولز بیک اپ، `PRAGMA`، WAL، صفحہ-سائز، آٹو-ویکیوم، اور `VACUUM`
کی معنویات براہِ راست استعمال کرتے ہیں۔

یہ ایمبیڈڈ SQLite تعیناتی کی درست خصوصیات ہیں۔ PostgreSQL یا MySQL کو SQLite API کی نقل کرنے
پر مجبور کیے بغیر یہ دستیاب رہنی چاہییں۔

## فیصلہ

پورٹیبل پائیدار حالت کے لیے دو سطحی پرسسٹنس باؤنڈری اپنائی جائے:

1. **ڈومین ریپوزٹری کنٹریکٹس** کاروباری اور روٹنگ
   کوڈ کو درکار پرسسٹنس آپریشنز کی وضاحت کرتے ہیں۔ کالرز ڈومین کے رویے اور ڈومین ڈیٹا پر انحصار کرتے ہیں، نہ کہ SQL متن، تیار شدہ اسٹیٹمنٹس،
   ڈیٹابیس فائلوں، یا ڈائلیکٹ آبجیکٹس پر۔
2. **ایک اندرونی غیر ہم وقت ساز بیک اینڈ کنٹریکٹ** ریپوزٹری کی امپلیمنٹیشنز کو
   ٹرانزیکشن سیاق و سباق، صحت/تیاری، مائیگریشن کوآرڈینیشن، بیک اینڈ صلاحیتوں، اور
   درجہ بند خرابیوں کے ساتھ معاونت فراہم کرتا ہے۔ حتمی TypeScript انٹرفیس پہلی امپلیمنٹیشن
   PR کے ساتھ تجویز کیا جائے گا اور مطابقتی ٹیسٹس سے ثابت کیا جائے گا؛ یہ ADR دانستہ طور پر کسی قیاسی API کو منجمد نہیں کرتا۔

SQLite ڈیفالٹ امپلیمنٹیشن رہے گا۔ موجودہ SQLite ڈرائیور سلسلہ اور ہم وقت ساز
`SqliteAdapter`، SQLite ریپوزٹری امپلیمنٹیشن کے پسِ پشت رہیں گے، جبکہ ڈومینز کو
چھوٹے عمودی حصوں میں منتقل کیا جائے گا۔ کسی صارف کے لیے بیرونی سروس کنفیگر کرنا ضروری نہیں ہوگا۔

ریپوزٹری باؤنڈری کو SQLite کے مقابل ثابت کیے جانے کے بعد PostgreSQL پہلی مجوزہ بیرونی امپلیمنٹیشن ہے۔
MySQL، کاروباری منطق کی دوسری شاخ بننے کے بجائے اسی مطابقتی مجموعے کے مقابل ایک ہم مرتبہ امپلیمنٹیشن کے طور پر
اس کے بعد آئے گا۔

## باؤنڈری کے قواعد

### پورٹیبل ریپوزٹری انٹرفیس

ایک پورٹیبل ریپوزٹری درج ذیل فراہم کر سکتی ہے:

- ڈومین ریڈز اور رائٹس؛
- واضح ایٹامک آپریشنز اور ٹرانزیکشن کے دائرے میں ریپوزٹری تک رسائی؛
- ایسے compare/update یا لیز آپریشنز جہاں کنکرنسی کی معنویات ڈومین کا حصہ ہوں؛
- بیک اینڈ سے غیر جانب دار صفحہ بندی، ترتیب بندی، اور کنسٹرینٹ کی خرابیاں۔

بیک اینڈ کی صحت، تیاری، اور مائیگریشن کوآرڈینیشن، انفرادی ڈومین ریپوزٹریز کے بجائے
اندرونی بیک اینڈ/آپریشنل کنٹریکٹ سے تعلق رکھتے ہیں۔

ایک پورٹیبل ریپوزٹری کو درج ذیل فراہم نہیں کرنا چاہیے:

- `prepare`، `get`، `all`، `run`، یا خام ڈرائیور ہینڈلز؛
- `PRAGMA`، WAL چیک پوائنٹ موڈز، `VACUUM`، یا صفحہ/کیش ٹیوننگ؛
- SQLite فائل پاتھ، ساتھی فائلیں، یا فائل-کاپی بیک اپ؛
- کراس بیک اینڈ ڈومین کنٹریکٹ کے طور پر `lastInsertRowid`؛
- FTS5 یا `sqlite-vec` سنٹیکس؛
- معمول کے کاروباری کوڈ کے زیرِ استعمال کوئی عمومی ڈائلیکٹ اسکیپ ہیچ۔

### بیک اینڈ کی صلاحیتوں کا انٹرفیس

بیک اینڈ سے مخصوص رویہ واضح اور قابلِ دریافت رہتا ہے۔ صرف SQLite کے لیے دیکھ بھال
اس کی اپنی امپلیمنٹیشن اور آپریشنل انٹرفیس کے پسِ پشت رہتی ہے، بشمول:

- رن ٹائم ڈرائیور کا انتخاب؛
- WAL چیک پوائنٹ اور SQLite شٹ ڈاؤن کا رویہ؛
- صفحہ-سائز، کیش-سائز، اور آٹو-ویکیوم کی ترتیبات؛
- ڈیٹابیس فائل کا بیک اپ، بحالی، اور ریکوری؛
- SQLite اسکیما کا تجزیہ؛
- FTS5 اور `sqlite-vec` انٹیگریشن۔

کسی بیرونی بیک اینڈ کے لیے ان خصوصیات کی نقل کرنا ضروری نہیں ہے۔ ریپوزٹریز کو یا تو
کوئی پورٹیبل صلاحیت استعمال کرنی چاہیے، دستاویزی رویے کے ساتھ بیک اینڈ سے مخصوص امپلیمنٹیشن فراہم کرنی چاہیے، یا یہ اطلاع دینی چاہیے
کہ کوئی صلاحیت دستیاب نہیں ہے۔

## ٹرانزیکشن اور مائیگریشن ماڈل

Repository APIs ایٹامک کاروباری آپریشن کی تعریف کرتی ہیں؛ کالرز SQL ٹرانزیکشن موڈ منتخب نہیں کرتے۔
ہر آپریشن کو اپنی قابلِ مشاہدہ کنکرنسی ضمانتوں کی وضاحت لازماً کرنی چاہیے: محفوظ invariants، conflict
detection، retry classification، idempotency کی توقعات، اور transaction-context propagation۔
امپلیمینٹیشنز مختلف ٹرانزیکشن اور isolation mechanisms صرف اسی وقت استعمال کر سکتی ہیں جب وہ قابلِ مشاہدہ
ضمانتیں مساوی رہیں۔ SQLite اندرونی طور پر اپنا موجودہ deferred یا immediate
ٹرانزیکشن رویہ وہاں استعمال کرنا جاری رکھ سکتا ہے جہاں وہ آپریشن کے معاہدے کو پورا کرتا ہو۔

بیرونی backends کے لیے واضح migration ownership ضروری ہے تاکہ متعدد application replicas ایک ہی
schema تبدیلی کے لیے باہم مسابقت نہ کریں۔ Backend migration histories منطقی milestones مشترک رکھ سکتی ہیں، لیکن SQLite SQL
فائلوں کو کسی دوسرے dialect میں portable یا دوبارہ قابلِ استعمال تصور نہیں کیا جاتا۔

## مختلف backends کے مابین مطابقت کی معنویات

Conformance tests کو صرف repository method signatures ہی نہیں بلکہ رویے کا بھی احاطہ کرنا چاہیے۔ ہر migrated domain
کو درج ذیل کی وضاحت اور توثیق لازماً کرنی چاہیے:

- timestamp کا timezone، precision، اور serialization؛
- `NULL` کی ordering، collation، اور case-sensitivity سے متعلق توقعات؛
- JSON کی representation اور comparison کا رویہ؛
- integer، decimal، اور monetary precision؛
- pagination کے لیے مستحکم ordering اور deterministic tie-breakers؛
- SQLite row IDs پر انحصار کیے بغیر ID generation؛
- uniqueness اور foreign-key violation کی classification؛
- no-op، compare/update، اور delete آپریشنز کے لیے affected-row کا رویہ؛
- concurrent-write کے نتائج، retryable conflicts، اور idempotent retries۔

اگر کوئی domain مساوی قابلِ مشاہدہ معنویات بیان نہیں کر سکتا تو وہ ابھی portable نہیں ہے اور اسے اس وقت تک
backend-specific رہنا چاہیے جب تک وہ معاہدہ ڈیزائن نہ کر لیا جائے۔

## مطابقت کے تقاضے

اس ADR کی پیروی کرنے والی کسی بھی امپلیمینٹیشن کو ان خصوصیات کو برقرار رکھنا چاہیے:

- SQLite، zero-configuration ڈیفالٹ برقرار رہے۔
- موجودہ SQLite فائلیں اور migration history قابلِ مطالعہ رہیں۔
- npm، Electron، Docker، اور restricted-runtime SQLite fallbacks اپنے موجودہ startup path کو برقرار رکھیں۔
- محفوظ شدہ provider credentials موجودہ application encryption رویے کا استعمال جاری رکھیں۔
- repository migration، routing، quota، API-key، یا audit معنویات کو خاموشی سے تبدیل نہ کرے۔
- backup اور recovery کا رویہ ہر backend کے لیے الگ دستاویزی شکل میں بیان کیا جائے، نہ کہ اسے آفاقی طور پر پیش کیا جائے۔
- ایک صاف SQLite-only installation کسی بیرونی database driver کو load نہ کرے اور نہ ہی اس کا تقاضا کرے۔

## فراہمی کی ترتیب

1. ایک قابلِ تکرار SQLite coupling inventory کو علیحدہ review artifact کے طور پر شائع کریں۔
2. پہلے domain repository contracts اور conformance tests متعارف کرائیں۔
3. ڈیفالٹس تبدیل کیے بغیر موجودہ SQLite امپلیمینٹیشن کو ان contracts کے پسِ پشت adapt کریں۔
4. maintainer کی منظوری سے مشروط، ایک محدود control-plane slice کے لیے PostgreSQL کو پہلی بیرونی امپلیمینٹیشن کے طور پر شامل کریں۔
5. shared state کو صرف concurrent-write اور migration-ownership tests کی موجودگی کے بعد وسعت دیں۔
6. database switching کی تشہیر سے پہلے ایک offline، validated SQLite-to-external migration path شامل کریں۔
7. ثابت شدہ repository اور backend contracts کے مطابق MySQL شامل کریں۔

ہر runtime مرحلہ ایک علیحدہ، قابلِ جائزہ PR ہے۔ کسی بعد کے مرحلے کو پہلے مرحلے میں کسی
غیر ثابت شدہ abstraction کے انضمام کا جواز بنانے کے لیے استعمال نہیں کیا جانا چاہیے۔

## نفاذ کا پہلا حصہ

رن ٹائم کا پہلا حصہ coupling inventory کا جائزہ لینے کے بعد منتخب کیا جانا چاہیے۔ Provider
connections، API keys، combos، اور routing configuration امیدوار ہیں کیونکہ ان کی بنیادی tables
`src/lib/db/core.ts` میں نظر آتی ہیں، لیکن یہ ADR کسی table list یا migration PR کی منظوری نہیں دیتا۔
اس حصے میں لازماً شامل ہونا چاہیے:

- SQLite کے رویے کو برقرار رکھنے کے tests؛
- repository conformance tests؛
- واضح transaction boundaries؛
- محفوظ کردہ credentials کے لیے encryption اور redaction کی تصدیق؛
- default startup configuration میں کوئی تبدیلی نہیں۔

## زیرِ غور متبادلات

### `SqliteAdapter` کے تحت PostgreSQL شامل کرنا

مسترد کر دیا گیا۔ `SqliteAdapter`، SQLite runtimes کے لیے ایک compatibility layer ہے اور SQLite سے مخصوص
operations فراہم کرتا ہے۔ اس surface کی نقل ایک نئے backend میں synchronous اور dialect-specific مفروضوں
کو منتقل کر دے گی۔

### تمام domains کے لیے ایک generic query/execute API فراہم کرنا

بنیادی boundary کے طور پر مسترد کر دیا گیا۔ اس سے connection handling مرکزی ہو جاتی، لیکن SQL dialect،
transaction، اور table coupling کاروباری modules میں برقرار رہتے۔ ایک low-level backend primitive،
repository implementations کے اندر موجود ہو سکتا ہے، مگر application-facing persistence API کے طور پر نہیں۔

### ایک حصے کی توثیق سے پہلے تمام persistence کو دوبارہ لکھنا

مسترد کر دیا گیا۔ موجودہ persistence surface وسیع ہے اور اس میں file lifecycle، recovery، search،
اور operational settings شامل ہیں۔ Vertical slices ایسے behavior اور rollback boundaries فراہم کرتے ہیں
جن کا جائزہ لیا جا سکتا ہے۔

### SQLite کو default کے طور پر تبدیل کرنا

مسترد کر دیا گیا۔ Embedded اور desktop deployments موجودہ zero-service startup model پر منحصر ہیں۔ ایک
external backend اختیاری ہے۔

### Redis کو durable authority کے طور پر استعمال کرنا

مسترد کر دیا گیا۔ Redis واضح طور پر عارضی coordination، cache، یا counters کو سہارا دے سکتا ہے، لیکن یہ
یہاں بیان کردہ durable repository contract کی جگہ نہیں لیتا۔

## نتائج

### مثبت

- کاروباری code کو database dialect سے آزاد ایک مستحکم persistence seam ملتا ہے۔
- اس سے پہلے کہ کوئی external backend abstraction کی تعریف کرے، SQLite کے behavior کی جانچ کی جاتی ہے۔
- PostgreSQL اور MySQL، domain logic کو نقل کرنے کے بجائے contracts اور tests کا اشتراک کرتے ہیں۔
- صرف SQLite کی capabilities، غیر شفاف compatibility shims بننے کے بجائے first-class رہتی ہیں۔
- Multi-replica migration اور transaction behavior ایک واضح design concern بن جاتے ہیں۔

### لاگتیں اور خطرات

- Repository extraction کے لیے call sites کی مرحلہ وار migration درکار ہے۔
- Async boundaries موجودہ synchronous service code میں پھیل سکتی ہیں۔
- Cross-backend semantics کے لیے SQL syntax compatibility سے آگے conformance tests درکار ہیں۔
- Backup، search، vector storage، اور maintenance بدستور capability-specific رہتے ہیں۔
- ایک سے زیادہ persistence implementations چلانے سے CI اور operational support کی لاگت بڑھ جاتی ہے۔

## غیر اہداف

یہ ADR درج ذیل کام نہیں کرتا:

- database dependency، environment variable، schema، یا migration شامل کرنا؛
- فعال SQLite singleton یا driver cascade کو تبدیل کرنا؛
- کسی مخصوص release میں PostgreSQL یا MySQL support کا وعدہ کرنا؛
- FTS5، `sqlite-vec`، backup files، یا SQLite maintenance کو portable بنانا؛
- shared-state اور coordination tests کی موجودگی سے پہلے active-active readiness کی تعریف کرنا؛
- `src/lib/db/` کو ایک ہی مرحلے میں دوبارہ لکھنے کی منظوری دینا۔

## مینٹینر کی منظوری کے لیے کھلے سوالات

1. کیا repository کے ساتھ internal async backend boundary ترجیحی سمت ہے، یا external persistence کو ایک علیحدہ control-plane service کے پیچھے ہونا چاہیے؟
2. کیا SQLite conformance کے بعد پہلی external implementation کے طور پر PostgreSQL قابلِ قبول ہے؟
3. کون سا domain پہلا bounded repository slice ہونا چاہیے؟
4. پہلے multi-replica milestone کے لیے کون سی state مشترک ہونی چاہیے، اور کون سی node-local رہنی چاہیے؟
5. تعطل کا شکار یا rolled-back repository migration کے لیے کون سی compatibility window درکار ہے؟

جب تک ان سوالات کا فیصلہ نہیں ہو جاتا، یہ دستاویز ایک تجویز ہے اور اس سے کسی runtime refactor کا نفاذ مراد نہیں ہے۔
