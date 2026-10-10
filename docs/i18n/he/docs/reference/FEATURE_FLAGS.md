# Feature Flags (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇪🇹 [am](../../../am/docs/reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇳🇴 [no](../../../no/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇱🇰 [si](../../../si/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/FEATURE_FLAGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/FEATURE_FLAGS.md)

---

> מתגי זמן ריצה שמשנים את ההתנהגות של OmniRoute **ללא פריסה מחדש**.
> כל דגל שמופיע כאן מוגדר בקובץ
> [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
> — מקור האמת היחיד. גם לוח הבקרה וגם ה-REST API קוראים
> מהקובץ הזה, ולכן הטבלה שלהלן נוצרת כך שתתאים לו ביחס של 1:1.

---

## מהם דגלי תכונות

דגל תכונה הוא מתג בעל שם (בוליאני או enum), שניתן לשנות את ערכו
בזמן ריצה ולשמור אותו במסד הנתונים, ללא צורך בפריסה מחדש של התהליך. כל
דגל מתואר באמצעות `FeatureFlagDefinition` הכולל `key`,‏ `label`,
‏`description`,‏ `category`,‏ `defaultValue`,‏ `type` ורמז `requiresRestart`.

### סדר ההכרעה

**הערך האפקטיבי** של דגל נקבע באמצעות
[`resolveFeatureFlag()`](../../src/shared/utils/featureFlags.ts) לפי סדר
הקדימויות הבא (הגבוה ביותר גובר):

1. **דריסה ממסד הנתונים** — ערך שמאוחסן בטבלה `key_value` תחת מרחב השמות
   `feature_flags` (מוגדר דרך לוח הבקרה או ה-REST API).
2. **משתנה סביבה** — `process.env[<KEY>]`, אם הוא מוגדר ואינו ריק.
3. **ברירת המחדל של ההגדרה** — ה-`defaultValue` מתוך `featureFlagDefinitions.ts`.

דגל בוליאני נחשב **מופעל** כאשר הערך האפקטיבי שלו הוא `"true"`,
‏`"1"` או `"yes"` (ראו `isFeatureFlagEnabled()`).

> [!NOTE]
> לרוב הדגלים יש גם משתנה סביבה תואם **באותו שם**
> המתועד בקובץ [`ENVIRONMENT.md`](./ENVIRONMENT.md). הדריסה של הדגל ממסד הנתונים
> מקבלת קדימות על פני משתנה הסביבה הזה. דגל עם
> `requiresRestart: true` נשמר באופן מיידי, אך נקרא מחדש רק בעת הפעלת
> התהליך — שינוי שלו מציג כרזת **"הפעלה מחדש של השרת"** בלוח הבקרה.

---

## קטלוג דגלים

82 דגלים ב-6 קטגוריות. **ברירת מחדל** היא ברירת המחדל של ההגדרה — הערך
שבו נעשה שימוש כאשר לא קיימת עקיפה במסד הנתונים או במשתנה סביבה.

### אבטחה (10)

| מפתח                                    | סוג     | ברירת מחדל | תיאור                                                                                                                                                                                                                                                 |
| --------------------------------------- | ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | בוליאני | `false`    | דרישת מפתח API עבור כל הבקשות הנכנסות.                                                                                                                                                                                                                |
| `INPUT_SANITIZER_ENABLED`               | בוליאני | `true`     | הפעלת טיהור קלט עבור כל הבקשות.                                                                                                                                                                                                                       |
| `INJECTION_GUARD_MODE`                  | מנייה   | `off`      | מצב ההגנה מפני הזרקת הנחיות. ערכים: `off`, `warn`, `block`, `redact`.                                                                                                                                                                                 |
| `PII_REDACTION_ENABLED`                 | בוליאני | `false`    | השחרת פרטים מזהים אישיים בבקשות (ללא תלות ב-`INPUT_SANITIZER_MODE`).                                                                                                                                                                                  |
| `PII_RESPONSE_SANITIZATION`             | בוליאני | `false`    | טיהור פרטים מזהים אישיים מתגובות של ספקים.                                                                                                                                                                                                            |
| `PII_RESPONSE_SANITIZATION_MODE`        | מנייה   | `redact`   | מצב טיהור פרטים מזהים אישיים בתגובות. ערכים: `redact`, `warn`, `block`, `off`.                                                                                                                                                                        |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | בוליאני | `true`     | כינוי חלופי מדור קודם: ערך שנשמר במתג של דגל זה בלוח הבקרה נקרא לפני משתנה הסביבה; `false`, `0`, `no` או `off` בכל אחד מהם משביתים את בדיקות המארח של הגנת כתובות ה-URL היוצאות, בדומה ל-`OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`.                     |
| `ALLOW_API_KEY_REVEAL`                  | בוליאני | `false`    | מתן אפשרות למשתמשים מאומתים בלוח הבקרה לחשוף מפתחות API שמורים, במקום לראות ערכים מוסווים בלבד.                                                                                                                                                       |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | בוליאני | `false`    | הכללת קידומת החשבון בשורות יומן AUTH (לדוגמה, "שימוש בחשבון <provider>: abc12345..."). האפשרות מושבתת כברירת מחדל, כך שמזהי חשבונות מושחרים ביומני תהליכים משותפים/מרובי דיירים. ללא תלות במצב ניפוי באגים; החלפת מצב ניפוי באגים אינה חושפת מידע זה. |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | בוליאני | `false`    | כאשר OIDC מופעל, השבתת התחברות באמצעות סיסמה כך שמשתמשים יוכלו לבצע אימות רק באמצעות כניסה יחידה של OIDC. כאשר האפשרות מושבתת (ברירת המחדל), זמינות גם התחברות באמצעות סיסמה וגם התחברות באמצעות OIDC.                                                |

### רשת (23)

| מפתח                                            | סוג     | ברירת מחדל | הפעלה מחדש | תיאור                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------- | ------- | ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false`    | ✓          | הפעלת מצב הסוואה של טביעת אצבע TLS.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false`    |            | מתן אפשרות לנתיבי /v1/audio/* להשתמש בצומתי ספק תואמי OpenAI המתארחים מחוץ ל-localhost. מושבת כברירת מחדל — ניתוב שמע למארח מרוחק משנה את זהות היציאה, ולכן חייב להיות החלטה מפורשת של המפעיל. צומתי loopback מותרים תמיד ואינם מושפעים.                                                                                                                                                                                                                                                     |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false`    |            | מתן אפשרות ל-POST /v1/rerank (ולשלב הדירוג מחדש דרך loopback של מנוע הזיכרון) להשתמש בצומתי ספק תואמי OpenAI המתארחים מחוץ ל-localhost. מושבת כברירת מחדל — ניתוב למארח מרוחק משנה את זהות היציאה, ולכן חייב להיות החלטה מפורשת של המפעיל. צומתי loopback מותרים תמיד; צמתים מרוחקים חייבים לעמוד גם במדיניות כתובות ה-URL היוצאות של הספק.                                                                                                                                                  |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false`    |            | כאשר לא מוקצה proxy לחיבור, בחירה אוטומטית של ה-proxy התקין הראשון מהמאגר. מושבת כברירת מחדל (אחרת כל proxy במאגר הופך לחלופת ברירת מחדל גלובלית — #3332).                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false`    |            | מתן אפשרות לתהליכי OAuth ואימות ספק לעקוף proxy מוצמד ולהתחבר ישירות כאשר בדיקות מקדימות של נגישות ה-proxy נכשלות. מושבת כברירת מחדל משום שהדבר עשוי לשנות את כתובת ה-IP היוצאת.                                                                                                                                                                                                                                                                                                             |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`     |            | במקרה של חריגת רשת (פקיעת זמן, חיבור שנדחה/אופס) במבצע רוטציה מרובה-חשבונות, כאשר לחשבון שנכשל אין proxy ייעודי, החלת תקופת צינון קצרה ודילוג על חשבונות אחרים ללא proxy למשך שאר הבקשה, במקום לנסות כל אחד מהם מחדש. מופעל כברירת מחדל (בטוח: אין שינוי בכתובת ה-IP היוצאת, אלא רק הפחתת הסיכון להשהיה/צינון בחשבונות עם יציאה משותפת). יש להשבית כדי להחזיר את ההעברה המיידית בעת ההשלכה הראשונה מחשבון ללא proxy.                                                                         |
| `ROTATION_ATTRIBUTION`                          | boolean | `false`    |            | הרוטציה של Opencode מתעדת איזה חשבון שירת את הבקשה או שדילגו עליו (מזהים ממוסכים בלבד, לעולם לא מזהי חשבון מלאים), ומקשרת רשומות ביומן ה-proxy לבקשה שלהן, כך שהמפעיל יכול להבחין בין חשבונות שדילגו עליהם לבין חשבונות שלא נעשה בהם שימוש. מושבת כברירת מחדל.                                                                                                                                                                                                                               |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `true`     |            | מאגרי proxy והרוטציה לפי חשבון של Opencode מפסיקים להקצות מחדש proxy שזה עתה נכשל (בדיקת TCP שנדחתה, או תגובת 429 שהתקבלה דרכו) למשך פרק זמן לכל תהליך, שמוכפל בכל הישנות עד לתקרה. לא נכתב סטטוס proxy; כאשר כל המועמדים מושהים, הבחירה נותרת ללא שינוי. מופעל כברירת מחדל; `false` מחזיר בחירה רגילה.                                                                                                                                                                                      |
| `PROXY_POOL_SHARED_EGRESS_ORDER`                | boolean | `false`    |            | עבור ספקים שהמכסה שלהם מחולקת לפי כתובת יציאה, יש לדרג חבר במאגר שחולק כתובת יציאה שנצפתה עם חבר שסורב לאחרונה, מיד לאחר החברים התקינים. משפיע על הסדר בלבד, ולעולם אינו מחריג. דורש את PROXY_SKIP_RECENTLY_FAILED, שמפיק את אות הסירוב שנקרא כאן. מושבת כברירת מחדל.                                                                                                                                                                                                                        |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false`    |            | הצגה בלוח המחוונים, תחת מאגר proxy, של מספר כתובות ה-IP ליציאה שנצפו וששירתו את חבריו במהלך 24 השעות האחרונות, ושל מספר החיבורים שהשתמשו בהן. לקריאה בלבד, מחושב מיומן ה-proxy ולעולם אינו משמש לניתוב. מושבת כברירת מחדל.                                                                                                                                                                                                                                                                   |
| `PROXY_OPERATOR_EGRESS_ENABLED`                 | boolean | `false`    |            | קבלת כתובות שנצפו, עם תאריך, שנשלחו על ידי המפעיל עבור כל חבר במאגר, ומיזוגן עם היומן שנקרא לצורכי תצוגה וסידור המאגר. מושבת כברירת מחדל: נתיב הדחיפה מחזיר 404 וקריאות המאגר מתנהגות בדיוק כפי שהתנהגו קודם.                                                                                                                                                                                                                                                                                |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false`    |            | עבור מבצע OpenCode, יש לעקוב אחר הבית הראשון של גוף תשובת Responses מוזרמת (חלון: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`, ברירת מחדל `15000`). זרם Responses עם 2xx שנותר שקט מעבר לחלון נחשב לתקוע: החשבון מועבר לתקופת צינון והבקשה עוברת פעם אחת לחשבון הבא; תקיעה שנייה נכשלת מיד. מושבת כברירת מחדל: זרמים תקועים ממשיכים להמתין כפי שהם ממתינים כיום, עד לפקיעת זמן ההמתנה למוכנות הזרם.                                                                                                    |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false`    |            | מבצע OpenCode: בעת קבלת 403/451 הנושאת סירוב `user_blocked` (לא חסימה גאוגרפית ולא דחייה של טביעת אצבע ב-Cloudflare), יש להעביר את החשבון שסורב לתקופת צינון ולעבור לחשבון הבא לכל היותר פעם אחת בכל בקשה; סירוב שני מוחזר כפי שהוא, ללא סימון הצלחה. מושבת כברירת מחדל: עקיפת חסימת משתמש מצד השירות במעלה הזרם עלולה להיראות כניסיון התחמקות ולהפיץ את הסימון ברחבי צי החשבונות.                                                                                                           |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false`    |            | מעבר OpenCode: לאחר שני כשלים זמניים רצופים בשירות במעלה הזרם (5xx או 400 ריק), יש להשהות לפני המעבר לחשבון הבא — 1.5 שניות, עם הכפלה בכל כשל נוסף, עד לתקרה של 6 שניות לכל השהיה ו-10 שניות לכל בקשה; ההשהיה מדולגת אם הלקוח מתנתק. גוף הכשל משוחרר לפני ההמתנה. מושבת כברירת מחדל: מעבר הגיבוי נשאר מיידי.                                                                                                                                                                                 |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false`    |            | מעבר OpenCode: יש להשהות את הבקשה לאחר קבלות חוזרות של 429 זמני (או סמן טרי לעומס על המאגר), תוך שליחת פעימת חיים, ולאחר מכן להפעיל מחדש מקטע מוגבל אחד של עד 3 חשבונות עוקבים במקום להתפרס על פני כל צי החשבונות. מושבת כברירת מחדל: כל 429 מעביר לחשבון הבא בדיוק כפי שהיה קודם.                                                                                                                                                                                                           |
| `STREAM_READINESS_STALL_RETRY`                  | boolean | `false`    |            | צ'אט מוזרם: כאשר גוף התשובה הראשון במעלה הזרם נתקע לפני הפקת אירוע שמיש, יש לבצע ניסיון שני מוגבל אחד דרך אותו נתיב ניתוב, עם אותה מכסת זמן למוכנות וללא קנס לחשבון. מושבת כברירת מחדל: גוף ראשון שנתקע מכשיל את הבקשה ללא ניסיון חוזר.                                                                                                                                                                                                                                                      |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false`    |            | בתורות מוזרמים שעברו תרגום, כאשר התור במעלה הזרם אינו מכיל תוכן שמיש (השלמה הכוללת הנמקה בלבד או אפס מקטעים בעלי ערך), יש לבצע ניסיונות חוזרים מוגבלים דרך נתיב פרטי האימות הרגיל (עד `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX`) לפני שמשהו נחשף ללקוח. מושבת כברירת מחדל: תורות ריקים שומרים על ההתנהגות הנוכחית (200 ריק או 502 עקב תוכן ריק).                                                                                                                                                |
| `OPENCODE_POOL_RESELECT`                        | boolean | `false`    |            | מעבר OpenCode: לאחר קבלת 429 מספק שהמכסה שלו מחולקת לפי כתובת יציאה, בחשבון ללא proxy הנמצא בהקשר מאגר סביבתי, יש לבקש ממאגר החיבורים חבר אחר עבור הניסיון הבא במקום לנסות שוב עם אותה כתובת יציאה. משפיע על הסדר ולעולם אינו מחריג: מאגר שמוצה שומר על ההתנהגות הנוכחית. מושבת כברירת מחדל: כל 429 מעביר לחשבון הבא בדיוק כפי שהיה קודם.                                                                                                                                                    |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false`    |            | רוטציית OpenCode: עצור את גל החשבונות עם שגיאת 429 הראשונה שסווגה כהגבלת קצב אמיתית (`Retry-After` שניתן לניתוח, או גוף שמציין מגבלת קצב/שימוש), והחזר את שגיאת ה-429 ממעלה הזרם ללא שינוי. שגיאות 429 שלא סווגו ממשיכות ברוטציה. כבוי כברירת מחדל: הרובד החינמי מוגבל לפי כתובת IP יוצאת (#9611), לכן כל שגיאת 429 גורמת לרוטציה, וגל שמיצה את כל האפשרויות מחזיר את שגיאת ה-429 האחרונה ממעלה הזרם.                                                                                        |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false`    | ✓          | השבת אימות של אישורי TLS עבור פרוקסי ה-MITM. **מסוכן.**                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false`    |            | משבית את בדיקות המארח של מגן כתובות ה-URL היוצאות, כולל חסימת מטא-נתונים בענן, בעת אימות כתובות URL של ספקים, גילוי מודלים, כתובות URL בסיסיות של צומתי ספקים ובדיקת חלופת הפרוקסי, ומתיר יעדי webhook פרטיים. כתובות URL מקומיות וברשת LAN כבר מותרות כברירת מחדל בנתיבי האימות, הגילוי וצומתי הספקים (`OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`); בדיקת חלופת הפרוקסי ויעדי webhook פרטיים מתחשבים רק ב-`OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS` וחוסמים מארחים מקומיים/ברשת LAN כאשר הוא כבוי. |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`     |            | אפשר כתובות URL של ספקים בכתובות מקומיות/פרטיות (127.0.0.1, localhost, LAN). מופעל כברירת מחדל (גישה המעדיפה משאבים מקומיים): במצב זה המגן חוסם נקודות קצה של מטא-נתונים בענן (כל הטווח 169.254.0.0/16 וכן שמות המארחים המוכרים של מטא-נתונים). השבת כדי לאפשר חסימה מחמירה של כתובות ציבוריות בלבד: גם מארחים פרטיים ומארחי loopback נחסמים.                                                                                                                                                |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false`    | ✓          | הפעל מצב ספק תואם Claude Code.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

### מדיניות (5)

| מפתח                            | סוג     | ברירת מחדל | תיאור                                                                                                                                                                    |
| ------------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | מצב אכיפת מדיניות לשימוש בכלים. ערכים: `disabled`, `warn`, `block`.                                                                                                      |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | הפעל אוטומטית הגבלת קצב על סמך דפוסי שימוש.                                                                                                                              |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | דלג על בדיקת חלון ההקשר / המספר המרבי של אסימוני קלט המקומית של OmniRoute עבור בקשות ישירות למודל יחיד. המגבלות במעלה הזרם עדיין חלות.                                   |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | דחה בקשות לפני ניתובן כאשר למודל היעד חסרות היכולות הנדרשות (ראייה, כלים, פלט מובנה, חלון הקשר). מגן על בקשות ישירות לספק יחיד שעוקפות את מסנן התאימות של שכבת השילובים. |
| `RADAR_ENABLED`                 | boolean | `false`    | הפעל את מודול OmniRoute Radar (מסכי פיד הקטלוג והסנכרון). כבוי כברירת מחדל; ההפעלה רק פותחת את ממשק המשתמש — סנכרון הנתונים נותר אפשרות נפרדת הדורשת הצטרפות.            |

### זמן ריצה (34)

| מפתח                                        | סוג     | ברירת מחדל | הפעלה מחדש | תיאור                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------- | ------- | ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | בוליאני | `true`     |            | יצירה והזרקה של סיכומי שיחה כאשר ניתוב משולב עובר בין מודלים. השביתו אפשרות זו כדי להתייחס למעברים בין מודלים באופן עצמאי ולמנוע בקשות העברה ברקע עבור כל השילובים הקיימים והעתידיים.                                                                                                                                                                                                                                                                                                                                                      |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | בוליאני | `true`     |            | הסרת פריטי פלט פנימיים משלב הפרשנות מזרמי ההעברה הישירה של Responses API לפני העברתם ללקוחות. השביתו אפשרות זו כדי לקבל את הפרשנות הגולמית ממקור השירות.                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | בוליאני | `false`    |            | אכיפת הגבלות היקף על הגישה לכלי MCP.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | בוליאני | `false`    |            | דחיסת תיאורי כלי MCP כדי להפחית את השימוש בטוקנים.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | בוליאני | `false`    |            | הפעלת עיבוד משימות רקע בזמן ריצה.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | בוליאני | `false`    | ✓          | השבתת כל שירותי הרקע (רענון מכסה, סנכרון וכו').                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false`    |            | מתן אמון במסנני RTK ברמת הפרויקט ללא אימות.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`     | ✓          | הפעלת שרת WebSocket של לוח המחוונים בזמן אמת בעת הייבוא (יציאה 20132 כברירת מחדל).                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`     |            | מתן אפשרות ל-Codex להשתמש בתעבורת Responses-over-WebSocket. כאשר האפשרות כבויה, Codex חוזר להשתמש ב-HTTP Responses.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`     |            | מתן אפשרות ל-Codex להשתמש בתעבורת JSON-RPC של WebSocket בשרת היישומים המקומי (codexTransport=app-server). כאשר האפשרות כבויה, חיבורים שהוגדרו להשתמש ב-app-server חוזרים להשתמש בתעבורות האחרות של Codex.                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`     |            | ניתוב בקשות שמיצו את התקציב אל הספק/המודל החינמי לשעת חירום. (ראו [חלופה לשעת חירום במקרה של מיצוי התקציב](#emergency-budget-fallback) להלן.)                                                                                                                                                                                                                                                                                                                                                                                              |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false`    |            | הפעלת ניסיון חוזר מוקדם ושקוף עבור זרמי SSE קטועים במעלה הזרם, לפני שבתי תגובה כלשהם מגיעים ללקוח.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false`    |            | מתן אפשרות לשחזור זרם לבקש מחדש תגובה ולחבר אותה לאחר שבתי תגובה כבר הגיעו ללקוח.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false`    |            | הפיכת ההמשך באמצע הזרם לבטוח עבור קריאות לכלים: לעולם אין לחדש זרם שנקטע לאחר שנפלטה קריאה לכלי (בביצוע או שכבר הסתיימה עם finish_reason מסוג tool_calls), ויש לסגור לאחר המשך ריק אחד במקום לנצל את התקציב כולו. כבוי: התנהגות גרסת ההפצה.                                                                                                                                                                                                                                                                                                |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false`    |            | בצע מעבר לגיבוי פעם אחת לחיבור מקביל כאשר זרם SSE נסגר לפני שנפלטה מסגרת שימושית כלשהי ולאחר שמוצה הניסיון החוזר המוגבל באותו חיבור; אם אין חיבור מקביל שמיש, מוחזרת שגיאת 502 המקורית מסוג `STREAM_EARLY_EOF`. כבוי כברירת מחדל: EOF מוקדם נשאר סופי לאחר הניסיון החוזר באותו חיבור.                                                                                                                                                                                                                                                      |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`     |            | כלול שדות שם ידידותיים לתצוגה בתגובות `/v1/models`. השבת עבור לקוחות המצפים למזהי מודלים בלבד.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`     |            | קובע כיצד מתווספות קידומות למזהי מודלים ב-/v1/models. ‏'dual' (ברירת המחדל) מפיק הן קידומות כינוי והן קידומות מזהה ספק קנוניות, לצורך תאימות לאחור. ‏'alias' מפיק רק את קידומת הכינוי הקצרה (לדוגמה, ds-web/model ולא deepseek-web/model). ‏'canonical' מפיק רק את קידומת מזהה הספק המלאה. ערכים: `dual`, `alias`, `canonical`.                                                                                                                                                                                                            |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`     |            | אפשר סנכרון ELO תקופתי של טבלת המובילים Arena AI עבור דירוגי אינטליגנציית מודלים.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false`    |            | פרסם מזהי מראה מסוג `claude/<provider>/<model>` ב-`/v1/models`, כדי שגילוי המודלים של שער Claude Code יציג מודלים שאינם Claude. הרמה הגלובלית של השער התלת-רמתי (משתנה הסביבה גובר על הדריסה בלוח הבקרה). ראו [תצורת Claude Code](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker).                                                                                                                                                                                                |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`     |            | מתג ראשי עבור כינויי השער no-think/<provider>/<model>. כאשר מופעל (ברירת המחדל): /v1/models מפרסם וריאנט ללא חשיבה עבור כל מודל Claude מתאים התומך בחשיבה, ומזהה no-think/ שנשלח בבקשה מפוענח בחזרה למודל האמיתי תוך דיכוי ההנמקה. כאשר מושבת: לא מפורסמים וריאנטים, ומזהה no-think/ מטופל כמו כל מזהה מודל לא מוכר אחר. בחירת ההצטרפות/הפרישה לכל מודל באמצעות ModelSpec.noThinkingAlias עדיין חלה כאשר אפשרות זו מופעלת.                                                                                                                 |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false`    |            | השבת את היצירה של וריאנטים לרמות חשיבה (לדוגמה, ‎-low,‏ ‎-medium,‏ ‎-high) בקטלוג /v1/models.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false`    | ✓          | אפשר נתיבי קבלה וירטואליים מסתגלים לכל דייר עבור שיגור לספק (#9654): התפרצות של דייר אחד לא תגרום עוד לשגיאת 503 אצל דייר אחר. משתנה הסביבה OMNIROUTE_CHAT_VIRTUAL_LANES גובר על דריסה זו בלוח הבקרה; השינויים נכנסים לתוקף לאחר הפעלת השרת מחדש.                                                                                                                                                                                                                                                                                          |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false`    |            | פרסום מזהי מראה מסוג <gateway-alias>/<model> בנתיב /v1/models עבור מודלים שלבעלים הקנוני שלהם אין אישור פעיל, אך שער העברה עם אישור פעיל מנתב אותם. אזהרה: כאשר האפשרות מופעלת באופן גלובלי, היא מוסיפה רשומות לקטלוג עבור כל הלקוחות.                                                                                                                                                                                                                                                                                                     |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false`    |            | הפעלת זיהוי יתרה עבור צמתים התואמים לצוברי New-API / One-API / Sub2API. כאשר האפשרות מופעלת, צמתים תואמים שדגל הצובר מוגדר בהם ידווחו על היתרה שלהם בלוח המחוונים ובניתוב בדיקת המכסה המקדימה.                                                                                                                                                                                                                                                                                                                                             |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false`    |            | המשך קריאות לכלים שבבעלות השרת שאינן בהזרמה, עד שהמודל מחזיר תגובה הניתנת לשימוש הלקוח.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false`    |            | סטטיסטיקות חיפוש וחיפושים אחרונים סופרים רק ספקים שעדיין יש להם חיבור פעיל (ספקים ללא מפתח, כגון duckduckgo-free, נספרים תמיד). כאשר האפשרות כבויה, כל שורת חיפוש שנשמרה עם מזהה ספק נשארת.                                                                                                                                                                                                                                                                                                                                                |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false`    |            | דפי ספקים בלוח המחוונים: הצגת תג Free רק לפי אותות שהספק מכבד — ללא היוריסטיקת שם התצוגה, שדות חינמיות שאינם בוליאניים וסיומות :free אצל ספקים רשומים שאין להם מסלול חינמי מתועד. כאשר האפשרות כבויה, כלל התג ההיסטורי נשמר.                                                                                                                                                                                                                                                                                                               |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false`    |            | בתגובות אי־זמינות מצטברות מסוג 429/503, השמטת `Retry-After` כאשר לא ידוע מועד קונקרטי לניסיון חוזר בעתיד (במקום ערך מלאכותי של שנייה אחת), הוספת `error.retry_after_provenance` (`signal` \| `none`), ואפשרות לנתיבי ריקון משולבים לקרוא רמזים מילוליים לניסיון חוזר מגופי JSON ומגופי טקסט פשוט של שירותי המקור. השדה מופיע רק בתגובות שנבנו באמצעות `unavailableResponse()`; גופי 429/503 אחרים נותרים ללא שינוי.                                                                                                                        |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false`    |            | כאשר יעד משולב מסוג `priority`, המסומן כיעד חלופי רק בעת מיצוי המכסה, עוצר את השילוב מסיבה שניתן להוכיח שאינה קשורה למכסה (מפסק הזרם של הספק פתוח, דילוג עקב חיזוי השהיה), החזרת 502 במקום 503 שנראה כאילו הוא קשור למכסה. עצירות עקב נעילה, תקופת צינון, אי־זמינות, מיצוי והגבלת מקביליות ממשיכות להחזיר 503.                                                                                                                                                                                                                             |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false`    |            | תגובת Mistral 401 בסיסית (`{"detail":"Unauthorized"}`, ללא אות אימות מפורש) זהה עבור מפתח שבוטל ועבור מכסה שמוצתה. כאשר האפשרות מופעלת, החיבור מועבר לתקופת צינון במקום לסמנו כ־`expired`, לכל היותר 3 פעמים בשעה לכל חיבור; בפעם הבאה הוא מסומן כך, ולכן מפתח שבוטל עדיין מגיע בסופו של דבר למצב זה. האפשרות כבויה כברירת מחדל: כל תגובת Mistral 401 בסיסית מסמנת את החיבור כמו בעבר.                                                                                                                                                     |
| `GROK_SUBSCRIPTION_IMAGES_ENABLED`          | boolean | `false`    |            | רישום נתיבי התמונות של xai-oauth (xao) ושל grok-cli ומיפוי האיכות high/hd של OpenAI לאיכות medium של xAI. מושבת כברירת מחדל: נתיב התמונות של xAI באמצעות מפתח API ממשיך להשתמש בבקשה הקיימת התואמת ל-OpenAI, ונתיבי המינוי אינם נרשמים.                                                                                                                                                                                                                                                                                                    |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `true`     |            | אחזור קטלוג המודלים העדכני של xAI עבור חיבורי xai-oauth מתוך https://api.x.ai/v1/models באמצעות אסימון הנושא מסוג OAuth, במקום מאגר האתחול הסטטי והקבוע. מופעל כברירת מחדל. הגדירו את הדגל כ-`false` כדי להמשיך לספק את מאגר האתחול הסטטי. כשלי HTTP גורמים לחזרה למאגר האתחול בנתיב הגילוי; פונקציית קריאת הדגל עצמה אינה מבצעת בקשת HTTP.                                                                                                                                                                                                |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false`    |            | מתן אפשרות לסריקת הניקוי האוטומטית למחוק משימות Batch API סופיות (שהושלמו/נכשלו/בוטלו/פג תוקפן) שגילן עולה על `OMNIROUTE_BATCH_RETENTION_DAYS`, יחד עם נקודות הביקורת שלהן לכל שורה, ולנקות את תוכן ה-BLOB של קבצים שהועלו לאחר שחלף ערך `expires_at` שלהם. מושבת כברירת מחדל: בכל התקנה קיימת הנתונים נשמרים בדיוק כפי שנשמרו קודם לכן, עד שמפעיל המערכת בוחר להפעיל אפשרות זו. הנתיב `DELETE /api/v1/batches/delete-completed`, שמופעל בידי המפעיל, אינו מושפע מכך בשום מצב — זהו חוזה API ציבורי נפרד ובלתי מותנה.                      |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false`    |            | שמירת חשבון Antigravity שנבחר למשך מחזור החיים של הזרמת הבקשה שבחרה בו, כך שניסיון חוזר מקביל או העברת פרטי הכניסה לא יוכלו לבחור מחדש חשבון שכבר הוקצה לזרם בתהליך. השמירה מוגבלת להקשר של (חיבור, מודל upstream שניתן לקריאה), ולכן חשבון אחד עדיין יכול לשרת שני מודלים שונים בו-זמנית. כאשר כל החשבונות המתאימים כבר שמורים עבור מודל זה, הבקשה מחזירה תגובת 503 מובנית מסוג `antigravity_pool_busy` עם ערך `Retry-After` מוגבל, במקום להעמיס על חשבון עסוק. מושבת כברירת מחדל: בחירת החשבון נשארת בדיוק כפי שהייתה, ולא מתבצעת שמירה. |

### CLI‏ (5)

| מפתח                                  | סוג     | ברירת מחדל | הפעלה מחדש | תיאור                                                                                                                                                                                                                    |
| ------------------------------------- | ------- | ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CLI_COMPAT_ALL`                      | boolean | `false`    | ✓          | הפעלת מצב תאימות עבור כל לקוחות ה-CLI.                                                                                                                                                                                   |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false`    |            | הפעלת שכבת התאימות לכינויי מודלים.                                                                                                                                                                                       |
| `PRICING_SYNC_ENABLED`                | boolean | `false`    |            | הפעלת סנכרון אוטומטי של נתוני תמחור (דורש גם את משתנה הסביבה `PRICING_SYNC_ENABLED`).                                                                                                                                    |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false`    |            | לאחר סנכרון מודלים של ספק, כתיבה או שכתוב אוטומטיים של קובצי הפרופיל ~/.codex/*.config.toml מתוך הקטלוג העדכני. תצורת Codex הפעילה/המוגדרת כברירת מחדל לעולם אינה משתנה. מושבת כברירת מחדל.                              |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false`    |            | לאחר סנכרון מודלים של ספק, כתיבה או שכתוב אוטומטיים של פרופילי Claude Code מסוג ~/.claude/profiles/<name>/settings.json מתוך הקטלוג העדכני. תצורת Claude הפעילה/המוגדרת כברירת מחדל לעולם אינה משתנה. מושבת כברירת מחדל. |

### תקינות (5)

| מפתח                                      | סוג     | ברירת מחדל | תיאור                                                                                                                                                                                                                                      |
| ----------------------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false`    | השבתת נקודת הקצה לבדיקת התקינות של המופע המקומי.                                                                                                                                                                                           |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false`    | השבתת בדיקת התקינות של אימות האסימון.                                                                                                                                                                                                      |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false`    | הפעלת גישה לרשת בסביבת ארגז החול של המיומנויות.                                                                                                                                                                                            |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false`    | בסריקת התקינות של שרתי ה-proxy, בדיקה שהיעד דחה (401/403/429) מאפסת את רצף הכשלים של ה-proxy. מושבת כברירת מחדל: דחייה נשארת ניטרלית (#10654). תגובת 5xx נשארת לא חד-משמעית בכל מקרה; דחייה לעולם אינה מסירה, משביתה או מפעילה מחדש proxy. |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false`    | הפעלת בדיקת התקינות/שלמות של מסד הנתונים בעת האתחול לאחר שהשרת מתחיל לקבל בקשות (באמצעות `setImmediate`), במקום לחסום את האתחול עד להשלמתה (#13717). מושבת כברירת מחדל: האתחול נחסם בדיוק כפי שהיה לפני PR זה.                             |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` והכינוי הקודם שלו
> `INJECTION_GUARD_BLOCK_THRESHOLD` מכווננים את מצב `block` של
> `INJECTION_GUARD_MODE`, אך אלה משתני סביבה רגילים הנקראים על ידי
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts),
> ולא דגלי תכונות: אין להם דריסה דרך מסד הנתונים ואין להם מתג בלוח הבקרה. ראו
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication).

> [!NOTE]
> העמודה `Restart` מסמנת דגלים עם `requiresRestart: true` — הערך
> נשמר באופן מיידי, אך נכנס לתוקף רק לאחר טעינת התהליך מחדש. דגלי enum
> דוחים כל ערך שאינו נכלל בקבוצת הערכים המותרת שלהם (מאומת בצד השרת הן
> ב-`setFeatureFlagOverride()` והן במטפל `PUT` של REST).

---

## החלפת מצב דגלים

### לוח מחוונים

נווט אל **לוח מחוונים ← הגדרות ← דגלי תכונות**
(`/dashboard/settings/feature-flags`). הרשת
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
תומכת ב:

- **חיפוש** לפי מפתח או תיאור, ו**סינון** לפי קטגוריה (בנוסף לתצוגה סינתטית של
  **דורש הפעלה מחדש**).
- **מתג** עבור דגלים בוליאניים ו**תפריט נפתח** עבור דגלי enum
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`).
- **תג מקור** לכל דגל — `DB`, `ENV`, או `DEF` — המציג מאין הגיע הערך האפקטיבי.
- כפתור **איפוס** (מוצג רק עבור דגלים שמקורם ב-`DB`) כדי לבטל את הדריסה,
  וכפתור **איפוס כל הדריסות** בתחתית.
- באנר של **הפעלת שרת מחדש** כאשר דגל `requiresRestart` משתנה.

### ממשק API של REST

כל הפעולות עוברות דרך נתיב יחיד:
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts).
כל שיטה דורשת סשן לוח מחוונים מאומת (`401` אחרת).

#### `GET /api/settings/feature-flags`

מחזיר כל דגל עם ערכו האפקטיבי, מקורו וסיכום.

```jsonc
{
  "flags": [
    {
      "key": "REQUIRE_API_KEY",
      "label": "Require API Key",
      "description": "Require an API key for all incoming requests",
      "category": "security",
      "type": "boolean",
      "enumValues": null,
      "defaultValue": "false",
      "effectiveValue": "false",
      "source": "default", // "db" | "env" | "default"
      "requiresRestart": false,
      "warningLevel": "caution",
    },
    // ... כל 77 הדגלים
  ],
  "summary": {
    "total": 56,
    "active": 0,
    "inactive": 0,
    "overriddenByDb": 0,
    "overriddenByEnv": 0,
  },
}
```

#### `PUT /api/settings/feature-flags`

הגדר או הסר דריסה בודדת. גוף הבקשה: `{ key: string; value?: string }`.
השמטת `value` מסירה את הדריסה (ומחזירה את ערך הסביבה / ברירת המחדל).

```bash
# Set a DB override
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# Remove the override (no "value")
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

התגובה מחזירה את ה-`effectiveValue`/`source` החדשים, ה-`previousValue`/
`previousSource` הקודמים, ואת `requiresRestart`. מפתחות לא ידועים וערכי enum
מחוץ לטווח נדחים עם `400`.

#### `DELETE /api/settings/feature-flags`

מנקה **את כל** דריסות ה-DB בבת אחת, ומחזיר כל דגל לערך הסביבה / ברירת המחדל שלו.
מחזיר `{ cleared: <count>, message: "..." }`.

> [!NOTE]
> דגלים עם `requiresRestart: true` נכנסים לתוקף רק לאחר טעינה מחדש של התהליך.
> תהליך ההפעלה מחדש של לוח המחוונים קורא ל-`POST /api/restart` ולאחר מכן בודק באופן מחזורי את
> `GET /api/health/ping` עד שהשרת חוזר לפעולה.

---

## מעבר חירום חלופי במקרה של חריגה מהתקציב

`OMNIROUTE_EMERGENCY_FALLBACK` (קטגוריה `runtime`, ברירת מחדל `true`) שולט בנתיב החירום למעבר לספק חלופי חינמי ב-[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts).
כאשר האפשרות מופעלת, בקשות שממצות את התקציב שלהן מנותבות לספק/מודל חלופי חינמי במקום להיכשל לחלוטין. הגדירו אותה כ-`false` (או `0`) — באמצעות המתג בלוח הבקרה, דריסה במסד הנתונים או משתנה הסביבה `OMNIROUTE_EMERGENCY_FALLBACK` — כדי להשבית התנהגות זו ולאפשר לבקשות שמיצו את התקציב להיכשל. (מוצג כמתג בלוח הבקרה ב-PRs #3741 / #3752.)

תגובה שהתקבלה באמצעות מנגנון חלופי זה כוללת את הכותרת
`X-OmniRoute-Emergency-Fallback: from=<provider/model>; to=<provider/model>`, כך שלקוח יכול לדעת שהבקשה נותבה מחדש מבלי להשוות את `X-OmniRoute-Provider` לבקשה שלו. הכותרת אינה קיימת באף תגובה אחרת.

---

## ראו גם

- [מסמך עזר למשתני סביבה](./ENVIRONMENT.md) — לרוב הדגלים יש משתנה סביבה
  בעל שם זהה המתועד שם (הדריסה במסד הנתונים מקבלת
  עדיפות על פניו).
- [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
  — מקור האמת לכל דגל.
- [`src/shared/utils/featureFlags.ts`](../../src/shared/utils/featureFlags.ts)
  — לוגיקת ההכרעה (`resolveFeatureFlag`, `isFeatureFlagEnabled`,
  `resolveAllFeatureFlags`).
- [`src/lib/db/featureFlags.ts`](../../src/lib/db/featureFlags.ts) — שמירת הדריסות במסד הנתונים
  במרחב השמות `feature_flags` של הטבלה `key_value`.
