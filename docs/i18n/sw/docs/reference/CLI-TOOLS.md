# CLI-TOOLS (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "Zana za CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Zana za CLI — OmniRoute

Imesasishwa mwisho: 2026-08-18

OmniRoute inajumuisha aina tatu za zana za CLI zilizotawanyika kwenye kurasa tatu za dashibodi maalum:

| Ukurasa        | Njia                    | Dhana                                                                                   | Hesabu          |
| -------------- | ----------------------- | --------------------------------------------------------------------------------------- | --------------- |
| **CLI Code's** | `/dashboard/cli-code`   | Zana za uandishi unazopointisha kwa OmniRoute (Mteja → CLI → OmniRoute → Mtoa huduma)   | 26              |
| **CLI Agents** | `/dashboard/cli-agents` | Wakala huru unazopointisha kwa OmniRoute (mchakato sawa, upeo mpana)                    | 8               |
| **ACP Agents** | `/dashboard/acp-agents` | CLIs ambazo OmniRoute inazizalisha kama backend kupitia stdio/ACP (mchakato wa kinyume) | angalia rejista |

Njia za zamani zinaelekeza kupitia 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Jinsi Inavyofanya Kazi

```
CLI Code's / CLI Agents (mchakato wa matumizi):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (zote zinaelekeza kwa OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute inaelekeza kwa mtoa huduma sahihi)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agents (mchakato wa kuzalisha kinyume):
    Ombi la Mteja → OmniRoute → inazalisha CLI kupitia stdio/ACP → jibu
```

**Manufaa:**

- Funguo moja ya API kusimamia zana zote
- Ufuatiliaji wa gharama katika CLIs zote kwenye dashibodi
- Kubadilisha mifano bila kuunda upya kila zana
- Inafanya kazi kwa ndani na kwenye seva za mbali (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Auto-configure na `setup-*`

Huna haja ya kuandika usanidi wa kila zana kwa mkono. OmniRoute inatoa amri ya `setup-*`
kila CLI inayoungwa mkono ambayo inasoma katalogi ya mifano **hai** kutoka kwa OmniRoute inayofanya kazi
(ya ndani au ya mbali) na kuandika usanidi wa zana mwenyewe kwenye mashine yako:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Kila moja inakubali `--remote <url> --api-key <key>` (kuunda zana ya ndani dhidi ya
OmniRoute ya mbali), `--dry-run` (kuangalia bila kuandika), na `--port`. Zana
bila ugunduzi wa mifano (Cline, Kilo, Roo, Goose, Aider, Qwen) zinahitaji
`--model <id>` (na `--yes` kwa kazi zisizo za mwingiliano). Ili kuzindua CLI na
muhimu sahihi iliyowekwa na hakuna usanidi ulioandikwa kabisa, tumia
mwanzo wa jumla `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — malengo na majina yanatoka `bin/cli/cli-manifest.mjs`); mwanzo wa zamani
wa kila zana `omniroute launch` (Claude Code) na `omniroute launch-codex`
(Codex) bado zinapatikana. Gemini CLI ni ya kuzindua tu: ni lengo la `omniroute run`
lakini haina mapishi ya `setup-*`/`configure`.

> **Rejeleo kamili:** jedwali kuu — kila amri inayoandika, kila bendera,
> ya ndani dhidi ya ya mbali, na zana zipi zinahitaji kiambishi cha `/v1` — inapatikana katika
> **[Ushirikiano wa CLI](../guides/CLI-INTEGRATIONS.md)**.

### Kukimbia hizi ndani ya kontena

Amri ya `setup-*` iliyotekelezwa ndani ya kontena la OmniRoute inaandika kwenye
nyumba ya kontena yenyewe, ambayo hakuna CLI ya mwenyeji inayosoma na ambayo inatoweka na
kontena. OmniRoute inagundua hilo na inatoka `2` na maagizo badala ya
kuandika. Njia mbili zinazoungwa mkono — sakinisha CLI kwenye mwenyeji na
`omniroute connect` kwa kontena, au bind-mount saraka za usanidi na kuweka
`CLI_CONFIG_HOME` (profaili ya compose `host`). Kila amri ya `setup-*`, pamoja na
`omniroute configure` na `omniroute config set`, inakubali
`--allow-container-write` wakati usanidi wa CLIs za kontena mwenyewe ndio unachomaanisha; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` inafanya vivyo hivyo kwa
seva. Tazama
[Muongozo wa Docker → Kuweka zana za CLI za mwenyeji](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

**Kipengele cha kutekeleza** cha dashibodi (`POST /api/cli-tools/apply`) kinathibitisha
mlinzi sawa: ndani ya kontena, kuandika ambako lengo lake halijabind-mount kutoka kwa
mwenyeji kunajibu **`422`** na `containerEphemeralTarget: true`, maandiko salama ya kosa
na — kwa zana zenye mapishi ya mwenyeji (claude, codex, opencode, cline,
kilo, continue) — `hostSetupCommand` (mfano `omniroute setup-opencode`) ya kutekeleza
kwenye mwenyeji badala yake; hakuna kitu kinachoandikwa. `dryRun: true` inaendelea kufanya kazi katika
hali ya kontena na inarudisha yaliyomo yaliyoundwa + njia ya lengo bila kugusa diski, hivyo
unaweza kuangalia kutoka kwenye dashibodi na kutekeleza kwenye mwenyeji. Tabia hii ni
ya makusudi na inalindwa na
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — usijaribu "kurekebisha" 422
kwa kuondoa mlinzi.

---

## Chanzo cha Ukweli

Katalogi iliyounganishwa inapatikana katika `src/shared/constants/cliTools.ts` kama `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Kila kipengele kina hizi nyanja (zilizoainishwa katika `src/shared/schemas/cliCatalog.ts`):

| Nyanja                                          | Aina                                                         | Maelezo                                                          |
| ----------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Ambapo zana inaonekana kwenye ukurasa                            |
| `vendor`                                        | `string`                                                     | Chanzo cha zana ("Anthropic", "OSS (P. Gauthier)")               |
| `acpSpawnable`                                  | `boolean`                                                    | Pia inaweza kutumika kama ACP Agent (alama inaonyeshwa)          |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Kiwango cha msaada wa mwisho wa kawaida. `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Mekanismu ya usanidi                                             |
| `id`, `name`, `color`, `description`, `docsUrl` | kawaida                                                      | Nyanja za msingi za kuonyesha                                    |

Kipengele chenye `baseUrlSupport: "none"` **hakionekani** kwenye kurasa za dashibodi — kimeandikishwa katika MITM backlog kwa mpango wa 11 (tazama `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Ngazi za Uwezo (katalogi × inayoonekana × inayoweza kusanidiwa × inayoweza kuzinduliwa)

Sio kila zana iliyoorodheshwa inaweza kuonekana, kusanidiwa au kuzinduliwa. Kila ngazi ina chanzo kimoja kinachotangaza, na mtihani wa mabadiliko unashikilia usawa wao:

| Ngazi                     | Maana                                                                          | Imetangazwa katika                                                |
| ------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **Katalogi**              | Inaonekana katika katalogi ya dashibodi (jina, muuzaji, hati, aina ya usanidi) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Inayoonekana**          | Ugunduzi wa binary/usanidi, ukaguzi wa afya, njia za usanidi                   | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **Inayoweza kusanidiwa**  | Inasaidiwa na `omniroute configure <cli>` (mapishi ya usanidi yapo)            | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Inayoweza kuzinduliwa** | Inasaidiwa na `omniroute run <target>` (injection ya env/args imeainishwa)     | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` ni hati ya kutekeleza ya kawaida kwa amri za CLI
zinazoonekana: `run`, `configure` na jenereta za kukamilisha shell zote zinapata orodha zao za
malengo, ufumbuzi wa alias (kwa mfano `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
na uunganisho wa lipo `--model` kutoka kwake. Mlinzi wa mabadiliko
`tests/unit/cli/cli-manifest-drift.test.ts` unathibitisha kwamba hati, katalogi ya wakati wa kutekeleza,
katalogi ya UI na kila uso wa watumiaji unabaki katika usawa — lengo lililoongezwa
katika uso mmoja bila wengine linashindwa katika suite badala ya kuhamasika kimya.

## 1. Katalogi ya Msimbo wa CLI (26 zana)

Zana zote zinazojitokeza katika `/dashboard/cli-code`. Zile zenye `baseUrlSupport: none` zimeunganishwa kupitia MITM au mwongozo wa mkono badala ya URL ya msingi ya kawaida:

| id           | jina                              | muuzaji             | baseUrlSupport | aina ya usanidi   | acpSpawnable |
| ------------ | --------------------------------- | ------------------- | -------------- | ----------------- | ------------ |
| claude       | Claude Code                       | Anthropic           | kamili         | env               | kweli        |
| codex        | OpenAI Codex CLI                  | OpenAI              | kamili         | kawaida           | kweli        |
| zcode        | ZCode (Mpango wa Uandishi wa GLM) | Z.ai                | hakuna         | kawaida           | si kweli     |
| cline        | Cline                             | OSS (ex-Claude Dev) | kamili         | kawaida           | kweli        |
| kilo         | Kilo Code                         | Kilo-Org            | kamili         | kawaida           | si kweli     |
| roo          | Roo Code                          | Roo (OSS)           | kamili         | mwongozo          | si kweli     |
| continue     | Continue                          | continue.dev        | kamili         | mwongozo          | si kweli     |
| aider        | Aider                             | OSS (P. Gauthier)   | kamili         | mwongozo          | kweli        |
| forge        | ForgeCode                         | Antinomy HQ         | kamili         | kawaida           | kweli        |
| jcode        | jcode                             | 1jehuang (OSS)      | kamili         | kawaida           | si kweli     |
| deepseek-tui | DeepSeek TUI                      | Hunter Bown (OSS)   | kamili         | kawaida           | si kweli     |
| codewhale    | CodeWhale                         | Hmbown (OSS)        | kamili         | kawaida           | si kweli     |
| opencode     | OpenCode                          | Anomaly (ex-SST)    | kamili         | mwongozo          | kweli        |
| droid        | Factory Droid                     | Factory AI          | sehemu         | mwongozo          | si kweli     |
| copilot      | GitHub Copilot CLI                | GitHub/MS           | kamili         | kawaida           | si kweli     |
| cursor-cli   | Cursor CLI                        | Anysphere           | sehemu         | mwongozo          | kweli        |
| smelt        | Smelt                             | leonardcser (OSS)   | kamili         | kawaida           | si kweli     |
| pi           | Pi (wakala wa coding wa pi)       | M. Zechner (OSS)    | kamili         | kawaida           | si kweli     |
| grok-build   | Grok Build                        | xAI                 | kamili         | kawaida           | si kweli     |
| crush        | Crush                             | OSS (Charm)         | kamili         | kawaida           | si kweli     |
| qwen         | Qwen Code                         | Alibaba             | kamili         | mwongozo          | kweli        |
| cursor       | Cursor                            | Anysphere           | hakuna         | mwongozo          | si kweli     |
| antigravity  | Antigravity                       | Google              | hakuna         | mitm              | si kweli     |
| hermes       | Hermes                            | Nous Research       | hakuna         | mwongozo          | si kweli     |
| kiro         | Kiro AI                           | Amazon              | hakuna         | mitm              | si kweli     |
| custom       | Custom CLI                        | —                   | kamili         | mjenzi wa kawaida | si kweli     |

Zana zenye `baseUrlSupport: "partial"` zinaonyesha alama "⚠ Base URL parcial" katika kadi ya dashibodi.

## 2. Katalogi ya Wakala wa CLI (8 zana)

Wakala huru wanaoonekana katika `/dashboard/cli-agents`:

| id           | jina             | muuzaji                  | msaadaBaseUrl | acpSpawnable |
| ------------ | ---------------- | ------------------------ | ------------- | ------------ |
| hermes-agent | Wakala wa Hermes | Nous Research            | kamili        | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | kamili        | true         |
| goose        | Goose            | Block / Linux Foundation | kamili        | true         |
| interpreter  | Mfasiri wa Open  | OSS                      | kamili        | true         |
| warp         | Warp AI          | Warp Inc.                | sehemu        | true         |
| agent-deck   | Deck ya Wakala   | asheshgoplani (OSS)      | kamili        | false        |
| omp          | Oh My Pi         | OSS                      | kamili        | true         |
| letta        | Letta CLI        | Letta                    | kamili        | false        |

---

## 3. Wakala wa ACP (/dashboard/acp-agents)

Ukurasa huu (uliobadilishwa kutoka `/dashboard/agents`) unaonyesha CLIs ambazo OmniRoute inaweza **kuanzisha** kama injini za utekelezaji wa nyuma kupitia stdio/ACP protokali. Katalogi inashughulikiwa tofauti katika `src/lib/acp/registry.ts` na **siyo** sawa na `CLI_TOOLS`.

---

## 4. Orodha ya MITM (haionekani kwenye dashibodi)

CLIs zifuatazo hazisaidii URL ya msingi maalum kiasili na **hazijatajwa** katika kurasa za Kodi ya CLI au Wakala wa CLI. Ni wagombea wa kukamatwa kwa MITM katika mpango wa 11:

| CLI                 | Sababu                                                          |
| ------------------- | --------------------------------------------------------------- |
| windsurf            | BYOK imepunguzia mifano maalum ya Claude + URL/token ya kampuni |
| amp                 | Mfumo uliofungwa (Sourcegraph)                                  |
| amazon-q / kiro-cli | AWS SSO uthibitisho, hakuna URL maalum                          |
| cowork              | Anthropic Desktop, hakuna mwisho unaoweza kubadilishwa          |

Tazama `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` kwa rejeleo kamili.

---

## 5. API ya Ugunduzi wa Kundi

Ugunduzi wa zana zote unakusanywa kupitia mwisho mmoja:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (sawa na njia nyingine za `/api/cli-tools/`)
- Inarudisha: `Record<toolId, ToolBatchStatus>` (aina: `src/shared/types/cliBatchStatus.ts`)
- Mkakati: `Promise.all` juu ya zana zote, muda wa mwisho wa sekunde 5 kwa zana
- Kumbukumbu: katika-mkondo LRU iliyoorodheshwa na faili ya usanidi `mtime`. Kumbukumbu inabatilishwa wakati mtime inabadilika. Inarejeshwa wakati wa kuanzisha seva.

Muundo wa majibu kwa kila zana:

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
  error?: string; // sanitized, no stack traces
}
```

## 6. Wasilisho la Mipangilio kwa Zana Mpya

Zana mpya zenye `configType: "custom"` zina njia maalum za API za mipangilio:

| Njia                                        | Zana                                                             |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedicated `.env` key)       |

Njia zote zinatumia `sanitizeErrorMessage()` kwa majibu ya makosa (Sheria Kali #12).

---

## 7. Muktadha wa Kurasa za Dashibodi

### Kode ya CLI (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — kipengele cha seva
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — gridi ya mteja
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — ukurasa wa maelezo ya zana
- `src/app/(dashboard)/dashboard/cli-code/components/` — kadi 12 maalum za zana + `ToolDetailClient.tsx`

### Wakala wa CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — kipengele cha seva
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — gridi ya mteja
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — inatumia tena `ToolDetailClient`

### Wakala wa ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — kipengele cha seva (kilihamishwa kutoka `agents/`)

### Vipengele vya UI Vilivyoshirikiwa (`src/shared/components/cli/`)

| Faili                   | Kusudi                                                 |
| ----------------------- | ------------------------------------------------------ |
| `CliToolCard.tsx`       | Kadi ya hali ya akili (ugunduzi + mipangilio + mwisho) |
| `CliConceptCard.tsx`    | Kadi ya maelezo ya dhana kwa ukurasa                   |
| `CliComparisonCard.tsx` | Ulinganisho wa safu tatu kati ya aina za CLI           |
| `BaseUrlSelect.tsx`     | Orodha ya mwisho (Mitaa/Cloud/Custom)                  |
| `ApiKeySelect.tsx`      | Mchaguo wa funguo za API                               |
| `ManualConfigModal.tsx` | Kidirisha cha nakala ya mipangilio                     |

### Kichaka Kilichoshirikiwa (`src/shared/hooks/cli/`)

| Faili                     | Kusudi                                                                          |
| ------------------------- | ------------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Inapata `/api/cli-tools/all-statuses`, inasimamia hali ya kupakia/kuongeza mpya |

## 8. i18n

Majina mapya yameongezwa katika mpango 14 F9:

| Namespace   | Kusudi                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------- |
| `cliCommon` | Nyimbo za pamoja (lebo za kadi, maandiko ya dhana/kulinganisha, lebo za ukurasa wa maelezo) |
| `cliCode`   | Nyimbo za ukurasa wa CLI Code                                                               |
| `cliAgents` | Nyimbo za ukurasa wa CLI Agents                                                             |
| `acpAgents` | Nyimbo za ukurasa wa ACP Agents                                                             |

Tafsiri kamili za PT-BR na EN zinapatikana. Lugha 39 nyingine zinarudi kwa EN moja kwa moja kupitia muunganiko wa kiwango cha namespace katika `src/i18n/request.ts`.

---

## 9. Kuanzia Haraka

### Hatua ya 1 — Pata Funguo ya API ya OmniRoute

1. Fungua `/dashboard/api-manager` → **Unda Funguo ya API**
2. Mpe jina (mfano `cli-tools`) na chagua ruhusa zote
3. Nakili funguo hiyo — utahitaji hiyo kwa kila CLI hapa chini

> Funguo yako inaonekana kama: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Hatua ya 2 — Sakinisha Zana za CLI

Zana zote zinazotegemea npm zinahitaji Node.js 22.22.2+ au 24.x:

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

# Google Gemini CLI (inaweza kuzinduliwa kupitia `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Inategemea Rust

# Pi coding agent
# angalia https://github.com/zechnerj/pi-coding-agent kwa usakinishaji

# jcode
# angalia https://github.com/1jehuang/jcode kwa usakinishaji
```

---

### Hatua ya 3 — Sanidi kupitia Dashibodi

1. Nenda kwa `http://localhost:20128/dashboard/cli-code`
2. Tafuta zana yako kwenye gridi
3. Bonyeza kadi ili kufungua ukurasa wa maelezo ya zana
4. Chagua funguo yako ya API na URL ya msingi
5. Bonyeza **Tumia Mipangilio** au nakili kipande cha mipangilio ya mwongozo

---

### Hatua ya 4 — Weka Mabadiliko ya Mazingira ya Ulimwengu

```bash
# OmniRoute Universal Endpoint
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI inasoma GOOGLE_GEMINI_BASE_URL kwenye ROOT (SDK yake inaongeza /v1beta/... yenyewe)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Kwa **seva ya mbali** badilisha `localhost:20128` na IP ya seva au jina la kikoa,
> mfano `http://<your-server-ip>:20128`.

---

### Hatua ya 4 — Sanidi Kila Zana

#### Claude Code

```bash
# Unda ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Tumia lango la pamoja la Anthropic kama mzizi kwa Claude Code. Usiongeze `/v1` hapa.

**Jaribu:** `claude "say hello"`

---

#### OpenAI Codex

Codex ya kisasa (v0.137+) inasoma `~/.codex/config.toml` pekee — ya zamani
`config.yaml` inahusiana na CLI ya zamani ya npm na inapuuziliwa mbali kimya. Funguo ya API
inasalia katika mabadiliko ya mazingira ya `OMNIROUTE_API_KEY` (`env_key`), kamwe
ndani ya faili:

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

Marejeo kamili (profaili, `wire_api`, madirisha ya muktadha): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Jaribu:** `codex "what is 2+2?"`

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

**Jaribu:** `opencode`

> Tumia `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> kutuma toleo la kufikiri.

---

#### Cline (CLI au VS Code)

**Hali ya CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Hali ya VS Code:**
Mipangilio ya kiendelezi cha Cline → Mtoa API: `OpenAI Compatible` → URL ya Msingi: `http://localhost:20128/v1`

Au tumia dashibodi ya OmniRoute → **Zana za CLI → Cline → Tumia Mipangilio**.

---

#### KiloCode (CLI au VS Code)

**Hali ya CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Mipangilio ya VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Au tumia dashibodi ya OmniRoute → **Zana za CLI → KiloCode → Tumia Mipangilio**.

---

#### Continue (Kiendelezi cha VS Code)

Hariri `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Restart VS Code baada ya kuhariri.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Tumia hii wakati VS Code Insiders imewekwa kwa mifano ya mwisho ya mwisho na unataka OmniRoute ifanye kazi bila uwanja wa kichwa maalum.

**Mahali panap推荐:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Mfano ukitumia jina la OmniRoute lililotolewa tokeni:**

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

**Maelezo:**

- Badilisha `sk-your-omniroute-key` na funguo ya API iliyoundwa katika OmniRoute.
- Sehemu ya `url` inapaswa kuelekeza kwenye `/api/v1/vscode/{token}/chat/completions`.
- Sehemu ya `modelsUrl` inapaswa kuelekeza kwenye `/api/v1/vscode/{token}/models`.
- Prefer njia ya kawaida ya `/v1` + kichwa cha Bearer wakati mteja unasaidia vichwa maalum.
- Tokeni zilizowekwa kwenye URL ni kurudi nyuma ya ulinganifu na zinaweza kuonekana kwenye kumbukumbu za mhariri au historia ya proxy.

---

#### Kiro CLI (Amazon)

```bash
# Ingia kwenye akaunti yako ya AWS/Kiro:
kiro-cli login

# CLI inatumia uthibitisho wake mwenyewe — OmniRoute haitahitajika kama nyuma kwa Kiro CLI yenyewe.
# Tumia kiro-cli pamoja na OmniRoute kwa zana nyingine.
kiro-cli status
```

Kwa programu ya desktop ya **Kiro IDE**, tumia mwisho wa MITM ulioonyeshwa na OmniRoute
chini ya `/dashboard/cli-tools → Kiro`.

---

## 10. OmniRoute CLI ya Ndani

Binary ya `omniroute` inatoa amri za mzunguko wa seva, usanidi, uchunguzi, na usimamizi wa watoa huduma. Kituo cha kuingia: `bin/omniroute.mjs`.

```bash
omniroute                              # Anza seva (bandia port 20128)
omniroute setup                        # Mwandiko wa usanidi wa mwingiliano
omniroute doctor                       # Angalia usanidi, DB, port, muda wa kukimbia
omniroute providers list               # Mifumo ya watoa huduma iliyowekwa
omniroute providers test-all           # Jaribu kila muunganisho hai
omniroute reset-password               # Weka upya nenosiri la admin
omniroute logs                         # Pitia kumbukumbu za maombi
omniroute health                       # Afya ya kina (vikwazo, cache, kumbukumbu)
omniroute --version                    # Chapisha toleo
omniroute --help                       # Onyesha amri zote
```

### Usanidi & Uanzishaji

```bash
omniroute setup                        # Mwandiko wa usanidi wa mwingiliano
omniroute setup --non-interactive      # Hali ya CI/automatiska (inasoma mabadiliko ya mazingira + bendera)
omniroute setup --password '<value>'   # Weka nenosiri la admin moja kwa moja
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Ongeza na jaribu mtoa huduma kwa wakati mmoja
```

Mabadiliko ya mazingira yanayotambuliwa kwa usanidi usio wa mwingiliano:

| Var                 | Kusudi                                                                             |
| ------------------- | ---------------------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Funguo ya API ya mtoa huduma (imefungwa na `--api-key` kupitia Commander `.env()`) |
| `DATA_DIR`          | Badilisha saraka ya data ya OmniRoute                                              |

Mingine yote ya pembejeo zisizo za mwingiliano inapitishwa kama bendera, si mabadiliko ya mazingira:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(tazama chaguzi za `omniroute setup` hapo juu).

### Uchunguzi

```bash
omniroute doctor                       # Angalia usanidi, DB, port, muda wa kukimbia, kumbukumbu, uhai
omniroute doctor --json                # JSON inayoweza kusomwa na mashine
omniroute doctor --no-liveness         # Kosa uchunguzi wa afya ya HTTP
omniroute doctor --host 0.0.0.0        # Badilisha mwenyeji wa uhai
omniroute doctor --liveness-url <url>  # Badilisha URL ya mwisho wa afya
```

Daktari anafanya uchunguzi haya: `Usanidi`, `Hifadhi`, `Hifadhi/kuandika`,
`Upatikanaji wa port`, `Muda wa Node`, `Binary asilia` (better-sqlite3),
`Kumbukumbu`, na `Uhai wa seva`. Inatoka na nambari isiyo sifuri ikiwa uchunguzi wowote ni `fail`.

### Usimamizi wa Watoa Huduma

```bash
omniroute providers available                       # Katalogi ya watoa huduma wa OmniRoute
omniroute providers available --search openai       # Chuja katalogi kwa id/jina/alias/kikundi
omniroute providers available --category api-key    # Chuja kwa kikundi (api-key, oauth, bure, ...)
omniroute providers available --json                # JSON inayoweza kusomwa na mashine

omniroute providers list                            # Mifumo ya watoa huduma iliyowekwa
omniroute providers list --json

omniroute providers test <id|name>                  # Jaribu muunganisho mmoja uliowekwa
omniroute providers test-all                        # Jaribu kila muunganisho hai
omniroute providers validate                        # Uthibitisho wa muundo wa ndani pekee
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Mchakato wa OAuth uliopo
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` ni API-ya kwanza na kwa hivyo inafanya kazi dhidi
ya muktadha wa ndani au wa mbali. Pembejeo za akidi zinapaswa kutumia
`--credential-stdin` au `--credential-env`; `--dry-run --json` inaripoti tu
kuwepo/kichwa kilichofichwa. `providers available` inasoma katalogi ya OmniRoute;
`providers list/test/test-all/validate` zinabaki na tabia yao ya ndani ya SQLite na
hazihitaji seva kuwa inakimbia.

### Urejeleaji & Weka Upya

```bash
omniroute reset-password                # Weka upya nenosiri la admin (pia: omniroute-reset-password)
omniroute reset-encrypted-columns       # Onyesha onyo + jaribio la kuweka upya akidi iliyofichwa
omniroute reset-encrypted-columns --force  # Kwa kweli futa akidi zilizofichwa katika SQLite
```

### Uhamasishaji wa Akidi (⚠ shughulikia kwa uangalifu)

```bash
omniroute auth export                                 # Onyesha onyo + lango la uthibitisho — hakuna ufikiaji wa DB
omniroute auth export --force                          # Hamasisha akidi ZOTE zilizofichwa za muunganisho kwa stdout kama JSON
omniroute auth export --force --id <id>                 # Hamasisha tu muunganisho unaolingana
omniroute auth export --force --format env               # Tolea mistari ya OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Andika kwenye faili (iliyoundwa na ruhusa 0600)
```

`auth export` ni **ya ndani pekee** (kusoma moja kwa moja kutoka SQLite, hakuna njia ya HTTP) na kwa makusudi inachapisha/kuandika
**maandishi** ya `apiKey`/`accessToken`/`refreshToken`/`idToken` — hiyo ndiyo sifa, si
hitilafu. Hakuna kitu kinachosomwa kutoka kwenye hifadhidata, na hakuna kitu kinachofichuliwa, bila `--force`. Bango la onyo la stderr
linaandika kila wakati kabla ya maandiko yoyote ya maandiko kutolewa. Inahitaji `STORAGE_ENCRYPTION_KEY`
iwe imewekwa. Sehemu ambayo inashindwa kufichuliwa (funguo ya zamani, ciphertext iliyoharibika) inaripotiwa kama
`<field>DecryptFailed: true` badala ya kuacha uhamasishaji mzima au kuvuja hitilafu ya msingi.

### Amri nyingine za chini

Hizi zinadhani seva ya OmniRoute inakimbia, isipokuwa ilipobainishwa vinginevyo:

```bash
omniroute status                       # Hali ya kina ya kukimbia
omniroute logs                         # Pitia kumbukumbu za maombi (--json, --search, --follow)
omniroute config show                  # Onyesha usanidi wa sasa

omniroute provider list                # Orodha ya watoa huduma wanaopatikana (alias ya providers list)
omniroute provider add                 # Register OmniRoute kama mtoa huduma kwenye chombo
omniroute keys add | list | remove     # Simamia funguo za API
omniroute models [provider]            # Orodha ya mifano (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Picha ya usanidi + DB
omniroute restore                      # Rejesha kutoka picha ya awali

omniroute health                       # Afya ya kina (vikwazo, cache, kumbukumbu)
omniroute quota                        # Matumizi ya quota ya mtoa huduma
omniroute cache                        # Hali ya cache
omniroute cache clear                  # Futa cache za semantiki + saini

omniroute mcp status | restart         # Hali ya seva ya MCP / re-start
omniroute a2a status | card            # Hali ya seva ya A2A / kadi ya wakala

omniroute tunnel list | create | stop  # Simamia tunnels (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Kagua / weka mabadiliko ya mazingira (ya muda)

omniroute test                         # Jaribio la muunganisho wa mtoa huduma
omniroute update                       # Angalia masasisho
omniroute completion                   # Tengeneza ukamilifu wa shell
```

### Bendera za Kawaida

| Bendera             | Maelezo                                                                    |
| ------------------- | -------------------------------------------------------------------------- |
| `--no-open`         | Usifungue kivinjari kiotomatiki wakati wa kuanza                           |
| `--port <n>`        | Badilisha bandari ya API (bandia 20128)                                    |
| `--mcp`             | Kimbia kama seva ya MCP kupitia stdio (kwa IDEs)                           |
| `--non-interactive` | Hali ya CI (hakuna maulizo; inasoma kutoka env/bendera)                    |
| `--json`            | Matokeo ya JSON yanayoweza kusomwa na mashine (daktari, watoa huduma, nk.) |
| `--help`, `-h`      | Onyesha msaada maalum wa amri                                              |
| `--version`, `-v`   | Chapisha toleo lililowekwa                                                 |

## Mipangilio ya API Inayopatikana

| Mipangilio                 | Maelezo                                   | Tumia Kwa                            |
| -------------------------- | ----------------------------------------- | ------------------------------------ |
| `/v1/chat/completions`     | Mazungumzo ya kawaida (watoa huduma wote) | Zana zote za kisasa                  |
| `/v1/responses`            | API za majibu (muundo wa OpenAI)          | Codex, michakato ya agentic          |
| `/v1/completions`          | Kukamilisha maandiko ya zamani            | Zana za zamani zinazotumia `prompt:` |
| `/v1/embeddings`           | Uwekaji maandiko                          | RAG, utafutaji                       |
| `/v1/images/generations`   | Uundaji picha                             | GPT-Picha, Flux, nk.                 |
| `/v1/audio/speech`         | Maandishi hadi sauti                      | ElevenLabs, OpenAI TTS               |
| `/v1/audio/transcriptions` | Sauti hadi maandiko                       | Deepgram, AssemblyAI                 |

Mifano ya kuandika kwa urahisi yenye URL ya OmniRoute iliyotolewa:

```txt
Mfano wa token: sk-a3ab3c080beaee3a-69f4a4-070d71af

Msingi wa kawaida wa OpenAI: http://localhost:20128/v1
Mifano ya VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Mazungumzo ya VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Majibu ya VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Lehemu za Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Mazungumzo ya Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Kutatua Matatizo

| Kosa                                                       | Sababu                                  | Suluhisho                                                 |
| ---------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------- |
| `Connection refused`                                       | OmniRoute haifanyi kazi                 | `omniroute serve`                                         |
| `401 Unauthorized`                                         | Funguo ya API si sahihi                 | Angalia katika `/dashboard/api-manager`                   |
| `No combo configured`                                      | Hakuna combo ya routing inayofanya kazi | Weka katika `/dashboard/combos`                           |
| CLI inaonyesha "haijasanidi"                               | Binary haipo katika PATH                | Angalia `which <command>`                                 |
| Dashibodi inaonyesha "haikugundulika" baada ya kusakinisha | Kumbukumbu ya zamani                    | Bonyeza "⟳ Refresh detection" katika dashibodi            |
| Kiungo cha zamani `/dashboard/cli-tools`                   | Alama ya kabla ya v3.8.6                | Imeelekezwa kiotomatiki kwa `/dashboard/cli-code` (308)   |
| Kiungo cha zamani `/dashboard/agents`                      | Alama ya kabla ya v3.8.6                | Imeelekezwa kiotomatiki kwa `/dashboard/acp-agents` (308) |
