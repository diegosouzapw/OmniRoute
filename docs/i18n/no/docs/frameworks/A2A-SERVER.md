# OmniRoute A2A Server Documentation (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-til-agent-protokoll v0.3 — OmniRoute som en intelligent rutingsagent

A2A-grensesnittet har to sider:

- **JSON-RPC 2.0** på `POST /a2a` (kanonisk inngangspunkt, definert i `src/app/a2a/route.ts`).
- **REST** under `/api/a2a/*` for kontrollpaneler og verktøy (status, oppgaveliste, avbrytelse).

Oppgaver spores av `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, standard TTL på 5 minutter). Ferdigheter videresendes via `A2A_SKILL_HANDLERS` i `src/lib/a2a/taskExecution.ts`.

## Agentoppdagelse

```bash
curl http://localhost:20128/.well-known/agent.json
```

Returnerer agentkortet som beskriver OmniRoutes funksjoner, ferdigheter og autentiseringskrav.

Agentkortets `version`-felt hentes fra `process.env.npm_package_version` (se `src/app/.well-known/agent.json/route.ts:13`), slik at det automatisk holdes synkronisert med `package.json` ved hver utgivelse.

---

## Autentisering

Alle forespørsler til `/a2a` krever en API-nøkkel via `Authorization`-headeren:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Hvis ingen API-nøkkel er konfigurert på serveren, omgås autentiseringen.

## Aktivering

A2A styres av bryteren **Endepunkter → A2A** og er deaktivert som standard. Når funksjonen er deaktivert,
rapporterer `GET /api/a2a/status` `status: "disabled"` og `online: false`; JSON-RPC-kall til
`POST /a2a` returnerer HTTP 503 med JSON-RPC-feilkoden `-32000`.

---

## JSON-RPC 2.0-metoder

### `message/send` — Synkron kjøring

Sender en melding til en ferdighet og venter på hele svaret.

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

### `message/stream` — SSE-strømming

Samme som `message/send`, men returnerer Server-Sent Events for strømming i sanntid.

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

**SSE-hendelser:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Forespør oppgavestatus

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Avbryt en oppgave

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Tilgjengelige ferdigheter

OmniRoute tilbyr 6 A2A-ferdigheter koblet opp i `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Hver ferdighetsmodul ligger i `src/lib/a2a/skills/`.

| Ferdighet            | ID                   | Beskrivelse                                                                                                                                                        | Tagger                           | Eksempler                                      |
| :------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------- | :--------------------------------------------- |
| Smart ruting         | `smart-routing`      | Ruter en ledetekst gjennom den optimale leverandøren/kombinasjonen ved hjelp av OmniRoutes kombinasjonsmotor og poengberegning                                     | ruting, leverandører             | "Rut denne ledeteksten via den beste modellen" |
| Kvoteadministrasjon  | `quota-management`   | Rapporterer kvotestatus per leverandør og hjelper klienter med å avgjøre når de bør begrense hastigheten eller bytte                                               | kvote, leverandører              | "Sjekk kvoten for anthropic"                   |
| Leverandøroppdagelse | `provider-discovery` | Viser installerte leverandører med funksjoner, gratisnivåindikatorer og OAuth-status                                                                               | leverandører, oppdagelse         | "Hvilke leverandører er tilgjengelige?"        |
| Kostnadsanalyse      | `cost-analysis`      | Estimerer kostnaden for en forespørsel/samtale basert på katalogen og nylig bruk                                                                                   | kostnad, bruk                    | "Estimer kostnaden for denne samtalen"         |
| Tilstandsrapport     | `health-report`      | Samler status for effektbryter, nedkjøling og utestengelse per leverandør                                                                                          | tilstand, robusthet              | "Vis tilstandsstatus for alle leverandører"    |
| Vis funksjoner       | `list-capabilities`  | Returnerer hele Agent Skills-katalogen med 45 oppføringer (23 API + 21 CLI + 1 konfigurasjon) som en markdown-tabell med rå SKILL.md-URL-er for kontekstinnsetting | katalog, oppdagelse, ferdigheter | "Vis alle funksjonene i OmniRoute"             |

> Agentkortet bør holdes synkronisert med den aktive katalogen med 352 leverandører. Antall leverandører og metadata om gratis bruk/bruk uten autentisering hentes fra kjøretidsregisteret.

### Detaljer om ferdigheten `list-capabilities`

Ferdigheten `list-capabilities` er spesielt nyttig for eksterne agenter som må finne ut hva OmniRoute tilbyr før de sender API-kall. Den returnerer en strukturert markdown-tabell som artefakt:

```
| ID | Navn | Kategori | Område | Endepunkter/kommandoer | Rå URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Autentisering og økter | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Hver rad inneholder kolonnen `rawUrl`, slik at agenter umiddelbart kan hente hele SKILL.md. Feltet `metadata.totalSkills` gjenspeiler katalogstørrelsen (45 per i dag). Implementasjon: `src/lib/a2a/skills/listCapabilities.ts`. Se også [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST-API (hjelpegrensesnitt)

JSON-RPC-endepunktet `/a2a` er det kanoniske A2A-startpunktet. REST-endepunktene nedenfor gir tilleggstilgang for instrumentbord og eksterne verktøy:

| Endepunkt                    | Metode | Beskrivelse                                                         | Autentisering                                 |
| :--------------------------- | :----- | :------------------------------------------------------------------ | :-------------------------------------------- |
| `/api/a2a/status`            | GET    | Serverstatus, registrerte ferdigheter                               | (offentlig)                                   |
| `/api/a2a/tasks`             | GET    | Vis oppgaver med filtre                                             | administrasjon                                |
| `/api/a2a/tasks/[id]`        | GET    | Hent oppgave etter ID                                               | administrasjon                                |
| `/api/a2a/tasks/[id]/cancel` | POST   | Avbryt kjørende oppgave                                             | administrasjon                                |
| `/.well-known/agent.json`    | GET    | Agentkort (A2A-oppdagelse)                                          | (offentlig, bufret i 3600 s)                  |
| `/api/a2a/tasks`             | POST   | Innkommende delegering til OmniConductor-flåten (Conductor PRD RF5) | Bearer mot `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Innkommende Conductor-delegering (`POST /api/a2a/tasks`):** Eksterne A2A-agenter delegerer programmeringsarbeid til OmniConductor-flåten gjennom OmniRoute. Forespørselskropp: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — bare ferdigheter for Conductor-flåten (de som er oppført på agentkortet) kan delegeres; `metadata.conductor.repo.url` er påkrevd (flåten arbeider med git-repositorier). Ruten oversettes til hubens `POST /v1/tasks` ved hjelp av `CONDUCTOR_ORCHESTRATOR_TOKEN` på serversiden (med `CONDUCTOR_HUB_TOKEN` som reserve) og returnerer `201 { conductor_task_id, state: "submitted" }`; oppgavetilstander sendes tilbake gjennom SSE→A2A-speilingen (RF1) og er synlige via `GET /api/a2a/tasks?skill=conductor`.

---

## Legge til en ny ferdighet

1. **Opprett ferdighetsfil:** `src/lib/a2a/skills/<your-skill>.ts`

   Eksporter en asynkron funksjon `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Følg strukturen til eksisterende ferdigheter, som `smartRouting.ts`.

2. **Registrer håndterer:** Legg til en oppføring i `A2A_SKILL_HANDLERS` i `src/lib/a2a/taskExecution.ts`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...eksisterende ferdigheter
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Eksponer i agentkortet:** Legg til et element i `skills`-matrisen i `src/app/.well-known/agent.json/route.ts`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Skriv tester:** `tests/unit/a2a-<your-skill>.test.ts`. Dekk både vellykket kjøring og feilhåndtering.

5. **Dokumenter** den nye ferdigheten i tabellen `Available Skills` i denne filen.

---

## TTL for oppgaver

Oppgaver utløper etter `ttlMinutes` (standardverdi 5 min) – konfigurert i `A2ATaskManager`-konstruktøren i `src/lib/a2a/taskManager.ts:82`. For å tilpasse dette kan du forke instansieringen av `A2ATaskManager` og sende inn en annen verdi (f.eks. `new A2ATaskManager(15)` for 15 minutters TTL). Et bakgrunnsintervall fjerner utløpte oppgaver hvert 60. sekund.

---

## Oppgavens livssyklus

```
innsendt → pågår → fullført
                 → mislyktes
                 → avbrutt
```

- Oppgaver utløper som standard etter 5 minutter (se [TTL for oppgaver](#task-ttl))
- Sluttilstander: `completed`, `failed`, `cancelled`
- Hendelsesloggen registrerer hver tilstandsovergang

---

## Feilkoder

| Kode   | Betydning                             |
| :----- | :------------------------------------ |
| -32700 | Tolkningsfeil (ugyldig JSON)          |
| -32600 | Ugyldig forespørsel / Ikke autorisert |
| -32601 | Metode eller ferdighet ikke funnet    |
| -32602 | Ugyldige parametere                   |
| -32603 | Intern feil                           |
| -32000 | A2A-endepunktet er deaktivert         |

---

## Integrasjonseksempler

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
