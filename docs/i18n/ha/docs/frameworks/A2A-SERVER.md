# OmniRoute A2A Server Documentation (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute a matsayin wakilin sarrafa hanya mai basira

Mahadar A2A tana da fuskoki biyu:

- **JSON-RPC 2.0** a `POST /a2a` (babbar hanyar shiga, wadda aka ayyana a `src/app/a2a/route.ts`).
- **REST** a ƙarƙashin `/api/a2a/*` don dashboard da kayan aiki (matsayi, jerin ayyuka, sokewa).

Ana bibiyar ayyuka ta hanyar `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, tsohon TTL na mintuna 5). Ana tura ƙwarewa ta hanyar `A2A_SKILL_HANDLERS` a cikin `src/lib/a2a/taskExecution.ts`.

## Gano Wakili

```bash
curl http://localhost:20128/.well-known/agent.json
```

Yana dawo da Katin Wakili wanda ke bayyana iyawa, ƙwarewa, da buƙatun tantancewa na OmniRoute.

Ana samo filin `version` na Katin Wakili daga `process.env.npm_package_version` (duba `src/app/.well-known/agent.json/route.ts:13`), don haka yana ci gaba da daidaituwa ta atomatik da `package.json` a kowace fitarwa.

---

## Tantancewa

Duk buƙatun `/a2a` suna buƙatar maɓallin API ta kanun `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Idan ba a saita maɓallin API a sabar ba, za a tsallake tantancewa.

## Kunna Aiki

Ana sarrafa A2A ta maɓallin kunnawa na **Endpoints → A2A**, kuma a tsohuwa a kashe yake. Lokacin da aka kashe,
`GET /api/a2a/status` yana bayar da rahoton `status: "disabled"` da `online: false`; kiraye-kirayen JSON-RPC zuwa
`POST /a2a` suna dawo da HTTP 503 tare da lambar kuskuren JSON-RPC `-32000`.

---

## Hanyoyin JSON-RPC 2.0

### `message/send` — Aiwatarwa Mai Jira

Yana aika saƙo zuwa wata ƙwarewa kuma ya jira cikakkiyar amsa.

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

**Amsa:**

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

### `message/stream` — Watsawar SSE

Daidai yake da `message/send`, amma yana dawo da Abubuwan da Saba ke Aikawa don watsawa kai tsaye.

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

**Abubuwan SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Bincika Matsayin Aiki

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Soke Aiki

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Ƙwarewar da Ake da Su

OmniRoute yana samar da ƙwarewar A2A guda 6 waɗanda aka haɗa a cikin `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Kowace manhajar ƙwarewa tana cikin `src/lib/a2a/skills/`.

| Ƙwarewa                       | ID                   | Bayani                                                                                                                                                                          | Alamomi                          | Misalai                                      |
| :---------------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------- | :------------------------------------------- |
| Zabar Hanya Mai Wayo          | `smart-routing`      | Yana aika umarni ta hanyar mafi dacewar mai samarwa/haɗin masu samarwa ta amfani da injin haɗin OmniRoute + tsarin ƙididdigarsa                                                 | zabar hanya, masu samarwa        | "Aika wannan umarni ta mafi kyawun samfurin" |
| Gudanar da Ƙayyadadden Amfani | `quota-management`   | Yana bayar da rahoton matsayin ƙayyadadden amfani na kowane mai samarwa, yana taimaka wa masu kira yanke shawarar lokacin rage gudu/canza mai samarwa                           | ƙayyadadden amfani, masu samarwa | "Duba ƙayyadadden amfani na anthropic"       |
| Gano Masu Samarwa             | `provider-discovery` | Yana jera masu samarwa da aka girka tare da iyawarsu, alamomin matakin kyauta, da matsayin OAuth                                                                                | masu samarwa, ganowa             | "Waɗanne masu samarwa ake da su?"            |
| Nazarin Kuɗi                  | `cost-analysis`      | Yana ƙiyasta kuɗin buƙata/tattaunawa bisa kundin bayanai + amfani na kwanan nan                                                                                                 | kuɗi, amfani                     | "Ƙiyasta kuɗin wannan tattaunawar"           |
| Rahoton Lafiya                | `health-report`      | Yana tattara matsayin circuit breaker, cooldown, da lockout na kowane mai samarwa                                                                                               | lafiya, juriya                   | "Nuna matsayin lafiyar duk masu samarwa"     |
| Jera Iyawa                    | `list-capabilities`  | Yana mayar da cikakken kundin Ƙwarewar Wakili mai shigarwa 45 (API 23 + CLI 21 + config 1) a matsayin teburin markdown tare da ɗanyen URL na SKILL.md don saka mahallin bayanai | kundi, ganowa, ƙwarewa           | "Jera dukkan iyawar OmniRoute"               |

> Ya kamata a ci gaba da daidaita Katin Wakili da kundin masu samarwa 352 na kai-tsaye; ana samo adadin masu samarwa da bayanan kyauta/mara buƙatar tantancewa daga rajistar lokacin aiki.

### Cikakken Bayanin Ƙwarewar `list-capabilities`

Ƙwarewar `list-capabilities` tana da amfani musamman ga wakilan waje waɗanda ke buƙatar gano abubuwan da OmniRoute ke samarwa kafin aika kiraye-kirayen API. Tana mayar da kayan aikin teburin markdown mai tsari:

```
| ID | Suna | Rukuni | Fanni | Endpoints/Commands | Ɗanyen URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Tantancewa & Zaman Aiki | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Kowane layi yana ƙunshe da ginshiƙin `rawUrl` domin wakilai su iya ɗauko cikakken SKILL.md nan take. Filin `metadata.totalSkills` yana nuna girman kundin (45 a yau). Aiwatarwa: `src/lib/a2a/skills/listCapabilities.ts`. Duba kuma [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (na taimako)

Matsayar JSON-RPC ta `/a2a` ita ce babbar mashigar A2A. Matsayoyin REST da ke ƙasa suna samar da damar taimako ga allunan sa ido da kayan aikin waje:

| Matsaya                      | Hanya | Bayani                                                                | Tantancewa                                   |
| :--------------------------- | :---- | :-------------------------------------------------------------------- | :------------------------------------------- |
| `/api/a2a/status`            | GET   | Matsayin sabar, ƙwarewar da aka yi wa rajista                         | (na jama'a)                                  |
| `/api/a2a/tasks`             | GET   | Jera ayyuka tare da matatu                                            | gudanarwa                                    |
| `/api/a2a/tasks/[id]`        | GET   | Samo aiki ta ID                                                       | gudanarwa                                    |
| `/api/a2a/tasks/[id]/cancel` | POST  | Soke aikin da ke gudana                                               | gudanarwa                                    |
| `/.well-known/agent.json`    | GET   | Katin Wakili (gano A2A)                                               | (na jama'a, an adana na 3600s)               |
| `/api/a2a/tasks`             | POST  | Miƙa aiki mai shigowa zuwa rundunar OmniConductor (Conductor PRD RF5) | Bearer da `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Miƙa aiki mai shigowa na Conductor (`POST /api/a2a/tasks`):** wakilan A2A na waje suna miƙa aikin rubuta lamba ga rundunar OmniConductor ta hanyar OmniRoute. Jiki: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — ƙwarewar rundunar Conductor kaɗai (waɗanda aka sanar a Katin Wakili) ake iya miƙa wa aiki; ana buƙatar `metadata.conductor.repo.url` (rundunar tana aiki a kan ma'ajin git). Hanyar tana fassara buƙatar zuwa `POST /v1/tasks` na hub ta amfani da `CONDUCTOR_ORCHESTRATOR_TOKEN` na gefen sabar (madadinsa `CONDUCTOR_HUB_TOKEN`) sannan ta mayar da `201 { conductor_task_id, state: "submitted" }`; matsayin ayyuka yana komawa ta madubin SSE→A2A (RF1), kuma ana iya ganinsa ta `GET /api/a2a/tasks?skill=conductor`.

---

## Ƙara Sabuwar Ƙwarewa

1. **Ƙirƙiri fayil ɗin ƙwarewa:** `src/lib/a2a/skills/<your-skill>.ts`

   Fitar da aikin async mai sigar `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Bi tsarin ƙwarewar da ke akwai kamar `smartRouting.ts`.

2. **Yi wa mai sarrafawa rajista:** a cikin `src/lib/a2a/taskExecution.ts`, ƙara shigarwa zuwa `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...ƙwarewar da ke akwai
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Bayyana a Katin Wakili:** a cikin `src/app/.well-known/agent.json/route.ts`, ƙara zuwa jerin `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Rubuta gwaje-gwaje:** `tests/unit/a2a-<your-skill>.test.ts`. Gwada hanyar nasara da hanyar kuskure.

5. **Rubuta bayanin** sabuwar ƙwarewar a teburin `Available Skills` na wannan fayil.

---

## TTL na Aiki

Ayyuka suna ƙarewa bayan `ttlMinutes` (tsoho mintuna 5) — an saita shi a cikin constructor na `A2ATaskManager` da ke `src/lib/a2a/taskManager.ts:82`. Don keɓancewa, yi fork na ƙirƙirar `A2ATaskManager` sannan ka tura wata ƙima dabam (misali, `new A2ATaskManager(15)` don TTL na mintuna 15). Wani interval da ke gudana a bango yana share ayyukan da suka ƙare a kowane sakan 60.

---

## Zagayowar Rayuwar Aiki

```
an gabatar → ana aiki → an kammala
                       → ya gaza
                       → an soke
```

- Ayyuka suna ƙarewa bayan mintuna 5 ta tsohuwa (duba [TTL na Aiki](#task-ttl))
- Matakan ƙarshe: `completed`, `failed`, `cancelled`
- Rajistar events tana bin diddigin kowane sauyin matsayi

---

## Lambobin Kuskure

| Lamba  | Ma'ana                                 |
| :----- | :------------------------------------- |
| -32700 | Kuskuren parse (JSON mara inganci)     |
| -32600 | Buƙata mara inganci / Ba a ba izini ba |
| -32601 | Ba a sami method ko skill ba           |
| -32602 | Params marasa inganci                  |
| -32603 | Kuskuren cikin gida                    |
| -32000 | An kashe endpoint na A2A               |

---

## Misalan Haɗawa

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
