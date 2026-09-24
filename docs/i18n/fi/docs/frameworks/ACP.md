# ACP (Agent Client Protocol) (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP antaa OmniRouten käynnistää CLI-agentteja (kuten Claude Code ja Codex) aliprosesseina HTTP-rajapintojen käyttämisen sijaan. Tämä tarjoaa käyttöön "CLI-as-backend"-siirtotavan.

---

## Mikä ACP on?

ACP (Agent Client Protocol) on OmniRouten **"CLI-as-backend"-siirtotapa**. Tekoälypalveluntarjoajille lähetettävien HTTP API -kutsujen sieppaamisen sijaan ACP **käynnistää CLI-agentteja aliprosesseina** ja välittää kehotteet niiden omien rajapintojen kautta.

### Miksi käyttää ACP:tä?

| Hyöty                             | Kuvaus                                              |
| --------------------------------- | --------------------------------------------------- |
| **API-avaimia ei tarvita**        | Käyttää olemassa olevaa CLI-todennustasi            |
| **Natiivi protokolla**            | Käyttää kunkin CLI:n omaa syöte- ja tulostusmuotoa  |
| **Automaattinen tunnistus**       | Tunnistaa järjestelmääsi asennetut CLI:t            |
| **15 sisäänrakennettua agenttia** | Esimääritetty suosituille CLI-työkaluille           |
| **Mukautetut agentit**            | Lisää omia CLI-työkalujasi asetusten kautta         |
| **Prosessinhallinta**             | Hallitsee elinkaaren (käynnistys, lähetys, lopetus) |

---

## Tuetut CLI-agentit

ACP tukee valmiiksi **15:tä sisäänrakennettua CLI-agenttia**:

| Agentin tunnus | Näyttönimi         | Binääri       | Protokolla |
| -------------- | ------------------ | ------------- | ---------- |
| `codex`        | OpenAI Codex CLI   | `codex`       | stdio      |
| `claude`       | Claude Code CLI    | `claude`      | stdio      |
| `goose`        | Goose CLI          | `goose`       | stdio      |
| `openclaw`     | OpenClaw           | `openclaw`    | stdio      |
| `aider`        | Aider              | `aider`       | stdio      |
| `opencode`     | OpenCode           | `opencode`    | stdio      |
| `cline`        | Cline              | `cline`       | stdio      |
| `qwen`         | Qwen Code          | `qwen --acp`  | stdio      |
| `forge`        | ForgeCode          | `forge`       | stdio      |
| `amazon-q`     | Amazon Q Developer | `q`           | stdio      |
| `interpreter`  | Open Interpreter   | `interpreter` | stdio      |
| `cursor-cli`   | Cursor CLI         | `cursor`      | stdio      |
| `warp`         | Warp AI            | `warp`        | stdio      |
| `gemini`       | Gemini CLI         | `gemini`      | stdio      |
| `zcode`        | ZCode              | `zcode`       | stdio      |

### Mukautetut agentit

Voit lisätä omia CLI-agenttejasi asetusten kautta. Mukautetut agentit tukevat samoja ominaisuuksia kuin sisäänrakennetut agentit.

---

## Pika-aloitus

### Vaihe 1: Asenna CLI-agentti

```bash
# Esimerkki: Asenna Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Tarkista asennus
claude --version
```

### Vaihe 2: ACP:n automaattinen tunnistus

ACP tunnistaa järjestelmääsi asennetut CLI-agentit automaattisesti. Määrityksiä ei tarvita!

### Vaihe 3: Käytä ACP-siirtotapaa

Kun ACP on tunnistanut agentin, sitä voidaan käyttää minkä tahansa tuetun palveluntarjoajan siirtotapana. OmniRoute käyttää ACP:tä automaattisesti, kun CLI on käytettävissä.

---

## Miten ACP toimii

### Arkkitehtuuri

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP-välityspalvelin) │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Aliprosessi    │
│  (CLI-agentti)  │
│                 │
│  stdin  ◄──────┤  Lähetä kehote
│  stdout ──────►│  Vastaanota vastaus
│  stderr ──────►│  Vastaanota virheet
└─────────────────┘
```

### Prosessin elinkaari

1. **Käynnistys** — ACP luo CLI-agentille aliprosessin
2. **Lähetys** — ACP kirjoittaa kehotteet prosessin stdin-syötteeseen
3. **Vastaanotto** — ACP lukee vastaukset stdout- ja stderr-virroista
4. **Joutokäynnin tunnistus** — ACP odottaa kahden sekunnin toimettomuuden ennen kuin katsoo vastauksen olevan valmis
5. **Lopetus** — ACP lopettaa prosessin (SIGTERM ja sitten SIGKILL 5 sekunnin kuluttua)

### Viestintäprotokolla

ACP käyttää **stdio**-mekanismia (vakiosyöte/-tuloste) viestintään CLI-agenttien kanssa. Protokolla toimii näin:

1. **Lähetä kehote** — Kirjoita stdin-syötteeseen rivinvaihdon kanssa
2. **Odota vastausta** — Lue stdout-tulosteesta, kunnes prosessi on joutilaana (ei tulostetta 2 sekuntiin)
3. **Aikakatkaisu** — Oletusarvoisesti 120 sekuntia (määritettävissä)

---

## API-viite

### Rekisterifunktiot

#### `detectInstalledAgents()`

Tunnistaa kaikki järjestelmään asennetut CLI-agentit. Tulokset tallennetaan välimuistiin 60 sekunniksi.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Palauttaa: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // esim. "codex", "claude"
  name: string; // Näyttönimi
  binary: string; // Käynnistettävän binääritiedoston nimi
  versionCommand: string; // Version tunnistuskomento
  version: string | null; // Tunnistettu versio (null, jos sitä ei ole asennettu)
  installed: boolean; // Onko agentti asennettu
  providerAlias: string; // Palveluntarjoajan tunnus OmniRoutessa
  spawnArgs: string[]; // Käynnistyksen yhteydessä välitettävät argumentit
  protocol: "stdio" | "http"; // Tiedonsiirtoprotokolla
  isCustom?: boolean; // Onko tämä käyttäjän määrittämä mukautettu agentti
}
```

#### `getAvailableAgents()`

Hakee vain agentit, jotka on asennettu ja jotka ovat käytettävissä ACP:lle.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Palauttaa: CliAgentInfo[] (vain asennetut agentit)
```

#### `getAgentById(id)`

Hakee tietyn agentin tunnuksen perusteella.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Palauttaa: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Asettaa mukautetut agenttimääritykset asetuksista.

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

### Hallintafunktiot

#### `acpManager.spawn(agentId, binary, args, env)`

Käynnistää uuden CLI-agenttiprosessin.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* mukautetut ympäristömuuttujat */
});
// Palauttaa: AcpSession
```

**Sallitut agenttitunnukset**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Lähettää kehotteen CLI-agentille ja kerää vastauksen.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 minuutin aikakatkaisu
);
// Palauttaa: Promise<string>
```

#### `acpManager.kill(sessionId)`

Lopettaa istunnon ja siivoaa resurssit.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Palauttaa: boolean
```

#### `acpManager.getActiveSessions()`

Hakee kaikki aktiiviset istunnot.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Palauttaa: AcpSession[]
```

#### `acpManager.killAll()`

Lopettaa kaikki istunnot.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Istunnon rajapinta

```typescript
interface AcpSession {
  id: string; // Yksilöllinen istuntotunnus
  agentId: string; // Agenttitunnus (esim. "claude")
  process: ChildProcess; // Aliprosessin kahva
  alive: boolean; // Onko prosessi käynnissä
  stdoutBuffer: string; // Kertynyt stdout-puskuri
  stderrBuffer: string; // Kertynyt stderr-puskuri
  createdAt: Date; // Luonnin aikaleima
}
```

### Tapahtumat

`AcpManager` laajentaa `EventEmitter`-luokkaa ja lähettää seuraavat tapahtumat:

#### `stdout`

Lähetetään, kun CLI-agentti kirjoittaa stdout-virtaan.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Lähetetään, kun CLI-agentti kirjoittaa stderr-virtaan.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Lähetetään, kun CLI-agenttiprosessi päättyy.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Lähetetään, kun CLI-agenttiprosessissa tapahtuu virhe.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Määritykset

### Ympäristömuuttujat

ACP perii kaikki ympäristömuuttujat pääprosessilta, ja niitä voidaan täydentää mukautetuilla ympäristömuuttujilla:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Käynnistysargumentit

Kullekin agentille on määritetty oletusarvoiset käynnistysargumentit rekisterissä. Voit korvata ne:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Aikakatkaisut

Kehotteen oletusaikakatkaisu on **120 sekuntia** (2 minuuttia). Voit korvata sen:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuuttia
```

### Tunnistusvälimuisti

Agenttien tunnistustiedot tallennetaan välimuistiin **60 sekunniksi**, jotta vältetään raskaat tiedostojärjestelmän tarkistukset. Pakota päivitys:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Tietoturva

### Komentoinjektion estäminen

ACP vahvistaa versiokomennot komentoinjektiohyökkäysten estämiseksi:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Näitä merkkejä sisältävät versiokomennot hylätään:

- `;` — Komentojen erotin
- `&` — Taustaprosessi
- `|` — Putki
- `<`, `>` — Uudelleenohjaus
- `` ` `` — Komennon korvaaminen
- `$` — Muuttujan laajentaminen
- `\r`, `\n` — Rivinvaihdot

### Binäärin nimen vahvistaminen

ACP vahvistaa, että versiokomennon binääri vastaa odotettua binäärin nimeä (ellei kyseessä ole mukautettu agentti).

### Prosessien eristäminen

Jokainen ACP-istunto suoritetaan omassa aliprosessissaan. Prosessi lopetetaan, kun istunto päättyy tai aikakatkaisu tapahtuu.

---

## Suorituskyky

### Tunnistuksen suorituskyky

- **Ensimmäinen kutsu**: ~50–200 ms (suorittaa `version`-komennon kullekin agentille)
- **Välimuistissa olevat kutsut**: <1 ms (palauttaa välimuistista)
- **Välimuistin TTL**: 60 sekuntia

### Kehotteen suorituskyky

- **Käynnistys**: ~50–100 ms
- **Kehotteen lähettäminen**: ~10–50 ms
- **Vastauksen odottaminen**: Riippuu CLI-agentista (tyypillisesti 1–30 sekuntia)
- **Lopettaminen**: ~5 sekuntia (SIGTERM) + välittömästi (SIGKILL)

### Resurssien käyttö

- **Muisti istuntoa kohden**: ~10–50 Mt (riippuu CLI-agentista)
- **CPU**: Vähäinen (I/O-sidonnainen)
- **Levytila**: Ei käyttöä

---

## Vianmääritys

### "Unknown agent" -virhe

**Ongelma**: `acpManager.spawn()` aiheuttaa virheen `Unknown agent: <id>`

**Ratkaisu**: Vain seuraavat agentit ovat sallittuja `spawn()`-kutsussa:

- `claude`
- `codex`
- `gemini`
- `qwen`

Muut agentit on käynnistettävä manuaalisesti tai mukautettujen agenttimääritysten avulla.

### "Session not alive" -virhe

**Ongelma**: `acpManager.sendPrompt()` aiheuttaa virheen `Session ${sessionId} is not alive`

**Ratkaisu**: Istunto on saattanut päättyä tai se on lopetettu. Tarkista istunnon tila:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Käynnistä istunto uudelleen
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" -virhe

**Ongelma**: `acpManager.sendPrompt()` aiheuttaa virheen `ACP timeout after 120000ms`

**Ratkaisu**: Pidennä aikakatkaisua:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minuuttia
```

### CLI:tä ei tunnisteta

**Ongelma**: `detectInstalledAgents()` ei löydä CLI:täsi

**Ratkaisut**:

1. **Tarkista PATH**: Varmista, että CLI sisältyy järjestelmäsi PATH-muuttujaan
2. **Tarkista versiokomento**: Suorita `claude --version` manuaalisesti
3. **Tarkista käyttöoikeudet**: Varmista, että CLI on suoritettavissa
4. **Mukautettu agentti**: Lisää mukautettu agenttimääritys epätyypillisille CLI-työkaluille

### Käyttö estetty

**Ongelma**: ACP ei voi suorittaa CLI:tä

**Ratkaisut**:

1. **Tarkista tiedoston käyttöoikeudet**: `chmod +x /usr/local/bin/claude`
2. **Tarkista omistajuus**: Varmista, että OmniRoutella on luku- ja suoritusoikeudet
3. **Tarkista SELinux/AppArmor**: Saattaa estää prosessien käynnistämisen

---

## Esimerkit

### Esimerkki 1: Claude Coden käynnistäminen ja käyttäminen

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Tunnista asennetut agentit
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Käynnistä uusi istunto
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Lähetä kehote
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Siivoa resurssit
  acpManager.kill(session.id);
}
```

### Esimerkki 2: Automaattinen tunnistus varavaihtoehdolla

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Kokeile ensin Claudea ja käytä Codexia varavaihtoehtona
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

### Esimerkki 3: Mukautettu agentti

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Rekisteröi mukautettu CLI-agentti
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

// Nyt detectInstalledAgents() sisältää agentin "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Mitä seuraavaksi?

- **[API-viite](../reference/API_REFERENCE.md)** — REST API -päätepisteet
- **[Palveluntarjoajien viite](../reference/PROVIDER_REFERENCE.md)** — Kaikki 352 palveluntarjoajaa
- **[MCP-palvelin](./MCP-SERVER.md)** — Model Context Protocol -integraatio
- **[A2A-palvelin](./A2A-SERVER.md)** — Agent-to-Agent-protokolla
- **[Pilviagentti](./CLOUD_AGENT.md)** — Pilvipohjaiset agentit

---

## Viitteet

- [AionUi-projekti](https://github.com/iOfficeAI/AionUi) — Inspiraatio ACP:n automaattiseen tunnistukseen
- [ACP-lähdekoodi](../../src/lib/acp/) — Toteutuksen yksityiskohdat
  - `manager.ts` — Prosessin elinkaaren hallinta
  - `registry.ts` — Agenttien tunnistus ja rekisteröinti
  - `index.ts` — Julkisen API:n viennit
