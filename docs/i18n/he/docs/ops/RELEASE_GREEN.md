# Release-Green: keeping the queue and release branch green (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## הבעיה שהפתרון הזה פותר

**השער המלא** (`.github/workflows/ci.yml` — רסיסי בדיקות יחידה, vitest, ספי אי-החמרה,
`package-artifact`, SonarQube, E2E) מופעל **רק ב-PR של הגרסה** (PR → `main`). בקשות PR המכוונות אל
`release/**` מקבלות את **השערים המהירים** (`quality.yml`: בדיקות שהושפעו לפי TIA + בדיקת טיפוסים + lint)
ובשינויי קוד, גם build לייצור במעמד **המלצה**. כתוצאה מכך, כשלים שמופיעים רק בגרסה עדיין יכולים
להצטבר בשקט בענף הגרסה ו**להתפוצץ בשכבות של כ-40 דקות** בזמן השחרור,
בזה אחר זה.

משפחת "release-green" קיימת כדי **להקדים ולזהות** את הכשלים האלה — לאמת את המקבילה לשער המלא
**באופן מקומי / מחוץ לתהליך השחרור**, בכל עת, כך שה-PR של הגרסה כבר יהיה
ירוק בהרצת ה-CI הראשונה שלו.

> **עיקרון שאינו נתון למשא ומתן:** שום דבר מזה אינו חוסם את התורם. איננו מוסיפים בדיקת חובה
> שמכשילה את ה-PR שלו. **הסטייה** (ספי אי-החמרה) מיועדת למתחזק, כדי לקבוע מחדש את קו הבסיס בזמן השחרור —
> ולעולם אינה עניינו של התורם. אף רכיב אינו **סוגר** PR (גניבת קרדיט) ואינו
> **מחליש** בדיקה כדי שתעבור.

## המשפחה (4 רכיבים) — וכיצד כל אחד מהם פועל באופן עצמאי

| רכיב                                                                    | מהו                                                        | מתי להפעיל                                                      | היקף                       |
| ----------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------- | -------------------------- |
| **`/green-prs`** (פתרון A)                                              | סריקה לפי דרישה בידי המתחזק של **תור בקשות ה-PR הפתוחות**  | **באופן עצמאי, מעת לעת** — ובמיוחד **לפני** `/generate-release` | כל תור ה-PR → `release/**` |
| **`/validate-release-green`** (פתרון C — `npm run check:release-green`) | מנוע אימות: משחזר את השער המלא מול ענף או מול מועמד למיזוג | באופן עצמאי, בכל עת                                             | ענף מסוים או PR למיזוג     |
| **`/babysit <PR#>`**                                                    | מביא את ה-**CI הפעיל** של **PR יחיד** למצב ירוק            | באופן עצמאי, לכל PR                                             | PR יחיד                    |
| **`nightly-release-green.yml`** (פתרון D)                               | תהליך עבודה לילי אוטומטי; פותח issue במקרה של כשל HARD     | אוטומטית (cron)                                                 | ענף הגרסה הפעיל            |

**תשובה קצרה לשאלה "האם זה מיועד רק לגרסאות?":** **לא.** `/green-prs` תוכנן
להפעלה **מעת לעת, בין גרסאות**. הפעלה עצמאית היא השימוש הרגיל — השחרור הוא רק
הרגע שבו הפעלתו מניבה את הערך הרב ביותר.

## בניית ייעוץ מ-PR לריליס

`quality.yml` כולל כעת את `Build (advisory)` עבור PR-ים של קוד שאינם טיוטה ועבור ענפי התור של Mergify.
הוא משקף את מתכון הבנייה לייצור מתוך `ci.yml`:‏ Node 24,‏ `npm-ci-retry`,
`check:node-runtime` ו-`npm run build` עם `OMNIROUTE_USE_TURBOPACK=1`. בכוונה
הוא אינו מעלה תוצר בנייה, משום שאף משימת איכות במורד התהליך אינה צורכת תוצר כזה בתהליך עבודה זה.
יש להסיר את `continue-on-error` לאחר שבוע אחד של הרצות יציבות של PR-י ריליס, כדי שהאות יהפוך לשער
חוסם בין PR לריליס.

## פתרון C — `npm run check:release-green` (המנוע)

משחזר אימות המקביל לריליס מול עץ העבודה הנוכחי ומסווג כל כשל:

- **HARD** (בדיקת טיפוסים, שגיאות lint, בדיקות יחידה, vitest,‏ db-rules,‏ public-creds, וכן
  `package-artifact` אופציונלי) → **פגם אמיתי**; `exit 1`. מתוקן בענף המקור (TDD, כלל #18).
- **DRIFT** (**אזהרות** eslint,‏ cognitive-complexity,‏ file-size) → סטייה מצטברת של מנגנון הסף
  במהלך המחזור, **שאינה באשמת התורם**; היא מדווחת בלבד ו**קו הבסיס שלה מתעדכן על ידי המתחזק בעת
  הריליס**. DRIFT **לעולם אינו** משנה את קוד היציאה — ולכן הוא לעולם אינו חוסם אף אחד.

```bash
npm run check:release-green                 # הענף הנוכחי (עץ העבודה)
node scripts/quality/validate-release-green.mjs --json   # פלט מובנה
node scripts/quality/validate-release-green.mjs --quick  # מדלג על unit+vitest (רק drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # כולל package-artifact (איטי)
```

מבצע אבחון ו**דיווח** בלבד (ללא תיקון אוטומטי). תזמור התיקון עד למצב תקין נמצא ב-
`/green-prs` וב-`/review-prs`.

## פתרון A — `/green-prs` (סריקת התור)

הליך (סיכום — לפרטים ראו את מיומנות `green-prs`):

1. **מיפוי** תור ה-PR-ים הפתוחים מול ענף הריליס הפעיל.
2. **מיון** כל PR (בר-ביצוע / ראוי לדחייה / דורש טיפול מהמחבר) — PR-ים הראויים לדחייה או הדורשים טיפול מהמחבר
   **מדווחים, אך אינם נסגרים** (המחבר מחליט).
3. עבור כל PR בר-ביצוע, בתוך **עץ עבודה מבודד** (כלל #19), יש להביא את ה-PR לקצה ענף הריליס ולהריץ
   `npm run check:release-green`:
   - **HARD** → לתקן **בענף של התורם** באמצעות מחברות משותפת (כדי לשמר את סטטוס ה-"Merged" של המחבר),
     ולהריץ מחדש עד שכל כשלי HARD נפתרו.
   - **DRIFT** → להשאיר ללא שינוי; קו הבסיס שלו יעודכן בעת הריליס.
4. **דיווח** בטבלה של PR × (הכרעה, כשלי HARD, תוקן?, DRIFT, תקין לריליס כעת?).

ניתן **להכין** את התור ללא מיזוג; המיזוג מתבצע רק כאשר הוא מתבקש במפורש — ו-PR לעולם אינו נסגר.

## תדירות מומלצת

- יש להריץ את **`/green-prs` באופן תקופתי** (למשל, מדי שבוע) ו**תמיד לפני
  `/generate-release`**.
- יש להשאיר את **`nightly-release-green.yml`** (פתרון D) כאות רציף: כאשר הוא פותח בעיה בשל
  כשל HARD, הגיע הזמן לבצע סריקה.
- השתמשו ב-**`/validate-release-green`** לפי הצורך כדי לבדוק ענף או מועמד מיזוג מסוים.
- השתמשו ב-**`/babysit <PR#>`** כאשר צריך להביא PR מסוים למצב תקין ב-CI החי.

## הקשר לריליס

- `/generate-release` מפעיל את האימות ב-**שלב 0 (בדיקה מקדימה)**: מעדכן את קו הבסיס של DRIFT ומתקן
  כשלים מסוג HARD לפני פתיחת ה-PR של הריליס.
- `/review-prs` משתמש בשער release-green בשלב קבלת החלטת המיזוג (תקין-לפני-מיזוג).

המטרה של כל הרכיבים זהה: **PR ריליס תקין כבר בהרצת ה-CI הראשונה**, במקום לדלג
בין כשלים בשכבות של 40 דקות ביום הריליס.
