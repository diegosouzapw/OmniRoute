# ACP (Agent Client Protocol) (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP ले OmniRoute लाई HTTP API प्रयोग गर्नुको सट्टा CLI एजेन्टहरू (जस्तै Claude Code, Codex) लाई child process का रूपमा सुरु गर्न दिन्छ। यसले तपाईंलाई "CLI-as-backend" transport उपलब्ध गराउँछ।

---

## ACP के हो?

ACP (Agent Client Protocol) OmniRoute का लागि **"CLI-as-backend" transport** हो। AI प्रदायकहरूतर्फ जाने HTTP API call हरू intercept गर्नुको सट्टा, ACP ले **CLI एजेन्टहरूलाई child process का रूपमा सुरु गर्छ** र तिनको native interface मार्फत prompt हरू पठाउँछ।

### ACP किन प्रयोग गर्ने?

| लाभ                    | विवरण                                                  |
| ---------------------- | ------------------------------------------------------ |
| **API key आवश्यक छैन** | तपाईंको विद्यमान CLI authentication प्रयोग गर्छ        |
| **Native protocol**    | प्रत्येक CLI को native input/output format प्रयोग गर्छ |
| **स्वतः खोजी**         | तपाईंको system मा install भएका CLI हरू पत्ता लगाउँछ    |
| **15 built-in एजेन्ट** | लोकप्रिय CLI tool हरूका लागि पूर्व-कन्फिगर गरिएको      |
| **Custom एजेन्ट**      | settings मार्फत आफ्नै CLI tool हरू थप्नुहोस्           |
| **Process व्यवस्थापन** | lifecycle (spawn, send, kill) सम्हाल्छ                 |

---

## समर्थित CLI एजेन्टहरू

ACP ले सुरुदेखि नै **15 built-in CLI एजेन्टहरू** समर्थन गर्छ:

| एजेन्ट ID     | प्रदर्शन नाम       | Binary        | Protocol |
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

### Custom एजेन्टहरू

तपाईं settings मार्फत आफ्नै CLI एजेन्टहरू थप्न सक्नुहुन्छ। Custom एजेन्टहरूले built-in एजेन्टहरूकै समान सुविधाहरू समर्थन गर्छन्।

---

## द्रुत सुरुवात

### चरण 1: CLI एजेन्ट install गर्नुहोस्

```bash
# उदाहरण: Claude Code CLI install गर्नुहोस्
npm install -g @anthropic-ai/claude-code

# Installation प्रमाणित गर्नुहोस्
claude --version
```

### चरण 2: ACP स्वतः पहिचान

ACP ले तपाईंको system मा install भएका CLI एजेन्टहरू स्वतः पत्ता लगाउँछ। कुनै configuration आवश्यक पर्दैन!

### चरण 3: ACP Transport प्रयोग गर्नुहोस्

पत्ता लागेपछि, ACP लाई कुनै पनि समर्थित provider का लागि transport का रूपमा प्रयोग गर्न सकिन्छ। CLI उपलब्ध हुँदा OmniRoute ले स्वचालित रूपमा ACP प्रयोग गर्नेछ।

---

## ACP ले कसरी काम गर्छ

### Architecture

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP Proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Child Process  │
│  (CLI Agent)    │
│                 │
│  stdin  ◄──────┤  Prompt पठाउनुहोस्
│  stdout ──────►│  Response प्राप्त गर्नुहोस्
│  stderr ──────►│  Error हरू प्राप्त गर्नुहोस्
└─────────────────┘
```

### Process Lifecycle

1. **Spawn** — ACP ले CLI एजेन्टका लागि child process सिर्जना गर्छ
2. **Send** — ACP ले process को stdin मा prompt हरू लेख्छ
3. **Receive** — ACP ले stdout/stderr बाट response हरू पढ्छ
4. **Idle Detection** — response पूरा भएको मान्नुअघि ACP ले 2 सेकेन्डको निष्क्रियता पर्खन्छ
5. **Kill** — ACP ले process अन्त्य गर्छ (SIGTERM, त्यसपछि 5s पछि SIGKILL)

### Communication Protocol

ACP ले CLI एजेन्टहरूसँग सञ्चार गर्न **stdio** (standard input/output) प्रयोग गर्छ। Protocol यस्तो छ:

1. **Prompt पठाउनुहोस्** — newline सहित stdin मा लेख्नुहोस्
2. **Response पर्खनुहोस्** — निष्क्रिय नभएसम्म stdout बाट पढ्नुहोस् (2s सम्म कुनै output नआएमा)
3. **Timeout** — पूर्वनिर्धारित 120 सेकेन्ड (configuration गर्न मिल्ने)

---

## API सन्दर्भ

### रजिस्ट्री प्रकार्यहरू

#### `detectInstalledAgents()`

प्रणालीमा स्थापना गरिएका सबै CLI एजेन्टहरू पत्ता लगाउँछ। नतिजाहरू 60 सेकेन्डका लागि क्यास गरिन्छन्।

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// फर्काउँछ: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // जस्तै, "codex", "claude"
  name: string; // प्रदर्शन नाम
  binary: string; // सुरु गर्नुपर्ने बाइनरीको नाम
  versionCommand: string; // संस्करण पत्ता लगाउने आदेश
  version: string | null; // पत्ता लगाइएको संस्करण (स्थापना नभएको खण्डमा null)
  installed: boolean; // एजेन्ट स्थापना गरिएको छ कि छैन
  providerAlias: string; // OmniRoute मा प्रदायक ID
  spawnArgs: string[]; // सुरु गर्दा पठाइने आर्गुमेन्टहरू
  protocol: "stdio" | "http"; // सञ्चार प्रोटोकल
  isCustom?: boolean; // यो प्रयोगकर्ताले परिभाषित गरेको कस्टम एजेन्ट हो कि होइन
}
```

#### `getAvailableAgents()`

स्थापना गरिएका र ACP का लागि उपलब्ध एजेन्टहरू मात्र प्राप्त गर्छ।

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// फर्काउँछ: CliAgentInfo[] (स्थापना गरिएका एजेन्टहरू मात्र)
```

#### `getAgentById(id)`

ID अनुसार कुनै निश्चित एजेन्ट प्राप्त गर्छ।

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// फर्काउँछ: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

सेटिङहरूबाट कस्टम एजेन्टका परिभाषाहरू सेट गर्छ।

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

### प्रबन्धक प्रकार्यहरू

#### `acpManager.spawn(agentId, binary, args, env)`

नयाँ CLI एजेन्ट प्रक्रिया सुरु गर्छ।

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* कस्टम वातावरणीय चरहरू */
});
// फर्काउँछ: AcpSession
```

**अनुमति दिइएका एजेन्ट ID हरू**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

CLI एजेन्टलाई प्रम्प्ट पठाउँछ र प्रतिक्रिया सङ्कलन गर्छ।

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 मिनेटको समयसीमा
);
// फर्काउँछ: Promise<string>
```

#### `acpManager.kill(sessionId)`

सेसन समाप्त गर्छ र सफाइ गर्छ।

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// फर्काउँछ: boolean
```

#### `acpManager.getActiveSessions()`

सबै सक्रिय सेसनहरू प्राप्त गर्छ।

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// फर्काउँछ: AcpSession[]
```

#### `acpManager.killAll()`

सबै सेसनहरू समाप्त गर्छ।

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### सेसन इन्टरफेस

```typescript
interface AcpSession {
  id: string; // अद्वितीय सेसन ID
  agentId: string; // एजेन्ट ID (जस्तै, "claude")
  process: ChildProcess; // चाइल्ड प्रक्रिया ह्यान्डल
  alive: boolean; // प्रक्रिया चलिरहेको छ कि छैन
  stdoutBuffer: string; // सञ्चित stdout बफर
  stderrBuffer: string; // सञ्चित stderr बफर
  createdAt: Date; // सिर्जना गरिएको समयचिह्न
}
```

### घटनाहरू

`AcpManager` ले `EventEmitter` विस्तार गर्छ र निम्न घटनाहरू उत्सर्जन गर्छ:

#### `stdout`

CLI एजेन्टले stdout मा लेख्दा उत्सर्जित हुन्छ।

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI एजेन्टले stderr मा लेख्दा उत्सर्जित हुन्छ।

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI एजेन्ट प्रक्रिया बन्द हुँदा उत्सर्जित हुन्छ।

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI एजेन्ट प्रक्रियामा त्रुटि हुँदा उत्सर्जित हुन्छ।

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## कन्फिगरेसन

### वातावरणीय भेरिएबलहरू

ACP ले प्यारेन्ट प्रक्रियाबाट सबै वातावरणीय भेरिएबलहरू इनहेरिट गर्छ र कस्टम वातावरणीय भेरिएबलहरूद्वारा विस्तार गर्न सकिन्छ:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### स्पन आर्गुमेन्टहरू

प्रत्येक एजेन्टका लागि रजिस्ट्रीमा पूर्वनिर्धारित स्पन आर्गुमेन्टहरू परिभाषित हुन्छन्। तपाईं तिनलाई ओभरराइड गर्न सक्नुहुन्छ:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### टाइमआउटहरू

पूर्वनिर्धारित प्रम्प्ट टाइमआउट **120 सेकेन्ड** (2 मिनेट) हो। तपाईं यसलाई ओभरराइड गर्न सक्नुहुन्छ:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 मिनेट
```

### डिटेक्सन क्यास

महँगो फाइलसिस्टम स्क्यानहरूबाट बच्न एजेन्ट डिटेक्सनलाई **60 सेकेन्ड**का लागि क्यास गरिन्छ। जबरजस्ती रिफ्रेस गर्न:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## सुरक्षा

### कमाण्ड इन्जेक्सन रोकथाम

कमाण्ड इन्जेक्सन आक्रमणहरू रोक्न ACP ले संस्करण कमाण्डहरू प्रमाणीकरण गर्छ:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

यी क्यारेक्टरहरू समावेश भएका संस्करण कमाण्डहरू अस्वीकार गरिन्छन्:

- `;` — कमाण्ड विभाजक
- `&` — पृष्ठभूमि प्रक्रिया
- `|` — पाइप
- `<`, `>` — रिडाइरेक्सन
- `` ` `` — कमाण्ड प्रतिस्थापन
- `$` — भेरिएबल विस्तार
- `\r`, `\n` — लाइन ब्रेकहरू

### बाइनरी नाम प्रमाणीकरण

ACP ले संस्करण कमाण्डको बाइनरी अपेक्षित बाइनरी नामसँग मेल खान्छ कि खाँदैन भनेर प्रमाणीकरण गर्छ (कस्टम एजेन्ट नभएसम्म)।

### प्रक्रिया पृथकीकरण

प्रत्येक ACP सत्र आफ्नै चाइल्ड प्रक्रियामा चल्छ। सत्र समाप्त हुँदा वा टाइमआउट हुँदा उक्त प्रक्रिया बन्द गरिन्छ।

---

## कार्यसम्पादन

### डिटेक्सन कार्यसम्पादन

- **पहिलो कल**: ~50-200ms (प्रत्येक एजेन्टका लागि `version` कमाण्ड चलाउँछ)
- **क्यास गरिएका कलहरू**: <1ms (क्यासबाट फर्काउँछ)
- **क्यास TTL**: 60 सेकेन्ड

### प्रम्प्ट कार्यसम्पादन

- **स्पन**: ~50-100ms
- **प्रम्प्ट पठाउने**: ~10-50ms
- **प्रतिक्रियाको प्रतीक्षा**: CLI एजेन्टमा निर्भर हुन्छ (सामान्यतया 1-30 सेकेन्ड)
- **बन्द गर्ने**: ~5 सेकेन्ड (SIGTERM) + तत्काल (SIGKILL)

### स्रोतको प्रयोग

- **प्रति सत्र मेमोरी**: ~10-50MB (CLI एजेन्टमा निर्भर हुन्छ)
- **CPU**: न्यूनतम (I/O मा निर्भर)
- **डिस्क**: कुनै पनि होइन

---

## समस्या निवारण

### "Unknown agent" त्रुटि

**समस्या**: `acpManager.spawn()` ले `Unknown agent: <id>` त्रुटि दिन्छ

**समाधान**: `spawn()` मा यी एजेन्टहरू मात्र अनुमति प्राप्त छन्:

- `claude`
- `codex`
- `gemini`
- `qwen`

अन्य एजेन्टहरूलाई म्यानुअल रूपमा वा कस्टम एजेन्ट परिभाषाहरूमार्फत स्पन गर्नुपर्छ।

### "Session not alive" त्रुटि

**समस्या**: `acpManager.sendPrompt()` ले `Session ${sessionId} is not alive` त्रुटि दिन्छ

**समाधान**: सत्र बन्द भएको वा मारिएको हुन सक्छ। सत्रको स्थिति जाँच गर्नुहोस्:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // सत्र पुनः स्पन गर्नुहोस्
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" त्रुटि

**समस्या**: `acpManager.sendPrompt()` ले `ACP timeout after 120000ms` त्रुटि दिन्छ

**समाधान**: टाइमआउट बढाउनुहोस्:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 मिनेट
```

### CLI पत्ता लागेन

**समस्या**: `detectInstalledAgents()` ले तपाईंको CLI फेला पार्दैन

**समाधानहरू**:

1. **PATH जाँच गर्नुहोस्**: CLI तपाईंको सिस्टम PATH मा रहेको सुनिश्चित गर्नुहोस्
2. **संस्करण कमाण्ड जाँच गर्नुहोस्**: `claude --version` म्यानुअल रूपमा चलाउनुहोस्
3. **अनुमतिहरू जाँच गर्नुहोस्**: CLI कार्यान्वयनयोग्य भएको सुनिश्चित गर्नुहोस्
4. **कस्टम एजेन्ट**: गैर-मानक CLI हरूका लागि कस्टम एजेन्ट परिभाषा थप्नुहोस्

### अनुमति अस्वीकृत

**समस्या**: ACP ले CLI कार्यान्वयन गर्न सक्दैन

**समाधानहरू**:

1. **फाइल अनुमतिहरू जाँच गर्नुहोस्**: `chmod +x /usr/local/bin/claude`
2. **स्वामित्व जाँच गर्नुहोस्**: OmniRoute सँग पढ्ने/कार्यान्वयन गर्ने अनुमतिहरू भएको सुनिश्चित गर्नुहोस्
3. **SELinux/AppArmor जाँच गर्नुहोस्**: यसले प्रक्रिया स्पन हुनबाट रोक्न सक्छ

---

## उदाहरणहरू

### उदाहरण 1: Claude Code सुरु गर्ने र प्रयोग गर्ने

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// इन्स्टल गरिएका एजेन्टहरू पत्ता लगाउनुहोस्
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // नयाँ सत्र सुरु गर्नुहोस्
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // प्रम्प्ट पठाउनुहोस्
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // सफा गर्नुहोस्
  acpManager.kill(session.id);
}
```

### उदाहरण 2: वैकल्पिक व्यवस्थासहित स्वतः-पहिचान

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// पहिले Claude प्रयास गर्नुहोस्, उपलब्ध नभए Codex प्रयोग गर्नुहोस्
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

### उदाहरण 3: अनुकूलित एजेन्ट

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// अनुकूलित CLI एजेन्ट दर्ता गर्नुहोस्
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

// अब detectInstalledAgents() मा "my-llm-cli" समावेश हुनेछ
const agents = detectInstalledAgents();
```

---

## अब के गर्ने?

- **[API सन्दर्भ](../reference/API_REFERENCE.md)** — REST API एन्डपोइन्टहरू
- **[प्रदायक सन्दर्भ](../reference/PROVIDER_REFERENCE.md)** — सबै 352 प्रदायकहरू
- **[MCP सर्भर](./MCP-SERVER.md)** — Model Context Protocol एकीकरण
- **[A2A सर्भर](./A2A-SERVER.md)** — एजेन्ट-देखि-एजेन्ट प्रोटोकल
- **[क्लाउड एजेन्ट](./CLOUD_AGENT.md)** — क्लाउडमा आधारित एजेन्टहरू

---

## सन्दर्भ

- [AionUi परियोजना](https://github.com/iOfficeAI/AionUi) — ACP स्वतः-पहिचानका लागि प्रेरणा
- [ACP स्रोत कोड](../../src/lib/acp/) — कार्यान्वयन विवरणहरू
  - `manager.ts` — प्रक्रिया जीवनचक्र व्यवस्थापन
  - `registry.ts` — एजेन्ट पहिचान र दर्ता
  - `index.ts` — सार्वजनिक API निर्यातहरू
