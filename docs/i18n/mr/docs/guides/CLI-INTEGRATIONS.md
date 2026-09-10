# CLI-INTEGRATIONS (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI इंटिग्रेशन्स — OmniRoute कडे कोणत्याही कोडिंग CLI ला निर्देशित करा"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI इंटिग्रेशन्स

OmniRoute एक कुटुंब `setup-*` कमांडसह येते जे एक कोडिंग CLI (Codex, Claude Code, OpenCode, Cline, …) ला OmniRoute चा बॅकएंड म्हणून वापरण्यासाठी कॉन्फिगर करते — त्यामुळे
हे टूल **एक** एंडपॉइंटशी संवाद साधते आणि OmniRoute योग्य प्रदात्याकडे रूट करते
ऑटो-फॉल्बॅकसह. प्रत्येक कमांड चालू OmniRoute (स्थानिक किंवा दूरस्थ) कडून **लाइव्ह** मॉडेल कॅटलॉग वाचते आणि **तुमच्या** मशीनवर टूलचा स्वतःचा कॉन्फिग फाइल लिहिते. API की एक पर्यावरण चलाने संदर्भित केली जाते जिथे टूल त्याला समर्थन करते. टूल-स्थानिक पर्यावरण फाइल टिकवणाऱ्या कमांड खाली नमूद केल्या आहेत.

एक सामान्य लाँचर देखील आहे — `omniroute run <target>` — जो योग्य वातावरण इंजेक्ट करून `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` किंवा `gemini` सुरू करतो, कोणतीही कॉन्फिग लिहित नाही. लक्ष्ये आणि त्यांचे उपनाम कॅनॉनिकल मॅनिफेस्ट `bin/cli/cli-manifest.mjs` कडून येतात
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), आणि `omniroute completion` समान मॅनिफेस्ट-व्युत्पन्न लक्ष्य शब्द ऑफर करते. वारसा प्रति-टूल लाँचर्स —
`omniroute launch` (Claude Code) आणि `omniroute launch-codex` (Codex) — उपलब्ध आहेत.

प्रदात्यांचे ऑनबोर्डिंग समान स्थानिक/दूरस्थ संदर्भातून उपलब्ध आहे. खालील API-प्रथम कमांड व्यवस्थापन प्रमाणीकरण प्रदाता क्रेडेन्शियल्सपासून वेगळे ठेवतात आणि कधीही संरचित आउटपुटमध्ये क्रेडेन्शियल प्रिंट करत नाहीत:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

स्क्रिप्टसाठी, `--credential-stdin` किंवा `--credential-env` प्राधान्य द्या; `--credential` नियंत्रित स्थानिक वापरासाठी राखले जाते. `providers remove` एक नॉन-इंटरएक्टिव्ह टर्मिनलवर `--yes` आवश्यक आहे, आणि सर्व पाच कमांड सक्रिय संदर्भ किंवा जागतिक `--base-url`/`--api-key` पर्यायांचा आदर करतात.

दोन सर्वात समृद्ध इंटिग्रेशन्सच्या एकदाच, हस्तलिखित बेस सेटअपसाठी, प्रति-टूल गहन अभ्यास पहा:

- [Claude Code कॉन्फिगरेशन](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI कॉन्फिगरेशन](./CODEX-CLI-CONFIGURATION.md)
- [दूरस्थ मोड](./REMOTE-MODE.md) — तुमच्या लॅपटॉपवरून एक दूरस्थ OmniRoute (VPS / Tailnet) चालवा
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot विस्तार; हे तुम्हाला संपादकाच्या आतून तुमच्यासाठी `setup-*` कमांड चालवू शकते

---

## मास्टर टेबल

प्रत्येक कमांड **सक्रिय संदर्भ** (जो `omniroute connect` सह सेट केला जातो, पहा
[दूरस्थ मोड](./REMOTE-MODE.md)) किंवा स्पष्ट `--remote <url> --api-key <key>` फ्लॅगचा आदर करतो.
"स्थानिक विरुद्ध दूरस्थ" म्हणजे: कोणत्याही फ्लॅगशिवाय ते `http://localhost:20128` ला लक्षित करते;
`--remote` (किंवा सक्रिय दूरस्थ संदर्भ) सह ते त्या सर्व्हरकडून कॅटलॉग आणते आणि स्थानिकरित्या कॉन्फिग लिहिते.

| कमांड                      | टूल                          | काय लिहिते                                                                                                                                                 | मुख्य फ्लॅग्स                                                                                                                              | स्थानिक विरुद्ध दूरस्थ |
| -------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — प्रत्येक सुसंगत टेक्स्ट मॉडेलसाठी एक प्रोफाइल (`codex --profile <name>`)                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | दोन्ही                 |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — जुळलेल्या मॉडेलसाठी एक प्रोफाइल (`CLAUDE_CONFIG_DIR`)                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | दोन्ही                 |
| `omniroute setup-opencode` | OpenCode (openai-compatible) | `~/.config/opencode/opencode.json` — प्रत्येक कॅटलॉग मॉडेलसह `omniroute` प्रदाता (`opencode -m omniroute/<model>`)                                         | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | दोन्ही                 |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI मोड) + VS Code विस्तार सेटिंग्ज प्रिंट करते                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | दोन्ही                 |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + उपस्थित असल्यास VS Code `settings.json` मध्ये `kilocode.*` विलीन करते                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | दोन्ही                 |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — `provider: openai` मॉडेल, की `${{ secrets.OMNIROUTE_API_KEY }}` द्वारे                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | दोन्ही                 |
| `omniroute setup-cursor`   | Cursor                       | काहीही नाही — इन-ऍप स्टेप्स प्रिंट करते (Cursor कॉन्फिग अस्पष्ट SQLite आहे)                                                                                | `--remote` `--api-key` `--only` `--port`                                                                                                   | दोन्ही                 |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (आयात दस्तऐवज) + जर VS Code `settings.json` अस्तित्वात असेल तर `roo-cline.autoImportSettingsPath` सेट करते                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | दोन्ही                 |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — `openai-compat` प्रदाता, की `$OMNIROUTE_API_KEY` द्वारे                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | दोन्ही                 |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + वातावरण रेसिपी प्रिंट करते                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | दोन्ही                 |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + वातावरण रेसिपी प्रिंट करते                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | दोन्ही                 |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4 `modelProviders.openai` अ‍ॅरे + `OMNIROUTE_API_KEY` `~/.qwen/.env` मध्ये                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | दोन्ही                 |
| `omniroute run <target>`   | रनटाइम लाँच (सामान्य)        | काहीही नाही — योग्य वातावरण आणि आर्गसह `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` सुरू करतो; Qwen आणि Gemini एक तात्पुरता पृथक घर वापरतात | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | दोन्ही                 |
| `omniroute launch`         | Claude Code                  | काहीही नाही — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` इंजेक्ट करून `claude` सुरू करतो                                                                  | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | दोन्ही                 |
| `omniroute launch-codex`   | OpenAI Codex CLI             | काहीही नाही — `-c` फ्लॅगद्वारे `omniroute` प्रदाता इंजेक्ट करून `codex` सुरू करतो                                                                          | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | दोन्ही                 |

फ्लॅग्सवरील नोट्स (कमांड स्रोतात सत्यापित):

- `--remote <url>` — दूरस्थ OmniRoute कडून कॅटलॉग आणा (सक्रिय संदर्भ आणि `--port` ओव्हरराइड करते). `--api-key <key>` त्या सर्व्हरसाठी क्रेडेन्शियल प्रदान करते (जे `OMNIROUTE_API_KEY` पर्यावरण चलानुसार, किंवा सक्रिय संदर्भाच्या टोकनवर डिफॉल्ट असते).
- `--only <patterns>` — अल्पविरामाने विभाजित उपस्ट्रिंग्ज; फक्त मॉडेल आयडी ठेवा जे जुळतात
  (उदा. `--only glm,kimi`). `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush` वर उपलब्ध आहे.
- `--dry-run` — फाइल सिस्टमला स्पर्श न करता नेमके काय लिहिले जाईल ते प्रिंट करा. प्रत्येक `setup-*` कमांडवर उपलब्ध **व्यतिरिक्त** `setup-cursor`
  (जे कधीही फाइल लिहित नाही).
- `--model <id>` — आवश्यक (किंवा इंटरएक्टिव्हपणे निवडलेले) त्या टूलसाठी ज्यांच्याकडे
  मॉडेल ऑटो-डिस्कवरी नाही: Cline, Kilo, Roo, Goose, Qwen, Aider. त्या टूल्स
  `--yes` साठी देखील स्वीकारतात जे नॉन-इंटरएक्टिव्ह चालवण्यासाठी आवश्यक आहे (जेव्हा `--model` आवश्यक आहे).
  `setup-opencode` `--model` घेतो जेणेकरून डिफॉल्ट टॉप-लेव्हल मॉडेल सेट होईल.
- `--model <id>` `omniroute run` वर मॅनिफेस्टच्या प्रति-लक्ष्य वायरिंगचे अनुसरण करते
  (`bin/cli/cli-manifest.mjs`): **aider** `--model openai/<id>` प्राप्त करतो आणि
  **opencode** `--model omniroute/<id>` (प्रिफिक्स फक्त तेव्हा जोडले जाते जेव्हा आयडी
  आधीच ते घेतलेले नाही); **qwen** आणि **gemini** आयडी शब्दशः प्राप्त करतात;
  **claude** ते `ANTHROPIC_MODEL` द्वारे प्राप्त करतो, **goose** `GOOSE_MODEL` द्वारे, आणि
  **codex** `-c model_providers.omniroute.*` आर्गसद्वारे. **Qwen हा एकटा रन
  लक्ष्य आहे जो `--model` कडून कठोरपणे आवश्यक आहे** — `omniroute run qwen` त्याशिवाय `2` सह स्पष्ट त्रुटीसह बाहेर पडतो.
- `--port <port>` — स्थानिक OmniRoute पोर्ट (डिफॉल्ट `20128`, जेव्हा `--remote`
  सेट केले जाते तेव्हा दुर्लक्षित). सर्व `setup-*` आणि दोन्ही लाँचर्सवर उपस्थित.
- `omniroute run` बाहेर पडण्याचे कोड: बाल CLI चा स्वतःचा बाहेर पडण्याचा कोड
  शब्दशः प्रकट केला जातो; `2` = अमान्य तर्क (समर्थित लक्ष्य, आवश्यक
  `--model` गहाळ, कंटेनर गार्ड); `127` = लक्ष्य बायनरी `PATH` मध्ये नाही;
  `130`/`143`/`129` जेव्हा लाँच `SIGINT`/`SIGTERM`/`SIGHUP` द्वारे संपवले जाते;
  `1` = इतर रनटाइम लाँच अपयश.
- दोन लाँचर्स (`launch`, `launch-codex`) `--profile <name>` स्वीकारतात
  `setup-claude` / `setup-codex` द्वारे लिहिलेल्या प्रोफाइलची निवड करण्यासाठी, तसेच
  अंतर्गत `claude` / `codex` बायनरीसाठी पास-थ्रू आर्गसाठी.

इंटरएक्टिव्ह पिकर सेटअप रेसिपीमध्ये देखील सामायिक आहे:

```bash
# सक्रिय स्थानिक किंवा दूरस्थ मॉडेल कॅटलॉगमधून निवडा आणि लक्ष्य कॉन्फिगर करा.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` सध्या `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, आणि `kilo` साठी चाचणी केलेल्या रेसिपींवर प्रतिनिधित्व करते. IDE-फक्त,
MITM, आणि मार्गदर्शक-फक्त कॅटलॉग नोंदी स्पष्ट `setup-*`/हस्तनिर्मित प्रवाह म्हणून राहतात आणि लाँच करण्यायोग्य लक्ष्य म्हणून सादर केले जात नाहीत.

> `setup-opencode` हा **हलका openai-compatible** OpenCode इंटिग्रेशन आहे.
> एक समृद्ध प्लगइन इंटिग्रेशन देखील आहे — `omniroute setup opencode` — जे
> `@omniroute/opencode-plugin` स्थापित करते. हे वेगवेगळे कमांड आहेत; वरील टेबल
> `setup-opencode` दस्तऐवज करते.

---

## स्थानिक वापर

`localhost:20128` वर OmniRoute चालू असताना, आपल्या साधनासाठी सेटअप कमांड चालवा. कॅटलॉग स्थानिक सर्व्हरवरून आणला जातो.

```bash
# Codex: जुळलेल्या मॉडेलसाठी ~/.codex/ मध्ये एक प्रोफाइल लिहा
omniroute setup-codex
codex --profile glm52            # तयार केलेला प्रोफाइल वापरा

# Claude Code: प्रत्येक मॉडेलसाठी प्रोफाइल लिहा, नंतर एक चालू करा
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: सर्व कॅटलॉग मॉडेलसह openai-संगत प्रदाता लिहा
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} द्वारे संदर्भित, कधीही डिस्कवर नाही
opencode -m omniroute/glm/glm-5.2 "..."

# स्वयंचलित शोध न करणाऱ्या साधनांना स्पष्ट मॉडेलची आवश्यकता आहे:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# काहीही लिहित न येता पूर्वावलोकन:
omniroute setup-continue --dry-run
```

कुठलीही कॉन्फिगरेशन लिहित न येता चालू करा (फक्त env-injection):

```bash
omniroute launch                 # Claude Code → स्थानिक OmniRoute
omniroute launch-codex           # Codex CLI → स्थानिक OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# स्पष्ट कमांड पथ: -- नंतर येणारे काहीही पास करा
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## दूरस्थ वापर

कुठल्याही सेटअप कमांडला `--remote` + `--api-key` सह एक दूरस्थ OmniRoute वर लक्षित करा. कॅटलॉग दूरस्थपणे आणला जातो; कॉन्फिगरेशन आपल्या स्थानिक मशीनवर लिहिले जाते.

```bash
# दूरस्थ VPS विरुद्ध OpenCode, फक्त glm/kimi मॉडेल ठेवा
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # प्रथम OMNIROUTE_API_KEY निर्यात करा

# दूरस्थ कॅटलॉगमधून Codex प्रोफाइल
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# थेट दूरस्थ विरुद्ध CLI चालू करा
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

प्रत्येक वेळी `--remote`/`--api-key` पास करण्याऐवजी, एकदा लॉगिन करा आणि **सक्रिय संदर्भ** त्यांना स्वयंचलितपणे पुरवू द्या:

```bash
omniroute connect 192.168.0.15        # एक स्कोप केलेला टोकन तयार करतो, संदर्भ संग्रहित करतो
omniroute setup-codex                 # ← आता दूरस्थ कॅटलॉग वापरतो
omniroute setup-opencode              # ← समान
omniroute launch                      # ← Claude Code दूरस्थ विरुद्ध
```

संदर्भ, स्कोप आणि टोकन व्यवस्थापनासाठी [दूरस्थ मोड](./REMOTE-MODE.md) पहा.

---

## बेस URL संकल्पना (ज्या साधनांना `/v1` हवे आहे)

OmniRoute OpenAI पृष्ठभाग `/v1` वर, Anthropic पृष्ठभाग मूळवर, आणि एक स्थानिक Gemini पृष्ठभाग `/v1beta` वर उघडतो. प्रत्येक एकत्रीकरण त्याच्या साधनाला अपेक्षित असलेल्या स्वरूपात वायर्ड आहे (कमांड स्रोतात सत्यापित):

| एकत्रीकरण                                                                  | बेस URL लिहिलेले | `/v1`?                                      |
| -------------------------------------------------------------------------- | ---------------- | ------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | मूळ              | नाही — Cline `/v1/chat/completions` जोडतो   |
| `setup-goose` (`OPENAI_HOST`)                                              | मूळ              | नाही — Goose पथ जोडतो                       |
| `setup-aider` (`OPENAI_API_BASE`)                                          | मूळ              | नाही — LiteLLM `/v1/chat/completions` जोडतो |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` सह         | होय                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | मूळ              | नाही — Claude Code `/v1/messages` जोडतो     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` सह         | होय                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` सह         | होय                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | मूळ              | नाही — SDK `/v1beta/models/…` जोडतो         |

---

## स्थानिक अवलंबनांचे अद्यतन ठेवणे: `--include=optional`

जेव्हा तुम्ही `omniroute update` सह अद्यतन करता (पुष्टीकरणानंतर, किंवा `--apply` सह),
OmniRoute `--include=optional` सह स्थापित करते:

```bash
npm install -g omniroute@latest --include=optional
```

हे **नाही** एक ध्वज आहे जो तुम्ही `omniroute update` ला पास करता — हे नेहमी अद्यतन करणाऱ्याद्वारे लागू केले जाते. हे `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM स्टॅक) अद्यतनानंतर टिकवून ठेवण्याची हमी देते, अगदी तुमच्या npm कॉन्फिगमध्ये
`omit=optional` सेट केले तरी, जे अन्यथा स्थानिक SQLite
ड्रायव्हर आणि OS-keyring बाइंडिंग गुपचूप काढून टाकेल. अचूक आदेश पूर्वावलोकन करण्यासाठी, लागू न करता:

```bash
omniroute update --dry-run
# [DRY RUN] चालवेल: npm install -g omniroute@latest --include=optional
```

इतर `omniroute update` ध्वज (स्रोतामध्ये सत्यापित): `--check` (आउटडेट असल्यास 1 बाहेर येते), `--apply` (प्रॉम्प्ट न करता स्थापित करा), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI `omniroute run gemini` द्वारे

`@google/gemini-cli` 0.50.0 विरुद्ध करार सत्यापित: CLI `GOOGLE_GEMINI_BASE_URL` चा आदर करते
आणि `POST /v1beta/models/<model>:generateContent`
(आणि `:streamGenerateContent?alt=sse`) यावर जारी करते — अगदी OmniRoute च्या स्थानिक
Gemini पृष्ठभागावर (`/v1beta`). `omniroute run gemini` हे स्वयंचलितपणे कनेक्ट करते:

- `GOOGLE_GEMINI_BASE_URL` → सक्रिय OmniRoute बेस URL (मूळ, `/v1` नाही);
- `GEMINI_API_KEY` → निराकृत OmniRoute क्रेडेन्शियल (पर्याय/env/संदर्भ);
- एक **तात्पुरता पृथक `GEMINI_CLI_HOME`** ज्याचा `.gemini/settings.json`
  `gemini-api-key` प्रमाणीकरण निवडतो, त्यामुळे संग्रहित Google OAuth सत्र (कोड सहाय्य)
  कधीही OmniRoute-निर्देशित लाँचवर ओव्हरराईड करत नाही — बाहेर पडल्यावर काढले जाते;
- **env स्वच्छता**: बालक वातावरण `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` आणि `GOOGLE_GENAI_USE_GCA` यांपासून साफ केले जाते (जे
  प्रमाणीकरण Vertex/Code Assist कडे पुनर्निर्देशित करेल), आणि `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` एक बेल्ट-आणि-सरकन फॉलबॅक म्हणून सेट केले जाते — इतर `run` लक्ष्य त्यांच्या स्वतःच्या संघर्ष करणाऱ्या बदल्यांसाठी समान उपचार मिळवतात;
- `--model <id>` `--provider`/`--model` मधून इंजेक्शन.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini चा कार्यक्षेत्र-विश्वास गार्ड अजूनही हेडलेस मोडमध्ये लागू आहे — `--skip-trust` पास करा
(किंवा डायरेक्टरीला इंटरएक्टिव्हपणे विश्वास ठेवा); लाँचर याला चुकवित नाही. हा लाँचर **ACP
नोंदणी** (`src/lib/acp/registry.ts`, `gemini --acp`) पासून भिन्न आहे, जो `/dashboard/acp-agents` साठी एजंट-प्रोटोकॉल एकत्रीकरण राहतो.

---

## वास्तविक धूर स्विप (ऑप्ट-इन)

CI मध्ये निश्चित लाँच-प्लान रिग्रेशन चालवते (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). वास्तविक OmniRoute सर्व्हर विरुद्ध वास्तविक बायनरींची पडताळणी करण्यासाठी, एक ऑप्ट-इन हार्नेस आहे
`tests/integration/upstream-cli-smoke.int.test.ts`. हे स्वयंचलितपणे चालत नाही
(प्रत्येक उप-चाचणी `RUN_CLI_SMOKE=1` नसेल तर स्किप करते), क्रेडेन्शियल env-var
NAME द्वारे पास करते (कधीही मूल्याद्वारे नाही), कोणत्याही नोंदवलेल्या आउटपुटमधून की-आकाराच्या स्ट्रिंग्ज काढून टाकते, स्थापित न केलेल्या बायनरीच्या लक्ष्यांना स्किप करते, आणि अपयशांना
auth / upstream / config म्हणून वर्गीकृत करते, साध्या बूलियनऐवजी:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

ऐच्छिक: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` स्विपला मर्यादित करते;
`OMNIROUTE_SMOKE_TIMEOUT_MS` 120s प्रति-लक्ष्य टाइमआउट ओव्हरराईड करते.

---

## इतर माहिती

- [Claude Code कॉन्फिगरेशन](./CLAUDE-CODE-CONFIGURATION.md) — गहन Claude Code मार्गदर्शक
- [Codex CLI कॉन्फिगरेशन](./CODEX-CLI-CONFIGURATION.md) — एकदाच `[model_providers.omniroute]` मूलभूत सेटअप
- [दूरस्थ मोड](./REMOTE-MODE.md) — संदर्भ, स्कोप केलेले प्रवेश टोकन, दूरस्थ सर्व्हर चालवणे
- [CLI साधने संदर्भ](../reference/CLI-TOOLS.md) — समर्थित साधनांचा संपूर्ण सूची + डॅशबोर्ड पृष्ठे
- [सेटअप मार्गदर्शक](./SETUP_GUIDE.md) — स्थापना पद्धती आणि पहिल्या वापराचे मार्गदर्शन
