# CLI-TOOLS (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI Nástroje — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Nástroje — OmniRoute

Posledná aktualizácia: 2026-08-18

OmniRoute integruje tri kategórie CLI nástrojov rozložené na troch špecializovaných stránkach dashboardu:

| Stránka        | Trasa                   | Koncept                                                                                       | Počet             |
| -------------- | ----------------------- | --------------------------------------------------------------------------------------------- | ----------------- |
| **CLI Kód**    | `/dashboard/cli-code`   | Nástroje na kódovanie, ktoré smerujete na OmniRoute (Klient → CLI → OmniRoute → Poskytovateľ) | 26                |
| **CLI Agenti** | `/dashboard/cli-agents` | Autonómni agenti, ktorých smerujete na OmniRoute (rovnaký tok, širší rozsah)                  | 8                 |
| **ACP Agenti** | `/dashboard/acp-agents` | CLI, ktoré OmniRoute spúšťa ako backend cez stdio/ACP (opačný tok)                            | pozri registráciu |

Dedičské trasy presmerovávajú cez 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Ako to funguje

```
CLI Kód / CLI Agenti (tok spotreby):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (všetky smerujú na OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute smeruje k správnemu poskytovateľovi)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agenti (opačný tok spúšťania):
    Klientsky požiadavok → OmniRoute → spúšťa CLI cez stdio/ACP → odpoveď
```

**Výhody:**

- Jeden API kľúč na správu všetkých nástrojov
- Sledovanie nákladov naprieč všetkými CLI v dashboarde
- Prepnúť model bez prekonfigurovania každého nástroja
- Funguje lokálne a na vzdialených serveroch (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Automatická konfigurácia s `setup-*`

Nemusíte písať konfiguráciu každého nástroja ručne. OmniRoute dodáva príkaz `setup-*`
pre každý podporovaný CLI, ktorý číta **živý** katalóg modelov z bežiaceho
OmniRoute (lokálne alebo vzdialene) a zapisuje vlastnú konfiguráciu nástroja na vašom počítači:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Každý akceptuje `--remote <url> --api-key <key>` (konfigurácia lokálneho nástroja voči
vzdialenému OmniRoute), `--dry-run` (náhľad bez zápisu) a `--port`. Nástroje
bez automatického objavovania modelov (Cline, Kilo, Roo, Goose, Aider, Qwen) berú
`--model <id>` (a `--yes` pre neinteraktívne spúšťania). Na spustenie CLI s
právym prostredím injektovaným a bez zápisu konfigurácie použite generický
`omniroute run <target>` launcher (claude, codex, aider, goose, opencode, qwen,
gemini — ciele a aliasy pochádzajú z `bin/cli/cli-manifest.mjs`); dedičné
spúšťače pre každý nástroj `omniroute launch` (Claude Code) a `omniroute launch-codex`
(Codex) zostávajú k dispozícii. Gemini CLI je len na spúšťanie: je to cieľ
`omniroute run`, ale nemá recept `setup-*`/`configure`.

> **Úplná referencia:** hlavná tabuľka — čo každý príkaz zapisuje, každý flag,
> lokálne vs vzdialene, a ktoré nástroje chcú príponu `/v1` — sa nachádza v
> **[CLI Integrácie](../guides/CLI-INTEGRATIONS.md)**.

### Spúšťanie týchto príkazov vo vnútri kontajnera

Príkaz `setup-*` vykonaný vo vnútri kontajnera OmniRoute zapisuje do
vlastného domova kontajnera, ktorý žiadny hostiteľský CLI nečíta a ktorý zmizne s
kontajnerom. OmniRoute to zistí a ukončí s kódom `2` s pokynmi namiesto
zápisu. Dva podporované spôsoby — nainštalovať CLI na hostiteľovi a
`omniroute connect` do kontajnera, alebo pripojiť konfiguračné adresáre a nastaviť
`CLI_CONFIG_HOME` (profil compose `host`). Každý príkaz `setup-*`, plus
`omniroute configure` a `omniroute config set`, akceptuje
`--allow-container-write`, keď konfigurácia vlastných CLI kontajnera je to, čo ste
naozaj mysleli; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` robí to isté pre
server. Pozrite sa na
[Docker Príručka → Konfigurácia hostiteľských CLI nástrojov](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

**aplikovať koncový bod** dashboardu (`POST /api/cli-tools/apply`) vynucuje
rovnakú ochranu: v kontajneri, zápis, ktorého cieľ nie je pripojený z hostiteľa,
odpovedá **`422`** s `containerEphemeralTarget: true`, bezpečným chybovým textom a — pre
nástroje s receptom hostiteľa (claude, codex, opencode, cline,
kilo, continue) — príkazom `hostSetupCommand` (napr. `omniroute setup-opencode`), ktorý sa má vykonať
na hostiteľovi; nič nie je zapísané. `dryRun: true` naďalej funguje v režime kontajnera
a vracia vygenerovaný obsah + cieľovú cestu bez dotyku disku, takže
môžete získať náhľad z dashboardu a aplikovať na hostiteľovi. Toto správanie je
úmyselné a chránené regresiou pomocou
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — nikdy "neopravujte" 422
odstránením ochrany.

---

## Zdroj pravdy

Zjednotený katalóg sa nachádza v `src/shared/constants/cliTools.ts` ako `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Každý záznam má tieto polia (definované v `src/shared/schemas/cliCatalog.ts`):

| Pole                                            | Typ                                                          | Popis                                                            |
| ----------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Na ktorej stránke sa nástroj zobrazuje                           |
| `vendor`                                        | `string`                                                     | Pôvod nástroja ("Anthropic", "OSS (P. Gauthier)")                |
| `acpSpawnable`                                  | `boolean`                                                    | Takisto použiteľný ako ACP Agent (zobrazený odznak)              |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Úroveň podpory vlastného koncového bodu. `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Mechanizmus konfigurácie                                         |
| `id`, `name`, `color`, `description`, `docsUrl` | štandard                                                     | Základné zobrazené polia                                         |

Záznamy s `baseUrlSupport: "none"` sa **nezobrazujú** na stránkach dashboardu — sú registrované v MITM backlogu pre plán 11 (pozri `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Úrovne schopností (katalógované × detekovateľné × konfigurovateľné × spustiteľné)

Nie každý katalógovaný nástroj je detekovateľný, konfigurovateľný alebo spustiteľný. Každá úroveň má jeden
deklarovaný zdroj a test odchýlky ich udržiava v súlade:

| Úroveň               | Význam                                                                                | Deklarované v                                                     |
| -------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Katalógované**     | Zobrazuje sa v katalógu dashboardu (názov, dodávateľ, dokumentácia, typ konfigurácie) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Detekovateľné**    | Detekcia binárnych/config, kontroly zdravia, cesty konfigurácie                       | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime katalóg) |
| **Konfigurovateľné** | Podporované `omniroute configure <cli>` (existuje recept na nastavenie)               | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Spustiteľné**      | Podporované `omniroute run <target>` (definovaná injekcia env/args)                   | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` je kanonický spustiteľný manifest pre príkaz CLI
povrchov: `run`, `configure` a generátory shell-completion všetky odvodzujú svoje
zoznamy cieľov, rozlíšenie aliasov (napríklad `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
a zapojenie príznaku `--model` z neho. Strážca odchýlok
`tests/unit/cli/cli-manifest-drift.test.ts` zabezpečuje, že manifest, runtime
katalóg, UI katalóg a každý spotrebiteľský povrch zostávajú synchronizované — cieľ pridaný do
jedného povrchu bez ostatných spôsobí zlyhanie testovacej sady namiesto tichého odchýlenia.

## 1. Katalóg kódu CLI (26 nástrojov)

Všetky nástroje, ktoré sa objavujú v `/dashboard/cli-code`. Tieto s `baseUrlSupport: none` sú pripojené cez MITM alebo manuálny sprievodca namiesto vlastnej základnej URL:

| id           | názov                   | dodávateľ           | podporaBaseUrl | typKonfigurácie | acpSpawnable |
| ------------ | ----------------------- | ------------------- | -------------- | --------------- | ------------ |
| claude       | Claude Code             | Anthropic           | full           | env             | true         |
| codex        | OpenAI Codex CLI        | OpenAI              | full           | custom          | true         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                | none           | custom          | false        |
| cline        | Cline                   | OSS (ex-Claude Dev) | full           | custom          | true         |
| kilo         | Kilo Code               | Kilo-Org            | full           | custom          | false        |
| roo          | Roo Code                | Roo (OSS)           | full           | guide           | false        |
| continue     | Continue                | continue.dev        | full           | guide           | false        |
| aider        | Aider                   | OSS (P. Gauthier)   | full           | guide           | true         |
| forge        | ForgeCode               | Antinomy HQ         | full           | custom          | true         |
| jcode        | jcode                   | 1jehuang (OSS)      | full           | custom          | false        |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)   | full           | custom          | false        |
| codewhale    | CodeWhale               | Hmbown (OSS)        | full           | custom          | false        |
| opencode     | OpenCode                | Anomaly (ex-SST)    | full           | guide           | true         |
| droid        | Factory Droid           | Factory AI          | partial        | guide           | false        |
| copilot      | GitHub Copilot CLI      | GitHub/MS           | full           | custom          | false        |
| cursor-cli   | Cursor CLI              | Anysphere           | partial        | guide           | true         |
| smelt        | Smelt                   | leonardcser (OSS)   | full           | custom          | false        |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)    | full           | custom          | false        |
| grok-build   | Grok Build              | xAI                 | full           | custom          | false        |
| crush        | Crush                   | OSS (Charm)         | full           | custom          | false        |
| qwen         | Qwen Code               | Alibaba             | full           | guide           | true         |
| cursor       | Cursor                  | Anysphere           | none           | guide           | false        |
| antigravity  | Antigravity             | Google              | none           | mitm            | false        |
| hermes       | Hermes                  | Nous Research       | none           | guide           | false        |
| kiro         | Kiro AI                 | Amazon              | none           | mitm            | false        |
| custom       | Custom CLI              | —                   | full           | custom-builder  | false        |

Nástroje s `baseUrlSupport: "partial"` zobrazujú odznak "⚠ Čiastočná podpora základnej URL" na karte dashboardu.

## 2. Katalóg CLI agentov (8 nástrojov)

Autonómne agenti, ktoré sa objavujú v `/dashboard/cli-agents`:

| id           | názov            | dodávateľ                | podporaBaseUrl | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | plná           | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | plná           | true         |
| goose        | Goose            | Block / Linux Foundation | plná           | true         |
| interpreter  | Open Interpreter | OSS                      | plná           | true         |
| warp         | Warp AI          | Warp Inc.                | čiastočná      | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | plná           | false        |
| omp          | Oh My Pi         | OSS                      | plná           | true         |
| letta        | Letta CLI        | Letta                    | plná           | false        |

---

## 3. ACP agenti (/dashboard/acp-agents)

Táto stránka (prezvaná z `/dashboard/agents`) zobrazuje CLI, ktoré môže OmniRoute **vytvoriť** ako backendové vykonávacie motory prostredníctvom protokolu stdio/ACP. Katalóg je spravovaný samostatne v `src/lib/acp/registry.ts` a **nie** je to isté ako `CLI_TOOLS`.

---

## 4. MITM backlog (nie je zobrazený na dashboarde)

Nasledujúce CLI nativne nepodporujú vlastnú základnú URL a **nie sú uvedené** na stránkach CLI kódu alebo CLI agentov. Sú kandidátmi na MITM interceptáciu v pláne 11:

| CLI                 | Dôvod                                                       |
| ------------------- | ----------------------------------------------------------- |
| windsurf            | BYOK obmedzené na vybrané modely Claude + firemná URL/token |
| amp                 | Uzavretý ekosystém (Sourcegraph)                            |
| amazon-q / kiro-cli | AWS SSO autentifikácia, žiadna vlastná URL                  |
| cowork              | Anthropic Desktop, žiadny konfigurovateľný koncový bod      |

Pozrite si `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` pre úplný krížový odkaz.

---

## 5. API na detekciu dávok

Všetka detekcia nástrojov je agregovaná prostredníctvom jedného koncového bodu:

**`GET /api/cli-tools/all-statuses`**

- Autentifikácia: `requireCliToolsAuth(request)` (rovnaké ako ostatné `/api/cli-tools/` trasy)
- Vráti: `Record<toolId, ToolBatchStatus>` (typ: `src/shared/types/cliBatchStatus.ts`)
- Stratégia: `Promise.all` nad všetkými nástrojmi, 5s časový limit na nástroj
- Cache: v pamäti LRU indexovaná podľa konfiguračného súboru `mtime`. Cache je neplatná, keď sa mtime zmení. Resetuje sa pri reštarte servera.

Tvar odpovede pre každý nástroj:

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
  error?: string; // sanitizované, žiadne zásobníkové stopy
}
```

## 6. Správcovia nastavení pre nové nástroje

Nové nástroje s `configType: "custom"` majú vyhradené API trasy pre nastavenia:

| Trasa                                       | Nástroj                                                           |
| ------------------------------------------- | ----------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                           |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                           |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                            |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primárny + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                             |
| `POST /api/cli-tools/pi-settings`           | Pi kódovací agent                                                 |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)             |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + vyhradený `.env` kľúč)       |

Všetky trasy používajú `sanitizeErrorMessage()` pre chybové odpovede (Tvrdé pravidlo #12).

---

## 7. Architektúra stránok dashboardu

### CLI Kód (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — serverová komponenta
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — klientská mriežka
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — stránka detailu nástroja
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 špecializovaných kariet nástrojov + `ToolDetailClient.tsx`

### CLI Agenti (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — serverová komponenta
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — klientská mriežka
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — znovu používa `ToolDetailClient`

### ACP Agenti (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — serverová komponenta (presunuté z `agents/`)

### Zdieľané UI komponenty (`src/shared/components/cli/`)

| Súbor                   | Účel                                                             |
| ----------------------- | ---------------------------------------------------------------- |
| `CliToolCard.tsx`       | Inteligentná karta stavu (detekcia + konfigurácia + koncový bod) |
| `CliConceptCard.tsx`    | Karta vysvetlenia konceptu na stránku                            |
| `CliComparisonCard.tsx` | Porovnanie v troch stĺpcoch naprieč typmi CLI                    |
| `BaseUrlSelect.tsx`     | Rozbaľovací zoznam koncového bodu (Lokálne/Cloud/Vlastné)        |
| `ApiKeySelect.tsx`      | Výber API kľúča                                                  |
| `ManualConfigModal.tsx` | Modál pre kopírovateľný konfiguračný úryvok                      |

### Zdieľaný hák (`src/shared/hooks/cli/`)

| Súbor                     | Účel                                                                      |
| ------------------------- | ------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Načítava `/api/cli-tools/all-statuses`, spravuje stav načítania/obnovenia |

---

## 8. i18n

Nové menné priestory pridané v pláne 14 F9:

| Názov priestoru | Účel                                                                                   |
| --------------- | -------------------------------------------------------------------------------------- |
| `cliCommon`     | Zdieľané reťazce (popisy kariet, texty konceptov/porovnaní, popisy detailných stránok) |
| `cliCode`       | Reťazce stránok CLI kódu                                                               |
| `cliAgents`     | Reťazce stránok CLI agentov                                                            |
| `acpAgents`     | Reťazce stránok ACP agentov                                                            |

Úplné preklady PT-BR a EN sú poskytnuté. 39 ďalších lokalít automaticky prechádza na EN prostredníctvom zlúčenia na úrovni menného priestoru v `src/i18n/request.ts`.

---

## 9. Rýchly štart

### Krok 1 — Získajte API kľúč OmniRoute

1. Otvorte `/dashboard/api-manager` → **Vytvoriť API kľúč**
2. Dajte mu názov (napr. `cli-tools`) a vyberte všetky povolenia
3. Skopírujte kľúč — budete ho potrebovať pre každý CLI nižšie

> Váš kľúč vyzerá takto: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Krok 2 — Nainštalujte CLI nástroje

Všetky nástroje založené na npm vyžadujú Node.js 22.22.2+ alebo 24.x:

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

# Google Gemini CLI (spustiteľné cez `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # založené na Rust

# Pi coding agent
# pozri https://github.com/zechnerj/pi-coding-agent pre inštaláciu

# jcode
# pozri https://github.com/1jehuang/jcode pre inštaláciu
```

---

### Krok 3 — Konfigurujte cez Dashboard

1. Prejdite na `http://localhost:20128/dashboard/cli-code`
2. Nájdite svoj nástroj v mriežke
3. Kliknite na kartu, aby ste otvorili detailnú stránku nástroja
4. Vyberte svoj API kľúč a základnú URL
5. Kliknite na **Použiť konfiguráciu** alebo skopírujte manuálny konfiguračný úryvok

---

### Krok 4 — Nastavte globálne premenné prostredia

```bash
# OmniRoute univerzálny koncový bod
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI číta GOOGLE_GEMINI_BASE_URL na ROOT (jeho SDK pridáva /v1beta/... samo)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Pre **ďalší server** nahraďte `localhost:20128` IP adresou alebo doménou servera,
> napr. `http://<your-server-ip>:20128`.

---

### Krok 4 — Konfigurujte každý nástroj

#### Claude Code

```bash
# Vytvorte ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Použite unified Anthropic gateway root pre Claude Code. Nepretrhávajte `/v1` tu.

**Test:** `claude "say hello"`

---

#### OpenAI Codex

Moderný Codex (v0.137+) číta `~/.codex/config.toml` iba — starý
`config.yaml` patrí k legacy npm CLI a je ticho ignorovaný. API
kľúč zostáva v premennej prostredia `OMNIROUTE_API_KEY` (`env_key`), nikdy
v súbore:

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

Úplná referencia (profily, `wire_api`, kontextové okná): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

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

> Použite `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> na odoslanie variantov myslenia.

---

#### Cline (CLI alebo VS Code)

**Režim CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Režim VS Code:**
Nastavenia rozšírenia Cline → Poskytovateľ API: `OpenAI Compatible` → Základná URL: `http://localhost:20128/v1`

Alebo použite dashboard OmniRoute → **CLI Tools → Cline → Použiť konfiguráciu**.

---

#### KiloCode (CLI alebo VS Code)

**Režim CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Nastavenia VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Alebo použite dashboard OmniRoute → **CLI Tools → KiloCode → Použiť konfiguráciu**.

---

#### Continue (rozšírenie VS Code)

Upravte `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Reštartujte VS Code po úprave.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Použite toto, keď je VS Code Insiders nakonfigurovaný pre vlastné modely koncových bodov a chcete, aby OmniRoute fungoval bez vlastného poľa hlavičky.

**Odporúčané umiestnenie:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Príklad s tokenizovaným aliasom OmniRoute:**

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

**Poznámky:**

- Nahraďte `sk-your-omniroute-key` API kľúčom vytvoreným v OmniRoute.
- Pole `url` by malo smerovať na `/api/v1/vscode/{token}/chat/completions`.
- Pole `modelsUrl` by malo smerovať na `/api/v1/vscode/{token}/models`.
- Preferujte normálny `/v1` + Bearer hlavičkový tok, keď klient podporuje vlastné hlavičky.
- URL-embedded tokeny sú kompatibilné zálohy a môžu sa objaviť v logoch editora alebo histórii proxy.

---

#### Kiro CLI (Amazon)

```bash
# Prihláste sa do svojho účtu AWS/Kiro:
kiro-cli login

# CLI používa svoju vlastnú autentifikáciu — OmniRoute nie je potrebný ako backend pre Kiro CLI samotný.
# Použite kiro-cli spolu s OmniRoute pre iné nástroje.
kiro-cli status
```

Pre desktopovú aplikáciu **Kiro IDE** použite MITM koncový bod vystavený OmniRoute
pod `/dashboard/cli-tools → Kiro`.

---

## 10. Interný OmniRoute CLI

Binárny súbor `omniroute` poskytuje príkazy pre životný cyklus servera, nastavenie, diagnostiku a správu poskytovateľov. Vstupný bod: `bin/omniroute.mjs`.

```bash
omniroute                              # Spustiť server (predvolený port 20128)
omniroute setup                        # Interaktívny sprievodca nastavením
omniroute doctor                       # Skontrolovať konfiguráciu, DB, porty, runtime
omniroute providers list               # Konfigurované pripojenia poskytovateľov
omniroute providers test-all           # Otestovať každé aktívne pripojenie
omniroute reset-password               # Obnoviť heslo administrátora
omniroute logs                         # Streamovať protokoly požiadaviek
omniroute health                       # Podrobné zdravie (prerušovače, cache, pamäť)
omniroute --version                    # Vytlačiť verziu
omniroute --help                       # Zobraziť všetky príkazy
```

### Nastavenie a inicializácia

```bash
omniroute setup                        # Interaktívny sprievodca nastavením
omniroute setup --non-interactive      # CI/automatizačný režim (číta env premenné + prapory)
omniroute setup --password '<value>'   # Nastaviť heslo administrátora priamo
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Pridať a otestovať poskytovateľa v jednom kroku
```

Rozpoznané environmentálne premenné pre neinteraktívne nastavenie:

| Var                 | Účel                                                                   |
| ------------------- | ---------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | API kľúč poskytovateľa (viazaný na `--api-key` cez Commander `.env()`) |
| `DATA_DIR`          | Prepisuje adresár dát OmniRoute                                        |

Všetky ostatné neinteraktívne vstupy sú odovzdávané ako prapory, nie environmentálne premenné:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(pozri možnosti `omniroute setup` vyššie).

### Diagnostika

```bash
omniroute doctor                       # Skontrolovať konfiguráciu, DB, porty, runtime, pamäť, životnosť
omniroute doctor --json                # Strojovo čitateľný JSON
omniroute doctor --no-liveness         # Preskočiť HTTP health probe
omniroute doctor --host 0.0.0.0        # Prepisovať hostiteľov životnosti
omniroute doctor --liveness-url <url>  # Úplný URL prepis koncového bodu zdravia
```

Doktor vykonáva tieto kontroly: `Konfigurácia`, `Databáza`, `Úložisko/šifrovanie`,
`Dostupnosť portu`, `Node runtime`, `Nativný binárny` (better-sqlite3),
`Pamäť` a `Životnosť servera`. Ukončí sa s nenulovým kódom, ak akákoľvek kontrola zlyhá.

### Správa poskytovateľov

```bash
omniroute providers available                       # Katalóg poskytovateľov OmniRoute
omniroute providers available --search openai       # Filtrovať katalóg podľa id/názvu/aliasu/kategórie
omniroute providers available --category api-key    # Filtrovať podľa kategórie (api-key, oauth, free, ...)
omniroute providers available --json                # Strojovo čitateľný JSON

omniroute providers list                            # Konfigurované pripojenia poskytovateľov
omniroute providers list --json

omniroute providers test <id|name>                  # Otestovať jedno konfigurované pripojenie
omniroute providers test-all                        # Otestovať každé aktívne pripojenie
omniroute providers validate                        # Lokálna štrukturálna validácia
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Existujúci OAuth tok
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` sú API-prvé a preto fungujú proti
aktívnemu lokálnemu alebo vzdialenému kontextu. Vstup poverení by mal používať
`--credential-stdin` alebo `--credential-env`; `--dry-run --json` hlási iba
redigovanú prítomnosť/tvar. `providers available` číta katalóg OmniRoute;
`providers list/test/test-all/validate` si zachovávajú svoje lokálne SQLite správanie a
nevyžadujú, aby server bežal.

### Obnova a reset

```bash
omniroute reset-password                # Obnoviť heslo administrátora (tiež: omniroute-reset-password)
omniroute reset-encrypted-columns       # Zobraziť varovanie + suchý beh pre reset šifrovaných poverení
omniroute reset-encrypted-columns --force  # Skutočne nulovať šifrované poverenia v SQLite
```

### Export poverení (⚠ zaobchádzajte opatrne)

```bash
omniroute auth export                                 # Zobraziť varovanie + bránu potvrdenia — žiadny prístup k DB
omniroute auth export --force                          # ExportOVAŤ VŠETKY DEŠIFROVANÉ poverenia pripojení do stdout ako JSON
omniroute auth export --force --id <id>                 # Exportovať iba zodpovedajúce pripojenie
omniroute auth export --force --format env               # Vydávať riadky OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Zapísať do súboru (vytvoreného s 0600 povoleniami)
```

`auth export` je **iba lokálny** (priamy čítanie SQLite, žiadna HTTP trasa) a úmyselne tlačí/zapisuje
**nešifrované** hodnoty `apiKey`/`accessToken`/`refreshToken`/`idToken` — to je funkcia, nie
chyba. Nič nie je čítané z databázy a nič nie je dešifrované bez `--force`. Varovný banner na stderr
vždy tlačí pred akýmkoľvek nešifrovaným výstupom. Vyžaduje nastavenie `STORAGE_ENCRYPTION_KEY`.
Pole, ktoré sa nepodarilo dešifrovať (starnúci kľúč, poškodený ciphertext) je hlásené ako
`<field>DecryptFailed: true` namiesto toho, aby sa zrušil celý export alebo unikol základná chyba.

### Iné podpríkazy

Tieto predpokladajú bežiaci server OmniRoute, pokiaľ nie je uvedené inak:

```bash
omniroute status                       # Komplexný stav runtime
omniroute logs                         # Streamovať protokoly požiadaviek (--json, --search, --follow)
omniroute config show                  # Zobraziť aktuálnu konfiguráciu

omniroute provider list                # Zoznam dostupných poskytovateľov (alias príkazu providers list)
omniroute provider add                 # Registrovať OmniRoute ako poskytovateľa na nástroji
omniroute keys add | list | remove     # Spravovať API kľúče
omniroute models [provider]            # Zoznam modelov (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Snapshot konfigurácie + DB
omniroute restore                      # Obnoviť z predchádzajúceho snapshotu

omniroute health                       # Podrobné zdravie (prerušovače, cache, pamäť)
omniroute quota                        # Využitie kvóty poskytovateľa
omniroute cache                        # Stav cache
omniroute cache clear                  # Vyčistiť sémantické + podpisové cache

omniroute mcp status | restart         # Stav servera MCP / reštart
omniroute a2a status | card            # Stav servera A2A / karta agenta

omniroute tunnel list | create | stop  # Spravovať tunely (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Skontrolovať / nastaviť env premenné (dočasné)

omniroute test                         # Test konektivity poskytovateľa
omniroute update                       # Skontrolovať aktualizácie
omniroute completion                   # Generovať dokončenie shellu
```

### Bežné prapory

| Prapor              | Popis                                                    |
| ------------------- | -------------------------------------------------------- |
| `--no-open`         | Neotvárať automaticky prehliadač pri spustení            |
| `--port <n>`        | Prepisovať API port (predvolený 20128)                   |
| `--mcp`             | Spustiť ako server MCP cez stdio (pre IDE)               |
| `--non-interactive` | CI režim (žiadne výzvy; číta z env/prapory)              |
| `--json`            | Strojovo čitateľný JSON výstup (doctor, providers, atď.) |
| `--help`, `-h`      | Zobraziť pomoc špecifickú pre príkaz                     |
| `--version`, `-v`   | Vytlačiť nainštalovanú verziu                            |

---

## Dostupné API koncové body

| Koncový bod                | Popis                                   | Použiť pre                             |
| -------------------------- | --------------------------------------- | -------------------------------------- |
| `/v1/chat/completions`     | Štandardný chat (všetci poskytovatelia) | Všetky moderné nástroje                |
| `/v1/responses`            | API odpovedí (formát OpenAI)            | Codex, agentické pracovné toky         |
| `/v1/completions`          | Dedičstvo textových doplnení            | Staršie nástroje používajúce `prompt:` |
| `/v1/embeddings`           | Textové embeddings                      | RAG, vyhľadávanie                      |
| `/v1/images/generations`   | Generovanie obrázkov                    | GPT-Image, Flux, atď.                  |
| `/v1/audio/speech`         | Text na reč                             | ElevenLabs, OpenAI TTS                 |
| `/v1/audio/transcriptions` | Reč na text                             | Deepgram, AssemblyAI                   |

Príklady pripravené na vloženie s tokenizovanou OmniRoute URL:

```txt
Token príklad: sk-a3ab3c080beaee3a-69f4a4-070d71af

Štandardný OpenAI základ: http://localhost:20128/v1
VS Code modely: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code odpovede: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama tagy: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Riešenie problémov

| Chyba                                            | Príčina                      | Oprava                                                    |
| ------------------------------------------------ | ---------------------------- | --------------------------------------------------------- |
| `Connection refused`                             | OmniRoute nebeží             | `omniroute serve`                                         |
| `401 Unauthorized`                               | Nesprávny API kľúč           | Skontrolujte v `/dashboard/api-manager`                   |
| `No combo configured`                            | Žiadny aktívny routing combo | Nastavte v `/dashboard/combos`                            |
| CLI zobrazuje "not installed"                    | Binárny súbor nie je v PATH  | Skontrolujte `which <command>`                            |
| Dashboard zobrazuje "not detected" po inštalácii | Cache je zastarané           | Kliknite na "⟳ Obnoviť detekciu" v dashboarde             |
| Starý odkaz `/dashboard/cli-tools`               | Záložka pred v3.8.6          | Automaticky presmerované na `/dashboard/cli-code` (308)   |
| Starý odkaz `/dashboard/agents`                  | Záložka pred v3.8.6          | Automaticky presmerované na `/dashboard/acp-agents` (308) |
