# OmniRoute A2A Server Documentation (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-till-agent-protokoll v0.3 — OmniRoute som en intelligent routningsagent

A2A-gränssnittet har två sidor:

- **JSON-RPC 2.0** på `POST /a2a` (kanonisk startpunkt, definierad i `src/app/a2a/route.ts`).
- **REST** under `/api/a2a/*` för instrumentpaneler och verktyg (status, uppgiftslista, avbrytande).

Uppgifter spåras av `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, förvald TTL på 5 minuter). Färdigheter dirigeras via `A2A_SKILL_HANDLERS` i `src/lib/a2a/taskExecution.ts`.

## Agentidentifiering

```bash
curl http://localhost:20128/.well-known/agent.json
```

Returnerar agentkortet som beskriver OmniRoutes funktioner, färdigheter och autentiseringskrav.

Agentkortets `version`-fält hämtas från `process.env.npm_package_version` (se `src/app/.well-known/agent.json/route.ts:13`), så det hålls automatiskt synkroniserat med `package.json` vid varje utgåva.

---

## Autentisering

Alla förfrågningar till `/a2a` kräver en API-nyckel via `Authorization`-headern:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Om ingen API-nyckel är konfigurerad på servern kringgås autentiseringen.

## Aktivering

A2A styrs med växlingsknappen **Endpoints → A2A** och är inaktiverat som standard. När det är inaktiverat
rapporterar `GET /api/a2a/status` `status: "disabled"` och `online: false`; JSON-RPC-anrop till
`POST /a2a` returnerar HTTP 503 med JSON-RPC-felkoden `-32000`.

---

## JSON-RPC 2.0-metoder

### `message/send` — Synkron körning

Skickar ett meddelande till en färdighet och väntar på det fullständiga svaret.

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

**Svar:**

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

### `message/stream` — SSE-strömning

Samma som `message/send`, men returnerar Server-Sent Events för strömning i realtid.

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

**SSE-händelser:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Hämta uppgiftsstatus

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Avbryt en uppgift

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Tillgängliga färdigheter

OmniRoute exponerar 6 A2A-färdigheter som är kopplade i `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Varje färdighetsmodul finns i `src/lib/a2a/skills/`.

| Färdighet                | ID                   | Beskrivning                                                                                                                                                  | Taggar                              | Exempel                                        |
| :----------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------- | :--------------------------------------------- |
| Smart dirigering         | `smart-routing`      | Dirigerar en prompt via den optimala leverantören/kombinationen med hjälp av OmniRoutes kombinationsmotor och poängsättning                                  | dirigering, leverantörer            | "Dirigera denna prompt via den bästa modellen" |
| Kvothantering            | `quota-management`   | Rapporterar kvotstatus per leverantör och hjälper anropare att avgöra när de ska begränsa hastigheten/byta                                                   | kvot, leverantörer                  | "Kontrollera kvoten för anthropic"             |
| Leverantörsidentifiering | `provider-discovery` | Listar installerade leverantörer med funktioner, kostnadsfria nivåer och OAuth-status                                                                        | leverantörer, identifiering         | "Vilka leverantörer är tillgängliga?"          |
| Kostnadsanalys           | `cost-analysis`      | Uppskattar kostnaden för en begäran/konversation utifrån katalogen och den senaste användningen                                                              | kostnad, användning                 | "Uppskatta kostnaden för denna konversation"   |
| Hälsorapport             | `health-report`      | Sammanställer status för kretsbrytare, nedkylning och utelåsning per leverantör                                                                              | hälsa, motståndskraft               | "Visa hälsostatus för alla leverantörer"       |
| Lista funktioner         | `list-capabilities`  | Returnerar hela Agent Skills-katalogen med 45 poster (23 API + 21 CLI + 1 konfiguration) som en markdown-tabell med råa SKILL.md-URL:er för kontextinjektion | katalog, identifiering, färdigheter | "Lista alla OmniRoute-funktioner"              |

> Agentkortet bör hållas synkroniserat med den aktiva katalogen med 352 leverantörer. Antal leverantörer och metadata om kostnadsfri/ingen autentisering hämtas från körningsregistret.

### Detaljer om färdigheten `list-capabilities`

Färdigheten `list-capabilities` är särskilt användbar för externa agenter som behöver ta reda på vad OmniRoute exponerar innan de skickar API-anrop. Den returnerar en strukturerad markdown-tabellartefakt:

```
| ID | Namn | Kategori | Område | Slutpunkter/kommandon | Rå URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Autentisering och sessioner | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Varje rad innehåller kolumnen `rawUrl` så att agenter omedelbart kan hämta hela SKILL.md. Fältet `metadata.totalSkills` motsvarar katalogens storlek (45 i dag). Implementering: `src/lib/a2a/skills/listCapabilities.ts`. Se även [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST-API (kompletterande)

JSON-RPC-slutpunkten `/a2a` är den kanoniska startpunkten för A2A. REST-slutpunkterna nedan ger kompletterande åtkomst för instrumentpaneler och externa verktyg:

| Slutpunkt                    | Metod | Beskrivning                                                          | Autentisering                                 |
| :--------------------------- | :---- | :------------------------------------------------------------------- | :-------------------------------------------- |
| `/api/a2a/status`            | GET   | Serverstatus, registrerade färdigheter                               | (offentlig)                                   |
| `/api/a2a/tasks`             | GET   | Lista uppgifter med filter                                           | administration                                |
| `/api/a2a/tasks/[id]`        | GET   | Hämta uppgift via ID                                                 | administration                                |
| `/api/a2a/tasks/[id]/cancel` | POST  | Avbryt pågående uppgift                                              | administration                                |
| `/.well-known/agent.json`    | GET   | Agentkort (A2A-identifiering)                                        | (offentlig, cachelagras i 3600 s)             |
| `/api/a2a/tasks`             | POST  | Inkommande delegering till OmniConductor-flottan (Conductor PRD RF5) | Bearer mot `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Inkommande Conductor-delegering (`POST /api/a2a/tasks`):** externa A2A-agenter delegerar programmeringsarbete till OmniConductor-flottan via OmniRoute. Innehåll: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — endast färdigheter för Conductor-flottan (de som anges på agentkortet) kan delegeras; `metadata.conductor.repo.url` är obligatorisk (flottan arbetar med git-arkiv). Rutten översätts till hubbens `POST /v1/tasks` med `CONDUCTOR_ORCHESTRATOR_TOKEN` på serversidan (`CONDUCTOR_HUB_TOKEN` används som reserv) och returnerar `201 { conductor_task_id, state: "submitted" }`; uppgiftstillstånd återförs via SSE→A2A-speglingen (RF1) och visas via `GET /api/a2a/tasks?skill=conductor`.

---

## Lägga till en ny färdighet

1. **Skapa färdighetsfilen:** `src/lib/a2a/skills/<your-skill>.ts`

   Exportera en asynkron funktion `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Följ strukturen för befintliga färdigheter såsom `smartRouting.ts`.

2. **Registrera hanteraren:** lägg till en post i `A2A_SKILL_HANDLERS` i `src/lib/a2a/taskExecution.ts`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...befintliga färdigheter
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Exponera i agentkortet:** lägg till följande i arrayen `skills` i `src/app/.well-known/agent.json/route.ts`:

   ```json
   {
     "id": "your-skill",
     "name": "Din färdighet",
     "description": "Kortfattad, avsiktsfokuserad beskrivning",
     "tags": ["routing", "quota"],
     "examples": ["Exempel på anrop med naturligt språk"]
   }
   ```

4. **Skriv tester:** `tests/unit/a2a-<your-skill>.test.ts`. Täck både lyckat flöde och felflöde.

5. **Dokumentera** den nya färdigheten i tabellen `Available Skills` i den här filen.

---

## TTL för uppgifter

Uppgifter upphör att gälla efter `ttlMinutes` (standardvärde 5 min) – konfigureras i konstruktorn för `A2ATaskManager` i `src/lib/a2a/taskManager.ts:82`. För att anpassa detta kan du förgrena instansieringen av `A2ATaskManager` och ange ett annat värde (t.ex. `new A2ATaskManager(15)` för 15 minuters TTL). Ett bakgrundsintervall rensar utgångna uppgifter var 60:e sekund.

---

## Uppgiftens livscykel

```
inskickad → pågående → slutförd
                    → misslyckad
                    → avbruten
```

- Uppgifter upphör som standard att gälla efter 5 minuter (se [TTL för uppgifter](#task-ttl))
- Sluttillstånd: `completed`, `failed`, `cancelled`
- Händelseloggen registrerar varje tillståndsövergång

---

## Felkoder

| Kod    | Betydelse                               |
| :----- | :-------------------------------------- |
| -32700 | Tolkningsfel (ogiltig JSON)             |
| -32600 | Ogiltig begäran/obehörig                |
| -32601 | Metoden eller färdigheten hittades inte |
| -32602 | Ogiltiga parametrar                     |
| -32603 | Internt fel                             |
| -32000 | A2A-slutpunkten är inaktiverad          |

---

## Integrationsexempel

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
