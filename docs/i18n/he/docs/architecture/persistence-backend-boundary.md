# ADR: Pluggable persistence boundary (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **סטטוס:** מוצע — נדרש אישור מתחזק לפני תחילת העבודה על זמן הריצה
- **סוגיית מעקב:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **היקף:** ארכיטקטורת התמדה בלבד; החלטה זו אינה מוסיפה או בוחרת מסד נתונים חיצוני

## הקשר

OmniRoute מציג כיום פונקציות התמדה מוכוונות-תחום מתוך `src/lib/db/`, בעוד שהחיבור המשותף המוחזר על ידי `src/lib/db/core.ts` מממש את החוזה הסינכרוני `SqliteAdapter` שב־`src/lib/db/adapters/types.ts`. מתאם זה תומך במספר סביבות זמן ריצה של SQLite, אך הממשק שלו נותר מעוצב לפי SQLite: הצהרות מוכנות סינכרוניות, `pragma`, טרנזקציות דחויות ומיידיות, גיבוי מקורי/באמצעות העתקת קובץ, נקודת ביקורת ומזהה מקומי של מסד הנתונים.

גם נתיב האתחול והשחזור הנוכחי מנהל את מחזור החיים של קובץ SQLite. הקובץ `src/lib/db/core.ts` מאתר את `storage.sqlite`, מתחזק מתאם גלובלי יחיד לתהליך, יוצר נקודות ביקורת של WAL, משמר טבלאות נבחרות במהלך שחזור ומסיר קבצים נלווים של SQLite בעת בנייה מחדש של מסד נתונים. בחירת מנהל ההתקן ב־`src/lib/db/adapters/driverFactory.ts` בוחרת מבין סביבות זמן הריצה הנתמכות של SQLite; היא אינה הפשטה עבור קצה עורפי חיצוני.

גם התפתחות הסכימה מצומדת באופן דומה. הקובץ `src/lib/db/migrationRunner.ts` מחיל קובצי SQL ממוספרים, בודק את `sqlite_master` ואת `PRAGMA table_info`, מזהה תמיכה אופציונלית ב־FTS5 ומריץ עבודות מיגרציה בתוך טרנזקציות SQLite. מודולים תפעוליים כגון `src/lib/db/backup.ts` ו־`src/lib/db/optimizationSettings.ts` משתמשים ישירות בסמנטיקה של גיבוי, `PRAGMA`, WAL, גודל דף, ריקון אוטומטי ו־`VACUUM`.

אלה מאפיינים תקפים של פריסת SQLite המשובצת. עליהם להישאר זמינים מבלי לאלץ את PostgreSQL או MySQL לחקות API של SQLite.

## החלטה

יש לאמץ גבול התמדה דו-רמתי עבור מצב עמיד ונייד:

1. **חוזי מאגר תחומיים** מגדירים את פעולות ההתמדה הנדרשות לקוד העסקי ולקוד הניתוב. הקוד הקורא תלוי בהתנהגות ובנתונים תחומיים, ולא בטקסט SQL, בהצהרות מוכנות, בקובצי מסד נתונים או באובייקטי ניב.
2. **חוזה אסינכרוני פנימי לקצה העורפי** תומך במימושי מאגרים באמצעות הקשרי טרנזקציות, תקינות/מוכנות, תיאום מיגרציות, יכולות קצה עורפי ושגיאות מסווגות. ממשק TypeScript המדויק יוצע במסגרת בקשת המשיכה הראשונה למימוש ויוכח באמצעות בדיקות תאימות; ADR זה אינו מקבע בכוונה API ספקולטיבי.

SQLite יישאר מימוש ברירת המחדל. שרשרת מנהלי ההתקנים הקיימת של SQLite וה־`SqliteAdapter` הסינכרוני יישארו מאחורי מימוש המאגר של SQLite, בזמן שהתחומים יועברו בפרוסות אנכיות קטנות. אף משתמש אינו נדרש להגדיר שירות חיצוני.

PostgreSQL הוא המימוש החיצוני הראשון המוצע לאחר שגבול המאגר יוכח מול SQLite. MySQL יתווסף לאחר מכן כמימוש מקביל מול אותה חבילת בדיקות תאימות, ולא כפיצול נוסף של הלוגיקה העסקית.

## כללי הגבול

### ממשק מאגר נייד

מאגר נייד רשאי לחשוף:

- קריאות וכתיבות תחומיות;
- פעולות אטומיות מפורשות וגישה למאגר בהקשר של טרנזקציה;
- פעולות השוואה/עדכון או חכירה כאשר סמנטיקת המקביליות היא חלק מהתחום;
- דפדוף, מיון ושגיאות אילוצים שאינם תלויים בקצה העורפי.

תקינות הקצה העורפי, מוכנותו ותיאום המיגרציות שייכים לחוזה הפנימי של הקצה העורפי/התפעול, ולא למאגרים תחומיים בודדים.

מאגר נייד אינו רשאי לחשוף:

- `prepare`, `get`, `all`, `run` או מזהים גולמיים של מנהל ההתקן;
- `PRAGMA`, מצבי נקודת ביקורת של WAL,‏ `VACUUM` או כוונון דפים/מטמון;
- נתיבי קבצים של SQLite, קבצים נלווים או גיבוי באמצעות העתקת קובץ;
- `lastInsertRowid` כחוזה תחומי חוצה-קצוות עורפיים;
- תחביר FTS5 או `sqlite-vec`;
- פתח מילוט גנרי לניב המשמש קוד עסקי רגיל.

### ממשק יכולות הקצה העורפי

התנהגות ייחודית לקצה עורפי נשארת מפורשת וניתנת לגילוי. תחזוקה המיועדת ל־SQLite בלבד נשארת מאחורי המימוש והממשק התפעולי שלה, לרבות:

- בחירת מנהל התקן בזמן ריצה;
- נקודת ביקורת של WAL והתנהגות הכיבוי של SQLite;
- הגדרות גודל דף, גודל מטמון וריקון אוטומטי;
- גיבוי, שחזור והתאוששות של קובץ מסד הנתונים;
- בחינה פנימית של סכמת SQLite;
- שילוב FTS5 ו־`sqlite-vec`.

קצה עורפי חיצוני אינו נדרש לחקות תכונות אלה. על המאגרים להשתמש ביכולת ניידת, לספק מימוש ייעודי לקצה העורפי עם התנהגות מתועדת, או לדווח שהיכולת אינה זמינה.

## מודל טרנזקציות ומיגרציות

ממשקי ה-API של המאגר מגדירים את הפעולה העסקית האטומית; הקוראים אינם בוחרים מצב טרנזקציית SQL.
כל פעולה חייבת להגדיר את הבטחות המקביליות הניתנות לצפייה שלה: אינווריאנטים מוגנים, זיהוי התנגשויות,
סיווג ניסיונות חוזרים, ציפיות לאידמפוטנטיות והעברת הקשר הטרנזקציה.
מימושים רשאים להשתמש במנגנוני טרנזקציה ובידוד שונים רק כאשר אותן הבטחות ניתנות לצפייה
נותרות שקולות. SQLite רשאי להמשיך להשתמש באופן פנימי בהתנהגות הטרנזקציות הנדחית או המיידית
הנוכחית שלו, כאשר היא עומדת בחוזה הפעולה.

מערכות backend חיצוניות דורשות בעלות מפורשת על מיגרציות, כדי שמספר רפליקות של היישום לא יתחרו
על אותו שינוי סכמה. היסטוריות מיגרציה של מערכות backend עשויות לחלוק אבני דרך לוגיות, אך אין להניח
שקובצי SQL של SQLite ניתנים להעברה או לשימוש חוזר בדיאלקט אחר.

## סמנטיקה של תאימות בין מערכות backend

בדיקות תאימות חייבות לכסות התנהגות, ולא רק את חתימות המתודות של המאגר. כל דומיין שעבר מיגרציה
חייב להגדיר ולאמת:

- אזור זמן, דיוק וסריאליזציה של חותמות זמן;
- ציפיות לגבי סדר `NULL`, כללי מיון ורגישות לאותיות רישיות וקטנות;
- ייצוג JSON והתנהגות השוואה;
- דיוק של מספרים שלמים, מספרים עשרוניים וערכים כספיים;
- סדר יציב וכללי הכרעה דטרמיניסטיים עבור עימוד;
- יצירת מזהים ללא הסתמכות על מזהי שורות של SQLite;
- סיווג הפרות ייחודיות ומפתחות זרים;
- התנהגות מספר השורות שהושפעו עבור פעולות ללא שינוי, השוואה/עדכון ומחיקה;
- תוצאות של כתיבה מקבילית, התנגשויות שניתן לנסות מחדש וניסיונות חוזרים אידמפוטנטיים.

אם דומיין אינו יכול להצהיר על סמנטיקה ניתנת לצפייה שקולה, הוא עדיין אינו נייד ועליו להישאר
ספציפי למערכת backend עד לתכנון חוזה זה.

## דרישות תאימות

כל מימוש העוקב אחר ADR זה חייב לשמר את המאפיינים הבאים:

- SQLite נשאר ברירת המחדל שאינה דורשת הגדרות.
- קובצי SQLite קיימים והיסטוריית המיגרציות נותרים קריאים.
- חלופות SQLite עבור npm, Electron, Docker וסביבות זמן ריצה מוגבלות שומרות על נתיב האתחול הנוכחי שלהן.
- פרטי הזדהות שמורים של ספקים ממשיכים להשתמש בהתנהגות ההצפנה הקיימת של היישום.
- מיגרציה של מאגר אינה משנה באופן סמוי סמנטיקה של ניתוב, מכסות, מפתחות API או ביקורת.
- התנהגות הגיבוי והשחזור מתועדת עבור כל מערכת backend בנפרד, במקום להיות מוצגת כאוניברסלית.
- התקנה נקייה המשתמשת ב-SQLite בלבד אינה טוענת או דורשת מנהל התקן של מסד נתונים חיצוני.

## סדר האספקה

1. פרסמו מלאי ניתן לשחזור של תלויות ב-SQLite כתוצר סקירה נפרד.
2. הציגו את חוזי המאגר ובדיקות התאימות של הדומיין הראשון.
3. התאימו את מימוש SQLite הקיים מאחורי חוזים אלה מבלי לשנות את ברירות המחדל.
4. בכפוף לאישור המתחזקים, הוסיפו את PostgreSQL כמימוש החיצוני הראשון עבור מקטע תחום מצומצם אחד
   של מישור הבקרה.
5. הרחיבו מצב משותף רק לאחר שקיימות בדיקות לכתיבה מקבילית ולבעלות על מיגרציות.
6. הוסיפו נתיב מיגרציה לא מקוון ומאומת מ-SQLite למערכת חיצונית לפני פרסום האפשרות להחלפת מסד נתונים.
7. הוסיפו את MySQL בהתאם לחוזי המאגר ומערכת ה-backend שהוכחו.

כל שלב בזמן הריצה הוא PR נפרד הניתן לסקירה. אין להשתמש בשלב מאוחר יותר כדי להצדיק מיזוג של
הפשטה שלא הוכחה בשלב מוקדם יותר.

## פלח המימוש הראשון

יש לבחור את פלח זמן הריצה הראשון לאחר סקירת מיפוי התלויות. חיבורי ספקים, מפתחות API, שילובים ותצורת ניתוב הם מועמדים, משום שטבלאות הבסיס שלהם גלויות ב-`src/lib/db/core.ts`, אך ADR זה אינו מאשר רשימת טבלאות או PR למיגרציה.
הפלח חייב לכלול:

- בדיקות לשימור ההתנהגות של SQLite;
- בדיקות תאימות של מאגרים;
- גבולות טרנזקציה מפורשים;
- אימות הצפנה והשחרה עבור פרטי הזדהות מאוחסנים;
- ללא שינוי בתצורת ברירת המחדל להפעלה.

## חלופות שנשקלו

### הוספת PostgreSQL מתחת ל-`SqliteAdapter`

נדחתה. `SqliteAdapter` היא שכבת תאימות לסביבות זמן ריצה של SQLite וחושפת פעולות ייחודיות ל-SQLite.
חיקוי הממשק הזה יזליג הנחות סינכרוניות ותלויות-דיאלקט אל תוך backend חדש.

### חשיפת API כללי לשאילתות/ביצוע לכל הדומיינים

נדחתה כגבול הראשי. היא תרכז את הטיפול בחיבורים, אך תשאיר את התלויות בדיאלקט SQL, בטרנזקציות ובטבלאות בתוך המודולים העסקיים. רכיב backend ברמה נמוכה עשוי להתקיים בתוך מימושי המאגרים, אך לא כ-API ההתמדה הפונה ליישום.

### כתיבה מחדש של כל שכבת ההתמדה לפני אימות של פלח אחד

נדחתה. משטח ההתמדה הנוכחי רחב וכולל את מחזור החיים של קבצים, שחזור, חיפוש והגדרות תפעוליות. פלחים אנכיים מספקים גבולות התנהגות וחזרה לאחור שניתנים לסקירה.

### החלפת SQLite כברירת המחדל

נדחתה. פריסות משובצות ופריסות שולחניות תלויות במודל ההפעלה הנוכחי שאינו דורש שירות. backend חיצוני הוא אופציונלי ודורש הצטרפות מפורשת.

### שימוש ב-Redis כמקור הסמכות המתמשך

נדחתה. Redis עשוי לתמוך בתיאום ארעי שהוגדר במפורש, במטמון או במונים, אך אינו מחליף את חוזה המאגר המתמשך המתואר כאן.

## השלכות

### חיוביות

- הקוד העסקי מקבל נקודת הפרדה יציבה להתמדה, שאינה תלויה בדיאלקט מסד הנתונים.
- התנהגות SQLite נבדקת לפני ש-backend חיצוני מגדיר את ההפשטה.
- PostgreSQL ו-MySQL חולקים חוזים ובדיקות במקום לשכפל לוגיקה תחומית.
- יכולות הייחודיות ל-SQLite נשארות יכולות מן המעלה הראשונה, במקום להפוך לשכבות תאימות דולפות.
- התנהגות מיגרציות וטרנזקציות בסביבה מרובת העתקים הופכת לשיקול תכנוני מפורש.

### עלויות וסיכונים

- חילוץ מאגרים מחייב מיגרציה הדרגתית של אתרי קריאה.
- גבולות אסינכרוניים עשויים להתפשט דרך קוד שירות שהוא כיום סינכרוני.
- סמנטיקה חוצת-backend מחייבת בדיקות תאימות מעבר לתאימות תחביר SQL.
- גיבוי, חיפוש, אחסון וקטורי ותחזוקה נותרים תלויי-יכולת.
- הפעלה של יותר ממימוש התמדה אחד מגדילה את עלויות ה-CI והתמיכה התפעולית.

## מטרות שאינן נכללות

ADR זה אינו:

- מוסיף תלות במסד נתונים, משתנה סביבה, סכמה או מיגרציה;
- משנה את מופע היחיד הפעיל של SQLite או את שרשרת הגיבוי של מנהלי ההתקן;
- מבטיח תמיכה ב-PostgreSQL או ב-MySQL בגרסה מסוימת;
- הופך את FTS5, את `sqlite-vec`, קובצי הגיבוי או את תחזוקת SQLite לניידים;
- מגדיר מוכנות ל-active-active לפני שקיימות בדיקות של מצב משותף ותיאום;
- מאשר כתיבה מחדש חד-פעמית של `src/lib/db/`.

## שאלות פתוחות לאישור המתחזק

1. האם מאגר הנתונים יחד עם גבול פנימי אסינכרוני לקצה העורפי הם הכיוון המועדף, או שמא
   יש למקם התמדה חיצונית מאחורי שירות נפרד של מישור הבקרה?
2. האם PostgreSQL מקובל כמימוש החיצוני הראשון לאחר אימות התאימות ל-SQLite?
3. איזה תחום צריך להיות הפלח התחום הראשון במאגר הנתונים?
4. איזה מצב חייב להיות משותף עבור אבן הדרך הראשונה של ריבוי רפליקות, ואיזה מצב יישאר מקומי לצומת?
5. איזה חלון תאימות נדרש עבור העברה של מאגר הנתונים שנקטעה או בוטלה?

עד ששאלות אלה ייפתרו, מסמך זה הוא בגדר הצעה בלבד, ולא משתמע ממנו כל ארגון מחדש של זמן הריצה.
