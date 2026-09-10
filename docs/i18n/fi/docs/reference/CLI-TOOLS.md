# CLI-TOOLS (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI Työkalut — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Työkalut — OmniRoute

Viimeksi päivitetty: 2026-08-18

OmniRoute integroituu kolmeen kategoriaan CLI työkaluja, jotka on jaettu kolmeen erilliseen hallintapaneelisivuun:

| Sivusto         | Reitti                  | Konsepti                                                                                  | Määrä           |
| --------------- | ----------------------- | ----------------------------------------------------------------------------------------- | --------------- |
| **CLI Koodi**   | `/dashboard/cli-code`   | Koodausvälineet, joita osoitat OmniRouteen (Asiakas → CLI → OmniRoute → Palveluntarjoaja) | 26              |
| **CLI Agentit** | `/dashboard/cli-agents` | Itsenäiset agentit, joita osoitat OmniRouteen (sama virta, laajempi alue)                 | 8               |
| **ACP Agentit** | `/dashboard/acp-agents` | CLI:t, joita OmniRoute luo taustalla stdio/ACP:n kautta (käänteinen virta)                | katso rekisteri |

Perintöreitit ohjaavat 308:lla: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Kuinka se toimii

```
CLI Koodi / CLI Agentit (kulutussuunta):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (kaikki osoittavat OmniRouteen)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute ohjaa oikealle palveluntarjoajalle)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agentit (käänteinen luontivirta):
    Asiakkaan pyyntö → OmniRoute → luo CLI:n stdio/ACP:n kautta → vastaus
```

**Hyödyt:**

- Yksi API-avain kaikkien työkalujen hallintaan
- Kustannusten seuranta kaikissa CLI:ssä hallintapaneelissa
- Mallinvaihto ilman jokaisen työkalun uudelleenkonfigurointia
- Toimii paikallisesti ja etäpalvelimilla (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Automaattinen konfigurointi `setup-*` avulla

Sinun ei tarvitse kirjoittaa jokaisen työkalun konfiguraatiota käsin. OmniRoute toimittaa `setup-*`
komennon jokaiselle tuetulle CLI:lle, joka lukee **live** malliluettelon käynnissä olevasta
OmniRoute:sta (paikallinen tai etä) ja kirjoittaa työkalun oman konfiguraation koneellesi:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Jokainen hyväksyy `--remote <url> --api-key <key>` (konfiguroi paikallinen työkalu etä
OmniRoutea vastaan), `--dry-run` (esikatselu ilman kirjoittamista) ja `--port`. Työkalut,
joilla ei ole mallin automaattista löytämistä (Cline, Kilo, Roo, Goose, Aider, Qwen) ottavat
`--model <id>` (ja `--yes` ei-interaktiivisiin suorituksiin). Käynnistääksesi CLI:n
oikealla ympäristöllä injektoituna ja ilman konfiguraatiota kirjoitettuna, käytä yleistä
`omniroute run <target>` käynnistintä (claude, codex, aider, goose, opencode, qwen,
gemini — kohteet ja aliasit tulevat `bin/cli/cli-manifest.mjs`); perintö
per-työkalu käynnistimet `omniroute launch` (Claude Code) ja `omniroute launch-codex`
(Codex) pysyvät saatavilla. Gemini CLI on vain käynnistettävä: se on `omniroute run`
kohde, mutta sillä ei ole `setup-*`/`configure` reseptiä.

> **Täydellinen viite:** päätaulukko — mitä kukin komento kirjoittaa, jokainen lippu,
> paikallinen vs etä, ja mitkä työkalut haluavat `/v1` päätteet — löytyy
> **[CLI Integraatiot](../guides/CLI-INTEGRATIONS.md)**.

### Näiden suorittaminen säiliössä

`setup-*` komento, joka suoritetaan OmniRoute säiliössä, kirjoittaa säiliön omaan kotiin,
jota mikään isäntä CLI ei lue ja joka katoaa säiliön mukana. OmniRoute havaitsee tämän ja
poistuu `2` ohjeiden kanssa sen sijaan, että kirjoittaisi. Kaksi tuettua tapaa edetä —
asenna CLI isäntään ja `omniroute connect` säiliöön, tai bind-mountaa konfiguraatiokansiot ja
asettaa `CLI_CONFIG_HOME` (compose `host` profiili). Jokainen `setup-*` komento, plus
`omniroute configure` ja `omniroute config set`, hyväksyy
`--allow-container-write`, kun säiliön omien CLI:den konfigurointi on se, mitä todella
tarkoitit; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` tekee saman palvelimelle. Katso
[Docker Opas → Isäntä CLI työkalujen konfigurointi](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

Hallintapaneelin **apply endpoint** (`POST /api/cli-tools/apply`) valvoo
samaa suojaa: säiliössä, kirjoitus, jonka kohde ei ole bind-mounted isännästä, vastaa
**`422`** `containerEphemeralTarget: true`, turvallinen virheteksti ja — työkaluille,
joilla on isäntäresepti (claude, codex, opencode, cline,
kilo, continue) — `hostSetupCommand` (esim. `omniroute setup-opencode`), joka suoritetaan
isännällä sen sijaan; mitään ei kirjoiteta. `dryRun: true` toimii edelleen säiliötilassa
ja palauttaa luodun sisällön + kohdepolun ilman levyn koskettamista, joten voit esikatsella
hallintapaneelista ja soveltaa isännällä. Tämä käyttäytyminen on tarkoituksellista ja
regressiosuojattu `tests/unit/api/cli-tools/apply-container-guard.test.ts` — älä koskaan
"korjaa" 422:ta poistamalla suojaa.

---

## Totuuden lähde

Yhtenäinen luettelo sijaitsee tiedostossa `src/shared/constants/cliTools.ts` muodossa `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Jokaisella merkinnällä on seuraavat kentät (määritelty tiedostossa `src/shared/schemas/cliCatalog.ts`):

| Kenttä                                          | Tyyppi                                                       | Kuvaus                                                       |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `category`                                      | `"code" \| "agent"`                                          | Millä sivulla työkalu näkyy                                  |
| `vendor`                                        | `string`                                                     | Työkalun alkuperä ("Anthropic", "OSS (P. Gauthier)")         |
| `acpSpawnable`                                  | `boolean`                                                    | Voidaan myös käyttää ACP-agenttina (merkki näkyy)            |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Mukautetun päätepisteen tukitason taso. `"none"` = MITM-jono |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Konfigurointimekanismi                                       |
| `id`, `name`, `color`, `description`, `docsUrl` | standard                                                     | Ydin näyttökentät                                            |

Merkinnät, joiden `baseUrlSupport: "none"` ovat **eivät näy** hallintapaneelin sivuilla — ne on rekisteröity MITM-jonoon suunnitelmalle 11 (katso `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Kyvykkyystasot (luetteloitu × havaittavissa × konfiguroitavissa × käynnistettävissä)

Ei jokainen luetteloitu työkalu ole havaittavissa, konfiguroitavissa tai käynnistettävissä. Jokaisella tasolla on yksi
ilmoittava lähde, ja poikkeamatesti pitää ne synkronoituna:

| Taso                  | Merkitys                                                                          | Ilmoitettu tiedostossa                                                  |
| --------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Luetteloitu**       | Näkyy hallintapaneelin luettelossa (nimi, myyjä, asiakirjat, konfigurointityyppi) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                        |
| **Havaittavissa**     | Binäärin/kokoonpanon havaitseminen, terveyden tarkistukset, konfigurointipolut    | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` ajonaikainen luettelo) |
| **Konfiguroitavissa** | Tuettu komennolla `omniroute configure <cli>` (asetustapaus olemassa)             | `bin/cli/cli-manifest.mjs` (`configure: true`)                          |
| **Käynnistettävissä** | Tuettu komennolla `omniroute run <target>` (env/args-injektio määritelty)         | `bin/cli/cli-manifest.mjs` (`run: true`)                                |

`bin/cli/cli-manifest.mjs` on kanoninen suoritettava manifesti CLI-komennolle
pinnat: `run`, `configure` ja shell-completion-generaattorit kaikki saavat
kohdeluettelonsa, alias-resoluution (esimerkiksi `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
ja `--model` lipun kytkennän siitä. Poikkeamavalvoja
`tests/unit/cli/cli-manifest-drift.test.ts` varmistaa, että manifesti, ajonaikainen
luettelo, UI-luettelo ja jokainen kuluttajapinta pysyvät synkronoituna — kohde, joka lisätään
yhdelle pinnalle ilman muita, epäonnistuu testissä sen sijaan, että se poikkeaisi hiljaa.

## 1. CLI Koodin Luettelo (26 työkalua)

Kaikki työkalut, jotka näkyvät `/dashboard/cli-code`. Ne, joilla on `baseUrlSupport: none`, on kytketty MITM:n tai manuaalisen oppaan kautta sen sijaan, että käytettäisiin mukautettua perus-URL:ia:

| id           | nimi                            | myyjä               | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ------------------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Koodi                    | Anthropic           | täysi          | env            | true         |
| codex        | OpenAI Codex CLI                | OpenAI              | täysi          | custom         | true         |
| zcode        | ZCode (GLM Koodaus Suunnitelma) | Z.ai                | ei mitään      | custom         | false        |
| cline        | Cline                           | OSS (ex-Claude Dev) | täysi          | custom         | true         |
| kilo         | Kilo Koodi                      | Kilo-Org            | täysi          | custom         | false        |
| roo          | Roo Koodi                       | Roo (OSS)           | täysi          | opas           | false        |
| continue     | Jatka                           | continue.dev        | täysi          | opas           | false        |
| aider        | Aider                           | OSS (P. Gauthier)   | täysi          | opas           | true         |
| forge        | ForgeCode                       | Antinomy HQ         | täysi          | custom         | true         |
| jcode        | jcode                           | 1jehuang (OSS)      | täysi          | custom         | false        |
| deepseek-tui | DeepSeek TUI                    | Hunter Bown (OSS)   | täysi          | custom         | false        |
| codewhale    | CodeWhale                       | Hmbown (OSS)        | täysi          | custom         | false        |
| opencode     | OpenCode                        | Anomaly (ex-SST)    | täysi          | opas           | true         |
| droid        | Tehdas Droid                    | Tehdas AI           | osittainen     | opas           | false        |
| copilot      | GitHub Copilot CLI              | GitHub/MS           | täysi          | custom         | false        |
| cursor-cli   | Cursor CLI                      | Anysphere           | osittainen     | opas           | true         |
| smelt        | Smelt                           | leonardcser (OSS)   | täysi          | custom         | false        |
| pi           | Pi (pi-koodaus-agentti)         | M. Zechner (OSS)    | täysi          | custom         | false        |
| grok-build   | Grok Build                      | xAI                 | täysi          | custom         | false        |
| crush        | Crush                           | OSS (Charm)         | täysi          | custom         | false        |
| qwen         | Qwen Koodi                      | Alibaba             | täysi          | opas           | true         |
| cursor       | Cursor                          | Anysphere           | ei mitään      | opas           | false        |
| antigravity  | Antigravity                     | Google              | ei mitään      | mitm           | false        |
| hermes       | Hermes                          | Nous Research       | ei mitään      | opas           | false        |
| kiro         | Kiro AI                         | Amazon              | ei mitään      | mitm           | false        |
| custom       | Mukautettu CLI                  | —                   | täysi          | custom-builder | false        |

Työkalut, joilla on `baseUrlSupport: "partial"`, näyttävät merkinnän "⚠ Perus-URL osittainen" hallintapaneelin kortissa.

## 2. CLI-agenttien luettelo (8 työkalua)

Itsenäiset agentit, jotka näkyvät kohdassa `/dashboard/cli-agents`:

| id           | nimi             | myyjä                    | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes-agentti   | Nous Research            | täysi          | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | täysi          | true         |
| goose        | Goose            | Block / Linux Foundation | täysi          | true         |
| interpreter  | Open Interpreter | OSS                      | täysi          | true         |
| warp         | Warp AI          | Warp Inc.                | osittainen     | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | täysi          | false        |
| omp          | Oh My Pi         | OSS                      | täysi          | true         |
| letta        | Letta CLI        | Letta                    | täysi          | false        |

---

## 3. ACP-agentit (/dashboard/acp-agents)

Tämä sivu (nimetty uudelleen kohdasta `/dashboard/agents`) näyttää CLI:t, joita OmniRoute voi **luoda** taustasuoritusmoottoreina stdio/ACP-protokollan kautta. Luetteloa ylläpidetään erikseen tiedostossa `src/lib/acp/registry.ts` ja se **ei** ole sama kuin `CLI_TOOLS`.

---

## 4. MITM-jono (ei näytetä hallintapaneelissa)

Seuraavat CLI:t eivät tue mukautettua base URL:ää natiivisti ja niitä **ei ole lueteltu** CLI-koodin tai CLI-agenttien sivuilla. Ne ovat ehdokkaita MITM-väliintulolle suunnitelmassa 11:

| CLI                 | Syynä                                                              |
| ------------------- | ------------------------------------------------------------------ |
| windsurf            | BYOK rajoitettu valittuihin Claude-malleihin + yrityksen URL/token |
| amp                 | Suljettu ekosysteemi (Sourcegraph)                                 |
| amazon-q / kiro-cli | AWS SSO -todennus, ei mukautettua URL:ää                           |
| cowork              | Anthropic Desktop, ei konfiguroitavaa päätepistettä                |

Katso `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` täydellistä ristiinviittausta varten.

---

## 5. Batch Detection API

Kaikki työkalujen tunnistus on koottu yhden päätepisteen kautta:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (sama kuin muilla `/api/cli-tools/` reiteillä)
- Palauttaa: `Record<toolId, ToolBatchStatus>` (tyyppi: `src/shared/types/cliBatchStatus.ts`)
- Strategia: `Promise.all` kaikille työkaluilla, 5s aikakatkaisu per työkalu
- Välimuisti: muistissa LRU, indeksoitu konfigurointitiedoston `mtime` mukaan. Välimuisti mitätöidään, kun mtime muuttuu. Nollataan palvelimen uudelleenkäynnistyksessä.

Vastausmuoto per työkalu:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // puhdistettu, ei pinojälkiä
}
```

## 6. Asetusten Käsittelijät Uusille Työkaluille

Uusilla työkaluilla, joilla on `configType: "custom"`, on omat asetusten API-reitit:

| Reitti                                      | Työkalu                                                                        |
| ------------------------------------------- | ------------------------------------------------------------------------------ |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                                        |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url lippu)                                                       |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                                         |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, pääasiallinen + legacy `~/.deepseek` synkronointi) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                          |
| `POST /api/cli-tools/pi-settings`           | Pi koodausagentti                                                              |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                          |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + omistettu `.env` avain)                   |

Kaikki reitit käyttävät `sanitizeErrorMessage()` virhevastauksille (Kova sääntö #12).

---

## 7. Hallintapaneelin Sivujen Arkkitehtuuri

### CLI Koodi (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — palvelinosa
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — asiakasruudukko
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — työkalun yksityiskohtasivu
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 erikoistunutta työkalukorttia + `ToolDetailClient.tsx`

### CLI Agentit (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — palvelinosa
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — asiakasruudukko
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — käyttää uudelleen `ToolDetailClient`

### ACP Agentit (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — palvelinosa (siirretty `agents/`)

### Jaetut UI Komponentit (`src/shared/components/cli/`)

| Tiedosto                | Tarkoitus                                                    |
| ----------------------- | ------------------------------------------------------------ |
| `CliToolCard.tsx`       | Älykäs tilakortti (tunnistus + konfiguraatio + päätepiste)   |
| `CliConceptCard.tsx`    | Sivukohtainen käsitteen selityskortti                        |
| `CliComparisonCard.tsx` | Kolumnivertailu eri CLI-tyyppien välillä                     |
| `BaseUrlSelect.tsx`     | Päätepisteen avattava valikko (Paikallinen/Pilvi/Räätälöity) |
| `ApiKeySelect.tsx`      | API-avaimen valitsin                                         |
| `ManualConfigModal.tsx` | Kopioitava konfiguraatiolohko modal                          |

### Jaettu Hook (`src/shared/hooks/cli/`)

| Tiedosto                  | Tarkoitus                                                            |
| ------------------------- | -------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Hakee `/api/cli-tools/all-statuses`, hallitsee lataus/päivitys-tilaa |

## 8. i18n

Uudet nimialueet lisätty suunnitelmassa 14 F9:

| Nimialue    | Tarkoitus                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------- |
| `cliCommon` | Jaetut merkkijonot (korttien etiketit, käsite/vertailutekstit, yksityiskohtasivujen etiketit) |
| `cliCode`   | CLI-koodin sivun merkkijonot                                                                  |
| `cliAgents` | CLI-agenttien sivun merkkijonot                                                               |
| `acpAgents` | ACP-agenttien sivun merkkijonot                                                               |

Täydelliset PT-BR- ja EN-käännökset on toimitettu. 39 muuta paikallista asetusta siirtyy automaattisesti EN:ään nimialueen tason yhdistämisen kautta tiedostossa `src/i18n/request.ts`.

---

## 9. Nopeasti alkuun

### Vaihe 1 — Hanki OmniRoute API-avain

1. Avaa `/dashboard/api-manager` → **Luo API-avain**
2. Anna sille nimi (esim. `cli-tools`) ja valitse kaikki käyttöoikeudet
3. Kopioi avain — tarvitset sitä jokaisessa alla olevassa CLI:ssä

> Avainsi näyttää tältä: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Vaihe 2 — Asenna CLI-työkalut

Kaikki npm-pohjaiset työkalut vaativat Node.js 22.22.2+ tai 24.x:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (käynnistettävissä komennolla `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Rust-pohjainen

# Pi coding agent
# katso https://github.com/zechnerj/pi-coding-agent asennusta varten

# jcode
# katso https://github.com/1jehuang/jcode asennusta varten
```

---

### Vaihe 3 — Määritä hallintapaneelin kautta

1. Siirry osoitteeseen `http://localhost:20128/dashboard/cli-code`
2. Etsi työkalusi ruudukosta
3. Napsauta korttia avataksesi työkalun yksityiskohtasivun
4. Valitse API-avaimesi ja perus-URL
5. Napsauta **Käytä asetuksia** tai kopioi manuaalinen asetuskoodi

---

### Vaihe 4 — Aseta globaalit ympäristömuuttujat

```bash
# OmniRoute Universal Endpoint
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI lukee GOOGLE_GEMINI_BASE_URL:n JUURESTA (sen SDK liittää /v1beta/... itse)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> **Etäpalvelimelle** vaihda `localhost:20128` palvelimen IP-osoitteeseen tai verkkotunnukseen,
> esim. `http://<your-server-ip>:20128`.

---

### Vaihe 4 — Määritä jokainen työkalu

#### Claude Code

```bash
# Luo ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Käytä yhtenäistä Anthropic-portin juurta Claude Codea varten. Älä liitä `/v1` tähän.

**Testaa:** `claude "say hello"`

---

#### OpenAI Codex

Moderni Codex (v0.137+) lukee vain `~/.codex/config.toml` — vanha
`config.yaml` kuuluu perinteiselle npm CLI:lle ja se ohitetaan hiljaa. API
avain pysyy `OMNIROUTE_API_KEY` ympäristömuuttujassa (`env_key`), ei koskaan tiedostossa:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

Täydellinen viittaus (profiilit, `wire_api`, konteksti-ikkunat): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Testaa:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**Testaa:** `opencode`

> Käytä `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> lähettääksesi ajatteluvariantteja.

---

#### Cline (CLI tai VS Code)

**CLI-tila:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code -tila:**
Cline-laajennuksen asetukset → API Provider: `OpenAI Compatible` → Perus-URL: `http://localhost:20128/v1`

Tai käytä OmniRoute-hallintapaneelia → **CLI-työkalut → Cline → Käytä asetuksia**.

---

#### KiloCode (CLI tai VS Code)

**CLI-tila:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code -asetukset:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Tai käytä OmniRoute-hallintapaneelia → **CLI-työkalut → KiloCode → Käytä asetuksia**.

---

#### Continue (VS Code -laajennus)

Muokkaa `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Käynnistä VS Code uudelleen muokkauksen jälkeen.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Käytä tätä, kun VS Code Insiders on määritetty mukautettujen päätepisteiden malleille ja haluat OmniRouten toimivan ilman mukautettua otsikkokenttää.

**Suositeltu sijainti:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Esimerkki tokenisoidun OmniRoute-aliasin käytöstä:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**Huomautuksia:**

- Vaihda `sk-your-omniroute-key` OmniRoutessa luotuun API-avaimeen.
- `url`-kentän tulisi osoittaa `/api/v1/vscode/{token}/chat/completions`.
- `modelsUrl`-kentän tulisi osoittaa `/api/v1/vscode/{token}/models`.
- Suosi normaalia `/v1` + Bearer-otsikkovirtaa, kun asiakas tukee mukautettuja otsikoita.
- URL:iin upotetut tokenit ovat yhteensopivuuden varalta ja voivat näkyä editorin lokitiedoissa tai välityspalvelimen historiassa.

---

#### Kiro CLI (Amazon)

```bash
# Kirjaudu AWS/Kiro-tilillesi:
kiro-cli login

# CLI käyttää omaa todennusta — OmniRoutea ei tarvita Kiro CLI:n taustapalvelimena.
# Käytä kiro-cli:tä yhdessä OmniRouten kanssa muiden työkalujen osalta.
kiro-cli status
```

**Kiro IDE** -työpöytäsovellusta varten käytä OmniRouten kautta altistettua MITM-päätepistettä
osoitteessa `/dashboard/cli-tools → Kiro`.

---

## 10. Sisäinen OmniRoute CLI

`omniroute` binaari tarjoaa komentoja palvelimen elinkaaren, asetusten, diagnostiikan ja tarjoajien hallinnan osalta. Sisäänkäyntipiste: `bin/omniroute.mjs`.

```bash
omniroute                              # Käynnistä palvelin (oletusportti 20128)
omniroute setup                        # Interaktiivinen asennusvelho
omniroute doctor                       # Tarkista konfiguraatio, DB, portit, ajonaika
omniroute providers list               # Määritetyt tarjoajayhteydet
omniroute providers test-all           # Testaa jokainen aktiivinen yhteys
omniroute reset-password               # Nollaa pääkäyttäjän salasana
omniroute logs                         # Suoratoista pyyntöjen lokit
omniroute health                       # Yksityiskohtainen terveys (katkaisijat, välimuisti, muisti)
omniroute --version                    # Tulosta versio
omniroute --help                       # Näytä kaikki komennot
```

### Asetukset & Alustus

```bash
omniroute setup                        # Interaktiivinen asennusvelho
omniroute setup --non-interactive      # CI/automaatio-tila (lukee ympäristömuuttujat + liput)
omniroute setup --password '<value>'   # Aseta pääkäyttäjän salasana suoraan
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Lisää ja testaa tarjoaja yhdellä kertaa
```

Tunnetut ympäristömuuttujat ei-interaktiiviselle asennukselle:

| Var                 | Tarkoitus                                                           |
| ------------------- | ------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Tarjoajan API-avain (sidottu `--api-key` kautta Commander `.env()`) |
| `DATA_DIR`          | Korvata OmniRoute-datakansio                                        |

Kaikki muut ei-interaktiiviset syötteet annetaan lippuina, ei ympäristömuuttujina:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(katso `omniroute setup` vaihtoehdot yllä).

### Diagnostiikka

```bash
omniroute doctor                       # Tarkista konfiguraatio, DB, portit, ajonaika, muisti, elinkyky
omniroute doctor --json                # Koneellisesti luettava JSON
omniroute doctor --no-liveness         # Ohita HTTP-terveysmittaus
omniroute doctor --host 0.0.0.0        # Korvata elinkykyisäntä
omniroute doctor --liveness-url <url>  # Täydellinen terveys päätepisteen URL-korvaus
```

Lääkäri suorittaa nämä tarkistukset: `Konfiguraatio`, `Tietokanta`, `Tallennus/salaus`,
`Portin saatavuus`, `Solmun ajonaika`, `Natiivi binaari` (better-sqlite3),
`Muisti`, ja `Palvelimen elinkyky`. Se poistuu ei-nollana, jos jokin tarkistus epäonnistuu.

### Tarjoajan Hallinta

```bash
omniroute providers available                       # OmniRoute tarjoajaluettelo
omniroute providers available --search openai       # Suodata luetteloa id/nimi/alias/kategoria mukaan
omniroute providers available --category api-key    # Suodata kategorian mukaan (api-key, oauth, ilmainen, ...)
omniroute providers available --json                # Koneellisesti luettava JSON

omniroute providers list                            # Määritetyt tarjoajayhteydet
omniroute providers list --json

omniroute providers test <id|name>                  # Testaa yksi määritetty yhteys
omniroute providers test-all                        # Testaa jokainen aktiivinen yhteys
omniroute providers validate                        # Vain paikallinen rakenteellinen validointi
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Olemassa oleva OAuth-virta
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` ovat API-ensimmäisiä ja toimivat siten
aktiivisen paikallisen tai etäyhteyden kanssa. Todennustiedot tulisi syöttää
`--credential-stdin` tai `--credential-env`; `--dry-run --json` raportoi vain
peitetyn läsnäolon/muodon. `providers available` lukee OmniRoute-luetteloa;
`providers list/test/test-all/validate` säilyttävät paikallisen SQLite-käyttäytymisen ja
eivät vaadi palvelimen olevan käynnissä.

### Palautus & Nollaus

```bash
omniroute reset-password                # Nollaa pääkäyttäjän salasana (myös: omniroute-reset-password)
omniroute reset-encrypted-columns       # Näytä varoitus + dry-run salattujen todennustietojen nollaukselle
omniroute reset-encrypted-columns --force  # Poista salatut todennustiedot SQLite:ssä
```

### Todennustietojen Vienti (⚠ käsittele varoen)

```bash
omniroute auth export                                 # Näytä varoitus + vahvistusportti — ei DB-pääsyä
omniroute auth export --force                          # Vie KAIKKIEN yhteyksien SALATTU todennustiedot stdout:iin JSON-muodossa
omniroute auth export --force --id <id>                 # Vie vain vastaava yhteys
omniroute auth export --force --format env               # Tuota OMNIROUTE_<PROVIDER>_<FIELD>=<value> rivejä
omniroute auth export --force --out creds.json           # Kirjoita tiedostoon (luodaan 0600-oikeuksilla)
```

`auth export` on **vain paikallinen** (suora SQLite-luku, ei HTTP-reitti) ja tarkoituksellisesti tulostaa/kirjoittaa
**selkokielisiä** `apiKey`/`accessToken`/`refreshToken`/`idToken` arvoja — se on ominaisuus, ei
vika. Mitään ei lueta tietokannasta, eikä mitään salata, ilman `--force`. Stderr
varoitusbanneri tulostuu aina ennen kuin mitään selkokielistä tulostuu. Vaatii `STORAGE_ENCRYPTION_KEY` asettamista. Kenttä, joka epäonnistuu salauksen purkamisessa (vanha avain, vioittunut salaus) raportoidaan
`<field>DecryptFailed: true` sen sijaan, että koko vienti keskeytettäisiin tai vuotaisi taustalla olevaa virhettä.

### Muut alakomennot

Nämä olettavat käynnissä olevan OmniRoute-palvelimen, ellei toisin mainita:

```bash
omniroute status                       # Kattava ajonaikainen tila
omniroute logs                         # Suoratoista pyyntöjen lokit (--json, --search, --follow)
omniroute config show                  # Näytä nykyinen konfiguraatio

omniroute provider list                # Listaa saatavilla olevat tarjoajat (alias tarjoajien listalle)
omniroute provider add                 # Rekisteröi OmniRoute tarjoajana työkalussa
omniroute keys add | list | remove     # Hallitse API-avaimia
omniroute models [provider]            # Listaa mallit (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Ota konfiguraation + DB varmuuskopio
omniroute restore                      # Palauta aiemmasta varmuuskopiosta

omniroute health                       # Yksityiskohtainen terveys (katkaisijat, välimuisti, muisti)
omniroute quota                        # Tarjoajan kiintiön käyttö
omniroute cache                        # Välimuistin tila
omniroute cache clear                  # Tyhjennä semanttiset + allekirjoitusvälimuistit

omniroute mcp status | restart         # MCP-palvelimen tila / uudelleenkäynnistys
omniroute a2a status | card            # A2A-palvelimen tila / agenttikortti

omniroute tunnel list | create | stop  # Hallitse tunneleita (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Tarkastele / aseta ympäristömuuttujia (tilapäisesti)

omniroute test                         # Tarjoajan yhteys testaus
omniroute update                       # Tarkista päivitykset
omniroute completion                   # Generoi shell-täydennys
```

### Yleiset liput

| Lippu               | Kuvaus                                                        |
| ------------------- | ------------------------------------------------------------- |
| `--no-open`         | Älä avaa selainta automaattisesti käynnistyksen yhteydessä    |
| `--port <n>`        | Korvata API-portti (oletus 20128)                             |
| `--mcp`             | Toimi MCP-palvelimena stdio:n yli (IDE:ille)                  |
| `--non-interactive` | CI-tila (ei kehotteita; lukee ympäristöstä/lipuista)          |
| `--json`            | Koneellisesti luettava JSON-tuloste (lääkäri, tarjoajat jne.) |
| `--help`, `-h`      | Näytä komento-kohtainen apu                                   |
| `--version`, `-v`   | Tulosta asennettu versio                                      |

---

## Saatavilla olevat API-päätepisteet

| Päätepiste                 | Kuvaus                        | Käyttötarkoitus                               |
| -------------------------- | ----------------------------- | --------------------------------------------- |
| `/v1/chat/completions`     | Vakio chat (kaikki tarjoajat) | Kaikki modernit työkalut                      |
| `/v1/responses`            | Vastaus-API (OpenAI-muoto)    | Codex, agenttiset työnkulut                   |
| `/v1/completions`          | Vanha tekstin täydentäminen   | Vanhemmat työkalut, jotka käyttävät `prompt:` |
| `/v1/embeddings`           | Tekstin upotukset             | RAG, haku                                     |
| `/v1/images/generations`   | Kuvagenerointi                | GPT-Image, Flux, jne.                         |
| `/v1/audio/speech`         | Tekstistä puheeksi            | ElevenLabs, OpenAI TTS                        |
| `/v1/audio/transcriptions` | Puheesta tekstiksi            | Deepgram, AssemblyAI                          |

Valmiit esimerkit tokenisoidulla OmniRoute-URL-osoitteella:

```txt
Token esimerkki: sk-a3ab3c080beaee3a-69f4a4-070d71af

Vakio OpenAI perus: http://localhost:20128/v1
VS Code mallit: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code vastaukset: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama tagit: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Vianetsintä

| Virhe                                               | Syynä                               | Korjaus                                                |
| --------------------------------------------------- | ----------------------------------- | ------------------------------------------------------ |
| `Connection refused`                                | OmniRoute ei käynnissä              | `omniroute serve`                                      |
| `401 Unauthorized`                                  | Väärä API-avain                     | Tarkista `/dashboard/api-manager`                      |
| `No combo configured`                               | Ei aktiivista reitityskombinaatiota | Aseta `/dashboard/combos`                              |
| CLI näyttää "not installed"                         | Binääri ei PATHissa                 | Tarkista `which <command>`                             |
| Dashboard näyttää "not detected" asennuksen jälkeen | Välimuisti vanhentunut              | Napsauta "⟳ Päivitä havaitseminen" dashboardissa       |
| Vanha linkki `/dashboard/cli-tools`                 | Ennen v3.8.6 kirjanmerkki           | Ohjataan automaattisesti `/dashboard/cli-code` (308)   |
| Vanha linkki `/dashboard/agents`                    | Ennen v3.8.6 kirjanmerkki           | Ohjataan automaattisesti `/dashboard/acp-agents` (308) |
