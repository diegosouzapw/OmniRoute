# A2A-SERVER (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

---

title: "OmniRoute A2A Server Documentation"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Документација OmniRoute A2A сервера

> Agent-to-Agent Protocol v0.3 — OmniRoute као интелигентни рутирајући агент

A2A интерфејс има два лица:

- **JSON-RPC 2.0** на `POST /a2a` (канонска улазна тачка, дефинисана у `src/app/a2a/route.ts`).
- **REST** под `/api/a2a/*` за контролне табле и алате (статус, листа задатака, отказивање).

Задаци се прате помоћу `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, подразумевани TTL од 5 минута). Вештине се прослеђују преко `A2A_SKILL_HANDLERS` у `src/lib/a2a/taskExecution.ts`.

## Откривање агента

```bash
curl http://localhost:20128/.well-known/agent.json
```

Враћа Agent Card који описује могућности, вештине и захтеве за аутентикацију OmniRoute-а.

Поље `version` у Agent Card-у преузима се из `process.env.npm_package_version` (видети `src/app/.well-known/agent.json/route.ts:13`), тако да остаје аутоматски синхронизовано са `package.json` при сваком издању.

---

## Аутентикација

Сви захтеви на `/a2a` захтевају API кључ преко заглавља `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Ако на серверу није конфигурисан API кључ, аутентикација се заобилази.

## Активирање

A2A се контролише преко прекидача **Endpoints → A2A** и подразумевано је онемогућен. Када је онемогућен,
`GET /api/a2a/status` пријављује `status: "disabled"` и `online: false`; JSON-RPC позиви на
`POST /a2a` враћају HTTP 503 са JSON-RPC грешком кода `-32000`.

---

## JSON-RPC 2.0 методе

### `message/send` — Синхроно извршавање

Шаље поруку вештини и чека комплетан одговор.

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

**Одговор:**

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

### `message/stream` — SSE стриминг

Исто као `message/send`, али враћа Server-Sent Events за стриминг у реалном времену.

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

**SSE догађаји:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Провера статуса задатка

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Отказивање задатка

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Dostupne veštine (Skills)

OmniRoute izlaže 6 A2A veština povezanih u `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Svaki modul veštine se nalazi u `src/lib/a2a/skills/`.

| Veština            | ID                   | Opis                                                                                                                                                             | Tagovi                     | Primeri                                |
| :----------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :------------------------------------- |
| Smart Routing      | `smart-routing`      | Rutira prompt kroz optimalnog provajdera/kombinaciju koristeći OmniRoute-ov combo engine + bodovanje                                                             | routing, providers         | "Route this prompt via the best model" |
| Quota Management   | `quota-management`   | Prijavljuje stanje kvote po provajderu, pomaže pozivačima da odluče kada da ograniče/promene provajdera                                                          | quota, providers           | "Check quota for anthropic"            |
| Provider Discovery | `provider-discovery` | Prikazuje listu instaliranih provajdera sa mogućnostima, oznakama besplatnog nivoa, OAuth statusom                                                               | providers, discovery       | "What providers are available?"        |
| Cost Analysis      | `cost-analysis`      | Procenjuje troškove zahteva/konverzacije na osnovu katalogа i skoraшnjeg korišćenja                                                                              | cost, usage                | "Estimate cost for this conversation"  |
| Health Report      | `health-report`      | Agregira stanje circuit breaker-a, cooldown-a i zaključavanja po provajderu                                                                                      | health, resilience         | "Show health status of all providers"  |
| List Capabilities  | `list-capabilities`  | Vraća kompletan katalog od 45 unosa Agent Skills (23 API + 21 CLI + 1 konfiguracija) kao markdown tabelu sa sirovim SKILL.md URL-ovima za ubrizgavanje konteksta | catalog, discovery, skills | "List all OmniRoute capabilities"      |

> Agent Card treba da bude usklađen sa aktivnim katalogom od 352 provajdera; brojevi provajdera i metapodaci o besplatnom/no-auth pristupu preuzimaju se iz runtime registra.

### Detalji veštine `list-capabilities`

Veština `list-capabilities` posebno je korisna za eksterne agente kojima je potrebno da otkriju šta OmniRoute izlaže pre slanja API pozива. Vraća strukturisani artefakt u obliku markdown tabele:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Svaki red sadrži kolonu `rawUrl` kako bi agenti mogli odmah da preuzmu kompletan SKILL.md. Polje `metadata.totalSkills` odražava veličinu katalogа (45 danas). Implementacija: `src/lib/a2a/skills/listCapabilities.ts`. Pogledajte i [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (dodatno)

JSON-RPC krajnja tačka `/a2a` je kanonska A2A ulazna tačka. REST krajnje tačke ispod pružaju dodatni pristup za komandne table i eksterne alatke:

| Krajnja tačka                | Metod | Opis                                                        | Autentikacija                                         |
| :--------------------------- | :---- | :---------------------------------------------------------- | :---------------------------------------------------- |
| `/api/a2a/status`            | GET   | Status servera, registrovane vештine                        | (javno)                                               |
| `/api/a2a/tasks`             | GET   | Listanje zadataka sa filterima                              | management                                            |
| `/api/a2a/tasks/[id]`        | GET   | Preuzimanje zadatka po ID-u                                 | management                                            |
| `/api/a2a/tasks/[id]/cancel` | POST  | Otkazivanje zadatka koji je u toku                          | management                                            |
| `/.well-known/agent.json`    | GET   | Agent Card (A2A otkrivanje)                                 | (javno, keširano 3600s)                               |
| `/api/a2a/tasks`             | POST  | Dolazno delegiranje flotе OmniConductor (Conductor PRD RF5) | Bearer u odnosu na `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Dolazno delegiranje Conductor-u (`POST /api/a2a/tasks`):** eksterni A2A agenti delegiraju posao kodiranja floti OmniConductor kroz OmniRoute. Тело: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — mogu se delegirati samo vештine flote Conductor (one koje su objavljene na Agent Card-u); `metadata.conductor.repo.url` je obavezan (flota radi na git repozitorijumima). Ruta se prevodi u `POST /v1/tasks` hub-a koristeći serversku `CONDUCTOR_ORCHESTRATOR_TOKEN` (rezervna opcija `CONDUCTOR_HUB_TOKEN`) i vraća `201 { conductor_task_id, state: "submitted" }`; stanja zadatka se prosleđuju nazad kroz SSE→A2A mirror (RF1) i vidljiva su preko `GET /api/a2a/tasks?skill=conductor`.

---

## Dodavanje nove vештine

1. **Kreirajte fajl vештine:** `src/lib/a2a/skills/<your-skill>.ts`

   Izvezite asinhronu funkciju `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Pratite oblik postojećih vештina kao što je `smartRouting.ts`.

2. **Registrujte handler:** u `src/lib/a2a/taskExecution.ts`, dodajte stavku u `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...postojeće vештine
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Prikažite u Agent Card-u:** u `src/app/.well-known/agent.json/route.ts`, dodajte u niz `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Kratak opis fokusiran na nameru",
     "tags": ["routing", "quota"],
     "examples": ["Primer pozivanja prirodnim jezikom"]
   }
   ```

4. **Napišite testove:** `tests/unit/a2a-<your-skill>.test.ts`. Pokrijte uspešan tok i tok sa greškom.

5. **Dokumentujte** novu vештinu u tabeli `Available Skills` u ovom fajlu.

---

## TTL zadatka

Zadaci ističu nakon `ttlMinutes` (podrazumevano 5 min) — konfigurisano u konstruktoru `A2ATaskManager` na `src/lib/a2a/taskManager.ts:82`. Za prilagođavanje, forkujte instanciranje `A2ATaskManager` i prosledite drugu vrednost (npr. `new A2ATaskManager(15)` za TTL od 15 minuta). Interval u pozadini čisti istekle zadatke svakih 60 sekundi.

---

## Životni ciklus zadatka

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Zadaci ističu nakon 5 minuta po podrazumevanim podešavanjima (vidi [TTL zadatka](#task-ttl))
- Terminalna stanja: `completed`, `failed`, `cancelled`
- Evidencija događaja prati svaku promenu stanja

---

## Kodovi grešaka

| Kod    | Značenje                            |
| :----- | :---------------------------------- |
| -32700 | Greška u parsiranju (nevažeći JSON) |
| -32600 | Nevažeći zahtev / Neautorizovano    |
| -32601 | Metoda ili vештina nije pronađena   |
| -32602 | Nevažeći parametri                  |
| -32603 | Interna greška                      |
| -32000 | A2A krajnja tačka je onemogućena    |

---

## Primeri integracije

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
