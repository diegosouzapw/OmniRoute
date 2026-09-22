# ACP (Agent Client Protocol) (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **בקצרה**: ACP מאפשר ל-OmniRoute להפעיל סוכני CLI (כמו Claude Code ו-Codex) כתהליכי צאצא במקום להשתמש בממשקי API מסוג HTTP. כך מתקבלת תעבורה מסוג "CLI כצד אחורי".

---

## מהו ACP?

ACP (פרוטוקול לקוח לסוכנים) הוא תעבורה מסוג **"CLI כצד אחורי"** עבור OmniRoute. במקום ליירט קריאות HTTP API לספקי AI, ‏ACP **מפעיל סוכני CLI כתהליכי צאצא** ומעביר אליהם הנחיות דרך הממשק המקורי שלהם.

### למה להשתמש ב-ACP?

| יתרון                    | תיאור                                  |
| ------------------------ | -------------------------------------- |
| **אין צורך במפתחות API** | משתמש באימות ה-CLI הקיים שלכם          |
| **פרוטוקול מקורי**       | משתמש בפורמט הקלט/פלט המקורי של כל CLI |
| **גילוי אוטומטי**        | מזהה רכיבי CLI המותקנים במערכת שלכם    |
| **15 סוכנים מובנים**     | מוגדרים מראש עבור כלי CLI פופולריים    |
| **סוכנים מותאמים אישית** | מאפשר להוסיף כלי CLI משלכם דרך ההגדרות |
| **ניהול תהליכים**        | מטפל במחזור החיים (הפעלה, שליחה וסיום) |

---

## סוכני CLI נתמכים

ACP תומך ב-**15 סוכני CLI מובנים** היישר מהקופסה:

| מזהה סוכן     | שם לתצוגה          | קובץ הפעלה    | פרוטוקול |
| ------------- | ------------------ | ------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio    |
| `claude`      | Claude Code CLI    | `claude`      | stdio    |
| `goose`       | Goose CLI          | `goose`       | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio    |
| `aider`       | Aider              | `aider`       | stdio    |
| `opencode`    | OpenCode           | `opencode`    | stdio    |
| `cline`       | Cline              | `cline`       | stdio    |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio    |
| `forge`       | ForgeCode          | `forge`       | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio    |
| `interpreter` | Open Interpreter   | `interpreter` | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio    |
| `warp`        | Warp AI            | `warp`        | stdio    |
| `gemini`      | Gemini CLI         | `gemini`      | stdio    |
| `zcode`       | ZCode              | `zcode`       | stdio    |

### סוכנים מותאמים אישית

ניתן להוסיף סוכני CLI משלכם דרך ההגדרות. סוכנים מותאמים אישית תומכים באותן יכולות כמו הסוכנים המובנים.

---

## התחלה מהירה

### שלב 1: התקנת סוכן CLI

```bash
# דוגמה: התקנת Claude Code CLI
npm install -g @anthropic-ai/claude-code

# אימות ההתקנה
claude --version
```

### שלב 2: זיהוי אוטומטי של ACP

‏ACP מזהה אוטומטית סוכני CLI המותקנים במערכת שלכם. אין צורך בהגדרה!

### שלב 3: שימוש בתעבורת ACP

לאחר הזיהוי, ניתן להשתמש ב-ACP כתעבורה עבור כל ספק נתמך. OmniRoute ישתמש אוטומטית ב-ACP כאשר ה-CLI זמין.

---

## כיצד ACP פועל

### ארכיטקטורה

```
┌─────────────────┐
│  OmniRoute      │
│  (מתווך HTTP)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  תהליך צאצא     │
│  (סוכן CLI)     │
│                 │
│  stdin  ◄──────┤  שליחת הנחיה
│  stdout ──────►│  קבלת תגובה
│  stderr ──────►│  קבלת שגיאות
└─────────────────┘
```

### מחזור חיי התהליך

1. **הפעלה** — ACP יוצר תהליך צאצא עבור סוכן ה-CLI
2. **שליחה** — ACP כותב הנחיות ל-stdin של התהליך
3. **קבלה** — ACP קורא תגובות מ-stdout ומ-stderr
4. **זיהוי חוסר פעילות** — ACP ממתין ל-2 שניות של חוסר פעילות לפני שהוא מחשיב את התגובה כהושלמה
5. **סיום** — ACP מסיים את התהליך (SIGTERM, ולאחר מכן SIGKILL כעבור 5 שניות)

### פרוטוקול תקשורת

‏ACP משתמש ב-**stdio** (קלט/פלט סטנדרטי) לתקשורת עם סוכני CLI. הפרוטוקול הוא:

1. **שליחת הנחיה** — כתיבה ל-stdin עם שורה חדשה
2. **המתנה לתגובה** — קריאה מ-stdout עד לחוסר פעילות (2 שניות ללא פלט)
3. **זמן קצוב** — ברירת המחדל היא 120 שניות (ניתן להגדרה)

---

## תיעוד API

### פונקציות הרישום

#### `detectInstalledAgents()`

מזהה את כל סוכני ה-CLI המותקנים במערכת. התוצאות נשמרות במטמון למשך 60 שניות.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// מחזיר: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // לדוגמה, "codex", "claude"
  name: string; // שם תצוגה
  binary: string; // שם הקובץ הבינארי להפעלה
  versionCommand: string; // פקודה לזיהוי הגרסה
  version: string | null; // הגרסה שזוהתה (null אם אינו מותקן)
  installed: boolean; // האם הסוכן מותקן
  providerAlias: string; // מזהה הספק ב-OmniRoute
  spawnArgs: string[]; // ארגומנטים להעברה בעת ההפעלה
  protocol: "stdio" | "http"; // פרוטוקול תקשורת
  isCustom?: boolean; // האם זהו סוכן מותאם אישית שהוגדר על ידי המשתמש
}
```

#### `getAvailableAgents()`

מחזירה רק את הסוכנים המותקנים והזמינים עבור ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// מחזיר: CliAgentInfo[] (סוכנים מותקנים בלבד)
```

#### `getAgentById(id)`

מחזירה סוכן מסוים לפי מזהה.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// מחזיר: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

מגדירה הגדרות של סוכנים מותאמים אישית מתוך ההגדרות.

```typescript
import { setCustomAgents } from "@/lib/acp";

setCustomAgents([
  {
    id: "my-custom-cli",
    name: "My Custom CLI",
    binary: "mycli",
    versionCommand: "mycli --version",
    providerAlias: "my-provider",
    spawnArgs: [],
    protocol: "stdio",
  },
]);
```

### פונקציות המנהל

#### `acpManager.spawn(agentId, binary, args, env)`

מפעילה תהליך חדש של סוכן CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* משתני סביבה מותאמים אישית */
});
// מחזיר: AcpSession
```

**מזהי סוכנים מותרים**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

שולחת הנחיה לסוכן CLI ואוספת את התגובה.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // זמן קצוב של 2 דקות
);
// מחזיר: Promise<string>
```

#### `acpManager.kill(sessionId)`

מפסיקה הפעלה ומבצעת ניקוי.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// מחזיר: boolean
```

#### `acpManager.getActiveSessions()`

מחזירה את כל ההפעלות הפעילות.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// מחזיר: AcpSession[]
```

#### `acpManager.killAll()`

מפסיקה את כל ההפעלות.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### ממשק ההפעלה

```typescript
interface AcpSession {
  id: string; // מזהה הפעלה ייחודי
  agentId: string; // מזהה הסוכן (לדוגמה, "claude")
  process: ChildProcess; // מצביע לתהליך צאצא
  alive: boolean; // האם התהליך פעיל
  stdoutBuffer: string; // מאגר stdout מצטבר
  stderrBuffer: string; // מאגר stderr מצטבר
  createdAt: Date; // חותמת הזמן של היצירה
}
```

### אירועים

ה-`AcpManager` מרחיב את `EventEmitter` ופולט את האירועים הבאים:

#### `stdout`

נפלט כאשר סוכן ה-CLI כותב ל-stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

נפלט כאשר סוכן ה-CLI כותב ל-stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

נפלט כאשר תהליך סוכן ה-CLI מסתיים.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

נפלט כאשר מתרחשת שגיאה בתהליך סוכן ה-CLI.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## תצורה

### משתני סביבה

ACP יורש את כל משתני הסביבה מתהליך האב, וניתן להרחיב אותו באמצעות משתני סביבה מותאמים אישית:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### ארגומנטים להפעלה

לכל סוכן יש ארגומנטים להפעלה המוגדרים כברירת מחדל ברישום. ניתן לדרוס אותם:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### פסקי זמן

ברירת המחדל לפסק הזמן של הנחיה היא **120 שניות** (2 דקות). ניתן לדרוס אותה:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 דקות
```

### מטמון זיהוי

זיהוי סוכנים נשמר במטמון למשך **60 שניות** כדי להימנע מסריקות יקרות של מערכת הקבצים. כדי לאלץ רענון:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## אבטחה

### מניעת הזרקת פקודות

ACP מאמת פקודות גרסה כדי למנוע מתקפות הזרקת פקודות:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

פקודות גרסה המכילות את התווים הבאים נדחות:

- `;` — מפריד פקודות
- `&` — תהליך רקע
- `|` — צינור
- `<`, `>` — ניתוב מחדש
- `` ` `` — החלפת פקודה
- `$` — הרחבת משתנה
- `\r`, `\n` — מעברי שורה

### אימות שם הקובץ הבינארי

ACP מאמת שהקובץ הבינארי בפקודת הגרסה תואם לשם הקובץ הבינארי הצפוי (אלא אם מדובר בסוכן מותאם אישית).

### בידוד תהליכים

כל הפעלת ACP רצה בתהליך בן נפרד משלה. התהליך מופסק כאשר ההפעלה מסתיימת או כאשר פג הזמן שהוקצב לה.

---

## ביצועים

### ביצועי זיהוי

- **קריאה ראשונה**: ~50-200ms (מריצה פקודת `version` עבור כל סוכן)
- **קריאות מהמטמון**: <1ms (מוחזרות מהמטמון)
- **TTL של המטמון**: 60 שניות

### ביצועי הנחיות

- **הפעלה**: ~50-100ms
- **שליחת הנחיה**: ~10-50ms
- **המתנה לתגובה**: תלויה בסוכן CLI (בדרך כלל 1-30 שניות)
- **הפסקה**: ~5 שניות (SIGTERM) + מיידית (SIGKILL)

### שימוש במשאבים

- **זיכרון לכל הפעלה**: ~10-50MB (תלוי בסוכן CLI)
- **CPU**: מינימלי (מוגבל על ידי קלט/פלט)
- **דיסק**: ללא שימוש

---

## פתרון בעיות

### שגיאת "Unknown agent"

**בעיה**: `acpManager.spawn()` זורקת `Unknown agent: <id>`

**פתרון**: רק הסוכנים הבאים מותרים ב-`spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

יש להפעיל סוכנים אחרים באופן ידני או באמצעות הגדרות של סוכנים מותאמים אישית.

### שגיאת "Session not alive"

**בעיה**: `acpManager.sendPrompt()` זורקת `Session ${sessionId} is not alive`

**פתרון**: ייתכן שההפעלה הסתיימה או הופסקה. יש לבדוק את מצב ההפעלה:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // הפעל מחדש את ההפעלה
  acpManager.spawn("claude", "claude", [], {});
}
```

### שגיאת "ACP timeout"

**בעיה**: `acpManager.sendPrompt()` זורקת `ACP timeout after 120000ms`

**פתרון**: יש להגדיל את פסק הזמן:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 דקות
```

### CLI לא זוהה

**בעיה**: `detectInstalledAgents()` לא מוצאת את ה-CLI שלך

**פתרונות**:

1. **בדיקת PATH**: יש לוודא שה-CLI נמצא ב-PATH של המערכת
2. **בדיקת פקודת הגרסה**: יש להריץ ידנית את `claude --version`
3. **בדיקת הרשאות**: יש לוודא שה-CLI ניתן להפעלה
4. **סוכן מותאם אישית**: יש להוסיף הגדרת סוכן מותאם אישית עבור ממשקי CLI לא סטנדרטיים

### ההרשאה נדחתה

**בעיה**: ACP לא יכול להפעיל את ה-CLI

**פתרונות**:

1. **בדיקת הרשאות הקובץ**: `chmod +x /usr/local/bin/claude`
2. **בדיקת בעלות**: יש לוודא של-OmniRoute יש הרשאות קריאה/הפעלה
3. **בדיקת SELinux/AppArmor**: ייתכן שהם חוסמים יצירת תהליכים

---

## דוגמאות

### דוגמה 1: הפעלה ושימוש ב-Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// זיהוי סוכנים מותקנים
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // הפעלת הפעלה חדשה
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // שליחת הנחיה
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // ניקוי
  acpManager.kill(session.id);
}
```

### דוגמה 2: גילוי אוטומטי עם חלופה

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// ניסיון להשתמש תחילה ב-Claude, עם מעבר ל-Codex כחלופה
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("No ACP-compatible CLI agent found");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Hello!");

acpManager.kill(session.id);
```

### דוגמה 3: סוכן מותאם אישית

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// רישום סוכן CLI מותאם אישית
setCustomAgents([
  {
    id: "my-llm-cli",
    name: "My LLM CLI",
    binary: "myllm",
    versionCommand: "myllm --version",
    providerAlias: "my-llm-provider",
    spawnArgs: ["--format", "json"],
    protocol: "stdio",
  },
]);

// כעת detectInstalledAgents() יכלול את "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## מה הלאה?

- **[תיעוד API](../reference/API_REFERENCE.md)** — נקודות קצה של REST API
- **[תיעוד ספקים](../reference/PROVIDER_REFERENCE.md)** — כל 352 הספקים
- **[שרת MCP](./MCP-SERVER.md)** — שילוב של Model Context Protocol
- **[שרת A2A](./A2A-SERVER.md)** — פרוטוקול Agent-to-Agent
- **[סוכן ענן](./CLOUD_AGENT.md)** — סוכנים מבוססי ענן

---

## מקורות

- [פרויקט AionUi](https://github.com/iOfficeAI/AionUi) — מקור השראה לזיהוי אוטומטי של ACP
- [קוד המקור של ACP](../../src/lib/acp/) — פרטי המימוש
  - `manager.ts` — ניהול מחזור החיים של תהליכים
  - `registry.ts` — גילוי ורישום של סוכנים
  - `index.ts` — ייצואי API ציבוריים
