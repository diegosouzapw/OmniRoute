# CLI-TOOLS (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI Nástroje — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Nástroje — OmniRoute

Poslední aktualizace: 2026-08-18

OmniRoute integruje tři kategorie CLI nástrojů rozložené na třech specializovaných stránkách dashboardu:

| Stránka        | Trasa                   | Koncept                                                                                       | Počet       |
| -------------- | ----------------------- | --------------------------------------------------------------------------------------------- | ----------- |
| **CLI Kód**    | `/dashboard/cli-code`   | Nástroje pro kódování, které směřujete na OmniRoute (Klient → CLI → OmniRoute → Poskytovatel) | 26          |
| **CLI Agenti** | `/dashboard/cli-agents` | Autonomní agenti, které směřujete na OmniRoute (stejný tok, širší rozsah)                     | 8           |
| **ACP Agenti** | `/dashboard/acp-agents` | CLIs, které OmniRoute spouští jako backend přes stdio/ACP (obrácený tok)                      | viz registr |

Zastaralé trasy přesměrovávají přes 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Jak to funguje

```
CLI Kód / CLI Agenti (tok spotřeby):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (vše směřuje na OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute směruje k správnému poskytovateli)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agenti (obrácený tok spuštění):
    Klientský požadavek → OmniRoute → spouští CLI přes stdio/ACP → odpověď
```

**Výhody:**

- Jeden API klíč pro správu všech nástrojů
- Sledování nákladů napříč všemi CLIs v dashboardu
- Přepínání modelů bez přeconfigurování každého nástroje
- Funguje lokálně i na vzdálených serverech (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Automatická konfigurace s `setup-*`

Nemusíte psát konfiguraci každého nástroje ručně. OmniRoute dodává příkaz `setup-*`
pro každý podporovaný CLI, který čte **živý** katalog modelů z běžícího
OmniRoute (lokálního nebo vzdáleného) a zapisuje vlastní konfiguraci nástroje na vašem stroji:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Každý přijímá `--remote <url> --api-key <key>` (konfigurovat lokální nástroj proti
vzdálenému OmniRoute), `--dry-run` (náhled bez zápisu) a `--port`. Nástroje
bez automatického objevování modelu (Cline, Kilo, Roo, Goose, Aider, Qwen) berou
`--model <id>` (a `--yes` pro neinteraktivní běhy). Pro spuštění CLI s
odpovídajícím prostředím a bez jakéhokoli zápisu konfigurace použijte generický
`omniroute run <target>` launcher (claude, codex, aider, goose, opencode, qwen,
gemini — cíle a aliasy pocházejí z `bin/cli/cli-manifest.mjs`); zastaralé
per-tool launchery `omniroute launch` (Claude Code) a `omniroute launch-codex`
(Codex) zůstávají k dispozici. Gemini CLI je pouze pro spuštění: je to cíl
`omniroute run`, ale nemá žádný `setup-*`/`configure` recept.

> **Úplná reference:** hlavní tabulka — co každý příkaz zapisuje, každý příznak,
> lokální vs vzdálený, a které nástroje chtějí příponu `/v1` — se nachází v
> **[CLI Integrace](../guides/CLI-INTEGRATIONS.md)**.

### Spuštění těchto příkazů uvnitř kontejneru

Příkaz `setup-*` provedený uvnitř kontejneru OmniRoute zapisuje do
vlastního domova kontejneru, který žádný hostitelský CLI nečte a který zmizí s
kontejnerem. OmniRoute to detekuje a ukončuje s kódem `2` s instrukcemi místo
zápisu. Dva podporované způsoby vpřed — nainstalovat CLI na hostiteli a
`omniroute connect` do kontejneru, nebo bind-mount adresáře konfigurace a nastavit
`CLI_CONFIG_HOME` (profil compose `host`). Každý příkaz `setup-*`, plus
`omniroute configure` a `omniroute config set`, přijímá
`--allow-container-write`, když je skutečně zamýšleno konfigurovat vlastní CLIs
kontejneru; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` dělá to samé pro
server. Viz
[Docker Průvodce → Konfigurace hostitelských CLI nástrojů](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

**apply endpoint** dashboardu (`POST /api/cli-tools/apply`) vynucuje
stejnou ochranu: v kontejneru, zápis, jehož cíl není bind-mounted z hostitele,
odpovídá **`422`** s `containerEphemeralTarget: true`, bezpečným chybovým
textem a — pro nástroje s hostitelským receptem (claude, codex, opencode, cline,
kilo, continue) — `hostSetupCommand` (např. `omniroute setup-opencode`), který
se má spustit na hostiteli místo; nic není zapsáno. `dryRun: true` stále funguje
v režimu kontejneru a vrací vygenerovaný obsah + cílovou cestu bez dotyku disku,
takže si můžete prohlédnout z dashboardu a aplikovat na hostiteli. Toto chování je
úmyslné a chráněné regresí pomocí
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — nikdy "neopravujte" 422
odstraněním ochrany.

---

## Zdroj pravdy

Jednotný katalog se nachází v `src/shared/constants/cliTools.ts` jako `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Každý záznam má tyto pole (definováno v `src/shared/schemas/cliCatalog.ts`):

| Pole                                            | Typ                                                          | Popis                                                            |
| ----------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Na které stránce se nástroj zobrazuje                            |
| `vendor`                                        | `string`                                                     | Původ nástroje ("Anthropic", "OSS (P. Gauthier)")                |
| `acpSpawnable`                                  | `boolean`                                                    | Také použitelný jako ACP Agent (zobrazená ikona)                 |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Úroveň podpory vlastního koncového bodu. `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Mechanismus konfigurace                                          |
| `id`, `name`, `color`, `description`, `docsUrl` | standard                                                     | Základní zobrazení polí                                          |

Záznamy s `baseUrlSupport: "none"` **nejsou zobrazeny** na stránkách dashboardu — jsou registrovány v MITM backlogu pro plán 11 (viz `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Úrovně schopností (katalogizované × detekovatelné × konfigurovatelné × spustitelné)

Ne každý katalogizovaný nástroj je detekovatelný, konfigurovatelný nebo spustitelný. Každá úroveň má jeden
deklarující zdroj a test odchylek je udržuje v souladu:

| Úroveň               | Význam                                                                              | Deklarováno                                                       |
| -------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Katalogizované**   | Zobrazuje se v katalogu dashboardu (název, dodavatel, dokumentace, typ konfigurace) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Detekovatelné**    | Detekce binárních/config, kontroly zdraví, cesty k konfiguraci                      | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **Konfigurovatelné** | Podporováno `omniroute configure <cli>` (existuje recept na nastavení)              | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Spustitelné**      | Podporováno `omniroute run <target>` (definována injekce env/args)                  | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` je kanonický spustitelný manifest pro příkazy CLI
povrchů: `run`, `configure` a generátory shell-completion odvozují své
seznamy cílů, rozlišení aliasů (například `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
a zapojení příznaku `--model` z něj. Ochrana proti odchylkám
`tests/unit/cli/cli-manifest-drift.test.ts` zajišťuje, že manifest, runtime
katalog, UI katalog a každý spotřebitelský povrch zůstávají synchronizovány — cíl přidaný do
jednoho povrchu bez ostatních způsobí selhání testu místo tichého odchýlení.

## 1. Katalog kódu CLI (26 nástrojů)

Všechny nástroje, které se objevují v `/dashboard/cli-code`. Ty, které mají `baseUrlSupport: none`, jsou propojeny prostřednictvím MITM nebo manuálního průvodce místo vlastního základního URL:

| id           | název                   | dodavatel           | baseUrlSupport | typKonfigurace | acpSpawnable |
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

Nástroje s `baseUrlSupport: "partial"` zobrazují odznak "⚠ Částečná základní URL" na kartě řídicího panelu.

## 2. Katalog CLI agentů (8 nástrojů)

Autonomní agenti, kteří se objevují v `/dashboard/cli-agents`:

| id           | název            | dodavatel                | podporaBaseUrl | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | plná           | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | plná           | true         |
| goose        | Goose            | Block / Linux Foundation | plná           | true         |
| interpreter  | Open Interpreter | OSS                      | plná           | true         |
| warp         | Warp AI          | Warp Inc.                | částečná       | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | plná           | false        |
| omp          | Oh My Pi         | OSS                      | plná           | true         |
| letta        | Letta CLI        | Letta                    | plná           | false        |

---

## 3. ACP agenti (/dashboard/acp-agents)

Tato stránka (přejmenována z `/dashboard/agents`) zobrazuje CLI, které může OmniRoute **vytvářet** jako backendové výkonné enginy prostřednictvím protokolu stdio/ACP. Katalog je udržován odděleně v `src/lib/acp/registry.ts` a **není** stejný jako `CLI_TOOLS`.

---

## 4. MITM backlog (není zobrazen v dashboardu)

Následující CLI nativně nepodporují vlastní základní URL a **nejsou uvedeny** na stránkách CLI kódu nebo CLI agentů. Jsou kandidáty na MITM interceptaci v plánu 11:

| CLI                 | Důvod                                                     |
| ------------------- | --------------------------------------------------------- |
| windsurf            | BYOK omezeno na vybrané modely Claude + firemní URL/token |
| amp                 | Uzavřený ekosystém (Sourcegraph)                          |
| amazon-q / kiro-cli | AWS SSO autentizace, žádná vlastní URL                    |
| cowork              | Anthropic Desktop, žádný konfigurovatelný koncový bod     |

Viz `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` pro úplný křížový odkaz.

---

## 5. API pro detekci dávkových nástrojů

Všechny detekce nástrojů jsou agregovány prostřednictvím jednoho koncového bodu:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (stejné jako ostatní `/api/cli-tools/` trasy)
- Vrací: `Record<toolId, ToolBatchStatus>` (typ: `src/shared/types/cliBatchStatus.ts`)
- Strategie: `Promise.all` pro všechny nástroje, 5s timeout na nástroj
- Cache: v paměti LRU indexováno podle konfiguračního souboru `mtime`. Cache je neplatná, když se mtime změní. Resetováno při restartu serveru.

Tvar odpovědi na nástroj:

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
  error?: string; // sanitizováno, žádné zásobníkové stopy
}
```

## 6. Zpracovatelé nastavení pro nové nástroje

Nové nástroje s `configType: "custom"` mají vyhrazené API trasy pro nastavení:

| Trasa                                       | Nástroj                                                                    |
| ------------------------------------------- | -------------------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                                    |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                                    |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                                     |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primární + legacy `~/.deepseek` synchronizace) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                      |
| `POST /api/cli-tools/pi-settings`           | Pi kódovací agent                                                          |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                      |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + vyhrazený `.env` klíč)                |

Všechny trasy používají `sanitizeErrorMessage()` pro chybové odpovědi (Pevné pravidlo #12).

---

## 7. Architektura stránek dashboardu

### CLI Kód (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — serverová komponenta
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — klientská mřížka
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — stránka detailu nástroje
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 specializovaných karet nástrojů + `ToolDetailClient.tsx`

### CLI Agenti (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — serverová komponenta
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — klientská mřížka
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — znovu používá `ToolDetailClient`

### ACP Agenti (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — serverová komponenta (přesunuta z `agents/`)

### Sdílené UI komponenty (`src/shared/components/cli/`)

| Soubor                  | Účel                                                       |
| ----------------------- | ---------------------------------------------------------- |
| `CliToolCard.tsx`       | Chytrá stavová karta (detekce + konfigurace + koncový bod) |
| `CliConceptCard.tsx`    | Karta vysvětlení konceptu na stránce                       |
| `CliComparisonCard.tsx` | Srovnání ve třech sloupcích napříč typy CLI                |
| `BaseUrlSelect.tsx`     | Rozbalovací nabídka koncového bodu (Místní/Cloud/Vlastní)  |
| `ApiKeySelect.tsx`      | Výběr API klíče                                            |
| `ManualConfigModal.tsx` | Modální okno pro kopírovatelný konfigurační úryvek         |

### Sdílený hook (`src/shared/hooks/cli/`)

| Soubor                    | Účel                                                                     |
| ------------------------- | ------------------------------------------------------------------------ |
| `useToolBatchStatuses.ts` | Načítá `/api/cli-tools/all-statuses`, spravuje stav načítání/aktualizace |

## 8. i18n

Nové namespace přidány v plánu 14 F9:

| Namespace   | Účel                                                                                  |
| ----------- | ------------------------------------------------------------------------------------- |
| `cliCommon` | Sdílené řetězce (popisky karet, texty konceptů/porovnání, popisky detailních stránek) |
| `cliCode`   | Řetězce stránek CLI kódu                                                              |
| `cliAgents` | Řetězce stránek CLI agentů                                                            |
| `acpAgents` | Řetězce stránek ACP agentů                                                            |

Úplné překlady do PT-BR a EN jsou k dispozici. 39 dalších lokalizací automaticky přechází na EN prostřednictvím sloučení na úrovni namespace v `src/i18n/request.ts`.

---

## 9. Rychlý start

### Krok 1 — Získejte API klíč OmniRoute

1. Otevřete `/dashboard/api-manager` → **Vytvořit API klíč**
2. Dejte mu název (např. `cli-tools`) a vyberte všechna oprávnění
3. Zkopírujte klíč — budete ho potřebovat pro každý CLI níže

> Váš klíč vypadá takto: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Krok 2 — Nainstalujte CLI nástroje

Všechny nástroje založené na npm vyžadují Node.js 22.22.2+ nebo 24.x:

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

# Google Gemini CLI (spustitelné přes `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Založené na Rustu

# Pi coding agent
# viz https://github.com/zechnerj/pi-coding-agent pro instalaci

# jcode
# viz https://github.com/1jehuang/jcode pro instalaci
```

---

### Krok 3 — Nakonfigurujte přes Dashboard

1. Přejděte na `http://localhost:20128/dashboard/cli-code`
2. Najděte svůj nástroj v mřížce
3. Klikněte na kartu pro otevření detailní stránky nástroje
4. Vyberte svůj API klíč a základní URL
5. Klikněte na **Použít konfiguraci** nebo zkopírujte ručně konfigurační úryvek

---

### Krok 4 — Nastavte globální proměnné prostředí

```bash
# OmniRoute Univerzální koncový bod
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI čte GOOGLE_GEMINI_BASE_URL na ROOT (jeho SDK přidává /v1beta/... samo)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Pro **vzdálený server** nahraďte `localhost:20128` IP adresou nebo doménou serveru,
> např. `http://<your-server-ip>:20128`.

---

### Krok 4 — Nakonfigurujte každý nástroj

#### Claude Code

```bash
# Vytvořte ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Použijte sjednocený kořen brány Anthropic pro Claude Code. Nepřidávejte zde `/v1`.

**Test:** `claude "say hello"`

---

#### OpenAI Codex

Moderní Codex (v0.137+) čte pouze `~/.codex/config.toml` — starý
`config.yaml` patří k legacy npm CLI a je tiše ignorován. API
klíč zůstává v proměnné prostředí `OMNIROUTE_API_KEY` (`env_key`), nikdy
uvnitř souboru:

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

Úplná reference (profily, `wire_api`, kontextová okna): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

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

> Použijte `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> pro odeslání variant myšlení.

---

#### Cline (CLI nebo VS Code)

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
Nastavení rozšíření Cline → Poskytovatel API: `OpenAI Compatible` → Základní URL: `http://localhost:20128/v1`

Nebo použijte dashboard OmniRoute → **CLI Tools → Cline → Použít konfiguraci**.

---

#### KiloCode (CLI nebo VS Code)

**Režim CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Nastavení VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Nebo použijte dashboard OmniRoute → **CLI Tools → KiloCode → Použít konfiguraci**.

---

#### Continue (rozšíření VS Code)

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

Po úpravě restartujte VS Code.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Použijte toto, když je VS Code Insiders nakonfigurován pro vlastní modely koncových bodů a chcete, aby OmniRoute fungoval bez vlastního pole hlavičky.

**Doporučené umístění:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Příklad použití tokenizovaného aliasu OmniRoute:**

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

- Nahraďte `sk-your-omniroute-key` API klíčem vytvořeným v OmniRoute.
- Pole `url` by mělo směřovat na `/api/v1/vscode/{token}/chat/completions`.
- Pole `modelsUrl` by mělo směřovat na `/api/v1/vscode/{token}/models`.
- Preferujte normální `/v1` + Bearer hlavičkový tok, když klient podporuje vlastní hlavičky.
- Tokeny vložené do URL jsou záložním řešením kompatibility a mohou se objevit v protokolech editoru nebo historii proxy.

---

#### Kiro CLI (Amazon)

```bash
# Přihlaste se ke svému účtu AWS/Kiro:
kiro-cli login

# CLI používá vlastní autentizaci — OmniRoute není potřebný jako backend pro Kiro CLI samotné.
# Používejte kiro-cli spolu s OmniRoute pro další nástroje.
kiro-cli status
```

Pro desktopovou aplikaci **Kiro IDE** použijte MITM koncový bod vystavený OmniRoute
pod `/dashboard/cli-tools → Kiro`.

---

## 10. Interní OmniRoute CLI

Binární soubor `omniroute` poskytuje příkazy pro životní cyklus serveru, nastavení, diagnostiku a správu poskytovatelů. Vstupní bod: `bin/omniroute.mjs`.

```bash
omniroute                              # Spustit server (výchozí port 20128)
omniroute setup                        # Interaktivní nastavení
omniroute doctor                       # Zkontrolovat konfiguraci, DB, porty, runtime
omniroute providers list               # Seznam nakonfigurovaných připojení poskytovatelů
omniroute providers test-all           # Otestovat každé aktivní připojení
omniroute reset-password               # Resetovat heslo administrátora
omniroute logs                         # Streamovat logy požadavků
omniroute health                       # Podrobný stav (přerušovače, cache, paměť)
omniroute --version                    # Vytisknout verzi
omniroute --help                       # Zobrazit všechny příkazy
```

### Nastavení a inicializace

```bash
omniroute setup                        # Interaktivní nastavení
omniroute setup --non-interactive      # CI/automatizační režim (čte proměnné prostředí + příznaky)
omniroute setup --password '<value>'   # Nastavit heslo administrátora přímo
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Přidat a otestovat poskytovatele v jednom kroku
```

Rozpoznané proměnné prostředí pro neinteraktivní nastavení:

| Var                 | Účel                                                                   |
| ------------------- | ---------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | API klíč poskytovatele (svázaný s `--api-key` přes Commander `.env()`) |
| `DATA_DIR`          | Přepsat adresář dat OmniRoute                                          |

Všechny ostatní neinteraktivní vstupy jsou předávány jako příznaky, nikoli jako proměnné prostředí:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(podívejte se na možnosti `omniroute setup` výše).

### Diagnostika

```bash
omniroute doctor                       # Zkontrolovat konfiguraci, DB, porty, runtime, paměť, životnost
omniroute doctor --json                # Strojově čitelný JSON
omniroute doctor --no-liveness         # Přeskočit HTTP health probe
omniroute doctor --host 0.0.0.0        # Přepsat hostitele životnosti
omniroute doctor --liveness-url <url>  # Úplné přepsání URL koncového bodu zdraví
```

Doktor provádí tyto kontroly: `Konfigurace`, `Databáze`, `Úložiště/šifrování`,
`Dostupnost portu`, `Node runtime`, `Nativní binární` (better-sqlite3),
`Paměť` a `Životnost serveru`. Ukončí se s nenulovým kódem, pokud jakákoli kontrola selže.

### Správa poskytovatelů

```bash
omniroute providers available                       # Katalog poskytovatelů OmniRoute
omniroute providers available --search openai       # Filtrovat katalog podle id/název/alias/kategorie
omniroute providers available --category api-key    # Filtrovat podle kategorie (api-key, oauth, free, ...)
omniroute providers available --json                # Strojově čitelný JSON

omniroute providers list                            # Seznam nakonfigurovaných připojení poskytovatelů
omniroute providers list --json

omniroute providers test <id|name>                  # Otestovat jedno nakonfigurované připojení
omniroute providers test-all                        # Otestovat každé aktivní připojení
omniroute providers validate                        # Lokální strukturovaná validace
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Existující OAuth tok
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` jsou API-first a proto fungují proti
aktivnímu místnímu nebo vzdálenému kontextu. Vstup pro pověření by měl používat
`--credential-stdin` nebo `--credential-env`; `--dry-run --json` hlásí pouze
redigovanou přítomnost/tvar. `providers available` čte katalog OmniRoute;
`providers list/test/test-all/validate` si zachovávají své místní SQLite chování a
nevyžadují, aby server běžel.

### Obnova a reset

```bash
omniroute reset-password                # Resetovat heslo administrátora (také: omniroute-reset-password)
omniroute reset-encrypted-columns       # Zobrazit varování + dry-run pro reset šifrovaných pověření
omniroute reset-encrypted-columns --force  # Opravuji šifrovaná pověření v SQLite
```

### Export pověření (⚠ zacházejte opatrně)

```bash
omniroute auth export                                 # Zobrazit varování + potvrzovací bránu — žádný přístup k DB
omniroute auth export --force                          # ExportOVAT VŠECHNA DEŠIFROVANÁ pověření připojení do stdout jako JSON
omniroute auth export --force --id <id>                 # Exportovat pouze odpovídající připojení
omniroute auth export --force --format env               # Vydat řádky OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Zapsat do souboru (vytvořeno s 0600 oprávněními)
```

`auth export` je **pouze lokální** (přímé čtení SQLite, žádná HTTP trasa) a záměrně tiskne/zapisuje
**čistý text** `apiKey`/`accessToken`/`refreshToken`/`idToken` hodnoty — to je funkce, nikoli
chyba. Nic není čteno z databáze a nic není dešifrováno, bez `--force`. Varovný banner na stderr
se vždy tiskne před jakýmkoli čistým textem. Vyžaduje nastavení `STORAGE_ENCRYPTION_KEY`.
Pole, které se nepodaří dešifrovat (stará klíč, poškozený ciphertext), je hlášeno jako
`<field>DecryptFailed: true` místo přerušení celého exportu nebo úniku základní chyby.

### Další podpříkazy

Tyto předpokládají běžící server OmniRoute, pokud není uvedeno jinak:

```bash
omniroute status                       # Komplexní stav runtime
omniroute logs                         # Streamovat logy požadavků (--json, --search, --follow)
omniroute config show                  # Zobrazit aktuální konfiguraci

omniroute provider list                # Seznam dostupných poskytovatelů (alias poskytovatelů seznam)
omniroute provider add                 # Registrovat OmniRoute jako poskytovatele na nástroji
omniroute keys add | list | remove     # Spravovat API klíče
omniroute models [provider]            # Seznam modelů (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Snapshot konfigurace + DB
omniroute restore                      # Obnovit z předchozího snapshotu

omniroute health                       # Podrobný stav (přerušovače, cache, paměť)
omniroute quota                        # Využití kvóty poskytovatele
omniroute cache                        # Stav cache
omniroute cache clear                  # Vymazat sémantické + podpisové cache

omniroute mcp status | restart         # Stav serveru MCP / restart
omniroute a2a status | card            # Stav serveru A2A / agent karta

omniroute tunnel list | create | stop  # Spravovat tunely (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Zkontrolovat / nastavit proměnné prostředí (dočasné)

omniroute test                         # Test připojení poskytovatele
omniroute update                       # Zkontrolovat aktualizace
omniroute completion                   # Generovat shell completion
```

### Běžné příznaky

| Příznak             | Popis                                                       |
| ------------------- | ----------------------------------------------------------- |
| `--no-open`         | Neotevírat automaticky prohlížeč při spuštění               |
| `--port <n>`        | Přepsat API port (výchozí 20128)                            |
| `--mcp`             | Spustit jako MCP server přes stdio (pro IDE)                |
| `--non-interactive` | CI režim (žádné výzvy; čte z proměnných prostředí/příznaků) |
| `--json`            | Strojově čitelný JSON výstup (doktor, poskytovatelé, atd.)  |
| `--help`, `-h`      | Zobrazit konkrétní pomoc pro příkaz                         |
| `--version`, `-v`   | Vytisknout nainstalovanou verzi                             |

---

## Dostupné API koncové body

| Koncový bod                | Popis                                   | Použití                               |
| -------------------------- | --------------------------------------- | ------------------------------------- |
| `/v1/chat/completions`     | Standardní chat (všichni poskytovatelé) | Všechny moderní nástroje              |
| `/v1/responses`            | API odpovědí (formát OpenAI)            | Codex, agentické pracovní toky        |
| `/v1/completions`          | Zastaralé textové doplnění              | Starší nástroje používající `prompt:` |
| `/v1/embeddings`           | Textová embeddings                      | RAG, vyhledávání                      |
| `/v1/images/generations`   | Generování obrázků                      | GPT-Image, Flux, atd.                 |
| `/v1/audio/speech`         | Text na řeč                             | ElevenLabs, OpenAI TTS                |
| `/v1/audio/transcriptions` | Řeč na text                             | Deepgram, AssemblyAI                  |

Příklady připravené k vložení s tokenizovanou OmniRoute URL:

```txt
Token příklad: sk-a3ab3c080beaee3a-69f4a4-070d71af

Standardní OpenAI základna: http://localhost:20128/v1
VS Code modely: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code odpovědi: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama tagy: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Řešení problémů

| Chyba                                           | Příčina                           | Oprava                                                    |
| ----------------------------------------------- | --------------------------------- | --------------------------------------------------------- |
| `Connection refused`                            | OmniRoute neběží                  | `omniroute serve`                                         |
| `401 Unauthorized`                              | Špatný API klíč                   | Zkontrolujte v `/dashboard/api-manager`                   |
| `No combo configured`                           | Žádná aktivní routovací kombinace | Nastavte v `/dashboard/combos`                            |
| CLI zobrazuje "not installed"                   | Binární soubor není v PATH        | Zkontrolujte `which <command>`                            |
| Dashboard zobrazuje "not detected" po instalaci | Cache je zastaralá                | Klikněte na "⟳ Obnovit detekci" v dashboardu              |
| Starý odkaz `/dashboard/cli-tools`              | Záložka před v3.8.6               | Automaticky přesměrováno na `/dashboard/cli-code` (308)   |
| Starý odkaz `/dashboard/agents`                 | Záložka před v3.8.6               | Automaticky přesměrováno na `/dashboard/acp-agents` (308) |
