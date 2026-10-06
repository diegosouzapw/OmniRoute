# OmniRoute A2A Server Documentation (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — Az OmniRoute mint intelligens útválasztó ügynök

Az A2A felületnek két oldala van:

- **JSON-RPC 2.0** a `POST /a2a` címen (kanonikus belépési pont, meghatározva a `src/app/a2a/route.ts` fájlban).
- **REST** az `/api/a2a/*` alatt, irányítópultokhoz és eszközökhöz (állapot, feladatlista, megszakítás).

A feladatokat az `A2ATaskManager` követi nyomon (`src/lib/a2a/taskManager.ts`, alapértelmezetten 5 perces TTL). A készségek kiosztása a `src/lib/a2a/taskExecution.ts` fájlban található `A2A_SKILL_HANDLERS` segítségével történik.

## Ügynökfelderítés

```bash
curl http://localhost:20128/.well-known/agent.json
```

Visszaadja az OmniRoute képességeit, készségeit és hitelesítési követelményeit leíró Ügynökkártyát.

Az Ügynökkártya `version` mezőjének forrása a `process.env.npm_package_version` (lásd: `src/app/.well-known/agent.json/route.ts:13`), így minden kiadáskor automatikusan szinkronban marad a `package.json` fájllal.

---

## Hitelesítés

Minden `/a2a` kéréshez API-kulcs szükséges az `Authorization` fejlécben:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Ha nincs API-kulcs konfigurálva a kiszolgálón, a hitelesítés kihagyásra kerül.

## Engedélyezés

Az A2A az **Endpoints → A2A** kapcsolóval vezérelhető, és alapértelmezetten le van tiltva. Letiltott állapotban a
`GET /api/a2a/status` válasza `status: "disabled"` és `online: false`; a `POST /a2a` címre küldött JSON-RPC hívások
HTTP 503 választ adnak a `-32000` JSON-RPC hibakóddal.

---

## JSON-RPC 2.0 metódusok

### `message/send` — Szinkron végrehajtás

Üzenetet küld egy készségnek, és megvárja a teljes választ.

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

**Válasz:**

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

### `message/stream` — SSE-adatfolyam

Ugyanaz, mint a `message/send`, de valós idejű adatfolyamhoz Server-Sent Events eseményeket ad vissza.

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

**SSE-események:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Feladat állapotának lekérdezése

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Feladat megszakítása

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Elérhető képességek

Az OmniRoute 6 A2A-képességet tesz elérhetővé, amelyek a `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` fájlban vannak bekötve. Minden képességmodul a `src/lib/a2a/skills/` könyvtárban található.

| Képesség                 | ID                   | Leírás                                                                                                                                                                           | Címkék                            | Példák                                           |
| :----------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- | :----------------------------------------------- |
| Intelligens útválasztás  | `smart-routing`      | Az OmniRoute kombinációs motorja és pontozása segítségével az optimális szolgáltatón vagy kombináción keresztül továbbít egy promptot                                            | útválasztás, szolgáltatók         | „Irányítsd ezt a promptot a legjobb modellen át” |
| Kvótakezelés             | `quota-management`   | Jelenti a szolgáltatónkénti kvótaállapotot, és segít a hívóknak eldönteni, mikor kell korlátozni vagy szolgáltatót váltani                                                       | kvóta, szolgáltatók               | „Ellenőrizd az anthropic kvótáját”               |
| Szolgáltatók felderítése | `provider-discovery` | Felsorolja a telepített szolgáltatókat a képességeikkel, az ingyenes csomagra vonatkozó jelzőkkel és az OAuth-állapottal                                                         | szolgáltatók, felderítés          | „Milyen szolgáltatók érhetők el?”                |
| Költségelemzés           | `cost-analysis`      | A katalógus és a közelmúltbeli használat alapján megbecsüli egy kérés vagy beszélgetés költségét                                                                                 | költség, használat                | „Becsüld meg ennek a beszélgetésnek a költségét” |
| Állapotjelentés          | `health-report`      | Szolgáltatónként összesíti az áramkör-megszakító, a várakozási idő és a kizárás állapotát                                                                                        | állapot, reziliencia              | „Mutasd az összes szolgáltató állapotát”         |
| Képességek listázása     | `list-capabilities`  | Egy markdown-táblázatként adja vissza a teljes, 45 elemből álló Agent Skills-katalógust (23 API + 21 CLI + 1 konfiguráció), nyers SKILL.md URL-ekkel a kontextus beillesztéséhez | katalógus, felderítés, képességek | „Sorold fel az OmniRoute összes képességét”      |

> Az Agent Card tartalmát összhangban kell tartani az aktuális, 352 szolgáltatót tartalmazó katalógussal; a szolgáltatók száma, valamint az ingyenes és hitelesítést nem igénylő használatra vonatkozó metaadatok a futásidejű nyilvántartásból származnak.

### A `list-capabilities` képesség részletei

A `list-capabilities` képesség különösen hasznos azon külső ügynökök számára, amelyeknek az API-hívások elküldése előtt fel kell deríteniük, mit tesz elérhetővé az OmniRoute. Egy strukturált markdown-táblázatot ad vissza artefaktumként:

```
| ID | Név | Kategória | Terület | Végpontok/parancsok | Nyers URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Hitelesítés és munkamenetek | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Minden sor tartalmazza a `rawUrl` oszlopot, így az ügynökök azonnal lekérhetik a teljes SKILL.md fájlt. A `metadata.totalSkills` mező a katalógus méretét tükrözi (jelenleg 45). Megvalósítás: `src/lib/a2a/skills/listCapabilities.ts`. Lásd még: [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (kiegészítő)

A JSON-RPC `/a2a` végpont a kanonikus A2A belépési pont. Az alábbi REST-végpontok kiegészítő hozzáférést biztosítanak az irányítópultok és külső eszközök számára:

| Végpont                      | Metódus | Leírás                                                          | Hitelesítés                                   |
| :--------------------------- | :------ | :-------------------------------------------------------------- | :-------------------------------------------- |
| `/api/a2a/status`            | GET     | Kiszolgáló állapota, regisztrált képességek                     | (nyilvános)                                   |
| `/api/a2a/tasks`             | GET     | Feladatok listázása szűrőkkel                                   | felügyeleti                                   |
| `/api/a2a/tasks/[id]`        | GET     | Feladat lekérése azonosító alapján                              | felügyeleti                                   |
| `/api/a2a/tasks/[id]/cancel` | POST    | Futó feladat megszakítása                                       | felügyeleti                                   |
| `/.well-known/agent.json`    | GET     | Ügynökkártya (A2A-felderítés)                                   | (nyilvános, 3600 másodpercig gyorsítótárazva) |
| `/api/a2a/tasks`             | POST    | Bejövő delegálás az OmniConductor flottának (Conductor PRD RF5) | Bearer és `OMNIROUTE_API_KEY` + `a2aEnabled`  |

**Bejövő Conductor-delegálás (`POST /api/a2a/tasks`):** a külső A2A-ügynökök az OmniRoute-on keresztül delegálják a kódolási munkát az OmniConductor flottának. Törzs: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — csak a Conductor-flotta képességei (az Ügynökkártyán közzétettek) delegálhatók; a `metadata.conductor.repo.url` megadása kötelező (a flotta git-tárolókon dolgozik). Az útvonal a központ `POST /v1/tasks` kérésére fordítja le a hívást a kiszolgálóoldali `CONDUCTOR_ORCHESTRATOR_TOKEN` használatával (tartalék: `CONDUCTOR_HUB_TOKEN`), és `201 { conductor_task_id, state: "submitted" }` választ ad vissza; a feladatállapotok az SSE→A2A tükrözésen (RF1) keresztül jutnak vissza, és a `GET /api/a2a/tasks?skill=conductor` végponton tekinthetők meg.

---

## Új képesség hozzáadása

1. **Képességfájl létrehozása:** `src/lib/a2a/skills/<your-skill>.ts`

   Exportáljon egy `(task: A2ATask) => Promise<{ artifacts, metadata }>` aszinkron függvényt. Kövesse a meglévő képességek, például a `smartRouting.ts` felépítését.

2. **Kezelő regisztrálása:** a `src/lib/a2a/taskExecution.ts` fájlban adjon hozzá egy bejegyzést az `A2A_SKILL_HANDLERS` objektumhoz:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...meglévő képességek
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Közzététel az Ügynökkártyán:** a `src/app/.well-known/agent.json/route.ts` fájlban fűzze hozzá a következőt a `skills` tömbhöz:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Tesztek írása:** `tests/unit/a2a-<your-skill>.test.ts`. Fedje le a sikeres végrehajtási és a hibakezelési útvonalat.

5. **Dokumentálja** az új képességet e fájl `Available Skills` táblázatában.

---

## Feladatok élettartama (TTL)

A feladatok a `ttlMinutes` elteltével járnak le (alapértelmezés szerint 5 perc) — ez az `A2ATaskManager` konstruktorában konfigurálható a `src/lib/a2a/taskManager.ts:82` helyen. A testreszabáshoz módosítsa az `A2ATaskManager` példányosítását, és adjon át egy másik értéket (például `new A2ATaskManager(15)` a 15 perces TTL-hez). Egy háttérben futó időzítő 60 másodpercenként eltávolítja a lejárt feladatokat.

---

## Feladatok életciklusa

```
beküldve → folyamatban → befejezve
                       → sikertelen
                       → megszakítva
```

- A feladatok alapértelmezés szerint 5 perc után járnak le (lásd: [Feladatok élettartama (TTL)](#task-ttl))
- Végállapotok: `completed`, `failed`, `cancelled`
- Az eseménynapló minden állapotátmenetet rögzít

---

## Hibakódok

| Kód    | Jelentés                              |
| :----- | :------------------------------------ |
| -32700 | Feldolgozási hiba (érvénytelen JSON)  |
| -32600 | Érvénytelen kérés / Nincs jogosultság |
| -32601 | A metódus vagy képesség nem található |
| -32602 | Érvénytelen paraméterek               |
| -32603 | Belső hiba                            |
| -32000 | Az A2A-végpont le van tiltva          |

---

## Integrációs példák

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
