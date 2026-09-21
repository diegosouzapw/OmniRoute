# 📖 Setup Guide — OmniRoute (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> OmniRoute का लागि पूर्ण सेटअप सन्दर्भ। छोटो संस्करणका लागि, [README मा रहेको द्रुत सुरुवात](../README.md#-quick-start) हेर्नुहोस्।

## विषयसूची

- [स्थापना विधिहरू](#install-methods)
- [CLI उपकरण कन्फिगरेसन](#cli-tool-configuration)
- [प्रोटोकल सेटअप (MCP + A2A)](#protocol-setup-mcp--a2a)
- [टाइमआउट कन्फिगरेसन](#timeout-configuration)
- [स्प्लिट-पोर्ट मोड](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [अनइन्स्टल गर्ने](#uninstalling)

---

## स्थापना विधिहरू

### npm (सिफारिस गरिएको)

```bash
npm install -g omniroute
omniroute
```

ड्यासबोर्ड `http://localhost:20128` मा खुल्छ र API को आधार URL `http://localhost:20128/v1` हो।

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm प्रयोगकर्ताहरू:** `better-sqlite3` र `@swc/core` का लागि नेटिभ बिल्ड स्क्रिप्टहरू सक्षम गर्न `--allow-build` फ्ल्याग आवश्यक हुन्छ। pnpm v11 मा ग्लोबल इन्स्टलहरूका लागि `pnpm approve-builds -g` कमाण्ड समर्थित छैन।

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR प्याकेज](https://aur.archlinux.org/packages/omniroute-bin) ले OmniRoute इन्स्टल गर्छ र systemd प्रयोगकर्ता सेवा उपलब्ध गराउँछ।

### स्रोतबाट

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Windows सम्बन्धी टिप्पणी:** पूर्वनिर्धारित रूपमा, लेगेसी `%USERPROFILE%\.omniroute` डाइरेक्टरी उपस्थित नभएमा OmniRoute ले `%APPDATA%\omniroute` प्रयोग गर्छ। फरक डेटा-डाइरेक्टरी स्थान चयन गर्न `DATA_DIR` सेट गर्नुहोस्।

> **टिप्पणी:** पहिलो पटक चलाउँदा `npm install` ले `.env.example` बाट `.env` स्वतः उत्पन्न गर्छ। त्यसपछिका इन्स्टलहरूले विद्यमान `.env` लाई अधिलेखन गर्दैनन्, त्यसैले अनुकूलनहरू सुरक्षित रहन्छन्। पुनः प्रारम्भिक सामग्री भर्न, फेरि चलाउनुअघि `.env` मेटाउनुहोस्।

### Docker

Compose प्रोफाइलहरू र Caddy HTTPS सहितको पूर्ण Docker सेटअपका लागि [Docker मार्गदर्शिका](./DOCKER_GUIDE.md) हेर्नुहोस्।

### डेस्कटप एप (Electron)

OmniRoute सँग Electron 41 + electron-builder 26.10 मा निर्मित डेस्कटप र्यापर आउँछ। उपलब्ध स्क्रिप्टहरू (वर्कस्पेस रुट):

```bash
npm run electron:dev          # हट-रिलोडसहित डेस्कटप चलाउनुहोस्
npm run electron:build        # हालको OS का लागि बिल्ड गर्नुहोस् (स्वतः पत्ता लगाइन्छ)
npm run electron:build:win    # Windows इन्स्टलर (NSIS + पोर्टेबल)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # प्याकेज गरिएको बिल्डको स्मोक परीक्षण गर्नुहोस्
```

डेस्कटप इन्स्टलरका रिलिजहरू GitHub Releases मा संलग्न गरिएका हुन्छन्। Electron को पूर्ण गहन विवरण (साइनिङ, IPC ब्रिज, डिस्ट्रोहरू) का लागि [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) हेर्नुहोस् _(पछिल्लो चरणमा सिर्जना गरिएको)_।

### हेडलेस सर्भर (CI/स्वचालन)

मानवीय हस्तक्षेपविनाका सेटअपहरू (Docker, Kubernetes, CI) का लागि, निम्न प्रयोग गर्नुहोस्:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

env vars (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET`, आदि) सँग संयोजन गर्दा, यसले तपाईंलाई पूर्ण रूपमा स्क्रिप्ट गर्न मिल्ने OmniRoute इन्स्ट्यान्स सञ्चालन गर्न दिन्छ।

### CLI विकल्पहरू

| कमाण्ड                  | विवरण                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute`             | सर्भर सुरु गर्नुहोस् (`PORT=20128`, API र ड्यासबोर्ड एउटै पोर्टमा)                                                             |
| `omniroute setup`       | पासवर्ड र पहिलो प्रदायकका लागि निर्देशित CLI अनबोर्डिङ                                                                         |
| `omniroute doctor`      | सर्भर सुरु नगरी स्थानीय स्वास्थ्य जाँचहरू चलाउनुहोस्                                                                           |
| `omniroute providers`   | CLI बाट प्रदायकहरू पत्ता लगाउनुहोस्, सूचीबद्ध गर्नुहोस्, प्रमाणीकरण गर्नुहोस् र परीक्षण गर्नुहोस्                              |
| `omniroute config`      | CLI उपकरण कन्फिगरेसन — कन्फिगहरू सूचीबद्ध गर्नुहोस्, प्राप्त गर्नुहोस्, सेट गर्नुहोस् र प्रमाणीकरण गर्नुहोस्                   |
| `omniroute status`      | अफलाइन स्थिति ड्यासबोर्ड — संस्करण, DB, उपकरणहरू, कन्फिग                                                                       |
| `omniroute logs`        | API बाट प्रयोग लगहरू स्ट्रिम गर्नुहोस् (`--follow` समर्थित)                                                                    |
| `omniroute update`      | OmniRoute अद्यावधिकहरू जाँच गर्नुहोस् वा लागू गर्नुहोस्                                                                        |
| `omniroute provider`    | प्रदायक जडानहरू व्यवस्थापन गर्नुहोस् — थप्नुहोस्, सूचीबद्ध गर्नुहोस्, हटाउनुहोस्, परीक्षण गर्नुहोस्, पूर्वनिर्धारित बनाउनुहोस् |
| `omniroute --port 3000` | क्यानोनिकल/API पोर्टलाई 3000 मा सेट गर्नुहोस्                                                                                  |
| `omniroute --mcp`       | MCP सर्भर सुरु गर्नुहोस् (stdio ट्रान्सपोर्ट)                                                                                  |
| `omniroute --no-open`   | ब्राउजर स्वतः नखोल्नुहोस्                                                                                                      |
| `omniroute --help`      | सहायता देखाउनुहोस्                                                                                                             |

हेडलेस सेटअपलाई फ्ल्यागहरू वा वातावरणीय चलहरू प्रयोग गरेर स्क्रिप्ट गर्न सकिन्छ:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

ड्यासबोर्ड नखोली स्थानीय निदानहरू चलाउनुहोस्:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

ड्यासबोर्ड नखोली SSH वा स्क्रिप्टहरूबाट प्रदायकहरू व्यवस्थापन गर्नुहोस्:

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

## CLI उपकरण कन्फिगरेसन

### 1) प्रदायकहरू जडान गर्नुहोस् र API कुञ्जी सिर्जना गर्नुहोस्

1. Dashboard → `Providers` खोल्नुहोस् र कम्तीमा एउटा प्रदायक (OAuth वा API कुञ्जी) जडान गर्नुहोस्।
2. Dashboard → `Endpoints` खोल्नुहोस् र API कुञ्जी सिर्जना गर्नुहोस्।
3. (वैकल्पिक) Dashboard → `Combos` खोल्नुहोस् र आफ्नो फलब्याक शृङ्खला सेट गर्नुहोस्।

### 2) आफ्नो कोडिङ उपकरणलाई लक्षित गराउनुहोस्

```txt
आधार URL: http://localhost:20128/v1
API कुञ्जी:  [Endpoint पृष्ठबाट प्रतिलिपि गर्नुहोस्]
मोडेल:    if/qwen3.8-max-preview (वा कुनै पनि प्रदायक/मोडेल प्रिफिक्स)
```

यदि तपाईंको सम्पादकले `Authorization: Bearer ...` पठाउन सक्दैन भने, यसको सट्टा टोकनयुक्त अनुकूलता आधार प्रयोग गर्नुहोस्:

```txt
आधार URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
मोडेलहरूको URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
च्याट URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama ट्याग URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode, र OpenAI-सङ्गत SDK हरूसँग काम गर्छ।

#### `setup-*` मार्फत स्वतः कन्फिगर गर्नुहोस्

आधार URL र कुञ्जी हातैले टाँस्नुको सट्टा, OmniRoute लाई प्रत्यक्ष मोडेल क्याटलगबाट प्रत्येक उपकरणको
आफ्नै कन्फिग लेख्न दिनुहोस्। प्रत्येक उपकरणका लागि एउटा कमान्ड:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml प्रोफाइलहरू
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (openai-सङ्गत)
omniroute setup-cline        # Cline CLI + VS Code एक्सटेन्सन सेटिङहरू
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # Cursor का इन-एप चरणहरू प्रिन्ट गर्छ
omniroute setup-roo          # Roo Code आयात + autoImport सूचक
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

स्थानीय उपकरणलाई **रिमोट** OmniRoute सँग कन्फिगर गर्न प्रत्येकले `--remote <url> --api-key <key>` स्वीकार गर्छ,
साथै पूर्वावलोकनका लागि `--dry-run`। सही env इन्जेक्ट गरेर र कुनै पनि कन्फिग नलेखी CLI सुरु गर्न,
सामान्य लन्चर `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini) प्रयोग गर्नुहोस्;
पुराना प्रति-उपकरण लन्चरहरू `omniroute launch` (Claude Code) र
`omniroute launch-codex` (Codex) पनि उपलब्ध छन्।

पूर्ण तालिकाका लागि (प्रत्येक कमान्डले के लेख्छ, हरेक फ्ल्याग, स्थानीय बनाम रिमोट, आधार-URL
`/v1` परम्पराहरू), **[CLI एकीकरणहरू](./CLI-INTEGRATIONS.md)** हेर्नुहोस्।

प्रति-उपकरण विस्तृत कन्फिगरेसनका लागि (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot, र थप), समर्पित **[CLI उपकरण मार्गदर्शिका](../reference/CLI-TOOLS.md)** हेर्नुहोस्।

---

## प्रोटोकल सेटअप (MCP + A2A)

### MCP सेटअप (मोडेल कन्टेक्स्ट प्रोटोकल)

stdio मोडमा MCP ट्रान्सपोर्ट सुरु गर्नुहोस्:

```bash
omniroute --mcp
```

सिफारिस गरिएको प्रमाणीकरण प्रवाह:

```bash
# 1. MCP सर्भर सुरु गर्नुहोस्
omniroute --mcp

# 2. आफ्नो MCP क्लाइन्टबाट, यी कल गर्नुहोस्:
omniroute_get_health        # प्रणालीको स्वास्थ्य स्थिति फर्काउनुपर्छ
omniroute_list_combos       # सक्रिय कम्बोहरू फर्काउनुपर्छ

# 3. वा पूर्ण E2E सुइट चलाउनुहोस्:
npm run test:protocols:e2e
```

#### MCP क्लाइन्ट कन्फिगरेसन

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

आफ्नो MCP सेटिङहरूमा थप्नुहोस्:

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

**पूर्ण MCP दस्तावेजीकरण:** [MCP सर्भर README](../../open-sse/mcp-server/README.md) — 110 उपकरणहरू, IDE कन्फिगहरू, Python/TS/Go क्लाइन्टहरू।

### A2A सेटअप (एजेन्ट-टु-एजेन्ट प्रोटोकल)

Agent Card प्रमाणित गर्नुहोस्:

```bash
curl http://localhost:20128/.well-known/agent.json
```

एउटा कार्य पठाउनुहोस्:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**पूर्ण A2A दस्तावेजीकरण:** [A2A सर्भर README](../../src/lib/a2a/README.md) — JSON-RPC 2.0, सीपहरू, स्ट्रिमिङ, कार्य जीवनचक्र।

---

## टाइमआउट कन्फिगरेसन

### आधारभूत टाइमआउटहरू

धेरैजसो डिप्लोयमेन्टहरूका लागि, तपाईंलाई यी दुई भेरिएबलहरू मात्र आवश्यक पर्छन्:

| भेरिएबल                  | पूर्वनिर्धारित                   | उद्देश्य                                                                                                                                                   |
| ------------------------ | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                         | अपस्ट्रिम प्रतिक्रिया सुरु हुने टाइमआउट, लुकेका Undici टाइमआउटहरू, TLS फिङ्गरप्रिन्ट अनुरोधहरू र API ब्रिज अनुरोध/प्रोक्सी टाइमआउटहरूका लागि साझा आधाररेखा |
| `STREAM_IDLE_TIMEOUT_MS` | `REQUEST_TIMEOUT_MS` बाट प्राप्त | OmniRoute ले SSE स्ट्रिम रद्द गर्नुअघि स्ट्रिमिङ चङ्कहरूबीचको अधिकतम अन्तराल                                                                               |

पछाडितर्फको अनुकूलता सुरक्षित राखिएको छ: विद्यमान `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` र अन्य प्रत्येक तहका टाइमआउट भेरिएबलहरूले अझै पनि काम गर्छन् र साझा आधाररेखालाई ओभरराइड गर्छन्।

### प्रदायक-विशिष्ट टिप्पणीहरू

Claude Code-सङ्गत अपस्ट्रिमहरू (`anthropic-compatible-cc-*`) का लागि, OmniRoute ले समाधान गरिएको फेच टाइमआउटबाट आउटबाउन्ड `X-Stainless-Timeout` हेडर प्राप्त गर्छ, जसले गर्दा प्रदायकतर्फका रिड टाइमआउटहरू तपाईंको env कन्फिगरेसनसँग समक्रमित रहन्छन्।

तेस्रो-पक्षका Claude Code-सङ्गत रिभर्स प्रोक्सीहरूका लागि, OmniRoute ले पूर्वनिर्धारित `anthropic-beta` सेटलाई सुरक्षित सीमामा राख्छ र `Client Cache Control` लाई `Auto` मा छोडिएको अवस्थामा क्लाइन्टद्वारा प्रदान गरिएका `cache_control` मार्करहरू मात्र फर्वार्ड गर्छ। अपस्ट्रिमलाई विशेष रूपमा रिड्याक्ट गरिएका Claude थिङ्किङ स्ट्रिमहरू आवश्यक हुँदा मात्र प्रत्येक कनेक्सनको "रिड्याक्ट-थिङ्किङ बिटा सक्षम गर्नुहोस्" टगल सक्षम गर्नुहोस्।

### उन्नत टाइमआउट ओभरराइडहरू

| भेरिएबल                                  | पूर्वनिर्धारित                               | उद्देश्य                                                                    |
| ---------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | `REQUEST_TIMEOUT_MS` बाट प्राप्त             | प्रतिक्रिया हेडरहरू नआउन्जेल प्रयोग हुने अपस्ट्रिम प्रतिक्रिया-सुरु टाइमआउट |
| `FETCH_HEADERS_TIMEOUT_MS`               | `FETCH_TIMEOUT_MS` बाट प्राप्त               | अपस्ट्रिम प्रतिक्रिया हेडरहरू प्राप्त गर्नका लागि Undici समय सीमा           |
| `FETCH_BODY_TIMEOUT_MS`                  | `FETCH_TIMEOUT_MS` बाट प्राप्त               | अपस्ट्रिम बडी चङ्कहरूबीचको Undici समय सीमा (`0` ले यसलाई निष्क्रिय गर्छ)    |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                      | Undici TCP कनेक्ट टाइमआउट                                                   |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                       | Undici निष्क्रिय किप-अलाइभ सकेट टाइमआउट                                     |
| `TLS_CLIENT_TIMEOUT_MS`                  | `FETCH_TIMEOUT_MS` बाट प्राप्त               | `wreq-js` मार्फत गरिएका TLS फिङ्गरप्रिन्ट अनुरोधहरूको टाइमआउट               |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | `REQUEST_TIMEOUT_MS` वा `600000` बाट प्राप्त | API पोर्टबाट ड्यासबोर्ड पोर्टतर्फ `/v1` प्रोक्सी फर्वार्डिङको टाइमआउट       |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`   | API ब्रिज सर्भरमा आउने अनुरोधको टाइमआउट                                     |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                      | API ब्रिज सर्भरमा आउने हेडरको टाइमआउट                                       |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                       | API ब्रिज सर्भरको किप-अलाइभ टाइमआउट                                         |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                          | API ब्रिज सर्भरको सकेट निष्क्रियता टाइमआउट (`0` ले यसलाई निष्क्रिय गर्छ)    |

> **टिप्पणी:** स्ट्रिमिङ अनुरोधहरूका लागि, `FETCH_TIMEOUT_MS` ले कनेक्सन सेटअप / पहिलो अपस्ट्रिम प्रतिक्रियाको प्रतीक्षालाई मात्र समेट्छ। स्ट्रिम सक्रिय भएपछि, OmniRoute ले वास्तविक अवरोध (`STREAM_IDLE_TIMEOUT_MS`) वा Undici बडी निष्क्रियता (`FETCH_BODY_TIMEOUT_MS`) हुँदा मात्र रद्द गर्छ।

### रिभर्स प्रोक्सी अनुकूलता

यदि तपाईंले OmniRoute लाई Nginx, Caddy, Cloudflare वा अन्य रिभर्स प्रोक्सीको पछाडि चलाउनुहुन्छ भने, प्रोक्सी टाइमआउटहरू पनि तपाईंका OmniRoute स्ट्रिम/फेच टाइमआउटहरूभन्दा बढी छन् भन्ने सुनिश्चित गर्नुहोस्।

---

## विभाजित-पोर्ट मोड

उन्नत परिदृश्यहरूका लागि (रिभर्स प्रोक्सी, कन्टेनर नेटवर्किङ) API र Dashboard लाई छुट्टाछुट्टै पोर्टहरूमा चलाउनुहोस्:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Void Linux (`xbps-src`) टेम्प्लेट

Void Linux प्रयोगकर्ताहरूले `xbps-src` प्रयोग गरेर नेटिभ प्याकेज निर्माण गर्न सक्छन्। यो ब्लकलाई `srcpkgs/omniroute/template` को रूपमा सुरक्षित गर्नुहोस्:

```bash
# 'omniroute' का लागि टेम्प्लेट फाइल
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
# प्रत्येक रिलिजका लागि यसरी चेकसम पुनः उत्पन्न गर्नुहोस्:
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

## अनइन्स्टल गर्ने

| कमाण्ड                   | कार्य                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | प्रणाली एप हटाउँछ, तर `~/.omniroute` मा रहेका **तपाईंका DB र कन्फिगरेसनहरू सुरक्षित राख्छ**। |
| `npm run uninstall:full` | एप हटाउँछ र **सबै कन्फिगरेसन, कुञ्जी तथा डेटाबेसहरू स्थायी रूपमा मेटाउँछ**।                  |

> सबै विधिहरूका विस्तृत अनइन्स्टल निर्देशनहरूका लागि [UNINSTALL.md](./UNINSTALL.md) हेर्नुहोस्।
