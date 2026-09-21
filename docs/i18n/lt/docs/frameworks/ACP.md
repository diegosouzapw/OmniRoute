# ACP (Agent Client Protocol) (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Trumpai**: ACP leidžia „OmniRoute“ paleisti CLI agentus (pvz., „Claude Code“, „Codex“) kaip antrinius procesus, užuot naudojus HTTP API. Taip gaunamas „CLI kaip galinė sistema“ perdavimo būdas.

---

## Kas yra ACP?

ACP (agentų kliento protokolas, angl. „Agent Client Protocol“) yra **„CLI kaip galinė sistema“ perdavimo būdas**, skirtas „OmniRoute“. Užuot perėmęs HTTP API užklausas DI paslaugų teikėjams, ACP **paleidžia CLI agentus kaip antrinius procesus** ir perduoda užklausas per jų savąją sąsają.

### Kodėl verta naudoti ACP?

| Privalumas                 | Aprašymas                                                      |
| -------------------------- | -------------------------------------------------------------- |
| **Nereikia API raktų**     | Naudojamas esamas CLI autentifikavimas                         |
| **Savasis protokolas**     | Naudojamas kiekvieno CLI savasis įvesties / išvesties formatas |
| **Automatinis aptikimas**  | Aptinkamos jūsų sistemoje įdiegtos CLI priemonės               |
| **15 integruotų agentų**   | Iš anksto sukonfigūruota populiarioms CLI priemonėms           |
| **Pasirinktiniai agentai** | Per nustatymus galite pridėti savo CLI priemones               |
| **Procesų valdymas**       | Valdomas gyvavimo ciklas (paleidimas, siuntimas, nutraukimas)  |

---

## Palaikomi CLI agentai

ACP iškart palaiko **15 integruotų CLI agentų**:

| Agento ID     | Rodomas pavadinimas | Vykdomasis failas | Protokolas |
| ------------- | ------------------- | ----------------- | ---------- |
| `codex`       | OpenAI Codex CLI    | `codex`           | stdio      |
| `claude`      | Claude Code CLI     | `claude`          | stdio      |
| `goose`       | Goose CLI           | `goose`           | stdio      |
| `openclaw`    | OpenClaw            | `openclaw`        | stdio      |
| `aider`       | Aider               | `aider`           | stdio      |
| `opencode`    | OpenCode            | `opencode`        | stdio      |
| `cline`       | Cline               | `cline`           | stdio      |
| `qwen`        | Qwen Code           | `qwen --acp`      | stdio      |
| `forge`       | ForgeCode           | `forge`           | stdio      |
| `amazon-q`    | Amazon Q Developer  | `q`               | stdio      |
| `interpreter` | Open Interpreter    | `interpreter`     | stdio      |
| `cursor-cli`  | Cursor CLI          | `cursor`          | stdio      |
| `warp`        | Warp AI             | `warp`            | stdio      |
| `gemini`      | Gemini CLI          | `gemini`          | stdio      |
| `zcode`       | ZCode               | `zcode`           | stdio      |

### Pasirinktiniai agentai

Per nustatymus galite pridėti savo CLI agentus. Pasirinktiniai agentai palaiko tas pačias funkcijas kaip ir integruoti agentai.

---

## Greitoji pradžia

### 1 veiksmas: įdiekite CLI agentą

```bash
# Pavyzdys: įdiekite Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Patikrinkite įdiegtį
claude --version
```

### 2 veiksmas: automatinis ACP aptikimas

ACP automatiškai aptinka jūsų sistemoje įdiegtus CLI agentus. Konfigūruoti nereikia!

### 3 veiksmas: naudokite ACP perdavimo būdą

Aptikus ACP galima naudoti kaip bet kurio palaikomo paslaugų teikėjo perdavimo būdą. Kai CLI yra pasiekiama, „OmniRoute“ automatiškai naudos ACP.

---

## Kaip veikia ACP

### Architektūra

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP tarpinis │
│  serveris)      │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│ Antrinis procesas│
│  (CLI agentas)  │
│                 │
│  stdin  ◄──────┤  Siųsti užklausą
│  stdout ──────►│  Gauti atsakymą
│  stderr ──────►│  Gauti klaidas
└─────────────────┘
```

### Proceso gyvavimo ciklas

1. **Paleidimas** — ACP sukuria CLI agento antrinį procesą
2. **Siuntimas** — ACP įrašo užklausas į proceso stdin
3. **Gavimas** — ACP nuskaito atsakymus iš stdout/stderr
4. **Neveiklumo aptikimas** — prieš laikydamas atsakymą užbaigtu, ACP laukia 2 sekundes neveiklumo
5. **Nutraukimas** — ACP nutraukia procesą (SIGTERM, o po 5 sek. – SIGKILL)

### Ryšio protokolas

Ryšiui su CLI agentais ACP naudoja **stdio** (standartinę įvestį / išvestį). Protokolas veikia taip:

1. **Siųsti užklausą** — įrašyti į stdin su naujos eilutės simboliu
2. **Laukti atsakymo** — skaityti iš stdout iki neveiklumo būsenos (2 sek. be išvesties)
3. **Skirtasis laikas** — numatytoji reikšmė yra 120 sekundžių (galima konfigūruoti)

---

## API žinynas

### Registro funkcijos

#### `detectInstalledAgents()`

Aptinka visus sistemoje įdiegtus CLI agentus. Rezultatai saugomi podėlyje 60 sekundžių.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Grąžina: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // pvz., "codex", "claude"
  name: string; // Rodomas pavadinimas
  binary: string; // Paleidžiamo dvejetainio failo pavadinimas
  versionCommand: string; // Versijos aptikimo komanda
  version: string | null; // Aptikta versija (null, jei neįdiegta)
  installed: boolean; // Ar agentas įdiegtas
  providerAlias: string; // Teikėjo ID sistemoje „OmniRoute“
  spawnArgs: string[]; // Paleidžiant perduodami argumentai
  protocol: "stdio" | "http"; // Ryšio protokolas
  isCustom?: boolean; // Ar tai naudotojo apibrėžtas pasirinktinis agentas
}
```

#### `getAvailableAgents()`

Gauna tik tuos agentus, kurie yra įdiegti ir pasiekiami per ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Grąžina: CliAgentInfo[] (tik įdiegti agentai)
```

#### `getAgentById(id)`

Gauna konkretų agentą pagal ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Grąžina: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Nustato pasirinktinių agentų apibrėžtis iš nuostatų.

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

### Tvarkytuvo funkcijos

#### `acpManager.spawn(agentId, binary, args, env)`

Paleidžia naują CLI agento procesą.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* pasirinktiniai aplinkos kintamieji */
});
// Grąžina: AcpSession
```

**Leidžiami agentų ID**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Siunčia užklausą CLI agentui ir surenka atsakymą.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 minučių skirtasis laikas
);
// Grąžina: Promise<string>
```

#### `acpManager.kill(sessionId)`

Nutraukia seansą ir išvalo jo išteklius.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Grąžina: boolean
```

#### `acpManager.getActiveSessions()`

Gauna visus aktyvius seansus.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Grąžina: AcpSession[]
```

#### `acpManager.killAll()`

Nutraukia visus seansus.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Seanso sąsaja

```typescript
interface AcpSession {
  id: string; // Unikalus seanso ID
  agentId: string; // Agento ID (pvz., "claude")
  process: ChildProcess; // Antrinio proceso deskriptorius
  alive: boolean; // Ar procesas veikia
  stdoutBuffer: string; // Sukauptas stdout buferis
  stderrBuffer: string; // Sukauptas stderr buferis
  createdAt: Date; // Sukūrimo laiko žyma
}
```

### Įvykiai

`AcpManager` išplečia `EventEmitter` ir skleidžia šiuos įvykius:

#### `stdout`

Skleidžiamas, kai CLI agentas rašo į stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Skleidžiamas, kai CLI agentas rašo į stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Skleidžiamas, kai CLI agento procesas baigiamas.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Skleidžiamas, kai CLI agento procese įvyksta klaida.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfigūracija

### Aplinkos kintamieji

ACP paveldi visus pirminio proceso aplinkos kintamuosius ir gali būti papildytas pasirinktiniais aplinkos kintamaisiais:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Paleidimo argumentai

Kiekvienas agentas turi registre apibrėžtus numatytuosius paleidimo argumentus. Juos galite pakeisti:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Skirtojo laiko ribos

Numatytoji užklausai skirto laiko riba yra **120 sekundžių** (2 minutės). Ją galite pakeisti:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutės
```

### Aptikimo podėlis

Agentų aptikimo rezultatai saugomi podėlyje **60 sekundžių**, kad būtų išvengta daug išteklių reikalaujančio failų sistemos nuskaitymo. Norėdami priverstinai atnaujinti:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Saugumas

### Komandų įterpimo prevencija

ACP tikrina versijos komandas, kad užkirstų kelią komandų įterpimo atakoms:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Versijos komandos, kuriose yra šių simbolių, atmetamos:

- `;` — Komandų skirtukas
- `&` — Foninis procesas
- `|` — Konvejeris
- `<`, `>` — Peradresavimas
- `` ` `` — Komandos pakeitimas
- `$` — Kintamojo išskleidimas
- `\r`, `\n` — Eilučių lūžiai

### Dvejetainio failo pavadinimo tikrinimas

ACP patikrina, ar versijos komandos dvejetainio failo pavadinimas atitinka numatytą dvejetainio failo pavadinimą (išskyrus pasirinktinius agentus).

### Procesų izoliavimas

Kiekvienas ACP seansas vykdomas atskirame antriniame procese. Procesas nutraukiamas, kai seansas baigiasi arba viršijama skirtojo laiko riba.

---

## Našumas

### Aptikimo našumas

- **Pirmasis iškvietimas**: ~50-200ms (kiekvienam agentui vykdo komandą `version`)
- **Iškvietimai iš podėlio**: <1ms (grąžina iš podėlio)
- **Podėlio TTL**: 60 sekundžių

### Užklausų našumas

- **Paleidimas**: ~50-100ms
- **Užklausos siuntimas**: ~10-50ms
- **Atsakymo laukimas**: Priklauso nuo CLI agento (paprastai 1–30 sekundžių)
- **Nutraukimas**: ~5 sekundės (SIGTERM) + iš karto (SIGKILL)

### Išteklių naudojimas

- **Atmintis vienam seansui**: ~10-50MB (priklauso nuo CLI agento)
- **CPU**: Minimalus naudojimas (ribojamas įvesties / išvesties operacijų)
- **Diskas**: Nenaudojamas

---

## Trikčių šalinimas

### Klaida „Unknown agent“

**Problema**: `acpManager.spawn()` pateikia klaidą `Unknown agent: <id>`

**Sprendimas**: Funkcijoje `spawn()` leidžiami tik šie agentai:

- `claude`
- `codex`
- `gemini`
- `qwen`

Kitus agentus reikia paleisti rankiniu būdu arba naudojant pasirinktinių agentų apibrėžtis.

### Klaida „Session not alive“

**Problema**: `acpManager.sendPrompt()` pateikia klaidą `Session ${sessionId} is not alive`

**Sprendimas**: Seansas galėjo būti baigtas arba nutrauktas. Patikrinkite seanso būseną:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Paleiskite seansą iš naujo
  acpManager.spawn("claude", "claude", [], {});
}
```

### Klaida „ACP timeout“

**Problema**: `acpManager.sendPrompt()` pateikia klaidą `ACP timeout after 120000ms`

**Sprendimas**: Padidinkite skirtojo laiko ribą:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutės
```

### CLI neaptiktas

**Problema**: `detectInstalledAgents()` neranda jūsų CLI

**Sprendimai**:

1. **Patikrinkite PATH**: Įsitikinkite, kad CLI yra jūsų sistemos PATH
2. **Patikrinkite versijos komandą**: Rankiniu būdu paleiskite `claude --version`
3. **Patikrinkite leidimus**: Įsitikinkite, kad CLI yra vykdomasis
4. **Pasirinktinis agentas**: Nestandartinėms CLI pridėkite pasirinktinio agento apibrėžtį

### Prieiga uždrausta

**Problema**: ACP negali vykdyti CLI

**Sprendimai**:

1. **Patikrinkite failo leidimus**: `chmod +x /usr/local/bin/claude`
2. **Patikrinkite nuosavybės teises**: Įsitikinkite, kad OmniRoute turi skaitymo ir vykdymo leidimus
3. **Patikrinkite SELinux/AppArmor**: Gali blokuoti procesų paleidimą

---

## Pavyzdžiai

### 1 pavyzdys: Claude Code paleidimas ir naudojimas

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Aptikti įdiegtus agentus
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Paleisti naują seansą
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Siųsti užklausą
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Išvalyti išteklius
  acpManager.kill(session.id);
}
```

### 2 pavyzdys: automatinis aptikimas su atsarginiu variantu

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Pirmiausia bandyti Claude, o nepavykus – Codex
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

### 3 pavyzdys: pasirinktinis agentas

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Užregistruoti pasirinktinį CLI agentą
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

// Dabar detectInstalledAgents() įtrauks „my-llm-cli“
const agents = detectInstalledAgents();
```

---

## Kas toliau?

- **[API žinynas](../reference/API_REFERENCE.md)** — REST API galiniai taškai
- **[Teikėjų žinynas](../reference/PROVIDER_REFERENCE.md)** — Visi 352 teikėjai
- **[MCP serveris](./MCP-SERVER.md)** — Model Context Protocol integracija
- **[A2A serveris](./A2A-SERVER.md)** — Agent-to-Agent protokolas
- **[Debesijos agentas](./CLOUD_AGENT.md)** — Debesijoje veikiantys agentai

---

## Nuorodos

- [AionUi projektas](https://github.com/iOfficeAI/AionUi) — Įkvėpimo šaltinis automatiniam ACP aptikimui
- [ACP šaltinio kodas](../../src/lib/acp/) — Įgyvendinimo informacija
  - `manager.ts` — Procesų gyvavimo ciklo valdymas
  - `registry.ts` — Agentų aptikimas ir registravimas
  - `index.ts` — Viešojo API eksportai
