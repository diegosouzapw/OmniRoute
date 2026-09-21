# OmniRoute A2A Server Documentation (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — बुद्धिमान रूटिंग एजंट म्हणून OmniRoute

A2A पृष्ठभागाचे दोन भाग आहेत:

- **JSON-RPC 2.0** येथे: `POST /a2a` (अधिकृत प्रवेशबिंदू, `src/app/a2a/route.ts` मध्ये परिभाषित).
- डॅशबोर्ड आणि साधनांसाठी `/api/a2a/*` अंतर्गत **REST** (स्थिती, कार्य सूची, रद्द करणे).

कार्यांचा मागोवा `A2ATaskManager` द्वारे घेतला जातो (`src/lib/a2a/taskManager.ts`, डीफॉल्ट 5-मिनिटांची TTL). कौशल्ये `src/lib/a2a/taskExecution.ts` मधील `A2A_SKILL_HANDLERS` द्वारे पाठवली जातात.

## एजंट शोध

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute च्या क्षमता, कौशल्ये आणि प्रमाणीकरण आवश्यकता यांचे वर्णन करणारे Agent Card परत करते.

Agent Card मधील `version` फील्ड `process.env.npm_package_version` मधून घेतले जाते (`src/app/.well-known/agent.json/route.ts:13` पहा), त्यामुळे प्रत्येक प्रकाशनावेळी ते `package.json` सोबत आपोआप समक्रमित राहते.

---

## प्रमाणीकरण

सर्व `/a2a` विनंत्यांसाठी `Authorization` हेडरद्वारे API की आवश्यक आहे:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

सर्व्हरवर कोणतीही API की कॉन्फिगर केलेली नसल्यास प्रमाणीकरण वगळले जाते.

## सक्षम करणे

A2A हे **Endpoints → A2A** टॉगलद्वारे नियंत्रित केले जाते आणि डीफॉल्टनुसार अक्षम असते. अक्षम असताना,
`GET /api/a2a/status` हे `status: "disabled"` आणि `online: false` नोंदवते; `POST /a2a` वरील JSON-RPC कॉल
JSON-RPC त्रुटी कोड `-32000` सह HTTP 503 परत करतात.

---

## JSON-RPC 2.0 पद्धती

### `message/send` — समकालिक अंमलबजावणी

कौशल्याला संदेश पाठवते आणि संपूर्ण प्रतिसादाची प्रतीक्षा करते.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**प्रतिसाद:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": {
        "estimated": 0.005,
        "actual": 0.003,
        "currency": "USD"
      },
      "resilience_trace": [
        {
          "event": "primary_selected",
          "provider": "anthropic",
          "timestamp": "..."
        }
      ],
      "policy_verdict": {
        "allowed": true,
        "reason": "within budget and quota limits"
      }
    }
  }
}
```

### `message/stream` — SSE प्रवाह

`message/send` प्रमाणेच, परंतु रिअल-टाइम प्रवाहासाठी Server-Sent Events परत करते.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**SSE इव्हेंट्स:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — कार्याची स्थिती तपासा

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — कार्य रद्द करा

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## उपलब्ध कौशल्ये

OmniRoute, `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` मध्ये जोडलेली 6 A2A कौशल्ये उपलब्ध करून देते. प्रत्येक कौशल्य मॉड्यूल `src/lib/a2a/skills/` मध्ये आहे.

| कौशल्य          | ID                   | वर्णन                                                                                                                                                         | टॅग                  | उदाहरणे                                      |
| :-------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------- | :------------------------------------------- |
| स्मार्ट राउटिंग | `smart-routing`      | OmniRoute चे कॉम्बो इंजिन + स्कोअरिंग वापरून प्रॉम्प्टला सर्वोत्तम प्रदाता/कॉम्बोद्वारे रूट करते                                                              | राउटिंग, प्रदाते     | "हा प्रॉम्प्ट सर्वोत्तम मॉडेलद्वारे रूट करा" |
| कोटा व्यवस्थापन | `quota-management`   | प्रत्येक प्रदात्याच्या कोट्याची स्थिती नोंदवते आणि कॉलर्सना थ्रॉटल/स्विच कधी करायचे हे ठरवण्यात मदत करते                                                      | कोटा, प्रदाते        | "anthropic चा कोटा तपासा"                    |
| प्रदाता शोध     | `provider-discovery` | स्थापित प्रदात्यांची क्षमता, मोफत-स्तर फ्लॅग आणि OAuth स्थितीसह यादी देते                                                                                     | प्रदाते, शोध         | "कोणते प्रदाते उपलब्ध आहेत?"                 |
| खर्च विश्लेषण   | `cost-analysis`      | कॅटलॉग + अलीकडील वापराच्या आधारे विनंतीचा/संभाषणाचा खर्च अंदाजित करते                                                                                         | खर्च, वापर           | "या संभाषणाच्या खर्चाचा अंदाज लावा"          |
| आरोग्य अहवाल    | `health-report`      | प्रत्येक प्रदात्याची सर्किट ब्रेकर, कूलडाउन आणि लॉकआउट स्थिती एकत्रित करते                                                                                    | आरोग्य, लवचिकता      | "सर्व प्रदात्यांची आरोग्य स्थिती दाखवा"      |
| क्षमतांची यादी  | `list-capabilities`  | संदर्भ अंतःक्षेपणासाठी raw SKILL.md URLs सह संपूर्ण 45-नोंदींचा Agent Skills कॅटलॉग (23 API + 21 CLI + 1 कॉन्फिगरेशन) मार्कडाउन तक्त्याच्या स्वरूपात परत करते | कॅटलॉग, शोध, कौशल्ये | "OmniRoute च्या सर्व क्षमतांची यादी द्या"    |

> Agent Card हे प्रत्यक्ष 352-प्रदात्यांच्या कॅटलॉगशी सुसंगत ठेवले पाहिजे; प्रदात्यांची संख्या आणि मोफत/प्रमाणीकरण-नसलेला मेटाडेटा रनटाइम रजिस्ट्रीमधून घेतला जातो.

### `list-capabilities` कौशल्याचा तपशील

API कॉल्स पाठवण्यापूर्वी OmniRoute काय उपलब्ध करून देते हे शोधण्याची आवश्यकता असलेल्या बाह्य एजंट्ससाठी `list-capabilities` कौशल्य विशेषतः उपयुक्त आहे. ते संरचित मार्कडाउन तक्ता आर्टिफॅक्ट परत करते:

```
| ID | नाव | श्रेणी | क्षेत्र | एंडपॉइंट्स/कमांड्स | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | प्रमाणीकरण आणि सत्रे | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

प्रत्येक ओळीत `rawUrl` स्तंभ समाविष्ट असतो, त्यामुळे एजंट्स संपूर्ण SKILL.md त्वरित मिळवू शकतात. `metadata.totalSkills` फील्ड कॅटलॉगचा आकार प्रतिबिंबित करते (आज 45). अंमलबजावणी: `src/lib/a2a/skills/listCapabilities.ts`. [AGENT-SKILLS.md](./AGENT-SKILLS.md) हे देखील पहा.

---

## REST API (सहाय्यक)

JSON-RPC एंडपॉइंट `/a2a` हा अधिकृत A2A प्रवेशबिंदू आहे. खालील REST एंडपॉइंट्स डॅशबोर्ड आणि बाह्य साधनांसाठी सहाय्यक प्रवेश प्रदान करतात:

| एंडपॉइंट                     | पद्धत | वर्णन                                                       | प्रमाणीकरण                                        |
| :--------------------------- | :---- | :---------------------------------------------------------- | :------------------------------------------------ |
| `/api/a2a/status`            | GET   | सर्व्हरची स्थिती, नोंदणीकृत कौशल्ये                         | (सार्वजनिक)                                       |
| `/api/a2a/tasks`             | GET   | फिल्टर्ससह कार्यांची सूची                                   | व्यवस्थापन                                        |
| `/api/a2a/tasks/[id]`        | GET   | ID नुसार कार्य मिळवा                                        | व्यवस्थापन                                        |
| `/api/a2a/tasks/[id]/cancel` | POST  | सुरू असलेले कार्य रद्द करा                                  | व्यवस्थापन                                        |
| `/.well-known/agent.json`    | GET   | Agent Card (A2A शोध)                                        | (सार्वजनिक, 3600s साठी कॅश केलेले)                |
| `/api/a2a/tasks`             | POST  | OmniConductor फ्लीटकडे इनबाउंड डेलिगेशन (Conductor PRD RF5) | Bearer विरुद्ध `OMNIROUTE_API_KEY` + `a2aEnabled` |

**इनबाउंड Conductor डेलिगेशन (`POST /api/a2a/tasks`):** बाह्य A2A एजंट OmniRoute द्वारे OmniConductor फ्लीटकडे कोडिंगचे काम सोपवतात. बॉडी: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — फक्त Conductor फ्लीट कौशल्ये (Agent Card वर घोषित केलेली) डेलिगेट करता येतात; `metadata.conductor.repo.url` आवश्यक आहे (फ्लीट git रेपोंवर काम करते). हा रूट सर्व्हर-साइड `CONDUCTOR_ORCHESTRATOR_TOKEN` (`CONDUCTOR_HUB_TOKEN` हा पर्याय म्हणून वापरून) वापरून हबच्या `POST /v1/tasks` मध्ये रूपांतरित होतो आणि `201 { conductor_task_id, state: "submitted" }` परत करतो; कार्याच्या स्थिती SSE→A2A मिरर (RF1) द्वारे परत प्रवाहित होतात आणि `GET /api/a2a/tasks?skill=conductor` द्वारे पाहता येतात.

---

## नवीन कौशल्य जोडणे

1. **कौशल्य फाइल तयार करा:** `src/lib/a2a/skills/<your-skill>.ts`

   `(task: A2ATask) => Promise<{ artifacts, metadata }>` हे async फंक्शन एक्सपोर्ट करा. `smartRouting.ts` यांसारख्या विद्यमान कौशल्यांच्या संरचनेचे अनुसरण करा.

2. **हँडलरची नोंदणी करा:** `src/lib/a2a/taskExecution.ts` मध्ये, `A2A_SKILL_HANDLERS` मध्ये नोंद जोडा:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...विद्यमान कौशल्ये
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Agent Card मध्ये उपलब्ध करा:** `src/app/.well-known/agent.json/route.ts` मध्ये, `skills` अॅरेमध्ये जोडा:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **चाचण्या लिहा:** `tests/unit/a2a-<your-skill>.test.ts`. यशस्वी मार्ग + त्रुटी मार्ग समाविष्ट करा.

5. या फाइलमधील `Available Skills` तक्त्यात नवीन कौशल्याचे **दस्तऐवजीकरण करा**.

---

## कार्याचा TTL

कार्ये `ttlMinutes` नंतर कालबाह्य होतात (डीफॉल्ट 5 मिनिटे) — हे `src/lib/a2a/taskManager.ts:82` येथे `A2ATaskManager` कन्स्ट्रक्टरमध्ये कॉन्फिगर केलेले आहे. सानुकूलित करण्यासाठी, `A2ATaskManager` इन्स्टन्सिएशन फोर्क करा आणि वेगळे मूल्य द्या (उदा., 15-मिनिटांच्या TTL साठी `new A2ATaskManager(15)`). पार्श्वभूमीतील इंटरव्हल दर 60 सेकंदांनी कालबाह्य झालेली कार्ये हटवतो.

---

## कार्याचे जीवनचक्र

```
सबमिट केले → प्रगतीपथावर → पूर्ण झाले
                          → अयशस्वी झाले
                          → रद्द झाले
```

- कार्ये डीफॉल्टनुसार 5 मिनिटांनंतर कालबाह्य होतात ([कार्याचा TTL](#task-ttl) पहा)
- अंतिम स्थिती: `completed`, `failed`, `cancelled`
- इव्हेंट लॉग प्रत्येक स्थितीतील संक्रमणाची नोंद ठेवतो

---

## त्रुटी कोड

| कोड    | अर्थ                           |
| :----- | :----------------------------- |
| -32700 | पार्स त्रुटी (अवैध JSON)       |
| -32600 | अवैध विनंती / अनधिकृत          |
| -32601 | पद्धत किंवा कौशल्य सापडले नाही |
| -32602 | अवैध पॅरामीटर्स                |
| -32603 | अंतर्गत त्रुटी                 |
| -32000 | A2A एंडपॉइंट अक्षम केला आहे    |

---

## इंटिग्रेशनची उदाहरणे

### Python (requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
