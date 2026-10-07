# Reasoning Replay Cache (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **מקור האמת:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **עודכן לאחרונה:** 2026-06-28 — v3.8.40

OmniRoute לוכד את `reasoning_content` של המסייע, המופק על ידי מודלים במצב חשיבה, ומשחזר אותו באופן שקוף בבקשות מרובות-תורים כאשר הספק במעלה הזרם דורש זאת. כך נמנעות שגיאות HTTP 400 שספקים מחמירים מחזירים כאשר בהיסטוריית השיחה של הלקוח חסר תהליך החשיבה מהתור הקודם.

## מדוע זה קיים

כמה ספקים במצב חשיבה דוחים תור המשך אלא אם **הודעת המסייע הקודמת כוללת את ה-`reasoning_content` המקורי**. השירות במעלה הזרם מחזיר שגיאת 400 עם הודעות כגון:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

אולם לקוחות נפוצים (Cursor, Cline, Roo Code, OpenAI SDK) מסירים את `reasoning_content` מההיסטוריה שהם שולחים מחדש. OmniRoute משחזר אותו ממטמון בצד השרת, כך שהבקשה שהשירות במעלה הזרם מקבל תהיה עקבית. תקלה #1628 הציגה את ההתמדה ההיברידית בזיכרון/SQLite, כדי שהמטמון ישרוד הפעלות מחדש של התהליך.

## ארכיטקטורה

```
תור N (המסייע מייצר):
  → התגובה מכילה reasoning_content + tool_calls
  → אם requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      כותב (לזיכרון + למסד הנתונים), עם מפתח המבוסס על כל tool_call.id
  → מעביר את התגובה ללקוח (שעשוי לשמור את תהליך החשיבה או לא)

תור N+1 (הלקוח שולח בקשת המשך):
  → המתרגם מזהה: requiresReasoningReplay(provider, model) === true
  → עבור כל הודעת מסייע עם tool_calls וללא reasoning_content:
      lookupReasoning(toolCalls[0].id) → זיכרון → מסד נתונים
      פגיעה  → msg.reasoning_content = cached; recordReplay()
      החטאה → msg.reasoning_content = "" (נסיגה מדור קודם עבור גרסאות ישנות יותר של DeepSeek)
  → השירות במעלה הזרם מקבל היסטוריה עקבית → אין שגיאת 400
```

הלכידה מתבצעת ב-`open-sse/handlers/chatCore.ts` (בשני מקומות, בשני אתרי הקריאה של `cacheReasoningFromAssistantMessage`). השחזור מתבצע ב-`open-sse/translator/index.ts` לאחר כפיית הסכמה, אך לפני השיגור.

תורי מסייע רגילים (ללא קריאה לכלים) מקבלים מפתחות באופן שונה: `buildAssistantMessageCacheKey()` מחשב תקציר של תחום ההפעלה בצירוף התמליל המנורמל בפורמט OpenAI עד לאותו תור, משום ש-DeepSeek דורש את תהליך החשיבה של _כל_ תור קודם כאשר `tools` קיים. עבור יעדים של Responses API (לדוגמה `opencode-go/deepseek-v4-flash`, המנותב אל `/responses`), גוף הבקשה במעלה הזרם מכיל `input` ולא `messages`, ולכן `translateRequest()` (`open-sse/translator/index.ts`) מדווח באמצעות אפשרות callback על תמליל הציר שהוא תקצר, ואתרי הלכידה מתקצרים את אותו תמליל. מעבר השחזור של Responses פועל על ציר OpenAI עבור כל פורמט מקור, ולכן מתבצע שחזור גם עבור לקוחות Anthropic Messages‏ (Claude → OpenAI → Responses).

## אחסון — זיכרון היברידי + SQLite

הנתיב החם משתמש ב-`Map` בזיכרון (LRU לפי זמן היצירה), המגובה בטבלת SQLite לצורך התאוששות מקריסה ונראות בלוח הבקרה.

| שכבה       | מימוש                                            | מטרה                                                   |
| ---------- | ------------------------------------------------ | ------------------------------------------------------ |
| זיכרון     | `Map` בתוך `open-sse/services/reasoningCache.ts` | חיפושים מהירים, מפנה את הרשומה הישנה ביותר בהגעה ל-200 |
| מסד נתונים | טבלת `reasoning_cache` (`src/lib/db/`)           | נשמר לאורך הפעלות מחדש ומספק את הנתונים לסטטיסטיקות    |

כתיבות מתבצעות לשתי השכבות. קריאות בודקות תחילה את הזיכרון ולאחר מכן פונות למסד הנתונים כחלופה (פגיעות במסד הנתונים מקודמות בחזרה לזיכרון). תקלות במסד הנתונים אינן קטלניות — המטמון בזיכרון ממשיך לשרת את הנתיב החם.

**ברירות מחדל:**

- TTL:‏ `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- מספר מרבי של רשומות בזיכרון: `200` (`MAX_MEMORY_ENTRIES`)
- פינוי: תחילה הרשומה בעלת `createdAt` הישן ביותר

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

אינדקסים: `expires_at`,‏ `provider`,‏ `model`,‏ `created_at`. הערך `expires_at` מאוחסן כמספר השניות מאז תחילת עידן Unix; שכבת ה-SELECT מנרמלת ערכי טקסט ישנים באמצעות `EXPIRES_AT_EPOCH_SQL`.

## זיהוי ספק / מודל

ההפעלה החוזרת מופעלת כאשר `requiresReasoningReplay(provider, model)` מחזירה `true`. הפונקציה בודקת שתי רשימות בקובץ `open-sse/services/reasoningCache.ts`.

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
- `/deepseek[-/]?v4[-.]flash/i` ו-`/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, עם סיומת `-free` אופציונלית)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

הוספת ספק/מודל קפדני חדש דורשת הוספה לאחת מהרשימות האלה וכתיבת בדיקת יחידה שמוודאת הזרקת הפעלה חוזרת. תיאור ה-PR צריך לצטט את מחרוזת ה-400 המדויקת מהמערכת במעלה הזרם שהניעה את השינוי.

## REST API

המטמון חושף שתי נקודות קצה תחת `src/app/api/cache/reasoning/route.ts`. שתיהן דורשות אימות ניהולי (`isAuthenticated` מתוך `@/shared/utils/apiAuth`).

| שיטה   | נקודת קצה                                                 | תיאור                                                        |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------ |
| GET    | `/api/cache/reasoning`                                    | סטטיסטיקות + רשומות עם עימוד                                 |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | רשימה מסוננת (`limit` מוגבל לטווח `[1, 200]`)                |
| DELETE | `/api/cache/reasoning`                                    | ניקוי הכול (זיכרון + מסד נתונים) ואיפוס מוני הפגיעות/ההחטאות |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | ניקוי רשומות של ספק אחד בלבד                                 |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | מחיקת רשומה יחידה                                            |

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

- **ניקוי:** `cleanupReasoningCache()` מסירה רשומות זיכרון שפג תוקפן ומריצה את `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. תהליכי בדיקת תקינות קוראים לה מעת לעת.
- **התאוששות מקריסה:** לאחר הפעלה מחדש, הזיכרון ריק אך מסד הנתונים עדיין מכיל רשומות שתוקפן לא פג. החיפוש הראשון עבור `tool_call_id` נתון ניגש למסד הנתונים; החיפושים הבאים ניגשים לזיכרון.
- **אין reasoning, אין מטמון:** `cacheReasoningFromAssistantMessage` מחזירה `0` כאשר הודעת המסייע אינה כוללת שדה `reasoning_content` / `reasoning`, כך שתגובות ללא חשיבה אינן צורכות משאבים.
- **גם הכתיבה מותנית:** שני אתרי הקריאה ב-`chatCore.ts` (ללא הזרמה ועם הזרמה) קוראים ל-`cacheReasoningFromAssistantMessage()` רק כאשר `requiresReasoningReplay(provider, model)` הוא `true` — אותו תנאי שנבדק בצד הקריאה. התקנות שלעולם אינן משתמשות בספק המחייב שידור חוזר מפסיקות לשלם את עלות הכתיבה, עדכון האינדקס וה-try/catch בכל תגובה הכוללת reasoning.
- **ספקים שאינם מחמירים:** כאשר `requiresReasoningReplay` הוא `false` ותבנית היעד היא OpenAI, המתרגם **מסיר** כל שדה `reasoning_content` מהודעות יוצאות — OpenAI Chat Completions אינו מקבל אותו.

## ראו גם

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — מפסקי מעגל, תקופות צינון וחסימות מודלים
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — אבחון שגיאות 400 משירותים חיצוניים
- מקור: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- מיגרציה: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- נתיב API: `src/app/api/cache/reasoning/route.ts`
- הבעיה המקורית: #1628
