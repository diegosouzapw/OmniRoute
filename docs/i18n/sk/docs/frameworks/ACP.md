# ACP (Agent Client Protocol) (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP umožňuje OmniRoute spúšťať CLI agentov (napríklad Claude Code, Codex) ako podradené procesy namiesto používania HTTP API. Získate tak prenos typu „CLI ako backend“.

---

## Čo je ACP?

ACP (Agent Client Protocol) je **prenos typu „CLI ako backend“** pre OmniRoute. Namiesto zachytávania volaní HTTP API smerujúcich k poskytovateľom AI ACP **spúšťa CLI agentov ako podradené procesy** a odovzdáva im výzvy prostredníctvom ich natívneho rozhrania.

### Prečo používať ACP?

| Výhoda                        | Opis                                                    |
| ----------------------------- | ------------------------------------------------------- |
| **Nie sú potrebné kľúče API** | Používa vaše existujúce overenie CLI                    |
| **Natívny protokol**          | Používa natívny vstupný/výstupný formát každého CLI     |
| **Automatické zisťovanie**    | Zisťuje CLI nainštalované vo vašom systéme              |
| **15 vstavaných agentov**     | Vopred nakonfigurované pre obľúbené nástroje CLI        |
| **Vlastní agenti**            | Pridajte vlastné nástroje CLI prostredníctvom nastavení |
| **Správa procesov**           | Riadi životný cyklus (spustenie, odoslanie, ukončenie)  |

---

## Podporovaní CLI agenti

ACP podporuje **15 vstavaných CLI agentov** ihneď po inštalácii:

| ID agenta     | Zobrazovaný názov  | Binárny súbor | Protokol |
| ------------- | ------------------ | ------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio    |
| `claude`      | Claude Code CLI    | `claude`      | stdio    |
| `goose`       | Goose CLI          | `goose`       | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio    |
| `aider`       | Aider              | `aider`       | stdio    |
| `opencode`    | OpenCode           | `opencode`    | stdio    |
| `cline`       | Cline              | `cline`       | stdio    |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio    |
| `forge`       | ForgeCode          | `forge`       | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio    |
| `interpreter` | Open Interpreter   | `interpreter` | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio    |
| `warp`        | Warp AI            | `warp`        | stdio    |
| `gemini`      | Gemini CLI         | `gemini`      | stdio    |
| `zcode`       | ZCode              | `zcode`       | stdio    |

### Vlastní agenti

Prostredníctvom nastavení môžete pridať vlastných CLI agentov. Vlastní agenti podporujú rovnaké funkcie ako vstavaní agenti.

---

## Rýchly začiatok

### Krok 1: Nainštalujte CLI agenta

```bash
# Príklad: Inštalácia Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Overenie inštalácie
claude --version
```

### Krok 2: Automatická detekcia ACP

ACP automaticky zisťuje CLI agentov nainštalovaných vo vašom systéme. Nie je potrebná žiadna konfigurácia!

### Krok 3: Použite prenos ACP

Po zistení možno ACP použiť ako prenos pre ľubovoľného podporovaného poskytovateľa. OmniRoute automaticky použije ACP, keď je CLI k dispozícii.

---

## Ako ACP funguje

### Architektúra

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Podradený      │
│  proces         │
│  (CLI agent)    │
│                 │
│  stdin  ◄──────┤  Odoslanie výzvy
│  stdout ──────►│  Prijatie odpovede
│  stderr ──────►│  Prijatie chýb
└─────────────────┘
```

### Životný cyklus procesu

1. **Spustenie** — ACP vytvorí podradený proces pre CLI agenta
2. **Odoslanie** — ACP zapisuje výzvy do stdin procesu
3. **Prijatie** — ACP číta odpovede zo stdout/stderr
4. **Detekcia nečinnosti** — ACP čaká 2 sekundy nečinnosti, kým odpoveď považuje za dokončenú
5. **Ukončenie** — ACP ukončí proces (SIGTERM, potom po 5 s SIGKILL)

### Komunikačný protokol

ACP používa na komunikáciu s CLI agentmi **stdio** (štandardný vstup/výstup). Protokol funguje takto:

1. **Odoslanie výzvy** — Zápis do stdin s novým riadkom
2. **Čakanie na odpoveď** — Čítanie zo stdout až do nečinnosti (2 s bez výstupu)
3. **Časový limit** — Predvolene 120 sekúnd (konfigurovateľné)

---

## Referenčná dokumentácia API

### Funkcie registra

#### `detectInstalledAgents()`

Zistí všetkých nainštalovaných agentov CLI v systéme. Výsledky sa ukladajú do vyrovnávacej pamäte na 60 sekúnd.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Vráti: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // napr. "codex", "claude"
  name: string; // Zobrazovaný názov
  binary: string; // Názov spustiteľného súboru
  versionCommand: string; // Príkaz na zistenie verzie
  version: string | null; // Zistená verzia (null, ak nie je nainštalovaný)
  installed: boolean; // Či je agent nainštalovaný
  providerAlias: string; // ID poskytovateľa v OmniRoute
  spawnArgs: string[]; // Argumenty odovzdané pri spustení
  protocol: "stdio" | "http"; // Komunikačný protokol
  isCustom?: boolean; // Či ide o vlastného agenta definovaného používateľom
}
```

#### `getAvailableAgents()`

Získa iba agentov, ktorí sú nainštalovaní a dostupní pre ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Vráti: CliAgentInfo[] (iba nainštalovaní agenti)
```

#### `getAgentById(id)`

Získa konkrétneho agenta podľa ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Vráti: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Nastaví definície vlastných agentov z nastavení.

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

### Funkcie správcu

#### `acpManager.spawn(agentId, binary, args, env)`

Spustí nový proces agenta CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* vlastné premenné prostredia */
});
// Vráti: AcpSession
```

**Povolené ID agentov**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Odošle výzvu agentovi CLI a zhromaždí odpoveď.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // Časový limit 2 minúty
);
// Vráti: Promise<string>
```

#### `acpManager.kill(sessionId)`

Ukončí reláciu a vyčistí prostriedky.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Vráti: boolean
```

#### `acpManager.getActiveSessions()`

Získa všetky aktívne relácie.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Vráti: AcpSession[]
```

#### `acpManager.killAll()`

Ukončí všetky relácie.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Rozhranie relácie

```typescript
interface AcpSession {
  id: string; // Jedinečné ID relácie
  agentId: string; // ID agenta (napr. "claude")
  process: ChildProcess; // Odkaz na podradený proces
  alive: boolean; // Či je proces aktívny
  stdoutBuffer: string; // Akumulovaná vyrovnávacia pamäť stdout
  stderrBuffer: string; // Akumulovaná vyrovnávacia pamäť stderr
  createdAt: Date; // Časová pečiatka vytvorenia
}
```

### Udalosti

Trieda `AcpManager` rozširuje `EventEmitter` a vysiela nasledujúce udalosti:

#### `stdout`

Vysiela sa, keď agent CLI zapisuje do stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Vysiela sa, keď agent CLI zapisuje do stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Vysiela sa, keď sa proces agenta CLI ukončí.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Vysiela sa, keď v procese agenta CLI nastane chyba.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfigurácia

### Premenné prostredia

ACP dedí všetky premenné prostredia z rodičovského procesu a možno ich rozšíriť o vlastné premenné prostredia:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Argumenty spustenia

Každý agent má v registri definované predvolené argumenty spustenia. Môžete ich prepísať:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Časové limity

Predvolený časový limit výzvy je **120 sekúnd** (2 minúty). Môžete ho prepísať:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minút
```

### Vyrovnávacia pamäť detekcie

Detekcia agentov sa ukladá do vyrovnávacej pamäte na **60 sekúnd**, aby sa predišlo náročnému prehľadávaniu súborového systému. Vynútenie obnovenia:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Zabezpečenie

### Prevencia vloženia príkazov

ACP overuje príkazy na zistenie verzie, aby zabránil útokom vložením príkazu:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Príkazy na zistenie verzie obsahujúce tieto znaky sú odmietnuté:

- `;` — Oddeľovač príkazov
- `&` — Proces na pozadí
- `|` — Presmerovanie cez rúru
- `<`, `>` — Presmerovanie
- `` ` `` — Nahradenie príkazom
- `$` — Rozbalenie premennej
- `\r`, `\n` — Zlomy riadkov

### Overenie názvu binárneho súboru

ACP overuje, či binárny súbor v príkaze na zistenie verzie zodpovedá očakávanému názvu binárneho súboru (pokiaľ nejde o vlastného agenta).

### Izolácia procesov

Každá relácia ACP beží vo vlastnom podradenom procese. Proces sa ukončí pri skončení relácie alebo po uplynutí časového limitu.

---

## Výkon

### Výkon detekcie

- **Prvé volanie**: ~50-200ms (spustí príkaz `version` pre každého agenta)
- **Volania z vyrovnávacej pamäte**: <1ms (vráti výsledok z vyrovnávacej pamäte)
- **TTL vyrovnávacej pamäte**: 60 sekúnd

### Výkon spracovania výzvy

- **Spustenie**: ~50-100ms
- **Odoslanie výzvy**: ~10-50ms
- **Čakanie na odpoveď**: Závisí od agenta CLI (zvyčajne 1-30 sekúnd)
- **Ukončenie**: ~5 sekúnd (SIGTERM) + okamžite (SIGKILL)

### Využitie zdrojov

- **Pamäť na reláciu**: ~10-50MB (závisí od agenta CLI)
- **CPU**: Minimálne (limitované vstupno-výstupnými operáciami)
- **Disk**: Žiadne využitie

---

## Riešenie problémov

### Chyba „Unknown agent“

**Problém**: `acpManager.spawn()` vyvolá chybu `Unknown agent: <id>`

**Riešenie**: V `spawn()` sú povolení iba títo agenti:

- `claude`
- `codex`
- `gemini`
- `qwen`

Ostatní agenti musia byť spustení manuálne alebo prostredníctvom vlastných definícií agentov.

### Chyba „Session not alive“

**Problém**: `acpManager.sendPrompt()` vyvolá chybu `Session ${sessionId} is not alive`

**Riešenie**: Relácia mohla skončiť alebo byť ukončená. Skontrolujte stav relácie:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Znovu spustite reláciu
  acpManager.spawn("claude", "claude", [], {});
}
```

### Chyba „ACP timeout“

**Problém**: `acpManager.sendPrompt()` vyvolá chybu `ACP timeout after 120000ms`

**Riešenie**: Zvýšte časový limit:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minút
```

### CLI nebolo zistené

**Problém**: `detectInstalledAgents()` nenájde vaše CLI

**Riešenia**:

1. **Skontrolujte PATH**: Uistite sa, že CLI je v systémovej premennej PATH
2. **Skontrolujte príkaz na zistenie verzie**: Manuálne spustite `claude --version`
3. **Skontrolujte oprávnenia**: Uistite sa, že CLI je spustiteľné
4. **Vlastný agent**: Pridajte vlastnú definíciu agenta pre neštandardné CLI

### Prístup zamietnutý

**Problém**: ACP nemôže spustiť CLI

**Riešenia**:

1. **Skontrolujte oprávnenia súboru**: `chmod +x /usr/local/bin/claude`
2. **Skontrolujte vlastníctvo**: Uistite sa, že OmniRoute má oprávnenia na čítanie a spustenie
3. **Skontrolujte SELinux/AppArmor**: Môžu blokovať spúšťanie procesov

---

## Príklady

### Príklad 1: Spustenie a použitie Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Zistenie nainštalovaných agentov
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Spustenie novej relácie
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Odoslanie výzvy
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Vyčistenie
  acpManager.kill(session.id);
}
```

### Príklad 2: Automatické zisťovanie so záložnou možnosťou

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Najprv skúsiť Claude, potom ako záložnú možnosť Codex
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

### Príklad 3: Vlastný agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Registrácia vlastného CLI agenta
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

// detectInstalledAgents() teraz bude obsahovať „my-llm-cli“
const agents = detectInstalledAgents();
```

---

## Čo ďalej?

- **[Referenčná príručka API](../reference/API_REFERENCE.md)** — Koncové body REST API
- **[Referenčná príručka poskytovateľov](../reference/PROVIDER_REFERENCE.md)** — Všetkých 352 poskytovateľov
- **[Server MCP](./MCP-SERVER.md)** — Integrácia protokolu Model Context Protocol
- **[Server A2A](./A2A-SERVER.md)** — Protokol medzi agentmi
- **[Cloudový agent](./CLOUD_AGENT.md)** — Cloudoví agenti

---

## Referencie

- [Projekt AionUi](https://github.com/iOfficeAI/AionUi) — Inšpirácia pre automatické zisťovanie ACP
- [Zdrojový kód ACP](../../src/lib/acp/) — Podrobnosti implementácie
  - `manager.ts` — Správa životného cyklu procesov
  - `registry.ts` — Zisťovanie a registrácia agentov
  - `index.ts` — Exporty verejného API
