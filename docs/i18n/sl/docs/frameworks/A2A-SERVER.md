# A2A-SERVER (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

---

title: "Dokumentacija strežnika OmniRoute A2A"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Dokumentacija strežnika OmniRoute A2A

> Protokol Agent-to-Agent v0.3 — OmniRoute kot inteligentni usmerjevalni agent

Vmesnik A2A ima dve plati:

- **JSON-RPC 2.0** na `POST /a2a` (kanonična vstopna točka, opredeljena v `src/app/a2a/route.ts`).
- **REST** pod `/api/a2a/*` za nadzorne plošče in orodja (stanje, seznam opravil, preklic).

Opravilom sledi `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, privzeti TTL je 5 minut). Veščine se posredujejo prek `A2A_SKILL_HANDLERS` v `src/lib/a2a/taskExecution.ts`.

## Odkrivanje agenta

```bash
curl http://localhost:20128/.well-known/agent.json
```

Vrne kartico agenta, ki opisuje zmožnosti, veščine in zahteve za preverjanje pristnosti sistema OmniRoute.

Polje `version` v kartici agenta se pridobi iz `process.env.npm_package_version` (glejte `src/app/.well-known/agent.json/route.ts:13`), zato se ob vsaki izdaji samodejno sinhronizira z datoteko `package.json`.

---

## Preverjanje pristnosti

Vse zahteve za `/a2a` zahtevajo ključ API prek glave `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Če na strežniku ni konfiguriran noben ključ API, se preverjanje pristnosti preskoči.

## Omogočanje

A2A se upravlja s preklopnim stikalom **Endpoints → A2A** in je privzeto onemogočen. Ko je onemogočen,
`GET /api/a2a/status` sporoči `status: "disabled"` in `online: false`; klici JSON-RPC na
`POST /a2a` vrnejo HTTP 503 s kodo napake JSON-RPC `-32000`.

---

## Metode JSON-RPC 2.0

### `message/send` — Sinhrono izvajanje

Pošlje sporočilo veščini in počaka na celoten odgovor.

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

### `message/stream` — Pretočno pošiljanje SSE

Enako kot `message/send`, vendar vrne dogodke, ki jih pošilja strežnik, za pretočno pošiljanje v realnem času.

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

**Dogodki SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Poizvedba o stanju opravila

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Preklic opravila

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Razpoložljive veščine

OmniRoute izpostavlja 6 veščin A2A, povezanih v `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Vsak modul veščine se nahaja v `src/lib/a2a/skills/`.

| Veščina               | ID                   | Opis                                                                                                                                                                 | Oznake                       | Primeri                                   |
| :-------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- | :---------------------------------------- |
| Pametno usmerjanje    | `smart-routing`      | Usmeri poziv prek optimalnega ponudnika/kombinacije z uporabo kombinacijskega mehanizma in ocenjevanja OmniRoute                                                     | usmerjanje, ponudniki        | "Usmeri ta poziv prek najboljšega modela" |
| Upravljanje kvot      | `quota-management`   | Poroča o stanju kvot posameznih ponudnikov in klicateljem pomaga pri odločitvi, kdaj omejiti hitrost ali zamenjati ponudnika                                         | kvote, ponudniki             | "Preveri kvoto za anthropic"              |
| Odkrivanje ponudnikov | `provider-discovery` | Navede nameščene ponudnike z njihovimi zmogljivostmi, oznakami brezplačne ravni in stanjem OAuth                                                                     | ponudniki, odkrivanje        | "Kateri ponudniki so na voljo?"           |
| Analiza stroškov      | `cost-analysis`      | Oceni stroške zahteve/pogovora na podlagi kataloga in nedavne uporabe                                                                                                | stroški, uporaba             | "Oceni stroške tega pogovora"             |
| Poročilo o stanju     | `health-report`      | Združi stanje odklopnika, obdobja ohlajanja in zaklepa za posameznega ponudnika                                                                                      | stanje, odpornost            | "Prikaži stanje vseh ponudnikov"          |
| Seznam zmogljivosti   | `list-capabilities`  | Vrne celoten katalog Agent Skills s 45 vnosi (23 API + 21 CLI + 1 konfiguracija) kot tabelo markdown z neobdelanimi URL-ji datotek SKILL.md za vstavljanje konteksta | katalog, odkrivanje, veščine | "Navedi vse zmogljivosti OmniRoute"       |

> Kartica agenta mora ostati usklajena z aktivnim katalogom 352 ponudnikov; število ponudnikov in metapodatki o brezplačnem dostopu oziroma dostopu brez preverjanja pristnosti izvirajo iz registra med izvajanjem.

### Podrobnosti veščine `list-capabilities`

Veščina `list-capabilities` je posebej uporabna za zunanje agente, ki morajo pred pošiljanjem klicev API odkriti, kaj OmniRoute izpostavlja. Vrne strukturiran artefakt v obliki tabele markdown:

```
| ID | Ime | Kategorija | Področje | Končne točke/ukazi | Neobdelani URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Preverjanje pristnosti in seje | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Vsaka vrstica vključuje stolpec `rawUrl`, zato lahko agenti takoj pridobijo celotno datoteko SKILL.md. Polje `metadata.totalSkills` odraža velikost kataloga (danes 45). Implementacija: `src/lib/a2a/skills/listCapabilities.ts`. Glejte tudi [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (pomožni)

Končna točka JSON-RPC `/a2a` je kanonična vstopna točka A2A. Spodnje končne točke REST zagotavljajo pomožni dostop za nadzorne plošče in zunanja orodja:

| Končna točka                 | Metoda | Opis                                                       | Avtentikacija                                      |
| :--------------------------- | :----- | :--------------------------------------------------------- | :------------------------------------------------- |
| `/api/a2a/status`            | GET    | Stanje strežnika, registrirane veščine                     | (javno)                                            |
| `/api/a2a/tasks`             | GET    | Seznam opravil s filtri                                    | upravljanje                                        |
| `/api/a2a/tasks/[id]`        | GET    | Pridobitev opravila po ID-ju                               | upravljanje                                        |
| `/api/a2a/tasks/[id]/cancel` | POST   | Preklic izvajajočega se opravila                           | upravljanje                                        |
| `/.well-known/agent.json`    | GET    | Kartica agenta (odkrivanje A2A)                            | (javno, predpomnjeno 3600 s)                       |
| `/api/a2a/tasks`             | POST   | Vhodno delegiranje floti OmniConductor (Conductor PRD RF5) | Bearer glede na `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Vhodno delegiranje Conductor (`POST /api/a2a/tasks`):** zunanji agenti A2A prek OmniRoute delegirajo programsko delo floti OmniConductor. Telo: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — delegirati je mogoče samo veščine flote Conductor (tiste, ki so objavljene na kartici agenta); `metadata.conductor.repo.url` je obvezen (flota dela z repozitoriji git). Pot se prevede v `POST /v1/tasks` vozlišča z uporabo strežniškega žetona `CONDUCTOR_ORCHESTRATOR_TOKEN` (nadomestno `CONDUCTOR_HUB_TOKEN`) in vrne `201 { conductor_task_id, state: "submitted" }`; stanja opravil se prenašajo nazaj prek zrcaljenja SSE→A2A (RF1) in so vidna prek `GET /api/a2a/tasks?skill=conductor`.

---

## Dodajanje nove veščine

1. **Ustvarite datoteko veščine:** `src/lib/a2a/skills/<your-skill>.ts`

   Izvozite asinhrono funkcijo `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Upoštevajte obliko obstoječih veščin, kot je `smartRouting.ts`.

2. **Registrirajte obravnavalnik:** v `src/lib/a2a/taskExecution.ts` dodajte vnos v `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...obstoječe veščine
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Objavite na kartici agenta:** v `src/app/.well-known/agent.json/route.ts` dodajte v polje `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Napišite teste:** `tests/unit/a2a-<your-skill>.test.ts`. Pokrijte uspešno pot in pot z napako.

5. **Dokumentirajte** novo veščino v tabeli `Razpoložljive veščine` v tej datoteki.

---

## Čas veljavnosti opravila

Opravila potečejo po `ttlMinutes` (privzeto 5 min) — nastavljeno v konstruktorju `A2ATaskManager` v `src/lib/a2a/taskManager.ts:82`. Če želite to prilagoditi, ustvarite svojo različico inicializacije `A2ATaskManager` in posredujte drugačno vrednost (npr. `new A2ATaskManager(15)` za 15-minutni čas veljavnosti). Interval v ozadju vsakih 60 sekund odstrani potekla opravila.

---

## Življenjski cikel opravila

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Opravila privzeto potečejo po 5 minutah (glejte [Čas veljavnosti opravila](#task-ttl))
- Končna stanja: `completed`, `failed`, `cancelled`
- Dnevnik dogodkov beleži vsak prehod stanja

---

## Kode napak

| Koda   | Pomen                                   |
| :----- | :-------------------------------------- |
| -32700 | Napaka razčlenjevanja (neveljaven JSON) |
| -32600 | Neveljavna zahteva / Nepooblaščeno      |
| -32601 | Metoda ali veščina ni bila najdena      |
| -32602 | Neveljavni parametri                    |
| -32603 | Notranja napaka                         |
| -32000 | Končna točka A2A je onemogočena         |

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
