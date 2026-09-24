# ACP (Agent Client Protocol) (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **කෙටියෙන්**: HTTP API භාවිත කරනවා වෙනුවට, ACP මඟින් OmniRoute හට CLI නියෝජිතයන් (Claude Code, Codex වැනි) උප ක්රියාවලි ලෙස ආරම්භ කිරීමට ඉඩ ලබා දෙයි. මෙය ඔබට "පසුබිම් සේවාවක් ලෙස CLI" ප්රවාහනයක් ලබා දෙයි.

---

## ACP යනු කුමක්ද?

ACP (Agent Client Protocol) යනු OmniRoute සඳහා වන **"පසුබිම් සේවාවක් ලෙස CLI" ප්රවාහනයකි**. AI සැපයුම්කරුවන් වෙත යවන HTTP API ඇමතුම් අතරමඟ ග්රහණය කරගැනීම වෙනුවට, ACP විසින් **CLI නියෝජිතයන් උප ක්රියාවලි ලෙස ආරම්භ කර**, ඔවුන්ගේ ස්වදේශීය අතුරුමුහුණත හරහා ප්රේරක ලබා දෙයි.

### ACP භාවිත කළ යුත්තේ ඇයි?

| ප්රතිලාභය                    | විස්තරය                                                 |
| ---------------------------- | ------------------------------------------------------- |
| **API යතුරු අවශ්ය නොවේ**     | ඔබගේ පවතින CLI සත්යාපනය භාවිත කරයි                      |
| **ස්වදේශීය ප්රොටෝකෝලය**      | එක් එක් CLI හි ස්වදේශීය ආදාන/ප්රතිදාන ආකෘතිය භාවිත කරයි |
| **ස්වයංක්රීය සොයාගැනීම**     | ඔබගේ පද්ධතියේ ස්ථාපනය කර ඇති CLI හඳුනාගනී               |
| **අන්තර්ගත නියෝජිතයන් 15ක්** | ජනප්රිය CLI මෙවලම් සඳහා පෙර-වින්යාස කර ඇත               |
| **අභිරුචි නියෝජිතයන්**       | සැකසුම් හරහා ඔබගේම CLI මෙවලම් එක් කරන්න                 |
| **ක්රියාවලි කළමනාකරණය**      | ජීවන චක්රය (ආරම්භ කිරීම, යැවීම, අවසන් කිරීම) හසුරුවයි   |

---

## සහාය දක්වන CLI නියෝජිතයන්

ACP පෙරනිමියෙන්ම **අන්තර්ගත CLI නියෝජිතයන් 15කට** සහාය දක්වයි:

| නියෝජිත ID    | දර්ශන නාමය         | ද්විමය ගොනුව  | ප්රොටෝකෝලය |
| ------------- | ------------------ | ------------- | ---------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio      |
| `claude`      | Claude Code CLI    | `claude`      | stdio      |
| `goose`       | Goose CLI          | `goose`       | stdio      |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio      |
| `aider`       | Aider              | `aider`       | stdio      |
| `opencode`    | OpenCode           | `opencode`    | stdio      |
| `cline`       | Cline              | `cline`       | stdio      |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio      |
| `forge`       | ForgeCode          | `forge`       | stdio      |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio      |
| `interpreter` | Open Interpreter   | `interpreter` | stdio      |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio      |
| `warp`        | Warp AI            | `warp`        | stdio      |
| `gemini`      | Gemini CLI         | `gemini`      | stdio      |
| `zcode`       | ZCode              | `zcode`       | stdio      |

### අභිරුචි නියෝජිතයන්

සැකසුම් හරහා ඔබගේම CLI නියෝජිතයන් එක් කළ හැක. අභිරුචි නියෝජිතයන්, අන්තර්ගත නියෝජිතයන්ට සමාන විශේෂාංග සඳහා සහාය දක්වයි.

---

## ඉක්මන් ආරම්භය

### පියවර 1: CLI නියෝජිතයෙකු ස්ථාපනය කරන්න

```bash
# උදාහරණය: Claude Code CLI ස්ථාපනය කරන්න
npm install -g @anthropic-ai/claude-code

# ස්ථාපනය තහවුරු කරන්න
claude --version
```

### පියවර 2: ACP ස්වයංක්රීය හඳුනාගැනීම

ACP විසින් ඔබගේ පද්ධතියේ ස්ථාපනය කර ඇති CLI නියෝජිතයන් ස්වයංක්රීයව හඳුනාගනී. කිසිදු වින්යාසයක් අවශ්ය නොවේ!

### පියවර 3: ACP ප්රවාහනය භාවිත කරන්න

හඳුනාගැනීමෙන් පසු, සහාය දක්වන ඕනෑම සැපයුම්කරුවෙකු සඳහා ACP ප්රවාහනයක් ලෙස භාවිත කළ හැක. CLI එක ලබා ගත හැකි විට OmniRoute විසින් ස්වයංක්රීයව ACP භාවිත කරනු ඇත.

---

## ACP ක්රියා කරන ආකාරය

### නිර්මාණ ශිල්පය

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP ප්රොක්සිය) │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  උප ක්රියාවලිය    │
│  (CLI නියෝජිතයා)  │
│                 │
│  stdin  ◄──────┤  ප්රේරකය යවන්න
│  stdout ──────►│  ප්රතිචාරය ලබාගන්න
│  stderr ──────►│  දෝෂ ලබාගන්න
└─────────────────┘
```

### ක්රියාවලි ජීවන චක්රය

1. **ආරම්භ කිරීම** — ACP විසින් CLI නියෝජිතයා සඳහා උප ක්රියාවලියක් නිර්මාණය කරයි
2. **යැවීම** — ACP විසින් ප්රේරක ක්රියාවලියේ stdin වෙත ලියයි
3. **ලබාගැනීම** — ACP විසින් stdout/stderr වෙතින් ප්රතිචාර කියවයි
4. **නිෂ්ක්රීයතාව හඳුනාගැනීම** — ප්රතිචාරය සම්පූර්ණ බව සැලකීමට පෙර ACP තත්පර 2ක නිෂ්ක්රීයතාවක් සඳහා රැඳී සිටියි
5. **අවසන් කිරීම** — ACP විසින් ක්රියාවලිය අවසන් කරයි (SIGTERM, ඉන්පසු තත්පර 5කට පසු SIGKILL)

### සන්නිවේදන ප්රොටෝකෝලය

CLI නියෝජිතයන් සමඟ සන්නිවේදනය සඳහා ACP විසින් **stdio** (සම්මත ආදානය/ප්රතිදානය) භාවිත කරයි. ප්රොටෝකෝලය මෙසේය:

1. **ප්රේරකය යැවීම** — නව පේළියක් සමඟ stdin වෙත ලියන්න
2. **ප්රතිචාරය සඳහා රැඳී සිටීම** — නිෂ්ක්රීය වන තෙක් stdout වෙතින් කියවන්න (තත්පර 2ක් කිසිදු ප්රතිදානයක් නොමැති වීම)
3. **කාලසීමාව ඉක්මවීම** — පෙරනිමියෙන් තත්පර 120කි (වින්යාස කළ හැක)

---

## API යොමුව

### රෙජිස්ට්රි ශ්රිත

#### `detectInstalledAgents()`

පද්ධතියේ ස්ථාපනය කර ඇති සියලුම CLI නියෝජිතයන් හඳුනා ගනී. ප්රතිඵල තත්පර 60ක් සඳහා හැඹිලිගත කෙරේ.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// ආපසු ලබා දෙන්නේ: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // උදා., "codex", "claude"
  name: string; // දර්ශන නාමය
  binary: string; // ආරම්භ කළ යුතු ද්විමය ගොනුවේ නම
  versionCommand: string; // අනුවාදය හඳුනාගැනීමේ විධානය
  version: string | null; // හඳුනාගත් අනුවාදය (ස්ථාපනය කර නොමැති නම් null)
  installed: boolean; // නියෝජිතයා ස්ථාපනය කර තිබේද යන්න
  providerAlias: string; // OmniRoute තුළ සැපයුම්කරුගේ ID
  spawnArgs: string[]; // ආරම්භ කිරීමේදී යැවිය යුතු විස්තාරක
  protocol: "stdio" | "http"; // සන්නිවේදන ප්රොටෝකෝලය
  isCustom?: boolean; // මෙය පරිශීලකයා නිර්වචනය කළ අභිරුචි නියෝජිතයෙක්ද යන්න
}
```

#### `getAvailableAgents()`

ස්ථාපනය කර ඇති සහ ACP සඳහා ලබාගත හැකි නියෝජිතයන් පමණක් ලබා ගනී.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// ආපසු ලබා දෙන්නේ: CliAgentInfo[] (ස්ථාපනය කර ඇති නියෝජිතයන් පමණි)
```

#### `getAgentById(id)`

ID අනුව නිශ්චිත නියෝජිතයෙකු ලබා ගනී.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// ආපසු ලබා දෙන්නේ: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

සැකසුම්වලින් අභිරුචි නියෝජිත නිර්වචන සකසයි.

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

### කළමනාකරුගේ ශ්රිත

#### `acpManager.spawn(agentId, binary, args, env)`

නව CLI නියෝජිත ක්රියාවලියක් ආරම්භ කරයි.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* අභිරුචි පරිසර විචල්ය */
});
// ආපසු ලබා දෙන්නේ: AcpSession
```

**අවසර ලත් නියෝජිත ID**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

CLI නියෝජිතයෙකුට ප්රේරකයක් යවා ප්රතිචාරය රැස් කරයි.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // මිනිත්තු 2ක කල් ඉකුත්වීමේ කාලය
);
// ආපසු ලබා දෙන්නේ: Promise<string>
```

#### `acpManager.kill(sessionId)`

සැසියක් අවසන් කර පිරිසිදු කරයි.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// ආපසු ලබා දෙන්නේ: boolean
```

#### `acpManager.getActiveSessions()`

සියලුම සක්රිය සැසි ලබා ගනී.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// ආපසු ලබා දෙන්නේ: AcpSession[]
```

#### `acpManager.killAll()`

සියලුම සැසි අවසන් කරයි.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### සැසි අතුරුමුහුණත

```typescript
interface AcpSession {
  id: string; // අනන්ය සැසි ID
  agentId: string; // නියෝජිත ID (උදා., "claude")
  process: ChildProcess; // උප ක්රියාවලි හසුරුව
  alive: boolean; // ක්රියාවලිය සක්රියද යන්න
  stdoutBuffer: string; // සමුච්චිත stdout බෆරය
  stderrBuffer: string; // සමුච්චිත stderr බෆරය
  createdAt: Date; // නිර්මාණය කළ කාල මුද්රාව
}
```

### සිදුවීම්

`AcpManager`, `EventEmitter` විස්තාරණය කරන අතර පහත සිදුවීම් නිකුත් කරයි:

#### `stdout`

CLI නියෝජිතයා stdout වෙත ලියන විට නිකුත් කෙරේ.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI නියෝජිතයා stderr වෙත ලියන විට නිකුත් කෙරේ.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI නියෝජිත ක්රියාවලිය අවසන් වන විට නිකුත් කෙරේ.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI නියෝජිත ක්රියාවලියේ දෝෂයක් ඇති වන විට නිකුත් කෙරේ.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## වින්යාසය

### පරිසර විචල්ය

ACP මව් ක්රියාවලියෙන් සියලුම පරිසර විචල්ය උරුම කරගන්නා අතර අභිරුචි පරිසර විචල්ය සමඟ පුළුල් කළ හැක:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### ක්රියාවලිය ආරම්භ කිරීමේ තර්ක

සෑම නියෝජිතයෙකු සඳහාම පෙරනිමි ක්රියාවලිය ආරම්භ කිරීමේ තර්ක රෙජිස්ට්රියේ අර්ථ දක්වා ඇත. ඔබට ඒවා අතික්රමණය කළ හැක:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### කාලසීමා

පෙරනිමි ප්රේරක කාලසීමාව **තත්පර 120** (මිනිත්තු 2) කි. ඔබට එය අතික්රමණය කළ හැක:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // මිනිත්තු 5
```

### අනාවරණ හැඹිලිය

අධික පිරිවැයක් ඇති ගොනු පද්ධති පරිලෝකන වැළැක්වීම සඳහා නියෝජිත අනාවරණය **තත්පර 60** ක් හැඹිලිගත කෙරේ. බලහත්කාරයෙන් නැවුම් කිරීමට:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## ආරක්ෂාව

### විධාන ඇතුළු කිරීමේ ප්රහාර වැළැක්වීම

විධාන ඇතුළු කිරීමේ ප්රහාර වැළැක්වීම සඳහා ACP අනුවාද විධාන වලංගු කරයි:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

මෙම අක්ෂර අඩංගු අනුවාද විධාන ප්රතික්ෂේප කෙරේ:

- `;` — විධාන වෙන්කාරකය
- `&` — පසුබිම් ක්රියාවලිය
- `|` — නළය
- `<`, `>` — ප්රතියොමු කිරීම
- `` ` `` — විධාන ආදේශනය
- `$` — විචල්ය ප්රසාරණය
- `\r`, `\n` — පේළි බිඳීම්

### ද්විමය නාම වලංගුකරණය

අභිරුචි නියෝජිතයෙකු නොවේ නම්, අනුවාද විධානයේ ද්විමය නාමය අපේක්ෂිත ද්විමය නාමයට ගැළපෙන බව ACP වලංගු කරයි.

### ක්රියාවලි හුදකලා කිරීම

සෑම ACP සැසියක්ම තමන්ගේම ළමා ක්රියාවලියක ධාවනය වේ. සැසිය අවසන් වූ විට හෝ කාලසීමාව ඉක්මවූ විට ක්රියාවලිය නවත්වනු ලැබේ.

---

## කාර්යසාධනය

### අනාවරණ කාර්යසාධනය

- **පළමු කැඳවීම**: ~50-200ms (සෑම නියෝජිතයෙකු සඳහාම `version` විධානය ධාවනය කරයි)
- **හැඹිලිගත කැඳවීම්**: <1ms (හැඹිලියෙන් ආපසු ලබා දෙයි)
- **හැඹිලි TTL**: තත්පර 60

### ප්රේරක කාර්යසාධනය

- **ක්රියාවලිය ආරම්භ කිරීම**: ~50-100ms
- **ප්රේරකය යැවීම**: ~10-50ms
- **ප්රතිචාරය සඳහා රැඳී සිටීම**: CLI නියෝජිතයා මත රඳා පවතී (සාමාන්යයෙන් තත්පර 1-30)
- **නැවැත්වීම**: ~තත්පර 5 (SIGTERM) + ක්ෂණික (SIGKILL)

### සම්පත් භාවිතය

- **සැසියකට මතකය**: ~10-50MB (CLI නියෝජිතයා මත රඳා පවතී)
- **CPU**: අවමයි (I/O මත රඳා පවතී)
- **තැටිය**: කිසිවක් නැත

---

## දෝෂ නිරාකරණය

### "Unknown agent" දෝෂය

**ගැටලුව**: `acpManager.spawn()` විසින් `Unknown agent: <id>` දෝෂය නිකුත් කරයි

**විසඳුම**: `spawn()` තුළ අවසර ඇත්තේ මෙම නියෝජිතයන්ට පමණි:

- `claude`
- `codex`
- `gemini`
- `qwen`

අනෙකුත් නියෝජිතයන් අතින් හෝ අභිරුචි නියෝජිත අර්ථ දැක්වීම් හරහා ආරම්භ කළ යුතුය.

### "Session not alive" දෝෂය

**ගැටලුව**: `acpManager.sendPrompt()` විසින් `Session ${sessionId} is not alive` දෝෂය නිකුත් කරයි

**විසඳුම**: සැසිය පිටවී හෝ නවතා තිබිය හැක. සැසියේ තත්ත්වය පරීක්ෂා කරන්න:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // සැසිය නැවත ආරම්භ කරන්න
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" දෝෂය

**ගැටලුව**: `acpManager.sendPrompt()` විසින් `ACP timeout after 120000ms` දෝෂය නිකුත් කරයි

**විසඳුම**: කාලසීමාව වැඩි කරන්න:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // මිනිත්තු 5
```

### CLI අනාවරණය නොවීම

**ගැටලුව**: `detectInstalledAgents()` හට ඔබේ CLI සොයාගත නොහැක

**විසඳුම්**:

1. **PATH පරීක්ෂා කරන්න**: CLI ඔබේ පද්ධතියේ PATH තුළ ඇති බව සහතික කරගන්න
2. **අනුවාද විධානය පරීක්ෂා කරන්න**: `claude --version` අතින් ධාවනය කරන්න
3. **අවසර පරීක්ෂා කරන්න**: CLI ක්රියාත්මක කළ හැකි බව සහතික කරගන්න
4. **අභිරුචි නියෝජිතයා**: සම්මත නොවන CLI සඳහා අභිරුචි නියෝජිත අර්ථ දැක්වීමක් එක් කරන්න

### අවසරය ප්රතික්ෂේප වීම

**ගැටලුව**: ACP හට CLI ක්රියාත්මක කළ නොහැක

**විසඳුම්**:

1. **ගොනු අවසර පරීක්ෂා කරන්න**: `chmod +x /usr/local/bin/claude`
2. **හිමිකාරිත්වය පරීක්ෂා කරන්න**: OmniRoute හට කියවීමේ/ක්රියාත්මක කිරීමේ අවසර ඇති බව සහතික කරගන්න
3. **SELinux/AppArmor පරීක්ෂා කරන්න**: ක්රියාවලි ආරම්භ කිරීම අවහිර කළ හැක

---

## උදාහරණ

### උදාහරණය 1: Claude Code ආරම්භ කර භාවිත කිරීම

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// ස්ථාපිත නියෝජිතයන් හඳුනාගන්න
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // නව සැසියක් ආරම්භ කරන්න
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // ප්රේරකයක් යවන්න
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // පිරිසිදු කරන්න
  acpManager.kill(session.id);
}
```

### උදාහරණය 2: විකල්පයක් සහිත ස්වයංක්රීය සොයාගැනීම

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// පළමුව Claude උත්සාහ කර, නොහැකි නම් Codex භාවිත කරන්න
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

### උදාහරණය 3: අභිරුචි නියෝජිතයෙක්

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// අභිරුචි CLI නියෝජිතයෙකු ලියාපදිංචි කරන්න
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

// දැන් detectInstalledAgents() තුළ "my-llm-cli" ඇතුළත් වේ
const agents = detectInstalledAgents();
```

---

## මීළඟට කුමක්ද?

- **[API යොමුව](../reference/API_REFERENCE.md)** — REST API අන්ත ලක්ෂ්ය
- **[සපයන්නන් පිළිබඳ යොමුව](../reference/PROVIDER_REFERENCE.md)** — සියලුම සපයන්නන් 352
- **[MCP සේවාදායකය](./MCP-SERVER.md)** — Model Context Protocol ඒකාබද්ධ කිරීම
- **[A2A සේවාදායකය](./A2A-SERVER.md)** — නියෝජිතයාගෙන් නියෝජිතයාට ප්රොටෝකෝලය
- **[වලාකුළු නියෝජිතයා](./CLOUD_AGENT.md)** — වලාකුළු මත පදනම් වූ නියෝජිතයන්

---

## යොමුව

- [AionUi ව්යාපෘතිය](https://github.com/iOfficeAI/AionUi) — ACP ස්වයංක්රීය හඳුනාගැනීම සඳහා ආභාසය
- [ACP මූලාශ්ර කේතය](../../src/lib/acp/) — ක්රියාත්මක කිරීමේ විස්තර
  - `manager.ts` — ක්රියාවලි ජීවන චක්ර කළමනාකරණය
  - `registry.ts` — නියෝජිතයන් සොයාගැනීම සහ ලියාපදිංචි කිරීම
  - `index.ts` — පොදු API නිර්යාත
