# Release Checklist (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **עודכן לאחרונה:** 2026-08-28 — v3.8.51
> תהליך הפצה יעיל הממנף את היכולות של Claude Code לצורך אוטומציה.
>
> **שמרו על התור/הענף ירוקים בין הפצות:** ראו [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (משפחת `/green-prs` +‏ `npm run check:release-green` +‏ `/babysit` + הרצה לילית). הרצה
> תקופתית של התהליך הזה — ובמיוחד **לפני** רשימת הבדיקה הזו — מבטיחה שה-PR של ההפצה יתחיל במצב ירוק.

## בקצרה

```bash
# 1. עדכון גרסה + יצירת CHANGELOG (יכולת)
/version-bump-cc patch    # או minor/major

# 2. הרצת שער האיכות באופן מקומי
npm run check              # lint + בדיקות
npm run test:coverage      # שער כיסוי מלא (60/60/60/60)

# 3. בנייה ובדיקת עשן
npm run build
npm run test:e2e           # אופציונלי אך מומלץ

# 4. יצירת הפצה (יכולת)
/generate-release-cc

# 5. פריסה (יכולת)
/deploy-vps-both-cc        # או akamai-cc / local-cc

# 6. תיעוד ראיות להפצה (יכולת)
/capture-release-evidences-cc
```

## פרסום מהימן ב-npm (ברירת המחדל מאז v3.8.51) — מדורג לפי בקשה, ישיר כחלופה

`npm-publish.yml` מפרסם כברירת מחדל באמצעות **פרסום מהימן ב-npm‏ (OIDC)**: משימת
`stage-npm` (המתארחת ב-GitHub) מחליפה את id-token של GitHub באישור npm קצר־טווח
עבור אותה הרצה — ללא אסימון npm ארוך־טווח בסודות המאגר, ללא בקשת 2FA, ועם הוכחת מקור מצורפת.
זהו המעקף ש-npm מאשרת כעת, עם הוצאתם משימוש של אסימונים העוקפים 2FA;
הוא משחזר את התהליך האוטומטי במלואו שהיה לפרויקט עד v3.8.48, תוך שמירה על
ההבטחה של WS1.3 (אסימון שדלף אינו יכול לפרסם לבדו — אין אסימון).

**הגדרה חד־פעמית (בעלים):** npmjs.com ← החבילה `omniroute` ← Settings ← _Trusted
Publisher_ ← GitHub: בעלים `diegosouzapw`, מאגר `OmniRoute`, תהליך עבודה `npm-publish.yml`
(סביבה: ללא). עד שהגדרה זו קיימת, השלב האוטומטי נכשל עם `ENEEDAUTH`:
הפעילו מחדש עם `publish_mode=staged` (להלן) או `direct`.

### פרסום מדורג (לפי בקשה — `publish_mode=staged`)

תהליך העבודה npm-publish כבר אינו מפרסם ישירות: הוא מאתחל את ה-tarball הארוז
(`check:pack-boot`) ולאחר מכן מריץ `npm stage publish` — הבתים המדויקים נשמרים במאגר
הרישום, אך **אינם ניתנים להתקנה** עד לאישור הבעלים. שער ה-2FA האנושי הועבר
לאחר ההוכחה, ולא לפניה.

**תהליך הבעלים לאחר שתהליך העבודה הופך לירוק:**

1. `npm stage list omniroute` — מצאו את מזהה השלב (הוא מודפס גם בסיכום תהליך העבודה).
2. אמתו את הבתים המדורגים (מומלץ): `npm stage download <id>`, לאחר מכן התקינו את
   ה-tarball שהורד לתחילית זמנית ואתחלו אותו (`npm run check:pack-boot` מבצע אוטומציה
   של אותה הכרעת אריזה←התקנה←אתחול ב-CI).
3. `npm stage approve <id>` — בקשת ה-2FA היא הפרסום עצמו. `npm stage reject <id>` מבטל.
4. רשת ביטחון לאחר הפרסום: מאמת הפוסט־פרסום (WS1.4 בתוכנית v3.8.49) מתקין את
   הגרסה שפורסמה ממאגר הרישום הציבורי בתוך קונטיינר נקי ומאתחל אותה.

**חלופת חירום:** `workflow_dispatch` עם `publish_mode=direct` משחזר את
`npm publish` המיידי מהתהליך הקודם (השתמשו רק אם תהליך הדירוג עצמו אינו פועל כראוי; תעדו מדוע).

**הקשחה חד־פעמית (בעלים, npmjs.com):** הגדירו את Trusted Publisher עבור
`omniroute` במצב דירוג בלבד, כך שאסימון ארוך־טווח שדלף לא יוכל להריץ `npm publish`
ישירות משום מקום — ה-CI יכול רק לבצע דירוג; רק ה-2FA של הבעלים מבצע הפצה.

**נוהל טיפול בפריט הפצה פגום (ללא שינוי):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
כברירת המחדל לתגובה מיידית (דקות, הפיך); השתמשו ב-`npm unpublish` רק בתוך חלון 72 השעות/ללא תלויים
ולעולם לא כמהלך ראשון. Docker: לעולם אל תשכתבו תג גרסה — חזרה לאחור מתבצעת
באמצעות הפניית `latest` מחדש ל-digest התקין האחרון.

**Docker Hub `latest` (נדרש בכל פרסום SemVer יציב):** תהליך העבודה
`docker-publish` חייב לתייג **גם** את `X.Y.Z` וגם, כאשר
`should-promote-latest.sh` מאשר שזוהי גרסת ה-SemVer היציבה הגבוהה ביותר, את `:latest`
עם **אותו digest**. לאחר המשימה: ה-digest של `latest` ב-Hub זהה ל-digest החדש של
SemVer והערך `last_updated` התעדכן. אל תשאירו את `:latest` על גרסת build ישנה
כאשר הערות ההפצה מתארות תיקונים שקיימים רק ב-git. מדריכי ההתחלה המהירה של Compose
משתמשים ב-`:latest`; ב-GitOps יש להמשיך להצמיד את `X.Y.Z`. ראו
[ערוצי הפצה של Docker](../guides/DOCKER_GUIDE.md#release-channels) ואת #10317.

## מסלול מהיר לתיקון חם (התווית `hotfix`)

PR שמסומן בתווית `hotfix` מדלג על מטריצת ה-CI הכבדה (E2E ב-9 פלחים, מחגר כיסוי,
quality-gate, quality-extended) ומשאיר את שערי הבדיקה המהירים ובעלי האות החזק: בנייה,
פלחי בדיקות יחידה, אינטגרציה, vitest, lint/typecheck, סנכרון תיעוד, `check:pack-artifact`
ובדיקת האתחול הבסיסית של חבילת ה-tarball (`check:pack-boot`). היעד: ירוק בתוך ≤15 דקות במקום כ-33 דקות.

**מדיניות כניסה — כל ארבעת התנאים נדרשים (מבוסס על מסלולי החירום של Chromium/VS Code/Node):**

1. **חומרה**: סביבת הייצור שבורה — ארטיפקט שפורסם קורס בעת האתחול /
   תיקון אבטחה / כל משתמשי הגרסה מושפעים. "חשוב" אינו "שבור".
2. **סמכות**: רק בעלי המאגר רשאים להחיל את התווית `hotfix`. התווית היא
   האישור — לעולם אין להחיל אותה בשירות עצמי על PR של קמפיין.
3. **ראיות**: גוף ה-PR מקשר להרצה הכבדה הקודמת שהייתה ירוקה במלואה (חבילת הבדיקות
   שהמשימות שעליהן מדלגים היו מאמתות מחדש), וכן לבדיקה של התיקון עצמו שנכשלה לפניו ועברה אחריו.
4. **היקף**: cherry-pick בלבד — התיקון המזערי, ללא ארגון קוד מחדש וללא שינויים נלווים.

תחום הכיסוי/המחגר שעליו דולג מאומת מחדש בהרצה המלאה הבאה בענף
הגרסה (ירוק רציף לגרסה) — המסלול מדלג על ההמתנה, לעולם לא על האימות.
שינויים בבדיקות בלבד (כל הקבצים תחת `tests/`, ואף אחד מהם אינו תחת `tests/e2e/`) מדלגים על מטריצת ה-E2E
אוטומטית, ללא תווית כלשהי.

## רשימת תיוג מפורטת

### לפני ההפצה

- [ ] כל בקשות המשיכה (PRs) המיועדות לגרסה זו מוזגו אל `release/vX.Y.0`
- [ ] כל פריטי Linear/הסוגיות הפתוחים עבור גרסה זו נסגרו או הועברו לאבן הדרך הבאה
- [ ] ה-CI ירוק בענף `release/vX.Y.0`
- [ ] אין סמני `TODO(release)` בקוד: `grep -r "TODO(release)" src/ open-sse/`
- [ ] תמונת הבסיס של Docker מעודכנת (נכון לעכשיו `node:24.15.0-trixie-slim`)

### גרסה ויומן שינויים

- [ ] הריצו `/version-bump-cc <patch|minor|major>` (מיומנות Claude Code)
  - מעדכן את הגרסה ב-`package.json`, `electron/package.json`
  - יוצר מחדש את `CHANGELOG.md` מה-commits של git מאז התג האחרון
  - מעדכן את התגים ב-README.md
- [ ] סקרו ידנית את CHANGELOG.md ונקו הודעות commit לפי הצורך
- [ ] ודאו שסעיף ה-semver האחרון ב-`CHANGELOG.md` תואם לגרסה ב-`package.json`
- [ ] השאירו את `## [Unreleased]` כסעיף הראשון ביומן השינויים עבור עבודה עתידית
- [ ] עדכנו את `docs/openapi.yaml` ← `info.version` חייב להיות זהה לגרסה ב-`package.json`

### איכות הקוד

- [ ] `npm run lint` — 0 שגיאות (האזהרות היו קיימות קודם לכן)
- [ ] `npm run typecheck:core` — נקי
- [ ] `npm run typecheck:noimplicit:core` — נקי (מחמיר)
- [ ] `npm run check:cycles:ratchet` — בתוך התקרה הקפואה של `metrics.cycles` ‏(`check:cycles` לבדו מסתיים עם קוד 1 בכל מחזור, #15281)
- [ ] `npm run check:any-budget:t11` — בתוך התקציב
- [ ] `npm run check:route-validation:t06` — נקי
- [ ] `npm run check:node-runtime` — סף סביבת הריצה הנתמכת מתקיים (`>=22.22.2 <23`, `>=24.0.0 <27`, לפי `SUPPORTED_NODE_RANGE` ב-`src/shared/utils/nodeRuntimeSupport.ts`; תואם ל-`engines` ב-`package.json`)

### בדיקות

- [ ] `npm run test:unit` — עובר
- [ ] `npm run test:vitest` — עובר (שרת MCP, ‏autoCombo, מטמון)
- [ ] `npm run test:coverage` — סף 60/60/60/60 מתקיים (פקודות/שורות/פונקציות/הסתעפויות)
- [ ] `npm run test:integration` — עובר (אם השינויים נוגעים במסד הנתונים / מטפלים)
- [ ] `npm run test:combo:matrix` — עובר (מטריצת אסטרטגיות combo: מוכיחה באופן דטרמיניסטי את החלטות הבחירה של כל 21 אסטרטגיות הניתוב הציבוריות; יש להריץ בעת שינוי ניתוב combo, הכרעת אסטרטגיה או לוגיקת גיבוי)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **אופציונלי/ידני** (בדיקת smoke מול שירותי upstream אמיתיים, המוגנת בשער; טוענת תמונת מצב לקריאה בלבד של מסד הנתונים מ-VPS ‏`root@192.168.0.15`; פונה לספקים אמיתיים, צורכת נקודות זכות; לעולם אינה רצה ב-CI; מדלגת באופן נקי ללא השער)
- [ ] `npm run test:combo:live:vps` — **אופציונלי/ידני** (בדיקת smoke חיה של VPS בשלב 3: שבעה תרחישי HTTP מול שרת `.15` החי באמצעות Node ESM רגיל; דורשת `ssh root@192.168.0.15`; יוצרת/מוחקת רק צירופי `__live_test__*`; פונה לספקים אמיתיים; לעולם אינה רצה ב-CI)
- [ ] `npm run test:e2e` — עובר (שינויים בממשק המשתמש)
- [ ] `npm run test:protocols:e2e` — עובר (שינויים ב-MCP/A2A)
- [ ] `npm run test:ecosystem` — עובר

### Hooks (מאומתים באמצעות Husky)

ה-hooks של Husky נמצאים ב-`.husky/` ורצים אוטומטית בפעולות git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** שערים מהירים ודטרמיניסטיים — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (הופעל ב-2026-06-13). אינו כולל בכוונה את `test:unit` (איטי; מכוסה על ידי משימת ה-CI ‏`test-unit`).
  - הריצו ידנית את `npm run test:unit` לפני דחיפת ענפי הפצה.

אם hook נכשל: תקנו את הבעיה הבסיסית, אל תעקפו באמצעות `--no-verify`.

### Conventional Commits

כל ה-commits המיועדים להפצה חייבים לעמוד בתבנית `type(scope): subject`.

**סוגים תקינים:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**תחומים תקינים:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

שינויים שוברים: הוסיפו שורת סיום `BREAKING CHANGE:` או `!` אחרי התחום (לדוגמה `feat(api)!: drop /v0`).

### תיעוד

- [ ] `npm run check:docs-sync` עובר (רץ אוטומטית על ידי pre-commit)
- [ ] `npm run check:docs-all` עובר (בדיקת-על: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` מסתיים עם קוד 0 — החוזה של משתני הסביבה בין הקוד ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` נשאר תקין
- [ ] `npm run check:doc-links` מסתיים עם קוד 0 — אין הפניות Markdown פנימיות שבורות לאחר הארגון מחדש
- [ ] `docs/architecture/ARCHITECTURE.md` נסקר לאיתור אי-התאמות באחסון/בסביבת הריצה
- [ ] `docs/guides/TROUBLESHOOTING.md` נסקר לאיתור אי-התאמות במשתני סביבה ובתפעול
- [ ] אם `.env.example` השתנה: `docs/reference/ENVIRONMENT.md` עודכן
- [ ] אם לתכונה חדשה יש ממשק משתמש: `docs/guides/USER_GUIDE.md` מציין אותה
- [ ] אם לתכונה חדשה יש API: ‏`docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` עודכנו
- [ ] אם התכונה החדשה היא מודול: קיים עבורה `docs/<MODULE>.md` ייעודי
- [ ] אם מדובר בשינוי שובר: `docs/guides/TROUBLESHOOTING.md` כולל הערת מיגרציה

### i18n

- [ ] `npm run i18n:check` מסתיים עם קוד 0 — מצב התרגום (`.i18n-state.json`) מסונכרן עם מסמכי המקור (אין מקורות שסטו במצב מחמיר; התראה במצב אזהרה קבילה עבור תיקוני תיעוד ברגע האחרון, אך התוצאה צריכה להיות 0 לפני התיוג)
- [ ] `npm run i18n:check-ui-coverage` מסתיים עם קוד 0 — כל שפת ממשק משתמש נמצאת בסף הכיסוי של 80% או מעליו
- [ ] `npm run i18n:sync-ui:dry` מדווח על 0 מפתחות חסרים בכל 66 שפות היעד (כל שפה למעט מקור `en`)
- [ ] אם מסמכי המקור באנגלית השתנו, הריצו `npm run i18n:run` (דורש `OMNIROUTE_TRANSLATION_API_KEY` ב-`.env`) לפני התיוג
- [ ] ניתן לדחות תרומות תרגום קלות לגרסה הבאה (יש לעקוב אחריהן ב-CHANGELOG)

### מיגרציות של מסד הנתונים

- [ ] אם קיימים קבצים חדשים ב-`src/lib/db/migrations/`:
  - [ ] כל מיגרציה היא אידמפוטנטית (`CREATE TABLE IF NOT EXISTS` וכו')
  - [ ] המיגרציות עטופות בטרנזקציות
  - [ ] המספור נכון (ללא פערים ברצף)
- [ ] בדקו בהתקנה חדשה: מחקו את `~/.omniroute/omniroute.db` והריצו `npm run dev`
- [ ] בדקו בהתקנה קיימת: גבו את מסד הנתונים, הריצו את המיגרציה ואמתו את הסכמה
- [ ] קובצי WAL ‏(`-wal`, `-shm`) מטופלים כראוי אם המיגרציה משכתבת טבלאות

### קטלוג ספקים (מאומת באמצעות Zod)

- [ ] הסכימה של `src/shared/constants/providers.ts` תקפה בזמן הטעינה
  - [ ] לכל הספקים יש את השדות הנדרשים (`id`, `label`, `kind` וכו׳)
  - [ ] `freeNote` מוגדר עבור ספקים חינמיים חדשים
  - [ ] לספקי OAuth יש `oauthConfig` הרשום ב-`src/lib/oauth/constants/oauth.ts`
- [ ] אם נוסף ספק חדש: קיים executor תואם ב-`open-sse/executors/`
- [ ] אם הפורמט אינו OpenAI: קיים מתרגם ב-`open-sse/translator/`
- [ ] המודלים רשומים ב-`open-sse/config/providerRegistry.ts`
- [ ] בדיקות יחידה ב-`tests/unit/` מכסות את סיווג הספקים והניתוב

### שולחן עבודה (Electron)

אם `electron/` השתנה:

- [ ] `npm run electron:smoke:packaged` עובר בהצלחה
- [ ] ה-builds נבדקו עבור לפחות אחת מהאפשרויות `:win`, `:mac`, `:linux`
- [ ] אישורי חתימת הקוד לא פגו (אם מתבצעת חתימה)
- [ ] הגרסה ב-`electron/package.json` תואמת לזו שב-`package.json` הראשי
- [ ] המצביע לערוץ העדכון האוטומטי עודכן אם ההפצה היא ל-`stable`

### מבנה ה-build

המאגר משתמש בשלוש תיקיות פלט נפרדות — לעולם אין לערבב ביניהן:

| תיקייה    | מטרה                                                   | במעקב?          |
| --------- | ------------------------------------------------------ | --------------- |
| `src/`    | קוד המקור של היישום (TypeScript / TSX)                 | כן              |
| `.build/` | תוצרי ביניים של ה-build — פלט `next build` (`distDir`) | לא (gitignored) |
| `dist/`   | חבילת npm להפצה — מורכבת על ידי `assembleStandalone`   | לא (gitignored) |

> **הערה למפעיל:** תיקיית התמונה ב-VPS המרוחק נשארת `/usr/lib/node_modules/omniroute/app/`.
> רק פלט ה-build **בתוך המאגר** עבר (`app/` → `dist/`). מיומנויות הפריסה מסנכרנות באמצעות rsync את
> תוכן `dist/` אל תיקיית `app/` המרוחקת — לא נדרשים שינויים בנתיבי ה-VPS.

**זרימת build יחיד:**

```
npm run build:release
  └─ rm -rf .build dist          (ניקוי)
  └─ next build → .build/next/   (תוצרי ביניים)
  └─ assembleStandalone          (מעתיק standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (סמן HEAD)
```

אין להריץ `npm run build` ולאחר מכן `npm run build:cli` נפרד לצורך פריסה — יש להשתמש ב-
`npm run build:release`, שמבצע build נקי מחדש וכותב סמן בפקודה אחת.

### אימות תוצרי build

- [ ] `npm run build:release` מסתיים בהצלחה ו-`dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` נקי — ללא `app.__qa_backup`,‏ `scripts/scratch`,‏ `package-lock.json` או שאריות מקומיות אחרות
- [ ] `dist/server.js` קיים לאחר ה-build
- [ ] בדיקת smoke מקומית אופציונלית של סביבת הריצה הארוזה: `npm run dev:candidate -- validate` לאחר `npm run dev:candidate -- build` מפעילה את קובץ ה-tarball הארוז עם `DATA_DIR` מבודד ובודקת את `/api/health` ואת `/v1/models` (ראו [נתיב הזהב לתרומה](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop))

### תיוג והפצה

- [ ] יש להריץ את `/generate-release-cc` (מיומנות Claude Code):
  - יוצרת את התג `vX.Y.Z`
  - דוחפת את התג ואת הענף
  - פותחת GitHub Release עם גוף יומן שינויים
  - מצרפת מתקיני Electron (אם נבנו)
- [ ] לחלופין, באופן ידני:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### פריסה

מיומנויות הפריסה משתמשות בזרימת rsync קלה — ללא `npm pack` וללא `npm i -g`:

- [ ] יש להשתמש במיומנות הפריסה התואמת ליעד:
  - `/deploy-vps-local-cc` — VPS מקומי (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS של Akamai‏ (69.164.221.35)
  - `/deploy-vps-both-cc` — שניהם
- [ ] לפני הפריסה, יש לוודא ש-`dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] ה-build חייב לרוץ במקום שבו `node_modules` אמיתי (ה-checkout הראשי או worktree שבו הורץ `npm ci` — לא worktree עם קישור סמלי)
- [ ] יש לבצע בדיקת smoke למופע שנפרס:
  - לפתוח את `/dashboard/health` → לבדוק שמחרוזת הגרסה תואמת להפצה
  - להריץ בקשת `/v1/chat/completions` מול ספק מוכר
  - לוודא ש-`/api/monitoring/health` מחזיר מפסקי מעגל במצב `CLOSED`
  - לוודא שתעבורות MCP מגיבות (`/mcp` ב-HTTP,‏ `/mcp-sse` ב-SSE)

### לאחר ההפצה

- [ ] יש להריץ את `/capture-release-evidences-cc` (מיומנות Claude Code)
  - לוכדת צילומי מסך/הקלטות WebP של תכונות חדשות
  - מצרפת אותם להערות ההפצה / לפוסט בבלוג
- [ ] לעדכן את GitHub Discussions / Discord בהכרזת ההפצה
- [ ] לפתוח אבן דרך עבור הגרסה הבאה
- [ ] אם מדובר בעדכון קריטי: להצמיד דיון או לפרסם ב-`news.json` עבור כרזה בתוך היישום

### שער ההשקה הציבורית של Radar

הכרזת Radar נכללת במכוון ב-commit עם `active: false`. ההפעלה היא שינוי נפרד
לאחר שסופקו ראיות לכל הפריטים הבאים:

- [ ] כל בקשות המשיכה המוערמות של Radar מוזגו וה-CI בקצה ההפצה ירוק
- [ ] לפרוס ולבצע בדיקת smoke לנתיבי Radar של OSS כאשר `RADAR_ENABLED` עדיין כבוי כברירת מחדל
- [ ] לבצע בדיקת smoke ל-`GET /planos`,‏ `/termos`,‏ `/privacidade` ו-`/reembolso` במארח Radar שהוגדר
- [ ] לתעד בשירות הפרטי את זהות המפעיל/פרטי הקשר/הכתובת ואת הבדיקה המשפטית שאושרה על ידי הבעלים
- [ ] לבדוק את Stripe Checkout ואת ה-webhook החתום במצב בדיקה בלבד
- [ ] לבדוק מסירה אחת של הודעת דוא״ל מוצפנת לביצוע עסקה באמצעות השולח/הדומיין המאושרים
- [ ] להוכיח שחזור מגיבוי והרצת מחקר אחת תחת פיקוח ובמגבלת תקציב
- [ ] לאשר את מדיניות הבדיקה של BRL/PIX לפני קבלת ראיות לתרומה
- [ ] להפעיל Checkout ציבורי רק לאחר מעבר השערים הקודמים, ולאחר מכן להפעיל את ה-ID החדש ב-`news.json`
- [ ] לוודא שהכרזה בדף הבית משתמשת בטקסט מותאם לשפה וש-ID חדש מופיע מחדש לאחר ש-ID ישן יותר נסגר

## בדיקות עשן לשירותים מוטמעים (v3.8.4+)

לפני הפצת גרסה כלשהי הכוללת שינויים בשירותים המוטמעים, יש לוודא:

### אתחול עם מסד נתונים חדש (מאתר התנגשויות במיגרציות — נוסף לאחר התיקון החם של v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — יש להמתין 10 שניות לאתחול
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` מחזיר `"9router"` (לא 404 ולא 500). מאשר שהמיגרציה `071_services.sql` הוחלה ושנוספה שורה ראשונית.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` מחזיר 3 שורות.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` מחזיר 2 שורות (מאמת שהמיגרציה `070_webhooks_kind_metadata.sql` הוחלה).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` עובר בהצלחה — מגן מפני התנגשויות עתידיות.

### 9Router

- [ ] `POST /api/services/9router/install` מחזיר 200 עם `installedVersion` בתוך פחות מ-2 דקות
- [ ] `POST /api/services/9router/start` מחזיר 200 ו-`state: "running"` בתוך פחות מ-30 שניות
- [ ] `GET /api/services/9router/status` מדווח על `health: "healthy"`
- [ ] `POST /v1/chat/completions` עם `"model": "9router/auto/..."` מחזיר 200 (ניתוב מקצה לקצה דרך 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` מציג את ממשק המשתמש המקורי של 9Router בתוך ה-proxy (ללא iframe ישיר אל `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` מחזיר `{ keyRotated: true }` והשירות מופעל מחדש באופן תקין
- [ ] `POST /api/services/9router/stop` מחזיר 200 ו-`state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` מחזיר זרם SSE עם אירוע `snapshot` המכיל שורות אחרונות
- [ ] התקנה בסביבה שבה `npm` אינו נמצא ב-PATH מחזירה 500 עם הודעת שגיאה ידידותית (ללא stack trace)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` מחזיר 200 בתוך פחות מ-2 דקות
- [ ] `POST /api/services/cliproxy/start` מחזיר 200 ו-`state: "running"` בתוך פחות מ-30 שניות
- [ ] `GET /api/services/cliproxy/status` מדווח על `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` מחזיר 200 ו-`state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` מחזיר זרם SSE

### בדיקות רגרסיה של אבטחה

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` מחזיר `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` מחזיר `403 LOCAL_ONLY`
- [ ] תגובות שגיאה מ-`/api/services/*` אינן מכילות `err.stack` או נתיבי קבצים מוחלטים

## בדיקות עבור v3.8.0+

לפני הפצת גרסת v3.8.x כלשהי, יש לוודא גם את הפריטים הבאים:

- [ ] `omniroute --tray` עולה ב-macOS‏ (systray2 מותקן בתוך `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` עולה ב-Linux‏ (דורש DISPLAY; שגיאה מבוקרת אם הוא אינו מוגדר)
- [ ] `omniroute --tray` עולה ב-Windows‏ (PowerShell NotifyIcon, ללא קבצים בינאריים נוספים)
- [ ] `omniroute config tray enable` יוצר רשומת הפעלה אוטומטית; השבתה מסירה אותה
- [ ] `npm install -g omniroute@<this-version>` מפעיל את postinstall ללא יציאה קטלנית
- [ ] נתיב העדכון שומר על תלויות אופציונליות: `omniroute update --apply` ומנגנון העדכון האוטומטי
      מפעילים `npm install -g … --include=optional` כדי ש-`optionalDependencies`‏ (better-sqlite3,
      keytar, tls-client, ומחסנית ה-SLM של llmlingua:‏ `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) ישרדו עדכון. שכבת ה-SLM מסוג ultra עם `modelPath` זקוקה גם למודל
      tinybert, שמורד אוטומטית אל `${DATA_DIR}/models/llmlingua` בשימוש הראשון. לאחר מכן, postinstall
      (`scripts/build/colocateOptionals.mjs`) ממקם יחד את מכלול התלויות האופציונליות של ה-SLM בתוך
      `dist/node_modules`, כך שה-worker פותר מופע יחיד של `@huggingface/transformers` ^4.2.0
      — ה-trace העצמאי מאגד רק את transformers, ולא את התלויות האופציונליות המיובאות דינמית,
      ולכן בלעדי זאת ה-worker יטען את llmlingua-2 מול transformers שבשורש, ושכבת ה-SLM תיכשל בשקט במצב fail-open.
- [ ] `omniroute status` פועל ללא `.env` (נתיב אסימון CLI,‏ loopback בלבד)
- [ ] `curl http://localhost:20128/api/shutdown` מחזיר 401 (נתיב מוגן תמיד)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` מחזיר 401 (הגנת loopback)
- [ ] סביבת הריצה של SQLite מזוהה כ-`bundled` בהפעלה הראשונה (הקובץ הבינארי המצורף תקין עבור הפלטפורמה)
- [ ] סביבת הריצה של SQLite חוזרת ל-`runtime` כאשר `node_modules/better-sqlite3` נמחק
- [ ] מסנן MCP החכם דוחס פלט אמיתי של `playwright-mcp browser_snapshot` (הפחתה של 50% לפחות)
- [ ] כל 10 הקבצים `skills/omniroute*/SKILL.md` זמינים לציבור דרך כתובת URL גולמית של GitHub
- [ ] אשף הקליטה מציג את שלב הסיור בשכבות "כיצד זה עובד" בהגדרה חדשה
- [ ] ווידג'ט כיסוי השכבות בלוח הבקרה הראשי מציג ספירות של שכבות מוגדרות/פעילות

---

## חיתוך 3.9.0 LTS (תורגל ב-3.8.58)

לאחר v3.8.59 הגרסה הבאה היא 3.9.0, והקצה שלה הופך לשני ענפים ארוכי-חיים:
`stable/v3` (קו ה-LTS של v3, ‏npm `latest`) ו-`develop` (‏v4, מוקפץ ל-4.0.0, ‏npm
`nightly`). מודל הענפים/ערוצים, ההעברה קדימה והתוויות מתוארים ב-
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); התוכנית נמצאת ב-[מפת הדרכים](../../ROADMAP.md) (שלב 3). החיתוך מתבצע פעם אחת;
3.8.58 מתרגל אותו מקצה לקצה על fork, ו-3.8.59 נסגרת עם
[רשימת הבדיקה GO/NO-GO](./LTS_GO_NO_GO.md).

### הרצה יבשה (קריאה בלבד, בטוחה בכל עת)

```bash
npm run release:dry-run-lts-cut                       # החיתוך האמיתי: 3.9.0 מתוך HEAD, התג הקודם v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # קיבוע commit המקור
```

`scripts/release/dry-run-lts-cut.mjs` אינו מבצע דבר: הוא קורא את git ואת `gh` ומדפיס את
הרצף המלא — תנאים מקדימים (המקור מזוהה, למאגר המקור יש היסטוריה מלאה —
עותק משוכפל רדוד אינו יכול לדחוף את `stable/v3`, הצד המקבל דוחה את החבילה בהורה
המורכב הראשון, לכן יש לבצע את החיתוך מעותק משוכפל מלא או להריץ תחילה `git fetch --unshallow origin` —
התג הקודם קיים, `package.json` נמצא בגרסת היעד, קיימת סוגיה פתוחה עם `release-freeze`, אין
סוגיה פתוחה מסוג `Release branch not green`
בענף גרסה קיים — ענף שאינו קיים מדווח כ-`?` לא ידוע, ולעולם לא
כירוק — תור `release` של Mergify מוגדר (G11: ‏`queue_rules`, ‏`checks_timeout`,
התווית `queue`), מערכת הכללים `release/*` עדיין חוסמת מחיקה ודחיפה כפויה, ו-
`stable/v3` ו-`develop` עדיין אינם קיימים), שני שלבי הענפים, אילו טריגרים של תהליכי עבודה
רדומים ואילו תנאי `if:` הופכים לאמת (ואילו נשארים חסומים באמצעות משתנה מאגר או
מקובעים למאגר הקנוני), תגי ההפצה הצפויים (`latest` ← 3.9.0, ‏`next` ו-
`nightly` ריקים) והחזרה לאחור. יציאה עם `0` = ‏`RESULT: READY`, עם `1` = תנאי מקדים חוסם
נכשל (`✗`), עם `2` = שגיאת שימוש. `--advisory <id,...>` מוריד בדיקה לרמת אזהרה (`!`)
מבלי להסתיר אותה.

הריצו את ההרצה היבשה של החיתוך האמיתי בזמן שהקפאת הגרסה 3.9.0 עדיין פתוחה — הענפים
נוצרים לאחר התג ולפני ששלב 12c מסיר את ההקפאה.

### תרגול 3.8.58 (ב-fork בלבד)

```bash
# 1. הרצה יבשה בקצה הנוכחי עם פרמטרי התרגול
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. ביצוע מול remote של FORK (הפקודה מסרבת להשתמש ב-origin, או בכל remote שכתובת ה-URL שלו היא של המאגר
#    הקנוני; בכל שלב מתבקש אישור במסוף)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. הפעלת תהליכי העבודה הרדומים ב-fork (באמצעות workflow_dispatch כאשר ההרצה היבשה
#    מדווחת על קיבוע למאגר הקנוני), ולאחר מכן חזרה לאחור
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

ה-commit שמקפיץ את develop נבנה באמצעות מנגנוני התשתית של git (ללא נגיעה בעץ העבודה) ומקפיץ
את אותם חמישה קבצים כמו commit של פתיחת מחזור: `package.json`, ‏`open-sse/package.json`,
‏`electron/package.json`, ‏`package-lock.json` ו-`docs/openapi.yaml`. המקטע `[4.0.0]`
של CHANGELOG והגרסאות המקבילות שלו בשפות i18n נפתחים לאחר מכן ב-`develop`, לפני ה-PR
הראשון שלו. הסקריפט לעולם אינו משנה תגי הפצה של npm — תרגלו אותם על חבילת ניסוי.

### פריט תצוגה מקדימה של PR (בנייה פעם אחת, קידום של אותם בתים)

`.github/workflows/preview-artifact.yml` בונה חבילת tar אחת לייצור מראש PR
ומאמת את אותה בנייה בדיוק (מקטע (a) של #8084). רק PR-ים מאותו מאגר; דבר אינו מתפרסם.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # או הוסיפו את התווית `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # התקנת תצוגה מקדימה
```

ההרצה מבצעת `npm ci`, ‏`npm run build:release`, ‏`npm run check:pack-artifact`, אורזת את
חבילת ה-tar, מריצה `npm run check:pack-boot` (סודות מזויפים, ספריית נתונים זמנית), אורזת מחדש
ונכשלת אלא אם התקציר זהה, ולאחר מכן מתעדת את `artifact-identity.json` (‏SHA של הראש, ‏SHA של
הבסיס, גיבוב קובץ הנעילה, פלטפורמה, ארכיטקטורה, ABI של node, מאגד, מדיניות בנייה —
`scripts/release/artifact-identity.mjs`) ומאמתת את חבילת ה-tar במשימה נפרדת. קידום
תצוגה מקדימה פירושו התקנת חבילת ה-tar הזו: לעולם אין לבנות מחדש מקוד המקור.

### החיתוך (3.9.0, לאחר GO)

1. ‏GO תועד ב-[LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` מדפיס `RESULT: READY`.
3. צרו את הענפים ב-`origin` ידנית באמצעות הפקודות שההרצה היבשה מדפיסה —
   הסקריפט מסרב לדחוף ל-`origin`. כדי להשתמש מחדש ב-commit של develop שעבר סקירה, הריצו תחילה את
   תרגול `--execute` על קצה 3.9.0 מול ה-fork שלכם; הוא מדפיס את שני ערכי ה-SHA, וניתן
   לדחוף את אותם commits:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. הגנו על `stable/v3` ועל `develop` (ערכות כללים + תור מיזוג) לפני שה-PR הראשון מתקבל.
5. תהליכי העבודה הרדומים מופעלים עם קיום הענף: `forward-port.yml` (דחיפה אל
   `stable/v3`),‏ `validate-stable-pr.yml` (בקשות משיכה אל `stable/v3`) ו-`nightly-v4-build.yml`
   (בונה את `develop`). לפני ההשקה, הגדירו את סוד המאגר `secrets.FORWARD_PORT_TOKEN` (כדי שה-CI ירוץ על
   בקשות משיכה של העברה קדימה); הפרסום הלילי נשאר כבוי עד שהבעלים מגדיר את משתנה המאגר
   `vars.NIGHTLY_PUBLISH` לערך `true` ו-npm Trusted Publishing מאשר את
   `nightly-v4-build.yml`. זיהוי הערוץ מתבצע באמצעות `scripts/release/dist-tag.mjs`, אותו
   מנגנון זיהוי שבו משתמש `npm-publish.yml`.
6. אמתו את הערוצים: `npm view omniroute dist-tags --json` מציג `latest` = 3.9.0 וללא
   `next` / `nightly` עד לפרסום v4.
7. חזרה לאחור, במקרה הצורך: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   ו-`npm dist-tag add omniroute@3.8.59 latest`.

---

## חזרה לגרסה קודמת

אם קיימת בעיה קריטית בגרסה:

1. `gh release edit vX.Y.Z --prerelease` (מסמן אותה כגרסה שאינה העדכנית ביותר)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (רק אם משתמשים טרם אימצו אותה)
3. לחלופין: תיקון חם בענף `release/vX.Y.0` ← גרסת תיקון `vX.Y.(Z+1)`
4. יש להודיע מיד ב-GitHub Discussions וב-Discord

## כללים מחייבים

- לעולם אין לבצע commit ישירות אל `main`
- לעולם אין להשתמש ב-`git push --force` עבור `main` או ענפי `release/*`
- לעולם אין לדלג על ה-hooks של Husky‏ (`--no-verify`)
- לעולם אין לבצע commit של סודות, פרטי גישה או קובצי `.env`
- הכיסוי חייב להישאר ≥60/60/60/60 (פקודות/שורות/פונקציות/הסתעפויות)
- בעת שינוי קוד ייצור ב-`src/`,‏ `open-sse/`,‏ `electron/` או `bin/`, יש תמיד להוסיף בדיקות או לעדכן אותן

## בדיקת סנכרון אוטומטית

יש להריץ מקומית את בדיקת הסנכרון של התיעוד לפני פתיחת PR:

```bash
npm run check:docs-sync
```

גם CI מריץ בדיקה זו ב-`.github/workflows/ci.yml` (משימת lint).
