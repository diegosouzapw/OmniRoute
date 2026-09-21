# Quota Sharing Engine (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **مرجع سند**: `docs/routing/QUOTA_SHARE.md`
> بخشی از گروه B (طرحهای 16 + 22).

---

## نمای کلی

موتور اشتراکگذاری سهمیه، سهمیهٔ زمانمحور یک ارائهدهنده (برای مثال پنجرهٔ
۵ ساعتهٔ Codex یا ۱۵۰۰ درخواست در ساعت Kimi) را بهصورت منصفانه میان چند کلید API که
از اتصال یکسانی استفاده میکنند، توزیع میکند.

**مشکلی که حل میکند:** OmniRoute درخواستهای بسیاری از کلیدهای API را به یک حساب
ارائهدهندهٔ بالادستی یکسان پراکسی میکند. بدون منطق اشتراکگذاری، افزایش ناگهانی درخواستها از کلید A میتواند
سهمیهٔ ارائهدهنده برای آن ساعت را تمام کند و کلیدهای B و C را تا زمان بازنشانی پنجره مسدود نگه دارد.
موتور با روشهای زیر از این اتفاق جلوگیری میکند:

1. مصرف چرخشی هر کلید را بهازای هر بُعد (٪، درخواستها، توکنها، $) ردیابی میکند.
2. یک الگوریتم سهم منصفانه و حافظ کار را اعمال میکند: تا زمانی که استخر سراسری اشباع نشده باشد،
   یک کلید میتواند از سهمهای بدون استفاده قرض بگیرد.
3. نتیجه را در مسیر داغ (`chatCore.ts`)، پیش از آنکه درخواست
   به اجراکنندهٔ بالادستی برسد، اعمال میکند.

---

## الگوریتم: سهم منصفانهٔ حافظ کار

در `src/lib/quota/fairShare.ts` پیادهسازی شده است.

### حالتها

| شرط                                        | حالت            | رفتار                                                         |
| ------------------------------------------ | --------------- | ------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **سخاوتمندانه** | کلید میتواند تا سقف محدودیت سراسری منهای کل مصرفشده قرض بگیرد |
| `globalUsedPercent >= saturationThreshold` | **سختگیرانه**   | سهم منصفانهٔ انفرادی را بهطور دقیق اعمال میکند                |

مقدار پیشفرض `saturationThreshold = 0.5` است (متغیر محیطی `QUOTA_SATURATION_THRESHOLD`).

### تصمیمگیری بهازای هر بُعد

موتور برای هر بُعد فعال در استخر، موارد زیر را محاسبه میکند:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = مقدار چرخشی فعلی برای این کلید (از QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

سپس:

- **`policy = hard`**: اگر `consumed > fairShareAllowed` باشد و حالت سختگیرانه باشد ← درخواست را **مسدود کن**.
- **`policy = soft`**: اگر `consumed > fairShareAllowed` باشد و حالت سختگیرانه باشد ← **جریمه کن** (اولویت را در ترکیب کاهش بده؛ هرگز بهطور سخت مسدود نکن).
- **`policy = burst`**: تا زمانی که ظرفیت سراسری وجود دارد، بدون توجه به سهم منصفانه اجازه بده.

### سقف مطلق

`capValue` + `capUnit` در یک تخصیص، سقفی سخت و مستقل از حالت یا
سیاست است. هر بُعدی که در آن `consumed >= capValue` باشد، همیشه درخواست را **مسدود میکند**.

### بررسی چندبُعدی

اگر **هر** بُعدی در استخر باعث مسدودشدن شود، درخواست مسدود میشود. ابعاد
مستقل هستند — تمامشدن سهم 5h% بر بُعد weekly% تأثیری ندارد.

### قرضگیری

در حالت سخاوتمندانه، کلیدی که تخصیص آن کمتر از حد مصرف شده است، میتواند از مازاد
سهمهای تخصیصنیافتهٔ کلیدهای دیگر استفاده کند. فرمول آن چنین است:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

که در آن `consumedByOtherKeys = consumedTotal - consumedByThisKey` است. سقف سراسری
(`limit` استخر برای آن بُعد) همواره سقف سخت محسوب میشود.

---

## شمارندهٔ پنجرهٔ لغزان

در `src/lib/quota/sqliteQuotaStore.ts` و `redisQuotaStore.ts` پیادهسازی شده است.

دو سطل بهازای هر `(apiKeyId, dimensionKey)`:

- `curr`: سطل فعلی (`floor(nowMs / windowMs)`)
- `prev`: سطل قبلی (`curr - 1`)

مقدار چرخشی مؤثر:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**دقت**: حدود ۹۹٪ دقیق است. خطا در مرز میان سطلها حداکثر ۱٪ از اندازهٔ پنجره است
(که در تقریب دوسطلی ذاتی است).

### همزمانی

درایور SQLite: یک mutex درونحافظهای بهازای هر کلید `(apiKeyId | dimensionKey)` از
رقابت خواندن-تغییر-نوشتن جلوگیری میکند. این الگو مشابه سازوکار ضد هجوم ناگهانی در `src/sse/services/auth.ts` است.

درایور Redis: اسکریپت Lua EVAL برای افزایش اتمیک — بهعنوان یک فرمان منفرد Redis اجرا میشود.

---

## درایورها

### SQLite (پیشفرض، بدون نیاز به نصب)

- جدول: `quota_consumption` (به migrationهای `073_quota_pools.sql` / `074_quota_consumption.sql` مراجعه کنید).
- مناسب برای استقرارهای تکنمونهای.
- تمام دادههای ماندگار در DB موجود SQLite متعلق به OmniRoute ذخیره میشوند (`DATA_DIR/storage.sqlite`).

### Redis (اختیاری، چندنمونهای)

- به بسته npm با نام `ioredis` نیاز دارد.
- شمارندهها در Redis ذخیره میشوند؛ فرادادهها (مخزنها/تخصیصها) همچنان در SQLite باقی میمانند.
- مناسب برای استقرارهای دارای چند replica که در آنها شمارندهها باید بهاشتراک گذاشته شوند.

### تغییر درایورها

از طریق رابط کاربری تنظیمات (`/dashboard/settings` ← Quota Store)، یا از طریق متغیرهای محیطی:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

تنظیم DB بر متغیر محیطی اولویت دارد. اگر `driver=redis` باشد اما URL وجود نداشته باشد یا
`ioredis` نصب نشده باشد، factory به SQLite بازمیگردد و یک هشدار ثبت میکند.

ترتیب انتخاب درایور:

1. تنظیم DB با نام `quotaStore.driver`
2. متغیر محیطی `QUOTA_STORE_DRIVER`
3. پیشفرض: `sqlite`

---

## چندبُعدی

یک مخزن میتواند چندین بُعد داشته باشد. هر بُعد مستقل است:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // سقف سراسری مخزن برای این بُعد
}
```

**مثال: پلن Codex** (5h% + weekly%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

برای مجاز بودن یک درخواست، باید تمام ابعاد برآورده شوند.

---

## حلکننده پلن

در `src/lib/quota/planResolver.ts` پیادهسازی شده است.

ترتیب اولویت (از بیشترین به کمترین):

1. **بازنویسی دستی DB** — جدول `provider_plans`، بهازای هر `connectionId`.
2. **کاتالوگ شناختهشده** — `src/lib/quota/planRegistry.ts` (فقط داده).
3. **پلن خالی** — بدون بُعد؛ پیکربندی دستی لازم است.

### کاتالوگ شناختهشده

| ارائهدهنده            | ابعاد                                                         |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`، `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0، نامشخص)، `tokens/weekly`                |
| `minimax`             | `tokens/5h`، `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`، `percent/weekly/100`، `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`، `anthropic` | بدون پیشفرض — پیکربندی دستی لازم است                          |

---

## یکپارچهسازی Pipeline

### hook مربوط به PRE (`open-sse/handlers/chatCore.ts`)

پیش از executor بالادستی و پس از بررسیهای احراز هویت و policy اجرا میشود:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() بهازای هر بُعد
      → fairShare.decideFairShare()
      → اگر مسدود شد → برگرداندن 429 (buildErrorBody، قانون قطعی #12)
      → اگر مجاز بود + کاهش اولویت → تنظیم quotaSoftPenalty=true روی candidate
  → executor.execute()
```

**بازماندن در صورت خطا**: اگر `enforceQuotaShare` خطا ایجاد کند، درخواست با ثبت یک گزارش `pino.warn`
عبور داده میشود. این کار مانع از آن میشود که یک باگ در موتور quota تمام
ترافیک را مسدود کند.

### hook مربوط به POST (ثبت مصرف)

پس از یک پاسخ موفق:

```
executor موفقیت را برمیگرداند
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() بهازای هر بُعد
      → بازماندن در صورت خطا: خطاها بهصورت pino.warn ثبت میشوند و هرگز به client منتشر نمیشوند
```

**نکته درباره انحراف**: اگر `consume` پس از پاسخ با شکست مواجه شود، شمارنده غلتان کمتر از مقدار واقعی خواهد شمرد.
سیگنال اشباع از ارائهدهنده (برای مثال `anthropic-ratelimit-unified-5h-utilization`)
تخمین سراسری را در درخواست بعدی اصلاح میکند.

### جریمه ملایم Combo (`open-sse/services/combo.ts`)

هنگامی که `decision.deprioritize === true` باشد:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // پیشفرض 0.7
}
```

این جریمه پس از تمام عوامل امتیازدهی دیگر اعمال میشود. این کار احتمال انتخاب
یک کلید اشباعشده توسط auto-combo را بدون مسدودسازی قطعی آن کاهش میدهد.

---

## راهنمای رابط کاربری

### `/dashboard/costs/quota-share` — صفحه اصلی مخزنها

کامپوننتها (همگی در `src/app/(dashboard)/dashboard/costs/quota-share/`):

| کامپوننت               | کاربرد                                                               |
| ---------------------- | -------------------------------------------------------------------- |
| `QuotaConceptCard`     | کارت مقدماتی برای توضیح اشتراکگذاری سهمیه به کاربران جدید            |
| `CreatePoolModal`      | ایجاد مخزن سهمیه جدید (اتصال + نام + تخصیصهای اولیه)                 |
| `PoolCard`             | خلاصه هر مخزن: نام، اتصال، تعداد تخصیصها                             |
| `DimensionBar`         | نوار انباشته هر بُعد: سهم هر کلید + میزان استفاده کلی                |
| `AllocationTable`      | جدول شامل مصرفشده، سهم منصفانه، کسری/مازاد و پرچم استقراض            |
| `BurnRateChart`        | نمودار خطی نرخ مصرف EMA (بارگذاری تنبل Recharts از طریق `dynamic()`) |
| `EditAllocationsModal` | ویرایش وزنها، سقفها و سیاستهای تخصیص برای یک مخزن                    |

هوکهای صفحه:

- `usePools` — هر ۳۰ ثانیه `GET /api/quota/pools` را واکشی میکند.
- `usePoolUsage` — در صورت نیاز `GET /api/quota/pools/[id]/usage` را واکشی میکند.
- `useLocalStoragePoolMigration` — هنگام سوارشدن، یک بار برای انتقال دادههای قدیمی LS اجرا میشود.

### `/dashboard/costs/quota-share/plans` — پیکربندی طرح ارائهدهنده

- `ProviderPlanConfigClient.tsx`: منوی کشویی برای انتخاب ارائهدهنده، مشاهده طرح
  نهاییشده (بهصورت خودکار از کاتالوگ یا با بازنویسی دستی) و ویرایش ابعاد.
- تغییرات در `PUT /api/quota/plans/[connectionId]` نوشته میشوند.
- حذف باعث بازگشت به طرح کاتالوگ یا طرح خالی میشود.

---

## متغیرهای محیطی

| متغیر                              | پیشفرض   | توضیحات                                                                |
| ---------------------------------- | -------- | ---------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite` | درایور مورد استفاده: `sqlite` یا `redis`                               |
| `QUOTA_STORE_REDIS_URL`            | _(خالی)_ | URL مربوط به Redis، برای مثال `redis://localhost:6379`                 |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`    | 0..1؛ مقدار `>= threshold` حالت سختگیرانه را فعال میکند                |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`    | 0..1؛ ضریب امتیاز ترکیبی سیاست نرم                                     |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`     | تعداد روزها پیش از آنکه GC سطلهای قدیمی `quota_consumption` را حذف کند |

تنظیمات پایگاه داده (`quotaStore.*`) متغیرهای محیطی را بازنویسی میکنند.

---

## عیبیابی

### Redis پیکربندی شده اما متصل نمیشود

بررسی کنید که `ioredis` نصب شده باشد (`npm ls ioredis`) و
`QUOTA_STORE_REDIS_URL` در دسترس باشد. در صورت شکست اتصال، کارخانه به SQLite
برمیگردد (در سطح `warn` ثبت میشود).

### `peek` داده قدیمی برمیگرداند / در حالت خطا باز میماند

اگر `peek` خطا ایجاد کند، `enforceQuotaShare` نتیجه را بهصورت «مجاز» در نظر میگیرد
(حالت خطا-باز). برای شناسایی علت اصلی، گزارشهای `pino` را برای ورودیهای
`quota:enforce` و `quota:factory` بررسی کنید.

### انحراف شمارنده مصرف

اگر میزان استفاده واقعی ارائهدهنده با شمارندهها متفاوت باشد، این مورد قابل انتظار است —
پنجره لغزان ۲-سطلی در مرزهای پنجره حدود ۱٪ خطا دارد و `consume`
پس از پاسخ بهصورت اجرا و فراموش اجرا میشود. سیگنال اشباع (`saturationSignals.ts`)
میزان بهرهبرداری واقعی ارائهدهنده را با TTL برابر با ۳۰ ثانیه میخواند و
`globalUsedPercent` را متناسب با آن تنظیم میکند.

### مخزن برای نرخ مصرف «بدون داده» نشان میدهد

`computeBurnRate` حداقل به ۲ نمونه تاریخی نیاز دارد. مخزنهای جدیدی که پیشتر
فراخوانی `consume` نداشتهاند، `tokensPerSecond: 0` و `timeToExhaustionMs: null`
را نشان خواهند داد.

---

## مهاجرت از localStorage

هنگامی که `/dashboard/costs/quota-share` برای اولین بار بارگذاری میشود، هوک `useLocalStoragePoolMigration`
موارد زیر را بررسی میکند:

1. `localStorage.getItem("omniroute:quota-share:pools")` خالی نباشد.
2. `GET /api/quota/pools` مقدار `[]` را برگرداند (DB خالی باشد).

اگر هر دو شرط برقرار باشند، هر استخر قدیمی را بهصورت دستهای به `POST /api/quota/pools` ارسال میکند،
سپس کلید localStorage را حذف میکند. این مهاجرت idempotent است: شرط 2 از
مهاجرت مجدد جلوگیری میکند.

---

## طبقهبندی داخلی استراتژی

`quota-share` یک استراتژی مسیریابی **فقط داخلی** است (`INTERNAL_ROUTING_STRATEGY_VALUES` در
`src/shared/constants/routingStrategies.ts`). این استراتژی منحصراً توسط ترکیبهای استخری `qtSd/` که سیستم ایجاد میکند
استفاده میشود و عمداً از `ROUTING_STRATEGY_VALUES` کنار گذاشته شده است تا هرگز
بهعنوان گزینهای قابل انتخاب توسط کاربر در UI یا API ظاهر نشود.

---

## پوشش تست

دو لایه پوشش خودکار همراه با موتور quota-share ارائه میشوند:

| مجموعه             | دستور                                                                  | موارد تحت پوشش                                                                                                                                                                                    |
| :----------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| واحد (29 تست)      | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | زمانبند DRR، کنترل اشباع، سقفهای همزمانی، محاسبات fairShare، صفبندی backlog                                                                                                                       |
| ماتریس یکپارچهسازی | `npm run test:combo:matrix`                                            | تصمیمگیری مسیریابی سرتاسری از طریق خط لوله واقعی combo؛ عدالت DRR و کاهش اولویت هنگام اشباع از طریق نقاط اتصال زنده (`registerQuotaFetcher`، `setLKGP`، `__setHeadroomSaturationFetcherForTests`) |

ماتریس یکپارچهسازی در CI در کنار هر 19 استراتژی عمومی اجرا میشود. مجموعه تست واحد
را میتوان بهصورت مستقل اجرا کرد.

---

## خلاصه شِمای DB

سه جدول توسط مهاجرتهای `078`، `079` و `085` اضافه شدهاند:

- `quota_pools` + `quota_allocations` — تعاریف استخرها و تخصیصهای هر کلید.
- `quota_consumption` — شمارندههای چرخشی 2-باکتی برای هر `(apiKeyId, dimensionKey)`.
- `provider_plans` — بازنویسیهای دستی طرح ارائهدهنده (ابعاد JSON برای هر connectionId).

همه جدولها از طریق مهاجرتهای idempotent مبتنی بر `CREATE TABLE IF NOT EXISTS` اضافه شدهاند.
