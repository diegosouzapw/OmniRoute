# ACP (Agent Client Protocol) (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP मुळे OmniRoute हे HTTP APIs वापरण्याऐवजी CLI एजंट्सना (जसे Claude Code, Codex) चाइल्ड प्रोसेसेस म्हणून सुरू करू शकते. यामुळे तुम्हाला "CLI-as-backend" ट्रान्सपोर्ट मिळतो.

---

## ACP म्हणजे काय?

ACP (Agent Client Protocol) हा OmniRoute साठीचा **"CLI-as-backend" ट्रान्सपोर्ट** आहे. AI प्रदात्यांकडे जाणारे HTTP API कॉल्स इंटरसेप्ट करण्याऐवजी, ACP **CLI एजंट्सना चाइल्ड प्रोसेसेस म्हणून सुरू करते** आणि त्यांच्या मूळ इंटरफेसद्वारे प्रॉम्प्ट्स पाठवते.

### ACP का वापरावे?

| लाभ                    | वर्णन                                           |
| ---------------------- | ----------------------------------------------- |
| **API कीजची गरज नाही** | तुमचे विद्यमान CLI प्रमाणीकरण वापरते            |
| **मूळ प्रोटोकॉल**      | प्रत्येक CLI चे मूळ इनपुट/आउटपुट स्वरूप वापरते  |
| **स्वयंचलित शोध**      | तुमच्या सिस्टीमवर इंस्टॉल केलेले CLIs शोधते     |
| **15 अंगभूत एजंट्स**   | लोकप्रिय CLI साधनांसाठी पूर्व-कॉन्फिगर केलेले   |
| **सानुकूल एजंट्स**     | सेटिंग्जद्वारे तुमची स्वतःची CLI साधने जोडा     |
| **प्रोसेस व्यवस्थापन** | लाइफसायकल हाताळते (सुरू करणे, पाठवणे, बंद करणे) |

---

## समर्थित CLI एजंट्स

ACP मध्ये डीफॉल्ट स्वरूपात **15 अंगभूत CLI एजंट्सना** समर्थन आहे:

| एजंट ID       | प्रदर्शित नाव      | बायनरी        | प्रोटोकॉल |
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

### सानुकूल एजंट्स

तुम्ही सेटिंग्जद्वारे तुमचे स्वतःचे CLI एजंट्स जोडू शकता. सानुकूल एजंट्स अंगभूत एजंट्ससारख्याच वैशिष्ट्यांना समर्थन देतात.

---

## द्रुत प्रारंभ

### पायरी 1: CLI एजंट इंस्टॉल करा

```bash
# उदाहरण: Claude Code CLI इंस्टॉल करा
npm install -g @anthropic-ai/claude-code

# इंस्टॉलेशनची पडताळणी करा
claude --version
```

### पायरी 2: ACP द्वारे स्वयंचलित शोध

ACP तुमच्या सिस्टीमवर इंस्टॉल केलेले CLI एजंट्स स्वयंचलितपणे शोधते. कोणत्याही कॉन्फिगरेशनची गरज नाही!

### पायरी 3: ACP ट्रान्सपोर्ट वापरा

एकदा शोधल्यानंतर, ACP चा वापर कोणत्याही समर्थित प्रदात्यासाठी ट्रान्सपोर्ट म्हणून केला जाऊ शकतो. CLI उपलब्ध असताना OmniRoute स्वयंचलितपणे ACP वापरेल.

---

## ACP कसे कार्य करते

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
│  (CLI एजंट)     │
│                 │
│  stdin  ◄──────┤  प्रॉम्प्ट पाठवा
│  stdout ──────►│  प्रतिसाद प्राप्त करा
│  stderr ──────►│  त्रुटी प्राप्त करा
└─────────────────┘
```

### प्रोसेस लाइफसायकल

1. **सुरू करणे** — ACP हे CLI एजंटसाठी चाइल्ड प्रोसेस तयार करते
2. **पाठवणे** — ACP प्रोसेसच्या stdin मध्ये प्रॉम्प्ट्स लिहिते
3. **प्राप्त करणे** — ACP stdout/stderr मधून प्रतिसाद वाचते
4. **निष्क्रियता शोध** — प्रतिसाद पूर्ण झाला असे मानण्यापूर्वी ACP 2 सेकंदांच्या निष्क्रियतेची प्रतीक्षा करते
5. **बंद करणे** — ACP प्रोसेस समाप्त करते (SIGTERM आणि त्यानंतर 5s ने SIGKILL)

### संप्रेषण प्रोटोकॉल

CLI एजंट्ससोबत संप्रेषण करण्यासाठी ACP **stdio** (मानक इनपुट/आउटपुट) वापरते. प्रोटोकॉल पुढीलप्रमाणे आहे:

1. **प्रॉम्प्ट पाठवा** — नवीन ओळीसह stdin मध्ये लिहा
2. **प्रतिसादाची प्रतीक्षा करा** — निष्क्रियता येईपर्यंत stdout मधून वाचा (2s पर्यंत कोणतेही आउटपुट नाही)
3. **टाइमआउट** — डीफॉल्टनुसार 120 सेकंद (कॉन्फिगर करण्यायोग्य)

---

## API संदर्भ

### रजिस्ट्री फंक्शन्स

#### `detectInstalledAgents()`

सिस्टमवर स्थापित केलेले सर्व CLI एजंट शोधते. परिणाम 60 सेकंदांसाठी कॅश केले जातात.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// परतावा: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // उदा., "codex", "claude"
  name: string; // प्रदर्शित नाव
  binary: string; // सुरू करण्यासाठी बायनरीचे नाव
  versionCommand: string; // आवृत्ती शोधण्याची कमांड
  version: string | null; // शोधलेली आवृत्ती (स्थापित नसल्यास null)
  installed: boolean; // एजंट स्थापित आहे की नाही
  providerAlias: string; // OmniRoute मधील प्रदाता ID
  spawnArgs: string[]; // सुरू करताना पाठवायचे आर्ग्युमेंट्स
  protocol: "stdio" | "http"; // संप्रेषण प्रोटोकॉल
  isCustom?: boolean; // हा वापरकर्त्याने परिभाषित केलेला सानुकूल एजंट आहे की नाही
}
```

#### `getAvailableAgents()`

केवळ स्थापित केलेले आणि ACP साठी उपलब्ध असलेले एजंट मिळवते.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// परतावा: CliAgentInfo[] (केवळ स्थापित एजंट)
```

#### `getAgentById(id)`

ID नुसार विशिष्ट एजंट मिळवते.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// परतावा: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

सेटिंग्जमधून सानुकूल एजंटच्या व्याख्या सेट करते.

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

### व्यवस्थापक फंक्शन्स

#### `acpManager.spawn(agentId, binary, args, env)`

नवीन CLI एजंट प्रक्रिया सुरू करते.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* सानुकूल पर्यावरणीय चल */
});
// परतावा: AcpSession
```

**अनुमत एजंट ID**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

CLI एजंटला प्रॉम्प्ट पाठवते आणि प्रतिसाद संकलित करते.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 मिनिटांची कालमर्यादा
);
// परतावा: Promise<string>
```

#### `acpManager.kill(sessionId)`

सत्र समाप्त करते आणि स्वच्छता करते.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// परतावा: boolean
```

#### `acpManager.getActiveSessions()`

सर्व सक्रिय सत्रे मिळवते.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// परतावा: AcpSession[]
```

#### `acpManager.killAll()`

सर्व सत्रे समाप्त करते.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### सत्र इंटरफेस

```typescript
interface AcpSession {
  id: string; // अद्वितीय सत्र ID
  agentId: string; // एजंट ID (उदा., "claude")
  process: ChildProcess; // चाइल्ड प्रक्रियेचा हँडल
  alive: boolean; // प्रक्रिया सक्रिय आहे की नाही
  stdoutBuffer: string; // संचित stdout बफर
  stderrBuffer: string; // संचित stderr बफर
  createdAt: Date; // निर्मितीचा टाइमस्टॅम्प
}
```

### इव्हेंट्स

`AcpManager` हे `EventEmitter` विस्तारित करते आणि पुढील इव्हेंट्स उत्सर्जित करते:

#### `stdout`

CLI एजंट stdout वर लिहितो तेव्हा उत्सर्जित होते.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI एजंट stderr वर लिहितो तेव्हा उत्सर्जित होते.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI एजंट प्रक्रिया बाहेर पडते तेव्हा उत्सर्जित होते.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI एजंट प्रक्रियेत त्रुटी उद्भवते तेव्हा उत्सर्जित होते.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## कॉन्फिगरेशन

### पर्यावरण चल

ACP मूळ प्रक्रियेतील सर्व पर्यावरण चल वारशाने प्राप्त करते आणि सानुकूल पर्यावरण चलांसह त्यांचा विस्तार केला जाऊ शकतो:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### स्पॉन आर्ग्युमेंट्स

प्रत्येक एजंटसाठी डीफॉल्ट स्पॉन आर्ग्युमेंट्स रजिस्ट्रीमध्ये परिभाषित केलेली आहेत. तुम्ही ती ओव्हरराइड करू शकता:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### कालबाह्यता

डीफॉल्ट प्रॉम्प्ट कालबाह्यता **120 सेकंद** (2 मिनिटे) आहे. तुम्ही ती ओव्हरराइड करू शकता:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 मिनिटे
```

### शोध कॅशे

फाइलसिस्टमचे खर्चिक स्कॅन टाळण्यासाठी एजंट शोध **60 सेकंदांसाठी** कॅश केला जातो. सक्तीने रिफ्रेश करण्यासाठी:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## सुरक्षा

### कमांड इंजेक्शन प्रतिबंध

कमांड इंजेक्शन हल्ले टाळण्यासाठी ACP आवृत्ती कमांड्सची पडताळणी करते:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

ही अक्षरे असलेल्या आवृत्ती कमांड्स नाकारल्या जातात:

- `;` — कमांड विभाजक
- `&` — पार्श्वभूमी प्रक्रिया
- `|` — पाइप
- `<`, `>` — पुनर्निर्देशन
- `` ` `` — कमांड प्रतिस्थापन
- `$` — चल विस्तार
- `\r`, `\n` — ओळ खंड

### बायनरी नाव पडताळणी

ACP आवृत्ती कमांडमधील बायनरीचे नाव अपेक्षित बायनरी नावाशी जुळते याची पडताळणी करते (तो सानुकूल एजंट नसल्यास).

### प्रक्रिया विलगीकरण

प्रत्येक ACP सत्र त्याच्या स्वतंत्र चाइल्ड प्रक्रियेमध्ये चालते. सत्र संपल्यावर किंवा कालबाह्य झाल्यावर प्रक्रिया बंद केली जाते.

---

## कार्यप्रदर्शन

### शोध कार्यप्रदर्शन

- **पहिला कॉल**: ~50-200ms (प्रत्येक एजंटसाठी `version` कमांड चालवते)
- **कॅश केलेले कॉल्स**: <1ms (कॅशमधून परत करते)
- **कॅश TTL**: 60 सेकंद

### प्रॉम्प्ट कार्यप्रदर्शन

- **स्पॉन**: ~50-100ms
- **प्रॉम्प्ट पाठवणे**: ~10-50ms
- **प्रतिसादाची प्रतीक्षा**: CLI एजंटवर अवलंबून (सामान्यतः 1-30 सेकंद)
- **बंद करणे**: ~5 सेकंद (SIGTERM) + तत्काळ (SIGKILL)

### संसाधन वापर

- **प्रति सत्र मेमरी**: ~10-50MB (CLI एजंटवर अवलंबून)
- **CPU**: अत्यल्प (I/O अवलंबित)
- **डिस्क**: नाही

---

## समस्या निवारण

### "Unknown agent" त्रुटी

**समस्या**: `acpManager.spawn()` मुळे `Unknown agent: <id>` त्रुटी उद्भवते

**उपाय**: `spawn()` मध्ये केवळ या एजंटना परवानगी आहे:

- `claude`
- `codex`
- `gemini`
- `qwen`

इतर एजंट्सना व्यक्तिचलितपणे किंवा सानुकूल एजंट व्याख्यांद्वारे स्पॉन करणे आवश्यक आहे.

### "Session not alive" त्रुटी

**समस्या**: `acpManager.sendPrompt()` मुळे `Session ${sessionId} is not alive` त्रुटी उद्भवते

**उपाय**: सत्र कदाचित समाप्त झाले असेल किंवा बंद केले गेले असेल. सत्राची स्थिती तपासा:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // सत्र पुन्हा स्पॉन करा
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" त्रुटी

**समस्या**: `acpManager.sendPrompt()` मुळे `ACP timeout after 120000ms` त्रुटी उद्भवते

**उपाय**: कालबाह्यता वाढवा:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 मिनिटे
```

### CLI आढळले नाही

**समस्या**: `detectInstalledAgents()` ला तुमचे CLI सापडत नाही

**उपाय**:

1. **PATH तपासा**: CLI तुमच्या सिस्टीम PATH मध्ये असल्याची खात्री करा
2. **आवृत्ती कमांड तपासा**: `claude --version` व्यक्तिचलितपणे चालवा
3. **परवानग्या तपासा**: CLI एक्झिक्युटेबल असल्याची खात्री करा
4. **सानुकूल एजंट**: अप्रमाणित CLI साठी सानुकूल एजंट व्याख्या जोडा

### परवानगी नाकारली

**समस्या**: ACP हे CLI कार्यान्वित करू शकत नाही

**उपाय**:

1. **फाइल परवानग्या तपासा**: `chmod +x /usr/local/bin/claude`
2. **मालकी तपासा**: OmniRoute कडे वाचन/कार्यान्वयन परवानग्या असल्याची खात्री करा
3. **SELinux/AppArmor तपासा**: ते प्रक्रिया स्पॉन होण्यास प्रतिबंध करू शकतात

---

## उदाहरणे

### उदाहरण 1: Claude Code सुरू करणे आणि वापरणे

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// स्थापित एजंट शोधा
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // नवीन सत्र सुरू करा
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // प्रॉम्प्ट पाठवा
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // साफसफाई करा
  acpManager.kill(session.id);
}
```

### उदाहरण 2: फॉलबॅकसह स्वयंचलित शोध

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// प्रथम Claude वापरून पाहा; तो उपलब्ध नसल्यास Codex वापरा
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

### उदाहरण 3: सानुकूल एजंट

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// सानुकूल CLI एजंटची नोंदणी करा
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

// आता detectInstalledAgents() मध्ये "my-llm-cli" समाविष्ट असेल
const agents = detectInstalledAgents();
```

---

## पुढे काय?

- **[API संदर्भ](../reference/API_REFERENCE.md)** — REST API एंडपॉइंट्स
- **[प्रदाता संदर्भ](../reference/PROVIDER_REFERENCE.md)** — सर्व 352 प्रदाते
- **[MCP सर्व्हर](./MCP-SERVER.md)** — Model Context Protocol एकत्रीकरण
- **[A2A सर्व्हर](./A2A-SERVER.md)** — एजंट-टू-एजंट प्रोटोकॉल
- **[क्लाउड एजंट](./CLOUD_AGENT.md)** — क्लाउड-आधारित एजंट

---

## संदर्भ

- [AionUi प्रकल्प](https://github.com/iOfficeAI/AionUi) — ACP स्वयंचलित शोधासाठी प्रेरणा
- [ACP स्रोत कोड](../../src/lib/acp/) — अंमलबजावणीचे तपशील
  - `manager.ts` — प्रक्रिया जीवनचक्र व्यवस्थापन
  - `registry.ts` — एजंट शोध आणि नोंदणी
  - `index.ts` — सार्वजनिक API निर्याती
