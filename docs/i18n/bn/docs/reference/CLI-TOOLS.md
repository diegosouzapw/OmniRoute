# CLI-TOOLS (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI Tools — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Tools — OmniRoute

শেষ আপডেট: 2026-08-18

OmniRoute তিনটি ক্যাটাগরির CLI টুলের সাথে সংযুক্ত যা তিনটি নির্দিষ্ট ড্যাশবোর্ড পৃষ্ঠায় ছড়িয়ে রয়েছে:

| পৃষ্ঠা          | রুট                     | ধারণা                                                                                  | সংখ্যা             |
| --------------- | ----------------------- | -------------------------------------------------------------------------------------- | ------------------ |
| **CLI কোডের**   | `/dashboard/cli-code`   | কোডিং টুল যা আপনি OmniRoute এ নির্দেশ করেন (ক্লায়েন্ট → CLI → OmniRoute → প্রদানকারী) | 26                 |
| **CLI এজেন্টস** | `/dashboard/cli-agents` | স্বায়ত্তশাসিত এজেন্ট যা আপনি OmniRoute এ নির্দেশ করেন (একই প্রবাহ, বিস্তৃত পরিধি)     | 8                  |
| **ACP এজেন্টস** | `/dashboard/acp-agents` | CLIs যা OmniRoute ব্যাকএন্ড হিসেবে stdio/ACP এর মাধ্যমে তৈরি করে (বিপরীত প্রবাহ)       | রেজিস্ট্রিতে দেখুন |

লিগ্যাসি রুটগুলি 308 এর মাধ্যমে পুনঃনির্দেশ করে: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`।

---

## এটি কিভাবে কাজ করে

```
CLI কোডের / CLI এজেন্টস (ব্যবহার প্রবাহ):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (সব OmniRoute এ নির্দেশ করে)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute সঠিক প্রদানকারীর কাছে রুট করে)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP এজেন্টস (বিপরীত স্পন প্রবাহ):
    ক্লায়েন্টের অনুরোধ → OmniRoute → stdio/ACP এর মাধ্যমে CLI তৈরি করে → প্রতিক্রিয়া
```

**সুবিধাসমূহ:**

- সমস্ত টুল পরিচালনার জন্য একটি API কী
- ড্যাশবোর্ডে সমস্ত CLI এর মধ্যে খরচ ট্র্যাকিং
- প্রতিটি টুল পুনঃকনফিগার না করেই মডেল পরিবর্তন
- স্থানীয় এবং দূরবর্তী সার্ভারে কাজ করে (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## `setup-*` এর সাথে স্বয়ংক্রিয় কনফিগার করুন

আপনাকে প্রতিটি টুলের কনফিগারেশন হাতে লিখতে হবে না। OmniRoute একটি `setup-*`
কমান্ড সরবরাহ করে প্রতি সমর্থিত CLI এর জন্য যা একটি চলমান
OmniRoute (স্থানীয় বা দূরবর্তী) থেকে **লাইভ** মডেল ক্যাটালগ পড়ে এবং আপনার মেশিনে টুলের নিজস্ব কনফিগারেশন লেখে:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

প্রতিটি `--remote <url> --api-key <key>` গ্রহণ করে (একটি স্থানীয় টুলকে একটি
দূরবর্তী OmniRoute এর বিরুদ্ধে কনফিগার করতে), `--dry-run` (লেখার আগে প্রিভিউ), এবং `--port`। মডেল স্বয়ংক্রিয় আবিষ্কার ছাড়া টুলগুলি (Cline, Kilo, Roo, Goose, Aider, Qwen) `--model <id>` গ্রহণ করে (এবং `--yes` অ-ইন্টারঅ্যাকটিভ রানগুলির জন্য)। সঠিক পরিবেশ ইনজেক্ট করে এবং কোনও কনফিগারেশন লেখা ছাড়াই একটি CLI চালু করতে, সাধারণ
`omniroute run <target>` লঞ্চার ব্যবহার করুন (claude, codex, aider, goose, opencode, qwen,
gemini — লক্ষ্য এবং উপনামগুলি `bin/cli/cli-manifest.mjs` থেকে আসে); লিগ্যাসি
প্রতি-টুল লঞ্চারগুলি `omniroute launch` (Claude Code) এবং `omniroute launch-codex`
(Codex) উপলব্ধ রয়েছে। Gemini CLI শুধুমাত্র লঞ্চ-অনলি: এটি একটি `omniroute run`
লক্ষ্য কিন্তু এর কোনও `setup-*`/`configure` রেসিপি নেই।

> **সম্পূর্ণ রেফারেন্স:** মাস্টার টেবিল — প্রতিটি কমান্ড কী লেখে, প্রতিটি পতাকা,
> স্থানীয় বনাম দূরবর্তী, এবং কোন টুলগুলি `/v1` সাফিক্স চায় — এটি
> **[CLI Integrations](../guides/CLI-INTEGRATIONS.md)** এ রয়েছে।

### একটি কনটেইনারের ভিতরে এগুলি চালানো

OmniRoute কনটেইনারের ভিতরে কার্যকর করা একটি `setup-*` কমান্ড কনটেইনারের নিজস্ব হোমে লেখে, যা কোনও হোস্ট CLI পড়ে না এবং যা কনটেইনারের সাথে অদৃশ্য হয়ে যায়। OmniRoute এটি সনাক্ত করে এবং লেখার পরিবর্তে নির্দেশনা সহ `2` এ বেরিয়ে আসে। এগিয়ে যাওয়ার দুটি সমর্থিত উপায় — হোস্টে CLI ইনস্টল করুন এবং
`omniroute connect` কনটেইনারে, অথবা কনফিগারেশন ডিরেক্টরিগুলি বাইন্ড-মাউন্ট করুন এবং `CLI_CONFIG_HOME` সেট করুন (কম্পোজ `host` প্রোফাইল)। প্রতিটি `setup-*` কমান্ড, পাশাপাশি
`omniroute configure` এবং `omniroute config set`, গ্রহণ করে
`--allow-container-write` যখন কনটেইনারের নিজস্ব CLIs কনফিগার করা আপনার আসল উদ্দেশ্য ছিল; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` সার্ভারের জন্য একই কাজ করে। দেখুন
[Docker Guide → Configuring host CLI tools](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker)।

ড্যাশবোর্ডের **প্রয়োগ এন্ডপয়েন্ট** (`POST /api/cli-tools/apply`) একই সুরক্ষা প্রয়োগ করে: একটি কনটেইনারে, একটি লেখার লক্ষ্য যা হোস্ট থেকে বাইন্ড-মাউন্ট করা হয়নি **`422`** এর সাথে উত্তর দেয় `containerEphemeralTarget: true`, নিরাপদ ত্রুটি
টেক্সট এবং — যেসব টুলের একটি হোস্ট রেসিপি রয়েছে (claude, codex, opencode, cline,
kilo, continue) — একটি `hostSetupCommand` (যেমন `omniroute setup-opencode`) যা পরিবর্তে হোস্টে চালাতে হবে; কিছুই লেখা হয় না। `dryRun: true` কনটেইনার মোডে কাজ করে এবং ডিস্কে স্পর্শ না করে উত্পন্ন সামগ্রী + লক্ষ্য পাথ ফেরত দেয়, তাই আপনি ড্যাশবোর্ড থেকে প্রিভিউ করতে পারেন এবং হোস্টে প্রয়োগ করতে পারেন। এই আচরণটি ইচ্ছাকৃত এবং
`tests/unit/api/cli-tools/apply-container-guard.test.ts` দ্বারা রিগ্রেশন-গার্ডেড — কখনও "ফিক্স" করবেন না একটি 422 কে সুরক্ষা অপসারণ করে।

---

## সত্যের উৎস

একক ক্যাটালগটি `src/shared/constants/cliTools.ts` এ `CLI_TOOLS: Record<string, CliCatalogEntry>` হিসেবে বিদ্যমান।

প্রতিটি এন্ট্রির এই ক্ষেত্রগুলি রয়েছে (যা `src/shared/schemas/cliCatalog.ts` এ সংজ্ঞায়িত):

| ক্ষেত্র                                         | প্রকার                                                       | বর্ণনা                                                  |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | টুলটি কোন পৃষ্ঠায় প্রদর্শিত হয়                        |
| `vendor`                                        | `string`                                                     | টুলের উৎস ("Anthropic", "OSS (P. Gauthier)")            |
| `acpSpawnable`                                  | `boolean`                                                    | ACP এজেন্ট হিসেবেও ব্যবহারযোগ্য (ব্যাজ প্রদর্শিত)       |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | কাস্টম এন্ডপয়েন্ট সমর্থন স্তর। `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | কনফিগারেশন প্রক্রিয়া                                   |
| `id`, `name`, `color`, `description`, `docsUrl` | স্ট্যান্ডার্ড                                                | মূল প্রদর্শন ক্ষেত্র                                    |

যেসব এন্ট্রির `baseUrlSupport: "none"` রয়েছে সেগুলি **ড্যাশবোর্ড পৃষ্ঠায় প্রদর্শিত হয় না** — সেগুলি পরিকল্পনা 11 এর জন্য MITM backlog এ নিবন্ধিত হয় (দেখুন `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`)।

### সক্ষমতা স্তর (ক্যাটালগ করা × সনাক্তযোগ্য × কনফিগারযোগ্য × চালু করা যায়)

প্রতিটি ক্যাটালগ করা টুল সনাক্তযোগ্য, কনফিগারযোগ্য বা চালু করা যায় না। প্রতিটি স্তরের একটি
ঘোষণাকারী উৎস রয়েছে, এবং একটি ড্রিফট পরীক্ষা সেগুলিকে সঙ্গতিপূর্ণ রাখে:

| স্তর              | অর্থ                                                                  | ঘোষিত হয়েছে                                                       |
| ----------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **ক্যাটালগ করা**  | ড্যাশবোর্ড ক্যাটালগে প্রদর্শিত হয় (নাম, বিক্রেতা, ডকস, কনফিগ টাইপ)   | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                   |
| **সনাক্তযোগ্য**   | বাইনারি/কনফিগ সনাক্তকরণ, স্বাস্থ্য পরীক্ষা, কনফিগ পাথ                 | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` রানটাইম ক্যাটালগ) |
| **কনফিগারযোগ্য**  | `omniroute configure <cli>` দ্বারা সমর্থিত (সেটআপ রেসিপি বিদ্যমান)    | `bin/cli/cli-manifest.mjs` (`configure: true`)                     |
| **চালু করা যায়** | `omniroute run <target>` দ্বারা সমর্থিত (env/args ইনজেকশন সংজ্ঞায়িত) | `bin/cli/cli-manifest.mjs` (`run: true`)                           |

`bin/cli/cli-manifest.mjs` হল CLI কমান্ডের জন্য ক্যানোনিকাল এক্সিকিউটেবল ম্যানিফেস্ট
পৃষ্ঠাগুলি: `run`, `configure` এবং শেল-সম্পূর্ণতা জেনারেটরগুলি সমস্ত তাদের
লক্ষ্য তালিকা, উপনাম সমাধান (যেমন `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
এবং `--model` ফ্ল্যাগ সংযোগ থেকে এটি থেকে উদ্ভূত হয়। ড্রিফট গার্ড
`tests/unit/cli/cli-manifest-drift.test.ts` নিশ্চিত করে যে ম্যানিফেস্ট, রানটাইম
ক্যাটালগ, UI ক্যাটালগ এবং প্রতিটি ভোক্তা পৃষ্ঠাগুলি সিঙ্কে থাকে — একটি লক্ষ্য একটিতে যোগ করা
পৃষ্ঠায় অন্যদের ছাড়া পরীক্ষাটি ব্যর্থ হয়, নিঃশব্দে ড্রিফট করার পরিবর্তে।

## 1. CLI কোডের ক্যাটালগ (২৬টি টুল)

সব টুল যা `/dashboard/cli-code` এ উপস্থিত। যেগুলোর `baseUrlSupport: none` সেগুলো MITM বা একটি ম্যানুয়াল গাইডের মাধ্যমে সংযুক্ত করা হয়েছে কাস্টম বেস URL এর পরিবর্তে:

| id           | নাম                         | বিক্রেতা            | baseUrlSupport | configType     | acpSpawnable |
| ------------ | --------------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | ক্লড কোড                    | অ্যানথ্রোপিক        | পূর্ণ          | env            | সত্য         |
| codex        | OpenAI Codex CLI            | OpenAI              | পূর্ণ          | কাস্টম         | সত্য         |
| zcode        | ZCode (GLM কোডিং পরিকল্পনা) | Z.ai                | নেই            | কাস্টম         | মিথ্যা       |
| cline        | ক্লাইন                      | OSS (ex-Claude Dev) | পূর্ণ          | কাস্টম         | সত্য         |
| kilo         | কিলো কোড                    | কিলো-অর্গ           | পূর্ণ          | কাস্টম         | মিথ্যা       |
| roo          | রু কোড                      | রু (OSS)            | পূর্ণ          | গাইড           | মিথ্যা       |
| continue     | কন্টিনিউ                    | continue.dev        | পূর্ণ          | গাইড           | মিথ্যা       |
| aider        | এইডার                       | OSS (P. Gauthier)   | পূর্ণ          | গাইড           | সত্য         |
| forge        | ফোর্জকোড                    | অ্যান্টিনমি HQ      | পূর্ণ          | কাস্টম         | সত্য         |
| jcode        | জেকোড                       | 1jehuang (OSS)      | পূর্ণ          | কাস্টম         | মিথ্যা       |
| deepseek-tui | ডীপসিক TUI                  | হান্টার বাউন (OSS)  | পূর্ণ          | কাস্টম         | মিথ্যা       |
| codewhale    | কোডওয়েল                    | এইচএমবাউন (OSS)     | পূর্ণ          | কাস্টম         | মিথ্যা       |
| opencode     | ওপেনকোড                     | অ্যানোমালি (ex-SST) | পূর্ণ          | গাইড           | সত্য         |
| droid        | ফ্যাক্টরি ড্রয়েড           | ফ্যাক্টরি AI        | আংশিক          | গাইড           | মিথ্যা       |
| copilot      | গিটহাব কোপাইলট CLI          | গিটহাব/MS           | পূর্ণ          | কাস্টম         | মিথ্যা       |
| cursor-cli   | কার্সর CLI                  | অ্যানিস্ফিয়ার      | আংশিক          | গাইড           | সত্য         |
| smelt        | স্মেল্ট                     | লিওনার্ডসার (OSS)   | পূর্ণ          | কাস্টম         | মিথ্যা       |
| pi           | পাই (পাই-কোডিং-এজেন্ট)      | এম. জেচনার (OSS)    | পূর্ণ          | কাস্টম         | মিথ্যা       |
| grok-build   | গ্রোক বিল্ড                 | xAI                 | পূর্ণ          | কাস্টম         | মিথ্যা       |
| crush        | ক্রাশ                       | OSS (চার্ম)         | পূর্ণ          | কাস্টম         | মিথ্যা       |
| qwen         | কিউয়েন কোড                 | আলিবাবা             | পূর্ণ          | গাইড           | সত্য         |
| cursor       | কার্সর                      | অ্যানিস্ফিয়ার      | নেই            | গাইড           | মিথ্যা       |
| antigravity  | অ্যান্টিগ্রাভিটি            | গুগল                | নেই            | mitm           | মিথ্যা       |
| hermes       | হার্মিস                     | নাউস রিসার্চ        | নেই            | গাইড           | মিথ্যা       |
| kiro         | কিরো AI                     | অ্যামাজন            | নেই            | mitm           | মিথ্যা       |
| custom       | কাস্টম CLI                  | —                   | পূর্ণ          | কাস্টম-বিল্ডার | মিথ্যা       |

`baseUrlSupport: "partial"` সহ টুলগুলি ড্যাশবোর্ড কার্ডে "⚠ বেস URL আংশিক" একটি ব্যাজ প্রদর্শন করে।

## 2. CLI এজেন্টের ক্যাটালগ (৮টি টুল)

স্বায়ত্তশাসিত এজেন্টগুলি `/dashboard/cli-agents` এ উপস্থিত:

| id           | নাম                | বিক্রেতা                 | baseUrlSupport | acpSpawnable |
| ------------ | ------------------ | ------------------------ | -------------- | ------------ |
| hermes-agent | হার্মেস এজেন্ট     | Nous Research            | পূর্ণ          | মিথ্যা       |
| openclaw     | ওপেনক্ল আইন        | OSS (P. স্টেইনবার্গ)     | পূর্ণ          | সত্য         |
| goose        | গুজ                | ব্লক / লিনাক্স ফাউন্ডেশন | পূর্ণ          | সত্য         |
| interpreter  | ওপেন ইন্টারপ্রেটার | OSS                      | পূর্ণ          | সত্য         |
| warp         | ওয়ার্প এআই        | ওয়ার্প ইনক.             | আংশিক          | সত্য         |
| agent-deck   | এজেন্ট ডেক         | asheshgoplani (OSS)      | পূর্ণ          | মিথ্যা       |
| omp          | ওহ মাই পাই         | OSS                      | পূর্ণ          | সত্য         |
| letta        | লেটা CLI           | লেটা                     | পূর্ণ          | মিথ্যা       |

---

## 3. ACP এজেন্ট (/dashboard/acp-agents)

এই পৃষ্ঠা (যা `/dashboard/agents` থেকে নাম পরিবর্তন করা হয়েছে) CLIs দেখায় যা OmniRoute **স্পন** করতে পারে ব্যাকএন্ড এক্সিকিউশন ইঞ্জিন হিসাবে stdio/ACP প্রোটোকল মাধ্যমে। ক্যাটালগটি আলাদাভাবে `src/lib/acp/registry.ts` এ রক্ষণাবেক্ষণ করা হয় এবং এটি `CLI_TOOLS` এর সমান **নয়**।

---

## 4. MITM ব্যাকলগ (ড্যাশবোর্ডে প্রদর্শিত হয় না)

নিচের CLIs গুলি কাস্টম বেস URL স্বাভাবিকভাবে সমর্থন করে না এবং CLI কোডের বা CLI এজেন্টের পৃষ্ঠায় **তালিকাভুক্ত নয়**। এগুলি পরিকল্পনা ১১ এ MITM হস্তক্ষেপের জন্য প্রার্থী:

| CLI                 | কারণ                                                   |
| ------------------- | ------------------------------------------------------ |
| windsurf            | BYOK নির্বাচিত ক্লড মডেল + কর্পোরেট URL/token সীমাবদ্ধ |
| amp                 | বন্ধ ইকোসিস্টেম (Sourcegraph)                          |
| amazon-q / kiro-cli | AWS SSO প্রমাণীকরণ, কাস্টম URL নেই                     |
| cowork              | অ্যানথ্রোপিক ডেস্কটপ, কনফিগারযোগ্য এন্ডপয়েন্ট নেই     |

সম্পূর্ণ ক্রস-রেফারেন্সের জন্য `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` দেখুন।

---

## 5. ব্যাচ ডিটেকশন API

সমস্ত টুল ডিটেকশন একটি একক এন্ডপয়েন্টের মাধ্যমে একত্রিত হয়:

**`GET /api/cli-tools/all-statuses`**

- অথরাইজেশন: `requireCliToolsAuth(request)` (অন্যান্য `/api/cli-tools/` রুটের মতো)
- রিটার্ন: `Record<toolId, ToolBatchStatus>` (টাইপ: `src/shared/types/cliBatchStatus.ts`)
- কৌশল: `Promise.all` সমস্ত টুলের উপর, প্রতি টুলে ৫ সেকেন্ডের টাইমআউট
- ক্যাশে: ইন-মেমরি LRU কনফিগারেশন ফাইল `mtime` দ্বারা সূচীকৃত। mtime পরিবর্তিত হলে ক্যাশে অবৈধ হয়। সার্ভার পুনরায় চালু হলে রিসেট হয়।

প্রতি টুলের জন্য প্রতিক্রিয়া আকার:

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
  error?: string; // স্যানিটাইজড, কোন স্ট্যাক ট্রেস নেই
}
```

## 6. নতুন টুলের জন্য সেটিংস হ্যান্ডলার

`configType: "custom"` সহ নতুন টুলগুলির জন্য নির্দিষ্ট সেটিংস API রুট রয়েছে:

| রুট                                         | টুল                                                               |
| ------------------------------------------- | ----------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                           |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url ফ্ল্যাগ)                                        |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, পুরনো)                             |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, প্রাথমিক + পুরনো `~/.deepseek` সিঙ্ক) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                             |
| `POST /api/cli-tools/pi-settings`           | Pi কোডিং এজেন্ট                                                   |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)             |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + নির্দিষ্ট `.env` কী)         |

সমস্ত রুট `sanitizeErrorMessage()` ব্যবহার করে ত্রুটি প্রতিক্রিয়ার জন্য (Hard Rule #12)।

---

## 7. ড্যাশবোর্ড পৃষ্ঠার স্থাপত্য

### CLI কোডের (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — সার্ভার কম্পোনেন্ট
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — ক্লায়েন্ট গ্রিড
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — টুলের বিস্তারিত পৃষ্ঠা
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12টি বিশেষায়িত টুল কার্ড + `ToolDetailClient.tsx`

### CLI এজেন্টস (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — সার্ভার কম্পোনেন্ট
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — ক্লায়েন্ট গ্রিড
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — `ToolDetailClient` পুনরায় ব্যবহার করে

### ACP এজেন্টস (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — সার্ভার কম্পোনেন্ট (এজেন্টস/ থেকে স্থানান্তরিত)

### শেয়ার্ড UI কম্পোনেন্টস (`src/shared/components/cli/`)

| ফাইল                    | উদ্দেশ্য                                                |
| ----------------------- | ------------------------------------------------------- |
| `CliToolCard.tsx`       | স্মার্ট স্ট্যাটাস কার্ড (ডিটেকশন + কনফিগ + এন্ডপয়েন্ট) |
| `CliConceptCard.tsx`    | প্রতি পৃষ্ঠার ধারণা ব্যাখ্যা কার্ড                      |
| `CliComparisonCard.tsx` | CLI প্রকারগুলির মধ্যে তিন কলামের তুলনা                  |
| `BaseUrlSelect.tsx`     | এন্ডপয়েন্ট ড্রপডাউন (লোকাল/ক্লাউড/কাস্টম)              |
| `ApiKeySelect.tsx`      | API কী সিলেক্টর                                         |
| `ManualConfigModal.tsx` | কপি করার জন্য কনফিগ স্নিপেট মডাল                        |

### শেয়ার্ড হুক (`src/shared/hooks/cli/`)

| ফাইল                      | উদ্দেশ্য                                                                |
| ------------------------- | ----------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | `/api/cli-tools/all-statuses` ফেচ করে, লোডিং/রিফ্রেশ স্টেট পরিচালনা করে |

---

## 8. i18n

নতুন নামস্থানগুলি পরিকল্পনা 14 F9-এ যোগ করা হয়েছে:

| Namespace   | Purpose                                                                      |
| ----------- | ---------------------------------------------------------------------------- |
| `cliCommon` | শেয়ার করা স্ট্রিং (কার্ড লেবেল, ধারণা/তুলনা টেক্সট, বিস্তারিত পৃষ্ঠা লেবেল) |
| `cliCode`   | CLI কোডের পৃষ্ঠা স্ট্রিং                                                     |
| `cliAgents` | CLI এজেন্টস পৃষ্ঠা স্ট্রিং                                                   |
| `acpAgents` | ACP এজেন্টস পৃষ্ঠা স্ট্রিং                                                   |

পূর্ণ PT-BR এবং EN অনুবাদ প্রদান করা হয়েছে। 39 অন্যান্য লোকাল স্বয়ংক্রিয়ভাবে EN-এ ফিরে যায় `src/i18n/request.ts`-এ নামস্থান-স্তরের মার্জের মাধ্যমে।

---

## 9. দ্রুত শুরু

### পদক্ষেপ 1 — একটি OmniRoute API কী পান

1. `/dashboard/api-manager` খুলুন → **API কী তৈরি করুন**
2. একটি নাম দিন (যেমন `cli-tools`) এবং সমস্ত অনুমতি নির্বাচন করুন
3. কীটি কপি করুন — আপনাকে নিচের প্রতিটি CLI-এর জন্য এটি প্রয়োজন হবে

> আপনার কী এরূপ দেখায়: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### পদক্ষেপ 2 — CLI টুলগুলি ইনস্টল করুন

সমস্ত npm-ভিত্তিক টুলের জন্য Node.js 22.22.2+ বা 24.x প্রয়োজন:

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
cargo install smelt  # Rust-based

# Pi coding agent
# see https://github.com/zechnerj/pi-coding-agent for install

# jcode
# see https://github.com/1jehuang/jcode for install
```

---

### পদক্ষেপ 3 — ড্যাশবোর্ডের মাধ্যমে কনফিগার করুন

1. `http://localhost:20128/dashboard/cli-code` এ যান
2. গ্রিডে আপনার টুলটি খুঁজুন
3. টুলের বিস্তারিত পৃষ্ঠা খুলতে কার্ডে ক্লিক করুন
4. আপনার API কী এবং বেস URL নির্বাচন করুন
5. **কনফিগ প্রয়োগ করুন** বা ম্যানুয়াল কনফিগ স্নিপেট কপি করুন

---

### পদক্ষেপ 4 — গ্লোবাল এনভায়রনমেন্ট ভেরিয়েবল সেট করুন

```bash
# OmniRoute Universal Endpoint
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI reads GOOGLE_GEMINI_BASE_URL at the ROOT (its SDK appends /v1beta/... itself)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> একটি **রিমোট সার্ভার** এর জন্য `localhost:20128` কে সার্ভারের IP বা ডোমেইন দিয়ে প্রতিস্থাপন করুন,
> যেমন `http://<your-server-ip>:20128`।

---

### পদক্ষেপ 4 — প্রতিটি টুল কনফিগার করুন

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

Claude Code-এর জন্য একক Anthropic গেটওয়ে রুট ব্যবহার করুন। এখানে `/v1` যোগ করবেন না।

**পরীক্ষা:** `claude "say hello"`

---

#### OpenAI Codex

মডার্ন Codex (v0.137+) শুধুমাত্র `~/.codex/config.toml` পড়ে — পুরানো
`config.yaml` লিগ্যাসি npm CLI-এর জন্য এবং নীরবে উপেক্ষা করা হয়। API
কী `OMNIROUTE_API_KEY` এনভায়রনমেন্ট ভেরিয়েবলে (`env_key`) থাকে, কখনও
ফাইলে নয়:

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

পূর্ণ রেফারেন্স (প্রোফাইল, `wire_api`, প্রসঙ্গ উইন্ডো): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md)।

**পরীক্ষা:** `codex "what is 2+2?"`

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

**পরীক্ষা:** `opencode`

> চিন্তার ভেরিয়েন্ট পাঠানোর জন্য `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high` ব্যবহার করুন।

---

#### Cline (CLI বা VS Code)

**CLI মোড:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code মোড:**
Cline এক্সটেনশন সেটিংস → API প্রদানকারী: `OpenAI Compatible` → বেস URL: `http://localhost:20128/v1`

অথবা OmniRoute ড্যাশবোর্ড ব্যবহার করুন → **CLI Tools → Cline → Apply Config**।

---

#### KiloCode (CLI বা VS Code)

**CLI মোড:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code সেটিংস:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

অথবা OmniRoute ড্যাশবোর্ড ব্যবহার করুন → **CLI Tools → KiloCode → Apply Config**।

---

#### Continue (VS Code Extension)

`~/.continue/config.yaml` সম্পাদনা করুন:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

সম্পাদনার পর VS Code পুনরায় চালু করুন।

---

#### VS Code Insiders (`chatLanguageModels.json`)

যখন VS Code Insiders কাস্টম এন্ডপয়েন্ট মডেলের জন্য কনফিগার করা হয় এবং আপনি OmniRoute-কে কাস্টম হেডার ফিল্ড ছাড়াই কাজ করতে চান তখন এটি ব্যবহার করুন।

**প্রস্তাবিত অবস্থান:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**টোকেনাইজড OmniRoute অ্যালিয়াস ব্যবহার করে উদাহরণ:**

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

**নোট:**

- `sk-your-omniroute-key` কে OmniRoute-এ তৈরি করা একটি API কী দিয়ে প্রতিস্থাপন করুন।
- `url` ক্ষেত্রটি `/api/v1/vscode/{token}/chat/completions` নির্দেশ করা উচিত।
- `modelsUrl` ক্ষেত্রটি `/api/v1/vscode/{token}/models` নির্দেশ করা উচিত।
- ক্লায়েন্ট কাস্টম হেডার সমর্থন করলে সাধারণ `/v1` + Bearer হেডার প্রবাহকে অগ্রাধিকার দিন।
- URL-এ এম্বেড করা টোকেনগুলি একটি সামঞ্জস্যপূর্ণ ব্যাকআপ এবং সম্পাদক লগ বা প্রক্সি ইতিহাসে প্রদর্শিত হতে পারে।

---

#### Kiro CLI (Amazon)

```bash
# আপনার AWS/Kiro অ্যাকাউন্টে লগইন করুন:
kiro-cli login

# CLI তার নিজস্ব অথেন্টিকেশন ব্যবহার করে — Kiro CLI-এর জন্য OmniRoute প্রয়োজন নেই।
# অন্যান্য টুলের জন্য OmniRoute-এর সাথে kiro-cli ব্যবহার করুন।
kiro-cli status
```

**Kiro IDE** ডেস্কটপ অ্যাপের জন্য, OmniRoute দ্বারা প্রকাশিত MITM এন্ডপয়েন্ট ব্যবহার করুন
`/dashboard/cli-tools → Kiro` এর অধীনে।

## 10. অভ্যন্তরীণ OmniRoute CLI

`omniroute` বাইনারিটি সার্ভার জীবনচক্র, সেটআপ, ডায়াগনস্টিকস এবং প্রদানকারী ব্যবস্থাপনার জন্য কমান্ড প্রদান করে। প্রবেশ পয়েন্ট: `bin/omniroute.mjs`।

```bash
omniroute                              # সার্ভার শুরু করুন (ডিফল্ট পোর্ট 20128)
omniroute setup                        # ইন্টারেক্টিভ সেটআপ উইজার্ড
omniroute doctor                       # কনফিগ, DB, পোর্ট, রানটাইম পরীক্ষা করুন
omniroute providers list               # কনফিগার করা প্রদানকারী সংযোগ
omniroute providers test-all           # প্রতিটি সক্রিয় সংযোগ পরীক্ষা করুন
omniroute reset-password               # প্রশাসক পাসওয়ার্ড পুনরায় সেট করুন
omniroute logs                         # অনুরোধ লগ স্ট্রিম করুন
omniroute health                       # বিস্তারিত স্বাস্থ্য (ব্রেকার, ক্যাশে, মেমরি)
omniroute --version                    # সংস্করণ মুদ্রণ করুন
omniroute --help                       # সমস্ত কমান্ড দেখান
```

### সেটআপ এবং প্রাথমিককরণ

```bash
omniroute setup                        # ইন্টারেক্টিভ সেটআপ উইজার্ড
omniroute setup --non-interactive      # CI/অটোমেশন মোড (এনভ ভ্যার + ফ্ল্যাগ পড়ে)
omniroute setup --password '<value>'   # প্রশাসক পাসওয়ার্ড সরাসরি সেট করুন
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # একবারে একটি প্রদানকারী যোগ করুন এবং পরীক্ষা করুন
```

নন-ইন্টারেক্টিভ সেটআপের জন্য স্বীকৃত পরিবেশ ভেরিয়েবল:

| Var                 | উদ্দেশ্য                                                                   |
| ------------------- | -------------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | প্রদানকারী API কী (কমান্ডার `.env()` এর মাধ্যমে `--api-key` এর সাথে বাঁধা) |
| `DATA_DIR`          | OmniRoute ডেটা ডিরেক্টরি ওভাররাইড করুন                                     |

অন্যান্য সমস্ত নন-ইন্টারেক্টিভ ইনপুট ফ্ল্যাগ হিসাবে পাস করা হয়, পরিবেশ ভেরিয়েবল নয়:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(উপরের `omniroute setup` অপশনগুলি দেখুন)।

### ডায়াগনস্টিকস

```bash
omniroute doctor                       # কনফিগ, DB, পোর্ট, রানটাইম, মেমরি, জীবন্ততা পরীক্ষা করুন
omniroute doctor --json                # মেশিন-পঠনযোগ্য JSON
omniroute doctor --no-liveness         # HTTP স্বাস্থ্য প্রোব বাদ দিন
omniroute doctor --host 0.0.0.0        # জীবন্ততা হোস্ট ওভাররাইড করুন
omniroute doctor --liveness-url <url>  # সম্পূর্ণ স্বাস্থ্য এন্ডপয়েন্ট URL ওভাররাইড
```

ডাক্তার এই পরীক্ষা চালায়: `কনফিগ`, `ডেটাবেস`, `স্টোরেজ/এনক্রিপশন`,
`পোর্টের প্রাপ্যতা`, `নোড রানটাইম`, `স্থানীয় বাইনারি` (better-sqlite3),
`মেমরি`, এবং `সার্ভার জীবন্ততা`। যদি কোন পরীক্ষা `ব্যর্থ` হয় তবে এটি নন-জিরো এন্ট্রি করে।

### প্রদানকারী ব্যবস্থাপনা

```bash
omniroute providers available                       # OmniRoute প্রদানকারী ক্যাটালগ
omniroute providers available --search openai       # আইড/নাম/অ্যালিয়াস/শ্রেণী দ্বারা ক্যাটালগ ফিল্টার করুন
omniroute providers available --category api-key    # শ্রেণী দ্বারা ফিল্টার করুন (api-key, oauth, free, ...)
omniroute providers available --json                # মেশিন-পঠনযোগ্য JSON

omniroute providers list                            # কনফিগার করা প্রদানকারী সংযোগ
omniroute providers list --json

omniroute providers test <id|name>                  # একটি কনফিগার করা সংযোগ পরীক্ষা করুন
omniroute providers test-all                        # প্রতিটি সক্রিয় সংযোগ পরীক্ষা করুন
omniroute providers validate                        # স্থানীয়-শুধুমাত্র কাঠামোগত যাচাইকরণ
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # বিদ্যমান OAuth প্রবাহ
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` API-প্রথম এবং তাই সক্রিয় স্থানীয় বা দূরবর্তী প্রসঙ্গে কাজ করে। শংসাপত্র ইনপুট ব্যবহার করা উচিত
`--credential-stdin` বা `--credential-env`; `--dry-run --json` শুধুমাত্র
রিড্যাক্টেড উপস্থিতি/আকৃতি রিপোর্ট করে। `providers available` OmniRoute ক্যাটালগ পড়ে;
`providers list/test/test-all/validate` তাদের স্থানীয় SQLite আচরণ বজায় রাখে এবং
সার্ভার চালু থাকতে হবে না।

### পুনরুদ্ধার এবং পুনরায় সেট

```bash
omniroute reset-password                # প্রশাসক পাসওয়ার্ড পুনরায় সেট করুন (এছাড়াও: omniroute-reset-password)
omniroute reset-encrypted-columns       # এনক্রিপ্ট করা শংসাপত্র পুনরায় সেট করার জন্য সতর্কতা + ড্রাই-রান দেখান
omniroute reset-encrypted-columns --force  # সত্যিই SQLite-এ এনক্রিপ্ট করা শংসাপত্রগুলি শূন্য করুন
```

### শংসাপত্র রপ্তানি (⚠ সাবধানতার সাথে পরিচালনা করুন)

```bash
omniroute auth export                                 # সতর্কতা + নিশ্চিতকরণ গেট দেখান — DB অ্যাক্সেস নেই
omniroute auth export --force                          # সমস্ত সংযোগের ডিক্রিপ্টেড শংসাপত্র stdout এ JSON হিসাবে রপ্তানি করুন
omniroute auth export --force --id <id>                 # শুধুমাত্র মেলানো সংযোগ রপ্তানি করুন
omniroute auth export --force --format env               # OMNIROUTE_<PROVIDER>_<FIELD>=<value> লাইন তৈরি করুন
omniroute auth export --force --out creds.json           # একটি ফাইলে লিখুন (0600 অনুমতিসহ তৈরি করা হয়েছে)
```

`auth export` হল **স্থানীয়-শুধুমাত্র** (সরাসরি SQLite পড়া, কোন HTTP রুট নেই) এবং ইচ্ছাকৃতভাবে মুদ্রণ/লিখে
**প্লেইনটেক্সট** `apiKey`/`accessToken`/`refreshToken`/`idToken` মান — এটি বৈশিষ্ট্য, ত্রুটি নয়। কিছুই ডেটাবেস থেকে পড়া হয় না, এবং কিছুই ডিক্রিপ্ট করা হয় না, `--force` ছাড়া। একটি stderr
সতর্কতা ব্যানার সর্বদা প্লেইনটেক্সট মুদ্রণের আগে মুদ্রণ করে। `STORAGE_ENCRYPTION_KEY` সেট করা আবশ্যক। একটি ক্ষেত্র যা ডিক্রিপ্ট করতে ব্যর্থ হয় (পুরানো কী, ক্ষতিগ্রস্ত সাইফারটেক্সট) রিপোর্ট করা হয়
`<field>DecryptFailed: true` হিসাবে সম্পূর্ণ রপ্তানি বন্ধ করার পরিবর্তে বা অন্তর্নিহিত ত্রুটি ফাঁস করার পরিবর্তে।

### অন্যান্য সাবকমান্ড

এইগুলি একটি চলমান OmniRoute সার্ভার অনুমান করে, অন্যথায় উল্লেখ না করা হলে:

```bash
omniroute status                       # ব্যাপক রানটাইম স্ট্যাটাস
omniroute logs                         # অনুরোধ লগ স্ট্রিম (--json, --search, --follow)
omniroute config show                  # বর্তমান কনফিগারেশন প্রদর্শন করুন

omniroute provider list                # উপলব্ধ প্রদানকারীর তালিকা (প্রদানকারীর তালিকার অ্যালিয়াস)
omniroute provider add                 # একটি সরঞ্জামে প্রদানকারী হিসাবে OmniRoute নিবন্ধন করুন
omniroute keys add | list | remove     # API কী পরিচালনা করুন
omniroute models [provider]            # মডেল তালিকা (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # কনফিগ + DB এর স্ন্যাপশট
omniroute restore                      # পূর্ববর্তী স্ন্যাপশট থেকে পুনরুদ্ধার করুন

omniroute health                       # বিস্তারিত স্বাস্থ্য (ব্রেকার, ক্যাশে, মেমরি)
omniroute quota                        # প্রদানকারী কোটা ব্যবহার
omniroute cache                        # ক্যাশে স্ট্যাটাস
omniroute cache clear                  # সেমান্টিক + স্বাক্ষর ক্যাশে পরিষ্কার করুন

omniroute mcp status | restart         # MCP সার্ভারের স্ট্যাটাস / পুনরায় শুরু করুন
omniroute a2a status | card            # A2A সার্ভারের স্ট্যাটাস / এজেন্ট কার্ড

omniroute tunnel list | create | stop  # টানেল পরিচালনা করুন (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # এনভ ভ্যারস পরিদর্শন / সেট করুন (অস্থায়ী)

omniroute test                         # প্রদানকারী সংযোগের ধোঁয়া পরীক্ষা
omniroute update                       # আপডেটের জন্য পরীক্ষা করুন
omniroute completion                   # শেল সম্পূর্ণতা তৈরি করুন
```

### সাধারণ ফ্ল্যাগ

| ফ্ল্যাগ             | বর্ণনা                                                    |
| ------------------- | --------------------------------------------------------- |
| `--no-open`         | শুরুতে ব্রাউজার স্বয়ংক্রিয়ভাবে খুলবেন না                |
| `--port <n>`        | API পোর্ট ওভাররাইড করুন (ডিফল্ট 20128)                    |
| `--mcp`             | stdio এর মাধ্যমে MCP সার্ভার হিসাবে চালান (IDE এর জন্য)   |
| `--non-interactive` | CI মোড (কোনো প্রম্পট নেই; এনভ/ফ্ল্যাগ থেকে পড়ে)          |
| `--json`            | মেশিন-পঠনযোগ্য JSON আউটপুট (ডাক্তার, প্রদানকারী, ইত্যাদি) |
| `--help`, `-h`      | কমান্ড-নির্দিষ্ট সহায়তা দেখান                            |
| `--version`, `-v`   | ইনস্টল করা সংস্করণ মুদ্রণ করুন                            |

---

## উপলব্ধ API এন্ডপয়েন্ট

| এন্ডপয়েন্ট                | বর্ণনা                                 | ব্যবহারের জন্য                       |
| -------------------------- | -------------------------------------- | ------------------------------------ |
| `/v1/chat/completions`     | স্ট্যান্ডার্ড চ্যাট (সমস্ত প্রদানকারী) | সমস্ত আধুনিক টুল                     |
| `/v1/responses`            | প্রতিক্রিয়া API (OpenAI ফরম্যাট)      | কোডেক্স, এজেন্টিক ওয়ার্কফ্লো        |
| `/v1/completions`          | পুরানো টেক্সট সম্পূর্ণকরণ              | পুরানো টুলগুলি `prompt:` ব্যবহার করে |
| `/v1/embeddings`           | টেক্সট এম্বেডিং                        | RAG, অনুসন্ধান                       |
| `/v1/images/generations`   | ইমেজ উৎপাদন                            | GPT-Image, Flux, ইত্যাদি             |
| `/v1/audio/speech`         | টেক্সট-টু-স্পিচ                        | ElevenLabs, OpenAI TTS               |
| `/v1/audio/transcriptions` | স্পিচ-টু-টেক্সট                        | Deepgram, AssemblyAI                 |

পেস্ট করার জন্য প্রস্তুত উদাহরণ একটি টোকেনাইজড OmniRoute URL সহ:

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

## সমস্যা সমাধান

| ত্রুটি                                           | কারণ                     | সমাধান                                                         |
| ------------------------------------------------ | ------------------------ | -------------------------------------------------------------- |
| `Connection refused`                             | OmniRoute চলছে না        | `omniroute serve`                                              |
| `401 Unauthorized`                               | ভুল API কী               | `/dashboard/api-manager` এ চেক করুন                            |
| `No combo configured`                            | সক্রিয় রাউটিং কম্বো নেই | `/dashboard/combos` এ সেট আপ করুন                              |
| CLI "not installed" দেখায়                       | বাইনারি PATH এ নেই       | `which <command>` চেক করুন                                     |
| ইনস্টল করার পরে ড্যাশবোর্ড "not detected" দেখায় | ক্যাশে পুরনো             | ড্যাশবোর্ডে "⟳ Refresh detection" ক্লিক করুন                   |
| পুরানো লিঙ্ক `/dashboard/cli-tools`              | Pre-v3.8.6 বুকমার্ক      | `/dashboard/cli-code` এ স্বয়ংক্রিয়ভাবে পুনঃনির্দেশিত (308)   |
| পুরানো লিঙ্ক `/dashboard/agents`                 | Pre-v3.8.6 বুকমার্ক      | `/dashboard/acp-agents` এ স্বয়ংক্রিয়ভাবে পুনঃনির্দেশিত (308) |
