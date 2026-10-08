# Tunnels Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **מקור האמת:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **עדכון אחרון:** 2026-06-28 — v3.8.40

OmniRoute יכול לחשוף את השרת המקומי שלו (`http://localhost:20128`) לאינטרנט
הציבורי באמצעות שלושה מנגנוני מנהור. הדבר שימושי עבור:

- קריאות חוזרות של OAuth מספקי ענן (Antigravity, Gemini, Cursor), שזקוקות
  לכתובת URL להפניה מחדש הנגישה לציבור.
- שיתוף המופע המקומי שלכם עם חברי הצוות ללא פריסת VM.
- בדיקות בנייד, מרחוק או בין רשתות.

כל שלושת המנגנונים מנוהלים בתוך התהליך — OmniRoute מפעיל/עוצר את הקובץ הבינארי
או ה-SDK הבסיסי מלוח הבקרה או דרך REST API. אין צורך בהגדרת reverse-proxy או
systemd.

## סקירה מהירה של מנגנוני המנהור

| מנגנון                      | התמדה                                       | עלות                 | הגדרה                                          |
| --------------------------- | ------------------------------------------- | -------------------- | ---------------------------------------------- |
| **Cloudflare Quick Tunnel** | זמני (כתובת ה-URL משתנה בכל הפעלה מחדש)     | חינם                 | ללא הגדרה — מתקין אוטומטית את `cloudflared`    |
| **ngrok**                   | יציב כאשר מוגדר מסלול בתשלום או דומיין קבוע | מסלול חינמי + בתשלום | דורש חשבון ngrok ו-authtoken                   |
| **Tailscale Funnel**        | יציב לכל צומת בתוך ה-tailnet שלכם           | חינם לשימוש אישי     | דורש התקנה והתחברות ל-Tailscale וכן Funnel ACL |

המימושים נמצאים ב-`src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` וב-`src/lib/tailscaleTunnel.ts`. שלושתם מחזירים אובייקט
`status` בעל מבנה משותף, עם השדות `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl` ו-`lastError`, כך שלוח הבקרה יכול להציג אותם באופן אחיד.

## 1. מנהרת Cloudflare (מנהרה מהירה + מנהרה בעלת שם)

`src/lib/cloudflaredTunnel.ts` מריץ את `cloudflared` כתהליך בן. הוא תומך
בשני מצבים, שנבחרים לפי קיומה של תצורה למנהרה בעלת שם:

- **מנהרה מהירה (ברירת מחדל).** מריצה `cloudflared tunnel --url
http://localhost:<apiPort>` ומחלצת מ-stdout את כתובת ה-URL שהוקצתה מסוג
  `*.trycloudflare.com`. כתובות ה-URL זמניות ומשתנות בכל הפעלה מחדש.
- **מנהרה בעלת שם (לבחירה).** כאשר `CLOUDFLARED_CONFIG` מצביע אל
  `config.yml` של cloudflared המנוהל מקומית, OmniRoute מריץ `cloudflared tunnel --no-autoupdate
--config <path> run`, וכך מספק לכם **שם מארח יציב ובעל שם**. התצורה
  מספקת את UUID המנהרה, את `credentials-file` ואת ניתוב `ingress`, ולכן לא
  מועבר `--url` ולא נדרש אסימון מלוח הבקרה של Zero Trust. הפקודה `run` קוראת
  את פרטי האימות מהנתיב המוחלט של `credentials-file` בתצורה — אין צורך ב-`cert.pem`
  (הוא משמש רק לניהול מחזור החיים של המנהרה).

התנהגויות עיקריות:

- **התקנה אוטומטית.** בשימוש הראשון, OmniRoute מוריד את הקובץ הבינארי העדכני ביותר של
  `cloudflared` מהמהדורות הרשמיות ב-GitHub (ההתקנה המנוהלת נמצאת תחת
  `DATA_DIR/cloudflared/`). ערך ה-SHA256 של הנכס שהורד מאומת מול
  מניפסט המהדורה לפני ההרצה.
- **פיקוח על התהליך.** ה-PID של cloudflared וכתובת ה-URL שנמצאה נשמרים
  ב-`quick-tunnel-state.json`, כך שלוח הבקרה יכול לשחזר את המצב לאחר טעינות מחדש.

### הגדרת מנהרה בעלת שם (שם מארח יציב)

1. צרו מנהרה המנוהלת מקומית באמצעות ה-CLI של cloudflared (באופן חד-פעמי):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. כתבו קובץ `~/.cloudflared/config.yml` שמנתב את שם המארח שלכם אל יציאת
   ה-API המקומית של OmniRoute (ברירת המחדל היא 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. הפנו את OmniRoute אל התצורה והפעילו (מחדש) את המנהרה:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # אופציונלי — דורס את שם המארח שעליו OmniRoute מדווח; אחרת הוא נקרא מתוך
   # כלל ה-ingress הראשון בתצורה:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   הפעילו את המנהרה באותו אופן שבו מפעילים מנהרה מהירה (REST / לוח הבקרה / CLI
   להלן). מנהרה בעלת שם אינה פולטת כתובת URL ציבורית שניתן לחלץ, ולכן המוכנות מזוהה
   מתוך חיבור הקצה הרשום של cloudflared, ו-`publicUrl`/`apiUrl`
   מדווחים מתוך `CLOUDFLARED_HOSTNAME` (או משם המארח בכלל ה-ingress הראשון בתצורה).

### הפעלה / השבתה באמצעות REST

נקודת הקצה משתמשת בגוף `{action: "enable" | "disable"}`, ולא בנתיבים נפרדים
של `start`/`stop`. נדרש אימות לניהול (הפעלת מנהל מערכת או מפתח API של מנהל מערכת).

```bash
# הפעלה
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# מצב
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# השבתה
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

או דרך לוח הבקרה: **הגדרות → מנהרות → Cloudflare**.

### משתני סביבה אופציונליים

| משתנה                                                | מטרה                                                                                                                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CLOUDFLARED_BIN`                                    | דריסת נתיב הקובץ הבינארי. אם הוגדר והנתיב תקין, OmniRoute משתמש בו במקום להוריד אותו.                                                                        |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | פרוטוקול התעבורה (ברירת המחדל היא `http2`; זמינים גם `quic`, `auto`).                                                                                        |
| `CLOUDFLARED_CONFIG`                                 | נתיב לקובץ `config.yml` של cloudflared המנוהל מקומית. כאשר מוגדר, OmniRoute מפעיל מנהרה **בעלת שם/מתמידה** (`tunnel --config <path> run`) במקום מנהרה מהירה. |
| `CLOUDFLARED_HOSTNAME`                               | דורס את שם המארח הציבורי המדווח של המנהרה בעלת השם (למשל `ai.example.com`). כאשר אינו מוגדר, הערך נקרא משם המארח הראשון של `ingress` בתצורה.                 |

## 2. ngrok

הקובץ `src/lib/ngrokTunnel.ts` משתמש ב-**SDK‏ `@ngrok/ngrok`** (בתוך התהליך, ללא תת-תהליך CLI). המודול המקורי מיובא באופן עצל בהפעלה הראשונה, כך שפלטפורמות שאין עבורן קבצים בינאריים שנבנו מראש לא יגרמו לאפליקציה להיכשל בעת האתחול.

### דרישות מוקדמות

1. הירשמו בכתובת <https://ngrok.com>.
2. העתיקו את ה-authtoken שלכם מלוח הבקרה של ngrok.
3. ספקו אותו באחת מהדרכים הבאות:
   - `.env`:‏ `NGROK_AUTHTOKEN=<token>`, או
   - לוח הבקרה: **הגדרות ← מנהרות ← ngrok**, או
   - גוף בקשת REST (חד-פעמי): `{"action":"enable","authToken":"<token>"}`.

אם אף אחת מהאפשרויות אינה מוגדרת, הסטטוס מחזיר `phase: "needs_auth"`.

### הפעלה / השבתה באמצעות REST

```bash
# הפעלה (משתמש ב-NGROK_AUTHTOKEN מהסביבה)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# הפעלה עם אסימון מוטבע
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# סטטוס
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# השבתה
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

התגובה כוללת את ה-`publicUrl` שהוקצה (לדוגמה,
`https://abcd-1234.ngrok-free.app`). יש להגדיר דומיינים מותאמים אישית, אזורים וכללי מדיניות בלוח הבקרה של ngrok — ‏OmniRoute עצמו רק מעביר ל-SDK את כתובת ה-URL המקומית של היעד.

## 3. Tailscale Funnel

הקובץ `src/lib/tailscaleTunnel.ts` מתזמר את ממשק שורת הפקודה `tailscale` של המערכת כדי לחשוף את יציאת ה-API המקומית באמצעות **Funnel** (מנגנון היציאה של Tailscale לאינטרנט הציבורי עבור serve).
הוא תומך במחזור החיים המלא: התקנה, התחברות, הפעלת daemon, הפעלה והשבתה.

המימוש מפעיל את `tailscale funnel --bg <port>` (מצב רקע). מבנה כתובת ה-URL הציבורית הוא `https://<machine>.<tailnet>.ts.net/`.

### דרישות מוקדמות

1. התקינו את Tailscale (או אפשרו ל-OmniRoute לעשות זאת — ראו את נקודת הקצה `install` להלן).
2. התחברו (`tailscale login` או באמצעות נקודת הקצה `login` של OmniRoute).
3. הפעילו את Funnel עבור ה-tailnet שלכם במסוף הניהול של Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

ב-Linux וב-macOS, ה-daemon (`tailscaled`) דורש `sudo` לצורך שליטה. נקודות הקצה מסוג POST מקבלות שדה `sudoPassword` אופציונלי, שמועבר למטמון הסיסמאות MITM של OmniRoute (`getCachedPassword` / `setCachedPassword`) למשך הקריאה. ב-Windows נעשה שימוש בהתקנת השירות המוגדרת כברירת מחדל בנתיב `C:\Program Files\Tailscale\tailscale.exe`.

### נקודות קצה של REST

ל-Tailscale יש ממשק עשיר יותר מאשר למערכות הקצה האחרות, משום שהתקנה, התחברות, daemon ומנהרה הם היבטים נפרדים.

| נקודת קצה                             | שיטה   | מטרה                                                         |
| ------------------------------------- | ------ | ------------------------------------------------------------ |
| `/api/tunnels/tailscale`              | `GET`  | סטטוס מנהרה מצטבר (`phase`, `tunnelUrl`, `apiUrl` וכו')      |
| `/api/tunnels/tailscale/check`        | `GET`  | בדיקה ברמה נמוכה יותר: מותקן? מחובר? ה-daemon פועל?          |
| `/api/tunnels/tailscale/install`      | `POST` | התקנת Tailscale (אירועי התקדמות מוזרמים ב-SSE) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | הפעלת `tailscaled` ב-Linux/macOS                             |
| `/api/tunnels/tailscale/login`        | `POST` | התחלת תהליך ההתחברות; מחזירה `authUrl` לפתיחה בדפדפן         |
| `/api/tunnels/tailscale/enable`       | `POST` | הפעלת Funnel עבור יציאת ה-API                                |
| `/api/tunnels/tailscale/disable`      | `POST` | עצירת Funnel                                                 |

כל נקודות הקצה של Tailscale דורשות אימות ניהולי (ראו `routeUtils.ts ::
requireTailscaleAuth`).

דוגמה להפעלה:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

אם Funnel אינו מופעל במסוף הניהול, התגובה כוללת `funnelNotEnabled: true` וכן `enableUrl` לפתיחה בדפדפן.

### משתני סביבה אופציונליים

| משתנה           | מטרה                                  |
| --------------- | ------------------------------------- |
| `TAILSCALE_BIN` | דריסת הנתיב לקובץ הבינארי `tailscale` |

## סיכום נקודות קצה

| נקודת קצה                             | שיטה   | גוף הבקשה                           | אימות      |
| ------------------------------------- | ------ | ----------------------------------- | ---------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | management |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | management |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | management |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | management |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | management |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | management |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | management |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | management |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | management |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | management |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | management |

אין נקודת קצה מרכזית `/api/settings/tunnels` — כל מנגנון עצמאי.

## שיקולים לגבי קריאות חוזרות של OAuth

כאשר חושפים את OmniRoute דרך מנהרה, לוח הבקרה ותהליכי OAuth חייבים
לבנות כתובות URL לקריאה חוזרת על בסיס שם המארח **הציבורי**, ולא `localhost`. אחרת,
ספק ה-OAuth מפנה את המשתמש בחזרה לכתובת URL שהשרתים שלו אינם יכולים להגיע אליה,
ותהליך לחיצת היד נכשל.

עריכות בלוח הבקרה ושמירת הגדרות אינן דורשות קיבוע של שם מארח המנהרה בתוך
`NEXT_PUBLIC_BASE_URL`. לוח הבקרה המאומת שולח בקשות לא-בטוחות מאותו מקור
באמצעות אסימון CSRF הקשור להפעלה, ולכן עדיין ניתן להשתמש בשמות מארח זמניים של Cloudflare Quick Tunnel
לצורך ניהול רגיל דרך ממשק המשתמש לאחר ההתחברות.

הגדירו:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

והפעילו מחדש את OmniRoute לפני התחלת OAuth. במנהרות Cloudflare Quick
זמניות, כתובת ה-URL משתנה לאחר כל הפעלה מחדש, ולכן לשימוש ב-OAuth בסביבת ייצור העדיפו את ngrok עם דומיין
שמור או את Tailscale Funnel.

## תקינות וניטור

לוח הבקרה מציג את מצב המנהרה תחת **הגדרות ← מנהרות**:

- מנגנונים פעילים וה-`phase` הנוכחי (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- כתובת ה-URL הציבורית הנוכחית וכתובת ה-URL הנגזרת של ה-API (`<publicUrl>/v1`).
- כתובת ה-URL של היעד המקומי שאליו המנהרה מעבירה תעבורה.
- הודעת השגיאה האחרונה, אם קיימת.

לניטור תכנותי, בצעו תשאול מחזורי של נקודות הקצה `GET` עבור כל מנגנון. מותר להפעיל יותר
ממנגנון אחד בו-זמנית; OmniRoute יעקוב אחר כל אחד מהם
בנפרד.

## פתרון בעיות

### "הקובץ הבינארי cloudflared לא נמצא"

OmniRoute מנסה לבצע התקנה אוטומטית בשימוש הראשון. אם ההתקנה חסומה
(רשת מוגבלת, אין גישה ל-GitHub), הורידו את `cloudflared` ידנית מתוך
<https://github.com/cloudflare/cloudflared/releases> והגדירו
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: נדרש authtoken"

`phase: "needs_auth"` מציין שלא נמצא authtoken. הגדירו את `NGROK_AUTHTOKEN` בתוך
`.env`, הגדירו אותו דרך לוח הבקרה, או העבירו את `authToken` בגוף בקשת ה-POST
להפעלה.

### "tailscale: ‏funnel אינו מופעל"

כאשר תגובת ההפעלה כוללת `funnelNotEnabled: true`, ‏Funnel מושבת
עבור ה-tailnet שלכם. פתחו את `enableUrl` שהוחזר (או את דף התכונה במסוף הניהול)
והפעילו את Funnel.

### שינויים בכתובת ה-URL של המנהרה משבשים את OAuth

השתמשו ב-ngrok עם דומיין שמור או ב-Tailscale Funnel (שניהם יציבים עבור כל צומת).
מנהרות Cloudflare Quick הן זמניות מעצם תכנונן ואינן מומלצות עבור
קריאות חוזרות ארוכות טווח של OAuth.

### ההרשאה נדחתה ב-Linux/macOS עבור Tailscale

‏`tailscaled` זקוק להרשאות root. ספקו `sudoPassword` לנקודת הקצה המתאימה מסוג POST,
או הפעילו את ה-daemon בעצמכם (`sudo systemctl start tailscaled`).

## ראו גם

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — פרוקסי יוצא (1proxy, SOCKS5, HTTP) עבור
  תעבורת יציאה.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — רשימה מלאה של משתני סביבה, כולל
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — חלופות למנהור עבור
  אירוח ציבורי יציב.
- קוד מקור: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
