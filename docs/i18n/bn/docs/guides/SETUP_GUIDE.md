# 📖 Setup Guide — OmniRoute (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> OmniRoute-এর সম্পূর্ণ সেটআপ রেফারেন্স। সংক্ষিপ্ত সংস্করণের জন্য, [README-এর দ্রুত শুরু](../README.md#-quick-start) দেখুন।

## সূচিপত্র

- [ইনস্টল করার পদ্ধতি](#install-methods)
- [CLI টুল কনফিগারেশন](#cli-tool-configuration)
- [প্রোটোকল সেটআপ (MCP + A2A)](#protocol-setup-mcp--a2a)
- [টাইমআউট কনফিগারেশন](#timeout-configuration)
- [স্প্লিট-পোর্ট মোড](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [আনইনস্টল করা](#uninstalling)

---

## ইনস্টল করার পদ্ধতি

### npm (প্রস্তাবিত)

```bash
npm install -g omniroute
omniroute
```

ড্যাশবোর্ডটি `http://localhost:20128`-এ খোলে এবং API-এর বেস URL হলো `http://localhost:20128/v1`।

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm ব্যবহারকারীরা:** `better-sqlite3` এবং `@swc/core`-এর নেটিভ বিল্ড স্ক্রিপ্ট সক্রিয় করতে `--allow-build` ফ্ল্যাগটি আবশ্যক। pnpm v11-এ গ্লোবাল ইনস্টলের জন্য `pnpm approve-builds -g` কমান্ডটি সমর্থিত নয়।

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR প্যাকেজটি](https://aur.archlinux.org/packages/omniroute-bin) OmniRoute ইনস্টল করে এবং একটি systemd ব্যবহারকারী সার্ভিস প্রদান করে।

### সোর্স থেকে

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Windows সংক্রান্ত নোট:** ডিফল্টভাবে, লিগ্যাসি `%USERPROFILE%\.omniroute` ডিরেক্টরিটি উপস্থিত না থাকলে OmniRoute `%APPDATA%\omniroute` ব্যবহার করে। ভিন্ন কোনো ডেটা-ডিরেক্টরি লোকেশন বেছে নিতে `DATA_DIR` সেট করুন।

> **নোট:** প্রথমবার চালানোর সময় `npm install`, `.env.example` থেকে স্বয়ংক্রিয়ভাবে `.env` তৈরি করে। পরবর্তী ইনস্টলগুলো বিদ্যমান `.env` ওভাররাইট করবে না, ফলে কাস্টমাইজেশনগুলো সংরক্ষিত থাকে। পুনরায় প্রাথমিক মান দিয়ে তৈরি করতে, আবার চালানোর আগে `.env` মুছে দিন।

### Docker

Compose প্রোফাইল এবং Caddy HTTPS-সহ সম্পূর্ণ Docker সেটআপের জন্য [Docker নির্দেশিকা](./DOCKER_GUIDE.md) দেখুন।

### ডেস্কটপ অ্যাপ (Electron)

OmniRoute-এর সঙ্গে Electron 41 + electron-builder 26.10-ভিত্তিক একটি ডেস্কটপ র্যাপার সরবরাহ করা হয়। উপলভ্য স্ক্রিপ্টসমূহ (ওয়ার্কস্পেস রুট):

```bash
npm run electron:dev          # হট-রিলোডসহ ডেস্কটপ চালান
npm run electron:build        # বর্তমান OS-এর জন্য বিল্ড করুন (স্বয়ংক্রিয়ভাবে শনাক্ত)
npm run electron:build:win    # Windows ইনস্টলার (NSIS + পোর্টেবল)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # প্যাকেজ করা বিল্ডের স্মোক টেস্ট চালান
```

ডেস্কটপ ইনস্টলারগুলোর রিলিজ GitHub Releases-এর সঙ্গে সংযুক্ত থাকে। Electron সম্পর্কে পূর্ণাঙ্গ গভীর নির্দেশিকার (সাইনিং, IPC ব্রিজ, ডিস্ট্রো) জন্য [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) দেখুন _(পরবর্তী পর্যায়ে তৈরি)_।

### হেডলেস সার্ভার (CI/অটোমেশন)

অনবেক্ষিত সেটআপের (Docker, Kubernetes, CI) জন্য ব্যবহার করুন:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

এনভায়রনমেন্ট ভেরিয়েবলের (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` ইত্যাদি) সঙ্গে এটি ব্যবহার করলে আপনি সম্পূর্ণরূপে স্ক্রিপ্টযোগ্য উপায়ে একটি OmniRoute ইনস্ট্যান্স চালু করতে পারবেন।

### CLI অপশন

| কমান্ড                  | বিবরণ                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| `omniroute`             | সার্ভার চালু করুন (`PORT=20128`, একই পোর্টে API ও ড্যাশবোর্ড)                                         |
| `omniroute setup`       | পাসওয়ার্ড ও প্রথম প্রোভাইডারের জন্য নির্দেশিত CLI অনবোর্ডিং                                          |
| `omniroute doctor`      | সার্ভার চালু না করেই লোকাল হেলথ চেক চালান                                                             |
| `omniroute providers`   | CLI থেকে প্রোভাইডার খুঁজুন, তালিকাভুক্ত করুন, যাচাই করুন ও পরীক্ষা করুন                               |
| `omniroute config`      | CLI টুল কনফিগারেশন — কনফিগ তালিকাভুক্ত করুন, পান, সেট করুন ও যাচাই করুন                               |
| `omniroute status`      | অফলাইন স্ট্যাটাস ড্যাশবোর্ড — সংস্করণ, DB, টুল, কনফিগ                                                 |
| `omniroute logs`        | API থেকে ব্যবহারের লগ স্ট্রিম করুন (`--follow` সমর্থন করে)                                            |
| `omniroute update`      | OmniRoute আপডেট পরীক্ষা করুন বা প্রয়োগ করুন                                                          |
| `omniroute provider`    | প্রোভাইডার সংযোগ পরিচালনা করুন — যোগ করুন, তালিকাভুক্ত করুন, সরান, পরীক্ষা করুন, ডিফল্ট নির্ধারণ করুন |
| `omniroute --port 3000` | ক্যানোনিক্যাল/API পোর্ট 3000-এ সেট করুন                                                               |
| `omniroute --mcp`       | MCP সার্ভার চালু করুন (stdio ট্রান্সপোর্ট)                                                            |
| `omniroute --no-open`   | ব্রাউজার স্বয়ংক্রিয়ভাবে খুলবেন না                                                                   |
| `omniroute --help`      | সহায়তা দেখান                                                                                         |

হেডলেস সেটআপ ফ্ল্যাগ বা এনভায়রনমেন্ট ভেরিয়েবল ব্যবহার করে স্ক্রিপ্ট করা যেতে পারে:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

ড্যাশবোর্ড না খুলেই লোকাল ডায়াগনস্টিক চালান:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

ড্যাশবোর্ড না খুলেই SSH বা স্ক্রিপ্ট থেকে প্রোভাইডার পরিচালনা করুন:

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## CLI টুল কনফিগারেশন

### 1) প্রোভাইডার সংযুক্ত করুন এবং API কী তৈরি করুন

1. Dashboard → `Providers` খুলুন এবং অন্তত একটি প্রোভাইডার সংযুক্ত করুন (OAuth বা API কী)।
2. Dashboard → `Endpoints` খুলুন এবং একটি API কী তৈরি করুন।
3. (ঐচ্ছিক) Dashboard → `Combos` খুলুন এবং আপনার ফলব্যাক চেইন সেট করুন।

### 2) আপনার কোডিং টুলকে নির্দেশ করুন

```txt
বেস URL: http://localhost:20128/v1
API কী:  [Endpoint পৃষ্ঠা থেকে কপি করুন]
মডেল:    if/qwen3.8-max-preview (অথবা যেকোনো প্রোভাইডার/মডেল প্রিফিক্স)
```

আপনার এডিটর যদি `Authorization: Bearer ...` পাঠাতে না পারে, তাহলে এর পরিবর্তে টোকেনযুক্ত সামঞ্জস্যপূর্ণ বেস ব্যবহার করুন:

```txt
বেস URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
মডেলসমূহের URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
চ্যাট URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama ট্যাগ URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode এবং OpenAI-সামঞ্জস্যপূর্ণ SDK-গুলোর সঙ্গে কাজ করে।

#### `setup-*` দিয়ে স্বয়ংক্রিয়ভাবে কনফিগার করুন

বেস URL ও কী হাতে পেস্ট করার পরিবর্তে, লাইভ মডেল ক্যাটালগ থেকে OmniRoute-কে প্রতিটি টুলের
নিজস্ব কনফিগ লিখতে দিন। প্রতি টুলে একটি কমান্ড:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml প্রোফাইলসমূহ
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (openai-সামঞ্জস্যপূর্ণ)
omniroute setup-cline        # Cline CLI + VS Code এক্সটেনশন সেটিংস
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # Cursor-এর ইন-অ্যাপ ধাপগুলো প্রিন্ট করে
omniroute setup-roo          # Roo Code ইমপোর্ট + autoImport পয়েন্টার
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

একটি **রিমোট** OmniRoute-এর বিপরীতে স্থানীয় টুল কনফিগার করতে প্রতিটি কমান্ড `--remote <url> --api-key <key>`
গ্রহণ করে, পাশাপাশি প্রিভিউয়ের জন্য `--dry-run` গ্রহণ করে। সঠিক env ইনজেক্ট করে এবং কোনো কনফিগ একেবারেই
না লিখে একটি CLI চালু করতে জেনেরিক লঞ্চার `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini)
ব্যবহার করুন; পুরোনো প্রতি-টুল লঞ্চার `omniroute launch` (Claude Code) এবং
`omniroute launch-codex` (Codex) এখনও উপলভ্য।

সম্পূর্ণ টেবিলের জন্য (প্রতিটি কমান্ড কী লেখে, প্রতিটি ফ্ল্যাগ, স্থানীয় বনাম রিমোট, বেস-URL
`/v1` কনভেনশন), **[CLI ইন্টিগ্রেশনসমূহ](./CLI-INTEGRATIONS.md)** দেখুন।

প্রতি-টুলের বিস্তারিত কনফিগারেশনের জন্য (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot এবং আরও), নির্দিষ্ট **[CLI টুলস গাইড](../reference/CLI-TOOLS.md)** দেখুন।

---

## প্রোটোকল সেটআপ (MCP + A2A)

### MCP সেটআপ (Model Context Protocol)

stdio মোডে MCP ট্রান্সপোর্ট চালু করুন:

```bash
omniroute --mcp
```

প্রস্তাবিত যাচাইকরণ প্রবাহ:

```bash
# 1. MCP সার্ভার চালু করুন
omniroute --mcp

# 2. আপনার MCP ক্লায়েন্ট থেকে কল করুন:
omniroute_get_health        # সিস্টেমের স্বাস্থ্যাবস্থা ফেরত দেওয়া উচিত
omniroute_list_combos       # সক্রিয় কম্বোগুলো ফেরত দেওয়া উচিত

# 3. অথবা সম্পূর্ণ E2E স্যুট চালান:
npm run test:protocols:e2e
```

#### MCP ক্লায়েন্ট কনফিগারেশন

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

আপনার MCP সেটিংসে যোগ করুন:

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {}
    }
  }
}
```

**সম্পূর্ণ MCP ডকুমেন্টেশন:** [MCP Server README](../../open-sse/mcp-server/README.md) — 110টি টুল, IDE কনফিগ, Python/TS/Go ক্লায়েন্ট।

### A2A সেটআপ (Agent-to-Agent Protocol)

Agent Card যাচাই করুন:

```bash
curl http://localhost:20128/.well-known/agent.json
```

একটি টাস্ক পাঠান:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**সম্পূর্ণ A2A ডকুমেন্টেশন:** [A2A Server README](../../src/lib/a2a/README.md) — JSON-RPC 2.0, স্কিল, স্ট্রিমিং, টাস্ক লাইফসাইকেল।

---

## টাইমআউট কনফিগারেশন

### মৌলিক টাইমআউট

অধিকাংশ ডিপ্লয়মেন্টের জন্য আপনার শুধু এই দুটি ভেরিয়েবল প্রয়োজন:

| ভেরিয়েবল                | ডিফল্ট                                              | উদ্দেশ্য                                                                                                                                                |
| ------------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                                            | আপস্ট্রিম প্রতিক্রিয়া শুরু হওয়ার টাইমআউট, লুকানো Undici টাইমআউট, TLS ফিঙ্গারপ্রিন্ট অনুরোধ এবং API ব্রিজ অনুরোধ/প্রক্সি টাইমআউটের অভিন্ন ভিত্তিমাত্রা |
| `STREAM_IDLE_TIMEOUT_MS` | `REQUEST_TIMEOUT_MS` থেকে উত্তরাধিকারসূত্রে প্রাপ্ত | OmniRoute SSE স্ট্রিম বাতিল করার আগে স্ট্রিমিং চাঙ্কগুলোর মধ্যবর্তী সর্বোচ্চ বিরতি                                                                      |

পশ্চাৎমুখী সামঞ্জস্য বজায় রাখা হয়েছে: বিদ্যমান `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` এবং অন্যান্য স্তরভিত্তিক টাইমআউট ভেরিয়েবল এখনও কাজ করে এবং অভিন্ন ভিত্তিমাত্রাকে ওভাররাইড করে।

### প্রোভাইডার-নির্দিষ্ট নোট

Claude Code-সামঞ্জস্যপূর্ণ আপস্ট্রিমগুলোর (`anthropic-compatible-cc-*`) জন্য, OmniRoute নির্ধারিত ফেচ টাইমআউট থেকে আউটবাউন্ড `X-Stainless-Timeout` হেডার নির্ণয় করে, যাতে প্রোভাইডার-পক্ষের রিড টাইমআউট আপনার এনভায়রনমেন্ট কনফিগারেশনের সঙ্গে সামঞ্জস্যপূর্ণ থাকে।

তৃতীয়-পক্ষের Claude Code-সামঞ্জস্যপূর্ণ রিভার্স প্রক্সিগুলোর জন্য, OmniRoute ডিফল্ট `anthropic-beta` সেটকে সংযত রাখে এবং `Client Cache Control`-কে `Auto` অবস্থায় রাখা হলে শুধু ক্লায়েন্ট-প্রদত্ত `cache_control` মার্কার ফরোয়ার্ড করে। আপস্ট্রিমে বিশেষভাবে রিড্যাক্ট করা Claude থিংকিং স্ট্রিমের প্রয়োজন হলেই কেবল প্রতিটি সংযোগের জন্য "Enable redact-thinking beta" টগলটি সক্রিয় করুন।

### উন্নত টাইমআউট ওভাররাইড

| ভেরিয়েবল                                | ডিফল্ট                                                          | উদ্দেশ্য                                                                                   |
| ---------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `FETCH_TIMEOUT_MS`                       | `REQUEST_TIMEOUT_MS` থেকে উত্তরাধিকারসূত্রে প্রাপ্ত             | প্রতিক্রিয়া হেডার আসা পর্যন্ত ব্যবহৃত আপস্ট্রিম প্রতিক্রিয়া শুরুর টাইমআউট                |
| `FETCH_HEADERS_TIMEOUT_MS`               | `FETCH_TIMEOUT_MS` থেকে উত্তরাধিকারসূত্রে প্রাপ্ত               | আপস্ট্রিম প্রতিক্রিয়া হেডার পাওয়ার জন্য Undici-এর সময়সীমা                               |
| `FETCH_BODY_TIMEOUT_MS`                  | `FETCH_TIMEOUT_MS` থেকে উত্তরাধিকারসূত্রে প্রাপ্ত               | আপস্ট্রিম বডি চাঙ্কগুলোর মধ্যবর্তী সময়ের জন্য Undici-এর সময়সীমা (`0` এটি নিষ্ক্রিয় করে) |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                                         | Undici TCP সংযোগ টাইমআউট                                                                   |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                                          | Undici-এর নিষ্ক্রিয় কিপ-অ্যালাইভ সকেট টাইমআউট                                             |
| `TLS_CLIENT_TIMEOUT_MS`                  | `FETCH_TIMEOUT_MS` থেকে উত্তরাধিকারসূত্রে প্রাপ্ত               | `wreq-js`-এর মাধ্যমে করা TLS ফিঙ্গারপ্রিন্ট অনুরোধের টাইমআউট                               |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | `REQUEST_TIMEOUT_MS` বা `600000` থেকে উত্তরাধিকারসূত্রে প্রাপ্ত | API পোর্ট থেকে ড্যাশবোর্ড পোর্টে `/v1` প্রক্সি ফরোয়ার্ডিংয়ের টাইমআউট                     |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`                      | API ব্রিজ সার্ভারে ইনকামিং অনুরোধের টাইমআউট                                                |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                                         | API ব্রিজ সার্ভারে ইনকামিং হেডারের টাইমআউট                                                 |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                                          | API ব্রিজ সার্ভারের কিপ-অ্যালাইভ টাইমআউট                                                   |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                                             | API ব্রিজ সার্ভারের সকেট নিষ্ক্রিয়তার টাইমআউট (`0` এটি নিষ্ক্রিয় করে)                    |

> **দ্রষ্টব্য:** স্ট্রিমিং অনুরোধের ক্ষেত্রে, `FETCH_TIMEOUT_MS` শুধু সংযোগ সেটআপ / প্রথম আপস্ট্রিম প্রতিক্রিয়ার জন্য অপেক্ষার সময়টুকু অন্তর্ভুক্ত করে। স্ট্রিম সক্রিয় হয়ে গেলে, OmniRoute শুধু প্রকৃত স্থবিরতা (`STREAM_IDLE_TIMEOUT_MS`) বা Undici বডির নিষ্ক্রিয়তার (`FETCH_BODY_TIMEOUT_MS`) ক্ষেত্রেই এটি বাতিল করবে।

### রিভার্স প্রক্সি সামঞ্জস্য

আপনি যদি Nginx, Caddy, Cloudflare বা অন্য কোনো রিভার্স প্রক্সির পেছনে OmniRoute চালান, তাহলে নিশ্চিত করুন যে প্রক্সির টাইমআউটগুলোও আপনার OmniRoute স্ট্রিম/ফেচ টাইমআউটের চেয়ে বেশি।

---

## পৃথক-পোর্ট মোড

উন্নত ব্যবহারের ক্ষেত্রে (রিভার্স প্রক্সি, কনটেইনার নেটওয়ার্কিং) API এবং ড্যাশবোর্ড পৃথক পোর্টে চালান:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:        http://localhost:20128/v1
# ড্যাশবোর্ড: http://localhost:20129
```

---

## Void Linux (`xbps-src`) টেমপ্লেট

Void Linux ব্যবহারকারীরা `xbps-src` ব্যবহার করে একটি নেটিভ প্যাকেজ তৈরি করতে পারেন। এই ব্লকটি `srcpkgs/omniroute/template` হিসেবে সংরক্ষণ করুন:

```bash
# 'omniroute'-এর জন্য টেমপ্লেট ফাইল
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# প্রতিটি রিলিজের জন্য নিম্নলিখিত কমান্ড দিয়ে চেকসাম পুনরায় তৈরি করুন:
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

---

## আনইনস্টল করা

| কমান্ড                   | কার্যক্রম                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | সিস্টেম অ্যাপটি সরিয়ে দেয়, তবে `~/.omniroute`-এ থাকা **আপনার DB এবং কনফিগারেশন রেখে দেয়**। |
| `npm run uninstall:full` | অ্যাপটি সরিয়ে দেয় এবং **সমস্ত কনফিগারেশন, কী ও ডেটাবেস স্থায়ীভাবে মুছে ফেলে**।             |

> সব পদ্ধতির বিস্তারিত আনইনস্টল নির্দেশনার জন্য [UNINSTALL.md](./UNINSTALL.md) দেখুন।
