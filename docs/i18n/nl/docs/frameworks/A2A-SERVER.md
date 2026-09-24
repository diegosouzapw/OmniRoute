# OmniRoute A2A Server Documentation (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute als intelligente routeringsagent

Het A2A-oppervlak heeft twee interfaces:

- **JSON-RPC 2.0** via `POST /a2a` (canoniek toegangspunt, gedefinieerd in `src/app/a2a/route.ts`).
- **REST** onder `/api/a2a/*` voor dashboards en tooling (status, takenlijst, annuleren).

Taken worden bijgehouden door `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, standaard-TTL van 5 minuten). Skills worden uitgevoerd via `A2A_SKILL_HANDLERS` in `src/lib/a2a/taskExecution.ts`.

## Agentdetectie

```bash
curl http://localhost:20128/.well-known/agent.json
```

Retourneert de Agent Card die de mogelijkheden, skills en authenticatievereisten van OmniRoute beschrijft.

Het veld `version` van de Agent Card wordt opgehaald uit `process.env.npm_package_version` (zie `src/app/.well-known/agent.json/route.ts:13`), zodat dit bij elke release automatisch gesynchroniseerd blijft met `package.json`.

---

## Authenticatie

Voor alle `/a2a`-verzoeken is een API-sleutel via de header `Authorization` vereist:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Als er op de server geen API-sleutel is geconfigureerd, wordt authenticatie overgeslagen.

## Activering

A2A wordt beheerd via de schakelaar **Endpoints → A2A** en is standaard uitgeschakeld. Wanneer A2A is uitgeschakeld,
rapporteert `GET /api/a2a/status` `status: "disabled"` en `online: false`; JSON-RPC-aanroepen naar
`POST /a2a` retourneren HTTP 503 met JSON-RPC-foutcode `-32000`.

---

## JSON-RPC 2.0-methoden

### `message/send` — Synchrone uitvoering

Stuurt een bericht naar een skill en wacht op het volledige antwoord.

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

**Antwoord:**

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

### `message/stream` — SSE-streaming

Hetzelfde als `message/send`, maar retourneert Server-Sent Events voor realtime streaming.

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

**SSE-events:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Taakstatus opvragen

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Een taak annuleren

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Beschikbare vaardigheden

OmniRoute biedt 6 A2A-vaardigheden die zijn gekoppeld in `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Elke vaardigheidsmodule bevindt zich in `src/lib/a2a/skills/`.

| Vaardigheid         | ID                   | Beschrijving                                                                                                                                                        | Tags                              | Voorbeelden                               |
| :------------------ | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------- | :---------------------------------------- |
| Slimme routering    | `smart-routing`      | Routeert een prompt via de optimale provider/combinatie met behulp van de combinatie-engine en scoreberekening van OmniRoute                                        | routering, providers              | "Routeer deze prompt via het beste model" |
| Quotabeheer         | `quota-management`   | Rapporteert de quotastatus per provider en helpt aanroepers te bepalen wanneer ze moeten beperken/overschakelen                                                     | quota, providers                  | "Controleer het quota voor anthropic"     |
| Providerdetectie    | `provider-discovery` | Toont geïnstalleerde providers met mogelijkheden, gratis-niveau-indicatoren en OAuth-status                                                                         | providers, detectie               | "Welke providers zijn beschikbaar?"       |
| Kostenanalyse       | `cost-analysis`      | Schat de kosten van een aanvraag/gesprek op basis van de catalogus en het recente gebruik                                                                           | kosten, gebruik                   | "Schat de kosten voor dit gesprek"        |
| Statusrapport       | `health-report`      | Aggregeert de status van circuitonderbrekers, afkoelperioden en blokkeringen per provider                                                                           | status, veerkracht                | "Toon de status van alle providers"       |
| Mogelijkheden tonen | `list-capabilities`  | Retourneert de volledige catalogus met 45 Agent Skills (23 API + 21 CLI + 1 configuratie) als een markdown-tabel met onbewerkte SKILL.md-URL's voor contextinjectie | catalogus, detectie, vaardigheden | "Toon alle mogelijkheden van OmniRoute"   |

> De Agent Card moet gesynchroniseerd blijven met de actuele catalogus van 352 providers; aantallen providers en metadata over gratis/geen-authenticatie worden verkregen uit het runtimeregister.

### Details van de vaardigheid `list-capabilities`

De vaardigheid `list-capabilities` is met name nuttig voor externe agents die moeten ontdekken wat OmniRoute beschikbaar stelt voordat ze API-aanroepen verzenden. De vaardigheid retourneert een gestructureerd markdown-tabelartefact:

```
| ID | Naam | Categorie | Gebied | Eindpunten/opdrachten | Onbewerkte URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Authenticatie en sessies | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Elke rij bevat de kolom `rawUrl`, zodat agents onmiddellijk het volledige SKILL.md-bestand kunnen ophalen. Het veld `metadata.totalSkills` weerspiegelt de grootte van de catalogus (momenteel 45). Implementatie: `src/lib/a2a/skills/listCapabilities.ts`. Zie ook [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (aanvullend)

Het JSON-RPC-eindpunt `/a2a` is het canonieke A2A-toegangspunt. De onderstaande REST-eindpunten bieden aanvullende toegang voor dashboards en externe tooling:

| Eindpunt                     | Methode | Beschrijving                                                       | Authenticatie                                    |
| :--------------------------- | :------ | :----------------------------------------------------------------- | :----------------------------------------------- |
| `/api/a2a/status`            | GET     | Serverstatus, geregistreerde skills                                | (openbaar)                                       |
| `/api/a2a/tasks`             | GET     | Taken weergeven met filters                                        | beheer                                           |
| `/api/a2a/tasks/[id]`        | GET     | Taak ophalen via ID                                                | beheer                                           |
| `/api/a2a/tasks/[id]/cancel` | POST    | Actieve taak annuleren                                             | beheer                                           |
| `/.well-known/agent.json`    | GET     | Agent Card (A2A-detectie)                                          | (openbaar, 3600s gecachet)                       |
| `/api/a2a/tasks`             | POST    | Inkomende delegatie aan de OmniConductor-vloot (Conductor PRD RF5) | Bearer versus `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Inkomende Conductor-delegatie (`POST /api/a2a/tasks`):** externe A2A-agents delegeren programmeerwerk via OmniRoute aan de OmniConductor-vloot. Body: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — alleen skills van de Conductor-vloot (de skills die op de Agent Card worden vermeld) kunnen worden gedelegeerd; `metadata.conductor.repo.url` is verplicht (de vloot werkt met git-repositories). De route vertaalt dit naar `POST /v1/tasks` van de hub met behulp van het serverzijdige `CONDUCTOR_ORCHESTRATOR_TOKEN` (met `CONDUCTOR_HUB_TOKEN` als terugvaloptie) en retourneert `201 { conductor_task_id, state: "submitted" }`; taakstatussen worden teruggestuurd via de SSE→A2A-mirror (RF1) en zijn zichtbaar via `GET /api/a2a/tasks?skill=conductor`.

---

## Een nieuwe skill toevoegen

1. **Maak een skillbestand:** `src/lib/a2a/skills/<your-skill>.ts`

   Exporteer een asynchrone functie `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Volg de structuur van bestaande skills, zoals `smartRouting.ts`.

2. **Registreer de handler:** voeg in `src/lib/a2a/taskExecution.ts` een item toe aan `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...bestaande skills
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Maak de skill beschikbaar in de Agent Card:** voeg in `src/app/.well-known/agent.json/route.ts` het volgende toe aan de `skills`-array:

   ```json
   {
     "id": "your-skill",
     "name": "Uw skill",
     "description": "Korte, intentiegerichte beschrijving",
     "tags": ["routering", "quotum"],
     "examples": ["Voorbeeld van een aanroep in natuurlijke taal"]
   }
   ```

4. **Schrijf tests:** `tests/unit/a2a-<your-skill>.test.ts`. Test zowel het succesvolle pad als het foutpad.

5. **Documenteer** de nieuwe skill in de tabel `Beschikbare skills` van dit bestand.

---

## TTL van taken

Taken verlopen na `ttlMinutes` (standaard 5 min.) — geconfigureerd in de constructor van `A2ATaskManager` op `src/lib/a2a/taskManager.ts:82`. Om dit aan te passen, maakt u een fork van de instantiëring van `A2ATaskManager` en geeft u een andere waarde door (bijv. `new A2ATaskManager(15)` voor een TTL van 15 minuten). Een achtergrondinterval verwijdert elke 60 seconden verlopen taken.

---

## Levenscyclus van taken

```
ingediend → in uitvoering → voltooid
                          → mislukt
                          → geannuleerd
```

- Taken verlopen standaard na 5 minuten (zie [TTL van taken](#task-ttl))
- Eindstatussen: `completed`, `failed`, `cancelled`
- Het gebeurtenislogboek registreert elke statusovergang

---

## Foutcodes

| Code   | Betekenis                             |
| :----- | :------------------------------------ |
| -32700 | Parseerfout (ongeldige JSON)          |
| -32600 | Ongeldig verzoek / Niet geautoriseerd |
| -32601 | Methode of skill niet gevonden        |
| -32602 | Ongeldige parameters                  |
| -32603 | Interne fout                          |
| -32000 | A2A-endpoint is uitgeschakeld         |

---

## Integratievoorbeelden

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
