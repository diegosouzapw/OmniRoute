# Release Checklist (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **עודכן לאחרונה:** 2026-08-28 — v3.8.51
> תהליך הפצה יעיל יותר, המנצל את המיומנויות של Claude Code לצורך אוטומציה.
>
> **שמרו על התור/הענף במצב תקין בין הפצות:** ראו [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (משפחת `/green-prs` +‏ `npm run check:release-green` +‏ `/babysit` + הרצה לילית). הפעלה
> תקופתית של תהליך זה — ובמיוחד **לפני** רשימת תיוג זו — מבטיחה שה-PR של ההפצה יתחיל במצב תקין.

## בקצרה

```bash
# 1. עדכון גרסה + יצירת CHANGELOG (מיומנות)
/version-bump-cc patch    # או minor/major

# 2. הפעלת שער האיכות באופן מקומי
npm run check              # lint + בדיקות
npm run test:coverage      # שער כיסוי מלא (60/60/60/60)

# 3. בנייה ובדיקת עשן
npm run build
npm run test:e2e           # אופציונלי אך מומלץ

# 4. יצירת הפצה (מיומנות)
/generate-release-cc

# 5. פריסה (מיומנות)
/deploy-vps-both-cc        # או akamai-cc / local-cc

# 6. איסוף ראיות להפצה (מיומנות)
/capture-release-evidences-cc
```

## פרסום מהימן ב-npm (ברירת המחדל מאז v3.8.51) — מדורג לפי בקשה, ישיר כחלופה

`npm-publish.yml` מפרסם כברירת מחדל באמצעות **npm Trusted Publishing (OIDC)**: המשימה
`stage-npm` (המתארחת ב-GitHub) ממירה את אסימון הזהות של GitHub לאישור npm קצר-מועד
עבור אותה הרצה — ללא אסימון npm ארוך-טווח בסודות המאגר, ללא בקשת 2FA, ועם הוכחת מקור מצורפת.
זהו המנגנון העוקף ש-npm מאשרת כעת, עם הוצאתם משימוש של אסימונים המדלגים על 2FA;
הוא משחזר את התהליך האוטומטי לחלוטין שהיה לפרויקט עד v3.8.48, תוך שמירה על
ההבטחה של WS1.3 (אסימון שדלף אינו יכול לפרסם לבדו — אין אסימון).

**הגדרה חד-פעמית (בעלים):** npmjs.com ← החבילה `omniroute` ← Settings ← _Trusted
Publisher_ ← GitHub: בעלים `diegosouzapw`, מאגר `OmniRoute`, תהליך עבודה `npm-publish.yml`
(סביבה: ללא). עד להגדרה זו, השלב האוטומטי נכשל עם `ENEEDAUTH`:
הפעילו מחדש עם `publish_mode=staged` (להלן) או `direct`.

### פרסום מדורג (לפי בקשה — `publish_mode=staged`)

תהליך העבודה npm-publish אינו מפרסם עוד ישירות: הוא מאתחל את חבילת ה-tarball הארוזה
(`check:pack-boot`) ולאחר מכן מריץ `npm stage publish` — הבתים המדויקים נשמרים ברישום,
אך **אינם ניתנים להתקנה** עד שהבעלים מאשר. שער ה-2FA האנושי הועבר
לאחר ההוכחה, ולא לפניה.

**תהליך הבעלים לאחר שתהליך העבודה הופך לירוק:**

1. `npm stage list omniroute` — מצאו את מזהה השלב (הוא מופיע גם בסיכום תהליך העבודה).
2. אמתו את הבתים המדורגים (מומלץ): `npm stage download <id>`, לאחר מכן התקינו את
   ה-tarball שהורד תחת תחילית זמנית ואתחלו אותו (`npm run check:pack-boot` מבצע באופן אוטומטי
   את אותה הכרעת אריזה←התקנה←אתחול ב-CI).
3. `npm stage approve <id>` — בקשת ה-2FA היא פעולת הפרסום. `npm stage reject <id>` מבטל.
4. רשת ביטחון לאחר הפרסום: המאמת שלאחר הפרסום (WS1.4 בתוכנית v3.8.49) מתקין את
   הגרסה שפורסמה מהרישום הציבורי בקונטיינר נקי ומאתחל אותה.

**חלופת חירום:** `workflow_dispatch` עם `publish_mode=direct` משחזר את
`npm publish` המיידי מהתהליך הישן (השתמשו רק אם מנגנון הדירוג עצמו אינו פועל כראוי; תעדו מדוע).

**הקשחה חד-פעמית (בעלים, npmjs.com):** הגדירו את ה-Trusted Publisher עבור
`omniroute` במצב דירוג בלבד, כך שאסימון ארוך-טווח שדלף לא יוכל לבצע `npm publish`
ישירות משום מקום — CI יכול רק לדרג; רק אימות ה-2FA של הבעלים משחרר את ההפצה.

**נוהל לטיפול בארטיפקט פגום (ללא שינוי):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
כפעולת ברירת המחדל (דקות, הפיך); `npm unpublish` רק בתוך חלון 72 השעות/ללא-תלויים,
ולעולם לא כמהלך ראשון. Docker: לעולם אל תשכתבו תגית גרסה — חזרה לאחור מתבצעת
באמצעות הפניית `latest` מחדש לתמצית התקינה האחרונה.

**`latest` ב-Docker Hub (נדרש בכל פרסום SemVer יציב):** תהליך העבודה
`docker-publish` חייב לתייג **גם** `X.Y.Z` וגם, כאשר
`should-promote-latest.sh` מאשר שזו גרסת ה-SemVer היציבה הגבוהה ביותר, את `:latest`
עם **אותה תמצית**. לאחר המשימה: התמצית של `latest` ב-Hub זהה לתמצית ה-SemVer
החדשה, ו-`last_updated` עודכן. אל תשאירו את `:latest` על בנייה ישנה יותר
כאשר הערות ההפצה מתארות תיקונים הקיימים רק ב-git. מדריכי ההתחלה המהירה של Compose
משתמשים ב-`:latest`; בתהליכי GitOps יש להמשיך להצמיד את `X.Y.Z`. ראו
[ערוצי הפצה של Docker](../guides/DOCKER_GUIDE.md#release-channels) ו-#10317.

## מסלול מהיר לתיקון חם (התווית `hotfix`)

PR המסומן בתווית `hotfix` מדלג על מטריצת ה-CI הכבדה (E2E ב-9 רסיסים, אכיפת סף כיסוי,
quality-gate, quality-extended) ומשאיר את שערי הבדיקה המהירים ובעלי האות החזק: בנייה,
רסיסי בדיקות יחידה, אינטגרציה, vitest, lint/typecheck, docs-sync,‏ `check:pack-artifact`
ובדיקת האתחול הבסיסית של חבילת ה-tarball‏ (`check:pack-boot`). יעד: מצב תקין בתוך ≤15 דקות במקום כ-33 דקות.

**מדיניות כניסה — כל ארבעת התנאים נדרשים (מבוסס על מסלולי החירום של Chromium/VS Code/Node):**

1. **חומרה**: סביבת הייצור אינה תקינה — ארטיפקט שפורסם קורס בעת האתחול / תיקון
   אבטחה / כל משתמשי הגרסה מושפעים. "חשוב" אינו "לא תקין".
2. **סמכות**: רק בעלי המאגר רשאים להחיל את התווית `hotfix`. התווית היא
   האישור — לעולם אין להחילה באופן עצמאי על PR של קמפיין.
3. **ראיות**: גוף ה-PR מקשר להרצה הכבדה הקודמת שהסתיימה בהצלחה מלאה (חבילת הבדיקות
   שהמשימות שעליהן מדלגים היו מאמתות מחדש), וכן לבדיקה של התיקון עצמו שנכשלה לפני התיקון ועברה לאחריו.
4. **היקף**: cherry-pick בלבד — התיקון המזערי, ללא ארגון קוד מחדש וללא שינויים נלווים.

משטח הכיסוי/אכיפת הסף שעליו דולג מאומת מחדש בהרצה המלאה הבאה בענף
הגרסה (תקינות רציפה של הגרסה) — המסלול מדלג על המתנה, לעולם לא על אימות.
הבדלים בבדיקות בלבד (כל הקבצים תחת `tests/`, ואף אחד מהם אינו תחת `tests/e2e/`) מדלגים על מטריצת
ה-E2E באופן אוטומטי, ללא כל תווית.

## רשימת תיוג מפורטת

### לפני השחרור

- [ ] כל ה-PRים המיועדים לגרסה זו מוזגו אל `release/vX.Y.0`
- [ ] כל פריטי Linear/הבעיות הפתוחים עבור גרסה זו נסגרו או הועברו לאבן הדרך הבאה
- [ ] ה-CI תקין בענף `release/vX.Y.0`
- [ ] אין סמני `TODO(release)` בקוד: `grep -r "TODO(release)" src/ open-sse/`
- [ ] תמונת הבסיס של Docker מעודכנת (נכון לעכשיו `node:24.15.0-trixie-slim`)

### גרסה ויומן שינויים

- [ ] הפעילו `/version-bump-cc <patch|minor|major>` (מיומנות של Claude Code)
  - מעדכן את הגרסאות ב-`package.json`,‏ `electron/package.json`
  - יוצר מחדש את `CHANGELOG.md` מתוך שינויי git מאז התג האחרון
  - מעדכן את התגים ב-README.md
- [ ] סקרו ידנית את CHANGELOG.md ונקו הודעות commit לפי הצורך
- [ ] ודאו שסעיף ה-semver האחרון ב-`CHANGELOG.md` תואם לגרסה שב-`package.json`
- [ ] השאירו את `## [Unreleased]` כסעיף הראשון ביומן השינויים עבור עבודה עתידית
- [ ] עדכנו את `docs/openapi.yaml` ← הערך `info.version` חייב להיות זהה לגרסה שב-`package.json`

### איכות הקוד

- [ ] `npm run lint` — 0 שגיאות (האזהרות קיימות מראש)
- [ ] `npm run typecheck:core` — ללא בעיות
- [ ] `npm run typecheck:noimplicit:core` — ללא בעיות (מחמיר)
- [ ] `npm run check:cycles` — ללא תלויות מעגליות
- [ ] `npm run check:any-budget:t11` — במסגרת התקציב
- [ ] `npm run check:route-validation:t06` — ללא בעיות
- [ ] `npm run check:node-runtime` — סף זמן הריצה הנתמך מתקיים (`>=22.22.2 <23`,‏ `>=24.0.0 <27`, בהתאם ל-`SUPPORTED_NODE_RANGE` ב-`src/shared/utils/nodeRuntimeSupport.ts`; תואם ל-`engines` ב-`package.json`)

### בדיקות

- [ ] `npm run test:unit` — עובר
- [ ] `npm run test:vitest` — עובר (שרת MCP,‏ autoCombo, מטמון)
- [ ] `npm run test:coverage` — סף 60/60/60/60 מתקיים (הצהרות/שורות/פונקציות/הסתעפויות)
- [ ] `npm run test:integration` — עובר (אם השינויים נוגעים במסד הנתונים / מטפלים)
- [ ] `npm run test:combo:matrix` — עובר (מטריצת אסטרטגיות combo: מוכיחה באופן דטרמיניסטי את החלטות הבחירה של כל 19 אסטרטגיות הניתוב הציבוריות; יש להפעיל כאשר נוגעים בניתוב combo, בפתרון אסטרטגיה או בלוגיקת גיבוי)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **אופציונלי/ידני** (בדיקת עשן מול שירותים חיצוניים אמיתיים, המוגנת בשער; טוענת תמונת מצב לקריאה בלבד של מסד הנתונים מ-VPS‏ `root@192.168.0.15`; פונה לספקים אמיתיים, צורכת נקודות זכות; לעולם אינה מופעלת ב-CI; מדלגת באופן תקין ללא השער)
- [ ] `npm run test:combo:live:vps` — **אופציונלי/ידני** (בדיקת עשן חיה של שלב 3 ב-VPS:‏ 7 תרחישי HTTP מול שרת `.15` החי באמצעות Node ESM רגיל; דורשת `ssh root@192.168.0.15`; יוצרת/מוחקת רק צירופי `__live_test__*`; פונה לספקים אמיתיים; לעולם אינה מופעלת ב-CI)
- [ ] `npm run test:e2e` — עובר (שינויי ממשק משתמש)
- [ ] `npm run test:protocols:e2e` — עובר (שינויי MCP/A2A)
- [ ] `npm run test:ecosystem` — עובר

### Hooks (מאומתים על ידי Husky)

ה-hooks של Husky נמצאים ב-`.husky/` ומופעלים אוטומטית במהלך פעולות git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** שערים דטרמיניסטיים מהירים — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (הופעל ב-2026-06-13). אינו כולל בכוונה את `test:unit` (איטי; מכוסה על ידי משימת ה-CI‏ `test-unit`).
  - הפעילו את `npm run test:unit` ידנית לפני דחיפת ענפי גרסה.

אם hook נכשל: תקנו את הבעיה הבסיסית, אל תעקפו באמצעות `--no-verify`.

### Conventional Commits

כל ה-commits המיועדים לגרסה חייבים להיות בתבנית `type(scope): subject`.

**סוגים תקינים:** `feat`,‏ `fix`,‏ `refactor`,‏ `docs`,‏ `test`,‏ `chore`,‏ `perf`,‏ `style`,‏ `ci`

**תחומים תקינים:** `db`,‏ `sse`,‏ `oauth`,‏ `dashboard`,‏ `api`,‏ `cli`,‏ `docker`,‏ `ci`,‏ `mcp`,‏ `a2a`,‏ `memory`,‏ `skills`,‏ `cloud-agent`,‏ `guardrails`,‏ `compression`,‏ `auto-combo`,‏ `resilience`,‏ `providers`,‏ `executors`,‏ `translator`,‏ `domain`,‏ `authz`

שינויים שוברים: הוסיפו סיומת `BREAKING CHANGE:` או `!` לאחר התחום (לדוגמה, `feat(api)!: drop /v0`).

### תיעוד

- [ ] `npm run check:docs-sync` עובר (מופעל אוטומטית על ידי pre-commit)
- [ ] `npm run check:docs-all` עובר (בדיקת־על: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` מסתיים עם קוד 0 — חוזה משתני הסביבה בין הקוד ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` נשאר תקין
- [ ] `npm run check:doc-links` מסתיים עם קוד 0 — אין הפניות Markdown פנימיות שבורות לאחר הארגון מחדש
- [ ] `docs/architecture/ARCHITECTURE.md` נבדק לאיתור סטיות באחסון/זמן ריצה
- [ ] `docs/guides/TROUBLESHOOTING.md` נבדק לאיתור סטיות במשתני סביבה ובתפעול
- [ ] אם `.env.example` השתנה: `docs/reference/ENVIRONMENT.md` עודכן
- [ ] אם לתכונה החדשה יש ממשק משתמש: `docs/guides/USER_GUIDE.md` מזכיר אותה
- [ ] אם לתכונה החדשה יש API: הקבצים `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` עודכנו
- [ ] אם התכונה החדשה היא מודול: קיים עבורה קובץ ייעודי `docs/<MODULE>.md`
- [ ] אם זהו שינוי שובר תאימות: `docs/guides/TROUBLESHOOTING.md` כולל הערת מיגרציה

### בינאום

- [ ] `npm run i18n:check` מסתיים עם קוד 0 — מצב התרגום (`.i18n-state.json`) מסונכרן עם מסמכי המקור (אין מקורות שסטו במצב מחמיר; התרעה במצב אזהרה קבילה עבור תיקונים של הרגע האחרון במסמכים, אך הערך צריך להיות 0 לפני התיוג)
- [ ] `npm run i18n:check-ui-coverage` מסתיים עם קוד 0 — כל שפת ממשק משתמש נמצאת ברף הכיסוי של 80% ומעלה
- [ ] `npm run i18n:sync-ui:dry` מדווח על 0 מפתחות חסרים בכל 42 השפות
- [ ] אם מסמכי המקור באנגלית השתנו, יש להריץ `npm run i18n:run` (דורש את `OMNIROUTE_TRANSLATION_API_KEY` בתוך `.env`) לפני התיוג
- [ ] אפשר לדחות תרומות תרגום לגרסה הבאה אם הן מינוריות (יש לעקוב אחריהן ב-CHANGELOG)

### מיגרציות מסד נתונים

- [ ] אם נוספו קבצים חדשים תחת `src/lib/db/migrations/`:
  - [ ] כל מיגרציה היא אידמפוטנטית (`CREATE TABLE IF NOT EXISTS` וכו׳)
  - [ ] המיגרציות עטופות בטרנזקציות
  - [ ] המספור תקין (ללא פערים ברצף)
- [ ] בדיקה בהתקנה חדשה: יש למחוק את `~/.omniroute/omniroute.db` ולהריץ `npm run dev`
- [ ] בדיקה בהתקנה קיימת: יש לגבות את מסד הנתונים, להריץ את המיגרציה ולאמת את הסכמה
- [ ] קובצי WAL (`-wal`, `-shm`) מטופלים כראוי אם המיגרציה משכתבת טבלאות

### קטלוג ספקים (מאומת באמצעות Zod)

- [ ] הסכמה של Zod בקובץ `src/shared/constants/providers.ts` תקפה בזמן הטעינה
  - [ ] לכל הספקים יש את השדות הנדרשים (`id`, `label`, `kind` וכו׳)
  - [ ] `freeNote` מסופק עבור ספקים חינמיים חדשים
  - [ ] לספקי OAuth יש `oauthConfig` הרשום בתוך `src/lib/oauth/constants/oauth.ts`
- [ ] אם נוסף ספק חדש: קיים executor תואם תחת `open-sse/executors/`
- [ ] אם הפורמט אינו OpenAI: קיים מתרגם תחת `open-sse/translator/`
- [ ] המודלים רשומים בתוך `open-sse/config/providerRegistry.ts`
- [ ] בדיקות יחידה תחת `tests/unit/` מכסות סיווג וניתוב של ספקים

### שולחן עבודה (Electron)

אם `electron/` השתנה:

- [ ] `npm run electron:smoke:packaged` עובר
- [ ] תוצרי בנייה נבדקו עבור לפחות אחת מהאפשרויות `:win`, `:mac`, `:linux`
- [ ] תעודות חתימת הקוד לא פגו (אם מתבצעת חתימה)
- [ ] הגרסה בקובץ `electron/package.json` תואמת לגרסה בקובץ `package.json` שבשורש
- [ ] המצביע לערוץ העדכון האוטומטי עודכן אם ההפצה מתבצעת לערוץ `stable`

### פריסת תוצרי הבנייה

המאגר משתמש בשלוש תיקיות פלט נפרדות — לעולם אין לבלבל ביניהן:

| תיקייה    | מטרה                                                       | במעקב?           |
| --------- | ---------------------------------------------------------- | ---------------- |
| `src/`    | קוד המקור של היישום (TypeScript / TSX)                     | כן               |
| `.build/` | תוצרי ביניים של הבנייה — פלט `next build` (`distDir`)      | לא (מוחרג מ-git) |
| `dist/`   | חבילת npm מוכנה להפצה — מורכבת על ידי `assembleStandalone` | לא (מוחרג מ-git) |

> **הערה למפעיל:** תיקיית תמונת ה-VPS המרוחק נשארת `/usr/lib/node_modules/omniroute/app/`.
> רק פלט הבנייה **בתוך המאגר** הועבר (`app/` → `dist/`). כלי הפריסה מסנכרנים באמצעות rsync את
> תוכן `dist/` אל תיקיית `app/` המרוחקת — אין צורך בשינויים לנתיבי ה-VPS.

**תהליך בנייה יחיד:**

```
npm run build:release
  └─ rm -rf .build dist          (ניקוי)
  └─ next build → .build/next/   (תוצרי ביניים)
  └─ assembleStandalone          (מעתיק standalone + static + public + natives אל dist/)
  └─ writes dist/BUILD_SHA       (סמן HEAD)
```

אין להריץ `npm run build` ולאחר מכן בנפרד `npm run build:cli` לצורך פריסה — יש להשתמש
ב-`npm run build:release`, שמבצע בנייה נקייה מחדש + יצירת סמן בפקודה אחת.

### אימות תוצר

- [ ] `npm run build:release` מצליח ו-`dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` נקי — ללא `app.__qa_backup`,‏ `scripts/scratch`,‏ `package-lock.json` או שאריות מקומיות אחרות
- [ ] `dist/server.js` קיים לאחר הבנייה

### תיוג והפצה

- [ ] יש להריץ `/generate-release-cc` (כלי של Claude Code):
  - יוצר תגית `vX.Y.Z`
  - דוחף את התגית ואת הענף
  - פותח הפצה ב-GitHub עם גוף יומן השינויים
  - מצרף מתקיני Electron (אם נבנו)
- [ ] לחלופין, באופן ידני:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### פריסה

כלי הפריסה משתמשים בתהליך rsync קל — ללא `npm pack` וללא `npm i -g`:

- [ ] יש להשתמש בכלי הפריסה המתאים ליעד:
  - `/deploy-vps-local-cc` — VPS מקומי (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS של Akamai‏ (69.164.221.35)
  - `/deploy-vps-both-cc` — שניהם
- [ ] לפני הפריסה, יש לוודא כי `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] הבנייה חייבת לרוץ במקום שבו `node_modules` הוא אמיתי (ה-checkout הראשי או worktree שבו הופעל `npm ci` — לא worktree המבוסס על קישור סמלי)
- [ ] בדיקת עשן של המופע שנפרס:
  - יש לפתוח את `/dashboard/health` → ולבדוק שמחרוזת הגרסה תואמת להפצה
  - יש להריץ בקשת `/v1/chat/completions` מול ספק מוכר
  - יש לוודא כי `/api/monitoring/health` מחזיר מפסקי זרם במצב `CLOSED`
  - יש לוודא שתעבורות MCP מגיבות (`/mcp` ב-HTTP,‏ `/mcp-sse` ב-SSE)

### לאחר ההפצה

- [ ] הפעילו את `/capture-release-evidences-cc` (מיומנות של Claude Code)
  - לוכדת צילומי מסך/הקלטות בפורמט WebP של תכונות חדשות
  - מצרפת אותם להערות הגרסה / לפוסט בבלוג
- [ ] עדכנו את GitHub Discussions / Discord בהכרזת הגרסה
- [ ] פתחו אבן דרך לגרסה הבאה
- [ ] אם קריטי: נעצו את הדיון או פרסמו ב-`news.json` עבור כרזה בתוך האפליקציה

### שער ההשקה הציבורית של Radar

הכרזת Radar הוכנסה במכוון עם `active: false`. ההפעלה היא שינוי נפרד
שיבוצע לאחר הצגת ראיות לכל אחד מהסעיפים הבאים:

- [ ] כל בקשות המשיכה המדורגות של Radar מוזגו, וה-CI של קצה הגרסה ירוק
- [ ] פרסו ובצעו בדיקת עשן לנתיבי Radar בקוד הפתוח, כאשר `RADAR_ENABLED` עדיין כבוי כברירת מחדל
- [ ] בצעו בדיקת עשן ל-`GET /planos`, ל-`/termos`, ל-`/privacidade` ול-`/reembolso` במארח Radar שצוין
- [ ] תעדו את זהות המפעיל, פרטי הקשר והכתובת, וכן סקירה משפטית שאושרה על ידי הבעלים, בשירות הפרטי
- [ ] בדקו את Stripe Checkout ואת ה-webhook החתום במצב בדיקה בלבד
- [ ] בדקו מסירה אחת של דוא"ל עסקי מוצפן באמצעות השולח/הדומיין המאושר
- [ ] הוכיחו שחזור מגיבוי והרצת מחקר אחת תחת פיקוח ועם תקרת תקציב
- [ ] אשרו את מדיניות הבדיקה של BRL/PIX לפני קבלת ראיות לתרומה
- [ ] הפעילו את Checkout הציבורי רק לאחר השלמת השערים הקודמים, ולאחר מכן הפעילו את המזהה החדש ב-`news.json`
- [ ] ודאו שהכרזה בדף הבית משתמשת בנוסח מותאם לשפה ושמזהה חדש מופיע מחדש לאחר שמזהה ישן יותר נדחה

## בדיקות עשן לשירותים משובצים (v3.8.4+)

לפני הפצת גרסה כלשהי הכוללת שינויים בשירותים משובצים, יש לוודא:

### אתחול עם מסד נתונים חדש (מזהה התנגשויות מיגרציה — נוסף לאחר התיקון החם של v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — יש להמתין 10 שניות לאתחול
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` מחזיר `"9router"` (לא 404 ולא 500). מאשר שהמיגרציה `071_services.sql` הוחלה ושהרשומה אותחלה.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` מחזיר 3 שורות.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` מחזיר 2 שורות (מוודא שהמיגרציה `070_webhooks_kind_metadata.sql` הוחלה).
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
- [ ] התקנה בסביבה ללא `npm` ב-PATH מחזירה 500 עם הודעת שגיאה ידידותית (ללא stack trace)

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

- [ ] `omniroute --tray` עולה ב-macOS (כאשר systray2 מותקן תחת `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` עולה ב-Linux (דורש DISPLAY; שגיאה מסודרת אם אינו מוגדר)
- [ ] `omniroute --tray` עולה ב-Windows (באמצעות PowerShell NotifyIcon, ללא קבצים בינאריים נוספים)
- [ ] `omniroute config tray enable` יוצר רשומת הפעלה אוטומטית; השבתה מסירה אותה
- [ ] `npm install -g omniroute@<this-version>` מריץ postinstall ללא יציאה קטלנית
- [ ] נתיב העדכון שומר על תלויות אופציונליות: `omniroute update --apply` והמעדכן האוטומטי
      מריצים `npm install -g … --include=optional` כדי ש-`optionalDependencies` (better-sqlite3,
      keytar, tls-client ומחסנית ה-SLM של llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) ישרדו עדכון. שכבת ה-SLM מסוג ultra עם `modelPath` זקוקה גם למודל
      tinybert, שמורד אוטומטית אל `${DATA_DIR}/models/llmlingua` בשימוש הראשון. לאחר מכן postinstall
      (`scripts/build/colocateOptionals.mjs`) ממקם יחד את הסגירות האופציונליות של SLM בתוך
      `dist/node_modules`, כך שה-worker פותר מופע יחיד של `@huggingface/transformers` ^4.2.0
      — ה-trace העצמאי מאגד רק את transformers, ולא את התלויות האופציונליות המיובאות דינמית,
      ולכן בלעדי זאת ה-worker יטען את llmlingua-2 מול transformers שבשורש
      ושכבת ה-SLM תיכשל באופן שקט ותעבור למצב פתוח.
- [ ] `omniroute status` פועל ללא `.env` (נתיב אסימון CLI, loopback בלבד)
- [ ] `curl http://localhost:20128/api/shutdown` מחזיר 401 (נתיב מוגן תמיד)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` מחזיר 401 (הגנת loopback)
- [ ] סביבת הריצה של SQLite מזוהה כ-`bundled` בהרצה הראשונה (הקובץ הבינארי המצורף תקין עבור הפלטפורמה)
- [ ] סביבת הריצה של SQLite חוזרת ל-`runtime` כאשר `node_modules/better-sqlite3` נמחק
- [ ] מסנן Smart MCP דוחס פלט אמיתי של `playwright-mcp browser_snapshot` (הפחתה של ≥50%)
- [ ] כל 10 הקבצים `skills/omniroute*/SKILL.md` זמינים לציבור דרך כתובת URL גולמית של GitHub
- [ ] אשף הקליטה מציג את שלב הסיור בין השכבות "כיצד זה עובד" בהגדרה חדשה
- [ ] וידג'ט כיסוי השכבות בלוח הבקרה הראשי מציג ספירות של שכבות מוגדרות/פעילות

---

## חזרה לגרסה קודמת

אם יש בעיה קריטית בגרסה שפורסמה:

1. `gh release edit vX.Y.Z --prerelease` (מסמן אותה כגרסה שאינה העדכנית ביותר)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (רק אם משתמשים עדיין לא אימצו אותה)
3. לחלופין: תיקון חם ב-`release/vX.Y.0` ← גרסת תיקון `vX.Y.(Z+1)`
4. יש לעדכן מייד ב-GitHub Discussions וב-Discord

## כללים מחייבים

- לעולם אין לבצע commit ישירות אל `main`
- לעולם אין להשתמש ב-`git push --force` עבור `main` או ענפי `release/*`
- לעולם אין לדלג על ה-hooks של Husky‏ (`--no-verify`)
- לעולם אין לבצע commit של סודות, פרטי גישה או קובצי `.env`
- כיסוי הקוד חייב להישאר ≥60/60/60/60 (פקודות/שורות/פונקציות/הסתעפויות)
- בעת שינוי קוד ייצור ב-`src/`,‏ `open-sse/`,‏ `electron/` או `bin/`, יש תמיד להוסיף בדיקות או לעדכן אותן

## בדיקת סנכרון אוטומטית

יש להריץ מקומית את מנגנון ההגנה על סנכרון התיעוד לפני פתיחת PR:

```bash
npm run check:docs-sync
```

גם CI מריץ בדיקה זו ב-`.github/workflows/ci.yml` (משימת lint).
