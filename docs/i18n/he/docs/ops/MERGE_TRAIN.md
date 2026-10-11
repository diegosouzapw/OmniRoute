# Merge Queue & Manual Merge-Train Runbook (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

מאז v3.8.49‏ (WS3.2/WS3.4 בתוכנית האיכות/מהירות), נתיב המיזוג המוגדר כברירת מחדל עבור
PRs שנבדקו אל `release/vX.Y.Z` הוא **תור המיזוג של Mergify** (`.mergify.yml`);
**רכבת המיזוג הידנית** המתועדת להלן היא נתיב הגיבוי — לשימוש במהלך תקריות,
הקפאות שחרור, או אם תוכנית הקוד הפתוח של Mergify תשתנה אי פעם.

## נתיב ברירת המחדל: התור של Mergify

1. ה-PR נבדק/מקבל אישור ירוק על ידי הקמפיינים ומאושר על ידי שער ⭐ טרום-המיזוג
   של הבעלים (הדוח + החלטה לכל פריט — ראו `/merge-prs` שלב 0.75).
2. הבעלים (או הסשן הפועל על סמך החלטת הבעלים) מחיל את התווית **`queue`**.
   התווית היא אישור המיזוג; Mergify רק מבצע אותו.
3. Mergify מאמת PR-ים שבתור **באופן טורי** (אחד בכל פעם) מול השערים המהירים
   וממזג (squash). עיבוד באצוות + חצייה אוטומטית זמינים ברובד בתשלום של Mergify
   ("לא ניתן להשתמש באצווה של תור המיזוג" בתוכנית החינמית, #7220), ולכן `.mergify.yml` אינו מגדיר
   `batch_size`; עיבוד באצוות נשאר באחריות רכבת המיזוג הידנית שלהלן. PR שהבדיקות
   שלו עדיין ממתינות לאחר `checks_timeout` (240 דקות = פי 2 מערך p95 שנמדד עבור
   `quality.yml`) מוצא מהתור במקום לעכב אותו.
4. לאחר המיזוג, תהליך העבודה הרציף release-green מאמת את הקצה החדש בעת push
   ופותח סוגיית שיוך אם השילוב גרם לרגרסיה (לעולם אינו מבצע revert אוטומטי).

אמצעי הגנה (משקפים את הכללים הקשיחים #21/#22 ב-`CLAUDE.md`):

- **הקפאת גרסה פעילה** → אין להחיל תוויות על PR-ים המכוונים לענף המוקפא; יש לשנות תחילה
  את היעד ל-`release/vX+1` הפעיל.
- **PR בתהליך של סשן אחר** → לעולם אין להחיל עליו תווית; רק הסשן שהוא הבעלים שלו מכניס
  את העבודה שלו לתור.
- הבדלים הכוללים בדיקות בלבד ו-PR-ים בעלי התווית `hotfix` כבר מריצים CI מצומצם (ראו
  `RELEASE_CHECKLIST.md` → המסלול המהיר לתיקונים חמים); תנאי התור מקבלים כל
  מערך בדיקות שרץ בפועל (`#check-failure=0` + `#check-pending=0`).

## נתיב גיבוי: רכבת המיזוג הידנית

משמשת כאשר התור אינו זמין. תהליך זה מעגן את הנוהל שבאמצעותו טופלו 33 PRs
ביום אחד במהלך מחזור v3.8.47:

1. **הרכיבו את האצווה** (כ-10–30 PRs שנבדקו ואושרו). בדקו התנגשויות `linked:`
   (אותם `tap.testFiles`, אותם מקטעים ב-CHANGELOG) וטפלו בהם באופן סדרתי.
2. **אמתו פעם אחת בלבד**: ב-worktree מבודד המבוסס על קצה ענף השחרור, מזגו מקומית את כל ראשי
   האצווה, ולאחר מכן הריצו את חבילת הבדיקות המקבילה לזו של השחרור
   (`npm run check:release-green`; הוסיפו `--with-build` לפני שחרור).
   `scripts/release/merge-train.sh <base> <PR#>…` הופך את שלבים 1–2 לאוטומטיים (PRs מתנגשים
   נפלטים, והרכבת ממשיכה). המצב המלא מריץ את `npm run test:unit` — תוכנת ההרצה
   המותאמת למכונה (`--test-concurrency=20`), **ולא** את שני מקטעי ה-CI הסדרתיים בעלי 4 הליבות,
   שגרמו לשלב הדומיננטי לנצל כ-25% ממכונה בעלת 16 ליבות (תוקן
   ב-2026-07-18). האפשרות `--fast` (לריקון רכבות ענק תוך-יומיות, באישור הבעלים מ-2026-07-18)
   שומרת על כל השערים הסטטיים + vitest, אך מריצה רק את קובצי node:test ששונו על ידי
   ה-PRs שעלו לרכבת; עדיין חובה להריץ את החבילה המלאה לפחות פעם ביום על
   הקצה המצטבר (רכבת אחת ללא `--fast`).
3. **ירוק** → מזגו את ה-PRs לפי הסדר (תוך בדיקה מחדש של `state,headRefOid` לפני כל אחד —
   PR שה-head שלו השתנה חוזר לבדיקה). הוכיחו שה-diff נטו של כל מיזוג הוא
   השינוי של ה-PR עצמו (אין ביטולי שינויים עקב פתרון אוטומטי: בדקו את `git diff --stat` לאיתור
   מחיקות מחוץ לתחום).
4. **אדום** → חצו את האצווה לשניים (אמתו כל מחצית) במקום לבצע אימות חוזר
   אחד-אחד; החזירו את ה-PR הבעייתי לתור הבדיקה בצירוף הראיות.
5. **לעולם לא**: למזג לענף המוקפא במהלך הקפאה; להשתמש ב-`git stash` במקום כלשהו;
   להריץ מחדש את כל ה-CI בתקווה שהאדום ייעלם (הכלל: אדום הוא מידע).

## חלוקה לרמות (מדוע התור בטוח עם שערים מהירים בלבד)

- **לכל PR** (השערים המהירים של quality.yml): בדיקות שהושפעו לפי TIA + בדיקות יחידה מלאות ב-4 מקטעים +
  vitest + קבוצת lint + בדיקת טיפוסים + תקינות התיעוד/יומן השינויים.
- **לכל אצווה/קצה** (release-green רציף): שערי `--quick` קשיחים בכל push אל
  ענף השחרור; סריקות מלאות עם `--with-build --full-ci` שלוש פעמים ביום.
- **לכל שחרור** (ci.yml ב-PR של השחרור): המטריצה המלאה, כולל E2E ×9,
  חבילת ארטיפקטים + בדיקת smoke לאתחול מ-tarball, כיסוי/ספי ratchet.

דבר אינו עובר פחות אימות מבעבר — המעטפת הכבדה פשוט רצה לכל אצווה/קצה
במקום לכל PR, וזה מה שמסיר את סבבי הלוך-ושוב מסדר O(N).

## דרישות מוקדמות ל-`merge-train.sh` לאחר checkout חדש

הסקריפט מריץ **בדיקה מקדימה** מסוג fail-fast על ה-checkout הראשי (לפני כל עבודה
ב-worktree), כך שהתקנה פגומה לעולם לא תוכל להיראות בטעות כרכבת אדומה:

1. `npm ci`, ולאחר מכן יש להריץ את ה-postinstall של `bun` שנחסם על ידי npm:
   `(cd node_modules/bun && node install.js)` — אחרת `check:provider-consistency`
   ו-`check:known-symbols` (שניהם `bun scripts/…`) נכשלים ברכבת וגם בבסיס,
   ללא שורה המציינת הפרה.
2. אין להשאיר `node_modules/node_modules` סורר (עץ תלויות כפול; React נטען פעמיים
   וחבילות ה-vitest של ממשק המשתמש נכשלות מיד).
3. `node_modules/.bin/tsc` קיים וניתן להפעלה (בהתקנה חלקית הוא חסר).

הרכבת מריצה את `npm run check:cycles:ratchet` החוסם; `npm run check:cycles`
ללא תוספות הוא לייעוץ בלבד (הוא מציג את ה-SCCs ויוצא עם קוד שאינו אפס גם כשהבסיס תקין).
