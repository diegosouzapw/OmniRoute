# ACP (Agent Client Protocol) (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Röviden**: Az ACP lehetővé teszi, hogy az OmniRoute HTTP API-k használata helyett gyermekfolyamatként indítson CLI-ügynököket (például Claude Code-ot vagy Codexet). Ez „CLI mint háttérrendszer” átvitelt biztosít.

---

## Mi az ACP?

Az ACP (Agent Client Protocol) egy **„CLI mint háttérrendszer” átviteli mód** az OmniRoute számára. Az MI-szolgáltatóknak küldött HTTP API-hívások elfogása helyett az ACP **gyermekfolyamatként indítja el a CLI-ügynököket**, és a saját natív interfészükön keresztül továbbítja nekik a promptokat.

### Miért érdemes ACP-t használni?

| Előny                         | Leírás                                                        |
| ----------------------------- | ------------------------------------------------------------- |
| **Nincs szükség API-kulcsra** | A meglévő CLI-hitelesítését használja                         |
| **Natív protokoll**           | Minden CLI saját natív bemeneti/kimeneti formátumát használja |
| **Automatikus felderítés**    | Észleli a rendszerére telepített CLI-ket                      |
| **15 beépített ügynök**       | Előre konfigurálva a népszerű CLI-eszközökhöz                 |
| **Egyéni ügynökök**           | Saját CLI-eszközeit is hozzáadhatja a beállításokon keresztül |
| **Folyamatkezelés**           | Kezeli az életciklust (indítás, küldés, leállítás)            |

---

## Támogatott CLI-ügynökök

Az ACP alapból **15 beépített CLI-ügynököt** támogat:

| Ügynökazonosító | Megjelenítési név  | Bináris       | Protokoll |
| --------------- | ------------------ | ------------- | --------- |
| `codex`         | OpenAI Codex CLI   | `codex`       | stdio     |
| `claude`        | Claude Code CLI    | `claude`      | stdio     |
| `goose`         | Goose CLI          | `goose`       | stdio     |
| `openclaw`      | OpenClaw           | `openclaw`    | stdio     |
| `aider`         | Aider              | `aider`       | stdio     |
| `opencode`      | OpenCode           | `opencode`    | stdio     |
| `cline`         | Cline              | `cline`       | stdio     |
| `qwen`          | Qwen Code          | `qwen --acp`  | stdio     |
| `forge`         | ForgeCode          | `forge`       | stdio     |
| `amazon-q`      | Amazon Q Developer | `q`           | stdio     |
| `interpreter`   | Open Interpreter   | `interpreter` | stdio     |
| `cursor-cli`    | Cursor CLI         | `cursor`      | stdio     |
| `warp`          | Warp AI            | `warp`        | stdio     |
| `gemini`        | Gemini CLI         | `gemini`      | stdio     |
| `zcode`         | ZCode              | `zcode`       | stdio     |

### Egyéni ügynökök

A beállításokon keresztül saját CLI-ügynököket is hozzáadhat. Az egyéni ügynökök ugyanazokat a funkciókat támogatják, mint a beépített ügynökök.

---

## Gyors kezdés

### 1. lépés: Telepítsen egy CLI-ügynököt

```bash
# Példa: A Claude Code CLI telepítése
npm install -g @anthropic-ai/claude-code

# A telepítés ellenőrzése
claude --version
```

### 2. lépés: Az ACP automatikus felderítése

Az ACP automatikusan észleli a rendszerére telepített CLI-ügynököket. Nincs szükség konfigurálásra!

### 3. lépés: Az ACP átviteli mód használata

Az észlelést követően az ACP bármely támogatott szolgáltató átviteli módjaként használható. Az OmniRoute automatikusan az ACP-t használja, amikor a CLI elérhető.

---

## Az ACP működése

### Architektúra

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP-proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│ Gyermekfolyamat │
│  (CLI-ügynök)   │
│                 │
│  stdin  ◄──────┤  Prompt küldése
│  stdout ──────►│  Válasz fogadása
│  stderr ──────►│  Hibák fogadása
└─────────────────┘
```

### A folyamat életciklusa

1. **Indítás** — Az ACP gyermekfolyamatot hoz létre a CLI-ügynök számára
2. **Küldés** — Az ACP promptokat ír a folyamat stdin adatfolyamába
3. **Fogadás** — Az ACP beolvassa a válaszokat a stdout/stderr adatfolyamokból
4. **Inaktivitás észlelése** — Az ACP 2 másodpercnyi inaktivitás után tekinti befejezettnek a választ
5. **Leállítás** — Az ACP leállítja a folyamatot (SIGTERM, majd 5 másodperc elteltével SIGKILL)

### Kommunikációs protokoll

Az ACP **stdio** (szabványos bemenet/kimenet) használatával kommunikál a CLI-ügynökökkel. A protokoll a következő:

1. **Prompt küldése** — Írás a stdin adatfolyamba egy sortöréssel
2. **Várakozás a válaszra** — Olvasás a stdout adatfolyamból az inaktivitásig (2 másodperc kimenet nélkül)
3. **Időtúllépés** — Alapértelmezés szerint 120 másodperc (konfigurálható)

---

## API-referencia

### Regisztrációs függvények

#### `detectInstalledAgents()`

Észleli a rendszerre telepített összes CLI-ügynököt. Az eredményeket 60 másodpercig gyorsítótárazza.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Visszatérési érték: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // pl. „codex”, „claude”
  name: string; // Megjelenítendő név
  binary: string; // Az elindítandó bináris neve
  versionCommand: string; // Verzióészlelési parancs
  version: string | null; // Észlelt verzió (null, ha nincs telepítve)
  installed: boolean; // Telepítve van-e az ügynök
  providerAlias: string; // Szolgáltatói azonosító az OmniRoute-ban
  spawnArgs: string[]; // Indításkor átadandó argumentumok
  protocol: "stdio" | "http"; // Kommunikációs protokoll
  isCustom?: boolean; // Felhasználó által definiált egyéni ügynök-e
}
```

#### `getAvailableAgents()`

Csak az ACP számára telepített és elérhető ügynököket kérdezi le.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Visszatérési érték: CliAgentInfo[] (csak a telepített ügynökök)
```

#### `getAgentById(id)`

Lekér egy adott ügynököt az azonosítója alapján.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Visszatérési érték: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Beállítja a beállításokból származó egyéni ügynökdefiníciókat.

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

### Kezelőfüggvények

#### `acpManager.spawn(agentId, binary, args, env)`

Elindít egy új CLI-ügynökfolyamatot.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* egyéni környezeti változók */
});
// Visszatérési érték: AcpSession
```

**Engedélyezett ügynökazonosítók**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Utasítást küld egy CLI-ügynöknek, és összegyűjti a választ.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 perces időtúllépés
);
// Visszatérési érték: Promise<string>
```

#### `acpManager.kill(sessionId)`

Leállít egy munkamenetet, és elvégzi a szükséges tisztítást.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Visszatérési érték: boolean
```

#### `acpManager.getActiveSessions()`

Lekéri az összes aktív munkamenetet.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Visszatérési érték: AcpSession[]
```

#### `acpManager.killAll()`

Leállítja az összes munkamenetet.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Munkamenet-interfész

```typescript
interface AcpSession {
  id: string; // Egyedi munkamenet-azonosító
  agentId: string; // Ügynökazonosító (pl. „claude”)
  process: ChildProcess; // Gyermekfolyamat fogantyúja
  alive: boolean; // Fut-e a folyamat
  stdoutBuffer: string; // Összegyűjtött stdout-puffer
  stderrBuffer: string; // Összegyűjtött stderr-puffer
  createdAt: Date; // Létrehozás időbélyege
}
```

### Események

Az `AcpManager` kiterjeszti az `EventEmitter` osztályt, és a következő eseményeket bocsátja ki:

#### `stdout`

Akkor kerül kibocsátásra, amikor a CLI-ügynök az stdout kimenetre ír.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Akkor kerül kibocsátásra, amikor a CLI-ügynök az stderr kimenetre ír.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Akkor kerül kibocsátásra, amikor a CLI-ügynök folyamata kilép.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Akkor kerül kibocsátásra, amikor hiba történik a CLI-ügynök folyamatában.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfiguráció

### Környezeti változók

Az ACP örökli az összes környezeti változót a szülőfolyamattól, és egyéni környezeti változókkal is kibővíthető:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Indítási argumentumok

Minden ügynök rendelkezik a rendszerleíró adatbázisban meghatározott alapértelmezett indítási argumentumokkal. Ezek felülírhatók:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Időtúllépések

A prompt alapértelmezett időtúllépése **120 másodperc** (2 perc). Ez felülírható:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 perc
```

### Észlelési gyorsítótár

Az ügynökészlelés eredménye **60 másodpercig** gyorsítótárazva van a költséges fájlrendszer-vizsgálatok elkerülése érdekében. Kényszerített frissítés:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Biztonság

### Parancsinjektálás megelőzése

Az ACP ellenőrzi a verzióparancsokat a parancsinjektálásos támadások megelőzése érdekében:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Az ezeket a karaktereket tartalmazó verzióparancsokat a rendszer elutasítja:

- `;` — Parancselválasztó
- `&` — Háttérfolyamat
- `|` — Adatcsatorna
- `<`, `>` — Átirányítás
- `` ` `` — Parancshelyettesítés
- `$` — Változókifejtés
- `\r`, `\n` — Sortörések

### Binárisnév ellenőrzése

Az ACP ellenőrzi, hogy a verzióparancs binárisának neve megegyezik-e az elvárt binárisnévvel (kivéve, ha egyéni ügynökről van szó).

### Folyamatok elkülönítése

Minden ACP-munkamenet saját gyermekfolyamatban fut. A folyamat leáll, amikor a munkamenet véget ér vagy túllépi az időkorlátot.

---

## Teljesítmény

### Észlelési teljesítmény

- **Első hívás**: ~50-200ms (minden ügynöknél futtatja a `version` parancsot)
- **Gyorsítótárazott hívások**: <1ms (a gyorsítótárból tér vissza)
- **Gyorsítótár TTL-értéke**: 60 másodperc

### Promptteljesítmény

- **Indítás**: ~50-100ms
- **Prompt küldése**: ~10-50ms
- **Válaszra várakozás**: A CLI-ügynöktől függ (jellemzően 1-30 másodperc)
- **Leállítás**: ~5 másodperc (SIGTERM) + azonnali (SIGKILL)

### Erőforrás-használat

- **Memória munkamenetenként**: ~10-50MB (a CLI-ügynöktől függ)
- **CPU**: Minimális (I/O-korlátozott)
- **Lemez**: Nincs

---

## Hibaelhárítás

### „Unknown agent” hiba

**Probléma**: Az `acpManager.spawn()` `Unknown agent: <id>` hibát dob

**Megoldás**: A `spawn()` csak a következő ügynököket engedélyezi:

- `claude`
- `codex`
- `gemini`
- `qwen`

A többi ügynököt manuálisan vagy egyéni ügynökdefiníciókon keresztül kell elindítani.

### „Session not alive” hiba

**Probléma**: Az `acpManager.sendPrompt()` `Session ${sessionId} is not alive` hibát dob

**Megoldás**: Lehetséges, hogy a munkamenet befejeződött vagy leállították. Ellenőrizze a munkamenet állapotát:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Indítsa újra a munkamenetet
  acpManager.spawn("claude", "claude", [], {});
}
```

### „ACP timeout” hiba

**Probléma**: Az `acpManager.sendPrompt()` `ACP timeout after 120000ms` hibát dob

**Megoldás**: Növelje az időkorlátot:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 perc
```

### A CLI nem észlelhető

**Probléma**: A `detectInstalledAgents()` nem találja a CLI-t

**Megoldások**:

1. **Ellenőrizze a PATH változót**: Győződjön meg arról, hogy a CLI szerepel a rendszer PATH változójában
2. **Ellenőrizze a verzióparancsot**: Futtassa manuálisan a `claude --version` parancsot
3. **Ellenőrizze a jogosultságokat**: Győződjön meg arról, hogy a CLI végrehajtható
4. **Egyéni ügynök**: Adjon hozzá egyéni ügynökdefiníciót a nem szabványos CLI-khez

### Hozzáférés megtagadva

**Probléma**: Az ACP nem tudja végrehajtani a CLI-t

**Megoldások**:

1. **Ellenőrizze a fájljogosultságokat**: `chmod +x /usr/local/bin/claude`
2. **Ellenőrizze a tulajdonjogot**: Győződjön meg arról, hogy az OmniRoute rendelkezik olvasási/végrehajtási jogosultságokkal
3. **Ellenőrizze a SELinux/AppArmor beállításait**: Ezek blokkolhatják a folyamatok indítását

---

## Példák

### 1. példa: A Claude Code elindítása és használata

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Telepített ügynökök észlelése
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Új munkamenet indítása
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Prompt küldése
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Erőforrások felszabadítása
  acpManager.kill(session.id);
}
```

### 2. példa: Automatikus felderítés tartalék megoldással

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Először a Claude kipróbálása, tartalék megoldásként a Codex használata
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

### 3. példa: Egyéni ügynök

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Egyéni CLI-ügynök regisztrálása
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

// A detectInstalledAgents() mostantól tartalmazza a „my-llm-cli” ügynököt
const agents = detectInstalledAgents();
```

---

## Mi következik?

- **[API-referencia](../reference/API_REFERENCE.md)** — REST API-végpontok
- **[Szolgáltatói referencia](../reference/PROVIDER_REFERENCE.md)** — Mind a 352 szolgáltató
- **[MCP-kiszolgáló](./MCP-SERVER.md)** — Model Context Protocol-integráció
- **[A2A-kiszolgáló](./A2A-SERVER.md)** — Ügynökök közötti protokoll
- **[Felhőalapú ügynök](./CLOUD_AGENT.md)** — Felhőalapú ügynökök

---

## Hivatkozások

- [AionUi projekt](https://github.com/iOfficeAI/AionUi) — Inspiráció az ACP automatikus észleléséhez
- [ACP-forráskód](../../src/lib/acp/) — Megvalósítási részletek
  - `manager.ts` — A folyamat életciklusának kezelése
  - `registry.ts` — Ügynökök felderítése és regisztrálása
  - `index.ts` — A nyilvános API exportjai
