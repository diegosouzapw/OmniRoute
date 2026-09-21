# Merge Queue & Manual Merge-Train Runbook (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

מאז v3.8.49‏ (WS3.2/WS3.4 בתוכנית האיכות/מהירות), נתיב המיזוג המוגדר כברירת מחדל עבור
PRs שנבדקו אל `release/vX.Y.Z` הוא **תור המיזוג של Mergify** (`.mergify.yml`);
**רכבת המיזוג הידנית** המתועדת להלן היא נתיב הגיבוי — ומשמשת במהלך תקריות,
הקפאות גרסה, או אם תוכנית הקוד הפתוח של Mergify תשתנה אי פעם.

## נתיב ברירת המחדל: התור של Mergify

1. ה-PR נבדק/קיבל אור ירוק מהקמפיינים ואושר בשער ⭐ טרום-המיזוג של הבעלים
   (הדוח + החלטה לכל פריט — ראו `/merge-prs` שלב 0.75).
2. הבעלים (או הסשן הפועל על סמך החלטת הבעלים) מחיל את התווית **`queue`**.
   התווית היא אישור המיזוג; Mergify רק מבצע אותו.
3. Mergify מאגד עד 10 PRs שבתור, מאמת את האצווה מול השערים המהירים,
   וממזג (squash). אצווה אדומה **נחצית אוטומטית** — ה-PR הבעייתי
   מבודד בתוך כ-‎log2(N)‎ אימותים חוזרים ומוסר מהתור; השאר ממשיכים.
4. לאחר המיזוג, תהליך העבודה הרציף לשמירת הגרסה בירוק מאמת את הקצה החדש בעת push
   ופותח issue לייחוס אם השילוב יצר נסיגה (לעולם אין revert אוטומטי).

מעקות בטיחות (מקבילים לכללים הנוקשים #21/#22 ב-`CLAUDE.md`):

- **הקפאת גרסה פתוחה** → אין להחיל תוויות על PRs המכוונים לענף המוקפא; תחילה יש לשנות
  את היעד ל-`release/vX+1` הפעיל.
- **PR בתהליך של סשן אחר** → לעולם אין להחיל עליו תווית; רק הסשן שבבעלותו מכניס
  את עבודתו שלו לתור.
- שינויים של בדיקות בלבד ו-PRs בעלי התווית `hotfix` כבר מריצים CI מצומצם (ראו
  `RELEASE_CHECKLIST.md` ← המסלול המהיר לתיקונים חמים); תנאי התור מקבלים כל
  קבוצת בדיקות שהורצה בפועל (`#check-failure=0` + `#check-pending=0`).

## נתיב גיבוי: רכבת המיזוג הידנית

משמש כאשר התור אינו זמין. תהליך זה מעגן את השיטה שבאמצעותה פונו 33 PRs ביום
אחד במהלך מחזור v3.8.47:

1. **הרכיבו את האצווה** (כ-10–30 PRs שנבדקו ואושרו). בדקו התנגשויות `linked:`
   (אותם `tap.testFiles`, אותם מקטעים ב-CHANGELOG) וסדרו אותם בטור.
2. **אמתו פעם אחת**: בתוך worktree מבודד המבוסס על קצה ענף הגרסה, מזגו מקומית את כל ראשי
   האצווה, ולאחר מכן הריצו את החבילה המקבילה לזו של הגרסה
   (`npm run check:release-green`; הוסיפו `--with-build` לפני גרסה).
   `scripts/release/merge-train.sh <base> <PR#>…` הופך את שלבים 1–2 לאוטומטיים (PRs
   מתנגשים נפלטים והרכבת ממשיכה). מצב מלא מריץ `npm run test:unit` — מריץ
   המותאם למכונה (`--test-concurrency=20`), **ולא** שני מקטעי ה-CI הרציפים בעלי 4 הליבות,
   שגרמו לשלב הדומיננטי לנצל כ-25% ממכונה בעלת 16 ליבות (תוקן
   ב-2026-07-18). ‏`--fast` (ריקון רכבות ענק במהלך היום, באישור הבעלים מ-2026-07-18)
   משאיר כל שער סטטי + vitest, אך מריץ רק את קובצי node:test ששונו על ידי
   ה-PRs שעלו לרכבת; עדיין חובה להריץ את החבילה המלאה לפחות פעם ביום על
   הקצה המצטבר (רכבת אחת ללא `--fast`).
3. **ירוק** → מזגו את ה-PRs לפי הסדר (תוך בדיקה חוזרת של `state,headRefOid` לפני כל אחד —
   PR שהראש שלו השתנה חוזר לביקורת). הוכיחו שהשינוי נטו של כל מיזוג הוא
   השינוי של ה-PR עצמו (אין לבצע revert באמצעות פתרון אוטומטי: בדקו את `git diff --stat`
   לאיתור מחיקות מחוץ לתחום).
4. **אדום** → חצו את האצווה לחצאים (אמתו כל מחצית) במקום לבצע אימות חוזר
   אחד-אחד; החזירו את ה-PR הבעייתי לתור הביקורת בצירוף הראיות.
5. **לעולם לא**: למזג אל הענף המוקפא במהלך הקפאה; להשתמש ב-`git stash` במקום כלשהו;
   להריץ מחדש את כל ה-CI בתקווה שאדום ייעלם (הכלל: אדום הוא מידע).

## חלוקה לרמות (מדוע התור בטוח עם שערים מהירים בלבד)

- **לכל PR** (השערים המהירים של quality.yml): בדיקות שהושפעו לפי TIA + יחידות מלאות ב-4 מקטעים +
  vitest + אוסף בדיקות lint + בדיקת טיפוסים + תקינות התיעוד/יומן השינויים.
- **לכל אצווה/קצה** (שמירה רציפה על הגרסה בירוק): שערים נוקשים של `--quick` בכל push אל
  ענף הגרסה; סריקות מלאות עם `--with-build --full-ci` שלוש פעמים ביום.
- **לכל גרסה** (ci.yml ב-PR של הגרסה): המטריצה המלאה, כולל E2E ×9,
  תוצר חבילה + בדיקת אתחול בסיסית של tarball, כיסוי/ספי התקדמות.

שום דבר אינו עובר פחות אימות מבעבר — המעטפת הכבדה פשוט רצה לכל אצווה/קצה
במקום לכל PR, וזה מה שמסיר את סבבי ההלוך-ושוב בסיבוכיות O(N).
