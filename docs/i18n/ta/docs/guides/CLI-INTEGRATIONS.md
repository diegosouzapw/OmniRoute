# CLI-INTEGRATIONS (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI ஒருங்கிணைப்புகள் — OmniRoute க்கு எந்தக் குறியீட்டு CLI ஐ நோக்குங்கள்"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI ஒருங்கிணைப்புகள்

OmniRoute ஒரு குறியீட்டு CLI (Codex, Claude Code, OpenCode, Cline, …) ஐ OmniRoute ஐ அதன் பின்னணி ஆக பயன்படுத்த அமைக்க `setup-*` கட்டளைகளின் குடும்பத்தை வழங்குகிறது — எனவே, இந்த கருவி **ஒரு** முடிவுறையைப் பேசுகிறது மற்றும் OmniRoute சரியான வழங்குநருக்கு வழி வகுக்கிறது மற்றும் தானாகவே மீள்கிறது. ஒவ்வொரு கட்டளையும் ஓர் இயங்கும் OmniRoute (உள்ளூர் அல்லது தொலைதூரம்) இல் இருந்து **உயிர்** மாதிரி பட்டியலைப் படிக்கிறது மற்றும் **உங்கள்** கணினியில் கருவியின் சொந்த கட்டமைப்பு கோப்பை எழுதுகிறது. API விசை கருவி அதை ஆதரிக்கும் இடங்களில் ஒரு சுற்றுப்புற மாறியில் குறிப்பிடப்படுகிறது. கருவி-உள்ளூர் சுற்றுப்புற கோப்பை நிலைநாட்டும் கட்டளைகள் கீழே குறிப்பிடப்பட்டுள்ளன.

ஒரு பொதுவான தொடக்கமும் உள்ளது — `omniroute run <target>` — இது `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` அல்லது `gemini` ஐ சரியான சுற்றுப்புறம் ஊட்டியுடன் உருவாக்குகிறது, எந்த கட்டமைப்பையும் எழுதாமல். இலக்குகள் மற்றும் அவற்றின் பெயர்கள் `bin/cli/cli-manifest.mjs` என்ற மானிபெஸ்டில் இருந்து வருகின்றன (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), மற்றும் `omniroute completion` ஒரே மானிபெஸ்டில் இருந்து பெறப்பட்ட இலக்க வார்த்தைகளை வழங்குகிறது. பழமையான கருவி தொடக்கங்கள் — `omniroute launch` (Claude Code) மற்றும் `omniroute launch-codex` (Codex) — கிடைக்கின்றன.

வழங்குநர் சேர்க்கை ஒரே உள்ளூர்/தொலைதூர சூழ்நிலையிலிருந்து கிடைக்கிறது. கீழே உள்ள API-முதலில் கட்டளைகள் மேலாண்மை அங்கீகாரத்தை வழங்குநர் சான்றிதழ்களிலிருந்து தனியாக வைத்திருக்கின்றன மற்றும் ஒருபோதும் கட்டமைக்கப்பட்ட வெளியீட்டில் சான்றிதழ் அச்சிடுவதில்லை:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

ஸ்கிரிப்ட்களுக்கு, `--credential-stdin` அல்லது `--credential-env` ஐ விரும்புங்கள்; `--credential` கட்டுப்படுத்தப்பட்ட உள்ளூர் பயன்பாட்டிற்காக வைத்திருக்கப்படுகிறது. `providers remove` ஒரு தொடர்பற்ற டெர்மினலில் `--yes` ஐ தேவைப்படுகிறது, மற்றும் அனைத்து ஐந்து கட்டளைகளும் செயல்பாட்டைச் சார்ந்த சூழ்நிலையை அல்லது உலகளாவிய `--base-url`/`--api-key` விருப்பங்களை மதிக்கின்றன.

இரு மிகச் செழுமையான ஒருங்கிணைப்புகளின் ஒரே முறை, கை எழுத்து அடிப்படையிலான அமைப்பிற்காக, கருவி-தரமான ஆழமான ஆராய்ச்சிகளைப் பார்க்கவும்:

- [Claude Code கட்டமைப்பு](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI கட்டமைப்பு](./CODEX-CLI-CONFIGURATION.md)
- [தொலைதூர முறை](./REMOTE-MODE.md) — உங்கள் லேப்டாப்பிலிருந்து தொலைதூர OmniRoute (VPS / Tailnet) ஐ இயக்குங்கள்
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot நீட்சி; இது உங்கள் தொகுப்பாளருக்குள் இருந்து உங்களுக்காக இந்த `setup-*` கட்டளைகளை இயக்கலாம்

---

## மாஸ்டர் அட்டவணை

ஒவ்வொரு கட்டளையும் **செயல்பாட்டில் உள்ள சூழ்நிலை** ( `omniroute connect` மூலம் அமைக்கப்பட்டது, [தொலைதூர முறை](./REMOTE-MODE.md) ஐப் பார்க்கவும்) அல்லது தெளிவான `--remote <url> --api-key <key>` கொடுக்கப்பட்ட விருப்பங்களை மதிக்கிறது. "உள்ளூர் மற்றும் தொலைதூரம்" கீழே உள்ளதாவது: எந்த விருப்பங்களும் இல்லாமல் இது `http://localhost:20128` ஐ நோக்குகிறது; `--remote` (அல்லது செயல்பாட்டில் உள்ள தொலைதூர சூழ்நிலை) உடன், அந்த சேவையகத்திலிருந்து பட்டியலைப் பெறுகிறது மற்றும் உள்ளூர் கட்டமைப்பை எழுதுகிறது.

| கட்டளை                     | கருவி                        | இது என்ன எழுதுகிறது                                                                                                                                                                                                          | முக்கிய விருப்பங்கள்                                                                                                                       | உள்ளூர் மற்றும் தொலைதூரம் |
| -------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — ஒவ்வொரு பொருத்தமான உரை மாதிரிக்கு ஒரு சுயவிவரம் (`codex --profile <name>`)                                                                                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | இரண்டும்                  |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — ஒவ்வொரு பொருத்தமான மாதிரிக்கு ஒரு சுயவிவரம் (`CLAUDE_CONFIG_DIR`)                                                                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | இரண்டும்                  |
| `omniroute setup-opencode` | OpenCode (openai-compatible) | `~/.config/opencode/opencode.json` — ஒவ்வொரு பட்டியலின் மாதிரியுடன் `omniroute` வழங்குநர் (`opencode -m omniroute/<model>`)                                                                                                  | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | இரண்டும்                  |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI முறை) + VS Code நீட்சியின் அமைப்புகளை அச்சிடுகிறது                                                                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | இரண்டும்                  |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + இருந்தால் VS Code `settings.json` இல் `kilocode.*` ஐ இணைக்கிறது                                                                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | இரண்டும்                  |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — `provider: openai` மாதிரிகள், விசை `${{ secrets.OMNIROUTE_API_KEY }}` மூலம்                                                                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | இரண்டும்                  |
| `omniroute setup-cursor`   | Cursor                       | எதுவும் இல்லை — செயலியில் உள்ள படிகளை அச்சிடுகிறது (Cursor கட்டமைப்பு மறைமுக SQLite)                                                                                                                                         | `--remote` `--api-key` `--only` `--port`                                                                                                   | இரண்டும்                  |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (இறக்குமதி ஆவணம்) + ஒரு VS Code `settings.json` இருந்தால் `roo-cline.autoImportSettingsPath` ஐ அமைக்கிறது                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | இரண்டும்                  |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — `openai-compat` வழங்குநர், விசை `$OMNIROUTE_API_KEY` மூலம்                                                                                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | இரண்டும்                  |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + சுற்றுப்புற செய்முறை                                                                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | இரண்டும்                  |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + சுற்றுப்புற செய்முறை                                                                                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | இரண்டும்                  |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4 `modelProviders.openai` வரிசை + `OMNIROUTE_API_KEY` `~/.qwen/.env` இல்                                                                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | இரண்டும்                  |
| `omniroute run <target>`   | Runtime launch (generic)     | எதுவும் இல்லை — சரியான சுற்றுப்புறம் மற்றும் аргументы உடன் `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` ஐ உருவாக்குகிறது; Qwen மற்றும் Gemini ஒரு தற்காலிகமாக தனிமைப்படுத்தப்பட்ட வீட்டைப் பயன்படுத்துகின்றன | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | இரண்டும்                  |
| `omniroute launch`         | Claude Code                  | எதுவும் இல்லை — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` ஊட்டியுடன் `claude` ஐ உருவாக்குகிறது                                                                                                                             | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | இரண்டும்                  |
| `omniroute launch-codex`   | OpenAI Codex CLI             | எதுவும் இல்லை — `-c` விருப்பங்கள் மூலம் `omniroute` வழங்குநரை ஊட்டியுடன் `codex` ஐ உருவாக்குகிறது                                                                                                                            | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | இரண்டும்                  |

விருப்பங்கள் பற்றிய குறிப்புகள் (கட்டளை மூலத்தில் சரிபார்க்கப்பட்டது):

- `--remote <url>` — தொலைதூர OmniRoute இல் இருந்து பட்டியலைப் பெறுகிறது ( `--port` மற்றும் செயல்பாட்டில் உள்ள சூழ்நிலையை மீறுகிறது). `--api-key <key>` அந்த சேவையகத்திற்கான சான்றிதழை வழங்குகிறது (இது `OMNIROUTE_API_KEY` சுற்றுப்புற மாறி அல்லது செயல்பாட்டில் உள்ள சூழ்நிலையின் டோக்கனை அடிப்படையாகக் கொண்டது).
- `--only <patterns>` — கமா-பிரிக்கப்பட்ட துணுக்குகள்; பொருத்தமான மாதிரி அடையாளங்களை மட்டும் வைத்திருக்கவும் (எ.கா. `--only glm,kimi`). `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush` இல் கிடைக்கிறது.
- `--dry-run` — கோப்புறையைத் தொடாமல் எழுதப்படும் விஷயங்களை சரியாக அச்சிடுங்கள். ஒவ்வொரு `setup-*` கட்டளையிலும் கிடைக்கிறது **setup-cursor** (எது ஒருபோதும் கோப்பை எழுதாது) தவிர.
- `--model <id>` — மாதிரி தானாகக் கண்டறியாத கருவிகளுக்கு தேவை (அல்லது தொடர்பான முறையில் தேர்ந்தெடுக்கப்படுகிறது): Cline, Kilo, Roo, Goose, Qwen, Aider. அந்த கருவிகள் `--yes` ஐ non-interactive இயக்கங்களுக்கு ஏற்கின்றன (அப்போது `--model` தேவைப்படுகிறது). `setup-opencode` மேல்மட்ட மாதிரியை அமைக்க `--model` ஐ எடுத்துக்கொள்கிறது.
- `--model <id>` `omniroute run` இல் மானிபெஸ்டின் இலக்கத்திற்கு ஏற்ப wiring ஐ பின்பற்றுகிறது (`bin/cli/cli-manifest.mjs`): **aider** `--model openai/<id>` ஐப் பெறுகிறது மற்றும் **opencode** `--model omniroute/<id>` ஐப் பெறுகிறது (அந்த அடையாளம் ஏற்கனவே அதை கொண்டிருந்தால் முன்னணி சேர்க்கப்படாது); **qwen** மற்றும் **gemini** அடையாளத்தை நேரடியாகப் பெறுகின்றன; **claude** அதை `ANTHROPIC_MODEL` மூலம் பெறுகிறது, **goose** `GOOSE_MODEL` மூலம், மற்றும் **codex** `-c model_providers.omniroute.*` аргументы மூலம் பெறுகிறது. **Qwen என்பது `--model` ஐ கடுமையாக தேவைப்படும் ஒரே இயக்க இலக்கு** — `omniroute run qwen` இல் இல்லாமல் அது `2` என்ற வெளிப்படையான பிழையுடன் வெளியேறும்.
- `--port <port>` — உள்ளூர் OmniRoute போர்ட் (இயல்பாக `20128`, `--remote` அமைக்கப்பட்டால் புறக்கணிக்கப்படுகிறது). அனைத்து `setup-*` மற்றும் இரண்டு தொடக்கங்களில் உள்ளன.
- `omniroute run` வெளியேற்றக் குறியீடுகள்: குழந்தை CLI இன் சொந்த வெளியேற்றக் குறியீடு நேரடியாக பரவுகிறது; `2` = தவறான аргументы (ஆதரிக்கப்படாத இலக்கு, தேவைப்படும் `--model` இல் குறைவாக, கொண்டெய்னர் காப்பகம்); `127` = இலக்கு பைனரி `PATH` இல் இல்லை; `130`/`143`/`129` `SIGINT`/`SIGTERM`/`SIGHUP` மூலம் தொடக்கம் முடிவுக்கு வந்தால்; `1` = பிற இயக்க தொடக்க தோல்வி.
- இரண்டு தொடக்கங்கள் (`launch`, `launch-codex`) `setup-claude` / `setup-codex` மூலம் எழுதப்பட்ட ஒரு சுயவிவரத்தை தேர்ந்தெடுக்க `--profile <name>` ஐ ஏற்கின்றன, மேலும் அடிப்படையான `claude` / `codex` பைனரிக்கு கடந்து செல்லும் аргументы.

இணையத் தேர்வாளர் அமைப்பு செய்முறைகளால் பகிரப்படுகிறது:

```bash
# செயல்பாட்டில் உள்ள உள்ளூர் அல்லது தொலைதூர மாதிரி பட்டியலிலிருந்து தேர்ந்தெடுக்கவும் மற்றும் இலக்கத்தை அமைக்கவும்.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` தற்போது `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, மற்றும் `kilo` க்கான சோதிக்கப்பட்ட செய்முறைகளை ஒப்படைக்கிறது. IDE-க்கு மட்டும், MITM, மற்றும் வழிகாட்டி-க்கு மட்டும் பட்டியல் உள்ளீடுகள் தெளிவான `setup-*`/கைமுறை ஓட்டங்கள் மற்றும் இயக்கத்திற்கான இலக்கங்களாக வழங்கப்படவில்லை.

> `setup-opencode` என்பது **இலகுரக openai-இணக்கமான** OpenCode ஒருங்கிணைப்பு.
> மேலும் ஒரு செழுமையான பிளக்கின் ஒருங்கிணைப்பு உள்ளது — `omniroute setup opencode` — இது `@omniroute/opencode-plugin` ஐ நிறுவுகிறது. அவை வெவ்வேறு கட்டளைகள்; மேலே உள்ள அட்டவணை `setup-opencode` ஐ ஆவணமாக்குகிறது.

---

## உள்ளூர் பயன்பாடு

`localhost:20128` இல் OmniRoute இயங்கும் போது, உங்கள் கருவிக்கான அமைப்பு கட்டளையை இயக்கவும். பட்டியல் உள்ளூர் சேவையிலிருந்து பெறப்படுகிறது.

```bash
# Codex: பொருந்தும் மாதிரிக்கு ~/.codex/ இல் ஒரு சுயவிவரத்தை எழுதவும்
omniroute setup-codex
codex --profile glm52            # உருவாக்கப்பட்ட சுயவிவரத்தைப் பயன்படுத்தவும்

# Claude Code: மாதிரி அடிப்படையில் சுயவிவரங்களை எழுதவும், பின்னர் ஒன்றை தொடங்கவும்
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: அனைத்து பட்டியல் மாதிரிகளுடன் openai-இன் பொருத்தமான வழங்குநரை எழுதவும்
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} மூலம் குறிப்பிடப்பட்டுள்ளது, எப்போதும் டிஸ்கில் இல்லை
opencode -m omniroute/glm/glm-5.2 "..."

# தானாக கண்டறியாத கருவிகள் ஒரு தெளிவான மாதிரியை தேவைப்படுகிறது:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# எதையும் எழுதாமல் முன்னோட்டம்:
omniroute setup-continue --dry-run
```

எந்தவொரு கட்டமைப்பையும் எழுதாமல் தொடங்கவும் (சூழல்-உள்ளீடு மட்டும்):

```bash
omniroute launch                 # Claude Code → உள்ளூர் OmniRoute
omniroute launch-codex           # Codex CLI → உள்ளூர் OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# தெளிவான கட்டளை பாதை: -- பிறகு வரும் எதையும் கடத்தவும்
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## தொலைபேசி பயன்பாடு

எந்த அமைப்பு கட்டளையையும் `--remote` + `--api-key` உடன் தொலைபேசி OmniRoute க்கு குறிக்கவும். பட்டியல் தொலைபேசியில் பெறப்படுகிறது; கட்டமைப்பு உங்கள் உள்ளூர் இயந்திரத்தில் எழுதப்படுகிறது.

```bash
# தொலைபேசியில் ஒரு VPS க்கு OpenCode, glm/kimi மாதிரிகளை மட்டும் வைத்திருங்கள்
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # முதலில் OMNIROUTE_API_KEY ஐ ஏற்றுமதி செய்யவும்

# தொலைபேசி பட்டியலிலிருந்து Codex சுயவிவரங்கள்
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# தொலைபேசிக்கு நேரடியாக CLI ஐ தொடங்கவும்
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

ஒவ்வொரு முறையும் `--remote`/`--api-key` ஐ வழங்குவதற்குப் பதிலாக, ஒருமுறை உள்நுழைந்து **செயலில் உள்ள சூழல்** அவற்றைப் தானாக வழங்க அனுமதிக்கவும்:

```bash
omniroute connect 192.168.0.15        # ஒரு scoped token ஐ உருவாக்குகிறது, சூழலை சேமிக்கிறது
omniroute setup-codex                 # ← இப்போது தொலைபேசி பட்டியலைப் பயன்படுத்துகிறது
omniroute setup-opencode              # ← அதே
omniroute launch                      # ← Claude Code தொலைபேசிக்கு
```

சூழல்கள், அளவுகள் மற்றும் டோக்கன் மேலாண்மைக்கான [தொலைபேசி முறை](./REMOTE-MODE.md) ஐப் பார்க்கவும்.

---

## அடிப்படை URL 관례 (எது கருவிகள் `/v1` ஐ விரும்புகிறது)

OmniRoute OpenAI மேற்பரப்பை `/v1` இல், Anthropic மேற்பரப்பை அடிப்படையில், மற்றும் ஒரு உள்ளூர் Gemini மேற்பரப்பை `/v1beta` இல் வெளிப்படுத்துகிறது. ஒவ்வொரு ஒருங்கிணைப்பும் அதன் கருவி எதிர்பார்க்கும் வடிவத்திற்கு இணைக்கப்பட்டுள்ளது (கட்டளை மூலத்தில் சரிபார்க்கப்பட்டது):

| ஒருங்கிணைப்பு                                                              | எழுதப்பட்ட அடிப்படை URL | `/v1`?                                                 |
| -------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | அடிப்படை                | இல்லை — Cline `/v1/chat/completions` ஐச் சேர்க்கிறது   |
| `setup-goose` (`OPENAI_HOST`)                                              | அடிப்படை                | இல்லை — Goose பாதையைச் சேர்க்கிறது                     |
| `setup-aider` (`OPENAI_API_BASE`)                                          | அடிப்படை                | இல்லை — LiteLLM `/v1/chat/completions` ஐச் சேர்க்கிறது |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` உடன்              | ஆம்                                                    |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | அடிப்படை                | இல்லை — Claude Code `/v1/messages` ஐச் சேர்க்கிறது     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` உடன்              | ஆம்                                                    |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` உடன்              | ஆம்                                                    |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | அடிப்படை                | இல்லை — SDK `/v1beta/models/…` ஐச் சேர்க்கிறது         |

---

## உள்ளூர் deps ஐ புதுப்பிக்க: `--include=optional`

நீங்கள் `omniroute update` மூலம் புதுப்பிக்கும்போது (உறுதிப்படுத்திய பிறகு, அல்லது `--apply` உடன்),
OmniRoute `--include=optional` உடன் நிறுவலை இயக்குகிறது:

```bash
npm install -g omniroute@latest --include=optional
```

இது `omniroute update` க்கு நீங்கள் வழங்கும் ஒரு கொடி **இல்லை** — இது எப்போதும்
புதுப்பிப்பாளர் மூலம் பயன்படுத்தப்படுகிறது. இது `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM ஸ்டாக்) புதுப்பிப்பைத் தாண்டி உயிர் வாழ்வதை உறுதி செய்கிறது, உங்கள் npm கட்டமைப்பில்
`omit=optional` அமைக்கப்பட்டிருந்தாலும், இது இயல்பாக உள்ள SQLite
ஓட்டுநர் மற்றும் OS-keyring பிணைப்பை மௌனமாக நீக்கிவிடும். சரியான கட்டளையை முன்னோக்கி காண
புதுப்பிக்காமல்:

```bash
omniroute update --dry-run
# [DRY RUN] Would run: npm install -g omniroute@latest --include=optional
```

மற்ற `omniroute update` கொடிகள் (மூலத்தில் சரிபார்க்கப்பட்டது): `--check` (பழையதாக இருந்தால் 1 ஐ வெளியேற்றவும்), `--apply` (கேள்வி இல்லாமல் நிறுவவும்), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI மூலம் `omniroute run gemini`

`@google/gemini-cli` 0.50.0 க்கு எதிராக ஒப்பந்தம் சரிபார்க்கப்பட்டது: CLI
`GOOGLE_GEMINI_BASE_URL` ஐ மதிப்பீடு செய்கிறது மற்றும் `POST /v1beta/models/<model>:generateContent`
(மற்றும் `:streamGenerateContent?alt=sse`) அதற்கு எதிராக வெளியிடுகிறது — இது OmniRoute இன் உள்ளூர்
Gemini மேற்பரப்பின் ( `/v1beta`). `omniroute run gemini` அதை தானாகவே இணைக்கிறது:

- `GOOGLE_GEMINI_BASE_URL` → செயல்பாட்டில் உள்ள OmniRoute அடிப்படை URL (மூல, `/v1` இல்லை);
- `GEMINI_API_KEY` → தீர்க்கப்பட்ட OmniRoute அங்கீகாரம் (விருப்பம்/சூழல்/சூழல்);
- ஒரு **தற்காலிக தனிமைப்படுத்தப்பட்ட `GEMINI_CLI_HOME`** இதன் `.gemini/settings.json`
  `gemini-api-key` அங்கீகாரத்தை தேர்வு செய்கிறது, எனவே சேமிக்கப்பட்ட Google OAuth அமர்வு (Code Assist)
  OmniRoute-க்கு வழிநடத்தும் தொடக்கத்தை மீறாது — வெளியேறிய பிறகு நீக்கப்படுகிறது;
- **சூழல் சுத்தம்**: குழந்தை சூழல் `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` மற்றும் `GOOGLE_GENAI_USE_GCA` இல் இருந்து சுத்தமாக்கப்படுகிறது (இவை
  அங்கீகாரத்தை Vertex/Code Assist க்கு மறுபரிசீலனை செய்யும்), மற்றும் `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` என்பது
  ஒரு கம்பி மற்றும் இடுப்புப் பிணைப்பாக அமைக்கப்படுகிறது — மற்ற `run` இலக்கங்கள் தங்கள் சொந்த
  மோதலான மாறிலிகளுக்காக ஒரே சிகிச்சையைப் பெறுகின்றன;
- `--model <id>` ஐ `--provider`/`--model` இல் இருந்து ஊட்டுகிறது.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini இன் வேலைப்பாடு-நம்பிக்கை பாதுகாப்பு இன்னும் தலைவனில்லா முறையில் செயல்படுகிறது —
`--skip-trust` ஐ வழங்கவும் (அல்லது அடைவை இடைமுகமாக நம்பவும்); தொடக்கி
அதை தவிர்க்கவில்லை. இந்த தொடக்கி **ACP பதிவு** ( `src/lib/acp/registry.ts`, `gemini --acp`) இல் இருந்து மாறுபட்டது,
இது `/dashboard/acp-agents` க்கான முகவர்-அணுகுமுறை ஒருங்கிணைப்பாக உள்ளது.

---

## உண்மையான புகை சுத்தம் (தேர்வு)

CI இல் தீர்மானமான தொடக்கம்-திட்டம் மீள்பார்வை (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). உண்மையான OmniRoute சேவையகத்திற்கான உண்மையான
பைனரிகளை சரிபார்க்க, `tests/integration/upstream-cli-smoke.int.test.ts` இல் ஒரு தேர்வு
கட்டமைப்பு உள்ளது. இது தானாகவே இயக்கப்படாது
(ஒவ்வொரு துணை-சோதனையும் `RUN_CLI_SMOKE=1` இல்லாமல் தவிர்க்கப்படுகிறது), அங்கீகாரத்தை சூழல்-மாறிலி
பெயரால் (மதிப்பால் அல்ல) வழங்குகிறது, பதிவு செய்யப்பட்ட வெளியீட்டில் விசை-வடிவமான சரங்களை மறைக்கிறது,
நிறுத்தப்படாத பைனரி உள்ள இலக்கங்களை தவிர்க்கிறது, மற்றும் தோல்விகளை
அங்கீகாரம் / மேலோட்டம் / கட்டமைப்பு என வகைப்படுத்துகிறது, ஒரு நிர்வாக boolean ஆக அல்ல:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

தேர்வாக: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` சுத்தத்தை கட்டுப்படுத்துகிறது;
`OMNIROUTE_SMOKE_TIMEOUT_MS` 120s ஒவ்வொரு இலக்கத்திற்கான நேரத்தை மீறுகிறது.

---

## மேலும் பார்க்கவும்

- [Claude Code கட்டமைப்பு](./CLAUDE-CODE-CONFIGURATION.md) — ஆழமான Claude Code வழிகாட்டி
- [Codex CLI கட்டமைப்பு](./CODEX-CLI-CONFIGURATION.md) — ஒரே முறை `[model_providers.omniroute]` அடிப்படை அமைப்பு
- [Remote Mode](./REMOTE-MODE.md) — சூழ்நிலைகள், வரையறுக்கப்பட்ட அணுகல் டோக்கன்கள், தொலைநிலை சேவையகத்தை இயக்குதல்
- [CLI Tools குறிப்புகள்](../reference/CLI-TOOLS.md) — ஆதரிக்கப்படும் கருவிகளின் முழு பட்டியல் + டாஷ்போர்ட் பக்கங்கள்
- [அமைப்பு வழிகாட்டி](./SETUP_GUIDE.md) — நிறுவல் முறைகள் மற்றும் முதன்மை இயக்கம்
