# OmniRoute A2A Server Documentation (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Itifaki ya Agent-to-Agent v0.3 — OmniRoute kama wakala mahiri wa uelekezaji

Kiolesura cha A2A kina pande mbili:

- **JSON-RPC 2.0** katika `POST /a2a` (sehemu rasmi ya kuingilia, iliyofafanuliwa katika `src/app/a2a/route.ts`).
- **REST** chini ya `/api/a2a/*` kwa ajili ya dashibodi na zana (hali, orodha ya kazi, kughairi).

Kazi hufuatiliwa na `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL chaguomsingi ya dakika 5). Ujuzi husambazwa kupitia `A2A_SKILL_HANDLERS` katika `src/lib/a2a/taskExecution.ts`.

## Ugunduzi wa Wakala

```bash
curl http://localhost:20128/.well-known/agent.json
```

Hurejesha Kadi ya Wakala inayoeleza uwezo, ujuzi na mahitaji ya uthibitishaji ya OmniRoute.

Sehemu ya `version` ya Kadi ya Wakala hupata thamani kutoka `process.env.npm_package_version` (angalia `src/app/.well-known/agent.json/route.ts:13`), hivyo huendelea kusawazishwa kiotomatiki na `package.json` katika kila toleo.

---

## Uthibitishaji

Maombi yote ya `/a2a` yanahitaji ufunguo wa API kupitia kichwa cha `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Ikiwa hakuna ufunguo wa API uliosanidiwa kwenye seva, uthibitishaji hurukwa.

## Uwezeshaji

A2A inadhibitiwa na kigeuzi cha **Endpoints → A2A** na imezimwa kwa chaguomsingi. Inapokuwa imezimwa,
`GET /api/a2a/status` huripoti `status: "disabled"` na `online: false`; miito ya JSON-RPC kwenda
`POST /a2a` hurejesha HTTP 503 ikiwa na msimbo wa hitilafu wa JSON-RPC `-32000`.

---

## Mbinu za JSON-RPC 2.0

### `message/send` — Utekelezaji Sawia

Hutuma ujumbe kwa ujuzi na kusubiri jibu kamili.

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

**Jibu:**

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

### `message/stream` — Utiririshaji wa SSE

Ni sawa na `message/send`, lakini hurejesha Matukio Yanayotumwa na Seva kwa ajili ya utiririshaji wa wakati halisi.

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

**Matukio ya SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Kuuliza Hali ya Kazi

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Kughairi Kazi

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Ujuzi Unaopatikana

OmniRoute hutoa ujuzi 6 wa A2A uliounganishwa katika `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Kila moduli ya ujuzi inapatikana katika `src/lib/a2a/skills/`.

| Ujuzi                    | ID                   | Maelezo                                                                                                                                                                                   | Lebo                      | Mifano                                      |
| :----------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------ | :------------------------------------------ |
| Uelekezaji Mahiri        | `smart-routing`      | Huelekeza kidokezo kupitia mtoa huduma/mchanganyiko bora kwa kutumia injini ya michanganyiko ya OmniRoute pamoja na mfumo wa utoaji alama                                                 | uelekezaji, watoa huduma  | "Elekeza kidokezo hiki kupitia modeli bora" |
| Usimamizi wa Kiwango     | `quota-management`   | Hutoa ripoti ya hali ya kiwango kwa kila mtoa huduma na huwasaidia waitaji kuamua wakati wa kupunguza kasi/kubadilisha                                                                    | kiwango, watoa huduma     | "Kagua kiwango cha anthropic"               |
| Ugunduzi wa Watoa Huduma | `provider-discovery` | Huorodhesha watoa huduma waliosakinishwa pamoja na uwezo wao, viashiria vya kiwango kisicholipishwa na hali ya OAuth                                                                      | watoa huduma, ugunduzi    | "Ni watoa huduma gani wanaopatikana?"       |
| Uchambuzi wa Gharama     | `cost-analysis`      | Hukadiria gharama ya ombi/mazungumzo kwa kuzingatia katalogi pamoja na matumizi ya hivi karibuni                                                                                          | gharama, matumizi         | "Kadiria gharama ya mazungumzo haya"        |
| Ripoti ya Afya           | `health-report`      | Hukusanya hali ya kivunja mzunguko, kipindi cha kusubiri na kufungiwa kwa kila mtoa huduma                                                                                                | afya, ustahimilivu        | "Onyesha hali ya afya ya watoa huduma wote" |
| Orodhesha Uwezo          | `list-capabilities`  | Hurejesha katalogi kamili ya Agent Skills yenye vipengee 45 (23 vya API + 21 vya CLI + 1 cha usanidi) kama jedwali la markdown lenye URL ghafi za SKILL.md kwa ajili ya kuingiza muktadha | katalogi, ugunduzi, ujuzi | "Orodhesha uwezo wote wa OmniRoute"         |

> Agent Card inapaswa kusawazishwa na katalogi inayotumika ya watoa huduma 352; idadi ya watoa huduma na metadata ya bila malipo/bila uthibitishaji hutolewa kutoka kwenye sajili ya wakati wa utekelezaji.

### Maelezo ya Ujuzi wa `list-capabilities`

Ujuzi wa `list-capabilities` ni muhimu hasa kwa mawakala wa nje wanaohitaji kugundua kile ambacho OmniRoute hutoa kabla ya kutuma miito ya API. Hurejesha artefakti ya jedwali la markdown lililopangwa:

```
| ID | Jina | Kategoria | Eneo | Vituo/Amri | URL Ghafi |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Uthibitishaji na Vipindi | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Kila safu inajumuisha safu wima ya `rawUrl` ili mawakala waweze kupakua SKILL.md kamili mara moja. Sehemu ya `metadata.totalSkills` huakisi ukubwa wa katalogi (45 kwa sasa). Utekelezaji: `src/lib/a2a/skills/listCapabilities.ts`. Tazama pia [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (saidizi)

Endpointi ya JSON-RPC `/a2a` ndiyo sehemu rasmi ya kuingilia ya A2A. Endpointi za REST zilizo hapa chini hutoa ufikiaji saidizi kwa dashibodi na zana za nje:

| Endpointi                    | Mbinu | Maelezo                                                                   | Uthibitishaji                                      |
| :--------------------------- | :---- | :------------------------------------------------------------------------ | :------------------------------------------------- |
| `/api/a2a/status`            | GET   | Hali ya seva, ujuzi uliosajiliwa                                          | (ya umma)                                          |
| `/api/a2a/tasks`             | GET   | Orodhesha kazi kwa kutumia vichujio                                       | usimamizi                                          |
| `/api/a2a/tasks/[id]`        | GET   | Pata kazi kwa ID                                                          | usimamizi                                          |
| `/api/a2a/tasks/[id]/cancel` | POST  | Ghairi kazi inayoendelea                                                  | usimamizi                                          |
| `/.well-known/agent.json`    | GET   | Kadi ya Wakala (ugunduzi wa A2A)                                          | (ya umma, imehifadhiwa kwa 3600s)                  |
| `/api/a2a/tasks`             | POST  | Ukabidhi wa kazi unaoingia kwa kundi la OmniConductor (Conductor PRD RF5) | Bearer dhidi ya `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Ukabidhi wa Conductor unaoingia (`POST /api/a2a/tasks`):** mawakala wa nje wa A2A hukabidhi kazi za uandishi wa msimbo kwa kundi la OmniConductor kupitia OmniRoute. Mwili: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — ni ujuzi wa kundi la Conductor pekee (ule uliotangazwa kwenye Kadi ya Wakala) unaoweza kukabidhiwa; `metadata.conductor.repo.url` inahitajika (kundi hufanya kazi kwenye hazina za git). Njia hiyo hutafsiriwa kuwa `POST /v1/tasks` ya kitovu kwa kutumia `CONDUCTOR_ORCHESTRATOR_TOKEN` ya upande wa seva (ikitumika `CONDUCTOR_HUB_TOKEN` kama mbadala) na kurejesha `201 { conductor_task_id, state: "submitted" }`; hali za kazi hurudishwa kupitia kioo cha SSE→A2A (RF1) na zinaonekana kupitia `GET /api/a2a/tasks?skill=conductor`.

---

## Kuongeza Ujuzi Mpya

1. **Unda faili la ujuzi:** `src/lib/a2a/skills/<your-skill>.ts`

   Hamisha nje fungsi ya async `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Fuata muundo wa ujuzi uliopo kama vile `smartRouting.ts`.

2. **Sajili kishughulikiaji:** katika `src/lib/a2a/taskExecution.ts`, ongeza ingizo kwenye `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...ujuzi uliopo
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Onyesha kwenye Kadi ya Wakala:** katika `src/app/.well-known/agent.json/route.ts`, ongeza kwenye mwisho wa safu ya `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Andika majaribio:** `tests/unit/a2a-<your-skill>.test.ts`. Jumuisha njia ya mafanikio + njia ya hitilafu.

5. **Andika nyaraka** za ujuzi mpya katika jedwali la `Available Skills` la faili hili.

---

## TTL ya Jukumu

Majukumu huisha baada ya `ttlMinutes` (chaguo-msingi ni dakika 5) — iliyosanidiwa katika kijenzi cha `A2ATaskManager` kwenye `src/lib/a2a/taskManager.ts:82`. Ili kubinafsisha, tengeneza fork ya uanzishaji wa `A2ATaskManager` na upitishe thamani tofauti (kwa mfano, `new A2ATaskManager(15)` kwa TTL ya dakika 15). Kipindi cha chinichini hukagua na kuondoa majukumu yaliyokwisha kila sekunde 60.

---

## Mzunguko wa Maisha wa Jukumu

```
limewasilishwa → linafanyiwa kazi → limekamilika
                                     → limeshindwa
                                     → limeghairiwa
```

- Majukumu huisha baada ya dakika 5 kwa chaguo-msingi (angalia [TTL ya Jukumu](#task-ttl))
- Hali za mwisho: `completed`, `failed`, `cancelled`
- Kumbukumbu ya matukio hufuatilia kila badiliko la hali

---

## Misimbo ya Hitilafu

| Msimbo | Maana                                 |
| :----- | :------------------------------------ |
| -32700 | Hitilafu ya uchanganuzi (JSON batili) |
| -32600 | Ombi batili / Haijaidhinishwa         |
| -32601 | Mbinu au ujuzi haujapatikana          |
| -32602 | Vigezo batili                         |
| -32603 | Hitilafu ya ndani                     |
| -32000 | Endpoint ya A2A imezimwa              |

---

## Mifano ya Ujumuishaji

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
