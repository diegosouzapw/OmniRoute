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

77 דגלים ב-6 קטגוריות. **ברירת מחדל** היא הגדרת ברירת המחדל – הערך המשמש כאשר אין עקיפה של מסד נתונים ואין משתנה סביבה.

### אבטחה (10)

| מפתח | סוג | ברירת מחדל | תיאור (
| `REQUIRE_API_KEY` | boolean | `false` | דורש מפתח API עבור כל הבקשות הנכנסות. |
| `INPUT_SANITIZER_ENABLED` | boolean | `true` | מפעיל ניקוי קלט עבור כל הבקשות. |
| `INJECTION_GUARD_MODE` | enum | `off` | מצב הגנה מפני הזרקת הנחיות (prompt injection). ערכים: `off`, `warn`, `block`, `redact`. |
| `PII_REDACTION_ENABLED` | boolean | `false` | מסיר PII (מידע מזהה אישי) מבקשות (בלתי תלוי ב-`INPUT_SANITIZER_MODE`). |
| `PII_RESPONSE_SANITIZATION` | boolean | `false` | מנקה PII מתגובות ספק. |
| `PII_RESPONSE_SANITIZATION_MODE` | enum | `redact` | מצב לניקוי PII מתגובות. ערכים: `redact`, `warn`, `block`, `off`. |
| `OUTBOUND_SSRF_GUARD_ENABLED` | boolean | `true` | חוסם בקשות יוצאות לטווחי IP פרטיים/פנימיים. |
| `ALLOW_API_KEY_REVEAL` | boolean | `false` | מאפשר למשתמשי לוח מחוונים מאומתים לחשוף מפתחות API שמורים במקום לראות רק ערכים ממוסכים. |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID` | boolean | `false` | כולל קידומת חשבון בשורות יומן AUTH (לדוגמה: "Using <provider> account: abc12345..."). מושבת כברירת מחדל כך שמזהי חשבון מוסרים מיומני תהליכים משותפים/מרובי דיירים. בלתי תלוי במצב Debug; הפעלת מצב Debug אינה חושפת זאת. |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false` | כאשר OIDC מופעל, משבית כניסה באמצעות סיסמה כך שמשתמשים יכולים לאמת רק באמצעות OIDC Single Sign-On. כאשר מושבת (ברירת מחדל), גם כניסה באמצעות סיסמה וגם OIDC זמינים. |

### רשת (19)

| Key                                             | Type    | Default | Restart | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------------------------------------- | :------ | :------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓       | הפעל מצב התגנבות של טביעת אצבע TLS.                                                                                                                                                                                                                                                                                                                                                            |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |         | אפשר לניתובים `/v1/audio/*` להשתמש בצמתי ספק תואמי OpenAI המתארחים מחוץ ל-localhost. כבוי כברירת מחדל — ניתוב אודיו למארח מרוחק משנה את זהות היציאה וחייב להיות החלטה מפורשת של המפעיל. צמתי לולאה חוזרת תמיד מותרים ואינם מושפעים.                                                                                                                                                            |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |         | אפשר ל-`POST /v1/rerank` (ולשלב ה-rerank בלולאה החוזרת של מנוע הזיכרון) להשתמש בצמתי ספק תואמי OpenAI המתארחים מחוץ ל-localhost. כבוי כברירת מחדל — ניתוב למארח מרוחק משנה את זהות היציאה וחייב להיות החלטה מפורשת של המפעיל. צמתי לולאה חוזרת תמיד מותרים; צמתים מרוחקים חייבים גם לעבור את מדיניות ה-URL היוצא של הספק.                                                                      |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |         | כאשר לא מוקצה פרוקסי לחיבור, בחר אוטומטית את הפרוקסי הפועל הראשון מהרישום. כבוי כברירת מחדל (אחרת כל פרוקסי מהרישום הופך לגיבוי גלובלי — #3332).                                                                                                                                                                                                                                               |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |         | אפשר לזרימות אימות OAuth וספק לעקוף פרוקסי מוצמד ולהתחבר ישירות כאשר בדיקות מקדימות של נגישות הפרוקסי נכשלות. כבוי כברירת מחדל מכיוון שזה יכול לשנות את כתובת ה-IP היוצאת.                                                                                                                                                                                                                     |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |         | במקרה של חריגת רשת (פסק זמן, חיבור נדחה/אופס) עבור מפעיל סיבוב מרובה חשבונות, כאשר לחשבון הכושל אין פרוקסי ייעודי, החל תקופת צינון קצרה ודלג על חשבונות אחרים ללא פרוקסי עבור יתרת הבקשה במקום לנסות שוב כל אחד מהם. מופעל כברירת מחדל (בטוח: אין שינוי בכתובת ה-IP היוצאת, רק מפחית את הסיכון של השהיה/צינון בחשבונות עם יציאה משותפת). השבת כדי לשחזר הפצה מיידית בזריקה הראשונה ללא פרוקסי. |
| `ROTATION_ATTRIBUTION`                          | boolean | `false` |         | סיבוב Opencode מתעד איזה חשבון שירת או דולג (מזהים מוסווים בלבד, לעולם לא מזהי חשבון מלאים) ומקשר רשומות יומן פרוקסי לבקשתן, כך שהמפעיל יכול להבחין בין חשבונות שדולגו לבין חשבונות שאינם בשימוש. כבוי כברירת מחדל.                                                                                                                                                                            |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false` |         | מאגרי פרוקסי וסיבוב ה-opencode לכל חשבון מפסיקים לשרת מחדש פרוקסי שנכשל זה עתה (בדיקת TCP נדחתה, או 429 שהתקבל דרכו) למשך תקופה לכל תהליך המכפילה את עצמה בכל חזרה, עד לתקרה. לא נכתב סטטוס פרוקסי; עם כל מועמד שמונח בצד, הבחירה נשארת ללא שינוי. כבוי כברירת מחדל.                                                                                                                           |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |         | הצג, תחת מאגר פרוקסי בלוח המחוונים, כמה כתובות IP יוצאות נצפו ששירתו את חבריו במהלך 24 השעות האחרונות וכמה חיבורים השתמשו בהן. קריאה בלבד, מחושב מיומן הפרוקסי, לעולם לא משמש לניתוב. כבוי כברירת מחדל.                                                                                                                                                                                        |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |         | עבור מפעיל ה-OpenCode, עקוב אחר הבייט הראשון של גוף תגובת Responses מוזרמת (חלון: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`, ברירת מחדל `15000`). זרם Responses מסוג 2xx שנשאר שקט מעבר לחלון נחשב כנתקע: החשבון מקורר והבקשה עוברת לחשבון הבא פעם אחת; עצירה שנייה נכשלת במהירות. כבוי כברירת מחדל: זרמים תקועים שומרים על ההמתנה הנוכחית עד לפסק הזמן של מוכנות הזרם.                                |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |         | מפעיל OpenCode: בתגובת 403/451 המכילה סירוב `user_blocked` (לא גיאוגרפי, לא דחיית טביעת אצבע של Cloudflare), קרר את החשבון שסורב והעבר את הבקשה לחשבון הבא לכל היותר פעם אחת לכל בקשה; סירוב שני מוחזר כפי שהוא, ללא סימן הצלחה. כבוי כברירת מחדל: עקיפת חסימת משתמש במעלה הזרם יכולה להיראות כהתחמקות ולהפיץ את הדגל על פני הצי.                                                              |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |         | סיבוב OpenCode: לאחר שתי כשלים זמניים רצופים במעלה הזרם (5xx או 400 ריק), השהה לפני החשבון הבא — הכפלה של 1.5 שניות לכל כשל נוסף, מוגבל ל-6 שניות להשהיה ו-10 שניות לבקשה, מדלג על ניתוק לקוח; הגוף שנכשל משוחרר לפני ההמתנה. כבוי כברירת מחדל: מעבר כשלים נשאר מיידי.                                                                                                                         |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |         | סיבוב OpenCode: החנה את הבקשה לאחר 429s זמניים חוזרים ונשנים (או סמן חדש של עומס מאגר) עם פעימת לב, ולאחר מכן הפעל מחדש רגל מוגבלת אחת של עד 3 חשבונות עוקבים במקום לפזר את כל הצי. כבוי כברירת מחדל: כל 429 עובר לחשבון הבא בדיוק כמו קודם.                                                                                                                                                   |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false` |         | בפניות סטרימינג מתורגמות, כאשר הפנייה במעלה הזרם אינה מכילה תוכן שמיש (השלמה מבוססת היגיון בלבד או אפס נתחים בעלי ערך), בצע ניסיונות חוזרים מוגבלים דרך נתיב האישורים הרגיל (עד `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX`) לפני שכל דבר נחשף ללקוח. כבוי כברירת מחדל: פניות ריקות שומרות על ההתנהגות הנוכחית (200 ריק או 502 עם תוכן ריק).                                                        |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |         | סיבוב OpenCode: עצור את גל החשבונות ב-429 הראשון המסווג כמגבלת קצב אמיתית (`Retry-After` שניתן לניתוח, או גוף המציין מגבלת קצב/שימוש) והחזר את ה-429 במעלה הזרם ללא שינוי. 429s לא מסווגים ממשיכים להסתובב. כבוי כברירת מחדל: השכבה החינמית מוגבלת לכל IP יציאה (#9611), כך שכל 429 מסתובב וגל מותש מחזיר את ה-429 האחרון במעלה הזרם.                                                          |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓       | השבת אימות אישורי TLS עבור פרוקסי ה-MITM. **סכנה.**                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |         | אפשר כתובות URL של ספקים המצביעות על רשתות פרטיות/פנימיות.                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |         | אפשר הוספה/אימות של ספקים בכתובות מקומיות/פרטיות (127.0.0.1, localhost, LAN). מופעל כברירת מחדל (מקומי-ראשון); השבת לחסימה קפדנית של ציבורי בלבד. מטא-נתונים בענן נשארים חסומים.                                                                                                                                                                                                               |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓       | אפשר מצב ספק תואם Claude Code.                                                                                                                                                                                                                                                                                                                                                                 |

### מדיניות (5)

| מפתח                            | סוג     | ברירת מחדל | תיאור                                                                                                                                                               |
| :------------------------------ | :------ | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | מצב אכיפת מדיניות שימוש בכלים. ערכים: `disabled`, `warn`, `block`.                                                                                                  |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | הפעלת הגבלת קצב באופן אוטומטי בהתבסס על דפוסי שימוש.                                                                                                                |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | דלג על בדיקת חלון ההקשר המקומי / אסימון קלט מקסימלי של OmniRoute עבור בקשות ישירות למודל יחיד. מגבלות ה-upstream עדיין חלות.                                        |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | דחה בקשות לפני שליחה כאשר למודל היעד חסרות יכולות נדרשות (ראייה, כלים, פלט מובנה, חלון הקשר). מגן על בקשות ישירות מספק יחיד העוקפות את מסנן התאימות של שכבת הקומבו. |
| `RADAR_ENABLED`                 | boolean | `false`    | הפעל את מודול OmniRoute Radar (מסכי הזנת קטלוג וסנכרון). כבוי כברירת מחדל; הפעלה רק פותחת את ממשק המשתמש — סנכרון נתונים נשאר אופציה נפרדת.                         |

### זמן ריצה (33)

| מפתח                                        | סוג     | ברירת מחדל | הפעלה מחדש | תיאור                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------- | ------- | ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`     |            | יצירה והזרקה של סיכומי שיחות כאשר ניתוב משולב מחליף מודלים. השבתה כדי לטפל בהחלפות מודלים באופן עצמאי ולמנוע בקשות העברה ברקע עבור כל השילובים הקיימים והעתידיים.                                                                                                                                                                                                                                                                                                                                      |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`     |            | השמטת פריטי פלט של שלב פרשנות פנימית מזרמי מעבר API של תגובות לפני העברה ללקוחות. השבתה כדי לקבל פרשנות גולמית מהזרם העליון.                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`     |            | אכיפת הגבלות היקף על גישת כלי MCP.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false`    |            | דחיסת תיאורי כלי MCP כדי להפחית את השימוש באסימונים.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false`    |            | הפעלת עיבוד משימות רקע בזמן ריצה.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false`    | ✓          | השבתת כל שירותי הרקע (רענון מכסה, סנכרון וכו').                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false`    |            | סמוך על מסנני RTK ברמת הפרויקט ללא אימות.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`     | ✓          | הפעל את שרת ה-WebSocket של לוח המחוונים בזמן אמת בעת ייבוא (פורט 20132 כברירת מחדל).                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`     |            | אפשר ל-Codex להשתמש בתעבורת Responses-over-WebSocket. כאשר כבוי, Codex חוזר ל-HTTP Responses.                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`     |            | אפשר ל-Codex להשתמש בתעבורת JSON-RPC של WebSocket של שרת היישומים המקומי (codexTransport=app-server). כאשר כבוי, חיבורים שבחרו בשרת היישומים חוזרים לתעבורות האחרות של Codex.                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`     |            | נתב בקשות שתקציבן אזל לספק/מודל החירום החינמי החלופי. (ראה [Emergency Budget Fallback](#emergency-budget-fallback) להלן.)                                                                                                                                                                                                                                                                                                                                                                              |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false`    |            | אפשר ניסיון חוזר שקוף מוקדם עבור זרמי SSE קטועים במעלה הזרם לפני שבתים כלשהם של תגובה מגיעים ללקוח.                                                                                                                                                                                                                                                                                                                                                                                                    |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false`    |            | אפשר שחזור זרם לבקש מחדש ולחבר תגובה לאחר שבתים כבר הגיעו ללקוח.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false`    |            | הפוך המשך אמצע זרם לבטוח לקריאת כלי: לעולם אל תחדש זרם חתוך ברגע שקריאת כלי נפלטה (בטיסה או כבר הסתיימה עם finish_reason tool_calls), וסגור לאחר המשך ריק אחד במקום לבזבז את כל התקציב. כבוי: התנהגות שחרור.                                                                                                                                                                                                                                                                                           |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false`    |            | מעבר כשל פעם אחת לחיבור אח כאשר זרם SSE נסגר לפני פליטת כל פריים שימושי והניסיון החוזר המוגבל באותו חיבור מוצה; ללא אח זמין, מוחזר ה-502 המקורי של `STREAM_EARLY_EOF`. כבוי כברירת מחדל: EOF מוקדם נשאר סופי לאחר הניסיון החוזר באותו חיבור.                                                                                                                                                                                                                                                           |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`     |            | כלול שדות שם ידידותיים לתצוגה בתגובות `/v1/models`. השבת עבור לקוחות המצפים למזהי מודל בלבד.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`     |            | קובע כיצד מזהי מודל מקבלים קידומת ב-/v1/models. 'dual' (ברירת מחדל) פולט קידומות כינוי וגם קידומות מזהה ספק קנוניות לתאימות לאחור. 'alias' פולט רק את קידומת הכינוי הקצרה (לדוגמה, ds-web/model, לא deepseek-web/model). 'canonical' פולט רק את קידומת מזהה הספק המלאה. ערכים: `dual`, `alias`, `canonical`.                                                                                                                                                                                           |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`     |            | אפשר סנכרון תקופתי של ELO של לוח המובילים של Arena AI לדירוגי בינת מודלים.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false`    |            | פרסם מזהי מראה `claude/<provider>/<model>` ב-/v1/models כך שגילוי מודלים של שער Claude Code יציג מודלים שאינם Claude. רמה גלובלית של השער התלת-שכבתי (הסביבה גוברת על עקיפת לוח המחוונים). ראה [תצורת Claude Code](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker).                                                                                                                                                                           |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`     |            | מתג ראשי עבור כינויי השער no-think/<provider>/<model>. מופעל (ברירת מחדל): /v1/models מפרסם גרסת no-thinking עבור כל מודל Claude כשיר בעל יכולת חשיבה, ומזהה no-think/ שנשלח בבקשה נפתר בחזרה למודל האמיתי עם דיכוי חשיבה. כבוי: לא מפורסמות גרסאות, ומזהה no-think/ מטופל כמו כל מזהה מודל לא ידוע אחר. ה-ModelSpec.noThinkingAlias לכל מודל עדיין חל כאשר זה מופעל.                                                                                                                                  |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false`    |            | השבת את יצירת גרסאות רמת חשיבה (לדוגמה, -low, -medium, -high) בקטלוג /v1/models.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false`    | ✓          | אפשר נתיבי קבלה וירטואליים אדפטיביים לכל דייר עבור שיגור ספקים (#9654): התפרצות של דייר אחד כבר לא גורמת ל-503 אצל אחר. משתנה הסביבה `OMNIROUTE_CHAT_VIRTUAL_LANES` גובר על עקיפת לוח המחוונים הזו; שינויים נכנסים לתוקף באתחול מחדש של השרת.                                                                                                                                                                                                                                                          |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false`    |            | פרסם מזהי מראה של <gateway-alias>/<model> ב-/v1/models עבור מודלים שהבעלים הקנוני שלהם אינו בעל אישור פעיל, אך שער מעבר (passthrough gateway) עם אישור פעיל מנתב אותם. אזהרה: מוסיף רשומות קטלוג לכל הלקוחות כאשר מופעל גלובלית.                                                                                                                                                                                                                                                                       |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false`    |            | אפשר זיהוי יתרה עבור צמתים תואמי אגרגטור של New-API / One-API / Sub2API. כאשר מופעל, צמתים תואמים עם דגל האגרגטור מוגדר ידווחו על יתרתם בלוח המחוונים ובניתוב בדיקת מכסה מוקדמת.                                                                                                                                                                                                                                                                                                                       |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false`    |            | המשך קריאות לכלי בבעלות השרת שאינן בסטרימינג עד שהמודל יחזיר תגובה שמישה ללקוח.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false`    |            | סטטיסטיקות חיפוש וחיפושים אחרונים סופרים רק ספקים שיש להם עדיין חיבור פעיל (ספקים ללא מפתח כגון duckduckgo-free נספרים תמיד). כיבוי משאיר כל שורת חיפוש שנשמרה עם מזהה ספק.                                                                                                                                                                                                                                                                                                                            |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false`    |            | דפי ספק בלוח המחוונים: הצג את תג 'חינם' רק על אותות שהספק מכבד — מבטל את היוריסטיקת שם התצוגה, שדות 'חינם' שאינם בוליאניים וסיומות :free על ספקים רשומים ללא שכבת חינם מתועדת. כיבוי משאיר את כלל התג ההיסטורי.                                                                                                                                                                                                                                                                                        |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false`    |            | בתגובות 429/503 מצטברות שאינן זמינות, השמט את `Retry-After` כאשר לא ידוע זמן ניסיון חוזר עתידי קונקרטי (במקום שנייה אחת סינתטית), הוסף `error.retry_after_provenance` (`signal` \| `none`), ואפשר לנתיבי ניקוז משולבים לקרוא רמזי ניסיון חוזר פרוזאיים מגופי JSON וטקסט רגיל במעלה הזרם. השדה מופיע רק בתגובות שנבנו על ידי `unavailableResponse()`; גופי 429/503 אחרים נשארים ללא שינוי.                                                                                                              |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false`    |            | כאשר יעד משולב `priority` המסומן כ-fallback-only-on-quota-exhaustion עוצר את השילוב מסיבה שאינה ניתנת להוכחה כמכסה (מפסק זרם של ספק פתוח, דילוג על חביון חזוי), השב 502 במקום 503 שנראה כמו מכסה. עצירות של נעילה, צינון, אי-זמינות, מיצוי ומגבלת מקביליות שומרות על 503.                                                                                                                                                                                                                              |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false`    |            | תגובת Mistral 401 חשופה (`{"detail":"Unauthorized"}`, ללא אות אימות מפורש) זהה עבור מפתח שבוטל ועבור מכסה מנוצלת. כאשר מופעל, הוא מקרר את החיבור במקום להחנות אותו כ-`expired`, לכל היותר 3 פעמים בשעה לכל חיבור; הבא יחנה אותו, כך שמפתח שבוטל עדיין מתכנס. כבוי כברירת מחדל: כל Mistral 401 חשוף מחנה את החיבור כפי שהיה קודם.                                                                                                                                                                       |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false`    |            | אחזור קטלוג מודלי xAI החי עבור חיבורי `xai-oauth` מ-`https://api.x.ai/v1/models` באמצעות אסימון נושא OAuth, במקום ה-seed הסטטי הקפוא. כבוי כברירת מחדל: `xai-oauth` ממשיך להגיש את ה-seed הסטטי ללא שינוי. בכל שגיאת רזולוציה, הגילוי חוזר ל-seed (לא מאומת אם x.ai מקבל אסימון נושא OAuth בנקודת קצה זו).                                                                                                                                                                                             |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false`    |            | אפשר למנגנון הניקוי האוטומטי למחוק משימות Batch API סופיות (שהסתיימו/נכשלו/בוטלו/פגו תוקף) ישנות יותר מ-`OMNIROUTE_BATCH_RETENTION_DAYS`, יחד עם נקודות הבדיקה שלהן לכל שורה, ולנקות את תוכן ה-BLOB של קבצים שהועלו שעברו את `expires_at` שלהם. כבוי כברירת מחדל: כל התקנה קיימת שומרת נתונים אלה בדיוק כפי שהיו קודם לכן עד שמפעיל יבחר להפעיל זאת. הנתיב `DELETE /api/v1/batches/delete-completed` המופעל על ידי המפעיל אינו מושפע בשום אופן – זהו חוזה API ציבורי נפרד ובלתי מותנה.                 |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false`    |            | שמור את חשבון Antigravity הנבחר עבור מחזור החיים של הזרמת הבקשה שבחרה בו, כך שניסיון חוזר מקביל או העברת אישורים לא יוכלו לבחור מחדש חשבון שכבר מוקצה לזרם פעיל. השמירה מוגבלת ל-(חיבור, מודל upstream שניתן לקרוא לו), כך שחשבון אחד עדיין יכול לשרת שני מודלים שונים בו-זמנית. כאשר כל חשבון זכאי כבר מושכר עבור מודל זה, הבקשה מחזירה 503 מובנה `antigravity_pool_busy` עם `Retry-After` מוגבל במקום להצטבר על חשבון עמוס. כבוי כברירת מחדל: בחירת החשבון נשארת בדיוק כפי שהייתה, ולא מתבצעת שמירה. |

### CLI (5)

| Key                                   | Type    | Default | Restart | Description                                                                                                                                                                                        |
| ------------------------------------- | ------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓       | הפעל מצב תאימות עבור כל לקוחות ה-CLI.                                                                                                                                                              |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |         | הפעל שכבת תאימות של כינויי מודלים.                                                                                                                                                                 |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |         | הפעל סנכרון נתוני תמחור אוטומטי (דורש גם את משתנה הסביבה `PRICING_SYNC_ENABLED`).                                                                                                                  |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |         | לאחר סנכרון מודל ספק, כתוב מחדש אוטומטית קבצי פרופיל ~/.codex/*.config.toml מקטלוג המודלים החי. לעולם אינו משנה את תצורת Codex הפעילה/ברירת המחדל. כבוי כברירת מחדל.                               |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |         | לאחר סנכרון מודל ספק, כתוב מחדש אוטומטית קבצי פרופיל ~/.claude/profiles/<name>/settings.json Claude Code מקטלוג המודלים החי. לעולם אינו משנה את תצורת Claude הפעילה/ברירת המחדל. כבוי כברירת מחדל. |

### תקינות (5)

| Key                                       | Type    | Default | Description                                                                                                                                                                                                                             |
| ----------------------------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | מבטל את נקודת הקצה של בדיקת תקינות המופע המקומי.                                                                                                                                                                                        |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | מבטל את בדיקת תקינות אימות האסימון.                                                                                                                                                                                                     |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | מאפשר גישת רשת בסביבת ארגז החול של הכישורים.                                                                                                                                                                                            |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | בסריקת תקינות ה-proxy, בדיקה שהיעד סירב לה (401/403/429) מאפסת את רצף הכשלים הרצופים של ה-proxy. כבוי כברירת מחדל: סירוב נשאר ניטרלי (#10654). שגיאת 5xx נשארת לא חד משמעית בכל מקרה; סירוב לעולם אינו מסיר, משבית או מפעיל מחדש proxy. |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | מריץ את בדיקת תקינות/שלמות מסד הנתונים בעת ההפעלה לאחר שהשרת מתחיל לקבל בקשות (באמצעות `setImmediate`) במקום לחסום את ההפעלה עד להשלמתה (#13717). כבוי כברירת מחדל: ההפעלה נחסמת בדיוק כמו לפני PR זה.                                  |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` והכינוי הישן שלו
> `INJECTION_GUARD_BLOCK_THRESHOLD` מכווננים את מצב ה-`block` של
> `INJECTION_GUARD_MODE`, אך הם משתני סביבה רגילים הנקראים על ידי
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts),
> ולא דגלי תכונה: אין להם עקיפה במסד הנתונים ואין להם מתג בלוח המחוונים. ראה
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication).

> [!NOTE]
> העמודה `Restart` מסמנת דגלים עם `requiresRestart: true` — הערך נשמר באופן מיידי אך נכנס לתוקף רק לאחר טעינה מחדש של התהליך. דגלי Enum דוחים כל ערך מחוץ לקבוצה המותרת שלהם (מאומת בצד השרת הן ב-`setFeatureFlagOverride()` והן במטפל ה-`PUT` של ה-REST).

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
