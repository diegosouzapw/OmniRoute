# Remote Mode (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

הפעילו את ה-CLI של `omniroute` במחשב הנייד שלכם, בעוד OmniRoute עצמו פועל במקום אחר
(שרת VPS, שרת ביתי, מחשב אחר ב-Tailnet שלכם). מתחברים פעם אחת באמצעות
`omniroute connect`, ומאותו רגע **כל** פקודת CLI מופנית לשרת המרוחק —
אותן פקודות, אותו פלט, רק שהן מבוצעות מול השרת המרוחק.

אין צורך להתקין כלי נוסף: מצב מרוחק הוא ה-CLI הרגיל של `omniroute`
בתוספת **אסימוני גישה** עם היקף הרשאות מוגדר.

```bash
npm install -g omniroute                 # ה-CLI הרגיל
omniroute connect 192.168.0.15           # התחברות (סיסמה ← אסימון עם היקף הרשאות)
omniroute models list                    # ← כעת מציג את המודלים של השרת המרוחק
omniroute configure codex                # ← כותב פרופיל Codex מקומי מהקטלוג המרוחק
```

---

## איך זה עובד

```
המחשב הנייד שלכם                       OmniRoute מרוחק (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI של omniroute   │  POST /api/cli/connect  (סיסמה ← אסימון)          │
│  הקשר: vps         │ ───────────────►  │ מנפיק אסימון גישה עם היקף     │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ כל נתיב ניהול, עם בדיקת היקף  │
│ כותב הגדרות        │ ◄───────────────  │ בהתאם להיקף האסימון           │
│ באופן מקומי        │                   └───────────────────────────────┘
└────────────────────┘
```

- **הקשרים** מאחסנים שרת אחד כל אחד (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` מחליפה את השרת הפעיל; `default` הוא מקומי.
- **אסימוני גישה** (`oma_live_…`) מעניקים הרשאה לפקודות ניהול. הם
  נבדלים ממפתחות API להסקה (`sk-…`, המשמשים עבור `/v1/chat/completions`).
- רק גיבוב SHA-256 של אסימון נשמר בצד השרת. הטקסט הגלוי מוצג
  **פעם אחת בלבד**, בעת היצירה.

---

## התחברות

### באמצעות סיסמת הניהול (אתחול ראשוני)

```bash
omniroute connect 192.168.0.15
# סיסמת ניהול עבור http://192.168.0.15:20128: ********
# ✔ התחבר אל http://192.168.0.15:20128 — הקשר '192.168.0.15' (היקף: admin)
```

תהליך הסיסמה מנפיק כברירת מחדל אסימון **admin** (יש ברשותכם את הסיסמה, ולכן
כבר יש לכם שליטה מלאה). צמצמו את היקף ההרשאות באמצעות `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

אפשרויות: `--port <p>` (כאשר המארח אינו כולל יציאה), `--name <ctx>` (שם ההקשר),
`--scope read|write|admin`. כתובת URL מלאה נשמרת כפי שהיא:
`omniroute connect https://omni.example.com`.

### באמצעות אסימון שנוצר מראש

צרו אסימון עם היקף הרשאות מוגדר בלוח הבקרה (או באמצעות `omniroute tokens create`) והדביקו
אותו — אין צורך בסיסמה:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

ה-CLI מאמת אותו באמצעות `GET /api/cli/whoami` ושומר אותו כהקשר הפעיל.

---

## היקפי הרשאות

שלוש רמות, במבנה היררכי (`admin ⊃ write ⊃ read`):

| היקף    | פעולות מותרות                                                              |
| ------- | -------------------------------------------------------------------------- |
| `read`  | הצגה/בדיקה — `models list`, `providers status`, `logs`, `usage`, `cost`    |
| `write` | קריאה **+** הגדרה/החלה — `setup-codex`, `keys add`, `config set`, שילובים  |
| `admin` | כתיבה **+** ניהול — CRUD של `tokens`, הוספת ספקים, שירותים, מדיניות, oauth |

השרת מסיק את היקף ההרשאות הנדרש לכל נתיב משיטת ה-HTTP
(`GET`←קריאה, שינויים←כתיבה), בתוספת רשימת הרשאה של admin עבור ממשקים רגישים
(שינויים ב-`/api/cli/tokens`, ב-`/api/providers`, וכן `/api/oauth`, `/api/services`, …).
אסימון בעל היקף הרשאות לא מספיק מקבל `403` עם הודעה ברורה.

> נתיבים שמפעילים תהליכים (`/api/services/*`, `/api/mcp/*`, …) נשארים
> **מוגבלים ל-loopback בלבד** — אסימון מרוחק לעולם לא יוכל לגשת אליהם, ללא קשר להיקף ההרשאות.

---

## חיבור Antigravity בהתקנה מרוחקת

Antigravity משתמש במסך ההסכמה firstparty/nativeapp של Google. Google משחררת את
קוד ההרשאה רק כאשר **ההפניה החוזרת בלולאה המקומית**
(`http://127.0.0.1:<port>/callback`) **נגישה מהדפדפן שמאשר את ההתחברות**.
בהתקנה על VPS מרוחק, הלולאה המקומית הזו נמצאת בשרת ולא במחשב שלכם, ולכן מסך
ההסכמה **נתקע לנצח ולעולם אינו מפיק קוד** — למנגנון החלופי הרגיל של "הדבקת כתובת
ה-URL של ההפניה החוזרת" אין מה להדביק. (זוהי מגבלה מצד Google: אותה תקיעה
מתרחשת בכל proxy שמשתמש בלקוח שולחן העבודה המצורף של Antigravity, ולא רק
ב-OmniRoute.)

לוח הבקרה מזהה זאת לפני שתיתקעו: פתיחת **Providers → Antigravity →
Connect** מכתובת שאינה localhost מחליפה את ההודעה הכללית "העתיקו את כתובת
ה-URL של ההפניה החוזרת" בשני הפתרונות שלהלן, כאשר כתובת המארח והיציאה שלכם
כבר מוזנות בכל אחד מהם. (גם כתובת LAN נחשבת — `192.168.x.x` אינה localhost
מבחינת ההפניה החוזרת הזו.)

ישנן שתי דרכים נתמכות לחיבור Antigravity אל OmniRoute מרוחק.

### אפשרות א׳ — מסייע התחברות מקומי (מומלץ)

הריצו את OAuth **במחשב שלכם**, שבו `127.0.0.1` נגישה. המסייע מתקשר ישירות עם
Google, ולכן תהליך ההסכמה מושלם במקום שבו גרסת לוח הבקרה אינה יכולה להשלימו.

**אם אתם כבר מחוברים** (`omniroute connect <host>`), אין צורך להעתיק דבר —
המסייע מעביר עבורכם את פרטי הגישה לאותה התקנה:

```bash
# במחשב המקומי שלכם (נדרשים Node.js ודפדפן):
omniroute connect 192.168.0.15        # פעם אחת — מנפיק אסימון הקשר בהיקף מנהל מערכת
npx omniroute login antigravity
#   ↳ פותח את מסך ההסכמה של Google, לוכד את ההפניה החוזרת ביציאת loopback מקומית,
#     מבצע את ההחלפה ושולח באמצעות POST את פרטי הגישה להקשר הפעיל:
#
#   Antigravity חובר בכתובת http://192.168.0.15:20128 (חיבור abc123).
#   אין צורך להדביק דבר — ניתן לסגור את המסוף הזה.
```

הדחיפה מתבצעת אוטומטית בכל פעם שההקשר הפעיל מצביע על מחשב אחר. ניתן לכפות
אותה או למנוע אותה באמצעות `--push` / `--no-push`, או לכוון להקשר מסוים
באמצעות `--context <name>`.

**אם המחשב שלכם אינו יכול להגיע אל ה-VPS** (בגלל חומת אש, היעדר SSH או עמדת
עבודה מבודדת), המסייע עדיין פועל — הוא _זקוק_ רק ל-Google. השתמשו
ב-`--no-push`, או פשוט אפשרו לדחיפה להיכשל: במקרה כזה הוא ידפיס את ה-blob
במקום למחוק הרשאה שכבר השלמתם.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

לאחר מכן, בלוח הבקרה **המרוחק**: **Providers → Antigravity → Connect**, והדביקו
את ה-blob מסוג `omniroute-cred-v1.…` בשדה **Step 2** (השדה מקבל כתובת URL של
הפניה חוזרת או blob של פרטי גישה). OmniRoute מפענח אותו, מריץ בצד השרת את
תהליך ההצטרפות של Cloud Code ושומר את החיבור.

> ה-blob מכיל אסימון רענון — התייחסו אליו כמו לסיסמה. במסלול הדחיפה הוא נשלח
> פעם אחת דרך החיבור המאומת של ההקשר שלכם; במסלול ההדבקה, דרך החיבור ללוח
> הבקרה. בשני המקרים הוא נשמר כשהוא מוצפן במנוחה, ודחיפה מוצלחת לעולם אינה
> מדפיסה אותו במסוף שלכם.

דגלים: `--no-browser` (הדפסת כתובת ה-URL במקום לפתוח אותה אוטומטית),
`--port <n>` (קיבוע יציאת ה-loopback), `--timeout <ms>`,
`--push` / `--no-push` (עקיפת אופן המסירה האוטומטי), `--context <name>`
(בחירת הקשר מסוים כיעד).

### אפשרות ב׳ — מנהרת העברה מקומית של SSH

אם יש לכם גישת SSH אל ה-VPS, העבירו את יציאת לוח הבקרה כך שההפניה החוזרת
בלולאה המקומית תנותב בחזרה לשרת דרך המנהרה:

```bash
# במחשב המקומי שלכם:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# לאחר מכן, פתחו את http://localhost:20128 בדפדפן המקומי שלכם וחברו את Antigravity
# כרגיל — ההפניה אל 127.0.0.1:20128/callback מגיעה כעת ל-VPS דרך SSH.
```

מכיוון שאתם ניגשים ללוח הבקרה דרך `localhost:20128`, תהליך ההסכמה של Google
מושלם וההפניה החוזרת מועברת אל השרת דרך אותה מנהרה — אין צורך ב-blob. השאירו
את המנהרה פתוחה עד שהחיבור יוצג כפעיל.

בניגוד לספקים בעלי loopback קבוע המפורטים להלן, **כאן מספיקה העברה אחת**:
ההפניה החוזרת של Antigravity משתמשת ביציאת לוח הבקרה עצמה, ולכן אין צורך
להעביר יציאה נוספת הייחודית לספק.

> חלופה ללא ממשק גרפי כלל (ללא מסייע וללא מנהרה) היא להגדיר פרטי גישה משלכם
> ל-Google OAuth באינטרנט יחד עם כתובת URL ציבורית כבסיס; עיינו במשתני הסביבה
> של OAuth עבור הספק. שתי האפשרויות שלעיל אינן דורשות הגדרה נוספת ב-Google.

---

## חיבור Codex / Grok בהתקנה מרוחקת (ספקים עם loopback קבוע)

Codex, ‏xAI (`xai-oauth`) ו-Grok CLI (`grok-cli`) רושמים `redirect_uri` מסוג loopback
**קבוע** ביישום ה-OAuth שלהם אצל הספק. OmniRoute אינו יכול לשנות אותו — הספק
תמיד מפנה את הדפדפן בחזרה לאותה כתובת שהוגדרה מראש:

| ספק         | כתובת callback קבועה שאליה הספק מפנה  |
| ----------- | ------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback` |
| `xai-oauth` | `http://127.0.0.1:56121/callback`     |
| `grok-cli`  | `http://127.0.0.1:56122/callback`     |

במקרה זה, `localhost` פירושו **המחשב שמריץ את הדפדפן**, בעוד ששרת ה-callback
של PKCE ב-OmniRoute מאזין ב-loopback של **השרת**. אם פותחים את לוח הבקרה בכתובת
LAN כגון `http://192.168.0.15:20128`, השניים לעולם אינם נפגשים: קוד ההרשאה
נשלח אל `localhost:1455` של המחשב הנייד שלכם, שבו דבר אינו מאזין, והספק מכשיל
את ההתחברות מבלי להציג שגיאה.

לוח הבקרה מזהה זאת לפני פתיחת החלון הקופץ ומציג את פקודת המנהרה במקום לאפשר
להתחברות להיכשל ללא הודעה (#8046).

### תיקון — העבירו את **שתי** היציאות

```bash
# במחשב שמריץ את הדפדפן:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# לאחר מכן גלשו אל http://localhost:20128 וחברו משם את Codex
```

נדרשות שתי העברות, והעברה של אחת בלבד עדיין תיכשל:

- **`20128`** (יציאת לוח הבקרה) הופכת את המקור ל-localhost אמיתי, וזה מה
  שגורם ל-OmniRoute להפעיל בכלל את שרת ה-callback של PKCE — מקור LAN לעולם
  אינו מגיע לענף הזה.
- **`1455`** (יציאת ה-callback הקבועה של הספק) היא הכתובת שאליה הדפדפן מוחזר;
  עליה לעבור דרך המנהרה אל ה-loopback של השרת.

בעת חיבור xAI או Grok CLI, החליפו את `1455` ב-`56121`/`56122`, ואת `20128`
ביציאה בפועל של לוח הבקרה שלכם. השאירו את המנהרה פתוחה עד שהחיבור יוצג
כפעיל.

> **אין גישת SSH?** ‏Codex ו-Grok CLI מאפשרים גם להדביק אסימון — הלשונית **Paste API
> Key** / **Import auth.json** בתיבת הדו-שיח של החיבור. נתיב זה אינו כולל callback
> מסוג loopback, ולכן הוא פועל מכל מקור. Codex מאפשר בנוסף אסימון גישה בלבד
> או נתוני הפעלה מתוך `~/.codex/auth.json`.

---

## ניהול אסימונים

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ מדפיס את הסוד פעם אחת בלבד — העתיקו אותו עכשיו
omniroute tokens list                 # מוסווה: מזהה, שם, תחום הרשאה, קידומת, מצב, תפוגה
omniroute tokens revoke <id|prefix>   # מבטל באופן מיידי
omniroute tokens scopes               # מסביר את שלושת תחומי ההרשאה
```

פקודות `tokens` דורשות אישור **admin**. אפשר גם לנהל אסימונים בלוח הבקרה תחת
**Settings → Access Tokens** (יצירה, ביטול, העתקה חד-פעמית).

---

## הגדרת CLI לתכנות מתוך הקטלוג המרוחק

`omniroute configure` קורא את קטלוג המודלים החי של **השרת הפעיל** וכותב
תצורה במחשב **שלכם**.

```bash
omniroute configure codex
#   ספקים: glm, kmc, ollamacloud, opencode-go, …
#   ספק: glm
#   מזהה מודל: glm/glm-5.2
#   ✔ נכתב ~/.codex/glm52.config.toml
#   לשימוש:  codex --profile glm52

# מצב לא אינטראקטיבי
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# השאירו מודל שנמצא בשימוש תכוף בראש הבורר האינטראקטיבי
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

הבורר שומר רק מזהי מודלים (לעולם לא כתובות URL או פרטי גישה) בקובץ המקומי
`model-preferences.json`, בחלוקה לפי הקשר ויעד CLI. מועדפים מוצגים לפני
בחירות אחרונות; השתמשו ב-`--unfavorite` כדי להסיר מודל נבחר מרשימת
ההקשר/יעד הזו.

הפרופיל שנכתב מפנה למפתח ההסקה באמצעות משתנה סביבה
(`OMNIROUTE_API_KEY`) — הסוד לעולם אינו נכתב לדיסק. להגדרה הבסיסית החד-פעמית
של Codex (המקטע `[model_providers.omniroute]`), ראו
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### הפעלת CLI מול השרת המרוחק (ללא כתיבת תצורה)

`omniroute run <target>` מכבד גם הוא את ההקשר הפעיל: כתובת ה-URL הבסיסית
המרוחקת ופרטי הגישה של ההקשר מוזרקים לתהליך שנוצר בלבד.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → שרת מרוחק
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# תצוגה מקדימה של מה שיופעל בדיוק (שמות מפתחות env בלבד, לעולם לא ערכים):
omniroute run codex --dry-run --json
```

יעדים: `claude`,‏ `codex`,‏ `aider`,‏ `goose`,‏ `opencode`,‏ `qwen`,‏ `gemini`
(מקור יחיד: `bin/cli/cli-manifest.mjs`). ‏Qwen ו-Gemini פועלים עם תיקיית בית
זמנית ומבודדת שמוסרת ביציאה, כך שההפעלה לעולם אינה נוגעת בתצורת הכלים
האישית שלכם — ואינה דולפת לתוכה.

### פקודות הגדרה לכל CLI

לכל CLI נתמך יש פקודת הגדרה המותאמת לשרת מרוחק (כולן מכבדות את ההקשר
הפעיל, או את `--remote <url> --api-key <key>`):

| CLI         | פקודה                      | מה נכתב                                                                                                                                                                           |
| ----------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | פרופילי `~/.codex/<name>.config.toml` (לכל מודל)                                                                                                                                  |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (לכל מודל)                                                                                                                              |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — ספק `omniroute` תואם OpenAI עם כל מודל בקטלוג (הריצו `opencode -m omniroute/<model>`)                                                        |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (מצב CLI) + הדפסת הגדרות ההרחבה של VS Code להדבקה (תואם OpenAI, כתובת URL בסיסית **ללא** `/v1`)                                        |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + הגדרות `kilocode.*` של VS Code — תואם OpenAI, כתובת URL בסיסית **עם** `/v1`                                                               |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + ‏CLI בשם `cn`) — `provider: openai`,‏ `apiBase` **עם** `/v1`, מפתח דרך `${{ secrets.OMNIROUTE_API_KEY }}`                          |
| Cursor      | `omniroute setup-cursor`   | הדפסת השלבים בתוך היישום (Settings → Models → Override OpenAI Base URL **עם** `/v1` + מפתח + מודל). תצורת Cursor היא SQLite אטומה — חלונית הצ'אט בלבד                             |
| Roo Code    | `omniroute setup-roo`      | כתיבת קובץ JSON לייבוא אל Roo (`~/.omniroute/roo-settings.json`) + הגדרת `roo-cline.autoImportSettingsPath` + הדפסת שלבי ממשק המשתמש (תואם OpenAI, כתובת URL בסיסית **עם** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — ספק `openai-compat`,‏ `base_url` **עם** `/v1`, מפתח דרך `$OMNIROUTE_API_KEY`                                                                       |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + ‏`OPENAI_HOST` **ללא** `/v1` + ‏`GOOSE_MODEL`) + הוראות להגדרת משתני סביבה                                               |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **ללא** `/v1` + ‏`model: openai/<id>`) + הוראות להגדרת משתני סביבה (`aider --message --yes`)                                               |
| Qwen Code   | `omniroute setup-qwen`     | רשומת V4 מסוג `modelProviders.openai` בתוך `~/.qwen/settings.json` + ‏`OMNIROUTE_API_KEY` בתוך `~/.qwen/.env`                                                                     |

```bash
# OpenCode (ספק תואם OpenAI, כל המודלים בקטלוג, VPS מרוחק)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # השארת מודלים תואמים בלבד
opencode -m omniroute/glm/glm-5.2 "..."          # יש לייצא תחילה את OMNIROUTE_API_KEY
```

> ל-OpenCode יש גם שילוב עשיר יותר באמצעות **תוסף**: `omniroute setup opencode`
> (כעת עם תמיכה בסביבה מרוחקת דרך `--remote`) מתקין את `@omniroute/opencode-plugin`.
> `setup-opencode` הוא החלופה הקלה ותואמת OpenAI. ההפניה למפתח ה-API
> מתבצעת דרך `{env:OMNIROUTE_API_KEY}` — הוא לעולם אינו נכתב לדיסק.
>
> ב-OpenCode v2, השתמשו במקום זאת ב-`@omniroute/opencode-plugin-v2`: אותו קטלוג,
> חוזה טעינה שונה. הוא קורא את המפתח ממאגר פרטי הגישה של OpenCode עצמו
> כאשר השילוב מחובר, כך ששער מרוחק אינו זקוק כלל למפתח בתוך
> `opencode.json`.

---

## ניהול הקשרים (מעבר בין שרתים)

**הקשר** הוא שרת שמור (baseUrl + פרטי הזדהות + היקף הרשאות). `omniroute connect`
יוצר הקשר והופך אותו לפעיל; מאותו רגע כל פקודה מופנית אליו. נהלו הקשרים
ועברו ביניהם באמצעות `omniroute contexts`:

```bash
omniroute contexts list            # כל ההקשרים; ההקשר הפעיל מסומן ב־●
omniroute contexts current         # השרת הפעיל, מצב האימות והיקף ההרשאות
```

```text
  | שם     | כתובת URL בסיסית          | אימות | היקף  | תיאור
● | vps     | http://100.67.86.91:20128 | token | admin | OmniRoute מרוחק (…)
  | default | http://localhost:20128    | ✗     |       |
```

**מעבר בין שרתים** — כל פקודה שתופעל לאחר מכן תשתמש בהקשר הפעיל:

```bash
omniroute contexts use vps         # → כל הפקודות מופנות כעת ל־VPS המרוחק
omniroute tokens list              #   (מופעלת מול ה־VPS)

omniroute contexts use default     # → חזרה ל־localhost
omniroute tokens list              #   (מופעלת מול השרת המקומי)
```

**הוספת הקשר באופן ידני** (במקום `connect`), הצגת פרטיו או שינוי שמו:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "שרת staging"
omniroute contexts show staging    # פרטים מלאים של הקשר אחד
omniroute contexts rename staging stg
```

**הסרת הקשר** — תוצג בקשת אישור; העבירו את `--yes` כדי לדלג עליה
(נדרש עבור סקריפטים / מעטפות לא אינטראקטיביות, שאחרת מסרבות באופן בטוח):

```bash
omniroute contexts remove stg --yes
```

> לא ניתן להסיר את `default` (‏localhost). הסרת ההקשר הפעיל גורמת לחזרה
> אל `default`. עצה: הסרת הקשר מוחקת רק את פרטי ההזדהות השמורים באופן **מקומי** —
> כדי לבטל בפועל את הגישה, בטלו את האסימון בשרת באמצעות `omniroute tokens revoke <id>`.

**ייצוא / ייבוא** של הקשרים (לדוגמה, כדי להעביר אותם בין מחשבים). עבור הקשרים חדשים נשמרת
רק הפניה למחזיק המפתחות; פרטי ההזדהות אינם מועתקים לייצוא כאשר מחזיק המפתחות
של מערכת ההפעלה זמין:

```bash
omniroute contexts export --out contexts.json     # ברירת מחדל: stdout
omniroute contexts import contexts.json            # דריסה; השתמשו ב־--merge כדי לשמור על הקיימים
omniroute contexts migrate --yes                  # העברת אסימונים ישנים בטקסט גלוי למחזיק המפתחות
```

במערכות ללא ממשק משתמש שבהן אין מחזיק מפתחות שמיש של מערכת ההפעלה, ממשק שורת הפקודה חוזר להשתמש
ב־`config.json` עם מצב `0600` ומציג אזהרה חד־פעמית. יש להתייחס לייצואים שנוצרו
באמצעות מנגנון חלופי זה (ולכל תצורה ישנה מלפני ההעברה) כאל חומר סודי.

---

## בדיקה מקצה לקצה במהירות

מחזור חיים שניתן להעתיק ולהדביק כדי לאמת הגדרה מרוחקת מאפס — התחברות, יצירת
אסימון עם היקף הרשאות, ניתוב פקודה, מעבר חזרה ופירוק ההגדרה. החליפו את
`192.168.0.15` בשם המארח/כתובת ה־IP של השרת שלכם (Tailscale, רשת LAN או כתובת URL ציבורית
מסוג `https://…`).

```bash
# 1. התחברות (סיסמה ← אסימון admin, נשמר כהקשר שהופך לפעיל)
omniroute connect 192.168.0.15                 # או: --key oma_live_xxxx  (ללא סיסמה)
omniroute contexts current                     # מציג את השרת המרוחק ואת היקף ההרשאות

# 2. שימוש בו — פקודות ניהול מופעלות כעת מול השרת המרוחק
omniroute tokens create --name laptop --scope read   # יצירת אסימון עם הרשאות מצומצמות יותר
omniroute tokens list                                 # רשימה מוסווית מהשרת המרוחק

# 3. מעבר הלוך ושוב
omniroute contexts use default                 # → מקומי
omniroute contexts use 192-168-0-15            # → שוב מרוחק (השם מתוך `contexts list`)

# 4. פירוק ההגדרה. שימו לב: `contexts remove` מוחקת רק את פרטי ההזדהות המקומיים —
#    היא אינה מבטלת את האסימון בשרת. בטלו אותו תחילה בצד השרת אם ברצונכם
#    לבטל בפועל את הגישה.
omniroute tokens revoke <id|prefix>            # ביטול הגישה בשרת
omniroute contexts remove 192-168-0-15 --yes   # מחיקת ההקשר המקומי (גם אם הוא פעיל ← חזרה ל־default), ללא בקשת אישור
```

> האפשרות `--yes` הופכת את `contexts remove` ללא אינטראקטיבית (נדרש בסקריפטים/CI; בלעדיה,
> מעטפת לא אינטראקטיבית מסרבת באופן בטוח במקום להיתקע). הסרת ההקשר
> **הפעיל** גורמת לחזרה אוטומטית אל `default`.

---

## הערות אבטחה

- הטוקן בטקסט גלוי מוצג פעם אחת בלבד; רק גיבוב ה-SHA-256 נשמר (בדומה למפתחות API).
- `omniroute connect` עושה שימוש חוזר בנעילה מפני ניסיונות כניסה בכוח גס וברישום הביקורת.
- העדיפו HTTPS או Tailnet לתעבורה; מארח ללא ציון פרוטוקול משתמש כברירת מחדל ב-`http://`
  לנוחות השימוש ב-LAN/Tailscale — העבירו כתובת URL מלאה מסוג `https://…` כדי להשתמש ב-TLS.
- קובץ ההקשר המקומי המועדף הוא `~/.omniroute/config.json` (`chmod 600`),
  המכיל רק `credentialRef`; הטוקן עצמו מאוחסן במחזיק המפתחות של מערכת ההפעלה
  (`keytar`) ולעולם אינו מודפס ביומנים. התקנות ללא ממשק משתמש שאין בהן
  מחזיק מפתחות מקומי תקין משתמשות באותו קובץ `0600` כחלופה מפורשת
  ומציגות אזהרה פעם אחת. השתמשו ב-`omniroute contexts migrate --yes` לאחר התקנת
  קצה עורפי למחזיק המפתחות.

---

## נקודות קצה של ה-API (לעיון)

| שיטה   | נתיב                  | אימות       | היקף                    |
| ------ | --------------------- | ----------- | ----------------------- |
| POST   | `/api/cli/connect`    | סיסמת ניהול | — (ציבורי, מוגן בסיסמה) |
| GET    | `/api/cli/whoami`     | טוקן גישה   | קריאה                   |
| GET    | `/api/cli/tokens`     | טוקן גישה   | ניהול                   |
| POST   | `/api/cli/tokens`     | טוקן גישה   | ניהול                   |
| DELETE | `/api/cli/tokens/:id` | טוקן גישה   | ניהול                   |

ראו את [openapi.yaml](../openapi.yaml) לקבלת הסכמות המלאות.
