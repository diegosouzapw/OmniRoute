# Log export (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

ייצוא רציף והדרגתי של יומני השיחות של OmniRoute למאגר ניתוח נתונים חיצוני.

לשונית לוח הבקרה Logs שומרת את היסטוריית הבקשות ב-SQLite (`call_logs`), וגודלה מוגבל באמצעות
סבב קבצים ומדיניות שמירה. ייצוא היומנים שולח את אותה קבוצת רשומות לפי לוח זמנים, כדי שניתן יהיה לשמור
אותה מעבר לאורך חיי מסד הנתונים המקומי ולצרף אותה לנתונים אחרים. BigQuery הוא היעד הראשון;
צינור העיבוד מבוסס על registry, כך שניתן להוסיף יעדים נוספים.

---

## 1. כיצד זה עובד

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (the Logs-tab field set)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **לוח זמנים** — משימת cron יחידה של `JobRegistry` בשם `log_export`, שברירת המחדל שלה היא `0 * * * *` (אחת לשעה,
  UTC). היא נרשמת ב-`src/lib/initCloudSync.ts`; ניתן לדרוס את ההגדרה באמצעות `OMNIROUTE_LOG_EXPORT_CRON`.
  בכל הפעלה מתבצע ריקון של כל יעד **מופעל**, בזה אחר זה.
- **סמן** — ה-`call_logs.rowid` המשתמע של SQLite, הנשמר בנפרד לכל יעד בתוך
  `log_export_destinations.cursor_row_id`. בכוונה לא נעשה שימוש ב-`timestamp` כסמן: גורמים קוראים
  עשויים לספק ערך משלהם, ולכן בקשה איטית עשויה להיכתב לאחר בקשה מהירה יותר שהתחילה
  מאוחר יותר, וסמן המבוסס על חותמת זמן היה מדלג עליה.
- **חלוקה לאצוות** — `batch_size` שורות לכל בקשה (ברירת המחדל היא 500), ו-`max_rows_per_run` שורות לכל הפעלה
  (ברירת המחדל היא 10000), כך שמצבור גדול מתרוקן לאורך כמה הפעלות במקום לחסום הפעלה אחת.
- **מסירה** — הסמן מתקדם רק לאחר ש-`send()` מסתיימת בהצלחה. אצווה שנכשלה משאירה את
  הסמן במקומו, ולכן מתבצע ניסיון חוזר לשליחת אותן שורות בהפעלה הבאה. ההבטחה היא
  מסירה לפחות פעם אחת, בתוספת הסרת כפילויות בצד היעד, ולא מסירה אמיתית של פעם אחת בדיוק: BigQuery מזהה כל
  שורה לפי מזהה יומן השיחה, שבו הוא מתחשב על בסיס מאמץ מיטבי במסגרת חלון הסרת הכפילויות שלו.
- **הגנה מפני חפיפה** — הפעלת ה-cron ו-`POST .../run` עשויות להתרחש יחד. יעד
  שכבר נמצא בתהליך ריקון מדולג במקום להתרוקן פעמיים (`skipped: true` בתוצאת ההפעלה),
  כך שהפעלה מקבילית אינה יכולה לשלוח אצווה מחדש או להזיז את הסמן לאחור.
- **התאוששות לאחר מחיקה** — אם `cursor_row_id` מגיע לערך הגבוה מ-`MAX(rowid)` (כל הטבלה
  נמחקה ומזהי השורות התחילו מחדש), המפעיל מחזיר אותו ל-0 במקום להפסיק לזהות רשומות חדשות לצמיתות.

### מטענים (הנחיות והשלמות)

כברירת מחדל, הייצוא כולל רק את שדות הסיכום שמוצגים ברשימה של Logs. הפעלת
**ייצוא הנחיות ותגובות** (`includeBodies`) שולחת בנוסף את מה שחלונית **הפרטים** של Logs
מציגה עבור כל שיחה:

| שדה                              | מה הוא מכיל                                         |
| -------------------------------- | --------------------------------------------------- |
| `request_body` / `response_body` | מטעני השיחה כפי שלוח הבקרה מציג אותם                |
| `pipeline_route_decision`        | היעד והמודל שהנתב בחר                               |
| `pipeline_client_request`        | הבקשה הגולמית בדיוק כפי שהלקוח שלח אותה             |
| `pipeline_openai_request`        | לאחר תרגום למבנה OpenAI הפנימי                      |
| `pipeline_provider_request`      | כפי שנשלחה בפועל לשירות במעלה הזרם, בניב של הספק    |
| `pipeline_provider_response`     | התגובה הגולמית משירות מעלה הזרם                     |
| `pipeline_client_response`       | מה שהוחזר לגורם הקורא                               |
| `pipeline_error`                 | פרטי שגיאה ברמת צינור העיבוד עבור שיחה שנכשלה       |
| `bodies_truncated`               | True כאשר שדה כלשהו לעיל הגיע למגבלת `maxBodyBytes` |

זהו תוכן הנחיות, ולכן הוא **כבוי כברירת מחדל** ובמכוון מוגדר בנפרד עבור כל יעד.
מה שנשלח הוא מה שלוח הבקרה מציג, מכיוון ששניהם קוראים דרך `getCallLogById`: המטענים כבר
עברו הסרת מידע אישי מזהה והשחרת סודות בעת כתיבתם, ושיחה שבוצעה באמצעות מפתח API עם
`noLog` אינה שומרת מטען כלל, ולכן אין מה לייצא.

המטענים נקראים עבור כל שורה מארטיפקט במערכת הקבצים, ולכן האכלוס מתבצע רק עבור יעדים
שביקשו אותו. שורה שהארטיפקט שלה חסר או פגום מיוצאת עם הסיכום שלה ועם מטענים בערך null,
במקום להכשיל את האצווה ולהותיר את הסמן תקוע.

`maxBodyBytes` (ברירת המחדל היא 262144) מגביל כל שדה. מטענים ארוכים יותר **נחתכים במקום
להישמט** — הנחיה חתוכה עדיין עונה על השאלה "מה התבקש" — והשורה מסומנת באמצעות
`bodies_truncated`. שינויים הדרגתיים שהוזרמו מקטע אחר מקטע אינם מיוצאים; התגובה המורכבת
כבר נמצאת ב-`pipeline_provider_response` וב-`pipeline_client_response`.

---

## 2. קבצים

| רכיב             | מיקום                                        |
| ---------------- | -------------------------------------------- |
| חוזה יעד         | `src/lib/logExport/types.ts`                 |
| רישום            | `src/lib/logExport/registry.ts`              |
| טיפול בסודות     | `src/lib/logExport/secrets.ts`               |
| מריץ (לולאת סמן) | `src/lib/logExport/runner.ts`                |
| היטל API         | `src/lib/logExport/presenter.ts`             |
| יעד BigQuery     | `src/lib/logExport/destinations/bigquery.ts` |
| אימות Google SA  | `src/lib/logExport/googleServiceAccount.ts`  |
| מקור יומן שיחות  | `src/lib/usage/callLogExportSource.ts`       |
| התמדה            | `src/lib/db/logExportDestinations.ts`        |
| משימת Cron       | `src/lib/jobs/logExportJob.ts`               |
| שכבת REST        | `src/app/api/log-export/`                    |
| דף לוח הבקרה     | `src/app/(dashboard)/dashboard/log-export/`  |

סכמה: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

כל הנתיבים מאומתים באמצעות אימות ניהולי (`requireManagementAuth`). סודות לעולם אינם מוחזרים:
סוד שמור מוחזר כמחרוזת הליטרלית `__stored__`, ושליחת ערך זה בחזרה בעת עדכון משמרת את פרטי הגישה השמורים.

יצירה או עדכון של יעד שהסוג שלו מגדיר סוד **דורשים
`STORAGE_ENCRYPTION_KEY`**. בלעדיו `encrypt()` מעביר את הערך ללא שינוי ובשקט, ולכן הכתיבה
נדחית עם 400 במקום לשמור פרטי גישה ב-SQLite כטקסט גלוי (אותו מנגנון הגנה שמופעל על ידי
ה-webhook של Telegram).

| שיטה     | נתיב                                     | מטרה                                      |
| -------- | ---------------------------------------- | ----------------------------------------- |
| `GET`    | `/api/log-export/types`                  | סוגי יעדים + רשימת שדות התצורה שלהם       |
| `GET`    | `/api/log-export/destinations`           | הצגת רשימת יעדים (הסודות מושחרים)         |
| `POST`   | `/api/log-export/destinations`           | יצירת יעד                                 |
| `GET`    | `/api/log-export/destinations/{id}`      | קריאת יעד יחיד                            |
| `PUT`    | `/api/log-export/destinations/{id}`      | עדכון שם / מצב הפעלה / תצורה / אצווה      |
| `DELETE` | `/api/log-export/destinations/{id}`      | מחיקה                                     |
| `POST`   | `/api/log-export/destinations/{id}/test` | בדיקת פרטי גישה, ללא כתיבה                |
| `POST`   | `/api/log-export/destinations/{id}/run`  | ריקון מיידי, באותו נתיב של ההרצה המתוזמנת |
| `GET`    | `/api/log-export/status`                 | מצב Cron, הרצות אחרונות, צבר לכל יעד      |

`GET /api/log-export/types` הוא מה שהופך את ממשק המשתמש לגנרי: הטופס בלוח הבקרה מעובד מתוך
מתארי השדות המוחזרים, ולכן יעד חדש אינו דורש שינוי בממשק המשתמש.

---

## 4. יעד BigQuery

מפתחות תצורה (`type: "bigquery"`):

| מפתח                 | הערות                                                       |
| -------------------- | ----------------------------------------------------------- |
| `projectId`          | פרויקט GCP שמכיל את מערך הנתונים                            |
| `datasetId`          | `[A-Za-z0-9_]+`                                             |
| `tableId`            | `[A-Za-z0-9_]+`                                             |
| `location`           | משמש רק כאשר יש ליצור את מערך הנתונים (ברירת מחדל `EU`)     |
| `serviceAccountJson` | מפתח חשבון שירות. סוד: מוצפן באחסון ולעולם אינו מוחזר       |
| `autoCreate`         | יצירת מערך הנתונים והטבלה בייצוא הראשון (ברירת מחדל `true`) |

חשבון השירות זקוק להרשאת `bigquery.tables.updateData` בטבלת היעד, וכן להרשאות
`bigquery.datasets.create` / `bigquery.tables.create` כאשר `autoCreate` מופעל.

אצווה מוגדרת היא יחידת **סמן**, ולא יחידת HTTP: הפונקציה `send()` מחלקת אותה לקריאות insertAll
של עד 500 שורות, כך ש-`batch_size` גדול אינו יכול לחרוג ממגבלת הבקשה של BigQuery, העומדת על 10 MB.
על סטטוסים זמניים (408/429/500/502/503/504) מתבצעים עד שלושה ניסיונות חוזרים עם השהיה מעריכית,
תוך שימוש חוזר באותם insertIds; כשלי אימות וסכמה זורקים שגיאה בניסיון הראשון במקום לבזבז את ההרצה.

טבלה שנוצרה לפני רגע עדיין אינה גלויה לנקודת הקצה להזרמה, שמחזירה
404 במשך כמה שניות. מתבצע ניסיון חוזר לאחר 404 זה, אך **רק כאשר הטבלה נוצרה בהרצה הנוכחית** —
טבלה שבאמת חסרה עדיין גורמת לכשל מיידי. שימו לב שיצירה מחדש של טבלה תחת שם שנמחק לאחרונה
גורמת ל-BigQuery לסרב להוספות בהזרמה במשך כמה דקות; זוהי תכונה של מחיקה ולאחריה יצירה מחדש,
ולכן עדיף להשתמש בשם טבלה חדש במקום למחוק ולהוסיף מחדש טבלה.

**כשל חלקי מגיע כ-HTTP 200 עם `insertErrors[]` שאינו ריק.** מצב זה מטופל ככשל ונזרקת שגיאה,
וזה מה שמונע מהסמן להתקדם מעבר לשורות ש-BigQuery מעולם לא קיבל;
`tests/unit/log-export-bigquery.test.ts` מקבע את ההתנהגות.

התעבורה מתבצעת באמצעות REST רגיל — הצהרת RS256 בחתימה עצמית מוחלפת באסימון גישה בכתובת
`https://oauth2.googleapis.com/token`, ולאחר מכן השורות נשלחות אל `tabledata.insertAll`. לא
נוספת תלות ב-Google SDK. אסימוני גישה נשמרים במטמון בתוך התהליך לפי (חשבון שירות, תחום הרשאה).

הטבלה שנוצרת מכילה עמודה אחת לכל שדה בלשונית Logs, וכן `exported_at`, והיא מאורגנת בהתאם
לאופן שבו מתבצעות בפועל שאילתות על יומני שיחות:

- **חלוקה למחיצות יומיות לפי `timestamp`**, כך ששאילתה התחומה לפי תאריך סורקת רק את הימים האלה.
- **קיבוץ לפי `api_key_name`, `provider`, `model`, `status`** (בסדר זה), כך שסינון לפי
  מי שהריץ את הפעולה, לאן היא נשלחה או האם היא נכשלה מצמצם את הבלוקים בתוך כל מחיצה. BigQuery
  מאפשר לכל היותר ארבע עמודות קיבוץ, ולסדר יש חשיבות: מסנן על `api_key_name` בלבד מצמצם,
  ואילו מסנן על `status` בלבד אינו מצמצם.
- **שמירת מחיצות אופציונלית** באמצעות `partitionExpirationDays`‏ (0 שומר הכול), שמוחלת
  כאשר הטבלה נוצרת.

שתי ההגדרות חלות בזמן היצירה. טבלה קיימת שומרת על הפריסה שכבר יש לה, לכן
יש להפנות את היעד למזהה טבלה חדש אם ברצונכם לאמץ אותן.

`tests/unit/log-export-bigquery.test.ts` מוודא שהממפה וסכמת הטבלה נשארים
מסונכרנים, כך שלא ניתן להשמיט בשקט עמודה חדשה של יומן שיחות במהלך הייצוא.

האצוות מחולקות למקטעים לפי **שני** מדדים: מספר השורות והגודל בבייטים לאחר סריאליזציה. מספר השורות לבדו אינו מספיק
לאחר ייצוא המטענים: 500 שורות המכילות פרומפטים עשויות להגיע לעשרות מגה־בייטים, ו־insertAll
דוחה בקשות שגודלן עולה על 10 MB. כל מקטע נסגר כשהוא מגיע ל־500 שורות או ל־9 MB, לפי המוקדם מביניהם.

---

## 5. הוספת יעד

1. צרו את `src/lib/logExport/destinations/<name>.ts` שמייצא `LogExportDestinationType`:
   `configSchema` של Zod, מערך מתארים `fields` עבור ממשק המשתמש, `secretFields`, וכן
   `createClient(config)` שמחזיר `test()` / `prepare()` / `send(records)`.
2. הוסיפו אותו למערך `DESTINATIONS` בתוך `src/lib/logExport/registry.ts`.
3. כתבו בדיקות תחת `tests/unit/`.

זהו כל השינוי הנדרש: שכבת השמירה, משימת ה-cron, שכבת ה-REST, הצפנת הסודות וטופס
לוח הבקרה — כולם קוראים את הרישום.

שני כללים עבור יעד חדש:

- `send()` **חייב לזרוק חריגה** במקרה של כשל חלקי. השלמה מוצלחת פירושה "היעד מכיל את השורות האלה",
  והסמן מתקדם מעבר להן לצמיתות.
- יעד שמקבל כתובת URL מהמשתמש חייב לאמת אותה באמצעות
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) לפני ביצוע הבקשה,
  באותו אופן שבו webhooks עושים זאת. BigQuery אינו זקוק לכך: המארחים שלו קבועים.

---

## 6. תפעול

- **לוח הבקרה**: Integrations → Log export. הוסיפו יעד, הפעילו **Test** כדי לבדוק את פרטי הגישה
  בלי לכתוב שורות, ולאחר מכן הפעילו אותו.
- **צבר**: כל כרטיס יעד מציג את השורות הממתינות ואת הסמן; `GET
/api/log-export/status` מחזיר את אותם הנתונים, וכן את 20 הריצות האחרונות של המשימה.
- **כשל ביעד אחד אינו מכשיל את האחרים** — סיכום הריצה מתעד את הסטטוס של כל יעד
  ב-`last_status` / `last_error`, והיסטוריית הריצות של המשימה שומרת את הנתונים המצטברים.
- **מחיקת יעד מוחקת את הסמן שלו.** הוספה מחדש מתחילה מיומן הקריאות הישן ביותר שנשמר,
  וכך נשלחות מחדש שורות שייתכן שכבר נמצאות ביעד. ב-BigQuery, ה-`insertId` של כל שורה מונע
  כפילויות רק בתוך חלון ביטול הכפילויות של BigQuery עצמו, ולכן עדיף להשבית יעד במקום למחוק אותו.
