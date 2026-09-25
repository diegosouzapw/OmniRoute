# ACP (Agent Client Protocol) (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **సంక్షిప్తంగా**: HTTP APIలను ఉపయోగించడానికి బదులుగా, ACP ద్వారా OmniRoute CLI ఏజెంట్లను (Claude Code, Codex వంటివి) చైల్డ్ ప్రాసెస్లుగా ప్రారంభించగలదు. ఇది మీకు "CLI-as-backend" ట్రాన్స్పోర్ట్ను అందిస్తుంది.

---

## ACP అంటే ఏమిటి?

ACP (Agent Client Protocol) అనేది OmniRoute కోసం ఒక **"CLI-as-backend" ట్రాన్స్పోర్ట్**. AI ప్రొవైడర్లకు చేసే HTTP API కాల్లను మధ్యలో అడ్డుకోవడానికి బదులుగా, ACP **CLI ఏజెంట్లను చైల్డ్ ప్రాసెస్లుగా ప్రారంభించి**, వాటి స్థానిక ఇంటర్ఫేస్ ద్వారా ప్రాంప్ట్లను అందిస్తుంది.

### ACPని ఎందుకు ఉపయోగించాలి?

| ప్రయోజనం                     | వివరణ                                                              |
| ---------------------------- | ------------------------------------------------------------------ |
| **API కీలు అవసరం లేదు**      | మీ ప్రస్తుత CLI ప్రామాణీకరణను ఉపయోగిస్తుంది                        |
| **స్థానిక ప్రోటోకాల్**       | ప్రతి CLI యొక్క స్థానిక ఇన్పుట్/అవుట్పుట్ ఫార్మాట్ను ఉపయోగిస్తుంది |
| **స్వయంచాలక గుర్తింపు**      | మీ సిస్టమ్లో ఇన్స్టాల్ చేసిన CLIలను గుర్తిస్తుంది                  |
| **అంతర్నిర్మిత 15 ఏజెంట్లు** | ప్రసిద్ధ CLI సాధనాల కోసం ముందుగానే కాన్ఫిగర్ చేయబడింది             |
| **కస్టమ్ ఏజెంట్లు**          | సెట్టింగ్ల ద్వారా మీ స్వంత CLI సాధనాలను జోడించండి                  |
| **ప్రాసెస్ నిర్వహణ**         | జీవితచక్రాన్ని (ప్రారంభించడం, పంపడం, నిలిపివేయడం) నిర్వహిస్తుంది   |

---

## మద్దతు ఉన్న CLI ఏజెంట్లు

ACPలో ముందుగానే **15 అంతర్నిర్మిత CLI ఏజెంట్లకు** మద్దతు ఉంది:

| ఏజెంట్ ID     | ప్రదర్శన పేరు      | బైనరీ         | ప్రోటోకాల్ |
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

### కస్టమ్ ఏజెంట్లు

సెట్టింగ్ల ద్వారా మీరు మీ స్వంత CLI ఏజెంట్లను జోడించవచ్చు. కస్టమ్ ఏజెంట్లు కూడా అంతర్నిర్మిత ఏజెంట్ల మాదిరిగానే అదే ఫీచర్లకు మద్దతు ఇస్తాయి.

---

## త్వరిత ప్రారంభం

### దశ 1: CLI ఏజెంట్ను ఇన్స్టాల్ చేయండి

```bash
# ఉదాహరణ: Claude Code CLIని ఇన్స్టాల్ చేయండి
npm install -g @anthropic-ai/claude-code

# ఇన్స్టాలేషన్ను ధృవీకరించండి
claude --version
```

### దశ 2: ACP స్వయంచాలక గుర్తింపు

ACP మీ సిస్టమ్లో ఇన్స్టాల్ చేసిన CLI ఏజెంట్లను స్వయంచాలకంగా గుర్తిస్తుంది. ఎలాంటి కాన్ఫిగరేషన్ అవసరం లేదు!

### దశ 3: ACP ట్రాన్స్పోర్ట్ను ఉపయోగించండి

గుర్తించిన తర్వాత, మద్దతు ఉన్న ఏ ప్రొవైడర్కైనా ACPని ట్రాన్స్పోర్ట్గా ఉపయోగించవచ్చు. CLI అందుబాటులో ఉన్నప్పుడు OmniRoute స్వయంచాలకంగా ACPని ఉపయోగిస్తుంది.

---

## ACP ఎలా పనిచేస్తుంది

### ఆర్కిటెక్చర్

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP ప్రాక్సీ)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  చైల్డ్ ప్రాసెస్  │
│  (CLI ఏజెంట్)    │
│                 │
│  stdin  ◄──────┤  ప్రాంప్ట్ను పంపడం
│  stdout ──────►│  ప్రతిస్పందనను స్వీకరించడం
│  stderr ──────►│  లోపాలను స్వీకరించడం
└─────────────────┘
```

### ప్రాసెస్ జీవితచక్రం

1. **ప్రారంభించడం** — CLI ఏజెంట్ కోసం ACP ఒక చైల్డ్ ప్రాసెస్ను సృష్టిస్తుంది
2. **పంపడం** — ACP ప్రాంప్ట్లను ప్రాసెస్ యొక్క stdinకు వ్రాస్తుంది
3. **స్వీకరించడం** — ACP stdout/stderr నుండి ప్రతిస్పందనలను చదువుతుంది
4. **నిష్క్రియ గుర్తింపు** — ప్రతిస్పందన పూర్తయినట్లు పరిగణించే ముందు ACP 2 సెకన్ల నిష్క్రియ కోసం వేచి ఉంటుంది
5. **నిలిపివేయడం** — ACP ప్రాసెస్ను నిలిపివేస్తుంది (SIGTERM, ఆపై 5s తర్వాత SIGKILL)

### కమ్యూనికేషన్ ప్రోటోకాల్

CLI ఏజెంట్లతో కమ్యూనికేషన్ కోసం ACP **stdio** (ప్రామాణిక ఇన్పుట్/అవుట్పుట్)ను ఉపయోగిస్తుంది. ప్రోటోకాల్ ఇలా ఉంటుంది:

1. **ప్రాంప్ట్ను పంపడం** — కొత్త పంక్తితో stdinకు వ్రాయడం
2. **ప్రతిస్పందన కోసం వేచి ఉండడం** — నిష్క్రియ అయ్యే వరకు stdout నుండి చదవడం (2s పాటు అవుట్పుట్ లేకపోవడం)
3. **గడువు ముగింపు** — డిఫాల్ట్గా 120 సెకన్లు (కాన్ఫిగర్ చేయవచ్చు)

---

## API సూచన

### రిజిస్ట్రీ ఫంక్షన్లు

#### `detectInstalledAgents()`

సిస్టమ్లో ఇన్స్టాల్ చేసిన అన్ని CLI ఏజెంట్లను గుర్తిస్తుంది. ఫలితాలు 60 సెకన్లపాటు క్యాష్ చేయబడతాయి.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// తిరిగి ఇచ్చేది: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // ఉదా., "codex", "claude"
  name: string; // ప్రదర్శన పేరు
  binary: string; // ప్రారంభించాల్సిన బైనరీ పేరు
  versionCommand: string; // వెర్షన్ను గుర్తించే కమాండ్
  version: string | null; // గుర్తించిన వెర్షన్ (ఇన్స్టాల్ చేయకపోతే null)
  installed: boolean; // ఏజెంట్ ఇన్స్టాల్ చేయబడిందో లేదో
  providerAlias: string; // OmniRouteలో ప్రొవైడర్ ID
  spawnArgs: string[]; // ప్రారంభించేటప్పుడు పంపాల్సిన ఆర్గ్యుమెంట్లు
  protocol: "stdio" | "http"; // కమ్యూనికేషన్ ప్రోటోకాల్
  isCustom?: boolean; // ఇది వినియోగదారు నిర్వచించిన కస్టమ్ ఏజెంట్ కాదో
}
```

#### `getAvailableAgents()`

ఇన్స్టాల్ చేయబడి, ACP కోసం అందుబాటులో ఉన్న ఏజెంట్లను మాత్రమే పొందుతుంది.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// తిరిగి ఇచ్చేది: CliAgentInfo[] (ఇన్స్టాల్ చేసిన ఏజెంట్లు మాత్రమే)
```

#### `getAgentById(id)`

ID ద్వారా నిర్దిష్ట ఏజెంట్ను పొందుతుంది.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// తిరిగి ఇచ్చేది: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

సెట్టింగ్ల నుండి కస్టమ్ ఏజెంట్ నిర్వచనాలను సెట్ చేస్తుంది.

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

### మేనేజర్ ఫంక్షన్లు

#### `acpManager.spawn(agentId, binary, args, env)`

కొత్త CLI ఏజెంట్ ప్రాసెస్ను ప్రారంభిస్తుంది.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* కస్టమ్ ఎన్విరాన్మెంట్ వేరియబుల్లు */
});
// తిరిగి ఇచ్చేది: AcpSession
```

**అనుమతించబడిన ఏజెంట్ IDలు**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

CLI ఏజెంట్కు ప్రాంప్ట్ను పంపి, ప్రతిస్పందనను సేకరిస్తుంది.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 నిమిషాల గడువు
);
// తిరిగి ఇచ్చేది: Promise<string>
```

#### `acpManager.kill(sessionId)`

సెషన్ను నిలిపివేసి, సంబంధిత వనరులను శుభ్రపరుస్తుంది.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// తిరిగి ఇచ్చేది: boolean
```

#### `acpManager.getActiveSessions()`

యాక్టివ్గా ఉన్న అన్ని సెషన్లను పొందుతుంది.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// తిరిగి ఇచ్చేది: AcpSession[]
```

#### `acpManager.killAll()`

అన్ని సెషన్లను నిలిపివేస్తుంది.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### సెషన్ ఇంటర్ఫేస్

```typescript
interface AcpSession {
  id: string; // ప్రత్యేకమైన సెషన్ ID
  agentId: string; // ఏజెంట్ ID (ఉదా., "claude")
  process: ChildProcess; // చైల్డ్ ప్రాసెస్ హ్యాండిల్
  alive: boolean; // ప్రాసెస్ సజీవంగా ఉందో లేదో
  stdoutBuffer: string; // సేకరించబడిన stdout బఫర్
  stderrBuffer: string; // సేకరించబడిన stderr బఫర్
  createdAt: Date; // సృష్టించిన సమయముద్ర
}
```

### ఈవెంట్లు

`AcpManager`, `EventEmitter`ను విస్తరిస్తుంది మరియు కింది ఈవెంట్లను విడుదల చేస్తుంది:

#### `stdout`

CLI ఏజెంట్ stdoutకు వ్రాసినప్పుడు విడుదల చేయబడుతుంది.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI ఏజెంట్ stderrకు వ్రాసినప్పుడు విడుదల చేయబడుతుంది.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI ఏజెంట్ ప్రాసెస్ నిష్క్రమించినప్పుడు విడుదల చేయబడుతుంది.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI ఏజెంట్ ప్రాసెస్లో లోపం సంభవించినప్పుడు విడుదల చేయబడుతుంది.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## కాన్ఫిగరేషన్

### ఎన్విరాన్మెంట్ వేరియబుల్స్

ACP పేరెంట్ ప్రాసెస్ నుండి అన్ని ఎన్విరాన్మెంట్ వేరియబుల్స్ను పొందుతుంది మరియు కస్టమ్ ఎన్విరాన్మెంట్ వేరియబుల్స్తో విస్తరించవచ్చు:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### స్పాన్ ఆర్గ్యుమెంట్లు

ప్రతి ఏజెంట్కు రిజిస్ట్రీలో డిఫాల్ట్ స్పాన్ ఆర్గ్యుమెంట్లు నిర్వచించబడి ఉంటాయి. మీరు వాటిని ఓవర్రైడ్ చేయవచ్చు:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### టైమ్అవుట్లు

డిఫాల్ట్ ప్రాంప్ట్ టైమ్అవుట్ **120 సెకన్లు** (2 నిమిషాలు). మీరు దీన్ని ఓవర్రైడ్ చేయవచ్చు:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 నిమిషాలు
```

### డిటెక్షన్ క్యాష్

ఖరీదైన ఫైల్సిస్టమ్ స్కాన్లను నివారించడానికి ఏజెంట్ డిటెక్షన్ **60 సెకన్ల** పాటు క్యాష్ చేయబడుతుంది. బలవంతంగా రిఫ్రెష్ చేయడానికి:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## భద్రత

### కమాండ్ ఇంజెక్షన్ నివారణ

కమాండ్ ఇంజెక్షన్ దాడులను నివారించడానికి ACP వెర్షన్ కమాండ్లను ధ్రువీకరిస్తుంది:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

ఈ అక్షరాలను కలిగి ఉన్న వెర్షన్ కమాండ్లు తిరస్కరించబడతాయి:

- `;` — కమాండ్ విభాజకం
- `&` — బ్యాక్గ్రౌండ్ ప్రాసెస్
- `|` — పైప్
- `<`, `>` — రీడైరెక్షన్
- `` ` `` — కమాండ్ సబ్స్టిట్యూషన్
- `$` — వేరియబుల్ ఎక్స్పాన్షన్
- `\r`, `\n` — లైన్ బ్రేక్లు

### బైనరీ పేరు ధ్రువీకరణ

వెర్షన్ కమాండ్లోని బైనరీ పేరు ఆశించిన బైనరీ పేరుతో సరిపోలుతుందో లేదో ACP ధ్రువీకరిస్తుంది (అది కస్టమ్ ఏజెంట్ అయితే తప్ప).

### ప్రాసెస్ ఐసోలేషన్

ప్రతి ACP సెషన్ దాని స్వంత చైల్డ్ ప్రాసెస్లో నడుస్తుంది. సెషన్ ముగిసినప్పుడు లేదా టైమ్అవుట్ అయినప్పుడు ప్రాసెస్ నిలిపివేయబడుతుంది.

---

## పనితీరు

### డిటెక్షన్ పనితీరు

- **మొదటి కాల్**: ~50-200ms (ప్రతి ఏజెంట్ కోసం `version` కమాండ్ను అమలు చేస్తుంది)
- **క్యాష్ చేసిన కాల్స్**: <1ms (క్యాష్ నుండి తిరిగి ఇస్తుంది)
- **క్యాష్ TTL**: 60 సెకన్లు

### ప్రాంప్ట్ పనితీరు

- **స్పాన్**: ~50-100ms
- **ప్రాంప్ట్ పంపడం**: ~10-50ms
- **ప్రతిస్పందన కోసం వేచి ఉండటం**: CLI ఏజెంట్పై ఆధారపడి ఉంటుంది (సాధారణంగా 1-30 సెకన్లు)
- **నిలిపివేత**: ~5 సెకన్లు (SIGTERM) + తక్షణం (SIGKILL)

### వనరుల వినియోగం

- **ప్రతి సెషన్కు మెమరీ**: ~10-50MB (CLI ఏజెంట్పై ఆధారపడి ఉంటుంది)
- **CPU**: కనిష్ఠం (I/O ఆధారితం)
- **డిస్క్**: ఏదీ లేదు

---

## సమస్య పరిష్కారం

### "Unknown agent" లోపం

**సమస్య**: `acpManager.spawn()` అనేది `Unknown agent: <id>` లోపాన్ని విసురుతుంది

**పరిష్కారం**: `spawn()`లో ఈ ఏజెంట్లు మాత్రమే అనుమతించబడతారు:

- `claude`
- `codex`
- `gemini`
- `qwen`

ఇతర ఏజెంట్లను మాన్యువల్గా లేదా కస్టమ్ ఏజెంట్ నిర్వచనాల ద్వారా స్పాన్ చేయాలి.

### "Session not alive" లోపం

**సమస్య**: `acpManager.sendPrompt()` అనేది `Session ${sessionId} is not alive` లోపాన్ని విసురుతుంది

**పరిష్కారం**: సెషన్ నిష్క్రమించి ఉండవచ్చు లేదా నిలిపివేయబడి ఉండవచ్చు. సెషన్ స్థితిని తనిఖీ చేయండి:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // సెషన్ను మళ్లీ స్పాన్ చేయండి
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" లోపం

**సమస్య**: `acpManager.sendPrompt()` అనేది `ACP timeout after 120000ms` లోపాన్ని విసురుతుంది

**పరిష్కారం**: టైమ్అవుట్ను పెంచండి:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 నిమిషాలు
```

### CLI గుర్తించబడలేదు

**సమస్య**: `detectInstalledAgents()` మీ CLIని కనుగొనలేదు

**పరిష్కారాలు**:

1. **PATHను తనిఖీ చేయండి**: CLI మీ సిస్టమ్ PATHలో ఉందని నిర్ధారించుకోండి
2. **వెర్షన్ కమాండ్ను తనిఖీ చేయండి**: `claude --version`ను మాన్యువల్గా అమలు చేయండి
3. **అనుమతులను తనిఖీ చేయండి**: CLI అమలు చేయదగినదని నిర్ధారించుకోండి
4. **కస్టమ్ ఏజెంట్**: ప్రామాణికం కాని CLIల కోసం కస్టమ్ ఏజెంట్ నిర్వచనాన్ని జోడించండి

### అనుమతి నిరాకరించబడింది

**సమస్య**: ACP CLIని అమలు చేయలేకపోతోంది

**పరిష్కారాలు**:

1. **ఫైల్ అనుమతులను తనిఖీ చేయండి**: `chmod +x /usr/local/bin/claude`
2. **యాజమాన్యాన్ని తనిఖీ చేయండి**: OmniRouteకు చదవడానికి/అమలు చేయడానికి అనుమతులు ఉన్నాయని నిర్ధారించుకోండి
3. **SELinux/AppArmorను తనిఖీ చేయండి**: ఇవి ప్రాసెస్ స్పానింగ్ను నిరోధించవచ్చు

---

## ఉదాహరణలు

### ఉదాహరణ 1: Claude Codeను ప్రారంభించి ఉపయోగించడం

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// ఇన్స్టాల్ చేసిన ఏజెంట్లను గుర్తించండి
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // కొత్త సెషన్ను ప్రారంభించండి
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // ప్రాంప్ట్ను పంపండి
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // వనరులను శుభ్రం చేయండి
  acpManager.kill(session.id);
}
```

### ఉదాహరణ 2: ప్రత్యామ్నాయంతో స్వయంచాలక గుర్తింపు

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// ముందుగా Claudeను ప్రయత్నించండి, అది లేకపోతే Codexను ఉపయోగించండి
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

### ఉదాహరణ 3: అనుకూల ఏజెంట్

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// అనుకూల CLI ఏజెంట్ను నమోదు చేయండి
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

// ఇప్పుడు detectInstalledAgents()లో "my-llm-cli" కూడా ఉంటుంది
const agents = detectInstalledAgents();
```

---

## తర్వాత ఏమిటి?

- **[API సూచన](../reference/API_REFERENCE.md)** — REST API ఎండ్పాయింట్లు
- **[ప్రొవైడర్ సూచన](../reference/PROVIDER_REFERENCE.md)** — మొత్తం 352 ప్రొవైడర్లు
- **[MCP సర్వర్](./MCP-SERVER.md)** — Model Context Protocol ఏకీకరణ
- **[A2A సర్వర్](./A2A-SERVER.md)** — Agent-to-Agent ప్రోటోకాల్
- **[క్లౌడ్ ఏజెంట్](./CLOUD_AGENT.md)** — క్లౌడ్-ఆధారిత ఏజెంట్లు

---

## సూచన

- [AionUi ప్రాజెక్ట్](https://github.com/iOfficeAI/AionUi) — ACP స్వయంచాలక గుర్తింపునకు ప్రేరణ
- [ACP సోర్స్ కోడ్](../../src/lib/acp/) — అమలు వివరాలు
  - `manager.ts` — ప్రాసెస్ జీవితచక్ర నిర్వహణ
  - `registry.ts` — ఏజెంట్ గుర్తింపు మరియు నమోదు
  - `index.ts` — పబ్లిక్ API ఎగుమతులు
