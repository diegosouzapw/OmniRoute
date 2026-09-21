# Extending the Compression Pipeline (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **בקצרה**: מנוע הדחיסה של OmniRoute הוא **בר-הרחבה** — ניתן לרשום מנועים מותאמים אישית, להפיץ חבילות שפה לשפות חדשות ולהרכיב צינורות עיבוד משורשרים. מדריך זה מסביר כיצד.

**מדריכים קשורים:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — סקירה מלאה של צינור העיבוד
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — מרשם המנועים והמנועים המובנים
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — מנוע RTK ומסננים מותאמים אישית
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — תיעוד עזר לפורמט חבילות הכללים

---

## סקירה כללית

למערכת הדחיסה יש **3 נקודות הרחבה**:

| נקודת הרחבה          | מקרה שימוש                                                       | רמת קושי |
| -------------------- | ---------------------------------------------------------------- | -------- |
| **מנוע מותאם אישית** | הוספת אלגוריתם דחיסה חדש לחלוטין (למשל, מסכם ייעודי לתחום מסוים) | מתקדמת   |
| **חבילת שפה**        | הוספת תמיכה בשפה טבעית חדשה (למשל, הינדי או ערבית)               | בינונית  |
| **צינור משורשר**     | הרכבת מנועים קיימים בסדר מותאם אישית                             | למתחילים |

```
┌─────────────────────────────────────────────────────────────┐
│                    אסטרטגיית דחיסה                           │
│                                                              │
│   הודעות קלט ──▶ getEffectiveMode() ──▶ מצב                 │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   מנוע      מנוע     מנוע      משורשרים    │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             פלט דחוס                       │
└─────────────────────────────────────────────────────────────┘

בורר האסטרטגיה מבוסס על מצב: כל בקשה בוחרת מצב אחד
(rtk / lite / standard / aggressive / ultra / stacked / off).
רק המצב "stacked" משרשר מספר מנועים ברצף.
מצב ההפעלה האוטומטית המוגדר כברירת מחדל הוא "lite" (ולא שרשרת עדיפויות בת 3 רמות).
```

---

## כתיבת מנוע דחיסה מותאם אישית

ממשק המנוע (`open-sse/services/compression/engines/types.ts`) הוא החוזה שכל מנוע חייב לממש. יש לו 5 מתודות נדרשות.

### הממשק `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // מזהה מנוע ייחודי
  name: string; // שם לתצוגה
  description: string; // תיאור קצר
  icon: string; // סמל (אימוג'י או URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // האם ניתן להשתמש בו בצינור עיבוד משורשר
  stackPriority: number; // סדר בצינורות עיבוד משורשרים (ערך נמוך יותר = מוקדם יותר)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### דוגמה מינימלית: מנוע רווחים לבנים

המנוע הפשוט ביותר האפשרי — הסרת רווחים לבנים עודפים מהודעות.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // פיצול לפי סמני בלוקי קוד ושימור הרווחים בתוכם
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // אין לשנות בלוקי קוד
      }
      return part.replace(/\n{3,}/g, "\n\n"); // החלה על פרוזה בלבד
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "Whitespace Stripper",
  description: "Removes extra whitespace and blank lines",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // הפעלה אחרי caveman/rtk

  metadata: {
    id: "whitespace",
    name: "Whitespace Stripper",
    description: "Removes extra whitespace and blank lines",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },

  apply(body, options) {
    return this.compress(body, options?.config);
  },

  compress(body, config = {}) {
    let originalLength = 0;
    let compressedLength = 0;

    // מעבר על מערך ההודעות — טיפול הן בתוכן מסוג מחרוזת והן בתוכן מרובה חלקים
    const compressedBody = (body.messages || []).map((msg) => {
      if (typeof msg.content === "string") {
        originalLength += msg.content.length;
        let compressed = msg.content
          .replace(/[ \t]+/g, " ")
          .replace(/\n{3,}/g, "\n\n")
          .replace(/^\s+|\s+$/gm, "");
        compressedLength += compressed.length;
        return { ...msg, content: compressed };
      }
      // תוכן מרובה חלקים: מעבר על החלקים ודחיסת חלקי טקסט בלבד
      if (Array.isArray(msg.content)) {
        const newParts = msg.content.map((part) => {
          if (part.type === "text" && typeof part.text === "string") {
            originalLength += part.text.length;
            let compressed = part.text
              .replace(/[ \t]+/g, " ")
              .replace(/\n{3,}/g, "\n\n")
              .replace(/^\s+|\s+$/gm, "");
            compressedLength += compressed.length;
            return { ...part, text: compressed };
          }
          return part; // שימור image_url, tool_use וכו׳
        });
        return { ...msg, content: newParts };
      }
      return msg;
    });

    return {
      body: { ...body, messages: compressedBody },
      stats: {
        originalTokens: Math.ceil(originalLength / 4),
        compressedTokens: Math.ceil(compressedLength / 4),
        savingsPercent: originalLength > 0 ? 100 * (1 - compressedLength / originalLength) : 0,
        techniques: ["whitespace-collapse"],
        engineId: "whitespace",
      },
    };
  },

  getConfigSchema() {
    return [
      {
        key: "preserveCodeBlocks",
        type: "boolean",
        label: "Preserve code blocks",
        defaultValue: true,
        description: "Don't touch whitespace inside ```code``` blocks",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return { valid: false, errors: ["preserveCodeBlocks must be a boolean"] };
    }
    return { valid: true, errors: [] };
  },
};

// רישום גלובלי
registerCompressionEngine(whitespaceEngine);
````

### היכן למקם מנועים מותאמים אישית

```
~/.omniroute/compression/engines/my-engine.ts    # ברמת המשתמש
<project>/compression-engines/my-engine.ts        # ברמת הפרויקט (נטען בעת ההפעלה)
```

או לטעון באופן תכנותי מתוסף:

```ts
// בתוך התוסף שלכם
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // ה-SDK של התוסף חושף את ה-hooks‏ onRequest / onResponse / onError. רשמו את
  // המנוע כאשר מודול התוסף נטען (או בקריאת onRequest הראשונה); בטלו את הרישום שלו
  // בנתיב הפירוק שלכם.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// בעת הפירוק:
// unregisterCompressionEngine("my-engine");
```

### בדיקת המנוע שלכם

רשמו את המנוע שלכם בתוסף או בפונקציית אתחול. לאחר הרישום, המנוע יהיה זמין
בבורר האסטרטגיות באמצעות ה-`id` שלו. בדקו את השילוב על ידי צירופו בצינור עיבוד מוערם:

---

## יצירת חבילות שפה

דחיסה בסגנון Caveman משתמשת ב**חבילות כללים ייעודיות לשפה** כדי לטפל במילות מילוי, בהסתייגויות ובתבניות מילוליות בכל שפה טבעית. OmniRoute מגיעה עם **6 חבילות שפה**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### מבנה החבילה

חבילת שפה היא ספרייה של **קובצי JSON** תחת `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # ברכות ונימוסים, הסתייגויות, אדיבות
│   ├── context.json         # כללים לצמצום הקשר
│   ├── dedup.json           # כללים להסרת כפילויות
│   ├── structural.json      # פיסוק, עיצוב
│   └── ultra.json           # כללי דחיסה אגרסיביים
├── es/  (אותו מבנה)
├── fr/  (אותו מבנה)
├── de/  (אותו מבנה)
├── ja/  (אותו מבנה)
└── pt-BR/ (אותו מבנה)
```

### מבנה הכלל

לכל כלל יש את המבנה הבא (מתוך `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // שם קריא לבני אדם (kebab-case)
  pattern: string; // תבנית ביטוי רגולרי של JavaScript
  replacement?: string; // במה להחליף את ההתאמה
  replacementMap?: Record<string, string>; // או מפת מפתח→תחליף
  flags?: string; // דגלי ביטוי רגולרי (בדרך כלל "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // יש לדלג מתחת לרמת עוצמה זו
  description?: string; // תיעוד
}
```

### דוגמה: הוספת כללי מילות מילוי בהינדית

```json
{
  "language": "hi",
  "category": "filler",
  "rules": [
    {
      "name": "polite_opener",
      "pattern": "\\b(?:नमस्ते|नमस्कार|आदरणीय)\\b[,!\\s]*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Strip polite openers like 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Strip 'actually' fillers"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Strip 'please' in Hindi"
    }
  ]
}
```

### אימות

חבילות כללים מאומתות מול `_schema.json` בעת הטעינה. טעינת חבילה בעלת מבנה שגוי תיכשל ותירשם שגיאה ביומן:

```
RULE_LOADER: אימות החבילה "hi/filler.json" נכשל:
  - rules.0.pattern: ביטוי רגולרי לא תקין
  - rules.1.context: חייב להיות אחד מתוך [all, user, system, assistant]
```

האימות פועל אוטומטית בעת טעינת חבילה (מול `_schema.json`); חבילה
לא תקינה נדחית והשגיאה שלעיל נרשמת ביומן. אין סקריפט `npm run`
נפרד לאימות חבילות — טענו את החבילה (למשל, הפעילו את השרת או
הריצו את נתיב הדחיסה) ועקבו אחר היומנים.

### טעינת חבילת שפה מותאמת אישית

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

לחלופין, מקמו אותה במיקום מזוהה:

```
~/.omniroute/compression/rules/hi/filler.json  # ברמת המשתמש
<project>/.compression/rules/hi/filler.json   # ברמת הפרויקט
```

### שיטות עבודה מומלצות לחבילות שפה

1. **התחילו עם `filler`** — אלה הכללים בעלי ההשפעה הגבוהה ביותר
2. **השתמשו ב-`minIntensity`** כדי להגביל כללים אגרסיביים — כך ניתן להגן מפני דחיסת יתר
3. **כללו מקרי בדיקה** — הוסיפו מערך `tests[]` ל-JSON כדי לאמת את ההתנהגות
4. **לסדר יש חשיבות** — כללים מוקדמים יותר מוחלים ראשונים; מקמו ראשונים כללים בעלי השפעה גבוהה
5. **היו שמרניים עם `replacement`** — מחרוזת ריקה היא בדרך כלל הבחירה הנכונה; לעולם אל תוסיפו תוכן חדש

### אסטרטגיית תרגום

בעת התאמת חבילות כללים לשפה חדשה:

1. **תרגמו את שמות הכללים** — הם מופיעים בפלט ניפוי הבאגים
2. **התאימו את תבניות הביטויים הרגולריים** — תרגום ישיר נכשל לעיתים קרובות (גבולות המילים שונים)
3. **בדקו מול שיחות אמיתיות** — החבילה צריכה להיות בטוחה לשימוש בקלט אמיתי
4. **התאימו למוסכמות תרבותיות** — לדוגמה, חבילות ביפנית כוללות יותר מילות מילוי של כבוד מאשר חבילות באנגלית

---

## צינורות עיבוד מוערמים

**צינור עיבוד מוערם** מפעיל מספר מנועים ברצף, כאשר הפלט של כל מנוע מוזן למנוע הבא. כך פועל `mode: stacked` באופן פנימי.

### כיצד הערמה פועלת

```
קלט (10,000 טוקנים)
        │
        ▼
   ┌──────────┐
   │  מנוע    │  עדיפות 10
   │  A       │  ──▶ פלט: 6,000 טוקנים (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  מנוע    │  עדיפות 50
   │  B       │  ──▶ פלט: 2,400 טוקנים (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  מנוע    │  עדיפות 100
   │  C       │  ──▶ פלט: 1,200 טוקנים (-80%)
   └────┬─────┘
        │
        ▼
פלט סופי (1,200 טוקנים, חיסכון משולב של כ־88%)
```

כאשר נבחר `mode: "stacked"`, המנועים מופעלים ברצף לפי הסדר שצוין במערך `pipeline`.
הפלט של מנוע N הופך לקלט של מנוע N+1.

### מצבי דחיסה

OmniRoute בוחר **מצב אחד לכל בקשה** על סמך התצורה, ספי הפעלה אוטומטית ודריסות משולבות.
המצבים הזמינים מוגדרים ב־`open-sse/services/compression/types.ts` (הטיפוס `CompressionMode`):

| מצב          | מנועים                  | שימוש מיועד                                                                                                                                                             |
| ------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | ללא                     | השבתת כל הדחיסה                                                                                                                                                         |
| `rtk`        | RTK בלבד                | הפעלות עתירות פלט פקודות (חיסכון של יותר מ־80%)                                                                                                                         |
| `lite`       | Lite בלבד               | דחיסה שמרנית (מהירה ובטוחה)                                                                                                                                             |
| `standard`   | Caveman                 | דחיסת פרוזה באמצעות חבילות שפה                                                                                                                                          |
| `aggressive` | Caveman + Aggressive    | דחיסת פרוזה אגרסיבית + מעבר סופי אגרסיבי                                                                                                                                |
| `ultra`      | Ultra                   | דחיסה מרבית (מאבדת מידע, מוצא אחרון). ניתן לנתב דרך מנוע ה־SLM ‏**LLMLingua-2** כאשר `ultra.modelPath` מוגדר (אם המודל אינו זמין, מתבצע מעבר פתוח למסלול מבוסס-הכללים). |
| `stacked`    | צינור עיבוד מותאם אישית | שילוב מנועים בכל סדר (ראו להלן)                                                                                                                                         |

> מעבר למנועי המצבים שלעיל, המרשם כולל גם מנועים ייעודיים הניתנים להערמה —
> **CCR**, ‏**headroom**, ‏**ionizer** ו־**session-dedup** — המתועדים ב־
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

בחירת המצב נקבעת על ידי `getEffectiveMode()` ב־`open-sse/services/compression/strategySelector.ts`:

1. אם הדחיסה מושבתת: `"off"`
2. אם קיימת דריסה משולבת: שימוש בדריסה
3. אם נחצה סף ההפעלה האוטומטית: שימוש ב־`autoTriggerMode` (ברירת מחדל: `"lite"`)
4. אחרת: שימוש ב־`defaultMode`

### צינור העיבוד המוערם המוגדר כברירת מחדל

כאשר `mode: "stacked"` מוגדר במפורש, צינור העיבוד המוגדר כברירת מחדל משלב:

1. **RTK** — הסרת רעש מפלט פקודות (חיסכון של כ־80% בפלט מסוף)
2. **Caveman** — הסרת מילות מילוי ותמצות הפרוזה (כ־46% מהטקסט הנותר)
3. **Lite** — מעבר סופי להסרת רווחים ולביטול כפילויות

שילוב זה משיג **חיסכון של 78-95%** בהפעלות עתירות כלים.

### הגדרת צינורות עיבוד מוערמים

בתצורה המשולבת:

```json
{
  "compression": {
    "mode": "stacked",
    "pipeline": [
      { "engine": "rtk", "config": { "intensity": "aggressive" } },
      { "engine": "caveman", "config": { "intensity": "full" } },
      { "engine": "lite", "config": {} }
    ]
  }
}
```

ניתן להשמיט מנועים, להוסיף מנועים מותאמים אישית או לשנות את סדרם.

### העברת מצב

מנועים יכולים לקרוא מטא-נתונים מהקשר הבקשה (ב־`options`):

```ts
compress(body, config) {
  // קריאת מטא-נתונים ממנועים קודמים
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

המטא-נתונים הם **לקריאה בלבד** — מנועים אינם יכולים לשנות את הקשר הבקשה, אלא רק את פלט הגוף שלהם.

### מלכודות בסדר ההפעלה

| סדר המנועים                     | השפעה                                                                    |
| ------------------------------- | ------------------------------------------------------------------------ |
| RTK → Caveman → Lite            | **מומלץ** (תחילה מסיר רעש, לאחר מכן שפה ולבסוף רווחים)                   |
| Lite → RTK → Caveman            | גרוע — Lite מסיר רווחים מהפלט הגולמי, וגורם להתאמת התבניות של RTK להיכשל |
| Caveman → RTK                   | גרוע — Caveman עשוי לשכתב טקסט בדרכים ש־RTK אינו מזהה                    |
| כל סדר שבו `tool_results` ראשון | טוב יותר — פלט כלים הוא התוכן הרועש ביותר                                |

### מתי לא לבצע הערמה

הערמה אינה תמיד עדיפה:

- **הודעות פשוטות** (ללא פלט כלים) — Caveman או Lite יחיד מספיק
- **רגישות לעלות** — כל מנוע מוסיף זמן השהיה של כ־5-50ms
- **כלים מסוימים** — RTK לבדו מספיק בדרך כלל לפלט מעטפת

### בניית צינור עיבוד מותאם אישית

אין מרשם לצינורות עיבוד בעלי שם. צינור עיבוד מוערם הוא פשוט **מערך מוטבע
של שלבים** המועבר אל `applyStackedCompression()` (המיוצאת מתוך
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

כאשר לא מעבירים צינור עיבוד, ברירת המחדל היא `rtk(standard) → caveman(full)`.

כדי להגדיר אותו באמצעות תצורה, יש להגדיר `mode: "stacked"` ולספק את מערך השלבים תחת
`stackedPipeline` (הנקרא מתוך `config.stackedPipeline`):

```json
{
  "compression": {
    "mode": "stacked",
    "stackedPipeline": [
      { "engine": "rtk", "intensity": "aggressive" },
      { "engine": "caveman", "intensity": "full" }
    ]
  }
}
```

---

## מדיניות סנכרון עם פרויקטי המקור

מנועי הדחיסה של OmniRoute נותנים קרדיט לכמה פרויקטי מקור ב-README
("בהשראת RTK, Caveman, LLMLingua-2, Troglodita"). שאלה נפוצה של תורמים
היא: **כאשר RTK מוסיף מסנן כלים חדש או Caveman מוסיף חבילת כללים,
כיצד השינוי מגיע ל-OmniRoute?** סעיף זה הוא התשובה המוסמכת.

### עותקים מוטמעים לעומת מימושים עצמאיים

| מנוע                         | הקשר לפרויקט המקור                                                                                               | מיקום                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **מימוש מחדש עצמאי** (בהשראה, לא עותק)                                                                           | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **מימוש מחדש עצמאי** (בהשראה)                                                                                    | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | ברובו פנימי; רק המקודד `gcf/` **מוטמע בפועל** מתוך `gcf-typescript` (רישיון MIT, מסומן ב-SPDX, פרופיל כללי בלבד) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | מבוססי השראה (מניעים את המנועים `llmlingua` ו-`session-dedup`)                                                   | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

נקודה מרכזית: **RTK ו-Caveman הם מימושי TypeScript שנכתבו בחדר נקי עבור
_הרעיונות_ (כללי סינון, חבילות כללים), ולא עצי מקור מוטמעים.** אין עותק
של פרויקט המקור שאפשר לבצע ממנו `git pull` — וזו בדיוק הסיבה לכך שב-README כתוב
"בהשראת" ולא "מצורף".

### כיצד שיפורים מפרויקטי המקור ממוזגים

**אין מעקב אוטומטי אחר גרסאות של פרויקטי המקור ואין תווית `compression-sync`**
— וזאת בכוונה. מכיוון שהמנועים הם מימושים מחדש, מסנן של RTK או חבילת כללים של
Caveman מפרויקט המקור אינם ממוזגים כקוד; הם **מבוטאים מחדש כמסנן או ככלל חדש
בפורמט של OmniRoute עצמו** (ראו
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) ונכנסים לפי הצורך
באמצעות PR רגיל. נקודות ההרחבה שלעיל (מנוע מותאם אישית, חבילת שפה, מסנן RTK)
הן הדרך המאושרת לתרום שיפור כזה.

דוגמאות מהעת האחרונה לתהליך הזה בדיוק:

- מסנני RTK עבור פלט בנייה של Gradle ושל `dotnet` (v3.8.42)
- מסנני RTK עבור kubectl / docker-build / composer / gh (#2824)
- חבילת שפה אינדונזית ל-Caveman (#3975), וכן חבילות לגרמנית / צרפתית / יפנית / סינית

### Headroom (פרוקסי לדחיסת קלט)

Headroom הוא **פנימי לחלוטין** — תמונת מצב מקובעת ומוטמעת של המקודד `gcf`,
יחד עם שכבות `smartcrusher` / `toon` / `tabular` של OmniRoute. אין פרויקט מקור
פעיל שיש לעקוב אחריו מעבר לעותק המוטמע; עדכונים ל-`gcf` מרועננים ידנית כאשר
המקודד משתנה ונבדקים מחדש מול שער תקציב הדחיסה (`check:compression-budget`).

### הצעת שיפור בהשראת פרויקט מקור

1. **אל תטמיעו עותק** — בטאו מחדש את הכלל או המסנן מפרויקט המקור בפורמט של OmniRoute.
2. הוסיפו אותו באמצעות נקודת ההרחבה המתאימה להלן (חבילת שפה, מסנן RTK או
   מנוע מותאם אישית).
3. הפנו לפרויקט המקור בתיאור ה-PR (לצורך ייחוס), במקום להעתיק את קוד המקור
   שלו הנושא רישיון.
4. כללו בדיקות וודאו ששער `check:compression-budget` עדיין עובר בהצלחה.

---

## הוספת סגנון פלט

סגנונות פלט (ראו את [טבלת הקטלוג במדריך](./COMPRESSION_GUIDE.md#output-styles-catalog))
הם המקבילה בצד התגובה למנועי הקלט: במקום לדחוס את מה שאתם
שולחים, הם מנחים את המודל להפיק פלט חסכוני יותר. הרישום נמצא ב־
`OUTPUT_STYLE_CATALOG` בקובץ `open-sse/services/compression/outputStyles/catalog.ts`, ו־
**רשומה אחת בקטלוג היא כל התכונה**: המזריק, לוח ההגדרות בלוח הבקרה,
השמירה והטלמטריה — כולם עוברים על הקטלוג; אין רשימה אחרת שצריך לעדכן.

1. **הוסיפו רשומה אחת ל־`OUTPUT_STYLE_CATALOG`** עם `id`, `label`, `description` ושלוש
   ה־`levels` באנגלית (`lite`, `full`, `ultra`). כל רמה חייבת להסתיים ב־
   `${SHARED_BOUNDARIES}`, כדי שקוד, נתיבים, פקודות, שגיאות וכתובות URL יישארו ללא שינוי.
   טקסט ההנחיה חייב להיות **סטטי ודטרמיניסטי** עבור כל
   `(id, level, language)` — `${SHARED_BOUNDARIES}` הוא האינטרפולציה היחידה המותרת.
2. **תרגמו אותו.** כללו לפחות בלוק `pt-BR` תחת `i18n`; הסגנונות `ponytail` ו־
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) הם המבנה לדוגמה. סגנון שנועד במכוון
   לשפה יחידה מגדיר במקום זאת `locale` (כמו `terse-cjk` → `zh`), ואז הוא
   מוצע רק תחת אזור זה.
3. **עדכנו את בדיקת המטריצה** — הוסיפו את שפות הסגנון ל־`BASELINE_LANGUAGES` בקובץ
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. שער הבדיקה מכשיל כל סגנון חדש
   שאינו מוגבל לפי אזור ושחסרים לו התרגומים הנדרשים, אלא אם הוא כולל
   רשומת `KNOWN_ENGLISH_ONLY` מפורשת עם סוגיית מעקב.
4. **הוסיפו בדיקה ייעודית לסגנון** לפי הדגם של
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: מבנה הקטלוג, סעיף
   הגבולות לכל רמה, ונקודת עיגון שמוודאת שכל תרגום כתוב בשפה שלו
   ולא הועתק מאנגלית.
5. **ייחוס**: אם הסגנון הותאם מפרויקט חיצוני, תנו לו קרדיט בהערת מקור
   ברשומה (למשל `i-have-adhd` → ayghri/i-have-adhd, MIT) — בהתאם לאותו
   כלל המופיע לעיל תחת "הצעת שיפור בהשראת פרויקט חיצוני".

אין צורך בשינוי בממשק המשתמש, בסכמה או בטלמטריה — ממשקים אלה מרונדרים מתוך הקטלוג.

---

## שיטות עבודה מומלצות

### פיתוח מנועים

1. **ממשו תמיד את `validateConfig`** — מנועים ללא אימות גורמים לכשלים שקטים
2. **הגדירו `targetLatencyMs` מציאותי** — בורר האסטרטגיה משתמש בו לבחירת מנועים
3. **השתמשו ב־`getConfigSchema` עבור לוח הבקרה** — לעולם אל תסתירו הגדרות מהמשתמשים
4. **תמכו ב־`stackable: true` אם המנוע שלכם טהור** — אין לערום מנועים בעלי תופעות לוואי
5. **כתבו בדיקות בתוך הקובץ** — צריך להיות אפשר לאמת מנועים בתוך פחות משנייה אחת

### פיתוח חבילות שפה

1. **התחילו בעוצמת `lite`** — הכללים שלכם צריכים להיות בטוחים בהגדרה הנמוכה ביותר
2. **השתמשו ב־`context` כדי לתחום את הכללים** — כללים המוגבלים ל־`user` אינם יכולים להשפיע בטעות על הנחיות מערכת
3. **הימנעו מלכידת מפתחות JSON** — הביטוי `\\bword\\b` עלול להתאים בתוך JSON ולשבש נתונים מובְנים
4. **בדקו מקרי קצה** — קלט ריק, Unicode, טקסט RTL ואמוג'י
5. **השתמשו בחבילות קיימות כתבניות** — `en/filler.json` הוא הדוגמה המפותחת ביותר

### תכנון צינור עיבוד

1. **בצעו אפיון ביצועים לפני מיטוב** — מדדו תחילה באמצעות `compression_stats`
2. **העדיפו הרכבה על פני מימוש מחדש** — הרחיבו את כללי Caveman לפני כתיבת מנוע חדש
3. **תעדו את ההיגיון שמאחורי הסדר** — הסבירו בהערה מדוע מנוע A מופעל לפני מנוע B
4. **בדקו בכל 3 רמות העוצמה** — `lite` מהירה אך מאבדת מידע, ו־`ultra` איטית אך מדויקת

---

## עיון: מנועים מובנים

| מזהה מנוע            | ניתן לשילוב | ברירת המחדל של stackPriority | יעדים                          |
| -------------------- | ----------- | ---------------------------- | ------------------------------ |
| `lite`               | כן          | 5                            | הודעות, תוצאות כלים            |
| `rtk`                | כן          | 10                           | תוצאות כלים                    |
| `standard` (caveman) | כן          | 20                           | הודעות, תוצאות כלים, בלוקי קוד |
| `aggressive`         | כן          | 30                           | הודעות                         |
| `ultra`              | כן          | 40                           | הודעות, בלוקי קוד              |

### ראו גם

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — סקירה כללית של צינור העיבוד
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — עיון ברישום המנועים
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — מפרט תבנית הכללים
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — פרטי חבילות השפה
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — מנוע RTK ומסננים מותאמים אישית
- מקור: `open-sse/services/compression/` (117 קבצים, ~250KB)
