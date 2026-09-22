# ACP (Agent Client Protocol) (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **संक्षेप में**: ACP, OmniRoute को HTTP APIs का उपयोग करने के बजाय CLI एजेंटों (जैसे Claude Code, Codex) को चाइल्ड प्रोसेस के रूप में शुरू करने देता है। यह आपको "CLI-as-backend" ट्रांसपोर्ट प्रदान करता है।

---

## ACP क्या है?

ACP (Agent Client Protocol), OmniRoute के लिए एक **"CLI-as-backend" ट्रांसपोर्ट** है। AI प्रदाताओं के HTTP API कॉल को इंटरसेप्ट करने के बजाय, ACP **CLI एजेंटों को चाइल्ड प्रोसेस के रूप में शुरू करता है** और उनके नेटिव इंटरफ़ेस के माध्यम से प्रॉम्प्ट भेजता है।

### ACP का उपयोग क्यों करें?

| लाभ                               | विवरण                                                       |
| --------------------------------- | ----------------------------------------------------------- |
| **API कुंजियों की आवश्यकता नहीं** | आपके मौजूदा CLI प्रमाणीकरण का उपयोग करता है                 |
| **नेटिव प्रोटोकॉल**               | प्रत्येक CLI के नेटिव इनपुट/आउटपुट प्रारूप का उपयोग करता है |
| **स्वतः खोज**                     | आपके सिस्टम पर इंस्टॉल किए गए CLIs का पता लगाता है          |
| **15 बिल्ट-इन एजेंट**             | लोकप्रिय CLI टूल के लिए पहले से कॉन्फ़िगर किए गए हैं        |
| **कस्टम एजेंट**                   | सेटिंग्स के माध्यम से अपने CLI टूल जोड़ें                   |
| **प्रोसेस प्रबंधन**               | जीवनचक्र (शुरू करना, भेजना, समाप्त करना) संभालता है         |

---

## समर्थित CLI एजेंट

ACP डिफ़ॉल्ट रूप से **15 बिल्ट-इन CLI एजेंटों** का समर्थन करता है:

| एजेंट ID      | प्रदर्शित नाम      | बाइनरी        | प्रोटोकॉल |
| ------------- | ------------------ | ------------- | --------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio     |
| `claude`      | Claude Code CLI    | `claude`      | stdio     |
| `goose`       | Goose CLI          | `goose`       | stdio     |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio     |
| `aider`       | Aider              | `aider`       | stdio     |
| `opencode`    | OpenCode           | `opencode`    | stdio     |
| `cline`       | Cline              | `cline`       | stdio     |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio     |
| `forge`       | ForgeCode          | `forge`       | stdio     |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio     |
| `interpreter` | Open Interpreter   | `interpreter` | stdio     |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio     |
| `warp`        | Warp AI            | `warp`        | stdio     |
| `gemini`      | Gemini CLI         | `gemini`      | stdio     |
| `zcode`       | ZCode              | `zcode`       | stdio     |

### कस्टम एजेंट

आप सेटिंग्स के माध्यम से अपने स्वयं के CLI एजेंट जोड़ सकते हैं। कस्टम एजेंट, बिल्ट-इन एजेंटों जैसी ही सुविधाओं का समर्थन करते हैं।

---

## त्वरित शुरुआत

### चरण 1: कोई CLI एजेंट इंस्टॉल करें

```bash
# उदाहरण: Claude Code CLI इंस्टॉल करें
npm install -g @anthropic-ai/claude-code

# इंस्टॉलेशन सत्यापित करें
claude --version
```

### चरण 2: ACP द्वारा स्वतः पहचान

ACP आपके सिस्टम पर इंस्टॉल किए गए CLI एजेंटों का स्वचालित रूप से पता लगाता है। किसी कॉन्फ़िगरेशन की आवश्यकता नहीं है!

### चरण 3: ACP ट्रांसपोर्ट का उपयोग करें

पता लग जाने के बाद, ACP का उपयोग किसी भी समर्थित प्रदाता के लिए ट्रांसपोर्ट के रूप में किया जा सकता है। CLI उपलब्ध होने पर OmniRoute स्वचालित रूप से ACP का उपयोग करेगा।

---

## ACP कैसे काम करता है

### आर्किटेक्चर

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP प्रॉक्सी) │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  चाइल्ड प्रोसेस  │
│  (CLI एजेंट)     │
│                 │
│  stdin  ◄──────┤  प्रॉम्प्ट भेजें
│  stdout ──────►│  प्रतिक्रिया प्राप्त करें
│  stderr ──────►│  त्रुटियाँ प्राप्त करें
└─────────────────┘
```

### प्रोसेस जीवनचक्र

1. **शुरू करना** — ACP, CLI एजेंट के लिए एक चाइल्ड प्रोसेस बनाता है
2. **भेजना** — ACP, प्रोसेस के stdin में प्रॉम्प्ट लिखता है
3. **प्राप्त करना** — ACP, stdout/stderr से प्रतिक्रियाएँ पढ़ता है
4. **निष्क्रियता की पहचान** — प्रतिक्रिया को पूर्ण मानने से पहले ACP 2 सेकंड की निष्क्रियता की प्रतीक्षा करता है
5. **समाप्त करना** — ACP प्रोसेस को समाप्त करता है (SIGTERM, फिर 5s के बाद SIGKILL)

### संचार प्रोटोकॉल

ACP, CLI एजेंटों के साथ संचार के लिए **stdio** (मानक इनपुट/आउटपुट) का उपयोग करता है। प्रोटोकॉल यह है:

1. **प्रॉम्प्ट भेजें** — नई पंक्ति के साथ stdin में लिखें
2. **प्रतिक्रिया की प्रतीक्षा करें** — निष्क्रिय होने तक stdout से पढ़ें (2s तक कोई आउटपुट नहीं)
3. **टाइमआउट** — डिफ़ॉल्ट रूप से 120 सेकंड (कॉन्फ़िगर करने योग्य)

---

## API संदर्भ

### रजिस्ट्री फ़ंक्शन

#### `detectInstalledAgents()`

सिस्टम पर इंस्टॉल किए गए सभी CLI एजेंट का पता लगाता है। परिणाम 60 सेकंड के लिए कैश किए जाते हैं।

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// लौटाता है: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // उदाहरण के लिए, "codex", "claude"
  name: string; // प्रदर्शित नाम
  binary: string; // शुरू किए जाने वाले बाइनरी का नाम
  versionCommand: string; // संस्करण का पता लगाने वाली कमांड
  version: string | null; // पता लगाया गया संस्करण (इंस्टॉल न होने पर null)
  installed: boolean; // क्या एजेंट इंस्टॉल किया गया है
  providerAlias: string; // OmniRoute में प्रदाता ID
  spawnArgs: string[]; // शुरू करते समय पास किए जाने वाले आर्ग्युमेंट
  protocol: "stdio" | "http"; // संचार प्रोटोकॉल
  isCustom?: boolean; // क्या यह उपयोगकर्ता द्वारा परिभाषित कस्टम एजेंट है
}
```

#### `getAvailableAgents()`

केवल उन एजेंट को प्राप्त करता है जो इंस्टॉल किए गए हैं और ACP के लिए उपलब्ध हैं।

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// लौटाता है: CliAgentInfo[] (केवल इंस्टॉल किए गए एजेंट)
```

#### `getAgentById(id)`

ID द्वारा किसी विशिष्ट एजेंट को प्राप्त करता है।

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// लौटाता है: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

सेटिंग्स से कस्टम एजेंट परिभाषाएँ सेट करता है।

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

### मैनेजर फ़ंक्शन

#### `acpManager.spawn(agentId, binary, args, env)`

एक नई CLI एजेंट प्रक्रिया शुरू करता है।

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* कस्टम एनवायरनमेंट वेरिएबल */
});
// लौटाता है: AcpSession
```

**अनुमत एजेंट ID**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

किसी CLI एजेंट को प्रॉम्प्ट भेजता है और प्रतिक्रिया एकत्र करता है।

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 मिनट की समय-सीमा
);
// लौटाता है: Promise<string>
```

#### `acpManager.kill(sessionId)`

किसी सत्र को समाप्त करता है और संसाधनों की सफ़ाई करता है।

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// लौटाता है: boolean
```

#### `acpManager.getActiveSessions()`

सभी सक्रिय सत्र प्राप्त करता है।

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// लौटाता है: AcpSession[]
```

#### `acpManager.killAll()`

सभी सत्र समाप्त करता है।

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### सत्र इंटरफ़ेस

```typescript
interface AcpSession {
  id: string; // अद्वितीय सत्र ID
  agentId: string; // एजेंट ID (उदाहरण के लिए, "claude")
  process: ChildProcess; // चाइल्ड प्रोसेस हैंडल
  alive: boolean; // क्या प्रक्रिया सक्रिय है
  stdoutBuffer: string; // संचित stdout बफ़र
  stderrBuffer: string; // संचित stderr बफ़र
  createdAt: Date; // निर्माण का टाइमस्टैम्प
}
```

### इवेंट

`AcpManager`, `EventEmitter` को विस्तारित करता है और निम्नलिखित इवेंट उत्सर्जित करता है:

#### `stdout`

जब CLI एजेंट stdout पर लिखता है, तब उत्सर्जित होता है।

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

जब CLI एजेंट stderr पर लिखता है, तब उत्सर्जित होता है।

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

जब CLI एजेंट प्रक्रिया समाप्त होती है, तब उत्सर्जित होता है।

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

जब CLI एजेंट प्रक्रिया में त्रुटि होती है, तब उत्सर्जित होता है।

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## कॉन्फ़िगरेशन

### एनवायरनमेंट वेरिएबल्स

ACP पैरेंट प्रोसेस से सभी एनवायरनमेंट वेरिएबल्स इनहेरिट करता है और इसे कस्टम एनवायरनमेंट वेरिएबल्स के साथ विस्तारित किया जा सकता है:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### स्पॉन आर्ग्युमेंट्स

प्रत्येक एजेंट के डिफ़ॉल्ट स्पॉन आर्ग्युमेंट्स रजिस्ट्री में परिभाषित होते हैं। आप उन्हें ओवरराइड कर सकते हैं:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### टाइमआउट

डिफ़ॉल्ट प्रॉम्प्ट टाइमआउट **120 सेकंड** (2 मिनट) है। आप इसे ओवरराइड कर सकते हैं:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 मिनट
```

### डिटेक्शन कैश

महंगे फ़ाइलसिस्टम स्कैन से बचने के लिए एजेंट डिटेक्शन को **60 सेकंड** तक कैश किया जाता है। फ़ोर्स रिफ़्रेश करें:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## सुरक्षा

### कमांड इंजेक्शन की रोकथाम

ACP कमांड इंजेक्शन हमलों को रोकने के लिए वर्ज़न कमांड को सत्यापित करता है:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

इन वर्णों वाले वर्ज़न कमांड अस्वीकार कर दिए जाते हैं:

- `;` — कमांड विभाजक
- `&` — बैकग्राउंड प्रोसेस
- `|` — पाइप
- `<`, `>` — रीडायरेक्शन
- `` ` `` — कमांड प्रतिस्थापन
- `$` — वेरिएबल विस्तार
- `\r`, `\n` — लाइन ब्रेक

### बाइनरी नाम सत्यापन

ACP सत्यापित करता है कि वर्ज़न कमांड का बाइनरी नाम अपेक्षित बाइनरी नाम से मेल खाता है (जब तक कि वह कस्टम एजेंट न हो)।

### प्रोसेस आइसोलेशन

प्रत्येक ACP सेशन अपनी अलग चाइल्ड प्रोसेस में चलता है। सेशन समाप्त होने या टाइमआउट होने पर प्रोसेस को समाप्त कर दिया जाता है।

---

## प्रदर्शन

### डिटेक्शन प्रदर्शन

- **पहली कॉल**: ~50-200ms (प्रत्येक एजेंट के लिए `version` कमांड चलाती है)
- **कैश की गई कॉल्स**: <1ms (कैश से लौटती हैं)
- **कैश TTL**: 60 सेकंड

### प्रॉम्प्ट प्रदर्शन

- **स्पॉन**: ~50-100ms
- **प्रॉम्प्ट भेजना**: ~10-50ms
- **प्रतिक्रिया की प्रतीक्षा**: CLI एजेंट पर निर्भर करता है (आमतौर पर 1-30 सेकंड)
- **समाप्त करना**: ~5 सेकंड (SIGTERM) + तत्काल (SIGKILL)

### संसाधन उपयोग

- **प्रति सेशन मेमोरी**: ~10-50MB (CLI एजेंट पर निर्भर करता है)
- **CPU**: न्यूनतम (I/O बाउंड)
- **डिस्क**: कोई नहीं

---

## समस्या निवारण

### "Unknown agent" त्रुटि

**समस्या**: `acpManager.spawn()` से `Unknown agent: <id>` त्रुटि उत्पन्न होती है

**समाधान**: `spawn()` में केवल इन एजेंट्स की अनुमति है:

- `claude`
- `codex`
- `gemini`
- `qwen`

अन्य एजेंट्स को मैन्युअल रूप से या कस्टम एजेंट परिभाषाओं के माध्यम से स्पॉन करना होगा।

### "Session not alive" त्रुटि

**समस्या**: `acpManager.sendPrompt()` से `Session ${sessionId} is not alive` त्रुटि उत्पन्न होती है

**समाधान**: हो सकता है कि सेशन बंद हो गया हो या उसे समाप्त कर दिया गया हो। सेशन की स्थिति जाँचें:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // सेशन को फिर से स्पॉन करें
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" त्रुटि

**समस्या**: `acpManager.sendPrompt()` से `ACP timeout after 120000ms` त्रुटि उत्पन्न होती है

**समाधान**: टाइमआउट बढ़ाएँ:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 मिनट
```

### CLI का पता नहीं चला

**समस्या**: `detectInstalledAgents()` आपकी CLI को नहीं ढूँढता

**समाधान**:

1. **PATH जाँचें**: सुनिश्चित करें कि CLI आपके सिस्टम PATH में है
2. **वर्ज़न कमांड जाँचें**: `claude --version` को मैन्युअल रूप से चलाएँ
3. **अनुमतियाँ जाँचें**: सुनिश्चित करें कि CLI निष्पादन योग्य है
4. **कस्टम एजेंट**: गैर-मानक CLI के लिए एक कस्टम एजेंट परिभाषा जोड़ें

### अनुमति अस्वीकृत

**समस्या**: ACP, CLI को निष्पादित नहीं कर सकता

**समाधान**:

1. **फ़ाइल अनुमतियाँ जाँचें**: `chmod +x /usr/local/bin/claude`
2. **स्वामित्व जाँचें**: सुनिश्चित करें कि OmniRoute के पास पढ़ने/निष्पादित करने की अनुमतियाँ हैं
3. **SELinux/AppArmor जाँचें**: ये प्रोसेस स्पॉनिंग को अवरुद्ध कर सकते हैं

---

## उदाहरण

### उदाहरण 1: Claude Code को प्रारंभ करना और उपयोग करना

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// इंस्टॉल किए गए एजेंट का पता लगाएँ
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // एक नया सत्र प्रारंभ करें
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // एक प्रॉम्प्ट भेजें
  const response = await acpManager.sendPrompt(
    session.id,
    "क्वांटम कंप्यूटिंग को 100 शब्दों में समझाएँ"
  );

  console.log("Claude की प्रतिक्रिया:", response);

  // संसाधनों को मुक्त करें
  acpManager.kill(session.id);
}
```

### उदाहरण 2: फ़ॉलबैक के साथ स्वतः खोज

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// पहले Claude को आज़माएँ, फिर फ़ॉलबैक के रूप में Codex का उपयोग करें
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("कोई ACP-संगत CLI एजेंट नहीं मिला");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "नमस्ते!");

acpManager.kill(session.id);
```

### उदाहरण 3: कस्टम एजेंट

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// एक कस्टम CLI एजेंट पंजीकृत करें
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

// अब detectInstalledAgents() में "my-llm-cli" शामिल होगा
const agents = detectInstalledAgents();
```

---

## आगे क्या है?

- **[API संदर्भ](../reference/API_REFERENCE.md)** — REST API एंडपॉइंट
- **[प्रदाता संदर्भ](../reference/PROVIDER_REFERENCE.md)** — सभी 352 प्रदाता
- **[MCP सर्वर](./MCP-SERVER.md)** — Model Context Protocol एकीकरण
- **[A2A सर्वर](./A2A-SERVER.md)** — Agent-to-Agent प्रोटोकॉल
- **[क्लाउड एजेंट](./CLOUD_AGENT.md)** — क्लाउड-आधारित एजेंट

---

## संदर्भ

- [AionUi प्रोजेक्ट](https://github.com/iOfficeAI/AionUi) — ACP की स्वतः पहचान के लिए प्रेरणा
- [ACP स्रोत कोड](../../src/lib/acp/) — कार्यान्वयन विवरण
  - `manager.ts` — प्रोसेस जीवनचक्र प्रबंधन
  - `registry.ts` — एजेंट की खोज और पंजीकरण
  - `index.ts` — सार्वजनिक API एक्सपोर्ट
