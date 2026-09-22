# Gamification & Leaderboard System (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **مستند ماخذ:** `src/lib/gamification/`، `src/lib/db/gamification.ts`، `src/app/api/gamification/`
> **آخری بار اپ ڈیٹ کیا گیا:** 2026-06-28 — v3.8.40

OmniRoute میں ایک مقامی-ترجیحی گیمیفیکیشن تہہ شامل ہے جو پلیٹ فارم کے ساتھ
تعامل کرنے پر صارفین کو انعام دیتی ہے — جیسے درخواستیں کرنا، فراہم کنندگان تبدیل کرنا،
کومبوز بنانا، ٹوکنز شیئر کرنا، اور کمیونٹی میں تعاون کرنا۔ تمام حالت
SQLite میں محفوظ ہوتی ہے؛ کمیونٹی سرورز کے ساتھ فیڈریشن اختیاری اور پُش پر مبنی ہے۔

یہ نظام **اہم عمل کے دوران صفر تاخیر** کے لیے ڈیزائن کیا گیا ہے — گیمیفیکیشن
ایونٹس درخواست پائپ لائن سے فائر-اینڈ-فورگیٹ انداز میں بھیجے جاتے ہیں اور
کبھی بھی LLM کے جواب کو مسدود نہیں کرتے۔

---

## جائزہ

### مقصد

نمایاں پیش رفت (XP، لیولز، بیجز)، سماجی توثیق (لیڈر بورڈز)، اور اقتصادی
ترغیبات (ٹوکن شیئرنگ، دعوتی انعامات) فراہم کر کے صارفین کی شمولیت اور برقرار رہنے کی شرح بڑھانا۔

### دائرۂ کار

| خصوصیت                | وضاحت                                                              |
| --------------------- | ------------------------------------------------------------------ |
| XP اور لیولز          | ہر عمل پر XP حاصل کریں؛ کثیر رقمی منحنی کے مطابق لیول بڑھائیں      |
| بیجز                  | 4 نایابی درجات کے ساتھ 5 زمروں میں 20+ کامیابیاں                   |
| تسلسل                 | موجودہ/طویل ترین تسلسل کے ساتھ روزانہ فعال استعمال کی ٹریکنگ       |
| لیڈر بورڈز            | عالمی، ہفتہ وار، ماہانہ، ٹوکن شیئرنگ، اور تعاون کے دائرے           |
| ٹوکن شیئرنگ           | دوہرے اندراج والے لیجر کے ذریعے صارفین کے درمیان کریڈٹس منتقل کریں |
| دعوت اور استعمال      | SHA-256 ہیش شدہ اسٹوریج کے ساتھ ریفرل کوڈز                         |
| کمیونٹی سرورز         | بیرونی OmniRoute انسٹینسز کے ساتھ فیڈریٹ کریں                      |
| دھوکا دہی کی روک تھام | سرور-سائیڈ اسکورنگ، شرح کی حد بندی، z-score بے قاعدگی کی شناخت     |

### ڈیزائن کے اصول

1. **مقامی-ترجیحی** — تمام حالت SQLite میں، کسی بیرونی سروس کی ضرورت نہیں۔
2. **غیر مسدود** — ایونٹس فائر-اینڈ-فورگیٹ ہوتے ہیں؛ LLM کے جواب کا راستہ
   گیمیفیکیشن منطق کی وجہ سے کبھی تاخیر کا شکار نہیں ہوتا۔
3. **سرور بااختیار** — XP صرف سرور-سائیڈ پر شمار ہوتا ہے؛ کلائنٹس
   اسکورز میں مصنوعی اضافہ نہیں کر سکتے۔
4. **رازداری کا احترام** — لیڈر بورڈ میں شرکت اختیاری ہے؛ صارفین
   اپنی پروفائل چھپا سکتے ہیں۔
5. **فیڈریشن کے لیے تیار** — کمیونٹی سرورز دستخط شدہ API کے ذریعے اسکورز پُش کر سکتے ہیں؛
   ہم وقت سازی جمع کرنے کے بجائے اوور رائٹ کرتی ہے۔

---

## معماری

### اعلیٰ سطحی بہاؤ

```
کلائنٹ کی درخواست
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (موجودہ پائپ لائن) ...
      → اپ اسٹریم جواب کلائنٹ کو بھیجا گیا
      → setImmediate (فائر-اینڈ-فورگیٹ):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

ایونٹ ایمیٹر واحد انضمامی نقطہ ہے۔ جواب بھیجے جانے کے بعد `chatCore.ts`
`emitGamificationEvent()` کو کال کرتا ہے؛ ایونٹ ماڈیول XP، تسلسل، بیج،
لیڈر بورڈ، اور دھوکا دہی کی روک تھام کے ذیلی نظاموں تک اسے تقسیم کرتا ہے۔

### ماڈیول انحصاری گراف

```
src/lib/gamification/
  events.ts          ← نقطۂ آغاز (chatCore.ts سے کال کیا جاتا ہے)
    ├── xp.ts        ← XP کا حساب اور لیول کا تعین
    ├── streaks.ts   ← روزانہ فعال تسلسل کی ٹریکنگ
    ├── badges.ts    ← بیج کے معیار کی جانچ
    ├── leaderboard.ts ← رینک کا حساب اور SSE نشریات
    ├── antiCheat.ts ← شرح کی حد بندی اور بے قاعدگی کی شناخت
    ├── sharing.ts   ← ٹوکن منتقلی کا لیجر
    ├── invites.ts   ← دعوتی/استعمالی کوڈ کا انتظام
    ├── servers.ts   ← کمیونٹی سرور فیڈریشن
    └── notifications.ts ← SSE اطلاعاتی سلسلہ

src/lib/db/
  gamification.ts    ← تمام CRUD کارروائیاں (8 ٹیبلز)

src/app/api/gamification/
  leaderboard/       ← GET درجہ بندیاں، POST دستی تازہ کاری
  leaderboard/stream ← SSE حقیقی وقت کی اپ ڈیٹس
  transfer/          ← GET تاریخ، POST ٹوکنز بھیجیں
  invite/            ← GET/POST کوڈز، DELETE منسوخ کریں
  invite/redeem/     ← POST ایک کوڈ استعمال کریں
  servers/           ← GET/POST/DELETE کمیونٹی سرورز
  federation/score/  ← POST اسکور سرور پر پُش کریں
  federation/leaderboard/ ← GET سرور سے لیڈر بورڈ حاصل کریں
  notifications/     ← SSE بیج/لیول بڑھنے کی اطلاعات
  anomalies/         ← GET بے قاعدگی کی رپورٹس (ایڈمن)
  rotate/            ← POST دعوتی ٹوکن کے راز تبدیل کریں
```

---

## ڈیٹا لیئر

### ڈیٹابیس ٹیبلز

تمام ٹیبلز مرکزی OmniRoute SQLite ڈیٹابیس میں موجود ہیں، جسے مائیگریشن
`060_create_gamification.sql` تخلیق کرتی ہے۔ WAL جرنلنگ، `src/lib/db/core.ts`
میں موجود سنگلٹن `getDbInstance()` سے وراثت میں ملتی ہے۔

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

### ڈومین ماڈیول: `src/lib/db/gamification.ts`

یہ معیاری OmniRoute پیٹرن کی پیروی کرتا ہے — `core.ts` سے
`getDbInstance()` درآمد کرتا ہے اور ٹائپ شدہ CRUD فنکشنز برآمد کرتا ہے۔ روٹ ہینڈلرز میں کوئی خام SQL موجود نہیں ہے۔

اہم فنکشنز:

| فنکشن                      | تفصیل                                                        |
| -------------------------- | ------------------------------------------------------------ |
| `upsertLeaderboardEntry()` | (api_key_id, scope, period) کے لیے اسکور داخل یا اپ ڈیٹ کریں |
| `getLeaderboard()`         | دیے گئے scope/period کے لیے صفحات میں تقسیم شدہ درجہ بندیاں  |
| `getUserLevel()`           | صارف کا لیول ریکارڈ حاصل یا تخلیق کریں                       |
| `updateUserLevel()`        | XP، لیول اور ٹائٹل کو ایٹمی طور پر سیٹ کریں                  |
| `getBadgeDefinitions()`    | بیجز کی تمام تعریفیں (اختیاری فلٹرنگ کے ساتھ)                |
| `getUserBadges()`          | صارف کے حاصل کردہ بیجز                                       |
| `awardBadge()`             | بیج کا حصول داخل کریں (badge_id پر idempotent)               |
| `logXpAction()`            | xp_audit_log میں اندراج شامل کریں                            |
| `getXpAuditLog()`          | صارف کے لیے صفحات میں تقسیم شدہ آڈٹ ہسٹری                    |
| `insertLedgerEntry()`      | ڈبل انٹری منتقلی (ٹرانزیکشن کے اندر)                         |
| `getBalance()`             | صارف کے لیے موصول شدہ رقم منفی بھیجی گئی رقم کا مجموعہ       |
| `getTransferHistory()`     | صفحات میں تقسیم شدہ منتقلی لاگ                               |
| `createInviteToken()`      | دعوتی کوڈ + ہیش شدہ ٹوکن داخل کریں                           |
| `redeemInviteToken()`      | کوڈ کے ذریعے تلاش کریں، توثیق کریں اور استعمالات بڑھائیں     |
| `upsertCommunityServer()`  | فیڈریشن سرور رجسٹر یا اپ ڈیٹ کریں                            |
| `getCommunityServers()`    | صارف کے سرورز کی فہرست حاصل کریں                             |
| `deleteCommunityServer()`  | سرور کی رجسٹریشن ہٹائیں                                      |

---

## XP / لیول سسٹم

**فائل:** `src/lib/gamification/xp.ts`

### لیول کا منحنی خط

لیول `n` تک پہنچنے کے لیے درکار XP درج ذیل کثیر رقمی منحنی خط کی پیروی کرتا ہے:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| لیول | اگلے لیول کے لیے XP | مجموعی XP | خطاب   |
| ---- | ------------------- | --------- | ------ |
| 1    | 100                 | 100       | مبتدی  |
| 5    | 1,118               | 2,415     | مبتدی  |
| 10   | 3,162               | 10,523    | متلاشی |
| 25   | 12,500              | 86,024    | متلاشی |
| 50   | 35,355              | 345,529   | ماہر   |
| 75   | 64,952              | 948,683   | استاد  |
| 100  | 100,000             | 2,050,000 | لیجنڈ  |

### خطابات

| لیول کی حد | خطاب   |
| ---------- | ------ |
| 1 – 9      | مبتدی  |
| 10 – 24    | متلاشی |
| 25 – 49    | ماہر   |
| 50 – 74    | استاد  |
| 75 – 100   | لیجنڈ  |

### XP انعامات

| عمل               | XP  | وضاحت                                                      |
| ----------------- | --- | ---------------------------------------------------------- |
| `request`         | 1   | OmniRoute کے ذریعے بھیجی جانے والی ہر API درخواست پر       |
| `provider_switch` | 5   | کسی مختلف فراہم کنندہ پر منتقل ہونے پر                     |
| `model_switch`    | 3   | کسی مختلف ماڈل پر منتقل ہونے پر                            |
| `combo_create`    | 10  | نیا کومبو بنانے پر                                         |
| `combo_use`       | 2   | کسی درخواست کے لیے کومبو استعمال کرنے پر                   |
| `token_share`     | 1   | کسی دوسرے صارف کے ساتھ اشتراک کردہ ہر 1 000 ٹوکنز پر       |
| `invite_redeem`   | 50  | دعوتی کوڈ استعمال کرنے پر                                  |
| `daily_login`     | 5   | روزانہ فعال استعمال (دن میں ایک بار)                       |
| `streak_bonus`    | 2   | مسلسل سلسلے کے ہر دن پر (سلسلے کی طوالت سے ضرب دی جاتی ہے) |
| `badge_unlock`    | 10  | بیج اَن لاک کرنے پر                                        |

### انعام دینے کا بہاؤ

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. XP کی مقدار حاصل کرنے کے لیے `XP_REWARDS[action]` تلاش کریں۔
2. اسے `checkRateLimit()` سے گزاریں (دھوکا دہی سے تحفظ: فی کلید زیادہ سے زیادہ 1000 XP/منٹ)۔
3. ایک ٹرانزیکشن کھولیں:
   - موجودہ `user_levels` قطار پڑھیں۔
   - XP شامل کریں؛ `levelFromXp(totalXp)` کے ذریعے لیول کا دوبارہ حساب لگائیں۔
   - اگر لیول تبدیل ہو گیا ہو تو `levelUp = true` مقرر کریں۔
   - `user_levels` قطار اپ ڈیٹ کریں۔
   - `xp_audit_log` میں اندراج کریں۔
4. نتیجہ واپس کریں۔ کالر اطلاعات کا انتظام کرتا ہے۔

### معاون: `levelFromXp(totalXp)`

یہ لیول 1..100 تک اعادہ کرتا ہے اور `xp_for_level(n)` کو جمع کرتا رہتا ہے، یہاں تک کہ مجموعی XP
`totalXp` سے بڑھ جائے۔ یہ وہ بلند ترین لیول واپس کرتا ہے جس کی حد پوری ہو چکی ہو۔
یہ O(100) ہے — قابل قبول، کیونکہ لیولز کی زیادہ سے زیادہ حد 100 ہے۔

---

## بیج سسٹم

**فائل:** `src/lib/gamification/badges.ts`

### زمرے

| زمرہ           | وضاحت                                    | مثالی بیجز                              |
| -------------- | ---------------------------------------- | --------------------------------------- |
| `usage`        | حجم پر مبنی سنگ میل                      | پہلی درخواست، 1K درخواستیں، 100K        |
| `sharing`      | ٹوکنز کا اشتراک اور حوالہ جات            | پہلا اشتراک، فیاض (10 اشتراک)           |
| `contribution` | کمیونٹی میں شرکت                         | کومبو تخلیق کار، فراہم کنندہ متلاشی     |
| `streak`       | وقت کے ساتھ تسلسل                        | ہفتہ وار جنگجو، ماہانہ ثابت قدم         |
| `rare`         | مشکل سے حاصل ہونے والی یا مخفی کامیابیاں | ابتدائی اپنانے والا، بگ رپورٹ کرنے والا |

### نایابی کی سطحیں

| نایابی      | رنگ   | امکان کا اشارہ  |
| ----------- | ----- | --------------- |
| `common`    | سرمئی | زیادہ تر صارفین |
| `uncommon`  | سبز   | فعال صارفین     |
| `rare`      | نیلا  | پُرعزم صارفین   |
| `legendary` | سنہری | سرفہرست 1%      |

### معیار کی اقسام

| قسم            | فیلڈ         | وضاحت                                              |
| -------------- | ------------ | -------------------------------------------------- |
| `action_count` | `count`      | عمل کو N بار انجام دیں (مثلاً، 1000 درخواستیں)     |
| `streak`       | `days`       | مسلسل N دنوں تک سلسلہ برقرار رکھیں                 |
| `unique_count` | `field`, `n` | N منفرد اقدار استعمال کریں (مثلاً، 10 مختلف ماڈلز) |
| `rank`         | `scope`, `n` | لیڈر بورڈ کے دائرۂ کار میں N رینک حاصل کریں        |
| `first`        | —            | کوئی عمل انجام دینے والے پہلے شخص بنیں             |
| `hidden`       | (مختلف)      | حاصل ہونے تک معیار نہیں دکھائے جاتے                |

بیج کی تعریفیں `badge_definitions` میں JSON `criteria` کے طور پر محفوظ ہوتی ہیں:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### جانچ کا بہاؤ

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # تمام تعریفیں
    → getUserBadges(apiKeyId)         # پہلے سے حاصل شدہ (نظر انداز کریں)
    → ہر غیر حاصل شدہ بیج کے لیے:
       → matchesCriteria(badge, event, userState)
       → اگر مطابقت ہو: awardBadge(apiKeyId, badgeId)
         → اطلاع کا پے لوڈ واپس کریں
```

جانچ **ایونٹ پر مبنی** ہے — یہ ہر گیمیفیکیشن ایونٹ کے بعد چلتی ہے، لیکن
صرف ان بیجز کی جانچ کرتی ہے جن کا `criteria.type` ایونٹ کے عمل سے مطابقت رکھتا ہو۔ اس سے
جانچ تیز رہتی ہے (زیادہ تر ایونٹس کے لیے < 5ms)۔

### `matchesCriteria(badge, event, userState)`

| معیار کی قسم   | جانچ                                                            |
| -------------- | --------------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                     |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                            |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                          |
| `rank`         | `getRank(apiKeyId, scope) <= n`                                 |
| `first`        | اس عمل کی قسم کے لیے `xp_audit_log` میں کوئی سابقہ اندراج نہ ہو |
| `hidden`       | مناسب ذیلی جانچ کو تفویض کرتا ہے                                |

### پہلے سے شامل بیجز (20+)

<details>
<summary>بیجز کی مکمل فہرست</summary>

| بیج                    | زمرہ    | نایابی     | معیار                                |
| ---------------------- | ------- | ---------- | ------------------------------------ |
| پہلا قدم               | استعمال | عام        | 1 درخواست                            |
| رفتار پکڑنا            | استعمال | عام        | 100 درخواستیں                        |
| پاور صارف              | استعمال | غیر معمولی | 1,000 درخواستیں                      |
| سینچورین               | استعمال | نایاب      | 10,000 درخواستیں                     |
| اومنی پاور             | استعمال | افسانوی    | 100,000 درخواستیں                    |
| فراہم کنندہ بدلنے والا | شراکت   | عام        | 5 مختلف فراہم کنندگان استعمال کریں   |
| فراہم کنندگان کا ماہر  | شراکت   | غیر معمولی | 20 مختلف فراہم کنندگان استعمال کریں  |
| کومبو آرکیٹیکٹ         | شراکت   | غیر معمولی | 5 کومبو بنائیں                       |
| کومبو گرینڈ ماسٹر      | شراکت   | نایاب      | 25 کومبو بنائیں                      |
| پہلی منتقلی            | اشتراک  | عام        | 1 ٹوکن کی منتقلی                     |
| سخی                    | اشتراک  | غیر معمولی | 10 ٹوکن کی منتقلیاں                  |
| انسان دوست             | اشتراک  | نایاب      | مجموعی طور پر 10,000 ٹوکن منتقل کریں |
| حوالہ دہندہ            | اشتراک  | عام        | 1 کامیاب حوالہ                       |
| نیٹ ورک بنانے والا     | اشتراک  | غیر معمولی | 10 کامیاب حوالے                      |
| ہفتہ وار جنگجو         | تسلسل   | غیر معمولی | 7 دن کا تسلسل                        |
| ماہانہ ثابت قدم        | تسلسل   | نایاب      | 30 دن کا تسلسل                       |
| ناقابلِ توقف           | تسلسل   | افسانوی    | 365 دن کا تسلسل                      |
| ابتدائی اپنانے والا    | نایاب   | افسانوی    | بیٹا مدت کے دوران شامل ہوں           |
| کمپریشن کا بانی        | نایاب   | غیر معمولی | کمپریشن 100 بار استعمال کریں         |
| مہارتیں جمع کرنے والا  | نایاب   | نایاب      | 10 مختلف مہارتیں استعمال کریں        |
| ماڈل ایکسپلورر         | شراکت   | غیر معمولی | 15 مختلف ماڈلز استعمال کریں          |

</details>

---

## اسٹریک ٹریکر

**فائل:** `src/lib/gamification/streaks.ts`

### ڈیٹا ماڈل

اسٹریکس کو `key_value` ٹیبل (مشترکہ یوٹیلٹی ٹیبل) میں نیم اسپیس شدہ کلیدوں کے تحت
محفوظ کیا جاتا ہے:

| کلید                          | قدر                              | وضاحت               |
| ----------------------------- | -------------------------------- | ------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | فعال اسٹریک کا ڈیٹا |

### منطق

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. `key_value` سے اسٹریک ریکارڈ پڑھیں۔
2. `{current}`، `{longest}`، `{lastDate}` (ISO تاریخ کی اسٹرنگ) کو پارس کریں۔
3. اگر `lastDate === today` ہو — کوئی تبدیلی نہیں (آج پہلے ہی شمار ہو چکا ہے)۔
4. اگر `lastDate === yesterday` ہو — `current` میں اضافہ کریں؛ ضرورت پڑنے پر `longest` کو اپ ڈیٹ کریں۔
5. اگر `lastDate < yesterday` ہو — `current = 1` پر ری سیٹ کریں (اسٹریک ٹوٹ گئی)۔
6. اپ ڈیٹ شدہ ریکارڈ لکھیں۔
7. سنگِ میل چیک کریں: 7، 14، 30، 60، 90، 180، 365 دن۔ اگر کوئی سنگِ میل عبور ہو تو
   `milestone = true` سیٹ کریں (کالر XP دیتا ہے اور بیجز چیک کرتا ہے)۔

### خصوصی صورتیں

- **ٹائم زون**: اسٹریکس UTC تاریخیں استعمال کرتی ہیں (`new Date().toISOString().slice(0, 10)`)۔
  یہ دانستہ ہے — ایک واحد معیاری ٹائم زون، ٹائم زون تبدیل کر کے ناجائز فائدہ اٹھانے سے روکتا ہے۔
- **نئے صارفین**: کوئی اسٹریک ریکارڈ موجود نہیں ہوتا؛ پہلی درخواست اسے
  `current=1, longest=1, lastDate=today` کے ساتھ بناتی ہے۔
- **روزانہ متعدد درخواستیں**: UTC دن کی صرف پہلی درخواست
  اسٹریک میں اضافہ کرتی ہے۔

---

## لیڈربورڈ

**فائل:** `src/lib/gamification/leaderboard.ts`

### دائرۂ کار

| دائرۂ کار       | مدت     | وضاحت                                                         |
| --------------- | ------- | ------------------------------------------------------------- |
| `global`        | `all`   | تمام ادوار کا مجموعی XP                                       |
| `weekly`        | `week`  | موجودہ UTC ہفتے (پیر تا اتوار) میں حاصل کردہ XP               |
| `monthly`       | `month` | موجودہ UTC مہینے میں حاصل کردہ XP                             |
| `tokens_shared` | `all`   | دوسروں کو منتقل کیے گئے ٹوکنز کی کل تعداد                     |
| `contributions` | `all`   | بنائے گئے کومبوز + استعمال شدہ پرووائیڈرز + استعمال شدہ اسکلز |

### رینک کا حساب

رینکس کو محفوظ کرنے کے بجائے **پڑھنے کے وقت شمار کیا جاتا ہے**۔ اس سے فرسودہ رینک ڈیٹا سے بچا جاتا ہے
اور وقتاً فوقتاً رینک دوبارہ شمار کرنے والی جابز کی ضرورت ختم ہو جاتی ہے۔

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

کوئری کا نمونہ:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### مدت کی تبدیلی

ہفتہ وار اور ماہانہ لیڈربورڈز خودکار طور پر تبدیل ہوتے ہیں:

1. **آرکائیو**: مدت کی حد پر، موجودہ اندراجات کو مدت کے لیبل کے ساتھ
   `leaderboard_archive` میں کاپی کریں۔
2. **ری سیٹ**: ختم شدہ مدت کے اندراجات حذف کریں۔
3. **ٹرگر**: ہر `updateLeaderboard()` کال پر چیک کیا جاتا ہے؛ نئی مدت کی پہلی درخواست
   تبدیلی کو ٹرگر کرتی ہے۔

اس سے یقینی ہوتا ہے کہ ہفتہ وار بورڈز ہر پیر 00:00 UTC پر ری سیٹ ہوں اور ماہانہ بورڈز
ہر مہینے کی پہلی تاریخ کو ری سیٹ ہوں۔

### SSE ریئل ٹائم اپ ڈیٹس

**اینڈ پوائنٹ:** `GET /api/gamification/stream`

```
کلائنٹ → GET /api/gamification/stream
  → SSE کنکشن قائم ہو گیا
  → سرور فوراً ٹاپ 10 لیڈربورڈ کا اسنیپ شاٹ بھیجتا ہے
  → ہر 5 سیکنڈ بعد: تبدیلی ہونے پر اپ ڈیٹ شدہ ٹاپ 10 بھیجیں
  → ہر 15 سیکنڈ بعد: ہارٹ بیٹ تبصرہ (": heartbeat\n\n")
  → کلائنٹ منقطع ہوتا ہے → صفائی (لسنر ہٹائیں)
```

ایونٹ کی فارمیٹ:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE مینیجر ہر دائرۂ کار کے لیے منسلک کلائنٹس کو ٹریک کرتا ہے اور صرف اسی وقت اپ ڈیٹس
بھیجتا ہے جب آخری بار بھیجنے کے بعد لیڈربورڈ کا ڈیٹا واقعی تبدیل ہوا ہو۔

---

## ٹوکن شیئرنگ

**فائل:** `src/lib/gamification/sharing.ts`

### دوہری اندراج والی لیجر

ہر منتقلی `token_ledger` میں دو قطاریں بناتی ہے:

| قطار  | `from_key_id` | `to_key_id` | `amount` |
| ----- | ------------- | ----------- | -------- |
| ڈیبٹ  | بھیجنے والا   | وصول کنندہ  | +amount  |
| کریڈٹ | وصول کنندہ    | بھیجنے والا | -amount  |

رکیے — طریقۂ کار یہ ہے:

| قطار      | `from_key_id` | `to_key_id` | `amount` | مفہوم                 |
| --------- | ------------- | ----------- | -------- | --------------------- |
| بھیجنا    | بھیجنے والا   | وصول کنندہ  | +amount  | بھیجنے والے سے اخراج  |
| وصول کرنا | وصول کنندہ    | بھیجنے والا | +amount  | وصول کنندہ کے لیے آمد |

بیلنس کا حساب اس طرح کیا جاتا ہے:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### منتقلی کا عمل

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **توثیق**: `amount > 0`، `fromKeyId !== toKeyId`۔
2. **آئیڈیمپوٹینسی**: جانچیں کہ آیا `idempotency_key` پہلے سے لیجر میں موجود ہے۔
   اگر ہاں، تو کیش شدہ نتیجہ واپس کریں۔
3. **ٹرانزیکشن** (ایک SQLite ٹرانزیکشن):
   a. بھیجنے والے کا بیلنس شمار کریں۔
   b. اگر `balance < amount` ہو، تو منسوخ کریں (ناکافی فنڈز)۔
   c. بھیجنے کی قطار داخل کریں (`from=sender,` واپس کریں۔

### شرح کی تحدید

- فی API کلید فی منٹ زیادہ سے زیادہ 10 منتقلیاں۔
- ایک منتقلی میں زیادہ سے زیادہ 10,000 ٹوکن۔
- فی API کلید فی دن زیادہ سے زیادہ 100,000 منتقل شدہ ٹوکن۔

---

## ٹوکنز مدعو اور ریڈیم کرنا

**فائل:** `src/lib/gamification/invites.ts`

### کوڈ کی شکل

- **کوڈ**: 8 حروف پر مشتمل الفانی عددی کوڈ (مثلاً `A3K9-X7M2`)، انسانوں کے لیے قابلِ مطالعہ،
  جو صارف کو دکھایا جاتا ہے۔
- **ٹوکن**: 32 بائٹ کا بے ترتیب ٹوکن، جو SHA-256 ہیش کی صورت میں محفوظ ہوتا ہے۔ اسے
  پروگرامی طور پر ریڈیم کرنے کے لیے استعمال کیا جاتا ہے (مثلاً URL لنکس)۔

### ذخیرہ

| کالم         | قدر                            |
| ------------ | ------------------------------ |
| `code`       | `A3K9X7M2` (منفرد، اشاریہ شدہ) |
| `token_hash` | SHA-256(raw_token)             |

خام ٹوکن تخلیق کے وقت صرف ایک بار صارف کو واپس کیا جاتا ہے۔ OmniRoute
اسے دوبارہ کبھی محفوظ یا ظاہر نہیں کرتا — صرف ہیش برقرار رہتا ہے۔

### خود حوالگی کی روک تھام

جب کوئی صارف کوڈ ریڈیم کرتا ہے، تو سسٹم جانچتا ہے:

1. کوڈ کسی مختلف `api_key_id` سے تعلق رکھتا ہو۔
2. ریڈیم کرنے والے صارف نے پہلے اسی
   حوالہ دینے والے کا کوئی کوڈ ریڈیم نہ کیا ہو (`invite_tokens` اور ریڈیمپشن لاگ پر جوائن کیا جاتا ہے)۔

اگر ان میں سے کوئی بھی جانچ ناکام ہو جائے، تو واضح خرابی کے پیغام کے ساتھ ریڈیمپشن مسترد کر دی جاتی ہے۔

### میعاد اور حدود

- ڈیفالٹ `max_uses`: 10 (تخلیق کے وقت قابلِ ترتیب)۔
- ڈیفالٹ `expires_at`: تخلیق سے 30 دن بعد۔
- میعاد ختم یا استعمال کی حد پوری کر چکے کوڈز HTTP 410 Gone واپس کرتے ہیں۔

---

## کمیونٹی سرور فیڈریشن

**فائل:** `src/lib/gamification/servers.ts`

### کنکشن

ایک کمیونٹی سرور ریموٹ سرور کی جانب سے جاری کردہ دعوتی ٹوکن کے ذریعے رجسٹر کیا جاتا ہے۔ مقامی انسٹینس:

1. دعوتی ٹوکن وصول کرتا ہے (مثلاً، ڈیش بورڈ میں پیسٹ کیا گیا)۔
2. ٹوکن کی توثیق اور موجودہ لیڈر بورڈ حاصل کرنے کے لیے ریموٹ سرور پر `POST /api/gamification/federation/leaderboard` کو کال کرتا ہے۔
3. سرور ریکارڈ کو `status: connected` کے ساتھ محفوظ کرتا ہے۔

### سنک ماڈل

فیڈریشن اضافی سنک کے بجائے **اوور رائٹ سنک** استعمال کرتی ہے:

```
مقامی انسٹینس                  کمیونٹی سرور
     │                              │
     ├── اسکور پُش کریں ───────────►│  POST /federation/score
     │   { api_key_id, score }      │  (سرور ٹوکن ہیش کی توثیق کرتا ہے)
     │                              │
     ├── لیڈر بورڈ پُل کریں ───────►│  GET /federation/leaderboard
     │◄── سرفہرست-N اندراجات ──────┤  (مقامی کیش کو اوور رائٹ کرتا ہے)
     │                              │
     └── صحت کی جانچ ──────────────►│  GET /federation/health
         (ہر 60s بعد، ٹائم آؤٹ 5s)  │
```

### توثیق

فیڈریشن کی درخواستوں میں یہ شامل ہوتا ہے:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

ریموٹ سرور ٹوکن کو ہیش کرتا ہے اور مماثل `community_servers` قطار تلاش کرتا ہے۔ اس طرح محفوظ کردہ ہیش کو منتقل کرنے سے گریز ہوتا ہے۔

### صحت کی نگرانی

ہر سرور ریکارڈ درج ذیل معلومات ٹریک کرتا ہے:

| فیلڈ        | وضاحت                                  |
| ----------- | -------------------------------------- |
| `status`    | `connected`، `degraded`، `unreachable` |
| `last_sync` | آخری کامیاب سنک کا ISO ٹائم اسٹیمپ     |
| `failures`  | صحت کی جانچ کی مسلسل ناکامیاں          |

مسلسل 5 ناکامیوں کے بعد، اسٹیٹس `unreachable` میں تبدیل ہو جاتا ہے اور سنک اس وقت تک موقوف رہتا ہے جب تک صحت کی دستی جانچ کامیاب نہ ہو جائے۔

---

## دھوکا دہی کی روک تھام

**فائل:** `src/lib/gamification/antiCheat.ts`

### سرور سائیڈ اسکورنگ

تمام XP حسابات `src/lib/gamification/xp.ts` میں انجام پاتے ہیں۔ کلائنٹس کبھی اسکور جمع نہیں کراتے — وہ ایکشنز جمع کراتے ہیں، اور سرور XP کا حساب لگاتا ہے۔ `leaderboard.score` کالم میں صرف سرور سائیڈ کوڈ ہی لکھ سکتا ہے۔

### شرح کی حد بندی

| حد                              | قدر     | دائرۂ کار   |
| ------------------------------- | ------- | ----------- |
| فی منٹ زیادہ سے زیادہ XP        | 1,000   | فی API کلید |
| فی منٹ زیادہ سے زیادہ ٹرانسفرز  | 10      | فی API کلید |
| ٹرانسفر کی زیادہ سے زیادہ مقدار | 10,000  | فی ٹرانسفر  |
| زیادہ سے زیادہ یومیہ ٹرانسفرز   | 100,000 | فی API کلید |

شرح کی حدود اِن میموری سلائیڈنگ ونڈو استعمال کرتی ہیں (`open-sse/services/` میں موجود `RateLimitManager` کے طرز پر)۔ اگر پراسیس دوبارہ شروع ہو جائے تو SQLite کی معاونت یافتہ کاؤنٹرز استعمال کیے جاتے ہیں۔

### Z-Score بے قاعدگی کی شناخت

ہر API کلید کے لیے، سسٹم فی گھنٹہ حاصل کردہ XP کی متحرک 7 روزہ ونڈو برقرار رکھتا ہے۔ ہر XP ایوارڈ پر:

1. صارف کی موجودہ فی گھنٹہ XP شرح کا حساب لگائیں۔
2. مجموعی اوسط اور معیاری انحراف کا حساب لگائیں۔
3. `z = (user_rate - mean) / stddev` کا حساب لگائیں۔
4. اگر `z > 3.0` ہو (3 معیاری انحراف)، تو اسے بے قاعدگی کے طور پر نشان زد کریں۔

بے قاعدگیوں کو `xp_audit_log` میں `action = 'anomaly_detected'` کے ساتھ لاگ کیا جاتا ہے اور ایڈمن ڈیش بورڈ پر دکھایا جاتا ہے۔

### آڈٹ ٹریل

ہر XP ایوارڈ، ٹرانسفر، بیج کے حصول، اور بے قاعدگی کی شناخت کو درج ذیل معلومات کے ساتھ `xp_audit_log` میں لاگ کیا جاتا ہے:

| فیلڈ         | وضاحت                                           |
| ------------ | ----------------------------------------------- |
| `api_key_id` | کون                                             |
| `action`     | کیا ہوا (xp_award، transfer، anomaly، …)        |
| `xp_awarded` | مقدار (غیر XP ایونٹس کے لیے 0)                  |
| `metadata`   | سیاق و سباق کے ساتھ JSON (ایکشن کی قسم، ہدف، …) |
| `created_at` | کب (ISO 8601)                                   |

ایڈمنز `GET /api/gamification/anomalies` کے ذریعے مکمل آڈٹ ٹریل سے استفسار کر سکتے ہیں۔

---

## API روٹس

تمام روٹس معیاری OmniRoute پیٹرن کی پیروی کرتے ہیں:

```
روٹ → CORS پری فلائٹ → باڈی کی توثیق (Zod) → تصدیق (extractApiKey)
  → ہینڈلر
```

### اینڈ پوائنٹس

| طریقہ  | پاتھ                                       | تفصیل                                           | تصدیق   |
| ------ | ------------------------------------------ | ----------------------------------------------- | ------- |
| GET    | `/api/gamification/leaderboard`            | لیڈر بورڈ حاصل کریں (دائرۂ کار، مدت، صفحہ بندی) | اختیاری |
| POST   | `/api/gamification/leaderboard`            | لیڈر بورڈ کیش کو جبراً ریفریش کریں              | درکار   |
| GET    | `/api/gamification/stream`                 | SSE کے ذریعے لیڈر بورڈ کی حقیقی وقت کی اپ ڈیٹس  | اختیاری |
| GET    | `/api/gamification/transfer`               | منتقلی کی تاریخ حاصل کریں (صفحہ بندی)           | درکار   |
| POST   | `/api/gamification/transfer`               | کسی دوسرے صارف کو ٹوکنز بھیجیں                  | درکار   |
| GET    | `/api/gamification/invite`                 | میرے دعوتی کوڈز کی فہرست دکھائیں                | درکار   |
| POST   | `/api/gamification/invite`                 | نیا دعوتی کوڈ بنائیں                            | درکار   |
| DELETE | `/api/gamification/invite`                 | دعوتی کوڈ منسوخ کریں                            | درکار   |
| POST   | `/api/gamification/invite/redeem`          | دعوتی کوڈ استعمال کریں                          | درکار   |
| GET    | `/api/gamification/servers`                | کمیونٹی سرورز کی فہرست دکھائیں                  | درکار   |
| POST   | `/api/gamification/servers`                | کمیونٹی سرور سے منسلک ہوں                       | درکار   |
| DELETE | `/api/gamification/servers`                | کمیونٹی سرور سے رابطہ منقطع کریں                | درکار   |
| POST   | `/api/gamification/federation/score`       | اسکور ریموٹ سرور کو بھیجیں                      | فیڈریشن |
| GET    | `/api/gamification/federation/leaderboard` | ریموٹ سرور سے لیڈر بورڈ حاصل کریں               | فیڈریشن |
| GET    | `/api/gamification/notifications`          | SSE بیج/لیول اپ اطلاعات                         | درکار   |
| GET    | `/api/gamification/anomalies`              | بے قاعدگی کی رپورٹس دیکھیں (ایڈمن)              | ایڈمن   |
| POST   | `/api/gamification/rotate`                 | دعوتی ٹوکن کے راز تبدیل کریں                    | درکار   |

### درخواست/جواب کی مثالیں

**POST /api/gamification/transfer**

```json
// درخواست
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// جواب 200
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

// جواب 400 (ناکافی فنڈز)
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

## MCP ٹولز (8)

موجودہ ٹولز کے ساتھ `open-sse/mcp-server/` میں رجسٹرڈ ہیں۔ یہ
`gamification` اجازت کے دائرۂ کار کے تحت محدود ہیں۔

| ٹول                        | تفصیل                                        | ان پٹ اسکیما                 |           |
| -------------------------- | -------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | کسی دائرۂ کار/مدت کے لیے لیڈر بورڈ حاصل کریں | `{ scope, period?, limit? }` |
| `gamification_rank`        | کال کرنے والے کی رینک اور پڑوسی حاصل کریں    | `{ scope }`                  |
| `gamification_profile`     | XP، لیول، ٹائٹل اور تسلسل کا خلاصہ حاصل کریں | `{}`                         |
| `gamification_badges`      | حاصل کردہ بیجز یا تمام تعریفیں درج کریں      | `{ earned?: boolean }`       |
| `gamification_transfer`    | کسی دوسرے صارف کو ٹوکنز بھیجیں               | `{ to, amount }`             |
| `gamification_invite`      | دعوتی کوڈز بنائیں یا درج کریں                | `{ action: "create"          | "list" }` |
| `gamification_servers`     | کمیونٹی سرورز درج کریں یا ان سے منسلک ہوں    | `{ action, token? }`         |
| `gamification_anomalies`   | بے قاعدگی کی رپورٹس دیکھیں (ایڈمن دائرۂ کار) | `{ limit?, since? }`         |

---

## ڈیش بورڈ کے صفحات

### `/dashboard/leaderboard`

- پوڈیم ڈسپلے (سرفہرست 3 صارفین، اوتارز اور XP کے ساتھ)۔
- دائرۂ کار کا انتخاب کنندہ: عالمی / ہفتہ وار / ماہانہ / شیئر کردہ ٹوکنز / شراکتیں۔
- صفحات میں منقسم جدول (فی صفحہ 25)، جس میں رینک، نام، اسکور، لیول اور ٹائٹل شامل ہیں۔
- SSE ریئل ٹائم اپ ڈیٹس — رینک کی تبدیلیاں متحرک انداز میں ظاہر ہوتی ہیں۔
- موجودہ صارف کو جدول میں "آپ کی رینک" والی چسپاں قطار کے ساتھ نمایاں کیا جاتا ہے۔

### `/dashboard/profile`

- موجودہ لیول اور اگلے لیول کی حد کے ساتھ XP پیش رفت بار۔
- ٹائٹل بیج نمایاں طور پر دکھایا جاتا ہے۔
- بیج گیلری — حاصل کردہ بیجز، حصول کی تاریخ کے ساتھ؛ غیر حاصل شدہ بیجز مدھم دکھائے جاتے ہیں
  (پوشیدہ بیجز حاصل ہونے تک "???" دکھاتے ہیں)۔
- شعلے کے آئیکن کے ساتھ تسلسل کاؤنٹر؛ تسلسل کیلنڈر (گزشتہ 30 دن)۔
- XP ہسٹری چارٹ (گزشتہ 30 دنوں کا یومیہ XP)۔

### `/dashboard/tokens`

- ٹوکن بیلنس (نمایاں، صفحے کے اوپر)۔
- منتقلی فارم: وصول کنندہ، مقدار، تصدیقی ڈائیلاگ۔
- فلٹرز کے ساتھ منتقلی کی ہسٹری کا جدول (بھیجے گئے/موصولہ/تمام)۔
- دعوتی سیکشن: فعال کوڈز، نیا کوڈ بنائیں، لنک شیئر کریں۔
- کمیونٹی سرورز: صحت کی حالت کے ساتھ فہرست، منسلک/غیر منسلک کریں۔

### `/dashboard/gamification/admin`

- شدت، صارف، ٹائم اسٹیمپ اور z-score کے ساتھ بے قاعدگیوں کی فہرست۔
- فلٹرز کے ساتھ آڈٹ لاگ ویوئر (کارروائی کی قسم، صارف، تاریخ کی حد)۔
- سسٹم کے اعداد و شمار: دیا گیا کُل XP، فعال صارفین، بیج حاصل کرنے کی شرحیں۔
- فیڈریشن سرورز کی صحت کا مجموعی جائزہ۔

---

## پائپ لائن انضمام

### انضمام کا مقام

گیمیفیکیشن، `open-sse/handlers/chatCore.ts` میں ایک ہی مقام پر درخواست کی پائپ لائن سے
منسلک ہوتی ہے:

```typescript
// کلائنٹ کو جواب بھیجے جانے کے بعد:
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
    // فائر اینڈ فارگیٹ: لاگ کریں، مگر کبھی بھی کلائنٹ تک نہ پہنچائیں
  });
});
```

### ایونٹ کی اقسام

| ایونٹ کی قسم        | کب خارج کیا جاتا ہے                                      |
| ------------------- | -------------------------------------------------------- |
| `request.completed` | کامیاب LLM جواب بھیجے جانے پر                            |
| `provider.switch`   | پرووائیڈر تبدیل ہونے پر (کومبو فال بیک بھی شمار ہوتا ہے) |
| `combo.created`     | نئی کومبو کنفیگریشن محفوظ ہونے پر                        |
| `combo.used`        | کومبو ہدف کامیابی سے حاصل ہونے پر                        |
| `badge.earned`      | بیج کی جانچ میں مماثلت ملنے پر                           |
| `streak.milestone`  | تسلسل کی حد عبور ہونے پر                                 |
| `transfer.sent`     | ٹوکن کی منتقلی مکمل ہونے پر                              |
| `referral.redeemed` | دعوتی کوڈ کامیابی سے استعمال ہونے پر                     |
| `compression.used`  | پرامپٹ کمپریشن لاگو ہونے پر                              |
| `skill.executed`    | اسکل کا نفاذ مکمل ہونے پر                                |
| `model.first_use`   | ماڈل گزشتہ 7 دنوں میں استعمال نہ ہوا ہو                  |

### نان بلاکنگ ضمانت

`setImmediate` + `.catch(() => {})` پیٹرن یقینی بناتا ہے کہ:

1. گیمیفیکیشن چلنے سے پہلے جواب مکمل طور پر بھیج دیا جاتا ہے۔
2. گیمیفیکیشن کی خرابیاں کبھی بھی کلائنٹ کے سامنے ظاہر نہیں ہوتیں۔
3. ایونٹ پروسیسنگ اِن لائن نہیں بلکہ اگلے مائیکرو ٹاسک میں چلتی ہے۔

---

## سیکیورٹی

### خطرات کا ماڈل

| خطرہ                     | تدارک                                                                            |
| ------------------------ | -------------------------------------------------------------------------------- |
| اسکور میں مصنوعی اضافہ   | XP کا حساب صرف سرور کی جانب سے؛ کلائنٹس اسکور نہیں بلکہ کارروائیاں جمع کراتے ہیں |
| ری پلے حملے              | منتقلیوں پر آئڈیم پوٹینسی کلیدیں؛ آڈٹ لاگ میں نقل کی روک تھام                    |
| منتقلی کا فراڈ           | ڈبل انٹری لیجر؛ ایٹمک ٹرانزیکشنز؛ شرح کی حدود                                    |
| خود کو ریفر کرنا         | ریڈیمپشن کے وقت `api_key_id` کی باہمی جانچ                                       |
| لیڈر بورڈ میں ہیرا پھیری | زیڈ-اسکور سے بے ضابطگی کی شناخت؛ منتظم کا بے ضابطگی ڈیش بورڈ                     |
| فیڈریشن ٹوکن کی چوری     | SHA-256 ہیش شدہ اسٹوریج؛ خام ٹوکن صرف ایک بار دکھایا جاتا ہے                     |
| انوائٹ کوڈز پر بروٹ فورس | ریڈیمپشن اینڈ پوائنٹ پر شرح کی حد بندی؛ 8 حروف کی اینٹروپی                       |
| ڈسپلے ناموں میں XSS      | ڈسپلے نام صاف کیے جاتے ہیں؛ لیڈر بورڈ اندراجات کو ایسکیپ کیا جاتا ہے             |
| ہیشز پر ٹائمنگ حملے      | ٹوکن ہیش کے تقابل کے لیے `crypto.timingSafeEqual`                                |

### توثیق کے تقاضے

- **عوامی** (توثیق کے بغیر): `GET /leaderboard`، `GET /stream` (صرف مطالعہ کے
  لیڈر بورڈز)۔
- **API کلید درکار ہے**: تمام تحریری کارروائیاں، پروفائل، منتقلیاں، دعوت نامے۔
- **صرف منتظم**: بے ضابطگی کا ڈیش بورڈ، آڈٹ لاگ ویوئر۔
- **فیڈریشن**: `Authorization` ہیڈر میں خام ٹوکن استعمال کرنے والا علیحدہ توثیقی
  راستہ، جس کی توثیق محفوظ کردہ SHA-256 ہیش کے مقابل کی جاتی ہے۔

---

## ٹیسٹنگ

### ٹیسٹ فائلیں

تمام ٹیسٹس Node.js کا مقامی ٹیسٹ رنر (`node --import tsx/esm --test`) استعمال کرتے ہیں۔

| ٹیسٹ فائل                                     | دائرۂ کار                               | ٹیسٹس |
| --------------------------------------------- | --------------------------------------- | ----- |
| `tests/unit/gamification/xp.test.ts`          | XP کا حساب، لیول کرو، القابات           | 8     |
| `tests/unit/gamification/badges.test.ts`      | بیج کے معیار کا ملاپ، تفویض             | 10    |
| `tests/unit/gamification/streaks.test.ts`     | تسلسل کی منطق، سنگ میل، انتہائی صورتیں  | 7     |
| `tests/unit/gamification/leaderboard.test.ts` | رینک کا حساب، صفحہ بندی، گردش           | 8     |
| `tests/unit/gamification/sharing.test.ts`     | منتقلیاں، بیلنس، آئڈیم پوٹینسی          | 9     |
| `tests/unit/gamification/invites.test.ts`     | تخلیق، ریڈیم، میعاد ختم ہونا، خود ریفرل | 7     |
| `tests/unit/gamification/antiCheat.test.ts`   | شرح کی حدود، زیڈ-اسکور، آڈٹ لاگنگ       | 6     |
| `tests/unit/gamification/events.test.ts`      | ایونٹ کا اخراج، فین آؤٹ، خرابی سنبھالنا | 5     |

### ٹیسٹس چلانا

```bash
# تمام گیمیفیکیشن ٹیسٹس
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# ایک ٹیسٹ فائل
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### کوریج کے تقاضے

`CONTRIBUTING.md` کے مطابق — تمام نئے ماڈیولز میں درج ذیل ہونا ضروری ہے:

- برانچ کوریج >= 80%۔
- ہر عوامی فنکشن کو کم از کم ایک بار ٹیسٹ کیا گیا ہو۔
- خرابی کے راستوں کو ٹیسٹ کیا گیا ہو (ناکافی بیلنس، میعاد ختم شدہ کوڈز، شرح کی حدود)۔

---

## فائل کا ڈھانچہ

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # تمام 8 ٹیبلز + انڈیکسز
      gamification.ts                  # ڈومین CRUD ماڈیول
    gamification/
      xp.ts                           # XP کا حساب، لیول کرو، عناوین
      badges.ts                       # بیج کی تعریفیں، معیارات، جانچ
      streaks.ts                      # روزانہ اسٹریک کی ٹریکنگ
      leaderboard.ts                  # رینک کا حساب، SSE، روٹیشن
      antiCheat.ts                    # ریٹ محدود کرنا، z-score، آڈٹ
      sharing.ts                      # ٹوکن منتقلی کا لیجر
      invites.ts                      # دعوت/ریڈیم کوڈز
      servers.ts                      # کمیونٹی سرور فیڈریشن
      events.ts                       # ایونٹ ایمیٹر (انٹیگریشن پوائنٹ)
      notifications.ts                # SSE نوٹیفکیشن اسٹریم
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST لیڈر بورڈ
        leaderboard/stream/route.ts   # SSE ریئل ٹائم اپ ڈیٹس
        transfer/route.ts             # GET/POST منتقلیاں
        invite/route.ts               # GET/POST/DELETE دعوتی کوڈز
        invite/redeem/route.ts        # POST کوڈ ریڈیم کرنا
        servers/route.ts              # GET/POST/DELETE سرورز
        federation/score/route.ts     # POST اسکور بھیجنا
        federation/leaderboard/route.ts # GET لیڈر بورڈ حاصل کرنا
        notifications/route.ts        # SSE اطلاعات
        anomalies/route.ts            # GET بے ضابطگیوں کی رپورٹس
        rotate/route.ts               # POST سیکرٹس روٹیٹ کرنا
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # درجہ بندی کا صفحہ
        profile/page.tsx               # XP/بیجز/اسٹریکس کا صفحہ
        tokens/page.tsx                # بیلنس/منتقلیوں/دعوتوں کا صفحہ
        gamification/admin/page.tsx    # ایڈمن کے لیے بے ضابطگیوں کی نگرانی
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
    GAMIFICATION.md                    # یہ دستاویز
```

---

## مائیگریشن کی حکمتِ عملی

### مرحلہ 1: بیک اینڈ کور (PR 1)

- مائیگریشن `060_create_gamification.sql` (8 ٹیبلز)۔
- `src/lib/db/gamification.ts` (ڈومین ماڈیول)۔
- `src/lib/gamification/xp.ts`، `streaks.ts`، `events.ts`۔
- `chatCore.ts` میں انٹیگریشن پوائنٹ۔
- XP، اسٹریکس اور ایونٹس کے لیے یونٹ ٹیسٹس۔

### مرحلہ 2: بیجز اور لیڈر بورڈ (PR 2)

- `src/lib/gamification/badges.ts`، `leaderboard.ts`۔
- کانسٹنٹس میں بیج کی تعریفیں۔
- لیڈر بورڈ API روٹس + SSE اسٹریم۔
- بیجز اور لیڈر بورڈ کے لیے یونٹ ٹیسٹس۔

### مرحلہ 3: شیئرنگ اور دعوتیں (PR 3)

- `src/lib/gamification/sharing.ts`، `invites.ts`، `antiCheat.ts`۔
- منتقلی + دعوت کے API روٹس۔
- شیئرنگ، دعوتوں اور دھوکا دہی کی روک تھام کے لیے یونٹ ٹیسٹس۔

### مرحلہ 4: فیڈریشن اور ڈیش بورڈ (PR 4)

- `src/lib/gamification/servers.ts`، `notifications.ts`۔
- فیڈریشن API روٹس۔
- ڈیش بورڈ صفحات (لیڈر بورڈ، پروفائل، ٹوکنز، ایڈمن)۔
- MCP ٹولز کی رجسٹریشن۔

---

## مستقبل کے لیے غور طلب امور

- **موسمی ایونٹس**: محدود مدت کے بیج سیٹس اور لیڈر بورڈ سیزنز۔
- **ٹیم لیڈر بورڈز**: صارفین کو تنظیم یا کومبو کے لحاظ سے گروپ کریں۔
- **XP ملٹی پلائرز**: تشہیری ادوار کے دوران XP میں اضافہ کریں۔
- **کامیابی کا اشتراک**: شیئر کیے جانے کے قابل بیج کارڈز (OpenGraph تصاویر) بنائیں۔
- **موبائل پُش**: بیج/لیول ایونٹس کے لیے webhook پر مبنی اطلاعات۔
- **لیڈر بورڈ API**: فریقِ ثالث کے انضمام کے لیے عوامی API۔
