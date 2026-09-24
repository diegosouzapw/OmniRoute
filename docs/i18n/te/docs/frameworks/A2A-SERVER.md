# OmniRoute A2A Server Documentation (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — తెలివైన రూటింగ్ ఏజెంట్గా OmniRoute

A2A ఇంటర్ఫేస్కు రెండు రూపాలు ఉన్నాయి:

- **JSON-RPC 2.0** — `POST /a2a` వద్ద (ప్రామాణిక ప్రవేశ బిందువు, `src/app/a2a/route.ts`లో నిర్వచించబడింది).
- **REST** — డ్యాష్బోర్డ్లు మరియు సాధనాల కోసం `/api/a2a/*` కింద (స్థితి, టాస్క్ జాబితా, రద్దు).

టాస్క్లు `A2ATaskManager` ద్వారా ట్రాక్ చేయబడతాయి (`src/lib/a2a/taskManager.ts`, డిఫాల్ట్గా 5 నిమిషాల TTL). స్కిల్లు `src/lib/a2a/taskExecution.ts`లోని `A2A_SKILL_HANDLERS` ద్వారా పంపిణీ చేయబడతాయి.

## ఏజెంట్ డిస్కవరీ

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute సామర్థ్యాలు, స్కిల్లు మరియు ప్రమాణీకరణ అవసరాలను వివరించే Agent Cardను తిరిగి అందిస్తుంది.

Agent Cardలోని `version` ఫీల్డ్ `process.env.npm_package_version` నుండి తీసుకోబడుతుంది (`src/app/.well-known/agent.json/route.ts:13` చూడండి), కాబట్టి ప్రతి విడుదలలోనూ అది `package.json`తో స్వయంచాలకంగా సమకాలీకరించబడి ఉంటుంది.

---

## ప్రమాణీకరణ

అన్ని `/a2a` అభ్యర్థనలకు `Authorization` హెడర్ ద్వారా API కీ అవసరం:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

సర్వర్లో API కీ కాన్ఫిగర్ చేయకపోతే, ప్రమాణీకరణ దాటవేయబడుతుంది.

## ప్రారంభించడం

A2A అనేది **Endpoints → A2A** టాగుల్ ద్వారా నియంత్రించబడుతుంది మరియు డిఫాల్ట్గా నిలిపివేయబడి ఉంటుంది. ఇది నిలిపివేయబడినప్పుడు,
`GET /api/a2a/status` అనేది `status: "disabled"` మరియు `online: false`గా నివేదిస్తుంది; `POST /a2a`కు చేసే JSON-RPC కాల్లు
JSON-RPC ఎర్రర్ కోడ్ `-32000`తో HTTP 503ను తిరిగి అందిస్తాయి.

---

## JSON-RPC 2.0 పద్ధతులు

### `message/send` — సమకాలిక అమలు

ఒక స్కిల్కు సందేశాన్ని పంపి, పూర్తి ప్రతిస్పందన కోసం వేచి ఉంటుంది.

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

**ప్రతిస్పందన:**

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

### `message/stream` — SSE స్ట్రీమింగ్

`message/send` మాదిరిగానే ఉంటుంది, కానీ రియల్-టైమ్ స్ట్రీమింగ్ కోసం Server-Sent Eventsను తిరిగి అందిస్తుంది.

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

**SSE ఈవెంట్లు:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — టాస్క్ స్థితిని ప్రశ్నించడం

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — టాస్క్ను రద్దు చేయడం

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## అందుబాటులో ఉన్న నైపుణ్యాలు

`src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`లో అనుసంధానించబడిన 6 A2A నైపుణ్యాలను OmniRoute అందిస్తుంది. ప్రతి నైపుణ్య మాడ్యూల్ `src/lib/a2a/skills/`లో ఉంటుంది.

| నైపుణ్యం                  | ID                   | వివరణ                                                                                                                                              | ట్యాగ్లు                     | ఉదాహరణలు                                           |
| :------------------------ | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- | :------------------------------------------------- |
| స్మార్ట్ రూటింగ్          | `smart-routing`      | OmniRoute కాంబో ఇంజిన్ + స్కోరింగ్ను ఉపయోగించి ప్రాంప్ట్ను అత్యుత్తమ ప్రొవైడర్/కాంబో ద్వారా రూట్ చేస్తుంది                                         | రూటింగ్, ప్రొవైడర్లు         | "ఈ ప్రాంప్ట్ను అత్యుత్తమ మోడల్ ద్వారా రూట్ చేయండి" |
| కోటా నిర్వహణ              | `quota-management`   | ప్రతి ప్రొవైడర్కు సంబంధించిన కోటా స్థితిని నివేదిస్తుంది, ఎప్పుడు థ్రాటిల్ చేయాలో/మారాలో నిర్ణయించడంలో కాలర్లకు సహాయపడుతుంది                       | కోటా, ప్రొవైడర్లు            | "anthropic కోసం కోటాను తనిఖీ చేయండి"               |
| ప్రొవైడర్ అన్వేషణ         | `provider-discovery` | ఇన్స్టాల్ చేసిన ప్రొవైడర్లను వాటి సామర్థ్యాలు, ఉచిత-టియర్ ఫ్లాగ్లు, OAuth స్థితితో సహా జాబితా చేస్తుంది                                            | ప్రొవైడర్లు, అన్వేషణ         | "ఏ ప్రొవైడర్లు అందుబాటులో ఉన్నాయి?"                |
| ఖర్చు విశ్లేషణ            | `cost-analysis`      | కేటలాగ్ + ఇటీవలి వినియోగం ఆధారంగా అభ్యర్థన/సంభాషణ ఖర్చును అంచనా వేస్తుంది                                                                          | ఖర్చు, వినియోగం              | "ఈ సంభాషణకు అయ్యే ఖర్చును అంచనా వేయండి"            |
| ఆరోగ్య నివేదిక            | `health-report`      | ప్రతి ప్రొవైడర్కు సంబంధించిన సర్క్యూట్ బ్రేకర్, కూల్డౌన్, లాకౌట్ స్థితిని సమగ్రపరుస్తుంది                                                          | ఆరోగ్యం, స్థితిస్థాపకత       | "అన్ని ప్రొవైడర్ల ఆరోగ్య స్థితిని చూపండి"          |
| సామర్థ్యాలను జాబితా చేయడం | `list-capabilities`  | సందర్భ ఇంజెక్షన్ కోసం ముడి SKILL.md URLలతో పూర్తి 45-ఎంట్రీల Agent Skills కేటలాగ్ను (23 API + 21 CLI + 1 కాన్ఫిగ్) మార్క్డౌన్ పట్టికగా అందిస్తుంది | కేటలాగ్, అన్వేషణ, నైపుణ్యాలు | "OmniRoute సామర్థ్యాలన్నింటినీ జాబితా చేయండి"      |

> Agent Cardను లైవ్ 352-ప్రొవైడర్ కేటలాగ్తో సమలేఖనంలో ఉంచాలి; ప్రొవైడర్ సంఖ్యలు మరియు ఉచిత/ప్రామాణీకరణ-అవసరం-లేని మెటాడేటా రన్టైమ్ రిజిస్ట్రీ నుండి తీసుకోబడతాయి.

### `list-capabilities` నైపుణ్య వివరాలు

API కాల్లను పంపే ముందు OmniRoute ఏమి అందిస్తుందో తెలుసుకోవాల్సిన బాహ్య ఏజెంట్లకు `list-capabilities` నైపుణ్యం ప్రత్యేకంగా ఉపయోగపడుతుంది. ఇది నిర్మాణాత్మక మార్క్డౌన్ పట్టిక ఆర్టిఫాక్ట్ను అందిస్తుంది:

```
| ID | పేరు | వర్గం | విభాగం | ఎండ్పాయింట్లు/కమాండ్లు | ముడి URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | ప్రామాణీకరణ & సెషన్లు | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

ప్రతి వరుసలో `rawUrl` కాలమ్ ఉంటుంది, కాబట్టి ఏజెంట్లు పూర్తి SKILL.mdను వెంటనే పొందవచ్చు. `metadata.totalSkills` ఫీల్డ్ కేటలాగ్ పరిమాణాన్ని ప్రతిబింబిస్తుంది (ప్రస్తుతం 45). అమలు: `src/lib/a2a/skills/listCapabilities.ts`. [AGENT-SKILLS.md](./AGENT-SKILLS.md) కూడా చూడండి.

---

## REST API (సహాయక)

JSON-RPC ఎండ్పాయింట్ `/a2a` ప్రామాణిక A2A ప్రవేశ బిందువు. దిగువన ఉన్న REST ఎండ్పాయింట్లు డ్యాష్బోర్డ్లు మరియు బాహ్య సాధనాల కోసం సహాయక ప్రాప్యతను అందిస్తాయి:

| ఎండ్పాయింట్                  | పద్ధతి | వివరణ                                                         | ప్రమాణీకరణ                                        |
| :--------------------------- | :----- | :------------------------------------------------------------ | :------------------------------------------------ |
| `/api/a2a/status`            | GET    | సర్వర్ స్థితి, నమోదైన నైపుణ్యాలు                              | (పబ్లిక్)                                         |
| `/api/a2a/tasks`             | GET    | ఫిల్టర్లతో టాస్క్లను జాబితా చేయడం                             | నిర్వహణ                                           |
| `/api/a2a/tasks/[id]`        | GET    | ID ద్వారా టాస్క్ను పొందడం                                     | నిర్వహణ                                           |
| `/api/a2a/tasks/[id]/cancel` | POST   | అమలవుతున్న టాస్క్ను రద్దు చేయడం                               | నిర్వహణ                                           |
| `/.well-known/agent.json`    | GET    | Agent Card (A2A డిస్కవరీ)                                     | (పబ్లిక్, 3600s పాటు క్యాష్ చేయబడింది)            |
| `/api/a2a/tasks`             | POST   | OmniConductor ఫ్లీట్కు ఇన్బౌండ్ డెలిగేషన్ (Conductor PRD RF5) | Bearer వర్సెస్ `OMNIROUTE_API_KEY` + `a2aEnabled` |

**ఇన్బౌండ్ Conductor డెలిగేషన్ (`POST /api/a2a/tasks`):** బాహ్య A2A ఏజెంట్లు OmniRoute ద్వారా కోడింగ్ పనిని OmniConductor ఫ్లీట్కు అప్పగిస్తాయి. బాడీ: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — Conductor ఫ్లీట్ నైపుణ్యాలను మాత్రమే (Agent Cardలో ప్రకటించినవి) అప్పగించవచ్చు; `metadata.conductor.repo.url` తప్పనిసరి (ఫ్లీట్ git రిపోజిటరీలపై పనిచేస్తుంది). ఈ రూట్, సర్వర్-సైడ్ `CONDUCTOR_ORCHESTRATOR_TOKEN`ను (ఫాల్బ్యాక్ `CONDUCTOR_HUB_TOKEN`) ఉపయోగించి హబ్ యొక్క `POST /v1/tasks`గా అనువదించి, `201 { conductor_task_id, state: "submitted" }`ను తిరిగి ఇస్తుంది; టాస్క్ స్థితులు SSE→A2A మిర్రర్ (RF1) ద్వారా తిరిగి ప్రవహిస్తాయి మరియు `GET /api/a2a/tasks?skill=conductor` ద్వారా కనిపిస్తాయి.

---

## కొత్త నైపుణ్యాన్ని జోడించడం

1. **నైపుణ్య ఫైల్ను సృష్టించండి:** `src/lib/a2a/skills/<your-skill>.ts`

   `(task: A2ATask) => Promise<{ artifacts, metadata }>` అనే async ఫంక్షన్ను ఎగుమతి చేయండి. `smartRouting.ts` వంటి ఇప్పటికే ఉన్న నైపుణ్యాల నిర్మాణాన్ని అనుసరించండి.

2. **హ్యాండ్లర్ను నమోదు చేయండి:** `src/lib/a2a/taskExecution.ts`లో, `A2A_SKILL_HANDLERS`కు ఒక ఎంట్రీని జోడించండి:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...ఇప్పటికే ఉన్న నైపుణ్యాలు
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Agent Cardలో అందుబాటులో ఉంచండి:** `src/app/.well-known/agent.json/route.ts`లో, `skills` అర్రేకు జోడించండి:

   ```json
   {
     "id": "your-skill",
     "name": "మీ నైపుణ్యం",
     "description": "సంక్షిప్తమైన, ఉద్దేశ్య-కేంద్రీకృత వివరణ",
     "tags": ["routing", "quota"],
     "examples": ["సహజ భాషలో నమూనా ఆహ్వానం"]
   }
   ```

4. **పరీక్షలు రాయండి:** `tests/unit/a2a-<your-skill>.test.ts`. విజయవంతమైన మార్గం + దోష మార్గాన్ని కవర్ చేయండి.

5. ఈ ఫైల్లోని `Available Skills` పట్టికలో కొత్త నైపుణ్యాన్ని **డాక్యుమెంట్ చేయండి**.

---

## టాస్క్ TTL

టాస్క్లు `ttlMinutes` తర్వాత గడువు ముగుస్తాయి (డిఫాల్ట్గా 5 నిమిషాలు) — ఇది `src/lib/a2a/taskManager.ts:82` వద్ద ఉన్న `A2ATaskManager` కన్స్ట్రక్టర్లో కాన్ఫిగర్ చేయబడింది. అనుకూలీకరించడానికి, `A2ATaskManager` ఇన్స్టాన్షియేషన్ను ఫోర్క్ చేసి వేరే విలువను పాస్ చేయండి (ఉదా., 15 నిమిషాల TTL కోసం `new A2ATaskManager(15)`). బ్యాక్గ్రౌండ్ ఇంటర్వల్ ప్రతి 60 సెకన్లకు గడువు ముగిసిన టాస్క్లను తొలగిస్తుంది.

---

## టాస్క్ జీవితచక్రం

```
సమర్పించబడింది → పని జరుగుతోంది → పూర్తయింది
                                  → విఫలమైంది
                                  → రద్దయింది
```

- టాస్క్లు డిఫాల్ట్గా 5 నిమిషాల తర్వాత గడువు ముగుస్తాయి ([టాస్క్ TTL](#task-ttl) చూడండి)
- తుది స్థితులు: `completed`, `failed`, `cancelled`
- ఈవెంట్ లాగ్ ప్రతి స్థితి మార్పును ట్రాక్ చేస్తుంది

---

## ఎర్రర్ కోడ్లు

| కోడ్   | అర్థం                           |
| :----- | :------------------------------ |
| -32700 | పార్స్ ఎర్రర్ (చెల్లని JSON)    |
| -32600 | చెల్లని అభ్యర్థన / అనధికారికం   |
| -32601 | మెథడ్ లేదా స్కిల్ కనుగొనబడలేదు  |
| -32602 | చెల్లని పారామీటర్లు             |
| -32603 | అంతర్గత ఎర్రర్                  |
| -32000 | A2A ఎండ్పాయింట్ నిలిపివేయబడింది |

---

## ఇంటిగ్రేషన్ ఉదాహరణలు

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
