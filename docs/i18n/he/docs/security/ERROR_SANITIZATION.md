# Error Message Sanitization (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **מקור האמת:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, והבנאים הציבוריים ב-`open-sse/utils/error.ts`
> **בדיקות:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **עדכון אחרון:** 2026-09-02 — v3.8.51
> **קהל יעד:** כל מהנדס שעוסק בתגובות שגיאה (נתיבי HTTP, זרמי SSE, מנגנוני ביצוע, מטפלי MCP).
> **סטטוס:** **חובה** עבור כל נתיב קוד שמחזיר הודעת שגיאה ללקוח.

## מדוע זה קיים

הכלל `js/stack-trace-exposure` של CodeQL (CWE-209) מסמן כל נתיב קוד שבו הודעת שגיאה שמקורה בחריגת זמן ריצה מגיעה לתגובת HTTP / SSE מבלי לעבור סניטציה. עקבות מחסנית ונתיבי קבצים מוחלטים בתגובות סביבת ייצור מספקים לתוקפים:

- מבנה ספריות פנימי (`/srv/app/src/lib/...`) → איסוף מודיעין לקראת מתקפות נוספות.
- גרסאות של ספריות / תשתיות תוכנה שניתן להסיק ממסגרות המחסנית → בחירה ממוקדת של ניצול חולשות.
- ערכי זמן ריצה רגישים שעשויים להשתלב כמחרוזות בשגיאות (שאילתות DB, ערכי תצורה).

כלי העזר `sanitizeErrorMessage` המיוצא על ידי `open-sse/utils/error.ts` מסיר את סוגי
הדליפה הבאים:

1. סיומות של מסגרות מחסנית JavaScript פיזיות, מסודרות בסריאליזציה או מוטבעות באופן חד-משמעי.
2. נתיבי מערכת קבצים מוחלטים מסוג POSIX, Windows, UNC ו-`file://`, תוך שימור כתובות URL בטוחות מסוג HTTPS
   ונתיבי API המסומנים במפורש.
3. השמות של פרטי הזדהות, תבניות אסימון נפוצות של ספקים, בלוקי PEM של מפתחות פרטיים וכתובות URL של נתוני base64.

הסניטייזר מגביל את אורך הקלט ונכשל באופן סגור כאשר ערך שנזרק דוחה המרה למחרוזת.
סניטציה רקורסיבית של JSON ממקור חיצוני מסירה גם מפתחות לא בטוחים של פרטי הזדהות/נתיבים, כינויים של הפעלות
ומפתחות לשליטה באב-טיפוס לפני ביצוע סריאליזציה של תגובה.

## התבנית המחייבת

### 1. בניית תגובת שגיאה (נתיבי HTTP / API)

יש להשתמש ב-`buildErrorBody()` — הסניטציה מובנית:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... לוגיקת המטפל ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

לחלופין, ניתן להשתמש בפונקציות העטיפה הנוחות שבאותו מודול:

```ts
import {
  errorResponse, // אובייקט Response בפעולה אחת
  writeStreamError, // כותב SSE
  createErrorResult, // מבנה { success: false, status, response, ... }
  unavailableResponse, // מוסיף Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

כולן מחילות את גבול השגיאה הציבורי הקנוני. הפונקציות `errorResponse`, `writeStreamError`
ו-`createErrorResult` עוברות דרך `buildErrorBody`; שלוש פונקציות העזר הייעודיות לניסיון חוזר/מפסק
מקרינות ומסנטזות ישירות את ההקשר הציבורי שלהן. **לעולם אין צורך לקרוא ל-`sanitizeErrorMessage`
באופן ידני** בעת שימוש בפונקציות עזר אלה.

### 2. מעטפות שגיאה מותאמות אישית (נדיר)

כאשר לא ניתן להשתמש בפונקציות העזר לעיל (למשל, כאשר מבנה התגובה מוכתב על ידי פרוטוקול חיצוני כמו Connect-RPC), יש לייבא את `sanitizeErrorMessage` ישירות:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

זו הדרך המאושרת היחידה להרכיב גוף שגיאה מותאם אישית. מימוש לדוגמה נמצא ב-`open-sse/executors/cursor.ts::buildErrorResponse`.

### 3. רישום ביומן לעומת שליחת תגובה

חריגות פנימיות מהימנות יכולות לשמור את ההודעה ואת עקבות המחסנית המלאות שלהן, כדי שמפעילים יוכלו לבצע ניפוי שגיאות. ערכים
שמקורם בגבולות של ספקים, אימות, הפעלות דפדפן או אזורים הסמוכים לפרטי הזדהות חייבים לעבור
סניטציה לפני כניסתם לפלט המסוף, למטא-נתונים של ביקורת או ליומני קריאות מתמשכים. התבנית:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // חריגה פנימית מהימנה בלבד
  return errorResponse(500, getErrorMessage(err)); // עבר סניטציה — נשלח ללקוח
}
```

עבור כשלים הנשלטים על ידי ספק, יש להקרין גם את הערך הנרשם ביומן:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. תבניות אסורות

❌ **לעולם אין** להכניס פלט גולמי של חריגה לגוף של Response:

```ts
// גרוע: עקבות מחסנית ונתיבי קבצים מגיעים ללקוח
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **לעולם אין** לממש מפצל שורה ראשונה באופן עצמאי:

```ts
// גרוע: אינו מסיר נתיבים מוחלטים ועלול לסטות מכלי העזר הקנוני
const safe = String(err).split("\n")[0];
```

❌ **לעולם אין** לבצע סניטציה בנתיב ולשכוח את נתיב ה-SSE. כל דבר שכותב לזרם עובר דרך `writeStreamError` (או דרך `buildErrorBody` שבבסיסו).

❌ **לעולם אין** לכלול בכוונה את `process.cwd()`,‏ `__filename`,‏ `__dirname` או נתיבים שמקורם במשתני סביבה
בהודעות שגיאה. הסניטייזר מטפל בנתיבים מוחלטים כשכבת הגנה נוספת, אך מלכתחילה אסור לקוד הקורא
לבנות הודעות שחושפות את הטופולוגיה.

## כיסוי ב-CI

`tests/unit/error-message-sanitization.test.ts` אוכף:

- כל נתיב תחת `/api/model-combo-mappings/*` מחזיר גופי תגובה שעברו טיהור בשגיאות 4xx/5xx.
- `sanitizeErrorMessage` מסיר עקבות מחסנית מרובי שורות.
- `sanitizeErrorMessage` מחליף נתיבים מוחלטים של POSIX ושל Windows ב-`<path>`.
- `sanitizeErrorMessage` מטפל בבטחה בקלטים מסוג `null`/`undefined`/מופע `Error`.
- `buildErrorBody` לעולם אינו חושף עקבות מחסנית בשדה `message` שלו.

בעת הוספת נתיב או executor חדשים, יש להעתיק את תבנית ה-assertion מקובץ זה. סף הכיסוי (`npm run test:coverage`) אוכף כיסוי של ≥60% מה-statements/lines/functions/branches — חובה לכסות נתיבי שגיאה.

## בקרות קשורות

- התראות CodeQL מסוג `js/stack-trace-exposure` ב-`.github/security` צריכות תמיד להיות **או** מתוקנות באמצעות פונקציות עזר אלה **או** מסומנות כנדחות בצירוף הערה המפנה למסמך זה.
- תצורת ההשחרה של `pino` (`src/shared/utils/logRedaction.ts`) מטפלת בנפרד ביומנים מובנים ומהימנים. מסמך זה עוסק בהודעות תגובה ציבוריות ובערכים הנשלטים בידי ספקים, שחוצים גבולות של קריאות מתמשכות/יומני proxy.
- רשימת החסימה של כותרות upstream (`src/shared/constants/upstreamHeaders.ts`) מטפלת בדליפת כותרות — בעת הוספת חשש חדש לזליגת מידע, יש לשמור על תיאום בין שני הקבצים.

## העברת פרטי upstream

`buildErrorBody` מקבל ארגומנט שלישי אופציונלי, `upstreamDetails` (גוף גולמי שנותח מספק ה-upstream). כאשר הוא מסופק, הוא עובר טיהור באמצעות `sanitizeUpstreamDetails` לפני הכללתו בתגובה בתור `upstream_details`.

ארגומנט רביעי אופציונלי, `classification`
‏(`{ type?: string; code?: string; reason?: string }`), מקבל סיווג ציבורי מפורש.
כל שדה ממופה לאוצר המזהים הציבוריים המוגבל. ערכים לא בטוחים, דמויי פרטי גישה,
המכילים תווי בקרה או ארוכים מדי חוזרים לברירת המחדל של type/code הנגזרת מהסטטוס; reason אופציונלי
שאינו בטוח מושמט. מזהי סטטוס HTTP בני שלוש ספרות (`100` עד `599`) נשארים תקפים עבור
חוזי ספק החושפים את סטטוס ה-upstream המספרי כקוד קריא למכונה. אותו טווח
מוגבל מתקבל גם בצורת placeholder של סטטוס HTTP הנוצרת מקומית; מספרים ושמות שרירותיים של ספקים
נשארים מחוץ לאוצר המילים.

יש להעביר כל סיווג מפורש בארגומנט הרביעי. לעולם אין לדרוס את
`body.error.code`, `body.error.type` או `body.error.reason` לאחר ש-`buildErrorBody()` מחזיר ערך;
שינוי לאחר פעולת ה-builder עוקף את המיפוי הציבורי.

כללי הטיהור המוחלים על `upstreamDetails`:

1. ערכי מחרוזת בקצוות: מועברים דרך `sanitizeErrorMessage` (מסיר עקבות מחסנית + נתיבים מוחלטים).
2. מפתחות לא בטוחים הקשורים לנתיבים, פרטי גישה, כינויי session ושליטה ב-prototype מוסרים.
3. מגבלת עומק: קינון מעבר ל-4 רמות מוחלף במחרוזת `"[truncated]"`.
4. מערכים מוגבלים ל-32 איברים.

רק אתרי קריאה המחזיקים גוף שגיאה מפוענח של ספק צריכים להעביר `upstreamDetails`. שגיאות OmniRoute
פנימיות (כשלי פענוח SSE, תוכן ריק, חסימות guardrail) אינן יכולות לכלול אותו.

אין להעביר `err.stack` גולמי, `err.message` גולמי או מחרוזת כלשהי מחריגת זמן ריצה אל
`upstreamDetails`. ערכים אלה עדיין חייבים לעבור דרך `errorResponse` / `buildErrorBody(code, msg)`
ללא גוף upstream.

העברה סלקטיבית של שגיאות upstream מסוג 4xx משמרת את מבנה ה-JSON הבטוח ואת הניסוח של הספק, הנדרשים
להתאוששות אוטומטית של הלקוח, אך היא אינה העברה זהה ברמת הבתים: המטהר הרקורסיבי מופעל תמיד
לפני הסריאליזציה. גופים מחזוריים, גופים המכילים BigInt או גופים עם `toJSON()` עוין נכשלים באופן סגור ואינם
זכאים להעברה. OCR ו-moderation מיישמים את אותו כלל; גופי upstream שאינם JSON, ריקים או מסומנים
באופן שגוי מומרים למעטפת שגיאת ה-JSON הקנונית של OmniRoute.

## מגבלה מוכרת של CodeQL: מחטאים מותאמים אישית אינם מזוהים

שאילתת CodeQL‏ [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) משתמשת ברשימת היתרים קבועה של תבניות חיטוי (למשל, שימוש מוטמע ב־`.split("\n")[0]`,‏ `String#replace` עם מבנים מסוימים של ביטויים רגולריים, וגישה ל־`.message` ב־`Error`). היא **אינה** מזהה ניתוב עקיף דרך פונקציית עזר מותאמת אישית כמו `sanitizeErrorMessage()` שלנו.

משמעות הדבר היא שאתרי קריאה שמבצעים חיטוי באופן מוכח דרך מודול זה — לדוגמה, `open-sse/utils/error.ts::errorResponse` ו־`open-sse/executors/cursor.ts::buildErrorResponse` — עשויים להמשיך להפעיל את ההתראה אף שהקוד בטוח מבחינה תפקודית. תקדימים לדחיית התראות: `#224`,‏ `#231` (מאי 2026), שתיהן סומנו כ־`false positive` בצירוף הצדקה טכנית.

**כיצד לטפל בהתרחשות חדשה:**

1. יש לוודא שאתר הקריאה אכן מנתב את ההודעה דרך `sanitizeErrorMessage` / `buildErrorBody` / אחת מפונקציות העטיפה המתועדות לעיל (יש לקרוא את שרשרת הקריאות מתחילתה ועד סופה — אין להסתמך על הערה).
2. יש לוודא שהקובץ `tests/unit/error-message-sanitization.test.ts` מכסה את הנתיב (או להוסיף כיסוי).
3. יש לדחות את ההתראה באמצעות `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, תוך הפניה למסמך זה.
4. **אין** "לתקן" באמצעות הטמעה של `.split("\n")[0]` בכל מקום — פונקציית העזר היא מקור האמת היחיד; שכפול התבנית מחליש את המחטא (ומאבד ניקוי נתיבים, הגבלת אורך והמרת טיפוסים) רק כדי ליצור מראית עין של ריצוי הסורק.

אימוץ יכולות המחייבות הצטרפות מפורשת, כמו [תצורת המחטאים המותאמים אישית `@codeql/javascript-models` של CodeQL](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/), הוא הפתרון לטווח הארוך; נושא זה נמצא מחוץ להיקף מסמך זה.

## מקורות

- [CWE-209: חשיפת מידע באמצעות הודעת שגיאה](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: דף עזר לטיפול בשגיאות](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- ה־commit שמרכז את פונקציית העזר: `1a39c31f` — _תיקון (אבטחה): הסתרת פרטי גישה ציבוריים של שירותים במעלה הזרם וריכוז חיטוי השגיאות_
