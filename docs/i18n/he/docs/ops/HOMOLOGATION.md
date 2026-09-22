# Homologation Suite (`npm run homolog`) (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

אימות E2E בסביבה אמיתית של פריסת OmniRoute שפועלת על ה־VPS של סביבת האישור
(`HOMOLOG_BASE_URL`, לדוגמה `http://192.168.0.15:20128`). פקודה אחת מחליפה את רשימת הבדיקה הידנית
של STOP #2 בתהליך אוטומטי שמפיק ראיות.

## מה נבדק

| שכבה                           | מה היא בודקת                                                                                                                                                                       | מימוש                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — תקינות/תאימות             | `/api/monitoring/health` מחזיר `200` עם `status: "healthy"` והגרסה הצפויה                                                                                                          | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — מפתח זמני                | כניסת מנהל מערכת ← `POST /api/keys` יוצר מפתח API בעל הרשאות מוגבלות עבור ההרצה, שמבוטל (`DELETE /api/keys/:id`) בבלוק `finally` ללא קשר לתוצאה                                    | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — ממשק ה־API               | קטלוג `/v1/models`, השלמת צ'אט אמיתית ללא הזרמה (מודל קריטי לשכבה, `max_tokens: 5`), תגובת `401` למפתח לא תקין, ו־`/api/monitoring/health` הציבורי                                 | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — הזרמת SSE                | השלמת צ'אט אמיתית בהזרמה; מוודא `text/event-stream`, לפחות מקטע תוכן אחד, וסמן סיום `[DONE]`                                                                                       | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — ספקים אמיתיים             | בקשת צ'אט אחת בעלות מזערית לכל ספק קריטי שנמצא בקטלוג `/v1/models` הפעיל, שנוצרת תוך כדי הריצה באמצעות promptfoo                                                                   | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — אימות בממשק המשתמש       | מבצע כניסה פעם אחת באמצעות טופס הכניסה האמיתי ומשתמש מחדש בהפעלה (`storageState`) לאורך שכבת ממשק המשתמש                                                                           | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — נתיבי ממשק המשתמש        | כל `page.tsx` סטטי תחת `src/app/(dashboard)/dashboard` (מתגלה ממערכת הקבצים; נתיבים דינמיים מסוג `[param]` מדולגים) נטען ללא שגיאת HTTP, שגיאת דף או גבול השגיאות של Next.js       | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — תהליך קריטי בממשק המשתמש | יוצר מפתח API דרך ממשק לוח המחוונים ומבטל אותו שוב (אינו משאיר שאריות ב־VPS)                                                                                                       | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — דוח מאוחד                 | ממזג את httpYac (באמצעות `junit-to-ctrf`), את מתאם promptfoo→CTRF ואת מדווח CTRF של Playwright לקובץ `homolog-ctrf.json` יחיד, וכן לקובץ `homolog-report/summary.md` קריא לבני אדם | `scripts/homolog/run.mjs`                                                     |

אין כל מעורבות של LLM בהרצה החוזרת עצמה — זוהי סדרת בדיקות רגרסיה דטרמיניסטית,
לא הערכה. בינה מלאכותית נכנסת לתמונה רק בעבודות תחזוקה עתידיות (ראו מפת הדרכים להלן).

## דרישות מקדימות

1. העתיקו את `.env.homolog.example` אל `.env.homolog` (הקובץ מוחרג מ-git — לעולם אין לבצע לו commit) ומלאו את:
   - `HOMOLOG_BASE_URL` — פריסת היעד, למשל `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — סיסמת הניהול של לוח הבקרה עבור פריסה זו.
   - `HOMOLOG_CRITICAL_PROVIDERS` — קידומות ספקים המופרדות בפסיקים, שעבורן תישלח בקשת
     צ'אט אמיתית לבדיקת תקינות בסיסית (למשל `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — השאירו ריק בהרצות רגילות; חבילת הבדיקות יוצרת ומבטלת
     מפתח זמני משלה. הגדירו ערך רק כדי לנפות שגיאות בשכבה יחידה בנפרד.
2. הריצו `npm install` במאגר (התלויות של חבילת הבדיקות — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — הן devDependencies רגילות).
3. הריצו `npx playwright install` אם קובצי ההפעלה של הדפדפנים עדיין אינם מותקנים.

## אופן ההרצה

```bash
npm run homolog
```

כדי לאמת מול פריסה שגרסתה אינה תואמת ל-`package.json` המקומי
(למשל סביבת בדיקות קבלה שעדיין נמצאת בגרסת תיקון קודמת), יש לדרוס במפורש את הגרסה
המצופה:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

ההרצה מסתיימת עם קוד יציאה שאינו אפס אם שכבה כלשהי נכשלת, ותמיד מנסה לבטל את מפתח
ה-API הזמני שיצרה, גם במקרה של כשל (בלוק `finally` בתוך `scripts/homolog/run.mjs`).

## קריאת הדוח

כל הפלט נשמר ב-`homolog-report/` (מוחרג מ-git):

- `summary.md` — אותה טבלה שמודפסת ל-stdout, עם שורה אחת לכל שכבה (✅/❌ + פרטים).
- `homolog-ctrf.json` — דוח CTRF המאוחד (מיזוג של תוצאות API/SSE, בדיקות תקינות בסיסיות של ספקים
  ותוצאות ממשק המשתמש) — זהו הארטיפקט שיש לצרף לרשימת התיוג של STOP #2 עבור מהדורה.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — הדוחות
  הגולמיים/דוחות הביניים לכל שכבה.
- `promptfooconfig.yaml`, `provider-misses.json` — תצורת promptfoo שנוצרה עבור
  ההרצה הנוכחית וכל הספקים הקריטיים שחסרו בקטלוג הפעיל.

כשל ב-L0 מפסיק את התהליך מיד (לא נוצר מפתח זמני), משום שאי-התאמה בגרסה או בתקינות
משמעותה שכל שכבה בהמשך התהליך תאמת את הפריסה הלא נכונה.

## עדכון קו הבסיס כאשר ממשק המשתמש משתנה באופן לגיטימי

L4b (בדיקת תקינות בסיסית של נתיבים) ו-L4c (תהליך ממשק המשתמש למפתח API) מופעלות באמצעות מאתרי DOM אמיתיים, ולא
תמונות מצב, ולכן רוב השינויים הלגיטימיים בממשק המשתמש אינם מחייבים עדכון של חבילת הבדיקות. כאשר שינוי
כן שובר מאתר (למשל שינוי שם של תווית כפתור או העברת דף הגדרות):

1. אמתו מחדש את המאתר מול קוד המקור הנוכחי (המפרטים כבר מתעדים מול איזה
   קובץ/שורה אומת כל מאתר — פעלו לפי אותו דפוס, אל תנחשו).
2. עדכנו את המפרט ב-`tests/homolog/ui/`.
3. הריצו מחדש `npm run homolog` (או רק את מפרט Playwright שהושפע) מול ה-VPS כדי
   לאשר את התיקון, ולאחר מכן בצעו commit.

אין בחבילת בדיקות זו קו בסיס חזותי/ברמת פיקסלים (F1) — ראו את מפת הדרכים בנושא.

## מפת דרכים (F2 / F3)

התכנון וההשקה ההדרגתית נמצאים במפרט התכנון הפנימי
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (לא מקושר — ארטיפקט פנימי
של `_tasks/`, שאינו חלק מהתיעוד שבמעקב במאגר זה). סיכום:

- **F2** — הקלטה מלאה של תהליך השימוש → סוכני Playwright Test (`planner`/`generator`)
  הופכים אותה למפרטי תהליכים (יצירת combo, בדיקת ספק, עריכת הגדרות, כלי MCP) +
  קו בסיס לרגרסיה חזותית (Lost Pixel) עם מסכות מעל נתונים דינמיים (מדדים,
  חותמות זמן, יומנים) + שגרת תחזוקה של `healer` לכל מהדורה.
- **F3** — כיסוי שרידות/חוזים/חיבורים: toxiproxy + ספק מזויף תואם OpenAI
  ב-devbox, ‏combo בשם `homolog-resilience` ב-VPS שמצביע אליו
  (הזרקת timeout → אימות מעבר לחלופה + פתיחה/סגירה של מפסק הזרם באמצעות
  `/api/monitoring/health`); בדיקות חוזים מבוקרות באמצעות Schemathesis מול
  `docs/openapi.yaml` (ערך `--max-examples` נמוך, seeds קבועים, נקודות קצה שאינן LLM בלבד); וכן
  שילוב `npm run homolog` + ה-`summary.md` שלו בשלב STOP #2 של `/generate-release`.
