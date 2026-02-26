# הפניה ל-API

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

הפניה מלאה עבור כל נקודות הקצה של OmniRoute API.

---

## תוכן העניינים

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Image Generation](#image-generation)
- [List Models](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Semantic Cache](#semantic-cache)
- [Dashboard & Management](#dashboard--management)
- [Request Processing](#request-processing)
- [Authentication](#authentication)

---

## השלמות של צ'אט

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### כותרות מותאמות אישית

| כותרת                    | כיוון | תיאור                             |
| ------------------------ | ----- | --------------------------------- |
| `X-OmniRoute-No-Cache`   | בקשה  | הגדר ל-`true` כדי לעקוף את המטמון |
| `X-OmniRoute-Progress`   | בקשה  | הגדר ל-`true` עבור אירועי התקדמות |
| `Idempotency-Key`        | בקשה  | מפתח Dedup (חלון 5 שניות)         |
| `X-Request-Id`           | בקשה  | מפתח ניקוי חלופי                  |
| `X-OmniRoute-Cache`      | תגובה | `HIT` או `MISS` (לא סטרימינג)     |
| `X-OmniRoute-Idempotent` | תגובה | `true` אם ביטול כפילות            |
| `X-OmniRoute-Progress`   | תגובה | `enabled` אם מעקב ההתקדמות ב-     |

---

## הטבעות

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

ספקים זמינים: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## יצירת תמונה

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

ספקים זמינים: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## רשימת דגמים

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## נקודות קצה של תאימות

| שיטה | נתיב                        | פורמט             |
| ---- | --------------------------- | ----------------- |
| פוסט | `/v1/chat/completions`      | OpenAI            |
| פוסט | `/v1/messages`              | אנתרופית          |
| פוסט | `/v1/responses`             | OpenAI תגובות     |
| פוסט | `/v1/embeddings`            | OpenAI            |
| פוסט | `/v1/images/generations`    | OpenAI            |
| קבל  | `/v1/models`                | OpenAI            |
| פוסט | `/v1/messages/count_tokens` | אנתרופית          |
| קבל  | `/v1beta/models`            | מזל תאומים        |
| פוסט | `/v1beta/models/{...path}`  | תאומים ליצור תוכן |
| פוסט | `/v1/api/chat`              | אולמה             |

### מסלולי ספקים ייעודיים

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

קידומת הספק מתווספת אוטומטית אם חסרה. דגמים לא תואמים מחזירים `400`.

---

## מטמון סמנטי

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

דוגמה לתגובה:

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## לוח מחוונים וניהול

### אימות

| נקודת קצה                     | שיטה    | תיאור             |
| ----------------------------- | ------- | ----------------- |
| `/api/auth/login`             | פוסט    | כניסה             |
| `/api/auth/logout`            | פוסט    | התנתק             |
| `/api/settings/require-login` | GET/PUT | החלפת כניסה נדרשת |

### ניהול ספקים

| נקודת קצה                    | שיטה           | תיאור               |
| ---------------------------- | -------------- | ------------------- |
| `/api/providers`             | קבל/פוסט       | רשימת / צור ספקים   |
| `/api/providers/[id]`        | GET/PUT/DELETE | ניהול ספק           |
| `/api/providers/[id]/test`   | פוסט           | בדיקת חיבור ספק     |
| `/api/providers/[id]/models` | קבל            | רשימת דגמי ספקים    |
| `/api/providers/validate`    | פוסט           | אימות תצורת ספק     |
| `/api/provider-nodes*`       | שונים          | ניהול צומת ספק      |
| `/api/provider-models`       | קבל/פרסם/מחק   | דגמים מותאמים אישית |

### OAuth Flows

| נקודת קצה                        | שיטה  | תיאור             |
| -------------------------------- | ----- | ----------------- |
| `/api/oauth/[provider]/[action]` | שונים | OAuth ספציפי לספק |

### ניתוב ותצורה

| נקודת קצה             | שיטה     | תיאור                   |
| --------------------- | -------- | ----------------------- |
| `/api/models/alias`   | קבל/פוסט | כינויי מודל             |
| `/api/models/catalog` | קבל      | כל הדגמים לפי ספק + סוג |
| `/api/combos*`        | שונים    | ניהול קומבו             |
| `/api/keys*`          | שונים    | ניהול מפתחות API        |
| `/api/pricing`        | קבל      | תמחור דגם               |

### שימוש וניתוח

| נקודת קצה                   | שיטה | תיאור             |
| --------------------------- | ---- | ----------------- |
| `/api/usage/history`        | קבל  | היסטוריית שימוש   |
| `/api/usage/logs`           | קבל  | יומני שימוש       |
| `/api/usage/request-logs`   | קבל  | יומנים ברמת הבקשה |
| `/api/usage/[connectionId]` | קבל  | שימוש לכל חיבור   |

### הגדרות

| נקודת קצה                       | שיטה    | תיאור                       |
| ------------------------------- | ------- | --------------------------- |
| `/api/settings`                 | GET/PUT | הגדרות כלליות               |
| `/api/settings/proxy`           | GET/PUT | תצורת proxy של רשת          |
| `/api/settings/proxy/test`      | פוסט    | בדיקת חיבור פרוקסי          |
| `/api/settings/ip-filter`       | GET/PUT | רשימת הרשאות IP/רשימת חסימה |
| `/api/settings/thinking-budget` | GET/PUT | תקציב סמלי מנמק             |
| `/api/settings/system-prompt`   | GET/PUT | הודעת מערכת גלובלית         |

### ניטור

| נקודת קצה                | שיטה    | תיאור                  |
| ------------------------ | ------- | ---------------------- |
| `/api/sessions`          | קבל     | מעקב הפעלה פעיל        |
| `/api/rate-limits`       | קבל     | מגבלות תעריף לחשבון    |
| `/api/monitoring/health` | קבל     | בדיקת בריאות           |
| `/api/cache`             | קבל/מחק | סטטיסטיקות מטמון / נקה |

### גיבוי וייצוא/ייבוא

| נקודת קצה                   | שיטה | תיאור                                  |
| --------------------------- | ---- | -------------------------------------- |
| `/api/db-backups`           | קבל  | רשימת גיבויים זמינים                   |
| `/api/db-backups`           | PUT  | צור גיבוי ידני                         |
| `/api/db-backups`           | פוסט | שחזור מגיבוי ספציפי                    |
| `/api/db-backups/export`    | קבל  | הורד את מסד הנתונים כקובץ sqlite       |
| `/api/db-backups/import`    | פוסט | העלה קובץ sqlite כדי להחליף מסד נתונים |
| `/api/db-backups/exportAll` | קבל  | הורד גיבוי מלא כארכיון .tar.gz         |

### סנכרון ענן

| נקודת קצה              | שיטה  | תיאור              |
| ---------------------- | ----- | ------------------ |
| `/api/sync/cloud`      | שונים | פעולות סנכרון בענן |
| `/api/sync/initialize` | פוסט  | אתחול סנכרון       |
| `/api/cloud/*`         | שונים | ניהול ענן          |

### כלי CLI

| נקודת קצה                          | שיטה | תיאור                |
| ---------------------------------- | ---- | -------------------- |
| `/api/cli-tools/claude-settings`   | קבל  | סטטוס קלוד CLI       |
| `/api/cli-tools/codex-settings`    | קבל  | מצב Codex CLI        |
| `/api/cli-tools/droid-settings`    | קבל  | סטטוס CLI של Droid   |
| `/api/cli-tools/openclaw-settings` | קבל  | מצב CLI של OpenClaw  |
| `/api/cli-tools/runtime/[toolId]`  | קבל  | זמן ריצה כללי של CLI |

תגובות CLI כוללות: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### מגבלות חוסן וקצב

| נקודת קצה               | שיטה    | תיאור                       |
| ----------------------- | ------- | --------------------------- |
| `/api/resilience`       | GET/PUT | קבל/עדכן פרופילי חוסן       |
| `/api/resilience/reset` | פוסט    | איפוס מפסקים                |
| `/api/rate-limits`      | קבל     | סטטוס מגבלת תעריף לכל חשבון |
| `/api/rate-limit`       | קבל     | תצורת מגבלת תעריף גלובלית   |

### איוואלים

| נקודת קצה    | שיטה     | תיאור                          |
| ------------ | -------- | ------------------------------ |
| `/api/evals` | קבל/פוסט | רשימת חבילות eval / הפעל הערכה |

### מדיניות

| נקודת קצה       | שיטה         | תיאור             |
| --------------- | ------------ | ----------------- |
| `/api/policies` | קבל/פרסם/מחק | נהל מדיניות ניתוב |

### תאימות

| נקודת קצה                   | שיטה | תיאור                      |
| --------------------------- | ---- | -------------------------- |
| `/api/compliance/audit-log` | קבל  | יומן ביקורת ציות (N אחרון) |

### v1beta (תואם לתאומים)

| נקודת קצה                  | שיטה | תיאור                              |
| -------------------------- | ---- | ---------------------------------- |
| `/v1beta/models`           | קבל  | רשימת דגמים בפורמט תאומים          |
| `/v1beta/models/{...path}` | פוסט | תאומים `generateContent` נקודת קצה |

נקודות קצה אלו משקפות את פורמט ה-API של Gemini עבור לקוחות המצפים לתאימות מקורית של Gemini SDK.

### ממשקי API פנימיים/מערכתיים

| נקודת קצה       | שיטה | תיאור                                         |
| --------------- | ---- | --------------------------------------------- |
| `/api/init`     | קבל  | בדיקת אתחול האפליקציה (בשימוש בהפעלה הראשונה) |
| `/api/tags`     | קבל  | תגיות מודל תואמות אולמה (ללקוחות אולמה)       |
| `/api/restart`  | פוסט | הפעל מחדש את השרת החינני                      |
| `/api/shutdown` | פוסט | הפעל כיבוי שרת חינני                          |

> **הערה:** נקודות קצה אלו משמשות באופן פנימי על ידי המערכת או עבור תאימות לקוח Ollama. הם לא נקראים בדרך כלל על ידי משתמשי קצה.

---

## תמלול אודיו

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

תמלול קבצי אודיו באמצעות Deepgram או AssemblyAI.

**בקשה:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**תגובה:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**ספקים נתמכים:** `deepgram/nova-3`, `assemblyai/best`.

**פורמטים נתמכים:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## תאימות אולמה

עבור לקוחות המשתמשים בפורמט ה-API של Ollama:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

בקשות מתורגמות אוטומטית בין אולמה לפורמטים פנימיים.

---

## טלמטריה

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**תגובה:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## תקציב

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
```

---

## זמינות דגם

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## עיבוד הבקשה

1. הלקוח שולח בקשה אל `/v1/*`
2. מטפל במסלול קורא `handleChat`, `handleEmbedding`, `handleAudioTranscription`, או `handleImageGeneration`
3. המודל נפתר (ספק ישיר/דגם או כינוי/שילוב)
4. אישורים נבחרים מ-DB מקומי עם סינון זמינות חשבון
5. לצ'אט: `handleChatCore` — זיהוי פורמט, תרגום, בדיקת מטמון, בדיקת אימפוטנציה
6. מנהל הספק שולח בקשה במעלה הזרם
7. תגובה מתורגמת חזרה לפורמט הלקוח (צ'אט) או הוחזרה כפי שהיא (הטמעות/תמונות/שמע)
8. שימוש/רישום נרשם
9. Fallback חל על שגיאות בהתאם לכללי המשולבים

הפניה מלאה לארכיטקטורה: [link](ARCHITECTURE.md)

---

## אימות

- מסלולי לוח המחוונים (`/dashboard/*`) משתמשים בקובץ cookie `auth_token`
- הכניסה משתמשת ב-hash סיסמה שמורה; חזרה ל-`INITIAL_PASSWORD`
- `requireLogin` ניתן להחלפה באמצעות `/api/settings/require-login`
- מסלולי `/v1/*` דורשים אופציונלי מפתח API של Bearer כאשר `REQUIRE_API_KEY=true`
