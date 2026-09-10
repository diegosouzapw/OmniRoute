# CLI-TOOLS (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "Strumenti CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Strumenti CLI — OmniRoute

Ultimo aggiornamento: 2026-08-18

OmniRoute si integra con tre categorie di strumenti CLI distribuiti su tre pagine di dashboard dedicate:

| Pagina         | Percorso                | Concetto                                                                          | Conteggio     |
| -------------- | ----------------------- | --------------------------------------------------------------------------------- | ------------- |
| **CLI Code's** | `/dashboard/cli-code`   | Strumenti di codifica che punti a OmniRoute (Client → CLI → OmniRoute → Provider) | 26            |
| **CLI Agents** | `/dashboard/cli-agents` | Agenti autonomi che punti a OmniRoute (stesso flusso, ambito più ampio)           | 8             |
| **ACP Agents** | `/dashboard/acp-agents` | CLI che OmniRoute genera come backend tramite stdio/ACP (flusso inverso)          | vedi registro |

I percorsi legacy reindirizzano tramite 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Come Funziona

```
CLI Code's / CLI Agents (flusso di consumo):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (tutti puntano a OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute instrada al provider giusto)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agents (flusso di generazione inverso):
    Richiesta del client → OmniRoute → genera CLI tramite stdio/ACP → risposta
```

**Vantaggi:**

- Una chiave API per gestire tutti gli strumenti
- Monitoraggio dei costi su tutte le CLI nella dashboard
- Cambio di modello senza riconfigurare ogni strumento
- Funziona localmente e su server remoti (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Configurazione automatica con `setup-*`

Non è necessario scrivere a mano la configurazione di ogni strumento. OmniRoute fornisce un comando `setup-*`
per ogni CLI supportata che legge il catalogo di modelli **live** da un OmniRoute in esecuzione
(locale o remoto) e scrive la configurazione dello strumento sulla tua macchina:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Ognuno accetta `--remote <url> --api-key <key>` (configura uno strumento locale contro un
OmniRoute remoto), `--dry-run` (anteprima senza scrivere), e `--port`. Gli strumenti
senza auto-scoperta del modello (Cline, Kilo, Roo, Goose, Aider, Qwen) richiedono
`--model <id>` (e `--yes` per esecuzioni non interattive). Per avviare una CLI con
l'ambiente corretto iniettato e senza alcuna configurazione scritta, utilizza il generico
lanciatore `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — i target e gli alias provengono da `bin/cli/cli-manifest.mjs`); i lanciatori
legacy per ogni strumento `omniroute launch` (Claude Code) e `omniroute launch-codex`
(Codex) rimangono disponibili. La CLI di Gemini è solo per il lancio: è un target di
`omniroute run` ma non ha ricetta `setup-*`/`configure`.

> **Riferimento completo:** la tabella principale — cosa scrive ogni comando, ogni flag,
> locale vs remoto, e quali strumenti richiedono un suffisso `/v1` — si trova in
> **[Integrazioni CLI](../guides/CLI-INTEGRATIONS.md)**.

### Esecuzione di questi all'interno di un contenitore

Un comando `setup-*` eseguito all'interno del contenitore OmniRoute scrive nella
home del contenitore stesso, che nessuna CLI host legge e che scompare con il
contenitore. OmniRoute rileva ciò e termina con `2` fornendo istruzioni piuttosto che
scrivere. Due modi supportati per procedere: installare la CLI sull'host e
`omniroute connect` al contenitore, oppure montare in binding le directory di configurazione e impostare
`CLI_CONFIG_HOME` (il profilo `host` di compose). Ogni comando `setup-*`, più
`omniroute configure` e `omniroute config set`, accetta
`--allow-container-write` quando configurare le CLI del contenitore è ciò che intendevi;
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` fa lo stesso per il server. Vedi
[Guida Docker → Configurazione degli strumenti CLI host](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

L'**endpoint di applicazione** della dashboard (`POST /api/cli-tools/apply`) applica la
stessa protezione: in un contenitore, una scrittura il cui target non è montato in binding dall'
host risponde **`422`** con `containerEphemeralTarget: true`, il testo di errore sicuro e — per gli strumenti con una ricetta host (claude, codex, opencode, cline,
kilo, continue) — un `hostSetupCommand` (ad esempio `omniroute setup-opencode`) da eseguire
sull'host invece; nulla viene scritto. `dryRun: true` continua a funzionare in modalità contenitore
e restituisce il contenuto generato + il percorso target senza toccare il disco, quindi
puoi visualizzare dalla dashboard e applicare sull'host. Questo comportamento è
intenzionale e protetto da regressione da
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — non "correggere" mai un 422
rimuovendo la protezione.

---

## Fonte di Verità

Il catalogo unificato si trova in `src/shared/constants/cliTools.ts` come `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Ogni voce ha questi campi (definiti in `src/shared/schemas/cliCatalog.ts`):

| Campo                                           | Tipo                                                         | Descrizione                                                              |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `category`                                      | `"code" \| "agent"`                                          | In quale pagina appare lo strumento                                      |
| `vendor`                                        | `string`                                                     | Origine dello strumento ("Anthropic", "OSS (P. Gauthier)")               |
| `acpSpawnable`                                  | `boolean`                                                    | Utilizzabile anche come ACP Agent (badge mostrato)                       |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Livello di supporto per endpoint personalizzati. `"none"` = backlog MITM |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Meccanismo di configurazione                                             |
| `id`, `name`, `color`, `description`, `docsUrl` | standard                                                     | Campi di visualizzazione principali                                      |

Le voci con `baseUrlSupport: "none"` **non vengono mostrate** nelle pagine del dashboard — sono registrate nel backlog MITM per il piano 11 (vedi `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Livelli di capacità (catalogati × rilevabili × configurabili × avviabili)

Non tutti gli strumenti catalogati sono rilevabili, configurabili o avviabili. Ogni livello ha una
fonte dichiarativa, e un test di drift li mantiene allineati:

| Livello           | Significato                                                                                 | Dichiarato in                                                     |
| ----------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Catalogato**    | Appare nel catalogo del dashboard (nome, fornitore, documentazione, tipo di configurazione) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Rilevabile**    | Rilevamento binario/configurazione, controlli di salute, percorsi di configurazione         | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **Configurabile** | Supportato da `omniroute configure <cli>` (esiste una ricetta di configurazione)            | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Avviabile**     | Supportato da `omniroute run <target>` (iniezione di env/args definita)                     | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` è il manifesto eseguibile canonico per i comandi CLI
superfici: `run`, `configure` e i generatori di completamento della shell derivano tutti le loro
liste di destinazione, risoluzione degli alias (ad esempio `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
e wiring del flag `--model` da esso. Il guardiano del drift
`tests/unit/cli/cli-manifest-drift.test.ts` afferma che il manifesto, il catalogo runtime,
il catalogo UI e ogni superficie consumatrice rimangano sincronizzati — una destinazione aggiunta
a una superficie senza le altre fa fallire il suite invece di driftare silenziosamente.

## 1. Catalogo del Codice CLI (26 strumenti)

Tutti gli strumenti che appaiono in `/dashboard/cli-code`. Quelli con `baseUrlSupport: none` sono collegati tramite MITM o una guida manuale invece di un URL di base personalizzato:

| id           | nome                          | fornitore           | supportoBaseUrl | tipoConfig     | acpSpawnable |
| ------------ | ----------------------------- | ------------------- | --------------- | -------------- | ------------ |
| claude       | Claude Code                   | Anthropic           | completo        | env            | true         |
| codex        | OpenAI Codex CLI              | OpenAI              | completo        | custom         | true         |
| zcode        | ZCode (Piano di Codifica GLM) | Z.ai                | nessuno         | custom         | false        |
| cline        | Cline                         | OSS (ex-Claude Dev) | completo        | custom         | true         |
| kilo         | Kilo Code                     | Kilo-Org            | completo        | custom         | false        |
| roo          | Roo Code                      | Roo (OSS)           | completo        | guida          | false        |
| continue     | Continue                      | continue.dev        | completo        | guida          | false        |
| aider        | Aider                         | OSS (P. Gauthier)   | completo        | guida          | true         |
| forge        | ForgeCode                     | Antinomy HQ         | completo        | custom         | true         |
| jcode        | jcode                         | 1jehuang (OSS)      | completo        | custom         | false        |
| deepseek-tui | DeepSeek TUI                  | Hunter Bown (OSS)   | completo        | custom         | false        |
| codewhale    | CodeWhale                     | Hmbown (OSS)        | completo        | custom         | false        |
| opencode     | OpenCode                      | Anomaly (ex-SST)    | completo        | guida          | true         |
| droid        | Factory Droid                 | Factory AI          | parziale        | guida          | false        |
| copilot      | GitHub Copilot CLI            | GitHub/MS           | completo        | custom         | false        |
| cursor-cli   | Cursor CLI                    | Anysphere           | parziale        | guida          | true         |
| smelt        | Smelt                         | leonardcser (OSS)   | completo        | custom         | false        |
| pi           | Pi (pi-coding-agent)          | M. Zechner (OSS)    | completo        | custom         | false        |
| grok-build   | Grok Build                    | xAI                 | completo        | custom         | false        |
| crush        | Crush                         | OSS (Charm)         | completo        | custom         | false        |
| qwen         | Qwen Code                     | Alibaba             | completo        | guida          | true         |
| cursor       | Cursor                        | Anysphere           | nessuno         | guida          | false        |
| antigravity  | Antigravity                   | Google              | nessuno         | mitm           | false        |
| hermes       | Hermes                        | Nous Research       | nessuno         | guida          | false        |
| kiro         | Kiro AI                       | Amazon              | nessuno         | mitm           | false        |
| custom       | Custom CLI                    | —                   | completo        | custom-builder | false        |

Gli strumenti con `baseUrlSupport: "parziale"` mostrano un badge "⚠ Base URL parziale" nella scheda del dashboard.

## 2. Catalogo degli Agenti CLI (8 strumenti)

Agenti autonomi che appaiono in `/dashboard/cli-agents`:

| id           | nome             | fornitore                | supportoBaseUrl | acpSpawnable |
| ------------ | ---------------- | ------------------------ | --------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | completo        | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | completo        | true         |
| goose        | Goose            | Block / Linux Foundation | completo        | true         |
| interpreter  | Open Interpreter | OSS                      | completo        | true         |
| warp         | Warp AI          | Warp Inc.                | parziale        | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | completo        | false        |
| omp          | Oh My Pi         | OSS                      | completo        | true         |
| letta        | Letta CLI        | Letta                    | completo        | false        |

---

## 3. Agenti ACP (/dashboard/acp-agents)

Questa pagina (rinominata da `/dashboard/agents`) mostra le CLI che OmniRoute può **generare** come motori di esecuzione backend tramite il protocollo stdio/ACP. Il catalogo è mantenuto separatamente in `src/lib/acp/registry.ts` e **non** è lo stesso di `CLI_TOOLS`.

---

## 4. Backlog MITM (non mostrato nel dashboard)

Le seguenti CLI non supportano nativamente URL base personalizzati e **non sono elencate** nelle pagine di CLI Code o CLI Agents. Sono candidati per l'intercettazione MITM nel piano 11:

| CLI                 | Motivo                                                           |
| ------------------- | ---------------------------------------------------------------- |
| windsurf            | BYOK limitato a selezionati modelli Claude + URL/token aziendale |
| amp                 | Ecosistema chiuso (Sourcegraph)                                  |
| amazon-q / kiro-cli | Autenticazione AWS SSO, nessun URL personalizzato                |
| cowork              | Anthropic Desktop, nessun endpoint configurabile                 |

Vedi `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` per il riferimento incrociato completo.

---

## 5. API di Rilevamento Batch

Tutti i rilevamenti degli strumenti sono aggregati tramite un singolo endpoint:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (stesso delle altre rotte `/api/cli-tools/`)
- Restituisce: `Record<toolId, ToolBatchStatus>` (tipo: `src/shared/types/cliBatchStatus.ts`)
- Strategia: `Promise.all` su tutti gli strumenti, timeout di 5s per strumento
- Cache: in memoria LRU indicizzata dal file di configurazione `mtime`. Cache invalidata quando mtime cambia. Ripristinata al riavvio del server.

Forma della risposta per strumento:

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
  error?: string; // sanitizzato, nessun trace dello stack
}
```

## 6. Gestori delle Impostazioni per Nuovi Strumenti

I nuovi strumenti con `configType: "custom"` hanno percorsi API di impostazioni dedicati:

| Percorso                                    | Strumento                                                        |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Agente di codifica Pi                                            |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + chiave `.env` dedicata)     |

Tutti i percorsi utilizzano `sanitizeErrorMessage()` per le risposte di errore (Regola Ferrea #12).

---

## 7. Architettura delle Pagine del Dashboard

### Codice CLI (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — componente server
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — griglia client
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — pagina di dettaglio dello strumento
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 schede di strumenti specializzati + `ToolDetailClient.tsx`

### Agenti CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — componente server
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — griglia client
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — riutilizza `ToolDetailClient`

### Agenti ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — componente server (spostato da `agents/`)

### Componenti UI Condivisi (`src/shared/components/cli/`)

| File                    | Scopo                                                                  |
| ----------------------- | ---------------------------------------------------------------------- |
| `CliToolCard.tsx`       | Scheda di stato intelligente (rilevamento + configurazione + endpoint) |
| `CliConceptCard.tsx`    | Scheda di spiegazione del concetto per pagina                          |
| `CliComparisonCard.tsx` | Confronto a tre colonne tra tipi di CLI                                |
| `BaseUrlSelect.tsx`     | Menu a discesa per endpoint (Locale/Cloud/Personalizzato)              |
| `ApiKeySelect.tsx`      | Selettore della chiave API                                             |
| `ManualConfigModal.tsx` | Modale per frammento di configurazione copiabile                       |

### Hook Condiviso (`src/shared/hooks/cli/`)

| File                      | Scopo                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Recupera `/api/cli-tools/all-statuses`, gestisce lo stato di caricamento/aggiornamento |

## 8. i18n

Nuovi spazi dei nomi aggiunti nel piano 14 F9:

| Namespace   | Scopo                                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| `cliCommon` | Stringhe condivise (etichette delle schede, testi di concetto/comparazione, etichette delle pagine di dettaglio) |
| `cliCode`   | Stringhe della pagina del codice CLI                                                                             |
| `cliAgents` | Stringhe della pagina degli agenti CLI                                                                           |
| `acpAgents` | Stringhe della pagina degli agenti ACP                                                                           |

Traduzioni complete in PT-BR e EN sono fornite. 39 altre lingue ricadono automaticamente su EN tramite la fusione a livello di spazio dei nomi in `src/i18n/request.ts`.

---

## 9. Guida Rapida

### Passo 1 — Ottieni una Chiave API OmniRoute

1. Apri `/dashboard/api-manager` → **Crea Chiave API**
2. Dagli un nome (es. `cli-tools`) e seleziona tutte le autorizzazioni
3. Copia la chiave — ne avrai bisogno per ogni CLI qui sotto

> La tua chiave appare così: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Passo 2 — Installa gli Strumenti CLI

Tutti gli strumenti basati su npm richiedono Node.js 22.22.2+ o 24.x:

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

# Google Gemini CLI (lanciabile tramite `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Basato su Rust

# Pi coding agent
# vedere https://github.com/zechnerj/pi-coding-agent per l'installazione

# jcode
# vedere https://github.com/1jehuang/jcode per l'installazione
```

---

### Passo 3 — Configura tramite Dashboard

1. Vai a `http://localhost:20128/dashboard/cli-code`
2. Trova il tuo strumento nella griglia
3. Clicca sulla scheda per aprire la pagina di dettaglio dello strumento
4. Seleziona la tua chiave API e l'URL di base
5. Clicca su **Applica Config** o copia il frammento di configurazione manuale

---

### Passo 4 — Imposta Variabili Ambientali Globali

```bash
# OmniRoute Universal Endpoint
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI legge GOOGLE_GEMINI_BASE_URL alla RADICE (il suo SDK aggiunge /v1beta/... da solo)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Per un **server remoto** sostituisci `localhost:20128` con l'IP o il dominio del server,
> es. `http://<your-server-ip>:20128`.

---

### Passo 4 — Configura Ogni Strumento

#### Claude Code

```bash
# Crea ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Usa la radice del gateway unificato di Anthropic per Claude Code. Non aggiungere `/v1` qui.

**Test:** `claude "say hello"`

---

#### OpenAI Codex

Il Codex moderno (v0.137+) legge solo `~/.codex/config.toml` — il vecchio
`config.yaml` appartiene al CLI npm legacy ed è silenziosamente ignorato. La chiave API
rimane nella variabile ambientale `OMNIROUTE_API_KEY` (`env_key`), mai
all'interno del file:

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

Riferimento completo (profili, `wire_api`, finestre di contesto): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

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

> Usa `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> per inviare varianti di pensiero.

---

#### Cline (CLI o VS Code)

**Modalità CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Modalità VS Code:**
Impostazioni dell'estensione Cline → Fornitore API: `OpenAI Compatible` → URL di base: `http://localhost:20128/v1`

Oppure usa il dashboard di OmniRoute → **CLI Tools → Cline → Applica Config**.

---

#### KiloCode (CLI o VS Code)

**Modalità CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Impostazioni VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Oppure usa il dashboard di OmniRoute → **CLI Tools → KiloCode → Applica Config**.

---

#### Continue (Estensione VS Code)

Modifica `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Riavvia VS Code dopo la modifica.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Usa questo quando VS Code Insiders è configurato per modelli di endpoint personalizzati e desideri che OmniRoute funzioni senza un campo di intestazione personalizzato.

**Posizione consigliata:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Esempio usando l'alias tokenizzato di OmniRoute:**

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

- Sostituisci `sk-your-omniroute-key` con una chiave API creata in OmniRoute.
- Il campo `url` dovrebbe puntare a `/api/v1/vscode/{token}/chat/completions`.
- Il campo `modelsUrl` dovrebbe puntare a `/api/v1/vscode/{token}/models`.
- Preferisci il normale flusso `/v1` + intestazione Bearer quando il client supporta intestazioni personalizzate.
- I token incorporati nell'URL sono un fallback di compatibilità e possono apparire nei log dell'editor o nella cronologia del proxy.

---

#### Kiro CLI (Amazon)

```bash
# Accedi al tuo account AWS/Kiro:
kiro-cli login

# Il CLI utilizza la propria autenticazione — OmniRoute non è necessario come backend per il Kiro CLI stesso.
# Usa kiro-cli insieme a OmniRoute per altri strumenti.
kiro-cli status
```

Per l'app desktop **Kiro IDE**, usa l'endpoint MITM esposto da OmniRoute
sotto `/dashboard/cli-tools → Kiro`.

---

## 10. OmniRoute CLI Interno

Il binario `omniroute` fornisce comandi per il ciclo di vita del server, configurazione, diagnostica e gestione dei provider. Punto di ingresso: `bin/omniroute.mjs`.

```bash
omniroute                              # Avvia il server (porta predefinita 20128)
omniroute setup                        # Procedura guidata di configurazione interattiva
omniroute doctor                       # Controlla configurazione, DB, porte, runtime
omniroute providers list               # Connessioni ai provider configurati
omniroute providers test-all           # Testa ogni connessione attiva
omniroute reset-password               # Reimposta la password dell'amministratore
omniroute logs                         # Flusso dei log delle richieste
omniroute health                       # Salute dettagliata (interruttori, cache, memoria)
omniroute --version                    # Stampa la versione
omniroute --help                       # Mostra tutti i comandi
```

### Configurazione e Inizializzazione

```bash
omniroute setup                        # Procedura guidata di configurazione interattiva
omniroute setup --non-interactive      # Modalità CI/automazione (legge variabili d'ambiente + flag)
omniroute setup --password '<value>'   # Imposta direttamente la password dell'amministratore
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Aggiungi e testa un provider in un colpo solo
```

Variabili d'ambiente riconosciute per la configurazione non interattiva:

| Var                 | Scopo                                                                        |
| ------------------- | ---------------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Chiave API del provider (collegata a `--api-key` tramite Commander `.env()`) |
| `DATA_DIR`          | Sovrascrivi la directory dei dati di OmniRoute                               |

Tutti gli altri input non interattivi sono passati come flag, non come variabili d'ambiente:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(vedi le opzioni `omniroute setup` sopra).

### Diagnostica

```bash
omniroute doctor                       # Controlla configurazione, DB, porte, runtime, memoria, liveness
omniroute doctor --json                # JSON leggibile dalla macchina
omniroute doctor --no-liveness         # Salta il probe di salute HTTP
omniroute doctor --host 0.0.0.0        # Sovrascrivi l'host di liveness
omniroute doctor --liveness-url <url>  # Sovrascrivi l'URL dell'endpoint di salute completo
```

Il doctor esegue questi controlli: `Configurazione`, `Database`, `Storage/crittografia`,
`Disponibilità della porta`, `Runtime del nodo`, `Binario nativo` (better-sqlite3),
`Memoria`, e `Liveness del server`. Esce con un codice non zero se uno dei controlli fallisce.

### Gestione dei Provider

```bash
omniroute providers available                       # Catalogo dei provider di OmniRoute
omniroute providers available --search openai       # Filtra il catalogo per id/nome/alias/categoria
omniroute providers available --category api-key    # Filtra per categoria (api-key, oauth, free, ...)
omniroute providers available --json                # JSON leggibile dalla macchina

omniroute providers list                            # Connessioni ai provider configurati
omniroute providers list --json

omniroute providers test <id|name>                  # Testa una connessione configurata
omniroute providers test-all                        # Testa ogni connessione attiva
omniroute providers validate                        # Validazione strutturale solo locale
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Flusso OAuth esistente
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` sono API-first e quindi funzionano contro
il contesto locale o remoto attivo. L'input delle credenziali dovrebbe utilizzare
`--credential-stdin` o `--credential-env`; `--dry-run --json` riporta solo
la presenza/forma redatta. `providers available` legge il catalogo di OmniRoute;
`providers list/test/test-all/validate` mantengono il loro comportamento locale SQLite e
non richiedono che il server sia in esecuzione.

### Recupero e Ripristino

```bash
omniroute reset-password                # Reimposta la password dell'amministratore (anche: omniroute-reset-password)
omniroute reset-encrypted-columns       # Mostra avviso + dry-run per il ripristino delle credenziali crittografate
omniroute reset-encrypted-columns --force  # Annulla effettivamente le credenziali crittografate in SQLite
```

### Esportazione delle Credenziali (⚠ maneggiare con cura)

```bash
omniroute auth export                                 # Mostra avviso + gate di conferma — nessun accesso al DB
omniroute auth export --force                          # Esporta TUTTE le credenziali DECRITTOGRAFATE delle connessioni su stdout come JSON
omniroute auth export --force --id <id>                 # Esporta solo la connessione corrispondente
omniroute auth export --force --format env               # Emmette righe OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Scrive in un file (creato con permessi 0600)
```

`auth export` è **solo locale** (lettura diretta di SQLite, nessun percorso HTTP) e stampa/scrive
**in chiaro** i valori `apiKey`/`accessToken`/`refreshToken`/`idToken` — questa è la funzionalità, non un
bug. Niente viene letto dal database e niente viene decrittografato, senza `--force`. Un banner di avviso su stderr
viene sempre stampato prima che venga emesso qualsiasi testo in chiaro. Richiede che `STORAGE_ENCRYPTION_KEY` sia
impostato. Un campo che non riesce a decrittografare (chiave obsoleta, ciphertext corrotto) viene riportato come
`<field>DecryptFailed: true` invece di interrompere l'intera esportazione o di rivelare l'errore sottostante.

### Altri sottocomandi

Questi presuppongono un server OmniRoute in esecuzione, a meno che non sia indicato diversamente:

```bash
omniroute status                       # Stato completo del runtime
omniroute logs                         # Flusso dei log delle richieste (--json, --search, --follow)
omniroute config show                  # Mostra la configurazione attuale

omniroute provider list                # Elenca i provider disponibili (alias di providers list)
omniroute provider add                 # Registra OmniRoute come provider su uno strumento
omniroute keys add | list | remove     # Gestisci le chiavi API
omniroute models [provider]            # Elenca i modelli (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Snapshot della configurazione + DB
omniroute restore                      # Ripristina da uno snapshot precedente

omniroute health                       # Salute dettagliata (interruttori, cache, memoria)
omniroute quota                        # Utilizzo del quota del provider
omniroute cache                        # Stato della cache
omniroute cache clear                  # Pulisci le cache semantiche + di firma

omniroute mcp status | restart         # Stato del server MCP / riavvio
omniroute a2a status | card            # Stato del server A2A / scheda agente

omniroute tunnel list | create | stop  # Gestisci i tunnel (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Ispeziona / imposta variabili d'ambiente (temporanee)

omniroute test                         # Test di connettività del provider
omniroute update                       # Controlla gli aggiornamenti
omniroute completion                   # Genera completamento della shell
```

### Flag comuni

| Flag                | Descrizione                                                    |
| ------------------- | -------------------------------------------------------------- |
| `--no-open`         | Non aprire automaticamente il browser all'avvio                |
| `--port <n>`        | Sovrascrivi la porta API (predefinita 20128)                   |
| `--mcp`             | Esegui come server MCP su stdio (per IDE)                      |
| `--non-interactive` | Modalità CI (nessun prompt; legge da env/flags)                |
| `--json`            | Output JSON leggibile dalla macchina (doctor, providers, ecc.) |
| `--help`, `-h`      | Mostra aiuto specifico per il comando                          |
| `--version`, `-v`   | Stampa la versione installata                                  |

---

## Endpoint API Disponibili

| Endpoint                   | Descrizione                         | Utilizzo per                             |
| -------------------------- | ----------------------------------- | ---------------------------------------- |
| `/v1/chat/completions`     | Chat standard (tutti i provider)    | Tutti gli strumenti moderni              |
| `/v1/responses`            | API delle risposte (formato OpenAI) | Codex, flussi agentici                   |
| `/v1/completions`          | Completamenti di testo legacy       | Strumenti più vecchi che usano `prompt:` |
| `/v1/embeddings`           | Embedding di testo                  | RAG, ricerca                             |
| `/v1/images/generations`   | Generazione di immagini             | GPT-Image, Flux, ecc.                    |
| `/v1/audio/speech`         | Da testo a voce                     | ElevenLabs, OpenAI TTS                   |
| `/v1/audio/transcriptions` | Da voce a testo                     | Deepgram, AssemblyAI                     |

Esempi pronti per essere incollati con un URL OmniRoute tokenizzato:

```txt
Esempio di token: sk-a3ab3c080beaee3a-69f4a4-070d71af

Base standard OpenAI: http://localhost:20128/v1
Modelli VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Chat VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Risposte VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Tag Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Chat Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Risoluzione dei Problemi

| Errore                                                  | Causa                          | Soluzione                                                     |
| ------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------- |
| `Connection refused`                                    | OmniRoute non in esecuzione    | `omniroute serve`                                             |
| `401 Unauthorized`                                      | Chiave API errata              | Controlla in `/dashboard/api-manager`                         |
| `No combo configured`                                   | Nessun combo di routing attivo | Configura in `/dashboard/combos`                              |
| CLI mostra "not installed"                              | Binario non nel PATH           | Controlla `which <command>`                                   |
| Il dashboard mostra "not detected" dopo l'installazione | Cache obsoleta                 | Clicca "⟳ Aggiorna rilevamento" nel dashboard                 |
| Link vecchio `/dashboard/cli-tools`                     | Segnalibro pre-v3.8.6          | Reindirizzato automaticamente a `/dashboard/cli-code` (308)   |
| Link vecchio `/dashboard/agents`                        | Segnalibro pre-v3.8.6          | Reindirizzato automaticamente a `/dashboard/acp-agents` (308) |
