# Compression Engines (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

הדחיסה של OmniRoute בנויה סביב חוזי מנועים. מצב יכול להפעיל מנוע אחד ישירות
(`caveman` או `rtk`) או צינור עיבוד מוערם ודטרמיניסטי שמפעיל כמה מנועים לפי הסדר.

## מצבים

| מצב          | נתיב מנוע                                                                                                              | קלט מיועד                              |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `off`        | אין                                                                                                                    | שימור מדויק של הפרומפט                 |
| `lite`       | עוזרי Caveman לייט                                                                                                     | ניקוי תמיד-פעיל בסיכון נמוך            |
| `standard`   | Caveman                                                                                                                | דחיסת פרומפט בשפה טבעית                |
| `aggressive` | Caveman + מסכמי היסטוריה/כלים                                                                                          | שיחות צ'אט ארוכות                      |
| `ultra`      | Caveman + עוזרי גיזום                                                                                                  | שחזור מגבלת הקשר                       |
| `rtk`        | RTK                                                                                                                    | פלט טרמינל, מעטפת, בנייה, בדיקה וגיט   |
| `omniglyph`  | OmniGlyph                                                                                                              | הקשר כתמונה על גבי חיבור הספק המקורי   |
| `stacked`    | צינור עיבוד נתונים (Pipeline). ברירת המחדל לבקשה היא `session-dedup -> lite`. `rtk -> caveman` הוא אופציונלי (opt-in). | יומני כלים ופרוזה מעורבים, חיסכון מרבי |

### פרופילי דחיסה של OmniGlyph

מנוע ה-`omniglyph` (חבילה `omniglyph`, 1.4.0+) מקבל פרופיל סמנטי בעל שם, המוגדר גלובלית באמצעות `omniglyph.profile` בהגדרות הדחיסה או לכל שלב באמצעות תצורת השלב של ה-pipeline המרובדים:

| פרופיל        | גבול                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| `aggressive`  | ברירת מחדל. המדיניות שנמדדה בקבלות שפורסמו — מערכת תמונות, תיעוד כלים והיסטוריה צפופה |
| `balanced`    | שומר על מצב חי מקורי, מגן על 8 הפניות האחרונות, מקפל היסטוריה סגורה ישנה יותר         |
| `coding-safe` | שומר על סמכות, סכימות כלים ופלט כלים חי מקורי, מגן על 12 הפניות האחרונות              |
| `passthrough` | מנתב ללא שינוי; המנוע מדלג                                                            |

הפרופיל הוא **תקרה, לא רצפה**: `mergeCompressionProfileOptions` בחבילה מסרב לאפשר למתקשר לעקוף ולפתוח מחדש נתיב מאבד נתונים שהפרופיל סגר, כך ש-`preserveSystemPrompt: false` לכל שלב אינו יכול להפעיל מחדש דחיסת מערכת תחת `coding-safe`.

נמדד על בסיס קוד זה: `coding-safe` ו-`balanced` מעלים את `minCompressChars` למקסימום ושומרים על מערכת, סכימות כלים ותוצאות כלים מקוריות, כך שסשן שלא צבר היסטוריה עדיין עוצר ב-`below_min_chars` והמנוע אינו משנה דבר. זו הסיבה שברירת המחדל היא `aggressive` ולא הפרופיל הבטוח ביותר.

החבילה פותרת את היקף המודל והפרופיל שלה מתצורת הסביבה שלה. OmniRoute לעולם אינה מפקידה את ההחלטה: המתאם מקבע את שער המודל להיקף המגביל ביותר של החבילה, כך שהגדרות סביבת המארח יכולות רק לצמצם את רשימת ההיתרים, לעולם לא להרחיב אותה מעבר לקבלות הנמדדות של OmniRoute.

## מרשם המנועים

המרשם נמצא ב-`open-sse/services/compression/engines/registry.ts`. המנועים חושפים חוזה
משותף:

- `id`: מזהה מנוע יציב, כגון `caveman` או `rtk`
- `apply(text, config)`: נתיב ההפעלה הישן המשמש צינורות עיבוד מוערמים
- `compress(input, config)`: נתיב ההפעלה הראשי, המחזיר טקסט + נתונים סטטיסטיים
- `getConfigSchema()`: מחזיר מבנה דמוי JSON-Schema של תצורה תקינה
- `validateConfig(config)`: מחזיר `{ valid, errors[] }`

הרישום משתמש ב-`registerCompressionEngine(engine)` (או ב-`registerEngine` למקרים מתקדמים),
אשר קורא ל-`assertValidEngine()` ול-`validateConfig(defaultConfig)` לפני הקבלה.
השתמשו ב-`unregisterCompressionEngine(id)` כדי להסיר מנוע בזמן ריצה.

`strategySelector.ts` רושם את המנועים המובנים לפני הפעלת הדחיסה. כך תצוגה מקדימה,
דחיסה בזמן ריצה, מצב מוערם, בדיקות ומנועים עתידיים יכולים להשתמש באותו נתיב הפעלה.

### דחיסת תיאורי MCP (קשור)

מרשם נפרד דוחס מטא-נתונים של תיאורי כלי MCP ברמת המרשם — ראו
`open-sse/mcp-server/descriptionCompressor.ts` ואת [MCP-SERVER.md](../frameworks/MCP-SERVER.md). הוא עושה שימוש חוזר
בכללי Caveman, אך פועל על מטא-נתונים של כלים, ולא על מטעני בקשות.

### מנועים מובנים נוספים

מעבר ל-Caveman, ל-RTK ול-LLMLingua-2, המרשם כולל כמה מנועים מתמחים ללא אובדן /
מבניים (המשמשים צינורות עיבוד מוערמים, את סביבת הניסוי ואת הבדיקות):

| מנוע          | מזהה            | מה הוא עושה                                                                                                                                                          |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): מחליף בלוקי טקסט רציפים גדולים בהפניות ממוענות-תוכן, כך שבלוקים חוזרים/גדולים נשלחים פעם אחת בלבד ולאחר מכן נעשה שימוש בהפניה אליהם. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): דחיסה טבלאית ללא אובדן של מטעני מערכי JSON הומוגניים לצורה עמודתית של `[N rows]`.                                                            |
| ionizer       | `ionizer`       | דגימת שורות מההתחלה/האמצע/הסוף עבור בלוקים הומוגניים גדולים מאוד, תוך אחסון החלק האמצעי שהושמט כהפניית CCR ממוענת-תוכן.                                              |
| session-dedup | `session-dedup` | הסרת כפילויות ממוענת-תוכן בין תורות (בהשראת TokenMizer): משמיטה טקסט שכבר הופיע בתורות קודמים של אותו סשן.                                                           |

**הוראת פרוטוקול האחזור של CCR‏ (#8033):** בפעם הראשונה שבה CCR מחליף ≥1 בלוקים
בבקשה, המנוע מוסיף בתחילתה הודעת `system` יחידה ואידמפוטנטית (הנפתחת בזקיף
`[CCR protocol]`) המלמדת את הקורא את חוזה הסמן ← כלי: מה משמעות הסמן
`[CCR retrieve hash=<24hex> chars=N]`, שיש להעתיק את הגיבוב מילה במילה
(כל 24 תווי ההקסדצימל — גיבובים שהועתקו באופן שגוי הם הסיבה הסבירה להחמצות מסוג "הבלוק לא נמצא"
), ושסמן `[dedup:ref sha=...]` פירושו "חפש אחורה בהיסטוריה", ולא "קרא
לכלי". ההערה מוזרקת **רק כאשר `tools[]` שעליהם הצהיר הקורא מוכיחים שהוא מסוגל
בפועל להגיע אל `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` בתוך
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — קורא רגיל
התואם ל-OpenAI וללא כלי זה לעולם לא יקבל הוראה לקרוא למשהו שאין באפשרותו
להגיע אליו. אידמפוטנטיות נאכפת באמצעות סריקת היסטוריית ההודעות לאיתור הזקיף
לפני ההזרקה, כך שבקשות מרובות תורות (המשמיעות מחדש הודעות קודמות) אינן עורמות את
ההערה פעם אחת בכל תור.

## Caveman

מצב Caveman מתמקד בתמצות סמנטי של טקסט רגיל:

- משמר בלוקי קוד, כתובות URL, נתוני JSON, נתיבים ונתונים מובנים
- מסיר מלל מיותר, הסתייגויות, הקשר חוזר וניסוחים מקשרים ארכניים
- תומך בחבילות כללים לקבצים המותאמות לשפה תחת `open-sse/services/compression/rules/`
- נשאר זמין דרך המצבים הקודמים `standard`,‏ `aggressive` ו-`ultra`

המיקום בלוח הבקרה הוא `Dashboard -> Context & Cache -> Caveman`.

פרויקט המקור של Caveman מדווח על `~75%` פחות טוקני פלט, חיסכון ממוצע של `65%` בפלט בבדיקות ביצועים
בטווח של `22-87%`, ועל כלי לדחיסת קלט בשיעור של `~46%`. OmniRoute משתמש בנתון של Caveman לדחיסת
קלט בעת תיעוד חיסכון משולב בפרומפטים/הקשר; מצב הפלט של Caveman נשאר תכונה נפרדת של
התנהגות התגובה.

## RTK

מצב RTK מתמקד בפלט של פקודות וכלים:

- מזהה סוגי פלט כגון `git status`,‏ `git branch`,‏ `git diff`,‏ Vitest/Jest/Pytest,
  בדיקות Cargo/Go, בניות TypeScript/Vite/Webpack,‏ ESLint, ביקורות/התקנות npm, יומני Docker,
  פקודות המעטפת `find`/`grep`, עקבות מחסנית ויומנים כלליים
- מחיל 49 מסנני JSON מתוך `open-sse/services/compression/engines/rtk/filters/`
- תומך בצינור ההצהרתי בסגנון RTK: הסרת ANSI, החלפה, קיצור דרך בעת התאמת פלט,
  הסרה/שמירה של שורות, קיצור לכל שורה, קיצור לפי התחלה/סוף/מספר שורות מרבי וחלופה כאשר הפלט ריק
- תומך במסנני פרויקט מוגבלי-אמון ב-`.rtk/filters.json` ובמסננים גלובליים ב-
  `DATA_DIR/rtk/filters.json`
- מסיר רצפי ANSI, רעשי התקדמות, שורות חוזרות וטקסט שגרתי שאינו מועיל
- משמר כשלים שניתן לפעול לגביהם, אזהרות, סיכומים, קבצים שהשתנו והקשר מסוף הפלט
- יכול, לפי בחירה, לשמור פלט גולמי מושחר לצורך שחזור/ניפוי באגים דרך נתיבי ניהול
  מאומתים

המיקום בלוח הבקרה הוא `Dashboard -> Context & Cache -> RTK`.

פרטים תפעוליים על מסננים מותאמים אישית, אמון, אימות ושחזור פלט גולמי מופיעים ב-
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

פרויקט המקור של RTK מדווח על חיסכון של `60-90%` בדחיסת פלט פקודות. הדוגמה בקובץ ה-README שלו מציגה
הפעלה של Claude Code במשך 30 דקות היורדת מ-`~118,000` טוקנים ל-`~23,900`, כלומר חיסכון של `79.7%`.

## LLMLingua-2 (גיזום סמנטי)

מצב LLMLingua-2 מבצע **גיזום סמנטי של טוקנים** בטקסט באמצעות מסווג טוקנים קטן בפורמט ONNX,
כהשלמה למנועים מבוססי-הכללים Caveman ו-RTK:

- דוחס טקסט רק בהודעות שאינן הודעות מערכת; בלוקי קוד מגודרים ומבנים שמורים אחרים
  לעולם אינם משתנים
- מריץ את מנגנון הקצה `@atjsh/llmlingua-2` (‏ONNX דרך `@huggingface/transformers`) ב-
  תהליכון עובד, כך שהסקת המודל לעולם אינה חוסמת את לולאת האירועים של הבקשה
- ניתן **לשילוב בערימה** (`stackPriority` 35): בצינור משולב הוא פועל אחרי
  המנועים המבניים (CCR,‏ session-dedup,‏ headroom,‏ Caveman), אך לפני `ultra`, משום
  שגיזום סמנטי יעיל ביותר על טקסט שכבר נדחס מבחינה מבנית — לדוגמה
  `rtk -> caveman -> llmlingua`
- **נכשל באופן פתוח בכל שגיאה** (יחסי תלות אופציונליים חסרים, יצירת תהליך עובד, טעינת מודל, הסקה
  או פסק זמן) ← הטקסט המקורי מוחזר ללא שינוי ולעולם לא מוחזרת שגיאה

מיקום המנוע: `open-sse/services/compression/engines/llmlingua/`. המיקום בלוח הבקרה
הוא `Dashboard -> Context & Cache -> LLMLingua`.

### מודלים

מודל ברירת המחדל הוא **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, כ-57 MB,
מהיר). מודל **BERT-base** בעל דיוק גבוה יותר (`Arcoldd/llmlingua4j-bert-base-onnx`,
כ-710 MB) זמין דרך השדה `model` בתצורת המנוע. `@huggingface/transformers`
מוריד באופן עצל את המודל שנבחר מ-HuggingFace Hub אל
`${DATA_DIR}/models/llmlingua` בקריאה הראשונה (`modelStore.ts`); דריסת התצורה `modelPath`
מפנה אותו במקום זאת לעותק מקומי (להתקנות לא מקוונות / מבודדות מרשת).

### יחסי תלות אופציונליים והתקנה לפי דרישה

מחסנית יחסי התלות העמיתים של זמן הריצה הניתן לגיזום של LLMLingua היא **אופציונלית**. שתי חבילות מוגדרות בתור
`optionalDependencies` ב-`package.json` ונשארות **חיצוניות** בבניית הייצור
(`scripts/build/prepublish.ts` אינו מאגד אותן):

| חבילה                | גרסה (מקובעת) | הערות                                  |
| -------------------- | ------------- | -------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`       | חבילת הכניסה; מגדירה את האחרות כעמיתות |
| `js-tiktoken`        | `^1.0.20`     | מבצע טוקניזציה                         |

`@huggingface/transformers` מקובע ל-`^4.2.0` (משותף לנתיב ההטמעות המקומי וגם
נכלל במעקב אל החבילה העצמאית); `@atjsh/llmlingua-2@2.0.5` מגדיר אותו כעמית עם
`"^3.5.2 || ^4.0.0"`, ולכן יש תמיכה הן ב-Transformers.js v3 והן ב-v4. החל מ-2.0.4,
`@atjsh/llmlingua-2` אינו דורש עוד את `@tensorflow/tfjs`, מה שהסיר את הרכיב היחיד
הגדול ביותר (TensorFlow.js) ממחסנית ה-SLM. רק שתי החבילות שלעיל הן עמיתות SLM
הניתנות לגיזום. `npm install` רגיל (פיתוח) מתקין אוטומטית את המחסנית האופציונלית, אלא אם יחסי
תלות אופציונליים מושמטים.

**מדוע לפי דרישה:** החבילה המתפרסמת ב-npm, החבילה העצמאית ותמונת Docker
מופצות **ללא** יחסי התלות האלה כדי להישאר רזות. כאשר הם חסרים, שער יחסי התלות
של התהליך העובד (בדיקת פתרון של `@atjsh/llmlingua-2` ב-`worker.ts`) נכשל והמנוע
**נכשל באופן פתוח ושקט** — בחירה ב-LLMLingua אינה מבצעת דבר (הטקסט מוחזר ללא שינוי ולא
נרשמת שגיאה). כדי להפעיל אותו בסביבה שעברה גיזום, יש להתקין את המחסנית האופציונלית:

```bash
# קיבוע לגרסאות המוגדרות ב-optionalDependencies של package.json
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

הסרת `@tensorflow/tfjs` (בגרסה 2.0.4 ואילך) מבטלת את הרכיב שהיה בעבר הדומיננטי, בגודל של כ-800 MB
— טביעת הרגל שנותרה כוללת את סביבות הריצה transformers.js + onnxruntime-node,
וכן את מודל TinyBERT (כ-57 MB) שמורד בשימוש הראשון (לא דרך npm).

לפי סביבה:

- **פיתוח / `npm install`** — מותקן אוטומטית, אלא אם העברתם את `--omit=optional`
  (או `--no-optional`). אין צורך בפעולה נוספת.
- **npm גלובלי (`npm i -g omniroute`) / התקנה עצמאית** — הריצו את פקודת ההתקנה שלעיל בתוך
  תיקיית החבילה המותקנת, או התקינו מחדש מבלי להשמיט תלויות אופציונליות.
- **Docker** — הוסיפו את פקודת ההתקנה בשכבה של תמונה נגזרת; התמונה שפורסמה
  מסופקת במכוון בגרסה מצומצמת.
- **VPS (PM2)** — התקינו בתוך `node_modules` של היישום, ולאחר מכן הפעילו מחדש את התהליך כדי
  שה-worker יבדוק שוב את השער.
- **Next עצמאי גולמי (`npm run build` → `.build/next/standalone/server.js`)** — עקבת
  ההתקנה העצמאית אינה כוללת לא את ה-worker ולא את התלויות האופציונליות, ולכן המנוע עובר
  בשקט למצב פתוח במקרה של כשל. `scripts/build/colocate-standalone.mjs` מחיל מחדש את שניהם (בניית ה-worker באמצעות esbuild +
  סגירת התלויות האופציונליות בתוך עץ ההתקנה העצמאית); הוא מופעל אוטומטית באמצעות ה-hook של
  npm בשם `postbuild` לאחר כל בנייה. הפעולה אידמפוטנטית ונכשלת באופן סלחני כאשר התלויות אינן זמינות.

**ודאו שהוא פעיל:** כאשר LLMLingua נבחר, טקסט אמיתי אכן מתקצר (המנוע
מפסיק לעבור למצב פתוח במקרה של כשל), והבקשה הראשונה מפעילה את הורדת המודל אל
`${DATA_DIR}/models/llmlingua`. השער בודק במכוון רק את `@atjsh/llmlingua-2` —
העמיתים האחרים הם מסוג ESM בלבד, ו-`require.resolve` זורק עבורם חריגה גם כשהם קיימים — ולכן
ה-worker עדיין עובר למצב פתוח במקרה של כשל אם עמית כלשהו באמת חסר בזמן `import()`.

## צינורות עיבוד מוערמים

מצב מוערם מריץ את שלבי צינור העיבוד לפי הסדר. ברירת המחדל היא:

```txt
rtk -> caveman
```

השתמשו בכך עבור הפעלות של סוכן קידוד שבהן הנחיה משלבת פלט פקודות עם טקסט אנושי או טקסט של העוזר. RTK מצמצם תחילה יומני כלים רועשים, ולאחר מכן Caveman דוחס את השפה הטבעית שנותרה.

שלבי צינור העיבוד מוגדרים באמצעות `stackedPipeline` בהגדרות הדחיסה או באמצעות שילובי דחיסה.

כאשר שני המנועים מצמצמים את אותו מטען נתונים מתאים, החיסכון מצטבר:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## מסנן עץ הנגישות של MCP

המסנן החכם לעץ הנגישות של MCP הוא שכבת דחיסה לאחר ביצוע, שפועלת על **תוצאות כלים** של MCP, ולא על הנחיות או הקשר. הוא מיועד למטעני הנתונים המפורטים של עץ הנגישות ושל תמונות מצב מהדפדפן, המוחזרים על ידי כלים כגון Playwright, שימוש במחשב ושרתי MCP לאוטומציית דפדפן.

### מה הוא עושה

1. **הסרת רעש** — מסיר רשומות כלליות/טקסטואליות ריקות (`- generic:`, `- text: ""`)
2. **כיווץ רשומות אחיות** — כאשר ≥ `collapseThreshold` (ברירת המחדל היא 30) שורות רצופות הן חזרות מבניות, מכווץ אותן ל־`collapseKeepHead` השורות הראשונות (ברירת המחדל היא 10) + סיכום ספירה + `collapseKeepTail` השורות האחרונות (ברירת המחדל היא 5)
3. **שימור הפניות** — עוגני `[ref=eXX]` הנדרשים על ידי Playwright/שימוש במחשב לעולם אינם משתנים
4. **חיתוך קשיח** — אם הטקסט לאחר הכיווץ עדיין חורג מ־`maxTextChars` (ברירת המחדל היא 50,000), הוא נחתך עם רמז ניווט כדי שהסוכן יוכל להמשיך לעבוד

### מיקום המנוע

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← נקודת הכניסה smartFilterText()
  collapseRepeated.ts ← אלגוריתם לכיווץ רשומות אחיות
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### הגדרה

נשלט באמצעות `compression.mcpAccessibility` בהגדרות הגלובליות (מיגרציה 056). הגדרת ברירת המחדל:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

המסנן מוחל רק על מטעני נתונים של תוצאות כלים שה־`type` שלהם הוא `"text"` ושאורכם חורג מ־`minLengthToProcess`. הוא אינו משפיע על דחיסת הנחיות או על מטעני נתונים של בקשות.

### חיסכון צפוי

60–80% בתוצאות של כלי תמונת מצב מהדפדפן, בהתאם למורכבות הדף. אלגוריתם הכיווץ הוא O(n) במספר השורות ומוסיף השהיה זניחה.

### מסנן זה לעומת מנועי הדחיסה שלעיל

| היבט        | Caveman / RTK / מוערם  | מסנן הנגישות של MCP                    |
| ----------- | ---------------------- | -------------------------------------- |
| יעד         | הנחיות / הקשר של בקשות | תוצאות כלי MCP                         |
| גורם מפעיל  | הגדרת מצב הדחיסה       | `compression.mcpAccessibility.enabled` |
| תחום        | כל הודעות SSE          | תוצאות כלים בלבד                       |
| עוגני הפניה | לא רלוונטי             | נשמרים ללא תנאי                        |

---

## שילובי דחיסה

שילובי דחיסה הם פרופילי דחיסה בעלי שם שניתן להקצות לשילובי ניתוב:

- `compression_combos`: מאחסן מצב, צינור עיבוד, תצורת RTK, תצורת שפה וסמן ברירת מחדל
- `compression_combo_assignments`: ממפה שילוב דחיסה לשילוב ניתוב
- שילוב זמן הריצה פותר שילוב דחיסה שהוקצה לפני דריסות כלליות של שילובים
- נתוני הניתוח כוללים `compression_combo_id` ו-`engine`

מיקום בלוח הבקרה: `Dashboard -> Context & Cache -> Compression Combos`.

## ממשק API

| נתיב                                   | מטרה                                                  |
| -------------------------------------- | ----------------------------------------------------- |
| `/api/settings/compression`            | הגדרות דחיסה גלובליות (כולל תצורת `mcpAccessibility`) |
| `/api/compression/preview`             | תצוגה מקדימה של כל מצב דחיסה                          |
| `/api/compression/language-packs`      | הצגת חבילות השפה הזמינות של Caveman                   |
| `/api/context/caveman/config`          | כינוי חלופי להגדרות Caveman                           |
| `/api/context/rtk/config`              | ברירות מחדל והגדרות של RTK                            |
| `/api/context/rtk/filters`             | קטלוג המסננים של RTK                                  |
| `/api/context/rtk/test`                | נקודת קצה לתצוגה מקדימה/בדיקה של RTK                  |
| `/api/context/rtk/raw-output/[id]`     | שחזור מאומת של פלט גולמי שעבר השחרה                   |
| `/api/context/combos`                  | פעולות CRUD על שילובי דחיסה                           |
| `/api/context/combos/[id]/assignments` | פעולות CRUD על הקצאות לשילובי ניתוב                   |
| `/api/context/analytics`               | כינוי חלופי לנתוני ניתוח דחיסה                        |

נתיבי ניהול דורשים אימות ניהולי או בדיקות מדיניות של מפתח API.

## כלי MCP

הדחיסה חושפת חמישה כלי MCP:

| כלי                                 | תחום הרשאה          | מטרה                                  |
| ----------------------------------- | ------------------- | ------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | הגדרות, נתוני ניתוח וסטטיסטיקות מטמון |
| `omniroute_compression_configure`   | `write:compression` | עדכון הגדרות גלובליות                 |
| `omniroute_set_compression_engine`  | `write:compression` | הגדרת מצב וצינור עיבוד אופציונלי      |
| `omniroute_list_compression_combos` | `read:compression`  | הצגת שילובי דחיסה                     |
| `omniroute_compression_combo_stats` | `read:compression`  | קריאת נתוני ניתוח לפי שילוב/מנוע      |

## תחולה והחרגות

**Embeddings לעולם אינם נדחסים.** `open-sse/handlers/embeddings.ts` לעולם אינו מפעיל מנוע
דחיסה כלשהו — גופי הבקשה/התגובה מועברים ישירות למבצע ללא שינוי.
כיום הדבר מובנה בארכיטקטורה (ל-embeddings ולהשלמות צ'אט יש מטפלים נפרדים), ולא נובע
מבדיקת זמן ריצה, אך משמעות הדבר היא שלחשש מעיוות וקטורים ב-#8034 אין משטח חשיפה
בנתיב ה-embeddings.

**מסנן החרגות לפי מודל/נקודת קצה (#8034).** עבור השלמות צ'אט, מפעיל יכול לציין
מזהי מודלים / יעדי `provider/model` שלעולם אין לדחוס — אמצעי הגנה שימושי אם
הדחיסה תחובר בעתיד קרוב יותר לנתיב הסמוך ל-embeddings, ושימושי באופן כללי
לכל מודל שעבורו חשובה הנחיה מדויקת ברמת כל בית (הערכות דטרמיניסטיות, תחיליות
רגישות למטמון וכדומה).

- שדה הגדרות: `exclusions?: string[]` בתצורת הדחיסה הגלובלית
  (`GET`/`PUT /api/settings/compression`), הנשמר באמצעות מרחב השמות הקיים `key_value` של הדחיסה
  (`src/lib/db/compression.ts`) — ללא טבלה חדשה.
- לשונית בלוח הבקרה: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- תחביר תבניות: `*` הוא התו הכללי היחיד. כל מטא-תו אחר של ביטוי רגולרי בתבנית
  עובר הברחה לפני ההתאמה, כך ש-`gpt-5.6` מתאים למחרוזת המילולית בלבד, ולעולם לא ל-`gpt-5x6`
  (בטוח מפני ReDoS, חסום בגודלו וללא כמתים מקוננים). ההתאמה אינה תלוית רישיות ומתבצעת מול
  מזהה המודל בלבד וגם מול הצירוף `provider/model` — `gpt-5-6`, `openai/gpt-5-6`
  ו-`openai/*` פועלים כולם, ו-`*` לבדו מחריג כל מודל.
- התאמה: `isCompressionExcluded()` / `normalizeCompressionExclusions()` בתוך
  `open-sse/services/compression/exclusions.ts`. הקובץ `chatCore.ts` בודק את היעד המוחרג
  מיד לאחר פתרון הגדרות הדחיסה, **לפני שמנוע כלשהו מופעל**, ומתייחס להתאמה
  בדיוק כאילו הדחיסה הושבתה באופן גלובלי — ניתן להוכיח שגוף הבקשה זהה
  ברמת כל בית. הדילוג נרשם באמצעות `writeCompressionSkip(..., "excluded")` לצורך
  נראות בנתוני הניתוח.
- ברירת המחדל (רשימה ריקה/חסרה): זהה להתנהגות שקדמה ל-#8034 — דבר אינו מוחרג.

## מגבלות ידועות

- **‏LLMLingua-2 (SLM) דורש תלויות אופציונליות הממוקמות יחד.** תהליך ה-worker פועל בגרסת
  production רק כאשר `@atjsh/llmlingua-2` והתלויות המקבילות שלו ממוקמים יחד בתוך
  `dist/node_modules` (ראו `scripts/build/colocateOptionals.mjs`,‏ #4286). בלעדיהם
  המנוע נכשל במצב פתוח (מחזיר את הטקסט המקורי). איתור ה-worker כבר אינו תלוי
  ב-`import.meta.url` (הוא נכשל בחבילה העצמאית) — הוא מעוגן ב-cwd של סביבת הריצה /
  `argv[1]`.
- **חבילות השפה `de` / `fr` / `ja` של Caveman הן חלקיות.** הן כוללות כללי `context` +
  `filler` + `structural`, אך אינן כוללות חבילות `dedup` / `ultra`, ולכן עוצמת `ultra`
  אינה חזקה יותר מ-`full` עבור שפות אלה (הן משתמשות רק בכללים שלהן — אין חזרה שקטה
  לכללי `dedup`/`ultra` באנגלית, שעלולים לשבש טקסט בשפות זרות).
  החבילות `en` / `es` / `id` / `pt-BR` מלאות. נשמח לקבל תרומות של `dedup.json` + `ultra.json`
  עבור החבילות החלקיות.
- **טלמטריה משולבת מציגה רק מנועים שביצעו דחיסה.** שלב בצינור עיבוד משולב שהמנוע
  שלו פעל אך הניב חיסכון של 0% מחזיר `stats:null`, ולכן אינו מופיע
  ב-`engineBreakdown` — ולא ניתן להבחין בינו לבין שלב שדולג. הבחנה בין
  "פעל, 0%" לבין "דולג" תחייב שינוי במודל הפירוט ונדחית למועד מאוחר יותר.

## אימות

השערים הממוקדים עבור אזור זה הם:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
