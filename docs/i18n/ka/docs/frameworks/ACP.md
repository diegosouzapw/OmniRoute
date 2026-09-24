# ACP (Agent Client Protocol) (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP საშუალებას აძლევს OmniRoute-ს, HTTP API-ების გამოყენების ნაცვლად, CLI აგენტები (როგორებიცაა Claude Code და Codex) შვილობილ პროცესებად გაუშვას. ეს გაძლევთ „CLI-as-backend“ ტრანსპორტს.

---

## რა არის ACP?

ACP (Agent Client Protocol) არის **„CLI-as-backend“ ტრანსპორტი** OmniRoute-ისთვის. AI პროვაიდერების HTTP API გამოძახებების ჩაჭერის ნაცვლად, ACP **CLI აგენტებს შვილობილ პროცესებად უშვებს** და მოთხოვნებს მათი ნატიური ინტერფეისის მეშვეობით გადასცემს.

### რატომ უნდა გამოიყენოთ ACP?

| უპირატესობა                       | აღწერა                                                    |
| --------------------------------- | --------------------------------------------------------- |
| **API გასაღებები საჭირო არ არის** | იყენებს თქვენს არსებულ CLI ავტორიზაციას                   |
| **ნატიური პროტოკოლი**             | იყენებს თითოეული CLI-ის ნატიურ შეყვანის/გამოტანის ფორმატს |
| **ავტომატური აღმოჩენა**           | თქვენს სისტემაში დაყენებულ CLI-ებს აღმოაჩენს              |
| **15 ჩაშენებული აგენტი**          | წინასწარ კონფიგურირებულია პოპულარული CLI ხელსაწყოებისთვის |
| **მორგებული აგენტები**            | პარამეტრების მეშვეობით დაამატეთ საკუთარი CLI ხელსაწყოები  |
| **პროცესების მართვა**             | მართავს სასიცოცხლო ციკლს (გაშვება, გაგზავნა, შეწყვეტა)    |

---

## მხარდაჭერილი CLI აგენტები

ACP სტანდარტულად მხარს უჭერს **15 ჩაშენებულ CLI აგენტს**:

| აგენტის ID    | საჩვენებელი სახელი | ბინარული ფაილი | პროტოკოლი |
| ------------- | ------------------ | -------------- | --------- |
| `codex`       | OpenAI Codex CLI   | `codex`        | stdio     |
| `claude`      | Claude Code CLI    | `claude`       | stdio     |
| `goose`       | Goose CLI          | `goose`        | stdio     |
| `openclaw`    | OpenClaw           | `openclaw`     | stdio     |
| `aider`       | Aider              | `aider`        | stdio     |
| `opencode`    | OpenCode           | `opencode`     | stdio     |
| `cline`       | Cline              | `cline`        | stdio     |
| `qwen`        | Qwen Code          | `qwen --acp`   | stdio     |
| `forge`       | ForgeCode          | `forge`        | stdio     |
| `amazon-q`    | Amazon Q Developer | `q`            | stdio     |
| `interpreter` | Open Interpreter   | `interpreter`  | stdio     |
| `cursor-cli`  | Cursor CLI         | `cursor`       | stdio     |
| `warp`        | Warp AI            | `warp`         | stdio     |
| `gemini`      | Gemini CLI         | `gemini`       | stdio     |
| `zcode`       | ZCode              | `zcode`        | stdio     |

### მორგებული აგენტები

პარამეტრების მეშვეობით შეგიძლიათ საკუთარი CLI აგენტების დამატება. მორგებული აგენტები მხარს უჭერენ იმავე შესაძლებლობებს, რომლებსაც ჩაშენებული აგენტები.

---

## სწრაფი დაწყება

### ნაბიჯი 1: დააყენეთ CLI აგენტი

```bash
# მაგალითი: დააყენეთ Claude Code CLI
npm install -g @anthropic-ai/claude-code

# შეამოწმეთ ინსტალაცია
claude --version
```

### ნაბიჯი 2: ACP-ის ავტომატური აღმოჩენა

ACP ავტომატურად აღმოაჩენს თქვენს სისტემაში დაყენებულ CLI აგენტებს. კონფიგურაცია საჭირო არ არის!

### ნაბიჯი 3: გამოიყენეთ ACP ტრანსპორტი

აღმოჩენის შემდეგ ACP შეიძლება გამოყენებულ იქნეს ტრანსპორტად ნებისმიერი მხარდაჭერილი პროვაიდერისთვის. როდესაც CLI ხელმისაწვდომია, OmniRoute ავტომატურად გამოიყენებს ACP-ს.

---

## როგორ მუშაობს ACP

### არქიტექტურა

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP პროქსი)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  შვილობილი პროცესი  │
│  (CLI აგენტი)    │
│                 │
│  stdin  ◄──────┤  მოთხოვნის გაგზავნა
│  stdout ──────►│  პასუხის მიღება
│  stderr ──────►│  შეცდომების მიღება
└─────────────────┘
```

### პროცესის სასიცოცხლო ციკლი

1. **გაშვება** — ACP CLI აგენტისთვის შვილობილ პროცესს ქმნის
2. **გაგზავნა** — ACP მოთხოვნებს პროცესის stdin-ში წერს
3. **მიღება** — ACP პასუხებს stdout/stderr-იდან კითხულობს
4. **უმოქმედობის გამოვლენა** — სანამ პასუხს დასრულებულად მიიჩნევს, ACP 2-წამიან უმოქმედობას ელოდება
5. **შეწყვეტა** — ACP პროცესს წყვეტს (SIGTERM, შემდეგ კი, 5s-ის შემდეგ, SIGKILL)

### კომუნიკაციის პროტოკოლი

CLI აგენტებთან კომუნიკაციისთვის ACP იყენებს **stdio**-ს (სტანდარტულ შეყვანას/გამოტანას). პროტოკოლი ასეთია:

1. **მოთხოვნის გაგზავნა** — ჩაწერეთ stdin-ში ახალი სტრიქონის სიმბოლოს დამატებით
2. **პასუხის ლოდინი** — წაიკითხეთ stdout-იდან უმოქმედობამდე (2s განმავლობაში გამოტანის გარეშე)
3. **მოლოდინის დროის ამოწურვა** — ნაგულისხმევად 120 წამი (კონფიგურირებადი)

---

## API-ის ცნობარი

### რეესტრის ფუნქციები

#### `detectInstalledAgents()`

სისტემაში დაინსტალირებულ ყველა CLI აგენტს აღმოაჩენს. შედეგები 60 წამის განმავლობაში კეშირდება.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// აბრუნებს: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // მაგ., "codex", "claude"
  name: string; // საჩვენებელი სახელი
  binary: string; // გასაშვები ბინარული ფაილის სახელი
  versionCommand: string; // ვერსიის აღმოჩენის ბრძანება
  version: string | null; // აღმოჩენილი ვერსია (null, თუ დაინსტალირებული არ არის)
  installed: boolean; // არის თუ არა აგენტი დაინსტალირებული
  providerAlias: string; // პროვაიდერის ID OmniRoute-ში
  spawnArgs: string[]; // გაშვებისას გადასაცემი არგუმენტები
  protocol: "stdio" | "http"; // კომუნიკაციის პროტოკოლი
  isCustom?: boolean; // არის თუ არა ეს მომხმარებლის მიერ განსაზღვრული მორგებული აგენტი
}
```

#### `getAvailableAgents()`

იღებს მხოლოდ იმ აგენტებს, რომლებიც დაინსტალირებულია და ACP-სთვის ხელმისაწვდომია.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// აბრუნებს: CliAgentInfo[] (მხოლოდ დაინსტალირებული აგენტები)
```

#### `getAgentById(id)`

იღებს კონკრეტულ აგენტს ID-ის მიხედვით.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// აბრუნებს: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

პარამეტრებიდან ადგენს მორგებული აგენტების განსაზღვრებებს.

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

### მენეჯერის ფუნქციები

#### `acpManager.spawn(agentId, binary, args, env)`

უშვებს ახალ CLI აგენტის პროცესს.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* მორგებული გარემოს ცვლადები */
});
// აბრუნებს: AcpSession
```

**აგენტების დაშვებული ID-ები**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

უგზავნის მოთხოვნას CLI აგენტს და აგროვებს პასუხს.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // მოლოდინის დროის ამოწურვა 2 წუთში
);
// აბრუნებს: Promise<string>
```

#### `acpManager.kill(sessionId)`

წყვეტს სესიას და ასუფთავებს რესურსებს.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// აბრუნებს: boolean
```

#### `acpManager.getActiveSessions()`

იღებს ყველა აქტიურ სესიას.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// აბრუნებს: AcpSession[]
```

#### `acpManager.killAll()`

წყვეტს ყველა სესიას.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### სესიის ინტერფეისი

```typescript
interface AcpSession {
  id: string; // სესიის უნიკალური ID
  agentId: string; // აგენტის ID (მაგ., "claude")
  process: ChildProcess; // შვილობილი პროცესის დესკრიპტორი
  alive: boolean; // აქტიურია თუ არა პროცესი
  stdoutBuffer: string; // დაგროვილი stdout ბუფერი
  stderrBuffer: string; // დაგროვილი stderr ბუფერი
  createdAt: Date; // შექმნის დროის ნიშნული
}
```

### მოვლენები

`AcpManager` აფართოებს `EventEmitter`-ს და გამოსცემს შემდეგ მოვლენებს:

#### `stdout`

გამოიცემა, როდესაც CLI აგენტი stdout-ში წერს.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

გამოიცემა, როდესაც CLI აგენტი stderr-ში წერს.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

გამოიცემა, როდესაც CLI აგენტის პროცესი სრულდება.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

გამოიცემა, როდესაც CLI აგენტის პროცესში შეცდომა წარმოიქმნება.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## კონფიგურაცია

### გარემოს ცვლადები

ACP ყველა გარემოს ცვლადს მშობელი პროცესიდან მემკვიდრეობით იღებს და შესაძლებელია მისი გაფართოება მომხმარებლის მიერ განსაზღვრული გარემოს ცვლადებით:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### გაშვების არგუმენტები

თითოეულ აგენტს რეესტრში განსაზღვრული აქვს გაშვების ნაგულისხმევი არგუმენტები. მათი ჩანაცვლება შეგიძლიათ:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### დროის ლიმიტები

მოთხოვნის ნაგულისხმევი დროის ლიმიტია **120 წამი** (2 წუთი). მისი ჩანაცვლება შეგიძლიათ:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 წუთი
```

### აღმოჩენის კეში

აგენტების აღმოჩენის შედეგები ძვირადღირებული ფაილური სისტემის სკანირებების თავიდან ასაცილებლად **60 წამით** კეშირდება. იძულებითი განახლება:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## უსაფრთხოება

### ბრძანების ინექციის პრევენცია

ACP ვერსიის ბრძანებებს ამოწმებს ბრძანების ინექციის შეტევების თავიდან ასაცილებლად:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

ამ სიმბოლოების შემცველი ვერსიის ბრძანებები უარყოფილი იქნება:

- `;` — ბრძანებების გამყოფი
- `&` — ფონური პროცესი
- `|` — არხი
- `<`, `>` — გადამისამართება
- `` ` `` — ბრძანების ჩანაცვლება
- `$` — ცვლადის გაფართოება
- `\r`, `\n` — ხაზის წყვეტები

### ორობითი ფაილის სახელის ვალიდაცია

ACP ამოწმებს, ემთხვევა თუ არა ვერსიის ბრძანების ორობითი ფაილი მოსალოდნელ სახელს (თუ ეს მომხმარებლის მიერ განსაზღვრული აგენტი არ არის).

### პროცესების იზოლაცია

თითოეული ACP სესია საკუთარ შვილობილ პროცესში მუშაობს. პროცესი წყდება, როდესაც სესია სრულდება ან დროის ლიმიტს აჭარბებს.

---

## წარმადობა

### აღმოჩენის წარმადობა

- **პირველი გამოძახება**: ~50-200ms (თითოეული აგენტისთვის ასრულებს `version` ბრძანებას)
- **კეშირებული გამოძახებები**: <1ms (აბრუნებს კეშიდან)
- **კეშის TTL**: 60 წამი

### მოთხოვნის წარმადობა

- **გაშვება**: ~50-100ms
- **მოთხოვნის გაგზავნა**: ~10-50ms
- **პასუხის მოლოდინი**: დამოკიდებულია CLI აგენტზე (ჩვეულებრივ, 1-30 წამი)
- **შეწყვეტა**: ~5 წამი (SIGTERM) + დაუყოვნებლივ (SIGKILL)

### რესურსების გამოყენება

- **მეხსიერება თითო სესიაზე**: ~10-50MB (დამოკიდებულია CLI აგენტზე)
- **CPU**: მინიმალური (I/O-ზე დამოკიდებული)
- **დისკი**: არ გამოიყენება

---

## პრობლემების აღმოფხვრა

### შეცდომა „უცნობი აგენტი“

**პრობლემა**: `acpManager.spawn()` წარმოქმნის შეცდომას `Unknown agent: <id>`

**გადაწყვეტა**: `spawn()`-ში დაშვებულია მხოლოდ ეს აგენტები:

- `claude`
- `codex`
- `gemini`
- `qwen`

სხვა აგენტები უნდა გაეშვას ხელით ან მომხმარებლის მიერ განსაზღვრული აგენტის კონფიგურაციის მეშვეობით.

### შეცდომა „სესია აქტიური არ არის“

**პრობლემა**: `acpManager.sendPrompt()` წარმოქმნის შეცდომას `Session ${sessionId} is not alive`

**გადაწყვეტა**: სესია შესაძლოა დასრულდა ან იძულებით შეწყდა. შეამოწმეთ სესიის სტატუსი:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // ხელახლა გაუშვით სესია
  acpManager.spawn("claude", "claude", [], {});
}
```

### შეცდომა „ACP-ის დროის ლიმიტი“

**პრობლემა**: `acpManager.sendPrompt()` წარმოქმნის შეცდომას `ACP timeout after 120000ms`

**გადაწყვეტა**: გაზარდეთ დროის ლიმიტი:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 წუთი
```

### CLI ვერ მოიძებნა

**პრობლემა**: `detectInstalledAgents()` ვერ პოულობს თქვენს CLI-ს

**გადაწყვეტები**:

1. **შეამოწმეთ PATH**: დარწმუნდით, რომ CLI თქვენი სისტემის PATH-შია
2. **შეამოწმეთ ვერსიის ბრძანება**: ხელით გაუშვით `claude --version`
3. **შეამოწმეთ ნებართვები**: დარწმუნდით, რომ CLI შესრულებადია
4. **მომხმარებლის მიერ განსაზღვრული აგენტი**: არასტანდარტული CLI-ებისთვის დაამატეთ მომხმარებლის მიერ განსაზღვრული აგენტის კონფიგურაცია

### წვდომა აკრძალულია

**პრობლემა**: ACP ვერ ასრულებს CLI-ს

**გადაწყვეტები**:

1. **შეამოწმეთ ფაილის ნებართვები**: `chmod +x /usr/local/bin/claude`
2. **შეამოწმეთ მფლობელობა**: დარწმუნდით, რომ OmniRoute-ს აქვს წაკითხვის/შესრულების ნებართვები
3. **შეამოწმეთ SELinux/AppArmor**: შესაძლოა, პროცესის გაშვებას ბლოკავდეს

---

## მაგალითები

### მაგალითი 1: Claude Code-ის გაშვება და გამოყენება

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// დაინსტალირებული აგენტების აღმოჩენა
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // ახალი სესიის გაშვება
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // მოთხოვნის გაგზავნა
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // რესურსების გასუფთავება
  acpManager.kill(session.id);
}
```

### მაგალითი 2: ავტომატური აღმოჩენა სარეზერვო ვარიანტით

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// ჯერ Claude სცადეთ, ხოლო სარეზერვო ვარიანტად Codex გამოიყენეთ
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

### მაგალითი 3: მორგებული აგენტი

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// მორგებული CLI აგენტის რეგისტრაცია
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

// ახლა detectInstalledAgents() ფუნქციის შედეგში "my-llm-cli"-ც იქნება
const agents = detectInstalledAgents();
```

---

## რა არის შემდეგი?

- **[API ცნობარი](../reference/API_REFERENCE.md)** — REST API-ის საბოლოო წერტილები
- **[პროვაიდერების ცნობარი](../reference/PROVIDER_REFERENCE.md)** — ყველა 352 პროვაიდერი
- **[MCP სერვერი](./MCP-SERVER.md)** — Model Context Protocol-ის ინტეგრაცია
- **[A2A სერვერი](./A2A-SERVER.md)** — აგენტებს შორის კომუნიკაციის პროტოკოლი
- **[ღრუბლოვანი აგენტი](./CLOUD_AGENT.md)** — ღრუბელზე დაფუძნებული აგენტები

---

## ცნობარი

- [AionUi პროექტი](https://github.com/iOfficeAI/AionUi) — ACP-ის ავტომატური აღმოჩენის შთაგონების წყარო
- [ACP-ის საწყისი კოდი](../../src/lib/acp/) — იმპლემენტაციის დეტალები
  - `manager.ts` — პროცესის სასიცოცხლო ციკლის მართვა
  - `registry.ts` — აგენტების აღმოჩენა და რეგისტრაცია
  - `index.ts` — საჯარო API-ის ექსპორტები
