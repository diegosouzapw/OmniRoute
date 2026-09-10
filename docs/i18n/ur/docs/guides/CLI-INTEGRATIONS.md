# CLI-INTEGRATIONS (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI انضمام — کسی بھی کوڈنگ CLI کو OmniRoute پر نشانہ بنائیں"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI انضمام

OmniRoute ایک خاندان کے `setup-*` کمانڈز فراہم کرتا ہے جو ایک کوڈنگ
CLI (Codex, Claude Code, OpenCode, Cline, …) کو OmniRoute کو اس کے بیک اینڈ کے طور پر استعمال کرنے کے لیے ترتیب دیتا ہے — تاکہ
یہ ٹول **ایک** اینڈپوائنٹ سے بات کرتا ہے اور OmniRoute صحیح فراہم کنندہ کی طرف راستہ بناتا ہے
خودکار فیل بیک کے ساتھ۔ ہر کمانڈ ایک چلتے ہوئے
OmniRoute (مقامی یا دور) سے **زندہ** ماڈل کی کیٹلاگ پڑھتا ہے اور ٹول کی اپنی کنفیگریشن فائل **آپ کے**
مشین پر لکھتا ہے۔ API کلید کو ایک ماحولیاتی متغیر کے ذریعے حوالہ دیا جاتا ہے جہاں بھی ٹول
اس کی حمایت کرتا ہے۔ کمانڈز جو ٹول-مقامی ماحولیاتی فائل کو برقرار رکھتے ہیں نیچے نوٹ کیے گئے ہیں۔

ایک عمومی لانچر بھی موجود ہے — `omniroute run <target>` — جو
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` یا `gemini` کو صحیح ماحول کے ساتھ
انجیکٹ کرتا ہے، بغیر کسی کنفیگریشن کو لکھے۔ ہدف اور ان کے
عرفی نام کینونیکل مینیفیسٹ `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`) سے آتے ہیں، اور `omniroute completion` پیش کرتا ہے
اسی مینیفیسٹ سے ماخوذ ہدف کے الفاظ۔ وراثتی فی ٹول لانچر —
`omniroute launch` (Claude Code) اور `omniroute launch-codex` (Codex) — دستیاب رہتے ہیں۔

فراہم کنندہ کی آن بورڈنگ اسی مقامی/دور کے سیاق و سباق سے دستیاب ہے۔ نیچے دیے گئے
API-first کمانڈز انتظامی توثیق کو فراہم کنندہ کی اسناد سے الگ رکھتے ہیں اور کبھی بھی
ساختی آؤٹ پٹ میں کوئی سند نہیں چھاپتے:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

اسکرپٹس کے لیے، `--credential-stdin` یا `--credential-env` کو ترجیح دیں؛ `--credential`
کنٹرول شدہ مقامی استعمال کے لیے برقرار رکھا گیا ہے۔ `providers remove` غیر
تفاعلی ٹرمینل پر `--yes` کی ضرورت ہوتی ہے، اور تمام پانچ کمانڈز فعال سیاق و سباق یا
عالمی `--base-url`/`--api-key` کے اختیارات کی عزت کرتے ہیں۔

دو سب سے زیادہ امیر انضمام کی ایک بار، ہاتھ سے لکھی گئی بنیادی ترتیب کے لیے، فی ٹول گہرائی میں
دیکھیں:

- [Claude Code کی ترتیب](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI کی ترتیب](./CODEX-CLI-CONFIGURATION.md)
- [دور کا طریقہ](./REMOTE-MODE.md) — اپنے لیپ ٹاپ سے ایک دور OmniRoute (VPS / Tailnet) کو چلائیں
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot توسیع؛ یہ آپ کے لیے ایڈیٹر کے اندر سے بھی یہ
  `setup-*` کمانڈز چلا سکتا ہے

---

## ماسٹر ٹیبل

ہر کمانڈ **فعال سیاق و سباق** کی عزت کرتا ہے (جو `omniroute connect` کے ساتھ سیٹ کیا جاتا ہے، دیکھیں
[دور کا طریقہ](./REMOTE-MODE.md)) یا واضح `--remote <url> --api-key <key>` کے جھنڈے۔
"مقامی بمقابلہ دور" کا مطلب ہے: بغیر کسی جھنڈے کے یہ `http://localhost:20128` کو نشانہ بناتا ہے؛
`--remote` (یا ایک فعال دور سیاق و سباق) کے ساتھ یہ اس سرور سے کیٹلاگ حاصل کرتا ہے اور
کنفیگریشن کو مقامی طور پر لکھتا ہے۔

| کمانڈ                      | ٹول                          | یہ کیا لکھتا ہے                                                                                                                                                      | اہم جھنڈے                                                                                                                                  | مقامی بمقابلہ دور |
| -------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — ہر ہم آہنگ ٹیکسٹ ماڈل کے لیے ایک پروفائل (`codex --profile <name>`)                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | دونوں             |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — ہر ملتے جلتے ماڈل کے لیے ایک پروفائل (`CLAUDE_CONFIG_DIR`)                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | دونوں             |
| `omniroute setup-opencode` | OpenCode (openai-compatible) | `~/.config/opencode/opencode.json` — `omniroute` فراہم کنندہ کے ساتھ ہر کیٹلاگ ماڈل (`opencode -m omniroute/<model>`)                                                | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | دونوں             |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI موڈ) + VS Code توسیع کی ترتیبات چھاپتا ہے                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | دونوں             |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + اگر موجود ہو تو `kilocode.*` کو VS Code `settings.json` میں ضم کرتا ہے                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | دونوں             |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — `provider: openai` ماڈلز، کلید `${{ secrets.OMNIROUTE_API_KEY }}` کے ذریعے                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | دونوں             |
| `omniroute setup-cursor`   | Cursor                       | کچھ نہیں — ایپ میں مراحل چھاپتا ہے (Cursor کی ترتیب اوپیک SQLite ہے)                                                                                                 | `--remote` `--api-key` `--only` `--port`                                                                                                   | دونوں             |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (درآمدی دستاویز) + اگر VS Code `settings.json` موجود ہو تو `roo-cline.autoImportSettingsPath` کو سیٹ کرتا ہے                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | دونوں             |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — `openai-compat` فراہم کنندہ، کلید `$OMNIROUTE_API_KEY` کے ذریعے                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | دونوں             |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + ماحول کی ترکیب چھاپتا ہے                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | دونوں             |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + ماحول کی ترکیب چھاپتا ہے                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | دونوں             |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4 `modelProviders.openai` کی صف + `OMNIROUTE_API_KEY` `~/.qwen/.env` میں                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | دونوں             |
| `omniroute run <target>`   | رن ٹائم لانچ (جنرل)          | کچھ نہیں — `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` کو صحیح ماحول اور دلائل کے ساتھ شروع کریں؛ Qwen اور Gemini ایک عارضی الگ گھر استعمال کرتے ہیں | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | دونوں             |
| `omniroute launch`         | Claude Code                  | کچھ نہیں — `claude` کو `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` کے ساتھ شروع کرتا ہے                                                                              | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | دونوں             |
| `omniroute launch-codex`   | OpenAI Codex CLI             | کچھ نہیں — `codex` کو `omniroute` فراہم کنندہ کے ساتھ `-c` جھنڈوں کے ذریعے شروع کرتا ہے                                                                              | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | دونوں             |

جھنڈوں پر نوٹس (کمانڈ کے ماخذ میں تصدیق شدہ):

- `--remote <url>` — دور OmniRoute سے کیٹلاگ حاصل کریں (یہ `--port`
  اور فعال سیاق و سباق کو اوور رائیڈ کرتا ہے)۔ `--api-key <key>` اس سرور کے لیے سند فراہم کرتا ہے
  (جو کہ `OMNIROUTE_API_KEY` ماحولیاتی متغیر، یا فعال سیاق و سباق کے ٹوکن کی ڈیفالٹ ہے)۔
- `--only <patterns>` — کاما سے جدا ذیلی سلسلے؛ صرف ماڈل IDs رکھیں جو
  ملتے ہیں (جیسے `--only glm,kimi`)۔ `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush` پر دستیاب ہے۔
- `--dry-run` — بالکل وہی چھاپیں جو لکھا جائے گا بغیر
  فائل سسٹم کو چھوئے۔ ہر `setup-*` کمانڈ پر دستیاب ہے **سوائے** `setup-cursor`
  (جو کبھی بھی فائل نہیں لکھتا)۔
- `--model <id>` — ضروری (یا تعامل کے ذریعے منتخب) ان ٹولز کے لیے جن میں کوئی
  ماڈل خودکار دریافت نہیں ہے: Cline, Kilo, Roo, Goose, Qwen, Aider۔ وہ ٹولز
  بھی غیر تفاعلی چلانے کے لیے `--yes` قبول کرتے ہیں (جو پھر `--model` کی ضرورت ہوتی ہے)۔
  `setup-opencode` کو اوپر والے ماڈل کو سیٹ کرنے کے لیے `--model` کی ضرورت ہوتی ہے۔
- `--model <id>` پر `omniroute run` مینیفیسٹ کے فی ہدف وائرنگ کی پیروی کرتا ہے
  (`bin/cli/cli-manifest.mjs`): **aider** کو `--model openai/<id>` ملتا ہے اور
  **opencode** کو `--model omniroute/<id>` (پری فکس صرف اس وقت شامل کیا جاتا ہے جب ID
  پہلے سے ہی اسے نہ رکھتا ہو)؛ **qwen** اور **gemini** کو ID بالکل ویسا ہی ملتا ہے؛
  **claude** کو یہ `ANTHROPIC_MODEL` کے ذریعے ملتا ہے، **goose** کو `GOOSE_MODEL` کے ذریعے، اور
  **codex** کو `-c model_providers.omniroute.*` دلائل کے ذریعے۔ **Qwen واحد رن
  ہدف ہے جس کی سختی سے `--model` کی ضرورت ہوتی ہے** — `omniroute run qwen` اس کے بغیر
  `2` کے ساتھ ایک واضح غلطی کے ساتھ ختم ہوتا ہے۔
- `--port <port>` — مقامی OmniRoute پورٹ (ڈیفالٹ `20128`، جب `--remote`
  سیٹ ہو تو نظر انداز کیا جاتا ہے)۔ تمام `setup-*` اور دونوں لانچروں پر موجود ہے۔
- `omniroute run` کے خارج ہونے کے کوڈ: بچے CLI کا اپنا خارج ہونے کا کوڈ
  ویسا ہی منتقل ہوتا ہے؛ `2` = غلط دلائل (غیر معاون ہدف، مطلوبہ
  `--model` غائب، کنٹینر گارڈ)؛ `127` = ہدف بائنری `PATH` میں نہیں ہے؛
  `130`/`143`/`129` جب لانچ کو `SIGINT`/`SIGTERM`/`SIGHUP` کے ذریعے ختم کیا جاتا ہے؛
  `1` = دیگر رن ٹائم لانچ کی ناکامی۔
- دونوں لانچر (`launch`, `launch-codex`) `--profile <name>` کو قبول کرتے ہیں تاکہ
  `setup-claude` / `setup-codex` کے ذریعے لکھی گئی پروفائل کو منتخب کریں، نیز
  بنیادی `claude` / `codex` بائنری کے لیے پاس تھرو دلائل۔

تفاعلی چنندہ بھی ترتیب کی ترکیبوں کے ذریعے مشترک ہے:

```bash
# فعال مقامی یا دور ماڈل کی کیٹلاگ سے منتخب کریں اور ہدف کو ترتیب دیں۔
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` فی الحال `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, اور `kilo` کے لیے ٹیسٹ شدہ ترکیبوں کی طرف منتقل کرتا ہے۔ IDE-صرف،
MITM، اور گائیڈ-صرف کیٹلاگ کی اندراجات واضح `setup-*`/دستی بہاؤ رہتے ہیں اور
لانچ کرنے کے قابل ہدف کے طور پر پیش نہیں کیے جاتے ہیں۔

> `setup-opencode` **ہلکی پھلکی openai-compatible** OpenCode انضمام ہے۔
> ایک امیر پلگ ان انضمام بھی موجود ہے — `omniroute setup opencode` — جو
> `@omniroute/opencode-plugin` کو انسٹال کرتا ہے۔ یہ مختلف کمانڈز ہیں؛ اوپر کی جدول
> `setup-opencode` کی دستاویزات کرتی ہے۔

---

## مقامی استعمال

جب OmniRoute `localhost:20128` پر چل رہا ہو، تو اپنے ٹول کے لیے سیٹ اپ کمانڈ چلائیں۔ کیٹلاگ مقامی سرور سے حاصل کیا جاتا ہے۔

```bash
# Codex: ہر ملے ہوئے ماڈل کے لیے پروفائل لکھیں ~/.codex/
omniroute setup-codex
codex --profile glm52            # ایک تیار کردہ پروفائل استعمال کریں

# Claude Code: ہر ماڈل کے لیے پروفائل لکھیں، پھر ایک کو شروع کریں
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: اوپن اے آئی کے ساتھ ہم آہنگ فراہم کنندہ لکھیں جس میں تمام کیٹلاگ ماڈل شامل ہوں
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} کے ذریعے حوالہ دیا گیا، کبھی بھی ڈسک پر نہیں
opencode -m omniroute/glm/glm-5.2 "..."

# خودکار دریافت کے بغیر ٹولز کے لیے ایک واضح ماڈل کی ضرورت ہے:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# کچھ بھی لکھے بغیر پیش نظارہ:
omniroute setup-continue --dry-run
```

کسی بھی کنفیگ کو لکھے بغیر شروع کریں (صرف env-injection):

```bash
omniroute launch                 # Claude Code → مقامی OmniRoute
omniroute launch-codex           # Codex CLI → مقامی OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# واضح کمانڈ راستہ: جو بھی -- کے بعد آتا ہے اسے پاس کریں
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## دور دراز استعمال

کسی بھی سیٹ اپ کمانڈ کو دور دراز OmniRoute پر `--remote` + `--api-key` کے ساتھ نشانہ بنائیں۔ کیٹلاگ دور دراز سے حاصل کیا جاتا ہے؛ کنفیگ آپ کی مقامی مشین پر لکھی جاتی ہے۔

```bash
# OpenCode ایک دور دراز VPS کے خلاف، صرف glm/kimi ماڈلز رکھیں
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # پہلے OMNIROUTE_API_KEY کو برآمد کریں

# دور دراز کیٹلاگ سے Codex پروفائلز
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# دور دراز کے خلاف براہ راست CLI شروع کریں
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

ہر بار `--remote`/`--api-key` پاس کرنے کے بجائے، ایک بار لاگ ان کریں اور **فعال سیاق** کو انہیں خود بخود فراہم کرنے دیں:

```bash
omniroute connect 192.168.0.15        # ایک مخصوص ٹوکن بناتا ہے، سیاق کو محفوظ کرتا ہے
omniroute setup-codex                 # ← اب دور دراز کیٹلاگ استعمال کرتا ہے
omniroute setup-opencode              # ← یہی
omniroute launch                      # ← Claude Code دور دراز کے خلاف
```

سیاق، دائرہ کار، اور ٹوکن انتظام کے لیے [Remote Mode](./REMOTE-MODE.md) دیکھیں۔

---

## بنیادی URL روایات (جن کی ٹولز کو `/v1` کی ضرورت ہوتی ہے)

OmniRoute اوپن اے آئی کی سطح کو `/v1` پر، اینتھروپک کی سطح کو جڑ پر، اور ایک مقامی جیمینی سطح کو `/v1beta` پر ظاہر کرتا ہے۔ ہر انضمام اس شکل میں جڑا ہوا ہے جس کی اس کا ٹول توقع کرتا ہے (کمانڈ کے ماخذ میں تصدیق شدہ):

| انضمام                                                                     | بنیادی URL لکھا گیا | `/v1`؟                                             |
| -------------------------------------------------------------------------- | ------------------- | -------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | جڑ                  | نہیں — Cline `/v1/chat/completions` شامل کرتا ہے   |
| `setup-goose` (`OPENAI_HOST`)                                              | جڑ                  | نہیں — Goose راستہ شامل کرتا ہے                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | جڑ                  | نہیں — LiteLLM `/v1/chat/completions` شامل کرتا ہے |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` کے ساتھ       | جی ہاں                                             |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | جڑ                  | نہیں — Claude Code `/v1/messages` شامل کرتا ہے     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` کے ساتھ       | جی ہاں                                             |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` کے ساتھ       | جی ہاں                                             |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | جڑ                  | نہیں — SDK `/v1beta/models/…` شامل کرتا ہے         |

---

## مقامی انحصار کو اپ ڈیٹ پر رکھنا: `--include=optional`

جب آپ `omniroute update` کے ساتھ اپ ڈیٹ کرتے ہیں (تصدیق کرنے کے بعد، یا `--apply` کے ساتھ)،
OmniRoute انسٹالیشن کو `--include=optional` کے ساتھ چلتا ہے:

```bash
npm install -g omniroute@latest --include=optional
```

یہ **نہیں** ہے ایک پرچم جو آپ `omniroute update` کو دیتے ہیں — یہ ہمیشہ اپ ڈیٹر کی طرف سے لاگو ہوتا ہے۔ یہ اس بات کی ضمانت دیتا ہے کہ `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM اسٹیک) اپ ڈیٹ کے دوران بچ جائیں گے چاہے آپ کی npm کنفیگریشن میں `omit=optional` سیٹ ہو، جو بصورت دیگر خاموشی سے مقامی SQLite ڈرائیور اور OS-keyring بائنڈنگ کو چھوڑ دے گا۔ درست کمانڈ کو بغیر لاگو کیے پیش کرنے کے لیے:

```bash
omniroute update --dry-run
# [DRY RUN] Would run: npm install -g omniroute@latest --include=optional
```

دیگر `omniroute update` پرچم (ماخذ میں تصدیق شدہ): `--check` (اگر پرانا ہو تو 1 پر نکلیں)، `--apply` (بغیر پوچھے انسٹال کریں)، `--changelog`, `--no-backup`,
`--yes`۔

---

## Google Gemini CLI کے ذریعے `omniroute run gemini`

معاہدہ `@google/gemini-cli` 0.50.0 کے خلاف تصدیق شدہ: CLI `GOOGLE_GEMINI_BASE_URL` کی عزت کرتا ہے
اور اس کے خلاف `POST /v1beta/models/<model>:generateContent`
(اور `:streamGenerateContent?alt=sse`) جاری کرتا ہے — بالکل OmniRoute کی مقامی
Gemini سطح (`/v1beta`)۔ `omniroute run gemini` یہ خود بخود جوڑتا ہے:

- `GOOGLE_GEMINI_BASE_URL` → فعال OmniRoute بیس URL (جڑ، کوئی `/v1` نہیں)؛
- `GEMINI_API_KEY` → حل شدہ OmniRoute سند (آپشن/env/context)؛
- ایک **عارضی الگ `GEMINI_CLI_HOME`** جس کا `.gemini/settings.json`
  `gemini-api-key` توثیق منتخب کرتا ہے، تاکہ محفوظ کردہ Google OAuth سیشن (Code Assist)
  کبھی بھی OmniRoute کی ہدایت کردہ لانچ کو اووررائیڈ نہ کرے — باہر نکلنے کے بعد ہٹا دیا جاتا ہے؛
- **env صفائی**: بچے کا ماحول `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` اور `GOOGLE_GENAI_USE_GCA` سے صاف کیا جاتا ہے (جو
  توثیق کو Vertex/Code Assist کی طرف موڑ دے گا)، اور `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` کو
  بیلٹ اور سسپنڈرز کے متبادل کے طور پر سیٹ کیا جاتا ہے — دوسرے `run` ہدف اپنے متضاد متغیرات کے لیے اسی
  علاج کو حاصل کرتے ہیں؛
- `--model <id>` کی انجیکشن `--provider`/`--model` سے۔

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini کا ورک اسپیس ٹرسٹ گارڈ ہیڈلیس موڈ میں بھی لاگو ہوتا ہے — `--skip-trust` پاس کریں
(یا خود انٹرایکٹیوی طور پر ڈائریکٹری پر اعتماد کریں)؛ لانچر جان بوجھ کر اس کو نظرانداز نہیں کرتا۔ یہ لانچر **ACP
رجسٹریشن** (`src/lib/acp/registry.ts`, `gemini --acp`) سے مختلف ہے، جو `/dashboard/acp-agents` کے لیے ایجنٹ پروٹوکول انضمام رہتا ہے۔

---

## حقیقی دھوئیں کی صفائی (اختیاری)

مقررہ لانچ-پلان ریگریشن CI میں چلتا ہے (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`)۔ حقیقی OmniRoute سرور کے خلاف حقیقی
بائنریز کی توثیق کرنے کے لیے، ایک اختیاری ہارنس موجود ہے
`tests/integration/upstream-cli-smoke.int.test.ts`۔ یہ خود بخود کبھی نہیں چلتا
(ہر ذیلی ٹیسٹ چھوڑ دیتا ہے جب تک کہ `RUN_CLI_SMOKE=1` نہ ہو)، سند کو env-var
NAME کے ذریعے پاس کرتا ہے (کبھی بھی قیمت کے ذریعے نہیں)، کسی بھی ریکارڈ کردہ آؤٹ پٹ سے کلیدی شکل کی سٹرنگز کو چھپاتا ہے، ان ہدفوں کو چھوڑ دیتا ہے جن کا بائنری انسٹال نہیں ہے، اور ناکامیوں کی درجہ بندی کرتا ہے
توثیق / اپ اسٹریم / کنفیگریشن کے طور پر بجائے ایک خالص بولین کے:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

اختیاری: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` صفائی کو محدود کرتا ہے؛
`OMNIROUTE_SMOKE_TIMEOUT_MS` ہر ہدف کے لیے 120 سیکنڈ کے ٹائم آؤٹ کو اووررائیڈ کرتا ہے۔

---

## مزید دیکھیں

- [Claude Code ترتیب](./CLAUDE-CODE-CONFIGURATION.md) — گہرائی میں Claude Code گائیڈ
- [Codex CLI ترتیب](./CODEX-CLI-CONFIGURATION.md) — ایک بار کی `[model_providers.omniroute]` بنیادی سیٹ اپ
- [Remote Mode](./REMOTE-MODE.md) — سیاق و سباق، مخصوص رسائی ٹوکن، ایک دور دراز سرور کو چلانا
- [CLI Tools حوالہ](../reference/CLI-TOOLS.md) — حمایت یافتہ ٹولز + ڈیش بورڈ صفحات کی مکمل فہرست
- [سیٹ اپ گائیڈ](./SETUP_GUIDE.md) — انسٹال کے طریقے اور پہلی بار چلانے کی رہنمائی
