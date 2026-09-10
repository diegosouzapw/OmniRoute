# CLI-INTEGRATIONS (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI ইন্টিগ্রেশন — OmniRoute-এ যেকোন কোডিং CLI নির্দেশ করুন"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI ইন্টিগ্রেশন

OmniRoute একটি `setup-*` কমান্ডের পরিবার সরবরাহ করে যা একটি কোডিং CLI (Codex, Claude Code, OpenCode, Cline, …) কে OmniRoute-কে তার ব্যাকএন্ড হিসেবে ব্যবহার করতে কনফিগার করে — তাই টুলটি **একটি** এন্ডপয়েন্টের সাথে কথা বলে এবং OmniRoute সঠিক প্রদানকারীর কাছে রাউট করে স্বয়ংক্রিয়ভাবে ফallback করে। প্রতিটি কমান্ড একটি চলমান OmniRoute (স্থানীয় বা দূরবর্তী) থেকে **লাইভ** মডেল ক্যাটালগ পড়ে এবং টুলের নিজস্ব কনফিগারেশন ফাইল **আপনার** মেশিনে লেখে। API কী একটি পরিবেশ ভেরিয়েবলের মাধ্যমে উল্লেখ করা হয় যেখানে টুলটি এটি সমর্থন করে। টুল-স্থানীয় পরিবেশ ফাইল সংরক্ষণকারী কমান্ডগুলি নিচে উল্লেখ করা হয়েছে।

একটি সাধারণ লঞ্চারও রয়েছে — `omniroute run <target>` — যা সঠিক পরিবেশ ইনজেক্ট করে `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` বা `gemini` চালু করে, কোন কনফিগারেশন লেখার প্রয়োজন ছাড়াই। টার্গেট এবং তাদের উপনামগুলি ক্যানোনিক্যাল ম্যানিফেস্ট `bin/cli/cli-manifest.mjs` থেকে আসে (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), এবং `omniroute completion` একই ম্যানিফেস্ট-উৎপন্ন টার্গেট শব্দগুলি অফার করে। পুরানো প্রতি-টুল লঞ্চারগুলি — `omniroute launch` (Claude Code) এবং `omniroute launch-codex` (Codex) — উপলব্ধ রয়েছে।

প্রদানকারী অনবোর্ডিং একই স্থানীয়/দূরবর্তী প্রসঙ্গে উপলব্ধ। নিচের API-প্রথম কমান্ডগুলি ব্যবস্থাপনা প্রমাণীকরণকে প্রদানকারী শংসাপত্র থেকে আলাদা রাখে এবং কখনও একটি শংসাপত্র কাঠামোগত আউটপুটে মুদ্রণ করে না:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

স্ক্রিপ্টের জন্য, `--credential-stdin` বা `--credential-env` পছন্দ করুন; `--credential` নিয়ন্ত্রিত স্থানীয় ব্যবহারের জন্য রাখা হয়েছে। `providers remove` একটি অ-ইন্টারঅ্যাকটিভ টার্মিনালে `--yes` প্রয়োজন, এবং সমস্ত পাঁচটি কমান্ড সক্রিয় প্রসঙ্গ বা গ্লোবাল `--base-url`/`--api-key` বিকল্পগুলিকে সম্মান করে।

দুইটি সবচেয়ে সমৃদ্ধ ইন্টিগ্রেশনের একবারের জন্য, হাতে লেখা বেস সেটআপের জন্য, প্রতি-টুল গভীর ডাইভগুলি দেখুন:

- [Claude Code কনফিগারেশন](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI কনফিগারেশন](./CODEX-CLI-CONFIGURATION.md)
- [দূরবর্তী মোড](./REMOTE-MODE.md) — আপনার ল্যাপটপ থেকে একটি দূরবর্তী OmniRoute (VPS / Tailnet) চালান
- [VS Code Copilot চ্যাট](./VSCODE-COPILOT.md) — OmniCopilot এক্সটেনশন; এটি সম্পাদক থেকে আপনার জন্য এই `setup-*` কমান্ডগুলি চালাতে পারে

---

## মাস্টার টেবিল

প্রতিটি কমান্ড **সক্রিয় প্রসঙ্গ** (যা `omniroute connect` দিয়ে সেট করা হয়, দেখুন [দূরবর্তী মোড](./REMOTE-MODE.md)) বা স্পষ্ট `--remote <url> --api-key <key>` ফ্ল্যাগগুলি সম্মান করে। "স্থানীয় বনাম দূরবর্তী" নিচে মানে: কোন ফ্ল্যাগ ছাড়া এটি `http://localhost:20128` লক্ষ্য করে; `--remote` (অথবা একটি সক্রিয় দূরবর্তী প্রসঙ্গ) সহ এটি সেই সার্ভার থেকে ক্যাটালগ নিয়ে আসে এবং স্থানীয়ভাবে কনফিগারেশন লেখে।

| কমান্ড                     | টুল                          | এটি কি লেখে                                                                                                                                                               | মূল ফ্ল্যাগগুলি                                                                                                                            | স্থানীয় বনাম দূরবর্তী |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — একটি সামঞ্জস্যপূর্ণ টেক্সট মডেলের জন্য একটি প্রোফাইল (`codex --profile <name>`)                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | উভয়                   |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — মিলে যাওয়া মডেলের জন্য একটি প্রোফাইল (`CLAUDE_CONFIG_DIR`)                                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | উভয়                   |
| `omniroute setup-opencode` | OpenCode (openai-compatible) | `~/.config/opencode/opencode.json` — প্রতিটি ক্যাটালগ মডেলের জন্য `omniroute` প্রদানকারী (`opencode -m omniroute/<model>`)                                                | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | উভয়                   |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI মোড) + VS Code এক্সটেনশনের সেটিংস মুদ্রণ করে                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | উভয়                   |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + যদি উপস্থিত থাকে তবে `kilocode.*` কে VS Code `settings.json` এ মিশ্রিত করে                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | উভয়                   |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — `provider: openai` মডেল, কী `${{ secrets.OMNIROUTE_API_KEY }}` এর মাধ্যমে                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | উভয়                   |
| `omniroute setup-cursor`   | Cursor                       | কিছুই নয় — ইন-অ্যাপ পদক্ষেপ মুদ্রণ করে (Cursor কনফিগারেশন অস্বচ্ছ SQLite)                                                                                                | `--remote` `--api-key` `--only` `--port`                                                                                                   | উভয়                   |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (আমদানি নথি) + যদি একটি VS Code `settings.json` বিদ্যমান থাকে তবে `roo-cline.autoImportSettingsPath` সেট করে                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | উভয়                   |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — `openai-compat` প্রদানকারী, কী `$OMNIROUTE_API_KEY` এর মাধ্যমে                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | উভয়                   |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + পরিবেশ রেসিপি মুদ্রণ করে                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | উভয়                   |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + পরিবেশ রেসিপি মুদ্রণ করে                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | উভয়                   |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4 `modelProviders.openai` অ্যারে + `OMNIROUTE_API_KEY` `~/.qwen/.env` এ                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | উভয়                   |
| `omniroute run <target>`   | রানটাইম লঞ্চ (সাধারণ)        | কিছুই নয় — সঠিক পরিবেশ এবং আর্গুমেন্ট সহ `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` চালু করে; Qwen এবং Gemini একটি অস্থায়ী বিচ্ছিন্ন বাড়ি ব্যবহার করে | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | উভয়                   |
| `omniroute launch`         | Claude Code                  | কিছুই নয় — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` ইনজেক্ট করে `claude` চালু করে                                                                                     | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | উভয়                   |
| `omniroute launch-codex`   | OpenAI Codex CLI             | কিছুই নয় — `-c` ফ্ল্যাগের মাধ্যমে `omniroute` প্রদানকারী ইনজেক্ট করে `codex` চালু করে                                                                                    | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | উভয়                   |

ফ্ল্যাগগুলির উপর নোট (কমান্ড সোর্সে যাচাই করা হয়েছে):

- `--remote <url>` — একটি দূরবর্তী OmniRoute থেকে ক্যাটালগ নিয়ে আসে (এটি `--port` এবং সক্রিয় প্রসঙ্গকে অতিক্রম করে)। `--api-key <key>` সেই সার্ভারের জন্য শংসাপত্র সরবরাহ করে (ডিফল্টভাবে `OMNIROUTE_API_KEY` পরিবেশ ভেরিয়েবল, অথবা সক্রিয় প্রসঙ্গের টোকেন)।
- `--only <patterns>` — কমা দ্বারা পৃথক সাবস্ট্রিং; শুধুমাত্র মডেল আইডি রাখুন যা মেলে (যেমন `--only glm,kimi`)। উপলব্ধ `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush` এ।
- `--dry-run` — ফাইল সিস্টেমে স্পর্শ না করে ঠিক কি লেখা হবে তা মুদ্রণ করে। প্রতিটি `setup-*` কমান্ডে উপলব্ধ **ছাড়া** `setup-cursor` (যা কখনও একটি ফাইল লেখে না)।
- `--model <id>` — প্রয়োজনীয় (অথবা ইন্টারঅ্যাকটিভভাবে নির্বাচিত) টুলগুলির জন্য যাদের মডেল স্বয়ংক্রিয় আবিষ্কার নেই: Cline, Kilo, Roo, Goose, Qwen, Aider। সেই টুলগুলি `--yes` গ্রহণ করে অ-ইন্টারঅ্যাকটিভ রানগুলির জন্য (যা তখন `--model` প্রয়োজন)। `setup-opencode` ডিফল্ট শীর্ষ স্তরের মডেল সেট করতে `--model` গ্রহণ করে।
- `--model <id>` `omniroute run` এ ম্যানিফেস্টের প্রতি-টার্গেট ওয়্যারিং অনুসরণ করে (`bin/cli/cli-manifest.mjs`): **aider** `--model openai/<id>` এবং **opencode** `--model omniroute/<id>` গ্রহণ করে (প্রিফিক্সটি কেবল তখনই যোগ করা হয় যখন আইডিটি ইতিমধ্যে এটি বহন করে না); **qwen** এবং **gemini** আইডিটি যথাযথভাবে গ্রহণ করে; **claude** এটি `ANTHROPIC_MODEL` এর মাধ্যমে পায়, **goose** `GOOSE_MODEL` এর মাধ্যমে, এবং **codex** `-c model_providers.omniroute.*` আর্গুমেন্টের মাধ্যমে। **Qwen হল একমাত্র রান টার্গেট যা কঠোরভাবে `--model` প্রয়োজন** — `omniroute run qwen` ছাড়া এটি `2` এর সাথে একটি স্পষ্ট ত্রুটি সহ বেরিয়ে আসে।
- `--port <port>` — স্থানীয় OmniRoute পোর্ট (ডিফল্ট `20128`, যখন `--remote` সেট করা হয় তখন উপেক্ষা করা হয়)। সমস্ত `setup-*` এবং উভয় লঞ্চারে উপস্থিত।
- `omniroute run` প্রস্থান কোড: শিশু CLI-এর নিজস্ব প্রস্থান কোড সঠিকভাবে প্রচারিত হয়; `2` = অবৈধ আর্গুমেন্ট (সমর্থিত টার্গেট, প্রয়োজনীয় `--model` অনুপস্থিত, কন্টেইনার গার্ড); `127` = টার্গেট বাইনারি `PATH` এ নেই; `130`/`143`/`129` যখন লঞ্চটি `SIGINT`/`SIGTERM`/`SIGHUP` দ্বারা শেষ হয়; `1` = অন্যান্য রানটাইম লঞ্চ ব্যর্থতা।
- দুটি লঞ্চার (`launch`, `launch-codex`) `setup-claude` / `setup-codex` দ্বারা লেখা একটি প্রোফাইল নির্বাচন করতে `--profile <name>` গ্রহণ করে, পাশাপাশি মৌলিক `claude` / `codex` বাইনারির জন্য পাস-থ্রু আর্গুমেন্ট।

ইন্টারঅ্যাকটিভ পিকারটি সেটআপ রেসিপিগুলির দ্বারা শেয়ার করা হয়:

```bash
# সক্রিয় স্থানীয় বা দূরবর্তী মডেল ক্যাটালগ থেকে নির্বাচন করুন এবং টার্গেট কনফিগার করুন।
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` বর্তমানে `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, এবং `kilo` এর জন্য পরীক্ষিত রেসিপিগুলিতে অর্পিত। IDE-শুধুমাত্র, MITM, এবং গাইড-শুধুমাত্র ক্যাটালগ এন্ট্রি স্পষ্ট `setup-*`/ম্যানুয়াল প্রবাহ হিসাবে রয়ে যায় এবং লঞ্চযোগ্য টার্গেট হিসাবে উপস্থাপন করা হয় না।

> `setup-opencode` হল **হালকা ওজনের openai-সামঞ্জস্যপূর্ণ** OpenCode ইন্টিগ্রেশন।
> একটি সমৃদ্ধ প্লাগইন ইন্টিগ্রেশনও রয়েছে — `omniroute setup opencode` — যা `@omniroute/opencode-plugin` ইনস্টল করে। এগুলি ভিন্ন কমান্ড; উপরের টেবিলটি `setup-opencode` ডকুমেন্ট করে।

---

## স্থানীয় ব্যবহার

`localhost:20128` এ OmniRoute চলমান থাকলে, আপনার টুলের জন্য কনফিগারেশন কমান্ড চালান। ক্যাটালগ স্থানীয় সার্ভার থেকে নেওয়া হয়।

```bash
# Codex: মেলানো মডেলের জন্য ~/.codex/ এ একটি প্রোফাইল লিখুন
omniroute setup-codex
codex --profile glm52            # একটি তৈরি করা প্রোফাইল ব্যবহার করুন

# Claude Code: মডেল অনুযায়ী প্রোফাইল লিখুন, তারপর একটি চালু করুন
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: সমস্ত ক্যাটালগ মডেল সহ openai-সঙ্গত প্রদানকারী লিখুন
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} এর মাধ্যমে উল্লেখ করা হয়েছে, কখনও ডিস্কে নয়
opencode -m omniroute/glm/glm-5.2 "..."

# স্বয়ংক্রিয় আবিষ্কার ছাড়া টুলগুলির জন্য একটি স্পষ্ট মডেল প্রয়োজন:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# কিছু লিখা ছাড়াই প্রিভিউ:
omniroute setup-continue --dry-run
```

কোনও কনফিগারেশন লিখা ছাড়াই চালু করুন (শুধু env-injection):

```bash
omniroute launch                 # Claude Code → স্থানীয় OmniRoute
omniroute launch-codex           # Codex CLI → স্থানীয় OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# স্পষ্ট কমান্ড পাথ: -- এর পরে যা আসে তা পাস করুন
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## দূরবর্তী ব্যবহার

কোনও কনফিগারেশন কমান্ডকে একটি দূরবর্তী OmniRoute এ `--remote` + `--api-key` দিয়ে নির্দেশ করুন। ক্যাটালগ দূরবর্তী থেকে নেওয়া হয়; কনফিগারেশন আপনার স্থানীয় মেশিনে লেখা হয়।

```bash
# একটি দূরবর্তী VPS এর বিরুদ্ধে OpenCode, শুধুমাত্র glm/kimi মডেল রাখুন
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # প্রথমে OMNIROUTE_API_KEY রপ্তানী করুন

# একটি দূরবর্তী ক্যাটালগ থেকে Codex প্রোফাইল
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# সরাসরি দূরবর্তী বিরুদ্ধে একটি CLI চালু করুন
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

প্রতিবার `--remote`/`--api-key` পাস করার পরিবর্তে, একবার লগ ইন করুন এবং **সক্রিয় প্রসঙ্গ** তাদের স্বয়ংক্রিয়ভাবে সরবরাহ করতে দিন:

```bash
omniroute connect 192.168.0.15        # একটি স্কোপড টোকেন তৈরি করে, প্রসঙ্গ সংরক্ষণ করে
omniroute setup-codex                 # ← এখন দূরবর্তী ক্যাটালগ ব্যবহার করে
omniroute setup-opencode              # ← একই
omniroute launch                      # ← Claude Code দূরবর্তী বিরুদ্ধে
```

প্রসঙ্গ, স্কোপ এবং টোকেন ব্যবস্থাপনার জন্য [দূরবর্তী মোড](./REMOTE-MODE.md) দেখুন।

---

## বেস URL কনভেনশন (যা টুলগুলি `/v1` চায়)

OmniRoute `/v1` এ OpenAI পৃষ্ঠাটি প্রকাশ করে, মূল পৃষ্ঠায় Anthropic পৃষ্ঠাটি এবং `/v1beta` এ একটি স্থানীয় Gemini পৃষ্ঠাটি। প্রতিটি ইন্টিগ্রেশন তার টুলের প্রত্যাশিত ফর্মে সংযুক্ত (কমান্ড সোর্সে যাচাই করা হয়েছে):

| ইন্টিগ্রেশন                                                                | বেস URL লেখা | `/v1`?                                      |
| -------------------------------------------------------------------------- | ------------ | ------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | মূল          | না — Cline `/v1/chat/completions` যোগ করে   |
| `setup-goose` (`OPENAI_HOST`)                                              | মূল          | না — Goose পাথ যোগ করে                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | মূল          | না — LiteLLM `/v1/chat/completions` যোগ করে |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` সহ     | হ্যাঁ                                       |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | মূল          | না — Claude Code `/v1/messages` যোগ করে     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` সহ     | হ্যাঁ                                       |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` সহ     | হ্যাঁ                                       |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | মূল          | না — SDK `/v1beta/models/…` যোগ করে         |

---

## নেটিভ ডিপেন্ডেন্সি আপডেট রাখা: `--include=optional`

যখন আপনি `omniroute update` দিয়ে আপডেট করেন (নিশ্চিত করার পরে, অথবা `--apply` দিয়ে),
OmniRoute `--include=optional` সহ ইনস্টল চালায়:

```bash
npm install -g omniroute@latest --include=optional
```

এটি `omniroute update` এ আপনি যে ফ্ল্যাগটি পাস করেন তা **নয়** — এটি সর্বদা আপডেটারের দ্বারা প্রয়োগ করা হয়। এটি নিশ্চিত করে যে `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM স্ট্যাক) আপডেটের সময় টিকে থাকে, এমনকি যদি আপনার npm কনফিগারেশনে
`omit=optional` সেট করা থাকে, যা অন্যথায় নীরবে নেটিভ SQLite ড্রাইভার এবং OS-keyring বাইন্ডিং মুছে ফেলবে। সঠিক কমান্ডটি প্রিভিউ করতে, প্রয়োগ না করে:

```bash
omniroute update --dry-run
# [DRY RUN] চালানো হবে: npm install -g omniroute@latest --include=optional
```

অন্যান্য `omniroute update` ফ্ল্যাগ (সোর্সে যাচাই করা হয়েছে): `--check` (পুরনো হলে 1 এ বেরিয়ে যাবে), `--apply` (প্রম্পট ছাড়াই ইনস্টল), `--changelog`, `--no-backup`,
`--yes`।

---

## Google Gemini CLI `omniroute run gemini` এর মাধ্যমে

`@google/gemini-cli` 0.50.0 এর বিরুদ্ধে চুক্তি যাচাই করা হয়েছে: CLI `GOOGLE_GEMINI_BASE_URL` কে সম্মান করে
এবং `POST /v1beta/models/<model>:generateContent`
(এবং `:streamGenerateContent?alt=sse`) এর বিরুদ্ধে জারি করে — ঠিক OmniRoute এর নেটিভ
Gemini সারফেস (`/v1beta`)। `omniroute run gemini` এটি স্বয়ংক্রিয়ভাবে সংযুক্ত করে:

- `GOOGLE_GEMINI_BASE_URL` → সক্রিয় OmniRoute বেস URL (মূল, `/v1` নেই);
- `GEMINI_API_KEY` → সমাধানকৃত OmniRoute শংসাপত্র (অপশন/env/প্রেক্ষাপট);
- একটি **অস্থায়ী বিচ্ছিন্ন `GEMINI_CLI_HOME`** যার `.gemini/settings.json`
  `gemini-api-key` প্রমাণীকরণ নির্বাচন করে, যাতে একটি সংরক্ষিত Google OAuth সেশন (Code Assist)
  কখনও OmniRoute-নির্দেশিত লঞ্চকে অতিক্রম না করে — প্রস্থান করার পরে মুছে ফেলা হয়;
- **env স্বাস্থ্যবিধি**: শিশু পরিবেশ `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` এবং `GOOGLE_GENAI_USE_GCA` থেকে পরিষ্কার করা হয় (যা প্রমাণীকরণকে
  Vertex/Code Assist এ পুনঃনির্দেশ করবে), এবং `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` একটি
  বেল্ট-এবং-সাসপেন্ডার ব্যাকআপ হিসাবে সেট করা হয় — অন্যান্য `run` লক্ষ্য তাদের নিজস্ব
  বিরোধী ভেরিয়েবলের জন্য একই চিকিত্সা পায়;
- `--model <id>` ইনজেকশন `--provider`/`--model` থেকে।

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini এর কর্মস্থান-ভরসা গার্ড এখনও হেডলেস মোডে প্রযোজ্য — `--skip-trust` পাস করুন
(অথবা ইন্টারেক্টিভভাবে ডিরেক্টরিটি বিশ্বাস করুন); লঞ্চার এটি বাইপাস করতে ইচ্ছাকৃতভাবে করে না। এই লঞ্চার **ACP নিবন্ধন** (`src/lib/acp/registry.ts`, `gemini --acp`) থেকে আলাদা,
যা `/dashboard/acp-agents` এর জন্য এজেন্ট-প্রোটোকল ইন্টিগ্রেশন হিসেবে রয়ে যায়।

---

## বাস্তব ধোঁয়াSweep (অপ্ট-ইন)

CI তে নির্ধারক লঞ্চ-প্ল্যান রিগ্রেশন চালায় (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`)। একটি বাস্তব OmniRoute সার্ভারের বিরুদ্ধে REAL বাইনারিগুলি যাচাই করতে,
একটি অপ্ট-ইন হার্নেস রয়েছে `tests/integration/upstream-cli-smoke.int.test.ts` এ। এটি স্বয়ংক্রিয়ভাবে কখনও চলে না
(প্রতিটি সাব-টেস্ট `RUN_CLI_SMOKE=1` ছাড়া স্কিপ করে), পরিবেশ-ভেরিয়েবল
নাম দ্বারা শংসাপত্রটি পাস করে (মূল্য দ্বারা কখনও নয়), রেকর্ড করা আউটপুট থেকে কী-আকৃতির স্ট্রিংগুলি মুছে ফেলে, ইনস্টল করা নেই এমন বাইনারির লক্ষ্যগুলি স্কিপ করে, এবং ব্যর্থতাগুলিকে
প্রমাণীকরণ / আপস্ট্রিম / কনফিগারেশন হিসাবে শ্রেণীবদ্ধ করে, একটি খালি বুলিয়ান নয়:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

ঐচ্ছিক: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` Sweep সীমাবদ্ধ করে;
`OMNIROUTE_SMOKE_TIMEOUT_MS` প্রতি লক্ষ্য 120 সেকেন্ডের টাইমআউটকে ওভাররাইড করে।

## আরও দেখুন

- [Claude Code কনফিগারেশন](./CLAUDE-CODE-CONFIGURATION.md) — গভীর Claude Code গাইড
- [Codex CLI কনফিগারেশন](./CODEX-CLI-CONFIGURATION.md) — একবারের জন্য `[model_providers.omniroute]` বেস সেটআপ
- [রিমোট মোড](./REMOTE-MODE.md) — প্রসঙ্গ, স্কোপড অ্যাক্সেস টোকেন, একটি রিমোট সার্ভার চালানো
- [CLI টুলস রেফারেন্স](../reference/CLI-TOOLS.md) — সমর্থিত টুলগুলোর পূর্ণ ক্যাটালগ + ড্যাশবোর্ড পৃষ্ঠা
- [সেটআপ গাইড](./SETUP_GUIDE.md) — ইনস্টল পদ্ধতি এবং প্রথমবারের অনবোর্ডিং
