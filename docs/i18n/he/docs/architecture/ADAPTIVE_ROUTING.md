# Adaptive Routing: Routing Events, Quality Feedback & Explainability (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

מסמך זה מתאר את תשתית הניתוב האדפטיבי מונחה-המשוב שנוספה ל-
OmniRoute. היא מצומצמת במכוון: היא מציגה ערוץ מתועד של תוצאות ניתוב,
אות איכות מקוון שמזין את מנגנון הניקוד הקיים של auto-combo, מייצא
OpenTelemetry אופציונלי ונקודת קצה להסברתיות. היא **אינה**
מחליפה את מערך העמידות הקיים (מפסק זרם, השהיית חיבור,
נעילת מודל, מטריצת תקינות, טייס אוטומטי) — אלא משלימה אותו.

## 1. הקשר ארכיטקטוני

OmniRoute הוא מישור נתונים הכולל **נתיב חם לבקשות** ו**מישור בקרה/מודיעין**.
הנתיב החם חייב להישאר מהיר, חסכוני בזיכרון, אסינכרוני, עמיד וצפוי.
הערכה, ניקוד איכות, ניסויים וניתוח היסטורי שייכים למישור הבקרה.

```
סוכן AI / סביבת פיתוח
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   מישור נתונים (מהיר, סינכרוני, בזיכרון)
│  ניתוב / מעבר כשל  │
│  תקינות / מעקה בטיחות │
│  מטמון / הזרמה     │
└──────────┬──────────┘
           │ RoutingEvent (שגר-ושכח, ~0.2µs)
           ▼
┌─────────────────────┐
│  יעדי משוב          │   מישור בקרה (אסינכרוני, לפי מיטב היכולת)
│  עוקב איכות         │
│  מייצא OTel         │
│  מאגר הסברים        │
└──────────┬──────────┘
           ▼  ציון איכות
      מנגנון הניקוד של auto-combo
```

### מה כבר היה קיים (נבדק, לא שוכפל)

| מושג                            | מימוש קיים                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ |
| זמינות (האם ניתן לשלוח תעבורה?) | מפסק זרם (CLOSED/DEGRADED/OPEN/HALF_OPEN, נשמר במסד הנתונים), השהיית חיבור, נעילת מודל                 |
| דיווח תקינות                    | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                |
| תעבורת צל                       | `open-sse/services/combo/shadowRouting.ts`                                                             |
| מעקות בטיחות                    | `src/lib/guardrails/` (ווים לפני/אחרי)                                                                 |
| מטמון מדויק                     | `src/lib/semanticCache.ts` (מבוסס חתימה)                                                               |
| מעריכים / ניתוב מונחה-הערכות    | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                   |
| יכולת הסבר של החלטות Combo      | `open-sse/services/combo/decisionTrace.ts`                                                             |
| אירועי לוח מחוונים בזמן אמת     | `src/lib/events/eventBus.ts` (ערוץ התראות לממשק המשתמש, מטענים מסוג `unknown`, היסטוריה של 100 רשומות) |

שכבת אירועי הניתוב **אינה** מימוש מחדש של `eventBus`: אפיק זה הוא
ערוץ ההתראות בזמן אמת של לוח המחוונים (שמות _אירועים_ מתועדים, מטענים
אטומים, צרכני ממשק משתמש). `RoutingEvent` הוא מבנה _תוצאה_ מתועד
(השהיה/טוקנים/עלות/תוצאה/סיבת-סיום), הנצרך על ידי יעדי המשוב של
מישור הבקרה (עוקב האיכות, מייצא OTel, מאגר ההסברים).

### מה היה חסר (ונוסף כאן)

1. **אירוע תוצאת ניתוב מתועד + הפשטת יעד** (`RoutingEvent` /
   `RoutingEventSink`). ‏`decisionTrace` מוגבל ל-combo ונשמר בזיכרון בלבד;
   `comboMetrics` הם מונים מצטברים; `call_logs` הוא מנגנון התמדה אסינכרוני גולמי.
   אף אחד מהם אינו ערוץ תוצאות מתועד ומבוסס-יעדים, שעוקב איכות, מייצא OTel
   או מעריך בסגנון Future-AGI יכולים להירשם אליו.
2. **אות איכות מקוון** (EWMA) עבור איכות הפלט — בעבר מנגנון הניקוד
   העריך בעקיפין "איכות" רק באמצעות התאמה סטטית למשימה ושיעורי מעבר של הערכות בהצטרפות מפורשת.
3. **מייצא OTel אופציונלי וללא תלויות**, המשתמש במוסכמות הסמנטיות של GenAI.
4. **נקודת קצה להסברתיות**, המחזירה את החלטות הניתוב בפועל ואת מצב האיכות.

## 2. אירועי ניתוב (בסיס למשוב)

קבצים: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` נושא מטא-נתוני ניתוב בלבד:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // איחוד מסוגים מרשימה מורשית
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` הוא ממשק בסגנון `Send+Sync` ב-TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // חייב להיות O(1), ללא קלט/פלט סינכרוני
}
```

הנתיב החם קורא ל-`emitRoutingEvent(event)` פעם אחת לכל בקשה שהושלמה
(קריאת החזרה בסיום הזרמה, נתיב ההצלחה ללא הזרמה ונתיב הכשל מסוג malformed-200
ב-`handleChatCore`). השיגור הוא fan-out סינכרוני ליעדים הרשומים, אך כל יעד רק
מוסיף לתור או מעדכן מצב בזיכרון. **אין כתיבות סינכרוניות למסד הנתונים ואין
קלט/פלט רשת בנתיב החם.**

יעדי ברירת המחדל:

- `MemoryRoutingEventStore` — מאגר טבעתי מוגבל (500), מהחדש לישן, עבור
  נקודת הקצה להסבר.
- צרכן `QualityTracker` — מעדכן את אומדן האיכות EWMA.
- `OtlpHttpsEventSink` — אופציונלי, מופעל רק כאשר `OMNIROUTE_OTEL_ENDPOINT`
  (או `OTEL_EXPORTER_OTLP_ENDPOINT`) מוגדר.

### תקורה שנמדדה (השוואה כנה)

`npm run bench:routing-events` בתחנת עבודה זו (100k איטרציות; פעולות מהירות
מתת-µs נמדדו במצטבר כ-µs/פעולה, משום שהאחוזונים לכל פעולה נמצאים מתחת
לרזולוציית הטיימר של `performance.now()`):

| תרחיש                              | µs/פעולה | פעולות/שנייה |
| ---------------------------------- | -------- | ------------ |
| קו בסיס (ניקוד בלבד)               | ~0.045   | ~22 M        |
| קו בסיס + RoutingEvent (שני יעדים) | ~0.168   | ~5.9 M       |
| קו בסיס + אירוע + הכנסה לתור OTel  | ~0.163   | ~6.1 M       |
| מקבילי (8 מקבצים משולבים)          | ~0.18    | —            |

ההפרש של שיגור האירועים לעומת ניקוד קו הבסיס הוא כ-0.12 µs/בקשה; יעד OTel
רק מוסיף לתור (דחיפה למאגר ב-O(1)), ללא תוספת מדידה. מספרים אלה
ייחודיים למכונה ויחסיים — הם אינם ערובה לביצועים בסביבת ייצור. הנתון "~0.2 µs"
ב-v1 היה אומדן מצטבר; מתודולוגיה זו מפרידה בין קו הבסיס של הניקוד
לבין עלות שיגור האירועים.

## 3. אות איכות (מצב ספק מונחה משוב)

קבצים: `open-sse/services/routing/quality.ts`

v2 מפרידה בין איכות **תפעולית** לבין איכות **סמנטית**:

- **תפעולית** — נגזרת מנתיב הניתוב החם (HTTP 4xx/5xx, כשלי חיבור,
  שגיאות 429, תגובות פגומות, הפרעות בזרימה, `finish_reason=length`,
  הצלחות ללא פלט, EWMA של השהיה/TTFT). תגובת 200 אינה נחשבת לאיכות
  סמנטית.
- **סמנטית** — הערך בפועל של הפלט שנוצר. מופקת אך ורק על ידי מעריך
  באמצעות `setSemanticQuality()`. ערכה הוא `null` עד שמעריך מספק אותו,
  והיא לעולם אינה זולגת אל הציון התפעולי.

מצב לכל צמד (ספק, מודל) (EWMA + מונים מוגבלים):

- `successEwma` — EWMA (α=0.2) של הצלחת התוצאה.
- `latencyEwma` / `ttftEwma` — EWMA של השהיה (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — כמה זמן עבר מאז שהמודל נצפה לאחרונה.

### מודעות לביטחון / לכמות הדגימות

`confidence = clamp01(samples / 50)`, והציון שמוחזר למנגנון הניקוד
משולב לכיוון נקודת האמצע הניטרלית:

```
score = 0.5 + confidence * (operational - 0.5)
```

השלכות (שאומתו באמצעות בדיקות):

- ספק קר (0 דגימות) מקבל ציון **0.5** — הוא אינו נענש באופן בלתי הוגן,
  אך אינו יכול לגבור על ספק עם אלפי תצפיות טובות.
- ספק עם 7 הצלחות מקריות נמשך לכיוון 0.5 (ולעולם אינו גובר בשל
  אתחול אופטימי).
- ספק עם 50+ דגימות מתכנס לציון התפעולי האמיתי שלו.
- הידרדרות והתאוששות הן הדרגתיות (EWMA), וכשל מבודד אחד אינו
  הורס ספק תקין.

`ProviderQuality` חושף את `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

נתונים אלה מוזנים למנגנון הניקוד auto-combo כגורם הניקוד `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` בתוך
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: ‏`health` מ-0.1905 ל-0.1605, ‏`quality` בערך 0.03. הסכום נשאר 1.0.
- `buildAutoCandidates` מאכלס את `candidate.quality` מתוך העוקב; מועמדים
  ללא נתונים מקבלים כברירת מחדל ערך ניטרלי של **0.5** (מועמד קר אינו
  מקבל חיזוק ואינו נענש).

הלולאה הסגורה:

```
RoutingEvent → QualityTracker → getQualityScore → גורם האיכות של auto-combo
      ↑                                                    │
      └────── תוצאת הבקשה (handleChatCore) ←───────────────┘
```

### החרגה קשיחה לעומת קנס רך

אות האיכות הוא **העדפה מסתגלת רכה** בלבד. ההחרגה הקשיחה נשארת
באחריות מערך העמידות הקיים: מפסק במצב OPEN, מכסה שמוצתה,
כשל אימות, נעילת מודל — אף אחד מאלה אינו מושפע מציון האיכות.
ספק שציון האיכות שלו יורד זמנית מקבל עדיפות נמוכה יותר, אך לעולם
אינו מושבת באופן קשיח.

## 3b. תזמון קנוני של תזרים (TTFT / ITL)

קבצים: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` היא נקודת האינסטרומנטציה היחידה עבור נתיב התזרים,
והיא מחוברת אל `createSSEStream` ‏(open-sse/utils/stream.ts):

- `markByte()` — המקטע הראשון התקבל ממקור ה-upstream.
- `markForward()` — המקטע הראשון הועבר ללקוח (משמש עבור TTFT).
- `markInterrupted()` — פסק זמן/ביטול/שגיאה בתזרים לפני סיום תקין.
- `ttft()` = זמן ההשהיה עד למקטע ה-SSE הראשון שהועבר. **זהו אינו TTFT ברמת הטוקן** —
  מקטע SSE יחיד עשוי להכיל אפס/טוקן אחד/טוקנים רבים. מתועד במדויק.
- `avgItlMs()` = הפער הממוצע בין מקטעים (מדד מקורב להשהיית מקטעים עבור ITL).

TTFT/ITL/מצב קטיעה מוזרמים אל `RoutingEvent` ‏(`ttftMs`, `itlMs`) ומיוצאים
כמאפייני span של GenAI/OmniRoute על ידי יעד ה-OTel.

## 4. יכולת תצפית של OpenTelemetry / GenAI

קבצים: `open-sse/services/routing/otel.ts`

- מייצא OTLP/HTTP JSON ללא תלויות (משתמש ב-`fetch` הגלובלי, ללא
  SDK מסוג `@opentelemetry/*`).
- ה-spans תואמים למוסכמות הסמנטיות של GenAI ‏(`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) יחד עם מאפייני ניתוב של
  OmniRoute (תוצאה, סטטוס, ttft, ניסיונות חוזרים, חלופה).
- `record()` רק מוסיפה לתור במאגר מוגבל (O(1)); טיימר ברקע
  מבצע ריקון באופן אסינכרוני באמצעות `POST {endpoint}/v1/traces`. תחת עומס יתר,
  האירועים הישנים ביותר מושמטים (מונה `dropped`) — לעולם לא מופעל לחץ נגדי על מישור
  הנתונים.
- **מושבת אלא אם הוגדרה תצורה.** יש להגדיר את `OMNIROUTE_OTEL_ENDPOINT` (או
  `OTEL_EXPORTER_OTLP_ENDPOINT`); אחרת היעד אינו נרשם ושום קוד OTel אינו
  מופעל.

## 5. יכולת הסבר

- `GET /v1/explain/routing` מחזירה את אירועי ה-`RoutingEvent` האחרונים (ההחלטות
  בפועל, מהחדש לישן) ואת תמונת המצב של האיכות לכל ספק/מודל.
- האימות תואם לזה של `/v1/combos` (מפתח API מסוג Bearer או סשן לוח מחוונים; גישה
  אנונימית בפריסות מקומיות למשתמש יחיד עם `REQUIRE_API_KEY=false`).
- עקבות ברמת Combo לכל הפעלה נשארות זמינות דרך `decisionTrace.ts` הקיים
  (הכותרת `X-OmniRoute-Combo-Trace`).
- בטיחות: האירועים מכילים מטא-נתוני ניתוב בלבד, ולעולם לא הנחיות/גופי בקשות/פרטי גישה.

## 6. שילוב במישור ההערכה (מוכנות ל-Future AGI)

OmniRoute מתייחס ל-Future AGI (או לכל מעריך אחר) כאל **תשתית עורפית אפשרית
לאינטליגנציה/הערכה, ולא כתלות**. נקודות הממשק:

- `RoutingEventSink` יכול להעביר אירועים למעריך באופן אסינכרוני.
- `MemoryRoutingEventStore` יחד עם תמונת מצב האיכות מספקים למעריך את זרם
  ההחלטות הגולמי.
- `Evaluator` עתידי (דטרמיניסטי, שופט מקומי, HTTP, WASM) יצרוך
  אירועים/עקבות ויחזיר `QualityScore` שיוזן אל אותו נתיב של
  `getQualityScore`/מקדם האיכות.
- ניתוב קיים המונע על ידי הערכה (`open-sse/services/evalRouting.ts`) כבר
  מסדר מחדש יעדי Combo לפי שיעורי המעבר של `eval_runs` כאשר הוא מופעל.

אף הערכה אינה רצה באופן סינכרוני בנתיב הבקשה, והשער פועל
באופן מלא גם בהיעדר המעריך.

## 7. סקירה ארכיטקטונית סופית

1. **מה נשאר בנתיב החם הסינכרוני?** ניתוב/ניקוד, בדיקות מקדימות של מנגנוני הגנה,
   חיפוש במטמון, ופעולת fan-out אחת של `emitRoutingEvent` ‏(~0.12 µs מעל
   ניקוד הבסיס) אל יעדים בזיכרון.
2. **מה הועבר לעיבוד אסינכרוני?** ייצוא OTel (טיימר + fetch),
   שמירת `call_logs`/שימוש, כתיבות למטמון הסמנטי; האיכות נשמרת בזיכרון
   ופועלת ב-O(1) (אין צורך באסינכרוניות).
3. **כיצד תוצאת ניתוב הופכת למשוב?** `handleChatCore` פולט
   `RoutingEvent` ← `QualityTracker` מעדכן את מצב ה-EWMA ← `getQualityScore`
   מזין את מקדם ה-`quality` של ה-auto-combo.
4. **כיצד האיכות משפיעה על ניתוב עתידי?** ציון איכות נמוך מפחית
   את הציון המשוקלל של אותו ספק/מודל ב-`scoreAutoTargets`, כך שמודלים שביצועיהם
   הידרדרו מקבלים בהדרגה עדיפות נמוכה יותר ומתאוששים ככל שה-EWMA שלהם משתפר.
5. **כיצד Future AGI יכול להשתלב מבלי להפוך לתלות?** באמצעות
   ממשק `RoutingEventSink` / מתאם `Evaluator` עתידי — ללא
   תלות המקודדת באופן קשיח.
6. **מה קורה כאשר המעריך אינו זמין?** הניתוב אינו מושפע;
   האיכות חוזרת לערך ניטרלי (1.0) עבור מודלים ללא אות שנצפה.
7. **מה קורה כאשר הטלמטריה אינה זמינה?** יעד ה-OTel פשוט אינו
   נרשם; שאר שכבת הניתוב פועלת ללא שינוי.
8. **מה קורה תחת עומס יתר?** מאגר ה-OTel משמיט את האירועים הישנים ביותר; האיכות
   והמאגר הטבעתי מוגבלים מעצם בנייתם; אין לחץ נגדי.
9. **כיצד מצב הספק מתאושש לאחר הידרדרות?** ה-EWMA מתכנס מחדש ככל
   שהצלחות מצטברות; חימום מקדים שומר על ניטרליות של מודלים קרים; מפסק הזרם
   מתאושש באופן עצמאי באמצעות בדיקות HALF_OPEN.
10. **אילו תכונות שהוצעו לא מומשו במכוון, ומדוע?**
    - תעבורת צללים / ניסויים — כבר מומשו
      (`combo/shadowRouting.ts`); לא נבנו מחדש.
    - מנגנוני הגנה — כבר מומשו (`src/lib/guardrails/`); לא שוכפלו.
    - מטמון סמנטי — כבר מומש (`src/lib/semanticCache.ts`); לא
      שוכפל.
    - פלטפורמה מלאה לניהול ניסויים, כלי ערכות נתונים, פלטפורמה לאופטימיזציית
      הנחיות, מסד נתונים וקטורי או תשתית OTel חיצונית מחייבת — מחוץ
      לתחום של מישור נתונים רזה.
    - מבנה `RoutingEvent` ב-Rust — מישור הנתונים כתוב ב-TypeScript; טיפוס ה-TS
      הוא המקבילה המותאמת.

## 8. תיעוד תצורה

| משתנה                         | ברירת מחדל  | השפעה                                                                          |
| ----------------------------- | ----------- | ------------------------------------------------------------------------------ |
| `OMNIROUTE_OTEL_ENDPOINT`     | לא מוגדר    | כאשר מוגדר, מפעיל את מייצא העקבות OTLP/HTTP (לדוגמה, `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | לא מוגדר    | כינוי חלופי לנקודת הקצה של OTLP.                                               |
| `OTEL_SERVICE_NAME`           | `omniroute` | מאפיין המשאב `service.name`.                                                   |

## 9. בדיקות

- `tests/unit/routing-events.test.ts` — נרמול אירועים, סיווג
  סטטוסים, מאגר טבעתי מוגבל, פיזור ליעדים + בידוד.
- `tests/unit/routing-quality.test.ts` — חימום EWMA, התאוששות מכשל/הצלחה,
  קנסות על חריגות, טיפול זמני ב-429, תמונת מצב, איפוס.
- `tests/unit/routing-scoring-quality.test.ts` — תקינות משקלים, ברירת מחדל
  ניטרלית, דירוג לפי גורם איכות.
- `tests/unit/routing-otel.test.ts` — בקרת הפעלה, מטען span של GenAI, ריקון
  אסינכרוני, השמטה תחת עומס יתר.
- `tests/unit/routing-events-concurrency.test.ts` — אלפי אירועים, חסימות
  המאגר הטבעתי, בידוד יעד שזורק חריגה, פרצים אסינכרוניים משולבים,
  איפוס במהלך הוספות.
- `tests/unit/routing-adaptive-e2e.test.ts` — לולאה דטרמיניסטית מקצה לקצה באמצעות
  מנגנון הניקוד האמיתי `scoreAutoTargets`: תקין → הידרדרות → התאוששות → תקלה רגעית, וכן
  תרחישי הפעלה קרה וספק קר בעל מזל.
- `tests/unit/stream-timing.test.ts` — TTFT (המקטע הראשון שהועבר), ITL,
  בית ראשון לעומת העברה ראשונה, הפרעה, בטיחות מול מקטעים פגומים/ריקים.

## 10. מצב בעיות קיימות מראש (שלב 18)

| בעיה                                                         | מצב                | הערות                                                                                                                                                                                                                       |
| ------------------------------------------------------------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| אי-התאמה בייצוא `omniglyph`                                  | **תוקן (סביבתי)**  | `node_modules` לא היה מסונכרן עם `package-lock.json` (הותקנה 1.3.1 לעומת 1.4.0 שננעלה). הפעלת `npm install omniglyph@1.4.0` שחזרה את הגרסה הנעולה; מספר שגיאות הטיפוסים ירד ל-0. קובצי המניפסט לא השתנו.                    |
| בדיקות `getKnownContextOverflow` מיושנות                     | **ידוע — לא תוקן** | `combo-context-overflow-compression-probe.test.ts` מייבא פונקציה שכבר אינה קיימת ב-`open-sse/services/combo.ts` (רק הערות מפנות אליה). התיקון דורש לממש מחדש או לכתוב מחדש את הבדיקות האלה — טלטלה ארכיטקטונית שאינה קשורה. |
| בידוד מסד הנתונים ב-`combo-runtime-unit-concurrency.test.ts` | **ידוע — לא תוקן** | טענת נכונות של בידוד SQLite ברתמת הבדיקות נכשלת בהרצה ישירה; היא נכשלת באופן זהה גם בענף הבסיס.                                                                                                                             |
| סטייה ב-`llm.txt` של i18n                                    | **ידוע — לא תוקן** | קובצי `docs/i18n/*/llm.txt` שונים מקובץ השורש; מצב קיים מראש שחוסם את שער טרום-ה-commit לסנכרון התיעוד.                                                                                                                     |

בעיות סביבתיות ובעיות קוד נשמרות כנפרדות; שום כשל שאינו קשור אינו מוסתר
מאחורי מסנני בדיקות ששונו.
