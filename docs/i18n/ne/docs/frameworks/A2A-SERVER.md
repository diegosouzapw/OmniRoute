# OmniRoute A2A Server Documentation (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — एक बुद्धिमान राउटिङ एजेन्टको रूपमा OmniRoute

A2A सतहका दुई पक्ष छन्:

- **JSON-RPC 2.0** `POST /a2a` मा (प्रामाणिक प्रवेश बिन्दु, `src/app/a2a/route.ts` मा परिभाषित)।
- **REST** ड्यासबोर्ड र उपकरणहरूका लागि `/api/a2a/*` अन्तर्गत (स्थिति, कार्य सूची, रद्द गर्ने)।

कार्यहरू `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, पूर्वनिर्धारित ५-मिनेट TTL) द्वारा ट्र्याक गरिन्छन्। सीपहरू `src/lib/a2a/taskExecution.ts` मा रहेको `A2A_SKILL_HANDLERS` मार्फत डिस्प्याच गरिन्छन्।

## एजेन्ट अन्वेषण

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute का क्षमताहरू, स्किलहरू र प्रमाणीकरण आवश्यकताहरू वर्णन गर्ने Agent Card फर्काउँछ।

Agent Card को `version` फिल्ड `process.env.npm_package_version` बाट लिइन्छ (`src/app/.well-known/agent.json/route.ts:13` हेर्नुहोस्), त्यसैले यो प्रत्येक रिलिजमा `package.json` सँग स्वतः समक्रमित रहन्छ।

---

## प्रमाणीकरण

सबै `/a2a` अनुरोधहरूलाई `Authorization` हेडरमार्फत API कुञ्जी आवश्यक पर्छ:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

सर्भरमा कुनै API कुञ्जी कन्फिगर गरिएको छैन भने प्रमाणीकरण बाइपास गरिन्छ।

## सक्रियता

A2A लाई **Endpoints → A2A** टगलद्वारा नियन्त्रण गरिन्छ र यो पूर्वनिर्धारित रूपमा निष्क्रिय हुन्छ। निष्क्रिय हुँदा,
`GET /api/a2a/status` ले `status: "disabled"` र `online: false` रिपोर्ट गर्छ; `POST /a2a` मा गरिएका JSON-RPC कलहरूले
JSON-RPC त्रुटि कोड `-32000` सहित HTTP 503 फर्काउँछन्।

---

## JSON-RPC 2.0 विधिहरू

### `message/send` — समकालिक कार्यान्वयन

कुनै स्किललाई सन्देश पठाउँछ र पूर्ण प्रतिक्रियाको प्रतीक्षा गर्छ।

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

**प्रतिक्रिया:**

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

### `message/stream` — SSE स्ट्रिमिङ

`message/send` जस्तै हो, तर वास्तविक-समय स्ट्रिमिङका लागि Server-Sent Events फर्काउँछ।

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

**SSE घटनाहरू:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — कार्य स्थिति सोधपुछ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — कार्य रद्द गर्ने

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## उपलब्ध स्किलहरू

OmniRoute ले `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` मा जडान गरिएका 6 वटा A2A स्किल उपलब्ध गराउँछ। प्रत्येक स्किल मोड्युल `src/lib/a2a/skills/` मा रहन्छ।

| स्किल             | ID                   | विवरण                                                                                                                                                            | ट्यागहरू               | उदाहरणहरू                                            |
| :---------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- | :--------------------------------------------------- |
| स्मार्ट राउटिङ    | `smart-routing`      | OmniRoute को कम्बो इन्जिन + स्कोरिङ प्रयोग गरेर प्रॉम्प्टलाई सबैभन्दा उपयुक्त प्रदायक/कम्बोमार्फत रुट गर्छ                                                       | राउटिङ, प्रदायकहरू     | "यो प्रॉम्प्टलाई उत्कृष्ट मोडेलमार्फत रुट गर्नुहोस्" |
| कोटा व्यवस्थापन   | `quota-management`   | प्रत्येक प्रदायकको कोटा अवस्था रिपोर्ट गर्छ र कलरहरूलाई कहिले थ्रोटल गर्ने/स्विच गर्ने भन्ने निर्णय गर्न मद्दत गर्छ                                              | कोटा, प्रदायकहरू       | "anthropic को कोटा जाँच गर्नुहोस्"                   |
| प्रदायक खोज       | `provider-discovery` | क्षमताहरू, निःशुल्क-टियर फ्ल्यागहरू र OAuth स्थितिसहित इन्स्टल गरिएका प्रदायकहरूको सूची दिन्छ                                                                    | प्रदायकहरू, खोज        | "कुन-कुन प्रदायक उपलब्ध छन्?"                        |
| लागत विश्लेषण     | `cost-analysis`      | क्याटलग + हालैको प्रयोगका आधारमा अनुरोध/वार्तालापको लागत अनुमान गर्छ                                                                                             | लागत, प्रयोग           | "यो वार्तालापको लागत अनुमान गर्नुहोस्"               |
| स्वास्थ्य रिपोर्ट | `health-report`      | प्रत्येक प्रदायकको सर्किट ब्रेकर, कूलडाउन र लकआउट अवस्था एकत्रित गर्छ                                                                                            | स्वास्थ्य, लचिलोपन     | "सबै प्रदायकहरूको स्वास्थ्य स्थिति देखाउनुहोस्"      |
| क्षमताहरूको सूची  | `list-capabilities`  | सन्दर्भ इन्जेक्सनका लागि raw SKILL.md URL हरूसहित पूर्ण 45-प्रविष्टि भएको Agent Skills क्याटलग (23 API + 21 CLI + 1 कन्फिग) लाई markdown तालिकाका रूपमा फर्काउँछ | क्याटलग, खोज, स्किलहरू | "OmniRoute का सबै क्षमताहरूको सूची दिनुहोस्"         |

> Agent Card लाई प्रत्यक्ष 352-प्रदायक क्याटलगसँग समक्रमित राख्नुपर्छ; प्रदायक सङ्ख्या र निःशुल्क/प्रमाणीकरण-नचाहिने मेटाडेटा रनटाइम रजिस्ट्रीबाट लिइन्छ।

### `list-capabilities` स्किलको विवरण

`list-capabilities` स्किल विशेष गरी API कलहरू पठाउनुअघि OmniRoute ले के उपलब्ध गराउँछ भनेर पत्ता लगाउनुपर्ने बाह्य एजेन्टहरूका लागि उपयोगी छ। यसले संरचित markdown तालिका आर्टिफ्याक्ट फर्काउँछ:

```
| ID | नाम | वर्ग | क्षेत्र | एन्डपोइन्टहरू/कमाण्डहरू | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | प्रमाणीकरण र सत्रहरू | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

प्रत्येक पङ्क्तिमा `rawUrl` स्तम्भ समावेश हुन्छ, जसले गर्दा एजेन्टहरूले तत्काल पूर्ण SKILL.md प्राप्त गर्न सक्छन्। `metadata.totalSkills` फिल्डले क्याटलगको आकार (हाल 45) प्रतिबिम्बित गर्छ। कार्यान्वयन: `src/lib/a2a/skills/listCapabilities.ts`। [AGENT-SKILLS.md](./AGENT-SKILLS.md) पनि हेर्नुहोस्।

---

## REST API (सहायक)

JSON-RPC endpoint `/a2a` नै आधिकारिक A2A प्रवेश बिन्दु हो। तलका REST endpoint हरूले dashboard र बाह्य tooling का लागि सहायक पहुँच प्रदान गर्छन्:

| Endpoint                     | विधि | विवरण                                                      | प्रमाणीकरण                                        |
| :--------------------------- | :--- | :--------------------------------------------------------- | :------------------------------------------------ |
| `/api/a2a/status`            | GET  | Server को स्थिति, दर्ता गरिएका skill हरू                   | (सार्वजनिक)                                       |
| `/api/a2a/tasks`             | GET  | filter सहित task हरूको सूची                                | व्यवस्थापन                                        |
| `/api/a2a/tasks/[id]`        | GET  | ID द्वारा task प्राप्त गर्ने                               | व्यवस्थापन                                        |
| `/api/a2a/tasks/[id]/cancel` | POST | चलिरहेको task रद्द गर्ने                                   | व्यवस्थापन                                        |
| `/.well-known/agent.json`    | GET  | Agent Card (A2A खोज)                                       | (सार्वजनिक, 3600s सम्म cache गरिएको)              |
| `/api/a2a/tasks`             | POST | OmniConductor fleet मा आगमन delegation (Conductor PRD RF5) | Bearer विरुद्ध `OMNIROUTE_API_KEY` + `a2aEnabled` |

**आगमन Conductor delegation (`POST /api/a2a/tasks`):** बाह्य A2A agent हरूले OmniRoute मार्फत coding कार्य OmniConductor fleet लाई सुम्पन्छन्। Body: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — केवल Conductor fleet skill हरू (Agent Card मा घोषणा गरिएका) मात्र delegate गर्न सकिन्छ; `metadata.conductor.repo.url` आवश्यक छ (fleet ले git repo हरूमा काम गर्छ)। route ले server-side `CONDUCTOR_ORCHESTRATOR_TOKEN` (fallback `CONDUCTOR_HUB_TOKEN`) प्रयोग गरेर यसलाई hub को `POST /v1/tasks` मा अनुवाद गर्छ र `201 { conductor_task_id, state: "submitted" }` फर्काउँछ; task का state हरू SSE→A2A mirror (RF1) मार्फत फिर्ता प्रवाहित हुन्छन् र `GET /api/a2a/tasks?skill=conductor` मार्फत देख्न सकिन्छ।

---

## नयाँ Skill थप्ने

1. **Skill file सिर्जना गर्नुहोस्:** `src/lib/a2a/skills/<your-skill>.ts`

   एउटा async function `(task: A2ATask) => Promise<{ artifacts, metadata }>` export गर्नुहोस्। `smartRouting.ts` जस्ता विद्यमान skill हरूको संरचना अनुसरण गर्नुहोस्।

2. **Handler दर्ता गर्नुहोस्:** `src/lib/a2a/taskExecution.ts` मा, `A2A_SKILL_HANDLERS` मा एउटा entry थप्नुहोस्:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...विद्यमान skill हरू
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Agent Card मा उपलब्ध गराउनुहोस्:** `src/app/.well-known/agent.json/route.ts` मा, `skills` array मा थप्नुहोस्:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Test हरू लेख्नुहोस्:** `tests/unit/a2a-<your-skill>.test.ts`। सफल अवस्था + त्रुटि अवस्था समेट्नुहोस्।

5. यस file को `Available Skills` table मा नयाँ skill लाई **दस्तावेजीकरण गर्नुहोस्**।

---

## कार्य TTL

कार्यहरूको म्याद `ttlMinutes` पछि समाप्त हुन्छ (पूर्वनिर्धारित 5 मिनेट) — यसलाई `src/lib/a2a/taskManager.ts:82` मा रहेको `A2ATaskManager` कन्स्ट्रक्टरमा कन्फिगर गरिएको छ। अनुकूलित गर्न, `A2ATaskManager` को इन्स्ट्यान्सिएसन फोर्क गर्नुहोस् र फरक मान पास गर्नुहोस् (उदाहरणका लागि, 15-मिनेटको TTL का लागि `new A2ATaskManager(15)`)। पृष्ठभूमिमा चल्ने इन्टरभलले प्रत्येक 60 सेकेन्डमा म्याद सकिएका कार्यहरू हटाउँछ।

---

## कार्यको जीवनचक्र

```
पेश गरिएको → कार्यरत → सम्पन्न
                    → असफल
                    → रद्द गरिएको
```

- कार्यहरूको म्याद पूर्वनिर्धारित रूपमा 5 मिनेटपछि समाप्त हुन्छ ([कार्य TTL](#task-ttl) हेर्नुहोस्)
- अन्तिम अवस्थाहरू: `completed`, `failed`, `cancelled`
- घटना लगले हरेक अवस्था परिवर्तन ट्र्याक गर्छ

---

## त्रुटि कोडहरू

| कोड    | अर्थ                       |
| :----- | :------------------------- |
| -32700 | पार्स त्रुटि (अमान्य JSON) |
| -32600 | अमान्य अनुरोध / अनधिकृत    |
| -32601 | विधि वा सीप फेला परेन      |
| -32602 | अमान्य प्यारामिटरहरू       |
| -32603 | आन्तरिक त्रुटि             |
| -32000 | A2A एन्डपोइन्ट निष्क्रिय छ |

---

## एकीकरणका उदाहरणहरू

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
