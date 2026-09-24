# OmniRoute A2A Server Documentation (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Protocollo Agent-to-Agent v0.3 — OmniRoute come agente di routing intelligente

L'interfaccia A2A presenta due modalità:

- **JSON-RPC 2.0** su `POST /a2a` (punto di ingresso canonico, definito in `src/app/a2a/route.ts`).
- **REST** sotto `/api/a2a/*` per dashboard e strumenti (stato, elenco delle attività, annullamento).

Le attività sono monitorate da `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL predefinito di 5 minuti). Le skill vengono inoltrate tramite `A2A_SKILL_HANDLERS` in `src/lib/a2a/taskExecution.ts`.

## Individuazione dell'agente

```bash
curl http://localhost:20128/.well-known/agent.json
```

Restituisce la Agent Card che descrive le funzionalità, le skill e i requisiti di autenticazione di OmniRoute.

Il campo `version` della Agent Card viene ricavato da `process.env.npm_package_version` (vedere `src/app/.well-known/agent.json/route.ts:13`), quindi rimane sincronizzato automaticamente con `package.json` a ogni release.

---

## Autenticazione

Tutte le richieste a `/a2a` richiedono una chiave API tramite l'header `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Se sul server non è configurata alcuna chiave API, l'autenticazione viene ignorata.

## Abilitazione

A2A è controllato dall'interruttore **Endpoint → A2A** ed è disabilitato per impostazione predefinita. Quando è disabilitato,
`GET /api/a2a/status` restituisce `status: "disabled"` e `online: false`; le chiamate JSON-RPC a
`POST /a2a` restituiscono HTTP 503 con il codice di errore JSON-RPC `-32000`.

---

## Metodi JSON-RPC 2.0

### `message/send` — Esecuzione sincrona

Invia un messaggio a una skill e attende la risposta completa.

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

**Risposta:**

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

### `message/stream` — Streaming SSE

Funziona come `message/send`, ma restituisce Server-Sent Events per lo streaming in tempo reale.

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

**Eventi SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Verifica dello stato di un'attività

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Annullamento di un'attività

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Skill disponibili

OmniRoute espone 6 skill A2A collegate in `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Ogni modulo di skill si trova in `src/lib/a2a/skills/`.

| Skill                | ID                   | Descrizione                                                                                                                                                     | Tag                        | Esempi                                               |
| :------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :--------------------------------------------------- |
| Instradamento smart  | `smart-routing`      | Instrada un prompt tramite il provider/la combinazione ottimale utilizzando il motore di combinazione e il sistema di punteggio di OmniRoute                    | routing, providers         | "Instrada questo prompt tramite il modello migliore" |
| Gestione delle quote | `quota-management`   | Riporta lo stato delle quote per provider e aiuta i chiamanti a decidere quando applicare limitazioni o cambiare provider                                       | quota, providers           | "Controlla la quota per anthropic"                   |
| Rilevamento provider | `provider-discovery` | Elenca i provider installati con funzionalità, indicatori del piano gratuito e stato OAuth                                                                      | providers, discovery       | "Quali provider sono disponibili?"                   |
| Analisi dei costi    | `cost-analysis`      | Stima il costo di una richiesta/conversazione in base al catalogo e all'utilizzo recente                                                                        | cost, usage                | "Stima il costo di questa conversazione"             |
| Rapporto sullo stato | `health-report`      | Aggrega lo stato di circuit breaker, cooldown e lockout per provider                                                                                            | health, resilience         | "Mostra lo stato di tutti i provider"                |
| Elenco funzionalità  | `list-capabilities`  | Restituisce l'intero catalogo di 45 Agent Skills (23 API + 21 CLI + 1 config) come tabella markdown con URL SKILL.md non elaborati per l'iniezione del contesto | catalog, discovery, skills | "Elenca tutte le funzionalità di OmniRoute"          |

> L'Agent Card deve essere mantenuta allineata al catalogo attivo di 352 provider; il numero di provider e i metadati relativi all'accesso gratuito/senza autenticazione provengono dal registro di runtime.

### Dettagli della skill `list-capabilities`

La skill `list-capabilities` è particolarmente utile per gli agenti esterni che devono scoprire ciò che OmniRoute espone prima di inviare chiamate API. Restituisce un artefatto strutturato sotto forma di tabella markdown:

```
| ID | Nome | Categoria | Area | Endpoint/Comandi | URL non elaborato |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Autenticazione e sessioni | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Ogni riga include la colonna `rawUrl`, consentendo agli agenti di recuperare immediatamente il file SKILL.md completo. Il campo `metadata.totalSkills` riflette la dimensione del catalogo (attualmente 45). Implementazione: `src/lib/a2a/skills/listCapabilities.ts`. Vedere anche [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## API REST (ausiliaria)

L'endpoint JSON-RPC `/a2a` è il punto di ingresso A2A canonico. Gli endpoint REST riportati di seguito forniscono un accesso ausiliario per dashboard e strumenti esterni:

| Endpoint                     | Metodo | Descrizione                                                      | Autenticazione                                       |
| :--------------------------- | :----- | :--------------------------------------------------------------- | :--------------------------------------------------- |
| `/api/a2a/status`            | GET    | Stato del server, skill registrate                               | (pubblico)                                           |
| `/api/a2a/tasks`             | GET    | Elenca le attività con filtri                                    | gestione                                             |
| `/api/a2a/tasks/[id]`        | GET    | Ottiene un'attività per ID                                       | gestione                                             |
| `/api/a2a/tasks/[id]/cancel` | POST   | Annulla un'attività in esecuzione                                | gestione                                             |
| `/.well-known/agent.json`    | GET    | Agent Card (rilevamento A2A)                                     | (pubblico, memorizzato nella cache per 3600s)        |
| `/api/a2a/tasks`             | POST   | Delega in ingresso alla flotta OmniConductor (Conductor PRD RF5) | Bearer rispetto a `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Delega Conductor in ingresso (`POST /api/a2a/tasks`):** gli agenti A2A esterni delegano il lavoro di programmazione alla flotta OmniConductor tramite OmniRoute. Corpo: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — sono delegabili solo le skill della flotta Conductor (quelle annunciate nell'Agent Card); `metadata.conductor.repo.url` è obbligatorio (la flotta opera su repository git). La route viene tradotta nella richiesta `POST /v1/tasks` dell'hub utilizzando `CONDUCTOR_ORCHESTRATOR_TOKEN` lato server (con fallback su `CONDUCTOR_HUB_TOKEN`) e restituisce `201 { conductor_task_id, state: "submitted" }`; gli stati delle attività vengono propagati tramite il mirror SSE→A2A (RF1) e sono visibili mediante `GET /api/a2a/tasks?skill=conductor`.

---

## Aggiunta di una nuova skill

1. **Crea il file della skill:** `src/lib/a2a/skills/<your-skill>.ts`

   Esporta una funzione asincrona `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Segui la struttura delle skill esistenti, come `smartRouting.ts`.

2. **Registra il gestore:** in `src/lib/a2a/taskExecution.ts`, aggiungi una voce a `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...skill esistenti
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Esponi nell'Agent Card:** in `src/app/.well-known/agent.json/route.ts`, aggiungi all'array `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "La tua skill",
     "description": "Breve descrizione incentrata sull'intento",
     "tags": ["routing", "quota"],
     "examples": ["Esempio di invocazione in linguaggio naturale"]
   }
   ```

4. **Scrivi i test:** `tests/unit/a2a-<your-skill>.test.ts`. Copri il percorso corretto e il percorso di errore.

5. **Documenta** la nuova skill nella tabella `Available Skills` di questo file.

---

## TTL delle attività

Le attività scadono dopo `ttlMinutes` (valore predefinito: 5 min), configurato nel costruttore di `A2ATaskManager` in `src/lib/a2a/taskManager.ts:82`. Per personalizzarlo, crea un fork dell'istanza di `A2ATaskManager` e passa un valore diverso (ad esempio, `new A2ATaskManager(15)` per un TTL di 15 minuti). Un intervallo in background rimuove le attività scadute ogni 60 secondi.

---

## Ciclo di vita delle attività

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Per impostazione predefinita, le attività scadono dopo 5 minuti (vedi [TTL delle attività](#task-ttl))
- Stati terminali: `completed`, `failed`, `cancelled`
- Il registro degli eventi tiene traccia di ogni transizione di stato

---

## Codici di errore

| Codice | Significato                            |
| :----- | :------------------------------------- |
| -32700 | Errore di analisi (JSON non valido)    |
| -32600 | Richiesta non valida / Non autorizzato |
| -32601 | Metodo o skill non trovato             |
| -32602 | Parametri non validi                   |
| -32603 | Errore interno                         |
| -32000 | L'endpoint A2A è disabilitato          |

---

## Esempi di integrazione

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
