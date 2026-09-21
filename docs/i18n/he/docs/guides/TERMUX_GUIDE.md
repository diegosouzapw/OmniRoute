# Termux Headless Setup (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

ניתן להריץ את OmniRoute כשרת ללא ממשק גרפי ב-Android באמצעות Termux. יישום שולחן העבודה Electron אינו נתמך ב-Termux, אך לוח הבקרה בדפדפן וה-API התואם ל-OpenAI פועלים מהדפדפן המקומי או ממכשירים אחרים באותה רשת.

## דרישות מוקדמות

התקינו את Termux מ-F-Droid או ממהדורות GitHub, ולאחר מכן עדכנו את החבילות והתקינו את כלי הבנייה הנדרשים לתלויות מקוריות כגון `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **גרסת Node.js:** OmniRoute דורש Node `>=22.22.2 <23 || >=24.0.0 <27` (תואם ל-`engines` בתוך `package.json` / `SUPPORTED_NODE_RANGE`). החבילה `nodejs-lts` של Termux כוללת בדרך כלל את Node 20 LTS, ש**אינו נתמך עוד** — התקינו במקום זאת את `pkg install nodejs` (הגרסה הנוכחית) וודאו שהפקודה `node --version` מציגה גרסה מסדרת 22.x/24.x ומעלה.

אם הידור של חבילה מקורית נכשל, הפעילו שוב את פקודת `pkg install` שלעיל ולאחר מכן נסו שוב להתקין את OmniRoute.

## התקנה

הפעילו ישירות את החבילה האחרונה שפורסמה:

```bash
npx -y omniroute@latest
```

ניתן גם להתקין אותה באופן גלובלי:

```bash
npm install -g omniroute
omniroute
```

## הפעלה

הפעילו את OmniRoute במצב שרת ללא ממשק גרפי:

```bash
omniroute
```

או:

```bash
npx omniroute
```

לוח הבקרה מאזין בכתובת:

```text
http://localhost:20128
```

פתחו כתובת URL זו בדפדפן של Android. אם אתם מריצים לקוחות בתוך Termux, השתמשו באותו מארח ובאותה יציאה ככתובת ה-URL הבסיסית התואמת ל-OpenAI.

## הפעלה ברקע

עבור תהליך רקע פשוט:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

כדי לעצור אותו:

```bash
pkill -f omniroute
```

להפעלה אוטומטית לאחר אתחול המכשיר, התקינו את התוסף Termux:Boot וצרו סקריפט אתחול:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

מיטוב הסוללה של Android עלול לעצור תהליכי רקע שפועלים לאורך זמן. השביתו את מיטוב הסוללה עבור Termux אם השרת אמור להישאר מקוון.

## גישה ממכשירים אחרים

מצאו את כתובת ה-IP של הטלפון ברשת ה-WiFi:

```bash
ip addr show wlan0
```

לאחר מכן פתחו את לוח הבקרה ממכשיר אחר:

```text
http://PHONE_IP:20128
```

לדוגמה:

```text
http://192.168.1.50:20128
```

השאירו את הטלפון ואת הלקוח באותה רשת מהימנה. אם אתם חושפים את OmniRoute מחוץ לטלפון, הפעילו מפתחות API ואימות ללוח הבקרה.

## ספריית נתונים

כברירת מחדל, OmniRoute מאחסן נתונים תחת ספריית הבית של Termux, בהתאם לאותה התנהגות של נתיב הנתונים בצד השרת המשמשת ב-Linux. כדי למקם את מסד הנתונים במיקום מפורש:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## מגבלות

- Electron אינו פועל ב-Termux.
- אין מגש מערכת או שילוב עם שולחן העבודה.
- תצורה זו מיועדת לשרת בלבד: השתמשו בלוח הבקרה בדפדפן.
- ייתכן שתלויות מקוריות ידרשו הידור מקומי.
- ייתכן שבמכשירי Android עם מעט זיכרון יהיה צורך להפחית את מספר הבקשות המקבילות.
- תכונות MITM/אישורי מערכת עשויות לדרוש עבודה ברמת מאגר האישורים של Android מחוץ ל-Termux.

## פתרון בעיות

### פלטפורמה לא נתמכת: android (כל בקשה מחזירה HTTP 500)

**תסמין:** `omniroute` / `omniroute serve` מציג `✔ OmniRoute is running!`, אך כל בקשה ללוח הבקרה או ל-API מחזירה `500 Internal Server Error` ללא פרטים נוספים. הקובץ `~/.omniroute/logs/application/app.log` נשאר ריק, `APP_LOG_LEVEL=debug` אינו מציג דבר שימושי, וגוף התגובה הוא טקסט רגיל (`Internal Server Error`) ללא פרטי JSON.

**סיבה:** חלק מבניות Termux/Node מדווחות על `process.platform === "android"`. הפונקציה `getCacheDirectory()` של Next.js אינה מטפלת בפלטפורמה זו: היא דורשת ש-`~/.cache` (או ספריית tmp כללית) _כבר_ תהיה קיימת, אחרת היא נכשלת בעת טעינת וו המכשור עם:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

מכיוון שהוו לעולם אינו נטען, הרישום לעולם אינו מתחיל — לכן שגיאת ה-500 נראית בלתי ניתנת לאבחון לחלוטין. OmniRoute יוצר את `~/.cache` (ומגדיר את `XDG_CACHE_HOME` כאשר הוא אינו מוגדר) בנקודת הכניסה של ה-CLI לפני הפעלת Next.js, כדי שבדיקה זו תצליח ב-Android/Termux.

**פתרון נתמך (ללא תיקון החבילה):**

```bash
mkdir -p ~/.cache
omniroute serve
```

בבניות הנוכחיות של OmniRoute, ה-CLI מבצע זאת אוטומטית ב-Android/Termux — התקנה חדשה באמצעות `npx -y omniroute@latest` / התקנה גלובלית אינה אמורה לדרוש את השלב הידני. אם אתם עדיין רואים את השגיאה לאחר השדרוג, צרו את `~/.cache` פעם אחת כפי שמוצג לעיל והפעילו מחדש.

**אל** תשנו את `dist/server.js` כדי לכפות `process.platform = "linux"`. תיקון מסוג זה לחבילה נדרס בכל התקנה מחדש/שדרוג ואינו נחוץ לאחר שספריית המטמון קיימת.

### שגיאות בנייה של better-sqlite3

התקינו את שרשרת כלי הבנייה של Termux:

```bash
pkg install nodejs python build-essential
```

לאחר מכן הפעילו שוב:

```bash
npx -y omniroute@latest
```

### היציאה כבר בשימוש

בדקו מה מאזין ביציאת ברירת המחדל:

```bash
ss -ltnp | grep 20128
```

עצרו את התהליך הישן:

```bash
pkill -f omniroute
```

### לא ניתן להגיע ללוח הבקרה ממכשיר אחר

ודאו ששני המכשירים נמצאים באותה רשת WiFi, ולאחר מכן בדקו מתוך Termux:

```bash
curl http://localhost:20128
```

אם הגישה המקומית פועלת אך הגישה דרך ה-LAN אינה פועלת, בדקו את הגדרות הבידוד של הנקודה החמה/WiFi ב-Android וכל פרופיל חומת אש או VPN בטלפון.
