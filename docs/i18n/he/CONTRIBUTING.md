# Contributing to OmniRoute (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## הגדרת סביבת פיתוח

### דרישות מוקדמות

- **Node.js** `>=22.22.2 <23`, או `>=24.0.0 <27` (מומלץ: 24 LTS)
- **npm** 10+

> **משתמשי npm v11+‎ (Node 24+):** לאחר `npm install`, ודאו שהמודולים המקומיים הותקנו:
> `node -e "require('better-sqlite3')"`. אם הפקודה נכשלת עם `MODULE_NOT_FOUND`,
> הריצו `npm approve-scripts better-sqlite3 && npm install`. ראו
> [פתרון בעיות](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### שכפול והתקנה

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### משתני סביבה

```bash
# צרו את קובץ ה-.env שלכם מהתבנית
cp .env.example .env

# צרו את הסודות הנדרשים
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

משתנים עיקריים לפיתוח:

| משתנה                  | ברירת מחדל לפיתוח        | תיאור                        |
| ---------------------- | ------------------------ | ---------------------------- |
| `PORT`                 | `20128`                  | יציאת השרת                   |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | כתובת URL בסיסית לממשק הקדמי |
| `JWT_SECRET`           | (יש ליצור לעיל)          | סוד לחתימת JWT               |
| `INITIAL_PASSWORD`     | `CHANGEME`               | סיסמת הכניסה הראשונה         |
| `APP_LOG_LEVEL`        | `info`                   | רמת פירוט הרישום             |

### הגדרות לוח הבקרה

לוח הבקרה מספק מתגים בממשק המשתמש עבור תכונות שניתן להגדיר גם באמצעות משתני סביבה:

| מיקום ההגדרה   | מתג              | תיאור                                         |
| -------------- | ---------------- | --------------------------------------------- |
| הגדרות ← מתקדם | מצב ניפוי שגיאות | הפעלת יומני בקשות לניפוי שגיאות (ממשק המשתמש) |
| הגדרות ← כללי  | נראות סרגל הצד   | הצגה/הסתרה של מקטעי סרגל הצד                  |

הגדרות אלה נשמרות במסד הנתונים ונשארות בתוקף לאחר הפעלות מחדש, תוך עקיפת ערכי ברירת המחדל של משתני הסביבה כאשר הן מוגדרות.

### הרצה מקומית

```bash
# מצב פיתוח (טעינה מחדש אוטומטית)
npm run dev

# בניית ייצור
npm run build    # next build → .build/next/ ואז assembleStandalone → dist/
npm run start

# הידור מהיר של צד השרת/API בלבד עבור שינויים של תורמים
npm run build:contributor

# בניית גרסה להפצה (בנייה מחדש ונקייה + סמן HEAD — נדרש לפריסה)
npm run build:release   # rm -rf .build dist && build + כותב את dist/BUILD_SHA

# תצורת יציאה נפוצה
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

בניית התורמים מבצעת אימות הידור בלבד: היא אינה מרכיבה את ההפצה העצמאית
או בונה נכסי אריזה מקומיים אופציונליים. השתמשו בבניית הייצור הרגילה כאשר
עליכם לאמת את החבילה המוכנה להפצה.

### מבנה פלט הבנייה

| תיקייה    | תוכן                                                                     | במעקב |
| --------- | ------------------------------------------------------------------------ | ----- |
| `src/`    | קוד המקור של היישום (TypeScript / TSX)                                   | כן    |
| `.build/` | תוצרי ביניים — פלט `next build` (לא במעקב Git,‏ `distDir = .build/next`) | לא    |
| `dist/`   | חבילה מוכנה להפצה — מורכבת באמצעות `assembleStandalone` (לא במעקב Git)   | לא    |

צינור הבנייה פועל במעבר יחיד:

```
npm run build
  └─ next build → .build/next/standalone  (פלט Next.js)
  └─ assembleStandalone()                 (מעתיקה קבצים עצמאיים + סטטיים + ציבוריים + נכסים מקומיים)
       └─ פלט: dist/                      (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` מנקה תחילה גם את שתי התיקיות וכותבת את
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) כסמן תקינות לפריסה.

`npm run build:contributor` משתמשת בפרופיל הבנייה של צד השרת בלבד. היא מחליפה זמנית
את קובצי ממשק המשתמש של לוח הבקרה בקובצי דמה במהלך הבנייה, משמרת את מטפלי נתיבי ה-API ומשחזרת את הקבצים המקוריים
לאחר הבנייה. השתמשו ב-`npm run build` עבור שינויים שמשפיעים על ממשק המשתמש של לוח הבקרה או לצורך
אימות מלא של גרסת הפצה; פרופיל התורמים אינו תחליף לבניית גרסה להפצה.

> **הערת פריסה ל-VPS:** תיקיית התמונה המרוחקת `/usr/lib/node_modules/omniroute/app/`
> נותרה ללא שינוי. כלי הפריסה מסנכרנים באמצעות rsync את התוכן של `dist/` לתוכה.
> רק נתיב פלט הבנייה בתוך המאגר השתנה (`app/` ← `dist/`).

כתובות URL המוגדרות כברירת מחדל:

- **לוח בקרה**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## תהליך עבודה עם Git

> ⚠️ **לעולם אין לבצע commit ישירות אל `main`.** יש להשתמש תמיד בענפי פיתוח.
>
> **בסיס ה-PR:** יש לבחור כיעד את הענף הפעיל `release/vX.Y.Z` (ולא את `main`). ראו
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) למידע על
> המודל של גרסה לכל ענף + תג בעת ההפצה.

```bash
# יצירת ענף מקצה הגרסה הפעילה (לדוגמה: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... ביצוע שינויים ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# פתיחת Pull Request עם base = release/v3.8.49
```

### מתן שמות לענפים

| קידומת      | מטרה                     |
| ----------- | ------------------------ |
| `feat/`     | תכונות חדשות             |
| `fix/`      | תיקוני באגים             |
| `refactor/` | ארגון מחדש של הקוד       |
| `docs/`     | שינויים בתיעוד           |
| `test/`     | הוספות/תיקונים של בדיקות |
| `chore/`    | כלי פיתוח, CI, תלויות    |

### הודעות Commit

יש לפעול לפי [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

תחומים (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## הרצת בדיקות

```bash
# כל הבדיקות (יחידה + vitest + מערכת אקולוגית + e2e)
npm run test:all

# קובץ בדיקה יחיד (מריץ הבדיקות המובנה של Node.js — רוב הבדיקות משתמשות בזה)
node --import tsx/esm --test tests/unit/your-file.test.ts

# רק בדיקות היחידה המושפעות מהשינוי שלכם (אותו בורר TIA כמו בשער ה-CI, #8084)
npm run test:scoped            # שינויים ב-commit האחרון (או בעץ העבודה)
npm run test:scoped:staged     # שינויים שנוספו ל-staging בלבד — משתלב היטב עם הרצה לפני commit
npm run test:scoped:full       # תחילה בונה מחדש את מפת גרף הייבוא (לאחר הוספה/העברה של קבצים)
# קוד יציאה 1 + "run the full suite" פירושם שקובץ מרכזי (tsconfig, package.json, …) או קובץ מקור
# שאינו ממופה השתנה — הבורר נכשל באופן בטוח ולעולם אינו מדלג בשקט.

# Vitest (שרת MCP, autoCombo, מטמון)
npm run test:vitest

# בדיקות E2E (דורשות Playwright)
npm run test:e2e

# בדיקות E2E של לקוחות פרוטוקול (תעבורות MCP,‏ A2A)
npm run test:protocols:e2e

# בדיקות תאימות למערכת האקולוגית
npm run test:ecosystem

# שער כיסוי: 60% מהפקודות/שורות/פונקציות/הסתעפויות
npm run test:coverage
npm run coverage:report

# בדיקת lint + עיצוב
npm run lint
npm run check

# בדיקת עשן משולבת מול שירותים חיצוניים אמיתיים, המותנית בשער (דורשת גישה ל-VPS + קרדיטים אמיתיים אצל ספקים)
# פונה לספקים אמיתיים — כרוכה בעלות קטנה. לעולם אינה רצה ב-CI. מדולגת באופן תקין ללא השער.
# דורשת: גישת ssh root@192.168.0.15 (טוענת תמונת מצב לקריאה בלבד של מסד הנתונים מה-VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# בדיקת עשן חיה של שלב 3 ב-VPS — סקריפטים פשוטים של Node ESM, הפונים ישירות לשרת החי ב-.15.
# דורשת: גישת ssh root@192.168.0.15 (שילובים נוצרים/מפורקים באמצעות SSH sqlite).
# פונה לספקים אמיתיים (עלות קטנה). יוצרת/מוחקת רק שילובים מסוג __live_test__*. לעולם אינה רצה ב-CI.
# ב-.15 מוגדר REQUIRE_API_KEY=false, ולכן אין צורך במפתח API, אך ההגדרות COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY מכובדות אם הוגדרו.
npm run test:combo:live:vps              # 7 תרחישי HTTP (עדיפות/סבב/משוקלל/עלות/מיזוג/אוטומטי + תקינות)
npm run test:combo:live:vps:failover     # מוסיף תרחיש מעבר לגיבוי אמיתי בין ספקים (8 בסך הכול)
```

הערות לגבי כיסוי:

- `npm run test:coverage` מודד את כיסוי קוד המקור עבור חבילת בדיקות היחידה הראשית, אינו כולל את `tests/**`, וכולל את `open-sse/**`
- בקשות משיכה חייבות לשמור על שער כיסוי של **60%+** מהפקודות/שורות/פונקציות/הסתעפויות
- אם PR משנה קוד ייצור ב-`src/`, ב-`open-sse/`, ב-`electron/` או ב-`bin/`, יש להוסיף או לעדכן בדיקות אוטומטיות באותו PR
- `npm run coverage:report` מדפיס דוח מפורט לפי קבצים מהרצת הכיסוי האחרונה
- `npm run test:coverage:legacy` משמר את המדד הישן לצורך השוואה היסטורית
- ראו `docs/ops/COVERAGE_PLAN.md` עבור מפת הדרכים המדורגת לשיפור הכיסוי

### דרישות לבקשת משיכה

לפני פתיחת PR, השתמשו ב-[נתיב הזהב לתרומה](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) כדי להריץ את הלולאה הממוקדת עבור
מה ששיניתם. חבילת בדיקות היחידה המלאה (4 פלחי CI),‏ Vitest, שער הכיסוי של **60%+**
ובניית הייצור הם באחריות ה-CI — הרצתם באופן מקומי אינה מוסיפה מידע שבדיקות ה-PR
לא יספקו ממילא, ובמחשבים חלשים יותר היא עלולה להעמיס על המארח (#8084):

- הריצו את קובצי הבדיקות המכסים את השינוי שלכם: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- הריצו `npm run lint`
- בכל שינוי בקוד ייצור, כללו או עדכנו בדיקות אוטומטיות באותו PR
- כאשר קוד הייצור השתנה, כללו בתיאור ה-PR את קובצי הבדיקות ששונו או נוספו
- בדקו את תוצאת SonarQube ב-PR כאשר סודות הפרויקט מוגדרים ב-CI

מצב הבדיקות הנוכחי: **122 קובצי בדיקות יחידה** המכסים:

- מתרגמי ספקים והמרת פורמטים
- הגבלת קצב, מפסק זרם ועמידות
- מטמון סמנטי, אידמפוטנטיות ומעקב התקדמות
- פעולות מסד נתונים וסכימה (21 מודולי DB)
- תהליכי OAuth ואימות
- אימות נקודות קצה של API‏ (Zod v4)
- כלי שרת MCP ואכיפת היקף
- מערכות זיכרון ומיומנויות

---

## סגנון קוד

- **ESLint** — יש להריץ `npm run lint` לפני ביצוע commit
- **Prettier** — העיצוב מתבצע אוטומטית באמצעות `lint-staged` בעת ביצוע commit (2 רווחים, נקודה-פסיק, מירכאות כפולות, רוחב של 100 תווים, פסיקים סופיים בסגנון es5)
- **TypeScript** — כל הקוד תחת `src/` משתמש ב-`.ts`/`.tsx`;‏ `open-sse/` משתמש ב-`.ts`/`.js`; יש לתעד באמצעות TSDoc (`@param`, `@returns`, `@throws`)
- **ללא `eval()`** — ‏ESLint אוכף את `no-eval`,‏ `no-implied-eval`,‏ `no-new-func`
- **אימות באמצעות Zod** — יש להשתמש בסכמות Zod v4 לכל אימות הקלט של ה-API
- **מתן שמות**: קבצים = camelCase/kebab-case, רכיבים = PascalCase, קבועים = UPPER_SNAKE

### טיפול בשגיאות / בלוקי catch ריקים

לעולם אין להשאיר `catch` ללא הסבר. יש לסווג אותו לאחת משתי קטגוריות (כך מיושם
הכלל הנוקשה "לעולם אין לבלוע שגיאות בשקט בזרמי SSE"):

- **מכוון (ניקוי/טלמטריה מסוג best-effort שלנו)** — כשל כאן הוא צפוי
  ואינו מזיק; יש להוסיף הערת נימוק בת שורה אחת, ללא רישום לוגים (רישום לוג בכל בקשה הוא
  הרעש שמוסכמה זו נועדה למנוע).

  ```ts
  } catch {} // סגירה של controller שכבר נסגר לאחר ניתוק הלקוח היא צפויה
  ```

- **יש לתעד בלוג (קוד חיצוני/קוד שסופק על ידי הקורא, או כאשר הבליעה משנה את זרימת הבקרה)** — יש להשאיר
  את ה-catch (לעולם אין לאפשר לו לשבש את הזרם), אך להפיק `console.debug`/`warn` עם הקשר כדי
  שניתן יהיה לגלות את הכשל.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

לדוגמאות יישומיות, ראו `open-sse/utils/stream.ts` ו-`open-sse/utils/streamHandler.ts`.

---

## מבנה הפרויקט

```
src/                        # TypeScript‏ (.ts / .tsx)
├── app/                    # נתב האפליקציה של Next.js 16
│   ├── (dashboard)/        # דפי לוח הבקרה (23 מקטעים)
│   ├── api/                # נתיבי API‏ (51 תיקיות)
│   └── login/              # דפי אימות (.tsx)
├── domain/                 # מנגנון מדיניות (policyEngine, comboResolver, costRules וכו')
├── lib/                    # לוגיקה עסקית מרכזית (.ts)
│   ├── a2a/                # שרת פרוטוקול מסוכן-לסוכן v0.3
│   ├── acp/                # מרשם Agent Communication Protocol
│   ├── compliance/         # מנגנון מדיניות תאימות
│   ├── db/                 # מודולי תחום של SQLite +‏ 130 מיגרציות
│   ├── memory/             # זיכרון שיחה מתמשך
│   ├── oauth/              # ספקי OAuth, שירותים וכלי עזר
│   ├── skills/             # תשתית מיומנויות ניתנת להרחבה
│   ├── usage/              # מעקב שימוש וחישוב עלויות
│   └── localDb.ts          # שכבת ייצוא מחדש בלבד — לעולם אין להוסיף כאן לוגיקה
├── middleware/              # תווכת בקשות (promptInjectionGuard)
├── mitm/                   # פרוקסי MITM‏ (אישור, DNS, ניתוב יעד)
├── shared/
│   ├── components/         # רכיבי React‏ (.tsx)
│   ├── constants/          # הגדרות ספקים (329), תחומי MCP,‏ 21 אסטרטגיות ניתוב
│   ├── utils/              # מנתק מעגל, מנקה קלט, עזרי אימות
│   └── validation/         # סכמות Zod v4
└── sse/                    # צינור עיבוד פרוקסי SSE

open-sse/                   # סביבת העבודה @omniroute/open-sse
├── executors/              # 150 מודולי ביצוע (מחלקות ביצוע + עזרים לכל ספק)
├── handlers/               # 11 מטפלי בקשות (צ'אט, תגובות, הטמעות, תמונות וכו')
├── mcp-server/             # שרת MCP‏ (110 כלים ייחודיים, 3 תעבורות, 33 תחומים)
├── services/               # 178 שירותים ברמה העליונה (combo, autoCombo, rateLimitManager וכו')
├── translator/             # ממירי פורמטים (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # ממיר API התגובות
└── utils/                  # 22 מודולי עזר (הזרמה, TLS, פרוקסי, רישום)

electron/                   # אפליקציית שולחן עבודה Electron‏ (חוצת פלטפורמות)

tests/
├── unit/                   # מריץ הבדיקות של Node.js‏ (1,574 קובצי בדיקה)
├── integration/            # בדיקות אינטגרציה
├── e2e/                    # בדיקות Playwright
├── security/               # בדיקות אבטחה
├── translator/             # בדיקות ייעודיות לממיר
└── load/                   # בדיקות עומס

docs/
├── adr/                     # רשומות החלטות ארכיטקטוניות
├── architecture/            # ארכיטקטורת מערכת וחוסן
├── comparison/              # OmniRoute לעומת חלופות
├── compression/             # מדריכים וכללים לדחיסה
├── dev/                     # מדריכי פיתוח
├── diagrams/                # תרשימי ארכיטקטורה
├── frameworks/              # MCP, A2A, OpenCode, זיכרון, מיומנויות
├── guides/                  # מדריך למשתמש, Docker, הגדרה, פתרון בעיות
├── i18n/                    # תרגומי README לשפות שונות
├── marketing/               # חומרי שיווק
├── ops/                     # פריסה, פרוקסי, כיסוי, מהדורות
├── providers/               # תיעוד ייעודי לספקים
├── reference/               # חומר עזר ל-API, משתני סביבה, כלי CLI, מסלולים חינמיים
├── releases/                # הערות מהדורה
├── routing/                 # מנגנון שילוב אוטומטי, הפעלה חוזרת של הסקה
├── screenshots/             # צילומי מסך של לוח הבקרה
├── security/                # אמצעי הגנה, תאימות, הסוואה, אסימונים
└── specs/                   # מפרטי תכנון
```

---

## הוספת ספק חדש

### שלב 1: רישום קבועי הספק

הוסיפו אותם אל `src/shared/constants/providers.ts` — עם אימות Zod בעת טעינת המודול.

### שלב 2: הוספת מבצע (אם נדרשת לוגיקה מותאמת אישית)

צרו מבצע ב-`open-sse/executors/your-provider.ts` שמרחיב את המבצע הבסיסי.

### שלב 3: הוספת מתרגם (אם הפורמט אינו OpenAI)

צרו מתרגמי בקשה/תגובה ב-`open-sse/translator/`.

### שלב 4: הוספת תצורת OAuth (אם מבוסס OAuth)

הוסיפו אישורי OAuth ב-`src/lib/oauth/constants/oauth.ts` ושירות ב-`src/lib/oauth/services/`.

אם הספק במעלה הזרם מפיץ `client_id`/סוד OAuth ציבורי או מפתח Firebase Web API בתוך ה-CLI הציבורי שלו / חבילת הדפדפן שלו, **אל** תטמיעו אותו כליטרל מחרוזת. השתמשו ב-`resolvePublicCred()` מתוך `open-sse/utils/publicCreds.ts` והוסיפו רשומת בתים ממוסכת אל `EMBEDDED_DEFAULTS`. תהליך העבודה המחייב המלא מתועד ב-[`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

בתוך מטפלים/מבצעים, הודעות שגיאה המגיעות ללקוח חייבות לעבור דרך `buildErrorBody()` / `sanitizeErrorMessage()` מתוך `open-sse/utils/error.ts` — לעולם אל תכניסו `err.stack` או `err.message` גולמיים לגוף Response. ראו [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### שלב 5: רישום מודלים

הוסיפו הגדרות מודלים ב-`open-sse/config/providerRegistry.ts`.

### שלב 6: הוספת בדיקות

כתבו בדיקות יחידה ב-`tests/unit/` המכסות לכל הפחות:

- רישום ספק
- תרגום בקשה/תגובה
- טיפול בשגיאות

---

## רשימת תיוג לבקשת משיכה

- [ ] הבדיקות עוברות (`npm test`)
- [ ] בדיקת הסגנון עוברת (`npm run lint`)
- [ ] הבנייה מצליחה (`npm run build`)
- [ ] נוספו טיפוסי TypeScript עבור פונקציות וממשקים ציבוריים חדשים
- [ ] אין סודות או ערכי ברירת מחדל מקודדים בקוד
- [ ] פרטי גישה ציבוריים של upstream מוטמעים באמצעות `resolvePublicCred()` (ראו [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), ולעולם לא כערכים מילוליים
- [ ] תגובות שגיאה עוברות דרך `buildErrorBody()` / `sanitizeErrorMessage()` — אין עקבות מחסנית גולמיים בגופי התגובות (ראו [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] פקודות מעטפת (`exec` / `spawn`) מעבירות ערכים בזמן ריצה באמצעות `env`, ולא באמצעות אינטרפולציית מחרוזות
- [ ] כל הקלטים מאומתים באמצעות סכמות Zod
- [ ] נוסף **מקטע** יומן שינויים תחת `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` עבור שינויים הנראים למשתמשים (ראו [`changelog.d/README.md`](./changelog.d/README.md)) — **אין** לערוך את `CHANGELOG.md` ישירות; המקטעים מאוגדים בעת ההפצה ולעולם אינם יוצרים התנגשויות בין בקשות משיכה
- [ ] התיעוד עודכן (אם רלוונטי)
- [ ] לא נפתחו התראות CodeQL / סריקת סודות חדשות, או שכל אחת מהן נדחתה בצירוף הצדקה טכנית המפנה למסמך הרלוונטי תחת `docs/security/`
- [ ] נתיבים שמפעילים תהליכי-בן (`/api/mcp/`, `/api/cli-tools/runtime/`) מסווגים כ-`isLocalOnlyPath()` בתוך `src/server/authz/routeGuard.ts` — ראו [כלל מחייב מס' 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] אין סיומות `Co-authored-by` של AI/בוט בהודעות commit (כלל מחייב מס' 16) — שותפים אנושיים שעבודתם נעשה שימוש חוזר מקבלים קרדיט באמצעות סיומות `Co-authored-by: Name <email>` תקניות

---

## פרסום גרסאות

פרסום גרסאות מנוהל באמצעות תהליך העבודה `/generate-release`. כאשר נוצרת גרסה חדשה ב-GitHub, החבילה **מתפרסמת אוטומטית ב-npm** באמצעות GitHub Actions.

לפריסות ב-VPS, השתמשו ב-`npm run build:release` (ולא ב-`npm run build`) — הפקודה מבצעת
בנייה מחדש ונקייה, מרכיבה את החבילה בתוך `dist/` וכותבת את קובץ הסמן `dist/BUILD_SHA`.
לאחר מכן, השתמשו במיומנויות `/deploy-vps-*-cc`, המסנכרנות באמצעות rsync את `dist/` עם הספרייה המרוחקת `app/`.

---

## קבלת עזרה

- **ארכיטקטורה**: ראו [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **תיעוד API**: ראו [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **מסמכי אבטחה**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **מסמכי תפעול**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **בעיות**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
