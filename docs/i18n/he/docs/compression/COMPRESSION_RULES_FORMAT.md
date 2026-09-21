# Compression Rules Format (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

כללי דחיסה הם קובצי JSON שנטענים בזמן ריצה. הם מבוססי נתונים בלבד במכוון, כך שניתן לסקור חבילות שפה חדשות ומסנני פקודות RTK מבלי לשנות את קוד המנוע.

> **סכמה קנונית (מקור האמת):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (טיוטת JSON Schema ‏2020-12).
> הדוגמאות שלהלן נועדו להמחשה — במקרה של ספק, אמתו את החבילה שלכם מול `_schema.json`.

## חבילות כללים של Caveman

חבילות הכללים של Caveman נמצאות תחת:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

כל חבילה מכילה החלפות שמוחלות על טקסט רגיל לאחר בידוד האזורים המוגנים.

```json
{
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "Convert verbose questions into direct requests."
    }
  ]
}
```

### שדות Caveman

| שדה                      | חובה | תיאור                                                          |
| ------------------------ | ---- | -------------------------------------------------------------- |
| `language`               | כן   | מפתח שפה דמוי BCP-47, כגון `en`, `pt-BR`, `es`                 |
| `category`               | כן   | שם קובץ/קטגוריה של החבילה, לדוגמה `filler` או `dedup`          |
| `rules`                  | כן   | מערך של כללי החלפה באמצעות ביטויים רגולריים                    |
| `rules[].name`           | כן   | שם יציב של הכלל                                                |
| `rules[].pattern`        | כן   | מקור של ביטוי רגולרי ב-JavaScript                              |
| `rules[].flags`          | לא   | דגלי ביטוי רגולרי של JavaScript; ברירת המחדל היא `gi`          |
| `rules[].replacement`    | לא   | מחרוזת החלפה או ערך חלופי כאשר אין התאמה ב-`replacementMap`    |
| `rules[].replacementMap` | לא   | החלפות ייעודיות להתאמה, שממופות לפי הטקסט המותאם לאחר נרמול    |
| `rules[].context`        | לא   | `all`, `user`, `assistant` או `system`; ברירת המחדל היא `all`  |
| `rules[].category`       | לא   | `filler`, `context`, `structural`, `dedup`, `terse` או `ultra` |
| `rules[].minIntensity`   | לא   | `lite`, `full` או `ultra`; ברירת המחדל היא `lite`              |
| `rules[].description`    | לא   | תקציר קריא לאדם של הכלל                                        |

השתמשו ב-`flags` כאשר יש חשיבות להתאמה תלוית רישיות, לדוגמה להסרת תווית לפני טקסט באותיות קטנות מבלי להסיר את `the OpenAI API`. השתמשו ב-`replacementMap` כאשר ביטוי רגולרי אחד כולל כמה חלופות שזקוקות לפלטים שונים; כך חבילות כללי JSON נשארות מבוססות נתונים בלבד, תוך שימור ההתנהגות של פונקציות ההחלפה המובנות והעשירות יותר של TypeScript.

## חבילות מסנני RTK

מסנני RTK נמצאים תחת:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

כל מסנן מתאר כיצד לזהות ולדחוס משפחה של פלטי פקודות.

```json
{
  "id": "test-vitest",
  "label": "Vitest output",
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      {
        "pattern": "All tests passed",
        "message": "vitest: ok",
        "unless": "FAIL|Error:"
      }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: ok",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "keeps failing tests",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### שדות RTK

| שדה                        | חובה | תיאור                                                                        |
| -------------------------- | ---- | ---------------------------------------------------------------------------- |
| `id`                       | כן   | מזהה מסנן יציב                                                               |
| `label`                    | כן   | שם קריא בלוח הבקרה                                                           |
| `category`                 | כן   | משפחת המסנן: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | לא   | עדיפות גבוהה יותר מנצחת כאשר מספר מסננים תואמים                              |
| `match.outputTypes`        | לא   | מזהי פלט של הגלאי שבוחרים במסנן זה                                           |
| `match.commands`           | לא   | אסימוני פקודות שבוחרים במסנן זה                                              |
| `match.patterns`           | לא   | תבניות ביטויים רגולריים שבוחרות במסנן זה מתוך טקסט הפלט                      |
| `rules.stripAnsi`          | לא   | הסרת רצפי מילוט ANSI לפני שלבי הביטויים הרגולריים                            |
| `rules.replace`            | לא   | החלפות ביטויים רגולריים מסודרות המוחלות שורה אחר שורה                        |
| `rules.matchOutput`        | לא   | כללי פלט שעוצרים את העיבוד מוקדם, עם תנאי `unless` אופציונלי                 |
| `rules.includePatterns`    | לא   | שורות שיש להעדיף לשמר                                                        |
| `rules.dropPatterns`       | לא   | שורות שיש להסיר כרעש                                                         |
| `rules.collapsePatterns`   | לא   | שורות תואמות חוזרות שניתן לכווץ                                              |
| `rules.deduplicate`        | לא   | כיווץ שורות מנורמלות כפולות                                                  |
| `rules.truncateLineAt`     | לא   | מגבלת תווים לכל שורה, בטוחה ל-Unicode                                        |
| `rules.maxLines`           | לא   | מספר השורות המרבי שיישמר לפני שימור הסוף                                     |
| `rules.headLines`          | לא   | שורות מתחילת הפלט שנשמרות במהלך הקיטוע                                       |
| `rules.tailLines`          | לא   | שורות מסוף הפלט שנשמרות לצורך הקשר עדכני                                     |
| `rules.onEmpty`            | לא   | הודעת ברירת מחדל כאשר הסינון מסיר את כל התוכן                                |
| `rules.filterStderr`       | לא   | נרמול קידומות stderr נפוצות לפני שלבי הסינון הבאים                           |
| `preserve.errorPatterns`   | לא   | שורות שגיאה שאמורות לשרוד את הקיטוע                                          |
| `preserve.summaryPatterns` | לא   | שורות סיכום שאמורות לשרוד את הקיטוע                                          |
| `tests[]`                  | לא   | דוגמאות אימות מובנות המשמשות את שער האימות של RTK                            |

RTK מחיל שלבים הצהרתיים בסדר הבא: `stripAnsi`,‏ `filterStderr`,‏ `replace`,
`matchOutput`,‏ `dropPatterns`/`includePatterns`,‏ `truncateLineAt`,‏ `headLines`/`tailLines`,
`maxLines` ו-`onEmpty`.

ניתן לטעון מסננים מותאמים אישית מתוך:

1. קובצי `.rtk/filters.json` של הפרויקט, רק לאחר שקיים גיבוב תואם בקובץ `.rtk/trust.json`, או כאשר
   `trustProjectFilters` מופעל.
2. הקובץ הגלובלי `DATA_DIR/rtk/filters.json`.
3. מסננים מובנים.

קבצים מותאמים אישית של הפרויקט או ברמה הגלובלית עשויים להכיל אובייקט מסנן יחיד או מערך של אובייקטי מסנן. מסננים מותאמים אישית
לא תקינים מדולגים תוך הפקת מידע אבחוני; מסננים מובנים לא תקינים גורמים לכשל באימות.

קובץ האמון של הפרויקט:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

דריסת הסביבה `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` נותנת אמון במסנני הפרויקט ללא
גיבוב, ויש להגביל את השימוש בה לפיתוח מקומי מבוקר.

## כללי בטיחות

- יש לשמור על אידמפוטנטיות של הכללים: הפעלת אותו מסנן פעמיים לא אמורה להשחית את הפלט.
- יש לשמר במידת האפשר את הנוסח המדויק של שגיאות, נתיבי קבצים, מספרי שורות וסיכומי פקודות.
- יש להימנע מכללים שמשנים בלוקי קוד, מטעני JSON, כתובות URL או סודות.
- יש להוסיף כיסוי בדיקות יחידה למשפחות פקודות חדשות בבדיקות הגלאי/המסנן.
- יש להוסיף דוגמאות `tests[]` לכל מסנן מובנה ולמסננים מותאמים אישית משותפים.

## אימות

חבילות כללים מאומתות לפני השימוש. חבילות Caveman מובנות ומסנני RTK מובנים נכשלים מיד
במהלך האימות, כך שנכסי הפצה פגומים מתגלים לפני המשלוח. מסנני RTK מותאמים אישית
מדולגים עם מידע אבחוני כאשר ניתוח התחביר או אימות האמון נכשלים.

אימות ממוקד:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
