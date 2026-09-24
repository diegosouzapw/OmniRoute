# ACP (Agent Client Protocol) (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Ukratko**: ACP omogućuje OmniRouteu pokretanje CLI agenata (poput Claude Codea i Codexa) kao podređenih procesa umjesto korištenja HTTP API-ja. Time dobivate prijenos tipa „CLI kao pozadinski sustav”.

---

## Što je ACP?

ACP (Agent Client Protocol) je prijenos tipa **„CLI kao pozadinski sustav”** za OmniRoute. Umjesto presretanja HTTP API poziva prema pružateljima AI usluga, ACP **pokreće CLI agente kao podređene procese** i prosljeđuje im upite putem njihovog izvornog sučelja.

### Zašto koristiti ACP?

| Prednost                       | Opis                                                        |
| ------------------------------ | ----------------------------------------------------------- |
| **API ključevi nisu potrebni** | Koristi vašu postojeću CLI autentifikaciju                  |
| **Izvorni protokol**           | Koristi izvorni ulazno-izlazni format svakog CLI-ja         |
| **Automatsko otkrivanje**      | Otkriva CLI-je instalirane na vašem sustavu                 |
| **15 ugrađenih agenata**       | Unaprijed konfigurirano za popularne CLI alate              |
| **Prilagođeni agenti**         | Dodajte vlastite CLI alate putem postavki                   |
| **Upravljanje procesima**      | Upravlja životnim ciklusom (pokretanje, slanje, prekidanje) |

---

## Podržani CLI agenti

ACP odmah podržava **15 ugrađenih CLI agenata**:

| ID agenta     | Naziv za prikaz    | Binarna datoteka | Protokol |
| ------------- | ------------------ | ---------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`          | stdio    |
| `claude`      | Claude Code CLI    | `claude`         | stdio    |
| `goose`       | Goose CLI          | `goose`          | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`       | stdio    |
| `aider`       | Aider              | `aider`          | stdio    |
| `opencode`    | OpenCode           | `opencode`       | stdio    |
| `cline`       | Cline              | `cline`          | stdio    |
| `qwen`        | Qwen Code          | `qwen --acp`     | stdio    |
| `forge`       | ForgeCode          | `forge`          | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`              | stdio    |
| `interpreter` | Open Interpreter   | `interpreter`    | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`         | stdio    |
| `warp`        | Warp AI            | `warp`           | stdio    |
| `gemini`      | Gemini CLI         | `gemini`         | stdio    |
| `zcode`       | ZCode              | `zcode`          | stdio    |

### Prilagođeni agenti

Putem postavki možete dodati vlastite CLI agente. Prilagođeni agenti podržavaju iste značajke kao i ugrađeni agenti.

---

## Brzi početak

### 1. korak: Instalirajte CLI agenta

```bash
# Primjer: instalirajte Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Provjerite instalaciju
claude --version
```

### 2. korak: Automatsko otkrivanje ACP-a

ACP automatski otkriva CLI agente instalirane na vašem sustavu. Konfiguracija nije potrebna!

### 3. korak: Upotrijebite ACP prijenos

Nakon otkrivanja, ACP se može koristiti kao prijenos za bilo kojeg podržanog pružatelja. OmniRoute će automatski koristiti ACP kada je CLI dostupan.

---

## Kako ACP funkcionira

### Arhitektura

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│ Podređeni proces│
│  (CLI agent)    │
│                 │
│  stdin  ◄──────┤  Slanje upita
│  stdout ──────►│  Primanje odgovora
│  stderr ──────►│  Primanje pogrešaka
└─────────────────┘
```

### Životni ciklus procesa

1. **Pokretanje** — ACP stvara podređeni proces za CLI agenta
2. **Slanje** — ACP zapisuje upite u stdin procesa
3. **Primanje** — ACP čita odgovore iz stdout/stderr
4. **Otkrivanje neaktivnosti** — ACP čeka 2 sekunde neaktivnosti prije nego što odgovor smatra dovršenim
5. **Prekidanje** — ACP prekida proces (SIGTERM, a zatim SIGKILL nakon 5 s)

### Komunikacijski protokol

ACP za komunikaciju s CLI agentima koristi **stdio** (standardni ulaz/izlaz). Protokol je sljedeći:

1. **Slanje upita** — Zapisivanje u stdin uz znak novog retka
2. **Čekanje odgovora** — Čitanje iz stdout dok ne nastupi neaktivnost (2 s bez izlaza)
3. **Istek vremena** — Zadano 120 sekundi (podesivo)

---

## Referenca API-ja

### Funkcije registra

#### `detectInstalledAgents()`

Otkriva sve instalirane CLI agente u sustavu. Rezultati se spremaju u predmemoriju na 60 sekundi.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Vraća: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // npr. "codex", "claude"
  name: string; // Naziv za prikaz
  binary: string; // Naziv binarne datoteke koju treba pokrenuti
  versionCommand: string; // Naredba za otkrivanje verzije
  version: string | null; // Otkrivena verzija (null ako nije instaliran)
  installed: boolean; // Je li agent instaliran
  providerAlias: string; // ID pružatelja u OmniRouteu
  spawnArgs: string[]; // Argumenti koji se prosljeđuju pri pokretanju
  protocol: "stdio" | "http"; // Komunikacijski protokol
  isCustom?: boolean; // Je li ovo prilagođeni agent koji je definirao korisnik
}
```

#### `getAvailableAgents()`

Dohvaća samo agente koji su instalirani i dostupni za ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Vraća: CliAgentInfo[] (samo instalirani agenti)
```

#### `getAgentById(id)`

Dohvaća određenog agenta prema ID-u.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Vraća: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Postavlja definicije prilagođenih agenata iz postavki.

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

### Funkcije upravitelja

#### `acpManager.spawn(agentId, binary, args, env)`

Pokreće novi proces CLI agenta.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* prilagođene varijable okruženja */
});
// Vraća: AcpSession
```

**Dopušteni ID-jevi agenata**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Šalje upit CLI agentu i prikuplja odgovor.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // vremensko ograničenje od 2 minute
);
// Vraća: Promise<string>
```

#### `acpManager.kill(sessionId)`

Prekida sesiju i obavlja čišćenje.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Vraća: boolean
```

#### `acpManager.getActiveSessions()`

Dohvaća sve aktivne sesije.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Vraća: AcpSession[]
```

#### `acpManager.killAll()`

Prekida sve sesije.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Sučelje sesije

```typescript
interface AcpSession {
  id: string; // Jedinstveni ID sesije
  agentId: string; // ID agenta (npr. "claude")
  process: ChildProcess; // Referenca na podređeni proces
  alive: boolean; // Je li proces aktivan
  stdoutBuffer: string; // Akumulirani međuspremnik standardnog izlaza
  stderrBuffer: string; // Akumulirani međuspremnik standardnog izlaza za pogreške
  createdAt: Date; // Vremenska oznaka stvaranja
}
```

### Događaji

`AcpManager` proširuje `EventEmitter` i emitira sljedeće događaje:

#### `stdout`

Emitira se kada CLI agent zapisuje u standardni izlaz.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Emitira se kada CLI agent zapisuje u standardni izlaz za pogreške.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Emitira se kada proces CLI agenta završi.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Emitira se kada dođe do pogreške u procesu CLI agenta.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfiguracija

### Varijable okruženja

ACP nasljeđuje sve varijable okruženja od nadređenog procesa i može se proširiti prilagođenim varijablama okruženja:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Argumenti pokretanja

Svaki agent ima zadane argumente pokretanja definirane u registru. Možete ih nadjačati:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Vremenska ograničenja

Zadano vremensko ograničenje za upit iznosi **120 sekundi** (2 minute). Možete ga nadjačati:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuta
```

### Predmemorija otkrivanja

Otkrivanje agenata sprema se u predmemoriju na **60 sekundi** kako bi se izbjegla zahtjevna pretraživanja datotečnog sustava. Za prisilno osvježavanje:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Sigurnost

### Sprječavanje umetanja naredbi

ACP provjerava naredbe za dohvaćanje verzije kako bi spriječio napade umetanjem naredbi:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Naredbe za dohvaćanje verzije koje sadrže ove znakove odbijaju se:

- `;` — Razdjelnik naredbi
- `&` — Pozadinski proces
- `|` — Cjevovod
- `<`, `>` — Preusmjeravanje
- `` ` `` — Zamjena naredbe
- `$` — Proširivanje varijable
- `\r`, `\n` — Prijelomi redaka

### Provjera naziva binarne datoteke

ACP provjerava podudara li se binarna datoteka naredbe za dohvaćanje verzije s očekivanim nazivom binarne datoteke (osim ako je riječ o prilagođenom agentu).

### Izolacija procesa

Svaka ACP sesija izvodi se u vlastitom podređenom procesu. Proces se prekida kada sesija završi ili istekne vremensko ograničenje.

---

## Performanse

### Performanse otkrivanja

- **Prvi poziv**: ~50-200ms (pokreće naredbu `version` za svakog agenta)
- **Predmemorirani pozivi**: <1ms (vraćaju se iz predmemorije)
- **TTL predmemorije**: 60 sekundi

### Performanse upita

- **Pokretanje**: ~50-100ms
- **Slanje upita**: ~10-50ms
- **Čekanje odgovora**: Ovisi o CLI agentu (obično 1-30 sekundi)
- **Prekid**: ~5 sekundi (SIGTERM) + trenutačno (SIGKILL)

### Upotreba resursa

- **Memorija po sesiji**: ~10-50MB (ovisi o CLI agentu)
- **CPU**: Minimalno (ograničeno ulazno-izlaznim operacijama)
- **Disk**: Ništa

---

## Rješavanje problema

### Pogreška "Unknown agent"

**Problem**: `acpManager.spawn()` izbacuje `Unknown agent: <id>`

**Rješenje**: U `spawn()` dopušteni su samo ovi agenti:

- `claude`
- `codex`
- `gemini`
- `qwen`

Ostale agente potrebno je pokrenuti ručno ili putem prilagođenih definicija agenata.

### Pogreška "Session not alive"

**Problem**: `acpManager.sendPrompt()` izbacuje `Session ${sessionId} is not alive`

**Rješenje**: Sesija je možda završila ili je prekinuta. Provjerite status sesije:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Ponovno pokrenite sesiju
  acpManager.spawn("claude", "claude", [], {});
}
```

### Pogreška "ACP timeout"

**Problem**: `acpManager.sendPrompt()` izbacuje `ACP timeout after 120000ms`

**Rješenje**: Povećajte vremensko ograničenje:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuta
```

### CLI nije otkriven

**Problem**: `detectInstalledAgents()` ne pronalazi vaš CLI

**Rješenja**:

1. **Provjerite PATH**: Provjerite nalazi li se CLI u sistemskoj varijabli PATH
2. **Provjerite naredbu za dohvaćanje verzije**: Ručno pokrenite `claude --version`
3. **Provjerite dopuštenja**: Provjerite je li CLI izvršan
4. **Prilagođeni agent**: Dodajte prilagođenu definiciju agenta za nestandardne CLI-jeve

### Pristup odbijen

**Problem**: ACP ne može izvršiti CLI

**Rješenja**:

1. **Provjerite dopuštenja datoteke**: `chmod +x /usr/local/bin/claude`
2. **Provjerite vlasništvo**: Provjerite ima li OmniRoute dopuštenja za čitanje/izvršavanje
3. **Provjerite SELinux/AppArmor**: Može blokirati pokretanje procesa

---

## Primjeri

### Primjer 1: Pokretanje i upotreba Claude Codea

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Otkrij instalirane agente
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Pokreni novu sesiju
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Pošalji upit
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Očisti resurse
  acpManager.kill(session.id);
}
```

### Primjer 2: Automatsko otkrivanje s rezervnom opcijom

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Prvo pokušaj s Claudeom, a zatim prijeđi na Codex kao rezervnu opciju
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

### Primjer 3: Prilagođeni agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Registriraj prilagođeni CLI agent
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

// Sada će detectInstalledAgents() uključivati "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Što slijedi?

- **[Referenca API-ja](../reference/API_REFERENCE.md)** — Krajnje točke REST API-ja
- **[Referenca pružatelja usluga](../reference/PROVIDER_REFERENCE.md)** — Svih 352 pružatelja usluga
- **[MCP poslužitelj](./MCP-SERVER.md)** — Integracija protokola Model Context Protocol
- **[A2A poslužitelj](./A2A-SERVER.md)** — Protokol Agent-to-Agent
- **[Agent u oblaku](./CLOUD_AGENT.md)** — Agenti u oblaku

---

## Reference

- [Projekt AionUi](https://github.com/iOfficeAI/AionUi) — Inspiracija za automatsko otkrivanje ACP-a
- [Izvorni kod ACP-a](../../src/lib/acp/) — Pojedinosti implementacije
  - `manager.ts` — Upravljanje životnim ciklusom procesa
  - `registry.ts` — Otkrivanje i registracija agenata
  - `index.ts` — Izvozi javnog API-ja
