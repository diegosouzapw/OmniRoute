# Playground Studio (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **תכונה:** Playground Studio — סביבת עבודה מאוחדת לבדיקות AI עבור `/dashboard/playground`.
> **תוכניות:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **סטטוס:** שוחרר ב-v3.8.6

---

## סקירה כללית

Playground Studio הופך את `/dashboard/playground` מעורך פשוט המבוסס על Monaco
לסביבת עבודה מלאה לבדיקות. הוא מחליף את `page.tsx` הישן במעטפת `PlaygroundStudio`
שמציגה ארבע לשוניות וחלונית תצורה משותפת.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 צ'אט] [⚖ השוואה] [{} API] [🔧 בנייה]      142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {תוכן הלשונית הפעילה}                   │ ─ תצורה                   │
│                                          │ נקודת קצה [צ'אט ∨]        │
│                                          │ מודל      [gpt-5.4 ∨]     │
│                                          │ מערכת     [אזור טקסט]     │
│                                          │ טמפ'      ▕▕▔▔ 0.7        │
│                                          │ הגדרות [▾ טעינה][שמירה]   │
│                                          │ [✨ שיפור הפרומפט]         │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## לשוניות

### לשונית צ'אט

מפתחת את `ChatPlayground.tsx` לסביבת עבודה מרובת תורות עם הזרמה:

- רינדור Markdown מלא באמצעות `MarkdownMessage.tsx` (בלוקי קוד, טבלאות, רשימות וקישורים).
- פרומפט המערכת נלקח מחלונית התצורה המשותפת.
- מספר הטוקנים והעלות לכל הודעה (טוקנים של הפרומפט וההשלמה).
- יצירה מחדש של התגובה האחרונה.
- שליחה אל `POST /v1/chat/completions` עם הזרמת SSE.

### לשונית השוואה

המאפיין המבדל העיקרי עבור פרוקסי: הרצת פרומפט אחד על עד **4 מודלים במקביל**.

- עד 4 עמודות, שכל אחת מהן מוזרמת באופן עצמאי מ-`/v1/chat/completions`.
- כפתור `+ הוספת מודל` (קיצור הדרך Cmd+K) להוספת עמודות.
- `הרצת הכול ▶` מפעיל את כל ההזרמות בו-זמנית באמצעות `Promise.all` ו-`AbortController` נפרד לכל עמודה.
- האפשרות הגלובלית **ביטול הכול** מבטלת כל הזרמה שמתבצעת.
- `ProviderMetrics` בכל עמודה מציג בזמן אמת TTFT,‏ TPS, מספר טוקנים ועלות משוערת.
- המדדים מסומנים בתווית **"הערכה בצד הלקוח"** (D12) — ונמדדים החל ממקטע ה-SSE הראשון.

### לשונית API

משמרת 100% מעורך Monaco המקורי עבור משתמשים מתקדמים (D14):

- 10 נקודות קצה: השלמות צ'אט, השלמות, הטמעות, תמונות, שמע, דיבור, תמלולים, ניהול תוכן, דירוג מחדש וחיפוש.
- העלאת קבצים מולטימודליים.
- הזרמת SSE עם פלט בזמן אמת.
- עטוף כ-`ApiTab.tsx` (נטען באופן עצל, `ssr: false`).

### לשונית בנייה

ממשק משתמש לכלים/קריאה לפונקציות ולפלט מובנה:

- `ToolsBuilder.tsx` — הוספה/עריכה/הסרה של `tools[]` באמצעות עורך סכמת JSON לכל כלי.
  מאמת פרמטרים באמצעות `ToolDefinitionSchema` (‏Zod).
- `StructuredOutputEditor.tsx` — הפעלה או השבתה של מצב JSON וכן עורך סכמת JSON.
  מאמת את התגובה מול הסכמה באמצעות `StructuredOutputSchema` (‏Zod).
- שולח בקשה אל `/v1/chat/completions` עם `tools[]` ו/או `response_format`.

---

## חלונית תצורה (משותפת)

`StudioConfigPane.tsx` — גלויה תמיד וניתנת לכיווץ.

| שדה           | רכיב                  | הערות                                                                  |
| ------------- | --------------------- | ---------------------------------------------------------------------- |
| נקודת קצה     | `<select>`            | 10 אפשרויות התואמות ל-`PlaygroundEndpoint`                             |
| מודל          | `<input>`             | טקסט חופשי, לדוגמה `openai/gpt-4o`                                     |
| הנחיית מערכת  | `<textarea>`          | מועברת לכל הלשוניות                                                    |
| פרמטרים       | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop |
| הגדרות קבועות | `PresetPicker`        | טעינה/שמירה של תמונות מצב בעלות שם של התצורה (נשמרות במסד הנתונים)     |
| שיפור ההנחיה  | `ImprovePromptButton` | פותח חלון אזהרה לגבי מכסה וקורא ל-`/api/playground/improve-prompt`     |

המצב מורם אל `PlaygroundStudio.tsx` ומועבר לכל הלשוניות. מעבר בין לשוניות
משמר את מצב התצורה.

---

## סרגל עליון

`StudioTopBar.tsx`:

- בורר לשוניות (role="tablist").
- `TokenCostCounter` — תצוגה בזמן אמת של אסימונים (↑/↓) ושל העלות המשוערת.
- לחצן ייצוא קוד (`</>`) — פותח את `ExportCodeModal`.

---

## חלון ייצוא קוד

`ExportCodeModal.tsx` משתמש ב-`codeExport.ts` כדי ליצור קטעי קוד של curl / Python / TypeScript
מתוך ה-`PlaygroundState` הנוכחי. מציין המיקום של מפתח ה-API הוא תמיד `$OMNIROUTE_API_KEY` (D11).

---

## משפר הנחיות

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. חלון מזהיר ש"הפעולה תצרוך מהמכסה".
2. לאחר אישור, נשלח `{ system, prompt, model, tone }` לנתיב.
3. הנתיב קורא באופן פנימי ל-`/v1/chat/completions` עם `promptImprover.META_SYSTEM_PROMPT`.
4. מוחזר `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. ממשק המשתמש מעדכן את הנחיית המערכת בחלונית התצורה ואת הנחיית המשתמש בלשונית הצ'אט.

---

## הגדרות קבועות

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- נשמרות בטבלת SQLite בשם `playground_presets` (מיגרציה `084_playground_presets.sql`).
- כל הגדרה קבועה שומרת: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- פעולות CRUD: רשימה באמצעות `GET`, יצירה באמצעות `POST`, אחזור באמצעות `GET /:id`, עדכון באמצעות `PUT /:id`, מחיקה באמצעות `DELETE /:id`.

---

## מדדי הזרמה

`useStreamMetrics.ts` + `streamMetrics.ts` (פונקציה טהורה):

- `start()` — מתעד את זמן תחילת הבקשה.
- `onFirstChunk()` — מתעד TTFT.
- `onChunk(n)` — צובר את מספר אסימוני ההשלמה.
- `finish(usage?)` — מחשב מדדים סופיים: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- התמחור נלקח מטבלה סטטית ב-`src/lib/playground/types.ts` (מסומן כ"משוער" — D13).

---

## נתיבי צד שרת

| שיטה     | נתיב                             | מטפל                                                                                         |
| -------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | מאמת באמצעות Zod את `ImprovePromptRequestSchema`; קורא ל-`/v1/chat/completions` עם מטא-הנחיה |
| `GET`    | `/api/playground/presets`        | מחזיר `{ presets: PlaygroundPresetListItem[] }`                                              |
| `POST`   | `/api/playground/presets`        | יוצר הגדרה קבועה; מאמת את `PlaygroundPresetCreateSchema`                                     |
| `GET`    | `/api/playground/presets/:id`    | מחזיר הגדרה קבועה אחת או 404                                                                 |
| `PUT`    | `/api/playground/presets/:id`    | עדכון חלקי                                                                                   |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                          |

אימות: אופציונלי (`REQUIRE_API_KEY`). שגיאות באמצעות `buildErrorBody()` (כלל קשיח #12).

---

## קבצים מרכזיים

| נתיב                                                                       | מטרה                                       |
| -------------------------------------------------------------------------- | ------------------------------------------ |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | רכיב מעטפת, מתזמר לשוניות                  |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | לשוניות + מונה + כפתור ייצוא               |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | חלונית תצורה משותפת                        |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | סביבת עבודה לצ'אט                          |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | השוואה בין מספר מודלים                     |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | עורך Monaco (נשמר ללא שינוי)               |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | כלים + פלט מובנה                           |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | חלון ייצוא קוד                             |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | עמודת השוואה יחידה                         |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | תצוגת TTFT/TPS                             |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Hook למדדים בצד הלקוח                      |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Hook לפעולות CRUD על הגדרות קבועות         |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook לשיפור הנחיה                          |
| `src/lib/playground/codeExport.ts`                                         | מחולל curl/Python/TS (משותף עם כלי החיפוש) |
| `src/lib/playground/promptImprover.ts`                                     | בונה מטא-הנחיות                            |
| `src/lib/playground/streamMetrics.ts`                                      | חישוב מדדים טהור                           |
| `src/lib/db/playgroundPresets.ts`                                          | מודול מסד נתונים (CRUD)                    |
| `src/app/api/playground/improve-prompt/route.ts`                           | נתיב REST לשיפור הנחיה                     |
| `src/app/api/playground/presets/route.ts`                                  | הצגת רשימת הגדרות קבועות + יצירה           |
| `src/app/api/playground/presets/[id]/route.ts`                             | קבלה/עדכון/מחיקה של הגדרות קבועות          |
| `src/lib/db/migrations/084_playground_presets.sql`                         | מיגרציית מסד נתונים                        |

---

## פתרון בעיות

| תסמין                              | סיבה                           | פתרון                                                                                   |
| ---------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------- |
| עורך Monaco אינו מוצג בלשונית API  | SSR טען את Monaco              | ודאו ש-`ApiTab` משתמש ב-`dynamic(..., { ssr: false })`                                  |
| זרמי ההשוואה מופעלים בזה אחר זה    | שימוש שגוי ב-`Promise.all`     | יש להפעיל את כל הזרמים בקריאה אחת ל-`Promise.all`                                       |
| המדדים מציגים TTFT כ-`null`        | המטפל במקטע הראשון אינו מחובר  | ודאו שמתבצעת קריאה ל-`useStreamMetrics.onFirstChunk()` בלולאת הקריאה של SSE             |
| ההגדרה הקבועה אינה נשמרת           | מיגרציית מסד הנתונים לא הופעלה | הפעילו `npm run db:migrate` או אתחלו מחדש את השרת (המיגרציה מופעלת אוטומטית בעת ההפעלה) |
| שיפור ההנחיה מחזיר 502             | המודל לא הוגדר ב-Config        | על המשתמש להזין שם מודל בחלונית Config לפני ביצוע השיפור                                |
| הקוד המיוצא מציג `MISSING_API_KEY` | מציין המיקום לא נוסף           | `codeExport.ts` משתמש תמיד ב-`API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`               |

---

## מקורות

- תוכנית אב: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- תוכנית התכונה: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- ייצוא קוד: `src/lib/playground/codeExport.ts`
- משפר הנחיות: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
