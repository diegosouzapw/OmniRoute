# OmniRoute A2A Server Documentation (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute እንደ ብልህ የማዘዋወሪያ ወኪል

የA2A በይነገጽ ሁለት ገጽታዎች አሉት፦

- **JSON-RPC 2.0** በ`POST /a2a` (ዋናው መግቢያ ነጥብ፣ በ`src/app/a2a/route.ts` የተገለጸ)።
- **REST** በ`/api/a2a/*` ስር፣ ለዳሽቦርዶች እና መሣሪያዎች (ሁኔታ፣ የተግባር ዝርዝር፣ ስረዛ)።

ተግባራት በ`A2ATaskManager` (`src/lib/a2a/taskManager.ts`፣ ነባሪ የ5 ደቂቃ TTL) ይከታተላሉ። ክህሎቶች በ`src/lib/a2a/taskExecution.ts` ውስጥ ባለው `A2A_SKILL_HANDLERS` በኩል ይመደባሉ።

## የኤጀንት ፍለጋ

```bash
curl http://localhost:20128/.well-known/agent.json
```

የOmniRouteን ችሎታዎች፣ ክህሎቶች እና የማረጋገጫ መስፈርቶች የሚገልጸውን የኤጀንት ካርድ ይመልሳል።

የኤጀንት ካርዱ `version` መስክ ከ`process.env.npm_package_version` የሚወሰድ በመሆኑ (`src/app/.well-known/agent.json/route.ts:13`ን ይመልከቱ)፣ በእያንዳንዱ ልቀት ከ`package.json` ጋር በራስ-ሰር ተመሳስሎ ይቆያል።

---

## ማረጋገጫ

ሁሉም የ`/a2a` ጥያቄዎች በ`Authorization` ራስጌ በኩል API ቁልፍ ይፈልጋሉ፦

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

በአገልጋዩ ላይ ምንም API ቁልፍ ካልተዋቀረ፣ ማረጋገጫው ይታለፋል።

## ማንቃት

A2A በ**Endpoints → A2A** መቀያየሪያ የሚቆጣጠር ሲሆን በነባሪነት የተሰናከለ ነው። ሲሰናከል፣
`GET /api/a2a/status` `status: "disabled"` እና `online: false` እንደሆነ ሪፖርት ያደርጋል፤ ወደ
`POST /a2a` የሚደረጉ የJSON-RPC ጥሪዎች HTTP 503ን ከJSON-RPC ስህተት ኮድ `-32000` ጋር ይመልሳሉ።

---

## የJSON-RPC 2.0 ስልቶች

### `message/send` — የተመሳሰለ አፈጻጸም

መልዕክትን ወደ ክህሎት ይልካል እና ሙሉውን ምላሽ ይጠብቃል።

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

**ምላሽ፦**

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

### `message/stream` — የSSE ዥረት ማስተላለፍ

ከ`message/send` ጋር ተመሳሳይ ነው፣ ነገር ግን ለቅጽበታዊ ዥረት ማስተላለፍ በአገልጋይ የሚላኩ ክስተቶችን ይመልሳል።

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

**የSSE ክስተቶች፦**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — የተግባር ሁኔታን መጠየቅ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ተግባርን መሰረዝ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## የሚገኙ ክህሎቶች

OmniRoute በ`src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` ውስጥ የተገናኙ 6 A2A ክህሎቶችን ያቀርባል። እያንዳንዱ የክህሎት ሞጁል በ`src/lib/a2a/skills/` ውስጥ ይገኛል።

| ክህሎት         | ID                   | መግለጫ                                                                                                                      | መለያዎች            | ምሳሌዎች                        |
| :----------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------ | :--------------- | :--------------------------- |
| ብልህ ማዘዋወር    | `smart-routing`      | የOmniRouteን ጥምር ሞተር + የውጤት አሰጣጥ በመጠቀም ጥያቄን በተመቻቸው አቅራቢ/ጥምር በኩል ያዘዋውራል                                                     | ማዘዋወር፣ አቅራቢዎች    | "ይህን ጥያቄ በምርጡ ሞዴል በኩል አዘዋውር" |
| የኮታ አስተዳደር   | `quota-management`   | የእያንዳንዱን አቅራቢ የኮታ ሁኔታ ሪፖርት ያደርጋል፤ ጠሪዎች መቼ ፍጥነትን መገደብ/መቀየር እንዳለባቸው እንዲወስኑ ይረዳል                                             | ኮታ፣ አቅራቢዎች       | "የanthropicን ኮታ ፈትሽ"         |
| የአቅራቢ ግኝት    | `provider-discovery` | የተጫኑ አቅራቢዎችን ከችሎታዎቻቸው፣ የነፃ ደረጃ ጠቋሚዎቻቸው እና የOAuth ሁኔታቸው ጋር ይዘረዝራል                                                          | አቅራቢዎች፣ ግኝት      | "ምን አቅራቢዎች ይገኛሉ?"            |
| የወጪ ትንተና     | `cost-analysis`      | ካታሎጉን + የቅርብ ጊዜ አጠቃቀምን በመጠቀም የጥያቄ/ውይይት ወጪን ይገምታል                                                                          | ወጪ፣ አጠቃቀም        | "የዚህን ውይይት ወጪ ገምት"           |
| የጤና ሪፖርት     | `health-report`      | ለእያንዳንዱ አቅራቢ የወረዳ ሰባሪ፣ የማቀዝቀዣ ጊዜ እና የመቆለፍ ሁኔታን ያጠቃልላል                                                                     | ጤና፣ የመቋቋም ችሎታ    | "የሁሉንም አቅራቢዎች የጤና ሁኔታ አሳይ"   |
| ችሎታዎችን መዘርዘር | `list-capabilities`  | ሙሉውን 45-ግቤት ያለውን የAgent Skills ካታሎግ (23 API + 21 CLI + 1 config) ለዐውድ ማስገባት ከጥሬ SKILL.md URLs ጋር እንደ markdown ሰንጠረዥ ይመልሳል | ካታሎግ፣ ግኝት፣ ክህሎቶች | "ሁሉንም የOmniRoute ችሎታዎች ዘርዝር" |

> Agent Card ከቀጥታው 352-አቅራቢ ካታሎግ ጋር የተጣጣመ መሆን አለበት፤ የአቅራቢዎች ብዛት እና የነፃ/ማረጋገጫ-የማይፈልግ ሜታዳታ ከruntime registry ይገኛሉ።

### የ`list-capabilities` ክህሎት ዝርዝር

የ`list-capabilities` ክህሎት፣ API ጥሪዎችን ከመላካቸው በፊት OmniRoute ምን እንደሚያቀርብ ማወቅ ለሚፈልጉ ውጫዊ ወኪሎች በተለይ ጠቃሚ ነው። የተዋቀረ የmarkdown ሰንጠረዥ አርቲፋክት ይመልሳል፦

```
| ID | ስም | ምድብ | አካባቢ | Endpoints/Commands | ጥሬ URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | ማረጋገጫ እና ክፍለ-ጊዜዎች | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

እያንዳንዱ ረድፍ የ`rawUrl` ዓምድን ያካትታል፣ ስለዚህ ወኪሎች ሙሉውን SKILL.md ወዲያውኑ ማምጣት ይችላሉ። የ`metadata.totalSkills` መስክ የካታሎጉን መጠን (ዛሬ 45) ያንጸባርቃል። አተገባበር፦ `src/lib/a2a/skills/listCapabilities.ts`። እንዲሁም [AGENT-SKILLS.md](./AGENT-SKILLS.md)ን ይመልከቱ።

---

## REST API (ረዳት)

የJSON-RPC መገናኛ ነጥብ `/a2a` መደበኛው የA2A መግቢያ ነጥብ ነው። ከታች ያሉት የREST መገናኛ ነጥቦች ለዳሽቦርዶች እና ለውጫዊ መሣሪያዎች ረዳት መዳረሻ ይሰጣሉ፦

| መገናኛ ነጥብ                     | ዘዴ   | መግለጫ                                               | ማረጋገጫ                                         |
| :--------------------------- | :--- | :------------------------------------------------- | :-------------------------------------------- |
| `/api/a2a/status`            | GET  | የአገልጋይ ሁኔታ፣ የተመዘገቡ ክህሎቶች                           | (ይፋዊ)                                         |
| `/api/a2a/tasks`             | GET  | ተግባራትን ከማጣሪያዎች ጋር ዘርዝር                             | አስተዳደር                                        |
| `/api/a2a/tasks/[id]`        | GET  | ተግባርን በID አግኝ                                      | አስተዳደር                                        |
| `/api/a2a/tasks/[id]/cancel` | POST | እየተከናወነ ያለን ተግባር ሰርዝ                               | አስተዳደር                                        |
| `/.well-known/agent.json`    | GET  | የወኪል ካርድ (የA2A ግኝት)                                | (ይፋዊ፣ ለ3600s የተሸጎጠ)                           |
| `/api/a2a/tasks`             | POST | ወደ OmniConductor ቡድን የሚገባ ውክልና (Conductor PRD RF5) | Bearer ከ`OMNIROUTE_API_KEY` + `a2aEnabled` ጋር |

**ወደ Conductor የሚገባ ውክልና (`POST /api/a2a/tasks`)፦** ውጫዊ የA2A ወኪሎች በOmniRoute በኩል የኮድ ሥራን ለOmniConductor ቡድን ይወክላሉ። የጥያቄ አካል፦ `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — ውክልና ሊሰጥባቸው የሚችሉት የConductor ቡድን ክህሎቶች ብቻ ናቸው (በወኪል ካርዱ ላይ የታወጁት)፤ `metadata.conductor.repo.url` ያስፈልጋል (ቡድኑ በgit repos ላይ ይሠራል)። መንገዱ በአገልጋይ በኩል ያለውን `CONDUCTOR_ORCHESTRATOR_TOKEN` (ተተኪ፦ `CONDUCTOR_HUB_TOKEN`) በመጠቀም ወደ hub `POST /v1/tasks` ይተረጉማል እና `201 { conductor_task_id, state: "submitted" }` ይመልሳል፤ የተግባር ሁኔታዎች በSSE→A2A መስታወት (RF1) በኩል ወደኋላ ይፈሳሉ፣ እንዲሁም በ`GET /api/a2a/tasks?skill=conductor` በኩል ሊታዩ ይችላሉ።

---

## አዲስ ክህሎት ማከል

1. **የክህሎት ፋይል ይፍጠሩ፦** `src/lib/a2a/skills/<your-skill>.ts`

   async function `(task: A2ATask) => Promise<{ artifacts, metadata }>` ወደ ውጭ ይላኩ። እንደ `smartRouting.ts` ያሉ ነባር ክህሎቶችን ቅርጽ ይከተሉ።

2. **መቆጣጠሪያውን ይመዝግቡ፦** በ`src/lib/a2a/taskExecution.ts` ውስጥ ወደ `A2A_SKILL_HANDLERS` ግቤት ያክሉ፦

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...ነባር ክህሎቶች
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **በወኪል ካርድ ላይ ያጋልጡ፦** በ`src/app/.well-known/agent.json/route.ts` ውስጥ ወደ `skills` ድርድር ያክሉ፦

   ```json
   {
     "id": "your-skill",
     "name": "የእርስዎ ክህሎት",
     "description": "አጭር፣ በዓላማ ላይ ያተኮረ መግለጫ",
     "tags": ["routing", "quota"],
     "examples": ["የተፈጥሮ ቋንቋ ጥሪ ምሳሌ"]
   }
   ```

4. **ሙከራዎችን ይጻፉ፦** `tests/unit/a2a-<your-skill>.test.ts`። የተሳካ መንገድን + የስህተት መንገድን ይሸፍኑ።

5. አዲሱን ክህሎት በዚህ ፋይል `Available Skills` ሰንጠረዥ ውስጥ **ይመዝግቡ**።

---

## የተግባር TTL

ተግባራት ከ`ttlMinutes` በኋላ (ነባሪው 5 ደቂቃ) ጊዜያቸው ያልፋል — ይህም በ`src/lib/a2a/taskManager.ts:82` ላይ ባለው የ`A2ATaskManager` constructor ውስጥ ተዋቅሯል። ለማበጀት የ`A2ATaskManager` instantiationን fork በማድረግ የተለየ እሴት ያስተላልፉ (ለምሳሌ፣ ለ15 ደቂቃ TTL `new A2ATaskManager(15)`)። አንድ የጀርባ interval በየ60 ሰከንዱ ጊዜያቸው ያለፉ ተግባራትን ያጸዳል።

---

## የተግባር የሕይወት ዑደት

```
ገብቷል → በሂደት ላይ → ተጠናቋል
                       → አልተሳካም
                       → ተሰርዟል
```

- ተግባራት በነባሪ ከ5 ደቂቃ በኋላ ጊዜያቸው ያልፋል ([የተግባር TTL](#task-ttl)ን ይመልከቱ)
- የመጨረሻ ሁኔታዎች፦ `completed`፣ `failed`፣ `cancelled`
- የክስተት መዝገቡ እያንዳንዱን የሁኔታ ሽግግር ይከታተላል

---

## የስህተት ኮዶች

| ኮድ     | ትርጉም                       |
| :----- | :------------------------- |
| -32700 | የመተንተን ስህተት (ልክ ያልሆነ JSON) |
| -32600 | ልክ ያልሆነ ጥያቄ / ያልተፈቀደ       |
| -32601 | ዘዴው ወይም ክህሎቱ አልተገኘም        |
| -32602 | ልክ ያልሆኑ መለኪያዎች             |
| -32603 | ውስጣዊ ስህተት                  |
| -32000 | የA2A endpoint ተሰናክሏል       |

---

## የውህደት ምሳሌዎች

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
