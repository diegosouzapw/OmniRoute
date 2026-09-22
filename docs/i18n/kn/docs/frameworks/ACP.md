# ACP (Agent Client Protocol) (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: HTTP APIಗಳನ್ನು ಬಳಸುವ ಬದಲು OmniRouteಗೆ CLI ಏಜೆಂಟ್ಗಳನ್ನು (Claude Code, Codex ಮುಂತಾದವು) ಉಪ-ಪ್ರಕ್ರಿಯೆಗಳಾಗಿ ಪ್ರಾರಂಭಿಸಲು ACP ಅವಕಾಶ ನೀಡುತ್ತದೆ. ಇದು ನಿಮಗೆ "CLI-as-backend" ಸಾರಿಗೆಯನ್ನು ಒದಗಿಸುತ್ತದೆ.

---

## ACP ಎಂದರೇನು?

ACP (Agent Client Protocol) ಎಂಬುದು OmniRouteಗಾಗಿ **"CLI-as-backend" ಸಾರಿಗೆ** ಆಗಿದೆ. AI ಪೂರೈಕೆದಾರರಿಗೆ ಮಾಡುವ HTTP API ಕರೆಗಳನ್ನು ಪ್ರತಿಬಂಧಿಸುವ ಬದಲು, ACP **CLI ಏಜೆಂಟ್ಗಳನ್ನು ಉಪ-ಪ್ರಕ್ರಿಯೆಗಳಾಗಿ ಪ್ರಾರಂಭಿಸುತ್ತದೆ** ಮತ್ತು ಅವುಗಳ ಸ್ಥಳೀಯ ಇಂಟರ್ಫೇಸ್ ಮೂಲಕ ಪ್ರಾಂಪ್ಟ್ಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.

### ACP ಅನ್ನು ಏಕೆ ಬಳಸಬೇಕು?

| ಪ್ರಯೋಜನ                       | ವಿವರಣೆ                                                                     |
| ----------------------------- | -------------------------------------------------------------------------- |
| **API ಕೀಗಳು ಅಗತ್ಯವಿಲ್ಲ**      | ನಿಮ್ಮ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ CLI ದೃಢೀಕರಣವನ್ನು ಬಳಸುತ್ತದೆ                          |
| **ಸ್ಥಳೀಯ ಪ್ರೋಟೋಕಾಲ್**         | ಪ್ರತಿಯೊಂದು CLIಯ ಸ್ಥಳೀಯ ಇನ್ಪುಟ್/ಔಟ್ಪುಟ್ ಸ್ವರೂಪವನ್ನು ಬಳಸುತ್ತದೆ               |
| **ಸ್ವಯಂ-ಪತ್ತೆ**               | ನಿಮ್ಮ ಸಿಸ್ಟಂನಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾದ CLIಗಳನ್ನು ಪತ್ತೆ ಮಾಡುತ್ತದೆ                     |
| **15 ಅಂತರ್ನಿರ್ಮಿತ ಏಜೆಂಟ್ಗಳು** | ಜನಪ್ರಿಯ CLI ಪರಿಕರಗಳಿಗಾಗಿ ಪೂರ್ವ-ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾಗಿದೆ                         |
| **ಕಸ್ಟಮ್ ಏಜೆಂಟ್ಗಳು**          | ಸೆಟ್ಟಿಂಗ್ಗಳ ಮೂಲಕ ನಿಮ್ಮದೇ CLI ಪರಿಕರಗಳನ್ನು ಸೇರಿಸಿ                            |
| **ಪ್ರಕ್ರಿಯೆ ನಿರ್ವಹಣೆ**        | ಜೀವನಚಕ್ರವನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ (ಪ್ರಾರಂಭಿಸುವುದು, ಕಳುಹಿಸುವುದು, ಕೊನೆಗೊಳಿಸುವುದು) |

---

## ಬೆಂಬಲಿತ CLI ಏಜೆಂಟ್ಗಳು

ACP ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ **15 ಅಂತರ್ನಿರ್ಮಿತ CLI ಏಜೆಂಟ್ಗಳನ್ನು** ಬೆಂಬಲಿಸುತ್ತದೆ:

| ಏಜೆಂಟ್ ID     | ಪ್ರದರ್ಶನ ಹೆಸರು     | ಬೈನರಿ         | ಪ್ರೋಟೋಕಾಲ್ |
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

### ಕಸ್ಟಮ್ ಏಜೆಂಟ್ಗಳು

ಸೆಟ್ಟಿಂಗ್ಗಳ ಮೂಲಕ ನಿಮ್ಮದೇ CLI ಏಜೆಂಟ್ಗಳನ್ನು ಸೇರಿಸಬಹುದು. ಕಸ್ಟಮ್ ಏಜೆಂಟ್ಗಳು ಅಂತರ್ನಿರ್ಮಿತ ಏಜೆಂಟ್ಗಳಂತೆಯೇ ಅದೇ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತವೆ.

---

## ತ್ವರಿತ ಪ್ರಾರಂಭ

### ಹಂತ 1: CLI ಏಜೆಂಟ್ ಅನ್ನು ಸ್ಥಾಪಿಸಿ

```bash
# ಉದಾಹರಣೆ: Claude Code CLI ಅನ್ನು ಸ್ಥಾಪಿಸಿ
npm install -g @anthropic-ai/claude-code

# ಸ್ಥಾಪನೆಯನ್ನು ಪರಿಶೀಲಿಸಿ
claude --version
```

### ಹಂತ 2: ACP ಸ್ವಯಂ-ಪತ್ತೆ

ACP ನಿಮ್ಮ ಸಿಸ್ಟಂನಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾದ CLI ಏಜೆಂಟ್ಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪತ್ತೆ ಮಾಡುತ್ತದೆ. ಯಾವುದೇ ಕಾನ್ಫಿಗರೇಶನ್ ಅಗತ್ಯವಿಲ್ಲ!

### ಹಂತ 3: ACP ಸಾರಿಗೆಯನ್ನು ಬಳಸಿ

ಪತ್ತೆಯಾದ ನಂತರ, ಬೆಂಬಲಿತ ಯಾವುದೇ ಪೂರೈಕೆದಾರರಿಗಾಗಿ ACP ಅನ್ನು ಸಾರಿಗೆಯಾಗಿ ಬಳಸಬಹುದು. CLI ಲಭ್ಯವಿದ್ದಾಗ OmniRoute ಸ್ವಯಂಚಾಲಿತವಾಗಿ ACP ಅನ್ನು ಬಳಸುತ್ತದೆ.

---

## ACP ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ

### ವಾಸ್ತುಶಿಲ್ಪ

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP ಪ್ರಾಕ್ಸಿ)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  ಉಪ-ಪ್ರಕ್ರಿಯೆ     │
│  (CLI ಏಜೆಂಟ್)    │
│                 │
│  stdin  ◄──────┤  ಪ್ರಾಂಪ್ಟ್ ಕಳುಹಿಸಿ
│  stdout ──────►│  ಪ್ರತಿಕ್ರಿಯೆ ಸ್ವೀಕರಿಸಿ
│  stderr ──────►│  ದೋಷಗಳನ್ನು ಸ್ವೀಕರಿಸಿ
└─────────────────┘
```

### ಪ್ರಕ್ರಿಯೆಯ ಜೀವನಚಕ್ರ

1. **ಪ್ರಾರಂಭ** — ACP CLI ಏಜೆಂಟ್ಗಾಗಿ ಉಪ-ಪ್ರಕ್ರಿಯೆಯನ್ನು ರಚಿಸುತ್ತದೆ
2. **ಕಳುಹಿಸುವಿಕೆ** — ACP ಪ್ರಕ್ರಿಯೆಯ stdinಗೆ ಪ್ರಾಂಪ್ಟ್ಗಳನ್ನು ಬರೆಯುತ್ತದೆ
3. **ಸ್ವೀಕರಿಸುವಿಕೆ** — ACP stdout/stderrನಿಂದ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಓದುತ್ತದೆ
4. **ನಿಷ್ಕ್ರಿಯತೆ ಪತ್ತೆ** — ಪ್ರತಿಕ್ರಿಯೆ ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಪರಿಗಣಿಸುವ ಮೊದಲು ACP 2 ಸೆಕೆಂಡ್ಗಳ ನಿಷ್ಕ್ರಿಯತೆಗಾಗಿ ಕಾಯುತ್ತದೆ
5. **ಕೊನೆಗೊಳಿಸುವಿಕೆ** — ACP ಪ್ರಕ್ರಿಯೆಯನ್ನು ಕೊನೆಗೊಳಿಸುತ್ತದೆ (SIGTERM, ನಂತರ 5s ಬಳಿಕ SIGKILL)

### ಸಂವಹನ ಪ್ರೋಟೋಕಾಲ್

CLI ಏಜೆಂಟ್ಗಳೊಂದಿಗಿನ ಸಂವಹನಕ್ಕಾಗಿ ACP **stdio** (ಪ್ರಮಾಣಿತ ಇನ್ಪುಟ್/ಔಟ್ಪುಟ್) ಅನ್ನು ಬಳಸುತ್ತದೆ. ಪ್ರೋಟೋಕಾಲ್ ಹೀಗಿದೆ:

1. **ಪ್ರಾಂಪ್ಟ್ ಕಳುಹಿಸಿ** — ಹೊಸ ಸಾಲಿನೊಂದಿಗೆ stdinಗೆ ಬರೆಯಿರಿ
2. **ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ಕಾಯಿರಿ** — ನಿಷ್ಕ್ರಿಯವಾಗುವವರೆಗೆ stdoutನಿಂದ ಓದಿ (2s ಕಾಲ ಯಾವುದೇ ಔಟ್ಪುಟ್ ಇಲ್ಲದಿರುವುದು)
3. **ಕಾಲಮಿತಿ** — ಡೀಫಾಲ್ಟ್ ಆಗಿ 120 ಸೆಕೆಂಡ್ಗಳು (ಕಾನ್ಫಿಗರ್ ಮಾಡಬಹುದು)

---

## API ಉಲ್ಲೇಖ

### ರಿಜಿಸ್ಟ್ರಿ ಫಂಕ್ಷನ್ಗಳು

#### `detectInstalledAgents()`

ಸಿಸ್ಟಂನಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾದ ಎಲ್ಲಾ CLI ಏಜೆಂಟ್ಗಳನ್ನು ಪತ್ತೆಹಚ್ಚುತ್ತದೆ. ಫಲಿತಾಂಶಗಳನ್ನು 60 ಸೆಕೆಂಡುಗಳವರೆಗೆ ಕ್ಯಾಶ್ ಮಾಡಲಾಗುತ್ತದೆ.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// ಹಿಂತಿರುಗಿಸುವುದು: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // ಉದಾ., "codex", "claude"
  name: string; // ಪ್ರದರ್ಶನದ ಹೆಸರು
  binary: string; // ಪ್ರಾರಂಭಿಸಬೇಕಾದ ಬೈನರಿ ಹೆಸರು
  versionCommand: string; // ಆವೃತ್ತಿ ಪತ್ತೆಹಚ್ಚುವ ಕಮಾಂಡ್
  version: string | null; // ಪತ್ತೆಯಾದ ಆವೃತ್ತಿ (ಸ್ಥಾಪಿಸದಿದ್ದರೆ null)
  installed: boolean; // ಏಜೆಂಟ್ ಸ್ಥಾಪಿಸಲಾಗಿದೆಯೇ
  providerAlias: string; // OmniRoute ನಲ್ಲಿನ ಪೂರೈಕೆದಾರ ID
  spawnArgs: string[]; // ಪ್ರಾರಂಭಿಸುವಾಗ ರವಾನಿಸಬೇಕಾದ ಆರ್ಗ್ಯುಮೆಂಟ್ಗಳು
  protocol: "stdio" | "http"; // ಸಂವಹನ ಪ್ರೋಟೋಕಾಲ್
  isCustom?: boolean; // ಇದು ಬಳಕೆದಾರರು ವ್ಯಾಖ್ಯಾನಿಸಿದ ಕಸ್ಟಮ್ ಏಜೆಂಟ್ ಆಗಿದೆಯೇ
}
```

#### `getAvailableAgents()`

ACP ಗಾಗಿ ಸ್ಥಾಪಿಸಲಾದ ಮತ್ತು ಲಭ್ಯವಿರುವ ಏಜೆಂಟ್ಗಳನ್ನು ಮಾತ್ರ ಪಡೆಯುತ್ತದೆ.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// ಹಿಂತಿರುಗಿಸುವುದು: CliAgentInfo[] (ಸ್ಥಾಪಿಸಲಾದ ಏಜೆಂಟ್ಗಳು ಮಾತ್ರ)
```

#### `getAgentById(id)`

ID ಮೂಲಕ ನಿರ್ದಿಷ್ಟ ಏಜೆಂಟ್ ಅನ್ನು ಪಡೆಯುತ್ತದೆ.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// ಹಿಂತಿರುಗಿಸುವುದು: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

ಸೆಟ್ಟಿಂಗ್ಗಳಿಂದ ಕಸ್ಟಮ್ ಏಜೆಂಟ್ ವ್ಯಾಖ್ಯಾನಗಳನ್ನು ಹೊಂದಿಸುತ್ತದೆ.

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

### ಮ್ಯಾನೇಜರ್ ಫಂಕ್ಷನ್ಗಳು

#### `acpManager.spawn(agentId, binary, args, env)`

ಹೊಸ CLI ಏಜೆಂಟ್ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪ್ರಾರಂಭಿಸುತ್ತದೆ.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* ಕಸ್ಟಮ್ ಪರಿಸರ ವೇರಿಯಬಲ್ಗಳು */
});
// ಹಿಂತಿರುಗಿಸುವುದು: AcpSession
```

**ಅನುಮತಿಸಲಾದ ಏಜೆಂಟ್ IDಗಳು**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

CLI ಏಜೆಂಟ್ಗೆ ಪ್ರಾಂಪ್ಟ್ ಕಳುಹಿಸಿ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಸಂಗ್ರಹಿಸುತ್ತದೆ.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 ನಿಮಿಷಗಳ ಕಾಲಾವಧಿ ಮಿತಿ
);
// ಹಿಂತಿರುಗಿಸುವುದು: Promise<string>
```

#### `acpManager.kill(sessionId)`

ಸೆಷನ್ ಅನ್ನು ಕೊನೆಗೊಳಿಸಿ ಸ್ವಚ್ಛಗೊಳಿಸುತ್ತದೆ.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// ಹಿಂತಿರುಗಿಸುವುದು: boolean
```

#### `acpManager.getActiveSessions()`

ಎಲ್ಲಾ ಸಕ್ರಿಯ ಸೆಷನ್ಗಳನ್ನು ಪಡೆಯುತ್ತದೆ.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// ಹಿಂತಿರುಗಿಸುವುದು: AcpSession[]
```

#### `acpManager.killAll()`

ಎಲ್ಲಾ ಸೆಷನ್ಗಳನ್ನು ಕೊನೆಗೊಳಿಸುತ್ತದೆ.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### ಸೆಷನ್ ಇಂಟರ್ಫೇಸ್

```typescript
interface AcpSession {
  id: string; // ಅನನ್ಯ ಸೆಷನ್ ID
  agentId: string; // ಏಜೆಂಟ್ ID (ಉದಾ., "claude")
  process: ChildProcess; // ಚೈಲ್ಡ್ ಪ್ರಕ್ರಿಯೆಯ ಹ್ಯಾಂಡಲ್
  alive: boolean; // ಪ್ರಕ್ರಿಯೆ ಚಾಲ್ತಿಯಲ್ಲಿದೆಯೇ
  stdoutBuffer: string; // ಸಂಗ್ರಹಿಸಲಾದ stdout ಬಫರ್
  stderrBuffer: string; // ಸಂಗ್ರಹಿಸಲಾದ stderr ಬಫರ್
  createdAt: Date; // ರಚಿಸಿದ ಸಮಯಮುದ್ರೆ
}
```

### ಈವೆಂಟ್ಗಳು

`AcpManager`, `EventEmitter` ಅನ್ನು ವಿಸ್ತರಿಸುತ್ತದೆ ಮತ್ತು ಕೆಳಗಿನ ಈವೆಂಟ್ಗಳನ್ನು ಹೊರಸೂಸುತ್ತದೆ:

#### `stdout`

CLI ಏಜೆಂಟ್ stdout ಗೆ ಬರೆಯುವಾಗ ಹೊರಸೂಸಲಾಗುತ್ತದೆ.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI ಏಜೆಂಟ್ stderr ಗೆ ಬರೆಯುವಾಗ ಹೊರಸೂಸಲಾಗುತ್ತದೆ.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI ಏಜೆಂಟ್ ಪ್ರಕ್ರಿಯೆಯು ನಿರ್ಗಮಿಸಿದಾಗ ಹೊರಸೂಸಲಾಗುತ್ತದೆ.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI ಏಜೆಂಟ್ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ದೋಷ ಉಂಟಾದಾಗ ಹೊರಸೂಸಲಾಗುತ್ತದೆ.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## ಸಂರಚನೆ

### ಪರಿಸರ ಚರಗಳು

ACP ಮೂಲ ಪ್ರಕ್ರಿಯೆಯಿಂದ ಎಲ್ಲಾ ಪರಿಸರ ಚರಗಳನ್ನು ಆನುವಂಶಿಕವಾಗಿ ಪಡೆಯುತ್ತದೆ ಮತ್ತು ಕಸ್ಟಮ್ ಪರಿಸರ ಚರಗಳೊಂದಿಗೆ ವಿಸ್ತರಿಸಬಹುದು:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### ಸ್ಪಾನ್ ಆರ್ಗ್ಯುಮೆಂಟ್ಗಳು

ಪ್ರತಿ ಏಜೆಂಟ್ಗಾಗಿ ಡೀಫಾಲ್ಟ್ ಸ್ಪಾನ್ ಆರ್ಗ್ಯುಮೆಂಟ್ಗಳನ್ನು ರಿಜಿಸ್ಟ್ರಿಯಲ್ಲಿ ವ್ಯಾಖ್ಯಾನಿಸಲಾಗಿದೆ. ನೀವು ಅವುಗಳನ್ನು ಅತಿಕ್ರಮಿಸಬಹುದು:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### ಕಾಲಾವಧಿ ಮೀರುವಿಕೆಗಳು

ಡೀಫಾಲ್ಟ್ ಪ್ರಾಂಪ್ಟ್ ಕಾಲಾವಧಿ ಮೀರುವಿಕೆ **120 ಸೆಕೆಂಡುಗಳು** (2 ನಿಮಿಷಗಳು). ನೀವು ಇದನ್ನು ಅತಿಕ್ರಮಿಸಬಹುದು:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 ನಿಮಿಷಗಳು
```

### ಪತ್ತೆಹಚ್ಚುವಿಕೆ ಕ್ಯಾಶ್

ದುಬಾರಿ ಫೈಲ್ಸಿಸ್ಟಮ್ ಸ್ಕ್ಯಾನ್ಗಳನ್ನು ತಪ್ಪಿಸಲು ಏಜೆಂಟ್ ಪತ್ತೆಹಚ್ಚುವಿಕೆಯ ಫಲಿತಾಂಶವನ್ನು **60 ಸೆಕೆಂಡುಗಳವರೆಗೆ** ಕ್ಯಾಶ್ ಮಾಡಲಾಗುತ್ತದೆ. ಬಲವಂತವಾಗಿ ರಿಫ್ರೆಶ್ ಮಾಡಲು:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## ಭದ್ರತೆ

### ಕಮಾಂಡ್ ಇಂಜೆಕ್ಷನ್ ತಡೆಗಟ್ಟುವಿಕೆ

ಕಮಾಂಡ್ ಇಂಜೆಕ್ಷನ್ ದಾಳಿಗಳನ್ನು ತಡೆಯಲು ACP ಆವೃತ್ತಿ ಕಮಾಂಡ್ಗಳನ್ನು ಮೌಲ್ಯೀಕರಿಸುತ್ತದೆ:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

ಈ ಅಕ್ಷರಗಳನ್ನು ಹೊಂದಿರುವ ಆವೃತ್ತಿ ಕಮಾಂಡ್ಗಳನ್ನು ತಿರಸ್ಕರಿಸಲಾಗುತ್ತದೆ:

- `;` — ಕಮಾಂಡ್ ವಿಭಾಜಕ
- `&` — ಹಿನ್ನೆಲೆ ಪ್ರಕ್ರಿಯೆ
- `|` — ಪೈಪ್
- `<`, `>` — ಮರುನಿರ್ದೇಶನ
- `` ` `` — ಕಮಾಂಡ್ ಪರ್ಯಾಯ
- `$` — ಚರ ವಿಸ್ತರಣೆ
- `\r`, `\n` — ಸಾಲು ವಿರಾಮಗಳು

### ಬೈನರಿ ಹೆಸರಿನ ಮೌಲ್ಯೀಕರಣ

ಆವೃತ್ತಿ ಕಮಾಂಡ್ನ ಬೈನರಿ ನಿರೀಕ್ಷಿತ ಬೈನರಿ ಹೆಸರಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆಯೇ ಎಂಬುದನ್ನು ACP ಮೌಲ್ಯೀಕರಿಸುತ್ತದೆ (ಅದು ಕಸ್ಟಮ್ ಏಜೆಂಟ್ ಆಗಿರದಿದ್ದರೆ).

### ಪ್ರಕ್ರಿಯೆ ಪ್ರತ್ಯೇಕತೆ

ಪ್ರತಿ ACP ಸೆಷನ್ ತನ್ನದೇ ಆದ ಚೈಲ್ಡ್ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ರನ್ ಆಗುತ್ತದೆ. ಸೆಷನ್ ಕೊನೆಗೊಂಡಾಗ ಅಥವಾ ಕಾಲಾವಧಿ ಮೀರಿದಾಗ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಕೊನೆಗೊಳಿಸಲಾಗುತ್ತದೆ.

---

## ಕಾರ್ಯಕ್ಷಮತೆ

### ಪತ್ತೆಹಚ್ಚುವಿಕೆಯ ಕಾರ್ಯಕ್ಷಮತೆ

- **ಮೊದಲ ಕರೆ**: ~50-200ms (ಪ್ರತಿ ಏಜೆಂಟ್ಗಾಗಿ `version` ಕಮಾಂಡ್ ಅನ್ನು ರನ್ ಮಾಡುತ್ತದೆ)
- **ಕ್ಯಾಶ್ ಮಾಡಿದ ಕರೆಗಳು**: <1ms (ಕ್ಯಾಶ್ನಿಂದ ಹಿಂತಿರುಗಿಸುತ್ತದೆ)
- **ಕ್ಯಾಶ್ TTL**: 60 ಸೆಕೆಂಡುಗಳು

### ಪ್ರಾಂಪ್ಟ್ ಕಾರ್ಯಕ್ಷಮತೆ

- **ಸ್ಪಾನ್**: ~50-100ms
- **ಪ್ರಾಂಪ್ಟ್ ಕಳುಹಿಸುವಿಕೆ**: ~10-50ms
- **ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ಕಾಯುವಿಕೆ**: CLI ಏಜೆಂಟ್ ಅನ್ನು ಅವಲಂಬಿಸಿರುತ್ತದೆ (ಸಾಮಾನ್ಯವಾಗಿ 1-30 ಸೆಕೆಂಡುಗಳು)
- **ಕೊನೆಗೊಳಿಸುವಿಕೆ**: ~5 ಸೆಕೆಂಡುಗಳು (SIGTERM) + ತಕ್ಷಣವೇ (SIGKILL)

### ಸಂಪನ್ಮೂಲ ಬಳಕೆ

- **ಪ್ರತಿ ಸೆಷನ್ಗೆ ಮೆಮೊರಿ**: ~10-50MB (CLI ಏಜೆಂಟ್ ಅನ್ನು ಅವಲಂಬಿಸಿರುತ್ತದೆ)
- **CPU**: ಕನಿಷ್ಠ (I/O ಆಧಾರಿತ)
- **ಡಿಸ್ಕ್**: ಯಾವುದೂ ಇಲ್ಲ

---

## ದೋಷನಿವಾರಣೆ

### "Unknown agent" ದೋಷ

**ಸಮಸ್ಯೆ**: `acpManager.spawn()` `Unknown agent: <id>` ಅನ್ನು ಎಸೆಯುತ್ತದೆ

**ಪರಿಹಾರ**: `spawn()` ನಲ್ಲಿ ಈ ಏಜೆಂಟ್ಗಳಿಗೆ ಮಾತ್ರ ಅನುಮತಿ ಇದೆ:

- `claude`
- `codex`
- `gemini`
- `qwen`

ಇತರ ಏಜೆಂಟ್ಗಳನ್ನು ಹಸ್ತಚಾಲಿತವಾಗಿ ಅಥವಾ ಕಸ್ಟಮ್ ಏಜೆಂಟ್ ವ್ಯಾಖ್ಯಾನಗಳ ಮೂಲಕ ಸ್ಪಾನ್ ಮಾಡಬೇಕು.

### "Session not alive" ದೋಷ

**ಸಮಸ್ಯೆ**: `acpManager.sendPrompt()` `Session ${sessionId} is not alive` ಅನ್ನು ಎಸೆಯುತ್ತದೆ

**ಪರಿಹಾರ**: ಸೆಷನ್ ನಿರ್ಗಮಿಸಿರಬಹುದು ಅಥವಾ ಕೊನೆಗೊಳಿಸಲ್ಪಟ್ಟಿರಬಹುದು. ಸೆಷನ್ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // ಸೆಷನ್ ಅನ್ನು ಮತ್ತೆ ಸ್ಪಾನ್ ಮಾಡಿ
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" ದೋಷ

**ಸಮಸ್ಯೆ**: `acpManager.sendPrompt()` `ACP timeout after 120000ms` ಅನ್ನು ಎಸೆಯುತ್ತದೆ

**ಪರಿಹಾರ**: ಕಾಲಾವಧಿ ಮಿತಿಯನ್ನು ಹೆಚ್ಚಿಸಿ:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 ನಿಮಿಷಗಳು
```

### CLI ಪತ್ತೆಯಾಗಿಲ್ಲ

**ಸಮಸ್ಯೆ**: `detectInstalledAgents()` ನಿಮ್ಮ CLI ಅನ್ನು ಕಂಡುಹಿಡಿಯುವುದಿಲ್ಲ

**ಪರಿಹಾರಗಳು**:

1. **PATH ಪರಿಶೀಲಿಸಿ**: CLI ನಿಮ್ಮ ಸಿಸ್ಟಮ್ PATH ನಲ್ಲಿದೆ ಎಂಬುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ
2. **ಆವೃತ್ತಿ ಕಮಾಂಡ್ ಪರಿಶೀಲಿಸಿ**: `claude --version` ಅನ್ನು ಹಸ್ತಚಾಲಿತವಾಗಿ ರನ್ ಮಾಡಿ
3. **ಅನುಮತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ**: CLI ಕಾರ್ಯಗತಗೊಳಿಸಬಹುದಾಗಿದೆ ಎಂಬುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ
4. **ಕಸ್ಟಮ್ ಏಜೆಂಟ್**: ಪ್ರಮಾಣಿತವಲ್ಲದ CLI ಗಳಿಗಾಗಿ ಕಸ್ಟಮ್ ಏಜೆಂಟ್ ವ್ಯಾಖ್ಯಾನವನ್ನು ಸೇರಿಸಿ

### ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ

**ಸಮಸ್ಯೆ**: ACP ಗೆ CLI ಅನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ

**ಪರಿಹಾರಗಳು**:

1. **ಫೈಲ್ ಅನುಮತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ**: `chmod +x /usr/local/bin/claude`
2. **ಮಾಲೀಕತ್ವವನ್ನು ಪರಿಶೀಲಿಸಿ**: OmniRoute ಗೆ ಓದುವ/ಕಾರ್ಯಗತಗೊಳಿಸುವ ಅನುಮತಿಗಳಿವೆ ಎಂಬುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ
3. **SELinux/AppArmor ಪರಿಶೀಲಿಸಿ**: ಪ್ರಕ್ರಿಯೆ ಸ್ಪಾನ್ ಆಗುವುದನ್ನು ನಿರ್ಬಂಧಿಸಬಹುದು

---

## ಉದಾಹರಣೆಗಳು

### ಉದಾಹರಣೆ 1: Claude Code ಅನ್ನು ಪ್ರಾರಂಭಿಸಿ ಮತ್ತು ಬಳಸಿ

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// ಸ್ಥಾಪಿಸಲಾದ ಏಜೆಂಟ್ಗಳನ್ನು ಪತ್ತೆಮಾಡಿ
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // ಹೊಸ ಸೆಷನ್ ಅನ್ನು ಪ್ರಾರಂಭಿಸಿ
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // ಪ್ರಾಂಪ್ಟ್ ಕಳುಹಿಸಿ
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // ಸ್ವಚ್ಛಗೊಳಿಸಿ
  acpManager.kill(session.id);
}
```

### ಉದಾಹರಣೆ 2: ಪರ್ಯಾಯ ವ್ಯವಸ್ಥೆಯೊಂದಿಗೆ ಸ್ವಯಂ-ಪತ್ತೆ

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// ಮೊದಲು Claude ಅನ್ನು ಪ್ರಯತ್ನಿಸಿ, ವಿಫಲವಾದರೆ Codex ಅನ್ನು ಬಳಸಿ
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

### ಉದಾಹರಣೆ 3: ಕಸ್ಟಮ್ ಏಜೆಂಟ್

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// ಕಸ್ಟಮ್ CLI ಏಜೆಂಟ್ ಅನ್ನು ನೋಂದಾಯಿಸಿ
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

// ಈಗ detectInstalledAgents() "my-llm-cli" ಅನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ
const agents = detectInstalledAgents();
```

---

## ಮುಂದೇನು?

- **[API ಉಲ್ಲೇಖ](../reference/API_REFERENCE.md)** — REST API ಎಂಡ್ಪಾಯಿಂಟ್ಗಳು
- **[ಪ್ರೊವೈಡರ್ ಉಲ್ಲೇಖ](../reference/PROVIDER_REFERENCE.md)** — ಎಲ್ಲಾ 352 ಪ್ರೊವೈಡರ್ಗಳು
- **[MCP ಸರ್ವರ್](./MCP-SERVER.md)** — Model Context Protocol ಏಕೀಕರಣ
- **[A2A ಸರ್ವರ್](./A2A-SERVER.md)** — ಏಜೆಂಟ್ನಿಂದ ಏಜೆಂಟ್ಗೆ ಪ್ರೋಟೋಕಾಲ್
- **[ಕ್ಲೌಡ್ ಏಜೆಂಟ್](./CLOUD_AGENT.md)** — ಕ್ಲೌಡ್ ಆಧಾರಿತ ಏಜೆಂಟ್ಗಳು

---

## ಉಲ್ಲೇಖ

- [AionUi ಪ್ರಾಜೆಕ್ಟ್](https://github.com/iOfficeAI/AionUi) — ACP ಸ್ವಯಂ-ಪತ್ತೆಗೆ ಪ್ರೇರಣೆ
- [ACP ಮೂಲ ಕೋಡ್](../../src/lib/acp/) — ಅನುಷ್ಠಾನದ ವಿವರಗಳು
  - `manager.ts` — ಪ್ರಕ್ರಿಯೆಯ ಜೀವನಚಕ್ರ ನಿರ್ವಹಣೆ
  - `registry.ts` — ಏಜೆಂಟ್ ಪತ್ತೆ ಮತ್ತು ನೋಂದಣಿ
  - `index.ts` — ಸಾರ್ವಜನಿಕ API ರಫ್ತುಗಳು
