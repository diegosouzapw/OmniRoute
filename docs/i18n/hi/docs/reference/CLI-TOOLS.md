# CLI-TOOLS (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI उपकरण — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI उपकरण — OmniRoute

अंतिम अपडेट: 2026-08-18

OmniRoute तीन श्रेणियों के CLI उपकरणों के साथ एकीकृत होता है जो तीन समर्पित डैशबोर्ड पृष्ठों में फैले होते हैं:

| पृष्ठ         | मार्ग                   | अवधारणा                                                                                    | संख्या          |
| ------------- | ----------------------- | ------------------------------------------------------------------------------------------ | --------------- |
| **CLI कोड**   | `/dashboard/cli-code`   | कोडिंग उपकरण जिन्हें आप OmniRoute पर इंगित करते हैं (क्लाइंट → CLI → OmniRoute → प्रदाता)  | 26              |
| **CLI एजेंट** | `/dashboard/cli-agents` | स्वायत्त एजेंट जिन्हें आप OmniRoute पर इंगित करते हैं (समान प्रवाह, व्यापक दायरा)          | 8               |
| **ACP एजेंट** | `/dashboard/acp-agents` | CLIs जो OmniRoute stdio/ACP के माध्यम से बैकएंड के रूप में उत्पन्न करता है (विपरीत प्रवाह) | रजिस्ट्रि देखें |

विरासत मार्ग 308 के माध्यम से पुनर्निर्देशित होते हैं: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`।

---

## यह कैसे काम करता है

```
CLI कोड / CLI एजेंट (उपभोग प्रवाह):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (सभी OmniRoute पर इंगित करते हैं)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute सही प्रदाता की ओर मार्ग करता है)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP एजेंट (विपरीत उत्पन्न प्रवाह):
    क्लाइंट अनुरोध → OmniRoute → stdio/ACP के माध्यम से CLI उत्पन्न करता है → प्रतिक्रिया
```

**लाभ:**

- सभी उपकरणों को प्रबंधित करने के लिए एक API कुंजी
- डैशबोर्ड में सभी CLIs के बीच लागत ट्रैकिंग
- हर उपकरण को फिर से कॉन्फ़िगर किए बिना मॉडल स्विचिंग
- स्थानीय और दूरस्थ सर्वरों (VPS, Docker, Akamai, Cloudflare Tunnel) पर काम करता है

---

## `setup-*` के साथ स्वचालित कॉन्फ़िगर करें

आपको प्रत्येक उपकरण की कॉन्फ़िगरेशन हाथ से लिखने की आवश्यकता नहीं है। OmniRoute एक `setup-*`
कमांड प्रदान करता है जो एक चल रहे OmniRoute (स्थानीय या दूरस्थ) से **लाइव** मॉडल कैटलॉग पढ़ता है
और आपके मशीन पर उपकरण की अपनी कॉन्फ़िगरेशन लिखता है:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

प्रत्येक `--remote <url> --api-key <key>` स्वीकार करता है (एक दूरस्थ OmniRoute के खिलाफ एक स्थानीय उपकरण कॉन्फ़िगर करें), `--dry-run` (लिखे बिना पूर्वावलोकन), और `--port`। मॉडल स्वचालित खोज के बिना उपकरण (Cline, Kilo, Roo, Goose, Aider, Qwen) `--model <id>` लेते हैं (और गैर-इंटरैक्टिव रन के लिए `--yes`)। CLI को सही वातावरण के साथ लॉन्च करने के लिए और बिना किसी कॉन्फ़िगरेशन के, सामान्य `omniroute run <target>` लॉन्चर का उपयोग करें (claude, codex, aider, goose, opencode, qwen, gemini — लक्ष्य और उपनाम `bin/cli/cli-manifest.mjs` से आते हैं); विरासत प्रति-उपकरण लॉन्चर `omniroute launch` (Claude Code) और `omniroute launch-codex` (Codex) उपलब्ध रहते हैं। Gemini CLI केवल लॉन्च-केवल है: यह एक `omniroute run` लक्ष्य है लेकिन इसका कोई `setup-*`/`configure` नुस्खा नहीं है।

> **पूर्ण संदर्भ:** मास्टर तालिका — प्रत्येक कमांड क्या लिखता है, हर ध्वज,
> स्थानीय बनाम दूरस्थ, और कौन से उपकरण `/v1` उपसर्ग चाहते हैं —
> **[CLI Integrations](../guides/CLI-INTEGRATIONS.md)** में उपलब्ध है।

### कंटेनर के अंदर इन्हें चलाना

OmniRoute कंटेनर के अंदर निष्पादित `setup-*` कमांड कंटेनर के अपने होम में लिखता है, जिसे कोई होस्ट CLI नहीं पढ़ता है और जो कंटेनर के साथ गायब हो जाता है। OmniRoute इसे पहचानता है और लिखने के बजाय निर्देशों के साथ `2` के साथ बाहर निकलता है। आगे बढ़ने के दो समर्थित तरीके हैं — होस्ट पर CLI स्थापित करें और कंटेनर से `omniroute connect` करें, या कॉन्फ़िगरेशन डायरियों को बाइंड-माउंट करें और `CLI_CONFIG_HOME` सेट करें (कॉम्पोज़ `host` प्रोफ़ाइल)। प्रत्येक `setup-*` कमांड, साथ ही `omniroute configure` और `omniroute config set`, `--allow-container-write` स्वीकार करता है जब आप वास्तव में कंटेनर के अपने CLIs को कॉन्फ़िगर करना चाहते थे; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` सर्वर के लिए वही करता है। देखें
[Docker Guide → होस्ट CLI उपकरणों को कॉन्फ़िगर करना](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker)।

डैशबोर्ड का **apply endpoint** (`POST /api/cli-tools/apply`) वही सुरक्षा लागू करता है: एक कंटेनर में, एक लिखना जिसका लक्ष्य होस्ट से बाइंड-माउंट नहीं किया गया है, **`422`** के साथ उत्तर देता है जिसमें `containerEphemeralTarget: true`, सुरक्षित त्रुटि पाठ और — उन उपकरणों के लिए जिनका होस्ट नुस्खा है (claude, codex, opencode, cline, kilo, continue) — एक `hostSetupCommand` (जैसे `omniroute setup-opencode`) जो होस्ट पर चलाने के लिए है; कुछ भी नहीं लिखा गया है। `dryRun: true` कंटेनर मोड में काम करता रहता है और उत्पन्न सामग्री + लक्ष्य पथ को बिना डिस्क को छुए लौटाता है, ताकि आप डैशबोर्ड से पूर्वावलोकन कर सकें और होस्ट पर लागू कर सकें। यह व्यवहार जानबूझकर है और
`tests/unit/api/cli-tools/apply-container-guard.test.ts` द्वारा पुनरावृत्ति-रक्षा की गई है — कभी भी "फिक्स" न करें 422 को सुरक्षा को हटाकर।

---

## सत्य का स्रोत

एकीकृत कैटलॉग `src/shared/constants/cliTools.ts` में `CLI_TOOLS: Record<string, CliCatalogEntry>` के रूप में स्थित है।

प्रत्येक प्रविष्टि में ये फ़ील्ड होते हैं (जो `src/shared/schemas/cliCatalog.ts` में परिभाषित हैं):

| फ़ील्ड                                          | प्रकार                                                       | विवरण                                                          |
| ----------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | उपकरण किस पृष्ठ पर दिखाई देता है                               |
| `vendor`                                        | `string`                                                     | उपकरण का मूल ("Anthropic", "OSS (P. Gauthier)")                |
| `acpSpawnable`                                  | `boolean`                                                    | ACP एजेंट के रूप में भी उपयोग किया जा सकता है (बैज दिखाया गया) |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | कस्टम एंडपॉइंट समर्थन स्तर। `"none"` = MITM बैकलॉग             |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | कॉन्फ़िगरेशन तंत्र                                             |
| `id`, `name`, `color`, `description`, `docsUrl` | मानक                                                         | मुख्य प्रदर्शन फ़ील्ड                                          |

जिन प्रविष्टियों में `baseUrlSupport: "none"` है, वे **डैशबोर्ड पृष्ठों** में **नहीं दिखाई देती** हैं — वे योजना 11 के लिए MITM बैकलॉग में पंजीकृत हैं (देखें `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`)।

### क्षमता स्तर (कैटलॉग किए गए × पता लगाने योग्य × कॉन्फ़िगर करने योग्य × लॉन्च करने योग्य)

हर कैटलॉग किए गए उपकरण को पता लगाया जा सकता है, कॉन्फ़िगर किया जा सकता है या लॉन्च किया जा सकता है। प्रत्येक स्तर में एक
घोषित स्रोत होता है, और एक ड्रिफ्ट परीक्षण उन्हें संरेखित रखता है:

| स्तर                     | अर्थ                                                                          | घोषित किया गया                                                  |
| ------------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **कैटलॉग किए गए**        | डैशबोर्ड कैटलॉग में दिखाई देता है (नाम, विक्रेता, दस्तावेज़, कॉन्फ़िग प्रकार) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                |
| **पता लगाने योग्य**      | बाइनरी/कॉन्फ़िगरेशन पहचान, स्वास्थ्य जांच, कॉन्फ़िग पथ                        | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` रनटाइम कैटलॉग) |
| **कॉन्फ़िगर करने योग्य** | `omniroute configure <cli>` द्वारा समर्थित (सेटअप नुस्खा मौजूद है)            | `bin/cli/cli-manifest.mjs` (`configure: true`)                  |
| **लॉन्च करने योग्य**     | `omniroute run <target>` द्वारा समर्थित (env/args इंजेक्शन परिभाषित)          | `bin/cli/cli-manifest.mjs` (`run: true`)                        |

`bin/cli/cli-manifest.mjs` CLI कमांड के लिए मानक निष्पादन योग्य मैनिफेस्ट है
सतहें: `run`, `configure` और शेल-पूर्णता जनरेटर सभी अपने
लक्ष्य सूचियों, उपनाम समाधान (उदाहरण के लिए `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
और `--model` ध्वज वायरिंग से इसे प्राप्त करते हैं। ड्रिफ्ट गार्ड
`tests/unit/cli/cli-manifest-drift.test.ts` यह सुनिश्चित करता है कि मैनिफेस्ट, रनटाइम
कैटलॉग, UI कैटलॉग और प्रत्येक उपभोक्ता सतह समन्वय में रहें — एक लक्ष्य जो
एक सतह में जोड़ा गया है, बिना अन्य के विफलता की श्रृंखला को चुपचाप नहीं छोड़ता।

## 1. CLI कोड का कैटलॉग (26 उपकरण)

सभी उपकरण जो `/dashboard/cli-code` में दिखाई देते हैं। जिनके पास `baseUrlSupport: none` है, वे MITM या एक मैनुअल गाइड के माध्यम से जुड़े हुए हैं, न कि एक कस्टम बेस URL के माध्यम से:

| id           | नाम                      | विक्रेता                 | baseUrlSupport | configType   | acpSpawnable |
| ------------ | ------------------------ | ------------------------ | -------------- | ------------ | ------------ |
| claude       | क्लॉड कोड                | एंथ्रोपिक                | पूर्ण          | env          | सच           |
| codex        | OpenAI Codex CLI         | OpenAI                   | पूर्ण          | कस्टम        | सच           |
| zcode        | ZCode (GLM कोडिंग योजना) | Z.ai                     | कोई नहीं       | कस्टम        | झूठ          |
| cline        | क्लाइन                   | OSS (पूर्व- क्लॉड डेवलप) | पूर्ण          | कस्टम        | सच           |
| kilo         | किलो कोड                 | किलो-ऑर्ग                | पूर्ण          | कस्टम        | झूठ          |
| roo          | रू कोड                   | रू (OSS)                 | पूर्ण          | गाइड         | झूठ          |
| continue     | कंटिन्यू                 | continue.dev             | पूर्ण          | गाइड         | झूठ          |
| aider        | आइडर                     | OSS (P. गॉथियर)          | पूर्ण          | गाइड         | सच           |
| forge        | फोर्जकोड                 | एंटिनोमी HQ              | पूर्ण          | कस्टम        | सच           |
| jcode        | jcode                    | 1jehuang (OSS)           | पूर्ण          | कस्टम        | झूठ          |
| deepseek-tui | डीपसीक TUI               | हंटर बाउन (OSS)          | पूर्ण          | कस्टम        | झूठ          |
| codewhale    | कोडव्हेल                 | एचएमबॉउन (OSS)           | पूर्ण          | कस्टम        | झूठ          |
| opencode     | ओपनकोड                   | एनामली (पूर्व-SST)       | पूर्ण          | गाइड         | सच           |
| droid        | फैक्ट्री ड्रॉइड          | फैक्ट्री एआई             | आंशिक          | गाइड         | झूठ          |
| copilot      | GitHub Copilot CLI       | GitHub/MS                | पूर्ण          | कस्टम        | झूठ          |
| cursor-cli   | कर्सर CLI                | एनिस्फीयर                | आंशिक          | गाइड         | सच           |
| smelt        | स्मेल्ट                  | लियोनार्डसीसर (OSS)      | पूर्ण          | कस्टम        | झूठ          |
| pi           | पाई (pi-coding-agent)    | M. ज़ेच्नर (OSS)         | पूर्ण          | कस्टम        | झूठ          |
| grok-build   | ग्रोक बिल्ड              | xAI                      | पूर्ण          | कस्टम        | झूठ          |
| crush        | क्रश                     | OSS (चार्म)              | पूर्ण          | कस्टम        | झूठ          |
| qwen         | क्यूवेन कोड              | अलीबाबा                  | पूर्ण          | गाइड         | सच           |
| cursor       | कर्सर                    | एनिस्फीयर                | कोई नहीं       | गाइड         | झूठ          |
| antigravity  | एंटीग्रेविटी             | गूगल                     | कोई नहीं       | mitm         | झूठ          |
| hermes       | हर्मेस                   | नॉस रिसर्च               | कोई नहीं       | गाइड         | झूठ          |
| kiro         | कीरो एआई                 | अमेज़न                   | कोई नहीं       | mitm         | झूठ          |
| custom       | कस्टम CLI                | —                        | पूर्ण          | कस्टम-बिल्डर | झूठ          |

जिन उपकरणों में `baseUrlSupport: "partial"` है, वे डैशबोर्ड कार्ड में "⚠ बेस URL आंशिक" बैज दिखाते हैं।

## 2. CLI एजेंटों की सूची (8 उपकरण)

स्वायत्त एजेंट जो `/dashboard/cli-agents` में दिखाई देते हैं:

| id           | नाम            | विक्रेता                 | baseUrlSupport | acpSpawnable |
| ------------ | -------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | हर्मेस एजेंट   | Nous Research            | पूर्ण          | झूठा         |
| openclaw     | ओपनक्लॉ        | OSS (P. Steinberger)     | पूर्ण          | सच           |
| goose        | गूज            | Block / Linux Foundation | पूर्ण          | सच           |
| interpreter  | ओपन इंटरप्रेटर | OSS                      | पूर्ण          | सच           |
| warp         | वार्प एआई      | Warp Inc.                | आंशिक          | सच           |
| agent-deck   | एजेंट डेक      | asheshgoplani (OSS)      | पूर्ण          | झूठा         |
| omp          | ओह माय पाई     | OSS                      | पूर्ण          | सच           |
| letta        | लेटा CLI       | लेटा                     | पूर्ण          | झूठा         |

---

## 3. ACP एजेंट (/dashboard/acp-agents)

यह पृष्ठ (जिसका नाम `/dashboard/agents` से बदला गया है) CLIs को दिखाता है जिन्हें OmniRoute **स्पॉन** कर सकता है बैकएंड निष्पादन इंजन के रूप में stdio/ACP प्रोटोकॉल के माध्यम से। सूची को `src/lib/acp/registry.ts` में अलग से बनाए रखा गया है और यह `CLI_TOOLS` के समान **नहीं** है।

---

## 4. MITM बैकलॉग (डैशबोर्ड में नहीं दिखाया गया)

निम्नलिखित CLIs स्वदेशी रूप से कस्टम बेस URL का समर्थन नहीं करते हैं और CLI कोड या CLI एजेंटों के पृष्ठों में **सूचीबद्ध नहीं** हैं। ये योजना 11 में MITM इंटरसेप्शन के लिए उम्मीदवार हैं:

| CLI                 | कारण                                                       |
| ------------------- | ---------------------------------------------------------- |
| windsurf            | BYOK केवल चयनित क्लॉड मॉडल + कॉर्पोरेट URL/token           |
| amp                 | बंद पारिस्थितिकी तंत्र (Sourcegraph)                       |
| amazon-q / kiro-cli | AWS SSO प्रमाणीकरण, कोई कस्टम URL नहीं                     |
| cowork              | एंथ्रोपिक डेस्कटॉप, कोई कॉन्फ़िगर करने योग्य एंडपॉइंट नहीं |

पूर्ण क्रॉस-रेफरेंस के लिए `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` देखें।

---

## 5. बैच डिटेक्शन API

सभी उपकरण पहचान एकल एंडपॉइंट के माध्यम से एकत्रित की जाती है:

**`GET /api/cli-tools/all-statuses`**

- प्रमाणीकरण: `requireCliToolsAuth(request)` (अन्य `/api/cli-tools/` मार्गों के समान)
- लौटाता है: `Record<toolId, ToolBatchStatus>` (प्रकार: `src/shared/types/cliBatchStatus.ts`)
- रणनीति: सभी उपकरणों पर `Promise.all`, प्रति उपकरण 5 सेकंड का टाइमआउट
- कैश: इन-मेमोरी LRU कॉन्फ़िग फ़ाइल `mtime` द्वारा अनुक्रमित। जब mtime बदलता है तो कैश अमान्य हो जाता है। सर्वर पुनः आरंभ पर रीसेट होता है।

प्रत्येक उपकरण के लिए प्रतिक्रिया आकार:

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
  error?: string; // साफ किया गया, कोई स्टैक ट्रेस नहीं
}
```

## 6. नए उपकरणों के लिए सेटिंग हैंडलर

`configType: "custom"` वाले नए उपकरणों के लिए समर्पित सेटिंग्स API रूट हैं:

| रूट                                         | उपकरण                                                                |
| ------------------------------------------- | -------------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                              |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url फ्लैग)                                             |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, विरासती)                              |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, प्राथमिक + विरासती `~/.deepseek` समन्वय) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                |
| `POST /api/cli-tools/pi-settings`           | Pi कोडिंग एजेंट                                                      |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + समर्पित `.env` कुंजी)           |

सभी रूट्स त्रुटि प्रतिक्रियाओं के लिए `sanitizeErrorMessage()` का उपयोग करते हैं (कठोर नियम #12)।

---

## 7. डैशबोर्ड पृष्ठों की वास्तुकला

### CLI कोड (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — सर्वर घटक
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — क्लाइंट ग्रिड
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — उपकरण विवरण पृष्ठ
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 विशेष उपकरण कार्ड + `ToolDetailClient.tsx`

### CLI एजेंट (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — सर्वर घटक
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — क्लाइंट ग्रिड
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — `ToolDetailClient` का पुन: उपयोग करता है

### ACP एजेंट (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — सर्वर घटक ( `agents/` से स्थानांतरित)

### साझा UI घटक (`src/shared/components/cli/`)

| फ़ाइल                   | उद्देश्य                                               |
| ----------------------- | ------------------------------------------------------ |
| `CliToolCard.tsx`       | स्मार्ट स्थिति कार्ड (पता लगाना + कॉन्फ़िग + एंडपॉइंट) |
| `CliConceptCard.tsx`    | प्रति-पृष्ठ अवधारणा व्याख्या कार्ड                     |
| `CliComparisonCard.tsx` | CLI प्रकारों के बीच तीन-स्तंभ तुलना                    |
| `BaseUrlSelect.tsx`     | एंडपॉइंट ड्रॉपडाउन (स्थानीय/क्लाउड/कस्टम)              |
| `ApiKeySelect.tsx`      | API कुंजी चयनकर्ता                                     |
| `ManualConfigModal.tsx` | कॉपी करने योग्य कॉन्फ़िग स्निपेट मोडल                  |

### साझा हुक (`src/shared/hooks/cli/`)

| फ़ाइल                     | उद्देश्य                                                                      |
| ------------------------- | ----------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | `/api/cli-tools/all-statuses` लाता है, लोडिंग/रीफ्रेश स्थिति प्रबंधित करता है |

## 8. i18n

योजना 14 F9 में नए नामस्थान जोड़े गए:

| Namespace   | Purpose                                                           |
| ----------- | ----------------------------------------------------------------- |
| `cliCommon` | साझा स्ट्रिंग्स (कार्ड लेबल, अवधारणा/तुलना पाठ, विवरण पृष्ठ लेबल) |
| `cliCode`   | CLI कोड के पृष्ठ स्ट्रिंग्स                                       |
| `cliAgents` | CLI एजेंट्स पृष्ठ स्ट्रिंग्स                                      |
| `acpAgents` | ACP एजेंट्स पृष्ठ स्ट्रिंग्स                                      |

पूर्ण PT-BR और EN अनुवाद प्रदान किए गए हैं। 39 अन्य स्थानीयताएँ स्वचालित रूप से `src/i18n/request.ts` में नामस्थान-स्तरीय मर्ज के माध्यम से EN पर वापस जाती हैं।

---

## 9. त्वरित प्रारंभ

### चरण 1 — OmniRoute API कुंजी प्राप्त करें

1. `/dashboard/api-manager` खोलें → **API कुंजी बनाएँ**
2. इसे एक नाम दें (जैसे `cli-tools`) और सभी अनुमतियाँ चुनें
3. कुंजी कॉपी करें — आपको नीचे दिए गए हर CLI के लिए इसकी आवश्यकता होगी

> आपकी कुंजी इस तरह दिखती है: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### चरण 2 — CLI उपकरण स्थापित करें

सभी npm-आधारित उपकरणों के लिए Node.js 22.22.2+ या 24.x की आवश्यकता है:

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
cargo install smelt  # Rust-आधारित

# Pi coding agent
# स्थापना के लिए https://github.com/zechnerj/pi-coding-agent देखें

# jcode
# स्थापना के लिए https://github.com/1jehuang/jcode देखें
```

---

### चरण 3 — डैशबोर्ड के माध्यम से कॉन्फ़िगर करें

1. `http://localhost:20128/dashboard/cli-code` पर जाएं
2. ग्रिड में अपने उपकरण को खोजें
3. उपकरण विवरण पृष्ठ खोलने के लिए कार्ड पर क्लिक करें
4. अपनी API कुंजी और बेस URL चुनें
5. **कॉन्फ़िग लागू करें** पर क्लिक करें या मैनुअल कॉन्फ़िग स्निपेट कॉपी करें

---

### चरण 4 — वैश्विक पर्यावरण चर सेट करें

```bash
# OmniRoute यूनिवर्सल एंडपॉइंट
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI ROOT पर GOOGLE_GEMINI_BASE_URL पढ़ता है (इसका SDK स्वयं /v1beta/... जोड़ता है)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> **दूरस्थ सर्वर** के लिए `localhost:20128` को सर्वर IP या डोमेन से बदलें,
> जैसे `http://<your-server-ip>:20128`।

---

### चरण 4 — प्रत्येक उपकरण को कॉन्फ़िगर करें

#### Claude Code

```bash
# ~/.claude/settings.json बनाएँ:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Claude Code के लिए एकीकृत Anthropic गेटवे रूट का उपयोग करें। यहाँ `/v1` न जोड़ें।

**परीक्षण:** `claude "say hello"`

---

#### OpenAI Codex

आधुनिक Codex (v0.137+) केवल `~/.codex/config.toml` पढ़ता है — पुराना
`config.yaml` विरासती npm CLI का है और चुपचाप अनदेखा किया जाता है। API
कुंजी `OMNIROUTE_API_KEY` पर्यावरण चर (`env_key`) में रहती है, कभी भी
फाइल के अंदर नहीं:

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

पूर्ण संदर्भ (प्रोफाइल, `wire_api`, संदर्भ विंडो): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**परीक्षण:** `codex "what is 2+2?"`

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

**परीक्षण:** `opencode`

> सोचने के वेरिएंट भेजने के लिए `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high` का उपयोग करें।

---

#### Cline (CLI या VS कोड)

**CLI मोड:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS कोड मोड:**
Cline एक्सटेंशन सेटिंग्स → API प्रदाता: `OpenAI Compatible` → बेस URL: `http://localhost:20128/v1`

या OmniRoute डैशबोर्ड का उपयोग करें → **CLI Tools → Cline → Apply Config**।

---

#### KiloCode (CLI या VS कोड)

**CLI मोड:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS कोड सेटिंग्स:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

या OmniRoute डैशबोर्ड का उपयोग करें → **CLI Tools → KiloCode → Apply Config**।

---

#### Continue (VS कोड एक्सटेंशन)

`~/.continue/config.yaml` संपादित करें:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

संपादन के बाद VS कोड को पुनः प्रारंभ करें।

---

#### VS कोड इंसाइडर्स (`chatLanguageModels.json`)

जब VS कोड इंसाइडर्स को कस्टम एंडपॉइंट मॉडल के लिए कॉन्फ़िगर किया गया है और आप OmniRoute को बिना कस्टम हेडर फ़ील्ड के काम करना चाहते हैं, तो इसका उपयोग करें।

**सिफारिश की गई स्थान:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**टोकनयुक्त OmniRoute उपनाम का उपयोग करते हुए उदाहरण:**

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

**नोट्स:**

- `sk-your-omniroute-key` को OmniRoute में बनाई गई API कुंजी से बदलें।
- `url` फ़ील्ड को `/api/v1/vscode/{token}/chat/completions` की ओर इंगित करना चाहिए।
- `modelsUrl` फ़ील्ड को `/api/v1/vscode/{token}/models` की ओर इंगित करना चाहिए।
- जब क्लाइंट कस्टम हेडर का समर्थन करता है, तो सामान्य `/v1` + Bearer हेडर प्रवाह को प्राथमिकता दें।
- URL-embedded टोकन संगतता बैकफॉल हैं और संपादक लॉग या प्रॉक्सी इतिहास में दिखाई दे सकते हैं।

---

#### Kiro CLI (Amazon)

```bash
# अपने AWS/Kiro खाते में लॉगिन करें:
kiro-cli login

# CLI अपनी स्वयं की प्रमाणीकरण का उपयोग करता है — Kiro CLI के लिए OmniRoute की आवश्यकता नहीं है।
# अन्य उपकरणों के लिए OmniRoute के साथ kiro-cli का उपयोग करें।
kiro-cli status
```

**Kiro IDE** डेस्कटॉप ऐप के लिए, OmniRoute द्वारा `/dashboard/cli-tools → Kiro` के तहत प्रदर्शित MITM एंडपॉइंट का उपयोग करें।

## 10. आंतरिक OmniRoute CLI

`omniroute` बाइनरी सर्वर जीवनचक्र, सेटअप, डायग्नोस्टिक्स, और प्रदाता प्रबंधन के लिए कमांड प्रदान करता है। प्रवेश बिंदु: `bin/omniroute.mjs`।

```bash
omniroute                              # सर्वर शुरू करें (डिफ़ॉल्ट पोर्ट 20128)
omniroute setup                        # इंटरैक्टिव सेटअप विज़ार्ड
omniroute doctor                       # कॉन्फ़िग, DB, पोर्ट, रनटाइम की जांच करें
omniroute providers list               # कॉन्फ़िगर किए गए प्रदाता कनेक्शन
omniroute providers test-all           # हर सक्रिय कनेक्शन का परीक्षण करें
omniroute reset-password               # व्यवस्थापक पासवर्ड रीसेट करें
omniroute logs                         # अनुरोध लॉग स्ट्रीम करें
omniroute health                       # विस्तृत स्वास्थ्य (ब्रेकर्स, कैश, मेमोरी)
omniroute --version                    # संस्करण प्रिंट करें
omniroute --help                       # सभी कमांड दिखाएं
```

### सेटअप और प्रारंभिककरण

```bash
omniroute setup                        # इंटरैक्टिव सेटअप विज़ार्ड
omniroute setup --non-interactive      # CI/स्वचालन मोड (env vars + फ्लैग पढ़ता है)
omniroute setup --password '<value>'   # सीधे व्यवस्थापक पासवर्ड सेट करें
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # एक ही बार में प्रदाता जोड़ें और परीक्षण करें
```

गैर-इंटरैक्टिव सेटअप के लिए मान्यता प्राप्त पर्यावरण चर:

| Var                 | उद्देश्य                                                             |
| ------------------- | -------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | प्रदाता API कुंजी (कमांडर `.env()` के माध्यम से `--api-key` से बंधी) |
| `DATA_DIR`          | OmniRoute डेटा निर्देशिका को ओवरराइड करें                            |

अन्य सभी गैर-इंटरैक्टिव इनपुट को फ्लैग के रूप में पास किया जाता है, पर्यावरण चर के रूप में नहीं:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(ऊपर `omniroute setup` विकल्प देखें)।

### डायग्नोस्टिक्स

```bash
omniroute doctor                       # कॉन्फ़िग, DB, पोर्ट, रनटाइम, मेमोरी, जीवितता की जांच करें
omniroute doctor --json                # मशीन-पठनीय JSON
omniroute doctor --no-liveness         # HTTP स्वास्थ्य जांच छोड़ें
omniroute doctor --host 0.0.0.0        # जीवितता होस्ट को ओवरराइड करें
omniroute doctor --liveness-url <url>  # पूर्ण स्वास्थ्य एंडपॉइंट URL ओवरराइड
```

डॉक्टर ये जांच करता है: `कॉन्फ़िग`, `डेटाबेस`, `स्टोरेज/एन्क्रिप्शन`,
`पोर्ट उपलब्धता`, `नोड रनटाइम`, `नेटिव बाइनरी` (better-sqlite3),
`मेमोरी`, और `सर्वर जीवितता`। यदि कोई जांच `फेल` है तो यह गैर-शून्य पर समाप्त होता है।

### प्रदाता प्रबंधन

```bash
omniroute providers available                       # OmniRoute प्रदाता कैटलॉग
omniroute providers available --search openai       # आईडी/नाम/उपनाम/श्रेणी द्वारा कैटलॉग को फ़िल्टर करें
omniroute providers available --category api-key    # श्रेणी द्वारा फ़िल्टर करें (api-key, oauth, free, ...)
omniroute providers available --json                # मशीन-पठनीय JSON

omniroute providers list                            # कॉन्फ़िगर किए गए प्रदाता कनेक्शन
omniroute providers list --json

omniroute providers test <id|name>                  # एक कॉन्फ़िगर किए गए कनेक्शन का परीक्षण करें
omniroute providers test-all                        # हर सक्रिय कनेक्शन का परीक्षण करें
omniroute providers validate                        # स्थानीय-केवल संरचनात्मक मान्यता
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # मौजूदा OAuth प्रवाह
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` API-प्रथम हैं और इसलिए सक्रिय स्थानीय या दूरस्थ संदर्भ के खिलाफ काम करते हैं। क्रेडेंशियल इनपुट को `--credential-stdin` या `--credential-env` का उपयोग करना चाहिए; `--dry-run --json` केवल छिपी हुई उपस्थिति/आकार की रिपोर्ट करता है। `providers available` OmniRoute कैटलॉग को पढ़ता है; `providers list/test/test-all/validate` अपनी स्थानीय SQLite व्यवहार को बनाए रखते हैं और सर्वर के चलने की आवश्यकता नहीं होती है।

### पुनर्प्राप्ति और रीसेट

```bash
omniroute reset-password                # व्यवस्थापक पासवर्ड रीसेट करें (अन्य: omniroute-reset-password)
omniroute reset-encrypted-columns       # एन्क्रिप्टेड क्रेडेंशियल रीसेट के लिए चेतावनी + ड्राई-रन दिखाएं
omniroute reset-encrypted-columns --force  # वास्तव में SQLite में एन्क्रिप्टेड क्रेडेंशियल को शून्य करें
```

### क्रेडेंशियल निर्यात (⚠ सावधानी से संभालें)

```bash
omniroute auth export                                 # चेतावनी + पुष्टि गेट दिखाएं — कोई DB एक्सेस नहीं
omniroute auth export --force                          # सभी कनेक्शनों के DECRYPTED क्रेडेंशियल को stdout पर JSON के रूप में निर्यात करें
omniroute auth export --force --id <id>                 # केवल मिलान करने वाले कनेक्शन को निर्यात करें
omniroute auth export --force --format env               # OMNIROUTE_<PROVIDER>_<FIELD>=<value> पंक्तियाँ उत्पन्न करें
omniroute auth export --force --out creds.json           # एक फ़ाइल में लिखें (0600 अनुमतियों के साथ बनाई गई)
```

`auth export` **स्थानीय-केवल** है (प्रत्यक्ष SQLite पढ़ें, कोई HTTP मार्ग नहीं) और जानबूझकर **प्लेनटेक्स्ट** `apiKey`/`accessToken`/`refreshToken`/`idToken` मानों को प्रिंट/लिखता है — यह विशेषता है, बग नहीं। बिना `--force` के कुछ भी डेटाबेस से नहीं पढ़ा जाता है, और कुछ भी डिक्रिप्ट नहीं किया जाता है। किसी भी प्लेनटेक्स्ट को उत्पन्न करने से पहले हमेशा एक stderr चेतावनी बैनर प्रिंट होता है। `STORAGE_ENCRYPTION_KEY` सेट होना आवश्यक है। एक फ़ील्ड जो डिक्रिप्ट करने में विफल होती है (पुराना कुंजी, भ्रष्ट ciphertext) को `"<field>DecryptFailed: true"` के रूप में रिपोर्ट किया जाता है, न कि पूरे निर्यात को रोकने या अंतर्निहित त्रुटि को लीक करने के लिए।

### अन्य उपकमांड

ये एक चल रहे OmniRoute सर्वर को मानते हैं, जब तक कि अन्यथा नोट न किया गया हो:

```bash
omniroute status                       # व्यापक रनटाइम स्थिति
omniroute logs                         # अनुरोध लॉग स्ट्रीम करें (--json, --search, --follow)
omniroute config show                  # वर्तमान कॉन्फ़िगरेशन प्रदर्शित करें

omniroute provider list                # उपलब्ध प्रदाताओं की सूची (providers list का उपनाम)
omniroute provider add                 # एक उपकरण पर प्रदाता के रूप में OmniRoute को पंजीकृत करें
omniroute keys add | list | remove     # API कुंजी प्रबंधित करें
omniroute models [provider]            # मॉडल सूचीबद्ध करें (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # कॉन्फ़िग + DB का स्नैपशॉट
omniroute restore                      # पिछले स्नैपशॉट से पुनर्स्थापित करें

omniroute health                       # विस्तृत स्वास्थ्य (ब्रेकर्स, कैश, मेमोरी)
omniroute quota                        # प्रदाता कोटा उपयोग
omniroute cache                        # कैश स्थिति
omniroute cache clear                  # सेमांटिक + सिग्नेचर कैश साफ करें

omniroute mcp status | restart         # MCP सर्वर स्थिति / पुनः प्रारंभ
omniroute a2a status | card            # A2A सर्वर स्थिति / एजेंट कार्ड

omniroute tunnel list | create | stop  # टनल प्रबंधित करें (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # env vars का निरीक्षण / सेट करें (अस्थायी)

omniroute test                         # प्रदाता कनेक्टिविटी स्मोक टेस्ट
omniroute update                       # अपडेट के लिए जांचें
omniroute completion                   # शेल पूर्णता उत्पन्न करें
```

### सामान्य फ्लैग

| फ्लैग               | विवरण                                                      |
| ------------------- | ---------------------------------------------------------- |
| `--no-open`         | प्रारंभ पर ब्राउज़र को स्वचालित रूप से न खोलें             |
| `--port <n>`        | API पोर्ट को ओवरराइड करें (डिफ़ॉल्ट 20128)                 |
| `--mcp`             | stdio के माध्यम से MCP सर्वर के रूप में चलाएँ (IDE के लिए) |
| `--non-interactive` | CI मोड (कोई संकेत नहीं; env/flags से पढ़ता है)             |
| `--json`            | मशीन-पठनीय JSON आउटपुट (doctor, providers, आदि)            |
| `--help`, `-h`      | कमांड-विशिष्ट सहायता दिखाएं                                |
| `--version`, `-v`   | स्थापित संस्करण प्रिंट करें                                |

---

## उपलब्ध API एंडपॉइंट्स

| एंडपॉइंट                   | विवरण                              | उपयोग के लिए                                |
| -------------------------- | ---------------------------------- | ------------------------------------------- |
| `/v1/chat/completions`     | मानक चैट (सभी प्रदाता)             | सभी आधुनिक उपकरण                            |
| `/v1/responses`            | प्रतिक्रियाएँ API (OpenAI प्रारूप) | कोडेक्स, एजेंटिक वर्कफ़्लो                  |
| `/v1/completions`          | विरासत टेक्स्ट पूर्णताएँ           | पुराने उपकरण जो `prompt:` का उपयोग करते हैं |
| `/v1/embeddings`           | टेक्स्ट एम्बेडिंग                  | RAG, खोज                                    |
| `/v1/images/generations`   | छवि निर्माण                        | GPT-Image, फ्लक्स, आदि                      |
| `/v1/audio/speech`         | टेक्स्ट-से-भाषण                    | ElevenLabs, OpenAI TTS                      |
| `/v1/audio/transcriptions` | भाषण-से-टेक्स्ट                    | Deepgram, AssemblyAI                        |

पेस्ट करने के लिए तैयार उदाहरणों के साथ एक टोकनयुक्त OmniRoute URL:

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

## समस्या निवारण

| त्रुटि                                       | कारण                     | समाधान                                                                   |
| -------------------------------------------- | ------------------------ | ------------------------------------------------------------------------ |
| `Connection refused`                         | OmniRoute चल नहीं रहा    | `omniroute serve`                                                        |
| `401 Unauthorized`                           | गलत API कुंजी            | `/dashboard/api-manager` में जांचें                                      |
| `No combo configured`                        | कोई सक्रिय रूटिंग कॉम्बो | `/dashboard/combos` में सेट करें                                         |
| CLI shows "not installed"                    | बाइनरी PATH में नहीं है  | `which <command>` में जांचें                                             |
| Dashboard shows "not detected" after install | कैश पुराना               | डैशबोर्ड में "⟳ Refresh detection" पर क्लिक करें                         |
| पुराना लिंक `/dashboard/cli-tools`           | Pre-v3.8.6 बुकमार्क      | स्वचालित रूप से `/dashboard/cli-code` (308) पर पुनर्निर्देशित किया गया   |
| पुराना लिंक `/dashboard/agents`              | Pre-v3.8.6 बुकमार्क      | स्वचालित रूप से `/dashboard/acp-agents` (308) पर पुनर्निर्देशित किया गया |
