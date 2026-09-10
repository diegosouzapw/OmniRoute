# CLI-INTEGRATIONS (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI ఇంటిగ్రేషన్స్ — OmniRoute కు ఏదైనా కోడింగ్ CLI ని పాయింట్ చేయండి"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI ఇంటిగ్రేషన్స్

OmniRoute ఒక కోడింగ్ CLI (Codex, Claude Code, OpenCode, Cline, …) ని OmniRoute ను బ్యాక్‌ఎండ్‌గా ఉపయోగించడానికి కాంఫిగర్ చేసే `setup-*` కమాండ్ల కుటుంబాన్ని అందిస్తుంది — కాబట్టి ఈ టూల్ **ఒక** ఎండ్‌పాయింట్‌తో మాట్లాడుతుంది మరియు OmniRoute సరైన ప్రొవైడర్‌కు ఆటో-ఫాల్బ్యాక్‌తో మార్గం చూపిస్తుంది. ప్రతి కమాండ్ ఒక నడుస్తున్న OmniRoute (స్థానిక లేదా దూర) నుండి **ప్రస్తుత** మోడల్ కాటలాగ్‌ను చదువుతుంది మరియు **మీ** యంత్రంలో టూల్ యొక్క స్వంత కాంఫిగరేషన్ ఫైల్‌ను రాస్తుంది. API కీ టూల్ దానిని మద్దతు ఇచ్చే చోట ఎక్కడైనా ఒక ఎన్విరాన్‌మెంట్ వేరియబుల్ ద్వారా సూచించబడుతుంది. టూల్-స్థానిక ఎన్విరాన్‌మెంట్ ఫైల్‌ను నిల్వ చేసే కమాండ్లు క్రింద పేర్కొనబడ్డాయి.

అంతేకాకుండా ఒక సాధారణ లాంచర్ ఉంది — `omniroute run <target>` — ఇది సరైన ఎన్విరాన్‌మెంట్ ఇంజెక్ట్ చేయబడిన `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` లేదా `gemini` ని స్పాన్ చేస్తుంది, ఏ కాంఫిగరేషన్‌ను కూడా రాయకుండా. లక్ష్యాలు మరియు వాటి అలియాస్లు కెనానికల్ మానిఫెస్ట్ `bin/cli/cli-manifest.mjs` నుండి వస్తాయి (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), మరియు `omniroute completion` అదే మానిఫెస్ట్-ఉత్పన్న లక్ష్య పదాలను అందిస్తుంది. పాత పర్-టూల్ లాంచర్లు — `omniroute launch` (Claude Code) మరియు `omniroute launch-codex` (Codex) — అందుబాటులో ఉన్నాయి.

ప్రొవైడర్ ఆన్‌బోర్డింగ్ అదే స్థానిక/దూర సందర్భం నుండి అందుబాటులో ఉంది. క్రింద ఉన్న API-ముందు కమాండ్లు నిర్వహణ ప్రమాణీకరణను ప్రొవైడర్ క్రెడెన్షియల్స్ నుండి వేరుగా ఉంచుతాయి మరియు ఎప్పుడూ నిర్మిత అవుట్‌పుట్‌లో క్రెడెన్షియల్‌ను ముద్రించవు:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

స్క్రిప్ట్స్ కోసం, `--credential-stdin` లేదా `--credential-env` ను ప్రాధాన్యం ఇవ్వండి; `--credential` నియంత్రిత స్థానిక ఉపయోగం కోసం ఉంచబడింది. `providers remove` ఒక నాన్-ఇంటరాక్టివ్ టెర్మినల్‌లో `--yes` ను అవసరం చేస్తుంది, మరియు అన్ని ఐదు కమాండ్లు చురుకైన సందర్భం లేదా గ్లోబల్ `--base-url`/`--api-key` ఎంపికలను గౌరవిస్తాయి.

రెండు అత్యంత సంపన్న ఇంటిగ్రేషన్స్ యొక్క ఒకసారి, చేతితో రాసిన ప్రాథమిక సెటప్ కోసం, పర్-టూల్ లోతైన డైవ్‌లను చూడండి:

- [Claude Code కాంఫిగరేషన్](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI కాంఫిగరేషన్](./CODEX-CLI-CONFIGURATION.md)
- [దూర మోడ్](./REMOTE-MODE.md) — మీ లాప్‌టాప్ నుండి దూర OmniRoute (VPS / Tailnet) ని నడపండి
- [VS కోడ్ కోపైలట్ చాట్](./VSCODE-COPILOT.md) — OmniCopilot విస్తరణ; ఇది మీ కోసం ఎడిటర్ లో ఈ `setup-*` కమాండ్లను కూడా నడపవచ్చు

---

## మాస్టర్ పట్టిక

ప్రతి కమాండ్ **చురుకైన సందర్భం** ( `omniroute connect` తో సెట్ చేయబడింది, చూడండి [దూర మోడ్](./REMOTE-MODE.md)) లేదా స్పష్టమైన `--remote <url> --api-key <key>` ఫ్లాగ్‌లను గౌరవిస్తుంది. "స్థానిక vs దూర" క్రింద అర్థం: ఎలాంటి ఫ్లాగ్‌లతో ఇది `http://localhost:20128` ను లక్ష్యంగా చేస్తుంది; `--remote` (లేదా చురుకైన దూర సందర్భం) తో అది ఆ సర్వర్ నుండి కాటలాగ్‌ను పొందుతుంది మరియు స్థానికంగా కాంఫిగరేషన్‌ను రాస్తుంది.

| కమాండ్                     | టూల్                         | ఇది ఏమి రాస్తుంది                                                                                                                                                                            | కీలక ఫ్లాగ్‌లు                                                                                                                             | స్థానిక vs దూర |
| -------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — ప్రతి అనుకూల టెక్స్ట్ మోడల్‌కు ఒక ప్రొఫైల్ (`codex --profile <name>`)                                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | రెండూ          |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — ప్రతి సరిపోయే మోడల్‌కు ఒక ప్రొఫైల్ (`CLAUDE_CONFIG_DIR`)                                                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | రెండూ          |
| `omniroute setup-opencode` | OpenCode (openai-compatible) | `~/.config/opencode/opencode.json` — ప్రతి కాటలాగ్ మోడల్‌తో `omniroute` ప్రొవైడర్ (`opencode -m omniroute/<model>`)                                                                          | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | రెండూ          |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI మోడ్) + VS కోడ్ విస్తరణ సెట్టింగ్‌లను ముద్రిస్తుంది                                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | రెండూ          |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + ఉంటే `kilocode.*` ను VS కోడ్ `settings.json` లో విలీనం చేస్తుంది                                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | రెండూ          |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — `provider: openai` మోడల్‌లు, కీ `${{ secrets.OMNIROUTE_API_KEY }}` ద్వారా                                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | రెండూ          |
| `omniroute setup-cursor`   | Cursor                       | ఏమీ కాదు — యాప్‌లో దశలను ముద్రిస్తుంది (Cursor కాంఫిగరేషన్ అంధకమైన SQLite)                                                                                                                   | `--remote` `--api-key` `--only` `--port`                                                                                                   | రెండూ          |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (ఆమోద డాక్యుమెంట్) + ఒక VS కోడ్ `settings.json` ఉంటే `roo-cline.autoImportSettingsPath` ను సెట్ చేస్తుంది                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | రెండూ          |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — `openai-compat` ప్రొవైడర్, కీ `$OMNIROUTE_API_KEY` ద్వారా                                                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | రెండూ          |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + ఎన్విరాన్‌మెంట్ రెసిపీని ముద్రిస్తుంది                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | రెండూ          |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + ఎన్విరాన్‌మెంట్ రెసిపీని ముద్రిస్తుంది                                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | రెండూ          |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4 `modelProviders.openai` అరిజ్ + `OMNIROUTE_API_KEY` `~/.qwen/.env` లో                                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | రెండూ          |
| `omniroute run <target>`   | రన్‌టైమ్ లాంచ్ (సాధారణ)      | ఏమీ కాదు — సరైన ఎన్విరాన్‌మెంట్ మరియు ఆర్గ్స్‌తో `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` ని స్పాన్ చేస్తుంది; Qwen మరియు Gemini తాత్కాలిక ఇసోలేటెడ్ హోమ్‌ను ఉపయోగిస్తాయి | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | రెండూ          |
| `omniroute launch`         | Claude Code                  | ఏమీ కాదు — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` ఇంజెక్ట్ చేయబడిన `claude` ని స్పాన్ చేస్తుంది                                                                                         | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | రెండూ          |
| `omniroute launch-codex`   | OpenAI Codex CLI             | ఏమీ కాదు — `-c` ఫ్లాగ్‌ల ద్వారా ఇంజెక్ట్ చేయబడిన `omniroute` ప్రొవైడర్‌తో `codex` ని స్పాన్ చేస్తుంది                                                                                        | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | రెండూ          |

ఫ్లాగ్‌లపై గమనికలు (కమాండ్ మూలంలో ధృవీకరించబడింది):

- `--remote <url>` — దూర OmniRoute నుండి కాటలాగ్‌ను పొందండి ( `--port` మరియు చురుకైన సందర్భాన్ని ఓవర్‌రైడ్ చేస్తుంది). `--api-key <key>` ఆ సర్వర్ కోసం క్రెడెన్షియల్‌ను అందిస్తుంది (డిఫాల్ట్‌గా `OMNIROUTE_API_KEY` ఎన్విరాన్‌మెంట్ వేరియబుల్ లేదా చురుకైన సందర్భం యొక్క టోకెన్).
- `--only <patterns>` — కామా-విభజిత ఉపసంహారాలు; సరిపోయే మోడల్ IDలను మాత్రమే ఉంచండి (ఉదా: `--only glm,kimi`). `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush` పై అందుబాటులో ఉంది.
- `--dry-run` — ఫైల్ సిస్టమ్‌ను తాకకుండా ఏమి రాయబడుతుందో ఖచ్చితంగా ముద్రించండి. ప్రతి `setup-*` కమాండ్లపై అందుబాటులో ఉంది **setup-cursor** (ఎప్పుడూ ఫైల్‌ను రాయదు) తప్ప.
- `--model <id>` — మోడల్ ఆటో-డిస్కవరీ లేకుండా ఉన్న టూల్స్ కోసం అవసరం (లేదా ఇంటరాక్టివ్‌గా ఎంచుకోబడింది): Cline, Kilo, Roo, Goose, Qwen, Aider. ఆ టూల్స్ `--yes` ను నాన్-ఇంటరాక్టివ్ రన్‌ల కోసం కూడా అంగీకరిస్తాయి (అప్పుడు `--model` అవసరం). `setup-opencode` డిఫాల్ట్ టాప్-లెవల్ మోడల్‌ను సెట్ చేయడానికి `--model` ను తీసుకుంటుంది.
- `--model <id>` `omniroute run` పై మానిఫెస్ట్ యొక్క పర్-టార్గెట్ వైరింగ్‌ను అనుసరిస్తుంది (`bin/cli/cli-manifest.mjs`): **aider** `--model openai/<id>` మరియు **opencode** `--model omniroute/<id>` (id ఇప్పటికే దానిని కలిగి లేకపోతే ప్రిఫిక్స్ జోడించబడుతుంది); **qwen** మరియు **gemini** idని వర్బాటిమ్‌గా పొందుతాయి; **claude** దానిని `ANTHROPIC_MODEL` ద్వారా పొందుతుంది, **goose** `GOOSE_MODEL` ద్వారా, మరియు **codex** `-c model_providers.omniroute.*` ఆర్గ్స్ ద్వారా. **Qwen మాత్రమే `--model` ను కఠినంగా అవసరం చేస్తుంది** — `omniroute run qwen` లేకుండా అది స్పష్టమైన పొరపాటుతో `2` ను ఎగుమతి చేస్తుంది.
- `--port <port>` — స్థానిక OmniRoute పోర్ట్ (డిఫాల్ట్ `20128`, `--remote` సెట్ చేసినప్పుడు పరిగణనలోకి తీసుకోబడదు). అన్ని `setup-*` మరియు రెండు లాంచర్లపై అందుబాటులో ఉంది.
- `omniroute run` ఎగుమతి కోడ్స్: పిల్ల CLI యొక్క స్వంత ఎగుమతి కోడ్ ఖచ్చితంగా ప్రాప్యత చేయబడుతుంది; `2` = చెల్లని ఆర్గ్‌లు (మద్దతు ఇవ్వని లక్ష్యం, అవసరమైన `--model` మిస్సింగ్, కంటైనర్ గార్డ్); `127` = లక్ష్య బైనరీ `PATH` లో లేదు; `130`/`143`/`129` లాంచ్ `SIGINT`/`SIGTERM`/`SIGHUP` ద్వారా ముగిసినప్పుడు; `1` = ఇతర రన్‌టైమ్ లాంచ్ విఫలం.
- రెండు లాంచర్లు (`launch`, `launch-codex`) `setup-claude` / `setup-codex` ద్వారా రాసిన ప్రొఫైల్‌ను ఎంచుకోవడానికి `--profile <name>` ను అంగీకరిస్తాయి, అదనపు ఆర్గ్‌లను కింద ఉన్న `claude` / `codex` బైనరీకి పంపిస్తాయి.

ఇంటరాక్టివ్ పిక్కర్ కూడా సెటప్ రెసిపీల ద్వారా పంచబడింది:

```bash
# చురుకైన స్థానిక లేదా దూర మోడల్ కాటలాగ్ నుండి ఎంచుకోండి మరియు లక్ష్యాన్ని కాంఫిగర్ చేయండి.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` ప్రస్తుతం `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, మరియు `kilo` కోసం పరీక్షించిన రెసిపీలకు అప్పగిస్తుంది. IDE-కేవలం, MITM, మరియు గైడ్-కేవలం కాటలాగ్ ఎంట్రీలు స్పష్టమైన `setup-*`/మాన్యువల్ ప్రవాహాలు మరియు లాంచ్ చేయదగిన లక్ష్యాలుగా ప్రదర్శించబడవు.

> `setup-opencode` అనేది **తేలికపాటి openai-సరిపోలిక** OpenCode ఇంటిగ్రేషన్.
> ఒక సమృద్ధి కలిగిన ప్లగిన్ ఇంటిగ్రేషన్ కూడా ఉంది — `omniroute setup opencode` — ఇది `@omniroute/opencode-plugin` ను ఇన్‌స్టాల్ చేస్తుంది. ఇవి వేరు వేరు కమాండ్లు; పై పట్టిక `setup-opencode` ను డాక్యుమెంట్ చేస్తుంది.

---

## స్థానిక వినియోగం

`localhost:20128` వద్ద OmniRoute నడుస్తున్నప్పుడు, మీ టూల్ కోసం సెటప్ ఆదేశాన్ని నడపండి. కాటలాగ్ స్థానిక సర్వర్ నుండి పొందబడుతుంది.

```bash
# Codex: సరిపోయే మోడల్ కోసం ~/.codex/ లో ఒక ప్రొఫైల్ రాయండి
omniroute setup-codex
codex --profile glm52            # ఉత్పత్తి చేసిన ప్రొఫైల్ ఉపయోగించండి

# Claude Code: మోడల్ ప్రకారం ప్రొఫైల్స్ రాయండి, తరువాత ఒకటి ప్రారంభించండి
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: అన్ని కాటలాగ్ మోడల్స్‌తో openai-సంబంధిత ప్రొవైడర్‌ను రాయండి
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} ద్వారా సూచించబడింది, డిస్క్‌పై ఎప్పుడూ కాదు
opencode -m omniroute/glm/glm-5.2 "..."

# ఆటో-డిస్కవరీ లేని టూల్స్ స్పష్టమైన మోడల్ అవసరం:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# ఏదీ రాయకుండా ప్రివ్యూ:
omniroute setup-continue --dry-run
```

ఏ కాన్ఫిగరేషన్‌ను కూడా రాయకుండా ప్రారంభించండి (ఎన్‌వి-ఇంజెక్షన్ మాత్రమే):

```bash
omniroute launch                 # Claude Code → స్థానిక OmniRoute
omniroute launch-codex           # Codex CLI → స్థానిక OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# స్పష్టమైన ఆదేశ మార్గం: -- తర్వాత వచ్చే ఏదీ పాస్ చేయండి
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## దూర వినియోగం

ఏ సెటప్ ఆదేశాన్ని `--remote` + `--api-key` తో దూర OmniRoute కు సంకేతం చేయండి. కాటలాగ్ దూరం నుండి పొందబడుతుంది; కాన్ఫిగరేషన్ మీ స్థానిక యంత్రంపై రాయబడుతుంది.

```bash
# దూర VPS పై OpenCode, కేవలం glm/kimi మోడల్స్‌ను ఉంచండి
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # మొదట OMNIROUTE_API_KEY ను ఎగుమతి చేయండి

# దూర కాటలాగ్ నుండి Codex ప్రొఫైల్స్
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# దూరానికి నేరుగా CLI ప్రారంభించండి
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

ప్రతి సారి `--remote`/`--api-key` ను పాస్ చేయడం బదులు, ఒకసారి లాగ్ ఇన్ అవ్వండి మరియు **సక్రియమైన సందర్భం** వాటిని ఆటోమేటిక్‌గా అందించనివ్వండి:

```bash
omniroute connect 192.168.0.15        # స్కోప్డ్ టోకెన్‌ను సృష్టిస్తుంది, సందర్భాన్ని నిల్వ చేస్తుంది
omniroute setup-codex                 # ← ఇప్పుడు దూర కాటలాగ్‌ను ఉపయోగిస్తుంది
omniroute setup-opencode              # ← అదే
omniroute launch                      # ← Claude Code దూరానికి
```

సందర్భాలు, స్కోప్స్ మరియు టోకెన్ నిర్వహణ కోసం [Remote Mode](./REMOTE-MODE.md) చూడండి.

---

## బేస్ URL సంప్రదాయాలు (ఏ టూల్స్ `/v1` ను కోరుకుంటాయి)

OmniRoute OpenAI ఉపరితలాన్ని `/v1` వద్ద, Anthropic ఉపరితలాన్ని మూలంలో, మరియు ఒక స్వదేశీ Gemini ఉపరితలాన్ని `/v1beta` వద్ద అందిస్తుంది. ప్రతి ఇంటిగ్రేషన్ దాని టూల్ ఆశించే రూపానికి అనుసంధానించబడింది (ఆదేశ మూలంలో ధృవీకరించబడింది):

| ఇంటిగ్రేషన్                                                                | బేస్ URL రాయబడింది | `/v1`?                                               |
| -------------------------------------------------------------------------- | ------------------ | ---------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | మూలం               | కాదు — Cline `/v1/chat/completions` ను జోడిస్తుంది   |
| `setup-goose` (`OPENAI_HOST`)                                              | మూలం               | కాదు — Goose మార్గాన్ని జోడిస్తుంది                  |
| `setup-aider` (`OPENAI_API_BASE`)                                          | మూలం               | కాదు — LiteLLM `/v1/chat/completions` ను జోడిస్తుంది |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` తో           | అవును                                                |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | మూలం               | కాదు — Claude Code `/v1/messages` ను జోడిస్తుంది     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` తో           | అవును                                                |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` తో           | అవును                                                |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | మూలం               | కాదు — SDK `/v1beta/models/…` ను జోడిస్తుంది         |

---

## స్థానిక డిపెండెన్సీలను నవీకరించేటప్పుడు ఉంచడం: `--include=optional`

మీరు `omniroute update` తో నవీకరించినప్పుడు (మరియు నిర్ధారించిన తర్వాత, లేదా `--apply` తో),
OmniRoute `--include=optional` తో ఇన్‌స్టాల్‌ను నడుపుతుంది:

```bash
npm install -g omniroute@latest --include=optional
```

ఇది `omniroute update` కు మీరు అందించే ఒక ఫ్లాగ్ **కాదు** — ఇది ఎప్పుడూ
అప్‌డేటర్ ద్వారా వర్తించబడుతుంది. ఇది `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM స్టాక్) నవీకరణను బతికించడానికి హామీ ఇస్తుంది, మీ npm కాన్ఫిగరేషన్‌లో
`omit=optional` సెట్ చేసినా, ఇది మౌనంగా స్థానిక SQLite డ్రైవర్ మరియు OS-keyring బైండింగ్‌ను
తొలగిస్తుంది. ఖచ్చితమైన ఆదేశాన్ని ప్రదర్శించడానికి, వర్తింపజేయకుండా:

```bash
omniroute update --dry-run
# [DRY RUN] Would run: npm install -g omniroute@latest --include=optional
```

ఇతర `omniroute update` ఫ్లాగ్‌లు (మూలంలో నిర్ధారించబడినవి): `--check` (పాతదిగా ఉంటే 1తో బయటకు రండి), `--apply` (ప్రాంప్ట్ లేకుండా ఇన్‌స్టాల్ చేయండి), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI ద్వారా `omniroute run gemini`

`@google/gemini-cli` 0.50.0 కు వ్యతిరేకంగా ఒప్పందం నిర్ధారించబడింది: CLI
`GOOGLE_GEMINI_BASE_URL` ను గౌరవిస్తుంది మరియు `POST /v1beta/models/<model>:generateContent`
(మరియు `:streamGenerateContent?alt=sse`) కు వ్యతిరేకంగా ఇస్తుంది — ఇది OmniRoute యొక్క స్థానిక
Gemini ఉపరితలానికి ( `/v1beta`). `omniroute run gemini` దాన్ని ఆటోమేటిక్‌గా కేబుల్ చేస్తుంది:

- `GOOGLE_GEMINI_BASE_URL` → క్రియాశీల OmniRoute బేస్ URL (రూట్, `/v1` లేదు);
- `GEMINI_API_KEY` → పరిష్కరించిన OmniRoute క్రెడెన్షియల్ (ఐచ్ఛికం/పర్యావరణం/సందర్భం);
- ఒక **తాత్కాలిక వేరుపరచబడిన `GEMINI_CLI_HOME`** దీని `.gemini/settings.json`
  `gemini-api-key` ఆథ్‌ను ఎంచుకుంటుంది, కాబట్టి నిల్వ చేసిన Google OAuth సెషన్ (Code Assist)
  OmniRoute-నిర్దేశిత ప్రారంభాన్ని ఎప్పుడూ మించినది కాదు — నిష్క్రమణ తర్వాత తొలగించబడుతుంది;
- **పర్యావరణ శుభ్రత**: పిల్లల పర్యావరణం `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` మరియు `GOOGLE_GENAI_USE_GCA` (ఇవి
  ఆథ్‌ను Vertex/Code Assist కు మళ్లించేవి) నుండి శుభ్రపరచబడింది, మరియు `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  ఒక బెల్ట్-మరియు-సస్పెండర్స్ బ్యాకప్‌గా సెట్ చేయబడింది — ఇతర `run` లక్ష్యాలు తమ స్వంత
  విరుద్ధమైన చరాలను పొందుతాయి;
- `--model <id>` ను `--provider`/`--model` నుండి చొప్పించండి.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini యొక్క వర్క్‌స్పేస్-ట్రస్ట్ గార్డ్ ఇంకా హెడ్‌లెస్ మోడ్‌లో వర్తిస్తుంది —
`--skip-trust` ను పాస్ చేయండి (లేదా డైరెక్టరీని ఇంటరాక్టివ్‌గా నమ్మండి);
ప్రారంభకుడు దాన్ని ఉద్దేశపూర్వకంగా దాటించదు. ఈ ప్రారంభకుడు **ACP నమోదు**
(`src/lib/acp/registry.ts`, `gemini --acp`) నుండి భిన్నంగా ఉంది, ఇది
`/dashboard/acp-agents` కోసం ఏజెంట్-ప్రోటోకాల్ ఇంటిగ్రేషన్‌గా ఉంటుంది.

---

## నిజమైన పొగ స్రవంతి (ఆప్ట్ఇన్)

CIలో నిర్ధిష్టమైన ప్రారంభ-యోజన పునరావృతాలు నడుస్తాయి
(`tests/unit/cli/run-command.test.ts`, `tests/unit/cli/run-execution.test.ts`).
నిజమైన OmniRoute సర్వర్‌కు నిజమైన బైనరీలను ధృవీకరించడానికి,
`tests/integration/upstream-cli-smoke.int.test.ts` వద్ద ఒక ఆప్ట్ఇన్ హార్నెస్ ఉంది.
ఇది ఆటోమేటిక్‌గా నడవదు (ప్రతి ఉప-పరీక్ష `RUN_CLI_SMOKE=1` లేకుండా దాటిస్తుంది),
క్రెడెన్షియల్‌ను పర్యావరణ-చర NAME ద్వారా అందిస్తుంది (విలువ ద్వారా కాదు),
ఎక్కడైనా నమోదైన అవుట్‌పుట్ నుండి కీ-ఆకారపు స్ట్రింగ్స్‌ను ముడిపెడుతుంది,
ఇన్‌స్టాల్ చేయబడని బైనరీల లక్ష్యాలను దాటిస్తుంది, మరియు విఫలమవ్వడాలను
ఆథ్ / అప్‌స్ట్రీమ్ / కాన్ఫిగ్ గా వర్గీకరిస్తుంది, కేవలం బేర్ బూలియన్‌గా కాదు:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

ఐచ్ఛికం: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"`
స్రవంతిని పరిమితం చేస్తుంది; `OMNIROUTE_SMOKE_TIMEOUT_MS`
120సెకన్ల ప్రతి లక్ష్యానికి టైమ్‌ఔట్‌ను అధిగమిస్తుంది.

---

## మరింత చూడండి

- [Claude Code కాన్ఫిగరేషన్](./CLAUDE-CODE-CONFIGURATION.md) — లోతైన Claude Code మార్గదర్శకం
- [Codex CLI కాన్ఫిగరేషన్](./CODEX-CLI-CONFIGURATION.md) — ఒకసారి `[model_providers.omniroute]` ప్రాథమిక సెటప్
- [రిమోట్ మోడ్](./REMOTE-MODE.md) — సందర్భాలు, స్కోప్ చేసిన యాక్సెస్ టోకెన్లు, రిమోట్ సర్వర్‌ను నడపడం
- [CLI టూల్స్ సూచిక](../reference/CLI-TOOLS.md) — మద్దతు పొందిన టూల్స్ + డాష్‌బోర్డ్ పేజీల పూర్తి కాటలాగ్
- [సెట్టప్ గైడ్](./SETUP_GUIDE.md) — ఇన్‌స్టాల్ పద్ధతులు మరియు మొదటి రన్ ఆన్‌బోర్డింగ్
