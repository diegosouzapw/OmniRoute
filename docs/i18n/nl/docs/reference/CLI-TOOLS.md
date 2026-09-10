# CLI-TOOLS (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI Tools — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Tools — OmniRoute

Laatst bijgewerkt: 2026-08-18

OmniRoute integreert met drie categorieën CLI-tools verspreid over drie speciale dashboardpagina's:

| Pagina         | Route                   | Concept                                                                       | Aantal       |
| -------------- | ----------------------- | ----------------------------------------------------------------------------- | ------------ |
| **CLI Code's** | `/dashboard/cli-code`   | Coderingstools die je op OmniRoute wijst (Klant → CLI → OmniRoute → Provider) | 26           |
| **CLI Agents** | `/dashboard/cli-agents` | Autonome agents die je op OmniRoute wijst (zelfde stroom, bredere reikwijdte) | 8            |
| **ACP Agents** | `/dashboard/acp-agents` | CLIs die OmniRoute als backend genereert via stdio/ACP (omgekeerde stroom)    | zie register |

Legacy-routes worden omgeleid via 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Hoe Het Werkt

```
CLI Code's / CLI Agents (consumptiestroom):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (alle wijzen naar OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute routeert naar de juiste provider)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agents (omgekeerde generatie stroom):
    Klantverzoek → OmniRoute → genereert CLI via stdio/ACP → reactie
```

**Voordelen:**

- Eén API-sleutel om alle tools te beheren
- Kostenregistratie over alle CLIs in het dashboard
- Modelwisseling zonder elke tool opnieuw te configureren
- Werkt lokaal en op externe servers (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Auto-configureren met `setup-*`

Je hoeft de configuratie van elke tool niet met de hand te schrijven. OmniRoute levert een `setup-*`
commando per ondersteunde CLI dat de **live** modelcatalogus leest van een draaiende
OmniRoute (lokaal of extern) en de eigen configuratie van de tool op jouw machine schrijft:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Elke accepteert `--remote <url> --api-key <key>` (configureer een lokale tool tegen een
externe OmniRoute), `--dry-run` (preview zonder te schrijven), en `--port`. Tools
zonder model auto-detectie (Cline, Kilo, Roo, Goose, Aider, Qwen) nemen
`--model <id>` (en `--yes` voor niet-interactieve uitvoeringen). Om een CLI te starten met de
juiste omgeving geïnjecteerd en helemaal geen configuratie geschreven, gebruik de generieke
`omniroute run <target>` launcher (claude, codex, aider, goose, opencode, qwen,
gemini — targets en aliassen komen uit `bin/cli/cli-manifest.mjs`); de legacy
per-tool launchers `omniroute launch` (Claude Code) en `omniroute launch-codex`
(Codex) blijven beschikbaar. Gemini CLI is alleen voor lancering: het is een `omniroute run`
doel maar heeft geen `setup-*`/`configure` recept.

> **Volledige referentie:** de mastertabel — wat elk commando schrijft, elke vlag,
> lokaal versus extern, en welke tools een `/v1` suffix willen — bevindt zich in
> **[CLI Integraties](../guides/CLI-INTEGRATIONS.md)**.

### Deze binnen een container uitvoeren

Een `setup-*` commando dat binnen de OmniRoute-container wordt uitgevoerd, schrijft in de
eigen home van de container, die geen host CLI leest en die verdwijnt met de
container. OmniRoute detecteert dat en verlaat met `2` met instructies in plaats van
te schrijven. Twee ondersteunde manieren om verder te gaan — installeer de CLI op de host en
`omniroute connect` naar de container, of bind-mount de configuratiemap en stel
`CLI_CONFIG_HOME` in (het compose `host` profiel). Elke `setup-*` commando, plus
`omniroute configure` en `omniroute config set`, accepteert
`--allow-container-write` wanneer het configureren van de eigen CLIs van de container is wat je
eigenlijk bedoelde; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` doet hetzelfde voor
de server. Zie
[Docker Gids → Configureren van host CLI-tools](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

De **apply endpoint** van het dashboard (`POST /api/cli-tools/apply`) handhaaft dezelfde
beveiliging: in een container, een schrijfopdracht waarvan het doel niet bind-mounted is van de
host, antwoordt met **`422`** met `containerEphemeralTarget: true`, de veilige fouttekst en — voor de tools met een hostrecept (claude, codex, opencode, cline,
kilo, continue) — een `hostSetupCommand` (bijv. `omniroute setup-opencode`) om
op de host in plaats daarvan uit te voeren; er wordt niets geschreven. `dryRun: true` blijft werken in container
modus en retourneert de gegenereerde inhoud + doelpad zonder de schijf aan te raken, zodat
je een preview kunt bekijken vanuit het dashboard en op de host kunt toepassen. Dit gedrag is
opzettelijk en regressiebeveiligd door
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — "fix" nooit een 422
door de beveiliging te verwijderen.

---

## Bron van Waarheid

De verenigde catalogus bevindt zich in `src/shared/constants/cliTools.ts` als `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Elke invoer heeft deze velden (gedefinieerd in `src/shared/schemas/cliCatalog.ts`):

| Veld                                            | Type                                                         | Beschrijving                                                                 |
| ----------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Op welke pagina de tool verschijnt                                           |
| `vendor`                                        | `string`                                                     | Oorsprong van de tool ("Anthropic", "OSS (P. Gauthier)")                     |
| `acpSpawnable`                                  | `boolean`                                                    | Ook bruikbaar als een ACP Agent (badge weergegeven)                          |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Ondersteuningsniveau voor aangepaste eindpunten. `"none"` = MITM achterstand |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Configuratiemechanisme                                                       |
| `id`, `name`, `color`, `description`, `docsUrl` | standaard                                                    | Kernweergavevelden                                                           |

Invoeren met `baseUrlSupport: "none"` worden **niet weergegeven** op de dashboardpagina's — ze zijn geregistreerd in de MITM achterstand voor plan 11 (zie `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Capaciteit niveaus (gecatalogiseerd × detecteerbaar × configureerbaar × uitvoerbaar)

Niet elke gecatalogiseerde tool is detecteerbaar, configureerbaar of uitvoerbaar. Elk niveau heeft één
verklarende bron, en een drift test houdt ze in lijn:

| Niveau              | Betekenis                                                                       | Verklaard in                                                        |
| ------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Gecatalogiseerd** | Verschijnt in de dashboardcatalogus (naam, leverancier, docs, configuratietype) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                    |
| **Detecteerbaar**   | Detectie van binaire/configuratie, gezondheidscontroles, configuratiepaden      | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalogus) |
| **Configureerbaar** | Ondersteund door `omniroute configure <cli>` (setuprecept bestaat)              | `bin/cli/cli-manifest.mjs` (`configure: true`)                      |
| **Uitvoerbaar**     | Ondersteund door `omniroute run <target>` (env/args injectie gedefinieerd)      | `bin/cli/cli-manifest.mjs` (`run: true`)                            |

`bin/cli/cli-manifest.mjs` is het canonieke uitvoerbare manifest voor de CLI-opdrachten
oppervlakken: `run`, `configure` en de shell-completion generators halen allemaal hun
doellijsten, aliasresolutie (bijvoorbeeld `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
en `--model` vlag bedrading daaruit. De driftbewaker
`tests/unit/cli/cli-manifest-drift.test.ts` bevestigt dat het manifest, de runtime
catalogus, de UI-catalogus en elk consumentoppervlak in sync blijven — een doel dat aan
één oppervlak is toegevoegd zonder de anderen, faalt de suite in plaats van stilletjes te driften.

## 1. CLI Code's Catalog (26 tools)

Alle tools die verschijnen in `/dashboard/cli-code`. Degenen met `baseUrlSupport: none` zijn verbonden via MITM of een handmatige gids in plaats van een aangepaste basis-URL:

| id           | naam                    | leverancier         | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ----------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code             | Anthropic           | full           | env            | true         |
| codex        | OpenAI Codex CLI        | OpenAI              | full           | custom         | true         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                | none           | custom         | false        |
| cline        | Cline                   | OSS (ex-Claude Dev) | full           | custom         | true         |
| kilo         | Kilo Code               | Kilo-Org            | full           | custom         | false        |
| roo          | Roo Code                | Roo (OSS)           | full           | guide          | false        |
| continue     | Continue                | continue.dev        | full           | guide          | false        |
| aider        | Aider                   | OSS (P. Gauthier)   | full           | guide          | true         |
| forge        | ForgeCode               | Antinomy HQ         | full           | custom         | true         |
| jcode        | jcode                   | 1jehuang (OSS)      | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)   | full           | custom         | false        |
| codewhale    | CodeWhale               | Hmbown (OSS)        | full           | custom         | false        |
| opencode     | OpenCode                | Anomaly (ex-SST)    | full           | guide          | true         |
| droid        | Factory Droid           | Factory AI          | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI      | GitHub/MS           | full           | custom         | false        |
| cursor-cli   | Cursor CLI              | Anysphere           | partial        | guide          | true         |
| smelt        | Smelt                   | leonardcser (OSS)   | full           | custom         | false        |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)    | full           | custom         | false        |
| grok-build   | Grok Build              | xAI                 | full           | custom         | false        |
| crush        | Crush                   | OSS (Charm)         | full           | custom         | false        |
| qwen         | Qwen Code               | Alibaba             | full           | guide          | true         |
| cursor       | Cursor                  | Anysphere           | none           | guide          | false        |
| antigravity  | Antigravity             | Google              | none           | mitm           | false        |
| hermes       | Hermes                  | Nous Research       | none           | guide          | false        |
| kiro         | Kiro AI                 | Amazon              | none           | mitm           | false        |
| custom       | Custom CLI              | —                   | full           | custom-builder | false        |

Tools met `baseUrlSupport: "partial"` tonen een badge "⚠ Basis-URL gedeeltelijk" in de dashboardkaart.

## 2. CLI Agents Catalog (8 tools)

Autonome agents die verschijnen in `/dashboard/cli-agents`:

| id           | naam             | leverancier              | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | volledig       | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | volledig       | true         |
| goose        | Goose            | Block / Linux Foundation | volledig       | true         |
| interpreter  | Open Interpreter | OSS                      | volledig       | true         |
| warp         | Warp AI          | Warp Inc.                | gedeeltelijk   | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | volledig       | false        |
| omp          | Oh My Pi         | OSS                      | volledig       | true         |
| letta        | Letta CLI        | Letta                    | volledig       | false        |

---

## 3. ACP Agents (/dashboard/acp-agents)

Deze pagina (hernoemd van `/dashboard/agents`) toont CLIs die OmniRoute kan **spawn** als backend uitvoeringsengines via stdio/ACP-protocol. De catalogus wordt afzonderlijk onderhouden in `src/lib/acp/registry.ts` en is **niet** hetzelfde als `CLI_TOOLS`.

---

## 4. MITM Backlog (niet weergegeven in dashboard)

De volgende CLIs ondersteunen niet standaard een aangepaste basis-URL en zijn **niet vermeld** op de pagina's van CLI Code of CLI Agents. Ze zijn kandidaten voor MITM onderschepping in plan 11:

| CLI                 | Reden                                                         |
| ------------------- | ------------------------------------------------------------- |
| windsurf            | BYOK beperkt tot selecte Claude-modellen + bedrijfs-URL/token |
| amp                 | Gesloten ecosysteem (Sourcegraph)                             |
| amazon-q / kiro-cli | AWS SSO-auth, geen aangepaste URL                             |
| cowork              | Anthropic Desktop, geen configureerbaar eindpunt              |

Zie `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` voor de volledige kruisverwijzing.

---

## 5. Batch Detection API

Alle tooldetectie wordt geaggregeerd via een enkel eindpunt:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (zelfde als andere `/api/cli-tools/` routes)
- Retourneert: `Record<toolId, ToolBatchStatus>` (type: `src/shared/types/cliBatchStatus.ts`)
- Strategie: `Promise.all` over alle tools, 5s time-out per tool
- Cache: in-memory LRU geïndexeerd op configuratiebestand `mtime`. Cache ongeldig gemaakt wanneer mtime verandert. Reset bij serverherstart.

Reactievorm per tool:

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
    status: "geconfigureerd" | "niet_geconfigureerd" | "niet_geïnstalleerd" | "onbekend" | "ander";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // gesaneerd, geen stacktraces
}
```

## 6. Instellingen Handlers voor Nieuwe Tools

Nieuwe tools met `configType: "custom"` hebben speciale instellingen API-routes:

| Route                                       | Tool                                                                        |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                                     |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url vlag)                                                     |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                                      |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primaire + legacy `~/.deepseek` synchronisatie) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                       |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                             |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                       |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + speciale `.env` sleutel)               |

Alle routes gebruiken `sanitizeErrorMessage()` voor foutreacties (Harde Regel #12).

---

## 7. Architectuur van Dashboard Pagina's

### CLI Code's (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — servercomponent
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — client grid
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — tool detailpagina
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 gespecialiseerde toolkaarten + `ToolDetailClient.tsx`

### CLI Agents (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — servercomponent
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — client grid
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — hergebruikt `ToolDetailClient`

### ACP Agents (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — servercomponent (verplaatst van `agents/`)

### Gedeelde UI Componenten (`src/shared/components/cli/`)

| Bestand                 | Doel                                                    |
| ----------------------- | ------------------------------------------------------- |
| `CliToolCard.tsx`       | Slimme statuskaart (detectie + configuratie + eindpunt) |
| `CliConceptCard.tsx`    | Uitlegkaart per pagina over concepten                   |
| `CliComparisonCard.tsx` | Drie-koloms vergelijking tussen CLI-typen               |
| `BaseUrlSelect.tsx`     | Eindpunt dropdown (Lokaal/Wolk/Aangepast)               |
| `ApiKeySelect.tsx`      | API-sleutelselector                                     |
| `ManualConfigModal.tsx` | Modal voor kopieerbare configuratiesnippet              |

### Gedeelde Hook (`src/shared/hooks/cli/`)

| Bestand                   | Doel                                                                |
| ------------------------- | ------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Haalt `/api/cli-tools/all-statuses` op, beheert laad-/verversstatus |

## 8. i18n

Nieuwe namespaces toegevoegd in plan 14 F9:

| Namespace   | Doel                                                                              |
| ----------- | --------------------------------------------------------------------------------- |
| `cliCommon` | Gedeelde strings (kaartlabels, concept/vergelijkingsteksten, detailpagina labels) |
| `cliCode`   | Strings op de pagina van CLI Code                                                 |
| `cliAgents` | Strings op de pagina van CLI Agents                                               |
| `acpAgents` | Strings op de pagina van ACP Agents                                               |

Volledige PT-BR en EN vertalingen zijn beschikbaar. 39 andere locales vallen automatisch terug op EN via namespace-niveau samenvoegen in `src/i18n/request.ts`.

---

## 9. Snelle Start

### Stap 1 — Verkrijg een OmniRoute API-sleutel

1. Open `/dashboard/api-manager` → **API-sleutel maken**
2. Geef het een naam (bijv. `cli-tools`) en selecteer alle machtigingen
3. Kopieer de sleutel — je hebt deze nodig voor elke CLI hieronder

> Je sleutel ziet eruit als: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Stap 2 — Installeer CLI-tools

Alle npm-gebaseerde tools vereisen Node.js 22.22.2+ of 24.x:

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

# Google Gemini CLI (startbaar via `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Rust-gebaseerd

# Pi coding agent
# zie https://github.com/zechnerj/pi-coding-agent voor installatie

# jcode
# zie https://github.com/1jehuang/jcode voor installatie
```

---

### Stap 3 — Configureer via Dashboard

1. Ga naar `http://localhost:20128/dashboard/cli-code`
2. Zoek je tool in het raster
3. Klik op de kaart om de detailpagina van de tool te openen
4. Selecteer je API-sleutel en basis-URL
5. Klik op **Toepassen Configuratie** of kopieer de handmatige configuratiesnippet

---

### Stap 4 — Stel Globale Omgevingsvariabelen In

```bash
# OmniRoute Universele Eindpunt
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI leest GOOGLE_GEMINI_BASE_URL op de ROOT (zijn SDK voegt /v1beta/... zelf toe)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Voor een **remote server** vervang `localhost:20128` door het server-IP of domein,
> bijv. `http://<your-server-ip>:20128`.

---

### Stap 4 — Configureer Elke Tool

#### Claude Code

```bash
# Maak ~/.claude/settings.json aan:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Gebruik de verenigde Anthropic gateway root voor Claude Code. Voeg hier geen `/v1` aan toe.

**Test:** `claude "say hello"`

---

#### OpenAI Codex

Moderne Codex (v0.137+) leest alleen `~/.codex/config.toml` — de oude
`config.yaml` behoort tot de legacy npm CLI en wordt stilletjes genegeerd. De API
sleutel blijft in de `OMNIROUTE_API_KEY` omgevingsvariabele (`env_key`), nooit
binnen het bestand:

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

Volledige referentie (profielen, `wire_api`, contextvensters): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Test:** `codex "what is 2+2?"`

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

**Test:** `opencode`

> Gebruik `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> om denkvarianten te verzenden.

---

#### Cline (CLI of VS Code)

**CLI-modus:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code-modus:**
Cline extensie-instellingen → API-provider: `OpenAI Compatible` → Basis-URL: `http://localhost:20128/v1`

Of gebruik het OmniRoute-dashboard → **CLI Tools → Cline → Toepassen Configuratie**.

---

#### KiloCode (CLI of VS Code)

**CLI-modus:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code-instellingen:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Of gebruik het OmniRoute-dashboard → **CLI Tools → KiloCode → Toepassen Configuratie**.

---

#### Continue (VS Code-extensie)

Bewerk `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Herstart VS Code na het bewerken.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Gebruik dit wanneer VS Code Insiders is geconfigureerd voor aangepaste eindpuntmodellen en je wilt dat OmniRoute werkt zonder een aangepast headerveld.

**Aanbevolen locatie:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Voorbeeld met de getokeniseerde OmniRoute-alias:**

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

**Opmerkingen:**

- Vervang `sk-your-omniroute-key` door een API-sleutel die in OmniRoute is aangemaakt.
- Het `url`-veld moet wijzen naar `/api/v1/vscode/{token}/chat/completions`.
- Het `modelsUrl`-veld moet wijzen naar `/api/v1/vscode/{token}/models`.
- Geef de voorkeur aan de normale `/v1` + Bearer header flow wanneer de client aangepaste headers ondersteunt.
- URL-ingebedde tokens zijn een compatibiliteitsval en kunnen in editorlogs of proxygeschiedenis verschijnen.

---

#### Kiro CLI (Amazon)

```bash
# Log in op je AWS/Kiro-account:
kiro-cli login

# De CLI gebruikt zijn eigen authenticatie — OmniRoute is niet nodig als backend voor Kiro CLI zelf.
# Gebruik kiro-cli naast OmniRoute voor andere tools.
kiro-cli status
```

Voor de **Kiro IDE** desktopapp, gebruik de MITM-eindpunt die door OmniRoute wordt blootgesteld
onder `/dashboard/cli-tools → Kiro`.

---

## 10. Interne OmniRoute CLI

De `omniroute` binaire biedt commando's voor serverlevenscyclus, setup, diagnostiek en providerbeheer. Toegangspunt: `bin/omniroute.mjs`.

```bash
omniroute                              # Start server (standaard poort 20128)
omniroute setup                        # Interactieve setup wizard
omniroute doctor                       # Controleer config, DB, poorten, runtime
omniroute providers list               # Geconfigureerde providerverbindingen
omniroute providers test-all           # Test elke actieve verbinding
omniroute reset-password               # Reset het admin wachtwoord
omniroute logs                         # Stream aanvraaglogs
omniroute health                       # Gedetailleerde gezondheid (breakers, cache, geheugen)
omniroute --version                    # Print versie
omniroute --help                       # Toon alle commando's
```

### Setup & Initialisatie

```bash
omniroute setup                        # Interactieve setup wizard
omniroute setup --non-interactive      # CI/automatiseringsmodus (leest omgevingsvariabelen + vlaggen)
omniroute setup --password '<value>'   # Stel admin wachtwoord direct in
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Voeg een provider toe en test deze in één keer
```

Erkende omgevingsvariabelen voor niet-interactieve setup:

| Var                 | Doel                                                                   |
| ------------------- | ---------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Provider API-sleutel (gebonden aan `--api-key` via Commander `.env()`) |
| `DATA_DIR`          | Overschrijf de OmniRoute gegevensmap                                   |

Alle andere niet-interactieve invoer wordt doorgegeven als vlaggen, niet als omgevingsvariabelen:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(zie de `omniroute setup` opties hierboven).

### Diagnostiek

```bash
omniroute doctor                       # Controleer config, DB, poorten, runtime, geheugen, levensvatbaarheid
omniroute doctor --json                # Machine-leesbare JSON
omniroute doctor --no-liveness         # Sla de HTTP gezondheidscontrole over
omniroute doctor --host 0.0.0.0        # Overschrijf levensvatbaarheid host
omniroute doctor --liveness-url <url>  # Volledige gezondheids-eindpunt URL overschrijven
```

De doctor voert deze controles uit: `Config`, `Database`, `Opslag/encryptie`,
`Poortbeschikbaarheid`, `Node runtime`, `Native binaire` (better-sqlite3),
`Geheugen`, en `Server levensvatbaarheid`. Het verlaat met een niet-nul waarde als een controle `faalt`.

### Providerbeheer

```bash
omniroute providers available                       # OmniRoute provider catalogus
omniroute providers available --search openai       # Filter catalogus op id/naam/alias/categorie
omniroute providers available --category api-key    # Filter op categorie (api-key, oauth, gratis, ...)
omniroute providers available --json                # Machine-leesbare JSON

omniroute providers list                            # Geconfigureerde providerverbindingen
omniroute providers list --json

omniroute providers test <id|name>                  # Test één geconfigureerde verbinding
omniroute providers test-all                        # Test elke actieve verbinding
omniroute providers validate                        # Lokale structurele validatie
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Bestaande OAuth-stroom
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` zijn API-eerst en werken daarom tegen
de actieve lokale of externe context. Invoer van referenties moet gebruik maken van
`--credential-stdin` of `--credential-env`; `--dry-run --json` rapporteert alleen
geredigeerde aanwezigheid/vorm. `providers available` leest de OmniRoute catalogus;
`providers list/test/test-all/validate` behouden hun lokale SQLite gedrag en
vereisen niet dat de server draait.

### Herstel & Reset

```bash
omniroute reset-password                # Reset het admin wachtwoord (ook: omniroute-reset-password)
omniroute reset-encrypted-columns       # Toon waarschuwing + dry-run voor reset van versleutelde referenties
omniroute reset-encrypted-columns --force  # Maak daadwerkelijk versleutelde referenties in SQLite null
```

### Credential Export (⚠ voorzichtig mee omgaan)

```bash
omniroute auth export                                 # Toon waarschuwing + bevestigingspoort — geen DB-toegang
omniroute auth export --force                          # Exporteer ALLE verbindingen' ONVERSLEUTELDE referenties naar stdout als JSON
omniroute auth export --force --id <id>                 # Exporteer alleen de bijbehorende verbinding
omniroute auth export --force --format env               # Geef OMNIROUTE_<PROVIDER>_<FIELD>=<value> regels uit
omniroute auth export --force --out creds.json           # Schrijf naar een bestand (gemaakt met 0600 machtigingen)
```

`auth export` is **lokaal alleen** (directe SQLite-lees, geen HTTP-route) en print/schrijft opzettelijk
**platte tekst** `apiKey`/`accessToken`/`refreshToken`/`idToken` waarden — dat is de functie, geen
fout. Er wordt niets uit de database gelezen, en er wordt niets ontsleuteld, zonder `--force`. Een stderr
waarschuwing banner wordt altijd afgedrukt voordat er enige platte tekst wordt uitgegeven. Vereist dat `STORAGE_ENCRYPTION_KEY`
is ingesteld. Een veld dat niet kan worden ontsleuteld (verlopen sleutel, corrupte ciphertext) wordt gerapporteerd als
`<field>DecryptFailed: true` in plaats van de hele export te beëindigen of de onderliggende fout te lekken.

### Andere subcommando's

Deze gaan uit van een draaiende OmniRoute-server, tenzij anders vermeld:

```bash
omniroute status                       # Uitgebreide runtime status
omniroute logs                         # Stream aanvraaglogs (--json, --search, --follow)
omniroute config show                  # Toon huidige configuratie

omniroute provider list                # Lijst beschikbare providers (alias van providers list)
omniroute provider add                 # Registreer OmniRoute als een provider op een tool
omniroute keys add | list | remove     # Beheer API-sleutels
omniroute models [provider]            # Lijst modellen (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Snapshot config + DB
omniroute restore                      # Herstel van een eerdere snapshot

omniroute health                       # Gedetailleerde gezondheid (breakers, cache, geheugen)
omniroute quota                        # Gebruik van providerquota
omniroute cache                        # Cache-status
omniroute cache clear                  # Wis semantische + handtekening caches

omniroute mcp status | restart         # MCP serverstatus / herstart
omniroute a2a status | card            # A2A serverstatus / agentkaart

omniroute tunnel list | create | stop  # Beheer tunnels (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Inspecteer / stel omgevingsvariabelen in (tijdelijk)

omniroute test                         # Provider connectiviteit rooktest
omniroute update                       # Controleer op updates
omniroute completion                   # Genereer shell voltooiing
```

### Veelvoorkomende vlaggen

| Vlag                | Beschrijving                                            |
| ------------------- | ------------------------------------------------------- |
| `--no-open`         | Open de browser niet automatisch bij het starten        |
| `--port <n>`        | Overschrijf de API-poort (standaard 20128)              |
| `--mcp`             | Draai als MCP-server over stdio (voor IDE's)            |
| `--non-interactive` | CI-modus (geen prompts; leest van env/vlaggen)          |
| `--json`            | Machine-leesbare JSON-uitvoer (doctor, providers, enz.) |
| `--help`, `-h`      | Toon commando-specifieke hulp                           |
| `--version`, `-v`   | Print de geïnstalleerde versie                          |

## Beschikbare API-eindpunten

| Eindpunt                   | Beschrijving                    | Gebruik Voor                         |
| -------------------------- | ------------------------------- | ------------------------------------ |
| `/v1/chat/completions`     | Standaard chat (alle providers) | Alle moderne tools                   |
| `/v1/responses`            | Responses API (OpenAI-formaat)  | Codex, agentische workflows          |
| `/v1/completions`          | Legacy tekstcompleties          | Oudere tools die `prompt:` gebruiken |
| `/v1/embeddings`           | Tekstembeddings                 | RAG, zoeken                          |
| `/v1/images/generations`   | Beeldgeneratie                  | GPT-Image, Flux, enz.                |
| `/v1/audio/speech`         | Tekst-naar-spraak               | ElevenLabs, OpenAI TTS               |
| `/v1/audio/transcriptions` | Spraak-naar-tekst               | Deepgram, AssemblyAI                 |

Klaar-om-te-plakken voorbeelden met een getokeniseerde OmniRoute URL:

```txt
Token voorbeeld: sk-a3ab3c080beaee3a-69f4a4-070d71af

Standaard OpenAI basis: http://localhost:20128/v1
VS Code modellen: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code responses: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama tags: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Probleemoplossing

| Fout                                          | Oorzaak                   | Oplossing                                               |
| --------------------------------------------- | ------------------------- | ------------------------------------------------------- |
| `Connection refused`                          | OmniRoute draait niet     | `omniroute serve`                                       |
| `401 Unauthorized`                            | Onjuiste API-sleutel      | Controleer in `/dashboard/api-manager`                  |
| `No combo configured`                         | Geen actieve routingcombo | Stel in op `/dashboard/combos`                          |
| CLI toont "not installed"                     | Binary niet in PATH       | Controleer `which <command>`                            |
| Dashboard toont "not detected" na installatie | Cache verouderd           | Klik op "⟳ Vernieuw detectie" in dashboard              |
| Oude link `/dashboard/cli-tools`              | Pre-v3.8.6 bladwijzer     | Automatisch omgeleid naar `/dashboard/cli-code` (308)   |
| Oude link `/dashboard/agents`                 | Pre-v3.8.6 bladwijzer     | Automatisch omgeleid naar `/dashboard/acp-agents` (308) |
