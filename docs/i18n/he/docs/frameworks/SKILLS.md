# Skills Framework (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **מקור האמת:** `src/lib/skills/` ו-`src/app/api/skills/`
> **עדכון אחרון:** 2026-06-28 — v3.8.40

OmniRoute חושפת מסגרת Skills ניתנת להרחבה, המאפשרת למודלי שפה (ולמפעילים) להרכיב יכולות לשימוש חוזר — החל מקריאת מערכת קבצים ובקשות HTTP ועד להרצת קוד בארגז חול וכישורים שנבחרו בקפידה מהמרקטפלייס.

Skill הוא יחידת עבודה מנוהלת גרסאות ומוגדרת באמצעות סכמה. OmniRoute יכולה להזריק Skills כהגדרות כלים לבקשות יוצאות, ליירט קריאות לכלים שחוזרות מהמודל, להפעיל את המטפל המתאים ולהעביר את התוצאה בחזרה למודל כדי שהשיחה תוכל להימשך. המודל לעולם אינו רואה את המימוש — רק את ממשק הכלי.

---

## Agent Skills לעומת Omni Skills

ל-OmniRoute יש שתי מערכות Skills נפרדות אך משלימות:

| ממד          | **Omni Skills** (מסמך זה)                                    | **Agent Skills**                                                                                      |
| :----------- | :----------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| מטרה         | הזרקת כלים ל-LLM + הרצה בארגז חול                            | קטלוג SKILL.md לגילוי ולצריכה בידי סוכנים חיצוניים                                                    |
| מקור האמת    | `src/lib/skills/` + מרקטפלייס                                | `src/lib/agentSkills/` + התיקייה `skills/`                                                            |
| מצב זמן ריצה | מוזרקים לבקשות יוצאות ומופעלים באירועי קריאת כלים            | קטלוג Markdown סטטי + נקודות קצה לגילוי באמצעות REST/MCP/A2A                                          |
| מי משתמש בהם | OmniRoute עצמה (ניתוב משולב, קריאות LLM נכנסות)              | סוכנים חיצוניים, לקוחות MCP ומתזמרי A2A                                                               |
| כמות         | משתנה (מונעת על ידי המרקטפלייס)                              | 45 רשומות קטלוג (23 API + 21 CLI + 1 תצורה)                                                           |
| פורמט        | `SkillDefinition` עם סכמת כלי + מטפל                         | frontmatter של `SKILL.md` + גוף Markdown                                                              |
| גילוי        | REST דרך `/api/skills/*` + כלי MCP מסוג `omniroute_skills_*` | REST דרך `/api/agent-skills/*` + כלי MCP מסוג `omniroute_agent_skills_*` + `list-capabilities` של A2A |

**Omni Skills** הם מנוע ההרצה — הם מגדירים מה OmniRoute _יכולה לעשות_ כאשר LLM מפעיל כלי.

**Agent Skills** הם קטלוג התיעוד — הם מסבירים לסוכנים חיצוניים _כיצד להשתמש_ ב-REST API וב-CLI של OmniRoute, באמצעות קובצי SKILL.md מובנים שניתן להזין ישירות להנחיות של סוכנים.

למידע על קטלוג Agent Skills, המחולל, כלי MCP וה-Skill של A2A, ראו [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## מושגים

### מקורות Skills

שלושה מקורות של Skills מתקיימים יחד באותו Registry:

1. **Skills מובנים** (`src/lib/skills/builtins.ts`) — מסופקים עם OmniRoute. מכסים את מקרי השימוש הנפוצים:
   - `file_read`, `file_write` — סביבת עבודה בארגז חול לכל מפתח API תחת `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — HTTP יוצא דרך `safeOutboundFetch` עם `guard: "public-only"`
   - `web_search` — ספק חיפוש ניתן להחלפה עם מטמון (`executeWebSearch`)
   - `eval_code` — הרצת `node` או `python` בארגז חול של Docker
   - `execute_command` — פקודת מעטפת בארגז חול של Docker
   - `browser` — תשתית בסיסית המבוססת על Playwright, מושבתת כברירת מחדל (`builtin/browser.ts`)
2. **SkillsMP** (המרקטפלייס של OmniRoute) — מתקבלים מ-`https://skillsmp.com/api/v1/skills/search`. דורש `skillsmpApiKey` בהגדרות.
3. **SkillsSH** (הקטלוג הקהילתי `skills.sh`) — מתקבלים מ-`https://skills.sh/api/search`. אין צורך באימות; תוכן SKILL.md נמשך ישירות מ-GitHub raw.

"ספק פעיל" יחיד קובע מאיזה קטלוג לוח הבקרה מתקין (`src/lib/skills/providerSettings.ts`). ניתן להחליף אותו תחת **הגדרות → זיכרון ו-Skills**. ברירת המחדל: `skillsmp`.

### זהות Skill

Skills ממופתחים לפי `name@version` ב-Registry שבזיכרון (`src/lib/skills/registry.ts`). הגרסה חייבת להיות בפורמט semver (`^\d+\.\d+\.\d+$`). הפונקציה `resolveVersion()` מבינה את האילוצים `^`,‏ `~`,‏ `>`,‏ `>=`,‏ `<`,‏ `<=`,‏ `==` והתאמה מדויקת.

### מצב Skill

לכל Skill יש מצב זמן ריצה השולט במועד הזרקתו:

| מצב    | התנהגות                                                                               |
| ------ | ------------------------------------------------------------------------------------- |
| `on`   | מוזרק תמיד כהגדרת כלי                                                                 |
| `off`  | לעולם אינו מוזרק ולעולם אינו ניתן להרצה                                               |
| `auto` | מקבל ציון ביחס לבקשה הנכנסת; מוזרק רק אם הציון ≥ `AUTO_MIN_SCORE` (ברירת המחדל היא 3) |

`auto` הוא ברירת המחדל עבור Skills שהותקנו מהמרקטפלייס. השילוב `enabled=true` ו-`mode="off"` משמעו "רשום אך לא פעיל" — החלפת המצב של `enabled` דרך העמודה הקודמת מעדכנת גם את `mode`, כך שגם נתיבי קוד ישנים נשארים עקביים (`src/app/api/skills/[id]/route.ts`).

### סטטוס (הרצות)

הרצות Skills מתועדות בטבלה `skill_executions` עם הסטטוסים הבאים (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### מטמון Registry

`SkillRegistry` הוא singleton עם מטמון TTL של 60 שניות (`registry.ts:14`). הפונקציה `loadFromDatabase()` היא idempotent ומסירה כפילויות מקריאות מקבילות באמצעות `pendingLoad`. כל כתיבה (`register`/`unregister`/`unregisterById`) מבטלת את המטמון. ניתן לחפש גרסאות באמצעות `getSkillVersions(name)` ו-`resolveVersion(name, constraint)`.

### הזרקה מודעת-ספק

`injectSkills()` שב-`src/lib/skills/injection.ts` היא נקודת הכניסה שהופכת Skills רשומים להגדרות כלים ייעודיות לספק:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

שם הכלי מקודד בתבנית `name@version`, כדי שהמטפל יוכל לבחור את הגרסה הנכונה כאשר המודל קורא לו בחזרה.

### ניקוד AUTO

כאשר `mode="auto"`, כל מיומנות מועמדת מקבלת ציון ביחס להקשר הבקשה (`scoreAutoSkill()` ב-`injection.ts`):

| אות                              | נקודות        |
| -------------------------------- | ------------- |
| שם המיומנות מופיע כלשונו בהקשר   | +6            |
| כל אסימון בשם תואם לאסימון בהקשר | +2            |
| כל תת-מחרוזת בתג תואמת להקשר     | +3            |
| כל אסימון בתיאור תואם להקשר      | +1            |
| סיבת הרקע תואמת לאסימון בשם      | +2 לכל אסימון |
| סיבת הרקע תואמת לתג              | +2 לכל אסימון |
| רמז לספק בתגים תואם לספק שבבקשה  | +2 / −2       |

עד `AUTO_MAX_SKILLS = 5` המיומנויות המובילות עם `score >= AUTO_MIN_SCORE = 3` מוזרקות. שוויון מוכרע לפי `installCount` (בסדר יורד), ולאחר מכן לפי שם בסדר אלפביתי (`injection.ts:225-235`).

### יירוט קריאות לכלים

`handleToolCallExecution()` שב-`src/lib/skills/interception.ts` מופעל על ידי מטפל הצ'אט לאחר שהשירות במעלה הזרם מחזיר תגובה הכוללת קריאה לכלים:

1. `extractToolCalls()` קורא מבנים ייחודיים לספק (`tool_calls` של OpenAI / `function_call` של Responses,‏ `tool_use` של Anthropic,‏ `functionCalls` של Gemini).
2. כינויים מובנים של כלים (לדוגמה, `omniroute_web_search` → `web_search`) נפתרים תחילה. המטפלים המובנים פועלים ישירות.
3. כל דבר אחר מנותב דרך `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. התוצאות משולבות בחזרה בתגובה — כפריטי `tool_results`, פריטי `function_call_output`, או בלוקי `tool_result` של Anthropic, לפי הצורך.

ניתן להגדיר את `customSkillExecutionEnabled` בהקשר הביצוע כ-`false` כדי לאפשר יירוט מובנה בלבד (משמש נתיבי בקשה שמשביתים במפורש מטפלים המוגדרים על ידי המשתמש).

---

## ארגז חול של Docker

נתיבי קוד שאינם מובנים (`eval_code`, `execute_command`) מופעלים בתוך Docker באמצעות `SandboxRunner` (`src/lib/skills/sandbox.ts`). כל קונטיינר מופעל עם:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (כאשר readOnly=true)
```

ברירות מחדל (`SandboxRunner.DEFAULT_CONFIG`):

| שדה              | ברירת מחדל      | הערות                                                          |
| ---------------- | --------------- | -------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | מחולק ב-1000 לפני ההעברה אל `--cpus`                           |
| `memoryLimit`    | 256 MB          | מגבלה קשיחה                                                    |
| `timeout`        | 30000 ms        | סיום רך באמצעות `SIGTERM` ולאחר מכן `docker kill`              |
| `networkEnabled` | `false`         | הופך ל-`--network none`                                        |
| `readOnly`       | `true`          | מערכת קבצים שורשית לקריאה בלבד; `/tmp` ו-`/workspace` הם tmpfs |

המתודות `SandboxRunner.kill(id)` ו-`killAll()` חשופות לצורך כיבוי; מתבצע מעקב אחר קונטיינרים פעילים ב-`runningContainers: Map<string, ChildProcess>`.

### משתני סביבה של ארגז החול

מוגדרים באמצעות `process.env` ב-`src/lib/skills/builtins.ts`:

| משתנה סביבה                       | ברירת מחדל       | מטרה                                                                               |
| --------------------------------- | ---------------- | ---------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | מגבלה עבור `file_read` ו-`file_write`                                              |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | מגבלה על גוף התגובה של `http_request`                                              |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | מגבלה על stdout/stderr המוחזרים למבצע הקריאה                                       |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | זמן קצוב כברירת מחדל לפקודות בארגז החול; מוגבל ל-60 s                              |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | מתג ראשי לתעבורה יוצאת. יש להגדיר `1` או `true` כדי לאפשר הצטרפות מפורשת בכל קריאה |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (ראו להלן)       | רשימת היתרים מופרדת בפסיקים של תמונות Docker                                       |

התמונות המותרות כברירת מחדל: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. כל תוספת באמצעות `SKILLS_ALLOWED_SANDBOX_IMAGES` ממוזגת עם ברירות המחדל; תמונות לא מוכרות נדחות על ידי `normalizeImage()`.

> הערה: אין משתנה סביבה נפרד בשם `SKILLS_EXECUTION_TIMEOUT_MS`. הזמן הקצוב של המטפל שאינו בארגז חול מקודד באופן קשיח ל-30 s ב-`SkillExecutor` (`executor.ts:13`), אך ניתן לדרוס אותו בזמן ריצה באמצעות `skillExecutor.setTimeout(ms)`.

### בידוד סביבת העבודה

`file_read` ו-`file_write` פותרים כל נתיב ביחס לסביבת עבודה נפרדת לכל מפתח API ב-`<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. מעבר בין נתיבים (`..`) ומקטעים אסורים (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) נדחים לפני כל פעולת קלט/פלט בדיסק.

### הקשחת HTTP

`http_request` (`builtins.ts:257`):

- רשימת שיטות מותרות: `GET, HEAD, POST, PUT, PATCH, DELETE`
- כותרות יוצאות חסומות: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- הפניות מושבתות (`allowRedirect: false`)
- מנותב דרך `safeOutboundFetch` עם `guard: "public-only"` (טווחים פרטיים/לולאה מקומית חסומים)
- התגובה נחתכת ב-`SKILLS_MAX_HTTP_RESPONSE_BYTES`; הלקוח רואה `truncated: true`

---

## מבצע היברידי (תצוגה מקדימה)

`src/lib/skills/hybrid.ts` מגדיר `HybridExecutor` שמחליט בכל קריאה בין ביצוע `direct` (בתוך התהליך) לבין ביצוע `sandbox`, עם נתיב ניסיון חוזר מסוג `autoUpgrade` במקרה של שגיאות פסק זמן/זיכרון. המימושים המחוברים `directExecutor` / `sandboxRunner` הם שלדים (`executeDirect`, `executeInSandbox` מחזירים אובייקטים זמניים) — יש להתייחס למודול הזה כחוזה שנמצא בתהליך בנייה. הביצוע בפועל עדיין מתבצע דרך `skillExecutor` + `SandboxRunner`.

---

## אחסון

הסכמה נמצאת בשתי מיגרציות:

- `src/lib/db/migrations/016_create_skills.sql` — טבלאות הבסיס `skills` ו-`skill_executions`, עם אינדקסים על `(api_key_id, name)` ועל `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — מוסיפה את `mode`,‏ `source_provider`,‏ `tags` (JSON),‏ `install_count` אל `skills`.

על `skill_executions.status` חלה מגבלה ברמת מסד הנתונים: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## API מסוג REST

כל נקודות הקצה נמצאות תחת `src/app/api/skills/`. נקודות קצה לניהול (`/api/skills`,‏ `/api/skills/[id]`,‏ `/api/skills/install`) דורשות **אימות ניהולי** באמצעות `requireManagementAuth()`. תהליכי השוק/ההתקנה משתמשים ב-`isAuthenticated()` המקל יותר (סשן או מפתח API).

| נקודת קצה | שיטה | מטרה |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | הצגת המיומנויות הרשומות. תומכת ב-`?q=`,‏ `?mode=on                     | off | auto`,‏ `?source=skillsmp | skillssh | local`, עימוד |
| `/api/skills/[id]` | PUT | עדכון `enabled` או `mode` |
| `/api/skills/[id]` | DELETE | ביטול רישום לפי מזהה |
| `/api/skills/install` | POST | התקנת מיומנות מותאמת אישית (קוד מטפל + סכמה) |
| `/api/skills/marketplace` | GET | חיפוש בקטלוג SkillsMP (מחזירה ברירות מחדל פופולריות כאשר `q` ריק) |
| `/api/skills/marketplace/install` | POST | התקנת מיומנות SkillsMP (דורשת ספק פעיל = `skillsmp`) |
| `/api/skills/skillssh` | GET | חיפוש בקטלוג skills.sh (`?q=&limit=`, מוגבל ל-100) |
| `/api/skills/skillssh/install` | POST | התקנת מיומנות skills.sh (דורשת ספק פעיל = `skillssh`) |
| `/api/skills/executions` | GET | היסטוריית ביצועים מעומדת (`?apiKeyId=`) |
| `/api/skills/executions` | POST | ביצוע אד-הוק של מיומנות רשומה |

נקודת הקצה `POST /api/skills/executions` מחזירה HTTP `503` עם `{ error: "Skills execution is disabled..." }` כאשר `settings.skillsEnabled === false` (`executor.ts:42-45`). מפעילים יכולים לשנות את המתג הראשי דרך **הגדרות ← AI**.

### דוגמה: התקנת מיומנות מותאמת אישית

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

המחרוזת `handlerCode` היא **חיפוש לפי שם מטפל** — ולא קוד בר־הרצה. המבצע ממפה אותה באמצעות `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). התקנות מהשוק שומרות את הטקסט של SKILL.md בשדה הזה כתיעוד, ומנתבות את הביצוע דרך קריאות לכלים שנוצרו על ידי המודל. קוד מקור שרירותי שסופק על ידי המשתמש אינו מועבר ל-`eval`.

---

## כלי MCP

ארבעה כלי MCP עוטפים את ממשק המיומנויות (`open-sse/mcp-server/tools/skillTools.ts`). הם נרשמים אוטומטית בעת אתחול שרת ה-MCP.

| כלי                           | תיאור                                                                |
| ----------------------------- | -------------------------------------------------------------------- |
| `omniroute_skills_list`       | הצגת מיומנויות, עם מסננים אופציונליים: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | הפעלה/השבתה של מיומנות לפי `skillId`                                 |
| `omniroute_skills_execute`    | הפעלת מיומנות עם מטען קלט                                            |
| `omniroute_skills_executions` | היסטוריית הפעלות אחרונות (ברירת מחדל 50, מקסימום 100)                |

ראו [MCP-SERVER.md](./MCP-SERVER.md) להגדרת התעבורה ולהקצאות ההרשאות.

---

## שילוב A2A

`src/lib/skills/a2a.ts` מייצא את מתאר מיומנות ה-A2A בשם `memory_aware_routing` ופונקציית עזר `registerA2ASkill(registry)`. מיומנויות A2A מותאמות אישית נמצאות ב-`src/lib/a2a/skills/` ומנותבות באמצעות `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). ראו [A2A-SERVER.md](./A2A-SERVER.md) למחזור החיים המלא של משימה.

---

## הוספת מיומנות מובנית חדשה

1. **הגדירו את המטפל** ב-`src/lib/skills/builtins.ts` (או בקובץ מקביל תחת `src/lib/skills/builtin/`). חתימה: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **נתיב קוד בארגז חול?** קראו ל-`sandboxRunner.run(image, command, env, sandboxConfig({...}))`. השתמשו ב-`normalizeImage()` מול רשימת ההיתרים.
3. **נתיב במערכת הקבצים?** העבירו אותו תמיד דרך `resolveWorkspacePath(input, context)` לפני גישה לדיסק.
4. **קריאת רשת?** השתמשו ב-`safeOutboundFetch` עם `guard: "public-only"`; נקו כותרות באמצעות `sanitizeHeaders()`.
5. **רשמו** על ידי הוספת הרשומה ל-`builtinSkills` (או על ידי קריאה בסגנון `registerBrowserSkill(executor)` בעת האתחול).
6. **חברו כינויים של כלים מובנים** (אופציונלי) ב-`BUILTIN_TOOL_ALIASES` (`interception.ts:23`) אם המודל במעלה הזרם מפיק שם שונה.
7. **בדיקות** ב-`src/lib/skills/__tests__/` (Vitest).

---

## הוספת מיומנות מותאמת אישית (שאינה מובנית)

1. רשמו את המטפל בעת אתחול התהליך:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. הוסיפו את המיומנות באמצעות `POST /api/skills/install` (השדה `handlerCode` חייב להתאים לשם המטפל הרשום).
3. החליפו את `mode` ל-`on` או ל-`auto` באמצעות `PUT /api/skills/[id]`.

---

## טיפים תפעוליים

- **מתג ראשי:** `settings.skillsEnabled = false` חוסם את כל ההפעלות ומחזיר HTTP `503` ב-`/api/skills/executions`. הרישום ממשיך להיטען.
- **הגבילו תעבורה יוצאת:** השאירו את `SKILLS_SANDBOX_NETWORK_ENABLED` לא מוגדר (ברירת המחדל) כדי לשמור על ארגז חול מבודד לחלוטין מהרשת. הגדרה של `networkEnabled: true` בכל קריאה עדיין מחייבת את אישור המתג הראשי.
- **התירו תמונות מסוימות:** הגדירו `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` כדי להרחיב את רשימת ההיתרים.
- **בקרו הפעלות:** גם `/dashboard/skills/executions` וגם `omniroute_skills_executions` מבצעים שאילתה על `skill_executions`. הפעלות מוצלחות כוללות `durationMs`; הפעלות שנכשלו כוללות `errorMessage`.
- **ביטול תוקף המטמון:** קראו ל-`skillRegistry.invalidateCache()` לאחר עריכות ידניות במסד הנתונים; אחרת, המתינו 60 שניות.
- **סביבת עבודה אנונימית:** כאשר `apiKeyId` ריק, כל הקריאות מגובבות לאותה סביבת עבודה `"anonymous"` — קוד המודע לשיתוף צריך תמיד להעביר מפתח אמיתי.

---

## מחזור חיי ההפעלה (v3.8.16+)

ה־`SkillExecutor` (`src/lib/skills/executor.ts`) הוא **מופע יחיד** שמנהל כל הפעלה של מיומנות. הבנת מחזור החיים שלו חיונית לניפוי שגיאות של חריגות זמן, ניסיונות חוזרים ומצב ההפעלה.

### מחזור החיים בן 5 השלבים

```
   execute() נקראת
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← בתור, טרם התחיל (נוצרה רשומה במסד הנתונים)
  └──────┬──────┘
         │ התחלת המטפל
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← המטפל הופעל עם מגבלת זמן
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (אין נתיב אחר — הופסק על ידי תהליך האב)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   הרשומה במסד הנתונים עודכנה עם status, output, durationMs
```

### תצורת ברירת המחדל

| הגדרה        | ברירת מחדל         | ניתנת להגדרה באמצעות                 |
| ------------ | ------------------ | ------------------------------------ |
| `timeout`    | `30000` (30 שניות) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`                | `skillExecutor.setMaxRetries(count)` |

> **חשוב**: רכיב ההפעלה הוא מופע יחיד — קריאה ל־`setTimeout()` משפיעה באופן גלובלי על כל ההפעלות הבאות. מגבלות זמן נפרדות לכל מיומנות אינן נתמכות כרגע; אם אתם זקוקים למגבלות זמן שונות לכל מיומנות, הפעילו תהליכים נפרדים או צרו פיצול של רכיב ההפעלה.

### ערכי סטטוס

מתוך `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // בתור, טרם התחיל
  RUNNING = "running", // המטפל הופעל
  SUCCESS = "success", // המטפל החזיר פלט תקין
  ERROR = "error", // המטפל השליך חריגה
  TIMEOUT = "timeout", // חרג ממגבלת הזמן של רכיב ההפעלה
}
```

> **הערה**: הסטטוס `TIMEOUT` מוגדר ב־enum, אך **אינו נכתב בפועל למסד הנתונים** על ידי המימוש הנוכחי של רכיב ההפעלה — חריגות זמן מוצגות כ־`ERROR` עם ההודעה `"Skill execution timed out"`. ה־enum של הסטטוס שמור לשימוש עתידי.

### בדיקת הפעלות

```ts
import { skillExecutor } from "omniroute/skills/executor";

// קבלת הפעלה מסוימת לפי מזהה
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// הצגת הפעלות אחרונות עבור מפתח API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// ספירת כלל ההפעלות
const total = skillExecutor.countExecutions("api-key-id");
```

### התנהגות ניסיונות חוזרים

ההגדרה `maxRetries` נשמרת, אך **אינה נמצאת כרגע בשימוש** בשיטה `execute()` של רכיב ההפעלה — היא מבצעת ניסיון יחיד בלבד. הערך `maxRetries` נחשף לצורך מימוש עתידי ועבור hooks שצריכים לקרוא אותו.

לעת עתה, יש לממש ניסיונות חוזרים בתוך המטפל של המיומנות עצמה. מיומנויות
מובנות נרשמות ברכיב ההפעלה (לדוגמה, `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` בתוך `src/lib/skills/builtin/`); כל מטפל
שתרשמו יכול לעטוף לולאת ניסיונות חוזרים משלו:

```ts
// בתוך מטפל של מיומנות
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## SkillMode בפירוט

ה-enum ‏`SkillMode` ‏(`src/lib/skills/types.ts`) קובע **מתי וכיצד** מופעלות מיומנויות:

```ts
enum SkillMode {
  AUTO = "auto", // ה-LLM מחליט מתי להפעיל את המיומנות
  MANUAL = "manual", // מופעלת רק בעקבות בקשת משתמש מפורשת
  HYBRID = "hybrid", // ניקוד AUTO עם אפשרות לעקיפה ידנית
}
```

> **הערה**: בסיס הקוד מגדיר את `SkillMode` ‏(AUTO/MANUAL/HYBRID), בעוד שהשדה `Skill.mode` משתמש במבנה שונה (`"on" | "off" | "auto"`). הם קשורים אך אינם זהים — `SkillMode` מיועד למדיניות המבצע, ואילו `Skill.mode` מיועד להפעלה או להשבתה של כל מיומנות בנפרד.

### מתי להשתמש בכל מצב

| מצב      | התנהגות ה-LLM                                                                        | תרחיש שימוש                                     |
| -------- | ------------------------------------------------------------------------------------ | ----------------------------------------------- |
| `AUTO`   | ה-LLM יכול להפעיל את המיומנות כאשר הוא סבור שהדבר נחוץ                               | מיומנויות לשימוש כללי (קריאת קבצים, בקשות HTTP) |
| `MANUAL` | ה-LLM אינו יכול להפעיל את המיומנות; רק קריאת API מפורשת ל-`executeSkill` מפעילה אותה | פעולות רגישות (כתיבה למסד נתונים, תשלומים)      |
| `HYBRID` | ה-LLM יכול להציע את המיומנות; המשתמש חייב לאשר                                       | מיומנויות בעלות תופעות לוואי שאינן מסוכנות      |

### ניקוד AUTO

כאשר מצב `AUTO` פעיל, כל מיומנות מועמדת מקבלת ניקוד ביחס להקשר הבקשה
באמצעות `scoreAutoSkill()` שב-`src/lib/skills/injection.ts` — מערכת נקודות
שלמות מצטברת (התאמה לשם המיומנות, חפיפה בין אסימוני שם/תג/תיאור,
רמזי סיבת רקע ובונוס/קנס עבור רמז ספק). עד
`AUTO_MAX_SKILLS = 5` המיומנויות המובילות עם `score >= AUTO_MIN_SCORE = 3` מוזרקות
ככלים הניתנים להפעלה, כאשר שוויון מוכרע לפי `installCount` ולאחר מכן לפי השם. ראו את טבלת הנקודות המלאה
ב-[**יצירת סכמת כלים ← ניקוד AUTO**](#auto-scoring) מוקדם יותר במסמך
זה; אין סף בסגנון `0.6` מסוג float, ואין ניקוד ב-`registry.ts`.

---

## קטלוג המיומנויות המובנות

OmniRoute מגיע עם אוסף אצור של מיומנויות מובנות ב-`src/lib/skills/builtin/`. הנפוצות ביותר:

### מיומנות אוטומציית דפדפן

מיומנות הדפדפן (`src/lib/skills/builtin/browser.ts`) מספקת אוטומציית דפדפן ללא ממשק גרפי באמצעות Playwright/Puppeteer. **היא ממומשת אך אינה נכללת בקטלוג המיומנויות המוגדר כברירת מחדל** — כדי להשתמש בה, יש להתקין בנפרד את תוסף הדפדפן.

```ts
// הפעלה בתצורה שלכם
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // תמיד לדרוש הפעלה מפורשת
  allowedSkills: ["browser"],
  timeout: 60000, // 60 שניות לטעינת דפים
  maxRetries: 1,
};
```

### קטגוריות מובנות נוספות

| קטגוריה          | מיומנויות                                 | מצב    |
| ---------------- | ----------------------------------------- | ------ |
| קלט/פלט של קבצים | `file_read`, `file_write`                 | AUTO   |
| HTTP             | `http_request`                            | AUTO   |
| חיפוש            | `web_search`                              | AUTO   |
| הרצת קוד         | `eval_code` (JavaScript/Python בארגז חול) | HYBRID |
| מערכת            | `execute_command` (הרצת CLI בארגז חול)    | MANUAL |

### הוספת מיומנות מותאמת אישית

ראו [SDK לתוספים ושילוב מיומנויות](./PLUGIN_SDK.md) כדי ללמוד כיצד להוסיף מיומנות מותאמת אישית באמצעות מערכת התוספים.

---

## ראו גם

- [MCP-SERVER.md](./MCP-SERVER.md) — רישום כלי MCP ותעבורות
- [A2A-SERVER.md](./A2A-SERVER.md) — מחזור החיים של משימות A2A וניתוב מיומנויות
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — מבוא למשתמשים
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — צינור עיבוד הבקשות ומפת הרכיבים
- קוד מקור: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- בדיקות: `src/lib/skills/__tests__/integration.test.ts`
