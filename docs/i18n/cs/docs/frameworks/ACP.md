# ACP (Agent Client Protocol) (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP umožňuje OmniRoute spouštět CLI agenty (například Claude Code nebo Codex) jako podřízené procesy namísto používání HTTP API. Získáte tak přenos typu „CLI jako backend“.

---

## Co je ACP?

ACP (Agent Client Protocol) je přenos typu **„CLI jako backend“** pro OmniRoute. Namísto zachytávání volání HTTP API poskytovatelů AI ACP **spouští CLI agenty jako podřízené procesy** a předává jim výzvy prostřednictvím jejich nativního rozhraní.

### Proč používat ACP?

| Výhoda                       | Popis                                                   |
| ---------------------------- | ------------------------------------------------------- |
| **Nejsou potřeba klíče API** | Používá vaše stávající ověření CLI                      |
| **Nativní protokol**         | Používá nativní vstupní/výstupní formát každého CLI     |
| **Automatické zjišťování**   | Zjišťuje CLI nainstalovaná ve vašem systému             |
| **15 vestavěných agentů**    | Předem nakonfigurováno pro oblíbené nástroje CLI        |
| **Vlastní agenti**           | Přidejte vlastní nástroje CLI prostřednictvím nastavení |
| **Správa procesů**           | Zajišťuje životní cyklus (spuštění, odeslání, ukončení) |

---

## Podporovaní CLI agenti

ACP ihned po instalaci podporuje **15 vestavěných CLI agentů**:

| ID agenta     | Zobrazovaný název  | Binární soubor | Protokol |
| ------------- | ------------------ | -------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`        | stdio    |
| `claude`      | Claude Code CLI    | `claude`       | stdio    |
| `goose`       | Goose CLI          | `goose`        | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`     | stdio    |
| `aider`       | Aider              | `aider`        | stdio    |
| `opencode`    | OpenCode           | `opencode`     | stdio    |
| `cline`       | Cline              | `cline`        | stdio    |
| `qwen`        | Qwen Code          | `qwen --acp`   | stdio    |
| `forge`       | ForgeCode          | `forge`        | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`            | stdio    |
| `interpreter` | Open Interpreter   | `interpreter`  | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`       | stdio    |
| `warp`        | Warp AI            | `warp`         | stdio    |
| `gemini`      | Gemini CLI         | `gemini`       | stdio    |
| `zcode`       | ZCode              | `zcode`        | stdio    |

### Vlastní agenti

Prostřednictvím nastavení můžete přidat vlastní CLI agenty. Vlastní agenti podporují stejné funkce jako vestavění agenti.

---

## Rychlý začátek

### Krok 1: Nainstalujte CLI agenta

```bash
# Příklad: Instalace Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Ověření instalace
claude --version
```

### Krok 2: Automatická detekce ACP

ACP automaticky zjistí CLI agenty nainstalované ve vašem systému. Není potřeba žádná konfigurace!

### Krok 3: Použijte přenos ACP

Po zjištění lze ACP použít jako přenos pro libovolného podporovaného poskytovatele. OmniRoute automaticky použije ACP, když je příslušné CLI dostupné.

---

## Jak ACP funguje

### Architektura

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Podřízený      │
│  proces         │
│  (CLI agent)    │
│                 │
│  stdin  ◄──────┤  Odeslání výzvy
│  stdout ──────►│  Přijetí odpovědi
│  stderr ──────►│  Přijetí chyb
└─────────────────┘
```

### Životní cyklus procesu

1. **Spuštění** — ACP vytvoří podřízený proces pro CLI agenta
2. **Odeslání** — ACP zapisuje výzvy do stdin procesu
3. **Příjem** — ACP čte odpovědi ze stdout/stderr
4. **Detekce nečinnosti** — ACP čeká na 2 sekundy nečinnosti, než odpověď považuje za dokončenou
5. **Ukončení** — ACP ukončí proces (SIGTERM a po 5 s následně SIGKILL)

### Komunikační protokol

ACP používá ke komunikaci s CLI agenty **stdio** (standardní vstup/výstup). Protokol funguje následovně:

1. **Odeslání výzvy** — Zápis do stdin s novým řádkem
2. **Čekání na odpověď** — Čtení ze stdout až do nečinnosti (2 s bez výstupu)
3. **Časový limit** — Výchozí hodnota je 120 sekund (lze konfigurovat)

---

## Reference API

### Funkce registru

#### `detectInstalledAgents()`

Detekuje všechny nainstalované agenty CLI v systému. Výsledky se ukládají do mezipaměti na 60 sekund.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Vrací: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // např. „codex“, „claude“
  name: string; // Zobrazovaný název
  binary: string; // Název binárního souboru, který se má spustit
  versionCommand: string; // Příkaz pro zjištění verze
  version: string | null; // Zjištěná verze (null, pokud není nainstalován)
  installed: boolean; // Zda je agent nainstalován
  providerAlias: string; // ID poskytovatele v OmniRoute
  spawnArgs: string[]; // Argumenty předávané při spuštění
  protocol: "stdio" | "http"; // Komunikační protokol
  isCustom?: boolean; // Zda jde o vlastního agenta definovaného uživatelem
}
```

#### `getAvailableAgents()`

Získá pouze agenty, kteří jsou nainstalovaní a dostupní pro ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Vrací: CliAgentInfo[] (pouze nainstalovaní agenti)
```

#### `getAgentById(id)`

Získá konkrétního agenta podle ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Vrací: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Nastaví definice vlastních agentů z nastavení.

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

### Funkce správce

#### `acpManager.spawn(agentId, binary, args, env)`

Spustí nový proces agenta CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* vlastní proměnné prostředí */
});
// Vrací: AcpSession
```

**Povolená ID agentů**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Odešle výzvu agentovi CLI a shromáždí odpověď.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // časový limit 2 minuty
);
// Vrací: Promise<string>
```

#### `acpManager.kill(sessionId)`

Ukončí relaci a provede úklid.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Vrací: boolean
```

#### `acpManager.getActiveSessions()`

Získá všechny aktivní relace.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Vrací: AcpSession[]
```

#### `acpManager.killAll()`

Ukončí všechny relace.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Rozhraní relace

```typescript
interface AcpSession {
  id: string; // Jedinečné ID relace
  agentId: string; // ID agenta (např. „claude“)
  process: ChildProcess; // Popisovač podřízeného procesu
  alive: boolean; // Zda proces běží
  stdoutBuffer: string; // Naskládaná data z stdout
  stderrBuffer: string; // Naskládaná data z stderr
  createdAt: Date; // Časové razítko vytvoření
}
```

### Události

Třída `AcpManager` rozšiřuje `EventEmitter` a vysílá následující události:

#### `stdout`

Vysílá se, když agent CLI zapisuje do stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Vysílá se, když agent CLI zapisuje do stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Vysílá se, když proces agenta CLI skončí.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Vysílá se, když v procesu agenta CLI dojde k chybě.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfigurace

### Proměnné prostředí

ACP dědí všechny proměnné prostředí z nadřazeného procesu a lze je rozšířit o vlastní proměnné prostředí:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Argumenty spuštění

Každý agent má v registru definované výchozí argumenty spuštění. Můžete je přepsat:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Časové limity

Výchozí časový limit výzvy je **120 sekund** (2 minuty). Můžete jej přepsat:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minut
```

### Mezipaměť detekce

Detekce agentů se ukládá do mezipaměti na **60 sekund**, aby se předešlo náročnému prohledávání souborového systému. Vynucení aktualizace:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Zabezpečení

### Prevence vkládání příkazů

ACP ověřuje příkazy pro zjištění verze, aby zabránil útokům prostřednictvím vkládání příkazů:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Příkazy pro zjištění verze obsahující tyto znaky jsou odmítnuty:

- `;` — Oddělovač příkazů
- `&` — Proces na pozadí
- `|` — Roura
- `<`, `>` — Přesměrování
- `` ` `` — Substituce příkazu
- `$` — Rozbalení proměnné
- `\r`, `\n` — Konce řádků

### Ověření názvu binárního souboru

ACP ověřuje, že binární soubor v příkazu pro zjištění verze odpovídá očekávanému názvu binárního souboru (pokud nejde o vlastního agenta).

### Izolace procesů

Každá relace ACP běží ve vlastním podřízeném procesu. Proces je ukončen při skončení relace nebo po vypršení časového limitu.

---

## Výkon

### Výkon detekce

- **První volání**: ~50–200 ms (spustí příkaz `version` pro každého agenta)
- **Volání z mezipaměti**: <1 ms (vrátí výsledek z mezipaměti)
- **TTL mezipaměti**: 60 sekund

### Výkon zpracování výzvy

- **Spuštění**: ~50–100 ms
- **Odeslání výzvy**: ~10–50 ms
- **Čekání na odpověď**: Závisí na agentovi CLI (obvykle 1–30 sekund)
- **Ukončení**: ~5 sekund (SIGTERM) + okamžitě (SIGKILL)

### Využití prostředků

- **Paměť na relaci**: ~10–50 MB (závisí na agentovi CLI)
- **CPU**: Minimální (limitováno vstupem/výstupem)
- **Disk**: Žádné

---

## Řešení problémů

### Chyba „Unknown agent“

**Problém**: `acpManager.spawn()` vyvolá chybu `Unknown agent: <id>`

**Řešení**: V `spawn()` jsou povoleni pouze tito agenti:

- `claude`
- `codex`
- `gemini`
- `qwen`

Ostatní agenti musí být spuštěni ručně nebo prostřednictvím vlastních definic agentů.

### Chyba „Session not alive“

**Problém**: `acpManager.sendPrompt()` vyvolá chybu `Session ${sessionId} is not alive`

**Řešení**: Relace mohla skončit nebo být ukončena. Zkontrolujte stav relace:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Znovu spusťte relaci
  acpManager.spawn("claude", "claude", [], {});
}
```

### Chyba „ACP timeout“

**Problém**: `acpManager.sendPrompt()` vyvolá chybu `ACP timeout after 120000ms`

**Řešení**: Zvyšte časový limit:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minut
```

### CLI nebylo detekováno

**Problém**: `detectInstalledAgents()` nenajde vaše CLI

**Řešení**:

1. **Zkontrolujte PATH**: Ujistěte se, že je CLI ve vaší systémové proměnné PATH
2. **Zkontrolujte příkaz pro zjištění verze**: Ručně spusťte `claude --version`
3. **Zkontrolujte oprávnění**: Ujistěte se, že je CLI spustitelné
4. **Vlastní agent**: Přidejte vlastní definici agenta pro nestandardní CLI

### Přístup odepřen

**Problém**: ACP nemůže spustit CLI

**Řešení**:

1. **Zkontrolujte oprávnění souboru**: `chmod +x /usr/local/bin/claude`
2. **Zkontrolujte vlastnictví**: Ujistěte se, že má OmniRoute oprávnění ke čtení a spuštění
3. **Zkontrolujte SELinux/AppArmor**: Může blokovat spouštění procesů

---

## Příklady

### Příklad 1: Spuštění a použití Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Detekce nainstalovaných agentů
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Spuštění nové relace
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Odeslání výzvy
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Vyčištění
  acpManager.kill(session.id);
}
```

### Příklad 2: Automatické vyhledání se záložní možností

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Nejprve zkusit Claude, poté jako záložní možnost Codex
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

### Příklad 3: Vlastní agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Registrace vlastního agenta CLI
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

// Funkce detectInstalledAgents() nyní zahrne „my-llm-cli“
const agents = detectInstalledAgents();
```

---

## Co dál?

- **[Referenční dokumentace API](../reference/API_REFERENCE.md)** — Koncové body REST API
- **[Referenční dokumentace poskytovatelů](../reference/PROVIDER_REFERENCE.md)** — Všech 352 poskytovatelů
- **[Server MCP](./MCP-SERVER.md)** — Integrace protokolu Model Context Protocol
- **[Server A2A](./A2A-SERVER.md)** — Protokol mezi agenty
- **[Cloudový agent](./CLOUD_AGENT.md)** — Agenti založení na cloudu

---

## Reference

- [Projekt AionUi](https://github.com/iOfficeAI/AionUi) — Inspirace pro automatickou detekci ACP
- [Zdrojový kód ACP](../../src/lib/acp/) — Podrobnosti implementace
  - `manager.ts` — Správa životního cyklu procesů
  - `registry.ts` — Vyhledávání a registrace agentů
  - `index.ts` — Exporty veřejného API
