# 🗜️ Prompt Compression Guide — OmniRoute (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> חסכו אוטומטית 15-95% מהטוקנים המתאימים בהקשר. לסקירה מהירה, עיינו ב[סעיף הדחיסה ב-README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## סקירה כללית

OmniRoute מממש צינור מודולרי לדחיסת פרומפטים, שפועל **באופן יזום** לפני שהבקשות מגיעות לספקים במעלה הזרם. פירוש הדבר שהחיסכון בטוקנים מתרחש באופן שקוף — ללא צורך בשינויים בתהליך העבודה שלכם.

```
בקשת לקוח
  → בורר אסטרטגיית דחיסה
    → קיימת דריסה באמצעות שילוב? → שימוש בהגדרת השילוב
    → סף הפעלה אוטומטית? → שימוש במצב אוטומטי
    → מצב ברירת מחדל? → שימוש בהגדרה הגלובלית
    → כבוי? → דילוג על הדחיסה
  → מצב הדחיסה שנבחר
    → כבוי: ללא דחיסה
    → קל: ניקוי בטוח של רווחים/עיצוב (~15%)
    → רגיל: הסרת מילות מילוי בניסוח טלגרפי (~30%)
    → אגרסיבי: יישון היסטוריה + סיכום (~50%)
    → אולטרה: גיזום היוריסטי + דילול בלוקי קוד (~75%)
    → RTK: סינון פלט מסוף/כלים המודע לפקודות (טווח של 60-90% במעלה הזרם)
    → מוערם: צינור מרובה מנועים לפי סדר, בדרך כלל RTK ולאחר מכן Caveman (טווח מתאים של 78-95%)
  → בקשה דחוסה → ספק
```

---

## מצבי דחיסה

### כבוי

לא מתבצעת דחיסה. כל ההודעות מועברות ללא שינוי.

### מצב קל (חיסכון של ~15%, השהיה של <1ms)

המצב הבטוח ביותר — ללא שינוי סמנטי, רק ניקוי עיצוב:

| שיטה                     | תיאור                                         |
| ------------------------ | --------------------------------------------- |
| `collapseWhitespace`     | מיזוג שורות ריקות רצופות ורווחים בסופי שורות  |
| `dedupSystemPrompt`      | הסרת הודעות מערכת כפולות                      |
| `compressToolResults`    | דחיסת פלטים מפורטים של כלים/פונקציות          |
| `removeRedundantContent` | הסרת הוראות חוזרות                            |
| `replaceImageUrls`       | קיצור כתובות URI של נתוני תמונה בקידוד base64 |

**מתאים במיוחד עבור:** שימוש קבוע, תהליכי עבודה קריטיים לבטיחות.

### מצב רגיל (חיסכון של ~30%)

בהשראת [Caveman](https://github.com/JuliusBrussee/caveman) — מסיר מילות מילוי וניסוחים ארכניים תוך שמירה על המשמעות:

- מסיר מילות מילוי ("בבקשה", "אני חושב", "בעיקרון", "למעשה")
- מתמצת ביטויים ארכניים ("כדי לבצע" → "כדי", "כתוצאה מכך ש-" → "כי")
- מסיר ניסוחי הסתייגות מנומסים ("האם יהיה אכפת לך...", "אם תוכל אולי...")
- יותר מ-30 כללי ביטויים רגולריים שהותאמו לפרומפטים של תכנות

**מתאים במיוחד עבור:** תהליכי פיתוח יומיומיים, צוותים המודעים לעלויות.

### מצב אגרסיבי (חיסכון של ~50%)

ניהול חכם של ההיסטוריה עבור הפעלות ארוכות:

- **יישון הודעות** — הודעות ישנות יותר נדחסות בהדרגה
- **סיכום תוצאות כלים** — פלטים ארוכים של כלים מוחלפים בסיכומים
- **מנגנוני הגנה על שלמות מבנית** — מבטיחים שצמדי `tool_use` + `tool_result` יישארו עקביים
- **מודעות לחלון ההקשר** — מכבדת את מגבלות הטוקנים של כל מודל

**מתאים במיוחד עבור:** הפעלות ניפוי שגיאות ממושכות, בסיסי קוד גדולים.

### מצב אולטרה (חיסכון של ~75%)

דחיסה מרבית עבור תרחישים שבהם הטוקנים קריטיים:

- **גיזום היוריסטי** — מסיר הודעות שנמצאות מתחת לסף הרלוונטיות
- **דילול בלוקי קוד** — דוחס דוגמאות קוד חוזרות
- **קיטוע באמצעות חיפוש בינארי** — מוצא את נקודת החיתוך המיטבית עבור חלון ההקשר
- כולל את כל התכונות של המצב האגרסיבי

**מתאים במיוחד עבור:** מקרים שבהם אתם מגיעים שוב ושוב למגבלות ההקשר.

### מצב RTK (טווח של 60-90% במעלה הזרם)

מצב RTK ממוטב לפלטים מפורטים של כלים, המופיעים בהפעלות של סוכני תכנות:

- מזהה מחלקות של פקודות/פלטים, כגון `git status`,‏ `git diff`,‏ `git log`, מריצי בדיקות,
  תהליכי בנייה של TypeScript/Vite/Webpack,‏ ESLint/Biome/Prettier, ביקורות/התקנות של npm, יומני Docker, פלט
  תשתית ופלט מעטפת כללי
- מחיל חבילות מסנני JSON מתוך `open-sse/services/compression/engines/rtk/filters/`
- מייבא מסננים של סכימת RTK TOML v1 מקובצי `filters.toml` של הפרויקט או מקבצים גלובליים, עם אימות
  בדיקות מוטבעות ושער אמון עבור קובצי פרויקט
- כולל 49 מסננים מובנים עם דוגמאות אימות מוטבעות
- מסיר רצפי בקרה של ANSI, סרגלי התקדמות, שורות חוזרות ורעש שאינו בר-פעולה
- משמר כשלים, שגיאות, אזהרות, קבצים שהשתנו, סיכומים ואת הקצה האחרון של פלט ארוך
- תומך במסנני פרויקט מוגני-אמון, במסננים גלובליים ובשחזור אופציונלי ומושחר של הפלט הגולמי

**מתאים במיוחד עבור:** הפעלות סוכן הכוללות תמלילים של מעטפת, בנייה, בדיקות, git,‏ grep ופלטי קבצים.

### מצב מוערם (טווח מתאים של 78-95%)

מצב מוערם מריץ מספר מנועי דחיסה בסדר דטרמיניסטי. צינור ברירת המחדל הוא:

```txt
RTK -> Caveman
```

סדר זה דוחס תחילה את פלט המסוף/הכלים, ולאחר מכן מחיל את התמצות הסמנטי של Caveman על
שאר הפרומפט בשפה טבעית. ניתן להגדיר צינורות מוערמים באופן גלובלי או באמצעות
שילובי דחיסה המוקצים לשילובי ניתוב.

**מתאים במיוחד עבור:** הקשר מעורב הכולל יומני כלים גדולים לצד הוראות אנושיות או סיכומי עוזר.

---

## חישוב החיסכון במעלה הזרם

OmniRoute מתעדת חיסכון באמצעות דחיסה משני מקורות: מדדי ביצועים של פרויקטים במעלה הזרם והרכבת המנועים של
OmniRoute עצמה.

| מקור    | הנתון מה-README במעלה הזרם שבו נעשה שימוש כאן                                                                     |
| ------- | ----------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` פחות אסימוני פלט, חיסכון ממוצע של `65%` בפלט במדדי ביצועים, טווח של `22-87%` וכלי לדחיסת קלט בשיעור `~46%` |
| RTK     | חיסכון של `60-90%` בפלט פקודות; הפעלה לדוגמה של `~118,000 -> ~23,900` אסימונים, כלומר חיסכון של `79.7%` (`~80%`)  |

עבור מטעני כלים/הקשר חופפים, שילוב ברירת המחדל של OmniRoute מערים את המנועים:

```txt
RTK -> Caveman
```

החיסכון המשולב הוא כופלי, לא חיבורי:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

הנתון `78-95%` חל כאשר גם RTK וגם Caveman יכולים לצמצם את אותו מטען קלט/הקשר.
מצב פלט התגובה של Caveman הוא נפרד: כאשר הוא מופעל, יש להשתמש בנתוני החיסכון בפלט של Caveman (ממוצע של `65%`,
נתון מוביל של `~75%`, טווח של `22-87%`). החיסכון הכולל בחיוב תלוי בתמהיל הקלט/פלט שלכם.

### מה המשמעות בפועל של "מתאים"

הטווח המוביל של 15-95% הוא אמיתי, אך הוא חל רק על תוכן **מיותר או מפורט יתר על המידה** — שורות
שגיאה חוזרות, יומן בנייה שמציף שוב ושוב את אותה אזהרה, פלט גדול מדי של `grep`/קריאת קובץ. אין
פירוש הדבר שכל בקשה חוסכת בשיעור כזה.

אומת אמפירית (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): הפעלת
`stacked` (RTK + Caveman) מול בלוק `tool_result` במבנה Anthropic שהכיל 300 שורות
שגיאה זהות הניבה **חיסכון של 95.93% באסימונים / חיסכון של 96.26% בתווים** — בדיוק בטווח
המפורסם. עם זאת, כאשר אותו צינור עיבוד מופעל על פלט כלים רגיל ולא מיותר (רשימת התאמות נקייה של `grep`,
קריאת קובץ קצרה, טקסט שיחתי רגיל), הוא מפיק בצדק **חיסכון כמעט אפסי**, משום
שאין תוכן חזרתי להסרה ו-`validateCompression()` (`validation.ts`) מסרבת להעביר
שכתוב שעלול להשמיט או לשנות בלוקי קוד, כתובות URL, כותרות, גרסאות או מזהי קבועים שכתובים באותיות רישיות בלבד.

זוהי התנהגות צפויה ובטוחה, ולא באג: סשן כתיבת קוד שעוסק בעיקר בקריאה/חיפוש באמצעות grep בקבצים נקיים
יציג חיסכון כולל מתון, גם כאשר הדחיסה מופעלת במלואה, בעוד שסשן שנתקל בלולאה כושלת
או בכלי lint פטפטני יציג את מלוא טווח ה-78-95% עבור התעבורה הזו. אין להשתמש באחוז החיסכון
המצטבר הנמוך של סשן יחיד כהוכחה לכך שהדחיסה מוגדרת באופן שגוי — ראשית יש לבדוק אם
פלט הכלי הבסיסי אכן היה מיותר.

---

## המחשת החיסכון באסימונים

```
ללא דחיסה:           47K אסימונים נשלחו ל-LLM
עם Lite:             40K אסימונים נשלחו          (חיסכון של 15% — בטוח, פעיל תמיד)
עם Standard:         33K אסימונים נשלחו          (חיסכון של 30% — כללי דיבור Caveman)
עם Aggressive:       24K אסימונים נשלחו          (חיסכון של 50% — התיישנות + סיכום)
עם Ultra:            12K אסימונים נשלחו          (חיסכון של 75% — גיזום היוריסטי)
עם RTK:              19K-5K אסימונים נשלחו       (חיסכון של 60-90% בפלט פקודות/כלים)
עם Stacked:          10K-2.5K אסימונים נשלחו     (טווח מתאים של 78-95% עבור RTK+Caveman)
```

---

## הגדרות

### Dashboard

נווט אל `Dashboard → Context & Cache`:

- **Caveman** — בחירת מצב, חבילות שפה, תצוגה מקדימה וברירות מחדל גלובליות
- **RTK** — תצוגה מקדימה של מסנני פקודות, הגדרות בטיחות RTK וקטלוג מסננים
- **Compression Combos** — צינורות עיבוד (pipelines) של מנועים בעלי שם המשויכים לשילובי ניתוב (routing combos)
- **Auto-Trigger Threshold** — הפעלה אוטומטית של דחיסה כאשר מספר הטוקנים חורג מהסף

### דריסה לפי שילוב (Per-Combo Override)

ב-`Dashboard → Context & Cache → Compression Combos`, שייך שילוב דחיסה (compression combo) לשילוב ניתוב (routing combo):

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

זה מאפשר להשתמש ב-stacked compression בספקי חינם/קוד תוך שמירה על מצב lite במנויים בתשלום.

הקצאת "Per-Combo Override" זו היא בקר שונה מדריסת **מצב דחיסת שילוב-ניתוב (routing-combo compression mode)**‏ (Default/Off/Lite/Standard/Aggressive/Ultra) — דריסה זו אינה בוחרת צינור עיבוד compression-combo בעל שם; היא רק מגדירה את השדה `compressionMode` שבו נעזר `resolveCompressionPlan`. ניתן להגדיר זאת בכרטיס השילוב (`Dashboard → Combos`) או, החל מ-#6760, לכל שילוב ניתוב ברשימת "Assign to routing" ב-`Dashboard → Context & Cache → Compression Combos`, ממש ליד תיבת הסימון של הקצאת ה-pipeline שתועדה לעיל. שני הממשקים נשמרים דרך אותו endpoint של `PUT /api/combos/{id}`.

### דריסה לפי בקשה (Per-request override)

שלח את ה-request header בשם `x-omniroute-compression` כדי לדרוס את תוכנית הדחיסה עבור בקשה בודדת. יש לו את הקדימות הגבוהה ביותר — הוא גובר על דריסת שילוב-הניתוב, הפרופיל הפעיל, ה-auto-trigger וברירת המחדל (Default) של הפאנל. ערכים לא ידועים זוכים להתעלמות (הבקשה לעולם אינה נדחית) והמתג הראשי הגלובלי עדיין שולט על הכל: כאשר הדחיסה כבויה גלובלית, ה-header לא יכול להפעיל אותה. ערכים:

| ערך           | השפעה                                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| `off`         | ללא דחיסה עבור בקשה זו.                                                                                  |
| `default`     | פרופיל ה-Default הנגזר מהפאנל (מתעלם מהפרופיל הפעיל). מנועים מאבדי נתונים (Lossy engines) נשארים כבויים. |
| `safe`        | זהה להשמטת ה-header: ‏session dedup ו-whitespace folding בלבד.                                           |
| `allow-lossy` | שמור על תוכנית המפעיל של בקשה זו, כולל סיכומים, מסנני רלוונטיות ושכתוב סגנון.                            |
| `engine:<id>` | מנוע בודד כאשר הוא מופעל, לדוגמה `engine:rtk`. זוהי בחירה (opt-in) לפי בקשה עבור אותו מנוע.              |
| `<combo>`     | שילוב בעל שם, מותאם לפי שם (ללא רגישות לאותיות גדולות/קטנות) תחילה, ולאחר מכן לפי id.                    |

ללא `allow-lossy`, ‏`engine:<id>`, או שילוב בעל שם, מנועים מאבדי נתונים לא יופעלו. הבקשה עדיין תעבור session dedup ו-whitespace folding כאשר הדחיסה מופעלת.

התוכנית שהוחלה מוחזרת ב-response header בשם `X-OmniRoute-Compression: <mode>; source=<source>`, כאשר `<source>` הוא אחד מ: `request-header`, ‏`routing-override`, ‏`active-profile`, ‏`auto-trigger`, ‏`default`, או `off`.

### API

```bash
# קבלת הגדרות דחיסה
curl http://localhost:20128/api/settings/compression

# עדכון הגדרות דחיסה
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# תצוגה מקדימה של מטען (payload) ספציפי של RTK/stacked
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"פלט של npm test כאן"}]}'

# רשימת חבילות מסנני RTK
curl http://localhost:20128/api/context/rtk/filters

# בדיקת RTK ישירות עם מטא-דאטה אופציונלי של פקודה
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## מה מוגן

מנוע הדחיסה **תמיד משמר:**

- ✅ בלוקי קוד (מגודרים ובשורה)
- ✅ כתובות URL ונתיבי קבצים
- ✅ מבני JSON ונתונים מובְנים
- ✅ מזהים ואסימונים טכניים מוגנים
- ✅ ביטויים מתמטיים
- ✅ הגדרות של קריאות לכלים/פונקציות
- ✅ הנחיות מערכת (במצב Lite)

שחזור הפלט הגולמי של RTK משחיר מפתחות API נפוצים, אסימוני bearer, אסימוני Slack, מפתחות גישה של AWS,
סיסמאות, אסימונים וסודות לפני שמידע כלשהו נשמר.

---

## נתוני דחיסה

כל בקשה דחוסה כוללת נתונים ביומני השרת:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## מפת דרכים לשלבים

| שלב    | מצבים                                                                                                                                | סטטוס   |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| שלב 1  | כבוי, קל                                                                                                                             | ✅ נשלח |
| שלב 2  | רגיל, אגרסיבי, אולטרה                                                                                                                | ✅ נשלח |
| שלב 3  | RTK, מוערם, שילובי דחיסה                                                                                                             | ✅ נשלח |
| שלב 4  | סגנונות פלט, אולטרה ברמת SLM, רתמת הערכה                                                                                             | ✅ נשלח |
| שלב 4C | תקציב הקשר אדפטיבי ("חוגה") — מנוע חישוב + API (`contextBudget` ב-`PUT /api/settings/compression`) + בקרות מצב/מדיניות בלוח המחוונים | ✅ נשלח |

---

## תודות

כללי הדחיסה של מצב Standard מבוססים על השראה מ-**[Caveman](https://github.com/JuliusBrussee/caveman)** מאת **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — הפרויקט הוויראלי "למה להשתמש בהרבה אסימונים כשמעט אסימונים עושים את העבודה". Caveman מדווח על `~75%` פחות אסימוני פלט, חיסכון ממוצע של `65%` בפלט במדדי ביצועים, טווח חיסכון בפלט של `22-87%` וכלי לדחיסת קלט בשיעור של `~46%`.

מצב RTK מבוסס על השראה מ-**[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** מאת **[RTK AI](https://github.com/rtk-ai)** — פרויקט עתיר ביצועים לדחיסת פלט פקודות עבור מסוף, בנייה, בדיקות, git וסינון פלט כלים. RTK מדווח על חיסכון של `60-90%`, כאשר סשן הדוגמה ב-README שלו מציג חיסכון של `~80%`.

---

## מערכות דחיסה מתקדמות

מעבר ל-7 המצבים הסטנדרטיים, OmniRoute כוללת מספר מערכות דחיסה מתקדמות הפועלות אוטומטית בהתאם להקשר.

### דחיסה מודעת מטמון

חלק מהספקים (כמו Anthropic עם שמירת מטמון של הנחיות) תומכים ב**שמירת מטמון של הנחיות (prompt caching)**, המאפשרת להם לשמור במטמון חלקים מההנחיה כדי להפחית עלויות והשהיה. כאשר שמירת מטמון מופעלת, דחיסה אגרסיבית עלולה למעשה **לפגוע** בביצועים מכיוון שהיא משנה את האסימונים השמורים במטמון, ובכך מבטלת את תוקף המטמון.

מודול `cachingAware.ts` פותר זאת על ידי **זיהוי הקשר שמירת מטמון** ו**התאמת אסטרטגיית הדחיסה** בהתאם.

#### איך זה עובד

1. **זיהוי הקשר שמירת מטמון** — סורק את גוף הבקשה עבור סמני `cache_control`.
2. **זיהוי ספקי שמירת מטמון** — בודק אם ספק היעד תומך בשמירת מטמון.
3. **התאמת אסטרטגיה** — מוריד את הדירוג של `aggressive`/`ultra` ל-`standard` עבור ספקי שמירת מטמון.
4. **דילוג על הנחיית מערכת** — הנחיות מערכת נשמרות בדרך כלל במטמון, לכן אין לדחוס אותן.
5. **שימוש בטרנספורמציות דטרמיניסטיות** — משתמש רק בטרנספורמציות המפיקות פלט עקבי.

#### דוגמת קוד

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← סמן מטמון
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### מתי להשתמש

דחיסה מודעת מטמון **תמיד מופעלת** — אין צורך בתצורה. היא נכנסת לפעולה רק כאשר:

- לבקשה יש סמני `cache_control`.
- ספק היעד תומך בשמירת מטמון של הנחיות (Anthropic, OpenAI וכו').

### הזדקנות פרוגרסיבית

שיחות ארוכות צוברות פניות רבות, אך פניות ישנות יותר הופכות פחות רלוונטיות. מודול `progressiveAging.ts` **מדרג הודעות לפי מרחק פנייה**:

- **פניות אחרונות (0-3)**: נשמרות כלשונן (פרטים מלאים).
- **פניות בינוניות (4-8)**: דחיסה קלה (רווחים לבנים, ניקוי עיצוב).
- **פניות ישנות (9+)**: דחיסת "איש מערות" (הסרת מילוי, סיכום).
- **פניות ישנות מאוד (20+)**: מסוכמות בכבדות או מושמטות.

#### דוגמת קוד

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 פניות נוספות ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 3 הפניות הראשונות: כלשונן
  light: 8, // פניות 4-8: דחיסה קלה
  moderate: 20, // פניות 9-20: דחיסת איש מערות
  // פניות 21+: סיכום כבד
});

// saved = מספר האסימונים שנשמרו
```

#### מתי להשתמש

הזדקנות פרוגרסיבית **תמיד מופעלת** עבור מצבי `aggressive` ו-`ultra`. היא יעילה במיוחד עבור:

- סשנים ארוכים של קידוד.
- שיחות מרובות ימים.
- זרימות עבודה מבוססות סוכנים עם קריאות כלים רבות.

### מצב פלט "איש מערות"

מודול `outputMode.ts` מחדיר **הוראות הנחיית מערכת** כדי לגרום למודל עצמו להפיק פלט דחוס ותמציתי (סגנון "איש מערות").

#### איך זה עובד

במקום לדחוס את הקלט, מצב זה מוסיף הנחיית מערכת כגון:

> "השב במילים מינימליות. דלג על נימוסים. השתמש במשפטים קצרים."

זה עובד היטב במיוחד עבור:

- יצירת קוד (פלט תמציתי יותר = פחות אסימונים).
- שאלות ותשובות מהירות (אין צורך בהסברים מפורטים).
- עיבוד אצווה (מקסום תפוקה).

#### מתי להשתמש

מצב פלט "איש מערות" הוא **אופציונלי** — הגדר אותו באמצעות תצורת הקומבו:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### סגנונות פלט (קטלוג)

מצב פלט "איש מערות" לעיל הוא **הנתיב הישן של סגנון יחיד**. שלב 4 הרחיב אותו לקטלוג של סגנונות פלט ניתנים להרכבה: `OUTPUT_STYLE_CATALOG` ב-`open-sse/services/compression/outputStyles/catalog.ts`. כל סגנון הוא הוראת הנחיית מערכת שגורמת למודל עצמו להפיק פלט זול יותר; ניתן להפעיל סגנונות יחד והם מוחדרים לפי סדר הקטלוג.

| סגנון                     | `id`          | מה הוא עושה                                                                                                                                                                                   | שפות הוראה                                              |
| :------------------------ | :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| פרוזה תמציתית             | `terse-prose` | משמיט מילים מיותרות/מילות יחס/הסתייגויות; שומר על מהות טכנית מדויקת. אותו טקסט כמו מצב הפלט הישן של "איש המערות" (מופנה, לא מוקלד מחדש).                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi           |
| פחות קוד                  | `less-code`   | סולם YAGNI: השינוי הקטן ביותר שעובד, ללא הפשטות לא מבוקשות.                                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi           |
| קוקו (מפתח בכיר עצלן)     | `ponytail`    | "הקוד הטוב ביותר הוא הקוד שמעולם לא נכתב": שימוש חוזר > כתיבה מחדש, שורש הבעיה > סימפטום, ההבדל הקצר ביותר שעובד.                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi           |
| יש לי ADHD (פעולה-ראשונה) | `i-have-adhd` | פעולה ראשונה (פקודה/נתיב/קטע קוד לפני פרוזה), שלבים ממוספרים ומוגבלים, צעד קונקרטי אחד הבא, ללא הקדמה/סיכום/סגירה. מותאם מ-[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi           |
| CJK תמציתי (文言)         | `terse-cjk`   | סגנון אולטרה-תמציתי של סינית קלאסית.                                                                                                                                                          | zh (מוגבל לפי אזור: מוצע רק כאשר השפה המוגדרת היא `zh`) |

כל סגנון מגיע עם שלוש רמות עוצמה — `lite`, `full`, `ultra` — וכל רמה
מסתיים בסעיף הגבולות המשותף, השומר על בלוקי קוד, נתיבי קבצים, פקודות,
מחרוזות שגיאה, כתובות URL ומזהים כפי שהם.

#### איך ההזרקה עובדת

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) פותר
את הבחירה מול הקטלוג (מזהים לא ידועים וסגנונות שאינם תואמים לאזור
נשמטים, לעולם לא שגיאה), משרשר את ההוראות שנבחרו בסדר הקטלוג,
מצרף את סעיף הגבולות **פעם אחת**, ומקדים את התוצאה לתוך ה-system
prompt מאחורי סמן אידמפוטנטיות יחיד (`[OmniRoute Output Styles]`) — יישום
חוזר הוא פעולה ריקה. כאשר לשפת הבקשה המזוהה יש תרגום,
ההוראה המקומית מוזרקת במקום אנגלית.

#### איך להפעיל

במרכז השליטה: **Context → Settings → Compression** — שורה אחת לכל סגנון עם
מתג הפעלה/כיבוי ובורר רמה. באופן תכנותי, תצורת הדחיסה שומרת
את הבחירה כ:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

תאימות לאחור: הגדרת הקומבו הישנה `outputMode: "caveman"` עדיין עובדת וממופה ל-
`terse-prose`, זהה בבתים להזרקה הישנה בכל שפה ישנה.

בחירת שפה: כאשר `languageConfig.enabled` מופעל, `autoDetect` בוחר את
שפת ההודעה האחרונה של המשתמש (אותו מזהה כמו מנועי הקלט);
כיבוי `autoDetect` מקבע את `defaultLanguage`. כבוי ← אנגלית.

מטריצת הסגנון × שפה מקובעת על ידי
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: סגנון חדש אינו יכול להישלח
ללא לפחות תרגום ל-pt-BR (או חריגה מפורשת במעקב), וסגנון
קיים אינו יכול לאבד שפה מקומית בשקט. כדי להוסיף סגנון, ראה
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### דחיסת תוצאות כלי עבודה

מודול `toolResultCompressor.ts` מספק **5 אסטרטגיות דחיסה מיוחדות**
לתוצאות כלי עבודה (קריאות לפונקציות, פלטי סוכנים, תוצאות חיפוש וכו'):

1. **דחיסת תוצאות חיפוש** — מסיר תוצאות מיותרות, שומר את N המובילים
2. **דחיסת קריאת קבצים** — מקצר קבצים גדולים, שומר כותרות/ייבוא
3. **דחיסת ביצוע קוד** — שומר רק את ה-stdout/stderr החיוניים
4. **דחיסת שאילתות מסד נתונים** — מגביל שורות, מסיר מטא נתונים מילוליים
5. **דחיסת תגובות API** — מסיר שדות ריקים, מכווץ מערכים

#### מתי להשתמש

דחיסת תוצאות כלי עבודה **תמיד מופעלת** כאשר קיימות קריאות לכלי עבודה. אין
צורך בתצורה.

### צינור עיבוד נתונים מוערם

מצב מוערם מריץ **מספר מנועים ברצף** — בדרך כלל RTK ראשון
(חיסכון של 60-90% בפלט כלי עבודה), ואז Caveman (חיסכון נוסף של 30% ב-
הטקסט הנותר). זה משיג **חיסכון כולל של 78-95%**.

#### איך זה עובד

```
קלט (1000 אסימונים)
  ← RTK (מסנן מודע לפקודות) ← 200 אסימונים
    ← Caveman (הסרת מילים מיותרות) ← 140 אסימונים
  ← פלט (140 אסימונים, חיסכון של 86%)
```

#### מתי להשתמש

השתמש במצב מוערם עבור:

- זרימות עבודה עתירות כלים (קידוד סוכנים, מחקר)
- עיבוד אצווה רגיש לעלות
- כאשר אתה זקוק לחיסכון מרבי באסימונים

הגדר באמצעות קומבו:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## דריסות דחיסה לשילובים

ניתן לדרוס את מצב הדחיסה הגלובלי **עבור כל שילוב בנפרד**, כדי לכוונן את ההתנהגות
למקרי שימוש שונים:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

אפשרות זו שימושית עבור:

- **שילובי תכנות**: השתמשו במצב `aggressive` להפעלות ארוכות
- **שילובי שאלות ותשובות מהירות**: השתמשו במצב `lite` לקבלת תגובות מהירות
- **שילובים עתירי כלים**: השתמשו במצב `stacked` לחיסכון מרבי
- **שילובי ייצור**: השתמשו במצב `cache-aware` עבור ספקים התומכים בשמירה במטמון

---

## ראו גם

- [תצורת סביבה](../reference/ENVIRONMENT.md) — משתני סביבה של דחיסה
- [מדריך ארכיטקטורה](../architecture/ARCHITECTURE.md) — המנגנונים הפנימיים של צינור עיבוד הדחיסה
- [מדריך למשתמש](../guides/USER_GUIDE.md) — תחילת העבודה עם דחיסה
- [דחיסת RTK](./RTK_COMPRESSION.md) — מסנני RTK, מודל אמון, שער אימות ושחזור פלט גולמי
- [מנועי דחיסה](./COMPRESSION_ENGINES.md) — Caveman,‏ RTK,‏ stacked, ממשקי API,‏ MCP ולוח מחוונים
- [תבנית כללי דחיסה](./COMPRESSION_RULES_FORMAT.md) — תבנית חבילת כללים של JSON
- [חבילות שפה לדחיסה](./COMPRESSION_LANGUAGE_PACKS.md) — כללי Caveman ייחודיים לשפה
