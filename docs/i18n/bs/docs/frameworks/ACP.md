# ACP (Agent Client Protocol) (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

# ACP (Agent Client Protocol)

> **TL;DR**: ACP omogućava OmniRoute-u da pokrene CLI agente (poput Claude Code, Codex) kao podprocese umjesto korištenja HTTP API-ja. Ovo vam daje "CLI-kao-backend" transport.

---

## Šta je ACP?

ACP (Agent Client Protocol) je **"CLI-kao-backend" transport** za OmniRoute. Umjesto presretanja HTTP API poziva ka AI provajderima, ACP **pokreće CLI agente kao podprocese** i šalje upite kroz njihov izvorni interfejs.

### Zašto koristiti ACP?

| Prednost                       | Opis                                                    |
| ------------------------------ | ------------------------------------------------------- |
| **Nisu potrebni API ključevi** | Koristi vašu postojeću CLI autentifikaciju              |
| **Izvorni protokol**           | Koristi izvorni format ulaza/izlaza svakog CLI-ja       |
| **Automatsko otkrivanje**      | Detektuje instalirane CLI-jeve na vašem sistemu         |
| **15 ugrađenih agenata**       | Prethodno konfigurisani za popularne CLI alate          |
| **Prilagođeni agenti**         | Dodajte svoje CLI alate putem postavki                  |
| **Upravljanje procesima**      | Upravlja životnim ciklusom (pokretanje, slanje, prekid) |

---

## Podržani CLI agenti

ACP podržava **15 ugrađenih CLI agenata** odmah po instalaciji:

| Agent ID      | Prikazano ime      | Binarna datoteka | Protokol |
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

Možete dodati svoje CLI agente putem postavki. Prilagođeni agenti podržavaju iste funkcije kao i ugrađeni agenti.

---

## Brzi početak

### Korak 1: Instalirajte CLI agenta

```bash
# Primjer: Instalirajte Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Provjerite instalaciju
claude --version
```

### Korak 2: ACP automatsko otkrivanje

ACP automatski detektuje instalirane CLI agente na vašem sistemu. Nije potrebna konfiguracija!

### Korak 3: Koristite ACP transport

Jednom kada se detektuje, ACP se može koristiti kao transport za bilo kojeg podržanog provajdera. OmniRoute će automatski koristiti ACP kada je CLI dostupan.

---

## Kako ACP radi

### Arhitektura

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP Proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Podproces      │
│  (CLI Agent)    │
│                 │
│  stdin  ◄──────┤  Pošalji upit
│  stdout ──────►│  Primi odgovor
│  stderr ──────►│  Primi greške
└─────────────────┘
```

### Životni ciklus procesa

1. **Pokretanje** — ACP kreira podproces za CLI agenta
2. **Slanje** — ACP piše upite na stdin procesa
3. **Prijem** — ACP čita odgovore sa stdout/stderr
4. **Detekcija neaktivnosti** — ACP čeka 2 sekunde neaktivnosti prije nego što smatra odgovor potpunim
5. **Prekid** — ACP prekida proces (SIGTERM, zatim SIGKILL nakon 5s)

### Komunikacioni protokol

ACP koristi **stdio** (standardni ulaz/izlaz) za komunikaciju sa CLI agentima. Protokol je:

1. **Slanje upita** — Piše na stdin sa novim redom
2. **Čekanje na odgovor** — Čita sa stdout dok ne postane neaktivan (2s bez izlaza)
3. **Vremensko ograničenje** — Podrazumijevano 120 sekundi (konfigurabilno)

## API Referenca

### Funkcije registra

#### `detectInstalledAgents()`

Detektuje sve instalirane CLI agente na sistemu. Rezultati su keširani 60 sekundi.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Vraća: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // npr. "codex", "claude"
  name: string; // Prikazano ime
  binary: string; // Naziv binarnog fajla za pokretanje
  versionCommand: string; // Komanda za detekciju verzije
  version: string | null; // Detektovana verzija (null ako nije instalirano)
  installed: boolean; // Da li je agent instaliran
  providerAlias: string; // ID provajdera u OmniRoute
  spawnArgs: string[]; // Argumenti koji se prosljeđuju prilikom pokretanja
  protocol: "stdio" | "http"; // Komunikacioni protokol
  isCustom?: boolean; // Da li je ovo prilagođeni agent definisan od strane korisnika
}
```

#### `getAvailableAgents()`

Dohvata samo agente koji su instalirani i dostupni za ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Vraća: CliAgentInfo[] (samo instalirani agenti)
```

#### `getAgentById(id)`

Dohvata određenog agenta prema ID-u.

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

### Funkcije menadžera

#### `acpManager.spawn(agentId, binary, args, env)`

Pokreće novi proces CLI agenta.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* prilagođene env varijable */
});
// Vraća: AcpSession
```

**Dozvoljeni ID-ovi agenata**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Šalje upit CLI agentu i prikuplja odgovor.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 minute vremenskog ograničenja
);
// Vraća: Promise<string>
```

#### `acpManager.kill(sessionId)`

Prekida sesiju i vrši čišćenje.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Vraća: boolean
```

#### `acpManager.getActiveSessions()`

Dohvata sve aktivne sesije.

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

### Interfejs sesije

```typescript
interface AcpSession {
  id: string; // Jedinstveni ID sesije
  agentId: string; // ID agenta (npr. "claude")
  process: ChildProcess; // Ručka podprocesa
  alive: boolean; // Da li je proces živ
  stdoutBuffer: string; // Akumulirani stdout bafer
  stderrBuffer: string; // Akumulirani stderr bafer
  createdAt: Date; // Vremenska oznaka kreiranja
}
```

### Događaji

`AcpManager` proširuje `EventEmitter` i emituje sljedeće događaje:

#### `stdout`

Emituje se kada CLI agent piše na stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Emituje se kada CLI agent piše na stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Emituje se kada se proces CLI agenta završi.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Emituje se kada proces CLI agenta naiđe na grešku.

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

Zadano vremensko ograničenje upita je **120 sekundi** (2 minute). Možete ga nadjačati:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuta
```

### Predmemorija detekcije

Detekcija agenta se predmemorira na **60 sekundi** kako bi se izbjeglo skupo skeniranje datotečnog sustava. Prisilno osvježavanje:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Sigurnost

### Prevencija ubacivanja naredbi

ACP validira naredbe verzije kako bi spriječio napade ubacivanja naredbi:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Naredbe verzije koje sadrže ove znakove se odbijaju:

- `;` — Separator naredbi
- `&` — Pozadinski proces
- `|` — Pipe
- `<`, `>` — Preusmjeravanje
- `` ` `` — Zamjena naredbi
- `$` — Ekspanzija varijabli
- `\r`, `\n` — Prijelomi redaka

### Validacija naziva binarne datoteke

ACP validira da se binarna datoteka naredbe verzije podudara s očekivanim nazivom binarne datoteke (osim ako se radi o prilagođenom agentu).

### Izolacija procesa

Svaka ACP sesija se pokreće u vlastitom podređenom procesu. Proces se prekida kada sesija završi ili istekne vrijeme.

---

## Performanse

### Performanse detekcije

- **Prvi poziv**: ~50-200ms (pokreće `version` naredbu za svakog agenta)
- **Predmemorirani pozivi**: <1ms (vraća iz predmemorije)
- **TTL predmemorije**: 60 sekundi

### Performanse upita

- **Pokretanje**: ~50-100ms
- **Slanje upita**: ~10-50ms
- **Čekanje na odgovor**: Ovisi o CLI agentu (obično 1-30 sekundi)
- **Prekid**: ~5 sekundi (SIGTERM) + trenutno (SIGKILL)

### Korištenje resursa

- **Memorija po sesiji**: ~10-50MB (ovisi o CLI agentu)
- **CPU**: Minimalno (ograničeno I/O operacijama)
- **Disk**: Nema

---

## Rješavanje problema

### Greška "Unknown agent"

**Problem**: `acpManager.spawn()` baca grešku `Unknown agent: <id>`

**Rješenje**: Samo su ovi agenti dozvoljeni u `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Ostali agenti se moraju pokrenuti ručno ili putem definicija prilagođenih agenata.

### Greška "Session not alive"

**Problem**: `acpManager.sendPrompt()` baca grešku `Session ${sessionId} is not alive`

**Rješenje**: Sesija je možda izašla ili je prekinuta. Provjerite status sesije:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Ponovno pokreni sesiju
  acpManager.spawn("claude", "claude", [], {});
}
```

### Greška "ACP timeout"

**Problem**: `acpManager.sendPrompt()` baca grešku `ACP timeout after 120000ms`

**Rješenje**: Povećajte vremensko ograničenje:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuta
```

### CLI nije detektiran

**Problem**: `detectInstalledAgents()` ne pronalazi vaš CLI

**Rješenja**:

1. **Provjerite PATH**: Osigurajte da je CLI u vašem sistemskom PATH-u
2. **Provjerite naredbu verzije**: Ručno pokrenite `claude --version`
3. **Provjerite dozvole**: Osigurajte da je CLI izvršna datoteka
4. **Prilagođeni agent**: Dodajte definiciju prilagođenog agenta za nestandardne CLI-jeve

### Pristup odbijen

**Problem**: ACP ne može izvršiti CLI

**Rješenja**:

1. **Provjerite dozvole datoteke**: `chmod +x /usr/local/bin/claude`
2. **Provjerite vlasništvo**: Osigurajte da OmniRoute ima dozvole za čitanje/izvršavanje
3. **Provjerite SELinux/AppArmor**: Može blokirati pokretanje procesa

## Primjeri

### Primjer 1: Pokretanje i korištenje Claude Code-a

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Otkrivanje instaliranih agenata
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Pokretanje nove sesije
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Slanje upita
  const response = await acpManager.sendPrompt(
    session.id,
    "Objasni kvantno računarstvo u 100 riječi"
  );

  console.log("Claudeov odgovor:", response);

  // Čišćenje
  acpManager.kill(session.id);
}
```

### Primjer 2: Automatsko otkrivanje sa rezervnom opcijom (fallback)

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Prvo pokušaj sa Claude, ako ne uspije, pređi na Codex
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("Nije pronađen nijedan ACP-kompatibilan CLI agent");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Pozdrav!");

acpManager.kill(session.id);
```

### Primjer 3: Prilagođeni agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Registracija prilagođenog CLI agenta
setCustomAgents([
  {
    id: "my-llm-cli",
    name: "Moj LLM CLI",
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

## Šta je sljedeće?

- **[API Reference](../reference/API_REFERENCE.md)** — REST API krajnje tačke
- **[Provider Reference](../reference/PROVIDER_REFERENCE.md)** — Svih 352 provajdera
- **[MCP Server](./MCP-SERVER.md)** — Integracija Model Context Protocol-a
- **[A2A Server](./A2A-SERVER.md)** — Agent-to-Agent protokol
- **[Cloud Agent](./CLOUD_AGENT.md)** — Agenti zasnovani na oblaku

---

## Reference

- [AionUi Project](https://github.com/iOfficeAI/AionUi) — Inspiracija za ACP automatsko otkrivanje
- [ACP Source Code](../../src/lib/acp/) — Detalji implementacije
  - `manager.ts` — Upravljanje životnim ciklusom procesa
  - `registry.ts` — Otkrivanje i registracija agenata
  - `index.ts` — Izvoz javnog API-ja
