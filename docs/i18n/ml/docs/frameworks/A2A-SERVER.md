# OmniRoute A2A Server Documentation (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — ബുദ്ധിപരമായ റൂട്ടിംഗ് ഏജന്റായി OmniRoute

A2A ഇന്റർഫേസിന് രണ്ട് രൂപങ്ങളുണ്ട്:

- **JSON-RPC 2.0** `POST /a2a`-ൽ (പ്രാമാണിക എൻട്രി പോയിന്റ്, `src/app/a2a/route.ts`-ൽ നിർവചിച്ചിരിക്കുന്നു).
- ഡാഷ്ബോർഡുകൾക്കും ടൂളിംഗിനുമായി `/api/a2a/*`-ന് കീഴിലുള്ള **REST** (സ്റ്റാറ്റസ്, ടാസ്ക് ലിസ്റ്റ്, റദ്ദാക്കൽ).

ടാസ്കുകൾ `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, ഡിഫോൾട്ട് 5-മിനിറ്റ് TTL) ഉപയോഗിച്ച് ട്രാക്ക് ചെയ്യപ്പെടുന്നു. `src/lib/a2a/taskExecution.ts`-ലെ `A2A_SKILL_HANDLERS` വഴി സ്കില്ലുകൾ ഡിസ്പാച്ച് ചെയ്യപ്പെടുന്നു.

## ഏജന്റ് കണ്ടെത്തൽ

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute-ന്റെ ശേഷികൾ, സ്കില്ലുകൾ, ഓതന്റിക്കേഷൻ ആവശ്യകതകൾ എന്നിവ വിവരിക്കുന്ന Agent Card തിരികെ നൽകുന്നു.

Agent Card-ലെ `version` ഫീൽഡ് `process.env.npm_package_version`-ൽ നിന്നാണ് ലഭിക്കുന്നത് (`src/app/.well-known/agent.json/route.ts:13` കാണുക), അതിനാൽ ഓരോ റിലീസിലും അത് `package.json`-മായി സ്വയമേവ സമന്വയിപ്പിക്കപ്പെടുന്നു.

---

## ഓതന്റിക്കേഷൻ

എല്ലാ `/a2a` അഭ്യർത്ഥനകൾക്കും `Authorization` ഹെഡർ വഴി ഒരു API കീ ആവശ്യമാണ്:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

സെർവറിൽ API കീ കോൺഫിഗർ ചെയ്തിട്ടില്ലെങ്കിൽ, ഓതന്റിക്കേഷൻ ഒഴിവാക്കപ്പെടും.

## പ്രവർത്തനക്ഷമമാക്കൽ

A2A-യെ **Endpoints → A2A** ടോഗിൾ നിയന്ത്രിക്കുന്നു; ഡിഫോൾട്ടായി ഇത് പ്രവർത്തനരഹിതമാണ്. പ്രവർത്തനരഹിതമായിരിക്കുമ്പോൾ,
`GET /api/a2a/status` എന്നത് `status: "disabled"`, `online: false` എന്നിവ റിപ്പോർട്ട് ചെയ്യുന്നു; `POST /a2a`-ലേക്കുള്ള
JSON-RPC കോളുകൾ JSON-RPC പിശക് കോഡ് `-32000` സഹിതം HTTP 503 തിരികെ നൽകുന്നു.

---

## JSON-RPC 2.0 മെത്തഡുകൾ

### `message/send` — സമകാലിക നിർവഹണം

ഒരു സ്കില്ലിലേക്ക് സന്ദേശം അയച്ച് പൂർണ്ണമായ പ്രതികരണത്തിനായി കാത്തിരിക്കുന്നു.

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

**പ്രതികരണം:**

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

### `message/stream` — SSE സ്ട്രീമിങ്

`message/send`-ന് സമാനമാണ്, എന്നാൽ തത്സമയ സ്ട്രീമിങ്ങിനായി Server-Sent Events തിരികെ നൽകുന്നു.

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

**SSE ഇവന്റുകൾ:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ടാസ്ക് സ്റ്റാറ്റസ് അന്വേഷിക്കൽ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ഒരു ടാസ്ക് റദ്ദാക്കൽ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ലഭ്യമായ സ്കില്ലുകൾ

`src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`-ൽ ബന്ധിപ്പിച്ചിട്ടുള്ള 6 A2A സ്കില്ലുകൾ OmniRoute ലഭ്യമാക്കുന്നു. ഓരോ സ്കിൽ മൊഡ്യൂളും `src/lib/a2a/skills/`-ൽ സ്ഥിതിചെയ്യുന്നു.

| സ്കിൽ                    | ID                   | വിവരണം                                                                                                                                                                       | ടാഗുകൾ                           | ഉദാഹരണങ്ങൾ                                                |
| :----------------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------- | :-------------------------------------------------------- |
| സ്മാർട്ട് റൂട്ടിംഗ്      | `smart-routing`      | OmniRoute-ന്റെ കോംബോ എഞ്ചിനും സ്കോറിംഗും ഉപയോഗിച്ച് ഏറ്റവും അനുയോജ്യമായ പ്രൊവൈഡർ/കോംബോയിലൂടെ ഒരു പ്രോംപ്റ്റിനെ റൂട്ട് ചെയ്യുന്നു                                             | റൂട്ടിംഗ്, പ്രൊവൈഡർമാർ           | "ഈ പ്രോംപ്റ്റിനെ ഏറ്റവും മികച്ച മോഡലിലൂടെ റൂട്ട് ചെയ്യുക" |
| ക്വോട്ട മാനേജ്മെന്റ്     | `quota-management`   | ഓരോ പ്രൊവൈഡറിന്റെയും ക്വോട്ട നില റിപ്പോർട്ട് ചെയ്യുകയും എപ്പോൾ ത്രോട്ടിൽ ചെയ്യണം/മാറണം എന്ന് തീരുമാനിക്കാൻ കോളർമാരെ സഹായിക്കുകയും ചെയ്യുന്നു                                 | ക്വോട്ട, പ്രൊവൈഡർമാർ             | "anthropic-ന്റെ ക്വോട്ട പരിശോധിക്കുക"                     |
| പ്രൊവൈഡർ കണ്ടെത്തൽ       | `provider-discovery` | ഇൻസ്റ്റാൾ ചെയ്ത പ്രൊവൈഡർമാരെ അവരുടെ ശേഷികൾ, സൗജന്യ-ടയർ ഫ്ലാഗുകൾ, OAuth നില എന്നിവയോടൊപ്പം പട്ടികപ്പെടുത്തുന്നു                                                               | പ്രൊവൈഡർമാർ, കണ്ടെത്തൽ           | "ഏതെല്ലാം പ്രൊവൈഡർമാർ ലഭ്യമാണ്?"                          |
| ചെലവ് വിശകലനം            | `cost-analysis`      | കാറ്റലോഗും സമീപകാല ഉപയോഗവും അടിസ്ഥാനമാക്കി ഒരു അഭ്യർത്ഥനയുടെ/സംഭാഷണത്തിന്റെ ചെലവ് കണക്കാക്കുന്നു                                                                             | ചെലവ്, ഉപയോഗം                    | "ഈ സംഭാഷണത്തിന്റെ ചെലവ് കണക്കാക്കുക"                      |
| ആരോഗ്യ റിപ്പോർട്ട്       | `health-report`      | ഓരോ പ്രൊവൈഡറിന്റെയും സർക്യൂട്ട് ബ്രേക്കർ, കൂൾഡൗൺ, ലോക്കൗട്ട് നില എന്നിവ സംയോജിപ്പിക്കുന്നു                                                                                   | ആരോഗ്യം, പ്രതിരോധശേഷി            | "എല്ലാ പ്രൊവൈഡർമാരുടെയും ആരോഗ്യനില കാണിക്കുക"             |
| ശേഷികൾ പട്ടികപ്പെടുത്തുക | `list-capabilities`  | പൂർണ്ണമായ 45-എൻട്രിയുള്ള Agent Skills കാറ്റലോഗ് (23 API + 21 CLI + 1 കോൺഫിഗ്) സന്ദർഭ ഇൻജക്ഷനുവേണ്ടിയുള്ള അസംസ്കൃത SKILL.md URL-കളോടുകൂടിയ ഒരു മാർക്ക്ഡൗൺ പട്ടികയായി നൽകുന്നു | കാറ്റലോഗ്, കണ്ടെത്തൽ, സ്കില്ലുകൾ | "OmniRoute-ന്റെ എല്ലാ ശേഷികളും പട്ടികപ്പെടുത്തുക"         |

> Agent Card, തത്സമയ 352-പ്രൊവൈഡർ കാറ്റലോഗുമായി വിന്യസിച്ച നിലയിൽ നിലനിർത്തണം; പ്രൊവൈഡർമാരുടെ എണ്ണവും സൗജന്യ/ഓതന്റിക്കേഷൻ ആവശ്യമില്ലാത്തതുമായി ബന്ധപ്പെട്ട മെറ്റാഡാറ്റയും റൺടൈം രജിസ്ട്രിയിൽ നിന്നാണ് ലഭിക്കുന്നത്.

### `list-capabilities` സ്കില്ലിന്റെ വിശദാംശങ്ങൾ

API കോളുകൾ അയയ്ക്കുന്നതിന് മുമ്പ് OmniRoute എന്തെല്ലാം ലഭ്യമാക്കുന്നുവെന്ന് കണ്ടെത്തേണ്ട ബാഹ്യ ഏജന്റുമാർക്ക് `list-capabilities` സ്കിൽ പ്രത്യേകിച്ചും ഉപകാരപ്രദമാണ്. ഇത് ഘടനാപരമായ ഒരു മാർക്ക്ഡൗൺ പട്ടിക ആർട്ടിഫാക്റ്റ് നൽകുന്നു:

```
| ID | പേര് | വിഭാഗം | മേഖല | എൻഡ്പോയിന്റുകൾ/കമാൻഡുകൾ | അസംസ്കൃത URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | ഓതന്റിക്കേഷനും സെഷനുകളും | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

ഓരോ വരിയിലും `rawUrl` കോളം ഉൾപ്പെടുന്നതിനാൽ, ഏജന്റുമാർക്ക് പൂർണ്ണമായ SKILL.md ഉടൻ ലഭ്യമാക്കാനാകും. `metadata.totalSkills` ഫീൽഡ് കാറ്റലോഗിന്റെ വലുപ്പത്തെ പ്രതിഫലിപ്പിക്കുന്നു (നിലവിൽ 45). നടപ്പാക്കൽ: `src/lib/a2a/skills/listCapabilities.ts`. [AGENT-SKILLS.md](./AGENT-SKILLS.md)-ഉം കാണുക.

---

## REST API (സഹായകം)

JSON-RPC എൻഡ്പോയിന്റായ `/a2a` ആണ് ഔദ്യോഗിക A2A പ്രവേശന പോയിന്റ്. താഴെയുള്ള REST എൻഡ്പോയിന്റുകൾ ഡാഷ്ബോർഡുകൾക്കും ബാഹ്യ ടൂളുകൾക്കും സഹായകമായ ആക്സസ് നൽകുന്നു:

| എൻഡ്പോയിന്റ്                 | മെത്തേഡ് | വിവരണം                                                                | ഓതന്റിക്കേഷൻ                                                                  |
| :--------------------------- | :------- | :-------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET      | സെർവർ നില, രജിസ്റ്റർ ചെയ്ത സ്കില്ലുകൾ                                 | (പൊതുവായത്)                                                                   |
| `/api/a2a/tasks`             | GET      | ഫിൽട്ടറുകളോടുകൂടിയ ടാസ്ക് പട്ടിക                                      | മാനേജ്മെന്റ്                                                                  |
| `/api/a2a/tasks/[id]`        | GET      | ID ഉപയോഗിച്ച് ടാസ്ക് നേടുക                                            | മാനേജ്മെന്റ്                                                                  |
| `/api/a2a/tasks/[id]/cancel` | POST     | പ്രവർത്തിച്ചുകൊണ്ടിരിക്കുന്ന ടാസ്ക് റദ്ദാക്കുക                        | മാനേജ്മെന്റ്                                                                  |
| `/.well-known/agent.json`    | GET      | ഏജന്റ് കാർഡ് (A2A കണ്ടെത്തൽ)                                          | (പൊതുവായത്, 3600s കാഷ് ചെയ്തത്)                                               |
| `/api/a2a/tasks`             | POST     | OmniConductor ഫ്ലീറ്റിലേക്കുള്ള ഇൻബൗണ്ട് ഡെലിഗേഷൻ (Conductor PRD RF5) | Bearer-നെ `OMNIROUTE_API_KEY` + `a2aEnabled` എന്നിവയുമായി താരതമ്യം ചെയ്യുന്നു |

**ഇൻബൗണ്ട് Conductor ഡെലിഗേഷൻ (`POST /api/a2a/tasks`):** ബാഹ്യ A2A ഏജന്റുകൾ OmniRoute വഴി കോഡിങ് ജോലികൾ OmniConductor ഫ്ലീറ്റിന് ഡെലിഗേറ്റ് ചെയ്യുന്നു. ബോഡി: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — Conductor ഫ്ലീറ്റ് സ്കില്ലുകൾ (ഏജന്റ് കാർഡിൽ പ്രഖ്യാപിച്ചവ) മാത്രമേ ഡെലിഗേറ്റ് ചെയ്യാനാകൂ; `metadata.conductor.repo.url` നിർബന്ധമാണ് (ഫ്ലീറ്റ് git റിപ്പോകളിലാണ് പ്രവർത്തിക്കുന്നത്). സെർവർ-സൈഡ് `CONDUCTOR_ORCHESTRATOR_TOKEN` (ഫോൾബാക്ക് `CONDUCTOR_HUB_TOKEN`) ഉപയോഗിച്ച് റൂട്ട് ഹബ്ബിന്റെ `POST /v1/tasks`-ലേക്ക് വിവർത്തനം ചെയ്യുകയും `201 { conductor_task_id, state: "submitted" }` തിരികെ നൽകുകയും ചെയ്യുന്നു; ടാസ്ക് നിലകൾ SSE→A2A മിറർ (RF1) വഴി തിരികെ പ്രവഹിക്കുകയും `GET /api/a2a/tasks?skill=conductor` വഴി കാണാനാകുകയും ചെയ്യുന്നു.

---

## ഒരു പുതിയ സ്കിൽ ചേർക്കൽ

1. **സ്കിൽ ഫയൽ സൃഷ്ടിക്കുക:** `src/lib/a2a/skills/<your-skill>.ts`

   `(task: A2ATask) => Promise<{ artifacts, metadata }>` എന്ന async ഫങ്ഷൻ എക്സ്പോർട്ട് ചെയ്യുക. `smartRouting.ts` പോലുള്ള നിലവിലുള്ള സ്കില്ലുകളുടെ ഘടന പിന്തുടരുക.

2. **ഹാൻഡ്ലർ രജിസ്റ്റർ ചെയ്യുക:** `src/lib/a2a/taskExecution.ts`-ലെ `A2A_SKILL_HANDLERS`-ലേക്ക് ഒരു എൻട്രി ചേർക്കുക:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...നിലവിലുള്ള സ്കില്ലുകൾ
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **ഏജന്റ് കാർഡിൽ പ്രദർശിപ്പിക്കുക:** `src/app/.well-known/agent.json/route.ts`-ലെ `skills` അറേയിലേക്ക് ചേർക്കുക:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **ടെസ്റ്റുകൾ എഴുതുക:** `tests/unit/a2a-<your-skill>.test.ts`. വിജയപാതയും പിശക് പാതയും ഉൾപ്പെടുത്തുക.

5. ഈ ഫയലിലെ `Available Skills` പട്ടികയിൽ പുതിയ സ്കിൽ **രേഖപ്പെടുത്തുക**.

---

## ടാസ്ക് TTL

ടാസ്കുകൾ `ttlMinutes` കഴിഞ്ഞാൽ കാലഹരണപ്പെടും (ഡിഫോൾട്ട് 5 മിനിറ്റ്) — ഇത് `src/lib/a2a/taskManager.ts:82`-ലെ `A2ATaskManager` കൺസ്ട്രക്ടറിൽ കോൺഫിഗർ ചെയ്തിരിക്കുന്നു. ഇഷ്ടാനുസൃതമാക്കാൻ, `A2ATaskManager` ഇൻസ്റ്റൻഷ്യേഷൻ ഫോർക്ക് ചെയ്ത് മറ്റൊരു മൂല്യം നൽകുക (ഉദാ., 15 മിനിറ്റ് TTL-നായി `new A2ATaskManager(15)`). ഒരു പശ്ചാത്തല ഇന്റർവൽ ഓരോ 60 സെക്കൻഡിലും കാലഹരണപ്പെട്ട ടാസ്കുകൾ നീക്കംചെയ്യുന്നു.

---

## ടാസ്ക് ജീവിതചക്രം

```
submitted → working → completed
                    → failed
                    → cancelled
```

- ഡിഫോൾട്ടായി ടാസ്കുകൾ 5 മിനിറ്റിന് ശേഷം കാലഹരണപ്പെടും ([ടാസ്ക് TTL](#task-ttl) കാണുക)
- അന്തിമാവസ്ഥകൾ: `completed`, `failed`, `cancelled`
- ഓരോ അവസ്ഥാ പരിവർത്തനവും ഇവന്റ് ലോഗ് രേഖപ്പെടുത്തുന്നു

---

## പിശക് കോഡുകൾ

| കോഡ്   | അർത്ഥം                                  |
| :----- | :-------------------------------------- |
| -32700 | പാർസ് പിശക് (അസാധുവായ JSON)             |
| -32600 | അസാധുവായ അഭ്യർത്ഥന / അനധികൃതം           |
| -32601 | മെത്തഡ് അല്ലെങ്കിൽ സ്കിൽ കണ്ടെത്തിയില്ല |
| -32602 | അസാധുവായ പാരാമീറ്ററുകൾ                  |
| -32603 | ആന്തരിക പിശക്                           |
| -32000 | A2A എൻഡ്പോയിന്റ് പ്രവർത്തനരഹിതമാണ്      |

---

## സംയോജന ഉദാഹരണങ്ങൾ

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
