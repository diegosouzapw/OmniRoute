# Quota Sharing Engine (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **הפניה למסמך**: `docs/routing/QUOTA_SHARE.md`
> חלק מקבוצה B (תוכניות 16 + 22).

---

## סקירה כללית

מנוע שיתוף המכסות מחלק באופן הוגן מכסה מבוססת-זמן של ספק (למשל חלון של 5 שעות ב-Codex,
או 1500 בקשות לשעה ב-Kimi) בין מספר מפתחות API המשתפים את אותו
חיבור.

**הבעיה שהוא פותר:** OmniRoute מנתב מפתחות API רבים דרך אותו חשבון
אצל הספק שמנגד. ללא לוגיקת שיתוף, עומס פתאומי ממפתח A עלול למצות את
מכסת הספק לאותה שעה, ולהותיר את המפתחות B ו-C חסומים עד לאיפוס החלון.
המנוע מונע זאת באמצעות:

1. מעקב אחר הצריכה המתגלגלת של כל מפתח לפי ממד (%, בקשות, טוקנים, $).
2. החלת אלגוריתם חלוקה הוגנת משמר-עבודה: מפתח רשאי לשאול מההקצאות שאינן
   בשימוש, כל עוד המאגר הגלובלי אינו רווי.
3. אכיפת התוצאה בנתיב הקריטי (`chatCore.ts`) לפני שהבקשה
   מגיעה למבצע הבקשות שמנגד.

---

## אלגוריתם: חלוקה הוגנת משמרת-עבודה

ממומש ב-`src/lib/quota/fairShare.ts`.

### מצבים

| תנאי                                       | מצב       | התנהגות                                                |
| ------------------------------------------ | --------- | ------------------------------------------------------ |
| `globalUsedPercent < saturationThreshold`  | **נדיב**  | המפתח רשאי לשאול עד למגבלה הגלובלית פחות הצריכה הכוללת |
| `globalUsedPercent >= saturationThreshold` | **מחמיר** | אכיפה מחמירה של ההקצאה ההוגנת הפרטנית                  |

ברירת המחדל היא `saturationThreshold = 0.5` (משתנה סביבה `QUOTA_SATURATION_THRESHOLD`).

### החלטה לפי ממד

עבור כל ממד פעיל במאגר, המנוע מחשב:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = הערך המתגלגל הנוכחי עבור מפתח זה (מתוך QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

לאחר מכן:

- **`policy = hard`**: אם `consumed > fairShareAllowed` והמצב מחמיר → **חסימה**.
- **`policy = soft`**: אם `consumed > fairShareAllowed` והמצב מחמיר → **הטלת קנס** (הורדת עדיפות בשילוב; לעולם לא חסימה קשיחה).
- **`policy = burst`**: מתן אפשרות כל עוד קיימת קיבולת גלובלית פנויה, ללא קשר להקצאה ההוגנת.

### תקרה מוחלטת

`capValue` + `capUnit` בהקצאה מהווים תקרה קשיחה שאינה תלויה במצב או
במדיניות. כל ממד שבו `consumed >= capValue` תמיד **חוסם** את הבקשה.

### בדיקה רב-ממדית

בקשה נחסמת אם ממד **כלשהו** במאגר היה חוסם אותה. הממדים
בלתי תלויים — מיצוי של אחוזי 5 השעות אינו משפיע על ממד האחוזים השבועי.

### שאילה

במצב נדיב, מפתח שהקצאתו מנוצלת בחסר יכול להשתמש בעודף מההקצאות
הבלתי מנוצלות של מפתחות אחרים. הנוסחה היא:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

כאשר `consumedByOtherKeys = consumedTotal - consumedByThisKey`. התקרה הגלובלית
(`limit` של המאגר עבור אותו ממד) היא תמיד התקרה הקשיחה.

---

## מונה חלון נע

ממומש ב-`src/lib/quota/sqliteQuotaStore.ts` וב-`redisQuotaStore.ts`.

שני דליים לכל `(apiKeyId, dimensionKey)`:

- `curr`: הדלי הנוכחי (`floor(nowMs / windowMs)`)
- `prev`: הדלי הקודם (`curr - 1`)

הערך המתגלגל האפקטיבי:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**דיוק**: דיוק של כ-99%. השגיאה היא לכל היותר 1% מגודל החלון בנקודת
המעבר בין דליים (טבוע בקירוב המבוסס על שני דליים).

### מקביליות

מנהל ההתקן של SQLite: mutex בזיכרון לכל מפתח `(apiKeyId | dimensionKey)` מונע את
תנאי המרוץ של קריאה-שינוי-כתיבה. התבנית מקבילה למנגנון מניעת עדר-רועם ב-`src/sse/services/auth.ts`.

מנהל ההתקן של Redis: סקריפט Lua מסוג EVAL להגדלה אטומית — רץ כפקודת Redis יחידה.

---

## מנהלי אחסון

### SQLite (ברירת מחדל, ללא התקנה)

- טבלה: `quota_consumption` (ראו מיגרציה `073_quota_pools.sql` / `074_quota_consumption.sql`).
- האפשרות הטובה ביותר לפריסות של מופע יחיד.
- כל הנתונים נשמרים במסד הנתונים הקיים של OmniRoute ב-SQLite (`DATA_DIR/storage.sqlite`).

### Redis (אופציונלי, ריבוי מופעים)

- דורש את חבילת npm‏ `ioredis`.
- המונים נשמרים ב-Redis; המטא-נתונים (מאגרים/הקצאות) עדיין נשמרים ב-SQLite.
- האפשרות הטובה ביותר לפריסות מרובות רפליקות שבהן יש לשתף את המונים.

### מעבר בין מנהלי אחסון

דרך ממשק ההגדרות (`/dashboard/settings` ← Quota Store), או באמצעות משתני סביבה:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

להגדרה במסד הנתונים יש קדימות על פני משתני הסביבה. אם `driver=redis` אך כתובת ה-URL חסרה או
ש-`ioredis` אינו מותקן, המפעל חוזר ל-SQLite ומתעד אזהרה.

סדר בחירת מנהל האחסון:

1. הגדרת מסד הנתונים `quotaStore.driver`
2. משתנה הסביבה `QUOTA_STORE_DRIVER`
3. ברירת מחדל: `sqlite`

---

## ריבוי ממדים

למאגר יכולים להיות כמה ממדים. כל ממד עצמאי:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // התקרה הכוללת של המאגר עבור ממד זה
}
```

**דוגמה: תוכנית Codex**‏ (5h% + weekly%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

כדי שבקשה תאושר, עליה לעמוד בכל הממדים.

---

## פותר התוכניות

ממומש ב-`src/lib/quota/planResolver.ts`.

סדר קדימות (מהגבוה לנמוך):

1. **דריסה ידנית במסד הנתונים** — הטבלה `provider_plans`, לפי `connectionId`.
2. **קטלוג מוכר** — `src/lib/quota/planRegistry.ts` (נתונים בלבד).
3. **תוכנית ריקה** — ללא ממדים, נדרשת הגדרה ידנית.

### קטלוג מוכר

| ספק                   | ממדים                                                         |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, לא ידוע), `tokens/weekly`               |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | אין ברירת מחדל — נדרשת הגדרה ידנית                            |

---

## שילוב בצינור העיבוד

### הוק PRE‏ (`open-sse/handlers/chatCore.ts`)

רץ לפני המבצע במעלה הזרם, לאחר בדיקות האימות והמדיניות:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() לכל ממד
      → fairShare.decideFairShare()
      → אם נחסם → החזרת 429 (buildErrorBody, כלל קשיח מס' 12)
      → אם אושר + הורדת עדיפות → הגדרת quotaSoftPenalty=true במועמד
  → executor.execute()
```

**כשל פתוח**: אם `enforceQuotaShare` זורק שגיאה, הבקשה מורשית לעבור
עם רישום `pino.warn`. כך נמנע מצב שבו באג במנוע המכסות חוסם את כל
התעבורה.

### הוק POST (רישום צריכה)

לאחר תגובה מוצלחת:

```
executor מחזיר הצלחה
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() לכל ממד
      → כשל פתוח: שגיאות נרשמות כ-pino.warn ולעולם אינן מועברות ללקוח
```

**הערת סטייה**: אם `consume` נכשל לאחר התגובה, המונה המתגלגל סופר פחות מהצריכה בפועל.
אות הרוויה מהספק (למשל `anthropic-ratelimit-unified-5h-utilization`)
מתקן את האומדן הכולל בבקשה הבאה.

### קנס רך לשילוב (`open-sse/services/combo.ts`)

כאשר `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // ברירת המחדל היא 0.7
}
```

הקנס מוחל לאחר כל שאר גורמי הניקוד. הוא מפחית את ההסתברות שהשילוב האוטומטי
יבחר במפתח רווי, מבלי לחסום אותו באופן קשיח.

---

## סקירת ממשק המשתמש

### `/dashboard/costs/quota-share` — הדף הראשי של המאגרים

רכיבים (כולם תחת `src/app/(dashboard)/dashboard/costs/quota-share/`):

| רכיב                   | מטרה                                                                  |
| ---------------------- | --------------------------------------------------------------------- |
| `QuotaConceptCard`     | כרטיס מבוא המסביר למשתמשים חדשים על שיתוף מכסה                        |
| `CreatePoolModal`      | יצירת מאגר מכסה חדש (חיבור + שם + הקצאות ראשוניות)                    |
| `PoolCard`             | סיכום לכל מאגר: שם, חיבור, מספר הקצאות                                |
| `DimensionBar`         | עמודה מוערמת לכל ממד: החלק של כל מפתח + שימוש גלובלי                  |
| `AllocationTable`      | טבלה עם צריכה, חלק הוגן, גירעון/עודף ודגל שאילה                       |
| `BurnRateChart`        | תרשים קו של קצב צריכה לפי EMA ‏(Recharts בטעינה עצלה דרך `dynamic()`) |
| `EditAllocationsModal` | עריכת משקלי הקצאה, תקרות ומדיניות עבור מאגר                           |

ה-hooks של הדף:

- `usePools` — מאחזר את `GET /api/quota/pools` כל 30 שניות.
- `usePoolUsage` — מאחזר את `GET /api/quota/pools/[id]/usage` לפי דרישה.
- `useLocalStoragePoolMigration` — מופעל פעם אחת בעת הטעינה כדי להעביר נתוני LS ישנים.

### `/dashboard/costs/quota-share/plans` — הגדרת תוכנית ספק

- `ProviderPlanConfigClient.tsx`: תפריט נפתח לבחירת ספק, להצגת התוכנית שנקבעה
  (אוטומטית מהקטלוג או מדריסה ידנית) ולעריכת ממדים.
- השינויים נכתבים אל `PUT /api/quota/plans/[connectionId]`.
- מחיקה מחזירה לתוכנית מהקטלוג או לתוכנית ריקה.

---

## משתני סביבה

| משתנה                              | ברירת מחדל | תיאור                                                    |
| ---------------------------------- | ---------- | -------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`   | מנהל ההתקן לשימוש: `sqlite` או `redis`                   |
| `QUOTA_STORE_REDIS_URL`            | _(ריק)_    | כתובת URL של Redis, לדוגמה `redis://localhost:6379`      |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`      | 0..1; ערך `>= threshold` מפעיל מצב מחמיר                 |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`      | 0..1; מכפיל לציון משולב של מדיניות רכה                   |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`       | מספר הימים לפני ש-GC מסיר דליי `quota_consumption` ישנים |

הגדרות מסד הנתונים (`quotaStore.*`) עוקפות את משתני הסביבה.

---

## פתרון בעיות

### Redis מוגדר אך אינו מתחבר

ודאו ש-`ioredis` מותקן (`npm ls ioredis`) ושניתן לגשת אל `QUOTA_STORE_REDIS_URL`.
אם החיבור נכשל, ה-factory חוזר ל-SQLite (ונרשם ביומן ברמת `warn`).

### `peek` מחזיר נתונים מיושנים / מאפשר במקרה של כשל

אם `peek` זורק חריגה, `enforceQuotaShare` מתייחס לתוצאה כ-"allow" (מתיר במקרה של כשל).
בדקו ביומני `pino` רשומות של `quota:enforce` ושל `quota:factory` כדי לזהות
את שורש הבעיה.

### סטייה במונה הצריכה

אם השימוש בפועל אצל הספק שונה מהמונים, זה צפוי — לחלון ההזזה בן שני הדליים
יש שגיאה של כ-1% בגבולות החלון, ו-`consume` מופעל לאחר התגובה ללא המתנה לתוצאה.
אות הרוויה (`saturationSignals.ts`) קורא את שיעור הניצול האמיתי של הספק עם TTL של 30 שניות
ומתאים את `globalUsedPercent` בהתאם.

### המאגר מציג "אין נתונים" עבור קצב הצריכה

`computeBurnRate` דורש לפחות 2 דגימות היסטוריות. מאגרים חדשים ללא קריאות
`consume` קודמות יציגו `tokensPerSecond: 0` ו-`timeToExhaustionMs: null`.

---

## מעבר מ-localStorage

בעת הטעינה הראשונה של `/dashboard/costs/quota-share`, ה-hook‏ `useLocalStoragePoolMigration`
בודק:

1. `localStorage.getItem("omniroute:quota-share:pools")` אינו ריק.
2. `GET /api/quota/pools` מחזיר `[]` (מסד הנתונים ריק).

אם שני התנאים מתקיימים, הוא שולח כל מאגר ישן אל `POST /api/quota/pools` באצווה,
ולאחר מכן מסיר את המפתח מ-localStorage. תהליך ההעברה הוא אידמפוטנטי: תנאי 2 מונע
העברה חוזרת.

---

## סיווג אסטרטגיה פנימית

`quota-share` היא אסטרטגיית ניתוב **פנימית בלבד** (`INTERNAL_ROUTING_STRATEGY_VALUES` בתוך
`src/shared/constants/routingStrategies.ts`). היא משמשת באופן בלעדי שילובי מאגרים מסוג
`qtSd/` שהמערכת יוצרת, ומוחרגת במכוון מ-`ROUTING_STRATEGY_VALUES`, כך שלעולם אינה
מופיעה כאפשרות לבחירת המשתמש בממשק המשתמש או ב-API.

---

## כיסוי בדיקות

מנוע quota-share כולל שתי שכבות של כיסוי אוטומטי:

| חבילת בדיקות      | פקודה                                                                  | מה היא מכסה                                                                                                                                                                            |
| :---------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| יחידה (29 בדיקות) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | מתזמן DRR, חסימה בעת רוויה, מגבלות מקביליות, חישובי fairShare, תור של עומס ממתין                                                                                                       |
| מטריצת אינטגרציה  | `npm run test:combo:matrix`                                            | החלטת ניתוב מקצה לקצה דרך צינור השילובים האמיתי; הוגנות DRR + הורדת עדיפות בעת רוויה באמצעות ממשקים חיים (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

מטריצת האינטגרציה פועלת ב-CI לצד כל 19 האסטרטגיות הציבוריות. ניתן להריץ את חבילת בדיקות
היחידה באופן עצמאי.

---

## סיכום סכמת מסד הנתונים

שלוש טבלאות שנוספו באמצעות המיגרציות `078`, `079` ו-`085`:

- `quota_pools` + `quota_allocations` — הגדרות מאגרים והקצאות לכל מפתח.
- `quota_consumption` — מונים מתגלגלים בני 2 דליים לכל `(apiKeyId, dimensionKey)`.
- `provider_plans` — דריסות ידניות של תוכניות ספקים (ממדים בפורמט JSON לכל connectionId).

כל הטבלאות נוספו באמצעות מיגרציות אידמפוטנטיות מסוג `CREATE TABLE IF NOT EXISTS`.
