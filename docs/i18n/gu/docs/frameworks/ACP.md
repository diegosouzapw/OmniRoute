# ACP (Agent Client Protocol) (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP, HTTP APIsનો ઉપયોગ કરવાને બદલે, OmniRouteને CLI એજન્ટો (જેમ કે Claude Code, Codex)ને ચાઇલ્ડ પ્રોસેસ તરીકે શરૂ કરવાની સુવિધા આપે છે. આ તમને "CLI-as-backend" ટ્રાન્સપોર્ટ આપે છે.

---

## ACP શું છે?

ACP (Agent Client Protocol) એ OmniRoute માટેનું **"CLI-as-backend" ટ્રાન્સપોર્ટ** છે. AI પ્રદાતાઓને કરવામાં આવતા HTTP API કૉલ્સને ઇન્ટરસેપ્ટ કરવાને બદલે, ACP **CLI એજન્ટોને ચાઇલ્ડ પ્રોસેસ તરીકે શરૂ કરે છે** અને તેમના મૂળ ઇન્ટરફેસ મારફતે પ્રોમ્પ્ટ્સ મોકલે છે.

### ACPનો ઉપયોગ શા માટે કરવો?

| લાભ                    | વર્ણન                                               |
| ---------------------- | --------------------------------------------------- |
| **API કીઝની જરૂર નથી** | તમારા હાલના CLI પ્રમાણીકરણનો ઉપયોગ કરે છે           |
| **મૂળ પ્રોટોકોલ**      | દરેક CLIના મૂળ ઇનપુટ/આઉટપુટ ફોર્મેટનો ઉપયોગ કરે છે  |
| **સ્વચાલિત શોધ**       | તમારી સિસ્ટમ પર ઇન્સ્ટોલ કરેલા CLIs શોધે છે         |
| **15 બિલ્ટ-ઇન એજન્ટો** | લોકપ્રિય CLI ટૂલ્સ માટે પૂર્વ-ગોઠવાયેલ              |
| **કસ્ટમ એજન્ટો**       | સેટિંગ્સ મારફતે તમારા પોતાના CLI ટૂલ્સ ઉમેરો        |
| **પ્રોસેસ મેનેજમેન્ટ** | લાઇફસાઇકલ (શરૂ કરવું, મોકલવું, બંધ કરવું) સંભાળે છે |

---

## સપોર્ટેડ CLI એજન્ટો

ACP મૂળભૂત રીતે **15 બિલ્ટ-ઇન CLI એજન્ટો**ને સપોર્ટ કરે છે:

| એજન્ટ ID      | પ્રદર્શિત નામ      | બાઇનરી        | પ્રોટોકોલ |
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

### કસ્ટમ એજન્ટો

તમે સેટિંગ્સ મારફતે તમારા પોતાના CLI એજન્ટો ઉમેરી શકો છો. કસ્ટમ એજન્ટો બિલ્ટ-ઇન એજન્ટો જેવી જ સુવિધાઓને સપોર્ટ કરે છે.

---

## ઝડપી શરૂઆત

### પગલું 1: CLI એજન્ટ ઇન્સ્ટોલ કરો

```bash
# ઉદાહરણ: Claude Code CLI ઇન્સ્ટોલ કરો
npm install -g @anthropic-ai/claude-code

# ઇન્સ્ટોલેશન ચકાસો
claude --version
```

### પગલું 2: ACP સ્વચાલિત શોધ

ACP તમારી સિસ્ટમ પર ઇન્સ્ટોલ કરેલા CLI એજન્ટોને આપમેળે શોધે છે. કોઈ રૂપરેખાંકનની જરૂર નથી!

### પગલું 3: ACP ટ્રાન્સપોર્ટનો ઉપયોગ કરો

એકવાર શોધાઈ ગયા પછી, ACPનો ઉપયોગ કોઈપણ સપોર્ટેડ પ્રદાતા માટે ટ્રાન્સપોર્ટ તરીકે કરી શકાય છે. CLI ઉપલબ્ધ હોય ત્યારે OmniRoute આપમેળે ACPનો ઉપયોગ કરશે.

---

## ACP કેવી રીતે કાર્ય કરે છે

### આર્કિટેક્ચર

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP પ્રોક્સી) │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  ચાઇલ્ડ પ્રોસેસ │
│  (CLI એજન્ટ)    │
│                 │
│  stdin  ◄──────┤  પ્રોમ્પ્ટ મોકલો
│  stdout ──────►│  પ્રતિસાદ મેળવો
│  stderr ──────►│  ભૂલો મેળવો
└─────────────────┘
```

### પ્રોસેસ લાઇફસાઇકલ

1. **શરૂ કરવું** — ACP, CLI એજન્ટ માટે ચાઇલ્ડ પ્રોસેસ બનાવે છે
2. **મોકલવું** — ACP, પ્રોસેસના stdinમાં પ્રોમ્પ્ટ્સ લખે છે
3. **પ્રાપ્ત કરવું** — ACP, stdout/stderrમાંથી પ્રતિસાદો વાંચે છે
4. **નિષ્ક્રિયતાની શોધ** — પ્રતિસાદ પૂર્ણ થયો છે એમ માનતા પહેલાં ACP 2 સેકન્ડની નિષ્ક્રિયતાની રાહ જુએ છે
5. **બંધ કરવું** — ACP પ્રોસેસને સમાપ્ત કરે છે (SIGTERM, પછી 5s બાદ SIGKILL)

### સંચાર પ્રોટોકોલ

ACP, CLI એજન્ટો સાથે સંચાર કરવા માટે **stdio** (સ્ટાન્ડર્ડ ઇનપુટ/આઉટપુટ)નો ઉપયોગ કરે છે. પ્રોટોકોલ આ પ્રમાણે છે:

1. **પ્રોમ્પ્ટ મોકલો** — નવી લાઇન સાથે stdinમાં લખો
2. **પ્રતિસાદની રાહ જુઓ** — નિષ્ક્રિયતા સુધી stdoutમાંથી વાંચો (2s સુધી કોઈ આઉટપુટ નહીં)
3. **ટાઇમઆઉટ** — ડિફૉલ્ટ રૂપે 120 સેકન્ડ (રૂપરેખાંકિત કરી શકાય છે)

---

## API સંદર્ભ

### રજિસ્ટ્રી ફંક્શન્સ

#### `detectInstalledAgents()`

સિસ્ટમ પર ઇન્સ્ટોલ થયેલા તમામ CLI એજન્ટ શોધે છે. પરિણામો 60 સેકન્ડ માટે કૅશ કરવામાં આવે છે.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// પરત કરે છે: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // દા.ત., "codex", "claude"
  name: string; // પ્રદર્શિત નામ
  binary: string; // શરૂ કરવા માટેનું બાઇનરી નામ
  versionCommand: string; // વર્ઝન શોધવાનો કમાન્ડ
  version: string | null; // શોધાયેલું વર્ઝન (ઇન્સ્ટોલ ન હોય તો null)
  installed: boolean; // એજન્ટ ઇન્સ્ટોલ થયેલો છે કે નહીં
  providerAlias: string; // OmniRoute માં પ્રોવાઇડર ID
  spawnArgs: string[]; // શરૂ કરતી વખતે પાસ કરવાની આર્ગ્યુમેન્ટ્સ
  protocol: "stdio" | "http"; // સંચાર પ્રોટોકોલ
  isCustom?: boolean; // આ વપરાશકર્તા-વ્યાખ્યાયિત કસ્ટમ એજન્ટ છે કે નહીં
}
```

#### `getAvailableAgents()`

ફક્ત એવા એજન્ટ મેળવે છે જે ઇન્સ્ટોલ થયેલા હોય અને ACP માટે ઉપલબ્ધ હોય.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// પરત કરે છે: CliAgentInfo[] (ફક્ત ઇન્સ્ટોલ થયેલા એજન્ટ)
```

#### `getAgentById(id)`

ID દ્વારા ચોક્કસ એજન્ટ મેળવે છે.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// પરત કરે છે: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

સેટિંગ્સમાંથી કસ્ટમ એજન્ટની વ્યાખ્યાઓ સેટ કરે છે.

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

### મેનેજર ફંક્શન્સ

#### `acpManager.spawn(agentId, binary, args, env)`

નવી CLI એજન્ટ પ્રોસેસ શરૂ કરે છે.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* કસ્ટમ એન્વાયરમેન્ટ વેરિએબલ્સ */
});
// પરત કરે છે: AcpSession
```

**મંજૂર એજન્ટ IDs**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

CLI એજન્ટને પ્રોમ્પ્ટ મોકલે છે અને પ્રતિસાદ એકત્રિત કરે છે.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 મિનિટનો ટાઇમઆઉટ
);
// પરત કરે છે: Promise<string>
```

#### `acpManager.kill(sessionId)`

સેશન સમાપ્ત કરે છે અને સંસાધનો સાફ કરે છે.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// પરત કરે છે: boolean
```

#### `acpManager.getActiveSessions()`

તમામ સક્રિય સેશન્સ મેળવે છે.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// પરત કરે છે: AcpSession[]
```

#### `acpManager.killAll()`

તમામ સેશન્સ સમાપ્ત કરે છે.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### સેશન ઇન્ટરફેસ

```typescript
interface AcpSession {
  id: string; // અનન્ય સેશન ID
  agentId: string; // એજન્ટ ID (દા.ત., "claude")
  process: ChildProcess; // ચાઇલ્ડ પ્રોસેસ હૅન્ડલ
  alive: boolean; // પ્રોસેસ કાર્યરત છે કે નહીં
  stdoutBuffer: string; // સંચિત stdout બફર
  stderrBuffer: string; // સંચિત stderr બફર
  createdAt: Date; // બનાવ્યાનો ટાઇમસ્ટૅમ્પ
}
```

### ઇવેન્ટ્સ

`AcpManager`, `EventEmitter` ને વિસ્તારે છે અને નીચેના ઇવેન્ટ્સ ઉત્સર્જિત કરે છે:

#### `stdout`

CLI એજન્ટ stdout પર લખે ત્યારે ઉત્સર્જિત થાય છે.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI એજન્ટ stderr પર લખે ત્યારે ઉત્સર્જિત થાય છે.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI એજન્ટ પ્રોસેસ બંધ થાય ત્યારે ઉત્સર્જિત થાય છે.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI એજન્ટ પ્રોસેસમાં ભૂલ થાય ત્યારે ઉત્સર્જિત થાય છે.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## રૂપરેખાંકન

### પર્યાવરણ વેરિએબલ્સ

ACP પેરેન્ટ પ્રોસેસમાંથી તમામ પર્યાવરણ વેરિએબલ્સ વારસામાં મેળવે છે અને તેને કસ્ટમ પર્યાવરણ વેરિએબલ્સ વડે વિસ્તારી શકાય છે:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### સ્પૉન આર્ગ્યુમેન્ટ્સ

દરેક એજન્ટ માટે ડિફૉલ્ટ સ્પૉન આર્ગ્યુમેન્ટ્સ રજિસ્ટ્રીમાં વ્યાખ્યાયિત હોય છે. તમે તેમને ઓવરરાઇડ કરી શકો છો:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### સમયમર્યાદાઓ

ડિફૉલ્ટ પ્રોમ્પ્ટ સમયમર્યાદા **120 સેકન્ડ** (2 મિનિટ) છે. તમે તેને ઓવરરાઇડ કરી શકો છો:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 મિનિટ
```

### ડિટેક્શન કૅશ

ખર્ચાળ ફાઇલસિસ્ટમ સ્કૅન્સ ટાળવા માટે એજન્ટ ડિટેક્શનને **60 સેકન્ડ** માટે કૅશ કરવામાં આવે છે. બળજબરીથી રિફ્રેશ કરવા માટે:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## સુરક્ષા

### કમાન્ડ ઇન્જેક્શન નિવારણ

કમાન્ડ ઇન્જેક્શન હુમલાઓ અટકાવવા માટે ACP વર્ઝન કમાન્ડ્સને માન્ય કરે છે:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

આ અક્ષરો ધરાવતી વર્ઝન કમાન્ડ્સ નકારવામાં આવે છે:

- `;` — કમાન્ડ વિભાજક
- `&` — બૅકગ્રાઉન્ડ પ્રોસેસ
- `|` — પાઇપ
- `<`, `>` — રીડાયરેક્શન
- `` ` `` — કમાન્ડ સબ્સ્ટિટ્યુશન
- `$` — વેરિએબલ વિસ્તરણ
- `\r`, `\n` — લાઇન બ્રેક્સ

### બાઇનરી નામની માન્યતા

ACP ચકાસે છે કે વર્ઝન કમાન્ડનું બાઇનરી નામ અપેક્ષિત બાઇનરી નામ સાથે મેળ ખાય છે (સિવાય કે તે કસ્ટમ એજન્ટ હોય).

### પ્રોસેસ આઇસોલેશન

દરેક ACP સેશન તેની પોતાની ચાઇલ્ડ પ્રોસેસમાં ચાલે છે. સેશન સમાપ્ત થાય અથવા તેની સમયમર્યાદા પૂરી થાય ત્યારે પ્રોસેસને બંધ કરવામાં આવે છે.

---

## કાર્યક્ષમતા

### ડિટેક્શન કાર્યક્ષમતા

- **પ્રથમ કૉલ**: ~50-200ms (દરેક એજન્ટ માટે `version` કમાન્ડ ચલાવે છે)
- **કૅશ કરેલા કૉલ્સ**: <1ms (કૅશમાંથી પરત કરે છે)
- **કૅશ TTL**: 60 સેકન્ડ

### પ્રોમ્પ્ટ કાર્યક્ષમતા

- **સ્પૉન**: ~50-100ms
- **પ્રોમ્પ્ટ મોકલવો**: ~10-50ms
- **પ્રતિસાદની રાહ જોવી**: CLI એજન્ટ પર આધાર રાખે છે (સામાન્ય રીતે 1-30 સેકન્ડ)
- **બંધ કરવું**: ~5 સેકન્ડ (SIGTERM) + તાત્કાલિક (SIGKILL)

### સંસાધન વપરાશ

- **સેશન દીઠ મેમરી**: ~10-50MB (CLI એજન્ટ પર આધાર રાખે છે)
- **CPU**: ન્યૂનતમ (I/O બાઉન્ડ)
- **ડિસ્ક**: કંઈ નહીં

---

## સમસ્યાનિવારણ

### "Unknown agent" ભૂલ

**સમસ્યા**: `acpManager.spawn()` દ્વારા `Unknown agent: <id>` ભૂલ ફેંકાય છે

**ઉકેલ**: `spawn()`માં ફક્ત આ એજન્ટ્સને મંજૂરી છે:

- `claude`
- `codex`
- `gemini`
- `qwen`

અન્ય એજન્ટ્સને મેન્યુઅલી અથવા કસ્ટમ એજન્ટ વ્યાખ્યાઓ મારફતે સ્પૉન કરવા આવશ્યક છે.

### "Session not alive" ભૂલ

**સમસ્યા**: `acpManager.sendPrompt()` દ્વારા `Session ${sessionId} is not alive` ભૂલ ફેંકાય છે

**ઉકેલ**: સેશન કદાચ સમાપ્ત થઈ ગયું હોય અથવા બંધ કરવામાં આવ્યું હોય. સેશનની સ્થિતિ તપાસો:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // સેશનને ફરીથી સ્પૉન કરો
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" ભૂલ

**સમસ્યા**: `acpManager.sendPrompt()` દ્વારા `ACP timeout after 120000ms` ભૂલ ફેંકાય છે

**ઉકેલ**: સમયમર્યાદા વધારો:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 મિનિટ
```

### CLI શોધાયું નથી

**સમસ્યા**: `detectInstalledAgents()` તમારા CLIને શોધી શકતું નથી

**ઉકેલો**:

1. **PATH તપાસો**: ખાતરી કરો કે CLI તમારા સિસ્ટમ PATHમાં છે
2. **વર્ઝન કમાન્ડ તપાસો**: `claude --version` મેન્યુઅલી ચલાવો
3. **પરવાનગીઓ તપાસો**: ખાતરી કરો કે CLI એક્ઝિક્યુટ કરી શકાય તેવું છે
4. **કસ્ટમ એજન્ટ**: બિન-માનક CLIs માટે કસ્ટમ એજન્ટ વ્યાખ્યા ઉમેરો

### પરવાનગી નકારવામાં આવી

**સમસ્યા**: ACP CLIને એક્ઝિક્યુટ કરી શકતું નથી

**ઉકેલો**:

1. **ફાઇલ પરવાનગીઓ તપાસો**: `chmod +x /usr/local/bin/claude`
2. **માલિકી તપાસો**: ખાતરી કરો કે OmniRoute પાસે રીડ/એક્ઝિક્યુટ પરવાનગીઓ છે
3. **SELinux/AppArmor તપાસો**: તે પ્રોસેસ સ્પૉનિંગને અવરોધી શકે છે

---

## ઉદાહરણો

### ઉદાહરણ 1: Claude Code શરૂ કરો અને તેનો ઉપયોગ કરો

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// ઇન્સ્ટોલ કરેલા એજન્ટ શોધો
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // નવું સત્ર શરૂ કરો
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // પ્રોમ્પ્ટ મોકલો
  const response = await acpManager.sendPrompt(
    session.id,
    "100 શબ્દોમાં ક્વોન્ટમ કમ્પ્યુટિંગ સમજાવો"
  );

  console.log("Claudeનો પ્રતિસાદ:", response);

  // સાફસફાઈ કરો
  acpManager.kill(session.id);
}
```

### ઉદાહરણ 2: ફૉલબૅક સાથે સ્વતઃ-શોધ

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// પહેલાં Claude અજમાવો, પછી ફૉલબૅક તરીકે Codexનો ઉપયોગ કરો
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("કોઈ ACP-સુસંગત CLI એજન્ટ મળ્યો નથી");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "નમસ્તે!");

acpManager.kill(session.id);
```

### ઉદાહરણ 3: કસ્ટમ એજન્ટ

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// કસ્ટમ CLI એજન્ટ રજિસ્ટર કરો
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

// હવે detectInstalledAgents()માં "my-llm-cli" સામેલ હશે
const agents = detectInstalledAgents();
```

---

## આગળ શું?

- **[API સંદર્ભ](../reference/API_REFERENCE.md)** — REST API એન્ડપૉઇન્ટ્સ
- **[પ્રદાતા સંદર્ભ](../reference/PROVIDER_REFERENCE.md)** — તમામ 352 પ્રદાતાઓ
- **[MCP સર્વર](./MCP-SERVER.md)** — Model Context Protocol એકીકરણ
- **[A2A સર્વર](./A2A-SERVER.md)** — Agent-to-Agent પ્રોટોકૉલ
- **[ક્લાઉડ એજન્ટ](./CLOUD_AGENT.md)** — ક્લાઉડ-આધારિત એજન્ટો

---

## સંદર્ભ

- [AionUi પ્રોજેક્ટ](https://github.com/iOfficeAI/AionUi) — ACP સ્વતઃ-શોધ માટેની પ્રેરણા
- [ACP સ્રોત કોડ](../../src/lib/acp/) — અમલીકરણની વિગતો
  - `manager.ts` — પ્રોસેસ જીવનચક્ર વ્યવસ્થાપન
  - `registry.ts` — એજન્ટની શોધ અને નોંધણી
  - `index.ts` — સાર્વજનિક API એક્સપોર્ટ્સ
