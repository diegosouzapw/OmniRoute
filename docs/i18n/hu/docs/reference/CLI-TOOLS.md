# CLI-TOOLS (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI Eszközök — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Eszközök — OmniRoute

Utolsó frissítés: 2026-08-18

Az OmniRoute három kategóriájú CLI eszközt integrál, amelyek három dedikált irányítópult oldalon találhatók:

| Oldal            | Útvonal                 | Fogalom                                                                                     | Szám                  |
| ---------------- | ----------------------- | ------------------------------------------------------------------------------------------- | --------------------- |
| **CLI Kódok**    | `/dashboard/cli-code`   | Kódoló eszközök, amelyeket az OmniRoute-ra irányít (Ügyfél → CLI → OmniRoute → Szolgáltató) | 26                    |
| **CLI Ügynökök** | `/dashboard/cli-agents` | Autonóm ügynökök, amelyeket az OmniRoute-ra irányít (ugyanaz az áramlás, szélesebb kör)     | 8                     |
| **ACP Ügynökök** | `/dashboard/acp-agents` | CLI-k, amelyeket az OmniRoute háttérben indít stdio/ACP-n keresztül (fordított áramlás)     | lásd a nyilvántartást |

A régi útvonalak 308-as átirányítással működnek: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Hogyan működik

```
CLI Kódok / CLI Ügynökök (fogyasztási áramlás):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Ügynök / Goose / ...
           │
           ▼  (mind az OmniRoute-ra mutat)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (az OmniRoute a megfelelő szolgáltatóhoz irányít)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Ügynökök (fordított indítási áramlás):
    Ügyfél kérés → OmniRoute → CLI indítása stdio/ACP-n keresztül → válasz
```

**Előnyök:**

- Egy API kulcs az összes eszköz kezelésére
- Költségkövetés az összes CLI-n az irányítópulton
- Modellváltás anélkül, hogy minden eszközt újra kellene konfigurálni
- Helyben és távoli szervereken is működik (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Automatikus konfigurálás `setup-*`-pal

Nem kell kézzel megírnia minden eszköz konfigurációját. Az OmniRoute egy `setup-*`
parancsot biztosít minden támogatott CLI-hez, amely beolvassa az **élő** modell katalógust egy futó
OmniRoute-ból (helyi vagy távoli) és megírja az eszköz saját konfigurációját az Ön gépén:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Mindegyik elfogadja a `--remote <url> --api-key <key>` (helyi eszköz konfigurálása egy
távoli OmniRoute-hoz), `--dry-run` (előnézet írás nélkül), és `--port`. Azok az eszközök,
amelyek nem rendelkeznek modell automatikus felfedezéssel (Cline, Kilo, Roo, Goose, Aider, Qwen)
`--model <id>`-t (és `--yes`-t interaktív futtatásokhoz) igényelnek. A CLI indításához a
megfelelő környezeti változókkal és anélkül, hogy bármilyen konfigurációt írnánk, használja a
generikus `omniroute run <target>` indítót (claude, codex, aider, goose, opencode, qwen,
gemini — a célok és álnév a `bin/cli/cli-manifest.mjs`-ből származnak); a régi
eszközspecifikus indítók `omniroute launch` (Claude Code) és `omniroute launch-codex`
(Codex) továbbra is elérhetők. A Gemini CLI csak indításra használható: ez egy `omniroute run`
cél, de nincs `setup-*`/`configure` receptje.

> **Teljes hivatkozás:** a mester táblázat — mit ír minden parancs, minden zászló,
> helyi vs távoli, és mely eszközök igényelnek `/v1` utótagot — található a
> **[CLI Integrációk](../guides/CLI-INTEGRATIONS.md)** oldalon.

### Ezek futtatása egy konténerben

A `setup-*` parancs, amelyet az OmniRoute konténerében hajtanak végre, a
konténer saját otthonába ír, amelyet egyetlen gazda CLI sem olvas, és amely a
konténerrel együtt eltűnik. Az OmniRoute ezt észleli, és `2`-t ad vissza utasításokkal a
helyett, hogy írná. Két támogatott lehetőség — telepítse a CLI-t a gazdán, és
`omniroute connect`-el csatlakozzon a konténerhez, vagy kössön be a konfigurációs könyvtárakat és állítsa be
`CLI_CONFIG_HOME`-t (a compose `host` profil). Minden `setup-*` parancs, plusz
`omniroute configure` és `omniroute config set`, elfogadja a
`--allow-container-write`-t, amikor a konténer saját CLI-jeinek konfigurálása az, amit
valójában jelentett; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` ugyanezt teszi a
szerver számára. Lásd
[Docker Útmutató → Gazda CLI eszközök konfigurálása](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

Az irányítópult **alkalmazási végpontja** (`POST /api/cli-tools/apply`) érvényesíti a
ugyanazt a védelmet: egy konténerben, ha a cél nem kötetbe van szerelve a
gazdától, akkor **`422`** válasz érkezik `containerEphemeralTarget: true`-val, a biztonságos hiba
szöveggel és — a gazda recepttel rendelkező eszközök esetén (claude, codex, opencode, cline,
kilo, continue) — egy `hostSetupCommand`-dal (pl. `omniroute setup-opencode`), amelyet a
gazdán kell futtatni; semmi sem íródik. A `dryRun: true` továbbra is működik konténer
módban, és visszaadja a generált tartalmat + cél útvonalat anélkül, hogy a lemezt érintené, így
előnézetet készíthet az irányítópulton, és alkalmazhatja a gazdán. Ez a viselkedés
szándékos, és regresszióvédett a
`tests/unit/api/cli-tools/apply-container-guard.test.ts` által — soha ne "javítson" egy 422-t a védelem eltávolításával.

---

## Az Igazság Forrása

Az egységes katalógus a `src/shared/constants/cliTools.ts` fájlban található `CLI_TOOLS: Record<string, CliCatalogEntry>` néven.

Minden bejegyzésnek ezek a mezői vannak (a `src/shared/schemas/cliCatalog.ts` fájlban definiálva):

| Mező                                            | Típus                                                        | Leírás                                                   |
| ----------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Melyik oldalon jelenik meg az eszköz                     |
| `vendor`                                        | `string`                                                     | Az eszköz származása ("Anthropic", "OSS (P. Gauthier)")  |
| `acpSpawnable`                                  | `boolean`                                                    | ACP ügynökként is használható (jelvény megjelenítve)     |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Egyedi végpont támogatási szint. `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Konfigurációs mechanizmus                                |
| `id`, `name`, `color`, `description`, `docsUrl` | standard                                                     | Alapvető megjelenítési mezők                             |

A `baseUrlSupport: "none"` értékű bejegyzések **nincsenek megjelenítve** a műszerfal oldalain — ezek a MITM backlogban vannak regisztrálva a 11. tervhez (lásd: `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Képességi szintek (katalógusba véve × észlelhető × konfigurálható × indítható)

Nem minden katalógusba vett eszköz észlelhető, konfigurálható vagy indítható. Minden szintnek van egy
nyilatkozati forrása, és egy drift teszt tartja őket összhangban:

| Szint                | Jelentés                                                                                | Nyilatkozva itt                                                    |
| -------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Katalógusba véve** | Megjelenik a műszerfal katalógusában (név, szállító, dokumentáció, konfigurációs típus) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                   |
| **Észlelhető**       | Bináris/config észlelés, egészségügyi ellenőrzések, konfigurációs utak                  | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` futási katalógus) |
| **Konfigurálható**   | Támogatott az `omniroute configure <cli>` (beállítási recept létezik)                   | `bin/cli/cli-manifest.mjs` (`configure: true`)                     |
| **Indítható**        | Támogatott az `omniroute run <target>` (env/args injekció definiálva)                   | `bin/cli/cli-manifest.mjs` (`run: true`)                           |

A `bin/cli/cli-manifest.mjs` a CLI parancsok kanonikus végrehajtható manifesztje: `run`, `configure` és a shell-befejező generátorok mind származtatják a
céllistáikat, az alias feloldást (például `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
és a `--model` zászló bekötését. A drift őrző
`tests/unit/cli/cli-manifest-drift.test.ts` biztosítja, hogy a manifeszt, a futási
katalógus, a UI katalógus és minden fogyasztói felület szinkronban maradjon — egy cél, amelyet
az egyik felülethez adnak hozzá, míg a többiekhez nem, meghiúsítja a tesztet ahelyett, hogy csendben eltérne.

## 1. CLI Kódok Katalógusa (26 eszköz)

Minden eszköz, amely megjelenik a `/dashboard/cli-code`-ban. Azok, amelyeknél `baseUrlSupport: none`, MITM vagy egy kézi útmutató révén vannak összekötve, nem pedig egyedi alap URL-en keresztül:

| id           | név                       | szállító            | baseUrlSupport | configType   | acpSpawnable |
| ------------ | ------------------------- | ------------------- | -------------- | ------------ | ------------ |
| claude       | Claude Kód                | Anthropic           | teljes         | env          | true         |
| codex        | OpenAI Codex CLI          | OpenAI              | teljes         | egyedi       | true         |
| zcode        | ZCode (GLM Kódolási Terv) | Z.ai                | nincs          | egyedi       | false        |
| cline        | Cline                     | OSS (ex-Claude Dev) | teljes         | egyedi       | true         |
| kilo         | Kilo Kód                  | Kilo-Org            | teljes         | egyedi       | false        |
| roo          | Roo Kód                   | Roo (OSS)           | teljes         | útmutató     | false        |
| continue     | Continue                  | continue.dev        | teljes         | útmutató     | false        |
| aider        | Aider                     | OSS (P. Gauthier)   | teljes         | útmutató     | true         |
| forge        | ForgeCode                 | Antinomy HQ         | teljes         | egyedi       | true         |
| jcode        | jcode                     | 1jehuang (OSS)      | teljes         | egyedi       | false        |
| deepseek-tui | DeepSeek TUI              | Hunter Bown (OSS)   | teljes         | egyedi       | false        |
| codewhale    | CodeWhale                 | Hmbown (OSS)        | teljes         | egyedi       | false        |
| opencode     | OpenCode                  | Anomaly (ex-SST)    | teljes         | útmutató     | true         |
| droid        | Factory Droid             | Factory AI          | részleges      | útmutató     | false        |
| copilot      | GitHub Copilot CLI        | GitHub/MS           | teljes         | egyedi       | false        |
| cursor-cli   | Cursor CLI                | Anysphere           | részleges      | útmutató     | true         |
| smelt        | Smelt                     | leonardcser (OSS)   | teljes         | egyedi       | false        |
| pi           | Pi (pi-kódoló-ügynök)     | M. Zechner (OSS)    | teljes         | egyedi       | false        |
| grok-build   | Grok Build                | xAI                 | teljes         | egyedi       | false        |
| crush        | Crush                     | OSS (Charm)         | teljes         | egyedi       | false        |
| qwen         | Qwen Kód                  | Alibaba             | teljes         | útmutató     | true         |
| cursor       | Cursor                    | Anysphere           | nincs          | útmutató     | false        |
| antigravity  | Antigravitáció            | Google              | nincs          | mitm         | false        |
| hermes       | Hermes                    | Nous Research       | nincs          | útmutató     | false        |
| kiro         | Kiro AI                   | Amazon              | nincs          | mitm         | false        |
| custom       | Egyedi CLI                | —                   | teljes         | egyedi-építő | false        |

Azok az eszközök, amelyeknél `baseUrlSupport: "részleges"` egy "⚠ Alap URL részleges" jelvényt mutatnak a műszerfal kártyáján.

## 2. CLI Ügynökök Katalógusa (8 eszköz)

Önálló ügynökök, amelyek a `/dashboard/cli-agents`-ben jelennek meg:

| id           | név              | szállító                 | baseUrlTámogatás | acpSpawnable |
| ------------ | ---------------- | ------------------------ | ---------------- | ------------ |
| hermes-agent | Hermes Ügynök    | Nous Research            | teljes           | hamis        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | teljes           | igaz         |
| goose        | Goose            | Block / Linux Foundation | teljes           | igaz         |
| interpreter  | Open Interpreter | OSS                      | teljes           | igaz         |
| warp         | Warp AI          | Warp Inc.                | részleges        | igaz         |
| agent-deck   | Ügynök Deck      | asheshgoplani (OSS)      | teljes           | hamis        |
| omp          | Oh My Pi         | OSS                      | teljes           | igaz         |
| letta        | Letta CLI        | Letta                    | teljes           | hamis        |

---

## 3. ACP Ügynökök (/dashboard/acp-agents)

Ez az oldal (átnevezve a `/dashboard/agents`-ről) azokat a CLI-ket mutatja, amelyeket az OmniRoute **indíthat** háttér végrehajtási motorokként stdio/ACP protokollon keresztül. A katalógust külön karbantartják a `src/lib/acp/registry.ts` fájlban, és **nem** ugyanaz, mint a `CLI_TOOLS`.

---

## 4. MITM Hátralék (nem látható a műszerfalon)

Az alábbi CLI-k nem támogatják a testreszabott alap URL-t natívan, és **nincsenek felsorolva** a CLI Kód vagy CLI Ügynökök oldalain. Ezek a MITM lehallgatás jelöltjei a 11. tervben:

| CLI                 | Ok                                                                      |
| ------------------- | ----------------------------------------------------------------------- |
| windsurf            | BYOK korlátozott a kiválasztott Claude modellekre + vállalati URL/token |
| amp                 | Zárt ökoszisztéma (Sourcegraph)                                         |
| amazon-q / kiro-cli | AWS SSO hitelesítés, nincs testreszabott URL                            |
| cowork              | Anthropic Desktop, nincs konfigurálható végpont                         |

Lásd a `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` fájlt a teljes keresztreferenciáért.

---

## 5. Batch Észlelési API

Minden eszköz észlelése egyetlen végponton keresztül aggregálódik:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (ugyanaz, mint a többi `/api/cli-tools/` útvonal)
- Visszatér: `Record<toolId, ToolBatchStatus>` (típus: `src/shared/types/cliBatchStatus.ts`)
- Stratégia: `Promise.all` az összes eszközön, 5s időkorlát eszközönként
- Cache: memóriában LRU, a konfigurációs fájl `mtime` alapján indexelve. A cache érvénytelenítve van, amikor az mtime változik. Visszaállítva a szerver újraindításakor.

Válasz forma eszközönként:

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
  error?: string; // sanitált, nincs stack trace
}
```

## 6. Beállítási Kezelők Új Eszközökhöz

Az új eszközök, amelyek `configType: "custom"` beállítással rendelkeznek, dedikált beállítási API útvonalakkal rendelkeznek:

| Útvonal                                     | Eszköz                                                                      |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                                     |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                                     |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                                      |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, elsődleges + régi `~/.deepseek` szinkronizálás) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                       |
| `POST /api/cli-tools/pi-settings`           | Pi kódoló ügynök                                                            |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                       |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedikált `.env` kulcs)                 |

Minden útvonal a `sanitizeErrorMessage()`-t használja a hiba válaszokhoz (Kemény Szabály #12).

---

## 7. Dashboard Oldalak Architektúrája

### CLI Kód (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — szerver komponens
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — kliens rács
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — eszköz részletező oldal
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 specializált eszköz kártya + `ToolDetailClient.tsx`

### CLI Ügynökök (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — szerver komponens
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — kliens rács
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — újrahasználja a `ToolDetailClient`-et

### ACP Ügynökök (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — szerver komponens (áthelyezve az `agents/`-ből)

### Megosztott UI Komponensek (`src/shared/components/cli/`)

| Fájl                    | Cél                                                     |
| ----------------------- | ------------------------------------------------------- |
| `CliToolCard.tsx`       | Okos státusz kártya (észlelés + konfiguráció + végpont) |
| `CliConceptCard.tsx`    | Oldalankénti fogalommagyarázó kártya                    |
| `CliComparisonCard.tsx` | Három oszlopos összehasonlítás CLI típusok között       |
| `BaseUrlSelect.tsx`     | Végpont legördülő (Helyi/Felhő/Személyre szabott)       |
| `ApiKeySelect.tsx`      | API kulcs kiválasztó                                    |
| `ManualConfigModal.tsx` | Másolható konfigurációs részlet modal                   |

### Megosztott Hook (`src/shared/hooks/cli/`)

| Fájl                      | Cél                                                                             |
| ------------------------- | ------------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Lekéri a `/api/cli-tools/all-statuses`, kezeli a betöltési/frissítési állapotot |

## 8. i18n

Új névtér került hozzáadásra a 14 F9 tervben:

| Névtér      | Cél                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------ |
| `cliCommon` | Megosztott szövegek (kártyacímkék, fogalom/összehasonlító szövegek, részletes oldalcímkék) |
| `cliCode`   | CLI Kód oldal szövegei                                                                     |
| `cliAgents` | CLI Ügynökök oldal szövegei                                                                |
| `acpAgents` | ACP Ügynökök oldal szövegei                                                                |

Teljes PT-BR és EN fordítások állnak rendelkezésre. 39 másik nyelv automatikusan visszaesik az EN-re a névtér szintű egyesítés révén a `src/i18n/request.ts` fájlban.

---

## 9. Gyors kezdés

### 1. lépés — Szerezz egy OmniRoute API kulcsot

1. Nyisd meg a `/dashboard/api-manager` → **API kulcs létrehozása**
2. Adj neki egy nevet (pl. `cli-tools`) és válaszd ki az összes engedélyt
3. Másold a kulcsot — szükséged lesz rá az alábbi CLI-k mindegyikéhez

> A kulcsod így néz ki: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### 2. lépés — Telepítsd a CLI eszközöket

Minden npm-alapú eszköz megköveteli a Node.js 22.22.2+ vagy 24.x verziót:

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

# Google Gemini CLI (elindítható az `omniroute run gemini` → /v1beta felületen)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Rust-alapú

# Pi coding agent
# lásd: https://github.com/zechnerj/pi-coding-agent a telepítéshez

# jcode
# lásd: https://github.com/1jehuang/jcode a telepítéshez
```

---

### 3. lépés — Konfigurálj a Dashboardon

1. Lépj a `http://localhost:20128/dashboard/cli-code` oldalra
2. Keresd meg az eszközödet a rácsban
3. Kattints a kártyára az eszköz részletes oldalának megnyitásához
4. Válaszd ki az API kulcsodat és az alap URL-t
5. Kattints a **Konfiguráció alkalmazása** gombra, vagy másold a manuális konfigurációs részletet

---

### 4. lépés — Állítsd be a globális környezeti változókat

```bash
# OmniRoute Univerzális Végpont
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# A Gemini CLI a GOOGLE_GEMINI_BASE_URL-t a ROOT-nál olvassa (az SDK automatikusan hozzáfűzi a /v1beta/...-t)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> **Távoli szerver** esetén cseréld le a `localhost:20128`-at a szerver IP-címére vagy domainjére,
> pl. `http://<your-server-ip>:20128`.

---

### 4. lépés — Konfiguráld az egyes eszközöket

#### Claude Code

```bash
# Hozd létre a ~/.claude/settings.json fájlt:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Használj egységes Anthropic átjáró gyökeret a Claude Code-hoz. Ne fűzd hozzá a `/v1`-et itt.

**Teszt:** `claude "say hello"`

---

#### OpenAI Codex

A modern Codex (v0.137+) csak a `~/.codex/config.toml`-t olvassa — a régi
`config.yaml` a hagyományos npm CLI-hez tartozik, és csendben figyelmen kívül hagyják. Az API
kulcs a `OMNIROUTE_API_KEY` környezeti változóban (`env_key`) marad, soha
nem a fájlban:

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

Teljes hivatkozás (profilok, `wire_api`, kontextusablakok): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Teszt:** `codex "what is 2+2?"`

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

**Teszt:** `opencode`

> Használj `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> a gondolkodási variánsok küldésére.

---

#### Cline (CLI vagy VS Code)

**CLI mód:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code mód:**
Cline kiterjesztés beállításai → API Szolgáltató: `OpenAI Compatible` → Alap URL: `http://localhost:20128/v1`

Vagy használd az OmniRoute dashboardot → **CLI Eszközök → Cline → Konfiguráció alkalmazása**.

---

#### KiloCode (CLI vagy VS Code)

**CLI mód:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code beállítások:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Vagy használd az OmniRoute dashboardot → **CLI Eszközök → KiloCode → Konfiguráció alkalmazása**.

---

#### Continue (VS Code Kiterjesztés)

Szerkeszd a `~/.continue/config.yaml` fájlt:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Indítsd újra a VS Code-ot a szerkesztés után.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Használj ezt, amikor a VS Code Insiders egyedi végpont modellekhez van konfigurálva, és szeretnéd, hogy az OmniRoute működjön egyedi fejlécmező nélkül.

**Ajánlott hely:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Példa a tokenizált OmniRoute alias használatával:**

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

**Megjegyzések:**

- Cseréld le a `sk-your-omniroute-key`-t egy OmniRoute-ban létrehozott API kulcsra.
- Az `url` mezőnek a `/api/v1/vscode/{token}/chat/completions`-ra kell mutatnia.
- A `modelsUrl` mezőnek a `/api/v1/vscode/{token}/models`-ra kell mutatnia.
- Előnyben részesítsd a normál `/v1` + Bearer fejléc folyamatot, amikor az ügyfél támogatja az egyedi fejléceket.
- Az URL-be ágyazott tokenek egy kompatibilitási visszaesés, és megjelenhetnek a szerkesztő naplóiban vagy proxy történetében.

---

#### Kiro CLI (Amazon)

```bash
# Jelentkezz be az AWS/Kiro fiókodba:
kiro-cli login

# A CLI saját hitelesítést használ — az OmniRoute nem szükséges a Kiro CLI háttérként.
# Használj kiro-cli-t az OmniRoute mellett más eszközökhöz.
kiro-cli status
```

A **Kiro IDE** asztali alkalmazáshoz használd az OmniRoute által kitetett MITM végpontot
a `/dashboard/cli-tools → Kiro` alatt.

---

## 10. Belső OmniRoute CLI

Az `omniroute` bináris parancsokat biztosít a szerver életciklusához, beállításhoz, diagnosztikához és szolgáltatókezeléshez. Belépési pont: `bin/omniroute.mjs`.

```bash
omniroute                              # Szerver indítása (alapértelmezett port 20128)
omniroute setup                        # Interaktív beállító varázsló
omniroute doctor                       # Konfiguráció, DB, portok, futásidő ellenőrzése
omniroute providers list               # Konfigurált szolgáltató kapcsolatok
omniroute providers test-all           # Minden aktív kapcsolat tesztelése
omniroute reset-password               # Az admin jelszó visszaállítása
omniroute logs                         # Kérésnaplók streamelése
omniroute health                       # Részletes egészségügyi állapot (megszakítók, cache, memória)
omniroute --version                    # Verzió kiírása
omniroute --help                       # Minden parancs megjelenítése
```

### Beállítás és Inicializálás

```bash
omniroute setup                        # Interaktív beállító varázsló
omniroute setup --non-interactive      # CI/automatizálási mód (környezeti változók + zászlók olvasása)
omniroute setup --password '<value>'   # Admin jelszó közvetlen beállítása
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Szolgáltató hozzáadása és tesztelése egy lépésben
```

A nem interaktív beállításhoz elismert környezeti változók:

| Var                 | Cél                                                                               |
| ------------------- | --------------------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Szolgáltató API kulcs (a `--api-key`-hez kötve a Commander `.env()`-on keresztül) |
| `DATA_DIR`          | Felülírja az OmniRoute adatkönyvtárat                                             |

Minden egyéb nem interaktív bemenet zászlóként kerül átadásra, nem környezeti változóként:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(lásd a fenti `omniroute setup` opciókat).

### Diagnosztika

```bash
omniroute doctor                       # Konfiguráció, DB, portok, futásidő, memória, élő állapot ellenőrzése
omniroute doctor --json                # Géppel olvasható JSON
omniroute doctor --no-liveness         # Az HTTP egészségügyi próba kihagyása
omniroute doctor --host 0.0.0.0        # Az élő állapot gazdagép felülírása
omniroute doctor --liveness-url <url>  # Teljes egészségügyi végpont URL felülírása
```

A doctor ezeket az ellenőrzéseket futtatja: `Konfiguráció`, `Adatbázis`, `Tárolás/titkosítás`,
`Port elérhetőség`, `Node futásidő`, `Natív bináris` (better-sqlite3),
`Memória`, és `Szerver élő állapot`. Nem nulla értékkel lép ki, ha bármelyik ellenőrzés `sikertelen`.

### Szolgáltatókezelés

```bash
omniroute providers available                       # OmniRoute szolgáltató katalógus
omniroute providers available --search openai       # Katalógus szűrése id/név/alias/kategória szerint
omniroute providers available --category api-key    # Szűrés kategória szerint (api-key, oauth, ingyenes, ...)
omniroute providers available --json                # Géppel olvasható JSON

omniroute providers list                            # Konfigurált szolgáltató kapcsolatok
omniroute providers list --json

omniroute providers test <id|name>                  # Egy konfigurált kapcsolat tesztelése
omniroute providers test-all                        # Minden aktív kapcsolat tesztelése
omniroute providers validate                        # Csak helyi struktúra érvényesítése
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Meglévő OAuth folyamat
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` API-első, ezért az aktív helyi vagy távoli kontextus ellen dolgozik. A hitelesítő adatok bevitele
`--credential-stdin` vagy `--credential-env` használatával történjen; a `--dry-run --json` csak
a cenzúrázott jelenlétet/formát jelenti. A `providers available` olvassa az OmniRoute katalógust;
a `providers list/test/test-all/validate` megőrzi helyi SQLite viselkedését és
nem igényli a szerver futását.

### Helyreállítás és Visszaállítás

```bash
omniroute reset-password                # Az admin jelszó visszaállítása (más néven: omniroute-reset-password)
omniroute reset-encrypted-columns       # Figyelmeztetés megjelenítése + száraz futás titkosított hitelesítő adatok visszaállításához
omniroute reset-encrypted-columns --force  # Valóban nullázza a titkosított hitelesítő adatokat SQLite-ban
```

### Hitelesítő adatok exportálása (⚠ óvatosan kezelendő)

```bash
omniroute auth export                                 # Figyelmeztetés + megerősítési kapu — nincs DB hozzáférés
omniroute auth export --force                          # Minden kapcsolat DEKRIPTÁLT hitelesítő adatainak exportálása stdout-ra JSON formátumban
omniroute auth export --force --id <id>                 # Csak a megfelelő kapcsolat exportálása
omniroute auth export --force --format env               # OMNIROUTE_<PROVIDER>_<FIELD>=<value> sorok kiadása
omniroute auth export --force --out creds.json           # Fájlba írás (0600 jogosultságokkal létrehozva)
```

`auth export` **csak helyi** (közvetlen SQLite olvasás, nincs HTTP útvonal) és szándékosan kiírja/írja
**szöveges** `apiKey`/`accessToken`/`refreshToken`/`idToken` értékeket — ez a funkció, nem hiba. Semmi sem olvasható a
adatbázisból, és semmi sem dekódolható `--force` nélkül. A stderr figyelmeztető banner mindig megjelenik, mielőtt bármilyen szöveget kiadna. A `STORAGE_ENCRYPTION_KEY` beállítása szükséges. Egy mező, amely nem tud dekódolni (elavult kulcs, sérült titkosított szöveg) `"<field>DecryptFailed: true"` formátumban kerül jelentésre, ahelyett, hogy megszakítaná az egész exportálást vagy kiszivárogtatná az alapul szolgáló hibát.

### Egyéb alparancsok

Ezek egy futó OmniRoute szervert feltételeznek, hacsak másként nincs megjegyezve:

```bash
omniroute status                       # Átfogó futásidő állapot
omniroute logs                         # Kérésnaplók streamelése (--json, --search, --follow)
omniroute config show                  # Jelenlegi konfiguráció megjelenítése

omniroute provider list                # Elérhető szolgáltatók listázása (a providers list aliasa)
omniroute provider add                 # Az OmniRoute regisztrálása szolgáltatóként egy eszközön
omniroute keys add | list | remove     # API kulcsok kezelése
omniroute models [provider]            # Modellek listázása (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Konfiguráció + DB pillanatkép
omniroute restore                      # Visszaállítás egy korábbi pillanatképből

omniroute health                       # Részletes egészségügyi állapot (megszakítók, cache, memória)
omniroute quota                        # Szolgáltató kvóta használat
omniroute cache                        # Cache állapot
omniroute cache clear                  # Szemantikai + aláírás cache törlése

omniroute mcp status | restart         # MCP szerver állapot / újraindítás
omniroute a2a status | card            # A2A szerver állapot / ügynök kártya

omniroute tunnel list | create | stop  # Alagutak kezelése (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Környezeti változók ellenőrzése / beállítása (ideiglenes)

omniroute test                         # Szolgáltató kapcsolódási füstteszt
omniroute update                       # Frissítések ellenőrzése
omniroute completion                   # Shell kiegészítés generálása
```

### Gyakori zászlók

| Zászló              | Leírás                                                         |
| ------------------- | -------------------------------------------------------------- |
| `--no-open`         | Ne nyissa meg automatikusan a böngészőt indításkor             |
| `--port <n>`        | Felülírja az API portot (alapértelmezett 20128)                |
| `--mcp`             | MCP szerverként futtatás stdio-n keresztül (IDE-khez)          |
| `--non-interactive` | CI mód (nincs kérdés; környezeti változókból/zászlókból olvas) |
| `--json`            | Géppel olvasható JSON kimenet (doctor, providers, stb.)        |
| `--help`, `-h`      | Parancs-specifikus súgó megjelenítése                          |
| `--version`, `-v`   | Telepített verzió kiírása                                      |

---

## Elérhető API végpontok

| Végpont                    | Leírás                               | Használat                                      |
| -------------------------- | ------------------------------------ | ---------------------------------------------- |
| `/v1/chat/completions`     | Szabványos chat (minden szolgáltató) | Minden modern eszköz                           |
| `/v1/responses`            | Válaszok API (OpenAI formátum)       | Codex, ügynöki munkafolyamatok                 |
| `/v1/completions`          | Örökölt szöveg kiegészítések         | Régi eszközök, amelyek `prompt:`-ot használnak |
| `/v1/embeddings`           | Szöveg beágyazások                   | RAG, keresés                                   |
| `/v1/images/generations`   | Kép generálás                        | GPT-Image, Flux, stb.                          |
| `/v1/audio/speech`         | Szöveg-beszéd                        | ElevenLabs, OpenAI TTS                         |
| `/v1/audio/transcriptions` | Beszéd-szöveg                        | Deepgram, AssemblyAI                           |

Kész példa, amely tartalmaz egy tokenizált OmniRoute URL-t:

```txt
Token példa: sk-a3ab3c080beaee3a-69f4a4-070d71af

Szabványos OpenAI alap: http://localhost:20128/v1
VS Code modellek: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code válaszok: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama címkék: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Hibaelhárítás

| Hiba                                     | Ok                               | Megoldás                                                     |
| ---------------------------------------- | -------------------------------- | ------------------------------------------------------------ |
| `Connection refused`                     | OmniRoute nem fut                | `omniroute serve`                                            |
| `401 Unauthorized`                       | Hibás API kulcs                  | Ellenőrizze a `/dashboard/api-manager`-ben                   |
| `No combo configured`                    | Nincs aktív routing kombináció   | Állítsa be a `/dashboard/combos`-ban                         |
| CLI azt mutatja, hogy "nincs telepítve"  | Bináris nem található a PATH-ban | Ellenőrizze a `which <command>`-ot                           |
| A műszerfal "nem észlelt" telepítés után | A gyorsítótár elavult            | Kattintson a "⟳ Frissítés észlelése" gombra a műszerfalon    |
| Régi link `/dashboard/cli-tools`         | Pre-v3.8.6 könyvjelző            | Automatikusan átirányítva a `/dashboard/cli-code`-ra (308)   |
| Régi link `/dashboard/agents`            | Pre-v3.8.6 könyvjelző            | Automatikusan átirányítva a `/dashboard/acp-agents`-ra (308) |
