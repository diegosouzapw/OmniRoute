# ACP (Agent Client Protocol) (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Կարճ ասած**. ACP-ն OmniRoute-ին թույլ է տալիս CLI գործակալները (օրինակ՝ Claude Code-ը, Codex-ը) գործարկել որպես ենթապրոցեսներ՝ HTTP API-ներ օգտագործելու փոխարեն։ Սա ապահովում է «CLI-ը որպես հետնամաս» փոխադրման եղանակ։

---

## Ի՞նչ է ACP-ն։

ACP-ն (Agent Client Protocol) OmniRoute-ի համար **«CLI-ը որպես հետնամաս» փոխադրման եղանակ** է։ AI մատակարարներին ուղղված HTTP API կանչերը որսալու փոխարեն ACP-ն **CLI գործակալները գործարկում է որպես ենթապրոցեսներ** և հարցումները փոխանցում դրանց բնիկ միջերեսի միջոցով։

### Ինչո՞ւ օգտագործել ACP-ն։

| Առավելություն                 | Նկարագրություն                                               |
| ----------------------------- | ------------------------------------------------------------ |
| **API բանալիներ պետք չեն**    | Օգտագործում է ձեր առկա CLI նույնականացումը                   |
| **Բնիկ արձանագրություն**      | Օգտագործում է յուրաքանչյուր CLI-ի բնիկ մուտք/ելքի ձևաչափը    |
| **Ինքնաբերաբար հայտնաբերում** | Հայտնաբերում է ձեր համակարգում տեղադրված CLI-ները            |
| **15 ներկառուցված գործակալ**  | Նախապես կազմաձևված է հանրաճանաչ CLI գործիքների համար         |
| **Հատուկ գործակալներ**        | Կարգավորումների միջոցով ավելացրեք ձեր սեփական CLI գործիքները |
| **Պրոցեսների կառավարում**     | Կառավարում է կենսացիկլը (գործարկում, ուղարկում, դադարեցում)  |

---

## Աջակցվող CLI գործակալներ

ACP-ն սկզբնապես աջակցում է **15 ներկառուցված CLI գործակալի**.

| Գործակալի ID  | Ցուցադրվող անուն   | Երկուական ֆայլ | Արձանագրություն |
| ------------- | ------------------ | -------------- | --------------- |
| `codex`       | OpenAI Codex CLI   | `codex`        | stdio           |
| `claude`      | Claude Code CLI    | `claude`       | stdio           |
| `goose`       | Goose CLI          | `goose`        | stdio           |
| `openclaw`    | OpenClaw           | `openclaw`     | stdio           |
| `aider`       | Aider              | `aider`        | stdio           |
| `opencode`    | OpenCode           | `opencode`     | stdio           |
| `cline`       | Cline              | `cline`        | stdio           |
| `qwen`        | Qwen Code          | `qwen --acp`   | stdio           |
| `forge`       | ForgeCode          | `forge`        | stdio           |
| `amazon-q`    | Amazon Q Developer | `q`            | stdio           |
| `interpreter` | Open Interpreter   | `interpreter`  | stdio           |
| `cursor-cli`  | Cursor CLI         | `cursor`       | stdio           |
| `warp`        | Warp AI            | `warp`         | stdio           |
| `gemini`      | Gemini CLI         | `gemini`       | stdio           |
| `zcode`       | ZCode              | `zcode`        | stdio           |

### Հատուկ գործակալներ

Կարգավորումների միջոցով կարող եք ավելացնել ձեր սեփական CLI գործակալները։ Հատուկ գործակալներն աջակցում են նույն հնարավորությունները, ինչ ներկառուցված գործակալները։

---

## Արագ մեկնարկ

### Քայլ 1. Տեղադրեք CLI գործակալ

```bash
# Օրինակ՝ տեղադրեք Claude Code CLI-ը
npm install -g @anthropic-ai/claude-code

# Ստուգեք տեղադրումը
claude --version
```

### Քայլ 2. ACP-ի ինքնաբերաբար հայտնաբերում

ACP-ն ինքնաբերաբար հայտնաբերում է ձեր համակարգում տեղադրված CLI գործակալները։ Ոչ մի կազմաձևում անհրաժեշտ չէ։

### Քայլ 3. Օգտագործեք ACP փոխադրումը

Հայտնաբերվելուց հետո ACP-ն կարող է օգտագործվել որպես փոխադրման եղանակ ցանկացած աջակցվող մատակարարի համար։ OmniRoute-ն ինքնաբերաբար կօգտագործի ACP-ն, երբ CLI-ը հասանելի լինի։

---

## Ինչպե՞ս է աշխատում ACP-ն

### Ճարտարապետություն

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP պրոքսի)  │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Ենթապրոցես     │
│  (CLI գործակալ) │
│                 │
│  stdin  ◄──────┤  Ուղարկել հարցումը
│  stdout ──────►│  Ստանալ պատասխանը
│  stderr ──────►│  Ստանալ սխալները
└─────────────────┘
```

### Պրոցեսի կենսացիկլը

1. **Գործարկում** — ACP-ն CLI գործակալի համար ստեղծում է ենթապրոցես
2. **Ուղարկում** — ACP-ն հարցումները գրում է պրոցեսի stdin-ում
3. **Ստացում** — ACP-ն պատասխանները կարդում է stdout-ից/stderr-ից
4. **Անգործության հայտնաբերում** — ACP-ն սպասում է 2 վայրկյան անգործության՝ նախքան պատասխանը ամբողջական համարելը
5. **Դադարեցում** — ACP-ն դադարեցնում է պրոցեսը (SIGTERM, ապա՝ SIGKILL 5 վրկ անց)

### Հաղորդակցման արձանագրություն

CLI գործակալների հետ հաղորդակցվելու համար ACP-ն օգտագործում է **stdio**-ն (ստանդարտ մուտք/ելք)։ Արձանագրությունը հետևյալն է.

1. **Ուղարկել հարցումը** — Գրել stdin-ում՝ նոր տողով
2. **Սպասել պատասխանին** — Կարդալ stdout-ից մինչև անգործություն (2 վրկ առանց ելքի)
3. **Սպասման ժամկետի ավարտ** — Լռելյայն՝ 120 վայրկյան (կազմաձևելի)

---

## API-ի տեղեկատու

### Ռեեստրի ֆունկցիաներ

#### `detectInstalledAgents()`

Հայտնաբերում է համակարգում տեղադրված բոլոր CLI գործակալներին։ Արդյունքները պահվում են քեշում 60 վայրկյան։

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Վերադարձնում է՝ CliAgentInfo[]

interface CliAgentInfo {
  id: string; // օրինակ՝ "codex", "claude"
  name: string; // Ցուցադրվող անուն
  binary: string; // Գործարկվող երկուական ֆայլի անունը
  versionCommand: string; // Տարբերակը հայտնաբերող հրաման
  version: string | null; // Հայտնաբերված տարբերակ (null, եթե տեղադրված չէ)
  installed: boolean; // Արդյոք գործակալը տեղադրված է
  providerAlias: string; // Մատակարարի ID-ն OmniRoute-ում
  spawnArgs: string[]; // Գործարկման ժամանակ փոխանցվող արգումենտներ
  protocol: "stdio" | "http"; // Հաղորդակցման արձանագրություն
  isCustom?: boolean; // Արդյոք սա օգտատիրոջ կողմից սահմանված հատուկ գործակալ է
}
```

#### `getAvailableAgents()`

Ստանում է միայն այն գործակալներին, որոնք տեղադրված և հասանելի են ACP-ի համար։

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Վերադարձնում է՝ CliAgentInfo[] (միայն տեղադրված գործակալները)
```

#### `getAgentById(id)`

Ստանում է կոնկրետ գործակալին՝ ըստ ID-ի։

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Վերադարձնում է՝ CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Կարգավորումներից սահմանում է հատուկ գործակալների նկարագրությունները։

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

### Կառավարիչի ֆունկցիաներ

#### `acpManager.spawn(agentId, binary, args, env)`

Գործարկում է CLI գործակալի նոր գործընթաց։

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* միջավայրի հատուկ փոփոխականներ */
});
// Վերադարձնում է՝ AcpSession
```

**Գործակալների թույլատրելի ID-ներ**՝ `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Հարցում է ուղարկում CLI գործակալին և հավաքում պատասխանը։

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // սպասման առավելագույն ժամանակը՝ 2 րոպե
);
// Վերադարձնում է՝ Promise<string>
```

#### `acpManager.kill(sessionId)`

Դադարեցնում է աշխատաշրջանը և մաքրում ռեսուրսները։

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Վերադարձնում է՝ boolean
```

#### `acpManager.getActiveSessions()`

Ստանում է բոլոր ակտիվ աշխատաշրջանները։

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Վերադարձնում է՝ AcpSession[]
```

#### `acpManager.killAll()`

Դադարեցնում է բոլոր աշխատաշրջանները։

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Աշխատաշրջանի ինտերֆեյս

```typescript
interface AcpSession {
  id: string; // Աշխատաշրջանի եզակի ID
  agentId: string; // Գործակալի ID (օրինակ՝ "claude")
  process: ChildProcess; // Ենթագործընթացի հղիչ
  alive: boolean; // Արդյոք գործընթացն ակտիվ է
  stdoutBuffer: string; // Կուտակված stdout բուֆեր
  stderrBuffer: string; // Կուտակված stderr բուֆեր
  createdAt: Date; // Ստեղծման ժամանակային դրոշմ
}
```

### Իրադարձություններ

`AcpManager`-ը ընդլայնում է `EventEmitter`-ը և արձակում հետևյալ իրադարձությունները՝

#### `stdout`

Արձակվում է, երբ CLI գործակալը գրում է stdout-ում։

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Արձակվում է, երբ CLI գործակալը գրում է stderr-ում։

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Արձակվում է, երբ CLI գործակալի գործընթացն ավարտվում է։

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Արձակվում է, երբ CLI գործակալի գործընթացում սխալ է առաջանում։

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Կազմաձևում

### Միջավայրի փոփոխականներ

ACP-ն ժառանգում է բոլոր միջավայրի փոփոխականները ծնող գործընթացից և կարող է ընդլայնվել հատուկ միջավայրի փոփոխականներով.

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Գործընթացի գործարկման արգումենտներ

Յուրաքանչյուր գործակալ ունի ռեեստրում սահմանված գործընթացի գործարկման լռելյայն արգումենտներ։ Դուք կարող եք վերասահմանել դրանք.

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Սպասման ժամանակներ

Հուշման սպասման լռելյայն ժամանակը **120 վայրկյան** է (2 րոպե)։ Դուք կարող եք վերասահմանել այն.

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 րոպե
```

### Հայտնաբերման քեշ

Գործակալների հայտնաբերման արդյունքները պահվում են քեշում **60 վայրկյան**՝ ֆայլային համակարգի ծախսատար սկանավորումներից խուսափելու համար։ Հարկադիր թարմացնելու համար.

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Անվտանգություն

### Հրամանների ներարկման կանխարգելում

ACP-ն վավերացնում է տարբերակի հրամանները՝ հրամանների ներարկման հարձակումները կանխելու համար.

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Այս նիշերը պարունակող տարբերակի հրամանները մերժվում են.

- `;` — Հրամանների բաժանիչ
- `&` — Ֆոնային գործընթաց
- `|` — Խողովակ
- `<`, `>` — Վերաուղղորդում
- `` ` `` — Հրամանի փոխարինում
- `$` — Փոփոխականի ընդլայնում
- `\r`, `\n` — Տողադարձեր

### Երկուական ֆայլի անվան վավերացում

ACP-ն վավերացնում է, որ տարբերակի հրամանի երկուական ֆայլի անունը համապատասխանում է ակնկալվող երկուական ֆայլի անվանը (եթե այն հատուկ գործակալ չէ)։

### Գործընթացների մեկուսացում

Յուրաքանչյուր ACP աշխատաշրջան գործարկվում է իր առանձին զավակ գործընթացում։ Գործընթացն ավարտվում է, երբ աշխատաշրջանն ավարտվում է կամ լրանում է սպասման ժամանակը։

---

## Արտադրողականություն

### Հայտնաբերման արտադրողականություն

- **Առաջին կանչ**՝ ~50-200ms (յուրաքանչյուր գործակալի համար գործարկվում է `version` հրամանը)
- **Քեշավորված կանչեր**՝ <1ms (վերադարձվում է քեշից)
- **Քեշի TTL**՝ 60 վայրկյան

### Հուշման մշակման արտադրողականություն

- **Գործարկում**՝ ~50-100ms
- **Հուշման ուղարկում**՝ ~10-50ms
- **Պատասխանի սպասում**՝ կախված է CLI գործակալից (սովորաբար՝ 1-30 վայրկյան)
- **Ավարտում**՝ ~5 վայրկյան (SIGTERM) + անմիջապես (SIGKILL)

### Ռեսուրսների օգտագործում

- **Հիշողություն՝ յուրաքանչյուր աշխատաշրջանի համար**՝ ~10-50MB (կախված է CLI գործակալից)
- **CPU**՝ նվազագույն (I/O-ով պայմանավորված)
- **Սկավառակ**՝ չի օգտագործվում

---

## Խնդիրների լուծում

### «Անհայտ գործակալ» սխալ

**Խնդիր**՝ `acpManager.spawn()`-ը նետում է `Unknown agent: <id>` սխալը

**Լուծում**՝ `spawn()`-ում թույլատրվում են միայն հետևյալ գործակալները.

- `claude`
- `codex`
- `gemini`
- `qwen`

Մյուս գործակալները պետք է գործարկվեն ձեռքով կամ հատուկ գործակալների սահմանումների միջոցով։

### «Աշխատաշրջանը ակտիվ չէ» սխալ

**Խնդիր**՝ `acpManager.sendPrompt()`-ը նետում է `Session ${sessionId} is not alive` սխալը

**Լուծում**՝ աշխատաշրջանը կարող է ավարտված կամ հարկադրաբար դադարեցված լինել։ Ստուգեք աշխատաշրջանի կարգավիճակը.

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Կրկին գործարկել աշխատաշրջանը
  acpManager.spawn("claude", "claude", [], {});
}
```

### «ACP-ի սպասման ժամանակը լրացել է» սխալ

**Խնդիր**՝ `acpManager.sendPrompt()`-ը նետում է `ACP timeout after 120000ms` սխալը

**Լուծում**՝ ավելացրեք սպասման ժամանակը.

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 րոպե
```

### CLI-ն չի հայտնաբերվել

**Խնդիր**՝ `detectInstalledAgents()`-ը չի գտնում ձեր CLI-ն

**Լուծումներ**.

1. **Ստուգեք PATH-ը**՝ համոզվեք, որ CLI-ն գտնվում է ձեր համակարգի PATH-ում
2. **Ստուգեք տարբերակի հրամանը**՝ ձեռքով գործարկեք `claude --version`
3. **Ստուգեք թույլտվությունները**՝ համոզվեք, որ CLI-ն գործարկելի է
4. **Հատուկ գործակալ**՝ ոչ ստանդարտ CLI-ների համար ավելացրեք հատուկ գործակալի սահմանում

### Մուտքն արգելված է

**Խնդիր**՝ ACP-ն չի կարող գործարկել CLI-ն

**Լուծումներ**.

1. **Ստուգեք ֆայլի թույլտվությունները**՝ `chmod +x /usr/local/bin/claude`
2. **Ստուգեք սեփականության իրավունքը**՝ համոզվեք, որ OmniRoute-ն ունի կարդալու/գործարկելու թույլտվություններ
3. **Ստուգեք SELinux/AppArmor-ը**՝ դրանք կարող են արգելափակել գործընթացների գործարկումը

---

## Օրինակներ

### Օրինակ 1. Claude Code-ի գործարկում և օգտագործում

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Հայտնաբերել տեղադրված գործակալները
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Գործարկել նոր աշխատաշրջան
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Ուղարկել հուշում
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Մաքրել ռեսուրսները
  acpManager.kill(session.id);
}
```

### Օրինակ 2. Ինքնահայտնաբերում՝ պահուստային տարբերակով

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Նախ փորձել Claude-ը, իսկ անհաջողության դեպքում՝ Codex-ը
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

### Օրինակ 3. Հատուկ գործակալ

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Գրանցել հատուկ CLI գործակալ
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

// Այժմ detectInstalledAgents()-ը կներառի "my-llm-cli"-ը
const agents = detectInstalledAgents();
```

---

## Ի՞նչ է հաջորդը

- **[API տեղեկատու](../reference/API_REFERENCE.md)** — REST API վերջնակետեր
- **[Մատակարարների տեղեկատու](../reference/PROVIDER_REFERENCE.md)** — Բոլոր 352 մատակարարները
- **[MCP սերվեր](./MCP-SERVER.md)** — Model Context Protocol-ի ինտեգրում
- **[A2A սերվեր](./A2A-SERVER.md)** — Գործակալից գործակալ հաղորդակցման արձանագրություն
- **[Ամպային գործակալ](./CLOUD_AGENT.md)** — Ամպային գործակալներ

---

## Տեղեկատու

- [AionUi նախագիծ](https://github.com/iOfficeAI/AionUi) — Ոգեշնչման աղբյուր ACP-ի ինքնահայտնաբերման համար
- [ACP-ի սկզբնաղբյուրը](../../src/lib/acp/) — Իրականացման մանրամասներ
  - `manager.ts` — Գործընթացի կենսացիկլի կառավարում
  - `registry.ts` — Գործակալների հայտնաբերում և գրանցում
  - `index.ts` — Հանրային API-ի արտահանումներ
