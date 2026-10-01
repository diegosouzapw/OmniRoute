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

80 דגלים ב-6 קטגוריות. **ברירת מחדל** היא ברירת המחדל המוגדרת — הערך
שנעשה בו שימוש כאשר לא קיימת דריסה במסד הנתונים ולא קיים משתנה סביבה.

### אבטחה (10)

| מפתח                                    | סוג     | ברירת מחדל | תיאור                                                                                                                                                                                                                                                     |
| --------------------------------------- | ------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | בוליאני | `false`    | דרישת מפתח API עבור כל הבקשות הנכנסות.                                                                                                                                                                                                                    |
| `INPUT_SANITIZER_ENABLED`               | בוליאני | `true`     | הפעלת טיהור קלט עבור כל הבקשות.                                                                                                                                                                                                                           |
| `INJECTION_GUARD_MODE`                  | מנייה   | `off`      | מצב ההגנה מפני הזרקת הנחיות. ערכים: `off`, `warn`, `block`, `redact`.                                                                                                                                                                                     |
| `PII_REDACTION_ENABLED`                 | בוליאני | `false`    | השחרת PII בבקשות (ללא תלות ב-`INPUT_SANITIZER_MODE`).                                                                                                                                                                                                     |
| `PII_RESPONSE_SANITIZATION`             | בוליאני | `false`    | טיהור PII מתגובות הספק.                                                                                                                                                                                                                                   |
| `PII_RESPONSE_SANITIZATION_MODE`        | מנייה   | `redact`   | מצב טיהור PII בתגובות. ערכים: `redact`, `warn`, `block`, `off`.                                                                                                                                                                                           |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | בוליאני | `true`     | חסימת בקשות יוצאות לטווחי כתובות IP פרטיים/פנימיים.                                                                                                                                                                                                       |
| `ALLOW_API_KEY_REVEAL`                  | בוליאני | `false`    | מתן אפשרות למשתמשים מאומתים בלוח הבקרה לחשוף מפתחות API שמורים, במקום לראות ערכים מוסווים בלבד.                                                                                                                                                           |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | בוליאני | `false`    | הכללת קידומת החשבון בשורות יומן AUTH (לדוגמה, "שימוש בחשבון <provider>: abc12345..."). אפשרות זו מושבתת כברירת מחדל, כך שמזהי חשבונות מושחרים ביומני תהליכים משותפים/מרובי דיירים. ללא תלות במצב ניפוי שגיאות; שינוי מצב ניפוי השגיאות אינו חושף מידע זה. |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | בוליאני | `false`    | כאשר OIDC מופעל, השבתת כניסה באמצעות סיסמה כך שמשתמשים יוכלו לבצע אימות רק באמצעות כניסה יחידה של OIDC. כאשר האפשרות מושבתת (ברירת המחדל), זמינות גם כניסה באמצעות סיסמה וגם כניסה באמצעות OIDC.                                                          |

### רשת (22)

| מפתח                                            | סוג     | ברירת מחדל | הפעלה מחדש | תיאור                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------- | ------- | ---------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false`    | ✓          | הפעלת מצב הסוואה של טביעת אצבע של TLS.                                                                                                                                                                                                                                                                                                                                                              |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false`    |            | מתן אפשרות לנתיבי /v1/audio/* להשתמש בצומתי ספק תואמי OpenAI המתארחים מחוץ ל-localhost. מושבת כברירת מחדל — ניתוב שמע למארח מרוחק משנה את זהות היציאה, ולכן חייב להיות החלטה מפורשת של המפעיל. צומתי loopback מותרים תמיד ואינם מושפעים.                                                                                                                                                            |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false`    |            | מתן אפשרות ל-POST /v1/rerank (ולשלב הדירוג מחדש ב-loopback של מנוע הזיכרון) להשתמש בצומתי ספק תואמי OpenAI המתארחים מחוץ ל-localhost. מושבת כברירת מחדל — ניתוב למארח מרוחק משנה את זהות היציאה, ולכן חייב להיות החלטה מפורשת של המפעיל. צומתי loopback מותרים תמיד; צמתים מרוחקים חייבים גם לעמוד במדיניות כתובות ה-URL היוצאות של הספק.                                                           |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false`    |            | כאשר לא מוקצה proxy לחיבור, בחירה אוטומטית של ה-proxy התקין הראשון מתוך המרשם. מושבת כברירת מחדל (אחרת כל proxy במרשם הופך לחלופה גלובלית — #3332).                                                                                                                                                                                                                                                 |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false`    |            | מתן אפשרות לתהליכי OAuth ואימות ספק לעקוף proxy מוצמד ולהתחבר ישירות כאשר בדיקות מקדימות של נגישות ה-proxy נכשלות. מושבת כברירת מחדל מכיוון שהדבר עלול לשנות את כתובת ה-IP של היציאה.                                                                                                                                                                                                               |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`     |            | בעת חריגת רשת (פסק זמן, חיבור שנדחה/אופס) במבצע רוטציה מרובה-חשבונות, כאשר לחשבון שנכשל אין proxy ייעודי, החלת תקופת צינון קצרה ודילוג על חשבונות אחרים ללא proxy למשך שאר הבקשה, במקום לנסות כל אחד מהם מחדש. מופעל כברירת מחדל (בטוח: אין שינוי בכתובת ה-IP של היציאה; רק מצמצם את סיכון ההשהיה/הצינון בחשבונות בעלי יציאה משותפת). השבתה משחזרת הפצה מיידית בעת החריגה הראשונה בחשבון ללא proxy. |
| `ROTATION_ATTRIBUTION`                          | boolean | `false`    |            | רוטציית Opencode מתעדת איזה חשבון שירת את הבקשה או שנעשה עליו דילוג (מזהים מוסווים בלבד, לעולם לא מזהי חשבון מלאים), ומקשרת רשומות יומן של proxy לבקשה שלהן, כדי שהמפעיל יוכל להבחין בין חשבונות שנעשה עליהם דילוג לבין חשבונות שלא נעשה בהם שימוש. מושבת כברירת מחדל.                                                                                                                              |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `true`     |            | מאגרי proxy והרוטציה של Opencode לכל חשבון מפסיקים להגיש מחדש proxy שזה עתה נכשל (בדיקת TCP שנדחתה, או תגובת 429 שהתקבלה דרכו), למשך פרק זמן לכל תהליך שמוכפל בכל הישנות, עד לתקרה. לא נכתב סטטוס proxy; כאשר כל המועמדים מושהים, הבחירה אינה משתנה. מופעל כברירת מחדל; `false` משחזר בחירה רגילה.                                                                                                  |
| `PROXY_POOL_SHARED_EGRESS_ORDER`                | boolean | `false`    |            | עבור ספקים שהמכסה שלהם מחולקת לפי כתובת יציאה, דירוג חבר במאגר שחולק את כתובת היציאה שנצפתה של חבר שנדחה לאחרונה מיד מתחת לחברים תקינים. משפיע על הסדר בלבד, ולעולם אינו מחריג. דורש את PROXY_SKIP_RECENTLY_FAILED, שמפיק את אות הדחייה הנקרא על ידו. מושבת כברירת מחדל.                                                                                                                            |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false`    |            | הצג תחת מאגר פרוקסי בלוח הבקרה כמה כתובות IP נצפות ליציאה שירתו את חבריו במהלך 24 השעות האחרונות וכמה חיבורים השתמשו בהן. לקריאה בלבד, מחושב מיומן הפרוקסי ולעולם אינו משמש לניתוב. כבוי כברירת מחדל.                                                                                                                                                                                               |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false`    |            | עבור המבצע של OpenCode, עקוב אחר הבית הראשון של גוף תשובת Responses מוזרמת (חלון: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`, ברירת מחדל `15000`). זרם Responses עם קוד 2xx שנשאר שקט מעבר לחלון נחשב לתקוע: החשבון מועבר להשהיה והבקשה עוברת לחשבון הבא פעם אחת; תקיעה שנייה נכשלת מיד. כבוי כברירת מחדל: זרמים תקועים ממשיכים בהמתנה הנהוגה כיום עד לפקיעת הזמן הקצוב למוכנות הזרם.                        |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false`    |            | מבצע OpenCode: בעת קבלת 403/451 הכוללת סירוב `user_blocked` (לא סירוב גאוגרפי ולא דחייה עקב טביעת אצבע של Cloudflare), העבר את החשבון שסורב להשהיה ועבור לחשבון הבא לכל היותר פעם אחת בכל בקשה; סירוב שני מוחזר כפי שהוא, ללא סימון הצלחה. כבוי כברירת מחדל: ניתוב מסביב לחסימת משתמש מצד שירות המקור עלול להיראות כהתחמקות ולהפיץ את הסימון בכל צי החשבונות.                                       |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false`    |            | מעבר בין חשבונות ב-OpenCode: לאחר שני כשלים זמניים רצופים בשירות המקור (5xx או 400 עם גוף ריק), השהה לפני המעבר לחשבון הבא — 1.5 שניות עם הכפלה בכל כשל נוסף, עד לתקרה של 6 שניות לכל השהיה ו-10 שניות לכל בקשה; ההשהיה מדולגת בעת ניתוק הלקוח. גוף התשובה שנכשלה משוחרר לפני ההמתנה. כבוי כברירת מחדל: המעבר בעת כשל נשאר מיידי.                                                                   |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false`    |            | מעבר בין חשבונות ב-OpenCode: החנה את הבקשה לאחר תגובות 429 זמניות חוזרות (או סמן חדש של עומס במאגר) תוך שליחת פעימות חיים, ולאחר מכן הפעל מחדש מקטע מוגבל אחד של עד 3 חשבונות עוקבים במקום להתפרס על פני כל צי החשבונות. כבוי כברירת מחדל: כל 429 גורם למעבר לחשבון הבא בדיוק כמו קודם.                                                                                                             |
| `STREAM_READINESS_STALL_RETRY`                  | boolean | `false`    |            | צ'אט בהזרמה: כאשר גוף התשובה הראשון משירות המקור נתקע לפני הפקת אירוע שמיש, בצע ניסיון שני מוגבל אחד דרך אותו נתיב ניתוב, עם אותו תקציב מוכנות וללא ענישה של החשבון. כבוי כברירת מחדל: גוף ראשון שנתקע מכשיל את הבקשה ללא ניסיון חוזר.                                                                                                                                                              |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false`    |            | בתורות מתורגמים בהזרמה, כאשר התור משירות המקור אינו מכיל תוכן שמיש (השלמה הכוללת הנמקה בלבד או אפס מקטעים בעלי ערך), בצע ניסיונות חוזרים מוגבלים דרך נתיב האישורים הרגיל (עד `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX`) לפני שמשהו נחשף ללקוח. כבוי כברירת מחדל: תורות ריקים שומרים על ההתנהגות הנוכחית (200 ריק או 502 עקב תוכן ריק).                                                                 |
| `OPENCODE_POOL_RESELECT`                        | boolean | `false`    |            | מעבר בין חשבונות ב-OpenCode: לאחר 429 מספק המקובץ לפי כתובת יציאה, בחשבון ללא פרוקסי ותחת הקשר מאגר סביבתי, בקש ממאגר החיבורים חבר אחר לניסיון הבא במקום לנסות שוב מאותה כתובת יציאה. קובע סדר, אך לעולם אינו מחריג: מאגר שמוצה שומר על ההתנהגות הנוכחית. כבוי כברירת מחדל: כל 429 גורם למעבר לחשבון הבא בדיוק כמו קודם.                                                                            |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false`    |            | מעבר בין חשבונות ב-OpenCode: עצור את גל החשבונות ב-429 הראשון שמסווג כמגבלת קצב אמיתית (`Retry-After` שניתן לנתח, או גוף שמציין מגבלת קצב/שימוש) והחזר את תגובת 429 של שירות המקור ללא שינוי. תגובות 429 לא מסווגות ממשיכות לגרום למעבר. כבוי כברירת מחדל: הרמה החינמית מוגבלת לפי כתובת IP ליציאה (#9611), ולכן כל 429 גורם למעבר, וגל שמוצה מחזיר את תגובת 429 האחרונה של שירות המקור.            |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false`    | ✓          | השבת את אימות אישור ה-TLS עבור פרוקסי ה-MITM. **סכנה.**                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false`    |            | אפשר כתובות URL של ספקים המצביעות לרשתות פרטיות/פנימיות.                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`     |            | אפשר הוספה/אימות של ספקים בכתובות מקומיות/פרטיות (127.0.0.1, localhost, LAN). מופעל כברירת מחדל (גישה מקומית תחילה); יש להשבית לחסימה מחמירה של כתובות שאינן ציבוריות. מטא-נתונים של שירותי ענן נשארים חסומים.                                                                                                                                                                                      |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false`    | ✓          | הפעל מצב ספק תואם Claude Code.                                                                                                                                                                                                                                                                                                                                                                      |

### מדיניות (5)

| מפתח                            | סוג     | ברירת מחדל | תיאור                                                                                                                                                                    |
| ------------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | מצב אכיפת מדיניות השימוש בכלים. ערכים: `disabled`, `warn`, `block`.                                                                                                      |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | הפעל אוטומטית הגבלת קצב על סמך דפוסי שימוש.                                                                                                                              |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | דלג על הבדיקה המקומית של OmniRoute לחלון ההקשר / למספר המרבי של אסימוני קלט עבור בקשות ישירות למודל יחיד. מגבלות השירות במעלה הזרם עדיין חלות.                           |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | דחה בקשות לפני שליחתן כאשר למודל היעד חסרות היכולות הנדרשות (ראייה, כלים, פלט מובנה, חלון הקשר). מגן על בקשות ישירות לספק יחיד שעוקפות את מסנן התאימות של שכבת השילובים. |
| `RADAR_ENABLED`                 | boolean | `false`    | הפעל את מודול Radar של OmniRoute (מסכי הזנת קטלוג וסנכרון). מושבת כברירת מחדל; הפעלתו רק פותחת את ממשק המשתמש — סנכרון הנתונים עדיין דורש הסכמה נפרדת.                   |

### זמן ריצה (33)

| מפתח                                        | סוג     | ברירת מחדל | הפעלה מחדש | תיאור                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------- | ------- | ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | בוליאני | `true`     |            | יצירת סיכומי שיחה והזרקתם כאשר ניתוב משולב עובר בין מודלים. השביתו אפשרות זו כדי להתייחס למעברים בין מודלים באופן עצמאי ולמנוע בקשות העברה ברקע עבור כל השילובים הקיימים והעתידיים.                                                                                                                                                                                                                                                                                                                                                  |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | בוליאני | `true`     |            | הסרת פריטי פלט פנימיים משלב הפרשנות מזרמי העברה ישירה של Responses API לפני העברתם ללקוחות. השביתו אפשרות זו כדי לקבל פרשנות גולמית מהמקור במעלה הזרם.                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | בוליאני | `false`    |            | אכיפת הגבלות היקף על הגישה לכלי MCP.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | בוליאני | `false`    |            | דחיסת תיאורי כלי MCP כדי להפחית את השימוש בטוקנים.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | בוליאני | `false`    |            | הפעלת עיבוד משימות רקע בזמן ריצה.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | בוליאני | `false`    | ✓          | השבתת כל שירותי הרקע (רענון מכסה, סנכרון וכו').                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false`    |            | מתן אמון במסנני RTK ברמת הפרויקט ללא אימות.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`     | ✓          | הפעלת שרת ה-WebSocket של לוח הבקרה בזמן אמת בעת הייבוא (פורט 20132 כברירת מחדל).                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`     |            | מתן אפשרות ל-Codex להשתמש בתעבורת Responses-over-WebSocket. כאשר האפשרות כבויה, Codex חוזר להשתמש ב-HTTP Responses.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`     |            | מתן אפשרות ל-Codex להשתמש בתעבורת WebSocket JSON-RPC של ה-app-server המקומי (codexTransport=app-server). כאשר האפשרות כבויה, חיבורים שהוגדרו להשתמש ב-app-server חוזרים להשתמש בתעבורות האחרות של Codex.                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`     |            | ניתוב בקשות שחרגו מהתקציב לספק/מודל החינמי לגיבוי חירום. (ראו [גיבוי חירום במקרה של חריגה מהתקציב](#emergency-budget-fallback) להלן.)                                                                                                                                                                                                                                                                                                                                                                                                |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false`    |            | הפעלת ניסיון חוזר מוקדם ושקוף עבור זרמי SSE קטועים במעלה הזרם, לפני שבתי תגובה כלשהם מגיעים ללקוח.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false`    |            | מתן אפשרות לשחזור זרם לבקש מחדש ולחבר תגובה לאחר שבתי תגובה כבר הגיעו ללקוח.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false`    |            | הפיכת ההמשך באמצע הזרם לבטוח עבור קריאות לכלים: לעולם אין להמשיך זרם שנקטע לאחר שנפלטה קריאה לכלי (בתהליך או שכבר הסתיימה עם finish_reason מסוג tool_calls), ויש לסגור לאחר המשך ריק אחד במקום לנצל את מלוא התקציב. כבוי: התנהגות גרסת ההפצה.                                                                                                                                                                                                                                                                                        |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false`    |            | בצע מעבר לגיבוי פעם אחת לחיבור אח כאשר זרם SSE נסגר לפני שנפלטה מסגרת שימושית כלשהי ולאחר שמוצו ניסיונות החוזר המוגבלים באותו חיבור; אם אין חיבור אח שמיש, מוחזרת שגיאת 502 המקורית מסוג `STREAM_EARLY_EOF`. מושבת כברירת מחדל: EOF מוקדם נשאר סופי לאחר הניסיון החוזר באותו חיבור.                                                                                                                                                                                                                                                  |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`     |            | כלול שדות שמות ידידותיים לתצוגה בתגובות `/v1/models`. השבת עבור לקוחות המצפים למזהי מודלים בלבד.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`     |            | קובע כיצד מתווספות קידומות למזהי מודלים ב-/v1/models. ‏'dual' (ברירת המחדל) מפיק הן קידומות כינוי והן קידומות מזהה ספק קנוני לצורך תאימות לאחור. ‏'alias' מפיק רק את קידומת הכינוי הקצרה (למשל ds-web/model, ולא deepseek-web/model). ‏'canonical' מפיק רק את קידומת מזהה הספק המלאה. ערכים: `dual`, `alias`, `canonical`.                                                                                                                                                                                                           |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`     |            | אפשר סנכרון ELO תקופתי של טבלת המובילים של Arena AI עבור דירוגי אינטליגנציה של מודלים.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false`    |            | פרסם מזהי מראה מסוג `claude/<provider>/<model>` ב-`/v1/models`, כך שגילוי המודלים בשער Claude Code יציג מודלים שאינם Claude. הרמה הגלובלית של השער התלת-רמתי (משתנה הסביבה גובר על הגדרת העקיפה בלוח הבקרה). ראו [תצורת Claude Code](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker).                                                                                                                                                                                       |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`     |            | מתג ראשי לכינויי השער no-think/<provider>/<model>. כאשר מופעל (ברירת המחדל): /v1/models מפרסם גרסה ללא חשיבה עבור כל מודל Claude מתאים התומך בחשיבה, ומזהה no-think/ שנשלח בבקשה נפתר בחזרה למודל האמיתי עם דיכוי ההנמקה. כאשר מושבת: לא מפורסמות גרסאות, ומזהה no-think/ מטופל כמו כל מזהה מודל לא מוכר אחר. הגדרת ההצטרפות/החרגה לכל מודל ModelSpec.noThinkingAlias עדיין חלה כאשר אפשרות זו מופעלת.                                                                                                                               |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false`    |            | השבת את היצירה של גרסאות רמת חשיבה (למשל -low, -medium, -high) בקטלוג /v1/models.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false`    | ✓          | אפשר נתיבי קבלה וירטואליים מסתגלים לכל דייר עבור ניתוב לספק (#9654): פרץ תעבורה של דייר אחד לא יגרום עוד לשגיאות 503 אצל דייר אחר. משתנה הסביבה OMNIROUTE_CHAT_VIRTUAL_LANES גובר על הגדרת העקיפה הזו בלוח הבקרה; השינויים נכנסים לתוקף בהפעלה מחדש של השרת.                                                                                                                                                                                                                                                                         |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false`    |            | פרסום מזהי מראה מסוג <gateway-alias>/<model> ב־/v1/models עבור מודלים שלבעלים הקנוני שלהם אין פרטי גישה פעילים, אך שער passthrough בעל פרטי גישה פעילים מנתב אותם. אזהרה: כאשר האפשרות מופעלת באופן גלובלי, היא מוסיפה רשומות לקטלוג עבור כל הלקוחות.                                                                                                                                                                                                                                                                                |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false`    |            | הפעלת זיהוי יתרה עבור צמתים תואמי אגרגטורים מסוג New-API / One-API / Sub2API. כאשר האפשרות מופעלת, צמתים תואמים שסומן בהם דגל האגרגטור ידווחו על היתרה שלהם בלוח הבקרה ובניתוב בדיקת המכסה המקדימה.                                                                                                                                                                                                                                                                                                                                  |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false`    |            | המשך קריאות לכלים בבעלות השרת שאינן בהזרמה, עד שהמודל מחזיר תגובה הניתנת לשימוש הלקוח.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false`    |            | סטטיסטיקות חיפוש וחיפושים אחרונים סופרים רק ספקים שעדיין יש להם חיבור פעיל (ספקים ללא מפתח, כגון duckduckgo-free, נספרים תמיד). כאשר האפשרות כבויה, כל שורת חיפוש שנשמרה עם מזהה ספק נשארת בספירה.                                                                                                                                                                                                                                                                                                                                   |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false`    |            | דפי ספקים בלוח הבקרה: הצגת התג „חינם” רק לפי אותות שהספק מכבד — ללא היוריסטיקת שם התצוגה, שדות חינמיות שאינם בוליאניים וסיומות :free אצל ספקים רשומים ללא מסלול חינמי מתועד. כאשר האפשרות כבויה, כלל התג ההיסטורי נשמר.                                                                                                                                                                                                                                                                                                              |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false`    |            | בתגובות מאוגדות מסוג 429/503 המציינות אי־זמינות, השמטת `Retry-After` כאשר לא ידוע מועד קונקרטי עתידי לניסיון חוזר (במקום ערך מלאכותי של 1s), הוספת `error.retry_after_provenance` (`signal` \| `none`), ואפשרות לנתיבי ניקוז של combo לקרוא רמזים מילוליים לניסיון חוזר מגופי תגובה של המקור בפורמט JSON ובטקסט רגיל. השדה מופיע רק בתגובות שנבנו באמצעות `unavailableResponse()`; גופי תגובות 429/503 אחרים אינם משתנים.                                                                                                            |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false`    |            | כאשר יעד combo מסוג `priority`, המסומן כיעד גיבוי רק בעת מיצוי מכסה, עוצר את ה־combo מסיבה שניתן להוכיח שאינה קשורה למכסה (מפסק המעגל של הספק פתוח, דילוג עקב חיזוי זמן השהיה), החזרת 502 במקום 503 שנראה כקשור למכסה. עצירות עקב נעילה, תקופת צינון, אי־זמינות, מיצוי והגעה למגבלת המקביליות ממשיכות להחזיר 503.                                                                                                                                                                                                                    |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false`    |            | תגובת Mistral 401 בסיסית (`{"detail":"Unauthorized"}`, ללא אות אימות מפורש) זהה הן עבור מפתח שבוטל והן עבור מכסה שמוצתה. כאשר האפשרות מופעלת, החיבור מועבר לתקופת צינון במקום להחנותו במצב `expired`, עד 3 פעמים בשעה לכל חיבור; בפעם הבאה הוא מוחנה, כך שמפתח שבוטל עדיין מתכנס למצב זה. האפשרות כבויה כברירת מחדל: כל תגובת Mistral 401 בסיסית מחנה את החיבור כפי שהיה בעבר.                                                                                                                                                       |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `true`     |            | אחזור קטלוג המודלים העדכני של xAI עבור חיבורי xai-oauth מ־https://api.x.ai/v1/models באמצעות אסימון הנושא של OAuth, במקום להשתמש בגרעין הסטטי המקובע. מופעל כברירת מחדל. הגדירו את הדגל ל־false כדי להמשיך לספק את הגרעין הסטטי. כשלים ב־HTTP גורמים לחזרה לגרעין בנתיב גילוי המודלים; פונקציית הגישה לדגל עצמה אינה מבצעת בקשת HTTP.                                                                                                                                                                                                |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false`    |            | מתן אפשרות לסריקת הניקוי האוטומטית למחוק משימות Batch API סופיות (שהושלמו/נכשלו/בוטלו/פג תוקפן) שגילן עולה על `OMNIROUTE_BATCH_RETENTION_DAYS`, יחד עם נקודות הביקורת שלהן לכל שורה, ולנקות את תוכן ה־BLOB של קבצים שהועלו לאחר שחלף `expires_at` שלהם. כבוי כברירת מחדל: כל התקנה קיימת ממשיכה לשמור את הנתונים האלה בדיוק כמו קודם, עד שמפעיל המערכת בוחר להצטרף. הנתיב `DELETE /api/v1/batches/delete-completed`, שמופעל על ידי מפעיל המערכת, אינו מושפע באף אחד מהמקרים — זהו חוזה API ציבורי נפרד ובלתי מותנה.                  |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false`    |            | שמירת חשבון Antigravity שנבחר למשך מחזור החיים של הזרמת הבקשה שבחרה בו, כך שניסיון חוזר מקביל או העברת פרטי האימות לא יוכלו לבחור מחדש חשבון שכבר הוקצה לזרם פעיל. השמירה מוגבלת לצמד (חיבור, מודל upstream שניתן לקריאה), כך שחשבון אחד עדיין יכול לשרת שני מודלים שונים בו־זמנית. כאשר כל החשבונות המתאימים כבר שמורים עבור אותו מודל, הבקשה מחזירה שגיאת 503 מובנית מסוג `antigravity_pool_busy` עם ערך `Retry-After` מוגבל, במקום להעמיס על חשבון עסוק. כבוי כברירת מחדל: בחירת החשבון נשארת בדיוק כפי שהייתה, ולא מתבצעת שמירה. |

### CLI (5)

| מפתח                                  | סוג     | ברירת מחדל | הפעלה מחדש | תיאור                                                                                                                                                                                                               |
| ------------------------------------- | ------- | ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false`    | ✓          | הפעלת מצב תאימות עבור כל לקוחות ה־CLI.                                                                                                                                                                              |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false`    |            | הפעלת שכבת תאימות לכינויי מודלים.                                                                                                                                                                                   |
| `PRICING_SYNC_ENABLED`                | boolean | `false`    |            | הפעלת סנכרון אוטומטי של נתוני תמחור (נדרש גם משתנה הסביבה `PRICING_SYNC_ENABLED`).                                                                                                                                  |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false`    |            | לאחר סנכרון מודלים של ספק, כתיבה או כתיבה מחדש אוטומטית של קובצי הפרופיל ~/.codex/*.config.toml מתוך הקטלוג העדכני. הגדרת Codex הפעילה/ברירת המחדל לעולם אינה משתנה. כבוי כברירת מחדל.                              |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false`    |            | לאחר סנכרון מודלים של ספק, כתיבה או כתיבה מחדש אוטומטית של פרופילי Claude Code מסוג ~/.claude/profiles/<name>/settings.json מתוך הקטלוג העדכני. הגדרת Claude הפעילה/ברירת המחדל לעולם אינה משתנה. כבוי כברירת מחדל. |

### תקינות (5)

| מפתח                                      | סוג     | ברירת מחדל | תיאור                                                                                                                                                                                                                                                |
| ----------------------------------------- | ------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false`    | השבתת נקודת הקצה לבדיקת התקינות של המופע המקומי.                                                                                                                                                                                                     |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false`    | השבתת בדיקת התקינות לאימות אסימונים.                                                                                                                                                                                                                 |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false`    | הפעלת גישה לרשת בסביבת ארגז החול של המיומנויות.                                                                                                                                                                                                      |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false`    | בסריקת תקינות שרתי ה-proxy, בדיקה שהיעד דחה (401/403/429) מאפסת את רצף הכשלים העוקבים של שרת ה-proxy. מושבת כברירת מחדל: דחייה נשארת ניטרלית (#10654). תגובת 5xx נשארת בלתי מכרעת בכל מקרה; דחייה לעולם אינה מסירה, משביתה או מפעילה מחדש שרת proxy. |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false`    | הפעלת בדיקת התקינות/השלמות של מסד הנתונים בעת האתחול לאחר שהשרת מתחיל לקבל בקשות (באמצעות `setImmediate`), במקום לחסום את האתחול עד להשלמתה (#13717). מושבת כברירת מחדל: האתחול נחסם בדיוק כפי שנחסם לפני PR זה.                                     |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` והכינוי הישן שלו
> `INJECTION_GUARD_BLOCK_THRESHOLD` מכווננים את מצב `block` של
> `INJECTION_GUARD_MODE`, אך הם משתני סביבה רגילים שנקראים על ידי
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts),
> ולא דגלי תכונה: אין להם דריסה במסד הנתונים ואין להם מתג בלוח הבקרה. ראו
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication).

> [!NOTE]
> העמודה `Restart` מסמנת דגלים עם `requiresRestart: true` — הערך נשמר
> באופן מיידי, אך נכנס לתוקף רק לאחר טעינת התהליך מחדש. דגלי enum
> דוחים כל ערך שאינו נמצא בקבוצת הערכים המותרת שלהם (מאומת בצד השרת
> הן ב-`setFeatureFlagOverride()` והן במטפל `PUT` של REST).

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

## מנגנון חירום חלופי לתקציב

`OMNIROUTE_EMERGENCY_FALLBACK` (בקטגוריה `runtime`, ברירת המחדל `true`) שולט בנתיב
החלופי החינמי לשעת חירום שבקובץ
[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts).
כאשר הוא מופעל, בקשות שממצות את התקציב שלהן מנותבות לספק/מודל חלופי
וחינמי במקום להיכשל לחלוטין. הגדירו אותו כ-`false` (או `0`) — באמצעות המתג
בלוח הבקרה, דריסה במסד הנתונים או משתנה הסביבה `OMNIROUTE_EMERGENCY_FALLBACK`
— כדי להשבית את ההתנהגות ולאפשר לבקשות שמיצו את התקציב
להיכשל. (מוצג כמתג בלוח הבקרה ב-PRs #3741 / #3752.)

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
