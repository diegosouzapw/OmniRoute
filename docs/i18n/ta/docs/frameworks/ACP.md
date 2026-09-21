# ACP (Agent Client Protocol) (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: HTTP API-களைப் பயன்படுத்துவதற்குப் பதிலாக, CLI முகவர்களை (Claude Code, Codex போன்றவை) துணைச் செயல்முறைகளாகத் தொடங்க ACP, OmniRoute-ஐ அனுமதிக்கிறது. இது உங்களுக்கு "CLI-as-backend" பரிமாற்ற முறையை வழங்குகிறது.

---

## ACP என்றால் என்ன?

ACP (Agent Client Protocol) என்பது OmniRoute-க்கான **"CLI-as-backend" பரிமாற்ற முறை** ஆகும். AI வழங்குநர்களுக்கான HTTP API அழைப்புகளை இடைமறிப்பதற்குப் பதிலாக, ACP **CLI முகவர்களைத் துணைச் செயல்முறைகளாகத் தொடங்கி**, அவற்றின் இயல்பான இடைமுகம் வழியாகத் தூண்டுதல்களை வழங்குகிறது.

### ACP-ஐ ஏன் பயன்படுத்த வேண்டும்?

| நன்மை                      | விளக்கம்                                                                |
| -------------------------- | ----------------------------------------------------------------------- |
| **API விசைகள் தேவையில்லை** | ஏற்கெனவே உள்ள உங்கள் CLI அங்கீகாரத்தைப் பயன்படுத்துகிறது                |
| **இயல்பான நெறிமுறை**       | ஒவ்வொரு CLI-யின் இயல்பான உள்ளீடு/வெளியீட்டு வடிவத்தைப் பயன்படுத்துகிறது |
| **தானியங்குக் கண்டறிதல்**  | உங்கள் கணினியில் நிறுவப்பட்டுள்ள CLI-களைக் கண்டறிகிறது                  |
| **உள்ளமைந்த 15 முகவர்கள்** | பிரபலமான CLI கருவிகளுக்காக முன்கூட்டியே கட்டமைக்கப்பட்டுள்ளது           |
| **தனிப்பயன் முகவர்கள்**    | அமைப்புகள் வழியாக உங்கள் சொந்த CLI கருவிகளைச் சேர்க்கலாம்               |
| **செயல்முறை மேலாண்மை**     | வாழ்நாள் சுழற்சியைக் கையாளுகிறது (தொடங்குதல், அனுப்புதல், நிறுத்துதல்)  |

---

## ஆதரிக்கப்படும் CLI முகவர்கள்

ACP, இயல்பாகவே **உள்ளமைந்த 15 CLI முகவர்களை** ஆதரிக்கிறது:

| முகவர் ID     | காட்சிப் பெயர்     | இருமக் கோப்பு | நெறிமுறை |
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

### தனிப்பயன் முகவர்கள்

அமைப்புகள் வழியாக உங்கள் சொந்த CLI முகவர்களைச் சேர்க்கலாம். உள்ளமைந்த முகவர்கள் வழங்கும் அதே அம்சங்களைத் தனிப்பயன் முகவர்களும் ஆதரிக்கின்றன.

---

## விரைவான தொடக்கம்

### படி 1: ஒரு CLI முகவரை நிறுவவும்

```bash
# எடுத்துக்காட்டு: Claude Code CLI-ஐ நிறுவவும்
npm install -g @anthropic-ai/claude-code

# நிறுவலைச் சரிபார்க்கவும்
claude --version
```

### படி 2: ACP தானியங்குக் கண்டறிதல்

உங்கள் கணினியில் நிறுவப்பட்டுள்ள CLI முகவர்களை ACP தானாகவே கண்டறிகிறது. எந்தக் கட்டமைப்பும் தேவையில்லை!

### படி 3: ACP பரிமாற்ற முறையைப் பயன்படுத்தவும்

கண்டறியப்பட்டதும், ஆதரிக்கப்படும் எந்த வழங்குநருக்கும் ACP-ஐ ஒரு பரிமாற்ற முறையாகப் பயன்படுத்தலாம். CLI கிடைக்கும்போது OmniRoute தானாகவே ACP-ஐப் பயன்படுத்தும்.

---

## ACP எவ்வாறு செயல்படுகிறது

### கட்டமைப்பு

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP பதிலி)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  துணைச்         │
│  செயல்முறை      │
│  (CLI முகவர்)   │
│                 │
│  stdin  ◄──────┤  தூண்டுதலை அனுப்புதல்
│  stdout ──────►│  பதிலைப் பெறுதல்
│  stderr ──────►│  பிழைகளைப் பெறுதல்
└─────────────────┘
```

### செயல்முறை வாழ்நாள் சுழற்சி

1. **தொடங்குதல்** — CLI முகவருக்காக ACP ஒரு துணைச் செயல்முறையை உருவாக்குகிறது
2. **அனுப்புதல்** — செயல்முறையின் stdin-க்கு ACP தூண்டுதல்களை எழுதுகிறது
3. **பெறுதல்** — stdout/stderr-லிருந்து ACP பதில்களைப் படிக்கிறது
4. **செயலற்றநிலைக் கண்டறிதல்** — பதில் நிறைவடைந்ததாகக் கருதுவதற்கு முன், 2 வினாடிகள் செயல்பாடின்றி இருப்பதற்காக ACP காத்திருக்கிறது
5. **நிறுத்துதல்** — ACP செயல்முறையை முடிக்கிறது (SIGTERM, பின்னர் 5s-க்குப் பிறகு SIGKILL)

### தொடர்பு நெறிமுறை

CLI முகவர்களுடன் தொடர்புகொள்ள ACP **stdio**-ஐ (நிலையான உள்ளீடு/வெளியீடு) பயன்படுத்துகிறது. நெறிமுறை பின்வருமாறு:

1. **தூண்டுதலை அனுப்புதல்** — ஒரு புதிய வரியுடன் stdin-க்கு எழுதுதல்
2. **பதிலுக்காகக் காத்திருத்தல்** — செயலற்ற நிலை ஏற்படும் வரை stdout-லிருந்து படித்தல் (2s நேரத்திற்கு வெளியீடு இல்லை)
3. **காலக்கெடு** — இயல்புநிலையாக 120 வினாடிகள் (கட்டமைக்கக்கூடியது)

---

## API குறிப்பு

### பதிவகச் செயல்பாடுகள்

#### `detectInstalledAgents()`

கணினியில் நிறுவப்பட்டுள்ள அனைத்து CLI முகவர்களையும் கண்டறிகிறது. முடிவுகள் 60 வினாடிகளுக்குத் தற்காலிகமாகச் சேமிக்கப்படும்.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// வழங்குவது: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // எ.கா., "codex", "claude"
  name: string; // காட்சிப் பெயர்
  binary: string; // தொடங்க வேண்டிய பைனரியின் பெயர்
  versionCommand: string; // பதிப்பைக் கண்டறியும் கட்டளை
  version: string | null; // கண்டறியப்பட்ட பதிப்பு (நிறுவப்படவில்லை என்றால் null)
  installed: boolean; // முகவர் நிறுவப்பட்டுள்ளாரா
  providerAlias: string; // OmniRoute-இல் உள்ள வழங்குநர் ID
  spawnArgs: string[]; // தொடங்கும்போது அனுப்ப வேண்டிய அளவுருக்கள்
  protocol: "stdio" | "http"; // தொடர்பு நெறிமுறை
  isCustom?: boolean; // இது பயனர் வரையறுத்த தனிப்பயன் முகவரா
}
```

#### `getAvailableAgents()`

நிறுவப்பட்டு ACP-க்குக் கிடைக்கக்கூடிய முகவர்களை மட்டும் பெறுகிறது.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// வழங்குவது: CliAgentInfo[] (நிறுவப்பட்ட முகவர்கள் மட்டும்)
```

#### `getAgentById(id)`

ID மூலம் ஒரு குறிப்பிட்ட முகவரைப் பெறுகிறது.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// வழங்குவது: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

அமைப்புகளிலிருந்து தனிப்பயன் முகவர் வரையறைகளை அமைக்கிறது.

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

### மேலாளர் செயல்பாடுகள்

#### `acpManager.spawn(agentId, binary, args, env)`

புதிய CLI முகவர் செயல்முறையைத் தொடங்குகிறது.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* தனிப்பயன் சூழல் மாறிகள் */
});
// வழங்குவது: AcpSession
```

**அனுமதிக்கப்பட்ட முகவர் ID-கள்**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

CLI முகவருக்கு ஓர் அறிவுறுத்தலை அனுப்பி, அதன் பதிலைச் சேகரிக்கிறது.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 நிமிட காலக்கெடு
);
// வழங்குவது: Promise<string>
```

#### `acpManager.kill(sessionId)`

ஒரு அமர்வை நிறுத்தி, அதனுடன் தொடர்புடைய வளங்களைச் சுத்தம் செய்கிறது.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// வழங்குவது: boolean
```

#### `acpManager.getActiveSessions()`

செயலில் உள்ள அனைத்து அமர்வுகளையும் பெறுகிறது.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// வழங்குவது: AcpSession[]
```

#### `acpManager.killAll()`

அனைத்து அமர்வுகளையும் நிறுத்துகிறது.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### அமர்வு இடைமுகம்

```typescript
interface AcpSession {
  id: string; // தனித்துவமான அமர்வு ID
  agentId: string; // முகவர் ID (எ.கா., "claude")
  process: ChildProcess; // துணைச் செயல்முறைக் கைப்பிடி
  alive: boolean; // செயல்முறை உயிர்ப்புடன் உள்ளதா
  stdoutBuffer: string; // திரட்டப்பட்ட stdout இடையகம்
  stderrBuffer: string; // திரட்டப்பட்ட stderr இடையகம்
  createdAt: Date; // உருவாக்கப்பட்ட நேரமுத்திரை
}
```

### நிகழ்வுகள்

`AcpManager` ஆனது `EventEmitter`-ஐ நீட்டித்து, பின்வரும் நிகழ்வுகளை வெளியிடுகிறது:

#### `stdout`

CLI முகவர் stdout-க்கு எழுதும்போது வெளியிடப்படுகிறது.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI முகவர் stderr-க்கு எழுதும்போது வெளியிடப்படுகிறது.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI முகவர் செயல்முறை முடிவடையும்போது வெளியிடப்படுகிறது.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI முகவர் செயல்முறையில் பிழை ஏற்படும்போது வெளியிடப்படுகிறது.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## உள்ளமைவு

### சூழல் மாறிகள்

ACP, பெற்றோர் செயல்முறையிலிருந்து அனைத்து சூழல் மாறிகளையும் மரபுரிமையாகப் பெறுகிறது; மேலும் தனிப்பயன் சூழல் மாறிகளைக் கொண்டு நீட்டிக்கப்படலாம்:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### செயல்முறை தொடக்க அளவுருக்கள்

ஒவ்வொரு முகவருக்கும் பதிவகத்தில் வரையறுக்கப்பட்ட இயல்புநிலை செயல்முறை தொடக்க அளவுருக்கள் உள்ளன. அவற்றை நீங்கள் மேலெழுதலாம்:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### காலக்கெடுக்கள்

இயல்புநிலை தூண்டல் காலக்கெடு **120 வினாடிகள்** (2 நிமிடங்கள்). இதை நீங்கள் மேலெழுதலாம்:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 நிமிடங்கள்
```

### கண்டறிதல் தற்காலிகச் சேமிப்பு

அதிகச் செலவுடைய கோப்பு முறைமை வருடல்களைத் தவிர்க்க, முகவர் கண்டறிதல் **60 வினாடிகளுக்குத்** தற்காலிகமாகச் சேமிக்கப்படுகிறது. கட்டாயமாகப் புதுப்பிக்க:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## பாதுகாப்பு

### கட்டளை உட்செலுத்தல் தடுப்பு

கட்டளை உட்செலுத்தல் தாக்குதல்களைத் தடுக்க ACP பதிப்புக் கட்டளைகளைச் சரிபார்க்கிறது:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

இந்த எழுத்துகளைக் கொண்ட பதிப்புக் கட்டளைகள் நிராகரிக்கப்படுகின்றன:

- `;` — கட்டளை பிரிப்பான்
- `&` — பின்னணிச் செயல்முறை
- `|` — குழாய்
- `<`, `>` — திசைமாற்றம்
- `` ` `` — கட்டளை பதிலீடு
- `$` — மாறி விரிவாக்கம்
- `\r`, `\n` — வரி முறிவுகள்

### இருமக் கோப்பு பெயர் சரிபார்ப்பு

பதிப்புக் கட்டளையின் இருமக் கோப்பு பெயர் எதிர்பார்க்கப்படும் இருமக் கோப்பு பெயருடன் பொருந்துகிறதா என்பதை ACP சரிபார்க்கிறது (அது தனிப்பயன் முகவராக இல்லாவிட்டால்).

### செயல்முறைத் தனிமைப்படுத்தல்

ஒவ்வொரு ACP அமர்வும் அதற்கெனத் தனியான சேய்ச் செயல்முறையில் இயங்குகிறது. அமர்வு முடிவடையும்போது அல்லது காலக்கெடுவை எட்டும்போது செயல்முறை நிறுத்தப்படுகிறது.

---

## செயல்திறன்

### கண்டறிதல் செயல்திறன்

- **முதல் அழைப்பு**: ~50-200ms (ஒவ்வொரு முகவருக்கும் `version` கட்டளையை இயக்குகிறது)
- **தற்காலிகச் சேமிப்பிலுள்ள அழைப்புகள்**: <1ms (தற்காலிகச் சேமிப்பிலிருந்து வழங்குகிறது)
- **தற்காலிகச் சேமிப்பு TTL**: 60 வினாடிகள்

### தூண்டல் செயல்திறன்

- **செயல்முறை தொடக்கம்**: ~50-100ms
- **தூண்டலை அனுப்புதல்**: ~10-50ms
- **பதிலுக்காகக் காத்திருத்தல்**: CLI முகவரைப் பொறுத்தது (பொதுவாக 1-30 வினாடிகள்)
- **நிறுத்துதல்**: ~5 வினாடிகள் (SIGTERM) + உடனடி (SIGKILL)

### வளப் பயன்பாடு

- **ஒவ்வொரு அமர்வுக்குமான நினைவகம்**: ~10-50MB (CLI முகவரைப் பொறுத்தது)
- **CPU**: மிகக் குறைவு (I/O சார்ந்தது)
- **வட்டு**: எதுவுமில்லை

---

## சிக்கல் தீர்த்தல்

### "Unknown agent" பிழை

**சிக்கல்**: `acpManager.spawn()` ஆனது `Unknown agent: <id>` என்பதை எறிகிறது

**தீர்வு**: `spawn()` இல் இந்த முகவர்கள் மட்டுமே அனுமதிக்கப்படுகின்றனர்:

- `claude`
- `codex`
- `gemini`
- `qwen`

மற்ற முகவர்கள் கைமுறையாகவோ அல்லது தனிப்பயன் முகவர் வரையறைகள் வழியாகவோ தொடங்கப்பட வேண்டும்.

### "Session not alive" பிழை

**சிக்கல்**: `acpManager.sendPrompt()` ஆனது `Session ${sessionId} is not alive` என்பதை எறிகிறது

**தீர்வு**: அமர்வு வெளியேறியிருக்கலாம் அல்லது நிறுத்தப்பட்டிருக்கலாம். அமர்வின் நிலையைச் சரிபார்க்கவும்:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // அமர்வை மீண்டும் தொடங்கவும்
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" பிழை

**சிக்கல்**: `acpManager.sendPrompt()` ஆனது `ACP timeout after 120000ms` என்பதை எறிகிறது

**தீர்வு**: காலக்கெடுவை அதிகரிக்கவும்:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 நிமிடங்கள்
```

### CLI கண்டறியப்படவில்லை

**சிக்கல்**: `detectInstalledAgents()` உங்கள் CLI-ஐக் கண்டறியவில்லை

**தீர்வுகள்**:

1. **PATH-ஐச் சரிபார்க்கவும்**: CLI உங்கள் கணினியின் PATH-இல் இருப்பதை உறுதிசெய்யவும்
2. **பதிப்புக் கட்டளையைச் சரிபார்க்கவும்**: `claude --version` என்பதை கைமுறையாக இயக்கவும்
3. **அனுமதிகளைச் சரிபார்க்கவும்**: CLI இயக்கத்தக்கதாக இருப்பதை உறுதிசெய்யவும்
4. **தனிப்பயன் முகவர்**: தரநிலையற்ற CLI-களுக்கு ஒரு தனிப்பயன் முகவர் வரையறையைச் சேர்க்கவும்

### அனுமதி மறுக்கப்பட்டது

**சிக்கல்**: ACP-ஆல் CLI-ஐ இயக்க முடியவில்லை

**தீர்வுகள்**:

1. **கோப்பு அனுமதிகளைச் சரிபார்க்கவும்**: `chmod +x /usr/local/bin/claude`
2. **உரிமையைச் சரிபார்க்கவும்**: OmniRoute-க்கு வாசிக்க/இயக்குவதற்கான அனுமதிகள் இருப்பதை உறுதிசெய்யவும்
3. **SELinux/AppArmor-ஐச் சரிபார்க்கவும்**: செயல்முறை தொடக்கத்தை இவை தடுக்கக்கூடும்

---

## எடுத்துக்காட்டுகள்

### எடுத்துக்காட்டு 1: Claude Code-ஐத் தொடங்கி பயன்படுத்துதல்

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// நிறுவப்பட்ட முகவர்களைக் கண்டறியவும்
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // புதிய அமர்வைத் தொடங்கவும்
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // ஒரு அறிவுறுத்தலை அனுப்பவும்
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // பயன்படுத்திய வளங்களை விடுவிக்கவும்
  acpManager.kill(session.id);
}
```

### எடுத்துக்காட்டு 2: மாற்று ஏற்பாட்டுடன் தானியங்கு கண்டறிதல்

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// முதலில் Claude-ஐ முயற்சிக்கவும்; அது கிடைக்காவிட்டால் Codex-ஐப் பயன்படுத்தவும்
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

### எடுத்துக்காட்டு 3: தனிப்பயன் முகவர்

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// தனிப்பயன் CLI முகவரைப் பதிவுசெய்யவும்
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

// இப்போது detectInstalledAgents() "my-llm-cli"-ஐ உள்ளடக்கும்
const agents = detectInstalledAgents();
```

---

## அடுத்து என்ன?

- **[API குறிப்பு](../reference/API_REFERENCE.md)** — REST API முனைப்புள்ளிகள்
- **[வழங்குநர் குறிப்பு](../reference/PROVIDER_REFERENCE.md)** — அனைத்து 352 வழங்குநர்களும்
- **[MCP சேவையகம்](./MCP-SERVER.md)** — Model Context Protocol ஒருங்கிணைப்பு
- **[A2A சேவையகம்](./A2A-SERVER.md)** — முகவர்களுக்கிடையேயான நெறிமுறை
- **[Cloud முகவர்](./CLOUD_AGENT.md)** — Cloud-அடிப்படையிலான முகவர்கள்

---

## குறிப்பு

- [AionUi திட்டம்](https://github.com/iOfficeAI/AionUi) — ACP தானியங்கு கண்டறிதலுக்கான உத்வேகம்
- [ACP மூலக் குறியீடு](../../src/lib/acp/) — செயலாக்க விவரங்கள்
  - `manager.ts` — செயல்முறை வாழ்நாள் சுழற்சி மேலாண்மை
  - `registry.ts` — முகவர் கண்டறிதல் மற்றும் பதிவு
  - `index.ts` — பொது API ஏற்றுமதிகள்
