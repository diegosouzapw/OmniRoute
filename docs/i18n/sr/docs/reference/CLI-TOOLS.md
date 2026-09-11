# CLI-TOOLS (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇬🇷 [el](../../../el/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇪🇪 [et](../../../et/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇪 [ga](../../../ga/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇷 [hr](../../../hr/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇱🇹 [lt](../../../lt/docs/reference/CLI-TOOLS.md) · 🇱🇻 [lv](../../../lv/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇲🇹 [mt](../../../mt/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇮 [sl](../../../sl/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI алати — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-23
---

# CLI алати — OmniRoute

Последње ажурирање: 2026-08-23

OmniRoute се интегрише са три категорије CLI алата распоређених на три посебне странице контролне табле:

| Страница       | Рута                    | Концепт                                                                                | Број            |
| -------------- | ----------------------- | -------------------------------------------------------------------------------------- | --------------- |
| **CLI Code's** | `/dashboard/cli-code`   | Алати за кодирање које усмеравате на OmniRoute (Клијент → CLI → OmniRoute → Провајдер) | 26              |
| **CLI Agents** | `/dashboard/cli-agents` | Аутономни агенти које усмеравате на OmniRoute (исти ток, шири обим)                    | 10              |
| **ACP Agents** | `/dashboard/acp-agents` | CLI алати које OmniRoute покреће као бекенд преко stdio/ACP (обрнути ток)              | видети регистар |

Застарели рутери се преусмеравају путем 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Како то функционише

```
CLI Code's / CLI Agents (ток потрошње):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (сви усмеравају на OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute усмерава ка правом провајдеру)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agents (обрнути ток покретања):
    Захтев клијента → OmniRoute → покреће CLI преко stdio/ACP → одговор
```

**Предности:**

- Један API кључ за управљање свим алатима
- Праћење трошкова за све CLI алате на контролној табли
- Промена модела без поновне конфигурације сваког алата
- Ради локално и на удаљеним серверима (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Аутоматска конфигурација уз `setup-*`

Не морате ручно писати конфигурацију за сваки алат. OmniRoute испоручује команду `setup-*`
за сваки подржани CLI која чита **живи** каталог модела из покренутог
OmniRoute-а (локалног или удаљеног) и записује сопствену конфигурацију алата на вашем рачунару:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
omniroute setup-5dive
```

Свака команда прихвата `--remote <url> --api-key <key>` (конфигурисање локалног алата над
удаљеним OmniRoute-ом), `--dry-run` (преглед без записивања) и `--port`. Алати
без аутоматског откривања модела (Cline, Kilo, Roo, Goose, Aider, Qwen, 5dive) прихватају
`--model <id>` (и `--yes` за неинтерактивна извршавања). `setup-5dive` је рецепт који
не пише испод `$HOME`: он конфигурише флоту агената 5dive
записивањем профила аутентикације у власништву root корисника на хост флоте, тако да
се поново извршава преко `sudo` и нема свој удаљени режим. Да бисте покренули CLI са
одговарајућим убризганим окружењем и без записивања конфигурације уопште, користите генерички
покретач `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — циљеви и алијаси долазе из `bin/cli/cli-manifest.mjs`); застарели
покретачи по алату `omniroute launch` (Claude Code) и `omniroute launch-codex`
(Codex) остају доступни. Gemini CLI је само за покретање: то је `omniroute run`
циљ, али нема рецепт `setup-*`/`configure`.

> **Потпуна референца:** главна табела — шта свака команда пише, свака опција,
> локално у односу на удаљено, и који алати желе суфикс `/v1` — налази се у
> **[CLI Integrations](../guides/CLI-INTEGRATIONS.md)**.

### Извршавање ових команди унутар контејнера

Команда `setup-*` извршена унутар OmniRoute контејнера пише у
сопствени home директоријум контејнера, који никакав CLI на хосту не чита и који нестаје са
контејнером. OmniRoute то детектује и излази са кодом `2` уз инструкције, уместо да
пише. Постоје два подржана начина да наставите — инсталирајте CLI на хосту и
користите `omniroute connect` до контејнера, или бинд-монтирајте директоријуме конфигурације и подесите
`CLI_CONFIG_HOME` (compose профил `host`). Свака команда `setup-*`, као и
`omniroute configure` и `omniroute config set`, прихвата
`--allow-container-write` када је конфигурисање сопствених CLI алата контејнера заиста
оно што сте желели; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` радi исто за
сервер. Погледајте
[Docker водич → Конфигурисање CLI алата на хосту](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

**Endpoint за примену** на контролној табли (`POST /api/cli-tools/apply`) спроводи
исту заштиту: у контејнеру, писање чија мета није бинд-монтирана са
хоста враћа **`422`** са `containerEphemeralTarget: true`, безбедну поруку о грешци
и — за алате са рецептом за хост (claude, codex, opencode, cline,
kilo, continue) — `hostSetupCommand` (нпр. `omniroute setup-opencode`) за покретање
на хосту уместо тога; ништа се не записује. `dryRun: true` наставља да функционише у режиму
контејнера и враћа генерисани садржај + путању мете без додиривања диска, тако да
можете претходно прегледати са контролне табле и применити на хосту. Ово понашање је
намерно и заштићено регресионим тестом
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — никада не „поправљајте" 422
уклањањем заштите.

---

## Извор истине

Јединствени каталог се налази у `src/shared/constants/cliTools.ts` као `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Сваки унос има ова поља (дефинисана у `src/shared/schemas/cliCatalog.ts`):

| Поље                                            | Тип                                                          | Опис                                                          |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | На којој страници се алат приказује                           |
| `vendor`                                        | `string`                                                     | Порекло алата ("Anthropic", "OSS (P. Gauthier)")              |
| `acpSpawnable`                                  | `boolean`                                                    | Такође употребљив као ACP агент (приказана значка)            |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Ниво подршке за прилагођени endpoint. `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Механизам конфигурације                                       |
| `id`, `name`, `color`, `description`, `docsUrl` | стандардно                                                   | Основна поља за приказ                                        |

Уноси са `baseUrlSupport: "none"` се **не приказују** на страницама контролне табле — регистровани су у MITM backlog-у за план 11 (видети `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Нивои могућности (cataloged × detectable × configurable × launchable)

Није сваки катализовани алат detectable, configurable или launchable. Сваки ниво има
један извор декларације, а drift тест их одржава усклађеним:

| Ниво             | Значење                                                                                    | Декларисано у                                                     |
| ---------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **Cataloged**    | Појављује се у каталогу контролне табле (назив, добавач, документација, тип конфигурације) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Detectable**   | Детекција binary/конфигурације, провере здравља, путеви конфигурације                      | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime каталог) |
| **Configurable** | Подржано преко `omniroute configure <cli>` (постоји recipe за подешавање)                  | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Launchable**   | Подржано преко `omniroute run <target>` (дефинисано убацивање env/args)                    | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` је канонски извршни манифест за површине CLI команди:
`run`, `configure` и генератори shell-completion-а сви извлаче своје листе циљева,
резолуцију алиаса (на пример `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
и повезивање `--model` заставице из њега. Drift чувар
`tests/unit/cli/cli-manifest-drift.test.ts` потврђује да манифест, runtime
каталог, UI каталог и свака потрошачка површина остају усклађени — циљ додат на
једну површину без ажурирања осталих обара тест сет уместо да неприметно доведе до одступања (drift).

---

## 1. Каталог CLI Code алата (26 алата)

Сви алати који се појављују у `/dashboard/cli-code`. Они са `baseUrlSupport: none` су повезани преко MITM-а или ручног водича уместо прилагођеног base URL-а:

| id           | name                    | vendor              | baseUrlSupport | configType     | acpSpawnable |
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

Алати са `baseUrlSupport: "partial"` приказују значку "⚠ Base URL parcial" на картици контролне табле.
---

## 2. Каталог CLI агенса (10 алата)

Аутономни агенти који се појављују у `/dashboard/cli-agents`:

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

## 3. ACP Agenti (/dashboard/acp-agents)

Ова страница (преименована из `/dashboard/agents`) приказује CLI-јеве које OmniRoute може да **покрене (spawn)** као позадинске извршне механизме путем stdio/ACP протокола. Каталог се одржава засебно у `src/lib/acp/registry.ts` и **није** исто што и `CLI_TOOLS`.

---

## 4. MITM Заостала листа (backlog) (није приказано у dashboard-у)

Следећи CLI-јеви не подржавају прилагођени базни URL нативно и **нису приказани** на страницама CLI Code-а или CLI Agents. Они су кандидати за MITM пресретање у плану 11:

| CLI                 | Разлог                                                           |
| ------------------- | ---------------------------------------------------------------- |
| windsurf            | BYOK ограничен на одабране Claude модел + корпоративни URL/токен |
| amp                 | Затворен екосистем (Sourcegraph)                                 |
| amazon-q / kiro-cli | AWS SSO аутентификација, без прилагођеног URL-а                  |
| cowork              | Anthropic Desktop, без могућности конфигурисања endpoint-а       |

Погледајте `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` за потпуну укрштену референцу.

---

## 5. Batch API за детекцију

Сва детекција алата се агрегира преко једне крајње тачке (endpoint):

**`GET /api/cli-tools/all-statuses`**

- Ауторизација: `requireCliToolsAuth(request)` (исто као и остале `/api/cli-tools/` руте)
- Враћа: `Record<toolId, ToolBatchStatus>` (тип: `src/shared/types/cliBatchStatus.ts`)
- Стратегија: `Promise.all` за све алате, тајмаут од 5 секунди по алату
- Кеш: in-memory LRU индексиран према `mtime` конфигурационог фајла. Кеш се поништава када се `mtime` промени. Ресетује се при поновном покретању сервера.

Облик одговора по алату:

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
  error?: string; // sanitizovano, bez stack traces
}
```

---

## 6. Handleri podešavanja za nove alate

Novi alati sa `configType: "custom"` imaju namenske API rute za podešavanja:

| Ruta                                        | Alat                                                             |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + namenski `.env` ključ)      |

Sve rute koriste `sanitizeErrorMessage()` za odgovore sa greškama (Strogo pravilo #12).

---

## 7. Arhitektura stranica kontrolne table

### CLI Code's (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — server komponenta
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — klijentska mreža
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — stranica sa detaljima alata
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 specijalizovanih kartica alata + `ToolDetailClient.tsx`

### CLI Agenti (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — server komponenta
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — klijentska mreža
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — ponovo koristi `ToolDetailClient`

### ACP Agenti (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — server komponenta (premešteno iz `agents/`)

### Deljene UI komponente (`src/shared/components/cli/`)

| Fajl                    | Namena                                                         |
| ----------------------- | -------------------------------------------------------------- |
| `CliToolCard.tsx`       | Pametna kartica statusa (detekcija + konfiguracija + endpoint) |
| `CliConceptCard.tsx`    | Kartica sa objašnjenjem koncepta za pojedinačnu stranicu       |
| `CliComparisonCard.tsx` | Poređenje u tri kolone između CLI tipova                       |
| `BaseUrlSelect.tsx`     | Padajući meni endpointa (Lokalno/Cloud/Prilagođeno)            |
| `ApiKeySelect.tsx`      | Selektor API ključa                                            |
| `ManualConfigModal.tsx` | Modalni prozor sa isečkom konfiguracije koji se može kopirati  |

### Deljeni Hook (`src/shared/hooks/cli/`)

| Fajl                      | Namena                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `useToolBatchStatuses.ts` | Preuzima podatke sa `/api/cli-tools/all-statuses`, upravlja stanjem učitavanja/osvežavanja |

---

## 8. i18n

Novi imenski prostori (namespace) dodati u planu 14 F9:

| Imenski prostor | Namena                                                                                              |
| --------------- | --------------------------------------------------------------------------------------------------- |
| `cliCommon`     | Zajedničke stringove (oznake kartica, tekstovi koncepata/poređenja, oznake na detaljnim stranicama) |
| `cliCode`       | Stringovi stranice CLI Code                                                                         |
| `cliAgents`     | Stringovi stranice CLI Agents                                                                       |
| `acpAgents`     | Stringovi stranice ACP Agents                                                                       |

Obezbeđeni su kompletni PT-BR i EN prevodi. Ostalih 39 lokalizacija automatski se svode na EN putem spajanja na nivou imenskog prostora u `src/i18n/request.ts`.

---

## 9. Brzi početak

### Korak 1 — Nabavite OmniRoute API ključ

1. Otvorite `/dashboard/api-manager` → **Create API Key**
2. Dajte mu naziv (npr. `cli-tools`) i izaberite sve dozvole
3. Kopirajte ključ — biće vam potreban za svaki CLI alat ispod

> Vaš ključ izgleda ovako: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Korak 2 — Instalirajte CLI alate

Svi alati zasnovani na npm-u zahtevaju Node.js 22.22.2+ ili 24.x:

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

# Google Gemini CLI (pokreće se preko `omniroute run gemini` → /v1beta interfejs)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Zasnovan na Rust-u

# Pi coding agent
# vidi https://github.com/zechnerj/pi-coding-agent za instalaciju

# jcode
# vidi https://github.com/1jehuang/jcode za instalaciju
```

---

### Korak 3 — Konfigurišite putem Dashboard-a

1. Idite na `http://localhost:20128/dashboard/cli-code`
2. Pronađite svoj alat u mreži (grid)
3. Kliknite na kartu da otvorite stranicu sa detaljima alata
4. Izaberite svoj API ključ i baznu adresu (base URL)
5. Kliknite **Apply Config** ili kopirajte isečak za ručnu konfiguraciju

---

### Korak 4 — Podesite globalne promenljive okruženja

```bash
# OmniRoute univerzalni endpoint
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI čita GOOGLE_GEMINI_BASE_URL na KORENU (njegov SDK sam dodaje /v1beta/...)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Za **udaljeni server** zamenite `localhost:20128` IP adresom ili domenom servera,
> npr. `http://<your-server-ip>:20128`.

---

### Korak 4 — Konfigurišite svaki alat

#### Claude Code

```bash
# Kreirajte ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Koristite jedinstveni Anthropic gateway koren za Claude Code. Ne dodajte `/v1` ovde.

**Test:** `claude "say hello"`

---

#### OpenAI Codex

Moderni Codex (v0.137+) čita samo `~/.codex/config.toml` — stari
`config.yaml` pripada starijem npm CLI-u i tiho se ignoriše. API
ključ ostaje u promenljivoj okruženja `OMNIROUTE_API_KEY` (`env_key`), nikada
unutar fajla:

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

Kompletna referenca (profili, `wire_api`, kontekstni prozori): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

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

> Koristite `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> za slanje varijanti sa razmišljanjem (thinking).

---

#### Cline (CLI ili VS Code)

**CLI režim:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code režim:**
Podešavanja Cline ekstenzije → API Provider: `OpenAI Compatible` → Base URL: `http://localhost:20128/v1`

Ili koristite OmniRoute dashboard → **CLI Tools → Cline → Apply Config**.

---

#### KiloCode (CLI ili VS Code)

**CLI režim:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code podešavanja:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Ili koristite OmniRoute dashboard → **CLI Tools → KiloCode → Apply Config**.

---

#### Continue (VS Code ekstenzija)

Izmenite `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Ponovo pokrenite VS Code posle izmene.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Koristite ovo kada je VS Code Insiders konfigurisan za prilagođene endpoint modele i želite da OmniRoute radi bez dodatnog polja za zaglavlje (header).

**Preporučena lokacija:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Primer korišćenja tokenizovanog OmniRoute aliasa:**

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

**Napomene:**

- Zamenite `sk-your-omniroute-key` API ključem kreiranim u OmniRoute.
- Polje `url` treba da pokazuje na `/api/v1/vscode/{token}/chat/completions`.
- Polje `modelsUrl` treba da pokazuje na `/api/v1/vscode/{token}/models`.
- Preferirajte normalan tok `/v1` + Bearer zaglavlje kada klijent podržava prilagođena zaglavlja.
- Tokeni ugrađeni u URL su rezervni mehanizam kompatibilnosti i mogu se pojaviti u editor logovima ili proxy istoriji.

---

#### Kiro CLI (Amazon)

```bash
# Prijavite se na svoj AWS/Kiro nalog:
kiro-cli login

# CLI koristi svoju sopstvenu autentikaciju — OmniRoute nije potreban kao backend za sam Kiro CLI.
# Koristite kiro-cli zajedno sa OmniRoute za druge alate.
kiro-cli status
```

Za desktop aplikaciju **Kiro IDE**, koristite MITM endpoint koji izlaže OmniRoute
pod `/dashboard/cli-tools → Kiro`.

---

## 10. Interni OmniRoute CLI

Binarni fajl `omniroute` obezbeđuje komande za životni ciklus servera, podešavanje, dijagnostiku i upravljanje provajderima. Ulazna tačka: `bin/omniroute.mjs`.

```bash
omniroute                              # Pokreni server (podrazumevani port 20128)
omniroute setup                        # Interaktivni čarobnjak za podešavanje
omniroute doctor                       # Provera konfiguracije, baze podataka, portova, runtime-a
omniroute providers list               # Konfigurisane konekcije sa provajderima
omniroute providers test-all           # Testiraj svaku aktivnu konekciju
omniroute reset-password               # Resetuj admin lozinku
omniroute logs                         # Prikaz logova zahteva u realnom vremenu
omniroute health                       # Detaljno zdravstveno stanje (breakers, cache, memorija)
omniroute --version                    # Ispiši verziju
omniroute --help                       # Prikaži sve komande
```

### Podešavanje i inicijalizacija

```bash
omniroute setup                        # Interaktivni čarobnjak za podešavanje
omniroute setup --non-interactive      # CI/automatizacioni režim (čita env promenljive + flagove)
omniroute setup --password '<value>'   # Postavi admin lozinku direktno
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Dodaj i testiraj provajdera u jednom koraku
```

Prepoznate promenljive okruženja za neinteraktivno podešavanje:

| Promenljiva         | Namena                                                                 |
| ------------------- | ---------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | API ključ provajdera (povezan sa `--api-key` putem Commander `.env()`) |
| `DATA_DIR`          | Prepiši OmniRoute direktorijum za podatke                              |

Svi ostali neinteraktivni unosi se prosleđuju kao flagovi, a ne kao promenljive okruženja:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(pogledajte opcije `omniroute setup` iznad).

### Dijagnostika

```bash
omniroute doctor                       # Provera konfiguracije, baze podataka, portova, runtime-a, memorije, dostupnosti
omniroute doctor --json                # Mašinski čitljiv JSON
omniroute doctor --no-liveness         # Preskoči HTTP health probu
omniroute doctor --host 0.0.0.0        # Prepiši liveness host
omniroute doctor --liveness-url <url>  # Potpuno prepisivanje URL-a za health endpoint
```

Doctor pokreće ove provere: `Config`, `Database`, `Storage/encryption`,
`Port availability`, `Node runtime`, `Native binary` (better-sqlite3),
`Memory` i `Server liveness`. Izlazi sa ne-nula kodom ako bilo koja provera vrati `fail`.

### Upravljanje provajderima

```bash
omniroute providers available                       # OmniRoute katalog provajdera
omniroute providers available --search openai       # Filtriraj katalog po id/name/alias/category
omniroute providers available --category api-key    # Filtriraj po kategoriji (api-key, oauth, free, ...)
omniroute providers available --json                # Mašinski čitljiv JSON

omniroute providers list                            # Konfigurisane konekcije sa provajderima
omniroute providers list --json

omniroute providers test <id|name>                  # Testiraj jednu konfigurisanu konekciju
omniroute providers test-all                        # Testiraj svaku aktivnu konekciju
omniroute providers validate                        # Isključivo lokalna strukturna validacija
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Postojeći OAuth tok
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` su API-first i zato radi u okviru
aktivnog lokalnog ili udaljenog konteksta. Unos kredencijala treba da koristi
`--credential-stdin` ili `--credential-env`; `--dry-run --json` prikazuje samo
zaklonjeno prisustvo/oblik podataka. `providers available` čita OmniRoute katalog;
`providers list/test/test-all/validate` čuvaju svoje lokalno SQLite ponašanje i
ne zahtevaju da server bude pokrenut.

### Oporavak i resetovanje

```bash
omniroute reset-password                # Resetuj admin lozinku (takođe: omniroute-reset-password)
omniroute reset-encrypted-columns       # Prikaži upozorenje + dry-run za resetovanje šifrovanih kredencijala
omniroute reset-encrypted-columns --force  # Zaista postavi na null šifrovane kredencijale u SQLite
```

### Izvoz kredencijala (⚠ rukovati sa pažnjom)

```bash
omniroute auth export                                 # Prikaži upozorenje + kapiju za potvrdu — nema pristupa bazi podataka
omniroute auth export --force                          # Izvezi DEKRIPTOVANE kredencijale SVIH konekcija na stdout kao JSON
omniroute auth export --force --id <id>                 # Izvezi samo odgovarajuću konekciju
omniroute auth export --force --format env               # Emituj linije u formatu OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Upiši u fajl (kreiran sa dozvolama 0600)
```

`auth export` je **isključivo lokalna** komanda (direktno čitanje SQLite, nema HTTP rute) i namerno ispisuje/upisuje
vrednosti `apiKey`/`accessToken`/`refreshToken`/`idToken` u **plain-text** obliku — to je namenjena funkcionalnost, a ne
greška. Ništa se ne čita iz baze podataka i ništa se ne dekriptuje bez `--force`. Upozoravajuća poruka na stderr-u
uvek se ispisuje pre nego što se prikaže bilo koji plain-text sadržaj. Zahteva da `STORAGE_ENCRYPTION_KEY` bude
postavljen. Za polje koje ne uspe da se dekriptuje (zastareo ključ, oštećen šifrovani tekst) prijavljuje se
`<field>DecryptFailed: true` umesto prekidanja celog izvoza ili otkrivanja osnovne greške.

### Ostale podkomande

Ove komande pretpostavljaju da je OmniRoute server pokrenut, osim ako je drugačije naznačeno:

```bash
omniroute status                       # Sveobuhvatni status u realnom vremenu
omniroute logs                         # Prikaz logova zahteva u realnom vremenu (--json, --search, --follow)
omniroute config show                  # Prikaži trenutnu konfiguraciju

omniroute provider list                # Prikaži dostupne provajdere (alias za providers list)
omniroute provider add                 # Registruj OmniRoute kao provajdera na alatu
omniroute keys add | list | remove     # Upravljaj API ključevima
omniroute models [provider]            # Prikaži modele (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Snimak konfiguracije + baze podataka
omniroute restore                      # Vrati stanje iz prethodnog snimka

omniroute health                       # Detaljno zdravstveno stanje (breakers, cache, memorija)
omniroute quota                        # Iskorišćenost kvota provajdera
omniroute cache                        # Status keša
omniroute cache clear                  # Obriši semantičke keševe i keševe potpisa

omniroute mcp status | restart         # Status / restart MCP servera
omniroute a2a status | card            # Status A2A servera / kartica agenta

omniroute tunnel list | create | stop  # Upravljaj tunelima (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Pregled / postavljanje env promenljivih (privremeno)

omniroute test                         # Test povezanosti sa provajderom
omniroute update                       # Provera dostupnih ažuriranja
omniroute completion                   # Generisanje automatskog dovršavanja za shell
```

### Zajednički flagovi

| Flag                | Opis                                                  |
| ------------------- | ----------------------------------------------------- |
| `--no-open`         | Ne otvaraj automatski pregledač prilikom pokretanja   |
| `--port <n>`        | Prepiši API port (podrazumevano 20128)                |
| `--mcp`             | Pokreni kao MCP server preko stdio (za IDE-ove)       |
| `--non-interactive` | CI režim (nema upita; čita iz env/flagova)            |
| `--json`            | Mašinski čitljiv JSON izlaz (doctor, providers, itd.) |
| `--help`, `-h`      | Prikaži pomoć za konkretnu komandu                    |
| `--version`, `-v`   | Ispiši instaliranu verziju                            |

---

## Dostupne API krajnje tačke

| Krajnja tačka              | Opis                             | Koristi se za                        |
| -------------------------- | -------------------------------- | ------------------------------------ |
| `/v1/chat/completions`     | Standardni chat (svi provajderi) | Sve moderne alate                    |
| `/v1/responses`            | Responses API (OpenAI format)    | Codex, agentske radne tokove         |
| `/v1/completions`          | Zastareli tekstualni completions | Starije alate koji koriste `prompt:` |
| `/v1/embeddings`           | Tekstualni embeddings            | RAG, pretragu                        |
| `/v1/images/generations`   | Generisanje slika                | GPT-Image, Flux, itd.                |
| `/v1/audio/speech`         | Pretvaranje teksta u govor       | ElevenLabs, OpenAI TTS               |
| `/v1/audio/transcriptions` | Pretvaranje govora u tekst       | Deepgram, AssemblyAI                 |

Primeri spremni za lepljenje sa tokenizovanim OmniRoute URL-om:

```txt
Primer tokena: sk-a3ab3c080beaee3a-69f4a4-070d71af

Standardna OpenAI osnova: http://localhost:20128/v1
VS Code modeli: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code responses: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama tags: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Rešavanje problema

| Greška                                               | Uzrok                           | Rešenje                                                 |
| ---------------------------------------------------- | ------------------------------- | ------------------------------------------------------- |
| `Connection refused`                                 | OmniRoute nije pokrenut         | `omniroute serve`                                       |
| `401 Unauthorized`                                   | Pogrešan API ključ              | Provjerite u `/dashboard/api-manager`                   |
| `No combo configured`                                | Nema aktivnog rutiranog kombo-a | Podesite u `/dashboard/combos`                          |
| CLI prikazuje "not installed"                        | Binarni fajl nije u PATH        | Provjerite `which <command>`                            |
| Dashboard prikazuje "not detected" nakon instalacije | Zastareli keš                   | Kliknite na "⟳ Refresh detection" u dashboard-u         |
| Stari link `/dashboard/cli-tools`                    | Bookmark pre v3.8.6             | Automatski preusmereno na `/dashboard/cli-code` (308)   |
| Stari link `/dashboard/agents`                       | Bookmark pre v3.8.6             | Automatski preusmereno na `/dashboard/acp-agents` (308) |
