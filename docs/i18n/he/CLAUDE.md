# CLAUDE.md (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

הקובץ הזה מספק הנחיות ל-Claude Code (claude.ai/code) כאשר עובדים עם קוד במאגר זה.

## התחלה מהירה

```bash
npm install                    # התקנת תלותים (יוצר אוטומטית .env מ-.env.example)
npm run dev                    # שרת פיתוח ב-http://localhost:20128
npm run build                  # בניית הפקה (Next.js 16 עצמאי)
npm run lint                   # ESLint (0 שגיאות צפויות; אזהרות קיימות מראש)
npm run typecheck:core         # בדיקת TypeScript (אמור להיות נקי)
npm run typecheck:noimplicit:core  # בדיקה מחמירה (בלי implicit any)
npm run test:coverage          # בדיקות יחידה + שער כיסוי (75/75/75/70 — משפטים/שורות/פונקציות/סניפים)
npm run check                  # lint + בדיקות משולבות
npm run check:cycles           # זיהוי תלותיות מעגליות
```

### הרצת בדיקות

```bash
# קובץ בדיקה בודד (רץ בדיקות מקורי של Node.js — רוב הבדיקות)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (שרת MCP, autoCombo, cache)
npm run test:vitest

# כל הסוויטות
npm run test:all
```

למטריצת הבדיקות המלאה, ראה `CONTRIBUTING.md` → "הרצת בדיקות". לארכיטקטורה מעמיקה, ראה `AGENTS.md`.

---

## פרויקט במבט חטוף

**OmniRoute** — פרוקסי/נתב AI מאוחד. נקודת קצה אחת, 160+ ספקי LLM, חזרה אוטומטית.

| שכבה          | מיקום                   | מטרה                                                             |
| ------------- | ----------------------- | ---------------------------------------------------------------- |
| API Routes    | `src/app/api/v1/`       | נתב אפליקציית Next.js — נקודות כניסה                             |
| Handlers      | `open-sse/handlers/`    | עיבוד בקשות (צ'אט, הטמעות, וכו')                                 |
| Executors     | `open-sse/executors/`   | הפצת HTTP ספציפית לספק                                           |
| Translators   | `open-sse/translator/`  | המרת פורמטים (OpenAI↔Claude↔Gemini)                              |
| Transformer   | `open-sse/transformer/` | API תגובות ↔ השלמות צ'אט                                         |
| Services      | `open-sse/services/`    | ניתוב קומבו, מגבלות קצב, קאשינג, וכו'                            |
| Database      | `src/lib/db/`           | מודולי דומיין SQLite (45+ קבצים, 55 מיגרציות)                    |
| Domain/Policy | `src/domain/`           | מנוע מדיניות, כללי עלות, לוגיקת חזרה                             |
| MCP Server    | `open-sse/mcp-server/`  | 37 כלים (30 בסיס + 3 זיכרון + 4 מיומנויות), 3 תחבורה, ~13 תחומים |
| A2A Server    | `src/lib/a2a/`          | פרוטוקול JSON-RPC 2.0 של סוכן                                    |
| Skills        | `src/lib/skills/`       | מסגרת מיומנויות ניתנת להרחבה                                     |
| Memory        | `src/lib/memory/`       | זיכרון שיחה מתמשך                                                |

מונורפו: `src/` (אפליקציית Next.js 16), `open-sse/` (מרחב עבודה של מנוע סטרימינג), `electron/` (אפליקציית שולחן עבודה), `tests/`, `bin/` (נקודת כניסה ל-CLI).

---

## צינור בקשות

```
Client → /v1/chat/completions (Next.js route)
  → CORS → Zod validation → auth? → policy check → prompt injection guard
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → cache check → rate limit → combo routing?
      → resolveComboTargets() → handleSingleModel() per target
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → response translation → SSE stream or JSON
    → If Responses API: responsesTransformer.ts TransformStream
```

נתיבי API עוקבים אחרי תבנית עקבית: `Route → CORS preflight → Zod body validation → Optional auth (extractApiKey/isValidApiKey) → API key policy enforcement → Handler delegation (open-sse)`. אין middleware גלובלי של Next.js — חיתוך הוא ספציפי לנתיב.

**נתיב קומבו** (`open-sse/services/combo.ts`): 14 אסטרטגיות (עדיפות, משוקלל, מילוי ראשון, סיבוב, P2C, אקראי, הכי פחות בשימוש, אופטימיזציה של עלות, מודע לאיפוס, אקראי מחמיר, אוטומטי, lkgp, אופטימיזציה של הקשר, העברת הקשר). כל יעד קורא ל`handleSingleModel()` שמקיף את `handleChatCore()` עם טיפול בשגיאות ספציפי ליעד ובדיקות מפסק מעגל. ראה `docs/routing/AUTO-COMBO.md` עבור ניקוד Auto-Combo של 9 גורמים ו`docs/architecture/RESILIENCE_GUIDE.md` עבור 3 שכבות חוסן.

---

## מצב ריצה של חוסן

OmniRoute יש שלושה מנגנוני כישלון זמניים הקשורים אך שונים. שמור על התחום שלהם נפרד כאשר אתה מדבג התנהגות נתיב. ראה את
[דיאגרמת חוסן ב-3 שכבות](./docs/diagrams/exported/resilience-3layers.svg)
(מקור: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
למפת מבט-על.

### מפסק מעגל ספק

**תחום**: ספק שלם, לדוגמה `glm`, `openai`, `anthropic`.

**מטרה**: להפסיק לשלוח תנועה לספק שנכשל שוב ושוב ברמת ה-upstream/service, כך שספק לא בריא אחד לא יאט את כל הבקשות.

**יישום**:

- מחלקה מרכזית: `src/shared/utils/circuitBreaker.ts`
- חיבור שער/ביצוע צ'אט: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API מצב ריצה: `src/app/api/monitoring/health/route.ts`
- עטיפות משותפות: `open-sse/services/accountFallback.ts`
- טבלת מצב מתמשך: `domain_circuit_breakers`

**מצבים**:

- `CLOSED`: תנועה רגילה מותרת.
- `OPEN`: ספק חסום זמנית; callers מקבלים תגובה של provider-circuit-open
  או נתיב קומבו מדלג ליעד אחר.
- `HALF_OPEN`: זמן האיפוס חלף; מאפשר בקשת בדיקה. הצלחה סוגרת את
  המפסק, כישלון פותח אותו שוב.

**ברירות מחדל** (`open-sse/config/constants.ts`):

- ספקי OAuth: סף `3`, זמן איפוס `60s`.
- ספקי API-key: סף `5`, זמן איפוס `30s`.
- ספקים מקומיים: סף `2`, זמן איפוס `15s`.

רק מצבי כישלון ברמת ספק צריכים להפעיל את מפסק הספק:

```ts
(408, 500, 502, 503, 504);
```

אל תפעיל את מפסק הספק הכולל עבור שגיאות רגילות של חשבון/מפתח/מודל כמו רוב
המקרים של `401`, `403`, או `429`. אלה בדרך כלל שייכים לקירור חיבור או נעילת מודל. ספק API-key כללי `403` צריך להיות ניתן לשחזור אלא אם כן הוא מסווג
כשגיאת ספק/חשבון סופית.

המפסק משתמש בשחזור עצלן, לא בטיימר רקע. כאשר `OPEN` פג, קריאות כמו `getStatus()`, `canExecute()`, ו`getRetryAfterMs()` מעדכנות את המצב ל
`HALF_OPEN`, כך שדשבורדים ובוני מועמדים לקומבו לא ממשיכים להוציא ספק שפג תוקף לנצח.

### קירור חיבור

**תחום**: חיבור/חשבון/מפתח ספק אחד.

**מטרה**: לדלג זמנית על מפתח/חשבון רע אחד תוך מתן אפשרות לחיבורים אחרים עבור
אותו ספק להמשיך לשרת בקשות.

**יישום**:

- נתיב כתיבה/עדכון: `src/sse/services/auth.ts::markAccountUnavailable()`
- בחירת/סינון חשבון: `src/sse/services/auth.ts::getProviderCredentials...`
- חישוב קירור: `open-sse/services/accountFallback.ts::checkFallbackError()`
- הגדרות: `src/lib/resilience/settings.ts`

שדות חשובים על חיבורי ספק:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

במהלך בחירת חשבון, חיבור מדולג כאשר:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

קירורים הם גם עצלנים: כאשר `rateLimitedUntil` נמצא בעבר, החיבור הופך
לזמין שוב. בשימוש מוצלח, `clearAccountError()` מנקה את `testStatus`,
`rateLimitedUntil`, שדות שגיאה, ו`backoffLevel`.

התנהגות ברירת מחדל של קירור חיבור:

- קירור בסיסי של OAuth: `5s`.
- קירור בסיסי של API-key: `3s`.
- API-key `429` צריך להעדיף רמזי ניסיון מחדש מה-upstream (`Retry-After`, כותרות איפוס, או
  טקסט איפוס שניתן לנתח) כאשר הם זמינים.
- כישלונות חוזרים שניתן לשחזר משתמשים באיפוס אקספוננציאלי:

```ts
baseCooldownMs * 2 ** failureIndex;
```

שומר ה"אנטי-המון" מונע כישלונות מקבילים על אותו חיבור מהארכת הקירור שוב ושוב או מהגדלת `backoffLevel` פעמיים.

מצבים סופיים אינם קירורים. `banned`, `expired`, ו`credits_exhausted` מיועדים להישאר לא זמינים עד ששינויים באישורים/הגדרות יתרחשו או שמפעיל יאפס אותם. אל תחליף מצבים סופיים עם מצב קירור זמני.

### נעילת מודל

**תחום**: ספק + חיבור + מודל.

**מטרה**: להימנע מכיבוי חיבור שלם כאשר רק מודל אחד אינו זמין או
מוגבל מכסה עבור אותו חיבור.

דוגמאות:

- ספקי מכסה לפי מודל המחזירים `429`.
- ספקים מקומיים המחזירים `404` עבור מודל חסר אחד.
- כישלונות הרשאה של מצב/מודל ספציפיים לספק כמו מצבי Grok שנבחרו.

נעילת מודל חיה ב`open-sse/services/accountFallback.ts` ומאפשרת לאותו
חיבור להמשיך לשרת מודלים אחרים.

### הנחיות לדיבוג

- אם כל המפתחות עבור ספק מדולגים, בדוק גם את מצב מפסק הספק וגם את
  `rateLimitedUntil`/`testStatus` של כל חיבור.
- אם ספק נראה מוד excluded באופן קבוע לאחר חלון האיפוס, בדוק אם הקוד
  קורא את `state` הגולמי במקום להשתמש ב`getStatus()`/`canExecute()`.
- אם מפתח ספק אחד נכשל אבל אחרים צריכים לעבוד, העדיף קירור חיבור על פני
  מפסק ספק.
- אם רק מודל אחד נכשל, העדיף נעילת מודל על פני קירור חיבור.
- אם מצב צריך לשחזר את עצמו, עליו להיות עם חותמת זמן עתידית/זמן איפוס ונתיב קריאה שמעודכן מצב שפג תוקף. מצבים קבועים דורשים שינויים ידניים באישורים
  או בהגדרות.

## קונבנציות מפתח

### סגנון קוד

- **2 רווחים**, נקודותיים, ציטוטים כפולים, רוחב 100 תווים, פסיקים בסוף שורות ב-ES5 (מאוכפים על ידי lint-staged דרך Prettier)
- **ייבוא**: חיצוני → פנימי (`@/`, `@omniroute/open-sse`) → יחסי
- **שמות**: קבצים=camelCase/kebab, רכיבים=PascalCase, קבועים=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = שגיאה בכל מקום; `no-explicit-any` = אזהרה ב-`open-sse/` וב-`tests/`
- **TypeScript**: `strict: false`, יעד ES2022, מודול esnext, פתרון bundler. העדיף סוגים מפורשים.

### מסד נתונים

- **תמיד** עבור דרך מודולי דומיין ב-`src/lib/db/` — **לעולם לא** כתוב SQL גולמי בנתיבים או במטפלים
- **לעולם לא** הוסף לוגיקה ל-`src/lib/localDb.ts` (שכבת ייצוא בלבד)
- **לעולם לא** ייבוא ברוול מ-`localDb.ts` — ייבא מודולים ספציפיים מ-`db/` במקום
- DB singleton: `getDbInstance()` מ-`src/lib/db/core.ts` (יומני WAL)
- הגירות: `src/lib/db/migrations/` — קבצי SQL עם גרסאות, אידמפוטנטיים, ריצה בעסקאות

### טיפול בשגיאות

- try/catch עם סוגי שגיאה ספציפיים, רישום עם הקשר pino
- לעולם לא לבלוע שגיאות בזרמי SSE — השתמש באותות הפסקה לניקוי
- החזר קודי סטטוס HTTP נכונים (4xx/5xx)

### אבטחה

- **לעולם לא** השתמש ב-`eval()`, `new Function()`, או eval מרומז
- אמת את כל הקלטים עם סכמות Zod
- הצפן אישורים במצב מנוחה (AES-256-GCM)
- רשימת דחייה של כותרות עליונות: `src/shared/constants/upstreamHeaders.ts` — שמור על סניטיזציה, סכמות Zod, ובדיקות יחידה מסונכרנות בעת עריכה
- **אישורים ציבוריים עליונים** (Gemini/Antigravity/Windsurf-style OAuth client_id/secret + מפתחות Firebase Web שהופקו מ-CLIs ציבוריים): **חייבים** להיות מוטמעים דרך `resolvePublicCred()` מ-`open-sse/utils/publicCreds.ts` — **לעולם לא** כמילולי מחרוזת. ראה `docs/security/PUBLIC_CREDS.md` עבור התבנית החובה.
- **תגובות שגיאה** (HTTP / SSE / מפעיל / MCP handler): **חייבות** לעבור דרך `buildErrorBody()` או `sanitizeErrorMessage()` מ-`open-sse/utils/error.ts` — **לעולם לא** לשים `err.stack` או `err.message` גולמיים בגוף התגובה. ראה `docs/security/ERROR_SANITIZATION.md`.
- **פקודות Shell שנבנות ממתודולוגיות**: כאשר קוראים ל-`exec()`/`spawn()` עם סקריפט שצריך ערכי ריצה, העבר אותם דרך האופציה `env` (נמלט אוטומטית) — **לעולם לא** לשלב מחרוזות לא מהימנות/חיצוניות בגוף הסקריפט. הפניה: `src/mitm/cert/install.ts::updateNssDatabases`.
- **ספריות מאובטחות כברירת מחדל** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): העדיף Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink על פני יישומים מותאמים אישית בכל פעם שמוסיפים משטחים רגישים לאבטחה.

---

## תרחישי שינוי נפוצים

### הוספת ספק חדש

1. רשם ב-`src/shared/constants/providers.ts` (מאומת על ידי Zod בעת טעינה)
2. הוסף מפעיל ב-`open-sse/executors/` אם נדרשת לוגיקה מותאמת (הרחב את `BaseExecutor`)
3. הוסף מתרגם ב-`open-sse/translator/` אם פורמט שאינו OpenAI
4. הוסף קונפיגורציית OAuth ב-`src/lib/oauth/constants/oauth.ts` אם מבוסס OAuth — אם ה-CLI העליון מספק client_id/secret ציבורי, מוטמע דרך `resolvePublicCred()` (ראה `docs/security/PUBLIC_CREDS.md`), **לעולם לא** כמילולי
5. רשם מודלים ב-`open-sse/config/providerRegistry.ts`
6. כתוב בדיקות ב-`tests/unit/` (כלול את האישור של צורת publicCreds אם הוספת ברירת מחדל מוטמעת חדשה)

### הוספת נתיב API חדש

1. צור תיקיה תחת `src/app/api/v1/your-route/`
2. צור `route.ts` עם מטפלים `GET`/`POST`
3. עקוב אחרי התבנית: CORS → אימות גוף Zod → אימות אופציונלי → הפניית מטפלים
4. המטפל הולך ל-`open-sse/handlers/` (ייבא משם, לא בשורה)
5. תגובות שגיאה משתמשות ב-`buildErrorBody()` / `errorResponse()` מ-`open-sse/utils/error.ts` (מסונן אוטומטית — לעולם לא לשים `err.stack` או `err.message` גולמיים בגוף). ראה `docs/security/ERROR_SANITIZATION.md`.
6. הוסף בדיקות — כולל לפחות אישור אחד שתגובות שגיאה לא דולפות עקבות מחסומים (`!body.error.message.includes("at /")`)

### הוספת מודול DB חדש

1. צור `src/lib/db/yourModule.ts` — ייבא `getDbInstance` מ-`./core.ts`
2. ייצא פונקציות CRUD עבור טבלת הדומיין שלך
3. הוסף הגירה ב-`src/lib/db/migrations/` אם נדרשות טבלאות חדשות
4. ייצא מחדש מ-`src/lib/localDb.ts` (הוסף לרשימת הייצוא מחדש בלבד)
5. כתוב בדיקות

### הוספת כלי MCP חדש

1. הוסף הגדרת כלי ב-`open-sse/mcp-server/tools/` עם סכמת קלט Zod + מטפל אסינכרוני
2. רשם בערכת הכלים (מחובר על ידי `createMcpServer()`)
3. הקצה להיקפים המתאימים
4. כתוב בדיקות (קריאות הכלי נרשמות בטבלת `mcp_audit`)

### הוספת מיומנות A2A חדשה

1. צור מיומנות ב-`src/lib/a2a/skills/` (5 כבר קיימות: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. המיומנות מקבלת הקשר משימה (הודעות, מטא-נתונים) → מחזירה תוצאה מובנית
3. רשם ב-`A2A_SKILL_HANDLERS` ב-`src/lib/a2a/taskExecution.ts`
4. חשוף ב-`src/app/.well-known/agent.json/route.ts` (כרטיס סוכן)
5. כתוב בדיקות ב-`tests/unit/`
6. תעד ב-`docs/frameworks/A2A-SERVER.md` טבלת מיומנויות

### הוספת סוכן ענן חדש

1. צור מחלקת סוכן ב-`src/lib/cloudAgent/agents/` המרחיבה את `CloudAgentBase` (3 כבר קיימות: codex-cloud, devin, jules)
2. יישם `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. רשם ב-`src/lib/cloudAgent/registry.ts`
4. הוסף טיפול ב-OAuth/אישורים אם נדרש (`src/lib/oauth/providers/`)
5. בדיקות + תעד ב-`docs/frameworks/CLOUD_AGENT.md`

### הוספת גדר / Eval / מיומנות / אירוע Webhook חדש

- גדר: `src/lib/guardrails/` → תיעוד: `docs/security/GUARDRAILS.md`
- ערכת Eval: `src/lib/evals/` → תיעוד: `docs/frameworks/EVALS.md`
- מיומנות (סנדבוקס): `src/lib/skills/` → תיעוד: `docs/frameworks/SKILLS.md`
- אירוע Webhook: `src/lib/webhookDispatcher.ts` → תיעוד: `docs/frameworks/WEBHOOKS.md`

## תיעוד הפניה

לכל שינוי שאינו טריוויאלי, קרא קודם את המאמר המתאים:

| תחום                                     | מסמך                                                              |
| ---------------------------------------- | ----------------------------------------------------------------- |
| ניווט במאגר                              | `docs/architecture/REPOSITORY_MAP.md`                             |
| ארכיטקטורה                               | `docs/architecture/ARCHITECTURE.md`                               |
| הפניה הנדסית                             | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| אוטו-קומבו (ציון 9 גורמים, 14 אסטרטגיות) | `docs/routing/AUTO-COMBO.md`                                      |
| חוסן (3 מנגנונים)                        | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| חזרה על הסקת מסקנות                      | `docs/routing/REASONING_REPLAY.md`                                |
| מסגרת מיומנויות                          | `docs/frameworks/SKILLS.md`                                       |
| מערכת זיכרון (FTS5 + Qdrant)             | `docs/frameworks/MEMORY.md`                                       |
| סוכני ענן                                | `docs/frameworks/CLOUD_AGENT.md`                                  |
| מגני בטיחות (PII / הזרקה / חזון)         | `docs/security/GUARDRAILS.md`                                     |
| אישורים ציבוריים (Gemini/וכו')           | `docs/security/PUBLIC_CREDS.md`                                   |
| סינון הודעות שגיאה                       | `docs/security/ERROR_SANITIZATION.md`                             |
| הערכות                                   | `docs/frameworks/EVALS.md`                                        |
| ציות / ביקורת                            | `docs/security/COMPLIANCE.md`                                     |
| ווב-הוקים                                | `docs/frameworks/WEBHOOKS.md`                                     |
| צינור הרשאה                              | `docs/architecture/AUTHZ_GUIDE.md`                                |
| הסתרה (TLS / טביעת אצבע)                 | `docs/security/STEALTH_GUIDE.md`                                  |
| פרוטוקולי סוכנים (A2A / ACP / Cloud)     | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| שרת MCP                                  | `docs/frameworks/MCP-SERVER.md`                                   |
| שרת A2A                                  | `docs/frameworks/A2A-SERVER.md`                                   |
| הפניה ל-API + OpenAPI                    | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| קטלוג ספקים (נוצר אוטומטית)              | `docs/reference/PROVIDER_REFERENCE.md`                            |
| זרימת שחרור                              | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## בדיקות

| מה                      | פקודה                                                                |
| ----------------------- | -------------------------------------------------------------------- |
| בדיקות יחידה            | `npm run test:unit`                                                  |
| קובץ בודד               | `node --import tsx/esm --test tests/unit/file.test.ts`               |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                |
| E2E (Playwright)        | `npm run test:e2e`                                                   |
| פרוטוקול E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                         |
| אקוסיסטם                | `npm run test:ecosystem`                                             |
| שער כיסוי               | `npm run test:coverage` (75/75/75/70 — הצהרות/שורות/פונקציות/סניפים) |
| דוח כיסוי               | `npm run coverage:report`                                            |

**כלל PR**: אם אתה משנה קוד ייצור ב-`src/`, `open-sse/`, `electron/`, או `bin/`, עליך לכלול או לעדכן בדיקות באותו PR.

**העדפת שכבת בדיקה**: יחידה קודם → אינטגרציה (רב-מודול או מצב DB) → e2e (UI/זרימת עבודה בלבד). קודד שחזורי באגים כבדיקות אוטומטיות לפני או לצד התיקון.

**מדיניות כיסוי Copilot**: כאשר PR משנה קוד ייצור והכיסוי נמוך מ-75% (הצהרות/שורות/פונקציות) או 70% (סניפים), אל תדווח רק — הוסף או עדכן בדיקות, הרץ מחדש את שער הכיסוי, ואז בקש אישור. כלול פקודות שהופעלו, קבצי בדיקה שהשתנו, ותוצאת כיסוי סופית בדוח ה-PR.

---

## זרימת עבודה של Git

```bash
# אל תבצע קומיט ישירות ל-main
git checkout -b feat/your-feature
git commit -m "feat: תאר את השינוי שלך"
git push -u origin feat/your-feature
```

**קידומות סניפים**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**פורמט קומיט** (Commits קונבנציונליים): `feat(db): הוסף מפסק מעגל` — תחומים: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**הוקי Husky**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## סביבה

- **Runtime**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, מודולי ES
- **TypeScript**: 5.9+, יעד ES2022, מודול esnext, פתרון bundler
- **Alias נתיב**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **פורט ברירת מחדל**: 20128 (API + לוח מחוונים באותו פורט)
- **ספריית נתונים**: משתנה סביבה `DATA_DIR`, ברירת מחדל ל-`~/.omniroute/`
- **משתני סביבה מרכזיים**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- הגדרה: `cp .env.example .env` ואז צור `JWT_SECRET` (`openssl rand -base64 48`) ו-`API_KEY_SECRET` (`openssl rand -hex 32`)

---

## כללים נוקשים

1. אל תבצע קומיט של סודות או אישורים
2. אל תוסיף לוגיקה ל-`localDb.ts`
3. אל תשתמש ב-`eval()` / `new Function()` / eval מרומז
4. אל תבצע קומיט ישירות ל-`main`
5. אל תכתוב SQL גולמי בנתיבים — השתמש במודולים מ-`src/lib/db/`
6. אל תשתיק שגיאות בזרמי SSE בשקט
7. תמיד אמת קלטים עם סכמות Zod
8. תמיד כלול בדיקות כאשר אתה משנה קוד ייצור
9. הכיסוי חייב להישאר ≥75% (הצהרות, שורות, פונקציות) / ≥70% (סניפים). מדוד נוכחי: ~82%.
10. אל תעקוף הוקי Husky (`--no-verify`, `--no-gpg-sign`) ללא אישור מפעיל מפורש.
11. אל תטמיע אישורי OAuth ציבוריים upstream client_id/secret או מפתחות Firebase Web כמלל מיתר — תמיד עבור דרך `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). ראה `docs/security/PUBLIC_CREDS.md`.
12. אל תחזיר `err.stack` / `err.message` גולמיים בתגובות HTTP / SSE / executor — תמיד נווט דרך `buildErrorBody()` או `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). ראה `docs/security/ERROR_SANITIZATION.md`.
13. אל תבצע אינטרפולציה של מיתרים של נתיבים חיצוניים או ערכי ריצה לתוך סקריפטים של shell המועברים ל-`exec()`/`spawn()` — העבר דרך אפשרות `env` במקום זאת. הפניה: `src/mitm/cert/install.ts::updateNssDatabases`.
14. אל תדחה אזהרת CodeQL / סריקת סודות ללא (א) בדיקה ראשונה של מסמכי התבנית למעלה כדי לראות אם העוזר חל, ו-(ב) תיעוד ההצדקה הטכנית בהערת הדחייה. תקדים: `js/stack-trace-exposure` הועלה על אתרי קריאה שכבר נווטים דרך `sanitizeErrorMessage()` היא מגבלה ידועה של CodeQL (מסננים מותאמים אישית לא מוכרים) — דחה כ-`false positive` בהתייחסות ל-`docs/security/ERROR_SANITIZATION.md`.
15. אל תחשוף נתיבים שמפעילים תהליכים ילדיים (`/api/mcp/`, `/api/cli-tools/runtime/`) ללא סיווג `isLocalOnlyPath()` ב-`src/server/authz/routeGuard.ts`. אכיפת לולאת חזרה מתבצעת ללא תנאים לפני כל בדיקת auth — JWT דלף דרך מנהרה לא יכול להפעיל תהליך. ראה `docs/security/ROUTE_GUARD_TIERS.md`.
16. לעולם אל תכלול `Co-Authored-By` trailers שמיוחסים לעוזר AI, ל-LLM או לחשבון אוטומציה (למשל שמות המכילים "Claude", "GPT", "Copilot", "Bot"; אימיילים ב-`anthropic.com` / `openai.com` / כתובות `noreply.github.com` השייכות לבוטים). trailers כאלה מנתבים את הייחוס של ה-commit לחשבון הבוט ב-GitHub, ומסתירים את המחבר האמיתי (`diegosouzapw`) בהיסטוריית ה-PR. משתפי פעולה אנושיים — כולל מחברי PR upstream ומדווחי issues שמועתקים ל-OmniRoute — יכולים וחייבים לקבל קרדיט עם trailers סטנדרטיים `Co-authored-by: Name <email>`; תהליכי העבודה של upstream-port (`/port-upstream-features`, `/port-upstream-issues`) תלויים בזה.
