# Skills Framework (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **आधिकारिक स्रोत:** `src/lib/skills/` र `src/app/api/skills/`
> **अन्तिम पटक अद्यावधिक गरिएको:** 2026-06-28 — v3.8.40

OmniRoute ले विस्तारयोग्य Skills फ्रेमवर्क उपलब्ध गराउँछ, जसले भाषा मोडेलहरू (र अपरेटरहरू) लाई पुनः प्रयोग गर्न मिल्ने क्षमताहरू संयोजन गर्न दिन्छ — फाइलसिस्टम पढ्ने र HTTP अनुरोधहरूदेखि स्यान्डबक्स गरिएको कोड कार्यान्वयन तथा छनोट गरिएका मार्केटप्लेस स्किलहरूसम्म।

स्किल भनेको संस्करणयुक्त, स्किमाद्वारा परिभाषित कार्य एकाइ हो। OmniRoute ले बाहिर पठाइने अनुरोधहरूमा स्किलहरूलाई टुल परिभाषनका रूपमा समावेश गर्न, मोडेलबाट फर्किएका टुल कलहरू अवरोध गर्न, मिल्दो ह्यान्डलर चलाउन र नतिजा मोडेलमा फिर्ता पठाउन सक्छ, जसले गर्दा संवाद जारी रहन सक्छ। मोडेलले कार्यान्वयन कहिल्यै देख्दैन — केवल टुल इन्टरफेस मात्र देख्छ।

---

## Agent Skills र Omni Skills

OmniRoute मा दुई फरक तर एक-अर्काका पूरक स्किल प्रणालीहरू छन्:

| आयाम             | **Omni Skills** (यो दस्तावेज)                                               | **Agent Skills**                                                                             |
| :--------------- | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| उद्देश्य         | LLM टुल समावेशन + स्यान्डबक्स गरिएको कार्यान्वयन                            | बाह्य एजेन्टहरूले पत्ता लगाउन र प्रयोग गर्न सक्ने SKILL.md क्याटलग                           |
| आधिकारिक स्रोत   | `src/lib/skills/` + मार्केटप्लेस                                            | `src/lib/agentSkills/` + `skills/` डाइरेक्टरी                                                |
| रनटाइम मोड       | बाहिर पठाइने अनुरोधहरूमा समावेश गरिन्छ, टुल-कल घटनाहरूमा कार्यान्वयन गरिन्छ | स्थिर markdown क्याटलग + REST/MCP/A2A खोज एन्डपोइन्टहरू                                      |
| कसले प्रयोग गर्छ | OmniRoute स्वयं (कम्बो राउटिङ, आगमन LLM कलहरू)                              | बाह्य एजेन्टहरू, MCP क्लाइन्टहरू, A2A अर्केस्ट्रेटरहरू                                       |
| सङ्ख्या          | परिवर्तनशील (मार्केटप्लेसद्वारा सञ्चालित)                                   | 45 क्याटलग प्रविष्टिहरू (23 API + 21 CLI + 1 कन्फिग)                                         |
| ढाँचा            | टुल स्किमा + ह्यान्डलरसहितको `SkillDefinition`                              | `SKILL.md` फ्रन्टम्याटर + markdown बडी                                                       |
| खोज              | `/api/skills/*` REST + `omniroute_skills_*` MCP टुलहरू                      | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP टुलहरू + A2A `list-capabilities` |

**Omni Skills** कार्यान्वयन इन्जिन हुन् — तिनले कुनै LLM ले टुल आह्वान गर्दा OmniRoute ले _के गर्न सक्छ_ भनेर परिभाषित गर्छन्।

**Agent Skills** दस्तावेजीकरण क्याटलग हुन् — तिनले बाह्य एजेन्टहरूलाई OmniRoute को REST API र CLI _कसरी प्रयोग गर्ने_ भनेर व्याख्या गर्छन्, र एजेन्ट प्रम्प्टहरूमा सिधै दिन सकिने संरचित SKILL.md फाइलहरू प्रदान गर्छन्।

Agent Skills क्याटलग, जेनेरेटर, MCP टुलहरू र A2A स्किलका लागि [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md) हेर्नुहोस्।

---

## अवधारणाहरू

### स्किलका स्रोतहरू

एउटै रजिस्ट्रीमा स्किलका तीन स्रोतहरू सहअस्तित्वमा छन्:

1. **अन्तर्निर्मित स्किलहरू** (`src/lib/skills/builtins.ts`) — OmniRoute सँगै उपलब्ध हुन्छन्। सामान्य प्रयोग अवस्थाहरू समेट्छन्:
   - `file_read`, `file_write` — `<DATA_DIR>/skills/workspaces/<hashed-key>/` अन्तर्गत प्रत्येक API-कुञ्जीका लागि छुट्टै स्यान्डबक्स कार्यक्षेत्र
   - `http_request` — `guard: "public-only"` सहित `safeOutboundFetch` मार्फत बाहिर जाने HTTP
   - `web_search` — क्यासिङसहितको प्लग गर्न मिल्ने खोज प्रदायक (`executeWebSearch`)
   - `eval_code` — Docker-स्यान्डबक्स गरिएको `node` वा `python` कार्यान्वयन
   - `execute_command` — Docker-स्यान्डबक्स गरिएको शेल कमान्ड
   - `browser` — Playwright मा आधारित आधारभूत संरचना, पूर्वनिर्धारित रूपमा निष्क्रिय (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute मार्केटप्लेस) — `https://skillsmp.com/api/v1/skills/search` बाट ल्याइन्छ। Settings मा `skillsmpApiKey` आवश्यक हुन्छ।
3. **SkillsSH** (`skills.sh` सामुदायिक क्याटलग) — `https://skills.sh/api/search` बाट ल्याइन्छ। प्रमाणीकरण आवश्यक पर्दैन; SKILL.md सामग्री GitHub raw बाट तानिन्छ।

एउटा "सक्रिय प्रदायक" ले ड्यासबोर्डले कुन क्याटलगबाट स्थापना गर्ने हो भन्ने नियन्त्रण गर्छ (`src/lib/skills/providerSettings.ts`)। यसलाई **Settings → Memory & Skills** अन्तर्गत परिवर्तन गर्नुहोस्। पूर्वनिर्धारित: `skillsmp`।

### स्किल पहिचान

इन-मेमोरी रजिस्ट्री (`src/lib/skills/registry.ts`) मा स्किलहरू `name@version` द्वारा कुञ्जीकृत हुन्छन्। संस्करण semver (`^\d+\.\d+\.\d+$`) हुनुपर्छ। `resolveVersion()` ले `^`, `~`, `>`, `>=`, `<`, `<=`, `==` र हुबहु-मिलान अवरोधहरू बुझ्छ।

### स्किल मोड

प्रत्येक स्किलमा रनटाइम मोड हुन्छ, जसले त्यसलाई कहिले समावेश गर्ने भन्ने नियन्त्रण गर्छ:

| मोड    | व्यवहार                                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------------------- |
| `on`   | सधैं टुल परिभाषनका रूपमा समावेश गरिन्छ                                                                     |
| `off`  | कहिल्यै समावेश गरिँदैन, कहिल्यै कार्यान्वयन गर्न सकिँदैन                                                   |
| `auto` | आगमन अनुरोधसँग तुलना गरेर स्कोर दिइन्छ; स्कोर ≥ `AUTO_MIN_SCORE` (पूर्वनिर्धारित 3) भए मात्र समावेश गरिन्छ |

मार्केटप्लेसबाट स्थापित स्किलहरूका लागि `auto` पूर्वनिर्धारित हो। `enabled=true` र `mode="off"` सँगै हुँदा "दर्ता गरिएको तर निष्क्रिय" भन्ने अर्थ लाग्छ — पुराना कोडपाथहरू पनि सुसङ्गत रहून् भनेर लिगेसी स्तम्भमार्फत `enabled` टगल गर्दा `mode` पनि परिवर्तन हुन्छ (`src/app/api/skills/[id]/route.ts`)।

### स्थिति (कार्यान्वयनहरू)

स्किल कार्यान्वयनहरूलाई निम्न स्थितिहरूसहित `skill_executions` तालिकामा ट्र्याक गरिन्छ (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### रजिस्ट्री क्यास

`SkillRegistry` 60-सेकेन्ड TTL क्यास (`registry.ts:14`) भएको सिङ्गलटन हो। `loadFromDatabase()` आइडेम्पोटेन्ट छ र `pendingLoad` मार्फत एकै समयमा हुने कलहरूको नक्कल हटाउँछ। कुनै पनि लेखाइ (`register`/`unregister`/`unregisterById`) ले क्यास अमान्य बनाउँछ। संस्करणहरू `getSkillVersions(name)` र `resolveVersion(name, constraint)` मार्फत खोज्नुहोस्।

### प्रदायक-सचेत समावेशन

`src/lib/skills/injection.ts` मा रहेको `injectSkills()` दर्ता गरिएका स्किलहरूलाई प्रदायक-विशिष्ट टुल परिभाषनहरूमा रूपान्तरण गर्ने प्रवेश बिन्दु हो:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

उपकरणको नाम `name@version` का रूपमा सङ्केतन गरिन्छ, जसले गर्दा मोडेलले त्यसलाई पुनः कल गर्दा ह्यान्डलरले सही संस्करण चयन गर्न सक्छ।

### AUTO स्कोरिङ

जब `mode="auto"` हुन्छ, प्रत्येक सम्भावित सीपलाई अनुरोध सन्दर्भका आधारमा स्कोर गरिन्छ (`injection.ts` मा `scoreAutoSkill()`):

| सङ्केत                                                  | अङ्क          |
| ------------------------------------------------------- | ------------- |
| सन्दर्भमा सीपको नाम जस्ताको तस्तै देखिन्छ               | +6            |
| प्रत्येक नाम टोकन सन्दर्भ टोकनसँग मेल खान्छ             | +2            |
| प्रत्येक ट्याग उपस्ट्रिङ सन्दर्भसँग मेल खान्छ           | +3            |
| प्रत्येक विवरण टोकन सन्दर्भसँग मेल खान्छ                | +1            |
| पृष्ठभूमि कारण नाम टोकनसँग मेल खान्छ                    | प्रति टोकन +2 |
| पृष्ठभूमि कारण ट्यागसँग मेल खान्छ                       | प्रति टोकन +2 |
| ट्यागमा भएको प्रदायक सङ्केत अनुरोध प्रदायकसँग मेल खान्छ | +2 / −2       |

`score >= AUTO_MIN_SCORE = 3` भएका शीर्ष `AUTO_MAX_SKILLS = 5` सीपहरू अन्तःक्षेपण गरिन्छन्। बराबरी भएमा पहिले `installCount` (घट्दो क्रममा), त्यसपछि वर्णानुक्रमिक नाम (`injection.ts:225-235`) का आधारमा निर्णय गरिन्छ।

### उपकरण कल अवरोधन

अपस्ट्रिमले उपकरण-कल गर्ने प्रतिक्रिया फर्काएपछि च्याट ह्यान्डलरद्वारा `src/lib/skills/interception.ts` मा रहेको `handleToolCallExecution()` आह्वान गरिन्छ:

1. `extractToolCalls()` ले प्रदायक-विशिष्ट संरचनाहरू (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`) पढ्छ।
2. अन्तर्निर्मित उपकरणका उपनामहरू (जस्तै `omniroute_web_search` → `web_search`) पहिले समाधान गरिन्छन्। अन्तर्निर्मित ह्यान्डलरहरू इनलाइन चल्छन्।
3. अन्य सबै कुरा `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })` मार्फत रुट गरिन्छ।
4. परिणामहरू प्रतिक्रिया भित्र उपयुक्त रूपमा पुनः समावेश गरिन्छन् — `tool_results`, `function_call_output` आइटमहरू, वा Anthropic `tool_result` ब्लकहरू।

कार्यान्वयन सन्दर्भमा रहेको `customSkillExecutionEnabled` लाई `false` मा सेट गरेर अन्तर्निर्मित अवरोधन मात्र अनुमति दिन सकिन्छ (प्रयोगकर्ता-परिभाषित ह्यान्डलरहरूलाई स्पष्ट रूपमा असक्षम गर्ने अनुरोध मार्गहरूद्वारा प्रयोग गरिन्छ)।

---

## Docker स्यान्डबक्स

अन्तर्निर्मित नभएका कोड पाथहरू (`eval_code`, `execute_command`) `SandboxRunner` (`src/lib/skills/sandbox.ts`) मार्फत Docker भित्र चल्छन्। प्रत्येक कन्टेनर निम्न विकल्पहरूसहित सुरु गरिन्छ:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (readOnly=true हुँदा)
```

पूर्वनिर्धारित मानहरू (`SandboxRunner.DEFAULT_CONFIG`):

| फिल्ड            | पूर्वनिर्धारित  | टिप्पणीहरू                                          |
| ---------------- | --------------- | --------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | `--cpus` मा पठाउनुअघि 1000 ले भाग गरिन्छ            |
| `memoryLimit`    | 256 MB          | कठोर सीमा                                           |
| `timeout`        | 30000 ms        | `SIGTERM` + `docker kill` मार्फत सफ्ट किल           |
| `networkEnabled` | `false`         | `--network none` बन्छ                               |
| `readOnly`       | `true`          | रुट FS पढ्न-मात्र; `/tmp` र `/workspace` tmpfs हुन् |

बन्द गर्नका लागि `SandboxRunner.kill(id)` र `killAll()` उपलब्ध गराइएका छन्; चलिरहेका कन्टेनरहरू `runningContainers: Map<string, ChildProcess>` मा ट्र्याक गरिन्छन्।

### स्यान्डबक्स वातावरण चरहरू

`src/lib/skills/builtins.ts` मा `process.env` मार्फत कन्फिगर गरिएका छन्:

| वातावरण चर                        | पूर्वनिर्धारित   | उद्देश्य                                                                    |
| --------------------------------- | ---------------- | --------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | `file_read` र `file_write` का लागि सीमा                                     |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | `http_request` को प्रतिक्रिया बडीका लागि सीमा                               |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | कलरलाई फर्काइने stdout/stderr का लागि सीमा                                  |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | स्यान्डबक्स गरिएका कमान्डहरूको पूर्वनिर्धारित टाइमआउट; अधिकतम 60 s          |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | इग्रेसको मुख्य गेट। प्रति-कल अप्ट-इन अनुमति दिन `1` वा `true` सेट गर्नुहोस् |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (तल हेर्नुहोस्)  | Docker इमेजहरूको अल्पविरामद्वारा छुट्याइएको अनुमति-सूची                     |

पूर्वनिर्धारित रूपमा अनुमति दिइएका इमेजहरू: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`। `SKILLS_ALLOWED_SANDBOX_IMAGES` मार्फत गरिएका कुनै पनि थपहरू पूर्वनिर्धारित सूचीसँग मर्ज गरिन्छन्; अज्ञात इमेजहरू `normalizeImage()` द्वारा अस्वीकार गरिन्छन्।

> टिप्पणी: छुट्टै `SKILLS_EXECUTION_TIMEOUT_MS` वातावरण चर छैन। गैर-स्यान्डबक्स ह्यान्डलरको टाइमआउट `SkillExecutor` (`executor.ts:13`) मा 30 s मा हार्ड-कोड गरिएको छ, तर रनटाइममा `skillExecutor.setTimeout(ms)` मार्फत ओभरराइड गर्न सकिन्छ।

### कार्यस्थान पृथकीकरण

`file_read` र `file_write` ले प्रत्येक पाथलाई `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/` मा रहेको प्रति-API-key कार्यस्थानको सापेक्ष समाधान गर्छन्। कुनै पनि डिस्क I/O अघि पाथ ट्राभर्सल (`..`) र निषेधित खण्डहरू (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) अस्वीकार गरिन्छन्।

### HTTP सुदृढीकरण

`http_request` (`builtins.ts:257`):

- मेथड अनुमति-सूची: `GET, HEAD, POST, PUT, PATCH, DELETE`
- रोकिएका आउटबाउन्ड हेडरहरू: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- रिडाइरेक्टहरू निष्क्रिय (`allowRedirect: false`)
- `guard: "public-only"` सहित `safeOutboundFetch` मार्फत रुट गरिन्छ (निजी/लुपब्याक दायराहरू रोकिएका छन्)
- प्रतिक्रिया `SKILLS_MAX_HTTP_RESPONSE_BYTES` मा काटिन्छ; क्लाइन्टले `truncated: true` देख्छ

---

## हाइब्रिड एक्जिक्युटर (पूर्वावलोकन)

`src/lib/skills/hybrid.ts` ले एउटा `HybridExecutor` परिभाषित गर्छ, जसले प्रत्येक कलका लागि `direct` (इन-प्रोसेस) र `sandbox` कार्यान्वयनमध्ये छनोट गर्छ र टाइमआउट/मेमोरी त्रुटि हुँदा `autoUpgrade` पुनःप्रयास मार्ग प्रयोग गर्छ। यसमा जडान गरिएका `directExecutor` / `sandboxRunner` कार्यान्वयनहरू स्टब हुन् (`executeDirect`, `executeInSandbox` ले प्लेसहोल्डर वस्तुहरू फिर्ता गर्छन्) — यस मोड्युललाई निर्माणाधीन सम्झौताको रूपमा लिनुहोस्। वास्तविक कार्यान्वयन अझै पनि `skillExecutor` + `SandboxRunner` मार्फत हुन्छ।

---

## भण्डारण

स्किमा दुईवटा माइग्रेसनमा अवस्थित छ:

- `src/lib/db/migrations/016_create_skills.sql` — आधारभूत `skills` र `skill_executions` तालिकाहरू, जसमा `(api_key_id, name)` र `(skill_id, status, created_at)` मा इन्डेक्सहरू छन्।
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — `skills` मा `mode`, `source_provider`, `tags` (JSON), `install_count` थप्छ।

`skill_executions.status` लाई डेटाबेस स्तरमा सीमित गरिएको छ: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`।

---

## REST API

सबै एन्डपोइन्टहरू `src/app/api/skills/` अन्तर्गत छन्। व्यवस्थापन एन्डपोइन्टहरू (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) लाई `requireManagementAuth()` मार्फत **व्यवस्थापन प्रमाणीकरण** आवश्यक हुन्छ। मार्केटप्लेस/स्थापना प्रवाहहरूले हल्का `isAuthenticated()` (सेसन वा API कुञ्जी) प्रयोग गर्छन्।

| एन्डपोइन्ट | विधि | उद्देश्य |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | दर्ता गरिएका स्किलहरूको सूची। `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, पृष्ठाङ्कन समर्थन गर्छ |
| `/api/skills/[id]` | PUT | `enabled` वा `mode` अद्यावधिक गर्नुहोस् |
| `/api/skills/[id]` | DELETE | id का आधारमा दर्ता रद्द गर्नुहोस् |
| `/api/skills/install` | POST | अनुकूलन स्किल स्थापना गर्नुहोस् (ह्यान्डलर कोड + स्किमा) |
| `/api/skills/marketplace` | GET | SkillsMP क्याटलग खोज्नुहोस् (`q` खाली हुँदा लोकप्रिय पूर्वनिर्धारितहरू फिर्ता गर्छ) |
| `/api/skills/marketplace/install` | POST | SkillsMP स्किल स्थापना गर्नुहोस् (सक्रिय प्रदायक = `skillsmp` आवश्यक हुन्छ) |
| `/api/skills/skillssh` | GET | skills.sh क्याटलग खोज्नुहोस् (`?q=&limit=`, अधिकतम 100) |
| `/api/skills/skillssh/install` | POST | skills.sh स्किल स्थापना गर्नुहोस् (सक्रिय प्रदायक = `skillssh` आवश्यक हुन्छ) |
| `/api/skills/executions` | GET | पृष्ठाङ्कित कार्यान्वयन इतिहास (`?apiKeyId=`) |
| `/api/skills/executions` | POST | दर्ता गरिएको स्किललाई तदर्थ रूपमा कार्यान्वयन गर्नुहोस् |

`settings.skillsEnabled === false` हुँदा `POST /api/skills/executions` एन्डपोइन्टले `{ error: "Skills execution is disabled..." }` सहित HTTP `503` फिर्ता गर्छ (`executor.ts:42-45`)। सञ्चालकहरूले **Settings → AI** बाट मुख्य स्विच परिवर्तन गर्न सक्छन्।

### उदाहरण: अनुकूलन स्किल स्थापना गर्नुहोस्

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

`handlerCode` स्ट्रिङ एउटा **ह्यान्डलर नाम लुकअप** हो — कार्यान्वयनयोग्य कोड होइन। एक्जिक्युटरले यसलाई `skillExecutor.registerHandler(name, fn)` मार्फत म्याप गर्छ (`executor.ts:25`)। मार्केटप्लेस स्थापनाहरूले SKILL.md पाठलाई यस फिल्डमा दस्तावेजका रूपमा भण्डारण गर्छन् र मोडेलद्वारा उत्पन्न टुल कलहरूमार्फत कार्यान्वयन रुट गर्छन्। प्रयोगकर्ताले उपलब्ध गराएको स्वेच्छाचारी स्रोतलाई eval गरिँदैन।

---

## MCP उपकरणहरू

चारवटा MCP उपकरणले कौशल सतहलाई र्याप गर्छन् (`open-sse/mcp-server/tools/skillTools.ts`)। MCP सर्भर सुरु हुँदा तिनीहरू स्वतः दर्ता हुन्छन्।

| उपकरण                         | विवरण                                                             |
| ----------------------------- | ----------------------------------------------------------------- |
| `omniroute_skills_list`       | कौशलहरूको सूची; वैकल्पिक फिल्टरहरू: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | `skillId` द्वारा कुनै कौशल सक्षम/अक्षम गर्नुहोस्                  |
| `omniroute_skills_execute`    | इनपुट पेलोडसहित कुनै कौशल कार्यान्वयन गर्नुहोस्                   |
| `omniroute_skills_executions` | हालैको कार्यान्वयन इतिहास (पूर्वनिर्धारित 50, अधिकतम 100)         |

ट्रान्सपोर्ट सेटअप र स्कोप निर्धारणहरूका लागि [MCP-SERVER.md](./MCP-SERVER.md) हेर्नुहोस्।

---

## A2A एकीकरण

`src/lib/skills/a2a.ts` ले `memory_aware_routing` A2A कौशल वर्णनकर्ता र `registerA2ASkill(registry)` सहायक निर्यात गर्छ। अनुकूलन A2A कौशलहरू `src/lib/a2a/skills/` मा रहन्छन् र `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`) मार्फत डिस्प्याच हुन्छन्। पूर्ण कार्य जीवनचक्रका लागि [A2A-SERVER.md](./A2A-SERVER.md) हेर्नुहोस्।

---

## नयाँ अन्तर्निर्मित कौशल थप्ने

1. **ह्यान्डलर परिभाषित गर्नुहोस्** `src/lib/skills/builtins.ts` मा (वा `src/lib/skills/builtin/` अन्तर्गतको समानान्तर फाइलमा)। हस्ताक्षर: `(input, { apiKeyId, sessionId }) => Promise<output>`।
2. **स्यान्डबक्स गरिएको कोड पथ?** `sandboxRunner.run(image, command, env, sandboxConfig({...}))` कल गर्नुहोस्। अनुमति सूचीविरुद्ध `normalizeImage()` प्रयोग गर्नुहोस्।
3. **फाइल प्रणाली पथ?** डिस्कमा पहुँच गर्नुअघि सधैँ `resolveWorkspacePath(input, context)` मार्फत पठाउनुहोस्।
4. **नेटवर्क कल?** `guard: "public-only"` सहित `safeOutboundFetch` प्रयोग गर्नुहोस्; `sanitizeHeaders()` मार्फत हेडरहरू सफा गर्नुहोस्।
5. **दर्ता गर्नुहोस्** `builtinSkills` मा प्रविष्टि थपेर (वा बुट हुँदा `registerBrowserSkill(executor)` शैलीमा कल गरेर)।
6. **अन्तर्निर्मित उपकरण उपनामहरू जडान गर्नुहोस्** (वैकल्पिक) यदि अपस्ट्रिम मोडेलले फरक नाम उत्सर्जन गर्छ भने `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) मा।
7. **परीक्षणहरू** `src/lib/skills/__tests__/` मा (Vitest)।

---

## अनुकूलन (अन्तर्निर्मित नभएको) कौशल थप्ने

1. प्रक्रिया सुरु हुँदा ह्यान्डलर दर्ता गर्नुहोस्:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. `POST /api/skills/install` मार्फत कौशल घुसाउनुहोस् (`handlerCode` फिल्ड दर्ता गरिएको ह्यान्डलर नामसँग मिल्नुपर्छ)।
3. `PUT /api/skills/[id]` मार्फत `mode` लाई `on` वा `auto` मा बदल्नुहोस्।

---

## सञ्चालनसम्बन्धी सुझावहरू

- **मुख्य स्विच:** `settings.skillsEnabled = false` ले सबै कार्यान्वयन रोक्छ र `/api/skills/executions` मा HTTP `503` फर्काउँछ। रजिस्ट्री लोड हुन जारी रहन्छ।
- **बाह्य निर्गमन बन्द गर्नुहोस्:** पूर्ण रूपमा एयर-ग्याप गरिएको स्यान्डबक्सिङका लागि `SKILLS_SANDBOX_NETWORK_ENABLED` सेट नगरी राख्नुहोस् (पूर्वनिर्धारित)। प्रत्येक कलको `networkEnabled: true` लाई अझै पनि मुख्य गेट आवश्यक पर्छ।
- **विशिष्ट इमेजहरूलाई अनुमति दिनुहोस्:** अनुमति सूची विस्तार गर्न `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` सेट गर्नुहोस्।
- **कार्यान्वयनहरूको अडिट गर्नुहोस्:** `/dashboard/skills/executions` र `omniroute_skills_executions` दुवैले `skill_executions` क्वेरी गर्छन्। सफल रनहरूमा `durationMs` समावेश हुन्छ; असफलताहरूमा `errorMessage` समावेश हुन्छ।
- **क्यास अमान्यकरण:** म्यानुअल DB सम्पादनपछि `skillRegistry.invalidateCache()` कल गर्नुहोस्; अन्यथा 60 s पर्खनुहोस्।
- **बेनामी कार्यस्थान:** `apiKeyId` खाली हुँदा, सबै कलहरू एउटै `"anonymous"` कार्यस्थानमा ह्यास हुन्छन् — साझेदारी-सचेत कोडले सधैँ वास्तविक कुञ्जी पठाउनुपर्छ।

---

## कार्यान्वयन जीवनचक्र (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) एउटा **सिंगलटन** हो जसले प्रत्येक स्किल आह्वान व्यवस्थापन गर्छ। टाइमआउट, पुनःप्रयास, र कार्यान्वयन अवस्था डिबग गर्न यसको जीवनचक्र बुझ्नु अत्यन्त महत्त्वपूर्ण छ।

### ५-चरणीय जीवनचक्र

```
   execute() कल गरियो
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← लाममा राखिएको, अझै सुरु नभएको (DB पङ्क्ति सिर्जना गरियो)
  └──────┬──────┘
         │ ह्यान्डलर सुरु गर्नुहोस्
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← टाइमआउटसहित ह्यान्डलर आह्वान गरियो
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (अन्य कुनै मार्ग छैन — प्यारेन्टद्वारा समाप्त)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   अवस्था, आउटपुट, durationMs सहित DB पङ्क्ति अद्यावधिक गरियो
```

### पूर्वनिर्धारित कन्फिगरेसन

| सेटिङ        | पूर्वनिर्धारित       | यसमार्फत कन्फिगर गर्न मिल्ने         |
| ------------ | -------------------- | ------------------------------------ |
| `timeout`    | `30000` (३० सेकेन्ड) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`                  | `skillExecutor.setMaxRetries(count)` |

> **महत्त्वपूर्ण**: एक्जिक्युटर सिंगलटन हो — `setTimeout()` कल गर्दा त्यसपछिका सबै आह्वानहरू विश्वव्यापी रूपमा प्रभावित हुन्छन्। हाल प्रत्येक स्किलका लागि छुट्टाछुट्टै टाइमआउट समर्थित छैन; यदि तपाईंलाई प्रत्येक स्किलका लागि फरक टाइमआउट आवश्यक छ भने, छुट्टाछुट्टै प्रोसेसहरू पेस गर्नुहोस् वा एक्जिक्युटरलाई फोर्क गर्नुहोस्।

### अवस्थाका मानहरू

`src/lib/skills/types.ts` बाट:

```ts
enum SkillStatus {
  PENDING = "pending", // लाममा राखिएको, अझै सुरु नभएको
  RUNNING = "running", // ह्यान्डलर आह्वान गरिएको
  SUCCESS = "success", // ह्यान्डलरले मान्य आउटपुट फिर्ता गरेको
  ERROR = "error", // ह्यान्डलरले अपवाद फ्याँकेको
  TIMEOUT = "timeout", // एक्जिक्युटरको टाइमआउट नाघेको
}
```

> **नोट**: `TIMEOUT` अवस्था enum मा परिभाषित छ, तर हालको एक्जिक्युटर कार्यान्वयनले यसलाई **वास्तवमा DB मा लेख्दैन** — टाइमआउटहरू `"Skill execution timed out"` सन्देशसहित `ERROR` का रूपमा देखा पर्छन्। यो अवस्था enum भविष्यमा प्रयोग गर्नका लागि आरक्षित छ।

### कार्यान्वयनहरूको निरीक्षण

```ts
import { skillExecutor } from "omniroute/skills/executor";

// ID द्वारा कुनै विशिष्ट कार्यान्वयन प्राप्त गर्नुहोस्
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// API key का हालैका कार्यान्वयनहरू सूचीबद्ध गर्नुहोस्
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// कुल कार्यान्वयनहरू गणना गर्नुहोस्
const total = skillExecutor.countExecutions("api-key-id");
```

### पुनःप्रयासको व्यवहार

`maxRetries` सेटिङ भण्डारण गरिन्छ, तर हाल एक्जिक्युटरको `execute()` मेथडले यसलाई **प्रयोग गर्दैन** — यसले केवल एकपटक मात्र प्रयास गर्छ। `maxRetries` को मान भविष्यको कार्यान्वयन र यसलाई पढ्न चाहने हुकहरूका लागि उपलब्ध गराइएको छ।

अहिलेका लागि, पुनःप्रयासहरू स्किल ह्यान्डलरभित्रै कार्यान्वयन गर्नुपर्छ। अन्तर्निर्मित
स्किलहरू एक्जिक्युटरसँग दर्ता गरिन्छन् (उदाहरणका लागि, `src/lib/skills/builtin/` मा रहेको `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)`); तपाईंले दर्ता गर्ने जुनसुकै ह्यान्डलरले
आफ्नै पुनःप्रयास लुप समेट्न सक्छ:

```ts
// स्किल ह्यान्डलरभित्र
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

## SkillMode को विस्तृत विवरण

`SkillMode` enum (`src/lib/skills/types.ts`) ले सीपहरू **कहिले र कसरी** आह्वान गरिन्छन् भन्ने नियन्त्रण गर्छ:

```ts
enum SkillMode {
  AUTO = "auto", // सीप कहिले कल गर्ने भन्ने निर्णय LLM ले गर्छ
  MANUAL = "manual", // प्रयोगकर्ताको स्पष्ट अनुरोधद्वारा मात्र आह्वान गरिन्छ
  HYBRID = "hybrid", // AUTO स्कोरिङ + म्यानुअल ओभरराइड
}
```

> **टिप्पणी**: कोडबेसले `SkillMode` (AUTO/MANUAL/HYBRID) परिभाषित गर्छ, जबकि `Skill.mode` फिल्डले फरक संरचना (`"on" | "off" | "auto"`) प्रयोग गर्छ। यी सम्बन्धित छन् तर समान होइनन् — `SkillMode` एक्जिक्युटर नीतिका लागि हो भने `Skill.mode` प्रत्येक सीपको सक्रियताका लागि हो।

### प्रत्येक मोड कहिले प्रयोग गर्ने

| मोड      | LLM को व्यवहार                                                                    | प्रयोगको अवस्था                                       |
| -------- | --------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `AUTO`   | LLM ले आवश्यक ठानेमा सीप कल गर्न सक्छ                                             | सामान्य प्रयोजनका सीपहरू (फाइल पढ्ने, HTTP अनुरोधहरू) |
| `MANUAL` | LLM ले सीप कल गर्न सक्दैन; स्पष्ट `executeSkill` API कलले मात्र यसलाई आह्वान गर्छ | संवेदनशील कार्यहरू (डेटाबेस लेखन, भुक्तानीहरू)        |
| `HYBRID` | LLM ले सीप सुझाव दिन सक्छ; प्रयोगकर्ताले पुष्टि गर्नुपर्छ                         | साइड इफेक्ट भएका तर खतरनाक नभएका सीपहरू               |

### AUTO स्कोरिङ

`AUTO` मोड सक्रिय हुँदा, प्रत्येक सम्भावित सीपलाई अनुरोधको सन्दर्भसँग तुलना गरी
`src/lib/skills/injection.ts` मा रहेको `scoreAutoSkill()` द्वारा स्कोर गरिन्छ — यो एक योगात्मक,
पूर्णाङ्क अङ्क प्रणाली हो (सीपको नाम मिलान, नाम/ट्याग/विवरण टोकन ओभरल्याप,
पृष्ठभूमि-कारण सङ्केतहरू, प्रदायक-सङ्केत बोनस/दण्ड)। `score >= AUTO_MIN_SCORE = 3` भएका शीर्ष
`AUTO_MAX_SKILLS = 5` सीपहरूलाई कल गर्न मिल्ने उपकरणका रूपमा इन्जेक्ट गरिन्छ,
बराबरी हुँदा पहिले `installCount` र त्यसपछि नामका आधारमा क्रम निर्धारण गरिन्छ। पूर्ण अङ्क तालिका यस
कागजातमा पहिले रहेको [**उपकरण स्किमा उत्पादन → AUTO स्कोरिङ**](#auto-scoring) मा
हेर्नुहोस्; यहाँ फ्लोट `0.6`-शैलीको थ्रेसहोल्ड र `registry.ts` स्कोरिङ छैन।

---

## बिल्ट-इन सीपहरूको सूची

OmniRoute सँग `src/lib/skills/builtin/` मा बिल्ट-इन सीपहरूको व्यवस्थित सेट आउँछ। सबैभन्दा सामान्य सीपहरू:

### ब्राउजर स्वचालन सीप

ब्राउजर सीप (`src/lib/skills/builtin/browser.ts`) ले Playwright/Puppeteer मार्फत हेडलेस ब्राउजर स्वचालन प्रदान गर्छ। **यो कार्यान्वयन गरिएको छ तर पूर्वनिर्धारित सीप सूचीमा छैन** — यसलाई प्रयोग गर्न, ब्राउजर एक्सटेन्सन प्लगइन छुट्टै इन्स्टल गर्नुहोस्।

```ts
// आफ्नो कन्फिगमा सक्रिय गर्नुहोस्
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // सधैँ स्पष्ट आह्वान आवश्यक पार्नुहोस्
  allowedSkills: ["browser"],
  timeout: 60000, // पृष्ठ लोड हुनका लागि 60s
  maxRetries: 1,
};
```

### अन्य बिल्ट-इन वर्गहरू

| वर्ग            | सीपहरू                                                 | मोड    |
| --------------- | ------------------------------------------------------ | ------ |
| फाइल I/O        | `file_read`, `file_write`                              | AUTO   |
| HTTP            | `http_request`                                         | AUTO   |
| खोज             | `web_search`                                           | AUTO   |
| कोड कार्यान्वयन | `eval_code` (स्यान्डबक्स गरिएको JavaScript/Python)     | HYBRID |
| प्रणाली         | `execute_command` (स्यान्डबक्स गरिएको CLI कार्यान्वयन) | MANUAL |

### आफूअनुकूल सीप थप्ने

प्लगइन प्रणालीमार्फत आफूअनुकूल सीप कसरी थप्ने भन्ने जानकारीका लागि [प्लगइन SDK र सीप एकीकरण](./PLUGIN_SDK.md) हेर्नुहोस्।

---

## यो पनि हेर्नुहोस्

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP उपकरण दर्ता र ट्रान्सपोर्टहरू
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A कार्य जीवनचक्र र सीप प्रेषण
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — प्रयोगकर्ता-केन्द्रित परिचय
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — अनुरोध पाइपलाइन र कम्पोनेन्ट नक्सा
- स्रोत: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- परीक्षणहरू: `src/lib/skills/__tests__/integration.test.ts`
