# CLI-TOOLS (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇬🇷 [el](../../../el/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇪🇪 [et](../../../et/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇷 [hr](../../../hr/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇱🇹 [lt](../../../lt/docs/reference/CLI-TOOLS.md) · 🇱🇻 [lv](../../../lv/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇲🇹 [mt](../../../mt/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇮 [sl](../../../sl/docs/reference/CLI-TOOLS.md) · 🇷🇸 [sr](../../../sr/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "Uirlisí CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-23
---

# Uirlisí CLI — OmniRoute

Nuashonrú deireanach: 2026-08-23

Intéiríonn OmniRoute le trí chatagóirí de uirlisí CLI a scaiptheadh ar thrí leathanaigh deasc speisialta:

| Leathanach     | Bóthar                  | Coincheap                                                                                        | Líon           |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------ | -------------- |
| **CLI Code's** | `/dashboard/cli-code`   | Uirlisí cláir a sheolann tú i dtreo OmniRoute (Cliant → CLI → OmniRoute → Soláthraí)             | 26             |
| **CLI Agents** | `/dashboard/cli-agents` | gníomhairí uathrialacha a sheolann tú i dtreo OmniRoute (an sreabhadh céanna, raon níos leithne) | 10             |
| **ACP Agents** | `/dashboard/acp-agents` | CLIs a ghineann OmniRoute mar backend trí stdio/ACP (sreabhadh droim ar ais)                     | féach clárlann |

Atreoraíonn an tseanchéimseacht trí 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Conas a Oibríonn sé

```
Uirlisí CLI / Ailt (sreabhadh tomhaltais):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (seolann gach ceann acu i dtreo OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (rithíonn OmniRoute i dtreo an tsoláthraí ceart)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

Gníomhairí ACP (sreabhadh cruthú droim ar ais):
    Iarratas Cliant → OmniRoute → cruthaíonn CLI trí stdio/ACP → freagra
```

**Buntáistí:**

- Eochair API amháin le haghaidh gach uirlis
- Rianú costais trasna gach CLI sa deasc
- Athrú samhail gan gach uirlis a chumrú arís
- Oibríonn go háitiúil agus ar fhreastalaithe iarghalta (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Cumrú go huathoibríoch le `setup-*`

Ní gá duit cumrú gach uirlis a scríobh de láimh. Seolann OmniRoute ordú `setup-*`
do gach CLI tacaíochta a léann an **bheo** catalóg samhlacha ó OmniRoute ag rith
(áitiúil nó iarghalta) agus a scríobhann cumrú na huirlise féin ar do mheaisín:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
omniroute setup-5dive
```

Glacann gach ceann acu le `--remote <url> --api-key <key>` (cumraigh uirlis áitiúil in aghaidh
OmniRoute iarghalta), `--dry-run` (réamhamharc gan scríobh), agus `--port`. Níl uirlisí
gan aimsiú samhlacha uathoibríoch (Cline, Kilo, Roo, Goose, Aider, Qwen, 5dive) ag cur
`--model <id>` (agus `--yes` le haghaidh rith neamh-idirghníomhach). Is é `setup-5dive` an t-oideas
amháin nach scríobhann faoi `$HOME`: cuireann sé feabhsócháin gníomhaire 5dive ar bun trí
scríobh próifíl údaraithe ar úinéireacht iomlán ar an óstach feilt, mar sin athsheolann sé trí `sudo`
agus níl modh iarghalta aige féin. Chun CLI a sheoladh leis an
timpeallacht cheart injecte agus gan cumrú ar bith a scríobh, úsáid an
seoladóir ginearálta `omniroute run <sprioc>` (claude, codex, aide, goose, opencode, qwen,
gemini — tá na spriocanna agus an ailias ag teacht ó `bin/cli/cli-manifest.mjs`); tá na
seoladóirí seanbhealaigh in aghaidh na huirlise `omniroute launch` (Claude Code) agus `omniroute launch-codex`
(Codex) fós ar fáil. Is é Gemini CLI seoladh amháin: is é sprioc é le haghaidh `omniroute run`
ach níl aige `setup-*`/`configure` oideas.

> **Tagairt iomlán:** an tábla máistir — a scríobhann gach ordú, gach bratach,
> áitiúil i gcoinne iarghalta, agus cén uirlisí a theastaíonn `/v1` sufhógra — sa
> **[Comhtháthuithe CLI](../guides/CLI-INTEGRATIONS.md)**.

### Ag rith na rudaí seo laistigh de choimeádán

Nuair a rithíonn ordú `setup-*` laistigh de choimeádán OmniRoute, scríobhann sé isteach sa
baile féin den choimeádán, nach léann aon CLI óstach agus imíonn leis an
choimeádán. Braithfidh OmniRoute é sin agus dúnfaidh sé le `2` le treoranna ina ionad scríobh. Dhá
bealach tacaíochta le leanúint ar aghaidh — suiteáil an CLI ar an óstach agus
`omniroute connect` leis an gcoimeádán, nó ceangail ceangail na填充填充目录填充目录 agus socraigh
`CLI_CONFIG_HOME` (próifíl `host` comhdhéanta). Glacann gach ordú `setup-*`, móide
`omniroute configure` agus `omniroute config set`, le
`--allow-container-write` nuair is é atá i gceist agat i ndáiríre ná CLIs an choimeádáin féin a chumrú; dhéanann
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` an rud céanna don
fhreastalaí. Féach
[Treoir Docker → Cumrú uirlisí CLI óstacha](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

For介入点填充 deasc填充 (`POST /api/cli-tools/apply`) cuireann sí an
cosaint chéanna i bhfeidhm: i gcoimeádán, freagann scríobh a bhfuil a sprioc nach bhfuil ceangailte ón
óstach le **`422`** le `containerEphemeralTarget: true`, an téacs earráide slán agus — d'fhonn na
uirlisí le hiodra óstach (claude, codex, opencode, cline,
kilo, continue) — `hostSetupCommand` (m.sh. `omniroute setup-opencode`) le rith
ar an óstach ina ionad; ní scríobhtar aon rud. Coinníonn `dryRun: true` ag obair sa cheangail
填充填充 agus fillfidh sé an t-ábhar ginte + cosán sprioc gan an diosca a bhaint, mar sin
is féidir leat réamhamharc a dhéanamh ón deasc agus iarratas a dhéanamh ar an óstach. Tá an iompar seo
intentional agus cosanta ag athbheochan
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — ná "ceartaigh" 422
trí an cosaint a bhaint.

## Fírinne an Bhunabhair

Tá an catalóg aonphointe in áit `src/shared/constants/cliTools.ts` mar `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Tá na réimsí seo a leanas ag gach iontráil (sainmhínithe in `src/shared/schemas/cliCatalog.ts`):

| Réimse                                          | Cineál                                                       | Cur síos                                                                                |
| ----------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Cén leathanach a mbíonn an t-uirlis air                                                 |
| `vendor`                                        | `string`                                                     | Bunús an uirlis ("Anthropic", "OSS (P. Gauthier)")                                      |
| `acpSpawnable`                                  | `boolean`                                                    | In-úsáide freisin mar Gníomhaire ACP (badge taispeáinte)                                |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Leibhéal tacaíochta an chrios seomra deiridh saincheaptha. `"none"` = MITM ar feitheamh |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Meicníocht cumraíochta                                                                  |
| `id`, `name`, `color`, `description`, `docsUrl` | caighdeánach                                                 | Príomh-réimsí taispeána                                                                 |

Ní thaispeántar iontráil le `baseUrlSupport: "none"` ar na leathanaigh stiúirchlstáin — cláraítear iad i liosta feitheamh MITM do phlean 11 (féach `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Treibheanna cumais (cláraithe × indéanta × cumraithe × in-seolta)

Níl gach uirlis atá cláraithe indéanta, in-athrú ina cumraíocht ná in-seolta. Tá foinse dearbhaithe amháin ag gach treibh, agus coinníonn tástáil dóichigh iad ag teacht le chéile:

| Treibh        | Ciall                                                                                 | Dearbhaithe i                                                       |
| ------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Cláraithe** | Taispeántar i gclár na stiúirchlstáin (ainm, vendor, doiciméad, cineál cumraíochta)   | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                    |
| **Indéanta**  | Brathadh débhdhair/cumraíochta, sláinte, cosáin cumraíochta                           | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` catalóg rithaimse) |
| **Cumraithe** | Tacaíocht ag `omniroute configure <cli>` (próiseas socraithe ann)                     | `bin/cli/cli-manifest.mjs` (`configure: true`)                      |
| **In-seolta** | Tacaíocht ag `omniroute run <target>` (insteamáil timpeallacht/argóintí sainmhínithe) | `bin/cli/cli-manifest.mjs` (`run: true`)                            |

Is é `bin/cli/cli-manifest.mjs` an clárlann inmhistéir beacht do na dromchlaí CLI: cuireann `run`, `configure` agus na ginearálaí críoch-chothromaíochta shell a liostaí spriocanna, réiteach ainmneacha (mar shampla `kilocode`/`kilo-code`/`kilo_cli` → `kilo`) agus sreangú bratach `--model` ina n-oiniún as. dearbhaíonn an cosantóir dóichigh `tests/unit/cli/cli-manifest-drift.test.ts` go bhfanann an clárlann, an catalóg rithaimse, an chatalóg agus gach dromchla tomhaltais ar chéim — má chuirtear sprioc le dromchla amháin gan iad siúd eile, theipeann an tsraith seachas dul ar strae ina dhiaidh go ciúin.

---

## 1. Catalóg an Chóid CLI (2005 uirlis)

Na huirlisí go léir atá le fáil i `/dashboard/cli-code`. Tá iad siúd a bhfuil `baseUrlSupport: none' acu ceangailte trí MITM nó treoir láimhe in ionad URL bonnlainne saincheaptha:

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

Taispeánann na huirlisí a bhfuil `baseUrlSupport: "partial"` acu scála "⚠ Base URL parcial" sa chárta stiúrphainéil.

## 2. catalóg na nGníomhaire CLI (10 n-uirlis)

Gníomhaire neamhspleácha a thaispeántar i `/dashboard/cli-agents`:

| id           | ainm             | díoltóir                 | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | lán            | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | lán            | true         |
| goose        | Goose            | Block / Linux Foundation | lán            | true         |
| interpreter  | Open Interpreter | OSS                      | lán            | true         |
| warp         | Warp AI          | Warp Inc.                | páirteach      | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | lán            | false        |
| omp          | Oh My Pi         | OSS                      | lán            | true         |
| letta        | Letta CLI        | Letta                    | lán            | false        |
| prime-agent  | Prime Agent      | Prime Intellect (OSS)    | lán            | false        |
| 5dive        | 5dive            | OSS (5dive-ai)           | lán            | false        |

---

## 3. Gníomhaire ACP (/dashboard/acp-agents)

Taispeánann an leathanach seo (athainmnithe ó `/dashboard/agents`) CLIs ar féidir le OmniRoute a **bheith ag sileadh** mar innill chomhphróiseála in aice le prótacal stdio/ACP. Tá an catalóg coinnithe ar leith i `src/lib/acp/registry.ts` agus **ní hé** an rud céanna le `CLI_TOOLS`.

---

## 4. Liosta cúltaca MITM (gan taispeáint ar an deais)

Ní thacaíonn na CLIs seo a leanas le bonn URL saincheaptha go nádúrtha agus níl siad **liostaithe** i leathanaigh Cód CLI nó Gníomhaire CLI. Is iad iad iarrthóirí le haghaidh idirghabhála MITM i phlean 11:

| CLI                 | Fáth                                                                            |
| ------------------- | ------------------------------------------------------------------------------- |
| windsurf            | BUNAITHE ar chríocha CHOOSE de rogha samhlacha Claude + URL/token corparáideach |
| amp                 | Eiceolaíocht dhún (Sourcegraph)                                                 |
| amazon-q / kiro-cli | Fíordheimhnigh SSO AWS, gan bonn URL saincheaptha                               |
| cowork              | Deasc Anthropic, gan críochphointe cumraithe                                    |

Féach `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` le haghaidh an chomhthreochta iomlán.

---

## 5. API Brath Batches

Tá gach brath uirlis carnaithe trí shuíomh amháin:

**`GET /acht/usaid_clii/uile-stadai`**

- Údarú: `requireCliToolsAuth(request)` (cosúil le bealaí eile `/acht/usaid_clii/`)
- Tuairisce: `Record<toolId, ToolBatchStatus>` (cineál: `src/sainroinnt/cineail/cliBatchStatus.ts`)
- Straitéis: `Promise.all` thar gach uirlis, am 5s in aghaidh na huirlise
- Taisce: LRU i gcuimhne innéacsaithe ag leabharmharc cumraíochta an chomhaid `mtime`. Díthaiscíonn an taisce nuair a athraíonn mtime. Athshuiteáil ar atosú an bhfreastalaí.

Cuma an tuairisce in aghaidh na huirlise:

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
  error?: string; // glanta, gan lorgaí staacke
}
```

## 6. Lámhscríbhinní Socrúcháin do Uirlisí Nua

Tá bealaí API socrúcháin ar leith ag uirlisí nua le `configType: "custom"`:

| Bealach                                     | Uirlis                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------ |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                                  |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                                  |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                                   |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, príomhúil + comhoibriú legacy `~/.deepseek`) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                    |
| `POST /api/cli-tools/pi-settings`           | Pi agent ríomhchláraithe                                                 |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                    |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + eochair `.env` ar leith)            |

Úsáideann gach bealach `sanitizeErrorMessage()` le haghaidh freagraí earráide (Rial #12).

---

## 7. Imleabhar na leathanaigh painéil

### CLI Code (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — comhpháirt freastalaí
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — greille chliant
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — leathanach mionsonraí uirlise
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 charr uirlise speisialaithe + `ToolDetailClient.tsx`

### Ailtirí CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — comhpháirt freastalaí
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — greille chliant
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — úsáideann arís `ToolDetailClient`

### Ailtirí ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — comhpháirt freastalaí (bhog ó `agents/`)

### Comhpháirteanna Comhroinnte UI (`src/shared/components/cli/`)

| Comhad                  | Cuspóir                                                      |
| ----------------------- | ------------------------------------------------------------ |
| `CliToolCard.tsx`       | Cárta stádas cliste (braite + cumraíocht + deireadh)         |
| `CliConceptCard.tsx`    | Cárta míniúcháin coincheap leathanach                        |
| `CliComparisonCard.tsx` | Cuideachta trí colún ar threochtaí CLI éagsúla               |
| `BaseUrlSelect.tsx`     | Anuas roghnúcháin deireadh (Áitiúil/Sa scamall/Saincheaptha) |
| `ApiKeySelect.tsx`      | Roghnóir eochair API                                         |
| `ManualConfigModal.tsx` | Modhal mionsonraí cumraíochta in-inniúil                     |

### Crostaigh Comhroinnte (`src/shared/hooks/cli/`)

| Comhad                    | Cuspóir                                                                        |
| ------------------------- | ------------------------------------------------------------------------------ |
| `useToolBatchStatuses.ts` | Faigheann `/api/cli-tools/all-statuses`, bainistíonn stádas lódála/athnuachana |

## 8. i18n

Ainmchláir nua curtha leis i bplean 14 F9:

| Ainmchlar   | Cuspóir                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `cliCommon` | Sreangáin choiteanna (lipéid chárta, téacsanna coincheap/comparáide, lipéid leathanach sonraí) |
| `cliCode`   | Sreangáin leathanaigh CLI Code                                                                 |
| `cliAgents` | Sreangáin leathanaigh CLI Agents                                                               |
| `acpAgents` | Sreangáin leathanaigh ACP Agents                                                               |

Tá aistriúcháin iomlána PT-BR agus EN ar fáil. Titeann 39 áit eile ar ais go huathoibríoch trí chumascú ar leibhéal ainmchlair i `src/i18n/request.ts`.

---

## 9. Tús Tapaidh

### Céim 1 — Faigh Eochair API OmniRoute

1. Oscail `/dashboard/api-manager` → **Cruthaigh Eochair API**
2. Cuir ainm air (m.sh. `cli-cli-tools`) agus roghnaigh gach cead
3. Cóipeáil an eochair — beidh uait í do gach CLI thíos

> Is cosúil do d'eochair: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Céim 2 — Suiteáil Uirlisí CLI

Éilíonn gach uirlis atá bunaithe ar npm Node.js 22.22.2+ nó 24.x:

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

# Google Gemini CLI (inshine le `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Bunaithe ar Rust

# Pi coding agent
# féach https://github.com/zechnerj/pi-coding-agent le haghaidh suiteála

# jcode
# féach https://github.com/1jehuang/jcode le haghaidh suiteála
```

---

### Céim 3 — Cumraigh Tríd an Deais

1. Téigh go `http://localhost:20128/dashboard/cli-code`
2. Lorg d'uirlis sa ghreille
3. Cliceáil an chun an leathanach sonraí an uirlis a oscailt
4. Roghnaigh d'eochair API agus URL bonn
5. Cliceáil **Cuir Cumraíocht i bhFeidhm** nó cóipeáil an blúr cumraíochta láimhe

---

### Céim 4 — Socraigh Athróga Timpeallachta Comhshóisearacha

```bash
# Deireadh Uilíoch OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Léann Gemini CLI GOOGLE_GEMINI_BASE_URL ag an BUNRUD (cuireann a SDK /v1beta/... leis féin)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Le haghaidh **freastalaí i gcéin**, cuir IP an fhreastalaí nó an fearann in ionad `localhost:20128`,
> m.sh. `http://<do-ip-freastalaí>:20128`.

---

### Céim 4 — Cumraigh Gach Uirlis

#### Claude Code

```bash
# Cruthaigh ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Bain úsáid as an bhunús geata comhtháite Anthropic le haghaidh Claude Code. Ná cuir `/v1` leis anseo.

**Tástáil:** `claude "abair haló"`

---

#### OpenAI Codex

Léann Codex nua-aimseartha (v0.137+) `~/.codex/config.toml` amháin — tá an seanchomhad
`config.yaml` san npm CLI seanaimseartha agus déantar neamhaird de go ciúnach. Fanann an
eochair API san athróg timpeallachta `OMNIROUTE_API_KEY` (`env_key`), ní ann don chomhad:

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

Tagairt iomlán (próifílí, `wire_api`, fuinneoga comhthéacs): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Tástáil:** `codex "cad é 2+2?"`

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

**Tástáil:** `opencode`

> Bain úsáid as `opencode run "do phrómpt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> chun malairtí smaointeoireachta a sheoladh.

---

#### Cline (CLI nó VS Code)

**Modh CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Modh VS Code:**
Socruithe síneadh Cline → Soláthraí API: `OpenAI Compatible` → URL Bonn: `http://localhost:20128/v1`

Nó bain úsáid as deais OmniRoute → **Uirlisí CLI → Cline → Cuir Cumraíocht i bhFeidhm**.

---

#### KiloCode (CLI nó VS Code)

**Modh CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Socruithe VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Nó bain úsáid as deais OmniRoute → **Uirlisí CLI → KiloCode → Cuir Cumraíocht i bhFeidhm**.

---

#### Continue (Síneadh VS Code)

Cuir `~/.continue/config.yaml` in eagar:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Atosaigh VS Code tar éis eagarthóireachta.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Bain úsáid as seo nuair a bhíonn VS Code Insiders cumraithe le haghaidh múnlaí deireadh saincheaptha agus gur mhaith leat go n-oibreoidh OmniRoute gan réimse ceanntaca saincheaptha.

**Suíomh molta:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Sampla ag baint úsáide as an alias tokenizeáilte OmniRoute:**

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

**Nótaí:**

- Cuir `sk-your-omniroute-key` in ionad eochair API cruthaithe i OmniRoute.
- Ba cheart an réimse `url` a bheith dírithe ar `/api/v1/vscode/{token}/chat/completions`.
- Ba cheart an réimse `modelsUrl` a bheith dírithe ar `/api/v1/vscode/{token}/models`.
- Is fearr an normal `/v1` + sream ceanntaca Bearer nuair a thacaíonn an cliant le ceanntacaí saincheaptha.
- Is éifeachtúlacht comhoibriúcháin iad ionaid URL-inneáilte agus d'fhéadfadh go mbeidh siad le feiceáil i logaite an eagarthóra nó stair an seachthreorach.

---

#### Kiro CLI (Amazon)

```bash
# Logáil isteach i d'eochair Kiro/AWS:
kiro-cli login

# Úsáideann an CLI a dhóthain féin — ní gá OmniRoute mar chúlra don Kiro CLI féin.
# Bain úsáid as kiro-cli in éineacht le OmniRoute le haghaidh uirlisí eile.
kiro-cli status
```

Le haghaidh an aip deisce **Kiro IDE**, bain úsáid as an deireadh MITM nochta ag OmniRoute
faoi `/dashboard/cli-tools → Kiro`.

---

## 10. Cliant Inmheánach OmniRoute

Soláthraíonn an dénártha `omniroute` orduithe do shaolré an fhreastalaí, do shocrú, do dhiagnóisic, agus do bhainistíocht soláthraithe. Pointe iontrála: `bin/omniroute.mjs`.

```bash
omniroute                              # Tosaigh freastalaí (port réamhshocraithe 20128)
omniroute setup                        # Draoi socraithe idirghníomhach
omniroute doctor                       # Seiceáil cumraíocht, DB, poirt, am rite
omniroute providers list               # Naisc soláthraithe cumraithe
omniroute providers test-all           # Tástáil gach nasc gníomhach
omniroute reset-password               # Athshocraigh pasfhocal riarthóra
omniroute logs                         # Sruth logaí iarratais
omniroute health                       # Sláinte mhionsonraithe (breakers, taisce, cuimhne)
omniroute --version                    # Priontáil leagan
omniroute --help                       # Taispeáin gach ordú
```

### Socrú & Túsú

```bash
omniroute setup                        # Draoi socraithe idirghníomhach
omniroute setup --non-interactive      # Mód CI/uathoibrithe (léann athróg env + bratacha)
omniroute setup --password '<luach>'   # Socraigh pasfhocal riarthóra go díreach
omniroute setup --add-provider \
  --provider openai \
  --api-key '<luach>' \
  --test-provider                      # Cuir agus tástáil soláthraí in aon iarracht amháin
```

Athróga timpeallachta aitheanta do shocrú neamh-idirghníomhach:

| Var                 | Cuspóir                                                                  |
| ------------------- | ------------------------------------------------------------------------ |
| `OMNIROUTE_API_KEY` | Eochair API soláthraí (ceangailte le `--api-key` trí Commander `.env()`) |
| `DATA_DIR`          | Sáraigh eolaire sonraí OmniRoute                                         |

Seoltar gach ionchur neamh-idirghníomhach eile mar bhratacha, ní mar athróga timpeallachta:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(féach roghanna `omniroute setup` thuas).

### Diagnóisic

```bash
omniroute doctor                       # Seiceáil cumraíocht, DB, poirt, am rite, cuimhne, beocht
omniroute doctor --json                # JSON inléite ag meaisín
omniroute doctor --no-liveness         # Scipeáil an taiscéalaí sláinte HTTP
omniroute doctor --host 0.0.0.0        # Sáraigh óstach beochta
omniroute doctor --liveness-url <url>  # Sáraigh URL iomlán críochphointe sláinte
```

Ritheann an dochtúir na seiceálacha seo: `Cumraíocht`, `Bunachar Sonraí`, `Stóráil/chriptiú`,
`Infhaighteacht Poirt`, `Am rite Node`, `Dénártha dúchais` (better-sqlite3),
`Cuimhne`, agus `Beocht fhreastalaí`. Scoireann sé le stádas neamh-nialasach má theipeann ar aon seiceáil.

### Bainistíocht Soláthraithe

```bash
omniroute providers available                       # Catalóg soláthraithe OmniRoute
omniroute providers available --search openai       # Scag catalóg de réir id/ainm/ailias/catagóir
omniroute providers available --category api-key    # Scag de réir catagóire (api-key, oauth, free, ...)
omniroute providers available --json                # JSON inléite ag meaisín

omniroute providers list                            # Naisc soláthraithe cumraithe
omniroute providers list --json

omniroute providers test <id|ainm>                  # Tástáil nasc cumraithe amháin
omniroute providers test-all                        # Tástáil gach nasc gníomhach
omniroute providers validate                        # Bailíochtú struchtúrach áitiúil amháin
omniroute providers add <soláthraí> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <soláthraí>                 # Sreabhadh OAuth atá ann cheana
omniroute providers edit <id|ainm> --default-model <samhail>
omniroute providers remove <id|ainm> --yes
```

Tá `providers add/import/auth/edit/remove` API-chéad agus mar sin oibríonn siad
i gcoinne an chomhthéacs áitiúil nó cianda ghníomhach. Ba cheart ionchur dintiúr a úsáid
`--credential-stdin` nó `--credential-env`; tuairiscíonn `--dry-run --json` ach
láithreacht/cruth athscríofa. Léann `providers available` catalóg OmniRoute;
coinníonn `providers list/test/test-all/validate` a n-iompar áitiúil SQLite agus
ní theastaíonn an freastalaí a bheith ag rith.

### Aisghabháil & Athshocrú

```bash
omniroute reset-password                # Athshocraigh pasfhocal riarthóra (freisin: omniroute-reset-password)
omniroute reset-encrypted-columns       # Taispeáin rabhadh + dry-run d'athshocrú dintiúr criptithe
omniroute reset-encrypted-columns --force  # Cuir dintiúir chriptithe ar neamhní i SQLite
```

### Easpórtáil Dintiúr (⚠ láimhseáil go cúramach)

```bash
omniroute auth export                                 # Taispeáin rabhadh + geata deimhnithe — gan rochtain DB
omniroute auth export --force                          # Easpórtáil dintiúir DHICHRIPTITHE gach naisc chuig stdout mar JSON
omniroute auth export --force --id <id>                 # Easpórtáil ach an nasc comhoiriúnach
omniroute auth export --force --format env               # Astaigh línte OMNIROUTE_<SOLÁTHRAÍ>_<RÉIMSE>=<luach>
omniroute auth export --force --out creds.json           # Scríobh chuig comhad (cruthaithe le ceadanna 0600)
```

Tá `auth export` **áitiúil amháin** (léamh díreach SQLite, gan ród HTTP) agus priontálann/scríobhann sé
d'aon ghnó luachanna **gnáth-théacs** `apiKey`/`accessToken`/`refreshToken`/`idToken` — sin é an ghné, ní
fabht é. Ní léitear aon rud ón mbunachar sonraí, agus ní dhíchriptítear aon rud, gan `--force`. Priontáiltear
meirge rabhaidh ar stderr i gcónaí roimh aon ghnáth-théacs a astú. Éilíonn sé go mbeidh `STORAGE_ENCRYPTION_KEY`
socraithe. Tuairiscítear réimse a theipeann air díchriptiú (seaneochair, criptitheacs truaillithe) mar
`<réimse>DecryptFailed: true` in ionad an t-easpórtáil iomlán a chur ar ceal nó an earráid bhunúsach a sceitheadh.

### Fo-orduithe eile

Glacann siad seo freastalaí OmniRoute atá ag rith, mura dtugtar a mhalairt faoi deara:

```bash
omniroute status                       # Stádas cuimsitheach am rite
omniroute logs                         # Sruth logaí iarratais (--json, --search, --follow)
omniroute config show                  # Taispeáin cumraíocht reatha

omniroute provider list                # Liostaigh soláthraithe atá ar fáil (ailias de providers list)
omniroute provider add                 # Cláraigh OmniRoute mar sholáthraí ar uirlis
omniroute keys add | list | remove     # Bainistigh eochracha API
omniroute models [soláthraí]            # Liostaigh samhlacha (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Greamán cumraíochta + DB
omniroute restore                      # Athchóirigh ó ghreamán roimhe seo

omniroute health                       # Sláinte mhionsonraithe (breakers, taisce, cuimhne)
omniroute quota                        # Úsáid cuóta soláthraí
omniroute cache                        # Stádas taisce
omniroute cache clear                  # Glan taisce shéimeantach + síniú

omniroute mcp status | restart         # Stádas freastalaí MCP / atosaigh
omniroute a2a status | card            # Stádas freastalaí A2A / cárta gníomhaire

omniroute tunnel list | create | stop  # Bainistigh tolláin (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Iniúch / socraigh athróga env (sealadach)

omniroute test                         # Tástáil deataigh nascachta soláthraí
omniroute update                       # Seiceáil le haghaidh nuashonruithe
omniroute completion                   # Gine críochnú sliogáin
```

### Bratacha coitianta

| Bratach             | Cur Síos                                                 |
| ------------------- | -------------------------------------------------------- |
| `--no-open`         | Ná hoscail an brabhsálaí go huathoibríoch ar thosú       |
| `--port <n>`        | Sáraigh an port API (réamhshocraithe 20128)              |
| `--mcp`             | Rith mar fhreastalaí MCP thar stdio (d'IDEs)             |
| `--non-interactive` | Mód CI (gan leideanna; léann ó env/bratacha)             |
| `--json`            | Aschur JSON inléite ag meaisín (doctor, providers, etc.) |
| `--help`, `-h`      | Taispeáin cabhair shonrach don ordú                      |
| `--version`, `-v`   | Priontáil an leagan suiteáilte                           |

---

##-pointí API ar fáil

| Pointe intreach            | Cur síos                             | Úsáidte le haghaidh                  |
| -------------------------- | ------------------------------------ | ------------------------------------ |
| `/v1/chat/completions`     | Comhrá caighdeánach (gach soláthraí) | Gach uirlis nua-aimseartha           |
| `/v1/responses`            | API Freagraí (formáid OpenAI)        | Codex, sreafaí oibre gníomhacha      |
| `/v1/completions`          | Comhláidí téacs seanré               | Uirlisí níos sine ag úsáid `prompt:` |
| `/v1/embeddings`           | Leabúcháin téacs                     | RAG, cuardach                        |
| `/v1/images/generations`   | Giniúint íomhánna                    | GPT-Image, Flux, srl.                |
| `/v1/audio/speech`         | Téacs-go-guth                        | ElevenLabs, OpenAI TTS               |
| `/v1/audio/transcriptions` | Guth-go-téacs                        | Deepgram, AssemblyAI                 |

Samplaí réidh le greamú le URL OmniRoute atá comharthaithe:

```txt
Sampla comhartha: sk-a3ab3c080beaee3a-69f4a4-070d71af

Bunús OpenAI caighdeánach: http://localhost:20128/v1
Múnlaí VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Comhrá VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Freagraí VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Clibeanna Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Comhrá Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Fabhtcheartú

| Earráid                                            | Cúis                                | Réiteach                                              |
| -------------------------------------------------- | ----------------------------------- | ----------------------------------------------------- |
| `Diúltaíodh ceangal`                               | OmniRoute gan rith                  | `omniroute serve`                                     |
| `401 Neamhúdaraithe`                               | Eochair API mícheart                | Seiceáil in `/dashboard/api-manager`                  |
| `Níl aon teaglaim comhairthe`                      | Níl aon chomhleádh ródála gníomhach | Socraigh in `/dashboard/combos`                       |
| Taispeánann an CLI "nach suiteáilte"               | Dénártha i PATH                     | Seiceáil `which <ordughlaoi>`                         |
| Taispeánann an deais "gan bhrath" tar éis suiteála | Taisce as dáta                      | Cliceáil "⟳ Athnuaigh braite" san deais               |
| Sean-nasc `/dashboard/cli-tools`                   | Leabharmharc roimh-v3.8.6           | Atreorú uathoibríoch go `/dashboard/cli-code` (308)   |
| Sean-nasc `/dashboard/agents`                      | Leabharmharc roimh-v3.8.6           | Atreorú uathoibríoch go `/dashboard/acp-agents` (308) |
