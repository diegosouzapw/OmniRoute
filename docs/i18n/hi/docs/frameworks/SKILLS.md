# Skills Framework (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **सत्य का स्रोत:** `src/lib/skills/` और `src/app/api/skills/`
> **अंतिम अपडेट:** 2026-06-28 — v3.8.40

OmniRoute एक विस्तारयोग्य Skills फ्रेमवर्क उपलब्ध कराता है, जो भाषा मॉडल (और ऑपरेटर) को पुन: उपयोग योग्य क्षमताएँ संयोजित करने देता है — फ़ाइल-सिस्टम से पढ़ने और HTTP अनुरोधों से लेकर सैंडबॉक्स में कोड निष्पादन और सावधानीपूर्वक चयनित मार्केटप्लेस स्किल्स तक।

स्किल कार्य की एक संस्करणित, स्कीमा-परिभाषित इकाई है। OmniRoute आउटबाउंड अनुरोधों में स्किल्स को टूल परिभाषाओं के रूप में इंजेक्ट कर सकता है, मॉडल से वापस आने वाली टूल कॉल्स को इंटरसेप्ट कर सकता है, संबंधित हैंडलर चला सकता है और परिणाम को वापस मॉडल में फ़ीड कर सकता है, ताकि वार्तालाप जारी रह सके। मॉडल को कार्यान्वयन कभी दिखाई नहीं देता — केवल टूल इंटरफ़ेस दिखाई देता है।

---

## Agent Skills बनाम Omni Skills

OmniRoute में दो अलग, लेकिन परस्पर पूरक स्किल सिस्टम हैं:

| आयाम                   | **Omni Skills** (यह दस्तावेज़)                                                    | **Agent Skills**                                                                            |
| :--------------------- | :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| उद्देश्य               | LLM टूल इंजेक्शन + सैंडबॉक्स में निष्पादन                                         | बाहरी एजेंटों द्वारा खोजने और उपयोग करने हेतु SKILL.md कैटलॉग                               |
| सत्य का स्रोत          | `src/lib/skills/` + मार्केटप्लेस                                                  | `src/lib/agentSkills/` + `skills/` डायरेक्टरी                                               |
| रनटाइम मोड             | आउटबाउंड अनुरोधों में इंजेक्ट किए जाते हैं, टूल-कॉल इवेंट्स पर निष्पादित होते हैं | स्थिर मार्कडाउन कैटलॉग + REST/MCP/A2A खोज एंडपॉइंट्स                                        |
| इसका उपयोग कौन करता है | स्वयं OmniRoute (कॉम्बो रूटिंग, इनबाउंड LLM कॉल्स)                                | बाहरी एजेंट, MCP क्लाइंट, A2A ऑर्केस्ट्रेटर                                                 |
| संख्या                 | परिवर्तनशील (मार्केटप्लेस-आधारित)                                                 | 45 कैटलॉग प्रविष्टियाँ (23 API + 21 CLI + 1 कॉन्फ़िगरेशन)                                   |
| प्रारूप                | टूल स्कीमा + हैंडलर वाला `SkillDefinition`                                        | `SKILL.md` फ्रंटमैटर + मार्कडाउन बॉडी                                                       |
| खोज                    | `/api/skills/*` REST + `omniroute_skills_*` MCP टूल्स                             | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP टूल्स + A2A `list-capabilities` |

**Omni Skills** निष्पादन इंजन हैं — वे परिभाषित करते हैं कि किसी LLM द्वारा टूल का आह्वान किए जाने पर OmniRoute _क्या कर सकता है_।

**Agent Skills** दस्तावेज़ीकरण कैटलॉग हैं — वे बाहरी एजेंटों को संरचित SKILL.md फ़ाइलों के माध्यम से बताते हैं कि OmniRoute के REST API और CLI का _उपयोग कैसे करें_; इन फ़ाइलों को सीधे एजेंट प्रॉम्प्ट्स में दिया जा सकता है।

Agent Skills कैटलॉग, जनरेटर, MCP टूल्स और A2A स्किल के लिए [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md) देखें।

---

## अवधारणाएँ

### स्किल स्रोत

एक ही रजिस्ट्री में स्किल्स के तीन स्रोत सह-अस्तित्व में रहते हैं:

1. **अंतर्निर्मित स्किल्स** (`src/lib/skills/builtins.ts`) — OmniRoute के साथ उपलब्ध कराई जाती हैं। ये सामान्य उपयोग स्थितियों को कवर करती हैं:
   - `file_read`, `file_write` — `<DATA_DIR>/skills/workspaces/<hashed-key>/` के अंतर्गत प्रत्येक API कुंजी के लिए सैंडबॉक्स वर्कस्पेस
   - `http_request` — `guard: "public-only"` के साथ `safeOutboundFetch` के माध्यम से आउटबाउंड HTTP
   - `web_search` — कैशिंग के साथ प्लग करने योग्य खोज प्रदाता (`executeWebSearch`)
   - `eval_code` — Docker-सैंडबॉक्स में `node` या `python` निष्पादन
   - `execute_command` — Docker-सैंडबॉक्स में शेल कमांड
   - `browser` — Playwright-समर्थित आधारभूत संरचना, डिफ़ॉल्ट रूप से अक्षम (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute मार्केटप्लेस) — `https://skillsmp.com/api/v1/skills/search` से प्राप्त किया जाता है। सेटिंग्स में `skillsmpApiKey` आवश्यक है।
3. **SkillsSH** (`skills.sh` सामुदायिक कैटलॉग) — `https://skills.sh/api/search` से प्राप्त किया जाता है। किसी प्रमाणीकरण की आवश्यकता नहीं है; SKILL.md सामग्री GitHub raw से ली जाती है।

एकल "सक्रिय प्रदाता" नियंत्रित करता है कि डैशबोर्ड किस कैटलॉग से इंस्टॉल करता है (`src/lib/skills/providerSettings.ts`)। इसे **सेटिंग्स → मेमोरी और स्किल्स** के अंतर्गत बदलें। डिफ़ॉल्ट: `skillsmp`।

### स्किल पहचान

इन-मेमोरी रजिस्ट्री (`src/lib/skills/registry.ts`) में स्किल्स की कुंजी `name@version` होती है। संस्करण semver (`^\d+\.\d+\.\d+$`) होना चाहिए। `resolveVersion()` `^`, `~`, `>`, `>=`, `<`, `<=`, `==` और सटीक-मिलान प्रतिबंधों को समझता है।

### स्किल मोड

प्रत्येक स्किल में एक रनटाइम मोड होता है, जो नियंत्रित करता है कि उसे कब इंजेक्ट किया जाए:

| मोड    | व्यवहार                                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------------------------------ |
| `on`   | हमेशा टूल परिभाषा के रूप में इंजेक्ट किया जाता है                                                                        |
| `off`  | कभी इंजेक्ट नहीं किया जाता, कभी निष्पादन योग्य नहीं होता                                                                 |
| `auto` | आने वाले अनुरोध के सापेक्ष स्कोर किया जाता है; केवल तभी इंजेक्ट किया जाता है जब स्कोर ≥ `AUTO_MIN_SCORE` (डिफ़ॉल्ट 3) हो |

मार्केटप्लेस से इंस्टॉल की गई स्किल्स के लिए `auto` डिफ़ॉल्ट है। `enabled=true` और `mode="off"` का एक साथ अर्थ है "पंजीकृत लेकिन निष्क्रिय" — लेगेसी कॉलम के माध्यम से `enabled` को टॉगल करने पर `mode` भी अपडेट होता है, ताकि पुराने कोड पथ संगत बने रहें (`src/app/api/skills/[id]/route.ts`)।

### स्थिति (निष्पादन)

स्किल निष्पादनों को `skill_executions` तालिका में निम्न स्थितियों के साथ ट्रैक किया जाता है (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### रजिस्ट्री कैश

`SkillRegistry`, 60-सेकंड TTL कैश (`registry.ts:14`) वाला एक सिंगलटन है। `loadFromDatabase()` इडेम्पोटेंट है और `pendingLoad` के माध्यम से समवर्ती कॉल्स से डुप्लिकेट हटाता है। कोई भी लेखन (`register`/`unregister`/`unregisterById`) कैश को अमान्य कर देता है। संस्करण देखने के लिए `getSkillVersions(name)` और `resolveVersion(name, constraint)` का उपयोग करें।

### प्रदाता-जागरूक इंजेक्शन

`src/lib/skills/injection.ts` में `injectSkills()` वह प्रवेश बिंदु है, जो पंजीकृत स्किल्स को प्रदाता-विशिष्ट टूल परिभाषाओं में परिवर्तित करता है:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

टूल का नाम `name@version` के रूप में एन्कोड किया जाता है, ताकि मॉडल द्वारा उसे वापस कॉल किए जाने पर हैंडलर सही संस्करण चुन सके।

### AUTO स्कोरिंग

जब `mode="auto"` होता है, तो प्रत्येक उम्मीदवार स्किल को अनुरोध संदर्भ के आधार पर स्कोर किया जाता है (`injection.ts` में `scoreAutoSkill()`):

| संकेत                                                | अंक           |
| ---------------------------------------------------- | ------------- |
| स्किल का नाम संदर्भ में हूबहू दिखाई देता है          | +6            |
| नाम का प्रत्येक टोकन किसी संदर्भ टोकन से मेल खाता है | +2            |
| प्रत्येक टैग सबस्ट्रिंग संदर्भ से मेल खाती है        | +3            |
| विवरण का प्रत्येक टोकन संदर्भ से मेल खाता है         | +1            |
| पृष्ठभूमि का कारण किसी नाम टोकन से मेल खाता है       | +2 प्रति टोकन |
| पृष्ठभूमि का कारण किसी टैग से मेल खाता है            | +2 प्रति टोकन |
| टैग में प्रदाता संकेत अनुरोध प्रदाता से मेल खाता है  | +2 / −2       |

`score >= AUTO_MIN_SCORE = 3` वाली शीर्ष `AUTO_MAX_SKILLS = 5` स्किल्स इंजेक्ट की जाती हैं। बराबरी होने पर पहले `installCount` (अवरोही), फिर वर्णानुक्रम में नाम के आधार पर निर्णय किया जाता है (`injection.ts:225-235`)।

### टूल कॉल इंटरसेप्शन

अपस्ट्रीम द्वारा टूल-कॉलिंग प्रतिक्रिया लौटाए जाने के बाद चैट हैंडलर द्वारा `src/lib/skills/interception.ts` में `handleToolCallExecution()` को इनवोक किया जाता है:

1. `extractToolCalls()` प्रदाता-विशिष्ट संरचनाएँ पढ़ता है (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`)।
2. बिल्ट-इन टूल उपनामों (जैसे `omniroute_web_search` → `web_search`) को पहले रिज़ॉल्व किया जाता है। बिल्ट-इन हैंडलर इनलाइन चलते हैं।
3. अन्य सभी चीज़ें `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })` के माध्यम से रूट की जाती हैं।
4. परिणामों को प्रतिक्रिया में उपयुक्त रूप से वापस जोड़ा जाता है — `tool_results`, `function_call_output` आइटम, या Anthropic `tool_result` ब्लॉक।

निष्पादन संदर्भ में `customSkillExecutionEnabled` को `false` पर सेट किया जा सकता है, ताकि केवल बिल्ट-इन इंटरसेप्शन की अनुमति मिले (इसका उपयोग उन अनुरोध पथों द्वारा किया जाता है जो उपयोगकर्ता-परिभाषित हैंडलरों को स्पष्ट रूप से अक्षम करते हैं)।

---

## Docker सैंडबॉक्स

गैर-बिल्टइन कोड पाथ (`eval_code`, `execute_command`) `SandboxRunner` (`src/lib/skills/sandbox.ts`) के माध्यम से Docker के अंदर चलते हैं। प्रत्येक कंटेनर निम्नलिखित के साथ लॉन्च किया जाता है:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (जब readOnly=true हो)
```

डिफ़ॉल्ट (`SandboxRunner.DEFAULT_CONFIG`):

| फ़ील्ड           | डिफ़ॉल्ट        | टिप्पणियाँ                                                |
| ---------------- | --------------- | --------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | `--cpus` को पास करने से पहले 1000 से विभाजित किया जाता है |
| `memoryLimit`    | 256 MB          | हार्ड सीमा                                                |
| `timeout`        | 30000 ms        | `SIGTERM` + `docker kill` के माध्यम से सॉफ्ट किल          |
| `networkEnabled` | `false`         | `--network none` बन जाता है                               |
| `readOnly`       | `true`          | रूट FS केवल-पढ़ने योग्य; `/tmp` और `/workspace` tmpfs हैं |

शटडाउन के लिए `SandboxRunner.kill(id)` और `killAll()` उपलब्ध कराए गए हैं; चल रहे कंटेनरों को `runningContainers: Map<string, ChildProcess>` में ट्रैक किया जाता है।

### सैंडबॉक्स एनवायरनमेंट वेरिएबल

`src/lib/skills/builtins.ts` में `process.env` के माध्यम से कॉन्फ़िगर किए गए हैं:

| एनवायरनमेंट वेरिएबल               | डिफ़ॉल्ट         | उद्देश्य                                                                              |
| --------------------------------- | ---------------- | ------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | `file_read` और `file_write` के लिए सीमा                                               |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | `http_request` के रिस्पॉन्स बॉडी के लिए सीमा                                          |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | कॉलर को लौटाए गए stdout/stderr के लिए सीमा                                            |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | सैंडबॉक्स किए गए कमांड के लिए डिफ़ॉल्ट टाइमआउट; अधिकतम 60 s                           |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | इग्रेस के लिए मुख्य गेट। प्रति-कॉल ऑप्ट-इन की अनुमति देने हेतु `1` या `true` सेट करें |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (नीचे देखें)     | Docker इमेज की कॉमा-विभाजित अनुमतिसूची                                                |

डिफ़ॉल्ट रूप से अनुमत इमेज: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`। `SKILLS_ALLOWED_SANDBOX_IMAGES` के माध्यम से किए गए किसी भी अतिरिक्त को डिफ़ॉल्ट के साथ मर्ज किया जाता है; अज्ञात इमेज को `normalizeImage()` द्वारा अस्वीकार कर दिया जाता है।

> नोट: कोई अलग `SKILLS_EXECUTION_TIMEOUT_MS` एनवायरनमेंट वेरिएबल नहीं है। गैर-सैंडबॉक्स हैंडलर टाइमआउट `SkillExecutor` (`executor.ts:13`) में 30 s पर हार्ड-कोडेड है, लेकिन इसे रनटाइम पर `skillExecutor.setTimeout(ms)` के माध्यम से ओवरराइड किया जा सकता है।

### वर्कस्पेस आइसोलेशन

`file_read` और `file_write` प्रत्येक पाथ को `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/` पर मौजूद प्रति-API-कुंजी वर्कस्पेस के सापेक्ष रिज़ॉल्व करते हैं। किसी भी डिस्क I/O से पहले पाथ ट्रैवर्सल (`..`) और निषिद्ध सेगमेंट (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) अस्वीकार कर दिए जाते हैं।

### HTTP हार्डनिंग

`http_request` (`builtins.ts:257`):

- अनुमत विधियों की सूची: `GET, HEAD, POST, PUT, PATCH, DELETE`
- ब्लॉक किए गए आउटबाउंड हेडर: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- रीडायरेक्ट अक्षम (`allowRedirect: false`)
- `guard: "public-only"` के साथ `safeOutboundFetch` के माध्यम से रूट किया गया (निजी/लूपबैक रेंज ब्लॉक की गई हैं)
- रिस्पॉन्स को `SKILLS_MAX_HTTP_RESPONSE_BYTES` पर ट्रंकेट किया जाता है; क्लाइंट को `truncated: true` दिखाई देता है

---

## हाइब्रिड एक्ज़ीक्यूटर (पूर्वावलोकन)

`src/lib/skills/hybrid.ts` एक `HybridExecutor` परिभाषित करता है, जो प्रत्येक कॉल के लिए `direct` (इन-प्रोसेस) और `sandbox` निष्पादन के बीच निर्णय लेता है तथा टाइमआउट/मेमोरी त्रुटियों पर `autoUpgrade` पुनः प्रयास पथ प्रदान करता है। अंतर्निहित `directExecutor` / `sandboxRunner` कार्यान्वयन स्टब हैं (`executeDirect`, `executeInSandbox` प्लेसहोल्डर ऑब्जेक्ट लौटाते हैं) — इस मॉड्यूल को निर्माणाधीन अनुबंध मानें। वास्तविक निष्पादन अभी भी `skillExecutor` + `SandboxRunner` के माध्यम से होता है।

---

## स्टोरेज

स्कीमा दो माइग्रेशन में मौजूद है:

- `src/lib/db/migrations/016_create_skills.sql` — मूल `skills` और `skill_executions` टेबल, जिनमें `(api_key_id, name)` और `(skill_id, status, created_at)` पर इंडेक्स हैं।
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — `skills` में `mode`, `source_provider`, `tags` (JSON), `install_count` जोड़ता है।

`skill_executions.status` डेटाबेस स्तर पर सीमित है: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`।

---

## REST API

सभी एंडपॉइंट `src/app/api/skills/` के अंतर्गत मौजूद हैं। प्रबंधन एंडपॉइंट (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) के लिए `requireManagementAuth()` के माध्यम से **प्रबंधन प्रमाणीकरण** आवश्यक है। मार्केटप्लेस/इंस्टॉल प्रवाह हल्के `isAuthenticated()` (सेशन या API कुंजी) का उपयोग करते हैं।

| एंडपॉइंट | विधि | उद्देश्य |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | पंजीकृत स्किल्स की सूची। `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, पेजिनेशन का समर्थन करता है |
| `/api/skills/[id]` | PUT | `enabled` या `mode` अपडेट करें |
| `/api/skills/[id]` | DELETE | id द्वारा पंजीकरण हटाएँ |
| `/api/skills/install` | POST | कस्टम स्किल इंस्टॉल करें (हैंडलर कोड + स्कीमा) |
| `/api/skills/marketplace` | GET | SkillsMP कैटलॉग खोजें (`q` खाली होने पर लोकप्रिय डिफ़ॉल्ट लौटाता है) |
| `/api/skills/marketplace/install` | POST | SkillsMP स्किल इंस्टॉल करें (सक्रिय प्रदाता = `skillsmp` आवश्यक) |
| `/api/skills/skillssh` | GET | skills.sh कैटलॉग खोजें (`?q=&limit=`, अधिकतम सीमा 100) |
| `/api/skills/skillssh/install` | POST | skills.sh स्किल इंस्टॉल करें (सक्रिय प्रदाता = `skillssh` आवश्यक) |
| `/api/skills/executions` | GET | पेजिनेटेड निष्पादन इतिहास (`?apiKeyId=`) |
| `/api/skills/executions` | POST | पंजीकृत स्किल को तदर्थ रूप से निष्पादित करें |

जब `settings.skillsEnabled === false` हो, तो `POST /api/skills/executions` एंडपॉइंट HTTP `503` के साथ `{ error: "Skills execution is disabled..." }` लौटाता है (`executor.ts:42-45`)। ऑपरेटर **सेटिंग्स → AI** से मास्टर स्विच बदल सकते हैं।

### उदाहरण: कस्टम स्किल इंस्टॉल करें

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

`handlerCode` स्ट्रिंग एक **हैंडलर नाम लुकअप** है — निष्पादन योग्य कोड नहीं। एक्ज़ीक्यूटर इसे `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`) के माध्यम से मैप करता है। मार्केटप्लेस इंस्टॉलेशन इस फ़ील्ड में SKILL.md टेक्स्ट को दस्तावेज़ के रूप में संग्रहीत करते हैं और मॉडल-जनरेटेड टूल कॉल के माध्यम से निष्पादन रूट करते हैं। उपयोगकर्ता द्वारा मनमाने ढंग से प्रदान किए गए स्रोत का eval नहीं किया जाता।

---

## MCP टूल्स

चार MCP टूल्स स्किल्स सरफ़ेस (`open-sse/mcp-server/tools/skillTools.ts`) को रैप करते हैं। MCP सर्वर बूट होने पर वे स्वतः पंजीकृत हो जाते हैं।

| टूल                           | विवरण                                                                  |
| ----------------------------- | ---------------------------------------------------------------------- |
| `omniroute_skills_list`       | स्किल्स सूचीबद्ध करें, वैकल्पिक फ़िल्टर: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | `skillId` द्वारा किसी स्किल को सक्षम/अक्षम करें                        |
| `omniroute_skills_execute`    | इनपुट पेलोड के साथ किसी स्किल को निष्पादित करें                        |
| `omniroute_skills_executions` | हालिया निष्पादन इतिहास (डिफ़ॉल्ट 50, अधिकतम 100)                       |

ट्रांसपोर्ट सेटअप और स्कोप असाइनमेंट के लिए [MCP-SERVER.md](./MCP-SERVER.md) देखें।

---

## A2A एकीकरण

`src/lib/skills/a2a.ts`, `memory_aware_routing` A2A स्किल डिस्क्रिप्टर और एक `registerA2ASkill(registry)` हेल्पर एक्सपोर्ट करता है। कस्टम A2A स्किल्स `src/lib/a2a/skills/` में रहती हैं और `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`) के माध्यम से डिस्पैच की जाती हैं। संपूर्ण टास्क लाइफ़साइकल के लिए [A2A-SERVER.md](./A2A-SERVER.md) देखें।

---

## नई बिल्ट-इन स्किल जोड़ना

1. **हैंडलर परिभाषित करें** `src/lib/skills/builtins.ts` में (या `src/lib/skills/builtin/` के अंतर्गत किसी सहवर्ती फ़ाइल में)। सिग्नेचर: `(input, { apiKeyId, sessionId }) => Promise<output>`।
2. **सैंडबॉक्स किया हुआ कोड पथ?** `sandboxRunner.run(image, command, env, sandboxConfig({...}))` कॉल करें। अनुमति-सूची के विरुद्ध `normalizeImage()` का उपयोग करें।
3. **फ़ाइल-सिस्टम पथ?** डिस्क को एक्सेस करने से पहले हमेशा इसे `resolveWorkspacePath(input, context)` से पास करें।
4. **नेटवर्क कॉल?** `guard: "public-only"` के साथ `safeOutboundFetch` का उपयोग करें; `sanitizeHeaders()` के माध्यम से हेडर्स को सैनिटाइज़ करें।
5. **पंजीकृत करें** `builtinSkills` में एंट्री जोड़कर (या बूट के समय `registerBrowserSkill(executor)`-शैली को कॉल करके)।
6. **बिल्ट-इन टूल एलियास वायर करें** (वैकल्पिक) `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) में, यदि अपस्ट्रीम मॉडल कोई अलग नाम उत्सर्जित करता है।
7. **टेस्ट्स** `src/lib/skills/__tests__/` में (Vitest)।

---

## कस्टम (नॉन-बिल्ट-इन) स्किल जोड़ना

1. प्रोसेस स्टार्टअप पर हैंडलर पंजीकृत करें:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. `POST /api/skills/install` के माध्यम से स्किल इंसर्ट करें (`handlerCode` फ़ील्ड पंजीकृत हैंडलर नाम से मेल खाना चाहिए)।
3. `PUT /api/skills/[id]` के माध्यम से `mode` को `on` या `auto` पर टॉगल करें।

---

## संचालन संबंधी सुझाव

- **मास्टर स्विच:** `settings.skillsEnabled = false` सभी निष्पादन अवरुद्ध करता है और `/api/skills/executions` पर HTTP `503` लौटाता है। रजिस्ट्री लोड होती रहती है।
- **आउटबाउंड ट्रैफ़िक लॉक डाउन करें:** पूरी तरह एयर-गैप्ड सैंडबॉक्सिंग के लिए `SKILLS_SANDBOX_NETWORK_ENABLED` को अनसेट (डिफ़ॉल्ट) रखें। प्रति-कॉल `networkEnabled: true` के लिए भी मास्टर गेट आवश्यक है।
- **विशिष्ट इमेज की अनुमति दें:** अनुमति-सूची का विस्तार करने के लिए `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` सेट करें।
- **निष्पादनों का ऑडिट करें:** `/dashboard/skills/executions` और `omniroute_skills_executions` दोनों `skill_executions` को क्वेरी करते हैं। सफल रन में `durationMs` शामिल होता है; विफलताओं में `errorMessage` शामिल होता है।
- **कैश अमान्यकरण:** मैन्युअल DB संपादनों के बाद `skillRegistry.invalidateCache()` कॉल करें; अन्यथा 60 सेकंड प्रतीक्षा करें।
- **अनाम वर्कस्पेस:** जब `apiKeyId` खाली होता है, तो सभी कॉल एक ही `"anonymous"` वर्कस्पेस में हैश होते हैं — शेयर-जागरूक कोड को हमेशा वास्तविक कुंजी पास करनी चाहिए।

---

## निष्पादन जीवनचक्र (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) एक **सिंगलटन** है जो प्रत्येक स्किल आह्वान को प्रबंधित करता है। टाइमआउट, पुनः प्रयास और निष्पादन स्थिति को डीबग करने के लिए इसके जीवनचक्र को समझना अत्यंत महत्वपूर्ण है।

### 5-चरणीय जीवनचक्र

```
   execute() कॉल किया गया
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← कतारबद्ध, अभी प्रारंभ नहीं हुआ (DB पंक्ति बनाई गई)
  └──────┬──────┘
         │ हैंडलर प्रारंभ करें
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← टाइमआउट के साथ हैंडलर का आह्वान किया गया
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (कोई अन्य पथ नहीं — पैरेंट द्वारा समाप्त)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   स्थिति, आउटपुट, durationMs के साथ DB पंक्ति अपडेट की गई
```

### डिफ़ॉल्ट कॉन्फ़िगरेशन

| सेटिंग       | डिफ़ॉल्ट           | इसके माध्यम से कॉन्फ़िगर करने योग्य  |
| ------------ | ------------------ | ------------------------------------ |
| `timeout`    | `30000` (30 सेकंड) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`                | `skillExecutor.setMaxRetries(count)` |

> **महत्वपूर्ण**: एक्सीक्यूटर एक सिंगलटन है — `setTimeout()` को कॉल करने से बाद के सभी आह्वान वैश्विक रूप से प्रभावित होते हैं। प्रति-स्किल टाइमआउट वर्तमान में समर्थित नहीं हैं; यदि आपको प्रत्येक स्किल के लिए अलग-अलग टाइमआउट चाहिए, तो अलग-अलग प्रोसेस सबमिट करें या एक्सीक्यूटर को फ़ोर्क करें।

### स्थिति मान

`src/lib/skills/types.ts` से:

```ts
enum SkillStatus {
  PENDING = "pending", // कतारबद्ध, अभी प्रारंभ नहीं हुआ
  RUNNING = "running", // हैंडलर का आह्वान किया गया
  SUCCESS = "success", // हैंडलर ने मान्य आउटपुट लौटाया
  ERROR = "error", // हैंडलर ने एक अपवाद उत्पन्न किया
  TIMEOUT = "timeout", // एक्सीक्यूटर के टाइमआउट से अधिक समय लगा
}
```

> **नोट**: `TIMEOUT` स्थिति enum में परिभाषित है, लेकिन वर्तमान एक्सीक्यूटर कार्यान्वयन द्वारा इसे **वास्तव में DB में नहीं लिखा जाता** — टाइमआउट `"Skill execution timed out"` संदेश के साथ `ERROR` के रूप में दिखाई देते हैं। स्थिति enum भविष्य में उपयोग के लिए आरक्षित है।

### निष्पादनों का निरीक्षण करना

```ts
import { skillExecutor } from "omniroute/skills/executor";

// ID द्वारा कोई विशिष्ट निष्पादन प्राप्त करें
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// किसी API कुंजी के हालिया निष्पादनों को सूचीबद्ध करें
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// कुल निष्पादनों की संख्या गिनें
const total = skillExecutor.countExecutions("api-key-id");
```

### पुनः प्रयास का व्यवहार

`maxRetries` सेटिंग संग्रहीत की जाती है, लेकिन एक्सीक्यूटर की `execute()` विधि द्वारा इसका **वर्तमान में उपयोग नहीं किया जाता** — यह केवल एक प्रयास करती है। `maxRetries` मान भविष्य के कार्यान्वयन और इसे पढ़ने वाले हुक के लिए उपलब्ध कराया गया है।

फ़िलहाल, पुनः प्रयासों को स्किल हैंडलर के भीतर ही कार्यान्वित किया जाना चाहिए। अंतर्निहित
स्किल एक्सीक्यूटर के साथ पंजीकृत किए जाते हैं (उदाहरण के लिए, `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` को `src/lib/skills/builtin/` में); आपके द्वारा पंजीकृत कोई भी हैंडलर
अपने स्वयं के पुनः प्रयास लूप को रैप कर सकता है:

```ts
// किसी स्किल हैंडलर के भीतर
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## SkillMode का विस्तृत विवरण

`SkillMode` enum (`src/lib/skills/types.ts`) यह नियंत्रित करता है कि कौशलों को **कब और कैसे** लागू किया जाता है:

```ts
enum SkillMode {
  AUTO = "auto", // LLM तय करता है कि कौशल को कब कॉल करना है
  MANUAL = "manual", // केवल उपयोगकर्ता के स्पष्ट अनुरोध पर लागू किया जाता है
  HYBRID = "hybrid", // AUTO स्कोरिंग + मैन्युअल ओवरराइड
}
```

> **नोट**: कोडबेस `SkillMode` (AUTO/MANUAL/HYBRID) को परिभाषित करता है, जबकि `Skill.mode` फ़ील्ड एक अलग स्वरूप (`"on" | "off" | "auto"`) का उपयोग करता है। वे संबंधित हैं, लेकिन एक-समान नहीं हैं — `SkillMode` निष्पादक नीति के लिए है, जबकि `Skill.mode` प्रत्येक कौशल को सक्षम करने के लिए है।

### प्रत्येक मोड का उपयोग कब करें

| मोड      | LLM का व्यवहार                                                                       | उपयोग का मामला                                               |
| -------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `AUTO`   | आवश्यकता होने पर LLM कौशल को कॉल कर सकता है                                          | सामान्य-प्रयोजन कौशल (फ़ाइल पढ़ना, HTTP अनुरोध)              |
| `MANUAL` | LLM कौशल को कॉल नहीं कर सकता; केवल स्पष्ट `executeSkill` API कॉल ही इसे लागू करती है | संवेदनशील ऑपरेशन (डेटाबेस में लिखना, भुगतान)                 |
| `HYBRID` | LLM कौशल का सुझाव दे सकता है; उपयोगकर्ता को पुष्टि करनी होगी                         | ऐसे कौशल जिनके दुष्प्रभाव होते हैं, लेकिन वे खतरनाक नहीं हैं |

### AUTO स्कोरिंग

जब `AUTO` मोड सक्रिय होता है, तब प्रत्येक संभावित कौशल को अनुरोध के संदर्भ के विरुद्ध
`src/lib/skills/injection.ts` में मौजूद `scoreAutoSkill()` द्वारा स्कोर किया जाता है — यह एक योगात्मक,
पूर्णांक अंक प्रणाली है (कौशल-नाम मिलान, नाम/टैग/विवरण टोकन ओवरलैप,
पृष्ठभूमि-कारण संकेत, प्रदाता-संकेत बोनस/दंड)। `score >= AUTO_MIN_SCORE = 3` वाले शीर्ष
`AUTO_MAX_SKILLS = 5` कौशलों को कॉल किए जा सकने वाले टूल के रूप में इंजेक्ट किया जाता है,
और बराबर स्कोर होने पर पहले `installCount`, फिर नाम के आधार पर क्रम तय किया जाता है। संपूर्ण अंक तालिका के लिए इस
दस्तावेज़ में पहले दिए गए [**टूल स्कीमा जनरेशन → AUTO स्कोरिंग**](#auto-scoring) को देखें;
कोई फ़्लोट `0.6`-शैली की थ्रेशोल्ड नहीं है और `registry.ts` में कोई स्कोरिंग नहीं होती।

---

## अंतर्निहित कौशल कैटलॉग

OmniRoute में `src/lib/skills/builtin/` के अंतर्गत अंतर्निहित कौशलों का एक सुव्यवस्थित संग्रह शामिल है। सबसे सामान्य कौशल:

### ब्राउज़र ऑटोमेशन कौशल

ब्राउज़र कौशल (`src/lib/skills/builtin/browser.ts`) Playwright/Puppeteer के माध्यम से हेडलेस ब्राउज़र ऑटोमेशन प्रदान करता है। **इसे कार्यान्वित किया गया है, लेकिन यह डिफ़ॉल्ट कौशल कैटलॉग में शामिल नहीं है** — इसका उपयोग करने के लिए ब्राउज़र एक्सटेंशन प्लगइन अलग से इंस्टॉल करें।

```ts
// अपने कॉन्फ़िगरेशन में सक्षम करें
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // हमेशा स्पष्ट आह्वान आवश्यक करें
  allowedSkills: ["browser"],
  timeout: 60000, // पेज लोड के लिए 60 सेकंड
  maxRetries: 1,
};
```

### अन्य अंतर्निहित श्रेणियाँ

| श्रेणी       | कौशल                                                | मोड    |
| ------------ | --------------------------------------------------- | ------ |
| फ़ाइल I/O    | `file_read`, `file_write`                           | AUTO   |
| HTTP         | `http_request`                                      | AUTO   |
| खोज          | `web_search`                                        | AUTO   |
| कोड निष्पादन | `eval_code` (सैंडबॉक्स किया हुआ JavaScript/Python)  | HYBRID |
| सिस्टम       | `execute_command` (सैंडबॉक्स किया हुआ CLI निष्पादन) | MANUAL |

### कस्टम कौशल जोड़ना

प्लगइन सिस्टम के माध्यम से कस्टम कौशल जोड़ने का तरीका जानने के लिए [प्लगइन SDK और कौशल एकीकरण](./PLUGIN_SDK.md) देखें।

---

## यह भी देखें

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP टूल पंजीकरण और ट्रांसपोर्ट
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A कार्य जीवनचक्र और कौशल प्रेषण
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — उपयोगकर्ताओं के लिए परिचय
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — अनुरोध पाइपलाइन और घटक मानचित्र
- स्रोत: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- परीक्षण: `src/lib/skills/__tests__/integration.test.ts`
