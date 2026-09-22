# CORS Configuration & Security (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute שולט באילו **מקורות דפדפן** רשאים לקרוא תגובות חוצות-מקור
באמצעות רשימת היתרים מרכזית אחת. המודל **סגור כברירת מחדל**:
אף מקור אינו מורשה עד שתוסיפו אותו במפורש. דף זה מתעד כיצד רשימת ההיתרים
נפתרת, מה `CORS_ALLOW_ALL=true` חושף בפועל (וחשוב לא פחות, מה הוא
**אינו** חושף), כיצד להגדיר בבטחה סביבות פיתוח לעומת ייצור, ואת אזהרת זמן הריצה
שמוצגת בלוח הבקרה כאשר תו כללי פעיל.

**מקור האמת:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). רשימת ההיתרים מוחלת פעם אחת, בתווכת
(`src/server/authz/pipeline.ts`) — מטפלים ייעודיים לנתיבים אינם מגדירים בעצמם את
`Access-Control-Allow-Origin`.

## כיצד מקור נפתר

עבור כל בקשה, התווכה מחשבת את הערך של `Access-Control-Allow-Origin`
בסדר הבא:

1. **`CORS_ALLOW_ALL=true`** (או ההגדרה הישנה `CORS_ORIGIN=*`) ← החזרת
   ה-`Origin` של הפונה כפי שהוא (או `*` כאשר אין כותרת `Origin`), יחד עם `Vary: Origin`
   כדי לשמור על תקינות המטמונים. אותה נקודת בקרה מרכזית `applyCorsHeaders()` מוסיפה גם
   `Vary: Accept-Encoding` לכל תגובת 2xx עם גוף בממשק המאומת באמצעות אסימון
   `/v1*`/`/v1beta*` (`relaxForTokenAuth`, RFC 9110 §12.5.5, גיליון #6737), כדי
   שמטמונים בהמשך השרשרת או מטמונים משותפים יוכלו להבחין כראוי בין גרסאות דחוסות
   לגרסאות שאינן דחוסות.
2. אחרת, ה-`Origin` של הבקשה עובר נרמול (המרה לאותיות קטנות והסרת לוכסן
   סופי) ומושווה מול **רשימת ההיתרים הממוזגת**:
   - משתנה הסביבה **`CORS_ALLOWED_ORIGINS`** — רשימה מופרדת בפסיקים, וכן
   - הגדרת זמן הריצה **`corsOrigins`** (לוח הבקרה ← אבטחה ← _מקורות CORS
     מורשים_), שמוזרקת באמצעות `setRuntimeAllowedOrigins()` מתוך
     `src/lib/config/runtimeSettings.ts`.
3. אין התאמה ← **לא נפלטת כותרת `Access-Control-Allow-Origin`**. הדפדפן
   חוסם את הקריאה חוצת-המקור. זוהי ברירת המחדל המיועדת של סגירה כברירת מחדל.

| משתנה סביבה            | משמעות                                                                    |
| ---------------------- | ------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | רשימת CSV של מקורות מדויקים שיש להתיר (מומלץ).                            |
| `CORS_ALLOW_ALL`       | `true`/`1` ← החזרת כל מקור כפי שהוא (תו כללי). לפיתוח בלבד.               |
| `CORS_ORIGIN`          | הגדרה ישנה. `*` מתנהג כמו `CORS_ALLOW_ALL`; ערך יחיד נוסף לרשימת ההיתרים. |

## מודל האיומים — מה `CORS_ALLOW_ALL=true` באמת חושף

ראוי להתייחס ברצינות לאזהרה הכללית של OWASP ("CORS עם תו כללי = כל אתר יכול
לפנות ל-API שלך"), אך החשיפה של OmniRoute **מצומצמת יותר מהמקרה הכללי**,
בשל עובדת מימוש קונקרטית אחת:

> **הפונקציה המרכזית `applyCorsHeaders()` לעולם אינה פולטת
> `Access-Control-Allow-Credentials`.** דפדפן לא יחשוף תגובה חוצת-מקור
> _עם פרטי הזדהות_ (הכוללת קובצי cookie), אלא אם השרת שולח
> `Access-Control-Allow-Credentials: true`. נתיב ה-CORS המשותף של OmniRoute לעולם
> אינו עושה זאת.

המשמעות עבור כל ממשק, אפילו עם `CORS_ALLOW_ALL=true`:

| ממשק                                  | מנגנון אימות               | השפעת CORS עם תו כללי                                                                                                                                                                               |
| ------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| לוח הבקרה / MANAGEMENT `/api/*`       | סשן מבוסס cookie           | המקור מוחזר, אך **ללא `Allow-Credentials`** הדפדפן **חוסם** את הקריאה עם פרטי ההזדהות. אתר חוצה-מקור זדוני **אינו יכול לקרוא** את תגובות לוח הבקרה המאומתות שלכם, וקובץ ה-cookie של הסשן אינו נחשף. |
| API ללקוח `/v1/*`, `/v1beta/*`        | כותרת Bearer / `x-api-key` | כבר מתירני **בכוונה תחילה** (`relaxForTokenAuth`): דפדפנים לעולם אינם מצרפים אוטומטית `Authorization`/`x-api-key`, ולכן דף של תוקף אינו יכול לספק את המפתח שלכם. `CORS_ALLOW_ALL` אינו מרחיב זאת.   |
| קריאה ציבורית בלבד (`/api/health`, …) | ללא                        | אינו רגיש; התו הכללי אינו מזיק.                                                                                                                                                                     |

לכן, החשיפה **השיורית** של `CORS_ALLOW_ALL=true` מוגבלת ל: (א)
**קריאות** חוצות-מקור ללא פרטי הזדהות של נתונים שכבר אינם דורשים אימות, ו-(ב)
מתן אפשרות ל-**preflight של CORS לעבור** בנתיבי ניהול — שעדיין דורשים אימות
שדף חוצה-מקור אינו יכול לספק. זה **אינו** וקטור לחטיפת סשן או
לגניבת פרטי הזדהות בנתיב ה-CORS המשותף.

### חריג ממשי אחד — `/api/v1/agents/`

נתיבי Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) מגדירים
כותרות CORS **משלהם**
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ו**כן** פולטים
`Access-Control-Allow-Origin: <origin>|*` יחד עם
`Access-Control-Allow-Credentials: true`. זהו הממשק היחיד שבו
החזרת המקור ופרטי הזדהות מתקיימים יחד, והוא **בלתי תלוי
ב-`CORS_ALLOW_ALL`**. נתיבים אלה מאומתים כממשקי ניהול
(`requireManagementAuth`); מפעילים שחושפים את לוח הבקרה מחוץ למארח צריכים להיות
מודעים לכך שזהו המקום היחיד שבו כותרות התגובה מתירות קריאה חוצת-מקור עם פרטי
הזדהות. הקשחתו לרשימת היתרים מפורשת נמצאת במעקב
בנפרד מהנחיות CORS אלה.

## רשימת תיוג לייצור

- **לעולם אל תגדירו `CORS_ALLOW_ALL=true` בסביבת ייצור.** השאירו אותו לא מוגדר.
- הגדירו רשימת מקורות **מפורשת** — באמצעות משתנה הסביבה או השדה בלשונית Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- אם OmniRoute פועל מאחורי reverse proxy / מנהרה (nginx, Caddy, Cloudflare
  Tunnel, Tailscale),‏ CORS **אינו** אמצעי הבקרה היחיד שלכם — מגן נתיבי ה-loopback
  עדיין מגן על נתיבים שמסוגלים להפעיל תהליכים (ראו
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). אל תזייפו
  `X-Forwarded-For: 127.0.0.1` כדי "לתקן" שגיאת 403; פעולה זו פותחת מחדש את מחלקת
  חולשות ה-RCE שמגן הנתיבים סוגר.
- ודאו את מצב זמן הריצה: לוח הבקרה מציג **כרזה כתומה קבועה**
  תחת Dashboard → Security → Authorization Inventory כאשר
  `CORS_ALLOW_ALL=true` פעיל, ו-`/api/settings/authz-inventory` מחזיר מעטפת
  `cors: { allowAll, allowedOrigins }` שכלי ניטור יכולים לתשאל.

## נוחות בפיתוח — התרת מקורות מקומיים מסוימים

לעיתים רחוקות יש צורך בתו הכללי אפילו בפיתוח. התירו רק את שרתי הפיתוח שבהם אתם משתמשים:

```bash
# שרתי הפיתוח של Vite (5173) ו-Next.js (3000) שניגשים ל-OmniRoute מקומי
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ההתאמה בין המקורות אינה תלוית רישיות ומתעלמת מהלוכסן שבסוף, ולכן
`http://localhost:3000` ו-`http://localhost:3000/` שקולים. ניתן להגדיר את אותה רשימת CSV
בזמן ריצה תחת **Dashboard → Security → CORS Allowed Origins** ללא
הפעלה מחדש.

## מפתחות API לעומת הפעלות cookie

- **Bearer / `x-api-key` (משטח ההסקה `/v1/*`):** דפדפנים לעולם אינם מצרפים
  אותם באופן אוטומטי. CORS אינו מחסום משמעותי כאן — מפתח ה-API הוא
  המחסום — ולכן משטח זה מתיר גישה במכוון, כדי שלקוחות דפדפן ו-
  Electron יוכלו לקרוא תגובות שהם כבר מורשים לקבל.
- **הפעלת cookie (לוח הבקרה):** מוגנת באמצעות ברירת המחדל הסגורה **וגם**
  באמצעות היעדר `Access-Control-Allow-Credentials` בנתיב המשותף. אין לכלול
  מקורות ניהול/לוח בקרה בתצורה מתירנית כלשהי; הם חייבים להישאר סגורים
  לחלוטין כברירת מחדל.

## דוגמה: reverse proxy לפני OmniRoute

CORS נאכף על ידי OmniRoute עצמו, ולכן בדרך כלל ה-proxy **לא** אמור להוסיף או
לשכתב כותרות `Access-Control-*` (כותרות כפולות משבשות דפדפנים). סיימו את חיבור ה-TLS
והעבירו את הבקשה — אפשרו ל-OmniRoute להשיב לבקשת ה-preflight:

```nginx
# nginx — העברה אל OmniRoute; אין להזריק כאן Access-Control-*
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # אין להגדיר את X-Forwarded-For כ-127.0.0.1 — הדבר מנטרל את מגן נתיבי ה-loopback.
}
```

הגדירו את מקורות הדפדפן המותרים ב-OmniRoute (`CORS_ALLOWED_ORIGINS` או בלשונית
Security), ולא ב-proxy.

## קובצי מקור

| נושא                                    | קובץ                                                                 |
| --------------------------------------- | -------------------------------------------------------------------- |
| פתרון רשימת ההיתרים + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| החלת middleware (מקור אמת יחיד)         | `src/server/authz/pipeline.ts`                                       |
| Settings → הזרקת מקורות בזמן ריצה       | `src/lib/config/runtimeSettings.ts`                                  |
| מצב זמן הריצה עבור לוח הבקרה            | `src/app/api/settings/authz-inventory/route.ts`                      |
| כרזת האזהרה בלוח הבקרה                  | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| השדה CORS Allowed Origins               | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS לפי נתיב של Cloud-Agent (החריג)    | `src/lib/cloudAgent/api.ts`                                          |

## ראו גם

- [רמות מגיני נתיבים](./ROUTE_GUARD_TIERS.md) — אכיפת loopback עבור
  נתיבים בעלי יכולת spawn (בקרה נפרדת ומשלימה).
- [מדריך הרשאות](../architecture/AUTHZ_GUIDE.md) — תהליך האימות המלא.
