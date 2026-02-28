# מדריך למשתמש

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

מדריך שלם להגדרת ספקים, יצירת שילובים, שילוב כלי CLI ופריסה של OmniRoute.

---

## תוכן העניינים

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 תמחור במבט חטוף

| שכבה            | ספק              | עלות            | איפוס מכסה               | הטוב ביותר עבור               |
| --------------- | ---------------- | --------------- | ------------------------ | ----------------------------- |
| **💳 מנוי**     | קלוד קוד (פרו)   | 20 דולר לחודש   | 5 שעות + שבועי           | כבר נרשמת                     |
|                 | קודקס (פלוס/פרו) | $20-200 לחודש   | 5 שעות + שבועי           | משתמשי OpenAI                 |
|                 | Gemini CLI       | **חינם**        | 180K/Mo + 1K/יום         | כֹּל אֶחָד!                   |
|                 | GitHub Copilot   | $10-19 לחודש    | חודשי                    | משתמשי GitHub                 |
| **🔑 מפתח API** | DeepSeek         | תשלום לפי שימוש | אין                      | נימוק זול                     |
|                 | גרוק             | תשלום לפי שימוש | אין                      | הסקה מהירה במיוחד             |
|                 | xAI (Grok)       | תשלום לפי שימוש | אין                      | גרוק 4 הנמקה                  |
|                 | מיסטרל           | תשלום לפי שימוש | אין                      | דגמים המתארחים באיחוד האירופי |
|                 | תמיהה            | תשלום לפי שימוש | אין                      | חיפוש מוגדל                   |
|                 | ביחד AI          | תשלום לפי שימוש | אין                      | מודלים של קוד פתוח            |
|                 | זיקוקים AI       | תשלום לפי שימוש | אין                      | תמונות מהיר FLUX              |
|                 | מוחין            | תשלום לפי שימוש | אין                      | מהירות בקנה מידה רקיק         |
|                 | קוהר             | תשלום לפי שימוש | אין                      | פקודה R+ RAG                  |
|                 | NVIDIA NIM       | תשלום לפי שימוש | אין                      | דגמים ארגוניים                |
| **💰 זול**      | GLM-4.7          | $0.6/1 מיליון   | כל יום 10:00             | גיבוי תקציבי                  |
|                 | MiniMax M2.1     | $0.2/1 מיליון   | גלגול של 5 שעות          | האפשרות הזולה ביותר           |
|                 | קימי K2          | 9 $ לחודש דירה  | 10 מיליון אסימונים לחודש | עלות צפויה                    |
| **🆓 חינם**     | iFlow            | $0              | ללא הגבלה                | 8 דגמים חינם                  |
|                 | קוון             | $0              | ללא הגבלה                | 3 דגמים חינם                  |
|                 | קירו             | $0              | ללא הגבלה                | קלוד חופשי                    |

**💡 טיפ מקצועי:** התחל עם Gemini CLI (180K חינם/חודש) + שילוב של iFlow (ללא הגבלה בחינם) = עלות של $0!

---

## 🎯 מקרי שימוש

### מקרה 1: "יש לי מנוי לקלוד פרו"

**בעיה:** תוקף המכסה פג ללא שימוש, מגבלות תעריף במהלך קידוד כבד

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### מקרה 2: "אני רוצה עלות אפס"

**בעיה:** לא יכול להרשות לעצמו מנויים, צריך קידוד AI אמין

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### מקרה 3: "אני צריך קידוד 24/7, ללא הפרעות"

**בעיה:** מועדים, לא יכול להרשות לעצמו זמן השבתה

```
Combo: "always-on"
  1. cc/claude-opus-4-6        (best quality)
  2. cx/gpt-5.2-codex          (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2-thinking       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### מקרה 4: "אני רוצה AI בחינם ב-OpenClaw"

**בעיה:** צריך עוזר בינה מלאכותית באפליקציות הודעות, בחינם לחלוטין

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 הגדרת ספק

### 🔐 ספקי מנויים

#### קלוד קוד (פרו/מקס)

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

#### OpenAI Codex (פלוס/פרו)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (180K בחינם לחודש!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**הערך הטוב ביותר:** שכבת חינם ענקית! השתמש בזה לפני שכבות בתשלום.

#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 ספקים זולים

#### GLM-4.7 (איפוס יומי, $0.6/1M)

1. הירשם: [Zhipu AI](https://open.bigmodel.cn/)
2. קבל מפתח API מ-Coding Plan
3. לוח מחוונים ← הוסף מפתח API: ספק: `glm`, מפתח API: `your-key`

**שימוש:** `glm/glm-4.7` — **טיפ מקצועי:** תוכנית קידוד מציעה מכסה של 3× בעלות של 1/7! איפוס כל יום 10:00 בבוקר.

#### MiniMax M2.1 (איפוס של 5 שעות, $0.20/1 מיליון)

1. הירשם: [MiniMax](https://www.minimax.io/)
2. קבל מפתח API → לוח מחוונים → הוסף מפתח API

**שימוש:** `minimax/MiniMax-M2.1` — **טיפ מקצועי:** האפשרות הזולה ביותר להקשר ארוך (מיליון אסימונים)!

#### Kimi K2 (דירה של 9$ לחודש)

1. הירשם: [Moonshot AI](https://platform.moonshot.ai/)
2. קבל מפתח API → לוח מחוונים → הוסף מפתח API

**שימוש:** `kimi/kimi-latest` — **טיפ מקצועי:** קבוע $9 לחודש עבור 10 מיליון אסימונים = $0.90/1 מיליון עלות אפקטיבית!

### 🆓 ספקים בחינם

#### iFlow (8 דגמים בחינם)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 דגמים בחינם)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### קירו (קלוד בחינם)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 שילובים

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

---

## 🔧 שילוב CLI

### סמן IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### קלוד קוד

ערוך את `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

ערוך את `~/.openclaw/openclaw.json`:

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/glm-4.7" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
      }
    }
  }
}
```

**או השתמש ב-Dashboard:** CLI Tools → OpenClaw → Auto-config

### Cline / Continue / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 פריסה

### פריסת VPS

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Or: pm2 start npm --name omniroute -- start
```

### דוקר

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

למצב משולב מארח עם קבצים בינאריים של CLI, עיין בסעיף Docker במסמכים הראשיים.

### משתני סביבה

| משתנה                 | ברירת מחדל                           | תיאור                                                   |
| --------------------- | ------------------------------------ | ------------------------------------------------------- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | סוד חתימת JWT (**שינוי בייצור**)                        |
| `INITIAL_PASSWORD`    | `123456`                             | סיסמת כניסה ראשונה                                      |
| `DATA_DIR`            | `~/.omniroute`                       | ספריית נתונים (db, שימוש, יומנים)                       |
| `PORT`                | ברירת המחדל של מסגרת                 | יציאת שירות (`20128` בדוגמאות)                          |
| `HOSTNAME`            | ברירת המחדל של מסגרת                 | מארח איגד (Docker ברירת המחדל היא `0.0.0.0`)            |
| `NODE_ENV`            | ברירת המחדל של זמן ריצה              | הגדר את `production` לפריסה                             |
| `BASE_URL`            | `http://localhost:20128`             | כתובת URL בסיס פנימית בצד השרת                          |
| `CLOUD_URL`           | `https://omniroute.dev`              | כתובת אתר בסיס של נקודת קצה לסנכרון בענן                |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | סוד HMAC עבור מפתחות API שנוצרו                         |
| `REQUIRE_API_KEY`     | `false`                              | לאכוף מפתח API של Bearer ב-`/v1/*`                      |
| `ENABLE_REQUEST_LOGS` | `false`                              | מאפשר יומני בקשות/תגובות                                |
| `AUTH_COOKIE_SECURE`  | `false`                              | כפה עוגיית אישור `Secure` (מאחורי פרוקסי הפוך של HTTPS) |

להפניה מלאה למשתנה הסביבה, עיין ב-[README](../README.md).

---

## 📊 דגמים זמינים

<details>
<summary><b>הצג את כל הדגמים הזמינים</b></summary>

**קוד קלוד (`cc/`)** — פרו/מקסימום: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**קודקס (`cx/`)** — פלוס/יתרונות: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — בחינם: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — $0.6/1 מיליון: `glm/glm-4.7`

**MiniMax (`minimax/`)** — $0.2/1 מיליון: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — בחינם: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — בחינם: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — בחינם: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**מיסטרל (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**תמיהה (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

** Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**מוחין (`cerebras/`)**: `cerebras/llama-3.3-70b`

**קוהר (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 תכונות מתקדמות

### דגמים מותאמים אישית

הוסף מזהה דגם לכל ספק מבלי לחכות לעדכון אפליקציה:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

או השתמש בלוח המחוונים: **ספקים ← [ספק] ← דגמים מותאמים אישית**.

### מסלולי ספקים ייעודיים

נתב בקשות ישירות לספק ספציפי עם אימות מודל:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

קידומת הספק מתווספת אוטומטית אם חסרה. דגמים לא תואמים מחזירים `400`.

### תצורת Proxy Network

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
```

**עדיפות:** ספציפית למפתח → ספציפי לשילוב → ספציפי לספק → גלובלי → סביבה.

### ממשק API של קטלוג דגמים

```bash
curl http://localhost:20128/api/models/catalog
```

מחזירה דגמים מקובצים לפי ספק עם סוגים (`chat`, `embedding`, `image`).

### סנכרון ענן

- סנכרון ספקים, שילובים והגדרות בין מכשירים
- סנכרון רקע אוטומטי עם פסק זמן + כשל מהיר
- העדיפו את `BASE_URL`/`CLOUD_URL` בצד השרת בייצור

### LLM Gateway Intelligence (שלב 9)

- **מטמון סמנטי** - מטמון אוטומטי ללא סטרימינג, טמפרטורה=0 תגובות (עקוף עם `X-OmniRoute-No-Cache: true`)
- **בקש אימפוטנציה** - ביטול כפילויות של בקשות תוך 5 שניות באמצעות כותרת `Idempotency-Key` או `X-Request-Id`
- **מעקב אחר התקדמות** — הצטרפות לאירועי SSE `event: progress` דרך כותרת `X-OmniRoute-Progress: true`

---

### מגרש משחקים לתרגום

גישה דרך **לוח מחוונים ← מתרגם**. נפה באגים ודמיין כיצד OmniRoute מתרגם בקשות API בין ספקים.

| מצב             | מטרה                                                                   |
| --------------- | ---------------------------------------------------------------------- |
| **מגרש משחקים** | בחר פורמטים של מקור/יעד, הדבק בקשה וראה את הפלט המתורגם באופן מיידי    |
| **בודק צ'אט**   | שלח הודעות צ'אט חי דרך ה-proxy ובדוק את מחזור הבקשה/התגובה המלא        |
| **ספסל מבחן**   | הפעל בדיקות אצווה על פני מספר שילובי פורמטים כדי לאמת את נכונות התרגום |
| **שידור חי**    | צפה בתרגומים בזמן אמת כאשר בקשות זורמות דרך ה-proxy                    |

**מקרי שימוש:**

- איתור באגים מדוע שילוב לקוח/ספק ספציפי נכשל
- ודא שתגי חשיבה, קריאות לכלים והנחיות מערכת מתורגמות כהלכה
- השווה הבדלי פורמטים בין פורמטים של OpenAI, Claude, Gemini ו-Respons API

---

### אסטרטגיות ניתוב

הגדר דרך **לוח מחוונים ← הגדרות ← ניתוב**.

| אסטרטגיה                      | תיאור                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------- |
| **מילוי ראשון**               | משתמש בחשבונות לפי סדר עדיפות - החשבון הראשי מטפל בכל הבקשות עד שהוא לא זמין     |
| **עגול רובין**                | עובר על כל החשבונות עם מגבלה דביקה הניתנת להגדרה (ברירת מחדל: 3 שיחות לחשבון)    |
| **P2C (כוח של שתי אפשרויות)** | בוחר 2 חשבונות אקראיים ומסלולים לאחד הבריא יותר - מאזן עומס עם מודעות לבריאות    |
| **אקראי**                     | בוחר באקראי חשבון עבור כל בקשה באמצעות Fisher-Yates Shuffle                      |
| **פחות בשימוש**               | מסלולים לחשבון עם חותמת הזמן הוותיקה ביותר `lastUsedAt`, חלוקת התנועה באופן שווה |
| **אופטימיזציה לעלות**         | מסלולים לחשבון עם ערך העדיפות הנמוך ביותר, אופטימיזציה לספקים בעלות הנמוכה ביותר |

#### כינויים של מודל עם תווים כלליים לחיפוש

צור דפוסי תווים כלליים למיפוי מחדש של שמות מודלים:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

תווים כלליים תומכים ב-`*` (כל תווים) וב-`?` (תו בודד).

#### שרשראות Fallback

הגדר שרשראות חילופין גלובליות החלות על כל הבקשות:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### חוסן ומפסקי חשמל

הגדר דרך **לוח מחוונים ← הגדרות ← חוסן**.

OmniRoute מיישמת חוסן ברמת הספק עם ארבעה מרכיבים:

1. **פרופילי ספק** — תצורה לכל ספק עבור:
   - סף כשל (כמה כשלים לפני הפתיחה)
   - משך ההתקררות
   - רגישות לזיהוי מגבלת שיעור
   - פרמטרי גיבוי אקספוננציאליים

2. **מגבלות שיעור הניתנות לעריכה** — ברירות מחדל ברמת המערכת הניתנות להגדרה בלוח המחוונים:
   - **בקשות לדקה (RPM)** - מקסימום בקשות לדקה לחשבון
   - **מינימום זמן בין בקשות** - פער מינימלי באלפיות שניות בין בקשות
   - **מקסימום בקשות במקביל** - מקסימום בקשות בו-זמניות לכל חשבון
   - לחץ על **ערוך** כדי לשנות, ולאחר מכן על **שמור** או **ביטול**. הערכים נמשכים באמצעות ממשק API לחוסן.

3. **מפסק מעגלים** - עוקב אחר כשלים לכל ספק ופותח את המעגל באופן אוטומטי כאשר מגיעים לסף:
   - **סגור** (בריא) - הבקשות זורמות כרגיל
   - **פתוח** - הספק נחסם זמנית לאחר כשלים חוזרים ונשנים
   - **HALF_OPEN** - בדיקה אם הספק התאושש

4. **מדיניות ומזהים נעולים** — מציג את מצב מפסק החשמל ומזהים נעולים עם יכולת פתיחה בכוח.

5. **זיהוי אוטומטי של מגבלת תעריף** — עקוב אחר כותרות `429` ו`Retry-After` כדי להימנע באופן יזום מפגיעה במגבלות התעריפים של הספקים.

**טיפ מקצוען:** השתמש בלחצן **אפס הכל** כדי לנקות את כל מפסקי החשמל וההתקררות כאשר ספק מתאושש מהפסקה.

---

### ייצוא/ייבוא של מסד נתונים

נהל גיבויים של מסדי נתונים ב-**לוח מחוונים → הגדרות → מערכת ואחסון**.

| פעולה                  | תיאור                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| **ייצוא מסד נתונים**   | מוריד את מסד הנתונים הנוכחי של SQLite כקובץ `.sqlite`                                                        |
| **ייצא הכל (.tar.gz)** | מוריד ארכיון גיבוי מלא כולל: מסד נתונים, הגדרות, שילובים, חיבורי ספקים (ללא אישורים), מטא נתונים של מפתח API |
| **ייבוא ​​מסד נתונים** | העלה קובץ `.sqlite` כדי להחליף את מסד הנתונים הנוכחי. גיבוי טרום-ייבוא ​​נוצר אוטומטית                       |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**אימות יבוא:** הקובץ המיובא מאומת עבור תקינות (בדיקת פרגמה של SQLite), טבלאות נדרשות (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) וגודל (מקסימום 100MB).

**מקרי שימוש:**

- העבר OmniRoute בין מכונות
- צור גיבויים חיצוניים להתאוששות מאסון
- שתף תצורות בין חברי הצוות (ייצא הכל → שתף ארכיון)

---

### לוח המחוונים של הגדרות

דף ההגדרות מאורגן ב-5 כרטיסיות לניווט קל:

| לשונית    | תוכן                                                                                                       |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| **אבטחה** | הגדרות התחברות/סיסמה, בקרת גישה ל-IP, אישור API עבור `/models`, וחסימת ספק                                 |
| **ניתוב** | אסטרטגיית ניתוב גלובלית (6 אפשרויות), כינויים של מודלים עם תווים כלליים, שרשרות חזרות, ברירות מחדל משולבות |
| **חוסן**  | פרופילי ספקים, מגבלות תעריף הניתנות לעריכה, מצב מפסק זרם, מדיניות ומזהים נעולים                            |
| **AI**    | חשיבה על תצורת תקציב, הזרקת הנחיות למערכת גלובלית, סטטיסטיקת מטמון פקודה                                   |
| **מתקדם** | תצורת פרוקסי גלובלית (HTTP/SOCKS5)                                                                         |

---

### עלויות וניהול תקציב

גישה דרך **לוח המחוונים ← עלויות**.

| לשונית    | מטרה                                                                            |
| --------- | ------------------------------------------------------------------------------- |
| **תקציב** | הגדר מגבלות הוצאה לכל מפתח API עם תקציבים יומיים/שבועיים/חודשיים ומעקב בזמן אמת |
| **תמחור** | הצג וערוך ערכי תמחור של מודל - עלות לכל 1K אסימוני קלט/פלט לכל ספק              |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**מעקב עלויות:** כל בקשה מתעדת את השימוש באסימונים ומחשבת עלות באמצעות טבלת התמחור. הצג פירוטים ב-**לוח מחוונים → שימוש** לפי ספק, דגם ומפתח API.

---

### תמלול אודיו

OmniRoute תומך בתמלול אודיו דרך נקודת הקצה התואמת OpenAI:

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

ספקים זמינים: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

פורמטי שמע נתמכים: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### אסטרטגיות איזון משולבות

הגדר איזון לכל שילוב ב-**לוח מחוונים ← שילובים ← יצירה/עריכה ← אסטרטגיה**.

| אסטרטגיה              | תיאור                                                       |
| --------------------- | ----------------------------------------------------------- |
| **סיבוב רובין**       | מסתובב בין דגמים ברצף                                       |
| **עדיפות**            | תמיד מנסה את הדגם הראשון; נופל רק על שגיאה                  |
| **אקראי**             | בוחר דגם אקראי מהשילוב עבור כל בקשה                         |
| **משוקלל**            | מסלולים באופן פרופורציונלי על בסיס משקלים מוקצים לדגם       |
| **פחות בשימוש**       | מסלול למודל עם הכי מעט בקשות אחרונות (משתמש במדדים משולבים) |
| **אופטימיזציית עלות** | מסלולים לדגם הזול ביותר הזמין (משתמש בטבלת תמחור)           |

ניתן להגדיר ברירות מחדל גלובליות משולבות ב-**לוח מחוונים → הגדרות → ניתוב → ברירות מחדל משולבות**.

---

### לוח מחוונים לבריאות

גישה דרך **לוח מחוונים → בריאות**. סקירת תקינות מערכת בזמן אמת עם 6 כרטיסים:

| כרטיס               | מה זה מראה                                                 |
| ------------------- | ---------------------------------------------------------- |
| **סטטוס מערכת**     | זמן פעולה, גרסה, שימוש בזיכרון, ספריית נתונים              |
| **בריאות הספק**     | מצב מפסק זרם לכל ספק (סגור/פתוח/חצי פתוח)                  |
| **מגבלות תעריפים**  | צינון מגבלת תעריף פעיל לכל חשבון עם הזמן שנותר             |
| **נעילות אקטיביות** | ספקים חסומים זמנית על ידי מדיניות הנעילה                   |
| **מטמון חתימה**     | סטטיסטיקת מטמון מניעת כפילויות (מפתחות פעילים, קצב כניסות) |
| **טלמטריית אחזור**  | צבירת זמן אחזור p50/p95/p99 לכל ספק                        |

**טיפ מקצועי:** דף הבריאות מתרענן אוטומטית כל 10 שניות. השתמש בכרטיס המפסק כדי לזהות אילו ספקים נתקלים בבעיות.
