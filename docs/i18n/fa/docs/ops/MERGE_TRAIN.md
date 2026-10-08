# Merge Queue & Manual Merge-Train Runbook (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

از نسخهٔ v3.8.49 (WS3.2/WS3.4 از برنامهٔ quality/velocity)، مسیر ادغام پیشفرض برای
PRهای بازبینیشده در `release/vX.Y.Z`، **صف ادغام Mergify** (`.mergify.yml`) است؛
**قطار ادغام دستی** که در ادامه مستند شده، مسیر جایگزین است — و هنگام رخدادها،
توقف انتشار، یا در صورت تغییر طرح متنباز Mergify استفاده میشود.

## مسیر پیشفرض: صف Mergify

1. PR توسط کمپینها بازبینی و سبز شده و در دروازهٔ ⭐ پیش از ادغامِ مالک تأیید میشود
   (گزارش + تصمیم برای هر مورد — به گام 0.75 در `/merge-prs` مراجعه کنید).
2. مالک (یا نشستِ عملکننده بر اساس تصمیم مالک) برچسب **`queue`** را اعمال میکند.
   این برچسب همان تأیید ادغام است؛ Mergify فقط آن را اجرا میکند.
3. Mergify حداکثر 10 PR صفشده را در یک دسته قرار میدهد، دسته را در برابر دروازههای
   سریع اعتبارسنجی میکند و آنها را ادغام میکند (squash). یک دستهٔ قرمز
   **بهطور خودکار نصف میشود** — PR مشکلساز در حدود log2(N) اعتبارسنجی مجدد
   جداسازی و از صف خارج میشود؛ بقیه ادامه میدهند.
4. پس از ادغام، گردشکار پیوستهٔ release-green نوک جدید را هنگام push اعتبارسنجی
   میکند و اگر ترکیب باعث پسرفت شده باشد، یک issue برای انتساب باز میکند
   (هرگز بهطور خودکار revert نمیکند).

محافظها (منطبق با قوانین سختگیرانهٔ #21/#22 در `CLAUDE.md`):

- **توقف انتشار برقرار است** → به PRهایی که شاخهٔ متوقفشده را هدف گرفتهاند برچسب
  نزنید؛ ابتدا آنها را به `release/vX+1` فعال تغییر هدف دهید.
- **PR در حال انجامِ نشست دیگری** → هرگز به آن برچسب نزنید؛ فقط نشست مالک، کار خودش
  را در صف قرار میدهد.
- تفاوتهای صرفاً مربوط به تست و PRهای دارای برچسب `hotfix` از قبل CI کاهشیافته را
  اجرا میکنند (به `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane مراجعه کنید)؛ شرایط صف
  هر مجموعه بررسیای را که واقعاً اجرا شده باشد میپذیرند
  (`#check-failure=0` + `#check-pending=0`).

## مسیر جایگزین: قطار ادغام دستی

هنگامی استفاده میشود که صف در دسترس نباشد. این بخش رویهای را مدون میکند که در
چرخهٔ v3.8.47، تعداد 33 PR را در یک روز تخلیه کرد:

1. **دسته را آماده کنید** (حدود 10 تا 30 PR بازبینیشده و تأییدشده). تداخلهای
   `linked:` را بررسی کنید (`tap.testFiles` یکسان، بخشهای CHANGELOG یکسان) و آنها
   را بهصورت ترتیبی پردازش کنید.
2. **فقط یکبار اعتبارسنجی کنید**: در یک worktree ایزوله مبتنی بر نوک release،
   همهٔ headهای دسته را بهصورت محلی ادغام کنید، سپس مجموعهٔ معادل انتشار را اجرا
   کنید (`npm run check:release-green` و پیش از انتشار `--with-build` را اضافه کنید).
   `scripts/release/merge-train.sh <base> <PR#>…` گامهای 1 تا 2 را خودکار میکند
   (PRهای متعارض خارج میشوند و قطار ادامه میدهد). حالت کامل
   `npm run test:unit` را اجرا میکند — اجراکنندهٔ تنظیمشده برای دستگاه
   (`--test-concurrency=20`) و **نه** دو shard ترتیبی 4 هستهای CI که فاز غالب را
   با حدود 25٪ ظرفیت یک دستگاه 16 هستهای اجرا میکردند (اصلاحشده در
   2026-07-18). گزینهٔ `--fast` (برای تخلیهٔ قطارهای عظیم درونروزی، با تأیید مالک
   در 2026-07-18) همهٔ دروازههای ایستا + vitest را حفظ میکند، اما فقط فایلهای
   node:test تغییریافته توسط PRهای سوارشده را اجرا میکند؛ مجموعهٔ کامل همچنان باید
   دستکم روزی یکبار روی نوک انباشتهشده اجرا شود (یک قطار بدون `--fast`).
3. **سبز** → PRها را بهترتیب ادغام کنید (پیش از هر مورد، `state,headRefOid` را
   دوباره بررسی کنید — PRی که head آن تغییر کرده باشد دوباره وارد بازبینی میشود).
   ثابت کنید تفاوت خالص هر ادغام صرفاً تغییر خود آن PR است (بدون revert ناشی از
   رفع تعارض خودکار: `git diff --stat` را برای حذفهای خارج از محدوده ممیزی کنید).
4. **قرمز** → دسته را به دو نیم تقسیم کنید (هر نیمه را اعتبارسنجی کنید) و از
   اعتبارسنجی مجدد تکبهتک بپرهیزید؛ PR مشکلساز را همراه با شواهد به صف بازبینی
   بازگردانید.
5. **هرگز**: هنگام توقف انتشار در شاخهٔ متوقفشده ادغام نکنید؛ در هیچجا
   `git stash` اجرا نکنید؛ CI را کورکورانه و با امید ناپدیدشدن وضعیت قرمز دوباره
   اجرا نکنید (قاعده: وضعیت قرمز حاوی اطلاعات است).

## سطحبندی (چرا صف فقط با دروازههای سریع ایمن است)

- **برای هر PR** (دروازههای سریع quality.yml): تستهای متأثر از TIA + مجموعهٔ کامل
  unit با 4 shard + vitest + مجموعهٔ lint + typecheck + یکپارچگی docs/changelog.
- **برای هر دسته/نوک** (release-green پیوسته): دروازههای سختگیرانهٔ `--quick` در
  هر push به شاخهٔ release؛ اجرای کامل `--with-build --full-ci` سه بار در روز.
- **برای هر انتشار** (ci.yml روی PR انتشار): ماتریس کامل شامل E2E ×9،
  package-artifact + آزمون boot-smoke روی tarball، و coverage/ratchets.

هیچچیز کمتر از قبل اعتبارسنجی نمیشود — فقط بخش سنگین بهجای هر PR، برای هر
دسته/نوک اجرا میشود و همین موضوع رفتوبرگشتهای O(N) را حذف میکند.
