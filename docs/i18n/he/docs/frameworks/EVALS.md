# Evaluations (Evals) (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **מקור האמת:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **עדכון אחרון:** 2026-06-28 — v3.8.40

OmniRoute כולל מסגרת הערכה כללית שבה ניתן להשתמש כדי למדוד ביצועים של
תצורות ניתוב, ספקים/מודלים בודדים או חבילות הבדיקות המובנות מסוג "golden set".
השתמשו בה כדי לאמת שינויי ניתוב, לבחון ספקים חדשים ולהציב תנאי סף לגרסאות
לפני העברתן לתעבורת ייצור.

המסגרת ממומשת באמצעות:

- מנגנון הרצה טהור (`src/lib/evals/evalRunner.ts`) שרושם בזיכרון
  חבילות בדיקות מובנות, מעריך פלטים ביחס לקריטריונים הצפויים ומאגד
  כרטיסי ניקוד.
- שכבת התמדה (`src/lib/db/evals.ts`) עבור חבילות מותאמות אישית (המוגדרות על ידי המשתמש)
  והרצות היסטוריות ב-SQLite.
- שכבת תזמור (`src/lib/evals/runtime.ts`) שמבצעת כל מקרה
  על ידי שליחת קריאות אמיתיות אל `POST /v1/chat/completions`, מתעדת זמני השהיה
  ופלטים ושומרת את ההרצה.
- נקודות קצה של REST תחת `/api/evals/*` (למורשי ניהול בלבד).
- ממשק בלוח הבקרה בכתובת `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## מושגים

### חבילה

חבילה היא אוסף בעל שם של מקרי בדיקה, הכולל `description` ומקרה אחד או
יותר. החבילות מגיעות משני מקורות:

| מקור       | היכן מוגדר                                     | ניתן לשינוי בזמן ריצה? |
| ---------- | ---------------------------------------------- | ---------------------- |
| `built-in` | נרשם באמצעות `registerSuite()` בעת האתחול      | לא (מוגדר בקוד)        |
| `custom`   | מאוחסן ב-`eval_suites` + `eval_cases` ב-SQLite | כן (באמצעות API/UI)    |

החבילות המובנות הנוכחיות (ראו `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 מקרי בסיס בתחומי ברכות/מתמטיקה/תרגום/בטיחות
- `coding-proficiency` — Python/JS/SQL/TS/זיהוי באגים
- `reasoning-logic` — סילוגיזמים, בעיות מילוליות, זיהוי דפוסים
- `multilingual` — תרגום וזיהוי שפה
- `safety-guardrails` — מידע אישי מזהה, פריצת מגבלות, סירוב, מודעות להטיה
- `instruction-following` — JSON בלבד, רשימות ממוספרות, אילוצי שפה
- `codex-comparison` — משימות תכנות ראש-בראש המיועדות למצב השוואה

### מקרה

כל מקרה כולל:

| שדה        | תיאור                                                        |
| ---------- | ------------------------------------------------------------ |
| `id`       | מזהה יציב (המשמש כמפתח לפלטים ולמדדים)                       |
| `name`     | תווית קריאה לבני אדם                                         |
| `model`    | מודל ברירת המחדל כאשר ההרצה משתמשת ביעד `suite-default`      |
| `input`    | `{ messages, max_tokens? }` — נשלח אל `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — מחוון הניקוד (ראו להלן)              |
| `tags`     | תוויות אופציונליות (למשל `safety`, `pii`, `jailbreak`)       |

### יעד

ניתן להריץ את אותה חבילה מול יעדים שונים. סכמת היעד היא
`evalTargetSchema` בקובץ `src/shared/validation/schemas.ts`:

| סוג היעד        | `id`      | התנהגות                                              |
| --------------- | --------- | ---------------------------------------------------- |
| `suite-default` | `null`    | כל מקרה משתמש בשדה `model` המובנה שלו                |
| `model`         | שם המודל  | מאלץ כל מקרה לעבור דרך מודל ישיר אחד (למשל `gpt-4o`) |
| `combo`         | שם השילוב | מריץ כל מקרה דרך שילוב אחד (מפעיל את מנגנון הניתוב)  |

עבור `model` ו-`combo`, השדה `id` הוא שדה חובה (נאכף על ידי
`superRefine` של Zod). כאשר מסופק `compareTarget`, שני היעדים חייבים להיות שונים —
מנגנון ההרצה שומר את שתי ההרצות תחת אותו `runGroupId` לצורך השוואת A/B.

## מדדי ניקוד

ממומשים ב-`evaluateCase()` ‏(evalRunner.ts):

| אסטרטגיה   | עובר כאשר…                                                           |
| ---------- | -------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                    |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`  |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` מחזיר ערך truthy     |
| `custom`   | `expected.fn(actualOutput, evalCase)` מחזירה ערך truthy (מובנה בלבד) |

**הערה:** ניקוד באמצעות פונקציה מותאמת אישית שמור לחבילות בדיקה המוגדרות בקוד
(מובנות), משום שלא ניתן לבצע סריאליזציה של פונקציות דרך ה-API.
ה-`evalCaseBuilderSchema` מקבל רק `contains | exact | regex` עבור
חבילות בדיקה שנוצרו על ידי משתמשים.

כיום אין מנגנון LLM-as-judge או מנגנון ניקוד דמיון המבוסס על embeddings — זו
יכולה להיות נקודת הרחבה נקייה ב-`evaluateCase()`.

## סכמת מסד הנתונים

שלוש טבלאות (מיגרציות `030_create_eval_runs.sql` ו-
`031_create_eval_suites.sql`):

| טבלה          | מטרה                                                                                                                         |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | מטא-נתונים של חבילות בדיקה מותאמות אישית (`id`, `name`, `description`)                                                       |
| `eval_cases`  | מקרי בדיקה לכל חבילה — `input_json`, `expected_*`, `tags_json`                                                               |
| `eval_runs`   | הרצות היסטוריות — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

חבילות בדיקה מובנות **אינן** מאוחסנות במסד הנתונים. הן נשמרות בזיכרון ונרשמות
מחדש בכל פעם שמייבאים את `evalRunner.ts`.

## REST API

כל נקודות הקצה דורשות אימות ניהולי (`requireManagementAuth`) — הן אינן חלק
מממשק ה-proxy הציבורי.

| נקודת קצה                     | מתודה    | תיאור                                                            |
| ----------------------------- | -------- | ---------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | הצגת חבילות בדיקה + הרצות אחרונות + כרטיס ניקוד + יעדים + מפתחות |
| `/api/evals`                  | `POST`   | הרצת חבילת בדיקה (יחידה או השוואה) — סכמה `evalRunSuiteSchema`   |
| `/api/evals/{suiteId}`        | `GET`    | אחזור חבילת בדיקה אחת (מובנית או מותאמת אישית)                   |
| `/api/evals/suites`           | `POST`   | יצירת חבילת בדיקה מותאמת אישית — סכמה `evalSuiteSaveSchema`      |
| `/api/evals/suites/{suiteId}` | `GET`    | אחזור חבילת בדיקה מותאמת אישית                                   |
| `/api/evals/suites/{suiteId}` | `PUT`    | החלפת חבילת בדיקה מותאמת אישית (מקרי הבדיקה מוכנסים מחדש)        |
| `/api/evals/suites/{suiteId}` | `DELETE` | מחיקת חבילת בדיקה מותאמת אישית ומקרי הבדיקה שלה                  |

### הרצת חבילת בדיקה

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

שדות אופציונליים:

- `outputs` — ‏`Record<caseId, string>` של פלטים שחושבו מראש. כאשר השדה מסופק,
  מנגנון ההרצה **מדלג על השליחה** ורק מנקד את הפלטים השמורים במטמון (שימושי
  להערכה במצב לא מקוון).
- `compareTarget` — יעד שני להרצה במקביל; שתי ההרצות חולקות
  `runGroupId` שנוצר עבור תצוגת השוואה ישירה.
- `apiKeyId` — מפתח API פנימי המשמש לאימות קריאות
  `/v1/chat/completions` שנשלחו. נדרש כאשר `REQUIRE_API_KEY` מופעל.

### יצירת חבילת בדיקה מותאמת אישית

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## צינור ניתוב

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. פותר את חבילת הבדיקות (מובנית או מותאמת אישית).
2. עבור כל מקרה, בונה `Request` אל `/v1/chat/completions` עם ה־`messages` של המקרה,
   ה־`model` שנקבע, `stream: false` ו־`max_tokens: 512`
   (או הערך החלופי שהוגדר במקרה).
3. קורא ישירות למטפל הצ'אט (בתוך התהליך — ללא קפיצת HTTP נוספת).
4. מודד את זמן ההשהיה ומחלץ טקסט מתוך `choices[0].message.content`
   או מתוך מטען ה־`output[]` של Responses-API.
5. מנקד את כל הפלטים באמצעות `runSuite()`, ולאחר מכן שומר אותם באמצעות `saveEvalRun()`.

המקרים רצים **באופן סדרתי**. נכון להיום אין דגל מקביליות.

## לוח בקרה

ממשק המשתמש נמצא ב־`Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). משם ניתן:

- לעיין בחבילות מובנות ומותאמות אישית עם תצוגה מקדימה של כל מקרה בנפרד.
- ליצור/לערוך/למחוק חבילות מותאמות אישית באמצעות בונה המקרים.
- לבחור יעד (ברירות המחדל של החבילה / מודל / קומבו), אופציונלית יעד
  `compareTarget` שני, אופציונלית מפתח API, ולאחר מכן להריץ לפי דרישה.
- לבדוק את היסטוריית ההרצות, הצלחה/כישלון לכל מקרה, זמן השהיה ופלטים שנלכדו.
- לראות את לוח הציונים המתגלגל, המצטבר על פני ההרצה האחרונה לכל
  היקף `(suite, target)`.

## הקשר ל־RFC של Auto-Assessment

תת־מערכת נפרדת וממוקדת יותר להערכה נמצאת ב־`src/domain/assessment/`
(ראו גם [AUTO-COMBO.md](../routing/AUTO-COMBO.md) עבור מנוע הניקוד הפעיל).
תת־מערכת זו מיועדת למנוע Auto Combo — ניקוד אוטומטי של ספקים ומודלים,
כדי שקומבואים יוכלו להתאושש בעצמם כאשר מקורות במעלה הזרם נכשלים. היא משתמשת
במריץ משלה, במסווג משלה ובלוגיקת ניקוד משלה.

מסגרת Evals המתועדת כאן היא **משטח הבדיקות הרחב והכללי יותר**.
העדיפו אותה עבור חבילות רגרסיה שרירותיות, השוואות A/B ובדיקות עשן לכל גרסה.
השתמשו בתת־המערכת Auto-Assessment כאשר נדרש שמצב התקינות של הספקים בזמן אמת
ישפיע על החלטות הניתוב.

## שילוב CI

נכון להיום אין סקריפט npm ייעודי בשם `eval:ci`. קיימות שתי דרכים אם ברצונכם
להתנות הפצת גרסאות בתוצאות ההערכה:

- **נתיב HTTP**: הפעילו את השרת, שלחו `POST /api/evals` עם
  `suiteId` + `target` ידועים, וודאו ש־`runs[].summary.passRate >= N`
  בתגובה.
- **נתיב בתוך התהליך**: ייבאו את `runEvalSuiteAgainstTarget()` מתוך
  `@/lib/evals/runtime` מסקריפט, הריצו מול מסד נתונים לבדיקות ובדקו את
  `PersistedEvalRun.summary` שהוחזר.

בדיקות המכסות את הנתיב ואת ההיסטוריה נמצאות ב־
`tests/unit/evals-route.test.ts` וב־`tests/unit/evals-history.test.ts`.

## נקודות הרחבה

שינויים נפוצים והמקומות שבהם יש לבצע אותם:

- **אסטרטגיית ניקוד חדשה** — הרחיבו את הבלוק `switch (evalCase.expected.strategy)`
  בתוך `evaluateCase()` (`evalRunner.ts`) והרחיבו את `EvalCaseStrategy` בתוך
  `src/lib/db/evals.ts` וכן את `evalCaseBuilderSchema` בתוך `schemas.ts`.
- **חבילה מובנית חדשה** — הגדירו אובייקט חבילה וקראו ל־`registerSuite()` בתחתית
  `evalRunner.ts`. היא תתגלה אוטומטית על ידי `listSuites()`.
- **הרצה במקביל** — שנו את לולאת ה־`for` הסדרתית בתוך
  `runEvalSuiteAgainstTarget()` ל־`Promise.all` מוגבל (נכון להיום לא קיים
  מנגנון בקרת מקביליות).
- **מקרי סטרימינג/קריאה לכלים** — נכון לעכשיו המריץ כופה `stream: false`.
  הערכה התומכת בסטרימינג או מודעת לכלים תדרוש שינויים ב־`runtime.ts`
  (לכידה וצבירה של מקטעי SSE לפני הניקוד).

## ראו גם

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — סקירה מקיפה של המוצר
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — חומר עזר על צינור עיבוד הבקשות
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — מנגנון הניקוד של Auto Combo (בזמן ריצה)
- קוד מקור: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- ממשק משתמש: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
