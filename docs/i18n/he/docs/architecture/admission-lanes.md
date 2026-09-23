# Admission lanes (#9654) — two lane systems, what gates each, where each reports (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

ל-OmniRoute יש **שתי** מערכות נתיבים מקומיות לתהליך, בעלות תחומי אחריות שונים. הן
משלימות זו את זו; על המפעילים לדעת על איזו מהן הם מסתכלים.

## 1. בקרת קבלה כלל-תהליכית ברמת הבתים (`chatBodyAdmission.ts`)

- **תחום אחריות:** נתיב גוף הבקשה המאוחסן בזיכרון/ערימת הזיכרון עבור `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` ושאר הנתיבים בעלי מבנה של צ'אט. מגן
  מפני הגברה של צריכת ערימת הזיכרון עקב גופי בקשות גדולים של סוכני תכנות (#4380).
- **בקר גלובלי יחיד לכל התהליך, ולא נתיבים נפרדים לכל מפתח (#10110).** כל מפתח API
  (בצורת גיבוב) או הפעלת `anonymous` מתקבלים מול **אותה** מכסה משותפת —
  מזהה ההפעלה המגובב משמש אך ורק כמפתח תזמון הוגן (שיגור בסבב
  בין הממתינים), ולעולם לא כחלוקה של הקיבולת. גרסה קודמת של מסמך זה
  תיארה נתיבים נפרדים לכל מפתח, עם קיבולת עצמאית; מודל זה
  הוסר ב-#10110 משום שהוא אפשר לפרטי הזדהות מזויפים ולא מאומתים להכפיל
  את המגבלה הכלל-תהליכית.
- **שער (#503-fanout): מכסת קליטה בבתים הנגזרת אוטומטית, ולא מספר קבוע של
  בקשות.** מגבלת מספר הבקשות הישנה `CHAT_MAX_HEAVY_IN_FLIGHT` (ברירת המחדל הייתה `1`
  לפני תיקון זה) צמצמה פריסה מקבילית של סוכני תכנות (מספר תתי-סוכנים/כלי CLI,
  עם גופים שגודלם בדרך כלל מעל 256 KB) למקביליות אפקטיבית של כ-1, וגרמה
  לתגובות 503 תחת עומס רגיל לחלוטין. כעת היא מגבילה רק כאשר מפעיל מגדיר במפורש
  את `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. כאשר היא אינה מוגדרת, הקבלה מוגבלת במקום זאת
  על ידי `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — מכסה הנגזרת אוטומטית מתקרת
  הזיכרון האמיתית של התהליך (`src/shared/middleware/admissionBudget.ts`):
  25% מהערך המחמיר יותר מבין מגבלת ערימת הזיכרון של V8 לבין מגבלת cgroup/קונטיינר כלשהי,
  בחלוקה למקדם הגברה זמנית של פי 8, ובתחום שבין 8 MiB
  ל-2 GiB. דריסות מפורשות משתמשות באותם גבולות. המנגנון מתאים את עצמו
  מקונטיינר של 512 MB ועד מחשב שולחני עם 32 GB, ללא כוונון משתני סביבה. גוף בקשה שאינו יכול
  להיכנס במסגרת המכסה האפקטיבית נכשל מייד עם `413 body_exceeds_budget`;
  רק תחרות בין גופי בקשות שכל אחד מהם ניתן לטיפול בפני עצמו נכנסת לתור ההוגנות
  המוגבל. עוקב חי אחר לחץ משאבים המבוסס על מספר אותות (יחס ערימת הזיכרון של V8,
  ‏cgroup, ‏PSI, אירועי OOM — `open-sse/utils/resourcePressurePolicy.ts`) מקצר
  את ההמתנה המוגבלת תחת לחץ `high` ומשיל עומס מייד עם
  `503 resource_pressure` תחת לחץ `critical`, עוד לפני קליטת בתים כלשהם.
  ‏PSI נקרא מתוך `memory.pressure` של ה-cgroup של יחידה זו, כאשר הוא קיים
  (`open-sse/utils/resourcePressureSampler.ts`); ‏`/proc/pressure/memory` הוא
  כלל-מארחי ומשמש רק כברירת מחדל חלופית על שרת פיזי / cgroup v1, כך שמארח
  המשתמש בזיכרון החלפה אינו יכול לגרום לקונטיינר לא פעיל להחזיר 503.
- **כוונון:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — דריסה של מכסת הבתים הנגזרת אוטומטית
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — מגבלת מספר הבקשות הישנה, בהצטרפות מפורשת בלבד
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — זמן המתנה בתור לפני 503 (ברירת מחדל 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — שסתום ערימת זיכרון לבתים שבתור (ברירת מחדל 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — הוצאו משימוש
    ואינם מבצעים פעולה מאז #10110 (מתקבלים לצורך תאימות תצורה, אך המערכת מתעלמת מהם)
- **דיווח:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — כולל
  התוספות של #503-fanout:‏ `inflightBytes`, ‏`maxInflightBytes`, ‏`budgetSource`
  (`v8_heap` | `cgroup` | `override`), ‏`pressureSeverity` ו-`countCapEnabled`
  (ערכו false בפריסת ברירת מחדל — מאשר שמכסת הבתים, ולא מגבלת
  הספירה הישנה, היא שמגבילה בפועל).

## 2. נתיבים וירטואליים מסתגלים בזמן ריצה (`open-sse/services/admission`)

- **תחולה:** בקרת קבלה לפי מפתח דייר לצורך שיגור לספק — עלות תור, התאמת
  מגבלות מונחית-השהיה, ניהול תורים בנתיבים ומדדי נתיבים.
- **הפעלה:** **בהצטרפות מפורשת.** מושבת אלא אם `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. בלעדיו,
  הבקר המסתגל שומר על התנהגות התור המשותף (קריטריון 1 של #9654 מתקיים רק
  לאחר שמפעיל מערכת מפעיל נתיבים).
- **כוונון:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + תצורה מסתגלת (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **דיווח:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (מזהי נתיבים אטומים, לעולם לא
  מפתחות גולמיים), ו-`virtualLanes` — הדגל המוסמך בתמונת המצב לכך ש״הנתיבים פעילים״.

## 3. בדיקות fan-out — בקרת קבלה לכל יעד עבור combo/fusion (#9654 גל 2)

combo (עדיפות / round-robin) ו-fusion מפצלים N יעדי מודל תחת בקשת אב אחת.
מאז #9654 גל 2, **כל יעד fan-out עובר בקרת קבלה לפני השיגור** באמצעות
בדיקה לכל יעד (`PerTargetAdmissionHook`, שנבנית על ידי `createPerTargetAdmissionHook`)
מול נתיב הדייר של **בקשת האב**.

- **תחולה:** כל יעד fan-out שנשלח על ידי combo,‏ fusion ומנוע הכאוס.
  מערכת 1 (ברמת הבתים) אינה מושפעת — היא לעולם אינה בודקת יעדי fan-out.
- **הפעלה:** **בהצטרפות מפורשת יחד עם מערכת 2.** אינה עושה דבר כאשר
  `OMNIROUTE_CHAT_VIRTUAL_LANES` אינו מוגדר — במצב זה בקשת האב כבר מחזיקה
  בהרשאת התור המשותף, ולכן בדיקה תגרום לספירה כפולה ולדחיית יעדי combo.
- **סמנטיקה:**
  - **ללא חסימה באופן מוחלט — דילוג, לעולם לא המתנה בתור.** `maxWaitMs 0`: נתיב מלא
    גורם לדילוג על היעד, ומנגנון הגיבוי של combo (או פאנל השורדים של fusion)
    משרת במקומו. זה מכוון: יעד fan-out הוא עבודה עודפת, והכנסתו לתור מעמיסה
    יותר עומס בדיוק על הגודש שהנתיבים נועדו לעצור. לכן `defaultMaxWaitMs` חל על
    **בקשת האב בלבד**; בדיקות fan-out לעולם אינן ממתינות, ובכוונה **אין אפשרות כוונון**
    שתגרום להן להמתין (היסטוריית הבעיה מראה שאפשרויות המתנה יצרו את קבוצת שגיאות
    ה-502/504 ההמוניות ש-#9654 מונע — יש לשקול זאת מחדש רק אם מפעיל מערכת מדווח
    שדילוג על יעדי fan-out פוגע באיכות התגובה).
  - **שחרור בעת קבלה.** בדיקה שהתקבלה משחררת את ההרשאה שלה מיד: זהו
    שער קיבולת, לא החזקה. ההרשאה של בקשת האב מכסה את ה-fan-out; החזקת N
    הרשאות נוספות תנפח את העלות הפעילה המשותפת ותדחה דיירים אחרים. זהו מאמץ מיטבי,
    לא שמירת מקום: הנתיב יכול להתמלא מחדש בין הבדיקה לשיגור, ולכן תחת
    תחרות כבדה השער עשוי לאשר כניסה לנתיב ששוב מלא עד
    למועד שיגור היעד.
  - **תמחור לפי גוף ה-fan-out בפועל.** הבדיקה מעריכה את העלות מתוך
    הגוף האמיתי של היעד — כולל מחלקת הבקשה הנגזרת מהדגל `stream` שלו,
    בדיוק כמו בנתיב האב — כך שחברי פאנל fusion (`stream: false`)
    מתומחרים לפי מחלקת אי-הזרמה שבה ישתמשו בפועל, ויעדי priority/RR
    לפי מה שהמשתמש ביקש.
- **דיווח:** דילוג של בדיקה לאחר היעד הראשון מגדיל את `fallbackCount` של combo
  עבור הבקשה (בהתאם לסמנטיקת הגיבוי הקיימת; מופיע ביומני combo);
  fusion מחזיר 503 כאשר מדלגים על כל חברי הפאנל. כיום **אין מונה מצטבר**
  (למשל `virtualFanoutSkipped`) בתמונת המצב — אם מפעיל מערכת מדווח שאין
  באפשרותו לדעת באיזו תדירות שער הנתיב מדלג על יעדי fan-out, זהו הטריגר
  להוספת מונה כזה.

## איזה מהם מוצג בלוח המחוונים

- `adaptiveAdmission.laneCount` / `laneTenants` → **נתיבים וירטואליים מסתגלים** (מערכת 2).
- `adaptiveAdmission.virtualLanes === true` → בדיקות הפיצול של סעיף 3
  פעילות גם הן. מטען שבו `virtualLanes` חסר או מוגדר כ־`false` פירושו
  ש־`OMNIROUTE_CHAT_VIRTUAL_LANES` אינו מוגדר — הנתיבים ברמת הבתים (מערכת 1)
  עדיין פעילים, אך שום דבר תחת `adaptiveAdmission` (וגם שום הגבלת פיצול)
  אינו בתוקף עד להפעלתו.

## מדוע שניהם קיימים

הנתיבים ברמת הבתים מגבילים את מסלול הניתוח/דחיסה עתיר הזיכרון; הנתיבים המסתגלים
מגבילים את עלות הניתוב לכל דייר. קריטריון 1 של #9654 ("פרץ של הפעלה אחת אינו גורם
להפעלה אחרת לקבל 503") נאכף ללא תנאי על ידי מערכת 1, ועל ידי מערכת 2 לאחר שהצטרפות
מפורשת מופעלת.

## 4. `/v1/responses` ארוך בתהליך יחיד (מרווח קיבולת תקין)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) הוסיף את
`tryAcquireHealthyHeadroom`, כך שבקשה שנייה בעלת מבנה כבד מתקבלת
כאשר ה־heap נמוך מ־`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. מסלול BYTE
שבו משתמש `admitChatRequest` (גופי בקשה בגודל ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
ברירת מחדל של 256 KiB, כולל `POST /v1/responses`) משתמש באותו מנגנון חריגה.

זהו המתכון הנתמך ל**תהליך יחיד** עבור יותר משני חיבורי SSE ארוכים מקבילים אל
`/v1/responses`: הגדילו את הקיבולת הראשית ואת מרווח הקיבולת התקין רק ככל שה־heap
ותקציב הבתים הכולל בתהליך לבקשות פעילות (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) מאפשרים. עשרות לקוחות SSE ארוכים (40–50) הם שאלה של תקציב זיכרון,
ולא מגבלת מוצר קשיחה של „מקסימום 2”. heap הנתון ללחץ עדיין דוחה בקשות באמצעות
`503` שניתן לנסות שוב, כדי ש־#7849 לא יחזור.

כדי **להכפיל heaps**, הפעילו N מופעים עצמאיים של `DATA_DIR`‏ (#11024). לעולם אל תפעילו
`replicas > 1` על קובץ SQLite יחיד (#10350). סעיף זה אינו פתיחה מחדש של
מתכון ההרחבה האופקית באמצעות DATA_DIR.
