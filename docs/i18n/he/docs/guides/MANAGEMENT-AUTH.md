# Management Authentication (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

ל-OmniRoute יש **ארבע משפחות של פרטי אימות** שיכולות לאשר גישה לנתיבי ניהול.
לא ניתן להשתמש בהן זו במקום זו. מפתחות API להסקה (`sk-…`) **אינם** מנהלים את
השרת, אלא אם הוענקה להם במפורש הרשאת `manage` או `admin`.

מימוש קנוני: `src/lib/api/requireManagementAuth.ts`.

| פרט אימות                  | תבנית אופיינית                        | היכן נוצר                                        | שימוש מיועד            | יכולת ניהול                                                          |
| -------------------------- | ------------------------------------- | ------------------------------------------------ | ---------------------- | -------------------------------------------------------------------- |
| סשן JWT של לוח הבקרה       | קובץ Cookie בשם `auth_token`          | התחברות ללוח הבקרה                               | ממשק משתמש בדפדפן      | ניהול מלא מלוח הבקרה, בכפוף לכללי CSRF, למיקום ולנתיבים המוגנים תמיד |
| אסימון machine-id של ה-CLI | פנימי / מקומי                         | אתחול ה-CLI (`omniroute` באותה מכונה)            | CLI מקומי              | ניהול מקומי בלבד                                                     |
| אסימון גישה בעל הרשאות     | `oma_live_…`                          | **הגדרות ← אסימוני גישה** או `omniroute connect` | CLI מרוחק ו-API לניהול | חייב לעמוד בהרשאת `read`,‏ `write` או `admin` הנדרשת על ידי הנתיב    |
| מפתח API להסקה             | `sk-…` (ותחיליות אחרות של מפתחות API) | **מנהל API / מפתחות API**                        | הסקה דרך `/v1/*`       | **ללא יכולת** אלא אם המטא-נתונים של המפתח כוללים `manage` או `admin` |

פרטי אימות מסוג `oma_` מיועדים לניהול/CLI. הם **אינם** מפתחות API להסקה.

אם אימות באמצעות התחברות/מפתח API מושבת בשרת, ייתכן שחלק מנתיבי הניהול
יקבלו קריאות ללא אימות. נתיבים מקומיים בלבד ונתיבים המוגנים תמיד עדיין כפופים
לכללים משלהם. לכן, הצגת אחד מפרטי האימות האלה אינה חובה בכל מצב,
והחזקת אחד מהם אינה מספיקה בכל מצב ללא ההרשאה ומיקום הנתיב הנדרשים.

מידע קשור: [מצב מרוחק](./REMOTE-MODE.md) (כיצד נוצר `oma_live_…` עבור CLI מרוחק).

---

## מטריצות הרשאות

שני אוצרות המילים האלה להרשאות הם **שונים**. אין לערבב ביניהם.

### הרשאות של אסימון גישה (`oma_live_…`)

| הרשאה   | פעולות אופייניות                                                         |
| ------- | ------------------------------------------------------------------------ |
| `read`  | בקשות GET להצגת רשימות/סטטוס שהאסימון מורשה לראות                        |
| `write` | שינויים (יצירה/עדכון/מחיקה) מתחת לרמת מנהל מערכת                         |
| `admin` | CLI מרוחק מלא / אסימון חיבור (אתחול באמצעות סיסמה משתמש בכך כברירת מחדל) |

אסימון עם `read` אינו יכול לקרוא לנתיב `write`. מבנה ההודעה בזמן ריצה:
`Access token scope '<have>' is insufficient; '<need>' required.`

### הרשאות ניהול של מפתחות API

| הרשאה    | משמעות                                                                        |
| -------- | ----------------------------------------------------------------------------- |
| (ללא)    | הסקה בלבד. נתיבי ניהול מחזירים 403.                                           |
| `manage` | API לניהול (אותו מנגנון אימות כמו בענף מפתח ה-API של `requireManagementAuth`) |
| `admin`  | עומדת גם בדרישות `hasManageScope` (מטופלת כבעלת יכולת ניהול)                  |

הפעילו `manage` עבור המפתח בממשק המשתמש של מפתחות API / מנהל API. אל תשתמשו מחדש
במפתח של לקוח צ'אט לצורכי אוטומציה, אלא אם הענקתם לו הרשאה זו במכוון.

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

| מצב                                | סטטוס אופייני | הודעה (לאחר הסרת מידע רגיש)                                                |
| ---------------------------------- | ------------- | -------------------------------------------------------------------------- |
| אין פרטי גישה                      | 401           | `נדרש אימות`                                                               |
| `oma_live_…` לא תקין/פג תוקף       | 401           | `אסימון גישה לא תקין או שפג תוקפו`                                         |
| מפתח API תקין ללא `manage`/`admin` | 403           | `למפתח ה-API חסרה הרשאת 'manage'. הפעילו אותה בלוח הבקרה של מפתחות ה-API.` |
| מפתח API רגיל ולא תקין בנתיב ניהול | 403           | `אסימון ניהול לא תקין`                                                     |
| הרשאת אסימון הגישה נמוכה מדי       | 403           | `הרשאת אסימון הגישה '<have>' אינה מספיקה; נדרשת '<need>'.`                 |

"אסימון ניהול לא תקין" פירושו שהאסימון הנושא **לא** התקבל כפרטי גישה לניהול. הודעה זו **אינה** מציינת איזה סוג יש להנפיק. השתמשו בטבלה שלעיל: מפתחות הסקה זקוקים להרשאת `manage`; CLI מרוחק זקוק ל-`oma_live_…`; לוח הבקרה משתמש בקובץ ה-Cookie של ההפעלה.

---

## הבחירה המומלצת לפי עקרון ההרשאה המזערית

| גורם קורא                                | שימוש                                         |
| ---------------------------------------- | --------------------------------------------- |
| דפדפן                                    | הפעלת לוח הבקרה                               |
| CLI במארח השרת                           | אסימון מכונה                                  |
| CLI במחשב נייד שמתקשר עם שרת מרוחק       | `oma_live_…` מ-`omniroute connect`            |
| CI / סקריפטים (לניהול בלבד)              | `oma_live_…` עם ההרשאה המצומצמת ביותר שמספיקה |
| CI שחייב לפנות גם אל `/v1` וגם אל `/api` | מפתח API עם `manage` **או** שני פרטי גישה     |
