# A2A-SERVER (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

---

title: "Doiciméadú Freastalaí OmniRoute A2A"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Doiciméadú Freastalaí OmniRoute A2A

> Prótacal Gníomhaire-go-Gníomhaire v0.3 — OmniRoute mar ghníomhaire ródaithe cliste

Tá dhá ghné leis an gcomhéadan A2A:

- **JSON-RPC 2.0** ag `POST /a2a` (pointe iontrála caighdeánach, sainmhínithe i `src/app/a2a/route.ts`).
- **REST** faoi `/api/a2a/*` do dheais agus uirlisí (stádas, liosta tascanna, cealú).

Rianaíonn `A2ATaskManager` tascanna (`src/lib/a2a/taskManager.ts`, TTL 5 nóiméad de réir réamhshocraithe). Seoltar scileanna trí `A2A_SKILL_HANDLERS` i `src/lib/a2a/taskExecution.ts`.

## Fionnachtain Gníomhaire

```bash
curl http://localhost:20128/.well-known/agent.json
```

Tugann sé an Cárta Gníomhaire ar ais a chuireann síos ar chumais, scileanna, agus riachtanais fhíordheimhnithe OmniRoute.

Tá réimse `version` an Chárta Gníomhaire tógtha ó `process.env.npm_package_version` (féach `src/app/.well-known/agent.json/route.ts:13`), mar sin fanann sé uathshioncronaithe le `package.json` ar gach scaoileadh.

---

## Fíordheimhniú

Éilíonn gach iarratas `/a2a` eochair API trí cheanntásc `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Mura bhfuil aon eochair API cumraithe ar an bhfreastalaí, déantar fíordheimhniú a sheachaint.

## Cumasú

Rialaítear A2A ag an scorán **Endpoints → A2A** agus tá sé díchumasaithe de réir réamhshocraithe. Nuair a bhíonn sé díchumasaithe, tuairiscíonn `GET /api/a2a/status` `status: "disabled"` agus `online: false`; tugann glaonna JSON-RPC ar `POST /a2a` HTTP 503 ar ais le cód earráide JSON-RPC `-32000`.

---

## Modhanna JSON-RPC 2.0

### `message/send` — Forghníomhú Sioncrónach

Seolann sé teachtaireacht chuig scil agus fanann sé leis an bhfreagra iomlán.

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

**Freagra:**

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

### `message/stream` — Sruthú SSE

Mar an gcéanna le `message/send` ach tugann sé Server-Sent Events ar ais le haghaidh sruthú fíor-ama.

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

**Imeachtaí SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Fiosrú Stádas Tasc

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Cealú Tasc

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Scileanna ar Fáil

Léiríonn OmniRoute 6 scileanna A2A wired i `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Tá gach modúl scileanna i `src/lib/a2a/skills/`.

| Scileanna           | ID                   | Cur Síos                                                                                                                                                                   | Clibeanna                  | Samplaí                                             |
| :------------------ | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :-------------------------------------------------- |
| Ródáil Chliste      | `smart-routing`      | Ródálann sé luaidh trí an soláthraí/comhoibriú is fearr ag baint úsáide as inneall comhoibriú OmniRoute + scóráil                                                          | ródáil, soláthraithe       | "Ródáil an t-aiomhrá seo tríd an tsamhail is fearr" |
| Bainistíocht Cuóta  | `quota-management`   | Tuairiscíonn stádas cuóta in aghaidh an tsoláthraí, cuidíonn sé le glaoiteoirí a chinneadh cathain a dhéanamh rialú/athrú                                                  | cuóta, soláthraithe        | "Seiceáil cuóta do anthropic"                       |
| Aimsiú Soláthraithe | `provider-discovery` | Liostann soláthraithe suiteáilte le cumais, bratacha saor-tléibhse, stádas OAuth                                                                                           | soláthraithe, aimsiú       | "Cén soláthraithe atá ar fáil?"                     |
| Anailís Costais     | `cost-analysis`      | Measann costas iarratais/comhrá agus an catalóg le húsáid le déanaí                                                                                                        | costas, úsáid              | "Meas costas don chomhrá seo"                       |
| Tuairisc Sláinte    | `health-report*      | Comhtháthaíonn sé briseadh circuit, fuarú, stádas glasála in aghaidh an tsoláthraí                                                                                         | sláinte, athléimneacht     | "Taispeáin stádas sláinte na soláthróirí uile"      |
| Liostú Cumais       | `list-capabilities`  | Filleann sé tábla marcála iomlán 45 iontráil de Chatalóg Scileanna an tseibhse (23 API + 21 CLI + 1 cumraíocht) le URLanna RAW SKILL.md le haghaidh instealladh comhthéacs | catalóg, aimsiú, scileanna | "Liostaigh cumais OmniRoute go léir"                |

> Ba cheart go mbeadh Chairt an tSeibhse ailínithe le catalóg reatha 352 soláthraí; tagann líon na soláthróirí agus metadata saor/an-údaraithe ó chlár rith.

### Sonraí Scileanna `list-capabilities`

Tá an scileanna `list-cumas` úsáideach go háirithe d'heimhneáin sheachtracha a bhfuil gá acu aimsiú cad a nochann OmniRoute sula seolann siad glaonna API. Filleann sé tábla marcála struchtúrtha:

```
| ID | Ainm | Catagóir | Limistéar | Deireadhanna/Ceanna | URL RAW |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Údarú & Seisiúin | api | údarú | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Tá colún `rawUrl i ngach ró ionas gur féidir le heimhneáin an SKILL.md iomlán a fháil láithreach. Scáileán `metadata.totalSkills`scáileanna méid an chatalóig (45 inniu). Tá feidhmiúcháin i`src/lib/a2a/skills/listCapabilities.ts`. Féach freisin [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (cúnta)

Is é an pointe deiridh JSON-RPC `/a2a` an príomhbhealach isteach A2A. Soláthraíonn na pointí deiridh REST thíos rochtain chúnta do dheais agus d'uirlisí seachtracha:

| Pointe deiridh               | Modh | Cur síos                                                            | Údarú                                        |
| :--------------------------- | :--- | :------------------------------------------------------------------ | :------------------------------------------- |
| `/api/a2a/status`            | GET  | Stádas freastalaí, scileanna cláraithe                              | (poiblí)                                     |
| `/api/a2a/tasks`             | GET  | Liostaigh tascanna le scagairí                                      | bainistíocht                                 |
| `/api/a2a/tasks/[id]`        | GET  | Faigh tasc de réir ID                                               | bainistíocht                                 |
| `/api/a2a/tasks/[id]/cancel` | POST | Cealaigh tasc atá ar siúl                                           | bainistíocht                                 |
| `/.well-known/agent.json`    | GET  | Cárta Gníomhaire (aimsiú A2A)                                       | (poiblí, i dtaisce 3600s)                    |
| `/api/a2a/tasks`             | POST | Tarmligean isteach chuig cabhlach OmniConductor (Conductor PRD RF5) | Bearer vs `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Tarmligean Conductor isteach (`POST /api/a2a/tasks`):** tarmligann gníomhairí seachtracha A2A obair chódaithe chuig cabhlach OmniConductor trí OmniRoute. Comhlacht: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — ní féidir ach scileanna cabhlaigh Conductor (na cinn a fhógraítear ar an gCárta Gníomhaire) a tharmligean; tá `metadata.conductor.repo.url` riachtanach (oibríonn an cabhlach ar stórtha git). Aistríonn an bealach go dtí `POST /v1/tasks` an mhoil ag úsáid `CONDUCTOR_ORCHESTRATOR_TOKEN` ar an taobh freastalaí (titim ar ais go `CONDUCTOR_HUB_TOKEN`) agus filleann sé `201 { conductor_task_id, state: "submitted" }`; sníonn stáit tasc ar ais tríd an scáthán SSE→A2A (RF1) agus tá siad le feiceáil trí `GET /api/a2a/tasks?skill=conductor`.

---

## Scil Nua a Chur Leis

1. **Cruthaigh comhad scile:** `src/lib/a2a/skills/<your-skill>.ts`

   Easpórtáil feidhm async `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Lean cruth na scileanna atá ann cheana mar `smartRouting.ts`.

2. **Cláraigh an láimhseálaí:** in `src/lib/a2a/taskExecution.ts`, cuir iontráil le `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...scileanna atá ann cheana
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Nocht ar an gCárta Gníomhaire:** in `src/app/.well-known/agent.json/route.ts`, ceangail leis an eagar `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Do Scil",
     "description": "Cur síos gairid, dírithe ar intinn",
     "tags": ["routing", "quota"],
     "examples": ["Sampla de ghlaoch teanga nádúrtha"]
   }
   ```

4. **Scríobh tástálacha:** `tests/unit/a2a-<your-skill>.test.ts`. Clúdaigh an cosán sona + cosán earráide.

5. **Doiciméadaigh** an scil nua i dtábla `Scileanna ar Fáil` an chomhaid seo.

## TTL Tascanna

Imíonn tascanna tar éis `ttlMinutes` (réamhshocrú 5 nóiméad) — coinnítear é seo i gcoinneoir tógála `A2ATaskManager` ag `src/lib/a2a/taskManager.ts:82`. Chun é a shaincheapadh, déan fork ar instaint `A2ATaskManager` agus tabhair luach éagsúil (m.sh., `new A2ATaskManager(15)` le haghaidh TTL 15 nóiméad). Déanann eatramh cúltaca glanadh ar thascanna imithe in éag gach 60 soicind.

---

## Saolré Tascanna

```
→ áirithe → ag obair → críochnaithe
                  → theip
                  → cealaithe
```

- Imíonn tascanna i ndiaidh 5 nóiméad de réir réamhshocraithe (féach [TTL Tascanna](#ttl-tascanna))
- Stáit deiridh: `críochnaithe`, `theip`, `cealaithe`
- Rianaíonn loga imeartha gach athrú stáit

---

## Códanna Earráide

| Cód     | Ciall                                   |
| :------ | :-------------------------------------- |
| -32700  | Earráid pharsála (JSON neamhcheadaithe) |
| -32600  | Iarratas neamhcheadaithe / Unauthorized |
| -32601  | Modh nó scile gan aimsiú                |
| -32602  | Paraiméadair neamhcheadaithe            |
| - 32603 | Earráid inmheánach                      |
| -32000  | Tá críochfort A2A díchumasaithe         |

---

## Samplaí Comhtháthúcháin

### Python (requests)

```python
import requests

freagra = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Dia dhuit"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

toradh = freagra.json()["result"]
print(toradh["artifacts"][0]["content"])
print(toradh["metadata"]["routing_explanation"])
```

### TypeScript (fetch)

```typescript
const freagra = await fetch("http://localhost:20128/a2a", {
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
      messages: [{ role: "user", content: "Dia dhuit" }],
    },
  }),
});
const { result } = await freagra.json();
console.log(result.metadata.routing_explanation);
```
