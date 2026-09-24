# Account-Ban / Banned-Keyword Detection (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute סורק תגובות שגיאה משירותים במעלה הזרם לאיתור סימנים המעידים ש**החשבון אצל הספק מושבת לצמיתות** (מושעה / מושבת / חסום עקב הפרת תנאי השירות), וכאשר נמצאת התאמה, מעביר את החיבור ל**מצב סופי `banned`**, כך שהוא לא ייבחר עוד לבקשות. זוהי ההגדרה שכרטיס ההגדרות **Security → Banned Keywords** מגדיר ("מילות מפתח נוספות שמפעילות זיהוי של חסימת חשבון לצמיתות. מילות המפתח המובנות חלות תמיד.").

דף זה מתעד את הרשימה המובנית, את תהליך הזיהוי, את תחולתו, כיצד להוסיף מילות מפתח מותאמות אישית בבטחה וכיצד לשחזר חיבור שסומן. המצב הסופי עצמו הוא חלק ממודל העמידות — ראו
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("מצבים סופיים").

**מקור האמת:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## מילות מפתח מובנות

8 תת-המחרוזות האלה חלות תמיד (ללא תלות ברישיות), ללא קשר לרשימה מותאמת אישית כלשהי:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> רשימה זו מתפתחת כאשר ספקים משנים את נוסח הודעות החסימה שלהם. העותק המוסמך
> הוא `ACCOUNT_DEACTIVATED_SIGNALS` בתוך `open-sse/services/accountFallback.ts`;
> יש להתייחס לבלוק שלעיל כאל תמונת מצב.

באותו קובץ קיימות בסמוך שתי טבלאות סימנים **נפרדות**, והן _אינן_ חלק מזיהוי מילות המפתח לחסימה:

- `CREDITS_EXHAUSTED_SIGNALS` — החיוב/המכסה אזלו (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → מצב סופי `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **לא סופי**; רענון האסימון עשוי לאפשר התאוששות.

הערה: ביטויים זמניים נפוצים כגון **`rate limit`** / `429` מטופלים באמצעות מנגנון הגבלת הקצב / תקופת הצינון של החיבור, ו**אינם** סימני חסימה.

## תהליך הזיהוי

```
תגובת שגיאה משירות במעלה הזרם
  → גוף התגובה מומר למחרוזת ולאותיות קטנות
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [התאמת תת-מחרוזת]
  → נמצאה התאמה?
      → connection testStatus = "banned"      (קבוע — תקופת צינון של שנה, ללא התאוששות אוטומטית)
      → אם ההגדרה `autoDisableBannedAccounts` מופעלת ו-`autoDisableBannedScope`
        כוללת את החיבור הזה (`all`, או `subscription` עבור OAuth/קובצי Cookie/הפעלה)
        → גם isActive = false. מפתחות API בתשלום מראש נשארים פעילים כאשר התחום הוא
        `subscription`.
      → המערכת מדלגת על החיבור במהלך בחירת חשבון (סטטוסים משולבים מסוג QUOTA_BLOCKING)
```

- ההתאמה היא חיפוש **תת-מחרוזת ללא תלות ברישיות** בגוף **התגובה**
  (`isAccountDeactivated`, `accountFallback.ts`).
- המעבר הסופי והקבוע ל-`banned` מתבצע כאשר גוף התגובה מכיל סימן חסימה, ב**כל
  סטטוס HTTP** (באמצעות `markAccountUnavailable` → `checkFallbackError`). התווית
  המצומצמת יותר **`deactivated`** (`isActive=false` כאשר לחיבור אין מפתחות API
  חלופיים) נכתבת על ידי הנתיב המוטמע של `chatCore.ts` עבור **HTTP 401 / 403**
  (מסווג באמצעות `classifyProviderError` → `ACCOUNT_DEACTIVATED`). שימו לב שהנתיב
  `markAccountUnavailable()` כותב מצב סופי _שונה_ — **`expired`** — עבור אותו
  סימן `ACCOUNT_DEACTIVATED` (באמצעות `resolveTerminalConnectionStatus`), ולכן
  אותה חסימה עשויה להופיע כ-`deactivated` או כ-`expired`, בהתאם לנתיב שטיפל
  בתגובה. (הערת הקוד הישנה יותר אומרת "כאשר גוף תגובת 401 מכיל את המחרוזות
  האלה" — ניסוח זה מצמצם את ההתנהגות הנוכחית יתר על המידה.)
- חיבור במצב `banned` מוחרג מהבחירה בכל מקום שבו מסוננים מצבים סופיים
  (`isTerminalConnectionStatus`, ‏`QUOTA_BLOCKING_CONNECTION_STATUSES` המשולב).

## תחולה — אילו ספקים נסרקים

**כל הספקים.** הבדיקה פועלת בצינור הטיפול הכללי בשגיאות, שדרכו עוברת
כל בקשה שנכשלה מול שירות upstream — היא **אינה** מוגבלת לסורקי
OAuth/מינויים. המצב הסופי שנוצר הוא לכל **חיבור**,
ולא לכל ספק.

עם זאת, ה_מחרוזות_ המובנות מכוונות לספקי מינויים/OAuth
שבהם קיים סיכון ממשי לחסימה (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). ספק המבוסס על מפתח API יפעיל את הגלאי רק אם גוף השגיאה שלו
מכיל מילולית אחת מתת-המחרוזות.

`autoDisableBannedScope` (`all` | `subscription`, ברירת המחדל היא `all`) קובע אם
התאמה גם משנה את `isActive=false`. הערך `subscription` מתייחס למשתמשים בסגנון התחברות
(מינויים בתשלום וחשבונות חינמיים, לרבות הפעלות מבוססות קובצי cookie בדפדפן). המערכת עדיין
רושמת `testStatus=banned` עבור מפתחות API בתשלום מראש, אך משאירה אותם במאגר
הניתוב. התכנון העמיד הוא דריסה נפרדת לכל ספק ולכל חשבון; ה-enum הגלובלי
הוא המימוש הראשוני.

## מילות מפתח מותאמות אישית לחסימה

הוסיפו או הסירו מילות מפתח תחת **אבטחה → מילות מפתח לחסימה** (נשמרות כהגדרה הגלובלית
`customBannedSignals` באמצעות `PATCH /api/settings`). הן **מתווספות אל**
הרשימה המובנית — לעולם אינן מחליפות אותה — ונטענות מחדש בזמן אמת בעת השמירה (וכן בעת האתחול)
באמצעות `setCustomBannedSignals()`. כל מילת מפתח מוגבלת ל-200 תווים; אין
מגבלה על אורך המערך.

**⚠ סכנת זיהוי חיובי שגוי — בחרו ביטויים ספציפיים.** הזיהוי מבוסס על התאמת תת-מחרוזת גולמית
בכל גוף התגובה, והתאמה היא **קבועה** (תקופת צינון של שנה,
שחזור ידני). מילת מפתח רחבה עלולה לחסום חיבור תקין לחלוטין:

- **גרוע:** `quota`, `limit`, `error`, `denied` — מופיעות בשגיאות זמניות רבות.
- **טוב:** משפטי חסימה מלאים, למשל `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

העדיפו את הביטוי החד-משמעי הארוך ביותר שהספק מחזיר במקרה של חסימה אמיתית. במקרה של
ספק, צפו תחילה ב-`lastError` של החיבור, ולאחר מכן הוסיפו את הניסוח המדויק.

## שחזור חיבור שסומן

מצבים סופיים מסוג `banned` / `deactivated` **לעולם אינם משוחזרים אוטומטית** (הם מוחרגים
מפעולת השחזור היזומה — רק תקופות צינון מסוג `unavailable` משתקמות
מעצמן). מפעיל חייב לנקות אותם במפורש:

1. **בדקו מחדש את החיבור** — פעולת **בדיקה** בלוח הבקרה
   (`POST /api/providers/{id}/test`); בדיקה מוצלחת מאפסת את `testStatus` ל-
   `active` ומנקה את שדות השגיאה.
2. **בצעו אימות מחדש / ערכו את פרטי ההזדהות** — עבור ספקי OAuth, הפעילו מחדש את תהליך
   ההתחברות / הרענון; נתיבי יצירה/ייבוא של ספק מגדירים `isActive = true`.
3. **הפעילו מחדש את החיבור** — אם ההשבתה האוטומטית הגדירה `isActive = false`
   (תחום `all`, או `subscription` עבור חיבור OAuth/cookie/session),
   הפעילו אותו מחדש לאחר תיקון החשבון.

אין לחצן נפרד של "ניקוי דגל חסימה" — השחזור מתבצע באמצעות בדיקה מחדש, אימות מחדש או
הפעלה מחדש, בהתאם לכלל הכללי של מצב סופי המתואר ב-
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## בידוד בדיקות (בדיקת כל המודלים)

**כשל שמקורו בבדיקה** (פעולות בדיקת כל המודלים / בדיקת תקינות המבוצעות
בתוך `runAsProbe`) לעולם אינו מסיר חיבור מהמאגר (#9817): הוא
**נרשם לצורכי נראות** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), אך מדלג על **כל** שינוי בניתוב — תקופות צינון, מצב
סופי (`banned` / `deactivated` / `credits_exhausted`), נעילות לפי מודל,
מפסק המעגל של הספק, מטמון המכסות ל-5 דקות, רענון אסימון OAuth
והשבתה אוטומטית. רק כשל בנתיב של בקשה אמיתית גורם להשבתה. השגיאה
שנרשמה היא שהופכת חשבון מסומן לגלוי בלוח הבקרה בזמן שהוא ממשיך
לשרת תעבורה.

נקודת ההחלטה היחידה היא `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), והיא נבדקת בכל **אתר** שעלול
לשנות מצב ניתוב בעקבות כשל שמקורו בבדיקה:

- `markAccountUnavailable` (`auth.ts`) — רישום בלבד (טקסט גולמי ב-`lastError`,
  וכן `lastErrorType`, `errorCode`, `lastErrorAt`; בכוונה **ללא**
  `backoffLevel`, שהיה מפעיל את הדעיכה האוטומטית בזמן הבחירה ומוחק
  את הרשומה)
- `maybeAutoDisableBannedAccount` — ללא השבתה אוטומטית
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (רישום בלבד,
  ללא מצב סופי `credits_exhausted`), GEO_BLOCKED (ללא החרגה למשך 24 שעות),
  MODEL_NOT_FOUND (ללא `lockModel`), מעבר הכשל של סבב החשבונות במקרה codex 429
  (ללא `markCodexScopeRateLimited`, ללא `rate_limited_until` שמור, ללא
  ניקוי שיוך הפעלה), `persistCodexQuotaState` (ללא כתיבת מצב מכסה,
  ללא פסילת מטמון), `recordKeyHealthStatus` (מסובב תקינות המפתחות
  נותר ללא שינוי)
- רענון OAuth — הן הרענון היזום במחלקת הבסיס של המבצע
  (`base.ts` `execute()`, ללא צריכת סבב של אסימון רענון) והן
  הנתיב התגובתי ל-401/403 ב-`chatCore` (ללא השבתה מסוג `expired`)
- `chat.ts` — מפסק המעגל של הספק ומטמון המכסות ל-5 דקות
  (`markAccountExhaustedFrom429`) לעולם אינם נפגעים

השגיאה שנרשמה היא שהופכת חשבון מסומן לגלוי בלוח הבקרה
בזמן שהוא ממשיך לשרת תעבורה. שימו לב: רשומת הבדיקה שומרת את טקסט השגיאה
ה**גולמי** (ללא חיתוך), בניגוד לחיתוך `slice(0,100)` בנתיב האמיתי.

מפעילים המשתמשים בבדיקת הכול ככלי תחזוקה יכולים לשחזר את ההתנהגות
ההיסטורית (בדיקה נחשבת ליצירה אמיתית) באמצעות אחת מהאפשרויות הבאות:

- ההגדרה `probeCanDisable` (`POST /api/settings` עם
  `{"probeCanDisable": true}`, או עריכה ישירה של `key_value` במסד הנתונים), או
- דגל התכונה **`PROBE_CAN_DISABLE=true`** (משתנה סביבה או דריסה במסד הנתונים; גובר על
  ההגדרה).

מצב בטוח במקרה של כשל: אם חיפוש הדגל או ההגדרות גורם לחריגה, הבידוד נשאר פעיל.

## קובצי מקור

| נושא                               | קובץ                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| טבלאות אותות + התאמה               | `open-sse/services/accountFallback.ts`                                                                        |
| הפיכה לסופי / התמדה                | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| היקף השבתה אוטומטית                | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| סיווג מוטבע                        | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| החרגת שחזור מצב סופי               | `src/lib/quota/connectionRecovery.ts`                                                                         |
| טעינת מילות מפתח מותאמות בזמן ריצה | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| ממשק משתמש להגדרות                 | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
