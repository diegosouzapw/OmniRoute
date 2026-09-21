# Developer environment notes (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

דף זה מסביר את אופן הפעולה של קובץ `.env` המקומי בפרויקט וכיצד לטפל בקובצי סביבה ובסודות בעת פיתוח OmniRoute.

## אופן הפעולה של .env לאחר ההתקנה

הפרויקט עשוי ליצור קובץ `.env` מקומי במהלך `npm install` / `postinstall` לנוחות המפתחים. קובץ זה מיועד לפיתוח ולבדיקות מקומיים בלבד, ולעולם אין להכניס אותו למערכת בקרת גרסאות.

נקודות עיקריות:

- קובץ `.gitignore` של המאגר כבר מתעלם מקובצי `.env*` (ראו את הרשומה ב-`.gitignore`). אין להסיר או לשנות כלל זה, אלא אם בכוונתכם המפורשת להכניס קובץ דוגמה מסוים למאגר ויש עבורו תהליך מתועד.
- אם סוד אמיתי הוכנס בטעות למאגר, יש לבצע מיד רוטציה או ביטול של פרטי הגישה ולהסיר אותם מהיסטוריית המאגר (לדוגמה, באמצעות `git filter-repo` או תהליך תיקון מקביל). אם אתם זקוקים לעזרה, פנו לאחראי האבטחה או לאיש הקשר המתאים.
- עבור CI וסביבת ייצור, השתמשו בסודות של CI או במנהל סודות (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault וכו׳), במקום להכניס סודות לקבצים במאגר.

## תהליך עבודה מקומי מומלץ

- שמרו את `.env` בסביבת העבודה המקומית בלבד. השתמשו ב-`.env.example` (שכבר נמצא במעקב) כדי לתעד משתנים נדרשים וערכי דוגמה מקובלים.
- בעת הרצת בדיקות מקומיות הדורשות ערכים דמויי סוד, העדיפו מצייני מקום סינתטיים או מפתחות זמניים שנוצרים בזמן הריצה, במקום פרטי גישה אמיתיים.
- הוסיפו הערה קצרה בבדיקות המשתמשות במצייני מקום, כדי שהסוקרים יבינו שנתוני הבדיקה סינתטיים.

## הערות לגבי סורקים

- נכסים מהודרים או בינאריים מסוימים (למשל, גושי WASM מוטמעים בקידוד base64) עשויים להכיל תת-מחרוזות ASCII שנראות כמו פרטי גישה ולהפעיל סורקי סודות מבוססי טקסט. אם נכסים אלה לגיטימיים, הוסיפו אותם לרשימת ההחרגות של הסורק או החריגו את הספריות המתאימות בתצורת הסורק.

## אם גיליתם דליפה

1. בצעו מיד רוטציה או ביטול של המפתח.
2. הסירו את הסוד מההיסטוריה ובמידת הצורך בצעו דחיפה כפויה של ענף נקי.
3. הודיעו למתחזקים ופעלו בהתאם לרשימת הבדיקה של הארגון שלכם לטיפול בתקריות.
