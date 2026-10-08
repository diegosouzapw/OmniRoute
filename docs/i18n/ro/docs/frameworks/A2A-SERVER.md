# OmniRoute A2A Server Documentation (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Protocol Agent-to-Agent v0.3 — OmniRoute ca agent de rutare inteligentă

Interfața A2A are două componente:

- **JSON-RPC 2.0** la `POST /a2a` (punctul de intrare canonic, definit în `src/app/a2a/route.ts`).
- **REST** sub `/api/a2a/*` pentru panouri de control și instrumente (stare, lista sarcinilor, anulare).

Sarcinile sunt gestionate de `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL implicit de 5 minute). Abilitățile sunt direcționate prin `A2A_SKILL_HANDLERS` în `src/lib/a2a/taskExecution.ts`.

## Descoperirea agentului

```bash
curl http://localhost:20128/.well-known/agent.json
```

Returnează Cardul agentului, care descrie capabilitățile, abilitățile și cerințele de autentificare ale OmniRoute.

Câmpul `version` al Cardului agentului este preluat din `process.env.npm_package_version` (consultați `src/app/.well-known/agent.json/route.ts:13`), astfel încât rămâne sincronizat automat cu `package.json` la fiecare versiune lansată.

---

## Autentificare

Toate solicitările către `/a2a` necesită o cheie API transmisă prin antetul `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Dacă pe server nu este configurată nicio cheie API, autentificarea este omisă.

## Activare

A2A este controlat prin comutatorul **Puncte finale → A2A** și este dezactivat în mod implicit. Când este dezactivat,
`GET /api/a2a/status` raportează `status: "disabled"` și `online: false`; apelurile JSON-RPC către
`POST /a2a` returnează HTTP 503 cu codul de eroare JSON-RPC `-32000`.

---

## Metode JSON-RPC 2.0

### `message/send` — Execuție sincronă

Trimite un mesaj către o abilitate și așteaptă răspunsul complet.

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

**Răspuns:**

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

### `message/stream` — Transmitere în flux prin SSE

La fel ca `message/send`, dar returnează evenimente trimise de server pentru transmiterea în flux în timp real.

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

**Evenimente SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Interogarea stării sarcinii

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Anularea unei sarcini

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Abilități disponibile

OmniRoute expune 6 abilități A2A conectate în `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Fiecare modul de abilitate se află în `src/lib/a2a/skills/`.

| Abilitate                   | ID                   | Descriere                                                                                                                                                                            | Etichete                        | Exemple                                              |
| :-------------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ | :--------------------------------------------------- |
| Rutare inteligentă          | `smart-routing`      | Rutează un prompt prin furnizorul/combinația optimă, folosind motorul de combinații și sistemul de evaluare OmniRoute                                                                | rutare, furnizori               | „Rutează acest prompt prin cel mai bun model”        |
| Gestionarea cotelor         | `quota-management`   | Raportează starea cotei pentru fiecare furnizor și ajută apelanții să decidă când să limiteze traficul/schimbe furnizorul                                                            | cote, furnizori                 | „Verifică cota pentru anthropic”                     |
| Descoperirea furnizorilor   | `provider-discovery` | Listează furnizorii instalați, împreună cu funcționalitățile, opțiunile de nivel gratuit și starea OAuth                                                                             | furnizori, descoperire          | „Ce furnizori sunt disponibili?”                     |
| Analiza costurilor          | `cost-analysis`      | Estimează costul unei solicitări/conversații pe baza catalogului și a utilizării recente                                                                                             | cost, utilizare                 | „Estimează costul acestei conversații”               |
| Raport de sănătate          | `health-report`      | Agregă starea întrerupătorului de circuit, a perioadei de așteptare și a blocării pentru fiecare furnizor                                                                            | sănătate, reziliență            | „Afișează starea de sănătate a tuturor furnizorilor” |
| Listarea funcționalităților | `list-capabilities`  | Returnează catalogul complet cu 45 de intrări Agent Skills (23 API + 21 CLI + 1 configurație) sub forma unui tabel markdown, cu URL-uri SKILL.md brute pentru injectarea contextului | catalog, descoperire, abilități | „Listează toate funcționalitățile OmniRoute”         |

> Agent Card trebuie menținut aliniat cu catalogul activ de 352 de furnizori; numărul furnizorilor și metadatele privind accesul gratuit/fără autentificare provin din registrul de execuție.

### Detalii despre abilitatea `list-capabilities`

Abilitatea `list-capabilities` este deosebit de utilă pentru agenții externi care trebuie să descopere ce expune OmniRoute înainte de a trimite apeluri API. Aceasta returnează un artefact structurat sub forma unui tabel markdown:

```
| ID | Nume | Categorie | Zonă | Puncte finale/Comenzi | URL brut |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Autentificare și sesiuni | api | autentificare | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Fiecare rând include coloana `rawUrl`, astfel încât agenții să poată prelua imediat fișierul SKILL.md complet. Câmpul `metadata.totalSkills` reflectă dimensiunea catalogului (45 în prezent). Implementare: `src/lib/a2a/skills/listCapabilities.ts`. Consultați și [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## API REST (auxiliar)

Punctul final JSON-RPC `/a2a` este punctul de intrare A2A canonic. Punctele finale REST de mai jos oferă acces auxiliar pentru tablouri de bord și instrumente externe:

| Punct final                  | Metodă | Descriere                                                         | Autentificare                                |
| :--------------------------- | :----- | :---------------------------------------------------------------- | :------------------------------------------- |
| `/api/a2a/status`            | GET    | Starea serverului, competențe înregistrate                        | (public)                                     |
| `/api/a2a/tasks`             | GET    | Listează sarcinile folosind filtre                                | administrare                                 |
| `/api/a2a/tasks/[id]`        | GET    | Obține sarcina după ID                                            | administrare                                 |
| `/api/a2a/tasks/[id]/cancel` | POST   | Anulează sarcina în curs de execuție                              | administrare                                 |
| `/.well-known/agent.json`    | GET    | Fișa agentului (descoperire A2A)                                  | (public, memorat în cache timp de 3600s)     |
| `/api/a2a/tasks`             | POST   | Delegare de intrare către flota OmniConductor (Conductor PRD RF5) | Bearer vs `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Delegare Conductor de intrare (`POST /api/a2a/tasks`):** agenții A2A externi deleagă activități de programare flotei OmniConductor prin OmniRoute. Corp: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — numai competențele flotei Conductor (cele anunțate în Fișa agentului) pot fi delegate; `metadata.conductor.repo.url` este obligatoriu (flota lucrează cu depozite git). Ruta se traduce în `POST /v1/tasks` al hubului, folosind `CONDUCTOR_ORCHESTRATOR_TOKEN` de pe server (alternativ, `CONDUCTOR_HUB_TOKEN`) și returnează `201 { conductor_task_id, state: "submitted" }`; stările sarcinilor sunt retransmise prin oglinda SSE→A2A (RF1) și sunt vizibile prin `GET /api/a2a/tasks?skill=conductor`.

---

## Adăugarea unei competențe noi

1. **Creați fișierul competenței:** `src/lib/a2a/skills/<your-skill>.ts`

   Exportați o funcție asincronă `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Urmați structura competențelor existente, precum `smartRouting.ts`.

2. **Înregistrați gestionarul:** în `src/lib/a2a/taskExecution.ts`, adăugați o intrare în `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...competențe existente
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Expuneți în Fișa agentului:** în `src/app/.well-known/agent.json/route.ts`, adăugați la sfârșitul matricei `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Competența dvs.",
     "description": "Descriere scurtă, axată pe intenție",
     "tags": ["rutare", "cotă"],
     "examples": ["Exemplu de invocare în limbaj natural"]
   }
   ```

4. **Scrieți teste:** `tests/unit/a2a-<your-skill>.test.ts`. Acoperiți scenariul reușit și scenariul de eroare.

5. **Documentați** noua competență în tabelul `Competențe disponibile` din acest fișier.

---

## TTL-ul sarcinilor

Sarcinile expiră după `ttlMinutes` (implicit 5 min) — configurat în constructorul `A2ATaskManager` din `src/lib/a2a/taskManager.ts:82`. Pentru personalizare, creați o variantă proprie a instanțierii `A2ATaskManager` și transmiteți o valoare diferită (de exemplu, `new A2ATaskManager(15)` pentru un TTL de 15 minute). Un interval de fundal elimină sarcinile expirate la fiecare 60 de secunde.

---

## Ciclul de viață al sarcinilor

```
trimisă → în lucru → finalizată
                     → eșuată
                     → anulată
```

- Sarcinile expiră implicit după 5 minute (consultați [TTL-ul sarcinilor](#task-ttl))
- Stări terminale: `completed`, `failed`, `cancelled`
- Jurnalul de evenimente urmărește fiecare tranziție de stare

---

## Coduri de eroare

| Cod    | Semnificație                           |
| :----- | :------------------------------------- |
| -32700 | Eroare de parsare (JSON nevalid)       |
| -32600 | Cerere nevalidă / Neautorizat          |
| -32601 | Metoda sau abilitatea nu a fost găsită |
| -32602 | Parametri nevalizi                     |
| -32603 | Eroare internă                         |
| -32000 | Endpoint-ul A2A este dezactivat        |

---

## Exemple de integrare

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
