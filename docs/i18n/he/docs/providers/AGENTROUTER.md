# AgentRouter Setup Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) הוא שירות ממסר תואם Anthropic שמוכר מחדש גישה ל-Claude ולמודלים אחרים, לעיתים במחירים נמוכים יותר מאלה של Anthropic API הישיר. הוא תוכנן כתחליף מיידי ל-`ANTHROPIC_BASE_URL` עבור לקוח Claude Code הרשמי, ולכן הוא מקבל רק תעבורה שתואמת לתבנית התעבורה של Claude Code‏ (User-Agent מסוים, דגלי `anthropic-beta`, כותרות Stainless SDK וכדומה).

## התחלה מהירה — שימוש בספק `agentrouter` המובנה (מומלץ)

עבור רוב המשתמשים, **לא נדרשת הגדרה מיוחדת**. OmniRoute כולל ספק `agentrouter` מובנה, שבו תבנית התעבורה המלאה של Claude Code כבר מוגדרת מראש (ראו `open-sse/config/providerRegistry.ts` ← `agentrouter`). כדי להשתמש בו:

1. פתחו את **לוח הבקרה ← ספקים ← הוספת ספק**.
2. בחרו **AgentRouter** מהרשימה.
3. הדביקו את מפתח ה-API שלכם מסוג `sk-...` ושמרו.

זה הכול — אין צורך במשתני סביבה או בסוג ספק מותאם אישית. המודלים המובנים כוללים את `claude-opus-4-6`,‏ `claude-haiku-4-5-20251001`,‏ `glm-5.1` ו-`deepseek-v3.2`.

שאר המדריך עוסק **במסלול המתקדם**: שימוש בסוג הספק `anthropic-compatible-cc-*`. השתמשו בו כאשר אתם זקוקים לשליטה רבה יותר בתבנית התעבורה — לדוגמה, בעת התחברות לשירותי ממסר אחרים בסגנון AgentRouter שעדיין אינם כלולים במרשם הספקים המובנה, או בעת דריסת כתובת ה-URL הבסיסית, נתיב הצ'אט או קבוצת הכותרות.

---

## מתקדם: התחברות באמצעות סוג הספק התואם ל-Claude Code

OmniRoute תומך גם ב-AgentRouter (ובשירותי ממסר דומים) באמצעות סוג הספק **התואם ל-Claude Code**‏ (`anthropic-compatible-cc-*`), שמתקשר עם Anthropic Messages API באמצעות תבנית התעבורה הנכונה. ספק `openai-compatible-chat` כללי שמצביע אל `https://agentrouter.org` **לא** יעבוד — ה-WAF של השירות במעלה הזרם דוחה בקשות שאינן נראות כאילו הגיעו מ-Claude Code.

---

## דרישות מוקדמות

- חשבון ומפתח API של AgentRouter. נרשמים חדשים מקבלים קרדיטים בחינם דרך קישור השותפים בקובץ [README](../README.md) של הפרויקט.
- OmniRoute פועל כאשר דגל התכונה `ENABLE_CC_COMPATIBLE_PROVIDER` מופעל (ראו להלן).

## 1. הפעלת סוג הספק התואם ל-CC

סוג הספק התואם ל-Claude Code מוגן באמצעות דגל תכונה, משום שהוא שולח תעבורה שמחקה באופן הדוק את לקוח Claude Code הרשמי. הפעילו אותו באמצעות הגדרת משתנה סביבה לפני הפעלת OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

דוגמת Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

לאחר ההפעלה מחדש, לוח הבקרה יציג אפשרות **הוספת ספק תואם Claude Code**, בנוסף לתהליכים הקיימים עבור ספקים תואמי OpenAI ותואמי Anthropic.

## 2. יצירת הספק בלוח הבקרה

1. פתחו את **לוח הבקרה ← ספקים ← הוספת ספק**.
2. בחרו **הוספת ספק תואם Claude Code** (מוצג רק כאשר הדגל שלעיל מוגדר).
3. מלאו את השדות:

| שדה       | ערך                                                       |
| --------- | --------------------------------------------------------- |
| שם        | `AgentRouter` (או כל תווית אחרת)                          |
| קידומת    | `agentrouter` (כינוי ידידותי שמוצג ביומנים ובלוח הבקרה)   |
| URL בסיסי | `https://agentrouter.org`                                 |
| נתיב צ'אט | `/v1/messages?beta=true` (ברירת המחדל — השאירו ללא שינוי) |

> מזהה המודל הקנוני עדיין משתמש במזהה הצומת המלא של הספק
> (`anthropic-compatible-cc-{uuid}/{model}`). ה-**קידומת** היא רק כינוי תצוגה
> שנפתר על ידי `src/lib/usage/callLogs.ts` כדי להציג פלט ידידותי יותר ביומנים.

4. (אופציונלי) הדביקו את מפתח ה-API שלכם בשדה **אימות** ולחצו על **בדיקה** כדי
   לאשר את הקישוריות לפני השמירה.
5. לחצו על **הוספה**.

לאחר היצירה, פתחו את הספק והוסיפו **חיבור** עם מפתח ה-API שלכם ב-AgentRouter‏ (`sk-...`). הערך `test_status` של החיבור אמור להשתנות ל-`active`.

## 3. השתמשו בו דרך קומבו או ישירות

הפנו למודל באמצעות הקידומת של הספק שלכם כמרחב השמות:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

גם מזהה המודל הקנוני `anthropic-compatible-cc-{uuid}/claude-opus-4-6` פועל,
והוא זה שמופיע במסד הנתונים ובהגדרות הקומבו.

לחלופין, הוסיפו אותו לקומבו לצורך ניתוב, מעבר לגיבוי וניהול מכסות, כמו כל
ספק אחר.

---

## פרטי תמונת התעבורה

לצורך עיון, הגשר התואם ל-cc שולח את הפרטים הבאים בכל בקשה
לשירות החיצוני (ראו `open-sse/services/claudeCodeCompatible.ts`):

| כותרת                                       | ערך                                                                                    |
| ------------------------------------------- | -------------------------------------------------------------------------------------- |
| `Authorization`                             | `Bearer <api-key>`                                                                     |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                               |
| `anthropic-version`                         | `2023-06-01`                                                                           |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`               |
| מתג בטא להסתרת חשיבה לכל חיבור              | מוסיף `redact-thinking-2026-02-12` לשירותים חיצוניים שדורשים במפורש זרמי חשיבה מוסתרים |
| מתג חשיבה מסוכמת לכל חיבור                  | מוסיף `display: "summarized"` לבקשות חשיבה תואמות CC שלא הגדירו כבר מצב תצוגה          |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                 |
| `x-app`                                     | `cli`                                                                                  |
| `X-Stainless-*`                             | כותרות שונות של Stainless SDK (שפה, גרסת חבילה, מערכת הפעלה, ארכיטקטורה וכו׳)          |

כך מתאפשר לבקשות לעבור את ה-WAF / רשימת הלקוחות המורשים של השירות החיצוני.

---

## פתרון בעיות

**`{"error":{"message":"unauthorized client detected, ..."}}`** — הבקשה שלכם לא
תאמה לתמונת התעבורה של Claude Code. הדבר קורה כאשר הספק מוגדר בתור
`openai-compatible-chat` במקום `anthropic-compatible-cc`, או כאשר הדגל
`ENABLE_CC_COMPATIBLE_PROVIDER=true` לא הוגדר בעת ההפעלה.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"אסימון לא תקין". תמונת התעבורה נכונה, אך מפתח ה-API נדחה. צרו מפתח חדש
בלוח הבקרה של AgentRouter ועדכנו את החיבור.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — מנגנון ניהול התוכן של AgentRouter דחה את תוכן הבקשה, או שהמסלול
של המפתח אינו מתיר את המודל המבוקש. נסו הנחיה או מודל אחרים;
פנו לתמיכה של AgentRouter אם הנחיה תמימה נחסמת בעקביות.

**`[400]: content-blocked` רק במודלים מסוימים** — רוב המסלולים של AgentRouter
מתירים רק קבוצת משנה של מודלים (למשל `claude-opus-4-6`). מזהי מודלים אחרים מחזירים
`unauthorized_client_error` אף שהמפתח תקין. בדקו אילו מודלים כלולים במסלול שלכם
בלוח הבקרה של AgentRouter.

**`Invalid JSON response from provider (reset after Ns)` ביומני omniroute** —
השירות החיצוני החזיר גוף שאינו JSON (בדרך כלל דף שגיאת HTML מה-WAF).
בדרך כלל משמעות הדבר היא שהבקשה כלל לא הגיעה לשירות הקצה של AgentRouter — בדקו שוב
שמזהה הספק מתחיל ב-`anthropic-compatible-cc-` (שימו לב למקף שבסוף —
ראו `CLAUDE_CODE_COMPATIBLE_PREFIX` בתוך `open-sse/services/claudeCodeCompatible.ts`)
ושדגל התכונה מופעל.

**`unauthorized client detected` / דף שגיאת HTML אף שכבר קיים ספק של
AgentRouter** — סביר שיש לכם **יותר מספק אחד** של AgentRouter
והבקשה שלכם מגיעה לספק הלא נכון. אם ספק ישן שנוצר ידנית מסוג
`anthropic-compatible-*` (שאינו `cc`) או `openai-compatible-chat-*`
נוצר עם הקידומת `agentrouter`, הוא עשוי להחזיק במזהי המודלים
`agentrouter/<model>` (וייתכן שקומבואים מפנים אליו לפי מזהה צומת), כך שהתעבורה מנותבת לספק זה —
ששולח User-Agent כללי ונדחה — במקום לספק המובנה
`agentrouter`, שכבר כולל את תמונת התעבורה הנכונה. בדקו לאן המודל
נפתר בפועל ביומני omniroute (התג `ROUTING` מציג
`agentrouter/<model> → <providerId>/<model>`); אם `<providerId>` אינו
`agentrouter`, אחדו את ההגדרות סביב הספק המקורי: הפנו קומבואים אל
`agentrouter/<model>` (עם providerId‏ `agentrouter`) ומחקו את הספקים
התואמים הכפולים. הספק המקורי אינו זקוק להגדרת תמונת תעבורה או
ל-`customUserAgent`.

---

## ראו גם

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — הערות על שילוב ספק Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — קטלוג ספקים
  במסלול החינמי
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — מימוש תמונות בפרוטוקול התקשורת
