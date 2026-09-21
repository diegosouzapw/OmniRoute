# CLI Integrations (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute ले `setup-*` कमाण्डहरूको एउटा परिवार उपलब्ध गराउँछ, जसले कोडिङ
CLI (Codex, Claude Code, OpenCode, Cline, …) लाई OmniRoute आफ्नो ब्याकएन्डका रूपमा प्रयोग गर्न कन्फिगर गर्छ — जसले गर्दा
उपकरणले **एउटै** एन्डपोइन्टसँग सञ्चार गर्छ र OmniRoute ले स्वतः-फल्ब्याकसहित सही प्रदायकतर्फ
रुट गर्छ। प्रत्येक कमाण्डले चलिरहेको OmniRoute (स्थानीय वा रिमोट) बाट **प्रत्यक्ष** मोडेल क्याटलग पढ्छ
र **तपाईंको** मेसिनमा उपकरणकै कन्फिग फाइल लेख्छ। उपकरणले समर्थन गर्ने हरेक ठाउँमा
API कुञ्जीलाई वातावरणीय भेरिएबलमार्फत सन्दर्भ गरिन्छ। उपकरण-स्थानीय वातावरण फाइल स्थायी रूपमा राख्ने
कमाण्डहरू तल उल्लेख गरिएका छन्।

एउटा सामान्य लन्चर पनि छ — `omniroute run <target>` — जसले
कुनै पनि कन्फिग नलेखी सही env इन्जेक्ट गरेर
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` वा `gemini` सुरु गर्छ।
टार्गेट र तिनका उपनामहरू क्यानोनिकल म्यानिफेस्ट `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`) बाट आउँछन्, र `omniroute completion` ले पनि
सोही म्यानिफेस्टबाट व्युत्पन्न टार्गेट शब्दहरू उपलब्ध गराउँछ। पुराना प्रति-उपकरण लन्चरहरू —
`omniroute launch` (Claude Code) र `omniroute launch-codex` (Codex) — अझै
उपलब्ध छन्।

प्रदायक अनबोर्डिङ पनि उही स्थानीय/रिमोट सन्दर्भबाट उपलब्ध छ। तलका
API-पहिलो कमाण्डहरूले व्यवस्थापन प्रमाणीकरणलाई प्रदायकका
क्रेडेन्सियलहरूबाट अलग राख्छन् र संरचित आउटपुटमा कहिल्यै क्रेडेन्सियल प्रिन्ट गर्दैनन्:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

स्क्रिप्टहरूका लागि `--credential-stdin` वा `--credential-env` प्रयोग गर्न रुचाउनुहोस्;
नियन्त्रित स्थानीय प्रयोगका लागि `--credential` कायम राखिएको छ। गैर-अन्तरक्रियात्मक
टर्मिनलमा `providers remove` लाई `--yes` आवश्यक पर्छ, र सबै पाँच कमाण्डले सक्रिय
सन्दर्भ वा ग्लोबल `--base-url`/`--api-key` विकल्पहरू पालना गर्छन्।

सबैभन्दा समृद्ध दुई इन्टिग्रेसनहरूको एकपटक गरिने, हातैले लेखिने आधारभूत सेटअपका लागि,
प्रति-उपकरण विस्तृत मार्गदर्शिका हेर्नुहोस्:

- [Claude Code कन्फिगरेसन](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI कन्फिगरेसन](./CODEX-CLI-CONFIGURATION.md)
- [रिमोट मोड](./REMOTE-MODE.md) — आफ्नो ल्यापटपबाट रिमोट OmniRoute (VPS / Tailnet) सञ्चालन गर्नुहोस्
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot एक्सटेन्सन; यसले सम्पादकभित्रैबाट तपाईंका लागि यी
  `setup-*` कमाण्डहरू पनि चलाउन सक्छ

---

## मुख्य तालिका

हरेक कमाण्डले **सक्रिय सन्दर्भ** (`omniroute connect` मार्फत सेट गरिएको, हेर्नुहोस्
[रिमोट मोड](./REMOTE-MODE.md)) वा स्पष्ट `--remote <url> --api-key <key>` फ्ल्यागहरूलाई मान्छ।
तलको "स्थानीय बनाम रिमोट" को अर्थ: कुनै फ्ल्याग नहुँदा यसले `http://localhost:20128` लाई लक्षित गर्छ;
`--remote` (वा सक्रिय रिमोट सन्दर्भ) हुँदा यसले उक्त
सर्भरबाट क्याटलग ल्याउँछ र कन्फिग स्थानीय रूपमा लेख्छ।

| कमाण्ड                     | उपकरण                    | यसले के लेख्छ                                                                                                                                                              | प्रमुख फ्ल्यागहरू                                                                                                                          | स्थानीय वा रिमोट |
| -------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI         | `~/.codex/<name>.config.toml` — प्रत्येक अनुकूल टेक्स्ट मोडेलका लागि एउटा प्रोफाइल (`codex --profile <name>`)                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | दुवै             |
| `omniroute setup-claude`   | Claude Code              | `~/.claude/profiles/<name>/settings.json` — मेल खाने प्रत्येक मोडेलका लागि एउटा प्रोफाइल (`CLAUDE_CONFIG_DIR`)                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | दुवै             |
| `omniroute setup-opencode` | OpenCode (OpenAI-सङ्गत)  | `~/.config/opencode/opencode.json` — क्याटलगका प्रत्येक मोडेलसहितको `omniroute` प्रदायक (`opencode -m omniroute/<model>`)                                                  | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | दुवै             |
| `omniroute setup-cline`    | Cline                    | `~/.cline/data/{globalState,secrets}.json` (CLI मोड) + VS Code एक्सटेन्सनका सेटिङहरू प्रिन्ट गर्छ                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | दुवै             |
| `omniroute setup-kilo`     | Kilo Code                | `~/.local/share/kilo/auth.json` (CLI) + VS Code को `settings.json` उपस्थित भएमा त्यसमा `kilocode.*` मर्ज गर्छ                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | दुवै             |
| `omniroute setup-continue` | Continue / `cn` CLI      | `~/.continue/config.yaml` — `provider: openai` मोडेलहरू, `${{ secrets.OMNIROUTE_API_KEY }}` मार्फत कुञ्जी                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | दुवै             |
| `omniroute setup-cursor`   | Cursor                   | केही पनि होइन — एपभित्रका चरणहरू प्रिन्ट गर्छ (Cursor को कन्फिग अपारदर्शी SQLite हो)                                                                                       | `--remote` `--api-key` `--only` `--port`                                                                                                   | दुवै             |
| `omniroute setup-roo`      | Roo Code                 | `~/.omniroute/roo-settings.json` (आयात कागजात) + VS Code को `settings.json` अवस्थित भएमा `roo-cline.autoImportSettingsPath` सेट गर्छ                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | दुवै             |
| `omniroute setup-crush`    | Crush                    | `~/.config/crush/crush.json` — `openai-compat` प्रदायक, `$OMNIROUTE_API_KEY` मार्फत कुञ्जी                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | दुवै             |
| `omniroute setup-goose`    | Goose                    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + वातावरण रेसिपी प्रिन्ट गर्छ                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | दुवै             |
| `omniroute setup-aider`    | Aider                    | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + वातावरण रेसिपी प्रिन्ट गर्छ                                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | दुवै             |
| `omniroute setup-qwen`     | Qwen Code                | `~/.qwen/settings.json` — V4 `modelProviders.openai` एरे + `~/.qwen/.env` मा `OMNIROUTE_API_KEY`                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | दुवै             |
| `omniroute setup-5dive`    | 5dive (एजेन्ट समूह)      | `$HOME` अन्तर्गत केही पनि होइन — `5dive agent auth set` मार्फत 5dive **प्रमाणीकरण प्रोफाइल** (`/var/lib/5dive/auth-profiles/<name>/`) लेख्छ; root-मात्र, समूह होस्टमा चल्छ | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | दुवै             |
| `omniroute run <target>`   | रनटाइम सुरुवात (सामान्य) | केही पनि होइन — सही वातावरण र आर्गुमेन्टहरूसहित `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` सुरु गर्छ; Qwen र Gemini ले अस्थायी पृथक होम प्रयोग गर्छन्     | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | दुवै             |
| `omniroute launch`         | Claude Code              | केही पनि होइन — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` इन्जेक्ट गरेर `claude` सुरु गर्छ                                                                               | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | दुवै             |
| `omniroute launch-codex`   | OpenAI Codex CLI         | केही पनि होइन — `-c` फ्ल्यागहरूमार्फत `omniroute` प्रदायक इन्जेक्ट गरेर `codex` सुरु गर्छ                                                                                  | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | दुवै             |

फ्ल्यागहरूबारे टिप्पणीहरू (कमाण्ड स्रोतमा प्रमाणीकरण गरिएको):

- `--remote <url>` — रिमोट OmniRoute बाट क्याटलग ल्याउँछ (`--port`
  र सक्रिय सन्दर्भलाई अधिलेखन गर्छ)। `--api-key <key>` ले उक्त
  सर्भरका लागि प्रमाणपत्र उपलब्ध गराउँछ (`OMNIROUTE_API_KEY` env var, वा सक्रिय सन्दर्भको टोकन पूर्वनिर्धारित हुन्छ)।
- `--only <patterns>` — अल्पविरामले छुट्याइएका सबस्ट्रिङहरू; मेल खाने मोडेल ID हरू मात्र
  राख्छ (जस्तै `--only glm,kimi`)। `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush` मा उपलब्ध छ।
- `--dry-run` — फाइल प्रणालीमा कुनै परिवर्तन नगरी ठ्याक्कै के लेखिने थियो भन्ने
  प्रिन्ट गर्छ। `setup-cursor` **बाहेक** प्रत्येक `setup-*` कमाण्डमा उपलब्ध छ
  (यसले कहिल्यै फाइल लेख्दैन)।
- `--model <id>` — स्वचालित मोडेल खोज नभएका उपकरणहरूका लागि आवश्यक हुन्छ
  (वा अन्तरक्रियात्मक रूपमा छनोट गरिन्छ): Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive। ती उपकरणहरूले
  गैर-अन्तरक्रियात्मक सञ्चालनका लागि `--yes` पनि स्वीकार गर्छन् (जसका लागि त्यसपछि `--model` आवश्यक हुन्छ)।
  `setup-opencode` ले पूर्वनिर्धारित शीर्ष-स्तरीय मोडेल सेट गर्न `--model` लिन्छ।
- `omniroute run` मा `--model <id>` ले म्यानिफेस्टको प्रति-लक्ष्य जडान
  (`bin/cli/cli-manifest.mjs`) पछ्याउँछ: **aider** ले `--model openai/<id>` र
  **opencode** ले `--model omniroute/<id>` प्राप्त गर्छ (ID मा त्यो पहिलेदेखि नभएमा मात्र
  प्रिफिक्स थपिन्छ); **qwen** र **gemini** ले ID जस्ताको तस्तै प्राप्त गर्छन्;
  **claude** ले यसलाई `ANTHROPIC_MODEL` मार्फत, **goose** ले `GOOSE_MODEL` मार्फत, र
  **codex** ले `-c model_providers.omniroute.*` args मार्फत प्राप्त गर्छ। **Qwen मात्र यस्तो run
  लक्ष्य हो जसमा `--model` अनिवार्य रूपमा आवश्यक हुन्छ** — योबिना `omniroute run qwen`
  स्पष्ट त्रुटिसहित `2` मा निस्कन्छ।
- `--port <port>` — स्थानीय OmniRoute पोर्ट (पूर्वनिर्धारित `20128`, `--remote`
  सेट हुँदा बेवास्ता गरिन्छ)। सबै `setup-*` र दुवै लन्चरमा उपलब्ध छ।
- `omniroute run` निकास कोडहरू: चाइल्ड CLI को आफ्नै निकास कोड जस्ताको तस्तै
  प्रसारित हुन्छ; `2` = अमान्य आर्गुमेन्टहरू (असमर्थित लक्ष्य, आवश्यक
  `--model` छुटेको, कन्टेनर गार्ड); `127` = लक्ष्य बाइनरी `PATH` मा छैन;
  `130`/`143`/`129` जब लन्च `SIGINT`/`SIGTERM`/`SIGHUP` द्वारा समाप्त हुन्छ;
  `1` = अन्य रनटाइम लन्च विफलता।
- दुई लन्चरहरू (`launch`, `launch-codex`) ले `setup-claude` / `setup-codex` द्वारा
  लेखिएको प्रोफाइल चयन गर्न `--profile <name>` स्वीकार गर्छन्, साथै अन्तर्निहित
  `claude` / `codex` बाइनरीका लागि पास-थ्रु args पनि स्वीकार गर्छन्।

अन्तरक्रियात्मक पिकर पनि सेटअप रेसिपीहरूले साझा रूपमा प्रयोग गर्छन्:

```bash
# सक्रिय स्थानीय वा रिमोट मोडेल क्याटलगबाट छानेर लक्ष्य कन्फिगर गर्नुहोस्।
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

हाल `configure` ले `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo`, र `5dive` का परीक्षण गरिएका रेसिपीहरूलाई जिम्मा दिन्छ।
IDE-मात्र,
MITM, र गाइड-मात्र क्याटलग प्रविष्टिहरू स्पष्ट `setup-*`/म्यानुअल प्रवाहकै रूपमा रहन्छन् र
लन्च गर्न मिल्ने लक्ष्यका रूपमा प्रस्तुत गरिँदैनन्।

> `setup-opencode` **हल्का openai-compatible** OpenCode एकीकरण हो।
> अझ समृद्ध प्लगइन एकीकरण पनि छ — `omniroute setup opencode` — जसले
> `@omniroute/opencode-plugin` स्थापना गर्छ। यी फरक कमाण्डहरू हुन्; माथिको तालिकाले
> `setup-opencode` को दस्तावेजीकरण गर्छ।
>
> प्लगइन दुई प्याकेजमा आउँछ, प्रत्येक OpenCode प्रमुख संस्करणका लागि एउटा, किनकि दुई
> लोडरहरूले फरक entrypoint अपेक्षा गर्छन्:
> OpenCode v1 का लागि `@omniroute/opencode-plugin` र
> OpenCode v2 का लागि `@omniroute/opencode-plugin-v2`। v2 प्याकेज नयाँ हो
> (`0.1.0`) र अझै परिवर्तन भइरहेको होस्ट कन्ट्र्याक्ट पछ्याउँछ, त्यसैले यसले कुनै एउटा स्वरूप मानिहाल्नुको सट्टा
> OpenCode ले क्याटलग ड्राफ्टमा उपलब्ध गराएको स्वरूप पढ्छ। यसलाई
> `opencode.json` मा `plugins` प्रविष्टि थपेर स्थापना गर्नुहोस्; `omniroute setup opencode`
> ले अझै पनि v1 प्याकेज स्थापना गर्छ। विकल्पहरू र प्रमाणपत्र खोज्ने क्रम
> प्याकेज README मा छन्।

---

## स्थानीय प्रयोग

OmniRoute `localhost:20128` मा चलिरहेको अवस्थामा, आफ्नो उपकरणका लागि सेटअप आदेश मात्र चलाउनुहोस्।
क्याटलग स्थानीय सर्भरबाट प्राप्त गरिन्छ।

```bash
# Codex: मेल खाने प्रत्येक मोडेलका लागि ~/.codex/ मा एउटा प्रोफाइल लेख्नुहोस्
omniroute setup-codex
codex --profile glm52            # सिर्जना गरिएको प्रोफाइल प्रयोग गर्नुहोस्

# Claude Code: प्रत्येक मोडेलका लागि प्रोफाइलहरू लेख्नुहोस्, त्यसपछि एउटा सुरु गर्नुहोस्
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: क्याटलगका सबै मोडेलसहित openai-सङ्गत प्रदायक लेख्नुहोस्
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} मार्फत सन्दर्भित, डिस्कमा कहिल्यै नराखिने
opencode -m omniroute/glm/glm-5.2 "..."

# स्वतः पत्ता लगाउने सुविधा नभएका उपकरणहरूलाई स्पष्ट मोडेल चाहिन्छ:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# केही पनि नलेखी पूर्वावलोकन गर्नुहोस्:
omniroute setup-continue --dry-run
```

कुनै पनि कन्फिग नलेखी सुरु गर्नुहोस् (env-injection मात्र):

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

# स्पष्ट आदेश पथ: -- पछि आउने जे भए पनि सोझै पठाउनुहोस्
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## रिमोट प्रयोग

कुनै पनि सेटअप आदेशलाई `--remote` + `--api-key` प्रयोग गरेर रिमोट OmniRoute तर्फ निर्देशित गर्नुहोस्।
क्याटलग रिमोटबाट प्राप्त गरिन्छ; कन्फिग तपाईंको स्थानीय मेसिनमा लेखिन्छ।

```bash
# रिमोट VPS विरुद्ध OpenCode, glm/kimi मोडेलहरू मात्र राख्नुहोस्
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # पहिले OMNIROUTE_API_KEY निर्यात गर्नुहोस्

# रिमोट क्याटलगबाट Codex प्रोफाइलहरू
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# CLI लाई सीधै रिमोट विरुद्ध सुरु गर्नुहोस्
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

हरेक पटक `--remote`/`--api-key` दिनुको सट्टा, एकपटक लगइन गर्नुहोस् र
**सक्रिय कन्टेक्स्ट** लाई ती मानहरू स्वतः उपलब्ध गराउन दिनुहोस्:

```bash
omniroute connect 192.168.0.15        # स्कोप गरिएको टोकन बनाउँछ, कन्टेक्स्ट भण्डारण गर्छ
omniroute setup-codex                 # ← अब रिमोट क्याटलग प्रयोग गर्छ
omniroute setup-opencode              # ← उही
omniroute launch                      # ← रिमोट विरुद्ध Claude Code
```

कन्टेक्स्ट, स्कोप र टोकन व्यवस्थापनका लागि [रिमोट मोड](./REMOTE-MODE.md) हेर्नुहोस्।

---

## 5dive एजेन्ट फ्लीटहरू

[5dive](https://5dive.ai) ले लामो समयसम्म चलिरहने कोडिङ एजेन्टहरूको फ्लीट चलाउँछ, जहाँ प्रत्येक एजेन्ट
आफ्नै Unix प्रयोगकर्ताअन्तर्गतको एउटा systemd युनिट हुन्छ। यो आफैंमा कोडिङ CLI होइन, त्यसैले
`omniroute run` ले सुरु गर्नुपर्ने केही हुँदैन — `5dive` **कन्फिगर-मात्र** लक्ष्य हो।

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

दुवै रूपले एउटा 5dive **प्रमाणीकरण प्रोफाइल** लेख्छन्, र त्यस प्रोफाइलसँग बाँधिएको प्रत्येक `claude`
सिटले त्यसपछि OmniRoute सँग सञ्चार गर्छ। यस लक्ष्यका लागि तीन कुरा विशिष्ट छन्:

- **यो फ्लीट होस्टमा root का रूपमा चल्छ।** 5dive का क्रियाहरूले स्थानीय systemd युनिटहरू
  र root-स्वामित्वको स्टेट डाइरेक्टरीमा काम गर्छन्; रिमोट मोड उपलब्ध छैन। पहिले नै root नभएमा रेसिपीले
  `sudo` मार्फत आफूलाई पुनः कार्यान्वयन गर्छ (`--no-sudo` ले त्यसलाई बन्द गरेर त्यसको सट्टा
  आदेश प्रिन्ट गर्छ)।
- **लूपब्याक नभएसम्म एन्डपोइन्ट `https://` हुनैपर्छ।** एजेन्टको API कुञ्जी
  प्रत्येक अनुरोधमा त्यही URL मार्फत जान्छ, र 5dive ले मेसिनबाहिरको प्लेनटेक्स्ट एन्डपोइन्ट अस्वीकार गर्छ।
  निजी LAN ठेगाना पनि यसको अपवाद होइन।
- **प्रत्येक सिटको आफ्नै मोडेल पिनले प्रोफाइललाई प्राथमिकतामा उछिन्छ।** प्रोफाइलले
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL` राख्छ, तर स्टक मोडेल id मा अझै पिन गरिएको सिटको
  पहिलो टर्न _"There's an issue with the selected model"_ त्रुटिसहित असफल हुन्छ।
  सिटहरूलाई पनि पिन गर्न `--agent <name>` दिनुहोस् (दोहोर्याउन मिल्ने); नदिँदा रेसिपीले
  आदेश प्रिन्ट गर्छ।

API कुञ्जी 5dive लाई **stdin** (`--api-key=-`) मार्फत दिइन्छ, त्यसैले यो
`ps` आउटपुटमा कहिल्यै देखिँदैन।

प्रोफाइललाई एउटै मोडेलको सट्टा OmniRoute **combo** तर्फ निर्देशित गर्दा नै
फ्लीटले प्रदायक फेलओभर प्राप्त गर्छ:
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) मा अभिलेख गरिएको रनमा
प्राथमिक एन्डपोइन्ट टर्नको बीचमै पूर्ण रूपमा बन्द हुँदा, एजेन्टले बाँकी चरणहरू
फल्ब्याकमा पूरा गर्यो र आउटेजलाई कहिल्यै बाहिर देखाएन।

---

## आधार URL का प्रचलनहरू (कुन उपकरणलाई `/v1` चाहिन्छ)

OmniRoute ले OpenAI सतहलाई `/v1` मा, Anthropic सतहलाई रुटमा,
र नेटिभ Gemini सतहलाई `/v1beta` मा उपलब्ध गराउँछ। प्रत्येक एकीकरणलाई त्यसको
उपकरणले अपेक्षा गर्ने स्वरूपअनुसार जडान गरिएको छ (कमाण्ड स्रोतमा प्रमाणित):

| एकीकरण                                                                     | लेखिने आधार URL | `/v1`?                                        |
| -------------------------------------------------------------------------- | --------------- | --------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | रुट             | होइन — Cline ले `/v1/chat/completions` थप्छ   |
| `setup-goose` (`OPENAI_HOST`)                                              | रुट             | होइन — Goose ले पाथ थप्छ                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | रुट             | होइन — LiteLLM ले `/v1/chat/completions` थप्छ |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` सहित      | हो                                            |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | रुट             | होइन — Claude Code ले `/v1/messages` थप्छ     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` सहित      | हो                                            |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` सहित      | हो                                            |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | रुट             | होइन — SDK ले `/v1beta/models/…` थप्छ         |
| `setup-5dive` (प्रमाणीकरण प्रोफाइलमा `ANTHROPIC_BASE_URL`)                 | रुट             | होइन — Claude Code ले `/v1/messages` थप्छ     |

---

## अपडेट गर्दा नेटिभ निर्भरताहरू कायम राख्ने: `--include=optional`

तपाईंले `omniroute update` मार्फत अपडेट गर्दा (पुष्टि गरेपछि, वा `--apply` सहित),
OmniRoute ले `--include=optional` पहिल्यै समावेश गरिएको स्थापना कमाण्ड चलाउँछ:

```bash
npm install -g omniroute@latest --include=optional
```

यो तपाईंले `omniroute update` लाई दिने फ्ल्याग **होइन** — अपडेटरले यसलाई सधैँ
लागू गर्छ। यसले तपाईंको npm कन्फिगमा `omit=optional` सेट गरिएको भए पनि
`optionalDependencies` (`better-sqlite3`, `keytar`, `tls-client`, LLMLingua SLM
स्ट्याक) अपडेटपछि कायम रहने सुनिश्चित गर्छ; अन्यथा नेटिभ SQLite ड्राइभर र
OS-keyring बाइन्डिङ कुनै सूचना नदिई हट्न सक्थे। लागू नगरी ठ्याक्कै चल्ने कमाण्डको
पूर्वावलोकन गर्न:

```bash
omniroute update --dry-run
# [सुक्खा परीक्षण] चलाइने कमाण्ड: npm install -g omniroute@latest --include=optional
```

अन्य `omniroute update` फ्ल्यागहरू (स्रोतमा प्रमाणित): `--check` (पुरानो संस्करण
भए exit 1), `--apply` (नसोधी स्थापना गर्ने), `--changelog`, `--no-backup`,
`--yes`।

---

## `omniroute run gemini` मार्फत Google Gemini CLI

`@google/gemini-cli` 0.50.0 विरुद्ध प्रमाणित सम्झौता: CLI ले
`GOOGLE_GEMINI_BASE_URL` लाई मान्छ र त्यसमाथि
`POST /v1beta/models/<model>:generateContent` (र
`:streamGenerateContent?alt=sse`) अनुरोध जारी गर्छ — जुन ठ्याक्कै OmniRoute को
नेटिभ Gemini सतह (`/v1beta`) हो। `omniroute run gemini` ले यसलाई स्वचालित रूपमा
जडान गर्छ:

- `GOOGLE_GEMINI_BASE_URL` → सक्रिय OmniRoute आधार URL (रुट, `/v1` बिना);
- `GEMINI_API_KEY` → समाधान गरिएको OmniRoute प्रमाणपत्र (विकल्प/env/सन्दर्भ);
- एउटा **अस्थायी रूपमा पृथक् गरिएको `GEMINI_CLI_HOME`**, जसको
  `.gemini/settings.json` ले `gemini-api-key` प्रमाणीकरण चयन गर्छ, ताकि भण्डारण
  गरिएको Google OAuth सत्र (Code Assist) ले OmniRoute तर्फ निर्देशित सुरुवातलाई
  कहिल्यै ओभरराइड नगरोस् — बाहिरिएपछि हटाइन्छ;
- **env स्वच्छता**: चाइल्ड env बाट `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` र `GOOGLE_GENAI_USE_GCA` हटाइन्छ (जसले
  प्रमाणीकरणलाई Vertex/Code Assist तर्फ पुनःनिर्देशित गर्ने थिए), र अतिरिक्त
  सुरक्षात्मक विकल्पका रूपमा `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` सेट
  गरिन्छ — अन्य `run` लक्ष्यहरूले पनि आफ्ना परस्पर-विरोधी भेरिएबलहरूका लागि
  यही व्यवहार पाउँछन्;
- `--provider`/`--model` बाट `--model <id>` इन्जेक्सन।

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini को कार्यक्षेत्र-विश्वास सुरक्षा हेडलेस मोडमा पनि लागू हुन्छ — आफैँ
`--skip-trust` दिनुहोस् (वा डाइरेक्टरीलाई अन्तरक्रियात्मक रूपमा विश्वास
गर्नुहोस्); लन्चरले जानाजानी यसलाई बाइपास गर्दैन। यो लन्चर **ACP दर्ता**
(`src/lib/acp/registry.ts`, `gemini --acp`) भन्दा फरक हो, जुन
`/dashboard/acp-agents` का लागि एजेन्ट-प्रोटोकल एकीकरणकै रूपमा रहन्छ।

---

## वास्तविक स्मोक स्वीप (अप्ट-इन)

निर्धारित लन्च-प्लान रिग्रेसन CI मा चल्छ (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`)। वास्तविक OmniRoute सर्भरविरुद्ध वास्तविक
बाइनरीहरू प्रमाणीकरण गर्न, अप्ट-इन हार्नेस
`tests/integration/upstream-cli-smoke.int.test.ts` मा उपलब्ध छ। यो कहिल्यै स्वचालित रूपमा चल्दैन
(`RUN_CLI_SMOKE=1` नभएसम्म प्रत्येक उप-परीक्षण स्किप हुन्छ), क्रेडेन्सियललाई env-var को
नाममार्फत पठाउँछ (मानमार्फत कहिल्यै होइन), रेकर्ड गरिएको कुनै पनि आउटपुटबाट की-जस्ता स्ट्रिङहरू हटाउँछ, बाइनरी इन्स्टल नभएका
टार्गेटहरू स्किप गर्छ, र विफलताहरूलाई सामान्य बुलियनको सट्टा
auth / upstream / config का रूपमा वर्गीकरण गर्छ:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

वैकल्पिक: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ले स्वीपलाई सीमित गर्छ;
`OMNIROUTE_SMOKE_TIMEOUT_MS` ले प्रत्येक टार्गेटको 120s टाइमआउटलाई ओभरराइड गर्छ।

---

## यो पनि हेर्नुहोस्

- [Claude Code कन्फिगरेसन](./CLAUDE-CODE-CONFIGURATION.md) — थप विस्तृत Claude Code गाइड
- [Codex CLI कन्फिगरेसन](./CODEX-CLI-CONFIGURATION.md) — एकपटक गर्नुपर्ने `[model_providers.omniroute]` आधारभूत सेटअप
- [रिमोट मोड](./REMOTE-MODE.md) — कन्टेक्स्टहरू, स्कोप गरिएका एक्सेस टोकनहरू, र रिमोट सर्भर सञ्चालन
- [CLI उपकरण सन्दर्भ](../reference/CLI-TOOLS.md) — समर्थित उपकरणहरू + ड्यासबोर्ड पृष्ठहरूको पूर्ण सूची
- [सेटअप गाइड](./SETUP_GUIDE.md) — इन्स्टल गर्ने विधिहरू र पहिलोपटक चलाउँदाको अनबोर्डिङ
