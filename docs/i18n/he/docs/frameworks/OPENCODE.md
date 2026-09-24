# OpenCode Integration (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **סטטוס:** זמין לכלל.
> **קהל יעד:** מפעילים המחברים את OpenCode לפריסת OmniRoute.
> **מקור האמת (סכמת תצורה):** `src/shared/services/opencodeConfig.ts`
> **מקור האמת (חבילת npm):** `@omniroute/opencode-provider/` (מרחב עבודה הניתן לפרסום)

[OpenCode](https://opencode.ai) הוא לקוח AI סוכני לממשק שורת הפקודה/לשולחן העבודה. הוא קורא את קטלוג הספקים שלו מתוך `~/.config/opencode/opencode.json` (או `opencode.jsonc`) ופועל לפי הסכמה שבכתובת `https://opencode.ai/config.json`. OmniRoute חושף את עצמו ל-OpenCode כאחד מהספקים האלה — כל בקשה עוברת דרך ממשק `/v1` הסטנדרטי ותואם-OpenAI של OmniRoute, כך ש-OpenCode נהנה אוטומטית מניתוב Auto-Combo, ממפסקי מעגל, ממדיניות מפתחות, מניטוריות וכו'.

ישנם **שני נתיבי שילוב נתמכים**. בחרו אחד מהם — שניהם יוצרים את אותה תצורה.

---

## נתיב 1 — מחולל CLI (ללא התקנת npm)

מומלץ למשתמשי קצה. כלול ב-OmniRoute. כותב את `opencode.json` במקומו.

```bash
# לאחר התקנת OmniRoute‏ (npm i -g @omniroute/cli או שיבוט מקומי)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

מאחורי הקלעים, ה-CLI קורא ל-`mergeOpenCodeConfigText()` ‏(`src/shared/services/opencodeConfig.ts:104`), כך שקובץ `opencode.json` קיים שומר על הספקים וההערות האחרים שלו. הרשומה של OmniRoute נוספת או מוחלפת באופן אטומי.

הקובץ שנוצר (קטלוג המודלים המוגדר כברירת מחדל):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## נתיב 2 — חבילת npm בשם `@omniroute/opencode-provider`

מומלץ כאשר אתם יוצרים את התצורה באמצעות סקריפט מ-Node/TS (תהליכי CI, מאגרים אחודים, תהליכי התקנה מותאמים אישית).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // אופציונלי: החלפת קטלוג המודלים שנחשף ל-OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

כדי לבצע מיזוג שאינו הרסני עם קובץ קיים, שכפלו את `mergeOpenCodeConfigText()` מתוך `opencodeConfig.ts` או הפעילו את מחולל ה-CLI.

ראו את [קובץ ה-README של החבילה](../../@omniroute/opencode-provider/README.md) לקבלת ה-API המלא.

---

## מה סביבת הריצה עושה בפועל

שני הנתיבים יוצרים את אותו `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. בזמן הריצה, OpenCode טוען את `@ai-sdk/openai-compatible` (שכבר מהווה תלות טרנזיטיבית של OpenCode) ומגדיר אותו באמצעות `baseURL` + `apiKey`. משם:

```
ממשק המשתמש/הסוכן של OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (ממשק OpenAI של OmniRoute)
         → המטפל של OmniRoute עבור /v1/chat/completions     (open-sse/handlers/chatCore.ts)
            → ניתוב משולב / Auto-Combo / מנגנון ביצוע
               → ספק במעלה הזרם
```

התוסף לעולם אינו נוגע ב-HTTP. הוא רק מפיק תצורה.

---

## ברירות המחדל של קטלוג המודלים

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

ניתן לעקוף אותן באמצעות `models: [...]`. תוספות מומלצות:

- `"auto"` — חושף את נתב [Auto-Combo](../routing/AUTO-COMBO.md) של OmniRoute, שאינו דורש הגדרות. מאפשר ל-OpenCode לבחור את "המודל הזמין הטוב ביותר" בלי לקבע את הקטלוג בקוד.
- `"<combo-name>"` — כל שילוב שהגדרתם בלוח הבקרה; OmniRoute פותר אותו באופן שקוף.

---

## נרמול כתובות URL

פונקציית העזר מקבלת את שתי הצורות ומפיקה `/v1` אחד בדיוק:

| קלט                            | פלט (`options.baseURL`)     |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

הסרת הכפילויות הזו היא **התקלה הנפוצה ביותר** שנצפתה בתצורות ישנות. אם יש לכם קובץ `opencode.json` מלפני v3.8.0 שמפנה אל `/v1/v1/...`, הפעילו מחדש את המחולל או קראו שוב ל-`createOmniRouteProvider`.

---

## מצבי אימות

| הגדרת OmniRoute                              | ערך `apiKey` מומלץ                                |
| -------------------------------------------- | ------------------------------------------------- |
| `REQUIRE_API_KEY=false` (ברירת המחדל מקומית) | `sk_omniroute` (מציין מקום מילולי)                |
| `REQUIRE_API_KEY=true`                       | מפתח API אמיתי לכל משתמש מלוח הבקרה ← מפתחות API. |

עבור לקוחות בסגנון Anthropic ששולחים `x-api-key` יחד עם `anthropic-version`, גם `extractApiKey` של OmniRoute מכבד את המפתח מ-`x-api-key`. OpenCode משתמש בממשק OpenAI, ולכן הוא תמיד ישלח `Authorization: Bearer ${apiKey}` — המקרה המיוחד של Anthropic אינו חל כאן.

---

## פתרון בעיות

| תסמין                                                   | סיבה                                                               | פתרון                                                                                             |
| ------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `404` בכל בקשה עם כתובת URL שמכילה `/v1/v1/`            | תצורה מיושנת מתוסף שלפני v3.8 שהוסיף את הסיומת `/v1` פעמיים.       | צרו מחדש באמצעות נתיב 1 או 2.                                                                     |
| `401 Invalid API key`                                   | ב-OmniRoute מוגדר `REQUIRE_API_KEY=true` והמפתח אינו מוכר.         | צרו את המפתח בלוח הבקרה, או הגדירו `REQUIRE_API_KEY=false` (מקומי בלבד) והשתמשו ב-`sk_omniroute`. |
| רשימת המודלים ריקה בממשק המשתמש של OpenCode             | כל 4 מודלי ברירת המחדל מוסתרים בהגדרות הנראות של הספק ב-OmniRoute. | העבירו `models: ["auto", ...]` כדי לחשוף את אלה שהפעלתם.                                          |
| שגיאת 500 ב-OpenCode עם `cannot read property 'models'` | גרסאות ישנות יותר של OpenCode (< 0.1.x) לא קיבלו `models` מוטבע.   | שדרגו את OpenCode לגרסה שתואמת לסכמת v1 (`opencode.ai/config.json`).                              |

---

## ראו גם

- [תיעוד ה-API](../reference/API_REFERENCE.md) — כל ממשק ה-REST של OmniRoute
- [Auto-Combo](../routing/AUTO-COMBO.md) — המשמעות של `model: "auto"`
- [קובץ ה-README של `@omniroute/opencode-provider`](../../@omniroute/opencode-provider/README.md)
- קוד מקור: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
