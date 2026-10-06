# CLAUDE.md (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**כל כללי הפרויקט נמצאים ב-[`AGENTS.md`](AGENTS.md)** — מקור האמת היחיד עבור כל מסייעי ה-AI
(ארכיטקטורה, מוסכמות, בדיקות, שערי איכות, תהליך העבודה עם git, 23 הכללים הקשיחים,
תובנות בנושא PII). יש לקרוא אותו במלואו; אין להוסיף כאן מחדש את כללי הפרויקט. כל מה שמופיע להלן חל אך ורק
על Claude Code — התאמות תפעוליות לכללים שכבר הוגדרו ב-`AGENTS.md`.

## בידוד worktree — פרטים ייחודיים ל-Claude Code

פרוטוקול ה-worktree המחייב המלא (אישור ענף הבסיס, הנתיב הקנוני `.claude/worktrees/`,
`cp -al` עבור node_modules, כללי פירוק) נמצא ב-`AGENTS.md` ← Git Workflow ← "Worktree
isolation". נקודות ייחודיות ל-Claude Code:

- יש לאשר את ענף הבסיס מול המפעיל באמצעות `AskUserQuestion` (כלל קשיח #19), אלא אם הוא
  כבר מסר לך אותו.
- יש להעדיף את הכלי המובנה `EnterWorktree` — הוא כבר יוצר worktrees תחת
  `.claude/worktrees/` (הנתיב הקנוני). יש ליצור את ה-worktree באמצעות פקודת `git
worktree add` המתועדת, ולאחר מכן לקרוא ל-`EnterWorktree` עם ה-`path` שלו.

## בטיחות בין סשנים — פרטים ייחודיים ל-Claude Code

הכללים הקשיחים #19/#21/#22 (ב-`AGENTS.md`) מסדירים סשנים מקבילים. תזכורות תפעוליות עבור סביבת
הרצה זו:

- **יש לשכפל מילה במילה את האיסור על `git stash` בפרומפט של כל תת-סוכן שנוגע ב-git**
  (הכלי Agent / סקריפטים של Workflow) — תת-סוכנים אינם יורשים קובץ זה, וההישנות המתועדת
  של תקרית ה-stash התרחשה באמצעות תת-סוכן.
- לפני מיזוג או דחיפה אל PR כלשהו שלא יצרת _בסשן הנוכחי_, יש להריץ `git worktree list`
  ולבדוק מחדש את `gh pr view <N> --json state,headRefOid` (כלל קשיח #22b).
- יש לסיים כל סשן כאשר ה-checkout הראשי נמצא בענף שבו התחיל.

## Superpowers / תוצרי תכנון — דריסות נתיבים

המוסכמה `_tasks/` מוגדרת ב-`AGENTS.md` ← "Planning & Research Artifacts". מיומנויות
superpowers מגיעות עם ברירות מחדל המצביעות אל `docs/…` — ברירות מחדל אלה **נדרסות
כאן**. כאשר מיומנות superpowers מצהירה על נתיב כגון "נשמר ב-`docs/superpowers/plans/…`",
יש לשכתב אותו לנתיב המקביל תחת `_tasks/…` לפני הכתיבה:

| תוצר (מיומנות)                   | ברירת מחדל (אין להשתמש)   | יש לשמור כאן במקום זאת                                        |
| -------------------------------- | ------------------------- | ------------------------------------------------------------- |
| תוכניות (`writing-plans`)        | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| מפרטים / תכנון (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| מחקר (`deep-research`, אד-הוק)   | `docs/research/`          | `_tasks/research/…`                                           |
| העברות (`/handoff`)              | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

יש לבצע commit לתוצרים אלה בתוך מאגר `_tasks/` (`git -C _tasks …`), ולעולם לא במאגר הראשי.

## קובצי טיוטה / קבצים זמניים — יש להשתמש ב-`_artifacts/`, לא ב-`/tmp`

פרויקט זה דורס את ברירת המחדל של סביבת ההרצה עבור אזור הטיוטה של הסשן (`/tmp/claude-*/…`). יש לכתוב
קבצים זמניים/קובצי עבודה — ייצואים, קובצי zip שנוצרו, פלטי ביניים חד-פעמיים וכל דבר שאחרת
היית כותב ל-`/tmp` — אל `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` במקום זאת.

- `_artifacts/` הוא נתיב `_*` בשורש: הוא כבר מוחרג מ-git (`AGENTS.md` ← "Root `_*` paths"), קיים
  בדיסק בלבד ולעולם אינו במעקב.
- הסיבה: שמירת פלטי טיוטה בתוך הפרויקט (בניגוד ל-`/tmp`) מאפשרת למפעיל
  למצוא ולמחוק בקלות את כל הקבצים הזמניים במקום אחד, במקום לחפש בספריות `/tmp`
  ארעיות וייחודיות לסשן, שנעלמות או צוברות קבצים ללא מעקב.
- אין **לבלבל** זאת עם `_tasks/` (כלל קשיח #23, מאגר git פרטי משלו עבור
  תוכניות/מפרטים/מחקר/העברות בני-קיימא) — `_artifacts/` מיועד לקובצי עבודה חד-פעמיים בלבד; שום דבר
  כאן אינו צריך לשרוד או להיות מנוהל בגרסאות.

## בסיס ירוק לפני פתיחת PRs

לפני יצירת ענף או פתיחת PR, יש להריץ את בדיקת הבסיס הירוק (`AGENTS.md` ← Git Workflow ←
"Base-green check"; מיומנויות הפרויקט מפנות אליה כ-`.agents/skills/_shared/base-green.md`). גוף של PR
שנפתח כאשר קצה ענף הבסיס אדום חייב לכלול `⚠️ base-red inherited: #<issue>`. כדי
לנקות מצב אדום שהצטבר (קצה בסיס + PRs אדומים), יש להשתמש במיומנות `/sweep-reds`.
