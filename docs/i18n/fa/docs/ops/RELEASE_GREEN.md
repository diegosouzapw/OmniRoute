# Release-Green: keeping the queue and release branch green (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## مشکلی که این راهکار حل میکند

**گیت کامل** (`.github/workflows/ci.yml` — شاردهای تست واحد، vitest، ratchetها،
`package-artifact`، SonarQube، E2E) **فقط روی PR انتشار** (PR → `main`) اجرا میشود. PRهایی که
`release/**` را هدف قرار میدهند، **fast-gates** را دریافت میکنند (`quality.yml`: تستهای متأثر از TIA + بررسی نوعها + lint)
و برای تغییرات کد، یک بیلد production **مشورتی** نیز اجرا میشود. پیامد: خطاهای مختص انتشار همچنان میتوانند
بیسروصدا روی شاخه انتشار انباشته شوند و در زمان انتشار، **بهصورت لایههای حدوداً ۴۰ دقیقهای منفجر شوند**،
هر بار یکی پس از دیگری.

«خانواده release-green» برای **پیشبینی** این خطاها ایجاد شده است — معادل گیت کامل را
در هر زمان، **بهصورت محلی / خارج از فرایند انتشار** اعتبارسنجی میکند تا PR انتشار از همان
اولین اجرای CI سبز باشد.

> **اصل غیرقابلمذاکره:** هیچیک از این موارد مانع مشارکتکننده نمیشوند. ما بررسی اجباریای
> اضافه نمیکنیم که باعث شکست PR او شود. **drift** (ratchetها) بر عهده نگهدارنده است تا هنگام انتشار مجدداً خط مبنا را تنظیم کند —
> و هرگز دغدغه مشارکتکننده نیست. هیچ بخشی PR را **نمیبندد** (سرقت اعتبار) و هیچ
> تستی را برای عبور **تضعیف نمیکند**.

## این خانواده (۴ بخش) — و نحوه اجرای مستقل هرکدام

| بخش                                                                      | چیست                                                                          | چه زمانی اجرا شود                                                   | دامنه                       |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------- |
| **`/green-prs`** (راهکار A)                                              | اسکن درخواستی توسط نگهدارنده از **صف PRهای باز**                              | **بهصورت مستقل و دورهای** — و بهویژه **پیش از** `/generate-release` | کل صف PRها → `release/**`   |
| **`/validate-release-green`** (راهکار C — `npm run check:release-green`) | موتور اعتبارسنجی: گیت کامل را روی یک شاخه یا یک کاندیدای ادغام بازتولید میکند | بهصورت مستقل و در هر زمان                                           | یک شاخه مشخص یا یک PR ادغام |
| **`/babysit <PR#>`**                                                     | **CI زنده** یک PR را تا سبزشدن هدایت میکند                                    | بهصورت مستقل، برای هر PR                                            | یک PR                       |
| **`nightly-release-green.yml`** (راهکار D)                               | گردشکار شبانه خودکار؛ در صورت قرمز HARD یک issue باز میکند                    | خودکار (cron)                                                       | شاخه انتشار فعال            |

**پاسخ کوتاه به «آیا این فقط برای انتشارهاست؟»:** **خیر.** `/green-prs` طوری طراحی شده که
**بهصورت دورهای و بین انتشارها** اجرا شود. اجرای مستقل، روش معمول استفاده از آن است — انتشار صرفاً
لحظهای است که اجرای آن بیشترین ارزش را ایجاد میکند.

## ساخت مشورتی از PR تا انتشار

`quality.yml` اکنون برای PRهای کدِ غیراپنویس و شاخههای صف Mergify شامل `Build (advisory)` است.
این مورد از دستورالعمل ساخت پروداکشن در `ci.yml` پیروی میکند: Node 24،‏ `npm-ci-retry`،
`check:node-runtime` و `npm run build` با `OMNIROUTE_USE_TURBOPACK=1`. عمداً هیچ آرتیفکت ساختی
آپلود نمیشود، زیرا در این گردشکار هیچ کار کیفیتیِ پاییندستی آن را مصرف نمیکند.
پس از یک هفته اجرای پایدار PRهای انتشار، `continue-on-error` را حذف کنید تا این سیگنال به یک
دروازه مسدودکننده از PR تا انتشار تبدیل شود.

## راهکار C — `npm run check:release-green` (موتور)

اعتبارسنجی معادل انتشار را روی درخت کاری فعلی بازتولید میکند و هر وضعیت قرمز را دستهبندی میکند:

- **HARD** (خطاهای typecheck و lint،‏ unit،‏ vitest،‏ db-rules،‏ public-creds و
  `package-artifact` اختیاری) ← **نقص واقعی**؛ `exit 1`. در شاخه مبدأ اصلاح میشود (TDD، قانون #18).
- **DRIFT** (**هشدارهای** eslint،‏ cognitive-complexity،‏ file-size) ← انحراف انباشتهشدهٔ رچت در
  طول چرخه، **نه تقصیر مشارکتکننده**؛ فقط گزارش میشود و **هنگام انتشار توسط نگهدارنده
  مجدداً خطمبناگذاری میشود**. DRIFT **هرگز** کد خروج را تغییر نمیدهد؛ بنابراین هرگز مانع کسی نمیشود.

```bash
npm run check:release-green                 # شاخه فعلی (درخت کاری)
node scripts/quality/validate-release-green.mjs --json   # خروجی ساختیافته
node scripts/quality/validate-release-green.mjs --quick  # از unit+vitest صرفنظر میکند (فقط drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # شامل package-artifact است (کند)
```

فقط عیبیابی و **گزارش** میکند (بدون اصلاح خودکار). هماهنگسازی فرایند اصلاح تا رسیدن به وضعیت سبز در
`/green-prs` و `/review-prs` قرار دارد.

## راهکار A — `/green-prs` (اسکن صف)

رویه (خلاصه — برای جزئیات، مهارت `green-prs` را ببینید):

1. **فهرستبرداری** از صف PRهای باز نسبت به شاخه فعال انتشار.
2. **تریاژ** هر PR (قابلقبول / شایسته رد / نیازمند اقدام نویسنده) — موارد رد یا نیازمند اقدام نویسنده
   **گزارش میشوند، نه بسته** (نویسنده تصمیم میگیرد).
3. برای هر PR قابلقبول، در یک **درخت کاری مجزا** (قانون #19)، PR را با نوک شاخه انتشار همگام کرده و
   `npm run check:release-green` را اجرا کنید:
   - **HARD** ← از طریق مشارکت در نویسندگی، **در شاخه مشارکتکننده** اصلاح کنید (وضعیت «Merged» نویسنده حفظ میشود)
     و تا رفع همه موارد HARD دوباره اجرا کنید.
   - **DRIFT** ← آن را رها کنید؛ هنگام انتشار مجدداً خطمبناگذاری خواهد شد.
4. یک جدول PR × (نتیجه، موارد قرمز HARD، اصلاحشده؟، DRIFT، اکنون آماده انتشار؟) را **گزارش** کنید.

میتواند صف را بدون ادغام **آماده** کند؛ فقط در صورت درخواست صریح ادغام میکند — و هرگز PR را نمیبندد.

## تناوب پیشنهادی

- **`/green-prs` را بهصورت دورهای اجرا کنید** (برای مثال، هفتگی) و **همیشه پیش از
  `/generate-release`**.
- **`nightly-release-green.yml`** (راهکار D) را بهعنوان یک سیگنال پیوسته نگه دارید: وقتی یک
  issue قرمز HARD باز میکند، زمان اسکن فرا رسیده است.
- از **`/validate-release-green`** بهصورت موردی برای بررسی یک شاخه یا یک نامزد ادغام مشخص استفاده کنید.
- وقتی لازم است یک PR مشخص روی CI زنده تا رسیدن به وضعیت سبز هدایت شود، از **`/babysit <PR#>`** استفاده کنید.

## ارتباط با انتشار

- `/generate-release` اعتبارسنجی را در **فاز 0 (پیش از اجرا)** فراخوانی میکند: DRIFT را مجدداً
  خطمبناگذاری کرده و HARD را پیش از باز کردن PR انتشار اصلاح میکند.
- `/review-prs` در مرحله تصمیمگیری برای ادغام، از دروازه release-green استفاده میکند (سبز پیش از ادغام).

هدف همه این اجزا یکسان است: **یک PR انتشار سبز در نخستین اجرای CI**، بهجای عبور پیاپی از
وضعیتهای قرمز در لایههای ۴۰ دقیقهای در روز انتشار.
