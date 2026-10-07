# Gamification & Leaderboard System (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **מקור האמת:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **עודכן לאחרונה:** 2026-06-28 — v3.8.40

OmniRoute כוללת שכבת משחוק בגישת local-first שמתגמלת משתמשים על
מעורבות בפלטפורמה — ביצוע בקשות, החלפת ספקים, יצירת
שילובים, שיתוף אסימונים ותרומה לקהילה. כל המצב נשמר ב-
SQLite; איחוד עם שרתי קהילה הוא אופציונלי ומבוסס על דחיפה.

המערכת מתוכננת לספק **השהיה אפסית בנתיב הקריטי** — אירועי משחוק
נשלחים בשיטת "שגר ושכח" מצינור עיבוד הבקשות ולעולם אינם חוסמים
תגובת LLM.

---

## סקירה כללית

### מטרה

להגדיל את מעורבות המשתמשים ואת שימורם באמצעות הצגת התקדמות גלויה (XP,
רמות, תגים), הוכחה חברתית (טבלאות מובילים) ותמריצים כלכליים (שיתוף
אסימונים, תגמולי הזמנה).

### היקף

| תכונה          | תיאור                                                     |
| -------------- | --------------------------------------------------------- |
| XP ורמות       | צבירת XP עבור כל פעולה; עלייה ברמות לפי עקומה פולינומית   |
| תגים           | יותר מ-20 הישגים ב-5 קטגוריות עם 4 דרגות נדירות           |
| רצפים          | מעקב אחר שימוש פעיל יומי, כולל הרצף הנוכחי והארוך ביותר   |
| טבלאות מובילים | היקפים גלובליים, שבועיים, חודשיים, שיתוף אסימונים ותרומות |
| שיתוף אסימונים | העברת קרדיטים בין משתמשים באמצעות ספר חשבונות כפול        |
| הזמנה ומימוש   | קודי הפניה הנשמרים כגיבוב SHA-256                         |
| שרתי קהילה     | איחוד עם מופעי OmniRoute חיצוניים                         |
| מניעת רמאות    | ניקוד בצד השרת, הגבלת קצב וזיהוי חריגות באמצעות ציון תקן  |

### עקרונות תכנון

1. **Local-first** — כל המצב נשמר ב-SQLite, ללא צורך בשירותים חיצוניים.
2. **ללא חסימה** — האירועים פועלים בשיטת "שגר ושכח"; נתיב התגובה של ה-LLM
   לעולם אינו מתעכב עקב לוגיקת המשחוק.
3. **השרת הוא הסמכות** — XP מחושב בצד השרת בלבד; לקוחות אינם יכולים
   לנפח ציונים.
4. **כיבוד הפרטיות** — ההשתתפות בטבלת המובילים היא אופציונלית; משתמשים יכולים
   להסתיר את הפרופיל שלהם.
5. **מוכן לאיחוד** — שרתי קהילה יכולים לדחוף ציונים באמצעות API חתום;
   הסנכרון מבצע החלפה, לא הוספה.

---

## ארכיטקטורה

### זרימה ברמה גבוהה

```
בקשת לקוח
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (צינור העיבוד הקיים) ...
      → תגובת upstream נשלחת ללקוח
      → setImmediate (שגר ושכח):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

משדר האירועים הוא נקודת האינטגרציה היחידה. `chatCore.ts` קורא ל-
`emitGamificationEvent()` לאחר שליחת התגובה; מודול האירועים מפיץ
את האירוע לתתי-המערכות של XP, רצפים, תגים, טבלת מובילים ומניעת רמאות.

### גרף תלויות המודולים

```
src/lib/gamification/
  events.ts          ← נקודת כניסה (נקראת מתוך chatCore.ts)
    ├── xp.ts        ← חישוב XP וקביעת רמה
    ├── streaks.ts   ← מעקב אחר רצף פעילות יומי
    ├── badges.ts    ← הערכת הקריטריונים לקבלת תגים
    ├── leaderboard.ts ← חישוב דירוג ושידור SSE
    ├── antiCheat.ts ← הגבלת קצב וזיהוי חריגות
    ├── sharing.ts   ← ספר חשבונות להעברת אסימונים
    ├── invites.ts   ← ניהול קודי הזמנה ומימוש
    ├── servers.ts   ← איחוד שרתי קהילה
    └── notifications.ts ← זרם התראות SSE

src/lib/db/
  gamification.ts    ← כל פעולות ה-CRUD (8 טבלאות)

src/app/api/gamification/
  leaderboard/       ← GET דירוגים, POST רענון ידני
  leaderboard/stream ← עדכונים בזמן אמת באמצעות SSE
  transfer/          ← GET היסטוריה, POST שליחת אסימונים
  invite/            ← GET/POST קודים, DELETE ביטול
  invite/redeem/     ← POST מימוש קוד
  servers/           ← GET/POST/DELETE שרתי קהילה
  federation/score/  ← POST דחיפת ציון לשרת
  federation/leaderboard/ ← GET משיכת טבלת מובילים מהשרת
  notifications/     ← התראות SSE על תגים ועלייה ברמה
  anomalies/         ← GET דוחות חריגות (מנהל מערכת)
  rotate/            ← POST החלפת סודות של אסימוני הזמנה
```

---

## שכבת נתונים

### טבלאות מסד הנתונים

כל הטבלאות נמצאות במסד הנתונים הראשי של OmniRoute מסוג SQLite, שנוצר באמצעות המיגרציה
`060_create_gamification.sql`. רישום היומן במצב WAL עובר בירושה ממופע הסינגלטון
`getDbInstance()` שבקובץ `src/lib/db/core.ts`.

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

### מודול תחום: `src/lib/db/gamification.ts`

פועל לפי התבנית הסטנדרטית של OmniRoute — מייבא את `getDbInstance()` מתוך
`core.ts` ומייצא פונקציות CRUD בעלות טיפוסים. אין SQL גולמי במטפלי הנתיבים.

פונקציות מרכזיות:

| פונקציה                    | תיאור                                                    |
| -------------------------- | -------------------------------------------------------- |
| `upsertLeaderboardEntry()` | הוספה או עדכון של ניקוד עבור (api_key_id, scope, period) |
| `getLeaderboard()`         | דירוגים מחולקים לעמודים עבור תחום/תקופה נתונים           |
| `getUserLevel()`           | אחזור או יצירה של רשומת רמת משתמש                        |
| `updateUserLevel()`        | הגדרה אטומית של XP, רמה ותואר                            |
| `getBadgeDefinitions()`    | כל הגדרות התגים (עם אפשרות לסינון)                       |
| `getUserBadges()`          | תגים שהמשתמש זכה בהם                                     |
| `awardBadge()`             | הוספת זכייה בתג (אידמפוטנטית לפי badge_id)               |
| `logXpAction()`            | הוספה אל xp_audit_log                                    |
| `getXpAuditLog()`          | היסטוריית ביקורת מחולקת לעמודים עבור משתמש               |
| `insertLedgerEntry()`      | העברה ברישום כפול (בתוך טרנזקציה)                        |
| `getBalance()`             | סכום שהתקבל פחות הסכום שנשלח עבור משתמש                  |
| `getTransferHistory()`     | יומן העברות מחולק לעמודים                                |
| `createInviteToken()`      | הוספת קוד הזמנה + אסימון מגובב                           |
| `redeemInviteToken()`      | חיפוש לפי קוד, אימות והגדלת מספר השימושים                |
| `upsertCommunityServer()`  | רישום או עדכון של שרת פדרציה                             |
| `getCommunityServers()`    | הצגת רשימת שרתים עבור משתמש                              |
| `deleteCommunityServer()`  | הסרת רישום שרת                                           |

---

## מערכת XP / רמות

**קובץ:** `src/lib/gamification/xp.ts`

### עקומת הרמות

כמות ה-XP הנדרשת כדי להגיע לרמה `n` מחושבת לפי עקומה פולינומית:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| רמה | XP לרמה הבאה | XP מצטבר  | תואר  |
| --- | ------------ | --------- | ----- |
| 1   | 100          | 100       | מתחיל |
| 5   | 1,118        | 2,415     | מתחיל |
| 10  | 3,162        | 10,523    | חוקר  |
| 25  | 12,500       | 86,024    | חוקר  |
| 50  | 35,355       | 345,529   | מומחה |
| 75  | 64,952       | 948,683   | מאסטר |
| 100 | 100,000      | 2,050,000 | אגדה  |

### תארים

| טווח רמות | תואר  |
| --------- | ----- |
| 1 – 9     | מתחיל |
| 10 – 24   | חוקר  |
| 25 – 49   | מומחה |
| 50 – 74   | מאסטר |
| 75 – 100  | אגדה  |

### תגמולי XP

| פעולה             | XP  | תיאור                                  |
| ----------------- | --- | -------------------------------------- |
| `request`         | 1   | לכל בקשת API המנותבת דרך OmniRoute     |
| `provider_switch` | 5   | מעבר לספק אחר                          |
| `model_switch`    | 3   | מעבר למודל אחר                         |
| `combo_create`    | 10  | יצירת קומבו חדש                        |
| `combo_use`       | 2   | שימוש בקומבו עבור בקשה                 |
| `token_share`     | 1   | לכל 1,000 טוקנים ששותפו עם משתמש אחר   |
| `invite_redeem`   | 50  | מימוש קוד הזמנה                        |
| `daily_login`     | 5   | שימוש פעיל יומי (פעם ביום)             |
| `streak_bonus`    | 2   | לכל יום רצוף בסדרה (מוכפל באורך הסדרה) |
| `badge_unlock`    | 10  | פתיחת תג                               |

### תהליך הענקת XP

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. יש לחפש את `XP_REWARDS[action]` כדי לקבל את כמות ה-XP.
2. יש להעביר דרך `checkRateLimit()` (מניעת רמאות: 1,000 XP לכל היותר לדקה עבור כל מפתח).
3. יש לפתוח טרנזקציה:
   - לקרוא את השורה הנוכחית ב-`user_levels`.
   - להוסיף XP; לחשב מחדש את הרמה באמצעות `levelFromXp(totalXp)`.
   - אם הרמה השתנתה, להגדיר `levelUp = true`.
   - לעדכן את השורה ב-`user_levels`.
   - להוסיף רשומה ל-`xp_audit_log`.
4. להחזיר את התוצאה. הקוד הקורא מטפל בהתראות.

### פונקציית עזר: `levelFromXp(totalXp)`

עוברת על הרמות 1..100 ומסכמת את `xp_for_level(n)` עד שכמות ה-XP המצטברת
עולה על `totalXp`. מחזירה את הרמה הגבוהה ביותר שהסף שלה הושג.
הסיבוכיות היא O(100) — סביר, משום שהרמות מוגבלות ל-100.

---

## מערכת התגים

**קובץ:** `src/lib/gamification/badges.ts`

### קטגוריות

| קטגוריה        | תיאור                          | תגים לדוגמה                       |
| -------------- | ------------------------------ | --------------------------------- |
| `usage`        | אבני דרך המבוססות על נפח שימוש | בקשה ראשונה, 1,000 בקשות, 100,000 |
| `sharing`      | שיתוף טוקנים והפניות           | שיתוף ראשון, נדיב (10 שיתופים)    |
| `contribution` | מעורבות בקהילה                 | יוצר קומבו, חוקר ספקים            |
| `streak`       | עקביות לאורך זמן               | לוחם השבוע, מסור חודשי            |
| `rare`         | הישגים קשים להשגה או מוסתרים   | מאמץ מוקדם, מדווח באגים           |

### דרגות נדירות

| דרגת נדירות | צבע  | רמז להסתברות   |
| ----------- | ---- | -------------- |
| `common`    | אפור | רוב המשתמשים   |
| `uncommon`  | ירוק | משתמשים פעילים |
| `rare`      | כחול | משתמשים מסורים |
| `legendary` | זהב  | 1% המובילים    |

### סוגי קריטריונים

| סוג            | שדה          | תיאור                                            |
| -------------- | ------------ | ------------------------------------------------ |
| `action_count` | `count`      | ביצוע פעולה N פעמים (למשל, 1,000 בקשות)          |
| `streak`       | `days`       | שמירה על סדרה במשך N ימים רצופים                 |
| `unique_count` | `field`, `n` | שימוש ב-N ערכים ייחודיים (למשל, 10 מודלים שונים) |
| `rank`         | `scope`, `n` | הגעה לדירוג N בטווח של טבלת מובילים              |
| `first`        | —            | להיות הראשון שמבצע פעולה                         |
| `hidden`       | (משתנה)      | קריטריונים שאינם מוצגים עד להשגת התג             |

הגדרות התגים נשמרות ב-`badge_definitions` כ-`criteria` בפורמט JSON:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### תהליך ההערכה

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # כל ההגדרות
    → getUserBadges(apiKeyId)         # כבר הושגו (יש לדלג)
    → עבור כל תג שטרם הושג:
       → matchesCriteria(badge, event, userState)
       → אם יש התאמה: awardBadge(apiKeyId, badgeId)
         → החזרת מטען ההתראה
```

ההערכה היא **מונעת-אירועים** — היא מופעלת לאחר כל אירוע גיימיפיקציה, אך
בודקת רק תגים שה-`criteria.type` שלהם תואם לפעולת האירוע. כך
ההערכה נשארת מהירה (< 5ms עבור רוב האירועים).

### `matchesCriteria(badge, event, userState)`

| סוג הקריטריון  | בדיקה                                              |
| -------------- | -------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`        |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`               |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`             |
| `rank`         | `getRank(apiKeyId, scope) <= n`                    |
| `first`        | אין רשומה קודמת ב-`xp_audit_log` עבור סוג פעולה זה |
| `hidden`       | האצלת הטיפול לבדיקת המשנה המתאימה                  |

### תגים מובנים (20+)

<details>
<summary>רשימת התגים המלאה</summary>

| תג               | קטגוריה | נדירות  | קריטריונים                     |
| ---------------- | ------- | ------- | ------------------------------ |
| צעדים ראשונים    | שימוש   | נפוץ    | בקשה אחת                       |
| מתחילים להתחמם   | שימוש   | נפוץ    | 100 בקשות                      |
| משתמש עוצמתי     | שימוש   | לא נפוץ | 1,000 בקשות                    |
| קנטוריון         | שימוש   | נדיר    | 10,000 בקשות                   |
| עוצמה מוחלטת     | שימוש   | אגדי    | 100,000 בקשות                  |
| מדלג בין ספקים   | תרומה   | נפוץ    | שימוש ב-5 ספקים שונים          |
| מומחה ספקים      | תרומה   | לא נפוץ | שימוש ב-20 ספקים שונים         |
| אדריכל שילובים   | תרומה   | לא נפוץ | יצירת 5 שילובים                |
| רב-אמן השילובים  | תרומה   | נדיר    | יצירת 25 שילובים               |
| שיתוף ראשון      | שיתוף   | נפוץ    | העברת אסימונים אחת             |
| נדיב             | שיתוף   | לא נפוץ | 10 העברות אסימונים             |
| פילנתרופ         | שיתוף   | נדיר    | העברת 10,000 אסימונים בסך הכול |
| מפנה             | שיתוף   | נפוץ    | הפניה מוצלחת אחת               |
| בונה רשת         | שיתוף   | לא נפוץ | 10 הפניות מוצלחות              |
| לוחם השבוע       | רצף     | לא נפוץ | רצף של 7 ימים                  |
| מסור חודשי       | רצף     | נדיר    | רצף של 30 ימים                 |
| בלתי ניתן לעצירה | רצף     | אגדי    | רצף של 365 ימים                |
| מאמץ מוקדם       | נדיר    | אגדי    | הצטרפות במהלך תקופת הבטא       |
| חלוץ הדחיסה      | נדיר    | לא נפוץ | שימוש בדחיסה 100 פעמים         |
| אספן מיומנויות   | נדיר    | נדיר    | שימוש ב-10 מיומנויות שונות     |
| חוקר מודלים      | תרומה   | לא נפוץ | שימוש ב-15 מודלים שונים        |

</details>

---

## מעקב אחר רצף

**קובץ:** `src/lib/gamification/streaks.ts`

### מודל נתונים

רצפים נשמרים בטבלה `key_value` (טבלת שירות משותפת) תחת
מפתחות עם מרחב שמות:

| מפתח                          | ערך                              | תיאור          |
| ----------------------------- | -------------------------------- | -------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | נתוני רצף פעיל |

### לוגיקה

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. קריאת רשומת הרצף מתוך `key_value`.
2. פענוח `{current}`, `{longest}`, `{lastDate}` (מחרוזת תאריך בתקן ISO).
3. אם `lastDate === today` — ללא שינוי (כבר נספר היום).
4. אם `lastDate === yesterday` — הגדלת `current`; עדכון `longest` במקרה הצורך.
5. אם `lastDate < yesterday` — איפוס `current = 1` (הרצף נקטע).
6. כתיבת הרשומה המעודכנת.
7. בדיקת אבני דרך: 7, 14, 30, 60, 90, 180, 365 ימים. אם נחצתה אבן דרך, הגדרת
   `milestone = true` (הקוד הקורא מעניק XP ובודק תגים).

### מקרי קצה

- **אזור זמן**: רצפים משתמשים בתאריכי UTC (`new Date().toISOString().slice(0, 10)`).
  הדבר מכוון — אזור זמן קנוני יחיד מונע ניצול לרעה באמצעות
  מעבר בין אזורי זמן.
- **משתמשים חדשים**: לא קיימת רשומת רצף; הבקשה הראשונה יוצרת אותה עם
  `current=1, longest=1, lastDate=today`.
- **בקשות מרובות ביום**: רק הבקשה הראשונה ביום UTC
  מגדילה את הרצף.

---

## טבלת מובילים

**קובץ:** `src/lib/gamification/leaderboard.ts`

### תחומים

| תחום            | תקופה   | תיאור                                                              |
| --------------- | ------- | ------------------------------------------------------------------ |
| `global`        | `all`   | XP מצטבר מכל הזמנים                                                |
| `weekly`        | `week`  | XP שנצבר בשבוע UTC הנוכחי (שני–ראשון)                              |
| `monthly`       | `month` | XP שנצבר בחודש UTC הנוכחי                                          |
| `tokens_shared` | `all`   | סך כל האסימונים שהועברו לאחרים                                     |
| `contributions` | `all`   | שילובים שנוצרו + ספקים שנעשה בהם שימוש + מיומנויות שנעשה בהן שימוש |

### חישוב דירוג

הדירוגים **מחושבים בזמן הקריאה**, ואינם נשמרים. כך נמנעים נתוני דירוג מיושנים
ומתבטל הצורך במשימות תקופתיות לחישוב מחדש של הדירוג.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

תבנית שאילתה:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### תחלופת תקופות

טבלאות המובילים השבועיות והחודשיות מתחלפות באופן אוטומטי:

1. **העברה לארכיון**: בגבול התקופה, העתקת הרשומות הנוכחיות אל
   `leaderboard_archive` עם תווית התקופה.
2. **איפוס**: מחיקת רשומות התקופה שהסתיימה.
3. **הפעלה**: בדיקה בכל קריאה ל-`updateLeaderboard()`; הבקשה הראשונה
   בתקופה חדשה מפעילה את התחלופה.

כך מובטח שטבלאות שבועיות מתאפסות בכל יום שני בשעה 00:00 UTC, וטבלאות חודשיות
מתאפסות ביום הראשון של כל חודש.

### עדכוני SSE בזמן אמת

**נקודת קצה:** `GET /api/gamification/stream`

```
לקוח → GET /api/gamification/stream
  → נוצר חיבור SSE
  → השרת שולח מיד תמונת מצב של 10 המובילים בטבלת המובילים
  → כל 5 שניות: דחיפת 10 המובילים המעודכנים אם חל שינוי
  → כל 15 שניות: הערת פעימת חיים (": heartbeat\n\n")
  → הלקוח מתנתק → ניקוי (הסרת מאזין)
```

מבנה אירוע:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

מנהל ה-SSE עוקב אחר לקוחות מחוברים לפי תחום ושולח עדכונים רק
כאשר נתוני טבלת המובילים השתנו בפועל מאז הדחיפה האחרונה.

---

## שיתוף אסימונים

**קובץ:** `src/lib/gamification/sharing.ts`

### הנהלת חשבונות כפולה

כל העברה יוצרת שתי שורות ב-`token_ledger`:

| שורה  | `from_key_id` | `to_key_id` | `amount` |
| ----- | ------------- | ----------- | -------- |
| חיוב  | שולח          | מקבל        | +amount  |
| זיכוי | מקבל          | שולח        | -amount  |

רגע — המוסכמה היא:

| שורה  | `from_key_id` | `to_key_id` | `amount` | משמעות         |
| ----- | ------------- | ----------- | -------- | -------------- |
| שליחה | שולח          | מקבל        | +amount  | יציאה מהשולח   |
| קבלה  | מקבל          | שולח        | +amount  | כניסה אל המקבל |

היתרה מחושבת כך:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### תהליך ההעברה

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **אימות**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **אידמפוטנטיות**: בדיקה אם `idempotency_key` כבר קיים ביומן.
   אם כן, מוחזרת התוצאה שנשמרה במטמון.
3. **טרנזקציה** (טרנזקציית SQLite יחידה):
   א. חישוב יתרת השולח.
   ב. אם `balance < amount`, ביטול (אין מספיק כספים).
   ג. הוספת שורת שליחה (`from=sender,`.

### הגבלת קצב

- לכל היותר 10 העברות בדקה לכל מפתח API.
- לכל היותר 10,000 אסימונים בהעברה יחידה.
- לכל היותר 100,000 אסימונים מועברים ביום לכל מפתח API.

---

## אסימוני הזמנה ומימוש

**קובץ:** `src/lib/gamification/invites.ts`

### פורמט הקוד

- **קוד**: אלפאנומרי בן 8 תווים (לדוגמה, `A3K9-X7M2`), קריא לבני אדם,
  ומוצג למשתמש.
- **אסימון**: אסימון אקראי בן 32 בתים, המאוחסן כגיבוב SHA-256. משמש
  למימוש תכנותי (לדוגמה, קישורי URL).

### אחסון

| עמודה        | ערך                          |
| ------------ | ---------------------------- |
| `code`       | `A3K9X7M2` (ייחודי, מאונדקס) |
| `token_hash` | SHA-256(raw_token)           |

האסימון הגולמי מוחזר למשתמש פעם אחת בלבד בזמן היצירה. OmniRoute
לעולם אינה מאחסנת או מציגה אותו שוב — רק הגיבוב נשמר.

### מניעת הפניה עצמית

כאשר משתמש מממש קוד, המערכת בודקת:

1. הקוד שייך ל-`api_key_id` אחר.
2. המשתמש המממש לא מימש בעבר קוד כלשהו מאותו
   מפנה (צירוף של `invite_tokens` + יומן המימושים).

אם אחת מהבדיקות נכשלת, המימוש נדחה עם הודעת שגיאה ברורה.

### תפוגה ומגבלות

- ברירת המחדל של `max_uses`:‏ 10 (ניתן להגדרה בעת היצירה).
- ברירת המחדל של `expires_at`:‏ 30 יום ממועד היצירה.
- קודים שפג תוקפם או שמוצו מחזירים HTTP 410 Gone.

---

## פדרציית שרתי קהילה

**קובץ:** `src/lib/gamification/servers.ts`

### התחברות

שרת קהילה נרשם באמצעות אסימון הזמנה שהונפק על ידי השרת המרוחק. המופע המקומי:

1. מקבל את אסימון ההזמנה (למשל, לאחר שהודבק בלוח הבקרה).
2. שולח קריאת `POST /api/gamification/federation/leaderboard` לשרת המרוחק כדי לאמת את האסימון ולאחזר את טבלת המובילים הנוכחית.
3. שומר את רשומת השרת עם `status: connected`.

### מודל סנכרון

הפדרציה משתמשת ב**סנכרון דריסה**, ולא בסנכרון מצטבר:

```
מופע מקומי                    שרת קהילה
     │                              │
     ├── דחיפת ניקוד ──────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (השרת מאמת את גיבוב האסימון)
     │                              │
     ├── משיכת טבלת מובילים ──────►│  GET /federation/leaderboard
     │◄── רשומות top-N ────────────┤  (דורס את המטמון המקומי)
     │                              │
     └── בדיקת תקינות ─────────────►│  GET /federation/health
         (כל 60 שניות, פסק זמן של 5 שניות) │
```

### אימות

בקשות פדרציה כוללות:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

השרת המרוחק מגבב את האסימון ומחפש את הרשומה התואמת בטבלת
`community_servers`. כך נמנעת העברת הגיבוב המאוחסן.

### ניטור תקינות

כל רשומת שרת עוקבת אחר:

| שדה         | תיאור                                  |
| ----------- | -------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable` |
| `last_sync` | חותמת זמן ISO של הסנכרון המוצלח האחרון |
| `failures`  | כשלי בדיקת תקינות רצופים               |

לאחר 5 כשלים רצופים, הסטטוס משתנה ל-`unreachable` והסנכרון
מושהה עד שבדיקת תקינות ידנית מצליחה.

---

## מניעת רמאות

**קובץ:** `src/lib/gamification/antiCheat.ts`

### חישוב ניקוד בצד השרת

כל חישובי ה-XP מתבצעים ב-`src/lib/gamification/xp.ts`. לקוחות לעולם אינם
שולחים ניקוד — הם שולחים פעולות, והשרת מחשב את ה-XP. העמודה
`leaderboard.score` ניתנת לכתיבה רק על ידי קוד בצד השרת.

### הגבלת קצב

| מגבלה                | ערך     | תחולה        |
| -------------------- | ------- | ------------ |
| XP מרבי לדקה         | 1,000   | לכל מפתח API |
| העברות מרביות לדקה   | 10      | לכל מפתח API |
| סכום העברה מרבי      | 10,000  | לכל העברה    |
| העברות יומיות מרביות | 100,000 | לכל מפתח API |

מגבלות הקצב משתמשות בחלון נע בזיכרון (באותו דפוס כמו
`RateLimitManager` ב-`open-sse/services/`). במקרה שהתהליך מופעל מחדש,
המערכת עוברת למוני גיבוי המבוססים על SQLite.

### זיהוי חריגות באמצעות ציון Z

עבור כל מפתח API, המערכת מתחזקת חלון נע של 7 ימים של XP שנצבר בכל
שעה. בכל הענקת XP:

1. מחשבים את קצב צבירת ה-XP השעתי הנוכחי של המשתמש.
2. מחשבים את ממוצע האוכלוסייה ואת סטיית התקן.
3. מחשבים `z = (user_rate - mean) / stddev`.
4. אם `z > 3.0` (3 סטיות תקן), מסמנים זאת כחריגה.

חריגות נרשמות ב-`xp_audit_log` עם `action = 'anomaly_detected'`
ומוצגות בלוח הבקרה למנהלים.

### יומן ביקורת

כל הענקת XP, העברה, קבלת תג וזיהוי חריגה נרשמים ב-
`xp_audit_log` עם:

| שדה          | תיאור                                   |
| ------------ | --------------------------------------- |
| `api_key_id` | מי                                      |
| `action`     | מה קרה (xp_award, transfer, anomaly, …) |
| `xp_awarded` | כמות (0 עבור אירועים שאינם קשורים ל-XP) |
| `metadata`   | JSON עם הקשר (סוג פעולה, יעד, …)        |
| `created_at` | מתי (ISO 8601)                          |

מנהלים יכולים לבצע שאילתה על יומן הביקורת המלא באמצעות `GET /api/gamification/anomalies`.

---

## נתיבי API

כל הנתיבים פועלים לפי התבנית הסטנדרטית של OmniRoute:

```
נתיב → בקשת קדם של CORS → אימות גוף הבקשה (Zod) → אימות זהות (extractApiKey)
  → מטפל
```

### נקודות קצה

| שיטה   | נתיב                                       | תיאור                                       | אימות זהות |
| ------ | ------------------------------------------ | ------------------------------------------- | ---------- |
| GET    | `/api/gamification/leaderboard`            | קבלת טבלת המובילים (טווח, תקופה, עימוד)     | אופציונלי  |
| POST   | `/api/gamification/leaderboard`            | רענון כפוי של מטמון טבלת המובילים           | נדרש       |
| GET    | `/api/gamification/stream`                 | עדכונים בזמן אמת לטבלת המובילים באמצעות SSE | אופציונלי  |
| GET    | `/api/gamification/transfer`               | קבלת היסטוריית העברות (עימוד)               | נדרש       |
| POST   | `/api/gamification/transfer`               | שליחת אסימונים למשתמש אחר                   | נדרש       |
| GET    | `/api/gamification/invite`                 | הצגת קודי ההזמנה שלי                        | נדרש       |
| POST   | `/api/gamification/invite`                 | יצירת קוד הזמנה חדש                         | נדרש       |
| DELETE | `/api/gamification/invite`                 | ביטול קוד הזמנה                             | נדרש       |
| POST   | `/api/gamification/invite/redeem`          | מימוש קוד הזמנה                             | נדרש       |
| GET    | `/api/gamification/servers`                | הצגת שרתי קהילה                             | נדרש       |
| POST   | `/api/gamification/servers`                | התחברות לשרת קהילה                          | נדרש       |
| DELETE | `/api/gamification/servers`                | התנתקות משרת קהילה                          | נדרש       |
| POST   | `/api/gamification/federation/score`       | דחיפת ניקוד לשרת מרוחק                      | פדרציה     |
| GET    | `/api/gamification/federation/leaderboard` | משיכת טבלת המובילים משרת מרוחק              | פדרציה     |
| GET    | `/api/gamification/notifications`          | התראות SSE על תגים/עלייה ברמה               | נדרש       |
| GET    | `/api/gamification/anomalies`              | הצגת דוחות חריגות (מנהל מערכת)              | מנהל מערכת |
| POST   | `/api/gamification/rotate`                 | החלפת סודות של אסימוני הזמנה                | נדרש       |

### דוגמאות לבקשות/תגובות

**POST /api/gamification/transfer**

```json
// בקשה
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// תגובה 200
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

// תגובה 400 (אין מספיק יתרה)
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

## כלי MCP‏ (8)

רשומים ב-`open-sse/mcp-server/` לצד הכלים הקיימים. מוגבלים להיקף ההרשאה
`gamification`.

| כלי                        | תיאור                               | סכמת קלט                     |           |
| -------------------------- | ----------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | קבלת טבלת המובילים עבור היקף/תקופה  | `{ scope, period?, limit? }` |
| `gamification_rank`        | קבלת הדירוג והשכנים של מבצע הקריאה  | `{ scope }`                  |
| `gamification_profile`     | קבלת סיכום XP, רמה, תואר ורצף       | `{}`                         |
| `gamification_badges`      | הצגת תגים שהושגו או כל ההגדרות      | `{ earned?: boolean }`       |
| `gamification_transfer`    | שליחת אסימונים למשתמש אחר           | `{ to, amount }`             |
| `gamification_invite`      | יצירה או הצגה של קודי הזמנה         | `{ action: "create"          | "list" }` |
| `gamification_servers`     | הצגה או חיבור של שרתי קהילה         | `{ action, token? }`         |
| `gamification_anomalies`   | הצגת דוחות חריגות (היקף מנהל מערכת) | `{ limit?, since? }`         |

---

## דפי לוח הבקרה

### `/dashboard/leaderboard`

- תצוגת פודיום (3 המובילים עם תמונות פרופיל ו-XP).
- בורר היקף: גלובלי / שבועי / חודשי / אסימונים ששותפו / תרומות.
- טבלה מחולקת לעמודים (25 בכל עמוד) עם דירוג, שם, ניקוד, רמה ותואר.
- עדכונים בזמן אמת באמצעות SSE — שינויי דירוג מוצגים בהנפשה.
- המשתמש הנוכחי מודגש בטבלה באמצעות שורה דביקה מסוג "הדירוג שלך".

### `/dashboard/profile`

- סרגל התקדמות XP עם הרמה הנוכחית וסף הרמה הבאה.
- תג התואר מוצג באופן בולט.
- גלריית תגים — תגים שהושגו עם תאריך ההשגה, ותגים שלא הושגו מוצגים באפור
  (תגים מוסתרים מציגים "???" עד להשגתם).
- מונה רצף עם סמל להבה; לוח שנה של הרצף (30 הימים האחרונים).
- תרשים היסטוריית XP (XP יומי במהלך 30 הימים האחרונים).

### `/dashboard/tokens`

- יתרת אסימונים (בולטת, בראש הדף).
- טופס העברה: נמען, סכום, תיבת דו-שיח לאישור.
- טבלת היסטוריית העברות עם מסננים (נשלחו/התקבלו/הכול).
- אזור הזמנות: קודים פעילים, יצירת קוד חדש, קישור לשיתוף.
- שרתי קהילה: רשימה עם מצב תקינות, התחברות/התנתקות.

### `/dashboard/gamification/admin`

- רשימת חריגות עם דרגת חומרה, משתמש, חותמת זמן וציון z.
- מציג יומן ביקורת עם מסננים (סוג פעולה, משתמש, טווח תאריכים).
- נתוני מערכת: סך כל ה-XP שהוענק, משתמשים פעילים, שיעורי השגת תגים.
- סקירת תקינות של שרתי הפדרציה.

---

## שילוב בצינור העיבוד

### נקודת השילוב

Gamification מתחבר לצינור עיבוד הבקשות בנקודה יחידה בתוך
`open-sse/handlers/chatCore.ts`:

```typescript
// לאחר שליחת התגובה ללקוח:
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
    // הפעל ושכח: יש לתעד ביומן, אך לעולם לא להעביר ללקוח
  });
});
```

### סוגי אירועים

| סוג אירוע           | מתי הוא מופק                               |
| ------------------- | ------------------------------------------ |
| `request.completed` | תגובת LLM מוצלחת נשלחה                     |
| `provider.switch`   | הספק השתנה (גם מעבר גיבוי של קומבו נספר)   |
| `combo.created`     | תצורת קומבו חדשה נשמרה                     |
| `combo.used`        | יעד הקומבו הושג בהצלחה                     |
| `badge.earned`      | הערכת התגים מצאה התאמה                     |
| `streak.milestone`  | נחצה סף רצף                                |
| `transfer.sent`     | העברת אסימונים הושלמה                      |
| `referral.redeemed` | קוד הזמנה מומש בהצלחה                      |
| `compression.used`  | הוחלה דחיסת הנחיה                          |
| `skill.executed`    | הפעלת המיומנות הושלמה                      |
| `model.first_use`   | המודל לא היה בשימוש במהלך 7 הימים האחרונים |

### הבטחת פעולה לא חוסמת

התבנית `setImmediate` + `.catch(() => {})` מבטיחה:

1. התגובה נשלחת במלואה לפני הפעלת Gamification.
2. שגיאות Gamification לעולם אינן נחשפות ללקוח.
3. עיבוד האירוע פועל במיקרו-משימה הבאה, ולא בתוך הזרימה הנוכחית.

---

## אבטחה

### מודל איומים

| איום                     | אמצעי הפחתה                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| ניפוח ניקוד              | חישוב XP בצד השרת בלבד; לקוחות שולחים פעולות, לא ניקוד           |
| התקפות שידור חוזר        | מפתחות אידמפוטנטיות בהעברות; מניעת כפילויות ביומן הביקורת        |
| הונאת העברות             | ספר חשבונות כפול; טרנזקציות אטומיות; מגבלות קצב                  |
| הפניה עצמית              | אימות צולב של `api_key_id` בעת המימוש                            |
| מניפולציה בטבלת המובילים | זיהוי חריגות באמצעות ציון Z; לוח מחוונים לחריגות עבור מנהלים     |
| גנבת אסימון פדרציה       | אחסון גיבוב SHA-256; האסימון הגולמי מוצג פעם אחת בלבד            |
| ניחוש בכוח של קודי הזמנה | הגבלת קצב בנקודת הקצה למימוש; אנטרופיה של 8 תווים                |
| XSS בשמות תצוגה          | שמות התצוגה עוברים טיהור; רשומות טבלת המובילים עוברות תווי מילוט |
| התקפות תזמון על גיבובים  | `crypto.timingSafeEqual` להשוואת גיבובי אסימונים                 |

### דרישות אימות

- **ציבורי** (ללא אימות): `GET /leaderboard`, `GET /stream` (טבלאות מובילים
  לקריאה בלבד).
- **נדרש מפתח API**: כל פעולות הכתיבה, פרופיל, העברות והזמנות.
- **למנהלים בלבד**: לוח מחוונים לחריגות, מציג יומן ביקורת.
- **פדרציה**: נתיב אימות נפרד המשתמש באסימון הגולמי בכותרת
  `Authorization`, המאומת מול גיבוב SHA-256 המאוחסן.

---

## בדיקות

### קובצי בדיקה

כל הבדיקות משתמשות במריץ הבדיקות המובנה של Node.js (`node --import tsx/esm --test`).

| קובץ בדיקה                                    | מכסה                                   | בדיקות |
| --------------------------------------------- | -------------------------------------- | ------ |
| `tests/unit/gamification/xp.test.ts`          | חישוב XP, עקומת רמות, תארים            | 8      |
| `tests/unit/gamification/badges.test.ts`      | התאמת קריטריונים לתגים, הענקה          | 10     |
| `tests/unit/gamification/streaks.test.ts`     | לוגיקת רצפים, אבני דרך, מקרי קצה       | 7      |
| `tests/unit/gamification/leaderboard.test.ts` | חישוב דירוג, עימוד, רוטציה             | 8      |
| `tests/unit/gamification/sharing.test.ts`     | העברות, יתרה, אידמפוטנטיות             | 9      |
| `tests/unit/gamification/invites.test.ts`     | יצירה, מימוש, תפוגה, הפניה עצמית       | 7      |
| `tests/unit/gamification/antiCheat.test.ts`   | מגבלות קצב, ציון Z, רישום ביומן ביקורת | 6      |
| `tests/unit/gamification/events.test.ts`      | פליטת אירועים, הפצה, טיפול בשגיאות     | 5      |

### הרצת בדיקות

```bash
# כל בדיקות הגיימיפיקציה
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# קובץ בדיקה יחיד
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### דרישות כיסוי

לפי `CONTRIBUTING.md` — כל המודולים החדשים חייבים לכלול:

- כיסוי ענפים >= 80%.
- כל פונקציה ציבורית נבדקת לפחות פעם אחת.
- נתיבי שגיאה נבדקים (יתרה לא מספקת, קודים שפג תוקפם, מגבלות קצב).

---

## מבנה הקבצים

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # כל 8 הטבלאות והאינדקסים
      gamification.ts                  # מודול CRUD של הדומיין
    gamification/
      xp.ts                           # חישוב XP, עקומת רמות, תארים
      badges.ts                       # הגדרות תגים, קריטריונים, הערכה
      streaks.ts                      # מעקב אחר רצף יומי
      leaderboard.ts                  # חישוב דירוג, SSE, רוטציה
      antiCheat.ts                    # הגבלת קצב, ציון z, ביקורת
      sharing.ts                      # יומן העברות אסימונים
      invites.ts                      # קודי הזמנה/מימוש
      servers.ts                      # פדרציה של שרתי קהילה
      events.ts                       # מפיק אירועים (נקודת אינטגרציה)
      notifications.ts                # זרם התראות SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST של טבלת המובילים
        leaderboard/stream/route.ts   # עדכוני SSE בזמן אמת
        transfer/route.ts             # העברות GET/POST
        invite/route.ts               # קודי הזמנה GET/POST/DELETE
        invite/redeem/route.ts        # מימוש קוד באמצעות POST
        servers/route.ts              # שרתים GET/POST/DELETE
        federation/score/route.ts     # דחיפת ניקוד באמצעות POST
        federation/leaderboard/route.ts # משיכת טבלת מובילים באמצעות GET
        notifications/route.ts        # התראות SSE
        anomalies/route.ts            # קבלת דוחות חריגות באמצעות GET
        rotate/route.ts               # החלפת סודות באמצעות POST
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # דף דירוגים
        profile/page.tsx               # דף XP/תגים/רצפים
        tokens/page.tsx                # דף יתרה/העברות/הזמנות
        gamification/admin/page.tsx    # ניטור חריגות למנהלים
  shared/
    constants/
      gamification.ts                  # XP_REWARDS, TITLES, BADGE_DEFS, LIMITS

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
    GAMIFICATION.md                    # מסמך זה
```

---

## אסטרטגיית מיגרציה

### שלב 1: ליבת צד השרת (PR 1)

- מיגרציה `060_create_gamification.sql` ‏(8 טבלאות).
- `src/lib/db/gamification.ts` (מודול דומיין).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- נקודת אינטגרציה ב-`chatCore.ts`.
- בדיקות יחידה עבור XP, רצפים ואירועים.

### שלב 2: תגים וטבלת מובילים (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- הגדרות תגים בקבועים.
- נתיבי API של טבלת המובילים + זרם SSE.
- בדיקות יחידה עבור תגים וטבלת המובילים.

### שלב 3: שיתוף והזמנות (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- נתיבי API להעברות ולהזמנות.
- בדיקות יחידה עבור שיתוף, הזמנות ומניעת רמאות.

### שלב 4: פדרציה ולוח מחוונים (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- נתיבי API של הפדרציה.
- דפי לוח המחוונים (טבלת מובילים, פרופיל, אסימונים, ניהול).
- רישום כלי MCP.

---

## שיקולים עתידיים

- **אירועים עונתיים**: ערכות תגים מוגבלות בזמן ועונות של טבלאות מובילים.
- **טבלאות מובילים קבוצתיות**: קיבוץ משתמשים לפי ארגון או קומבו.
- **מכפילי XP**: הגדלת ה-XP במהלך תקופות קידום מכירות.
- **שיתוף הישגים**: יצירת כרטיסי תגים הניתנים לשיתוף (תמונות OpenGraph).
- **התראות דחיפה למכשירים ניידים**: התראות מבוססות webhook עבור אירועי תג/רמה.
- **API של טבלת המובילים**: API ציבורי לאינטגרציות עם צדדים שלישיים.
