# CLI-TOOLS (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇬🇷 [el](../../../el/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇪🇪 [et](../../../et/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇪 [ga](../../../ga/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇷 [hr](../../../hr/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇱🇹 [lt](../../../lt/docs/reference/CLI-TOOLS.md) · 🇱🇻 [lv](../../../lv/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇮 [sl](../../../sl/docs/reference/CLI-TOOLS.md) · 🇷🇸 [sr](../../../sr/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "Għodod CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-23
---

# Għodod CLI — OmniRoute

Aġornata l-aħħar: 2026-08-23

L-OmniRoute jidħol fi tliet kategoriji ta' għodod CLI distribwiti madwar tliet paġni tal-dashboard dedikati:

| Paġna          | Rotta                   | Kunċett                                                                                  | Għadd          |
| -------------- | ----------------------- | ---------------------------------------------------------------------------------------- | -------------- |
| **CLI Code's** | `/dashboard/cli-code`   | Għodod tal-programmar li tipponta lejn l-OmniRoute (Client → CLI → OmniRoute → Provider) | 26             |
| **CLI Agents** | `/dashboard/cli-agents` | Aġenti awtonomi li tipponta lejn l-OmniRoute (l-istess fluss, skop akbar)                | 10             |
| **ACP Agents** | `/dashboard/acp-agents` | CLIs li l-Oniroute jnisseġ bħala backend via stdio/ACP (fluss invers)                    | ara l-registru |

Ir-rotot tal-mirja jiddirizzaw mill-ġdid permezz ta' 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Kif Jaħdem

```
CLI Code's / CLI Agents (fluss ta' konsumazzjoni):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (kollha jippuntaw lejn l-OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (l-Oniroute jiddirizza lejn il-provider t-tajjeb)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agents (fluss invers ta' tnissiġ):
    Talba tal-Client → OmniRoute → jnisseġ CLI via stdio/ACP → risposta
```

**Benefiċċji:**

- Ċavetta API waħda biex timmaniġġja l-għodod kollha
- Traċċar tal-ispejjeż fost l-CLIs kollha fid-dashboard
- Tibdil tal-mudell mingħajr dikjarar mill-ġdid ta' kull għodda
- Jaħdem lokalment u fuq servers mill-bogħod (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Awto-ikkonfigura permezz ta' `setup-*`

M'għandekx bżonn tikteb il-konfigurazzjoni ta' kull għodda bl-idejn. L-OmniRoute jibgħat `setup-*`
kull kmand għal kull CLI appoġġjat li jaqra l-katalgu **dirett** tal-mudelli minn OmniRoute
li qed jaħdem (lokali jew mill-bogħod) u jikteb il-konfigurazzjoni tal-għodda stess fuq il-magna tiegħek:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
omniroute setup-5dive
```

Kull wieħed jaċċetta `--remote <url> --api-key <key>` (ikkonfigura għodda lokali kontra
OmniRoute mill-bogħod), `--dry-run` (urija mingħajr miktub), u `--port`. L-għodod mingħajr skoperta
awtomatika tal-mudelli (Cline, Kilo, Roo, Goose, Aider, Qwen, 5dive) jieħdu
`--model <id>` (u `--yes` għal konnessjonijiet mhux interattivi). `setup-5dive` huwa r-riċetta
waħda li ma tiktibx taħt `$HOME`: tikkonfigura flotta ta' aġenti 5dive billi tiktib
profil tal-awtentiċità propjetà tal-għalliem fuq il-host tal-flotta, għalhekk terġa' taqbad permezz ta' `sudo`
u m'għandu l-ebda mod mill-bogħod tagħha stess. Biex tibda CLI bil-
ambjent xierqa injettat u l-ebda dikjarar fil-fatt, juża l-iskrin generali
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — il-miri u l-psewdonimi ġejjin minn `bin/cli/cli-manifest.mjs`); l-iskrini tal-mirja
persuna ta' qabel `omniroute launch` (Claude Code) u `omniroute launch-codex`
(Codex) jibqgħu disponibbli. Gemini CLI huwa biss għall-bidu: huwa mirja ta' `omniroute run`
iżda m'għandux riċetta `setup-*`/`configure`.

> **Referenza sħiħa:** it-tabella master — dak li kull kmand jikteb, kull `--`
> lokal vs mill-bħod, u liema għodod iridu suffiss `/v1` — tinsab fi
> **[Integrazzjonijiet CLI](../guides/CLI-INTEGRATIONS.md)**.

### Tmexxija ta' dawn ġewwa kontenitur

Kmand `setup-*` eżekwit ġewwa l-kontenitur tal-OmniRoute jikteb fil-
djar ta' l-ispazju personali tal-kontenitur stess, li l-ebda CLI tal-maħfra ma jaqra u li jidjieq mal-kontenitur. L-OmniRoute jiskopri dan u joħroġ `2` bl-istruzzjonijiet minflok
ma jikteb. Tnejn miż-żewġ modi appoġġjati — tinstalla l-CLI fil-maħfra u
`omniroute connect` mal-kontenitur, jew iġġiegħel-montar il-kartieri tal-konfigurazzjoni u issettja
`CLI_CONFIG_HOME` (il-profil `host` tal-kompożizzjoni). Kull kmand `setup-*`, flimkien ma'
`omniroute configure` u `omniroute config set`, jaċċetta
`--allow-container-write` meta l-ikkonfigurazzjoni tal-CLIs tal-kontenitur stess hi dak li
tlabt verament; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` jagħmel l-istess għas-
server. Ara
[Docker Guide → Konfigurazzjoni ta' għodod CLI tal-maħfra](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

It-twaħħil tal-dashboard **endpoint tal-applikazzjoni** (`POST /api/cli-tools/apply`) jinfurza
l-istess gardun: ġewwa kontenitur, it-tikjib li l-mira tiegħu mhiex immontata mill-maħfra
twieġeb **`422`** b'`containerEphemeralTarget: true`, it-test sikur tal-ħsara u — għall-għodod
b'riċetta tal-maħfra (claude, codex, opencode, cline,
kilo, continue) — `hostSetupCommand` (eż. `omniroute setup-opencode`) biex imexxi
fil-maħfra minflok; xejn ma jikteb. `dryRun: true` jibqa' jaħdem fil-mudell tal-kontenitur
u jirritorna l-kontenut ġenerat + it-triq tal-mira mingħajr ma jmiss l-iskrin, sabiex
tista' preview mill-dashboard u tapplika fil-maħfra. Dan il-ġestjone huwa
intenzjonat u protett mill-ħsara minn
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — qatt "tiffissa" 422
billi tneħħi l-gardun.

## Sors tal-Verita'

Il-katalog unifikat jgħix f'`src/shared/constants/cliTools.ts` bħala `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Kull ingress għandu dawn il-qasam (definit f'`src/shared/schemas/cliCatalog.ts`):

| Qasam                                           | Tip                                                          | Deskrizzjoni                                                     |
| ----------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Liema paġna jidher l-għodod                                      |
| `vendor`                                        | `string`                                                     | L-oriġini tal-għodda ("Anthropic", "OSS (P. Gauthier)")          |
| `acpSpawnable`                                  | `boolean`                                                    | Użabbli bħala ACP Agent wkoll (badge murija)                     |
| `baseUrlSupport`                                | `"full" \| "partial" \| `"none"`                             | Livell tal-appoġġ għal punt immaġinarju. `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Mekkaniżmu tal-konfigurazzjoni                                   |
| `id`, `name`, `color`, `description`, `docsUrl` | standard                                                     | Qasam ewlieni tal-wiri                                           |

L-ingressi b'`baseUrlSupport: "none"` **mhumiex murija** fil-paġni tal-dashboard — huma rreġistrati fil-MITM backlog għal pjan 11 (ara `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Livelli tal-Kapaċità (katkolaġ × sodod × ikkonfigurabbli × li jista' jitwettaq)

mhux kull għodda katkolaġ hija sodod, ikkonfigurabbli, jew li tista' titwettaq. Kull għandu wieħed
sors dikjarat, u test ta' tibdil iżżommhom allinjati:

| Livell                  | Tifsira                                                                          | Idikjarat f'                                                      |
| ----------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Katkolaġ**            | Jidher fil-katalog tal-dashboard (isem, vender, dokti, tip tal-konfigurazzjoni)  | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Sodod**               | Biċċa/konfigurazzjoni, tazzi tas-saħħa, toroq tal-konfigurazzjoni                | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **Ikkonfigurabbli**     | Appoġġjat minn `omniroute configure <cli>` (riċetta ta' tħejjija teżisti)        | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Li jista' jitwettaq** | Appoġġjat minn `omniroute run <target>` (kuntrarju/argommenti injettat definiti) | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` huwa l-manifest egzekutiv kanoniku għal wiċċ il-kmand CLI:
`run`, `configure` u l-ġeneraturi tal-kompletar tal-shell kollha jgħoddu l-lista tal-miri tagħhom,
risoluzzjoni tal-aliż (eżempju `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
u l-wired tal-kaxxa `--model` minnu. Il-guard tal-tibdil
`tests/unit/cli/cli-manifest-drift.test.ts` jiddikjara li l-manifest, il-katalog runtime,
il-katalog tal-UI u kull wiċċ tal-konsumatur iżżommhom f'fomm — mira miżjuda f'
wieħed mingħajr l-oħrajn falliċ iġġib l-isfuna milli joħroġ b'mod silenżjuż.

## 1. Katalgu tal-Kodiċijiet CLI (26 għodda)

Dawn kollha huma għodda li jidhru f'`/dashboard/cli-code`. Dawk li għandhom `baseUrlSupport: none` huma magħquda permezz ta' MITM jew għodda manwali minflok URL bażi custom:

| id           | isem                    | fornitur            | baseUrlSupport | configType     | acpSpawnable |
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

L-għodda li għandhom `baseUrlSupport: "partial"` juru badge "⚠ Base URL parzjali" fil-karta tal-dashboard.

## 2. Katalog tal-Aġenti CLI (10 għodod)

Aġenti awtonomi li jidhru f'`/dashboard/cli-agents`:

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

## 3. Aġenti ACP (/dashboard/acp-agents)

Din il-paġna (imbjha minn `/dashboard/agents`) turi CLI li OmniRoute jista' **jibda** bħala magni ta' wettiq ta' wara permezz tal-protokoll stdio/ACP. Il-katalog huwa żżamm separat f'`src/lib/acp/registry.ts` u **mhux** l-istess bħal `CLI_TOOLS`.

---

## 4. MITM Backlog (mhux murin fil-dashboard)

Il-CLIs li ġejjin ma jappoġġawx URL bażi personalizzat b'mod nativ u **mhumiex elenkati** fil-paġni tal-Kodiċijiet CLI jew l-Aġenti CLI. Huma kandidati għal interċepjoni MITM fil-pjan 11:

| CLI            | Raguni                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| windsurf       | BYOK limitat għal mudelli speċifiċi ta' Claude + URL/token korporattiv |
| amp            | Ekosistema magħluqa (Sourcegraph)                                      |
| url / kiro-cli | Autentikazzjoni AWS SSO, l-ebda URL personalizzat                      |
| cowork         | Anthropic Desktop, ebda punt ta' konnessjoni configurabbli             |

Ara `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` għar-referenza sħiħa.

---

## 5. API ta' Skoperta tal-Għodda bl-Għafsa

L-iskoperta tal-għodda kollha tiġi aggregata permezz ta' punt wieħed tal-wasla:

**`GET /api/cli-tools/all-statuses`**

- Awentikazzjoni: `requireCliToolsAuth(request)` (l-istess bħal rotot oħra ta' `/api/cli-tools/`)
- Jirritorna: `Record<toolId, ToolBatchStatus>` (tip: `src/shared/types/cliBatchStatus.ts`)
- Strateġija: `Promise.all` fuq l-għodda kollha, timeout ta' 5s għal kull għodda
- Buffer: fil-memorja LRU indiċjat skont il-ħin ta' aġġornament (`mtime`) tal-fajl tal-konfigurazzjoni. Il-buffer jitħassar meta l-`mtime` jinbidel. Jiġi rrisettat meta l-intierrur jerġa' jibda.

Forma tal-karba per għodda:

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

---

## 6. Handlers tal-Settings għal Għodod Ġodda

Għodod ġodda b'`configType: "custom"` għandhom rotti API speċifiċi għas-settings:

| Rotta                                       | Għodda                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------ |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                                        |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                                        |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, antik)                                          |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_URL_BASE, primarju + sinkronizzazzjoni antika `~/.deepseek`) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                          |
| `POST /api/cli-tools/pi-settings`           | Aġent tal-kodifikazzjoni Pi                                                    |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                          |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + chiave `.env` dedikata)                   |

Iċ-ċejq kollha jużaw `sanitizeErrorMessage()` għal twegibiet ta' żbalji (Regola Eżatt #12).

---

## 7. Arkitettura tal-Paġni tad-Dashboard

### CLI Code's (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — komponent tal-server
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — grilja tal-klijent
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — paġna tal-għodda fid-dettall
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 kard tal-għodod speċjalizzati + `ToolDetailClient.tsx`

### Aġenti CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — komponent tal-server
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — grilja tal-klijent
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — terġa' tuża `ToolDetailClient`

### Aġenti ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — komponent tal-server (mgħarraf minn `agents/`)

### Komponenti tal-UI Kondiviżi (`src/shared/components/cli/`)

| File                    | Skop                                                            |
| ----------------------- | --------------------------------------------------------------- |
| `CliToolCard.tsx`       | Kard tal-status intelliġenti (rilevament + settings + endpoint) |
| `CliConceptCard.tsx`    | Kard tal-konċett għal kull paġna                                |
| `CliComparisonCard.tsx` | Tlett kolonni ta' paragun bejn it-tipi CLI                      |
| `BaseUrlSelect.tsx`     | Dropdown tal-endpoint (Postali/Sħab/Personalizzat)              |
| `ApiKeySelect.tsx`      | Għażla tal-api key                                              |
| `ManualConfigModal.tsx` | Modali ta' snippet tal-konfigurazzjoni li tista' tinqara        |

### Hook Kondiviż (`src/shared/hooks/cli/`)

| File                      | Skop                                                                       |
| ------------------------- | -------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Jġib `/api/cli-tools/all-statuses`, jimmaniġġja l-istat tat-telliegħu/ġdid |

---

## 8. i18n

Spazji l-ġodda miżjuda fil-pjan 14 F9:

| Ism il-Permess | Għan                                                                                |
| -------------- | ----------------------------------------------------------------------------------- |
| `cliCommon`    | Stringi komuni (labli tal-karti, testi ta' kważi/tqabils, labli ta' paġna dettalji) |
| `cliCode`      | Stringi tal-paġna tal-Kodiċi CLI                                                    |
| `cliAgents`    | Stringi tal-paġna tal-Aġenti CLI                                                    |
| `acpAgents`    | Stringi tal-paġna tal-Aġenti ACP                                                    |

Ingħataw traduzzjonijiet sħaħ għal PT-BR u EN. 39 locale l-oħra jmorru lura għal EN awtomatikament permezz tal-merge ta' livell ta' permissjoni f'`src/i18n/request.ts`.

---

## 9. Tqabbil Rapidu

### Pass 1 — Ikseb Ċavetta API OmniRoute

1. Agħfas `/dashboard/api-manager` → **Ħloq Ċavetta API**
2. Agħtiha isem (pereż. `cli-tools`) u agħżel il-permessi kollha
3. Ikkopja l-ċavetta — se jkollok bżonnha għal kull CLI t'hawn taħt

> Ċavetta tixbaħ bħal: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Pass 2 — Installa l-Għodod CLI

L-għodod kollha bbażati fuq npm jeħtieġu Node.js 22.22.2+ jew 24.x:

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

# Google Gemini CLI (tnista' tixgħel permezz ta' `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Bbażat fuq Rust

# Aġent tal-kodiċi Pi
# ara https://github.com/zechnerj/pi-coding-agent għall-installazzjoni

# jcode
# ara https://github.com/1jehuang/jcode għall-installazzjoni
```

---

### Pass 3 — Konfigura permezz tad-Dashboard

1. Mur fuq `http://localhost:20128/dashboard/cli-code`
2. Sib l-għodda tiegħek fil-grilja
3. Agħfas il-karta biex tiftaħ il-paġna tad-dettalji tal-għodda
4. Agħżel iċ-Ċavetta API u l-URL tal-Bażi tiegħek
5. Agħfas **Applika l-Konfigurazzjoni** jew ikkopja t-tassal lokali tal-konfigurazzjoni manwali

---

### Pass 4 — Issettja Varjabbli tal-Ambjent Globali

```bash# Punt Uniċi OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI jaqra GOOGLE_GEMINI_BASE_URL mill-GħERQU (SDK tagħha jiżdied /v1beta/... waħedha)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Għal **server bogħod** ibdel `localhost:20128` mal-IP jew id-dominju tal-server,
> pereż. `http://<your-server-ip>:20128`.

---

### Pass 4 — Konfigura Kull Għodda

#### Claude Code

```bash# Oħloq ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Uża l-Gateway Anthropic unifikat għall-għerq għal Claude Code. Tżidx `/v1` hawn.

**Test:** `claude "say hello"`

---

#### OpenAI Codex

Codex modern (v0.137+) jaqra `~/.codex/config.toml` biss — il-`config.yaml` tal-ħorxa
tal-appoġġ tal-CLI tal-legacy npm tiġi injorata b'mod silenzjuż. Iċ-Ċavetta API tibqa'
fil-varjabbli tal-ambjent `OMNIROUTE_API_KEY` (`env_key`), qatt ġewwa l-fajl:

```bashmkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

Riferiment sħiħ (profili, `wire_api`, twieqi ta' kuntest): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Test:** `codex "what is 2+2?"`

---

#### OpenCode

```bashmkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
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

> Uża `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> biex tibgħat varjanti ta' ħsieb.

---

#### Cline (CLI jew VS Code)

**Modalità CLI:**

```bashmkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Modalità VS Code:**
Settings tal-estensjoni Cline → API Provider: `OpenAI Compatible` → Base URL: `http://localhost:20128/v1`

Jew uża d-dashboard OmniRoute → **CLI Tools → Cline → Applika l-Konfigurazzjoni**.

---

#### KiloCode (CLI jew VS Code)

**Modalità CLI:**

```bashkilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key

```

**Settings VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Jew uża d-dashboard OmniRoute → **CLI Tools → KiloCode → Applika l-Konfigurazzjoni**.

---

#### Continue (Estensjoni VS Code)

Edit `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Agħmel mill-ġdid il-bidu ta' VS Code wara l-editjar.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Uża dan meta VS Code Insiders ikun imkonfigurat għal mudelli ta' punt uniċi tax-xewqa u trid li OmniRoute jaħdem mingħajr kamp ta' intestatura personalizzat.

**Post irrakkomandat:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Eżempju bl-alias tokenizzat OmniRoute:**

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

**Noti:**

- Ibdel `sk-your-omniroute-key` bi Ċavetta API maħluqa f'OmniRoute.
- Il-kamp `url` għandu jimmira lejn `/api/v1/vscode/{token}/chat/completions`.
- Il-kamp `modelsUrl` għandu jimmira lejn `/api/v1/vscode/{token}/models`.
- Agħmel preferenza għall-fluss normali `/v1` + Bearer header meta l-klijent jappoġġa intestaturi personalizzati.
- Tokens maħduma fl-URL huma fallback għal kompatibilità u jistgħu jidhru fl-logs tal-editor jew fil-istorja tal-prokuri.

---

#### Kiro CLI (Amazon)

```bash# Idħol fil-kont tiegħek AWS/Kiro:
kiro-cli login

# L-CLI juża l-awtentikazzjoni tagħha stess — OmniRoute m'għandux bżonn bħala backend għal Kiro CLI innifisu.
# Uża kiro-cli flimkien ma' OmniRoute għal għodod oħra.
kiro-cli status
```

Għall-app desktop **Kiro IDE**, uża l-punt MITM li jiġi żvelat minn OmniRoute
taħt `/dashboard/cli-tools → Kiro`.

---

## 10. Omniroute Internu CLI

Il-binarju `omniroute` jipprovdi kmandi għall-ħajja tal-konfigurazzjoni tas-server, t-thaddid, dijanjostika, u ġestjoni tal-fornituri. Punt tad-dħul: `bin/omniroute.mjs`.

```bash
omniroute                              # Staġuna l-is-server (port awżiljarju 20128)
omniroute setup                        # Għodda interattiva ta' tħejjija
omniroute doctor                       # Verifika konfigurazzjoni, DB, portijiet, runtime
omniroute providers list              # Konnessjonijiet tal-fornituri konfigurati
omniroute providers test-all           # Testja kull konnessjoni attiva
omniroute reset-password               # Aġġorna l-password tal-amministratur
omniroute logs                        # Streams tal-logs tat-talbiet
omniroute health                       # Saħħa dettaljata (breakers, kejbil, memorja)
omniroute --version                    #uri l-verżjoni
omniroute --help                      uri l-kmandi kollha
```

### Tħejjija u Inizjalizzazzjoni

```bash
omniroute setup                        # Għodda interattiva ta' tħejjija
omniroute setup --non-interactive      # Modalità CI/awtomazzjoni (taqra varjanti ambjentali + flags)
omniroute setup --password '<valur>'   # Stabilixx l-password tal-amministratur direttament
omniroute setup --add-provider \
  --provider openai \
  --api-key '<valur>' \
  --test-provider                      # Żid u testja fornitur f'daqqa waħda
```

Varjanti ambjentali rikonoxxuti għat-tħejjija mhux interattiva:

| Var                 | Għan                                                                          |
| ------------------- | ----------------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | API key tal-fornitur (marbut mal- `--api-key` permezz ta' Commander `.env()`) |
| `DATA_DIR`          | Override tad-direttorju tad-data tal-OmniRoute                                |

Input l-ieħor mhux interattiv jgħaddi bħala flags, mhux varjanti ambjentali:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(ara l-għażliet tal- `omniroute setup` t'hawn fuq).

### Dijanjostika

```bash
omniroute doctor                       # Verifika konfigurazzjoni, DB, portijiet, runtime, memorja, ħajja
omniroute doctor --json                # JSON li jinqara b'magna
omniroute doctor --no-liveness         # WAQQA l-prova tal-ħajja HTTP
omniroute doctor --host 0.0.0.0        # Override tal-host tal-ħajja
omniroute doctor --liveness-url <url>  # Override sħiħ tal-URL tal-punt tat-tmiem tal-ħajja
```

Id-doktor jagħmel dawn il-verifiki: `Konfigurazzjoni`, `Database`, `Ħażen/Kriptografija`,
`Disponibbiltà tal-Port`, `Runtime Node`, `Binarju Nattiv` (better-sqlite3),
`Memorja`, u `Ħajja tal-Server`. Huwa joħroġ b'numru differenti minn żero jekk kwalunkwe verifika tkun `falliet`.

### Ġestjoni tal-Fornituri

```bash
omniroute providers available                       # Katalgu tal-fornituri OmniRoute
omniroute providers available --search openai       # Filtra l-katalgu permezz ta' id/isem/alias/kategorija
omniroute providers available --category api-key    # Filtra permezz ta' kategorija (api-key, oauth, b'xejn, ...)
omniroute providers available --json                # JSON li jinqara b'magna

omniroute providers list                            # Konnessjonijiet tal-fornituri konfigurati
omniroute providers list --json

omniroute providers test <id|isem>                  # Testja konnessjoni waħda konfigurata
omniroute providers test-all                        # Testja kull konnessjoni attiva
omniroute providers validate                       # Validazzjoni strutturali lokalment biss
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Flow tal-OAuth li diġà teżisti
omniroute providers edit <id|isem> --default-model <model>
omniroute providers remove <id|isem> --yes
```

`providers add/import/auth/edit/remove` huma primarily API u għalhekk jaħdmu kontra
il-kuntest lokali jew ir remot attiv. L-input tal-iskredenzjali għandu juża
`--credential-stdin` jew `--credential-env`; `--dry-run --json` jirrapporta biss
preżenza/forma aġġornata. `providers available` jaqra l-katalgu OmniRoute;
`providers list/test/test-all/validate` iżommu l-imġieba lokali tagħhom SQLite u
mhux jeħtieġ li l-is-server ikun qed jaħdem.

### Tirkupru u Reset

```bash
omniroute reset-password                # Aġġorna l-password tal-amministratur (ukoll: omniroute-reset-password)
omniroute reset-encrypted-columns       #uri twissija + dry-run għar-reset tal-kredenzjali kriptati
omniroute reset-encrypted-columns --force  # Attwalment ħassar il-kredenzjali kriptati fil-SQLite
```

### Esportazzjoni tal-Kredenzjali (⚠ trattah b'kawtela)

```bash
omniroute auth export                                 #uri twissija + bieb ta' konferma — l-ebda aċċess DB
omniroute auth export --force                          # Esporta kredenzjali DETTAJJATI ta' KULL konnessjoni fl-istandard output bħala JSON
omniroute auth export --force --id <id>                 # Esporta biss il-knessjoni korrispondenti
omniroute auth export --force --format env               # Ħruġ linji tal-valuri `OMNIROUTE_<PROVIDER>_<FIELD>=<value>`
omniroute auth export --force --out creds.json           # Ikteb f'fajl (magħmul b'permessi 0600)
```

`auth export` huwa **lokalment biss** (direttament jaqra SQLite, l-ebda rotta HTTP) u intenzjonat juri/ikteb
valuri **ġodda** `apiKey`/`accessToken`/`refreshToken`/`idToken` — dan huwa l-karatteristika, mhux
difett. Xejn ma jitwaqqaf mill-bażi tad-data, u xejn ma jinstab, mingħajr `--force`. Banner
ta' twissija fl-istandard error dejjem jidher qabel ma jidher kwalunkwe test ġdid. Jeħtieġ li `STORAGE_ENCRYPTION_KEY` ikun
stabilitx. Qasam li falli fis-seħħ (miftuħ ħażin, ciphertext ħażin) jiġi rrapportat bħala
`<field>DecryptFailed: true` minflok jwaqqaf l-esportazzjoni kollha jew juri l-iskripti li jidhru.

### Subkmandi oħra

Dawn jassumu li l-is-server OmniRoute qed jaħdem, sakemm ma jkunx indikat mod ieħor:

```bash
omniroute status                       # Statut komprensiv tar-runtime
omniroute logs                         # Streams tal-logs tat-talbiet (--json, --search, --follow)
omniroute config show                  #uri l-konfigurazzjoni attwali

omniroute provider list                #uri l-fornituri disponibbli (alias ta' providers list)
omniroute provider add                 # Reġistra OmniRoute bħala fornitur għal għodda
omniroute keys add | list | remove     # Ġestjoni tal-API keys
omniroute models [provider]            #uri l-mudelli (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # ritratt tal-konfigurazzjoni + DB
omniroute restore                      # Irrestawra minn ritratt preċedenti

omniroute health                       # Saħħa dettaljata (breakers, kejbil, memorja)
omniroute quota                        # Użu tal-kwota tal-fornituri
omniroute cache                        # Statut tal-cache
omniroute cache clear                  # Ħassar il-cache semantiku + firma

omniroute mcp status | restart         # Statut / restart tal-is-server MCP
omniroute a2a status | card            # Statut tal-is-server A2A / karta tal-aġent

omniroute tunnel list | create | stop  # Ġestjoni ta' tunnelli (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Spearsa / waqqa variabli tal-ambjentali (temporary)

omniroute test                         # Test tal-wasal tal-fornituri
omniroute update                       # Ġdid għal ġdid
omniroute completion                   # Għamel il-lesta tal-shell
```

### Flags komuni

| Flag                                                                          | Deskrizzjoni |
| ----------------------------------------------------------------------------- | ------------ |
| `--no-open` # Tiftaħ il-browser awtomatikament waqt l-istartjar               |
| `--port <n>` # Override tal-port API (default 20128)                          |
| `--mcp` # Ħarreġ bħala is-server MCP permezz tal-stdio (għal IDEs)            |
| `--non-interactive` # Modalità CI (l-ebda prompt; taqra mill-ambjental/flags) |
| `--json` # Output JSON li jinqara b'magna (doctor, providers, eċċ.)           |
| `--help`, `-h` #uri l-għuna speċifika tal-kmand                               |
| `--version`, `-v` #uri l-verżjoni installata                                  |

---

## Tpunkタjba tal-API

| Tpunkタjba                 | Deskrizzjoni                    | Użu Għal                         |
| -------------------------- | ------------------------------- | -------------------------------- |
| `/v1/chat/completions`     | Ħamsa Standard (kull fornitur)  | Għodod Moderni Kollha            |
| `/v1/responses`            | API tal-Respnsi (format OpenAI) | Codex, workflows agentic         |
| `/v1/completions`          | Tlestijiet ta' Test antiki      | Għodod antiki li jużaw `prompt:` |
| `/v1/embeddings`           | Embeddings tat-Test             | RAG, tiftix                      |
| `/v1/images/generations`   | Ġenerazzjoni tal-Immaġni        | GPT-Image, Flux, eċċ.            |
| `/v1/audio/speech`         | Test għal Vjuci                 | ElevenLabs, OpenAI TTS           |
| `/v1/audio/transcriptions` | Vjuci għal Test                 | Deepgram, AssemblyAI             |

Eżempji lesti biex tħejjihom ma' URL tokenized OmniRoute:

```txt
Token example: sk-a3ab3c080beaee3a-69f4a4-070d71af

Standard OpenAI base: http://localhost:20128/v1
VS Code models: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code responses: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama tags: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Soluzzjoni ta' Problemi

| Erreur                                            | Kaxxa                     | Twaħħil                                                 |
| ------------------------------------------------- | ------------------------- | ------------------------------------------------------- |
| `Connection refused`                              | OmniRoute mhux qed jaħdem | `omniroute serve`                                       |
| `401 Unauthorized`                                | Ċavetta tal-API ħażina    | Tista' taħseb fi `/dashboard/api-manager`               |
| `No combo configured`                             | Ebda combo router attiv   | Ifformula fil-`/dashboard/combos`                       |
| CLI juri "not installed"                          | Binaries mhux fil-PATH    | Tista' taħseb `which <command>`                         |
| Dashboard juri "not detected" wara installazzjoni | Cache antika              | Tista' taħseb "⟳ Aġġorna detekzjoni" fil-dashboard      |
| Link qadim `/dashboard/cli-tools`                 | Bookmark ta' qabel v3.8.6 | Diret awtomatikament lejn `/dashboard/cli-code` (308)   |
| Link qadim `/dashboard/agents`                    | Bookmark ta' qabel v3.8.6 | Diret awtomatikament lejn `/dashboard/acp-agents` (308) |
