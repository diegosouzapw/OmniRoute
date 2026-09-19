# Feature Flags (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇪🇹 [am](../../../am/docs/reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇳🇴 [no](../../../no/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇱🇰 [si](../../../si/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/FEATURE_FLAGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/FEATURE_FLAGS.md)

---

> מתגי זמן ריצה שמשנים את ההתנהגות של OmniRoute **ללא פריסה מחדש**.
> כל דגל שמופיע כאן מוגדר בקובץ
> [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
> — מקור האמת היחיד. גם לוח הבקרה וגם ה-REST API קוראים
> מקובץ זה, ולכן הטבלה שלהלן נוצרת כך שתתאים לו ביחס של 1:1.

---

## מהם דגלי תכונות

דגל תכונה הוא מתג בעל שם (בוליאני או enum), שניתן לשנות את ערכו
בזמן ריצה ולשמור אותו במסד הנתונים, ללא צורך בפריסה מחדש של התהליך. כל
דגל מתואר באמצעות `FeatureFlagDefinition` הכולל `key`,‏ `label`,
‏`description`,‏ `category`,‏ `defaultValue`,‏ `type` ורמז `requiresRestart`.

### סדר ההכרעה

**הערך האפקטיבי** של דגל נקבע באמצעות
[`resolveFeatureFlag()`](../../src/shared/utils/featureFlags.ts) לפי סדר
העדיפויות הבא (העדיפות הגבוהה ביותר גוברת):

1. **דריסה במסד הנתונים** — ערך המאוחסן בטבלה `key_value` תחת מרחב השמות
   `feature_flags` (מוגדר באמצעות לוח הבקרה או ה-REST API).
2. **משתנה סביבה** — `process.env[<KEY>]`, אם הוא מוגדר ואינו ריק.
3. **ברירת המחדל שבהגדרה** — ה-`defaultValue` מתוך `featureFlagDefinitions.ts`.

דגל בוליאני נחשב **מופעל** כאשר הערך האפקטיבי שלו הוא `"true"`,
‏`"1"` או `"yes"` (ראו `isFeatureFlagEnabled()`).

> [!NOTE]
> לרוב הדגלים יש גם משתנה סביבה תואם **באותו שם**
> המתועד ב-[`ENVIRONMENT.md`](./ENVIRONMENT.md). הדריסה של הדגל במסד הנתונים
> מקבלת עדיפות על פני משתנה סביבה זה. דגל עם
> `requiresRestart: true` נשמר באופן מיידי, אך נקרא מחדש רק בעת הפעלת
> התהליך — שינוי שלו מציג כרזת **"הפעלת השרת מחדש"** בלוח הבקרה.

---

## קטלוג דגלים

74 דגלים ב-6 קטגוריות. **ברירת מחדל** היא ברירת המחדל של ההגדרה — הערך
שנעשה בו שימוש כאשר לא קיימת דריסה במסד הנתונים וגם לא קיים משתנה סביבה.

### אבטחה (10)

| מפתח                                    | סוג     | ברירת מחדל | תיאור                                                                                                                                                                                                                                                       |
| --------------------------------------- | ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`    | דרישת מפתח API עבור כל הבקשות הנכנסות.                                                                                                                                                                                                                      |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`     | הפעלת ניקוי קלט עבור כל הבקשות.                                                                                                                                                                                                                             |
| `INJECTION_GUARD_MODE`                  | enum    | `off`      | מצב ההגנה מפני הזרקת הנחיות. ערכים: `off`, `warn`, `block`, `redact`.                                                                                                                                                                                       |
| `PII_REDACTION_ENABLED`                 | boolean | `false`    | השחרת מידע המאפשר זיהוי אישי בבקשות (ללא תלות ב-`INPUT_SANITIZER_MODE`).                                                                                                                                                                                    |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`    | ניקוי מידע המאפשר זיהוי אישי מתגובות הספק.                                                                                                                                                                                                                  |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact`   | מצב לניקוי מידע המאפשר זיהוי אישי מתגובות. ערכים: `redact`, `warn`, `block`, `off`.                                                                                                                                                                         |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`     | חסימת בקשות יוצאות לטווחי כתובות IP פרטיים/פנימיים.                                                                                                                                                                                                         |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`    | מתן אפשרות למשתמשי לוח המחוונים שעברו אימות לחשוף מפתחות API שמורים, במקום לראות ערכים מוסווים בלבד.                                                                                                                                                        |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`    | הכללת קידומת החשבון בשורות יומן AUTH (לדוגמה, "שימוש בחשבון <provider>: abc12345..."). מושבת כברירת מחדל, כך שמזהי חשבונות מושחרים ביומני תהליכים משותפים/מרובי-דיירים. אפשרות זו אינה תלויה במצב ניפוי השגיאות; שינוי מצב ניפוי השגיאות אינו חושף מידע זה. |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`    | כאשר OIDC מופעל, השבתת כניסה באמצעות סיסמה כדי שמשתמשים יוכלו לבצע אימות רק באמצעות כניסה יחידה של OIDC. כאשר האפשרות מושבתת (ברירת המחדל), זמינות גם כניסה באמצעות סיסמה וגם כניסה באמצעות OIDC.                                                           |

### רשת (16)

| מפתח                                            | סוג     | ברירת מחדל | הפעלה מחדש | תיאור                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------- | ------- | ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false`    | ✓          | הפעלת מצב הסוואה של טביעת אצבע מסוג TLS.                                                                                                                                                                                                                                                                                                                                                                       |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false`    |            | מתן אפשרות לנתיבי /v1/audio/* להשתמש בצומתי ספק תואמי OpenAI המתארחים מחוץ ל-localhost. מושבת כברירת מחדל — ניתוב שמע למארח מרוחק משנה את זהות תעבורת היציאה, ולכן חייב להיות החלטה מפורשת של המפעיל. צומתי loopback מותרים תמיד ואינם מושפעים.                                                                                                                                                                |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false`    |            | מתן אפשרות ל-POST /v1/rerank (ולשלב הדירוג מחדש ב-loopback של מנוע הזיכרון) להשתמש בצומתי ספק תואמי OpenAI המתארחים מחוץ ל-localhost. מושבת כברירת מחדל — ניתוב למארח מרוחק משנה את זהות תעבורת היציאה, ולכן חייב להיות החלטה מפורשת של המפעיל. צומתי loopback מותרים תמיד; צמתים מרוחקים חייבים גם לעמוד במדיניות כתובות ה-URL היוצאות של הספק.                                                               |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false`    |            | כאשר לא מוקצה proxy לחיבור, בחירה אוטומטית של ה-proxy התקין הראשון מהמרשם. מושבת כברירת מחדל (אחרת כל proxy במרשם הופך לגיבוי גלובלי — #3332).                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false`    |            | מתן אפשרות לתהליכי OAuth ואימות ספק לעקוף proxy מוצמד ולהתחבר ישירות כאשר בדיקות מקדימות של נגישות ה-proxy נכשלות. מושבת כברירת מחדל משום שהדבר עלול לשנות את כתובת ה-IP של תעבורת היציאה.                                                                                                                                                                                                                     |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`     |            | בעת חריגת רשת (פסק זמן, חיבור שנדחה/אופס) במבצע רוטציה מרובה-חשבונות, כאשר לחשבון שנכשל אין proxy ייעודי, החלת תקופת צינון קצרה ודילוג על חשבונות אחרים ללא proxy למשך שאר הבקשה, במקום לנסות כל אחד מהם מחדש. מופעל כברירת מחדל (בטוח: אין שינוי בכתובת ה-IP של תעבורת היציאה; רק מצמצם את הסיכון להשהיה/צינון בחשבונות החולקים תעבורת יציאה). יש להשבית כדי לשחזר העברה מיידית בעת ה-throw הראשון ללא proxy. |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false`    |            | מאגרי proxy והרוטציה לפי חשבון של opencode מפסיקים להקצות מחדש proxy שזה עתה נכשל (בדיקת TCP שנדחתה, או תגובת 429 שהתקבלה דרכו) למשך פרק זמן לכל תהליך, המוכפל בכל הישנות עד לתקרה. לא נכתב סטטוס proxy; כאשר כל המועמדים מושהים, הבחירה אינה משתנה. מושבת כברירת מחדל.                                                                                                                                        |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false`    |            | הצגה בלוח המחוונים, תחת מאגר proxy, של מספר כתובות ה-IP הנצפות של תעבורת היציאה ששירתו את חבריו במהלך 24 השעות האחרונות ושל מספר החיבורים שהשתמשו בהן. לקריאה בלבד, מחושב מיומן ה-proxy ולעולם אינו משמש לניתוב. מושבת כברירת מחדל.                                                                                                                                                                            |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false`    |            | עבור המבצע של OpenCode, מעקב אחר הבית הראשון בגוף של תשובת Responses מוזרמת (חלון: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`, ברירת מחדל `15000`). זרם Responses עם קוד 2xx שנותר שקט מעבר לחלון נחשב תקוע: החשבון מועבר לצינון והבקשה מועברת פעם אחת לחשבון הבא; תקיעה שנייה גורמת לכישלון מיידי. מושבת כברירת מחדל: זרמים תקועים ממשיכים בהמתנה הנהוגה כיום עד לפסק הזמן של מוכנות הזרם.                             |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false`    |            | מבצע OpenCode: בעת שגיאת 403/451 הכוללת סירוב מסוג `user_blocked` (לא חסימה גאוגרפית ולא דחייה עקב טביעת אצבע של Cloudflare), העבר את החשבון שנדחה לתקופת צינון ועבור לחשבון הבא פעם אחת לכל היותר בכל בקשה; סירוב שני מוחזר כפי שהוא, ללא סימון הצלחה. מושבת כברירת מחדל: עקיפת חסימת משתמש מצד שירות המקור עלולה להיראות כניסיון התחמקות ולהפיץ את הסימון ברחבי מערך החשבונות.                               |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false`    |            | רוטציית OpenCode: לאחר שני כשלים זמניים רצופים בשירות המקור (5xx או 400 עם גוף ריק), השהה לפני המעבר לחשבון הבא — 1.5 שניות, עם הכפלה בכל כשל נוסף, עד לתקרה של 6 שניות לכל השהיה ו-10 שניות לכל בקשה; ההשהיה מבוטלת אם הלקוח מתנתק. גוף התגובה שנכשלה משוחרר לפני ההמתנה. מושבת כברירת מחדל: המעבר בעת כשל נשאר מיידי.                                                                                        |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false`    |            | רוטציית OpenCode: עצור את סבב החשבונות בשגיאת 429 הראשונה שסווגה כהגבלת קצב אמיתית (`Retry-After` שניתן לנתח, או גוף שמציין מגבלת קצב/שימוש), והחזר את שגיאת 429 משירות המקור ללא שינוי. שגיאות 429 שלא סווגו ממשיכות את הרוטציה. מושבת כברירת מחדל: השכבה החינמית מוגבלת לפי כתובת IP יוצאת (#9611), ולכן כל שגיאת 429 גורמת לרוטציה, וסבב שמיצה את כל החשבונות מחזיר את שגיאת 429 האחרונה משירות המקור.      |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false`    | ✓          | השבת את אימות אישורי TLS עבור שרת ה-proxy מסוג MITM. **מסוכן.**                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false`    |            | אפשר כתובות URL של ספקים המצביעות לרשתות פרטיות/פנימיות.                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`     |            | אפשר הוספה/אימות של ספקים בכתובות מקומיות/פרטיות (127.0.0.1, localhost, LAN). מופעל כברירת מחדל (גישה מקומית תחילה); השבת לצורך חסימה מחמירה המאפשרת כתובות ציבוריות בלבד. מטא-נתונים של שירותי ענן נשארים חסומים.                                                                                                                                                                                             |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false`    | ✓          | הפעל מצב ספק תואם Claude Code.                                                                                                                                                                                                                                                                                                                                                                                 |

### מדיניות (5)

| מפתח                            | סוג     | ברירת מחדל | תיאור                                                                                                                                                                  |
| ------------------------------- | ------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | מצב אכיפת מדיניות השימוש בכלים. ערכים: `disabled`, `warn`, `block`.                                                                                                    |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | הפעל אוטומטית הגבלת קצב על סמך דפוסי שימוש.                                                                                                                            |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | דלג על הבדיקה המקומית של OmniRoute לחלון ההקשר / למספר המרבי של אסימוני קלט בבקשות ישירות למודל יחיד. המגבלות של שירות המקור עדיין חלות.                               |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | דחה בקשות לפני שליחתן כאשר למודל היעד חסרות יכולות נדרשות (ראייה, כלים, פלט מובנה, חלון הקשר). מגן על בקשות ישירות לספק יחיד שעוקפות את מסנן התאימות של שכבת השילובים. |
| `RADAR_ENABLED`                 | boolean | `false`    | הפעל את מודול OmniRoute Radar (מסכי פיד הקטלוג והסנכרון). מושבת כברירת מחדל; הפעלתו פותחת רק את ממשק המשתמש — סנכרון הנתונים עדיין דורש הצטרפות נפרדת.                 |

### זמן ריצה (33)

| מפתח                                        | סוג     | ברירת מחדל | הפעלה מחדש | תיאור                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------- | ------- | ---------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | בוליאני | `true`     |            | יצירה והזרקה של סיכומי שיחה כאשר ניתוב משולב עובר בין מודלים. השביתו כדי להתייחס למעברים בין מודלים באופן בלתי תלוי ולמנוע בקשות העברה ברקע עבור כל השילובים הקיימים והעתידיים.                                                                                                                                                                                                                                                                                                                                                                 |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | בוליאני | `true`     |            | הסרת פריטי פלט פנימיים משלב הפרשנות מזרמי העברה ישירה של Responses API לפני העברתם ללקוחות. השביתו כדי לקבל פרשנות גולמית מהמקור.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | בוליאני | `true`     |            | אכיפת מגבלות תחום על הגישה לכלי MCP.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | בוליאני | `false`    |            | דחיסת תיאורי כלי MCP כדי לצמצם את השימוש בטוקנים.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | בוליאני | `false`    |            | הפעלת עיבוד משימות רקע בזמן ריצה.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | בוליאני | `false`    | ✓          | השבתת כל שירותי הרקע (רענון מכסה, סנכרון וכו').                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false`    |            | מתן אמון במסנני RTK ברמת הפרויקט ללא אימות.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`     | ✓          | הפעלת שרת WebSocket של לוח המחוונים בזמן אמת בעת הייבוא (יציאה 20132 כברירת מחדל).                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`     |            | מתן אפשרות ל-Codex להשתמש בתעבורת Responses-over-WebSocket. כאשר האפשרות כבויה, Codex חוזר להשתמש ב-HTTP Responses.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`     |            | מתן אפשרות ל-Codex להשתמש בתעבורת JSON-RPC דרך WebSocket של app-server המקומי (codexTransport=app-server). כאשר האפשרות כבויה, חיבורים שהוגדרו להשתמש ב-app-server חוזרים לתעבורות האחרות של Codex.                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`     |            | ניתוב בקשות שמיצו את התקציב לספק/מודל החינמי לשעת חירום המשמש כברירת מחדל חלופית. (ראו [ברירת מחדל חלופית לשעת חירום במקרה של מיצוי התקציב](#emergency-budget-fallback) להלן.)                                                                                                                                                                                                                                                                                                                                                                  |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false`    |            | הפעלת ניסיון חוזר מוקדם ושקוף עבור זרמי SSE קטועים במעלה הזרם, לפני שבתי תגובה כלשהם מגיעים ללקוח.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false`    |            | מתן אפשרות לשחזור הזרם לשלוח מחדש את הבקשה ולחבר את התגובה לאחר שבתי תגובה כבר הגיעו ללקוח.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false`    |            | הפיכת ההמשך באמצע הזרם לבטוח עבור קריאות לכלים: לעולם אין לחדש זרם שנקטע לאחר שנפלטה קריאה לכלי (בביצוע או שכבר הסתיימה עם finish_reason מסוג tool_calls), ויש לסגור לאחר המשך ריק אחד במקום לנצל את כל התקציב. כבוי: התנהגות גרסת ההפצה.                                                                                                                                                                                                                                                                                                       |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false`    |            | בצע מעבר לגיבוי פעם אחת לחיבור מקביל כאשר זרם SSE נסגר לפני שנפלטה מסגרת שימושית כלשהי ולאחר שמוצו ניסיונות החיבור החוזר המוגבלים באותו חיבור; אם אין חיבור מקביל שמיש, מוחזרת שגיאת 502 המקורית מסוג `STREAM_EARLY_EOF`. מושבת כברירת מחדל: EOF מוקדם נשאר סופי לאחר ניסיון החיבור החוזר באותו חיבור.                                                                                                                                                                                                                                          |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`     |            | כלול שדות שמות ידידותיים לתצוגה בתגובות `/v1/models`. השבת עבור לקוחות שמצפים למזהי מודלים בלבד.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`     |            | קובע כיצד מזהי מודלים מקבלים קידומת ב־/v1/models. הערך 'dual' (ברירת המחדל) מפיק גם קידומות כינוי וגם קידומות מזהה ספק קנוני, לצורך תאימות לאחור. הערך 'alias' מפיק רק את קידומת הכינוי הקצרה (למשל ds-web/model, ולא deepseek-web/model). הערך 'canonical' מפיק רק את קידומת מזהה הספק המלאה. ערכים: `dual`, `alias`, `canonical`.                                                                                                                                                                                                             |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`     |            | אפשר סנכרון ELO תקופתי של טבלת המובילים של Arena AI עבור דירוגי אינטליגנציה של מודלים.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false`    |            | פרסם מזהי שיקוף מסוג `claude/<provider>/<model>` ב־`/v1/models`, כדי שגילוי המודלים בשער Claude Code יציג מודלים שאינם Claude. הרמה הגלובלית של מנגנון הבקרה התלת־רמתי (משתנה הסביבה גובר על ההגדרה העוקפת בלוח הבקרה). ראו [הגדרת Claude Code](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker).                                                                                                                                                                                       |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`     |            | מתג ראשי עבור כינויי השער no-think/<provider>/<model>. כאשר מופעל (ברירת המחדל): /v1/models מפרסם וריאנט ללא חשיבה עבור כל מודל Claude מתאים בעל יכולת חשיבה, ומזהה no-think/ שנשלח בבקשה נפתר בחזרה למודל האמיתי תוך דיכוי ההסקה. כאשר מושבת: לא מפורסמים וריאנטים, ומזהה no-think/ מטופל כמו כל מזהה מודל לא מוכר אחר. הגדרת ההצטרפות/החרגה לכל מודל `ModelSpec.noThinkingAlias` עדיין חלה כאשר אפשרות זו מופעלת.                                                                                                                             |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false`    |            | השבת את יצירת וריאנטי רמות החשיבה (למשל -low, -medium, -high) בקטלוג /v1/models.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false`    | ✓          | אפשר נתיבי קבלה וירטואליים מסתגלים לכל דייר עבור שיגור לספק (#9654): פרץ תעבורה של דייר אחד לא יגרום עוד לשגיאות 503 אצל דייר אחר. משתנה הסביבה `OMNIROUTE_CHAT_VIRTUAL_LANES` גובר על הגדרה עוקפת זו בלוח הבקרה; השינויים נכנסים לתוקף בעת הפעלה מחדש של השרת.                                                                                                                                                                                                                                                                                 |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | בוליאני | `false`    |            | פרסום מזהי מראה בתבנית <gateway-alias>/<model> עבור מודלים ב־/v1/models, כאשר לבעלים הקנוני שלהם אין פרטי אימות פעילים, אך שער מעבר בעל פרטי אימות פעילים מנתב אותם. אזהרה: הפעלה גלובלית מוסיפה רשומות קטלוג עבור כל הלקוחות.                                                                                                                                                                                                                                                                                                                  |
| `NEWAPI_AGGREGATOR_BALANCE`                 | בוליאני | `false`    |            | הפעלת זיהוי יתרה עבור צמתים התואמים לצוברי New-API / One-API / Sub2API. כאשר האפשרות מופעלת, צמתים תואמים שדגל הצובר מוגדר בהם ידווחו על היתרה שלהם בלוח המחוונים ובניתוב בדיקת המכסה המקדימה.                                                                                                                                                                                                                                                                                                                                                  |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | בוליאני | `false`    |            | המשך קריאות לכלים בבעלות השרת שאינן מוזרמות, עד שהמודל מחזיר תגובה הניתנת לשימוש הלקוח.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | בוליאני | `false`    |            | סטטיסטיקות החיפוש והחיפושים האחרונים סופרים רק ספקים שעדיין יש להם חיבור פעיל (ספקים ללא מפתח, כגון duckduckgo-free, נספרים תמיד). כאשר האפשרות כבויה, נשמרת כל שורת חיפוש שנשמרה ושיש לה מזהה ספק.                                                                                                                                                                                                                                                                                                                                             |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | בוליאני | `false`    |            | דפי ספקים בלוח המחוונים: הצגת תג החינם רק לפי אותות שהספק מכבד — תוך הסרת היוריסטיקת שם התצוגה, שדות חינם שאינם בוליאניים וסיומות :free אצל ספקים רשומים שאין להם מסלול חינמי מתועד. כאשר האפשרות כבויה, נשמר כלל התג ההיסטורי.                                                                                                                                                                                                                                                                                                                 |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | בוליאני | `false`    |            | בתגובות אי־זמינות מצטברות מסוג 429/503, השמטת `Retry-After` כאשר לא ידוע מועד קונקרטי עתידי לניסיון חוזר (במקום ערך מלאכותי של שנייה אחת), הוספת `error.retry_after_provenance` (`signal` \| `none`), ואפשרות לנתיבי ריקון משולבים לקרוא רמזים מילוליים לניסיון חוזר מגופי JSON ומגופי טקסט פשוט של שירותים במעלה הזרם. השדה מופיע רק בתגובות שנבנו באמצעות `unavailableResponse()`; גופי 429/503 אחרים אינם משתנים.                                                                                                                            |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | בוליאני | `false`    |            | כאשר יעד משולב מסוג `priority`, המסומן כיעד חלופי רק בעת מיצוי המכסה, עוצר את השילוב מסיבה שניתן להוכיח שאינה קשורה למכסה (מפסק הזרם של הספק פתוח, דילוג עקב חיזוי השהיה), מוחזרת תגובת 502 במקום תגובת 503 הנראית כקשורה למכסה. עצירות עקב נעילה, תקופת צינון, אי־זמינות, מיצוי והגבלת מקביליות ממשיכות להחזיר 503.                                                                                                                                                                                                                            |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | בוליאני | `false`    |            | תגובת 401 בסיסית של Mistral (`{"detail":"Unauthorized"}`, ללא אות אימות מפורש) זהה עבור מפתח שבוטל ועבור מכסה שמוצתה. כאשר האפשרות מופעלת, החיבור מועבר לתקופת צינון במקום לסמנו כ־`expired`, לכל היותר 3 פעמים בשעה לכל חיבור; התגובה הבאה מסמנת אותו כך, ולכן מפתח שבוטל עדיין מתכנס למצב זה. האפשרות כבויה כברירת מחדל: כל תגובת 401 בסיסית של Mistral מסמנת את החיבור כבעבר.                                                                                                                                                                |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false`    |            | אחזר את קטלוג המודלים העדכני של xAI עבור חיבורי `xai-oauth` מ־`https://api.x.ai/v1/models` באמצעות אסימון הנושא מסוג OAuth, במקום נתוני הבסיס הסטטיים והקבועים. מושבת כברירת מחדל: `xai-oauth` ממשיך להגיש את נתוני הבסיס הסטטיים ללא שינוי. בכל שגיאת זיהוי, מנגנון הגילוי חוזר לנתוני הבסיס (לא אומת אם x.ai מקבל אסימון נושא מסוג OAuth בנקודת קצה זו).                                                                                                                                                                                      |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false`    |            | אפשר לסריקת הניקוי האוטומטית למחוק משימות Batch API סופיות (שהושלמו/נכשלו/בוטלו/פג תוקפן) שגילן עולה על `OMNIROUTE_BATCH_RETENTION_DAYS`, יחד עם נקודות הביקורת שלהן לכל שורה, ולנקות את תוכן ה־BLOB של קבצים שהועלו לאחר המועד `expires_at` שלהם. מושבת כברירת מחדל: כל התקנה קיימת שומרת את הנתונים האלה בדיוק כפי שהיה קודם, עד שמפעיל יבחר להפעיל זאת. הנתיב `DELETE /api/v1/batches/delete-completed`, שמופעל על ידי המפעיל, אינו מושפע בכל מקרה — זהו חוזה API ציבורי נפרד ובלתי מותנה.                                                   |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false`    |            | שריין את חשבון Antigravity שנבחר למשך מחזור החיים של ההזרמה בבקשה שבחרה בו, כדי שניסיון חוזר מקביל או העברת פרטי הגישה לא יוכלו לבחור מחדש חשבון שכבר הוקצה להזרמה פעילה. השריון מוגבל לצמד (חיבור, מודל upstream שניתן לקריאה), כך שחשבון אחד עדיין יכול לשרת שני מודלים שונים בו־זמנית. כאשר כל החשבונות המתאימים כבר מושכרים עבור אותו מודל, הבקשה מחזירה שגיאת 503 מובנית מסוג `antigravity_pool_busy` עם `Retry-After` מוגבל, במקום להעמיס על חשבון עסוק. מושבת כברירת מחדל: בחירת החשבון נשארת בדיוק כפי שהייתה קודם, ולא מתבצע כל שריון. |

### CLI (5)

| מפתח                                  | סוג     | ברירת מחדל | אתחול מחדש | תיאור                                                                                                                                                                                                       |
| ------------------------------------- | ------- | ---------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false`    | ✓          | הפעל מצב תאימות עבור כל לקוחות ה־CLI.                                                                                                                                                                       |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false`    |            | הפעל את שכבת התאימות של כינויי מודלים.                                                                                                                                                                      |
| `PRICING_SYNC_ENABLED`                | boolean | `false`    |            | הפעל סנכרון אוטומטי של נתוני תמחור (דורש גם את משתנה הסביבה `PRICING_SYNC_ENABLED`).                                                                                                                        |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false`    |            | לאחר סנכרון מודלים של ספק, כתוב אוטומטית (מחדש) קובצי פרופיל ~/.codex/*.config.toml מתוך הקטלוג העדכני. לעולם אינו משנה את תצורת Codex הפעילה/ברירת המחדל. מושבת כברירת מחדל.                               |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false`    |            | לאחר סנכרון מודלים של ספק, כתוב אוטומטית (מחדש) פרופילי Claude Code מסוג ~/.claude/profiles/<name>/settings.json מתוך הקטלוג העדכני. לעולם אינו משנה את תצורת Claude הפעילה/ברירת המחדל. מושבת כברירת מחדל. |

### תקינות (5)

| מפתח                                      | סוג     | ברירת מחדל | תיאור                                                                                                                                                                                                                                  |
| ----------------------------------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | בוליאני | `false`    | השבתת נקודת הקצה של בדיקת התקינות של המופע המקומי.                                                                                                                                                                                     |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | בוליאני | `false`    | השבתת בדיקת התקינות של אימות האסימון.                                                                                                                                                                                                  |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | בוליאני | `false`    | הפעלת גישה לרשת בסביבת ארגז החול של המיומנויות.                                                                                                                                                                                        |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | בוליאני | `false`    | בסריקת תקינות ה-proxy, בדיקה שהיעד סירב לה (401/403/429) מאפסת את רצף הכשלים העוקבים של ה-proxy. מושבת כברירת מחדל: סירוב נשאר ניטרלי (#10654). תגובת 5xx נשארת בלתי מכרעת בכל מקרה; סירוב לעולם אינו מסיר, משבית או מפעיל מחדש proxy. |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | בוליאני | `false`    | הרצת בדיקת השלמות/התקינות של מסד הנתונים בעת ההפעלה לאחר שהשרת מתחיל לקבל בקשות (באמצעות `setImmediate`), במקום לחסום את ההפעלה עד להשלמתה (#13717). מושבת כברירת מחדל: ההפעלה נחסמת בדיוק כפי שנחסמה לפני PR זה.                      |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` והכינוי הישן שלו
> `INJECTION_GUARD_BLOCK_THRESHOLD` מכווננים את מצב `block` של
> `INJECTION_GUARD_MODE`, אך הם משתני סביבה רגילים שנקראים על ידי
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts),
> ולא דגלי תכונות: אין להם דריסה במסד הנתונים ואין להם מתג בלוח הבקרה. ראו
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication).

> [!NOTE]
> העמודה `Restart` מסמנת דגלים עם `requiresRestart: true` — הערך נשמר
> באופן מיידי, אך נכנס לתוקף רק לאחר שהתהליך נטען מחדש. דגלי enum
> דוחים כל ערך שאינו שייך לקבוצת הערכים המותרת שלהם (האימות מתבצע בצד השרת
> הן ב-`setFeatureFlagOverride()` והן במטפל `PUT` של REST).

---

## הפעלה וכיבוי של דגלים

### לוח הבקרה

נווטו אל **לוח הבקרה → הגדרות → דגלי תכונות**
(`/dashboard/settings/feature-flags`). הרשת
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
תומכת באפשרויות הבאות:

- **חיפוש** לפי מפתח או תיאור, ו**סינון** לפי קטגוריה (וכן תצוגת
  **דורש הפעלה מחדש** סינתטית).
- **מתג** עבור דגלים בוליאניים ו**רשימה נפתחת** עבור דגלי enum
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`).
- **תג מקור** לכל דגל — `DB`,‏ `ENV` או `DEF` — המציג מהיכן הגיע
  הערך האפקטיבי.
- כפתור **איפוס** (מוצג רק עבור דגלים שמקורם ב-`DB`) להסרת הדריסה,
  וכפתור **איפוס כל הדריסות** בתחתית.
- כרזת **הפעלה מחדש של השרת** כאשר דגל `requiresRestart` משתנה.

### REST API

כל הפעולות מתבצעות דרך נתיב יחיד:
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts).
כל מתודה דורשת הפעלת לוח בקרה מאומתת (אחרת מוחזר `401`).

#### `GET /api/settings/feature-flags`

מחזירה את כל הדגלים יחד עם הערך האפקטיבי, המקור והסיכום שלהם.

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
    // ... כל 74 הדגלים
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

מנקה את **כל** דריסות מסד הנתונים בבת אחת, ומשחזרת כל דגל לערך הסביבה / ברירת
המחדל שלו. מחזירה `{ cleared: <count>, message: "..." }`.

> [!NOTE]
> דגלים עם `requiresRestart: true` נכנסים לתוקף רק לאחר טעינה מחדש של התהליך.
> תהליך ההפעלה מחדש של לוח הבקרה קורא אל `POST /api/restart` ולאחר מכן מתשאל את
> `GET /api/health/ping` עד שהשרת חוזר לפעולה.

---

## חלופת חירום לתקציב

`OMNIROUTE_EMERGENCY_FALLBACK` (קטגוריה `runtime`, ברירת מחדל `true`) שולט
בנתיב חלופת החירום החינמית שבקובץ
[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts).
כאשר הוא מופעל, בקשות שממצות את תקציבן מנותבות לספק/מודל חלופי חינמי במקום
להיכשל לחלוטין. הגדירו אותו כ-`false` (או `0`) — באמצעות המתג בלוח הבקרה,
דריסת DB או משתנה הסביבה `OMNIROUTE_EMERGENCY_FALLBACK` — כדי להשבית את
ההתנהגות ולאפשר לבקשות שמיצו את תקציבן להיכשל. (הוצג כמתג בלוח הבקרה
ב-PRs #3741 / #3752.)

---

## ראו גם

- [הפניה למשתני סביבה](./ENVIRONMENT.md) — לרוב הדגלים יש משתנה סביבה
  בעל שם זהה המתועד שם (הדריסה במסד הנתונים מקבלת
  עדיפות עליו).
- [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
  — מקור האמת עבור כל דגל.
- [`src/shared/utils/featureFlags.ts`](../../src/shared/utils/featureFlags.ts)
  — לוגיקת ההכרעה (`resolveFeatureFlag`, `isFeatureFlagEnabled`,
  `resolveAllFeatureFlags`).
- [`src/lib/db/featureFlags.ts`](../../src/lib/db/featureFlags.ts) — שמירת הדריסה
  במסד הנתונים במרחב השמות `feature_flags` של הטבלה `key_value`.
