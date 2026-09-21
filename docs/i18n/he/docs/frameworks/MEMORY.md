# Memory System (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **מקור האמת:** `src/lib/memory/` ו-`src/app/api/memory/`
> **עודכן לאחרונה:** 2026-06-28 — v3.8.40 (כבוי כברירת מחדל + השלמת פערי קוונטיזציית int8)

OmniRoute מספק זיכרון שיחה מתמשך, המשויך לפי מפתח API (ובאופן
אופציונלי לפי מזהה הפעלה). זיכרונות מחולצים אוטומטית מתשובות LLM
באמצעות התאמת תבניות regex קלת משקל ומוזרקים בחזרה לבקשות הבאות
כהודעת מערכת פותחת (או כהודעת המשתמש הראשונה עבור ספקים שדוחים
את תפקיד המערכת).

> **הזיכרון כבוי כברירת מחדל (v3.8.30+).** הערך `DEFAULT_MEMORY_SETTINGS.enabled`
> הוא כעת `false` (`src/lib/memory/settings.ts`). הפעלת הזיכרון מזריקה עד
> `maxTokens` (~2k) של הקשר שאוחזר לתוך **כל** בקשת צ'אט, והדבר
> כרוך בחיוב — עלות בלתי צפויה עבור התקנות חדשות ועבור לקוחות שמנהלים
> את ההקשר שלהם בעצמם. יש להצטרף במפורש תחת **הגדרות ← זיכרון** (הלשונית
> `MemorySkillsTab` מציגה התראת עלות טוקנים כאשר הזיכרון מופעל).
> לקוח יכול להחריג בקשה יחידה באמצעות כותרת הבקשה `x-omniroute-no-memory`
> (`true`/`1`/`yes`) — ראו את טבלת כותרות הבקשה ב-
> [API_REFERENCE.md](../reference/API_REFERENCE.md). בקשה ללא זיכרון מגדירה
> `memoryOwnerId = null`, ובכך משביתה **הן** את הזרקת הזיכרון **והן** את הזרקת המיומנויות
> עבור אותה בקשה (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

הזיכרון **מוגבל להיקף של כל מפתח API**, ולא של כל משתמש — כל בקשה המאומתת
באמצעות אותו מפתח API חולקת את אותו מאגר זיכרון, עם אפשרות להגבלת היקף נוספת
לפי `sessionId`.

## ארכיטקטורה

```
לקוח → /v1/chat/completions (הערך apiKeyInfo נפתר במעלה הזרם)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # מחלץ מזהה
    → getMemorySettings()                     # הגדרות שמורות במטמון
    → shouldInjectMemory(body, {enabled})     # שער
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + וקטור אופציונלי
    → injectMemory(body, memories, provider)  # הודעת מערכת או משתמש
  → קריאה לספק במעלה הזרם
  → בתגובה: extractFacts(text, apiKeyId, sessionId)  # לא חוסם
    → setImmediate → createMemory(fact) לכל התאמה
                   → embed(content) + upsertVector(id, vec)
```

אתרי הקריאה של ההזרקה והחילוץ מחוברים בתוך
`open-sse/handlers/chatCore.ts` (חפשו את `retrieveMemories`, `injectMemory`
ו-`extractFacts`).

## ארכיטקטורת המנוע (פתרון ב-3 שכבות)

מנוע הזיכרון קובע את נתיב האחזור בזמן ריצה על סמך התשתית
וההגדרות הזמינות. קיימות שלוש שכבות, המיושמות לפי סדר העדיפות הבא:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  שכבה 0 — מילות מפתח (FTS5)                                  │
  │  זמינות מבוססת בדיקה: FTS5 כאשר גרסת SQLite                  │
  │  תומכת בו (better-sqlite3 / node:sqlite / bun:sqlite);       │
  │  אינו זמין בגרסאות ללא FTS5 (למשל sql.js/WASM —              │
  │  "no such module: fts5"). משמש כאשר strategy = "exact" או    │
  │  כחלופה; ערך keyword ב-engine-status משקף את הבדיקה.          │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  שכבה 1 — וקטור מוטמע (sqlite-vec)                            │
  │  sqlite-vec v0.1.9 נטען באמצעות db.loadExtension().          │
  │  KNN בכוח גס על וקטורי Float32. פעיל כאשר:                    │
  │   • טעינת sqlite-vec באמצעות loadExtension מצליחה            │
  │   • מקור הטמעה זמין (remote | static | transformers)         │
  │     ויכול להפיק Float32Array                                  │
  │   • הטבלה vec_memories קיימת (נוצרת בקריאה הראשונה ל-ready())│
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  שכבה 2 — Qdrant (מסד נתונים וקטורי חיצוני בהצטרפות מפורשת)   │
  │  כאשר הוא מופעל, הוא מחליף את sqlite-vec עבור semantic/hybrid.│
  │  דורש מופע Qdrant פועל + host/port מוגדרים.                   │
  └─────────────────────────────────────────────────────────────┘
```

הירידה ברמת השירות אוטומטית ושקופה:

- אם טעינת sqlite-vec נכשלת, שכבה 1 אינה זמינה ← מתבצעת חזרה לשכבה 0.
- אם מקור ההטמעה מחזיר שגיאה, שכבה 1 חוזרת לשכבה 0.
- אם Qdrant אינו תקין, שכבה 2 חוזרת לשכבה 1 (או לשכבה 0 אם גם שכבה 1
  אינה זמינה).

## מקורות הטמעה

שכבת ההטמעה (`src/lib/memory/embedding/`) קובעת באיזה מקור להשתמש
בהתבסס על `MemorySettingsExtended.embeddingSource`:

| מקור           | תיאור                                                                          | נדרש מפתח | אתחול קר         |
| -------------- | ------------------------------------------------------------------------------ | --------- | ---------------- |
| `remote`       | משתמשת ב-API ההטמעה של ספק מוגדר (OpenAI, Cohere וכו׳)                         | כן        | ללא              |
| `static`       | הטמעה מקומית באמצעות טבלת חיפוש דרך `potion-base-8M` (WordPiece + מיצוע מאוחד) | לא        | ~200ms           |
| `transformers` | הסקת ONNX מקומית דרך `@huggingface/transformers` v4, `all-MiniLM-L6-v2`        | לא        | ~3s + ~400MB RAM |
| `auto`         | הכרעה בזמן ריצה: remote (אם קיים מפתח) → static → transformers → null          | תלוי      | תלוי             |

**סדר ההכרעה עבור `auto`:**

1. מציאת הספק הראשון ב-`listEmbeddingProviders()` שעבורו `hasKey === true` → `remote`.
2. אם `settings.staticEnabled === true` → `static`.
3. אם `settings.transformersEnabled === true` → `transformers`.
4. אחרת → `null` (חזרה לחיפוש מילות מפתח של FTS5).

מטמון ההטמעה (`src/lib/memory/embedding/cache.ts`) משתמש במפת LRU בזיכרון
שהמפתח שלה הוא `${source}:${model}:${dim}:${sha256(text)}`, ומוגבלת ל-
`MEMORY_EMBEDDING_CACHE_MAX` רשומות (ברירת המחדל היא 1000), עם TTL של
`MEMORY_EMBEDDING_CACHE_TTL_MS` (ברירת המחדל היא 5 דקות). המטמון משותף לכל הקוראים
במהלך מחזור החיים של כל תהליך.

## RRF היברידי (k=60)

כאשר `strategy = "hybrid"` ומאגר הווקטורים זמין, האחזור משתמש
במיזוג דירוגים הופכיים (Reciprocal Rank Fusion) כדי למזג את תוצאות FTS5 ותוצאות החיפוש הווקטורי:

```
RRF(d) = Σ  1 / (k + rank_i(d))      כאשר k = 60 (ניתן להגדרה באמצעות MEMORY_RRF_K)
          i
```

באופן קונקרטי:

1. הרצת חיפוש FTS5 → רשימה מדורגת `R_fts` (מיקום 1..N).
2. הרצת חיפוש וקטורי KNN → רשימה מדורגת `R_vec` (מיקום 1..M).
3. עבור כל `memoryId` ייחודי:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 אם אינו נמצא ברשימה).
4. מיון לפי `rrf_score` בסדר יורד, והחלת מעבר בהתאם לתקציב הטוקנים.

ידוע כי RRF יעיל ללא צורך בנרמול ציונים בין
מערכות אחזור הטרוגניות. ברירת המחדל `k=60` מקורה במאמר המקורי
של Cormack ואחרים, והיא פועלת היטב עבור קורפוסים קטנים (<10k זיכרונות).

## מילוי נתונים חסרים (עצל + אינדוקס מחדש)

כאשר מודל ההטמעה משתנה (מזוהה באמצעות `embedding_signature`),
מאגר הווקטורים נבנה מחדש וכל הזיכרונות הקיימים מסומנים
כ-`needs_reindex = 1` בטבלה `memories`.

**מילוי עצל של נתונים חסרים**: באחזור הבא, כל זיכרון שחסרה לו רשומה וקטורית
עובר הטמעה ומוכנס ל-`vec_memories` לפני הפעלת החיפוש. כך
עלות מילוי הנתונים החסרים נפרסת על פני בקשות אמיתיות מבלי לחסום את האתחול.

**אינדוקס מחדש מפורש**: לשונית Engine ב-`/dashboard/memory` מספקת
כפתור "בצע אינדוקס מחדש כעת", שקורא ל-`POST /api/memory/reindex`. המטפל קורא
ל-`runReindexBatch()` מתוך `src/lib/memory/reindex.ts`, שמעבד עד
`limit` רשומות ממתינות בכל בקשה. ניתן לבדוק את ההתקדמות באמצעות
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

הטבלה `memory_vec_meta` (מיגרציה `083_memory_vec.sql`) מאחסנת:

- `active_dim` — ממד הווקטור הנוכחי (null = טרם כויל).
- `embedding_signature` — `${source}:${model}:${dim}` המשמש לזיהוי שינויים.
- `last_reset_at` — חותמת הזמן של האיפוס המלא האחרון.
- `vec_loaded` — דגל 0/1 המציין אם sqlite-vec נטען בהצלחה.

## הרחבת הגדרות

תשעה שדות של הטמעות ווקטורים זמינים ב-`MemorySettingsExtended` בקובץ
`src/shared/schemas/memory.ts`, ונשמרים באמצעות `src/lib/db/settings.ts`:

| שדה                      | סוג                                                | ברירת מחדל | תיאור                                                   |
| ------------------------ | -------------------------------------------------- | ---------- | ------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`   | מקור ההטמעות שבו יש להשתמש                              |
| `embeddingProviderModel` | `string \| null`                                   | `null`     | ספק/מודל בתבנית `provider/model`                        |
| `customBaseUrl`          | `string \| null`                                   | `null`     | כתובת URL בסיסית של נקודת קצה תואמת OpenAI לזיכרון בלבד |
| `customModelId`          | `string \| null`                                   | `null`     | מזהה המודל שנשלח לנקודת הקצה המותאמת אישית              |
| `transformersEnabled`    | `boolean`                                          | `false`    | הצטרפות לשימוש ב-Transformers.js ‏(MiniLM, כ-400MB)     |
| `staticEnabled`          | `boolean`                                          | `false`    | הצטרפות לשימוש במודל המקומי הסטטי potion-base-8M        |
| `rerankEnabled`          | `boolean`                                          | `false`    | הפעלת שלב דירוג מחדש (מוסיף 200-500ms+‎ לכל בקשה)       |
| `rerankProviderModel`    | `string \| null`                                   | `null`     | ספק/מודל לדירוג מחדש בתבנית `provider/model`            |

הערך `rerankProviderModel` נפתר באמצעות `POST /v1/rerank` (שנקרא דרך ממשק הלולאה המקומית), ולכן הוא מקבל כל ערך שהנתיב הזה מקבל: מודל דירוג מחדש נבחר בענן (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) או צומת ספק תואם OpenAI בתבנית `<node-prefix>/<model>` (לדוגמה, `skilled-mini/bge-reranker-v2-m3` עבור שרת TEI/Infinity). צמתי לולאה מקומית תמיד כשירים; צומת במארח אחר (LAN, Tailscale) דורש בנוסף את דגל התכונה `RERANK_REMOTE_PROVIDER_NODES` וחייב לעבור את מדיניות כתובות ה-URL היוצאות של הספק — ראו [דגלי תכונות](../reference/FEATURE_FLAGS.md). בורר לוח הבקרה מציג ספקים נבחרים וכן צמתים מקומיים; ניתן להגדיר ישירות כל מחרוזת `provider/model` תקינה באמצעות `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | מנגנון הווקטורים שבו יש להשתמש |

הגדרות אלה נחשפות באמצעות `GET /PUT /api/settings/memory` (סכמה `MemorySettingsExtendedSchema`).

עבור המקור `remote`, הזיכרון מקבל גם את ההגדרות האופציונליות `customBaseUrl` ו-
`customModelId`. יחד, הן בוחרות נקודת קצה `/embeddings` תואמת OpenAI
ומודל, מבלי לשנות את מאגר ההטמעות הגלובלי. נקודת הקצה עוברת
נרמול לפני השימוש ונבדקת לפי מדיניות כתובות ה-URL היוצאות של הספק: נדרש
HTTP(S), פרטי אימות מוטמעים ומחרוזות שאילתה נדחים, וכתובות
מטא-נתונים של הענן נותרות חסומות. ערכים ריקים משמרים את ספק המאגר שנבחר. שגיאות
המוחזרות ללוח הבקרה עוברות טיהור, ופרטי האימות של נקודת הקצה לעולם אינם נרשמים ביומן.

> **TODO (D20):** התחום `global` (שיתוף זיכרונות בין כל מפתחות ה-API) אינו
> ממומש בגרסה זו. הוא דורש שינויים בסכמה ונתיב אחזור גלובלי.
> יש לעקוב אחריו בנפרד.

## שכבות אחסון

### ראשית: SQLite (טבלת `memories`)

נוצרת באמצעות המיגרציה `015_create_memories.sql`:

| עמודה                       | סוג                | הערות                                                                         |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID שנוצר באמצעות `crypto.randomUUID()`                                      |
| `api_key_id`                | `TEXT NOT NULL`    | מפתח ה-API שהוא הבעלים                                                        |
| `session_id`                | `TEXT`             | טווח אופציונלי לכל שיחה                                                       |
| `type`                      | `TEXT NOT NULL`    | אחד מבין `factual`,‏ `episodic`,‏ `procedural`,‏ `semantic`                   |
| `key`                       | `TEXT`             | מפתח upsert יציב, לדוגמה `preference:i_prefer_python`                         |
| `content`                   | `TEXT NOT NULL`    | הטקסט בפועל של העובדה                                                         |
| `metadata`                  | `TEXT`             | אובייקט JSON ‏(category, extractedAt, source, ...)                            |
| `created_at` / `updated_at` | `TEXT`             | מחרוזות ISO 8601                                                              |
| `expires_at`                | `TEXT`             | תפוגה אופציונלית; `NULL` פירושו קבוע                                          |
| `memory_id`                 | `INTEGER UNIQUE`   | נוסף על ידי `023_fix_memory_fts_uuid.sql` כדי לגשר בין UUIDs ל-rowids של FTS5 |

אינדקסים: `api_key_id`,‏ `session_id`,‏ `type`,‏ `expires_at`, וכן האינדקס הייחודי
`memory_id`.

**סמנטיקת Upsert**: הפונקציה `createMemory()` מחפשת שורה קיימת עם אותו
`(api_key_id, key)` ומעדכנת אותה במקום כאשר היא נמצאת (תוך מיזוג `metadata`
באמצעות shallow spread). כך נמנעת גדילה בלתי מוגבלת של הטבלה בעקבות הצהרות
חוזרות על העדפות.

### חיפוש טקסט מלא (טבלה וירטואלית `memory_fts`)

הקובץ `022_add_memory_fts5.sql` יוצר טבלה וירטואלית מסוג FTS5 מעל `content`
ו-`key`. הקובץ `023_fix_memory_fts_uuid.sql` מתקן באג שהתרחש בפועל, שבו המפתח
הראשי מסוג UUID לא התחבר ל-rowid המספרי של FTS5 — המיגרציה מוסיפה את העמודה
`memory_id`, יוצרת מחדש את טבלת FTS ומחברת טריגרים
(`memory_fts_ai`,‏ `memory_fts_ad`,‏ `memory_fts_au`) ששומרים על סנכרון FTS בעת
INSERT,‏ DELETE ו-UPDATE.

משמש את `retrieval.ts` עבור האסטרטגיות `semantic` ו-`hybrid` (ראו להלן).
קוד האחזור מגן באמצעות `hasTable("memory_fts")` וחוזר לסדר כרונולוגי אם טבלת
FTS חסרה או אם שאילתת FTS זורקת שגיאה.

### אופציונלי: Qdrant (שכבה 2 של מאגר הווקטורים)

הקובץ `src/lib/memory/qdrant.ts` מממש שילוב אופציונלי עם Qdrant כשכבה 2 של
מאגר הווקטורים. האחזור מנותב ל-Qdrant רק כאשר בורר המנוע
`memoryVectorStore === "qdrant"` — ברירת המחדל `"auto"` (וגם `"sqlite-vec"`)
**לעולם אינה** בוחרת ב-Qdrant. המתג בלשונית Engine מגדיר **גם** את `qdrantEnabled`
וגם את `memoryVectorStore` יחד: הפעלה הופכת את Qdrant למאגר הראשי, והשבתה
מאפסת ל-`"auto"` (#5597 — לפני תיקון זה, ההפעלה לא עשתה דבר מכיוון ששום דבר
לא כתב לבורר המנוע). אם Qdrant אינו נגיש או אינו מחזיר דבר, האחזור חוזר אל
sqlite-vec ← FTS5.

- `upsertSemanticMemoryPoint()` — מטמיעה את `key + content` באמצעות מודל ההטמעה
  שהוגדר, מוודאת שהאוסף קיים (יוצרת וקטורים במרחק קוסינוס
  בשימוש הראשון), ומבצעת upsert לנקודה עם המטען `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — מטמיעה את השאילתה, מחפשת
  באוסף עם סינון לפי `kind = "omniroute_memory"` ובאופן אופציונלי לפי
  `apiKeyId` / `sessionId`. מגבילה את `topK` לטווח `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — מחיקת נקודה בודדת. נקראת על ידי
  `deleteMemory()` לאחר שהשורה ב-SQLite הוסרה (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — מחיקה מרוכזת של נקודות שבהן
  `expiresAtUnix` נמצא בעבר או שבהן `createdAtUnix` ישן מסף
  השמירה. תחילה מתבצעת ספירה, כדי שלוח הבקרה יוכל להציג מספרים בפועל.
- `checkQdrantHealth()` — בדיקת תקינות באמצעות `GET /readyz`, כולל זמן השהיה.

ממשק ההגדרות מציג את תצורת Qdrant, בדיקת התקינות, בדיקת החיפוש הסמנטי
והניקוי בלשונית **Engine** של `/dashboard/memory`. הנתיבים המתאימים
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
  נכתבים אליו (כתיבה כפולה בשיטת fire-and-forget). זיכרונות קיימים מראש ב-SQLite **אינם**
  מועברים; "Reindex Now" בונה מחדש רק את אינדקס sqlite-vec, ולא את Qdrant.
- **ממד הווקטור מזוהה אוטומטית** מתוך ההטמעה בפועל בשימוש הראשון — אין
  שדה ממד שיש למלא. שינוי מודל ההטמעה לאחר שאוסף כבר קיים
  **אינו** מטופל אוטומטית: האוסף הקיים נשאר ללא שינוי, ופעולות כתיבה/חיפוש
  שממדיהן אינם תואמים נכשלות וחוזרות ל-sqlite-vec. כדי להחליף את מודל ההטמעה,
  יש ליצור מחדש את האוסף (שם חדש, או למחוק אותו ב-Qdrant).
- **מדד מרחק** — תמיד **Cosine** (מקודד באופן קשיח בעת יצירת האוסף; אינו
  ניתן להגדרה).
- **אימות** — מפתח API בלבד (נשלח בכותרת `api-key`; אופציונלי עבור Docker
  מקומי ללא אימות). לא נעשה שימוש ב-JWT/RBAC.
- **שדות תצורה** — ממשק המשתמש מציג את `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. השדות `vectorSize` / `hnswEfConstruct` זמינים רק דרך env/DB, ו-`vectorSize`
  אינו משמש ליצירת האוסף (הממד נגזר מההטמעה).

### קוונטיזציה של וקטורים (int8 — בהצטרפות מפורשת, בשני מנועי האחסון)

שני מנועי האחסון הווקטוריים תומכים ב**קוונטיזציית int8 בהצטרפות מפורשת** כדי לצמצם את נפח
הזיכרון של הווקטורים המאוחסנים (קטן פי ~4 מ-Float32), במחיר של ירידה קטנה ביכולת האחזור.
ברירת המחדל היא **כבוי** בשניהם — הווקטורים נשארים בדיוק מלא אלא אם האפשרות
מופעלת במפורש.

| מנוע אחסון | הגדרה                           | סוג                            | ברירת מחדל | מקום הקריאה                                                 |
| ---------- | ------------------------------- | ------------------------------ | ---------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (מפתח DB)  | `"none" \| "int8" \| "binary"` | `"none"`   | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"`   | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** מוגדר לכל מופע באמצעות מפתח ההגדרה `qdrantQuantization`
  (נחשף כשדה `quantization` ב-`PUT /api/settings/qdrant`). כאשר הערך הוא
  `"int8"`, הפונקציה `buildQuantizationConfig()` מבקשת קוונטיזציה סקלרית
  (`always_ram`, קוונטיל `0.99`), והחיפושים מפעילים `rescore: true` כדי שהווקטורים
  בדיוק מלא יעדנו את קבוצת המועמדים מסוג int8.
- הקוונטיזציה של **sqlite-vec** מוגדרת **באמצעות הסביבה בלבד** (ולא כהגדרת DB): יש להגדיר
  `MEMORY_VEC_QUANTIZATION=int8` כדי לאחסן את הווקטורים המקומיים כעמודת `int8[dim]`
  באמצעות `vec_quantize_int8(?, 'unit')`. המצב שנבחר משולב בתוך
  `embedding_signature` (סיומת `:int8`), כך שהחלפת מצבים מפעילה אינדוקס מחדש מלא
  של הטבלה `vec_memories` — אותו נתיב מילוי עצל המשמש כאשר
  מודל ההטמעה משתנה.

## סוגי זיכרון

`MemoryType` (`src/lib/memory/types.ts`):

| סוג          | שימוש                                                               |
| ------------ | ------------------------------------------------------------------- |
| `factual`    | העדפות, עובדות יציבות על המשתמש, דפוסי התנהגות                      |
| `episodic`   | החלטות הקשורות לרגע מסוים ("I chose Postgres")                      |
| `procedural` | זיכרון של תהליכי עבודה / הוראות ביצוע (שמור; כיום אין מחלץ אוטומטי) |
| `semantic`   | שמור לרשומות במאגר וקטורים                                          |

אסטרטגיית האחזור של `MemoryConfig` היא אחת מבין `exact`, `semantic` או `hybrid`,
והתחום הוא אחד מבין `session`, `apiKey` או `global`. תחום ברירת המחדל של
`getMemorySettings()` הוא `apiKey`.

## חילוץ עובדות (`extraction.ts`)

החילוץ **מבוסס על ביטויים רגולריים**, ולא על LLM — הוא פועל בתוך התהליך באמצעות
`setImmediate()`, כך שלעולם אינו חוסם את זרם התגובה:

- **דפוסי העדפה** → `MemoryType.FACTUAL`
  (לדוגמה, `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **דפוסי החלטה** → `MemoryType.EPISODIC`
  (לדוגמה, `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **דפוסי הרגל** → `MemoryType.FACTUAL`
  (לדוגמה, `I usually …`, `I always …`, `I tend to …`)

כל התאמה עוברת ניקוי (`trim`, איחוד רווחים, והגבלה ל-500 תווים),
הסרת כפילויות בתוך האצווה באמצעות `factKey(category, content)` יציב,
ואחסון באמצעות `createMemory()` עם המטא-נתונים
`{category, extractedAt, source: "llm_response"}`. טקסט הקלט מוגבל ל-
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — כאשר הוא ארוך יותר, נעשה שימוש ב**סוף** הטקסט,
כך שהתוכן האחרון של המסייע תמיד נכלל בעיבוד.

`extractFactsFromText(text)` מיוצאת לצורך בדיקות ומחזירה את העובדות המובנות
מבלי לאחסן אותן.

## אחזור (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` היא נקודת הכניסה הראשית. היא:

1. מנרמלת ומאמתת את התצורה באמצעות `MemoryConfigSchema`.
2. מחזירה מיד `[]` כאשר `enabled` הוא false או כאשר `maxTokens <= 0`.
3. מגבילה את `maxTokens` לטווח `[1, 8000]`.
4. מזהה אם הטבלה המודרנית `memories` קיימת (לעומת הטבלה הישנה `memory`),
   כך שמסדי נתונים ישנים ממשיכים לפעול.
5. בונה את שאילתת הבסיס עם תנאי תפוגה
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), תחום
   הפעלה אופציונלי, וסף `retentionDays` אופציונלי.
6. מסתעפת בהתאם לאסטרטגיה:
   - **`exact`** (ברירת המחדל): סדר כרונולוגי באמצעות `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: אם `config.query` קיים וגם `memory_fts` קיימת, מבצעת JOIN עם
     `memory_fts MATCH ?` וממיינת לפי דירוג FTS; חוזרת לסדר כרונולוגי
     כאשר FTS מחזירה 0 שורות.
   - **`hybrid`**: איחוד של תוצאות FTS (רלוונטיות גבוהה יותר) ושל
     הקבוצה הכרונולוגית, תוך הסרת כפילויות לפי מזהה.
7. מחשבת ציון רלוונטיות של מילות מפתח (`getRelevanceScore`) על פני
   `content`, `key` ו-JSON של `metadata` כאשר מסופקת שאילתה. שורות בעלות
   ציון אפס מסוננות החוצה.
8. ממיינת לפי ציון בסדר יורד, ולאחר מכן לפי `createdAt` בסדר יורד.
9. עוברת על הרשימה המדורגת ומקבלת רשומות כל עוד הסכום המצטבר של
   `estimateTokens(content)` (בקירוב `length / 4`) נשאר במסגרת התקציב. תמיד
   מחזירה לפחות רשומה אחת כאשר קיימת התאמה כלשהי.

`estimateTokens` מיוצאת ומשמשת את האחזור, הסיכום וכלי ה-MCP
`omniroute_memory_search`.

## הזרקה (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. מאחד את כל תוכני הזיכרון למחרוזת יחידה מסוג `Memory context: …`.
2. בוחר אסטרטגיה לפי שם הספק:
   - **הודעת מערכת** (ברירת המחדל עבור OpenAI,‏ Anthropic,‏ Gemini, …) — מוסיף
     `{role: "system", content: memoryText}` לפני כל הודעות המערכת הקיימות,
     כדי שהנחיות המערכת של המשתמש עדיין יקבלו עדיפות.
   - **הודעת משתמש** (חלופה) — עבור ספקים המופיעים ב-
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`:‏ `o1`,‏ `o1-mini`,‏ `o1-preview`,
     `glm`,‏ `glmt`,‏ `glm-cn`,‏ `zai`,‏ `qianfan`. ספקים אלה דוחים את תפקיד המערכת,
     ואחרת היו מחזירים 400 (ראו בעיה #1701 עבור GLM/Zhipu).
3. מתעד את המספר, האסטרטגיה והמודל תחת `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` מיוצא עבור קוראים שצריכים לקבל
החלטות ניתוב משלהם. ספקים לא מוכרים מקבלים כברירת מחדל `true`
(תפקיד מערכת מותר) מטעמי בטיחות.

## הגדרות (`settings.ts`)

תצורת הזיכרון **מאוחסנת בטבלת ההגדרות במסד הנתונים**, ולא במשתני סביבה.
`getMemorySettings()` קוראת מ-`getSettings()` ושומרת את התוצאה במטמון
בתוך התהליך; `invalidateMemorySettingsCache()` נקראת על ידי נתיב ה-PUT של
ההגדרות לאחר כתיבות.

### שדות מדור קודם (כל הגרסאות)

| מפתח במסד הנתונים     | סוג      | ברירת מחדל                                           | פקד בממשק המשתמש                                      |
| --------------------- | -------- | ---------------------------------------------------- | ----------------------------------------------------- |
| `memoryEnabled`       | בוליאני  | `false` (כבוי כברירת מחדל מאז v3.8.30)               | הפעלה/כיבוי של הזיכרון                                |
| `memoryMaxTokens`     | מספר שלם | `2000` (טווח `0–16000`)                              | תקציב טוקנים להזרקה                                   |
| `memoryRetentionDays` | מספר שלם | `30` (טווח `1–365`)                                  | חלון שמירה                                            |
| `memoryStrategy`      | enum     | `"hybrid"` (אחת מתוך `recent`, `semantic`, `hybrid`) | אסטרטגיית אחזור                                       |
| `skillsEnabled`       | בוליאני  | `false`                                              | החלפת מצב של הזרקת מיומנויות לפי מפתח (ראו SKILLS.md) |

הערה: אסטרטגיית ממשק המשתמש `"recent"` ממופה לאסטרטגיית האחזור הפנימית
`"exact"` באמצעות `toMemoryRetrievalConfig()` (סדר כרונולוגי).

### שדות חדשים (v3.8.6, תוכנית 21 D9)

ראו גם את הסעיף "הרחבת הגדרות" לעיל לתיאורי השדות.

| מפתח במסד הנתונים           | שדה API                  | ברירת מחדל |
| --------------------------- | ------------------------ | ---------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`   |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`     |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`    |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`    |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`    |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`     |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`   |

מפתחות מסד הנתונים הקשורים ל-Qdrant (`qdrantEnabled`,‏ `qdrantHost`,‏ `qdrantPort`,
`qdrantApiKey`,‏ `qdrantCollection` עם ברירת המחדל `"omniroute_memory"`,
ו-`qdrantEmbeddingModel` עם ברירת המחדל `"openai/text-embedding-3-small"`) נקראים על ידי
`normalizeQdrantConfig()` ב-`qdrant.ts`.

### משתני סביבה (v3.8.6)

שישה משתני סביבה אופציונליים מכווננים את התנהגות המנוע בזמן ריצה (מתועדים ב-`.env.example`):

| משתנה                           | ברירת מחדל                 | תיאור                                                                                                                                        |
| ------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL של מטמון ההטמעות (5 דקות)                                                                                                                |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | מספר הרשומות המרבי במטמון LRU של הטמעות                                                                                                      |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | מאגר HF עבור מודל Transformers.js                                                                                                            |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | מאגר HF עבור מודל potion סטטי                                                                                                                |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | היכן לאחסן מודלים שהורדו                                                                                                                     |
| `MEMORY_VEC_TOP_K`              | `20`                       | ערך top-K המוגדר כברירת מחדל עבור חיפוש וקטורי                                                                                               |
| `MEMORY_RRF_K`                  | `60`                       | קבוע k של RRF עבור חיפוש היברידי                                                                                                             |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | הגדירו ל-`int8` כדי לאחסן וקטורים מקומיים של sqlite-vec בצורה מקוונטטת (קטנים פי ~4; בהצטרפות מפורשת). שינוי מצב מאלץ יצירה מחדש של האינדקס. |

## סיכום (`summarization.ts`)

הפונקציה `summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` דוחסת תוכן ישן יותר כאשר סך הטוקנים המצטבר בזיכרונות של מפתח חורג מהמכסה. היא עוברת על השורות בסדר יורד לפי `created_at`, שומרת את השורות שנכנסות במכסה, וביתר השורות מחליפה את `content` במקום בשלושת המשפטים הראשונים של המקור. `tokensSaved` הוא ההפרש בתוצאת `estimateTokens` בין התוכן הישן לחדש.

השגרה הזו **זמינה אך אינה מופעלת אוטומטית** בצינור עיבוד הצ'אט הנוכחי — הפעילו אותה מתוך cron, פעולת מנהל מערכת או קוד מקשר של `MemoryConfig.autoSummarize` אם נדרש דחיסה מתמשכת. אובדן הנתונים הוא חד-כיווני: הטקסט המקורי נדרס.

## REST API

כל נקודות הקצה דורשות אימות ניהולי (`requireManagementAuth`).

### נקודות קצה מרכזיות של זיכרון (קיימות + מעודכנות)

| שיטה     | נתיב                 | תיאור                                                                                                                                                                                       |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | רשימה מחולקת לעמודים עם מסננים: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. התגובה כוללת את `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`           |
| `POST`   | `/api/memory`        | יצירת רשומה (מאומתת באמצעות Zod: `content`, `key`, וכן `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt` אופציונליים). קוראת ל-`createMemory()`, שמבצעת upsert לפי `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | אחזור רשומה יחידה לפי UUID                                                                                                                                                                  |
| `PUT`    | `/api/memory/[id]`   | עדכון שדות הרשומה (`type`, `key`, `content`, `metadata`). גוף הבקשה: `MemoryUpdatePutSchema`. מסנכרנת גם את הווקטור אם מקור ההטמעה זמין.                                                    |
| `DELETE` | `/api/memory/[id]`   | מחיקת רשומה; מוחקת גם מתוך `vec_memories` (D15) ומ-Qdrant על בסיס מאמץ מיטבי. מחזירה 404 כאשר הרשומה אינה קיימת.                                                                            |
| `GET`    | `/api/memory/health` | מריצה את `verifyExtractionPipeline("health-check")` — מחזור מלא של יצירה←רשימה←מחיקה. מחזירה `{working, latencyMs, error?}`                                                                 |

### נקודות קצה חדשות של מנוע הזיכרון (תוכנית 21)

| שיטה   | נתיב                              | תיאור                                                                                                                                                                 |
| ------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | הרצת ניסיון של `retrieveMemories` — מחזירה תוצאות מדורגות עם ציון, שכבה וטוקנים. גוף הבקשה: `RetrievePreviewSchema`. אינה מזריקה או משנה זיכרונות.                    |
| `GET`  | `/api/memory/embedding-providers` | מציגה ספקים עם מודלי הטמעה ומציינת לאילו מהם מוגדר מפתח API.                                                                                                          |
| `GET`  | `/api/memory/engine-status`       | מחזירה את הסטטוס המלא של המנוע: שכבת מילות מפתח, פתרון הטמעה, נתונים סטטיסטיים של מאגר הווקטורים, תקינות Qdrant והגדרות דירוג מחדש. מבנה: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | הפעלה ידנית של דחיסת זיכרון. גוף הבקשה: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). מחזירה `{candidates, tokensSaved}`.                         |
| `POST` | `/api/memory/reindex`             | הפעלת אינדוקס וקטורי מחדש עבור זיכרונות עם `needs_reindex=1`. גוף הבקשה: `MemoryReindexSchema` (`force`). מחזירה `{started, pending}`.                                |

### נקודות קצה של הגדרות

| שיטה   | נתיב                                    | תיאור                                                                                                         |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | `MemorySettingsExtended` המנורמל הנוכחי (7 שדות חדשים + שדות מדור קודם)                                       |
| `PUT`  | `/api/settings/memory`                  | עדכון כל שדה מתוך `MemorySettingsExtendedSchema` (12 שדות בסך הכול)                                           |
| `GET`  | `/api/settings/qdrant`                  | הגדרות Qdrant הנוכחיות (`QdrantSettingsSchema`)                                                               |
| `PUT`  | `/api/settings/qdrant`                  | עדכון הגדרות Qdrant. גוף הבקשה: `QdrantSettingsUpdateSchema`. ערך של מחרוזת ריקה עבור `apiKey` מסיר את המפתח. |
| `GET`  | `/api/settings/qdrant/health`           | בדיקת זמינות מול מופע Qdrant המוגדר. מחזירה `QdrantHealthResultSchema`.                                       |
| `POST` | `/api/settings/qdrant/search`           | בדיקת חיפוש סמנטי מול Qdrant. גוף הבקשה: `QdrantSearchSchema` (`query`, `topK`).                              |
| `POST` | `/api/settings/qdrant/cleanup`          | הסרת נקודות Qdrant עבור זיכרונות שפג תוקפם או זיכרונות ישנים.                                                 |
| `GET`  | `/api/settings/qdrant/embedding-models` | הצגת מודלי ההטמעה הזמינים עבור Qdrant.                                                                        |

שאילתת הרשימה של `/api/memory` תומכת בעימוד המבוסס על `page`
(`parsePaginationParams`) **או** ב-`offset` גולמי — כאשר `offset` קיים, הוא
מקבל קדימות, וערך `page` נגזר מחושב עבור מבנה התגובה.

## כלי MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

כאשר שרת ה-MCP מופעל, נרשמים שלושה כלי זיכרון:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  ← עוטף את `retrieveMemories()`. החל מ-v3.8.6 (D16), ה-`strategy` נקראת
  מתוך `getMemorySettings()` במקום להיות מקודדת כ-`"exact"`. אם
  `query` סופקה וה-`strategy` היא `semantic` או `hybrid`, נעשה שימוש במאגר
  הווקטורי כאשר הוא זמין.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` ← עוטף את `createMemory()`. מקבל רק את 4 הסוגים הקנוניים:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` ← מציג רשומות
  תואמות, מסנן לפי הצורך לפי חותמת זמן של יצירה לפני מועד מסוים, ולאחר מכן מוחק כל אחת
  באמצעות `deleteMemory()` (שמסירה גם וקטורים מ-sqlite-vec ומ-Qdrant).

לפרטים על התעבורה ותחום הפעולה, ראו [MCP-SERVER.md](./MCP-SERVER.md).

## לוח בקרה (סטודיו הזיכרון)

`src/app/(dashboard)/dashboard/memory/page.tsx` הוא כעת **סטודיו בעל 3 לשוניות**:

### לשונית: זיכרונות

- כרטיס הסבר על הרעיון (הסבר מתקפל מסוג "איך זה עובד").
- רשימה, חיפוש ודפדוף בזמן אמת (השהיה של 300 מילישניות).
- מסנן סוגים (`factual` / `episodic` / `procedural` / `semantic` / הכול).
- חלון הוספת זיכרון (מפתח, תוכן, סוג).
- עריכה בתוך השורה (כפתור עיפרון ← `PUT /api/memory/[id]`).
- מחיקה לכל שורה (עם תיבת דו-שיח לאישור).
- ייצוא JSON של העמוד הנוכחי; ייבוא JSON באמצעות בורר קבצים.
- כרטיסי נתונים סטטיסטיים: `totalEntries`, `tokensUsed`, `hitRate`.
- כפתור "דחיסת ישנים" ← `POST /api/memory/summarize` (הרצה יבשה מציגה תחילה
  את מספר המועמדים, ולאחר מכן מבקשת אישור).
- נקודת תקינות ירוקה/אדומה המבוססת על `GET /api/memory/health`.

### לשונית: סביבת ניסוי

- קלט שאילתה + בורר אסטרטגיה (מדויקת / סמנטית / היברידית) + תקציב טוקנים.
- "הדמיה" ← `POST /api/memory/retrieve-preview` — מציגה תוצאות מדורגות עם
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- חלונית פתרון המציגה באיזה מקור הטמעות / מאגר וקטורי נעשה שימוש
  והאם התרחש מעבר לחלופה.

### לשונית: מנוע

- חלונית מצב המנוע (תג FTS5 למילות מפתח, תג הטמעה, תג מאגר וקטורי,
  תג תקינות Qdrant, תג דירוג מחדש).
- כפתור "יצירת אינדקס מחדש כעת" ← `POST /api/memory/reindex`.
- בורר מקור הטמעה (אוטומטי / מרוחק / סטטי / transformers + מתגים).
- כרטיס תצורת Qdrant (מתג הפעלה, מארח/פורט/אוסף/מפתח, בדיקת חיבור,
  בדיקת חיפוש סמנטי, ניקוי).
- כרטיס תצורת דירוג מחדש (מתג הפעלה, בורר ספק/מודל).

הגדרות הזיכרון ו-Qdrant נמצאות גם תחת
`/dashboard/settings → זיכרון ומיומנויות` (`MemorySkillsTab.tsx`) עבור
ממשק ההגדרות הישן/הגלובלי.

## אחסון במטמון

`src/lib/memory/store.ts` מנהל מטמון דמוי LRU בתוך התהליך
(`MEMORY_CACHE_TTL = 1 דקה`, `MEMORY_MAX_CACHE_SIZE = 500`, עם פינוי 20 %
מהרשומות הישנות ביותר) עבור קריאות `getMemory(id)`, וכן שכבת מפתח/ערך כללית
בשם `memoryCache` (`src/lib/memory/cache.ts`) עם המתודות `get`/`set`/`invalidate`,
המשמשת קוראים המעוניינים במטמון בעל תחום משלהם (LRU של 1,000 רשומות,
TTL ברירת מחדל של 5 דקות).

## פרטיות ומחזור חיים

- הבעלות על הזיכרון נקבעת לפי מזהה מפתח ה-API (`resolveMemoryOwnerId` בתוך
  `chatCore.ts`). ללא `apiKeyInfo.id`, לא מתבצעים אחזור, הזרקה או חילוץ.
- רשומות עם `expires_at` עתידי מסוננות מתוצאות האחזור; רשומות ישנות
  מעבר ל-`retentionDays` מוחרגות באמצעות תנאי
  `created_at >= cutoff` בתוך `retrieveMemories`.
- למחיקה מוחלטת, השתמשו ב-`DELETE /api/memory/[id]` או ב-`omniroute_memory_clear`.
- החילוץ מתבצע בשיטת "שגר ושכח" באמצעות `setImmediate`; כשלים נרשמים תחת
  `memory.extraction.background.failed` ולעולם אינם נחשפים למבצע הקריאה.
- סבבי אימות (`verifyExtractionPipeline`) מנקים את רשומות הבדיקה שלהם
  בתוך בלוק `finally`.

## ראו גם

- [SKILLS.md](./SKILLS.md) — ההגדרה `skillsEnabled` מזריקה הגדרות של כלים
  לצד הזיכרון.
- [MCP-SERVER.md](./MCP-SERVER.md) — תעבורת MCP / תחומי הרשאה.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ממשק API רחב יותר.
- מודולי מקור:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + ‏RRF היברידי
  - `src/lib/memory/embedding/index.ts` — שכבת הטמעה מרובת מקורות
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

## בחירת ספק הטמעה (v3.8.16+)

מנוע הזיכרון של OmniRoute תומך ב-**ארבעה מקורות הטמעה** (`src/lib/memory/embedding/`). לכל אחד מהם פשרות שונות מבחינת **השהיה, עלות, איכות המודל ומורכבות ההגדרה**.

### מקורות ההטמעה

| ספק            | מקור                                      | השהיה                            | עלות                   | איכות                           | הגדרה                                |
| -------------- | ----------------------------------------- | -------------------------------- | ---------------------- | ------------------------------- | ------------------------------------ |
| `transformers` | מודל ONNX מקומי (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                  | חינם                   | טובה                            | `npm install` בלבד                   |
| `static`       | וקטורים שחושבו מראש (במטמון)              | <1ms                             | חינם                   | לא רלוונטי (תלוי בפגיעה במטמון) | ללא                                  |
| `remote`       | API של OpenAI / Cohere / Voyage           | ~100-300ms                       | $0.02-0.10/1M אסימונים | מצוינת                          | מפתח API                             |
| `auto`         | בוחר בזמן ריצה את המקור הזמין הטוב ביותר  | זהה למקור שנבחר                  | חינם                   | זהה למקור שנבחר                 | ללא                                  |
| _(מטמון)_      | שכבת LRU בזיכרון מעל כל מקור              | <1ms (פגיעה), השהיה מלאה (החטאה) | חינם                   | זהה למקור הבסיסי                | פעיל תמיד (אינו מקור שניתן לבחור בו) |

### עץ החלטה

```
                  מהו הקשר הפריסה שלכם?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  פיתוח/בדיקות  ייצור קטן   ייצור גדול   קצה / לא מקוון
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (חינם, ללא API)            (האיכות הטובה ביותר)   (ללא אינטרנט)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            תמיד הוסיפו מעל את שכבת `cache`
            (`LruCache` עוטף כל ספק)
```

### הגדרת מסד הנתונים וה-API

אפשרויות הטמעת הזיכרון מוגדרות באמצעות ה-API/ממשק המשתמש של ההגדרות, ולא באמצעות משתני סביבה. מפתחות מסד הנתונים הרלוונטיים תחת ההגדרות (`normalizeMemorySettings` בתוך `src/lib/memory/settings.ts`) הם:

- `memoryEmbeddingSource`: ‏`"transformers"` (מקומי), `"remote"` (מבוסס API, למשל OpenAI), `"static"` (מאגר חיצוני), או `"auto"`
- `memoryEmbeddingProviderModel`: מזהה מודל למקורות מרוחקים/סטטיים (למשל, `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, או `"auto"`

#### מודל מקומי (`transformers`)

משתמש באופן פנימי ב-transformers.js כדי להריץ מודלים מקומיים:

```bash
# משתני סביבה הנקראים בקוד (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # מאגר מודל HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # מודל potion סטטי של HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # ספריית מטמון
```

#### מטמון הטמעות LRU

המטמון מופעל תמיד כברירת מחדל ומוגדר באמצעות משתני סביבה:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # מספר מרבי של פריטים במטמון
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 דקות)
```

### נתוני ביצועים

ביצועי ייחוס בשרת x86 טיפוסי עם 4 ליבות (טקסטים באורך של כ־100 טוקנים כל אחד):

| ספק                  | p50   | p95   | p99   | עלות למיליון embeddings             |
| -------------------- | ----- | ----- | ----- | ----------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | ללא עלות                            |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | כ־$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | תלוי באירוח של Qdrant               |
| `cache` (פגיעה)      | <1ms  | <1ms  | 2ms   | ללא עלות                            |

---

## תבניות לחילוץ עובדות (v3.8.16+)

המודול `extraction.ts`‏ (`src/lib/memory/extraction.ts`) משתמש ב**התאמת תבניות באמצעות ביטויים רגולריים** כדי לחלץ עובדות מובנות מהודעות בשיחה. הבנת התבניות האלה מסייעת לכם לכוונן את איכות החילוץ עבור מקרה השימוש שלכם.

### קטגוריות ברירת המחדל של התבניות

| קטגוריה             | תבנית לדוגמה                                                | מה נלכד                   |
| ------------------- | ----------------------------------------------------------- | ------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | העדפות המשתמש             |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | החלטות המשתמש (אפיזודיות) |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | דפוסי התנהגות מתמשכים     |

### תבניות לדוגמה (מפושטות)

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

> "אני מעדיף TypeScript. אשתמש ב-Postgres עבור הפרויקט הזה. אני תמיד מבצע commit לפני push. אני לא אוהב Python."
> החילוץ מפיק 4 זיכרונות:
>
> | מפתח                                 | קטגוריה | סוג     | תוכן                        |
> | ------------------------------------ | ------- | ------- | --------------------------- |
> | `preference:typescript`              | העדפה   | עובדתי  | "TypeScript"                |
> | `decision:postgres_for_this_project` | החלטה   | אפיזודי | "Postgres עבור הפרויקט הזה" |
> | `pattern:commit_before_pushing`      | דפוס    | עובדתי  | "ביצוע commit לפני push"    |
> | `preference:python`                  | העדפה   | עובדתי  | "Python"                    |

### מגבלות החילוץ

כדי למנוע חילוץ בלתי מרוסן, חלות המגבלות הבאות:

| אורך תוכן מינימלי | 3 תווים |
| אורך תוכן מרבי | 500 תווים |

### מתי להשבית את החילוץ

החילוץ פועל אוטומטית בכל פעם שהזיכרון מופעל; אין מתג נפרד
לחילוץ בלבד. כדי לכבות אותו, יש להשבית את הזיכרון לחלוטין (`enabled: false`
באמצעות `PUT /api/settings/memory`). שקלו לעשות זאת כאשר:

- יש לכם נפח הודעות גבוה ועלות החילוץ אינה זניחה
- השיחות שלכם זמניות ברובן (צ'אט, ניפוי שגיאות) וללא ערך לטווח ארוך
- אתם כבר לוכדים הקשר באמצעות תוספים מותאמים אישית

---

## כוונון RRF היברידי (v3.8.16+)

האלגוריתם **Reciprocal Rank Fusion (RRF)** משלב תוצאות של FTS5 (מילות מפתח) ושל וקטורים (סמנטיקה). הפרמטר `k` קובע כמה משקל ניתן לתוצאות המדורגות נמוך יותר.

### הנוסחה

עבור כל זיכרון מועמד, ציון ה-RRF הוא:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

כאשר:

- `k` הוא הקבוע (ברירת המחדל היא 60)
- `rank_i(d)` הוא הדירוג של המסמך `d` במערכת האחזור ה-i-ית (FTS, וקטור)
- הסכום מחושב על פני כל מערכות האחזור

### כיצד `k` משפיע על התוצאות

| ערך `k`                 | השפעה                                                                        | המתאים ביותר עבור                          |
| ----------------------- | ---------------------------------------------------------------------------- | ------------------------------------------ |
| `k=0`                   | מיזוג דירוגים טהור (ללא החלקה)                                               | קו בסיס תאורטי                             |
| `k=10-30`               | מעניק משקל רב לתוצאות המובילות, בעוד שדירוג נמוך כמעט אינו תורם              | כאשר שלוש התוצאות המובילות נכונות בדרך כלל |
| **`k=60`** (ברירת מחדל) | מאוזן — כל עשר התוצאות המובילות תורמות באופן משמעותי                         | אחזור לשימוש כללי                          |
| `k=100+`                | שטוח יותר — אפילו תוצאות בדירוג נמוך יכולות לשלוט אם הן מופיעות במספר מערכות | כאשר אחזור > דיוק הוא קריטי                |

### כוונון `k` בפועל

```bash
# ברירת מחדל
MEMORY_RRF_K=60

# דיוק אגרסיבי (זיכרון קטן, מעט מסמכים)
MEMORY_RRF_K=20

# אחזור מרבי (זיכרון גדול, שאילתות מגוונות)
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

כאשר `k` גבוה יותר, **ההבדל היחסי** בין המקום הראשון למקום העשירי קטן יותר, ולכן האלגוריתם מסתמך יותר על **הסכמה בין מערכות האחזור** מאשר על הביטחון בדירוג העליון.

### מתי לשנות את `k`

| תסמין                                                   | מה כדאי לנסות                                                |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| התוצאה המובילה תמיד מנצחת, אך היא שגויה                 | **להנמיך** את k (למשל, 20) — הביטחון בדירוג העליון חשוב יותר |
| התשובה הנכונה נמצאת בחמישייה המובילה אך לא במקום הראשון | **להעלות** את k (למשל, 100) — ניקוד שטוח יותר מתגמל הסכמה    |
| האחזור גבוה אך הדיוק נמוך                               | **להנמיך** את k — לחדד את הדירוג                             |
| האחזור נמוך (מסמכים רלוונטיים חסרים)                    | **להעלות** את k — לתת הזדמנות למסמכים בדירוג נמוך יותר       |

### שקלול RRF

מיזוג הדירוגים ההדדי משתמש במשקלים שווים עבור דירוג הווקטור הסמנטי ודירוג החיפוש בטקסט מלא:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

אין משתני סביבה להתאמת משקלים נפרדים (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` אינם קיימים).

---

## אסטרטגיית סיכום (v3.8.16+)

המודול `summarization.ts` (`src/lib/memory/summarization.ts`) דוחס זיכרונות ישנים כדי לשמור על קבוצה פעילה קטנה, תוך שימור יכולת האחזור.

### מתי מופעל הסיכום

| גורם מפעיל            | סף (ברירת מחדל) |
| --------------------- | --------------- |
| הפעלה ידנית דרך ה-API | לא רלוונטי      |

### מה מסוכם

שתי נקודות כניסה מיוצאות מתוך `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — מרכזת את
  הזיכרונות של הפעלה לטקסט סיכום יחיד המוגבל בתקציב טוקנים.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — הדחיסה מבוססת-הגיל
  המשמשת את ה-API: היא בוחרת כל זיכרון שגילו עולה על `days`, יוצרת מהם
  זיכרון סיכום מרוכז אחד, וכאשר `dryRun` הוא `false`, מוחקת את
  המקורות. העבירו `dryRun: true` כדי להציג בתצוגה מקדימה את קבוצת המועמדים ואת סך הטוקנים
  מבלי לשנות דבר.

אין שלב קיבוץ לפי תגיות/מפתחות או דירוג "ליבה לעומת ניתן לסיכום" לכל זיכרון —
הבחירה מבוססת אך ורק על סף הגיל, וטקסט הסיכום הוא שורה מרוכזת
עם קידומת סוג עבור כל מועמד.

### הפעלת הסיכום

הסיכום הוא **ידני / דורש הסכמה מפורשת** — ההגדרה `autoSummarize` היא `false`
כברירת מחדל, ולכן דבר אינו נדחס אוטומטית. הפעילו אותו דרך ה-API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

כדי להשאיר אותו כבוי, פשוט השאירו את `autoSummarize` בערך ברירת המחדל שלו (`false`).

### עצות לאיכות הסיכום

- **הציגו תחילה תצוגה מקדימה באמצעות `dryRun`** — `summarizeMemoriesOlderThan(..., true)` מחזירה
  את רשימת המועמדים ואת ספירת הטוקנים הכוללת, כדי שתוכלו לאשר מה ימוזג
  לפני מחיקת המקורות.
- **הריצו את הסיכום בשעות של תעבורה נמוכה** אם יש לכם מאגר זיכרונות גדול — הקריאה ל-LLM היא החלק האיטי

```bash
# בסגנון Cron: סיכום מדי יום ב-3 לפנות בוקר
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## תבנית ספק MemoryBackend

> **מקור האמת:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **בדיקות:** `src/lib/memory/__tests__/generic-backend.test.ts`

תבנית הספק MemoryBackend מוסיפה **שכבת הפשטה ניתנת להחלפה עבור מנגנוני קצה עורפי** מעל מנוע הזיכרון הקיים. במקום להיות כבולה למימוש אחסון יחיד, מערכת הזיכרון תומכת כעת במספר מנגנוני קצה עורפי (SQLite, Obsidian, Notion ומנגנוני HTTP מותאמים אישית), עם ניתוב ראשי/חלופי שניתן להגדרה.

### ארכיטקטורה

```
┌──────────────────────────────────────────────────────────┐
│                    נתיבי API                              │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           מתאם Singleton‏ (manager.ts)                    │
│                                                          │
│  ראשי ─────► מנגנון A  (למשל SQLite)                    │
│  חלופי ────► מנגנון B  (למשל Obsidian)                  │
│              מנגנון C  (למשל Notion דרך GenericBackend)  │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ מנגנון     │ │ מנגנון     │ │ מנגנון (HTTP)    │
└────────────┘ └────────────┘ └──────────────────┘
```

#### ממשק הליבה (`backend.ts`)

כל מנגנון קצה עורפי חייב לממש את הממשק `MemoryBackend`:

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

מתאם Singleton אשר:

- **רושם** מנגנוני קצה עורפי באמצעות `register(backend)` — נקרא בעת האתחול מתוך `index.ts`
- **מגדיר** מנגנון ראשי ומנגנונים חלופיים באמצעות `configure(primary, fallbacks)`
- **מנתב** פעולות CRUD/חיפוש אל המנגנון הראשי, עם שרשרת מנגנונים חלופיים במקרה של כשל
- **בודק את התקינות** של כל מנגנוני הקצה העורפי באופן תקופתי

**התנהגות מנגנוני הגיבוי:**

| פעולה    | ראשי                          | מנגנונים חלופיים                  |
| -------- | ----------------------------- | --------------------------------- |
| `create` | ✅ ראשי בלבד                  | ❌                                |
| `get`    | ✅ ניסיון תחילה במנגנון הראשי | ✅ מעבר לחלופי אם התוצאה היא null |
| `update` | ✅ ראשי בלבד                  | ✅ סנכרון ללא המתנה לתוצאה        |
| `delete` | ✅ ראשי בלבד                  | ✅ סנכרון ללא המתנה לתוצאה        |
| `list`   | ✅ ראשי בלבד                  | ❌                                |
| `search` | ✅ ראשי תחילה                 | ✅ מעבר לחלופי במקרה של שגיאה     |

#### GenericMemoryBackend (`genericBackend.ts`)

מחבר HTTP כללי שמתאים כל REST API לממשק MemoryBackend. שימושי עבור:

- **Notion** — חיבור דרך Notion API
- **Obsidian** — חיבור דרך Obsidian Local REST API
- **מנגנוני קצה עורפי מותאמים אישית** — כל שירות שחושף API זיכרון מסוג RESTful

**הגדרה:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // כתובת ה-URL הבסיסית של ממשק ה-API של הקצה האחורי
  apiKey?: string;           // אסימון Bearer לאימות
  headers?: Record<string, string>;  // כותרות HTTP מותאמות אישית
  timeout?: number;          // זמן קצוב לבקשה (ברירת מחדל: 30000ms)
  backendType?: string;      // לצורכי רישום ביומן

  // דריסת נקודות קצה (ברירות המחדל משתמשות במוסכמות REST)
  endpoints?: {
    search?: string;   // ברירת מחדל: "/memories/search"
    create?: string;   // ברירת מחדל: "/memories"
    list?: string;     // ברירת מחדל: "/memories"
    get?: string;      // ברירת מחדל: "/memories/{id}"
    update?: string;   // ברירת מחדל: "/memories/{id}"
    delete?: string;   // ברירת מחדל: "/memories/{id}"
    health?: string;   // ברירת מחדל: "/health"
  };

  // מיפויים של שמות פרמטרי שאילתה
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // מיפויים של שמות פרמטרי נתיב
  pathParams?: {
    id?/memoryId?
  };
}
```

**קצוות אחוריים מוכרים** מוגדרים מראש ב-`KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend שמצביע אל localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend שמצביע אל api.notion.com/v1
```

#### קצוות אחוריים מובנים

##### SQLiteBackend (`sqliteBackend.ts`)

הקצה האחורי הראשי המוגדר כברירת מחדל. עוטף את מאגר הזיכרון הקיים המבוסס על SQLite באמצעות `src/lib/memory/store.ts`. נרשם אוטומטית בעת האתחול.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

עוטף את שילוב Obsidian הקיים (`src/lib/memory/obsidianBackend.ts`). מתחבר לכספת Obsidian באמצעות ממשק ה-REST API המקומי של Obsidian.

### הגדרות

הגדרות הקצה האחורי של הזיכרון נשמרות בטבלת הגדרות היישום ומנוהלות באמצעות `src/lib/memory/settings.ts`:

| הגדרה                | מפתח סביבה/תצורה         | ברירת מחדל | תיאור                              |
| -------------------- | ------------------------ | ---------- | ---------------------------------- |
| קצה אחורי ראשי       | `memoryPrimaryBackend`   | `"sqlite"` | המזהה של הקצה האחורי הראשי         |
| קצוות אחוריים לגיבוי | `memoryFallbackBackends` | `[]`       | מזהי קצוות אחוריים לגיבוי לפי הסדר |
| תצורות קצה אחורי     | `memoryBackendConfigs`   | `{}`       | דריסות תצורה לכל קצה אחורי         |

ההגדרות מנורמלות באמצעות `normalizeMemorySettings()` ונשמרות במטמון ב-`getMemorySettings()`.

### תהליך האתחול

```
אתחול היישום
  → ייבוא index.ts (כתוצאת לוואי): רושם את SQLiteBackend
  → initMemoryBackends() נקרא ממחזור החיים של היישום:
      1. טעינת הגדרות (getMemorySettings)
      2. הגדרת הקצה האחורי הראשי וקצוות הגיבוי
      3. אתחול כל הקצוות האחוריים (בדיקת תקינות)
      4. מוכן לבקשות
```

### הוספת קצה אחורי חדש

1. **ממשו את הממשק `MemoryBackend`** ב-`src/lib/memory/<name>Backend.ts`
2. **ייצאו** מתוך `src/lib/memory/index.ts`
3. **רשמו** באמצעות `memoryManager.register(yourBackend)` בעת האתחול
4. **הגדירו** באמצעות ההגדרות: הגדירו את `memoryPrimaryBackend` למזהה הקצה האחורי שלכם
5. **בדקו** תוך שימוש ב-`src/lib/memory/__tests__/generic-backend.test.ts` כדוגמה

#### דוגמה: קצה אחורי Brain

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
- אחזור (4) — הצלחה, 404 → null, שגיאה שאינה 404, פרמטרי נתיב מותאמים אישית
- עדכון (2) — הצלחה, 404 → false
- מחיקה (2) — הצלחה, 404 → false
- הצגת רשימה (2) — פרמטרי שאילתה, שמות פרמטרים מותאמים אישית
- חיפוש (3) — פרמטרי שאילתה, נקודת קצה מותאמת אישית, סריאליזציה של אפשרויות
- כותרות אימות (2) — אסימון Bearer, כותרות מותאמות אישית
- פונקציית יצירה (1)

#### בדיקת טיפוסים

```bash
npm run typecheck:core
```

צפוי: **0 שגיאות**.
