# Gamification & Leaderboard System (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **مصدر الحقيقة:** `src/lib/gamification/`، و`src/lib/db/gamification.ts`، و`src/app/api/gamification/`
> **آخر تحديث:** 2026-06-28 — v3.8.40

يتضمن OmniRoute طبقة تلعيب تعتمد النهج المحلي أولًا، وتكافئ المستخدمين على
التفاعل مع المنصة — من خلال إجراء الطلبات، والتبديل بين المزوّدين، وإنشاء
التركيبات، ومشاركة الرموز، والمساهمة في المجتمع. تُخزَّن جميع الحالات في
SQLite؛ أما الاتحاد مع خوادم المجتمع فهو اختياري ويعتمد على الدفع.

صُمم النظام ليكون **عديم زمن الاستجابة على المسار الحرج** — إذ تُرسَل أحداث
التلعيب بأسلوب الإطلاق والنسيان من مسار معالجة الطلبات، ولا تحجب أبدًا
استجابة LLM.

---

## نظرة عامة

### الغرض

زيادة تفاعل المستخدمين والاحتفاظ بهم من خلال توفير تقدّم مرئي (نقاط الخبرة،
والمستويات، والشارات)، وإثبات اجتماعي (لوحات المتصدرين)، وحوافز اقتصادية (مشاركة
الرموز، ومكافآت الدعوات).

### النطاق

| الميزة                 | الوصف                                                               |
| ---------------------- | ------------------------------------------------------------------- |
| نقاط الخبرة والمستويات | كسب نقاط خبرة لكل إجراء؛ والترقي وفق منحنى متعدد الحدود             |
| الشارات                | أكثر من 20 إنجازًا موزعة على 5 فئات وبأربع درجات من الندرة          |
| سلاسل النشاط           | تتبّع الاستخدام النشط يوميًا مع السلسلة الحالية والأطول             |
| لوحات المتصدرين        | نطاقات عامة وأسبوعية وشهرية ولمشاركة الرموز والمساهمات              |
| مشاركة الرموز          | تحويل الأرصدة بين المستخدمين عبر دفتر أستاذ مزدوج القيد             |
| الدعوة والاسترداد      | رموز إحالة مخزّنة بصيغة مجزأة باستخدام SHA-256                      |
| خوادم المجتمع          | الاتحاد مع مثيلات OmniRoute خارجية                                  |
| مكافحة الغش            | احتساب النقاط من جانب الخادم، وتحديد المعدل، واكتشاف الشذوذ بدرجة z |

### مبادئ التصميم

1. **محلي أولًا** — تُخزَّن جميع الحالات في SQLite، ولا حاجة إلى خدمات خارجية.
2. **غير حاجب** — تُرسَل الأحداث بأسلوب الإطلاق والنسيان؛ ولا يتأخر مسار
   استجابة LLM أبدًا بسبب منطق التلعيب.
3. **الخادم هو المرجع** — تُحتسب نقاط الخبرة على جانب الخادم فقط؛ ولا يمكن
   للعملاء تضخيم النتائج.
4. **مراعٍ للخصوصية** — المشاركة في لوحة المتصدرين اختيارية؛ ويمكن للمستخدمين
   إخفاء ملفاتهم الشخصية.
5. **جاهز للاتحاد** — يمكن لخوادم المجتمع دفع النتائج عبر API موقّعة؛
   والمزامنة استبدالية وليست تراكمية.

---

## البنية

### سير العمل عالي المستوى

```
طلب العميل
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (مسار المعالجة الحالي) ...
      → إرسال استجابة المنبع إلى العميل
      → setImmediate (إطلاق ونسيان):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

يُعد باعث الأحداث نقطة التكامل الوحيدة. يستدعي `chatCore.ts`
الدالة `emitGamificationEvent()` بعد إرسال الاستجابة؛ ثم توزّع وحدة الأحداث
العمل على الأنظمة الفرعية لنقاط الخبرة، وسلاسل النشاط، والشارات، ولوحات
المتصدرين، ومكافحة الغش.

### مخطط تبعيات الوحدات

```
src/lib/gamification/
  events.ts          ← نقطة الدخول (تُستدعى من chatCore.ts)
    ├── xp.ts        ← احتساب نقاط الخبرة وتحديد المستوى
    ├── streaks.ts   ← تتبّع سلسلة النشاط اليومية
    ├── badges.ts    ← تقييم معايير الشارات
    ├── leaderboard.ts ← احتساب الترتيب والبث عبر SSE
    ├── antiCheat.ts ← تحديد المعدل واكتشاف الشذوذ
    ├── sharing.ts   ← دفتر أستاذ تحويل الرموز
    ├── invites.ts   ← إدارة رموز الدعوة والاسترداد
    ├── servers.ts   ← اتحاد خوادم المجتمع
    └── notifications.ts ← تدفق إشعارات SSE

src/lib/db/
  gamification.ts    ← جميع عمليات CRUD (8 جداول)

src/app/api/gamification/
  leaderboard/       ← GET للتصنيفات، وPOST للتحديث اليدوي
  leaderboard/stream ← تحديثات فورية عبر SSE
  transfer/          ← GET للسجل، وPOST لإرسال الرموز
  invite/            ← GET/POST للرموز، وDELETE للإلغاء
  invite/redeem/     ← POST لاسترداد رمز
  servers/           ← GET/POST/DELETE لخوادم المجتمع
  federation/score/  ← POST لدفع النتيجة إلى الخادم
  federation/leaderboard/ ← GET لجلب لوحة المتصدرين من الخادم
  notifications/     ← إشعارات الشارات والترقية عبر SSE
  anomalies/         ← GET لتقارير الشذوذ (للمشرف)
  rotate/            ← POST لتدوير أسرار رموز الدعوة
```

---

## طبقة البيانات

### جداول قاعدة البيانات

توجد جميع الجداول في قاعدة بيانات OmniRoute SQLite الرئيسية، والتي أنشأها ملف الترحيل
`060_create_gamification.sql`. يُورَّث تسجيل WAL من النسخة المفردة
`getDbInstance()` في `src/lib/db/core.ts`.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels         │
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
│     user_badges         │     │    badge_definitions     │
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

### وحدة النطاق: `src/lib/db/gamification.ts`

تتبع نمط OmniRoute القياسي — تستورد `getDbInstance()` من
`core.ts`، وتُصدِّر دوال CRUD محددة الأنواع. لا توجد استعلامات SQL أولية في معالجات المسارات.

الدوال الرئيسية:

| الدالة                     | الوصف                                                    |
| -------------------------- | -------------------------------------------------------- |
| `upsertLeaderboardEntry()` | إدراج أو تحديث النتيجة للقيم (api_key_id, scope, period) |
| `getLeaderboard()`         | تصنيفات مقسّمة إلى صفحات لنطاق/فترة محددة                |
| `getUserLevel()`           | الحصول على سجل مستوى المستخدم أو إنشاؤه                  |
| `updateUserLevel()`        | تعيين XP والمستوى واللقب ذريًا                           |
| `getBadgeDefinitions()`    | جميع تعريفات الشارات (مع إمكانية التصفية)                |
| `getUserBadges()`          | الشارات التي حصل عليها المستخدم                          |
| `awardBadge()`             | إدراج استحقاق الشارة (متكرر آمنًا استنادًا إلى badge_id) |
| `logXpAction()`            | الإلحاق بـ xp_audit_log                                  |
| `getXpAuditLog()`          | سجل تدقيق مقسّم إلى صفحات لمستخدم                        |
| `insertLedgerEntry()`      | تحويل بقيد مزدوج (ضمن معاملة)                            |
| `getBalance()`             | مجموع ما استلمه المستخدم مطروحًا منه ما أرسله            |
| `getTransferHistory()`     | سجل تحويلات مقسّم إلى صفحات                              |
| `createInviteToken()`      | إدراج رمز دعوة + رمز مميز مُجزّأ                         |
| `redeemInviteToken()`      | البحث باستخدام الرمز والتحقق وزيادة عدد مرات الاستخدام   |
| `upsertCommunityServer()`  | تسجيل خادم اتحادي أو تحديثه                              |
| `getCommunityServers()`    | عرض قائمة الخوادم الخاصة بمستخدم                         |
| `deleteCommunityServer()`  | إزالة تسجيل خادم                                         |

---

## نظام XP / المستويات

**الملف:** `src/lib/gamification/xp.ts`

### منحنى المستويات

تتبع نقاط XP المطلوبة للوصول إلى المستوى `n` منحنى متعدد الحدود:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| المستوى | XP للمستوى التالي | XP التراكمية | اللقب  |
| ------- | ----------------- | ------------ | ------ |
| 1       | 100               | 100          | مبتدئ  |
| 5       | 1,118             | 2,415        | مبتدئ  |
| 10      | 3,162             | 10,523       | مستكشف |
| 25      | 12,500            | 86,024       | مستكشف |
| 50      | 35,355            | 345,529      | خبير   |
| 75      | 64,952            | 948,683      | متمرس  |
| 100     | 100,000           | 2,050,000    | أسطورة |

### الألقاب

| نطاق المستويات | اللقب  |
| -------------- | ------ |
| 1 – 9          | مبتدئ  |
| 10 – 24        | مستكشف |
| 25 – 49        | خبير   |
| 50 – 74        | متمرس  |
| 75 – 100       | أسطورة |

### مكافآت XP

| الإجراء           | XP  | الوصف                                              |
| ----------------- | --- | -------------------------------------------------- |
| `request`         | 1   | لكل طلب API يُوجَّه عبر OmniRoute                  |
| `provider_switch` | 5   | التبديل إلى مزود مختلف                             |
| `model_switch`    | 3   | التبديل إلى نموذج مختلف                            |
| `combo_create`    | 10  | إنشاء تركيبة جديدة                                 |
| `combo_use`       | 2   | استخدام تركيبة لطلب                                |
| `token_share`     | 1   | لكل 1 000 رمز تتم مشاركتها مع مستخدم آخر           |
| `invite_redeem`   | 50  | استرداد رمز دعوة                                   |
| `daily_login`     | 5   | الاستخدام النشط اليومي (مرة واحدة يوميًا)          |
| `streak_bonus`    | 2   | لكل يوم متتالٍ في السلسلة (مضروبًا في طول السلسلة) |
| `badge_unlock`    | 10  | فتح شارة                                           |

### مسار المنح

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. ابحث عن `XP_REWARDS[action]` للحصول على مقدار XP.
2. مرِّر العملية عبر `checkRateLimit()` (مكافحة الغش: بحد أقصى 1000 XP/دقيقة لكل مفتاح).
3. افتح معاملة:
   - اقرأ الصف الحالي من `user_levels`.
   - أضف XP؛ وأعد حساب المستوى عبر `levelFromXp(totalXp)`.
   - إذا تغير المستوى، فعيّن `levelUp = true`.
   - حدّث صف `user_levels`.
   - أدرج سجلًا في `xp_audit_log`.
4. أعد النتيجة. يتولى المستدعي معالجة الإشعارات.

### الدالة المساعدة: `levelFromXp(totalXp)`

تكرّر العملية عبر المستويات من 1 إلى 100، مع جمع `xp_for_level(n)` حتى تتجاوز نقاط XP التراكمية
القيمة `totalXp`. تُعيد أعلى مستوى تم استيفاء عتبته.
درجة تعقيدها O(100) — وهي مقبولة لأن الحد الأقصى للمستويات هو 100.

---

## نظام الشارات

**الملف:** `src/lib/gamification/badges.ts`

### الفئات

| الفئة          | الوصف                                  | أمثلة على الشارات                  |
| -------------- | -------------------------------------- | ---------------------------------- |
| `usage`        | إنجازات مرحلية تعتمد على حجم الاستخدام | الطلب الأول، 1K طلب، 100K          |
| `sharing`      | مشاركة الرموز والإحالات                | المشاركة الأولى، كريم (10 مشاركات) |
| `contribution` | المشاركة المجتمعية                     | منشئ التركيبات، مستكشف المزودين    |
| `streak`       | الاستمرارية بمرور الوقت                | محارب الأسبوع، المخلص الشهري       |
| `rare`         | إنجازات مخفية أو يصعب تحقيقها          | مستخدم مبكر، مُبلّغ عن الأخطاء     |

### درجات الندرة

| الندرة      | اللون | مؤشر الاحتمالية      |
| ----------- | ----- | -------------------- |
| `common`    | رمادي | معظم المستخدمين      |
| `uncommon`  | أخضر  | المستخدمون النشطون   |
| `rare`      | أزرق  | المستخدمون المتفانون |
| `legendary` | ذهبي  | أعلى 1%              |

### أنواع المعايير

| النوع          | الحقل        | الوصف                                               |
| -------------- | ------------ | --------------------------------------------------- |
| `action_count` | `count`      | تنفيذ الإجراء N مرة (مثلًا، 1000 طلب)               |
| `streak`       | `days`       | الحفاظ على سلسلة لمدة N يومًا متتاليًا              |
| `unique_count` | `field`, `n` | استخدام N من القيم الفريدة (مثلًا، 10 نماذج مختلفة) |
| `rank`         | `scope`, `n` | الوصول إلى المرتبة N ضمن نطاق لوحة صدارة            |
| `first`        | —            | أن تكون أول من ينفذ إجراءً                          |
| `hidden`       | (متغير)      | لا تظهر المعايير حتى تُكتسب الشارة                  |

تُخزَّن تعريفات الشارات في `badge_definitions` بوصفها `criteria` بتنسيق JSON:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### مسار التقييم

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # جميع التعريفات
    → getUserBadges(apiKeyId)         # الشارات المكتسبة بالفعل (تُتخطى)
    → لكل شارة غير مكتسبة:
       → matchesCriteria(badge, event, userState)
       → عند التطابق: awardBadge(apiKeyId, badgeId)
         → إعادة حمولة الإشعار
```

يعتمد التقييم على **الأحداث** — إذ يُنفَّذ بعد كل حدث من أحداث التلعيب، لكنه
لا يتحقق إلا من الشارات التي يتوافق `criteria.type` الخاص بها مع إجراء الحدث. وهذا
يحافظ على سرعة التقييم (< 5ms لمعظم الأحداث).

### `matchesCriteria(badge, event, userState)`

| نوع المعيار    | التحقق                                                |
| -------------- | ----------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`           |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                  |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                |
| `rank`         | `getRank(apiKeyId, scope) <= n`                       |
| `first`        | لا يوجد إدخال سابق في `xp_audit_log` لنوع الإجراء هذا |
| `hidden`       | يفوّض التحقق إلى الفحص الفرعي المناسب                 |

### الشارات المدمجة (20+)

<details>
<summary>القائمة الكاملة للشارات</summary>

| الشارة               | الفئة       | الندرة    | المعايير                       |
| -------------------- | ----------- | --------- | ------------------------------ |
| الخطوات الأولى       | الاستخدام   | شائعة     | طلب واحد                       |
| بداية الانطلاق       | الاستخدام   | شائعة     | 100 طلب                        |
| مستخدم متمرس         | الاستخدام   | غير شائعة | 1,000 طلب                      |
| قائد المئة           | الاستخدام   | نادرة     | 10,000 طلب                     |
| القوة المطلقة        | الاستخدام   | أسطورية   | 100,000 طلب                    |
| المتنقل بين المزودين | المساهمة    | شائعة     | استخدام 5 مزودين مختلفين       |
| خبير المزودين        | المساهمة    | غير شائعة | استخدام 20 مزودًا مختلفًا      |
| مهندس التركيبات      | المساهمة    | غير شائعة | إنشاء 5 تركيبات                |
| أستاذ التركيبات      | المساهمة    | نادرة     | إنشاء 25 تركيبة                |
| المشاركة الأولى      | المشاركة    | شائعة     | عملية نقل رموز واحدة           |
| كريم                 | المشاركة    | غير شائعة | 10 عمليات نقل رموز             |
| مُحسن                | المشاركة    | نادرة     | نقل 10,000 رمز إجمالًا         |
| مُحيل                | المشاركة    | شائعة     | إحالة ناجحة واحدة              |
| منشئ الشبكات         | المشاركة    | غير شائعة | 10 إحالات ناجحة                |
| محارب الأسبوع        | الاستمرارية | غير شائعة | استمرارية لمدة 7 أيام          |
| مخلص شهريًا          | الاستمرارية | نادرة     | استمرارية لمدة 30 يومًا        |
| لا يمكن إيقافه       | الاستمرارية | أسطورية   | استمرارية لمدة 365 يومًا       |
| المتبني المبكر       | نادرة       | أسطورية   | الانضمام خلال الفترة التجريبية |
| رائد الضغط           | نادرة       | غير شائعة | استخدام الضغط 100 مرة          |
| جامع المهارات        | نادرة       | نادرة     | استخدام 10 مهارات مختلفة       |
| مستكشف النماذج       | المساهمة    | غير شائعة | استخدام 15 نموذجًا مختلفًا     |

</details>

---

## متتبّع السلسلة

**الملف:** `src/lib/gamification/streaks.ts`

### نموذج البيانات

تُخزَّن السلاسل في جدول `key_value` (وهو جدول أدوات مساعدة مشترك) ضمن
مفاتيح ذات نطاقات اسمية:

| المفتاح                       | القيمة                           | الوصف                 |
| ----------------------------- | -------------------------------- | --------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | بيانات السلسلة النشطة |

### المنطق

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. قراءة سجل السلسلة من `key_value`.
2. تحليل `{current}` و`{longest}` و`{lastDate}` (سلسلة تاريخ بتنسيق ISO).
3. إذا كان `lastDate === today` — فلا تغيير (احتُسب هذا اليوم بالفعل).
4. إذا كان `lastDate === yesterday` — فتُزاد قيمة `current`، وتُحدَّث `longest` عند الحاجة.
5. إذا كان `lastDate < yesterday` — فتُعاد تهيئة `current = 1` (انقطعت السلسلة).
6. كتابة السجل المحدَّث.
7. التحقق من المحطات: 7 و14 و30 و60 و90 و180 و365 يومًا. عند تجاوز إحداها، تُعيَّن
   `milestone = true` (تمنح الجهة المستدعية نقاط XP وتتحقق من الشارات).

### الحالات الحدّية

- **المنطقة الزمنية**: تستخدم السلاسل تواريخ UTC (`new Date().toISOString().slice(0, 10)`).
  وهذا مقصود — إذ تمنع المنطقة الزمنية القياسية الواحدة التحايل عبر
  التنقل بين المناطق الزمنية.
- **المستخدمون الجدد**: لا يوجد سجل للسلسلة؛ ينشئ الطلب الأول سجلًا بالقيم
  `current=1, longest=1, lastDate=today`.
- **طلبات متعددة يوميًا**: لا يزيد السلسلة سوى الطلب الأول خلال يوم UTC.

---

## لوحة المتصدرين

**الملف:** `src/lib/gamification/leaderboard.ts`

### النطاقات

| النطاق          | الفترة  | الوصف                                                         |
| --------------- | ------- | ------------------------------------------------------------- |
| `global`        | `all`   | إجمالي نقاط XP التراكمية على مدار الوقت                       |
| `weekly`        | `week`  | نقاط XP المكتسبة في أسبوع UTC الحالي (الاثنين-الأحد)          |
| `monthly`       | `month` | نقاط XP المكتسبة في شهر UTC الحالي                            |
| `tokens_shared` | `all`   | إجمالي الرموز المنقولة إلى الآخرين                            |
| `contributions` | `all`   | التركيبات المنشأة + المزوّدون المستخدمون + المهارات المستخدمة |

### حساب الترتيب

تُحسب المراتب **عند وقت القراءة** ولا تُخزَّن. يمنع ذلك تقادم بيانات الترتيب
ويلغي الحاجة إلى مهام دورية لإعادة حساب المراتب.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

نمط الاستعلام:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### تدوير الفترات

تُدوَّر لوحات المتصدرين الأسبوعية والشهرية تلقائيًا:

1. **الأرشفة**: عند حد الفترة، تُنسخ الإدخالات الحالية إلى
   `leaderboard_archive` مع تسمية الفترة.
2. **إعادة الضبط**: تُحذف إدخالات الفترة المنتهية.
3. **التشغيل**: يُجرى التحقق عند كل استدعاء لـ `updateLeaderboard()`؛ ويؤدي أول طلب
   في فترة جديدة إلى تشغيل التدوير.

يضمن ذلك إعادة ضبط اللوحات الأسبوعية كل يوم اثنين في الساعة 00:00 بتوقيت UTC،
وإعادة ضبط اللوحات الشهرية في اليوم الأول من كل شهر.

### تحديثات SSE في الوقت الفعلي

**نقطة النهاية:** `GET /api/gamification/stream`

```
العميل → GET /api/gamification/stream
  → إنشاء اتصال SSE
  → يرسل الخادم فورًا لقطة لأعلى 10 مراكز في لوحة المتصدرين
  → كل 5 ثوانٍ: إرسال أعلى 10 مراكز المحدَّثة إذا طرأ تغيير
  → كل 15 ثانية: تعليق نبض اتصال (": heartbeat\n\n")
  → يقطع العميل الاتصال → التنظيف (إزالة المستمع)
```

تنسيق الحدث:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

يتتبّع مدير SSE العملاء المتصلين لكل نطاق، ولا يرسل التحديثات إلا
عندما تكون بيانات لوحة المتصدرين قد تغيّرت فعليًا منذ آخر إرسال.

---

## مشاركة الرموز

**الملف:** `src/lib/gamification/sharing.ts`

### دفتر القيد المزدوج

يُنشئ كل تحويل صفّين في `token_ledger`:

| الصف | `from_key_id` | `to_key_id` | `amount` |
| ---- | ------------- | ----------- | -------- |
| مدين | المُرسِل      | المُستلِم   | +المبلغ  |
| دائن | المُستلِم     | المُرسِل    | -المبلغ  |

مهلًا — الاصطلاح هو:

| الصف   | `from_key_id` | `to_key_id` | `amount` | المعنى                  |
| ------ | ------------- | ----------- | -------- | ----------------------- |
| إرسال  | المُرسِل      | المُستلِم   | +المبلغ  | تدفق خارج من المُرسِل   |
| استلام | المُستلِم     | المُرسِل    | +المبلغ  | تدفق داخل إلى المُستلِم |

يُحتسب الرصيد كما يلي:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### سير عملية التحويل

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **التحقق من الصحة**: `amount > 0` و`fromKeyId !== toKeyId`.
2. **التكرار الآمن**: تحقّق مما إذا كانت `idempotency_key` موجودة بالفعل في دفتر الأستاذ.
   إذا كانت موجودة، فأعِد النتيجة المخزنة مؤقتًا.
3. **المعاملة** (معاملة SQLite واحدة):
   a. احسب رصيد المُرسِل.
   b. إذا كان `balance < amount`، فألغِ العملية (الرصيد غير كافٍ).
   c. أدرِج صف الإرسال (`from=sender,`.

### تحديد المعدّل

- بحد أقصى 10 تحويلات في الدقيقة لكل مفتاح API.
- بحد أقصى 10,000 رمز لكل تحويل منفرد.
- بحد أقصى 100,000 رمز مُحوَّل يوميًا لكل مفتاح API.

---

## رموز الدعوة والاسترداد

**الملف:** `src/lib/gamification/invites.ts`

### تنسيق الرمز

- **الرمز**: أبجدي رقمي مكوّن من 8 أحرف (مثل `A3K9-X7M2`)، سهل القراءة،
  ويُعرَض للمستخدم.
- **الرمز المميّز**: رمز مميّز عشوائي بحجم 32 بايت، يُخزَّن كتجزئة SHA-256. يُستخدم
  للاسترداد البرمجي (مثل روابط URL).

### التخزين

| العمود       | القيمة                   |
| ------------ | ------------------------ |
| `code`       | `A3K9X7M2` (فريد، مفهرس) |
| `token_hash` | SHA-256(raw_token)       |

يُعاد الرمز المميّز الخام إلى المستخدم مرة واحدة فقط عند إنشائه. لا تقوم OmniRoute
بتخزينه أو عرضه مرة أخرى مطلقًا — ولا تبقى سوى التجزئة.

### منع الإحالة الذاتية

عندما يسترد مستخدم رمزًا، يتحقّق النظام مما يلي:

1. أن الرمز ينتمي إلى `api_key_id` مختلف.
2. أن المستخدم الذي يجري الاسترداد لم يسبق له استرداد أي رمز من المُحيل نفسه
   (عبر ربط `invite_tokens` + سجل الاسترداد).

إذا فشل أي من التحقّقين، يُرفض الاسترداد مع رسالة خطأ واضحة.

### انتهاء الصلاحية والحدود

- القيمة الافتراضية لـ `max_uses`:‏ 10 (قابلة للتهيئة عند الإنشاء).
- القيمة الافتراضية لـ `expires_at`:‏ 30 يومًا من تاريخ الإنشاء.
- تُرجع الرموز منتهية الصلاحية أو المستنفدة HTTP 410 Gone.

---

## اتحاد خوادم المجتمع

**الملف:** `src/lib/gamification/servers.ts`

### الاتصال

يُسجَّل خادم مجتمع عبر رمز دعوة صادر عن الخادم البعيد. تقوم النسخة المحلية بما يلي:

1. تستقبل رمز الدعوة (مثلًا، عند لصقه في لوحة المعلومات).
2. تستدعي `POST /api/gamification/federation/leaderboard` على الخادم البعيد للتحقق من صحة الرمز وجلب لوحة المتصدرين الحالية.
3. تخزّن سجل الخادم مع `status: connected`.

### نموذج المزامنة

يستخدم الاتحاد **مزامنة الاستبدال**، وليس المزامنة التراكمية:

```
النسخة المحلية                 خادم المجتمع
     │                              │
     ├── إرسال النقاط ─────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (يتحقق الخادم من تجزئة الرمز)
     │                              │
     ├── جلب لوحة المتصدرين ───────►│  GET /federation/leaderboard
     │◄── أعلى N من الإدخالات ──────┤  (تستبدل ذاكرة التخزين المؤقت المحلية)
     │                              │
     └── فحص السلامة ──────────────►│  GET /federation/health
         (كل 60 ثانية، بمهلة 5 ثوانٍ) │
```

### المصادقة

تتضمن طلبات الاتحاد ما يلي:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

يُجزِّئ الخادم البعيد الرمز ويبحث عن الصف المطابق في `community_servers`. يؤدي ذلك إلى تجنب إرسال التجزئة المخزنة.

### مراقبة السلامة

يتتبع كل سجل خادم ما يلي:

| الحقل       | الوصف                                  |
| ----------- | -------------------------------------- |
| `status`    | `connected`، `degraded`، `unreachable` |
| `last_sync` | الطابع الزمني ISO لآخر مزامنة ناجحة    |
| `failures`  | حالات فشل فحص السلامة المتتالية        |

بعد 5 حالات فشل متتالية، تتغير الحالة إلى `unreachable` وتتوقف المزامنة مؤقتًا حتى ينجح فحص سلامة يدوي.

---

## مكافحة الغش

**الملف:** `src/lib/gamification/antiCheat.ts`

### احتساب النقاط من جانب الخادم

تُجرى جميع حسابات XP في `src/lib/gamification/xp.ts`. لا يرسل العملاء نقاطًا مطلقًا، بل يرسلون إجراءات، ويحسب الخادم XP. لا يمكن الكتابة إلى العمود `leaderboard.score` إلا بواسطة التعليمات البرمجية التي تعمل من جانب الخادم.

### تحديد المعدل

| الحد الأقصى                      | القيمة  | النطاق        |
| -------------------------------- | ------- | ------------- |
| الحد الأقصى لـ XP في الدقيقة     | 1,000   | لكل مفتاح API |
| الحد الأقصى للتحويلات في الدقيقة | 10      | لكل مفتاح API |
| الحد الأقصى لمبلغ التحويل        | 10,000  | لكل تحويل     |
| الحد الأقصى للتحويلات اليومية    | 100,000 | لكل مفتاح API |

تستخدم حدود المعدل نافذة منزلقة في الذاكرة (بالنمط نفسه المستخدم في `RateLimitManager` ضمن `open-sse/services/`). ويجري الرجوع إلى عدادات مستندة إلى SQLite إذا أُعيد تشغيل العملية.

### اكتشاف الحالات الشاذة باستخدام الدرجة المعيارية Z

يحتفظ النظام، لكل مفتاح API، بنافذة متحركة لمدة 7 أيام لمقدار XP المكتسب في الساعة. عند كل منح لـ XP:

1. احسب معدل XP الحالي للمستخدم في الساعة.
2. احسب متوسط المجتمع والانحراف المعياري.
3. احسب `z = (user_rate - mean) / stddev`.
4. إذا كانت `z > 3.0` (3 انحرافات معيارية)، فضع علامة عليها كحالة شاذة.

تُسجَّل الحالات الشاذة في `xp_audit_log` مع `action = 'anomaly_detected'`، وتُعرض في لوحة معلومات المسؤول.

### سجل التدقيق

يُسجَّل كل منح لـ XP، وتحويل، وحصول على شارة، واكتشاف حالة شاذة في `xp_audit_log` مع ما يلي:

| الحقل        | الوصف                                     |
| ------------ | ----------------------------------------- |
| `api_key_id` | مَن                                       |
| `action`     | ما حدث (xp_award، transfer، anomaly، …)   |
| `xp_awarded` | المقدار (0 للأحداث غير المرتبطة بـ XP)    |
| `metadata`   | JSON يتضمن السياق (نوع الإجراء، الهدف، …) |
| `created_at` | الوقت (ISO 8601)                          |

يمكن للمسؤولين الاستعلام عن سجل التدقيق الكامل عبر `GET /api/gamification/anomalies`.

---

## مسارات API

تتبع جميع المسارات نمط OmniRoute القياسي:

```
المسار → طلب CORS التمهيدي → التحقق من نص الطلب (Zod) → المصادقة (extractApiKey)
  → المعالج
```

### نقاط النهاية

| الطريقة | المسار                                     | الوصف                                                     | المصادقة |
| ------- | ------------------------------------------ | --------------------------------------------------------- | -------- |
| GET     | `/api/gamification/leaderboard`            | الحصول على لوحة المتصدرين (النطاق، الفترة، ترقيم الصفحات) | اختيارية |
| POST    | `/api/gamification/leaderboard`            | فرض تحديث ذاكرة التخزين المؤقت للوحة المتصدرين            | مطلوبة   |
| GET     | `/api/gamification/stream`                 | تحديثات فورية للوحة المتصدرين عبر SSE                     | اختيارية |
| GET     | `/api/gamification/transfer`               | الحصول على سجل التحويلات (ترقيم الصفحات)                  | مطلوبة   |
| POST    | `/api/gamification/transfer`               | إرسال الرموز إلى مستخدم آخر                               | مطلوبة   |
| GET     | `/api/gamification/invite`                 | عرض رموز الدعوة الخاصة بي                                 | مطلوبة   |
| POST    | `/api/gamification/invite`                 | إنشاء رمز دعوة جديد                                       | مطلوبة   |
| DELETE  | `/api/gamification/invite`                 | إبطال رمز دعوة                                            | مطلوبة   |
| POST    | `/api/gamification/invite/redeem`          | استرداد رمز دعوة                                          | مطلوبة   |
| GET     | `/api/gamification/servers`                | عرض خوادم المجتمع                                         | مطلوبة   |
| POST    | `/api/gamification/servers`                | الاتصال بخادم مجتمع                                       | مطلوبة   |
| DELETE  | `/api/gamification/servers`                | قطع الاتصال بخادم مجتمع                                   | مطلوبة   |
| POST    | `/api/gamification/federation/score`       | إرسال النتيجة إلى خادم بعيد                               | اتحاد    |
| GET     | `/api/gamification/federation/leaderboard` | جلب لوحة المتصدرين من خادم بعيد                           | اتحاد    |
| GET     | `/api/gamification/notifications`          | إشعارات الشارات/الارتقاء في المستوى عبر SSE               | مطلوبة   |
| GET     | `/api/gamification/anomalies`              | عرض تقارير الحالات الشاذة (المشرف)                        | مشرف     |
| POST    | `/api/gamification/rotate`                 | تدوير أسرار رموز الدعوة                                   | مطلوبة   |

### أمثلة على الطلبات/الاستجابات

**POST /api/gamification/transfer**

```json
// الطلب
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// الاستجابة 200
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

// الاستجابة 400 (رصيد غير كافٍ)
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

## أدوات MCP ‏(8)

مسجّلة في `open-sse/mcp-server/` إلى جانب الأدوات الحالية. وتندرج ضمن
نطاق صلاحية `gamification`.

| الأداة                     | الوصف                                            | مخطط الإدخال                 |           |
| -------------------------- | ------------------------------------------------ | ---------------------------- | --------- |
| `gamification_leaderboard` | الحصول على لوحة المتصدرين لنطاق/فترة             | `{ scope, period?, limit? }` |
| `gamification_rank`        | الحصول على ترتيب المستدعي وجيرانه                | `{ scope }`                  |
| `gamification_profile`     | الحصول على ملخص نقاط XP والمستوى واللقب والسلسلة | `{}`                         |
| `gamification_badges`      | عرض الشارات المكتسبة أو جميع التعريفات           | `{ earned?: boolean }`       |
| `gamification_transfer`    | إرسال الرموز إلى مستخدم آخر                      | `{ to, amount }`             |
| `gamification_invite`      | إنشاء رموز الدعوة أو عرضها                       | `{ action: "create"          | "list" }` |
| `gamification_servers`     | عرض خوادم المجتمع أو الاتصال بها                 | `{ action, token? }`         |
| `gamification_anomalies`   | عرض تقارير الحالات الشاذة (نطاق المسؤول)         | `{ limit?, since? }`         |

---

## صفحات لوحة المعلومات

### `/dashboard/leaderboard`

- عرض المنصة لأعلى 3 متصدرين مع الصور الرمزية ونقاط XP.
- محدد النطاق: عالمي / أسبوعي / شهري / الرموز التي تمت مشاركتها / المساهمات.
- جدول مقسّم إلى صفحات (25 لكل صفحة) يتضمن الترتيب والاسم والنتيجة والمستوى واللقب.
- تحديثات SSE في الوقت الفعلي — تُعرض تغييرات الترتيب برسوم متحركة.
- يُميّز المستخدم الحالي في الجدول باستخدام صف ثابت بعنوان "ترتيبك".

### `/dashboard/profile`

- شريط تقدم XP يتضمن المستوى الحالي والحد المطلوب للمستوى التالي.
- عرض شارة اللقب بشكل بارز.
- معرض الشارات — الشارات المكتسبة مع تاريخ اكتسابها، والشارات غير المكتسبة باللون الرمادي
  (تُظهر الشارات المخفية "???" حتى يتم اكتسابها).
- عدّاد السلسلة مع أيقونة لهب؛ وتقويم السلسلة (آخر 30 يومًا).
- مخطط سجل XP (نقاط XP اليومية خلال آخر 30 يومًا).

### `/dashboard/tokens`

- رصيد الرموز (بارز، في أعلى الصفحة).
- نموذج التحويل: المستلم، والمبلغ، ومربع حوار التأكيد.
- جدول سجل التحويلات مع عوامل تصفية (مرسلة/مستلمة/الكل).
- قسم الدعوات: الرموز النشطة، وإنشاء رمز جديد، ورابط المشاركة.
- خوادم المجتمع: قائمة تتضمن حالة السلامة وخياري الاتصال/قطع الاتصال.

### `/dashboard/gamification/admin`

- قائمة الحالات الشاذة مع مستوى الخطورة والمستخدم والطابع الزمني ودرجة z.
- عارض سجل التدقيق مع عوامل تصفية (نوع الإجراء، والمستخدم، والنطاق الزمني).
- إحصاءات النظام: إجمالي نقاط XP الممنوحة، والمستخدمون النشطون، ومعدلات اكتساب الشارات.
- نظرة عامة على سلامة خوادم الاتحاد.

---

## تكامل خط المعالجة

### نقطة التكامل

ترتبط آليات التلعيب بخط معالجة الطلبات عند نقطة واحدة في
`open-sse/handlers/chatCore.ts`:

```typescript
// بعد إرسال الاستجابة إلى العميل:
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
    // تنفيذ دون انتظار: سجّل الخطأ، ولكن لا تمرّره أبدًا إلى العميل
  });
});
```

### أنواع الأحداث

| نوع الحدث           | وقت الإطلاق                                            |
| ------------------- | ------------------------------------------------------ |
| `request.completed` | إرسال استجابة LLM ناجحة                                |
| `provider.switch`   | تغيير المزوّد (تُحتسب عملية الرجوع الاحتياطي للمجموعة) |
| `combo.created`     | حفظ إعداد مجموعة جديد                                  |
| `combo.used`        | الوصول بنجاح إلى هدف المجموعة                          |
| `badge.earned`      | عثور تقييم الشارة على تطابق                            |
| `streak.milestone`  | تجاوز الحد الفاصل للسلسلة                              |
| `transfer.sent`     | اكتمال تحويل الرموز                                    |
| `referral.redeemed` | استرداد رمز الدعوة بنجاح                               |
| `compression.used`  | تطبيق ضغط المطالبة                                     |
| `skill.executed`    | اكتمال تنفيذ المهارة                                   |
| `model.first_use`   | عدم استخدام النموذج خلال الأيام السبعة الماضية         |

### ضمان عدم الحظر

يضمن نمط `setImmediate` + `.catch(() => {})` ما يلي:

1. إرسال الاستجابة بالكامل قبل تشغيل آليات التلعيب.
2. عدم ظهور أخطاء التلعيب للعميل مطلقًا.
3. تشغيل معالجة الحدث في المهمة المصغرة التالية، وليس ضمن السياق الحالي.

---

## الأمان

### نموذج التهديدات

| التهديد                             | الإجراء الوقائي                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------- |
| تضخيم النقاط                        | احتساب XP على جانب الخادم فقط؛ يرسل العملاء الإجراءات، وليس النقاط                    |
| هجمات إعادة التشغيل                 | مفاتيح منع التكرار للتحويلات؛ إزالة التكرارات من سجل التدقيق                          |
| الاحتيال في التحويلات               | دفتر أستاذ مزدوج القيد؛ معاملات ذرية؛ حدود للمعدل                                     |
| الإحالة الذاتية                     | التحقق المتقاطع من `api_key_id` عند الاسترداد                                         |
| التلاعب بلوحة المتصدرين             | اكتشاف الحالات الشاذة باستخدام الدرجة المعيارية Z؛ لوحة معلومات إدارية للحالات الشاذة |
| سرقة رمز الاتحاد                    | تخزين مجزأ باستخدام SHA-256؛ لا يُعرض الرمز الخام إلا مرة واحدة                       |
| التخمين بالقوة الغاشمة لرموز الدعوة | تحديد معدل الطلبات على نقطة نهاية الاسترداد؛ عشوائية بطول 8 أحرف                      |
| هجمات XSS في أسماء العرض            | تنقية أسماء العرض؛ ترميز مُدخلات لوحة المتصدرين                                       |
| هجمات التوقيت على قيم التجزئة       | استخدام `crypto.timingSafeEqual` لمقارنة تجزئة الرمز                                  |

### متطلبات المصادقة

- **عام** (من دون مصادقة): `GET /leaderboard`، `GET /stream` (لوحات متصدرين للقراءة فقط).
- **مفتاح API مطلوب**: جميع عمليات الكتابة والملف الشخصي والتحويلات والدعوات.
- **للمسؤول فقط**: لوحة معلومات الحالات الشاذة، وعارض سجل التدقيق.
- **الاتحاد**: مسار مصادقة منفصل يستخدم الرمز الخام في ترويسة `Authorization`،
  ويُتحقق منه بمقارنته مع تجزئة SHA-256 المخزنة.

---

## الاختبار

### ملفات الاختبار

تستخدم جميع الاختبارات مشغّل الاختبارات الأصلي في Node.js (`node --import tsx/esm --test`).

| ملف الاختبار                                  | ما يغطيه                                                | الاختبارات |
| --------------------------------------------- | ------------------------------------------------------- | ---------- |
| `tests/unit/gamification/xp.test.ts`          | احتساب XP، ومنحنى المستويات، والألقاب                   | 8          |
| `tests/unit/gamification/badges.test.ts`      | مطابقة معايير الشارات ومنحها                            | 10         |
| `tests/unit/gamification/streaks.test.ts`     | منطق السلاسل، والمحطات المرحلية، والحالات الحدية        | 7          |
| `tests/unit/gamification/leaderboard.test.ts` | احتساب الترتيب، وتقسيم الصفحات، والتدوير                | 8          |
| `tests/unit/gamification/sharing.test.ts`     | التحويلات، والرصيد، ومنع التكرار                        | 9          |
| `tests/unit/gamification/invites.test.ts`     | الإنشاء، والاسترداد، وانتهاء الصلاحية، والإحالة الذاتية | 7          |
| `tests/unit/gamification/antiCheat.test.ts`   | حدود المعدل، والدرجة المعيارية Z، وتسجيل التدقيق        | 6          |
| `tests/unit/gamification/events.test.ts`      | إصدار الأحداث، والتوزيع، ومعالجة الأخطاء                | 5          |

### تشغيل الاختبارات

```bash
# جميع اختبارات التلعيب
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# ملف اختبار واحد
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### متطلبات التغطية

وفقًا لـ `CONTRIBUTING.md` — يجب أن تحقق جميع الوحدات الجديدة ما يلي:

- تغطية الفروع >= 80%.
- اختبار كل دالة عامة مرة واحدة على الأقل.
- اختبار مسارات الخطأ (الرصيد غير الكافي، والرموز منتهية الصلاحية، وحدود المعدل).

---

## بنية الملفات

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # الجداول الثمانية جميعها + الفهارس
      gamification.ts                  # وحدة عمليات CRUD للنطاق
    gamification/
      xp.ts                           # حساب نقاط XP، ومنحنى المستويات، والألقاب
      badges.ts                       # تعريفات الشارات، والمعايير، والتقييم
      streaks.ts                      # تتبّع الاستمرارية اليومية
      leaderboard.ts                  # حساب الترتيب، وSSE، والتدوير
      antiCheat.ts                    # تحديد المعدل، ودرجة z، والتدقيق
      sharing.ts                      # سجل نقل الرموز
      invites.ts                      # رموز الدعوة/الاسترداد
      servers.ts                      # اتحاد خوادم المجتمع
      events.ts                       # باعث الأحداث (نقطة التكامل)
      notifications.ts                # تدفق إشعارات SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST للوحة المتصدرين
        leaderboard/stream/route.ts   # تحديثات فورية عبر SSE
        transfer/route.ts             # GET/POST لعمليات النقل
        invite/route.ts               # GET/POST/DELETE لرموز الدعوة
        invite/redeem/route.ts        # POST لاسترداد الرمز
        servers/route.ts              # GET/POST/DELETE للخوادم
        federation/score/route.ts     # POST لدفع النتيجة
        federation/leaderboard/route.ts # GET لجلب لوحة المتصدرين
        notifications/route.ts        # إشعارات SSE
        anomalies/route.ts            # GET لتقارير الحالات الشاذة
        rotate/route.ts               # POST لتدوير الأسرار
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # صفحة الترتيب
        profile/page.tsx               # صفحة نقاط XP/الشارات/الاستمرارية
        tokens/page.tsx                # صفحة الرصيد/عمليات النقل/الدعوات
        gamification/admin/page.tsx    # مراقبة المسؤول للحالات الشاذة
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
    GAMIFICATION.md                    # هذا المستند
```

---

## استراتيجية الترحيل

### المرحلة 1: النواة الخلفية (PR 1)

- ترحيل `060_create_gamification.sql` (8 جداول).
- `src/lib/db/gamification.ts` (وحدة النطاق).
- `src/lib/gamification/xp.ts`، و`streaks.ts`، و`events.ts`.
- نقطة التكامل في `chatCore.ts`.
- اختبارات الوحدات لنقاط XP، والاستمرارية، والأحداث.

### المرحلة 2: الشارات ولوحة المتصدرين (PR 2)

- `src/lib/gamification/badges.ts`، و`leaderboard.ts`.
- تعريفات الشارات في الثوابت.
- مسارات API للوحة المتصدرين + تدفق SSE.
- اختبارات الوحدات للشارات ولوحة المتصدرين.

### المرحلة 3: المشاركة والدعوات (PR 3)

- `src/lib/gamification/sharing.ts`، و`invites.ts`، و`antiCheat.ts`.
- مسارات API للنقل والدعوات.
- اختبارات الوحدات للمشاركة، والدعوات، ومكافحة الغش.

### المرحلة 4: الاتحاد ولوحة المعلومات (PR 4)

- `src/lib/gamification/servers.ts`، و`notifications.ts`.
- مسارات API للاتحاد.
- صفحات لوحة المعلومات (لوحة المتصدرين، والملف الشخصي، والرموز، والإدارة).
- تسجيل أدوات MCP.

---

## اعتبارات مستقبلية

- **الفعاليات الموسمية**: مجموعات شارات محدودة المدة ومواسم للوحات الصدارة.
- **لوحات صدارة الفرق**: تجميع المستخدمين حسب المؤسسة أو المجموعة.
- **مضاعِفات XP**: تعزيز XP خلال الفترات الترويجية.
- **مشاركة الإنجازات**: إنشاء بطاقات شارات قابلة للمشاركة (صور OpenGraph).
- **الإشعارات الفورية للجوال**: إشعارات قائمة على webhook لأحداث الشارات/المستويات.
- **واجهة برمجة تطبيقات لوحة الصدارة**: واجهة برمجة تطبيقات عامة لعمليات التكامل مع الجهات الخارجية.
