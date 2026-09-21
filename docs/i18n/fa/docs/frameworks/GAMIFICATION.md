# Gamification & Leaderboard System (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **منبع حقیقت:** `src/lib/gamification/`، `src/lib/db/gamification.ts`، `src/app/api/gamification/`
> **آخرین بهروزرسانی:** 2026-06-28 — v3.8.40

OmniRoute شامل یک لایه گیمیفیکیشن محلیمحور است که به کاربران بابت
تعامل با پلتفرم پاداش میدهد — از جمله ارسال درخواستها، جابهجایی میان ارائهدهندگان، ایجاد
ترکیبها، اشتراکگذاری توکنها و مشارکت در جامعه. تمام وضعیتها در
SQLite نگهداری میشوند؛ فدراسیون با سرورهای جامعه اختیاری و مبتنی بر ارسال است.

این سیستم بهگونهای طراحی شده است که در **مسیر داغ تأخیر صفر** داشته باشد — رویدادهای گیمیفیکیشن
از خط لوله درخواست بهصورت ارسالوفراموش اجرا میشوند و هرگز
پاسخ LLM را مسدود نمیکنند.

---

## نمای کلی

### هدف

افزایش تعامل و حفظ کاربران از طریق ارائه پیشرفت قابل مشاهده (XP،
سطوح، نشانها)، اعتبار اجتماعی (جدولهای امتیازات) و مشوقهای اقتصادی (اشتراکگذاری
توکن، پاداشهای دعوت).

### محدوده

| قابلیت           | توضیحات                                                         |
| ---------------- | --------------------------------------------------------------- |
| XP و سطوح        | کسب XP بهازای هر اقدام؛ ارتقای سطح بر اساس یک منحنی چندجملهای   |
| نشانها           | بیش از 20 دستاورد در 5 دسته با 4 رده کمیابی                     |
| تداومها          | ردیابی استفاده فعال روزانه همراه با تداوم فعلی/طولانیترین تداوم |
| جدولهای امتیازات | محدودههای سراسری، هفتگی، ماهانه، اشتراکگذاری توکن و مشارکت      |
| اشتراکگذاری توکن | انتقال اعتبار میان کاربران از طریق دفتر کل دوطرفه               |
| دعوت و بازخرید   | کدهای ارجاع با ذخیرهسازی هششده SHA-256                          |
| سرورهای جامعه    | فدراسیون با نمونههای خارجی OmniRoute                            |
| مقابله با تقلب   | امتیازدهی سمت سرور، محدودسازی نرخ و تشخیص ناهنجاری با امتیاز z  |

### اصول طراحی

1. **محلیمحور** — تمام وضعیتها در SQLite نگهداری میشوند و هیچ سرویس خارجی لازم نیست.
2. **غیرمسدودکننده** — رویدادها بهصورت ارسالوفراموش اجرا میشوند؛ مسیر پاسخ LLM
   هرگز توسط منطق گیمیفیکیشن به تأخیر نمیافتد.
3. **تحت کنترل سرور** — XP فقط در سمت سرور محاسبه میشود؛ کلاینتها نمیتوانند
   امتیازها را بهطور مصنوعی افزایش دهند.
4. **احترامگذار به حریم خصوصی** — مشارکت در جدول امتیازات اختیاری است؛ کاربران میتوانند
   پروفایل خود را پنهان کنند.
5. **آماده برای فدراسیون** — سرورهای جامعه میتوانند امتیازها را از طریق API امضاشده ارسال کنند؛
   همگامسازی بهصورت بازنویسی است، نه افزایشی.

---

## معماری

### جریان سطح بالا

```
درخواست کلاینت
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (خط لوله موجود) ...
      → پاسخ بالادستی برای کلاینت ارسال میشود
      → setImmediate (ارسالوفراموش):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

منتشرکننده رویداد تنها نقطه یکپارچهسازی است. `chatCore.ts` پس از ارسال پاسخ،
`emitGamificationEvent()` را فراخوانی میکند؛ ماژول رویداد، رویداد را میان زیرسیستمهای
XP، تداوم، نشان، جدول امتیازات و مقابله با تقلب توزیع میکند.

### نمودار وابستگی ماژولها

```
src/lib/gamification/
  events.ts          ← نقطه ورود (فراخوانیشده از chatCore.ts)
    ├── xp.ts        ← محاسبه XP و تعیین سطح
    ├── streaks.ts   ← ردیابی تداوم فعالیت روزانه
    ├── badges.ts    ← ارزیابی معیارهای نشان
    ├── leaderboard.ts ← محاسبه رتبه و انتشار SSE
    ├── antiCheat.ts ← محدودسازی نرخ و تشخیص ناهنجاری
    ├── sharing.ts   ← دفتر کل انتقال توکن
    ├── invites.ts   ← مدیریت کد دعوت/بازخرید
    ├── servers.ts   ← فدراسیون سرورهای جامعه
    └── notifications.ts ← جریان اعلان SSE

src/lib/db/
  gamification.ts    ← تمام عملیات CRUD (8 جدول)

src/app/api/gamification/
  leaderboard/       ← GET رتبهبندیها، POST بازآوری دستی
  leaderboard/stream ← بهروزرسانیهای بلادرنگ SSE
  transfer/          ← GET تاریخچه، POST ارسال توکنها
  invite/            ← GET/POST کدها، DELETE لغو
  invite/redeem/     ← POST بازخرید یک کد
  servers/           ← GET/POST/DELETE سرورهای جامعه
  federation/score/  ← POST ارسال امتیاز به سرور
  federation/leaderboard/ ← GET دریافت جدول امتیازات از سرور
  notifications/     ← اعلانهای SSE برای نشان/ارتقای سطح
  anomalies/         ← GET گزارشهای ناهنجاری (مدیر)
  rotate/            ← POST چرخش اسرار توکن دعوت
```

---

## لایه داده

### جدولهای پایگاه داده

همه جدولها در پایگاه داده اصلی SQLite مربوط به OmniRoute قرار دارند و توسط migration
`060_create_gamification.sql` ایجاد میشوند. ژورنالنویسی WAL از نمونه singleton
`getDbInstance()` در `src/lib/db/core.ts` به ارث برده میشود.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels          │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### ماژول دامنه: `src/lib/db/gamification.ts`

از الگوی استاندارد OmniRoute پیروی میکند — `getDbInstance()` را از
`core.ts` وارد کرده و توابع CRUD نوعدار را صادر میکند. هیچ SQL خامی در کنترلکنندههای مسیر وجود ندارد.

توابع کلیدی:

| تابع                       | توضیحات                                                   |
| -------------------------- | --------------------------------------------------------- |
| `upsertLeaderboardEntry()` | درج یا بهروزرسانی امتیاز برای (api_key_id, scope, period) |
| `getLeaderboard()`         | رتبهبندی صفحهبندیشده برای scope/period مشخص               |
| `getUserLevel()`           | دریافت یا ایجاد رکورد سطح کاربر                           |
| `updateUserLevel()`        | تنظیم اتمیک XP، سطح و عنوان                               |
| `getBadgeDefinitions()`    | همه تعاریف نشانها (با امکان فیلتر اختیاری)                |
| `getUserBadges()`          | نشانهای کسبشده توسط یک کاربر                              |
| `awardBadge()`             | درج نشان کسبشده (idempotent بر اساس badge_id)             |
| `logXpAction()`            | افزودن به xp_audit_log                                    |
| `getXpAuditLog()`          | تاریخچه ممیزی صفحهبندیشده برای یک کاربر                   |
| `insertLedgerEntry()`      | انتقال دوطرفه (درون یک تراکنش)                            |
| `getBalance()`             | مجموع دریافتی منهای ارسالی برای یک کاربر                  |
| `getTransferHistory()`     | گزارش صفحهبندیشده انتقالها                                |
| `createInviteToken()`      | درج کد دعوت و توکن هششده                                  |
| `redeemInviteToken()`      | جستوجو بر اساس کد، اعتبارسنجی و افزایش تعداد استفادهها    |
| `upsertCommunityServer()`  | ثبت یا بهروزرسانی یک سرور فدراسیون                        |
| `getCommunityServers()`    | فهرست سرورها برای یک کاربر                                |
| `deleteCommunityServer()`  | حذف ثبت یک سرور                                           |

---

## سیستم XP / سطح

**فایل:** `src/lib/gamification/xp.ts`

### منحنی سطح

XP موردنیاز برای رسیدن به سطح `n` از یک منحنی چندجملهای پیروی میکند:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| سطح | XP تا سطح بعدی | XP تجمعی  | عنوان    |
| --- | -------------- | --------- | -------- |
| 1   | 100            | 100       | مبتدی    |
| 5   | 1,118          | 2,415     | مبتدی    |
| 10  | 3,162          | 10,523    | کاوشگر   |
| 25  | 12,500         | 86,024    | کاوشگر   |
| 50  | 35,355         | 345,529   | متخصص    |
| 75  | 64,952         | 948,683   | استاد    |
| 100 | 100,000        | 2,050,000 | افسانهای |

### عنوانها

| بازه سطح | عنوان    |
| -------- | -------- |
| 1 – 9    | مبتدی    |
| 10 – 24  | کاوشگر   |
| 25 – 49  | متخصص    |
| 50 – 74  | استاد    |
| 75 – 100 | افسانهای |

### پاداشهای XP

| اقدام             | XP  | توضیحات                                                 |
| ----------------- | --- | ------------------------------------------------------- |
| `request`         | 1   | بهازای هر درخواست API که از طریق OmniRoute مسیریابی شود |
| `provider_switch` | 5   | تغییر به یک ارائهدهنده متفاوت                           |
| `model_switch`    | 3   | تغییر به یک مدل متفاوت                                  |
| `combo_create`    | 10  | ایجاد یک ترکیب جدید                                     |
| `combo_use`       | 2   | استفاده از یک ترکیب برای یک درخواست                     |
| `token_share`     | 1   | بهازای هر 1 000 توکن بهاشتراکگذاشتهشده با کاربر دیگر    |
| `invite_redeem`   | 50  | استفاده از یک کد دعوت                                   |
| `daily_login`     | 5   | استفاده فعال روزانه (یکبار در روز)                      |
| `streak_bonus`    | 2   | بهازای هر روز متوالی در زنجیره (ضربشده در طول زنجیره)   |
| `badge_unlock`    | 10  | باز کردن یک نشان                                        |

### روند اعطا

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. برای دریافت مقدار XP، `XP_REWARDS[action]` را جستوجو کنید.
2. آن را از `checkRateLimit()` عبور دهید (ضدتقلب: حداکثر 1000 XP در دقیقه برای هر کلید).
3. یک تراکنش باز کنید:
   - ردیف فعلی `user_levels` را بخوانید.
   - XP را اضافه کنید؛ سطح را از طریق `levelFromXp(totalXp)` دوباره محاسبه کنید.
   - اگر سطح تغییر کرد، `levelUp = true` را تنظیم کنید.
   - ردیف `user_levels` را بهروزرسانی کنید.
   - یک رکورد در `xp_audit_log` درج کنید.
4. نتیجه را برگردانید. فراخواننده اعلانها را مدیریت میکند.

### تابع کمکی: `levelFromXp(totalXp)`

سطوح 1..100 را پیمایش میکند و `xp_for_level(n)` را با هم جمع میکند تا XP تجمعی
از `totalXp` فراتر رود. بالاترین سطحی را برمیگرداند که آستانه آن برآورده شده است.
پیچیدگی این عملیات O(100) است — با توجه به اینکه حداکثر سطح 100 است، قابلقبول است.

---

## سیستم نشانها

**فایل:** `src/lib/gamification/badges.ts`

### دستهبندیها

| دستهبندی       | توضیحات                          | نمونه نشانها                            |
| -------------- | -------------------------------- | --------------------------------------- |
| `usage`        | نقاط عطف مبتنی بر حجم            | اولین درخواست، 1K درخواست، 100K         |
| `sharing`      | اشتراکگذاری توکن و معرفی کاربران | اولین اشتراکگذاری، سخاوتمند (10 اشتراک) |
| `contribution` | مشارکت در جامعه                  | سازنده ترکیب، کاوشگر ارائهدهندگان       |
| `streak`       | تداوم در طول زمان                | جنگجوی هفتگی، متعهد ماهانه              |
| `rare`         | دستاوردهای دشوار یا پنهان        | پذیرنده اولیه، گزارشدهنده باگ           |

### درجههای کمیابی

| درجه کمیابی | رنگ     | راهنمای احتمال |
| ----------- | ------- | -------------- |
| `common`    | خاکستری | بیشتر کاربران  |
| `uncommon`  | سبز     | کاربران فعال   |
| `rare`      | آبی     | کاربران متعهد  |
| `legendary` | طلایی   | 1% برتر        |

### انواع معیار

| نوع            | فیلد         | توضیحات                                                 |
| -------------- | ------------ | ------------------------------------------------------- |
| `action_count` | `count`      | انجام اقدام به تعداد N بار (برای مثال، 1000 درخواست)    |
| `streak`       | `days`       | حفظ زنجیره برای N روز متوالی                            |
| `unique_count` | `field`, `n` | استفاده از N مقدار منحصربهفرد (برای مثال، 10 مدل مختلف) |
| `rank`         | `scope`, `n` | رسیدن به رتبه N در محدوده یک جدول رتبهبندی              |
| `first`        | —            | اولین فردی بودن که یک اقدام را انجام میدهد              |
| `hidden`       | (متغیر)      | معیارهایی که تا زمان کسب شدن نمایش داده نمیشوند         |

تعریف نشانها بهصورت `criteria` با قالب JSON در `badge_definitions` ذخیره میشود:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### روند ارزیابی

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # همه تعریفها
    → getUserBadges(apiKeyId)         # قبلاً کسبشده (رد کردن)
    → برای هر نشان کسبنشده:
       → matchesCriteria(badge, event, userState)
       → در صورت تطابق: awardBadge(apiKeyId, badgeId)
         → محتوای اعلان را برگردان
```

ارزیابی **رویدادمحور** است — پس از هر رویداد بازیوارسازی اجرا میشود، اما
فقط نشانهایی را بررسی میکند که `criteria.type` آنها با اقدام رویداد مطابقت دارد. این
کار ارزیابی را سریع نگه میدارد (< 5ms برای بیشتر رویدادها).

### `matchesCriteria(badge, event, userState)`

| نوع معیار      | بررسی                                                |
| -------------- | ---------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`          |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                 |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`               |
| `rank`         | `getRank(apiKeyId, scope) <= n`                      |
| `first`        | نبود ورودی قبلی در `xp_audit_log` برای این نوع اقدام |
| `hidden`       | واگذاری به زیربررسی مناسب                            |

### نشانهای داخلی (20+)

<details>
<summary>فهرست کامل نشانها</summary>

| نشان                         | دستهبندی    | کمیابی   | معیار                           |
| ---------------------------- | ----------- | -------- | ------------------------------- |
| نخستین گامها                 | استفاده     | رایج     | 1 درخواست                       |
| شروع فعالیت                  | استفاده     | رایج     | 100 درخواست                     |
| کاربر حرفهای                 | استفاده     | غیررایج  | 1,000 درخواست                   |
| صدگانه                       | استفاده     | کمیاب    | 10,000 درخواست                  |
| قدرت مطلق                    | استفاده     | افسانهای | 100,000 درخواست                 |
| جابهجاشونده بین ارائهدهندگان | مشارکت      | رایج     | استفاده از 5 ارائهدهنده متفاوت  |
| استاد ارائهدهندگان           | مشارکت      | غیررایج  | استفاده از 20 ارائهدهنده متفاوت |
| معمار ترکیبها                | مشارکت      | غیررایج  | ایجاد 5 ترکیب                   |
| استاد بزرگ ترکیبها           | مشارکت      | کمیاب    | ایجاد 25 ترکیب                  |
| نخستین اشتراکگذاری           | اشتراکگذاری | رایج     | 1 انتقال توکن                   |
| بخشنده                       | اشتراکگذاری | غیررایج  | 10 انتقال توکن                  |
| نیکوکار                      | اشتراکگذاری | کمیاب    | انتقال مجموعاً 10,000 توکن      |
| معرف                         | اشتراکگذاری | رایج     | 1 معرفی موفق                    |
| شبکهساز                      | اشتراکگذاری | غیررایج  | 10 معرفی موفق                   |
| مبارز هفتگی                  | تداوم       | غیررایج  | تداوم 7روزه                     |
| متعهد ماهانه                 | تداوم       | کمیاب    | تداوم 30روزه                    |
| توقفناپذیر                   | تداوم       | افسانهای | تداوم 365روزه                   |
| پذیرنده اولیه                | کمیاب       | افسانهای | پیوستن در دوره بتا              |
| پیشگام فشردهسازی             | کمیاب       | غیررایج  | 100 بار استفاده از فشردهسازی    |
| گردآورنده مهارتها            | کمیاب       | کمیاب    | استفاده از 10 مهارت متفاوت      |
| کاوشگر مدلها                 | مشارکت      | غیررایج  | استفاده از 15 مدل متفاوت        |

</details>

---

## ردیاب زنجیره

**فایل:** `src/lib/gamification/streaks.ts`

### مدل داده

زنجیرهها در جدول `key_value` (جدول ابزار مشترک) و تحت کلیدهای
فضای نامدار ذخیره میشوند:

| کلید                          | مقدار                            | توضیحات             |
| ----------------------------- | -------------------------------- | ------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | دادههای زنجیره فعال |

### منطق

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. رکورد زنجیره را از `key_value` بخوانید.
2. مقادیر `{current}`، `{longest}` و `{lastDate}` (رشته تاریخ ISO) را تجزیه کنید.
3. اگر `lastDate === today` باشد — بدون تغییر (امروز قبلاً محاسبه شده است).
4. اگر `lastDate === yesterday` باشد — مقدار `current` را افزایش دهید؛ در صورت نیاز `longest` را بهروزرسانی کنید.
5. اگر `lastDate < yesterday` باشد — مقدار `current = 1` را بازنشانی کنید (زنجیره شکسته شده است).
6. رکورد بهروزشده را بنویسید.
7. نقاط عطف را بررسی کنید: 7، 14، 30، 60، 90، 180 و 365 روز. اگر از یکی عبور شده بود،
   `milestone = true` را تنظیم کنید (فراخواننده XP اعطا کرده و نشانها را بررسی میکند).

### موارد خاص

- **منطقه زمانی**: زنجیرهها از تاریخهای UTC استفاده میکنند (`new Date().toISOString().slice(0, 10)`).
  این کار عمدی است — یک منطقه زمانی مرجع و واحد، از سوءاستفاده از طریق
  جابهجایی بین مناطق زمانی جلوگیری میکند.
- **کاربران جدید**: هیچ رکورد زنجیرهای وجود ندارد؛ نخستین درخواست آن را با
  `current=1, longest=1, lastDate=today` ایجاد میکند.
- **چندین درخواست در روز**: فقط نخستین درخواست در روز UTC
  زنجیره را افزایش میدهد.

---

## جدول امتیازات

**فایل:** `src/lib/gamification/leaderboard.ts`

### دامنهها

| دامنه           | دوره    | توضیحات                                                |
| --------------- | ------- | ------------------------------------------------------ |
| `global`        | `all`   | XP تجمعی تمام دوران                                    |
| `weekly`        | `week`  | XP کسبشده در هفته جاری UTC (دوشنبه تا یکشنبه)          |
| `monthly`       | `month` | XP کسبشده در ماه جاری UTC                              |
| `tokens_shared` | `all`   | مجموع توکنهای منتقلشده به دیگران                       |
| `contributions` | `all`   | ترکیبهای ایجادشده + ارائهدهندگان و مهارتهای استفادهشده |

### محاسبه رتبه

رتبهها **هنگام خواندن محاسبه میشوند** و ذخیره نمیشوند. این کار از کهنهشدن دادههای رتبه
جلوگیری کرده و نیاز به وظایف دورهای برای محاسبه مجدد رتبهها را از بین میبرد.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

الگوی کوئری:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### چرخش دوره

جدولهای امتیازات هفتگی و ماهانه بهطور خودکار میچرخند:

1. **بایگانی**: در مرز دوره، ورودیهای فعلی را با برچسب دوره در
   `leaderboard_archive` کپی کنید.
2. **بازنشانی**: ورودیهای مربوط به دوره منقضیشده را حذف کنید.
3. **راهاندازی**: در هر فراخوانی `updateLeaderboard()` بررسی میشود؛ نخستین درخواست
   دوره جدید، چرخش را راهاندازی میکند.

این کار تضمین میکند که جدولهای هفتگی هر دوشنبه ساعت 00:00 UTC و جدولهای ماهانه
در روز نخست هر ماه بازنشانی شوند.

### بهروزرسانیهای بلادرنگ SSE

**نقطه پایانی:** `GET /api/gamification/stream`

```
کلاینت → GET /api/gamification/stream
  → اتصال SSE برقرار میشود
  → سرور فوراً نمایی از ۱۰ رتبه برتر جدول امتیازات را ارسال میکند
  → هر ۵ ثانیه: در صورت تغییر، ۱۰ رتبه برتر بهروزشده ارسال میشوند
  → هر ۱۵ ثانیه: توضیح ضربان حیات (": heartbeat\n\n")
  → کلاینت قطع میشود → پاکسازی (حذف شنونده)
```

قالب رویداد:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

مدیر SSE کلاینتهای متصل را به تفکیک دامنه ردیابی میکند و فقط زمانی بهروزرسانیها را
ارسال میکند که دادههای جدول امتیازات واقعاً از آخرین ارسال تغییر کرده باشند.

---

## اشتراکگذاری توکن

**فایل:** `src/lib/gamification/sharing.ts`

### دفتر کل دوطرفه

هر انتقال، دو ردیف در `token_ledger` ایجاد میکند:

| ردیف     | `from_key_id` | `to_key_id` | `amount` |
| -------- | ------------- | ----------- | -------- |
| بدهکار   | فرستنده       | گیرنده      | +amount  |
| بستانکار | گیرنده        | فرستنده     | -amount  |

صبر کنید — قرارداد به این صورت است:

| ردیف   | `from_key_id` | `to_key_id` | `amount` | معنا                  |
| ------ | ------------- | ----------- | -------- | --------------------- |
| ارسال  | فرستنده       | گیرنده      | +amount  | خروجی از حساب فرستنده |
| دریافت | گیرنده        | فرستنده     | +amount  | ورودی به حساب گیرنده  |

موجودی بهشکل زیر محاسبه میشود:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### جریان انتقال

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **اعتبارسنجی**: `amount > 0` و `fromKeyId !== toKeyId`.
2. **همتوانی**: بررسی کنید که آیا `idempotency_key` از قبل در دفتر کل وجود دارد یا خیر.
   اگر وجود دارد، نتیجه ذخیرهشده در حافظه نهان را برگردانید.
3. **تراکنش** (یک تراکنش واحد SQLite):
   a. موجودی فرستنده را محاسبه کنید.
   b. اگر `balance < amount` بود، عملیات را لغو کنید (موجودی ناکافی).
   c. ردیف ارسال را درج کنید (`from=sender,` را برگردانید.

### محدودسازی نرخ

- حداکثر ۱۰ انتقال در دقیقه برای هر کلید API.
- حداکثر ۱۰٬۰۰۰ توکن در هر انتقال.
- حداکثر ۱۰۰٬۰۰۰ توکن انتقالیافته در روز برای هر کلید API.

---

## توکنهای دعوت و بازخرید

**فایل:** `src/lib/gamification/invites.ts`

### قالب کد

- **کد**: یک رشته الفباییعددی ۸ کاراکتری (برای مثال، `A3K9-X7M2`) که برای انسان خوانا است و
  به کاربر نمایش داده میشود.
- **توکن**: یک توکن تصادفی ۳۲ بایتی که بهصورت هش SHA-256 ذخیره میشود. برای
  بازخرید برنامهنویسیشده (برای مثال، پیوندهای URL) استفاده میشود.

### ذخیرهسازی

| ستون         | مقدار                        |
| ------------ | ---------------------------- |
| `code`       | `A3K9X7M2` (یکتا، ایندکسشده) |
| `token_hash` | SHA-256(raw_token)           |

توکن خام دقیقاً یک بار، هنگام ایجاد، به کاربر بازگردانده میشود. OmniRoute
هرگز آن را دوباره ذخیره یا نمایش نمیدهد — فقط هش آن باقی میماند.

### جلوگیری از خودارجاعی

هنگامی که یک کاربر کدی را بازخرید میکند، سیستم موارد زیر را بررسی میکند:

1. کد به یک `api_key_id` متفاوت تعلق داشته باشد.
2. کاربر بازخریدکننده قبلاً هیچ کدی از همان
   ارجاعدهنده بازخرید نکرده باشد (اتصال روی `invite_tokens` و گزارش بازخرید).

اگر هر یک از بررسیها ناموفق باشد، بازخرید با یک پیام خطای واضح رد میشود.

### انقضا و محدودیتها

- مقدار پیشفرض `max_uses`: ۱۰ (هنگام ایجاد قابل تنظیم است).
- مقدار پیشفرض `expires_at`: ۳۰ روز پس از ایجاد.
- کدهای منقضیشده یا بهاتمامرسیده، HTTP 410 Gone را برمیگردانند.

---

## فدراسیون سرورهای جامعه

**فایل:** `src/lib/gamification/servers.ts`

### اتصال

یک سرور جامعه از طریق توکن دعوتی که توسط سرور راهدور صادر شده است، ثبت میشود. نمونهٔ محلی:

1. توکن دعوت را دریافت میکند (برای مثال، توکن در داشبورد جایگذاری میشود).
2. برای اعتبارسنجی توکن و دریافت جدول امتیازات فعلی، `POST /api/gamification/federation/leaderboard` را روی سرور راهدور فراخوانی میکند.
3. رکورد سرور را با `status: connected` ذخیره میکند.

### مدل همگامسازی

فدراسیون از **همگامسازی بازنویسی** استفاده میکند، نه همگامسازی افزایشی:

```
نمونهٔ محلی                    سرور جامعه
     │                              │
     ├── ارسال امتیاز ─────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (سرور هش توکن را اعتبارسنجی میکند)
     │                              │
     ├── دریافت جدول امتیازات ─────►│  GET /federation/leaderboard
     │◄── برترین N ورودی ──────────┤  (کش محلی را بازنویسی میکند)
     │                              │
     └── بررسی سلامت ──────────────►│  GET /federation/health
         (هر 60 ثانیه، مهلت 5 ثانیه) │
```

### احراز هویت

درخواستهای فدراسیون شامل موارد زیر هستند:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

سرور راهدور توکن را هش میکند و ردیف منطبق در `community_servers` را مییابد. این کار از انتقال هش ذخیرهشده جلوگیری میکند.

### پایش سلامت

هر رکورد سرور موارد زیر را ردیابی میکند:

| فیلد        | توضیحات                                |
| ----------- | -------------------------------------- |
| `status`    | `connected`، `degraded`، `unreachable` |
| `last_sync` | برچسب زمانی ISO آخرین همگامسازی موفق   |
| `failures`  | تعداد شکستهای متوالی بررسی سلامت       |

پس از 5 شکست متوالی، وضعیت به `unreachable` تغییر میکند و همگامسازی تا زمانی که یک بررسی سلامت دستی با موفقیت انجام شود، متوقف میماند.

---

## مقابله با تقلب

**فایل:** `src/lib/gamification/antiCheat.ts`

### امتیازدهی سمت سرور

تمام محاسبات XP در `src/lib/gamification/xp.ts` انجام میشوند. کلاینتها هرگز امتیاز ارسال نمیکنند؛ آنها کنشها را ارسال میکنند و سرور XP را محاسبه میکند. ستون `leaderboard.score` فقط توسط کد سمت سرور قابل نوشتن است.

### محدودسازی نرخ

| محدودیت                | مقدار   | محدوده             |
| ---------------------- | ------- | ------------------ |
| حداکثر XP در دقیقه     | 1,000   | بهازای هر کلید API |
| حداکثر انتقال در دقیقه | 10      | بهازای هر کلید API |
| حداکثر مقدار انتقال    | 10,000  | بهازای هر انتقال   |
| حداکثر انتقال روزانه   | 100,000 | بهازای هر کلید API |

محدودیتهای نرخ از یک پنجرهٔ لغزان درونحافظهای استفاده میکنند (همان الگوی `RateLimitManager` در `open-sse/services/`). اگر فرایند دوباره راهاندازی شود، شمارندههای مبتنی بر SQLite بهعنوان جایگزین استفاده میشوند.

### تشخیص ناهنجاری با امتیاز Z

سیستم برای هر کلید API یک پنجرهٔ لغزان 7روزه از XP کسبشده در هر ساعت نگه میدارد. هنگام هر اعطای XP:

1. نرخ ساعتی فعلی XP کاربر محاسبه میشود.
2. میانگین و انحراف معیار جامعه محاسبه میشود.
3. مقدار `z = (user_rate - mean) / stddev` محاسبه میشود.
4. اگر `z > 3.0` باشد (3 انحراف معیار)، مورد بهعنوان ناهنجاری علامتگذاری میشود.

ناهنجاریها با `action = 'anomaly_detected'` در `xp_audit_log` ثبت میشوند و در داشبورد مدیریت نمایش داده میشوند.

### ردپای حسابرسی

هر اعطای XP، انتقال، دریافت نشان و تشخیص ناهنجاری با موارد زیر در `xp_audit_log` ثبت میشود:

| فیلد         | توضیحات                                          |
| ------------ | ------------------------------------------------ |
| `api_key_id` | چه کسی                                           |
| `action`     | چه اتفاقی افتاد (xp_award، transfer، anomaly، …) |
| `xp_awarded` | مقدار (برای رویدادهای غیر XP برابر با 0)         |
| `metadata`   | JSON حاوی زمینه (نوع کنش، هدف، …)                |
| `created_at` | زمان (ISO 8601)                                  |

مدیران میتوانند ردپای کامل حسابرسی را از طریق `GET /api/gamification/anomalies` واکشی کنند.

---

## مسیرهای API

همه مسیرها از الگوی استاندارد OmniRoute پیروی میکنند:

```
مسیر → پیشدرخواست CORS → اعتبارسنجی بدنه (Zod) → احراز هویت (extractApiKey)
  → مدیریتکننده
```

### نقاط پایانی

| متد    | مسیر                                       | توضیحات                                      | احراز هویت |
| ------ | ------------------------------------------ | -------------------------------------------- | ---------- |
| GET    | `/api/gamification/leaderboard`            | دریافت جدول رتبهبندی (دامنه، دوره، صفحهبندی) | اختیاری    |
| POST   | `/api/gamification/leaderboard`            | بهروزرسانی اجباری کش جدول رتبهبندی           | الزامی     |
| GET    | `/api/gamification/stream`                 | بهروزرسانیهای بلادرنگ جدول رتبهبندی با SSE   | اختیاری    |
| GET    | `/api/gamification/transfer`               | دریافت تاریخچه انتقالها (صفحهبندی)           | الزامی     |
| POST   | `/api/gamification/transfer`               | ارسال توکن به کاربری دیگر                    | الزامی     |
| GET    | `/api/gamification/invite`                 | فهرستکردن کدهای دعوت من                      | الزامی     |
| POST   | `/api/gamification/invite`                 | تولید یک کد دعوت جدید                        | الزامی     |
| DELETE | `/api/gamification/invite`                 | لغو یک کد دعوت                               | الزامی     |
| POST   | `/api/gamification/invite/redeem`          | استفاده از یک کد دعوت                        | الزامی     |
| GET    | `/api/gamification/servers`                | فهرستکردن سرورهای انجمن                      | الزامی     |
| POST   | `/api/gamification/servers`                | اتصال به یک سرور انجمن                       | الزامی     |
| DELETE | `/api/gamification/servers`                | قطع اتصال از یک سرور انجمن                   | الزامی     |
| POST   | `/api/gamification/federation/score`       | ارسال امتیاز به سرور راهدور                  | فدراسیون   |
| GET    | `/api/gamification/federation/leaderboard` | دریافت جدول رتبهبندی از سرور راهدور          | فدراسیون   |
| GET    | `/api/gamification/notifications`          | اعلانهای SSE برای نشانها/ارتقای سطح          | الزامی     |
| GET    | `/api/gamification/anomalies`              | مشاهده گزارشهای ناهنجاری (مدیر)              | مدیر       |
| POST   | `/api/gamification/rotate`                 | چرخش اسرار توکن دعوت                         | الزامی     |

### نمونههای درخواست/پاسخ

**POST /api/gamification/transfer**

```json
// درخواست
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// پاسخ 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// پاسخ 400 (موجودی ناکافی)
{
  "error": "Insufficient balance",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## ابزارهای MCP (۸)

در `open-sse/mcp-server/` و در کنار ابزارهای موجود ثبت شدهاند. این ابزارها تحت حوزهٔ مجوز
`gamification` قرار دارند.

| ابزار                      | توضیحات                                    | شِمای ورودی                  |           |
| -------------------------- | ------------------------------------------ | ---------------------------- | --------- |
| `gamification_leaderboard` | دریافت جدول امتیازات برای یک حوزه/دوره     | `{ scope, period?, limit? }` |
| `gamification_rank`        | دریافت رتبهٔ فراخواننده و کاربران مجاور آن | `{ scope }`                  |
| `gamification_profile`     | دریافت خلاصهٔ XP، سطح، عنوان و تداوم       | `{}`                         |
| `gamification_badges`      | فهرست نشانهای کسبشده یا همهٔ تعاریف        | `{ earned?: boolean }`       |
| `gamification_transfer`    | ارسال توکن به کاربر دیگر                   | `{ to, amount }`             |
| `gamification_invite`      | ایجاد یا فهرستکردن کدهای دعوت              | `{ action: "create"          | "list" }` |
| `gamification_servers`     | فهرستکردن یا اتصال به سرورهای انجمن        | `{ action, token? }`         |
| `gamification_anomalies`   | مشاهدهٔ گزارشهای ناهنجاری (حوزهٔ مدیر)     | `{ limit?, since? }`         |

---

## صفحات داشبورد

### `/dashboard/leaderboard`

- نمایش سکوی برترها (۳ نفر اول همراه با آواتار و XP).
- انتخابگر حوزه: سراسری / هفتگی / ماهانه / توکنهای اشتراکگذاریشده / مشارکتها.
- جدول صفحهبندیشده (۲۵ مورد در هر صفحه) شامل رتبه، نام، امتیاز، سطح و عنوان.
- بهروزرسانیهای بلادرنگ SSE — تغییرات رتبه با پویانمایی نمایش داده میشوند.
- کاربر فعلی در جدول برجسته میشود و یک ردیف چسبان با عنوان «رتبهٔ شما» دارد.

### `/dashboard/profile`

- نوار پیشرفت XP همراه با سطح فعلی و آستانهٔ سطح بعدی.
- نشان عنوان بهشکل برجسته نمایش داده میشود.
- گالری نشانها — نشانهای کسبشده همراه با تاریخ کسب و نشانهای کسبنشده بهصورت خاکستری
  (نشانهای پنهان تا زمان کسبشدن با «???» نمایش داده میشوند).
- شمارندهٔ تداوم همراه با نماد شعله؛ تقویم تداوم (۳۰ روز گذشته).
- نمودار تاریخچهٔ XP (XP روزانه در ۳۰ روز گذشته).

### `/dashboard/tokens`

- موجودی توکن (برجسته، در بالای صفحه).
- فرم انتقال: گیرنده، مقدار، پنجرهٔ تأیید.
- جدول تاریخچهٔ انتقال با فیلترهای ارسالی/دریافتی/همه.
- بخش دعوت: کدهای فعال، ایجاد کد جدید، پیوند اشتراکگذاری.
- سرورهای انجمن: فهرست همراه با وضعیت سلامت، اتصال/قطع اتصال.

### `/dashboard/gamification/admin`

- فهرست ناهنجاریها همراه با شدت، کاربر، مُهر زمانی و امتیاز z.
- نمایشگر گزارش ممیزی همراه با فیلترها (نوع عملیات، کاربر، بازهٔ زمانی).
- آمار سیستم: مجموع XP اعطاشده، کاربران فعال، نرخ کسب نشانها.
- نمای کلی سلامت سرورهای فدراسیون.

---

## یکپارچهسازی خط لوله

### نقطهٔ یکپارچهسازی

قابلیت بازیوارسازی در یک نقطه از خط لولهٔ درخواست در
`open-sse/handlers/chatCore.ts` متصل میشود:

```typescript
// پس از ارسال پاسخ به کلاینت:
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // اجرا و فراموشکردن: ثبت شود، اما هرگز به کلاینت منتقل نشود
  });
});
```

### انواع رویداد

| نوع رویداد          | زمان انتشار                                                       |
| ------------------- | ----------------------------------------------------------------- |
| `request.completed` | پاسخ موفق LLM ارسال شده است                                       |
| `provider.switch`   | ارائهدهنده تغییر کرده است (بازگشت جایگزین combo نیز محاسبه میشود) |
| `combo.created`     | پیکربندی جدید combo ذخیره شده است                                 |
| `combo.used`        | هدف combo با موفقیت مورد استفاده قرار گرفته است                   |
| `badge.earned`      | ارزیابی نشان یک تطابق پیدا کرده است                               |
| `streak.milestone`  | از آستانهٔ تداوم عبور شده است                                     |
| `transfer.sent`     | انتقال توکن تکمیل شده است                                         |
| `referral.redeemed` | کد دعوت با موفقیت استفاده شده است                                 |
| `compression.used`  | فشردهسازی پرامپت اعمال شده است                                    |
| `skill.executed`    | اجرای مهارت تکمیل شده است                                         |
| `model.first_use`   | مدل در ۷ روز گذشته استفاده نشده است                               |

### تضمین عدم مسدودسازی

الگوی `setImmediate` + `.catch(() => {})` تضمین میکند که:

1. پاسخ پیش از اجرای بازیوارسازی بهطور کامل ارسال شود.
2. خطاهای بازیوارسازی هرگز به کلاینت نمایش داده نشوند.
3. پردازش رویداد در ریزوظیفهٔ بعدی اجرا شود، نه بهصورت درونخطی.

---

## امنیت

### مدل تهدید

| تهدید                             | راهکار کاهش خطر                                                           |
| --------------------------------- | ------------------------------------------------------------------------- |
| افزایش مصنوعی امتیاز              | محاسبه XP فقط در سمت سرور؛ کلاینتها کنشها را ارسال میکنند، نه امتیازها را |
| حملات بازپخش                      | کلیدهای همتوانی برای انتقالها؛ حذف موارد تکراری از گزارش ممیزی            |
| تقلب در انتقال                    | دفترکل دوطرفه؛ تراکنشهای اتمیک؛ محدودیت نرخ                               |
| خودمعرفی                          | تطبیق متقابل `api_key_id` هنگام بازخرید                                   |
| دستکاری جدول رتبهبندی             | تشخیص ناهنجاری با امتیاز Z؛ داشبورد مدیریتی ناهنجاریها                    |
| سرقت توکن فدراسیون                | ذخیرهسازی هششده با SHA-256؛ توکن خام فقط یک بار نمایش داده میشود          |
| حمله جستوجوی فراگیر به کدهای دعوت | محدودیت نرخ در نقطه پایانی بازخرید؛ آنتروپی ۸ کاراکتری                    |
| XSS در نامهای نمایشی              | پاکسازی نامهای نمایشی؛ گریزدهی ورودیهای جدول رتبهبندی                     |
| حملات زمانبندی روی هشها           | استفاده از `crypto.timingSafeEqual` برای مقایسه هش توکن                   |

### الزامات احراز هویت

- **عمومی** (بدون احراز هویت): `GET /leaderboard`، `GET /stream` (جدولهای
  رتبهبندی فقطخواندنی).
- **نیازمند کلید API**: همه عملیات نوشتن، پروفایل، انتقالها و دعوتها.
- **فقط مدیر**: داشبورد ناهنجاریها، نمایشگر گزارش ممیزی.
- **فدراسیون**: مسیر احراز هویت جداگانه با استفاده از توکن خام در هدر
  `Authorization` که در برابر هش SHA-256 ذخیرهشده اعتبارسنجی میشود.

---

## آزمایش

### فایلهای آزمایش

همه آزمایشها از اجراکننده بومی آزمایش Node.js استفاده میکنند (`node --import tsx/esm --test`).

| فایل آزمایش                                   | موارد تحت پوشش                   | تعداد آزمایشها |
| --------------------------------------------- | -------------------------------- | -------------- |
| `tests/unit/gamification/xp.test.ts`          | محاسبه XP، منحنی سطح، عنوانها    | 8              |
| `tests/unit/gamification/badges.test.ts`      | تطبیق معیارهای نشان، اعطای نشان  | 10             |
| `tests/unit/gamification/streaks.test.ts`     | منطق تداوم، نقاط عطف، موارد مرزی | 7              |
| `tests/unit/gamification/leaderboard.test.ts` | محاسبه رتبه، صفحهبندی، چرخش      | 8              |
| `tests/unit/gamification/sharing.test.ts`     | انتقالها، موجودی، همتوانی        | 9              |
| `tests/unit/gamification/invites.test.ts`     | ایجاد، بازخرید، انقضا، خودمعرفی  | 7              |
| `tests/unit/gamification/antiCheat.test.ts`   | محدودیت نرخ، امتیاز Z، ثبت ممیزی | 6              |
| `tests/unit/gamification/events.test.ts`      | انتشار رویداد، توزیع، مدیریت خطا | 5              |

### اجرای آزمایشها

```bash
# همه آزمایشهای بازیوارسازی
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# یک فایل آزمایش
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### الزامات پوشش

طبق `CONTRIBUTING.md`، همه ماژولهای جدید باید شرایط زیر را داشته باشند:

- پوشش شاخهها >= 80%.
- هر تابع عمومی حداقل یک بار آزمایش شود.
- مسیرهای خطا آزمایش شوند (موجودی ناکافی، کدهای منقضیشده، محدودیتهای نرخ).

---

## ساختار فایلها

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # هر ۸ جدول + ایندکسها
      gamification.ts                  # ماژول CRUD دامنه
    gamification/
      xp.ts                           # محاسبه XP، منحنی سطح و عناوین
      badges.ts                       # تعاریف نشانها، معیارها و ارزیابی
      streaks.ts                      # ردیابی زنجیره روزانه
      leaderboard.ts                  # محاسبه رتبه، SSE و چرخش
      antiCheat.ts                    # محدودسازی نرخ، z-score و ممیزی
      sharing.ts                      # دفترکل انتقال توکن
      invites.ts                      # کدهای دعوت/بازخرید
      servers.ts                      # فدراسیون سرورهای جامعه
      events.ts                       # منتشرکننده رویداد (نقطه یکپارچهسازی)
      notifications.ts                # جریان اعلانهای SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST جدول امتیازات
        leaderboard/stream/route.ts   # بهروزرسانیهای بلادرنگ SSE
        transfer/route.ts             # انتقالهای GET/POST
        invite/route.ts               # کدهای دعوت GET/POST/DELETE
        invite/redeem/route.ts        # بازخرید کد با POST
        servers/route.ts              # سرورهای GET/POST/DELETE
        federation/score/route.ts     # ارسال امتیاز با POST
        federation/leaderboard/route.ts # دریافت جدول امتیازات با GET
        notifications/route.ts        # اعلانهای SSE
        anomalies/route.ts            # دریافت گزارشهای ناهنجاری با GET
        rotate/route.ts               # چرخش اسرار با POST
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # صفحه رتبهبندیها
        profile/page.tsx               # صفحه XP/نشانها/زنجیرهها
        tokens/page.tsx                # صفحه موجودی/انتقالها/دعوتها
        gamification/admin/page.tsx    # پایش مدیریتی ناهنجاریها
  shared/
    constants/
      gamification.ts                  # XP_REWARDS، TITLES، BADGE_DEFS، LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # این سند
```

---

## راهبرد مهاجرت

### فاز ۱: هسته بکاند (PR 1)

- مهاجرت `060_create_gamification.sql` (۸ جدول).
- `src/lib/db/gamification.ts` (ماژول دامنه).
- `src/lib/gamification/xp.ts`، `streaks.ts`، `events.ts`.
- نقطه یکپارچهسازی در `chatCore.ts`.
- تستهای واحد برای XP، زنجیرهها و رویدادها.

### فاز ۲: نشانها و جدول امتیازات (PR 2)

- `src/lib/gamification/badges.ts`، `leaderboard.ts`.
- تعاریف نشانها در ثابتها.
- مسیرهای API جدول امتیازات + جریان SSE.
- تستهای واحد برای نشانها و جدول امتیازات.

### فاز ۳: اشتراکگذاری و دعوتها (PR 3)

- `src/lib/gamification/sharing.ts`، `invites.ts`، `antiCheat.ts`.
- مسیرهای API انتقال و دعوت.
- تستهای واحد برای اشتراکگذاری، دعوتها و مقابله با تقلب.

### فاز ۴: فدراسیون و داشبورد (PR 4)

- `src/lib/gamification/servers.ts`، `notifications.ts`.
- مسیرهای API فدراسیون.
- صفحات داشبورد (جدول امتیازات، پروفایل، توکنها و مدیریت).
- ثبت ابزارهای MCP.

---

## ملاحظات آینده

- **رویدادهای فصلی**: مجموعه نشانهای زماندار و فصلهای جدول رتبهبندی.
- **جدولهای رتبهبندی تیمی**: گروهبندی کاربران بر اساس سازمان یا کمبو.
- **ضرایب XP**: افزایش XP در دورههای تبلیغاتی.
- **اشتراکگذاری دستاوردها**: تولید کارتهای نشان قابلاشتراکگذاری (تصاویر OpenGraph).
- **اعلانهای پوش موبایل**: اعلانهای مبتنی بر webhook برای رویدادهای نشان/سطح.
- **API جدول رتبهبندی**: API عمومی برای یکپارچهسازیهای شخص ثالث.
