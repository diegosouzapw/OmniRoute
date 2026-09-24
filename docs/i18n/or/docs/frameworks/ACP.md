# ACP (Agent Client Protocol) (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP, HTTP API ବ୍ୟବହାର କରିବା ପରିବର୍ତ୍ତେ OmniRouteକୁ CLI ଏଜେଣ୍ଟଗୁଡ଼ିକୁ (ଯେପରିକି Claude Code, Codex) ଚାଇଲ୍ଡ ପ୍ରୋସେସ୍ ଭାବେ ଆରମ୍ଭ କରିବାକୁ ଦିଏ। ଏହା ଆପଣଙ୍କୁ "CLI-as-backend" ଟ୍ରାନ୍ସପୋର୍ଟ ପ୍ରଦାନ କରେ।

---

## ACP କ’ଣ?

ACP (Agent Client Protocol) ହେଉଛି OmniRoute ପାଇଁ ଏକ **"CLI-as-backend" ଟ୍ରାନ୍ସପୋର୍ଟ**। AI ପ୍ରଦାନକାରୀଙ୍କ ପାଇଁ ହେଉଥିବା HTTP API କଲ୍ଗୁଡ଼ିକୁ ଇଣ୍ଟରସେପ୍ଟ କରିବା ପରିବର୍ତ୍ତେ, ACP **CLI ଏଜେଣ୍ଟଗୁଡ଼ିକୁ ଚାଇଲ୍ଡ ପ୍ରୋସେସ୍ ଭାବେ ଆରମ୍ଭ କରେ** ଏବଂ ସେମାନଙ୍କ ନେଟିଭ୍ ଇଣ୍ଟରଫେସ୍ ମାଧ୍ୟମରେ ପ୍ରମ୍ପ୍ଟ ପ୍ରଦାନ କରେ।

### ACP କାହିଁକି ବ୍ୟବହାର କରିବେ?

| ଲାଭ                       | ବର୍ଣ୍ଣନା                                                  |
| ------------------------- | --------------------------------------------------------- |
| **API କୀ ଆବଶ୍ୟକ ନାହିଁ**   | ଆପଣଙ୍କ ବର୍ତ୍ତମାନର CLI ପ୍ରମାଣୀକରଣ ବ୍ୟବହାର କରେ              |
| **ନେଟିଭ୍ ପ୍ରୋଟୋକଲ୍**      | ପ୍ରତ୍ୟେକ CLIର ନେଟିଭ୍ ଇନ୍ପୁଟ୍/ଆଉଟ୍ପୁଟ୍ ଫର୍ମାଟ୍ ବ୍ୟବହାର କରେ |
| **ସ୍ୱୟଂଚାଳିତ ଆବିଷ୍କାର**   | ଆପଣଙ୍କ ସିଷ୍ଟମ୍ରେ ଇନ୍ଷ୍ଟଲ୍ ହୋଇଥିବା CLIଗୁଡ଼ିକୁ ଚିହ୍ନଟ କରେ   |
| **15ଟି ବିଲ୍ଟ-ଇନ୍ ଏଜେଣ୍ଟ** | ଲୋକପ୍ରିୟ CLI ଟୁଲ୍ଗୁଡ଼ିକ ପାଇଁ ପୂର୍ବରୁ କନ୍ଫିଗର୍ ହୋଇଛି       |
| **କଷ୍ଟମ୍ ଏଜେଣ୍ଟ**         | ସେଟିଂସ୍ ମାଧ୍ୟମରେ ନିଜର CLI ଟୁଲ୍ଗୁଡ଼ିକ ଯୋଡ଼ନ୍ତୁ             |
| **ପ୍ରୋସେସ୍ ପରିଚାଳନା**     | ଲାଇଫ୍ସାଇକଲ୍ ପରିଚାଳନା କରେ (ଆରମ୍ଭ, ପଠାଇବା, ବନ୍ଦ କରିବା)      |

---

## ସମର୍ଥିତ CLI ଏଜେଣ୍ଟ

ACP ଡିଫଲ୍ଟ ଭାବେ **15ଟି ବିଲ୍ଟ-ଇନ୍ CLI ଏଜେଣ୍ଟ** ସମର୍ଥନ କରେ:

| ଏଜେଣ୍ଟ ID     | ପ୍ରଦର୍ଶିତ ନାମ      | ବାଇନାରି       | ପ୍ରୋଟୋକଲ୍ |
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

### କଷ୍ଟମ୍ ଏଜେଣ୍ଟ

ଆପଣ ସେଟିଂସ୍ ମାଧ୍ୟମରେ ନିଜର CLI ଏଜେଣ୍ଟଗୁଡ଼ିକ ଯୋଡ଼ିପାରିବେ। କଷ୍ଟମ୍ ଏଜେଣ୍ଟଗୁଡ଼ିକ ବିଲ୍ଟ-ଇନ୍ ଏଜେଣ୍ଟମାନଙ୍କ ପରି ସମାନ ବୈଶିଷ୍ଟ୍ୟ ସମର୍ଥନ କରନ୍ତି।

---

## ଶୀଘ୍ର ଆରମ୍ଭ

### ପଦକ୍ଷେପ 1: ଏକ CLI ଏଜେଣ୍ଟ ଇନ୍ଷ୍ଟଲ୍ କରନ୍ତୁ

```bash
# ଉଦାହରଣ: Claude Code CLI ଇନ୍ଷ୍ଟଲ୍ କରନ୍ତୁ
npm install -g @anthropic-ai/claude-code

# ଇନ୍ଷ୍ଟଲେସନ୍ ଯାଞ୍ଚ କରନ୍ତୁ
claude --version
```

### ପଦକ୍ଷେପ 2: ACP ସ୍ୱୟଂଚାଳିତ ଚିହ୍ନଟ

ACP ଆପଣଙ୍କ ସିଷ୍ଟମ୍ରେ ଇନ୍ଷ୍ଟଲ୍ ହୋଇଥିବା CLI ଏଜେଣ୍ଟଗୁଡ଼ିକୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଚିହ୍ନଟ କରେ। କୌଣସି କନ୍ଫିଗରେସନ୍ ଆବଶ୍ୟକ ନାହିଁ!

### ପଦକ୍ଷେପ 3: ACP ଟ୍ରାନ୍ସପୋର୍ଟ ବ୍ୟବହାର କରନ୍ତୁ

ଚିହ୍ନଟ ହୋଇଗଲା ପରେ, ACPକୁ ଯେକୌଣସି ସମର୍ଥିତ ପ୍ରଦାନକାରୀ ପାଇଁ ଏକ ଟ୍ରାନ୍ସପୋର୍ଟ ଭାବେ ବ୍ୟବହାର କରାଯାଇପାରିବ। CLI ଉପଲବ୍ଧ ଥିଲେ OmniRoute ସ୍ୱୟଂଚାଳିତ ଭାବେ ACP ବ୍ୟବହାର କରିବ।

---

## ACP କିପରି କାମ କରେ

### ଆର୍କିଟେକ୍ଚର୍

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP ପ୍ରକ୍ସି) │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  ଚାଇଲ୍ଡ ପ୍ରୋସେସ୍ │
│  (CLI ଏଜେଣ୍ଟ)   │
│                 │
│  stdin  ◄──────┤  ପ୍ରମ୍ପ୍ଟ ପଠାନ୍ତୁ
│  stdout ──────►│  ପ୍ରତିକ୍ରିୟା ଗ୍ରହଣ କରନ୍ତୁ
│  stderr ──────►│  ତ୍ରୁଟି ଗ୍ରହଣ କରନ୍ତୁ
└─────────────────┘
```

### ପ୍ରୋସେସ୍ ଲାଇଫ୍ସାଇକଲ୍

1. **ଆରମ୍ଭ** — ACP, CLI ଏଜେଣ୍ଟ ପାଇଁ ଏକ ଚାଇଲ୍ଡ ପ୍ରୋସେସ୍ ସୃଷ୍ଟି କରେ
2. **ପଠାଇବା** — ACP ପ୍ରୋସେସ୍ର stdinକୁ ପ୍ରମ୍ପ୍ଟ ଲେଖେ
3. **ଗ୍ରହଣ** — ACP stdout/stderrରୁ ପ୍ରତିକ୍ରିୟା ପଢ଼େ
4. **ନିଷ୍କ୍ରିୟତା ଚିହ୍ନଟ** — ପ୍ରତିକ୍ରିୟାକୁ ସମ୍ପୂର୍ଣ୍ଣ ବୋଲି ବିବେଚନା କରିବା ପୂର୍ବରୁ ACP 2 ସେକେଣ୍ଡର ନିଷ୍କ୍ରିୟତା ପାଇଁ ଅପେକ୍ଷା କରେ
5. **ବନ୍ଦ କରିବା** — ACP ପ୍ରୋସେସ୍କୁ ସମାପ୍ତ କରେ (SIGTERM, ତା’ପରେ 5s ପରେ SIGKILL)

### ଯୋଗାଯୋଗ ପ୍ରୋଟୋକଲ୍

ACP, CLI ଏଜେଣ୍ଟଗୁଡ଼ିକ ସହିତ ଯୋଗାଯୋଗ ପାଇଁ **stdio** (ଷ୍ଟାଣ୍ଡାର୍ଡ ଇନ୍ପୁଟ୍/ଆଉଟ୍ପୁଟ୍) ବ୍ୟବହାର କରେ। ପ୍ରୋଟୋକଲ୍ଟି ହେଉଛି:

1. **ପ୍ରମ୍ପ୍ଟ ପଠାଇବା** — ଏକ ନୂଆ ଲାଇନ୍ ସହିତ stdinକୁ ଲେଖନ୍ତୁ
2. **ପ୍ରତିକ୍ରିୟା ପାଇଁ ଅପେକ୍ଷା** — ନିଷ୍କ୍ରିୟ ହେବା ପର୍ଯ୍ୟନ୍ତ stdoutରୁ ପଢ଼ନ୍ତୁ (2s ପର୍ଯ୍ୟନ୍ତ କୌଣସି ଆଉଟ୍ପୁଟ୍ ନ ମିଳିବା)
3. **ଟାଇମ୍ଆଉଟ୍** — ଡିଫଲ୍ଟ ଭାବେ 120 ସେକେଣ୍ଡ (କନ୍ଫିଗର୍ କରାଯାଇପାରିବ)

---

## API ସନ୍ଦର୍ଭ

### ରେଜିଷ୍ଟ୍ରି ଫଙ୍କସନ୍ଗୁଡ଼ିକ

#### `detectInstalledAgents()`

ସିଷ୍ଟମ୍ରେ ଇନ୍ଷ୍ଟଲ୍ ହୋଇଥିବା ସମସ୍ତ CLI ଏଜେଣ୍ଟକୁ ଚିହ୍ନଟ କରେ। ଫଳାଫଳଗୁଡ଼ିକୁ 60 ସେକେଣ୍ଡ ପାଇଁ କ୍ୟାଶ୍ କରାଯାଏ।

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// ଫେରାଏ: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // ଉଦାହରଣସ୍ୱରୂପ, "codex", "claude"
  name: string; // ପ୍ରଦର୍ଶନ ନାମ
  binary: string; // ସ୍ପନ୍ କରିବାକୁ ବାଇନାରି ନାମ
  versionCommand: string; // ସଂସ୍କରଣ ଚିହ୍ନଟ କମାଣ୍ଡ
  version: string | null; // ଚିହ୍ନଟ ହୋଇଥିବା ସଂସ୍କରଣ (ଇନ୍ଷ୍ଟଲ୍ ହୋଇନଥିଲେ null)
  installed: boolean; // ଏଜେଣ୍ଟଟି ଇନ୍ଷ୍ଟଲ୍ ହୋଇଛି କି ନାହିଁ
  providerAlias: string; // OmniRouteରେ ପ୍ରଦାନକାରୀ ID
  spawnArgs: string[]; // ସ୍ପନ୍ କରିବା ସମୟରେ ପାସ୍ କରାଯିବା ଆର୍ଗୁମେଣ୍ଟଗୁଡ଼ିକ
  protocol: "stdio" | "http"; // ଯୋଗାଯୋଗ ପ୍ରୋଟୋକଲ୍
  isCustom?: boolean; // ଏହା ଉପଯୋଗକର୍ତ୍ତା-ପରିଭାଷିତ କଷ୍ଟମ୍ ଏଜେଣ୍ଟ କି ନାହିଁ
}
```

#### `getAvailableAgents()`

କେବଳ ଇନ୍ଷ୍ଟଲ୍ ହୋଇଥିବା ଏବଂ ACP ପାଇଁ ଉପଲବ୍ଧ ଏଜେଣ୍ଟଗୁଡ଼ିକୁ ପ୍ରାପ୍ତ କରେ।

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// ଫେରାଏ: CliAgentInfo[] (କେବଳ ଇନ୍ଷ୍ଟଲ୍ ହୋଇଥିବା ଏଜେଣ୍ଟଗୁଡ଼ିକ)
```

#### `getAgentById(id)`

ID ଦ୍ୱାରା ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ ଏଜେଣ୍ଟକୁ ପ୍ରାପ୍ତ କରେ।

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// ଫେରାଏ: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

ସେଟିଂସ୍ରୁ କଷ୍ଟମ୍ ଏଜେଣ୍ଟ ସଂଜ୍ଞାଗୁଡ଼ିକ ସେଟ୍ କରେ।

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

### ମ୍ୟାନେଜର୍ ଫଙ୍କସନ୍ଗୁଡ଼ିକ

#### `acpManager.spawn(agentId, binary, args, env)`

ଏକ ନୂତନ CLI ଏଜେଣ୍ଟ ପ୍ରକ୍ରିୟା ସ୍ପନ୍ କରେ।

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* କଷ୍ଟମ୍ ପରିବେଶ ଭେରିଏବଲ୍ଗୁଡ଼ିକ */
});
// ଫେରାଏ: AcpSession
```

**ଅନୁମୋଦିତ ଏଜେଣ୍ଟ IDଗୁଡ଼ିକ**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

ଏକ CLI ଏଜେଣ୍ଟକୁ ପ୍ରମ୍ପ୍ଟ ପଠାଏ ଏବଂ ପ୍ରତିକ୍ରିୟା ସଂଗ୍ରହ କରେ।

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 ମିନିଟ୍ର ସମୟସୀମା
);
// ଫେରାଏ: Promise<string>
```

#### `acpManager.kill(sessionId)`

ଏକ ସେସନ୍କୁ ସମାପ୍ତ କରେ ଏବଂ ସଫା କରେ।

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// ଫେରାଏ: boolean
```

#### `acpManager.getActiveSessions()`

ସମସ୍ତ ସକ୍ରିୟ ସେସନ୍ ପ୍ରାପ୍ତ କରେ।

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// ଫେରାଏ: AcpSession[]
```

#### `acpManager.killAll()`

ସମସ୍ତ ସେସନ୍କୁ ସମାପ୍ତ କରେ।

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### ସେସନ୍ ଇଣ୍ଟରଫେସ୍

```typescript
interface AcpSession {
  id: string; // ଅନନ୍ୟ ସେସନ୍ ID
  agentId: string; // ଏଜେଣ୍ଟ ID (ଉଦାହରଣସ୍ୱରୂପ, "claude")
  process: ChildProcess; // ଚାଇଲ୍ଡ ପ୍ରୋସେସ୍ ହ୍ୟାଣ୍ଡଲ୍
  alive: boolean; // ପ୍ରକ୍ରିୟାଟି ସକ୍ରିୟ ଅଛି କି ନାହିଁ
  stdoutBuffer: string; // ସଞ୍ଚିତ stdout ବଫର୍
  stderrBuffer: string; // ସଞ୍ଚିତ stderr ବଫର୍
  createdAt: Date; // ସୃଷ୍ଟି ହୋଇଥିବା ସମୟର ଟାଇମ୍ଷ୍ଟାମ୍ପ
}
```

### ଇଭେଣ୍ଟଗୁଡ଼ିକ

`AcpManager`, `EventEmitter`କୁ ବିସ୍ତାର କରେ ଏବଂ ନିମ୍ନଲିଖିତ ଇଭେଣ୍ଟଗୁଡ଼ିକ ନିର୍ଗତ କରେ:

#### `stdout`

CLI ଏଜେଣ୍ଟ stdoutକୁ ଲେଖିବା ସମୟରେ ନିର୍ଗତ ହୁଏ।

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI ଏଜେଣ୍ଟ stderrକୁ ଲେଖିବା ସମୟରେ ନିର୍ଗତ ହୁଏ।

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI ଏଜେଣ୍ଟ ପ୍ରକ୍ରିୟା ବନ୍ଦ ହେବା ସମୟରେ ନିର୍ଗତ ହୁଏ।

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI ଏଜେଣ୍ଟ ପ୍ରକ୍ରିୟାରେ ତ୍ରୁଟି ଘଟିବା ସମୟରେ ନିର୍ଗତ ହୁଏ।

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## ବିନ୍ୟାସ

### ପରିବେଶ ଭେରିଏବଲ୍ଗୁଡ଼ିକ

ACP ପ୍ୟାରେଣ୍ଟ ପ୍ରକ୍ରିୟାରୁ ସମସ୍ତ ପରିବେଶ ଭେରିଏବଲ୍ ଉତ୍ତରାଧିକାର ସୂତ୍ରରେ ପାଏ ଏବଂ କଷ୍ଟମ୍ env vars ଦ୍ୱାରା ଏହାକୁ ବିସ୍ତାର କରାଯାଇପାରେ:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### ସ୍ପନ୍ ଆର୍ଗୁମେଣ୍ଟଗୁଡ଼ିକ

ପ୍ରତ୍ୟେକ ଏଜେଣ୍ଟ ପାଇଁ ରେଜିଷ୍ଟ୍ରିରେ ଡିଫଲ୍ଟ ସ୍ପନ୍ ଆର୍ଗୁମେଣ୍ଟଗୁଡ଼ିକ ପରିଭାଷିତ ହୋଇଛି। ଆପଣ ସେଗୁଡ଼ିକୁ ଓଭରରାଇଡ୍ କରିପାରିବେ:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### ସମୟସୀମା

ଡିଫଲ୍ଟ ପ୍ରମ୍ପ୍ଟ ସମୟସୀମା ହେଉଛି **120 ସେକେଣ୍ଡ** (2 ମିନିଟ୍)। ଆପଣ ଏହାକୁ ଓଭରରାଇଡ୍ କରିପାରିବେ:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 ମିନିଟ୍
```

### ଚିହ୍ନଟ କ୍ୟାଶ୍

ବ୍ୟୟବହୁଳ ଫାଇଲ୍ସିଷ୍ଟମ୍ ସ୍କାନ୍ଗୁଡ଼ିକୁ ଏଡ଼ାଇବା ପାଇଁ ଏଜେଣ୍ଟ ଚିହ୍ନଟକୁ **60 ସେକେଣ୍ଡ** ପାଇଁ କ୍ୟାଶ୍ କରାଯାଏ। ବାଧ୍ୟତାମୂଳକ ଭାବେ ରିଫ୍ରେଶ୍ କରିବା ପାଇଁ:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## ସୁରକ୍ଷା

### କମାଣ୍ଡ ଇଞ୍ଜେକ୍ସନ୍ ପ୍ରତିରୋଧ

କମାଣ୍ଡ ଇଞ୍ଜେକ୍ସନ୍ ଆକ୍ରମଣଗୁଡ଼ିକୁ ପ୍ରତିରୋଧ କରିବା ପାଇଁ ACP ଭର୍ସନ୍ କମାଣ୍ଡଗୁଡ଼ିକୁ ବୈଧତା ଯାଞ୍ଚ କରେ:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

ଏହି ବର୍ଣ୍ଣଗୁଡ଼ିକ ଥିବା ଭର୍ସନ୍ କମାଣ୍ଡଗୁଡ଼ିକୁ ପ୍ରତ୍ୟାଖ୍ୟାନ କରାଯାଏ:

- `;` — କମାଣ୍ଡ ବିଭାଜକ
- `&` — ବ୍ୟାକ୍ଗ୍ରାଉଣ୍ଡ ପ୍ରକ୍ରିୟା
- `|` — ପାଇପ୍
- `<`, `>` — ପୁନଃନିର୍ଦ୍ଦେଶନ
- `` ` `` — କମାଣ୍ଡ ପ୍ରତିସ୍ଥାପନ
- `$` — ଭେରିଏବଲ୍ ବିସ୍ତାର
- `\r`, `\n` — ଲାଇନ୍ ବିରତି

### ବାଇନାରି ନାମର ବୈଧତା ଯାଞ୍ଚ

ACP ଭର୍ସନ୍ କମାଣ୍ଡର ବାଇନାରି ଆଶାକରାଯାଇଥିବା ବାଇନାରି ନାମ ସହ ମେଳ ଖାଉଛି କି ନାହିଁ ବୈଧତା ଯାଞ୍ଚ କରେ (ଯଦି ଏହା ଏକ କଷ୍ଟମ୍ ଏଜେଣ୍ଟ ନୁହେଁ)।

### ପ୍ରକ୍ରିୟା ପୃଥକୀକରଣ

ପ୍ରତ୍ୟେକ ACP ସେସନ୍ ନିଜସ୍ୱ ଚାଇଲ୍ଡ ପ୍ରୋସେସ୍ରେ ଚାଲେ। ସେସନ୍ ସମାପ୍ତ ହେଲେ କିମ୍ବା ସମୟସୀମା ଅତିକ୍ରମ କଲେ ପ୍ରକ୍ରିୟାକୁ ବନ୍ଦ କରାଯାଏ।

---

## କାର୍ଯ୍ୟଦକ୍ଷତା

### ଚିହ୍ନଟ କାର୍ଯ୍ୟଦକ୍ଷତା

- **ପ୍ରଥମ କଲ୍**: ~50-200ms (ପ୍ରତ୍ୟେକ ଏଜେଣ୍ଟ ପାଇଁ `version` କମାଣ୍ଡ ଚଲାଏ)
- **କ୍ୟାଶ୍ ହୋଇଥିବା କଲ୍ଗୁଡ଼ିକ**: <1ms (କ୍ୟାଶ୍ରୁ ଫେରାଏ)
- **କ୍ୟାଶ୍ TTL**: 60 ସେକେଣ୍ଡ

### ପ୍ରମ୍ପ୍ଟ କାର୍ଯ୍ୟଦକ୍ଷତା

- **ସ୍ପନ୍**: ~50-100ms
- **ପ୍ରମ୍ପ୍ଟ ପଠାଇବା**: ~10-50ms
- **ପ୍ରତିକ୍ରିୟା ପାଇଁ ଅପେକ୍ଷା**: CLI ଏଜେଣ୍ଟ ଉପରେ ନିର୍ଭର କରେ (ସାଧାରଣତଃ 1-30 ସେକେଣ୍ଡ)
- **ବନ୍ଦ କରିବା**: ~5 ସେକେଣ୍ଡ (SIGTERM) + ତତ୍କ୍ଷଣାତ୍ (SIGKILL)

### ସମ୍ବଳ ବ୍ୟବହାର

- **ପ୍ରତି ସେସନ୍ର ମେମୋରି**: ~10-50MB (CLI ଏଜେଣ୍ଟ ଉପରେ ନିର୍ଭର କରେ)
- **CPU**: ନ୍ୟୂନତମ (I/O ନିର୍ଭରଶୀଳ)
- **ଡିସ୍କ**: କିଛି ନାହିଁ

---

## ସମସ୍ୟା ନିବାରଣ

### "Unknown agent" ତ୍ରୁଟି

**ସମସ୍ୟା**: `acpManager.spawn()` ଦ୍ୱାରା `Unknown agent: <id>` ତ୍ରୁଟି ଉତ୍ପନ୍ନ ହୁଏ

**ସମାଧାନ**: `spawn()`ରେ କେବଳ ଏହି ଏଜେଣ୍ଟଗୁଡ଼ିକୁ ଅନୁମତି ଦିଆଯାଇଛି:

- `claude`
- `codex`
- `gemini`
- `qwen`

ଅନ୍ୟ ଏଜେଣ୍ଟଗୁଡ଼ିକୁ ମାନୁଆଲ୍ ଭାବେ କିମ୍ବା କଷ୍ଟମ୍ ଏଜେଣ୍ଟ ପରିଭାଷା ମାଧ୍ୟମରେ ସ୍ପନ୍ କରିବାକୁ ପଡ଼ିବ।

### "Session not alive" ତ୍ରୁଟି

**ସମସ୍ୟା**: `acpManager.sendPrompt()` ଦ୍ୱାରା `Session ${sessionId} is not alive` ତ୍ରୁଟି ଉତ୍ପନ୍ନ ହୁଏ

**ସମାଧାନ**: ସେସନ୍ଟି ପ୍ରସ୍ଥାନ କରିଥାଇପାରେ କିମ୍ବା ବନ୍ଦ କରାଯାଇଥାଇପାରେ। ସେସନ୍ର ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // ସେସନ୍କୁ ପୁନଃ ସ୍ପନ୍ କରନ୍ତୁ
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" ତ୍ରୁଟି

**ସମସ୍ୟା**: `acpManager.sendPrompt()` ଦ୍ୱାରା `ACP timeout after 120000ms` ତ୍ରୁଟି ଉତ୍ପନ୍ନ ହୁଏ

**ସମାଧାନ**: ସମୟସୀମା ବୃଦ୍ଧି କରନ୍ତୁ:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 ମିନିଟ୍
```

### CLI ଚିହ୍ନଟ ହେଉନାହିଁ

**ସମସ୍ୟା**: `detectInstalledAgents()` ଆପଣଙ୍କ CLIକୁ ଖୋଜିପାରୁନାହିଁ

**ସମାଧାନଗୁଡ଼ିକ**:

1. **PATH ଯାଞ୍ଚ କରନ୍ତୁ**: CLIଟି ଆପଣଙ୍କ ସିଷ୍ଟମ୍ PATHରେ ଥିବା ସୁନିଶ୍ଚିତ କରନ୍ତୁ
2. **ଭର୍ସନ୍ କମାଣ୍ଡ ଯାଞ୍ଚ କରନ୍ତୁ**: ମାନୁଆଲ୍ ଭାବେ `claude --version` ଚଲାନ୍ତୁ
3. **ଅନୁମତିଗୁଡ଼ିକ ଯାଞ୍ଚ କରନ୍ତୁ**: CLIଟି ଏକ୍ସିକ୍ୟୁଟେବଲ୍ ଥିବା ସୁନିଶ୍ଚିତ କରନ୍ତୁ
4. **କଷ୍ଟମ୍ ଏଜେଣ୍ଟ**: ଅଣ-ମାନକ CLIଗୁଡ଼ିକ ପାଇଁ ଏକ କଷ୍ଟମ୍ ଏଜେଣ୍ଟ ପରିଭାଷା ଯୋଡ଼ନ୍ତୁ

### ଅନୁମତି ପ୍ରତ୍ୟାଖ୍ୟାନ

**ସମସ୍ୟା**: ACP, CLIକୁ ଏକ୍ସିକ୍ୟୁଟ୍ କରିପାରୁନାହିଁ

**ସମାଧାନଗୁଡ଼ିକ**:

1. **ଫାଇଲ୍ ଅନୁମତିଗୁଡ଼ିକ ଯାଞ୍ଚ କରନ୍ତୁ**: `chmod +x /usr/local/bin/claude`
2. **ମାଲିକାନା ଯାଞ୍ଚ କରନ୍ତୁ**: OmniRoute ପାଖରେ ପଢ଼ିବା/ଏକ୍ସିକ୍ୟୁଟ୍ କରିବାର ଅନୁମତି ଥିବା ସୁନିଶ୍ଚିତ କରନ୍ତୁ
3. **SELinux/AppArmor ଯାଞ୍ଚ କରନ୍ତୁ**: ଏଗୁଡ଼ିକ ପ୍ରକ୍ରିୟା ସ୍ପନିଂକୁ ଅବରୋଧ କରିପାରନ୍ତି

---

## ଉଦାହରଣଗୁଡ଼ିକ

### ଉଦାହରଣ 1: Claude Code ଆରମ୍ଭ ଏବଂ ବ୍ୟବହାର କରିବା

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// ଇନଷ୍ଟଲ୍ ହୋଇଥିବା ଏଜେଣ୍ଟଗୁଡ଼ିକୁ ଚିହ୍ନଟ କରନ୍ତୁ
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // ଏକ ନୂତନ ସେସନ୍ ଆରମ୍ଭ କରନ୍ତୁ
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // ଏକ ପ୍ରମ୍ପ୍ଟ ପଠାନ୍ତୁ
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // ସଫା କରନ୍ତୁ
  acpManager.kill(session.id);
}
```

### ଉଦାହରଣ 2: ଫଲ୍ବ୍ୟାକ୍ ସହିତ ସ୍ୱୟଂଚାଳିତ ଅନ୍ୱେଷଣ

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// ପ୍ରଥମେ Claude ଚେଷ୍ଟା କରନ୍ତୁ, ବିଫଳ ହେଲେ Codex ବ୍ୟବହାର କରନ୍ତୁ
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

### ଉଦାହରଣ 3: କଷ୍ଟମ୍ ଏଜେଣ୍ଟ

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// ଏକ କଷ୍ଟମ୍ CLI ଏଜେଣ୍ଟ ପଞ୍ଜୀକୃତ କରନ୍ତୁ
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

// ବର୍ତ୍ତମାନ detectInstalledAgents() ମଧ୍ୟରେ "my-llm-cli" ଅନ୍ତର୍ଭୁକ୍ତ ହେବ
const agents = detectInstalledAgents();
```

---

## ପରବର୍ତ୍ତୀ କ’ଣ?

- **[API ସନ୍ଦର୍ଭ](../reference/API_REFERENCE.md)** — REST API ଏଣ୍ଡପଏଣ୍ଟଗୁଡ଼ିକ
- **[ପ୍ରଦାନକାରୀ ସନ୍ଦର୍ଭ](../reference/PROVIDER_REFERENCE.md)** — ସମସ୍ତ 352 ପ୍ରଦାନକାରୀ
- **[MCP ସର୍ଭର](./MCP-SERVER.md)** — Model Context Protocol ସମନ୍ୱୟ
- **[A2A ସର୍ଭର](./A2A-SERVER.md)** — ଏଜେଣ୍ଟ-ରୁ-ଏଜେଣ୍ଟ ପ୍ରୋଟୋକଲ୍
- **[କ୍ଲାଉଡ୍ ଏଜେଣ୍ଟ](./CLOUD_AGENT.md)** — କ୍ଲାଉଡ୍-ଆଧାରିତ ଏଜେଣ୍ଟଗୁଡ଼ିକ

---

## ସନ୍ଦର୍ଭ

- [AionUi ପ୍ରକଳ୍ପ](https://github.com/iOfficeAI/AionUi) — ACP ସ୍ୱୟଂଚାଳିତ ଚିହ୍ନଟ ପାଇଁ ପ୍ରେରଣା
- [ACP ସୋର୍ସ କୋଡ୍](../../src/lib/acp/) — କାର୍ଯ୍ୟାନ୍ୱୟନ ବିବରଣୀ
  - `manager.ts` — ପ୍ରକ୍ରିୟା ଜୀବନଚକ୍ର ପରିଚାଳନା
  - `registry.ts` — ଏଜେଣ୍ଟ ଅନ୍ୱେଷଣ ଏବଂ ପଞ୍ଜୀକରଣ
  - `index.ts` — ସାର୍ବଜନୀନ API ଏକ୍ସପୋର୍ଟଗୁଡ଼ିକ
