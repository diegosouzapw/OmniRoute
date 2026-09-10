# CLI-INTEGRATIONS (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI इंटीग्रेशन — किसी भी कोडिंग CLI को OmniRoute पर पॉइंट करें"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI इंटीग्रेशन

OmniRoute एक परिवार के `setup-*` कमांड्स के साथ आता है जो एक कोडिंग
CLI (Codex, Claude Code, OpenCode, Cline, …) को OmniRoute को उसके बैकएंड के रूप में उपयोग करने के लिए कॉन्फ़िगर करता है — ताकि
उपकरण **एक** एंडपॉइंट से बात करे और OmniRoute सही प्रदाता की ओर रूट करता है
ऑटो-फॉलबैक के साथ। प्रत्येक कमांड एक चल रहे
OmniRoute (स्थानीय या दूरस्थ) से **लाइव** मॉडल कैटलॉग पढ़ता है और **आपके**
मशीन पर उपकरण की अपनी कॉन्फ़िग फ़ाइल लिखता है। API कुंजी को एक पर्यावरण चर द्वारा संदर्भित किया जाता है जहाँ भी उपकरण
इसे समर्थन करता है। उपकरण-स्थानीय पर्यावरण फ़ाइल को बनाए रखने वाले कमांड नीचे नोट किए गए हैं।

एक सामान्य लॉन्चर भी है — `omniroute run <target>` — जो
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` या `gemini` को सही वातावरण के साथ इंजेक्ट करता है, बिना किसी कॉन्फ़िगरेशन को लिखे। लक्ष्यों और उनके
उपनामों को मानक मैनिफेस्ट `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`) से प्राप्त किया जाता है, और `omniroute completion` वही मैनिफेस्ट-व्युत्पन्न लक्ष्य शब्द प्रदान करता है। पुराने प्रति-उपकरण लॉन्चर —
`omniroute launch` (Claude Code) और `omniroute launch-codex` (Codex) — उपलब्ध रहते हैं।

प्रदाता ऑनबोर्डिंग उसी स्थानीय/दूरस्थ संदर्भ से उपलब्ध है। नीचे दिए गए
API-प्रथम कमांड प्रबंधन प्रमाणीकरण को प्रदाता
क्रेडेंशियल्स से अलग रखते हैं और कभी भी संरचित आउटपुट में क्रेडेंशियल नहीं प्रिंट करते हैं:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

स्क्रिप्ट के लिए, `--credential-stdin` या `--credential-env` को प्राथमिकता दें; `--credential`
नियंत्रित स्थानीय उपयोग के लिए बनाए रखा गया है। `providers remove` को एक
गैर-इंटरैक्टिव टर्मिनल पर `--yes` की आवश्यकता होती है, और सभी पांच कमांड सक्रिय संदर्भ या वैश्विक `--base-url`/`--api-key` विकल्पों का सम्मान करते हैं।

दो सबसे समृद्ध इंटीग्रेशनों की एक बार की, हाथ से लिखी गई बेस सेटअप के लिए, प्रति-उपकरण गहरे डाइव देखें:

- [Claude Code कॉन्फ़िगरेशन](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI कॉन्फ़िगरेशन](./CODEX-CLI-CONFIGURATION.md)
- [दूरस्थ मोड](./REMOTE-MODE.md) — अपने लैपटॉप से एक दूरस्थ OmniRoute (VPS / Tailnet) चलाएं
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot एक्सटेंशन; यह आपके लिए संपादक के अंदर से भी इन
  `setup-*` कमांड्स को चला सकता है

---

## मास्टर तालिका

हर कमांड **सक्रिय संदर्भ** का सम्मान करता है (जिसे `omniroute connect` के साथ सेट किया गया है, देखें
[दूरस्थ मोड](./REMOTE-MODE.md)) या स्पष्ट `--remote <url> --api-key <key>` फ्लैग। "स्थानीय बनाम दूरस्थ" का अर्थ है: बिना किसी फ्लैग के यह `http://localhost:20128` को लक्षित करता है;
`--remote` (या एक सक्रिय दूरस्थ संदर्भ) के साथ यह उस सर्वर से कैटलॉग लाता है और कॉन्फ़िगरेशन को स्थानीय रूप से लिखता है।

| कमांड                      | उपकरण                        | यह क्या लिखता                                                                                                                                                         | प्रमुख फ्लैग्स                                                                                                                             | स्थानीय बनाम दूरस्थ |
| -------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — एक संगत पाठ मॉडल के लिए एक प्रोफ़ाइल (`codex --profile <name>`)                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | दोनों               |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — एक मेल खाने वाले मॉडल के लिए एक प्रोफ़ाइल (`CLAUDE_CONFIG_DIR`)                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | दोनों               |
| `omniroute setup-opencode` | OpenCode (openai-compatible) | `~/.config/opencode/opencode.json` — `omniroute` प्रदाता के साथ हर कैटलॉग मॉडल (`opencode -m omniroute/<model>`)                                                      | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | दोनों               |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI मोड) + VS Code एक्सटेंशन सेटिंग्स प्रिंट करता है                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | दोनों               |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + यदि मौजूद हो तो VS Code `settings.json` में `kilocode.*` को मर्ज करता है                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | दोनों               |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — `provider: openai` मॉडल, कुंजी के माध्यम से `${{ secrets.OMNIROUTE_API_KEY }}`                                                            | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | दोनों               |
| `omniroute setup-cursor`   | Cursor                       | कुछ नहीं — ऐप में चरणों को प्रिंट करता है (Cursor कॉन्फ़िगरेशन अपारदर्शी SQLite है)                                                                                   | `--remote` `--api-key` `--only` `--port`                                                                                                   | दोनों               |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (आयात दस्तावेज़) + यदि एक VS Code `settings.json` मौजूद है तो `roo-cline.autoImportSettingsPath` सेट करता है                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | दोनों               |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — `openai-compat` प्रदाता, कुंजी के माध्यम से `$OMNIROUTE_API_KEY`                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | दोनों               |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + पर्यावरण नुस्खा प्रिंट करता है                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | दोनों               |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + पर्यावरण नुस्खा प्रिंट करता है                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | दोनों               |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4 `modelProviders.openai` ऐरे + `OMNIROUTE_API_KEY` `~/.qwen/.env` में                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | दोनों               |
| `omniroute run <target>`   | रनटाइम लॉन्च (सामान्य)       | कुछ नहीं — सही वातावरण और तर्कों के साथ `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` को स्पॉन करता है; Qwen और Gemini अस्थायी अलग घर का उपयोग करते हैं | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | दोनों               |
| `omniroute launch`         | Claude Code                  | कुछ नहीं — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` को इंजेक्ट करके `claude` को स्पॉन करता है                                                                      | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | दोनों               |
| `omniroute launch-codex`   | OpenAI Codex CLI             | कुछ नहीं — `-c` फ्लैग्स के माध्यम से `omniroute` प्रदाता को इंजेक्ट करके `codex` को स्पॉन करता है                                                                     | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | दोनों               |

फ्लैग्स पर नोट्स (कमांड स्रोत में सत्यापित):

- `--remote <url>` — एक दूरस्थ OmniRoute से कैटलॉग लाता है (यह `--port`
  और सक्रिय संदर्भ को ओवरराइड करता है)। `--api-key <key>` उस
  सर्वर के लिए क्रेडेंशियल प्रदान करता है (डिफ़ॉल्ट रूप से `OMNIROUTE_API_KEY` पर्यावरण चर, या सक्रिय संदर्भ के टोकन पर)।
- `--only <patterns>` — अल्पविराम से अलग उपस्ट्रिंग्स; केवल उन मॉडल आईडी को रखें जो मेल खाते हैं
  (जैसे `--only glm,kimi`)। `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush` पर उपलब्ध है।
- `--dry-run` — फ़ाइल सिस्टम को छुए बिना ठीक वही प्रिंट करें जो लिखा जाएगा। हर `setup-*` कमांड पर उपलब्ध है **सिवाय** `setup-cursor`
  (जो कभी भी फ़ाइल नहीं लिखता)।
- `--model <id>` — आवश्यक (या इंटरैक्टिव रूप से चुना गया) उन उपकरणों के लिए जिनमें कोई
  मॉडल ऑटो-डिस्कवरी नहीं है: Cline, Kilo, Roo, Goose, Qwen, Aider। उन उपकरणों को
  गैर-इंटरैक्टिव रन के लिए `--yes` भी स्वीकार करते हैं (जिसके लिए फिर `--model` की आवश्यकता होती है)।
  `setup-opencode` डिफ़ॉल्ट शीर्ष-स्तरीय मॉडल सेट करने के लिए `--model` लेता है।
- `--model <id>` पर `omniroute run` मैनिफेस्ट के प्रति-लक्ष्य वायरिंग का पालन करता है
  (`bin/cli/cli-manifest.mjs`): **aider** को `--model openai/<id>` प्राप्त होता है और
  **opencode** को `--model omniroute/<id>` (प्रिफिक्स केवल तब जोड़ा जाता है जब आईडी
  पहले से ही इसे नहीं ले जाती); **qwen** और **gemini** को आईडी वर्बटिम प्राप्त होता है;
  **claude** को `ANTHROPIC_MODEL` के माध्यम से मिलता है, **goose** को `GOOSE_MODEL` के माध्यम से, और
  **codex** को `-c model_providers.omniroute.*` तर्कों के माध्यम से। **Qwen एकमात्र रन
  लक्ष्य है जिसे `--model` की सख्त आवश्यकता है** — `omniroute run qwen` इसके बिना `2` के साथ
  स्पष्ट त्रुटि के साथ समाप्त होता है।
- `--port <port>` — स्थानीय OmniRoute पोर्ट (डिफ़ॉल्ट `20128`, जब `--remote`
  सेट होता है तो अनदेखा किया जाता है)। सभी `setup-*` और दोनों लॉन्चरों पर मौजूद है।
- `omniroute run` निकासी कोड: बच्चे CLI का अपना निकासी कोड वर्बटिम प्रकट होता है;
  `2` = अमान्य तर्क (असमर्थित लक्ष्य, आवश्यक `--model` गायब, कंटेनर गार्ड); `127` = लक्ष्य बाइनरी `PATH` में नहीं है;
  `130`/`143`/`129` जब लॉन्च को `SIGINT`/`SIGTERM`/`SIGHUP` द्वारा समाप्त किया जाता है;
  `1` = अन्य रनटाइम लॉन्च विफलता।
- दोनों लॉन्चर (`launch`, `launch-codex`) `--profile <name>` को स्वीकार करते हैं ताकि
  `setup-claude` / `setup-codex` द्वारा लिखी गई प्रोफ़ाइल का चयन किया जा सके, साथ ही
  अंतर्निहित `claude` / `codex` बाइनरी के लिए पास-थ्रू तर्क।

इंटरएक्टिव पिकर सेटअप व्यंजनों द्वारा भी साझा किया गया है:

```bash
# सक्रिय स्थानीय या दूरस्थ मॉडल कैटलॉग से चुनें और लक्ष्य को कॉन्फ़िगर करें।
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` वर्तमान में `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, और `kilo` के लिए परीक्षण किए गए व्यंजनों को सौंपता है। IDE-केवल,
MITM, और गाइड-केवल कैटलॉग प्रविष्टियाँ स्पष्ट `setup-*`/मैनुअल प्रवाह के रूप में बनी रहती हैं और लॉन्च करने योग्य लक्ष्यों के रूप में प्रस्तुत नहीं की जाती हैं।

> `setup-opencode` **हल्का openai-संगत** OpenCode इंटीग्रेशन है।
> एक समृद्ध प्लगइन इंटीग्रेशन भी है — `omniroute setup opencode` — जो
> `@omniroute/opencode-plugin` स्थापित करता है। ये अलग-अलग कमांड हैं; ऊपर की तालिका
> `setup-opencode` का दस्तावेजीकरण करती है।

---

## स्थानीय उपयोग

जब OmniRoute `localhost:20128` पर चल रहा हो, तो बस अपने टूल के लिए सेटअप कमांड चलाएँ। कैटलॉग स्थानीय सर्वर से लाया जाता है।

```bash
# Codex: मेल खाने वाले मॉडल के लिए ~/.codex/ में एक प्रोफ़ाइल लिखें
omniroute setup-codex
codex --profile glm52            # एक उत्पन्न प्रोफ़ाइल का उपयोग करें

# Claude Code: प्रति-मॉडल प्रोफ़ाइल लिखें, फिर एक लॉन्च करें
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: सभी कैटलॉग मॉडलों के साथ openai-संगत प्रदाता लिखें
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} के माध्यम से संदर्भित, कभी भी डिस्क पर नहीं
opencode -m omniroute/glm/glm-5.2 "..."

# ऑटो-डिस्कवरी के बिना टूल को एक स्पष्ट मॉडल की आवश्यकता होती है:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# कुछ भी लिखे बिना पूर्वावलोकन करें:
omniroute setup-continue --dry-run
```

बिल्कुल भी कॉन्फ़िगरेशन लिखे बिना लॉन्च करें (केवल env-injection):

```bash
omniroute launch                 # Claude Code → स्थानीय OmniRoute
omniroute launch-codex           # Codex CLI → स्थानीय OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# स्पष्ट कमांड पथ: जो भी -- के बाद आता है उसे पास करें
omniroute run claude -- --print-system-prompt "इस अंतर की समीक्षा करें"
```

---

## दूरस्थ उपयोग

किसी भी सेटअप कमांड को `--remote` + `--api-key` के साथ एक दूरस्थ OmniRoute पर इंगित करें। कैटलॉग दूरस्थ से लाया जाता है; कॉन्फ़िगरेशन आपके स्थानीय मशीन पर लिखा जाता है।

```bash
# एक दूरस्थ VPS के खिलाफ OpenCode, केवल glm/kimi मॉडल रखें
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # पहले OMNIROUTE_API_KEY निर्यात करें

# एक दूरस्थ कैटलॉग से Codex प्रोफ़ाइल
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# सीधे दूरस्थ के खिलाफ एक CLI लॉन्च करें
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

हर बार `--remote`/`--api-key` पास करने के बजाय, एक बार लॉगिन करें और **सक्रिय संदर्भ** उन्हें स्वचालित रूप से प्रदान करने दें:

```bash
omniroute connect 192.168.0.15        # एक स्कोप्ड टोकन बनाता है, संदर्भ को संग्रहीत करता है
omniroute setup-codex                 # ← अब दूरस्थ कैटलॉग का उपयोग करता है
omniroute setup-opencode              # ← वही
omniroute launch                      # ← Claude Code दूरस्थ के खिलाफ
```

संदर्भ, स्कोप और टोकन प्रबंधन के लिए [दूरस्थ मोड](./REMOTE-MODE.md) देखें।

---

## बेस URL परंपराएँ (जो टूल `/v1` चाहते हैं)

OmniRoute OpenAI सतह को `/v1` पर, एंथ्रोपिक सतह को रूट पर, और एक मूल जेमिनी सतह को `/v1beta` पर उजागर करता है। प्रत्येक एकीकरण उस रूप में वायर्ड है जिसकी इसकी टूल अपेक्षा करती है (कमांड स्रोत में सत्यापित):

| एकीकरण                                                                     | बेस URL लिखा गया | `/v1`?                                          |
| -------------------------------------------------------------------------- | ---------------- | ----------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | रूट              | नहीं — Cline `/v1/chat/completions` जोड़ता है   |
| `setup-goose` (`OPENAI_HOST`)                                              | रूट              | नहीं — Goose पथ जोड़ता है                       |
| `setup-aider` (`OPENAI_API_BASE`)                                          | रूट              | नहीं — LiteLLM `/v1/chat/completions` जोड़ता है |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` के साथ     | हाँ                                             |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | रूट              | नहीं — Claude Code `/v1/messages` जोड़ता है     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` के साथ     | हाँ                                             |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` के साथ     | हाँ                                             |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | रूट              | नहीं — SDK `/v1beta/models/…` जोड़ता है         |

---

## अपडेट पर स्थानीय निर्भरताएँ बनाए रखना: `--include=optional`

जब आप `omniroute update` के साथ अपडेट करते हैं (पुष्टि करने के बाद, या `--apply` के साथ),
OmniRoute `--include=optional` के साथ इंस्टॉल चलाता है:

```bash
npm install -g omniroute@latest --include=optional
```

यह **नहीं** है एक ध्वज जिसे आप `omniroute update` को पास करते हैं — यह हमेशा
अपडेटर द्वारा लागू किया जाता है। यह सुनिश्चित करता है कि `optionalDependencies`
(`better-sqlite3`, `keytar`, `tls-client`, LLMLingua SLM स्टैक) अपडेट के दौरान जीवित
रहें, भले ही आपकी npm कॉन्फ़िगरेशन में `omit=optional` सेट हो, जो अन्यथा
स्थानीय SQLite ड्राइवर और OS-keyring बाइंडिंग को चुपचाप हटा देगा। बिना लागू किए
सटीक कमांड का पूर्वावलोकन करने के लिए:

```bash
omniroute update --dry-run
# [DRY RUN] चलाएगा: npm install -g omniroute@latest --include=optional
```

अन्य `omniroute update` ध्वज (स्रोत में सत्यापित): `--check` (यदि पुराना है तो
एक्ज़िट 1), `--apply` (बिना संकेत के इंस्टॉल करें), `--changelog`, `--no-backup`,
`--yes`।

---

## Google Gemini CLI के माध्यम से `omniroute run gemini`

`@google/gemini-cli` 0.50.0 के खिलाफ अनुबंध सत्यापित: CLI
`GOOGLE_GEMINI_BASE_URL` का सम्मान करता है और `POST /v1beta/models/<model>:generateContent`
(और `:streamGenerateContent?alt=sse`) इसके खिलाफ जारी करता है — बिल्कुल OmniRoute का
स्थानीय Gemini सतह (`/v1beta`)। `omniroute run gemini` इसे स्वचालित रूप से कनेक्ट करता है:

- `GOOGLE_GEMINI_BASE_URL` → सक्रिय OmniRoute बेस URL (रूट, कोई `/v1` नहीं);
- `GEMINI_API_KEY` → हल किया गया OmniRoute क्रेडेंशियल (विकल्प/पर्यावरण/संदर्भ);
- एक **अस्थायी अलग `GEMINI_CLI_HOME`** जिसका `.gemini/settings.json`
  `gemini-api-key` प्रमाणीकरण का चयन करता है, ताकि एक संग्रहीत Google OAuth सत्र
  (कोड सहायता) कभी भी OmniRoute-निर्देशित लॉन्च को ओवरराइड न करे — निकासी के बाद हटा दिया जाता है;
- **पर्यावरण स्वच्छता**: बच्चे का पर्यावरण `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` और `GOOGLE_GENAI_USE_GCA` से साफ किया गया है (जो
  प्रमाणीकरण को Vertex/Code Assist पर पुनर्निर्देशित करेगा), और `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` को
  बेल्ट-और-सस्पेंडर्स बैकअप के रूप में सेट किया गया है — अन्य `run` लक्ष्य अपने
  स्वयं के संघर्षशील चर के लिए समान उपचार प्राप्त करते हैं;
- `--model <id>` का इंजेक्शन `--provider`/`--model` से।

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini का कार्यक्षेत्र-विश्वास गार्ड अभी भी हेडलेस मोड में लागू होता है —
`--skip-trust` पास करें (या इंटरैक्टिव रूप से निर्देशिका पर विश्वास करें); लॉन्चर
जानबूझकर इसे बायपास नहीं करता है। यह लॉन्चर **ACP पंजीकरण** (`src/lib/acp/registry.ts`, `gemini --acp`) से भिन्न है,
जो `/dashboard/acp-agents` के लिए एजेंट-प्रोटोकॉल एकीकरण बना रहता है।

---

## वास्तविक धुआँ स्वेप (ऑप्ट-इन)

निर्धारणीय लॉन्च-प्लान रिग्रेशन CI में चलता है (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`)। एक वास्तविक OmniRoute सर्वर के खिलाफ वास्तविक
बाइनरी को मान्य करने के लिए, एक ऑप्ट-इन हार्नेस है
`tests/integration/upstream-cli-smoke.int.test.ts` पर। यह स्वचालित रूप से कभी नहीं चलता
(हर उप-परीक्षण छोड़ दिया जाता है जब तक `RUN_CLI_SMOKE=1` न हो), क्रेडेंशियल को
पर्यावरण-चर नाम द्वारा पास करता है (कभी भी मान द्वारा नहीं), किसी भी रिकॉर्ड किए गए
आउटपुट से कुंजी-आकार की स्ट्रिंग को छुपाता है, उन लक्ष्यों को छोड़ देता है जिनका
बाइनरी स्थापित नहीं है, और विफलताओं को प्रमाणीकरण / अपस्ट्रीम / कॉन्फ़िगरेशन के रूप में वर्गीकृत करता है
न कि एक साधारण बूलियन के रूप में:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

वैकल्पिक: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` स्वेप को सीमित करता है;
`OMNIROUTE_SMOKE_TIMEOUT_MS` 120 सेकंड प्रति-लक्ष्य टाइमआउट को ओवरराइड करता है।

---

## अन्य देखें

- [Claude Code कॉन्फ़िगरेशन](./CLAUDE-CODE-CONFIGURATION.md) — गहरे Claude Code गाइड
- [Codex CLI कॉन्फ़िगरेशन](./CODEX-CLI-CONFIGURATION.md) — एक बार का `[model_providers.omniroute]` बेस सेटअप
- [Remote Mode](./REMOTE-MODE.md) — संदर्भ, स्कोप्ड एक्सेस टोकन, एक दूरस्थ सर्वर को चलाना
- [CLI Tools संदर्भ](../reference/CLI-TOOLS.md) — समर्थित उपकरणों + डैशबोर्ड पृष्ठों की पूरी सूची
- [सेटअप गाइड](./SETUP_GUIDE.md) — इंस्टॉलेशन विधियाँ और पहले रन का ऑनबोर्डिंग
