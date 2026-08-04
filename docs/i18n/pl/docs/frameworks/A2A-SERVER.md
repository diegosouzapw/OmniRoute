---
title: "Dokumentacja serwera A2A OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Dokumentacja serwera A2A OmniRoute

> Agent-to-Agent Protocol v0.3 — OmniRoute jako inteligentny agent routingu

Powierzchnia A2A ma dwie twarze:

- **JSON-RPC 2.0** pod `POST /a2a` (kanoniczny punkt wejścia, zdefiniowany w `src/app/a2a/route.ts`).
- **REST** pod `/api/a2a/*` dla dashboardów i narzędzi (status, lista zadań, anulowanie).

Zadania są śledzone przez `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, domyślny TTL 5 minut). Skills są dysponowane przez `A2A_SKILL_HANDLERS` w `src/lib/a2a/taskExecution.ts`.

## Odkrywanie agenta

```bash
curl http://localhost:20128/.well-known/agent.json
```

Zwraca Agent Card opisującą możliwości OmniRoute, skills oraz wymagania uwierzytelniania.

Pole `version` w Agent Card pochodzi z `process.env.npm_package_version` (zob. `src/app/.well-known/agent.json/route.ts:13`), więc pozostaje automatycznie zsynchronizowane z `package.json` przy każdym release.

---

## Uwierzytelnianie

Wszystkie żądania `/a2a` wymagają klucza API w nagłówku `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Jeśli na serwerze nie skonfigurowano klucza API, uwierzytelnianie jest pomijane.

## Włączanie

A2A jest sterowane przełącznikiem **Endpoints → A2A** i domyślnie jest wyłączone. Gdy jest wyłączone,
`GET /api/a2a/status` raportuje `status: "disabled"` oraz `online: false`; wywołania JSON-RPC do
`POST /a2a` zwracają HTTP 503 z kodem błędu JSON-RPC `-32000`.

---

## Metody JSON-RPC 2.0

### `message/send` — wykonanie synchroniczne

Wysyła wiadomość do skillu i czeka na pełną odpowiedź.

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

**Odpowiedź:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — streaming SSE

Tak samo jak `message/send`, ale zwraca Server-Sent Events do streamingu w czasie rzeczywistym.

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

**Zdarzenia SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — zapytanie o status zadania

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — anulowanie zadania

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Dostępne skills

OmniRoute udostępnia 6 skills A2A podpiętych w `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Każdy moduł skillu znajduje się w `src/lib/a2a/skills/`.

| Skill              | ID                   | Opis                                                                                                                   | Tagi                       | Przykłady                              |
| :----------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------- | :------------------------- | :------------------------------------- |
| Smart Routing      | `smart-routing`      | Kieruje prompt przez optymalny provider/combo, używając silnika combo + scoringu OmniRoute                             | routing, providers         | "Route this prompt via the best model" |
| Quota Management   | `quota-management`   | Raportuje stan quota per provider; pomaga decydować, kiedy throttlować/przełączać                                      | quota, providers           | "Check quota for anthropic"            |
| Provider Discovery | `provider-discovery` | Listuje zainstalowanych providerów z możliwościami, flagami free-tier i statusem OAuth                                 | providers, discovery       | "What providers are available?"        |
| Cost Analysis      | `cost-analysis`      | Szacuje koszt żądania/rozmowy na podstawie katalogu + niedawnego usage                                                 | cost, usage                | "Estimate cost for this conversation"  |
| Health Report      | `health-report`      | Agreguje stan circuit breakera, cooldown i lockout per provider                                                        | health, resilience         | "Show health status of all providers"  |
| List Capabilities  | `list-capabilities`  | Zwraca pełny 42-elementowy katalog Agent Skills jako tabelę markdown z raw URL-ami SKILL.md do wstrzykiwania kontekstu | catalog, discovery, skills | "List all OmniRoute capabilities"      |

> Uwaga: opis Agent Card obecnie reklamuje „36+ providers” (`src/app/.well-known/agent.json/route.ts:26` oraz `:55`). Faktyczny katalog urósł do 180+ providerów — ten string powinien zostać zaktualizowany w osobnej zmianie (śledzone jako osobne TODO w docs/kodzie; tutaj nie modyfikowane).

### Szczegóły skillu `list-capabilities`

Skill `list-capabilities` jest szczególnie przydatny dla zewnętrznych agentów, które muszą odkryć, co OmniRoute udostępnia, zanim wyślą wywołania API. Zwraca ustrukturyzowany artefakt w postaci tabeli markdown:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Każdy wiersz zawiera kolumnę `rawUrl`, dzięki czemu agenci mogą od razu pobrać pełny SKILL.md. Pole `metadata.totalSkills` ma zawsze wartość `42`. Implementacja: `src/lib/a2a/skills/listCapabilities.ts`. Zobacz też [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (pomocnicze)

Endpoint JSON-RPC `/a2a` jest kanonicznym punktem wejścia A2A. Poniższe endpointy REST zapewniają dostęp pomocniczy dla dashboardów i zewnętrznych narzędzi:

| Endpoint                     | Method | Opis                                  | Auth                   |
| :--------------------------- | :----- | :------------------------------------ | :--------------------- |
| `/api/a2a/status`            | GET    | Status serwera, zarejestrowane skills | (public)               |
| `/api/a2a/tasks`             | GET    | Lista zadań z filtrami                | management             |
| `/api/a2a/tasks/[id]`        | GET    | Pobierz zadanie po ID                 | management             |
| `/api/a2a/tasks/[id]/cancel` | POST   | Anuluj działające zadanie             | management             |
| `/.well-known/agent.json`    | GET    | Agent Card (odkrywanie A2A)           | (public, cached 3600s) |

---

## Dodawanie nowego skillu

1. **Utwórz plik skillu:** `src/lib/a2a/skills/<your-skill>.ts`

   Wyeksportuj funkcję asynchroniczną `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Naśladuj kształt istniejących skills, np. `smartRouting.ts`.

2. **Zarejestruj handler:** w `src/lib/a2a/taskExecution.ts` dodaj wpis do `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Udostępnij w Agent Card:** w `src/app/.well-known/agent.json/route.ts` dołącz do tablicy `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Napisz testy:** `tests/unit/a2a-<your-skill>.test.ts`. Pokryj happy path + error path.

5. **Udokumentuj** nowy skill w tabeli `Available Skills` w tym pliku.

---

## TTL zadania

Zadania wygasają po `ttlMinutes` (domyślnie 5 min) — skonfigurowane w konstruktorze `A2ATaskManager` pod `src/lib/a2a/taskManager.ts:82`. Aby dostosować, sforkuj instancjonowanie `A2ATaskManager` i przekaż inną wartość (np. `new A2ATaskManager(15)` dla TTL 15 minut). Interwał w tle zamiata wygasłe zadania co 60 sekund.

---

## Cykl życia zadania

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Zadania wygasają domyślnie po 5 minutach (zob. [TTL zadania](#ttl-zadania))
- Stany terminalne: `completed`, `failed`, `cancelled`
- Dziennik zdarzeń śledzi każde przejście stanu

---

## Kody błędów

| Kod    | Znaczenie                            |
| :----- | :----------------------------------- |
| -32700 | Błąd parsowania (nieprawidłowy JSON) |
| -32600 | Nieprawidłowe żądanie / Unauthorized |
| -32601 | Nie znaleziono metody lub skillu     |
| -32602 | Nieprawidłowe params                 |
| -32603 | Błąd wewnętrzny                      |
| -32000 | Endpoint A2A jest wyłączony          |

---

## Przykłady integracji

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
