# CLI-TOOLS (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI Tools — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Tools — OmniRoute

చివరిగా నవీకరించబడింది: 2026-08-18

OmniRoute మూడు ప్రత్యేక డాష్‌బోర్డ్ పేజీలలో విస్తరించిన మూడు వర్గాల CLI సాధనాలతో ఇంటిగ్రేట్ అవుతుంది:

| పేజీ             | మార్గం                  | భావన                                                                               | సంఖ్య        |
| ---------------- | ----------------------- | ---------------------------------------------------------------------------------- | ------------ |
| **CLI కోడ్**     | `/dashboard/cli-code`   | OmniRoute కు మీరు సూచించే కోడింగ్ సాధనాలు (క్లయింట్ → CLI → OmniRoute → ప్రొవైడర్) | 26           |
| **CLI ఏజెంట్లు** | `/dashboard/cli-agents` | OmniRoute కు మీరు సూచించే స్వాయత్త ఏజెంట్లు (అదే ప్రవాహం, విస్తృత పరిధి)           | 8            |
| **ACP ఏజెంట్లు** | `/dashboard/acp-agents` | OmniRoute stdio/ACP ద్వారా బ్యాక్‌ఎండ్‌గా ఉత్పత్తి చేసే CLIs (విరుద్ధ ప్రవాహం)     | నమోదు చూడండి |

పాత మార్గాలు 308 ద్వారా తిరిగి దారితీస్తాయి: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## ఇది ఎలా పనిచేస్తుంది

```
CLI కోడ్ / CLI ఏజెంట్లు (ఉపయోగం ప్రవాహం):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (అన్నీ OmniRoute కు సూచిస్తాయి)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute సరైన ప్రొవైడర్ కు మార్గం చూపిస్తుంది)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP ఏజెంట్లు (విరుద్ధ ఉత్పత్తి ప్రవాహం):
    క్లయింట్ అభ్యర్థన → OmniRoute → stdio/ACP ద్వారా CLI ఉత్పత్తి చేస్తుంది → స్పందన
```

**లాభాలు:**

- అన్ని సాధనాలను నిర్వహించడానికి ఒక API కీ
- డాష్‌బోర్డ్‌లో అన్ని CLIs మధ్య ఖర్చు ట్రాకింగ్
- ప్రతి సాధనాన్ని పునఃకన్ఫిగర్ చేయకుండా మోడల్ మార్పు
- స్థానికంగా మరియు దూర సర్వర్లపై పనిచేస్తుంది (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## `setup-*` తో ఆటో-కన్ఫిగర్ చేయండి

మీరు ప్రతి సాధన యొక్క కాన్ఫిగరేషన్‌ను చేతితో రాయాల్సిన అవసరం లేదు. OmniRoute ఒక `setup-*`
ఆదేశాన్ని అందిస్తుంది, ఇది నడుస్తున్న OmniRoute (స్థానిక లేదా దూర) నుండి **ప్రస్తుతం** మోడల్ కాటలాగ్‌ను చదువుతుంది
మరియు మీ యంత్రంలో సాధన యొక్క స్వంత కాన్ఫిగరేషన్‌ను రాస్తుంది:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

ప్రతి `--remote <url> --api-key <key>` (దూర OmniRoute కు వ్యతిరేకంగా స్థానిక సాధనాన్ని కాన్ఫిగర్ చేయండి), `--dry-run` (రాయకుండా ప్రివ్యూ), మరియు `--port` ను స్వీకరిస్తుంది. మోడల్ ఆటో-డిస్కవరీ లేని సాధనాలు (Cline, Kilo, Roo, Goose, Aider, Qwen) `--model <id>` (మరియు `--yes` కోసం ఇంటరాక్టివ్ రన్లకు) తీసుకుంటాయి. సరైన వాతావరణం చొప్పించబడిన CLI ను ప్రారంభించడానికి మరియు ఏ కాన్ఫిగరేషన్ రాయకుండా, సాధారణ `omniroute run <target>` లాంచర్‌ను ఉపయోగించండి (claude, codex, aider, goose, opencode, qwen, gemini — లక్ష్యాలు మరియు అలియాస్లు `bin/cli/cli-manifest.mjs` నుండి వస్తాయి); పాత ప్రతి సాధనానికి ప్రత్యేక లాంచర్లు `omniroute launch` (Claude Code) మరియు `omniroute launch-codex` (Codex) అందుబాటులో ఉన్నాయి. Gemini CLI కేవలం ప్రారంభించడానికి మాత్రమే: ఇది `omniroute run` లక్ష్యం కానీ `setup-*`/`configure` రెసిపీ లేదు.

> **పూర్తి సూచిక:** మాస్టర్ పట్టిక — ప్రతి ఆదేశం ఏమి రాస్తుంది, ప్రతి జెండా,
> స్థానిక vs దూర, మరియు ఏ సాధనాలు `/v1` సఫిక్స్ కావాలనుకుంటున్నాయో — ఉంది
> **[CLI Integrations](../guides/CLI-INTEGRATIONS.md)**.

### కంటైనర్‌లో ఇవి నడపడం

OmniRoute కంటైనర్‌లో అమలు చేసిన `setup-*` ఆదేశం కంటైనర్ యొక్క స్వంత హోమ్‌లో రాస్తుంది, ఇది ఏ హోస్ట్ CLI చదవదు మరియు కంటైనర్‌తో కలిసి పోతుంది. OmniRoute అది గుర్తించి `2` తో నిష్క్రమిస్తుంది మరియు రాయడం కాకుండా సూచనలను అందిస్తుంది. ముందుకు వెళ్లడానికి రెండు మద్దతు మార్గాలు — CLIని హోస్ట్‌లో ఇన్‌స్టాల్ చేయండి మరియు కంటైనర్‌కు `omniroute connect` చేయండి, లేదా కాన్ఫిగ్ డైరెక్టరీలను బైండ్-మౌంట్ చేయండి మరియు `CLI_CONFIG_HOME` ను సెట్ చేయండి (కంపోజ్ `host` ప్రొఫైల్). ప్రతి `setup-*` ఆదేశం, అలాగే `omniroute configure` మరియు `omniroute config set`, కంటైనర్ యొక్క స్వంత CLIs ను కాన్ఫిగర్ చేయడం మీరు నిజంగా అర్థం చేసుకున్నది అయితే `--allow-container-write` ను స్వీకరిస్తుంది; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` సర్వర్ కోసం అదే చేస్తుంది. చూడండి
[Docker Guide → Configuring host CLI tools](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

డాష్‌బోర్డ్ యొక్క **apply endpoint** (`POST /api/cli-tools/apply`) అదే రక్షణను అమలు చేస్తుంది: కంటైనర్‌లో, లక్ష్యం హోస్ట్ నుండి బైండ్-మౌంట్ చేయబడని రాయడం **`422`** తో సమాధానం ఇస్తుంది `containerEphemeralTarget: true`, సురక్షిత పొరపాటు పాఠం మరియు — హోస్ట్ రెసిపీ ఉన్న సాధనాల కోసం (claude, codex, opencode, cline, kilo, continue) — హోస్ట్‌లో నడపడానికి `hostSetupCommand` (ఉదా: `omniroute setup-opencode`) ; ఏదీ రాయబడదు. `dryRun: true` కంటైనర్ మోడ్‌లో పనిచేస్తుంది మరియు డిస్క్‌ను తాకకుండా ఉత్పత్తి చేసిన కంటెంట్ + లక్ష్య మార్గాన్ని తిరిగి ఇస్తుంది, కాబట్టి మీరు డాష్‌బోర్డ్ నుండి ప్రివ్యూ చేయవచ్చు మరియు హోస్ట్‌పై వర్తింపజేయవచ్చు. ఈ ప్రవర్తన ఉద్దేశ్యపూర్వకంగా ఉంది మరియు `tests/unit/api/cli-tools/apply-container-guard.test.ts` ద్వారా పునరావృతంగా రక్షించబడింది — 422ని రక్షణను తొలగించడం ద్వారా "సరిదిద్దడం" చేయకండి.

---

## నిజమైన మూలం

ఒకే కాటలాగ్ `src/shared/constants/cliTools.ts` లో `CLI_TOOLS: Record<string, CliCatalogEntry>` గా ఉంటుంది.

ప్రతి ఎంట్రీకి ఈ ఫీల్డ్స్ ఉన్నాయి (ఇవి `src/shared/schemas/cliCatalog.ts` లో నిర్వచించబడ్డాయి):

| ఫీల్డ్                                          | రకం                                                          | వివరణ                                                          |
| ----------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | సాధనం ఏ పేజీలో కనిపిస్తుంది                                    |
| `vendor`                                        | `string`                                                     | సాధన ఉత్పత్తి ("Anthropic", "OSS (P. Gauthier)")               |
| `acpSpawnable`                                  | `boolean`                                                    | ACP ఏజెంట్ గా కూడా ఉపయోగించవచ్చు (బాడ్జ్ చూపబడుతుంది)          |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | కస్టమ్ ఎండ్‌పాయింట్ మద్దతు స్థాయి. `"none"` = MITM బ్యాక్‌లాగ్ |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | కాన్ఫిగరేషన్ యంత్రాంగం                                         |
| `id`, `name`, `color`, `description`, `docsUrl` | ప్రమాణం                                                      | కేంద్రీయ ప్రదర్శన ఫీల్డ్స్                                     |

`baseUrlSupport: "none"` ఉన్న ఎంట్రీలు డాష్‌బోర్డ్ పేజీలలో **చూపించబడవు** — ఇవి ప్లాన్ 11 కోసం MITM బ్యాక్‌లాగ్‌లో నమోదు చేయబడ్డాయి (చూడండి `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### సామర్థ్య స్థాయిలు (కాటలాగ్ చేయబడిన × గుర్తించగల × కాన్ఫిగరేషన్ చేయగల × ప్రారంభించగల)

ప్రతి కాటలాగ్ చేయబడిన సాధనం గుర్తించబడదు, కాన్ఫిగరేషన్ చేయబడదు లేదా ప్రారంభించబడదు. ప్రతి స్థాయికి ఒక
ప్రకటించే మూలం ఉంది, మరియు ఒక డ్రిఫ్ట్ పరీక్ష వాటిని సమానంగా ఉంచుతుంది:

| స్థాయి                 | అర్థం                                                                       | ప్రకటనలో                                                           |
| ---------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **కాటలాగ్ చేయబడిన**    | డాష్‌బోర్డ్ కాటలాగ్‌లో కనిపిస్తుంది (పేరు, విక్రేత, డాక్స్, కాన్ఫిగ్ రకం)   | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                   |
| **గుర్తించగల**         | బైనరీ/కాన్ఫిగ్ గుర్తింపు, ఆరోగ్య తనిఖీలు, కాన్ఫిగ్ మార్గాలు                 | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` రన్‌టైమ్ కాటలాగ్) |
| **కాన్ఫిగరేషన్ చేయగల** | `omniroute configure <cli>` ద్వారా మద్దతు (సెట్టప్ రెసిపీ ఉంది)             | `bin/cli/cli-manifest.mjs` (`configure: true`)                     |
| **ప్రారంభించగల**       | `omniroute run <target>` ద్వారా మద్దతు (env/args ఇంజెక్షన్ నిర్వచించబడింది) | `bin/cli/cli-manifest.mjs` (`run: true`)                           |

`bin/cli/cli-manifest.mjs` CLI ఆదేశం కోసం కanonical ఎగ్జిక్యూటబుల్ మానిఫెస్ట్: `run`, `configure` మరియు షెల్-పూర్తి జనరేటర్లు అన్ని తమ లక్ష్య జాబితాలు, అలియాస్ పరిష్కారం (ఉదాహరణకు `kilocode`/`kilo-code`/`kilo_cli` → `kilo`) మరియు `--model` ఫ్లాగ్ వైరింగ్ నుండి పొందుతాయి. డ్రిఫ్ట్ గార్డ్
`tests/unit/cli/cli-manifest-drift.test.ts` మానిఫెస్ట్, రన్‌టైమ్
కాటలాగ్, UI కాటలాగ్ మరియు ప్రతి వినియోగదారు ఉపరితలాలు సమానంగా ఉండాలని నిర్ధారిస్తుంది — ఒక ఉపరితలానికి జోడించిన లక్ష్యం ఇతరుల లేకుండా ఉంటే, అది మౌనంగా డ్రిఫ్ట్ కాకుండా సూట్‌ను విఫలమవుతుంది.

## 1. CLI కోడ్ యొక్క కాటలాగ్ (26 సాధనాలు)

`/dashboard/cli-code` లో కనిపించే అన్ని సాధనాలు. `baseUrlSupport: none` ఉన్నవి కస్టమ్ బేస్ URL బదులు MITM లేదా మాన్యువల్ గైడ్ ద్వారా కనెక్ట్ చేయబడ్డాయి:

| id           | name                       | vendor              | baseUrlSupport | configType     | acpSpawnable |
| ------------ | -------------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude కోడ్                | Anthropic           | full           | env            | true         |
| codex        | OpenAI Codex CLI           | OpenAI              | full           | custom         | true         |
| zcode        | ZCode (GLM కోడింగ్ ప్లాన్) | Z.ai                | none           | custom         | false        |
| cline        | Cline                      | OSS (ex-Claude Dev) | full           | custom         | true         |
| kilo         | Kilo కోడ్                  | Kilo-Org            | full           | custom         | false        |
| roo          | Roo కోడ్                   | Roo (OSS)           | full           | guide          | false        |
| continue     | Continue                   | continue.dev        | full           | guide          | false        |
| aider        | Aider                      | OSS (P. Gauthier)   | full           | guide          | true         |
| forge        | ForgeCode                  | Antinomy HQ         | full           | custom         | true         |
| jcode        | jcode                      | 1jehuang (OSS)      | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI               | Hunter Bown (OSS)   | full           | custom         | false        |
| codewhale    | CodeWhale                  | Hmbown (OSS)        | full           | custom         | false        |
| opencode     | OpenCode                   | Anomaly (ex-SST)    | full           | guide          | true         |
| droid        | ఫ్యాక్టరీ డ్రాయిడ్         | Factory AI          | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI         | GitHub/MS           | full           | custom         | false        |
| cursor-cli   | Cursor CLI                 | Anysphere           | partial        | guide          | true         |
| smelt        | Smelt                      | leonardcser (OSS)   | full           | custom         | false        |
| pi           | Pi (pi-coding-agent)       | M. Zechner (OSS)    | full           | custom         | false        |
| grok-build   | Grok Build                 | xAI                 | full           | custom         | false        |
| crush        | Crush                      | OSS (Charm)         | full           | custom         | false        |
| qwen         | Qwen కోడ్                  | Alibaba             | full           | guide          | true         |
| cursor       | Cursor                     | Anysphere           | none           | guide          | false        |
| antigravity  | Antigravity                | Google              | none           | mitm           | false        |
| hermes       | Hermes                     | Nous Research       | none           | guide          | false        |
| kiro         | Kiro AI                    | Amazon              | none           | mitm           | false        |
| custom       | కస్టమ్ CLI                 | —                   | full           | custom-builder | false        |

`baseUrlSupport: "partial"` ఉన్న సాధనాలు డాష్‌బోర్డ్ కార్డ్‌లో "⚠ Base URL parcial" బ్యాడ్జ్‌ను చూపిస్తాయి.
---

## 2. CLI ఏజెంట్స్ కాటలాగ్ (8 టూల్స్)

`/dashboard/cli-agents` లో కనిపించే స్వాయత్త ఏజెంట్స్:

| id           | name                | vendor                    | baseUrlSupport | acpSpawnable |
| ------------ | ------------------- | ------------------------- | -------------- | ------------ |
| hermes-agent | హెర్మెస్ ఏజెంట్     | Nous Research             | పూర్తి         | అబద్ధం       |
| openclaw     | ఓపెన్‌క్లా          | OSS (P. స్టెయిన్‌బర్గర్)  | పూర్తి         | నిజం         |
| goose        | గూస్                | బ్లాక్ / లినక్స్ ఫౌండేషన్ | పూర్తి         | నిజం         |
| interpreter  | ఓపెన్ ఇంటర్‌ప్రెటర్ | OSS                       | పూర్తి         | నిజం         |
| warp         | వార్ప్ AI           | వార్ప్ ఇన్‌క్.            | భాగిక          | నిజం         |
| agent-deck   | ఏజెంట్ డెక్         | asheshgoplani (OSS)       | పూర్తి         | అబద్ధం       |
| omp          | ఓహ్ మై పి           | OSS                       | పూర్తి         | నిజం         |
| letta        | లెట్టా CLI          | లెట్టా                    | పూర్తి         | అబద్ధం       |

---

## 3. ACP ఏజెంట్స్ (/dashboard/acp-agents)

ఈ పేజీ ( `/dashboard/agents` నుండి పేరు మార్చబడింది) OmniRoute **స్పాన్** చేయగల CLIs ను stdio/ACP ప్రోటోకాల్ ద్వారా బ్యాక్‌ఎండ్ ఎగ్జిక్యూషన్ ఇంజిన్లుగా చూపిస్తుంది. కాటలాగ్ `src/lib/acp/registry.ts` లో వేరుగా నిర్వహించబడుతుంది మరియు ఇది `CLI_TOOLS` తో **అదే కాదు**.

---

## 4. MITM బ్యాక్‌లాగ్ (డాష్‌బోర్డులో చూపించబడలేదు)

క్రింది CLIs స్వయంగా కస్టమ్ బేస్ URL ను మద్దతు ఇవ్వవు మరియు CLI కోడ్ లేదా CLI ఏజెంట్స్ పేజీలలో **జాబితా చేయబడలేదు**. ఇవి ప్లాన్ 11 లో MITM అంతరాయానికి అభ్యర్థులు:

| CLI                 | కారణం                                                         |
| ------------------- | ------------------------------------------------------------- |
| windsurf            | BYOK కొన్ని క్లాడ్ మోడళ్లకు + కార్పొరేట్ URL/token కు పరిమితి |
| amp                 | మూసివేయబడిన పర్యావరణం (Sourcegraph)                           |
| amazon-q / kiro-cli | AWS SSO ఆథ్, కస్టమ్ URL లేదు                                  |
| cowork              | Anthropic డెస్క్‌టాప్, కన్‌ఫిగరబుల్ ఎండ్‌పాయింట్ లేదు         |

పూర్తి క్రాస్-రెఫరెన్స్ కోసం `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` చూడండి.

---

## 5. బ్యాచ్ డిటెక్షన్ API

అన్ని టూల్ డిటెక్షన్ ఒకే ఎండ్‌పాయింట్ ద్వారా సమీకృతం చేయబడింది:

**`GET /api/cli-tools/all-statuses`**

- ఆథ్: `requireCliToolsAuth(request)` (ఇతర `/api/cli-tools/` మార్గాల వంటి)
- తిరిగి ఇస్తుంది: `Record<toolId, ToolBatchStatus>` (రకం: `src/shared/types/cliBatchStatus.ts`)
- వ్యూహం: అన్ని టూల్స్ పై `Promise.all`, ప్రతి టూల్ కు 5సెకన్ల టైమౌట్
- క్యాష్: కాన్ఫిగరేషన్ ఫైల్ `mtime` ద్వారా సూచిక చేయబడిన మెమరీ LRU. mtime మారినప్పుడు క్యాష్ అమాన్యమవుతుంది. సర్వర్ పునఃప్రారంభం సమయంలో రీసెట్ చేయబడుతుంది.

ప్రతి టూల్ కు స్పందన ఆకారం:

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
  error?: string; // శుభ్రపరిచినది, స్టాక్ ట్రేస్‌లు లేవు
}
```

## 6. కొత్త సాధనాల కోసం సెట్టింగ్స్ హ్యాండ్లర్లు

`configType: "custom"` ఉన్న కొత్త సాధనాలకు ప్రత్యేక సెట్టింగ్స్ API మార్గాలు ఉన్నాయి:

| మార్గం                                      | సాధనం                                                            |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedicated `.env` key)       |

అన్ని మార్గాలు తప్పుల ప్రతిస్పందనల కోసం `sanitizeErrorMessage()` ఉపయోగిస్తాయి (Hard Rule #12).

---

## 7. డాష్‌బోర్డ్ పేజీల నిర్మాణం

### CLI కోడ్ (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — సర్వర్ భాగం
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — క్లయింట్ గ్రిడ్
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — సాధన వివరాల పేజీ
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 ప్రత్యేకమైన సాధన కార్డులు + `ToolDetailClient.tsx`

### CLI ఏజెంట్లు (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — సర్వర్ భాగం
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — క్లయింట్ గ్రిడ్
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — `ToolDetailClient` ను పునఃఉపయోగిస్తుంది

### ACP ఏజెంట్లు (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — సర్వర్ భాగం (మార్పిడి చేయబడింది `agents/` నుండి)

### పంచాయితీ UI భాగాలు (`src/shared/components/cli/`)

| ఫైల్                    | ఉద్దేశ్యం                                                    |
| ----------------------- | ------------------------------------------------------------ |
| `CliToolCard.tsx`       | స్మార్ట్ స్థితి కార్డు (డిటెక్షన్ + కాన్ఫిగ్ + ఎండ్‌పాయింట్) |
| `CliConceptCard.tsx`    | ప్రతి పేజీ కాన్సెప్టు వివరణ కార్డు                           |
| `CliComparisonCard.tsx` | CLI రకాల మధ్య మూడు కాలమ్ పోలిక                               |
| `BaseUrlSelect.tsx`     | ఎండ్‌పాయింట్ డ్రాప్‌డౌన్ (స్థానిక/క్లౌడ్/కస్టమ్)             |
| `ApiKeySelect.tsx`      | API కీ ఎంపికదారు                                             |
| `ManualConfigModal.tsx` | కాపీ చేయదగిన కాన్ఫిగ్ స్నిప్పెట్ మోడల్                       |

### పంచాయితీ హుక్ (`src/shared/hooks/cli/`)

| ఫైల్                      | ఉద్దేశ్యం                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | `/api/cli-tools/all-statuses` ను పొందుతుంది, లోడింగ్/రీఫ్రెష్ స్థితిని నిర్వహిస్తుంది |

---

## 8. i18n

కొత్త namespace లు ప్లాన్ 14 F9 లో చేర్చబడ్డాయి:

| Namespace   | Purpose                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------- |
| `cliCommon` | పంచుకున్న స్ట్రింగ్స్ (కార్డ్ లేబుల్స్, కాన్సెప్ట్/తులనాత్మక పాఠ్యాలు, వివరాల పేజీ లేబుల్స్) |
| `cliCode`   | CLI కోడ్ పేజీ స్ట్రింగ్స్                                                                    |
| `cliAgents` | CLI ఏజెంట్స్ పేజీ స్ట్రింగ్స్                                                                |
| `acpAgents` | ACP ఏజెంట్స్ పేజీ స్ట్రింగ్స్                                                                |

పూర్తి PT-BR మరియు EN అనువాదాలు అందించబడ్డాయి. 39 ఇతర స్థానికాలు `src/i18n/request.ts` లో namespace-స్థాయి విలీనం ద్వారా ఆటోమేటిక్ గా EN కి తిరిగి వస్తాయి.

---

## 9. తక్షణ ప్రారంభం

### దశ 1 — OmniRoute API కీ పొందండి

1. `/dashboard/api-manager` ను తెరవండి → **API కీ సృష్టించండి**
2. దీనికి ఒక పేరు ఇవ్వండి (ఉదా: `cli-tools`) మరియు అన్ని అనుమతులను ఎంచుకోండి
3. కీని కాపీ చేయండి — మీరు క్రింద ఉన్న ప్రతి CLI కోసం దీనిని అవసరం అవుతుంది

> మీ కీ ఇలా ఉంటుంది: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### దశ 2 — CLI టూల్స్ ఇన్‌స్టాల్ చేయండి

అన్ని npm ఆధారిత టూల్స్ Node.js 22.22.2+ లేదా 24.x అవసరం:

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

# Google Gemini CLI (launchable via `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Rust ఆధారిత

# Pi coding agent
# ఇన్‌స్టాల్ కోసం https://github.com/zechnerj/pi-coding-agent చూడండి

# jcode
# ఇన్‌స్టాల్ కోసం https://github.com/1jehuang/jcode చూడండి
```

---

### దశ 3 — డాష్‌బోర్డులో ద్వారా కాన్ఫిగర్ చేయండి

1. `http://localhost:20128/dashboard/cli-code` కు వెళ్లండి
2. గ్రిడ్‌లో మీ టూల్‌ను కనుగొనండి
3. టూల్ వివరాల పేజీని తెరవడానికి కార్డును క్లిక్ చేయండి
4. మీ API కీ మరియు బేస్ URL ను ఎంచుకోండి
5. **కాన్ఫిగ్ అప్లై చేయండి** లేదా మాన్యువల్ కాన్ఫిగ్ స్నిప్పెట్‌ను కాపీ చేయండి

---

### దశ 4 — గ్లోబల్ ఎన్విరాన్‌మెంట్ వేరియబుల్స్ సెట్ చేయండి

```bash
# OmniRoute యూనివర్సల్ ఎండ్‌పాయింట్
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI ROOT వద్ద GOOGLE_GEMINI_BASE_URL ను చదువుతుంది (దాని SDK /v1beta/... ను స్వయంగా జోడిస్తుంది)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> **దూర సర్వర్** కోసం `localhost:20128` ను సర్వర్ IP లేదా డొమైన్‌తో మార్చండి,
> ఉదా: `http://<your-server-ip>:20128`.

---

### దశ 4 — ప్రతి టూల్‌ను కాన్ఫిగర్ చేయండి

#### Claude Code

```bash
# Create ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Claude Code కోసం ఏకీకృత Anthropic గేట్వే రూట్‌ను ఉపయోగించండి. ఇక్కడ `/v1` జోడించవద్దు.

**పరీక్ష:** `claude "say hello"`

---

#### OpenAI Codex

ఆధునిక Codex (v0.137+) కేవలం `~/.codex/config.toml` ను చదువుతుంది — పాత
`config.yaml` పాత npm CLI కి చెందుతుంది మరియు నిశ్శబ్దంగా నిర్లక్ష్యం చేయబడుతుంది. API
కీ `OMNIROUTE_API_KEY` ఎన్విరాన్‌మెంట్ వేరియబుల్‌లో ( `env_key` ) ఉంటుంది, ఫైల్‌లో ఎప్పుడూ ఉండదు:

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

పూర్తి సూచన (ప్రొఫైల్స్, `wire_api`, సందర్భ విండోస్): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**పరీక్ష:** `codex "what is 2+2?"`

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

**పరీక్ష:** `opencode`

> `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> ను ఆలోచన వేరియంట్లను పంపడానికి ఉపయోగించండి.

---

#### Cline (CLI లేదా VS కోడ్)

**CLI మోడ్:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS కోడ్ మోడ్:**
Cline విస్తరణ సెట్టింగ్స్ → API ప్రొవైడర్: `OpenAI Compatible` → బేస్ URL: `http://localhost:20128/v1`

లేదా OmniRoute డాష్‌బోర్డ్‌ను ఉపయోగించండి → **CLI Tools → Cline → Apply Config**.

---

#### KiloCode (CLI లేదా VS కోడ్)

**CLI మోడ్:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS కోడ్ సెట్టింగ్స్:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

లేదా OmniRoute డాష్‌బోర్డ్‌ను ఉపయోగించండి → **CLI Tools → KiloCode → Apply Config**.

---

#### Continue (VS కోడ్ విస్తరణ)

`~/.continue/config.yaml` ను ఎడిట్ చేయండి:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

ఎడిట్ చేసిన తర్వాత VS కోడ్‌ను పునఃప్రారంభించండి.

---

#### VS కోడ్ ఇన్సైడర్స్ (`chatLanguageModels.json`)

ఈది VS కోడ్ ఇన్సైడర్స్ కస్టమ్ ఎండ్‌పాయింట్ మోడల్స్ కోసం కాన్ఫిగర్ చేయబడినప్పుడు మరియు మీరు OmniRoute ను కస్టమ్ హెడ్డర్ ఫీల్డ్ లేకుండా పనిచేయించాలనుకుంటే ఉపయోగించండి.

**సిఫార్సు చేయబడిన స్థానం:**

- లినక్స్: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- విండోస్: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**టోకెనైజ్డ్ OmniRoute అలియాస్ ఉపయోగించి ఉదాహరణ:**

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

**గమనికలు:**

- `sk-your-omniroute-key` ను OmniRoute లో సృష్టించిన API కీతో మార్చండి.
- `url` ఫీల్డ్ `/api/v1/vscode/{token}/chat/completions` కు సూచించాలి.
- `modelsUrl` ఫీల్డ్ `/api/v1/vscode/{token}/models` కు సూచించాలి.
- క్లయింట్ కస్టమ్ హెడ్డర్లను మద్దతు ఇస్తే సాధారణ `/v1` + Bearer హెడ్డర్ ప్రవాహాన్ని ప్రాధాన్యత ఇవ్వండి.
- URL-లో ఉన్న టోకెన్లు అనుకూలత తిరిగి రావడం మరియు ఎడిటర్ లాగ్‌లు లేదా ప్రాక్సీ చరిత్రలో కనిపించవచ్చు.

---

#### Kiro CLI (అమెజాన్)

```bash
# మీ AWS/Kiro ఖాతాలో లాగిన్ అవ్వండి:
kiro-cli login

# CLI తన స్వంత ఆథ్‌ను ఉపయోగిస్తుంది — Kiro CLI కోసం OmniRoute అవసరం లేదు.
# ఇతర టూల్స్ కోసం OmniRoute తో kiro-cli ను ఉపయోగించండి.
kiro-cli status
```

**Kiro IDE** డెస్క్‌టాప్ యాప్ కోసం, OmniRoute ద్వారా అందించబడిన MITM ఎండ్‌పాయింట్‌ను ఉపయోగించండి
`/dashboard/cli-tools → Kiro` కింద.

## 10. అంతర్గత OmniRoute CLI

`omniroute` బైనరీ సర్వర్ జీవిత చక్రం, సెటప్, నిర్ధారణ మరియు ప్రొవైడర్ నిర్వహణ కోసం ఆదేశాలను అందిస్తుంది. ప్రవేశ బిందువు: `bin/omniroute.mjs`.

```bash
omniroute                              # సర్వర్ ప్రారంభించండి (డిఫాల్ట్ పోర్ట్ 20128)
omniroute setup                        # ఇంటరాక్టివ్ సెటప్ విజార్డ్
omniroute doctor                       # కాన్ఫిగర్, DB, పోర్ట్‌లు, రన్‌టైమ్‌ను తనిఖీ చేయండి
omniroute providers list               # కాన్ఫిగర్ చేసిన ప్రొవైడర్ కనెక్షన్లు
omniroute providers test-all           # ప్రతి యాక్టివ్ కనెక్షన్‌ను పరీక్షించండి
omniroute reset-password               # అడ్మిన్ పాస్వర్డ్‌ను రీసెట్ చేయండి
omniroute logs                         # అభ్యర్థన లాగ్‌లను స్ట్రీమ్ చేయండి
omniroute health                       # వివరమైన ఆరోగ్యం (బ్రేకర్లు, కాష్, మెమరీ)
omniroute --version                    # వెర్షన్ ముద్రించండి
omniroute --help                       # అన్ని ఆదేశాలను చూపించండి
```

### సెటప్ & ప్రారంభం

```bash
omniroute setup                        # ఇంటరాక్టివ్ సెటప్ విజార్డ్
omniroute setup --non-interactive      # CI/ఆటోమేషన్ మోడ్ (ఎన్‌వి వేరియబుల్స్ + ఫ్లాగ్‌లను చదువుతుంది)
omniroute setup --password '<value>'   # అడ్మిన్ పాస్వర్డ్‌ను నేరుగా సెట్ చేయండి
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # ఒకే షాట్‌లో ప్రొవైడర్‌ను జోడించండి మరియు పరీక్షించండి
```

అంతర్గత సెటప్ కోసం గుర్తించిన వాతావరణ వేరియబుల్స్:

| Var                 | ఉద్దేశ్యం                                                              |
| ------------------- | ---------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | ప్రొవైడర్ API కీ (కమాండర్ `.env()` ద్వారా `--api-key` కు బంధించబడింది) |
| `DATA_DIR`          | OmniRoute డేటా డైరెక్టరీని ఓవర్‌రైడ్ చేయండి                            |

ఇతర అన్ని నాన్-ఇంటరాక్టివ్ ఇన్‌పుట్‌లు ఫ్లాగ్‌లుగా పంపబడతాయి, వాతావరణ వేరియబుల్స్‌గా కాదు:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(పై `omniroute setup` ఎంపికలను చూడండి).

### నిర్ధారణ

```bash
omniroute doctor                       # కాన్ఫిగర్, DB, పోర్ట్‌లు, రన్‌టైమ్, మెమరీ, జీవితం తనిఖీ చేయండి
omniroute doctor --json                # యంత్రం చదవగల JSON
omniroute doctor --no-liveness         # HTTP ఆరోగ్య ప్రోబ్‌ను దాటించండి
omniroute doctor --host 0.0.0.0        # జీవితం హోస్ట్‌ను ఓవర్‌రైడ్ చేయండి
omniroute doctor --liveness-url <url>  # పూర్తి ఆరోగ్య ఎండ్‌పాయింట్ URL ఓవర్‌రైడ్
```

డాక్టర్ ఈ తనిఖీలను నిర్వహిస్తుంది: `కాన్ఫిగర్`, `డేటాబేస్`, `స్టోరేజ్/ఎన్‌క్రిప్షన్`,
`పోర్ట్ అందుబాటులో`, `నోడ్ రన్‌టైమ్`, `నేటివ్ బైనరీ` (better-sqlite3),
`మెమరీ`, మరియు `సర్వర్ జీవితం`. ఏదైనా తనిఖీ `ఫెయిల్` అయితే ఇది నాన్-జీరోగా బయటకు వస్తుంది.

### ప్రొవైడర్ నిర్వహణ

```bash
omniroute providers available                       # OmniRoute ప్రొవైడర్ కాటలాగ్
omniroute providers available --search openai       # ఐడీ/నామం/అలియాస్/వర్గం ద్వారా కాటలాగ్‌ను ఫిల్టర్ చేయండి
omniroute providers available --category api-key    # వర్గం ద్వారా ఫిల్టర్ చేయండి (api-key, oauth, free, ...)
omniroute providers available --json                # యంత్రం చదవగల JSON

omniroute providers list                            # కాన్ఫిగర్ చేసిన ప్రొవైడర్ కనెక్షన్లు
omniroute providers list --json

omniroute providers test <id|name>                  # ఒక కాన్ఫిగర్ చేసిన కనెక్షన్‌ను పరీక్షించండి
omniroute providers test-all                        # ప్రతి యాక్టివ్ కనెక్షన్‌ను పరీక్షించండి
omniroute providers validate                        # స్థానికంగా మాత్రమే నిర్మాణ ధృవీకరణ
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # ఉన్న OAuth ప్రవాహం
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` API-ప్రథమంగా ఉంటాయి మరియు అందువల్ల
యాక్టివ్ స్థానిక లేదా దూర సందర్భానికి వ్యతిరేకంగా పనిచేస్తాయి. క్రెడెన్షియల్ ఇన్‌పుట్
`--credential-stdin` లేదా `--credential-env` ఉపయోగించాలి; `--dry-run --json` కేవలం
రెడాక్టెడ్ ఉనికి/రూపాన్ని నివేదిస్తుంది. `providers available` OmniRoute కాటలాగ్‌ను చదువుతుంది;
`providers list/test/test-all/validate` తమ స్థానిక SQLite ప్రవర్తనను కొనసాగిస్తాయి మరియు
సర్వర్ నడుస్తున్న అవసరం లేదు.

### పునరుద్ధరణ & రీసెట్

```bash
omniroute reset-password                # అడ్మిన్ పాస్వర్డ్‌ను రీసెట్ చేయండి (మరియు: omniroute-reset-password)
omniroute reset-encrypted-columns       # ఎన్‌క్రిప్టెడ్ క్రెడెన్షియల్ రీసెట్ కోసం హెచ్చరిక + డ్రై-రన్ చూపించండి
omniroute reset-encrypted-columns --force  # నిజంగా SQLiteలో ఎన్‌క్రిప్టెడ్ క్రెడెన్షియల్‌లను నల్లగా చేయండి
```

### క్రెడెన్షియల్ ఎగుమతి (⚠ జాగ్రత్తగా నిర్వహించండి)

```bash
omniroute auth export                                 # హెచ్చరిక + నిర్ధారణ గేటు చూపించండి — DB యాక్సెస్ లేదు
omniroute auth export --force                          # అన్ని కనెక్షన్ల DECRYPTED క్రెడెన్షియల్‌ను stdout గా JSONగా ఎగుమతి చేయండి
omniroute auth export --force --id <id>                 # కేవలం సరిపోయే కనెక్షన్‌ను ఎగుమతి చేయండి
omniroute auth export --force --format env               # OMNIROUTE_<PROVIDER>_<FIELD>=<value> లైన్లను ఉత్పత్తి చేయండి
omniroute auth export --force --out creds.json           # ఫైల్‌కు రాయండి (0600 అనుమతులతో సృష్టించబడింది)
```

`auth export` **స్థానిక-మాత్రం** (నేరుగా SQLite చదవడం, HTTP మార్గం లేదు) మరియు ఉద్దేశ్యంగా ముద్రిస్తుంది/రాస్తుంది
**ప్లెయిన్‌ టెక్స్ట్** `apiKey`/`accessToken`/`refreshToken`/`idToken` విలువలు — ఇది ఫీచర్, బగ్ కాదు.
డేటాబేస్ నుండి ఏమీ చదవబడదు, మరియు ఏమీ డీక్రిప్ట్ చేయబడదు, `--force` లేకుండా.
ఏ ప్లెయిన్‌ టెక్స్ట్ విడుదలకు ముందు ఎప్పుడూ stderr హెచ్చరిక బ్యానర్ ముద్రించబడుతుంది.
`STORAGE_ENCRYPTION_KEY` సెట్ చేయబడాలి. డీక్రిప్ట్ చేయడంలో విఫలమైన ఫీల్డ్ (పాత కీ, కరప్ట్ సైఫర్‌ టెక్ట్స్)
`<field>DecryptFailed: true` గా నివేదించబడుతుంది, మొత్తం ఎగుమతిని ఆపడం లేదా కింద ఉన్న పొరపాటును లీక్ చేయడం కాకుండా.

### ఇతర ఉప ఆదేశాలు

ఈవి నడుస్తున్న OmniRoute సర్వర్‌ను అనుమానిస్తాయి, ఇతరथा పేర్కొనబడని వరకు:

```bash
omniroute status                       # సమగ్ర రన్‌టైమ్ స్థితి
omniroute logs                         # అభ్యర్థన లాగ్‌లను స్ట్రీమ్ చేయండి (--json, --search, --follow)
omniroute config show                  # ప్రస్తుత కాన్ఫిగరేషన్‌ను ప్రదర్శించండి

omniroute provider list                # అందుబాటులో ఉన్న ప్రొవైడర్‌లను జాబితా చేయండి (ప్రొవైడర్ జాబితా యొక్క అలియాస్)
omniroute provider add                 # OmniRouteని ఒక సాధనంపై ప్రొవైడర్‌గా నమోదు చేయండి
omniroute keys add | list | remove     # API కీలను నిర్వహించండి
omniroute models [provider]            # మోడల్‌లను జాబితా చేయండి (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # కాన్ఫిగర్ + DB యొక్క స్నాప్షాట్
omniroute restore                      # గత స్నాప్షాట్ నుండి పునరుద్ధరించండి

omniroute health                       # వివరమైన ఆరోగ్యం (బ్రేకర్లు, కాష్, మెమరీ)
omniroute quota                        # ప్రొవైడర్ క్వోటా వినియోగం
omniroute cache                        # కాష్ స్థితి
omniroute cache clear                  # సేమాంటిక్ + సిగ్నేచర్ కాష్‌లను క్లియర్ చేయండి

omniroute mcp status | restart         # MCP సర్వర్ స్థితి / పునఃప్రారంభం
omniroute a2a status | card            # A2A సర్వర్ స్థితి / ఏజెంట్ కార్డ్

omniroute tunnel list | create | stop  # టన్నెల్‌లను నిర్వహించండి (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # ఎన్‌వి వేరియబుల్స్‌ను పరిశీలించండి / సెట్ చేయండి (తాత్కాలిక)

omniroute test                         # ప్రొవైడర్ కనెక్టివిటీ పొగరు పరీక్ష
omniroute update                       # నవీకరణలను తనిఖీ చేయండి
omniroute completion                   # షెల్ పూర్తి చేయండి
```

### సాధారణ ఫ్లాగ్‌లు

| ఫ్లాగ్              | వివరణ                                                          |
| ------------------- | -------------------------------------------------------------- |
| `--no-open`         | ప్రారంభంలో బ్రౌజర్‌ను ఆటో-ఓపెన్ చేయవద్దు                       |
| `--port <n>`        | API పోర్ట్‌ను ఓవర్‌రైడ్ చేయండి (డిఫాల్ట్ 20128)                |
| `--mcp`             | IDEల కోసం stdio ద్వారా MCP సర్వర్‌గా నడవండి                    |
| `--non-interactive` | CI మోడ్ (ప్రాంప్ట్‌లు లేవు; ఎన్‌వి/ఫ్లాగ్‌ల నుండి చదువుతుంది)  |
| `--json`            | యంత్రం చదవగల JSON అవుట్‌పుట్ (డాక్టర్, ప్రొవైడర్‌లు, మొదలైనవి) |
| `--help`, `-h`      | ఆదేశానికి ప్రత్యేకమైన సహాయం చూపించండి                          |
| `--version`, `-v`   | ఇన్‌స్టాల్ చేసిన వెర్షన్‌ను ముద్రించండి                        |

---

## అందుబాటులో ఉన్న API ఎండ్‌పాయింట్లు

| ఎండ్‌పాయింట్               | వివరణ                              | ఉపయోగించడానికి                  |
| -------------------------- | ---------------------------------- | ------------------------------- |
| `/v1/chat/completions`     | ప్రామాణిక చాట్ (అన్ని ప్రొవైడర్లు) | అన్ని ఆధునిక సాధనాలు            |
| `/v1/responses`            | స్పందనల API (OpenAI ఫార్మాట్)      | కోడెక్స్, ఏజెంటిక్ వర్క్‌ఫ్లోలు |
| `/v1/completions`          | పాత టెక్స్ట్ కంప్లీషన్స్           | `prompt:` ఉపయోగించే పాత సాధనాలు |
| `/v1/embeddings`           | టెక్స్ట్ ఎంబెడింగ్స్               | RAG, శోధన                       |
| `/v1/images/generations`   | చిత్రం ఉత్పత్తి                    | GPT-Image, ఫ్లక్స్, మొదలైనవి    |
| `/v1/audio/speech`         | టెక్స్ట్-టు-స్పీచ్                 | ElevenLabs, OpenAI TTS          |
| `/v1/audio/transcriptions` | స్పీచ్-టు-టెక్స్ట్                 | Deepgram, AssemblyAI            |

టోకెనైజ్డ్ OmniRoute URLతో పేస్ చేయడానికి సిద్ధమైన ఉదాహరణలు:

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

## సమస్యలు పరిష్కరించడం

| లోపం                                         | కారణం                      | పరిష్కారం                                                |
| -------------------------------------------- | -------------------------- | -------------------------------------------------------- |
| `Connection refused`                         | OmniRoute నడవడం లేదు       | `omniroute serve`                                        |
| `401 Unauthorized`                           | తప్పు API కీ               | `/dashboard/api-manager`లో తనిఖీ చేయండి                  |
| `No combo configured`                        | చలనం కాంబో క్రియాశీలం లేదు | `/dashboard/combos`లో సెటప్ చేయండి                       |
| CLI shows "not installed"                    | బైనరీ PATHలో లేదు          | `which <command>`లో తనిఖీ చేయండి                         |
| Dashboard shows "not detected" after install | కాష్ పాత                   | డాష్‌బోర్డులో "⟳ Refresh detection"పై క్లిక్ చేయండి      |
| పాత లింక్ `/dashboard/cli-tools`             | Pre-v3.8.6 బుక్‌మార్క్     | `/dashboard/cli-code`కు ఆటో-రీడైరెక్ట్ చేయబడింది (308)   |
| పాత లింక్ `/dashboard/agents`                | Pre-v3.8.6 బుక్‌మార్క్     | `/dashboard/acp-agents`కు ఆటో-రీడైరెక్ట్ చేయబడింది (308) |
