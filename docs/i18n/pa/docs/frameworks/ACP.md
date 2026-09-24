# ACP (Agent Client Protocol) (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP, OmniRoute ਨੂੰ HTTP APIs ਵਰਤਣ ਦੀ ਬਜਾਏ CLI ਏਜੰਟਾਂ (ਜਿਵੇਂ Claude Code, Codex) ਨੂੰ ਚਾਈਲਡ ਪ੍ਰੋਸੈਸਾਂ ਵਜੋਂ ਸ਼ੁਰੂ ਕਰਨ ਦਿੰਦਾ ਹੈ। ਇਸ ਨਾਲ ਤੁਹਾਨੂੰ "CLI-as-backend" ਟ੍ਰਾਂਸਪੋਰਟ ਮਿਲਦਾ ਹੈ।

---

## ACP ਕੀ ਹੈ?

ACP (Agent Client Protocol), OmniRoute ਲਈ ਇੱਕ **"CLI-as-backend" ਟ੍ਰਾਂਸਪੋਰਟ** ਹੈ। AI ਪ੍ਰਦਾਤਾਵਾਂ ਨੂੰ ਕੀਤੀਆਂ HTTP API ਕਾਲਾਂ ਨੂੰ ਇੰਟਰਸੈਪਟ ਕਰਨ ਦੀ ਬਜਾਏ, ACP **CLI ਏਜੰਟਾਂ ਨੂੰ ਚਾਈਲਡ ਪ੍ਰੋਸੈਸਾਂ ਵਜੋਂ ਸ਼ੁਰੂ ਕਰਦਾ ਹੈ** ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਮੂਲ ਇੰਟਰਫੇਸ ਰਾਹੀਂ ਪ੍ਰੌਂਪਟ ਭੇਜਦਾ ਹੈ।

### ACP ਕਿਉਂ ਵਰਤੀਏ?

| ਲਾਭ                         | ਵੇਰਵਾ                                                |
| --------------------------- | ---------------------------------------------------- |
| **API ਕੁੰਜੀਆਂ ਦੀ ਲੋੜ ਨਹੀਂ** | ਤੁਹਾਡੀ ਮੌਜੂਦਾ CLI ਪ੍ਰਮਾਣਿਕਤਾ ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ        |
| **ਮੂਲ ਪ੍ਰੋਟੋਕੋਲ**           | ਹਰ CLI ਦੇ ਮੂਲ ਇਨਪੁੱਟ/ਆਉਟਪੁੱਟ ਫਾਰਮੈਟ ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ |
| **ਆਟੋਮੈਟਿਕ ਖੋਜ**            | ਤੁਹਾਡੇ ਸਿਸਟਮ ਉੱਤੇ ਇੰਸਟਾਲ ਕੀਤੇ CLI ਖੋਜਦਾ ਹੈ           |
| **15 ਬਿਲਟ-ਇਨ ਏਜੰਟ**         | ਪ੍ਰਸਿੱਧ CLI ਟੂਲਾਂ ਲਈ ਪਹਿਲਾਂ ਤੋਂ ਸੰਰਚਿਤ               |
| **ਕਸਟਮ ਏਜੰਟ**               | ਸੈਟਿੰਗਾਂ ਰਾਹੀਂ ਆਪਣੇ CLI ਟੂਲ ਸ਼ਾਮਲ ਕਰੋ                |
| **ਪ੍ਰੋਸੈਸ ਪ੍ਰਬੰਧਨ**         | ਜੀਵਨ-ਚੱਕਰ (ਸ਼ੁਰੂ ਕਰਨਾ, ਭੇਜਣਾ, ਸਮਾਪਤ ਕਰਨਾ) ਸੰਭਾਲਦਾ ਹੈ |

---

## ਸਮਰਥਿਤ CLI ਏਜੰਟ

ACP ਮੂਲ ਰੂਪ ਵਿੱਚ **15 ਬਿਲਟ-ਇਨ CLI ਏਜੰਟਾਂ** ਦਾ ਸਮਰਥਨ ਕਰਦਾ ਹੈ:

| ਏਜੰਟ ID       | ਪ੍ਰਦਰਸ਼ਿਤ ਨਾਮ      | ਬਾਈਨਰੀ        | ਪ੍ਰੋਟੋਕੋਲ |
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

### ਕਸਟਮ ਏਜੰਟ

ਤੁਸੀਂ ਸੈਟਿੰਗਾਂ ਰਾਹੀਂ ਆਪਣੇ CLI ਏਜੰਟ ਸ਼ਾਮਲ ਕਰ ਸਕਦੇ ਹੋ। ਕਸਟਮ ਏਜੰਟ ਬਿਲਟ-ਇਨ ਏਜੰਟਾਂ ਵਾਲੀਆਂ ਹੀ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਦਾ ਸਮਰਥਨ ਕਰਦੇ ਹਨ।

---

## ਤੁਰੰਤ ਸ਼ੁਰੂਆਤ

### ਕਦਮ 1: ਇੱਕ CLI ਏਜੰਟ ਇੰਸਟਾਲ ਕਰੋ

```bash
# ਉਦਾਹਰਨ: Claude Code CLI ਇੰਸਟਾਲ ਕਰੋ
npm install -g @anthropic-ai/claude-code

# ਇੰਸਟਾਲੇਸ਼ਨ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ
claude --version
```

### ਕਦਮ 2: ACP ਆਟੋਮੈਟਿਕ ਖੋਜ

ACP ਤੁਹਾਡੇ ਸਿਸਟਮ ਉੱਤੇ ਇੰਸਟਾਲ ਕੀਤੇ CLI ਏਜੰਟਾਂ ਨੂੰ ਆਪਣੇ ਆਪ ਖੋਜ ਲੈਂਦਾ ਹੈ। ਕਿਸੇ ਸੰਰਚਨਾ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ!

### ਕਦਮ 3: ACP ਟ੍ਰਾਂਸਪੋਰਟ ਵਰਤੋ

ਖੋਜ ਹੋ ਜਾਣ ਤੋਂ ਬਾਅਦ, ACP ਨੂੰ ਕਿਸੇ ਵੀ ਸਮਰਥਿਤ ਪ੍ਰਦਾਤਾ ਲਈ ਟ੍ਰਾਂਸਪੋਰਟ ਵਜੋਂ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ। CLI ਉਪਲਬਧ ਹੋਣ ਉੱਤੇ OmniRoute ਆਪਣੇ ਆਪ ACP ਦੀ ਵਰਤੋਂ ਕਰੇਗਾ।

---

## ACP ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ

### ਆਰਕੀਟੈਕਚਰ

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP ਪ੍ਰਾਕਸੀ)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  ਚਾਈਲਡ ਪ੍ਰੋਸੈਸ  │
│  (CLI ਏਜੰਟ)    │
│                 │
│  stdin  ◄──────┤  ਪ੍ਰੌਂਪਟ ਭੇਜੋ
│  stdout ──────►│  ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰੋ
│  stderr ──────►│  ਗਲਤੀਆਂ ਪ੍ਰਾਪਤ ਕਰੋ
└─────────────────┘
```

### ਪ੍ਰੋਸੈਸ ਦਾ ਜੀਵਨ-ਚੱਕਰ

1. **ਸ਼ੁਰੂ ਕਰਨਾ** — ACP, CLI ਏਜੰਟ ਲਈ ਇੱਕ ਚਾਈਲਡ ਪ੍ਰੋਸੈਸ ਬਣਾਉਂਦਾ ਹੈ
2. **ਭੇਜਣਾ** — ACP ਪ੍ਰੌਂਪਟਾਂ ਨੂੰ ਪ੍ਰੋਸੈਸ ਦੇ stdin ਵਿੱਚ ਲਿਖਦਾ ਹੈ
3. **ਪ੍ਰਾਪਤ ਕਰਨਾ** — ACP stdout/stderr ਤੋਂ ਜਵਾਬ ਪੜ੍ਹਦਾ ਹੈ
4. **ਨਿਸ਼ਕਿਰਿਆਤਾ ਦੀ ਪਛਾਣ** — ਜਵਾਬ ਨੂੰ ਪੂਰਾ ਮੰਨਣ ਤੋਂ ਪਹਿਲਾਂ ACP 2 ਸਕਿੰਟ ਦੀ ਨਿਸ਼ਕਿਰਿਆਤਾ ਦੀ ਉਡੀਕ ਕਰਦਾ ਹੈ
5. **ਸਮਾਪਤ ਕਰਨਾ** — ACP ਪ੍ਰੋਸੈਸ ਨੂੰ ਸਮਾਪਤ ਕਰਦਾ ਹੈ (SIGTERM, ਫਿਰ 5s ਬਾਅਦ SIGKILL)

### ਸੰਚਾਰ ਪ੍ਰੋਟੋਕੋਲ

ACP, CLI ਏਜੰਟਾਂ ਨਾਲ ਸੰਚਾਰ ਲਈ **stdio** (ਮਿਆਰੀ ਇਨਪੁੱਟ/ਆਉਟਪੁੱਟ) ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ। ਪ੍ਰੋਟੋਕੋਲ ਇਹ ਹੈ:

1. **ਪ੍ਰੌਂਪਟ ਭੇਜੋ** — ਨਵੀਂ ਲਾਈਨ ਸਮੇਤ stdin ਵਿੱਚ ਲਿਖੋ
2. **ਜਵਾਬ ਦੀ ਉਡੀਕ ਕਰੋ** — ਨਿਸ਼ਕਿਰਿਆ ਹੋਣ ਤੱਕ stdout ਤੋਂ ਪੜ੍ਹੋ (2s ਤੱਕ ਕੋਈ ਆਉਟਪੁੱਟ ਨਹੀਂ)
3. **ਸਮਾਂ-ਸੀਮਾ** — ਮੂਲ ਰੂਪ ਵਿੱਚ 120 ਸਕਿੰਟ (ਸੰਰਚਨਾਯੋਗ)

---

## API ਹਵਾਲਾ

### ਰਜਿਸਟਰੀ ਫੰਕਸ਼ਨ

#### `detectInstalledAgents()`

ਸਿਸਟਮ ਉੱਤੇ ਇੰਸਟਾਲ ਕੀਤੇ ਸਾਰੇ CLI ਏਜੰਟਾਂ ਦਾ ਪਤਾ ਲਗਾਉਂਦਾ ਹੈ। ਨਤੀਜੇ 60 ਸਕਿੰਟਾਂ ਲਈ ਕੈਸ਼ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// ਵਾਪਸ ਕਰਦਾ ਹੈ: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // ਉਦਾਹਰਨ ਲਈ, "codex", "claude"
  name: string; // ਪ੍ਰਦਰਸ਼ਿਤ ਨਾਮ
  binary: string; // ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਬਾਈਨਰੀ ਦਾ ਨਾਮ
  versionCommand: string; // ਵਰਜਨ ਦਾ ਪਤਾ ਲਗਾਉਣ ਵਾਲੀ ਕਮਾਂਡ
  version: string | null; // ਪਤਾ ਲਗਾਇਆ ਵਰਜਨ (ਇੰਸਟਾਲ ਨਾ ਹੋਣ 'ਤੇ null)
  installed: boolean; // ਕੀ ਏਜੰਟ ਇੰਸਟਾਲ ਹੈ
  providerAlias: string; // OmniRoute ਵਿੱਚ ਪ੍ਰਦਾਤਾ ID
  spawnArgs: string[]; // ਸ਼ੁਰੂ ਕਰਨ ਵੇਲੇ ਪਾਸ ਕੀਤੀਆਂ ਜਾਣ ਵਾਲੀਆਂ ਆਰਗੂਮੈਂਟਾਂ
  protocol: "stdio" | "http"; // ਸੰਚਾਰ ਪ੍ਰੋਟੋਕੋਲ
  isCustom?: boolean; // ਕੀ ਇਹ ਵਰਤੋਂਕਾਰ ਦੁਆਰਾ ਪਰਿਭਾਸ਼ਿਤ ਕਸਟਮ ਏਜੰਟ ਹੈ
}
```

#### `getAvailableAgents()`

ਸਿਰਫ਼ ਉਹ ਏਜੰਟ ਪ੍ਰਾਪਤ ਕਰਦਾ ਹੈ ਜੋ ਇੰਸਟਾਲ ਹਨ ਅਤੇ ACP ਲਈ ਉਪਲਬਧ ਹਨ।

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// ਵਾਪਸ ਕਰਦਾ ਹੈ: CliAgentInfo[] (ਸਿਰਫ਼ ਇੰਸਟਾਲ ਕੀਤੇ ਏਜੰਟ)
```

#### `getAgentById(id)`

ID ਰਾਹੀਂ ਕੋਈ ਖਾਸ ਏਜੰਟ ਪ੍ਰਾਪਤ ਕਰਦਾ ਹੈ।

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// ਵਾਪਸ ਕਰਦਾ ਹੈ: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

ਸੈਟਿੰਗਾਂ ਤੋਂ ਕਸਟਮ ਏਜੰਟ ਪਰਿਭਾਸ਼ਾਵਾਂ ਸੈੱਟ ਕਰਦਾ ਹੈ।

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

### ਮੈਨੇਜਰ ਫੰਕਸ਼ਨ

#### `acpManager.spawn(agentId, binary, args, env)`

ਇੱਕ ਨਵੀਂ CLI ਏਜੰਟ ਪ੍ਰਕਿਰਿਆ ਸ਼ੁਰੂ ਕਰਦਾ ਹੈ।

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* ਕਸਟਮ ਵਾਤਾਵਰਨ ਵੇਰੀਏਬਲ */
});
// ਵਾਪਸ ਕਰਦਾ ਹੈ: AcpSession
```

**ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਏਜੰਟ ID**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

CLI ਏਜੰਟ ਨੂੰ ਇੱਕ ਪ੍ਰੌਂਪਟ ਭੇਜਦਾ ਹੈ ਅਤੇ ਜਵਾਬ ਇਕੱਠਾ ਕਰਦਾ ਹੈ।

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 ਮਿੰਟ ਦੀ ਸਮਾਂ-ਸੀਮਾ
);
// ਵਾਪਸ ਕਰਦਾ ਹੈ: Promise<string>
```

#### `acpManager.kill(sessionId)`

ਇੱਕ ਸੈਸ਼ਨ ਨੂੰ ਬੰਦ ਕਰਦਾ ਹੈ ਅਤੇ ਸਫ਼ਾਈ ਕਰਦਾ ਹੈ।

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// ਵਾਪਸ ਕਰਦਾ ਹੈ: boolean
```

#### `acpManager.getActiveSessions()`

ਸਾਰੇ ਸਰਗਰਮ ਸੈਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰਦਾ ਹੈ।

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// ਵਾਪਸ ਕਰਦਾ ਹੈ: AcpSession[]
```

#### `acpManager.killAll()`

ਸਾਰੇ ਸੈਸ਼ਨ ਬੰਦ ਕਰਦਾ ਹੈ।

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### ਸੈਸ਼ਨ ਇੰਟਰਫੇਸ

```typescript
interface AcpSession {
  id: string; // ਵਿਲੱਖਣ ਸੈਸ਼ਨ ID
  agentId: string; // ਏਜੰਟ ID (ਉਦਾਹਰਨ ਲਈ, "claude")
  process: ChildProcess; // ਚਾਈਲਡ ਪ੍ਰਕਿਰਿਆ ਹੈਂਡਲ
  alive: boolean; // ਕੀ ਪ੍ਰਕਿਰਿਆ ਚੱਲ ਰਹੀ ਹੈ
  stdoutBuffer: string; // ਇਕੱਠਾ ਕੀਤਾ stdout ਬਫ਼ਰ
  stderrBuffer: string; // ਇਕੱਠਾ ਕੀਤਾ stderr ਬਫ਼ਰ
  createdAt: Date; // ਬਣਾਏ ਜਾਣ ਦਾ ਟਾਈਮਸਟੈਂਪ
}
```

### ਇਵੈਂਟ

`AcpManager`, `EventEmitter` ਦਾ ਵਿਸਤਾਰ ਕਰਦਾ ਹੈ ਅਤੇ ਹੇਠਾਂ ਦਿੱਤੇ ਇਵੈਂਟ ਉਤਸਰਜਿਤ ਕਰਦਾ ਹੈ:

#### `stdout`

ਜਦੋਂ CLI ਏਜੰਟ stdout ਵਿੱਚ ਲਿਖਦਾ ਹੈ ਤਾਂ ਉਤਸਰਜਿਤ ਹੁੰਦਾ ਹੈ।

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

ਜਦੋਂ CLI ਏਜੰਟ stderr ਵਿੱਚ ਲਿਖਦਾ ਹੈ ਤਾਂ ਉਤਸਰਜਿਤ ਹੁੰਦਾ ਹੈ।

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

ਜਦੋਂ CLI ਏਜੰਟ ਪ੍ਰਕਿਰਿਆ ਸਮਾਪਤ ਹੁੰਦੀ ਹੈ ਤਾਂ ਉਤਸਰਜਿਤ ਹੁੰਦਾ ਹੈ।

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

ਜਦੋਂ CLI ਏਜੰਟ ਪ੍ਰਕਿਰਿਆ ਵਿੱਚ ਗਲਤੀ ਆਉਂਦੀ ਹੈ ਤਾਂ ਉਤਸਰਜਿਤ ਹੁੰਦਾ ਹੈ।

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## ਸੰਰਚਨਾ

### ਵਾਤਾਵਰਣ ਵੇਰੀਏਬਲ

ACP ਪੇਰੈਂਟ ਪ੍ਰਕਿਰਿਆ ਤੋਂ ਸਾਰੇ ਵਾਤਾਵਰਣ ਵੇਰੀਏਬਲ ਪ੍ਰਾਪਤ ਕਰਦਾ ਹੈ ਅਤੇ ਇਸਨੂੰ ਕਸਟਮ ਵਾਤਾਵਰਣ ਵੇਰੀਏਬਲਾਂ ਨਾਲ ਵਧਾਇਆ ਜਾ ਸਕਦਾ ਹੈ:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### ਸਪੌਨ ਆਰਗੂਮੈਂਟ

ਹਰੇਕ ਏਜੰਟ ਲਈ ਡਿਫਾਲਟ ਸਪੌਨ ਆਰਗੂਮੈਂਟ ਰਜਿਸਟਰੀ ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ ਹੁੰਦੇ ਹਨ। ਤੁਸੀਂ ਉਨ੍ਹਾਂ ਨੂੰ ਓਵਰਰਾਈਡ ਕਰ ਸਕਦੇ ਹੋ:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### ਸਮਾਂ-ਸੀਮਾਵਾਂ

ਡਿਫਾਲਟ ਪ੍ਰੌਂਪਟ ਸਮਾਂ-ਸੀਮਾ **120 ਸਕਿੰਟ** (2 ਮਿੰਟ) ਹੈ। ਤੁਸੀਂ ਇਸਨੂੰ ਓਵਰਰਾਈਡ ਕਰ ਸਕਦੇ ਹੋ:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 ਮਿੰਟ
```

### ਖੋਜ ਕੈਸ਼

ਮਹਿੰਗੇ ਫ਼ਾਈਲ-ਸਿਸਟਮ ਸਕੈਨਾਂ ਤੋਂ ਬਚਣ ਲਈ ਏਜੰਟ ਖੋਜ ਨੂੰ **60 ਸਕਿੰਟਾਂ** ਲਈ ਕੈਸ਼ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਜ਼ਬਰਦਸਤੀ ਰਿਫ੍ਰੈਸ਼ ਕਰੋ:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## ਸੁਰੱਖਿਆ

### ਕਮਾਂਡ ਇੰਜੈਕਸ਼ਨ ਦੀ ਰੋਕਥਾਮ

ACP ਕਮਾਂਡ ਇੰਜੈਕਸ਼ਨ ਹਮਲਿਆਂ ਨੂੰ ਰੋਕਣ ਲਈ ਵਰਜਨ ਕਮਾਂਡਾਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

ਇਹ ਅੱਖਰ ਰੱਖਣ ਵਾਲੀਆਂ ਵਰਜਨ ਕਮਾਂਡਾਂ ਨੂੰ ਰੱਦ ਕਰ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ:

- `;` — ਕਮਾਂਡ ਵੱਖਕਾਰ
- `&` — ਬੈਕਗ੍ਰਾਊਂਡ ਪ੍ਰਕਿਰਿਆ
- `|` — ਪਾਈਪ
- `<`, `>` — ਰੀਡਾਇਰੈਕਸ਼ਨ
- `` ` `` — ਕਮਾਂਡ ਸਬਸਟੀਟਿਊਸ਼ਨ
- `$` — ਵੇਰੀਏਬਲ ਵਿਸਤਾਰ
- `\r`, `\n` — ਲਾਈਨ ਬ੍ਰੇਕ

### ਬਾਈਨਰੀ ਨਾਮ ਦੀ ਪੁਸ਼ਟੀ

ACP ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ ਕਿ ਵਰਜਨ ਕਮਾਂਡ ਦੀ ਬਾਈਨਰੀ ਦਾ ਨਾਮ ਉਮੀਦ ਕੀਤੇ ਬਾਈਨਰੀ ਨਾਮ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ (ਜਦੋਂ ਤੱਕ ਇਹ ਕਸਟਮ ਏਜੰਟ ਨਾ ਹੋਵੇ)।

### ਪ੍ਰਕਿਰਿਆ ਅਲੱਗਾਵ

ਹਰੇਕ ACP ਸੈਸ਼ਨ ਆਪਣੀ ਵੱਖਰੀ ਚਾਈਲਡ ਪ੍ਰਕਿਰਿਆ ਵਿੱਚ ਚੱਲਦਾ ਹੈ। ਸੈਸ਼ਨ ਖ਼ਤਮ ਹੋਣ ਜਾਂ ਸਮਾਂ-ਸੀਮਾ ਪੂਰੀ ਹੋਣ 'ਤੇ ਪ੍ਰਕਿਰਿਆ ਨੂੰ ਸਮਾਪਤ ਕਰ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ।

---

## ਕਾਰਗੁਜ਼ਾਰੀ

### ਖੋਜ ਦੀ ਕਾਰਗੁਜ਼ਾਰੀ

- **ਪਹਿਲੀ ਕਾਲ**: ~50-200ms (ਹਰੇਕ ਏਜੰਟ ਲਈ `version` ਕਮਾਂਡ ਚਲਾਉਂਦੀ ਹੈ)
- **ਕੈਸ਼ ਕੀਤੀਆਂ ਕਾਲਾਂ**: <1ms (ਕੈਸ਼ ਤੋਂ ਵਾਪਸ ਆਉਂਦੀਆਂ ਹਨ)
- **ਕੈਸ਼ TTL**: 60 ਸਕਿੰਟ

### ਪ੍ਰੌਂਪਟ ਦੀ ਕਾਰਗੁਜ਼ਾਰੀ

- **ਸਪੌਨ**: ~50-100ms
- **ਪ੍ਰੌਂਪਟ ਭੇਜਣਾ**: ~10-50ms
- **ਜਵਾਬ ਦੀ ਉਡੀਕ**: CLI ਏਜੰਟ 'ਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ (ਆਮ ਤੌਰ 'ਤੇ 1-30 ਸਕਿੰਟ)
- **ਸਮਾਪਤ ਕਰਨਾ**: ~5 ਸਕਿੰਟ (SIGTERM) + ਤੁਰੰਤ (SIGKILL)

### ਸਰੋਤਾਂ ਦੀ ਵਰਤੋਂ

- **ਪ੍ਰਤੀ ਸੈਸ਼ਨ ਮੈਮੋਰੀ**: ~10-50MB (CLI ਏਜੰਟ 'ਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ)
- **CPU**: ਘੱਟੋ-ਘੱਟ (I/O ਬਾਊਂਡ)
- **ਡਿਸਕ**: ਕੋਈ ਨਹੀਂ

---

## ਸਮੱਸਿਆ-ਨਿਵਾਰਣ

### "Unknown agent" ਗਲਤੀ

**ਸਮੱਸਿਆ**: `acpManager.spawn()` ਵੱਲੋਂ `Unknown agent: <id>` ਗਲਤੀ ਆਉਂਦੀ ਹੈ

**ਹੱਲ**: `spawn()` ਵਿੱਚ ਸਿਰਫ਼ ਇਨ੍ਹਾਂ ਏਜੰਟਾਂ ਦੀ ਆਗਿਆ ਹੈ:

- `claude`
- `codex`
- `gemini`
- `qwen`

ਹੋਰ ਏਜੰਟਾਂ ਨੂੰ ਹੱਥੀਂ ਜਾਂ ਕਸਟਮ ਏਜੰਟ ਪਰਿਭਾਸ਼ਾਵਾਂ ਰਾਹੀਂ ਸਪੌਨ ਕਰਨਾ ਲਾਜ਼ਮੀ ਹੈ।

### "Session not alive" ਗਲਤੀ

**ਸਮੱਸਿਆ**: `acpManager.sendPrompt()` ਵੱਲੋਂ `Session ${sessionId} is not alive` ਗਲਤੀ ਆਉਂਦੀ ਹੈ

**ਹੱਲ**: ਹੋ ਸਕਦਾ ਹੈ ਕਿ ਸੈਸ਼ਨ ਬੰਦ ਹੋ ਗਿਆ ਹੋਵੇ ਜਾਂ ਸਮਾਪਤ ਕਰ ਦਿੱਤਾ ਗਿਆ ਹੋਵੇ। ਸੈਸ਼ਨ ਦੀ ਸਥਿਤੀ ਦੀ ਜਾਂਚ ਕਰੋ:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // ਸੈਸ਼ਨ ਨੂੰ ਮੁੜ ਸਪੌਨ ਕਰੋ
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" ਗਲਤੀ

**ਸਮੱਸਿਆ**: `acpManager.sendPrompt()` ਵੱਲੋਂ `ACP timeout after 120000ms` ਗਲਤੀ ਆਉਂਦੀ ਹੈ

**ਹੱਲ**: ਸਮਾਂ-ਸੀਮਾ ਵਧਾਓ:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 ਮਿੰਟ
```

### CLI ਦੀ ਖੋਜ ਨਹੀਂ ਹੋਈ

**ਸਮੱਸਿਆ**: `detectInstalledAgents()` ਤੁਹਾਡਾ CLI ਨਹੀਂ ਲੱਭਦਾ

**ਹੱਲ**:

1. **PATH ਦੀ ਜਾਂਚ ਕਰੋ**: ਯਕੀਨੀ ਬਣਾਓ ਕਿ CLI ਤੁਹਾਡੇ ਸਿਸਟਮ PATH ਵਿੱਚ ਹੈ
2. **ਵਰਜਨ ਕਮਾਂਡ ਦੀ ਜਾਂਚ ਕਰੋ**: `claude --version` ਨੂੰ ਹੱਥੀਂ ਚਲਾਓ
3. **ਅਨੁਮਤੀਆਂ ਦੀ ਜਾਂਚ ਕਰੋ**: ਯਕੀਨੀ ਬਣਾਓ ਕਿ CLI ਚਲਾਉਣਯੋਗ ਹੈ
4. **ਕਸਟਮ ਏਜੰਟ**: ਗੈਰ-ਮਿਆਰੀ CLI ਲਈ ਕਸਟਮ ਏਜੰਟ ਪਰਿਭਾਸ਼ਾ ਸ਼ਾਮਲ ਕਰੋ

### ਅਨੁਮਤੀ ਅਸਵੀਕਾਰ ਕੀਤੀ ਗਈ

**ਸਮੱਸਿਆ**: ACP CLI ਨੂੰ ਚਲਾ ਨਹੀਂ ਸਕਦਾ

**ਹੱਲ**:

1. **ਫ਼ਾਈਲ ਅਨੁਮਤੀਆਂ ਦੀ ਜਾਂਚ ਕਰੋ**: `chmod +x /usr/local/bin/claude`
2. **ਮਲਕੀਅਤ ਦੀ ਜਾਂਚ ਕਰੋ**: ਯਕੀਨੀ ਬਣਾਓ ਕਿ OmniRoute ਕੋਲ ਪੜ੍ਹਨ/ਚਲਾਉਣ ਦੀਆਂ ਅਨੁਮਤੀਆਂ ਹਨ
3. **SELinux/AppArmor ਦੀ ਜਾਂਚ ਕਰੋ**: ਇਹ ਪ੍ਰਕਿਰਿਆ ਸਪੌਨ ਕਰਨ ਨੂੰ ਰੋਕ ਸਕਦੇ ਹਨ

---

## ਉਦਾਹਰਨਾਂ

### ਉਦਾਹਰਨ 1: Claude Code ਨੂੰ ਸ਼ੁਰੂ ਕਰੋ ਅਤੇ ਵਰਤੋ

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// ਇੰਸਟਾਲ ਕੀਤੇ ਏਜੰਟਾਂ ਦਾ ਪਤਾ ਲਗਾਓ
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // ਇੱਕ ਨਵਾਂ ਸੈਸ਼ਨ ਸ਼ੁਰੂ ਕਰੋ
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // ਇੱਕ ਪ੍ਰੌਂਪਟ ਭੇਜੋ
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // ਸਫ਼ਾਈ ਕਰੋ
  acpManager.kill(session.id);
}
```

### ਉਦਾਹਰਨ 2: ਫਾਲਬੈਕ ਦੇ ਨਾਲ ਸਵੈਚਾਲਿਤ ਖੋਜ

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// ਪਹਿਲਾਂ Claude ਨੂੰ ਅਜ਼ਮਾਓ, ਫਿਰ Codex ਨੂੰ ਫਾਲਬੈਕ ਵਜੋਂ ਵਰਤੋ
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

### ਉਦਾਹਰਨ 3: ਕਸਟਮ ਏਜੰਟ

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// ਇੱਕ ਕਸਟਮ CLI ਏਜੰਟ ਰਜਿਸਟਰ ਕਰੋ
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

// ਹੁਣ detectInstalledAgents() ਵਿੱਚ "my-llm-cli" ਸ਼ਾਮਲ ਹੋਵੇਗਾ
const agents = detectInstalledAgents();
```

---

## ਅੱਗੇ ਕੀ ਹੈ?

- **[API ਹਵਾਲਾ](../reference/API_REFERENCE.md)** — REST API ਐਂਡਪੌਇੰਟ
- **[ਪ੍ਰਦਾਤਾ ਹਵਾਲਾ](../reference/PROVIDER_REFERENCE.md)** — ਸਾਰੇ 352 ਪ੍ਰਦਾਤਾ
- **[MCP ਸਰਵਰ](./MCP-SERVER.md)** — Model Context Protocol ਏਕੀਕਰਨ
- **[A2A ਸਰਵਰ](./A2A-SERVER.md)** — ਏਜੰਟ-ਤੋਂ-ਏਜੰਟ ਪ੍ਰੋਟੋਕੋਲ
- **[ਕਲਾਉਡ ਏਜੰਟ](./CLOUD_AGENT.md)** — ਕਲਾਉਡ-ਅਧਾਰਿਤ ਏਜੰਟ

---

## ਹਵਾਲਾ

- [AionUi ਪ੍ਰੋਜੈਕਟ](https://github.com/iOfficeAI/AionUi) — ACP ਸਵੈਚਾਲਿਤ ਖੋਜ ਲਈ ਪ੍ਰੇਰਣਾ
- [ACP ਸਰੋਤ ਕੋਡ](../../src/lib/acp/) — ਲਾਗੂਕਰਨ ਦੇ ਵੇਰਵੇ
  - `manager.ts` — ਪ੍ਰਕਿਰਿਆ ਜੀਵਨ-ਚੱਕਰ ਪ੍ਰਬੰਧਨ
  - `registry.ts` — ਏਜੰਟ ਖੋਜ ਅਤੇ ਰਜਿਸਟ੍ਰੇਸ਼ਨ
  - `index.ts` — ਜਨਤਕ API ਨਿਰਯਾਤ
