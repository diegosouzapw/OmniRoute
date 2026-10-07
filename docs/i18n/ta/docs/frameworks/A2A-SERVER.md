# OmniRoute A2A Server Documentation (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — ஒரு நுண்ணறிவுமிக்க வழிப்படுத்தல் முகவராக OmniRoute

A2A இடைமுகம் இரண்டு வடிவங்களைக் கொண்டுள்ளது:

- **JSON-RPC 2.0** — `POST /a2a` இல் (முதன்மை நுழைவுப் புள்ளி, `src/app/a2a/route.ts` இல் வரையறுக்கப்பட்டுள்ளது).
- **REST** — முகப்புப்பலகைகள் மற்றும் கருவிகளுக்காக `/api/a2a/*` இன் கீழ் (நிலை, பணிப் பட்டியல், ரத்துசெய்தல்).

பணிகள் `A2ATaskManager` மூலம் கண்காணிக்கப்படுகின்றன (`src/lib/a2a/taskManager.ts`, இயல்புநிலை TTL 5 நிமிடங்கள்). திறன்கள் `src/lib/a2a/taskExecution.ts` இல் உள்ள `A2A_SKILL_HANDLERS` வழியாக அனுப்பப்படுகின்றன.

## முகவர் கண்டறிதல்

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute-இன் திறன்கள், செயல்திறன்கள் மற்றும் அங்கீகாரத் தேவைகளை விவரிக்கும் முகவர் அட்டையை வழங்குகிறது.

முகவர் அட்டையின் `version` புலம் `process.env.npm_package_version` இலிருந்து பெறப்படுகிறது (`src/app/.well-known/agent.json/route.ts:13` ஐப் பார்க்கவும்); எனவே ஒவ்வொரு வெளியீட்டிலும் அது `package.json` உடன் தானாகவே ஒத்திசைக்கப்படுகிறது.

---

## அங்கீகாரம்

அனைத்து `/a2a` கோரிக்கைகளுக்கும் `Authorization` தலைப்பின் வழியாக ஓர் API விசை தேவை:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

சேவையகத்தில் API விசை எதுவும் உள்ளமைக்கப்படவில்லை என்றால், அங்கீகாரம் தவிர்க்கப்படும்.

## செயல்படுத்தல்

A2A, **Endpoints → A2A** நிலைமாற்றியால் கட்டுப்படுத்தப்படுகிறது மற்றும் இயல்பாக முடக்கப்பட்டிருக்கும். முடக்கப்பட்டிருக்கும்போது,
`GET /api/a2a/status` ஆனது `status: "disabled"` மற்றும் `online: false` எனத் தெரிவிக்கும்; `POST /a2a`-க்கான JSON-RPC அழைப்புகள்
JSON-RPC பிழைக் குறியீடு `-32000` உடன் HTTP 503-ஐ வழங்கும்.

---

## JSON-RPC 2.0 முறைகள்

### `message/send` — ஒத்திசைவான செயலாக்கம்

ஒரு திறனுக்குச் செய்தியை அனுப்பி, முழுமையான பதிலுக்காகக் காத்திருக்கும்.

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

**பதில்:**

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

### `message/stream` — SSE தொடர் பரிமாற்றம்

`message/send` போன்றதே, ஆனால் நிகழ்நேர தொடர் பரிமாற்றத்திற்காக சேவையகம் அனுப்பும் நிகழ்வுகளை வழங்குகிறது.

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

**SSE நிகழ்வுகள்:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — பணி நிலையைக் கேட்டறிதல்

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ஒரு பணியை ரத்துசெய்தல்

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## கிடைக்கக்கூடிய திறன்கள்

`src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`-இல் இணைக்கப்பட்டுள்ள 6 A2A திறன்களை OmniRoute வழங்குகிறது. ஒவ்வொரு திறன் தொகுதியும் `src/lib/a2a/skills/`-இல் உள்ளது.

| திறன்                      | ID                   | விளக்கம்                                                                                                                                                                | குறிச்சொற்கள்                  | எடுத்துக்காட்டுகள்                                |
| :------------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------- | :------------------------------------------------ |
| நுண்ணறிவு வழித்தடத் தேர்வு | `smart-routing`      | OmniRoute-இன் சேர்க்கை இயந்திரம் + மதிப்பீட்டைப் பயன்படுத்தி, உகந்த வழங்குநர்/சேர்க்கை வழியாக ஒரு தூண்டலை அனுப்புகிறது                                                  | வழித்தடத் தேர்வு, வழங்குநர்கள் | "சிறந்த மாதிரி வழியாக இந்தத் தூண்டலை அனுப்பு"     |
| ஒதுக்கீட்டு மேலாண்மை       | `quota-management`   | ஒவ்வொரு வழங்குநருக்குமான ஒதுக்கீட்டு நிலையை அறிக்கையிடுகிறது; எப்போது வேகத்தைக் கட்டுப்படுத்துவது/மாற்றுவது என்பதைத் தீர்மானிக்க அழைப்பாளர்களுக்கு உதவுகிறது            | ஒதுக்கீடு, வழங்குநர்கள்        | "anthropic-க்கான ஒதுக்கீட்டைச் சரிபார்"           |
| வழங்குநர் கண்டறிதல்        | `provider-discovery` | நிறுவப்பட்ட வழங்குநர்களை அவற்றின் திறன்கள், இலவச அடுக்குக் குறியீடுகள், OAuth நிலை ஆகியவற்றுடன் பட்டியலிடுகிறது                                                         | வழங்குநர்கள், கண்டறிதல்        | "எந்த வழங்குநர்கள் கிடைக்கின்றனர்?"               |
| செலவுப் பகுப்பாய்வு        | `cost-analysis`      | பட்டியல் + சமீபத்திய பயன்பாட்டின் அடிப்படையில் ஒரு கோரிக்கை/உரையாடலின் செலவை மதிப்பிடுகிறது                                                                             | செலவு, பயன்பாடு                | "இந்த உரையாடலுக்கான செலவை மதிப்பிடு"              |
| ஆரோக்கிய அறிக்கை           | `health-report`      | ஒவ்வொரு வழங்குநருக்குமான மின்சுற்றுத் துண்டிப்பான், காத்திருப்புக் காலம், பூட்டப்பட்ட நிலை ஆகியவற்றை ஒருங்கிணைக்கிறது                                                   | ஆரோக்கியம், மீள்திறன்          | "அனைத்து வழங்குநர்களின் ஆரோக்கிய நிலையைக் காட்டு" |
| திறன்களைப் பட்டியலிடுதல்   | `list-capabilities`  | சூழல் உட்செலுத்தலுக்கான மூல SKILL.md URL-களுடன், முழுமையான 45-உள்ளீடு கொண்ட முகவர் திறன்களின் பட்டியலை (23 API + 21 CLI + 1 கட்டமைப்பு) markdown அட்டவணையாக வழங்குகிறது | பட்டியல், கண்டறிதல், திறன்கள்  | "OmniRoute-இன் அனைத்து திறன்களையும் பட்டியலிடு"   |

> முகவர் அட்டை, நேரலையில் உள்ள 352-வழங்குநர் பட்டியலுடன் ஒத்திசைவாக வைக்கப்பட வேண்டும்; வழங்குநர் எண்ணிக்கைகளும் இலவசம்/அங்கீகாரம்-தேவையில்லை என்ற மெட்டாடேட்டாவும் இயக்கநேரப் பதிவகத்திலிருந்து பெறப்படுகின்றன.

### `list-capabilities` திறன் விவரம்

API அழைப்புகளை அனுப்புவதற்கு முன் OmniRoute என்னென்ன வழங்குகிறது என்பதைக் கண்டறிய வேண்டிய வெளிப்புற முகவர்களுக்கு `list-capabilities` திறன் குறிப்பாகப் பயனுள்ளதாகும். இது கட்டமைக்கப்பட்ட markdown அட்டவணைக் கலைப்பொருளை வழங்குகிறது:

```
| ID | பெயர் | வகை | பகுதி | முனைப்புள்ளிகள்/கட்டளைகள் | மூல URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | அங்கீகாரம் & அமர்வுகள் | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

ஒவ்வொரு வரிசையிலும் `rawUrl` நெடுவரிசை உள்ளதால், முகவர்கள் முழுமையான SKILL.md-ஐ உடனடியாகப் பெற முடியும். `metadata.totalSkills` புலம் பட்டியலின் அளவைப் பிரதிபலிக்கிறது (தற்போது 45). செயலாக்கம்: `src/lib/a2a/skills/listCapabilities.ts`. மேலும் [AGENT-SKILLS.md](./AGENT-SKILLS.md)-ஐப் பார்க்கவும்.

---

## REST API (துணை)

JSON-RPC முனைப்புள்ளி `/a2a` என்பது பிரதான A2A நுழைவுப் புள்ளியாகும். கீழேயுள்ள REST முனைப்புள்ளிகள் கட்டுப்பாட்டுப் பலகைகள் மற்றும் வெளிப்புறக் கருவிகளுக்கான துணை அணுகலை வழங்குகின்றன:

| முனைப்புள்ளி                 | முறை | விளக்கம்                                                          | அங்கீகாரம்                                       |
| :--------------------------- | :--- | :---------------------------------------------------------------- | :----------------------------------------------- |
| `/api/a2a/status`            | GET  | சேவையக நிலை, பதிவுசெய்யப்பட்ட திறன்கள்                            | (பொது)                                           |
| `/api/a2a/tasks`             | GET  | வடிப்பான்களுடன் பணிகளைப் பட்டியலிடுதல்                            | நிர்வாகம்                                        |
| `/api/a2a/tasks/[id]`        | GET  | ID மூலம் பணியைப் பெறுதல்                                          | நிர்வாகம்                                        |
| `/api/a2a/tasks/[id]/cancel` | POST | இயங்கிக்கொண்டிருக்கும் பணியை ரத்துசெய்தல்                         | நிர்வாகம்                                        |
| `/.well-known/agent.json`    | GET  | முகவர் அட்டை (A2A கண்டறிதல்)                                      | (பொது, 3600s தற்காலிகச் சேமிப்பு)                |
| `/api/a2a/tasks`             | POST | OmniConductor குழுவிற்கான உள்வரும் ஒப்படைப்பு (Conductor PRD RF5) | Bearer எதிராக `OMNIROUTE_API_KEY` + `a2aEnabled` |

**உள்வரும் Conductor ஒப்படைப்பு (`POST /api/a2a/tasks`):** வெளிப்புற A2A முகவர்கள், OmniRoute வழியாகக் குறியீட்டுப் பணிகளை OmniConductor குழுவிடம் ஒப்படைக்கின்றனர். உடல்: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — Conductor குழுத் திறன்கள் (முகவர் அட்டையில் அறிவிக்கப்பட்டவை) மட்டுமே ஒப்படைக்கப்படலாம்; `metadata.conductor.repo.url` அவசியம் (குழு git களஞ்சியங்களில் பணிபுரிகிறது). இந்த வழித்தடம், சேவையகப் பக்க `CONDUCTOR_ORCHESTRATOR_TOKEN`-ஐப் பயன்படுத்தி (மாற்றாக `CONDUCTOR_HUB_TOKEN`) மையத்தின் `POST /v1/tasks` ஆக மாற்றி, `201 { conductor_task_id, state: "submitted" }` என்பதைத் திருப்பியளிக்கிறது; பணி நிலைகள் SSE→A2A பிரதிபலிப்பு (RF1) வழியாக மீண்டும் பாய்ந்து, `GET /api/a2a/tasks?skill=conductor` மூலம் காணக்கூடியவையாக இருக்கும்.

---

## புதிய திறனைச் சேர்த்தல்

1. **திறன் கோப்பை உருவாக்கவும்:** `src/lib/a2a/skills/<your-skill>.ts`

   `(task: A2ATask) => Promise<{ artifacts, metadata }>` என்ற async செயல்பாட்டை ஏற்றுமதி செய்யவும். `smartRouting.ts` போன்ற ஏற்கனவே உள்ள திறன்களின் வடிவத்தைப் பின்பற்றவும்.

2. **கையாளுநரைப் பதிவுசெய்யவும்:** `src/lib/a2a/taskExecution.ts` கோப்பில், `A2A_SKILL_HANDLERS`-க்கு ஓர் உள்ளீட்டைச் சேர்க்கவும்:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...ஏற்கனவே உள்ள திறன்கள்
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **முகவர் அட்டையில் வெளிப்படுத்தவும்:** `src/app/.well-known/agent.json/route.ts` கோப்பில், `skills` அணியில் இணைக்கவும்:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **சோதனைகளை எழுதவும்:** `tests/unit/a2a-<your-skill>.test.ts`. வெற்றிப் பாதை + பிழைப் பாதை ஆகியவற்றை உள்ளடக்கவும்.

5. **இந்தக் கோப்பின் `Available Skills` அட்டவணையில் புதிய திறனை ஆவணப்படுத்தவும்.**

---

## பணியின் TTL

பணிகள் `ttlMinutes` காலத்திற்குப் பிறகு காலாவதியாகும் (இயல்புநிலை 5 நிமிடங்கள்) — இது `src/lib/a2a/taskManager.ts:82` இல் உள்ள `A2ATaskManager` constructor-இல் உள்ளமைக்கப்படுகிறது. இதைத் தனிப்பயனாக்க, `A2ATaskManager`-இன் உருவாக்கத்தை fork செய்து வேறொரு மதிப்பை அனுப்பவும் (எ.கா., 15 நிமிட TTL-க்கு `new A2ATaskManager(15)`). பின்னணியில் இயங்கும் ஓர் இடைவெளிச் செயல்முறை, காலாவதியான பணிகளை ஒவ்வொரு 60 வினாடிகளுக்கும் அகற்றுகிறது.

---

## பணியின் வாழ்க்கைச் சுழற்சி

```
சமர்ப்பிக்கப்பட்டது → செயல்பாட்டில் உள்ளது → நிறைவடைந்தது
                                         → தோல்வியடைந்தது
                                         → ரத்துசெய்யப்பட்டது
```

- பணிகள் இயல்பாக 5 நிமிடங்களுக்குப் பிறகு காலாவதியாகும் ([பணியின் TTL](#task-ttl) என்பதைப் பார்க்கவும்)
- இறுதி நிலைகள்: `completed`, `failed`, `cancelled`
- நிகழ்வுப் பதிவு ஒவ்வொரு நிலை மாற்றத்தையும் கண்காணிக்கிறது

---

## பிழைக் குறியீடுகள்

| குறியீடு | பொருள்                                          |
| :------- | :---------------------------------------------- |
| -32700   | பகுப்பாய்வுப் பிழை (செல்லுபடியாகாத JSON)        |
| -32600   | செல்லுபடியாகாத கோரிக்கை / அங்கீகரிக்கப்படவில்லை |
| -32601   | முறை அல்லது திறன் கண்டறியப்படவில்லை             |
| -32602   | செல்லுபடியாகாத அளவுருக்கள்                      |
| -32603   | உள் பிழை                                        |
| -32000   | A2A endpoint முடக்கப்பட்டுள்ளது                 |

---

## ஒருங்கிணைப்பு எடுத்துக்காட்டுகள்

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
