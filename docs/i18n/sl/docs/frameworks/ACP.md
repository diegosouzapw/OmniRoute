# ACP (Agent Client Protocol) (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Na kratko**: ACP omogoča, da OmniRoute zažene agente CLI (kot sta Claude Code in Codex) kot podrejene procese namesto uporabe API-jev HTTP. Tako dobite prenos »CLI kot zaledje«.

---

## Kaj je ACP?

ACP (Agent Client Protocol) je prenos **»CLI kot zaledje«** za OmniRoute. Namesto prestrezanja klicev API HTTP ponudnikom UI ACP **zažene agente CLI kot podrejene procese** in jim posreduje pozive prek njihovega izvornega vmesnika.

### Zakaj uporabljati ACP?

| Prednost                     | Opis                                                        |
| ---------------------------- | ----------------------------------------------------------- |
| **Ključi API niso potrebni** | Uporablja vaše obstoječe preverjanje pristnosti CLI         |
| **Izvorni protokol**         | Uporablja izvorno obliko vhoda/izhoda vsakega CLI-ja        |
| **Samodejno odkrivanje**     | Zazna CLI-je, nameščene v vašem sistemu                     |
| **15 vgrajenih agentov**     | Vnaprej konfigurirano za priljubljena orodja CLI            |
| **Agenti po meri**           | Dodajte lastna orodja CLI prek nastavitev                   |
| **Upravljanje procesov**     | Upravlja življenjski cikel (zagon, pošiljanje, zaustavitev) |

---

## Podprti agenti CLI

ACP že privzeto podpira **15 vgrajenih agentov CLI**:

| ID agenta     | Prikazno ime       | Izvršljiva datoteka | Protokol |
| ------------- | ------------------ | ------------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`             | stdio    |
| `claude`      | Claude Code CLI    | `claude`            | stdio    |
| `goose`       | Goose CLI          | `goose`             | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`          | stdio    |
| `aider`       | Aider              | `aider`             | stdio    |
| `opencode`    | OpenCode           | `opencode`          | stdio    |
| `cline`       | Cline              | `cline`             | stdio    |
| `qwen`        | Qwen Code          | `qwen --acp`        | stdio    |
| `forge`       | ForgeCode          | `forge`             | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`                 | stdio    |
| `interpreter` | Open Interpreter   | `interpreter`       | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`            | stdio    |
| `warp`        | Warp AI            | `warp`              | stdio    |
| `gemini`      | Gemini CLI         | `gemini`            | stdio    |
| `zcode`       | ZCode              | `zcode`             | stdio    |

### Agenti po meri

Prek nastavitev lahko dodate lastne agente CLI. Agenti po meri podpirajo enake funkcije kot vgrajeni agenti.

---

## Hiter začetek

### 1. korak: Namestite agenta CLI

```bash
# Primer: namestite Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Preverite namestitev
claude --version
```

### 2. korak: Samodejno zaznavanje ACP

ACP samodejno zazna agente CLI, nameščene v vašem sistemu. Konfiguracija ni potrebna!

### 3. korak: Uporabite prenos ACP

Ko je agent zaznan, lahko ACP uporabite kot prenos za katerega koli podprtega ponudnika. OmniRoute bo samodejno uporabil ACP, ko bo CLI na voljo.

---

## Kako deluje ACP

### Arhitektura

```
┌─────────────────┐
│  OmniRoute      │
│  (posrednik HTTP)│
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│ Podrejeni proces│
│  (agent CLI)    │
│                 │
│  stdin  ◄──────┤  Pošlji poziv
│  stdout ──────►│  Prejmi odgovor
│  stderr ──────►│  Prejmi napake
└─────────────────┘
```

### Življenjski cikel procesa

1. **Zagon** — ACP ustvari podrejeni proces za agenta CLI
2. **Pošiljanje** — ACP zapiše pozive v stdin procesa
3. **Prejemanje** — ACP bere odgovore iz stdout/stderr
4. **Zaznavanje nedejavnosti** — ACP počaka 2 sekundi nedejavnosti, preden odgovor šteje za dokončan
5. **Zaustavitev** — ACP prekine proces (SIGTERM, nato SIGKILL po 5 s)

### Komunikacijski protokol

ACP za komunikacijo z agenti CLI uporablja **stdio** (standardni vhod/izhod). Protokol je naslednji:

1. **Pošlji poziv** — Zapišite v stdin z novo vrstico
2. **Počakajte na odgovor** — Berite iz stdout do nedejavnosti (2 s brez izhoda)
3. **Časovna omejitev** — Privzeto 120 sekund (nastavljivo)

---

## Referenca API-ja

### Funkcije registra

#### `detectInstalledAgents()`

Zazna vse nameščene agente CLI v sistemu. Rezultati se predpomnijo za 60 sekund.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Vrne: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // npr. "codex", "claude"
  name: string; // Prikazno ime
  binary: string; // Ime izvršljive datoteke za zagon
  versionCommand: string; // Ukaz za zaznavanje različice
  version: string | null; // Zaznana različica (null, če ni nameščena)
  installed: boolean; // Ali je agent nameščen
  providerAlias: string; // ID ponudnika v OmniRoute
  spawnArgs: string[]; // Argumenti, posredovani ob zagonu
  protocol: "stdio" | "http"; // Komunikacijski protokol
  isCustom?: boolean; // Ali je to uporabniško določen agent po meri
}
```

#### `getAvailableAgents()`

Pridobi samo agente, ki so nameščeni in na voljo za ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Vrne: CliAgentInfo[] (samo nameščeni agenti)
```

#### `getAgentById(id)`

Pridobi določenega agenta po ID-ju.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Vrne: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Nastavi definicije agentov po meri iz nastavitev.

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

Zažene nov proces agenta CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* okoljske spremenljivke po meri */
});
// Vrne: AcpSession
```

**Dovoljeni ID-ji agentov**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Pošlje poziv agentu CLI in zbere odgovor.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2-minutna časovna omejitev
);
// Vrne: Promise<string>
```

#### `acpManager.kill(sessionId)`

Konča sejo in počisti vire.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Vrne: boolean
```

#### `acpManager.getActiveSessions()`

Pridobi vse aktivne seje.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Vrne: AcpSession[]
```

#### `acpManager.killAll()`

Konča vse seje.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Vmesnik seje

```typescript
interface AcpSession {
  id: string; // Enolični ID seje
  agentId: string; // ID agenta (npr. "claude")
  process: ChildProcess; // Referenca podrejenega procesa
  alive: boolean; // Ali je proces aktiven
  stdoutBuffer: string; // Zbrani medpomnilnik stdout
  stderrBuffer: string; // Zbrani medpomnilnik stderr
  createdAt: Date; // Časovni žig ustvarjanja
}
```

### Dogodki

`AcpManager` razširja `EventEmitter` in oddaja naslednje dogodke:

#### `stdout`

Odda se, ko agent CLI piše v stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Odda se, ko agent CLI piše v stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Odda se, ko se proces agenta CLI konča.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Odda se, ko v procesu agenta CLI pride do napake.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfiguracija

### Okoljske spremenljivke

ACP podeduje vse okoljske spremenljivke nadrejenega procesa, razširite pa jih lahko z okoljskimi spremenljivkami po meri:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Argumenti zagona

Vsak agent ima privzete argumente zagona, določene v registru. Lahko jih prepišete:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Časovne omejitve

Privzeta časovna omejitev poziva je **120 sekund** (2 minuti). Lahko jo prepišete:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minut
```

### Predpomnilnik zaznavanja

Zaznavanje agentov se predpomni za **60 sekund**, da se preprečijo zahtevna pregledovanja datotečnega sistema. Vsili osvežitev:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Varnost

### Preprečevanje vstavljanja ukazov

ACP preverja ukaze za različico, da prepreči napade z vstavljanjem ukazov:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Ukazi za različico, ki vsebujejo te znake, so zavrnjeni:

- `;` — Ločilo ukazov
- `&` — Proces v ozadju
- `|` — Cevovod
- `<`, `>` — Preusmeritev
- `` ` `` — Zamenjava ukaza
- `$` — Razširjanje spremenljivke
- `\r`, `\n` — Prelomi vrstic

### Preverjanje imena binarne datoteke

ACP preveri, ali se binarna datoteka ukaza za različico ujema s pričakovanim imenom binarne datoteke (razen če gre za agenta po meri).

### Izolacija procesov

Vsaka seja ACP se izvaja v lastnem podrejenem procesu. Proces se konča, ko se seja konča ali poteče njena časovna omejitev.

---

## Zmogljivost

### Zmogljivost zaznavanja

- **Prvi klic**: ~50–200 ms (izvede ukaz `version` za vsakega agenta)
- **Predpomnjeni klici**: <1 ms (vrne rezultat iz predpomnilnika)
- **TTL predpomnilnika**: 60 sekund

### Zmogljivost poziva

- **Zagon**: ~50–100 ms
- **Pošiljanje poziva**: ~10–50 ms
- **Čakanje na odgovor**: Odvisno od agenta CLI (običajno 1–30 sekund)
- **Končanje procesa**: ~5 sekund (SIGTERM) + takojšnje (SIGKILL)

### Poraba virov

- **Pomnilnik na sejo**: ~10–50 MB (odvisno od agenta CLI)
- **CPE**: Minimalna (omejena z V/I)
- **Disk**: Brez porabe

---

## Odpravljanje težav

### Napaka »Unknown agent«

**Težava**: `acpManager.spawn()` sproži napako `Unknown agent: <id>`

**Rešitev**: V `spawn()` so dovoljeni samo ti agenti:

- `claude`
- `codex`
- `gemini`
- `qwen`

Druge agente je treba zagnati ročno ali prek definicij agentov po meri.

### Napaka »Session not alive«

**Težava**: `acpManager.sendPrompt()` sproži napako `Session ${sessionId} is not alive`

**Rešitev**: Seja se je morda končala ali pa je bila prisilno končana. Preverite stanje seje:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Znova zaženi sejo
  acpManager.spawn("claude", "claude", [], {});
}
```

### Napaka »ACP timeout«

**Težava**: `acpManager.sendPrompt()` sproži napako `ACP timeout after 120000ms`

**Rešitev**: Podaljšajte časovno omejitev:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minut
```

### CLI ni zaznan

**Težava**: `detectInstalledAgents()` ne najde vašega CLI-ja

**Rešitve**:

1. **Preverite PATH**: Prepričajte se, da je CLI v sistemski spremenljivki PATH
2. **Preverite ukaz za različico**: Ročno zaženite `claude --version`
3. **Preverite dovoljenja**: Prepričajte se, da je CLI izvršljiv
4. **Agent po meri**: Dodajte definicijo agenta po meri za nestandardne CLI-je

### Dostop zavrnjen

**Težava**: ACP ne more izvesti CLI-ja

**Rešitve**:

1. **Preverite dovoljenja datoteke**: `chmod +x /usr/local/bin/claude`
2. **Preverite lastništvo**: Prepričajte se, da ima OmniRoute dovoljenja za branje/izvajanje
3. **Preverite SELinux/AppArmor**: Lahko preprečuje zagon procesov

---

## Primeri

### Primer 1: Zagon in uporaba Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Zaznaj nameščene agente
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Zaženi novo sejo
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Pošlji poziv
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Počisti vire
  acpManager.kill(session.id);
}
```

### Primer 2: Samodejno odkrivanje z nadomestno možnostjo

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Najprej poskusi Claude, nato pa kot nadomestno možnost Codex
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

### Primer 3: Agent po meri

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Registriraj agenta CLI po meri
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

// Zdaj bo detectInstalledAgents() vključeval »my-llm-cli«
const agents = detectInstalledAgents();
```

---

## Kaj sledi?

- **[Referenca API-ja](../reference/API_REFERENCE.md)** — Končne točke REST API
- **[Referenca ponudnikov](../reference/PROVIDER_REFERENCE.md)** — Vseh 352 ponudnikov
- **[Strežnik MCP](./MCP-SERVER.md)** — Integracija protokola Model Context Protocol
- **[Strežnik A2A](./A2A-SERVER.md)** — Protokol Agent-to-Agent
- **[Agent v oblaku](./CLOUD_AGENT.md)** — Agenti v oblaku

---

## Reference

- [Projekt AionUi](https://github.com/iOfficeAI/AionUi) — Navdih za samodejno zaznavanje ACP
- [Izvorna koda ACP](../../src/lib/acp/) — Podrobnosti implementacije
  - `manager.ts` — Upravljanje življenjskega cikla procesov
  - `registry.ts` — Odkrivanje in registracija agentov
  - `index.ts` — Javni izvozi API-ja
