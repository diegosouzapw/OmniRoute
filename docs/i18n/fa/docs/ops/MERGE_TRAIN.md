# Merge Queue & Manual Merge-Train Runbook (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

از نسخهٔ v3.8.49 (WS3.2/WS3.4 از برنامهٔ کیفیت/سرعت)، مسیر پیشفرض ادغام برای
PRهای بازبینیشده در `release/vX.Y.Z`، **صف ادغام Mergify** (`.mergify.yml`) است؛
**قطار ادغام دستی** که در ادامه مستند شده، مسیر جایگزین است — و هنگام رخدادها،
توقف انتشار، یا در صورت تغییر طرح متنباز Mergify استفاده میشود.

## مسیر پیشفرض: صف Mergify

1. PR توسط کمپینها بازبینی/سبز میشود و تأییدیهی ⭐ پیش از ادغامِ مالک را
   دریافت میکند (گزارش + تصمیم موردی — به گام 0.75 در `/merge-prs` مراجعه کنید).
2. مالک (یا نشستِ مجری تصمیم مالک) برچسب **`queue`** را اعمال میکند.
   این برچسب خودِ تأیید ادغام است؛ Mergify فقط آن را اجرا میکند.
3. Mergify، PRهای موجود در صف را **بهصورت سریالی** (هر بار یکی) در برابر
   دروازههای سریع اعتبارسنجی و سپس ادغام میکند (squash). دستهبندی + دونیمسازی
   خودکار متعلق به سطح پولی Mergify است ("Cannot use Merge Queue batch" در طرح
   رایگان، #7220)، بنابراین در `.mergify.yml` هیچ `batch_size`ای تنظیم نشده است؛
   دستهبندی همچنان وظیفهی قطار ادغام دستیِ زیر است. PRای که بررسیهایش پس از
   `checks_timeout` (240 دقیقه = 2× صدک 95 اندازهگیریشدهی `quality.yml`) همچنان
   در انتظار باشند، بهجای متوقفکردن صف از آن خارج میشود.
4. پس از ادغام، گردشکار پیوستهی release-green نوک جدید را هنگام push اعتبارسنجی
   میکند و اگر این ترکیب دچار پسرفت شده باشد، یک issue انتساب باز میکند (هرگز
   بازگردانی خودکار انجام نمیدهد).

محافظها (منطبق با قوانین سختگیرانهی #21/#22 در `CLAUDE.md`):

- **فریز انتشار فعال است** → به PRهایی که شاخهی فریزشده را هدف میگیرند برچسب
  نزنید؛ ابتدا هدف آنها را به `release/vX+1` فعال تغییر دهید.
- **PR در حال اجرای نشست دیگری** → هرگز به آن برچسب نزنید؛ فقط نشست مالک، کار
  خودش را در صف قرار میدهد.
- تغییرات صرفاً مربوط به تست و PRهای دارای برچسب `hotfix` از قبل CI کاهشیافته را
  اجرا میکنند (به `RELEASE_CHECKLIST.md` ← مسیر سریع Hotfix مراجعه کنید)؛ شرایط
  صف هر مجموعه بررسیای را که عملاً اجرا شده باشد میپذیرند
  (`#check-failure=0` + `#check-pending=0`).

## مسیر جایگزین: قطار ادغام دستی

هنگامی استفاده میشود که صف در دسترس نباشد. این بخش روشی را مدون میکند که در چرخهٔ
v3.8.47 طی یک روز 33 PR را تخلیه کرد:

1. **دسته را تشکیل دهید** (حدود 10–30 PR بازبینیشده+تأییدشده). تداخلهای `linked:`
   را بررسی کنید (`tap.testFiles` یکسان، بخشهای یکسان CHANGELOG) و آنها را
   بهصورت ترتیبی اجرا کنید.
2. **فقط یکبار اعتبارسنجی کنید**: در یک worktree ایزولهشده از tip انتشار، همهٔ
   headهای دسته را بهصورت محلی ادغام کنید، سپس مجموعهٔ معادل انتشار را اجرا کنید
   (`npm run check:release-green`؛ پیش از انتشار `--with-build` را اضافه کنید).
   `scripts/release/merge-train.sh <base> <PR#>…` مراحل 1–2 را خودکار میکند
   (PRهای متداخل خارج میشوند و قطار ادامه میدهد). حالت کامل
   `npm run test:unit` را اجرا میکند — اجراگر تنظیمشده برای دستگاه
   (`--test-concurrency=20`)، **نه** دو shard ترتیبی CI با 4 هسته که فاز غالب را
   تنها با حدود 25٪ توان یک دستگاه 16 هستهای اجرا میکردند (رفعشده در
   2026-07-18). `--fast` (برای تخلیهٔ قطارهای عظیم درونروزی، با تأیید مالک در
   2026-07-18) همهٔ گیتهای ایستا + vitest را نگه میدارد، اما فقط فایلهای
   node:test تغییریافته توسط PRهای سوارشده را اجرا میکند؛ مجموعهٔ کامل همچنان
   باید حداقل روزی یکبار روی tip تجمیعشده اجرا شود (یک قطار بدون `--fast`).
3. **سبز** → PRها را بهترتیب ادغام کنید (پیش از هرکدام `state,headRefOid` را
   دوباره بررسی کنید — PRی که head آن تغییر کرده باشد دوباره وارد بازبینی میشود).
   ثابت کنید diff خالص هر ادغام فقط شامل تغییرات همان PR است (بدون بازگردانی ناشی
   از رفع خودکار تداخل: `git diff --stat` را برای حذفهای خارج از محدوده ممیزی کنید).
4. **قرمز** → بهجای اعتبارسنجی مجدد تکبهتک، دسته را به دو نیم تقسیم کنید
   (هر نیمه را اعتبارسنجی کنید)؛ PR مشکلساز را همراه با شواهد به صف بازبینی
   بازگردانید.
5. **هرگز**: هنگام توقف انتشار در شاخهٔ متوقفشده ادغام نکنید؛ در هیچجا
   `git stash` نکنید؛ CI را کورکورانه با این امید که وضعیت قرمز رفع شود دوباره
   اجرا نکنید (قاعده: وضعیت قرمز حاوی اطلاعات است).

## سطحبندی (چرا صف فقط با گیتهای سریع امن است)

- **برای هر PR** (گیتهای سریع quality.yml): آزمونهای متأثر از TIA + مجموعهٔ کامل
  unit با 4 shard + vitest + مجموعهٔ lint + typecheck + یکپارچگی اسناد/changelog.
- **برای هر دسته/tip** (سبز ماندن پیوستهٔ انتشار): گیتهای سخت `--quick` در هر
  push به شاخهٔ انتشار؛ پیمایشهای کامل `--with-build --full-ci` سه بار در روز.
- **برای هر انتشار** (ci.yml روی PR انتشار): ماتریس کامل شامل E2E ×9،
  package-artifact + آزمون دودِ راهاندازی tarball، coverage/ratchets.

هیچچیز کمتر از قبل اعتبارسنجی نمیشود — سطح سنگین صرفاً بهجای هر PR، برای هر
دسته/tip اجرا میشود و همین موضوع رفتوبرگشتهای O(N) را حذف میکند.

## پیشنیازهای checkout تازه برای `merge-train.sh`

اسکریپت یک **پیشپرواز** fail-fast را روی checkout ریشه اجرا میکند (پیش از هرگونه
کار با worktree) تا نصب خراب هرگز نتواند خود را بهصورت قطار قرمز نشان دهد:

1. `npm ci`، سپس postinstall مربوط به `bun` را که npm مسدود میکند اجرا کنید:
   `(cd node_modules/bun && node install.js)` — در غیر این صورت
   `check:provider-consistency` و `check:known-symbols` (هر دو با
   `bun scripts/…`) هم روی قطار و هم روی base، بدون هیچ خط تخلفی شکست میخورند.
2. هیچ `node_modules/node_modules` سرگردانی وجود نداشته باشد (یک درخت وابستگی
   تکراری؛ React دو بار بارگذاری میشود و مجموعههای UI در vitest فوراً شکست
   میخورند).
3. `node_modules/.bin/tsc` موجود و قابل اجرا باشد (در نصب ناقص وجود ندارد).

قطار، `npm run check:cycles:ratchet` مسدودکننده را اجرا میکند؛
`npm run check:cycles` ساده صرفاً جنبهٔ اطلاعرسانی دارد (SCCها را فهرست میکند
و حتی روی یک base سالم نیز با وضعیت غیرصفر خارج میشود).
