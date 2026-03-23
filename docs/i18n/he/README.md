<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — שער הבינה המלאכותית החינמית

### לעולם אל תפסיק לקוד. ניתוב חכם לדגמי בינה מלאכותית **בחינם ובעלות נמוכה** עם חזרה אוטומטית.

_שרת ה-API האוניברסלי שלך - נקודת קצה אחת, 36+ ספקים, אפס זמן השבתה._

**השלמות צ'אט • הטמעות • יצירת תמונות • אודיו • דירוג מחדש • 100% TypeScript**

---

### 🆕 What's New in v2.7.0

- **Pluggable RouterStrategy** — rules, cost, and latency routing strategies
- **Multilingual intent detection** — routing scoring in 30+ languages
- **Request deduplication** — prevent duplicate API calls via content hash
- **New providers:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Updated pricing:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 ספק AI בחינם עבור סוכני הקידוד המועדפים עליך

_חבר כל כלי IDE או CLI המופעל על ידי AI דרך OmniRoute - שער API בחינם לקידוד בלתי מוגבל._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
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

<sub>📡 כל הסוכנים מתחברים דרך <code>http://localhost:20128/v1</code> או <code>http://cloud.omniroute.online/v1 , —limited one config מכסה</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

🌐 **Available in:** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

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
- **פרויקט מקורי**: [9router by decolua](https://github.com/decolua/9router)

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
<summary><b>💸 1. "אני משלם עבור מנוי יקר אבל עדיין מופרע על ידי גבולות" </b></summary>

מפתחים משלמים $20-200 לחודש עבור Claude Pro, Codex Pro או GitHub Copilot. אפילו בתשלום, למכסה יש תקרה - 5 שעות שימוש, מגבלות שבועיות או מגבלות תעריף לדקה. סשן קידוד באמצע, הספק מפסיק להגיב והמפתח מאבד זרימה ופרודוקטיביות.

**איך OmniRoute פותר את זה:**

- **Smart 4-Tier Fallback** - אם מכסת המנויים נגמרת, מפנה אוטומטית למפתח API → זול → חינם עם אפס התערבות ידנית
- **מעקב מכסות בזמן אמת** - מציג צריכת אסימונים בזמן אמת עם ספירה לאחור מאפס (5 שעות, יומי, שבועי)
- **תמיכה בריבוי חשבונות** - מספר חשבונות לכל ספק עם סבב אוטומטי - כאשר אחד אוזל, עובר לאחר
- **שילובים מותאמים אישית** - שרשראות ניתנות להתאמה אישית עם 6 אסטרטגיות איזון (מילוי ראשון, סיבוב סיבובי, P2C, אקראי, הכי פחות בשימוש, אופטימיזציה לעלות)
- **Codex Business Quotas** - ניטור מכסות סביבת עבודה עסקית/צוותית ישירות בלוח המחוונים

</details>

<details>
<summary><b>🔌 2. "אני צריך להשתמש במספר ספקים אבל לכל אחד יש API אחר" </b></summary>

OpenAI משתמש בפורמט אחד, קלוד (אנתרופיק) משתמש בפורמט אחר, תאומים בנוסח אחר. אם מפתח רוצה לבחון דגמים מספקים שונים או לחלוף ביניהם, הוא צריך להגדיר מחדש SDK, לשנות נקודות קצה, להתמודד עם פורמטים לא תואמים. לספקים מותאמים אישית (FriendLI, NIM) יש נקודות קצה לא סטנדרטיות במודל.

**איך OmniRoute פותר את זה:**

- **נקודת קצה מאוחדת** - `http://localhost:20128/v1` יחיד משמש כ-proxy עבור כל 36+ הספקים
- **תרגום פורמט** — אוטומטי ושקוף: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **חיטוי תגובה** - מסיר שדות לא סטנדרטיים (`x_groq`, `usage_breakdown`, `service_tier`) שמפרקים את OpenAI SDK v1.83+
- **נורמליזציה של תפקידים** — ממירה `developer` → `system` עבור ספקים שאינם OpenAI; `system` → `user` עבור GLM/ERNIE
- **Think Tag Extraction** — מחלץ בלוקים `<think>` מדגמים כמו DeepSeek R1 לתוך `reasoning_content` הסטנדרטי
- **פלט מובנה עבור מזל תאומים** — `json_schema` → `responseMimeType`/`responseSchema` המרה אוטומטית
- **`stream` ברירת המחדל היא `false`** - מתיישר עם מפרט OpenAI, הימנעות SSE בלתי צפוי ב- Python/Rust/Go SDK

</details>

<details>
<summary><b>🌐 3. "ספק הבינה המלאכותית שלי חוסם את האזור/המדינה שלי" </b></summary>

ספקים כמו OpenAI/Codex חוסמים גישה מאזורים גיאוגרפיים מסוימים. משתמשים מקבלים שגיאות כמו `unsupported_country_region_territory` במהלך חיבורי OAuth ו-API. זה מתסכל במיוחד עבור מפתחים ממדינות מתפתחות.

**איך OmniRoute פותר את זה:**

- **תצורת פרוקסי בשלוש רמות** - פרוקסי ניתן להגדרה ב-3 רמות: גלובלית (כל התעבורה), לכל ספק (ספק אחד בלבד), ולכל חיבור/מפתח
- **תגי פרוקסי מקודדים בצבע** - אינדיקטורים חזותיים: 🟢 פרוקסי גלובלי, 🟡 פרוקסי ספק, 🔵 פרוקסי חיבור, תמיד מציג את ה-IP
- **החלפת אסימונים של OAuth באמצעות פרוקסי** - זרימת OAuth עוברת גם דרך ה-proxy, ופותרת את `unsupported_country_region_territory`
- **בדיקות חיבור באמצעות פרוקסי** - בדיקות חיבור משתמשות בפרוקסי המוגדר (לא עוד מעקף ישיר)
- **תמיכה SOCKS5** — תמיכה מלאה ב-Proxy SOCKS5 לניתוב יוצא
- **זיוף טביעות אצבע TLS** - טביעת אצבע TLS דמוית דפדפן באמצעות `wreq-js` כדי לעקוף את זיהוי הבוטים

</details>

<details>
<summary><b>🆓 4. "אני רוצה להשתמש ב-AI לקידוד אבל אין לי כסף"</b></summary>

לא כולם יכולים לשלם 20-200 $ לחודש עבור מנויי AI. סטודנטים, מפתחים ממדינות מתפתחות, חובבים ופרילנסרים צריכים גישה לדגמים איכותיים בעלות אפסית.

**איך OmniRoute פותר את זה:**

- **ספקי שכבת חינם מובנית** - תמיכה מקורית עבור 100% ספקים בחינם: iFlow (8 דגמים ללא הגבלה), Qwen (3 דגמים ללא הגבלה), Kiro (קלוד בחינם), Gemini CLI (180K/חודש חינם)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **שילובים בחינם בלבד** — שרשרת `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0 לחודש עם אפס זמן השבתה
- **קרדיטים חינם של NVIDIA NIM** - 1000 זיכויים חינם משולבים
- **אסטרטגיית אופטימיזציה לעלות** — אסטרטגיית ניתוב שבוחרת אוטומטית את הספק הזמין הזול ביותר

</details>

<details>
<summary><b>🔒 5. "אני צריך להגן על שער הבינה המלאכותית שלי מגישה לא מורשית" </b></summary>

בעת חשיפת שער AI לרשת (LAN, VPS, Docker), כל מי שיש לו את הכתובת יכול לצרוך את האסימונים/מכסה של המפתח. ללא הגנה, ממשקי API חשופים לשימוש לרעה, הזרקה מהירה וניצול לרעה.

**איך OmniRoute פותר את זה:**

- **ניהול מפתחות API** - יצירה, סיבוב והיקף לכל ספק עם דף `/dashboard/api-manager` ייעודי
- **הרשאות ברמת הדגם** - הגבל מפתחות API לדגמים ספציפיים (`openai/*`, דפוסי תווים כלליים), עם החלפת מצב אפשר הכל/הגבל
- **הגנה על נקודות קצה של API** - דרוש מפתח עבור `/v1/models` וחסום ספקים ספציפיים מהרישום
- **Auth Guard + CSRF Protection** — כל מסלולי לוח המחוונים מוגנים באמצעות תוכנת ביניים `withAuth` + אסימוני CSRF
- ** מגביל קצב** - הגבלת קצב לפי IP עם חלונות הניתנים להגדרה
- **סינון IP** — רשימת הרשאות/רשימת חסימות לבקרת גישה
- **משמר הזרקה מהירה** - חיטוי נגד דפוסי הנחיה זדוניים
- **הצפנת AES-256-GCM** - אישורים מוצפנים בזמן מנוחה

</details>

<details>
<summary><b>🛑 6. "הספק שלי נפל ואיבדתי את זרימת הקידוד" </b></summary>

ספקי בינה מלאכותית עלולים להפוך לבלתי יציבים, להחזיר שגיאות 5xx או לפגוע במגבלות קצב זמניות. אם מפתח תלוי בספק יחיד, הם מופרעים. ללא מפסקים, נסיונות חוזרים ונשנים עלולים לקרוס את האפליקציה.

**איך OmniRoute פותר את זה:**

- **מפסק מעגלים לכל ספק** - פתיחה/סגירה אוטומטית עם ספים ניתנים להגדרה והתקררות (סגור/פתוח/חצי פתוח)
- **גיבוי אקספוננציאלי** - עיכובים מתקדמים בניסיון חוזר
- **עדר נגד רעמים** - הגנה על מוטקס + סמפור מפני סופות ניסיונות חוזרות במקביל
- **שרשראות משולבות Fallback** - אם הספק הראשי נכשל, נופל אוטומטית בשרשרת ללא התערבות
- **מפסק משולב** - משבית אוטומטית ספקים כושלים בשרשרת משולבת
- **לוח מחוונים לבריאות** - ניטור זמן פעולה, מצבי מפסק זרם, נעילות, סטטיסטיקות מטמון, זמן אחזור p50/p95/p99

</details>

<details>
<summary><b>🔧 7. "הגדרת כל כלי בינה מלאכותית היא מייגעת וחוזרת על עצמה" </b></summary>

מפתחים משתמשים ב-Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... כל כלי צריך תצורה שונה (נקודת קצה, מפתח, מודל API). הגדרה מחדש בעת החלפת ספקים או דגמים היא בזבוז זמן.

**איך OmniRoute פותר את זה:**

- **לוח המחוונים של CLI Tools** - דף ייעודי עם הגדרה בלחיצה אחת עבור Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — מייצר `chatLanguageModels.json` עבור קוד VS עם בחירת דגמים בכמות גדולה
- **אשף ההטמעה** — הגדרה מודרכת בת 4 שלבים למשתמשים ראשונים
- **נקודת קצה אחת, כל הדגמים** - הגדר את `http://localhost:20128/v1` פעם אחת, גש ל-36+ ספקים

</details>

<details>
<summary><b>🔑 8. "ניהול אסימוני OAuth ממספר ספקים זה גיהנום" </b></summary>

Claude Code, Codex, Gemini CLI, Copilot - כולם משתמשים ב-OAuth 2.0 עם אסימונים שפג תוקפם. מפתחים צריכים לבצע אימות מחדש כל הזמן, להתמודד עם `client_secret is missing`, `redirect_uri_mismatch` וכשלים בשרתים מרוחקים. OAuth ב-LAN/VPS בעייתי במיוחד.

**איך OmniRoute פותר את זה:**

- **רענון אסימון אוטומטי** - אסימוני OAuth מתרעננים ברקע לפני פקיעת תוקף
- **OAuth 2.0 (PKCE) מובנה** - זרימה אוטומטית עבור Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- ** OAuth מרובה חשבונות** - מספר חשבונות לכל ספק באמצעות חילוץ אסימון JWT/ID
- **OAuth LAN/תיקון מרחוק** - זיהוי IP פרטי עבור `redirect_uri` + מצב כתובת URL ידני עבור שרתים מרוחקים
- **OAuth Behind Nginx** - משתמש ב-`window.location.origin` עבור תאימות פרוקסי הפוכה
- **מדריך OAuth מרחוק** - מדריך שלב אחר שלב לאישורי Google Cloud ב-VPS/Docker

</details>

<details>
<summary><b>📊 9. "אני לא יודע כמה אני מוציא או איפה" </b></summary>

מפתחים משתמשים במספר ספקים בתשלום אך אין להם ראייה אחידה של הוצאות. לכל ספק יש לוח מחוונים משלו לחיוב, אבל אין תצוגה מאוחדת. עלויות בלתי צפויות עלולות להיערם.

**איך OmniRoute פותר את זה:**

- **לוח מחוונים של ניתוח עלויות** - מעקב אחר עלויות לפי אסימון וניהול תקציב לכל ספק
- **מגבלות תקציב לכל שכבה** - תקרת הוצאה לכל שכבה שמפעילה נפילה אוטומטית
- **תצורת תמחור לפי דגם** — מחירים הניתנים להגדרה לכל דגם
- **סטטיסטיקת שימוש לכל מפתח API** - ספירת בקשות וחותמת זמן אחרונה בשימוש לכל מפתח
- **לוח המחוונים של אנליטיקס** - כרטיסי סטטיסטיקה, טבלת שימוש במודל, טבלת ספקים עם אחוזי הצלחה והשהייה

</details>

<details>
<summary><b>🐛 10. "אני לא יכול לאבחן שגיאות ובעיות בשיחות AI" </b></summary>

כאשר שיחה נכשלת, ה-dev לא יודע אם זו הייתה מגבלת תעריף, אסימון שפג תוקפו, פורמט שגוי או שגיאת ספק. יומנים מפוצלים על פני מסופים שונים. ללא צפייה, איתור באגים הוא ניסוי וטעייה.

**איך OmniRoute פותר את זה:**

- **לוח מחוונים של יומנים מאוחדים** - 4 כרטיסיות: יומני בקשות, יומני פרוקסי, יומני ביקורת, מסוף
- **מציג יומן מסוף** - מציג בזמן אמת בסגנון טרמינל עם רמות מקודדות צבע, גלילה אוטומטית, חיפוש, סינון
- **SQLite Proxy Logs** - יומנים מתמשכים ששורדים אתחול מחדש של השרת
- **מגרש משחקים לתרגום** - 4 מצבי ניפוי באגים: מגרש משחקים (תרגום פורמט), בודק צ'אט (הלוך ושוב), ספסל בדיקה (אצווה), צג חי (בזמן אמת)
- **Request Telemetry** — חביון p50/p95/p99 + X-Request-Id מעקב
- **רישום מבוסס קבצים עם סיבוב** - מיירט המסוף לוכד הכל ליומן JSON עם סיבוב מבוסס גודל

</details>

<details>
<summary><b>🏗️ 11. "פריסה ותחזוקה של השער מורכבת" </b></summary>

התקנה, הגדרה ותחזוקה של פרוקסי בינה מלאכותית בסביבות שונות (מקומי, VPS, Docker, ענן) היא עתירת עבודה. בעיות כמו נתיבים מקודדים קשיחים, `EACCES` על ספריות, התנגשויות יציאות ובנייה בין פלטפורמות מוסיפות חיכוך.

**איך OmniRoute פותר את זה:**

- **התקנה גלובלית npm** — `npm install -g omniroute && omniroute` — בוצעה
- **Docker Multi-Platform** - מקורי AMD64 + ARM64 (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose Profiles** — `base` (ללא כלי CLI) ו-`cli` (עם קוד קלוד, Codex, OpenClaw)
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

- **הטמעות** — `/v1/embeddings` עם 6 ספקים ו-9+ דגמים
- **יצירת תמונות** — `/v1/images/generations` עם 10 ספקים ו-20+ דגמים (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **טקסט לווידאו** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) ו-SD WebUI
- **טקסט למוזיקה** — `/v1/music/generations` — ComfyUI (פתוח אודיו יציב, MusicGen)
- **תמלול אודיו** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **טקסט לדיבור** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + ספקים קיימים
- **מודציות** — `/v1/moderations` — בדיקות בטיחות תוכן
- **דירוג מחדש** — `/v1/rerank` — דירוג מחדש של רלוונטיות המסמך
- **Responses API** — תמיכה מלאה ב-`/v1/responses` עבור Codex

</details>

<details>
<summary><b>🧪 14. "אין לי דרך לבדוק ולהשוות איכות בין דגמים" </b></summary>

מפתחים רוצים לדעת איזה דגם הוא הטוב ביותר עבור מקרה השימוש שלהם - קוד, תרגום, הנמקה - אבל ההשוואה ידנית היא איטית. לא קיימים כלי eval משולבים.

**איך OmniRoute פותר את זה:**

- **הערכות LLM** - בדיקת סט זהב עם 10 מקרים טעונים מראש המכסים ברכות, מתמטיקה, גיאוגרפיה, יצירת קוד, תאימות ל-JSON, תרגום, סימון, סירוב בטיחות
- **4 אסטרטגיות התאמה** — `exact`, `contains`, `regex`, `custom` (פונקציית JS)
- **ספסל בדיקה במגרש משחקים של מתרגם** - בדיקות אצווה עם מספר כניסות ויציאות צפויות, השוואה בין ספקים
- ** בודק צ'אט** - הלוך ושוב מלא עם עיבוד תגובה ויזואלית
- **מעקב חי** - זרם בזמן אמת של כל הבקשות הזורמות דרך ה-proxy

</details>

<details>
<summary><b>📈 15. "אני צריך לשנות קנה מידה מבלי לאבד ביצועים" </b></summary>

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
<summary><b>🤖 16. "אני רוצה לשלוט בהתנהגות המודל באופן גלובלי" </b></summary>

מפתחים שרוצים את כל התגובות בשפה ספציפית, עם טון ספציפי, או רוצים להגביל את אסימוני הנמקה. הגדרה זו בכל כלי/בקשה אינה מעשית.

**איך OmniRoute פותר את זה:**

- **הזרקת הנחיית מערכת** - הנחיה גלובלית חלה על כל הבקשות
- **אימות תקציב חשיבה** - בקרת הקצאת אסימונים בהיגיון לכל בקשה (מעבר, אוטומטי, מותאם אישית, אדפטיבי)
- **6 אסטרטגיות ניתוב** - אסטרטגיות גלובליות הקובעות את אופן הפצת הבקשות
- **נתב תווים כלליים** — תבניות `provider/*` מנותבות באופן דינמי לכל ספק
- **הפעל/השבת שילוב של החלפה** — החלף שילובים ישירות מלוח המחוונים
- **החלפת ספק** — הפעל/השבת את כל החיבורים עבור ספק בלחיצה אחת
- **ספקים חסומים** — אל תכלול ספקים ספציפיים מרשימת `/v1/models`

</details>

<details>
<summary><b>🧰 17. "אני צריך כלי MCP כיכולות מוצר מהשורה הראשונה" </b></summary>

שערי AI רבים חושפים את MCP רק כפרט יישום נסתר. צוותים צריכים שכבת פעולה גלויה וניתנת לניהול.

**איך OmniRoute פותר את זה:**

- MCP מופיע בכרטיסיית הניווט של לוח המחוונים ופרוטוקול נקודת הקצה
- דף ניהול MCP ייעודי עם תהליך, כלים, היקפים וביקורת
- התחלה מהירה מובנית עבור `omniroute --mcp` וכניסה ללקוח

</details>

<details>
<summary><b>🧠 18. "אני צריך תזמור A2A עם נתיבי משימות סינכרון + זרם" </b></summary>

זרימות עבודה של סוכן זקוקות הן לתשובות ישירות והן לביצוע זרימה ארוך טווח עם בקרת מחזור חיים.

**איך OmniRoute פותר את זה:**

- נקודת קצה A2A JSON-RPC (`POST /a2a`) עם `message/send` ו-`message/stream`
- הזרמת SSE עם הפצת מצב מסוף
- ממשקי API של מחזור חיים של משימות עבור `tasks/get` ו-`tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "אני צריך בריאות של תהליך MCP אמיתי, מצב לא מנחש" </b></summary>

צוותים תפעוליים צריכים לדעת אם MCP באמת חי, לא רק אם ניתן להגיע ל-API.

**איך OmniRoute פותר את זה:**

- קובץ פעימות לב בזמן ריצה עם PID, חותמות זמן, תחבורה, ספירת כלים ומצב היקף
- MCP status API המשלב פעימות לב + פעילות אחרונה
- כרטיסי סטטוס ממשק משתמש עבור תהליך/זמן פעולה/רעננות פעימות לב

</details>

<details>
<summary><b>📋 20. "אני צריך ביצוע כלי MCP שניתן לביקורת" </b></summary>

כאשר כלים משתנים בתצורה או מפעילים פעולות מבצעיות, הצוותים זקוקים למעקב פורנזי.

**איך OmniRoute פותר את זה:**

- רישום ביקורת מגובה SQLite עבור קריאות לכלי MCP
- מסננים לפי כלי, הצלחה/כישלון, מפתח API ועימוד
- טבלת ביקורת לוח המחוונים + נקודות קצה סטטיסטיקות לאוטומציה

</details>

<details>
<summary><b>🔐 21. "אני צריך הרשאות MCP בטווחים לכל אינטגרציה" </b></summary>

ללקוחות שונים צריכה להיות גישה בעלת הרשאות מינימליות לקטגוריות כלים.

**איך OmniRoute פותר את זה:**

- 9 היקפי MCP גרגירים לגישה מבוקרת לכלי
- אכיפה של היקף ונראות בממשק המשתמש של ניהול MCP
- תנוחת ברירת מחדל בטוחה עבור כלי עבודה תפעוליים

</details>

<details>
<summary><b>⚙️ 22. "אני צריך בקרות תפעוליות בלי לפרוס מחדש" </b></summary>

צוותים זקוקים לשינויים מהירים בזמן ריצה במהלך אירועים או אירועי עלות.

**איך OmniRoute פותר את זה:**

- החלף הפעלה משולבת ישירות מלוח המחוונים של MCP
- החל פרופילי חוסן מחבילות מדיניות מוגדרות מראש
- אפס את מצב מפסק החשמל מאותו לוח פעולות

</details>

<details>
<summary><b>🔄 23. "אני צריך נראות וביטול של מחזור החיים של משימות A2A בשידור חי" </b></summary>

ללא נראות של מחזור חיים, אירועי משימות הופכים קשים לבדיקה.

**איך OmniRoute פותר את זה:**

- רישום משימות/סינון לפי מצב/מיומנות עם עימוד
- פירוט על מטא נתונים של משימות, אירועים וחפצים
- נקודת קצה לביטול משימות ופעולת ממשק משתמש עם אישור

</details>

<details>
<summary><b>🌊 24. "אני צריך מדדי סטרימינג פעילים עבור טעינת A2A" </b></summary>

זרימות עבודה בסטרימינג דורשות תובנה תפעולית לגבי חיבורים במקביל וחיבורים חיים.

**איך OmniRoute פותר את זה:**

- מוני זרמים פעילים משולבים בסטטוס A2A
- חותמת הזמן האחרונה של המשימה וספירות לכל מדינה
- כרטיסי לוח מחוונים A2A לניטור פעולות בזמן אמת

</details>

<details>
<summary><b>🪪 25. "אני צריך גילוי סוכן סטנדרטי עבור לקוחות" </b></summary>

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

- ערכים בסרגל הצד עבור MCP ו-A2A
- כרטיסיית פרוטוקולים של דף נקודות קצה עם התחלה מהירה ומצב
- קישורים מסקירה כללית ללוחות ניהול ייעודיים

</details>

<details>
<summary><b>🧪 27. "אני צריך אימות פרוטוקול מקצה לקצה עם לקוחות אמיתיים" </b></summary>

בדיקות מדומה אינן מספיקות כדי לאמת תאימות פרוטוקול לפני השחרור.

**איך OmniRoute פותר את זה:**

- חבילת E2E המאתחלת אפליקציה ומשתמשת בהעברת לקוח MCP SDK אמיתית
- בדיקות לקוח A2A לאיתור, לשלוח, להזרים, לקבל ולבטל זרימות
- צלב הצהרות מול ביקורת MCP ומשימות A2A APIs

</details>

<details>
<summary><b>📡 28. "אני צריך צפייה מאוחדת בכל הממשקים" </b></summary>

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
<summary><b>🚀 30. "אני צריך לשלוח זרימות עבודה סוכניות ללא התפשטות קוד דבק" </b></summary>

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
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ התחלה מהירה

**1. התקן ברחבי העולם:**

```bash
npm install -g omniroute
omniroute
```

🎉 לוח המחוונים נפתח ב-`http://localhost:20128`

| פקודה                   | תיאור                             |
| ----------------------- | --------------------------------- |
| `omniroute`             | התחל שרת (יציאת ברירת מחדל 20128) |
| `omniroute --port 3000` | השתמש ביציאה מותאמת אישית         |
| `omniroute --no-open`   | אל תפתח אוטומטית את הדפדפן        |
| `omniroute --help`      | הצג עזרה                          |

**2. חבר ספק חינמי:**

לוח מחוונים ← ספקים ← התחבר **קוד קלוד** או **אנטי כבידה** ← התחברות OAuth ← בוצע!

**3. השתמש בכלי ה-CLI שלך:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**זהו זה!** התחל לקודד עם דגמי AI בחינם.

**אלטרנטיבה - הפעל מהמקור:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
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

---

## 🖥️

> 🆕 **NEW!** OmniRoute is now available as a **native desktop application** for Windows, macOS, and Linux.

- 🖥️ **Native Window** — Dedicated app window with system tray integration
- 🔄 **Auto-Start** — Launch OmniRoute on system login
- 🔔 **Native Notifications** — Get alerts for quota exhaustion or provider issues
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline Mode** — Works fully offline with bundled server

```bash
npm run electron:dev           # Development mode
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 Full documentation: [`electron/README.md`](electron/README.md)

---

## 💰 תמחור במבט חטוף

| שכבה            | ספק              | עלות                    | איפוס מכסה               | הטוב ביותר עבור          |
| --------------- | ---------------- | ----------------------- | ------------------------ | ------------------------ |
| **💳 מנוי**     | קלוד קוד (פרו)   | 20 דולר לחודש           | 5 שעות + שבועי           | כבר נרשמת                |
|                 | קודקס (פלוס/פרו) | $20-200 לחודש           | 5 שעות + שבועי           | משתמשי OpenAI            |
|                 | Gemini CLI       | **חינם**                | 180K/Mo + 1K/יום         | כֹּל אֶחָד!              |
|                 | GitHub Copilot   | $10-19 לחודש            | חודשי                    | משתמשי GitHub            |
| **🔑 מפתח API** | NVIDIA NIM       | **חינם** (1000 קרדיטים) | חד פעמי                  | בדיקת שכבות חינם         |
|                 | DeepSeek         | תשלום לפי שימוש         | אין                      | המחיר/איכות הטובים ביותר |
|                 | גרוק             | שכבה חינם + בתשלום      | תעריף מוגבל              | הסקה מהירה במיוחד        |
|                 | xAI (Grok)       | תשלום לפי שימוש         | אין                      | דגמי גרוק                |
|                 | מיסטרל           | שכבה חינם + בתשלום      | תעריף מוגבל              | AI אירופאי               |
|                 | OpenRouter       | תשלום לפי שימוש         | אין                      | 100+ דגמים               |
| **💰 זול**      | GLM-4.7          | $0.6/1 מיליון           | כל יום 10:00             | גיבוי תקציבי             |
|                 | MiniMax M2.1     | $0.2/1 מיליון           | גלגול של 5 שעות          | האפשרות הזולה ביותר      |
|                 | קימי K2          | 9 $ לחודש דירה          | 10 מיליון אסימונים לחודש | עלות צפויה               |
| **🆓 חינם**     | iFlow            | $0                      | ללא הגבלה                | 8 דגמים חינם             |
|                 | קוון             | $0                      | ללא הגבלה                | 3 דגמים חינם             |
|                 | קירו             | $0                      | ללא הגבלה                | קלוד חופשי               |

**💡 טיפ מקצועי:** התחל עם Gemini CLI (180K חינם/חודש) + שילוב של iFlow (ללא הגבלה בחינם) = עלות של $0!

---

## 💡 תכונות עיקריות

### 🧠 ניתוב ליבה ומודיעין

| תכונה                         | מה זה עושה                                                                       |
| ----------------------------- | -------------------------------------------------------------------------------- |
| 🎯 **Smart 4-tier Fallback**  | מסלול אוטומטי: מנוי → מפתח API → זול → חינם                                      |
| 📊 **מעקב מכסות בזמן אמת**    | ספירת אסימונים חיה + איפוס ספירה לאחור לכל ספק                                   |
| 🔄 **תרגום פורמט**            | OpenAI ↔ קלוד ↔ תאומים ↔ סמן ↔ Kiro חלקה + חיטוי תגובה                           |
| 👥 **תמיכה בריבוי חשבונות**   | מספר חשבונות לכל ספק עם בחירה חכמה                                               |
| 🔄 **רענון אסימון אוטומטי**   | אסימוני OAuth מתרעננים אוטומטית עם ניסיון חוזר                                   |
| 🎨 **שילובים מותאמים אישית**  | 6 אסטרטגיות: מילוי ראשון, עגול רובין, p2c, אקראי, פחות בשימוש, אופטימיזציה לעלות |
| 🧩 **דגמים מותאמים אישית**    | הוסף כל מזהה דגם לכל ספק                                                         |
| 🌐 **נתב תווים כלליים** ​​    | נתב דפוסי `provider/*` לכל ספק באופן דינמי                                       |
| 🧠 **תקציב חשיבה**            | מצבי מעבר, אוטומטי, מותאמים אישית והתאמה למודלים של חשיבה                        |
| 🔀 **Model Aliases**          | Auto-forward deprecated model IDs to current replacements (built-in + custom)    |
| ⚡ **Background Degradation** | Auto-route background tasks (titles, summaries) to cheaper models                |
| 💬 **הזרקת מערכת מיידית**     | הודעת מערכת גלובלית הוחלה בכל הבקשות                                             |
| 📄 **Responses API**          | תמיכה מלאה של OpenAI Responses API (`/v1/responses`) עבור Codex                  |

### 🎵 ממשקי API רב-מודאליים

| תכונה               | מה זה עושה                                                                                                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **יצירת תמונות** | `/v1/images/generations` — 4 ספקים, 9+ דגמים                                                                                                                               |
| 📐 **הטבעות**       | `/v1/embeddings` — 6 ספקים, 9+ דגמים                                                                                                                                       |
| 🎤 **תמלול אודיו**  | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **טקסט לדיבור**  | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **מנחים**        | `/v1/moderations` — בדיקות בטיחות תוכן                                                                                                                                     |
| 🔀 **דירוג מחדש**   | `/v1/rerank` — דירוג מחדש של רלוונטיות המסמך                                                                                                                               |

### 🛡️ חוסן וביטחון

| תכונה                                | מה זה עושה                                                                   |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| 🔌 **מפסק מעגלים**                   | פתיחה/סגירה אוטומטית לכל ספק עם ערכי סף הניתנים להגדרה                       |
| 🛡️ **עדר נגד רעמים**                 | Mutex + מגבלת קצב סמפור עבור ספקי מפתח API                                   |
| 🧠 **מטמון סמנטי**                   | מטמון דו-שכבתי (חתימה + סמנטי) מפחית את העלות והשהייה                        |
| ⚡ **בקש אימפוטנציה**                | חלון ביטול 5s עבור בקשות כפולות                                              |
| 🔒 **זיוף טביעות אצבע TLS**          | עוקף זיהוי בוט מבוסס TLS באמצעות wreq-js                                     |
| 🌐 **סינון IP**                      | רשימת הרשאות/רשימת חסימות עבור בקרת גישה ל-API                               |
| 📊 **מגבלות תעריפים הניתנות לעריכה** | RPM ניתן להגדרה, פער מינימלי ומקסימום במקביל ברמת המערכת                     |
| 💾 **Rate Limit Persistence**        | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness |
| 🔄 **Token Refresh Resilience**      | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt       |
| 🛡 **הגנת נקודת קצה API**            | Auth gating + חסימת ספק עבור נקודת הקצה `/models`                            |
| 🔒 **נראות פרוקסי**                  | תגים מקודדים בצבע: 🟢 גלובלי, 🟡 ספק, 🔵 לכל חיבור עם תצוגת IP               |
| 🌐 **תצורת פרוקסי בשלוש רמות**       | הגדר פרוקסי ברמה גלובלית, לכל ספק או לכל חיבור                               |

### 📊 יכולת תצפית וניתוח

| תכונה                           | מה זה עושה                                                             |
| ------------------------------- | ---------------------------------------------------------------------- |
| 📝 **בקש רישום**                | מצב ניפוי באגים עם יומני בקשות/תגובות מלאים                            |
| 💾 **יומני פרוקסי של SQLite**   | יומני פרוקסי מתמשכים שורדים אתחול מחדש של השרת                         |
| 📊 **לוח המחוונים של אנליטיקס** | מופעל מחדש ב-Recharts: כרטיסי סטטיסטיקה, טבלת שימוש במודל, טבלת ספקים  |
| 📈 **מעקב התקדמות**             | הצטרפות לאירועי התקדמות SSE לסטרימינג                                  |
| 🧪 **LM Evaluations**           | בדיקת סט זהב עם 4 אסטרטגיות התאמה                                      |
| 🔍 **בקש טלמטריה**              | צבירת זמן אחזור p50/p95/p99 + מעקב אחר X-Request-Id                    |
| 📋 **לוח מחוונים יומני**        | עמוד מאוחד בן 4 לשוניות: יומני בקשות, יומני פרוקסי, יומני ביקורת, מסוף |
| 🖥️ **מציג יומן מסוף**           | מציג בסגנון טרמינל בזמן אמת עם מסנן רמות, חיפוש, גלילה אוטומטית        |
| 📑 **רישום מבוסס קבצים**        | מיירט מסוף לוכד את כל הפלט לקובץ יומן JSON עם סיבוב                    |
| 🏥 **לוח מחוונים לבריאות**      | זמן פעילות מערכת, מצבי מפסק זרם, נעילות, סטטיסטיקות מטמון              |
| 💰 **מעקב עלויות**              | ניהול תקציב + תצורת תמחור לפי דגם                                      |

### ☁️ פריסה וסנכרון

| תכונה                              | מה זה עושה                                                            |
| ---------------------------------- | --------------------------------------------------------------------- |
| 💾 **סנכרון ענן**                  | סנכרון תצורה בין מכשירים באמצעות Cloudflare Workers                   |
| 🌐 **פרוס בכל מקום**               | Localhost, VPS, Docker, Cloudflare Workers                            |
| 🔑 **ניהול מפתחות API**            | צור, סובב והיקף מפתחות API לכל ספק                                    |
| 🧙 **אשף העלייה למטוס**            | הגדרה מודרכת בת 4 שלבים למשתמשים חדשים                                |
| 🔧 **לוח המחוונים של כלי CLI**     | הגדר בלחיצה אחת את Claude, Codex, Cline, OpenClaw, Kilo, Antigravity  |
| 🔄 **גיבויים של DB**               | גיבוי, שחזור, ייצוא וייבוא ​​אוטומטי עבור כל ההגדרות                  |
| 🌐 **בינלאומיות**                  | i18n מלא עם next-intl — תמיכה באנגלית + פורטוגזית (ברזיל)             |
| 🌍 **בורר שפה**                    | סמל גלובוס בכותרת למעבר שפה בזמן אמת (🇺🇸/🇧🇷)                          |
| 📂 **ספריית נתונים מותאמים אישית** | `DATA_DIR` env var כדי לעקוף את ברירת המחדל `~/.omniroute` נתיב אחסון |

<details>
<summary><b>📖 פרטי תכונה</b></summary>

### 🎯 4 שכבות סתירה חכמה

צור שילובים עם נפילה אוטומטית:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 מעקב מכסות בזמן אמת

- צריכת אסימונים לכל ספק
- אפס ספירה לאחור (5 שעות, יומי, שבועי)
- הערכת עלויות עבור שכבות בתשלום
- דוחות הוצאות חודשיים

### 🔄 תרגום פורמט

תרגום חלק בין פורמטים:

- **OpenAI** ↔ **קלוד** ↔ **תאומים** ↔ **תגובות OpenAI**
- כלי ה-CLI שלך שולח פורמט OpenAI → OmniRoute מתרגם → הספק מקבל פורמט מקורי
- עובד עם כל כלי התומך בנקודות קצה מותאמות אישית של OpenAI
- **חיטוי תגובה** - מסיר שדות לא סטנדרטיים לצורך תאימות קפדנית של OpenAI SDK
- **נורמליזציה של תפקידים** — `developer` → `system` עבור לא-OpenAI; `system` → `user` עבור דגמי GLM/ERNIE
- **חילוץ תג חשיבה** — `<think>` בלוקים → `reasoning_content` למודלים חושבים
- **פלט מובנה** — `json_schema` → `responseMimeType`/`responseSchema` של Gemini

### 👥 תמיכה בריבוי חשבונות

- הוסף מספר חשבונות לכל ספק
- ניתוב סבב אוטומטי או מבוסס עדיפות
- חזרה לחשבון הבא כאשר אחד מגיע למכסה

### 🔄 רענון אסימון אוטומטי

- אסימוני OAuth מתרעננים אוטומטית לפני פקיעת התוקף
- אין צורך באימות מחדש ידני
- חוויה חלקה בכל הספקים

### 🎨 שילובים מותאמים אישית

- צור שילובי דגמים ללא הגבלה
- 6 אסטרטגיות: מילוי ראשון, עגול, כוח משתי בחירות, אקראי, פחות בשימוש, אופטימיזציית עלות
- שתף שילובים בין מכשירים עם Cloud Sync

### 🏥 לוח מחוונים לבריאות

- מצב מערכת (זמן פעילות, גרסה, שימוש בזיכרון)
- מצבי מפסק לכל ספק (סגור/פתוח/חצי פתוח)
- מצב מגבלת תעריף ונעילה אקטיבית
- סטטיסטיקת מטמון חתימה
- טלמטריית אחזור (p50/p95/p99) + מטמון פקודות
- אפס מצב בריאותי בלחיצה אחת

### 🔧 מגרש משחקים למתרגמים

OmniRoute כולל מגרש משחקי מתרגמים מובנה רב עוצמה עם **4 מצבים** לניפוי באגים, בדיקה וניטור תרגומי API:

| מצב                | תיאור                                                                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻 מגרש משחקים** | תרגום פורמט ישיר - הדבק כל גוף בקשת API וראה באופן מיידי כיצד OmniRoute מתרגם אותו בין פורמטים של ספקים (OpenAI ↔ Claude ↔ Gemini ↔ Responses API). כולל תבניות לדוגמה וזיהוי אוטומטי של פורמטים. |
| **💬 בודק צ'אט**   | שלח בקשות צ'אט אמיתיות דרך OmniRoute וראה את המסלול המלא הלוך ושוב: הקלט שלך, הבקשה המתורגמת, תגובת הספק והתגובה המתורגמת חזרה. לא יסולא בפז עבור אימות ניתוב משולב.                              |
| **🧪 ספסל מבחן**   | מצב בדיקת אצווה - הגדירו מקרי בדיקה מרובים עם תשומות ותפוקות צפויות שונות, הפעל את כולם בבת אחת והשווה תוצאות בין ספקים ודגמים.                                                                   |
| **📱 צג חי**       | ניטור בקשות בזמן אמת - צפה בבקשות נכנסות כשהן זורמות דרך OmniRoute, ראה תרגומי פורמטים המתרחשים בשידור חי וזיהוי בעיות באופן מיידי.                                                               |

**גישה:** לוח מחוונים ← מתרגם (סרגל צד)

### 💾 סנכרון ענן

- סנכרון ספקים, שילובים והגדרות בין מכשירים
- סנכרון רקע אוטומטי
- אחסון מוצפן מאובטח

</details>

## 🧪 הערכות (הערכות)

OmniRoute כולל מסגרת הערכה מובנית לבדיקת איכות תגובת LLM מול סט מוזהב. גש אליו דרך **Analytics → Evals** בלוח המחוונים.

### סט מוזהב מובנה

ה-"OmniRoute Golden Set" הנטען מראש מכיל 10 מקרי בדיקה המכסים:

- ברכות, מתמטיקה, גיאוגרפיה, יצירת קוד
- תאימות לפורמט JSON, תרגום, סימון
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

### NVIDIA NIM (1000 קרדיטים בחינם!)

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

**טיפ מקצועי:** האפשרות הזולה ביותר להקשר ארוך (1 מיליון אסימונים)!

### Kimi K2 (דירה של $9 לחודש)

1. הירשם: [Moonshot AI](https://platform.moonshot.ai/)
2. קבל מפתח API
3. לוח מחוונים ← הוסף מפתח API

**השתמש:** `kimi/kimi-latest`

**טיפ מקצועי:** 9$ קבוע לחודש עבור 10 מיליון אסימונים = 0.90$/1 מיליון עלות אפקטיבית!

</details>

<details>
<summary><b>🆓 ספקים בחינם (גיבוי חירום)</b></summary>

### iFlow (8 דגמים בחינם)

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

### Qwen (3 דגמים בחינם)

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
<summary><b>🎨 צור שילובים</b></summary>

### דוגמה 1: הגדלת מנוי ← גיבוי זול

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
<summary><b>🔧 שילוב CLI</b></summary>

### סמן IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### קלוד קוד

השתמש בדף **כלי CLI** בלוח המחוונים עבור תצורה בלחיצה אחת, או ערוך את `~/.claude/settings.json` באופן ידני.

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

> **הערה:** OpenClaw עובד רק עם OmniRoute מקומי. השתמש ב-`127.0.0.1` במקום ב-`localhost` כדי להימנע מבעיות ברזולוציה של IPv6.

### Cline / Continue / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

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
- הוסף שילוב: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**פג תוקפו של אסימון OAuth**

- רענון אוטומטי על ידי OmniRoute
- אם הבעיות נמשכות: לוח מחוונים ← ספק ← התחבר מחדש

**עלויות גבוהות**

- בדוק סטטיסטיקת שימוש בלוח המחוונים ← עלויות
- החלף את הדגם הראשי ל-GLM/MiniMax
- השתמש בשכבה חינמית (Gemini CLI, iFlow) עבור משימות לא קריטיות

**לוח המחוונים נפתח ביציאה שגויה**

- הגדר `PORT=20128` ו`NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**שגיאות סנכרון בענן**

- אמת `BASE_URL` נקודות למופע הריצה שלך
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

### 🔐 OAuth

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ חשוב עבור שימוש ב-OmniRoute עם מרחוק VPS/Docker/שרת**

### האם אפשר לעשות אנטי כבידה / CLI מזל תאומים על שירותים מרוחקים?

שימוש ב-**Antigravity** ו-**Gemini CLI** בשימוש ב-**Google OAuth 2.0** עבור אוטנטיקה. O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** uma das URIs pré-cadastradas no Google Cloud Console do aplicativo.

As credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas para `localhost`**. Quando você acessa o OmniRoute em um servidor remoto (לדוגמה: `https://omniroute.meuservidor.com`), o Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

### פתרון: הגדר את התצורה של OAuth

קרא בדיוק את **OAuth 2.0 Client ID** ללא Google Cloud Console com a URI do seu service.

#### פסו אפס

**1. גישה ל-Google Cloud Console**

אברה: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo OAuth 2.0 מזהה לקוח**

- לחץ על **"+ צור אישורים"** → **"זיהוי לקוח OAuth"**
- טיפו דה אפליקטיבי: **"יישום אינטרנט"**
- שם: escolha qualquer nome (לדוגמה: `OmniRoute Remote`)

**3. Adicone ככתובות URI מורשות להפניה מחדש**

אין קמפו **"כתובות URI מורשות להפניה מחדש"**, adicione:

```
https://seu-servidor.com/callback
```

> Substitua `seu-servidor.com` pelo domínio או IP do seu servidor (כולל א porta se necessário, למשל: `http://45.33.32.156:20128/callback`).

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

### זמני פתרון לעקיפת הבעיה

Se não quiser criar credenciais próprias agora, ainda é possível usar o fluxo **manual de URL**:

1. O OmniRoute abrirá a URL de autorização do Google
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no servidor remoto)
3. **העתק כתובת URL מלאה** da barra de endereço do seu דפדפן (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. לחץ על **"התחבר"**

> פתרון עקיפת הבעיה או קוד אוטומטי של כתובת ה-URL או עצמאית להפנות את החשבון או לא.

</details>

---

## 🛠️

- **זמן ריצה**: Node.js 18–22 LTS (⚠️ Node.js 24+ **לא נתמך** - `better-sqlite3` קבצים בינאריים מקוריים אינם תואמים)
- **שפה**: TypeScript 5.9 — **100% TypeScript** על פני `src/` ו`open-sse/` (v1.0.6)
- **מסגרת**: Next.js 16 + React 19 + Tailwind CSS 4
- **מסד נתונים**: LowDB (JSON) + SQLite (מצב תחום + יומני proxy)
- **סטרימינג**: אירועים שנשלחו על ידי שרת (SSE)
- **אישור**: OAuth 2.0 (PKCE) + JWT + מפתחות API
- **בדיקות**: רץ מבחן Node.js (בדיקות 368+ יחידות)
- **CI/CD**: פעולות GitHub (פרסום אוטומטי של npm + Docker Hub בשחרור)
- **אתר**: [omniroute.online](https://omniroute.online)
- **חבילה**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **דוקר**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **חוסן**: מפסק מעגלים, גיבוי אקספוננציאלי, עדר נגד רעמים, זיוף TLS

---

## 📖 תיעוד

| מסמך                                         | תיאור                                     |
| -------------------------------------------- | ----------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)             | ספקים, שילובים, שילוב CLI, פריסה          |
| [API Reference](docs/API_REFERENCE.md)       | כל נקודות הקצה עם דוגמאות                 |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | בעיות ופתרונות נפוצים                     |
| [Architecture](docs/ARCHITECTURE.md)         | ארכיטקטורת מערכת ופנים                    |
| [Contributing](CONTRIBUTING.md)              | מערך פיתוח והנחיות                        |
| [OpenAPI Spec](docs/openapi.yaml)            | מפרט OpenAPI 3.0                          |
| [Security Policy](SECURITY.md)               | דיווח על פגיעות ונהלי אבטחה               |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | מדריך שלם: הגדרות VM + nginx + Cloudflare |
| [Features Gallery](docs/FEATURES.md)         | סיור חזותי בלוח המחוונים עם צילומי מסך    |

### 📸 תצוגה מקדימה של לוח המחוונים

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
| **נקודת קצה**   | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

ל-OmniRoute יש **210+ תכונות מתוכננות** לאורך שלבי פיתוח מרובים. להלן תחומי המפתח:

| קטגוריה                      | תכונות מתוכננות                                        | הבהרה                                                                                    |
| ---------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
| 🧠 **ניתוב ומודיעין**        | 25+                                                    | ניתוב עם זמן האחזור הנמוך ביותר, ניתוב מבוסס תגים, בדיקה מוקדמת של מכסה, בחירת חשבון P2C |
| 🔒 **אבטחה ותאימות**         | 20+                                                    | הקשחת SSRF, הסוואה של אישורים, הגבלת קצב לכל נקודת קצה, היקף מפתח ניהול                  |
| 📊 **צפיות**                 | 15+                                                    | אינטגרציה של OpenTelemetry, ניטור מכסות בזמן אמת, מעקב עלויות לכל דגם                    |
| 🔄 **שילובי ספקים**          | 20+                                                    | רישום מודלים דינמיים, צינון ספקים, Codex מרובה חשבונות, ניתוח מכסת Copilot               |
| ⚡ **ביצועים**               | 15+                                                    | שכבת מטמון כפולה, מטמון הנחיה, מטמון תגובה, סטרימינג Keepalive, API אצווה                |
| 🌐 **מערכת אקולוגית**        | 10+                                                    | WebSocket API, טעינה חוזרת של תצורה, חנות תצורה מבוזרת, מצב מסחרי                        |

### 🔜 בקרוב

- 🔗 **שילוב OpenCode** - תמיכה בספק מקורי עבור IDE קידוד AI של OpenCode
- 🔗 **TRAE Integration** — תמיכה מלאה במסגרת הפיתוח של TRAE AI
- 📦 **אצווה API** - עיבוד אצווה אסינכרוני עבור בקשות בכמות גדולה
- 🎯 **ניתוב מבוסס תגים** — בקשות ניתוב המבוססות על תגים ומטא נתונים מותאמים אישית
- 💰 **אסטרטגיית העלות הנמוכה ביותר** — בחר אוטומטית את הספק הזמין הזול ביותר

> 📝 מפרטי תכונה מלאים זמינים ב-[link](docs/new-features/) (217 מפרטים מפורטים)

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
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 היסטוריית כוכבים

## Stargazers over time

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
