# OmniRoute A2A Server Documentation (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — බුද්ධිමත් මාර්ගගත කිරීමේ නියෝජිතයෙකු ලෙස OmniRoute

A2A අතුරුමුහුණතට ආකාර දෙකක් ඇත:

- **JSON-RPC 2.0** `POST /a2a` හි (සම්මත පිවිසුම් ස්ථානය, `src/app/a2a/route.ts` හි අර්ථ දක්වා ඇත).
- උපකරණ පුවරු සහ මෙවලම් සඳහා `/api/a2a/*` යටතේ **REST** (තත්ත්වය, කාර්ය ලැයිස්තුව, අවලංගු කිරීම).

කාර්යයන් `A2ATaskManager` මඟින් නිරීක්ෂණය කෙරේ (`src/lib/a2a/taskManager.ts`, පෙරනිමි මිනිත්තු 5ක TTL). කුසලතා `src/lib/a2a/taskExecution.ts` හි `A2A_SKILL_HANDLERS` හරහා යොමු කෙරේ.

## නියෝජිත සොයාගැනීම

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute හි හැකියාවන්, කුසලතා සහ සත්යාපන අවශ්යතා විස්තර කරන නියෝජිත කාඩ්පත ආපසු ලබා දෙයි.

නියෝජිත කාඩ්පතේ `version` ක්ෂේත්රය `process.env.npm_package_version` වෙතින් ලබා ගනී (`src/app/.well-known/agent.json/route.ts:13` බලන්න), එම නිසා සෑම නිකුතුවකදීම එය `package.json` සමඟ ස්වයංක්රීයව සමමුහුර්තව පවතී.

---

## සත්යාපනය

සියලුම `/a2a` ඉල්ලීම් සඳහා `Authorization` ශීර්ෂකය හරහා API යතුරක් අවශ්ය වේ:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

සේවාදායකයේ API යතුරක් වින්යාස කර නොමැති නම්, සත්යාපනය මඟ හරිනු ලැබේ.

## සක්රීය කිරීම

A2A, **Endpoints → A2A** මාරු බොත්තම මඟින් පාලනය වන අතර පෙරනිමියෙන් අක්රීය කර ඇත. එය අක්රීය කර ඇති විට,
`GET /api/a2a/status` විසින් `status: "disabled"` සහ `online: false` වාර්තා කරයි; `POST /a2a` වෙත කරන JSON-RPC ඇමතුම්
JSON-RPC දෝෂ කේතය `-32000` සමඟ HTTP 503 ආපසු ලබා දෙයි.

---

## JSON-RPC 2.0 ක්රම

### `message/send` — සමමුහුර්ත ක්රියාත්මක කිරීම

කුසලතාවකට පණිවිඩයක් යවා සම්පූර්ණ ප්රතිචාරය ලැබෙන තෙක් රැඳී සිටී.

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

**ප්රතිචාරය:**

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

### `message/stream` — SSE ප්රවාහකරණය

`message/send` හා සමාන නමුත් තත්ය කාලීන ප්රවාහකරණය සඳහා සේවාදායකයෙන් යවන ලද සිදුවීම් ආපසු ලබා දෙයි.

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

**SSE සිදුවීම්:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — කාර්ය තත්ත්වය විමසීම

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — කාර්යයක් අවලංගු කිරීම

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ලබා ගත හැකි කුසලතා

OmniRoute විසින් `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` තුළ සම්බන්ධ කර ඇති A2A කුසලතා 6ක් නිරාවරණය කරයි. සෑම කුසලතා මොඩියුලයක්ම `src/lib/a2a/skills/` තුළ පවතී.

| කුසලතාව                    | ID                   | විස්තරය                                                                                                                                                  | ටැග්                         | උදාහරණ                                          |
| :------------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- | :---------------------------------------------- |
| ස්මාර්ට් මාර්ගගත කිරීම     | `smart-routing`      | OmniRoute හි සංයෝජන එන්ජිම සහ ලකුණුකරණය භාවිතයෙන් ප්රශස්ත සැපයුම්කරු/සංයෝජනය හරහා ප්රේරකයක් මාර්ගගත කරයි                                                 | මාර්ගගත කිරීම, සැපයුම්කරුවන් | "මෙම ප්රේරකය හොඳම ආකෘතිය හරහා මාර්ගගත කරන්න"    |
| කෝටා කළමනාකරණය             | `quota-management`   | එක් එක් සැපයුම්කරුගේ කෝටා තත්ත්වය වාර්තා කර, වේගය සීමා කළ යුත්තේ හෝ සැපයුම්කරු මාරු කළ යුත්තේ කවදාදැයි තීරණය කිරීමට ඇමතුම්කරුවන්ට උපකාර කරයි             | කෝටා, සැපයුම්කරුවන්          | "anthropic සඳහා කෝටාව පරීක්ෂා කරන්න"            |
| සැපයුම්කරු සොයාගැනීම       | `provider-discovery` | හැකියාවන්, නොමිලේ ස්ථර දර්ශක සහ OAuth තත්ත්වය සමඟ ස්ථාපිත සැපයුම්කරුවන් ලැයිස්තුගත කරයි                                                                  | සැපයුම්කරුවන්, සොයාගැනීම     | "ලබා ගත හැකි සැපයුම්කරුවන් මොනවාද?"             |
| පිරිවැය විශ්ලේෂණය          | `cost-analysis`      | නාමාවලිය සහ මෑත භාවිතය මත පදනම්ව ඉල්ලීමක/සංවාදයක පිරිවැය ඇස්තමේන්තු කරයි                                                                                 | පිරිවැය, භාවිතය              | "මෙම සංවාදය සඳහා පිරිවැය ඇස්තමේන්තු කරන්න"      |
| සෞඛ්ය වාර්තාව              | `health-report`      | එක් එක් සැපයුම්කරු සඳහා පරිපථ බිඳුම්කරු, විරාම කාලය සහ අගුලු දැමීමේ තත්ත්වය ඒකාබද්ධ කරයි                                                                 | සෞඛ්යය, ප්රත්යස්ථතාව         | "සියලුම සැපයුම්කරුවන්ගේ සෞඛ්ය තත්ත්වය පෙන්වන්න" |
| හැකියාවන් ලැයිස්තුගත කිරීම | `list-capabilities`  | සන්දර්භ ඇතුළත් කිරීම සඳහා අමු SKILL.md URL සහිත markdown වගුවක් ලෙස අංග 45කින් යුත් සම්පූර්ණ Agent Skills නාමාවලිය (API 23 + CLI 21 + config 1) ලබා දෙයි | නාමාවලිය, සොයාගැනීම, කුසලතා  | "සියලුම OmniRoute හැකියාවන් ලැයිස්තුගත කරන්න"   |

> Agent Card එක සජීවී සැපයුම්කරුවන් 352ක නාමාවලිය සමඟ සමපාතව තබාගත යුතුය; සැපයුම්කරු සංඛ්යා සහ නොමිලේ/සත්යාපනය-අවශ්ය-නොවන පාරදත්ත ධාවනකාල රෙජිස්ට්රියෙන් ලබා ගනී.

### `list-capabilities` කුසලතාවේ විස්තර

API ඇමතුම් යැවීමට පෙර OmniRoute නිරාවරණය කරන දෑ සොයාගැනීමට අවශ්ය බාහිර නියෝජිතයන්ට `list-capabilities` කුසලතාව විශේෂයෙන් ප්රයෝජනවත් වේ. එය ව්යුහගත markdown වගු කෘතියක් ලබා දෙයි:

```
| ID | නම | ප්රවර්ගය | ක්ෂේත්රය | අන්තලක්ෂ්ය/විධාන | අමු URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | සත්යාපනය සහ සැසි | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

නියෝජිතයන්ට සම්පූර්ණ SKILL.md වහාම ලබාගත හැකි වන පරිදි සෑම පේළියකම `rawUrl` තීරුව ඇතුළත් වේ. `metadata.totalSkills` ක්ෂේත්රය නාමාවලියේ ප්රමාණය පිළිබිඹු කරයි (අද වන විට 45කි). ක්රියාත්මක කිරීම: `src/lib/a2a/skills/listCapabilities.ts`. [AGENT-SKILLS.md](./AGENT-SKILLS.md) ද බලන්න.

---

## REST API (සහායක)

JSON-RPC අන්ත ලක්ෂ්යය වන `/a2a`, සම්මත A2A ප්රවේශ ලක්ෂ්යයයි. පහත REST අන්ත ලක්ෂ්ය උපකරණ පුවරු සහ බාහිර මෙවලම් සඳහා සහායක ප්රවේශය සපයයි:

| අන්ත ලක්ෂ්යය                 | ක්රමය | විස්තරය                                               | සත්යාපනය                                     |
| :--------------------------- | :---- | :---------------------------------------------------- | :------------------------------------------- |
| `/api/a2a/status`            | GET   | සේවාදායක තත්ත්වය, ලියාපදිංචි කළ කුසලතා                | (පොදු)                                       |
| `/api/a2a/tasks`             | GET   | පෙරහන් සමඟ කාර්ය ලැයිස්තුගත කිරීම                     | කළමනාකරණය                                    |
| `/api/a2a/tasks/[id]`        | GET   | ID අනුව කාර්යය ලබාගැනීම                               | කළමනාකරණය                                    |
| `/api/a2a/tasks/[id]/cancel` | POST  | ක්රියාත්මක වන කාර්යය අවලංගු කිරීම                     | කළමනාකරණය                                    |
| `/.well-known/agent.json`    | GET   | නියෝජිත කාඩ්පත (A2A සොයාගැනීම)                        | (පොදු, තත්පර 3600ක් හැඹිලිගත කර ඇත)          |
| `/api/a2a/tasks`             | POST  | OmniConductor සමූහය වෙත එන පැවරීම (Conductor PRD RF5) | Bearer හා `OMNIROUTE_API_KEY` + `a2aEnabled` |

**එන Conductor පැවරීම (`POST /api/a2a/tasks`):** බාහිර A2A නියෝජිතයන් OmniRoute හරහා OmniConductor සමූහයට කේතකරණ වැඩ පවරයි. අන්තර්ගතය: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — පැවරිය හැක්කේ Conductor සමූහ කුසලතා (Agent Card හි නිවේදනය කර ඇති ඒවා) පමණි; `metadata.conductor.repo.url` අවශ්ය වේ (සමූහය git ගබඩා මත ක්රියා කරයි). මෙම මාර්ගය සේවාදායක-පාර්ශ්වීය `CONDUCTOR_ORCHESTRATOR_TOKEN` (විකල්පය `CONDUCTOR_HUB_TOKEN`) භාවිතයෙන් hub හි `POST /v1/tasks` වෙත පරිවර්තනය වන අතර `201 { conductor_task_id, state: "submitted" }` ආපසු ලබා දෙයි; කාර්ය තත්ත්වයන් SSE→A2A දර්පණය (RF1) හරහා නැවත ගලා එන අතර `GET /api/a2a/tasks?skill=conductor` මඟින් දැකගත හැක.

---

## නව කුසලතාවක් එක් කිරීම

1. **කුසලතා ගොනුව සාදන්න:** `src/lib/a2a/skills/<your-skill>.ts`

   `(task: A2ATask) => Promise<{ artifacts, metadata }>` ආකාරයේ async ශ්රිතයක් export කරන්න. `smartRouting.ts` වැනි පවතින කුසලතාවල ව්යුහය අනුගමනය කරන්න.

2. **හසුරුවනය ලියාපදිංචි කරන්න:** `src/lib/a2a/taskExecution.ts` තුළ, `A2A_SKILL_HANDLERS` වෙත ඇතුළත් කිරීමක් එක් කරන්න:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...පවතින කුසලතා
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Agent Card හි නිරාවරණය කරන්න:** `src/app/.well-known/agent.json/route.ts` තුළ, `skills` අරාවට එක් කරන්න:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **පරීක්ෂණ ලියන්න:** `tests/unit/a2a-<your-skill>.test.ts`. සාර්ථක මාර්ගය + දෝෂ මාර්ගය ආවරණය කරන්න.

5. මෙම ගොනුවේ `Available Skills` වගුවෙහි නව කුසලතාව **ලේඛනගත කරන්න**.

---

## කාර්ය TTL

කාර්ය `ttlMinutes` කාලයෙන් පසු කල් ඉකුත් වේ (පෙරනිමියෙන් මිනිත්තු 5කි) — මෙය `src/lib/a2a/taskManager.ts:82` හි ඇති `A2ATaskManager` constructor එක තුළ වින්යාස කර ඇත. අභිරුචිකරණය කිරීමට, `A2ATaskManager` නිදර්ශනය fork කර වෙනත් අගයක් ලබා දෙන්න (උදා., මිනිත්තු 15ක TTL එකක් සඳහා `new A2ATaskManager(15)`). පසුබිම් interval එකක් සෑම තත්පර 60කට වරක් කල් ඉකුත් වූ කාර්ය ඉවත් කරයි.

---

## කාර්ය ජීවන චක්රය

```
ඉදිරිපත් කළා → ක්රියාත්මක වෙමින් → සම්පූර්ණයි
                                 → අසාර්ථකයි
                                 → අවලංගුයි
```

- පෙරනිමියෙන් කාර්ය මිනිත්තු 5කට පසු කල් ඉකුත් වේ ([කාර්ය TTL](#task-ttl) බලන්න)
- අවසාන තත්ත්ව: `completed`, `failed`, `cancelled`
- සිදුවීම් ලොගය සෑම තත්ත්ව සංක්රාන්තියක්ම වාර්තා කරයි

---

## දෝෂ කේත

| කේතය   | අර්ථය                                  |
| :----- | :------------------------------------- |
| -32700 | විග්රහ කිරීමේ දෝෂයකි (වලංගු නොවන JSON) |
| -32600 | වලංගු නොවන ඉල්ලීමක් / අවසර නොලැබීම     |
| -32601 | ක්රමය හෝ කුසලතාව හමු නොවීය             |
| -32602 | වලංගු නොවන පරාමිති                     |
| -32603 | අභ්යන්තර දෝෂයකි                        |
| -32000 | A2A endpoint එක අක්රිය කර ඇත           |

---

## ඒකාබද්ධ කිරීමේ උදාහරණ

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
