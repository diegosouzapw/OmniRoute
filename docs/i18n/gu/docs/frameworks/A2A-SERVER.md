# OmniRoute A2A Server Documentation (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — એક બુદ્ધિશાળી રૂટિંગ એજન્ટ તરીકે OmniRoute

A2A સપાટીના બે સ્વરૂપો છે:

- `POST /a2a` પર **JSON-RPC 2.0** (પ્રમાણભૂત પ્રવેશ બિંદુ, `src/app/a2a/route.ts`માં વ્યાખ્યાયિત).
- ડૅશબોર્ડ અને ટૂલિંગ માટે `/api/a2a/*` હેઠળ **REST** (સ્થિતિ, ટાસ્ક સૂચિ, રદ કરવું).

ટાસ્કને `A2ATaskManager` દ્વારા ટ્રૅક કરવામાં આવે છે (`src/lib/a2a/taskManager.ts`, ડિફૉલ્ટ 5-મિનિટ TTL). કૌશલ્યોને `src/lib/a2a/taskExecution.ts`માં રહેલા `A2A_SKILL_HANDLERS` દ્વારા ડિસ્પૅચ કરવામાં આવે છે.

## એજન્ટ શોધ

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRouteની ક્ષમતાઓ, કૌશલ્યો અને પ્રમાણીકરણ જરૂરિયાતોનું વર્ણન કરતું Agent Card પરત કરે છે.

Agent Cardનું `version` ફીલ્ડ `process.env.npm_package_version`માંથી મેળવવામાં આવે છે (`src/app/.well-known/agent.json/route.ts:13` જુઓ), તેથી તે દરેક રિલીઝ વખતે `package.json` સાથે આપમેળે સિંક રહે છે.

---

## પ્રમાણીકરણ

બધી `/a2a` વિનંતીઓ માટે `Authorization` હેડર મારફતે API કી જરૂરી છે:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

જો સર્વર પર કોઈ API કી ગોઠવેલી ન હોય, તો પ્રમાણીકરણને બાયપાસ કરવામાં આવે છે.

## સક્ષમીકરણ

A2Aને **Endpoints → A2A** ટૉગલ દ્વારા નિયંત્રિત કરવામાં આવે છે અને તે ડિફૉલ્ટ રૂપે અક્ષમ હોય છે. અક્ષમ હોય ત્યારે,
`GET /api/a2a/status` દ્વારા `status: "disabled"` અને `online: false` રિપોર્ટ કરવામાં આવે છે; `POST /a2a` પરના JSON-RPC કૉલ્સ JSON-RPC ભૂલ કોડ `-32000` સાથે HTTP 503 પરત કરે છે.

---

## JSON-RPC 2.0 પદ્ધતિઓ

### `message/send` — સિંક્રોનસ એક્ઝિક્યુશન

કોઈ કૌશલ્યને સંદેશ મોકલે છે અને સંપૂર્ણ પ્રતિસાદની રાહ જુએ છે.

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

**પ્રતિસાદ:**

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

### `message/stream` — SSE સ્ટ્રીમિંગ

`message/send` જેવું જ છે, પરંતુ રીઅલ-ટાઇમ સ્ટ્રીમિંગ માટે Server-Sent Events પરત કરે છે.

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

**SSE ઇવેન્ટ્સ:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ટાસ્કની સ્થિતિ પૂછો

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ટાસ્ક રદ કરો

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ઉપલબ્ધ સ્કિલ્સ

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`માં જોડાયેલી 6 A2A સ્કિલ્સ ઉપલબ્ધ કરાવે છે. દરેક સ્કિલ મોડ્યુલ `src/lib/a2a/skills/`માં આવેલું છે.

| સ્કિલ             | ID                   | વર્ણન                                                                                                                                               | ટૅગ્સ                  | ઉદાહરણો                                     |
| :---------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- | :------------------------------------------ |
| સ્માર્ટ રાઉટિંગ   | `smart-routing`      | OmniRouteના કોમ્બો એન્જિન + સ્કોરિંગનો ઉપયોગ કરીને પ્રોમ્પ્ટને શ્રેષ્ઠ પ્રદાતા/કોમ્બો મારફતે રૂટ કરે છે                                             | રાઉટિંગ, પ્રદાતાઓ      | "આ પ્રોમ્પ્ટને શ્રેષ્ઠ મોડલ મારફતે રૂટ કરો" |
| ક્વોટા વ્યવસ્થાપન | `quota-management`   | દરેક પ્રદાતાની ક્વોટા સ્થિતિનો અહેવાલ આપે છે અને ક્યારે થ્રોટલ કરવું/બદલવું તે નક્કી કરવામાં કૉલર્સને મદદ કરે છે                                    | ક્વોટા, પ્રદાતાઓ       | "anthropic માટે ક્વોટા તપાસો"               |
| પ્રદાતા શોધ       | `provider-discovery` | ઇન્સ્ટોલ કરેલા પ્રદાતાઓને તેમની ક્ષમતાઓ, ફ્રી-ટિયર ફ્લૅગ્સ અને OAuth સ્થિતિ સાથે સૂચિબદ્ધ કરે છે                                                    | પ્રદાતાઓ, શોધ          | "કયા પ્રદાતાઓ ઉપલબ્ધ છે?"                   |
| ખર્ચ વિશ્લેષણ     | `cost-analysis`      | કૅટલૉગ + તાજેતરના વપરાશના આધારે વિનંતી/વાતચીતના ખર્ચનો અંદાજ લગાવે છે                                                                               | ખર્ચ, વપરાશ            | "આ વાતચીત માટે ખર્ચનો અંદાજ લગાવો"          |
| આરોગ્ય અહેવાલ     | `health-report`      | દરેક પ્રદાતા માટે સર્કિટ બ્રેકર, કૂલડાઉન અને લૉકઆઉટ સ્થિતિને એકત્રિત કરે છે                                                                         | આરોગ્ય, સ્થિતિસ્થાપકતા | "બધા પ્રદાતાઓની આરોગ્ય સ્થિતિ બતાવો"        |
| ક્ષમતાઓની સૂચિ    | `list-capabilities`  | સંદર્ભ ઇન્જેક્શન માટે raw SKILL.md URLs સાથે સંપૂર્ણ 45-એન્ટ્રી Agent Skills કૅટલૉગ (23 API + 21 CLI + 1 config)ને markdown કોષ્ટક તરીકે પરત કરે છે | કૅટલૉગ, શોધ, સ્કિલ્સ   | "OmniRouteની બધી ક્ષમતાઓની સૂચિ આપો"        |

> Agent Cardને લાઇવ 352-પ્રદાતા કૅટલૉગ સાથે સુસંગત રાખવું જોઈએ; પ્રદાતાઓની સંખ્યા અને ફ્રી/નો-ઑથ મેટાડેટા રનટાઇમ રજિસ્ટ્રીમાંથી મેળવવામાં આવે છે.

### `list-capabilities` સ્કિલની વિગતો

`list-capabilities` સ્કિલ એવા બાહ્ય એજન્ટ્સ માટે ખાસ ઉપયોગી છે, જેમને API કૉલ્સ મોકલતાં પહેલાં OmniRoute શું ઉપલબ્ધ કરાવે છે તે શોધવાની જરૂર હોય. તે સંરચિત markdown કોષ્ટક આર્ટિફેક્ટ પરત કરે છે:

```
| ID | નામ | શ્રેણી | ક્ષેત્ર | એન્ડપૉઇન્ટ્સ/કમાન્ડ્સ | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | ઑથ અને સેશન્સ | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

દરેક પંક્તિમાં `rawUrl` કૉલમ શામેલ હોય છે, જેથી એજન્ટ્સ તરત જ સંપૂર્ણ SKILL.md મેળવી શકે. `metadata.totalSkills` ફીલ્ડ કૅટલૉગના કદને પ્રતિબિંબિત કરે છે (આજે 45). અમલીકરણ: `src/lib/a2a/skills/listCapabilities.ts`. [AGENT-SKILLS.md](./AGENT-SKILLS.md) પણ જુઓ.

---

## REST API (સહાયક)

JSON-RPC એન્ડપોઇન્ટ `/a2a` પ્રમાણભૂત A2A પ્રવેશબિંદુ છે. નીચેના REST એન્ડપોઇન્ટ્સ ડૅશબોર્ડ્સ અને બાહ્ય ટૂલિંગ માટે સહાયક ઍક્સેસ પ્રદાન કરે છે:

| એન્ડપોઇન્ટ                   | પદ્ધતિ | વર્ણન                                                       | પ્રમાણીકરણ                                        |
| :--------------------------- | :----- | :---------------------------------------------------------- | :------------------------------------------------ |
| `/api/a2a/status`            | GET    | સર્વરની સ્થિતિ, નોંધાયેલ સ્કિલ્સ                            | (જાહેર)                                           |
| `/api/a2a/tasks`             | GET    | ફિલ્ટર્સ સાથે ટાસ્ક્સની યાદી                                | મેનેજમેન્ટ                                        |
| `/api/a2a/tasks/[id]`        | GET    | ID દ્વારા ટાસ્ક મેળવો                                       | મેનેજમેન્ટ                                        |
| `/api/a2a/tasks/[id]/cancel` | POST   | ચાલી રહેલો ટાસ્ક રદ કરો                                     | મેનેજમેન્ટ                                        |
| `/.well-known/agent.json`    | GET    | Agent Card (A2A શોધ)                                        | (જાહેર, 3600s માટે કૅશ કરેલું)                    |
| `/api/a2a/tasks`             | POST   | OmniConductor ફ્લીટને ઇનબાઉન્ડ ડેલિગેશન (Conductor PRD RF5) | Bearer વિરુદ્ધ `OMNIROUTE_API_KEY` + `a2aEnabled` |

**ઇનબાઉન્ડ Conductor ડેલિગેશન (`POST /api/a2a/tasks`):** બાહ્ય A2A એજન્ટ્સ OmniRoute મારફતે OmniConductor ફ્લીટને કોડિંગ કાર્ય સોંપે છે. બોડી: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — ફક્ત Conductor ફ્લીટ સ્કિલ્સ (Agent Card પર જાહેર કરેલી) જ સોંપી શકાય છે; `metadata.conductor.repo.url` આવશ્યક છે (ફ્લીટ git રિપોઝિટરીઝ પર કામ કરે છે). રૂટ સર્વર-સાઇડ `CONDUCTOR_ORCHESTRATOR_TOKEN` (ફૉલબૅક `CONDUCTOR_HUB_TOKEN`) નો ઉપયોગ કરીને તેને હબના `POST /v1/tasks` માં રૂપાંતરિત કરે છે અને `201 { conductor_task_id, state: "submitted" }` પરત કરે છે; ટાસ્કની સ્થિતિઓ SSE→A2A મિરર (RF1) મારફતે પાછી પ્રવાહિત થાય છે અને `GET /api/a2a/tasks?skill=conductor` દ્વારા જોઈ શકાય છે.

---

## નવી સ્કિલ ઉમેરવી

1. **સ્કિલ ફાઇલ બનાવો:** `src/lib/a2a/skills/<your-skill>.ts`

   `(task: A2ATask) => Promise<{ artifacts, metadata }>` અસિંક ફંક્શન એક્સપોર્ટ કરો. `smartRouting.ts` જેવી હાલની સ્કિલ્સનું માળખું અનુસરો.

2. **હૅન્ડલર નોંધાવો:** `src/lib/a2a/taskExecution.ts` માં, `A2A_SKILL_HANDLERS` માં એક એન્ટ્રી ઉમેરો:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...હાલની સ્કિલ્સ
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Agent Card માં પ્રદર્શિત કરો:** `src/app/.well-known/agent.json/route.ts` માં, `skills` ઍરેમાં ઉમેરો:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **ટેસ્ટ્સ લખો:** `tests/unit/a2a-<your-skill>.test.ts`. સફળ માર્ગ + ભૂલ માર્ગ આવરી લો.

5. આ ફાઇલના `Available Skills` કોષ્ટકમાં નવી સ્કિલનું **દસ્તાવેજીકરણ કરો**.

---

## ટાસ્ક TTL

ટાસ્ક `ttlMinutes` પછી સમાપ્ત થાય છે (ડિફૉલ્ટ 5 મિનિટ) — જે `src/lib/a2a/taskManager.ts:82` પરના `A2ATaskManager` કન્સ્ટ્રક્ટરમાં કૉન્ફિગર કરેલ છે. કસ્ટમાઇઝ કરવા માટે, `A2ATaskManager` ઇન્સ્ટેન્શિએશનને ફોર્ક કરો અને અલગ મૂલ્ય પાસ કરો (દા.ત., 15-મિનિટના TTL માટે `new A2ATaskManager(15)`). બૅકગ્રાઉન્ડ ઇન્ટરવલ દર 60 સેકન્ડે સમાપ્ત થયેલા ટાસ્ક દૂર કરે છે.

---

## ટાસ્ક જીવનચક્ર

```
સબમિટ થયેલ → કાર્યરત → પૂર્ણ
                      → નિષ્ફળ
                      → રદ
```

- ટાસ્ક ડિફૉલ્ટ રૂપે 5 મિનિટ પછી સમાપ્ત થાય છે ([ટાસ્ક TTL](#task-ttl) જુઓ)
- અંતિમ સ્થિતિઓ: `completed`, `failed`, `cancelled`
- ઇવેન્ટ લૉગ દરેક સ્થિતિ પરિવર્તનને ટ્રૅક કરે છે

---

## ભૂલ કોડ

| કોડ    | અર્થ                      |
| :----- | :------------------------ |
| -32700 | પાર્સ ભૂલ (અમાન્ય JSON)   |
| -32600 | અમાન્ય વિનંતી / અનધિકૃત   |
| -32601 | પદ્ધતિ અથવા સ્કિલ મળી નથી |
| -32602 | અમાન્ય પેરામીટર્સ         |
| -32603 | આંતરિક ભૂલ                |
| -32000 | A2A એન્ડપૉઇન્ટ અક્ષમ છે   |

---

## ઇન્ટિગ્રેશન ઉદાહરણો

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
