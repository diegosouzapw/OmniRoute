# Management Authentication (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

ל-OmniRoute יש **ארבע משפחות אישורים** שיכולות לאשר נתיבי ניהול.
הן אינן ניתנות להחלפה. מפתחות API של הסקה (`sk-…`) **אינם** מנהלים את השרת אלא אם כן הוענק להם במפורש סקופ `manage` או `admin`.

יישום קנוני: `src/lib/api/requireManagementAuth.ts`.

| אישור                    | צורה אופיינית                   | נוצר היכן                                        | שימוש מיועד            | יכולת ניהול                                                              |
| :----------------------- | :------------------------------ | :----------------------------------------------- | :--------------------- | :----------------------------------------------------------------------- |
| סשן JWT של לוח המחוונים  | `auth_token` cookie             | כניסה ללוח המחוונים                              | ממשק משתמש בדפדפן      | ניהול מלא של לוח המחוונים, בכפוף לכללי CSRF, מקומיות ונתיבים מוגנים תמיד |
| אסימון מזהה מכונה של CLI | internal / local                | אתחול CLI (`omniroute` באותה מכונה)              | CLI מקומי              | ניהול מקומי בלבד                                                         |
| אסימון גישה מוגבל סקופ   | `oma_live_…`                    | **הגדרות ← אסימוני גישה** או `omniroute connect` | CLI מרוחק ו-API לניהול | חייב לעמוד בסקופ הנדרש של הנתיב: `read`, `write` או `admin`              |
| מפתח API של הסקה         | `sk-…` (וקידומות API-key אחרות) | **מנהל API / מפתחות API**                        | הסקה של `/v1/*`        | **אף אחד** אלא אם כן מטא-נתוני המפתח כוללים `manage` או `admin`          |

אישורי `oma_` הם אישורי ניהול/CLI. הם **אינם** מפתחות API של הסקה.

אם אימות כניסה/מפתח API מושבת עבור השרת, ייתכן שחלק מנתיבי הניהול יקבלו קריאות לא מאומתות. נתיבים מקומיים בלבד ונתיבים מוגנים תמיד עדיין מיישמים את הכללים שלהם. הצגת אחד מהאישורים הללו אינה, אם כן, חובה גורפת, והחזקה באחד אינה מספקת באופן גורף ללא הסקופ הנדרש ומקומיות הנתיב.

קשור: [מצב מרוחק](./REMOTE-MODE.md) (כיצד `oma_live_…` נוצר עבור CLI מרוחק).

---

## מטריצות היקפים

היקפי ניהול מפתחות API והיקפי אסימוני גישה הם אוצרות מילים שונים.
היקפי כלי MCP הם אוצר מילים שלישי, הנבדקים באמצעות `scopeMatches` ולא באמצעות
אחת מהפונקציות בטבלאות שלהלן. זה לצד זה:
[שלושה מרחבי שמות של היקפים](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### היקפי אסימוני גישה (`oma_live_…`)

| היקף    | פעולות אופייניות                                              |
| ------- | ------------------------------------------------------------- |
| `read`  | בקשות GET של רשימה/סטטוס שהאסימון רשאי לראות                  |
| `write` | שינויים (יצירה/עדכון/מחיקה) מתחת לרמת מנהל מערכת              |
| `admin` | CLI מרוחק מלא / אסימון חיבור (ברירות מחדל של אתחול סיסמה כאן) |

אסימון עם `read` אינו יכול לקרוא נתיב `write`. מבנה הודעת זמן ריצה:
`Access token scope '<have>' is insufficient; '<need>' required.`

### היקפי ניהול מפתחות API

| היקף     | משמעות                                                           |
| -------- | ---------------------------------------------------------------- |
| (ללא)    | הסקה בלבד. נתיבי ניהול מחזירים 403.                              |
| `manage` | API ניהול (אותו שער כמו ענף מפתח API של `requireManagementAuth`) |
| `admin`  | גם עונה על `hasManageScope` (מטופל כיכולת ניהול)                 |

אפשר את `manage` על המפתח בממשק המשתמש של API Keys / API Manager. אין לעשות שימוש חוזר
במפתח לקוח צ'אט לאוטומציה אלא אם כן הענקת במכוון את ההיקף הזה.

---

## כיצד ליצור ולבטל

### סשן JWT של לוח הבקרה

1. פתחו את `/login` והתחברו באמצעות סיסמת הניהול (`INITIAL_PASSWORD` באתחול הראשון).
2. קובץ ה-Cookie בשם `auth_token` הוא מסוג HttpOnly. לוח הבקרה בדפדפן משתמש בו אוטומטית.
3. התנתקו דרך `/api/auth/logout`. אין סוד בעל תוקף ארוך שניתן להעתיק.

### אסימון machine-id של ה-CLI

1. הריצו את `omniroute` על **אותו מארח** שבו פועל השרת (loopback).
2. ה-CLI מאתחל אסימון machine-id תחת `~/.omniroute/` (עם chmod 600).
3. הדבר **אינו** עובד ממכונה אחרת. השתמשו באסימון גישה עבור CLI מרוחק.

### אסימון גישה בעל הרשאות (`oma_live_…`)

1. לוח הבקרה: **הגדרות ← אסימוני גישה** ← יצירה (שם + הרשאה). **הסוד מוצג פעם אחת בלבד.**
2. או דרך ה-CLI:‏ `omniroute connect <host>` (סיסמה ← אסימון). ראו [מצב מרוחק](./REMOTE-MODE.md).
3. כותרת: `Authorization: Bearer oma_live_…`
4. בטלו אותו מאותו דף של אסימוני גישה (או מחקו את הקשר ה-CLI).
5. השרת שומר גיבוב בלבד. התייחסו לטקסט הגלוי כמו לסיסמה.

### מפתח API בעל הרשאת ניהול

1. לוח הבקרה: **מנהל API / מפתחות API** ← יצירה או עריכה של מפתח ← הפעלת `manage` (או `admin`).
2. כותרת: `Authorization: Bearer sk-…` (התחילית בפועל של המפתח).
3. בטלו את המפתח או הסירו את `manage` באותו ממשק משתמש.
4. עבור אוטומציה שאינה ה-CLI, השתמשו בהרשאה המזערית הנדרשת: העדיפו אסימון גישה עם `read` עבור משימות GET בלבד; השתמשו ב-`manage` במפתח API רק כאשר הגורם הקורא חייב לתקשר גם עם `/v1` וגם עם ממשק הניהול.

---

## פורמט הכותרת

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

אין להציב פרטי גישה לניהול בנתיב ה-URL או במחרוזת השאילתה. אימות לניהול מתבצע באמצעות כותרת/קובץ Cookie בלבד.

---

## דוגמאות להעתקה והדבקה

לקריאה בלבד (הצגת ספקים). השתמשו באסימון גישה מסוג `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

לביצוע שינויים (יצירת חיבור לספק). השתמשו באסימון גישה מסוג `write`/`admin` או במפתח API עם הרשאת `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

להסקה (לא לניהול). מפתח API רגיל, ללא צורך ב-`manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## שגיאות זמן ריצה נוכחיות (אין להציג סודות)

| מצב                                | סטטוס אופייני | הודעה (מטוהרת)                                                       |
| :--------------------------------- | :------------ | :------------------------------------------------------------------- |
| אין אישור                          | 401           | `Authentication required`                                            |
| `oma_live_…` לא חוקי/פג תוקף       | 401           | `Invalid or expired access token`                                    |
| מפתח API חוקי ללא `manage`/`admin` | 403           | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| מפתח API רגיל לא חוקי בנתיב ניהול  | 403           | `Invalid management token`                                           |
| היקף אסימון הגישה נמוך מדי         | 403           | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"אסימון ניהול לא חוקי" פירושו שהנושא **לא** התקבל כאישור ניהול. זה **לא** אומר לך איזו משפחה ליצור. השתמש בטבלה לעיל: מפתחות הסקה דורשים היקף `manage`; CLI מרוחק דורש `oma_live_…`; לוח המחוונים משתמש בעוגיית הסשן.

---

## בחירת הרשאה מינימלית מומלצת

| קורא                                   | שימוש                                     |
| :------------------------------------- | :---------------------------------------- |
| דפדפן                                  | סשן לוח מחוונים                           |
| CLI במארח השרת                         | אסימון מכונה                              |
| CLI במחשב נייד המתקשר עם שרת מרוחק     | `oma_live_…` מתוך `omniroute connect`     |
| CI / סקריפטים (ניהול בלבד)             | `oma_live_…` עם ההיקף המצומצם ביותר שעובד |
| CI שחייב לקרוא גם ל-`/v1` וגם ל-`/api` | מפתח API עם `manage` **או** שני אישורים   |
