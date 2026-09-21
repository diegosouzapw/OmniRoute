# OmniRoute A2A Server Documentation (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — एक बुद्धिमान रूटिंग एजेंट के रूप में OmniRoute

A2A इंटरफ़ेस के दो रूप हैं:

- **JSON-RPC 2.0** के लिए `POST /a2a` (मानक प्रवेश बिंदु, जिसे `src/app/a2a/route.ts` में परिभाषित किया गया है)।
- डैशबोर्ड और टूलिंग (स्थिति, कार्य सूची, रद्दीकरण) के लिए `/api/a2a/*` के अंतर्गत **REST**।

कार्यों को `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, डिफ़ॉल्ट 5-मिनट TTL) द्वारा ट्रैक किया जाता है। कौशलों को `src/lib/a2a/taskExecution.ts` में मौजूद `A2A_SKILL_HANDLERS` के माध्यम से डिस्पैच किया जाता है।

## एजेंट खोज

```bash
curl http://localhost:20128/.well-known/agent.json
```

यह OmniRoute की क्षमताओं, कौशलों और प्रमाणीकरण आवश्यकताओं का वर्णन करने वाला Agent Card लौटाता है।

Agent Card का `version` फ़ील्ड `process.env.npm_package_version` से प्राप्त होता है (`src/app/.well-known/agent.json/route.ts:13` देखें), इसलिए यह प्रत्येक रिलीज़ पर `package.json` के साथ स्वतः सिंक्रनाइज़ रहता है।

---

## प्रमाणीकरण

सभी `/a2a` अनुरोधों के लिए `Authorization` हेडर के माध्यम से API कुंजी आवश्यक है:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

यदि सर्वर पर कोई API कुंजी कॉन्फ़िगर नहीं की गई है, तो प्रमाणीकरण को बायपास कर दिया जाता है।

## सक्षमीकरण

A2A को **Endpoints → A2A** टॉगल द्वारा नियंत्रित किया जाता है और यह डिफ़ॉल्ट रूप से अक्षम रहता है। अक्षम होने पर,
`GET /api/a2a/status`, `status: "disabled"` और `online: false` रिपोर्ट करता है; `POST /a2a` पर JSON-RPC कॉल
JSON-RPC त्रुटि कोड `-32000` के साथ HTTP 503 लौटाती हैं।

---

## JSON-RPC 2.0 विधियाँ

### `message/send` — समकालिक निष्पादन

किसी कौशल को संदेश भेजता है और पूर्ण प्रतिक्रिया की प्रतीक्षा करता है।

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

### `message/stream` — SSE स्ट्रीमिंग

यह `message/send` के समान है, लेकिन रीयल-टाइम स्ट्रीमिंग के लिए Server-Sent Events लौटाता है।

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

**SSE इवेंट:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — कार्य की स्थिति पूछें

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — कार्य रद्द करें

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## उपलब्ध स्किल्स

OmniRoute, `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` में जुड़े 6 A2A स्किल्स उपलब्ध कराता है। प्रत्येक स्किल मॉड्यूल `src/lib/a2a/skills/` में स्थित है।

| स्किल                  | ID                   | विवरण                                                                                                                                                                       | टैग                  | उदाहरण                                                 |
| :--------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- | :----------------------------------------------------- |
| स्मार्ट रूटिंग         | `smart-routing`      | OmniRoute के कॉम्बो इंजन + स्कोरिंग का उपयोग करके किसी प्रॉम्प्ट को इष्टतम प्रोवाइडर/कॉम्बो के माध्यम से रूट करता है                                                        | रूटिंग, प्रोवाइडर्स  | "इस प्रॉम्प्ट को सर्वोत्तम मॉडल के माध्यम से रूट करें" |
| कोटा प्रबंधन           | `quota-management`   | प्रत्येक प्रोवाइडर की कोटा स्थिति की रिपोर्ट करता है और कॉलर्स को थ्रॉटल/स्विच करने का समय तय करने में सहायता करता है                                                       | कोटा, प्रोवाइडर्स    | "anthropic का कोटा जाँचें"                             |
| प्रोवाइडर खोज          | `provider-discovery` | इंस्टॉल किए गए प्रोवाइडर्स को उनकी क्षमताओं, फ़्री-टियर फ़्लैग्स और OAuth स्थिति के साथ सूचीबद्ध करता है                                                                    | प्रोवाइडर्स, खोज     | "कौन-से प्रोवाइडर्स उपलब्ध हैं?"                       |
| लागत विश्लेषण          | `cost-analysis`      | कैटलॉग + हालिया उपयोग के आधार पर किसी अनुरोध/वार्तालाप की लागत का अनुमान लगाता है                                                                                           | लागत, उपयोग          | "इस वार्तालाप की लागत का अनुमान लगाएँ"                 |
| स्वास्थ्य रिपोर्ट      | `health-report`      | प्रत्येक प्रोवाइडर के लिए सर्किट ब्रेकर, कूलडाउन और लॉकआउट स्थिति को एकत्रित करता है                                                                                        | स्वास्थ्य, लचीलापन   | "सभी प्रोवाइडर्स की स्वास्थ्य स्थिति दिखाएँ"           |
| क्षमताएँ सूचीबद्ध करें | `list-capabilities`  | संदर्भ अंतःक्षेपण के लिए कच्चे SKILL.md URLs के साथ पूर्ण 45-प्रविष्टि वाली Agent Skills कैटलॉग (23 API + 21 CLI + 1 कॉन्फ़िगरेशन) को मार्कडाउन तालिका के रूप में लौटाता है | कैटलॉग, खोज, स्किल्स | "OmniRoute की सभी क्षमताएँ सूचीबद्ध करें"              |

> Agent Card को सक्रिय 352-प्रोवाइडर कैटलॉग के अनुरूप रखा जाना चाहिए; प्रोवाइडर की संख्या और मुफ़्त/बिना-प्रमाणीकरण वाले मेटाडेटा रनटाइम रजिस्ट्री से प्राप्त किए जाते हैं।

### `list-capabilities` स्किल का विवरण

`list-capabilities` स्किल उन बाहरी एजेंट्स के लिए विशेष रूप से उपयोगी है, जिन्हें API कॉल्स भेजने से पहले यह पता लगाना होता है कि OmniRoute क्या उपलब्ध कराता है। यह एक संरचित मार्कडाउन तालिका आर्टिफ़ैक्ट लौटाता है:

```
| ID | नाम | श्रेणी | क्षेत्र | एंडपॉइंट्स/कमांड्स | कच्चा URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | प्रमाणीकरण और सत्र | api | प्रमाणीकरण | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

प्रत्येक पंक्ति में `rawUrl` कॉलम शामिल होता है, ताकि एजेंट्स तुरंत पूर्ण SKILL.md प्राप्त कर सकें। `metadata.totalSkills` फ़ील्ड कैटलॉग के आकार को दर्शाता है (आज 45)। कार्यान्वयन: `src/lib/a2a/skills/listCapabilities.ts`। [AGENT-SKILLS.md](./AGENT-SKILLS.md) भी देखें।

---

## REST API (सहायक)

JSON-RPC एंडपॉइंट `/a2a` प्रामाणिक A2A प्रवेश बिंदु है। नीचे दिए गए REST एंडपॉइंट डैशबोर्ड और बाहरी टूलिंग के लिए सहायक पहुँच प्रदान करते हैं:

| एंडपॉइंट                     | विधि | विवरण                                                        | प्रमाणीकरण                                     |
| :--------------------------- | :--- | :----------------------------------------------------------- | :--------------------------------------------- |
| `/api/a2a/status`            | GET  | सर्वर की स्थिति, पंजीकृत स्किल                               | (सार्वजनिक)                                    |
| `/api/a2a/tasks`             | GET  | फ़िल्टर के साथ टास्क सूचीबद्ध करें                           | प्रबंधन                                        |
| `/api/a2a/tasks/[id]`        | GET  | ID द्वारा टास्क प्राप्त करें                                 | प्रबंधन                                        |
| `/api/a2a/tasks/[id]/cancel` | POST | चल रहा टास्क रद्द करें                                       | प्रबंधन                                        |
| `/.well-known/agent.json`    | GET  | Agent Card (A2A खोज)                                         | (सार्वजनिक, 3600s तक कैश किया गया)             |
| `/api/a2a/tasks`             | POST | OmniConductor फ़्लीट को इनबाउंड डेलिगेशन (Conductor PRD RF5) | Bearer बनाम `OMNIROUTE_API_KEY` + `a2aEnabled` |

**इनबाउंड Conductor डेलिगेशन (`POST /api/a2a/tasks`):** बाहरी A2A एजेंट OmniRoute के माध्यम से कोडिंग कार्य OmniConductor फ़्लीट को सौंपते हैं। बॉडी: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — केवल Conductor फ़्लीट स्किल (Agent Card पर घोषित स्किल) ही डेलिगेट किए जा सकते हैं; `metadata.conductor.repo.url` आवश्यक है (फ़्लीट git रिपॉज़िटरी पर काम करता है)। यह रूट सर्वर-साइड `CONDUCTOR_ORCHESTRATOR_TOKEN` (फ़ॉलबैक `CONDUCTOR_HUB_TOKEN`) का उपयोग करके हब के `POST /v1/tasks` में रूपांतरित होता है और `201 { conductor_task_id, state: "submitted" }` लौटाता है; टास्क स्थितियाँ SSE→A2A मिरर (RF1) के माध्यम से वापस प्रवाहित होती हैं और `GET /api/a2a/tasks?skill=conductor` के माध्यम से दिखाई देती हैं।

---

## नया स्किल जोड़ना

1. **स्किल फ़ाइल बनाएँ:** `src/lib/a2a/skills/<your-skill>.ts`

   एक async फ़ंक्शन `(task: A2ATask) => Promise<{ artifacts, metadata }>` एक्सपोर्ट करें। `smartRouting.ts` जैसे मौजूदा स्किल के स्वरूप का अनुसरण करें।

2. **हैंडलर पंजीकृत करें:** `src/lib/a2a/taskExecution.ts` में, `A2A_SKILL_HANDLERS` में एक प्रविष्टि जोड़ें:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...मौजूदा स्किल
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Agent Card में प्रदर्शित करें:** `src/app/.well-known/agent.json/route.ts` में, `skills` ऐरे में जोड़ें:

   ```json
   {
     "id": "your-skill",
     "name": "आपका स्किल",
     "description": "संक्षिप्त, उद्देश्य-केंद्रित विवरण",
     "tags": ["रूटिंग", "कोटा"],
     "examples": ["प्राकृतिक भाषा में आह्वान का नमूना"]
   }
   ```

4. **टेस्ट लिखें:** `tests/unit/a2a-<your-skill>.test.ts`। सफल पथ + त्रुटि पथ को कवर करें।

5. इस फ़ाइल की `Available Skills` तालिका में नए स्किल का **दस्तावेज़ीकरण करें**।

---

## टास्क TTL

टास्क `ttlMinutes` (डिफ़ॉल्ट 5 मिनट) के बाद समाप्त हो जाते हैं — इसे `src/lib/a2a/taskManager.ts:82` पर `A2ATaskManager` कंस्ट्रक्टर में कॉन्फ़िगर किया गया है। इसे अनुकूलित करने के लिए, `A2ATaskManager` इंस्टैंशिएशन को फ़ोर्क करें और कोई अलग मान पास करें (उदाहरण के लिए, 15-मिनट के TTL हेतु `new A2ATaskManager(15)`)। एक बैकग्राउंड इंटरवल हर 60 सेकंड में समाप्त हो चुके टास्क हटाता है।

---

## टास्क जीवनचक्र

```
सबमिट किया गया → कार्यरत → पूर्ण
                        → विफल
                        → रद्द
```

- डिफ़ॉल्ट रूप से टास्क 5 मिनट बाद समाप्त हो जाते हैं ([टास्क TTL](#task-ttl) देखें)
- टर्मिनल स्थितियाँ: `completed`, `failed`, `cancelled`
- इवेंट लॉग प्रत्येक स्थिति परिवर्तन को ट्रैक करता है

---

## त्रुटि कोड

| कोड    | अर्थ                       |
| :----- | :------------------------- |
| -32700 | पार्स त्रुटि (अमान्य JSON) |
| -32600 | अमान्य अनुरोध / अनधिकृत    |
| -32601 | मेथड या स्किल नहीं मिली    |
| -32602 | अमान्य पैरामीटर            |
| -32603 | आंतरिक त्रुटि              |
| -32000 | A2A एंडपॉइंट अक्षम है      |

---

## इंटीग्रेशन उदाहरण

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
