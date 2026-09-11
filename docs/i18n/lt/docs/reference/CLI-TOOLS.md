# CLI-TOOLS (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇬🇷 [el](../../../el/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇪🇪 [et](../../../et/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇪 [ga](../../../ga/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇷 [hr](../../../hr/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇱🇻 [lv](../../../lv/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇲🇹 [mt](../../../mt/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇮 [sl](../../../sl/docs/reference/CLI-TOOLS.md) · 🇷🇸 [sr](../../../sr/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI įrankiai — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-23
---

# CLI įrankiai — OmniRoute

Paskutinį kartą atnaujinta: 2026-08-23

OmniRoute integruojamas su trimis CLI įrankių kategorijomis, pateikiamomis trijuose atskiruose valdymo skydelio puslapiuose:

| Puslapis        | Maršrutas               | Koncepcija                                                                                | Kiekis       |
| --------------- | ----------------------- | ----------------------------------------------------------------------------------------- | ------------ |
| **CLI kodas**   | `/dashboard/cli-code`   | Programavimo įrankiai, nukreipiami į OmniRoute (Klientas → CLI → OmniRoute → Teikėjas)    | 26           |
| **CLI agentai** | `/dashboard/cli-agents` | Autonominiai agentai, nukreipiami į OmniRoute (tas pats srautas, platesnė apimtis)        | 10           |
| **ACP agentai** | `/dashboard/acp-agents` | CLI, kuriuos OmniRoute paleidžia kaip vidinę sistemą per stdio/ACP (atvirkštinis srautas) | žr. registrą |

Seni maršrutai peradresuojami naudojant 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Kaip tai veikia

```
CLI kodas / CLI agentai (naudojimo srautas):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (visi nukreipiami į OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute nukreipia į tinkamą teikėją)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP agentai (atvirkštinis paleidimo srautas):
    Kliento užklausa → OmniRoute → paleidžia CLI per stdio/ACP → atsakymas
```

**Privalumai:**

- Vienas API raktas visiems įrankiams valdyti
- Visų CLI išlaidų stebėjimas valdymo skydelyje
- Modelių perjungimas neperkonfigūruojant kiekvieno įrankio
- Veikia vietiniuose ir nuotoliniuose serveriuose (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Automatinis konfigūravimas naudojant `setup-*`

Nereikia kiekvieno įrankio konfigūracijos rašyti rankiniu būdu. OmniRoute pateikia po vieną `setup-*`
komandą kiekvienam palaikomam CLI. Ji nuskaito **tiesioginį** modelių katalogą iš veikiančio
OmniRoute (vietinio arba nuotolinio) ir įrašo paties įrankio konfigūraciją jūsų kompiuteryje:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
omniroute setup-5dive
```

Kiekviena komanda priima `--remote <url> --api-key <key>` (vietiniam įrankiui sukonfigūruoti naudoti
nuotolinį OmniRoute), `--dry-run` (peržiūrai nieko neįrašant) ir `--port`. Įrankiams
be automatinio modelių aptikimo (Cline, Kilo, Roo, Goose, Aider, Qwen, 5dive) reikia
`--model <id>` (ir `--yes`, kai komandos vykdomos neinteraktyviai). `setup-5dive` yra vienintelis
konfigūravimo būdas, kuris nieko neįrašo į `$HOME`: jis sukonfigūruoja 5dive agentų parką
parko pagrindiniame kompiuteryje įrašydamas root priklausantį autentifikavimo profilį, todėl iš naujo paleidžiamas per `sudo`
ir neturi atskiro nuotolinio režimo. Norėdami paleisti CLI su
įterptais tinkamais aplinkos kintamaisiais ir apskritai neįrašyti jokios konfigūracijos, naudokite bendrąją
`omniroute run <target>` paleidyklę (claude, codex, aider, goose, opencode, qwen,
gemini — paskirties vietos ir alternatyvūs pavadinimai gaunami iš `bin/cli/cli-manifest.mjs`); senosios
konkretiems įrankiams skirtos paleidyklės `omniroute launch` (Claude Code) ir `omniroute launch-codex`
(Codex) vis dar pasiekiamos. Gemini CLI galima tik paleisti: jis yra `omniroute run`
paskirties vieta, tačiau neturi `setup-*`/`configure` konfigūravimo būdo.

> **Išsamus žinynas:** pagrindinė lentelė — ką įrašo kiekviena komanda, visos parinktys,
> vietinis ir nuotolinis režimai bei kuriems įrankiams reikia `/v1` galūnės — pateikta
> **[CLI integracijose](../guides/CLI-INTEGRATIONS.md)**.

### Šių komandų vykdymas konteineryje

Konteineryje OmniRoute vykdoma `setup-*` komanda įrašo duomenis į paties
konteinerio namų katalogą, kurio neskaito joks pagrindinio kompiuterio CLI ir kuris išnyksta kartu su
konteineriu. OmniRoute tai aptinka ir, užuot rašęs, baigia darbą su kodu `2` bei pateikia
instrukcijas. Yra du palaikomi sprendimai — įdiegti CLI pagrindiniame kompiuteryje ir
naudoti `omniroute connect` prisijungiant prie konteinerio arba prijungti konfigūracijos katalogus ir nustatyti
`CLI_CONFIG_HOME` (compose `host` profilį). Kiekviena `setup-*` komanda, taip pat
`omniroute configure` ir `omniroute config set`, priima
`--allow-container-write`, kai iš tiesų norite konfigūruoti paties konteinerio CLI;
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` tą patį atlieka serveriui. Žr.
[Docker vadovas → Pagrindinio kompiuterio CLI įrankių konfigūravimas](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

Valdymo skydelio **pritaikymo galinis taškas** (`POST /api/cli-tools/apply`) taiko
tą pačią apsaugą: konteineryje įrašymo operacija, kurios paskirties vieta nėra prijungta iš
pagrindinio kompiuterio, pateikia atsakymą **`422`** su `containerEphemeralTarget: true`, saugiu klaidos
tekstu ir — įrankiams, turintiems pagrindinio kompiuterio konfigūravimo būdą (claude, codex, opencode, cline,
kilo, continue) — `hostSetupCommand` (pvz., `omniroute setup-opencode`), kurią reikia vykdyti
pagrindiniame kompiuteryje; niekas neįrašoma. `dryRun: true` ir toliau veikia konteinerio
režimu bei grąžina sugeneruotą turinį ir paskirties kelią neliesdamas disko, todėl
galite atlikti peržiūrą valdymo skydelyje, o pakeitimus pritaikyti pagrindiniame kompiuteryje. Toks veikimas yra
tyčinis ir apsaugotas regresijos testu
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — niekada „netaisykite“ 422
pašalindami šią apsaugą.

---

## Autoritetingas šaltinis

Bendras katalogas yra faile `src/shared/constants/cliTools.ts` kaip `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Kiekvienas įrašas turi šiuos laukus (apibrėžtus faile `src/shared/schemas/cliCatalog.ts`):

| Laukas                                          | Tipas                                                        | Aprašymas                                                                  |
| ----------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Kuriame puslapyje rodomas įrankis                                          |
| `vendor`                                        | `string`                                                     | Įrankio kilmė („Anthropic“, „OSS (P. Gauthier)“)                           |
| `acpSpawnable`                                  | `boolean`                                                    | Taip pat gali būti naudojamas kaip ACP agentas (rodoma žyma)               |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Pasirinktinio galinio taško palaikymo lygis. `"none"` = MITM darbų sąrašas |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Konfigūravimo mechanizmas                                                  |
| `id`, `name`, `color`, `description`, `docsUrl` | standartiniai                                                | Pagrindiniai atvaizdavimo laukai                                           |

Įrašai su `baseUrlSupport: "none"` **nerodomi** valdymo skydelio puslapiuose — jie užregistruoti 11-ojo plano MITM darbų sąraše (žr. `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Galimybių lygiai (įtraukta į katalogą × aptinkama × konfigūruojama × paleidžiama)

Ne kiekvieną į katalogą įtrauktą įrankį galima aptikti, konfigūruoti ar paleisti. Kiekvienas lygis turi vieną
jį apibrėžiantį šaltinį, o neatitikimų testas užtikrina jų suderinamumą:

| Lygis                   | Reikšmė                                                                                            | Apibrėžta                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Įtraukta į katalogą** | Rodoma valdymo skydelio kataloge (pavadinimas, tiekėjas, dokumentacija, konfigūracijos tipas)      | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                             |
| **Aptinkama**           | Dvejetainio failo / konfigūracijos aptikimas, būklės patikros, konfigūracijos keliai               | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` vykdymo aplinkos katalogas) |
| **Konfigūruojama**      | Palaikoma naudojant `omniroute configure <cli>` (yra sąrankos instrukcija)                         | `bin/cli/cli-manifest.mjs` (`configure: true`)                               |
| **Paleidžiama**         | Palaikoma naudojant `omniroute run <target>` (apibrėžtas aplinkos kintamųjų / argumentų įterpimas) | `bin/cli/cli-manifest.mjs` (`run: true`)                                     |

`bin/cli/cli-manifest.mjs` yra kanoninis vykdomasis CLI komandų
sąsajų manifestas: `run`, `configure` ir apvalkalo automatinio užbaigimo generatoriai savo
paskirties objektų sąrašus, alternatyvių pavadinimų nustatymą (pavyzdžiui, `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
ir `--model` vėliavėlės susiejimą gauna iš jo. Neatitikimų apsauga
`tests/unit/cli/cli-manifest-drift.test.ts` patikrina, ar manifestas, vykdymo aplinkos
katalogas, UI katalogas ir visos naudojančios sąsajos išlieka sinchronizuoti — jei paskirties objektas pridedamas prie
vienos sąsajos, bet nepridedamas prie kitų, testų rinkinys nepavyksta, užuot leidęs neatitikimams likti nepastebėtiems.

---

## 1. „CLI Code“ katalogas (26 įrankiai)

Visi įrankiai, rodomi `/dashboard/cli-code`. Įrankiai, kurių `baseUrlSupport: none`, prijungiami per MITM arba naudojant rankinį vadovą, o ne pasirinktinį bazinį URL:

| id           | pavadinimas             | tiekėjas            | baseUrlSupport | configType     | acpSpawnable |
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
| custom       | Pasirinktinis CLI       | —                   | full           | custom-builder | false        |

Įrankių, kurių `baseUrlSupport: "partial"`, informacijos suvestinės kortelėje rodomas ženklelis „⚠ Bazinis URL palaikomas iš dalies“.
---

## 2. CLI agentų katalogas (10 įrankių)

Autonominiai agentai, rodomi puslapyje `/dashboard/cli-agents`:

| id           | name             | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | full           | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | full           | true         |
| goose        | Goose            | Block / Linux Foundation | full           | true         |
| interpreter  | Open Interpreter | OSS                      | full           | true         |
| warp         | Warp AI          | Warp Inc.                | partial        | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | full           | false        |
| omp          | Oh My Pi         | OSS                      | full           | true         |
| letta        | Letta CLI        | Letta                    | full           | false        |
| prime-agent  | Prime Agent      | Prime Intellect (OSS)    | full           | false        |
| 5dive        | 5dive            | OSS (5dive-ai)           | full           | false        |

---

## 3. ACP agentai (/dashboard/acp-agents)

Šiame puslapyje (pervadintame iš `/dashboard/agents`) rodomos CLI, kurias OmniRoute gali **paleisti** kaip vidines vykdymo sistemas per stdio/ACP protokolą. Katalogas atskirai prižiūrimas faile `src/lib/acp/registry.ts` ir **nėra** tas pats, kas `CLI_TOOLS`.

---

## 4. MITM neatliktų darbų sąrašas (valdymo skydelyje nerodomas)

Toliau nurodytos CLI savaime nepalaiko pasirinktinio bazinio URL ir **nėra įtrauktos** į CLI Code arba CLI Agents puslapius. Jos yra kandidatės į MITM perėmimą 11 plane:

| CLI                 | Priežastis                                                                  |
| ------------------- | --------------------------------------------------------------------------- |
| windsurf            | BYOK palaiko tik pasirinktus Claude modelius ir įmonės URL / prieigos raktą |
| amp                 | Uždara ekosistema (Sourcegraph)                                             |
| amazon-q / kiro-cli | AWS SSO autentifikavimas, nėra pasirinktinio URL                            |
| cowork              | Anthropic Desktop, nėra konfigūruojamo galinio taško                        |

Išsamias kryžmines nuorodas rasite `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`.

---

## 5. Paketinio aptikimo API

Visų įrankių aptikimas sujungiamas per vieną galinį tašką:

**`GET /api/cli-tools/all-statuses`**

- Autentifikavimas: `requireCliToolsAuth(request)` (toks pats kaip kituose `/api/cli-tools/` maršrutuose)
- Grąžina: `Record<toolId, ToolBatchStatus>` (tipas: `src/shared/types/cliBatchStatus.ts`)
- Strategija: `Promise.all` visiems įrankiams, kiekvienam įrankiui taikomas 5 s skirtasis laikas
- Podėlis: atmintyje laikomas LRU, indeksuojamas pagal konfigūracijos failo `mtime`. Podėlis panaikinamas pasikeitus `mtime`. Paleidus serverį iš naujo, jis nustatomas iš naujo.

Kiekvieno įrankio atsakymo struktūra:

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
  error?: string; // išvalytas, be dėklo sekimo informacijos
}
```

---

## 6. Naujų įrankių nustatymų apdorojimo priemonės

Nauji įrankiai su `configType: "custom"` turi atskirus nustatymų API maršrutus:

| Maršrutas                                   | Įrankis                                                                           |
| ------------------------------------------- | --------------------------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                                           |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url parametras)                                                     |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, senasis būdas)                                     |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, pagrindinis + senasis `~/.deepseek` sinchronizavimas) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                             |
| `POST /api/cli-tools/pi-settings`           | Pi programavimo agentas                                                           |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                             |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + atskiras `.env` raktas)                      |

Visuose maršrutuose klaidų atsakymams naudojama `sanitizeErrorMessage()` (griežtoji taisyklė Nr. 12).

---

## 7. Valdymo skydelio puslapių architektūra

### CLI kodai (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — serverio komponentas
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — kliento tinklelis
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — įrankio išsamios informacijos puslapis
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 specializuotų įrankių kortelių + `ToolDetailClient.tsx`

### CLI agentai (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — serverio komponentas
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — kliento tinklelis
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — pakartotinai naudoja `ToolDetailClient`

### ACP agentai (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — serverio komponentas (perkeltas iš `agents/`)

### Bendrinami naudotojo sąsajos komponentai (`src/shared/components/cli/`)

| Failas                  | Paskirtis                                                                      |
| ----------------------- | ------------------------------------------------------------------------------ |
| `CliToolCard.tsx`       | Išmanioji būsenos kortelė (aptikimas + konfigūracija + prieigos taškas)        |
| `CliConceptCard.tsx`    | Kiekvienam puslapiui skirta sąvokos paaiškinimo kortelė                        |
| `CliComparisonCard.tsx` | Trijų stulpelių skirtingų CLI tipų palyginimas                                 |
| `BaseUrlSelect.tsx`     | Prieigos taško išskleidžiamasis sąrašas (vietinis / debesijos / pasirinktinis) |
| `ApiKeySelect.tsx`      | API rakto parinkiklis                                                          |
| `ManualConfigModal.tsx` | Modalinis langas su nukopijuojamu konfigūracijos fragmentu                     |

### Bendrinamas hook'as (`src/shared/hooks/cli/`)

| Failas                    | Paskirtis                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Gauna duomenis iš `/api/cli-tools/all-statuses`, valdo įkėlimo / atnaujinimo būseną |

---

## 8. i18n

14 F9 plane pridėtos naujos vardų sritys:

| Vardų sritis | Paskirtis                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------- |
| `cliCommon`  | Bendrinamos eilutės (kortelių etiketės, koncepcijų / palyginimų tekstai, išsamios informacijos puslapių etiketės) |
| `cliCode`    | CLI Code puslapio eilutės                                                                                         |
| `cliAgents`  | CLI Agents puslapio eilutės                                                                                       |
| `acpAgents`  | ACP Agents puslapio eilutės                                                                                       |

Pateikti išsamūs PT-BR ir EN vertimai. Kitoms 39 lokalėms automatiškai naudojama EN atsarginė versija, vardų sričių lygmeniu sujungiama faile `src/i18n/request.ts`.

---

## 9. Greitoji pradžia

### 1 veiksmas — gaukite OmniRoute API raktą

1. Atidarykite `/dashboard/api-manager` → **Sukurti API raktą**
2. Suteikite jam pavadinimą (pvz., `cli-tools`) ir pasirinkite visus leidimus
3. Nukopijuokite raktą — jo reikės kiekvienam toliau nurodytam CLI

> Jūsų raktas atrodo taip: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### 2 veiksmas — įdiekite CLI įrankius

Visiems npm pagrįstiems įrankiams reikia Node.js 22.22.2+ arba 24.x:

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

# Google Gemini CLI (paleidžiamas naudojant `omniroute run gemini` → /v1beta sąsaja)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Pagrįstas Rust

# Pi programavimo agentas
# diegimo instrukcijas žr. https://github.com/zechnerj/pi-coding-agent

# jcode
# diegimo instrukcijas žr. https://github.com/1jehuang/jcode
```

---

### 3 veiksmas — sukonfigūruokite valdymo skydelyje

1. Eikite į `http://localhost:20128/dashboard/cli-code`
2. Tinklelyje raskite savo įrankį
3. Spustelėkite kortelę, kad atidarytumėte įrankio išsamios informacijos puslapį
4. Pasirinkite savo API raktą ir bazinį URL
5. Spustelėkite **Taikyti konfigūraciją** arba nukopijuokite rankinės konfigūracijos fragmentą

---

### 4 veiksmas — nustatykite visuotinius aplinkos kintamuosius

```bash
# Universalusis OmniRoute galinis taškas
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI skaito GOOGLE_GEMINI_BASE_URL ŠAKNINIU lygmeniu (jo SDK pats prideda /v1beta/...)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Jei naudojate **nuotolinį serverį**, pakeiskite `localhost:20128` serverio IP adresu arba domenu,
> pvz., `http://<your-server-ip>:20128`.

---

### 4 veiksmas — sukonfigūruokite kiekvieną įrankį

#### Claude Code

```bash
# Sukurkite ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Naudokite suvienodinto Anthropic šliuzo šakninį adresą, skirtą Claude Code. Čia nepridėkite `/v1`.

**Bandymas:** `claude "say hello"`

---

#### OpenAI Codex

Šiuolaikinė Codex versija (v0.137+) skaito tik `~/.codex/config.toml` — senasis
`config.yaml` priklauso pasenusiam npm CLI ir yra tyliai ignoruojamas. API
raktas laikomas aplinkos kintamajame `OMNIROUTE_API_KEY` (`env_key`), niekada
ne pačiame faile:

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

Visa informacija (profiliai, `wire_api`, konteksto langai): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Bandymas:** `codex "what is 2+2?"`

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

**Bandymas:** `opencode`

> Norėdami siųsti mąstymo variantus, naudokite `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`.

---

#### Cline (CLI arba VS Code)

**CLI režimas:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code režimas:**
Cline plėtinio nustatymai → API teikėjas: `OpenAI Compatible` → Bazinis URL: `http://localhost:20128/v1`

Arba naudokite OmniRoute valdymo skydelį → **CLI įrankiai → Cline → Taikyti konfigūraciją**.

---

#### KiloCode (CLI arba VS Code)

**CLI režimas:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code nustatymai:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Arba naudokite OmniRoute valdymo skydelį → **CLI įrankiai → KiloCode → Taikyti konfigūraciją**.

---

#### Continue (VS Code plėtinys)

Redaguokite `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Baigę redaguoti iš naujo paleiskite VS Code.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Naudokite šį būdą, kai VS Code Insiders sukonfigūruotas naudoti pasirinktinius galinių taškų modelius ir norite, kad OmniRoute veiktų be pasirinktinio antraštės lauko.

**Rekomenduojama vieta:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Pavyzdys naudojant OmniRoute pseudonimą su prieigos raktu:**

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

**Pastabos:**

- Pakeiskite `sk-your-omniroute-key` OmniRoute sukurtu API raktu.
- Laukas `url` turėtų nurodyti `/api/v1/vscode/{token}/chat/completions`.
- Laukas `modelsUrl` turėtų nurodyti `/api/v1/vscode/{token}/models`.
- Kai klientas palaiko pasirinktines antraštes, pirmenybę teikite įprastam `/v1` ir Bearer antraštės srautui.
- URL įterpti prieigos raktai yra suderinamumo atsarginė priemonė ir gali būti matomi redaktoriaus žurnaluose arba tarpinio serverio istorijoje.

---

#### Kiro CLI (Amazon)

```bash
# Prisijunkite prie savo AWS/Kiro paskyros:
kiro-cli login

# CLI naudoja savo autentifikavimą — pačiam Kiro CLI OmniRoute kaip vidinė sistema nereikalinga.
# Naudokite kiro-cli kartu su OmniRoute kitiems įrankiams.
kiro-cli status
```

**Kiro IDE** darbalaukio programai naudokite OmniRoute pateikiamą MITM galinį tašką,
esantį `/dashboard/cli-tools → Kiro`.

---

## 10. Vidinė OmniRoute CLI

Dvejetainis failas `omniroute` suteikia serverio gyvavimo ciklo, sąrankos, diagnostikos ir teikėjų valdymo komandas. Įvesties taškas: `bin/omniroute.mjs`.

```bash
omniroute                              # Paleisti serverį (numatytasis prievadas 20128)
omniroute setup                        # Interaktyvus sąrankos vediklis
omniroute doctor                       # Patikrinti konfigūraciją, DB, prievadus ir vykdymo aplinką
omniroute providers list               # Sukonfigūruoti ryšiai su teikėjais
omniroute providers test-all           # Patikrinti kiekvieną aktyvų ryšį
omniroute reset-password               # Iš naujo nustatyti administratoriaus slaptažodį
omniroute logs                         # Srautiniu būdu rodyti užklausų žurnalus
omniroute health                       # Išsami būklė (grandinės pertraukikliai, podėlis, atmintis)
omniroute --version                    # Parodyti versiją
omniroute --help                       # Parodyti visas komandas
```

### Sąranka ir inicijavimas

```bash
omniroute setup                        # Interaktyvus sąrankos vediklis
omniroute setup --non-interactive      # CI / automatizavimo režimas (skaito aplinkos kintamuosius ir parametrus)
omniroute setup --password '<value>'   # Tiesiogiai nustatyti administratoriaus slaptažodį
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Vienu veiksmu pridėti ir išbandyti teikėją
```

Neinteraktyvioje sąrankoje atpažįstami aplinkos kintamieji:

| Kintamasis          | Paskirtis                                                           |
| ------------------- | ------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Teikėjo API raktas (susietas su `--api-key` per Commander `.env()`) |
| `DATA_DIR`          | Pakeisti OmniRoute duomenų katalogą                                 |

Visos kitos neinteraktyvios įvestys perduodamos kaip parametrai, o ne aplinkos kintamieji:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(žr. pirmiau pateiktas `omniroute setup` parinktis).

### Diagnostika

```bash
omniroute doctor                       # Patikrinti konfigūraciją, DB, prievadus, vykdymo aplinką, atmintį ir gyvybingumą
omniroute doctor --json                # Mašininio skaitymo JSON
omniroute doctor --no-liveness         # Praleisti HTTP būklės patikrą
omniroute doctor --host 0.0.0.0        # Pakeisti gyvybingumo pagrindinį kompiuterį
omniroute doctor --liveness-url <url>  # Pakeisti visą būklės galinio taško URL
```

Komanda doctor vykdo šias patikras: `Config`, `Database`, `Storage/encryption`,
`Port availability`, `Node runtime`, `Native binary` (better-sqlite3),
`Memory` ir `Server liveness`. Jei kurios nors patikros rezultatas yra `fail`, komanda baigiama ne nuliniu išėjimo kodu.

### Teikėjų valdymas

```bash
omniroute providers available                       # OmniRoute teikėjų katalogas
omniroute providers available --search openai       # Filtruoti katalogą pagal ID / pavadinimą / alternatyvų pavadinimą / kategoriją
omniroute providers available --category api-key    # Filtruoti pagal kategoriją (api-key, oauth, free, ...)
omniroute providers available --json                # Mašininio skaitymo JSON

omniroute providers list                            # Sukonfigūruoti ryšiai su teikėjais
omniroute providers list --json

omniroute providers test <id|name>                  # Patikrinti vieną sukonfigūruotą ryšį
omniroute providers test-all                        # Patikrinti kiekvieną aktyvų ryšį
omniroute providers validate                        # Tik vietinis struktūros tikrinimas
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Esamas OAuth procesas
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` pirmiausia naudoja API, todėl veikia su
aktyviu vietiniu arba nuotoliniu kontekstu. Prisijungimo duomenys turėtų būti įvedami naudojant
`--credential-stdin` arba `--credential-env`; `--dry-run --json` pateikia tik
užmaskuotą buvimo ir struktūros informaciją. `providers available` skaito OmniRoute katalogą;
`providers list/test/test-all/validate` išlaiko vietinę SQLite veikseną ir
nereikalauja, kad serveris veiktų.

### Atkūrimas ir nustatymas iš naujo

```bash
omniroute reset-password                # Iš naujo nustatyti administratoriaus slaptažodį (taip pat: omniroute-reset-password)
omniroute reset-encrypted-columns       # Parodyti įspėjimą ir bandomąjį šifruotų prisijungimo duomenų nustatymą iš naujo
omniroute reset-encrypted-columns --force  # Iš tikrųjų nustatyti šifruotų prisijungimo duomenų SQLite reikšmes į null
```

### Prisijungimo duomenų eksportavimas (⚠ elkitės atsargiai)

```bash
omniroute auth export                                 # Parodyti įspėjimą ir prašyti patvirtinimo — be prieigos prie DB
omniroute auth export --force                          # Eksportuoti VISŲ ryšių IŠŠIFRUOTUS prisijungimo duomenis į stdout JSON formatu
omniroute auth export --force --id <id>                 # Eksportuoti tik atitinkantį ryšį
omniroute auth export --force --format env               # Išvesti OMNIROUTE_<PROVIDER>_<FIELD>=<value> eilutes
omniroute auth export --force --out creds.json           # Įrašyti į failą (sukuriamą su 0600 leidimais)
```

`auth export` veikia **tik vietoje** (tiesiogiai skaito SQLite, nenaudodama HTTP maršruto) ir sąmoningai išveda arba įrašo
**atviru tekstu** pateiktas `apiKey` / `accessToken` / `refreshToken` / `idToken` reikšmes — tai funkcija, o ne
klaida. Be `--force` niekas neskaitoma iš duomenų bazės ir niekas neiššifruojama. Prieš išvedant
bet kokį atvirą tekstą, į stderr visada išvedamas įspėjamasis pranešimas. Turi būti nustatytas
`STORAGE_ENCRYPTION_KEY`. Laukas, kurio nepavyksta iššifruoti (pasenęs raktas, sugadintas šifruotas tekstas), pateikiamas kaip
`<field>DecryptFailed: true`, užuot nutraukus visą eksportavimą ar atskleidus pagrindinę klaidą.

### Kitos antrinės komandos

Jei nenurodyta kitaip, šioms komandoms būtinas veikiantis OmniRoute serveris:

```bash
omniroute status                       # Išsami vykdymo aplinkos būsena
omniroute logs                         # Srautiniu būdu rodyti užklausų žurnalus (--json, --search, --follow)
omniroute config show                  # Parodyti dabartinę konfigūraciją

omniroute provider list                # Išvardyti galimus teikėjus (providers list alternatyva)
omniroute provider add                 # Užregistruoti OmniRoute kaip teikėją įrankyje
omniroute keys add | list | remove     # Valdyti API raktus
omniroute models [provider]            # Išvardyti modelius (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Sukurti konfigūracijos ir DB momentinę kopiją
omniroute restore                      # Atkurti iš ankstesnės momentinės kopijos

omniroute health                       # Išsami būklė (grandinės pertraukikliai, podėlis, atmintis)
omniroute quota                        # Teikėjo kvotos naudojimas
omniroute cache                        # Podėlio būsena
omniroute cache clear                  # Išvalyti semantinį ir parašų podėlius

omniroute mcp status | restart         # MCP serverio būsena / paleidimas iš naujo
omniroute a2a status | card            # A2A serverio būsena / agento kortelė

omniroute tunnel list | create | stop  # Valdyti tunelius (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Peržiūrėti / nustatyti aplinkos kintamuosius (laikinai)

omniroute test                         # Teikėjo ryšio bazinis patikrinimas
omniroute update                       # Patikrinti, ar yra naujinimų
omniroute completion                   # Sugeneruoti apvalkalo automatinį užbaigimą
```

### Bendrieji parametrai

| Parametras          | Aprašymas                                                          |
| ------------------- | ------------------------------------------------------------------ |
| `--no-open`         | Paleidžiant automatiškai neatverti naršyklės                       |
| `--port <n>`        | Pakeisti API prievadą (numatytasis 20128)                          |
| `--mcp`             | Vykdyti kaip MCP serverį per stdio (IDE aplinkoms)                 |
| `--non-interactive` | CI režimas (be raginimų; skaito iš aplinkos kintamųjų / parametrų) |
| `--json`            | Mašininio skaitymo JSON išvestis (doctor, providers ir kt.)        |
| `--help`, `-h`      | Parodyti konkrečios komandos žinyną                                |
| `--version`, `-v`   | Parodyti įdiegtą versiją                                           |

---

## Pasiekiami API galiniai taškai

| Galinis taškas             | Aprašymas                             | Kam naudoti                                   |
| -------------------------- | ------------------------------------- | --------------------------------------------- |
| `/v1/chat/completions`     | Standartinis pokalbis (visi teikėjai) | Visiems šiuolaikiniams įrankiams              |
| `/v1/responses`            | Responses API (OpenAI formatas)       | Codex, agentinėms darbo eigoms                |
| `/v1/completions`          | Senstelėję teksto užbaigimai          | Senesniems įrankiams, naudojantiems `prompt:` |
| `/v1/embeddings`           | Teksto vektorinės reprezentacijos     | RAG, paieškai                                 |
| `/v1/images/generations`   | Vaizdų generavimas                    | GPT-Image, Flux ir kt.                        |
| `/v1/audio/speech`         | Teksto vertimas į kalbą               | ElevenLabs, OpenAI TTS                        |
| `/v1/audio/transcriptions` | Kalbos vertimas į tekstą              | Deepgram, AssemblyAI                          |

Paruošti įklijuoti pavyzdžiai su prieigos raktą turinčiu OmniRoute URL:

```txt
Prieigos rakto pavyzdys: sk-a3ab3c080beaee3a-69f4a4-070d71af

Standartinė OpenAI bazė: http://localhost:20128/v1
VS Code modeliai: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code pokalbis: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code atsakymai: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama žymos: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama pokalbis: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Trikčių šalinimas

| Klaida                                       | Priežastis                     | Sprendimas                                                  |
| -------------------------------------------- | ------------------------------ | ----------------------------------------------------------- |
| `Connection refused`                         | OmniRoute neveikia             | `omniroute serve`                                           |
| `401 Unauthorized`                           | Netinkamas API raktas          | Patikrinkite `/dashboard/api-manager`                       |
| `No combo configured`                        | Nėra aktyvaus maršruto derinio | Sukonfigūruokite `/dashboard/combos`                        |
| CLI rodo „neįdiegta“                         | Vykdomojo failo nėra PATH      | Patikrinkite naudodami `which <command>`                    |
| Įdiegus valdymo skydelyje rodoma „neaptikta“ | Pasenusi podėlio informacija   | Valdymo skydelyje spustelėkite „⟳ Atnaujinti aptikimą“      |
| Sena nuoroda `/dashboard/cli-tools`          | Iki v3.8.6 sukurtas skirtukas  | Automatiškai peradresuojama į `/dashboard/cli-code` (308)   |
| Sena nuoroda `/dashboard/agents`             | Iki v3.8.6 sukurtas skirtukas  | Automatiškai peradresuojama į `/dashboard/acp-agents` (308) |
