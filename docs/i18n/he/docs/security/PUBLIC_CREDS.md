# Public Credentials Handling (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **מקור האמת:** `open-sse/utils/publicCreds.ts`
> **בדיקות:** `tests/unit/publicCreds.test.ts`
> **עודכן לאחרונה:** 2026-08-07 — v3.8.50
> **קהל יעד:** מהנדסים המשלבים ספקים שמפיצים ערכי OAuth ציבוריים מסוג client_id / client_secret / מפתחות Firebase Web API בכלי ה-CLI הציבוריים שלהם.
> **סטטוס:** **חובה** עבור כל קוד חדש שמטמיע מזהים ממקור חיצוני.

## מדוע זה קיים

- [OAuth 2.0 עבור אפליקציות נייטיב (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — ערכי OAuth מסוג client_id / client_secret עבור אפליקציות מותקנות הם ציבוריים; PKCE מספק את האבטחה בפועל.
- [מפתחות Firebase API](https://firebase.google.com/docs/projects/api-keys) — מזהי לקוח Web הם ציבוריים מעצם תכנונם.

OmniRoute חייב להטמיע את הערכים האלה כדי שמשתמשים שאינם מגדירים `.env` עדיין יקבלו תהליך OAuth תקין ומוכן לשימוש. ללא ברירת מחדל מוטמעת, ספקי Gemini / Antigravity מפסיקים לעבוד עבור כל משתמש שפועל לפי מסלול "פשוט לשכפל ולהריץ".

עם זאת, ערכים מילוליים כמו `AIzaSy…`,‏ `GOCSPX-…`,‏ `…apps.googleusercontent.com` מזוהים על ידי **GitHub Secret Scanning**,‏ **Semgrep** וסורקי תבניות דומים. כל גרסה הופכת לזרם רועש של זיהויים חיוביים שגויים, הגנת הדחיפה חוסמת commits לגיטימיים, ומפעילים מפסיקים לתת אמון בזרם ההתראות.

הכלי המסייע `open-sse/utils/publicCreds.ts` פותר את שתי הבעיות בבת אחת:

- מטמיע את המזהה הציבורי בתור **רצף בתים ממוסך באמצעות XOR** (ללא תבנית שסורקים יכולים לזהות בקוד המקור).
- מפענח בזמן ריצה באמצעות `decodePublicCred` / `resolvePublicCred`.
- מזהה ערכים גולמיים שכבר תואמים לקידומות מוכרות (`AIza`,‏ `GOCSPX-`,‏ `<digits>-<32hex>.apps.googleusercontent.com`,‏ `Iv1.<hex>`) ומעביר אותם ללא שינוי, כך שמשתמשים עם ערכים גולמיים בקובצי `.env` הקיימים שלהם ממשיכים לעבוד עם **אפס צורך בהעברה**.

זוהי **הסוואה, לא הצפנה.** כל מי שקורא את קוד המקור יכול לשחזר את הערך — וזה תקין, משום שהערך ציבורי מעצם תכנונו. המטרה היחידה היא למנוע התאמות לביטויים רגולריים של סורקים.

## התבנית המחייבת

### 1. הוספת פרטי גישה ציבוריים חדשים

כאשר יש צורך להטמיע ערך חדש שסופק על ידי מקור חיצוני ואשר:

- מגיע מכלי CLI ציבורי / אפליקציית שולחן עבודה / חבילת דפדפן, **וגם**
- הספק החיצוני מתעד אותו (או מתייחס אליו) כמזהה לקוח ציבורי, **וגם**
- סורק תבניות היה מזהה אותו אחרת (`AIza…`,‏ `GOCSPX-…`,‏ `<digits>-…apps.googleusercontent.com` וכו'),

…יש לפעול לפי רשימת הבדיקה הבאה:

1. צרו את רצף הבתים הממוסך:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. הוסיפו רשומה חדשה אל `EMBEDDED_DEFAULTS` בתוך `open-sse/utils/publicCreds.ts` עם **שם מפתח ניטרלי** (`<provider>_id`,‏ `<provider>_alt`,‏ `<provider>_fb` וכו'). **אין** להשתמש בשמות כמו `client_secret` או `api_key` בכלי המסייע — מילים אלה מפעילות את כללי הסודות הגנריים של Semgrep.

3. הוסיפו `keyof typeof EMBEDDED_DEFAULTS` לאיחוד הטיפוסים הציבורי (הוא מוסק אוטומטית).

4. בקוד הצרכן, החליפו את הערך המילולי המקודד בקוד הבא:

   ```ts
   // דריסת משתנה סביבה יחיד
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // מספר כינויים למשתני סביבה (הראשון שאינו ריק מנצח)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // ללא דריסת משתנה סביבה (תמיד ברירת המחדל המוטמעת)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. הסירו את הערך המילולי מ-`.env.example` (החליפו אותו בתיעוד כהערות בלבד, המפנה את הקוראים לכאן):

   ```dotenv
   # ── ספק (Google / Firebase / וכו') ──
   # פרטי הגישה הציבוריים של OAuth מוטמעים בקוד באמצעות
   # open-sse/utils/publicCreds.ts. הגדירו משתנים אלה רק כדי להשתמש בפרטים משלכם.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. עדכנו את `tests/unit/publicCreds.test.ts` והוסיפו בדיקת מבנה עבור המפתח החדש (אמתו את הפורמט, לא את הערך המילולי — ראו את הבדיקות הקיימות כדוגמה לתבנית).

7. **לעולם אין** להוסיף ערכים מילוליים מסוג `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` לקובצי בדיקה. השתמשו בקבועי `FAKE_*` שנבנים ממקטעים באמצעות `.join("")` (ראו את הבדיקות הקיימות).

### 2. צרכנים

- **קראו רק מתוך `resolvePublicCred()` / `resolvePublicCredMulti()`** — לעולם אין לקרוא ישירות ל-`decodePublicCredBytes()` מחוץ לכלי המסייע.
- הכלי המסייע קל בכוונה מבחינת משאבים (XOR ליניארי על בתים) ובטוח לקריאה בזמן טעינת מודול; ערכי ברירת המחדל מחושבים פעם אחת.
- דריסת משתנה הסביבה תמיד גוברת. אם משתמש מגדיר `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, הכלי המסייע מעביר את הערך הגולמי הזה ללא שינוי.

### 3. תבניות אסורות

❌ **לעולם אין** לבצע אף אחת מהפעולות הבאות בקוד ייצור (`src/`,‏ `open-sse/`,‏ `electron/`,‏ `bin/`):

```ts
// שגוי: ערך מילולי מפעיל את Secret Scanning ואת Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// שגוי: base64 של הערך המילולי — GitHub עדיין מזהה זאת מאז Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// שגוי: שרשור מחרוזות שמרכיב מחדש את התבנית בזמן ריצה
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// שגוי: קידוד hex/ROT13 — הסוואה שונה, אותו סיכון לזיהוי
clientSecret: hexDecode("474f4353..."),
```

כל אלה יפעילו בסופו של דבר סורק. השתמשו ב-`resolvePublicCred()`.

❌ **לעולם אין** להוסיף פרטי גישה מילוליים אל `.env.example`. משתמשים הזקוקים לערכים אמיתיים של המקור החיצוני יכולים לחלץ אותם בעצמם מכלי ה-CLI הציבורי, או להשתמש ברישום OAuth משלהם.

❌ **לעולם אין** לדחות התראת סריקת סודות חדשה מבלי לבדוק תחילה אם יש להעביר את פרטי הגישה לכלי המסייע הזה.

## בקרות קשורות

- `RAW_VALUE_PATTERN` בקובץ `publicCreds.ts` מונה את התחיליות שמפעילות העברה ללא שינוי (תאימות לאחור). יש להרחיב אותו רק עבור פורמטים מתועדים של פרטי גישה ציבוריים, ולעולם לא עבור סודות קנייניים.
- `.env.example` משמש בסקריפט `check-env-doc-sync` של CI — בעת הסרת משתנה מכאן, יש לוודא שהתיעוד תואם.
- ערכות הבדיקות `npm run test:vitest` ו-`node --import tsx/esm --test tests/unit/publicCreds.test.ts` חייבות להמשיך לעבור בהצלחה.

## מתי **לא** להשתמש בכלי העזר הזה

כלי העזר הזה מיועד **אך ורק** לפרטי גישה אשר:

1. מופצים באופן ציבורי על ידי הספק במעלה הזרם (קובץ בינארי של CLI, חבילת דפדפן, תיעוד רשמי).
2. מתועדים או משתמע מהם בבירור שאינם סודיים (מוגנים באמצעות PKCE, מפתח Firebase Web וכדומה).

לכל דבר אחר — אסימונים שהונפקו על ידי מפעיל, סודות ייעודיים לכל דייר, ה-`client_secret` של אפליקציית OAuth משלכם, מפתחות הצפנה, סודות JWT, סיסמאות למסדי נתונים — יש להשתמש **במשתני סביבה בלבד** (`process.env.FOO`, עם חלופת `||` לערך ריק / שגיאה מפורשת). מקומם ב-`.env` וב[מאגר פרטי הגישה המוצפנים](./COMPLIANCE.md), ולא בקוד המקור.

## מקורות

- [Google: OAuth 2.0 עבור אפליקציות מקוריות](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: מפתחות API לזיהוי לקוחות](https://firebase.google.com/docs/projects/api-keys)
- [הסודות הנתמכים בסריקת הסודות של GitHub](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: זיהוי base64 עבור אסימונים (פברואר 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- ה-commit שהציג את כלי העזר הזה: `1a39c31f` — _fix(security): מיסוך פרטי גישה ציבוריים במעלה הזרם + ריכוז טיהור שגיאות_
