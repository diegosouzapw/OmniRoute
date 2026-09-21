# Feature Flags (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇪🇹 [am](../../../am/docs/reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇳🇴 [no](../../../no/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇱🇰 [si](../../../si/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/FEATURE_FLAGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/FEATURE_FLAGS.md)

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

75 דגלים ב-6 קטגוריות. **ברירת המחדל** היא ברירת המחדל המוגדרת — הערך
שבו נעשה שימוש כאשר לא קיימת דריסה במסד הנתונים ולא קיים משתנה סביבה.

### אבטחה (10)

| מפתח                                    | סוג     | ברירת מחדל | תיאור                                                                                                                                                                                                                                                  |
| --------------------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `REQUIRE_API_KEY`                       | בוליאני | `false`    | דרישת מפתח API עבור כל הבקשות הנכנסות.                                                                                                                                                                                                                 |
| `INPUT_SANITIZER_ENABLED`               | בוליאני | `true`     | הפעלת טיהור קלט עבור כל הבקשות.                                                                                                                                                                                                                        |
| `INJECTION_GUARD_MODE`                  | enum    | `off`      | מצב הגנה מפני הזרקת הנחיות. ערכים: `off`, `warn`, `block`, `redact`.                                                                                                                                                                                   |
| `PII_REDACTION_ENABLED`                 | בוליאני | `false`    | השחרת מידע המאפשר זיהוי אישי (PII) בבקשות (ללא תלות ב-`INPUT_SANITIZER_MODE`).                                                                                                                                                                         |
| `PII_RESPONSE_SANITIZATION`             | בוליאני | `false`    | טיהור מידע המאפשר זיהוי אישי (PII) מתגובות הספק.                                                                                                                                                                                                       |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact`   | מצב לטיהור מידע המאפשר זיהוי אישי (PII) בתגובות. ערכים: `redact`, `warn`, `block`, `off`.                                                                                                                                                              |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | בוליאני | `true`     | חסימת בקשות יוצאות לטווחי כתובות IP פרטיים/פנימיים.                                                                                                                                                                                                    |
| `ALLOW_API_KEY_REVEAL`                  | בוליאני | `false`    | מתן אפשרות למשתמשי לוח המחוונים המאומתים לחשוף מפתחות API שמורים, במקום לראות רק ערכים מוסווים.                                                                                                                                                        |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | בוליאני | `false`    | הכללת קידומת החשבון בשורות יומן AUTH (לדוגמה, "שימוש בחשבון <provider>: abc12345..."). האפשרות מושבתת כברירת מחדל, כדי שמזהי חשבונות יושחרו ביומני תהליכים משותפים/מרובי דיירים. ללא תלות במצב ניפוי הבאגים; שינוי מצב ניפוי הבאגים אינו חושף מידע זה. |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | בוליאני | `false`    | כאשר OIDC מופעל, השבתת התחברות באמצעות סיסמה, כך שמשתמשים יוכלו לבצע אימות רק באמצעות כניסה יחידה של OIDC. כאשר האפשרות מושבתת (ברירת המחדל), זמינות גם התחברות באמצעות סיסמה וגם התחברות באמצעות OIDC.                                                |

### רשת (17)

| מפתח                                            | סוג     | ברירת מחדל | הפעלה מחדש | תיאור                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------- | ------- | ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false`    | ✓          | הפעלת מצב הסוואה באמצעות טביעת אצבע של TLS.                                                                                                                                                                                                                                                                                                                                                                               |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false`    |            | מתן אפשרות לנתיבי /v1/audio/* להשתמש בצומתי ספק תואמי OpenAI המתארחים מחוץ ל-localhost. מושבת כברירת מחדל — ניתוב שמע למארח מרוחק משנה את זהות היציאה, ולכן חייב להיות החלטה מפורשת של המפעיל. צומתי loopback מותרים תמיד ואינם מושפעים.                                                                                                                                                                                  |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false`    |            | מתן אפשרות ל-POST /v1/rerank (ולשלב הדירוג מחדש ב-loopback של מנוע הזיכרון) להשתמש בצומתי ספק תואמי OpenAI המתארחים מחוץ ל-localhost. מושבת כברירת מחדל — ניתוב למארח מרוחק משנה את זהות היציאה, ולכן חייב להיות החלטה מפורשת של המפעיל. צומתי loopback מותרים תמיד; צמתים מרוחקים חייבים גם לעמוד במדיניות כתובות ה-URL היוצאות של הספק.                                                                                 |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false`    |            | כאשר לא מוקצה proxy לחיבור, בחירה אוטומטית של ה-proxy התקין הראשון מהמרשם. מושבת כברירת מחדל (אחרת כל proxy במרשם הופך לברירת מחדל גלובלית — #3332).                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false`    |            | מתן אפשרות לתהליכי OAuth ואימות ספקים לעקוף proxy מוצמד ולהתחבר ישירות כאשר בדיקות מקדימות של נגישות ה-proxy נכשלות. מושבת כברירת מחדל מכיוון שהדבר עשוי לשנות את כתובת ה-IP היוצאת.                                                                                                                                                                                                                                      |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`     |            | בעת חריגת רשת (פסק זמן, חיבור שנדחה/אופס) במבצע רוטציה מרובה חשבונות, כאשר לחשבון שנכשל אין proxy ייעודי, החלת תקופת צינון קצרה ודילוג על חשבונות אחרים ללא proxy למשך שארית הבקשה, במקום לנסות שוב כל אחד מהם. מופעל כברירת מחדל (בטוח: אין שינוי בכתובת ה-IP היוצאת, רק הפחתת הסיכון להשהיה/צינון בחשבונות בעלי יציאה משותפת). השבתה משחזרת התפשטות מיידית בזריקה הראשונה ללא proxy.                                    |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false`    |            | מאגרי proxy והרוטציה לכל חשבון של opencode מפסיקים להגיש מחדש proxy שזה עתה נכשל (בדיקת TCP שנדחתה, או תגובת 429 שהתקבלה דרכו) למשך פרק זמן לכל תהליך, המוכפל בכל הישנות עד לתקרה. לא נכתב מצב proxy; כאשר כל המועמדים מונחים בצד, הבחירה אינה משתנה. מושבת כברירת מחדל.                                                                                                                                                  |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false`    |            | הצגה בלוח המחוונים, תחת מאגר proxy, של מספר כתובות ה-IP היוצאות שנצפו ושירתו את חבריו במהלך 24 השעות האחרונות, ושל מספר החיבורים שהשתמשו בהן. לקריאה בלבד, מחושב מיומן ה-proxy ולעולם אינו משמש לניתוב. מושבת כברירת מחדל.                                                                                                                                                                                                |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false`    |            | עבור מבצע OpenCode, מעקב אחר בית הגוף הראשון של תגובת Responses מוזרמת (חלון: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`, ברירת מחדל `15000`). זרם Responses מסוג 2xx שנותר שקט מעבר לחלון נחשב לתקוע: החשבון מועבר לצינון והבקשה עוברת ברוטציה לחשבון הבא פעם אחת; תקיעה שנייה נכשלת מיד. מושבת כברירת מחדל: זרמים תקועים ממשיכים להמתין כנהוג כיום עד לפסק הזמן של מוכנות הזרם.                                                  |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false`    |            | מריץ OpenCode: בעת סירוב 403/451 הכולל `user_blocked` (לא חסימה גאוגרפית ולא דחייה עקב טביעת אצבע של Cloudflare), הכנס את החשבון שנדחה לתקופת צינון ועבור לחשבון הבא פעם אחת לכל היותר בכל בקשה; סירוב שני מוחזר כפי שהוא, ללא סימון הצלחה. כבוי כברירת מחדל: ניתוב העוקף חסימת משתמש מצד שירות המקור עלול להיראות כהתחמקות ולהפיץ את הסימון ברחבי מערך החשבונות.                                                         |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false`    |            | החלפת חשבונות ב-OpenCode: לאחר שני כשלים זמניים רצופים בשירות המקור (5xx או 400 עם גוף ריק), השהה לפני המעבר לחשבון הבא — 1.5 שניות עם הכפלה בכל כשל נוסף, עד 6 שניות לכל השהיה ו-10 שניות לכל בקשה; ההשהיה לא תתבצע אם הלקוח מתנתק. גוף התגובה שנכשלה משוחרר לפני ההמתנה. כבוי כברירת מחדל: המעבר בעת כשל נשאר מיידי.                                                                                                    |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false`    |            | החלפת חשבונות ב-OpenCode: השהה את הבקשה לאחר תגובות 429 זמניות חוזרות (או סמן חדש לעומס על מאגר החשבונות), תוך שליחת אות חיים, ולאחר מכן הפעל מחדש מקטע מוגבל אחד של עד 3 חשבונות עוקבים במקום לפרוס את הבקשה על פני כל מערך החשבונות. כבוי כברירת מחדל: כל תגובת 429 עוברת לחשבון הבא בדיוק כמו קודם.                                                                                                                    |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false`    |            | החלפת חשבונות ב-OpenCode: עצור את גל החשבונות בתגובת 429 הראשונה המסווגת כהגבלת קצב אמיתית (`Retry-After` שניתן לנתח, או גוף תגובה המציין מגבלת קצב/שימוש), והחזר את תגובת 429 של שירות המקור ללא שינוי. תגובות 429 לא מסווגות ממשיכות לעבור בין חשבונות. כבוי כברירת מחדל: המסלול החינמי מוגבל לפי כתובת IP יוצאת (#9611), ולכן כל תגובת 429 גורמת למעבר, וגל שמיצה את החשבונות מחזיר את תגובת 429 האחרונה משירות המקור. |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false`    | ✓          | השבת אימות אישורי TLS עבור פרוקסי MITM. **מסוכן.**                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false`    |            | אפשר כתובות URL של ספקים המצביעות לרשתות פרטיות/פנימיות.                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`     |            | אפשר הוספה/אימות של ספקים בכתובות מקומיות/פרטיות (127.0.0.1, localhost, LAN). מופעל כברירת מחדל (העדפה למקומי); השבת כדי לחסום באופן מחמיר כל יעד שאינו ציבורי. מטא-נתונים של שירותי ענן נותרים חסומים.                                                                                                                                                                                                                   |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false`    | ✓          | הפעל מצב ספק התואם ל-Claude Code.                                                                                                                                                                                                                                                                                                                                                                                         |

### מדיניות (5)

| מפתח                            | סוג     | ברירת מחדל | תיאור                                                                                                                                                                        |
| ------------------------------- | ------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | מצב אכיפת המדיניות לשימוש בכלים. ערכים: `disabled`, `warn`, `block`.                                                                                                         |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | הפעלה אוטומטית של הגבלת קצב על סמך דפוסי שימוש.                                                                                                                              |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | דילוג על הבדיקה המקומית של OmniRoute לחלון ההקשר / למספר המרבי של אסימוני קלט עבור בקשות ישירות למודל יחיד. מגבלות השירות שבמעלה הזרם עדיין חלות.                            |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | דחיית בקשות לפני העברתן כאשר למודל היעד חסרות היכולות הנדרשות (ראייה, כלים, פלט מובנה, חלון הקשר). מגן על בקשות ישירות לספק יחיד שעוקפות את מסנן התאימות של שכבת השילובים.   |
| `RADAR_ENABLED`                 | boolean | `false`    | הפעלת מודול Radar של OmniRoute (מסכי הזנת הקטלוג והסנכרון). מושבת כברירת מחדל; ההפעלה מאפשרת גישה לממשק המשתמש בלבד — סנכרון הנתונים נותר אפשרות נפרדת המחייבת הסכמה מפורשת. |

### זמן ריצה (33)

| מפתח                                        | סוג     | ברירת מחדל | הפעלה מחדש | תיאור                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------- | ------- | ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`     |            | יצירה והזרקה של סיכומי שיחה כאשר ניתוב משולב עובר בין מודלים. יש להשבית כדי להתייחס למעברים בין מודלים באופן בלתי תלוי ולמנוע בקשות העברה ברקע עבור כל השילובים הקיימים והעתידיים.                                                                                                                                                                                                                                                                                                                                                 |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`     |            | הסרת פריטי פלט פנימיים משלב הפרשנות מזרמי ההעברה הישירה של Responses API לפני העברתם ללקוחות. יש להשבית כדי לקבל פרשנות גולמית משירות המקור.                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`     |            | אכיפת הגבלות היקף על הגישה לכלי MCP.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false`    |            | דחיסת תיאורי כלי MCP כדי להפחית את השימוש בטוקנים.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false`    |            | הפעלת עיבוד משימות רקע בזמן ריצה.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false`    | ✓          | השבתת כל שירותי הרקע (רענון מכסה, סנכרון וכו׳).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false`    |            | מתן אמון במסנני RTK ברמת הפרויקט ללא אימות.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`     | ✓          | הפעלת שרת WebSocket של לוח הבקרה בזמן אמת בעת הייבוא (פורט 20132 כברירת מחדל).                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`     |            | מתן אפשרות ל-Codex להשתמש בתעבורת Responses-over-WebSocket. כאשר האפשרות כבויה, Codex חוזר להשתמש ב-HTTP Responses.                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`     |            | מתן אפשרות ל-Codex להשתמש בתעבורת JSON-RPC של app-server מקומי דרך WebSocket (codexTransport=app-server). כאשר האפשרות כבויה, חיבורים שהוגדרו להשתמש ב-app-server חוזרים להשתמש בתעבורות האחרות של Codex.                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`     |            | ניתוב בקשות שתקציבן אזל לספק/מודל החינמי לשעת חירום. (ראו [חלופת חירום בעת מיצוי התקציב](#emergency-budget-fallback) להלן.)                                                                                                                                                                                                                                                                                                                                                                                                        |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false`    |            | הפעלת ניסיון חוזר מוקדם ושקוף עבור זרמי SSE קטועים במעלה הזרם, לפני שבתי תגובה כלשהם מגיעים ללקוח.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false`    |            | מתן אפשרות לשחזור זרם לבקש מחדש תגובה ולחבר אותה לאחר שבתי תגובה כבר הגיעו ללקוח.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false`    |            | הפיכת המשך הזרם באמצעו לבטוח עבור קריאות לכלים: לעולם לא לחדש זרם שנקטע לאחר שנפלטה קריאה לכלי (בתהליך או שכבר הסתיימה עם finish_reason מסוג tool_calls), ולסגור לאחר המשך ריק אחד במקום לנצל את התקציב כולו. כבוי: התנהגות גרסת ההפצה.                                                                                                                                                                                                                                                                                            |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false`    |            | בצע מעבר לגיבוי פעם אחת לחיבור מקביל כאשר זרם SSE נסגר לפני שנפלטה מסגרת שימושית כלשהי ולאחר שמוצו ניסיונות הניסיון החוזר המוגבלים באותו חיבור; אם אין חיבור מקביל שמיש, מוחזרת שגיאת 502 המקורית מסוג `STREAM_EARLY_EOF`. מושבת כברירת מחדל: EOF מוקדם נשאר מצב סופי לאחר הניסיון החוזר באותו חיבור.                                                                                                                                                                                                                              |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`     |            | כלול שדות שמות ידידותיים לתצוגה בתגובות של `/v1/models`. השבת עבור לקוחות שמצפים למזהי מודלים בלבד.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`     |            | קובע כיצד מזהי מודלים מקבלים קידומת ב-/v1/models. ‏'dual' (ברירת המחדל) מפיק הן קידומות של כינוי והן קידומות של מזהה ספק קנוני לצורך תאימות לאחור. ‏'alias' מפיק רק את קידומת הכינוי הקצרה (לדוגמה ds-web/model, ולא deepseek-web/model). ‏'canonical' מפיק רק את קידומת מזהה הספק המלאה. ערכים: `dual`, `alias`, `canonical`.                                                                                                                                                                                                     |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`     |            | אפשר סנכרון ELO תקופתי של טבלת המובילים Arena AI עבור דירוגי אינטליגנציה של מודלים.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false`    |            | פרסם מזהי שיקוף מסוג `claude/<provider>/<model>` ב-`/v1/models`, כדי שגילוי המודלים בשער Claude Code יציג מודלים שאינם Claude. הרמה הגלובלית של השער התלת-רמתי (משתנה הסביבה גובר על ההגדרה העוקפת בלוח הבקרה). ראו [הגדרת Claude Code](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker).                                                                                                                                                                                  |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`     |            | מתג ראשי עבור כינויי השער no-think/<provider>/<model>. כאשר מופעל (ברירת המחדל): /v1/models מפרסם וריאנט ללא חשיבה עבור כל מודל Claude מתאים שתומך בחשיבה, ומזהה no-think/ שנשלח בבקשה מתורגם חזרה למודל האמיתי כאשר ההסקה מושבתת. כאשר מושבת: לא מפורסמים וריאנטים, ומזהה no-think/ מטופל כמו כל מזהה מודל לא מוכר אחר. הגדרת ההצטרפות/החרגה לכל מודל ModelSpec.noThinkingAlias עדיין חלה כאשר אפשרות זו מופעלת.                                                                                                                  |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false`    |            | השבת יצירה של וריאנטים לרמות חשיבה (לדוגמה -low, -medium, -high) בקטלוג /v1/models.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false`    | ✓          | אפשר נתיבי קבלה וירטואליים מסתגלים לכל דייר עבור שליחה לספק (#9654): עומס רגעי של דייר אחד לא יגרום עוד לשגיאת 503 אצל דייר אחר. משתנה הסביבה OMNIROUTE_CHAT_VIRTUAL_LANES גובר על ההגדרה העוקפת הזו בלוח הבקרה; השינויים נכנסים לתוקף עם הפעלת השרת מחדש.                                                                                                                                                                                                                                                                         |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false`    |            | פרסום מזהי מראה מסוג <gateway-alias>/<model> ב-/v1/models עבור מודלים שלבעלים הקנוני שלהם אין אישור גישה פעיל, אך שער מעבר בעל אישור גישה פעיל מנתב אותם. אזהרה: כאשר אפשרות זו מופעלת באופן גלובלי, היא מוסיפה רשומות לקטלוג עבור כל הלקוחות.                                                                                                                                                                                                                                                                                     |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false`    |            | הפעלת זיהוי יתרה עבור צמתים תואמי אגרגטור מסוג New-API / One-API / Sub2API. כאשר אפשרות זו מופעלת, צמתים תואמים שדגל האגרגטור מוגדר בהם ידווחו על היתרה שלהם בלוח המחוונים ובניתוב בדיקת המכסה המקדימה.                                                                                                                                                                                                                                                                                                                            |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false`    |            | המשך קריאות לכלים שבבעלות השרת שאינן בהזרמה, עד שהמודל מחזיר תגובה שניתנת לשימוש על ידי הלקוח.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false`    |            | סטטיסטיקות החיפוש והחיפושים האחרונים סופרים רק ספקים שעדיין יש להם חיבור פעיל (ספקים ללא מפתח, כגון duckduckgo-free, נספרים תמיד). כאשר האפשרות כבויה, כל שורת חיפוש שנשמרה ושיש לה מזהה ספק נשמרת בספירה.                                                                                                                                                                                                                                                                                                                         |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false`    |            | דפי ספקים בלוח המחוונים: הצגת התג „חינם” רק לפי אותות שהספק מכבד — ללא היוריסטיקת שם התצוגה, שדות חינמיים שאינם בוליאניים וסיומות :free אצל ספקים רשומים שאין להם מסלול חינמי מתועד. כאשר האפשרות כבויה, כלל התג ההיסטורי נשמר.                                                                                                                                                                                                                                                                                                    |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false`    |            | בתגובות אי-זמינות מצטברות מסוג 429/503, השמטת `Retry-After` כאשר לא ידוע מועד קונקרטי לניסיון חוזר בעתיד (במקום ערך מלאכותי של שנייה אחת), הוספת `error.retry_after_provenance` (`signal` \| `none`), ואפשרות לנתיבי ריקון משולבים לקרוא רמזים מילוליים לניסיון חוזר מגופי JSON ומגופי טקסט פשוט של השירות במעלה הזרם. השדה מופיע רק בתגובות שנבנו על ידי `unavailableResponse()`; גופי 429/503 אחרים אינם משתנים.                                                                                                                 |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false`    |            | כאשר יעד משולב מסוג `priority`, המסומן כיעד חלופי רק במקרה של מיצוי מכסה, עוצר את השילוב מסיבה שניתן להוכיח שאינה קשורה למכסה (מפסק המעגל של הספק פתוח, דילוג עקב חיזוי השהיה), מוחזרת תשובת 502 במקום תשובת 503 שנראית כאילו היא קשורה למכסה. עצירות עקב נעילה, תקופת צינון, אי-זמינות, מיצוי והגעה למגבלת המקביליות ממשיכות להחזיר 503.                                                                                                                                                                                          |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false`    |            | תגובת Mistral 401 בסיסית (`{"detail":"Unauthorized"}`, ללא אות אימות מפורש) זהה עבור מפתח שבוטל ועבור מכסה שמוצתה. כאשר האפשרות מופעלת, החיבור מועבר לתקופת צינון במקום להחנות אותו כ-`expired`, לכל היותר 3 פעמים בשעה לכל חיבור; התגובה הבאה מחנה אותו, כך שמפתח שבוטל עדיין מתכנס למצב זה. האפשרות כבויה כברירת מחדל: כל תגובת Mistral 401 בסיסית מחנה את החיבור כפי שהיה בעבר.                                                                                                                                                 |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false`    |            | אחזר את קטלוג המודלים העדכני של xAI עבור חיבורי `xai-oauth` מ־`https://api.x.ai/v1/models` באמצעות אסימון הנושא של OAuth, במקום קובץ המקור הסטטי המוקפא. מושבת כברירת מחדל: `xai-oauth` ממשיך לספק את קובץ המקור הסטטי ללא שינוי. בכל שגיאת זיהוי, הגילוי חוזר לקובץ המקור (לא אומת אם x.ai מקבל אסימון נושא של OAuth בנקודת קצה זו).                                                                                                                                                                                              |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false`    |            | אפשר לסריקת הניקוי האוטומטית למחוק משימות Batch API סופיות (שהושלמו/נכשלו/בוטלו/פג תוקפן) הישנות יותר מ־`OMNIROUTE_BATCH_RETENTION_DAYS`, יחד עם נקודות הביקורת שלהן לכל שורה, ולנקות את תוכן ה־BLOB של קבצים שהועלו לאחר שחלף `expires_at` שלהם. מושבת כברירת מחדל: כל התקנה קיימת ממשיכה לשמור נתונים אלה בדיוק כמו קודם, עד שמפעיל המערכת בוחר להפעיל זאת. הנתיב `DELETE /api/v1/batches/delete-completed`, המופעל על ידי מפעיל המערכת, אינו מושפע בכל מקרה — זהו חוזה API ציבורי נפרד וללא תנאים.                              |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false`    |            | שמור את חשבון Antigravity שנבחר למשך מחזור החיים של הזרמת הבקשה שבחרה בו, כך שניסיון חוזר מקביל או העברת פרטי ההזדהות לא יוכלו לבחור מחדש חשבון שכבר הוקצה לזרם פעיל. השמירה מוגבלת ל־(חיבור, מודל upstream שניתן לקריאה), כך שחשבון אחד עדיין יכול לשרת שני מודלים שונים בו־זמנית. כאשר כל החשבונות המתאימים כבר שמורים עבור מודל זה, הבקשה מחזירה שגיאת 503 מובנית מסוג `antigravity_pool_busy` עם `Retry-After` מוגבל, במקום להוסיף עומס לחשבון עסוק. מושבת כברירת מחדל: בחירת החשבון נשארת בדיוק כפי שהייתה, ולא מתבצעת שמירה. |

### CLI (5)

| מפתח                                  | סוג     | ברירת מחדל | הפעלה מחדש | תיאור                                                                                                                                                                                                     |
| ------------------------------------- | ------- | ---------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false`    | ✓          | הפעל מצב תאימות עבור כל לקוחות CLI.                                                                                                                                                                       |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false`    |            | הפעל שכבת תאימות לכינויי מודלים.                                                                                                                                                                          |
| `PRICING_SYNC_ENABLED`                | boolean | `false`    |            | הפעל סנכרון אוטומטי של נתוני תמחור (דורש גם את משתנה הסביבה `PRICING_SYNC_ENABLED`).                                                                                                                      |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false`    |            | לאחר סנכרון מודלים של ספק, כתוב (מחדש) באופן אוטומטי קובצי פרופיל ~/.codex/*.config.toml מהקטלוג העדכני. לעולם אינו משנה את תצורת Codex הפעילה/ברירת המחדל. מושבת כברירת מחדל.                            |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false`    |            | לאחר סנכרון מודלים של ספק, כתוב (מחדש) באופן אוטומטי פרופילי Claude Code ב־~/.claude/profiles/<name>/settings.json מהקטלוג העדכני. לעולם אינו משנה את תצורת Claude הפעילה/ברירת המחדל. מושבת כברירת מחדל. |

### תקינות (5)

| מפתח                                      | סוג     | ברירת מחדל | תיאור                                                                                                                                                                                                                                   |
| ----------------------------------------- | ------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false`    | השבתת נקודת הקצה לבדיקת התקינות של המופע המקומי.                                                                                                                                                                                        |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false`    | השבתת בדיקת התקינות לאימות אסימונים.                                                                                                                                                                                                    |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false`    | הפעלת גישה לרשת בסביבת ארגז החול של המיומנויות.                                                                                                                                                                                         |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false`    | בסריקת תקינות ה-proxy, בדיקה שהיעד דחה (401/403/429) מאפסת את רצף הכשלים העוקבים של ה-proxy. מושבת כברירת מחדל: דחייה נשארת ניטרלית (#10654). תגובת 5xx נשארת בלתי מכרעת בכל מקרה; דחייה לעולם אינה מסירה, משביתה או מפעילה מחדש proxy. |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false`    | הרצת בדיקת התקינות/שלמות של מסד הנתונים בעת ההפעלה לאחר שהשרת מתחיל לקבל בקשות (באמצעות `setImmediate`), במקום לחסום את ההפעלה עד להשלמתה (#13717). מושבת כברירת מחדל: ההפעלה נחסמת בדיוק כפי שנחסמה לפני PR זה.                        |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` והכינוי הקודם שלו
> `INJECTION_GUARD_BLOCK_THRESHOLD` מכווננים את מצב `block` של
> `INJECTION_GUARD_MODE`, אך הם משתני סביבה רגילים שנקראים על ידי
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts),
> ולא דגלי תכונות: אין להם דריסה במסד הנתונים ואין מתג בלוח הבקרה. ראו
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication).

> [!NOTE]
> העמודה `Restart` מסמנת דגלים עם `requiresRestart: true` — הערך
> נשמר באופן מיידי, אך נכנס לתוקף רק לאחר טעינת התהליך מחדש. דגלי enum
> דוחים כל ערך שאינו נכלל בקבוצת הערכים המותרת שלהם (מאומת בצד השרת הן
> ב-`setFeatureFlagOverride()` והן במטפל `PUT` של REST).

---

## החלפת מצבי דגלים

### לוח הבקרה

נווטו אל **לוח הבקרה → הגדרות → דגלי תכונות**
(`/dashboard/settings/feature-flags`). הרשת
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
תומכת ב:

- **חיפוש** לפי מפתח או תיאור, ו**סינון** לפי קטגוריה (וכן תצוגה מלאכותית של
  **דורש הפעלה מחדש**).
- **מתג** עבור דגלים בוליאניים ו**רשימה נפתחת** עבור דגלי enum
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`).
- **תג מקור** לכל דגל — `DB`,‏ `ENV` או `DEF` — המציג מהיכן הגיע
  הערך האפקטיבי.
- כפתור **איפוס** (המוצג רק עבור דגלים שמקורם ב-`DB`) להסרת הדריסה,
  וכפתור **איפוס כל הדריסות** בתחתית.
- כרזת **הפעלת השרת מחדש** כאשר דגל `requiresRestart` משתנה.

### API מסוג REST

כל הפעולות מתבצעות דרך נתיב יחיד:
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts).
כל מתודה דורשת הפעלת לוח בקרה מאומתת (אחרת מוחזר `401`).

#### `GET /api/settings/feature-flags`

מחזיר כל דגל עם הערך האפקטיבי שלו, המקור וסיכום.

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
    // ... כל 75 הדגלים
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

הגדרה או הסרה של דריסה יחידה. גוף הבקשה: `{ key: string; value?: string }`.
השמטת `value` מסירה את הדריסה (ומשחזרת את ערך הסביבה / ברירת המחדל).

```bash
# הגדרת דריסה במסד הנתונים
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# הסרת הדריסה (ללא "value")
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

התגובה מחזירה את ה-`effectiveValue`/`source` החדשים, את ה-`previousValue`/
`previousSource` ואת `requiresRestart`. מפתחות לא מוכרים וערכי enum מחוץ לטווח
נדחים עם `400`.

#### `DELETE /api/settings/feature-flags`

מנקה את **כל** הדריסות במסד הנתונים בבת אחת, ומשחזר כל דגל לערך הסביבה / ברירת המחדל
שלו. מחזיר `{ cleared: <count>, message: "..." }`.

> [!NOTE]
> דגלים עם `requiresRestart: true` נכנסים לתוקף רק לאחר טעינה מחדש של התהליך.
> תהליך ההפעלה מחדש של לוח הבקרה קורא אל `POST /api/restart` ולאחר מכן מתשאל את
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
