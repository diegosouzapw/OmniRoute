# A2A-SERVER (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

---

title: "OmniRoute A2A Server Documentation"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Τεκμηρίωση OmniRoute A2A Server

> Agent-to-Agent Protocol v0.3 — Το OmniRoute ως έξυπνος agent δρομολόγησης

Η επιφάνεια A2A έχει δύο όψεις:

- **JSON-RPC 2.0** στο `POST /a2a` (κανονικό σημείο εισόδου, ορισμένο στο `src/app/a2a/route.ts`).
- **REST** στο `/api/a2a/*` για dashboards και εργαλεία (κατάσταση, λίστα εργασιών, ακύρωση).

Οι εργασίες παρακολουθούνται από τον `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, προεπιλεγμένο TTL 5 λεπτών). Οι δεξιότητες αποστέλλονται μέσω `A2A_SKILL_HANDLERS` στο `src/lib/a2a/taskExecution.ts`.

## Ανακάλυψη Agent

```bash
curl http://localhost:20128/.well-known/agent.json
```

Επιστρέφει το Agent Card που περιγράφει τις δυνατότητες, τις δεξιότητες και τις απαιτήσεις αυθεντικοποίησης του OmniRoute.

Το πεδίο `version` του Agent Card αντλείται από το `process.env.npm_package_version` (βλ. `src/app/.well-known/agent.json/route.ts:13`), οπότε παραμένει αυτόματα συγχρονισμένο με το `package.json` σε κάθε έκδοση.

---

## Αυθεντικοποίηση

Όλες οι αιτήσεις στο `/a2a` απαιτούν κλειδί API μέσω της κεφαλίδας `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Εάν δεν έχει διαμορφωθεί κλειδί API στον διακομιστή, η αυθεντικοποίηση παρακάμπτεται.

## Ενεργοποίηση

Το A2A ελέγχεται από τον διακόπτη **Endpoints → A2A** και είναι απενεργοποιημένο από προεπιλογή. Όταν είναι απενεργοποιημένο,
το `GET /api/a2a/status` αναφέρει `status: "disabled"` και `online: false`· οι κλήσεις JSON-RPC στο
`POST /a2a` επιστρέφουν HTTP 503 με κωδικό σφάλματος JSON-RPC `-32000`.

---

## Μέθοδοι JSON-RPC 2.0

### `message/send` — Σύγχρονη Εκτέλεση

Αποστέλλει ένα μήνυμα σε μια δεξιότητα και αναμένει την πλήρη απόκριση.

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

**Απόκριση:**

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

### `message/stream` — Ροή SSE

Ίδιο με το `message/send` αλλά επιστρέφει Server-Sent Events για ροή σε πραγματικό χρόνο.

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

**Συμβάντα SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Ερώτημα Κατάστασης Εργασίας

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Ακύρωση Εργασίας

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Διαθέσιμες Δεξιότητες

Το OmniRoute εκθέτει 6 δεξιότητες A2A που καταχωρούνται στο `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Κάθε module δεξιότητας βρίσκεται στο `src/lib/a2a/skills/`.

| Δεξιότητα          | ID                   | Περιγραφή                                                                                                                                          | Ετικέτες                   | Παραδείγματα                           |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :------------------------------------- |
| Smart Routing      | `smart-routing`      | Δρομολογεί ένα prompt μέσω του βέλτιστου παρόχου/συνδυασμού χρησιμοποιώντας τη μηχανή συνδυασμών και βαθμολόγησης του OmniRoute                    | routing, providers         | "Route this prompt via the best model" |
| Quota Management   | `quota-management`   | Αναφέρει την κατάσταση ορίου χρήσης ανά πάροχο, βοηθά τους καλούντες να αποφασίσουν πότε να περιορίσουν ή να αλλάξουν πάροχο                       | quota, providers           | "Check quota for anthropic"            |
| Provider Discovery | `provider-discovery` | Παραθέτει τους εγκατεστημένους παρόχους με τις δυνατότητές τους, σημαίες δωρεάν επιπέδου και κατάσταση OAuth                                       | providers, discovery       | "What providers are available?"        |
| Cost Analysis      | `cost-analysis`      | Εκτιμά το κόστος ενός αιτήματος/συνομιλίας βάσει του καταλόγου και της πρόσφατης χρήσης                                                            | cost, usage                | "Estimate cost for this conversation"  |
| Health Report      | `health-report`      | Συγκεντρώνει την κατάσταση του circuit breaker, της περιόδου αναμονής και του αποκλεισμού ανά πάροχο                                               | health, resilience         | "Show health status of all providers"  |
| List Capabilities  | `list-capabilities`  | Επιστρέφει τον πλήρη κατάλογο 45 δεξιοτήτων Agent (23 API + 21 CLI + 1 διαμόρφωση) ως πίνακα markdown με raw SKILL.md URLs για έγχυση περιεχομένου | catalog, discovery, skills | "List all OmniRoute capabilities"      |

> Το Agent Card θα πρέπει να παραμένει συγχρονισμένο με τον ενεργό κατάλογο 352 παρόχων· τα πλήθη παρόχων και τα μεταδεδομένα δωρεάν/χωρίς-πιστοποίηση αντλούνται από το μητρώο εκτέλεσης.

### Λεπτομέρειες Δεξιότητας `list-capabilities`

Η δεξιότητα `list-capabilities` είναι ιδιαίτερα χρήσιμη για εξωτερικούς agents που χρειάζεται να ανακαλύψουν τι εκθέτει το OmniRoute πριν στείλουν κλήσεις API. Επιστρέφει ένα δομημένο artifact πίνακα markdown:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Κάθε γραμμή περιλαμβάνει τη στήλη `rawUrl` ώστε οι agents να μπορούν αμέσως να ανακτήσουν το πλήρες SKILL.md. Το πεδίο `metadata.totalSkills` αντικατοπτρίζει το μέγεθος του καταλόγου (45 σήμερα). Υλοποίηση: `src/lib/a2a/skills/listCapabilities.ts`. Δείτε επίσης [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (βοηθητικό)

Το endpoint JSON-RPC `/a2a` είναι το κανονικό σημείο εισόδου A2A. Τα παρακάτω REST endpoints παρέχουν βοηθητική πρόσβαση για dashboards και εξωτερικά εργαλεία:

| Endpoint                     | Μέθοδος | Περιγραφή                                                       | Έλεγχος ταυτότητας                           |
| :--------------------------- | :------ | :-------------------------------------------------------------- | :------------------------------------------- |
| `/api/a2a/status`            | GET     | Κατάσταση διακομιστή, καταχωρημένες δεξιότητες                  | (δημόσιο)                                    |
| `/api/a2a/tasks`             | GET     | Λίστα εργασιών με φίλτρα                                        | management                                   |
| `/api/a2a/tasks/[id]`        | GET     | Ανάκτηση εργασίας βάσει ID                                      | management                                   |
| `/api/a2a/tasks/[id]/cancel` | POST    | Ακύρωση εκτελούμενης εργασίας                                   | management                                   |
| `/.well-known/agent.json`    | GET     | Agent Card (ανακάλυψη A2A)                                      | (δημόσιο, cached 3600s)                      |
| `/api/a2a/tasks`             | POST    | Εισερχόμενη ανάθεση στο OmniConductor fleet (Conductor PRD RF5) | Bearer vs `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Εισερχόμενη ανάθεση Conductor (`POST /api/a2a/tasks`):** εξωτερικοί A2A agents αναθέτουν εργασίες κώδικα στο OmniConductor fleet μέσω OmniRoute. Body: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — μόνο οι δεξιότητες του Conductor fleet (αυτές που ανακοινώνονται στο Agent Card) είναι αναθέσιμες· το `metadata.conductor.repo.url` είναι υποχρεωτικό (το fleet εργάζεται σε git repos). Η διαδρομή μεταφράζεται στο `POST /v1/tasks` του hub χρησιμοποιώντας το `CONDUCTOR_ORCHESTRATOR_TOKEN` από την πλευρά του διακομιστή (εναλλακτικά `CONDUCTOR_HUB_TOKEN`) και επιστρέφει `201 { conductor_task_id, state: "submitted" }`· οι καταστάσεις εργασιών ρέουν πίσω μέσω του SSE→A2A mirror (RF1) και είναι ορατές μέσω `GET /api/a2a/tasks?skill=conductor`.

---

## Προσθήκη Νέας Δεξιότητας

1. **Δημιουργία αρχείου δεξιότητας:** `src/lib/a2a/skills/<your-skill>.ts`

   Εξάγετε μια ασύγχρονη συνάρτηση `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Ακολουθήστε τη μορφή υπαρχουσών δεξιοτήτων όπως το `smartRouting.ts`.

2. **Καταχώρηση handler:** στο `src/lib/a2a/taskExecution.ts`, προσθέστε μια εγγραφή στο `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...υπάρχουσες δεξιότητες
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Έκθεση στο Agent Card:** στο `src/app/.well-known/agent.json/route.ts`, προσθέστε στον πίνακα `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Σύντομη, εστιασμένη στην πρόθεση περιγραφή",
     "tags": ["routing", "quota"],
     "examples": ["Παράδειγμα κλήσης σε φυσική γλώσσα"]
   }
   ```

4. **Γράψτε δοκιμές:** `tests/unit/a2a-<your-skill>.test.ts`. Καλύψτε το ευτυχές μονοπάτι + το μονοπάτι σφάλματος.

5. **Τεκμηριώστε** τη νέα δεξιότητα στον πίνακα `Available Skills` αυτού του αρχείου.

---

## TTL Εργασίας

Οι εργασίες λήγουν μετά από `ttlMinutes` (προεπιλογή 5 λεπτά) — ρυθμίζεται στον κατασκευαστή `A2ATaskManager` στο `src/lib/a2a/taskManager.ts:82`. Για προσαρμογή, δημιουργήστε fork της παρουσίας `A2ATaskManager` και περάστε διαφορετική τιμή (π.χ., `new A2ATaskManager(15)` για TTL 15 λεπτών). Ένα εκτελούμενο στο παρασκήνιο χρονικό διάστημα σαρώνει τις ληγμένες εργασίες κάθε 60 δευτερόλεπτα.

---

## Κύκλος Ζωής Εργασίας

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Οι εργασίες λήγουν μετά από 5 λεπτά από προεπιλογή (βλ. [TTL Εργασίας](#task-ttl))
- Τερματικές καταστάσεις: `completed`, `failed`, `cancelled`
- Το αρχείο καταγραφής συμβάντων παρακολουθεί κάθε μετάβαση κατάστασης

---

## Κωδικοί Σφάλματος

| Κωδικός | Σημασία                                     |
| :------ | :------------------------------------------ |
| -32700  | Σφάλμα ανάλυσης (μη έγκυρο JSON)            |
| -32600  | Μη έγκυρο αίτημα / Μη εξουσιοδοτημένο       |
| -32601  | Η μέθοδος ή η δεξιότητα δεν βρέθηκε         |
| -32602  | Μη έγκυρες παράμετροι                       |
| -32603  | Εσωτερικό σφάλμα                            |
| -32000  | Το τελικό σημείο A2A είναι απενεργοποιημένο |

---

## Παραδείγματα Ενσωμάτωσης

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
