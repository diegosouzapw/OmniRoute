# ACP registry and registered CLI launchers (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute מפריד בין **גילוי כלי CLI**, **Agent Client Protocol מקורי** ו**מתאמי stdio מדור קודם**. מציאת קובץ בינארי מותקן אינה מוכיחה את האימות שלו, את תאימות המודל שלו או את מוכנותו לטפל בהנחיה.

לוח הבקרה משתמש ב-`GET /api/acp/agents` וב-`POST /api/acp/agents` לצורך ניהול המלאי ורישום סוכנים מותאמים אישית. אלה נתיבי ניהול מקומיים בלבד, ולא API ציבורי להפעלת תהליכים או לשליחת הנחיות. `AcpManager` הפנימי אינו הופך אוטומטית לספק HTTP חלופי.

## חוזים רשומים

`config/cli-tools-manifest.json` הוא מקור האמת עבור קובצי ההפעלה הבינאריים, הארגומנטים ומצבי צד השרת המובנים. המרשם מפיק את ההגדרות שלו ממניפסט זה. תוצאות הזיהוי נשמרות במטמון למשך 60 שניות.

- `acp`: החוזה של Gemini מפעיל את `gemini --experimental-acp` ומתקשר באמצעות ACP JSON-RPC המופרד בשורות חדשות דרך ה-SDK הרשמי ל-TypeScript.
- `stdio-adapter`: חוזים רשומים אחרים שומרים על מתאם הקלט בשורות והפלט ל-stdout מדור קודם. פרק זמן של שתי שניות ללא פלט מסיים את התגובה שלו. מתאם זה **אינו** מאשר תמיכה מקורית ב-ACP עבור כלי CLI אלה.

Gemini מתעד את דגל ההפעלה ב[חומר העזר ל-CLI](https://geminicli.com/docs/cli/cli-reference/).
הלקוח משתמש ב-[SDK הרשמי של ACP](https://github.com/agentclientprotocol/typescript-sdk) לצורך אתחול, יצירת הפעלות, בקשות הנחיה, התראות וביטול.

הגדרות של סוכנים מותאמים אישית נשארות חוזי הפעלה שבשליטת מנהלי המערכת. רישום קובץ בינארי וארגומנטים מעניק לתהליך זה את הרשאות ההפעלה המקומיות של משתמש השרת; הרישום אינו ארגז חול. בדיקות גרסה מקבלות רק את קובץ ההפעלה הרשום ודגל גרסה מוכר.

## API פנימי להפעלה

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // העבירו רק את משתני הספק שהוקצו במכוון לסוכן זה.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // צרכו את התגובה ביישום הקורא.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` מאתר את קובץ ההפעלה והארגומנטים מתוך ההגדרה הרשומה. האפשרויות היחידות הזמינות לקורא הן `cwd` ו-`env`; החתימה הישנה `spawn(agentId, binary, args, env)` ודריסת קובץ ההפעלה נדחות. חוזי הפעלה באמצעות HTTP אינם נתמכים על ידי מנהל זה.

תהליך הבן יורש את אותה מערכת הפעלה, מסוף, הגדרות אזור ורשימת היתרים של אישורים כמו מפעילי ה-CLI. סודות השרת או הספק אינם מועתקים מסביבת תהליך האב. יש להעביר במפורש את פרטי ההזדהות הנדרשים ל-CLI שנבחר, או לספק אותם באמצעות מנגנון האימות המקומי של אותו CLI. לתהליך הבן עדיין יש את הרשאות מערכת הקבצים של המשתמש המקומי, והוא עשוי לקרוא את קובצי התצורה שלו.

## מחזור חיים מקורי ומגבלות

1. הפעילו את הקובץ הבינארי הרשום, אתחלו את ACP וצרו הפעלה ששורשה בספריית העבודה שנבחרה. מגבלת האתחול היא עשר שניות.
2. שלחו הנחיה ואספו התראות טקסט עבור הפעלה זו בלבד. השלמת הפעולה היא תגובת ה-RPC להנחיה, ולא פרק זמן של שקט ב-stdout.
3. השתמשו במועד יעד יחיד להנחיה, כולל כל אתחול שלא הסתיים; ברירת המחדל היא 120 שניות. הנחיות מקבילות באותו תהליך נדחות.
4. כאשר מתרחש פסק זמן במצב המקורי, נסו לבצע `session/cancel` וסיימו את התהליך. חלון מוגבל של 100 ms מאפשר להתראה להישלח לפני סיום התהליך.
5. סגרו את מצב התעבורה והסירו את ההפעלה כאשר האתחול נכשל, החיבור נסגר, התהליך מסתיים או שהקורא מסיים אותו.

בקשות הרשאה לכלים נדחות. לא מפורסמות יכולות לקוח של מערכת הקבצים או המסוף. הגבלות אלה אינן מריצות את תהליך הבן עצמו בארגז חול ואינן מחליפות את הגדרות ההרשאה של ה-CLI עצמו.

גם טקסט מקורי וגם פלט מדור קודם מ-stdout/stderr שומרים לכל היותר 1 MiB של תווים, תוך שמירת הפלט החדש ביותר בצירוף הודעת קיטום. מסגרת תעבורה מקורית בודדת מוגבלת ל-2 MiB של בתים לפני ניתוח ה-SDK. המאגרים מתאפסים עבור כל הנחיה.

`kill(sessionId)` שולח SIGTERM ולאחר מכן SIGKILL כעבור חמש שניות אם התהליך לא הסתיים. פסקי זמן של הנחיות מדור קודם משחררים מאזינים וקוצבי זמן, אך משאירים את ההפעלה זמינה להנחיה נוספת; הקוראים עדיין אחראים להשתמש ב-`kill()` או ב-`killAll()` בסיום.

## אירועים ובדיקה

המנהל פולט את `stdout`,‏ `stderr` ו-`exit`, כאשר כל אחד מהם כולל `sessionId`.
האירוע `sessionError` מדווח על שגיאת תעבורה שעברה טיהור. אירוע התאימות `error` נפלט רק כאשר רשום אליו מאזין, כך שקובץ בינארי חסר אינו יכול לגרום לשגיאת EventEmitter שאינה מטופלת.

- `getSession(sessionId)` מחזיר הפעלה מנוהלת או `undefined`.
- `getActiveSessions()` אינו כולל הפעלות שנעצרו או שנמצאות בתהליך עצירה.
- `sendInput(sessionId, input)` זמין רק עבור מתאם פעיל מדור קודם; ACP מקורי דוחה קלט גולמי כדי להגן על זרם ה-JSON-RPC שלו.
- `killAll()` מסיים כל הפעלה המנוהלת על ידי אותו מופע.

## גבולות האימות

תרחישי בדיקה דטרמיניסטיים מכסים את לחיצת היד המקורית, פלט טקסט, הרשאות שנדחו, ביטול, הנחיות מקבילות, אתחול שנכשל, יציאת תהליך, מגבלות פלט ובידוד סודות. רגרסיות קיימות במאגרים ובמאזינים מדור קודם ממשיכות להיות מכוסות. בדיקות אלה אינן מדגימות התחברות פעילה ל-Gemini או הסקה מוצלחת באמצעות ספק; אלה דורשות בדיקת עשן נפרדת עם הרשאה מתאימה בסביבת היעד.

## תיעוד קשור

- [פרוטוקולים של סוכנים](./AGENT_PROTOCOLS_GUIDE.md)
- [חוזי הפעלת CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [כלי CLI](../reference/CLI-TOOLS.md)
- [שרת A2A](./A2A-SERVER.md)
- [סוכני ענן](./CLOUD_AGENT.md)
