# Reasoning Replay Cache (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **מקור האמת:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **עודכן לאחרונה:** 2026-06-28 — v3.8.40

OmniRoute לוכד את `reasoning_content` של המסייע שנוצר על ידי מודלים במצב חשיבה, ומשמיע אותו מחדש באופן שקוף בבקשות מרובות תורות כאשר הספק במעלה הזרם דורש זאת. כך נמנעות שגיאות HTTP 400 שספקים מחמירים מחזירים כאשר בהיסטוריית השיחה של הלקוח חסר תהליך החשיבה מהתור הקודם.

## מדוע זה קיים

מספר ספקים במצב חשיבה דוחים תור המשך אלא אם **הודעת המסייע הקודמת כוללת את ה-`reasoning_content` המקורי**. הספק במעלה הזרם מחזיר 400 עם הודעות כגון:

```
פרמטר שגוי: יש להעביר בחזרה ל-API את reasoning_content במצב החשיבה.
```

אולם לקוחות טיפוסיים (Cursor, Cline, Roo Code, OpenAI SDK) מסירים את `reasoning_content` מההיסטוריה שהם שולחים מחדש. OmniRoute משחזר אותו ממטמון בצד השרת, כך שהבקשה שהספק במעלה הזרם מקבל תהיה עקבית. גיליון #1628 הציג את ההתמדה ההיברידית בזיכרון/SQLite, כדי שהמטמון ישרוד הפעלות מחדש של התהליך.

## ארכיטקטורה

```
תור N (העוזר יוצר):
  → התגובה מכילה reasoning_content + tool_calls
  → אם requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      כותבת (לזיכרון + למסד הנתונים), עם מפתח המבוסס על כל tool_call.id
  → העברת התגובה ללקוח (שעשוי לשמור את ההנמקה או לא)

תור N+1 (הלקוח שולח הודעת המשך):
  → המתרגם מזהה: requiresReasoningReplay(provider, model) === true
  → עבור כל הודעת עוזר עם tool_calls וללא reasoning_content:
      lookupReasoning(toolCalls[0].id) → זיכרון → מסד נתונים
      נמצאה התאמה  → msg.reasoning_content = cached; recordReplay()
      לא נמצאה התאמה → msg.reasoning_content = "" (חלופת תאימות לאחור עבור גרסאות ישנות יותר של DeepSeek)
  → השירות במעלה הזרם מקבל היסטוריה עקבית → אין שגיאת 400
```

הלכידה מתבצעת ב-`open-sse/handlers/chatCore.ts` (בשני מקומות, בשתי הקריאות אל `cacheReasoningFromAssistantMessage`). ההפעלה החוזרת מתבצעת ב-`open-sse/translator/index.ts` לאחר התאמת הסכימה אך לפני השליחה.

תורות רגילים של העוזר (ללא קריאה לכלי) מקבלים מפתח באופן שונה: `buildAssistantMessageCacheKey()` מחשבת תקציר של תחום ההפעלה יחד עם התמליל המנורמל בפורמט OpenAI עד לאותו תור, מכיוון ש-DeepSeek דורש את ההנמקה של _כל_ תור קודם ברגע ש-`tools` קיים. עבור יעדים של Responses API (לדוגמה `opencode-go/deepseek-v4-flash`, שמנותב אל `/responses`), גוף הבקשה במעלה הזרם מכיל `input`, ולא `messages`, ולכן `translateRequest()` ‏(`open-sse/translator/index.ts`) מדווחת באמצעות אפשרות callback על תמליל הביניים שעבורו היא חישבה תקציר, ואתרי הלכידה מחשבים תקציר של אותו תמליל. מעבר ההפעלה החוזרת של Responses פועל על ייצוג הביניים של OpenAI עבור כל פורמט מקור, ולכן ההפעלה החוזרת מתבצעת גם עבור לקוחות Anthropic Messages ‏(Claude → OpenAI → Responses).

## אחסון — זיכרון היברידי + SQLite

הנתיב החם משתמש ב-`Map` בזיכרון (LRU לפי זמן יצירה), המגובה בטבלת SQLite לצורך התאוששות מקריסה והצגת מידע בלוח המחוונים.

| שכבה       | מימוש                                         | מטרה                                                   |
| ---------- | --------------------------------------------- | ------------------------------------------------------ |
| זיכרון     | `Map` ב-`open-sse/services/reasoningCache.ts` | חיפושים מהירים, מפנה את הרשומה הישנה ביותר בהגעה ל-200 |
| מסד נתונים | טבלת `reasoning_cache` (`src/lib/db/`)        | נשמרת בין הפעלות מחדש ומשמשת ליצירת נתונים סטטיסטיים   |

כתיבות מתבצעות בשתי השכבות. קריאות בודקות תחילה את הזיכרון ולאחר מכן פונות למסד הנתונים כחלופה (תוצאות שנמצאו במסד הנתונים מקודמות בחזרה לזיכרון). כשלים במסד הנתונים אינם קריטיים — המטמון בזיכרון ממשיך לשרת את הנתיב החם.

**ברירות מחדל:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- מספר רשומות מרבי בזיכרון: `200` (`MAX_MEMORY_ENTRIES`)
- פינוי: `createdAt` הישן ביותר תחילה

## סכמת מסד הנתונים

מיגרציה: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

אינדקסים: `expires_at`,‏ `provider`,‏ `model`,‏ `created_at`. הערך `expires_at` מאוחסן כמספר השניות בתקופת Unix; שכבת ה-SELECT מנרמלת ערכי טקסט ישנים באמצעות `EXPIRES_AT_EPOCH_SQL`.

## זיהוי ספק / מודל

הפעלה חוזרת מופעלת כאשר `requiresReasoningReplay(provider, model)` מחזירה `true`. הפונקציה בודקת שתי רשימות ב־`open-sse/services/reasoningCache.ts`.

**מזהי ספקים (התאמה מדויקת, ללא תלות ברישיות):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**תבניות ביטויים רגולריים למודלים (ללא תלות ברישיות):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` ו־`/deepseek[-/]?v4[-.]pro/i` ‏(V4 Flash / Pro, עם סיומת `-free` אופציונלית)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

הוספת ספק/מודל קפדני חדש מחייבת הוספה לאחת מהרשימות האלה וכתיבת בדיקת יחידה שמוודאת את הזרקת ההפעלה החוזרת. בתיאור ה־PR יש לצטט את מחרוזת שגיאת ה־400 המדויקת מהמקור שהניעה את השינוי.

## API מסוג REST

המטמון חושף שתי נקודות קצה תחת `src/app/api/cache/reasoning/route.ts`. שתיהן דורשות אימות ניהולי (`isAuthenticated` מתוך `@/shared/utils/apiAuth`).

| שיטה   | נקודת קצה                                                 | תיאור                                               |
| ------ | --------------------------------------------------------- | --------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | סטטיסטיקות + רשומות מחולקות לעמודים                 |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | רשימה מסוננת (`limit` מוגבל לטווח `[1, 200]`)       |
| DELETE | `/api/cache/reasoning`                                    | ניקוי הכול (זיכרון + DB) ואיפוס מוני הפגיעות/החטאות |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | ניקוי רשומות עבור ספק אחד בלבד                      |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | מחיקת רשומה יחידה                                   |

**מבנה תגובת GET:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## הערות תפעוליות

- **ניקוי:** `cleanupReasoningCache()` מסירה רשומות שפג תוקפן מהזיכרון ומריצה `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. תהליכי בדיקת תקינות מפעילים אותה מעת לעת.
- **התאוששות מקריסה:** לאחר הפעלה מחדש, הזיכרון ריק, אך ה־DB עדיין מכיל רשומות שטרם פג תוקפן. החיפוש הראשון עבור `tool_call_id` נתון הוא פגיעה ב־DB; החיפושים הבאים הם פגיעות בזיכרון.
- **אין הנמקה, אין מטמון:** `cacheReasoningFromAssistantMessage` מחזירה `0` כאשר הודעת המסייע אינה כוללת שדה `reasoning_content` / `reasoning`, כך שתגובות ללא חשיבה אינן כרוכות בעלות כלשהי.
- **גם הכתיבה מותנית:** שני אתרי הקריאה ב־`chatCore.ts` (ללא הזרמה ועם הזרמה) קוראים ל־`cacheReasoningFromAssistantMessage()` רק כאשר `requiresReasoningReplay(provider, model)` היא `true` — אותו תנאי שהצד הקורא בודק. התקנות שלעולם אינן משתמשות בספק שמחייב הפעלה חוזרת אינן נושאות עוד בעלות הכתיבה, עדכון האינדקס וה־try/catch עבור כל תגובה שמכילה הנמקה.
- **ספקים שאינם קפדניים:** כאשר `requiresReasoningReplay` היא `false` ותבנית היעד היא OpenAI, המתרגם **מסיר** כל שדה `reasoning_content` מההודעות היוצאות — OpenAI Chat Completions אינו מקבל אותו.

## ראו גם

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — מפסקי זרם, תקופות צינון, חסימות מודלים
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — אבחון שגיאות 400 משירותים במעלה הזרם
- קוד מקור: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- מיגרציה: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- נתיב API: `src/app/api/cache/reasoning/route.ts`
- דיווח מקורי: #1628
