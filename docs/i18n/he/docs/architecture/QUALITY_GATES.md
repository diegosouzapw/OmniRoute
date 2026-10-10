# Quality Gates Reference (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

מסמך זה הוא המקור המוסמך לכל שערי האיכות של CI ב-OmniRoute.
הוא מתאר כל שער, מה הוא מאמת, באיזו משימת CI הוא פועל, האם הוא משתמש
בקו בסיס מסוג ratchet או במדיניות עובר/נכשל, והאם הוא חוסם את הבנייה או משמש כהמלצה בלבד.

לסיכום קצר ולמדיניות רשימת ההיתרים, ראו את הסעיף "שערי איכות ו-Ratchets"
ב-`AGENTS.md`. להערכה הביקורתית, לסיווג הבשלות ולתוכנית השכפול שאינה תלויה בכלי
של אותה המערכת, ראו את
[מדריך שערי האיכות](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## מלאי השערים ופרופילי ההרצה

### קבלת מועמדים

תהליכי העבודה של CI ושל שערי האיכות מפיקים כל אחד הכרעה יציבה: `Gate / CI` ו-
`Gate / Quality`. מדיניות הקבלה שלהם, שלה יש גרסאות, מונה כל משימה במעלה הזרם
כנדרשת או כמייעצת. משימה נדרשת ורלוונטית חייבת להסתיים בהצלחה: תוצאות חסרות,
מבוטלות, שדולגו, ממתינות או לא ידועות אינן יכולות לקבוע PASS. סיווג תקף
של תיעוד בלבד או קטלוג בלבד יכול להפוך מסלול קוד ללא רלוונטי;
טיוטת PR אינה מועמדת קבילה. תווית `hotfix` אינה פוטרת מהצגת ראיות.

שני תהליכי העבודה מכסים בקשות PR ודחיפות לענפי main/release, הפעלה ידנית ואירועי
merge-group. דחיפה, הפעלה ו-merge-group מריצים את הבחירה המלאה. מזלגות
וקבוצות מיזוג משתמשים ב-hosted runners עבור משימות שאחרת היו בוחרות ב-self-hosted
runners; יש לוודא קיבולת מספקת ב-hosted runners לפני הפריסה.

כל קבלת JSON מזהה את ה-SHA שנשלף, את הרצת תהליך העבודה ואת ניסיון ההרצה.
ה-CLI דוחה אי-התאמה בין ה-SHA של השליפה לזה של האירוע. בדיקות תהליך העבודה קושרות את החברות במדיניות
לרשימת `needs` של משימת ההכרעה, כך שמסלול חדש או שהוסר לא יוכל להיעלם ללא התרעה.
הקבלות מכסות את תהליך העבודה שלהן בלבד, ולא פרסום, פריסה או את הרכיבים הפנימיים
של סורק מייעץ קיים. הפעלת שני שמות הבדיקות בכללי הענף היא
שינוי ניהולי נפרד; הוספת המשימות האלה אינה מגינה על ענף בפני עצמה.

### מלאי הסריקות הסטטיות

מלאי כינויי npm בעל הגרסאות והחברות בסריקה הסטטית נמצאים ב-
`config/quality/gate-manifest.json`. הריצו `npm run check:gate-manifest` כדי לאמת
שמות סקריפטים ופקודות מדויקות מול `package.json`; הוספות, הסרות
וסטייה בפקודות מכשילות הן את ה-hook המקומי והן את משימות סיווג השינויים ב-CI.
כינוי אינו משימת תהליך עבודה, מופע מטריצה או מקרה בדיקה: אין
להציג ספירות אלה כבנות-החלפה.

השתמשו ב-`npm run quality:scan -- --list` או ב-`npm run quality:scan:fast -- --list`
כדי לבדוק את הכינויים שנבחרו מבלי להפעיל אותם. ה-runner מפעיל את
נקודת הכניסה של npm, ולכן סביבת הריצה שלה (כולל Bun, כאשר הוגדר) נשמרת.
המניפסט מתעד כינויים שמחוץ לפרופילים האלה כמופעלים בנפרד, ופקודות
תחזוקה אסורות בפרופילי סריקה לקריאה בלבד.

פרופילים אלה מכסים את הסריקה הסטטית בלבד. הם אינם מאשרים בדיקות מוצר,
כיסוי, אריזה, בדיקות חיצוניות או קבלה מלאה של מועמד להפצה.
הקבלה בתהליך העבודה משתמשת ב-`config/quality/admission-policy.json` המקושר וב-
`scripts/quality/admission-verdict.mjs`. פרופילי release-observer נשארים נפרדים;
יש לבדוק באופן עצמאי את הבדיקות והקבלות הרלוונטיות שלהם. המלאי
הטקסטואלי שלהלן הוא חומר עזר, ולא הוכחה לכך ששער אכן הופעל.

הסקריפטים נמצאים תחת `scripts/check/` (שערי מדיניות) ו-`scripts/quality/` (מנוע ההקשחה).
מקור האמת של CI הוא `.github/workflows/ci.yml`.

### הנתיב המהיר ל-PR של הפצה (`quality.yml`)

`.github/workflows/quality.yml` משלים את CI בבקשות PR לענפי main/release, בדחיפות
לענפים מוגנים, בהפעלה ובקבוצות מיזוג. בקשות PR משתמשות בבדיקות מהירות המסוננות לפי נתיב. בניית
הכפילות שהושבתה לצמיתות הוסרה; בדיקות הבנייה/האריזה/האתחול האמיתיות נשארות ב-CI.

| משימה                                            | היקף                                                                                                                                                                        | חוסמת           |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | בקשות PR של תיעוד/קוד; הפניות לתיעוד API ו-docs-all                                                                                                                         | כן              |
| `Fast Quality Gates`                             | בקשות PR של קוד; בדיקות סטטיות, typecheck,‏ typecheck של לוח המחוונים ובדיקות יחידה מושפעות                                                                                 | כן              |
| `Forgotten sibling tests`                        | בקשות PR של קוד; מעקב ממודולים שהשתנו אל צרכנים סטטיים ואל בדיקות sibling מועמדות; נתיבי barrel ו-dynamic-import מדווחים כאבחונים מייעצים, עם חריגים מתוך allowlist שהוזכרו | **מייעצת**      |
| `Vitest (fast-path)`                             | בקשות PR של קוד; חבילת vitest מהירה                                                                                                                                         | כן              |
| `Unit Tests fast-path`                           | בקשות PR של קוד; חבילת בדיקות יחידה המחולקת ל-4 shards                                                                                                                      | כן              |
| `No new ESLint warnings`                         | בקשות PR של קוד; הגנת lint המודעת ל-suppressions                                                                                                                            | כן, כולל מזלגות |
| `Merge integrity (changelog + generated skills)` | בקשות PR שאינן טיוטה; סנכרון changelog ומיומנויות שנוצרו                                                                                                                    | כן, כולל מזלגות |

#### דוח בדיקות sibling שנשכחו

`npm run check:forgotten-sibling-tests` עושה שימוש חוזר בפותר הייבוא שמאחורי מפת השפעת הבדיקות.
עבור כל מודול ייצור שהשתנה, הוא מדווח על שרשראות דטרמיניסטיות של
`changed module/symbol -> static consumer -> candidate sibling test` כאשר הבדיקה המועמדת
חסרה מה-diff של בקשת המשיכה. סיכום ה-Markdown ותוצאת ה-JSON נשמרים כארטיפקט
תהליך העבודה `forgotten-sibling-tests` לצורך כיול לפני פריסה חוסמת כלשהי.

ייצואים מחדש מסוג barrel וייבואים דינמיים משמשים לאבחון רזולוציה בלבד; הם לעולם אינם יוצרים
ממצא חוסם. חריגים שנבדקו נמצאים ב-
`config/quality/forgotten-sibling-allowlist.json`. כל רשומה חייבת לציין את בדיקת הצרכן ואת הבדיקה
המועמדת, לספק נימוק ספציפי ולקשר לבעיה או לבקשת משיכה ב-GitHub. רשומות פגומות נכשלות
במצב סגור. חריגים אינם יכולים להסתיר בדיקה מועמדת שנמחקה או diff שמוסיף `.skip`/`.todo`;
החלשת assertions והסתרות אחרות נשארות באחריות שער
`check:test-masking`, שחוסם באופן עצמאי.

### משימה: `lint`

פועלת בכל PR אל `main`. חוסמת מיזוג במקרה של כשל.

| סקריפט (`npm run ...`)            | מה מאומת                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | חוסם                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `check:node-runtime`              | גרסת Node.js נמצאת בטווח הנתמך                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | כן                                    |
| `check:cycles`                    | ייבואים מעגליים בכל `src/` + `open-sse/` (מבוסס AST, עם רזולוציה של `paths` מתוך tsconfig). הרצה בסיסית = ייעוץ בלבד, ומציגה את המחזורים. `check:cycles:ratchet` (מה ש-CI מריץ) חוסם כאשר הכמות חורגת מהתקרה `metrics.cycles` שב-`quality-baseline.json` — נכון לעכשיו 14, עם `direction: down`, ולכן היא יכולה רק לרדת (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | כן (ratchet)                          |
| `check:route-validation:t06`      | סכמות Zod קיימות בכל הנתיבים (מדיניות Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | כן                                    |
| `check:any-budget:t11`            | מספר המופעים של `@ts-expect-error // any` אינו חורג מהתקציב (catraca של Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | כן                                    |
| `check:provider-consistency`      | לכל ספק ב-`providers.ts` קיימת רשומה תואמת ב-`providerRegistry.ts` (ולהפך, במסגרת רשימת ההיתרים)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | כן                                    |
| `check:model-lifecycle`           | שלוש טבלאות הניתוב המתוחזקות ידנית נשארות עקביות עם תמונת מצב מחזור החיים שבמאגר (#11503): ‏`FITNESS_TABLE`‏ (`taskFitness.ts`) אינה מעניקה ציון למזהה שהוצא משימוש וש-`REGISTRY` יכולה לנתב אליו; כל יעד של `BUILT_IN_ALIASES` קיים ב-`REGISTRY` ואינו מופיע בתמונת המצב של המזהים שהוצאו משימוש; כל מזהה שהוצא משימוש ועדיין נמצא ב-`REGISTRY` מועבר הלאה או רשום ב-`allowedRetiredInCatalog`; ואף מקור או יעד של `DEFAULT_DEGRADATION_MAP` אינו מופיע בתמונת מצב זו כמזהה שהוצא משימוש. בדיקה זו אינה מוכיחה שמודל מסופק כעת על ידי שירות upstream פעיל. לא מקוון — מתבצעת השוואה מול `config/quality/model-lifecycle.json`, המרוענן ידנית באמצעות `npm run quality:refresh-model-lifecycle` (דורש רשת; אינו משולב ב-CI). ‏`allowedRetiredInCatalog` הוא מנגנון מחגר לצמצום הדרגתי: יש להוסיף רשומה רק בצירוף issue למעקב. | כן                                    |
| `check:fetch-targets`             | כל `fetch("/api/...")` בצד הלקוח תחת `src/` מפנה לקובץ `route.ts` קיים                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | כן                                    |
| `check:deps`                      | כל יחסי התלות שניתן להתקין באמצעות `npm install`, בכל קובץ `package.json` במאגר, נמצאים ב-`dependency-allowlist.json`; חבילות חדשות שאינן מקובעות לגרסה או חשודות ב-slopsquatting מסומנות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | כן                                    |
| `audit:deps`                      | `npm audit` (שורש + Electron) — ללא התראות בדרגת חומרה גבוהה/קריטית (חופף ל-`check:vuln-ratchet` של OSV; ראו צבר הרציונליזציה)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | כן                                    |
| `check:lockfile`                  | תקינות `package-lock.json` — רישום HTTPS, גיבובי תקינות, ללא דריסות מארח                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | כן                                    |
| `check:licenses`                  | רשימת היתרים של רישיונות SPDX עבור תלויות ייצור                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | כן                                    |
| `check:tracked-artifacts`         | ללא תוצרי בנייה / קישורי `node_modules` שנוספו למעקב (רץ גם ב־pre-commit של husky; ‏pre-push קל במכוון — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | כן                                    |
| `check:ai-attribution`            | ללא שורת סיום `Co-Authored-By` של AI/בוט או כותרת תחתונה המעידה על יצירה באמצעות AI ב־commits, בכותרת או בגוף של PR — כלל מחייב #16 (בלולאת הבדיקות המהירות של `quality.yml` עבור PR→`release/**` — קורא את מטען האירוע ואינו מבצע פעולה מחוץ ל־PRs — ובשלב המיועד ל־PR בלבד בבדיקת ה־lint של `ci.yml` עבור PR→`main`; גם ב־hook‏ `commit-msg` של husky; מחברים־שותפים אנושיים מותרים; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | כל החרגה של Vitest מציינת issue למעקב ומופיעה ב־`config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | כן                                    |
| `check:file-size`                 | אף קובץ מקור אינו חורג מהמכסה לכל סיומת (מנגנון ratchet: קבצים גדולים שהוקפאו ברשימת `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | כן                                    |
| `check:error-helper`              | תגובות שגיאה ב־executors/handlers משתמשות ב־`buildErrorBody()` / `sanitizeErrorMessage()` (כלל מחייב #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | כן                                    |
| `check:migration-numbering`       | קובצי Migration SQL ממוספרים ברצף, ללא פערים או כפילויות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | כן                                    |
| `check:public-creds`              | אין ערכי OAuth מילוליים של `client_id`/`client_secret` או מפתחות Firebase Web מחוץ ל-`publicCreds.ts` (כלל קשיח #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | כן                                    |
| `check:db-rules`                  | אין SQL גולמי מחוץ למודולים שב-`src/lib/db/`; אין ייבואי barrel מ-`localDb.ts` (כללים קשיחים #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | כן                                    |
| `check:known-symbols`             | רכיבי ההרצה של הספקים, אסטרטגיות הניתוב והמתרגמים הרשומים בטבלאות הניתוב שלהם תואמים לקבצים שבדיסק — ללא סמלים יתומים או לא מוצהרים                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | כן                                    |
| `check:route-guard-membership`    | כל נתיב שמפעיל תהליך בן מסווג באמצעות `isLocalOnlyPath()` (כללים קשיחים #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | כן                                    |
| `check:test-discovery`            | כל קובץ `*.test.ts` / `*.spec.ts` במאגר נאסף על ידי לפחות מריץ בדיקות אחד (ratchet: רשימת הקבצים היתומים ב-`test-discovery-baseline.json` יכולה רק להצטמצם)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | כן                                    |
| `check:agent-skills-sync`         | ארטיפקטים שנוצרו עבור agent-skills תואמים לקטלוג המקור שלהם (ללא סטייה)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | סמלי לוגו/נכסים של ספקים כוללים רשומת מקור מתועדת                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | קובצי תצורה מסוג JSON עוברים ניתוח תחבירי ועומדים בכללי ה-lint של המאגר                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | הידור TypeScript ללא שגיאות (אזהרות מייעצות בלבד)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | כן                                    |
| `typecheck:noimplicit:core`       | `noImplicitAny` מחמיר — מיועד להמשך הדרך; אתרי קריאה קיימים רבים עדיין זקוקים לאנוטציות                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **מייעץ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` המוגבל ל-`src/app/(dashboard)/**` (#7033) — רשימת ההיתרים המצומצמת של `typecheck:core`, הכוללת 27 קבצים, אינה כוללת אף קובץ TSX של לוח המחוונים, וגם `next build` לעולם אינו מבצע עבורו בדיקת טיפוסים (`next.config.mjs` מגדיר `ignoreBuildErrors: true`), ולכן רגרסיות של מזהים יתומים שם (#6625/#6909) לא היו גלויות ל-CI. מתבצעת השוואה מול קו בסיס קפוא של ספירת שגיאות לכל קובץ ולכל קוד TS (`config/quality/dashboard-typecheck-baseline.json`, באותה תבנית אכיפה נגד התיישנות כמו `check:known-symbols`) — רק שגיאות חדשות מעבר לספירה שבקו הבסיס גורמות לכשל בשער; יש להדק את קו הבסיס באמצעות `--update` כאשר שגיאה קיימת מתוקנת.                                                                                                                                                                              | כן                                    |

### משימה: `quality-gate`

רצה לאחר `test-coverage`. חוסמת מיזוג במקרה של כשל.

| סקריפט                       | מאמת                                                                                                                                                | חוסם                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `quality:collect`            | מפיק את `quality-metrics.json` (מספר אזהרות ESLint, כיסוי מדוח הרסיסים הממוזג)                                                                      | כן (לפני מנגנון הסף) |
| `quality:ratchet`            | אף מדד ב-`quality-baseline.json` לא נסוג (אזהרות ESLint ≤ קו הבסיס; כיסוי ≥ קו הבסיס)                                                               | כן                   |
| `check:duplication`          | שכפול קוד (jscpd@4) אינו חורג מקו הבסיס שב-`quality-baseline.json`                                                                                  | כן                   |
| `check:complexity`           | המורכבות הציקלומטית ברמת הקובץ אינה חורגת מהתקרה (כללי הליבה של ESLint‏ `complexity` + `max-lines-per-function`)                                    | כן                   |
| `check:cognitive-complexity` | מנגנון סף למורכבות קוגניטיבית (`eslint-plugin-sonarjs`) — מעבר ESLint נפרד; CI מריץ את שניהם במאוחד כשלב היחיד `check:complexity-ratchets`          | כן                   |
| `check:dead-code`            | מנגנון הסף לייצואים / קבצים שאינם בשימוש (knip) אינו נסוג ביחס לקו הבסיס                                                                            | כן                   |
| `check:compression-budget`   | תקציב מדד ביצועי הדחיסה — ערכי הסף המזעריים לחיסכון באסימונים עבור כל מנוע אינם יכולים לסגת                                                         | כן                   |
| `check:type-coverage`        | מנגנון הסף לאחוז הקוד המוקלד (`type-coverage`) אינו נסוג; מחליף במידה רבה את `typecheck:noimplicit:core`                                            | כן                   |
| `check:codeql-ratchet`       | מספר התראות CodeQL הפתוחות אינו נסוג (נקרא באמצעות `gh api`; דילוג תקין ללא אסימון) — לתדירות הרענון ולהפעלה ידנית: ראו "מנגנון הסף של CodeQL" להלן | כן                   |

### משימה: `quality-extended`

המשימה כולה היא בגדר המלצה (`continue-on-error: true`). מנגנוני הסף מבוססי npm מופעלים
בפועל; הסורקים החיצוניים מותקנים באמצעות `gh release download` ומדלגים בעצמם (יציאה עם קוד 0)
כאשר קובץ בינארי עדיין חסר.

| סקריפט                   | מאמת                                                                                                                                                                                                                   | חוסם                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:circular-deps`    | אין תלויות מעגליות (dpdm)                                                                                                                                                                                              | **בגדר המלצה**                              |
| `check:bundle-size`      | גודל החבילה אינו חורג מהתקרה                                                                                                                                                                                           | **בגדר המלצה**                              |
| `check:secrets`          | סריקת סודות (gitleaks) — מדלג אם הקובץ הבינארי חסר                                                                                                                                                                     | **בגדר המלצה**                              |
| `check:vuln-ratchet`     | חולשות בתלויות (osv-scanner) אינן נסוגות — מדלג אם הקובץ הבינארי חסר                                                                                                                                                   | **בגדר המלצה**                              |
| `check:workflows`        | בדיקת תקינות של תהליכי עבודה (actionlint + zizmor); סורקים חסרים/תקולים, דוחות לא תקינים או קו בסיס חסר למנגנון הסף גורמים לכשל במצב INCOMPLETE. ממצאים תקפים מטופלים בהתאם למדיניות המחמירה/המייעצת/מבוססת-הסף שנבחרה | נדרשת הפעלה; מנגנון הסף של zizmor חוסם ב-CI |
| `check:openapi-breaking` | שינויים שוברים בחוזה ה-API הציבורי (`openapi.yaml`) ביחס לענף הבסיס (oasdiff) — מפיק `openapiBreaking=N`; מדלג אם oasdiff חסר או שלא ניתן לפענח את מפרט הבסיס                                                          | **בגדר המלצה**                              |

### משימה: `docs-sync-strict`

מופעלת בכל PR אל `main`. חוסמת מיזוג במקרה של כשל.

| סקריפט                         | מה הוא מאמת                                                                                                                                 | חוסם                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | שער־על שמריץ ברצף את 6 שערי־המשנה שלהלן                                                                                                     | כן                           |
| ↳ `check:docs-sync`            | עקביות הגרסאות בין CHANGELOG / OpenAPI / llm.txt                                                                                            | כן                           |
| ↳ `check:docs-counts`          | הספירות בטקסט (מספר ספקים, מספר מיגרציות וכו׳) נמצאות בתוך חלון ההידוק של הספירות בפועל                                                     | כן                           |
| ↳ `check:env-doc-sync`         | כל משתנה סביבה ב־`.env.example` מתועד בטבלת תיעוד, ולהפך                                                                                    | כן                           |
| ↳ `check:deprecated-versions`  | אין בתיעוד מחרוזות של גרסאות שהוצאו משימוש                                                                                                  | כן                           |
| ↳ `check:doc-links`            | קישורי Markdown פנימיים בתיעוד מפנים לקבצים קיימים (בתבנית `[text]`/`(path)`)                                                               | כן                           |
| ↳ `check:fabricated-docs`      | הנתיבים, משתני הסביבה, פקודות ה־CLI, שמות ה־hooks ונתיבי הקבצים המוזכרים בתיעוד קיימים בבסיס הקוד. שער קשיח עם `--strict`; כשל רך ללא הדגל. | כן (באמצעות `--strict` ב־CI) |
| `check:cli-i18n`               | מחרוזות פקודות ה־CLI קיימות בכל קובצי אזורי ה־i18n                                                                                          | כן                           |
| `check:openapi-coverage`       | מפרט OpenAPI מכסה לפחות סף תחתון מהודק של הנתיבים בפועל                                                                                     | כן                           |
| `check:openapi-security-tiers` | הערות רמות האבטחה ב־`openapi.yaml` תואמות לסיווגים ב־`routeGuard.ts`                                                                        | **מייעץ**                    |
| `check:openapi-routes`         | כל נתיב ב־`openapi.yaml` מפנה ל־`route.ts` אמיתי (מניעת הזיות)                                                                              | כן                           |
| `check:docs-symbols`           | כל הפניה מסוג `/api/...` בתוך `docs/**/*.md` מפנה ל־`route.ts` אמיתי (מניעת הזיות)                                                          | כן                           |
| `i18n translation drift`       | מפתחות שלא תורגמו בקובצי אזורי ה־i18n — אזהרה בלבד                                                                                          | **מייעץ**                    |

### משימה: `i18n-ui-coverage`

| סקריפט                           | מה הוא מאמת                                                                                                                                                                          | חוסם      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check-ui-keys-coverage` (מוטמע) | כיסוי מפתחות ה־i18n של ממשק המשתמש הוא ≥ 65%                                                                                                                                         | כן        |
| `check-ui-value-drift` (מוטמע)   | שינוי של **ערך** באנגלית אינו משאיר אחריו תרגום מיושן                                                                                                                                | כן        |
| `check-new-key-coverage` (מוטמע) | מפתח אנגלי **חדש** מתורגם בכל אזור — הסמן `__MISSING__:` נדחה                                                                                                                        | כן        |
| `check-translation-ratio`        | יחס התרגומים האמיתיים בכל אזור (ערכים הזהים לאנגלית / מצייני מקום / ערכים חסרים שאינם ברשימת ההחרגות) אינו יכול לחרוג מ־`config/quality/i18n-translation-baseline.json` בתוספת מרווח | **מייעץ** |

נדרש `fetch-depth: 0` — שער סטיית הערכים משווה את `en.json` מול בסיס המיזוג.

#### `check-ui-value-drift` — שער תרגומים מיושנים

מאתר את נסיגת ה־i18n היחידה ששאר השערים אינם יכולים לזהות מבחינה מבנית: ערך באנגלית
נכתב מחדש, אך התרגומים שנגזרו מהאנגלית _הקודמת_ נשארים במקומם, ולכן
משתמשים שאינם דוברי אנגלית ממשיכים לקרוא נוסח נחרץ שכעת הוא שגוי.

התקלה הזו אכן הגיעה לגרסה שפורסמה. `oauthModal.googleOAuthWarning` נכתב מחדש כאשר מסייע
ההתחברות של Antigravity נוסף (#5203); ב־**39 מתוך 43 אזורים** נשאר טקסט שהורה למפעילים
״להעתיק את כתובת ה־URL המלאה ולהדביק אותה למטה״ — תהליך שלא ניתן להשלים עבור ספק זה. הדבר
לא התגלה עד #8463, משום ש:

- `sync-ui-keys` משלים רק מפתחות ש**חסרים**, ולעולם לא מפתחות ש**התיישנו**;
- `check-ui-keys-coverage` סופר את _נוכחות_ המפתח, ולכן תרגום מיושן נחשב כמכוסה;
- `check-translation-drift` עוקב אחר עותקי התיעוד ב־`docs/i18n/<locale>/**.md` —
  הוא לעולם אינו קורא את `src/i18n/messages/*.json`. חוסם במשימה `docs-sync-strict` מאז
  הסנכרון מחדש של 2026-09: עריכת מסמך ליבה → `npm run i18n:run -- --files=<doc>` (ברמת המקטע, זול).

**מודע להבדלים, ללא הסתמכות על קו בסיס.** הוא משווה את `en.json` בנקודת המיזוג המשותפת לעץ
העבודה; עבור כל מפתח שהערך שלו באנגלית השתנה, כל אזור שפה שעדיין מחזיק בתרגום
שלא עודכן נחשב מיושן. כך **מוקפא במכוון חוב קיים** — הבדל אינו יכול לחשוף מאיזו
גרסה ישנה באנגלית הגיע תרגום ותיק, ולכן שער הבדיקה בוחן רק את מה שהשינוי הנוכחי נוגע
בו. החלופה (קו בסיס של גיבוב לכל מפתח) הייתה כרוכה בקובץ שנוצר אוטומטית בגודל של כ־600 KB,
פי 3 מקו הבסיס הקיים הגדול ביותר, והייתה משתנה בכל PR של i18n.

יש שתי דרכים לעמוד בדרישה:

1. לעדכן את התרגומים המושפעים, או
2. להגדיר אותם כ־`__MISSING__:<new english>` — לאחר מכן, בזמן ריצה, מוגש הטקסט המתוקן באנגלית
   (`src/i18n/request.ts::deepMergeFallback`, #7258), והמפתח נכנס לתור לתרגום.

אם **המשמעות** של המחרוזת השתנתה, עדיף **לשנות את שם המפתח**: מפתח חדש אינו יכול לרשת
תרגום מיושן. זהו הדפוס שבו נעשה שימוש ב־#8463.

```bash
npm run i18n:check-value-drift          # מחמיר (מה שמופעל ב־CI)
npm run i18n:check-value-drift:warn     # דיווח בלבד
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

יוצא עם קוד 0 ועם `SKIP reason=base-unresolved` כאשר לא ניתן לקרוא את קטלוג הבסיס (שכפול
רדוד ללא הפניית הבסיס), בדומה ל־`check-openapi-breaking`.

### משימה: `i18n`

מטריצת אימות i18n מלאה (משימה אחת לכל אזור שפה). המשימה כולה היא בגדר המלצה.

| סקריפט                          | מה מאומת                  | חוסם                                                      |
| ------------------------------- | ------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | שלמות התרגום לכל אזור שפה | **בגדר המלצה** (`continue-on-error: true` על המשימה כולה) |

### משימה: `pr-test-policy`

פועלת בבקשות משיכה בלבד.

| סקריפט                 | מה מאומת                                                                                                                            | חוסם |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `check:pr-test-policy` | בקשות משיכה שמשנות קוד ייצור ב־`src/`, ב־`open-sse/`, ב־`electron/` או ב־`bin/` חייבות לכלול בדיקות או לעדכן אותן (כלל מחייב מס' 8) | כן   |
| `check:test-masking`   | קובצי בדיקות שהשתנו אינם מפחיתים את המספר הכולל נטו של טענות אימות ואינם מוסיפים טאוטולוגיות מסוג `assert.ok(true)`                 | כן   |
| `check:pr-evidence`    | גוף ה־PR מציין ראיות מבדיקות/VPS עבור השינוי (ממכן את כלל מחייב מס' 18 באמצעות חיפוש בטקסט ה־PR — שברירי, ראו רשימת משימות)         | כן   |

### משימה: `test-vitest`

פועלת לאחר `build`. כשל חוסם מיזוג.

| חבילת בדיקות     | מה מאומת                                            | חוסם                                                                                       |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `test:vitest`    | שרת MCP ‏(110 כלים), autoCombo, מטמון — מריץ vitest | כן                                                                                         |
| `test:vitest:ui` | בדיקות רכיבי ממשק משתמש — מריץ vitest               | **חוסם** — כשלים קיימים מוחרגים במפורש ב־`vitest.config.ts`; כשלים חדשים מכשילים את המשימה |

### תהליכי עבודה ליליים (מתוזמנים, בגדר המלצה)

אלה פועלים לפי לוח זמנים של cron (וכן באמצעות `workflow_dispatch`), ולעולם לא בבקשות משיכה. כולם בגדר המלצה.

| תהליך עבודה            | מה מאומת                                                                                                                                           | חוסם           |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | בדיקות מבוססות־מאפיינים של fast-check עם seed אקראי ומספר הרצות גבוה                                                                               | **בגדר המלצה** |
| `nightly-resilience`   | שער גידול ערימה, הזרקת תקלות כאוס, בדיקות עומס/שהייה ממושכת של k6                                                                                  | **בגדר המלצה** |
| `nightly-llm-security` | הגנה מפני הזרקה של promptfoo (מצב חסימה) + בדיקות garak (מדולגות ללא סוד של ספק)                                                                   | **בגדר המלצה** |
| `nightly-schemathesis` | בדיקות fuzzing לחוזה OpenAPI ‏(schemathesis) מול OmniRoute פעיל באמצעות `docs/openapi.yaml` — חושפות הפרות מפרט / שגיאות 500 שלא טופלו (שלב 8 B.4) | **בגדר המלצה** |
| `nightly-mutation`     | ציון בדיקות מוטציה של Stryker עבור מסלול בדיקות היחידה המהיר — מוטנטים ששורדים חושפים טענות אימות חלשות                                            | **בגדר המלצה** |
| `nightly-compat`       | מטריצת תאימות למנוע Node בכל טווחי `engines.node` הנתמכים                                                                                          | **בגדר המלצה** |

---

## שלב המהירות (2026-08-30 → v4.0 LTS): כל קו בסיס הוקל ב-20%

החלטת הבעלים (2026-08-30): עד למודולריזציה של v4.0, מהירות האספקה חשובה יותר
משמירה על רמת החוב. כל קו בסיס **מספרי** של מנגנון ההידוק הוקל ב-20% במעבר
אחד הניתן לביקורת, והשלב הוגדר ב-`config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| מה השתנה                                                                                                                                                                           | היכן                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — ספירות שבהן נמוך יותר עדיף ×1.2, אחוזים שבהם גבוה יותר עדיף ÷1.2 (רף הכיסוי 60 נשמר, `eslintErrors` נשאר 0, ‏`eslintWarnings` ‏0 ← 20% מספירת ההשתקות המוקפאת) | `quality-baseline.json` (הערת `_relax_velocity_2026_08_30` מפרטת כל ערך לפני ← אחרי)                   |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                   | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, ‏`testCap`, כל תקרת שורות מסוג `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                           | `file-size-baseline.json`                                                                              |
| ספירות לכל קובץ / לכל קוד TS ×1.2                                                                                                                                                  | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` ‏36 ← 30                                                                                                                                                               | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` הופך להמלצה כאשר `_policy.requireTighten === false`                                                                                                            | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| ריצת הלילה `bank-ratchet-shrinks` מושהית (היא הייתה מקבעת את הצמצום שנמדד ומבטלת את מרווח הביטחון)                                                                                 | `.github/workflows/nightly-release-green.yml`                                                          |

רשימות ההיתרים (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) אינן תקציבים ולא שונו. שערי המדיניות מסוג עובר/נכשל (סודות, כללי SQL,
חוזה תיעוד/סביבה, התאמת i18n, בדיקות יחידה) לא השתנו — בדיקה שנכשלת עדיין נחשבת לבדיקה שנכשלה.

**כלים**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ההקלה
  החד-פעמית (`scripts/quality/relax-baselines.mjs`); מסרבת לרוץ פעמיים עם אותה הערה.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  מודד כל בדיקת איכות מספרית באותה דרך שבה CI עושה זאת, ומציג את המרווח שנותר לכל בדיקה
  (`scripts/quality/baseline-headroom.mjs`). המשימה הלילית `baseline-headroom` מפרסמת את הטבלה
  בסיכום ריצת תהליך העבודה ומעלה את דוח ה־JSON/Markdown בשם
  `baseline-headroom-<run_id>`, שנשמר למשך 90 ימים. שורות האזהרה והשורות הקריטיות מציינות
  בדיקות שנותר להן מרווח של 10% או פחות עד לתקרה, או שכבר חרגו ממנה.
  עיינו בדוחות האלה כהתרעה מוקדמת על ניצול התקציבים; בדקו את הערות
  `_rebaseline_*` של הבדיקה הרלוונטית. המשימה כבר אינה יוצרת או מעדכנת סוגיה קבועה;
  #12149 משמר את היסטוריית הדוחות הקודמים.

**מצב קוד חדש (Clean-as-You-Code) — מאז 2026-08-30, נתיב מהיר ל-PR בלבד**

באירועי `pull_request`, הקובץ `quality.yml` מעביר את `--base-ref <PR base SHA>` אל `check:file-size`,
‏`check:complexity-ratchets` ו-`check:dead-code`. במצב זה השער משווה את HEAD מול
בסיס המיזוג, **בהגבלה לקבצים שבהם ה-PR נגע** (`scripts/check/newCodeMode.mjs`: בסיס
המיזוג ממומש ב-`git worktree` זמני, ESLint/knip רצים שם וגם על HEAD, והספירות
לכל קובץ מושוות לפי ההפרש):

- **חוסם** — ה-PR הוסיף הפרות של מורכבות ציקלומטית/קוגניטיבית או ייצואים מתים בקבצים ששינה
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` ביומן);
- **המלצה** — הסכום הגלובלי מול קו הבסיס המוקפא. סטייה שהתקבלה בירושה לעולם אינה מכשילה
  PR שאינו אחראי לה; הסטייה מוקפאת מחדש בהתאמת הגרסה ומנוטרת בידי משימת מרווח הביטחון.

לריצות `workflow_dispatch`, לסריקת release-green ולמשימת מרווח הביטחון הלילית אין בסיס PR,
ולכן הן ממשיכות להשתמש בהשוואה המוחלטת (הגלובלית). כיסוי, כפילויות וכיסוי טיפוסים נשארים גלובליים
לעת עתה (הכלים שלהם אינם מפיקים הפרש לכל קובץ בעלות נמוכה) — מועמדים לטיפול זהה.

**סגירת השלב ב-v4.0 (‏LTS = הדוק יותר מבעבר, לא "חזרה לשגרה")**

1. בקצה הנקי של `release/v4.0.0`: הריצו `npm run quality:headroom --json` לצורך התיעוד, ולאחר מכן
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, וכן
   `--update` עבור כל שער בדיקת טיפוסים — כל ערך בסיס יורד לערך שנמדד.
2. מחקו את `_policy` מתוך `quality-baseline.json` (מפעיל מחדש את `--require-tighten` ואת הצבירה
   הלילית), ושחזרו את `THRESHOLD = 36` (או ערך גבוה יותר) בתוך `check-openapi-coverage.mjs`.
3. הדקו מעבר לערך שנמדד במקומות שבהם המודולריזציה השתלמה: החזירו את `cap` של גודל הקובץ ל־1000
   (או 800), העלו את ערכי הסף התחתונים של הכיסוי ב־5, וקבעו 0 ייצואים מתים עבור החבילות שעברו מודולריזציה.

## קו בסיס מתקדם (`quality-baseline.json`)

מנוע הקו המתקדם (`scripts/quality/check-quality-ratchet.mjs`) קורא את `quality-baseline.json`
ומשווה אותו מול `quality-metrics.json` שנאסף זה עתה. כל מדד שנסוג
מעבר לאפסילון שלו מכשיל את הבנייה.

המדדים הנעקבים כעת:

| מדד                   | כיוון  | משמעות                        |
| --------------------- | ------ | ----------------------------- |
| `eslintWarnings`      | `down` | אסור שמספר אזהרות ESLint יגדל |
| `coverage.statements` | `up`   | אסור שכיסוי המשפטים יפחת      |
| `coverage.lines`      | `up`   | אסור שכיסוי השורות יפחת       |
| `coverage.functions`  | `up`   | אסור שכיסוי הפונקציות יפחת    |
| `coverage.branches`   | `up`   | אסור שכיסוי הענפים יפחת       |

כדי לעדכן את קו הבסיס לאחר שיפור אמיתי:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

הדגל `--update` כותב את הערכים הנוכחיים שנמדדו אל `quality-baseline.json`.
יש לבצע commit לקובץ זה לצד השינוי ששיפר את המדד. PR שמשפר
מדד בלי לעדכן את קו הבסיס ייתפס על ידי `--require-tighten` (שלב 6A.5,
בהמתנה למימוש).

### הקו המתקדם של CodeQL: תדירות הרענון והפעלה ידנית

`check:codeql-ratchet` קורא **את מצב המאגר, שמתעדכן לפי לוח זמנים — ולא עבור כל PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` מדווח
`state: configured`, `schedule: weekly`: זוהי סריקת ברירת המחדל של GitHub, ולא ניתוח בכל push.
כתוצאה מכך, לאחר מיזוג PR שמתקן התראות, הקו המתקדם ממשיך לקרוא
את הספירה הישנה והגבוהה יותר עד להפעלת הסריקה המתוזמנת הבאה — ולכן הוא מדווח על נסיגה
בכל PR פתוח, לרבות PR-המשך של ה-PR המתקן עצמו, עד שהסריקה משלימה את הפער.

**רענון ידני**: `gh workflow run codeql.yml --ref release/vX.Y.Z` מריץ מחדש את
הניתוח ומפרסם מחדש את ההתראות בתוך דקות. יש לקרוא תחילה את `.github/workflows/codeql.yml`
— הכותרת שלו מסבירה שהוא מיועד ל-`workflow_dispatch` בלבד **מפני שהוא מתנגש עם
"הגדרת ברירת המחדל" של GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). שחזור הטריגרים `push`/`pull_request`/
`schedule` מחייב תחילה **פעולה של הבעלים**: הגדרות → אבטחת קוד →
CodeQL: ברירת מחדל → מתקדם. אין להוסיף טריגר `schedule:` ללא המעבר הזה — הוא
רק ייצור הרצות כושלות.

**יש להדק את קו הבסיס לאחר שהספירה יורדת** — `node scripts/check/check-codeql-ratchet.mjs
--update` כותב את הספירה החדשה שנמדדה אל `quality-baseline.json` →
`metrics.codeqlAlerts.value`, כדי שהקו המתקדם לא יאפשר בשקט נסיגה חזרה
אל התקרה הישנה. דוגמה מעשית (2026-09-02/03): PR #12502 תיקן 7 התראות אמיתיות
(13 → 6 פתוחות לפי המדידה); PR #12530 הידק את קו הבסיס הקפוא מ-11 → 6 כדי שיתאים; לאחר מכן
6 ההתראות הנותרות נדחו, עם הנמקה לכל התראה, עד ל-0 פתוחות.

**דחיות נתונות להחלטת המפעיל (כלל קשיח #14)** — לעולם אין לדחות התראת CodeQL
מבלי לתעד את ההצדקה הטכנית בהערת הדחייה: `won't fix` עבור
דרישה של פרוטוקול חיצוני, `used in tests` עבור רכיב בדיקות, `false positive`
עבור מנגנון טיהור ש-CodeQL אינו יכול לזהות (תקדים: `docs/security/ERROR_SANITIZATION.md`).

---

## מדיניות ניסיונות חוזרים לבדיקות (WS5.4, v3.8.49)

הניסיון החוזר מוגדר לכל runner בנפרד, ולעולם אינו מדיניות גורפת כללית — מדיניות גורפת של ניסיונות חוזרים הופכת רגרסיות אמיתיות
לתקלות אקראיות בלתי נראות:

| Runner           | מדיניות                                                                                                        | מדוע                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` ב-CI בלבד, עם `trace: on-first-retry`                                                             | תזמון הדפדפן/הרשת הוא באמת לא דטרמיניסטי; ניסיון חוזר אחד עם trace הופך תקלה אקראית לארטיפקט שניתן לאבחן |
| Vitest           | ללא ניסיון חוזר גלובלי. בדיקה שהוכח כי היא אקראית מקבלת ניסיון חוזר מפורש ברמת הבדיקה (גלוי ב-diff ונבדק ב-PR) | משאיר את רשימת ההסגר ב-repo, ולעולם לא אטומה                                                             |
| node:test (unit) | ללא ניסיון חוזר, אף פעם                                                                                        | בדיקת יחידה אקראית היא באג בבדיקה — תקנו אותה, אל תטילו את הקוביות מחדש                                  |

יעדי ה-SLO לאחר שטלמטריית התקלות האקראיות תושק (WS5.2/5.3): שיעור תקלות אקראיות של <1% לכל בדיקה
(סף "לתקן עכשיו"), שיעור הצלחה של ≥95% לכל pipeline. ערכי ייחוס מהתעשייה —
יש לכייל מחדש לפי המדידות שלנו.

## סטיית Ratchet ברמת ה-Release (WS5.5, v3.8.49)

כאשר ratchet (גודל קובץ, מורכבות, אזהרות eslint) עובר רגרסיה בקצה ה-PURE של ה-release
— כלומר, ה-COMBINATION של המיזוגים גרם לרגרסיה, ואף PR יחיד אינו משחזר את
הרגרסיה בענף שלו — התיקון באחריות **אחראי ה-release, פעם אחת, בענף
ה-release**: יש להעדיף חילוץ/refactor; יש לקבוע baseline מחדש רק בצירוף רשומת
הצדקה מתועדת. לעולם אין להעביר סטיית שילוב ל-PR של תורם, ולעולם אין
לקבוע baseline מחדש לכל PR (הדבר מסתיר רגרסיות אמיתיות). תחילה יש להבחין בין המצבים: שחזרו את
המצב האדום מול הקצה הטהור ב-probe worktree לפני שתניחו שה-PR שלכם גרם לו.

## הפקדת הקטנות Ratchet — הכיוון כלפי מטה (#8584)

ה-ratchet אוטומטי רק למחצה, ודווקא המחצית הלא נכונה. **העלאת** תקרה היא
עריכת JSON ידנית שאורכת עשר שניות, והיא הדרך המהירה ביותר לשחרר PR אדום.
**הנמכת** תקרה דורשת שמישהו יריץ `--update` ויבצע commit לתוצאה — ועד
שה-job בשם `bank-ratchet-shrinks` הושק, אף workflow לא הריץ זאת. התוצאה שנמדדה
(2026-07-25): 18 קבצים מוקפאים כבר נמצאים בתקרת 800 השורות לקובץ חדש או מתחתיה, והמקרה הגרוע ביותר
הוא פי 132 (`src/shared/validation/schemas.ts`, עם 19 שורות ותקרה של 2,523); תקרת
המורכבות עלתה מ-`1794 → 2169` לאורך כ-37 הערות rebaseline, עם ירידה אחת בדיוק
(−1); וההנחיה "להדק באמצעות `--update` במחזור הבא" נכתבה 31 פעמים וקוימה
פעם אחת. תקרה שממשיכה להתקיים לאחר הקוד שבגינו נוצרה ממירה בשקט כל
פירוק שהושלם למכסת צמיחה עבור מי שיערוך את הקובץ בהמשך.

`nightly-release-green.yml` → ה-job בשם **`bank-ratchet-shrinks`** סוגר את המעגל:

|        |                                                                                                        |
| ------ | ------------------------------------------------------------------------------------------------------ |
| רץ בעת | `schedule` (3 פעמים ביום) + `workflow_dispatch` — בכוונה **לא** בעת `push`                             |
| מודד   | את `release/vX.Y.Z` הגבוה ביותר, עם אותה רזולוציה ואותו injection guard כמו `release-green`            |
| כותב   | `check:file-size --update` ו-`check:complexity-ratchets --update` (שניהם מאפשרים רק הקטנה מעצם הגדרתם) |
| מאמת   | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                               |
| מספק   | PR יחיד ועדכני תמיד מול ענף ה-release — מתעדכן בכפייה ולעולם אינו יוצר ספאם                            |

ההפקדה מתבצעת באצווה ולא בכל push, משום שאין לה דרישת השהיה (הפקדת הקטנה
בתוך 8 שעות היא מספקת), בעוד שהרצה בכל merge הייתה בונה מחדש את ענף ה-PR שוב ושוב
במהלך מסעות מיזוג ומשלמת בכל פעם את העלות של מעבר ESLint מלא. הזיהוי נשאר בעת
push (`release-green`); רק ההפקדה מתבצעת באצווה.

### מאמת הבטיחות

ה-job כותב ל-baselines ללא השגחה, ולכן `verify-ratchet-bank.mjs` הוא שהופך
זאת לקביל. הוא משווה את עץ הקבצים לאחר `--update` מול `HEAD` ו**מבטל את ה-job
לפני שקיים commit כלשהו** — מבלי לפתוח PR — אלא אם כל שינוי הוא אחד מאלה:

- ערך מספרי של `frozen` / `testFrozen` ש**הונמך** או **הוסר**
- `complexity-baseline.json` → `count` ש**הונמך**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` ש**הונמך**

כל דבר אחר נכשל: העלאת מספר, הוספת רשומה, שינוי `cap`/`testCap`, או
מחיקה/שכתוב של הערת `_rebaseline_*` (הערות אלה הן נתיב הביקורת המסביר מדוע כל
תקרה קיימת, והן נשמרות בתוך אותו אובייקט `frozen` שבו נמצאות רשומות הקבצים).
bot שיכול להעלות תקרה יהיה גרוע משמעותית מהמצב הקיים. הגנת רגרסיה:
`tests/unit/verify-ratchet-bank.test.ts`.

ה-job לעולם אינו מבצע push אל `release/*` — אדם ממזג את ה-PR, כך שמדידה שגויה
אינה יכולה להיכנס ללא בדיקה.

## מדיניות רשימת היתרים

כל שער שאינו יכול להיכשל עקב הפרות קיימות מראש משתמש ברשימת היתרים קפואה
(למשל, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). המדיניות היא:

**תקנו את שורש הבעיה; השתמשו ברשימת ההיתרים רק כאשר ההפרה קיימת מראש ולא
ניתן לתקנה באותו PR.**

בעת הוספת רשומה לרשימת היתרים:

1. כללו הערה עם ההצדקה.
2. הפנו לסוגיית המעקב (למשל, `// #3498 — תכונה של שלב 2, טרם מומשה`).
3. הסירו את הרשומה באותו PR שמתקן את ההפרה — רשומה מיושנת שכבר אינה
   מדכאת הפרה פעילה היא כשלעצמה פגם (אכיפת הרשומות המיושנות של 6A.3
   תכשיל את השער בגלל רשומה יתומה ברשימת ההיתרים לאחר שתמומש).

**אל** תוסיפו רשומות לרשימת ההיתרים כדי לגרום לבדיקות לעבור מהר יותר. שער ירוק לצד רשימת
היתרים שהולכת וגדלה יוצר תחושת איכות כוזבת.

### כאשר שער נכשל ב-PR שלכם

1. **קראו בעיון את פלט השער** — הוא מציין בדיוק איזה קובץ או סמל הפר
   את הכלל.
2. **תקנו את ההפרה** — רוב השערים הם בדיקות דטרמיניסטיות של מערכת הקבצים, שעוברות ברגע
   שהקוד תקין.
3. **אם ההפרה קיימת מראש** (כלומר, לא אתם יצרתם אותה, אך השער מכסה
   אותה כעת): הוסיפו רשומה לרשימת ההיתרים עם הערת הצדקה וסוגיית מעקב.
4. **אם השער הוא מחגר** (כיסוי, אזהרות ESLint, כפילות, מורכבות):
   השינוי שלכם הרע את המדד. תקנו את הבעיה הבסיסית, או (לעיתים נדירות) הריצו
   `npm run quality:ratchet -- --update` אם השינוי מכוון והפגיעה במדד
   מקובלת — אך תעדו את הסיבה בתיאור ה-PR.
5. **שערי ייעוץ** (`continue-on-error: true`) מיועדים למידע — הם אינם חוסמים
   מיזוג, אך מופיעים בסיכום ה-CI. תקנו אותם בכל זאת.

---

## הוספת שער חדש

1. צרו את `scripts/check/check-<name>.mjs` (או `.ts`). שערי מדיניות מסתיימים בקוד 0/1.
   שערים בסגנון מחגר פולטים מדד אל `quality-metrics.json` באמצעות `collect-metrics.mjs`.
2. הוסיפו את `"check:<name>": "node scripts/check/check-<name>.mjs"` אל `package.json`.
3. חברו אותו ב-`.github/workflows/ci.yml` תחת המשימה המתאימה
   (מדיניות → `lint` או `docs-sync-strict`; מחגר → `quality-gate`).
4. אם יש לו רשימת היתרים, החילו את `reportStaleEntries()` מתוך
   `scripts/check/lib/allowlist.mjs` כדי שרשומות מיושנות יזוהו אוטומטית.
5. כתבו בדיקה ב-`tests/unit/build/` המכסה את לוגיקת הזיהוי של השער.
6. עדכנו מסמך זה (הוסיפו שורה לטבלת המשימות הרלוונטית).

---

## כלי סוכנים: LSP בתוך הלולאה (הצטרפות לפי בחירה)

מעבר לשערי ה-CI, ‏OmniRoute מספקת תשתית `agent-lsp` **אופציונלית**
(`.mcp.json` ברמת הפרויקט, שלב 7 משימה 15). צרו את `.mcp.json`
כדי לחשוף שרת שפה של TypeScript לסוכני קידוד, כך שהם יפתרו סמלים /
אבחונים **לפני** כתיבת קוד — רכיב משלים ל-`typecheck:core`, בגישת הידור לפני הצהרה,
המצמצם שגיאות של "סמלים מומצאים" במקור. בכוונה הוא אינו נטען
אוטומטית (אתם בוחרים ומאמתים את גשר ה-MCP↔LSP); רשומה פגומה רק מתעדת
שגיאת חיבור ולעולם אינה משבשת הפעלות.

---

## צבר משימות לרציונליזציה (סקירת ROI — שלב 9 גל 3)

מצאי זה הותאם מול `ci.yml` ב-2026-06-17 (הגרסה הקודמת השמיטה את
`audit:deps`,‏ `check:tracked-artifacts`,‏ `check:lockfile`,‏ `check:licenses`,
`check:dead-code`,‏ `check:cognitive-complexity`,‏ `check:type-coverage`,
`check:codeql-ratchet`,‏ `check:pr-evidence`). סקירת ROI של הקבוצה המותאמת
זיהתה את המועמדים הבאים לרציונליזציה. **המיזוגים הם שינויי CI מכניים;
השינויים/ההסרות הם החלטות מדיניות השמורות למפעיל.** דבר מהמפורט להלן
טרם יושם.

**גם אלה אינם מתועדים לעיל** (מייעצים, אות חלש): משימת `docs-lint`
(markdownlint + Vale, כאשר `continue-on-error` חל על המשימה כולה) ותהליכי העבודה העצמאיים של הסורקים
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. הערך `semgrepFindings: 0` נמצא
ב-`quality-baseline.json`, אך אינו מחובר למנגנון מחגר חוסם ב-`ci.yml` — המדד
יתום כרגע.

### מיזוג / הסרת כפילויות (מכני, סיכון נמוך יותר)

כל מועמד אומת מול מצב שערי הבקרה הפעיל ב-2026-06-17 (לתת אמון אך לאמת);
כמה מיזוגים "ברורים מאליהם" התגלו כמסתירים חוב, ולכן **אינם** תחליפים ישירים ונקיים.

- **`check:docs-sync` מופעל פעמיים** — באופן עצמאי במשימת `lint` ושוב בתוך `check:docs-all` (`docs-sync-strict`) וב-hook של husky לפני commit. ✅ **בוצע** — ההפעלה העצמאית ב-`lint` הוסרה.
- **סריקת CVE** — ❌ **אינה מיזוג נקי.** `audit:deps` נכשל באופן קשיח בכל CVE ברמת high/critical;‏ `check:vuln-ratchet` (osv) נכשל רק במקרה של _נסיגה_ ביחס לקו הבסיס (כרגע 1 MODERATE). הסמנטיקה שונה — הסרת `audit:deps` תבטל את השער המוחלט לרמות high/critical. יש להשאיר את שניהם.
- **זיהוי מחזורים** — ✅ **בוצע** (#15159 G-01/G-02). הנוסח הישן כאן כינה את `check:cycles` שער "ירוק ואצור", והצדיק את השארתו כחוסם משום ש-`check:circular-deps` (dpdm) דיווח על 91 מחזורים. המצב הירוק הזה היה **ירוק כוזב**: `check:cycles` סרק 5 תתי-ספריות (450 קבצים), התאים רק ל-`import|export … from` סטטיים, והשמיט כל specifier מסוג `@/` ו-`@omniroute/open-sse/`, כך שלא היה יכול לזהות את מחזורי הייבוא הדינמי וה-alias ששלטו במאגר. תוקן: השער עובר כעת על `src` + `open-sse` (5023 קבצים), אוסף specifiers מתוך ה-AST של TypeScript (כך ש-`import("…")` נספר, אך `typeof import("…")` במיקום של טיפוס אינו נספר), ופותר את `paths` של tsconfig. הוא מוצא **14** מחזורים, ולא 0. מכיוון שלא ניתן לתקן 14 מחזורים קיימים מראש במסגרת PR של שער בקרה, `check:cycles` הוא כעת **מחגר** (`--ratchet`, תקרה `metrics.cycles.value = 14` בתוך `quality-baseline.json`,‏ `direction: down`) — הוא חוסם כל _נסיגה_, והספירה יכולה רק לרדת. CI מפעיל את `npm run check:cycles:ratchet`. צמצום החוב מתבצע במסגרת **A-01**. `check:circular-deps` (dpdm) נשאר מייעץ כחוות דעת שנייה רחבה יותר.
- **מורכבות** — ✅ **בוצע** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): מעבר ESLint יחיד, עם ספירה לפי ruleId כדי שקווי הבסיס של cyclomatic+max-lines ושל cognitive יישארו בלתי תלויים; `check:complexity` / `check:cognitive-complexity` הנפרדים נשארים לצורך `--update` מקומי.
- **מניעת הזיות עבור `/api`** — ✅ **בוצע** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): מצאי FS יחיד של `src/app/api`;‏ openapi-routes ו-docs-symbols עדיין מדווחים בנפרד; הבדיקות הנפרדות נשארות לצורך הרצות מקומיות.
- **`check:node-runtime` מופעל ב-11 משימות** — ⚠️ **ROI נמוך.** כל אחת מהן משתמשת ב-runner נפרד והבדיקה אורכת פחות משנייה; החיסכון הכולל הוא כ-10 שניות, במחיר אובדן אמצעי הגנה זול לכל משימה. לא שווה את הטלטלה.
- **`typecheck:noimplicit:core` ב-lint של CI** — ✅ **הוסר ממשימת lint** (היה מייעץ עם `continue-on-error`); משטח הטיפוסים החוסם הוא `typecheck:core` + `check:type-coverage`. הסקריפט המקומי נשמר.

### שינוי / החלטה (מדיניות המפעיל)

- `check:openapi-security-tiers` (מייעץ) — ❌ **לא ניתן להפוך אותו לחוסם באופן נקי.** הוא מסיים עם קוד 0, אך מזהיר שכמה נתיבי `traffic-inspector` תחת `LOCAL_ONLY_API_PREFIXES` חסרים את ההערה `x-loopback-only: true`. אכיפתו מחייבת להוסיף תחילה את ההערות האלה ל-`openapi.yaml`.
- `typecheck:noimplicit:core` (מייעץ) — נכלל ברובו במחגר החוסם `check:type-coverage`. יש להפוך אותו למחגר או להסיר את מעבר ה-`tsc` השני והמיותר.
- `test:vitest:ui` (כעת **חוסם**) — כשלים קיימים מראש מוחרגים במפורש ב-`vitest.config.ts` באמצעות הערות מעקב `// #8618`; כשלים חדשים מכשילים את המשימה.
- `check:secrets` (gitleaks, מחגר חוסם המקובע על 3 זיהויים חיוביים כוזבים מתועדים) — יש להוסיף את השלושה לרשימת ההיתרים כדי להגיע ל-0, או להורידו למעמד מייעץ. קיימת חפיפה עם סריקת הסודות המובנית של GitHub ועם `check:public-creds`.
- `check:pr-evidence` (חוסם, מבצע grep על הטקסט החופשי בגוף ה-PR) — סיכון גבוה לזיהויים חיוביים כוזבים; הסרתו תחליש את האכיפה של כלל קשיח מס' 18, ולכן זו החלטת מדיניות אמיתית.
- `semgrep` (עצמאי ומייעץ) — חופף ל-CodeQL במשפחות OWASP; יש לחבר את קו הבסיס שלו למחגר או להסירו.

---

## תיעוד קשור

- שרשרת אספקה (מקור, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — שער שוויון בין קבוצות מפתחות

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, משימה `i18n-ui-coverage`).
משווה את קבוצת מפתחות העלה של כל `src/i18n/messages/<locale>.json` לזו של `en.json` ונכשל
אם חסר מפתח עלה כלשהו או קיים מפתח עודף, ללא תלות במועד שבו המפתח נוסף. מצייני המיקום
`__MISSING__:` נחשבים קיימים (התוכן שלהם הוא עניינו של שער היחס). זהו המשלים המוחלט
של שני השערים מבוססי ההבדלים/האחוזים: `check-ui-keys-coverage` אוכף סף מינימום של 80 % לכל
שפה (גם כשחסרים 43 מפתחות מתוך כ־13,000, עדיין מתקבלת קריאה של 99.7 %), ו־`check-new-key-coverage` בוחן
רק את המפתחות ש־PR מוסיף ל־`en.json`. אצוות שפות נוצרת מ־`en.json` כפי שהיה ביום
שבו נוצר הענף שלה, וממשיכה בתרגום במשך ימים בזמן שבענף הבסיס ממשיכים להוסיף מפתחות; ה־PR של האצווה אינו מוסיף
אף מפתח בעצמו, ולכן שני השערים המקבילים נותרו שקטים כאשר אצווה 1 (#13044) מוזגה עם חוסר של 43 מפתחות בתשע
שפות, ואצווה 2 (#13660) עם חוסר של 10 מפתחות בשמונה שפות (2026-09-15). כדי לתקן כשל, הפעילו
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; מפתח עלה המסומן `extra`
מציין שהמקור הסיר אותו — יש למחוק אותו מהשפה. `--warn` מדווח בלי להיכשל.
`--catalog=cli` מפעיל את אותה השוואה על `bin/cli/locales` (`npm run i18n:check-keys:cli`);
שני השלבים נמצאים במשימה `i18n-ui-coverage`.

#### `check-new-key-coverage` — שער i18n למפתחות חדשים

שער מקביל ל־`check-ui-value-drift`. האחרון מזהה ערך באנגלית ש**נכתב מחדש**
בעוד שתרגומיו נותרו ללא שינוי; שער זה מזהה מפתח באנגלית ש**נוסף**
בעוד שחלק מהשפות מעולם לא קיבלו אותו.

`check-ui-keys-coverage` אינו יכול לזהות מקרה מסוג זה: הוא אוכף סף אחוזי לכל שפה, וכאשר
חסרים אחד־עשר מפתחות מתוך כ־13,000, הכיסוי נשאר 99.9%. אחוז לכל שפה אינו יכול
לבטא את העובדה ש"התכונה הזו שוחררה ללא תרגום" — תכונה שלמה יכולה להתווסף לשפה חדשה ללא
טקסט ולא לשנות את הנתון כלל.

התקרית שהוא מקודד: שלב 3 של Orchestration Canvas תרגם את אחד־עשר המפתחות שלו בכל
42 השפות שהיו קיימות באותו זמן. שעות לאחר מכן, אצוות שפות האיחוד האירופי (#13044) הגדילה את המאגר
ל־51 שפות, ותשע השפות החדשות (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) מעולם לא
קיבלו אותם. `deepMergeFallback` מחליף מפתח חסר באנגלית, ולכן מצב הכשל היה
ממשק משתמש לא מתורגם ולא ממשק משתמש ריק — כשל אמיתי, ושקט מעצם התכנון.

בדומה לשער המקביל שלו, הוא **מודע להבדלים**, ומשווה את האנגלית בבסיס המיזוג לעץ העבודה,
כך שפערים קיימים נשארים מוקפאים ולא נדרשה הסבה כדי להפעיל את השער.

**מציין `__MISSING__:<english>` אינו עומד בדרישה (מאז 2026-09-17).** בעבר זו הייתה
דרך הדחייה המתועדת — בזמן ריצה המערכת חוזרת לאנגלית תקינה — עד ששמונה יחידות PR של תכונות
ב־2026-09-16 הוסיפו 61 מפתחות והטביעו את המציין בכל 65 השפות במקום לתרגם: שער זה
אישר את כולן, דבר לא חסם את יחידות ה־PR, ולאחר מכן שער היחס החוסם לתרגומים אמיתיים
נכשל בקצה ענף השחרור עבור כולם (pt-BR 3.2 % > 2.5 % + 0.5). מציין נחשב כעת
לתרגום חסר. כדי לתקן כשל, הפעילו
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, או
את כל השפות במקביל באמצעות `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
בטוח להפעלה מנותקת, ומסרב להתחיל ללא משתני הסביבה `OMNIROUTE_TRANSLATION_*`). מפתח שחייב להישאר
באנגלית (שם מקובע של מוצר/מנוע/דגל) צריך להופיע ב־`scripts/i18n/untranslatable-keys.json`,
ולעולם לא מאחורי מציין. `vi` אוסר מציינים לחלוטין (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — שער בדיקות שהושבתו

קובץ ברשימת `exclude` של `vitest.config.ts` הוא בדיקה שאינה רצה, והוא נראה כמו
כיסוי בדיקות למי שקורא את העץ. שישים ושניים קבצים הצטברו מאחורי ההערה
`// #8618 — pre-existing failure; remove this exclusion when fixed`. תקלה #8618 נסגרה
ב־2026-08-11 בזמן שהרשימה שאחריה עקבה גדלה מ־45 רשומות ל־62, כאשר כל רשומה חדשה ירשה הערה
שהפנתה לתקלה סגורה. כאשר הרשימה נמדדה לבסוף קובץ אחר קובץ (#13204), **51 מתוך 62
עברו מול העץ הנוכחי ללא כל שינוי בקוד המקור**.

השער דורש שכל החרגה שנפתרת לקובץ אמיתי (א) תציין תקלה למעקב וכן
(ב) תופיע ב־`config/quality/vitest-exclusions.json` עם הסטטוס שנמדד עבורה, כך שהוספת החרגה היא
הבדל שניתן לסקירה בקובץ ייעודי, במקום שורה נוספת במערך בן 60 רשומות. בכוונה
הוא אינו מריץ מחדש את הבדיקות שהוחרגו — הדבר אורך כ־10 דקות ושייך למשימה תקופתית;
המצאי מתעד מתי כל אחת מהן נמדדה לאחרונה.
