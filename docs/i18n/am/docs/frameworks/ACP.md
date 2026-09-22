# ACP (Agent Client Protocol) (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **በአጭሩ**: ACP OmniRoute HTTP APIዎችን ከመጠቀም ይልቅ CLI ወኪሎችን (እንደ Claude Code፣ Codex) እንደ ንዑስ ሂደቶች እንዲያስጀምር ያስችለዋል። ይህ የ"CLI-as-backend" ማጓጓዣን ይሰጥዎታል።

---

## ACP ምንድን ነው?

ACP (Agent Client Protocol) ለOmniRoute የሚያገለግል **የ"CLI-as-backend" ማጓጓዣ** ነው። ወደ AI አቅራቢዎች የሚደረጉ HTTP API ጥሪዎችን ከመጥለፍ ይልቅ፣ ACP **CLI ወኪሎችን እንደ ንዑስ ሂደቶች ያስጀምራል** እና ጥያቄዎችን በእያንዳንዳቸው ቤተኛ በይነገጽ በኩል ያስተላልፋል።

### ACPን ለምን ይጠቀሙ?

| ጥቅም                  | መግለጫ                                 |
| -------------------- | ------------------------------------ |
| **API ቁልፎች አያስፈልጉም** | ነባሩን የCLI ማረጋገጫዎን ይጠቀማል              |
| **ቤተኛ ፕሮቶኮል**        | የእያንዳንዱን CLI ቤተኛ የግቤት/ውጤት ቅርጸት ይጠቀማል |
| **ራስ-ሰር ፍለጋ**        | በስርዓትዎ ላይ የተጫኑ CLIዎችን ይለያል           |
| **15 አብሮገነብ ወኪሎች**   | ለታዋቂ CLI መሣሪያዎች አስቀድሞ የተዋቀረ          |
| **ብጁ ወኪሎች**          | በቅንብሮች በኩል የራስዎን CLI መሣሪያዎች ያክሉ      |
| **የሂደት አስተዳደር**      | የሂወት ዑደቱን (ማስጀመር፣ መላክ፣ ማቋረጥ) ያስተዳድራል |

---

## የሚደገፉ CLI ወኪሎች

ACP በነባሪ **15 አብሮገነብ CLI ወኪሎችን** ይደግፋል፦

| የወኪል ID       | የማሳያ ስም            | ሁለትዮሽ ፋይል     | ፕሮቶኮል |
| ------------- | ------------------ | ------------- | ----- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio |
| `claude`      | Claude Code CLI    | `claude`      | stdio |
| `goose`       | Goose CLI          | `goose`       | stdio |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio |
| `aider`       | Aider              | `aider`       | stdio |
| `opencode`    | OpenCode           | `opencode`    | stdio |
| `cline`       | Cline              | `cline`       | stdio |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio |
| `forge`       | ForgeCode          | `forge`       | stdio |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio |
| `interpreter` | Open Interpreter   | `interpreter` | stdio |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio |
| `warp`        | Warp AI            | `warp`        | stdio |
| `gemini`      | Gemini CLI         | `gemini`      | stdio |
| `zcode`       | ZCode              | `zcode`       | stdio |

### ብጁ ወኪሎች

በቅንብሮች በኩል የራስዎን CLI ወኪሎች ማከል ይችላሉ። ብጁ ወኪሎች ከአብሮገነብ ወኪሎች ጋር ተመሳሳይ ባህሪያትን ይደግፋሉ።

---

## ፈጣን ጅምር

### ደረጃ 1፦ CLI ወኪል ይጫኑ

```bash
# ምሳሌ፦ Claude Code CLIን ይጫኑ
npm install -g @anthropic-ai/claude-code

# መጫኑን ያረጋግጡ
claude --version
```

### ደረጃ 2፦ የACP ራስ-ሰር ማወቂያ

ACP በስርዓትዎ ላይ የተጫኑ CLI ወኪሎችን በራስ-ሰር ይለያል። ምንም ውቅር አያስፈልግም!

### ደረጃ 3፦ የACP ማጓጓዣን ይጠቀሙ

አንዴ ከተለየ፣ ACP ለማንኛውም የሚደገፍ አቅራቢ እንደ ማጓጓዣ መጠቀም ይቻላል። CLIው በሚገኝበት ጊዜ OmniRoute ACPን በራስ-ሰር ይጠቀማል።

---

## ACP እንዴት ይሰራል?

### አወቃቀር

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP ተኪ)     │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  ንዑስ ሂደት     │
│  (CLI ወኪል)    │
│                 │
│  stdin  ◄──────┤  ጥያቄ ይላኩ
│  stdout ──────►│  ምላሽ ይቀበሉ
│  stderr ──────►│  ስህተቶችን ይቀበሉ
└─────────────────┘
```

### የሂደት የሂወት ዑደት

1. **ማስጀመር** — ACP ለCLI ወኪሉ ንዑስ ሂደት ይፈጥራል
2. **መላክ** — ACP ጥያቄዎችን ወደ ሂደቱ stdin ይጽፋል
3. **መቀበል** — ACP ምላሾችን ከstdout/stderr ያነባል
4. **የስራ ፈት ሁኔታ ማወቂያ** — ACP ምላሹ እንደተጠናቀቀ ከመቁጠሩ በፊት ለ2 ሰከንዶች ምንም እንቅስቃሴ እንዳይኖር ይጠብቃል
5. **ማቋረጥ** — ACP ሂደቱን ያቋርጣል (SIGTERM፣ ከዚያም ከ5s በኋላ SIGKILL)

### የግንኙነት ፕሮቶኮል

ACP ከCLI ወኪሎች ጋር ለመገናኘት **stdio** (መደበኛ ግቤት/ውጤት) ይጠቀማል። ፕሮቶኮሉ የሚከተለው ነው፦

1. **ጥያቄ መላክ** — ከአዲስ መስመር ጋር ወደ stdin ይጻፉ
2. **ምላሽ መጠበቅ** — እስኪያርፍ ድረስ ከstdout ያንብቡ (ለ2s ምንም ውጤት ካልኖረ)
3. **የጊዜ ገደብ** — ነባሪው 120 ሰከንዶች ነው (ሊዋቀር ይችላል)

---

## የAPI ማጣቀሻ

### የመዝገብ ተግባራት

#### `detectInstalledAgents()`

በስርዓቱ ላይ የተጫኑትን ሁሉንም የCLI ወኪሎች ይለያል። ውጤቶቹ ለ60 ሰከንዶች በመሸጎጫ ውስጥ ይቀመጣሉ።

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// የሚመልሰው፦ CliAgentInfo[]

interface CliAgentInfo {
  id: string; // ለምሳሌ፣ "codex", "claude"
  name: string; // የማሳያ ስም
  binary: string; // የሚጀመረው የባይነሪ ስም
  versionCommand: string; // የስሪት ማወቂያ ትዕዛዝ
  version: string | null; // የተገኘው ስሪት (ካልተጫነ null)
  installed: boolean; // ወኪሉ መጫኑን ወይም አለመጫኑን
  providerAlias: string; // በOmniRoute ውስጥ ያለው የአቅራቢ መለያ
  spawnArgs: string[]; // ሲጀመር የሚተላለፉ ነጋሪ እሴቶች
  protocol: "stdio" | "http"; // የግንኙነት ፕሮቶኮል
  isCustom?: boolean; // ይህ በተጠቃሚው የተገለጸ ብጁ ወኪል መሆኑን ወይም አለመሆኑን
}
```

#### `getAvailableAgents()`

የተጫኑና ለACP ዝግጁ የሆኑትን ወኪሎች ብቻ ያገኛል።

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// የሚመልሰው፦ CliAgentInfo[] (የተጫኑ ወኪሎችን ብቻ)
```

#### `getAgentById(id)`

አንድን የተወሰነ ወኪል በመለያው ያገኛል።

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// የሚመልሰው፦ CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

ከቅንብሮች የተገኙ የብጁ ወኪል መግለጫዎችን ያዘጋጃል።

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

### የአስተዳዳሪ ተግባራት

#### `acpManager.spawn(agentId, binary, args, env)`

አዲስ የCLI ወኪል ሂደት ይጀምራል።

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* ብጁ የአካባቢ ተለዋዋጮች */
});
// የሚመልሰው፦ AcpSession
```

**የተፈቀዱ የወኪል መለያዎች**፦ `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

ወደ CLI ወኪል ጥያቄ ይልካል እና ምላሹን ይሰበስባል።

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // የ2 ደቂቃ የጊዜ ገደብ
);
// የሚመልሰው፦ Promise<string>
```

#### `acpManager.kill(sessionId)`

ክፍለ ጊዜን ያቋርጣል እና ያጸዳል።

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// የሚመልሰው፦ boolean
```

#### `acpManager.getActiveSessions()`

ሁሉንም ንቁ ክፍለ ጊዜዎች ያገኛል።

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// የሚመልሰው፦ AcpSession[]
```

#### `acpManager.killAll()`

ሁሉንም ክፍለ ጊዜዎች ያቋርጣል።

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### የክፍለ ጊዜ በይነገጽ

```typescript
interface AcpSession {
  id: string; // ልዩ የክፍለ ጊዜ መለያ
  agentId: string; // የወኪል መለያ (ለምሳሌ፣ "claude")
  process: ChildProcess; // የንዑስ ሂደት መያዣ
  alive: boolean; // ሂደቱ ንቁ መሆኑን ወይም አለመሆኑን
  stdoutBuffer: string; // የተጠራቀመ stdout ቋት
  stderrBuffer: string; // የተጠራቀመ stderr ቋት
  createdAt: Date; // የተፈጠረበት የጊዜ ማህተም
}
```

### ክስተቶች

`AcpManager` `EventEmitter`ን ያስፋፋል እና የሚከተሉትን ክስተቶች ያሰራጫል፦

#### `stdout`

የCLI ወኪሉ ወደ stdout ሲጽፍ ይሰራጫል።

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

የCLI ወኪሉ ወደ stderr ሲጽፍ ይሰራጫል።

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

የCLI ወኪሉ ሂደት ሲወጣ ይሰራጫል።

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

በCLI ወኪሉ ሂደት ላይ ስህተት ሲከሰት ይሰራጫል።

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## ውቅር

### የአካባቢ ተለዋዋጮች

ACP ሁሉንም የአካባቢ ተለዋዋጮች ከወላጅ ሂደቱ ይወርሳል፣ እንዲሁም በብጁ የአካባቢ ተለዋዋጮች ሊስፋፋ ይችላል፦

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### የማስጀመሪያ ነጋሪ እሴቶች

እያንዳንዱ ወኪል በመዝገቡ ውስጥ የተገለጹ ነባሪ የማስጀመሪያ ነጋሪ እሴቶች አሉት። እነዚህን መተካት ይችላሉ፦

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### የጊዜ ገደቦች

ነባሪው የጥያቄ ጊዜ ገደብ **120 ሰከንዶች** (2 ደቂቃዎች) ነው። ይህን መተካት ይችላሉ፦

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 ደቂቃዎች
```

### የማግኛ መሸጎጫ

ውድ የፋይል ስርዓት ፍተሻዎችን ለማስቀረት የወኪል ማግኘት ለ**60 ሰከንዶች** በመሸጎጫ ይቀመጣል። በግድ ለማደስ፦

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## ደህንነት

### የትዕዛዝ ማስገባት ጥቃት መከላከል

ACP የትዕዛዝ ማስገባት ጥቃቶችን ለመከላከል የስሪት ትዕዛዞችን ያረጋግጣል፦

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

እነዚህን ቁምፊዎች የያዙ የስሪት ትዕዛዞች ውድቅ ይደረጋሉ፦

- `;` — የትዕዛዝ መለያ
- `&` — የበስተጀርባ ሂደት
- `|` — ቧንቧ
- `<`, `>` — አቅጣጫ መቀየር
- `` ` `` — የትዕዛዝ መተካት
- `$` — የተለዋዋጭ ማስፋፋት
- `\r`, `\n` — የመስመር መጨረሻዎች

### የሁለትዮሽ ፋይል ስም ማረጋገጥ

ACP የስሪት ትዕዛዙ ሁለትዮሽ ፋይል ከሚጠበቀው የሁለትዮሽ ፋይል ስም ጋር እንደሚዛመድ ያረጋግጣል (ብጁ ወኪል ካልሆነ በስተቀር)።

### የሂደት ማግለል

እያንዳንዱ የACP ክፍለ ጊዜ በራሱ ንዑስ ሂደት ውስጥ ይሠራል። ክፍለ ጊዜው ሲያበቃ ወይም የጊዜ ገደቡ ሲያልፍ ሂደቱ ይቋረጣል።

---

## አፈጻጸም

### የማግኛ አፈጻጸም

- **የመጀመሪያ ጥሪ**፦ ~50-200ms (ለእያንዳንዱ ወኪል `version` ትዕዛዝን ያስኬዳል)
- **በመሸጎጫ የተቀመጡ ጥሪዎች**፦ <1ms (ከመሸጎጫው ይመልሳል)
- **የመሸጎጫ TTL**፦ 60 ሰከንዶች

### የጥያቄ አፈጻጸም

- **ማስጀመር**፦ ~50-100ms
- **ጥያቄ መላክ**፦ ~10-50ms
- **ምላሽ መጠበቅ**፦ በCLI ወኪሉ ላይ ይመሰረታል (በተለምዶ 1-30 ሰከንዶች)
- **ማቋረጥ**፦ ~5 ሰከንዶች (SIGTERM) + ወዲያውኑ (SIGKILL)

### የሀብት አጠቃቀም

- **በእያንዳንዱ ክፍለ ጊዜ የማህደረ ትውስታ አጠቃቀም**፦ ~10-50MB (በCLI ወኪሉ ላይ ይመሰረታል)
- **CPU**፦ አነስተኛ (በI/O የተገደበ)
- **ዲስክ**፦ ምንም

---

## መላ መፈለግ

### "Unknown agent" ስህተት

**ችግር**፦ `acpManager.spawn()` `Unknown agent: <id>` የሚል ስህተት ይጥላል

**መፍትሔ**፦ በ`spawn()` ውስጥ የተፈቀዱት እነዚህ ወኪሎች ብቻ ናቸው፦

- `claude`
- `codex`
- `gemini`
- `qwen`

ሌሎች ወኪሎች በእጅ ወይም በብጁ የወኪል መግለጫዎች አማካኝነት መጀመር አለባቸው።

### "Session not alive" ስህተት

**ችግር**፦ `acpManager.sendPrompt()` `Session ${sessionId} is not alive` የሚል ስህተት ይጥላል

**መፍትሔ**፦ ክፍለ ጊዜው ወጥቶ ወይም ተቋርጦ ሊሆን ይችላል። የክፍለ ጊዜውን ሁኔታ ይፈትሹ፦

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // ክፍለ ጊዜውን እንደገና ያስጀምሩ
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" ስህተት

**ችግር**፦ `acpManager.sendPrompt()` `ACP timeout after 120000ms` የሚል ስህተት ይጥላል

**መፍትሔ**፦ የጊዜ ገደቡን ይጨምሩ፦

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 ደቂቃዎች
```

### CLI አልተገኘም

**ችግር**፦ `detectInstalledAgents()` የእርስዎን CLI አያገኝም

**መፍትሔዎች**፦

1. **PATHን ይፈትሹ**፦ CLIው በስርዓትዎ PATH ውስጥ መኖሩን ያረጋግጡ
2. **የስሪት ትዕዛዙን ይፈትሹ**፦ `claude --version`ን በእጅ ያስኪዱ
3. **ፈቃዶችን ይፈትሹ**፦ CLIው ሊተገበር የሚችል መሆኑን ያረጋግጡ
4. **ብጁ ወኪል**፦ መደበኛ ላልሆኑ CLIዎች ብጁ የወኪል መግለጫ ያክሉ

### ፈቃድ ተከልክሏል

**ችግር**፦ ACP CLIውን ማስኬድ አይችልም

**መፍትሔዎች**፦

1. **የፋይል ፈቃዶችን ይፈትሹ**፦ `chmod +x /usr/local/bin/claude`
2. **ባለቤትነትን ይፈትሹ**፦ OmniRoute የማንበብ/የማስኬድ ፈቃዶች እንዳሉት ያረጋግጡ
3. **SELinux/AppArmorን ይፈትሹ**፦ የሂደት ማስጀመርን ሊያግድ ይችላል

---

## ምሳሌዎች

### ምሳሌ 1፦ Claude Codeን ማስጀመር እና መጠቀም

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// የተጫኑ ወኪሎችን ፈልግ
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // አዲስ ክፍለ ጊዜ አስጀምር
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // ጥያቄ ላክ
  const response = await acpManager.sendPrompt(session.id, "ኳንተም ኮምፒውቲንግን በ100 ቃላት አብራራ");

  console.log("የClaude ምላሽ፦", response);

  // ሀብቶችን አጽዳ
  acpManager.kill(session.id);
}
```

### ምሳሌ 2፦ ምትክ ያለው ራስ-ሰር ፍለጋ

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// በመጀመሪያ Claudeን ሞክር፣ ካልተገኘ Codexን እንደ ምትክ ተጠቀም
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("ከACP ጋር ተኳሃኝ የሆነ CLI ወኪል አልተገኘም");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "ሰላም!");

acpManager.kill(session.id);
```

### ምሳሌ 3፦ ብጁ ወኪል

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// ብጁ CLI ወኪል መዝግብ
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

// አሁን detectInstalledAgents() "my-llm-cli"ን ያካትታል
const agents = detectInstalledAgents();
```

---

## ቀጥሎ ምን አለ?

- **[የAPI ማጣቀሻ](../reference/API_REFERENCE.md)** — የREST API መዳረሻ ነጥቦች
- **[የአቅራቢዎች ማጣቀሻ](../reference/PROVIDER_REFERENCE.md)** — ሁሉም 352 አቅራቢዎች
- **[MCP አገልጋይ](./MCP-SERVER.md)** — የModel Context Protocol ውህደት
- **[A2A አገልጋይ](./A2A-SERVER.md)** — ከወኪል-ወደ-ወኪል ፕሮቶኮል
- **[የደመና ወኪል](./CLOUD_AGENT.md)** — በደመና ላይ የተመሠረቱ ወኪሎች

---

## ማጣቀሻ

- [AionUi ፕሮጀክት](https://github.com/iOfficeAI/AionUi) — ለACP ራስ-ሰር ፍለጋ የመነሻ ሐሳብ
- [የACP ምንጭ ኮድ](../../src/lib/acp/) — የትግበራ ዝርዝሮች
  - `manager.ts` — የሂደት የሕይወት ዑደት አስተዳደር
  - `registry.ts` — የወኪል ፍለጋ እና ምዝገባ
  - `index.ts` — ይፋዊ የAPI ወደ ውጭ ማውጫዎች
