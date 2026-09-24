# CLI Integrations (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute `setup-*` कमांड्स का एक समूह प्रदान करता है, जो किसी कोडिंग
CLI (Codex, Claude Code, OpenCode, Cline, …) को OmniRoute को उसके बैकएंड के रूप में उपयोग करने के लिए कॉन्फ़िगर करता है — ताकि
टूल **एक** एंडपॉइंट से संचार करे और OmniRoute स्वतः फ़ॉलबैक के साथ सही प्रदाता तक
रूट करे। प्रत्येक कमांड चल रहे OmniRoute (स्थानीय या रिमोट) से **लाइव** मॉडल कैटलॉग पढ़ता है
और **आपकी** मशीन पर टूल की अपनी कॉन्फ़िगरेशन फ़ाइल लिखता है।
जहाँ भी टूल इसका समर्थन करता है, API कुंजी को एक एनवायरनमेंट वेरिएबल के माध्यम से संदर्भित किया जाता है।
जो कमांड टूल-स्थानीय एनवायरनमेंट फ़ाइल स्थायी रूप से सहेजते हैं, उनका उल्लेख नीचे किया गया है।

एक सामान्य लॉन्चर भी उपलब्ध है — `omniroute run <target>` — जो सही
एनवायरनमेंट इंजेक्ट करके `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` या `gemini`
को शुरू करता है और कोई कॉन्फ़िगरेशन लिखता ही नहीं है। टार्गेट और उनके
उपनाम कैनोनिकल मैनिफ़ेस्ट `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`) से आते हैं, और `omniroute completion` वही
मैनिफ़ेस्ट-व्युत्पन्न टार्गेट शब्द प्रदान करता है। पुराने प्रति-टूल लॉन्चर —
`omniroute launch` (Claude Code) और `omniroute launch-codex` (Codex) — अब भी
उपलब्ध हैं।

प्रदाता ऑनबोर्डिंग उसी स्थानीय/रिमोट संदर्भ से उपलब्ध है। नीचे दिए गए
API-प्रथम कमांड प्रबंधन प्रमाणीकरण को प्रदाता
क्रेडेंशियल्स से अलग रखते हैं और संरचित आउटपुट में कभी भी कोई क्रेडेंशियल प्रिंट नहीं करते:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

स्क्रिप्ट्स के लिए, `--credential-stdin` या `--credential-env` को प्राथमिकता दें; नियंत्रित स्थानीय उपयोग के लिए `--credential`
को बनाए रखा गया है। गैर-इंटरैक्टिव टर्मिनल पर `providers remove` के लिए `--yes`
आवश्यक है, और सभी पाँच कमांड सक्रिय संदर्भ या वैश्विक
`--base-url`/`--api-key` विकल्पों का पालन करते हैं।

दो सबसे समृद्ध इंटीग्रेशनों के एकबारगी, हाथ से लिखे गए मूल सेटअप के लिए,
प्रति-टूल विस्तृत विवरण देखें:

- [Claude Code कॉन्फ़िगरेशन](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI कॉन्फ़िगरेशन](./CODEX-CLI-CONFIGURATION.md)
- [रिमोट मोड](./REMOTE-MODE.md) — अपने लैपटॉप से किसी रिमोट OmniRoute (VPS / Tailnet) को संचालित करें
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot एक्सटेंशन; यह एडिटर के भीतर से आपके लिए ये
  `setup-*` कमांड भी चला सकता है

---

## मुख्य तालिका

प्रत्येक कमांड **सक्रिय संदर्भ** (`omniroute connect` से सेट किया गया, देखें
[रिमोट मोड](./REMOTE-MODE.md)) या स्पष्ट `--remote <url> --api-key <key>` फ़्लैग्स का पालन करता है।
नीचे "स्थानीय बनाम रिमोट" का अर्थ है: बिना फ़्लैग्स के यह `http://localhost:20128` को लक्षित करता है;
`--remote` (या किसी सक्रिय रिमोट संदर्भ) के साथ यह उस
सर्वर से कैटलॉग प्राप्त करता है और कॉन्फ़िगरेशन को स्थानीय रूप से लिखता है।

| कमांड                      | टूल                    | यह क्या लिखता है                                                                                                                                                              | प्रमुख फ़्लैग                                                                                                                              | स्थानीय बनाम रिमोट |
| -------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `omniroute setup-codex`    | OpenAI Codex CLI       | `~/.codex/<name>.config.toml` — प्रत्येक संगत टेक्स्ट मॉडल के लिए एक प्रोफ़ाइल (`codex --profile <name>`)                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | दोनों              |
| `omniroute setup-claude`   | Claude Code            | `~/.claude/profiles/<name>/settings.json` — प्रत्येक मेल खाने वाले मॉडल के लिए एक प्रोफ़ाइल (`CLAUDE_CONFIG_DIR`)                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | दोनों              |
| `omniroute setup-opencode` | OpenCode (openai-संगत) | `~/.config/opencode/opencode.json` — प्रत्येक कैटलॉग मॉडल वाला `omniroute` प्रदाता (`opencode -m omniroute/<model>`)                                                          | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | दोनों              |
| `omniroute setup-cline`    | Cline                  | `~/.cline/data/{globalState,secrets}.json` (CLI मोड) + VS Code एक्सटेंशन सेटिंग्स प्रिंट करता है                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | दोनों              |
| `omniroute setup-kilo`     | Kilo Code              | `~/.local/share/kilo/auth.json` (CLI) + यदि VS Code `settings.json` मौजूद हो, तो उसमें `kilocode.*` मर्ज करता है                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | दोनों              |
| `omniroute setup-continue` | Continue / `cn` CLI    | `~/.continue/config.yaml` — `provider: openai` मॉडल, `${{ secrets.OMNIROUTE_API_KEY }}` के माध्यम से कुंजी                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | दोनों              |
| `omniroute setup-cursor`   | Cursor                 | कुछ नहीं — ऐप के भीतर के चरण प्रिंट करता है (Cursor कॉन्फ़िगरेशन अपारदर्शी SQLite है)                                                                                         | `--remote` `--api-key` `--only` `--port`                                                                                                   | दोनों              |
| `omniroute setup-roo`      | Roo Code               | `~/.omniroute/roo-settings.json` (इम्पोर्ट दस्तावेज़) + यदि VS Code `settings.json` मौजूद हो, तो `roo-cline.autoImportSettingsPath` सेट करता है                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | दोनों              |
| `omniroute setup-crush`    | Crush                  | `~/.config/crush/crush.json` — `openai-compat` प्रदाता, `$OMNIROUTE_API_KEY` के माध्यम से कुंजी                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | दोनों              |
| `omniroute setup-goose`    | Goose                  | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + एनवायरनमेंट विधि प्रिंट करता है                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | दोनों              |
| `omniroute setup-aider`    | Aider                  | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + एनवायरनमेंट विधि प्रिंट करता है                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | दोनों              |
| `omniroute setup-qwen`     | Qwen Code              | `~/.qwen/settings.json` — V4 `modelProviders.openai` ऐरे + `~/.qwen/.env` में `OMNIROUTE_API_KEY`                                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | दोनों              |
| `omniroute setup-5dive`    | 5dive (एजेंट फ़्लीट)   | `$HOME` के अंतर्गत कुछ नहीं — `5dive agent auth set` के माध्यम से 5dive **ऑथ प्रोफ़ाइल** (`/var/lib/5dive/auth-profiles/<name>/`) लिखता है; केवल रूट, फ़्लीट होस्ट पर चलता है | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | दोनों              |
| `omniroute run <target>`   | रनटाइम लॉन्च (सामान्य) | कुछ नहीं — सही एनवायरनमेंट और आर्ग्युमेंट के साथ `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` शुरू करता है; Qwen और Gemini अस्थायी पृथक होम का उपयोग करते हैं  | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | दोनों              |
| `omniroute launch`         | Claude Code            | कुछ नहीं — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` इंजेक्ट करके `claude` शुरू करता है                                                                                     | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | दोनों              |
| `omniroute launch-codex`   | OpenAI Codex CLI       | कुछ नहीं — `-c` फ़्लैग के माध्यम से `omniroute` प्रदाता इंजेक्ट करके `codex` शुरू करता है                                                                                     | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | दोनों              |

फ़्लैग पर टिप्पणियाँ (कमांड स्रोत में सत्यापित):

- `--remote <url>` — कैटलॉग को किसी रिमोट OmniRoute से फ़ेच करता है (`--port`
  और सक्रिय कॉन्टेक्स्ट को ओवरराइड करता है)। `--api-key <key>` उस
  सर्वर के लिए क्रेडेंशियल प्रदान करता है (डिफ़ॉल्ट रूप से `OMNIROUTE_API_KEY` env var या सक्रिय कॉन्टेक्स्ट का टोकन)।
- `--only <patterns>` — कॉमा से अलग की गई सबस्ट्रिंग; केवल मेल खाने वाली मॉडल ID
  रखें (जैसे `--only glm,kimi`)। `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush` पर उपलब्ध।
- `--dry-run` — फ़ाइलसिस्टम को छुए बिना ठीक वही प्रिंट करता है जो लिखा जाता।
  `setup-cursor` को छोड़कर प्रत्येक `setup-*` कमांड पर उपलब्ध
  (यह कभी कोई फ़ाइल नहीं लिखता)।
- `--model <id>` — उन टूल के लिए आवश्यक (या इंटरैक्टिव रूप से चुना जाता है) जिनमें
  मॉडल ऑटो-डिस्कवरी नहीं है: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive। ये टूल
  नॉन-इंटरैक्टिव रन के लिए `--yes` भी स्वीकार करते हैं (जिसके लिए फिर `--model` आवश्यक होता है)।
  `setup-opencode` डिफ़ॉल्ट टॉप-लेवल मॉडल सेट करने के लिए `--model` लेता है।
- `omniroute run` पर `--model <id>` मेनिफ़ेस्ट की प्रति-टारगेट वायरिंग का पालन करता है
  (`bin/cli/cli-manifest.mjs`): **aider** को `--model openai/<id>` और
  **opencode** को `--model omniroute/<id>` मिलता है (प्रीफ़िक्स केवल तभी जोड़ा जाता है जब ID
  में वह पहले से मौजूद न हो); **qwen** और **gemini** को ID ज्यों की त्यों मिलती है;
  **claude** को यह `ANTHROPIC_MODEL` के ज़रिए, **goose** को `GOOSE_MODEL` के ज़रिए, और
  **codex** को `-c model_providers.omniroute.*` आर्ग्युमेंट के ज़रिए मिलता है। **Qwen एकमात्र रन
  टारगेट है जिसके लिए `--model` अनिवार्य है** — इसके बिना `omniroute run qwen`
  एक स्पष्ट त्रुटि के साथ `2` पर एग्ज़िट होता है।
- `--port <port>` — स्थानीय OmniRoute पोर्ट (डिफ़ॉल्ट `20128`, `--remote`
  सेट होने पर अनदेखा किया जाता है)। सभी `setup-*` और दोनों लॉन्चर पर मौजूद।
- `omniroute run` एग्ज़िट कोड: चाइल्ड CLI का अपना एग्ज़िट कोड
  ज्यों का त्यों आगे भेजा जाता है; `2` = अमान्य आर्ग्युमेंट (असमर्थित टारगेट, आवश्यक
  `--model` अनुपस्थित, कंटेनर गार्ड); `127` = टारगेट बाइनरी `PATH` में नहीं है;
  `130`/`143`/`129` जब लॉन्च `SIGINT`/`SIGTERM`/`SIGHUP` से समाप्त होता है;
  `1` = अन्य रनटाइम लॉन्च विफलता।
- दोनों लॉन्चर (`launch`, `launch-codex`) `setup-claude` / `setup-codex` द्वारा लिखी गई
  प्रोफ़ाइल चुनने के लिए `--profile <name>` स्वीकार करते हैं, साथ ही अंतर्निहित
  `claude` / `codex` बाइनरी के लिए पास-थ्रू आर्ग्युमेंट भी स्वीकार करते हैं।

इंटरैक्टिव पिकर भी सेटअप रेसिपी द्वारा साझा किया जाता है:

```bash
# सक्रिय स्थानीय या रिमोट मॉडल कैटलॉग से चुनें और टारगेट को कॉन्फ़िगर करें।
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` वर्तमान में `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo`, और `5dive` के लिए परीक्षण की गई रेसिपी को डेलिगेट करता है।
केवल-IDE,
MITM, और केवल-गाइड कैटलॉग प्रविष्टियाँ स्पष्ट `setup-*`/मैन्युअल फ़्लो बनी रहती हैं और
लॉन्च किए जा सकने वाले टारगेट के रूप में प्रस्तुत नहीं की जातीं।

> `setup-opencode`, **हल्का openai-संगत** OpenCode इंटीग्रेशन है।
> एक अधिक समृद्ध प्लगइन इंटीग्रेशन भी है — `omniroute setup opencode` — जो
> `@omniroute/opencode-plugin` इंस्टॉल करता है। ये अलग-अलग कमांड हैं; ऊपर दी गई तालिका
> `setup-opencode` का दस्तावेज़ीकरण करती है।
>
> प्लगइन दो पैकेज में आता है, प्रत्येक OpenCode मेजर के लिए एक, क्योंकि दोनों
> लोडर अलग-अलग एंट्रीपॉइंट की अपेक्षा करते हैं:
> OpenCode v1 के लिए `@omniroute/opencode-plugin` और
> OpenCode v2 के लिए `@omniroute/opencode-plugin-v2`। v2 पैकेज नया है
> (`0.1.0`) और ऐसे होस्ट कॉन्ट्रैक्ट का पालन करता है जो अभी भी बदल रहा है, इसलिए यह
> किसी एक स्वरूप को मान लेने के बजाय उस स्वरूप को पढ़ता है जिसे OpenCode कैटलॉग ड्राफ़्ट में सीड करता है। इसे
> `opencode.json` में `plugins` प्रविष्टि जोड़कर इंस्टॉल करें; `omniroute setup opencode`
> अब भी v1 पैकेज इंस्टॉल करता है। विकल्प और क्रेडेंशियल लुकअप क्रम
> पैकेज README में दिए गए हैं।

---

## स्थानीय उपयोग

`localhost:20128` पर OmniRoute के चलने के दौरान, बस अपने टूल के लिए सेटअप कमांड चलाएँ। कैटलॉग स्थानीय सर्वर से प्राप्त किया जाता है।

```bash
# Codex: प्रत्येक मेल खाने वाले मॉडल के लिए ~/.codex/ में एक प्रोफ़ाइल लिखें
omniroute setup-codex
codex --profile glm52            # जनरेट की गई प्रोफ़ाइल का उपयोग करें

# Claude Code: प्रत्येक मॉडल के लिए प्रोफ़ाइल लिखें, फिर किसी एक को लॉन्च करें
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: सभी कैटलॉग मॉडलों के साथ openai-संगत प्रोवाइडर लिखें
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} के माध्यम से संदर्भित, डिस्क पर कभी नहीं
opencode -m omniroute/glm/glm-5.2 "..."

# स्वतः खोज की सुविधा के बिना टूल्स के लिए स्पष्ट मॉडल आवश्यक है:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# कुछ भी लिखे बिना पूर्वावलोकन करें:
omniroute setup-continue --dry-run
```

कोई भी कॉन्फ़िगरेशन लिखे बिना लॉन्च करें (केवल एनवायरनमेंट इंजेक्शन):

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

# स्पष्ट कमांड पथ: -- के बाद आने वाली हर चीज़ को ज्यों का त्यों पास करें
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## रिमोट उपयोग

किसी भी सेटअप कमांड को `--remote` + `--api-key` के साथ किसी रिमोट OmniRoute की ओर निर्देशित करें। कैटलॉग रिमोट से प्राप्त किया जाता है; कॉन्फ़िगरेशन आपकी स्थानीय मशीन पर लिखा जाता है।

```bash
# रिमोट VPS के साथ OpenCode, केवल glm/kimi मॉडल रखें
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # पहले OMNIROUTE_API_KEY एक्सपोर्ट करें

# रिमोट कैटलॉग से Codex प्रोफ़ाइल
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# CLI को सीधे रिमोट के साथ लॉन्च करें
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

हर बार `--remote`/`--api-key` पास करने के बजाय, एक बार लॉग इन करें और **सक्रिय कॉन्टेक्स्ट** को उन्हें स्वचालित रूप से प्रदान करने दें:

```bash
omniroute connect 192.168.0.15        # सीमित-स्कोप वाला टोकन बनाता है, कॉन्टेक्स्ट संग्रहीत करता है
omniroute setup-codex                 # ← अब रिमोट कैटलॉग का उपयोग करता है
omniroute setup-opencode              # ← वही
omniroute launch                      # ← रिमोट के साथ Claude Code
```

कॉन्टेक्स्ट, स्कोप और टोकन प्रबंधन के लिए [रिमोट मोड](./REMOTE-MODE.md) देखें।

---

## 5dive एजेंट फ़्लीट

[5dive](https://5dive.ai) लंबे समय तक चलने वाले कोडिंग एजेंटों की एक फ़्लीट चलाता है, जिसमें प्रत्येक एजेंट अपने स्वयं के Unix उपयोगकर्ता के अंतर्गत एक systemd यूनिट होता है। यह स्वयं कोई कोडिंग CLI नहीं है, इसलिए `omniroute run` द्वारा लॉन्च करने के लिए कुछ नहीं है — `5dive` एक **केवल-कॉन्फ़िगरेशन** लक्ष्य है।

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

दोनों रूप एक 5dive **प्रमाणीकरण प्रोफ़ाइल** लिखते हैं, और उस प्रोफ़ाइल से संबद्ध प्रत्येक `claude` सीट इसके बाद OmniRoute से संचार करती है। इस लक्ष्य से संबंधित तीन बातें विशिष्ट हैं:

- **यह फ़्लीट होस्ट पर root के रूप में चलता है।** 5dive के वर्ब स्थानीय systemd यूनिटों और root के स्वामित्व वाली स्टेट डायरेक्टरी पर काम करते हैं; इसमें कोई रिमोट मोड नहीं है। यदि यह पहले से root के रूप में नहीं चल रहा हो, तो रेसिपी `sudo` के माध्यम से स्वयं को फिर से निष्पादित करती है (`--no-sudo` इसे बंद कर देता है और इसके बजाय कमांड प्रिंट करता है)।
- **एंडपॉइंट का `https://` होना आवश्यक है, जब तक कि वह loopback न हो।** एजेंट की API कुंजी प्रत्येक अनुरोध में उस URL के साथ भेजी जाती है, और 5dive मशीन से बाहर के किसी plaintext एंडपॉइंट को अस्वीकार करता है। निजी LAN पता भी इसका अपवाद नहीं है।
- **प्रत्येक सीट की अपनी मॉडल पिनिंग प्रोफ़ाइल से अधिक प्राथमिकता रखती है।** प्रोफ़ाइल में `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL` होता है, लेकिन किसी स्टॉक मॉडल id पर अभी भी पिन की गई सीट अपनी पहली बारी में _"चुने गए मॉडल में कोई समस्या है"_ त्रुटि के साथ विफल हो जाती है। सीटों को भी पिन करने के लिए `--agent <name>` (दोहराने योग्य) पास करें; ऐसा न करने पर रेसिपी कमांड प्रिंट करती है।

API कुंजी **stdin** (`--api-key=-`) पर 5dive को दी जाती है, इसलिए यह `ps` आउटपुट में कभी दिखाई नहीं देती।

प्रोफ़ाइल को किसी एक मॉडल के बजाय OmniRoute **कॉम्बो** की ओर निर्देशित करने से ही फ़्लीट को प्रोवाइडर फ़ेलओवर मिलता है: [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) पर दर्ज रन में, जब प्राथमिक एंडपॉइंट बारी के बीच में पूरी तरह बंद हो गया, तो एजेंट ने फ़ॉलबैक पर अपने शेष चरण पूरे किए और आउटेज को कभी सतह पर नहीं आने दिया।

---

## बेस URL परंपराएँ (किन टूल्स को `/v1` चाहिए)

OmniRoute, OpenAI इंटरफ़ेस को `/v1` पर, Anthropic इंटरफ़ेस को रूट पर,
और नेटिव Gemini इंटरफ़ेस को `/v1beta` पर उपलब्ध कराता है। प्रत्येक इंटीग्रेशन को उस प्रारूप से जोड़ा गया है जिसकी
उसका टूल अपेक्षा करता है (कमांड स्रोत में सत्यापित):

| इंटीग्रेशन                                                                 | लिखा गया बेस URL | `/v1`?                                          |
| -------------------------------------------------------------------------- | ---------------- | ----------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | रूट              | नहीं — Cline `/v1/chat/completions` जोड़ता है   |
| `setup-goose` (`OPENAI_HOST`)                                              | रूट              | नहीं — Goose पाथ जोड़ता है                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | रूट              | नहीं — LiteLLM `/v1/chat/completions` जोड़ता है |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` सहित       | हाँ                                             |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | रूट              | नहीं — Claude Code `/v1/messages` जोड़ता है     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` सहित       | हाँ                                             |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` सहित       | हाँ                                             |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | रूट              | नहीं — SDK `/v1beta/models/…` जोड़ता है         |
| `setup-5dive` (प्रमाणीकरण प्रोफ़ाइल में `ANTHROPIC_BASE_URL`)              | रूट              | नहीं — Claude Code `/v1/messages` जोड़ता है     |

---

## अपडेट के दौरान नेटिव डिपेंडेंसी बनाए रखना: `--include=optional`

जब आप `omniroute update` से अपडेट करते हैं (पुष्टि करने के बाद, या `--apply` के साथ),
तो OmniRoute इंस्टॉल कमांड को पहले से शामिल `--include=optional` के साथ चलाता है:

```bash
npm install -g omniroute@latest --include=optional
```

यह कोई ऐसा फ़्लैग **नहीं** है जिसे आप `omniroute update` को पास करते हैं — अपडेटर इसे हमेशा
लागू करता है। यह सुनिश्चित करता है कि `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM स्टैक) अपडेट के बाद भी बने रहें, भले ही आपके npm कॉन्फ़िगरेशन में
`omit=optional` सेट हो, जो अन्यथा नेटिव SQLite ड्राइवर और OS-कीरिंग बाइंडिंग को
बिना सूचना दिए हटा देता। लागू किए बिना सटीक कमांड का पूर्वावलोकन करने के लिए:

```bash
omniroute update --dry-run
# [ड्राई रन] यह चलाया जाएगा: npm install -g omniroute@latest --include=optional
```

अन्य `omniroute update` फ़्लैग (स्रोत में सत्यापित): `--check` (पुराना संस्करण होने पर
1 के साथ बाहर निकलें), `--apply` (बिना पूछे इंस्टॉल करें), `--changelog`, `--no-backup`,
`--yes`।

---

## `omniroute run gemini` के माध्यम से Google Gemini CLI

`@google/gemini-cli` 0.50.0 के विरुद्ध अनुबंध सत्यापित: CLI
`GOOGLE_GEMINI_BASE_URL` का पालन करता है और उसके विरुद्ध `POST /v1beta/models/<model>:generateContent`
(और `:streamGenerateContent?alt=sse`) अनुरोध भेजता है — बिल्कुल OmniRoute के नेटिव
Gemini इंटरफ़ेस (`/v1beta`) की तरह। `omniroute run gemini` इसे स्वचालित रूप से जोड़ता है:

- `GOOGLE_GEMINI_BASE_URL` → सक्रिय OmniRoute बेस URL (रूट, `/v1` के बिना);
- `GEMINI_API_KEY` → निर्धारित OmniRoute क्रेडेंशियल (विकल्प/env/कॉन्टेक्स्ट);
- एक **अस्थायी पृथक `GEMINI_CLI_HOME`**, जिसकी `.gemini/settings.json`
  `gemini-api-key` प्रमाणीकरण चुनती है, ताकि संग्रहीत Google OAuth सेशन (Code Assist)
  कभी भी OmniRoute को निर्देशित लॉन्च को ओवरराइड न करे — बाहर निकलने के बाद इसे हटा दिया जाता है;
- **env स्वच्छता**: चाइल्ड env से `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` और `GOOGLE_GENAI_USE_GCA` हटा दिए जाते हैं (जो प्रमाणीकरण को
  Vertex/Code Assist की ओर रीडायरेक्ट कर देते), और अतिरिक्त सुरक्षा के लिए `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  सेट किया जाता है — अन्य `run` लक्ष्यों के अपने परस्पर-विरोधी वेरिएबल्स के साथ भी यही
  प्रक्रिया अपनाई जाती है;
- `--provider`/`--model` से `--model <id>` इंजेक्शन।

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini का वर्कस्पेस-ट्रस्ट गार्ड हेडलेस मोड में भी लागू होता है — स्वयं
`--skip-trust` पास करें (या डायरेक्टरी पर इंटरैक्टिव रूप से भरोसा करें); लॉन्चर
जानबूझकर इसे बायपास नहीं करता। यह लॉन्चर **ACP
पंजीकरण** (`src/lib/acp/registry.ts`, `gemini --acp`) से अलग है, जो
`/dashboard/acp-agents` के लिए एजेंट-प्रोटोकॉल इंटीग्रेशन बना रहता है।

---

## वास्तविक स्मोक स्वीप (ऑप्ट-इन)

निर्धारित लॉन्च-प्लान रिग्रेशन CI में चलता है (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`)। वास्तविक OmniRoute सर्वर के विरुद्ध वास्तविक
बाइनरी को सत्यापित करने के लिए, एक ऑप्ट-इन हार्नेस
`tests/integration/upstream-cli-smoke.int.test.ts` पर उपलब्ध है। यह कभी भी स्वचालित रूप से नहीं चलता
(जब तक `RUN_CLI_SMOKE=1` न हो, प्रत्येक उप-परीक्षण छोड़ दिया जाता है), क्रेडेंशियल को env-var
नाम के माध्यम से पास करता है (मान के माध्यम से कभी नहीं), किसी भी रिकॉर्ड किए गए आउटपुट से कुंजी-जैसी स्ट्रिंग को छिपाता है, ऐसे
लक्ष्यों को छोड़ देता है जिनकी बाइनरी इंस्टॉल नहीं है, और विफलताओं को केवल बूलियन के बजाय
auth / upstream / config के रूप में वर्गीकृत करता है:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

वैकल्पिक: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` स्वीप को सीमित करता है;
`OMNIROUTE_SMOKE_TIMEOUT_MS` प्रत्येक लक्ष्य के लिए 120s टाइमआउट को ओवरराइड करता है।

---

## यह भी देखें

- [Claude Code कॉन्फ़िगरेशन](./CLAUDE-CODE-CONFIGURATION.md) — Claude Code की अधिक विस्तृत मार्गदर्शिका
- [Codex CLI कॉन्फ़िगरेशन](./CODEX-CLI-CONFIGURATION.md) — एक बार किया जाने वाला `[model_providers.omniroute]` बेस सेटअप
- [रिमोट मोड](./REMOTE-MODE.md) — कॉन्टेक्स्ट, सीमित-स्कोप वाले एक्सेस टोकन और रिमोट सर्वर का संचालन
- [CLI टूल्स संदर्भ](../reference/CLI-TOOLS.md) — समर्थित टूल्स और डैशबोर्ड पेजों की पूरी सूची
- [सेटअप गाइड](./SETUP_GUIDE.md) — इंस्टॉल करने के तरीके और पहली बार चलाने पर ऑनबोर्डिंग
