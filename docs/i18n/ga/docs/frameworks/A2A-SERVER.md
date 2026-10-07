# OmniRoute A2A Server Documentation (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Prótacal Gníomhaire le Gníomhaire v0.3 — OmniRoute mar ghníomhaire ródaithe cliste

Tá dhá aghaidh ar dhromchla A2A:

- **JSON-RPC 2.0** ag `POST /a2a` (an pointe iontrála canónach, sainithe in `src/app/a2a/route.ts`).
- **REST** faoi `/api/a2a/*` le haghaidh deaiseanna agus uirlisí (stádas, liosta tascanna, cealú).

Déanann `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL réamhshocraithe 5 nóiméad) tascanna a rianú. Seoltar scileanna trí `A2A_SKILL_HANDLERS` in `src/lib/a2a/taskExecution.ts`.

## Fionnachtain Gníomhairí

```bash
curl http://localhost:20128/.well-known/agent.json
```

Tugtar ar ais an Cárta Gníomhaire ina ndéantar cur síos ar chumais, scileanna agus riachtanais fíordheimhnithe OmniRoute.

Faightear réimse `version` an Chárta Gníomhaire ó `process.env.npm_package_version` (féach `src/app/.well-known/agent.json/route.ts:13`), mar sin fanann sé sioncronaithe go huathoibríoch le `package.json` le gach eisiúint.

---

## Fíordheimhniú

Teastaíonn eochair API ó gach iarratas `/a2a` tríd an gceanntásc `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Mura bhfuil aon eochair API cumraithe ar an bhfreastalaí, seachnaítear an fíordheimhniú.

## Cumasú

Rialaítear A2A leis an scorán **Críochphointí → A2A** agus tá sé díchumasaithe de réir réamhshocraithe. Nuair atá sé díchumasaithe,
tuairiscíonn `GET /api/a2a/status` `status: "disabled"` agus `online: false`; tugann glaonna JSON-RPC chuig
`POST /a2a` HTTP 503 ar ais le cód earráide JSON-RPC `-32000`.

---

## Modhanna JSON-RPC 2.0

### `message/send` — Rith Sioncrónach

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

Mar an gcéanna le `message/send`, ach tugann sé Imeachtaí arna Seoladh ag an bhFreastalaí ar ais le haghaidh sruthú fíor-ama.

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

### `tasks/get` — Stádas Taisc a Fhiosrú

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Tasc a Chealú

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Scileanna atá ar Fáil

Nochtann OmniRoute 6 scil A2A atá sreangaithe in `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Tá gach modúl scile suite in `src/lib/a2a/skills/`.

| Scil                | ID                   | Cur Síos                                                                                                                                                               | Clibeanna                  | Samplaí                                        |
| :------------------ | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :--------------------------------------------- |
| Ródú Cliste         | `smart-routing`      | Ródálann sé leid tríd an soláthraí/teaglaim is fearr trí úsáid a bhaint as inneall teaglamaí + scóráil OmniRoute                                                       | ródú, soláthraithe         | "Ródáil an leid seo tríd an tsamhail is fearr" |
| Bainistiú Cuóta     | `quota-management`   | Tuairiscíonn sé staid chuóta gach soláthraí agus cabhraíonn sé le glaoiteoirí cinneadh a dhéanamh cathain is ceart moilliú/athrú                                       | cuóta, soláthraithe        | "Seiceáil cuóta anthropic"                     |
| Aimsiú Soláthraithe | `provider-discovery` | Liostaíonn sé soláthraithe suiteáilte mar aon lena gcumais, bratacha saorleibhéil agus stádas OAuth                                                                    | soláthraithe, aimsiú       | "Cad iad na soláthraithe atá ar fáil?"         |
| Anailís Costais     | `cost-analysis`      | Measann sé costas iarratais/comhrá bunaithe ar an gcatalóg + úsáid le déanaí                                                                                           | costas, úsáid              | "Meas costas an chomhrá seo"                   |
| Tuairisc Sláinte    | `health-report`      | Comhiomlánaíonn sé staid an scoradáin chiorcaid, na tréimhse fuaraithe agus an fhrithdhúnadh do gach soláthraí                                                         | sláinte, athléimneacht     | "Taispeáin stádas sláinte gach soláthraí"      |
| Liostaigh Cumais    | `list-capabilities`  | Seolann sé catalóg iomlán 45 iontráil Scileanna Gníomhairí (23 API + 21 CLI + 1 chumraíocht) mar thábla markdown le URLanna amh SKILL.md chun comhthéacs a instealladh | catalóg, aimsiú, scileanna | "Liostaigh cumais uile OmniRoute"              |

> Ba cheart Cárta an Ghníomhaire a choinneáil ailínithe leis an gcatalóg bheo ina bhfuil 352 soláthraí; faightear líon na soláthraithe agus meiteashonraí saor in aisce/gan fíordheimhniú ón gclárlann ag am rite.

### Sonraí faoin Scil `list-capabilities`

Tá an scil `list-capabilities` thar a bheith úsáideach do ghníomhairí seachtracha ar gá dóibh a fháil amach cad a nochtann OmniRoute sula seolann siad glaonna API. Seolann sí déantán tábla markdown struchtúrtha:

```
| ID | Ainm | Catagóir | Réimse | Críochphointí/Orduithe | URL Amh |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Fíordheimhniú & Seisiúin | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Áirítear an colún `rawUrl` i ngach ró ionas gur féidir le gníomhairí an SKILL.md iomlán a fháil láithreach. Léiríonn an réimse `metadata.totalSkills` méid na catalóige (45 inniu). Cur chun feidhme: `src/lib/a2a/skills/listCapabilities.ts`. Féach freisin [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (cúnta)

Is é críochphointe JSON-RPC `/a2a` an pointe iontrála canónta A2A. Soláthraíonn na críochphointí REST thíos rochtain chúnta do dheaiseanna agus d’uirlisí seachtracha:

| Críochphointe                | Modh | Cur síos                                                        | Fíordheimhniú                                       |
| :--------------------------- | :--- | :-------------------------------------------------------------- | :-------------------------------------------------- |
| `/api/a2a/status`            | GET  | Stádas an fhreastalaí, scileanna cláraithe                      | (poiblí)                                            |
| `/api/a2a/tasks`             | GET  | Liosta tascanna le scagairí                                     | bainistíocht                                        |
| `/api/a2a/tasks/[id]`        | GET  | Faigh tasc de réir ID                                           | bainistíocht                                        |
| `/api/a2a/tasks/[id]/cancel` | POST | Cealaigh tasc atá ar siúl                                       | bainistíocht                                        |
| `/.well-known/agent.json`    | GET  | Cárta Gníomhaire (fionnachtain A2A)                             | (poiblí, i dtaisce ar feadh 3600s)                  |
| `/api/a2a/tasks`             | POST | Tarmligean isteach chuig flít OmniConductor (Conductor PRD RF5) | Bearer i gcoinne `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Tarmligean isteach Conductor (`POST /api/a2a/tasks`):** tarmligeann gníomhairí seachtracha A2A obair chódúcháin chuig flít OmniConductor trí OmniRoute. Corp: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — ní féidir ach scileanna fhlít Conductor (na cinn a fhógraítear ar an gCárta Gníomhaire) a tharmligean; tá `metadata.conductor.repo.url` riachtanach (oibríonn an flít ar stórtha git). Aistrítear an bealach go `POST /v1/tasks` an mhoil agus úsáid á baint as `CONDUCTOR_ORCHESTRATOR_TOKEN` ar thaobh an fhreastalaí (`CONDUCTOR_HUB_TOKEN` mar chúltaca), agus seoltar `201 { conductor_task_id, state: "submitted" }` ar ais; sreabhann staideanna tascanna ar ais tríd an scáthán SSE→A2A (RF1) agus tá siad infheicthe trí `GET /api/a2a/tasks?skill=conductor`.

---

## Scil Nua a Chur Leis

1. **Cruthaigh comhad scile:** `src/lib/a2a/skills/<your-skill>.ts`

   Easpórtáil feidhm async `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Lean struchtúr na scileanna atá ann cheana, amhail `smartRouting.ts`.

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

3. **Nocht sa Chárta Gníomhaire é:** in `src/app/.well-known/agent.json/route.ts`, cuir leis an eagar `skills` é:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Scríobh tástálacha:** `tests/unit/a2a-<your-skill>.test.ts`. Clúdaigh an cás rathúil + an cás earráide.

5. **Doiciméadaigh** an scil nua i dtábla `Available Skills` an chomhaid seo.

---

## TTL an Taisc

Téann tascanna in éag tar éis `ttlMinutes` (5 nóiméad de réir réamhshocraithe) — cumraithe i gcruthaitheoir `A2ATaskManager` ag `src/lib/a2a/taskManager.ts:82`. Chun é seo a shaincheapadh, forcáil tionscnamh `A2ATaskManager` agus cuir luach difriúil ar aghaidh (m.sh., `new A2ATaskManager(15)` le haghaidh TTL 15 nóiméad). Glanann eatramh cúlra na tascanna atá imithe in éag gach 60 soicind.

---

## Saolré an Taisc

```
curtha isteach → ar siúl → críochnaithe
                         → teipthe
                         → curtha ar ceal
```

- Téann tascanna in éag tar éis 5 nóiméad de réir réamhshocraithe (féach [TTL an Taisc](#task-ttl))
- Staideanna deiridh: `completed`, `failed`, `cancelled`
- Rianaíonn loga na dteagmhas gach aistriú staide

---

## Cóid Earráide

| Cód    | Brí                                   |
| :----- | :------------------------------------ |
| -32700 | Earráid pharsála (JSON neamhbhailí)   |
| -32600 | Iarratas neamhbhailí / Neamhúdaraithe |
| -32601 | Modh nó scil gan aimsiú               |
| -32602 | Paraiméadair neamhbhailí              |
| -32603 | Earráid inmheánach                    |
| -32000 | Tá críochphointe A2A díchumasaithe    |

---

## Samplaí Comhtháthaithe

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
