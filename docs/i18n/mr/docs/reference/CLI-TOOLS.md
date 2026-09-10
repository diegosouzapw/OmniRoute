# CLI-TOOLS (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI साधने — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI साधने — OmniRoute

शेवटचा अद्यतन: 2026-08-18

OmniRoute तीन श्रेणींच्या CLI साधनांसह एकत्रित आहे, जे तीन समर्पित डॅशबोर्ड पृष्ठांवर पसरलेले आहेत:

| पृष्ठ        | मार्ग                   | संकल्पना                                                                              | संख्या     |
| ------------ | ----------------------- | ------------------------------------------------------------------------------------- | ---------- |
| **CLI कोड**  | `/dashboard/cli-code`   | OmniRoute कडे निर्देशित केलेले कोडिंग साधने (क्लायंट → CLI → OmniRoute → प्रदाता)     | 26         |
| **CLI एजंट** | `/dashboard/cli-agents` | OmniRoute कडे निर्देशित केलेले स्वायत्त एजंट (त्याच प्रवाहात, व्यापक व्याप्ती)        | 8          |
| **ACP एजंट** | `/dashboard/acp-agents` | OmniRoute द्वारे stdio/ACP च्या माध्यमातून बॅकएंड म्हणून तयार केलेले CLI (उलट प्रवाह) | नोंदणी पहा |

लेगसी मार्ग 308 द्वारे पुनर्निर्देशित करतात: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## हे कसे कार्य करते

```
CLI कोड / CLI एजंट (उपभोग प्रवाह):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes एजंट / Goose / ...
           │
           ▼  (सर्व OmniRoute कडे निर्देशित)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute योग्य प्रदात्याकडे मार्गदर्शन करते)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP एजंट (उलट तयार होणारा प्रवाह):
    क्लायंट विनंती → OmniRoute → stdio/ACP द्वारे CLI तयार करते → प्रतिसाद
```

**फायदे:**

- सर्व साधने व्यवस्थापित करण्यासाठी एक API की
- डॅशबोर्डमध्ये सर्व CLI च्या खर्चाचे ट्रॅकिंग
- प्रत्येक साधन पुन्हा कॉन्फिगर न करता मॉडेल स्विचिंग
- स्थानिक आणि दूरस्थ सर्व्हरवर कार्य करते (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## `setup-*` सह स्वयंचलित कॉन्फिगर करा

आपल्याला प्रत्येक साधनाची कॉन्फिगरेशन हाताने लिहिण्याची आवश्यकता नाही. OmniRoute एक `setup-*`
कमांड पाठवते प्रत्येक समर्थित CLI साठी, जे चालू OmniRoute (स्थानिक किंवा दूरस्थ) मधून **लाइव्ह** मॉडेल कॅटलॉग वाचते आणि आपल्या मशीनवर साधनाची स्वतःची कॉन्फिगरेशन लिहिते:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

प्रत्येक `--remote <url> --api-key <key>` स्वीकारतो (दूरस्थ OmniRoute विरुद्ध स्थानिक साधन कॉन्फिगर करणे), `--dry-run` (लेखन न करता पूर्वावलोकन), आणि `--port`. मॉडेल स्वयंचलित शोध नसलेल्या साधनांसाठी (Cline, Kilo, Roo, Goose, Aider, Qwen) `--model <id>` (आणि `--yes` नॉन-इंटरएक्टिव्ह चालवण्यासाठी) आवश्यक आहे. योग्य वातावरण इंजेक्ट केलेल्या CLI सुरू करण्यासाठी आणि कोणतीही कॉन्फिगरेशन न लिहिण्यासाठी, सामान्य `omniroute run <target>` लाँचर वापरा (claude, codex, aider, goose, opencode, qwen, gemini — लक्ष्य आणि उपनाम `bin/cli/cli-manifest.mjs` मधून येतात); लेगसी प्रति-साधन लाँचर `omniroute launch` (Claude Code) आणि `omniroute launch-codex` (Codex) उपलब्ध आहेत. Gemini CLI फक्त लाँच-केवळ आहे: हे एक `omniroute run` लक्ष्य आहे परंतु याला `setup-*`/`configure` रेसिपी नाही.

> **पूर्ण संदर्भ:** मास्टर टेबल — प्रत्येक कमांड काय लिहितो, प्रत्येक ध्वज,
> स्थानिक विरुद्ध दूरस्थ, आणि कोणती साधने `/v1` उपसर्गाची आवश्यकता आहे — येथे आहे
> **[CLI एकत्रीकरण](../guides/CLI-INTEGRATIONS.md)**.

### कंटेनरमध्ये हे चालवणे

OmniRoute कंटेनरमध्ये कार्यान्वित केलेले `setup-*` कमांड कंटेनरच्या स्वतःच्या घरात लिहितात, जे कोणतेही होस्ट CLI वाचत नाही आणि जे कंटेनरच्या सह गायब होते. OmniRoute ते ओळखते आणि लेखन न करता निर्देशांसह `2` बाहेर पडते. पुढे जाण्यासाठी दोन समर्थित मार्ग — होस्टवर CLI स्थापित करा आणि कंटेनरवर `omniroute connect` करा, किंवा कॉन्फिगरेशन डिरेक्टरी बाइंड-माउंट करा आणि `CLI_CONFIG_HOME` सेट करा (कॉम्पोज `host` प्रोफाइल). प्रत्येक `setup-*` कमांड, तसेच `omniroute configure` आणि `omniroute config set`, कंटेनरच्या स्वतःच्या CLI च्या कॉन्फिगरेशनसाठी आपण खरोखर काय म्हणत आहात तेव्हा `--allow-container-write` स्वीकारतो; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` सर्व्हर साठी तेच करते. पहा
[Docker मार्गदर्शक → होस्ट CLI साधने कॉन्फिगर करणे](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

डॅशबोर्डचा **अर्ज एंडपॉइंट** (`POST /api/cli-tools/apply`) समान गार्ड लागू करतो: कंटेनरमध्ये, एक लेखन ज्याचा लक्ष्य होस्टकडून बाइंड-माउंट केलेले नाही **`422`** सह उत्तर देते `containerEphemeralTarget: true`, सुरक्षित त्रुटी मजकूर आणि — होस्ट रेसिपी असलेल्या साधनांसाठी (claude, codex, opencode, cline, kilo, continue) — एक `hostSetupCommand` (उदा. `omniroute setup-opencode`) जे होस्टवर चालवायचे आहे; काहीही लिहिले जात नाही. `dryRun: true` कंटेनर मोडमध्ये कार्यरत राहते आणि डिस्कवर स्पर्श न करता तयार केलेला सामग्री + लक्ष्य पथ परत करते, त्यामुळे आपण डॅशबोर्डवरून पूर्वावलोकन करू शकता आणि होस्टवर लागू करू शकता. हे वर्तन हेतुपुरस्सर आहे आणि `tests/unit/api/cli-tools/apply-container-guard.test.ts` द्वारे पुनरागमन-सुरक्षित आहे — कधीही "फिक्स" 422 गार्ड काढून टाकून.

---

## सत्याचा स्रोत

एकत्रित कॅटलॉग `src/shared/constants/cliTools.ts` मध्ये `CLI_TOOLS: Record<string, CliCatalogEntry>` म्हणून अस्तित्वात आहे.

प्रत्येक नोंदीत या क्षेत्रांचा समावेश आहे (जे `src/shared/schemas/cliCatalog.ts` मध्ये परिभाषित आहेत):

| क्षेत्र                                         | प्रकार                                                       | वर्णन                                                 |
| ----------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | साधन कोणत्या पृष्ठावर दिसते                           |
| `vendor`                                        | `string`                                                     | साधनाचा उगम ("Anthropic", "OSS (P. Gauthier)")        |
| `acpSpawnable`                                  | `boolean`                                                    | ACP एजंट म्हणून देखील वापरता येतो (बॅज दर्शविला जातो) |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | कस्टम एंडपॉइंट समर्थन स्तर. `"none"` = MITM बॅकलॉग    |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | कॉन्फिगरेशन यांत्रिकी                                 |
| `id`, `name`, `color`, `description`, `docsUrl` | मानक                                                         | मुख्य प्रदर्शन क्षेत्र                                |

`baseUrlSupport: "none"` असलेल्या नोंदी **डॅशबोर्ड पृष्ठांवर दर्शविल्या जात नाहीत** — त्यांना योजना 11 साठी MITM बॅकलॉगमध्ये नोंदवले जाते (पहा `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### क्षमता स्तर (कॅटलॉग केलेले × शोधता येणारे × कॉन्फिगर करण्यायोग्य × सुरू करण्यायोग्य)

प्रत्येक कॅटलॉग केलेले साधन शोधता येणारे, कॉन्फिगर करण्यायोग्य किंवा सुरू करण्यायोग्य असेलच असे नाही. प्रत्येक स्तराला एक
घोषणात्मक स्रोत आहे, आणि एक ड्रिफ्ट चाचणी त्यांना समांतर ठेवते:

| स्तर             | अर्थ                                                                     | घोषणित केलेले                                                   |
| ---------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------- |
| **Cataloged**    | डॅशबोर्ड कॅटलॉगमध्ये दिसते (नाव, विक्रेता, दस्तऐवज, कॉन्फिग प्रकार)      | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                |
| **Detectable**   | बायनरी/कॉन्फिग शोध, आरोग्य तपासणी, कॉन्फिग पथ                            | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` रनटाइम कॅटलॉग) |
| **Configurable** | `omniroute configure <cli>` द्वारे समर्थित (सेटअप रेसिपी अस्तित्वात आहे) | `bin/cli/cli-manifest.mjs` (`configure: true`)                  |
| **Launchable**   | `omniroute run <target>` द्वारे समर्थित (env/args इंजेक्शन परिभाषित)     | `bin/cli/cli-manifest.mjs` (`run: true`)                        |

`bin/cli/cli-manifest.mjs` CLI आदेशांसाठी मानक कार्यान्वयन मॅनिफेस्ट आहे
सतह: `run`, `configure` आणि शेल-पूर्णता जनरेटर सर्व त्यांच्या
लक्ष्य सूची, उपनाम निराकरण (उदाहरणार्थ `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
आणि `--model` ध्वज वायरिंग यावरून घेतात. ड्रिफ्ट गार्ड
`tests/unit/cli/cli-manifest-drift.test.ts` याची खात्री करतो की मॅनिफेस्ट, रनटाइम
कॅटलॉग, UI कॅटलॉग आणि प्रत्येक उपभोक्ता सतह समक्रमित राहतात — एक लक्ष्य एक
सतहवर जोडले गेले तरी इतरांवर न जोडल्यास चाचणी अपयशी ठरते, चुपचाप ड्रिफ्ट होत नाही.

## 1. CLI कोडचा कॅटलॉग (26 साधने)

सर्व साधने ज्या `/dashboard/cli-code` मध्ये दिसतात. `baseUrlSupport: none` असलेल्या साधनांना MITM किंवा मॅन्युअल मार्गदर्शकाद्वारे कनेक्ट केले जाते, कस्टम बेस URL च्या ऐवजी:

| id           | name                    | vendor              | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ----------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code             | Anthropic           | full           | env            | true         |
| codex        | OpenAI Codex CLI        | OpenAI              | full           | custom         | true         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                | none           | custom         | false        |
| cline        | Cline                   | OSS (ex-Claude Dev) | full           | custom         | true         |
| kilo         | Kilo Code               | Kilo-Org            | full           | custom         | false        |
| roo          | Roo Code                | Roo (OSS)           | full           | guide          | false        |
| continue     | Continue                | continue.dev        | full           | guide          | false        |
| aider        | Aider                   | OSS (P. Gauthier)   | full           | guide          | true         |
| forge        | ForgeCode               | Antinomy HQ         | full           | custom         | true         |
| jcode        | jcode                   | 1jehuang (OSS)      | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)   | full           | custom         | false        |
| codewhale    | CodeWhale               | Hmbown (OSS)        | full           | custom         | false        |
| opencode     | OpenCode                | Anomaly (ex-SST)    | full           | guide          | true         |
| droid        | Factory Droid           | Factory AI          | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI      | GitHub/MS           | full           | custom         | false        |
| cursor-cli   | Cursor CLI              | Anysphere           | partial        | guide          | true         |
| smelt        | Smelt                   | leonardcser (OSS)   | full           | custom         | false        |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)    | full           | custom         | false        |
| grok-build   | Grok Build              | xAI                 | full           | custom         | false        |
| crush        | Crush                   | OSS (Charm)         | full           | custom         | false        |
| qwen         | Qwen Code               | Alibaba             | full           | guide          | true         |
| cursor       | Cursor                  | Anysphere           | none           | guide          | false        |
| antigravity  | Antigravity             | Google              | none           | mitm           | false        |
| hermes       | Hermes                  | Nous Research       | none           | guide          | false        |
| kiro         | Kiro AI                 | Amazon              | none           | mitm           | false        |
| custom       | Custom CLI              | —                   | full           | custom-builder | false        |

`baseUrlSupport: "partial"` असलेल्या साधनांना डॅशबोर्ड कार्डमध्ये "⚠ Base URL parcial" चा बॅज दर्शविला जातो.
---

## 2. CLI एजंट्स कॅटलॉग (8 साधने)

स्वायत्त एजंट्स जे `/dashboard/cli-agents` मध्ये दिसतात:

| id           | नाव            | विक्रेता                | baseUrlSupport | acpSpawnable |
| ------------ | -------------- | ----------------------- | -------------- | ------------ |
| hermes-agent | हर्मेस एजंट    | नॉस रिसर्च              | पूर्ण          | खोटी         |
| openclaw     | ओपनक्लॉ        | OSS (P. स्टाइनबर्गर)    | पूर्ण          | खरी          |
| goose        | गूज            | ब्लॉक / लिनक्स फाउंडेशन | पूर्ण          | खरी          |
| interpreter  | ओपन इंटरप्रेटर | OSS                     | पूर्ण          | खरी          |
| warp         | वॉर्प एआय      | वॉर्प इंक.              | अंशतः          | खरी          |
| agent-deck   | एजंट डेक       | asheshgoplani (OSS)     | पूर्ण          | खोटी         |
| omp          | ओह माय पाय     | OSS                     | पूर्ण          | खरी          |
| letta        | लेट्टा CLI     | लेट्टा                  | पूर्ण          | खोटी         |

---

## 3. ACP एजंट्स (/dashboard/acp-agents)

ही पृष्ठ ( `/dashboard/agents` वरून नाव बदललेले) OmniRoute ला **स्पॉन** करण्यास सक्षम CLI दर्शवते जे बॅकएंड कार्यान्वयन इंजिन म्हणून stdio/ACP प्रोटोकॉलद्वारे कार्य करतात. कॅटलॉग `src/lib/acp/registry.ts` मध्ये स्वतंत्रपणे देखरेख केली जाते आणि हे `CLI_TOOLS` सारखे **नाही** आहे.

---

## 4. MITM बॅकलॉग (डॅशबोर्डमध्ये दर्शवलेले नाही)

खालील CLI स्वदेशीपणे कस्टम बेस URL समर्थन करत नाहीत आणि CLI कोडच्या किंवा CLI एजंट्सच्या पृष्ठांमध्ये **यादीबद्ध** केलेले नाहीत. ते योजना 11 मध्ये MITM हस्तक्षेपासाठी उमेदवार आहेत:

| CLI                 | कारण                                                   |
| ------------------- | ------------------------------------------------------ |
| windsurf            | BYOK निवडक क्लॉड मॉडेल्स + कॉर्पोरेट URL/token         |
| amp                 | बंद पारिस्थितिकी तंत्र (Sourcegraph)                   |
| amazon-q / kiro-cli | AWS SSO प्रमाणीकरण, कस्टम URL नाही                     |
| cowork              | अँथ्रोपिक डेस्कटॉप, कॉन्फिगर करण्यायोग्य एंडपॉइंट नाही |

पूर्ण क्रॉस-रेफरन्ससाठी `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` पहा.

---

## 5. बॅच डिटेक्शन API

सर्व साधनांचे डिटेक्शन एका एकल एंडपॉइंटद्वारे एकत्रित केले जाते:

**`GET /api/cli-tools/all-statuses`**

- प्रमाणीकरण: `requireCliToolsAuth(request)` (इतर `/api/cli-tools/` मार्गांप्रमाणे)
- परत करते: `Record<toolId, ToolBatchStatus>` (प्रकार: `src/shared/types/cliBatchStatus.ts`)
- धोरण: सर्व साधनांवर `Promise.all`, प्रत्येक साधनासाठी 5 सेकंदांचा टाइमआउट
- कॅश: इन-मेमरी LRU कॉन्फिग फाइल `mtime` द्वारे अनुक्रमित. mtime बदलल्यावर कॅश अमान्य केला जातो. सर्व्हर पुन्हा सुरू झाल्यावर रीसेट.

प्रत्येक साधनासाठी प्रतिसादाचा आकार:

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
  error?: string; // स्वच्छ, स्टॅक ट्रेस नाही
}
```

## 6. नवीन साधनांसाठी सेटिंग्ज हँडलर्स

`configType: "custom"` असलेल्या नवीन साधनांसाठी समर्पित सेटिंग्ज API मार्ग आहेत:

| मार्ग                                       | साधन                                                               |
| ------------------------------------------- | ------------------------------------------------------------------ |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                            |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url ध्वज)                                            |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, वारसा)                              |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, प्राथमिक + वारसा `~/.deepseek` समन्वय) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                              |
| `POST /api/cli-tools/pi-settings`           | Pi कोडिंग एजंट                                                     |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)              |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + समर्पित `.env` की)            |

सर्व मार्ग `sanitizeErrorMessage()` वापरतात त्रुटी प्रतिसादांसाठी (कठोर नियम #12).

---

## 7. डॅशबोर्ड पृष्ठांची आर्किटेक्चर

### CLI कोड (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — सर्व्हर घटक
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — क्लायंट ग्रिड
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — साधन तपशील पृष्ठ
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 विशेष साधन कार्ड + `ToolDetailClient.tsx`

### CLI एजंट (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — सर्व्हर घटक
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — क्लायंट ग्रिड
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — `ToolDetailClient` पुन्हा वापरतो

### ACP एजंट (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — सर्व्हर घटक (`agents/` मधून हलवले)

### सामायिक UI घटक (`src/shared/components/cli/`)

| फाइल                    | उद्देश                                               |
| ----------------------- | ---------------------------------------------------- |
| `CliToolCard.tsx`       | स्मार्ट स्थिती कार्ड (डिटेक्शन + कॉन्फिग + एंडपॉइंट) |
| `CliConceptCard.tsx`    | प्रति-पृष्ठ संकल्पना स्पष्टता कार्ड                  |
| `CliComparisonCard.tsx` | CLI प्रकारांमध्ये तीन-स्तंभ तुलना                    |
| `BaseUrlSelect.tsx`     | एंडपॉइंट ड्रॉपडाऊन (स्थानिक/क्लाउड/कस्टम)            |
| `ApiKeySelect.tsx`      | API की निवडक                                         |
| `ManualConfigModal.tsx` | कॉपी करण्यायोग्य कॉन्फिग स्निपेट मोडाल               |

### सामायिक हुक (`src/shared/hooks/cli/`)

| फाइल                      | उद्देश                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------ |
| `useToolBatchStatuses.ts` | `/api/cli-tools/all-statuses` कडून डेटा आणतो, लोडिंग/रिफ्रेश स्थिती व्यवस्थापित करतो |

## 8. i18n

योजना 14 F9 मध्ये नवीन नामस्थान जोडले:

| Namespace   | Purpose                                                                 |
| ----------- | ----------------------------------------------------------------------- |
| `cliCommon` | सामायिक स्ट्रिंग्ज (कार्ड लेबल, संकल्पना/तुलना मजकूर, तपशील पृष्ठ लेबल) |
| `cliCode`   | CLI कोडच्या पृष्ठाच्या स्ट्रिंग्ज                                       |
| `cliAgents` | CLI एजंट्स पृष्ठाच्या स्ट्रिंग्ज                                        |
| `acpAgents` | ACP एजंट्स पृष्ठाच्या स्ट्रिंग्ज                                        |

पूर्ण PT-BR आणि EN भाषांतर प्रदान केले आहे. 39 इतर स्थानिकता `src/i18n/request.ts` मध्ये नामस्थान-स्तरीय विलीनद्वारे स्वयंचलितपणे EN वर परत जातात.

---

## 9. जलद प्रारंभ

### चरण 1 — OmniRoute API की मिळवा

1. `/dashboard/api-manager` उघडा → **API की तयार करा**
2. त्याला एक नाव द्या (उदा. `cli-tools`) आणि सर्व परवानग्या निवडा
3. की कॉपी करा — तुम्हाला खालील प्रत्येक CLI साठी ती आवश्यक असेल

> तुमची की अशी दिसते: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### चरण 2 — CLI साधने स्थापित करा

सर्व npm-आधारित साधनांना Node.js 22.22.2+ किंवा 24.x आवश्यक आहे:

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
# स्थापित करण्यासाठी https://github.com/zechnerj/pi-coding-agent पहा

# jcode
# स्थापित करण्यासाठी https://github.com/1jehuang/jcode पहा
```

---

### चरण 3 — डॅशबोर्डद्वारे कॉन्फिगर करा

1. `http://localhost:20128/dashboard/cli-code` वर जा
2. ग्रिडमध्ये तुमचे साधन शोधा
3. साधन तपशील पृष्ठ उघडण्यासाठी कार्डवर क्लिक करा
4. तुमची API की आणि बेस URL निवडा
5. **कॉन्फिग लागू करा** किंवा मॅन्युअल कॉन्फिग स्निप्पेट कॉपी करा

---

### चरण 4 — जागतिक पर्यावरण चलांक सेट करा

```bash
# OmniRoute युनिव्हर्सल एंडपॉइंट
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI ROOT वर GOOGLE_GEMINI_BASE_URL वाचतो (त्याचे SDK स्वतः /v1beta/... जोडते)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> **दूरस्थ सर्व्हर** साठी `localhost:20128` चा बदल सर्व्हर IP किंवा डोमेनने करा,
> उदा. `http://<your-server-ip>:20128`.

---

### चरण 4 — प्रत्येक साधन कॉन्फिगर करा

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

Claude Code साठी एकत्रित Anthropic गेटवे रूट वापरा. येथे `/v1` जोडू नका.

**चाचणी:** `claude "say hello"`

---

#### OpenAI Codex

आधुनिक Codex (v0.137+) फक्त `~/.codex/config.toml` वाचतो — जुना
`config.yaml` वारसा npm CLI चा आहे आणि चुपचाप दुर्लक्षित केला जातो. API
की `OMNIROUTE_API_KEY` पर्यावरण चलांमध्ये (`env_key`) राहते, कधीही
फाईलमध्ये नाही:

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

**चाचणी:** `codex "what is 2+2?"`

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

**चाचणी:** `opencode`

> विचारणीय विविधता पाठवण्यासाठी `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high` वापरा.

---

#### Cline (CLI किंवा VS कोड)

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
Cline विस्तार सेटिंग्ज → API प्रदाता: `OpenAI Compatible` → बेस URL: `http://localhost:20128/v1`

किंवा OmniRoute डॅशबोर्ड वापरा → **CLI साधने → Cline → कॉन्फिग लागू करा**.

---

#### KiloCode (CLI किंवा VS कोड)

**CLI मोड:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS कोड सेटिंग्ज:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

किंवा OmniRoute डॅशबोर्ड वापरा → **CLI साधने → KiloCode → कॉन्फिग लागू करा**.

---

#### Continue (VS कोड विस्तार)

`~/.continue/config.yaml` संपादित करा:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

संपादनानंतर VS कोड पुनः सुरू करा.

---

#### VS कोड इन्सायडर्स (`chatLanguageModels.json`)

जेव्हा VS कोड इन्सायडर्स कस्टम एंडपॉइंट मॉडेलसाठी कॉन्फिगर केले जाते आणि तुम्हाला OmniRoute कस्टम हेडर फील्डशिवाय कार्य करावे लागेल तेव्हा हे वापरा.

**शिफारस केलेले स्थान:**

- लिनक्स: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- विंडोज: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**टोकन केलेल्या OmniRoute उपनामाचा वापर करून उदाहरण:**

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

**टीप:**

- `sk-your-omniroute-key` चा बदल OmniRoute मध्ये तयार केलेल्या API कीने करा.
- `url` फील्ड `/api/v1/vscode/{token}/chat/completions` कडे निर्देशित करावा.
- `modelsUrl` फील्ड `/api/v1/vscode/{token}/models` कडे निर्देशित करावा.
- क्लायंट कस्टम हेडरला समर्थन देत असल्यास सामान्य `/v1` + Bearer हेडर प्रवाह प्राधान्य द्या.
- URL-आधारित टोकन एक सुसंगतता बॅकफॉल आहेत आणि संपादकाच्या लॉग किंवा प्रॉक्सी इतिहासात दिसू शकतात.

---

#### Kiro CLI (Amazon)

```bash
# तुमच्या AWS/Kiro खात्यात लॉगिन करा:
kiro-cli login

# CLI स्वतःसाठी OmniRoute आवश्यक नाही — Kiro CLI साठी स्वतःची प्रमाणीकरण वापरते.
# इतर साधनांसाठी OmniRoute सह kiro-cli वापरा.
kiro-cli status
```

**Kiro IDE** डेस्कटॉप अॅपसाठी, OmniRoute द्वारे उघडलेल्या MITM एंडपॉइंटचा वापर करा
`/dashboard/cli-tools → Kiro` अंतर्गत.

---

## 10. आंतरिक OmniRoute CLI

`omniroute` बायनरी सर्व्हर जीवनचक्र, सेटअप, निदान, आणि प्रदाता व्यवस्थापनासाठी आदेश प्रदान करते. प्रवेश बिंदू: `bin/omniroute.mjs`.

```bash
omniroute                              # सर्व्हर सुरू करा (डिफॉल्ट पोर्ट 20128)
omniroute setup                        # इंटरएक्टिव्ह सेटअप विजार्ड
omniroute doctor                       # कॉन्फिग, DB, पोर्ट, रनटाइम तपासा
omniroute providers list               # कॉन्फिग केलेले प्रदाता कनेक्शन
omniroute providers test-all           # प्रत्येक सक्रिय कनेक्शनची चाचणी करा
omniroute reset-password               # प्रशासक पासवर्ड रीसेट करा
omniroute logs                         # विनंती लॉग प्रवाहित करा
omniroute health                       # तपशीलवार आरोग्य (ब्रेकर्स, कॅश, मेमरी)
omniroute --version                    # आवृत्ती छापा
omniroute --help                       # सर्व आदेश दर्शवा
```

### सेटअप आणि प्रारंभ

```bash
omniroute setup                        # इंटरएक्टिव्ह सेटअप विजार्ड
omniroute setup --non-interactive      # CI/ऑटोमेशन मोड (पर्यावरण चलन + फ्लॅग वाचा)
omniroute setup --password '<value>'   # प्रशासक पासवर्ड थेट सेट करा
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # एकाच वेळी प्रदाता जोडा आणि चाचणी करा
```

गैर-इंटरएक्टिव्ह सेटअपसाठी मान्यताप्राप्त पर्यावरण चलन:

| Var                 | उद्देश                                                          |
| ------------------- | --------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | प्रदाता API की (कमांडर `.env()` द्वारे `--api-key` शी बंधनकारक) |
| `DATA_DIR`          | OmniRoute डेटा निर्देशिका ओव्हरराइड करा                         |

इतर सर्व गैर-इंटरएक्टिव्ह इनपुट फ्लॅग म्हणून पास केले जातात, पर्यावरण चलन म्हणून नाही:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(वरच्या `omniroute setup` पर्याय पहा).

### निदान

```bash
omniroute doctor                       # कॉन्फिग, DB, पोर्ट, रनटाइम, मेमरी, जिवंतपणा तपासा
omniroute doctor --json                # मशीन-वाचनायोग्य JSON
omniroute doctor --no-liveness         # HTTP आरोग्य तपासणी वगळा
omniroute doctor --host 0.0.0.0        # जिवंतपणा होस्ट ओव्हरराइड करा
omniroute doctor --liveness-url <url>  # पूर्ण आरोग्य एंडपॉइंट URL ओव्हरराइड
```

डॉक्टर हे तपासणी चालवतो: `कॉन्फिग`, `डेटाबेस`, `स्टोरेज/एन्क्रिप्शन`,
`पोर्ट उपलब्धता`, `नोड रनटाइम`, `नैसर्गिक बायनरी` (better-sqlite3),
`मेमरी`, आणि `सर्व्हर जिवंतपणा`. कोणतीही तपासणी `अयशस्वी` असल्यास हे नॉन-झिरोमध्ये बाहेर पडते.

### प्रदाता व्यवस्थापन

```bash
omniroute providers available                       # OmniRoute प्रदाता कॅटलॉग
omniroute providers available --search openai       # आयडी/नाव/उपसर्ग/श्रेणीद्वारे कॅटलॉग फिल्टर करा
omniroute providers available --category api-key    # श्रेणीद्वारे फिल्टर करा (api-key, oauth, free, ...)
omniroute providers available --json                # मशीन-वाचनायोग्य JSON

omniroute providers list                            # कॉन्फिग केलेले प्रदाता कनेक्शन
omniroute providers list --json

omniroute providers test <id|name>                  # एक कॉन्फिग केलेला कनेक्शन चाचणी करा
omniroute providers test-all                        # प्रत्येक सक्रिय कनेक्शनची चाचणी करा
omniroute providers validate                        # स्थानिक-फक्त संरचनात्मक मान्यता
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # विद्यमान OAuth प्रवाह
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` API-प्रथम आहेत आणि त्यामुळे सक्रिय स्थानिक किंवा दूरस्थ संदर्भावर कार्य करतात. क्रेडेन्शियल इनपुटने `--credential-stdin` किंवा `--credential-env` वापरावे; `--dry-run --json` फक्त संपादित केलेले उपस्थिती/आकार रिपोर्ट करते. `providers available` OmniRoute कॅटलॉग वाचते; `providers list/test/test-all/validate` त्यांच्या स्थानिक SQLite वर्तनास कायम ठेवतात आणि सर्व्हर चालू असणे आवश्यक नाही.

### पुनर्प्राप्ती आणि रीसेट

```bash
omniroute reset-password                # प्रशासक पासवर्ड रीसेट करा (सुद्धा: omniroute-reset-password)
omniroute reset-encrypted-columns       # एन्क्रिप्टेड क्रेडेन्शियल रीसेटसाठी चेतावणी + ड्राय-रन दर्शवा
omniroute reset-encrypted-columns --force  # SQLite मध्ये एन्क्रिप्टेड क्रेडेन्शियल्स खरोखर शून्य करा
```

### क्रेडेन्शियल निर्यात (⚠ काळजीपूर्वक हाताळा)

```bash
omniroute auth export                                 # चेतावणी + पुष्टी गेट दर्शवा — DB प्रवेश नाही
omniroute auth export --force                          # सर्व कनेक्शनचे DECRYPTED क्रेडेन्शियल्स stdout वर JSON म्हणून निर्यात करा
omniroute auth export --force --id <id>                 # फक्त जुळणारा कनेक्शन निर्यात करा
omniroute auth export --force --format env               # OMNIROUTE_<PROVIDER>_<FIELD>=<value> ओळी उत्सर्जित करा
omniroute auth export --force --out creds.json           # फाईलमध्ये लिहा (0600 परवानग्या सह तयार केलेली)
```

`auth export` **स्थानिक-फक्त** (सिध्द SQLite वाचन, HTTP मार्ग नाही) आणि हेतुपुरस्सर **प्लेनटेक्स्ट** `apiKey`/`accessToken`/`refreshToken`/`idToken` मूल्ये छापते/लेखते — हे एक वैशिष्ट्य आहे, बग नाही. डेटाबेसमधून काहीही वाचले जात नाही, आणि `--force` न करता काहीही डिक्रिप्ट केले जात नाही. कोणत्याही प्लेनटेक्स्टच्या उत्सर्जनापूर्वी नेहमी एक stderr चेतावणी बॅनर छापले जाते. `STORAGE_ENCRYPTION_KEY` सेट करणे आवश्यक आहे. जे क्षेत्र डिक्रिप्ट करण्यात अयशस्वी होते (जुना की, खराब ciphertext) ते `<field>DecryptFailed: true` म्हणून रिपोर्ट केले जाते, संपूर्ण निर्यात थांबविण्याऐवजी किंवा अंतर्गत त्रुटी लीक करण्याऐवजी.

### इतर उपआदेश

हे चालू OmniRoute सर्व्हरवर आधारित आहेत, अन्यथा नोट केलेले नाही:

```bash
omniroute status                       # सर्वसमावेशक रनटाइम स्थिती
omniroute logs                         # विनंती लॉग प्रवाहित करा (--json, --search, --follow)
omniroute config show                  # वर्तमान कॉन्फिगरेशन दर्शवा

omniroute provider list                # उपलब्ध प्रदाते सूचीबद्ध करा (providers list चा उपसर्ग)
omniroute provider add                 # एका साधनावर प्रदाता म्हणून OmniRoute नोंदणी करा
omniroute keys add | list | remove     # API की व्यवस्थापित करा
omniroute models [provider]            # मॉडेल सूचीबद्ध करा (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # कॉन्फिग + DB ची स्नॅपशॉट
omniroute restore                      # मागील स्नॅपशॉटमधून पुनर्स्थापित करा

omniroute health                       # तपशीलवार आरोग्य (ब्रेकर्स, कॅश, मेमरी)
omniroute quota                        # प्रदाता कोटा वापर
omniroute cache                        # कॅश स्थिती
omniroute cache clear                  # सेमांटिक + सिग्नेचर कॅश साफ करा

omniroute mcp status | restart         # MCP सर्व्हर स्थिती / पुनःप्रारंभ
omniroute a2a status | card            # A2A सर्व्हर स्थिती / एजंट कार्ड

omniroute tunnel list | create | stop  # टनेल व्यवस्थापित करा (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # पर्यावरण चलन तपासा / सेट करा (तात्पुरते)

omniroute test                         # प्रदाता कनेक्टिव्हिटी स्मोक चाचणी
omniroute update                       # अद्यतने तपासा
omniroute completion                   # शेल पूर्णता तयार करा
```

### सामान्य फ्लॅग

| फ्लॅग               | वर्णन                                               |
| ------------------- | --------------------------------------------------- |
| `--no-open`         | प्रारंभावर ब्राउझर स्वयंचलितपणे उघडू नका            |
| `--port <n>`        | API पोर्ट ओव्हरराइड करा (डिफॉल्ट 20128)             |
| `--mcp`             | IDEs साठी stdio वर MCP सर्व्हर म्हणून चालवा         |
| `--non-interactive` | CI मोड (कोणतेही प्रॉम्प्ट नाही; env/flags वाचते)    |
| `--json`            | मशीन-वाचनायोग्य JSON आउटपुट (doctor, providers, इ.) |
| `--help`, `-h`      | आदेश-विशिष्ट मदत दर्शवा                             |
| `--version`, `-v`   | स्थापित आवृत्ती छापवा                               |

---

## उपलब्ध API समाप्ती बिंदू

| समाप्ती बिंदू              | वर्णन                        | वापरासाठी                              |
| -------------------------- | ---------------------------- | -------------------------------------- |
| `/v1/chat/completions`     | मानक चॅट (सर्व प्रदाते)      | सर्व आधुनिक साधने                      |
| `/v1/responses`            | प्रतिसाद API (OpenAI स्वरूप) | कोडेक्स, एजंटिक कार्यप्रवाह            |
| `/v1/completions`          | वारसा मजकूर पूर्णता          | `prompt:` वापरणाऱ्या जुन्या साधनांसाठी |
| `/v1/embeddings`           | मजकूर एम्बेडिंग              | RAG, शोध                               |
| `/v1/images/generations`   | चित्र निर्माण                | GPT-Image, Flux, इत्यादी               |
| `/v1/audio/speech`         | मजकूर-ते-भाषण                | ElevenLabs, OpenAI TTS                 |
| `/v1/audio/transcriptions` | भाषण-ते-मजकूर                | Deepgram, AssemblyAI                   |

टोकनयुक्त OmniRoute URL सह तयार-करण्यासाठी उदाहरणे:

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

| त्रुटी                                     | कारण                      | उपाय                                                    |
| ------------------------------------------ | ------------------------- | ------------------------------------------------------- |
| `Connection refused`                       | OmniRoute चालू नाही       | `omniroute serve`                                       |
| `401 Unauthorized`                         | चुकीचा API की             | `/dashboard/api-manager` मध्ये तपासा                    |
| `No combo configured`                      | सक्रिय रूटिंग कॉम्बो नाही | `/dashboard/combos` मध्ये सेट करा                       |
| CLI "not installed" दर्शवित आहे            | बायनरी PATH मध्ये नाही    | `which <command>` तपासा                                 |
| Dashboard मध्ये "not detected" दर्शवित आहे | कॅशे जुना आहे             | Dashboard मध्ये "⟳ Refresh detection" वर क्लिक करा      |
| जुना लिंक `/dashboard/cli-tools`           | पूर्व- v3.8.6 बुकमार्क    | `/dashboard/cli-code` कडे स्वयंचलित-मार्गदर्शित (308)   |
| जुना लिंक `/dashboard/agents`              | पूर्व- v3.8.6 बुकमार्क    | `/dashboard/acp-agents` कडे स्वयंचलित-मार्गदर्शित (308) |
