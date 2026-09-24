# ACP (Agent Client Protocol) (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Na nkenke**: ACP na-enye OmniRoute ohere ịmalite ndị nnọchi anya CLI (dịka Claude Code, Codex) dịka usoro ụmụaka kama iji HTTP APIs. Nke a na-enye gị ụzọ mbufe nke "CLI-dịka-backend".

---

## Gịnị Bụ ACP?

ACP (Agent Client Protocol) bụ ụzọ mbufe **"CLI-dịka-backend"** maka OmniRoute. Kama ijide oku HTTP API a na-ezigara ndị na-eweta AI, ACP **na-amalite ndị nnọchi anya CLI dịka usoro ụmụaka** ma na-ezigara ha prompts site na interface nke ha.

### Gịnị Mere E Ji Eji ACP?

| Uru                                      | Nkọwa                                             |
| ---------------------------------------- | ------------------------------------------------- |
| **Achọghị API keys**                     | Na-eji nkwenye CLI i nwere ugbu a                 |
| **Protocol nke ya**                      | Na-eji usoro ntinye/mmepụta nke CLI ọ bụla        |
| **Nchọpụta akpaka**                      | Na-achọpụta CLI ndị arụnyere na sistemụ gị        |
| **Ndị nnọchi anya 15 arụnyere n'ime ya** | Ahazilarị ha maka ngwa CLI ndị a ma ama           |
| **Ndị nnọchi anya omenala**              | Tinye ngwa CLI nke gị site na ntọala              |
| **Njikwa usoro**                         | Na-ahụ maka okirikiri ndụ (ịmalite, iziga, kwụsị) |

---

## Ndị Nnọchi Anya CLI A Na-akwado

ACP na-akwado **ndị nnọchi anya CLI 15 arụnyere n'ime ya** ozugbo:

| ID Onye Nnọchi Anya | Aha Ngosipụta      | Binary        | Protocol |
| ------------------- | ------------------ | ------------- | -------- |
| `codex`             | OpenAI Codex CLI   | `codex`       | stdio    |
| `claude`            | Claude Code CLI    | `claude`      | stdio    |
| `goose`             | Goose CLI          | `goose`       | stdio    |
| `openclaw`          | OpenClaw           | `openclaw`    | stdio    |
| `aider`             | Aider              | `aider`       | stdio    |
| `opencode`          | OpenCode           | `opencode`    | stdio    |
| `cline`             | Cline              | `cline`       | stdio    |
| `qwen`              | Qwen Code          | `qwen --acp`  | stdio    |
| `forge`             | ForgeCode          | `forge`       | stdio    |
| `amazon-q`          | Amazon Q Developer | `q`           | stdio    |
| `interpreter`       | Open Interpreter   | `interpreter` | stdio    |
| `cursor-cli`        | Cursor CLI         | `cursor`      | stdio    |
| `warp`              | Warp AI            | `warp`        | stdio    |
| `gemini`            | Gemini CLI         | `gemini`      | stdio    |
| `zcode`             | ZCode              | `zcode`       | stdio    |

### Ndị Nnọchi Anya Omenala

Ị nwere ike itinye ndị nnọchi anya CLI nke gị site na ntọala. Ndị nnọchi anya omenala na-akwado otu atụmatụ ndị ahụ ndị arụnyere n'ime ya na-akwado.

---

## Mmalite Ngwa Ngwa

### Nzọụkwụ 1: Wụnye Onye Nnọchi Anya CLI

```bash
# Ọmụmaatụ: Wụnye Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Nyochaa nrụnye ahụ
claude --version
```

### Nzọụkwụ 2: Nchọpụta Akpaka nke ACP

ACP na-achọpụta ndị nnọchi anya CLI arụnyere na sistemụ gị na-akpaghị aka. Nhazi ọ bụla adịghị mkpa!

### Nzọụkwụ 3: Jiri Ụzọ Mbufe ACP

Ozugbo achọpụtara ya, enwere ike iji ACP dịka ụzọ mbufe maka onye na-eweta ọ bụla a na-akwado. OmniRoute ga-eji ACP na-akpaghị aka mgbe CLI dị.

---

## Otu ACP Si Arụ Ọrụ

### Ọdịdị

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP Proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Usoro Nwa      │
│  (Onye Nnọchi   │
│   Anya CLI)     │
│                 │
│  stdin  ◄──────┤  Zipụ prompt
│  stdout ──────►│  Nata nzaghachi
│  stderr ──────►│  Nata njehie
└─────────────────┘
```

### Okirikiri Ndụ Usoro

1. **Ịmalite** — ACP na-emepụta usoro nwa maka onye nnọchi anya CLI
2. **Iziga** — ACP na-ede prompts na stdin nke usoro ahụ
3. **Ịnata** — ACP na-agụ nzaghachi sitere na stdout/stderr
4. **Nchọpụta Enweghị Ọrụ** — ACP na-eche sekọnd 2 nke enweghị ọrụ tupu o were nzaghachi ahụ dịka nke zuru ezu
5. **Ịkwụsị** — ACP na-akwụsị usoro ahụ (SIGTERM, emesịa SIGKILL mgbe 5s gachara)

### Protocol Nkwurịta Okwu

ACP na-eji **stdio** (ntinye/mmepụta ọkọlọtọ) maka nkwurịta okwu ya na ndị nnọchi anya CLI. Protocol ahụ bụ:

1. **Zipụ prompt** — Dee na stdin tinyere ahịrị ọhụrụ
2. **Chere nzaghachi** — Gụọ site na stdout ruo mgbe enweghị ọrụ (2s na-enweghị mmepụta)
3. **Oge ngwụcha** — Ndabara bụ sekọnd 120 (enwere ike ịhazi ya)

---

## Ntụaka API

### Ọrụ Ndebanye

#### `detectInstalledAgents()`

Na-achọpụta ndị nnọchi anya CLI niile arụnyere na sistemụ. A na-echekwa nsonaazụ ya na cache ruo sekọnd 60.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Na-eweghachi: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // dịka, "codex", "claude"
  name: string; // Aha ngosipụta
  binary: string; // Aha binary a ga-amalite
  versionCommand: string; // Iwu nchọpụta ụdị
  version: string | null; // Ụdị achọpụtara (null ma ọ bụrụ na arụnyeghị ya)
  installed: boolean; // Ma arụnyere onye nnọchi anya ahụ
  providerAlias: string; // ID onye na-eweta ọrụ na OmniRoute
  spawnArgs: string[]; // Arụmụka ndị a ga-enyefe mgbe a na-amalite ya
  protocol: "stdio" | "http"; // Usoro nkwukọrịta
  isCustom?: boolean; // Ma nke a bụ onye nnọchi anya omenala onye ọrụ kọwara
}
```

#### `getAvailableAgents()`

Na-enweta naanị ndị nnọchi anya arụnyere ma dị maka ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Na-eweghachi: CliAgentInfo[] (naanị ndị nnọchi anya arụnyere)
```

#### `getAgentById(id)`

Na-enweta otu onye nnọchi anya akọwapụtara site na ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Na-eweghachi: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Na-esite na ntọala hazie nkọwa ndị nnọchi anya omenala.

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

### Ọrụ Njikwa

#### `acpManager.spawn(agentId, binary, args, env)`

Na-amalite usoro ọhụrụ nke onye nnọchi anya CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* mgbanwe env omenala */
});
// Na-eweghachi: AcpSession
```

**ID ndị nnọchi anya akwadoro**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Na-eziga prompt nye onye nnọchi anya CLI ma nakọta nzaghachi ya.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // oge nkwụsị nke nkeji 2
);
// Na-eweghachi: Promise<string>
```

#### `acpManager.kill(sessionId)`

Na-akwụsị nnọkọ ma sachapụ ihe ndị metụtara ya.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Na-eweghachi: boolean
```

#### `acpManager.getActiveSessions()`

Na-enweta nnọkọ niile na-arụ ọrụ.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Na-eweghachi: AcpSession[]
```

#### `acpManager.killAll()`

Na-akwụsị nnọkọ niile.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Interface Nnọkọ

```typescript
interface AcpSession {
  id: string; // ID nnọkọ pụrụ iche
  agentId: string; // ID onye nnọchi anya (dịka, "claude")
  process: ChildProcess; // Aka njikwa usoro nwa
  alive: boolean; // Ma usoro ahụ ka na-arụ ọrụ
  stdoutBuffer: string; // Buffer stdout a chịkọbara
  stderrBuffer: string; // Buffer stderr a chịkọbara
  createdAt: Date; // Timestamp e ji mepụta ya
}
```

### Ihe Omume

`AcpManager` na-agbatị `EventEmitter` ma na-ewepụta ihe omume ndị a:

#### `stdout`

A na-ewepụta ya mgbe onye nnọchi anya CLI dere na stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

A na-ewepụta ya mgbe onye nnọchi anya CLI dere na stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

A na-ewepụta ya mgbe usoro onye nnọchi anya CLI kwụsịrị.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

A na-ewepụta ya mgbe usoro onye nnọchi anya CLI nwere njehie.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Nhazi

### Mgbanwe G gburugburu Ebe Ọrụ

ACP na-eketa mgbanwe gburugburu ebe ọrụ niile site na usoro nne ma nwee ike ịgbakwunye mgbanwe env ahaziri iche:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Arụmụka Mbido

Agent ọ bụla nwere arụmụka mbido ndabara akọwapụtara na ndekọ ahụ. Ị nwere ike idegharị ha:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Oge Nkwụsị

Oge nkwụsị ndabara maka prompt bụ **sekọnd 120** (nkeji 2). Ị nwere ike idegharị ya:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // Nkeji 5
```

### Cache Nchọpụta

A na-echekwa nchọpụta agent na cache ruo **sekọnd 60** iji zere nyocha sistemụ faịlụ dị oke ọnụ. Manye mmelite:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Nchekwa

### Mgbochi Ntinye Iwu

ACP na-enyocha iwu ụdị iji gbochie mwakpo ntinye iwu:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

A na-ajụ iwu ụdị nwere mkpụrụedemede ndị a:

- `;` — Ihe nkewa iwu
- `&` — Usoro na-arụ n'azụ
- `|` — Pipe
- `<`, `>` — Ntugharị
- `` ` `` — Nnọchi iwu
- `$` — Mgbasa mgbanwe
- `\r`, `\n` — Nkwụsị ahịrị

### Nnyocha Aha Binary

ACP na-enyocha na binary nke iwu ụdị dabara na aha binary a tụrụ anya ya (ọ gwụla ma ọ bụ agent ahaziri iche).

### Ikewapụ Usoro

Session ACP ọ bụla na-arụ n'ime child process nke ya. A na-akwụsị usoro ahụ mgbe session ahụ kwụsịrị ma ọ bụ oge ya gafere.

---

## Arụmọrụ

### Arụmọrụ Nchọpụta

- **Oku mbụ**: ~50-200ms (na-agba iwu `version` maka agent ọ bụla)
- **Oku sitere na cache**: <1ms (na-eweghachi site na cache)
- **TTL cache**: Sekọnd 60

### Arụmọrụ Prompt

- **Mbido**: ~50-100ms
- **Izipụ prompt**: ~10-50ms
- **Ichere nzaghachi**: Dabere na agent CLI (na-abụkarị sekọnd 1-30)
- **Nkwụsị**: ~sekọnd 5 (SIGTERM) + ozugbo (SIGKILL)

### Ojiji Akụrụngwa

- **Ebe nchekwa kwa session**: ~10-50MB (dabere na agent CLI)
- **CPU**: Pere mpe (dabere na I/O)
- **Diski**: Ọ dịghị

---

## Nchọpụta na Ndozi Nsogbu

### Njehie "Unknown agent"

**Nsogbu**: `acpManager.spawn()` na-atụpụ `Unknown agent: <id>`

**Ngwọta**: Ọ bụ naanị agent ndị a ka ekwenyere n'ime `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

A ga-eji aka bido agent ndị ọzọ ma ọ bụ site na nkọwa agent ahaziri iche.

### Njehie "Session not alive"

**Nsogbu**: `acpManager.sendPrompt()` na-atụpụ `Session ${sessionId} is not alive`

**Ngwọta**: Session ahụ nwere ike ịpụla ma ọ bụ a kwụsịla ya. Lelee ọnọdụ session ahụ:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Bido session ahụ ọzọ
  acpManager.spawn("claude", "claude", [], {});
}
```

### Njehie "ACP timeout"

**Nsogbu**: `acpManager.sendPrompt()` na-atụpụ `ACP timeout after 120000ms`

**Ngwọta**: Bulie oge nkwụsị:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // Nkeji 5
```

### Achọpụtaghị CLI

**Nsogbu**: `detectInstalledAgents()` anaghị ahụ CLI gị

**Ngwọta**:

1. **Lelee PATH**: Gbaa mbọ hụ na CLI dị na PATH sistemụ gị
2. **Lelee iwu ụdị**: Jiri aka gbaa `claude --version`
3. **Lelee ikikere**: Gbaa mbọ hụ na CLI nwere ike ịrụ ọrụ
4. **Agent ahaziri iche**: Tinye nkọwa agent ahaziri iche maka CLI ndị na-abụghị ọkọlọtọ

### Ajụrụ Ikikere

**Nsogbu**: ACP enweghị ike ịgba CLI ahụ

**Ngwọta**:

1. **Lelee ikikere faịlụ**: `chmod +x /usr/local/bin/claude`
2. **Lelee onye nwe ya**: Gbaa mbọ hụ na OmniRoute nwere ikikere ịgụ/ịrụ
3. **Lelee SELinux/AppArmor**: Ọ nwere ike igbochi mbido usoro

---

## Ọmụmaatụ

### Ọmụmaatụ 1: Mepụta ma Jiri Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Chọpụta ndị nnọchiteanya arụnyere
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Mepụta nnọkọ ọhụrụ
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Zipụ ntụziaka
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Hichapụ ihe ndị fọdụrụ
  acpManager.kill(session.id);
}
```

### Ọmụmaatụ 2: Nchọpụta Akpaka nwere Nhọrọ Ndabere

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Buru ụzọ nwaa Claude, jiri Codex dịka nhọrọ ndabere
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

### Ọmụmaatụ 3: Onye Nnọchiteanya Ahaziri Ahazi

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Debanye onye nnọchiteanya CLI ahaziri ahazi
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

// Ugbu a detectInstalledAgents() ga-agụnye "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Gịnị Na-esote?

- **[Ntụaka API](../reference/API_REFERENCE.md)** — Ebe njedebe REST API
- **[Ntụaka Onye Na-eweta Ọrụ](../reference/PROVIDER_REFERENCE.md)** — Ndị na-eweta ọrụ 352 niile
- **[Sava MCP](./MCP-SERVER.md)** — Njikọta Model Context Protocol
- **[Sava A2A](./A2A-SERVER.md)** — Usoro Agent-to-Agent
- **[Onye Nnọchiteanya Ígwé Ojii](./CLOUD_AGENT.md)** — Ndị nnọchiteanya dabere n'ígwé ojii

---

## Ntụaka

- [Ọrụ AionUi](https://github.com/iOfficeAI/AionUi) — Ihe mkpali maka nchọpụta akpaka ACP
- [Koodu Isi Mmalite ACP](../../src/lib/acp/) — Nkọwa mmejuputa
  - `manager.ts` — Njikwa usoro ndụ nke proces
  - `registry.ts` — Nchọpụta na ndebanye ndị nnọchiteanya
  - `index.ts` — Mbupụ API ọha
