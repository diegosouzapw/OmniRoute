# CLI Machine-ID Token (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## סקירה כללית

פקודות OmniRoute CLI מבצעות אימות מול API הניהול המקומי באמצעות אסימון
`HMAC-SHA256(machine-id, salt)` שנשלח דרך כותרת הבקשה
`x-omniroute-cli-token`.

כך פקודות משנה של ה-CLI (`omniroute status`, `omniroute providers` וכו')
יכולות לפנות לנקודות קצה לניהול מבלי לדרוש מהמשתמש לספק JWT או
סיסמה בכל הפעלה.

## כיצד זה עובד

1. `getMachineTokenSync()` קוראת את מזהה החומרה של המכונה באמצעות `node-machine-id`
   (ובמקרה של כשל חוזרת למחרוזת ריקה, מה שמשבית את אימות ה-CLI).
2. היא מחשבת `HMAC-SHA256(machine_id, salt)` ומחזירה את תקציר ה-hex המלא, בן
   64 תווים — אסימון דטרמיניסטי ובלתי הפיך המקושר למכונה זו.
3. ה-CLI שולח את האסימון בתור `x-omniroute-cli-token` רק כאשר היעד שנקבע
   הוא כתובת URL מפורשת של loopback (`localhost`, `127.0.0.0/8`, או
   כתובת IPv6 מסוג loopback). בקשות הנושאות את האסימון משתמשות ב-`redirect: error`, כך שהפניה מקומית
   אינה יכולה להעביר אותו למקור אחר. הקשרים מרוחקים משתמשים במקום זאת
   באסימוני גישה מוגבלי-היקף. אם לא ניתן לגזור את האסימון, ה-CLI משמיט את הכותרת
   ו-`omniroute doctor` מדווח על הכשל במקום להתייחס לאסימון ריק
   כתקף.
4. השרת (`src/server/authz/policies/management.ts`) מחשב מחדש את
   האסימון הצפוי באמצעות אותו salt ומשווה בעזרת `timingSafeEqual` כדי
   למנוע חילוץ המבוסס על תזמון.

## מאפייני אבטחה

| מאפיין                         | פירוט                                                                                                                                                                      |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loopback בלבד**              | מתקבל רק כאשר חותמת מיקום העמית המהימנה של השרת (הנגזרת מכתובת עמית ה-TCP האמיתית) מציינת loopback. אין הסתמכות לעולם על כותרת `Host` הנשלטת בידי הלקוח לצורך קביעת מיקום. |
| **השוואה בזמן קבוע**           | `crypto.timingSafeEqual` מונעת התקפות תזמון.                                                                                                                               |
| **בלתי הפיך**                  | לא ניתן לשחזר את מזהה המכונה מפלט ה-HMAC.                                                                                                                                  |
| **ללא עקיפה של הגנת `always`** | `isAlwaysProtectedPath()` מוערכת לפני בדיקת אסימון ה-CLI. הנתיבים `/api/shutdown` ו-`/api/settings/database` תמיד דורשים JWT.                                              |
| **לא ניתן לייצוא**             | האסימון לעולם אינו נכתב לדיסק ואינו מתועד ביומנים.                                                                                                                         |

## Salt ברירת מחדל (אקראי לכל התקנה)

כאשר `OMNIROUTE_CLI_SALT` אינו מוגדר, ה-salt הוא מחרוזת hex אקראית בת 64 תווים,
שנוצרת פעם אחת ונשמרת ב-`<DATA_DIR>/cli-token-salt.json` (במצב `0600`) —
ולא הליטרל `omniroute-cli-auth-v1` שנשמר במאגר. גם `getActiveSalt()` שבקובץ
`src/lib/machineToken.ts` וגם העותק המקביל שלה ב-`bin/cli/utils/cliToken.mjs` קוראים את
אותו קובץ, כך שהשרת וכל הפעלה של ה-CLI בהתקנה זו מתכנסים לאותו
ערך; הליטרל שנשמר במאגר משמש רק כברירת מחדל אחרונה כאשר עדיין לא ניתן
לקבוע salt שמור או salt ממשתנה סביבה (לדוגמה, בהתקנת CLI חדשה בלבד
לפני שהשרת הופעל אי פעם). הדבר סוגר חולשה בברירת המחדל הישנה והקבועה:
`/etc/machine-id` בדרך כלל ניתן לקריאה בידי כולם, ולכן כל משתמש מקומי היה יכול
אחרת לגזור את אותו אסימון עבור כל התקנה שמעולם לא הגדירה את
`OMNIROUTE_CLI_SALT`.

## החלפת Salt

הגדירו את `OMNIROUTE_CLI_SALT` כדי להחליף את האסימון הנגזר ללא שינויי קוד — ערך זה
תמיד מקבל עדיפות על פני ה-Salt שנשמר לכל התקנה. לאחר ההחלפה, כל תהליכי ה-CLI
במחשב זה ישתמשו אוטומטית באסימון החדש. שימושי לאחר דליפה של רשימת התהליכים,
שייתכן כי חשפה את הערך הקודם שנגזר.

```bash
# החלפה קבועה (יש להוסיף לפרופיל המעטפת)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# אימות שהאסימון החדש נמצא בשימוש
omniroute status
```

## פורמט מדור קודם (SHA-256,‏ 32 תווים) — עדיין נתמך

לפני פורמט ה-HMAC שלעיל, ה-CLI גזר את האסימון שלו באמצעות
`SHA-256(machineId + salt).hex[0..32]` (קידומת בת 32 תווים) בקובץ
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` בתוך `src/lib/machineToken.ts`).

לצורך תאימות לאחור, השרת מקבל את **שני** הפורמטים: המאמת בונה את
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` ומשווה את
הכותרת הנכנסת מול כל אחד מהם באמצעות `timingSafeEqual`
(`src/server/authz/policies/management.ts` ו-`src/lib/middleware/cliTokenAuth.ts`).
לפיכך, אסימון תקף אם הוא תואם **או** לתמצית HMAC בת 64 התווים **או** לקידומת
SHA-256 מדור קודם בת 32 התווים.

**ביטול:** הגדירו את `OMNIROUTE_DISABLE_CLI_TOKEN=true` (במשתני הסביבה או ב-`.env`) כדי להשבית לחלוטין את
מנגנון אסימון ה-CLI; לאחר מכן, כל גישה תחייב מפתח API מפורש. במארחים מרובי משתמשים
הגדרה זו מומלצת, מכיוון ש-`machine-id` מוגדר לפי התקן (ולא לפי משתמש), ומשתמש אחר
באותו מארח יוכל לחשב את אותו אסימון.

## קבצים

| קובץ                                      | מטרה                                    |
| ----------------------------------------- | --------------------------------------- |
| `src/lib/machineToken.ts`                 | גזירת אסימון (`getMachineTokenSync`)    |
| `bin/cli/utils/cliToken.mjs`              | מימוש מקביל בצד ה-CLI של אותה גזירה     |
| `<DATA_DIR>/cli-token-salt.json`          | Salt אקראי שנשמר לכל התקנה              |
| `src/server/authz/headers.ts`             | הקבוע `CLI_TOKEN_HEADER`                |
| `src/server/authz/policies/management.ts` | אימות בצד השרת                          |
| `src/server/authz/routeGuard.ts`          | בדיקת מארח loopback‏ (`isLoopbackHost`) |

## ראו גם

- `docs/security/ROUTE_GUARD_TIERS.md` — רמות הגנה על נתיבים
- `docs/architecture/AUTHZ_GUIDE.md` — תהליך ההרשאה המלא
