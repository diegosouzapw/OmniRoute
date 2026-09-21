# Delegated Context Editing (Anthropic) (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

**עריכת הקשר** מואצלת היא תכונת ניהול הקשר הייחודית ל-Claude. בניגוד למנועי
הדחיסה המקומיים של OmniRoute‏ (Caveman, RTK, LLMLingua, צינורות עיבוד משולבים) — המשכתבים את גוף הבקשה
_לפני_ שהוא יוצא מה-proxy — עריכת הקשר מבקשת מה-**ספק** לנקות בלוקים מיושנים של
שימוש בכלי / תוצאת כלי מחלון ההקשר הפעיל שלו. OmniRoute רק מצרף פרמטר לגוף
(`context_management.edits[]`); Claude מבצע את הניקוי בפועל בהתאם לטוקנייזר שלו.

זוהי מטבעה יכולת מואצלת: ספקים אחרים דוחים את הפרמטר, ולכן OmniRoute מגביל
אותה בקפדנות ל-Claude ולממסרים התואמים ל-Claude Code.

מקור האמת: `open-sse/config/contextEditing.ts` (מזהי אסטרטגיות, הזרקה לגוף, חילוץ
טלמטריה), `open-sse/executors/base.ts` (שער הזרקה + נסיגה במקרה של 400), וכן
`open-sse/services/compression/types.ts` (מבנה התצורה + ברירת המחדל).

## מה `clear_tool_uses` עושה

OmniRoute מזריק עריכה יחידה לגוף היוצא של Anthropic Messages:

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — מזהה האסטרטגיה המתוארך של Anthropic‏ (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — ברגע שמספר טוקני הקלט של הבקשה חורג מסף זה, Claude מתחיל
  לנקות זוגות ישנים של שימוש בכלי/תוצאת כלי (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, ברירת המחדל של Anthropic).
- `keep.value: 3` — N הזוגות האחרונים של שימוש בכלי/תוצאת כלי נשמרים ללא שינוי
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

גרסת הבטא מפורסמת באמצעות הכותרת `anthropic-beta: context-management-2025-06-27`, שאותה
OmniRoute כבר שולח בבקשות Claude.

ההזרקה מתבצעת באמצעות `applyContextEditingToBody()` והיא **אידמפוטנטית**: אם עריכת `clear_tool_uses`
כבר קיימת בגוף (נוספה בקריאה קודמת או סופקה על ידי הלקוח), הגוף
נשאר ללא שינוי. אם קיימת גם עריכת `clear_thinking_20251015`, OmniRoute מבצע מיון יציב כך שעריכת
`clear_thinking` תועבר להתחלה, משום ש-Anthropic דורשת ש-`clear_thinking` יקדים את
`clear_tool_uses` במערך `edits[]`.

## מתג ההפעלה לכל שילוב

עריכת הקשר **כבויה כברירת מחדל** ומחייבת הצטרפות מפורשת. המתג הוא ערך בוליאני יחיד הנכלל
בתצורת הדחיסה:

- מפתח ההגדרה: `contextEditing.enabled` (camelCase — **לא** `context_editing` / `context-editing`).
- טיפוס: `ContextEditingConfig { enabled: boolean }` בתוך
  `open-sse/services/compression/types.ts`.
- ברירת מחדל: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- סכמת Zod:‏ `contextEditingConfigSchema` בתוך `src/shared/validation/compressionConfigSchemas.ts`.
- אחסון: נשמר יחד עם שאר הגדרות הדחיסה (מנורמל בתוך
  `src/lib/db/compression.ts`).

בלוח הבקרה, המתג נמצא במרכז הדחיסה
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) וכותב
`{ contextEditing: { enabled: … } }` בחזרה באמצעות `saveSettings()`. מכיוון שהוא נכלל באובייקט
הגדרות הדחיסה, הוא משתלב עם פרופיל הדחיסה לכל שילוב במקום להיות
ממשק עצמאי לחלוטין — התצורה כוללת רק את דגל ההפעלה/כיבוי; כל ערכי הסף (`trigger`,
`keep`) הם הקבועים המתועדים לעיל.

## הגבלה ל-Claude בלבד

ההזרקה מתבצעת רק עבור Claude אמיתי או עבור ממסרים תואמי Claude Code. תנאי הסף ב-
`open-sse/executors/base.ts` הוא:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — מפתח Anthropic אמיתי/OAuth.
- `isClaudeCodeCompatible(this.provider)` — ממסרים שמזהה הספק שלהם מתחיל בקידומת
  `anthropic-compatible-cc-` (הם מצהירים על תאימות ל-Claude Code, ולכן אלה הממסרים בעלי הסבירות
  הגבוהה ביותר לקבל את גרסת הבטא). ראו `open-sse/services/provider.ts`.

מוחרגים **במכוון**:

- `claude-web` — ממסר דפדפן בעל מבנה בקשה `create_conversation_params`, שלעולם אינו רואה את
  `context_management`.
- ממסרי `anthropic-compatible-*` כלליים (ללא הקידומת `-cc-`) — נקודות קצה של צד שלישי עם
  תמיכה לא ודאית בגרסת הבטא.

ספקים שאינם Claude לעולם אינם מקבלים את הפרמטר `context_management`, גם כאשר המתג מופעל.

## מנגנון הנסיגה במקרה של 400 / כיסוי ממסרים

ממסר תואם-Claude עשוי להצהיר על תמיכה בגרסת הבטא, אך עדיין לדחות את הפרמטר `context_management`
באמצעות HTTP 400. כדי לפעול באופן מדורג במקום להכשיל את הבקשה, המבצע מסיר את
הפרמטר ומנסה שוב את אותה כתובת URL **פעם אחת**:

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

התנהגות:

1. מופעל רק בתגובה מסוג `400`, כאשר עריכת הקשר מופעלת וגוף הבקשה אכן מכיל את
   `context_management`.
2. גוף תשובת ה-400 נקרא באמצעות `clone()`, כך שהתשובה המקורית נשארת ללא שינוי עבור הנתיב שאינו
   תואם.
3. טקסט השגיאה חייב להתאים ל-`/context[_-]management|context editing/i` — שגיאת 400 שאינה קשורה
   (למשל `max_tokens must be >= 1`) **אינה** מפעילה את מנגנון הנסיגה; השגיאה המקורית מועברת הלאה.
4. במקרה של התאמה, הוא מגדיר `contextEditingDisabled = true` (מה שמונע הזרקה מחדש אם
   `transformedBody` חדש נבנה מאוחר יותר עבור ניסיון חוזר/כתובת URL חלופית), מוחק את
   `context_management`, חותם מחדש על הגוף עבור Claude / ממסרים תואמי Claude Code
   (`signRequestBody`), ומנסה שוב את אותה כתובת URL פעם אחת.

Claude אמיתי נושא את גרסת הבטא בתוך `ANTHROPIC_BETA_BASE` ואינו מגיע לנתיב נסיגה זה.

## טלמטריית `applied_edits`

לאחר תשובת Claude, ‏OmniRoute מתעד כמה הקשר הספק ניקה בפועל. המידע הזה
**אינו** מוזרם — הוא מחולץ מגוף התשובה שאינה מוזרמת, על בסיס המאמץ המיטבי, ולעולם אינו
משפיע על התשובה (כשלים בטלמטריה נבלעים).

- חילוץ: `extractContextEditingTelemetry(responseBody)` בתוך `open-sse/config/contextEditing.ts`.
  הוא בודק את `applied_edits` בשלושה מיקומים (כאמצעי הגנה מפני שינויים במבנה התשובה):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- השדות הנקראים מכל רשומה: `cleared_input_tokens` ו-`cleared_tool_uses`
  (snake_case, בפורמט המקורי של Anthropic), עם `clearedInputTokens` / `clearedToolUses` כחלופות camelCase.
- מוחזר `null` כאשר לא נמצא מערך `applied_edits`, או כאשר שום דבר לא נוקה בפועל.

מבנה האישור הוא `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
התיעוד מתבצע בתוך `open-sse/handlers/chatCore.ts` (מוגבל ל-`provider === "claude"`) באמצעות
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), שכותב רשומת ניתוח דחיסה
המתויגת כך:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = מספר אסימוני הקלט שנוקו
- `request_id` עם הסיומת `::context-editing`

כך שניקוי מואצל מופיע בניתוחי הדחיסה לצד המנועים המקומיים, תחת תווית המנוע
`context-editing`, וניתן להבדיל בינו לבין החיסכון של RTK/Caveman/LLMLingua.

## הקשר למנועי הדחיסה המקומיים

| היבט            | מנועים מקומיים (Caveman / RTK / LLMLingua / stacked) | עריכת הקשר מואצלת                                 |
| --------------- | ---------------------------------------------------- | ------------------------------------------------- |
| היכן מתבצע      | ב-OmniRoute, לפני שהבקשה יוצאת משרת ה-proxy          | אצל הספק (Claude), בצד השרת                       |
| מה נערך         | טקסט של prompt / context / tool-result               | בלוקים ישנים של tool-use / tool-result            |
| תחולת הספקים    | כל הספקים                                            | `claude` + `anthropic-compatible-cc-*` בלבד       |
| מתג הפעלה       | הגדרות מצב הדחיסה                                    | `contextEditing.enabled`                          |
| מצב כשל         | Fail-open (הטקסט המקורי)                             | נסיגה במקרה 400: הסרת הפרמטר וניסיון נוסף פעם אחת |
| טלמטריית חיסכון | `engine: <engine id>`                                | `engine: "context-editing"`                       |

השניים משלימים זה את זה: המנועים המקומיים דוחסים את הבתים ש-OmniRoute שולח; עריכת הקשר מאפשרת ל-Claude
לגזום את ההקשר המצטבר בין סבבים. ניתן להפעיל אותם יחד.

## ראו גם

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — מרשם המנועים ומנועי הדחיסה
  המקומיים
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — דחיסת פקודות/פלט כלים
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — דחיסת תיאורי MCP וצמצום
  מספר הכלים
- מקור: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
