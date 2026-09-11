# A2A-SERVER (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

---

title: "OmniRoute A2A Server Dokumentacija"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute A2A Server Dokumentacija

> Agent-to-Agent Protokol v0.3 — OmniRoute kao inteligentni agent za usmjeravanje

A2A sučelje ima dva lica:

- **JSON-RPC 2.0** na `POST /a2a` (kanonična ulazna točka, definirana u `src/app/a2a/route.ts`).
- **REST** pod `/api/a2a/*` za nadzorne ploče i alate (status, popis zadataka, otkazivanje).

Zadaci se prate pomoću `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, zadani TTL od 5 minuta). Vještine se otpravljaju putem `A2A_SKILL_HANDLERS` u `src/lib/a2a/taskExecution.ts`.

## Otkrivanje Agenta

```bash
curl http://localhost:20128/.well-known/agent.json
```

Vraća Agent Card koji opisuje mogućnosti, vještine i zahtjeve za autentifikaciju OmniRoutea.

Polje `version` u Agent Cardu preuzima se iz `process.env.npm_package_version` (vidi `src/app/.well-known/agent.json/route.ts:13`), što ga drži automatski sinkroniziranim s `package.json` pri svakom izdanju.

---

## Autentifikacija

Svi zahtjevi na `/a2a` zahtijevaju API ključ putem zaglavlja `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Ako na poslužitelju nije konfiguriran API ključ, autentifikacija se preskače.

## Aktivacija

A2A se kontrolira preklopnikom **Endpoints → A2A** i zadano je onemogućen. Kada je onemogućen,
`GET /api/a2a/status` prijavljuje `status: "disabled"` i `online: false`; JSON-RPC pozivi na
`POST /a2a` vraćaju HTTP 503 s JSON-RPC kodom greške `-32000`.

---

## JSON-RPC 2.0 Metode

### `message/send` — Sinkrono Izvođenje

Šalje poruku vještini i čeka na potpuni odgovor.

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

**Odgovor:**

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

### `message/stream` — SSE Strujanje

Isto kao `message/send`, ali vraća Server-Sent Events za strujanje u stvarnom vremenu.

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

**SSE Događaji:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Upit Statusa Zadatka

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Otkazivanje Zadatka

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Dostupne vještine

OmniRoute izlaže 6 A2A vještina registriranih u `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Svaki modul vještine nalazi se u `src/lib/a2a/skills/`.

| Vještina              | ID                   | Opis                                                                                                                                                 | Oznake                     | Primjeri                                     |
| :-------------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :------------------------------------------- |
| Pametno usmjeravanje  | `smart-routing`      | Usmjerava prompt kroz optimalnog pružatelja/kombinaciju koristeći OmniRoute-ov kombinirani mehanizam i bodovanje                                     | routing, providers         | "Usmjeri ovaj prompt putem najboljeg modela" |
| Upravljanje kvotama   | `quota-management`   | Izvještava o stanju kvote po pružatelju, pomaže pozivateljima odlučiti kada usporiti/prebaciti se                                                    | quota, providers           | "Provjeri kvotu za anthropic"                |
| Otkrivanje pružatelja | `provider-discovery` | Prikazuje instalirane pružatelje s mogućnostima, oznakama besplatnog nivoa i OAuth statusom                                                          | providers, discovery       | "Koji su pružatelji dostupni?"               |
| Analiza troškova      | `cost-analysis`      | Procjenjuje trošak zahtjeva/razgovora na temelju kataloga i nedavne upotrebe                                                                         | cost, usage                | "Procijeni trošak za ovaj razgovor"          |
| Izvještaj o zdravlju  | `health-report`      | Agregira stanje prekidača strujnog kruga, hlađenja i blokiranja po pružatelju                                                                        | health, resilience         | "Prikaži zdravstveni status svih pružatelja" |
| Popis mogućnosti      | `list-capabilities`  | Vraća kompletan katalog od 45 Agent vještina (23 API + 21 CLI + 1 konfiguracija) kao markdown tablicu s raw SKILL.md URL-ovima za umetanje konteksta | catalog, discovery, skills | "Navedi sve OmniRoute mogućnosti"            |

> Agent Card treba biti usklađen s aktivnim katalogom od 352 pružatelja; broj pružatelja i metapodaci o besplatnom pristupu/bez autentifikacije potječu iz registra u izvođenju.

### Detalji vještine `list-capabilities`

Vještina `list-capabilities` posebno je korisna za vanjske agente koji trebaju otkriti što OmniRoute izlaže prije slanja API poziva. Vraća strukturirani markdown artefakt tablice:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Svaki redak uključuje stupac `rawUrl` kako bi agenti mogli odmah dohvatiti cijeli SKILL.md. Polje `metadata.totalSkills` odražava veličinu kataloga (danas 45). Implementacija: `src/lib/a2a/skills/listCapabilities.ts`. Vidi također [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (pomoćni)

JSON-RPC krajnja točka `/a2a` je kanonična A2A ulazna točka. Dolje navedene REST krajnje točke pružaju pomoćni pristup za nadzorne ploče i vanjske alate:

| Krajnja točka                | Metoda | Opis                                                           | Autentifikacija                              |
| :--------------------------- | :----- | :------------------------------------------------------------- | :------------------------------------------- |
| `/api/a2a/status`            | GET    | Status poslužitelja, registrirane vještine                     | (javno)                                      |
| `/api/a2a/tasks`             | GET    | Popis zadataka s filterima                                     | upravljanje                                  |
| `/api/a2a/tasks/[id]`        | GET    | Dohvati zadatak prema ID-u                                     | upravljanje                                  |
| `/api/a2a/tasks/[id]/cancel` | POST   | Otkaži zadatak koji se izvršava                                | upravljanje                                  |
| `/.well-known/agent.json`    | GET    | Agent Card (A2A otkrivanje)                                    | (javno, predmemorija 3600s)                  |
| `/api/a2a/tasks`             | POST   | Dolazno delegiranje na OmniConductor fleet (Conductor PRD RF5) | Bearer vs `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Dolazno Conductor delegiranje (`POST /api/a2a/tasks`):** vanjski A2A agenti delegiraju poslove kodiranja OmniConductor fleetu putem OmniRoute. Tijelo: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — delegirati se mogu samo Conductor fleet vještine (one objavljene na Agent Cardu); `metadata.conductor.repo.url` je obavezan (fleet radi na git repozitorijima). Ruta se prevodi u hub-ov `POST /v1/tasks` koristeći poslužiteljski `CONDUCTOR_ORCHESTRATOR_TOKEN` (pričuva `CONDUCTOR_HUB_TOKEN`) i vraća `201 { conductor_task_id, state: "submitted" }`; stanja zadataka teku natrag kroz SSE→A2A zrcalo (RF1) i vidljiva su putem `GET /api/a2a/tasks?skill=conductor`.

---

## Dodavanje nove vještine

1. **Stvori datoteku vještine:** `src/lib/a2a/skills/<your-skill>.ts`

   Izvezi asinkronu funkciju `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Slijedi oblik postojećih vještina poput `smartRouting.ts`.

2. **Registriraj rukovatelj:** u `src/lib/a2a/taskExecution.ts`, dodaj unos u `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...postojeće vještine
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Izloži u Agent Cardu:** u `src/app/.well-known/agent.json/route.ts`, dodaj u niz `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Kratki opis usmjeren na namjenu",
     "tags": ["routing", "quota"],
     "examples": ["Primjer poziva na prirodnom jeziku"]
   }
   ```

4. **Napiši testove:** `tests/unit/a2a-<your-skill>.test.ts`. Pokrij sretan put + put s greškom.

5. **Dokumentiraj** novu vještinu u tablici `Dostupne vještine` ove datoteke.

---

## TTL zadataka

Zadaci istječu nakon `ttlMinutes` (zadano 5 min) — konfigurirano u konstruktoru `A2ATaskManager` na `src/lib/a2a/taskManager.ts:82`. Za prilagodbu, forkajte instancijaciju `A2ATaskManager` i proslijedite drugu vrijednost (npr. `new A2ATaskManager(15)` za TTL od 15 minuta). Pozadinski interval briše istekle zadatke svakih 60 sekundi.

---

## Životni ciklus zadatka

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Zadaci istječu nakon 5 minuta prema zadanim postavkama (pogledajte [TTL zadataka](#ttl-zadataka))
- Terminalna stanja: `completed`, `failed`, `cancelled`
- Evidencija događaja prati svaki prijelaz stanja

---

## Kodovi pogrešaka

| Kod    | Značenje                            |
| :----- | :---------------------------------- |
| -32700 | Greška parsiranja (neispravan JSON) |
| -32600 | Neispravan zahtjev / Neovlašteno    |
| -32601 | Metoda ili vještina nije pronađena  |
| -32602 | Neispravni parametri                |
| -32603 | Interna greška                      |
| -32000 | A2A krajnja točka je onemogućena    |

---

## Primjeri integracije

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
