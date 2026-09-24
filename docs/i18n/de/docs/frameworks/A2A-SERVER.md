# OmniRoute A2A Server Documentation (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent-Protokoll v0.3 — OmniRoute als intelligenter Routing-Agent

Die A2A-Schnittstelle hat zwei Ausprägungen:

- **JSON-RPC 2.0** unter `POST /a2a` (kanonischer Einstiegspunkt, definiert in `src/app/a2a/route.ts`).
- **REST** unter `/api/a2a/*` für Dashboards und Werkzeuge (Status, Aufgabenliste, Abbruch).

Aufgaben werden vom `A2ATaskManager` verwaltet (`src/lib/a2a/taskManager.ts`, standardmäßig 5 Minuten TTL). Skills werden über `A2A_SKILL_HANDLERS` in `src/lib/a2a/taskExecution.ts` weitergeleitet.

## Agentenerkennung

```bash
curl http://localhost:20128/.well-known/agent.json
```

Gibt die Agent Card zurück, die die Fähigkeiten, Skills und Authentifizierungsanforderungen von OmniRoute beschreibt.

Das Feld `version` der Agent Card wird aus `process.env.npm_package_version` bezogen (siehe `src/app/.well-known/agent.json/route.ts:13`), sodass es bei jeder Veröffentlichung automatisch mit `package.json` synchronisiert bleibt.

---

## Authentifizierung

Alle Anfragen an `/a2a` erfordern einen API-Schlüssel im Header `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Wenn auf dem Server kein API-Schlüssel konfiguriert ist, wird die Authentifizierung umgangen.

## Aktivierung

A2A wird über den Schalter **Endpoints → A2A** gesteuert und ist standardmäßig deaktiviert. Wenn es deaktiviert ist,
meldet `GET /api/a2a/status` den Wert `status: "disabled"` und `online: false`; JSON-RPC-Aufrufe an
`POST /a2a` geben HTTP 503 mit dem JSON-RPC-Fehlercode `-32000` zurück.

---

## JSON-RPC-2.0-Methoden

### `message/send` — Synchrone Ausführung

Sendet eine Nachricht an einen Skill und wartet auf die vollständige Antwort.

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

**Antwort:**

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

### `message/stream` — SSE-Streaming

Funktioniert wie `message/send`, gibt jedoch Server-Sent Events für das Echtzeit-Streaming zurück.

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

**SSE-Ereignisse:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Aufgabenstatus abfragen

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Eine Aufgabe abbrechen

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Verfügbare Skills

OmniRoute stellt 6 A2A-Skills bereit, die in `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` eingebunden sind. Jedes Skill-Modul befindet sich in `src/lib/a2a/skills/`.

| Skill                 | ID                   | Beschreibung                                                                                                                                                             | Tags                       | Beispiele                                    |
| :-------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :------------------------------------------- |
| Intelligentes Routing | `smart-routing`      | Leitet einen Prompt mithilfe der Combo-Engine und Bewertung von OmniRoute über den optimalen Anbieter bzw. die optimale Kombination weiter                               | Routing, Anbieter          | „Diesen Prompt über das beste Modell leiten“ |
| Kontingentverwaltung  | `quota-management`   | Meldet den Kontingentstatus je Anbieter und hilft Aufrufern bei der Entscheidung, wann sie drosseln bzw. wechseln sollten                                                | Kontingent, Anbieter       | „Kontingent für anthropic prüfen“            |
| Anbietererkennung     | `provider-discovery` | Listet installierte Anbieter mit Funktionen, Angaben zu kostenlosen Tarifen und OAuth-Status auf                                                                         | Anbieter, Erkennung        | „Welche Anbieter sind verfügbar?“            |
| Kostenanalyse         | `cost-analysis`      | Schätzt die Kosten einer Anfrage bzw. Unterhaltung anhand des Katalogs und der jüngsten Nutzung                                                                          | Kosten, Nutzung            | „Kosten für diese Unterhaltung schätzen“     |
| Zustandsbericht       | `health-report`      | Aggregiert den Status von Leistungsschutzschaltern, Abklingzeiten und Sperren je Anbieter                                                                                | Zustand, Resilienz         | „Zustand aller Anbieter anzeigen“            |
| Funktionen auflisten  | `list-capabilities`  | Gibt den vollständigen Katalog mit 45 Agent Skills (23 API + 21 CLI + 1 Konfiguration) als Markdown-Tabelle mit direkten SKILL.md-URLs für die Kontexteinspeisung zurück | Katalog, Erkennung, Skills | „Alle Funktionen von OmniRoute auflisten“    |

> Die Agent Card sollte mit dem aktuellen Katalog von 352 Anbietern synchron gehalten werden; Anbieterzahlen und Metadaten zu kostenlosen bzw. authentifizierungsfreien Angeboten stammen aus der Laufzeitregistrierung.

### Details zum Skill `list-capabilities`

Der Skill `list-capabilities` ist besonders nützlich für externe Agenten, die vor dem Senden von API-Aufrufen ermitteln müssen, welche Funktionen OmniRoute bereitstellt. Er gibt ein strukturiertes Markdown-Tabellenartefakt zurück:

```
| ID | Name | Kategorie | Bereich | Endpunkte/Befehle | Direkte URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Authentifizierung und Sitzungen | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Jede Zeile enthält die Spalte `rawUrl`, sodass Agenten sofort die vollständige SKILL.md abrufen können. Das Feld `metadata.totalSkills` entspricht der Kataloggröße (derzeit 45). Implementierung: `src/lib/a2a/skills/listCapabilities.ts`. Siehe auch [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST-API (ergänzend)

Der JSON-RPC-Endpunkt `/a2a` ist der kanonische A2A-Einstiegspunkt. Die folgenden REST-Endpunkte bieten ergänzenden Zugriff für Dashboards und externe Tools:

| Endpunkt                     | Methode | Beschreibung                                                           | Authentifizierung                               |
| :--------------------------- | :------ | :--------------------------------------------------------------------- | :---------------------------------------------- |
| `/api/a2a/status`            | GET     | Serverstatus, registrierte Skills                                      | (öffentlich)                                    |
| `/api/a2a/tasks`             | GET     | Aufgaben mit Filtern auflisten                                         | Verwaltung                                      |
| `/api/a2a/tasks/[id]`        | GET     | Aufgabe nach ID abrufen                                                | Verwaltung                                      |
| `/api/a2a/tasks/[id]/cancel` | POST    | Laufende Aufgabe abbrechen                                             | Verwaltung                                      |
| `/.well-known/agent.json`    | GET     | Agent Card (A2A-Erkennung)                                             | (öffentlich, 3600s zwischengespeichert)         |
| `/api/a2a/tasks`             | POST    | Eingehende Delegierung an die OmniConductor-Flotte (Conductor PRD RF5) | Bearer gegen `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Eingehende Conductor-Delegierung (`POST /api/a2a/tasks`):** Externe A2A-Agenten delegieren Programmierarbeiten über OmniRoute an die OmniConductor-Flotte. Body: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — nur Skills der Conductor-Flotte (die auf der Agent Card angekündigten) können delegiert werden; `metadata.conductor.repo.url` ist erforderlich (die Flotte arbeitet mit git-Repositories). Die Route übersetzt die Anfrage in `POST /v1/tasks` des Hubs, wobei das serverseitige `CONDUCTOR_ORCHESTRATOR_TOKEN` (ersatzweise `CONDUCTOR_HUB_TOKEN`) verwendet wird, und gibt `201 { conductor_task_id, state: "submitted" }` zurück; Aufgabenstatus werden über die SSE→A2A-Spiegelung (RF1) zurückübertragen und sind über `GET /api/a2a/tasks?skill=conductor` sichtbar.

---

## Hinzufügen eines neuen Skills

1. **Skill-Datei erstellen:** `src/lib/a2a/skills/<your-skill>.ts`

   Exportieren Sie eine asynchrone Funktion `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Orientieren Sie sich an der Struktur vorhandener Skills wie `smartRouting.ts`.

2. **Handler registrieren:** Fügen Sie in `src/lib/a2a/taskExecution.ts` einen Eintrag zu `A2A_SKILL_HANDLERS` hinzu:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...vorhandene Skills
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Auf der Agent Card veröffentlichen:** Ergänzen Sie in `src/app/.well-known/agent.json/route.ts` das Array `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Ihr Skill",
     "description": "Kurze, absichtsorientierte Beschreibung",
     "tags": ["routing", "quota"],
     "examples": ["Beispiel für einen natürlichsprachlichen Aufruf"]
   }
   ```

4. **Tests schreiben:** `tests/unit/a2a-<your-skill>.test.ts`. Decken Sie den Erfolgs- und den Fehlerfall ab.

5. **Dokumentieren Sie** den neuen Skill in der Tabelle `Available Skills` dieser Datei.

---

## Aufgaben-TTL

Aufgaben laufen nach `ttlMinutes` ab (standardmäßig 5 Minuten) — konfiguriert im Konstruktor von `A2ATaskManager` unter `src/lib/a2a/taskManager.ts:82`. Zur Anpassung können Sie die Instanziierung von `A2ATaskManager` forken und einen anderen Wert übergeben (z. B. `new A2ATaskManager(15)` für eine TTL von 15 Minuten). Ein Hintergrundintervall bereinigt abgelaufene Aufgaben alle 60 Sekunden.

---

## Aufgabenlebenszyklus

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Aufgaben laufen standardmäßig nach 5 Minuten ab (siehe [Aufgaben-TTL](#task-ttl))
- Endzustände: `completed`, `failed`, `cancelled`
- Das Ereignisprotokoll erfasst jeden Zustandsübergang

---

## Fehlercodes

| Code   | Bedeutung                             |
| :----- | :------------------------------------ |
| -32700 | Parsing-Fehler (ungültiges JSON)      |
| -32600 | Ungültige Anfrage / Nicht autorisiert |
| -32601 | Methode oder Skill nicht gefunden     |
| -32602 | Ungültige Parameter                   |
| -32603 | Interner Fehler                       |
| -32000 | A2A-Endpunkt ist deaktiviert          |

---

## Integrationsbeispiele

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
