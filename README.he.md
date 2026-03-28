# 🚀 OmniRoute — שער הבינה המלאכותית החינמית

### לעולם אל תפסיק לקוד. ניתוב חכם לדגמי בינה מלאכותית **בחינם ובעלות נמוכה** עם חזרה אוטומטית.

_שרת ה-API האוניברסלי שלך - נקודת קצה אחת, 67+ ספקים, אפס זמן השבתה. עכשיו עם תזמור סוכנים **MCP & A2A**._

**השלמות צ'אט • הטמעות • יצירת תמונות • וידאו • מוזיקה • אודיו • דירוג מחדש • **חיפוש אינטרנט** • שרת MCP • פרוטוקול A2A • 100% TypeScript**

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![npm downloads](https://img.shields.io/npm/dm/omniroute?color=cb3837&logo=npm&label=npm%20downloads)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Docker Pulls](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?logo=docker&color=2496ED&label=docker%20pulls)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **זמין ב:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 מה חדש בגרסה 3.0.0

> **משדרגים מגרסה 2.9.5?** — עיין ב-[full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main) לכל השינויים.

| אזור                       | שנה                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🔒 **CodeQL Security**     | תוקן יותר מ-10 התראות CodeQL: פולינום-redos, unsecure-randomness, תיקון הזרקת מעטפת                                                                          |
| ✅ **אימות מסלול**         | כל 176 מסלולי ה-API מאומתים כעת עם סכימות Zod + `validateBody()` — מעברי CI `check:route-validation:t06`                                                     |
| 🐛 **הדלפת תג omniModel**  | תגי `<omniModel>` פנימיים אינם דולפים יותר ללקוחות בתגובות הזרמת SSE (#585)                                                                                  |
| 🔑 **Registered Keys API** | הקצאה אוטומטית של מפתחות API באמצעות `POST /api/v1/registered-keys` עם אכיפת מכסות לכל ספק/חשבון, אימפוטנציה, אחסון SHA-256 ודיווח אופציונלי על בעיות GitHub |
| 🎨 **אייקוני ספק**         | יותר מ-130 סמלי לוגו של ספקים באמצעות `@lobehub/icons` (SVG) עם PNG → שרשרת חילופין גנרית                                                                    |
| 🔄 **סנכרון אוטומטי דגם**  | מתזמן 24 שעות וממשק משתמש ידני כדי לסנכרן רשימות דגמים עבור ספקים מובנים ומותאמים אישית תואמי OpenAI                                                         |
| 🌐 **OpenCode Zen/Go**     | שני ספקים חדשים מ-@kang-heewon דרך PR #530: שכבת חינם + שכבת מנוי דרך `OpencodeExecutor`                                                                     |
| 🐛 **Gemini CLI OAuth**    | שגיאה ניתנת לפעולה כאשר `GEMINI_OAUTH_CLIENT_SECRET` חסר ב-Docker (הייתה שגיאה סתמית של Google)                                                              |
| 🐛 **תצורת OpenCode**      | `saveOpenCodeConfig()` כותב כעת כראוי TOML ל-`XDG_CONFIG_HOME`                                                                                               |
| 🐛 **עקיפת דגם מוצמד**     | `body.model` מוגדר כראוי ל-`pinnedModel` על הגנת הקשר מטמון                                                                                                  |
| 🐛 **קודקס/לולאת קלוד**    | `tool_result` בלוקים מומרים כעת לטקסט כדי לעצור לולאות אינסופיות                                                                                             |
| 🐛 **הפניה מחדש לכניסה**   | הכניסה לא קופאת עוד לאחר דילוג על הגדרת הסיסמה                                                                                                               |
| 🐛 **נתיבי חלונות**        | נתיבי MSYS2/Git-Bash (`/c/...`) מנורמלים ל-`C:\...` באופן אוטומטי                                                                                            |

---

## 🖼️ לוח המחוונים הראשי

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 תצוגה מקדימה של לוח המחוונים

<details>
<summary><b>לחץ כדי לראות צילומי מסך של לוח המחוונים</b></summary>

| עמוד            | צילום מסך                                         |
| --------------- | ------------------------------------------------- |
| **ספקים**       | ![Providers](docs/screenshots/01-providers.png)   |
| **שילובים**     | ![Combos](docs/screenshots/02-combos.png)         |
| **אנליטיקה**    | ![Analytics](docs/screenshots/03-analytics.png)   |
| **בריאות**      | ![Health](docs/screenshots/04-health.png)         |
| **מתרגם**       | ![Translator](docs/screenshots/05-translator.png) |
| **הגדרות**      | ![Settings](docs/screenshots/06-settings.png)     |
| **כלי CLI**     | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **יומני שימוש** | ![Usage](docs/screenshots/08-usage.png)           |
| **נקודות קצה**  | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 ספק AI בחינם עבור סוכני הקידוד המועדפים עליך

_חבר כל כלי IDE או CLI המופעל על ידי AI דרך OmniRoute - שער API בחינם לקידוד בלתי מוגבל._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/openclaw/openclaw">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 כל הסוכנים מתחברים דרך <code>http://localhost:20128/v1</code> או <code>http://cloud.omniroute.online/v1__OMNI_TOKEN_466, —limited one config מכסה</sub>

---

## 🤔 למה OmniRoute?

**הפסיקו לבזבז כסף ולהגיע לגבולות:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> מכסת המנויים מסתיימת ללא שימוש בכל חודש
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> מגבלות קצב עוצרות אותך בקידוד באמצע
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> ממשקי API יקרים ($20-50 לחודש לכל ספק)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> מעבר ידני בין ספקים

**OmniRoute פותר את זה:**

- ✅ **מקסם מנויים** - עקוב אחר מכסת, השתמש בכל סיביות לפני האיפוס
- ✅ **החזר אוטומטי** - מנוי → מפתח API → זול → חינם, אפס זמן השבתה
- ✅ **ריבוי חשבונות** - סיבוב בין חשבונות לכל ספק
- ✅ **אוניברסלי** - עובד עם קלוד קוד, Codex, Gemini CLI, Cursor, Cline, OpenClaw, כל כלי CLI

---

## 📧 תמיכה

> 💬 **הצטרפו לקהילה שלנו!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — קבל עזרה, שתף טיפים והישאר מעודכן.

- **אתר**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **בעיות**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **וואטסאפ**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **תורם**: ראה [CONTRIBUTING.md](CONTRIBUTING.md), פתח יחסי ציבור או בחר `good first issue`
- **פרויקט מקורי**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 מדווחים על באג?

בעת פתיחת בעיה, הפעל את פקודת מידע מערכת וצרף את הקובץ שנוצר:

```bash
npm run system-info
```

זה יוצר `system-info.txt` עם גרסת Node.js, גרסת OmniRoute, פרטי מערכת ההפעלה, כלי CLI מותקנים (iflow, gemini, claude, codex, antigravity, droid וכו'), סטטוס Docker/PM2 וחבילות מערכת - כל מה שאנחנו צריכים כדי לשחזר את הבעיה במהירות. צרף את הקובץ ישירות לבעיית GitHub שלך.

---

## 🔄 איך זה עובד

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Smart Router)        │
│  • Format translation (OpenAI ↔ Claude) │
│  • Quota tracking + Embeddings + Images │
│  • Auto token refresh                   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, Gemini CLI
       │   ↓ quota exhausted
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ budget limit
       ├─→ [Tier 3: CHEAP] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ budget limit
       └─→ [Tier 4: FREE] iFlow, Qwen, Kiro (unlimited)

Result: Never stop coding, minimal cost
```

---

## 🎯 מה OmniRoute פותר - 30 נקודות כאב אמיתיות ומקרי שימוש

> **כל מפתח המשתמש בכלי בינה מלאכותית מתמודד עם הבעיות הללו מדי יום.** OmniRoute נבנתה כדי לפתור את כולן - החל מחריפות עלויות ועד לחסימות אזוריות, מזרימות OAuth שבורות ועד פעולות פרוטוקול וצפייה ארגונית.

<details>
<summary><b>💸 1. "אני משלם עבור מנוי יקר אבל עדיין מופרע על ידי גבולות"</b></summary>

מפתחים משלמים $20-200 לחודש עבור Claude Pro, Codex Pro או GitHub Copilot. אפילו בתשלום, למכסה יש תקרה - 5 שעות שימוש, מגבלות שבועיות או מגבלות תעריף לדקה. סשן קידוד באמצע, הספק מפסיק להגיב והמפתח מאבד זרימה ופרודוקטיביות.

**איך OmniRoute פותר את זה:**

- **Smart 4-Tier Fallback** - אם מכסת המנויים נגמרת, מפנה אוטומטית למפתח API → זול → חינם עם אפס התערבות ידנית
- **מעקב מכסות בזמן אמת** - מציג צריכת אסימונים בזמן אמת עם ספירה לאחור מאפס (5 שעות, יומי, שבועי)
- **תמיכה בריבוי חשבונות** - מספר חשבונות לכל ספק עם סבב אוטומטי - כאשר אחד אוזל, עובר לאחר
- **שילובים מותאמים אישית** - שרשראות ניתנות להתאמה אישית עם 6 אסטרטגיות איזון (מילוי ראשון, סיבוב סיבובי, P2C, אקראי, הכי פחות בשימוש, אופטימיזציה לעלות)
- **Codex Business Quotas** - ניטור מכסות סביבת עבודה עסקית/צוותית ישירות בלוח המחוונים

</details>

<details>
<summary><b>🔌 2. "אני צריך להשתמש במספר ספקים אבל לכל אחד יש API שונה"</b></summary>

OpenAI משתמש בפורמט אחד, קלוד (אנתרופיק) משתמש בפורמט אחר, תאומים בנוסח אחר. אם מפתח רוצה לבחון דגמים מספקים שונים או לחלוף ביניהם, הוא צריך להגדיר מחדש SDK, לשנות נקודות קצה, להתמודד עם פורמטים לא תואמים. לספקים מותאמים אישית (FriendLI, NIM) יש נקודות קצה לא סטנדרטיות במודל.

**איך OmniRoute פותר את זה:**

- **נקודת קצה מאוחדת** - `http://localhost:20128/v1` יחיד משמש כ-proxy עבור כל 67+ הספקים
- **תרגום פורמט** — אוטומטי ושקוף: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **חיטוי תגובה** - מסיר שדות לא סטנדרטיים (`x_groq`, `usage_breakdown`, `service_tier`) שמפרקים את OpenAI SDK v1.83+
- **נורמליזציה של תפקידים** - ממירה `developer` → `system` עבור ספקים שאינם OpenAI; `system` → `user` עבור GLM/ERNIE
- **Think Tag Extraction** — מחלץ `<think>` בלוקים מדגמים כמו DeepSeek R1 לתוך `reasoning_content` סטנדרטי
- **פלט מובנה עבור מזל תאומים** — `json_schema` → `responseMimeType`/`responseSchema` המרה אוטומטית
- **`stream` ברירת המחדל היא `false`** - מתיישר עם מפרט OpenAI, הימנעות SSE בלתי צפוי ב- Python/Rust/Go SDK

</details>

<details>
<summary><b>🌐 3. "ספק ה-AI שלי חוסם את האזור/המדינה שלי"</b></summary>

ספקים כמו OpenAI/Codex חוסמים גישה מאזורים גיאוגרפיים מסוימים. משתמשים מקבלים שגיאות כמו `unsupported_country_region_territory` במהלך חיבורי OAuth ו-API. זה מתסכל במיוחד עבור מפתחים ממדינות מתפתחות.

**איך OmniRoute פותר את זה:**

- **תצורת פרוקסי בשלוש רמות** - פרוקסי ניתן להגדרה ב-3 רמות: גלובלית (כל התעבורה), לכל ספק (ספק אחד בלבד), ולכל חיבור/מפתח
- **תגי פרוקסי מקודדים בצבע** - אינדיקטורים חזותיים: 🟢 פרוקסי גלובלי, 🟡 פרוקסי ספק, 🔵 פרוקסי חיבור, תמיד מציג את ה-IP
- **החלפת אסימונים של OAuth באמצעות פרוקסי** - זרימת OAuth עוברת גם דרך ה-proxy, ופותרת את `unsupported_country_region_territory`
- **בדיקות חיבור באמצעות פרוקסי** - בדיקות חיבור משתמשות בפרוקסי המוגדר (לא עוד מעקף ישיר)
- **תמיכה SOCKS5** — תמיכה מלאה ב-Proxy SOCKS5 לניתוב יוצא
- **זיוף טביעות אצבע TLS** - טביעת אצבע TLS דמוית דפדפן באמצעות `wreq-js` כדי לעקוף את זיהוי הבוטים
- **🔏 התאמת טביעות אצבע של CLI** - מסדר מחדש כותרות ושדות גוף כדי להתאים לחתימות בינאריות מקוריות של CLI, ומפחית באופן דרסטי את הסיכון לסימון חשבון. ה-IP של ה-proxy נשמר - אתה מקבל גם מיסוך **ו** IP בו-זמנית

</details>

<details>
<summary><b>🆓 4. "אני רוצה להשתמש ב-AI לקידוד אבל אין לי כסף"</b></summary>

לא כולם יכולים לשלם 20-200 $ לחודש עבור מנויי AI. סטודנטים, מפתחים ממדינות מתפתחות, חובבים ופרילנסרים צריכים גישה לדגמים איכותיים בעלות אפסית.

**איך OmniRoute פותר את זה:**

- **ספקי שכבת חינם מובנית** - תמיכה מקורית עבור 100% ספקים חינמיים: iFlow (5 דגמים ללא הגבלה דרך OAuth: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen (4 unlimited-qwens,-rs) qwen3-coder-flash, qwen3-coder-next, vision-model), Kiro (קלוד + AWS Builder ID בחינם), Gemini CLI (180K אסימונים/חודש חינם)
- **Ollama Cloud** - דגמי Ollama המתארחים בענן ב-`api.ollama.com` עם שכבת "שימוש קל" בחינם; השתמש בקידומת `ollamacloud/<model>`
- **שילובים בחינם בלבד** — שרשרת `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0 לחודש עם אפס זמן השבתה
- **גישה חופשית ל-NVIDIA NIM** - גישה חופשית של ~40 RPM ל-dev-forever ל-70+ דגמים בכתובת build.nvidia.com (מעבר מנקודות זכות למגבלות תעריף טהורות)
- **אסטרטגיית אופטימיזציה לעלות** — אסטרטגיית ניתוב שבוחרת אוטומטית את הספק הזמין הזול ביותר

</details>

<details>
<summary><b>🔒 5. "אני צריך להגן על שער הבינה המלאכותית שלי מגישה לא מורשית"</b></summary>

בעת חשיפת שער AI לרשת (LAN, VPS, Docker), כל מי שיש לו את הכתובת יכול לצרוך את האסימונים/מכסה של המפתח. ללא הגנה, ממשקי API חשופים לשימוש לרעה, הזרקה מהירה וניצול לרעה.

**איך OmniRoute פותר את זה:**

- **ניהול מפתחות API** - יצירה, סיבוב והיקף לכל ספק עם עמוד `/dashboard/api-manager` ייעודי
- **הרשאות ברמת הדגם** - הגבל מפתחות API לדגמים ספציפיים (`openai/*`, דפוסי תווים כלליים), עם הלחצן 'אפשר הכל/הגבל'
- **API Endpoint Protection** — דרוש מפתח עבור `/v1/models` וחסום ספקים ספציפיים מהרישום
- **Auth Guard + CSRF Protection** — כל מסלולי לוח המחוונים מוגנים באמצעות תוכנת `withAuth` + אסימוני CSRF
- ** מגביל קצב** - הגבלת קצב לפי IP עם חלונות הניתנים להגדרה
- **סינון IP** — רשימת הרשאות/רשימת חסימות לבקרת גישה
- **משמר הזרקה מהירה** - חיטוי נגד דפוסי הנחיה זדוניים
- **הצפנת AES-256-GCM** - אישורים מוצפנים בזמן מנוחה

</details>

<details>
<summary><b>🛑 6. "הספק שלי נפל ואיבדתי את זרימת הקידוד שלי"</b></summary>

ספקי בינה מלאכותית עלולים להפוך לבלתי יציבים, להחזיר שגיאות 5xx או לפגוע במגבלות קצב זמניות. אם מפתח תלוי בספק יחיד, הם מופרעים. ללא מפסקים, נסיונות חוזרים ונשנים עלולים לקרוס את האפליקציה.

**איך OmniRoute פותר את זה:**

- **מפסק מעגלים לכל דגם** — פתיחה/סגירה אוטומטית עם ספים הניתנים להגדרה והתקררות (סגור/פתוח/חצי פתוח), בהיקף לכל דגם כדי למנוע בלוקים מדורגים
- **גיבוי אקספוננציאלי** - עיכובים מתקדמים בניסיון חוזר
- **עדר נגד רעמים** - הגנה על מוטקס + סמפור מפני סופות ניסיונות חוזרות במקביל
- **שרשראות משולבות Fallback** - אם הספק הראשי נכשל, נופל אוטומטית בשרשרת ללא התערבות
- **מפסק משולב** - משבית אוטומטית ספקים כושלים בשרשרת משולבת
- **לוח מחוונים לבריאות** - ניטור זמן פעולה, מצבי מפסק זרם, נעילות, סטטיסטיקות מטמון, זמן אחזור p50/p95/p99

</details>

<details>
<summary><b>🔧 7. "הגדרת כל כלי בינה מלאכותית היא מייגעת וחוזרת על עצמה"</b></summary>

מפתחים משתמשים ב-Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... כל כלי צריך תצורה שונה (נקודת קצה, מפתח, מודל API). הגדרה מחדש בעת החלפת ספקים או דגמים היא בזבוז זמן.

**איך OmniRoute פותר את זה:**

- **לוח המחוונים של CLI Tools** - דף ייעודי עם הגדרה בלחיצה אחת עבור Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — מייצר `chatLanguageModels.json` עבור קוד VS עם בחירת דגמים בכמות גדולה
- **אשף ההטמעה** — הגדרה מודרכת בת 4 שלבים למשתמשים ראשונים
- **נקודת קצה אחת, כל הדגמים** - הגדר את `http://localhost:20128/v1` פעם אחת, גש ל-67+ ספקים

</details>

<details>
<summary><b>🔑 8. "ניהול אסימוני OAuth ממספר ספקים זה גיהנום"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot - כולם משתמשים ב-OAuth 2.0 עם אסימונים שפג תוקפם. מפתחים צריכים לבצע אימות מחדש כל הזמן, להתמודד עם `client_secret is missing`, `redirect_uri_mismatch` וכשלים בשרתים מרוחקים. OAuth ב-LAN/VPS בעייתי במיוחד.

**איך OmniRoute פותר את זה:**

- **רענון אסימון אוטומטי** - אסימוני OAuth מתרעננים ברקע לפני פקיעת תוקף
- **OAuth 2.0 (PKCE) מובנה** - זרימה אוטומטית עבור Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- ** OAuth מרובה חשבונות** - מספר חשבונות לכל ספק באמצעות חילוץ אסימון JWT/ID
- **OAuth LAN/תיקון מרחוק** - זיהוי IP פרטי עבור `redirect_uri` + מצב כתובת URL ידני עבור שרתים מרוחקים
- **OAuth Behind Nginx** - משתמש ב-`window.location.origin` לתאימות פרוקסי הפוכה
- **מדריך OAuth מרחוק** - מדריך שלב אחר שלב לאישורי Google Cloud ב-VPS/Docker

</details>

<details>
<summary><b>📊 9. "אני לא יודע כמה אני מוציא או איפה"</b></summary>

מפתחים משתמשים במספר ספקים בתשלום אך אין להם ראייה אחידה של הוצאות. לכל ספק יש לוח מחוונים משלו לחיוב, אבל אין תצוגה מאוחדת. עלויות בלתי צפויות עלולות להיערם.

**איך OmniRoute פותר את זה:**

- **לוח מחוונים של ניתוח עלויות** - מעקב אחר עלויות לפי אסימון וניהול תקציב לכל ספק
- **מגבלות תקציב לכל שכבה** - תקרת הוצאה לכל שכבה שמפעילה נפילה אוטומטית
- **תצורת תמחור לפי דגם** — מחירים הניתנים להגדרה לכל דגם
- **סטטיסטיקת שימוש לכל מפתח API** - ספירת בקשות וחותמת זמן אחרונה בשימוש לכל מפתח
- **לוח המחוונים של אנליטיקס** - כרטיסי סטטיסטיקה, טבלת שימוש במודל, טבלת ספקים עם אחוזי הצלחה והשהייה

</details>

<details>
<summary><b>🐛 10. "אני לא יכול לאבחן שגיאות ובעיות בשיחות AI"</b></summary>

כאשר שיחה נכשלת, ה-dev לא יודע אם זו הייתה מגבלת תעריף, אסימון שפג תוקפו, פורמט שגוי או שגיאת ספק. יומנים מפוצלים על פני מסופים שונים. ללא צפייה, איתור באגים הוא ניסוי וטעייה.

**איך OmniRoute פותר את זה:**

- **לוח מחוונים של יומנים מאוחדים** - 4 כרטיסיות: יומני בקשות, יומני פרוקסי, יומני ביקורת, מסוף
- **מציג יומן מסוף** - מציג בזמן אמת בסגנון טרמינל עם רמות מקודדות צבע, גלילה אוטומטית, חיפוש, סינון
- **SQLite Proxy Logs** - יומנים מתמשכים ששורדים אתחול מחדש של השרת
- **מגרש משחקים לתרגום** - 4 מצבי ניפוי באגים: מגרש משחקים (תרגום פורמט), בודק צ'אט (הלוך ושוב), ספסל בדיקה (אצווה), צג חי (בזמן אמת)
- **Request Telemetry** — חביון p50/p95/p99 + X-Request-Id מעקב
- **רישום מבוסס קבצים עם סיבוב** - מיירט המסוף לוכד הכל ליומן JSON עם סיבוב מבוסס גודל
- **דוח מידע מערכת** — `npm run system-info` יוצר `system-info.txt` עם הסביבה המלאה שלך (גרסת צומת, גרסת OmniRoute, מערכת הפעלה, כלי CLI, סטטוס Docker/PM2). צרף אותו בעת דיווח על בעיות לבדיקה מיידית.

</details>

<details>
<summary><b>🏗️ 11. "פריסה ותחזוקה של השער מורכבת"</b></summary>

התקנה, הגדרה ותחזוקה של פרוקסי בינה מלאכותית בסביבות שונות (מקומי, VPS, Docker, ענן) היא עתירת עבודה. בעיות כמו נתיבים מקודדים, `EACCES` על ספריות, התנגשויות יציאות ובנייה בין פלטפורמות מוסיפות חיכוך.

**איך OmniRoute פותר את זה:**

- **התקנה גלובלית npm** — `npm install -g omniroute && omniroute` — בוצעה
- **Docker Multi-Platform** - מקורי AMD64 + ARM64 (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose Profiles** — `base` (ללא כלי CLI) ו`cli` (עם קוד של קלוד, Codex, OpenClaw)
- **אפליקציית Electron Desktop** — אפליקציה מקורית עבור Windows/macOS/Linux עם מגש מערכת, הפעלה אוטומטית, מצב לא מקוון
- **מצב יציאות מפוצלות** - API ולוח מחוונים ביציאות נפרדות עבור תרחישים מתקדמים (פרוקסי הפוך, רשת קונטיינר)
- **Cloud Sync** - הגדרת סנכרון בין מכשירים באמצעות Cloudflare Workers
- **גיבויי DB** - גיבוי, שחזור, ייצוא וייבוא אוטומטי של כל ההגדרות

</details>

<details>
<summary><b>🌍 12. "הממשק הוא באנגלית בלבד והצוות שלי לא מדבר אנגלית"</b></summary>

צוותים במדינות שאינן דוברות אנגלית, במיוחד באמריקה הלטינית, אסיה ואירופה, נאבקים עם ממשקים באנגלית בלבד. מחסומי שפה מפחיתים את האימוץ ומגדילים את שגיאות התצורה.

**איך OmniRoute פותר את זה:**

- **לוח המחוונים i18n — 30 שפות** — כל 500+ המקשים מתורגמים כולל ערבית, בולגרית, דנית, גרמנית, ספרדית, פינית, צרפתית, עברית, הינדית, הונגרית, אינדונזית, איטלקית, יפנית, קוריאנית, מלאית, הולנדית, נורווגית, פולנית, פורטוגזית (PT/BR), רומנית, רוסית, סלובקית, שוודית, תאילנדית, סלובקית, שוודית, סינית, סלובקית, וייטנאם
- **תמיכה ב-RTL** — תמיכה מימין לשמאל לערבית ולעברית
- ** README מרובים שפות** - 30 תרגומי תיעוד מלאים
- **בורר שפה** - סמל גלובוס בכותרת למעבר בזמן אמת

</details>

<details>
<summary><b>🔄 13. "אני צריך יותר מצ'אט - אני צריך הטמעות, תמונות, אודיו"</b></summary>

AI זה לא רק השלמת צ'אט. מפתחים צריכים ליצור תמונות, לתמלל אודיו, ליצור הטמעות עבור RAG, לדרג מחדש מסמכים ולתת תוכן. לכל API יש נקודת קצה ופורמט שונים.

**איך OmniRoute פותר את זה:**

- **הטמעות** — `/v1/embeddings` עם 6 ספקים ו-9 דגמים ומעלה
- **יצירת תמונות** — `/v1/images/generations` עם 10 ספקים ו-20+ דגמים (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **טקסט לווידאו** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) ו-SD WebUI
- **טקסט למוזיקה** — `/v1/music/generations` — ComfyUI (פתוח אודיו יציב, MusicGen)
- **תמלול אודיו** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **טקסט לדיבור** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + ספקים קיימים
- **מנחים** — `/v1/moderations` — בדיקות בטיחות תוכן
- **דירוג מחדש** — `/v1/rerank` — דירוג מחדש של רלוונטיות המסמך
- **Responses API** - תמיכה מלאה `/v1/responses` עבור Codex

</details>

<details>
<summary><b>🧪 14. "אין לי דרך לבדוק ולהשוות איכות בין דגמים"</b></summary>

מפתחים רוצים לדעת איזה דגם הוא הטוב ביותר עבור מקרה השימוש שלהם - קוד, תרגום, הנמקה - אבל ההשוואה ידנית היא איטית. לא קיימים כלי eval משולבים.

**איך OmniRoute פותר את זה:**

- **הערכות LLM** - בדיקת סט זהב עם 10 מקרים טעונים מראש המכסים ברכות, מתמטיקה, גיאוגרפיה, יצירת קוד, תאימות ל-JSON, תרגום, סימון, סירוב בטיחות
- **4 אסטרטגיות התאמה** — `exact`, `contains`, `regex`, `custom` (פונקציית JS)
- **ספסל בדיקה במגרש משחקים של מתרגם** - בדיקות אצווה עם מספר כניסות ויציאות צפויות, השוואה בין ספקים
- ** בודק צ'אט** - הלוך ושוב מלא עם עיבוד תגובה ויזואלית
- **מעקב חי** - זרם בזמן אמת של כל הבקשות הזורמות דרך ה-proxy

</details>

<details>
<summary><b>📈 15. "אני צריך לבצע קנה מידה בלי לאבד ביצועים"</b></summary>

ככל שנפח הבקשות גדל, ללא שמירה במטמון, אותן שאלות מייצרות עלויות כפולות. ללא אימפוטנציה, עיבוד פסולת בקשות כפולות. יש לכבד את מגבלות התעריפים לכל ספק.

**איך OmniRoute פותר את זה:**

- **מטמון סמנטי** - מטמון דו-שכבתי (חתימה + סמנטי) מפחית את העלות והשהייה
- **Request Idempotency** — חלון מניעת כפילויות של 5 שניות לבקשות זהות
- **זיהוי מגבלת תעריף** - RPM לכל ספק, פער מינימלי ומעקב מרבי בו-זמנית
- **מגבלות קצב הניתנות לעריכה** - ברירות מחדל הניתנות להגדרה בהגדרות ← חוסן עם התמדה
- **מטמון מפתח API** - מטמון בן 3 שכבות לביצועי ייצור
- **לוח מחוונים לבריאות עם טלמטריה** - זמן אחזור p50/p95/p99, סטטיסטיקות מטמון, זמן פעולה

</details>

<details>
<summary><b>🤖 16. "אני רוצה לשלוט בהתנהגות המודל באופן גלובלי"</b></summary>

מפתחים שרוצים את כל התגובות בשפה ספציפית, עם טון ספציפי, או רוצים להגביל את אסימוני הנמקה. הגדרה זו בכל כלי/בקשה אינה מעשית.

**איך OmniRoute פותר את זה:**

- **הזרקת הנחיית מערכת** - הנחיה גלובלית חלה על כל הבקשות
- ** אימות תקציב חושב** - בקרת הקצאת אסימונים בהיגיון לכל בקשה (מעבר, אוטומטי, מותאם אישית, אדפטיבי)
- **6 אסטרטגיות ניתוב** - אסטרטגיות גלובליות הקובעות את אופן הפצת הבקשות
- **נתב תווים כלליים** — דפוסי `provider/*` נותבים באופן דינמי לכל ספק
- **הפעל/השבת שילוב של החלפה** — החלף שילובים ישירות מלוח המחוונים
- **החלפת ספק** — הפעל/השבת את כל החיבורים עבור ספק בלחיצה אחת
- **ספקים חסומים** — אל תכלול ספקים ספציפיים מהרישום `/v1/models`

</details>

<details>
<summary><b>🧰 17. "אני צריך כלי MCP כיכולות מוצר מהשורה הראשונה"</b></summary>

שערי AI רבים חושפים את MCP רק כפרט יישום נסתר. צוותים צריכים שכבת פעולה גלויה וניתנת לניהול.

**איך OmniRoute פותר את זה:**

- MCP מופיע בכרטיסיית הניווט של לוח המחוונים ופרוטוקול נקודת הקצה
- דף ניהול MCP ייעודי עם תהליך, כלים, היקפים וביקורת
- התחלה מהירה מובנית עבור `omniroute --mcp` וכניסה ללקוח

</details>

<details>
<summary><b>🧠 18. "אני צריך תזמור A2A עם סנכרון + נתיבי משימות זרם"</b></summary>

זרימות עבודה של סוכן זקוקות הן לתשובות ישירות והן לביצוע זרימה ארוך טווח עם בקרת מחזור חיים.

**איך OmniRoute פותר את זה:**

- נקודת קצה A2A JSON-RPC (`POST /a2a`) עם `message/send` ו`message/stream`
- הזרמת SSE עם הפצת מצב מסוף
- ממשקי API של מחזור חיים של משימות עבור `tasks/get` ו`tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "אני צריך בריאות של תהליך MCP אמיתי, מצב לא מנחש"</b></summary>

צוותים תפעוליים צריכים לדעת אם MCP באמת חי, לא רק אם ניתן להגיע ל-API.

**איך OmniRoute פותר את זה:**

- קובץ פעימות לב בזמן ריצה עם PID, חותמות זמן, תחבורה, ספירת כלים ומצב היקף
- MCP status API המשלב פעימות לב + פעילות אחרונה
- כרטיסי סטטוס ממשק משתמש עבור תהליך/זמן פעולה/רעננות פעימות לב

</details>

<details>
<summary><b>📋 20. "אני צריך ביצוע כלי MCP שניתן לביקורת"</b></summary>

כאשר כלים משתנים בתצורה או מפעילים פעולות מבצעיות, הצוותים זקוקים למעקב פורנזי.

**איך OmniRoute פותר את זה:**

- רישום ביקורת מגובה SQLite עבור קריאות לכלי MCP
- מסננים לפי כלי, הצלחה/כישלון, מפתח API ועימוד
- טבלת ביקורת לוח המחוונים + נקודות קצה סטטיסטיקות לאוטומציה

</details>

<details>
<summary><b>🔐 21. "אני צריך הרשאות MCP בהיקף לכל אינטגרציה"</b></summary>

ללקוחות שונים צריכה להיות גישה בעלת הרשאות מינימליות לקטגוריות כלים.

**איך OmniRoute פותר את זה:**

- 9 היקפי MCP גרגירים לגישה מבוקרת לכלי
- אכיפה של היקף ונראות בממשק המשתמש של ניהול MCP
- תנוחת ברירת מחדל בטוחה עבור כלי עבודה תפעוליים

</details>

<details>
<summary><b>⚙️ 22. "אני צריך בקרות תפעוליות בלי לפרוס מחדש"</b></summary>

צוותים זקוקים לשינויים מהירים בזמן ריצה במהלך אירועים או אירועי עלות.

**איך OmniRoute פותר את זה:**

- החלף הפעלה משולבת ישירות מלוח המחוונים של MCP
- החל פרופילי חוסן מחבילות מדיניות מוגדרות מראש
- אפס את מצב מפסק החשמל מאותו לוח פעולות

</details>

<details>
<summary><b>🔄 23. "אני צריך נראות וביטול מחזור החיים של משימות A2A בשידור חי"</b></summary>

ללא נראות של מחזור חיים, אירועי משימות הופכים קשים לבדיקה.

**איך OmniRoute פותר את זה:**

- רישום משימות/סינון לפי מצב/מיומנות עם עימוד
- פירוט על מטא נתונים של משימות, אירועים וחפצים
- נקודת קצה לביטול משימות ופעולת ממשק משתמש עם אישור

</details>

<details>
<summary><b>🌊 24. "אני צריך מדדי זרם פעילים עבור טעינת A2A"</b></summary>

זרימות עבודה בסטרימינג דורשות תובנה תפעולית לגבי חיבורים במקביל וחיבורים חיים.

**איך OmniRoute פותר את זה:**

- מוני זרמים פעילים משולבים בסטטוס A2A
- חותמת הזמן האחרונה של המשימה וספירות לכל מדינה
- כרטיסי לוח מחוונים A2A לניטור פעולות בזמן אמת

</details>

<details>
<summary><b>🪪 25. "אני צריך גילוי סוכן סטנדרטי עבור לקוחות"</b></summary>

לקוחות חיצוניים ומתזמרים זקוקים למטא-נתונים הניתנים לקריאת מכונה לצורך הצטרפות.

**איך OmniRoute פותר את זה:**

- כרטיס סוכן חשוף ב-`/.well-known/agent.json`
- יכולות ומיומנויות המוצגות בממשק המשתמש לניהול
- API לסטטוס A2A כולל מטא נתונים של גילוי לאוטומציה

</details>

<details>
<summary><b>🧭 26. "אני צריך גילוי פרוטוקול ב-UX של המוצר"</b></summary>

אם משתמשים לא יכולים לגלות משטחי פרוטוקול, האימוץ והתמיכה יורדים.

**איך OmniRoute פותר את זה:**

- דף **נקודות קצה** מאוחד עם כרטיסיות עבור נקודות Proxy, MCP, A2A ו-API
- חילופי מצב שירות מוטבע (מקוון/לא מקוון) עבור MCP ו-A2A
- קישורים מסקירה כללית לכרטיסיות ניהול ייעודיות

</details>

<details>
<summary><b>🧪 27. "אני צריך אימות פרוטוקול מקצה לקצה עם לקוחות אמיתיים"</b></summary>

בדיקות מדומה אינן מספיקות כדי לאמת תאימות פרוטוקול לפני השחרור.

**איך OmniRoute פותר את זה:**

- חבילת E2E המאתחלת אפליקציה ומשתמשת בהעברת לקוח MCP SDK אמיתית
- בדיקות לקוח A2A לאיתור, לשלוח, להזרים, לקבל ולבטל זרימות
- צלב הצהרות מול ביקורת MCP ומשימות A2A APIs

</details>

<details>
<summary><b>📡 28. "אני צריך צפייה מאוחדת בכל הממשקים"</b></summary>

פיצול צפיות לפי פרוטוקול יוצר כתמים עיוורים ו-MTTR ארוך יותר.

**איך OmniRoute פותר את זה:**

- לוחות מחוונים/יומנים/ניתוח מאוחדים במוצר אחד
- בריאות + ביקורת + טלמטריית בקשה על פני שכבות OpenAI, MCP ו-A2A
- APIs תפעוליים לסטטוס ואוטומציה

</details>

<details>
<summary><b>💼 29. "אני צריך זמן ריצה אחד עבור פרוקסי + כלים + תזמור סוכן"</b></summary>

הפעלת שירותים נפרדים רבים מגדילה את העלות התפעולית ואת מצבי הכשל.

**איך OmniRoute פותר את זה:**

- פרוקסי תואם OpenAI, שרת MCP ושרת A2A בערימה אחת
- אימות משותף, חוסן, מאגר נתונים וצפייה
- מודל מדיניות עקבי בכל משטחי האינטראקציה

</details>

<details>
<summary><b>🚀 30. "אני צריך לשלוח זרימות עבודה סוכניות ללא התפשטות קוד דבק"</b></summary>

צוותים מאבדים מהירות בעת תפירת שירותים ותסריטים אד-הוק מרובים.

**איך OmniRoute פותר את זה:**

- אסטרטגיית נקודות קצה אחידה עבור לקוחות וסוכנים
- ממשקי משתמש מובנים לניהול פרוטוקול ונתיבי אימות עשן
- יסודות מוכנים לייצור (אבטחה, רישום, חוסן, גיבוי)

</details>

### ספרי הפעלה לדוגמה (מקרי שימוש משולבים)

**Playbook A: מקסום מנוי בתשלום + גיבוי זול**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: ערימת קידוד בעלות אפסית**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: שרשרת ניצול תמיד 24/7**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D: סוכן מבצע עם MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 התחל בחינם - עלות תצורה אפסית

> הגדר קידוד AI תוך דקות ב-**$0 לחודש**. חבר את החשבונות החינמיים האלה והשתמש בשילוב המובנה של **Free Stack**.

| שלב | פעולה                                           | ספקים לא נעולים                                                    |
| --- | ----------------------------------------------- | ------------------------------------------------------------------ |
| 1   | התחבר **Kiro** (AWS Builder ID OAuth)           | קלוד סונטה 4.5, הייקו 4.5 — **ללא הגבלה**                          |
| 2   | חבר את **iFlow** (Google OAuth)                 | kimi-k2-thinking, qwen3-coder-plus, deepseek-r1... — **ללא הגבלה** |
| 3   | חבר **Qwen** (קוד מכשיר)                        | qwen3-coder-plus, qwen3-coder-flash... — **ללא הגבלה**             |
| 4   | חבר את **Gemini CLI** (Google OAuth)            | gemini-3-flash, gemini-2.5-pro — **180K/mo חינם**                  |
| 5   | `/dashboard/combos` → תבנית ערימה חינם ($0)\*\* | Round-robin כל הספקים בחינם אוטומטית                               |

**כוונו כל IDE/CLI ל:** `http://localhost:20128/v1` · מפתח API: `any-string` · בוצע.

> **כיסוי נוסף אופציונלי (גם בחינם):** מפתח API של Groq (30 סל"ד חינם), NVIDIA NIM (40 סל"ד חינם, 70+ דגמים), Cerebras (1M tok/day), מפתח LongCat API (50M tokens/day!), Cloudflare Workers AI (10K Neurons/day, 50+ דגמים).

## ⚡ התחלה מהירה

### 1) התקן והפעל

```bash
npm install -g omniroute
omniroute
```

> **משתמשי pnpm:** הפעל את `pnpm approve-builds -g` לאחר ההתקנה כדי לאפשר סקריפטים מקוריים לבנייה הנדרשים על ידי `better-sqlite3` ו`@swc/core`:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

לוח המחוונים נפתח ב-`http://localhost:20128` וכתובת ה-API הבסיסית היא `http://localhost:20128/v1`.

| פקודה                   | תיאור                                                 |
| ----------------------- | ----------------------------------------------------- |
| `omniroute`             | התחל שרת (`PORT=20128`, API ולוח מחוונים באותה יציאה) |
| `omniroute --port 3000` | הגדר יציאת קנונית/API ל-3000                          |
| `omniroute --mcp`       | הפעל את שרת MCP (תעבורת stdio)                        |
| `omniroute --no-open`   | אל תפתח אוטומטית את הדפדפן                            |
| `omniroute --help`      | הצג עזרה                                              |

מצב יציאות מפוצלות אופציונלי:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) חבר ספקים וצור את מפתח ה-API שלך

1. פתח את לוח המחוונים → `Providers` וחבר לפחות ספק אחד (OAuth או מפתח API).
2. פתח את לוח המחוונים → `Endpoints` וצור מפתח API.
3. (אופציונלי) פתח את לוח המחוונים ← `Combos` והגדר את שרשרת ההחלפה שלך.

### 3) כוון את כלי הקידוד שלך אל OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

עובד עם Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode ו-SDK תואמי OpenAI.

### 4) אפשר ולאמת פרוטוקולים (v2.0)

**MCP (עבור פעולות מונעות כלים):**

```bash
omniroute --mcp
```

לאחר מכן חבר את לקוח ה-MCP שלך דרך `stdio` ובדוק כלים כמו:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (עבור זרימות עבודה של סוכן לסוכן):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) אמת הכל מקצה לקצה (מומלץ)

```bash
npm run test:protocols:e2e
```

חבילה זו מאמתת זרימות אמיתיות של MCP ו-A2A מול אפליקציה פועלת.

### חלופה: הפעל מהמקור

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 דוקר

OmniRoute זמין כתמונת Docker ציבורית ב-[Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**ריצה מהירה:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**עם קובץ סביבה:**

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**שימוש ב-Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| תמונה                    | תג       | גודל   | תיאור                  |
| ------------------------ | -------- | ------ | ---------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | המהדורה היציבה האחרונה |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250MB | גרסה נוכחית            |

---

## 🖥️ אפליקציית שולחן העבודה - במצב לא מקוון ופועל תמיד

> 🆕 **חדש!** OmniRoute זמין כעת כ**יישום שולחן עבודה מקורי** עבור Windows, macOS ו-Linux.

הפעל את OmniRoute כאפליקציה עצמאית לשולחן העבודה - ללא מסוף, ללא דפדפן, ללא צורך באינטרנט עבור דגמים מקומיים. האפליקציה מבוססת אלקטרונים כוללת:

- 🖥️ **חלון מקורי** — חלון אפליקציה ייעודי עם שילוב מגש המערכת
- 🔄 **התחל אוטומטי** — הפעל את OmniRoute בכניסה למערכת
- 🔔 **התראות מקומיות** - קבל התראות על מיצוי המכסה או בעיות בספק
- ⚡ **התקנה בלחיצה אחת** - NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **מצב לא מקוון** - עובד במצב לא מקוון לחלוטין עם שרת מצורף

### התחלה מהירה

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### מגש מערכת

כאשר ממוזער, OmniRoute חי במגש המערכת שלך עם פעולות מהירות:

- פתח את לוח המחוונים
- שנה יציאת שרת
- צא מהאפליקציה

📖 תיעוד מלא: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 תמחור במבט חטוף

| שכבה            | ספק                         | עלות                               | איפוס מכסה               | הטוב ביותר עבור                             |
| --------------- | --------------------------- | ---------------------------------- | ------------------------ | ------------------------------------------- |
| **💳 מנוי**     | קלוד קוד (פרו)              | 20 דולר לחודש                      | 5 שעות + שבועי           | כבר נרשמת                                   |
|                 | קודקס (פלוס/פרו)            | $20-200 לחודש                      | 5 שעות + שבועי           | משתמשי OpenAI                               |
|                 | Gemini CLI                  | **חינם**                           | 180K/Mo + 1K/יום         | כֹּל אֶחָד!                                 |
|                 | GitHub Copilot              | 10-19 דולר לחודש                   | חודשי                    | משתמשי GitHub                               |
| **🔑 מפתח API** | NVIDIA NIM                  | **חינם** (פיתוח לנצח)              | ~40 סל"ד                 | 70+ דגמים פתוחים                            |
|                 | מוחין                       | **חינם** (1 מיליון טוקי/יום)       | 60K TPM / 30 RPM         | המהיר בעולם                                 |
|                 | גרוק                        | **חינם** (30 סל"ד)                 | 14.4K RPD                | לאמה/ג'מה מהירה במיוחד                      |
|                 | DeepSeek V3.2               | $0.27/$1.10 לכל מיליון             | אין                      | נימוק המחיר/איכות הטוב ביותר                |
|                 | xAI Grok-4 מהיר             | **$0.20/$0.50 לכל מיליון** 🆕      | אין                      | המהירה ביותר + קריאת כלי, אולטרה נמוכה      |
|                 | xAI Grok-4 (סטנדרטי)        | $0.20/$1.50 לכל מיליון 🆕          | אין                      | ספינת הדגל של היגיון מ-xAI                  |
|                 | מיסטרל                      | ניסיון חינם + בתשלום               | תעריף מוגבל              | AI אירופאי                                  |
|                 | OpenRouter                  | תשלום לפי שימוש                    | אין                      | 100+ דגמים אגר.                             |
| **💰 זול**      | GLM-5 (דרך Z.AI) 🆕         | $0.5/1 מיליון                      | כל יום 10:00             | פלט 128K, ספינת הדגל החדשה ביותר            |
|                 | GLM-4.7                     | $0.6/1 מיליון                      | כל יום 10:00             | גיבוי תקציבי                                |
|                 | MiniMax M2.5 🆕             | $0.3/1 מיליון קלט                  | גלגול של 5 שעות          | נימוק + משימות סוכן                         |
|                 | MiniMax M2.1                | $0.2/1 מיליון                      | גלגול של 5 שעות          | האפשרות הזולה ביותר                         |
|                 | Kimi K2.5 (Moonshot API) 🆕 | תשלום לפי שימוש                    | אין                      | גישה ישירה ל-Monshot API                    |
|                 | קימי K2                     | 9 $ לחודש דירה                     | 10 מיליון אסימונים לחודש | עלות צפויה                                  |
| **🆓 חינם**     | iFlow                       | **$0**                             | ללא הגבלה                | 5 דגמים ללא הגבלה                           |
|                 | קוון                        | **$0**                             | ללא הגבלה                | 4 דגמים ללא הגבלה                           |
|                 | קירו                        | **$0**                             | ללא הגבלה                | קלוד סונטה/הייקו (AWS Builder)              |
|                 | LongCat Flash-Lite 🆕       | **$0** (50 מיליון טוקי ליום 🔥)    | 1 RPS                    | המכסה החינמית הגדולה ביותר על פני כדור הארץ |
|                 | האבקות AI 🆕                | **$0** (אין צורך במפתח)            | 1 req/15s                | GPT-5, קלוד, DeepSeek, Llama 4              |
|                 | Cloudflare Workers AI 🆕    | **$0** (10K נוירונים ליום)         | ~150 resp/יום            | 50+ דגמים, יתרון עולמי                      |
|                 | Scaleway AI 🆕              | **$0** (1 מיליון אסימונים בסך הכל) | תעריף מוגבל              | EU/GDPR, Qwen3 235B, Llama 70B              |

> 🆕 **דגמים חדשים שנוספו (מרץ 2026):** משפחת Grok-4 Fast ב-$0.20/$0.50/M (מודד ב-1143ms - מהיר יותר ב-30% מ-Gemini 2.5 Flash), GLM-5 דרך Z.AI עם פלט של 128K, נימוק של MiniMax M2.5, KimiSeek pr. API ישיר.

**💡 ערימת משולבת של $0 - ההגדרה המלאה בחינם:**

```
# 🆓 Ultimate Free Stack 2026 — 11 Providers, $0 Forever
Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
Qwen (qw/)             → qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next UNLIMITED
Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free API key
Cloudflare AI (cf/)    → Llama 70B, Gemma 3, Mistral — 10K Neurons/day
Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
Groq (groq/)           → Llama/Gemma ultra-fast — 14.4K req/day
NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
```

**עלות אפסית. לעולם לא מפסיק לקודד.** הגדר זאת כמשולבת OmniRoute אחת וכל הכשלים חוזרים מתרחשים באופן אוטומטי - אף פעם אין החלפה ידנית.

---

---

## 🆓 דגמים בחינם — מה שאתה מקבל בפועל

> כל הדגמים למטה הם **100% חינם ללא צורך בכרטיס אשראי**. OmniRoute מנתב מסלולים אוטומטיים ביניהם כאשר מכסה אחת נגמרת - שלב את כולם לשילוב בלתי שביר של $0.

### 🔵 מודלים של CLAUDE (דרך Kiro — מזהה AWS Builder)

| דגם                 | קידומת | הגבלה         | מגבלת שיעור           |
| ------------------- | ------ | ------------- | --------------------- |
| `claude-sonnet-4.5` | `kr/`  | **ללא הגבלה** | אין מכסה יומית מדווחת |
| `claude-haiku-4.5`  | `kr/`  | **ללא הגבלה** | אין מכסה יומית מדווחת |
| `claude-opus-4.6`   | `kr/`  | **ללא הגבלה** | אופוס אחרון דרך קירו  |

### דגמי IFLOW (OAuth בחינם - ללא כרטיס אשראי)

| דגם                | קידומת | הגבלה         | מגבלת שיעור    |
| ------------------ | ------ | ------------- | -------------- |
| `kimi-k2-thinking` | `if/`  | **ללא הגבלה** | אין כובע מדווח |
| `qwen3-coder-plus` | `if/`  | **ללא הגבלה** | אין כובע מדווח |
| `deepseek-r1`      | `if/`  | **ללא הגבלה** | אין כובע מדווח |
| `minimax-m2.1`     | `if/`  | **ללא הגבלה** | אין כובע מדווח |
| `kimi-k2`          | `if/`  | **ללא הגבלה** | אין כובע מדווח |

### 🟡 מודלים של QWEN (אימות קוד מכשיר)

| דגם                 | קידומת | הגבלה         | מגבלת שיעור         |
| ------------------- | ------ | ------------- | ------------------- |
| `qwen3-coder-plus`  | `qw/`  | **ללא הגבלה** | אין כובע מדווח      |
| `qwen3-coder-flash` | `qw/`  | **ללא הגבלה** | אין כובע מדווח      |
| `qwen3-coder-next`  | `qw/`  | **ללא הגבלה** | אין כובע מדווח      |
| `vision-model`      | `qw/`  | **ללא הגבלה** | Multimodal (תמונות) |

### GEMINI CLI (Google OAuth)

| דגם                      | קידומת | הגבלה                       | מגבלת שיעור |
| ------------------------ | ------ | --------------------------- | ----------- |
| `gemini-3-flash-preview` | `gc/`  | **180K tok/חודש** + 1K ליום | איפוס חודשי |
| `gemini-2.5-pro`         | `gc/`  | 180K/חודש (בריכה משותפת)    | איכות גבוהה |

### ⚫ NVIDIA NIM (מפתח API בחינם — build.nvidia.com)

| שכבה         | מגבלה יומית   | מגבלת שיעור  | הערות                                            |
| ------------ | ------------- | ------------ | ------------------------------------------------ |
| חינם (פיתוח) | ללא כובע סמלי | **~40 סל"ד** | 70+ דגמים; מעבר למגבלות תעריפים טהורות אמצע 2025 |

דגמים פופולריים בחינם: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`, `deepseek/deepseek-r1`

### ⚪ CEREBRAS (מפתח API בחינם — inference.cerebras.ai)

| שכבה | מגבלה יומית                | מגבלת שיעור      | הערות                                 |
| ---- | -------------------------- | ---------------- | ------------------------------------- |
| חינם | **1 מיליון אסימונים ליום** | 60K TPM / 30 RPM | מסקנת LLM המהירה בעולם; מתאפס מדי יום |

זמין בחינם: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (מפתח API בחינם — console.groq.com)

| שכבה | מגבלה יומית   | מגבלת שיעור  | הערות                                   |
| ---- | ------------- | ------------ | --------------------------------------- |
| חינם | **14.4K RPD** | 30 סל"ד לדגם | ללא כרטיס אשראי; 429 על הגבלה, לא מחויב |

זמין בחינם: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (מפתח API בחינם — longcat.chat) 🆕

| דגם                           | קידומת | מכסה יומית חינם           | הערות                             |
| ----------------------------- | ------ | ------------------------- | --------------------------------- |
| `LongCat-Flash-Lite`          | `lc/`  | **50 מיליון אסימונים** 💥 | המכסה החינמית הגדולה ביותר אי פעם |
| `LongCat-Flash-Chat`          | `lc/`  | 500K אסימונים             | צ'אט מרובה פניות                  |
| `LongCat-Flash-Thinking`      | `lc/`  | 500K אסימונים             | נימוק / CoT                       |
| `LongCat-Flash-Thinking-2601` | `lc/`  | 500K אסימונים             | גרסה ינואר 2026                   |
| `LongCat-Flash-Omni-2603`     | `lc/`  | 500K אסימונים             | מולטימודאלי                       |

> 100% בחינם בזמן בטא ציבורית. הירשם ב-[longcat.chat](https://longcat.chat) באמצעות דוא"ל או טלפון. מאפס מדי יום 00:00 UTC.

### 🟢 POLLINATIONS AI (לא נדרש מפתח API) 🆕

| דגם        | קידומת | מגבלת שיעור | ספק מאחורי       |
| ---------- | ------ | ----------- | ---------------- |
| `openai`   | `pol/` | 1 req/15s   | GPT-5            |
| `claude`   | `pol/` | 1 req/15s   | האנתרופי קלוד    |
| `gemini`   | `pol/` | 1 req/15s   | Google Gemini    |
| `deepseek` | `pol/` | 1 req/15s   | DeepSeek V3      |
| `llama`    | `pol/` | 1 req/15s   | מטה לאמה 4 צופית |
| `mistral`  | `pol/` | 1 req/15s   | Mistral AI       |

> ✨ **אפס חיכוך:** ללא הרשמה, ללא מפתח API. הוסף את ספק ההאבקות עם שדה מפתח ריק וזה יפעל מיד.

### 🟠 CLOUDFLARE WORKERS AI (מפתח API בחינם — cloudflare.com) 🆕

| שכבה | נוירונים יומיים | שימוש שווה ערך                          | הערות                  |
| ---- | --------------- | --------------------------------------- | ---------------------- |
| חינם | **10,000**      | ~150 LLM resp / 500s אודיו / 15K הטמעות | יתרון עולמי, 50+ דגמים |

דגמים פופולריים בחינם: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (שמע בחינם!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> דורש קוד API + מזהה חשבון מ-[dash.cloudflare.com](https://dash.cloudflare.com). אחסן את מזהה החשבון בהגדרות הספק.

### 🟣 SCALEWAY AI (1 מיליון אסימונים בחינם — scaleway.com) 🆕

| שכבה | מכסה חינם             | מיקום                   | הערות                         |
| ---- | --------------------- | ----------------------- | ----------------------------- |
| חינם | **1 מיליון אסימונים** | 🇫🇷 פריז, האיחוד האירופי | אין צורך בכרטיס אשראי במגבלות |

זמין בחינם: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> תואם לאיחוד האירופי/GDPR. קבל מפתח API ב-[console.scaleway.com](https://console.scaleway.com).

> **💡 ערימת החינמיות האולטימטיבית (11 ספקים, $0 לנצח):**
>
> ```
> Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
> iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
> LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
> Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
> Qwen (qw/)             → qwen3-coder models UNLIMITED
> Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free
> Cloudflare AI (cf/)    → 50+ models — 10K Neurons/day
> Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
> Groq (groq/)           → Llama/Gemma — 14.4K req/day ultra-fast
> NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
> Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
> ```

## 🎙️ משולבת תמלול חינם

> תמלל כל אודיו/וידאו תמורת **$0** — לידים ב-Deepgram עם 200$ בחינם, AssemblyAI 50$ חזרה, Groq Whisper כגיבוי חירום בלתי מוגבל.

| ספק               | קרדיטים חינם          | הדוגמנית הטובה ביותר                    | מגבלת שיעור                    |
| ----------------- | --------------------- | --------------------------------------- | ------------------------------ |
| **Deepgram**      | **$200 חינם** (הרשמה) | `nova-3` — הדיוק הטוב ביותר, 30+ שפות   | אין מגבלת RPM על זיכויים בחינם |
| 🔵 **AssemblyAI** | **$50 חינם** (הרשמה)  | `universal-3-pro` — פרקים, סנטימנט, PII | אין מגבלת RPM על זיכויים בחינם |
| 🔴 **גרוק**       | **חופשי לנצח**        | `whisper-large-v3` — OpenAI Whisper     | 30 סל"ד (קצב מוגבל)            |

**שילוב מוצע ב-`/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

לאחר מכן ב-`/dashboard/media` ← כרטיסיית **תמלול**: העלה כל קובץ שמע או וידאו ← בחר את נקודת הקצה המשולבת שלך ← קבל תמלול בפורמטים נתמכים.

## 💡 תכונות עיקריות

OmniRoute v2.0 בנויה כפלטפורמה תפעולית, לא רק כפרוקסי ממסר.

### 🆕 חדש - שיפורים בהשראת ClawRouter (מרץ 2026)

| תכונה                         | מה זה עושה                                                                              |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| ⚡ **Grok-4 Fast Family**     | דגמי xAI ב-$0.20/$0.50/M — מדד 1143ms (מהיר יותר ב-30% מ-Gemini 2.5 Flash)              |
| 🧠 **GLM-5 דרך Z.AI**         | הקשר פלט של 128K, $0.5/1 מיליון - ספינת הדגל החדשה ביותר ממשפחת GLM                     |
| 🔮 **MiniMax M2.5**           | נימוק + משימות סוכן ב-$0.30/1M — שדרוג משמעותי מ-M2.1                                   |
| 🎯 **דגל קורא לכל דגם**       | לכל דגם `toolCalling: true/false` ברישום — אוטוקומבו מדלגת על דגמים שאינם מסוגלים לכלים |
| 🌍 **זיהוי כוונות רב לשוני**  | מילות מפתח PT/ZH/ES/AR בניקוד AutoCombo — בחירת דגמים טובה יותר לתוכן שאינו אנגלי       |
| 📊 **הסתגלות מונעות בנצ'מרק** | זמן אחזור אמיתי של p95 מהזנות משולבות של בקשות חיות - AutoCombo לומד מנתונים בפועל      |
| 🔁 **בקש ביטול כפילות**       | חלון ביטול ביטול מבוסס-hash - בטוח מרובה סוכנים, מונע חיובים כפולים                     |
| 🔌 **אסטרטגיית נתב מתחבר**    | ממשק `RouterStrategy` ניתן להרחבה — הוסף לוגיקת ניתוב מותאמת אישית בתור תוספים          |

### 🚀 גרסה קודמת 2.0.9+ — מגרש משחקים, CLI טביעות אצבע ו-ACP

| תכונה                                      | מה זה עושה                                                                                                                                                                                                            |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **מגרש משחקים דגם**                     | דף לוח המחוונים לבדיקת כל דגם ישירות - בוררי ספק/דגם/נקודת קצה, עורך מונקו, סטרימינג, ביטול, תזמון                                                                                                                    |
| 🔏 **CLI התאמת טביעות אצבע**               | סדר כותרת/גוף לפי ספק כדי להתאים חתימות CLI מקוריות - החלף לפי ספק בהגדרות > אבטחה. **IP ה-proxy שלך נשמר**                                                                                                           |
| 🤝 **תמיכה ב-ACP (פרוטוקול לקוח של סוכן)** | גילוי סוכן CLI (Codex, Claude, Goose, Gemini CLI, OpenClaw + 9 נוספים), מבשר תהליך, נקודת קצה `/api/acp/agents`                                                                                                       |
| 🤖 **לוח המחוונים של סוכני ה-ACP**         | ניפוי באגים › דף סוכנים - רשת של 14 סוכנים עם סטטוס התקנה, גרסה, טופס סוכן מותאם אישית עבור כל כלי CLI. משתמשי **OpenCode** מקבלים כפתור "הורד opencode.json" שיוצר אוטומטית תצורה מוכנה לשימוש עם כל הדגמים הזמינים. |
| 🔧 **דגם מותאם אישית `apiFormat` ניתוב**   | מודלים מותאמים אישית עם `apiFormat: "responses"` נותבים כעת כהלכה אל מתרגם ה-API של Responses                                                                                                                         |
| 🏢 **בידוד סביבת עבודה בקודקס**            | סביבות עבודה מרובות של Codex לכל דואר אלקטרוני - OAuth מפריד נכון בין חיבורים לפי מזהה סביבת עבודה                                                                                                                    |
| 🔄 **עדכון אוטומטי של אלקטרונים**          | אפליקציית שולחן העבודה בודקת עדכונים + התקנה אוטומטית בהפעלה מחדש                                                                                                                                                     |

### 🤖 פעולות סוכן ופרוטוקול (v2.0)

| תכונה                                 | מה זה עושה                                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 🔧 **שרת MCP (16 כלים)**              | כלי IDE/סוכן באמצעות 3 העברות: stdio, SSE (`/api/mcp/sse`), HTTP ניתן להזרמה (`/api/mcp/stream`) |
| 🤝 **שרת A2A (JSON-RPC + SSE)**       | ביצוע משימות סוכן לסוכן עם זרימות סנכרון וזרימה                                                  |
| 🧭 **דף נקודות קצה מאוחדות**          | דף ניהול עם כרטיסיות עם כרטיסיות Endpoint Proxy, MCP, A2A ו-API                                  |
| 🎚️ **הפעל/נטרול שירותים**             | מתגי הפעלה/כיבוי עבור MCP ו-A2A עם עמידה בהגדרות (ברירת מחדל: כבוי)                              |
| 🛰️ ** MCP Runtime Heartbeat**         | סטטוס תהליך אמיתי (pid, uptime, גיל פעימות לב, תחבורה, מצב היקף)                                 |
| 📋 **מסלול ביקורת MCP**               | יומני ביקורת ניתנים לסינון עם הצלחה/כישלון ושיוך מפתח                                            |
| 🔐 **אכיפת היקף MCP**                 | 9 הרשאות היקף פרטניות לגישה מבוקרת לכלי                                                          |
| 📡 **ניהול מחזור חיים של משימות A2A** | רשום/סנן משימות, בדיקת אירועים/חפצים, ביטול משימות פועלות                                        |
| 📋 **גילוי כרטיס סוכן**               | `/.well-known/agent.json` לגילוי אוטומטי של הלקוח                                                |
| 🧪 **רתמת בדיקת פרוטוקול E2E**        | זרימת לקוח MCP SDK + A2A אמיתית ב-`test:protocols:e2e`                                           |
| ⚙️ **בקרות תפעוליות**                 | משולבת בוררים, החלת פרופילי חוסן, אפס מפסקים ממשטח בקרה אחד                                      |

### 🧠 ניתוב ומודיעין

| תכונה                         | מה זה עושה                                                   |
| ----------------------------- | ------------------------------------------------------------ |
| 🎯 **Smart 4-tier Fallback**  | מסלול אוטומטי: מנוי → מפתח API → זול → חינם                  |
| 📊 **מעקב מכסות בזמן אמת**    | ספירת אסימונים חיה + איפוס ספירה לאחור לכל ספק               |
| 🔄 **תרגום פורמט**            | OpenAI ↔ קלוד ↔ מזל תאומים ↔ תגובות עם המרות בטוחות לסכימה   |
| 👥 **תמיכה בריבוי חשבונות**   | מספר חשבונות לכל ספק עם בחירה חכמה                           |
| 🔄 **רענון אסימון אוטומטי**   | אסימוני OAuth מתרעננים אוטומטית עם ניסיון חוזר               |
| 🎨 **שילובים מותאמים אישית**  | 6 אסטרטגיות איזון + בקרת שרשרת נפילה                         |
| 🌐 **נתב תווים כלליים** ​​    | `provider/*` ניתוב דינמי                                     |
| 🧠 **חשיבה בקרות תקציב**      | גבולות מעבר, אוטומטי, מותאם אישית והסתגלות                   |
| 🔀 **כינוי דגם**              | בטיחות כינוי והגירה מובנית + מודל מותאם אישית                |
| ⚡ **השפלה ברקע**             | נתב משימות רקע בעדיפות נמוכה לדגמים זולים יותר               |
| 🧪 **ניתוב חכם מודע למשימות** | בחירה אוטומטית של מודל לפי סוג תוכן (קידוד/חזון/ניתוח/סיכום) |
| 💬 **הזרקת מערכת מיידית**     | בקרות התנהגות גלובליות יושמו באופן עקבי                      |
| 📄 **תאימות API של תגובות**   | תמיכה מלאה `/v1/responses` עבור Codex וזרימות עבודה מתקדמות  |

### 🎵 ממשקי API רב-מודאליים

| תכונה                    | מה זה עושה                                                                                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **יצירת תמונות**      | `/v1/images/generations` עם ענן וחלקים עורפיים מקומיים                                                                                                           |
| 📐 **הטבעות**            | `/v1/embeddings` לחיפוש וצינורות RAG                                                                                                                             |
| 🎤 **תמלול אודיו**       | `/v1/audio/transcriptions` — 7 ספקים (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), זיהוי שפה אוטומטי, תמיכה ב-MP4/MP3/WAV |
| 🔊 **טקסט לדיבור**       | `/v1/audio/speech` — 10 ספקים (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) עם הודעות שגיאה נכונות         |
| 🎬 **יצירת וידאו**       | `/v1/videos/generations` (זרימות עבודה של ComfyUI + SD WebUI)                                                                                                    |
| 🎵 **דור המוזיקה**       | `/v1/music/generations` (זרימות עבודה של ComfyUI)                                                                                                                |
| 🛡️ **מנחים**             | `/v1/moderations` בדיקות בטיחות                                                                                                                                  |
| 🔀 **דירוג מחדש**        | `/v1/rerank` עבור ניקוד רלוונטיות                                                                                                                                |
| 🔍 **חיפוש באינטרנט** 🆕 | `/v1/search` — 5 ספקים (Serper, Brave, Perplexity, Exa, Tavily), 6,500+ חינם/חודש, כשל אוטומטי, מטמון                                                            |

### 🛡️ חוסן, ביטחון וממשל

| תכונה                                | מה זה עושה                                                                        |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| 🔌 **מפסקים מעגלים**                 | נסיעה/התאוששות לכל דגם עם בקרות סף                                                |
| 🎯 **דגמים מודעים לנקודות קצה**      | מודלים מותאמים אישית מצהירים על נקודות קצה נתמכות + פורמט API                     |
| 🛡️ **עדר נגד רעמים**                 | הגנות Mutex + סמפור באירועי ניסיון חוזר/דרג                                       |
| 🧠 **סמנטי + מטמון חתימה**           | הפחתת עלות/איחור עם שתי שכבות מטמון                                               |
| ⚡ **בקש אימפוטנציה**                | חלון הגנה משוכפל                                                                  |
| 🔒 **זיוף טביעות אצבע TLS**          | טביעת אצבע TLS דמוית דפדפן - **מפחיתה את זיהוי הרובוטים וסימון החשבונות**         |
| 🔏 **CLI התאמת טביעות אצבע**         | תואם חתימות מקוריות של בקשת CLI - **מפחית את סיכון החסימה תוך שמירה על IP proxy** |
| 🌐 **סינון IP**                      | שליטה ברשימת ההיתרים/בלוקים עבור פריסות חשופות                                    |
| 📊 **מגבלות תעריפים הניתנות לעריכה** | מגבלות גלובליות/ברמת ספק הניתנות להגדרה עם התמדה                                  |
| 🔑 **ניהול מפתחות API + היקף**       | הנפקה/סיבוב מפתח מאובטח ובקרות מודל/ספק                                           |
| 🛡️ **מוגן `/models`**                | אישור אופציונלי והסתרת ספק עבור קטלוג דגמים                                       |

### 📊 יכולת תצפית וניתוח

| תכונה                                | מה זה עושה                                     |
| ------------------------------------ | ---------------------------------------------- |
| 📝 **בקשה + רישום פרוקסי**           | בקשה/תשובה מלאה ורישום פרוקסי                  |
| 📋 **לוח מחוונים של יומנים מאוחדים** | תצוגות בקשה, פרוקסי, ביקורת ומסוף בעמוד אחד    |
| 🔍 **בקש טלמטריה**                   | חביון p50/p95/p99 ומעקב אחר בקשות              |
| 🏥 **לוח מחוונים לבריאות**           | זמן פעולה, מצבי מפסק, נעילות, סטטיסטיקות מטמון |
| 💰 **מעקב עלויות**                   | בקרות תקציב ונראות תמחור לפי דגם               |
| 📈 **הדמיות של אנליטיקס**            | תובנות שימוש במודל/ספק ותצוגות מגמה            |
| 🧪 **מסגרת הערכה**                   | בדיקת סט זהב עם אסטרטגיות התאמה הניתנות להגדרה |

### ☁️ פריסה ופלטפורמה

| תכונה                              | מה זה עושה                                       |
| ---------------------------------- | ------------------------------------------------ |
| 🌐 **פרוס בכל מקום**               | סביבות Localhost, VPS, Docker, ענן               |
| 💾 **סנכרון ענן**                  | סנכרון תצורה באמצעות Cloud Worker                |
| 🔄 **גיבוי/שחזור**                 | זרימות יצוא/יבוא והתאוששות מאסון                 |
| 🧙 **אשף העלייה למטוס**            | התקנה מודרכת הפעלה ראשונה                        |
| 🔧 **לוח המחוונים של כלי CLI**     | הגדרה בלחיצה אחת לכלי קידוד פופולריים            |
| 🎮 **מגרש משחקים דגם**             | בדוק כל ספק/דגם/נקודת קצה מלוח המחוונים          |
| 🔏 **CLI Fingerprint Toggle**      | התאמת טביעת אצבע לכל ספק בהגדרות > אבטחה         |
| 🌐 **i18n (30 שפות)**              | לוח מחוונים מלא + תמיכה בשפת מסמכים עם כיסוי RTL |
| 🧹 **נקה את כל הדגמים**            | ניקוי רשימת דגמים בלחיצה אחת בפרטי הספק          |
| 📋 **תבניות גיליון**               | תבניות GitHub סטנדרטיות עבור באגים ותכונות       |
| 📂 **ספריית נתונים מותאמים אישית** | `DATA_DIR` ביטול עבור מיקום אחסון                |

### תכונה Deep Deep

#### סתירה חכמה עם בקרת עלויות מעשית

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

כאשר המכסה, התעריף או הבריאות נכשלים, OmniRoute עובר אוטומטית למועמד הבא ללא מעבר ידני.

#### ניהול פרוטוקול גלוי וניתן לתפעול

- MCP + A2A ניתנים לגילוי בממשק המשתמש ובמסמכים (לא מוסתרים)
- ממשקי API של סטטוס פרוטוקול חושפים נתונים תפעוליים חיים (`/api/mcp/*`, `/api/a2a/*`)
- לוחות מחוונים כוללים פעולות עבור פעולות יום 2 (החלפות משולבות, איפוסי מפסקים, ביטול משימות)

#### מתרגם + זרימת עבודה של אימות

אזור המתרגם כולל:

- **מגרש משחקים**: בקש בדיקות טרנספורמציה
- **בודק צ'אט**: בקשה/תגובה מלאה הלוך ושוב
- **ספסל מבחן**: מקרים מרובים בריצה אחת
- **צג חי**: תצוגת תנועה בזמן אמת

בנוסף אימות פרוטוקול עם לקוחות אמיתיים באמצעות `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** - הפניה לכלי, תצורות IDE ודוגמאות לקוח
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — מיומנויות, שיטות JSON-RPC, סטרימינג ומחזור חיים של משימות

## 🧪 הערכות (הערכות)

OmniRoute כולל מסגרת הערכה מובנית לבדיקת איכות תגובת LLM מול סט מוזהב. גש אליו דרך **Analytics → Evals** בלוח המחוונים.

### סט מוזהב מובנה

"OmniRoute Golden Set" הנטען מראש מכיל מקרי בדיקה עבור:

- ברכות, מתמטיקה, גיאוגרפיה, יצירת קוד
- תאימות לפורמט JSON, תרגום, הפקת סימון
- סירוב בטיחותי (תוכן מזיק), ספירה, היגיון בוליאני

### אסטרטגיות הערכה

| אסטרטגיה   | תיאור                                      | דוגמה                            |
| ---------- | ------------------------------------------ | -------------------------------- |
| `exact`    | הפלט חייב להתאים בדיוק                     | `"4"`                            |
| `contains` | הפלט חייב להכיל תת מחרוזת (לא תלוי רישיות) | `"Paris"`                        |
| `regex`    | הפלט חייב להתאים לדפוס הרקס                | `"1.*2.*3"`                      |
| `custom`   | פונקציית JS מותאמת מחזירה true/false       | `(output) => output.length > 10` |

---

## 📖 מדריך התקנה

### הגדרת פרוטוקול (MCP + A2A)

<details>
<summary><b>🧩 הגדרת MCP (פרוטוקול הקשר דגם)</b></summary>

התחל העברת MCP במצב stdio:

```bash
omniroute --mcp
```

זרימת אימות מומלצת:

1. חבר את לקוח ה-MCP שלך דרך stdio.
2. הפעל את `omniroute_get_health`.
3. הפעל את `omniroute_list_combos`.
4. פתח את `/dashboard/mcp` כדי לאשר פעימות לב, פעילות וביקורת.

ממשקי API שימושיים לאוטומציה:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 הגדרת A2A (סוכן2סוכן)</b></summary>

גלה את הסוכן:

```bash
curl http://localhost:20128/.well-known/agent.json
```

שלח משימה:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

נהל את מחזור החיים:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

ממשק משתמש תפעולי:

- `/dashboard/a2a` לצפייה במשימה/מצב/זרם ופעולות עשן

</details>

<details>
<summary><b>🧪 אימות פרוטוקול מקצה לקצה</b></summary>

אמת את שני הפרוטוקולים עם לקוחות אמיתיים:

```bash
npm run test:protocols:e2e
```

זה מאמת:

- חיבור/רשימה/התקשרות ללקוח MCP SDK
- גילוי/שלח/הזרמה/קבל/ביטול A2A
- בדיקת הצלבת נתונים בממשקי API של ביקורת MCP וניהול משימות A2A

</details>

<details>
<summary><b>💳 ספקי מנויים</b></summary>

### קוד קלוד (פרו/מקס)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**טיפ מקצוען:** השתמש ב-Opus למשימות מורכבות, בסונט למהירות. OmniRoute עוקב אחר מכסה לכל דגם!

### OpenAI Codex (פלוס/פרו)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### ניהול מגבלות חשבון Codex (5 שעות + שבועי)

לכל חשבון Codex יש כעת החלפת מדיניות ב-`Dashboard -> Providers`:

- `5h` (מופעל/כבוי): אכיפת מדיניות סף החלון של 5 שעות.
- `Weekly` (מופעל/כבוי): אכיפת מדיניות סף החלון השבועי.
- התנהגות סף: כאשר חלון מופעל מגיע ל->=90% שימוש, החשבון הזה ידלג.
- התנהגות סיבוב: OmniRoute מנתב אוטומטית לחשבון ה-Codex הכשיר הבא.
- התנהגות איפוס: כאשר הזמן של הספק `resetAt` עובר, החשבון יחזור להיות כשיר באופן אוטומטי.

תרחישים:

- `5h ON` + `Weekly ON`: דילוג על החשבון כאשר אחד מהחלונות מגיע לסף.
- `5h OFF` + `Weekly ON`: רק שימוש שבועי יכול לחסום את החשבון.
- `5h ON` + `Weekly OFF`: רק שימוש של 5 שעות יכול לחסום את החשבון.
- `resetAt` עבר: החשבון נכנס מחדש לסבב באופן אוטומטי (ללא הפעלה מחדש ידנית).

### Gemini CLI (180K בחינם לחודש!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**הערך הטוב ביותר:** שכבת חינם ענקית! השתמש בזה לפני שכבות בתשלום.

### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 ספקי מפתח API</b></summary>

### NVIDIA NIM (גישה למפתחים בחינם - 70+ דגמים)

1. הירשם: [build.nvidia.com](https://build.nvidia.com)
2. קבל מפתח API בחינם (כולל 1000 קרדיטים להסקה)
3. לוח מחוונים ← הוסף ספק ← NVIDIA NIM:
   - מפתח API: `nvapi-your-key`

**דגמים:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` ועוד 50+

**טיפ מקצועי:** API תואם OpenAI - עובד בצורה חלקה עם תרגום הפורמט של OmniRoute!

### DeepSeek

1. הירשם: [platform.deepseek.com](https://platform.deepseek.com)
2. קבל מפתח API
3. לוח מחוונים ← הוסף ספק ← DeepSeek

**דגמים:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (רמה חינם זמינה!)

1. הירשם: [console.groq.com](https://console.groq.com)
2. קבל מפתח API (כלול שכבת חינם)
3. לוח מחוונים ← הוסף ספק ← Groq

**דגמים:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**טיפ מקצועי:** הסקה מהירה במיוחד - הטוב ביותר לקידוד בזמן אמת!

### OpenRouter (100+ דגמים)

1. הירשם: [openrouter.ai](https://openrouter.ai)
2. קבל מפתח API
3. לוח מחוונים ← הוסף ספק ← OpenRouter

**דגמים:** גישה ל-100+ דגמים מכל הספקים הגדולים באמצעות מפתח API יחיד.

</details>

<details>
<summary><b>💰 ספקים זולים (גיבוי)</b></summary>

### GLM-4.7 (איפוס יומי, $0.6/1 מיליון)

1. הירשם: [Zhipu AI](https://open.bigmodel.cn/)
2. קבל מפתח API מ-Coding Plan
3. לוח מחוונים ← הוסף מפתח API:
   - ספק: `glm`
   - מפתח API: `your-key`

**השתמש:** `glm/glm-4.7`

**טיפ למקצוענים:** תוכנית קידוד מציעה מכסה של 3× בעלות של 1/7! איפוס כל יום 10:00 בבוקר.

### MiniMax M2.1 (איפוס של 5 שעות, $0.20/1 מיליון דולר)

1. הירשם: [MiniMax](https://www.minimax.io/)
2. קבל מפתח API
3. לוח מחוונים ← הוסף מפתח API

**השתמש:** `minimax/MiniMax-M2.1`

**Pro Tip:** Cheapest option for long context (1M tokens)!

### Kimi K2 (דירה של $9 לחודש)

1. הירשם: [Moonshot AI](https://platform.moonshot.ai/)
2. קבל מפתח API
3. לוח מחוונים ← הוסף מפתח API

**השתמש:** `kimi/kimi-latest`

**Pro Tip:** Fixed $9/month for 10M tokens = $0.90/1M effective cost!

</details>

<details>
<summary><b>🆓 FREE Providers (Emergency Backup)</b></summary>

### iFlow (5 דגמים בחינם באמצעות OAuth)

```bash
Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (4 דגמים בחינם באמצעות קוד מכשיר)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### קירו (קלוד בחינם)

```bash
Dashboard → Connect Kiro
→ AWS Builder ID or Google/GitHub
→ Unlimited usage

Models:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 Create Combos</b></summary>

### Example 1: Maximize Subscription → Cheap Backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### דוגמה 2: חינם בלבד (עלות אפס)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

</details>

<details>
<summary><b>🔧 CLI Integration</b></summary>

### סמן IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### קלוד קוד

השתמש בדף **כלי CLI** בלוח המחוונים להגדרת תצורה בלחיצה אחת, או ערוך את `~/.claude/settings.json` באופן ידני.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**אפשרות 1 - לוח מחוונים (מומלץ):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**אפשרות 2 — ידני:** ערוך `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **הערה:** OpenClaw עובד רק עם OmniRoute מקומי. השתמש ב-`127.0.0.1` במקום ב-`localhost` כדי למנוע בעיות ברזולוציה של IPv6.

### Cline / Continue / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### OpenCode

**שלב 1:** הוסף OmniRoute כספק מותאם אישית:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**שלב 2:** צור/ערוך את `opencode.json` בשורש הפרויקט שלך:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1"
      },
      "models": {
        "cc/claude-sonnet-4-20250514": { "name": "Claude Sonnet 4" },
        "gg/gemini-2.5-pro": { "name": "Gemini 2.5 Pro" },
        "if/kimi-k2-thinking": { "name": "Kimi K2 (Free)" }
      }
    }
  }
}
```

**שלב 3:** בחר את הדגם ב-OpenCode:

```bash
/models
# Select any OmniRoute model from the list
```

> **טיפ:** הוסף כל דגם זמין בנקודת הקצה OmniRoute `/v1/models` שלך למקטע `models`. השתמש בפורמט `provider/model-id` מלוח המחוונים של OmniRoute שלך.

</details>

---

## 🐛 פתרון בעיות

<details>
<summary><b>לחץ כדי להרחיב את המדריך לפתרון בעיות</b></summary>

**"מודל השפה לא סיפק הודעות"**

- מיצתה מכסת הספק ← בדוק את עוקב המכסות של לוח המחוונים
- פתרון: השתמש ב-combo fallback או עבור לשכבה זולה יותר

**הגבלת תעריפים**

- מכסת מנויים נגמרת ← Fallback ל-GLM/MiniMax
- הוסף משולבת: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**פג תוקפו של אסימון OAuth**

- רענון אוטומטי על ידי OmniRoute
- אם הבעיות נמשכות: לוח מחוונים ← ספק ← התחבר מחדש

**עלויות גבוהות**

- בדוק סטטיסטיקת שימוש בלוח המחוונים ← עלויות
- החלף את הדגם הראשי ל-GLM/MiniMax
- השתמש בשכבה חינמית (Gemini CLI, iFlow) עבור משימות לא קריטיות

**יציאות לוח המחוונים/API שגויות**

- `PORT` היא יציאת הבסיס הקנונית (ויציאת API כברירת מחדל)
- `API_PORT` עוקף רק מאזין API תואם OpenAI
- `DASHBOARD_PORT` עוקף רק את לוח המחוונים/מאזין Next.js
- הגדר את `NEXT_PUBLIC_BASE_URL` למרכז השליטה/כתובת האתר הציבורית שלך (עבור התקשרויות חוזרות מ-OAuth)

**שגיאות סנכרון בענן**

- ודא `BASE_URL` נקודות למופע הריצה שלך
- אמת `CLOUD_URL` נקודות לנקודת הקצה הצפויה שלך בענן
- שמור על ערכי `NEXT_PUBLIC_*` מיושרים עם ערכי צד השרת

**הכניסה הראשונה לא עובדת**

- בדוק את `INITIAL_PASSWORD` ב-`.env`
- אם לא מוגדרת, סיסמת החלפה היא `123456`

**ללא יומני בקשות**

- הגדר `ENABLE_REQUEST_LOGS=true` ב-`.env`

**בדיקת חיבור מראה "לא חוקי" עבור ספקים תואמי OpenAI**

- ספקים רבים אינם חושפים נקודת קצה `/models`
- OmniRoute v1.0.6+ כולל אימות חוזר באמצעות השלמת צ'אט
- ודא שכתובת האתר הבסיסית כוללת את הסיומת `/v1`

### 🔐 OAuth בשרת מרוחק

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ חשוב למשתמשים המריצים OmniRoute ב-VPS, Docker או כל שרת מרוחק**

#### מדוע Antigravity / Gemini CLI OAuth נכשל בשרתים מרוחקים?

ספקי **Antigravity** ו**Gemini CLI** משתמשים ב-**Google OAuth 2.0**. Google דורשת שה-`redirect_uri` בזרימת OAuth תתאים בדיוק לאחד מ-URI הרשומים מראש ב-Google Cloud Console של האפליקציה.

אישורי ה-OAuth המצורפים ב-OmniRoute רשומים **עבור `localhost` בלבד**. כאשר אתה ניגש אל OmniRoute בשרת מרוחק (למשל `https://omniroute.myserver.com`), Google דוחה את האימות באמצעות:

```
Error 400: redirect_uri_mismatch
```

#### פתרון: הגדר את אישורי OAuth משלך

עליך ליצור **OAuth 2.0 Client ID** ב-Google Cloud Console עם URI של השרת שלך.

#### שלב אחר שלב

**1. פתח את Google Cloud Console**

עבור אל: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. צור מזהה לקוח חדש OAuth 2.0**

- לחץ על **"+ Create Credentials"** → **"OAuth client ID"**
- סוג יישום: **"יישום אינטרנט"**
- שם: כל מה שאתה אוהב (למשל `OmniRoute Remote`)

**3. הוסף URI מורשים להפניה מחדש**

בשדה **"כתובות URI מורשות להפניה מחדש"**, הוסף:

```
https://your-server.com/callback
```

> החלף את `your-server.com` בדומיין או ב-IP של השרת שלך (כלול את היציאה במידת הצורך, למשל `http://45.33.32.156:20128/callback`).

**4. שמור והעתק את האישורים**

לאחר היצירה, Google תציג את **זיהוי הלקוח** ואת **סוד הלקוח**.

**5. הגדר משתני סביבה**

ב-`.env` שלך (או משתני סביבת Docker):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. הפעל מחדש את OmniRoute**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. נסה להתחבר שוב**

לוח מחוונים ← ספקים ← אנטי כבידה (או Gemini CLI) ← OAuth

Google תפנה כעת כראוי אל `https://your-server.com/callback`.

---

#### עקיפה זמנית (ללא אישורים מותאמים אישית)

אם אינך רוצה להגדיר אישורים משלך כעת, אתה עדיין יכול להשתמש ב**זרימת כתובת האתר הידנית**:

1. OmniRoute פותח את כתובת האתר להרשאה של Google
2. לאחר ההרשאה, Google מנסה להפנות מחדש אל `localhost` (שנכשל בשרת המרוחק)
3. **העתק את כתובת האתר המלאה** מסרגל הכתובות של הדפדפן שלך (גם אם הדף לא נטען)
4. הדבק את כתובת האתר בשדה המוצג במודאל החיבור של OmniRoute
5. לחץ על **"התחבר"**

> זה עובד מכיוון שקוד ההרשאה בכתובת ה-URL חוקי ללא קשר אם דף ההפניה מחדש נטען.

---

<details>
<summary><b>🇧🇷 Versão em Português</b></summary>

#### האם אפשר לעשות אנטי כבידה / CLI מזל תאומים עם שירותים מרוחקים?

שימוש ב-**Antigravity** ו-**Gemini CLI** בשימוש ב-**Google OAuth 2.0** עבור אוטנטיקה. O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** uma das URIs pré-cadastradas no Google Cloud Console do aplicativo.

As credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas para `localhost`**. Quando você acessa o OmniRoute em um servidor remoto (לדוגמה: `https://omniroute.meuservidor.com`), o Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

#### פתרון: הגדר את התצורה של OAuth

קרא בדיוק את **OAuth 2.0 Client ID** ללא Google Cloud Console com a URI do seu service.

#### פסו אפס

**1. גישה ל-Google Cloud Console**

אברה: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo OAuth 2.0 מזהה לקוח**

- לחץ על **"+ צור אישורים"** → **"זיהוי לקוח OAuth"**
- טיפו דה אפליקטיבי: **"יישום אינטרנט"**
- שם: escolha qualquer nome (לדוגמה: `OmniRoute Remote`)

**3. Adicone כ-URI מורשים להפניה מחדש**

אין קמפו **"כתובות URI מורשות להפניה מחדש"**, adicione:

```
https://seu-servidor.com/callback
```

> Substitua `seu-servidor.com` pelo domínio או IP do seu servidor (כולל porta se necessário, למשל: `http://45.33.32.156:20128/callback`).

**4. שמור את העותק כ-credenciais**

אפóס קריאר, o Google mostrará o **זיהוי לקוח** או **סוד לקוח**.

**5. הגדר כ-variáveis de ambiente**

No seu `.env` (ou nas variáveis de ambiente do Docker):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Reinicie o OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Tente conectar novamente**

לוח מחוונים ← ספקים ← אנטי כבידה (או Gemini CLI) ← OAuth

Agora o Google redirecionará corretamente para `https://seu-servidor.com/callback` e autenticação funcionará.

---

#### זמני פתרון לעקיפת הבעיה

Se não quiser criar credenciais próprias agora, ainda é possível usar o fluxo **manual de URL**:

1. O OmniRoute abrirá a URL de autorização do Google
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no servidor remoto)
3. **העתק כתובת URL מלאה** da barra de endereço do seu דפדפן (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. לחץ על **"התחבר"**

> פתרון עקיפת הבעיה או קוד אוטומטי של כתובת ה-URL או עצמאית להפנות את החשבון או לא.

</details>

---

</details>

## 🛠️ Tech Stack

<details>
<summary><b>לחץ כדי להרחיב את פרטי מחסנית הטכנולוגיה</b></summary>

- **זמן ריצה**: Node.js 18–22 LTS (⚠️ Node.js 24+ **לא נתמך** - `better-sqlite3` קבצים בינאריים מקוריים אינם תואמים)
- **שפה**: TypeScript 5.9 — **100% TypeScript** על פני `src/` ו`open-sse/` (אפס `any` במודולי ליבה מאז v2.0)
- **מסגרת**: Next.js 16 + React 19 + Tailwind CSS 4
- **מסד נתונים**: LowDB (JSON) + SQLite (מצב דומיין + יומני proxy + ביקורת MCP + החלטות ניתוב)
- **סכימות**: Zod (אימות כלי MCP I/O, חוזי API)
- **פרוטוקולים**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **סטרימינג**: אירועים שנשלחו על ידי שרת (SSE)
- **אישור**: OAuth 2.0 (PKCE) + JWT + מפתחות API + הרשאה בהיקף MCP
- **בדיקות**: רץ בדיקה של Node.js + Vitest (900+ בדיקות כולל יחידה, אינטגרציה, E2E)
- **CI/CD**: פעולות GitHub (פרסום אוטומטי של npm + Docker Hub בשחרור)
- **אתר**: [omniroute.online](https://omniroute.online)
- **חבילה**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **דוקר**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **חוסן**: מפסק מעגלים, גיבוי אקספוננציאלי, עדר נגד רעמים, זיוף TLS, ריפוי עצמי משולבת אוטומטית

</details>

---

## 📖 תיעוד

| מסמך                                           | תיאור                                                    |
| ---------------------------------------------- | -------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)               | ספקים, שילובים, שילוב CLI, פריסה                         |
| [API Reference](docs/API_REFERENCE.md)         | כל נקודות הקצה עם דוגמאות                                |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 כלי MCP, הגדרות IDE, לקוחות Python/TS/Go              |
| [A2A Server](src/lib/a2a/README.md)            | פרוטוקול JSON-RPC 2.0, מיומנויות, סטרימינג, ניהול משימות |
| [Auto-Combo Engine](docs/auto-combo.md)        | ניקוד 6 גורמים, חבילות מצב, ריפוי עצמי                   |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | בעיות ופתרונות נפוצים                                    |
| [Architecture](docs/ARCHITECTURE.md)           | ארכיטקטורת מערכת ופנים                                   |
| [Contributing](CONTRIBUTING.md)                | מערך פיתוח והנחיות                                       |
| [OpenAPI Spec](docs/openapi.yaml)              | מפרט OpenAPI 3.0                                         |
| [Security Policy](SECURITY.md)                 | Vulnerability reporting and security practices           |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | מדריך שלם: הגדרות VM + nginx + Cloudflare                |
| [Features Gallery](docs/FEATURES.md)           | סיור חזותי בלוח המחוונים עם צילומי מסך                   |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | שלבי אימות לפני שחרור                                    |

---

## 🗺️ מפת דרכים

ל-OmniRoute יש **210+ תכונות מתוכננות** לאורך שלבי פיתוח מרובים. להלן תחומי המפתח:

| קטגוריה               | תכונות מתוכננות | הבהרה                                                                                    |
| --------------------- | --------------- | ---------------------------------------------------------------------------------------- |
| 🧠 **ניתוב ומודיעין** | 25+             | ניתוב עם זמן האחזור הנמוך ביותר, ניתוב מבוסס תגים, בדיקה מוקדמת של מכסה, בחירת חשבון P2C |
| 🔒 **אבטחה ותאימות**  | 20+             | הקשחת SSRF, הסוואה של אישורים, הגבלת קצב לכל נקודת קצה, היקף מפתח ניהול                  |
| 📊 **צפיות**          | 15+             | אינטגרציה של OpenTelemetry, ניטור מכסות בזמן אמת, מעקב עלויות לכל דגם                    |
| 🔄 **שילובי ספקים**   | 20+             | רישום מודלים דינמיים, צינון ספקים, Codex מרובה חשבונות, ניתוח מכסת Copilot               |
| ⚡ **ביצועים**        | 15+             | Dual cache layer, prompt cache, response cache, streaming keepalive, batch API           |
| 🌐 **מערכת אקולוגית** | 10+             | WebSocket API, טעינה חוזרת של תצורה, חנות תצורה מבוזרת, מצב מסחרי                        |

### 🔜 בקרוב

- 🔗 **שילוב OpenCode** - תמיכה בספק מקורי עבור IDE קידוד AI של OpenCode
- 🔗 **TRAE Integration** — תמיכה מלאה במסגרת הפיתוח של TRAE AI
- 📦 **אצווה API** - עיבוד אצווה אסינכרוני עבור בקשות בכמות גדולה
- 🎯 **ניתוב מבוסס תגים** — בקשות ניתוב המבוססות על תגים ומטא נתונים מותאמים אישית
- 💰 **אסטרטגיית העלות הנמוכה ביותר** — בחר אוטומטית את הספק הזמין הזול ביותר

> 📝 מפרטי תכונה מלאים זמינים ב-[**OMNI_TOKEN_342**](docs/new-features/) (217 מפרטים מפורטים)

---

## 👥 תורמים

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### כיצד לתרום

1. מזלג את המאגר
2. צור את ענף התכונה שלך (`git checkout -b feature/amazing-feature`)
3. בצע את השינויים שלך (`git commit -m 'Add amazing feature'`)
4. דחף לסניף (`git push origin feature/amazing-feature`)
5. פתחו בקשת משיכה

ראה [CONTRIBUTING.md](CONTRIBUTING.md) להנחיות מפורטות.

### שחרור גרסה חדשה

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 היסטוריית כוכבים

## צופים בכוכבים לאורך זמן

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 תודות

תודה מיוחדת ל**[9router](https://github.com/decolua/9router)** מאת **[decolua](https://github.com/decolua)** - הפרויקט המקורי שהיווה השראה למזלג הזה. OmniRoute בונה על הבסיס המדהים הזה עם תכונות נוספות, ממשקי API רב-מודאליים ושכתוב מלא של TypeScript.

תודה מיוחדת ל**[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** - היישום המקורי של Go שימש השראה ליציאת JavaScript הזו.

---

## 📄 רישיון

רישיון MIT - ראה [LICENSE](LICENSE) לפרטים.

---

<div align="center">
  <sub>נבנה עם ❤️ למפתחים שמקודדים 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- דיוני GitHub מופעלים עבור שאלות ותשובות של הקהילה -->
