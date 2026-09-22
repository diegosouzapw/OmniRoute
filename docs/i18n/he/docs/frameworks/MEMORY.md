# Memory System (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **מקור האמת:** `src/lib/memory/` ו-`src/app/api/memory/`
> **עדכון אחרון:** 2026-06-28 — v3.8.40 (כבוי כברירת מחדל + השלמת קוונטיזציית int8)

OmniRoute מספק זיכרון שיחה מתמשך לפי מפתח API (ולפי מזהה הפעלה,
באופן אופציונלי). זיכרונות מחולצים אוטומטית מתשובות LLM
באמצעות התאמת תבניות regex קלילה ומוזרקים בחזרה לבקשות הבאות
כהודעת מערכת ראשונה (או כהודעת המשתמש הראשונה עבור ספקים
שדוחים את תפקיד המערכת).

> **הזיכרון כבוי כברירת מחדל (v3.8.30+).** הערך `DEFAULT_MEMORY_SETTINGS.enabled`
> הוא כעת `false` (`src/lib/memory/settings.ts`). הפעלת הזיכרון מזריקה עד
> `maxTokens` (~2k) של הקשר מאוחזר לתוך **כל** בקשת צ'אט, ועל כך
> נגבה תשלום — עלות בלתי צפויה בהתקנות חדשות ועבור לקוחות שמנהלים
> את ההקשר שלהם בעצמם. יש להצטרף במפורש תחת **הגדרות → זיכרון** (הרכיב
> `MemorySkillsTab` מציג התראת אזהרה לגבי עלות הטוקנים כאשר הזיכרון מופעל).
> לקוח יכול להחריג בקשה יחידה באמצעות כותרת הבקשה
> `x-omniroute-no-memory` (`true`/`1`/`yes`) — ראו את טבלת כותרות הבקשה
> ב-[API_REFERENCE.md](../reference/API_REFERENCE.md). בקשה ללא זיכרון מגדירה
> `memoryOwnerId = null`, וכך משביתה **הן** את הזרקת הזיכרון **והן** את הזרקת המיומנויות
> עבור אותה בקשה (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

הזיכרון **מתוחם לפי מפתח API**, ולא לפי משתמש — כל בקשה שמאומתת
באמצעות אותו מפתח API חולקת את אותו מאגר זיכרון, עם אפשרות לתיחום נוסף
לפי `sessionId`.

## ארכיטקטורה

```
לקוח → /v1/chat/completions (הערך apiKeyInfo נפתר קודם לכן)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # מחלץ את המזהה
    → getMemorySettings()                     # הגדרות שנשמרו במטמון
    → shouldInjectMemory(body, {enabled})     # שער
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + וקטור אופציונלי
    → injectMemory(body, memories, provider)  # הודעת מערכת או משתמש
  → קריאה לספק במעלה הזרם
  → בעת קבלת תשובה: extractFacts(text, apiKeyId, sessionId)  # ללא חסימה
    → setImmediate → createMemory(fact) לכל התאמה
                   → embed(content) + upsertVector(id, vec)
```

נקודות הקריאה של ההזרקה והחילוץ מחוברות בתוך
`open-sse/handlers/chatCore.ts` (חפשו את `retrieveMemories`,‏ `injectMemory`
ו-`extractFacts`).

## ארכיטקטורת המנוע (פתרון ב-3 רמות)

מנוע הזיכרון קובע בזמן ריצה את נתיב האחזור בהתאם לתשתית
ולהגדרות הזמינות. קיימות שלוש רמות, המיושמות לפי סדר העדיפות:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  רמה 0 — מילת מפתח (FTS5)                                  │
  │  זמינות מבוססת בדיקה: FTS5 כאשר בניית SQLite                │
  │  תומכת בו (better-sqlite3 / node:sqlite / bun:sqlite);      │
  │  אינו זמין בבניות ללא FTS5 (למשל sql.js/WASM —              │
  │  "no such module: fts5"). משמש כאשר strategy = "exact" או   │
  │  כחלופה; מילת המפתח ב-engine-status משקפת את הבדיקה.        │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  רמה 1 — וקטור מוטמע (sqlite-vec)                           │
  │  sqlite-vec v0.1.9 נטען באמצעות db.loadExtension().         │
  │  KNN בכוח גס על וקטורי Float32. פעיל כאשר:                  │
  │   • הטעינה של sqlite-vec באמצעות loadExtension מצליחה       │
  │   • זמין מקור הטמעה (remote | static | transformers)        │
  │     שיכול להפיק Float32Array                                │
  │   • הטבלה vec_memories קיימת (נוצרת בקריאה הראשונה ל-ready()) │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  רמה 2 — Qdrant (מסד נתונים וקטורי חיצוני בהצטרפות יזומה)   │
  │  כאשר מופעל, מחליף את sqlite-vec עבור semantic/hybrid.      │
  │  דורש מופע Qdrant פעיל + host/port מוגדרים.                 │
  └─────────────────────────────────────────────────────────────┘
```

ההפחתה ברמה מתבצעת באופן אוטומטי ושקוף:

- אם טעינת sqlite-vec נכשלת, רמה 1 אינה זמינה → מתבצעת חזרה לרמה 0.
- אם מקור ההטמעה מחזיר שגיאה, רמה 1 חוזרת לרמה 0.
- אם Qdrant אינו תקין, רמה 2 חוזרת לרמה 1 (או לרמה 0 אם גם רמה 1
  אינה זמינה).

## מקורות הטמעה

שכבת ההטמעה (`src/lib/memory/embedding/`) קובעת באיזה מקור להשתמש
בהתבסס על `MemorySettingsExtended.embeddingSource`:

| מקור           | תיאור                                                                            | נדרש מפתח | אתחול קר         |
| -------------- | -------------------------------------------------------------------------------- | --------- | ---------------- |
| `remote`       | משתמשת ב-API ההטמעה של ספק מוגדר (OpenAI, Cohere וכו׳)                           | כן        | ללא              |
| `static`       | הטמעה מקומית באמצעות טבלת חיפוש דרך `potion-base-8M`‏ (WordPiece + מיצוע מאגרים) | לא        | ~200ms           |
| `transformers` | הסקת ONNX מקומית דרך `@huggingface/transformers` v4,‏ `all-MiniLM-L6-v2`         | לא        | ~3s + ~400MB RAM |
| `auto`         | בחירה בזמן ריצה: מרוחק (אם קיים מפתח) ← סטטי ← transformers ← null               | תלוי      | תלוי             |

**סדר הבחירה עבור `auto`:**

1. איתור הספק הראשון ב-`listEmbeddingProviders()` שעבורו `hasKey === true` ← `remote`.
2. אם `settings.staticEnabled === true` ← `static`.
3. אם `settings.transformersEnabled === true` ← `transformers`.
4. אחרת ← `null` (נסיגה לחיפוש מילות מפתח של FTS5).

מטמון ההטמעות (`src/lib/memory/embedding/cache.ts`) משתמש במפת LRU בזיכרון
שמפתחותיה הם `${source}:${model}:${dim}:${sha256(text)}`, ומוגבלת ל-
`MEMORY_EMBEDDING_CACHE_MAX` רשומות (ברירת המחדל היא 1000), עם TTL של
`MEMORY_EMBEDDING_CACHE_TTL_MS` (ברירת המחדל היא 5 דקות). המטמון משותף לכל הקוראים
במהלך מחזור החיים של התהליך.

## RRF משולב (k=60)

כאשר `strategy = "hybrid"` ומאגר הווקטורים זמין, האחזור משתמש
ב-Reciprocal Rank Fusion כדי למזג תוצאות FTS5 ותוצאות וקטוריות:

```
RRF(d) = Σ  1 / (k + rank_i(d))      כאשר k = 60 (ניתן להגדרה באמצעות MEMORY_RRF_K)
          i
```

באופן קונקרטי:

1. הפעלת חיפוש FTS5 ← רשימה מדורגת `R_fts` (מיקום 1..N).
2. הפעלת חיפוש וקטורי KNN ← רשימה מדורגת `R_vec` (מיקום 1..M).
3. עבור כל `memoryId` ייחודי:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 אם אינו ברשימה).
4. מיון לפי `rrf_score` בסדר יורד, והחלת מעבר בהתאם לתקציב הטוקנים.

ידוע כי RRF יעיל ללא צורך בנרמול ציונים בין
מערכות אחזור הטרוגניות. ברירת המחדל `k=60` לקוחה מהמאמר המקורי
של Cormack ואחרים, ופועלת היטב עבור קורפוסים קטנים (<10k זיכרונות).

## מילוי בדיעבד (עצל + אינדוקס מחדש)

כאשר מודל ההטמעה משתנה (כפי שמזוהה באמצעות `embedding_signature`),
מאגר הווקטורים נבנה מחדש וכל הזיכרונות הקיימים מסומנים באמצעות
`needs_reindex = 1` בטבלה `memories`.

**מילוי עצל בדיעבד**: באחזור הבא, כל זיכרון שחסרה לו רשומה וקטורית
מוטמע ומוכנס ל-`vec_memories` לפני הפעלת החיפוש. כך עלות המילוי בדיעבד
נפרסת על פני בקשות אמיתיות מבלי לחסום את האתחול.

**אינדוקס מחדש מפורש**: לשונית Engine ב-`/dashboard/memory` מספקת כפתור
"אנדקס מחדש כעת", הקורא ל-`POST /api/memory/reindex`. המטפל קורא
ל-`runReindexBatch()` מתוך `src/lib/memory/reindex.ts`, שמעבד עד
`limit` רשומות ממתינות בכל בקשה. ניתן לבדוק את ההתקדמות באמצעות
`GET /api/memory/engine-status`‏ (`vectorStore.needsReindex`).

הטבלה `memory_vec_meta` (מיגרציה `083_memory_vec.sql`) מאחסנת:

- `active_dim` — ממד הווקטור הנוכחי (null = טרם כויל).
- `embedding_signature` — `${source}:${model}:${dim}` המשמש לזיהוי שינויים.
- `last_reset_at` — חותמת הזמן של האיפוס המלא האחרון.
- `vec_loaded` — דגל 0/1 המציין אם sqlite-vec נטען בהצלחה.

## הרחבת הגדרות

תשעה שדות של הטמעות ווקטורים זמינים ב-`MemorySettingsExtended` שבקובץ
`src/shared/schemas/memory.ts`, ונשמרים באמצעות `src/lib/db/settings.ts`:

| שדה                      | סוג                                                | ברירת מחדל | תיאור                                                      |
| ------------------------ | -------------------------------------------------- | ---------- | ---------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`   | מקור ההטמעות שבו יש להשתמש                                 |
| `embeddingProviderModel` | `string \| null`                                   | `null`     | ספק/מודל בתבנית `provider/model`                           |
| `customBaseUrl`          | `string \| null`                                   | `null`     | כתובת URL בסיסית לנקודת קצה תואמת OpenAI עבור Memory בלבד  |
| `customModelId`          | `string \| null`                                   | `null`     | מזהה המודל שנשלח לנקודת הקצה המותאמת אישית                 |
| `transformersEnabled`    | `boolean`                                          | `false`    | הצטרפות מפורשת לשימוש ב-Transformers.js ‏(MiniLM, כ-400MB) |
| `staticEnabled`          | `boolean`                                          | `false`    | הצטרפות מפורשת לשימוש במודל המקומי הסטטי potion-base-8M    |
| `rerankEnabled`          | `boolean`                                          | `false`    | הפעלת שלב דירוג מחדש (מוסיף 200–500ms לבקשה)               |
| `rerankProviderModel`    | `string \| null`                                   | `null`     | ספק/מודל לדירוג מחדש בתבנית `provider/model`               |

`rerankProviderModel` נפתר באמצעות `POST /v1/rerank` (שנקרא דרך ממשק הלולאה המקומית), ולכן הוא מקבל כל ערך שהנתיב הזה מקבל: מודל ענן נבחר לדירוג מחדש (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) או צומת ספק תואם OpenAI בתבנית `<node-prefix>/<model>` (לדוגמה, `skilled-mini/bge-reranker-v2-m3` עבור שרת TEI/Infinity). צומתי לולאה מקומית תמיד מורשים; צומת במארח אחר (LAN,‏ Tailscale) דורש בנוסף את דגל התכונה `RERANK_REMOTE_PROVIDER_NODES` וחייב לעמוד במדיניות כתובות ה-URL היוצאות של הספק — ראו [דגלי תכונות](../reference/FEATURE_FLAGS.md). הבורר בלוח הבקרה מציג ספקים נבחרים וכן צמתים מקומיים; ניתן להגדיר ישירות כל מחרוזת `provider/model` תקינה באמצעות `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | אחסון הווקטורים שבו יש להשתמש |

הגדרות אלה נחשפות באמצעות `GET /PUT /api/settings/memory` (סכימה `MemorySettingsExtendedSchema`).

עבור המקור `remote`,‏ Memory מקבל גם את ההגדרות האופציונליות `customBaseUrl` ו-
`customModelId`. יחד הן בוחרות נקודת קצה תואמת OpenAI מסוג `/embeddings`
ומודל, מבלי לשנות את מרשם ההטמעות הגלובלי. נקודת הקצה
מנורמלת לפני השימוש ונבדקת בהתאם למדיניות כתובות ה-URL היוצאות של הספק: נדרש
HTTP(S), פרטי אימות מוטמעים ומחרוזות שאילתה נדחים, וכתובות של מטא-נתוני ענן
נותרות חסומות. ערכים ריקים משמרים את ספק המרשם שנבחר. שגיאות
המוחזרות ללוח הבקרה עוברות סינון, ופרטי האימות של נקודת הקצה לעולם אינם נרשמים ביומן.

> **TODO (D20):** התחום `global` (שיתוף זיכרונות בין כל מפתחות ה-API) אינו
> ממומש במהדורה זו. הוא דורש שינויי סכימה ונתיב אחזור גלובלי.
> יש לעקוב אחריו בנפרד.

## שכבות אחסון

### ראשית: SQLite (טבלת `memories`)

נוצרת באמצעות המיגרציה `015_create_memories.sql`:

| עמודה                       | סוג                | הערות                                                                             |
| --------------------------- | ------------------ | --------------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID שנוצר באמצעות `crypto.randomUUID()`                                          |
| `api_key_id`                | `TEXT NOT NULL`    | מפתח ה-API הבעלים                                                                 |
| `session_id`                | `TEXT`             | תחום אופציונלי לכל שיחה                                                           |
| `type`                      | `TEXT NOT NULL`    | אחד מהערכים `factual`, `episodic`, `procedural`, `semantic`                       |
| `key`                       | `TEXT`             | מפתח upsert יציב, לדוגמה `preference:i_prefer_python`                             |
| `content`                   | `TEXT NOT NULL`    | טקסט העובדה בפועל                                                                 |
| `metadata`                  | `TEXT`             | אובייקט JSON (קטגוריה, extractedAt, מקור, ...)                                    |
| `created_at` / `updated_at` | `TEXT`             | מחרוזות ISO 8601                                                                  |
| `expires_at`                | `TEXT`             | תפוגה אופציונלית; `NULL` פירושו קבוע                                              |
| `memory_id`                 | `INTEGER UNIQUE`   | נוסף על ידי `023_fix_memory_fts_uuid.sql` כדי לגשר בין UUIDs ↔ מזהי שורות של FTS5 |

אינדקסים: `api_key_id`, `session_id`, `type`, `expires_at`, וכן האינדקס הייחודי
`memory_id`.

**סמנטיקת Upsert**: הפונקציה `createMemory()` מחפשת שורה קיימת עם אותו
`(api_key_id, key)` ומעדכנת אותה במקום כאשר היא נמצאת (תוך מיזוג `metadata` באמצעות
פריסה רדודה). הדבר מונע מהטבלה לגדול ללא הגבלה בעקבות הצהרות
העדפה חוזרות.

### חיפוש טקסט מלא (טבלה וירטואלית `memory_fts`)

הקובץ `022_add_memory_fts5.sql` יוצר טבלה וירטואלית מסוג FTS5 מעל `content` ו-
`key`. הקובץ `023_fix_memory_fts_uuid.sql` מתקן באג מהעולם האמיתי שבו המפתח הראשי
מסוג UUID לא הצליח לבצע join מול ה-rowid השלם של FTS5 — המיגרציה מוסיפה את העמודה
`memory_id`, יוצרת מחדש את טבלת FTS ומחברת טריגרים
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) ששומרים על סנכרון FTS בעת
INSERT, DELETE ו-UPDATE.

משמש את `retrieval.ts` עבור האסטרטגיות `semantic` ו-`hybrid` (ראו להלן).
קוד האחזור מבצע הגנה באמצעות `hasTable("memory_fts")` וחוזר לסדר
כרונולוגי אם טבלת FTS חסרה או אם שאילתת FTS נכשלת.

### אופציונלי: Qdrant (מאגר וקטורים שכבה 2)

הקובץ `src/lib/memory/qdrant.ts` מממש שילוב אופציונלי עם Qdrant כמאגר וקטורים
משכבה 2. האחזור מנותב ל-Qdrant רק כאשר בורר המנוע
`memoryVectorStore === "qdrant"` — ברירת המחדל `"auto"` (וגם `"sqlite-vec"`)
**לעולם אינה** בוחרת ב-Qdrant. המתג בלשונית Engine מגדיר **גם** את `qdrantEnabled` וגם
את `memoryVectorStore` יחד: הפעלה הופכת את Qdrant למאגר הראשי, והשבתה
מאפסת ל-`"auto"` (#5597 — לפני התיקון הזה, להפעלה לא הייתה השפעה משום ששום דבר
לא כתב לבורר המנוע). אם Qdrant אינו נגיש או אינו מחזיר דבר, האחזור
חוזר ל-sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — מטמיעה את `key + content` באמצעות מודל
  ההטמעה שהוגדר, מוודאת שהאוסף קיים (יוצרת וקטורים עם מרחק קוסינוס
  בשימוש הראשון), ומבצעת upsert לנקודה עם המטען `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — מטמיעה את השאילתה, מחפשת באוסף
  עם סינון לפי `kind = "omniroute_memory"` ובאופן אופציונלי לפי
  `apiKeyId` / `sessionId`. מגבילה את `topK` לטווח `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — מחיקת נקודה יחידה. נקראת על ידי
  `deleteMemory()` לאחר הסרת השורה מ-SQLite (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — מחיקה מרוכזת של נקודות שעבורן
  `expiresAtUnix` נמצא בעבר או ש-`createdAtUnix` ישן מסף
  השמירה. מתבצעת תחילה ספירה כדי שלוח הבקרה יוכל להציג מספרים בפועל.
- `checkQdrantHealth()` — בדיקת תקינות באמצעות `GET /readyz` עם זמן השהיה.

ממשק המשתמש של ההגדרות מציג תצורת Qdrant, בדיקת תקינות, בדיקת חיפוש סמנטי
וניקוי תחת **לשונית Engine** של `/dashboard/memory`. הנתיבים המתאימים
תחת `src/app/api/settings/qdrant/` מחוברים כולם החל מ-v3.8.6:

| נתיב                                    | שיטה          | תיאור                          |
| --------------------------------------- | ------------- | ------------------------------ |
| `/api/settings/qdrant`                  | `GET` / `PUT` | קריאה / עדכון של הגדרות Qdrant |
| `/api/settings/qdrant/health`           | `GET`         | בדיקת זמינות + זמן השהיה       |
| `/api/settings/qdrant/search`           | `POST`        | בדיקת חיפוש סמנטי              |
| `/api/settings/qdrant/cleanup`          | `POST`        | הסרת נקודות שפג תוקפן / ישנות  |
| `/api/settings/qdrant/embedding-models` | `GET`         | הצגת מודלי ההטמעה הזמינים      |

**הערות התנהגות (למה לצפות):**

- **בחירת מנוע** — הפעלת Qdrant בלשונית Engine הופכת אותו למאגר הראשי
  (מגדירה `memoryVectorStore="qdrant"`); השבתתו מאפסת את ההגדרה ל-`"auto"` (#5597).
- **ללא מילוי רטרואקטיבי** — רק זיכרונות שנוצרו/עודכנו **לאחר** הפעלת Qdrant
  נכתבים אליו (כתיבה כפולה מסוג fire-and-forget). זיכרונות קיימים ב-SQLite **אינם**
  מועברים; "Reindex Now" בונה מחדש רק את אינדקס sqlite-vec, ולא את Qdrant.
- **ממד הווקטור מזוהה אוטומטית** מההטמעה בפועל בשימוש הראשון — אין
  שדה ממד שיש למלא. שינוי מודל ההטמעה לאחר שאוסף כבר
  קיים **אינו** מטופל אוטומטית: האוסף הקיים נותר ללא שינוי, פעולות כתיבה/חיפוש
  עם ממדים שאינם תואמים נכשלות וחוזרות ל-sqlite-vec. יש ליצור מחדש את האוסף
  (שם חדש, או למחוק אותו ב-Qdrant) כדי להחליף מודל הטמעה.
- **מדד מרחק** — תמיד **Cosine** (מקודד באופן קשיח בעת יצירת האוסף; אינו
  ניתן להגדרה).
- **אימות** — מפתח API בלבד (נשלח בכותרת `api-key`; אופציונלי עבור Docker מקומי
  ללא אימות). אין שימוש ב-JWT/RBAC.
- **שדות תצורה** — ממשק המשתמש מציג את `host`,‏ `port`,‏ `collection`,‏ `embeddingModel`,
  `apiKey`. השדות `vectorSize` / `hnswEfConstruct` זמינים רק דרך משתני סביבה/מסד הנתונים, ו-`vectorSize`
  אינו משמש ליצירת האוסף (הממד נגזר מההטמעה).

### קוונטיזציה של וקטורים (int8 — אופציונלית, בשני המנגנונים)

שני מנגנוני הווקטורים תומכים ב**קוונטיזציית int8 אופציונלית** כדי לצמצם את טביעת
הזיכרון של הווקטורים המאוחסנים (קטנים פי ~4 מ-Float32), במחיר ירידה קלה בשיעור האחזור.
ברירת המחדל היא **כבוי** בשניהם — הווקטורים נשארים בדיוק מלא אלא אם האפשרות
מופעלת במפורש.

| מנגנון     | הגדרה                                   | סוג                            | ברירת מחדל | מקום הקריאה                                                 |
| ---------- | --------------------------------------- | ------------------------------ | ---------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (מפתח DB)          | `"none" \| "int8" \| "binary"` | `"none"`   | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (משתנה סביבה) | `"none" \| "int8"`             | `"none"`   | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** מוגדר לכל מופע באמצעות מפתח ההגדרה `qdrantQuantization`
  (נחשף כשדה `quantization` ב-`PUT /api/settings/qdrant`). כאשר הערך הוא
  `"int8"`, הפונקציה `buildQuantizationConfig()` מבקשת קוונטיזציה סקלרית
  (`always_ram`, אחוזון `0.99`) ובחיפושים מופעל `rescore: true`, כדי
  שווקטורים בדיוק מלא ישפרו את קבוצת המועמדים מסוג int8.
- קוונטיזציית **sqlite-vec** מוגדרת **באמצעות משתנה סביבה בלבד** (לא באמצעות הגדרת DB): יש להגדיר
  `MEMORY_VEC_QUANTIZATION=int8` כדי לאחסן את הווקטורים המקומיים כעמודת `int8[dim]`
  באמצעות `vec_quantize_int8(?, 'unit')`. המצב שנבחר משולב בתוך
  `embedding_signature` (סיומת `:int8`), כך שמעבר בין מצבים מפעיל יצירה מחדש מלאה
  של האינדקס עבור הטבלה `vec_memories` — אותו נתיב מילוי רטרואקטיבי עצל שבו נעשה שימוש כאשר
  מודל ההטמעה משתנה.

## סוגי זיכרון

`MemoryType` (`src/lib/memory/types.ts`):

| סוג          | שימוש                                                               |
| ------------ | ------------------------------------------------------------------- |
| `factual`    | העדפות, עובדות יציבות על המשתמש, דפוסי התנהגות                      |
| `episodic`   | החלטות הקשורות לרגע מסוים ("בחרתי ב-Postgres")                      |
| `procedural` | זיכרון של תהליכי עבודה / הוראות ביצוע (שמור; אין כיום מחלץ אוטומטי) |
| `semantic`   | שמור לרשומות במאגר וקטורי                                           |

אסטרטגיית האחזור של `MemoryConfig` היא אחת מבין `exact`,‏ `semantic` או `hybrid`,
והתחום הוא אחד מבין `session`,‏ `apiKey` או `global`. תחום ברירת המחדל של
`getMemorySettings()` הוא `apiKey`.

## חילוץ עובדות (`extraction.ts`)

החילוץ **מבוסס על ביטויים רגולריים**, ולא על LLM — הוא פועל בתוך התהליך באמצעות
`setImmediate()`, כך שלעולם אינו חוסם את זרם התגובה:

- **דפוסי העדפה** → `MemoryType.FACTUAL`
  (למשל `אני מעדיף …`, `אני ממש אוהב …`, `המועדף עליי הוא …`, `אני שונא …`)
- **דפוסי החלטה** → `MemoryType.EPISODIC`
  (למשל `אשתמש ב-…`, `בחרתי ב-…`, `החלטתי ללכת על …`, `אני עומד לאמץ את …`)
- **דפוסי התנהגות** → `MemoryType.FACTUAL`
  (למשל `אני בדרך כלל …`, `אני תמיד …`, `אני נוטה …`)

כל התאמה עוברת ניקוי (`trim`, כיווץ רווחים, הגבלה ל-500 תווים),
הסרת כפילויות בתוך האצווה באמצעות `factKey(category, content)` יציב, ונשמרת
באמצעות `createMemory()` עם מטא-נתונים
`{category, extractedAt, source: "llm_response"}`. טקסט הקלט מוגבל ל-
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — כאשר הוא ארוך יותר, נעשה שימוש **בסוף** הטקסט,
כדי שהתוכן העדכני ביותר של המסייע תמיד ייכלל.

`extractFactsFromText(text)` מיוצאת לצורך בדיקות ומחזירה את העובדות המובנות
מבלי לשמור אותן.

## אחזור (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` היא נקודת הכניסה הראשית. היא:

1. מנרמלת ומאמתת את התצורה באמצעות `MemoryConfigSchema`.
2. מחזירה מיד `[]` כאשר `enabled` הוא false או `maxTokens <= 0`.
3. מגבילה את `maxTokens` לטווח `[1, 8000]`.
4. מזהה אם הטבלה המודרנית `memories` קיימת (לעומת הטבלה הישנה `memory`),
   כדי שמסדי נתונים ישנים ימשיכו לפעול.
5. בונה את שאילתת הבסיס עם תנאי תפוגה
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), תחום
   הפעלה אופציונלי, וסף `retentionDays` אופציונלי.
6. מתפצלת לפי האסטרטגיה:
   - **`exact`** (ברירת המחדל): סדר כרונולוגי `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: אם `config.query` קיים וגם `memory_fts` קיימת, מבצעת JOIN עם
     `memory_fts MATCH ?` וממיינת לפי דירוג FTS; חוזרת לסדר כרונולוגי
     כאשר FTS מחזיר 0 שורות.
   - **`hybrid`**: איחוד של תוצאות FTS (רלוונטיות גבוהה יותר) ושל
     הקבוצה הכרונולוגית, תוך הסרת כפילויות לפי id.
7. מחשבת ציון רלוונטיות לפי מילות מפתח (`getRelevanceScore`) על פני
   `content`,‏ `key` ו-JSON של `metadata` כאשר מסופקת שאילתה. שורות בעלות
   ציון אפס מסוננות החוצה.
8. ממיינת לפי ציון בסדר יורד, ולאחר מכן לפי `createdAt` בסדר יורד.
9. עוברת על הרשימה המדורגת ומקבלת רשומות כל עוד הסכום המצטבר של
   `estimateTokens(content)` (בקירוב `length / 4`) נשאר במסגרת התקציב. תמיד
   מחזירה לפחות רשומה אחת כאשר קיימת התאמה כלשהי.

`estimateTokens` מיוצאת ומשמשת לאחזור, לסיכום ולכלי MCP
`omniroute_memory_search`.

## הזרקה (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. מאחד את כל תוכני הזיכרון למחרוזת יחידה מסוג `Memory context: …`.
2. בוחר אסטרטגיה לפי שם הספק:
   - **הודעת מערכת** (ברירת המחדל עבור OpenAI, Anthropic, Gemini, …) — מוסיף מראש
     `{role: "system", content: memoryText}` לפני הודעות מערכת קיימות כלשהן,
     כך שהנחיות המערכת של המשתמש עדיין יקבלו עדיפות.
   - **הודעת משתמש** (חלופה) — עבור ספקים המופיעים ב-
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. אלה דוחים את תפקיד המערכת
     ואחרת יחזירו 400 (ראו תקלה #1701 עבור GLM/Zhipu).
3. מתעד את הכמות, האסטרטגיה והמודל תחת `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` מיוצאת עבור גורמים קוראים שצריכים
לקבל החלטות ניתוב משלהם. ספקים לא מוכרים מקבלים כברירת מחדל `true`
(תפקיד מערכת מותר), מטעמי בטיחות.

## הגדרות (`settings.ts`)

תצורת הזיכרון **מאוחסנת בטבלת ההגדרות של מסד הנתונים**, ולא במשתני סביבה.
`getMemorySettings()` קוראת מתוך `getSettings()` ושומרת את התוצאה במטמון
בתוך התהליך; `invalidateMemorySettingsCache()` נקראת על ידי נתיב ה-PUT של
ההגדרות לאחר כתיבות.

### שדות מדור קודם (כל הגרסאות)

| מפתח במסד הנתונים     | סוג      | ברירת מחדל                                           | פקד בממשק המשתמש                                        |
| --------------------- | -------- | ---------------------------------------------------- | ------------------------------------------------------- |
| `memoryEnabled`       | בוליאני  | `false` (כבוי כברירת מחדל מאז v3.8.30)               | הפעלה/כיבוי של הזיכרון                                  |
| `memoryMaxTokens`     | מספר שלם | `2000` (טווח `0–16000`)                              | תקציב טוקנים להזרקה                                     |
| `memoryRetentionDays` | מספר שלם | `30` (טווח `1–365`)                                  | חלון שמירה                                              |
| `memoryStrategy`      | enum     | `"hybrid"` (אחד מתוך `recent`, `semantic`, `hybrid`) | אסטרטגיית אחזור                                         |
| `skillsEnabled`       | בוליאני  | `false`                                              | הפעלה/כיבוי של הזרקת מיומנויות לפי מפתח (ראו SKILLS.md) |

הערה: אסטרטגיית ממשק המשתמש `"recent"` ממופה לאסטרטגיית האחזור הפנימית
`"exact"` באמצעות `toMemoryRetrievalConfig()` (סדר כרונולוגי).

### שדות חדשים (v3.8.6, תוכנית 21 D9)

ראו גם את הסעיף "הרחבת ההגדרות" לעיל לתיאורי השדות.

| מפתח במסד הנתונים           | שדה API                  | ברירת מחדל |
| --------------------------- | ------------------------ | ---------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`   |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`     |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`    |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`    |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`    |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`     |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`   |

מפתחות מסד נתונים הקשורים ל-Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` עם ברירת המחדל `"omniroute_memory"`,
`qdrantEmbeddingModel` עם ברירת המחדל `"openai/text-embedding-3-small"`) נקראים על ידי
`normalizeQdrantConfig()` בתוך `qdrant.ts`.

### משתני סביבה (v3.8.6)

שישה משתני סביבה אופציונליים מכווננים את התנהגות המנוע בזמן ריצה (מתועדים ב-`.env.example`):

| משתנה                           | ברירת מחדל                 | תיאור                                                                                                                                     |
| ------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | משך החיים של מטמון ההטמעות (5 דקות)                                                                                                       |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | מספר הרשומות המרבי במטמון LRU של הטמעות                                                                                                   |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | מאגר HF עבור מודל Transformers.js                                                                                                         |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | מאגר HF עבור מודל potion סטטי                                                                                                             |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | היכן לאחסן מודלים שהורדו                                                                                                                  |
| `MEMORY_VEC_TOP_K`              | `20`                       | ערך top-K המוגדר כברירת מחדל לחיפוש וקטורי                                                                                                |
| `MEMORY_RRF_K`                  | `60`                       | קבוע k של RRF לחיפוש היברידי                                                                                                              |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | הגדירו ל-`int8` כדי לאחסן וקטורים מקומיים של sqlite-vec בכימות (קטנים פי 4 בקירוב; דורש הצטרפות יזומה). שינוי מצב כופה יצירת אינדקס מחדש. |

## סיכום (`summarization.ts`)

הפונקציה `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` דוחסת תוכן ישן יותר
כאשר סך האסימונים המצטבר בזיכרונות של מפתח חורג מהמכסה.
היא עוברת על השורות בסדר DESC לפי `created_at`, שומרת את השורות שנכנסות במכסה,
ובשאר מחליפה את `content` במקום בשלושת המשפטים הראשונים של המקור.
`tokensSaved` הוא ההפרש ב-`estimateTokens` בין התוכן הישן לתוכן החדש.

שגרה זו **זמינה אך אינה מופעלת אוטומטית** בצינור עיבוד הצ'אט הנוכחי —
יש להפעיל אותה ממשימת cron, מפעולת מנהל מערכת או מקוד מקשר של
`MemoryConfig.autoSummarize` אם נדרשת דחיסה שוטפת. אובדן הנתונים הוא חד-כיווני:
הטקסט המקורי נדרס.

## REST API

כל נקודות הקצה דורשות אימות ניהולי (`requireManagementAuth`).

### נקודות קצה מרכזיות של הזיכרון (קיימות + מעודכנות)

| שיטה     | נתיב                 | תיאור                                                                                                                                                                                             |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | רשימה מחולקת לעמודים עם מסננים: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. התגובה כוללת `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                    |
| `POST`   | `/api/memory`        | יצירת רשומה (מאומתת באמצעות Zod: ‏`content`, ‏`key`, ובאופן אופציונלי `type`, ‏`sessionId`, ‏`apiKeyId`, ‏`metadata`, ‏`expiresAt`). קריאה ל-`createMemory()` שמבצעת upsert לפי `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | אחזור רשומה יחידה לפי UUID                                                                                                                                                                        |
| `PUT`    | `/api/memory/[id]`   | עדכון שדות ברשומה (`type`, `key`, `content`, `metadata`). גוף הבקשה: `MemoryUpdatePutSchema`. בנוסף, מסנכרן את הווקטור אם מקור ההטמעה זמין.                                                       |
| `DELETE` | `/api/memory/[id]`   | מחיקת רשומה; מוחק אותה גם מ-`vec_memories` (D15) ומ-Qdrant במאמץ מיטבי. מחזיר 404 אם הרשומה אינה קיימת.                                                                                           |
| `GET`    | `/api/memory/health` | הפעלת `verifyExtractionPipeline("health-check")` — בדיקת הלוך ושוב של יצירה←רשימה←מחיקה. מחזיר `{working, latencyMs, error?}`                                                                     |

### נקודות קצה חדשות של מנוע הזיכרון (תוכנית 21)

| שיטה   | נתיב                              | תיאור                                                                                                                                                 |
| ------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | הרצה יבשה של `retrieveMemories` — מחזירה תוצאות מדורגות עם ציון, רמה ואסימונים. גוף הבקשה: `RetrievePreviewSchema`. אינה מזריקה או משנה זיכרונות.     |
| `GET`  | `/api/memory/embedding-providers` | הצגת ספקים עם מודלים של הטמעות, תוך ציון לאילו מהם מוגדר מפתח API.                                                                                    |
| `GET`  | `/api/memory/engine-status`       | מחזיר את המצב המלא של המנוע: רמת מילות מפתח, זיהוי הטמעה, סטטיסטיקות מאגר וקטורים, תקינות Qdrant ותצורת דירוג מחדש. מבנה: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | הפעלה ידנית של דחיסת זיכרון. גוף הבקשה: `MemorySummarizeSchema` ‏(`olderThanDays`, ‏`apiKeyId?`, ‏`dryRun`). מחזיר `{candidates, tokensSaved}`.       |
| `POST` | `/api/memory/reindex`             | הפעלת אינדוקס וקטורי מחדש עבור זיכרונות עם `needs_reindex=1`. גוף הבקשה: `MemoryReindexSchema` ‏(`force`). מחזיר `{started, pending}`.                |

### נקודות קצה של הגדרות

| שיטה   | נתיב                                    | תיאור                                                                                                 |
| ------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | הגדרות `MemorySettingsExtended` המנורמלות הנוכחיות (7 שדות חדשים + שדות מדור קודם)                    |
| `PUT`  | `/api/settings/memory`                  | עדכון כל שדה מתוך `MemorySettingsExtendedSchema` (12 שדות בסך הכול)                                   |
| `GET`  | `/api/settings/qdrant`                  | הגדרות Qdrant הנוכחיות (`QdrantSettingsSchema`)                                                       |
| `PUT`  | `/api/settings/qdrant`                  | עדכון הגדרות Qdrant. גוף הבקשה: `QdrantSettingsUpdateSchema`. ‏`apiKey` = מחרוזת ריקה מסירה את המפתח. |
| `GET`  | `/api/settings/qdrant/health`           | בדיקת חיות מול מופע Qdrant המוגדר. מחזיר `QdrantHealthResultSchema`.                                  |
| `POST` | `/api/settings/qdrant/search`           | בדיקת חיפוש סמנטי מול Qdrant. גוף הבקשה: `QdrantSearchSchema` ‏(`query`, ‏`topK`).                    |
| `POST` | `/api/settings/qdrant/cleanup`          | הסרת נקודות Qdrant עבור זיכרונות שפג תוקפם או זיכרונות ישנים.                                         |
| `GET`  | `/api/settings/qdrant/embedding-models` | הצגת מודלי ההטמעה הזמינים עבור Qdrant.                                                                |

שאילתת הרשימה `/api/memory` תומכת בעימוד המבוסס על `page`
(`parsePaginationParams`) **או** ב-`offset` גולמי — כאשר `offset` קיים,
הוא מקבל עדיפות, ו-`page` נגזר מחושב עבור מבנה התגובה.

## כלי MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

כאשר שרת ה-MCP מופעל, נרשמים שלושה כלי זיכרון:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → עוטף את `retrieveMemories()`. החל מ-v3.8.6 (D16), הערך `strategy` נקרא
  מתוך `getMemorySettings()` במקום להיות מקודד מראש כ-`"exact"`. אם
  `query` סופק והערך `strategy` הוא `semantic` או `hybrid`, ייעשה שימוש במאגר
  הווקטורים כאשר הוא זמין.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → עוטף את `createMemory()`. מקבל רק את 4 הסוגים הקנוניים:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → מציג רשומות
  תואמות, מסנן אופציונלית לפי חותמת זמן של יצירה לפני המועד הנתון, ולאחר מכן מוחק כל
  אחת באמצעות `deleteMemory()` (שמסיר גם וקטורים מ-sqlite-vec ומ-Qdrant).

לפרטי התעבורה והתחום, ראו [MCP-SERVER.md](./MCP-SERVER.md).

## לוח הבקרה (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` הוא כעת **סטודיו בעל 3 לשוניות**:

### לשונית: זיכרונות

- כרטיס הסבר רעיוני (הסבר מתקפל "כיצד זה עובד").
- רשימה בזמן אמת, חיפוש ועימוד (השהיה של 300 מילישניות).
- מסנן סוגים (`factual` / `episodic` / `procedural` / `semantic` / הכול).
- חלון להוספת זיכרון (מפתח, תוכן, סוג).
- עריכה בתוך השורה (כפתור עיפרון → `PUT /api/memory/[id]`).
- מחיקה לכל שורה (עם תיבת דו-שיח לאישור).
- ייצוא JSON של העמוד הנוכחי; ייבוא JSON באמצעות בורר קבצים.
- כרטיסי סטטיסטיקה: `totalEntries`, `tokensUsed`, `hitRate`.
- כפתור "דחיסת ישנים" → `POST /api/memory/summarize` (הרצה יבשה מציגה תחילה
  את מספר המועמדים, ולאחר מכן מבקשת אישור).
- נקודת תקינות ירוקה/אדומה המונעת על ידי `GET /api/memory/health`.

### לשונית: סביבת ניסוי

- קלט שאילתה + בורר אסטרטגיה (מדויק / סמנטי / משולב) + תקציב טוקנים.
- "הדמיה" → `POST /api/memory/retrieve-preview` — מציגה תוצאות מדורגות עם
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- חלונית פתרון המציגה באיזה מקור הטמעות / מאגר וקטורים נעשה שימוש והאם
  התרחש מעבר לחלופה.

### לשונית: מנוע

- חלונית מצב המנוע (תג FTS5 למילות מפתח, תג הטמעה, תג מאגר וקטורים,
  תג תקינות Qdrant, תג דירוג מחדש).
- כפתור "אינדוקס מחדש כעת" → `POST /api/memory/reindex`.
- בורר מקור הטמעות (אוטומטי / מרוחק / סטטי / transformers + מתגים).
- כרטיס תצורת Qdrant (מתג הפעלה, מארח/יציאה/אוסף/מפתח, בדיקת חיבור,
  בדיקת חיפוש סמנטי, ניקוי).
- כרטיס תצורת דירוג מחדש (מתג הפעלה, בורר ספק/מודל).

הגדרות הזיכרון ו-Qdrant נמצאות גם תחת
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) עבור
ממשק ההגדרות הישן/הגלובלי.

## שמירה במטמון

`src/lib/memory/store.ts` שומר מטמון דמוי-LRU בתוך התהליך
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, עם פינוי 20 %
מהרשומות הישנות ביותר) לקריאות `getMemory(id)`, וכן שכבת מפתח/ערך כללית
`memoryCache` (`src/lib/memory/cache.ts`) עם המתודות `get`/`set`/`invalidate`
המשמשת קוראים המעוניינים במטמון ייעודי משלהם (LRU של 1,000 רשומות,
TTL ברירת מחדל של 5 דקות).

## פרטיות ומחזור חיים

- הבעלות על הזיכרון נקבעת לפי מזהה מפתח ה-API (`resolveMemoryOwnerId` בתוך
  `chatCore.ts`). ללא `apiKeyInfo.id`, לא מתבצעים אחזור, הזרקה או חילוץ.
- רשומות עם `expires_at` עתידי מסוננות מתוצאות האחזור; רשומות ישנות
  מעבר ל-`retentionDays` מוחרגות באמצעות התנאי
  `created_at >= cutoff` בתוך `retrieveMemories`.
- למחיקה מוחלטת, השתמשו ב-`DELETE /api/memory/[id]` או ב-`omniroute_memory_clear`.
- החילוץ מופעל בשיטת "שגר ושכח" באמצעות `setImmediate`; כשלים נרשמים ביומן תחת
  `memory.extraction.background.failed` ולעולם אינם מוצגים למבצע הקריאה.
- סבבי אימות (`verifyExtractionPipeline`) מנקים את רשומות הבדיקה שלהם
  בבלוק `finally`.

## ראו גם

- [SKILLS.md](./SKILLS.md) — ההגדרה `skillsEnabled` מזריקה הגדרות של כלים
  לצד הזיכרון.
- [MCP-SERVER.md](./MCP-SERVER.md) — תעבורת MCP / טווחי הרשאה.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ממשק API רחב יותר.
- מודולי מקור:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + ‏RRF היברידי
  - `src/lib/memory/embedding/index.ts` — שכבת הטמעות מרובת מקורות
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — סכמות Zod לכל גופי ה-API של הזיכרון
  - `src/shared/schemas/qdrant.ts` — סכמות Zod להגדרות/פעולות של Qdrant
  - `src/lib/db/memoryVec.ts` — פעולות CRUD עבור `memory_vec_meta`
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `083_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + נתיבי משנה
  - `src/app/(dashboard)/dashboard/memory/` — ממשק המשתמש של Studio (עמוד + רכיבים +
    לשוניות + hooks)
  - `open-sse/handlers/chatCore.ts` (חיווט הזרקה / חילוץ)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## בחירת ספק הטמעות (v3.8.16+)

מנוע הזיכרון של OmniRoute תומך ב-**ארבעה מקורות הטמעה** (`src/lib/memory/embedding/`). לכל אחד מהם יש פשרות שונות בנושאי **השהיה, עלות, איכות המודל ומורכבות ההגדרה**.

### מקורות ההטמעה

| ספק            | מקור                                      | השהיה                            | עלות                 | איכות                           | הגדרה                              |
| -------------- | ----------------------------------------- | -------------------------------- | -------------------- | ------------------------------- | ---------------------------------- |
| `transformers` | מודל ONNX מקומי (Xenova/all-MiniLM-L6-v2) | ~50-150ms ‏(CPU)                 | חינם                 | טובה                            | `npm install` בלבד                 |
| `static`       | וקטורים שחושבו מראש (במטמון)              | <1ms                             | חינם                 | לא רלוונטי (תלוי בפגיעה במטמון) | ללא                                |
| `remote`       | API של OpenAI / Cohere / Voyage           | ~100-300ms                       | $0.02-0.10/1M טוקנים | מצוינת                          | מפתח API                           |
| `auto`         | בוחר בזמן ריצה את המקור הזמין הטוב ביותר  | זהה למקור שנבחר                  | חינם                 | זהה למקור שנבחר                 | ללא                                |
| _(cache)_      | שכבת LRU בזיכרון מעל כל מקור              | <1ms (פגיעה), השהיה מלאה (החטאה) | חינם                 | זהה למקור הבסיסי                | פועלת תמיד (אינה מקור שניתן לבחור) |

### עץ החלטה

```
                  מהו הקשר הפריסה שלכם?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  פיתוח/בדיקה  ייצור קטן   ייצור גדול   קצה / לא מקוון
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (חינם, ללא API)            (האיכות הטובה ביותר)   (ללא אינטרנט)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            הוסיפו תמיד שכבת `cache` מעל
            (LruCache עוטף כל ספק)
```

### תצורת מסד הנתונים וה-API

אפשרויות הטמעת הזיכרון מוגדרות באמצעות ה-API/ממשק המשתמש של ההגדרות, ולא באמצעות משתני סביבה. מפתחות מסד הנתונים הרלוונטיים תחת ההגדרות (`normalizeMemorySettings` בתוך `src/lib/memory/settings.ts`) הם:

- `memoryEmbeddingSource`: ‏`"transformers"` (מקומי), `"remote"` (מבוסס API, למשל OpenAI), `"static"` (מאגר חיצוני), או `"auto"`
- `memoryEmbeddingProviderModel`: מזהה המודל עבור מקורות מרוחקים/סטטיים (למשל, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: ‏`true` | `false`
- `memoryStaticEnabled`: ‏`true` | `false`
- `memoryVectorStore`: ‏`"sqlite-vec"`, `"qdrant"`, או `"auto"`

#### מודל מקומי (`transformers`)

משתמש באופן פנימי ב-transformers.js להפעלת מודלים מקומיים:

```bash
# משתני סביבה שנקראים בקוד (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # מאגר מודל של HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # מודל potion סטטי של HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # ספריית מטמון
```

#### מטמון הטמעות מסוג LRU

המטמון מופעל תמיד כברירת מחדל ומוגדר באמצעות משתני סביבה:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # מספר מרבי של פריטים במטמון
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL ‏(5 דקות)
```

### נתוני ביצועים

ביצועי השוואה בשרת x86 טיפוסי בעל 4 ליבות (טקסטים של כ־100 טוקנים כל אחד):

| ספק                  | p50   | p95   | p99   | עלות למיליון הטמעות                 |
| -------------------- | ----- | ----- | ----- | ----------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | חינם                                |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | כ־$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | תלוי באירוח של Qdrant               |
| `cache` (פגיעה)      | <1ms  | <1ms  | 2ms   | חינם                                |

---

## דפוסי חילוץ עובדות (v3.8.16+)

המודול `extraction.ts` ‏(`src/lib/memory/extraction.ts`) משתמש ב**התאמת דפוסי ביטויים רגולריים** כדי לחלץ עובדות מובנות מהודעות בשיחה. הבנת הדפוסים האלה תעזור לכם לכוונן את איכות החילוץ בהתאם למקרה השימוש שלכם.

### קטגוריות דפוסים המוגדרות כברירת מחדל

| קטגוריה             | דפוס לדוגמה                                                   | מה נלכד                   |
| ------------------- | ------------------------------------------------------------- | ------------------------- |
| PREFERENCE_PATTERNS | `"אני מעדיף/ה <X>"`, `"אני אוהב/ת <X>"`, `"אני שונא/ת <X>"`   | העדפות המשתמש             |
| DECISION_PATTERNS   | `"אשתמש ב-<X>"`, `"החלטתי <X>"`, `"בחרתי ב-<X>"`              | החלטות המשתמש (אפיזודיות) |
| PATTERN_PATTERNS    | `"אני בדרך כלל <X>"`, `"אני תמיד <X>"`, `"אני אף פעם לא <X>"` | דפוסי התנהגות מתמשכים     |

### דפוסים לדוגמה (מפושטים)

```ts
// מתוך src/lib/memory/extraction.ts
const PREFERENCE_PATTERNS = [
  /\bI\s+(?:really\s+)?prefer\s+([^.,\n]+)/gi,
  /\bI\s+(?:really\s+)?like\s+([^.,\n]+)/gi,
  /\bI\s+(?:hate|dislike|avoid)\s+([^.,\n]+)/gi,
];
const DECISION_PATTERNS = [
  /\bI'?(?:ll|will)\s+use\s+([^.,\n]+)/gi,
  /\bI\s+(?:have\s+)?decided\s+(?:to\s+)?([^.,\n]+)/gi,
];
const PATTERN_PATTERNS = [/\bI\s+usually\s+([^.,\n]+)/gi, /\bI\s+always\s+([^.,\n]+)/gi];
```

### מה מחולץ

כאשר משתמש אומר:

> "אני מעדיף/ה TypeScript. אשתמש ב-Postgres עבור הפרויקט הזה. אני תמיד מבצע/ת commit לפני push. אני לא אוהב/ת Python."
> החילוץ יוצר 4 זיכרונות:
>
> | מפתח                                 | קטגוריה | סוג     | תוכן                        |
> | ------------------------------------ | ------- | ------- | --------------------------- |
> | `preference:typescript`              | העדפה   | עובדתי  | "TypeScript"                |
> | `decision:postgres_for_this_project` | החלטה   | אפיזודי | "Postgres עבור הפרויקט הזה" |
> | `pattern:commit_before_pushing`      | דפוס    | עובדתי  | "ביצוע commit לפני push"    |
> | `preference:python`                  | העדפה   | עובדתי  | "Python"                    |

### מגבלות החילוץ

כדי למנוע חילוץ בלתי מבוקר, חלות המגבלות הבאות:

| אורך תוכן מינימלי | 3 תווים |
| אורך תוכן מרבי | 500 תווים |

### מתי להשבית את החילוץ

החילוץ פועל אוטומטית בכל פעם שהזיכרון מופעל; אין מתג נפרד
לחילוץ בלבד. כדי לכבות אותו, יש להשבית את הזיכרון לחלוטין (`enabled: false`
באמצעות `PUT /api/settings/memory`). שקלו לעשות זאת כאשר:

- יש לכם נפח הודעות גבוה ועלות החילוץ אינה זניחה
- השיחות שלכם הן ברובן זמניות (צ'אט, ניפוי שגיאות) וללא ערך לטווח ארוך
- אתם כבר לוכדים הקשר באמצעות תוספים מותאמים אישית

---

## כוונון RRF היברידי (v3.8.16+)

האלגוריתם **Reciprocal Rank Fusion (RRF)** משלב תוצאות FTS5 (מילות מפתח) ותוצאות וקטוריות (סמנטיות). הפרמטר `k` קובע כמה משקל ניתן לתוצאות המדורגות נמוך יותר.

### הנוסחה

עבור כל זיכרון מועמד, ציון ה-RRF הוא:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

כאשר:

- `k` הוא הקבוע (ברירת המחדל היא 60)
- `rank_i(d)` הוא הדירוג של המסמך `d` במערכת האחזור ה-i (FTS, וקטור)
- הסכום מחושב על פני כל מערכות האחזור

### כיצד `k` משפיע על התוצאות

| ערך `k`                 | השפעה                                                                     | מתאים במיוחד עבור                       |
| ----------------------- | ------------------------------------------------------------------------- | --------------------------------------- |
| `k=0`                   | מיזוג דירוגים טהור (ללא החלקה)                                            | קו בסיס תאורטי                          |
| `k=10-30`               | מעניק משקל רב לתוצאות המובילות; דירוג נמוך כמעט שאינו תורם                | כאשר 3 התוצאות המובילות נכונות בדרך כלל |
| **`k=60`** (ברירת מחדל) | מאוזן — כל 10 התוצאות המובילות תורמות באופן משמעותי                       | אחזור לשימוש כללי                       |
| `k=100+`                | שטוח יותר — גם תוצאות בדירוג נמוך יכולות לשלוט אם הן מופיעות במספר מערכות | כאשר זכירות > דיוק היא קריטית           |

### כוונון `k` בפועל

```bash
# ברירת מחדל
MEMORY_RRF_K=60

# דיוק אגרסיבי (זיכרון קטן, מעט מסמכים)
MEMORY_RRF_K=20

# זכירות מרבית (זיכרון גדול, שאילתות מגוונות)
MEMORY_RRF_K=120
```

**דוגמה עם `k=20`:**

- דירוג FTS‏ 1 → תרומה `1/21 = 0.048`
- דירוג FTS‏ 10 → תרומה `1/30 = 0.033`
- דירוג וקטורי 1 → תרומה `0.048`
- מקסימום משולב: `0.096`

**דוגמה עם `k=60`:**

- דירוג FTS‏ 1 → תרומה `1/61 = 0.016`
- דירוג FTS‏ 10 → תרומה `1/70 = 0.014`
- דירוג וקטורי 1 → תרומה `0.016`
- מקסימום משולב: `0.033`

כאשר `k` גבוה יותר, **ההפרש היחסי** בין המקום הראשון למקום העשירי קטן יותר, ולכן האלגוריתם מסתמך יותר על **הסכמה בין מערכות האחזור** מאשר על הביטחון בדירוג העליון.

### מתי לשנות את `k`

| תסמין                                                   | מה כדאי לנסות                                                |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| התוצאה המובילה תמיד מנצחת, אך היא שגויה                 | **להנמיך** את k (למשל, 20) — הביטחון בדירוג העליון חשוב יותר |
| התשובה הנכונה נמצאת בחמישייה המובילה אך לא במקום הראשון | **להעלות** את k (למשל, 100) — ניקוד שטוח יותר מתגמל הסכמה    |
| הזכירות גבוהה אך הדיוק נמוך                             | **להנמיך** את k — לחדד את הדירוג                             |
| הזכירות נמוכה (מסמכים רלוונטיים חסרים)                  | **להעלות** את k — לתת הזדמנות למסמכים בדירוג נמוך יותר       |

### שקלול RRF

מיזוג הדירוגים ההופכיים משתמש במשקלים שווים עבור הדירוג הווקטורי הסמנטי ודירוג החיפוש בטקסט מלא:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

אין משתני סביבה להתאמת המשקלים הנפרדים (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` אינם קיימים).

---

## אסטרטגיית סיכום (v3.8.16+)

המודול `summarization.ts`‏ (`src/lib/memory/summarization.ts`) דוחס זיכרונות ישנים כדי לשמור על קבוצה פעילה קטנה, תוך שימור יכולת האחזור.

### מתי מופעל הסיכום

| גורם מפעיל            | סף (ברירת מחדל) |
| --------------------- | --------------- |
| הפעלה ידנית דרך ה-API | לא רלוונטי      |

### מה מסוכם

שתי נקודות כניסה מיוצאות מ-`summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — מתמצת את
  הזיכרונות של הפעלה לטקסט סיכום יחיד המוגבל בתקציב טוקנים.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — הדחיסה מבוססת-הגיל
  המשמשת את ה-API: היא בוחרת כל זיכרון שגילו עולה על `days`, יוצרת מהם
  זיכרון סיכום מתומצת אחד, וכאשר `dryRun` הוא `false`, מוחקת
  את המקורות. העבירו `dryRun: true` כדי להציג בתצוגה מקדימה את קבוצת המועמדים ואת מספר הטוקנים הכולל
  מבלי לשנות דבר.

אין שלב קיבוץ לפי תגית/מפתח או דירוג "ליבה לעומת ניתן לסיכום" לכל זיכרון —
הבחירה מבוססת אך ורק על סף הגיל, וטקסט הסיכום הוא שורה מתומצתת
עם קידומת סוג עבור כל מועמד.

### הפעלת הסיכום

הסיכום הוא **ידני / דורש הסכמה מפורשת** — ההגדרה `autoSummarize` היא `false`
כברירת מחדל, ולכן דבר אינו נדחס אוטומטית. הפעילו אותו דרך ה-API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

כדי להשאיר אותו כבוי, פשוט השאירו את `autoSummarize` בערך ברירת המחדל שלו (`false`).

### טיפים לאיכות הסיכום

- **הציגו תחילה תצוגה מקדימה באמצעות `dryRun`** — הקריאה `summarizeMemoriesOlderThan(..., true)` מחזירה
  את רשימת המועמדים ואת מספר הטוקנים הכולל, כדי שתוכלו לאשר מה ימוזג
  לפני מחיקת המקורות.
- **הריצו את הסיכום בשעות של תעבורה נמוכה** אם יש לכם מאגר זיכרונות גדול — הקריאה ל-LLM היא החלק האיטי

```bash
# בסגנון Cron: סיכום מדי יום בשעה 3 לפנות בוקר
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## תבנית ספק MemoryBackend

> **מקור האמת:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **בדיקות:** `src/lib/memory/__tests__/generic-backend.test.ts`

תבנית הספק MemoryBackend מוסיפה **שכבת הפשטה ניתנת להחלפה עבור מנגנוני אחסון** מעל מנוע הזיכרון הקיים. במקום להיות כבולה למימוש אחסון יחיד, מערכת הזיכרון תומכת כעת במספר מנגנוני אחסון (SQLite,‏ Obsidian,‏ Notion ומנגנוני HTTP מותאמים אישית), עם ניתוב ראשי/חלופי הניתן להגדרה.

### ארכיטקטורה

```
┌──────────────────────────────────────────────────────────┐
│                    נתיבי API                              │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           מתזמר Singleton ‏(manager.ts)                    │
│                                                          │
│  ראשי ─────► מנגנון A ‏(למשל SQLite)                      │
│  חלופי ────► מנגנון B ‏(למשל Obsidian)                    │
│              מנגנון C ‏(למשל Notion דרך GenericBackend)   │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ מנגנון     │ │ מנגנון     │ │ מנגנון           │
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│            │ │            │ │ ‏(HTTP)            │
└────────────┘ └────────────┘ └──────────────────┘
```

#### ממשק הליבה (`backend.ts`)

כל מנגנון אחסון חייב לממש את הממשק `MemoryBackend`:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // יצירה, קריאה, עדכון ומחיקה
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // חיפוש
  search(config: SearchConfig): Promise<Memory[]>;

  // תקינות
  health(): Promise<HealthCheckResult>;

  // מחזור חיים (אופציונלי)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

מתזמר Singleton אשר:

- **רושם** מנגנוני אחסון באמצעות `register(backend)` — נקרא בעת האתחול מתוך `index.ts`
- **מגדיר** מנגנון ראשי ומנגנונים חלופיים באמצעות `configure(primary, fallbacks)`
- **מנתב** פעולות CRUD/חיפוש אל המנגנון הראשי, עם שרשרת חלופות במקרה של כשל
- **בודק את התקינות** של כל מנגנוני האחסון באופן תקופתי

**התנהגות החלופות:**

| פעולה    | ראשי                      | חלופות                      |
| -------- | ------------------------- | --------------------------- |
| `create` | ✅ ראשי בלבד              | ❌                          |
| `get`    | ✅ ניסיון תחילה מול הראשי | ✅ חלופה אם התוצאה היא null |
| `update` | ✅ ראשי בלבד              | ✅ סנכרון ללא המתנה לתוצאה  |
| `delete` | ✅ ראשי בלבד              | ✅ סנכרון ללא המתנה לתוצאה  |
| `list`   | ✅ ראשי בלבד              | ❌                          |
| `search` | ✅ ראשי תחילה             | ✅ חלופה במקרה של שגיאה     |

#### GenericMemoryBackend (`genericBackend.ts`)

מחבר HTTP כללי שמתאים כל REST API לממשק MemoryBackend. שימושי עבור:

- **Notion** — התחברות באמצעות Notion API
- **Obsidian** — התחברות באמצעות Obsidian Local REST API
- **מנגנוני אחסון מותאמים אישית** — כל שירות שחושף API זיכרון בסגנון REST

**הגדרה:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // כתובת ה-URL הבסיסית של ה-API בצד השרת
  apiKey?: string;           // אסימון Bearer לאימות
  headers?: Record<string, string>;  // כותרות HTTP מותאמות אישית
  timeout?: number;          // זמן קצוב לבקשה (ברירת מחדל: 30000ms)
  backendType?: string;      // לצורכי רישום ביומן

  // דריסות לנקודות קצה (ברירות המחדל משתמשות במוסכמות REST)
  endpoints?: {
    search?: string;   // ברירת מחדל: "/memories/search"
    create?: string;   // ברירת מחדל: "/memories"
    list?: string;     // ברירת מחדל: "/memories"
    get?: string;      // ברירת מחדל: "/memories/{id}"
    update?: string;   // ברירת מחדל: "/memories/{id}"
    delete?: string;   // ברירת מחדל: "/memories/{id}"
    health?: string;   // ברירת מחדל: "/health"
  };

  // מיפויי שמות של פרמטרים בשאילתה
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // מיפויי שמות של פרמטרים בנתיב
  pathParams?: {
    id?/memoryId?
  };
}
```

**צדי שרת מוכרים** מוגדרים מראש ב-`KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend שמצביע אל localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend שמצביע אל api.notion.com/v1
```

#### צדי שרת מובנים

##### SQLiteBackend (`sqliteBackend.ts`)

צד השרת הראשי המוגדר כברירת מחדל. עוטף את מאגר הזיכרון הקיים המבוסס על SQLite באמצעות `src/lib/memory/store.ts`. נרשם אוטומטית בעת האתחול.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

עוטף את שילוב Obsidian הקיים (`src/lib/memory/obsidianBackend.ts`). מתחבר לכספת Obsidian באמצעות Obsidian Local REST API.

### הגדרות

הגדרות צד השרת של הזיכרון נשמרות בטבלת הגדרות היישום ומנוהלות באמצעות `src/lib/memory/settings.ts`:

| הגדרה           | מפתח סביבה/תצורה         | ברירת מחדל | תיאור                        |
| --------------- | ------------------------ | ---------- | ---------------------------- |
| צד שרת ראשי     | `memoryPrimaryBackend`   | `"sqlite"` | המזהה של צד השרת הראשי       |
| צדי שרת חלופיים | `memoryFallbackBackends` | `[]`       | מזהי צדי שרת חלופיים לפי סדר |
| תצורות צד שרת   | `memoryBackendConfigs`   | `{}`       | דריסות תצורה עבור כל צד שרת  |

ההגדרות מנורמלות באמצעות `normalizeMemorySettings()` ונשמרות במטמון ב-`getMemorySettings()`.

### תהליך האתחול

```
אתחול היישום
  → ייבוא של index.ts (כתופעת לוואי): רושם את SQLiteBackend
  → initMemoryBackends() נקראת ממחזור החיים של היישום:
      1. טעינת הגדרות (getMemorySettings)
      2. הגדרת צד שרת ראשי + צדי שרת חלופיים
      3. אתחול כל צדי השרת (בדיקת תקינות)
      4. מוכן לבקשות
```

### הוספת צד שרת חדש

1. **ממשו את הממשק `MemoryBackend`** ב-`src/lib/memory/<name>Backend.ts`
2. **ייצאו** מתוך `src/lib/memory/index.ts`
3. **רשמו** באמצעות `memoryManager.register(yourBackend)` בעת האתחול
4. **הגדירו** באמצעות ההגדרות: הגדירו את `memoryPrimaryBackend` למזהה צד השרת שלכם
5. **בדקו** תוך שימוש ב-`src/lib/memory/__tests__/generic-backend.test.ts` כדוגמה

#### דוגמה: צד שרת Brain

```typescript
import { createGenericMemoryBackend } from "./genericBackend";

const brainBackend = createGenericMemoryBackend("brain", "BK-Brain", {
  baseUrl: process.env.BRAIN_API_URL || "http://localhost:9099",
  apiKey: process.env.BRAIN_API_KEY,
  endpoints: {
    search: "/api/memory/search",
    create: "/api/memory",
    health: "/api/health",
  },
});

memoryManager.register(brainBackend);
```

### אימות

#### בדיקות יחידה

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

פלט צפוי: **35 בדיקות, כולן עוברות**, המכסות:

- בנאי (2)
- בדיקת תקינות (4) — הצלחה, כשל 500, שגיאת רשת, זמן השהיה
- אתחול (2) — הצלחה, כשל
- יצירה (2) — נקודת קצה המוגדרת כברירת מחדל, נקודת קצה מותאמת אישית
- אחזור (4) — הצלחה, 404 ← null, זריקת שגיאה שאינה 404, פרמטרים מותאמים אישית בנתיב
- עדכון (2) — הצלחה, 404 ← false
- מחיקה (2) — הצלחה, 404 ← false
- הצגת רשימה (2) — פרמטרים בשאילתה, שמות פרמטרים מותאמים אישית
- חיפוש (3) — פרמטרים בשאילתה, נקודת קצה מותאמת אישית, סריאליזציה של אפשרויות
- כותרות אימות (2) — אסימון Bearer, כותרות מותאמות אישית
- מפעל (1)

#### בדיקת טיפוסים

```bash
npm run typecheck:core
```

צפוי: **0 שגיאות**.
