# A2A-SERVER (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

---

title: "OmniRoute A2A Server Dokumentatsioon"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute A2A Server Dokumentatsioon

> Agent-to-Agent Protokoll v0.3 — OmniRoute intelligendi marsruutimisagendina

A2A pinna kaks palet:

- **JSON-RPC 2.0** asukohal `POST /a2a` (kanoniline sisenemispunkt, määratud failis `src/app/a2a/route.ts`).
- **REST** aadressil `/api/a2a/*` juhtpaneelide ja tööriistade jaoks (olek, ülesannete loetelu, tühistamine).

Ülesandeid jälgitakse `A2ATaskManager`-iga (`src/lib/a2a/taskManager.ts`, vaikimisi 5-minutiline TTL). Oskusi distribueeritakse `A2A_SKILL_HANDLERS` abil failis `src/lib/a2a/taskExecution.ts`.

## Agentide Avastamine

```bash
curl http://localhost:20128/.well-known/agent.json
```

Tagastab Agent Card'i, mis kirjeldab OmniRoute'i võimeid, oskusi ja autentimisnõudeid.

Agent Card'i `version` väärtus pärineb `process.env.npm_package_version` (vt `src/app/.well-known/agent.json/route.ts:13`), nii et see sünkroonitakse automaatselt `package.json`-iga igal väljalaskel.

---

## Autentimine

Kõikidele `/a2a` päringutele on vajalik API võti päises `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Kui serveril ei ole API võtit seadistatud, autentimine vahele jäetakse.

## Lubamine

A2A-d kontrollib **Endpoints → A2A** lüliti ja see on vaikimisi keelatud. Keelamise korral
tagastab `GET /api/a2a/status` väärtused `status: "disabled"` ja `online: false`; JSON-RPC kutsed
aadressile `POST /a2a` annavad HTTP 503 koos JSON-RPC veakoodiga `-32000`.

---

## JSON-RPC 2.0 Meetodid

### `message/send` — Sünkroonne Täitmine

Saadab sõnumi oskusele ja ootab täielikku vastust.

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

**Vastus:**

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

### `message/stream` — SSE Voog

Sarnane `message/send`-iga, aga tagastab Server-Sent Events reaalajas voogu jaoks.

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

**SSE Sündmused:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Küsi Ülesande Olekut

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Tühista Ülesanne

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Saadaolevad oskused

OmniRoute paljastab 6 A2A oskust, mis on ühendatud `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Iga oskuste moodul asub `src/lib/a2a/skills/`.

| Oskus                     | ID                   | Kirjeldus                                                                                                                                            | Sildid                         | Näited                                              |
| :------------------------ | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------- | :-------------------------------------------------- |
| Nutikas marsruutimine     | `smart-routing`      | Marsruutib prompti optimaalse teenusepakkuja/kombinatsiooni kaudu, kasutades OmniRoute'i kombinatsioonimootorit + skoorimist                         | marsruutimine, teenusepakkujad | "Marsruuta see prompt parima mudeli kaudu"          |
| Kvoodihaldus              | `quota-management`   | Annab teada teenusepakkujate kohta kvoodi olekust, aitab vastajatel otsustada, millal kiirust piirata/vahetada                                       | kvoot, teenusepakkujad         | "Kontrolli AnthroPici kvooti"                       |
| Teenusepakkuja avastamine | `provider-discovery` | Loetleb installitud teenusepakkujad koos võimalustega, tasuta tsoonide lippudega, OAuthi olekuga                                                     | teenusepakkujad, avastamine    | "Millised teenusepakkujad on saadaval?"             |
| Kuluanalüüs               | `cost-analysis`      | Hindab päringu/vestluse kulu, võttes arvesse kataloogi ja hiljutist kasutust                                                                         | kulu, kasutus                  | "Hinda selle vestluse kulu"                         |
| Tervisaruanne             | `health-report`      | Koondab iga teenusepakkuja vooluringi katkestaja, jahtumisaja, lukustamise oleku                                                                     | tervis, vastupidavus           | "Näita kõigi teenusepakkujate tervislikkuse olekut" |
| Võimaluste loendamine     | `list-capabilities`  | Tagastab täieliku 45-kande kataloogi (23 API-d + 21 CLI-d + 1 konfiguratsiooni) markdown-tabelina koos SKILL.md toor-URL-idega konteksti süstimiseks | kataloog, avastamine, oskused  | "Loetle kõik OmniRoute'i võimalused"                |

> Agent Card peaks olema kooskõlas reaalse 352-teenusepakkuja kataloogiga; teenusepakkujate arv ja tasuta/autentimisvaba metaandmed pärinevad tööaegsest registrile.

### `list-capabilities` oskuse üksikasjad

Oskus `list-capabilities` on eriti kasulik välistele agentidele, kes peavad enne API-käskude saatmist avastama, mida OmniRoute pakub. See tagastab struktureeritud markdown-tabeli objekti:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Iga rida sisaldab `rawUrl` veergu, et agendid saaksid koheldata täieliku SKILL.md. Väli `metadata.totalSkills` peegeldab kataloogi suurust (tänapäeval 45). Rakendus: `src/lib/a2a/skills/listCapabilities.ts`. Vaata ka [AGENT-SKILLS.md](./AGENT-SKILLS.md).

## REST API (abiseadmed)

JSON-RPC-i lõpp-punkt `/a2a` on kanoniline A2A sisenemispunkt. Allpool toodud REST lõpp-punktid pakuvad lisapääsu juhtpaneelidele ja välistööriistadele:

| Lõpp-punkt                   | Meetod | Kirjeldus                                                            | Autentimine                                  |
| :--------------------------- | :----- | :------------------------------------------------------------------- | :------------------------------------------- |
| `/api/a2a/status`            | GET    | Serveri staatus, registreeritud oskused                              | (avalik)                                     |
| `/api/a2a/tasks`             | GET    | Tegevuste loend filtritega                                           | haldus                                       |
| `/api/a2a/tasks/[id]`        | GET    | Tegevuse saamine ID järgi                                            | haldus                                       |
| `/api/a2a/tasks/[id]/cancel` | POST   | Töötava tegevuse tühistamine                                         | haldus                                       |
| `/.well-known/agent.json`    | GET    | Agent Card (A2A avastus)                                             | (avalik, vahemälu 3600s)                     |
| `/api/a2a/tasks`             | POST   | Sisenev delegeerimine OmniConductor laevastikule (Conductor PRD RF5) | Bearer vs `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Sisenev Conductor delegeerimine (`POST /api/a2a/tasks`):** välised A2A agendid delegeerivad programmeerimistööd OmniConductor laevastikule OmniRoute'i kaudu. Sisu: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — ainult Conductor laevastiku oskused (need, mis on teatatud Agent Cardis) on delegeeritavad; `metadata.conductor.repo.url` on kohustuslik (laevastik töötab git-hoidlatest). Marsruut tõlgitakse keskuse `POST /v1/tasks` kasutades serveripoolset `CONDUCTOR_ORCHESTRATOR_TOKEN` (tagasivõte `CONDUCTOR_HUB_TOKEN`) ja tagastab `201 { conductor_task_id, state: "submitted" }`; tegevuste olekud edastatakse tagasi läbi SSE→A2A peegelduse (RF1) ja on nähtavad `GET /api/a2a/tasks?skill=conductor` abil.

---

## Uue oskuse lisamine

1. **Loo oskuse fail:** `src/lib/a2a/skills/<teie-oskus>.ts`

   Ekspordi asünkroonne funktsioon `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Järgi olemasolevate oskuste struktuuri, nagu `smartRouting.ts`.

2. **Registreeri käitleja:** `src/lib/a2a/taskExecution.ts` failis lisa kanne `A2A_SKILL_HANDLERS` objekti:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...olemasolevad oskused
     "teie-oskus": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Näita Agent Card-is:** `src/app/.well-known/agent.json/route.ts` failis lisa `skills` massiivi lõppu:

   ```json
   {
     "id": "teie-oskus",
     "name": "Teie Oskus",
     "description": "Lühike, kavatsusele keskendunud kirjeldus",
     "tags": ["marsruutimine", "kvooot"],
     "examples": "Näidisloomuliku keele kutsed"]
   }
   ```

4. **Kirjuta testid:** `tests/unit/a2a-<teie-oskus>.test.ts`. Katke edukas + vigane tee.

5. **Dokumenteeri** uus oskus selle faili `Saadaolevad oskused` tabelis.

---

## Ülesande TTL

Ülesanded aeguvad pärast `ttlMinutes` (vaikimisi 5 minutit) — konfigureeritud `A2ATaskManager` konstruktoris failis `src/lib/a2a/taskManager.ts:82`. Kohandamiseks eraldage `A2ATaskManager` instants ja edastage erinev väärtus (nt `new A2ATaskManager(15)` 15-minutilise TTL jaoks). Taustaintervall puhastab aegunud ülesanded iga 60 sekundi tagant.

---

## Ülesande elutsükkel

```
esitatud → töös → valmis
                → ebaõnnestunud
                → tühistatud
```

- Ülesanded aeguvad vaikimisi 5 minuti pärast (vt [Ülesande TTL](#ülesande-ttl))
- Lõppseisundid: `valmis`, `ebaõnnestunud`, `tühistatud`
- Sündmuste logi jälgib igat seisundimuutust

---

## Vea koodid

| Kood   | Tähendus                   |
| :----- | :------------------------- |
| -32700 | Parse error (vigane JSON)  |
| -32600 | Vigane päring / volitamata |
| -32601 | Meetod või oskus leitud    |
| -32602 | Vigased parameetrid        |
| -32603 | Sisemine viga              |
| -32000 | A2A otspunkt on keelatud   |

---

## Integratsiooni näited

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
