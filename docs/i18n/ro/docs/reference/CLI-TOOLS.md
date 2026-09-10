# CLI-TOOLS (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI Tools — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Tools — OmniRoute

Ultima actualizare: 2026-08-18

OmniRoute se integrează cu trei categorii de instrumente CLI distribuite pe trei pagini dedicate în tablou:

| Pagină         | Rută                    | Concept                                                                                           | Număr          |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------- | -------------- |
| **CLI Code's** | `/dashboard/cli-code`   | Instrumente de codare pe care le îndreptați către OmniRoute (Client → CLI → OmniRoute → Provider) | 26             |
| **CLI Agents** | `/dashboard/cli-agents` | Agenți autonomi pe care le îndreptați către OmniRoute (aceeași flux, domeniu mai larg)            | 8              |
| **ACP Agents** | `/dashboard/acp-agents` | CLI-uri pe care OmniRoute le generează ca backend prin stdio/ACP (flux invers)                    | vezi registrul |

Rutele vechi redirecționează prin 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Cum Funcționează

```
CLI Code's / CLI Agents (flux de consum):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (toate indică către OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute direcționează către providerul corect)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agents (flux de generare invers):
    Cerere client → OmniRoute → generează CLI prin stdio/ACP → răspuns
```

**Beneficii:**

- O cheie API pentru a gestiona toate instrumentele
- Urmărirea costurilor pe toate CLI-urile din tablou
- Schimbarea modelului fără a reconfigura fiecare instrument
- Funcționează local și pe servere remote (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Configurare automată cu `setup-*`

Nu trebuie să scrieți manual configurația fiecărui instrument. OmniRoute oferă un `setup-*`
comandă pentru fiecare CLI suportat care citește catalogul de modele **live** de la un
OmniRoute în funcțiune (local sau remote) și scrie configurația proprie a instrumentului pe mașina dumneavoastră:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Fiecare acceptă `--remote <url> --api-key <key>` (configurează un instrument local împotriva unui
OmniRoute remote), `--dry-run` (previzualizare fără a scrie), și `--port`. Instrumentele
fără descoperire automată a modelului (Cline, Kilo, Roo, Goose, Aider, Qwen) necesită
`--model <id>` (și `--yes` pentru execuții non-interactive). Pentru a lansa un CLI cu
variabila de mediu corect injectată și fără a scrie deloc configurația, folosiți generic
`omniroute run <target>` launcher (claude, codex, aider, goose, opencode, qwen,
gemini — țintele și aliasurile provin din `bin/cli/cli-manifest.mjs`); launcher-urile vechi
per-instrument `omniroute launch` (Claude Code) și `omniroute launch-codex`
(Codex) rămân disponibile. CLI-ul Gemini este doar pentru lansare: este un `omniroute run`
țintă dar nu are rețetă `setup-*`/`configure`.

> **Referință completă:** tabelul principal — ce scrie fiecare comandă, fiecare flag,
> local vs remote, și care instrumente necesită un sufix `/v1` — se află în
> **[CLI Integrations](../guides/CLI-INTEGRATIONS.md)**.

### Rularea acestora într-un container

O comandă `setup-*` executată în interiorul containerului OmniRoute scrie în
home-ul propriu al containerului, pe care niciun CLI gazdă nu îl citește și care dispare odată cu
containerul. OmniRoute detectează acest lucru și iese cu `2` cu instrucțiuni în loc să scrie. Două moduri suportate de a continua — instalați CLI-ul pe gazdă și
`omniroute connect` la container, sau montați direct directoarele de configurare și setați
`CLI_CONFIG_HOME` (profilul gazdă al compose-ului). Fiecare comandă `setup-*`, plus
`omniroute configure` și `omniroute config set`, acceptă
`--allow-container-write` atunci când configurați CLI-urile proprii ale containerului, ceea ce ați
vrut de fapt; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` face același lucru pentru
server. Consultați
[Docker Guide → Configurarea instrumentelor CLI gazdă](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

Endpoint-ul de **aplicare** al tabloului (`POST /api/cli-tools/apply`) impune
aceleași restricții: într-un container, o scriere a cărei țintă nu este montată direct de la
gazdă răspunde **`422`** cu `containerEphemeralTarget: true`, textul de eroare sigur și — pentru instrumentele cu o rețetă gazdă (claude, codex, opencode, cline,
kilo, continue) — un `hostSetupCommand` (de exemplu, `omniroute setup-opencode`) care să fie rulat
pe gazdă în schimb; nimic nu este scris. `dryRun: true` continuă să funcționeze în modul
container și returnează conținutul generat + calea țintă fără a atinge discul, astfel
încât să puteți previzualiza din tablou și aplica pe gazdă. Acest comportament este
intenționat și protejat împotriva regresiilor de
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — nu "reparați" niciodată un 422
prin eliminarea restricției.

---

## Sursa de Adevăr

Catalogul unificat se află în `src/shared/constants/cliTools.ts` ca `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Fiecare intrare are aceste câmpuri (definite în `src/shared/schemas/cliCatalog.ts`):

| Câmp                                            | Tip                                                          | Descriere                                                             |
| ----------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Pe ce pagină apare instrumentul                                       |
| `vendor`                                        | `string`                                                     | Originea instrumentului ("Anthropic", "OSS (P. Gauthier)")            |
| `acpSpawnable`                                  | `boolean`                                                    | De asemenea, utilizabil ca Agent ACP (badge afișat)                   |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Nivel de suport pentru endpoint personalizat. `"none"` = backlog MITM |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Mecanism de configurare                                               |
| `id`, `name`, `color`, `description`, `docsUrl` | standard                                                     | Câmpuri de afișare de bază                                            |

Intrările cu `baseUrlSupport: "none"` **nu sunt afișate** pe paginile tabloului de bord — ele sunt înregistrate în backlog-ul MITM pentru planul 11 (vezi `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Niveluri de capacitate (catalogate × detectabile × configurabile × lansabile)

Nu fiecare instrument catalogat este detectabil, configurabil sau lansabil. Fiecare nivel are o sursă declarativă, iar un test de derapaj le menține aliniate:

| Nivel            | Semnificație                                                                            | Declarație în                                                       |
| ---------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Catalogat**    | Apare în catalogul tabloului de bord (nume, furnizor, documentație, tip de configurare) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                    |
| **Detectabil**   | Detectarea binarului/configurației, verificări de sănătate, căi de configurare          | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` catalog de rulare) |
| **Configurabil** | Suportat de `omniroute configure <cli>` (rețetă de configurare existentă)               | `bin/cli/cli-manifest.mjs` (`configure: true`)                      |
| **Lansabil**     | Suportat de `omniroute run <target>` (injectare env/args definită)                      | `bin/cli/cli-manifest.mjs` (`run: true`)                            |

`bin/cli/cli-manifest.mjs` este manifestul executabil canonic pentru comenzile CLI: `run`, `configure` și generatoarele de completare a shell-ului își derivă toate listele de ținte, rezolvarea aliasurilor (de exemplu `kilocode`/`kilo-code`/`kilo_cli` → `kilo`) și conectarea flag-ului `--model` din acesta. Gardianul de derapaj `tests/unit/cli/cli-manifest-drift.test.ts` afirmă că manifestul, catalogul de rulare, catalogul UI și fiecare suprafață de consumator rămân sincronizate — o țintă adăugată pe o suprafață fără celelalte va face ca suitei să eșueze în loc să derapeze în tăcere.

## 1. Catalogul Codului CLI (26 unelte)

Toate uneltele care apar în `/dashboard/cli-code`. Cele cu `baseUrlSupport: none` sunt conectate prin MITM sau un ghid manual în loc de un URL de bază personalizat:

| id           | nume                       | furnizor            | suportBaseUrl | tipConfig                | acpSpawnable |
| ------------ | -------------------------- | ------------------- | ------------- | ------------------------ | ------------ |
| claude       | Claude Code                | Anthropic           | complet       | env                      | true         |
| codex        | OpenAI Codex CLI           | OpenAI              | complet       | personalizat             | true         |
| zcode        | ZCode (Plan de Codare GLM) | Z.ai                | niciun        | personalizat             | false        |
| cline        | Cline                      | OSS (ex-Claude Dev) | complet       | personalizat             | true         |
| kilo         | Kilo Code                  | Kilo-Org            | complet       | personalizat             | false        |
| roo          | Roo Code                   | Roo (OSS)           | complet       | ghid                     | false        |
| continue     | Continue                   | continue.dev        | complet       | ghid                     | false        |
| aider        | Aider                      | OSS (P. Gauthier)   | complet       | ghid                     | true         |
| forge        | ForgeCode                  | Antinomy HQ         | complet       | personalizat             | true         |
| jcode        | jcode                      | 1jehuang (OSS)      | complet       | personalizat             | false        |
| deepseek-tui | DeepSeek TUI               | Hunter Bown (OSS)   | complet       | personalizat             | false        |
| codewhale    | CodeWhale                  | Hmbown (OSS)        | complet       | personalizat             | false        |
| opencode     | OpenCode                   | Anomaly (ex-SST)    | complet       | ghid                     | true         |
| droid        | Factory Droid              | Factory AI          | parțial       | ghid                     | false        |
| copilot      | GitHub Copilot CLI         | GitHub/MS           | complet       | personalizat             | false        |
| cursor-cli   | Cursor CLI                 | Anysphere           | parțial       | ghid                     | true         |
| smelt        | Smelt                      | leonardcser (OSS)   | complet       | personalizat             | false        |
| pi           | Pi (pi-coding-agent)       | M. Zechner (OSS)    | complet       | personalizat             | false        |
| grok-build   | Grok Build                 | xAI                 | complet       | personalizat             | false        |
| crush        | Crush                      | OSS (Charm)         | complet       | personalizat             | false        |
| qwen         | Qwen Code                  | Alibaba             | complet       | ghid                     | true         |
| cursor       | Cursor                     | Anysphere           | niciun        | ghid                     | false        |
| antigravity  | Antigravity                | Google              | niciun        | mitm                     | false        |
| hermes       | Hermes                     | Nous Research       | niciun        | ghid                     | false        |
| kiro         | Kiro AI                    | Amazon              | niciun        | mitm                     | false        |
| custom       | Custom CLI                 | —                   | complet       | constructor-personalizat | false        |

Uneltele cu `baseUrlSupport: "partial"` afișează un badge "⚠ URL de bază parțial" în cardul de pe tabloul de bord.
---

## 2. Catalogul Agenților CLI (8 unelte)

Agenți autonomi care apar în `/dashboard/cli-agents`:

| id           | nume             | furnizor                 | suportBaseUrl | acpSpawnable |
| ------------ | ---------------- | ------------------------ | ------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | complet       | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | complet       | true         |
| goose        | Goose            | Block / Linux Foundation | complet       | true         |
| interpreter  | Open Interpreter | OSS                      | complet       | true         |
| warp         | Warp AI          | Warp Inc.                | parțial       | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | complet       | false        |
| omp          | Oh My Pi         | OSS                      | complet       | true         |
| letta        | Letta CLI        | Letta                    | complet       | false        |

---

## 3. Agenți ACP (/dashboard/acp-agents)

Această pagină (renumită din `/dashboard/agents`) arată CLI-urile pe care OmniRoute le poate **spawn** ca motoare de execuție backend prin protocolul stdio/ACP. Catalogul este întreținut separat în `src/lib/acp/registry.ts` și **nu** este același cu `CLI_TOOLS`.

---

## 4. Backlog MITM (neafișat în dashboard)

Următoarele CLI-uri nu suportă nativ URL de bază personalizat și **nu sunt listate** în paginile Codului CLI sau Agenților CLI. Ele sunt candidați pentru interceptarea MITM în planul 11:

| CLI                 | Motiv                                                              |
| ------------------- | ------------------------------------------------------------------ |
| windsurf            | BYOK limitat la selectarea modelelor Claude + URL/token corporativ |
| amp                 | Ecosistem închis (Sourcegraph)                                     |
| amazon-q / kiro-cli | Autentificare AWS SSO, fără URL personalizat                       |
| cowork              | Anthropic Desktop, fără punct de finalizare configurabil           |

Vezi `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` pentru referința completă.

---

## 5. API de Detectare Batch

Toată detectarea uneltelor este agregată printr-un singur endpoint:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (la fel ca celelalte rute `/api/cli-tools/`)
- Returnează: `Record<toolId, ToolBatchStatus>` (tip: `src/shared/types/cliBatchStatus.ts`)
- Strategie: `Promise.all` pentru toate uneltele, timeout de 5s per unealtă
- Cache: în memorie LRU indexat după fișierul de configurare `mtime`. Cache invalidat când mtime se schimbă. Resetat la repornirea serverului.

Forma răspunsului per unealtă:

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
  error?: string; // sanitizat, fără stack traces
}
```

## 6. Handleri de Setări pentru Instrumente Noi

Instrumentele noi cu `configType: "custom"` au rute dedicate API pentru setări:

| Rută                                        | Instrument                                                       |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Agent de codare Pi                                               |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + cheie dedicată `.env`)      |

Toate rutele folosesc `sanitizeErrorMessage()` pentru răspunsurile de eroare (Regulă Strictă #12).

---

## 7. Arhitectura Paginilor Dashboard

### Cod CLI (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — componentă server
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — grid client
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — pagină de detalii a instrumentului
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 carduri specializate pentru instrumente + `ToolDetailClient.tsx`

### Agenți CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — componentă server
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — grid client
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — reutilizează `ToolDetailClient`

### Agenți ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — componentă server (mutată din `agents/`)

### Componente UI Partajate (`src/shared/components/cli/`)

| Fișier                  | Scop                                                         |
| ----------------------- | ------------------------------------------------------------ |
| `CliToolCard.tsx`       | Card de stare inteligent (detecție + configurare + endpoint) |
| `CliConceptCard.tsx`    | Card de explicație a conceptului pe pagină                   |
| `CliComparisonCard.tsx` | Comparare pe trei coloane între tipurile CLI                 |
| `BaseUrlSelect.tsx`     | Dropdown pentru endpoint (Local/Cloud/Custom)                |
| `ApiKeySelect.tsx`      | Selector pentru cheia API                                    |
| `ManualConfigModal.tsx` | Modal pentru snippet de configurare copiat                   |

### Hook Partajat (`src/shared/hooks/cli/`)

| Fișier                    | Scop                                                                          |
| ------------------------- | ----------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Obține `/api/cli-tools/all-statuses`, gestionează starea de încărcare/refresh |

## 8. i18n

Namespace-uri noi adăugate în planul 14 F9:

| Namespace   | Scop                                                                                   |
| ----------- | -------------------------------------------------------------------------------------- |
| `cliCommon` | Șiruri partajate (etichetă carduri, texte concept/comparație, etichete pagină detaliu) |
| `cliCode`   | Șiruri pagină CLI Code                                                                 |
| `cliAgents` | Șiruri pagină CLI Agents                                                               |
| `acpAgents` | Șiruri pagină ACP Agents                                                               |

Traduceri complete în PT-BR și EN sunt furnizate. 39 de alte locale revin automat la EN printr-o fuziune la nivel de namespace în `src/i18n/request.ts`.

---

## 9. Începere rapidă

### Pasul 1 — Obțineți o cheie API OmniRoute

1. Deschideți `/dashboard/api-manager` → **Creează cheie API**
2. Oferiți-i un nume (de exemplu, `cli-tools`) și selectați toate permisiunile
3. Copiați cheia — veți avea nevoie de ea pentru fiecare CLI de mai jos

> Cheia dumneavoastră arată astfel: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Pasul 2 — Instalați uneltele CLI

Toate uneltele bazate pe npm necesită Node.js 22.22.2+ sau 24.x:

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

# Google Gemini CLI (lansabil prin `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # bazat pe Rust

# Agent de codare Pi
# vezi https://github.com/zechnerj/pi-coding-agent pentru instalare

# jcode
# vezi https://github.com/1jehuang/jcode pentru instalare
```

---

### Pasul 3 — Configurați prin Dashboard

1. Accesați `http://localhost:20128/dashboard/cli-code`
2. Găsiți uneltele în grilă
3. Faceți clic pe card pentru a deschide pagina de detalii a uneltei
4. Selectați cheia API și URL-ul de bază
5. Faceți clic pe **Aplică Configurația** sau copiați fragmentul de configurație manual

---

### Pasul 4 — Setați variabilele de mediu globale

```bash
# Punct de acces universal OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI citește GOOGLE_GEMINI_BASE_URL la RĂDĂCINĂ (SDK-ul său adaugă /v1beta/... singur)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Pentru un **server remote** înlocuiți `localhost:20128` cu IP-ul sau domeniul serverului,
> de exemplu, `http://<your-server-ip>:20128`.

---

### Pasul 4 — Configurați fiecare unealtă

#### Claude Code

```bash
# Creați ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Utilizați rădăcina unificată a gateway-ului Anthropic pentru Claude Code. Nu adăugați `/v1` aici.

**Test:** `claude "say hello"`

---

#### OpenAI Codex

Codex modern (v0.137+) citește doar `~/.codex/config.toml` — vechiul
`config.yaml` aparține CLI-ului npm legacy și este ignorat în tăcere. Cheia API
rămâne în variabila de mediu `OMNIROUTE_API_KEY` (`env_key`), niciodată
în interiorul fișierului:

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

Referință completă (profiluri, `wire_api`, feronete de context): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

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

> Utilizați `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> pentru a trimite variante de gândire.

---

#### Cline (CLI sau VS Code)

**Mod CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Mod VS Code:**
Setările extensiei Cline → Furnizor API: `OpenAI Compatible` → URL de bază: `http://localhost:20128/v1`

Sau utilizați dashboard-ul OmniRoute → **CLI Tools → Cline → Aplică Configurația**.

---

#### KiloCode (CLI sau VS Code)

**Mod CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Setări VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Sau utilizați dashboard-ul OmniRoute → **CLI Tools → KiloCode → Aplică Configurația**.

---

#### Continue (Extensie VS Code)

Editați `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Reporniti VS Code după editare.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Utilizați acest lucru când VS Code Insiders este configurat pentru modele de puncte finale personalizate și doriți ca OmniRoute să funcționeze fără un câmp de antet personalizat.

**Locație recomandată:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Exemplu folosind aliasul tokenizat OmniRoute:**

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

**Note:**

- Înlocuiți `sk-your-omniroute-key` cu o cheie API creată în OmniRoute.
- Câmpul `url` ar trebui să indice către `/api/v1/vscode/{token}/chat/completions`.
- Câmpul `modelsUrl` ar trebui să indice către `/api/v1/vscode/{token}/models`.
- Preferiți fluxul normal `/v1` + antet Bearer atunci când clientul suportă antete personalizate.
- Tokenurile încorporate în URL sunt o soluție de compatibilitate și pot apărea în jurnalele editorului sau în istoricul proxy-ului.

---

#### Kiro CLI (Amazon)

```bash
# Autentificare în contul dvs. AWS/Kiro:
kiro-cli login

# CLI-ul folosește propria sa autentificare — OmniRoute nu este necesar ca backend pentru Kiro CLI în sine.
# Utilizați kiro-cli împreună cu OmniRoute pentru alte unelte.
kiro-cli status
```

Pentru aplicația desktop **Kiro IDE**, utilizați punctul de acces MITM expus de OmniRoute
sub `/dashboard/cli-tools → Kiro`.

---

## 10. CLI Intern OmniRoute

Binary-ul `omniroute` oferă comenzi pentru ciclul de viață al serverului, configurare, diagnosticare și gestionarea furnizorilor. Punct de intrare: `bin/omniroute.mjs`.

```bash
omniroute                              # Pornește serverul (port implicit 20128)
omniroute setup                        # Asistent interactiv de configurare
omniroute doctor                       # Verifică configurația, DB, porturi, rulare
omniroute providers list               # Conexiuni de furnizor configurate
omniroute providers test-all           # Testează fiecare conexiune activă
omniroute reset-password               # Resetează parola admin
omniroute logs                         # Flux de jurnale de cereri
omniroute health                       # Sănătate detaliată (disjunctoare, cache, memorie)
omniroute --version                    # Afișează versiunea
omniroute --help                       # Afișează toate comenzile
```

### Configurare & Inițializare

```bash
omniroute setup                        # Asistent interactiv de configurare
omniroute setup --non-interactive      # Mod CI/automatizare (citește variabile de mediu + flag-uri)
omniroute setup --password '<value>'   # Setează parola admin direct
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Adaugă și testează un furnizor dintr-o dată
```

Variabilele de mediu recunoscute pentru configurarea non-interactivă:

| Var                 | Scop                                                                     |
| ------------------- | ------------------------------------------------------------------------ |
| `OMNIROUTE_API_KEY` | Cheia API a furnizorului (legată de `--api-key` prin `.env()` Commander) |
| `DATA_DIR`          | Suprascrie directorul de date OmniRoute                                  |

Toate celelalte intrări non-interactive sunt transmise ca flag-uri, nu variabile de mediu:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(vezi opțiunile `omniroute setup` de mai sus).

### Diagnosticare

```bash
omniroute doctor                       # Verifică configurația, DB, porturi, rulare, memorie, vitalitate
omniroute doctor --json                # JSON citibil de mașină
omniroute doctor --no-liveness         # Sare peste proba de sănătate HTTP
omniroute doctor --host 0.0.0.0        # Suprascrie gazda de vitalitate
omniroute doctor --liveness-url <url>  # Suprascriere completă a URL-ului endpoint-ului de sănătate
```

Doctorul rulează aceste verificări: `Config`, `Database`, `Storage/encryption`,
`Disponibilitatea portului`, `Rularea nodului`, `Binary nativ` (better-sqlite3),
`Memorie`, și `Vitalitatea serverului`. Iese cu un cod non-zero dacă vreo verificare este `fail`.

### Gestionarea Furnizorilor

```bash
omniroute providers available                       # Catalogul furnizorilor OmniRoute
omniroute providers available --search openai       # Filtrează catalogul după id/nume/alias/categorie
omniroute providers available --category api-key    # Filtrează după categorie (api-key, oauth, gratuit, ...)
omniroute providers available --json                # JSON citibil de mașină

omniroute providers list                            # Conexiuni de furnizor configurate
omniroute providers list --json

omniroute providers test <id|name>                  # Testează o conexiune configurată
omniroute providers test-all                        # Testează fiecare conexiune activă
omniroute providers validate                        # Validare structurală locală
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Flux OAuth existent
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` sunt API-first și, prin urmare, funcționează împotriva
contextului local sau la distanță activ. Introducerea acreditivelor ar trebui să folosească
`--credential-stdin` sau `--credential-env`; `--dry-run --json` raportează doar
prezența/forma redactată. `providers available` citește catalogul OmniRoute;
`providers list/test/test-all/validate` își păstrează comportamentul local SQLite și
nu necesită ca serverul să fie pornit.

### Recuperare & Resetare

```bash
omniroute reset-password                # Resetează parola admin (de asemenea: omniroute-reset-password)
omniroute reset-encrypted-columns       # Afișează avertisment + dry-run pentru resetarea acreditivelor criptate
omniroute reset-encrypted-columns --force  # De fapt, anulează acreditivele criptate în SQLite
```

### Export de Acreditive (⚠ manipulați cu grijă)

```bash
omniroute auth export                                 # Afișează avertisment + poartă de confirmare — fără acces la DB
omniroute auth export --force                          # Exportă TOATE acreditivele DECRIPTATE ale conexiunilor în stdout ca JSON
omniroute auth export --force --id <id>                 # Exportă doar conexiunea corespunzătoare
omniroute auth export --force --format env               # Emite linii OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Scrie într-un fișier (creat cu permisiuni 0600)
```

`auth export` este **local-only** (citire directă SQLite, fără rută HTTP) și intenționat imprimă/scrie
valori **plaintext** `apiKey`/`accessToken`/`refreshToken`/`idToken` — aceasta este caracteristica, nu o
eroare. Nimic nu este citit din baza de date și nimic nu este decriptat, fără `--force`. O banner de avertizare stderr
se imprimă întotdeauna înainte ca orice plaintext să fie emis. Necesită ca `STORAGE_ENCRYPTION_KEY` să
fie setat. Un câmp care nu reușește să decripteze (cheie învechită, text criptat corupt) este raportat ca
`<field>DecryptFailed: true` în loc să oprească întregul export sau să scurgă eroarea de bază.

### Alte subcomenzi

Acestea presupun un server OmniRoute în funcțiune, cu excepția cazului în care se menționează altfel:

```bash
omniroute status                       # Stare cuprinzătoare a rulării
omniroute logs                         # Flux de jurnale de cereri (--json, --search, --follow)
omniroute config show                  # Afișează configurația curentă

omniroute provider list                # Listează furnizorii disponibili (alias pentru providers list)
omniroute provider add                 # Înregistrează OmniRoute ca furnizor pe un instrument
omniroute keys add | list | remove     # Gestionează cheile API
omniroute models [provider]            # Listează modelele (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Instantanee configurație + DB
omniroute restore                      # Restaurează dintr-o instantanee anterioară

omniroute health                       # Sănătate detaliată (disjunctoare, cache, memorie)
omniroute quota                        # Utilizarea cotei furnizorului
omniroute cache                        # Starea cache-ului
omniroute cache clear                  # Șterge cache-urile semantice + semnături

omniroute mcp status | restart         # Starea serverului MCP / repornire
omniroute a2a status | card            # Starea serverului A2A / card agent

omniroute tunnel list | create | stop  # Gestionează tunelurile (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Inspectează / setează variabilele de mediu (temporar)

omniroute test                         # Test de conectivitate a furnizorului
omniroute update                       # Verifică actualizările
omniroute completion                   # Generează completarea shell-ului
```

### Flag-uri comune

| Flag                | Descriere                                               |
| ------------------- | ------------------------------------------------------- |
| `--no-open`         | Nu deschide automat browserul la pornire                |
| `--port <n>`        | Suprascrie portul API (implicit 20128)                  |
| `--mcp`             | Rulează ca server MCP prin stdio (pentru IDE-uri)       |
| `--non-interactive` | Mod CI (fără prompturi; citește din mediu/flag-uri)     |
| `--json`            | Iesire JSON citibil de mașină (doctor, providers, etc.) |
| `--help`, `-h`      | Afișează ajutor specific pentru comandă                 |
| `--version`, `-v`   | Afișează versiunea instalată                            |

---

## Endpoint-uri API disponibile

| Endpoint                   | Descriere                             | Utilizare                                     |
| -------------------------- | ------------------------------------- | --------------------------------------------- |
| `/v1/chat/completions`     | Chat standard (toți furnizorii)       | Toate instrumentele moderne                   |
| `/v1/responses`            | API pentru răspunsuri (format OpenAI) | Codex, fluxuri agentice                       |
| `/v1/completions`          | Completări text vechi                 | Instrumente mai vechi care folosesc `prompt:` |
| `/v1/embeddings`           | Încapsulări text                      | RAG, căutare                                  |
| `/v1/images/generations`   | Generare imagini                      | GPT-Image, Flux, etc.                         |
| `/v1/audio/speech`         | Text-to-speech                        | ElevenLabs, OpenAI TTS                        |
| `/v1/audio/transcriptions` | Speech-to-text                        | Deepgram, AssemblyAI                          |

Exemple gata de lipit cu un URL tokenizat OmniRoute:

```txt
Exemplu token: sk-a3ab3c080beaee3a-69f4a4-070d71af

Baza standard OpenAI: http://localhost:20128/v1
Modele VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Chat VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Răspunsuri VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Etichete Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Chat Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Depanare

| Eroare                                        | Cauză                        | Soluție                                                   |
| --------------------------------------------- | ---------------------------- | --------------------------------------------------------- |
| `Connection refused`                          | OmniRoute nu rulează         | `omniroute serve`                                         |
| `401 Unauthorized`                            | Cheie API greșită            | Verifică în `/dashboard/api-manager`                      |
| `No combo configured`                         | Niciun combo de rutare activ | Configurează în `/dashboard/combos`                       |
| CLI arată "not installed"                     | Binariul nu este în PATH     | Verifică `which <command>`                                |
| Dashboard arată "not detected" după instalare | Cache vechi                  | Fă clic pe "⟳ Refresh detection" în dashboard             |
| Link vechi `/dashboard/cli-tools`             | Marcaj pre-v3.8.6            | Redirecționat automat către `/dashboard/cli-code` (308)   |
| Link vechi `/dashboard/agents`                | Marcaj pre-v3.8.6            | Redirecționat automat către `/dashboard/acp-agents` (308) |
